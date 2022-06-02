import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postAvatar } from "../../redux/actions/index";

import styles from "./styles/stylesCards.module.css";

export const CardAvatares = (props) => {
  const { border, color, boxShadow, image } = props;

  const estiloPruebaImage = {
    backgroundImage: `url(${image})`,
    // width: "120px",
    // height: "120px",
  };

  return (
    <div className={styles.containerCardAvatares}>
      {/* <img src={image} alt="alt-foto" style={{width: "155px", height: "120px"}}/> */}
      <div style={estiloPruebaImage}></div>
      <span style={{}}></span>
    </div>
  );
};

export const CardAvatarAdicional = (props) => {
  const { name, image, features, id, userId, typeuser, nameUser, icono } =
    props;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleUdpateAvatar = (idAvatar, e) => {
    e.preventDefault();
    const avatar = { avatar: idAvatar };
    dispatch(postAvatar(userId, avatar));
    alert(
      `elegiste el avatar ${name}, ahora vas a ser redirigido a los gimnasios que cumplan con las caracteristicas de este avatar`
    );
    console.log("se agrego el avatar al usuario");
    navigate(`/home/${typeuser}/${nameUser}/${userId}/${idAvatar}`);
  };

  const estiloIcono = {
    content: "",
    width: "120px",
    height: "120px",
    backgroundImage: `url(${icono})`,
  };

  return (
    <div className={styles.containerCardAvatar}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <div
            style={{ backgroundImage: `url(${image})` }}
            className={styles.cardFront}
          >
            <div className={styles.cardTitle} style={estiloIcono}></div>
          </div>

          <div className={styles.cardBack}>
            <h5 style={{ fontWeight: "700" }}>{name}</h5>
            <ul>
              {features?.map((x, y) => (
                <li className={styles.listFeaturesAvatar} key={y}>
                  {x}
                </li>
              ))}
            </ul>
            <button
              className={styles.btnSelectAvatar}
              onClick={(e) => handleUdpateAvatar(id, e)}
            >
              Seleccionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
