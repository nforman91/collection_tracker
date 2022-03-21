const db = require("../data/db-config");

function find() {
  return db("collections");
}

function findById(collection_id) {
  return db("collections").where({ collection_id }).first();
}

async function add(newCollection) {
  const [collection] = await db("collections").insert(newCollection, [
    "collection_id",
    "collection_name",
  ]);
  return collection;
}

const updateCollection = (collection_id, updatedCollection) => {
  return db("collections")
    .where("collection_id", collection_id)
    .update(updatedCollection);
};

const del = async (collection_id) => {
  const removeObj = await findById(collection_id);
  await db("collections").where("collection_id", collection_id).del();
  return removeObj;
};

module.exports = {
  find,
  findById,
  add,
  updateCollection,
  del,
};
