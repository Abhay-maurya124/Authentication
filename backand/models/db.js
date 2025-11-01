const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/auth-db")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log(`something went wrong`);
  });
