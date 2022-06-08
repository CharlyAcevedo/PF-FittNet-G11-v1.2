import { useState } from "react";
import styles from "./style/client.module.css";
import { partnerValidacion } from "./controlers/validaciones";
import { useDispatch } from "react-redux";
import { updatePartnerData } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { SweetAlrt } from "../../asets/helpers/sweetalert";

export default function UpdatePartner() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [input, setInput] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    planType: "",
    cbu: "",
    profileCategory: [],
    userActive: "",
    socialMedia: [],
    paymentMethods: [],
    category: [],
    gyms: [],
    idName: "",
    id: "",
  });
  const [error, setError] = useState({});

  //!----------------HANDLECHANGE-----------------------
  function handleChange(e) {
    setInput(() => {
      const newInput = {
        ...input,
        [e.target.name]: e.target.value,
        idName: params.name,
        id: params.id,
      };
      const errors = partnerValidacion(newInput);
      setError(errors);
      return newInput;
    });
    console.table(input);
  }
  //!------------------paymentMethods---------------
  function handleChangepaymentMethods(e) {
    setInput(() => {
      const newpaymentMethods = {
        ...input,
        paymentMethods: input.paymentMethods.includes(e.target.value)
          ? [...input.paymentMethods]
          : [...input.paymentMethods, e.target.value],
      };

      return newpaymentMethods;
    });
    console.log(input.paymentMethods);
  }
  //!-------------------planType-----------------------------
  function handleChangeplanType(e) {
    setInput(() => {
      const newplanType = {
        ...input,
        planType: e.target.value,
      };
      return newplanType;
    });
  }
  //!------------------profileCategory---------------
  function handleChangeprofileCategory(e) {
    setInput(() => {
      const newprofileCategory = {
        ...input,
        profileCategory: input.profileCategory.includes(e.target.value)
          ? [...input.profileCategory]
          : [...input.profileCategory, e.target.value],
      };
      return newprofileCategory;
      //todo: validaciones?
    });
  }
  //!deleted profileCategory
  function handleDeleteP(e) {
    setInput({
      ...input,
      profileCategory: input.profileCategory.filter(
        (el) => el !== e.target.value
      ),
    });
    console.log("ESTO ES DELET", e);
  }

  //!------------------socialMedia---------------
  function handleChangeSocialMedia(e) {
    setInput(() => {
      const newSocialMedia = {
        ...input,
        socialMedia: input.socialMedia.includes(e.target.value)
          ? [...input.socialMedia]
          : [...input.socialMedia, e.target.value],
      };
      return newSocialMedia;
      //todo: validaciones?
    });
  }
  //!deleted socialMedia
  function handleDeleteS(e) {
    setInput({
      ...input,
      socialMedia: input.socialMedia.filter((el) => el !== e.target.value),
    });
    console.log("ESTO ES DELET", e);
  }
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
    if (!input.name || !input.phone || !input.lastName || !input.email) {
     return SweetAlrt("Atencion!","Todos os campos deben estar completos","warning",true)
      // return alert("Todos los campos deben estar completos!");
    } else {
      dispatch(updatePartnerData(input));
      SweetAlrt("Exito!", "Perfil Creado", "success")
      // alert("Perfil creado!");
      setInput({
        ...input,
        name: "",
        lastName: "",
        email: "",
        phone: "",
        planType: "",
        cbu: "",
        profileCategory: [],
        userActive: "",
        socialMedia: [],
        paymentMethods: [],
        category: [],
        gyms: [],
      });
      setError({});
      navigate("/profile/partner/:name/:userId/gym");
    }
  }

  //!--------------------------------------------------

  // function iniciarMap() {
  //   var coord = { lat: -34.5956145, lng: -58.4431949 };
  //   var map = new google.maps.Map(document.getElementById("map"), {
  //     zoom: 10,
  //     center: coord,
  //   });
  //   var marker = new google.maps.Marker({
  //     position: coord,
  //     map: map,
  //   });
  // }

  const socialMEDIA = ["Facebook", "Instagram", "TikTok", "Twitter"];
  const planTipes = ["Estandar", "premium", "Golden"];
  const profileCategorys = [
    "Solitario",
    "Alegre",
    "Triste",
    "Atento",
    "Imperativo",
    "Relajado",
    "Despistado",
    "Algo",
  ];
  const MetodosDePago = [
    "Debito",
    "Transferencia",
    "Deposito",
    "Tarjeta de Credito",
  ];
  const categorias = ["GYM", "Artes Marciales", "Natacion", "Funcional"];

  //?-------------------------------------------
  //LEER!
  //SUGERENCIA!!
  //INSERTAR CODIGO DE ESTILOS EN LOS INPUT DE LA SIGUIENTE MANERA
  //className={(error.name && styles.inputdanger) || styles.EL-ESTILO-A-AGREGAR}
  //PARA EVITAR PISAR ESTILOS DE ERRORES.

  return (
    <div className={styles.editPartnerMainContainer}>
      <h3>Editar Mi Perfil</h3>
      <span>
        Los campos marcados con <strong>*</strong> deben ser completados
      </span>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <strong>*</strong>Nombre:{" "}
          </label>
          <input
            className={error.name && styles.inputdanger}
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
          <label>
            <strong>*</strong>Apellido:{" "}
          </label>
          <input
            className={error.lastName && styles.inputdanger}
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
          <label>
            <strong>*</strong>Email:{" "}
          </label>
          <input
            className={error.email && styles.inputdanger}
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
            <strong>*</strong>Telefono:{" "}
          </label>
          <input
            className={error.phone && styles.inputdanger}
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
            <strong>*</strong>Tipo de plan:{" "}
          </label>
          <select onChange={(e) => handleChangeplanType(e)}>
            {planTipes.map((e) => (
              <option key={e} value={e} name="planType">
                {e}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>
            <strong>*</strong>Cbu:{" "}
          </label>
          <input
            className={error.cbu && styles.inputdanger}
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
            <strong>*</strong>Perfil:{" "}
          </label>
          <select onChange={(e) => handleChangeprofileCategory(e)}>
            {profileCategorys.map((e) => (
              <option key={e} value={e} name="profileCategory">
                {e}
              </option>
            ))}
          </select>
          <ul>
            <li className={styles.input}>
              {input.profileCategory.map((e) => (
                <div key={e}>
                  <p>{e} </p>
                  <button value={e} onClick={(e) => handleDeleteP(e)}>
                    x
                  </button>{" "}
                </div>
              ))}{" "}
            </li>
          </ul>
        </div>

        <div>
          <label>
            <strong>*</strong>Usuario activo:{" "}
          </label>
          <select name="userActive" onChange={(e) => handleChange(e)}>
            <option>Activo</option>
            <option value="true" name="userActive">
              On
            </option>
            <option value="false" name="userActive">
              Off
            </option>
          </select>
        </div>
        <div>
          <label>
            <strong>*</strong>Redes Sociales:{" "}
          </label>
          <select onChange={(e) => handleChangeSocialMedia(e)}>
            {socialMEDIA?.map((e) => (
              <option value={e} key={e} name="socialMedia">
                {e}
              </option>
            ))}
          </select>
          <ul>
            <li>
              {input.socialMedia.map((e) => (
                <div key={e}>
                  <p>{e} </p>
                  <input
                    type="text"
                    onChange={(e) => handleChangeSocialMedia(e)}
                  />
                  <button value={e} onClick={(e) => handleDeleteS(e)}>
                    x
                  </button>{" "}
                </div>
              ))}{" "}
            </li>
          </ul>
        </div>
        <div>
          <label>Metodos de Pago</label>
          <select onChange={(e) => handleChangepaymentMethods(e)}>
            {MetodosDePago.map((e) => (
              <option key={e} name="paymentMethods" value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Categoria:</label>
          <select onChange={(e) => handleChangeCategory(e)}>
            {categorias.map((e) => (
              <option key={e} name="category" value={e}>
                {e}
              </option>
            ))}
          </select>
          <ul>
            <li>
              {input.category.map((e) => (
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
        <button type="submit">Enviar Formulario</button>
      </form>
    </div>
  );
}