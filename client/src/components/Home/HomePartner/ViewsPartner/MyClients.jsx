import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles/mygym.module.css";
import { CardsClientsPartner } from "../../../../helpers/Cards/Cards.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ClientsGraph from "../../../Graphics/GraphClient";
// import { EditMyGyms } from "../ViewsPartner/EditMyGyms";

export function MyClients() {

    return (
        <div className={styles.containMainMyGyms}>
           {/* <ClientsGraph/> */}
        </div>
    );
}