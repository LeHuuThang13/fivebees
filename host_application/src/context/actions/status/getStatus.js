import {
  GET_STATUS_FAILED,
  GET_STATUS_LOADING,
  GET_STATUS_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';

export default () => dispatch => {
  dispatch({
    type: GET_STATUS_LOADING,
  });
  axiosInstance
    .get(`status`)
    .then(res => {
      dispatch({
        type: GET_STATUS_SUCCESS,
        payload: res.data.data,
      });
      return res.data.data;
    })
    .catch(error => {
      console.log('Get status: ', error.response.data);
      dispatch({
        type: GET_STATUS_FAILED,
        payload: error.message,
      });
    });
};
