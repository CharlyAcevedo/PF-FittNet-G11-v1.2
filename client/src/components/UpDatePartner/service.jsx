import { useEffect, useState } from "react";
import styles from "./style/client.module.css";
import { serviceValidate } from "./controlers/validaciones";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { createService } from "../../redux/actions";
// import { SweetAlrt, SweetAlrtTem } from "../../asets/helpers/sweetalert";
import { createOneService, editOneService } from "./controlers/Functions";

export default function Services(props) {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // useEffect(()=>{
  //   if (props.view === "create") {
  //     setTypeAcyion("create");
  //     props.id ? setGymId (props.id) : null;  
  //   }
  // })


  const userId = localStorage.getItem('userId');

  const [typeAction, setTypeAcyion] = useState("create");
  // const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [gymId, setGymId] = useState("");


  const [newService, setNewService] = useState({
    name: "Nombre del servicio", // string requerido
    description: "Descripción del servicio", // string requerido
    duration: 30, // numero en minutos
    price: 0, // numero requerido
    photo: [], // Array de strings
    profileCategory: [],
  });
  const [error, setError] = useState({});


  const [editService, setEditService] = useState({
    name: "Nuevo nombre", // string requerido
    description: "Nueva descripción del servicio", // string requerido
    duration: 45, // numero en minutos
    price: 99, // numero requerido
    photo: [], // Array de strings
    profileCategory: [],
  });

  let myGyms = [{ name: "gym 1", id: "123" }, { name: "gym 2", id: "234" },
  { name: "gym 3", id: "345" }];


  //----------------------------------------------------------------------------
  // Faltaría tener un select o un switch para saber si se está creando o editando,
  // pero de todas formas usamos el mismo form para las dos cosas (crear y editar)   
  //----------------------------------------------------------------------------


  //----------------------------------------------------------------------------
  // Esta función sirve para crear un gym           
  //----------------------------------------------------------------------------
  async function onClickCreateService() {
    let dataForNewService = {
      gymId: { gymId: gymId },
      dataNewService: newService
    };

    // gymId: el id del gym que crea el servicio
    // dataNewService: en este objeto va todo lo que obtienen del formulario (el input de arriba)

    console.log('recibe el click y crea un service')
    let newOnService = await createOneService(dataForNewService);
    return newOnService;

  }

  //----------------------------------------------------------------------------
  // Esta función sirve para editar la info de un gym       
  //----------------------------------------------------------------------------

  async function onClickEditService() {
    let dataForEditService = {
      serviceId: { serviceId: "serviceId" },
      newDataService: editService
    };

    // serviceId: el id del service a editar
    // dataNewService: en este objeto va todo lo que obtienen del formulario (el input de arriba)

    console.log('recibe el click y edita un gym')
    let editOnService = await editOneService(dataForEditService);
    return editOnService;

  }

  //----------------HANDLECHANGE----------------------------------------------
  function handleChange(e) {
    if (typeAction === "create") {
      setNewService(() => {
        const newInput = {
          ...newService,
          [e.target.name]: e.target.value,
        };
        // const errors = gymValidate(newInput);
        // setError(errors);
        return newInput;
      });
      // console.table(newService);
    }

    if (typeAction === "edit") {
      setEditService(() => {
        const newInput = {
          ...editService,
          [e.target.name]: e.target.value,
        };
        // const errors = gymValidate(newInput);
        // setError(errors);
        return newInput;
      });
      // console.table(editService);
    }
  }

  function handleChangeGyms(e) {
    if (e.target.value !== "...") {
      e.preventDefault();
      setGymId(e.target.value);
      console.log(e.target.value, ' estoy en el select dentro del if')
      
    } else {
      setGymId("");
    }
    console.log(e.target.value, ' estoy en el select')
  }


  function addPhoto(e) {
    e.preventDefault();

    if (photo && typeAction === "create") {

      if (!newService.photo.includes(photo)) {
        // console.log('entra');
        let newState = [...newService.photo]
        newState.push(photo);

        setNewService({
          ...newService,
          photo: newState,
        });
      }
    }
    if (photo && typeAction === "edit") {

      if (!editService.photo.includes(photo)) {
        let newState = [...editService.photo]
        newState.push(photo);

        setEditService({
          ...editService,
          photo: newState,
        });
      }
    }
    // console.log(editGym.image)
    // console.log(newGym.image)
    setPhoto("");

  }

  //----------------------- delete photo --------------------------------------
  function handleDeletePhoto(e) {
    e.preventDefault();

    if (typeAction === "create") {
      setNewService({
        ...newService,
        photo: newService.photo.filter((el) => el !== e.target.value),
      });
    }

    if (typeAction === "edit") {
      setEditService({
        ...editService,
        photo: editService.photo.filter((el) => el !== e.target.value),
      });
    }

  }















  return (

    <div className={styles.editPartnerMainContainer}>
      <h3>FORMULARIO DE {typeAction === "create" ? "CREACIÓN" : "EDICIÓN"} DE PRODUCTO O SERVICIO</h3>
      <div>

        <button onClick={() => { setTypeAcyion("edit") }}>Editar Gym</button>
        <p></p>
        <button onClick={() => { setTypeAcyion("create") }}>Crear Gym</button>
        <p></p>
        {typeAction ? typeAction : null}

        <form action="">
          <div>
            <label>Gimnasios: </label>            
            <select onChange={(e) => handleChangeGyms(e)}>
            <option key="id1">...</option>
              {myGyms.length > 0 ? myGyms.map((g) => (
                <option key={g.id} value={g.id}>{g.name}</option>
              )) : null}
            </select>
            {gymId ? gymId : null}
          </div>

          <div>
            <label>
              <strong>*</strong>Nombre:{" "}
            </label>
            <input
              className={error.name && styles.inputdanger}
              type="text"
              name="name"
              value={typeAction === "create" ? newService.name : editService.name}
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Nombre del servicio..."
            />
            {error.name && <p className={styles.danger}>{error.name}</p>}
          </div>

          <div>
            <label>Descripcion: </label>
            <input
              className={error.description && styles.inputdanger}
              onChange={(e) => handleChange(e)}
              value={typeAction === "create" ? newService.description : editService.description}
              type="text"
              name="description"
              placeholder="Una breve descripcion..."
            />{" "}
            {error.description && (
              <p className={styles.danger}>{error.description}</p>
            )}
            <text>{typeAction === "create" ? newService.descripcion : editService.descripcion}</text>
          </div>

          <div>
            <label>Duracion:</label>
            <input className='inputScore' type="range" name="duration"
              min="1" max="90" step="1"
              value={typeAction === "create" ? newService.duration : editService.duration}
              // onClick={(e) => validateSubmit(e)}
              onChange={(e) => handleChange(e)}
            />
            {typeAction === "create" && newService.duration ? `${newService.duration} minutos` : null}
            {typeAction === "edit" && editService.duration ? `${editService.duration} minutos` : null}

            {error.duration && <p className={styles.danger}>{error.duration}</p>}

          </div>
          <div>
            <label>
              <strong>*</strong>Precio:{" "}
            </label>
            <input
              className={error.name && styles.inputdanger}
              type="number"
              name="price"
              value={typeAction === "create" ? newService.price : editService.price}
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="$..."
            />
            {error.price && <p className={styles.danger}>{error.price}</p>}
          </div>

          <div>
            <label>Fotos: </label>

            <input
              type="text"
              name="photo"
              id="image"
              multiple
              value={photo}
              onChange={(e) => { setPhoto(e.target.value) }}
              placeholder="https://foto-del-gym.jpg"
            />
            <button onClick={(e) => { addPhoto(e) }}> + </button>


            <ul>
              <li className={styles.input}>
                {newService.photo.length && typeAction === "create" ? newService.photo.map((e) => (
                  <div key={e}>

                    <img className={styles.photoform}
                      src={e}
                      key={e}
                      alt="No Found"
                    />
                    <button value={e} onClick={(e) => handleDeletePhoto(e)}>
                      x
                    </button>{" "}
                  </div>
                )) : null}

                {editService.photo.length && typeAction === "edit" ? editService.photo.map((e) => (
                  <div key={e}>

                    <img className={styles.photoform}
                      src={e}
                      key={e}
                      alt="No Found"
                    />
                    <button value={e} onClick={(e) => handleDeletePhoto(e)}>
                      x
                    </button>{" "}
                  </div>
                )) : null}
              </li>
            </ul>
          </div>








          {/* {newGym.logo && (<img className={styles.imageform} src={newGym.logo} alt="Image not found" />)}
          {editGym.logo && (<img className={styles.imageform} src={editGym.logo} alt="Image not found" />)}
           */}
          {/* <div>
            <label><strong>*</strong>Logo:</label>
            <input
              type="text"
              value={typeAction === "create" ? newGym.logo : editGym.logo}
              name="logo"
              onChange={(e) => handleChange(e)}
              placeholder="https://logo-gym.jpg"
            />
          </div> */}

          {/* <div>
            <label>
              <strong>*</strong>Nombre:{" "}
            </label>
            <input
              className={error.name && styles.inputdanger}
              type="text"
              name="name"
              value={typeAction === "create" ? newGym.name : editGym.name}
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Nombre..."
            />
            {error.name && <p className={styles.danger}>{error.name}</p>}
          </div> */}

          {/* <div>
            <label>
              <strong>*</strong>Mensualidad:{" "}
            </label>
            <input
              className={error.name && styles.inputdanger}
              type="number"
              name="price"
              value={typeAction === "create" ? newGym.price : editGym.price}
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="$..."
            />
            {error.price && <p className={styles.danger}>{error.price}</p>}
          </div> */}

          {/* <div>
            <label>
              <strong>*</strong>Telefono:{" "}
            </label>
            <input
              className={error.phone && styles.inputdanger}
              type="number"
              name="phone"
              value={typeAction === "create" ? newGym.phone : editGym.phone}
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="+549......"
            />
            {error.phone && <p className={styles.danger}>{error.phone}</p>}
          </div> */}

          {/* <div>
            <label>
              Email:{" "}
            </label>
            <input
              className={error.email && styles.inputdanger}
              type="email"
              name="email"
              value={typeAction === "create" ? newGym.email : editGym.email}
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="correo@ejemplo.com"
            />
            {error.email && <p className={styles.danger}>{error.email}</p>}
          </div> */}


          {/* <div>
            <div>
              <label>Entrenadores: </label>

              <input
                className={error.name && styles.inputdanger}
                type="text"
                name="names"
                value={name}
                onChange={(e) => { setName(e.target.value) }}
                placeholder="nombre del entrenador"
              />

              <button onClick={(e) => { addTrainer(e) }}> + </button>

              {error.email && <p className={styles.danger}>{error.email}</p>}

              <ul>
                <li className={styles.input}>
                  {newGym.trainers.length && typeAction === "create" ? newGym.trainers.map((e) => (
                    <div key={e}>
                      <p>{e} </p>
                      <button value={e} onClick={(e) => handleDeleteT(e)}>
                        x
                      </button>{" "}
                    </div>
                  )) : null}

                  {editGym.trainers.length && typeAction === "edit" ? editGym.trainers.map((e) => (
                    <div key={e}>
                      <p>{e} </p>
                      <button value={e} onClick={(e) => handleDeleteT(e)}>
                        x
                      </button>{" "}
                    </div>
                  )) : null}
                </li>
              </ul>

            </div>
          </div> */}

          {/* <div>
            <label>Fotos: </label>

            <input
              type="text"
              name="photo"
              id="image"
              multiple
              value={photo}
              onChange={(e) => { setPhoto(e.target.value) }}
              placeholder="https://foto-del-gym.jpg"
            />
            <button onClick={(e) => { addPhoto(e) }}> + </button>


            <ul>
              <li className={styles.input}>
                {newGym.image.length && typeAction === "create" ? newGym.image.map((e) => (
                  <div key={e}>

                    <img className={styles.photoform}
                      src={e}
                      key={e}
                      alt="No Found"
                    />
                    <button value={e} onClick={(e) => handleDeletePhoto(e)}>
                      x
                    </button>{" "}
                  </div>
                )) : null}

                {editGym.image.length && typeAction === "edit" ? editGym.image.map((e) => (
                  <div key={e}>

                    <img className={styles.photoform}
                      src={e}
                      key={e}
                      alt="No Found"
                    />
                    <button value={e} onClick={(e) => handleDeletePhoto(e)}>
                      x
                    </button>{" "}
                  </div>
                )) : null}
              </li>
            </ul>

          </div> */}

        </form>

      </div>
      <p></p>
      {typeAction === "create" &&
        <button onClick={(e) => { onClickCreateService(e) }}>Crear servicio de prueba</button>
      }
      {typeAction === "edit" &&
        <button onClick={(e) => { onClickEditService(e) }}> Editar servicio de prueba</button>
      }

    </div>
  );
}