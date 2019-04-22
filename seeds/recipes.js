exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('recipes')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('recipes').insert([
        {
          name: 'recipe 1',
          dishId: 1,
          instructions: 'This is how you do it 1'
        },
        {
          name: 'recipe 2',
          dishId: 3,
          instructions: 'This is how you do it 2'
        },
        { name: 'recipe 3', dishId: 2, instructions: 'This is how you do it 3' }
      ]);
    });
};
