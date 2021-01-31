import React from 'react';
import Card from './Card.js';
import pen from './../images/pen.png';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <>
            <section className="profile">
                <img className="profile__avatar" src={currentUser.avatar} alt="аватар" />
                <img
                    className="profile__change"
                    src={pen}
                    alt="ручка"
                    onClick={props.onEditAvatar} />
                <div className="profile-info">
                    <div className="profile__conteiner">
                        <h1 className="profile-info__title">{currentUser.name}</h1>
                        <button
                            aria-label="редактировать"
                            className="profile-info__edit-button"
                            type="button"
                            onClick={props.onEditProfile}></button>
                    </div>

                    <p className="profile-info__text">{currentUser.about}</p>
                </div>
                <button
                    aria-label="добавить"
                    className="profile__add-button"
                    type="button"
                    onClick={props.onAddPlace}></button>

            </section>
            <section className="elements">
                {props.cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onDeleteClick={props.onDeleteClick} />
                ))}
            </section>
        </>
    )
}

export default Main;