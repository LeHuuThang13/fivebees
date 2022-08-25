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
    const id = prop;

    axiosInstance
      .get(`facilities?room_id=${id}`)
      .then(res => {
        let data = [];
        console.log('id', id);
        res.data.data.map(item => {
          if (item.room?.[0]?.pivot?.room_id == id) {
            data.push(item);
            console.log(item.room?.[0]?.pivot?.room_id == id);
          }
          return {};
        });
        dispatch({
          type: GET_FACILITIES_SUCCESS,
          payload: data,
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
