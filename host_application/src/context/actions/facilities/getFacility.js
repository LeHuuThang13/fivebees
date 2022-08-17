import {Toast} from '../../../components/Toast';
import {
  GET_FACILITIES_FAILED,
  GET_FACILITIES_LOADING,
  GET_FACILITIES_SUCCESS,
  GET_FACILITY_FAILED,
  GET_FACILITY_LOADING,
  GET_FACILITY_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';

export default id => dispatch => {
  dispatch({
    type: GET_FACILITY_LOADING,
  });
  console.log(324);
  axiosInstance
    .get(`facilities/${id}`)
    .then(res => {
      console.log('res.data.data', res.data.data);
      dispatch({
        type: GET_FACILITY_SUCCESS,
        payload: res.data.data,
      });
      setIsLoaded(true);
    })
    .catch(error => {
      console.log('Get list facilities', error.response.data.message);
      Toast({title: 'Đường chuyền có vấn đề'});
      dispatch({
        type: GET_FACILITY_FAILED,
        payload: error.response.data,
      });
    });
};
