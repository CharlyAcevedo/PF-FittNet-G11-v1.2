import React from 'react'
import { useParams } from "react-router-dom";
// import axios from 'axios';
import { useState } from 'react';


export default function DeactivateAccount() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 

    const { userId } = useParams();

    function onChange (e) {

        setPassword(e.target.value);

        if (password.length < 2) { // Regex que quramos
            setError("Necesita introducir su contraseña para continuar con el proceso")
        } else {
            setError("");
        }

    }

    function onSubmit(e) {
        e.preventDefault()

        

        if (userId.length > 3 && password && !error) {
            // let object = {userId, password};

            console.log('sale el get al back');

            // axios.put(`/api/deleteuseraccount/`, object)
            // .then((response)=> {console.log(response.data)})
            // .catch((error)=> {console.lgo(error)})
            setPassword(""); // limpio el estado
        }

    }  
        
  
    return (

        <div>
            <p>Para borrar su cuenta por favor introdusca su contraseña y dé click en confirmar.</p>
            <form>
            <input type='password' value= {password} 
            name='password' placeholder='Password' required 
            onChange = {(e) => onChange(e)}/>

            <input type='submit' value='Confirmar'  onClick={(e)=>onSubmit(e)} />
            </form>
            {error ? error : null}
        </div>
    )
}