import React from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import styles from './styles/StripeCart.module.css'
import axios from 'axios';
import { NavBar3 } from '../GymDetail/NavBar3';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51L7OPdEPCpA0H6YFBVpVX0fFBJbIIUnXcU4hSY5uUZwQth9mmogZEiwUzXyXi5aJLSb43EzWLXcMPk75NBTjFGEC00usvaG53P');



const CheckoutForm = () => {
    const navigate = useNavigate()
    const stripe = useStripe();
    const elements = useElements();
    const cart = useSelector((state)=>state.cart)    
    const cartPrice = cart.map(c=>c.price.$numberDecimal)  
    const totalPrice = cartPrice.map(function(a){return parseInt(a)}).reduce(function (a, b) {return a+b})
    const usuarioId = localStorage.getItem('userId')
    const name = localStorage.getItem('name')
    const type = localStorage.getItem('type')
    const avatar = localStorage.getItem('avatar')

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Usuario name',name)
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })
        if (!error) {
            const { id } = paymentMethod;                     
            await axios.post('/api/checkout', {
            //const response = await axios.post('/api/checkout', {
                id,
                amount: totalPrice*100,                
            }).data
        }
        window.alert(`Su compra fue realizada con exito ${name}`)
        navigate(`/home/${type}/${name}/${usuarioId}/${avatar}`)
    }
    return (
        <div>
            <NavBar3 />
            <form onSubmit={handleSubmit}>

                <CardElement />
                <button>Pagar</button>
            </form>
        </div>
    )
}

export default function StripeCart() {
    // const options = {

    //     clientSecret: 'stripePromise',
    //   };
    return (<div className={styles.stripeContain}>
        <Elements stripe={stripePromise} >
            <CheckoutForm />
        </Elements>
    </div>
    );
};