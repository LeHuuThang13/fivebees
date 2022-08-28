import axios from 'axios';
import {
  GET_ROOMS_FAILED,
  GET_ROOMS_LOADING,
  GET_ROOMS_SUCCESS,
  GET__LIST_ROOMS_BY_FAILED,
  GET__LIST_ROOMS_BY_LOADING,
  GET__LIST_ROOMS_BY_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';

export default idBuilding =>
  dispatch =>
  ({setIsLoaded, isMounted}) => {
    if (isMounted) {
      dispatch({
        type: GET__LIST_ROOMS_BY_LOADING,
      });
      axiosInstance
        .get(`rooms`)
        .then(res => {
          let data = [];
          res.data.data.map(item => {
            if (item?.building_id?.[0]?.id == idBuilding) {
              data.push(item);
            }
            return {};
          });
          dispatch({
            type: GET__LIST_ROOMS_BY_SUCCESS,
            payload: data,
          });
          setIsLoaded(true);
        })
        .catch(error => {
          console.log('Get rooms: ', error.response.data);
          dispatch({
            type: GET__LIST_ROOMS_BY_FAILED,
            payload: error.message,
          });
        });
    }
  };
