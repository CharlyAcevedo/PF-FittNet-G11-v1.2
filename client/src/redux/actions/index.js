import axios from "axios";

import {

  SET_USER_GEO, GET_ALL_USERS, POST_USER, PUT_USER_INFO, GET_USER, GET_USER_TOKEN_GOOGLE,
  GET_AVATARS, GET_ALL_PARTNERS, GET_ALL_GYMS, GET_GYM_DETAIL, SET_CURRENT_PAGE,
  SET_PAGE_NUMBER, SET_CURRENT_LIMIT, POST_GYM, POST_SERVICES, POST_PARTNER, ADD_TO_CART,
  REMOVE_FROM_CART, SORT_BY_NAME, SORT_BY_SCORE, CLEAR_GYM_DETAIL, GET_ATTRIBUTE_DESEASE,
  PUT_FAVOURITE, DELETE_DESEASE

} from "./actionTypes";

//------USER SERVICE ACTIONS------(favor de poner todas las aciones referentes a service en general todos los usuarios aqui)

export function setUserGeo(payload) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_USER_GEO,
        payload: payload,
      });
    } catch (err) {
      dispatch({
        type: SET_USER_GEO,
        payload: { error: err.message },
      });
    };
  };
};

export function getUser(data) {
  return (dispatch) => {
    dispatch({ type: GET_USER, payload: data })
  }
}

export function getAllUsers() {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/user/all");
      dispatch({
        type: GET_ALL_USERS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: GET_ALL_USERS,
        payload: { error: err.message },
      });
    };
  };
};

export function postUser(payload) {
  return async (dispatch) => {
    try {
      const response = await axios.post("/api/service/register", payload);
      dispatch({
        type: POST_USER,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: POST_USER,
        payload: { error: err.message },
      });
    };
  };
};

export const getUserGoogleForToken = (payload) => async dispatch => {
  try {
    const userGoogle = await axios.post('/api/service/google/auth/profile', {
      token: payload
    })
    dispatch({
      type: GET_USER_TOKEN_GOOGLE,
      payload: userGoogle.data.user
    })
  } catch (error) {
    dispatch({
      type: GET_USER_TOKEN_GOOGLE,
      payload: { error: error.message },
    });
  };
};

//------AVATARS ACTIONS------(Favor de poner aqui todas las aciones referentes a los avatares)

// export const postAvatar = (id, body) => async (dispatch) => {
//   try {
//     const dataUdpateAvatar = await axios.put(`/api/user/avatar/${id}`, body);
//     dispatch({
//       type: POST_AVATAR,
//       payload: dataUdpateAvatar.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: POST_AVATAR,
//       payload: { error: error.message },
//     });
//   };
// };


export const getAvatars = () => async (dispatch) => {
  try {
    const dataAvatar = await axios.get(`/api/user/avatar`);
    dispatch({
      type: GET_AVATARS,
      payload: dataAvatar.data,
    });
  } catch (error) {
    dispatch({
      type: GET_AVATARS,
      payload: { error: error.message },
    });
  };
};

//------PARTNER ACTIONS------(Favor de poner aqui todas las aciones para partners)

export function getAllPartner() {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/partner/allgyms");
      dispatch({
        type: GET_ALL_PARTNERS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: GET_ALL_PARTNERS,
        payload: { error: err.message },
      });
    }
  };
}

export function getAllGyms() {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/partner/gyms/allgyms");
      dispatch({
        type: GET_ALL_GYMS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: GET_ALL_GYMS,
        payload: { error: err.message },
      });
    }
  };
}

export function getGymDetail(id) {
  return async (dispatch) => {
    try {
      // http://localhost:3001/api/partner/gyms/gymbyid/6292d5cb463de6e77bd44b50
      const response = await axios.get(`/api/partner/gyms/gymbyid/${id}`);
      dispatch({
        type: GET_GYM_DETAIL,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: GET_GYM_DETAIL,
        payload: { error: err.message },
      });
    }
  };
}


export function updatePartnerData({
  name,
  lastName,
  email,
  phone,
  planType,
  cbu,
  profileCategory,
  userActive,
  socialMedia,
  paymentMethods,
  category,
  idName,
  id,
}) {
  return async (dispatch) => {
    try {
      const result = await axios.post("ruta", {
        name: name,
        lastName: lastName,
        email: email,
        phone: phone,
        planType: planType,
        cbu: cbu,
        profileCategory: profileCategory,
        userActive: userActive,
        socialMedia: socialMedia,
        paymentMethods: paymentMethods,
        category: category,
        idName: idName,
        id: id,
      });
      return dispatch({
        type: POST_PARTNER,
        payload: result.data,
      });
    } catch (error) {
      dispatch({
        type: POST_PARTNER,
        payload: { error: error.message },
      });
    };
  };
};

export function getPartnerDetails() {

};

//------GYMS ACTIONS------(Favor de poner aqui todas las aciones que hagan referencia a gimnasios)

export function createGym({
  name,
  price,
  raiting,
  image,
  address,
  services,
  trainers,
  logo,
  phone,
  email,
  uEnd,
  gymActive,
  idName,
  id,
}) {
  return async (dispatch) => {
    try {
      const result = await axios.post("ruta", {
        name: name,
        price: price,
        raiting: raiting,
        image: image,
        address: address,
        services: services,
        trainers: trainers,
        logo: logo,
        phone: phone,
        email: email,
        uEnd: uEnd,
        gymActive: gymActive,
        idName: idName,
        id: id,
      });
      return dispatch({
        type: POST_GYM,
        payload: result.data,
      });
    } catch (error) {
      dispatch({
        type: POST_GYM,
        payload: { error: error.message },
      });
    }
  };
}

//------SERVICE ACTIONS------(Favor de poner aqui todas las aciones que hagan referencia a servicios)

export function createService({
  name,
  description,
  duration,
  gyms,
  uEnd,
  image,
  objtrainers,
}) {
  return async (dispatch) => {
    try {

      const result = await axios.post("ruta", {
        name: name,
        description: description,
        duration: duration,
        gyms: gyms,
        uEnd: uEnd,
        image: image,
        objtrainers: objtrainers,
      });
      return dispatch({
        type: POST_SERVICES,
        payload: result.data,
      });

    } catch (error) {
      dispatch({
        type: POST_SERVICES,
        payload: { error: error.message },
      });
    }
  }
}

//---------PAGINATED ACTIONS------------

export function setCurrentPage(payload) {
  return (dispatch) => {
    try {
      dispatch({
        type: SET_CURRENT_PAGE,
        payload: payload,
      });
    } catch (error) {
      dispatch({
        type: SET_CURRENT_PAGE,
        payload: { error: error.message },
      });
    }
  };
}



export function setPageNumber(payload) {
  return (dispatch) => {
    try {
      dispatch({
        type: SET_PAGE_NUMBER,
        payload: payload,
      });
    } catch (error) {
      dispatch({
        type: SET_PAGE_NUMBER,
        payload: { error: error.message },
      });
    }
  };
}

export function setCurrentLimit(payload) {
  return (dispatch) => {
    try {
      dispatch({
        type: SET_CURRENT_LIMIT,
        payload: payload,
      });
    } catch (error) {
      dispatch({
        type: SET_CURRENT_LIMIT,
        payload: { error: error.message },
      });
    }
  };
}



// };

//? AQUI VA LA ACTUALIZACION DE LA INFO DEL USUARIO

export const updateUserInfo = (id, body) => async dispatch => {
  try {
    const dataNewUser = await axios.put(`/api/user/profile/update/${id}`, body, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
    console.log(body)
    dispatch({
      type: PUT_USER_INFO,
      payload: dataNewUser.data.updUser
    })
  } catch (error) {
    console.log("error: ", error)
  }
}


// CARRITO DE COMPRAS USUARIO FINAL

export function addToCart(itemID) {
  //console.log('llega id?', itemID)
  return (dispatch) => {
    try {
      dispatch({
        type: ADD_TO_CART,
        payload: {
          id: itemID,
        }
      });
    } catch (error) { console.log(error) }
  }
};
export const removeFromCart = (itemID) => {
  return (dispatch) => {
    try {
      dispatch({
        type: REMOVE_FROM_CART,
        payload: {
          id: itemID
        }
      });
    } catch (error) { console.log(error) }
  }
};

export const postCart = (body) => {
  return (dispatch) => {
    const post = axios.post('/api/shopcart', body)
    return post
  }
}


//-------- ORDENAMIENTO POR PUNTUACIÓN Y ORDEN ALFABÉTICO ---------------------------
export function sortByName(order) {
  return {
    type: SORT_BY_NAME, payload: order
  }
}

export function sortByScore(order) {
  return {
    type: SORT_BY_SCORE, payload: order
  }
}

//-------- ESTA ACCIÓN LIMPIA EL ESTADO DE GYM DETAIL ---------------------------------


export function clearGymDetail() {
  return {
      type: CLEAR_GYM_DETAIL, payload: {}

    
  }
}

export const updateFavouriteGym = (id, user) => async dispatch => {
  try {
    const newFavourite = await axios.put(`/api/user/profile/update/favourite/${id}`, {
      favourite: 1,
      idUser: user
    })
    dispatch({
      type: PUT_FAVOURITE,
      payload: newFavourite.data
    })
  } catch (error) {
    console.log("error: ", error)
  }
}

//////////// ACA VA LO RELACIONADO CON LAS ENFERMEDADES (modelo Diseases)

export function getAttributeDesease() {
  return async (dispatch) => {

    try {
      var json = await axios.get("/api/user/all/deseasesMap", {

      });
      return dispatch({
        type: GET_ATTRIBUTE_DESEASE,
        payload: json.data
      })
    } catch (error) {
      console.log("error: ", error)
    }
  }
}

export function deleteDesease(id){
  return function(dispatch){
    return axios.delete("/api/user/all/deleteDesease" + id)
    .then(json => {
      dispatch({type: "DELETE_DESEASE"})
    })
  }
}