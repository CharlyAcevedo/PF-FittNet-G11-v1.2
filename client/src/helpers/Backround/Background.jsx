import React from "react";
import styles from "./styles/stylesBackground.module.css";

export const BackgroundOne = () => {
  return (
    <div className={styles.area}>
      <ul className={styles.circles}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};

export const BackgroundTwo = () => {
  return (
    <div className={styles.screenBackground}>
      <span className={styles.shape4}></span>
      <span className={styles.shape3}></span>
      <span className={styles.shape2}></span>
      <span className={styles.shape1}></span>
    </div>
  );
};
