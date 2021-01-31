import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleChangeEmail = (evt) => {
        setEmail(evt.target.value);
    }

    const handleChangePassword = (evt) => {
        setPassword(evt.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        props.onRegisterSubmit(email, password)
    }

    return (
        <div className="register">
            <h1 className="register__title">Регистрация</h1>
            <form onSubmit={handleSubmit} className="register__form">
                <input onChange={handleChangeEmail} className="register__input" placeholder="Email" />
                <input onChange={handleChangePassword} className="register__input" placeholder="Пароль" type="password" />
                <button className="register__button">Зарегистрироваться</button>
            </form>
            <div className="register__signin">
                <p>Уже зарегистрированы?</p>
                <Link to="login" className="register__login-link">Войти</Link>
            </div>
        </div>
    )
}

export default Register