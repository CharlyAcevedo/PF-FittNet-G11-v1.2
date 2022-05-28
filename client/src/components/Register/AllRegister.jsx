import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles/Register.css"

export default function AllRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState("");

  //falta validaciones de formulario.

  function onSubmit(e) {
    let userCreate;

    console.log("está saliendo el post ", userCreate);

    e.preventDefault();

    if (name && email && password && type) {
      userCreate = { name: name, username: email, password: password, type: type };

      console.log("está saliendo el post ", userCreate);

      axios
        .post("http://localhost:3001/api/register", userCreate)
        .then((res) => {
          console.log(res.data, "-> respuesta del post de creación de cuenta");

          if (res.data._id) {
            setName("");
            setEmail("");
            setPassword("");
            setError("");

            window.alert("Usuario creado con éxito");
            return (window.location = "http://localhost:3000/login");
          }
          if (typeof res.data === "string") {
            setName("");
            setEmail("");
            setPassword("");
            setError(res.data);

            window.alert(res.data);
          }
        })
        .catch((error) => console.log(error));
    }
  }
  
  return (
    <div class="container">
      <div class="screen">
        <div class="screen_content">
            <div class="sign">

              {/* button navBar */}
              <div class="content-heading">
                <Link to='/home'>
                  <div className='container_btn'>
                      <div className='logo_Container'>
                      </div>
                  </div>
                </Link>
                <div class='container_reg'>
                  <a href='/login' style={{textDecoration: "none"}} >Iniciar sesion</a>
                </div>
              </div>

            {/* Form register */}
            </div>
                <form class="login">
                    <div class="login_field">
                        <input
                          type='text' 
                          name="name"
                          className="login_input"
                          placeholder="Nombre" required
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                        />
                    </div>
                    <div class="login_field">
                        <input 
                          type='email' 
                          value= {email} 
                          name='email'
                          class="login_input" 
                          placeholder='Email' required 
                          onChange = {(e) => setEmail(e.target.value)}
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

                      <select
                        name="select"
                        onChange={(e) =>
                          e.target.value === "Tipo de cliente"
                            ? null
                            : setType(e.target.value)
                        }
                      >
                        <option value="Tipo de cliente">Tipo de cliente</option>
                        <option value="user">Usuario Final</option>
                        <option value="partner">Cliente Empresa</option>
                      </select>
                    <input
                      class="button login_submit"
                      type='submit' 
                      value='Registrarse'  
                      onClick={(e)=>onSubmit(e)}
                    />
                    <h3>{error ? error : null}</h3>
                    <div>
                    </div>
                </form>			
            </div>
            {/* screen background */}
            <div class="screen_background">
                <span class="screen_background_shape shape4"></span>
                <span class="screen_background_shape shape3"></span>		
                <span class="screen_background_shape shape2"></span>
                <span class="screen_background_shape shape1"></span>
            </div>
        
          </div>       
        </div>
  );
}
