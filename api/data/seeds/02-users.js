exports.seed = function (knex) {
  return knex("users").insert([{ username: "nathanf", password: "test001" }]);
};
