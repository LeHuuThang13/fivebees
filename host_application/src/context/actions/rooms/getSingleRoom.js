import axios from 'axios';
import {
  GET_ROOMS_BY_ID_BUILDING_FAILED,
  GET_ROOMS_BY_ID_BUILDING_LOADING,
  GET_ROOMS_BY_ID_BUILDING_SUCCESS,
  GET_SINGLE_ROOM_FAILED,
  GET_SINGLE_ROOM_LOADING,
  GET_SINGLE_ROOM_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';

export default room_id =>
  dispatch =>
  ({isMounted, setIsLoaded}) => {
    if (isMounted) {
      dispatch({
        type: GET_SINGLE_ROOM_LOADING,
      });

      axiosInstance
        .get(`rooms/${room_id}`)
        .then(res => {
          dispatch({
            type: GET_SINGLE_ROOM_SUCCESS,
            payload: res.data.data,
          });
          setIsLoaded(true);
        })
        .catch(err => {
          console.log('get single id: ', error.response.data);
          dispatch({
            type: GET_SINGLE_ROOM_FAILED,
            payload: error.response.data,
          });
        });
    }
  };

// .then(res => {
//   dispatch({
//     type: GET_ROOMS_BY_ID_BUILDING_SUCCESS,
//     payload: res.data.data.rooms,
//   });
// })
// .catch(error => {
//   console.log('getRoomsByIdBuilding: ', error.response.data);
//   dispatch({
//     type: GET_ROOMS_BY_ID_BUILDING_FAILED,
//     payload: error.response.data,
//   });
// });
