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


  let requestPayload;
  // console.log(localFile);

  const formData = new FormData();
  const url = envs.BACKEND_URL + '/facilities';

  if (idRoom) {
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('category_id', category);
    formData.append('filenames', {
      type: 'image/jpeg',
      uri: localFile.path,
      name: localFile.path
    });
    formData.append('room_id', idRoom);
  } else if (status && room && category) {
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('category_id', category);
    formData.append('status_id', status);
    formData.append('filenames', {
      type: 'image/jpeg',
      uri: localFile.path,
      name: 'upload.jpg'
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
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
      },
    })
    .then(res => {
      const result = [res.data.data.facilities];
      dispatch({
        type: CREATE_FACILITY_SUCCESS,
        payload: result,
      });
      Toast({title: 'Tạo thiết bị mới thành công'});
      onSuccess();
    })
    .catch(err => {
      console.log('error creating facility', error.response.data);
      dispatch({
        type: CREATE_FACILITY_FAILED,
        payload: error.response.data,
      });
    });
  
};
