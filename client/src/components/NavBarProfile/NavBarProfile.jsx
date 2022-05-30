import React from "react";
import { useParams } from "react-router-dom";
import Logout from "../Logout/Logout";
// import './style/NavBarProfile.css';
import styles from "./style/NavBarProfiles.module.css";

export default function NavBarProfile() {
  let { userId, name, type, avatar } = useParams();

  return (
    // <div className="box-nav-bar-profile">
    //     <ul className="list-nav-bar">
    //         <div className="items-nav-bar-profile">
    //             <h4 id= "name-profile">Bienvenido a tu Home {name}!</h4>
    //         </div>
    //         <div className="items-nav-bar-profile">
    //             <a href={`/profile/${type}/${name}/${userId}`}>Mi perfil</a>
    //         </div>
    //         <div className="items-nav-bar-profile">
    //             <a href={ avatar ?
    //             `/home/${type}/${name}/${userId}/${avatar}` :
    //             `/home/${type}/${name}/${userId}` }>Home</a>
    //          </div>
    //         <div className="items-nav-bar-profile">
    //             <a href="/">Ir a inicio</a>
    //         </div>
    //         <div className="items-nav-bar-profile">
    //             <Logout/>
    //         </div>
    //     </ul>
    // </div>
    <div className={styles.boxNavBar}>
      <div>
        <h5 className={styles.nameProfile}>Bienvenido a tu Home {name}</h5>
      </div>
      <div className={styles.ListNavBar}>
        <div className={styles.itemNavBar}>
          <a href={`/profile/${type}/${name}/${userId}`}>Mi perfil</a>
        </div>
        <div className={styles.itemNavBar}>
          <a
            href={
              avatar
                ? `/home/${type}/${name}/${userId}/${avatar}`
                : `/home/${type}/${name}/${userId}`
            }
          >
            Home
          </a>
        </div>
        <div className={styles.itemNavBar}>
          <a href="/">Ir a inicio</a>
        </div>
        <div className={styles.itemNavBarLogout}>
          <Logout />
        </div>
      </div>
    </div>
  );
}
