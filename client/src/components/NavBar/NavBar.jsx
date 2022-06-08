import React from "react";
import style from "./styles/NavBar.module.css";
import {
  ButtonSimple,
  ButtonSecondarySimple,
} from "../../helpers/Buttons/Buttons.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function NavBar() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const token = localStorage.getItem("token");

  const name = localStorage.getItem("name");

  const type = localStorage.getItem("type");

  const idUser = localStorage.getItem("userId");

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
        {idUser ? (
          <p style={{color: "#fff", fontSize: "1.3rem"}}>{name} ya estas registrado!</p>
        ) : (
          <ButtonSimple
            title="Prueba gratis"
            onClick={() => navigate("/register")}
            padding="0 2rem"
          />
        )}
      </ul>
    </nav>
  );
}
