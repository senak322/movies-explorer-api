const route = require('express').Router();

const userRouter = require('./users');
const movieRouter = require('./movies');

route.use(userRouter);
route.use(movieRouter);

module.exports = route;
