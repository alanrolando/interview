import * as DataTypes from "./DataTypes";

const initialState = {};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case DataTypes.GET_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case DataTypes.GET_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        error: "",
      };

    case DataTypes.GET_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        data: {},
        error: action.error,
      };

    case DataTypes.LOG_OUT:
      return {
        ...state,
        loading: false,
        data: {},
        error: "",
      };

    default:
      return state;
  }
};

export default dataReducer;
