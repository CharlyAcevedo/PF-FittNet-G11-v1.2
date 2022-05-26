import React from "react";
import img from '../images/logoPF.jpg'
import style from './styles/NavBar.module.css'



export default function NavBar() {

return (
        <nav className={style.nav}>
               <a href={'/'} ><img src={img} alt='' /></a>
                <ul className={style.ul}>
                
                <a href={'/legendCe'} ><button>Sos propietario? Unite!</button></a>
                
                <a href={'/legendUf'} ><button>Beneficios para miembros</button></a>

                <a href={'/registration'} ><button id={style.butt}>Prueba gratis!</button></a>
              
              </ul>
             </nav>
    )
}

