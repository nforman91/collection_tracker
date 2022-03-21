exports.up = async (knex) => {
  await knex.schema
    .createTable("users", (users) => {
      users.increments("user_id");
      users.string("username", 200).notNullable();
      users.string("password", 200).notNullable();
      users.timestamps(false, true);
    })
    .createTable("collections", (collections) => {
      collections.increments("collection_id");
      collections.string("collection_name", 200).notNullable();
      collections.string("collection_type", 200);
    });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("collections");
  await knex.schema.dropTableIfExists("users");
};
