const route = require('express').Router();

const { login, createUser } = require('../controllers/users');
const userRouter = require('./users');
const movieRouter = require('./movies');
const { auth } = require('../middlewares/auth');
const { signInValidate, signUpValidate } = require('../middlewares/validationJoi');
const { NotFoundError } = require('../errors/NotFoundError');
const { notFoundError } = require('../utils/constants');

route.post('/signin', signInValidate, login);
route.post('/signup', signUpValidate, createUser);
route.use(auth);
route.use(userRouter);
route.use(movieRouter);
route.use(() => {
  throw new NotFoundError(notFoundError);
});

module.exports = route;
