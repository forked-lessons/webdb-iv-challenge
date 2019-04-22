exports.up = function(knex, Promise) {
  return knex.schema.createTable('recipes', function(tbl) {
    tbl.increments();
    tbl
      .string('name', 128)
      .notNullable()
      .unique();

    tbl.integer('dishId').notNullable();
    tbl.string('instructions').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('recipes');
};
