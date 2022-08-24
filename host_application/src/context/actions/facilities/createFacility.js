import {
  CREATE_FACILITY_LOADING,
  CREATE_FACILITY_FAILED,
  CREATE_FACILITY_SUCCESS,
} from '../../../constants/actionTypes';
import {Toast} from '../../../components/Toast';
import envs from '../../../config/env';
import axios from 'axios';

export default form => dispatch => params => onSuccess => {
  const {category, localFile, idRoom, room, status, token} = params;

  const formData = new FormData();
  const url = envs.BACKEND_URL + '/facilities';

  if (idRoom) {
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('category_id', category);
    formData.append('status_id', 1);
    formData.append('filenames', {
      type: 'image/jpeg',
      uri: localFile.path.replace('http://', 'https://'),
      name: localFile.path.replace('http://', 'https://'),
    });
    formData.append('room_id', idRoom);
  } else if (status && room && category) {
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('category_id', category);
    formData.append('status_id', status);
    formData.append('filenames', {
      type: 'image/jpeg',
      uri: localFile.path.replace('http://', 'https://'),
      name: localFile.path.replace('http://', 'https://'),
    });
    formData.append('room_id', room);
  }

  dispatch({
    type: CREATE_FACILITY_LOADING,
  });

  axios
    .post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => {
      const result = res.data.data;
      onSuccess();
      dispatch({
        type: CREATE_FACILITY_SUCCESS,
        payload: result,
      });
      Toast({title: 'Tạo thiết bị mới thành công'});
    })
    .catch(err => {
      console.log('error creating facility', err);
      dispatch({
        type: CREATE_FACILITY_FAILED,
        payload: err.response.data,
      });
    });
};
