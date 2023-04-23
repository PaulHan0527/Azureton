var express = require("express");
var bodyParser = require("body-parser");
const fs = require("fs");
const { getList, exist, write, authenticate } = require("./lib/user");

const PORT = 3001;

const app = express();

// parser application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/api/users", (req, res) => {
  const users = getList();
  
  res.json({ users: users })
});

app.post("/api/users", (req, res) => {
  const { id, password, info: { weight, height, gender, age }} = req.body;

  if (exist(id)) {
    res.json({message: "already exist", data: {}});
    return;
  }
  
  const users = getList();

  const data = {
    "id": id,
    "password": password,
    "info" : {
        "weight" : weight,
        "height" : height,
        "gender" : gender,
        "age" : age
    }
  };
  write(JSON.stringify([...users, data]));

  res.json({message: "success", data: data});
});

app.post("api/login", (req, res) => {
  const { id, password } = req.body;
  const user = authenticate(id, password);

  if (user) {
    res.json({ message: "success", data: user });
  }
  res.json({ message:"fail", data: {} });
});
