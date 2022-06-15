const mongoose = require('mongoose');
const mercadopago = require('mercadopago')
const { Router } = require("express");
const router = Router();
const Payment = require("../../models/Payments")
const Partner = require("../../models/Partner")

require("dotenv").config();
const { ACCESS_TOKEN } = process.env;

//Me traigo el SDK de MP
mercadopago.configure({
    access_token: ACCESS_TOKEN
})



//Llamo a Mp con los datos de los Planes
router.post('/', (req, res)=>{
    console.log(req.body)
    const idPartner = [req.body[1], req.body[0]._id]
    const tittle = req.body[0].planName
    const unit_price = req.body[0].price.$numberDecimal
    const id = req.body[0]._id


        const items_ml = [{
        id: id,
        title: tittle,
        unit_price: parseInt(unit_price),
        quantity: 1
    }]
    //Creo el objeto con las preferencias para MP
    let preference = {
        items:items_ml,
        external_reference: `${idPartner}`,
        payment_methods: {
            excluded_payment_types:[
                {id:'atm'}
            ],
        installments: 1 //Maximo de cuotas
    },
    back_urls:{
        success: 'http://localhost:3001/api/service/mercadopago/pagos',
        failure: 'http://localhost:3001/api/service/mercadopago/pagos'
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

router.get('/pagos', async (req, res) =>{
    console.info('lo que me devuelve MP', req)
    console.log('Querys', req.query)
    const arrayIds = req.query.external_reference.split(',')
    const idPartner = arrayIds[0]
    const idPlan = arrayIds[1]

    const partnerUpDate = await Partner.findByIdAndUpdate(idPartner, {
        planType: idPlan,
        paidOut: true},
        {new: true}
    )

    const paymentCreate = new Payment({partner: idPartner, description: 'Pago del mes', plan: idPlan})
    await paymentCreate.save()


    res.redirect("http://localhost:3000")

})

module.exports = router;