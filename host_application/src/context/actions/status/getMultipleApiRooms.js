import {
  GET_DETAILS_ROOMS_LOADING,
  GET_DETAILS_ROOMS_FAILED,
  GET_DETAILS_ROOMS_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';

export default id => dispatch => setState => {
  const arr = [];
  dispatch({
    type: GET_DETAILS_ROOMS_LOADING,
  });
  axiosInstance
    .get(`buildings/${id}`)
    .then(res => {
      return res.data.data.rooms;
    })
    .then(data => {
      if (data.length > 0) {
        data.map(async (item, index) => {
          axiosInstance
            .get(`rooms/${item.id}`)
            .then(res => {
              arr.push(res.data.data);
              return arr;
            })
            .then(res => {
              dispatch({
                type: GET_DETAILS_ROOMS_SUCCESS,
                payload: res,
              });
            });
        });
      } else {
        dispatch({
          type: GET_DETAILS_ROOMS_SUCCESS,
          payload: [],
        });
      }
    })
    .catch(error => {
      console.log('Get rooms: ', error.response.data);
      dispatch({
        type: GET_DETAILS_ROOMS_FAILED,
        payload: error.message,
      });
    });
};
