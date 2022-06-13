import React, { useRef, useEffect } from "react";
import style from "../Slider/styles/Slider.module.css";
import benefits from "../../asets/images/benefits.jpg";
import benefits1 from "../../asets/images/benefits(1).jpg";

export default function Slider() {
  return (
    <div className={style.containP}>
      <div className={style.wrapper}>
        <h1>BENEFICIOS</h1>
        <div className={style.timeline}>
          <dl className={style.timelineentry}>
            <dt className={style.timelineentrytitle}>Contenido Publicitario</dt>
            <dd className={style.timelineentrydetail}>
              Podras otorgar visibilidad a tu marca, aumentando tus ventas y
              ganancias, tambien generaras nuevos clientes aprovechando la
              imagen positiva o apunta a consumidores especificos
            </dd>
          </dl>
          <dl className={style.timelineentry}>
            <dt className={style.timelineentrytitle}>Perfil actualizado</dt>
            <dd className={style.timelineentrydetail}>
              Mantendrás a los usuarios informados de tus promociones, novedades
              y productos ofrecidos!
            </dd>
          </dl>
          <dl className={style.timelineentry}>
            <dt className={style.timelineentrytitle}>Libertad financiera</dt>
            <dd className={style.timelineentrydetail}>
              Generarás ganancias que nunca imaginaste sin preocuparte por
              gestionar tus cobranzas!
            </dd>
          </dl>
          <dl className={style.timelineentry}>
            <dt className={style.timelineentrytitle}>Comunidad </dt>
            <dd className={style.timelineentrydetail}>
              Formaras parte de una comunidad destacada por su nivel de servicio
              , atención y calidad. muchos usuarios ya confían en nosotros!
            </dd>
          </dl>
          <dl className={style.timelineentry}>
            <dt className={style.timelineentrytitle}>Alcance</dt>
            <dd className={style.timelineentrydetail}>
              Podras gestionar tus gimnasios y servicios que ofreces de manera facil y sencilla.
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
}
