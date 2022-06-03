import React, { useEffect } from "react";
import {
  ButtonPrimary,
  ButtonSecondaryDeslice,
} from "../../helpers/Buttons/Buttons.jsx";
import {
  CardPromoBalance,
  CardPromoBulk,
} from "./componentsLanding/componentsLanding.jsx";
import { Link, useNavigate } from "react-router-dom";
import { setUserGeo, getUserGoogleForToken } from "../../redux/actions/index";
import style from "../Landing/styles/Landing.module.css";
import { useDispatch, useSelector } from "react-redux";

export default function LandingInfo() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const token = localStorage.getItem("token");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const payload = {
          latitud: position.coords.latitude,
          longitud: position.coords.longitude,
        };
        dispatch(setUserGeo(payload));
      },
      function (error) {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
      }
    ); // eslint-disable-next-line

    if (token) {
      dispatch(getUserGoogleForToken(token));
    }
  }, []);

  return (
    // <div>
    <div className={style.container}>
      <div className={style.contPrim}>
        <div className={style.contElempadre}>
          <div className={style.contElem}>
            <div className={style.contText}>
              <h1>
                La red de los mejores gimnasios acompañandote durante todo el
                proceso de cambio
              </h1>
              <br />
              <br />
              {!Object.keys(user).length ? (
                <Link to="/login">
                  <button className={style.btn}>Empezá aquí</button>
                </Link>
              ) : user.avatar ? (
                <ButtonSecondaryDeslice
                  title="Ir a home"
                  padding="1.1rem 5rem"
                  onClick={() =>
                    navigate(
                      `/home/${user.type}/${user.name}/${user._id}/${user.avatar._id}}`
                    )
                  }
                />
              ) : (
                <ButtonSecondaryDeslice
                  title="Ir a home"
                  padding="1.1rem 5rem"
                  onClick={() =>
                    navigate(`/home/${user.type}/${user.name}/${user._id}`)
                  }
                />
              )}
            </div>
            <div className={`${style.screenBackground}`}>
              <span className={style.shapeTop1}></span>
              <span className={style.shapeButtom1}></span>
              <span className={style.shapeTop2}></span>
              <span className={style.shapeButtom2}></span>
              <span className={style.shapeTop3}></span>
              <span className={style.shapeButtom3}></span>
              <span className={style.shapeTop4}></span>
              <span className={style.shapeButtom4}></span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className={style.promoDiv}>
          <div className={style.containerBtnPromos}>
            <ButtonPrimary
              title="Conocé nuestras promos"
              padding="0 4.5rem"
              onClick={() => navigate("/userprices")}
            />
          </div>
        </div>
        <div className={style.promosUsuarios}>
          <CardPromoBalance />
          <CardPromoBulk />
        </div>
        <div className={style.hero}>
          <h1
            style={{
              color: "#fff",
              textTransform: "uppercase",
              fontWeight: "700",
              fontSize: "40px",
              marginTop: "5rem",
            }}
          >
            El cambio empieza dentro tuyo
          </h1>
          <h1 className={style.texto}>FITTNET</h1>
          <div style={{ marginBottom: "2rem" }}>
            {!Object.keys(user).length ? (
              <ButtonSecondaryDeslice
                padding="1.5rem 5rem"
                title="Empeza aqui"
                onClick={() => navigate("/login")}
              />
            ) : user.avatar ? (
              <ButtonSecondaryDeslice
                title="Ir a home"
                padding="1.1rem 5rem"
                onClick={() =>
                  navigate(
                    `/home/${user.type}/${user.name}/${user._id}/${user.avatar._id}}`
                  )
                }
              />
            ) : (
              <ButtonSecondaryDeslice
                title="Ir a home"
                padding="1.1rem 5rem"
                onClick={() =>
                  navigate(`/home/${user.type}/${user.name}/${user._id}`)
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
