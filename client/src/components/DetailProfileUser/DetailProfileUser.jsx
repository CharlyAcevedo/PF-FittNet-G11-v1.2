import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles/detailProfile.module.css";

export default function DetailProfileUser() {
  let { userId } = useParams();
  // console.log(userId, name, type, avatar, ' los params')

  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const { name, userName, type, avatar, info } = user;

  // const { photo ,birthday, username, address } = info;

  // const { street, floor, neighborhood, city, country, zipCode } = address;

  //info.address.street
  //info.address.floor
  //info.address.neighborhood
  //info.address.city
  //info.address.country
  //info.address.zipCode

  const avatarId = avatar?._id;

  // con el id ya podemos solicitar info a nuestro back, el cual solo responderá

  // si le llega este id (de la fomra que lo espera) y si el usuario tiene una
  // sesión iniciada.

  // Queda pendiente dispachar una acción para cargar en el estado global
  // la info del usuario en un objeto. Ejeplo --> State.detailUser = {}

  // console.log(avatar)

  return (
    <div style={{ width: "100%" }}>
      <div className={styles.containerPerfilUser}>
        <div className={styles.containerPhotoPerfil}>
          <img
            src={info?.photo}
            alt="mi foto"
            style={{ width: "90%", height: "300px", borderRadius: ".6rem" }}
          />
        </div>
        <div className={styles.infoPerfilUser}>
          <div className={styles.headerPerfilUser}>
            <div
              style={{ display: "flex", alignItems: "center", gap: "1.1rem" }}
            >
              <div>
                <h3 style={{ color: "#fff" }}>Marcelo Copa</h3>
                <p
                  style={{
                    color: "var(--color-prim)",
                    border: "1px solid var(--color-prim)",
                    textAlign: "center",
                    padding: ".2rem",
                    marginTop: ".2rem",
                    borderRadius: ".6rem",
                  }}
                >
                  User
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".4rem",
                  color: "#8a8a8a",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192H384z" />
                </svg>
                <p>Salta, AR</p>
              </div>
            </div>
            <div
              style={{
                fontWeight: "500",
                color: "#494949",
                backgroundColor: "#d6d6d6",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                textAlign: "center",
                paddingLeft: "1rem",
                paddingRight: "1rem",
                borderRadius: ".4rem",
              }}
            >
              <p>
                Id: <span style={{ fontWeight: "700" }}>{userId}</span>
              </p>
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
            <span
              style={{ color: "#fff", cursor: "pointer" }}
              onClick={() =>
                navigate(`/home/${type}/${name}/${userId}/${avatarId}`)
              }
            >
              Volver
            </span>
          </div>
          <div className={styles.infoContactUser}>
            <h4 style={{ fontWeight: "700", color: "#cecece" }}>
              Informacion de contacto
            </h4>
            <div className={styles.contactUser}>
              <p>
                Phone:{" "}
                <span style={{ color: "var(--color-prim)" }}>
                  {info?.phone}
                </span>
              </p>
              <p>
                Address:{" "}
                <span style={{ color: "var(--color-prim)" }}>
                  Direccion 14, Salta AR - 4400
                </span>
              </p>
              <p>
                Email:{" "}
                <span style={{ color: "var(--color-prim)" }}>{userName}</span>
              </p>
            </div>
          </div>
          <div className={styles.othersInfo}>
            <h4 style={{ fontWeight: "700", color: "#cecece" }}>
              Otra informacion
            </h4>
            <div className={styles.others}>
              <p>
                Fecha de nacimiento:{" "}
                <span style={{ color: "var(--color-prim)" }}>
                  {info?.birthday.substring(0, 10)}
                </span>
              </p>
              <p>
                Genero:{" "}
                <span style={{ color: "var(--color-prim)" }}>Masculino</span>
              </p>
            </div>
          </div>
        </div>
        {/* <h3>Historial de compras</h3>
        <p>Mis compras</p>
        <h3>Detalles del perfil</h3>
        <p>Name: {name}</p>
        <p>Tipo de plan: </p>
        <p>Siguitene 2</p>
        <p>Siguitene 3</p> */}
      </div>
    </div>
  );
}
