import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles/Login.css";

export default function LoginInit() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function onSubmit(e) {
    let userLogin;

    console.log("está saliendo el post ", userLogin);

    e.preventDefault();

    if (username && password) {
      userLogin = { username: username, password: password };

      console.log("está saliendo el post ", userLogin);

      axios
        .post("http://localhost:3001/api/login", userLogin)
        .then((res) => {
          console.log(res.data, "-> viendo qué respondio el post");

          if (res.data.login) {
            console.log(
              res.data,
              " lo que responde el back si se autentica el user"
            );
            let { userId, name, type, avatar } = res.data;

            if (typeof avatar === "string") {
              return (window.location = `http://localhost:3000/home/${type}/${name}/${userId}/${avatar}`);
            }
            // ya le paso info por params de quién estamos hablando
            return (window.location = `http://localhost:3000/home/${type}/${name}/${userId}`);
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
    <div className="container">
      <div className="screen">
        <div className="screen_content">
          <div className="sign">
            <div className="content-heading">
              <Link to="/">
                <div className="container_btn">
                  <div className="logo_Container"></div>
                </div>
              </Link>
              <div className="container_reg">
                <a href="/register" style={{ textDecoration: "none" }}>
                  Crear cuenta
                </a>
              </div>
            </div>
          </div>
          <form className="login">
            <div className="login_field">
              <input
                type="email"
                value={username}
                name="email"
                className="login_input"
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
                className="login_input"
                placeholder="Contraseña"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <h3>{error === "" ? null : error}</h3>

            <input
              className="button login_submit"
              type="submit"
              value="Ingresar"
              onClick={(e) => onSubmit(e)}
            />
          </form>
        </div>
        <div className="screen_background">
          <span className="screen_background_shape shape4"></span>
          <span className="screen_background_shape shape3"></span>
          <span className="screen_background_shape shape2"></span>
          <span className="screen_background_shape shape1"></span>
        </div>
      </div>
    </div>
  );
}
