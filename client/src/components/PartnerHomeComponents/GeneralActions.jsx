import React from 'react'
import styles from "./styles/GeneralActions.module.css";
import { useParams, useNavigate } from "react-router-dom";

export default function GeneralActions() {
  let { userId, name, type } = useParams();
  const navigate = useNavigate();

  return (
    <div className={styles.mainContainerGA}>
        <h3>Mi panel de control Fittnet</h3>
        <div className={styles.pictureContainerGA}>
            <div className={styles.firstDiv}>
            <div className={styles.firstDivTxt}>Descubre todo lo que puedes hacer como socio Fittnet</div>
            </div>
            <div className={styles.secondDiv}>
                <button className={styles.btnAction} onClick={() => navigate(`/profile/${type}/${name}/${userId}`)}>Editar mi Perfil</button>
                <button className={styles.btnAction}>Agregar un Gimnasio</button>
                <button className={styles.btnAction}>Editar mis Gimnasios</button>
                <button className={styles.btnAction}>Ver a mis clientes</button>
                <button className={styles.btnAction}>Revisar mis Finanzas</button>
                <button className={styles.btnAction}>Cambiar mi plan</button>
                <button className={styles.btnAction}>Resetear mi Password</button>
                <button className={styles.btnAction}>Contacto Fittnet</button>
            </div>
        </div>
    </div>
  )
}
