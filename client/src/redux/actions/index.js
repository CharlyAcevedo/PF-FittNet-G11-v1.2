import axios from "axios";

import { GET_ALL_USERS, GET_ALL_CLIENTS, POST_USER, GET_AVATARS } from "./actionTypes";

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

export const getAvatars = () => async dispatch => {
  try {
    const dataAvatar = await axios.get(`http://localhost:3001/api/avatar`)
    dispatch ({
      type: 'GET_AVATARS',
      payload: dataAvatar.data
    })
  } catch (error) {
    console.log("error: ", error)
  }
}

export const postAvatar = (id, body) => async dispatch => {
  try {
    const dataUdpateAvatar = await axios.put(`http://localhost:3001/api/user/avatar/${id}`, body)
    dispatch({
      type: 'POST_AVATAR',
      payload: dataUdpateAvatar.data
    })
  } catch (error) {
    console.log("error: ", error)
  }
}