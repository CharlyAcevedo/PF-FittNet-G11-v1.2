//npm install sweetalert2

import Swal from "sweetalert2";

//1er Agumento, "Title": Es el nombre del Error.
//2do "Text": Breve descripcion del error.
//3er "icon": Referencia al icono de la alerta, puede ser del tipo:
//"warning", "error" , "success" o "info"

export function SweetAlrt(title, text, icon) {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    iconColor: "#ff004c",
    allowOutsideClick: false,
    background: "#001519", //revisar que color es
    backdrop: true,
    confirmButtonColor: "#ff2767",
  });
}
export function SweetAlrtTem(text, icon) {
  Swal.fire({
    text: text,
    timer: 5000,
    timerProgressBar: true,
    icon: icon,
    iconColor: "#ff004c",
    allowOutsideClick: false,
    background: "#001519", //revisar que color es
    backdrop: true,
    showConfirmButton: false,
  });
}

// Swal.fire({
// title:
// text:
// html:
// icon:
// confirmButtonText:
// footer:
// width:
// padding:
// background:
// grow:
// backdrop:
// timer:
// timerProgressBar:
// toast:
// position:
// allowOutsideClick:
// allowEscapeKey:
// allowEnterKey:
// stopKeydownPropagation:

// input:
// inputPlaceholder:
// inputValue:
// inputOptions:

//  customClass:
// 	container:
// 	popup:
// 	header:
// 	title:
// 	closeButton:
// 	icon:
// 	image:
// 	content:
// 	input:
// 	actions:
// 	confirmButton:
// 	cancelButton:
// 	footer:

// showConfirmButton:
// confirmButtonColor:
// confirmButtonAriaLabel:

// showCancelButton:
// cancelButtonText:
// cancelButtonColor:
// cancelButtonAriaLabel:

// buttonsStyling:
// showCloseButton:
// closeButtonAriaLabel:

// imageUrl:
// imageWidth:
// imageHeight:
// imageAlt:
// });
