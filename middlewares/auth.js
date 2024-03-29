const jwt = require('jsonwebtoken');

const { NotAuthorized } = require('../errors/NotAuthorized');
const { needAuth } = require('../utils/constants');

// const { randomString } = require('../controllers/users');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotAuthorized(needAuth);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new NotAuthorized(needAuth));
  }
  req.user = payload;
  return next();
};

module.exports = { auth };
