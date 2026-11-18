const db = require("../db");


// Sprema osnovne podatke rada u bazu pomoću transakcije kako bi se osiguralo da su svi povezani podaci dosljedni
async function spremiRad(podatci, userId) {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    // 1. Spremanje osnovnih podataka rada
    const rezultat = await client.query(
      `INSERT INTO paper
        (topic_id, naslov, sazetak, kljucneRijeci, stanje)
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

    const rad = rezultat.rows[0];

    // 2. Povezivanje rada s prijavljenim korisnikom
    await client.query(
      `INSERT INTO paper_author
        (paper_id, user_id, redniBroj, kontaktOsoba, izlagac)
       VALUES ($1, $2, $3, $4, $5)`,
      [rad.paper_id, userId, 1, true, true]
    );

    // 3. Stvaranje zapisa prve verzije bez PDF datoteke
    await client.query(
      `INSERT INTO paper_version
        (paper_id, tip, redniBrojRunde, datoteka, internNaziv)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        rad.paper_id,
        "prva",
        1,
        null,
        `rad-${rad.paper_id}-prva.pdf`,
      ]
    );

    await client.query("COMMIT");

    return rad;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}


async function dohvatiRadoveKorisnika(userId) {
  const rezultat = await db.query(
    `SELECT
       p.paper_id,
       p.naslov,
       p.stanje,
       t.naziv AS kategorija
     FROM paper p
     JOIN paper_author pa ON pa.paper_id = p.paper_id
     JOIN topic t ON t.topic_id = p.topic_id
     WHERE pa.user_id = $1
     ORDER BY p.paper_id DESC`,
    [userId]
  );

  return rezultat.rows;
}

module.exports = {
  spremiRad,
  dohvatiRadoveKorisnika
};
