import React from "react";
import style from "./styles/styleCard.module.css";
export default function CardServices(props) {
  const {img, name, unidad, price,title} = props
  const imgeFond = []
  if(name && !img) imgeFond=name[0]

  if(title == "true"){
    return (
      <div className={style.content}>
        <div className={style.card}>
          <dir className={style.contImg}>
            <p>imgen</p>
          </dir>
          <dir className={style.contText}>
            <p>Servicio</p>
          </dir>
          <dir className={style.contUnid}>
            <p>Unidad</p>
          </dir>
          <dir className={style.contPrice}>
            <p>Precio</p>
          </dir>
        </div>
      </div>
    );
  }

  return (
    <div className={style.content}>
      <div className={style.card}>
        <dir className={style.contImg}>
          <p>{img}</p>
        </dir>
        <dir className={style.contText}>
          <p>{name}</p>
        </dir>
        <dir className={style.contUnid}>
          <p>{unidad}</p>
        </dir>
        <dir className={style.contPrice}>
          <p>{price}</p>
        </dir>
      </div>
    </div>
  );
}
