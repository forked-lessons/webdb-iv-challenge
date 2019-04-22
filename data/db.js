const knex = require('knex');

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/recipe_book.db3'
  },
  useNullAsDefault: true, // needed for sqlite
  migrations: {
    directory: './data/migrations'
  },
  seeds: {
    directory: './data/seeds'
  },
  pool: {
    afterCreate: (conn, done) => {
      conn.run('PRAGMA foreign_keys = ON', done);
    }
  }
};

const db = knex(knexConfig);

module.exports = {
  getDishes,
  addDish,
  getDish,
  getRecipes,
  getRecipe,
  getIngredients,
  addRecipe
};

function getDishes() {
  return db('dishes');
}

function getDish(id) {
  return db('dishes').where({ id: Number(id) });
}

function addDish(dish) {
  return db('dishes')
    .insert(dish)
    .then(ids => ({ id: ids[0] }));
}

function getRecipes() {
  return db('recipes');
}
function getRecipe(id) {
  return db('recipes').where({ id: Number(id) });
}
function getIngredients(recipeId) {
  return db('ingredients').where({
    recipeId: Number(recipeId)
  });
}
function addRecipe(recipe) {
  return db('recipes')
    .insert(recipe)
    .then(ids => ({ id: ids[0] }));
}
