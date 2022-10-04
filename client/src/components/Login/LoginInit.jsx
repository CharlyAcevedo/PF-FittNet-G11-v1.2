import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserGeo } from "../../redux/actions/index";
import styles from "./styles/LoginInit.module.css";
import {
  BackgroundTwo,
  BackgroundOne,
} from "../../helpers/Backround/Background";
import { InputPrymary, InputSecond } from "../../helpers/Inputs/Inputs";

import { useLoginGoogle } from "../../hooks/useLoginGoogle"
import { useLogin } from "../../hooks/useLogin"
import { useGeo } from "../../hooks/useGeo";

export default function LoginInit() {
  const dispatch = useDispatch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        let geoPayload = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        dispatch(setUserGeo(geoPayload));
      },
      function (error) {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
      }
    ); // eslint-disable-next-line
  }, []);

  // custom hook -> realiza el login por google como asi tambien el almacena ese token recibido por google
  const { handleCallbackGoogle } = useLoginGoogle();

  // custom hook -> capta la geolocalizacion para mostrar que gimnasios hay alrededor de tu ubicacion
  const { latitude, longitude } = useGeo();

  // custom hook -> realiza toda la funcion del login del usuario
  const { onSubmit, error, setUsername, username, setPassword, password } = useLogin();

  console.log('estas son mis latitudes y longitudes', `${latitude}, ${longitude}`);
  
  return (
    <div className={styles.container}>
      <div className={styles.screen}>
        <div className={styles.screenContent}>
          <div className={styles.sign}>
            <div className={styles.contentHeading}>
              <Link to="/">
                <div className={styles.containerBtn}>
                  <div className={styles.logoContainer}></div>
                </div>
              </Link>
              <div className={styles.containerReg}>
                <a href="/register" style={{ textDecoration: "none" }}>
                  Crear cuenta
                </a>
              </div>
            </div>
          </div>
          <form className={styles.login}>
            <InputPrymary
              type="email"
              value={username}
              name="email"
              placeholder="Email"
              required
              onChange={(e) => setUsername(e.target.value)}
            />

            <InputPrymary
              type="password"
              value={password}
              name="password"
              placeholder="Contraseña"
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <InputSecond
              type="submit"
              value="Ingresar"
              onClick={(e) => onSubmit(e)}
            />

            <div id="signInDiv" style={{ paddingTop: "1.5rem" }}></div>
            {/* <button onClick={(e) => handleLogoutGoogle(e)}>Logout</button> */}
            <div className={styles.contraseña}>
              <a href="/resetpassword" style={{ color: "#111111" }}>
                Olvidé mi contraseña
              </a>
            </div>
            <p>
              {error === "" ? null : (
                <div className={styles.errors}>
                  <h3>{error}</h3>
                </div>
              )}
            </p>
          </form>
        </div>
        <BackgroundTwo />
      </div>
      <BackgroundOne />
    </div>
  );
}
