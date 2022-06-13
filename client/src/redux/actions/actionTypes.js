// Constantes relacionadas a api/service
export const SET_USER_GEO = "SET_USER_GEO"; //setea en el estado la geolocalizacion del usuario
export const POST_USER_GOOGLE = "POST_USER_GOOGLE"; // usada para logeo por google
export const GET_USER_TOKEN_GOOGLE = "GET_USER_TOKEN_GOOGLE"; // usada para logeo por google
export const GET_AVATARS = "GET_AVATARS"; //llama al back para traerse todos los avatares
export const POST_AVATAR = "POST_AVATAR"; //usada para crear un nuevo avatar
export const POST_USER = "POST_USER"; //llama al back para crear un nuevo usuario, se usa en registro

// Constantes relacionadas a api/user
export const GET_ALL_GYMS = "GET_ALL_GYMS"; // llama al back para traerse los gyms
export const GET_USER = "GET_USER"; //llama al back para traerse toda la informacion concerniente a un solo usuario
export const PUT_USER_INFO = "PUT_USER_INFO"; // ruta que actualiza la informacion del usuario
export const GET_GYM_DETAIL = "GET_GYM_DETAIL"; // llama al back para traerse los detalles de un gimnasio
export const CLEAR_GYM_DETAIL = "CLEAR_GYM_DETAIL"; // Para limpiar el estado del detalle de gym cuando se remueva el componente
export const PUT_FAVOURITE = "PUT_FAVOURITE"; //? Tiene la funcionalidad de poner y sacar de favorito un gym

// Constantes relacionadas a api/partner
export const POST_PARTNER = "POST_PARTNER"; //llama al back para crear setear los detalles de un partner
export const POST_GYM = "POST_GYM"; //llama al back para crear un gymnasio del partner
export const POST_SERVICES = "POST_SERVICES"; // crea un servicio
export const GET_PARTNER = "GET_PARTNER"; // llama al back para traer infomación del partner
export const SET_GYMS_GEO = "SET_GYMS_GEO"; // setea en el estado de redux la geolocalizacion del gym que se edita o crea

// Constantes relacionadas a api/admin
export const GET_ALL_USERS = "GET_ALL_USERS"; //llama al back para traerse todos los usuarios
export const GET_ALL_PARTNERS = "GET_ALL_PARTNERS"; //llama al back para traerse todos los user partner
export const GET_ADMIN = "GET_ADMIN"; // llama al back para traer infomación del admin por una ruta protegida
export const GET_LOCK_ACCOUNTS = "GET_LOCK_ACCOUNTS"; // llama al back para traer información de las cuentas bloquedas (admin - ruta protegida)
export const GET_PLANS = "GET_PLANS";
export const GET_PARTNER_ID = "GET_PARTNER_ID" // Llama al back para obtener datos del usuario partner por media del id


// Constantes relacionadas al funcionamiento de la app
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"; //setea el estado general "pagina actual" para paginado
export const SET_PAGE_NUMBER = "SET_PAGE_NUMBER"; //setea el estado general "numero de pagina" para paginado
export const SET_CURRENT_LIMIT = "SET_CURRENT_LIMIT"; //setea el estado general "limite por pagina" para paginado
export const SORT_BY_NAME = "SORT_BY_NAME"; // para hacer un ordenamiento alfabético de a-z o z-a
export const SORT_BY_SCORE = "SORT_BY_SCORE"; // para hacer un ordemiento por puentuación de mayor a menor o viceversa
export const GET_MARKETING = "GET_MARKETING"; //llama al back para traer info y mostrar en la landing

export const GET_CART = "GET_CART";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";
export const ADJUST_QTY = "ADJUST_QTY";
export const LOAD_CURRENT_ITEM = "LOAD_CURRENT_ITEM";

export const GET_ATTRIBUTE_DESEASE = "GET_ATTRIBUTE_DESEASE"; // llama del back el atributo deseaseName de la collection DiseasesType
export const DELETE_DESEASE = "DELETE_DEASE";

export const SORT_QUALIFICATION = "SORT_QUALIFICATION"; //ORDENAR gym por calificacion
export const SORT_PRICE = "SORT_PRICE"; //ordenar gym por precio
export const FILTER_CATEGORY = "FILTER_CATEGORY"; //filtrar Gym por categoria
export const SEARCH = "SEARCH"; //Busqueda de gimnasios por su nombre
export const SORT_DISTANCE = "SORT_DISTANCE"; //Ordena por la ubicacion del gym
