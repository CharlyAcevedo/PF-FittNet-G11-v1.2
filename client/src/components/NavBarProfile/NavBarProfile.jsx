import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Logout from "../Logout/Logout";
import style from "./style/NavBarProfile.module.css";

export default function NavBarProfile() {
  let { userId, name, type, avatar } = useParams();

  const navigate = useNavigate();

  return (
    <div className={style.boxNavBarProfile}>
      <nav className={style.navBarProfile}>
        <div className={style.titleNavBar}>
          <div onClick={() => navigate("/")}>
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
    </div>
  );
}
