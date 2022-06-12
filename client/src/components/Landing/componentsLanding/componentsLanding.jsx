import React from "react";
import styles from "../styles/Landing.module.css";

//? ESTE ES MI CARD DEL PACK BALANCE CARE
export const CardPromoBalance = () => {
  return (
    <div className={styles.promoBalance}>
      <h2 className={styles.balanceTitulo}>Pack Balance Care</h2>
      <ul className={styles.balanceLista}>
        <li>
          <span>&bull;</span>Planes de dieta
        </li>
        <li>
          <span>&bull;</span>Clases de gimnasia indoor
        </li>
        <li>
          <span>&bull;</span>Entrenamiento de pesas y maquinas
        </li>
        <li>
          <span>&bull;</span>Entrenamiento de artes marciales
        </li>
      </ul>
      <h2>$6000/mensual</h2>
    </div>
  );
};

//? ESTE ES MI CARD DEL PACK PRO BULK
export const CardPromoBulk = () => {
  return (
    <div className={styles.promoBulk}>
      <h2 className={styles.bulkTitulo}>Pack Pro Bulk</h2>
      <ul className={styles.bulkLista}>
        <li>
          <span>&bull;</span>Pack Balance Care +
        </li>
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
  );
};
