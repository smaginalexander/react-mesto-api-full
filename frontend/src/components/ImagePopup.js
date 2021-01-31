import React from 'react';

function ImagePopup(props) {
    return (
        <div className={`photo-popup popup ${props.isOpen && 'popup_opened'}`}>
            <div className="photo-popup__container">
                <button id="close-photo" className="popup__close" onClick={props.onClose}></button>
                <img className="photo-popup__img"
                    src={props.card && props.card.link}
                    alt={props.card && props.card.name} />
                <p className="photo-popup__text">{props.card && props.card.name}</p>
            </div>
        </div>
    )
}
export default ImagePopup;