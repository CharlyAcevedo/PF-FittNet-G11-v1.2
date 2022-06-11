import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
// import Logout from "../Logout/Logout";
import SelecAvatar from "../SelectAvatar/SelectAvatar";
import GymCards from "../GymCards/GymCards";
// import UserCards from "../UserCards/UserCards";
// import PartnerCards from "../PartnerCards/PartnerCards";
import { getAllGyms, getUserGoogleForToken } from "../../redux/actions";
import { useDispatch } from "react-redux";
import IncomesGraph from "../Graphics/Incomes";
import Paginated from "../paginated/paginated";
import { ButtonBack } from "../../helpers/Buttons/Buttons.jsx";
import styles from "./styles/homeMain.module.css";
import GeneralActions from "../PartnerHomeComponents/GeneralActions";
import Sarch from "../Search/Search";
import Advertising from "../PartnerHomeComponents/Advertising";
import ClientsGraph from "../Graphics/GraphClient";
import HomeAdmin from "./HomeAdmin/HomeAdmin";
import { HomePartner } from "./HomePartner/HomePartner";
import GymsForUsersMap from "../MapsAndGeo/GymsForUsers";
import { CardShop } from "../../helpers/Cards/Cards.jsx";

export default function HomeMain() {
  let { userId, type, avatar } = useParams();

  const dispatch = useDispatch();

  const avatarLS = localStorage.getItem("avatar");

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllGyms());
    if (token) {
      dispatch(getUserGoogleForToken(token));
    } // eslint-disable-next-line
  }, [userId]);

  // Esto es una vista para un usuario sin avatar
  if ((type === "user" && !avatar) || !avatarLS) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "1rem",
          paddingBottom: "1rem",
        }}
      >
        <SelecAvatar />
        <div
          style={{
            display: "grid",
            alignItems: "center",
          }}
        >
          <ButtonBack
            title="Volver"
            padding=".5rem 2rem"
            onClick={() => navigate("/")}
          />
        </div>
      </div>
    );
  }

  // Esto es una vista para un usuario con avatar
  if (type === "user" && avatar) {
    return (
      <div className={styles.cont}>
        <GymsForUsersMap />
        <Sarch />
        <GymCards />
        {/* <CardShop /> */}
        <Paginated />
      </div>
    );
  }

  if (type === "user" && avatarLS) {
    return (
      <div className={styles.cont}>
        <GymsForUsersMap />
        <Sarch />
        <GymCards />
        {/* <CardShop /> */}
        <Paginated />
      </div>
    );
  }

  // Esto es una para cliente empresa
  if (type === "partner") {
    return (
      <div>
        <HomePartner />
        {/* <div className={styles.advertising}>
          <Advertising/>
        </div>
        <div className={styles.generalActions}>
          <GeneralActions/>
        </div>
        <div className={styles.infoClients}>
          <ClientsGraph />
        </div>
        <div className={styles.infoFinantial}>
          <IncomesGraph/>
        </div> */}
      </div>
    );
  }

  // Esto es una para un administrador de sitio
  if (type === "admin") {
    return (
      <div>
        <HomeAdmin />
        {/* <PartnerCards /><UserCards /><IncomesGraph /> */}
      </div>
    );
  }
}
