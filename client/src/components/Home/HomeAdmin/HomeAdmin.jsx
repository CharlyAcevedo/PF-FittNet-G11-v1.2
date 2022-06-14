import React from "react";
import Finances from "./ViewsAdmin/Finances";
import Partners from "./ViewsAdmin/Partners";
import Users from "./ViewsAdmin/Users";
import ViewPartner from "./ViewsAdmin/ViewPartner";
import ViewUsers from "./ViewsAdmin/ViewUser";
import DeteleteAccount from "./ViewsAdmin/DeleteAccount";
import BlockAccount from "./ViewsAdmin/BlockAccount";
import SearchComponent from "./SearchComponent/SearchComponent";
import { useDispatch } from "react-redux";
import { getAllPartners } from "../../../redux/actions";
import { getAllUsers } from "../../../redux/actions";
import { useEffect } from "react";
import { getLockAccounts } from "../../../redux/actions";
import { useState } from "react";
import { useParams } from "react-router-dom";
import style from "./styles/style.module.css";
import { ButtonHomePA } from "../../../helpers/Buttons/Buttons";

export default function HomeAdmin() {
  const [view, setView] = useState("finances");

  const dispatch = useDispatch();

  let { userId } = useParams();

  console.log(userId, "los params");

  // Necesito una barra de búsqueda con filtros
  useEffect(() => {
    console.log("useEffect");

    dispatch(getAllPartners());
    dispatch(getAllUsers());
    dispatch(getLockAccounts());
  }, [userId]);

  return (
    <div className={style.content}>
      <div className={style.contentH}>
        {/* Bloque de Button */}
        <div className={style.contButton}>
          <div className={style.contButtonTop}>
            <p>Partner</p>
          </div>

          <div className={style.contButtonH1}>
            <ButtonHomePA
              onClick={(e) => {
                setView("finances");
              }}
              title="Finanzas"
            />
          </div>

          <div className={style.contButtonHg}>
            <ButtonHomePA
              onClick={(e) => {
                setView("partners");
              }}
              title="Partner"
            />
          </div>
          <div className={style.contButtonHg}>
            <ButtonHomePA
              onClick={(e) => {
                setView("users");
              }}
              title="Users"
            />
          </div>
          <div className={style.contButtonHg}>
            <ButtonHomePA
              onClick={(e) => {
                setView("viewPartner");
              }}
              title="Vista Partner"
            />
          </div>
          <div className={style.contButtonHg}>
            <ButtonHomePA
              onClick={(e) => {
                setView("viewUser");
              }}
              title="Vista User"
            />
          </div>
          <div className={style.contButtonHg}>
            <ButtonHomePA
              onClick={(e) => {
                setView("blockAccount");
              }}
              title="Bloquear cuenta"
            />
          </div>
          <div className={style.contButtonHg}>
            <ButtonHomePA
              onClick={(e) => {
                setView("deleteAccount");
              }}
              title="Eliminar cuenta"
            />
          </div>
        </div>
        <div>
          <SearchComponent />
          {view === "finances" && <Finances />}
          {view === "partners" && <Partners />}
          {view === "users" && <Users />}
          {view === "viewPartner" && <ViewPartner />}
          {view === "viewUser" && <ViewUsers />}
          {view === "deleteAccount" && <DeteleteAccount />}
          {view === "blockAccount" && <BlockAccount />}
        </div>
      </div>
    </div>
  );
}
