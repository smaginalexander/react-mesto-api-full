import React from 'react';

function Login(props) {
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
        props.onLoginSubmit(email, password);
    }
    return (
        <div className="register">
            <h1 className="register__title">Вход</h1>
            <form onSubmit={handleSubmit} className="register__form">
                <input onChange={handleChangeEmail} className="register__input" placeholder="Email" />
                <input onChange={handleChangePassword} className="register__input" placeholder="Пароль" type="password" />
                <button className="register__button">Войти</button>
            </form>
        </div>
    )
}

export default Login