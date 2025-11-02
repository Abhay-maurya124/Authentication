const usermodel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usermodel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "user already exist", success: false });
    }
    const userModel = new usermodel({ name, email, password });

    userModel.password = await bcrypt.hash(password, 10);

    await userModel.save();
    res.status(201).json({
      message: "signup successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};
const login = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await usermodel.findOne({ email });
    const errormessage = "Auth fail email or password is wrong";
    if (!user) {
      return res.status(403).json({ message: errormessage, success: false });
    }
    const ispassequal = await bcrypt.compare(password, user.password);
    if (!ispassequal) {
      return res.status(403).json({ message: errormessage, success: false });
    }

    const jwttoken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_TOKEN,
      { expiresIn: "24h" }
    );
    // const userModel = new usermodel({ name, email, password });

    // userModel.password = await bcrypt.hash(password, 10);

    res.status(200).json({
      message: "login successfully",
      success: true,
      jwttoken,
      email,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

module.exports = { signup, login };
