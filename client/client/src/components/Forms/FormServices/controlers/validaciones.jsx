//!----------------VALIDACIONES DE INPUT---------------------
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
