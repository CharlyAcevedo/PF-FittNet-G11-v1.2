import { useState } from "react";
import styles from "./style/client.module.css";
// import { gymValidate } from "./controlers/validaciones";
// import { useNavigate } from "react-router-dom";

import { createGym, setGymsGeo } from "../../redux/actions";

// import { useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
// import { SweetAlrt, SweetAlrtTem } from "../../asets/helpers/sweetalert";
import { createOneGym, editOneGym } from "./controlers/Functions";
import MapGyms from "../MapsAndGeo/MapGyms";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function UpdateGym(props) {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const params = useParams();

  const { idGym } = props;

  const gymGeo = useSelector((state) => state.gymsGeo)

  const userId = localStorage.getItem("userId");

  const [typeAction, setTypeAcyion] = useState("edit");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");

  const [error, setError] = useState({});
  const [newGym, setNewGym] = useState({
    name: "Nombre del gym a crear", //string y es obligatorio - sale del form
    price: 999, // numero entero o decimal y no es obligatorio - sale del form
    // rating: // no se manda, por defecto se inicia como un array de numeros
    image: [], // es un array de imágenes y se inicia en vacio o con elementos
    latitude: 0, // numero entero o decimal y no es obligatorio
    longitude: 0, // numero entero o decimal y no es obligatorio
    // address: // no lo puedo mandar porque se relaciona con otra colección
    // y no es obligatorio
    trainers: [], // lo puedo tocar aunque no es obligatorio. Es un array de strings
    // que va a guardar los nombres de los instructores.
    logo: "", // es un string que guarda el enlace a una imagen
    phone: 12345678, // es un conjunto de numeros enteros y es un campo obligatorio
    email: "newgym@mail.com", // es un string que guarda el email del gym
    gymActive: true,
    favourite: 0, // es un numero entero y se inicia  en cero
  });

  // Campos obligatorios - Esto campos tiene que estar o se cae el back
  // 1 name
  // 2 price
  // 3 logo
  // 4 phone
  

  let exampleObject = // Esto no se está usado
  {
    name: "Nuevo Fittnet", // obligatorio
    price: 999, // obligatorio
    image: [],
    latitude: 0,
    longitude: 0,
    trainers: [],
    logo: "https://static.vecteezy.com/system/resources/thumbnails/003/108/337/small/fitness-gym-logo-with-strong-athlete-and-barbell-vector.jpg", // obligatorio
    phone: 155790033, //obligatorio, sin espacios
    email: "emaildelgym@gmail.com",
    gymActive: true,
    favourite: 0,
  };

  // Campos del formulario
  //----------------------------------------------------------------------
  // 1 Nombre del Gym *
  // un campo para el nomre

  // 2 Precio por mes *
  // un campo para el precio

  // 3 Fotos del gimnasio
  // esto es un array urls de fotos que se cargan como strings
  // cccc más botón de quitar o limpiar

  // 4 Entrenadores
  // esto es un array nombres de entrenadores que se cargan como strings
  // renderizar cada nombre más botón de quitar o limpiar

  // 5 Logo del gym *
  // un campo para el string de la dirección url de la imagen
  // renderizar la img cargada en 200x200px

  // 6 Teléfono *
  // un campo para los números

  // 7 Email
  // un campo para el correo

  //----------------------------------------------------------------------
  // Si edito un Gym cargo la info en este otro objeto
  const [editGym, setEditGym] = useState({
    name: "Nombre del gym a editar",
    price: 899,
    image: [],
    latitude: 0,
    longitude: 0,
    trainers: [],
    logo: "",
    phone: 0,
    email: "",
  });
  // Campos obligatorios - Esto campos tiene que estar o se cae el back
  // 1 name
  // 2 price
  // 3 logo
  // 4 phone

  useEffect(() => {
    setNewGym((prevState) => {
      return {
        ...prevState,
        latitude: gymGeo.latitude,
        longitude: gymGeo.longitude
      }
    });
    setEditGym((prevState) => {
      return {
        ...prevState,
        latitude: gymGeo.latitude,
        longitude: gymGeo.longitude
      }
    })
  },[gymGeo])
  //----------------------------------------------------------------------------
  // Faltaría tener un select o un switch para saber si se está creando o editando,
  // pero de todas formas usamos el mismo form para las dos cosas (crear y editar)
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  // Esta función sirve para crear un gym
  //----------------------------------------------------------------------------
  async function onClickCreateGym() {
    let dataForNewGym = {
      userId: { userId: userId },
      dataNewGym: newGym,
      // dataNewGym: { prop1: "data1", prop2: 2, prop3: [], prop4: {} }
    };
    // userId: el id del usuario partner que crea el gym
    // dataNewGym: en este objeto va todo lo que obtienen del formulario (el input de arriba)
    console.log("recibe el click y crea un gym");
    let newOnGym = await createOneGym(dataForNewGym);
    return newOnGym;
  }

  //----------------------------------------------------------------------------
  // Esta función sirve para editar la info de un gym
  //----------------------------------------------------------------------------

  async function onClickEditGym() {
    let dataForEditGym = {
      //userId: { userId: "userId" },
      gymId: { gymId: idGym },
      newDataGym: editGym,
      // newDataGym: { prop1: "data2", prop2: 3, prop3: ["algo"], prop4: {} }
    };
    // gymId: el id del gym a editar
    // dataNewGym: en este objeto va todo lo que obtienen del formulario (el input de arriba)
    console.log("recibe el click y edita un gym");
    let editOnGym = await editOneGym(dataForEditGym);
    return editOnGym;
  }

  //----------------HANDLECHANGE----------------------------------------------
  function handleChange(e) {
    if (typeAction === "create") {
      setNewGym(() => {
        const newInput = {
          ...newGym,
          [e.target.name]: e.target.value,
        };
        // const errors = gymValidate(newInput);
        // setError(errors);
        return newInput;
      });
      console.table(newGym);
    }

    if (typeAction === "edit") {
      setEditGym(() => {
        const newInput = {
          ...editGym,
          [e.target.name]: e.target.value,
        };
        // const errors = gymValidate(newInput);
        // setError(errors);
        return newInput;
      });
      console.table(editGym);
    }
  }

  // -----------------------delete Trainer-------------------------------------
  function handleDeleteT(e) {
    e.preventDefault();
    if (typeAction === "create") {
      setNewGym({
        ...newGym,
        trainers: newGym.trainers.filter((el) => el !== e.target.value),
      });
    }
    if (typeAction === "edit") {
      setEditGym({
        ...editGym,
        trainers: editGym.trainers.filter((el) => el !== e.target.value),
      });
    }
  }
  //------------------------------- Add photo -------------------------------
  function addTrainer(e) {
    e.preventDefault();

    if (name && typeAction === "create") {
      if (!newGym.trainers.includes(name)) {
        // console.log('entra');
        let newState = [...newGym.trainers];
        newState.push(name);

        setNewGym({
          ...newGym,
          trainers: newState,
        });
      }
    }
    if (name && typeAction === "edit") {
      // console.log('entra');
      if (!editGym.trainers.includes(name)) {
        let newState = [...editGym.trainers];
        newState.push(name);

        setEditGym({
          ...editGym,
          trainers: newState,
        });
      }
    }
    setName("");
    // console.log(editGym.trainers)
    // console.log(newGym.trainers)
  }

  //----------------------- delete photo --------------------------------------
  function handleDeletePhoto(e) {
    e.preventDefault();

    if (typeAction === "create") {
      setNewGym({
        ...newGym,
        image: newGym.image.filter((el) => el !== e.target.value),
      });
    }

    if (typeAction === "edit") {
      setEditGym({
        ...editGym,
        image: editGym.image.filter((el) => el !== e.target.value),
      });
    }
  }

  //----------------------- add photo -----------------------------------------

  function addPhoto(e) {
    e.preventDefault();

    if (photo && typeAction === "create") {
      if (!newGym.image.includes(photo)) {
        // console.log('entra');
        let newState = [...newGym.image];
        newState.push(photo);

        setNewGym({
          ...newGym,
          image: newState,
        });
      }
    }
    if (photo && typeAction === "edit") {
      if (!editGym.image.includes(photo)) {
        let newState = [...editGym.image];
        newState.push(photo);

        setEditGym({
          ...editGym,
          image: newState,
        });
      }
    }
    // console.log(editGym.image)
    // console.log(newGym.image)
    setPhoto("");
  }

  //-----------------------------------------------------------------------------
  return (
    <div className={styles.editPartnerMainContainer}>
      <h3>
        FORMULARIO DE {typeAction === "create" ? "CREACIÓN" : "EDICIÓN"} DE GYM
      </h3>
      {/* <div>latNew{newGym.latitude}, LonNew{newGym.longitude}</div>
      <div>latEdit{editGym.latitude}, LonEdit{editGym.longitude}</div> */}
      <div>
        <div className={styles.headerFormPartnerGym}>
          <button
            className={styles.btnCreateEditGym}
            onClick={() => {
              setTypeAcyion("edit");
            }}
          >
            Form Editar Gym
          </button>
          <p></p>
          <button
            className={styles.btnCreateEditGym}
            onClick={() => {
              setTypeAcyion("create");
            }}
          >
            Form Crear Gym
          </button>
          <p></p>
        </div>
        {/* {typeAction ? typeAction : null} */}

        <form action="" className={styles.formCrEdGyms}>
          <div className={styles.formLogo}>
            {newGym.logo && (
              <img
                className={styles.imageform}
                src={newGym.logo}
                alt="Image not found"
              />
            )}
            {editGym.logo && (
              <img
                className={styles.imageform}
                src={editGym.logo}
                alt="Image not found"
              />
            )}
            <div
              style={{ display: "flex", gap: ".5rem", alignItems: "center" }}
            >
              <label>
                <strong>*</strong>Logo:
              </label>
              <input
                type="text"
                className={styles.inputImageLogo}
                value={typeAction === "create" ? newGym.logo : editGym.logo}
                name="logo"
                onChange={(e) => handleChange(e)}
                placeholder="https://logo-gym.jpg"
              />
            </div>
          </div>
          <div className={styles.mainInfoForm}>
            <div>
              <label>
                <strong>*</strong>Nombre:{" "}
              </label>
              <input
                // className={error.name && styles.inputdanger}
                className={styles.inputImageLogo}
                type="text"
                name="name"
                value={typeAction === "create" ? newGym.name : editGym.name}
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder="Nombre..."
              />
              {error.name && <p className={styles.danger}>{error.name}</p>}
            </div>

            <div>
              <label>
                <strong>*</strong>Mensualidad:{" "}
              </label>
              <input
                // className={error.name && styles.inputdanger}
                className={styles.inputImageLogo}
                type="number"
                name="price"
                value={typeAction === "create" ? newGym.price : editGym.price}
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder="$..."
              />
              {error.price && <p className={styles.danger}>{error.price}</p>}
            </div>
          </div>
          <div className={styles.mainInfoForm}>
            <div>
              <label>
                <strong>*</strong>Telefono:{" "}
              </label>
              <input
                // className={error.phone && styles.inputdanger}
                className={styles.inputImageLogo}
                type="number"
                name="phone"
                value={typeAction === "create" ? newGym.phone : editGym.phone}
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder="+549......"
              />
              {error.phone && <p className={styles.danger}>{error.phone}</p>}
            </div>

            <div>
              <label>Email: </label>
              <input
                // className={error.email && styles.inputdanger}
                className={styles.inputImageLogo}
                type="email"
                name="email"
                value={typeAction === "create" ? newGym.email : editGym.email}
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder="correo@ejemplo.com"
              />
              {error.email && <p className={styles.danger}>{error.email}</p>}
            </div>
          </div>
          <div>
            <div>
              <label>Entrenadores: </label>

              <input
                // className={error.name && styles.inputdanger}
                className={styles.inputImageLogo}
                type="text"
                name="names"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="nombre del entrenador"
              />

              <button
                onClick={(e) => {
                  addTrainer(e);
                }}
              >
                {" "}
                +{" "}
              </button>

              {error.email && <p className={styles.danger}>{error.email}</p>}

              <ul>
                <li className={styles.input}>
                  {newGym.trainers.length && typeAction === "create"
                    ? newGym.trainers.map((e) => (
                        <div key={e} className={styles.listTrainGym}>
                          <p>{e} </p>
                          <button value={e} onClick={(e) => handleDeleteT(e)}>
                            x
                          </button>{" "}
                        </div>
                      ))
                    : null}

                  {editGym.trainers.length && typeAction === "edit"
                    ? editGym.trainers.map((e) => (
                        <div key={e} className={styles.listTrainGym}>
                          <div className={styles.trainersStyle}>
                            <p style={{marginTop: ".35rem"}}>{e} </p>
                            <button value={e} onClick={(e) => handleDeleteT(e)}>
                              x
                            </button>
                          </div>
                        </div>
                      ))
                    : null}
                </li>
              </ul>
            </div>
          </div>

          <div>
            <label>Fotos: </label>

            <input
              type="text"
              className={styles.inputImageLogo}
              name="photo"
              id="image"
              multiple
              value={photo}
              onChange={(e) => {
                setPhoto(e.target.value);
              }}
              placeholder="https://foto-del-gym.jpg"
            />
            <button
              onClick={(e) => {
                addPhoto(e);
              }}
            >
              {" "}
              +{" "}
            </button>

            <ul>
              <li className={styles.input}>
                {newGym.image.length && typeAction === "create"
                  ? newGym.image.map((e) => (
                      <div key={e}>
                        <img
                          className={styles.photoform}
                          src={e}
                          key={e}
                          alt="No Found"
                        />
                        <button value={e} onClick={(e) => handleDeletePhoto(e)}>
                          x
                        </button>{" "}
                      </div>
                    ))
                  : null}

                {editGym.image.length && typeAction === "edit"
                  ? editGym.image.map((e) => (
                      <div key={e}>
                        <img
                          className={styles.photoform}
                          src={e}
                          key={e}
                          alt="No Found"
                        />
                        <button value={e} onClick={(e) => handleDeletePhoto(e)}>
                          x
                        </button>{" "}
                      </div>
                    ))
                  : null}
              </li>
            </ul>
          </div>
        </form>
        <MapGyms/>
      </div>
      <p></p>
      {typeAction === "create" && (
        <button
          onClick={(e) => {
            onClickCreateGym(e);
          }}
        >
          Crear Gym
        </button>
      )}
      {typeAction === "edit" && (
        <button
          className={styles.btnCreateEditGym}
          onClick={(e) => {
            onClickEditGym(e);
          }}
        >
          {" "}
          Editar Gym
        </button>
      )}
    </div>
  );
}
