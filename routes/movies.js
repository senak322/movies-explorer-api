const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();

router.get('/movies', getMovies);

router.post('/movies', createMovies);

router.delete('/movies/:_id', deleteMovies);

module.exports = router;
