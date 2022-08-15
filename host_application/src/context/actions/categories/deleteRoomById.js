import {
  DELETE_ROOM_BY_ID_LOADING,
  DELETE_ROOM_BY_ID_FAILED,
  DELETE_ROOM_BY_ID_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';
import {Toast} from '../../../components/Toast';

export default idRoom => dispatch => {
  dispatch({
    type: DELETE_ROOM_BY_ID_LOADING,
  });

  axiosInstance
    .delete(`rooms/${idRoom}`)
    .then(res => {
      dispatch({
        type: DELETE_ROOM_BY_ID_SUCCESS,
        payload: idRoom,
      });
      Toast({title: 'Xóa phòng thành công'});
    })
    .catch(error => {
      console.log('error delete room', error.response.data);
      dispatch({
        type: DELETE_ROOM_BY_ID_FAILED,
        payload: error.response.data,
      });
    });
};
