import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SweetAlrt } from "../../../asets/helpers/sweetalert";
import { ButtonSimple } from "../../../helpers/Buttons/Buttons";
import CardServices from "../../CardCarritoService/CardServices.jsx";
import { getCart, postCart } from "../../../redux/actions/index";
import style from "./styles/carritoprofileuser.module.css";
import { useState } from "react";

export const CarritoProfileUser = ({ id, usuarioId, button }) => {
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
    <div className={style.contCarr}>
      <p className={style.titleCarrito}>CARRITO DE COMPRAS</p>
      <div className={style.tablePadre}>
        {console.log(cart)}
        <CardServices title="true" />
        {
        cart.length > 0
        ?cart.map((e) => {
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
        })
        : <p style={{textAlign: 'center', margin: "1.1rem auto"}}>Actualmente no cuenta con producto en su carrito</p>
    }
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
};
