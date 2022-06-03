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
} from "../actions/actionTypes";

const lat = -34.6154611;
const lng = -58.5733843;

const initialState = {
  users: [],
  user: {},
  usersToShow: [],
  userDetail: {},
  currentGeo: {
    latitude: lat,
    longitude: lng
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
        currentGeo: {
          latitude: payload.latitude ? payload.latitude : lat,
          longitude: payload.longitude ? payload.longitude : lng
        }
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
    case "GET_USER_TOKEN_GOOGLE":
      console.log(payload)
      return {
        ...state,
        user: payload
      }
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
    case 'POST_USER_GOOGLE':
      console.log(payload)
      return {
        ...state,
        user: payload
      }
    case 'GET_USER':
      console.log(payload)
      return {
        ...state,
        user: payload
      }
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
      };
    case 'POST_AVATAR':
      return {
        ...state,
        user: payload
      }
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
    default:
      return state;
  }
}
