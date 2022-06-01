import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

// Esta es la ruta del back que podemos usar
// router.post('/updatepassword', async (req, res, next) => {
// if (userId && newPassword && oldPassword && !secretToken) { // Actualizo una vieja contraseña  
// if (userId && newPassword && !oldPassword && secretToken) { // Seteo un nueva contraseña
// if (userId && !newPassword && !oldPassword && !secretToken) { // Reinicio la contraseña

// Voy a entrar en el primer if de arriba
// Esto es lo que le voy a envíar desde el front
// let form = {
//   userId: userId,
//   oldPassword: oldPassword,
//   newPassword: newPassword
// }
export default function UpdatePasword () {
  // Esta función sirve para cuando alguien quiere actualizar su contraseña.
  let {userId} = useParams();
 
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [copyNewPassword, setCopyNewPassword] = useState("");
  const [error, setError] = useState("");



  // Falta setear errores según la validación que queramos


  function onSubmit (e) {
    e.preventDefault()
    if ( userId && oldPassword && newPassword && copyNewPassword && !error) {
        if (newPassword === copyNewPassword && newPassword !== oldPassword ) {
            let form = {
                userId: userId,
                oldPassword: oldPassword,
                newPassword: newPassword
            }
            // Enviar formulario luego de esta línea
            console.log(form, "se envía el formulario")
            // Acá iría la petición con axios donde se manda el form a la ruta de actualización
            window.alert('Contraseña actualizada')
            return (window.location = "http://localhost:3000/login");
        } else {
            window.alert("Verifique los datos del formulario");

        }
    } else {
        window.alert("Verifique los datos del formulario");
    }    

  }

  return (
    <form >     
        {oldPassword ? oldPassword : null}
        <br />
        {newPassword ? newPassword : null}
        <br />
        {copyNewPassword ? copyNewPassword : null}

        <p>Indique su email y luego haga click en "Enviar"</p>
        <p>Luego verifique su correo y confime el mensaje para continuar</p>
       
        <input type='password' value= {oldPassword} 
        name='oldPassword' placeholder='Old password' required 
        onChange = {(e) => setOldPassword(e.target.value)}/>

        <input type='password' value= {newPassword} 
        name='newPassword' placeholder='New password' required 
        onChange = {(e) => setNewPassword(e.target.value)}/>

        <input type='password' value= {copyNewPassword} 
        name='copyNnewPassword' placeholder='New password' required 
        onChange = {(e) => setCopyNewPassword(e.target.value)}/>

        <h6>{error ? error : null }</h6>        

        <input type='submit' value='Confirmar'  onClick={(e)=>onSubmit(e)} />

    </form>
        
  )
}