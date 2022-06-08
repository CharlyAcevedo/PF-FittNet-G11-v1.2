const router = require("express").Router();
const Stripe = require('stripe')
require("dotenv").config();
const { API_STRIPE } = process.env;



const stripe = new Stripe(API_STRIPE)
// router.get('/', getShopCart)
router.post('/', async (req, res)=>{
    const {id, amount} = req.body;
    const payment = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'ARS',
        payment_method: id,
        confirm: true
    })
    console.log(payment)
    res.send('todok')
})


module.exports = router;
