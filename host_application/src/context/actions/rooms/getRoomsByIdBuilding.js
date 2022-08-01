import axios from 'axios';
import {
  GET_ROOMS_BY_ID_BUILDING_FAILED,
  GET_ROOMS_BY_ID_BUILDING_LOADING,
  GET_ROOMS_BY_ID_BUILDING_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';

export default id => dispatch => setIsLoading => {
  dispatch({
    type: GET_ROOMS_BY_ID_BUILDING_LOADING,
  });

  axiosInstance
    .get(`buildings/${id}`)
    .then(res => {
      dispatch({
        type: GET_ROOMS_BY_ID_BUILDING_SUCCESS,
        payload: res.data.data,
      });
      setIsLoading(false);
      console.log('id get id building', id);
    })
    .catch(error => {
      console.log('getRoomsByIdBuilding', error.response.data);
      dispatch({
        type: GET_ROOMS_BY_ID_BUILDING_FAILED,
        payload: error.response.data,
      });
    });
};
