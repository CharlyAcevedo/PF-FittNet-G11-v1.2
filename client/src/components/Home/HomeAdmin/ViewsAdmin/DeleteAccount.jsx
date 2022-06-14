import React from "react"
import { useState } from "react"
import axios from "axios";
import { SweetAlrt, SweetAlrtTem } from "../../../../asets/helpers/sweetalert";

export default function DeteleteAccount() {
    const [userId, setUserId] = useState("");
    const [user, setUser] = useState({});

    async function getUserById(e) {
        e.preventDefault();
        if (userId.length > 5) {
            console.log(userId, "voy a buscar el user por id a la db")
            // Voy a tener que mandar headers
            const getUser = await axios({
                  method: 'get',
                  url: `/api/admin/userId/${userId}`,   
                  headers: {'X-Requested-With': 'XMLHttpRequest'},
                  withCredentials: true
                })  
                .then((res) => { return res.data })
                .catch((error) => console.log(error))
            
            console.log(getUser, 'la respuesta del back')
            if (getUser === null) return SweetAlrtTem('Id no encontrado',"error")
            // if (getUser.user === null) return window.alert('Id no encontrado')
            setUser(getUser);
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
            if (userDelete === undefined) return SweetAlrtTem("No se pudo eliminar el usuario","error")    
                
            SweetAlrt("Exito!",`${userDelete.name} ha sido eliminado con éxito`,"success")
            setUserId("");
            setUser({});

        }
    }


    if (!user._id) {
        return (
            <div>
                <h4 style={{padding: "10px"}}
                >Por favor indique el id de la cuenta a eliminar</h4>

                <form style={{padding: "10px"}} action="deleteUser">Id del usuario
                    <p></p>
                    <input style={{marginBottom: "10px"}} type="text" value={userId} onChange={(e)=>{setUserId(e.target.value)}}/>
                    <p></p>
                    <button style={{padding: "5px", marginRight:"30px"}} 
                    onClick={(e)=>{getUserById(e)}}>Taer usuario</button>
                </form>
                                          
                <h4>{userId ? userId : null}</h4>
            </div>
        )

    }

    if (user._id) {
        return (
            <div>
                <h4 style={{paddingBottom: "15px"}}>¿Está seguro que desea eliminar la cuenta indicada?</h4>

                <button style={{padding: "5px", marginRight:"30px"}} 
                onClick={(e)=>{deteleUserById(e)}}>Eliminar usuario</button>
                <button style={{padding: "5px", marginRight:"30px"}}
                onClick={(e)=>{setUser({}); setUserId("")}}>Cancelar</button>

                <p></p>
                
                <div>
                    <h3 style={{paddingBottom: "15px", paddingTop: "15px"}}>Cuena a eliminar</h3>                                        
                    <h4>Tipo de cuenta: {user.type ? user.type : null}</h4>   
                    <h4>Nombre del usuario: {user.name ? user.name : null}</h4>
                    <h4>Nombre de la cuenta: {user.userName ? user.userName : null}</h4>
                    <h4>Id de cuenta: {user._id ? user._id : null}</h4>
                </div>
            </div>
        )

    }
}