const { celebrate, Joi } = require('celebrate');

const updateUserValidastion = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
});

const createUservalidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
});

const updateUserAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/^https?:\/\/(www.)?[\w-]{1,63}\.[\w-]{1,256}[a-z-._~:/?#[\]@!$&'()*+,;=]*#?/i),
  }),
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
});

const cardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});
const cardIdDeleteValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex(),
  }),
});
const cardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/^https?:\/\/(www.)?[\w-]{1,63}\.[\w-]{1,256}[a-z-._~:/?#[\]@!$&'()*+,;=]*#?/i),
  }),
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
});
module.exports = {
  updateUserValidastion,
  createUservalidation,
  updateUserAvatarValidation,
  cardIdValidation,
  cardValidation,
  cardIdDeleteValidation,
};
