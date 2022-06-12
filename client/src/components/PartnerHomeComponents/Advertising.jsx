import React from 'react'
import styles from "./styles/Advertising.module.css";

export default function Advertising() {
  return (
    <div className={styles.mainContainerAdv}>
        <h3>Lo que Fittnet tiene para tí este mes</h3>
        <div className={styles.pictureContainer}>
            <div className={styles.firstPromo}>
            <div className={styles.firstPromoInside}>Consigue 20 usuarios nuevos en cada uno de tus Gyms y te regalamos una playera conmemorativa para cada entrenador</div>
            </div>
            <div className={styles.secondPromo}>
            <div className={styles.secondPromoInside}>Gana el concurso de la promo del mes y te regalamos 3 meses de suscripcion</div>
            </div>
        </div>
    </div>
  )
}
