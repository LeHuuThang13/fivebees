import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import envs from '../config/env';
import {LOGOUT} from '../constants/routeNames';
import logout from '../context/actions/auth/logout';
import {navigate} from '../navigations/RootNavigator';

const axiosInstance = axios.create({
  baseURL: envs.BACKEND_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

axiosInstance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

const STATUS_TOKEN_EXPIRED = 401;

axiosInstance.interceptors.response.use(
  response =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),
  error => {
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    if (typeof error.response === 'undefined') {
      console.log('Axios get undefine respones');
    }
    if (error.response.status === STATUS_TOKEN_EXPIRED) {
      navigate(LOGOUT, {tokenExpired: true});
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
