const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards,
  createCard,
  deleteCard,
  cardLike,
  cardLikeRemove,
} = require('../controllers/cards.js');
const auth = require('../middlewares/auth');

router.get('/cards', auth, getCards);
router.put('/cards/likes/:cardId/', auth, cardLike);
router.delete('/cards/likes/:cardId/', auth, cardLikeRemove);
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}), auth, createCard);

router.delete('/cards/:cardId', auth, deleteCard);
module.exports = router;
