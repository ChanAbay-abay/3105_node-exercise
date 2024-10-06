const jwt = require("jsonwebtoken");
const SECRET_KEY = "your-secret-key";

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], SECRET_KEY);
    req.user = decoded;

    // Check if token expired
    const now = Math.floor(Date.now() / 1000); // time in seconds
    if (decoded.exp < now) {
      return res.status(401).json({ message: "Token has expired" });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
