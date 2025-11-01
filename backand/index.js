const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const authrouter = require("./routes/AuthRouter");   // correct path

const app = express();

const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());

app.get("/ping", (req, res) => {
  res.send("my name is abhay");
});

app.use("/auth", authrouter);

app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
