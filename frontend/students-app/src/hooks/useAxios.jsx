import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { jwtDecode } from 'jwt-decode';


const useAxios = () => {
  const { authTokens } = useContext(AuthContext);
  const token = authTokens && authTokens.access;


  const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : null
    }
  });


  axiosInstance.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    console.error(error);
    return Promise.reject(error);
  });


  axiosInstance.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    if (error.response.status === 401 || error.response.status === 400) {
      const { logoutUser } = useContext(AuthContext);
      logoutUser();
    }
    console.error(error);
    return Promise.reject(error);
  });


  return axiosInstance;
};


export default useAxios;