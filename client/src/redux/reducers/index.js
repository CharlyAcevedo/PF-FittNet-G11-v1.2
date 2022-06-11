import { Action } from "history";
import { latBA, lngBA } from "../../asets/helpers/goeDefaults";

import {
  GET_ALL_USERS,
  GET_ALL_PARTNERS,
  GET_AVATARS,
  SET_CURRENT_PAGE,
  SET_PAGE_NUMBER,
  SET_CURRENT_LIMIT,
  GET_ALL_GYMS,
  GET_GYM_DETAIL,
  SET_USER_GEO,
  POST_USER_GOOGLE,
  GET_USER,
  POST_AVATAR,
  GET_USER_TOKEN_GOOGLE,
  PUT_USER_INFO,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_GYM_DETAIL,
  GET_ATTRIBUTE_DESEASE,
  PUT_FAVOURITE,
  SORT_QUALIFICATION,
  FILTER_CATEGORY,
  SORT_PRICE,
  SEARCH,
  SORT_DISTANCE,
} from "../actions/actionTypes";

const initialState = {
  users: [],
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
  deseaseAttribute: [],
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
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      }
      return {
        ...state,
        users: payload.data,
        usersToShow: payload.data,
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
      console.log("Esta aqui en reducer")
      console.log("esto seria user", user)
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
        console.log("Esto es la distancia de los GYM: ", dist)
        const newPage6 = dist.slice(payload.offset, payload.limit);
    if(dist <= 1 && payload ==="menor"){

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
    }
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

    case ADD_TO_CART:
      const item = state.products.find((prod) => prod._id === payload.id); //la clase q me matche con el id
      const inCart = state.cart.find((item) => item._id === payload.id);
      console.log(item);
      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item._id === payload.id ? { ...item, qty: item.qty + 1 } : item
            )
          : [...state.cart, { ...item, qty: 1 }],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== payload.id),
      };

    case CLEAR_GYM_DETAIL:
      return {
        ...state,
        gymDetail: payload,
      };
    case GET_ATTRIBUTE_DESEASE:
      return {
        ...state,
        deseaseAttribute: payload,
      };
    case PUT_FAVOURITE:
      const objFav = [];
      state.pageToShow.forEach((x) => {
        if (x._id === payload.gym._id) {
          x.favourite = payload.gym.favourite;
        }
        objFav.push(x);
      });
      return {
        ...state,
        pageToShow: objFav,
        gyms: objFav,
        gymsToShow: objFav,
      };
    default:
      return state;
  }
}
