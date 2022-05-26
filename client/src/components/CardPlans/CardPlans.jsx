import React from 'react'
import style from './style/CardPlans.module.css'


export default function CardPlans (){

    return (
        <div className={style.containCp}>
            <div className={style.containEx}>
                <h2>Estandar</h2>
                <ul>
                    <li> Tu anuncio tendrá un alcance del 20% en busquedas de usuarios!</li>
                    <li> Podras gestionar tus cupos, horarios y perfil!</li>
                    <li> Contaras con un panel de control e historial de ventas!</li>
                    <li> Otorgarás visibilidad a tus casos de exito!</li>
                </ul>
                <h4>Costo mensual: $3000</h4>
                <h4>Comision sobre venta de servicio: 0,20%</h4>
                <h4>Sin comision sobre venta de productos!</h4>
            </div>
            <div className={style.containEx}>
            <h2>Premium</h2>
            <ul>
                    <li> Tu anuncio tendrá un alcance del 30% en busquedas de usuarios!</li>
                    <li> Podras gestionar tus cupos, horarios y perfil!</li>
                    <li> Contaras con un panel de control e historial de ventas!</li>
                    <li> Otorgarás visibilidad a tus casos de exito!</li>
                </ul>
                <h4>Costo mensual: $4000</h4>
                <h4>Comision sobre venta de servicio: 0,20%</h4>
                <h4>Sin comision sobre venta de productos!</h4>
            </div>
            <div className={style.containEx}>
            <h2>Golden</h2>
            <ul>
                    <li> Tu anuncio tendrá un alcance del 50% en busquedas de usuarios!</li>
                    <li> Podras gestionar tus cupos, horarios y perfil!</li>
                    <li> Contaras con un panel de control e historial de ventas!</li>
                    <li> Otorgarás visibilidad a tus casos de exito!</li>
                </ul>
                <h4>Costo mensual: $5000</h4>
                <h4>Comision sobre venta de servicio: 0,20%</h4>
                <h4>Sin comision sobre venta de productos!</h4>
            </div>
        </div>
    )
}