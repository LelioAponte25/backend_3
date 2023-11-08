const { getAll, create, getOne, remove, update, setMoviesGenre, setAcotrsMovies, setMoviesDirectors } = require('../controllers/movie.controllers');
const express = require('express');

const movieRouter = express.Router();

movieRouter.route('/')
    .get(getAll)
    .post(create);

movieRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

movieRouter.route('/:id/genres')
    .post(setMoviesGenre)

movieRouter.route('/:id/actors')
    .post(setAcotrsMovies)

movieRouter.route('/:id/directors')
    .post(setMoviesDirectors)

module.exports = movieRouter;