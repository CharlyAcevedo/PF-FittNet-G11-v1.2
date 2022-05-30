import React from "react";
import img from '../../asets/images/logoPF.jpg'
import style from '../LegendCe/styles/LegendCe.module.css'
import Slider from "../Slider/Slider";
import CardPlans from '../CardPlans/CardPlans'


export default function LegendCe(){

    return (
        <div className={style.container}>
                <h1>Porque FittNet? <a href={'/'} > <img className={style.logo} src={img} alt= '' /></a></h1>
            <div className={style.legend}>
            <h3>Nuestro propósito es facilitar el acceso a la práctica de actividad física de alta calidad,
                al mismo tiempo brindar una manera fácil y segura de acercar la tecnología a los procesos administrativos.
                Generamos contenido publicitario exitoso, enfocado a las necesidades de los usuarios,
                de esta manera logramos expandir la cartera de nuestros clientes, multiplicando sus ingresos! 
            </h3>
            </div>
            <div className={style.containSiler}>
            <Slider className={style.containSiler} />
            <button className={style.btn}> <a href={'/'} ></a>REGISTRATE</button>
            </div>
            <div className={style.containCard} >
            <CardPlans /> 
            </div>
        </div>
    )
};

