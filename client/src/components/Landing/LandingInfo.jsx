import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserGoogleForToken, getMarketing } from "../../redux/actions/index";
import { CardsPlansPartner } from "../../helpers/Cards/Cards";
import { ButtonPrimary } from "../../helpers/Buttons/Buttons.jsx";
import { PortadaFittnet, Hero } from "../Landing/componentsLanding/componentsLanding";
import { ScrollContainer, Animator, ScrollPage, Fade } from "react-scroll-motion";

import style from "../Landing/styles/Landing.module.css";

export default function LandingInfo() {
  const navigate = useNavigate();

  const divRef = useRef();

  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  const Scr = Fade();

  useEffect(() => {
    if (token) {
      dispatch(getUserGoogleForToken(token));
    } // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(getMarketing()); // eslint-disable-next-line
  }, []);

  return (
    <div className={style.container}>
      <ScrollContainer>
        <ScrollPage page={0}>
          <Animator animation={Scr}>
            <PortadaFittnet />
          </Animator>
        </ScrollPage>
      </ScrollContainer>
      <div>
        <div ref={divRef} className={style.contPlanPartner}>
          <CardsPlansPartner
            title="STANDARD"
            busqueda="10%"
            gym="Hasta 1 GYM"
            servicios="5 servicios por GYM"
            Size="2em"
          />
          <CardsPlansPartner
            title="PREMIUM"
            busqueda="30%"
            gym="Hasta 5 GYM"
            servicios="10 servicios por GYM"
            Size="2em"
          />
          <CardsPlansPartner
            title="GOLDEN"
            busqueda="50%"
            gym="Hasta 50 GYM"
            servicios="50 servicios en GYM"
            Size="2em"
          />
        </div>
        <div className={style.containerBtnPromos}>
          <ButtonPrimary
            title="MAS INFO"
            padding="0 1rem"
            onClick={() => navigate("/legendCe")}
          />
        </div>
      </div>
      <br />
      <Hero />
    </div>
  );
}
