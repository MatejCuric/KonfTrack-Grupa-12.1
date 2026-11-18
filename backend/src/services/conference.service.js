const conferenceModel = require("../models/conference.model");

function dohvatiDanasnjiDatum() {
  const danas = new Date();

  const godina = danas.getFullYear();
  const mjesec = String(danas.getMonth() + 1).padStart(2, "0");
  const dan = String(danas.getDate()).padStart(2, "0");

  return `${godina}-${mjesec}-${dan}`;
}

// Dodaje informaciju o tome je li prijava radova otvorena
function pripremiKonferenciju(konferencija) {
  const danas = new Date(dohvatiDanasnjiDatum());

  const prijavaOtvorena =
    konferencija.rokPredaja >= danas && konferencija.pocetak >= danas;

  return {
    ...konferencija,
    // Dodaje se atribut id radi kompatibilnosti s postojećim dijelovima sustava koji očekuju taj naziv
    id: konferencija.conference_id,
    prijavaOtvorena,
  };
}

// Dohvaća sve konferencije
async function dohvatiSveKonferencije() {
  const konferencije = await conferenceModel.dohvatiSveKonferencije();

  return Promise.all(
    konferencije.map(async (konferencija) => {
      const teme = await conferenceModel.dohvatiTemeKonferencije(
        konferencija.conference_id
      );

      return {
        ...pripremiKonferenciju(konferencija),
        teme,
      };
    })
  );
}

// Dohvaća konferenciju prema ID-u
async function dohvatiKonferencijuPoId(id) {
  const konferencija = await conferenceModel.dohvatiKonferencijuPoId(id);

  if (!konferencija) {
    return null;
  }

  const teme= await conferenceModel.dohvatiTemeKonferencije(id);

  return {
    ...pripremiKonferenciju(konferencija),
    teme
  };
}

// Dohvaća konferencije kod kojih je prijava radova otvorena
async function dohvatiOtvoreneKonferencije() {
  const konferencije = await dohvatiSveKonferencije();

  return konferencije.filter((konferencija) => konferencija.prijavaOtvorena);
}

module.exports = {
  dohvatiSveKonferencije,
  dohvatiKonferencijuPoId,
  dohvatiOtvoreneKonferencije,
};
