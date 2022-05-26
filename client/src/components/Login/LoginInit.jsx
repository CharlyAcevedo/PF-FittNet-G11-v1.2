import { useState } from "react";
import axios from "axios";

export default function LoginInit () {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("");
    
    function onSubmit(e) {
        let userLogin;

        console.log('está saliendo el post ', userLogin )

        e.preventDefault()

        if (email && password) {
            userLogin = { email: email, password: password };

            console.log('está saliendo el post ', userLogin )

            axios.post('http://localhost:3001/api/login', userLogin)
            .then((res)=>{  
              console.log(res.data, '-> viendo qué respondio el post')              

              if(res.data.length === 0) {
                setError('usuario o password incorrecta');
                setPassword("");
                setEmail("");
              }
              if(res.data.length === 1) {
             
                console.log(res.data, ' lo que debería setear en las cookies');

                return  window.location = "http://localhost:3000/home"
              }
              if (typeof res.data === "string") {
                setError('usuario o password incorrecta');
                setPassword("");
                setEmail("");

              }

              
              
            })
            .catch((error) => console.log(error))

        }

    }


    return (
        
        <div>
            <div> Entraste en / Login </div>
            <div> Quiero ver el formulario de login </div>
            <div>
                <h1>Iniciar sesión</h1>
                <h2>Email state: {email}</h2>
                <h2>Password state: {password}</h2>

                <form >

                  <input type='email' value= {email} 
                  name='email' placeholder='Email' required 
                  onChange = {(e) => setEmail(e.target.value)}/>

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
