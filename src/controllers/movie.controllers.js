const catchError = require('../utils/catchError');
const Movie = require('../models/Movies');
const Genre = require('../models/Genres');
const Actors = require('../models/Actors');
const Directors = require('../models/Directors');

const getAll = catchError(async(req, res) => {
    const results = await Movie.findAll({include: [Genre, Actors, Directors]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Movie.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Movie.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const setMoviesGenre = catchError(async(req, res) => {
    const {id} = req.params;
    const movies = await Movie.findByPk(id);
    if(!movies) return res.status(404).json({message: "movie not found"});
    await movies.setGenres(req.body);
    const genres = await movies.getGenres();
    return res.json(genres)
});

const setAcotrsMovies = catchError(async(req, res) => {
    const { id } = req.params;
    const movies = await Movie.findByPk(id);
    if(!movies) return res.status(404).json({message: "Movie not found"})
    await movies.setActors(req.body);
    const actors = await movies.getActors();
    return res.json(actors);
});

const setMoviesDirectors = catchError(async(req, res) => {
    const { id } = req.params;
    const movies = await Movie.findByPk(id);
    if(!movies) await res.status(404).json({message: "Movie not found"});
    await movies.setDirectors(req.body);
    const directors = await movies.getDirectors();
    return res.json(directors);
});


module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setMoviesGenre,
    setAcotrsMovies,
    setMoviesDirectors,
}