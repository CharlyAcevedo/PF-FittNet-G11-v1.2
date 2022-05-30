import React from "react";
import { useParams } from "react-router-dom";

import styles from "./styles/avatar.module.css";

export const CardAvatar = (props) => {
  const { id, avName, image, features } = props;
  let { userId , name, type } = useParams();

  function handleOnClick(e){
    return  window.location = `http://localhost:3000/home/${type}/${name}/${userId}/${id}`
  }

  return (
    <div className={styles.containerCardAvatar}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <div
            style={{ backgroundImage: `url(${image})` }}
            className={styles.cardFront}
          >
            <h3 className={styles.cardTitle}>{avName}</h3>
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
            <button className={styles.btnSelectAvatar} onClick={handleOnClick}>Seleccionar</button>
          </div>
        </div>
      </div>
    </div>
  );
};
