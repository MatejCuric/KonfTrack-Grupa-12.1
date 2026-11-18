const paperModel = require("../models/paper.model");
const conferenceModel = require("../models/conference.model");

async function validacijaRada(podatci,pdf){
    const greske ={};

    if(!podatci.naslov || !podatci.naslov.trim()){
        greske.naslov="Naslov rada je obvezan.";
    }
    if(!podatci.sazetak || !podatci.sazetak.trim()){
        greske.sazetak = "Sažetak rada je obvezan.";
    }

    const konferencija = await conferenceModel.dohvatiKonferencijuPoId(podatci.konferencija);
    if(!konferencija){
        greske.konferencija="Odabrana konferencija ne postoji";
    }

    if(!pdf){
        greske.pdf = "Potrebno je priložiti PDF dokument"
    }
    return greske;
}


async function spremiRad(podatci,userId) {
    return await paperModel.spremiRad({
        tema: podatci.tema,
        naslov: podatci.naslov,
        sazetak: podatci.sazetak,
        kljucneRijeci: podatci.kljucneRijeci,
         stanje: podatci.akcija === "nacrt" ? "nacrt" : "predan",
    }, userId);
}


async function dohvatiRadoveKorisnika(userId) {
  return await paperModel.dohvatiRadoveKorisnika(userId);
}


module.exports={
    validacijaRada,
    spremiRad,
    dohvatiRadoveKorisnika
};