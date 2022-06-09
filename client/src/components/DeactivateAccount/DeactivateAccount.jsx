import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { SweetAlrt } from "../../asets/helpers/sweetalert";
import {
  BackgroundOne,
  BackgroundTwo,
} from "../../helpers/Backround/Background";
import { InputPrymary, InputSecond } from "../../helpers/Inputs/Inputs";
import style from "./styles/styleDesactive.module.css";

export default function DeactivateAccount() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { userId } = useParams();

  function onChange(e) {
    setPassword(e.target.value);

    if (password.length < 2) {
      // Regex que quramos
      setError(
        "Necesita introducir su contraseña para continuar con el proceso"
      );
    } else {
      setError("");
    }
  }

  function onSubmit(e) {
    e.preventDefault();

    if (userId.length > 3 && password && !error) {
      let object = { userId, password };

      console.log(object, "lo que sale el get al back");

      axios
        .put(`/api/service/deleteuseraccount/`, object)
        .then((response) => {
          console.log(response.data);
          SweetAlrt("Exito!", response.data, "success");
          // window.alert(response.data)
          return (window.location = "http://localhost:3000/");
        })
        .catch((error) => {
          console.lgo(error);
        });
      setPassword(""); // limpio el estado
    }
  }

  return (
    <div className={style.container}>
      <div className={style.screen}>
        <div className={style.screenContent}>
          <form className={style.login}>
            <div className={style.texto}>
              <p>
                Para borrar su cuenta por favor introdusca su contraseña y dé
                click en confirmar.
              </p>
            </div>
            <div className={style.contInput}>
              <InputPrymary
                type="password"
                value={password}
                name="password"
                placeholder="Password"
                required
                onChange={(e) => onChange(e)}
              />
              {/* Bloque button */}
              <InputSecond
                type="submit"
                value="Confirmar"
                onClick={(e) => onSubmit(e)}
              />
            </div>
            {error ? (
              <div className={style.errors}>
                <h3>{error}</h3>
              </div>
            ) : null}
          </form>
          {/* Bloque de background */}
        </div>
        <BackgroundTwo />
      </div>
      <BackgroundOne />
    </div>
  );
}
