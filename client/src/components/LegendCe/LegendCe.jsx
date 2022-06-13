import React from "react";
import style from "./styles/LegendCe.module.css";
import Slider from "../Slider/Slider";
import CardPlans from "../CardPlans/CardPlans";

export default function LegendCe() {
  return (
    <div className={style.container}>
      <div className={style.contTitle}>
      Nuestro propósito es facilitar el acceso a la práctica de actividad
          física de alta calidad, al mismo tiempo brindar una manera fácil y
          segura de acercar la tecnología a los procesos administrativos.
          Generamos contenido publicitario exitoso, enfocado a las necesidades
          de los usuarios, de esta manera logramos expandir la cartera de
          nuestros clientes, multiplicando sus ingresos!
      </div>

      <div className={style.contInfo}>
        <div className={style.legend}>
          <div className={style.card}>
            <CardPlans />
          </div>
        </div>

        <div className={style.containerPack}>
          <div className={style.sliderCard}>
            <Slider />
          </div>
        </div>
      </div>
    </div>
  );
}
