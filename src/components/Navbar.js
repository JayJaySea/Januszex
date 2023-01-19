import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import searchIcon from "../icons/search-icon.png"
import accountIcon from "../icons/account-icon.png"

function PageNav() {
  return (
    <div className="page-nav">
        <div className="page-nav__logo"><Link to="/home">LOGO</Link></div>
        <div className="page-nav__search-bar">
            <input type="text" className="search-bar-input" placeholder="Search..." />
            <img className="search-icon" src={searchIcon} width="20px" height="20px" />
        </div>
        <span className="page-nav__space"></span>
        <div className="page-nav__right-icons">
            <ul className="right-icons-elements">
                <li><Link to="/login"><img className="account-icon" src={accountIcon} width="25px" height="25px"/></Link></li>
            </ul>
        </div>
    </div>
  );
}

export default PageNav;
