import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__trash ${isOwn ? 'element__trash_owner' : ''}`
    );

    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `element__btn ${isLiked ? 'element__btn_active' : ''}`
    );

    function handleClick() {
        props.onCardClick(props.card);
    };

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onDeleteClick(props.card);
    };


    return (
        <div className="element">
            <img
                className="element__image"
                src={props.card.link}
                alt={props.card.name}
                onClick={handleClick} />
            <button
                onClick={handleDeleteClick}
                className={cardDeleteButtonClassName}>
            </button>
            <div className="element__element-container">
                <h2 className="element__text">{props.card.name}</h2>
                <button
                    onClick={handleLikeClick}
                    aria-label="нравится"
                    className={cardLikeButtonClassName}
                    type="button">
                </button>
                <span className="element__likeNamber">{props.card.likes.length}</span>
            </div>
        </div>
    )
}
export default Card;
