import React, { Component } from 'react';
import Tab from './Tab';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <header className="Header">
                <div className="Header__title">
                    Hello Shnekel!
                </div>
                <div className="Header__tabs">
                    <Tab activeOnlyWhenExact={true} to="/" label="Home" />
                    <Tab to="/categories" label="Categories" />
                    <Tab to="/new" label="Create new" />
                </div>
            </header>
        );
    }
}

export default Header;
