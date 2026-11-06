// Uvoz funkcija za dohvaćanje korisnika iz modela
const userModel = require("../models/user.model");

// Middleware koji dohvaća trenutno prijavljenog korisnika
async function loadCurrentUser(req, res, next) {
  try {
    // Provjera postoji li ID korisnika u sesiji
    const userId = req.session.userId;

    // Ako korisnik nema ID u sesiji, nije prijavljen
    if (!userId) {
      req.user = null;
      res.locals.currentUser = null;

      // Nastavlja obradu zahtjeva
      return next();
    }

    // Dohvaća korisnika iz modela prema ID-u iz sesije
    const user = await userModel.findUserById(userId);

    // Ako korisnik više ne postoji, uklanja ID iz sesije
    if (!user) {
      delete req.session.userId;

      req.user = null;
      res.locals.currentUser = null;

      return next();
    }

    // Ako je korisnički račun deaktiviran, ne smatra se prijavljenim
    if (!user.aktivan) {
      delete req.session.userId;

      req.user = null;
      res.locals.currentUser = null;

      return next();
    }

    // Stvara objekt s podacima koji su sigurni za korištenje u ostatku aplikacije
    // Ne izlaže password_hash ni druge osjetljive podatke
    req.user = {
      user_id: user.user_id,
      ime: user.ime,
      prezime: user.prezime,
      email: user.email,
      email_verified: user.email_verified,
      ustanova: user.ustanova,
      orcid: user.orcid,
      jeAdmin: user.jeAdmin,
      aktivan: user.aktivan,
      conferenceRoles: user.conferenceRoles,
    };

    // Omogućuje pristup korisniku i unutar EJS prikaza
    res.locals.currentUser = req.user;

    // Nastavlja obradu zahtjeva
    next();
  } catch (error) {
    // Prosljeđuje grešku Expressovom sustavu za obradu grešaka
    next(error);
  }
}

// Middleware koji dopušta pristup samo prijavljenim korisnicima
function requireAuth(req, res, next) {
  // Ako korisnik nije prijavljen, preusmjerava ga na prijavu
  if (!req.user) {
    return res.redirect("/login");
  }

  // Ako je prijavljen, nastavlja se obrada zahtjeva
  next();
}

// Middleware koji dopušta pristup samo administratoru
function requireAdmin(req, res, next) {
  // Provjera je li korisnik prijavljen i je li administrator
  if (!req.user || !req.user.jeAdmin) {
    return res.status(403).send("Nemate ovlasti za pristup ovoj stranici.");
  }

  // Ako je korisnik administrator, nastavlja se obrada zahtjeva
  next();
}

// Middleware koji provjerava korisnikovu ulogu na određenoj konferenciji
function requireConferenceRole(...allowedRoles) {
  // Vraća middleware funkciju koja će se izvršiti za konkretan zahtjev
  return async function (req, res, next) {
    try {
      // Ako korisnik nije prijavljen, ne može pristupiti funkcionalnosti
      if (!req.user) {
        return res.redirect("/login");
      }

      // Dohvaća ID konferencije iz parametara URL-a
      const conferenceId = req.params.conferenceId;

      // Dohvaća korisnikovu ulogu na toj konferenciji
      const conferenceRole = await userModel.getConferenceRole(
        req.user.user_id,
        conferenceId,
      );

      // Provjera postoji li uloga i je li dopuštena
      if (!conferenceRole || !allowedRoles.includes(conferenceRole.role)) {
        return res
          .status(403)
          .send("Nemate odgovarajuću ulogu za ovu konferenciju.");
      }

      // Ako korisnik ima odgovarajuću ulogu, nastavlja se obrada zahtjeva
      next();
    } catch (error) {
      // Prosljeđuje grešku Expressu
      next(error);
    }
  };
}

// Izvoz middleware funkcija
module.exports = {
  loadCurrentUser,
  requireAuth,
  requireAdmin,
  requireConferenceRole,
};
