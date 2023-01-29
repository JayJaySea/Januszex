import React from "react";
import { Link } from "react-router-dom";
import classes from "./HomePage.module.css";

function HomePage() {
    return (
        <div className={classes.homePage}>
            <h1>Hello</h1>
            <ul>
                <li>
                    <Link to="/persInfo">Form</Link>
                </li>
                <li>
                    <Link to="/payment">Payment</Link>
                </li>
            </ul>

        </div>

    )
}

export default HomePage;