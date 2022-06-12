import React from "react";
import { useNavigate } from "react-router-dom";

import { SweetAlrtTem } from "../../asets/helpers/sweetalert";
import { postAvatar } from "../../redux/actions/index";

import axios from "axios";

import styles from "./styles/avatar.module.css";

export const CardAvatar = (props) => {
  const { name, image, features, id, userId, typeuser, nameUser } = props;

  const navigate = useNavigate();

  async function handleUdpateAvatar(idAvatar, e) {
    e.preventDefault();
    const avatar = { avatar: idAvatar };

    dispatch(postAvatar(userId, avatar));
    SweetAlrtTem(
      `elegiste el avatar ${name}, ahora vas a ser redirigido a los gimnasios que cumplan con las caracteristicas de este avatar`,
      "success"
    );
    console.log("se agrego el avatar al usuario");
    navigate(`/home/${typeuser}/${nameUser}/${userId}/${idAvatar}`);

    let avatarSelect = await postAvatar(userId, avatar);

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

  return (
    <div className={styles.containerCardAvatar}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <div
            style={{ backgroundImage: `url(${image})` }}
            className={styles.cardFront}
          >
            <h3 className={styles.cardTitle}>{name}</h3>
          </div>

          <div className={styles.cardBack}>
            <h5 style={{ fontWeight: "700" }}>Caracteristicas</h5>
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
