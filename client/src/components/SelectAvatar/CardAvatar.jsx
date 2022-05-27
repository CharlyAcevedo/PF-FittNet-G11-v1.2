import React from "react";

import styles from "./styles/avatar.module.css";

export const CardAvatar = (props) => {
  const { name, image, features } = props;
  return (
    <div className={styles.containerCardAvatar}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <div
            style={{ backgroundImage: `url(${image})` }}
            className={styles.cardFront}
          >
            <h3 className={styles.cardTitle}>{name}</h3>
          </div>

          <div className={styles.cardBack}>
            <h2>Caracteristicas</h2>
            <ul>
              {features?.map((x, y) => (
                <li className={styles.listFeaturesAvatar} key={y}>
                  {x}
                </li>
              ))}
            </ul>
            <button className={styles.btnSelectAvatar}>Seleccionar</button>
          </div>
        </div>
      </div>
    </div>
  );
};
