import React from "react";
import { Link, useSubmit, Form, redirect, json } from "react-router-dom";
import classes from "./AccountNav.module.css";
import { getAuthToken } from '../util/auth';


function AccountNav({ reserv }) {

    return (
        <div className={classes.navContainer}>
            <ul>
                <li><Link className={classes.myAccount} to="/account:userId">Moje konto</Link></li>
                <li><Link to="/account:userId/reservationsHistory">Historia rezerwacji</Link></li>
                <li><Link to="/account:userId/loyalityCard">Karta lojalnościowa</Link></li>
                <li><Form action="/logout" method="post">
                  <button>Wyloguj się</button>
                </Form></li>
            </ul>
        </div>
    );
}

export default AccountNav;
