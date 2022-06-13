import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserGeo, getPartnerDetails } from "../../redux/actions/index";
import styles from "./styles/LoginInit.module.css";
import jwt_decode from "jwt-decode";
import {
  BackgroundTwo,
  BackgroundOne,
} from "../../helpers/Backround/Background";
import { InputPrymary, InputSecond } from "../../helpers/Inputs/Inputs";
import { SweetAlrt } from "../../asets/helpers/sweetalert"; // , SweetAlrt2, SweetAlrtTem

export default function LoginInit() {
  const dispatch = useDispatch();
  const geolocation = useSelector(
    (state) => state.currentGeo
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [googleUser, setGoogleUser] = useState({});
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // const userGoogle = useSelector((state) => state.user);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");


  const handleCallbackGoogle = async (response) => {
    const userObject = jwt_decode(response.credential);
    if (!token || !userId) {
      console.log("ENTRO A GENERAR TOKEN", response.credential);
      const googleData = await axios.post(`/api/service/google/auth`, {
        tokenId: response.credential,
        data: userObject,
      });
      const finalizacionData = await googleData.data;
      // dispatch(getUser(finalizacionData.usuario._id));
      localStorage.setItem("token", response.credential);
      document.getElementById("signInDiv").hidden = true;
      localStorage.setItem("userId", finalizacionData.user.userId);
      localStorage.setItem("type", finalizacionData.user.type);
      localStorage.setItem("avatar", finalizacionData.user.avatar);
      localStorage.setItem("name", finalizacionData.usuario.name);
      // localStorage.setItem('latitude',finalizacionData.user.latitude.$numberDecimal)
      // localStorage.setItem('longitude',finalizacionData.user.longitude.$numberDecimal)

      // localStorage.setItem("type", type)
      // localStorage.setItem("avatar", avatar._id)
      // console.log(finalizacionData, ' finalización data')

      const { avatar } = finalizacionData.usuario;
      
      if(finalizacionData.usuario.type === "partner"){        
          dispatch(getPartnerDetails(userId));       
      }

      // console.log(finalizacionData.usuario);
      if (!avatar) {
        console.log('entro aqui')
        navigate(`/home/${finalizacionData.usuario.type}/${finalizacionData.usuario.name}/${finalizacionData.usuario._id}`);
      } else {
        navigate(`/home/${finalizacionData.usuario.type}/${finalizacionData.usuario.name}/${finalizacionData.usuario._id}/${finalizacionData.usuario.avatar}`);
      }
    } else {
      console.log("estas autenticado actualmente");
      // const googleData = await axios.post(
      //   `/api/google/auth`,
      //   {
      //     tokenId: response.credential,
      //     data: userObject,
      //   }
      // );
      // const finalizacionData = await googleData.data;
      // dispatch(getUser(finalizacionData.usuario._id));
      // const { avatar } = finalizacionData.usuario;
      // if (!avatar) {
      //   return (window.location = `http://localhost:3000/home/${finalizacionData.usuario.type}/${finalizacionData.usuario.name}/${finalizacionData.usuario._id}`);
      // } else {
      //   return (window.location = `http://localhost:3000/home/${finalizacionData.usuario.type}/${finalizacionData.usuario.name}/${finalizacionData.usuario._id}/${finalizacionData.usuario.avatar}`);
      // }
      navigate("/");
    }
  };

  useEffect(() => {
    window.google?.accounts.id.initialize({
      client_id:
        "157510772086-98ehfc8l140rpqoer006k78qugr3e62l.apps.googleusercontent.com",
      callback: handleCallbackGoogle,
    });

    window.google?.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {
        theme: "outline",
        size: "large",
        shape: "circle",
      }
    );
  });

  // }, [window.google?.accounts]);

  async function onSubmit(e) {
    e.preventDefault();
    let userLogin = {};

    console.log("se está intentando hacer el post");


    if (username && password) {
      userLogin = { username: username, password: password };

      console.log("está saliendo el post ", userLogin);

      const login = await axios({
        method: "post",
        url: "/api/service/login",
        data: userLogin,
        headers: { "X-Requested-With": "XMLHttpRequest" },
        withCredentials: true,
      })
        .then((res) => {
          return res.data;
        })
        .catch((error) => console.log(error));

      if (login.login) {
        console.log(login, " lo que responde el back si se autentica el user");

        let { userId, name, type, avatar, active, latitude, longitude } = login;

        if (active === true) {
          // Si la cuenta está activa
          if(type === "partner"){        
            // dispatch(getPartnerDetails(userId));
          }
          if (!login.avatar) {
            localStorage.setItem("userId", userId);
            localStorage.setItem("name", name);
            localStorage.setItem("type", type);
            localStorage.setItem("latitude", latitude.$numberDecimal);
            localStorage.setItem("longitude", longitude.$numberDecimal);

            navigate(`/home/${type}/${name}/${userId}`);
          }

          console.log(login.avatar)
          if (login.avatar) {
            console.log(login, " el user");

            localStorage.setItem("userId", userId);
            localStorage.setItem("name", name);
            localStorage.setItem("type", type);
            localStorage.setItem("avatar", avatar._id);
            localStorage.setItem("latitude", latitude.$numberDecimal);
            localStorage.setItem("longitude", longitude.$numberDecimal);

            let avatarId = avatar._id;
            navigate(`/home/${type}/${name}/${userId}/${avatarId}`);
          }
          // ya le paso info por params de quién estamos hablando
        } else {
          setError("Cuenta inactiva, verifiación de email pendiente");
        }
      }
      if (typeof login === "string") {
        console.log(login); // qué  me responde el back?
        SweetAlrt(login);
        setPassword("");
        setUsername("");
      }
    }
    if (!username && password) {
      setError("No olvide introducir su email");
    }
    if (username && !password) {
      setError("No olvide introducir su contraseña");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.screen}>
        <div className={styles.screenContent}>
          <div className={styles.sign}>
            <div className={styles.contentHeading}>
              <Link to="/">
                <div className={styles.containerBtn}>
                  <div className={styles.logoContainer}></div>
                </div>
              </Link>
              <div className={styles.containerReg}>
                <a href="/register" style={{ textDecoration: "none" }}>
                  Crear cuenta
                </a>
              </div>
            </div>
          </div>
          <form className={styles.login}>
            <InputPrymary
              type="email"
              value={username}
              name="email"
              placeholder="Email"
              required
              onChange={(e) => setUsername(e.target.value)}
            />

            <InputPrymary
              type="password"
              value={password}
              name="password"
              placeholder="Contraseña"
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <InputSecond
              type="submit"
              value="Ingresar"
              onClick={(e) => onSubmit(e)}
            />

            <div id="signInDiv" style={{ paddingTop: "1.5rem" }}></div>
            {/* <button onClick={(e) => handleLogoutGoogle(e)}>Logout</button> */}
            <p>{error === "" ? null : error}</p>
          </form>
          <a href="/resetpassword" style={{ padding: "1.5rem", color: "#fff" }}>
            Olvidé mi contraseña
          </a>
        </div>
        <BackgroundTwo />
      </div>
      <BackgroundOne />
    </div>
  );
}
