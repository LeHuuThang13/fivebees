import axios from 'axios';
import {
  GET_ROOMS_BY_ID_BUILDING_FAILED,
  GET_ROOMS_BY_ID_BUILDING_LOADING,
  GET_ROOMS_BY_ID_BUILDING_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';

export default rooms => dispatch => isMounted => {
  console.log('rooms', rooms);
  dispatch({
    type: GET_ROOMS_BY_ID_BUILDING_LOADING,
  });
  let arr = [];
  rooms.map(item => {
    axiosInstance
      .get(`rooms/${item.id}`)
      .then(res => {
        arr.push(res.data.data);
        return arr;
      })
      .then(res => {
        dispatch({
          type: GET_ROOMS_BY_ID_BUILDING_SUCCESS,
          payload: res,
        });
      });
  });
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
