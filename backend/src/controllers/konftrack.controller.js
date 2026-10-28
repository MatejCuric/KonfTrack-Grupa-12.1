const express = require("express");

const router = express.Router();

// Početna stranica s popisom konferencija
router.get("/", (req, res) => {
  res.render("home");
});

// Radovi korisnika
router.get("/moji-radovi", (req, res) => {
  res.render("moji-radovi");
});

// Konferencije kojima korisnik upravlja
router.get("/moje-konferencije", (req, res) => {
  res.render("moje-konferencije");
});

// Radovi na kojima je korisnik recenzent
router.get("/moje-recenzije", (req, res) => {
  res.render("moje-recenzije");
});

// Stranica za administratora sustava
router.get("/admin", (req, res) => {
  res.render("admin");
});

// Ruta za prikaz obrasca za predaju rada
router.get("/predaj-rad", (req, res) => {
  res.render("predaj-rad");
});

// Stranica s prikazom statistike sustava namijenjena za administartora
router.get("/statistika", (req, res) => {
  res.render("statistika");
});

// Ruta za prikaz sučelja za prijavu korisnika
router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
