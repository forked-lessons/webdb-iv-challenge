exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('dishes')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('dishes').insert([
        { name: 'dish 1' },
        { name: 'dish 2' },
        { name: 'dish 3' }
      ]);
    });
};
