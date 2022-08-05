import {
  GET_CATEGORIES_FAILED,
  GET_CATEGORIES_LOADING,
  GET_CATEGORIES_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';

export default () => dispatch => {
  dispatch({
    type: GET_CATEGORIES_LOADING,
  });
  axiosInstance
    .get(`categories`)
    .then(res => {
      dispatch({
        type: GET_CATEGORIES_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch(error => {
      console.log('Get categories: ', error.response.data);
      dispatch({
        type: GET_CATEGORIES_FAILED,
        payload: error.message,
      });
    });
};
