import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getGymDetail } from "../../redux/actions";
import { useSelector } from "react-redux";
import { NavBar3 } from "./NavBar3";
import CartItem from "../CartItem/CartItem";
import { clearGymDetail } from "../../redux/actions";
import style from "./styles/style.module.css";
import { getUser } from "../../redux/actions";

export default function GymDetail() {
  let { userId } = useParams();
  const dispatch = useDispatch();
  let idUser = localStorage.getItem("userId");

  useEffect(() => {
    dispatch(getGymDetail(userId)); // eslint-disable-next-line
    dispatch(getUser(idUser));
  }, [userId, idUser]);

  // This is equivalent to ComponentWillUnmount.
  // Que se ejecute cuando se desmonte gymDetail y limpie su estado en el reducer
  useEffect(() => {
    return () => dispatch(clearGymDetail());
  }, [gymDetail]);

  const gymDetail = useSelector((state) => state.gymDetail);

  let usuarioId = localStorage.getItem("userId");
  // id de usuario que está en la app
  // console.log(gymDetail, 'id de usuario que está en la app')

  if (!gymDetail.name) {
    return (
      <img
        id="loading"
        src="https://www.sanfranciscohm.com/static/img/loading.gif"
        alt="loading..."
      />
    );
  } else {
    return (
      <div>
        {console.log(gymDetail)}
        <div style={{ background: "#f74177" }}>
          {gymDetail.image.length > 0 ? (
            <div className={style.container}>
              {gymDetail.image.length == 1 ? (
                <div>
                  <ul className={style.slider}>
                    <li id="slide1">
                      <img src={gymDetail.image[0]} />
                    </li>
                  </ul>
                  <ul className={style.menu}>
                    <li>
                      <a href="#slide1"></a>
                    </li>
                  </ul>
                </div>
              ) : null}
              {gymDetail.image.length == 2 ? (
                <div>
                  <ul className={style.slider}>
                    <li id="slide1">
                      <img src={gymDetail.image[0]} />
                    </li>
                    <li id="slide2">
                      <img src={gymDetail.image[1]} />
                    </li>
                  </ul>
                  <ul className={style.menu}>
                    <li>
                      <a href="#slide1"></a>
                    </li>
                    <li>
                      <a href="#slide2"></a>
                    </li>
                  </ul>
                </div>
              ) : null}
              {gymDetail.image.length >= 3 ? (
                <div>
                  <ul className={style.slider}>
                    <li id="slide1">
                      <img src={gymDetail.image[0]} />
                    </li>
                    <li id="slide2">
                      <img src={gymDetail.image[1]} />
                    </li>
                    <li id="slide3">
                      <img src={gymDetail.image[2]} />
                    </li>
                  </ul>
                  <ul className={style.menu}>
                    <li>
                      <a href="#slide1"></a>
                    </li>
                    <li>
                      <a href="#slide2"></a>
                    </li>
                    <li>
                      <a href="#slide3"></a>
                    </li>
                  </ul>
                </div>
              ) : null}
            </div>
          ) : null}
          <p className={style.title}>{gymDetail.name}</p>
        </div>

        <section className={style.semicircle}>
          <div className={style.cardShop}>
            <div className={style.imgBoxLogo}>
              <img
                src={
                  gymDetail.logo.length > 0
                    ? gymDetail.logo
                    : "https://i0.wp.com/votoenblanco.com.mx/wp-content/uploads/2021/12/IMG_7680.jpg?fit=972%2C648&ssl=1"
                }
                alt="imagen gym"
                className={style.mouseCardLogo}
              />
            </div>
          </div>
        </section>
        <div style={{paddingTop:"200px"}}>
          <NavBar3
            id={[gymDetail]}
            usuarioId={usuarioId}
            button={true}
            background="#fff"
          />
        </div>

        {/* Detalle servicio */}
        <div className={style.contServices}>
          {console.log(gymDetail)}
          {gymDetail.services.map((e) => {
            return (
              <div key={e._id}>
                <CartItem
                  id={e._id}
                  key={e._id}
                  name={e.name}
                  price={e.price.$numberDecimal}
                  description={e.description}
                  duration={e.duration}
                />{" "}
                <br></br>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
