import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postAvatar } from "../../redux/actions/index";
import { ButtonDetailGym } from "../Buttons/Buttons.jsx";

import styles from "./styles/stylesCards.module.css";

export const CardAvatares = (props) => {
  const { image } = props;
  // const { border, color, boxShadow, image } = props;

  const estiloPruebaImage = {
    backgroundImage: `url(${image})`,
  };

  return (
    <div className={styles.containerCardAvatares}>
      <div style={estiloPruebaImage}></div>
      <span style={{}}></span>
    </div>
  );
};

export const CardGymsAdicional = (props) => {
  const { image, title, click } = props;

  const estiloImagenFondo = {
    backgroundImage: `url(${image})`,
  };

  return (
    <div className={styles.box}>
      <div className={styles.drop} style={estiloImagenFondo}>
        <div className={styles.dropDetail}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #fff",
            }}
          >
            <h3
              style={{
                color: "#f1f1f1",
                fontSize: "1.6rem",
                padding: ".1rem 1rem",
              }}
            >
              {title}{" "}
            </h3>
            <span
              style={{
                color: "#c2c2c2",
                fontSize: "1.4rem",
                fontWeight: "700",
                marginRight: "1rem",
              }}
            >
              4.8
            </span>
          </div>
          <h3>$ 99.99</h3>
        </div>
      </div>
      <div className={`${styles.activator} ${styles.northwest}`}></div>
      <div className={`${styles.activator} ${styles.north}`}></div>
      <div className={`${styles.activator} ${styles.northeast}`}></div>
      <div className={`${styles.activator} ${styles.east}`}>EEEEEEEE</div>
      <div className={`${styles.activator} ${styles.southeast}`}></div>
      <div className={`${styles.activator} ${styles.south}`}></div>
      <div className={`${styles.activator} ${styles.southwest}`}></div>
      <div className={`${styles.activator} ${styles.west}`}></div>
      <div className={`${styles.overlay} ${styles.northwest}`}>
          <div onClick={() => console.log("enia y enita")}>VER DETALLE</div>
          {/* <ButtonDetailGym title="VER DETALLE" onClick={click} /> */}
      </div>
      <div className={`${styles.overlay} ${styles.north}`}>
          <div onClick={() => console.log("enia y enita")}>VER DETALLE</div>
          {/* <ButtonDetailGym title="VER DETALLE" onClick={click} /> */}
      </div>
      <div className={`${styles.overlay} ${styles.northeast}`}>
          <div onClick={() => console.log("enia y enita")}>VER DETALLE</div>
          {/* <ButtonDetailGym title="VER DETALLE" onClick={click} /> */}
      </div>
      <div className={`${styles.overlay} ${styles.east}`}>
          <div onClick={() => console.log("enia y enita")}>VER DETALLE</div>
          {/* <ButtonDetailGym title="VER DETALLE" onClick={click} /> */}
      </div>
      <div className={`${styles.overlay} ${styles.southeast}`}>
          <div onClick={() => console.log("enia y enita")}>VER DETALLE</div>
          {/* <ButtonDetailGym title="VER DETALLE" onClick={click} /> */}
      </div>
      <div className={`${styles.overlay} ${styles.south}`}>
          <div onClick={() => console.log("enia y enita")}>VER DETALLE</div>
          {/* <ButtonDetailGym title="VER DETALLE" onClick={click} /> */}
      </div>
      <div className={`${styles.overlay} ${styles.southwest}`}>
          <div onClick={() => console.log("enia y enita")}>VER DETALLE</div>
          {/* <ButtonDetailGym title="VER DETALLE" onClick={click} /> */}
      </div>
      <div className={`${styles.overlay} ${styles.west}`}>
          <div onClick={() => console.log("enia y enita")}>VER DETALLE</div>
          {/* <ButtonDetailGym title="VER DETALLE" onClick={click} /> */}
      </div>
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

export const CardIcons = (props) => {
  const { img, num} = props;
  return (
    <div className={styles.cardIcons}>
      <img src={img} alt="" />
      <p>{num}</p>
    </div>
  );
};