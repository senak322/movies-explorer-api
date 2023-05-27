// const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();

const {
  updateUser,
  getMe,
} = require('../controllers/users');

const { patchUserValidate } = require('../middlewares/validationJoi');

router.get('/users/me', getMe);

router.patch('/users/me', patchUserValidate, updateUser);

module.exports = router;
