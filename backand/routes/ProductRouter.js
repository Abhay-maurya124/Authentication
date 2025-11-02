const { ensureAuthenticated } = require("../middleware/Auth");

const router = require("express").Router();

router.get("/", ensureAuthenticated, (req, res) => {
  console.log('....logged in user detail',req.user)
  res.status(200).json([
    { name: "oppo z7 fold", price: "40,000" },

    { name: "fridg", price: "40,000" },
  ]);
});

module.exports = router