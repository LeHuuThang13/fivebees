import {
  ROOM_DETAILS_FAIL,
  ROOM_DETAILS_SUCCESS,
  ROOM_DETAILS_LOADING,
} from '../../../constants/actionNames';
import axiosInstance from '../../../helpers/axiosInterceptor';
import {Toast} from '../../../components/commons/Toast';
import axios from 'axios';

export default prop => dispatch => onSuccess => {
  dispatch({
    type: ROOM_DETAILS_LOADING,
  });
  const id = prop.id;

  axiosInstance
    .get(`rooms/${id}`)
    .then(res => {
      onSuccess();
      dispatch({
        type: ROOM_DETAILS_SUCCESS,
        payload: res.data.data,
      });
      Toast({title: 'Quét mã phòng thành công'});
    })
    .catch(error => {
      console.log('error get room:', error.response.data);
      dispatch({
        type: ROOM_DETAILS_FAIL,
        payload: error.response.data,
      });
    });
};
