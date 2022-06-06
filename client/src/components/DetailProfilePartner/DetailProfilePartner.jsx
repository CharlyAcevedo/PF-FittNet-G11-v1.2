import React from "react";
import { useParams } from "react-router-dom";
export default function DetailProfilePartner() {
    let { id , userId, name, type } = useParams();
    // console.log(id, name, type, 'id y name')

    // con el id ya podemos solicitar info a nuestro back, el cual solo responderá
    // si le llega este id (de la fomra que lo espera) y si el usuario tiene una
    // sesión iniciada.

    // Queda pendiente dispachar una acción para cargar en el estado global
    // la info del usuario en un objeto. Ejeplo --> State.detailUser = {}



    return (
        
        <div>
            {/* <NavBarProfile/>  */}
            <p>Id: {id}, name: {name} </p>
            <p>Typo: {type}</p>
            <br />
            <h3>Esta vista corresponde a un cliente empresa o "partner"</h3>
            <p>Hay que solicitar info para cada una de estás vistas</p>
            <h3>Gestión de ventas</h3>
            <p>Mis ventas e historial de ventas</p>
            <br />
            <h3>Flujo de fondos</h3>
            <p>Mi caja</p>
            <br />
            <h3>Detalles del perfil</h3>
            <p>Name: {name}</p>
            <br />
            <p>Tipo de plan: {type}</p>
            <br />
            <p>Siguitene 2</p>
            <br />
            <a style={{color: "#fff"}} href={`/home/modificacion/${type}/${name}/${userId}`}>Editar mi perfil</a>
            <br />
            <br />
            <a style={{color: "#fff"}} href={`/updatepassword/${userId}`}>Cambiar mi contraseña</a>
            <br />
            <br /> 
            <a style={{color: "#fff"}} href={`/deactivate/${userId}`}>Borra mi cuenta</a>
            <br />
            <br />
            <a style={{color: "#fff"}} href='/'>Volver</a>
        </div>
        

    )

}