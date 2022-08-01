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
              <li>Comision por venta: 0.50</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={style.pricingcard}>
        <div className={style.cardleft}>
          <h1>Premium</h1>
          <p>
            <span className={style.dollar}>$</span>4000
          </p>
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
              <li>Comision por venta: 0.50</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={style.pricingcard}>
        <div className={style.cardleft}>
          <h1>Golden</h1>
          <p>
            <span className={style.dollar}>$</span>5000
          </p>
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
              <li>Comision por venta: 0.50</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
