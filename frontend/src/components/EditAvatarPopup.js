import React from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = function ({ isOpen, onClose, onUpdateAvatar }) {

  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <input
          ref={avatarRef}
          id="newName"
          className="popup__input"
          type="url"
          placeholder="ссылка на аватар"
          name="avatar">
        </input>
      }
      title={'Обновить аватар'}
      name={'update-avatar'}
      textOnButton={'Сохранить'}
    />
  );
}

export default EditAvatarPopup;
