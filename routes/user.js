const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

//user registration
router.post("/register", userController.register);

//user login
router.post("/login", userController.login);

//user logout
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Could not log out" });
    }
    res.status(200).json({ message: "Logout successful" });
  });
});

//profile (protected)
router.get("/profile", authMiddleware, userController.getProfile);

module.exports = router;
