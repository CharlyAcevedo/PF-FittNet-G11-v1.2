import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAvatars } from "../../redux/actions";
import { CardAvatarAdicional } from "../../helpers/Cards/Cards.jsx";

import styles from "./styles/avatar.module.css";

export default function SelectAvatar() {
  const { userId, type, name } = useParams();

  const avatars = useSelector((state) => state.avatars);

  const dispatch = useDispatch();

  useEffect(() => {
    if (avatars.length === 0) {
      dispatch(getAvatars());
    } // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.containerAvatar}>
      <h2 style={{ margin: "0 auto 1.65rem auto", textAlign: "center", color: "#fff" }}>
        No cuentas con un avatar, selecciona uno:
      </h2>
      <div className={styles.containerCardAvatar}>
        {avatars?.map((x, y) => (
          <CardAvatarAdicional
            key={y}
            name={x.avatarName}
            image={x.avatarImage}
            features={x.features}
            icono={x.avatarIcono}
            id={x._id}
            userId={userId}
            typeuser={type}
            nameUser={name}
          />
        ))}
      </div>
    </div>
  );
}
