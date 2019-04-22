exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('ingredients')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('ingredients').insert([
        {
          name: 'tamarind',
          recipeId: 1,
          unit: 'g'
        },
        {
          name: 'saffron',
          recipeId: 3,
          unit: 'g'
        },
        {
          name: 'curry',
          recipeId: 2,
          unit: 'g'
        }
      ]);
    });
};
