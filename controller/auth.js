const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const User = require("../model/User.js");

async function signup(req, res) {
  try {
    const signUpSchema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      role: Joi.string().required().valid("customer", "business"),
      businessName: Joi.string(),
      bAddress: Joi.string(),
      bPhone: Joi.number(),
      city: Joi.string(),
      postalCode: Joi.number(),
      cAddress: Joi.string(),
    });
    let status = signUpSchema.validate(req.body, {
      allowUnknown: true,
      abortEarly: false,
    });

    if (status.error) {
      let errors = status.error.details.map((detail) => {
        return {
          message: detail.message,
          field: detail.context.key,
        };
      });
      return res.status(400).send({
        msg: "Bad request",
        errors,
      });
    }

    let {
      firstName,
      email,
      password,
      role,
      businessName,
      bAddress,
      bPhone,
      city,
      postalCode,
      cAddress,
    } = req.body;

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        message: "Bad request",
        errors: [
          {
            msg: "Email already used",
            field: "email",
          },
        ],
      });
    }

    let hashedPassword = await bcrypt.hash(password, 10);
    let user = await User.create({
      firstName: firstName,
      email: email,
      password: hashedPassword,
      role: role,
      businessName: businessName,
      bAddress: bAddress,
      bPhone: bPhone,
      city: city,
      postalCode: postalCode,
      cAddress: cAddress,
    });
    return res.send(user);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    user = user.toObject();
    let validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      delete user.password;
      const JWT_SECRET_KEY = "chhhup";
      let token = jwt.sign(user, JWT_SECRET_KEY);
      user.token = token;
      res.send({ data: user });
      return;
    }
  }
  res.status(401).send({ msg: "Invalid credentials!!" });
}

module.exports = { signup: signup, login: login };
