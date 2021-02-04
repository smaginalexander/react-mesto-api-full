const token = localStorage.getItem("jwt")
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
                method: 'GET',
                headers: {
                    authorization: `Bearer ${token}`,
                    "Content-type": 'application/json',
                },
            })
            .then(this._checkResult)
    }
    // редактирование профиля
    setUserInfo({ name, about }) {
        return fetch(
            `${this._url}/users/me`,
            {
                method: 'PATCH',
                headers: {
                    authorization: `Bearer ${token}`,
                    "Content-type": 'application/json',
                },
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
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(this._checkResult)
    }

    // добавление новой карточки
    loadNewCard({ name, link }) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                link,
            })
        })
            .then(this._checkResult)
    }

    //удаление карточки
    deleteCard(itemId) {
        console.log(itemId);
        return fetch(`${this._url}/cards/${itemId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(this._checkResult);
    }
    //лайки и дизлайки
    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
            return fetch(`${this._url}/cards/likes/${id}`, {
                method: "PUT",
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
                .then(this._checkResult);
        } else {
            return fetch(`${this._url}/cards/likes/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
                .then(this._checkResult);
        }
    }

    // обновление аватара
    setUserAvatar(link) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(link)
        })
            .then(this._checkResult);
    }
}

export const api = new Api({
    url: 'http://localhost:3000',
    headers: {
        "Content-type": "application/json",
    },
})