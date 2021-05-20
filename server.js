const express = require("express");
const path = require("path");

const app = express();

// set static folder
app.use(express.static(path.join(__dirname, "client", "public")));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
