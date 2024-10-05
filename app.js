const express = require("express");
const userRoutes = require("./routes/user");
const loggingMiddleware = require("./middleware/loggingMiddleware");

const app = express();

// middleware
app.use(express.json()); // parsing JSON requests
app.use(loggingMiddleware); //for logging

// routes
app.use("/user", userRoutes);

// starting server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
