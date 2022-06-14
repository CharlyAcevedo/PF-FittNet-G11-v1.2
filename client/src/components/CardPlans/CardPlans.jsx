import React from "react";
import style from "./style/CardPlans.module.css";
import { ButtonSimple } from "../../helpers/Buttons/Buttons";
import { useNavigate } from "react-router-dom";

export default function CardPlans() {
  const navigate = useNavigate();
  return (
    <div>
      <div className={style.pricingcard}>
        <div className={style.cardleft}>
          <h1>Estandar</h1>
          <p>
            <span className={style.dollar}>$</span>3000
          </p>
          <ButtonSimple
            title="CREAR CEUNTA"
            onClick={() => navigate("/register")}
          />
        </div>
        <div className={style.cardright}>
          <div className={style.plan}>
            <ul>
              <li>20% de visibilidad</li>
              <li>Panel de control</li>
              <li>Historial de ventas</li>
              <li>Gestios de GYM</li>
              <li>Gestios de servicios</li>
              <li>incorporar hasta 1 gym</li>
              <li>incorporar hasta 5 servicos</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={style.pricingcard}>
        <div className={style.cardleft}>
          <h1>Premiun</h1>
          <p>
            <span className={style.dollar}>$</span>5000
          </p>
          <ButtonSimple
            title="CREAR CEUNTA"
            onClick={() => navigate("/register")}
          />
        </div>
        <div className={style.cardright}>
          <div className={style.plan}>
            <ul>
              <li>30% de visibilidad</li>
              <li>Panel de control</li>
              <li>Historial de ventas</li>
              <li>Gestios de GYM</li>
              <li>Gestios de servicios</li>
              <li>incorporar hasta 5 gym</li>
              <li>incorporar hasta 10 servicos</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={style.pricingcard}>
        <div className={style.cardleft}>
          <h1>Golden</h1>
          <p>
            <span className={style.dollar}>$</span>7000
          </p>
          <ButtonSimple
            title="CREAR CEUNTA"
            onClick={() => navigate("/register")}
          />
        </div>
        <div className={style.cardright}>
          <div className={style.plan}>
            <ul>
              <li>50% de visibilidad</li>
              <li>Panel de control</li>
              <li>Historial de ventas</li>
              <li>Gestios de GYM</li>
              <li>Gestios de servicios</li>
              <li>incorporar hasta 50 gym</li>
              <li>incorporar hasta 50 servicos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
{
  /* <div className={style.containCp}>
  <div className={style.containEx}>
    <h2>Estandar</h2>
    <ul className={style.listStandar}>
      <li>
        Tu anuncio tendrá un alcance del 20% en busquedas de usuarios!
      </li>
      <li>Podras gestionar tus cupos, horarios y perfil!</li>
      <li>Contaras con un panel de control e historial de ventas!</li>
      <li>Otorgarás visibilidad a tus casos de exito!</li>
    </ul>
    {plansPrice.map((a) => (
      <h4 key={a} >Costo mensual: {a.planStandar}</h4>
    ))}
    {plansPorcentage.map((a) => (
      <h4 key={a}>Comision sobre venta de servicio: {a.planStandar} </h4>
    ))}
  </div>
  <div className={style.containEx}>
    <h2>Premium</h2>
    <ul className={style.listStandar}>
      <li>
        Tu anuncio tendrá un alcance del 30% en busquedas de usuarios!
      </li>
      <li>Podras gestionar tus cupos, horarios y perfil!</li>
      <li>Contaras con un panel de control e historial de ventas!</li>
      <li>Otorgarás visibilidad a tus casos de exito!</li>
    </ul>
    {plansPrice.map((a) => (
      <h4 key={a}>Costo mensual: {a.planPremiun}</h4>
    ))}
    {plansPorcentage.map((a) => (
      <h4 key={a}>Comision sobre venta de servicio: {a.planPremiun} </h4>
    ))}
  </div>
  <div className={style.containEx}>
    <h2>Golden</h2>
    <ul className={style.listStandar}>
      <li>
        Tu anuncio tendrá un alcance del 50% en busquedas de usuarios!
      </li>
      <li>Podras gestionar tus cupos, horarios y perfil!</li>
      <li>Contaras con un panel de control e historial de ventas!</li>
      <li>Otorgarás visibilidad a tus casos de exito!</li>
    </ul>
    {plansPrice.map((a) => (
      <h4 key={a}>Costo mensual: {a.planGolden}</h4>
    ))}
    {plansPorcentage.map((a) => (
      <h4 key={a}>Comision sobre venta de servicio: {a.planGolden} </h4>
    ))}
  </div>
</div> */
}
