import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import styles from "./styles/DetailProfilePartner.module.css";

export default function DetailProfilePartner() {
  let { userId, name, type } = useParams();
  // console.log(userId, name, type, 'id y name')

  const partner = useSelector((state) => state.partnerDetails);

  console.log(partner)
  // con el id ya podemos solicitar info a nuestro back, el cual solo responderá
  // si le llega este id (de la fomra que lo espera) y si el usuario tiene una
  // sesión iniciada.

  // Queda pendiente dispachar una acción para cargar en el estado global
  // la info del usuario en un objeto. Ejeplo --> State.detailUser = {}
    
  return (
    <div className={styles.partnerMainContainer}>
      <div className={styles.partnerMiniContainer}>
        <p>userId: {userId} </p>
        <p>name: {name} </p>
        <p>Typo: {type}</p>
      </div>

      <div className={styles.partnerMiniContainer}>
        <h3>Detalles de su perfil</h3>
        <p>En esta seccion usted podrá ver la informacion de su perfil</p>
        <p>Nombre: {partner.name ? partner.name : name}</p>
        <p>Apellido: {partner.lastName && partner.lastName}</p>
        <p>Email: {partner.email}</p>
        <p>Telefono: {partner.phone}</p>
        <p>Tipo de plan: {partner.planType.planName}</p>
        <p></p>
        <p>CBU: {null}</p>
        <p>Perfil: {null}</p>
        <p>Usuario activo: {null}</p>
        <p>Redes Sociales: {null}</p>
        <p>Metodos de Pago: {null}</p>
        <p>Categoria: {null}</p>
        <p></p>
      </div>

      <div className={styles.partnerMiniContainer}>
        <a style={{ paddingRight: "20px" }}
          href={`/profile/edit/${type}/${name}/${userId}`}>Editar mi perfil</a>
        <a style={{ paddingRight: "20px" }}
        //   href={`/profile/edit/${type}/${name}/${userId}/gym`}>Editar mis gimnasios </a>
        // <a style={{ paddingRight: "20px" }}
          href={`/updatepassword/${userId}`}>Cambiar mi contraseña</a>
        <a style={{ paddingRight: "20px" }}
          href={`/deactivate/${userId}`}>Borra mi cuenta</a>
        <a style={{ paddingRight: "20px" }} href="/">
          Volver
        </a>
      </div>
    </div>
  );
}