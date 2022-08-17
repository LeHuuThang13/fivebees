import {
  CREATE_FACILITY_LOADING,
  CREATE_FACILITY_FAILED,
  CREATE_FACILITY_SUCCESS,
} from '../../../constants/actionTypes';
import envs from '../../../config/env';
import {Toast} from '../../../components/Toast';
import axios from 'axios';

export default form => dispatch => params => onSuccess => {
  const {
    category,
    localFile,
    idRoom,
    idFacility,
    token,
    isManagingDevices,
    room,
    status,
  } = params;

  const formData = new FormData();
  const url = envs.BACKEND_URL + `/facilities/${idFacility}`;
  const STATUS_DEFAULT = 1;

  if (isManagingDevices) {
    if (localFile) {
      formData.append('name', form.name);
      formData.append('_method', 'PUT');
      formData.append('description', form.description);
      formData.append('category_id', category);
      formData.append('status_id', status);
      formData.append('room_id', room);
      formData.append('filenames', {
        type: 'image/jpeg',
        uri: localFile.path,
        name: localFile.path,
      });
    } else {
      formData.append('name', form.name);
      formData.append('_method', 'PUT');
      formData.append('description', form.description);
      formData.append('category_id', category);
      formData.append('status_id', status);
      formData.append('room_id', room);
    }
  } else {
    if (localFile) {
      formData.append('name', form.name);
      formData.append('_method', 'PUT');
      formData.append('description', form.description);
      formData.append('category_id', category);
      formData.append('status_id', STATUS_DEFAULT);
      formData.append('filenames', {
        type: 'image/jpeg',
        uri: localFile.path,
        name: localFile.path,
      });
      formData.append('room', idRoom);
    } else {
      formData.append('name', form.name);
      formData.append('_method', 'PUT');
      formData.append('description', form.description);
      formData.append('category_id', category);
      formData.append('status_id', STATUS_DEFAULT);
      formData.append('room', idRoom);
    }
  }

  dispatch({
    type: CREATE_FACILITY_LOADING,
  });

  axios
    .post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
      },
      validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      },
    })
    .then(res => {
      onSuccess();
      dispatch({
        type: CREATE_FACILITY_SUCCESS,
        payload: res.data.data,
      });
      Toast({title: 'Cập nhập thiết bị thành công'});
    })
    .catch(error => {
      Toast({title: 'Vui lòng kiểm tra lại đường truyền'});
      console.log('error creating buliding', error.response);
      dispatch({
        type: CREATE_FACILITY_FAILED,
        payload: error.response.data,
      });
    });
};
