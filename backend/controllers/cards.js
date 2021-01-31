const Card = require('../models/card');
const BadRequestError = require('../errors/badRequestError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};
const createCard = (req, res, next) => Card.countDocuments()
  .then((count) => Card.create({ id: count, ...req.body })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }
      next(err);
    }));

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

module.exports = { getCards, createCard, deleteCard };
