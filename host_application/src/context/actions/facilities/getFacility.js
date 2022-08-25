import {Toast} from '../../../components/Toast';
import {
  GET_FACILITY_FAILED,
  GET_FACILITY_LOADING,
  GET_FACILITY_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';

export default id => dispatch => {
  dispatch({
    type: GET_FACILITY_LOADING,
  });
  axiosInstance
    .get(`facilities/${id}`)
    .then(res => {
      dispatch({
        type: GET_FACILITY_SUCCESS,
        payload: res.data.data,
      });
      setIsLoaded(true);
    })
    .catch(error => {
      dispatch({
        type: GET_FACILITY_FAILED,
        payload: error.response.data,
      });
    });
};
