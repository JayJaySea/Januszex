import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div className="home-page">
            <Navbar />
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