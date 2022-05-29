import React from "react";
import UserCard from "../UserCard/UserCard";

export default function UserCards() {
    var users = [
        { id: 1, user: "User 1", image: "https://img2.freepng.es/20180331/eow/kisspng-computer-icons-user-clip-art-user-5abf13db298934.2968784715224718991702.jpg", plan: "basic", price: "399" },
        { id: 2, user: 'User 2', image: "https://img2.freepng.es/20180331/eow/kisspng-computer-icons-user-clip-art-user-5abf13db298934.2968784715224718991702.jpg", plan: "premium", price: "499" },
        { id: 3, user: 'User 3', image: "https://img2.freepng.es/20180331/eow/kisspng-computer-icons-user-clip-art-user-5abf13db298934.2968784715224718991702.jpg", plan: "basic", price: "399" },
        { id: 4, user: 'User 4', image: "https://img2.freepng.es/20180331/eow/kisspng-computer-icons-user-clip-art-user-5abf13db298934.2968784715224718991702.jpg", plan: "premium", price: "499" },
        { id: 5, user: 'User 5', image: "https://img2.freepng.es/20180331/eow/kisspng-computer-icons-user-clip-art-user-5abf13db298934.2968784715224718991702.jpg", plan: "premium", price: "499" },
        { id: 6, user: 'User 6', image: "https://img2.freepng.es/20180331/eow/kisspng-computer-icons-user-clip-art-user-5abf13db298934.2968784715224718991702.jpg", plan: "basic", price: "399" },
        { id: 7, user: 'User 7', image: "https://img2.freepng.es/20180331/eow/kisspng-computer-icons-user-clip-art-user-5abf13db298934.2968784715224718991702.jpg", plan: "premum", price: "499" },
        { id: 8, user: 'User 8', image: "https://img2.freepng.es/20180331/eow/kisspng-computer-icons-user-clip-art-user-5abf13db298934.2968784715224718991702.jpg", plan: "basic", price: "399" },
        { id: 9, user: 'User 9', image: "https://img2.freepng.es/20180331/eow/kisspng-computer-icons-user-clip-art-user-5abf13db298934.2968784715224718991702.jpg", plan: "basic", price: "399" },
        { id: 10, user: "User 10", image: "https://img2.freepng.es/20180331/eow/kisspng-computer-icons-user-clip-art-user-5abf13db298934.2968784715224718991702.jpg", plan: "basic", price: "399" },
        { id: 11, user: 'User 11', image: "https://img2.freepng.es/20180331/eow/kisspng-computer-icons-user-clip-art-user-5abf13db298934.2968784715224718991702.jpg", plan: "premium", price: "499" },
        { id: 12, user: 'User 12', image: "https://img2.freepng.es/20180331/eow/kisspng-computer-icons-user-clip-art-user-5abf13db298934.2968784715224718991702.jpg", plan: "basic", price: "399" },
        { id: 13, user: 'User 13', image: "https://img2.freepng.es/20180331/eow/kisspng-computer-icons-user-clip-art-user-5abf13db298934.2968784715224718991702.jpg", plan: "premium", price: "499" },
        { id: 14, user: 'User 14', image: "https://img2.freepng.es/20180331/eow/kisspng-computer-icons-user-clip-art-user-5abf13db298934.2968784715224718991702.jpg", plan: "premium", price: "499" },
        { id: 15, user: 'User 15', image: "https://img2.freepng.es/20180331/eow/kisspng-computer-icons-user-clip-art-user-5abf13db298934.2968784715224718991702.jpg", plan: "basic", price: "399" },
        { id: 16, user: 'User 16', image: "https://img2.freepng.es/20180331/eow/kisspng-computer-icons-user-clip-art-user-5abf13db298934.2968784715224718991702.jpg", plan: "premum", price: "499" },
        { id: 17, user: 'User 17', image: "https://img2.freepng.es/20180331/eow/kisspng-computer-icons-user-clip-art-user-5abf13db298934.2968784715224718991702.jpg", plan: "basic", price: "399" },
        { id: 18, user: 'User 18', image: "https://img2.freepng.es/20180331/eow/kisspng-computer-icons-user-clip-art-user-5abf13db298934.2968784715224718991702.jpg", plan: "basic", price: "399" },
        ];

    return (

        <div className="main-box-cards-2">
            <div className="box-cards-2">
                <h2>Nuestros Clientes</h2>
                {users.length ? users.map(g =>{
                    return (
                        < UserCard                        
                            key= {g.id}
                            id={g.id}
                            user = {g.user}
                            plan = {g.plan}
                            price ={g.price}
                            image = {g.image}                            
                        />                    
                    )
                }): 
                users.length === 0 &&
                <img id='loading' src="https://www.sanfranciscohm.com/static/img/loading.gif" alt="loading..." /> }
                

            </div>
                           
        </div>   

    )
}