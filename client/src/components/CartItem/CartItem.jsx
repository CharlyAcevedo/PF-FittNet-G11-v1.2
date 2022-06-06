import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions";

export default function CartItem({ id, name, price, description, duration }) {
  const dispatch = useDispatch();

  function handleClick(id) {
    dispatch(addToCart(id));
  }

  function handleDelete(id) {
    console.log(id);
    dispatch(removeFromCart(id));
  }
  return (
    <div>
      <h3>Clase: {name}</h3>
      <h3>Precio: $ {price}</h3>
      <h3>Descripcion: {description}</h3>
      <h3>Duracion aproximada: {duration} minutos</h3>
      <div>
        <button onClick={() => handleClick(id)}>+</button>
      </div>
      <div>
        <button onClick={() => handleDelete(id)}>-</button>
      </div>
    </div>
  );
}
