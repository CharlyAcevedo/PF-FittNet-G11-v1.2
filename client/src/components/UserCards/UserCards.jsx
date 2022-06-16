import React from "react";
// import UserCard from "../UserCard/UserCard";
import styles from "./style/UserCards.module.css";
import { useSelector } from "react-redux";

export default function UserCards() {
  const users = useSelector((state) => state.users);

  return (
    <div className={styles.mainBoxCards2}>
      <div className={styles.boxCards2}>
        <h3
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: "1.6rem",
            marginBottom: "1.2rem",
          }}
        >
          Nuestros Clientes
        </h3>
        <table className={styles.tableUser}>
          <thead className={styles.headerTableUser}>
            <tr>
              <th>Type</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Id de cuenta</th>
            </tr>
          </thead>
          <tbody>
            {users.length
              ? users.map((u) => {
                  return (
                    <tr key={u.id}>
                      <td key={`1${u.id}`}>{u.type ? u.type : null}</td>
                      <td key={`2${u.id}`}>{u.name ? u.name : null}</td>
                      <td key={`3${u.id}`}>{u.userName ? u.userName : null}</td>
                      <td key={`4${u.id}`}>{u._id ? u._id : null}</td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
        <div style={{width: "90%", margin: "1.2rem auto"}}>
          <h4 style={{ color: "#fff" }}>
            La app cuenta actualmente con{" "}
            <span style={{ color: "var(--color-primD1)" }}>{users.length}</span>{" "}
            clientes finales registrados
          </h4>
        </div>
      </div>
    </div>
  );
}
