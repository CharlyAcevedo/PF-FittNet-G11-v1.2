import React, { useEffect, useState } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import styles from "./styles/StripeCart.module.css";
import axios from "axios";
import { NavBar3 } from "../GymDetail/NavBar3";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SweetAlrt, SweetAlrtTem } from "../../asets/helpers/sweetalert";
import { clearCart, editStatus, getCart, updateClientGym } from "../../redux/actions";
import { Link } from "react-router-dom";
import { SendEmail } from "./SendEmail";
import { BackgroundOne } from "../../helpers/Backround/Background";
import { ButtonSimple } from "../../helpers/Buttons/Buttons";

const stripePromise = loadStripe(
  "pk_test_51L7OPdEPCpA0H6YFBVpVX0fFBJbIIUnXcU4hSY5uUZwQth9mmogZEiwUzXyXi5aJLSb43EzWLXcMPk75NBTjFGEC00usvaG53P"
);

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const cart = useSelector((state) => state.cart);
  const allcart = useSelector((state) => state.gymDetail)
  // const cartPrice = parseInt(cart.map(c => c.price.$numberDecimal))  
  // const cartQty = parseInt(cart.map(c => c.qty))
  // const totalPrice = cartPrice * cartQty  
  const totalPrice = cart.reduce((c, b) => parseInt(c.price.$numberDecimal * c.qty) + parseInt(b.price.$numberDecimal * b.qty))
  const usuarioId = localStorage.getItem("userId");
  const name = localStorage.getItem("name");
  const type = localStorage.getItem("type");
  const avatar = localStorage.getItem("avatar");


  const [statusClient, setStatusClient] = useState({
    id2: allcart._id,
    client: name
  });

  const gymId = allcart._id
  console.log(statusClient, 'allcart')
  const idCart = useSelector((state) => state.getCart);
  const [imgBack, setImgBack] = useState(
    Math.floor(Math.random() * (26 - 1) + 1)
  );

  const img =
    "https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/" +
    imgBack +
    ".jpeg";
  // useEffect(() => {
  //   setStatusCart({
  //     status: "Payed",
  //     id: idCart,
  //     price: cartPrice,
  //     quantity: cartQty,
  //     total: cartPrice * cartQty,
  //   });        
  //   console.log(statusCart, 'esto es partnergyms')
  // }, [idCart, name]);
  // var compra = [ {_id: "id1", name:"yoga", price: 700, qty: 2},{_id: "id2", name:"boxeo", price:500, qty: 1 } ];

  async function functionEditStatus(detalle) {
    const put = await axios({
      method: "put",
      url: "/api/shopcart",
      data: detalle,
      headers: { "X-Requested-With": "XMLHttpRequest" },
      withCredentials: true,
    })
      .then((res) => {
        return res.data;
      })
      .catch((error) => console.log(error));
    console.log(put, 'put')
    return put
  }


  const handleSubmit = async (e) => {
    var detalle = cart.map((c) => ({
      user: usuarioId,
      services: c._id,
      gyms: statusClient.id2,
      price: c.price.$numberDecimal,
      quantity: c.qty,
      total: c.qty * c.price.$numberDecimal,
      status: "Payed"
    }))

    e.preventDefault();
    // const inputsito = document.querySelector('#card-element')
    // const inputFull = inputsito.classList.contains('StripeElement--complete')
    // #root > form > div > div.CardField-input-wrapper.is-ready-to-slide > span.CardField-number.CardField-child > span:nth-child(2) > div > div.CardNumberField-input-wrapper > span > input
    // console.log(inputsito)
    // const input2 = inputsito.getElementsByTagName('div')
    // console.log(input2)
    // if (!inputFull) {
    //     return SweetAlrt("*Valid card number is required ")
    // }    
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      const { id } = paymentMethod;
      await axios.post("/api/checkout", {
        //const response = await axios.post('/api/checkout', {
        id,
        amount: totalPrice * 10,
      })
        .then((response) => {
          console.log(response, 'respuesta')
        })
        .catch((error) => {
          console.log(error)
        })
      console.log(detalle, 'statuscart')
      let edit = await functionEditStatus(detalle);
      dispatch(updateClientGym(statusClient));
      SendEmail(edit);
      console.log(idCart, ' idcart mail')
      SweetAlrtTem(`Su compra fue realizada con exito ${name}`, "success");
      navigate(`/home/${type}/${name}/${usuarioId}/${avatar}`);
      dispatch(clearCart());
    } else {
      SweetAlrtTem(`Su compra NO fue realizada con exito ${name}`, "error");
    }
  };
  if (imgBack) {
    return (
      <div className={styles.container}>
        <div className={styles.screen}>
          <div className={styles.screenContent}>
            <form>
              <div className={styles.tarjetPadre}>
                <div className={styles.tarjet}>
                  <div className={styles.cardTarjet}>
                    <div className={styles.cardBackground}>
                      <img
                        src={img}
                        alt=""
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                    <div className={styles.cardWrapper}>
                      <div className={styles.itemTop}>
                        <img
                          src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png"
                          alt=""
                          style={{ width: "70px", height: "56px" }}
                        />
                        <img
                          src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png"
                          alt=""
                          style={{ width: "100px", height: "55px" }}
                        />
                      </div>
                      <div className={styles.itemCredit}>
                        <CardElement />
                      </div>
                      <div className={styles.itemButton}>
                        <p>{name ? name : "USUARIO"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ height: "140px" }}></div>
              <div
                style={{
                  boxShadow: "0px 0px 12px 1px var(--light-color)",
                  borderRadius: "20px",
                }}
              >
                <div className={styles.contNav}>
                  <NavBar3 />
                </div>
                <div className={styles.contButton}>
                  <div>
                    {/* <Link to={`/home/${type}/${name}/${usuarioId}/${avatar}`}> */}
                    <Link to={-1}>
                      <ButtonSimple
                        onClick={() => clearCart()}
                        title="VOLVER"
                        padding="0 1rem"
                      />
                    </Link>
                  </div>
                  <ButtonSimple
                    onClick={(e) => handleSubmit(e)}
                    title="PAGAR"
                    padding="0 1rem"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <BackgroundOne />
      </div>
    );
  }
};

export default function StripeCart() {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
