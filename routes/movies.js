// const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { createMovieValidate, deleMovieValidate } = require('../middlewares/validationJoi');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);

router.post('/movies', createMovieValidate, createMovie);

router.delete('/movies/:_id', deleMovieValidate, deleteMovie);

module.exports = router;
