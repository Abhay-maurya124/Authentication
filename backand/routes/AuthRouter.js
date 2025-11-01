const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  console.log("login successful");
  res.send("Logged in");               // send something
});

module.exports = router;