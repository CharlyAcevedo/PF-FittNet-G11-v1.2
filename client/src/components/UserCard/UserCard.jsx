import React from "react";
import './style/UserCard.css';


export default function UserCards(props) {
    console.log(props, 'las props')
    return (
        <div className="box-single-card-2">
            <h3>{props.user}</h3>
            <h5>{props.plan === 'premium' ? '♢' : '☆'} {props.plan}</h5>
            <h4>$ {props.price}</h4>                
            <div className="box-card-2">
                <img className="image-card-2" src={props.image} alt="logo" />

            </div>
                           
        </div>  

    )
}