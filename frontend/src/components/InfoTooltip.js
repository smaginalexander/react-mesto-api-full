import React from 'react';
import okIcon from '../images/union.svg';
import errorIcon from '../images/error.png';
function InfoTooltip(props) {
    return (
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button type="button" className="popup__close" onClick={props.onClose}></button>
                <img className="popup__image" src={props.InfoTooltipPopup.image ? okIcon : errorIcon} alt="Картинка" />
                <p className="popup__text popup__text_type_res">{props.InfoTooltipPopup.text}</p>
            </div>
        </div>
    )
}
export default InfoTooltip;

