const movies = require('../movies');

exports.seed = function(knex, Promise) {
  return knex('movie').del()
    .then(function () {
      return knex('movie').insert(movies);
    });
};
