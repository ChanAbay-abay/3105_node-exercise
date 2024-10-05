const userModel = require("../models/userModel");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your-secret-key";
const bcrypt = require("bcrypt");

//registers new user
exports.register = async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    console.error("Validation error:", error.details[0].message);
    return res.status(400).json({ message: error.details[0].message });
  }

  // Create user if validation passes
  console.log("Passed validation, creating user");
  const { username, password, email } = req.body;
  const user = await userModel.createUser(username, password, email); // Await here

  console.log("User created:", user);
  res.status(201).json({ message: "User registered successfully", user });
};

//login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = userModel.findUser(username);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Compare the provided password with the stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
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
