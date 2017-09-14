
exports.up = function(knex, Promise) {
  return knex.schema.createTable('movie', (table) => {
    table.increments();
    table.text('title');
    table.text('director');
    table.integer('year');
    table.float('rating');
    table.text('url');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('movie');
};
