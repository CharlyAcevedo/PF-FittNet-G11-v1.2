import React, { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Logout from "../Logout/Logout";
import style from "./style/NavBarProfile.module.css";

export default function NavBarProfile() {
  let { userId, name, type, avatar } = useParams();


  const token = localStorage.getItem("token");

  return (
    <div className={style.boxNavBarProfile}>
      <nav className={style.navBarProfile}>
        <div className={style.titleNavBar}>
          <div>
            <img
              src="https://res.cloudinary.com/salta/image/upload/v1654029469/logo-modo-BLANCO_smtgwu.png"
              alt="foto"
              style={{
                width: "155px",
                height: "75px",
                cursor: "pointer",
              }}
            />
          </div>
          <h3>
            Bienvenido <span>{name} !</span>
          </h3>
        </div>
        <div className={style.boxListaNavBarProfile}>
          <a href={`/profile/${type}/${name}/${userId}`}>Mi perfil</a>

          <a href="/">Inicio</a>
          <a
            href={
              !avatar
                ? `/home/${type}/${name}/${userId}/${avatar}`
                : `/home/${type}/${name}/${userId}`
            }
          >
            Home
          </a>
          <div className={style.logoutNavBarProfile}>
            <Logout />
          </div>
        </div>
      </nav>
      {/* <ul className={style.listNavBar}>
                <div className={style.itemsNavBarProfile}>
                    <h4 className={style.nameProfile}>Bienvenido a tu Home {name}!</h4>
                </div>
                <div className={style.itemsNavBarProfile}>
                    <a href={`/profile/${type}/${name}/${userId}`}>Mi perfil</a>
                </div>
                <div className={style.itemsNavBarProfile}>
                    <a href={ avatar ?
                    `/home/${type}/${name}/${userId}/${avatar}` :
                    `/home/${type}/${name}/${userId}` }>Home</a>
                 </div>
                <div className={style.itemsNavBarProfile}>
                    <a href="/">Ir a inicio</a>                            
                </div>
                <div>
                    <a href={`/home/modificacion/${type}/${name}/${userId}`}>Modificar usuario</a>
                </div>
                <div className={style.itemsNavBarProfile}>
                    <Logout/>
                </div>                
            </ul> */}
    </div>
  );
}
