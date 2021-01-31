import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from './../contexts/CurrentUserContext';

const EditProfilePopup = function ({ isOpen, onClose, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState(currentUser.name);
    const [description, setDescription] = useState(currentUser.about);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    const handleSubmit = function (evt) {
        evt.preventDefault();
        onUpdateUser({
            name,
            about: description
        });
    };

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeJob(e) {
        setDescription(e.target.value)
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            children={(
                <>
                    <input
                        onChange={handleChangeName}
                        value={name}
                        id="name"
                        className="popup__input"
                        type="text"
                        required
                        placeholder="Введите имя"
                        name="userName"
                        minLength={"2"}
                        maxLength={"40"} />
                    <input
                        onChange={handleChangeJob}
                        value={description}
                        id="job"
                        className="popup__input"
                        type="text"
                        required
                        placeholder="укажите работу"
                        name="userJob"
                        minLength={"2"}
                        maxLength={"200"} />
                </>
            )}
            title={'Редактировать профиль'}
            name={'profile'}
            textOnButton={'Сохранить'}
        />
    );
}

export default EditProfilePopup;