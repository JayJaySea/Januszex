import React, { useState } from "react";
import LoginForm from "./LoginForm";
import PageNav from "./Navbar";
import { Link } from "react-router-dom";
import SignUpForm from "./SignUpForm";

function SignSite(props) {


    async function sendSignUpFormHandler(user) {
        const response = await fetch('https://januszex-d2112-default-rtdb.europe-west1.firebasedatabase.app/users.json', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-type': 'application/json' }
        });
        const data = await response.json();
        console.log(data);

    }

    return (
        <div className="sign-container">
            <PageNav />
            <LoginForm />
            <SignUpForm onSignUpForm={sendSignUpFormHandler}/>
        </div>
    );
}

export default SignSite;