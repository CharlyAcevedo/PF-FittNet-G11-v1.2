import { useState, useEffect } from "react";
import styles from "./style/client.module.css";
import { partnerValidacion } from "./controlers/validaciones";
import { useDispatch, useSelector } from "react-redux";
import { updatePartnerData, getPartnerDetails } from "../../redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import { SweetAlrt, SweetAlrtTem } from "../../asets/helpers/sweetalert";

export default function UpdatePartner() {
  let { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(()=>{
    dispatch(getPartnerDetails(userId))// eslint-disable-next-line
  },[])

  const partner = useSelector((state) => state.partnerDetails)
  const usuario = useSelector((state) => state.user);
  const gym = useSelector((state) => state.gyms);

  const [stateForm, setStateForm] = useState({ form: "false" });

  const [name, setName] = useState("");
  const [input, setInput] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    cbu: "",
    ciul: "",
    gyms: [],
    socialNetworks: [],

    id: "",
  });

  const [error, setError] = useState({});

  const ID = params.userId;

  const nameU = params.name;

  console.log("esto seria el ID", ID);
  console.log("esto serian los gmy", gym);
  console.log("Datos usuario", usuario);
  console.log("Datos partner", partner);

  //!----------------HANDLECHANGE-----------------------
  function handleChange(e) {
    setInput(() => {
      const newInput = {
        ...input,
        [e.target.name]: e.target.value,

        id: ID,
      };
      const errors = partnerValidacion(newInput, e.target.name);
      setError(errors);
      return newInput;
    });
    console.table(input);
  }

  //!-------------------GYMS-----------------------------
  // function handleChangeGyms(e) {
  //   setInput(() => {
  //     const newGyms = {
  //       ...input,
  //       gyms: e.target.value,
  //     };
  //     return newGyms;
  //   });
  // }
  function handleEditGyms(e) {
    navigate(`/profile/edit/partner/${nameU}/${ID}/${e.target.value}`)
    // setInput({
    //   ...input,
    //   gyms: input.gyms.filter((el) => el !== e.target.value),
    // });
    console.log("ESTO ES DELET", e);
  }
  //!------------------socialNetworks---------------
  function addSocial(e) {
    e.preventDefault();
    if (name) {
      if (!input.socialNetworks.includes(name)) {
        let newSocial = [...input.socialNetworks];
        newSocial.push(name);

        setInput({
          ...input,
          socialNetworks: newSocial,
        });
      }
    }
    setName("");
  }

  // //!deleted socialNetworks
  function handleDeleteSocial(e) {
    setInput({
      ...input,
      socialNetworks: input.socialNetworks.filter(
        (el) => el !== e.target.value
      ),
    });
    console.log("ESTO ES DELET", e);
  }

  //!------------------SUBMIT------------------------
  function handleSubmit(e) {
    e.preventDefault();

    if (stateForm) {
      if (stateForm.form === "true") {
        let payload = {
          id: userId,
          name: input.name === "" ? partner.name : input.name,
          lastName: input.lastName === "" ? partner.lastName : input.lastName,
          email: input.email === "" ? partner.email : input.email,
          phone: input.phone === "" ? partner.phone : input.phone,
          cbu: input.cbu === "" ? partner.cbu : input.cbu,
          ciul: input.cuil === "" ? partner.cuil : input.cuil,
          // socialNetworks: [],
        };
        console.log(payload, "lo que se envia")
        dispatch(updatePartnerData(payload));
        dispatch(getPartnerDetails(userId));
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
  // console.log(input.name);

  //!--------------------------------------------------

  return (
    <div className={styles.editPartnerMainContainer}>
      <h3>Mi Perfil</h3>
<br />
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
            placeholder={partner.name ? partner.name : "Nombre prueba..."}
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
            placeholder={partner.lastName ? partner.lastName : "Apellido..."}
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
            placeholder={partner.email ? partner.email : "correo@ejemplo.com"}
          />
          {error.email && <p className={styles.danger}>{error.email}</p>}
        </div>
        <div>
          <label>Telefono: </label>
          <input
            className={(error.phone && styles.inputdanger) || styles.input}
            type="tel"
            name="phone"
            value={input.phone}
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder={partner.phone ? partner.phone : "+549......"}
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
            max="99999999999999999"
            placeholder={partner.cbu ? partner.cbu : "2590046210320129"}
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
            max="99999999999"
            value={input.cuil}
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder={partner.cuil ? partner.cuil : "12349876136"}
          />
          {error.cuil && <p className={styles.danger}>{error.cuil}</p>}
        </div>
        <div>
          <label>Redes Sociales: </label>
          <input
            className={styles.input}
            type="text"
            name="names"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <button onClick={(e) => addSocial(e)}>Agregar</button>

          <ul>
            <li className={styles.inputLista}>
              {input.socialNetworks.length
                ? input.socialNetworks.map((e) => (
                    <div key={e}>
                      <p>{e} </p>
                      <button value={e} onClick={(e) => handleDeleteSocial(e)}>
                        x
                      </button>{" "}
                    </div>
                  ))
                : null}
            </li>
          </ul>
        </div>
        <div>
          <label>Gimnasios: </label>
          {/* <select
            className={styles.input}
            onChange={(e) => handleChangeGyms(e)}
          >
            {partner.gyms?.map((e) => (
              <option key={e._id} name={e.name} value="gyms">
                {e.name}
              </option>
            ))}
          </select> */}
          <ul>
            <li>
              {partner.gyms?.map((e) => (
                <div key={e._id}>
                  <p>{e.name} </p>
                  <button value={e._id} onClick={(e) => handleEditGyms(e)}>
                    Editar
                  </button>{" "}
                </div>
              ))}{" "}
            </li>
          </ul>
        </div>
        <br />
        <br />
        <div>
          <label>
            <strong>Confirmar Datos</strong>{" "}
          </label>
          <input
            className={styles.inputLista}
            type="checkbox"
            onClick={(e) => handleButton(e)}
            name="form"
            value="true"
          />
        </div>
        <br />
        <br />
        <button type="submit">Enviar Formulario</button>
      </form>
    </div>
  );
}
