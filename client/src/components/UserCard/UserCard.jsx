import React from "react";
import styles from './style/UserCard.module.css';


export default function UserCards(props) {
    console.log(props, 'las props')
    return (
        <div className={styles.boxSingleCard2}>
            <h3>{props.user}</h3>
            <h5>{props.plan === 'premium' ? '♢' : '☆'} {props.plan}</h5>
            <h4>$ {props.price}</h4>                
            <div className={styles.boxCard2}>
                <img className={styles.imageCard2} src={props.image} alt="logo" />

            </div>
                           
        </div>  

    )
}