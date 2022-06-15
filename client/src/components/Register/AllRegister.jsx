import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserGeo } from "../../redux/actions/index";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./styles/AllRegister.module.css";
import { regexEmail, regexName } from "../../asets/helpers/regexValidators"

import {
  BackgroundTwo,
  BackgroundOne,
} from "../../helpers/Backround/Background";
import { SweetAlrt, SweetAlrt2, SweetAlrtTem } from "../../asets/helpers/sweetalert";

export default function AllRegister() {
  const dispatch = useDispatch();
  const geolocation = useSelector(
    (state) => state.currentUserDetails.currentGeo
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [geoloc, setGeoloc] = useState({
    lat: 0,
    lng: 0,
  });
  const [error, setError] = useState("");
  // const [disableSubmit, setDisableSubmit] = useState(true)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const payload = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        dispatch(setUserGeo(payload));
        setGeoloc({
          lat: position.coords.latitude ? position.coords.latitude : geolocation.latitude,
          lng: position.coords.longitude ? position.coords.longitude : geolocation.longitude,
        });
      },
      function (error) {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
      }
    ); // eslint-disable-next-line
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    let userCreate;

    console.log("está saliendo el post ", userCreate);

    //---------------------------------------------------------------------
    // La validación de los campos la hace la función validadora
    // llamada desde cada input. Luego si tengo todos los campos completos
    // y no tengo errores(seteados por la función validadora), entonces
    // creo el objeto y hago el post al back.
    //--------------------------------------------------------------------
    if (error === "" && name && email && password && type) {
      userCreate = {
        name: name,
        username: email,
        password: password,
        latitude: geoloc.lat,
        longitude: geoloc.lng,
        type: type,
      };

      SweetAlrt("Estamos procesando su solicitud!")
      console.log("está saliendo el post ", userCreate);

      axios
        .post("/api/service/register", userCreate)
        .then((res) => {
          console.log(res.data, "-> respuesta del post de creación de cuenta");
          // El nombre de usuario ya existe o es incorrecto, por favor indique otro username
          //
          if (res.data.created === true) {
            setName("");
            setPassword("");
            setError("");
            setEmail("");
            SweetAlrt("Exito!", res.data.message, "success");
            // window.alert(res.data.message);
            return (window.location = "http://localhost:3000/login");
          }
          if (res.data.created === false) {
            // window.alert(res.data.message);
            SweetAlrt("Atencion!", res.data.message, "warning");
            setName("");
            setPassword("");
            setError("");
            setEmail("");
          }
          if (typeof res.data === 'string') {
            SweetAlrt(res.data);
          }
        })
        .catch((error) => console.log(error));
    }
    if (!name || !email || !password || !type) {
      SweetAlrtTem("Por favor complete todos los campos","warning")
      // window.alert('Por favor complete todos los campos')
    }
  }

  function onChangeName(e) {
    setName(e.target.value);
    if (name.length < 3) {
      setError("El nombre es requerido");
    } else if (!regexName.test(name)) {
      setError("El nombre debe contener letras");
    } else {
      setError("");
    }
  }

  function onChangeEmail(e) {
    setEmail(e.target.value);
    if (email.length < 3) {
      setError("El Email es requerido");
    } else if (!regexEmail.test(email)) {
      setError("Email invalido");
    } else {
      setError("");
    }
  }

  function onChangePassword(e) {
    setPassword(e.target.value);
    if (password.length < 2) {
      setError("Necesita introducir una contraseña");
    } else if (password.length < 3) {
      setError("La constraseña debe tener un mínimo de tres caracteres");
    } else {
      setError("Recuerde seleccionar el tipo de usuario");
    }
  }

  function onChangeType(e) {
    setType(e.target.value);

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
                value={name}
                className={styles.loginInput}
                placeholder="Escriba su Nombre..."
                required
                onChange={(e) => onChangeName(e)}
                onClick={(e) => onChangeName(e)}
              />
            </div>
            <div className={styles.loginField}>
              <input
                type="email"
                value={email}
                name="email"
                className={styles.loginInput}
                placeholder="Escriba un e-mail valido..."
                required
                onChange={(e) => onChangeEmail(e)}
                onClick={(e) => onChangeEmail(e)}
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
                onChange={(e) => onChangePassword(e)}
                onClick={(e) => onChangePassword(e)}
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
                <option value="admin">Administrador</option>
                {/* Quitar más adelante la opción Administrador*/}
              </select>
            </div>
            <input
              className={styles.loginSubmit}
              type="submit"
              value="Registrarse"
              // disabled={disableSubmit}
              onClick={(e) => onSubmit(e)}
            />
            <br />
            <br />
            {/* <h5 className={error ? styles.alerText : null}>{error ? error : null}</h5> */}
            <p>{error ? error : null}</p>
            <div></div>
          </form>
        </div>
        <BackgroundTwo />
      </div>
      <BackgroundOne />
    </div>
  );
}
