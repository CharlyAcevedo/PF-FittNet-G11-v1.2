import React from "react";
import styles from './style/PartnerCard.module.css';


export default function PartnerCard(props) {
    console.log(props, 'las props partnerCard')
    return (
        <div className={styles.boxSingleCard2}>
            <h3>{props.partner}</h3>
            <h5>☆ {props.plan}</h5>
            <h4>$ {props.price}</h4>                
            <div className={styles.boxCard2}>
                <img className={styles.imageCard2} src={props.image} alt="logo" />

            </div>
                           
        </div>  

    )
}