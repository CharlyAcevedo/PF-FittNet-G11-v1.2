export const SET_USER_GEO = 'SET_USER_GEO'; //setea en el estado la geolocalizacion del usuario
export const GET_ALL_USERS = 'GET_ALL_USERS'; //llama al back para traerse todos los usuarios
export const POST_USER = 'POST_USER'; //llama al back para crear un nuevo usuario, se usa en registro
export const GET_USER = 'GET_USER'; //llama al back para traerse toda la informacion concerniente a un solo usuario
export const POST_USER_GOOGLE = 'POST_USER_GOOGLE'; // usada para logeo por google
export const GET_USER_TOKEN_GOOGLE = 'GET_USER_TOKEN_GOOGLE';// usada para logeo por google
export const PUT_USER_INFO = 'PUT_USER_INFO'; // ruta que actualiza la informacion del usuario


export const GET_AVATARS = "GET_AVATARS"; //llama al back para traerse todos los avatares
export const POST_AVATAR = "POST_AVATAR"; //usada para crear un nuevo avatar

export const GET_ALL_PARTNERS = "GET_ALL_PARTNERS"; //llama al back para traerse todos los user partner
export const POST_PARTNER = "POST_PARTNER"; //llama al back para crear setear los detalles de un partner

export const GET_ALL_GYMS = "GET_ALL_GYMS"; // llama al back para traerse los gyms
export const GET_GYM_DETAIL = "GET_GYM_DETAIL"; // llama al back para traerse los detalles de un gimnasio
export const POST_GYM = "POST_GYM"; //llama al back para crear un gymnasio del partner

export const POST_SERVICES = "POST_SERVICES"; // crea un servicio

export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"; //setea el estado general "pagina actual" para paginado
export const SET_PAGE_NUMBER = "SET_PAGE_NUMBER"; //setea el estado general "numero de pagina" para paginado
export const SET_CURRENT_LIMIT = "SET_CURRENT_LIMIT"; //setea el estado general "limite por pagina" para paginado


export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const ADJUST_QTY = 'ADJUST_QTY';
export const LOAD_CURRENT_ITEM = 'LOAD_CURRENT_ITEM';

export const SORT_QUALIFICATION= "SORT_QUALIFICATION" //ORDENAR gym por calificacion
export const SORT_PRICE= "SORT_PRICE"//ordenar gym por precio
export const FILTER_CATEGORY="FILTER_CATEGORY"//filtrar Gym por categoria
export const SEARCH= "SEARCH" //Busqueda de gimnasios por su nombre
export const SORT_DISTANCE= "SORT_DISTANCE" //Ordena por la ubicacion del gym

export const CLEAR_GYM_DETAIL = 'CLEAR_GYM_DETAIL'; // Para limpiar el estado del detalle de gym cuando se remueva el componente

export const GET_ATTRIBUTE_DESEASE = "GET_ATTRIBUTE_DESEASE"; // llama del back el atributo desease de la collection Diseases

export const PUT_FAVOURITE = "PUT_FAVOURITE"; //? Tiene la funcionalidad de poner y sacar de favorito un gym

