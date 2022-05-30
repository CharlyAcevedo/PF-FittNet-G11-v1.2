import React from "react";
import { useState } from "react";



export default function UpdatePasword () {
  // Esta función sirve para cuando alguien quiere actualizar su contraseña.

  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [copyNewPassword, setCopyNewPassword] = useState("");
  const [error, setError] = useState("");

  function onSubmit (e) {
    e.preventDefault()
    if (username && oldPassword && newPassword && copyNewPassword && !error) {
        if (newPassword === copyNewPassword && newPassword !== oldPassword ) {
            let form = {
                username: username,
                oldPassword: oldPassword,
                newPassword: newPassword
            }
            // Enviar formulario luego de esta línea
            console.log(form, "se envía el formulario")
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
        {username ? username : null}
        <br />
        {oldPassword ? oldPassword : null}
        <br />
        {newPassword ? newPassword : null}
        <br />
        {copyNewPassword ? copyNewPassword : null}

        <p>Indique su email y luego haga click en "Enviar"</p>
        <p>Luego verifique su correo y confime el mensaje para continuar</p>

        <input type='email' value= {username} 
        name='email' placeholder='Email' required 
        onChange = {(e) => setUsername(e.target.value)}/>

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