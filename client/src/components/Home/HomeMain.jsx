import React from "react";
import logoFittNet from "../../asets/images/logo_fitnet.jpg";


export default function HomeMain() {
    console.log(document.cookie, ' cómo se ven las cookies?')
    return (
        
        <div> 
            <div>Entraste en / Home </div>
            <h1>{document.cookie ? document.cookie : null}</h1>
            <img height="200" src={logoFittNet} alt="logo" />          
            <div>Quiero ver info de quien entró </div>
            <br />
            <a href='/'>Volver</a>
        </div>
        

    )

}