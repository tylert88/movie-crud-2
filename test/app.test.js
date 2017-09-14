const request = require('supertest');
const expect = require('chai').expect;
const knex = require('../db/knex');

const app = require('../app');

const fixtures = require('./fixtures');

describe('movie-crud movies', () => {
  before((done) => {
      knex.migrate.latest()
        .then(() => {
          return knex.seed.run();
        }).then(() => done());
    });
    it('Lists all Records', (done) => {
      request(app)
      .get('/api/v1/movies')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('array');
        expect(response.body).to.deep.equal(fixtures.movies);
        done();
      });
    });

    it('Show one record by id', (done) => {
      request(app)
      .get('/api/v1/movies/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal(fixtures.movies[0]);
        done();
      });
    });

    it('Show one record by id', (done) => {
      request(app)
      .get('/api/v1/movies/4')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal(fixtures.movies[3]);
        done();
      });
  });

    it('Creates a new record', (done) => {
      request(app)
        .post('/api/v1/movies')
        .send(fixtures.movie)
        .set('Accept', 'application/json')
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).to.be.a('object');
          fixtures.movie.id = response.body.id;
          expect(response.body).to.deep.equal(fixtures.movie);
          done();
        });
    });

    it('Updates a record', (done) => {
      fixtures.movie.rating = 5;  // change rating to '5'
      request(app)
        .put('/api/v1/movies/5')
        .send(fixtures.movie)     // send update request to the api
        .set('Accept', 'application/json')
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).to.be.a('object');
          expect(response.body).to.deep.equal(fixtures.movie); // comes back = '5'
          done();
        });
    });

    it('Deletes a record', (done) => {
      request(app)
        .delete('/api/v1/movies/5')
        .set('Accept', 'application/json')
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).to.be.a('object');
          expect(response.body).to.deep.equal({
            deleted: true
          });
          done();
        });
    });
  });
