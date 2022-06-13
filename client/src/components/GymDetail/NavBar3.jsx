import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SweetAlrt } from "../../asets/helpers/sweetalert";
import { ButtonSimple } from "../../helpers/Buttons/Buttons";
import { getCart, postCart } from "../../redux/actions/index";
import CardServices from "../CardCarritoService/CardServices";
import style from "./styles/style.module.css";

export function NavBar3({ id, usuarioId, button, background, color, align }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [body, setBody] = useState({
    gym: [],
    services: [],
    user: "",
  });

  useEffect(() => {
    let count = 0;
    cart.forEach((item) => {
      count += item.qty;
    });
    setCartCount(count);
  }, [cart, cartCount, id, usuarioId]);
  //   }, [cart, cartCount])

  useEffect(() => {
    let items = 0;
    let price = 0;
    cart.forEach((item) => {
      items = item.price.$numberDecimal * item.qty;
      price += item.qty * item.price.$numberDecimal;
    });
    setTotalPrice(price);
    setTotalItems(items);
    setBody({
      gym: id,
      services: [...cart],
      user: usuarioId,
    });
    // }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems])
  }, [cart, totalPrice, totalItems, id, usuarioId]);

  function handleSubmit() {
    if (cartCount < 1) {
      return SweetAlrt("Su carrito esta vacio");
    }
    dispatch(postCart(body));
    dispatch(getCart());
    navigate("/stripe");
  }

  return (
    <div className={style.contCarr} style={{backgroundColor: background, color: color}}>
      <p className={style.titleCarrito} style={{textAlign: align}}>CARRITO DE COMPRAS</p>
      <div className={style.tablePadre}>
        {console.log(cart)}
        <CardServices title="true" />
        {cart.map((e) => {
          return (
            <CardServices
              title="false"
              key={e._id}
              img="img"
              name={e.name}
              unidad={e.qty}
              price={e.price.$numberDecimal}
            />
          );
        })}
      </div>
      {/* Bloque de total de compra */}
      <div className={style.contTotalC}>
        <div>Cantidad Total: {cartCount}</div>
        <div>Precio Total: ${totalPrice}</div>
        <div>
          {button ? (
            <ButtonSimple
              onClick={() => handleSubmit()}
              title="COMPRAR"
              padding="0 1rem"
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
