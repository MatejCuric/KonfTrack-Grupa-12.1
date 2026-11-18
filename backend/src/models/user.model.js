// Uvoz zajedničkog PostgreSQL poola za pristup bazi podataka
const db = require("../db");

// Pomoćna funkcija za normalizaciju e-mail adrese
function normalizeEmail(email) {
  if (!email) {
    return null;
  }

  return email.trim().toLowerCase();
}

// Pomoćna funkcija za normalizaciju ORCID identifikatora
function normalizeOrcid(orcid) {
  if (!orcid) {
    return null;
  }

  return orcid.trim();
}

// Dohvaća uloge korisnika na konferencijama
async function getConferenceRoles(userId) {
  const rezultat = await db.query(
    `
      SELECT
        conference_id AS "conferenceId",
        uloga AS role
      FROM user_conf
      WHERE user_id = $1
    `,
    [userId],
  );

  return rezultat.rows;
}

// Pronalazi korisnika prema primarnom ključu
async function findUserById(id) {
  const rezultat = await db.query(
    `
      SELECT
        user_id,
        ime,
        prezime,
        email,
        email_verified,
        email_verification_token_hash,
        email_verification_expires_at,
        ustanova,
        orcid,
        jeadmin AS "jeAdmin",
        aktivan
      FROM users
      WHERE user_id = $1
    `,
    [id],
  );

  const user = rezultat.rows[0];

  if (!user) {
    return null;
  }

  // Uloge se dohvaćaju posebno jer se nalaze u tablici user_conf
  user.conferenceRoles = await getConferenceRoles(user.user_id);

  return user;
}

// Pronalazi korisnika prema e-mail adresi
async function findUserByEmail(email) {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return null;
  }

  const rezultat = await db.query(
    `
      SELECT
        user_id,
        ime,
        prezime,
        email,
        password_hash,
        email_verified,
        email_verification_token_hash,
        email_verification_expires_at,
        ustanova,
        orcid,
        jeadmin AS "jeAdmin",
        aktivan
      FROM users
      WHERE email = $1
    `,
    [normalizedEmail],
  );

  return rezultat.rows[0] || null;
}

// Pronalazi korisnika prema ORCID identifikatoru
async function findUserByOrcid(orcid) {
  const normalizedOrcid = normalizeOrcid(orcid);

  if (!normalizedOrcid) {
    return null;
  }

  const rezultat = await db.query(
    `
      SELECT
        user_id,
        ime,
        prezime,
        email,
        email_verified,
        email_verification_token_hash,
        email_verification_expires_at,
        ustanova,
        orcid,
        jeadmin AS "jeAdmin",
        aktivan
      FROM users
      WHERE orcid = $1
    `,
    [normalizedOrcid],
  );

  return rezultat.rows[0] || null;
}

// Pronalazi korisnika prema hashu tokena za potvrdu e-maila
async function findUserByEmailVerificationTokenHash(tokenHash) {
  if (!tokenHash) {
    return null;
  }

  const rezultat = await db.query(
    `
      SELECT
        user_id,
        ime,
        prezime,
        email,
        email_verified,
        email_verification_token_hash,
        email_verification_expires_at,
        ustanova,
        orcid,
        jeadmin AS "jeAdmin",
        aktivan
      FROM users
      WHERE email_verification_token_hash = $1
    `,
    [tokenHash],
  );

  return rezultat.rows[0] || null;
}

// Stvara novog korisnika u PostgreSQL bazi
async function createUser(userData) {
  // Normaliziranje podataka prije spremanja
  const email = normalizeEmail(userData.email);
  const orcid = normalizeOrcid(userData.orcid);

  // Provjera postoji li već korisnik s istim e-mailom
  if (email && (await findUserByEmail(email))) {
    throw new Error("Korisnik s tom e-mail adresom već postoji.");
  }

  // Provjera postoji li već korisnik s istim ORCID-om
  if (orcid && (await findUserByOrcid(orcid))) {
    throw new Error("Korisnik s tim ORCID identifikatorom već postoji.");
  }

  // Dodavanje novog korisnika u bazu
  const rezultat = await db.query(
    `
      INSERT INTO users (
        ime,
        prezime,
        email,
        password_hash,
        email_verified,
        email_verification_token_hash,
        email_verification_expires_at,
        ustanova,
        orcid,
        jeAdmin,
        aktivan
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING
        user_id,
        ime,
        prezime,
        email,
        password_hash,
        email_verified,
        email_verification_token_hash,
        email_verification_expires_at,
        ustanova,
        orcid,
        jeadmin AS "jeAdmin",
        aktivan
    `,
    [
      userData.ime || null,
      userData.prezime || null,
      email,
      userData.password_hash || null,
      userData.email_verified ?? false,
      userData.email_verification_token_hash || null,
      userData.email_verification_expires_at || null,
      userData.ustanova || null,
      orcid,
      userData.jeAdmin ?? false,
      userData.aktivan ?? true,
    ],
  );

  const newUser = rezultat.rows[0];

  // Novi korisnik zasad nema dodijeljene konferencijske uloge
  newUser.conferenceRoles = [];

  return newUser;
}

// Ažurira postojeće podatke korisnika
async function updateUser(id, changes) {
  // Pronalazi korisnika kojeg treba ažurirati
  const user = await findUserById(id);

  if (!user) {
    return null;
  }

  // Normalizira e-mail ako se mijenja
  const email =
    changes.email !== undefined ? normalizeEmail(changes.email) : user.email;

  // Normalizira ORCID ako se mijenja
  const orcid =
    changes.orcid !== undefined ? normalizeOrcid(changes.orcid) : user.orcid;

  // Provjera koristi li drugi korisnik već taj e-mail
  if (email && email !== user.email) {
    const existingEmailUser = await findUserByEmail(email);

    if (existingEmailUser && existingEmailUser.user_id !== user.user_id) {
      throw new Error("Taj e-mail već koristi drugi korisnik.");
    }
  }

  // Provjera koristi li drugi korisnik već taj ORCID
  if (orcid && orcid !== user.orcid) {
    const existingOrcidUser = await findUserByOrcid(orcid);

    if (existingOrcidUser && existingOrcidUser.user_id !== user.user_id) {
      throw new Error("Taj ORCID već koristi drugi korisnik.");
    }
  }

  // Dopuštena polja koja se mogu mijenjati
  const allowedChanges = {
    ime: changes.ime,
    prezime: changes.prezime,
    email,
    password_hash: changes.password_hash,
    email_verified: changes.email_verified,
    email_verification_token_hash: changes.email_verification_token_hash,
    email_verification_expires_at: changes.email_verification_expires_at,
    ustanova: changes.ustanova,
    orcid,
    jeAdmin: changes.jeAdmin,
    aktivan: changes.aktivan,
  };

  // Izbacuje polja koja nisu poslana u promjeni
  const entries = Object.entries(allowedChanges).filter(
    ([, value]) => value !== undefined,
  );

  // Ako nema promjena, vraća postojeći zapis
  if (entries.length === 0) {
    return user;
  }

  // Pretvara dopuštena polja u SQL SET izraze
  const setClauses = entries.map(([column], index) => {
    // PostgreSQL jeAdmin tretira kao jeadmin jer naziv nije quoted
    const sqlColumn = column === "jeAdmin" ? "jeadmin" : column;

    return `${sqlColumn} = $${index + 1}`;
  });

  // Vrijednosti koje će biti proslijeđene parametriziranom SQL upitu
  const values = entries.map(([, value]) => value);

  // ID korisnika je zadnji parametar
  values.push(id);

  // Ažuriranje korisnika u bazi
  const rezultat = await db.query(
    `
      UPDATE users
      SET ${setClauses.join(", ")}
      WHERE user_id = $${values.length}
      RETURNING
        user_id,
        ime,
        prezime,
        email,
        password_hash,
        email_verified,
        email_verification_token_hash,
        email_verification_expires_at,
        ustanova,
        orcid,
        jeadmin AS "jeAdmin",
        aktivan
    `,
    values,
  );

  const updatedUser = rezultat.rows[0] || null;

  if (updatedUser) {
    // Ponovno dohvaća uloge korisnika iz user_conf
    updatedUser.conferenceRoles = await getConferenceRoles(updatedUser.user_id);
  }

  return updatedUser;
}

// Postavlja ili mijenja korisnikovu ulogu na određenoj konferenciji
async function setConferenceRole(userId, conferenceId, role) {
  // Provjera postoji li korisnik
  const user = await findUserById(userId);

  if (!user) {
    throw new Error("Korisnik ne postoji.");
  }

  // Ako uloga već postoji, mijenja se na novu vrijednost
  const rezultat = await db.query(
    `
      INSERT INTO user_conf (
        conference_id,
        user_id,
        uloga
      )
      VALUES ($1, $2, $3)
      ON CONFLICT (conference_id, user_id)
      DO UPDATE SET uloga = EXCLUDED.uloga
      RETURNING
        conference_id AS "conferenceId",
        uloga AS role
    `,
    [Number(conferenceId), Number(userId), role],
  );

  return rezultat.rows[0];
}

// Dohvaća korisnikovu ulogu na određenoj konferenciji
async function getConferenceRole(userId, conferenceId) {
  const rezultat = await db.query(
    `
      SELECT
        conference_id AS "conferenceId",
        uloga AS role
      FROM user_conf
      WHERE user_id = $1
        AND conference_id = $2
    `,
    [userId, Number(conferenceId)],
  );

  return rezultat.rows[0] || null;
}

// Izvoz funkcija za servise i middleware
module.exports = {
  findUserById,
  findUserByEmail,
  findUserByOrcid,
  findUserByEmailVerificationTokenHash,
  createUser,
  updateUser,
  setConferenceRole,
  getConferenceRole,
};
