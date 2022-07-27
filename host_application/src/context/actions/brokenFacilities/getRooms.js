import {
  GET_BROKEN_FACILITIES_FAILED,
  GET_BROKEN_FACILITIES_LOADING,
  GET_BROKEN_FACILITIES_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';

export default () => dispatch => {
  dispatch({
    type: GET_BROKEN_FACILITIES_LOADING,
  });
  axiosInstance
    .get('brokenFacilities')
    .then(res => {
      dispatch({
        type: GET_BROKEN_FACILITIES_SUCCESS,
        payload: res.data,
      });
    })
    .catch(error => {
      console.log(error);
      dispatch({
        type: GET_BROKEN_FACILITIES_FAILED,
        payload: error.message,
      });
    });
};
