exports.up = function(knex, Promise) {
  return knex.schema.createTable('recipes', function(tbl) {
    tbl.increments();
    tbl
      .string('name', 128)
      .notNullable()
      .unique();

    tbl
      .integer('dishId')
      .unsigned()
      .references('id')
      .inTable('dishes');

    tbl
      .string('instructions')
      .unsigned()
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('recipes');
};
