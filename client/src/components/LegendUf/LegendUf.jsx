import React from "react";
import img from "../../asets/images/benefits(uf).jpg";
import logo from "../../asets/images/logoPF.jpg";
import style from "../LegendUf/style/LegendUf.module.css";
import { ButtonSecondaryDeslice } from "../../helpers/Buttons/Buttons.jsx";
import { useNavigate } from "react-router-dom";

export default function LegendUf() {

    const navigate = useNavigate();

  return (
    <div className={style.containerFullLegend}>
      <div className={style.img}>
        <img src={img} alt="" />
      </div>

      <div className={style.containerLegendText}>
        <h3 style={{ color: "#e0e0e0", fontSize: "1.5rem", marginTop: "3rem"}}>
          Nuestro propósito es facilitar el acceso a la práctica de actividad
          física de alta calidad, al mismo tiempo brindarte una manera fácil y
          segura de organizar tu agenda de actividades y tus objetivos de manera
          personalizada!
          <br />
          <br />
          En un solo lugar, podrás ver todas las posibilidades y elegir el
          gimnasio que mejor se adapte a tu perfil deportivo y ubicación!
          <br></br>
          <br></br>
          Podrás elegir inscribirte de forma mensual o tambien optar por tomar
          clases individuales, abonando de forma segura y sin moverte de tu
          casa!
        </h3>
        <h2 style={{ color: "var(--color-prim)", marginTop: "1.5rem"}}>
          Que esperas para formar parte de la evolucion del mundo deportivo ?
        </h2>
        <div style={{marginTop: "2rem"}}>
        <ButtonSecondaryDeslice title="Registrate" padding=".7rem 4rem" onClick={() => navigate('/register')}/>
        </div>
      </div>
      {/* <div className={style.containLegend}>
        <h3>
          Nuestro propósito es facilitar el acceso a la práctica de actividad
          física de alta calidad, al mismo tiempo brindarte una manera fácil y
          segura de organizar tu agenda de actividades y tus objetivos de manera
          personalizada!
          <br></br>
          <br></br>
          En un solo lugar, podrás ver todas las posibilidades y elegir el
          gimnasio que mejor se adapte a tu perfil deportivo y ubicación!
          <br></br>
          <br></br>
          Podrás elegir inscribirte de forma mensual o tambien optar por tomar
          clases individuales, abonando de forma segura y sin moverte de tu
          casa!
        </h3>
        <br></br>
        <h2>
          Que esperas para formar parte de la evolucion del mundo deportivo?
        </h2>
        <button className={style.btn}>
          <a href={"/registration"}></a>REGISTRATE
        </button>
      </div> */}
    </div>
  );
}
