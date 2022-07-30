import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import envs from '../config/env';

const axiosInstance = axios.create({
  baseURL: envs.BACKEND_URL,
  headers: {Accept: 'application/json'},
  // validateStatus: function validateStatus(status) {
  //   let defaultStatus = status >= 200 && status < 300;
  //   let extra = status == 422;
  //   return defaultStatus || extra;
  // },
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

export default axiosInstance;
