import React from "react";
import './styles/GymCard.css';

export default function GymCard(props) {
    // console.log(props, ' mis props');
    return (            
        <div className="box-single-card">
            <h2>{props.name}</h2>
            <div className="box-card">
                <h4>☆ {props.rating}</h4>
                <h3>$ {props.price}</h3>                
                <img className="image-card" src={props.image} alt="logo" />

            </div>
                           
        </div>         
    )

}