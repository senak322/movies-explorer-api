const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { NotFoundError } = require('../errors/NotFoundError');
const { NotAuthorized } = require('../errors/NotAuthorized');
const { CreateError } = require('../errors/CreateError');
const { BusyError } = require('../errors/BusyError');
const {
  incorrectData, emailBusy, notFoundUser, wrongData,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const getMe = (req, res, next) => {
  User.findById(req.user)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(notFoundUser);
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      next(err);
    });
};

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, email: req.body.email },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: false,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(notFoundUser);
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new CreateError(incorrectData));
      }
      if (err.code === 11000) {
        return next(new BusyError(emailBusy));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name,
      email,
      password: hash,
    })
      .then((user) => {
        res.status(201).send({
          _id: user._id,
          email: user.email,
          name: user.name,
        });
      })
      .catch((err) => {
        if (err.code === 11000) {
          return next(new BusyError(emailBusy));
        }
        return next(err);
      });
  }).catch((err) => {
    next(err);
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new NotAuthorized(wrongData);
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new NotAuthorized(wrongData);
        }
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          { expiresIn: '7d' },
        );
        return res.send({ jwt: token });
      });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  createUser,
  updateUser,
  login,
  getMe,
};
