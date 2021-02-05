const router = require('express').Router();
const { cardIdValidation, cardValidation } = require('../middlewares/validation');
const {
  getCards,
  createCard,
  deleteCard,
  cardLike,
  cardLikeRemove,
} = require('../controllers/cards.js');
const auth = require('../middlewares/auth');

router.get('/cards', auth, getCards);
router.put('/cards/likes/:cardId/', cardIdValidation, auth, cardLike);
router.delete('/cards/likes/:cardId/', cardIdValidation, auth, cardLikeRemove);
router.post('/cards', cardValidation, auth, createCard);

router.delete('/cards/:cardId', cardIdValidation, auth, deleteCard);
module.exports = router;
