import React from "react";
import logoFittNet from "../../asets/images/logo_fitnet.jpg";
import Logout from "../Logout/Logout";
import { useParams } from "react-router-dom";

export default function HomeMain() {
    let { name } = useParams();



    return (
        
        <div> 
            <div>Entraste en / Home {name}, bienvenido!</div>
            <h1>{document.cookie ? document.cookie : null}</h1>
            <img height="200" src={logoFittNet} alt="logo" />          
            <div>Quiero ver info de quien entró </div>
            <br />
            <a href='/'>Volver</a>
            <Logout/>
        </div>
        

    )

}