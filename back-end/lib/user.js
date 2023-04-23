const fs = require("fs");

const getList = () => {
  const usersBuffer = fs.readFileSync("data/users.json");
  const usersString = usersBuffer.toString();
  if (!usersString) {
    return [];
  }
  const users = JSON.parse(usersString);
  return users;
};

const exist = (id) => {
  const users = getList();
  const user = users.some((user) => user.id === id);
  return user;
}

const write = (data) => {
  fs.writeFileSync("data/users.json", data);
}

const authenticate = (id, password) => {
  const users = getList();
  const user = users.som((user) => user.id === id);
  if (user.password === password)
    return user;
  return {};
}

module.exports = { getList, exist, write, authenticate };
