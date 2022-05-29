import React from "react";
import GymCard from "../GymCard/GymCard";
import "./styles/GymCards.css";

export default function GymsCards() {
    var gyms = [
    { id: 1, name: "Gym 1", image: "https://www.on24.com.ar/wp-content/uploads/2021/09/smart-fit-latam_13_924x500.png", rating: "4.5", price: "2499" },
    { id: 2, name: 'Gtm 2', image: "https://corporativo.smartfitcolombia.com/img/galeria/img_1.jpg", rating: "4.1", price: "2899" },
    { id: 3, name: 'Gtm 3', image: "https://noti5.tv/wp-content/uploads/2020/06/14.jpg", rating: "4.7", price: "2399" },
    { id: 4, name: 'Gtm 4', image: "https://corporativo.smartfitcolombia.com/img/galeria/img_1.jpg", rating: "3.9", price: "2799" },
    { id: 5, name: 'Gtm 5', image: "https://pictures.smartfit.com.br/6805/big/2.jpg", rating: "4.2", price: "2699" },
    { id: 6, name: 'Gtm 6', image: "https://pictures.smartfit.com.br/6799/big/1.jpg", rating: "4.8", price: "2999" },
    { id: 7, name: 'Gtm 7', image: "https://pictures.smartfit.com.br/3793/original/Cardio_Full.jpg", rating: "4.7", price: "2899" },
    { id: 8, name: 'Gtm 8', image: "https://www.agenciapi.co/sites/default/files/2021-06/GMINASIOSIBAGUE.jpeg", rating: "3.8", price: "3199" },
    { id: 8, name: 'Gtm 9', image: "https://www.elnuevodia.com.co/nuevodia/sites/default/files/styles/nota_800_x_400_/public/imagenes/2019/05/02/DATA_ART_2765820_BIG_CE.jpg", rating: "4.6", price: "3399" },
    ];
    

    return (            
        <div className="main-box-cards">
            <h2>Esta es la caja principal</h2>
            <div className="box-cards">
                <h5>Esta es la caja de las cards</h5>
                {gyms.length ? gyms.map(g =>{
                    return (
                        <GymCard                        
                            key= {g.id}
                            id={g.id}
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