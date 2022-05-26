import { useState } from "react";
import axios from "axios";

export default function AllRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState("");

  //falta validaciones de formulario.

  function onSubmit(e) {
    let userCreate;

    console.log("está saliendo el post ", userCreate);

    e.preventDefault();

    if (name && email && password && type) {
      userCreate = { name: name, email: email, password: password, type: type };

      console.log("está saliendo el post ", userCreate);

      axios
        .post("http://localhost:3001/api/register", userCreate)
        .then((res) => {
          console.log(res.data, "-> respuesta del post de creación de cuenta");

          if (res.data.id) {
            setName("");
            setEmail("");
            setPassword("");
            setError("");

            window.alert("Usuario creado con éxito");
            return (window.location = "http://localhost:3000/login");
          }
          if (typeof res.data === "string") {
            setName("");
            setEmail("");
            setPassword("");
            setError(res.data);

            window.alert(res.data);
          }
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <div>
      <div> Entraste en / Create </div>
      <div> Quiero ver los datos del formulario que vamos a mandar </div>
      <h5>Name: {name ? name : null}</h5>
      <h5>Email: {email ? email : null}</h5>
      <h5>Password: {password ? password : null}</h5>
      <h5>Type state: {type ? type : null} </h5>
      <br />
      <div>
        <h3>Registrarse</h3>
        <div>
          <h5>Tipo de cliente:</h5>
          <select
            name="select"
            onChange={(e) =>
              e.target.value === "Tipo de cliente"
                ? null
                : setType(e.target.value)
            }
          >
            <option value="Tipo de cliente">Tipo de cliente</option>
            <option value="client">Usuario Final</option>
            <option value="partner">Cliente Empresa</option>
          </select>
        </div>

        <form>
          <input
            name="name"
            placeholder="Nombre"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <h3>{error ? error : null}</h3>

          <input
            type="submit"
            value="Registrarse"
            onClick={(e) => onSubmit(e)}
          />
        </form>
        <a href="/login">Iniciar sesión</a>
        <br />
        <a href="/">Volver</a>
      </div>
    </div>
  );
}
