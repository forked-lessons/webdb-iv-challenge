exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('ingredients')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('ingredients').insert([
        {
          name: 'ingredient 1',
          recipeId: 15,
          unit: 'g'
        },
        {
          name: 'ingredient 2',
          recipeId: 14,
          unit: 'g'
        },
        {
          name: 'ingredient 3',
          recipeId: 13,
          unit: 'g'
        }
      ]);
    });
};
