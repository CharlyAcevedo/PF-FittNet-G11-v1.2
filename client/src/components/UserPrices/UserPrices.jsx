import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import style from "./styles/UserPrices.module.css";
import { getAllGyms } from "../../redux/actions";

export default function UserPrices() {
  
  const gyms = useSelector((state) => state.gyms);
  const dispatch = useDispatch();

  const planes = [
    {
      planName: "Inicial",
      planPrice: "$1500",
      planDetail: "El plan ideal para empezar tu preparacion.",
      planGyms: "Mas de 50.",
      planSessions: "2 por semana.",
      planNutrition: "No disponible",
      planPreium: "No disponible.",
    },
    {
      planName: "Básico",
      planPrice: "$3000",
      planDetail: "El paso necesario para avanzar de nivel.",
      planGyms: "Mas de 120.",
      planSessions: "3 por semana.",
      planNutrition: "Seguimiento",
      planPreium: "No disponible.",
    },
    {
      planName: "Premium",
      planPrice: "$6000",
      planDetail: "El plan perfecto para avanzados.",
      planGyms: "Mas de 220.",
      planSessions: "5 por semana.",
      planNutrition: "Seguimiento y suplementos",
      planPreium: "No disponible.",
    },
    {
      planName: "Gold",
      planPrice: "$9000",
      planDetail: "El plan que ofrece todo los beneficios de la red.",
      planGyms: "Mas de 250.",
      planSessions: "Ilimitadas.",
      planNutrition: "Seguimiento y suplementos",
      planPreium: "Disponible.",
    },
  ];


  useEffect(() => {
    // if (!gyms) {
      dispatch(getAllGyms());
    // }
  },[gyms.length]);

  return (
    <div className={style.pricesTableContainer}>
      <h1 style={{ color: "#fff", textAlign: "center" }}>
        Elegí la suscripcion que mas se adapte a vos <br />o toma las clases
        individuales que mas te gustan.
      </h1>
      <Table responsive="md" className={style.pricesTable} >
        <thead>
          <tr>
            <th></th>
            {planes.map((a) => (
              <th
                style={{ color: "var(--color-prim)", fontSize: "1.4rem" }}
                
              >
                {a.planName}
              </th>
            ))}
          </tr>
          <tr>
            <th></th>
            {planes.map((d) => (
              <td >{d.planDetail}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cuota mensual</td>
            {planes.map((b) => (
              <td >{b.planPrice}</td>
            ))}
          </tr>
          <tr>
            <td>
              Gimnasios
              <br />
              disponibles
            </td>
            {planes.map((b) => (
              <td >{b.planGyms}</td>
            ))}
          </tr>
          <tr>
            <td>
              Seciones de
              <br />
              entrenamiento
              <br />
              mensual
            </td>
            {planes.map((b) => (
              <td >{b.planSessions}</td>
            ))}
          </tr>
          <tr>
            <td>
              Seguimiento
              <br />
              nutricional
            </td>
            {planes.map((b) => (
              <td >{b.planNutrition}</td>
            ))}
          </tr>
          <tr>
            <td>
              Clases premium
              <br />
              (yoga, pilates, <br />
              spa room)
            </td>
            {planes.map((b) => (
              <td >{b.planPreium}</td>
            ))}
          </tr>
        </tbody>
      </Table>

      <Table responsive="md" className={style.classesTableContainer}>
        {gyms.map((g) => {
          return (
            <div value={g.id} className={style.expand} >
              {/* {console.log(gyms)} */}
              {g.name}
              {/* {console.log(g.services)} */}
              <select>
                <option value="select" hidden selected>
                  {" "}
                  Ver clases...{" "}
                </option>
                {g.services.map((s) => {
                  // {console.log(s.name)}
                  return (
                    <option  value={s._id}>
                      {s.name} ${s.price}
                    </option>
                  );
                })}
              </select>
            </div>
          );
        })}
      </Table>
    </div>
  );
}
