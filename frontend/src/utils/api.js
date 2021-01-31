class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _checkResult(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }
    // инофрмация профиля
    getUserInfo() {
        return fetch(
            `${this._url}/users/me`,
            {
                headers: this._headers
            })
            .then(this._checkResult)
    }
    // редактирование профиля
    setUserInfo({ name, about }) {
        return fetch(
            `${this._url}/users/me`,
            {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name,
                    about,
                })
            })
            .then(this._checkResult)
    }

    //загрузка изначальных карточек
    getCardList() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
            .then(this._checkResult)
    }

    // добавление новой карточки
    loadNewCard({ name, link }) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name,
                link,
            })
        })
            .then(this._checkResult)
    }

    //удаление карточки
    deleteCard(itemId) {
        return fetch(`${this._url}/cards/${itemId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._checkResult);
    }
    //лайки и дизлайки
    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
            return fetch(`${this._url}/cards/likes/${id}`, {
                method: "PUT",
                headers: this._headers,
            })
                .then(this._checkResult);
        } else {
            return fetch(`${this._url}/cards/likes/${id}`, {
                method: "DELETE",
                headers: this._headers
            })
                .then(this._checkResult);
        }
    }

    // обновление аватара
    setUserAvatar(link) {
        console.log(link)
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(link)
        })
            .then(this._checkResult);
    }
}

export const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-16',
    headers: {
        authorization: '6d48ba52-ec94-43bc-a696-2925494647b4',
        'Content-Type': 'application/json'
    }
})