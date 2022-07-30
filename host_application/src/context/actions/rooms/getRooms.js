import axios from 'axios';
import {
  GET_ROOMS_FAILED,
  GET_ROOMS_LOADING,
  GET_ROOMS_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';

export default props => dispatch => {
  const {idBuilding: id} = props;

  dispatch({
    type: GET_ROOMS_LOADING,
  });
  axiosInstance
    .get(`rooms/${id}`)
    .then(res => {
      console.log('res.data.data', res.data);
      dispatch({
        type: GET_ROOMS_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch(error => {
      console.log(error);
      dispatch({
        type: GET_ROOMS_FAILED,
        payload: error.message,
      });
    });
};
