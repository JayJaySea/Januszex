import React from "react";
import "./Navbar.css";
import { Link, Form, useRouteLoaderData, NavLink } from "react-router-dom";
import searchIcon from "../icons/search-icon.png";
import accountIcon from "../icons/account-icon.png";
import logo from "../icons/logo.png";


function PageNav() {

  const token = "gdfgd"; //useRouteLoaderData('root');

  return (
    <div className="page-nav">
      <Link to="/"><img className="page-nav__logo" src={logo} width="70px" height="50px" /></Link>
      <div className="page-nav__search-bar">
        <input type="text" className="search-bar-input" placeholder="Search..." />
        <img className="search-icon" src={searchIcon} width="20px" height="20px" />
      </div>
      <span className="page-nav__space"></span>
      <div className="page-nav__right-icons">
        <ul className="right-icons-elements">

          <li>{!token && (
            <li>
              <Link to="/sign?mode=login">
                <img className="account-icon" src={accountIcon} width="25px" height="25px" />
              </Link>
            </li>
          )}</li>
          <li>{token && (
            <div>
              <li><Link to="/account"><img className="account-icon" src={accountIcon} width="25px" height="25px" /></Link></li>
              <li>
                <Form action="/logout" method="post">
                  <button>Logout</button>
                </Form>
              </li>
            </div>
          )}</li>
        </ul>
      </div>
    </div>
  );
}

export default PageNav;
