import React from "react";
import { useState, useEffect } from "react";

import validate from "./validation";
import avatar from "../../asets/icons/avatar.jpg";
import styles from "./styles/form.module.css";
import { updateUserInfo } from "../../redux/actions/index";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MapUser from "../MapsAndGeo/MapUser";
import { getAttributeDesease } from "../../redux/actions/index";
import { InputPrimaryFormUsers } from "../../helpers/Inputs/Inputs.jsx";

export default function FormUser() {
  const navigate = useNavigate();

  const { userId } = useParams();

  const avatar = localStorage.getItem("avatar");
  const name = localStorage.getItem("name");
  const type = localStorage.getItem("type");

  

  const deseaseAttribute = useSelector((state) => state.deseaseAttribute);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAttributeDesease());
  }, []);

  const [dese, setDese] = useState({
    desease: "",
    trainlimits: "",
    considerations: "",
  });
  const [input, setInput] = useState({
    avatar: avatar,
    lastname: user.info?.lastName ? user.info.lastName : "",
    phone: user.info?.phone ? user.info.phone : "",
    birthday: user.info?.birthday ? user.info.birthday : "",
    gender: user.info?.gender ? user.info.gender : "",
    photo: user.info?.photo ? user.info.photo : "",
    address: user.info?.address.address ? user.info.address.address : "",
    apartment: user.info?.address.apartment ? user.info.address.apartment : "",
    neighborhood: user.info?.address.neighborhood
      ? user.info.address.neighborhood
      : "",
    city: user.info?.address.city ? user.info.address.city : "",
    country: user.info?.address.country ? user.info.address.country : "",
    zipCode: user.info?.address.zipCode ? user.info.address.zipCode : "",
    desease: [],
  });

  const [error, setError] = useState({});

  function handleOnChange(e) {
    if (e.target.name !== "inpDesease" && e.target.name !== "but") {
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
  }

  let concatDesease = {};
  function handleOnChange3(e) {
    const fil = input.desease.filter(
      (d) => d.desease.toLowerCase() === dese.desease.toLowerCase()
    );
    console.log("fil", fil);
    if (e.target.name == "desease" && e.target.name !== "but") {
      setDese({
        ...dese,
        desease: e.target.value,
      });
    } else if (dese.desease) {
      if (fil.length) {
        alert("deberias agregar una enfemedad diferente");
        setDese({
          ...dese,
          desease: "",
        });
      } else {
        setDese({
          ...dese,
          [e.target.name]: e.target.value,
        });
        setInput({
          ...input,
          desease: [...input.desease, dese],
        });
        setDese({
          desease: "",
          trainlimits: "",
          considerations: "",
        });
      }
    } else {
      alert("debes agregar una enfermedad");
    }
  }

  function handleOnChange4(e) {
    setDese({
      ...dese,
      [e.target.name]: e.target.value,
    });
  }

  async function handleOnChange2(e) {
    const preview = document.querySelector("img");
    const fileInput = document.getElementById("image");
    const file = fileInput.files[0];
    const reader = await new FileReader();
    reader.addEventListener(
      "load",
      async function () {
        preview.src = await reader.result;
        setInput({
          ...input,
          photo: preview.src,
        });
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
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

  function handleSelectDeseases(e) {
    const filtro = input.desease.filter(
      (d) => d.desease.toLowerCase() === e.target.value.toLowerCase()
    );
    if (filtro.length) {
      alert("deberias agregar una enfermedad diferente");
    } else {
      setDese({
        desease: e.target.value,
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateUserInfo(userId, input));
    navigate(`/home/${type}/${name}/${userId}/${avatar}`);
  }

  function handleDelete(e) {
    setInput({
      ...input,
      photo: "",
    });
  }

  function handleDeleteDse(e) {
    setInput({
      ...input,
      desease: input.desease.filter((c) => c !== e),
    });
  }

  return (
    <div style={{ width: "100%" }}>
      <div className={styles.containerUser}>
        <h2>Datos del Usuario</h2>
        <p>
          Aqui puedes completar los datos de tu información personal, esta
          información es muy importante para nosotros
          <br />
          tanto como lo es para tí, es por eso que la tratarémos con la mayor
          confidencialidad y discreción,
          <br />
          puedes consultar nuestro anuncio de privacidad aqui
        </p>
      </div>

      <form className={styles.containerFormUser}>
        <div className={styles.formUserOne}>
          <div>
            <label style={{ fontWeight: "700" }}>Avatar: </label>
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: ".8rem",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: ".8rem" }}
            >
              <label style={{ fontWeight: "700" }}>Apellido: </label>
              <InputPrimaryFormUsers
                type="text"
                placeholder={user.info?.lastName}
                name="lastname"
                onChange={(e) => handleOnChange(e)}
              />
            </div>
            {error.lastname && (
              <p className={styles.parrafo}>{error.lastname}</p>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: ".8rem",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: ".8rem" }}
            >
              <label style={{ fontWeight: "700" }}>Telefono: </label>
              <InputPrimaryFormUsers
                type="text"
                placeholder="telefono"
                name="phone"
                onChange={(e) => handleOnChange(e)}
              />
            </div>
            {error.phone && <p className={styles.parrafo}>{error.phone}</p>}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: ".8rem" }}>
            <label style={{ fontWeight: "700" }}>Fecha Nacimiento: </label>
            <InputPrimaryFormUsers
              type="date"
              placeholder="DD/MM/AAAA"
              name="birthday"
              onChange={(e) => handleOnChange(e)}
            />
            {error.birthday && (
              <p className={styles.parrafo}>{error.birthday}</p>
            )}
          </div>
          <div>
            <label style={{ fontWeight: "700" }}>Genero: </label>
            <select
              className={error.gender ? styles.inputError : styles.input}
              name="gender"
              onChange={(e) => handleSelect(e)}
            >
              <option id="GEN">--</option>
              <option value="femenine">femenino</option>
              <option value="male">masculino</option>
            </select>
          </div>
        </div>
        <div className={styles.containerImageUser}>
          <div style={{ height: "180px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: ".8rem",
                flexDirection: "column",
                justifyContent: "space-around",
                height: "100%",
              }}
            >
              <label style={{ fontWeight: "700" }}>Foto Perfil </label>
              <div className={styles.inputFileContainer}>
                <label htmlFor="image" className={styles.formLabel}>
                  <input
                    type="file"
                    name="photo"
                    id="image"
                    className={styles.inputFile}
                    onChange={(e) => handleOnChange2(e)}
                  />
                  <span className={styles.formText}>Adjunta imagen</span>
                </label>
              </div>
            </div>
            {error.photo && <p className={styles.parrafo}>{error.photo}</p>}
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
          >
            {!input.photo ? (
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqh5pmaPkqtRlk67znEF2s4NADR2URCfOlOQ&usqp=CAU"
                alt="avatar"
                style={{ borderRadius: ".6rem" }}
              />
            ) : (
              <img
                src={input.photo}
                alt="tu foto"
                style={{ borderRadius: ".6rem", width: "200px" }}
              />
            )}
            {input.photo && (
              <button
                className={styles.btnQuitarFoto}
                type="button"
                onClick={() => handleDelete()}
              >
                Quitar foto
              </button>
            )}
          </div>
        </div>

        <div className={styles.containerDiseases}>
          <h2 style={{ color: "#fff" }}>Enfermedades</h2>

          <select
            onChange={(e) => handleSelectDeseases(e)}
            className={styles.input}
          >
            <option id="des" disabled>
              Desease...
            </option>
            {deseaseAttribute.map((e) => {
              return (
                <option value={e} key={e}>
                  {e}{" "}
                </option>
              );
            })}
          </select>
          {input.desease.map((e) => (
            <div key={e.desease}>
              <p>{e.desease}</p>
              <button
                className={styles.btn}
                type="button"
                onClick={() => handleDeleteDse(e)}
              >
                x
              </button>
            </div>
          ))}
          <InputPrimaryFormUsers
            type="text"
            placeholder="enfermedad"
            name="desease"
            value={dese.desease}
            onChange={(e) => handleOnChange3(e)}
          />
          {error.desease && <p className={styles.parrafo}>{error.desease}</p>}
          <textarea
            className={error.trainlimits ? styles.inputError : styles.input}
            type="text"
            placeholder="limtitaciones"
            name={dese.trainlimits}
            onChange={(e) => handleOnChange4(e)}
          />
          {error.trainlimits && (
            <p className={styles.parrafo}>{error.trainlimits}</p>
          )}
          <textarea
            className={error.considerations ? styles.inputError : styles.input}
            type="text"
            placeholder="consideraciones"
            name={dese.considerations}
            onChange={(e) => handleOnChange4(e)}
          />
          <button name="but" type="button" onClick={(e) => handleOnChange3(e)}>
            Guardar enfermedades
          </button>
          {error.considerations && (
            <p className={styles.parrafo}>{error.considerations}</p>
          )}
        </div>
        <div>
          <section>
            <MapUser />
          </section>
          <label>DIRECCION: </label>
          <InputPrimaryFormUsers
            type="number"
            placeholder="street"
            name="street"
            onChange={(e) => handleOnChange(e)}
          />
          {error.street && <p className={styles.parrafo}>{error.street}</p>}

          <InputPrimaryFormUsers
            type="number"
            placeholder="floor"
            name="floor"
            onChange={(e) => handleOnChange(e)}
          />
          {error.floor && <p className={styles.parrafo}>{error.floor}</p>}
          <InputPrimaryFormUsers
            type="text"
            placeholder="address"
            name="address"
            onChange={(e) => handleOnChange(e)}
          />
          {error.address && <p className={styles.parrafo}>{error.address}</p>}
          <InputPrimaryFormUsers
            type="number"
            placeholder="apartment"
            name="apartment"
            onChange={(e) => handleOnChange(e)}
          />
          {error.apartment && (
            <p className={styles.parrafo}>{error.apartment}</p>
          )}
          <InputPrimaryFormUsers
            type="text"
            placeholder="neighborhood"
            name="neighborhood"
            onChange={(e) => handleOnChange(e)}
          />
          {error.neighborhood && (
            <p className={styles.parrafo}>{error.neighborhood}</p>
          )}
          <InputPrimaryFormUsers
            type="text"
            placeholder="city"
            name="city"
            onChange={(e) => handleOnChange(e)}
          />
          {error.city && <p className={styles.parrafo}>{error.city}</p>}
          <InputPrimaryFormUsers
            type="text"
            placeholder="country"
            name="country"
            onChange={(e) => handleOnChange(e)}
          />
          {error.country && <p className={styles.parrafo}>{error.country}</p>}
          <InputPrimaryFormUsers
            type="number"
            placeholder="zipCode"
            name="zipCode"
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
              GUARDAR CAMBIOS
            </button>
          ) : (
            <button
              className={styles.btn}
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              GUARDAR CAMBIOS
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
