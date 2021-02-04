const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(requestLogger);
app.use('/', cardsRouter);
app.use('/', usersRouter);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('*', (req, res) => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }));
app.use(errorLogger);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  console.log(err);
  res.status(statusCode)
    .send({
      message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
    });
  next();
});
app.use(errors());

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
