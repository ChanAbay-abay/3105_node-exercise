const userModel = require("../models/userModel");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your-secret-key";

//registers new user
exports.register = (req, res) => {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  // Create user if validation passes
  const { username, password, email } = req.body;
  const user = userModel.createUser(username, password, email);
  res.status(201).json({ message: "User registered successfully", user });
};

//login
exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = userModel.findUser(username);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: "1h",
  });
  res.json({ message: "Login successful", token });
};

//get profile (reqs auth)
exports.getProfile = (req, res) => {
  const user = req.user; //set by auth middleware
  res.json({ message: "User profile", user });
};
