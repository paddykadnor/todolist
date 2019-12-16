import React from 'react';
import logo from "../../logo.svg"
import "./Header.css"


class Header extends React.Component {

    render() {
        return (
            <div className="header">
                <a href="./">
                <img src={logo} alt="logo"></img>
                </a> 
            </div>
        )
    }
}

export default Header