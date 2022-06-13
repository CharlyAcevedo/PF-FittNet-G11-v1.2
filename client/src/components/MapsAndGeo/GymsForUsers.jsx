import React, { useMemo, useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import styles from "./styles/mapGyms.module.css";
// import L from "leaflet";
// import iconMarker from "../../asets/icons/iconMarker.png";
// import MapPin from "../../asets/icons/map-pin.svg";
import CalcDist from "./controlers/calcDist";
import {ButtonSimple} from "../../helpers/Buttons/Buttons.jsx"
import { SweetAlrtTem } from "../../asets/helpers/sweetalert";

export default function GymsForUsersMap() {
  
  const [centerCoords, setCenterCoords] = useState({
    lat: 21.0298592,
    lng: -89.6416537,
  });

  const [lat, setLat] = useState(centerCoords.lat);
  const [lng, setLng] = useState(centerCoords.lng);
  const [dist, setDist] = useState(0);

  const gymsToShow = [
    {
      id: 1,
      name: "gym1",
      lat: 21.0313546,
      lng: -89.6426976,
    },
    {
      id: 2,
      name: "gym2",
      lat: 21.0318851,
      lng: -89.6437589,
    },
    {
      id: 3,
      name: "gym3",
      lat: 21.0316868,
      lng: -89.6414016,
    },
    {
      id: 4,
      name: "gym4",
      lat: 21.0298642,
      lng: -89.6403985,
    },
  ];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        // setLat(position.coords.latitude)
        // setLng(position.coords.longitude)
        // setDist(Math.round(CalcDist(position.coords.latitude, position.coords.longitude, lat, lng)))
      },
      function (error) {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
      }
    ); // eslint-disable-next-line
  }, []);

  //   const iconGym = new L.Icon({
  //     iconUrl: require('../../asets/icons/marker-icon.png'),
  //     iconRetinaUrl: require('../../asets/icons/marker-icon.png'),
  //     iconAnchor: [22, 94],
  //     popupAnchor: [-3, -76],
  //     shadowUrl: null,
  //     shadowSize: null,
  //     shadowAnchor: null,
  //     iconSize: new L.Point(60, 75),
  // });

  // const gymIcon = new baseIcon({iconUrl: {iconMarker}})
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setLat(marker.getLatLng().lat);
          setLng(marker.getLatLng().lng);
          // console.log(marker.getLatLng().lat, marker.getLatLng().lng)
          // setDist((CalcDist(gymsToShow[0].lat, gymsToShow[0].lng, marker.getLatLng().lat, marker.getLatLng().lng))*1000)
        }
      },
    }), // eslint-disable-next-line
    []
  );

  function handleOnClick() {
    SweetAlrtTem("Tu ubicacion ha sido enviada con exito","success");
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <h3>Nuestros Gimnasios mas cercanos</h3>
        <p>
          Aqui usted encontrara marcados los gimnasios que se encuentran mas
          cercanos a su ubicación, <br />
          de clink en el marcador para ver el nombre y distancia aproximada
        </p>
      </div>
      <div className={styles.mapContainer} id="map">
        {lat === null || lng === null ? (
          <div>Loading...</div>
        ) : (
          <MapContainer center={[centerCoords.lat, centerCoords.lng]} zoom={15}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              draggable={true}
              eventHandlers={eventHandlers}
              position={[lat, lng]}
              ref={markerRef}
            >
              <Popup>
                Esta es <br /> tu ubicacion.
              </Popup>
            </Marker>
            {gymsToShow.map((gym) => {
              return (
                <Marker
                  draggable={false}
                  // eventHandlers={eventHandlers}
                  position={[gym.lat, gym.lng]}
                  // icon={iconGym}
                  // ref={markerRef}
                >
                  <Popup>
                    {gym.name}
                    <br />A solo
                    {(
                      CalcDist(
                        gym.lat,
                        gym.lng,
                        centerCoords.lat,
                        centerCoords.lng
                      ) * 1000
                    ).toFixed(2)}{" "}
                    metros
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        )}
      </div>
      <div>
        <ButtonSimple onClick={handleOnClick} padding=".1rem 1rem" title="Agregar Ubicacion" />
      </div>
      <div style={{marginTop: "1rem", fontSize: "1rem"}}>
        La ubicacion actual es: Latitud: <span style={{color: "var(--color-prim"}}>{lat}</span>, Longitud: <span style={{color: "var(--color-prim"}}>{lng}</span>
      </div>
    </div>
  );
}
