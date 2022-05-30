import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./styles/AllRegister.module.css";

export default function AllRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState("");

  //falta validaciones de formulario.

  function onSubmit(e) {
    let userCreate;

    console.log("está saliendo el post ", userCreate);

    e.preventDefault();

    if (name && email && password && type) {
      userCreate = {
        name: name,
        username: email,
        password: password,
        type: type,
      };

      console.log("está saliendo el post ", userCreate);

      axios
        .post("http://localhost:3001/api/register", userCreate)
        .then((res) => {
          console.log(res.data, "-> respuesta del post de creación de cuenta");

          if (res.data._id) {
            setName("");
            setEmail("");
            setPassword("");
            setError("");

            window.alert("Usuario creado con éxito");
            return (window.location = "http://localhost:3000/login");
          }
          if (typeof res.data === "string") {
            setName("");
            setEmail("");
            setPassword("");
            setError(res.data);

            window.alert(res.data);
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
                value={name}
                className={styles.loginInput}
                placeholder="Nombre"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.loginField}>
              <input
                type="email"
                value={email}
                name="email"
                className={styles.loginInput}
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.loginRield}>
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
            <div className={styles.loginRield}>
              <select
                name="select"
                onChange={(e) =>
                  e.target.value === "Tipo de cliente"
                    ? null
                    : setType(e.target.value)
                }
              >
                <option value="Tipo de cliente">Tipo de cliente</option>
                <option value="user">Usuario Final</option>
                <option value="partner">Cliente Empresa</option>
                <option value="admin">Administrador</option>
                {/* Quitar más adelante la opción Administrador*/}
              </select>
            </div>
            <input
              className={styles.loginSubmit}
              type="submit"
              value="Registrarse"
              onClick={(e) => onSubmit(e)}
            />
            <h3>{error ? error : null}</h3>
            <div></div>
          </form>
        </div>
        {/* screen background */}
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
