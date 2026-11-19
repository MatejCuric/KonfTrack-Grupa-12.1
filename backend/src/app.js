require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const routes = require("./controllers/konftrack.controller");
const { loadCurrentUser } = require("./middleware/auth.middleware");

const app = express();

app.set("trust proxy", 1);

// Lokacija EJS prikaza
app.set("views", path.join(__dirname, "..", "..", "frontend", "src", "pages"));
app.set("view engine", "ejs");

// Statičke datoteke
app.use(express.static(path.join(__dirname, "..", "..", "frontend", "public")));

// Parsiranje tijela zahtjeva
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Konfiguracija sesije
app.use(
  session({
    // Tajna vrijednost kojom se potpisuje identifikator sesije
    secret: process.env.SESSION_SECRET || "konftrack-local-development-secret",

    // Ne sprema se sesija ponovno u spremnik ako se nije promijenila
    resave: false,

    // Ne stvara se sesija za korisnika koji nije ništa spremio u nju
    saveUninitialized: false,

    // Postavljanje svojstava cookieja koji identificira sesiju u pregledniku
    cookie: {
      // JavaScript kod u pregledniku ne može izravno čitati cookie
      httpOnly: true,

      // Cookie se šalje u uobičajenim navigacijskim zahtjevima iste stranice
      sameSite: "lax",

      // U produkciji cookie se koristi samo preko HTTPS veze
      secure: process.env.NODE_ENV === "production",

      // Sesija vrijedi najviše 24 sata od postavljanja cookieja
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

// Nakon učitavanja sesije dohvaćaju se podaci trenutno prijavljenog korisnika
app.use(loadCurrentUser);

// Rute aplikacije
app.use("/", routes);

const PORT = process.env.PORT || 10000;

const server = app.listen(PORT, () => {
  console.log(`KonfTrack je pokrenut na portu ${PORT}`);
});
