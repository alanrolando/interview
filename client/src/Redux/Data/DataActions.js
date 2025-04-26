import * as DataTypes from "./DataTypes";
import { axiosInstance as axios } from "../../Utils/axios";

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// GET Data STAGES ACTIONS ///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

export const getDataRequest = () => {
  return {
    type: DataTypes.GET_DATA_REQUEST,
  };
};

export const getDataSuccess = (data) => {
  return {
    type: DataTypes.GET_DATA_SUCCESS,
    data: data,
  };
};

export const getDataFailure = (error) => {
  return {
    type: DataTypes.GET_DATA_FAILURE,
    error: error,
  };
};

export const getData = () => async (dispatch) => {
  dispatch(getDataRequest());
  try {
    const response = await axios.get(`/`);

    dispatch(getDataSuccess(response.data));
  } catch (error) {
    dispatch(getDataFailure(error.message));
  }
};

export const updateUserData = (data) => async (dispatch) => {
  dispatch(getDataRequest());
  try {
    await axios.patch(`/`, data);
    dispatch(getDataSuccess(data));
  } catch (error) {
    dispatch(getDataFailure(error.message));
  }
};
