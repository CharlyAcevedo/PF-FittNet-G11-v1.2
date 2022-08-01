import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlans } from "../../../../redux/actions";
import axios from "axios";
import CheckOut from "./CheckOut";
import { useState } from "react";
import style from "./styles/mygym.module.css";
import { ButtonSimple } from "../../../../helpers/Buttons/Buttons";


export function Plans() {
  const plan = useSelector((state) => state.plans);
  const dispatch = useDispatch();
  const [datos, setDatos] = useState("");
  const idPartner = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getPlans());
  }, []);

  async function onSubmit(value) {
    let data = [];
    if (value === "Premium") {
      data = [plan[0], idPartner._id];
    }
    if (value === "Golden") {
      data = [plan[2], idPartner._id];
    }
    if (value === "Standar") {
      data = [plan[1], idPartner._id];
    }
    await axios({
      method: "post",
      url: "/api/service/mercadopago",
      data: data,
      headers: { "X-Requested-With": "XMLHttpRequest" },
    })
      .then((data) => {
        setDatos(data.data);
        console.info("contenido de data", data);
      })
      .catch((err) => console.error(err));
    console.log("todopiola");
  }

  return (
    <div>
      <div className={style.cont}>
        {console.log(plan)}
        {plan.length
          ? plan.map((p) => {
              return (
                <div key={p.planName}>
                  <div className={style.cardright}>
                    <div className={style.plan}>
                      <p
                        style={{
                          fontSize: "46px",
                          padding: "20px",
                          textAlign: "center",
                        }}
                      >
                        {p.planName}
                      </p>
                      <ul>
                        <li>20% de visibilidad</li>
                        <li>Panel de control</li>
                        <li>Historial de ventas</li>
                        <li>Gestios de GYM</li>
                        <li>Gestios de servicios</li>
                        <li>incorporar hasta {p.gymsPermited} gym</li>
                        <li>incorporar hasta {p.servicePerGym} servicos</li>
                        <li>
                          Comision por venta: {p.commission.$numberDecimal}
                        </li>
                      </ul>
                      <p
                        style={{
                          fontSize: "36px",
                          padding: "10px",
                          textAlign: "center",
                        }}
                      >
                        $ {p.price.$numberDecimal}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          : "Cargando..."}
      </div>
      <div  style={{padding: "20px 0px 0px 0px ", display:"flex", justifyContent: "space-around"}}>
          <ButtonSimple
            title="Plan Premium"
            padding="0 1rem"
            onClick={() => onSubmit("Premium")}
          />
          <ButtonSimple
            title="Plan Standar"
            padding="0 1rem"
            onClick={() => onSubmit("Standar")}
          />
          <ButtonSimple
            title="Plan Golden"
            padding="0 1rem"
            onClick={() => onSubmit("Golden")}
          />
        </div>

        {!datos ? <p>Aguarde un momento...</p> : <CheckOut data={datos} />}
      
    </div>
  );
}
