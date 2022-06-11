export const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?#&/|:;,<>+~-])([A-Za-z\d$@$!%*?#&/|:;,<>+~-]|[^ ]){6,15}$/;
export const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const regexName = /^[a-zA-Z]{2}[a-zA-Z]*\s*\w*/;
export const regPhrase = /^[0-9A-Za-z\d$@$!%*?#&/|:;,<>+~-][0-9A-Za-z\d$@$!%*?#&/|:;,<>+~-]+\s[0-9A-Za-z\d$@$!%*?#&/|:;,<>+~-]+\s[0-9A-Za-z\d$@$!%*?#&/|:;,<>+~-]+/;

//---*** Password debe cumplir con lo siguiente---

// --Minimo 8 caracteres
// --Maximo 15 caracteres
// --Al menos una letra mayúscula
// --Al menos una letra minucula
// --Al menos un dígito
// --No espacios en blanco
// --Al menos 1 caracter especial

//---*** Email debe cumplir con lo siguiente---

// --No puede contener caracteres restringidos como ^<>()[\.,;:\s@" de inicio
// --Despues de un texto puede tener solo un punto y no mas luego de otro texto
// --Debe contener despues de un texto el caracter @
// --despues de la @ debe tener agun texto adicional que no contenga los caracteres restringidos
// --Debe tener despues del texto un punto y una extension con 3 letras
// --Puede o no tener despues de la extension otro punto con otra extension con letras

//---*** Nombre debe iniciar con por lo menos dos letras a-z mayusculas o minusculas