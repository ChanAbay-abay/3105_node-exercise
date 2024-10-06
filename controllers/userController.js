const userModel = require("../models/userModel");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// load environment variables from .env file
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

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

  console.log("Passed validation, creating user");
  const { username, password, email } = req.body;
  try {
    const user = await userModel.createUser(username, password, email);
    console.log("User created:", user);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userModel.findUser(username);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.json({
      message: "Login successful",
      user: { id: user.id, username: user.username },
      token: token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// gets profile (requires auth)
exports.getProfile = async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], SECRET_KEY);
    const user = { id: decoded.id, username: decoded.username };
    res.json({ message: "User profile", user });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
