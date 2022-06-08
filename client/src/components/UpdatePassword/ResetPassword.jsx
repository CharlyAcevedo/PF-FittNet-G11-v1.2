import React from "react";
import { useState } from "react";
import axios from "axios";
import { SweetAlrt, SweetAlrtTem } from "../../asets/helpers/sweetalert";
import {
  BackgroundOne,
  BackgroundTwo,
} from "../../helpers/Backround/Background";
import { InputPrymary, InputSecond } from "../../helpers/Inputs/Inputs";
import style from "./styles/stylePasword.module.css";

// Esta es la ruta del back que podemos usar
// router.post('/updatepassword', async (req, res, next) => {
// if (userId && newPassword && oldPassword && !secretToken) { // Actualizo una vieja contraseña
// if (userId && newPassword && !oldPassword && secretToken) { // Seteo un nueva contraseña
// if (userId && !newPassword && !oldPassword && !secretToken) { // Reinicio la contraseña

// 1 Me pasa el userName en el formulario (email)
// 2 Le envío un secret token a su correo electrónico
// 4 El back me tiene que devolver el userId del usuario

// 5 Armo un objeto con el userId, la newPassword y el token
// 6 Verifico tener los dos datos anteriores más validation (estado)
// 7 Mando el put al back y tengo que recibir un mensaje de confirmación o rechazo
// 8 Redirijo al usuario a login
//---------------------------------------------------------------------
// Esto es lo que le voy a envíar desde el front

// 1ra llamada al back (voy a entrar en el tercer if de arriba)
// le envío --> obj1 = {userName: userName}
// El back responde enviandome el userId de usuario al front
// y además me envia un correo con un secretToken

// 2da llamda al back (voy a entrar en el segundo if de arriba)
// let obj2 = {userId: userId, newPassword: newPassword, secretToken: secretToken}
// Me responde con un mensaje de confirmación

export default function ResetPassword() {
  // Esta función sirve para cuando alguien quiere recuperar una contraseña que olvidó.
  // Pienso envíar una solicitud directamente al back (ver bien a qué ruta), y luego
  // evaluar su respueta para setear la validación (setValidatio), y cuando la tenga paso al
  // segundo renderizado if(validation) que me va a permitir armar un form para
  // el back. Y en el proximo llamado al back setearía una nueva contraseña.
  // También necesito controlar los formularios e ir seteando errores y mostrarlos.
  // Fernando.

  const [userName, setuserName] = useState("");
  const [secretToken, setSecretToken] = useState("");
  const [validation, setValidation] = useState(false); // La tengo si el usuario confima el
  // electrónico que le vamos a enviar a su casilla de correo
  const [userId, setUserId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [copyNewPassword, setCopyNewPassword] = useState("");
  const [error, setError] = useState("");

  function onSubmit(e) {
    e.preventDefault();

    if (!error && userName && !newPassword && !copyNewPassword) {
      let object = { userName: userName };
      console.log(
        "envío el objeto al back la solicitud al back para enviar el correo electrónico"
      );
      axios
        .get("/api/service/updatepassword", { params: object })
        .then((response) => {
          if (response.data.message) {
            return SweetAlrt("Atencion", response.data.message, "warning");

            // return window.alert(response.data.message)
          }
          setUserId(response.data);
          setValidation(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setError("Campos incompletos");
    }
  }

  function onSubmitForm(e) {
    e.preventDefault();
    if (!error && userId && newPassword && copyNewPassword) {
      if (newPassword === copyNewPassword) {
        let form = {
          userId: userId,
          newPassword: newPassword,
          secretToken: secretToken,
        };
        console.log(
          form,
          "Tengo que enviar el formulario al back para el cambio de clave"
        );
        axios
          .post("/api/service/updatepassword", form)
          .then((response) => {
            console.log(response.data);
            // window.alert(response.data)
            SweetAlrt("Exito", response.data, "info");
            return (window.location = "http://localhost:3000/login");
          })
          .catch((error) => {
            console.log(error);
          });

        // window.alert('Contraseña cambiada, vuelva a iniciar sesión');
        // return (window.location = "http://localhost:3000/login");
      }
    } else {
      SweetAlrtTem(
        "No puede envar al solicitud, por favor verigique los valores de los campos requeridos",
        "warning"
      );
      // window.alert("No puede enviar la solicitud, por favor verifique los valores de los campos requeridos")
    }
  }

  if (validation === false) {
    return (
      <div className={style.container}>
        <div className={style.screen}>
          <div className={style.screenContent}>
            <form className={style.login}>
              <div className={style.texto}>
                <p>1º Indique su email y luego haga click en "Enviar"</p>
                <p>
                  2º Luego verifique su correo y confime el mensaje para
                  continuar
                </p>
              </div>
              <div className={style.contInput}>
                <InputPrymary
                  type="email"
                  value={userName}
                  name="email"
                  placeholder="Email"
                  required
                  onChange={(e) => setuserName(e.target.value)}
                />

                {/* Bloque button */}
                <InputSecond
                  type="submit"
                  value="Enviar"
                  onClick={(e) => onSubmit(e)}
                />
              </div>
              <h6>{error ? error : null}</h6>
            </form>
            {/* Bloque de background */}
          </div>
          <BackgroundTwo />
        </div>
        <BackgroundOne />
      </div>
    );
  }

  if (validation === true) {
    return (
      <div className={style.container}>
        <div className={style.screen}>
          <div className={style.screenContent}>
            <form className={style.login}>
              <div className={style.texto}>
                <p>
                  Hemos enviado a su correo un secretToken de seguridad para que
                  pueda validar su identidad
                </p>
              </div>
              <div className={style.contInput}>
                <InputPrymary
                  type="text"
                  value={secretToken}
                  name="secretToken"
                  placeholder="Token de seguridad"
                  required
                  onChange={(e) => setSecretToken(e.target.value)}
                />
                <InputPrymary
                  type="password"
                  value={newPassword}
                  name="newPassword"
                  placeholder="New Password"
                  required
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <InputPrymary
                  type="password"
                  value={copyNewPassword}
                  name="newPassword"
                  placeholder="New Password"
                  required
                  onChange={(e) => setCopyNewPassword(e.target.value)}
                />

                {/* Bloque button */}
                <InputSecond
                  type="submit"
                  value="Confirmar"
                  onClick={(e) => onSubmitForm(e)}
                />
              </div>
              {/* <input
                type="text"
                value={secretToken}
                name="secretToken"
                placeholder="Token de seguridad"
                required
                onChange={(e) => setSecretToken(e.target.value)}
              /> */}
              
            </form>
            
            <h3>erores: {error ? error : null}</h3>
            <br />
            {/* <h6 style={{ color: "#fff" }}>
              llegó el userId: {userId ? userId : null}
            </h6> */}

            {/* Bloque de background */}
          </div>
          <BackgroundTwo />
        </div>
        <BackgroundOne />
      </div>
    );
  }
}
