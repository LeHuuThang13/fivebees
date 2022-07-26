import axios from 'axios';
import {
  GET_ROOMS_FAILED,
  GET_ROOMS_LOADING,
  GET_ROOMS_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';

export default () => dispatch => {
  dispatch({
    type: GET_ROOMS_LOADING,
  });
  axiosInstance
    .get('rooms')
    .then(res => {
      dispatch({
        type: GET_ROOMS_SUCCESS,
        payload: res.data,
      });
    })
    .catch(error => {
      console.log(error);
      dispatch({
        type: GET_ROOMS_FAILED,
        payload: error.message,
      });
    });
};
