exports.seed = function (knex) {
  return knex("collections").insert([{ collection_name: "collection1" }]);
};
