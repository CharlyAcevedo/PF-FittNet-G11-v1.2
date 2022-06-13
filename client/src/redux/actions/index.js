import axios from "axios";

import {
 

  POST_USER,POST_GYM,POST_SERVICES,POST_PARTNER, ADD_TO_CART, DELETE_DESEASE, GET_PARTNER,
 GET_ALL_USERS, GET_ALL_PARTNERS, GET_AVATARS, SET_CURRENT_PAGE, SET_PAGE_NUMBER,
  SET_CURRENT_LIMIT, GET_ALL_GYMS, GET_GYM_DETAIL, SET_USER_GEO, POST_USER_GOOGLE,
  GET_USER, POST_AVATAR, GET_USER_TOKEN_GOOGLE, PUT_USER_INFO, REMOVE_FROM_CART,
  CLEAR_GYM_DETAIL, GET_ATTRIBUTE_DESEASE, PUT_FAVOURITE, 
  CLEAR_CART, GET_CART, GET_ADMIN, GET_LOCK_ACCOUNTS, GET_MARKETING,SORT_QUALIFICATION,
  FILTER_CATEGORY,  SORT_PRICE,  SEARCH,  SORT_DISTANCE, SET_GYMS_GEO,
  GET_PLANS, GET_PARTNER_ID
} from "./actionTypes";
//--------------------------------------------------------------------------------
//------USER SERVICE ACTIONS------(favor de poner todas las aciones referentes a service en general todos los usuarios aqui)
//--------------------------------------------------------------------------------
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
    }
  };
}

export function getUser(data) {
  return (dispatch) => {
    dispatch({ type: GET_USER, payload: data });
  };
}

export function getAllUsers() { 
  // Esta ruta la consume el admin (va a estar protegida), y me trae información de todos
  // los "users" registrados en a app
    return async (dispatch) => {
      try {
        const response = await axios.get("/api/admin/allusers");
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
    }
  };
}

export const getUserGoogleForToken = (payload) => async dispatch => {
  try {
    // console.log(payload);
    const userGoogle = await axios.post('/api/service/google/auth/profile', {
      token: payload
    })
    // console.log(userGoogle)
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


export function getSearch(payload) {
  return {
    type: SEARCH,
    payload,
  };
}

//------AVATARS ACTIONS------(Favor de poner aqui todas las aciones referentes a los avatares)
//--------------------------------------------------------------------------------
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
  }
};

//--------------------------------------------------------------------------------
//---------- Acciones para el admin (las rutas van a ser protegidas)---------------
//---------------------------------------------------------------------------------
export function getAdmin(userId) { 
  // Esta ruta la consume el admin (va a estar protegida), y me trae información del
  // perfil del admin que la solicita
  return async (dispatch) => {
    try {
      const infoAdmin = await axios({
        method: "get", url: `/api/admin/userId/${userId}`,
        headers: { "X-Requested-With": "XMLHttpRequest" }, withCredentials: true
      });

      dispatch({
        type: GET_ADMIN,
        payload: infoAdmin.data,
      });
    } catch (err) {
      dispatch({
        type: GET_ADMIN,
        payload: { error: err.message },
      });
    };
  };
}

export const getPartner = (idPartner) => async dispatch => {
  try {
    const dataPartner = await axios.get(`/api/partner/profile/${idPartner}`)
    dispatch({
      type: GET_PARTNER_ID,
      payload: dataPartner.data.partner
    })
  } catch (error) {
    console.log("error", error)
  }
}


export function getAllPartners() {
  // Esta ruta la consume el admin (va a estar protegida), y me trae información de
  // todos los "partners" registrados en la app
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/admin/allpartners");
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

export function getLockAccounts() {
  // Esta ruta la consume el admin (va a estar protegida), y me trae información de
  // la lista de emails bloquedos para el sitio.
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/admin/lockaccounts");
      dispatch({
        type: GET_LOCK_ACCOUNTS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: GET_LOCK_ACCOUNTS,
        payload: { error: err.message },
      });
    }
  };
}


//--------------------------------------------------------------------------------
//------PARTNER ACTIONS------(Favor de poner aqui todas las aciones para partners)
//--------------------------------------------------------------------------------

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
  id,
  name,
  lastName,
  email,
  phone,
  cbu,
  cuil,
  socialNetworks,
 
}) {
  return async (dispatch) => {
    try {
      console.log("ESTA SALIENDO EL FORM DE PARTNER")
      const result = await axios.put(`/api/partner/profile/edit/${id}`, {
        id: id,
        name: name,
        lastName: lastName,
        email: email,
        phone: phone,
        cbu: cbu,
        cuil: cuil,
        socialNetworks: socialNetworks,
      
      });
      console.log("esto es la action",result)
      return dispatch({
        type: POST_PARTNER,
        payload: result.data,
      });
    } catch (error) {
      dispatch({
        type: POST_PARTNER,
        payload: { error: error.message },
      });
    }
  };
}



export function getPartnerDetails(id) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/partner/profile/${id}`);
      dispatch({
        type: GET_PARTNER,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: GET_PARTNER,
        payload: { error: err.message },
      });
    }
  };

};

export function getPlans(){
  return async (dispatch) =>{
    const plans = await axios.get('/api/service/plans/all')
    dispatch({
      type: GET_PLANS,
      payload: plans.data
    })
  }
}; 
//--------------------------------------------------------------------------------

//------GYMS ACTIONS------(Favor de poner aqui todas las aciones que hagan referencia a gimnasios)
//--------------------------------------------------------------------------------
export function createGym({
  gymInfo,
  idUser,
}) {
  return async (dispatch) => {
    try {     
      const response = await axios.put(`/api/partner/gyms/gymcreate/${idUser}`, gymInfo);
      return dispatch({
        type: POST_GYM,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: POST_GYM,
        payload: { error: error.message },
      });
    }
  };
};

export function setGymsGeo(payload) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_GYMS_GEO,
        payload: payload,
      });
    } catch (err) {
      dispatch({
        type: SET_GYMS_GEO,
        payload: { error: err.message },
      });
    }
  };
};

//--------------------------------------------------------------------------------
//------SERVICE ACTIONS------(Favor de poner aqui todas las aciones que hagan referencia a servicios)
//--------------------------------------------------------------------------------
export function createService({ //para crear un servicio hay que enviarlo con el id del usuario 
                                //y del gym al que se va a setear, igual seria mejor mandarlo junto con el gym
  name, 
  description, 
  duration, 
  price, 
  photo,
  incomes,
}) {
  return async (dispatch) => {
    try {
      const result = await axios.post("ruta", {
        name: name, // string requerido
        description: description, // string requerido
        duration: duration, //numero requerido
        price: price, //numero requerido
        photo: photo,
        incomes: incomes,
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
  };
}
//--------------------------------------------------------------------------------
//---------PAGINATED ACTIONS------------
//--------------------------------------------------------------------------------
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

export const updateUserInfo = (id, body) => async (dispatch) => {
  try {
    const dataNewUser = await axios.put(
      `/api/user/profile/update/${id}`,
      body,
      {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }
    );
    console.log(dataNewUser.data);
    dispatch({
      type: PUT_USER_INFO,
      payload: dataNewUser.data.updUser,
    });
  } catch (error) {
    console.log("error: ", error);
  }

};


// CARRITO DE COMPRAS USUARIO FINAL
//--------------------------------------------------------------------------------
export const getCart = () => {
  try {
    return async (dispatch) => {
      const getCart = await axios.get('/api/shopcart')
      console.log(getCart.data)
      return dispatch({
        type: GET_CART,
        payload: getCart.data
      })
    }
  } catch (error) {
    console.log(error)
  }
  
}

export function addToCart(itemID) {
  //console.log('llega id?', itemID)
  return (dispatch) => {
    try {
      dispatch({
        type: ADD_TO_CART,
        payload: {
          id: itemID,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export const removeFromCart = (itemID) => {
  return (dispatch) => {
    try {
      dispatch({
        type: REMOVE_FROM_CART,
        payload: {
          id: itemID,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const postCart = (body) => {
  return (dispatch) => {
    const post = axios.post('/api/shopcart', body)
    return post
  }
}

export function editStatus(statusCart) {
  return (dispatch) => {
    const put = axios.put('/api/shopcart', statusCart)
    return put
  };
}

export function clearCart() {
  return ({
    type: CLEAR_CART
  })
}

//--------------------------------------------------------------------------------
//-------- ORDENAMIENTO POR PUNTUACIÓN Y ORDEN ALFABÉTICO ---------------------------

export function sortByQualification(payload) {

  return {
    type: SORT_QUALIFICATION,
    payload,
  };
}

export function filterByCategory(payload) {
  return {
    type: FILTER_CATEGORY,
    payload,
  };
}

export function sortByPrice(payload) {
  return {
    type: SORT_PRICE,
    payload,
  };
}
export function sortByDistance(payload){
  return {
    type: SORT_DISTANCE ,
    payload
  }
}
//--------------------------------------------------------------------------------
//-------- ESTA ACCIÓN LIMPIA EL ESTADO DE GYM DETAIL ---------------------------------
export function clearGymDetail() {
  return {
    type: CLEAR_GYM_DETAIL, payload: {}
  }
}

export const updateFavouriteGym = (id, user) => async (dispatch) => {
  try {
    const newFavourite = await axios.put(
      `/api/user/profile/update/favourite/${id}`,
      {
        favourite: 1,
        idUser: user,
      }
    );
    dispatch({
      type: PUT_FAVOURITE,
      payload: newFavourite.data,
    });
  } catch (error) {
    console.log("error: ", error);
  }

}
//--------------------------------------------------------------------------------

//////////// ACA VA LO RELACIONADO CON LAS ENFERMEDADES (modelo Diseases)
//--------------------------------------------------------------------------------
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
      dispatch({type: DELETE_DESEASE})
    })
  }
}

//--------------------------------------------------------------------------------
//////////// ACA VA LO RELACIONADO CON LAS PUBLICIDADES DEL LANDING
//--------------------------------------------------------------------------------

export function getMarketing() { // Voy a usar esta action para el admin
  // console.log('esta buscando los users')
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/service/allusers");
      dispatch({
        type: GET_MARKETING,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: GET_MARKETING,
        payload: { error: err.message },
      });
    };
  };
};

