const db = require("../data/db-config");

function find() {
  return db("users");
}

function findBy(filter) {
  return db("users").where(filter);
}

function findById(user_id) {
  return db("users").where("user_id", user_id).first();
}

async function findByName(username) {
  const usersName = await db("users").where("username", username).first();
  return usersName;
}

async function addUser(newUser) {
  const [user] = await db("users").insert(newUser, ["username", "password"]);
  return user;
}

module.exports = {
  find,
  findBy,
  findById,
  findByName,
  addUser,
};
