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

function findByName(username) {
  return db("users").where("username", username).first();
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
