const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getProfile, getUserInfo, createUser, login,
} = require('../controllers/users.js');
// const auth = require('../middlewares/auth');

router.get('/users', getUsers);
router.get('/users/:_id', getProfile);
router.get('/users/me', getUserInfo);

router.post('/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }), createUser);

router.post('/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }), login);
module.exports = router;
