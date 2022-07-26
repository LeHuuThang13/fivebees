import {
  GET_BUILDINGS_FAILED,
  GET_BUILDINGS_LOADING,
  GET_BUILDINGS_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';

export default () => dispatch => {
  dispatch({
    type: GET_BUILDINGS_LOADING,
  });
  axiosInstance
    .get('buildings')
    .then(res => {
      dispatch({
        type: GET_BUILDINGS_SUCCESS,
        payload: res.data,
      });
    })
    .catch(error => {
      console.log(error);
      dispatch({
        type: GET_BUILDINGS_FAILED,
        payload: error.message,
      });
    });
};
