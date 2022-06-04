import React from "react";
import style from "./styles/GymCards.module.css";
import { useSelector } from "react-redux";
import GymCard from "../GymCard/GymCard";

export default function GymsCards() {
  const gyms = useSelector((state) => state.pageToShow);

  return (
    <div className={style.mainBoxCards}>
      <h5>Aqui puede ver los gimnasios de su preferencia</h5>
      <div className={style.boxCards}>    
        {gyms.length
          ? gyms.map((g) => {
              return (
                <GymCard
                  key={g._id}
                  id={g._id}
                  name={g.name}
                  rating={g.raiting}
                  price={g.price}
                  image={g.image}
                />
              );
            })
          : gyms.length === 0 && (
              <img
                id="loading"
                src="https://www.sanfranciscohm.com/static/img/loading.gif"
                alt="loading..."
              />
            )}
      </div>
    </div>
  );
}
