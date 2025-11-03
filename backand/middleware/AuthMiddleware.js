const joi = require("joi");

const signupvalidation = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().required().min(3).max(100),
    email: joi.string().required().email(),
    password: joi.string().required().min(4).max(100),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "bad request", error: error.details });
  }
  next();
};

const logininvalidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required().min(4).max(100),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "bad request", error: error.details });
  }
  next();
};

module.exports = { signupvalidation, logininvalidation };
