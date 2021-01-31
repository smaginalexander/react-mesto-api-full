import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = function ({
    isOpen,
    onClose,
    onAddPlace,
}) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleNameChange(evt) {
        setName(evt.target.value);
    };

    function handleLinkChange(evt) {
        setLink(evt.target.value);
    }

    const reset = function () {
        setName('');
        setLink('');
    };

    const handleSubmit = function (evt) {
        evt.preventDefault();

        onAddPlace({
            name,
            link,
            reset,
        });
    };

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title={'Новое место'}
            name={'add-card'}
            textOnButton={'Создать'}
        >
            <input
                value={name}
                onChange={handleNameChange}
                id="name-card"
                className="popup__input"
                type="text"
                required
                placeholder="Название"
                name="name"
                minLength={"1"}
                maxLength={"30"} />
            <input
                value={link}
                onChange={handleLinkChange}
                id="link-card"
                className="popup__input"
                type="url"
                required
                placeholder="Ссылка на картинку"
                name="link" />
        </PopupWithForm>
    );
};

export default AddPlacePopup;