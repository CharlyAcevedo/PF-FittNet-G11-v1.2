import React from "react";
import { useParams } from "react-router-dom";
import ClientsGraph from "../Graphics/GraphClient";
import IncomesGraph from "../Graphics/Incomes";
import styles from "./styles/DetailProfilePartner.module.css";

export default function DetailProfilePartner() {
  let { id, userId, name, type } = useParams();
  // console.log(id, name, type, 'id y name')

  // con el id ya podemos solicitar info a nuestro back, el cual solo responderá
  // si le llega este id (de la fomra que lo espera) y si el usuario tiene una
  // sesión iniciada.

  // Queda pendiente dispachar una acción para cargar en el estado global
  // la info del usuario en un objeto. Ejeplo --> State.detailUser = {}

  return (
    <div className={styles.partnerMainContainer}>
      {/* <NavBarProfile/>  */}
      <p>Id: {id}, name: {name} </p>
            <p>Typo: {type}</p>            
      <br />


      <section className={styles.partnerTitles}>
        <h3>Perfil de Partner</h3>
        <p>
          En esta seccion usted podrá ver la informacion de su perfil;
          Información sobre sus Ventas, su Flujo de fondos y mas
        </p>
      </section>       
      <section className={styles.partnerIncomes}>
        <section className={styles.partnerSales}>
          <h3>Gestión de ventas</h3>
          <p>Mis ventas e historial de ventas</p>
          <IncomesGraph />
        </section>
        <section className={styles.partnerCashFlow}>
          <h3>Flujo de fondos</h3>
          <p>Mi caja</p>
          <br />
        </section>
      </section>
      <section className={styles.partnerClients}>
        <h3>Mis Clientes</h3>
        <ClientsGraph />
      </section>
      <section className={styles.partnerFinalSection}>
        <section className={styles.partnerProfileDetails}>
          <h3>Detalles del perfil</h3>
          <p>Name: {name}</p>
          <br />
          <p>Tipo de plan: estandar, premium o golden</p>
          <br />
        </section>
        <section className={styles.partnerLinks}>
          <a
            style={{ color: "#fff" }}
            href={`/profile/edit/${type}/${name}/${userId}`}
          >
            Editar mi perfil
          </a>
          <br />
          <br />
          <a
            style={{ color: "#fff" }}
            href={`/profile/edit/${type}/${name}/${userId}/gym`}
          >
            Editar mis gimnasios
          </a>
          <br />
          <br />
          <a style={{ color: "#fff" }} href={`/updatepassword/${userId}`}>
            Cambiar mi contraseña
          </a>
          <br />
          <br />
          <a style={{ color: "#fff" }} href={`/deactivate/${userId}`}>
            Borra mi cuenta
          </a>
          <br />
          <br />
          <a style={{ color: "#fff" }} href="/">
            Volver
          </a>
        </section>
      </section>
    </div>
  );
}