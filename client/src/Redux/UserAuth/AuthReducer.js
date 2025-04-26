import * as AuthTypes from "./AuthTypes";

const initialState = {};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    //LOGIN CASES
    case AuthTypes.LOGIN_REQUEST:
      return {
        ...state,
        error: "",
        isUserLoggedIn: false,
        loading: true,
      };
    case AuthTypes.LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        isUserLoggedIn: true,
        error: "",
      };
    case AuthTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        isUserLoggedIn: false,
        error: action.error,
      };
    //LOGOUT CASES
    case AuthTypes.LOG_OUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
