const conferneceService = require("./conference.service")

function validacijaRada(podatci,pdf){
    const greske ={};

    if(!podatci.naslov || !podatci.naslov.trim()){
        greske.naslov="Naslov rada je obvezan.";
    }
    if(!podatci.sazetak || !podatci.sazetak.trim()){
        greske.sazetak = "Sažetak rada je obvezan.";
    }

    const konferencija = conferneceService.dohvatiKonferencijuPoId(podatci.konferencija);
    if(!konferencija){
        greske.konferencija="Odabrana konferencija ne postoji";
    }

    if(konferencija && !konferencija.teme.includes(podatci.tema)){
        greske.tema="Odabrana tema ne pripada konferenciji"
    }

    if(!pdf){
        greske.pdf = "Potrebno je priložiti PDF dokument"
    }
    return greske;
}

module.exports={
    validacijaRada
};