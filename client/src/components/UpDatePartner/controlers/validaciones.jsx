//!----------------VALIDACIONES DE INPUT---------------------
import {
  regexEmail,
  regexName,
  regPhrase,
} from "../../../asets/helpers/regexValidators";
const regCBU = /^[0-9]{16}\b/;
const regCUIL = /^[0-9]{11}\b/;
//!--------------------------------VALIDACIONES GYM----------------------
export function gymValidate(newGym) {
  let error = {};
  if (!regexName.test(newGym.name)) {
    error.name = "El nombre es requerido y debe tener por lo menos dos letras";
  } 
  else if (Number(newGym.name))  {
    error.name = "No se puede ingresar Numeros!";
  }
   else if (!newGym.logo) {
    error.logo = "El logo es requerido";
  } else if (!Number(newGym.price) || Number(newGym.price) < 0 || (newGym.price).includes(".")) {
    error.price = "Solo se puede ingresar numeros enteros";
  } else if (
    !Number(newGym.phone) ||
    Number(newGym.phone) < 0 ||
    newGym.phone.includes(".") ||
    newGym.phone.includes("-") ||
    newGym.phone.includes("+") ||
    newGym.phone.includes("$")
  ) {
    error.phone =
      "El Telefono es requerido, Tene en cuenta que solo podes ingresar valores numericos";
  } else if (newGym.phone.length < 5) {
    error.phone = "Ingrese un numero de Telefono Valido!";
  } else if (!regexEmail.test(newGym.email)) {
    error.email = "El Email ingresado es invalido";
  }

  return error;
}
export function gymValidateEdit(editGym) {
  let error = {};

  let tel= editGym.phone !== ""? editGym.phone:  editGym.phone=1 
     if (!regexName.test(editGym.name) && Number(editGym.name)) {
     error.name = "El nombre es requerido y debe tener por lo menos dos letras";
   } else if (Number(editGym.name)) {
     error.name = "No se puede ingresar Numeros!";
   } else if (!Number(editGym.price) || editGym.price < 0) {
     error.price = "Solo se puede ingresar numeros enteros positivos";
   } else if (Number(tel) < 0 && !Number(tel) ) {
     error.phone =
       "El Telefono es requerido, Tene en cuenta que solo podes ingresar valores numericos";
   } else if ((tel).length < 5) {
     error.phone = "Ingrese un numero de Telefono Valido!";
   } else if (!regexEmail.test(editGym.email)) {
     error.email = "El Email ingresado es invalido";
   }

  return error;
}

//!--------------------------VALIDACIONES DE PARTNER---------------------------------

export function partnerValidacion(input, target) {
  let error = {};
  if (target === "name" && Number(input.name)) {
    error.name = "No puedes Ingresar un numero";
  }
  if (target === "lastName" && Number(input.lastName)) {
    error.lastName = "No puedes ingresar un numero";
  }
  // if (!regexEmail.test(input.email)) {
  //   error.email = "Email Invalido";
  // }
  // if (!Number(input.phone)) {
  //   error.phone = "Solo se Permiten valores Numericos";
  // }
  //  if (input.phone.length < 5) {
  //   error.phone = "Ingrese un numero de Telefono Valido!";
  // }
  if (target === "cbu" && !regCBU.test(input.cbu)) {
    error.cbu = "El CBU debe contener 16 numeros";
  }
  return error;
}

//!---------------------VALIDACIONES DE SERVICE--------------------------------

export function serviceValidate(newService) {
  let error = {};
  if (!newService.name || Number(newService.name)) {
    error.name = "El Nombre es requerido";
  } else if (!newService.description) {
    error.description = "La descripcion es requerida";
  } else if (!Number(newService.price)) {
    error.price = "Debes ingresar solo valores 'Numericos'";
  }
  return error;
}
export function serviceValidateEdit(editService) {
  let error = {};
  if (Number(editService.name)) {
    error.name = "No puedes ingresar numeros como nombre";
  }
  if (Number(editService.description)) {
    error.description = "No podes ingresar numeros en la descripcion";
  } else if (!Number(editService.price)) {
    error.price = "Debes ingresar solo valores 'Numericos'";
  }
  return error;
}
