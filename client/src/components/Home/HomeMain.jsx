import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
// import Logout from "../Logout/Logout";
import SelecAvatar from "../SelectAvatar/SelectAvatar";
import GymCards from "../GymCards/GymCards";
// import UserCards from "../UserCards/UserCards";
// import PartnerCards from "../PartnerCards/PartnerCards";
import { getAllGyms, getUserGoogleForToken, getPartnerDetails } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
// import IncomesGraph from "../Graphics/Incomes";
import Paginated from "../paginated/paginated";
import { ButtonBack } from "../../helpers/Buttons/Buttons.jsx";
import styles from "./styles/homeMain.module.css";
// import GeneralActions from "../PartnerHomeComponents/GeneralActions";
import Sarch from "../Search/Search";
// import Advertising from "../PartnerHomeComponents/Advertising";
// import ClientsGraph from "../Graphics/GraphClient";
import OrderBy from "../OrderBy/OrderBy";
import HomeAdmin from "./HomeAdmin/HomeAdmin";
import { HomePartner } from "./HomePartner/HomePartner";
import GymsForUsersMap from "../MapsAndGeo/GymsForUsers";
// import { CardShop } from "../../helpers/Cards/Cards.jsx";

export default function HomeMain() {
  let { userId } = useParams();

  const dispatch = useDispatch();

  const avatarLS = localStorage.getItem("avatar");

  const token = localStorage.getItem("token");

  const type = localStorage.getItem("type");

  const navigate = useNavigate();

  
  useEffect(() => {
    dispatch(getAllGyms());
    dispatch(getPartnerDetails(userId));
    if (token) {
      dispatch(getUserGoogleForToken(token));
    } // eslint-disable-next-line
  }, [userId]);
  
  const partnerDetail = useSelector((state)=> state.partnerDetails);
  partnerDetail && localStorage.setItem("partnerDetail", partnerDetail);
  
  //! Esto es una vista para un usuario sin avatar
  if (type === "user" && !avatarLS) {
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
        {/* {console.log("entro a seleccionar el avatar")} */}
        {/* {console.log(type)} */}
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

  //! Esto es una vista para un usuario con avatar
  if (type === "user" && avatarLS) {
    return (
      <div className={styles.cont}>
        <GymsForUsersMap />
        <div
          style={{
            width: "90%",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Sarch />
          <OrderBy />
        </div>
        <GymCards />
        <Paginated />
      </div>
    );
  }

  if (type === "user" && avatarLS) {
    return (
      <div className={styles.cont}>
        <GymsForUsersMap />
        <div>
          <Sarch />
          <OrderBy />
        </div>
        <GymCards />
        {/* <CardShop /> */}
        <Paginated />
      </div>
    );
  }

  //! Esto es una para cliente empresa
  if (type === "partner") {

    return (
      <div>
        <HomePartner />
        {/* {console.log("entro a la ventana del partner")} */}
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
