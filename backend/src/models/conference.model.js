const db = require("../db");

// Dohvaća sve konferencije
async function dohvatiSveKonferencije() {
  const rezultat = await db.query("SELECT * FROM conference");

  return rezultat.rows;
}

// Dohvaća konferenciju prema ID-u
async function dohvatiKonferencijuPoId(id) {
  const rezultat = await db.query(
    "SELECT * FROM conference WHERE conference_id = $1",
    [id]
  );

  return rezultat.rows[0] || null;
}

module.exports = {
  dohvatiSveKonferencije,
  dohvatiKonferencijuPoId,
};