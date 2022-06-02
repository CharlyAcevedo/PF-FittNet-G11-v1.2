import React from "react";
import style from "./styles/NavBar.module.css";
import { ButtonSimple, ButtonSecondarySimple } from "../../helpers/Buttons.jsx";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <nav className={style.nav}>
      <div onClick={() => navigate("/")}>
        <img
          src="https://res.cloudinary.com/salta/image/upload/v1654029469/logo-modo-BLANCO_smtgwu.png"
          alt=""
          style={{
            width: "170px",
            height: "82px",
            marginLeft: "4rem",
            cursor: "pointer",
          }}
        />
      </div>
      <ul className={style.ul}>
        <ButtonSecondarySimple
          title="Sos propietario? Unite!"
          padding="0 2rem"
          onClick={() => navigate("/legendCe")}
        />
        <ButtonSecondarySimple
          onClick={() => navigate("/legendUf")}
          title="Beneficios para miembros"
          padding="0 2rem"
        />
        <ButtonSimple
          title="Prueba gratis"
          onClick={() => navigate("/register")}
          padding="0 2rem"
        />
      </ul>
    </nav>
  );
}
