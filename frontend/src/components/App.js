import { Route, Switch, useHistory } from 'react-router-dom';
import React from 'react';
import Header from './Header.js';
import { api } from './../utils/api.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';
function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    about: '',
    avatar: ''
  });
  //___
  const [isInfoTooltip, setInfoTooltip] = React.useState(false);
  const [InfoTooltipPopup, setInfoTooltipPopup] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const history = useHistory();

  //отображение иконки и текста в попапе результата регистрации
  const onInfoTooltip = (image, text) => {
    setInfoTooltipPopup({
      image: image,
      text: text
    })
    setInfoTooltip(true)
  }

  const handleLogin = (email) => {
    setLoggedIn(true)
    setEmail(email);
  }


  //редактирование профия попап
  const handleEditProfileClick = function () {
    setEditProfilePopupOpen(true);
  };

  //добавить фотку попап
  const handleAddPlaceClick = function () {
    setAddPlacePopupOpen(true);
  };

  //открытие фотки попап
  const handleCardClick = function (card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  };

  //редактирование аватара попап
  const handleEditAvatarClick = function () {
    setEditAvatarPopupOpen(true);
  };

  //постановка лайка или дизлайка
  const handleCardLike = function (card) {
    const isLiked = card.likes.some((like) => like === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards)
      })
      .catch(err => console.log(err))
  };

  //обновить инфу в профиле
  const handleUpdateUser = function ({ name, about }) {
    api
      .setUserInfo({ name, about })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups()
      })
      .catch((error) => console.error(error))
  };

  // обновление аватара
  const handleUpdateAvatar = function (avatar) {
    api.setUserAvatar(avatar)
      .then((avatar) => {
        setCurrentUser(avatar)
        closeAllPopups()
      })
      .catch(err => console.log(err))
  };

  // добавление новой карточки
  const handleAddPlaceSubmit = function ({ name, link, reset }) {
    api
      .loadNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        reset();
      });
  };
  // удаление своей карточки
  const handleCardDelete = function (card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter(
          (currentCard) => currentCard._id !== card._id
        );
        setCards(newCards);
      })
      .catch((error) => console.error(error))
  };

  const closeAllPopups = function () {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setConfirmPopupOpen(false);
    setIsImagePopupOpen(false);
    setInfoTooltip(false);
    setSelectedCard(null);
  };
  //Проверка токенов
  const tokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      let jwt = localStorage.getItem('jwt');
      auth.getContent(jwt)
        .then((res) => {
          if (res.data) {
            console.log(res)
            setLoggedIn(true);
            setEmail(res.data.email);
            history.push('/');
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  //изначальная инфа и фотки
  React.useEffect(() => {
    Promise.all([api.getCardList(), api.getUserInfo()])
      .then(([cards, user]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch(err => console.log(err))
  }, []);

  React.useEffect(() => {
    tokenCheck();
  }, []);

  //выход из системы
  const exitFromPage = () => {
    history.push('/signin')
    setLoggedIn(false);
    localStorage.removeItem('jwt')
  }
  const onRegisterSubmit = (email, password) => {
    auth.register(email, password)
      .then((res) => {
        onInfoTooltip(true, 'Вы успешно зарегистрировались!')
        console.log(res)
        if (res) {
          history.push('/sign-in');
        }
      })
      .catch((err) => {
        onInfoTooltip(false, 'Что-то пошло не так! Попробуйте ещё раз.')
        if (err.status === 400) {
          console.log('Hекорректно заполнено одно из полей')
        } else {
          console.log(err)
        }
      })
  }

  const onLoginSubmit = (email, password) => {
    auth.authorize(email, password)
      .then((res) => {
        if (res) {
          handleLogin(email);
          history.push('/');
        }
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log('Hекорректно заполнено одно из полей')
        } if (err.status === 401) {
          console.log('пользователь с email не найден ')
        } else {
          console.log(err)
        }
      })
  }
  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        {loggedIn ? <Header routePath={'/sign-up'}
          exitFromPage={exitFromPage}
          email={email}
          pageName={'Выйти'}
          loggedIn={loggedIn}
          handleLogin={handleLogin} />
          :
          ''}
        <Switch>
          <Route path="/sign-in">
            <Header routePath={'/sign-up'} pageName={"Регистрация"} />
            <Login onLoginSubmit={onLoginSubmit} handleLogin={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Header routePath={'/sign-in'} pageName={"Войти"} />
            <Register onRegisterSubmit={onRegisterSubmit} onInfoTooltip={onInfoTooltip} />
          </Route>
          <ProtectedRoute path="/" loggedIn={loggedIn} component={Main}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onDeleteClick={handleCardDelete}
          />
        </Switch>
        {loggedIn ? <Footer /> : ''}
        <InfoTooltip
          isOpen={isInfoTooltip}
          InfoTooltipPopup={InfoTooltipPopup}
          onClose={closeAllPopups} />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <PopupWithForm
          title={'Вы уверены'}
          name={'confirm'}
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          textOnButton={'Да'}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div >
  );
}

export default App;
