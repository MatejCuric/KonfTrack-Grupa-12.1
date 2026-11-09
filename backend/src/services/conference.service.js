const konferencije = [
  {
    id: 1,

    // Osnovni podaci konferencije
    naziv: "Dani Elektrotehnike i Računarstva 2026",
    kratakOpis:
      "Godišnja konferencija o novitetima u računarstvu i elektrotehnici.",
    opis:
      "Konferencija okuplja istraživače, stručnjake i studente iz područja " +
      "elektrotehnike i računarstva radi predstavljanja znanstvenih i stručnih radova.",

    mjesto: "Zagreb",
    datumOdrzavanja: "2026-12-15",

    // Rokovi pojedinih faza konferencije
    rokZaPrijavu: "2026-11-30",
    rokRecenzija: "2026-12-05",
    rokObavijestAutorima: "2026-12-08",
    rokKonacneVerzije: "2026-12-12",

    // Teme koje korisnik može odabrati prilikom predaje rada
    teme: [
      "Računalne mreže i komunikacije",
      "Razvoj programskih sustava",
      "Umjetna inteligencija",
      "Elektrotehnički sustavi",
    ],
  },

  {
    id: 2,

    naziv: "Web Tehnologije i Inovacije",
    kratakOpis:
      "Konferencija posvećena modernim web tehnologijama, frameworkovima i arhitekturama.",
    opis:
      "Konferencija je usmjerena na predstavljanje novih pristupa razvoju " +
      "web aplikacija, distribuiranih sustava i suvremenih softverskih arhitektura.",

    mjesto: "Split",
    datumOdrzavanja: "2027-01-20",

    rokZaPrijavu: "2026-12-15",
    rokRecenzija: "2027-01-02",
    rokObavijestAutorima: "2027-01-06",
    rokKonacneVerzije: "2027-01-14",

    teme: [
      "Frontend tehnologije",
      "Backend tehnologije",
      "Web sigurnost",
      "Softverska arhitektura",
      "Razvoj distribuiranih sustava",
    ],
  },

  {
    id: 3,

    naziv: "Umjetna Inteligencija u Praksi",
    kratakOpis: "Primjena AI modela u industriji i znanstvenim istraživanjima.",
    opis:
      "Konferencija predstavlja praktičnu primjenu umjetne inteligencije " +
      "u različitim područjima industrije, znanosti i svakodnevnog poslovanja.",

    mjesto: "Dubrovnik",
    datumOdrzavanja: "2026-11-25",

    rokZaPrijavu: "2026-11-01",
    rokRecenzija: "2026-11-10",
    rokObavijestAutorima: "2026-11-15",
    rokKonacneVerzije: "2026-11-21",

    teme: [
      "Strojno učenje",
      "Duboko učenje",
      "Obrada prirodnog jezika",
      "Računalni vid",
      "Primjena umjetne inteligencije",
    ],
  },
];

function dohvatiDanasnjiDatum() {
  const danas = new Date();

  const godina = danas.getFullYear();
  const mjesec = String(danas.getMonth() + 1).padStart(2, "0");
  const dan = String(danas.getDate()).padStart(2, "0");

  return `${godina}-${mjesec}-${dan}`;
}

// Dodaje informaciju o tome je li prijava radova otvorena
function pripremiKonferenciju(konferencija) {
  const danas = dohvatiDanasnjiDatum();

  // Prijava je otvorena samo ako rok za prijavu nije prošao i konferencija se još nije održala.
  const prijavaOtvorena =
    konferencija.rokZaPrijavu >= danas && konferencija.datumOdrzavanja >= danas;

  return {
    ...konferencija,
    prijavaOtvorena,
  };
}

// Dohvaća sve konferencije s izračunatom informacijom o prijavi
function dohvatiSveKonferencije() {
  return konferencije.map(pripremiKonferenciju);
}

// Pronalazi konferenciju prema ID-u
function dohvatiKonferencijuPoId(id) {
  const konferencija = konferencije.find(
    (konferencija) => konferencija.id === Number(id),
  );

  if (!konferencija) {
    return null;
  }

  return pripremiKonferenciju(konferencija);
}

// Dohvaća konferencije kod kojih je prijava radova otvorena
function dohvatiOtvoreneKonferencije() {
  return dohvatiSveKonferencije().filter(
    (konferencija) => konferencija.prijavaOtvorena,
  );
}

// Izvoz funkcija koje koriste kontroleri
module.exports = {
  dohvatiSveKonferencije,
  dohvatiKonferencijuPoId,
  dohvatiOtvoreneKonferencije,
};
