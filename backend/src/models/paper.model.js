
const db = require("../db");

// Sprema osnovne podatke rada u bazu
async function spremiRad(podatci) {
  const rezultat = await db.query(
    `INSERT INTO paper (topic_id, naslov, sazetak, kljucneRijeci, stanje)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [
      podatci.tema,
      podatci.naslov.trim(),
      podatci.sazetak.trim(),
      podatci.kljucneRijeci?.trim() || null,
      podatci.stanje || "predan",
    ]
  );

  return rezultat.rows[0];
}

module.exports = {
  spremiRad,
};
