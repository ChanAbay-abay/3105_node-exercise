const userModel = require("../models/userModel");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your-secret-key"; // make sure to use the same key in authMiddleware

// registers new user
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

  // creates user if validation completes
  console.log("Passed validation, creating user");
  const { username, password, email } = req.body;
  const user = await userModel.createUser(username, password, email);

  console.log("User created:", user);
  res.status(201).json({ message: "User registered successfully", user });
};

// login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = userModel.findUser(username);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // matches password with stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // store user info in session
  req.session.userId = user.id;
  req.session.username = user.username;

  // Generate JWT token
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: "1h",
  });

  res.json({
    message: "Login successful",
    user: { id: user.id, username: user.username },
    token: token,
  });
};

// logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Could not log out" });
    }
    res.json({ message: "Logged out successfully" });
  });
};

// get profile (reqs auth)
exports.getProfile = (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = { id: req.session.userId, username: req.session.username };
  res.json({ message: "User profile", user });
};
