import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logout from "../Logout/Logout";
import { getUserGoogleForToken, getUser } from "../../redux/actions/index";
import style from "./style/NavBarProfile.module.css";
import { useDispatch } from "react-redux";
import { useCallback } from "react";

export default function NavBarProfile() {

  const token = localStorage.getItem("token");

  const name = localStorage.getItem("name");

  const userId = localStorage.getItem("userId");

  const type = localStorage.getItem("type");
  
  const avatar = localStorage.getItem("avatar");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const instantCallback = useCallback(dispatch, [dispatch])

  useEffect(() => {
    if (!token) {
      dispatch(getUser(userId));
    }
    if (token) {
      instantCallback(getUserGoogleForToken(token));
    }
  }, [instantCallback, token, userId]);

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
