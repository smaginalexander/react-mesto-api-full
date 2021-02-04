const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUserInfo,
  createUser,
  login,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users.js');

const auth = require('../middlewares/auth');

router.get('/users', auth, getUsers);
router.get('/users/me', auth, getUserInfo);
router.patch('/users/me', auth, updateUser);

router.patch('/users/me/avatar', auth, updateUserAvatar);

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
