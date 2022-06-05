import React from "react";
import { useParams } from "react-router-dom";
import styles from "./styles/detailProfile.module.css";

export default function DetailProfileUser() {
  let { userId, name, type, avatar } = useParams();
  // console.log(userId, name, type, avatar, ' los params')

  // con el id ya podemos solicitar info a nuestro back, el cual solo responderá
  // si le llega este id (de la fomra que lo espera) y si el usuario tiene una
  // sesión iniciada.

  // Queda pendiente dispachar una acción para cargar en el estado global
  // la info del usuario en un objeto. Ejeplo --> State.detailUser = {}

  return (
    <div style={{ width: "100%" }}>
      <div className={styles.containerPerfilUser}>
        <div className={styles.headerProfile}>
          <div className={styles.usuarioId}>
            Id: <span>{userId}</span>
          </div>
          <span className={styles.nameProfile}>
            Bienvenido a tu perfil - {name}
          </span>
          <div className={styles.typeUser}>
            <p>Tipo usuario : {type.toUpperCase()}</p>
          </div>
        </div>

        <div className={styles.etiquetasProfile}>
          <a
            style={{ color: "#fff" }}
            href={`/home/modificacion/${type}/${name}/${userId}`}
          >
            Editar mi perfil
          </a>
          <a style={{ color: "#fff" }} href={`/updatepassword/${userId}`}>
            Cambiar mi contraseña
          </a>
          <a style={{ color: "#fff" }} href={`/deactivate/${userId}`}>
            Borra mi cuenta
          </a>
          <a style={{ color: "#fff" }} href="/">
            Volver
          </a>
        </div>
        <div className={styles.containerAlert}>
          <h3>Esta vista corresponde a un cliente final o "user"</h3>
          <p>Hay que solicitar info para cada una de estás vistas</p>
        </div>
        <div className={styles.containerCarritoCompras}>
          <h3>Carrito de compras</h3>
          <p>Mi carrito</p>
        </div>
        <h3>Historial de compras</h3>
        <p>Mis compras</p>
        <h3>Detalles del perfil</h3>
        <p>Name: {name}</p>
        <p>Tipo de plan: </p>
        <p>Siguitene 2</p>
        <p>Siguitene 3</p>
      </div>
    </div>
  );
}
