import {
  GET_USER_INFO_FAILED,
  GET_USER_INFO_LOADING,
  GET_USER_INFO_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';

export default () => dispatch => {
  dispatch({
    type: GET_USER_INFO_LOADING,
  });
  axiosInstance
    .get('userInfo')
    .then(res => {
      dispatch({
        type: GET_USER_INFO_SUCCESS,
        payload: res.data,
      });
    })
    .catch(error => {
      console.log('Get user info: ', error.response.data);
      dispatch({
        type: GET_USER_INFO_FAILED,
        payload: error.message,
      });
    });
};
