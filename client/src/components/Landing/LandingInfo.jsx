import React from 'react'
import { Link } from 'react-router-dom';
import './styles/Landing.css'
import strong from '../../asets/images/gym2.jpg'
import mujerHombre from '../../asets/images/man-1920.jpg'
import uniteGyms from '../../asets/images/modern-gym.jpg'


export default function LandingInfo() {

    return (
        <div>           
            <div className='ingresar_registrarse'>
                <img className='image_strong' src={strong} alt="" />
                <Link className='ingresar' to='/login'>Ingresar</Link>
                <Link className='registrarse' to='/register'>Registrarse</Link>
                <p className='parrafo1_landing'>La red de los mejores gimnasios acompañandote durante
                    todo el proceso de cambio</p>
            </div>
            <div className='promo_div'>
                <Link className='promos' to='/precios'>Conocé nuestras promos</Link>
            </div>
            <div>
                <p className='titulo_empeza'>El cambio empieza adentro tuyo</p>
                <p className='footer_empeza'>Unite a la red de los mejores gimnasios,
                aprovecha sus planes y empeza a sentirte bien.</p>
                <Link className='empeza_aqui' to='/login'>Empezá aquí</Link>
                <img className='mujer_hombre' src={mujerHombre} alt="" />
            </div>
            <div className='promos_usuarios'>
                <div className='promo_balance'>
                    <h2 className='balance_titulo'>Pack Balance Care</h2>
                    <ul className='balance_lista'>
                        <li>Planes de dieta</li>
                        <li>Clases de gimnasia indoor</li>
                        <li>Entrenamiento de pesas y maquinas</li>
                        <li>Entrenamiento de artes marciales</li>
                    </ul>
                        <h2>$6000/mensual</h2>
                </div>
                <div className='promo_bulk'>
                    <h2 className='bulk_titulo'>Pack Pro Bulk</h2>
                    <ul className='bulk_lista'>
                        <li>Pack Balance Care +</li>
                        <li>Seguimiento personalizado</li>
                        <li>Clases premium: pilates, yoga, spa room</li>
                        <li>Suplementos</li>
                    </ul>
                        <h2>$9000/mensual</h2>
                </div>
            </div>
            <div className='unite_container'>
                <p className='titulo_unite'>Uní tu Gym a la evolucion del FittNet</p>
                <p className='footer_unite'>Formá parte de la red mas importante de gimnasios
                del pais y empeza a crecer.</p>
                <Link className='unite_aqui' to='/login'>Unite aquí</Link>
                <img className='unite_gyms' src={uniteGyms} alt="" />
            </div>
        </div>
    )
}

