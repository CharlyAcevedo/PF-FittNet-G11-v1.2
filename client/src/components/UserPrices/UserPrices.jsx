import React from "react";
import Table from 'react-bootstrap/Table'
import 'bootstrap';
import style from './styles/UserPrices.module.css';
// import gym from '../../asets/images/gym2.jpg'
// import gym1 from '../../asets/images/gym5.jpg'
// import gym2 from '../../asets/images/gym4.jpg'
// import gym3 from '../../asets/images/gym5.jpg'
// import gym4 from '../../asets/images/gym2.jpg'
// import gym5 from '../../asets/images/gym4.jpg'
// import gym6 from '../../asets/images/gym5.jpg'
// import gym7 from '../../asets/images/gym2.jpg'



export default function NavBar() {
    const planes = [
        {
            planName: "Inicial",
            planPrice: "$1500",
            planDetail: "El plan ideal para empezar tu preparacion.",
            planGyms: "Mas de 50.",
            planSessions: "2 por semana.",
            planNutrition: "No disponible",
            planPreium: "No disponible."
        },
        {
            planName: "Básico",
            planPrice: "$3000",
            planDetail: "El paso necesario para avanzar de nivel.",
            planGyms: "Mas de 120.",
            planSessions: "3 por semana.",
            planNutrition: "Seguimiento",
            planPreium: "No disponible."
        },
        {
            planName: "Premium",
            planPrice: "$6000",
            planDetail: "El plan perfecto para avanzados.",
            planGyms: "Mas de 220.",
            planSessions: "5 por semana.",
            planNutrition: "Seguimiento y suplementos",
            planPreium: "No disponible."
        },
        {
            planName: "Gold",
            planPrice: "$9000",
            planDetail: "El plan que ofrece todo los beneficios de la red.",
            planGyms: "Mas de 250.",
            planSessions: "Ilimitadas.",
            planNutrition: "Seguimiento y suplementos",
            planPreium: "Disponible."
        }
    ]

    const classes = [
        {
            classesName: "Pesas y máquinas",
            classesDetails: "Entrenamiento con rutina para levantamiento de pesas.",
            classesDuration: "duracion estimada 1:15 hrs.",
            classesPrice: "$300 por sesion"
        },
        {
            classesName: "Crossfit",
            classesDetails: "Entrenamiento con rutina para levantamiento de pesas.",
            classesDuration: "duracion estimada 1:15 hrs.",
            classesPrice: "$300 por sesion"
        },
        {
            classesName: "Dance",
            classesDetails: "Entrenamiento con rutina para levantamiento de pesas.",
            classesDuration: "duracion estimada 1:15 hrs.",
            classesPrice: "$300 por sesion"
        },
        {
            classesName: "Kick boxing/Box",
            classesDetails: "Entrenamiento con rutina para levantamiento de pesas.",
            classesDuration: "duracion es   timada 1:15 hrs.",
            classesPrice: "$300 por sesion"
        },
        {
            classesName: "Clases de gimnasia",
            classesDetails: "Entrenamiento con rutina para levantamiento de pesas.",
            classesDuration: "duracion estimada 1:15 hrs.",
            classesPrice: "$300 por sesion"
        },
        {
            classesName: "Spinning",
            classesDetails: "Entrenamiento con rutina para levantamiento de pesas.",
            classesDuration: "duracion estimada 1:15 hrs.",
            classesPrice: "$300 por sesion"
        },
        {
            classesName: "Yoga",
            classesDetails: "Entrenamiento con rutina para levantamiento de pesas.",
            classesDuration: "duracion estimada 1:15 hrs.",
            classesPrice: "$300 por sesion"
        },
        {
            classesName: "Pilates",
            classesDetails: "Entrenamiento con rutina para levantamiento de pesas.",
            classesDuration: "duracion estimada 1:15 hrs.",
            classesPrice: "$300 por sesion"
        }       
    ]

    return (
        <div className={style.prices_table_container}>
        <h1>
            Elegí la suscripcion que mas se adapte a vos <br />
            o toma las clases individuales que mas te gustan.
        </h1>
            <Table responsive='md' className={style.prices_table}>
                <thead>
                    <tr>
                        <th></th>
                        {planes.map(a => (
                            <th key={a}>
                                {a.planName}
                            </th>
                        ))}
                    </tr>
                    <tr>
                        <th></th>
                        {planes.map(d => (
                            <td key={d}>{d.planDetail}</td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Cuota<br />mensual</td>
                        {planes.map(b => (

                            <td key={b}>{b.planPrice}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Gimnasios<br />disponibles</td>
                        {planes.map(b => (

                            <td key={b}>{b.planGyms}</td>
                        ))}
                    </tr>
                    <tr>

                        <td>Seciones de<br />entrenamiento<br />mensual</td>
                        {planes.map(b => (
                            <td key={b}>{b.planSessions}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Seguimiento<br />nutricional</td>
                        {planes.map(b => (
                            <td key={b}>{b.planNutrition}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Clases premium<br />(yoga, pilates, <br />spa room)</td>
                        {planes.map(b => (
                            <td key={b}>{b.planPreium}</td>
                        ))}

                    </tr>
                </tbody>
            </Table>

            <Table responsive='md' className={style.classes_table_container}>
                <div className={style.expand} >Pesas y maquinas</div>
                <div className={style.expand} >Crossfit</div>
                <div className={style.expand} >Dance</div>
                <div className={style.expand} >Kick boxing/Box</div>
                <div className={style.expand} >Clases de gimnasia</div>
                <div className={style.expand} >Spinning</div>
                <div className={style.expand} >Yoga</div>
                <div className={style.expand} >Pilates</div>
            </Table>
        </div>
    )
}