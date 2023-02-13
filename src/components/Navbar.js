import React from "react";
import classes from "./Navbar.module.css";
import { Link, Form } from "react-router-dom";
import searchIcon from "../icons/search-icon.png";
import accountIcon from "../icons/account-icon.png";
import logo from "../icons/logo.png";


function PageNav() {

  const token = "null"; //useRouteLoaderData('root');

  return (
    <div className={classes.pageNav}>
    <ul className={classes.leftIcons}>
      <li><Link to="/"><img className={classes.logo} src={logo} width="90px" height="65px" /></Link></li>
      <li><Link to="/damages">Zgłoś usterkę</Link></li>
      </ul>
      {/*<div className={classes.searchBar}>
        <input type="text" className={classes.input} placeholder="Search..." />
        <img className={classes.searchIcon} src={searchIcon} width="20px" height="20px" />
      </div>*/}
      <span className={classes.space}></span>
      <div className={classes.rightIcons}>
        <ul>
          {!token && (
            <li>
              <Link to="/sign?mode=login">
                <img className="account-icon" src={accountIcon} width="25px" height="25px" />
              </Link>
            </li>
          )}
          {token && (
            <div className={classes.account}>
              <li><Link to="/account:userId"><img className="account-icon" src={accountIcon} width="25px" height="25px" /></Link></li>
              <li>
                <Form action="/logout" method="post">
                  <button>Wyloguj się</button>
                </Form>
              </li>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

export default PageNav;
