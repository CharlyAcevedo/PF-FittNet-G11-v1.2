import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postAvatar } from "../../redux/actions/index";

import styles from "./styles/avatar.module.css";

export const CardAvatar = (props) => {
  const { name, image, features, id, userId, typeuser, nameUser } = props;

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
            <h2>Caracteristicas</h2>
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
