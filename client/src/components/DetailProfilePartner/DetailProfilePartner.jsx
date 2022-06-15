import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPartnerDetails } from "../../redux/actions";

import styles from "./styles/DetailProfilePartner.module.css";

export default function DetailProfilePartner() {
  let { userId, name, type } = useParams();
  // console.log(userId, name, type, 'id y name')
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(getPartnerDetails(userId))// eslint-disable-next-line
  },[])
  
  const partner = useSelector((state) => state.partnerDetails);
  console.log(partner)
  console.log(userId, name, type, 'los params');
  // con el id ya podemos solicitar info a nuestro back, el cual solo responderá
  // si le llega este id (de la fomra que lo espera) y si el usuario tiene una
  // sesión iniciada.

  // Queda pendiente dispachar una acción para cargar en el estado global
  // la info del usuario en un objeto. Ejeplo --> State.detailUser = {}
    
  return (
    <div className={styles.partnerMainContainer}>
      <div className={styles.partnerMiniContainer}>
        <p>userId: {userId ? userId : null} </p>
        <p>name: {name ? name : null} </p>
        <p>Typo: {type ? type : null}</p>
      </div>

      {partner.name ? <div className={styles.partnerMiniContainer}>
        <h3>Detalles de su perfil</h3>
        <p>En esta seccion usted podrá ver la informacion de su perfil</p>
        <p>Nombre: {partner.name ? partner.name : null}</p>
        <p>Apellido: {partner.lastName && partner.lastName}</p>
        <p>Email: {partner.email ? partner.email : ""}</p>
        <p>Telefono: {partner.phone && partner.phone}</p>
        <p>Tipo de plan: {partner.planType && partner.planType.planName}</p>
        <p></p>
        <p>CBU: {partner.cbu && partner.cbu}</p>
        <p>CUIL: {partner.cuil && partner.cuil}</p>
        <p>Usuario activo: {partner.userActive && partner.userActive}</p>
        <div>Redes Sociales: { partner.socialNetworks.length > 0 ? 
        partner.socialNetworks.map((socNet) => {
          return (
            <p key={socNet._id}>{socNet.socialMedia}: {socNet.userSM}</p>
          )
        }) : <p>Aun no tiene registradas redes sociales</p>
      }</div>
        <div>Metodos de Pago: {partner.paymentMethods.length > 0 ? partner.paymentMethods.map(m => {
          return (
            <p key={m}>{m}</p>
          )
        }) : <p>Aun no ha registrado ningun metodo de pago</p>}</div>
        <p></p>
      </div> : <div>Loading...</div>}
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