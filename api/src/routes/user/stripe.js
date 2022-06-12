const router = require("express").Router();
const Stripe = require('stripe')
require("dotenv").config();
const { API_STRIPE } = process.env;

const stripe = new Stripe(API_STRIPE)

router.post('/', async (req, res) => {
    const { id, amount } = req.body;
    const payment = await stripe.paymentIntents.create({
        amount: amount,
        transfer_data: {
            amount: amount * .9,
            destination: 'acct_1L8ue22QtfyOgkUu',
        },
        currency: 'usd',
        payment_method: id,
        transfer_group: 'ORDER10',
        confirm: true,
    })
    res.send('todok')
})

module.exports = router;
