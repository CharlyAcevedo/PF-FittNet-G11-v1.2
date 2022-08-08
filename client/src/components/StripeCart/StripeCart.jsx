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
import {
  clearCart,
  updateClientGym,
} from "../../redux/actions";
import { Link } from "react-router-dom";
import { SendEmail } from "./SendEmail";
import { BackgroundOne } from "../../helpers/Backround/Background";
import { ButtonSimple } from "../../helpers/Buttons/Buttons";
import { getUser } from "../../redux/actions";


const stripePromise = loadStripe(
  "pk_test_51L7OPdEPCpA0H6YFBVpVX0fFBJbIIUnXcU4hSY5uUZwQth9mmogZEiwUzXyXi5aJLSb43EzWLXcMPk75NBTjFGEC00usvaG53P"
);



const CheckoutForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const cart = useSelector((state) => state.cart);
  const allcart = useSelector((state) => state.gymDetail);
  const user = useSelector((state) => state.user);

  localStorage.setItem('phone', allcart.phone)
  localStorage.setItem('nameGym', allcart.name)

  let userId = localStorage.getItem('userId');


  const usuarioId = localStorage.getItem('userId');
  const name = localStorage.getItem("name");
  useEffect(() => {
    dispatch(getUser(userId))

  }, [userId])

  const [detailUser, setDetailUser] = useState({ ///--------------Nano details
    userName: user.name,
    email: user.userName
  })
  
  const type = localStorage.getItem("type");
  const avatar = localStorage.getItem("avatar");

  const [statusClient, setStatusClient] = useState({
    id2: allcart._id,
    client: name,
  });

  const [statusGym, setStatusGim] = useState({
    nameGim: allcart.name,
    phonmeGim: allcart.phone
  })

  const idCart = useSelector((state) => state.getCart);
  const [imgBack, setImgBack] = useState(
    Math.floor(Math.random() * (26 - 1) + 1)
  );

  const img =
    "https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/" +
    imgBack +
    ".jpeg";

  async function functionEditStatus(detalle) {
    const put = await axios({
      method: "put",
      url: "/api/shopcart",
      data: detalle,
      headers: { "X-Requested-With": "XMLHttpRequest" },
    })
      .then((res) => {
        return res.data;
      })
      .catch((error) => console.log(error));
    return put;
  }

  const handleSubmit = async (e) => {
    var detalle = cart.map((c) => ({
      user: usuarioId,
      services: c._id,
      gyms: statusClient.id2,
      price: c.price.$numberDecimal,
      quantity: c.qty,
      total: c.qty * c.price.$numberDecimal,
      status: "Payed",
    }));

    var saleDetail = cart.map((c) => ({
      sericesName: c.name,
      gymName: allcart.name,
      price: c.price.$numberDecimal,
      quantity: c.qty,
      total: c.qty * c.price.$numberDecimal,
    }));

    const det = {
      userDetail: detailUser,
      gymDetail: {
        gymName: statusGym.nameGim,
        phoneGym: statusGym.phonmeGim
      },
      saleDetail: saleDetail,
    };
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      const { id } = paymentMethod;
      let compra = await axios
        .post("/api/checkout", {
          id,
          amount: 2000 * 10,
        })
        .then((response) => {
          return response
        })
        .catch((error) => {
          console.log(error);
        });
        console.log(compra.data)
      if (compra.data === 'todomal') {
        SweetAlrt(`Su pago fue rechazado ${name}`, "Intente con otra tarjeta")
        return navigate(`/home/${type}/${name}/${usuarioId}/${avatar}`);
      }
      dispatch(updateClientGym(detalle));
      SendEmail(det);
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