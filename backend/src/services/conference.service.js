// backend/src/services/conference.service.js

const konferencije = [
  {
    id: 1,
    naziv: "Dani Elektrotehnike i Računarstva 2026",
    kratakOpis: "Godišnja konferencija o novitetima u računarstvu i elektrotehnici.",
    mjesto: "Zagreb",
    datumOdrzavanja: "2026-12-15",
    rokZaPrijavu: "2026-11-30" 
  },
  {
    id: 2,
    naziv: "Web Tehnologije i Inovacije",
    kratakOpis: "Konferencija posvećena modernim web frameworkovima i arhitekturama.",
    mjesto: "Split",
    datumOdrzavanja: "2027-01-20",
    rokZaPrijavu: "2026-12-15" 
  },
  {
    id: 3,
    naziv: "Umjetna Inteligencija u Praksi",
    kratakOpis: "Primjena AI modela u industriji i znanstvenim istraživanjima.",
    mjesto: "Dubrovnik",
    datumOdrzavanja: "2026-11-25",
    rokZaPrijavu: "2026-11-01" 
  }
];

function dohvatiSveKonferencije() {
  return konferencije;
}

module.exports = {
  dohvatiSveKonferencije
};