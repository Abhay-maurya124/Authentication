const express = require("express");
const {
  signupvalidation,
  logininvalidation,
} = require("../middleware/AuthMiddleware");
const { signup, login } = require("../controllers/Authcontroller");
const router = express.Router();

router.post("/login", logininvalidation, login);
router.post("/Signup", signupvalidation, signup);
module.exports = router;
