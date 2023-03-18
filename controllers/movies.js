const Movie = require('../models/movie');

const { Forbidden } = require('../errors/Forbidden');
const { NotFoundError } = require('../errors/NotFoundError');

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
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new Forbidden('Невозможно удалять чужие карточки');
      } else {
        Movie.findByIdAndRemove(req.params.movieId)
          .then((movieEl) => {
            if (!movieEl) {
              throw new NotFoundError('Карточка с указанным _id не найдена');
            }
            res.status(200).send({ data: movieEl });
          })
          .catch((err) => {
            next(err);
          });
      }
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
