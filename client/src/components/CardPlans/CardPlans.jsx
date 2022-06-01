import React from 'react'
import style from './style/CardPlans.module.css'


export default function CardPlans (){
    const plansPrice = [
        {
            planStandar: '$3000',
            planPremiun: '$4000',
            planGolden: '$5000'
        }
    ]
    const  plansPorcentage = [
        {
            planStandar: '0,20%',
            planPremiun: '0,30%',
            planGolden: '0,50%'   
        }
    ]


    return (
        <div className={style.containCp}>
            <div className={style.containEx}>
                <h2>Estandar</h2>
                     <ul>
                     <li>Tu anuncio tendrá un alcance del 20% en busquedas de usuarios!</li>
                     <li>Podras gestionar tus cupos, horarios y perfil!</li>
                     <li>Contaras con un panel de control e historial de ventas!</li>
                     <li>Otorgarás visibilidad a tus casos de exito!</li>
                 </ul>
               {plansPrice.map(a => (
                    <h4>Costo mensual: {a.planStandar}</h4>
               ))}
               {plansPorcentage.map(a => (
                    <h4>Comision sobre venta de servicio: {a.planStandar} </h4>
               ))}
            </div>
            <div className={style.containEx}>
            <h2>Premium</h2>
                     <ul>
                     <li>Tu anuncio tendrá un alcance del 30% en busquedas de usuarios!</li>
                     <li>Podras gestionar tus cupos, horarios y perfil!</li>
                     <li>Contaras con un panel de control e historial de ventas!</li>
                     <li>Otorgarás visibilidad a tus casos de exito!</li>
                 </ul>
               {plansPrice.map(a => (
                    <h4>Costo mensual: {a.planPremiun}</h4>
               ))}
               {plansPorcentage.map(a => (
                    <h4>Comision sobre venta de servicio: {a.planPremiun} </h4>
               ))}
            </div>
            <div className={style.containEx}>
            <h2>Golden</h2>
                     <ul>
                     <li>Tu anuncio tendrá un alcance del 50% en busquedas de usuarios!</li>
                     <li>Podras gestionar tus cupos, horarios y perfil!</li>
                     <li>Contaras con un panel de control e historial de ventas!</li>
                     <li>Otorgarás visibilidad a tus casos de exito!</li>
                 </ul>
               {plansPrice.map(a => (
                    <h4>Costo mensual: {a.planGolden}</h4>
               ))}
               {plansPorcentage.map(a => (
                    <h4>Comision sobre venta de servicio: {a.planGolden} </h4>
               ))}
            </div>
        </div>
    )
}