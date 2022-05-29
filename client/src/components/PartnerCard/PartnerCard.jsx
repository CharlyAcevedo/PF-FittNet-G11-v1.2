import React from "react";
import './style/PartnerCard.css';


export default function PartnerCard(props) {
    console.log(props, 'las props partnerCard')
    return (
        <div className="box-single-card-2">
            <h3>{props.partner}</h3>
            <h5>☆ {props.plan}</h5>
            <h4>$ {props.price}</h4>                
            <div className="box-card-2">
                <img className="image-card-2" src={props.image} alt="logo" />

            </div>
                           
        </div>  

    )
}