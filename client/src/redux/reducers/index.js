import { 
    GET_ALL_USERS,    
    GET_ALL_CLIENTS,
    POST_USER,
 } from '../actions/actionTypes';


const initialState = {
    users: [],
    usersToShow: [],
    gyms: [],
    userDetail: {},
};


export default function rootReducer(state = initialState, { type, payload }) {

  switch (type) {
      case GET_ALL_USERS: 
    return {
        ...state,
        users: payload.data,
        usersToShow: payload.data,
    }
    default:
      return state;
  };
};