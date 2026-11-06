// Uvoz biblioteke bcryptjs za hashiranje i provjeru lozinki
const bcrypt = require("bcryptjs");

// Uvoz biblioteke za generiranje sigurnih nasumičnih tokena i njihovo hashiranje
const crypto = require("crypto");

// Uvoz modela koji omogućuje pristup korisnicima
const userModel = require("../models/user.model");

// Uvoz servisa za slanje e-mailova
const emailService = require("./email.service");

// Definicija koliko će bcrypt puta provesti postupak hashiranja
const SALT_ROUNDS = 12;

// Koliko dugo vrijedi token za potvrdu e-maila
const EMAIL_TOKEN_EXPIRATION = 1000 * 60 * 60 * 24; // 24 sata

// Funkcija za registraciju novog korisnika
async function registerUser(userData) {
  // Dohvaća podatke iz obrasca i uklanja nepotrebne razmake
  const ime = userData.ime?.trim();
  const prezime = userData.prezime?.trim();
  const email = userData.email?.trim().toLowerCase();
  const password = userData.password;
  const passwordConfirm = userData.passwordConfirm;

  // Provjera jesu li sva obvezna polja unesena
  if (!ime || !prezime || !email || !password || !passwordConfirm) {
    throw new Error("Potrebno je ispuniti sva obvezna polja.");
  }

  // Provjera osnovnog formata e-mail adrese
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw new Error("Unesite ispravnu e-mail adresu.");
  }

  // Provjera minimalne duljine lozinke
  if (password.length < 8) {
    throw new Error("Lozinka mora sadržavati najmanje 8 znakova.");
  }

  // Provjera podudaraju li se unesene lozinke
  if (password !== passwordConfirm) {
    throw new Error("Lozinke se ne podudaraju.");
  }

  // Provjera postoji li već korisnik s tom e-mail adresom
  const existingUser = await userModel.findUserByEmail(email);

  if (existingUser) {
    throw new Error("Korisnik s tom e-mail adresom već postoji.");
  }

  // Hashiranje lozinke prije spremanja u model
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  // Generiranje nasumičnog tokena od 32 bajta
  const verificationToken = crypto.randomBytes(32).toString("hex");

  // Hashiranje tokena prije spremanja u model
  const verificationTokenHash = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  // Izračunava vrijeme isteka tokena
  const verificationTokenExpiresAt = new Date(
    Date.now() + EMAIL_TOKEN_EXPIRATION,
  );

  // Stvaranje novog korisnika putem modela
  const newUser = await userModel.createUser({
    ime: ime,
    prezime: prezime,
    email: email,
    password_hash: passwordHash,

    // ORCID zasad nije obvezan
    orcid: null,

    // E-mail još nije potvrđen
    email_verified: false,

    // Sprema hash tokena i vrijeme njegova isteka
    email_verification_token_hash: verificationTokenHash,
    email_verification_expires_at: verificationTokenExpiresAt,

    // Novi korisnički račun nije administratorski
    jeAdmin: false,

    // Novi korisnički račun je aktivan
    aktivan: true,
  });

  // Određuje osnovnu adresu aplikacije
  // U produkciji se može postaviti kroz APP_BASE_URL
  const appBaseUrl = process.env.APP_BASE_URL || "http://localhost:10000";

  // Sastavlja poveznicu koja sadrži originalni token
  const verificationUrl = `${appBaseUrl}/verify-email?token=${verificationToken}`;

  // Šalje e-mail s poveznicom za potvrdu
  await emailService.sendVerificationEmail(email, verificationUrl);

  // Vraća stvorenog korisnika
  return newUser;
}

// Potvrđuje e-mail adresu pomoću tokena iz poveznice
async function verifyEmail(token) {
  // Provjera je li token uopće dostavljen
  if (!token || typeof token !== "string") {
    throw new Error("Poveznica za potvrdu nije ispravna.");
  }

  // Hashira token koji smo dobili iz poveznice
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

  // Pronalazi korisnika prema hashu tokena
  const user = await userModel.findUserByEmailVerificationTokenHash(tokenHash);

  // Ako korisnik nije pronađen, token je neispravan ili već iskorišten
  if (!user) {
    throw new Error(
      "Poveznica za potvrdu nije ispravna ili je već iskorištena.",
    );
  }

  // Provjera je li token istekao
  if (
    !user.email_verification_expires_at ||
    user.email_verification_expires_at.getTime() < Date.now()
  ) {
    throw new Error("Poveznica za potvrdu je istekla.");
  }

  // Označava e-mail adresu kao potvrđenu
  await userModel.updateUser(user.user_id, {
    email_verified: true,

    // Uklanja token jer se može iskoristiti samo jednom
    email_verification_token_hash: null,
    email_verification_expires_at: null,
  });

  // Vraća potvrđenog korisnika
  return user;
}

// Funkcija za prijavu postojećeg korisnika
async function loginUser(email, password) {
  // Provjera jesu li uneseni e-mail i lozinka
  if (!email || !password) {
    throw new Error("Potrebno je unijeti e-mail i lozinku.");
  }

  // Normalizira e-mail
  const normalizedEmail = email.trim().toLowerCase();

  // Pronalazi korisnika prema e-mail adresi
  const user = await userModel.findUserByEmail(normalizedEmail);

  // Ako korisnik ne postoji, ne otkriva se je li e-mail registriran
  if (!user) {
    throw new Error("Neispravna e-mail adresa ili lozinka.");
  }

  // Provjera ima li korisnik spremljen hash lozinke
  if (!user.password_hash) {
    throw new Error("Ovaj račun nema postavljenu lozinku.");
  }

  // Provjera je li korisnički račun aktivan
  if (!user.aktivan) {
    throw new Error("Korisnički račun nije aktivan.");
  }

  // Provjera podudara li se unesena lozinka sa spremljenim hashom
  const passwordMatches = await bcrypt.compare(password, user.password_hash);

  // Ako lozinka nije ispravna, odbija se prijava
  if (!passwordMatches) {
    throw new Error("Neispravna e-mail adresa ili lozinka.");
  }

  // Provjera je li e-mail potvrđen
  if (!user.email_verified) {
    throw new Error("Prije prijave morate potvrditi svoju e-mail adresu.");
  }

  // Ako su svi uvjeti zadovoljeni, vraća korisnika
  return user;
}

// Pronalazi korisnika prema ORCID-u
async function findOrcidUser(orcid) {
  if (!orcid || typeof orcid !== "string") {
    throw new Error("ORCID nije ispravan.");
  }

  const normalizedOrcid = orcid.trim();

  return await userModel.findUserByOrcid(normalizedOrcid);
}

// Stvara novi korisnički račun putem ORCID-a
async function createOrcidUser(orcid, ime, prezime) {
  // Provjera jesu li svi obvezni podaci dostupni
  const normalizedOrcid = orcid?.trim();
  const normalizedIme = ime?.trim();
  const normalizedPrezime = prezime?.trim();

  if (!normalizedOrcid || !normalizedIme || !normalizedPrezime) {
    throw new Error("ORCID, ime i prezime su obvezni.");
  }

  // Ponovna provjera postoji li korisnik s tim ORCID-om
  const existingUser = await userModel.findUserByOrcid(normalizedOrcid);

  if (existingUser) {
    return existingUser;
  }

  // Stvara novi ORCID korisnički račun
  const newUser = await userModel.createUser({
    ime: normalizedIme,
    prezime: normalizedPrezime,

    // ORCID korisnik zasad nema e-mail ni lozinku
    email: null,
    password_hash: null,

    orcid: normalizedOrcid,

    // ORCID prijava ne zahtijeva potvrdu e-maila
    email_verified: false,

    jeAdmin: false,
    aktivan: true,
  });

  return newUser;
}

// Izvoz funkcija kako bi ih mogao koristiti kontroler
module.exports = {
  registerUser,
  verifyEmail,
  loginUser,
  findOrcidUser,
  createOrcidUser,
};
