import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Logout from "../Logout/Logout";
import { getUserGoogleForToken } from "../../redux/actions/index";
import style from "./style/NavBarProfile.module.css";
import { useDispatch, useSelector } from "react-redux";
import FormUser from "../Forms/FormUser";


export default function NavBarProfile() {
  let { userId, name, type, avatar } = useParams();

  const token = localStorage.getItem("token");

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if(token) {
      dispatch(getUserGoogleForToken(token))
    }
  }, []);   

  return (
    <div className={style.boxNavBarProfile}>
      <nav className={style.navBarProfile}>
        <div className={style.titleNavBar}>
          <div>
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
          <a href={`/profile/${type}/${name}/${userId}`}>Mi perfil</a>

          <a href="/">Inicio</a>
          <a
            href={
              !avatar
                ? `/home/${type}/${name}/${userId}/${avatar}`
                : `/home/${type}/${name}/${userId}`
            }
          >
            Home
          </a>
          <div className={style.logoutNavBarProfile}>
            <Logout />
          </div>
        </div>
      </nav>
      {/* <ul className={style.listNavBar}>
                <div className={style.itemsNavBarProfile}>
                    <h4 className={style.nameProfile}>Bienvenido a tu Home {name}!</h4>
                </div>
                <div className={style.itemsNavBarProfile}>
                    <a href={`/profile/${type}/${name}/${userId}`}>Mi perfil</a>
                </div>
                <div className={style.itemsNavBarProfile}>
                    <a href={ avatar ?
                    `/home/${type}/${name}/${userId}/${avatar}` :
                    `/home/${type}/${name}/${userId}` }>Home</a>
                 </div>
                <div className={style.itemsNavBarProfile}>
                    <a href="/">Ir a inicio</a>                            
                </div>
                <div>
                    <a href={`/home/modificacion/${type}/${name}/${userId}`}>Modificar usuario</a>
                </div>
                <div className={style.itemsNavBarProfile}>
                    <Logout/>
                </div> 
                <div className={style.itemsNavBarProfile}>
                    <Link to={`/home/${type}/${name}/${userId}/${avatar}/FormUser`}>modificar informacion</Link>
                </div>                
            </ul> */}
    </div>
  );
}
