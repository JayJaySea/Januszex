import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function HomeSite() {
    return (
        <div className="home-site">
            <Navbar />
            <h1>Hello</h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/sign">Sign</Link>
                </li>
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

export default HomeSite;