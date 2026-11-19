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

// Dohvaća teme određene konferencije
async function dohvatiTemeKonferencije(conferenceId) {
  const rezultat = await db.query(
    "SELECT * FROM topic WHERE conference_id = $1 ORDER BY topic_id",
    [conferenceId]
  );

  return rezultat.rows;
}

module.exports = {
  dohvatiSveKonferencije,
  dohvatiKonferencijuPoId,
  dohvatiTemeKonferencije
};