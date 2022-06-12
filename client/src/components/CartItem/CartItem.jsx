import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions";
import style from "./styles/style.module.css";

export default function CartItem({ id, name, price, description, duration }) {
  const dispatch = useDispatch();

  function handleClick(id) {
    dispatch(addToCart(id));
  }

  function handleDelete(id) {    
    dispatch(removeFromCart(id));
  }
  const styleTemp = {
    fontSize: '15px',
    
  }
  return (
    <div className={style.container}>
      <div className={style.card}>
        <div className={style.box}>
          <div className={style.content}>
            <span>{duration} min</span>
            <h2>{price} $</h2>
            <h3>{name}</h3>
            <p>{description}</p>
            <div className={style.contButton}>
              <button onClick={() => handleClick(id)}>+</button>
              <button onClick={() => handleDelete(id)}>-</button>
            </div> 
            {/* <a href="">Read More</a> */}
          </div>
        </div>
      </div>
      {/* <h3>Clase: {name}</h3>
      <h3>Precio: $ {price}</h3>
      <h3>Descripcion: {description}</h3>
      <h3>Duracion aproximada: {duration} minutos</h3>
      <div>
        <button onClick={() => handleClick(id)}>+</button>
      </div>
      <div>
        <button onClick={() => handleDelete(id)}>-</button>
      </div> */}
    </div>
  );
}
