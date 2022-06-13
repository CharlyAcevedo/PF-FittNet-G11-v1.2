import React, { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { getPlans } from "../../../../redux/actions";
import axios from 'axios'
import CheckOut from "./CheckOut";
import {useState} from 'react'


export function Plans () {
const plan = useSelector((state) => state.plans);
const dispatch = useDispatch();
const [datos, setDatos] = useState('');

useEffect(() => {
    dispatch(getPlans())
}, [])

async function onSubmit (value){
    let data;
    if(value === 'Premium'){
        data = plan[0]
    }
    if(value === 'Golden'){
        data = plan[2]
    }
    if(value === 'Standar'){
        data = plan[1]
    }
    await axios({
        method: "post",
        url: "/api/service/mercadopago",
        data: data,
        headers: { "X-Requested-With": "XMLHttpRequest" },
        withCredentials: true,
      })
    .then((data)=>{
        setDatos(data.data)
        console.info('contenido de data', data)
    })
    .catch(err => console.error(err))
    console.log('todopiola')
}

return (
        <div>
            <div>
                {console.log(plan)}
                { plan.length ? plan.map( p => { return (
                <div key={p.planName}>
                 <h3 >Plan: {p.planName}</h3>
                 <h3>Precio: {p.price.$numberDecimal}</h3>
                 <h4>Alcance: {p.services}</h4>
                 <br></br>
                 <h5>Cantidad de servicios: {p.servicePerGym}</h5>
                 <h5>Gimnasios admitidos: {p.gymsPermited}</h5>
                 <h5>Comision por venta de servicios: {p.commission.$numberDecimal}</h5>
                 </div>
                 )})

                  : 'Cargando...' }
                 <button onClick={() => onSubmit('Premium')}>Plan Premium</button>
                 <br></br>
                 <button onClick={() => onSubmit('Golden')}>Plan Golden</button>
                 <br></br>
                 <button onClick={() => onSubmit('Standar')}>Plan Standar</button>
                 {!datos ? <p>Aguarde un momento...</p>
                : <CheckOut data={datos} /> }
         </div>
        </div>
    )
}