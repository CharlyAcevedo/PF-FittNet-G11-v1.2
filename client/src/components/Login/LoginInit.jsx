import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles/LoginInit.module.css";

export default function LoginInit() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function onSubmit(e) {
    let userLogin;

    console.log("está saliendo el post ", userLogin);

    e.preventDefault();

    if (username && password) {
      userLogin = { username: username, password: password };

      console.log("está saliendo el post ", userLogin);

      axios
        .post("http://localhost:3001/api/login", userLogin)
        .then((res) => {
          console.log(res.data, "-> viendo qué respondio el post");

          if (res.data.login) {
            console.log(
              res.data,
              " lo que responde el back si se autentica el user"
            );
            let { userId, name, type, avatar } = res.data;

            if (typeof avatar === "string") {
              return (window.location = `http://localhost:3000/home/${type}/${name}/${userId}/${avatar}`);
            }
            // ya le paso info por params de quién estamos hablando
            return (window.location = `http://localhost:3000/home/${type}/${name}/${userId}`);
          }
          if (typeof res.data === "string") {
            setError("usuario o password incorrecta");
            setPassword("");
            setUsername("");
          }
        })
        .catch((error) => console.log(error));
    }
  }

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
            <div className={styles.loginField}>
              <input
                type="email"
                value={username}
                name="email"
                className={styles.loginInput}
                placeholder="Email"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="login_field">
              <input
                type="password"
                value={password}
                name="password"
                className={styles.loginInput}
                placeholder="Contraseña"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <h3>{error === "" ? null : error}</h3>

            <input
              className={styles.loginSubmit}

              type="submit"
              value="Ingresar"
              onClick={(e) => onSubmit(e)}
            />
          </form>
        </div>
        <div className={`${styles.screenBackground}`}>
          <span className={styles.shape4}></span>
          <span className={styles.shape3}></span>
          <span className={styles.shape2}></span>
          <span className={styles.shape1}></span>
        </div>
      </div>
    </div>
  );
}
