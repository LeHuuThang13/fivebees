import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Toast} from '../../../components/Toast';
import {LOGOUT_USER} from '../../../constants/actionTypes';
import {LOGIN} from '../../../constants/routeNames';

export default () => dispatch => {
  console.log(324);
  AsyncStorage.removeItem('token');
  AsyncStorage.removeItem('user');
  Toast({title: 'Đăng xuất thành công'});
  dispatch({type: LOGOUT_USER});
};
