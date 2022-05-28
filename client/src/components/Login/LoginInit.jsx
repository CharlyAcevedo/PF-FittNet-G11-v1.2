import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './styles/Login.css'

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
                         
                console.log(res.data, ' lo que responde el back si se autentica el user');
                let { userId, name, type, avatar } = res.data;
              
                if (typeof avatar === 'string') {
                  return  window.location = `http://localhost:3000/home/${type}/${name}/${userId}/${avatar}`
                }
                // ya le paso info por params de quién estamos hablando
                return  window.location = `http://localhost:3000/home/${type}/${name}/${userId}`
                
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
    <div class="container">

                  <div class="screen">
                    <div class="screen_content">
                        <div class="sign">

                          <div class="content-heading">
                            <Link to='/'>
                              <div className='container_btn'>
                                  <div className='logo_Container'>
                                  </div>
                              </div>
                            </Link>
                              <div class='container_reg'>
                                <a href='/register' style={{textDecoration: "none"}} >Crear cuenta</a>
                              </div>
                          </div>
                        </div>
                            <form class="login">
                                <div class="login_field">
                                    <input 
                                      type='email' 
                                      value= {username} 
                                      name='email'
                                      class="login_input" 
                                      placeholder='Email' required 
                                      onChange = {(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div class="login_field">
                                    <input 
                                      type='password' 
                                      value= {password} 
                                      name='password' 
                                      class="login_input"
                                      placeholder='Contraseña' required 
                                      onChange = {(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <h3>{error === "" ? null : error}</h3>

                                <input
                                  class="button login_submit"
                                  type='submit' 
                                  value='Ingresar'  
                                  onClick={(e)=>onSubmit(e)}
                                />
                            </form>			
                        </div>
                        <div class="screen_background">
                            <span class="screen_background_shape shape4"></span>
                            <span class="screen_background_shape shape3"></span>		
                            <span class="screen_background_shape shape2"></span>
                            <span class="screen_background_shape shape1"></span>
                        </div>
                      </div>       
                    </div>
                    
                


    )
}
