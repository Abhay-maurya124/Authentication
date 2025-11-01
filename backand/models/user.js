const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema({
  name: {
    type: string,
    require: true,
  },
  email: {
    type: string,
    require: true,
    unique: true,
  },
  password: {
    type: string,
    require: true,
  },
});

const usermodel = mongoose.model("user", userSchema);
module.exports = usermodel;
