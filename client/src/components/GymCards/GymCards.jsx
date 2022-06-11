import React from "react";
import style from "./styles/GymCards.module.css";
import { useSelector } from "react-redux";
import GymCard from "../GymCard/GymCard";
import { CardShop } from "../../helpers/Cards/Cards.jsx";

export default function GymsCards() {
  const gyms = useSelector((state) => state.pageToShow);

  return (
    <div className={style.mainBoxCards}>
      <div className={style.boxCards}>
        {gyms.length
          ? gyms.map((x, y) => (
              <CardShop
                key={y}
                id={x._id}
                title={x.name}
                rating={x.raiting}
                price={x.price}
                imagen={x.image}
                favourite={x.favourite}
              />
            ))
          : gyms.length === 0 && (
            <img
              id="loading"
              src="https://www.sanfranciscohm.com/static/img/loading.gif"
              alt="loading..."
            />
          )}
        {/* {gyms.length
          ? gyms.map((g) => {
              return (
                <GymCard
                  key={g._id}
                  id={g._id}
                  name={g.name}
                  rating={g.raiting}
                  price={g.price}
                  image={g.image}
                  favourite={g.favourite}
                />
              );
            })
          : gyms.length === 0 && (
              <img
                id="loading"
                src="https://www.sanfranciscohm.com/static/img/loading.gif"
                alt="loading..."
              />
            )} */}
      </div>
    </div>
  );
}
