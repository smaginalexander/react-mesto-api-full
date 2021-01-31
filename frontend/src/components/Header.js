import React from 'react';
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';
function Header(props) {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="логотип" />
            {props.loggedIn ?
                <div className="header__container">
                    <p>{props.email}</p>
                    <Link to={props.routePath} onClick={props.exitFromPage} className="header__link">{props.pageName}</Link>
                </div> :
                <div className="header__container">
                    <p></p>
                    <Link to={props.routePath} className="header__link">{props.pageName}</Link>
                </div>
            }
        </header>
    );
}

export default Header;