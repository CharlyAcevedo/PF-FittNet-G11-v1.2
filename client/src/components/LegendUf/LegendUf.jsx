import React from "react";
import img from "../../asets/images/benefits(uf).jpg";
import style from "../LegendUf/style/LegendUf.module.css";
import { ButtonSecondaryDeslice } from "../../helpers/Buttons/Buttons.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function LegendUf() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const token = localStorage.getItem("token");

  const name = localStorage.getItem("name");

  const type = localStorage.getItem("type");

  const idUser = localStorage.getItem("userId");

  const avatar = localStorage.getItem("avatar");

  return (
    <div className={style.containerFullLegend}>
      <div className={style.img}>
        <img src={img} alt="" />
      </div>

      <div className={style.containerLegendText}>
        <h3 style={{ color: "#e0e0e0", fontSize: "1.5rem", marginTop: "3rem" }}>
          Nuestro propósito es facilitar el acceso a la práctica de actividad
          física de alta calidad, al mismo tiempo brindarte una manera fácil y
          segura de organizar tu agenda de actividades y tus objetivos de manera
          personalizada!
          <br key="br1" />
          <br key="br2" />
          En un solo lugar, podrás ver todas las posibilidades y elegir el
          gimnasio que mejor se adapte a tu perfil deportivo y ubicación!
          <br key="br3" />
          <br key="br4" />
          Podrás elegir inscribirte de forma mensual o tambien optar por tomar
          clases individuales, abonando de forma segura y sin moverte de tu
          casa!
        </h3>
        <h2 style={{ color: "var(--color-prim)", marginTop: "1.5rem" }}>
          {!idUser
            ? "Que esperas para formar parte de la evolucion del mundo deportivo ?"
            : "Ya formas parte de la evolucion deportiva!"}
        </h2>
        <div style={{ marginTop: "2rem" }}>
          {!idUser ? (
            <ButtonSecondaryDeslice
              title="Registrate"
              padding=".7rem 4rem"
              onClick={() => navigate("/register")}
            />
          ) : (
            <ButtonSecondaryDeslice
              title="Ir a Home"
              padding=".7rem 4rem"
              onClick={() =>
                navigate(`/home/${type}/${name}/${idUser}/${avatar}}`)
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
