const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const ConflictError = require('../errors/conflictError');
const BadRequestError = require('../errors/badRequestError');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10, (error, hash) => {
    User.findOne({ email })
      .then((user) => {
        if (user) return next(new ConflictError('Пользователь уже существует'));
        return User.create({
          name, about, avatar, email, password: hash,
        })
          .then((newUser) => res.status(200).send(newUser));
      })
      .catch(next);
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' }),
      });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new BadRequestError('Нет пользователя с таким id'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const {
    name,
    about,
  } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true, new: true })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(err.message);
      }
      return next(err);
    })
    .then((user) => {
      if (!user) {
        throw new BadRequestError('Не удалось найти пользователя');
      }
      return res.status(200).send(user);
    })
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        throw new BadRequestError('аватар не обновился');
      } else {
        res.status(200).send({ avatar: user.avatar });
      }
    })
    .catch(next);
};

module.exports = {
  getUsers,
  createUser,
  login,
  getUserInfo,
  updateUser,
  updateUserAvatar,
};
