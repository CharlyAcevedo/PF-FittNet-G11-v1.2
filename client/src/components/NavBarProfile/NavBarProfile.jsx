import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Logout from "../Logout/Logout";
import { getUserGoogleForToken } from "../../redux/actions/index";
import style from "./style/NavBarProfile.module.css";
import { useDispatch, useSelector } from "react-redux";
// import FormUser from "../Forms/FormUser";

export default function NavBarProfile() {
  // let { userId, name, type, avatar } = useParams();

  const token = localStorage.getItem("token");

  const name = localStorage.getItem("name");

  const userId = localStorage.getItem("userId");

  const type = localStorage.getItem("type");
  
  const avatar = localStorage.getItem("avatar");

  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getUserGoogleForToken(token));
    }
  }, []);

  return (
    <div className={style.boxNavBarProfile}>
      <nav className={style.navBarProfile}>
        <div className={style.titleNavBar}>
          <div onClick={() => navigate("/")}>
            <img
              src="https://res.cloudinary.com/salta/image/upload/v1654029469/logo-modo-BLANCO_smtgwu.png"
              alt="foto"
              style={{
                width: "155px",
                height: "75px",
                cursor: "pointer",
              }}
            />
          </div>
          <h3>
            Bienvenido <span>{name} !</span>
          </h3>
        </div>
        <div className={style.boxListaNavBarProfile}>
          <Link to={`/profile/${type}/${name}/${userId}`}>Mi perfil</Link>

          <Link to="/">Inicio</Link>
          <Link
            to={
              avatar
                ? `/home/${type}/${name}/${userId}/${avatar}`
                : `/home/${type}/${name}/${userId}`
            }
          >
            Home
          </Link>
          <div className={style.logoutNavBarProfile}>
            <Logout />
          </div>
        </div>
      </nav>
    </div>
  );
}
