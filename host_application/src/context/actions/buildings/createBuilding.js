import React from 'react';
import {BuildingOptions} from '../../../components/common/BuildingOptions/BuildingOptions';
import {
  CREATE_BUILDINGS_LOADING,
  CREATE_BUILDINGS_FAILED,
  CREATE_BUILDINGS_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';
import {AxiosResponse, AxiosError} from 'axios';
import {Toast} from '../../../components/Toast';

export default form => dispatch => onSuccess => {
  const requestPayload = {
    name: form.name || '',
    address: form.address || '',
    filenames: 'sdkfjlskdfj.jpg' || '',
    hotline: form.hotline || '',
    email: form.email || '',
  };

  console.log('ad');

  dispatch({
    type: CREATE_BUILDINGS_LOADING,
  });
  axiosInstance
    .post('buildings', requestPayload)
    .then(res => {
      console.log('thành công');
      dispatch({
        type: CREATE_BUILDINGS_SUCCESS,
        payload: res.data.data,
      });
      Toast({title: 'Tạo tòa nhà mới thành công'});
      onSuccess();
    })
    .catch(error => {
      console.log(error.response.data);
      dispatch({
        type: CREATE_BUILDINGS_FAILED,
        payload: error.response.data,
      });
    });
};
