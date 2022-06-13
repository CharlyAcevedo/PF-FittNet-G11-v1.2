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

