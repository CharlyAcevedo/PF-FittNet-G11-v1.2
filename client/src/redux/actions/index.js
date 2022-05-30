import axios from "axios";

import { 
  GET_ALL_USERS, 
  GET_ALL_PARTNERS, 
  POST_USER, 
  GET_AVATARS,
  SET_CURRENT_PAGE,
  SET_PAGE_NUMBER,
  SET_CURRENT_LIMIT,
  GET_ALL_GYMS,
  GET_GYM_DETAIL
 } from "./actionTypes";

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
};

export function postUser(payload) {
  return async (dispatch) => {
    try {
      const response = await axios.post("/api/users", payload);
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

export function getAllPartner() {
  return async (dispatch) => {
    try {
      const response = await axios.get("/partner");
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
      const response = await axios.get("/api/allgyms");
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
  }
};
export function getGymDetail(id) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/gymbyid/${id}`);
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
  }
}

export const getAvatars = () => async (dispatch) => {
  try {
    const dataAvatar = await axios.get(`/api/avatar`);
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
    };
  };
};

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
    };
  };
};

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
    };
  };
};
