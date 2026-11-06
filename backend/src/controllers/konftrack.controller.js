const express = require("express");
const router = express.Router();

// Uvoz servisa koji sadrži logiku registracije, prijave i potvrde e-maila
const authService = require("../services/auth.service");

// Uvoz middleware-a za provjeru autentifikacije i autorizacije
const { requireAuth, requireAdmin } = require("../middleware/auth.middleware");

// Uvoz servisa koji omogućava orcid prijavu
const orcidService = require("../services/orcid.service");

// Pomoćna funkcija koja stvara novu sesiju za prijavljenog korisnika
function createUserSession(req, userId) {
  // Vraća Promise kako bi mogli koristiti await
  return new Promise((resolve, reject) => {
    // Uništava staru sesiju i stvara novu
    req.session.regenerate((error) => {
      if (error) {
        return reject(error);
      }

      // U novu sesiju sprema samo ID korisnika
      req.session.userId = userId;

      // Sprema promjene sesije prije završetka prijave
      req.session.save((saveError) => {
        if (saveError) {
          return reject(saveError);
        }

        resolve();
      });
    });
  });
}

// Početna stranica s popisom konferencija
router.get("/", (req, res) => {
  res.render("home");
});

// Prikaz stranice za registraciju
router.get("/register", (req, res) => {
  // Ako je korisnik već prijavljen, nema potrebe za registracijom
  if (req.user) {
    return res.redirect("/");
  }

  // Prikazuje obrazac za registraciju
  res.render("register", {
    error: null,
  });
});

// Obrada obrasca za registraciju
router.post("/register", async (req, res) => {
  try {
    // Registrira korisnika i šalje mu e-mail za potvrdu
    await authService.registerUser(req.body);

    // Korisnika preusmjerava na prijavu
    res.redirect("/login?registered=1");
  } catch (error) {
    // Ako registracija ili slanje e-maila ne uspije, prikazuje grešku
    console.error("Greška pri registraciji:", error);

    res.status(400).render("register", {
      error: error.message,
    });
  }
});

// Obrada poveznice za potvrdu e-mail adrese
router.get("/verify-email", async (req, res) => {
  try {
    // Token dohvaća iz query parametra poveznice
    const token = req.query.token;

    // Prosljeđuje token servisu koji provjerava njegovu valjanost
    await authService.verifyEmail(token);

    // Nakon uspješne potvrde vraća korisnika na prijavu
    res.redirect("/login?verified=1");
  } catch (error) {
    // Bilježi grešku
    console.error("Greška pri potvrdi e-maila:", error.message);

    // Vraća korisnika na prijavu s porukom o grešci
    res.redirect("/login?verificationError=1");
  }
});

// Prikaz stranice za prijavu
router.get("/login", (req, res) => {
  // Ako je korisnik već prijavljen, preusmjerava ga na početnu stranicu
  if (req.user) {
    return res.redirect("/");
  }

  // Prikazuje obrazac za prijavu
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
    // Pokušava prijaviti korisnika pomoću e-maila i lozinke
    const user = await authService.loginUser(req.body.email, req.body.password);

    // Stvara novu sesiju i u nju sprema ID korisnika
    await createUserSession(req, user.user_id);

    // Nakon uspješne prijave vraća korisnika na početnu stranicu
    res.redirect("/");
  } catch (error) {
    // Ako prijava nije uspjela, prikazuje obrazac s porukom o grešci
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
    // Generira jedinstvenu vrijednost za sigurnosnu provjeru
    const state = orcidService.generateState();

    // Sprema state u sesiju kako bi ga mogli provjeriti nakon povratka
    req.session.orcidState = state;

    // Preusmjerava korisnika na ORCID stranicu za prijavu
    const authorizationUrl = orcidService.createAuthorizationUrl(state);

    res.redirect(authorizationUrl);
  } catch (error) {
    console.error("Greška pri pokretanju ORCID prijave:", error.message);
    res.status(500).send("Nije moguće pokrenuti ORCID prijavu.");
  }
});

// ORCID vraća korisnika na ovu rutu.
router.get("/auth/orcid/callback", async (req, res) => {
  try {
    const { code, state, error } = req.query;

    // Provjerava je li korisnik odbio autorizaciju
    if (error) {
      return res.redirect("/login?orcidError=1");
    }

    // Provjerava je li ORCID vratio autorizacijski kod
    if (!code || typeof code !== "string") {
      throw new Error("ORCID nije vratio autorizacijski kod.");
    }

    // Provjerava odgovara li state vrijednost onoj spremljenoj u sesiji
    if (
      !state ||
      typeof state !== "string" ||
      state !== req.session.orcidState
    ) {
      throw new Error("ORCID sigurnosna provjera nije uspjela.");
    }

    // Uklanja state jer se može iskoristiti samo jednom
    delete req.session.orcidState;

    // Razmjenjuje autorizacijski kod za ORCID token
    const tokenData = await orcidService.exchangeCodeForToken(code);

    // ORCID dobiva iz odgovora token endpointa
    const orcid = tokenData.orcid;

    if (!orcid) {
      throw new Error("ORCID nije vratio ORCID ID.");
    }

    // Provjera postoji li već korisnički račun s tim ORCID ID-om.
    let user = await authService.findOrcidUser(orcid);

    // Ako račun postoji, odmah se prijavljuje korisnika
    if (user) {
      if (!user.aktivan) {
        return res.redirect("/login?orcidError=1");
      }

      await createUserSession(req, user.user_id);
      return res.redirect("/");
    }

    // Pokušava dohvatiti ime i prezime iz ORCID odgovora
    let ime = null;
    let prezime = null;

    // ORCID ponekad vrati puno ime u token odgovoru
    if (tokenData.name) {
      const nameParts = tokenData.name.trim().split(/\s+/);

      if (nameParts.length > 0) {
        ime = nameParts[0];
        prezime = nameParts.slice(1).join(" ") || null;
      }
    }

    // Pokušava dohvatiti javni profil.
    try {
      const profile = await orcidService.getPublicProfile(
        orcid,
        tokenData.access_token,
      );

      ime = profile.ime || ime;
      prezime = profile.prezime || prezime;
    } catch (profileError) {
      // Ako profil nije dostupan, korisnik može ručno unijeti podatke
      console.log("Javni ORCID profil nije dostupan.");
    }

    // Sprema podatke u sesiju dok korisnik ne dovrši registraciju
    req.session.pendingOrcidRegistration = {
      orcid,
      ime,
      prezime,
    };

    // Ako nedostaje ime ili prezime, tražimo ih od korisnika
    if (!ime || !prezime) {
      return res.redirect("/auth/orcid/complete-registration");
    }

    // Ako imamo sve podatke, stvaramo novi korisnički račun
    user = await authService.createOrcidUser(orcid, ime, prezime);

    // Prijava novog korisnika.
    await createUserSession(req, user.user_id);

    res.redirect("/");
  } catch (error) {
    console.error("Greška pri ORCID prijavi:", error.message);
    res.redirect("/login?orcidError=1");
  }
});

// Prikazuje obrazac za unos imena i prezimena.
router.get("/auth/orcid/complete-registration", (req, res) => {
  const pending = req.session.pendingOrcidRegistration;

  // Ako nema podataka u sesiji, korisnik nije prošao ORCID prijavu
  if (!pending) {
    return res.redirect("/login");
  }

  res.render("orcid-complete-registration", {
    ime: pending.ime || "",
    prezime: pending.prezime || "",
    error: null,
  });
});

// Stvara korisnički račun nakon unosa obveznih podataka
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

    // Stvaranje računa koristeći ORCID ID spremljen u sesiji
    const user = await authService.createOrcidUser(pending.orcid, ime, prezime);

    // Uklanja privremene podatke registracije
    delete req.session.pendingOrcidRegistration;

    // Prijava korisnika u aplikaciju
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

// Obrada odjave korisnika
router.post("/logout", (req, res) => {
  // Uništava sesiju na serveru
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).send("Odjava nije uspjela.");
    }

    // Uklanja cookie koji identificira sesiju u pregledniku
    res.clearCookie("connect.sid");

    // Nakon odjave vraća korisnika na početnu stranicu
    res.redirect("/");
  });
});

// Radovi korisnika
router.get("/moji-radovi", requireAuth, (req, res) => {
  res.render("moji-radovi");
});

// Konferencije kojima korisnik upravlja
router.get("/moje-konferencije", requireAuth, (req, res) => {
  res.render("moje-konferencije");
});

// Radovi na kojima je korisnik recenzent
router.get("/moje-recenzije", requireAuth, (req, res) => {
  res.render("moje-recenzije");
});

// Stranica za administratora sustava
router.get("/admin", requireAdmin, (req, res) => {
  res.render("admin");
});

// Ruta za prikaz obrasca za predaju rada
router.get("/predaj-rad", requireAuth, (req, res) => {
  res.render("predaj-rad");
});

// Stranica sa statistikom sustava
router.get("/statistika", requireAdmin, (req, res) => {
  res.render("statistika");
});

// Izvoz routera kako bi ga app.js mogao uključiti u Express aplikaciju
module.exports = router;
