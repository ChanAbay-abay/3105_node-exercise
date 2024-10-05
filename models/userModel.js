let users = []; // You can also read/write to a JSON file

//creates new user
exports.createUser = (username, password, email) => {
  const newUser = {
    id: users.length + 1,
    username,
    password,
    email,
  };
  users.push(newUser);
  return newUser;
};

//find user by username
exports.findUser = (username) => {
  return users.find((user) => user.username === username);
};
