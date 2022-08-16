import {
  GET_DATA_BUILDINGS_ID_LOADING,
  GET_DATA_BUILDINGS_ID_SUCCESS,
  GET_DATA_BUILDINGS_ID_FAILED,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';

export default id => dispatch => isMounted => {
  console.log('---------------');
  if (isMounted) {
    dispatch({
      type: GET_DATA_BUILDINGS_ID_LOADING,
    });
    axiosInstance
      .get(`buildings/${id}`)
      .then(res => {
        console.log(id);
        dispatch({
          type: GET_DATA_BUILDINGS_ID_SUCCESS,
          payload: res.data.data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_DATA_BUILDINGS_ID_FAILED,
          payload: error.message,
        });
      });
  }
};
