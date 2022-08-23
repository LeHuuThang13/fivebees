import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Toast} from '../../../components/commons/Toast';
import {
  LOGOUT_LOADING,
  LOGOUT_SUCCESS,
  ROOM_DETAILS_CANCEL,
} from '../../../constants/actionNames';
import {LOGOUT} from '../../../constants/routeNames';
import axiosInstance from '../../../helpers/axiosInterceptor';

export default () => dispatch => dispatchRoom => {
  dispatch({type: LOGOUT_LOADING});

  axiosInstance
    .post('logout')
    .then(res => {
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('user');
      Toast({title: 'Đăng xuất thành công'});
      console.log(23);
      dispatch({type: LOGOUT_SUCCESS});
      // dispatchRoom({type: ROOM_DETAILS_CANCEL});
    })
    .catch(error => {
      console.log(error.response.data);
    });
};
