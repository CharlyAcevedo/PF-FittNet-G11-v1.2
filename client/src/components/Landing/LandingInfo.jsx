import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setUserGeo } from '../../redux/actions/index';
import strong from '../../asets/images/gym2.jpg';
import mujerHombre from '../../asets/images/man-1920.jpg';
import uniteGyms from '../../asets/images/modern-gym.jpg';
import style from '../Landing/styles/Landing.module.css';


export default function LandingInfo() {

    const dispatch = useDispatch()
   
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const payload = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          dispatch(setUserGeo(payload))
        },
        function (error) {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
        }
      );// eslint-disable-next-line
    }, []);
    
    return (
        <div>                   
            <div className={style.ingresarRegistrarse}>
                <img className={style.imageStrong} src={strong} alt="" />
                <Link className={style.ingresar} to='/login'>Ingresar</Link>
                <Link className={style.registrarse} to='/register'>Registrarse</Link>
                <p className={style.parrafo1Landing}>La red de los mejores gimnasios acompañandote durante
                    todo el proceso de cambio</p>
            </div>
            <div className={style.promoDiv}>
                <Link className={style.promos} to='/userprices'>Conocé nuestras promos</Link>
            </div>
            <div>
                <p className={style.tituloEmpeza}>El cambio empieza adentro tuyo</p>
                <p className={style.footerEmpeza}>Unite a la red de los mejores gimnasios,
                aprovecha sus planes y empeza a sentirte bien.</p>
                <Link className={style.empezaAqui} to='/login'>Empezá aquí</Link>
                <img className={style.mujerHombre} src={mujerHombre} alt="" />
            </div>
            <div className={style.promosUsuarios}>
                <div className={style.promoBalance}>
                    <h2 className={style.balanceTitulo}>Pack Balance Care</h2>
                    <ul className={style.balanceLista}>
                        <li>Planes de dieta</li>
                        <li>Clases de gimnasia indoor</li>
                        <li>Entrenamiento de pesas y maquinas</li>
                        <li>Entrenamiento de artes marciales</li>
                    </ul>
                        <h2>$6000/mensual</h2>
                </div>
                <div className={style.promoBulk}>
                    <h2 className={style.bulkTitulo}>Pack Pro Bulk</h2>
                    <ul className={style.bulkLista}>
                        <li>Pack Balance Care +</li>
                        <li>Seguimiento personalizado</li>
                        <li>Clases premium: pilates, yoga, spa room</li>
                        <li>Suplementos</li>
                    </ul>
                        <h2>$9000/mensual</h2>
                </div>
            </div>
            <div className={style.uniteContainer}>
                <p className={style.tituloUnite}>Uní tu Gym a la evolucion del FittNet</p>
                <p className={style.footerUnite}>Formá parte de la red mas importante de gimnasios
                del pais y empeza a crecer.</p>
                <Link className={style.uniteAqui} to='/login'>Unite aquí</Link>
                <img className={style.uniteGyms} src={uniteGyms} alt="" />
            </div>
        </div>
    )
}

