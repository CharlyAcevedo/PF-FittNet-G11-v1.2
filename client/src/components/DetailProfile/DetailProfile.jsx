import React from "react";
import { useParams } from "react-router-dom";

export default function DetailProfile() {
    let { id , name, type } = useParams();
    console.log(id, name, type, 'id y name')

    // con el id ya podemos solicitar info a nuestro back, el cual solo responderá
    // si le llega este id (de la fomra que lo espera) y si el usuario tiene una
    // sesión iniciada.

    // Queda pendiente dispachar una acción para cargar en el estado global
    // la info del usuario en un objeto. Ejeplo --> State.detailUser = {}




    return (
        
        <div> 
            <a>Id: {id}, name: {name} </a>
            <a>Typo: {type}</a>
            <br />
            <h3>Estas tres partes pueden ser rutas distintas</h3>
            <a>Hay que solicitar info para cada una de estás vistas</a>
            <h3>Carrito de compras</h3>
            <a>Mi carrito</a>
            <br />
            <h3>Historial de compras</h3>
            <a>Mis compras</a>
            <br />
            <h3>Detalles del perfil</h3>
            <a>Name: {name}</a>
            <br />
            <a>Tipo de plan: </a>
            <br />
            <a>Siguitene 2</a>
            <br />
            <a>Siguitene 3</a>
            <br />
            <a>Siguitene 4</a>
        </div>
        

    )

}