const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const usersFilePath = path.join(__dirname, "../data/users.json");

// Load users from JSON file
let users = [];
const loadUsers = () => {
  if (fs.existsSync(usersFilePath)) {
    const fileData = fs.readFileSync(usersFilePath);
    users = JSON.parse(fileData);
  }
};

// Save users to JSON file
const saveUsers = () => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Initialize users from the file
loadUsers();

// Creates a new user
exports.createUser = async (username, password, email) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1, // Auto-increment user ID
    username,
    password: hashedPassword,
    email,
  };
  users.push(newUser);
  saveUsers(); // Save users to the file after adding a new one
  return newUser;
};

// Find user by username
exports.findUser = (username) => {
  return users.find((user) => user.username === username);
};
