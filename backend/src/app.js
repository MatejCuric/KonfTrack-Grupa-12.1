const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 10000;

//Postavljanje EJS-a za pregled stranica
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../../frontend/src/pages"));

//Omogućavanje statičkih datoteka
app.use(express.static(path.join(__dirname, "../../frontend/public")));

//Omogućavanje čitanja JSON-a i URL-encoded podataka iz zahtjeva
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check ruta
app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

// Početna stranica (home.ejs)
app.get("/", (req, res) => {
  res.render("home");
});

// Stranica za prijavu (login.ejs)
app.get("/login", (req, res) => {
  res.render("login");
});

// Moje konferencije (moje-konferencije.ejs)
app.get("/moje-konferencije", (req, res) => {
  res.render("moje-konferencije");
});

// Moji radovi (moji-radovi.ejs)
app.get("/moji-radovi", (req, res) => {
  res.render("moji-radovi");
});

// Moje recenzije (moje-recenzije.ejs)
app.get("/moje-recenzije", (req, res) => {
  res.render("moje-recenzije");
});

// Predaj rad (predaj-rad.ejs)
app.get("/predaj-rad", (req, res) => {
  res.render("predaj-rad");
});

// Statistika (statistika.ejs)
app.get("/statistika", (req, res) => {
  res.render("statistika");
});

// Admin (admin.ejs)
app.get("/admin", (req, res) => {
  res.render("admin");
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on http://localhost:${port}`);
});