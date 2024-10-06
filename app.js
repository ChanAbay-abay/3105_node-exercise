const express = require("express");
const userRoutes = require("./routes/user");
const loggingMiddleware = require("./middleware/loggingMiddleware");
const rateLimiter = require("./middleware/rateLimiter");
const session = require("express-session");

const app = express();

// session config
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// middleware
app.use(express.json());
app.use(loggingMiddleware);
app.use(rateLimiter);
app.use((req, res, next) => {
  console.log(
    `Request count: ${req.rateLimit.current}, Max: ${req.rateLimit.limit}`
  );
  next();
});

// routes
app.use("/user", userRoutes);

// starting server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
