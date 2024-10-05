const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//user registration
router.post("/register", userController.register);

//user login
router.post("/login", userController.login);

//profile (protected)
router.get("/profile", authMiddleware, userController.getProfile);

module.exports = router;
