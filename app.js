const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");

const app = express();

//middleware
app.use(bodyParser.json());

//routes
app.use("/user", userRoutes);

//start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
