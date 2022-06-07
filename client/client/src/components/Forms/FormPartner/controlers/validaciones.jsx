//!----------------VALIDACIONES DE INPUT---------------------
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
