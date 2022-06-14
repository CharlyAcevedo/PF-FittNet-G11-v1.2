import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SweetAlrt } from "../../asets/helpers/sweetalert";
import style from "./styles/stylePasword.module.css";
import { InputPrymary, InputSecond } from "../../helpers/Inputs/Inputs";
import {
  BackgroundTwo,
  BackgroundOne,
} from "../../helpers/Backround/Background";

// Esta es la ruta del back que podemos usar
// router.post('/updatepassword', async (req, res, next) => {
// if (userId && newPassword && password && !secretToken) { // Actualizo una vieja contraseña
// if (userId && newPassword && !password && secretToken) { // Seteo un nueva contraseña
// if (userId && !newPassword && !password && !secretToken) { // Reinicio la contraseña

// Voy a entrar en el primer if de arriba
// Esto es lo que le voy a envíar desde el front
// let form = {
//   userId: userId,
//   password: password,
//   newPassword: newPassword
// }
export default function UpdatePasword() {
  // Esta función sirve para cuando alguien quiere actualizar su contraseña.
  let { userId } = useParams();

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [copyNewPassword, setCopyNewPassword] = useState("");
  // const [error, setError] = useState("");

  // Falta setear errores según la validación que queramos
  function onSubmit(e) {
    e.preventDefault();
    if (userId && password && newPassword && copyNewPassword) {
      // if ( userId && password && newPassword && copyNewPassword && !error) {
      if (newPassword === copyNewPassword && newPassword !== password) {
        let formUpdate = {
          userId: userId,
          password: password,
          newPassword: newPassword,
        };
        // Enviar formulario luego de esta línea
        console.log(formUpdate, "se envía el formulario");

        axios
          .post("/api/service/updatepassword", formUpdate)
          .then((response) => {
            console.log(response.data);
            // window.alert(response.data)
            SweetAlrt("Exito!", response.data, "success", true);
            return (window.location = "http://localhost:3000/login");
          })
          .catch((error) => {
            console.log(error);
          });

        // Acá iría la petición con axios donde se manda el form a la ruta de actualización
        // window.alert('Contraseña actualizada')
        // return (window.location = "http://localhost:3000/login");
      } else {
        SweetAlrt(
          "Atencion",
          "Verifique los datos del formulario",
          "warning",
          true
        );
        // window.alert("Verifique los datos del formulario");
      }
    } else {
      SweetAlrt(
        "Atencion",
        "Verigique los datos del formulario",
        "error",
        true
      );
      // window.alert("Verifique los datos del formulario");
      //setError("Verifique los datos del formulario");
    }
  }

  return (
    <div className={style.container}>
      <div className={style.screen}>
        <div className={style.screenContent}>
          <form className={style.login}>
            {/* Bloque inputs */}
            <InputPrymary
              type="password"
              value={password}
              name="password"
              placeholder="Old password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <InputPrymary
              type="password"
              value={newPassword}
              name="passwnewPasswordord"
              placeholder="New password"
              required
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <InputPrymary
              type="password"
              value={copyNewPassword}
              name="copyNnewPassword"
              placeholder="New password"
              required
              onChange={(e) => setCopyNewPassword(e.target.value)}
            />
            {/* Bloque button */}
            <InputSecond
              type="submit"
              value="Confirmar"
              onClick={(e) => onSubmit(e)}
            />
          </form>
          {/* Bloque de background */}
        </div>
        <BackgroundTwo />
      </div>
      <BackgroundOne />
    </div>
  );
}
