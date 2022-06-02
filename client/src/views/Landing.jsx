import React from "react";
import NavBar from "../components/NavBar/NavBar";
import LandingInfo from "../components/Landing/LandingInfo"
import NavBarDevelopers from "../components/NavBarDevelopers/NavBarDevelopers";
export default function Landing() {

    return (
        <div>
            <NavBarDevelopers/>
            <LandingInfo/>
        </div>
    )
}