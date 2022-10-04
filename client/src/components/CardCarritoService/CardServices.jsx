import React from "react";
import style from "./styles/styleCard.module.css";
export default function CardServices(props) {
  const { img, name, unidad, price, title } = props;

  if (title === "true") {
    return (
      <div className={style.content}>
        <div className={style.contTitle}>
          <div>
            <p></p>
          </div>
          <div className={style.contText}>
            <p>SERVICIOS</p>
          </div>
          <div className={style.contUnid}>
            <p>UNIDADES</p>
          </div>
          <div className={style.contPrice}>
            <p>PRECIO</p>
          </div>
        </div>
      </div>
    );
  }

  if (title === "false" && unidad > 0) {
    return (
      <div className={style.content}>
        <div className={style.card}>
          <div className={style.contImg}>
            <img src={img} alt="" style={{ width: "60px", height: "60px",borderRadius:"50%"}}/>
          </div>
          <div className={style.contText}>
            <p>{name}</p>
          </div>
          <div className={style.contUnid}>
            <p>{unidad}</p>
          </div>
          <div className={style.contPrice}>
            <p>${price}</p>
          </div>
        </div>
      </div>
    );
  }
  if (title === "false" && unidad <= 0) {
    return (
      <div>
      </div>
    );
  }
}
