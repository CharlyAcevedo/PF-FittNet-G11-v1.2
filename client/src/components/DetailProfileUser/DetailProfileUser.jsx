import React from "react";
import { useParams } from "react-router-dom";
import NavBarProfile from "../NavBarProfile/NavBarProfile";

export default function DetailProfileUser() {
    let { userId , name, type, avatar } = useParams();
    // console.log(userId, name, type, avatar, ' los params')

    // con el id ya podemos solicitar info a nuestro back, el cual solo responderá
    // si le llega este id (de la fomra que lo espera) y si el usuario tiene una
    // sesión iniciada.

    // Queda pendiente dispachar una acción para cargar en el estado global
    // la info del usuario en un objeto. Ejeplo --> State.detailUser = {}
    
  


    return (
        
        <div>
            <p>Id: {userId}, name: {name} </p>
            <p>Typo: {type}</p>
            <br />
            <h3>Esta vista corresponde a un cliente final o "user"</h3>
            <p>Hay que solicitar info para cada una de estás vistas</p>
            <h3>Carrito de compras</h3>
            <p>Mi carrito</p>
            <br />
            <h3>Historial de compras</h3>
            <p>Mis compras</p>
            <br />
            <h3>Detalles del perfil</h3>
            <p>Name: {name}</p>
            <br />
            <p>Tipo de plan: </p>
            <br />
            <p>Siguitene 2</p>
            <br />
            <p>Siguitene 3</p>
            <br />
            <p>Siguitene 4</p>
            <br />
            <a href={`/updatepassword/${userId}`}>Cambiar mi contraseña</a>
            <br /> 
            <a href={`/deactivate/${userId}`}>Borra mi cuenta</a>
            <a href={`/home/modificacion/${type}/${name}/${userId}`}>Modificar usuario</a>
            <br />
            <a href='/'>Volver</a>
        </div>
        

    )

}