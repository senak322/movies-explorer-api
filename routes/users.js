const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();

const {
  updateUser,
  getMe,
} = require('../controllers/users');

router.get('/users/me', getMe);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().min(2).max(30).required(),
  }),
}), updateUser);

module.exports = router;
