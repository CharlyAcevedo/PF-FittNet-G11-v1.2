import React from "react";
import { Link } from "react-router-dom";
import imgPrin from "../../asets/images/Langing/wallpaper.jpg";

import strong from "../../asets/images/gym2.jpg";
import mujerHombre from "../../asets/images/man-1920.jpg";
import uniteGyms from "../../asets/images/modern-gym.jpg";
import style from "../Landing/styles/Landing.module.css";

export default function LandingInfo() {
  return (
    <div>
      <div className={style.container}>
        <div className={style.contPrim}>
          <div className={style.contElempadre}>
            <div className={style.contElem}>
                <div className={style.contText}>
                  <h1>
                    La red de los mejores gimnasios acompañandote durante todo
                    el proceso de cambio
                  </h1>
                  <br />
                  <br />
                  <Link to="/login">
                    <button className={style.btn}>Empezá aquí</button>
                  </Link>
                </div>
              <div className={`${style.screenBackground}`}>
                <span className={style.shapeTop1}></span>
                <span className={style.shapeButtom1}></span>
                <span className={style.shapeTop2}></span>
                <span className={style.shapeButtom2}></span>
                <span className={style.shapeTop3}></span>
                <span className={style.shapeButtom3}></span>
                <span className={style.shapeTop4}></span>
                <span className={style.shapeButtom4}></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={style.ingresarRegistrarse}>
        <img className={style.imageStrong} src={strong} alt="" />
        <Link className={style.ingresar} to="/login">
          Ingresar
        </Link>
        <Link className={style.registrarse} to="/register">
          Registrarse
        </Link>
        <p className={style.parrafo1Landing}>
          La red de los mejores gimnasios acompañandote durante todo el proceso
          de cambio
        </p>
      </div>
      <div className={style.promoDiv}>
        <Link className={style.promos} to="/userprices">
          Conocé nuestras promos
        </Link>
      </div>
      <div>
        <p className={style.tituloEmpeza}>El cambio empieza adentro tuyo</p>
        <p className={style.footerEmpeza}>
          Unite a la red de los mejores gimnasios, aprovecha sus planes y empeza
          a sentirte bien.
        </p>
        <Link className={style.empezaAqui} to="/login">
          Empezá aquí
        </Link>
        <img className={style.mujerHombre} src={mujerHombre} alt="" />
      </div>
      <div className={style.promosUsuarios}>
        <div className={style.promoBalance}>
          <h2 className={style.balanceTitulo}>Pack Balance Care</h2>
          <ul className={style.balanceLista}>
            <li>Planes de dieta</li>
            <li>Clases de gimnasia indoor</li>
            <li>Entrenamiento de pesas y maquinas</li>
            <li>Entrenamiento de artes marciales</li>
          </ul>
          <h2>$6000/mensual</h2>
        </div>
        <div className={style.promoBulk}>
          <h2 className={style.bulkTitulo}>Pack Pro Bulk</h2>
          <ul className={style.bulkLista}>
            <li>Pack Balance Care +</li>
            <li>Seguimiento personalizado</li>
            <li>Clases premium: pilates, yoga, spa room</li>
            <li>Suplementos</li>
          </ul>
          <h2>$9000/mensual</h2>
        </div>
      </div>
      <div className={style.uniteContainer}>
        <p className={style.tituloUnite}>
          Uní tu Gym a la evolucion del FittNet
        </p>
        <p className={style.footerUnite}>
          Formá parte de la red mas importante de gimnasios del pais y empeza a
          crecer.
        </p>
        <Link className={style.uniteAqui} to="/login">
          Unite aquí
        </Link>
        <img className={style.uniteGyms} src={uniteGyms} alt="" />
      </div>
    </div>
  );
}
