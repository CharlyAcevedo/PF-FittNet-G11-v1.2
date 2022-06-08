import React from "react"
import { useState } from "react"
import axios from "axios";


// Me queda pendiente conectar al back y hacer la petición ( info user) 
// y luego la acción (delete)
export default function DeteleteAccount() {
    const [userId, setUserId] = useState("");
    const [user, setUser] = useState({});

    async function getUserById(e) {
        e.preventDefault();
        if (userId.length > 5) {
            // console.log(userId, "voy a buscar el user por id a la db")
            // Voy a tener que mandar headers
            const getUser = await axios({
                  method: 'get',
                  url: `/api/admin/userId/${userId}`,   
                  headers: {'X-Requested-With': 'XMLHttpRequest'},
                  withCredentials: true
                })  
                .then((res) => { return res.data })
                .catch((error) => console.log(error))
            if (getUser.user === null) return window.alert('Id no encontrado')
            console.log(getUser.user, 'la respuesta del back')
            setUser(getUser.user);
        }
    }

    async function deteleUserById(e){
        e.preventDefault();
        console.log(user._id, "voy a borrar el user por id a la db")
        window.confirm(`Confirma que quiere eliminar el usuario ${user.name}`)

        
        // Voy a tener que mandar headers
        // console.log("está saliendo el post ", userLogin);
        if (userId.length && user._id) {
            const userDelete = await axios({
                  method: 'delete',
                  url: '/api/admin/delete',
                  data: {userId: userId},
                  headers: {'X-Requested-With': 'XMLHttpRequest'},
                  withCredentials: true
                })  
                .then((res) => { return res.data })
                .catch((error) => console.log(error))
            
            console.log(userDelete, 'si lo borra responde')
            if (userDelete === undefined) return window.alert("No se pudo eliminar el usuario")    
                
            window.alert(`${userDelete.name} ha sido eliminado con éxito`)
            setUserId("");
            setUser({});

        }
    }


    if (!user._id) {
        return (
            <div>
                <h4>Por favor indique el id de la cuenta a eliminar</h4>
                <form action="deleteUser">Id del usuario
                    <p></p>
                    <input type="text" value={userId} onChange={(e)=>{setUserId(e.target.value)}}/>
                    <p></p>
                    <button onClick={(e)=>{getUserById(e)}}>Taer usuario</button>
                </form>
                                          
                <h4>{userId ? userId : null}</h4>
            </div>
        )

    }

    if (user._id) {
        return (
            <div>
                <h4>¿Está seguro que desea eilinar la cuenta indicada?</h4>

                <button onClick={(e)=>{deteleUserById(e)}}>Eliminar usuario</button>
                <p></p>
                <button onClick={(e)=>{setUser({})}}>Cancelar</button>

                <h4>El id que envío {userId ? userId : null}</h4>
                <p></p>                                        
                <h4>Nombre del usuario: {user.name ? user.name : null}</h4>
                <h4>Id de cuenta: {user._id ? user._id : null}</h4>   
            </div>
        )

    }
}