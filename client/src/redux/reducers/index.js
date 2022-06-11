import { latBA, lngBA } from "../../asets/helpers/goeDefaults";

import {

  GET_ALL_USERS, GET_ALL_PARTNERS, GET_AVATARS, SET_CURRENT_PAGE, SET_PAGE_NUMBER,
  SET_CURRENT_LIMIT, GET_ALL_GYMS, GET_GYM_DETAIL, SET_USER_GEO, POST_USER_GOOGLE,
  GET_USER, POST_AVATAR, GET_USER_TOKEN_GOOGLE, PUT_USER_INFO, ADD_TO_CART, REMOVE_FROM_CART,
  SORT_BY_NAME, SORT_BY_SCORE, CLEAR_GYM_DETAIL, GET_ATTRIBUTE_DESEASE, PUT_FAVOURITE, 
  CLEAR_CART, GET_CART, GET_ADMIN, GET_LOCK_ACCOUNTS, GET_MARKETING,
  
} from "../actions/actionTypes";

const initialState = {
  users: [], // Acá guardo mis users de la página
  user: {}, 
  usersToShow: [],
  currentUserDetails: {
    name: "",
    userName: "",
    password: "",
    type: "",
    currentGeo: {
      latitude: latBA,
      longitude: lngBA,
    },
  },
  currentGymCreated: {},
  gyms: [],
  gymsToShow: [],
  gymDetail: {},
  partners: [],
  partnersToShow: [],
  avatars: [],
  pageToShow: [],
  currentLimit: 9,
  currentPage: 1,
  errors: "",
  products: [],
  cart: [],
  getCart: [],
  deseaseAttribute: [],
  lockAccounts: [],
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_USER_GEO:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      }
      return {
        ...state,
        currentUserDetails: {
          ...state.currentUserDetails,
          currentGeo: {
            latitude: payload.latitude ? payload.latitude : latBA,
            longitude: payload.longitude ? payload.longitude : lngBA,
          },
        },
      };
    case GET_ALL_USERS:
      console.log(payload, 'en el reducer')
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      }
      return {
        ...state,
        users: payload,
        usersToShow: payload,
      };
    case GET_ALL_PARTNERS:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      }
      return {
        ...state,
        partners: payload,
        partnersToShow: payload,
      };
    case GET_USER_TOKEN_GOOGLE:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      }
      return {
        ...state,
        user: payload,
      };
    case PUT_USER_INFO:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      }
      return {
        ...state,
        // user: {...state.user, info: payload}
      };
    case GET_ALL_GYMS:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      }
      const newPage1 = payload.slice(payload.offset, payload.limit);
      return {
        ...state,
        gyms: payload,
        gymsToShow: payload,
        pageToShow: newPage1,
      };
    case POST_USER_GOOGLE:
      console.log(payload);
      return {
        ...state,
        user: payload,
      };
    case GET_USER:
      return {
        ...state,
        user: payload,
      };
    case GET_GYM_DETAIL:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      }
      return {
        ...state,
        gymDetail: payload,
        products: payload.services
      };
    case POST_AVATAR:
      return {
        ...state,
        user: payload,
      };
    case GET_AVATARS:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      }
      return {
        ...state,
        avatars: payload,
      };
    case SET_CURRENT_PAGE:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      }
      const newPage = state.gymsToShow.slice(payload.offset, payload.limit);
      return {
        ...state,
        pageToShow: newPage,
        currentPage: payload.currentPage,
      };
    case SET_PAGE_NUMBER:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      }
      return {
        ...state,
        currentPage: payload,
      };
    case SET_CURRENT_LIMIT:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      }

      return {
        ...state,
        currentLimit: payload,
      };

    case GET_CART:
      const idCart = payload?payload[payload.length - 1]._id:{}      
      return {
        ...state,
        getCart: idCart
      }
    case ADD_TO_CART:
      const item = state.products.find(prod => prod._id === payload.id) //la clase q me matche con el id
      const inCart = state.cart.find(item => item._id === payload.id)
      return {
        ...state,
        cart: inCart ?
          state.cart.map(item =>
            item._id === payload.id
              ? { ...item, qty: item.qty + 1 }
              : item
          )
          : [...state.cart, { ...item, qty: 1 }]
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.map(item =>
          item._id === payload.id
            ? { ...item, qty: item.qty ==0?0:item.qty - 1 }
            : item
        )        
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: []
      }
    case SORT_BY_NAME:
      let orderedGymsName = state.gymsToShow.length ? [...state.gymsToShow] : [...state.gyms];
      orderedGymsName = orderedGymsName.sort((a, b) => {
        if (a.name < b.name) {
          return payload === 'Orden ZA' ? -1 : 1
        }
        if (a.name > b.name) {
          return payload === 'Orden ZA' ? 1 : -1
        }
        return 0;
      })
      return {
        ...state,
        pageToShow: orderedGymsName
      }

    case SORT_BY_SCORE:
      let orderedGymsScore = state.gymsToShow.length ? [...state.gymsToShow] : [...state.gyms];
      orderedGymsScore = orderedGymsScore.sort((a, b) => {
        if (a.raiting < b.raiting) {
          return payload === "Descendente" ? -1 : 1
        }
        if (a.raiting > b.raiting) {
          return payload === "Descendente" ? 1 : -1
        }
        return 0;
      })
      return {
        ...state,
        pageToShow: orderedGymsScore
      }
    case CLEAR_GYM_DETAIL:
      return {
        ...state,
        gymDetail: payload
      }
    case GET_ATTRIBUTE_DESEASE:
      return {
        ...state,
        deseaseAttribute: payload,
      }
    case PUT_FAVOURITE:
      const objFav = []
      state.pageToShow.forEach(x => {
        if (x._id === payload.gym._id) {
          x.favourite = payload.gym.favourite
        }
        objFav.push(x)
      })
      return {
        ...state,
        pageToShow: objFav,
        gyms: objFav,
        gymsToShow: objFav,
        user: {...state.user, favourite: payload.user.favourite}
      }
    case GET_ADMIN:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      }
      return {
        ...state,
        user: payload
      }
    case GET_LOCK_ACCOUNTS:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      }
      return {
        ...state,
        lockAccounts: payload
      }
    case GET_MARKETING:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      }
      return {
        ...state,
      users: payload
      }      

    default:
      return state;
  }
}
