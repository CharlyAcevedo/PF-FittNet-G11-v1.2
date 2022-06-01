import React from "react";
import { useParams } from "react-router-dom";
import NavBarProfile from "../NavBarProfile/NavBarProfile";

export default function DetailProfileAdmin() {
    let { id, userId , name, type } = useParams();
   

    // con el id ya podemos solicitar info a nuestro back, el cual solo responderá
    // si le llega este id (de la fomra que lo espera) y si el usuario tiene una
    // sesión iniciada.

    // Queda pendiente dispachar una acción para cargar en el estado global
    // la info del usuario en un objeto. Ejeplo --> State.detailUser = {}



    return (
        
        <div> 
            <NavBarProfile/>
            <p>Id: {id}, name: {name} </p>
            <p>Typo: {type}</p>
            <br />
            <h3>Esta vista corresponde a un Admin "admin"</h3>
            <p>Hay que solicitar info para cada una de estás vistas</p>
            <h3>Gestión de negocio</h3>
            <p>Tablero de control de ventas y operaciones</p>
            <br />
            <h3>Tablero de gestión de cuentas</h3>
            <p>Ver cuentas, borrar cuentas, forzar reset password, etc.</p>
            <br />
            <h3>Detalles del perfil admin</h3>
            <p>Name: {name}</p>
            <br />
            <p>Tipo de plan: {type}</p>
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
            <br />
            <a href='/'>Volver</a>
        </div>
        

    )

}