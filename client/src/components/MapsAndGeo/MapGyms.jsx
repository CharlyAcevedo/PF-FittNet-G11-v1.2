import React, { useMemo, useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { setGymsGeo } from "../../redux/actions";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { SweetAlrtTem } from "../../asets/helpers/sweetalert";
import styles from './styles/mapGyms.module.css';

export default function MapGyms() {

  const dispatch = useDispatch();

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
        function (position) {          
            setLat(position.coords.latitude)
            setLng(position.coords.longitude)          
        },
        function (error) {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
        }
      ); // eslint-disable-next-line
  }, [])


  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setLat(marker.getLatLng().lat);
          setLng(marker.getLatLng().lng)
        }
      },
    }),
    []
    );

    function handleOnClick(e) {
      e.preventDefault();
      dispatch(
        setGymsGeo({
          latitude: lat,
          longitude: lng,
        })
      );
      SweetAlrtTem("Tu ubicacion ha sido enviada con exito", "success");
    }
    

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
      <h3>Donde se encuentra su Gimnasio</h3>
      <p>Mueva el marcador azul hasta encontrar la ubicacion deseada y luego de click en el boton de envio</p>
      </div>
      <div className={styles.mapContainer} id="map">
        {lat === null || lng === null ? <div>Loading...</div>
        : <MapContainer
          center={[lat, lng]}
          zoom={15}
        >
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
              Coloque el marcador <br /> en la ubicación de su Gym.
            </Popup>
          </Marker>
        </MapContainer>}
      </div>
      <div><button onClick={handleOnClick}>Agregar Ubicación</button></div>
      <div>La ubicacion actual es: Latitud: {lat}, Longitud: {lng}</div>
    </div>
  );
}