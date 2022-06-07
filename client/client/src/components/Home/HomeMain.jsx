import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
// import Logout from "../Logout/Logout";
import SelecAvatar from "./HomeUser/SelectAvatar/SelectAvatar";
import GymCards from "./HomeUser/GymCards/GymCards";
import UserCards from "../UserCards/UserCards";

import PartnerCards from "./HomeAdmin/PartnerCards/PartnerCards";
import Advertising from "./HomePartner/Advertising";
import { getAllGyms, getUserGoogleForToken } from "../../redux/actions";
import { useDispatch } from "react-redux";
import IncomesGraph from "../../Helpers/Graphics/Incomes";
import ClientsGraph from "../../Helpers/Graphics/GraphClient";
import Paginated from "./HomeUser/Paginated/paginated";
import { ButtonBack } from "../../Helpers/Buttons/Buttons.jsx";

import styles from "./styles/homeMain.module.css";
import GeneralActions from "./HomePartner/GeneralActions";
import Sarch from "./HomeUser/Search/Search";

// import SelectAvatar from "./views/SelectAvatar";
export default function HomeMain() {
  let { userId, type, avatar } = useParams();
  // debería llegarme por params si es un
  // "user" con sin avatar o un "partner" o incluso un "admin"

  const dispatch = useDispatch();

  // const user = useSelector((state) => state.user);

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    // dispachar la action ¿pero qué voy a escuchar??? No sé si sea userId
    // console.log('sale la action de traer gyms')
    dispatch(getAllGyms()); 
    if (token) {
      dispatch(getUserGoogleForToken(token));
    }// eslint-disable-next-line
  }, [userId]);

  // Esto es una vista para un usuario sin avatar
  if (type === "user" && !avatar) {
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
        <Sarch/>       
        <GymCards/>
        <Paginated />
      </div>
    );
  }

  // Esto es una para cliente empresa
  if (type === "partner") {
    return (
      <div>
        {/* <NavBarProfile /> */}
        <h3>Qué más quiero ver como Ciente Empresa cuando llego a home???</h3>
        <IncomesGraph />
        <UserCards />
        <h4>Promociones y descuentos</h4>
      </div>
    );
  } 

  // Esto es una para un administrador de sitio
  if (type === "admin") {
    return (
      <div>
        {/* <NavBarProfile /> */}
        <h3>Qué más quiere ver un usuario Admin en su home???</h3>
        <PartnerCards />
        <UserCards />
        <h3>
          Vista de la parte financiera, ingresos, egresos, por pagar, por cobrar
        </h3>
        <IncomesGraph />

        <h3>Una vista como user</h3>
        <h3>Una vista como partner</h3>
      </div>
    );
  } 
}