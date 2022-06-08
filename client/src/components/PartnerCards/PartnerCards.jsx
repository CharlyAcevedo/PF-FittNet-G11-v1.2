import React from "react";
// import PartnerCard from "../PartnerCard/PartnerCard";
import styles from './style/PartnerCards.module.css'
import { useSelector } from "react-redux";

export default function PartnerCards() {
   
    const gyms = useSelector((state) => state.gyms);

    return (
        <div className={styles.mainBoxCards2}>
            <div className={styles.boxCards2}>
                <h2>Nuestros Socios Comerciales</h2>
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
