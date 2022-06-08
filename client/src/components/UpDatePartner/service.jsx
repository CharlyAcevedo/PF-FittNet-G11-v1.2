import { useState } from "react";
import styles from "./style/client.module.css";
import { serviceValidate } from "./controlers/validaciones";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createService } from "../../redux/actions";
import { SweetAlrt } from "../../asets/helpers/sweetalert";

export default function Services() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    description: "", //cuadro te Texto
    duration: "", //numero
    gyms: [],
    uEnd: "",
    photo: [],
    objTraining: "",
  });
  const [error, setError] = useState({});

  //!---------------handleCahnge---------------------
  function handleChange(e) {
    setInput(() => {
      const newInput = {
        ...input,
        [e.target.name]: e.target.value,
      };
      const errors = serviceValidate(newInput);
      setError(errors);
      return newInput;
    });
    console.table(input);
  }
  //!------------------photo---------------
  function handleChangephoto(e) {
    setInput(() => {
      const newphoto = {
        ...input,
        photo: input.photo.includes(e.target.value)
          ? [...input.photo]
          : [...input.photo, e.target.value],
      };

      return newphoto;
    });
    console.log(input.photo);
  }
  //!deleted photo
  function handleDeleteI(e) {
    setInput({
      ...input,
      photo: input.photo.filter((el) => el !== e.target.value),
    });
    console.log("Trainers borrado:", e);
  }
  //!-----------------------GYMS----------------------
  function handleChangeGyms(e) {
    setInput(() => {
      const newGyms = {
        ...input,
        gyms: input.gyms.includes(e.target.value)
          ? [...input.gyms]
          : [...input.gyms, e.target.value],
      };
      return newGyms;
    });
  }

  //!deleted Gyms
  function handleDelete(e) {
    setInput({
      ...input,
      gyms: input.gyms.filter((el) => el !== e.target.value),
    });
    console.log("ESTO ES DELET", e);
  }
  //!------------------SUBMIT------------------------
  function handleSubmit(e) {
    e.preventDefault();
    if (
      !input.name ||
      !input.duration ||
      !input.description ||
      !input.objTraining
    ) {
      return SweetAlrt("Error","Todos los campos deben estar completos", "error",true)
      // return alert("Todos los campos deben estar completos!");
    } else {
      dispatch(createService(input));
      SweetAlrt("Exito!", "servicio creado","success",true)
      // alert("Service creado!");
      setInput({
        ...input,
        name: "",
        description: "",
        duration: "",
        gyms: "",
        uEnd: "",
        photo: [],
        objTraining: "",
      });
      setError({});
      navigate("/profile/partner");
    }
  }
  const gimnasios = ["Pesao Gym", "Olimpo", "FittNet", "Gym Henrys"];

  return (
    <div className={styles.editPartnerMainContainer}>
      <h1>FORMULARIO DE SERVICIOS</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre: </label>
          <input
            className={error.name && styles.inputdanger}
            onChange={(e) => handleChange(e)}
            value={input.name}
            type="text"
            name="name"
            placeholder="Nombre..."
          />{" "}
          {error.name && <p className={styles.danger}>{error.name}</p>}
        </div>
        <div>
          <label>Descripcion: </label>
          <input
            className={error.description && styles.inputdanger}
            onChange={(e) => handleChange(e)}
            value={input.description}
            type="text"
            name="description"
            placeholder="Descripcion..."
          />{" "}
          {error.description && (
            <p className={styles.danger}>{error.description}</p>
          )}
          <text>{input.description}</text>
        </div>
        <div>
          <label>Duracion:</label>
          <input
            type="checkbox"
            name="duration"
            value="1"
            onChange={(e) => handleChange(e)}
          />
          1 Hora
          <input
            type="checkbox"
            name="duration"
            value="2"
            onChange={(e) => handleChange(e)}
          />
          2 Hora
          <input
            type="checkbox"
            name="duration"
            value="3"
            onChange={(e) => handleChange(e)}
          />
          3 Hora
          <input
            type="checkbox"
            name="duration"
            value="4"
            onChange={(e) => handleChange(e)}
          />
          4 Hora
          <input
            type="checkbox"
            name="duration"
            value="5"
            onChange={(e) => handleChange(e)}
          />
          5 Hora
          {error.duration && <p className={styles.danger}>{error.duration}</p>}
        </div>
        <div>
          <label>Gimnasios: </label>
          <select onChange={(e) => handleChangeGyms(e)}>
            {gimnasios.map((e) => (
              <option>{e}</option>
            ))}
          </select>
          <ul>
            <li>
              {input.gyms.map((e) => (
                <div key={e}>
                  <p>{e} </p>
                  <button value={e} onClick={(e) => handleDelete(e)}>
                    x
                  </button>{" "}
                </div>
              ))}{" "}
            </li>
          </ul>
        </div>
        <div>
          <label>Fotos: </label>

          <input
            value={input.photo}
            onChange={(e) => handleChangephoto(e)}
            type="file"
            name="photo"
            id="photo"
            multiple
          />
          <ul>
            <li className={styles.input}>
              {input.photo.map((e) => (
                <div key={e}>
                  <p>{e} </p>
                  <img
                    src={{ e } || "https://via.placeholder.com/150 "}
                    key={e}
                    alt="No Found"
                  />
                  <button value={e} onClick={(e) => handleDeleteI(e)}>
                    x
                  </button>{" "}
                </div>
              ))}{" "}
            </li>
          </ul>
        </div>
        <div>
          <label>Objetivos del Entrenamiento</label>
          <input
            className={error.objTraining && styles.inputdanger}
            onChange={(e) => handleChange(e)}
            value={input.objTraining}
            type="text"
            name="objTraining"
            placeholder="Objetivos..."
          />{" "}
          {error.objTraining && (
            <p className={styles.danger}>{error.objTraining}</p>
          )}
          <text>{input.objTraining}</text>
        </div>
        <button type="submit">Enviar Formulario</button>
      </form>
    </div>
  );
}