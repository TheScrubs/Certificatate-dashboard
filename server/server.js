const express = require("express");
const path = require("path");

//config dot env
require("dotenv").config();

// Initialise express app
const app = express();

// Body Parser Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));

// set static folder
app.use(express.static(path.join(__dirname, "../", "client", "public")));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
