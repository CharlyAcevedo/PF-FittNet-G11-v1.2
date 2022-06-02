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

  //! Regex de validacion
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?#&/|:;,<>+~-])([A-Za-z\d$@$!%*?#&/|:;,<>+~-]|[^ ]){8,15}$/;
  // Minimo 8 caracteres
  //Maximo 15 caracteres
  // Al menos una letra mayúscula
  //  Al menos una letra minucula
  //  Al menos un dígito
  //   No espacios en blanco
  //   Al menos 1 caracter especial
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexName = /^[A-Z]+$/i;
  //--------------------------------------------

  function onSubmit(e) {
    let userCreate;

    console.log("está saliendo el post ", userCreate);

    e.preventDefault();
    //------------------------
    //Validamos los input antes de realizar el post,
    //se validan los campos completos y caracteristicas puntuales de los mismos.
    if (!name) {
      return alert("El nombre es requerido");
    } else if (!regexName.test(name)) {
      return alert("El nombre es invalido");
    } else if (!email) {
      return alert("El Email es requerido");
    } else if (!regexEmail.test(email)) {
      return alert("Email invalido");
    } else if (!password) {
      return alert("Password requerida");
    } else if (!regexPassword.test(password)) {
      return alert(
        "Contraseña invalida:Minimo 8 caracteres, Maximo 15, Al menos una letra mayuscula, una letra minuscula, un digito, sin espacios en blanco, Al menos un caracter esoecial"
      );
    } else if (!type) {
      return alert("Debes seleccionar el tipo de cliente!");
    }
    //----------------------
    else {
      userCreate = {
        name: name,
        username: email,
        password: password,
        type: type,
      };

      console.log("está saliendo el post ", userCreate);

      axios
        .post("/api/register", userCreate)
        .then((res) => {
          console.log(res.data, "-> respuesta del post de creación de cuenta");
          // El nombre de usuario ya existe o es incorrecto, por favor indique otro username
          // 
          if (res.data.created === true) {
            setName("");
            setPassword("");
            setError("");
            setEmail("");
            
            window.alert(res.data.message);
            return (window.location = "http://localhost:3000/login");
          }
          if (res.data.created === false) {
            window.alert(res.data.message);
            setName("");
            setPassword("");
            setError("");
            setEmail("")
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
