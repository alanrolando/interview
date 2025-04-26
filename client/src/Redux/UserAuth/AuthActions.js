import * as AuthTypes from "./AuthTypes";
import { axiosInstance as axios } from "../../Utils/axios";

export const logInRequest = () => {
  return {
    type: AuthTypes.LOGIN_REQUEST,
  };
};

export const logInSuccess = (payload) => {
  return {
    type: AuthTypes.LOGIN_SUCCESS,
    payload,
  };
};

export const logInFailure = (error) => {
  return {
    type: AuthTypes.LOGIN_FAILURE,
    error: error,
  };
};

export const logOutSuccess = (payload) => {
  return {
    type: AuthTypes.LOG_OUT,
    payload,
  };
};

export const logIn = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(logInRequest());
    try {
      const response = await axios.post("/users/login", {
        email: email,
        password: password,
      });
      dispatch(logInSuccess(response.data));
    } catch (error) {
      dispatch(logInFailure(error.message));
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    try {
      await axios.post("/users/logout");
      dispatch(logOutSuccess());
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };
};
