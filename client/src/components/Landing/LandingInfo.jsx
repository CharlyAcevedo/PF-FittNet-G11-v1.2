import React from "react";
import { Link, useNavigate } from "react-router-dom";
import strong from "../../asets/images/gym2.jpg";
import style from "../Landing/styles/Landing.module.css";
import { ButtonPrimary } from "../../helpers/Buttons.jsx";
import { CardPromoBalance } from "./componentsLanding/componentsLanding.jsx";

export default function LandingInfo() {
  const navigate = useNavigate();

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
        <div className={style.promoDiv}>
          <div className={style.containerBtnPromos}>
            <ButtonPrimary
              title="Conocé nustras promos"
              padding="0 5rem"
              onClick={() => navigate("/userprices")}
            />
          </div>
        </div>
        <div>
          <p className={style.tituloEmpeza}>El cambio empieza adentro tuyo</p>
          <p className={style.footerEmpeza}>
            Unite a la red de los mejores gimnasios, aprovecha sus planes y
            empeza a sentirte bien.
          </p>
          <Link className={style.empezaAqui} to="/login">
            Empezá aquí
          </Link>
          <img
            className={style.mujerHombre}
            src="https://res.cloudinary.com/salta/image/upload/v1654014806/man-1920_vcrlef.jpg"
            alt="imagen-gym"
          />
        </div>
        <div className={style.promosUsuarios}>
          <CardPromoBalance />
          <div className={style.promoBulk}>
            <h2 className={style.bulkTitulo}>Pack Pro Bulk</h2>
            <ul className={style.bulkLista}>
              <li>Pack Balance Care +</li>
              <li>
                <span>&bull;</span>Seguimiento personalizado
              </li>
              <li>
                <span>&bull;</span>Clases premium: pilates, yoga, spa room
              </li>
              <li>
                <span>&bull;</span>Suplementos
              </li>
            </ul>
            <h2>$9000/mensual</h2>
          </div>
        </div>
        <div className={style.uniteContainer}>
          <p className={style.tituloUnite}>
            Uní tu Gym a la evolucion del FittNet
          </p>
          <p className={style.footerUnite}>
            Formá parte de la red mas importante de gimnasios del pais y empeza
            a crecer.
          </p>
          <Link className={style.uniteAqui} to="/login">
            Unite aquí
          </Link>
          <img
            className={style.uniteGyms}
            src="https://res.cloudinary.com/salta/image/upload/v1654014752/modern-gym_rzjjlv.jpg"
            alt="imagen-gym"
          />
        </div>
      </div>
  );
}
