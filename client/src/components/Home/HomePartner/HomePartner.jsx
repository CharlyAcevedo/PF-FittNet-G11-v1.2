import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPartnerDetails } from "../../../redux/actions";
import { MyGyms } from "./ViewsPartner/MyGyms";
import { MySales } from "./ViewsPartner/MySales";
import { MyClients } from "./ViewsPartner/MyClients";
import { Plans } from "./ViewsPartner/Plans";
import { EditMyGyms } from "./ViewsPartner/EditMyGyms";
import { MyServices } from "./ViewsPartner/MyServices";
import { EditMyServices } from "./ViewsPartner/EditMyServices";
import { getPartner } from "../../../redux/actions/index";

import style from "./styles/style.module.css";
import { ButtonHomePA } from "../../../helpers/Buttons/Buttons";

export function HomePartner () {

  const dispatch = useDispatch()
  let { userId } = useParams();
//  const [view, setView] = useState("myGyms");

  // const [ view , setView ] = useState("plans");
  const userPartner = useSelector((state) => state.user); 



  useEffect(() => {
    if(Object.keys(userPartner).length === 0) {
      dispatch(getPartner(userId))
    }
  }, [])

  useEffect(() => {
    dispatch(getPartnerDetails(userId));// eslint-disable-next-line
  }, []);

  const partnerDetail = useSelector((state)=> state.partnerDetails)
  const userDetails = useSelector((state) => state.user)

  const [ view , setView ] = useState("editMyGyms");




  return (
    <div className={style.content}>
      <div className={style.contentH}>
        {/* Bloque de Button */}
        <div className={style.contButton}>
          <div className={style.contButtonTop}>
            {/* <p>{partnerDetail.partnerGyms.name}</p> */}
          </div>

          <div className={style.contButtonH1}>
            <ButtonHomePA
              onClick={(e) => {
                setView("plans");
              }}
              title="Planes y promociones"
            />
          </div>

          <div className={style.contButtonHg}>
            <ButtonHomePA
              onClick={(e) => {
                setView("mySales");
              }}
              title="Mis ventas"
            />
          </div>
          <div className={style.contButtonHg}>
            <ButtonHomePA
              onClick={(e) => {
                setView("myClients");
              }}
              title="Mis clientes"
            />
          </div>
          <div className={style.contButtonHg}>
            <ButtonHomePA
              onClick={(e) => {
                setView("myGyms");
              }}
              title="Mis gimnasios"
            />
          </div>
          <div className={style.contButtonHg}>
            <ButtonHomePA
              onClick={(e) => {
                setView("editMyGyms");
              }}
              title="Editar mis gimnasios"
            />
          </div>
          <div className={style.contButtonHg}>
            <ButtonHomePA
              onClick={(e) => {
                setView("myServices");
              }}
              title="Mis servicios"
            />
          </div>
          <div className={style.contButtonHg}>
            <ButtonHomePA
              onClick={(e) => {
                setView("editMyServices");
              }}
              title="Editar mis servicios"
            />
          </div>
        </div>
        {/* Bloque de contenido */}
        <div className={style.contData}>
          {view === "mySales" && <MySales />}
          {view === "myClients" && <MyClients />}
          {view === "plans" && <Plans />}
          {view === "myGyms" && <MyGyms />}
          {view === "editMyGyms" && <EditMyGyms />}
          {view === "myServices" && <MyServices />}
          {view === "editMyServices" && <EditMyServices />}
        </div>
      </div>
    </div>
  );
}
