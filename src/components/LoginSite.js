import React, { useState } from "react";
import LoginForm from "./LoginForm";
import PageNav from "./Navbar";

function LoginSite() {

    return (
        <div className="login-container">
            <PageNav />
            <LoginForm />
        </div>
    );
}

export default LoginSite;