const Card = require('../models/card');
const BadRequestError = require('../errors/badRequestError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new BadRequestError('Нельзя удалить эту карточку');
      } else {
        res.send({ data: card });
      }
    })
    .catch(next);
};

const cardLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        throw new BadRequestError('Некорректно указан id карточки');
      }
      return next(err);
    })
    .then((card) => {
      if (!card) {
        throw new BadRequestError('Не удалось найти карточку');
      }
      return res.status(200).send(card);
    })
    .catch(next);
};

const cardLikeRemove = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        throw new BadRequestError('Некорректно указан id карточки');
      }
      return next(err);
    })
    .then((card) => {
      if (!card) {
        throw new BadRequestError('Не удалось найти карточку');
      }
      return res.status(200).send(card);
    })
    .catch(next);
};
module.exports = {
  getCards,
  createCard,
  deleteCard,
  cardLike,
  cardLikeRemove,
};
