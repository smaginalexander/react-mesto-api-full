const router = require('express').Router();
const {
  updateUserValidastion,
  createUservalidation,
  updateUserAvatarValidation,
} = require('../middlewares/validation');

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

router.patch('/users/me', updateUserValidastion, auth, updateUser);
router.patch('/users/me/avatar', updateUserAvatarValidation, auth, updateUserAvatar);
router.post('/signup', createUservalidation, createUser);
router.post('/signin', createUservalidation, login);
module.exports = router;
