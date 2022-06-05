import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {postCart} from '../../redux/actions/index'




export function NavBar3 ({id, usuarioId}){    
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart)    
    const [cartCount, setCartCount] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const [body, setBody] = useState({
        gym: [],
        services: [],
        user: ''
    })

    useEffect(() => {
     let count = 0
     cart.forEach(item => {
         count += item.qty
     })
     setCartCount(count)
    }, [cart, cartCount])

    useEffect(() => {
        let items = 0
        let price = 0
        cart.forEach(item => {
            items = item.price
            price += item.qty * item.price
        })
        setTotalPrice(price)
        setTotalItems(items)
        setBody({
            gym: id,
            services: [...cart],
            user: usuarioId
        })
        console.log(cart)
        console.log(id)
       }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems])
       

      
       
       function handleSubmit(){
           dispatch(postCart(body))           
       }



    return (
        <nav>
        <div>            
            {cart.map(e => {
                return (
                    <div>
                        <h3>Clase: {e.name}</h3>
                    </div>

                )
            })}
           
            Cantidad : {cartCount}
        </div>
        <div>
            Subtotal: {totalItems}
        </div>
        <div>
            Total: {totalPrice}
        </div>
        <div>
            <button onClick={() => handleSubmit()}>COMPRAR!</button>
        </div>
     </nav>
    )
}