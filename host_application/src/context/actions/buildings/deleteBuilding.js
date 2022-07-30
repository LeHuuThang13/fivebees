import React from 'react';
import {BuildingOptions} from '../../../components/common/BuildingOptions/BuildingOptions';
import {
  DELETE_BUILDING_LOADING,
  DELETE_BUILDING_FAILED,
  DELETE_BUILDING_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';
import {AxiosResponse, AxiosError} from 'axios';
import {Toast} from '../../../components/Toast';

export default id => dispatch => {
  dispatch({
    type: DELETE_BUILDING_LOADING,
  });
  console.log('hellow');
  axiosInstance
    .delete(`buildings/${id}`)
    .then(() => {
      console.log('thành công');
      dispatch({
        type: DELETE_BUILDING_SUCCESS,
        payload: id,
      });
      Toast({title: 'Xóa thành công'});
    })
    .catch(error => {
      console.log(error.response.data);
      Toast({title: 'Xóa thất bại'});
      dispatch({
        type: DELETE_BUILDING_FAILED,
        payload: error.response.data,
      });
    });
};
