exports.up = function(knex, Promise) {
  return knex.schema.createTable('ingredients', function(tbl) {
    tbl.increments();
    tbl
      .string('name', 128)
      .notNullable()
      .unique();

    tbl
      .integer('recipeId')
      .unsigned()
      .references('id')
      .inTable('');

    tbl
      .string('unit')
      .unsigned()
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('ingredients');
};
