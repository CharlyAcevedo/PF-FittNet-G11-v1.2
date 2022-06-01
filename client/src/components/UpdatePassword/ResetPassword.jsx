import React from "react";
import { useState } from "react";

// Esta es la ruta del back que podemos usar
// router.post('/updatepassword', async (req, res, next) => {
// if (userId && newPassword && oldPassword && !secretToken) { // Actualizo una vieja contraseña  
// if (userId && newPassword && !oldPassword && secretToken) { // Seteo un nueva contraseña
// if (userId && !newPassword && !oldPassword && !secretToken) { // Reinicio la contraseña

// 1 Me pasa el username en el formulario (email)
// 2 Le envío un secret token a su correo electrónico
// 4 El back me tiene que devolver el userId del usuario
// 5 Armo un objeto con el userId, la newPassword y el token
// 6 Verifico tener los dos datos anteriores más validation (estado)
// 7 Mando el put al back y tengo que recibir un mensaje de confirmación o rechazo
// 8 Redirijo al usuario a login
//---------------------------------------------------------------------
// Esto es lo que le voy a envíar desde el front

// 1ra llamada al back (voy a entrar en el tercer if de arriba)
// le envío --> obj1 = {userName: userName}
// El back responde enviandome el userId de usuario al front
// y además me envia un correo con un secretToken

// 2da llamda al back (voy a entrar en el segundo if de arriba)
// let obj2 = {userId: userId, newPassword: newPassword, secretToken: secretToken}
// Me responde con un mensaje de confirmación



export default function ResetPassword() {
  // Esta función sirve para cuando alguien quiere recuperar una contraseña que olvidó.
  // Pienso envíar una solicitud directamente al back (ver bien a qué ruta), y luego
  // evaluar su respueta para setear la validación (setValidatio), y cuando la tenga paso al 
  // segundo renderizado if(validation) que me va a permitir armar un form para 
  // el back. Y en el proximo llamado al back setearía una nueva contraseña.
  // También necesito controlar los formularios e ir seteando errores y mostrarlos.
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