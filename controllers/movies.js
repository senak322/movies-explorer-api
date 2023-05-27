const Movie = require('../models/movie');

const { Forbidden } = require('../errors/Forbidden');
const { NotFoundError } = require('../errors/NotFoundError');
const { CreateError } = require('../errors/CreateError');
const { incorrectData, castError, notYour } = require('../utils/constants');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.status(200).send({ data: movies });
    })
    .catch((err) => {
      next(err);
    });
};

const createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((card) => {
      res.status(201).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new CreateError(incorrectData));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(castError);
      }
      if (card.owner.toString() !== req.user._id) {
        throw new Forbidden(notYour);
      } else {
        Movie.findByIdAndRemove(req.params._id)
          .then((movieEl) => {
            if (!movieEl) {
              throw new NotFoundError(castError);
            }
            res.status(200).send({ data: movieEl });
          })
          .catch((err) => {
            next(err);
          });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CreateError(castError));
      }
      return next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
