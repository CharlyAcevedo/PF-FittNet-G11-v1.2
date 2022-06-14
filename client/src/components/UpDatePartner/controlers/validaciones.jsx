//!----------------VALIDACIONES DE INPUT---------------------
import { regexEmail, regexName, regPhrase } from '../../../asets/helpers/regexValidators'
const regCBU = /^[0-9]{16}\b/;
const regCUIL = /^[0-9]{11}\b/;
//!--------------------------------VALIDACIONES GYM----------------------
export function gymValidate(input) {
  let error = {};
  if (!input.name || !regexName.test(input.name)) {
    error.name = "El nombre es requerido y debe tener por lo menos dos letras";
  } else if (Number(input.name)) {
    error.name = "No se puede ingresar Numeros!";
  } else if (!input.price) {
    error.price = "El precio es requerido";
  } else if (!input.raiting) {
    error.raiting = "La Calificacion es requerida";
  } else if (input.raiting < 1 || input.raiting > 5 || !Number(input.raiting)) {
    error.raiting = "La Calificacion debe ser entre 1 y 5";
  } else if (!input.address) {
    error.address = "La Direccion es requerida";
  } else if (!input.phone) {
    error.phone = "El Telefono es requerido";
  } else if (input.phone.length < 5) {
    error.phone = "Ingrese un numero de Telefono Valido!";
  } else if (!input.email) {
    error.email = "El Email es requerido";
  } else if (!regexEmail.test(input.email)) {
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

export function serviceValidate(input) {
  let error = {};
  if (!input.name) {
    error.name = "El Nombre es requerido";
  } else if (!input.description) {
    error.description = "La descripcion es requerida";
  } else if (input.description.length > 20) {
    error.description = "La descripcion debe tener un minimo de 20 caracteres";
  } else if (!input.duration) {
    error.duration = "Selecciona la duracion";
  } else if (!input.gyms) {
    error.gyms = "Selecciona al menos un GYM";
  } else if (!input.objTraining) {
    error.objTraining = "El objetivo de entrenamiento es requerido";
  } else if (input.objTraining.length > 20) {
    error.objTraining = "El objetivo debe contener al menos 20 caracteres";
  }

  return error;
}
