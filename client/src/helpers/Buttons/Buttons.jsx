import React from "react";
import styles from "./styles/stylesButtons.module.css";

//? Boton primario - es el boton principal con el tamaño normal
export const ButtonPrimary = (props) => {
  const { onClick, title, padding } = props;

  return (
    <div
      onClick={onClick}
      className={styles.btnPrimario}
      style={{ padding: padding }}
    >
      {title}
    </div>
  );
};

export const ButtonSimple = (props) => {
  const { onClick, title, padding } = props;
  return (
    <div
      onClick={onClick}
      className={styles.btnSimple}
      style={{ padding: padding }}
    >
      {title}
    </div>
  );
};

//? Boton primario pero version mas chica - es el boton principal pero con un tamaño mas chico
export const ButtonPrimarySmall = (props) => {
  const { onClick, title, padding } = props;
  return (
    <div
      onClick={onClick}
      className={styles.btnPrimarioSmall}
      styles={{ padding: padding }}
    >
      {title}
    </div>
  );
};

//? Boton secundario

export const ButtonSecondarySimple = (props) => {
  const { onClick, title, padding } = props;
  return (
    <div
      onClick={onClick}
      className={styles.btnSecondarioSimple}
      style={{ padding: padding }}
    >
      {title}
    </div>
  );
};

export const ButtonBack = (props) => {
  const { onClick, title, padding } = props;

  return (
    <div
      onClick={onClick}
      style={{ padding: padding }}
      className={styles.btnBack}
    >
      {title}
    </div>
  );
};

export const ButtonSecondaryDeslice = (props) => {
  const { onClick, title, padding } = props;

  return (
    <div
      onClick={onClick}
      style={{ padding: padding }}
      className={styles.btnDeslice}
    >
      <span>{title}</span>
    </div>
  );
};

export const ButtonDetailGym = (props) => {
  const {onClick, title, padding } = props;

  return (
    <div onClick={onClick} style={{padding: padding}} className={styles.btnDetailGym}>
      {title}
    </div>
  )
}

export const ButtonHomePA = (props) => {
  const {onClick, title, padding } = props;

  return (
    <div className={styles.btnHomePA} onClick={onClick} style={{padding: padding}} >
      {title}
    </div>
  )
}

