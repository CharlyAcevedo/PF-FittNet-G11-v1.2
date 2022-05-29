import React from "react";
import { useParams } from "react-router-dom";
import logoFittNet from "../../asets/images/logo_fitnet.jpg";
import Logout from "../Logout/Logout";
import SelecAvatar from "../SelectAvatar/SelectAvatar";
import GymCards from "../GymCards/GymCards";
import NavBarProfile from "../NavBarProfile/NavBarProfile";

// import SelectAvatar from "./views/SelectAvatar";
export default function HomeMain() {
    let { userId , name, type, avatar } = useParams();
    // console.log(userId, name, type, avatar, 'mis params')

    // debería llegarme por params si es un 
    // "user" con sin avatar o un "partner" o incluso un "admin"

    // Esto es una vista para un usuario sin avatar
    if (type === 'user' && !avatar) {
        return (
            
            <div> 
                <SelecAvatar/>
                <Logout/>                
                <a href='/'>Volver</a>                
            </div>         
        )
    }

    // Esto es una vista para un usuario con avatar
    if (type === 'user' && avatar) {
        return (            
            <div>                
                <NavBarProfile/>
                <GymCards/>               
            </div>         
        )
    }
    
    // Esto es una para cliente empresa
    if (type === 'partner') {
        return (            
            <div> 
                <div>Entraste en / Home {name}, bienvenido!</div>               
                <img height="200" src={logoFittNet} alt="logo" />          
                <div>Quiero ver info de mi perfil</div>
                <a href={`/profile/${type}/${name}/${userId}`}>Mi perfil</a>
                <Logout/>
                <br />
                <a href='/'>Volver</a>
                <h3>Qué más quiero ver como Ciente Empresa cuando llego a home???</h3>   
            </div>         
        )
    }

    // Esto es una para un administrador de sitio
    if (type === 'admin') {
        return (            
            <div> 
                <div>Entraste en / Home {name}, bienvenido!</div>               
                <img height="200" src={logoFittNet} alt="logo" />          
                <div>Quiero ver info de mi perfil</div>
                <a href={`/profile/${type}/${name}/${userId}`}>Mi perfil</a>
                <Logout/>
                <br />
                <a href='/'>Volver</a>
                <h3>Qué más quiero ver como Admin cuando llego a home???</h3>   
            </div>         
        )
    }
}