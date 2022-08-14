import {
  GET_FACILITIES_FAILED,
  GET_FACILITIES_LOADING,
  GET_FACILITIES_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';

export default id => dispatch => isMounted => {
  dispatch({
    type: GET_FACILITIES_LOADING,
  });
  axiosInstance
    .get(`rooms/${id}`)
    .then(res => {
      if (isMounted) {
        dispatch({
          type: GET_FACILITIES_SUCCESS,
          payload: res.data.data,
        });
      }
    })
    .catch(error => {
      console.log('Get list facilities by id room', error.response.data);
      dispatch({
        type: GET_FACILITIES_FAILED,
        payload: error.response.data,
      });
    });
};
