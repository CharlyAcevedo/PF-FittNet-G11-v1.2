// import { useState } from "react";
// import styles from "./style/client.module.css";
// import { gymValidate } from "./controlers/validaciones";
// import { useNavigate } from "react-router-dom";
// // import { createGym } from "../../redux/actions";
// import { useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
// import { SweetAlrt, SweetAlrtTem } from "../../asets/helpers/sweetalert";
// import { createGym, editGym } from "./controlers/Functions";

// export default function UpdateGym2() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const params = useParams();

//   const [input, setInput] = useState({
//     name: "gym1",
//     price: "33",
//     raiting: "", // no sale del form
//     image: [],
//     address: "2323", 
//     services: [], /// no la voy a poder tocar
//     trainers: [],
//     logo: "dfdf",
//     phone: "df",
//     email: "dfd",
//     uEnd: [], ///
//     gymActive: "", //
//     idName: "",
//     id: "", // id del gym
//   });
  

//   // let newGym = {
//   //   name: gyms[i].name,
//   //   price: gyms[i].price,
//   //   raiting: gyms[i].raiting,
//   //   image: gyms[i].image,
//   //   latitude: gyms[i].latitude,
//   //   longitude: gyms[i].longitude,
//   //   trainers: gyms[i].trainers,
//   //   logo: gyms[i].logo,
//   //   phone: gyms[i].phone,
//   //   email: gyms[i].email,
//   //   gymActive: gyms[i].gymActive,
//   //   favourite: gyms[i].favourite,
//   // }
//   const [error, setError] = useState({});
//   //----------------------------------------------------------------------------
//   // Faltaría tener un select o un switch para saber si se está creando o editando,
//   // pero de todas formas usamos el mismo form para las dos cosas (crear y editar)   
//   //----------------------------------------------------------------------------


//   //----------------------------------------------------------------------------
//   // Esta función sirve para crear un gym           
//   //----------------------------------------------------------------------------
//   async function onClickCreateGym () {
//     let dataForNewGym = { 
//       userId: { userId: "userId" },
//       dataNewGym: { prop1: "data1", prop2: 2, prop3: [], prop4: {} }
//     };
    
//     // userId: el id del usuario partner que crea el gym
//     // dataNewGym: en este objeto va todo lo que obtienen del formulario (el input de arriba)
    
//     console.log('recibe el click y crea un gym')

//     let newGym = await createGym (dataForNewGym);

//     return newGym;

//   }

//   //----------------------------------------------------------------------------
//   // Esta función sirve para editar la info de un gym       
//   //----------------------------------------------------------------------------

//   async function onClickEditGym () {
//     let dataForEditGym = { 
//       //userId: { userId: "userId" },
//       gymId: { gymId: "gymId" },
//       newDataGym: { prop1: "data2", prop2: 3, prop3: ["algo"], prop4: {} }
//     };

//     // gymId: el id del gym a editar
//     // dataNewGym: en este objeto va todo lo que obtienen del formulario (el input de arriba)
    
//     console.log('recibe el click y edita un gym')

//     let editOneGym = await editGym (dataForEditGym);

//     return editOneGym;

//   }












//  //----------------------------------------------------------------------------
//   //!----------------HANDLECHANGE-----------------------
//   function handleChange(e) {
//     setInput(() => {
//       const newInput = {
//         ...input,
//         [e.target.name]: e.target.value,
//         idName: params.name,
//         id: params.id,
//       };
//       const errors = gymValidate(newInput);
//       setError(errors);
//       return newInput;
//     });
//     console.table(input);
//   }
//   //!------------------IMAGE---------------
//   function handleChangeImage(e) {
//     setInput(() => {
//       const newImage = {
//         ...input,
//         image: input.image.includes(e.target.value)
//           ? [...input.image]
//           : [...input.image, e.target.value],
//       };

//       return newImage;
//     });
//     console.log(input.image);
//   }
//   //!deleted image
//   function handleDeleteI(e) {
//     setInput({
//       ...input,
//       image: input.image.filter((el) => el !== e.target.value),
//     });
//     console.log("Trainers borrado:", e);
//   }

//   //!------------------SERVICES---------------
//   // function handleChangeServices(e) {
//   //   setInput(() => {
//   //     const newServices = {
//   //       ...input,
//   //       services: input.services.includes(e.target.value)
//   //         ? [...input.services]
//   //         : [...input.services, e.target.value],
//   //     };
//   //     return newServices;
//   //   });
//   // }
  
//   //!deleted services

//   // function handleDelete(e) {
//   //   setInput({
//   //     ...input,
//   //     services: input.services.filter((el) => el !== e.target.value),
//   //   });
//   //   console.log("ESTO ES DELET", e);
//   // }

//   //!-------------------Trainers-----------------------------

//   function handleChangeTrainers(e) {
//     setInput(() => {
//       const newTrainers = {
//         ...input,
//         trainers: input.trainers.includes(e.target.value)
//           ? [...input.trainers]
//           : [...input.trainers, e.target.value],
//       };
//       return newTrainers;
//     });
//   }
//   //!deleted Trainers
//   function handleDeleteT(e) {
//     setInput({
//       ...input,
//       trainers: input.trainers.filter((el) => el !== e.target.value),
//     });
//     console.log("Trainers borrado:", e);
//   }
//   //!------------------uEnd---------------
//   function handleChangeUend(e) {
//     setInput(() => {
//       const newuEnd = {
//         ...input,
//         uEnd: input.uEnd.includes(e.target.value)
//           ? [...input.uEnd]
//           : [...input.uEnd, e.target.value],
//       };
//       return newuEnd;
//     });
//   }
//   //!deleted uEnd
//   function handleDeleteU(e) {
//     setInput({
//       ...input,
//       uEnd: input.uEnd.filter((el) => el !== e.target.value),
//     });
//     console.log("Usuario borrado:", e);
//   }
//   //!------------------SUBMIT------------------------
//   function handleSubmit(e) {
//     e.preventDefault();
//     if (
//       !input.name ||
//       !input.address ||
//       !input.image ||
//       !input.phone ||
//       !input.price ||
//       !input.services ||
//       !input.email
//     ) {
//       return SweetAlrt("Error", "Todos los campos deben estar completos","error")
//       // return alert("Todos los campos deben estar completos!");
//     } else {
//       // dispatch(createGym(input));
//      SweetAlrtTem("Exito! Gym Registrado","success")
//       // alert("Gym Registrado!");
//       setInput({
//         ...input,
//         name: "",
//         price: "",
//         raiting: "",
//         image: [],
//         address: "",
//         services: [],
//         trainers: [],
//         logo: "",
//         phone: "",
//         email: "",
//         uEnd: [],
//         gymActive: "",
//       });
//       setError({});
//       navigate("/profile/edit/partner/:name/:userId/gym/service");
//     }
//   }

//   //!--------------------------------------------------

//   const usuarios = ["Pedro", "Carlos", "Fernando", "Esteban", "Luis", "Jessi"];
//   const entrenadores = [
//     "Pedro",
//     "Carlos",
//     "Fernando",
//     "Esteban",
//     "Luis",
//     "Jessi",
//     "gaby",
//     "Seba",
//   ];
//   //?-------------------------------------------
//   //LEER!
//   //SUGERENCIA!!
//   //INSERTAR CODIGO DE ESTILOS EN LOS INPUT DE LA SIGUIENTE MANERA
//   //className={(error.name && styles.inputdanger) || styles.EL-ESTILO-A-AGREGAR}
//   //PARA EVITAR PISAR ESTILOS DE ERRORES.

//   return (
//     <div className={styles.editPartnerMainContainer}>
//       <h1>FORMULARIO GYM</h1>
//       <span>
//         Los campos marcados con <strong>*</strong> deben ser completados
//       </span>
//       <div>

//         <p>
//         <button onClick={(e)=>{onClickCreateGym(e)}}>Crear gym de prueba</button>
//         </p>
//         <p>
//           <button onClick={(e)=>{onClickEditGym(e)}}> Editar gym de prueba</button>
//         </p>






//       </div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>
//             <strong>*</strong>Nombre:{" "}
//           </label>
//           <input
//             className={error.name && styles.inputdanger}
//             type="text"
//             name="name"
//             value={input.name}
//             onChange={(e) => {
//               handleChange(e);
//             }}
//             placeholder="Nombre..."
//           />
//           {error.name && <p className={styles.danger}>{error.name}</p>}
//         </div>
//         <div>
//           <label>
//             <strong>*</strong>Precio:{" "}
//           </label>
//           <input
//             className={error.price && styles.inputdanger}
//             type="number"
//             name="price"
//             value={input.price}
//             onChange={(e) => {
//               handleChange(e);
//             }}
//             placeholder="$..."
//           />
//           {error.price && <p className={styles.danger}>{error.price}</p>}
//         </div>
//         <div>
//           <label>
//             <strong>*</strong>Calificacion:{" "}
//           </label>
//           <input
//             className={error.raiting && styles.inputdanger}
//             type="number"
//             max="5"
//             min="1"
//             name="raiting"
//             value={input.raiting}
//             onChange={(e) => {
//               handleChange(e);
//             }}
//             placeholder="1-5"
//           />
//           {error.raiting && <p className={styles.danger}>{error.raiting}</p>}
//         </div>
//         <div>
//           <label>
//             <strong>*</strong>Direccion:{" "}
//           </label>
//           <input
//             className={error.address && styles.inputdanger}
//             type="text"
//             name="address"
//             value={input.address}
//             onChange={(e) => {
//               handleChange(e);
//             }}
//             placeholder="Direccion"
//           />
//           {error.address && <p className={styles.danger}>{error.address}</p>}
//         </div>
//         <div>
//           <label>
//             <strong>*</strong>Telefono:{" "}
//           </label>
//           <input
//             className={error.phone && styles.inputdanger}
//             type="number"
//             name="phone"
//             value={input.phone}
//             onChange={(e) => {
//               handleChange(e);
//             }}
//             placeholder="+549......"
//           />
//           {error.phone && <p className={styles.danger}>{error.phone}</p>}
//         </div>
//         <div>
//           <label>
//             <strong>*</strong>Email:{" "}
//           </label>
//           <input
//             className={error.email && styles.inputdanger}
//             type="email"
//             name="email"
//             value={input.email}
//             onChange={(e) => {
//               handleChange(e);
//             }}
//             placeholder="correo@ejemplo.com"
//           />
//           {error.email && <p className={styles.danger}>{error.email}</p>}
//         </div>
//         <div>
//           <label>
//             <strong>*</strong>Gym Activo:{" "}
//           </label>
//           <select name="gymActive" onChange={(e) => handleChange(e)}>
//             <option>Activo</option>
//             <option value="true" name="gymActive">
//               On
//             </option>
//             <option value="false" name="gymActive">
//               Off
//             </option>
//           </select>
//         </div>{" "}
//         <div>
//           <label>Usuarios:</label>
//           <select onChange={(e) => handleChangeUend(e)}>
//             {usuarios.map((e) => (
//               <option value={e} key={e}>
//                 {e}
//               </option>
//             ))}
//           </select>
//           <ul>
//             <li className={styles.input}>
//               {input.uEnd.map((e) => (
//                 <div key={e}>
//                   <p>{e} </p>
//                   <button value={e} onClick={(e) => handleDeleteU(e)}>
//                     x
//                   </button>{" "}
//                 </div>
//               ))}{" "}
//             </li>
//           </ul>
//         </div>
//         <div>
//           <label>Entrenadores: </label>
//           <select onChange={(e) => handleChangeTrainers(e)}>
//             {entrenadores.map((e) => (
//               <option value={e} key={e} name="trainers">
//                 {e}
//               </option>
//             ))}
//           </select>
//           <ul>
//             <li className={styles.input}>
//               {input.trainers.map((e) => (
//                 <div key={e}>
//                   <p>{e} </p>
//                   <button value={e} onClick={(e) => handleDeleteT(e)}>
//                     x
//                   </button>{" "}
//                 </div>
//               ))}{" "}
//             </li>
//           </ul>
//         </div>
//         <div>
//           <label>Logo:</label>
//           <input
//             type="file"
//             value={input.logo}
//             name="logo"
//             onChange={(e) => handleChange(e)}
//           />
//         </div>
//         <div>
//           <label>Fotos: </label>

//           <input
//             value={input.image}
//             onChange={(e) => handleChangeImage(e)}
//             type="file"
//             name="image"
//             id="image"
//             multiple
//           />
//           <ul>
//             <li className={styles.input}>
//               {input.image.map((e) => (
//                 <div key={e}>
//                   <p>{e} </p>
//                   <img
//                     src={{ e } || "https://via.placeholder.com/150 "}
//                     key={e}
//                     alt="No Found"
//                   />
//                   <button value={e} onClick={(e) => handleDeleteI(e)}>
//                     x
//                   </button>{" "}
//                 </div>
//               ))}{" "}
//             </li>
//           </ul>
//         </div>
//         <button type="submit">Enviar y continuar</button>
//       </form>
//     </div>
//   );
// }