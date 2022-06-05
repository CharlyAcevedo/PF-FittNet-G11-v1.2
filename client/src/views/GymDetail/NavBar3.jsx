import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {postCart} from '../../redux/actions/index'




export function NavBar3 ({id}){
    // console.log(id)
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart)
    const [cartCount, setCartCount] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const [body, setBody] = useState({
        gym: [],
        services: [],
        // user: {}
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
            gym: [id],
            services: [...cart],
        })
        console.log(body)
       }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems])
       

      
       
       function handleSubmit(){
           dispatch(postCart(body))
           console.log(body)
       }



    return (
        <nav>
        <div>
            {console.log(cart)}
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