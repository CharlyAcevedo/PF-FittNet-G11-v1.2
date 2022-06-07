import React from "react";
import { useParams, Link } from "react-router-dom";
import Logout from "../Logout/Logout";
import style from './style/NavBarProfile.module.css';
import FormUser from "../Forms/FormUser";

export default function NavBarProfile() {
    let { userId , name, type, avatar } = useParams();
    
    return (
        <div className={style.boxNavBarProfile}>
            <ul className={style.listNavBar}>
                <div className={style.itemsNavBarProfile}>
                    <h4 className={style.nameProfile}>Bienvenido a tu Home {name}!</h4>
                </div>
                <div className={style.itemsNavBarProfile}>
                    <a href="/">Ir a inicio</a>                            
                </div>
                <div className={style.itemsNavBarProfile}>
                    <a href={ avatar ?
                    `/home/${type}/${name}/${userId}/${avatar}` :
                    `/home/${type}/${name}/${userId}` }>Home</a>
                 </div>
                <div className={style.itemsNavBarProfile}>
                    <a href={`/profile/${type}/${name}/${userId}`}>Mi perfil</a>
                </div>
                {/* <div>
                    <a href={`/home/modificacion/${type}/${name}/${userId}`}>Modificar usuario</a>
                </div> */}
                <div className={style.itemsNavBarProfile}>
                    <Logout/>
                </div> 
                <div className={style.itemsNavBarProfile}>
                    <Link to={`/home/${type}/${name}/${userId}/${avatar}/FormUser`}>modificar informacion</Link>
                </div>                
            </ul>
        </div>
    )
}