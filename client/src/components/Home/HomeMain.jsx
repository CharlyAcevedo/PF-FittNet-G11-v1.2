import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SelecAvatar from "../SelectAvatar/SelectAvatar";
import GymCards from "../GymCards/GymCards";
import { getAllGyms, getUserGoogleForToken, setUserGeo } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { ButtonBack } from "../../helpers/Buttons/Buttons.jsx";
import styles from "./styles/homeMain.module.css";
import Sarch from "../Search/Search";
import OrderBy from "../OrderBy/OrderBy";
import HomeAdmin from "./HomeAdmin/HomeAdmin";
import { HomePartner } from "./HomePartner/HomePartner";
import GymsForUsersMap from "../MapsAndGeo/GymsForUsers";
import { getUser, sortByDistance } from "../../redux/actions";

export default function HomeMain() {
  let { userId } = useParams();

  const dispatch = useDispatch();

  const avatarLS = localStorage.getItem("avatar");

  const token = localStorage.getItem("token");

  const type = localStorage.getItem("type");

  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
        function (position) {          
            let geoPayload = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }          
            dispatch(setUserGeo(geoPayload))
        },
        function (error) {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
        }
      ); // eslint-disable-next-line
  }, [])
  
  useEffect(() => {
    dispatch(getAllGyms());   
    dispatch(sortByDistance("menor"));    
    dispatch(getUser(userId));
    if (token) {
      dispatch(getUserGoogleForToken(token));
    } // eslint-disable-next-line
  }, [userId]);
  
  const partnerDetail = useSelector((state)=> state.partnerDetails);
  partnerDetail && localStorage.setItem("partnerDetail", partnerDetail);
  
  //! Esto es una vista para un usuario sin avatar
  if (type === "user" && !avatarLS) {
    return (
      <div className={styles.styleContWithOutAvatar}>
        <SelecAvatar />
        <div style={{ display: "grid", alignItems: "center" }} >
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
        <div className={styles.styleContWithAvatar}>
          <Sarch />
          <OrderBy />
        </div>
        <GymCards />
      </div>
    );
  }

  //! Esto es una para cliente empresa
  if (type === "partner") {

    return (
      <div>
        <HomePartner />
      </div>
    );
  }

  //! Esto es una para un administrador de sitio
  if (type === "admin") {
    return (
      <div>
        <HomeAdmin />
      </div>
    );
  }
}
