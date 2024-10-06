const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const usersFilePath = path.join(__dirname, "../data/users.json");

let users = [];
const loadUsers = () => {
  if (fs.existsSync(usersFilePath)) {
    const fileData = fs.readFileSync(usersFilePath);
    users = JSON.parse(fileData);
  }
};

const saveUsers = () => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

//initializes users from json
loadUsers();

//creating a user
exports.createUser = async (username, password, email) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    username,
    password: hashedPassword,
    email,
  };
  users.push(newUser);
  saveUsers();
  return newUser;
};

//find user by username
exports.findUser = (username) => {
  return users.find((user) => user.username === username);
};
