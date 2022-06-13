import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { SweetAlrtTem } from "../../asets/helpers/sweetalert";
import { postAvatar, updateFavouriteGym } from "../../redux/actions/index";

import axios from "axios";

import styles from "./styles/stylesCards.module.css";
import { useEffect } from "react";
import { IoIosHeart } from "react-icons/io";
import { AiFillStar, AiOutlineShoppingCart } from "react-icons/ai";
import { useState } from "react";
import { EditMyGyms } from "../../components/Home/HomePartner/ViewsPartner/EditMyGyms.jsx";

export const CardAvatares = (props) => {
  const { image } = props;

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

export const CardAvatarAdicional = (props) => {
  // El id del avatar llega por props
  const { name, image, features, id, userId, typeuser, nameUser, icono } =
    props;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handleUdpateAvatar(idAvatar, e) {
    e.preventDefault();
    const avatar = { avatar: idAvatar };

    // dispatch(postAvatar(userId, avatar));
    SweetAlrtTem(
      `elegiste el avatar ${name}, ahora vas a ser redirigido a los gimnasios que cumplan con las caracteristicas de este avatar`,
      "success"
    );
    console.log("se agrego el avatar al usuario");
    navigate(`/home/${typeuser}/${nameUser}/${userId}/${idAvatar}`);

    let avatarSelect = await postAvatar(userId, avatar);

    // Hay que avaluar la respuesta y retornar un swit altert
    // console.log(avatarSelect, 'Respuesta a avatarSelect')

    if (avatarSelect.data.ok === false) {
      // Si el userId es invalido
      return SweetAlrtTem(`${avatarSelect.data.msg}`,"warning");
    }

    let avatarId = avatarSelect
      ? avatarSelect.data.UserUpdateAvatar.avatar
      : null;

    console.log(avatarSelect, "avatar selected id");

    localStorage.setItem("avatar", avatarId);

    navigate(`/home/${typeuser}/${nameUser}/${userId}/${avatarId}`);
  }

  async function postAvatar(userId, avatar) {
    try {
      const dataUdpateAvatar = await axios.put(
        `/api/user/avatar/${userId}`,
        avatar
      );

      console.log(dataUdpateAvatar);

      return dataUdpateAvatar;
    } catch (error) {
      console.log(error);
    }
  }

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
  const { img, num } = props;
  return (
    <div className={styles.cardIcons}>
      <img src={img} alt="" />
      <p>{num}</p>
    </div>
  );
};

export const CardShop = (props) => {
  const { title, imagen, price, rating, favourite, id } = props;

  const avatar = localStorage.getItem("avatar");

  const userId = localStorage.getItem("userId");

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleFavouriteClick = (e, gymId) => {
    e.preventDefault();
    if (avatar) {
      dispatch(updateFavouriteGym(gymId, userId));
    } else {
      console.log(
        "no se pudo agregar a favorito por que aun no estas registrado"
      );
    }
  };

  return (
    <div className={styles.cardShop}>
      <div className={styles.imgBox}>
        <img src={imagen} alt="mouse corsair" className={styles.mouseCard} />
      </div>

      <div className={styles.contentBox}>
        <h3 style={{ color: "var(--color-primD1)" }}>{title}</h3>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
            <span
              style={{
                color: "#dadada",
                fontWeight: "700",
                fontSize: "1.27rem",
              }}
            >
              {favourite}
            </span>
            {user.favourite?.some((x) => x === id) ? (
              <IoIosHeart
                onClick={(e) => handleFavouriteClick(e, props.id)}
                style={{ color: "red", cursor: "pointer", marginTop: ".2rem" }}
              />
            ) : (
              <IoIosHeart
                onClick={(e) => handleFavouriteClick(e, props.id)}
                style={{
                  color: "#868686",
                  cursor: "pointer",
                  marginTop: ".2rem",
                }}
              />
            )}
          </div>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".1rem",
              fontWeight: "700",
            }}
          >
            {rating}
            <AiFillStar style={{ color: "#FEAA09", marginTop: ".2rem" }} />
          </span>
        </div>
        <h2 className={styles.priceCard}>
          <small>{price.$numberDecimal}</small> €
        </h2>
        <div
          className={styles.buyCard}
          onClick={() => navigate(`/detail/gym/${id}`)}
        >
          <AiOutlineShoppingCart style={{ width: "30px", height: "30px" }} />
        </div>
      </div>
    </div>
  );
};

export const CardsPlansPartner = (props) => {
  const { title, Size, busqueda, servicios, gym } = props;
  return (
    <div className={styles.contPlanPartner}>
      <div className={styles.card}>
        <div className={styles.face1}>
          <div className={styles.content}>
            <span className={styles.stars}></span>
            <div className={styles.plan}>
              <ul>
                <li>{busqueda} de visibilidad</li>
                <li>Panel de control</li>
                <li>Historial de ventas</li>
                <li>Gestios de GYM</li>
                <li>Gestios de servicios</li>
                <li>{gym}</li>
                <li>{servicios}</li>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.face2}>
          <h2 style={{ fontSize: Size }}>{title}</h2>
        </div>
      </div>
    </div>
  );
};

export const CardGymPartner = (props) => {
  const {
    title,
    onClick,
    id,
    price,
    image,
    services,
    trainers,
    logo,
    phone,
    email,
    favorito,
  } = props;

  const navigate = useNavigate();

  const [view, setView] = useState("myGyms");

  const userId = localStorage.getItem("userId");
  const type = localStorage.getItem("type");
  const name = localStorage.getItem("name");
  // const [view, setView] = useState("");`

  return (
    <>
      {view !== "editMyGyms" ? (
        <div className={styles.containerCardGymPartner}>
          <div className={styles.headerGymPartner}>
            <img
              src={image[0]}
              alt="imagen gimnasio"
              style={{ width: "160px", height: "120px", borderRadius: ".6rem" }}
            />
          </div>
          <div className={styles.mainGymPartner}>
            <div className={styles.mainHeaderPartner}>
              <h2>{title}</h2>
              <span
                className={styles.btnEditarGym}
                onClick={() => setView("editMyGyms")}
              >
                Editar gimnasio
              </span>
            </div>
            <div className={styles.bodyInfoGym}>
              <div style={{display: 'flex', alignItems: 'center', gap: ".4rem"}}>
                <span>Entrenadores:</span>
                <ul className={styles.listTrainers}>
                  {trainers && trainers.map((x, y) => <li key={y}>{y + 1}. {x}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // </div>
        <>
          <EditMyGyms idGym={id} />
          <button onClick={() => setView("myGyms")} className={styles.btnVolverForGym}>
            Volver
          </button>
        </>
      )}
    </>
  );
};
