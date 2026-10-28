const express = require("express");
const path = require("path");

const routes = require("./controllers/konftrack.controller");

const app = express();

// Lokacija EJS prikaza
app.set("views", path.join(__dirname, "..", "..", "frontend", "src", "pages"));
app.set("view engine", "ejs");

// Statičke datoteke
app.use(express.static(path.join(__dirname, "..", "..", "frontend", "public")));

// Parsiranje tijela zahtjeva
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rute aplikacije
app.use("/", routes);

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`KonfTrack je pokrenut na http://localhost:${PORT}`);
});

// const server = http.createServer((req, res) => {
//   if (req.url === "/health") {
//     res.writeHead(200, { "Content-Type": "application/json" });
//     return res.end(JSON.stringify({ status: "healthy" }));
//   }
//   res.writeHead(200, { "Content-Type": "text/plain" });
//   res.end("API running");
// });

// server.listen(port, "0.0.0.0", () => {
//   console.log(`Server listening on 0.0.0.0:${port}`);
// });
