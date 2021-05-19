const express = require("express");
const http = require("http");
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();

const server = http.createServer(app);

app.use(express.static(path.join(__dirname, "client", "public")));

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
