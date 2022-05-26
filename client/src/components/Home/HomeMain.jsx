import React from "react";
import logoFittNet from "../../asets/images/logo_fitnet.jpg";
import views from "../../asets/images/card_views.png";
import Logout from "../Logout/Logout";
import { useParams } from "react-router-dom";

export default function HomeMain() {
    let { id , name, type } = useParams();
    console.log(id, name, type, 'id y name')

    // debería llegarme por params si es un 
    // "user" o un "partner" o incluso un "admin"


    if (type === 'user') {
        return (
            
            <div> 
                <div>Entraste en / Home {name}, bienvenido!</div>              
                <img height="200" src={logoFittNet} alt="logo" />          
                <div>Quiero ver info de mi perfil</div>
                <a href={`/profile/${type}/${name}/${id}`}>Mi perfil</a>
                <Logout/>
                <br />
                <a href='/'>Volver</a>
                <img src={views} alt="views"/>    
            </div>         
        )
    }
    if (type === 'partner') {
        return (
            
            <div> 
                <div>Entraste en / Home {name}, bienvenido!</div>               
                <img height="200" src={logoFittNet} alt="logo" />          
                <div>Quiero ver info de mi perfil</div>
                <a href={`/profile/${type}/${name}/${id}`}>Mi perfil</a>
                <Logout/>
                <br />
                <a href='/'>Volver</a>
                <h3>Qué más quiero ver como Ciente Empresa cuando llego a home???</h3>   
            </div>         
        )
    }

    if (type === 'admin') {
        return (
            
            <div> 
                <div>Entraste en / Home {name}, bienvenido!</div>               
                <img height="200" src={logoFittNet} alt="logo" />          
                <div>Quiero ver info de mi perfil</div>
                <a href={`/profile/${type}/${name}/${id}`}>Mi perfil</a>
                <Logout/>
                <br />
                <a href='/'>Volver</a>
                <h3>Qué más quiero ver como Admin cuando llego a home???</h3>   
            </div>         
        )
    }
}