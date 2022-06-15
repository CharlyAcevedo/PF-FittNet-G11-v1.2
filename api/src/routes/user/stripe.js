const router = require("express").Router();
const Stripe = require('stripe')
require("dotenv").config();
const { API_STRIPE } = process.env;

const stripe = new Stripe(API_STRIPE)

router.post('/', async (req, res) => {
    try {
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
        .then(()=>{    
            return true            
        })
        .catch((error)=>{
            return false            
        })
        console.log(payment, 'promesa stripe')
        if(payment===true){
            return res.send('todok')
        }else{
            return res.send('todomal')
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
