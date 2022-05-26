import { useState } from "react";
import axios from "axios";

export default function LoginInit () {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("");
    
    function onSubmit(e) {
        let userLogin;

        console.log('está saliendo el post ', userLogin )

        e.preventDefault()

        if (username && password) {
            userLogin = { username: username, password: password };

            console.log('está saliendo el post ', userLogin )

            axios.post('http://localhost:3001/api/login', userLogin)
            .then((res)=>{  
              console.log(res.data, '-> viendo qué respondio el post')              
                          
              if(res.data.login) {
                // setError("");
                // setPassword("");
                // setUsername("");             
                console.log(res.data, ' lo que debería setear en las cookies');
                let id = res.data.userId;
                let name = res.data.name;
                return  window.location = `http://localhost:3000/home/${id}/${name}`
              }
              if (typeof res.data === "string") {
                setError('usuario o password incorrecta');
                setPassword("");
                setUsername("");

              }

              
              
            })
            .catch((error) => console.log(error))

        }

    }


    return (
        
        <div>
            <div> Entraste en / Login </div>
            <div> Email 1: "Franco@mail.com" pass: "1234" </div>
            <div> Email 2: "Toni@mail.com" pass: "1234" </div>
            <div>
                <h1>Iniciar sesión</h1>
                <h2>Email state: {username}</h2>
                <h2>Password state: {password}</h2>

                <form >

                  <input type='email' value= {username} 
                  name='email' placeholder='Email' required 
                  onChange = {(e) => setUsername(e.target.value)}/>

                  <input type='password' value= {password} 
                  name='password' placeholder='Contraseña' required 
                  onChange = {(e) => setPassword(e.target.value)}/>
                  <h3>{error === "" ? null : error}</h3>

                  <input type='submit' value='Ingresar'  onClick={(e)=>onSubmit(e)} />

                </form>
                <button>Ingresa con tu cuenta Google</button>
                <br />
                
                {/* <a href="#">Falta hacer la verificación con Google</a> */}
                <br />
                <a href='/register'>Crear cuenta</a>
                <br />
                <a href='/'>Volver</a>        
            </div>
        </div>


    )
}
