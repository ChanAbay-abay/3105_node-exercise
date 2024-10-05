let users = []; // You can also read/write to a JSON file

//creates new user
exports.createUser = (username, password, email) => {
  const id = users.length + 1;
  const user = { id, username, password, email };
  users.push(user);
  return user;
};

//find user by username
exports.findUser = (username) => {
  return users.find((user) => user.username === username);
};
