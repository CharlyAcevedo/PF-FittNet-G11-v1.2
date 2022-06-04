import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles/LoginInit.module.css";
import jwt_decode from "jwt-decode";
import { getUser, getUserGoogleForToken } from "../../redux/actions";
import {
  BackgroundTwo,
  BackgroundOne,
} from "../../helpers/Backround/Background";


export default function LoginInit() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [googleUser, setGoogleUser] = useState({});
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const userGoogle = useSelector((state) => state.user);

  const token = localStorage.getItem("token");

  const dispatch = useDispatch();

  const handleCallbackGoogle = async (response) => {
    const userObject = jwt_decode(response.credential);
    if (!token) {
      console.log("ENTRO A GENERAR TOKEN", response.credential);
      const googleData = await axios.post(
        `/api/service/google/auth`,
        {
          tokenId: response.credential,
          data: userObject,
        }
      );
      const finalizacionData = await googleData.data;
      dispatch(getUser(finalizacionData.usuario._id));
      localStorage.setItem("token", response.credential);
      document.getElementById("signInDiv").hidden = true;
      console.log(googleUser);
      const { avatar } = finalizacionData.usuario;
      if (!avatar) {
        return (window.location = `http://localhost:3000/home/${finalizacionData.usuario.type}/${finalizacionData.usuario.name}/${finalizacionData.usuario._id}`);
      } else {
        return (window.location = `http://localhost:3000/home/${finalizacionData.usuario.type}/${finalizacionData.usuario.name}/${finalizacionData.usuario._id}/${finalizacionData.usuario.avatar}`);
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

  }, [window.google?.accounts]);


  function onSubmit(e) {
    let userLogin;

    console.log("está saliendo el post ", userLogin);

    e.preventDefault();

    if (username && password) {
      userLogin = { username: username, password: password };

      console.log("está saliendo el post ", userLogin);

      //axios
      // axios.post(url[, data[, config]])
      axios({
        method: 'post',
        url: '/api/service/login',
        data: userLogin,
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        withCredentials: true
      })
     
        //.post("/api/service/login", userLogin)
        .then((res) => {
          console.log(res.data, "-> viendo qué respondio el post");

          if (res.data.login) {
            console.log(res.data, " lo que responde el back si se autentica el user" );
            
            let { userId, name, type, avatar, active } = res.data;

            if (active === true) { // Si la cuenta está activa
              if (typeof avatar === "string") {
                localStorage.setItem("userId", userId)
                return (window.location = `http://localhost:3000/home/${type}/${name}/${userId}/${avatar}`);
              }
              // ya le paso info por params de quién estamos hablando
              return (window.location = `http://localhost:3000/home/${type}/${name}/${userId}`);

            } else {
              setError("Cuenta inactiva, verifiación de email pendiente");
            }
          }
          if (typeof res.data === "string") {
            setError("usuario o password incorrecta");
            setPassword("");
            setUsername("");
          }
        })
        .catch((error) => console.log(error));
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
            <div className={styles.loginField}>
              <input
                type="email"
                value={username}
                name="email"
                className={styles.loginInput}
                placeholder="Email"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="login_field">
              <input
                type="password"
                value={password}
                name="password"
                className={styles.loginInput}
                placeholder="Contraseña"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <p>{error === "" ? null : error}</p>

            <input
              className={styles.loginSubmit}
              type="submit"
              value="Ingresar"
              onClick={(e) => onSubmit(e)}
            />
            <div id="signInDiv" style={{ paddingTop: "1.5rem" }}></div>
            {/* <button onClick={(e) => handleLogoutGoogle(e)}>Logout</button> */}
          </form>
          <a href="/resetpassword" style={{padding: "1.5rem", color: "#fff" }}>Olvidé mi contraseña</a>
        </div>
        <BackgroundTwo />
      </div>
      <BackgroundOne/>
    </div>
  );
}
