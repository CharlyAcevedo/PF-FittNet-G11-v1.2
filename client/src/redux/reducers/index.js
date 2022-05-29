import { 
    GET_ALL_USERS,    
    GET_ALL_CLIENTS,
    POST_USER,
 } from '../actions/actionTypes';


const initialState = {
    users: [],
    user: {},
    usersToShow: [],
    gyms: [],
    userDetail: {},
    avatars: [],
};


export default function rootReducer(state = initialState, { type, payload }) {

  switch (type) {
      case GET_ALL_USERS: 
    return {
        ...state,
        users: payload.data,
        usersToShow: payload.data,
    }
    case 'GET_AVATARS':
      console.log(payload)
      return {
        ...state,
        avatars: payload
      }
    case 'POST_AVATAR':
      console.log(payload)
      return {
        ...state,
        user: payload
      }
    default:
      return state;
  };
};