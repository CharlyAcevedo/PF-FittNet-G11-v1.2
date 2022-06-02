import React from "react";
import { useState } from "react";


export default function ResetPassword() {
  // Esta función sirve para cuando alguien quiere recuperar una contraseña que olvidó.
  // Pienso envíar una solicitud directamente al back (ver bien a qué ruta), y luego
  // evaluar su respueta para setear la validación (setValidatio), y cuando la tenga paso al 
  // segundo renderizado if(validation) que me va a permitir armar un form para 
  // el back. Y en el proximo llamado al back setearía una nueva contraseña.
  // También necesito controlar los formularios e ir seteando errores y mostrarlos.
  // 
  // Fernando.

  const [username, setUsername] = useState("");
  const [ validation, setValidation] = useState(""); // La tengo si el usuario confima el
  // electrónico que le vamos a enviar a su casilla de correo
  const [newPassword, setNewPassword] = useState("");
  const [copyNewPassword, setCopyNewPassword] = useState("");
  const [error, setError] = useState("");
  function onSubmit (e) {
    e.preventDefault();
    if(username && !error) {
        let obj = { username: username }
        setValidation("Simulo el cambio del estado")
        console.log('envío el objeto al back la solicitud al back para enviar el correo electrónico');
    }
  }

  function onSubmitForm (e) {
    e.preventDefault();
    if(!error && username && newPassword && copyNewPassword) {
        if(newPassword === copyNewPassword) {
            let form = { 
                username: username,
                newPassword: newPassword
            }
            console.log(form, "Tengo que enviar el formulario al back para el cambio de clave")
            window.alert('Contraseña cambiada, vuelva a iniciar sesión');
            return (window.location = "http://localhost:3000/login");
            
           
        }
    } else {
        window.alert("No pouede enviar la solicitud, por favor verifique los valores de los campos requeridos")
    }
  }

  if (validation === "") {
    return (
      <div>
          <form >
              {validation ? validation : null}
              {username ? username : null }
              <p>Indique su email y luego haga click en "Enviar"</p>
              <p>Luego verifique su correo y confime el mensaje para continuar</p>            
              <input type='email' value= {username} 
              name='email' placeholder='Email' required 
              onChange = {(e) => setUsername(e.target.value)}/>
              <h6>{error ? error : null }</h6> 
              <input type='submit' value='Enviar'  onClick={(e)=>onSubmit(e)} />
          </form>
      </div>      
    )
  }

  if (validation !== "") {
    return (
        <div>
            <form >
                {username ? username : null }
                <br />                           
                {newPassword ? newPassword : null }
                <br />                          
                {copyNewPassword ? copyNewPassword : null }
                <br />                           
                <h6>{error ? error : null }</h6> 

                <input type='email' value= {username} 
                name='email' placeholder='Email' required 
                onChange = {(e) => setUsername(e.target.value)}/>

                <input type='email' value= {newPassword} 
                name='email' placeholder='Email' required 
                onChange = {(e) => setNewPassword(e.target.value)}/>

                <input type='email' value= {copyNewPassword} 
                name='email' placeholder='Email' required 
                onChange = {(e) => setCopyNewPassword(e.target.value)}/>

                <input type='submit' value='Confirmar'  onClick={(e)=>onSubmitForm(e)} />
            </form>
        </div>      
      )

  }
  

      
}