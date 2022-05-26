import React from "react";
import NavBar from "../components/NavBar/NavBar";
import HomeMain from "../components/Home/HomeMain";

export default function Home() {

    return (
        <div className="main_home_view">
            <NavBar/>
            <HomeMain/>
        </div>
    )
}