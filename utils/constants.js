const urlRegExp = /(http|https):\/\/(www\.)?([-A-Za-z0-9]{1,256}(\b.)?[A-Za-z0-9]{1,})([-A-Za-z0-9/]*)/;
const incorrectData = 'Переданы некорректные данные';
const emailBusy = 'Данный E-mail занят';
const castError = 'Карточка с указанным id не найдена';
const notFoundUser = 'Пользователь не найден';
const wrongData = 'Неправильные почта или пароль';
const notYour = 'Невозможно удалять чужие карточки';
const needAuth = 'Необходима авторизация';
const serverCrash = 'Сервер сейчас упадёт';
const notFoundError = 'Указанный адрес не найден';

module.exports = {
  urlRegExp,
  incorrectData,
  emailBusy,
  castError,
  notFoundUser,
  wrongData,
  notYour,
  needAuth,
  serverCrash,
  notFoundError,
};
