import {
  ROOM_DETAILS_FAIL,
  ROOM_DETAILS_SUCCESS,
  ROOM_DETAILS_LOADING,
  GET_FACILITIES_LOADING,
  GET_FACILITIES_SUCCESS,
  GET_FACILITIES_FAIL,
} from '../../../constants/actionNames';
import axiosInstance from '../../../helpers/axiosInterceptor';
import {Toast} from '../../../components/commons/Toast';
import axios from 'axios';

export default prop => dispatch => isMounted => setIsLoaded => {
  if (isMounted) {
    dispatch({
      type: GET_FACILITIES_LOADING,
    });
    const id = prop.id;

    axiosInstance
      .get(`facilities?room_id=${id}`)
      .then(res => {
        dispatch({
          type: GET_FACILITIES_SUCCESS,
          payload: res.data.data,
        });
        setIsLoaded(true);
      })
      .catch(error => {
        console.log('error get room:', error.response.data);
        dispatch({
          type: GET_FACILITIES_FAIL,
          payload: error.response.data,
        });
      });
  }
};
