import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles/AllRegister.module.css";
import { regexEmail, regexName } from "../../asets/helpers/regexValidators";

import { useGeo } from "../../hooks/useGeo";
import { useCampos } from "../../hooks/useCampos";
import { useRegister } from "../../hooks/useRegister";

import {
  BackgroundTwo,
  BackgroundOne,
} from "../../helpers/Backround/Background";


export default function AllRegister() {
  const [error, setError] = useState("");

  const campos = useCampos();

  const { latitude, longitude } = useGeo();

  const { onSubmit } = useRegister(latitude, longitude, campos, error, setError);

  function onChangeName(e) {
    campos.setName(e.target.value);
    if (campos.name.length < 3) {
      setError("El nombre es requerido");
    } else if (!regexName.test(campos.name)) {
      setError("El nombre debe contener letras");
    } else {
      setError("");
    }
  }

  function onChangeEmail(e) {
    campos.setEmail(e.target.value);
    if (campos.email.length < 3) {
      setError("El Email es requerido");
    } else if (!regexEmail.test(campos.email)) {
      setError("Email invalido");
    } else {
      setError("");
    }
  }

  function onChangePassword(e) {
    campos.setPassword(e.target.value);
    if (campos.password.length < 2) {
      setError("Necesita introducir una contraseña");
    } else if (campos.password.length < 3) {
      setError("La constraseña debe tener un mínimo de tres caracteres");
    } else {
      setError("Recuerde seleccionar el tipo de usuario");
    }
  }

  function onChangeType(e) {
    campos.setType(e.target.value);

    setError("");
  }

  return (
    <div className={styles.container}>
      <div className={styles.screen}>
        <div className={styles.screenContent}>
          <div className={styles.sign}>
            {/* button navBar */}
            <div className={styles.contentHeading}>
              <Link to="/">
                <div className={styles.containerBtn}>
                  <div className={styles.logoContainer}></div>
                </div>
              </Link>
              <div className={styles.containerReg}>
                <a href="/login" style={{ textDecoration: "none" }}>
                  Iniciar sesion
                </a>
              </div>
            </div>

            {/* Form register */}
          </div>
          <form className={styles.login}>
            <div className={styles.loginRield}>
              <input
                type="text"
                name="name"
                value={campos.name}
                className={styles.loginInput}
                placeholder="Escriba su Nombre..."
                required
                onChange={onChangeName}
                onClick={onChangeName}
              />
            </div>
            <div className={styles.loginField}>
              <input
                type="email"
                value={campos.email}
                name="email"
                className={styles.loginInput}
                placeholder="Escriba un e-mail valido..."
                required
                onChange={onChangeEmail}
                onClick={onChangeEmail}
              />
            </div>
            <div className={styles.loginRield}>
              <input
                type="password"
                value={campos.password}
                name="password"
                className={styles.loginInput}
                placeholder="Contraseña"
                required
                onChange={onChangePassword}
                onClick={onChangePassword}
              />
            </div>
            <br />
            <div className={styles.loginRield}>
              <select
                name="select"
                className={styles.selectTypeClient}
                onChange={(e) =>
                  e.target.value === "Tipo de cliente" ? null : onChangeType(e)
                }
              >
                <option value="Tipo de cliente">Tipo de cliente</option>
                <option value="user">Usuario Final</option>
                <option value="partner">Cliente Empresa</option>
                {/* <option value="admin">Administrador</option> */}
                {/* Quitar más adelante la opción Administrador*/}
              </select>
            </div>
            <input
              className={styles.loginSubmit}
              type="submit"
              value="Registrarse"
              onClick={(e) => onSubmit(e)}
            />
            <br />
            <br />
            {/* <h5 className={error ? styles.alerText : null}>{error ? error : null}</h5> */}
            <p>
              {error === "" ? null : (
                <div className={styles.errors}>
                  <h3>{error}</h3>
                </div>
              )}
            </p>
            <div></div>
          </form>
        </div>
        <BackgroundTwo />
      </div>
      <BackgroundOne />
    </div>
  );
}
