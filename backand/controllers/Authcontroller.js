const usermodel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ======================= SIGNUP =======================
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await usermodel.findOne({ email });

    if (user) {
      return res
        .status(409)
        .json({ message: "user already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new usermodel({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      message: "signup successfully",
      success: true,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

// ======================= LOGIN =======================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await usermodel.findOne({ email });
    if (!user) {
      return res
        .status(403)
        .json({ message: "auth failed — email or password is wrong", success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(403)
        .json({ message: "auth failed — email or password is wrong", success: false });
    }

    const jwttoken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_TOKEN,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "login successfully",
      success: true,
      jwttoken,
      name: user.name,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

module.exports = { signup, login };
