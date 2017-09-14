const knex = require('./knex'); // the connection!

module.exports = {
  getAll () {
    return knex('movie');
  },
  getOne(id) {
    return knex('movie').where('id', id).first();
  },
  create(movie) {
    return knex('movie').insert(movie, '*');
  },
  update(id, movie) {
    return knex('movie').where('id', id).update(movie, '*');
  },
  delete(id) {
    return knex('movie').where('id', id).del();
  }
}
