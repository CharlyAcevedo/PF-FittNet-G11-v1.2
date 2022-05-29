import React from "react";
import NavBarProfile from "../components/NavBarProfile/NavBarProfile";
import Paginated from "../components/paginated/paginated";
import GymCards from "../components/GymCards/GymCards";

export default function UserHome() {

    return (            
        <div>                
            <NavBarProfile/>
            <Paginated/>
            <GymCards/>               
        </div>         
    )
}