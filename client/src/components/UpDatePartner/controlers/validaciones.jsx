//!----------------VALIDACIONES DE INPUT---------------------
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//!--------------------------------VALIDACIONES GYM----------------------
export function gymValidate(input) {
  let error = {};
  if (!input.name) {
    error.name = "El nombre es requerido";
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

export function partnerValidacion(input) {
  let error = {};
  if (!input.name) {
    error.name = "El nombre es requerido";
  } else if (Number(input.name)) {
    error.name = "No puedes Ingresar un numero";
  } else if (!input.lastName) {
    error.lastName = "El Apellido es requerido";
  } else if (Number(input.lastName)) {
    error.lastName = "No puedes ingresar un numero";
  } else if (!input.email) {
    error.email = "El Email es requerido";
  } else if (!regexEmail.test(input.email)) {
    error.email = "Email Invalido";
  } else if (!input.phone) {
    error.phone = "El Numero de Telefono es requerido";
  } else if (!Number(input.phone)) {
    error.phone = "Solo se Permiten valores Numericos";
  } else if (input.phone.length < 5) {
    error.phone = "Ingrese un numero de Telefono Valido!";
  } else if (!input.cbu) {
    error.cbu = "Debe Ingresar el CBU";
  } else if (!Number(input.cbu)) {
    error.cbu = "El CBU debe contener numeros";
  } else if (input.cbu.length !== 22) {
    error.cbu = "CBU invalido, recorda que son 22 dígitos que componen el CBU";
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
