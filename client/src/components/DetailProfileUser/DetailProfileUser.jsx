import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import styles from "./styles/detailProfile.module.css";
import { MdLocationOn, MdLocationOff } from "react-icons/md";
import { useEffect } from "react";
import {
  getAllGyms,
  getUserGoogleForToken,
  getGymDetail,
} from "../../redux/actions/index";
import { NavBar3 } from "../GymDetail/NavBar3.jsx";

export default function DetailProfileUser() {
  let { userId } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const gyms = useSelector((state) => state.gyms);
  const gymDetail = useSelector((state) => state.gymDetail);

  const token = localStorage.getItem("token");
  const type = localStorage.getItem("type");
  const avatar = localStorage.getItem("avatar");
  const name = localStorage.getItem("name");

  const [isOpen, setisOpen] = useState({
    infoContacto: false,
    otherInfo: false,
  });

  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (gyms.length === 0) {
      dispatch(getAllGyms());
    }
    if (Object.keys(gyms).length === 0) {
      dispatch(getUserGoogleForToken(token));
    }
    if (Object.keys(gymDetail).length === 0) {
      dispatch(getGymDetail(userId));
    }
  }, []);

  const { info, favourite } = user;

  const filtroDeMisFavoritos = gyms.filter((x) =>
    favourite?.some((y) => y === x._id)
  );

  const pages = [];

  for (
    let i = 1;
    i <= Math.ceil(filtroDeMisFavoritos.length / itemsPerPage);
    i++
  ) {
    pages.push(i);
  }

  const indexItem = currentPage * itemsPerPage;
  const indexFirstItem = indexItem - itemsPerPage;

  const currentItemsFavorite = filtroDeMisFavoritos.slice(
    indexFirstItem,
    indexItem
  );

  const handleNext = (e) => {
    e.preventDefault();

    setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = (e) => {
    e.preventDefault();

    setCurrentPage((prev) => prev - 1);
  };

  return (
    <div style={{ width: "100%", height: "85vh" }}>
      <div className={styles.containerPerfilUser}>
        <div className={styles.containerPhotoPerfil}>
          <img
            src={info?.photo}
            alt="mi foto"
            style={{ width: "100%", height: "235px", borderRadius: ".6rem" }}
          />
        </div>
        <div className={styles.infoPerfilUser}>
          <div className={styles.headerPerfilUser}>
            <div
              style={{ display: "flex", alignItems: "center", gap: "1.1rem" }}
            >
              <div>
                <h3 style={{ color: "#fff" }}>{name}</h3>
                <p
                  style={{
                    color: "var(--color-primD1)",
                    border: "1px solid var(--color-primD1)",
                    textAlign: "center",
                    padding: ".2rem",
                    marginTop: ".2rem",
                    borderRadius: ".6rem",
                  }}
                >
                  User
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".4rem",
                  color: "#8a8a8a",
                }}
              >
                {info && Object.keys(info?.address).length > 0 ? (
                  <>
                    <MdLocationOn style={{ color: "var(--color-primD1)" }} />
                    <span
                      style={{ color: "var(--color-primD1)" }}
                    >{`${info.address.country} - ${info.address.city}`}</span>
                  </>
                ) : (
                  <>
                    <MdLocationOff />
                    <span>No agrego direccion</span>
                  </>
                )}
              </div>
            </div>
            <div
              style={{
                fontWeight: "500",
                color: "#494949",
                backgroundColor: "#d6d6d6",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                textAlign: "center",
                paddingLeft: "1rem",
                paddingRight: "1rem",
                borderRadius: ".4rem",
              }}
            >
              <p>
                Id: <span style={{ fontWeight: "700" }}>{userId}</span>
              </p>
            </div>
          </div>
          <div className={styles.etiquetasProfile}>
            <Link
              style={{ color: "#fff" }}
              to={`/home/${type}/${name}/${userId}/${avatar}/FormUser`}
            >
              Editar mi perfil
            </Link>
            <Link style={{ color: "#fff" }} to={`/updatepassword/${userId}`}>
              Cambiar mi contraseña
            </Link>
            <Link style={{ color: "#fff" }} to={`/deactivate/${userId}`}>
              Borra mi cuenta
            </Link>
            <span
              style={{ color: "#fff", cursor: "pointer" }}
              onClick={() =>
                navigate(`/home/${type}/${name}/${userId}/${avatar}`)
              }
            >
              Volver
            </span>
          </div>
          <div
            style={{
              width: "97%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div className={styles.infoContactUser}>
                <h3 style={{ fontWeight: "700", color: "#cecece" }}>
                  Informacion de contacto
                </h3>
                <div className={styles.contactUser}>
                  <p>
                    Phone:{" "}
                    {info?.phone ? (
                      <span style={{ color: "var(--color-primD1)" }}>
                        {info.phone}
                      </span>
                    ) : (
                      <span style={{ color: "var(--color-primD1)" }}>
                        No agrego un numero de contacto
                      </span>
                    )}
                  </p>
                  <p
                    style={{
                      display: "flex",
                      gap: ".2rem",
                      alignItems: "center",
                    }}
                  >
                    Address:{" "}
                    <span style={{ color: "var(--color-primD1)" }}>
                      {info && Object.keys(info?.address).length > 0 ? (
                        <span
                          style={{ color: "var(--color-primD1)" }}
                        >{`${info.address.country} - ${info.address.city}`}</span>
                      ) : (
                        <span style={{ color: "var(--color-primD1)" }}>
                          No agrego direccion
                        </span>
                      )}
                    </span>
                  </p>
                  <p>
                    Email:{" "}
                    <span style={{ color: "var(--color-primD1)" }}>
                      {user.userName}
                    </span>
                  </p>
                </div>
              </div>
              <div className={styles.othersInfo}>
                <h3 style={{ fontWeight: "700", color: "#cecece" }}>
                  Otra informacion
                </h3>
                <div className={styles.others}>
                  {info && info.birthday ? (
                    <p style={{ display: "flex", gap: ".4rem" }}>
                      Fecha de nacimiento:
                      <span style={{ color: "var(--color-primD1)" }}>
                        {info?.birthday.substring(0, 10)}
                      </span>
                    </p>
                  ) : (
                    <p style={{ display: "flex", gap: ".4rem" }}>
                      Fecha de nacimiento:
                      <span style={{ color: "var(--color-primD1)" }}>
                        DD/MM/AA
                      </span>
                    </p>
                  )}

                  <p style={{ display: "flex", gap: ".4rem" }}>
                    Genero:
                    {info && info.gender ? (
                      <span style={{ color: "var(--color-primD1)" }}>
                        {info.gender}
                      </span>
                    ) : (
                      <span style={{ color: "var(--color-primD1)" }}>
                        no selecciono un genero
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.favoritosGyms}>
              <h3 style={{ color: "#fff", textAlign: "center" }}>
                Mis favoritos
              </h3>
              <div className={styles.containerFavourite}>
                {gyms.length > 0 ? (
                  currentItemsFavorite.map((x, y) => (
                    <div
                      style={{
                        color: "#f0f0f0",
                        paddingBottom: ".5rem",
                        borderBottom: "1px solid var(--color-primD1)",
                      }}
                      className={styles.headerFavourite}
                      key={y}
                    >
                      <div className={styles.itemGymFavourite}>
                        <img
                          src={x.image}
                          style={{
                            width: "68px",
                            height: "65px",
                            borderRadius: ".5rem",
                          }}
                        />
                        <span
                          onClick={() => navigate(`/detail/gym/${x._id}`)}
                          className={styles.titleGymFavorito}
                        >
                          {x.name}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p
                    style={{
                      color: "var(--color-primD1)",
                      textAlign: "center",
                      marginTop: "6rem",
                    }}
                  >
                    No contiene favoritos actualmente
                  </p>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  margin: "1.2rem auto 0 auto",
                  alignItems: "center",
                  gap: "1rem",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={(e) => handlePrev(e)}
                  style={{ color: "#000" }}
                  className={styles.btnFavourite}
                  disabled={currentPage === pages[0] ? true : false}
                >
                  <span
                    style={{ fontSize: "1.1rem", color: "var(--color-primD1)" }}
                  >
                    &laquo;
                  </span>
                </button>
                <span style={{ color: "var(--color-primD1)" }}>
                  {currentPage}/<span>{pages[pages.length - 1]}</span>
                </span>
                <button
                  onClick={(e) => handleNext(e)}
                  style={{ color: "#000" }}
                  className={styles.btnFavourite}
                  disabled={
                    currentPage === pages[pages.length - 1] ? true : false
                  }
                >
                  <span
                    style={{ fontSize: "1.1rem", color: "var(--color-primD1)" }}
                  >
                    &raquo;
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              style={{
                // width: "200px",
                width: "95%",
                height: "220px",
                backgroundColor: "#181818",
                borderRadius: ".6rem",
                margin: "1.2rem auto"
              }}
            >
              <NavBar3
                id={[gymDetail]}
                usuarioId={userId}
                button={true}
                background="transparent"
                color="#fff"
                align="center"
              />
            </div>
          </div>
        </div>
        {/* <h3>Historial de compras</h3>
        <p>Mis compras</p>
        <h3>Detalles del perfil</h3>
        <p>Name: {name}</p>
        <p>Tipo de plan: </p>
        <p>Siguitene 2</p>
        <p>Siguitene 3</p> */}
      </div>
    </div>
  );
}
