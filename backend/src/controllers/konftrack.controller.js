const express = require("express");
const router = express.Router();


const conferenceService = require("../services/conference.service");

// Početna stranica s dinamičkim popisom konferencija
router.get("/", async (req, res) => {
  try {
    const sveKonferencije = conferenceService.dohvatiSveKonferencije();
    const trenutniDatum = new Date();

    // Konferencije otvorene za prijavu radova
    const otvoreneKonferencije = sveKonferencije.filter(conf => 
      new Date(conf.rokZaPrijavu) >= trenutniDatum && new Date(conf.datumOdrzavanja) >= trenutniDatum
    );

    // Nadolazeće konferencije (rok za prijavu istekao, ali se konferencija još nije održala)
    const nadolazeceKonferencije = sveKonferencije.filter(conf => 
      new Date(conf.rokZaPrijavu) < trenutniDatum && new Date(conf.datumOdrzavanja) >= trenutniDatum
    );

    res.render("home", {
      otvoreneKonferencije,
      nadolazeceKonferencije
    });
  } catch (error) {
    console.error("Greška pri dohvaćanju konferencija:", error);
    res.status(500).send("Došlo je do greške na poslužitelju.");
  }
});


router.get("/moji-radovi", (req, res) => {
  res.render("moji-radovi");
});


router.get("/moje-konferencije", (req, res) => {
  res.render("moje-konferencije");
});


router.get("/moje-recenzije", (req, res) => {
  res.render("moje-recenzije");
});

router.get("/admin", (req, res) => {
  res.render("admin");
});

router.get("/predaj-rad", (req, res) => {
  res.render("predaj-rad");
});

router.get("/statistika", (req, res) => {
  res.render("statistika");
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;