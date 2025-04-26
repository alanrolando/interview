import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `http://localhost:5000/`,
  withCredentials: true,
});

const responseHandler = (response) => response;

const errorHandler = (error) => {
  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(responseHandler, errorHandler);

export { axiosInstance };
