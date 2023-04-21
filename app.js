require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const bodyParser = require('body-parser');

const helmet = require('helmet');

const { errors } = require('celebrate');
const { limiter } = require('./middlewares/limiter');
const userAndMoviesRouter = require('./routes/index');
const { login, createUser } = require('./controllers/users');
const returnPromiseError = require('./routes/badReqest');
const { auth } = require('./middlewares/auth');
const { error } = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { cors } = require('./middlewares/cors');
const { signInValidate, signUpValidate } = require('./middlewares/validationJoi');

const app = express();

const { PORT = 3001 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.disable('x-powered-by');

app.use(cors);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', signInValidate, login);
app.post('/signup', signUpValidate, createUser);
app.use(auth);
app.use(userAndMoviesRouter);
app.use('*', returnPromiseError);

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());
app.use(error);

app.listen(PORT, () => {});
