import React from "react";
import { useState, useEffect } from "react";
import validate from "./validation";
import avatar from "../../asets/icons/avatar.jpg";
import styles from "./styles/form.module.css";
import { updateUserInfo } from "../../redux/actions/index";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MapUser from "../MapsAndGeo/MapUser";
import {getAttributeDesease} from '../../redux/actions/index';

export default function FormUser() {
  const navigate = useNavigate();

  const { userId } = useParams();

  const deseaseAttribute = useSelector((state) => state.deseaseAttribute);
  const user = useSelector((state) => state.currentUserDetails);
  console.log("user", user)
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getAttributeDesease())
}, []);


  const [dese, setDese] = useState({
    desease: "",
    trainlimits: "",
    considerations: ""
  })
  const [input, setInput] = useState({
       name: "",
       username: "",
       avatar: "",
       lastname: "",
       phone: "",
       birthday: "",
       gender: "",
       photo: "",
       address: "",
       apartment: "",
       neighborhood: "",
       city: "",
       country: "",
       zipCode: "",
       desease:[],
       
    /* name: user.name,
    username: user.username,
    // avatar: "",
    lastname: user.lastname,
    phone: user.phone,
    birthday: user.birthday,
    gender: user.gender,
    photo: user.photo,
    street: user.street,
    floor: user.floor,
    address: user.address,
    apartment: user.apartment,
    neighborhood: user.neighborhood,
    city: user.city,
    country: user.country,
    zipCode: user.zipCode, */
  });

  const [error, setError] = useState({});

  function handleOnChange(e) {
    /* let concatDesease = "";
    if(e.target.name = "inpDesease"){
      concatDesease = [...concatDesease + e.target.value ]
      console.log("concatDesease", concatDesease)
     
    }
    if (e.target.name= "but"){
      setInput({
        ...input,
        desease: [...input.desease, concatDesease[1]]
      }); 
    } */
    if(e.target.name !== "inpDesease" && e.target.name !== "but"){
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      }); 
      setError(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    }
    
    console.log("input", input);
    console.log(error);
    console.log("target",e.target);
    //console.log(user);

  }

  let concatDesease = {};
  function handleOnChange3(e){
      /* const filtrar = input.desease.filter(d =>  d.desease === e.target.value)*/
      
      const fil = input.desease.filter(d =>  d.desease.toLowerCase() === dese.desease.toLowerCase())
      console.log("fil", fil); 
    if(e.target.name == "desease"  && e.target.name !== "but"  /* && e.target.name !== "considerations"  && e.target.name !=="trainlimits"  */){
      //concatDesease = [...concatDesease ,  e.target.value ]
      setDese({
        ...dese,
        desease : e.target.value
      })
      console.log("concatDesease", concatDesease)
      console.log("dese", dese);
     
    }
     else if (dese.desease){
      
       console.log("fil", fil); 
       console.log("estoy dentro")
       if(fil.length){
         alert ("deberias agregar una enfemedad diferente")
         setDese({
           ...dese,
           desease:""
         })
        //setDese("no se puede agregar una enfermedad ya agregada")
        } else {
         
          setDese({
            ...dese,
            [e.target.name]: e.target.value
          })
      setInput({
            ...input,
            desease: [...input.desease, dese]
          })
          setDese({
            desease: "",
            trainlimits: "",
            considerations: ""
          })
          /* let formulario = document.getElementById('desease');
          console.log("formulario", formulario)
           formulario.reset()
          console.log("formulario.value", formulario.value) */
          
        }
        
     } 
     else {
      alert("debes agregar una enfermedad")
    } 
    console.log("input", input);
    console.log("dese", dese);
    console.log("concatDesease", concatDesease);
    //console.log(error);
    console.log("target",e);
  } 

  function handleOnChange4(e){
    // if (e.target.name === "considerations") {
      //concatDesease.considerations = e.target.value
      /* setInput({
        ...input,
        [e.target.name]: e.target.value,
      }); */
    //}
    //else if (e.target.name === "trainlimits") {
      //concatDesease.trainlimits = e.target.value
      /* setInput({
        ...input,
        [e.target.name]: e.target.value,
      }); */
    //} 
    setDese({
      ...dese,
      [e.target.name]: e.target.value
    }) 
    console.log("input", input);
    console.log("concatDesease", concatDesease);
    //console.log(error);
    console.log("target",e);
  
  }

  async function handleOnChange2(e) {
    /* const imagen = e.target.value
        const url = URL.fileReader(imagen)
        console.log(imagen) */
    const preview = document.querySelector("img");
    console.log("preview", preview);
    const fileInput = document.getElementById("image");
    console.log("fileInput", fileInput);
    const file = fileInput.files[0];
    console.log("file", file);
    const reader = await new FileReader();
    console.log("reader", reader);
    reader.addEventListener(
      "load",
      async function () {
        preview.src = await reader.result;
        //const srcc = document.querySelector('img').getAttribute('src');
        //console.log("srcc", srcc)
        setInput({
          ...input,
          photo: preview.src,
        });
        console.log("preview.src", preview.src);
      },
      false
    );
    //let valor_src= $("#mitabla img").attr("src");
    if (file) {
      reader.readAsDataURL(file);
    }
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    
    console.log("input", input);
    //console.log(error);
    console.log("e.target.value", e.target.result);
  }
  
    

  function handleSelect(e) {
    console.log(e);

    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
    console.log(error);
  }

  function handleSelectDeseases(e){
    const filtro = input.desease.filter(d =>  d.desease.toLowerCase() === e.target.value.toLowerCase())
    if (filtro.length){
      alert("deberias agregar una enfermedad diferente")
    } else {
      setDese({
        desease : e.target.value
      })
    } 
    
    
    /* if(!input.desease.includes(e.target.value) && e.target.name !== "inpDesease" 
       && e.target.name !== "but" && input.desease.length === 0){

    setInput({
        ...input,
       desease: [...input.desease, e.target.value]
    })
    } */
    
    /* setError(validate({
        ...input,
        types :  [...input.types, e.target.value]
    }))  */ 
    console.log("e.t.name", e.target.name);
    console.log("concatDes", concatDesease);
    console.log("value", e.target.value);
    console.log("filtro", filtro);
}

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    console.log("entro aqui");
    dispatch(updateUserInfo(userId, input));
    // setInput({
    //   name: "",
    //   username: "",
    //   avatar: "",
    //   lastname: "",
    //   phone: "",
    //   birthday: "",
    //   gender: "",
    //   photo: "",
    //   address: "",
    //   apartment: "",
    //   neighborhood: "",
    //   city: "",
    //   country: "",
    //   zipCode: "",
    // });
    alert("se modifico el usuario");
    navigate("/home");
    //history.push('/home')
  }

  function handleDelete(e) {
    setInput({
      ...input,
      photo: "",
    });
  }

  function handleDeleteDse(e){
    setInput({
        ...input,
        desease: input.desease.filter(c=> c !== e)
    })
}

  return (
    <div>
      <h1>Datos del Usuario</h1>
      <p>Aqui puedes completar los datos de tu información personal, esta información es muy importante para nosotros
        <br />tanto como lo es para tí, es por eso que la tratarémos con la mayor confidencialidad y discreción,
        <br />puedes consultar nuestro anuncio de privacidad aqui</p>
      <form>
        <div>
          {/* <label>NAME: </label>
                    <input  type= "text" name= "name" onChange= {(e)=>handleOnChange(e)}/>
                    {error.name&& (
                        <p  className={styles.parrafo} >{error.name}</p>
                    )}  */}
          <label>USERNAME: </label>
          <input
            className={error.username ? styles.inputError : styles.input}
            type="text"
            placeholder="username"
            name="username"
            onChange={(e) => handleOnChange(e)}
          />
          {error.username && <p className={styles.parrafo}>{error.username}</p>}
          <div>
            <label>AVATAR: </label>
            <select
              className={error.avatar ? styles.inputError : styles.input}
              name="avatar"
              onChange={(e) => handleSelect(e)}
            >
              <option id="pok">--</option>
              <option>Solitario </option>
              <option>Agudo </option>
              <option>Sensitivo</option>
              <option>Estructurado</option>
              <option>Energetico</option>
            </select>
            {error.avatar && <p className={styles.parrafo}>{error.avatar}</p>}
          </div>
          <div>
            <label>LASTNAME: </label>
            <input
              className={error.lastname ? styles.inputError : styles.input}
              type="text"
              name="lastname"
              onChange={(e) => handleOnChange(e)}
            />
            {error.lastname && (
              <p className={styles.parrafo}>{error.lastname}</p>
            )}
          </div>
          <div>
            <label>PHONE: </label>
            <input
              className={error.phone ? styles.inputError : styles.input}
              type="tel"
              name="phone"
              onChange={(e) => handleOnChange(e)}
            />
            {error.phone && <p className={styles.parrafo}>{error.phone}</p>}
          </div>
          <div>
            <label>BIRTHDAY: </label>
            <input
              className={error.birthday ? styles.inputError : styles.input}
              type="date"
              name="birthday"
              onChange={(e) => handleOnChange(e)}
            />
            {error.birthday && (
              <p className={styles.parrafo}>{error.birthday}</p>
            )}
          </div>
          <div>
            <label>GENDER: </label>
            <select
              className={error.gender ? styles.inputError : styles.input}
              name="gender"
              onChange={(e) => handleSelect(e)}
            >
              <option id="GEN">--</option>
              <option value="femenine">femenine</option>
              <option value="male">male</option>
            </select>
          </div>
          <div>
            <label>PHOTO: </label>
            <input
              type="file"
              name="photo"
              id="image"
              onChange={(e) => handleOnChange2(e)}
            />
            {error.photo && <p className={styles.parrafo}>{error.photo}</p>}
            <div id="result-image">
              {/* <img src="" id="img-result" onChange={(e) => handleOnChange2(e)}/> */}
            </div>
          </div>
          <div>
            {!input.photo ? (
              <img src={avatar} width="200px" alt="avatar" />
            ) : (
              <img src={input.photo} width="200px" alt="tu foto" />
            )}
            {input.photo && (
              <button type="button" onClick={() => handleDelete()}>
                Quitar foto
              </button>
            )}
          </div>
          <div>
            <h1>DISEASES</h1>


            <select /* className={!input.types.length? styles.inputError :  styles.input } */ onChange={(e) => handleSelectDeseases(e)}>
               <option id='des' disabled >Desease...</option>
               {
                        deseaseAttribute.map(e=> {
                                return(
                                    <option value= {e} key= {e}>{e} </option>
                                )                            
                        })
                    } 
            </select>
            {/* {(input.types.length === 0 || input.types.length > 2) && (
                        <p className={styles.parrafo}>{error.types}</p>
                    )}   */}


             {input.desease.map(e =>
              <div key={e.desease}>
                <p>{e.desease}</p>
                <button  className={styles.btn} type="button"  onClick={() => handleDeleteDse(e)}>x</button>
              </div>
            )}  


            <input
              id="desease"
              className={error.desease ? styles.inputError : styles.input}
              type="text"
              placeholder="inpDesease"
              name="desease"
              value= {dese.desease}
              onChange={(e) => handleOnChange3(e)}
            />
            {error.desease && <p className={styles.parrafo}>{error.desease}</p>}
            <textarea
              className={error.trainlimits ? styles.inputError : styles.input}
              type="text"
              placeholder="trainlimits"
              name="trainlimits"
              onChange={(e) => handleOnChange4(e)}
            />
            {error.trainlimits && <p className={styles.parrafo}>{error.trainlimits}</p>}
            <textarea
              className={error.considerations ? styles.inputError : styles.input}
              type="text"
              placeholder="considerations"
              name="considerations"
              onChange={(e) => handleOnChange4(e)}
            />
            <button name="but" type="button" onClick={(e) => handleOnChange3(e)}>
                save desease
              </button>
           {/*{error.desease && <p className={styles.parrafo}>{error.desease}</p>} */}
            {error.considerations && <p className={styles.parrafo}>{error.considerations}</p>}
          </div>
          <div>
            <section>
              <MapUser />
            </section>
            <label>ADDRESS: </label>

            <input
              className={error.street ? styles.inputError : styles.input}
              type="number"
              name="street"
              placeholder="street"
              onChange={(e) => handleOnChange(e)}
            />
            {error.street && <p className={styles.parrafo}>{error.street}</p>}

            <input
              className={error.floor ? styles.inputError : styles.input}
              type="number"
              name="floor"
              placeholder="floor"
              onChange={(e) => handleOnChange(e)}
            />
            {error.floor && <p className={styles.parrafo}>{error.floor}</p>}
            <input
              className={error.address ? styles.inputError : styles.input}
              type="text"
              name="address"
              placeholder="address"
              onChange={(e) => handleOnChange(e)}
            />
            {error.address && <p className={styles.parrafo}>{error.address}</p>}
            <input
              className={error.apartment ? styles.inputError : styles.input}
              type="number"
              name="apartment"
              placeholder="apartment"
              onChange={(e) => handleOnChange(e)}
            />
            {error.apartment && (
              <p className={styles.parrafo}>{error.apartment}</p>
            )}
            <input
              className={error.neighborhood ? styles.inputError : styles.input}
              type="text"
              name="neighborhood"
              placeholder="neighborhood"
              onChange={(e) => handleOnChange(e)}
            />
            {error.neighborhood && (
              <p className={styles.parrafo}>{error.neighborhood}</p>
            )}
            <input
              className={error.city ? styles.inputError : styles.input}
              type="text"
              name="city"
              placeholder="city"
              onChange={(e) => handleOnChange(e)}
            />
            {error.city && <p className={styles.parrafo}>{error.city}</p>}
            <input
              className={error.country ? styles.inputError : styles.input}
              type="text"
              name="country"
              placeholder="country"
              onChange={(e) => handleOnChange(e)}
            />
            {error.country && <p className={styles.parrafo}>{error.country}</p>}
            <input
              className={error.zipCode ? styles.inputError : styles.input}
              type="number"
              name="zipCode"
              placeholder="zipCode"
              onChange={(e) => handleOnChange(e)}
            />
            {error.zipCode && <p className={styles.parrafo}>{error.zipCode}</p>}
          </div>
          <div>
            {error.lastname ||
              error.phone ||
              error.birthday ||
              error.gender ||
              error.photo ||
              error.street ||
              error.floor ||
              error.address ||
              error.apartment ||
              error.neighborhood ||
              error.city ||
              error.country ||
              error.zipCode ? (
              <button type="submit" disabled>
                SAVE CHANGES
              </button>
            ) : (
              <button
                className={styles.btn}
                type="submit"
                onClick={(e) => handleSubmit(e)}
              >
                SAVE CHANGES
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
