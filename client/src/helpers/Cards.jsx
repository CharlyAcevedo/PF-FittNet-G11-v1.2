import React from "react";

import styles from "./styles/stylesHelpers.module.css";

export const CardPromocionPrimaria = (props) => {
  const { border, color, boxShadow } = props;

  return (
    <div className={styles.containerCardPromoPrimaria}>
      <div>
        <p>
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </p>
      </div>
    </div>
  );
};
