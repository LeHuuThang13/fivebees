import {
  GET_DETAILS_ROOMS_FAILED,
  GET_FACILITIES_LOADING,
  GET_FACILITIES_SUCCESS,
  GET_FACILITIES_FAILED,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';

export default id => dispatch => isMounted => {
  const arr = [];
  dispatch({
    type: GET_FACILITIES_LOADING,
  });
  if (isMounted) {
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
                  type: GET_FACILITIES_SUCCESS,
                  payload: res,
                });
              });
          });
        } else {
          dispatch({
            type: GET_FACILITIES_FAILED,
            payload: [],
          });
        }
      })
      .catch(error => {
        console.log('Get rooms: ', error.response.data);
        dispatch({
          type: GET_FACILITIES_FAILED,
          payload: error.message,
        });
      });
  }
};
