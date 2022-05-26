import React from "react";
import logoFittNet from "../../asets/images/logo_fitnet.jpg";
import Logout from "../Logout/Logout";
import { useParams } from "react-router-dom";

export default function HomeMain() {
    let { id , name, type } = useParams();
    console.log(id, name, type, 'id y name')

    // debería llegarme por params si es un "user" o un "partner" o incluso un "admin"




    return (
        
        <div> 
            <div>Entraste en / Home {name}, bienvenido!</div>
            <h1>{document.cookie ? document.cookie : null}</h1>
            <img height="200" src={logoFittNet} alt="logo" />          
            <div>Quiero ver info de mi perfil</div>
            <a href={`/profile/${type}/${name}/${id}`}>Mi perfil</a>
            {/* <a href={`/profile/${id}/${name}`}>Mi perfil</a> */}
            <br />
            <a href='/'>Volver</a>
            <Logout/>
        </div>
        

    )

}