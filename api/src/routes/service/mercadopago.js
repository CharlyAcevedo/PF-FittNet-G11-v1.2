const mongoose = require('mongoose');
const mercadopago = require('mercadopago')
const { Router } = require("express");
const router = Router();
// const Order = require('../../models/Order');

require("dotenv").config();
const { ACCESS_TOKEN } = process.env;

//Me traigo el SDK de MP
mercadopago.configure({
    access_token: ACCESS_TOKEN
})



//Llamo a Mp con los datos de los Planes
router.post('/mercadopago', (req, res, next)=>{
    console.log(req.body)
    const id = req.body._id
    const tittle = req.body.planName
    const unit_price = req.body.price.$numberDecimal

        const items_ml = [{
        tittle: tittle,
        unit_price: parseInt(unit_price),
        quantity: 1
    }]
    //Creo el objeto con las preferencias para MP
    let preference = {
        items:items_ml,
        external_reference: `${id}`,
        payment_methods: {
            excluded_payment_types:[
                {id:'atm'}
            ],
        installments: 1 //Maximo de cuotas
    },
    back_urls:{
        success: 'http://localhost:3001/mercadopago/pagos',
        failure: 'http://localhost:3001/mercadopago/pagos',
        pending: 'http://localhost:3001/mercadopago/pagos',
    }
    }

mercadopago.preferences.create(preference)

.then(function (response){
    console.info('respondio')
    global.id = response.body.id;
    console.log(response.body)
    res.json({id: global.id})
})
.catch(function(error){
    console.log(error)
})
});


module.exports = router;