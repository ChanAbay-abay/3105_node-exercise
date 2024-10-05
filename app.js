const express = require("express");
const userRoutes = require("./routes/user");

const app = express();

// Middleware: use built-in express JSON parser
app.use(express.json()); // This will parse incoming JSON requests

// Routes
app.use("/user", userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
