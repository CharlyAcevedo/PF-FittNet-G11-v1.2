import React from "react";
import PartnerCard from "../PartnerCard/PartnerCard";
import './style/PartnerCards.css'


export default function PartnerCards() {
    var partners = [
        { id: 1, partner: "Partner 1", image: "https://img2.freepng.es/20190418/qlt/kisspng-computer-icons-user-profile-clip-art-portable-netw-interview-consultation-transparent-amp-png-clipa-5cb93eb7f0a611.6616685115556440879857.jpg", plan: "standar", price: "699" },
        { id: 2, partner: 'Partner 2', image: "https://img2.freepng.es/20190418/qlt/kisspng-computer-icons-user-profile-clip-art-portable-netw-interview-consultation-transparent-amp-png-clipa-5cb93eb7f0a611.6616685115556440879857.jpg", plan: "premium", price: "799" },
        { id: 3, partner: 'Partner 3', image: "https://img2.freepng.es/20190418/qlt/kisspng-computer-icons-user-profile-clip-art-portable-netw-interview-consultation-transparent-amp-png-clipa-5cb93eb7f0a611.6616685115556440879857.jpg", plan: "golden", price: "999" },
        { id: 4, partner: 'Partner 4', image: "https://img2.freepng.es/20190418/qlt/kisspng-computer-icons-user-profile-clip-art-portable-netw-interview-consultation-transparent-amp-png-clipa-5cb93eb7f0a611.6616685115556440879857.jpg", plan: "premium", price: "799" },
        { id: 5, partner: 'Partner 5', image: "https://img2.freepng.es/20190418/qlt/kisspng-computer-icons-user-profile-clip-art-portable-netw-interview-consultation-transparent-amp-png-clipa-5cb93eb7f0a611.6616685115556440879857.jpg", plan: "standar", price: "699" },
        { id: 6, partner: 'Partner 6', image: "https://img2.freepng.es/20190418/qlt/kisspng-computer-icons-user-profile-clip-art-portable-netw-interview-consultation-transparent-amp-png-clipa-5cb93eb7f0a611.6616685115556440879857.jpg", plan: "golden", price: "999" },
        { id: 7, partner: 'Partner 7', image: "https://img2.freepng.es/20190418/qlt/kisspng-computer-icons-user-profile-clip-art-portable-netw-interview-consultation-transparent-amp-png-clipa-5cb93eb7f0a611.6616685115556440879857.jpg", plan: "premum", price: "499" },
        { id: 8, partner: 'Partner 8', image: "https://img2.freepng.es/20190418/qlt/kisspng-computer-icons-user-profile-clip-art-portable-netw-interview-consultation-transparent-amp-png-clipa-5cb93eb7f0a611.6616685115556440879857.jpg", plan: "standar", price: "699" },
        { id: 8, partner: 'Partner 9', image: "https://img2.freepng.es/20190418/qlt/kisspng-computer-icons-user-profile-clip-art-portable-netw-interview-consultation-transparent-amp-png-clipa-5cb93eb7f0a611.6616685115556440879857.jpg", plan: "standar", price: "699" },
        ];

    return (

        <div className="main-box-cards-2">
            <div className="box-cards-2">
                <h2>Nuestros Socios Comerciales</h2>
                {partners.length ? partners.map(g =>{
                    return (
                        < PartnerCard                        
                            key= {g.id}
                            id={g.id}
                            partner = {g.partner}
                            plan = {g.plan}
                            price ={g.price}
                            image = {g.image}                            
                        />                    
                    )
                }): 
                partners.length === 0 &&
                <img id='loading' src="https://www.sanfranciscohm.com/static/img/loading.gif" alt="loading..." /> }
                

            </div>
                           
        </div>   

    )
}
