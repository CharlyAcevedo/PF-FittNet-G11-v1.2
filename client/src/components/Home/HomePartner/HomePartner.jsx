import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { MyGyms } from "./ViewsPartner/MyGyms";
import { MySales } from "./ViewsPartner/MySales";
import { MyClients } from "./ViewsPartner/MyClients";
import { Plans } from "./ViewsPartner/Plans";
import { EditMyGyms } from "./ViewsPartner/EditMyGyms";
import { MyServices } from "./ViewsPartner/MyServices";
import { EditMyServices } from "./ViewsPartner/EditMyServices";

import style from "./styles/style.module.css";
import { ButtonHomePA } from "../../../helpers/Buttons/Buttons";


export function HomePartner () {
    const [ view , setView ] = useState("editMyGyms");


  let { userId } = useParams();

  console.log(userId, "los params en el home");

  return (
    <div className={style.content}>
      <div className={style.contentH}>
        {/* Bloque de Button */}
        <div className={style.contButton}>
          <div className={style.contButtonTop}>
            <p>Username</p>
          </div>

          <div className={style.contButtonH1}>
          <ButtonHomePA onClick={(e) => {
                setView("plans");
              }} title="Planes y promociones"/>
          </div>

          <div className={style.contButtonHg}>
          <ButtonHomePA onClick={(e) => {
                setView("mySales");
              }} title="Mis ventas"/>
          </div>
          <div className={style.contButtonHg}>
          <ButtonHomePA onClick={(e) => {
                setView("myClients");
              }} title="Mis clientes"/>
          </div>
          <div className={style.contButtonHg}>
          <ButtonHomePA onClick={(e) => {
                setView("myGyms");
              }} title="Mis gimnasios"/>
          </div>
          <div className={style.contButtonHg}>
          <ButtonHomePA onClick={(e) => {
                setView("editMyGyms");
              }} title="Editar mis gimnasios"/>
          </div>
          <div className={style.contButtonHg}>
          <ButtonHomePA onClick={(e) => {
                setView("myServices");
              }} title="Mis servicios"/>
          </div>
          <div className={style.contButtonHg}>
          <ButtonHomePA onClick={(e) => {
                setView("editMyServices");
              }} title="Editar mis servicios"/>
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
