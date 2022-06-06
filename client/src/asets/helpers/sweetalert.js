//npm install sweetalert
//si se quiere utilizar etiquetas y presonalizar las alertas se instala ademas
// npm install @sweelalert/with-react
//si hay conflictos con otras dependencias se agrega el --force para instalar

import swal from "sweetalert";

// import swal from "@sweetalert/with-react"; //Para agregar estilos mas adelante

//1er Agumento, "Title": Es el nombre del Error.
//2do "Text": Breve descripcion del error.
//3er "icon": Referencia al icono de la alerta, puede ser del tipo:
//"warning", "error" , "success" o "info"
//4to buttons: si se pasa true se agregan dos botones "cancel" y "ok" de forma predeterminada
// pero tambien se puede pasar un array de string con los nombres de los botones
//ejemplo ["volver atras", "confirmar envio"]
//5to dangerMode:  el enfoque se establecerá automáticamente en el botón
// de cancelación en lugar del botón de confirmación,
//y el botón de confirmación será rojo en lugar de azul para enfatizar la acción peligrosa.

export function SweetAlrt(title, text, icon, buttons, dangerMode) {
  return swal({
    title: title,
    text: text,
    icon: icon,
    buttons: buttons,
    dangerMode: dangerMode,
  });
}

