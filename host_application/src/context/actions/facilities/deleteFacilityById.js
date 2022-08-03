import {
  DELETE_FACILITY_LOADING,
  DELETE_FACILITY_FAILED,
  DELETE_FACILITY_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';
import {Toast} from '../../../components/Toast';

export default id => dispatch => {
  console.log('id: >>>>', id);
  dispatch({
    type: DELETE_FACILITY_LOADING,
  });
  axiosInstance
    .delete(`facilities/${id}`)
    .then(() => {
      dispatch({
        type: DELETE_FACILITY_SUCCESS,
        payload: id,
      });
      Toast({title: 'Xóa thành công'});
    })
    .catch(error => {
      console.log('Delete facility: ', error.response.data);
      Toast({title: 'Xóa thất bại'});
      dispatch({
        type: DELETE_FACILITY_FAILED,
        payload: error.response.data,
      });
    });
};
