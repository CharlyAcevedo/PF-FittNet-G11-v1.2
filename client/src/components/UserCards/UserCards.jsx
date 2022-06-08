import React from "react";
// import UserCard from "../UserCard/UserCard";
import styles from "./style/UserCards.module.css";
import { useSelector } from "react-redux";

export default function UserCards() {
    const gyms = useSelector((state) => state.gyms);  

    return (

        <div className={styles.mainBoxCards2}>
            <div className={styles.boxCards2}>
                <h2>Nuestros Clientes</h2>
                <table>
                    <td><strong>Nombre</strong></td>                   
                    <td><strong>Correo</strong></td>
                    <td><strong>Id de cuenta</strong></td>
                    {gyms.length ? gyms.map(g =>{
                        return (
                            <tr>
                                <td>{g.name ? g.name : null}</td>
                                <td>{g.email ? g.email : null}</td>
                                <td>{g._id ? g._id : null}</td>
                            </tr>
                                             
                        )
                    }): 
                    <td>Cargando...</td>}
                </table>
                

            </div>
                           
        </div>   

    )
}