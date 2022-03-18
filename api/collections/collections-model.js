const db = require("../data/db-config");

function find() {
  return db("collections");
}

function findById(collection_id) {
  return db("collections").where({ collection_id }).first();
}

module.exports = {
  find,
  findById,
};
