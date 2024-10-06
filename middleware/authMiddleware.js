const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

//load environment variables
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  console.log("Received token:", token); //recieved token log

  const tokenParts = token.split(" ");
  console.log("Token parts:", tokenParts); //log split token parts
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid token format" });
  }

  //use the second part of the token
  const jwtToken = tokenParts[1];
  console.log("JWT Token for verification:", jwtToken); //log token being verified

  try {
    const decoded = jwt.verify(jwtToken, SECRET_KEY);
    req.user = decoded; //save user information in req.user
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};
