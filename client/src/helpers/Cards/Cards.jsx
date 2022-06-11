import React from "react";
import { useNavigate } from "react-router-dom";

import { SweetAlrtTem } from "../../asets/helpers/sweetalert";
import { postAvatar } from "../../redux/actions/index";
import { useDispatch } from "react-redux";

import axios from "axios";



import styles from "./styles/stylesCards.module.css";

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

export const CardAvatarAdicional = (props) => { // El id del avatar llega por props
  const { name, image, features, id, userId, typeuser, nameUser, icono } = props;
const dispatch= useDispatch();
  const navigate = useNavigate();

  async function handleUdpateAvatar (idAvatar, e) {
    e.preventDefault();
    const avatar = { avatar: idAvatar };

    // dispatch(postAvatar(userId, avatar));
    SweetAlrtTem(
      `elegiste el avatar ${name}, ahora vas a ser redirigido a los gimnasios que cumplan con las caracteristicas de este avatar`,
      "success"
    );
    console.log("se agrego el avatar al usuario");
    navigate(`/home/${typeuser}/${nameUser}/${userId}/${idAvatar}`);


    let avatarSelect = await postAvatar(userId, avatar)
    
    // Hay que avaluar la respuesta y retornar un swit altert
    // console.log(avatarSelect, 'Respuesta a avatarSelect')

    if (avatarSelect.data.ok === false) { // Si el userId es invalido
      return window.alert(avatarSelect.data.msg)
    }

    let avatarId = avatarSelect ? avatarSelect.data.UserUpdateAvatar.avatar : null;

    console.log(avatarSelect, 'avatar selected id')

    localStorage.setItem("avatar", avatarId);

    navigate(`/home/${typeuser}/${nameUser}/${userId}/${avatarId}`);
  };


  async function postAvatar (userId, avatar) {
    try {
      const dataUdpateAvatar = await axios.put(`/api/user/avatar/${userId}`, avatar);
      
      console.log(dataUdpateAvatar);

      return dataUdpateAvatar;
      
    } catch (error) {
      console.log(error)
    };


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