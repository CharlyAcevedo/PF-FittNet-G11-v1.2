const router = require("express").Router();
const Stripe = require('stripe')
require("dotenv").config();
const { API_STRIPE } = process.env;



const stripe = new Stripe(API_STRIPE)
router.post('/', async (req, res) => {

    const { id, amount } = req.body;
    const payment = await stripe.paymentIntents.create({
        // amount: 1000,
        //   mode: 'payment',
        //   success_url: 'https://example.com/success',
        //   cancel_url: 'https://example.com/failure',
        //   payment_intent_data: {
        //     application_fee_amount: 100,
        //     transfer_data: {
        //       destination: 'acct_1L8ue22QtfyOgkUu',
        //     }}})
        amount: amount*.05,
        currency: 'usd',
        payment_method: id,
        // transfer_group: '{ORDER10}',                           
        confirm: true,
    })
    const transf = await stripe.transfers.create({
        amount: 500,
        currency: 'usd',
        transfer_data: {
            destination: 'acct_1L8ue22QtfyOgkUu',

        }
    })
    console.log(payment)
    console.log(transf)
    res.send('todok')
})


// router.post('/', async(req,res)=>{
//     const {amount}= req.body
//     console.log(amount)
//     const transfer = await stripe.transfers.create({
//         amount: amount-(amount*0.05),
//         currency: 'usd',
//         transfer_group: '{ORDER10}',
//     });
//     console.log(transfer)
//     res.send('succeded')
// })




module.exports = router;
