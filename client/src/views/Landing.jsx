import React from "react";
import NavBar from "../components/NavBar/NavBar";
import LandingInfo from "../components/Landing/LandingInfo"

export default function Landing() {

    return (
        <div className="main_landing">
            <NavBar/>
            <LandingInfo/>
        </div>
    )
}