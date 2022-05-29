import React from "react";
import style from './styles/NavBar.module.css'



export default function NavBar() {

return (
        <nav className={style.nav}>
               <a href={'/'} ><img src="https://res.cloudinary.com/salta/image/upload/v1653527603/logo_transparent_fittnet_lak36a.png" alt='' style={{width: "145px", height: "68px"}}/></a>
                <ul className={style.ul}>
                
                <a href={'/legendCe'} ><button>Sos propietario? Unite!</button></a>
                
                <a href={'/legendUf'} ><button>Beneficios para miembros</button></a>

                <a href={'/register'} ><button id={style.butt}>Prueba gratis!</button></a>
              
              </ul>
             </nav>
    )
}

