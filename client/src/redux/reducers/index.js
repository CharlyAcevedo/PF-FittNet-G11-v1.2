// eslint-disable-next-line
import { Action } from "history";
import { latBA, lngBA } from "../../asets/helpers/goeDefaults";

import { 
  GET_ALL_USERS, GET_ALL_PARTNERS, GET_AVATARS, SET_CURRENT_PAGE, SET_PAGE_NUMBER,
  SET_CURRENT_LIMIT, GET_ALL_GYMS, GET_GYM_DETAIL, SET_USER_GEO, POST_USER_GOOGLE,
  GET_USER, POST_AVATAR, GET_USER_TOKEN_GOOGLE, PUT_USER_INFO, ADD_TO_CART, REMOVE_FROM_CART,
  SORT_BY_NAME, SORT_BY_SCORE, CLEAR_GYM_DETAIL, GET_ATTRIBUTE_DESEASE, PUT_FAVOURITE, 
  CLEAR_CART, GET_CART, GET_ADMIN, GET_LOCK_ACCOUNTS, GET_MARKETING,SORT_QUALIFICATION,
  FILTER_CATEGORY, SORT_PRICE, SEARCH, SORT_DISTANCE, SET_GYMS_GEO, POST_GYM, GET_PARTNER,
  GET_PLANS, GET_PARTNER_ID
} from "../actions/actionTypes";

const initialState = {
  users: [], // Acá guardo mis users de la página
  user: {},
  usersToShow: [],
  currentUserDetails: {
  },
  currentGeo: {
    latitude: latBA,
    longitude: lngBA,
  },
  gymsGeo: {
    latitude: 0,
    longitude: 0,
  },
  currentGymCreated: {},
  gymCreaded: {},
  gyms: [],
  gymsToShow: [],
  gymDetail: {},
  partners: [],
  partnersToShow: [],
  partnerDetails: {},
  avatars: [],
  pageToShow: [],
  currentLimit: 6,
  currentPage: 1,
  errors: "",
  products: [],
  cart: [],
  getCart: [],
  deseaseAttribute: [],
  lockAccounts: [],
  plans: [],

};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_USER_GEO:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      };
      return {
        ...state,
        currentGeo: {
          latitude: payload.latitude ? payload.latitude : latBA,
          longitude: payload.longitude ? payload.longitude : lngBA,
        },
      };
    case GET_ALL_USERS:
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
    case GET_PARTNER:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      }
      return {
        ...state,
        partnerDetails: payload.partnerGyms,
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
        user: {...state.user, info: payload}
      };
    case GET_PARTNER_ID:
      return {
        ...state,
        user: payload
      };
    case GET_ALL_GYMS:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      };
      const newPage1 = payload.slice(payload.offset, payload.limit);
      return {
        ...state,
        gyms: payload,
        gymsToShow: payload,
        pageToShow: newPage1,
      };
    case SET_GYMS_GEO:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      };
      return {
        ...state,
        gymsGeo: {
          latitude: payload.latitude,
          longitude: payload.longitude,
        },
      };
    case POST_GYM:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      };
      return {
        ...state,
        gymCreaded: payload,
      };
    case SORT_QUALIFICATION:
      const qualification = state.gyms;
      const all =
        payload === "ascendente"
          ? qualification.sort(function (a, b) {
            if (b.raiting > a.raiting) {
              return -1;
            }
            if (a.raiting > b.raiting) {
              return 1;
            }
            return 0;
          })
          : qualification.sort(function (a, b) {
            if (a.raiting > b.raiting) {
              return -1;
            }
            if (b.raiting > a.raiting) {
              return 1;
            }
            return 0;
          });
      const newPage2 = all.slice(payload.offset, payload.limit);
      return {
        ...state,
        gymsToShow: all,
        pageToShow: newPage2,
      };
    case SORT_PRICE:
      const price = state.gyms;
      const sortPrice =
        payload === "ascendente"
          ? price.sort((a, b) => {
            if (
              Number(b.price.$numberDecimal) > Number(a.price.$numberDecimal)
            ) {
              return -1;
            }
            if (
              Number(a.price.$numberDecimal) > Number(b.price.$numberDecimal)
            ) {
              return 1;
            }
            return 0;
          })
          : price.sort((a, b) => {
            if (
              Number(a.price.$numberDecimal) > Number(b.price.$numberDecimal)
            ) {
              return -1;
            }
            if (
              Number(b.price.$numberDecimal) > Number(a.price.$numberDecimal)
            ) {
              return 1;
            }
            return 0;
          });
      const newPage4 = sortPrice.slice(payload.offset, payload.limit);
      return {
        ...state,
        gymsToShow: sortPrice,
        pageToShow: newPage4,
      };
    case SORT_DISTANCE:
      const gym = state.gyms;
      const user = state.user;
      console.log("Esta aqui en reducer");
      console.log("esto seria user", user);
      const dist =
        (Math.pow(
          gym.map((e) => Number(e.longitude.$numberDecimal)) -
          Number(user.longitude.$numberDecimal)
        ) +
          Math.pow(
            gym.map((e) => Number(e.latitude.$numberDecimal)) -
            Number(user.latitude.$numberDecimal)
          )) **
        0.5;
      console.log("Esto es la distancia de los GYM: ", dist);
      const newPage6 = dist.slice(payload.offset, payload.limit);
      if (dist <= 1 && payload === "menor") {
        return {
          ...state,
          gymsToShow: dist,
          pageToShow: newPage6,
        };
      } else {
        return {
          ...state,
          gymsToShow: dist,
          pageToShow: newPage6,
        };
      };
    case FILTER_CATEGORY:
      const category = state.gyms;
      const filtCateg =
        payload === "all"
          ? category
          : category.filter((e) =>
            e.services.map((e) => e.name).includes(payload)
          );
      console.log("Esto es en redux", filtCateg);
      const newPage3 = filtCateg.slice(payload.offset, payload.limit);
      return {
        ...state,
        gymsToShow: filtCateg,
        pageToShow: newPage3,
      };
    case SEARCH:
      const searc = state.gyms;
      const buscador = payload
        ? searc.filter((e) =>
          e.name.toLowerCase().includes(payload.toLowerCase())
        )
        : searc;
      const newPage5 = buscador.slice(payload.offset, payload.limit);
      return {
        ...state,
        gymsToShow: buscador,
        pageToShow: newPage5,
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
        products: payload.services,
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
      const idCart = payload ? payload[payload.length - 1]._id : {}
      return {
        ...state,
        getCart: idCart
      };
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
            ? { ...item, qty: item.qty == 0 ? 0 : item.qty - 1 }
            : item
        )
      };
    case CLEAR_GYM_DETAIL:
      return {
        ...state,
        gymDetail: payload,
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: []
      };
    case GET_ATTRIBUTE_DESEASE:
      return {
        ...state,
        deseaseAttribute: payload,
      };
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
        user: { ...state.user, favourite: payload.user.favourite }
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
      };
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
      };
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
    case GET_PLANS:
      return {
        ...state,
        plans: payload
      }
    default:
      return state;
  }
}
