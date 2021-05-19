const express = require("express");
const http = require("http");
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();

const server = http.createServer(app);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "index.html"));
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
