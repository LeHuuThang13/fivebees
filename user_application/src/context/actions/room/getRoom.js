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

  console.log('id', id);

  axios
    .get('http://fivebees.ml/api/v1/rooms')
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err.response.data);
    });

  axiosInstance
    .get(`rooms`)
    .then(res => {
      console.log(res);
      dispatch({
        type: ROOM_DETAILS_SUCCESS,
        payload: res.data.data,
      });
      Toast({title: 'Tạo tòa nhà mới thành công'});
      onSuccess();
    })
    .catch(error => {
      // console.log('error creating buliding', error.response.data);
      dispatch({
        type: ROOM_DETAILS_FAIL,
        // payload: error.response.data,
      });
    });
};
