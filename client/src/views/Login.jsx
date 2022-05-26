import React from "react";
import NavBar from "../components/NavBar/NavBar";
import LoginInit from "../components/Login/LoginInit"

export default function Login() {

    return (
        <div className="main_login_view">
            <NavBar/>
            <LoginInit/>
        </div>
    )
};