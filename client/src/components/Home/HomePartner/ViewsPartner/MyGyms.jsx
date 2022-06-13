import React from "react";
import { useSelector } from "react-redux";
import styles from "./styles/mygym.module.css";
import { CardGymPartner } from "../../../../helpers/Cards/Cards.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { EditMyGyms } from "../ViewsPartner/EditMyGyms";

export function MyGyms() {
  const userPartner = useSelector((state) => state.user);

//   const [view, setView] = useState("myGyms")  
  
  console.log("userPartner", userPartner);

  return (
    <div className={styles.containMainMyGyms}>
      <div className={styles.headerMyGyms}>
        <h2 style={{ color: "#fff" }}>Mis gimnasios</h2>
        {/* <div className={styles.listBtn}>
          <span className={styles.titleBtn}>Crear gimnasio</span>
        </div> */}
      </div>
      <div className={styles.mainMyGym}>
        {/* <CardGymPartner/> */}
        {userPartner && userPartner.gyms?.length > 0 ? (
          userPartner.gyms.map((x, y) => (
            <CardGymPartner
              title={x.name}
              id={x._id}
              image={x.image}
              price={x.price.$numberDecimal}
              trainers={x.trainers}
              email={x.email}
              phone={x.phone}
              favorito={x.favourite}
              key={y}
            />
          ))
        ) : (
          <h2 style={{ color: "#fff", textAlign: "center", marginTop: "5rem" }}>
            No cuenta con gimnasios
          </h2>
        )}
      </div>
    </div>
  );
}
