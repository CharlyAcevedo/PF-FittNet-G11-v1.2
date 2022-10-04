import { useNavigate } from "react-router-dom";

import axios from 'axios'

import { SweetAlrt, SweetAlrtTem } from '../asets/helpers/sweetalert'

export const useRegister = ( latitude, longitude, campos, error, setError ) => {

    const navigate = useNavigate();


    const onSubmit = (e) => {
        e.preventDefault();

        let userCreate;

        //---------------------------------------------------------------------
        // La validación de los campos la hace la función validadora
        // llamada desde cada input. Luego si tengo todos los campos completos
        // y no tengo errores(seteados por la función validadora), entonces
        // creo el objeto y hago el post al back.
        //---------------------------------------------------------------------

        if (error === "" && campos.name && campos.email && campos.password && campos.type) {

            userCreate = {
                name: campos.name,
                username: campos.email,
                password: campos.password,
                latitude,
                longitude,
                type: campos.type,
            }

            SweetAlrt("Estamos procesando su solicitud!");
            console.log("está saliendo el post ", userCreate);

            axios
                .post("/api/service/register", userCreate)
                .then((res) => {
                    console.log(res.data, "-> respuesta del post de creación de cuenta");
                    // El nombre de usuario ya existe o es incorrecto, por favor indique otro username
                    //
                    if (res.data.created === true) {
                        campos.setName("");
                        campos.setPassword("");
                        setError("");
                        campos.setEmail("");
                        SweetAlrt("Exito!", res.data.message, "success");
                        navigate('/login');
                    }
                    if (res.data.created === false) {
                        // window.alert(res.data.message);
                        SweetAlrt("Atencion!", res.data.message, "warning");
                        campos.setName("");
                        campos.setPassword("");
                        setError("");
                        campos.setEmail("");
                    }
                    if (typeof res.data === "string") {
                        SweetAlrt(res.data);
                    }
                })
                .catch((error) => console.log(error));
        }
        if (!campos.name || !campos.email || !campos.password || !campos.type) {
            SweetAlrtTem("Por favor complete todos los campos", "warning");
        }
    }

    return {
        onSubmit
    }
}