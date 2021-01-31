import React from 'react';

function PopupWithForm(props) {
    return (
        <div onSubmit={props.onSubmit} className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <form className="popup__container">
                <button type="button" className="popup__close" onClick={props.onClose}></button>
                <h2 className="popup__text">{props.title}</h2>
                {props.children}
                <button className="popup__btn" type="submit">{props.textOnButton}</button>
            </form>
        </div>
    )
}

export default PopupWithForm;