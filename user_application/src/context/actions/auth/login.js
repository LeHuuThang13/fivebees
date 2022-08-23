import AsyncStorage from '@react-native-async-storage/async-storage';
import {Toast} from '../../../components/commons/Toast';
import {
  LOGIN_FAIL,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
} from '../../../constants/actionNames';
import axiosInstance from '../../../helpers/axiosInterceptor';

export default ({username, password}) =>
  dispatch => {
    const email = username;

    dispatch({type: LOGIN_LOADING});

    axiosInstance
      .post('login', {
        email,
        password,
      })
      .then(res => {
        Toast({title: 'Đăng nhập thành công'});
        AsyncStorage.setItem('token', res.data.access_token);
        AsyncStorage.setItem('user', JSON.stringify(res.data.user));
        dispatch({type: LOGIN_SUCCESS, payload: res.data});
      })
      .catch(err => {
        Toast({title: 'Đăng nhập thất bại'});
        dispatch({
          type: LOGIN_FAIL,
          payload: {error: 'Try again'},
        });
      });
  };
