import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Toast} from '../../../components/commons/Toast';
import {
  REGISTER_FAIL,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
} from '../../../constants/actionNames';
import axiosInstance from '../../../helpers/axiosInterceptor';

export default ({username, password, email}) =>
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
      ...roles,
    };

    console.log(form);

    axiosInstance
      .post('users', {
        name: 'Trần Văn C',
        email: 'tvc@gmail.com',
        password: '123456',
      })
      .then(res => {
        Toast({title: 'Đăng ký thành công'});
        // AsyncStorage.setItem('token', res.data.access_token);
        // AsyncStorage.setItem('user', JSON.stringify(res.data.user));
        console.log('res', res);
        // dispatch({type: REGISTER_SUCCESS, payload: res.data});
      })
      .catch(err => {
        console.log('err: >>', err);
        Toast({title: 'Đăng ký thất bại'});
        dispatch({
          type: REGISTER_FAIL,
          payload: {error: 'Try again'},
        });
      });
  };
