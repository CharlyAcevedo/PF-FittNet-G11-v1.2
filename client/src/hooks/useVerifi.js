import { useState } from "react";
import { regexEmail, regexName } from "../asets/helpers/regexValidators";

export const useVerifi = (campos) => {

    const [error, setError] = useState("");

    const onChangeName = (e) => {
        
        campos.setName(e.target.value);
        if (campos.name.length < 3) {
            setError("El nombre es requerido");
        } else if (!regexName.test(campos.name)) {
            setError("El nombre debe contener letras");
        } else {
            setError("");
        }
    }

    const onChangeEmail = (e) => {
        campos.setEmail(e.target.value);
        if (campos.email.length < 3) {
            setError("El Email es requerido");
        } else if (!regexEmail.test(campos.email)) {
            setError("Email invalido");
        } else {
            setError("");
        }
    }


    const onChangePassword = (e) => {
        campos.setPassword(e.target.value);
        if (campos.password.length < 2) {
            setError("Necesita introducir una contraseña");
        } else if (campos.password.length < 3) {
            setError("La constraseña debe tener un mínimo de tres caracteres");
        } else {
            setError("Recuerde seleccionar el tipo de usuario");
        }
    }

    const onChangeType = (e) => {
        campos.setType(e.target.value);

        setError("");
    }

    return {
        error,
        setError,
        onChangeType,
        onChangeEmail,
        onChangeName,
        onChangePassword
    }
}