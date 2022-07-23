import AsyncStorage from '@react-native-async-storage/async-storage';
import {Toast} from '../../../components/Toast';
import {LOGOUT_USER} from '../../../constants/actionTypes';

export default () => dispatch => {
  AsyncStorage.removeItem('token');
  AsyncStorage.removeItem('user');
  Toast({title: 'Đăng xuất thành công'});
  dispatch({type: LOGOUT_USER});
};
