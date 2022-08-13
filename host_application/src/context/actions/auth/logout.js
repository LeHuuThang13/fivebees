import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Toast} from '../../../components/Toast';
import {LOGOUT_USER} from '../../../constants/actionTypes';

export default () => dispatch => {
  Toast({title: 'Đăng xuất thành công'});
  dispatch({type: LOGOUT_USER});
  AsyncStorage.removeItem('token');
  AsyncStorage.removeItem('user');
};
