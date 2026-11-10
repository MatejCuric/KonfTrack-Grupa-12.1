const express = require("express");
const router = express.Router();

// Omogućujemo backendu primanje PDF datoteke koju šalje EJS obrazac
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10*1024*1024,
  },
});


// Servis za autentifikaciju
const authService = require("../services/auth.service");

// Middleware za provjeru autentifikacije i autorizacije
const { requireAuth, requireAdmin } = require("../middleware/auth.middleware");

// Servis za ORCID prijavu
const orcidService = require("../services/orcid.service");

// Servis za dohvaćanje konferencija
const conferenceService = require("../services/conference.service");

//servis za validaciju predaje rada
const paperService = require("../services/paper.service");

// Pomoćna funkcija koja stvara novu sesiju za prijavljenog korisnika
function createUserSession(req, userId) {
  return new Promise((resolve, reject) => {
    req.session.regenerate((error) => {
      if (error) {
        return reject(error);
      }

      req.session.userId = userId;

      req.session.save((saveError) => {
        if (saveError) {
          return reject(saveError);
        }

        resolve();
      });
    });
  });
}

// Početna stranica s dinamičkim popisom konferencija
router.get("/", async (req, res) => {
  try {
    const sveKonferencije = conferenceService.dohvatiSveKonferencije();
    const trenutniDatum = new Date();

    // Konferencije otvorene za prijavu radova
    const otvoreneKonferencije = sveKonferencije.filter(
      (conf) =>
        new Date(conf.rokZaPrijavu) >= trenutniDatum &&
        new Date(conf.datumOdrzavanja) >= trenutniDatum,
    );

    // Nadolazeće konferencije
    const nadolazeceKonferencije = sveKonferencije.filter(
      (conf) =>
        new Date(conf.rokZaPrijavu) < trenutniDatum &&
        new Date(conf.datumOdrzavanja) >= trenutniDatum,
    );

    res.render("home", {
      otvoreneKonferencije,
      nadolazeceKonferencije,
      currentUser: req.user || null,
    });
  } catch (error) {
    console.error("Greška pri dohvaćanju konferencija:", error);
    res.status(500).send("Došlo je do greške na poslužitelju.");
  }
});

// Prikaz detalja odabrane konferencije
router.get("/konferencije/:id", (req, res) => {
  try {
    // Dohvaća ID konferencije iz URL-a
    const konferencija = conferenceService.dohvatiKonferencijuPoId(
      req.params.id,
    );

    // Ako konferencija s tim ID-em ne postoji, vraća 404
    if (!konferencija) {
      return res.status(404).send("Tražena konferencija ne postoji.");
    }

    // Prosljeđuje podatke konferencije EJS prikazu
    res.render("konferencija", {
      konferencija,
    });
  } catch (error) {
    console.error("Greška pri dohvaćanju konferencije:", error);
    res.status(500).send("Došlo je do greške na poslužitelju.");
  }
});

// Prikaz stranice za registraciju
router.get("/register", (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }

  res.render("register", {
    error: null,
  });
});

// Obrada obrasca za registraciju
router.post("/register", async (req, res) => {
  try {
    await authService.registerUser(req.body);
    res.redirect("/login?registered=1");
  } catch (error) {
    console.error("Greška pri registraciji:", error);

    res.status(400).render("register", {
      error: error.message,
    });
  }
});

// Obrada poveznice za potvrdu e-mail adrese
router.get("/verify-email", async (req, res) => {
  try {
    const token = req.query.token;
    await authService.verifyEmail(token);
    res.redirect("/login?verified=1");
  } catch (error) {
    console.error("Greška pri potvrdi e-maila:", error.message);
    res.redirect("/login?verificationError=1");
  }
});

// Prikaz stranice za prijavu
router.get("/login", (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }

  res.render("login", {
    error: null,
    registered: req.query.registered === "1",
    verified: req.query.verified === "1",
    verificationError: req.query.verificationError === "1",
    orcidError: req.query.orcidError === "1",
  });
});

// Obrada obrasca za prijavu
router.post("/login", async (req, res) => {
  try {
    const user = await authService.loginUser(req.body.email, req.body.password);
    await createUserSession(req, user.user_id);
    res.redirect("/");
  } catch (error) {
    res.status(401).render("login", {
      error: error.message,
      registered: false,
      verified: false,
      verificationError: false,
      orcidError: false,
    });
  }
});

// Pokreće ORCID prijavu
router.get("/auth/orcid", (req, res) => {
  try {
    const state = orcidService.generateState();
    req.session.orcidState = state;

    const authorizationUrl = orcidService.createAuthorizationUrl(state);
    res.redirect(authorizationUrl);
  } catch (error) {
    console.error("Greška pri pokretanju ORCID prijave:", error.message);
    res.status(500).send("Nije moguće pokrenuti ORCID prijavu.");
  }
});

// ORCID callback
router.get("/auth/orcid/callback", async (req, res) => {
  try {
    const { code, state, error } = req.query;

    if (error) {
      return res.redirect("/login?orcidError=1");
    }

    if (!code || typeof code !== "string") {
      throw new Error("ORCID nije vratio autorizacijski kod.");
    }

    if (
      !state ||
      typeof state !== "string" ||
      state !== req.session.orcidState
    ) {
      throw new Error("ORCID sigurnosna provjera nije uspjela.");
    }

    delete req.session.orcidState;

    const tokenData = await orcidService.exchangeCodeForToken(code);
    const orcid = tokenData.orcid;

    if (!orcid) {
      throw new Error("ORCID nije vratio ORCID ID.");
    }

    let user = await authService.findOrcidUser(orcid);

    if (user) {
      if (!user.aktivan) {
        return res.redirect("/login?orcidError=1");
      }

      await createUserSession(req, user.user_id);
      return res.redirect("/");
    }

    let ime = null;
    let prezime = null;

    if (tokenData.name) {
      const nameParts = tokenData.name.trim().split(/\s+/);

      if (nameParts.length > 0) {
        ime = nameParts[0];
        prezime = nameParts.slice(1).join(" ") || null;
      }
    }

    try {
      const profile = await orcidService.getPublicProfile(
        orcid,
        tokenData.access_token,
      );

      ime = profile.ime || ime;
      prezime = profile.prezime || prezime;
    } catch (profileError) {
      console.log("Javni ORCID profil nije dostupan.");
    }

    req.session.pendingOrcidRegistration = {
      orcid,
      ime,
      prezime,
    };

    if (!ime || !prezime) {
      return res.redirect("/auth/orcid/complete-registration");
    }

    user = await authService.createOrcidUser(orcid, ime, prezime);
    await createUserSession(req, user.user_id);

    res.redirect("/");
  } catch (error) {
    console.error("Greška pri ORCID prijavi:", error.message);
    res.redirect("/login?orcidError=1");
  }
});

// Prikazuje obrazac za dovršetak ORCID registracije
router.get("/auth/orcid/complete-registration", (req, res) => {
  const pending = req.session.pendingOrcidRegistration;

  if (!pending) {
    return res.redirect("/login");
  }

  res.render("orcid-complete-registration", {
    ime: pending.ime || "",
    prezime: pending.prezime || "",
    error: null,
  });
});

// Dovršetak ORCID registracije
router.post("/auth/orcid/complete-registration", async (req, res) => {
  const pending = req.session.pendingOrcidRegistration;

  if (!pending) {
    return res.redirect("/login");
  }

  try {
    const ime = req.body.ime?.trim();
    const prezime = req.body.prezime?.trim();

    if (!ime || !prezime) {
      return res.status(400).render("orcid-complete-registration", {
        ime: ime || pending.ime || "",
        prezime: prezime || pending.prezime || "",
        error: "Potrebno je unijeti ime i prezime.",
      });
    }

    const user = await authService.createOrcidUser(pending.orcid, ime, prezime);

    delete req.session.pendingOrcidRegistration;

    await createUserSession(req, user.user_id);

    res.redirect("/");
  } catch (error) {
    console.error("Greška pri dovršetku ORCID registracije:", error.message);

    res.status(400).render("orcid-complete-registration", {
      ime: req.body.ime || pending.ime || "",
      prezime: req.body.prezime || pending.prezime || "",
      error: error.message,
    });
  }
});

// Odjava korisnika
router.post("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).send("Odjava nije uspjela.");
    }

    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});

// Privatne stranice
router.get("/moji-radovi", requireAuth, (req, res) => {
  res.render("moji-radovi");
});

router.get("/moje-konferencije", requireAuth, (req, res) => {
  res.render("moje-konferencije");
});

router.get("/moje-recenzije", requireAuth, (req, res) => {
  res.render("moje-recenzije");
});

// Prikaz obrasca za predaju rada
router.get("/predaj-rad", requireAuth, (req, res) => {
  try {
    // Dohvaća ID konferencije iz URL-a
    const konferencijaId = req.query.konferencija;

    // Ako ID nije naveden, korisnik mora odabrati konferenciju tako da na njezinoj stranici klikne "Predaj rad"
    if (!konferencijaId) {
      return res.status(400).render("predaj-rad", {
        konferencija: null,
        konferencije: [],
        korisnici: [],
        vrijednosti: {},
        greske: {},
        poruka:
          "Za predaju rada potrebno je najprije odabrati konferenciju na početnoj stranici za koju je otvorena prijava radova.",
      });
    }

    // Dohvaća konferencije kod kojih je prijava još otvorena
    const otvoreneKonferencije =
      conferenceService.dohvatiOtvoreneKonferencije();

    // Pronalazi traženu konferenciju
    const konferencija = otvoreneKonferencije.find(
      (konf) => konf.id === Number(konferencijaId),
    );

    // Ako konferencija ne postoji ili prijava nije otvorena, korisniku se ne prikazuje obrazac za predaju
    if (!konferencija) {
      return res.status(404).render("predaj-rad", {
        konferencija: null,
        konferencije: [],
        korisnici: [],
        vrijednosti: {},
        greske: {},
        poruka:
          "Odabrana konferencija ne postoji ili trenutačno nije otvorena za prijavu radova.",
      });
    }

    // Početne vrijednosti obrasca
    const vrijednosti = {
      konferencijaId: konferencija.id,
      naslov: "",
      tema: "",
      sazetak: "",
      kljucneRijeci: "",
      koautori: [],
      pozvani: [{
        ime:"",
        email:""
      }],
      kontaktIme: "",
      kontaktEmail: "",
    };

    // Privremeno prazno polje dok ne povežemo bazu podataka
    const korisnici = [];

    // Početno nema pogrešaka validacije
    const greske = {};

    // Početno nema dodatne poruke
    const poruka = null;

    // Prikazuje obrazac za točno određenu konferenciju
    res.render("predaj-rad", {
      konferencija,
      konferencije: [konferencija],
      korisnici,
      vrijednosti,
      greske,
      poruka,
    });
  } catch (error) {
    console.error("Greška pri prikazu obrasca za predaju rada:", error);

    res.status(500).send("Došlo je do greške na poslužitelju.");
  }
});

// pomocna funkcija za prikaz gresaka
function prikazGresaka(req,res,greske){
  const podatci = req.body;
  const konferencija = conferenceService.dohvatiKonferencijuPoId(podatci.konferencija);

  function niz(val){
    if (Array.isArray(val)){
      return val;
    }
    if (val===undefined){
      return [];
    }
    return [val];
  }

  const pozvanaImena=niz(podatci.pozvaniIme);
  const pozvaniEmailovi=niz(podatci.pozvaniEmail);

  const pozvani=[];
  const brPozvanih = Math.max(
    pozvanaImena.length,
    pozvaniEmailovi.length,
    1
  );

  for(let i=0; i<brPozvanih;i++){
    pozvani.push({
      ime:pozvanaImena[i] || "",
      email: pozvaniEmailovi[i] || ""
    });
  }
  const vrijednosti = {
    konferencijaId: podatci.konferencija,
    naslov: podatci.naslov || "",
    sazetak: podatci.sazetak || "",
    tema: podatci.tema || "",
    kljucneRijeci: podatci.kljucneRijeci || "",
    kontaktIme: podatci.kontaktIme || "",
    kontaktEmail: podatci.kontaktEmail || "",
    koautori: niz(podatci.koautori),
    pozvani: pozvani
  };

  //prikaz prethodno unesenih vrijednosti

  return res.status(400).render("predaj-rad",{
    konferencija: konferencija || null,
    konferencije: konferencija? [konferencija]:[],
    korisnici: [],
    vrijednosti,
    greske,
    poruka: konferencija? null : "Odabrana konferencija ne postoji"
  });

}

// primanje pdf-a (jer dolazi do greske ako je veci od 10MB)
const primanjePdf = (req,res,next)=>{
  upload.single("pdf")(req,res,(error)=>{
    if (error){
      if (error.code === "LIMIT_FILE_SIZE"){
        return prikazGresaka(req,res,{pdf:"PDF datoteka ne smije biti veća od 10MB"
        });
      }
      return prikazGresaka(req,res,{pdf: "Došlo je do greške pri učitavanju PDF datoteke"
      });
    }
    next();
  });
};

router.post("/spremi-rad", requireAuth, primanjePdf, (req,res)=>{
  try{
    const podatci = req.body;
    const pdf = req.file;

    if(podatci.akcija==="nacrt"){
      return res.send("Nacrt je uspješno zaprimljen(bez trajnog spremanja");
    }

    if(podatci.akcija==="predaj"){
      const greske=paperService.validacijaRada(podatci,pdf);

      if(Object.keys(greske).length>0){
        return prikazGresaka(req,res,greske);
      }

      return res.send("Zahtjev za predaju rada je zaprimljen(bez trajnog spremanja)");
    }

    return res.status(400).send("Nepoznata akcija obrasca");


  }catch (error){
    console.error("Greška pri obradi rada:", error);

    return res.status(500).send("Došlo je do greške pri obradi rada");
  }
});

// Administratorske stranice
router.get("/admin", requireAdmin, (req, res) => {
  res.render("admin");
});

router.get("/statistika", requireAdmin, (req, res) => {
  res.render("statistika");
});

module.exports = router;
