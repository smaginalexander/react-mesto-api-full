const router = require('express').Router();
const { cardIdValidation, cardValidation, cardIdDeleteValidation } = require('../middlewares/validation');
const {
  getCards,
  createCard,
  deleteCard,
  cardLike,
  cardLikeRemove,
} = require('../controllers/cards.js');
const auth = require('../middlewares/auth');

router.get('/cards', auth, getCards);
router.put('/cards/:cardId/likes/', cardIdValidation, auth, cardLike);
router.delete('/cards/:cardId/likes/', cardIdValidation, auth, cardLikeRemove);
router.post('/cards', cardValidation, auth, createCard);

router.delete('/cards/:cardId', cardIdDeleteValidation, auth, deleteCard);
module.exports = router;
