const http = require("http");

const express = require("express");   // express framework
const app = express();                // added express instance as app

const path = require("path");         // simpler path referencing     

const routes = require('./middleware/konftrack.routes');
// routes found in /backend/src/middleware/

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', '..', 'frontend', 'src', 'pages'))
// EJS templates can be found in /frontend/src/pages/

const PORT = process.env.PORT || 10000;

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`App is running at https://localhost:${PORT}`)
})

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
