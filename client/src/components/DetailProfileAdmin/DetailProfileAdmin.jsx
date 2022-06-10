import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdmin } from "../../redux/actions";


export default function DetailProfileAdmin() {
    let { userId , name, type } = useParams();

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);

    useEffect(() => {       
        if (userId.length > 20) {          
            dispatch(getAdmin(userId)); 
        }      
    },[userId]);  

    // con el id ya podemos solicitar info a nuestro back, el cual solo responderá
    // si le llega este id (de la fomra que lo espera) y si el usuario tiene una
    // sesión iniciada.
    // Queda pendiente dispachar una acción para cargar en el estado global
    // la info del usuario en un objeto. Ejeplo --> State.detailUser = {}



    return (
        
        <div style={{padding: "20px", color: "#fff" }}> 
            
            <h3 style={{padding: "15px"}}>Perfil del admin</h3>
            <p style={{padding: "5px"}}>Quiero mostrar toda su infomación</p>
           
            <p style={{padding: "5px"}}>Nombre: {user.name && user.name}</p>
            <p style={{padding: "5px"}}>Email: {user.userName && user.userName}</p>
            
            <p style={{padding: "15px"}}></p> 
           

            <h3 style={{padding: "5px"}}>Detalles del perfil admin</h3>

            <p style={{padding: "5px"}}></p>         
            <h3 style={{padding: "5px"}}>Cosas que necesito</h3>
            <p style={{padding: "5px"}}>1 - Necesito la info completa del perfil del admin, ir a buscar en la db</p>
            <p style={{padding: "5px"}}>2 - Neceisto ver la estructura de esa infomación</p>
            <p style={{padding: "5px"}}>3 - Necesito una foto del admin</p>
            <p style={{padding: "5px"}}>4 - Necesito que esta sección tenga el mismo estilo que la sección de perfil user</p>
            <p style={{padding: "15px"}}></p>
            <p style={{padding: "5px"}}>Id: {user._id && user._id}</p> 
            <p style={{padding: "15px"}}></p>
           
            <a style={{padding: "5px"}}href={`/home/editprofile/${type}/${name}/${userId}`}>Editar mi perfil</a>
           
            <a style={{padding: "5px"}} href={`/updatepassword/${userId}`}>Cambiar mi contraseña</a>
             
            <a style={{padding: "5px"}} href={`/deactivate/${userId}`}>Borra mi cuenta</a>
            
            <a style={{padding: "5px"}} href='/'>Volver</a>
        </div>
        

    )

}