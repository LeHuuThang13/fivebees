import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  LOGIN_FAILED,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';

export default ({username, password}) =>
  dispatch => {
    const email = username;

    dispatch({type: LOGIN_LOADING});

    axiosInstance
      .post('v1/login', {
        email,
        password,
      })
      .then(res => {
        console.log('res.data: ', res.data);
        AsyncStorage.setItem('token', res.data.token);
        AsyncStorage.setItem('user', JSON.stringify(res.data.user));
        dispatch({type: LOGIN_SUCCESS, payload: res.data});
      })
      .catch(err => {
        dispatch({
          type: LOGIN_FAILED,
          payload: {error: 'Try again'},
        });
      });
  };
