import axios from "axios";

import { GET_ALL_USERS, GET_ALL_CLIENTS, POST_USER } from "./actionTypes";

export function getAllUsers() {
  return async (dispatch) => {
    try {
      const response = await axios.get("/users");
      dispatch({
        type: GET_ALL_USERS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: GET_ALL_USERS,
        payload: { error: err.message },
      });
    }
  };
}
