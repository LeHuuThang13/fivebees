import {
  GET_FACILITIES_FAILED,
  GET_FACILITIES_LOADING,
  GET_FACILITIES_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';

export default () => dispatch => {
  dispatch({
    type: GET_FACILITIES_LOADING,
  });
  axiosInstance
    .get('facilities')
    .then(res => {
      dispatch({
        type: GET_FACILITIES_SUCCESS,
        payload: res.data,
      });
    })
    .catch(error => {
      console.log(error);
      dispatch({
        type: GET_FACILITIES_FAILED,
        payload: error.message,
      });
    });
};
