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

const getOne = (id) => {
  const users = getList();
  return users.filter((user) => user.id === id)[0];
}

const exist = (id) => {
  const users = getList();
  const user = users.some((user) => user.id === id);
  return user;
}

const write = (data) => {
  fs.writeFileSync("data/users.json", data);
}

const authenticate = (id, password) => {
  if (exist(id)) {
    const user = getOne(id);
    return password === user.password;
  }
}

module.exports = { getList, exist, write, authenticate, getOne };
