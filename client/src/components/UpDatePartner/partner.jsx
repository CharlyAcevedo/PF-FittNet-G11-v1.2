import { useState } from "react";
import styles from "./style/client.module.css";
import { partnerValidacion } from "./controlers/validaciones";
import { useDispatch, useSelector } from "react-redux";
import { updatePartnerData } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { SweetAlrt, SweetAlrtTem } from "../../asets/helpers/sweetalert";

export default function UpdatePartner() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const categorias = useSelector((state) => state.gyms);
  const usuario = useSelector((state) => state.user);
  const gym = useSelector((state) => state.gyms);

  const [stateForm, setStateForm] = useState({ form: "false" });

  const [input, setInput] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    cbu: "",
    ciul: "",
    gyms: [],
    socialNetworks: [],
    category: [],
     id: "",
    
  });

  const [error, setError] = useState({});

  const ID = params.userId;

  const nameU = params.name;

  console.log("esto seria el ID", ID);
  console.log("esto serian los gmy", gym);
  console.log("Datos usuario", usuario);

  //!----------------HANDLECHANGE-----------------------
  function handleChange(e) {
    setInput(() => {
      const newInput = {
        ...input,
        [e.target.name]: e.target.value,
        
        id: ID,
       
      };
      const errors = partnerValidacion(newInput);
      setError(errors);
      return newInput;
    });
    console.table(input);
  }

  //!-------------------GYMS-----------------------------
  function handleChangeGyms(e) {
    setInput(() => {
      const newGyms = {
        ...input,
        gyms: e.target.value,
      };
      return newGyms;
    });
  }
  function handleDeleteGyms(e) {
    setInput({
      ...input,
      gyms: input.gyms.filter((el) => el !== e.target.value),
    });
    console.log("ESTO ES DELET", e);
  }
  //!------------------socialNetworks---------------
  function handleChangesocialNetworks(e) {
    setInput(() => {
      const newsocialNetworks = {
        ...input,
        socialNetworks: [...input.socialNetworks, e.target.value]
      }
      console.log(newsocialNetworks)
      return newsocialNetworks;
      //todo: validaciones?
    });
  }
  // //!deleted socialNetworks
  // function handleDeleteS(e) {
  //   setInput({
  //     ...input,
  //     socialNetworks: input.socialNetworks.filter((el) => el !== e.target.value),
  //   });
  //   console.log("ESTO ES DELET", e);
  // }
  //!------------------Category---------------
  function handleChangeCategory(e) {
    setInput(() => {
      const newCategory = {
        ...input,
        category: input.category.includes(e.target.value)
          ? [...input.category]
          : [...input.category, e.target.value],
      };
      return newCategory;
      //todo: validaciones?
    });
  }
  //!deleted Category
  function handleDelete(e) {
    setInput({
      ...input,
      category: input.category.filter((el) => el !== e.target.value),
    });
    console.log("ESTO ES DELET", e);
  }

  //!------------------SUBMIT------------------------
  function handleSubmit(e) {
    e.preventDefault();

    if (stateForm) {
      if (stateForm.form === "true") {
        dispatch(updatePartnerData(input));
        SweetAlrt("Exito!", "Perfil Editado", "success");
        setInput({
          ...input,
          name: "",
          lastName: "",
          email: "",
          phone: "",
          cbu: "",
          ciul: "",
          gyms: [],
          socialNetworks: [],
          category: [],
          id: "",
        });
        setError({});
        navigate(`/profile/partner/${nameU}/${ID}`);
      } else {
        SweetAlrt(
          "Hace click en 'Confirmar Datos'",
          "Por seguridad confirma que los datos ingresados son correctos",
          "info"
        );
      }
    } else {
      SweetAlrt(
        "Hace click en 'Confirmar Datos'",
        "Por seguridad confirma que los datos ingresados son correctos",
        "info"
      );
    }
  }

  function handleButton(e) {
    return setStateForm({
      ...stateForm,
      [e.target.name]: e.target.value,
    });
  }
  console.log(stateForm);

  //!--------------------------------------------------

  return (
    <div className={styles.editPartnerMainContainer}>
      <h3>Mi Perfil</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre: </label>
          <input
            className={(error.name && styles.inputdanger) || styles.input}
            type="text"
            name="name"
            value={input.name}
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder="Nombre..."
          />
          {error.name && <p className={styles.danger}>{error.name}</p>}
        </div>
        <div>
          <label>Apellido: </label>
          <input
            className={(error.lastName && styles.inputdanger) || styles.input}
            type="text"
            name="lastName"
            value={input.lastName}
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder="Apellido..."
          />
          {error.lastName && <p className={styles.danger}>{error.lastName}</p>}
        </div>
        <div>
          <label>Email: </label>
          <input
            className={(error.email && styles.inputdanger) || styles.input}
            type="email"
            name="email"
            value={input.email}
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder="correo@ejemplo.com"
          />
          {error.email && <p className={styles.danger}>{error.email}</p>}
        </div>
        <div>
          <label>
            Telefono:{" "}
          </label>
          <input
            className={(error.phone && styles.inputdanger) || styles.input}
            type="tel"
            name="phone"
            value={input.phone}
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder="+549......"
          />
          {error.phone && <p className={styles.danger}>{error.phone}</p>}
        </div>
        <div>
          <label>
            <strong>Cbu:</strong>{" "}
          </label>
          <input
            className={(error.cbu && styles.inputdanger) || styles.input}
            type="number"
            name="cbu"
            value={input.cbu}
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder="2590046210320129410056"
          />
          {error.cbu && <p className={styles.danger}>{error.cbu}</p>}
        </div>
        <div>
          <label>
            <strong>Cuil:</strong>{" "}
          </label>
          <input
            className={(error.ciul && styles.inputdanger) || styles.input}
            type="number"
            name="cuil"
            value={input.cuil}
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder="000000000"
          />
          {error.cuil && <p className={styles.danger}>{error.cuil}</p>}
        </div>
        <div>
          <label>Redes Sociales: </label>
          <br />
          Facebook
          <input
            value={input.socialNetworks}
            className={styles.input}
            onChange={(e) => handleChangesocialNetworks(e)}
          />
          <br />
          Instagram
          <input
            className={styles.input}
            onChange={(e) => handleChangesocialNetworks(e)}
          />
          <br />
          Tweeter
          <input
            className={styles.input}
            onChange={(e) => handleChangesocialNetworks(e)}
          />
          <br />
          Tik Tok
          <input
            className={styles.input}
            onChange={(e) => handleChangesocialNetworks(e)}
          />
        </div>
        <div>
          <label>Categoria:</label>
          <select
            onChange={(e) => handleChangeCategory(e)}
            className={styles.input}
          >
            {categorias.map((e) => (
              <option
                className={styles.input}
                key={e}
                name="category"
                value={e}
              >
                {e}
              </option>
            ))}
          </select>
          <ul>
            <li>
              {input.category?.map((e) => (
                <div key={e}>
                  <p className={styles.input}>{e} </p>
                  <button value={e} onClick={(e) => handleDelete(e)}>
                    x
                  </button>{" "}
                </div>
              ))}{" "}
            </li>
          </ul>
        </div>
        <div>
          <label>Gimnasios: </label>
          <select
            className={styles.input}
            onChange={(e) => handleChangeGyms(e)}
          >
            {usuario.gyms?.map((e) => (
              <option key={e} name={e} value="gyms">
                {e}
              </option>
            ))}
          </select>
          <ul>
            <li>
              {input.gyms.map((e) => (
                <div key={e.name}>
                  <p>{e.name} </p>
                  <button value={e} onClick={(e) => handleDeleteGyms(e)}>
                    x
                  </button>{" "}
                </div>
              ))}{" "}
            </li>
          </ul>
        </div>
        <div>
          <label>Confirmar Datos </label>
          <input
            className={styles.input}
            type="checkbox"
            onClick={(e) => handleButton(e)}
            name="form"
            value="true"
          />
        </div>
        <br />
        <button type="submit">Enviar Formulario</button>
      </form>
    </div>
  );
}
