const express = require('express');
const genreRouter = require('./genre.router');
const actorRouter = require('./actors.router');
const directorsRouter = require('./directors.router');
const movieRouter = require('./movie.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/genres', genreRouter)
router.use('/actors', actorRouter)
router.use('/directors', directorsRouter)
router.use('/movies', movieRouter)



module.exports = router;