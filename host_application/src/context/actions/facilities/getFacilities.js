import {Toast} from '../../../components/Toast';
import {
  GET_FACILITIES_FAILED,
  GET_FACILITIES_LOADING,
  GET_FACILITIES_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';

export default setIsLoaded => dispatch => {
  dispatch({
    type: GET_FACILITIES_LOADING,
  });
  axiosInstance
    .get(`facilities`)
    .then(res => {
      dispatch({
        type: GET_FACILITIES_SUCCESS,
        payload: res.data.data,
      });
      setIsLoaded(true);
    })
    .catch(error => {
      console.log('Get list facilities', error.response.data.message);
      Toast({title: 'Đường chuyền có vấn đề'});
      dispatch({
        type: GET_FACILITIES_FAILED,
        payload: error.response.data,
      });
    });
};
