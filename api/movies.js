const express = require('express')

const router = express.Router();

const queries = require('../db/queries');

function isValidId(req, res, next) {   // SHOWS "Invalid ID" IF ID DOES NOT EXIST
  if(!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}


function validMovie(movie) {
  // Is the title of the movie a string, and does it have a value inside
  const hasTitle = typeof movie.title == 'string' && movie.title.trim() != '';
  const hasUrl = typeof movie.url == 'string' && movie.url.trim() != '';
  const hasDirector = typeof movie.director == 'string' && movie.director.trim() != '';
  const hasRating = !isNaN(movie.rating);
  return hasTitle && hasDirector && hasUrl && hasRating;
}

// THIS ROUTE SHOWS ALL THE MOVIES
router.get('/', (req, res) => {
  queries.getAll().then(movies => {
    res.json(movies);
  });
});

// WHEN YOU PASS IN AN 'ID', IT WILL MAKE THE QUERY AND RESPOND WITH THAT MOVIE
router.get('/:id', isValidId, (req, res) => {
  queries.getOne(req.params.id).then(movie => {
    if(movie) {
      res.json(movie);
    } else {
      next();
    }
  });
});


// THIS WILL 'CREATE' A NEW RECORD
router.post('/', (req, res, next) => {
  if(validMovie(req.body)) {
    // insert into db
    queries.create(req.body).then(movies => {
      res.json(movies[0]);
    });
  } else {
    next(newError('Invalid movie'));
  }
});


// THIS WILL UPDATE A RECORD (Change Something)
router.put('/:id', isValidId, (req, res, next) => {
  if(validMovie(req.body)) {
    // Update movie
    queries.update(req.params.id, req.body).then(movies => {
      res.json(movies[0]);
    });
  } else {
    next(newError('Invalid movie'));
  }
});

// THIS WILL DELETE A RECORD
router.delete('/:id', isValidId, (req, res) => {
  // do Something
  queries.delete(req.params.id).then(() => {
    res.json({
      deleted: true
    });
  });
});






module.exports = router;
