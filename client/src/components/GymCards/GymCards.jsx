import React from "react";
import GymCard from "../GymCard/GymCard";
import "./styles/GymCards.css";
import { useSelector } from "react-redux";

export default function GymsCards() {
  
    const gyms = useSelector((state) => state.gymsToShow)

    return (            
        <div className="main-box-cards">
            <h2>Esta es la caja principal</h2>
            <div className="box-cards">
                <h5>Esta es la caja de las cards</h5>
                {gyms.length ? gyms.map(g =>{
                    return (
                        <GymCard                        
                            key= {g._id}
                            id={g._id}
                            name = {g.name}
                            rating = {g.rating}
                            price ={g.price}
                            image = {g.image}                            
                        />                    
                    )
                }): 
                gyms.length === 0 &&
                <img id='loading' src="https://www.sanfranciscohm.com/static/img/loading.gif" alt="loading..." /> }
                

            </div>
                           
        </div>         
    )

}