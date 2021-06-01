const express = require("express");
const router = express.Router();

//File Upload
router.post("/upload", (req, res) => {
  console.log(req);
  res.send("File Uploaded Successfully");
});

module.exports = router;
