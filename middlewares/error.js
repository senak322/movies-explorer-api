const error = (err, req, res, next) => {
  const { statusCode = 500 } = err;
  const errMessage = err.statusCode === 500 ? 'На свервере что-то пошло не так' : err.message;
  res.status(statusCode).send({ message: errMessage });
  next();
};

module.exports = { error };
