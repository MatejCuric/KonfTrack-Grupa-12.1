const db = require("../db");


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

  // Prijava je otvorena samo ako rok za prijavu nije prošao i konferencija se još nije održala.
  const prijavaOtvorena =
  konferencija.rokZaPrijavu >= danas &&
  konferencija.pocetak >= danas;

  return {
    ...konferencija,
    prijavaOtvorena,
  };
}

// Dohvaća sve konferencije s izračunatom informacijom o prijavi
async function dohvatiSveKonferencije() {
   const rezultat = await db.query("SELECT * FROM conference");
  
   return rezultat.rows.map((konferencija) => pripremiKonferenciju(konferencija));
}

// Pronalazi konferenciju prema ID-u
async function dohvatiKonferencijuPoId(id) {
  
  const rezzultat = await db.query(
    "SELECT * FROM conference WHERE conference_id = $1",[id],);

  const konferencija = rezzultat.rows[0];

  if (!konferencija) {
    return null;
  }

  return pripremiKonferenciju(konferencija);
}

// Dohvaća konferencije kod kojih je prijava radova otvorena
async function dohvatiOtvoreneKonferencije() {
  const konferencije = await dohvatiSveKonferencije();

  return konferencije.filter(
    (konferencija) => konferencija.prijavaOtvorena,
  );
}

// Izvoz funkcija koje koriste kontroleri
module.exports = {
  dohvatiSveKonferencije,
  dohvatiKonferencijuPoId,
  dohvatiOtvoreneKonferencije,
};
