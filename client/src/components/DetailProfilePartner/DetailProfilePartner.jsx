import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getPartnerDetails } from "../../redux/actions";
import { getUser } from "../../redux/actions";

import styles from "./styles/DetailProfilePartner.module.css";

export default function DetailProfilePartner() {
  let { userId, name, type } = useParams();
  // console.log(userId, name, type, 'id y name')
  const dispatch = useDispatch();
  console.log(userId, " user Id de params");

  useEffect(() => {
    dispatch(getUser(userId));
    dispatch(getPartnerDetails(userId)); // eslint-disable-next-line
  }, []);

  const partner = useSelector((state) => state.partnerDetails);
  console.log(partner);
  console.log(userId, name, type, "los params");
  // con el id ya podemos solicitar info a nuestro back, el cual solo responderá
  // si le llega este id (de la fomra que lo espera) y si el usuario tiene una
  // sesión iniciada.

  // Queda pendiente dispachar una acción para cargar en el estado global
  // la info del usuario en un objeto. Ejeplo --> State.detailUser = {}

  return (
    <div className={styles.partnerMainContainer}>
      <div className={styles.partnerMiniContainer}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: ".3rem",
            marginBottom: ".45rem",
          }}
        >
          <h3>{name ? name : null} </h3>
          <span
            style={{
              border: "2px solid var(--color-primD1)",
              borderRadius: ".6rem",
              padding: ".4rem",
              textAlign: "center",
            }}
          >
            {type ? type : null}
          </span>
        </div>
        <span
          style={{
            backgroundColor: "#a8a8a8",
            color: "#181818",
            padding: ".35rem 1rem",
            fontWeight: "700",
            borderRadius: ".5rem",
          }}
        >
          Id: {userId ? userId : null}{" "}
        </span>
      </div>

      <div className={styles.partnerHeaderMiniContainer}>
        <Link
          style={{ paddingRight: "20px" }}
          to={`/profile/edit/${type}/${name}/${userId}`}
        >
          Editar mi perfil
        </Link>
        <Link
          style={{ paddingRight: "20px" }}
          //   href={`/profile/edit/${type}/${name}/${userId}/gym`}>Editar mis gimnasios </Link>
          // <Link style={{ paddingRight: "20px" }}
          to={`/updatepassword/${userId}`}
        >
          Cambiar mi contraseña
        </Link>
        <Link style={{ paddingRight: "20px" }} to={`/deactivate/${userId}`}>
          Borra mi cuenta
        </Link>
        <Link style={{ paddingRight: "20px" }} to="/">
          Volver
        </Link>
      </div>
      {partner.name ? (
        <div className={styles.partnerMiniSecondContainer}>
          <h3>Detalles de su perfil</h3>
          <p style={{ color: "#dbdbdb", marginBottom: ".8rem" }}>
            En esta seccion usted podrá ver la informacion de su perfil
          </p>
          <p style={{ marginBottom: ".6rem" }}>
            Nombre:{" "}
            <span style={{ color: "var(--color-primD1)" }}>
              {partner.name ? partner.name : null}
            </span>
          </p>
          <p style={{ marginBottom: ".6rem" }}>
            Apellido:{" "}
            <span style={{ color: "var(--color-primD1)" }}>
              {partner.lastName
                ? partner.lastName
                : "No agrego ningun apellido"}
            </span>
          </p>
          <p style={{ marginBottom: ".6rem" }}>
            Email:{" "}
            <span style={{ color: "var(--color-primD1)" }}>
              {partner.email ? partner.email : ""}
            </span>
          </p>
          <p style={{ marginBottom: ".6rem" }}>
            Telefono:{" "}
            <span style={{ color: "var(--color-primD1)" }}>
              {partner.phone ? partner.phone : "No agrego ningun telefono"}
            </span>
          </p>
          <p style={{ marginBottom: ".6rem" }}>
            Tipo de plan:{" "}
            <span style={{ color: "var(--color-primD1)" }}>
              {partner.planType
                ? partner.planType.planName
                : "No cuenta con un plan"}
            </span>
          </p>
          <p style={{ marginBottom: ".6rem" }}>
            CBU:{" "}
            <span style={{ color: "var(--color-primD1)" }}>
              {partner.cbu
                ? partner.cbu
                : "Por el momento no agrego un CBU a su cuenta"}
            </span>
          </p>
          <p style={{ marginBottom: ".6rem" }}>
            CUIL:{" "}
            <span style={{ color: "var(--color-primD1)" }}>
              {partner.cuil ? partner.cuil : "No agrego su CUIL"}
            </span>
          </p>
          <p style={{ marginBottom: ".6rem" }}>
            Usuario activo:{" "}
            <span style={{ color: "var(--color-primD1)" }}>
              {partner.userActive ? partner.userActive : "-"}
            </span>
          </p>
          <div
            style={{
              backgroundColor: "#181818",
              width: "45%",
              padding: ".4rem",
              borderRadius: ".6rem",
              marginTop: ".8rem",
            }}
          >
            Redes Sociales:{" "}
            {partner.socialNetworks.length > 0 ? (
              partner.socialNetworks.map((socNet) => {
                return (
                  <p key={socNet._id}>
                    {socNet.socialMedia}: {socNet.userSM}
                  </p>
                );
              })
            ) : (
              <p>Aun no tiene registradas redes sociales</p>
            )}
          </div>
          <div
            style={{
              backgroundColor: "#181818",
              width: "45%",
              padding: ".4rem",
              borderRadius: ".6rem",
              marginTop: "1.2rem",
            }}
          >
            Metodos de Pago:{" "}
            {partner.paymentMethods.length > 0 ? (
              partner.paymentMethods.map((m) => {
                return <p key={m}>{m}</p>;
              })
            ) : (
              <p>Aun no ha registrado ningun metodo de pago</p>
            )}
          </div>
          <p></p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
