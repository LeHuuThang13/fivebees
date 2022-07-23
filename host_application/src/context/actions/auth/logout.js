import AsyncStorage from '@react-native-async-storage/async-storage';
import {Toast} from '../../../components/Toast';
import {LOGOUT_USER} from '../../../constants/actionTypes';

export default () => dispatch => {
  Toast({title: 'Đăng xuất thành công'});
  AsyncStorage.removeItem('token');
  dispatch({type: LOGOUT_USER});
};
