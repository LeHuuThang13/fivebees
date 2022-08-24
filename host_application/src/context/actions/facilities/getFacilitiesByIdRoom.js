import {
  GET_FACILITIES_FAILED,
  GET_FACILITIES_ID_ROOM_FAILED,
  GET_FACILITIES_ID_ROOM_LOADING,
  GET_FACILITIES_ID_ROOM_SUCCESS,
  GET_FACILITIES_LOADING,
  GET_FACILITIES_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';

export default id => dispatch => isMounted => setIsLoaded => {
  dispatch({
    type: GET_FACILITIES_ID_ROOM_LOADING,
  });
  axiosInstance
    .get(`facilities?room_id=${id}`)
    .then(res => {
      if (isMounted) {
        let data = [];
        res.data.data.map(item => {
          if (item.room?.[0]?.pivot?.room_id == id) {
            data.push(item);
          }
          return {};
        });
        setIsLoaded(true);
        dispatch({
          type: GET_FACILITIES_ID_ROOM_SUCCESS,
          payload: data,
        });
      }
    })
    .catch(error => {
      console.log('Get list facilities by id room', error.response.data);
      dispatch({
        type: GET_FACILITIES_ID_ROOM_FAILED,
        payload: error.response.data,
      });
    });
};
