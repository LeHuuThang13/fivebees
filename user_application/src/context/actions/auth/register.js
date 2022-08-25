import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Toast} from '../../../components/commons/Toast';
import {
  REGISTER_FAIL,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
} from '../../../constants/actionNames';
import axiosInstance from '../../../helpers/axiosInterceptor';

export default ({username, password, email, password_confirmation}) =>
  dispatch => {
    const name = username;
    const roles = {
      'roles[]': 3,
    };
    console.log(username, password, email);

    // dispatch({type: REGISTER_LOADING});

    const form = {
      email,
      password,
      name,
      password_confirmation,
      ...roles,
    };

    console.log(form);

    axiosInstance
      .post('register', form)
      .then(res => {
        Toast({title: 'Đăng ký thành công'});
        AsyncStorage.setItem('token', res.data.access_token);
        AsyncStorage.setItem('user', JSON.stringify(res.data.user));
        dispatch({type: REGISTER_SUCCESS, payload: res.data});
      })
      .catch(err => {
        console.log('err: >>', err.response.data);
        Toast({title: 'Đăng ký thất bại'});
        dispatch({
          type: REGISTER_FAIL,
          payload: {error: 'Try again'},
        });
      });
  };
