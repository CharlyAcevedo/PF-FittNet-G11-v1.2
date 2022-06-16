import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import { getLockAccounts } from "../../../../redux/actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { SweetAlrt, SweetAlrtTem } from "../../../../asets/helpers/sweetalert";
import styles from "../styles/style.module.css";

const { regexEmail } = require("../../../../asets/helpers/regexValidators");

// Necesito un form con un input, un botón de agregar y otro de quitar
// Necesito una lista los correos baneados

export default function BlockAccount() {
  const lockAccounts = useSelector((state) => state.lockAccounts);
  const dispatch = useDispatch();

  let [userName, setUserName] = useState("");
  let [error, setError] = useState("");
  let [submit, setSubmit] = useState(true);

  useEffect(() => {
    dispatch(getLockAccounts());
    setSubmit(false);
  }, [submit]);

  async function addLockAccount(e) {
    e.preventDefault();
    if (userName && !error) {
      console.log("trato de agregar la cuenta", userName);
      // le paso la solicitud al back para agrerar la cuenta
      const addAccount = await axios({
        method: "put",
        url: "/api/admin/lockaccounts",
        data: { userName: userName },
        headers: { "X-Requested-With": "XMLHttpRequest" },
        // withCredentials: true,
      })
        .then((res) => {
          console.log(res.data);
          if (res.data === null) {
            return SweetAlrtTem(
              `No puede agregar dos veces la misma cuenta.`,
              "warning"
            );
          }
          SweetAlrt(
            "Exito!",
            `Cuenta ${res.data.userName} agregada con éxito.`,
            "success"
          );
          setSubmit(true);
        })
        .catch((error) => console.log(error));
    }
  }

  async function removeLockAccount(e) {
    e.preventDefault();
    if (userName && !error) {
      console.log("trato de quitar la cuenta", userName);
      // le paso la solicitud al back para remover a cuenta
      const removeAccount = await axios({
        method: "delete",
        url: "/api/admin/lockaccounts",
        data: { userName: userName },
        headers: { "X-Requested-With": "XMLHttpRequest" },
        // withCredentials: true,
      })
        .then((res) => {
          console.log(res.data);
          if (res.data === null) {
            return SweetAlrtTem(`Cuenta inexistente.`, "info");
          }
          SweetAlrt(
            "Exito!",
            `Cuenta ${res.data.userName} quitada con éxito.`,
            "success"
          );
          setSubmit(true);
        })
        .catch((error) => console.log(error));
    }
  }

  function onChange(e) {
    setUserName(e.target.value);
    if (!regexEmail.test(e.target.value)) {
      setError("Este campo debe contener un email");
    } else {
      setError("");
    }
  }

  // console.log(lockAccounts, 'correos bloqueados en la app')
  return (
    <div className={styles.containerMainBlockAccount}>
      <h3
        style={{
          color: "#fff",
          textAlign: "center",
          marginTop: ".7rem",
          fontSize: "1.45rem",
        }}
      >
        Inhabilitación de cuenta
      </h3>
      <p style={{ color: "#fff", textAlign: "center", fontWeight: "600" }}>
        Pendiente: el registro y login con terceros
      </p>

      <div className={styles.containerBodyBlockAccount}>
        <form style={{ padding: "10px" }} action="deleteUser">
          <div>
            <p style={{ fontSize: "1.1rem", fontWeight: "700" }}>
              Email del usuario
            </p>
            <input
              type="text"
              value={userName}
              className={styles.inputBlockAccount}
              onChange={(e) => {
                onChange(e);
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1.2rem",
              gap: "1.8rem",
            }}
          >
            <button
              className={styles.btnBlockAccount}
              onClick={(e) => {
                addLockAccount(e);
              }}
            >
              Agregar
            </button>
            <button
              className={styles.btnBlockAccount}
              onClick={(e) => {
                removeLockAccount(e);
              }}
            >
              Quitar
            </button>
          </div>
        </form>
      </div>
      <div className={styles.listBlockeados}>
        {lockAccounts.length
          ? lockAccounts.map((c) => {
              return <li style={{borderBottom: "1px solid var(--color-primD1)", marginBottom: ".5rem", listStyle: "none"}} key={c}>{c.userName}</li>;
            })
          : null}
      </div>
    </div>
  );
}
