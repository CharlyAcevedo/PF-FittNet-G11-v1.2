import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdmin } from "../../redux/actions";
import styles from "./styles/detailProfileAdmin.module.css";

export default function DetailProfileAdmin() {
  let { userId, name } = useParams();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const type = localStorage.getItem("type");

  useEffect(() => {
    if (userId.length > 20) {
      dispatch(getAdmin(userId));
    }
  }, [userId]);

  // con el id ya podemos solicitar info a nuestro back, el cual solo responderá
  // si le llega este id (de la fomra que lo espera) y si el usuario tiene una
  // sesión iniciada.
  // Queda pendiente dispachar una acción para cargar en el estado global
  // la info del usuario en un objeto. Ejeplo --> State.detailUser = {}

  return (
    <div className={styles.containerMainDetailAdmin}>
      <div className={styles.headerPerfilAdmin}>
        <div className={styles.firstHeaderProfileAdmin}>
          <h3>{user.name && user.name}</h3>
          <span
            style={{
              border: "2px solid var(--color-primD1)",
              padding: ".2rem 1rem",
              borderRadius: ".6rem",
              fontWeight: "700",
            }}
          >
            {type}
          </span>
        </div>
        <div className={styles.secondHeaderProfileAdmin}>
          <p>Id: {user._id && user._id}</p>
        </div>
      </div>
      <p style={{ padding: "5px" }}>Email: {user.userName && user.userName}</p>

      <h3 style={{ padding: "5px" }}>Detalles del perfil admin</h3>

      <p style={{ padding: "5px" }}></p>
      <h3 style={{ padding: "5px" }}>Cosas que necesito</h3>
      <p style={{ padding: "5px" }}>
        1 - Necesito la info completa del perfil del admin, ir a buscar en la db
      </p>
      <p style={{ padding: "5px" }}>
        2 - Neceisto ver la estructura de esa infomación
      </p>
      <p style={{ padding: "5px" }}>3 - Necesito una foto del admin</p>
      <p style={{ padding: "5px" }}>
        4 - Necesito que esta sección tenga el mismo estilo que la sección de
        perfil user
      </p>
      <p style={{ padding: "15px" }}></p>
      <p style={{ padding: "15px" }}></p>

      <Link style={{ padding: "5px" }} to={`/updatepassword/${userId}`}>
        Cambiar mi contraseña
      </Link>

      <Link style={{ padding: "5px" }} to={`/deactivate/${userId}`}>
        Borra mi cuenta
      </Link>

      <a style={{ padding: "5px" }} to="/">
        Volver
      </a>
    </div>
  );
}
