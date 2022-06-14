import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles/mygym.module.css";
import { CardsClientsPartner } from "../../../../helpers/Cards/Cards.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { EditMyGyms } from "../ViewsPartner/EditMyGyms";

export function MyClients() {
    const dispatch = useDispatch();
    const partnerGyms = useSelector((state) => state.user);
    
    
    console.log("clients", partnerGyms.gyms);

    return (
        <div className={styles.containMainMyGyms}>
            {/* <div className={styles.headerMyGyms}>
                <h2 style={{ color: "#fff" }}>Mis clientes</h2>
            </div>
            <div className={styles.mainMyGym}>
                {clients && clients.gyms?.length > 0 ? (
                    clients.gyms.map((x, y) => (            
          ))
                ) : (
                    <h2 style={{ color: "#fff", textAlign: "center", marginTop: "5rem" }}>
                        No cuenta con gimnasios
                    </h2>
                )}
            </div> */}
        </div>
    );
}