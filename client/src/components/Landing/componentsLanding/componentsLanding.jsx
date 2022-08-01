import { useNavigate, Link } from "react-router-dom";

import { useSelector } from "react-redux";

import { ButtonSecondaryDeslice } from "../../../helpers/Buttons/Buttons.jsx";

import styles from "../styles/Landing.module.css";


//? ESTE ES MI CARD DEL PACK BALANCE CARE
export const CardPromoBalance = () => {
  return (
    <div className={styles.promoBalance}>
      <h2 className={styles.balanceTitulo}>Pack Balance Care</h2>
      <ul className={styles.balanceLista}>
        <li>
          <span>&bull;</span>Planes de dieta
        </li>
        <li>
          <span>&bull;</span>Clases de gimnasia indoor
        </li>
        <li>
          <span>&bull;</span>Entrenamiento de pesas y maquinas
        </li>
        <li>
          <span>&bull;</span>Entrenamiento de artes marciales
        </li>
      </ul>
      <h2>$6000/mensual</h2>
    </div>
  );
};

//? ESTE ES MI CARD DEL PACK PRO BULK
export const CardPromoBulk = () => {
  return (
    <div className={styles.promoBulk}>
      <h2 className={styles.bulkTitulo}>Pack Pro Bulk</h2>
      <ul className={styles.bulkLista}>
        <li>
          <span>&bull;</span>Pack Balance Care +
        </li>
        <li>
          <span>&bull;</span>Seguimiento personalizado
        </li>
        <li>
          <span>&bull;</span>Clases premium: pilates, yoga, spa room
        </li>
        <li>
          <span>&bull;</span>Suplementos
        </li>
      </ul>
      <h2>$9000/mensual</h2>
    </div>
  );
};

export const PortadaFittnet = () => {

  const navigate = useNavigate();

  const name = localStorage.getItem("name");

  const type = localStorage.getItem("type");

  const idUser = localStorage.getItem("userId");

  const avatar = localStorage.getItem("avatar");

  return (
    <div className={styles.contPrim}>
      <div className={styles.contElempadre}>
        <div className={styles.contElem}>
          <div className={styles.contText}>
            <h1>
              La red de los mejores gimnasios acompañandote durante todo el
              proceso de cambio
            </h1>
            <br />
            <br />
            {!idUser ? (
              <Link to="/login">
                <button className={styles.btn}>Empezá aquí</button>
              </Link>
            ) : avatar ? (
              <ButtonSecondaryDeslice
                title="Ir a home"
                padding="1.1rem 5rem"
                onClick={() =>
                  navigate(`/home/${type}/${name}/${idUser}/${avatar}}`)
                }
              />
            ) : (
              <ButtonSecondaryDeslice
                title="Ir a home"
                padding="1.1rem 5rem"
                onClick={() => navigate(`/home/${type}/${name}/${idUser}`)}
              />
            )}
          </div>
          <div className={`${styles.screenBackground}`}>
            <span className={styles.shapeTop1}></span>
            <span className={styles.shapeButtom1}></span>
            <span className={styles.shapeTop2}></span>
            <span className={styles.shapeButtom2}></span>
            <span className={styles.shapeTop3}></span>
            <span className={styles.shapeButtom3}></span>
            <span className={styles.shapeTop4}></span>
            <span className={styles.shapeButtom4}></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Hero = () => {

  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const name = localStorage.getItem("name");

  const type = localStorage.getItem("type");

  const idUser = localStorage.getItem("userId");

  const avatar = localStorage.getItem("avatar");

  const styleH1 = {
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: "700",
    fontSize: "40px",
    marginTop: "5rem",
  }
  
  return (
    <div className={ styles.hero }>
      <h1 style={ styleH1 }>El cambio empieza dentro tuyo</h1>
      <h1 className={styles.texto}>FITTNET</h1>
      <div style={{ marginBottom: "6rem" }}>
        {!idUser ? (
          <ButtonSecondaryDeslice
            padding="1.5rem 5rem"
            title="Empeza aqui"
            onClick={() => navigate("/login")}
          />
        ) : user.avatar ? (
          <ButtonSecondaryDeslice
            title="Ir a home"
            padding="1rem 5rem"
            onClick={() =>
              navigate(`/home/${type}/${name}/${idUser}/${avatar}}`)
            }
          />
        ) : (
          <ButtonSecondaryDeslice
            title="Ir a home"
            padding="1.1rem 5rem"
            onClick={() => navigate(`/home/${type}/${name}/${idUser}`)}
          />
        )}
      </div>
  </div>
  )
}