// Privremena pohrana korisnika u memoriji
const users = [];

// Pomoćna varijabla za generiranje jedinstvenih ID-eva korisnika
let nextId = 1;

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

// Pronalazi korisnika prema njegovom primarnom ključu
async function findUserById(id) {
  return users.find((user) => user.user_id === Number(id)) || null;
}

// Pronalazi korisnika prema e-mail adresi
async function findUserByEmail(email) {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return null;
  }

  return users.find((user) => user.email === normalizedEmail) || null;
}

// Pronalazi korisnika prema ORCID identifikatoru
async function findUserByOrcid(orcid) {
  const normalizedOrcid = normalizeOrcid(orcid);

  if (!normalizedOrcid) {
    return null;
  }

  return users.find((user) => user.orcid === normalizedOrcid) || null;
}

// Pronalazi korisnika prema hashu tokena za potvrdu e-maila
async function findUserByEmailVerificationTokenHash(tokenHash) {
  return (
    users.find((user) => user.email_verification_token_hash === tokenHash) ||
    null
  );
}

// Stvara novog korisnika i sprema ga u privremenu pohranu
async function createUser(userData) {
  // Normaliziranje podataka prije provjere jedinstvenosti
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

  // Kreiranje novog objekta korisnika
  const newUser = {
    user_id: nextId++,
    ime: userData.ime || null,
    prezime: userData.prezime || null,
    email: email,
    password_hash: userData.password_hash || null,
    email_verified: userData.email_verified ?? false,

    // Podaci potrebni za potvrdu e-mail adrese
    email_verification_token_hash:
      userData.email_verification_token_hash || null,
    email_verification_expires_at:
      userData.email_verification_expires_at || null,

    ustanova: userData.ustanova || null,
    orcid: orcid,
    jeAdmin: userData.jeAdmin ?? false,
    aktivan: userData.aktivan ?? true,

    // Uloge su vezane uz pojedine konferencije
    // Jedan korisnik može imati samo jednu ulogu po konferenciji
    conferenceRoles: [],
  };

  // Dodavanje novog korisnika u privremeni memoriju
  users.push(newUser);

  // Vraća stvorenog korisnika
  return newUser;
}

// Ažurira postojeće podatke korisnika
async function updateUser(id, changes) {
  // Pronalazi korisnika kojeg treba ažurirati
  const user = await findUserById(id);

  // Ako korisnik ne postoji, vraća null
  if (!user) {
    return null;
  }

  // Normaliziranje e-mail adrese ako se mijenja
  const email =
    changes.email !== undefined ? normalizeEmail(changes.email) : user.email;

  // Normaliziranje ORCID-a ako se mijenja
  const orcid =
    changes.orcid !== undefined ? normalizeOrcid(changes.orcid) : user.orcid;

  // Provjera koristi li drugi korisnik već taj e-mail
  if (email) {
    const existingEmailUser = await findUserByEmail(email);

    if (existingEmailUser && existingEmailUser.user_id !== user.user_id) {
      throw new Error("Taj e-mail već koristi drugi korisnik.");
    }
  }

  // Provjera koristi li drugi korisnik već taj ORCID
  if (orcid) {
    const existingOrcidUser = await findUserByOrcid(orcid);

    if (existingOrcidUser && existingOrcidUser.user_id !== user.user_id) {
      throw new Error("Taj ORCID već koristi drugi korisnik.");
    }
  }

  // Primjenjuje dopuštene promjene na korisnika
  Object.assign(user, changes);

  // Vraća normalizirane vrijednosti
  user.email = email;
  user.orcid = orcid;

  // Vraća ažuriranog korisnika
  return user;
}

// Postavlja ili mijenja korisnikovu ulogu na određenoj konferenciji
async function setConferenceRole(userId, conferenceId, role) {
  // Pronalazi korisnika kojem dodjeljujemo ulogu
  const user = await findUserById(userId);

  // Ako korisnik ne postoji, prijavljuje grešku
  if (!user) {
    throw new Error("Korisnik ne postoji.");
  }

  // Pretvorba ID konferencije u broj
  const numericConferenceId = Number(conferenceId);

  // Provjera postoji li već uloga za tu konferenciju
  const existingRole = user.conferenceRoles.find(
    (item) => item.conferenceId === numericConferenceId,
  );

  // Ako postoji, mijenja se postojeća uloga
  if (existingRole) {
    existingRole.role = role;
  } else {
    // Ako ne postoji, dodaje se nova uloga za tu konferenciju
    user.conferenceRoles.push({
      conferenceId: numericConferenceId,
      role: role,
    });
  }

  // Vraća dodijeljenu ili promijenjenu ulogu
  return user.conferenceRoles.find(
    (item) => item.conferenceId === numericConferenceId,
  );
}

// Dohvaća korisnikovu ulogu na određenoj konferenciji
async function getConferenceRole(userId, conferenceId) {
  // Pronalazi korisnika
  const user = await findUserById(userId);

  // Ako korisnik ne postoji, nema ni njegove uloge
  if (!user) {
    return null;
  }

  // Pronalazi ulogu za traženu konferenciju
  const conferenceRole = user.conferenceRoles.find(
    (item) => item.conferenceId === Number(conferenceId),
  );

  // Vraća pronađenu ulogu ili null
  return conferenceRole || null;
}

// Izvoz funkcija kako bi ih mogli koristiti servisi i middleware
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
