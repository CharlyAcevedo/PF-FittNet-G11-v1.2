import React from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useEffect } from 'react';



export default function Activation(){
    const { userId, secretToken } = useParams();

    useEffect(() => {
        // verifico el largo del id y el token andes de ejecutar el get al back
        console.log('se ejecuta el useEffect');
        if (userId.length > 9 && secretToken.length > 5 ) {
            console.log('sale el get al back');
            axios.get(`/api/service/activation/${userId}/${secretToken}`)
            .then((response)=> {console.log(response.data)})
            .catch((error)=> {console.lgo(error)})
        }
        
    }, [userId, secretToken]);


    return (

        <div>
            Su cuenta ha sido activada con exito
            <img src="https://mtracks.azureedge.net/public/images/site/Verify-Email-illo.png" 
            alt="verified email" />

            <a href="/login">Iniciar sesión</a>
        </div>
    )
}