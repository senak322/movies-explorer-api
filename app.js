require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { limiter } = require('./middlewares/limiter');
const userAndMoviesRouter = require('./routes/index');
const { error } = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { cors } = require('./middlewares/cors');
const { serverCrash } = require('./utils/constants');
const { dbAddress } = require('./utils/settings');

const app = express();

const { PORT = 3001 } = process.env;

mongoose.connect(dbAddress).then((res) => {
  if (res) {
    mongoose.set('bufferCommands', false);
  }
  // mongoose.set('bufferCommands', false);
});
// mongoose.set('bufferCommands', false);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.disable('x-powered-by');

app.use(cors);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(serverCrash);
  }, 0);
});

app.use(userAndMoviesRouter);

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());
app.use(error);

app.listen(PORT, () => {});
