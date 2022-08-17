import {
  UPDATE_ROOM_LOADING,
  UPDATE_ROOM_FAILED,
  UPDATE_ROOM_SUCCESS,
} from '../../../constants/actionTypes';
import envs from '../../../config/env';
import {Toast} from '../../../components/Toast';
import axios from 'axios';

export default form =>
  dispatch =>
  ({localFile, token}) =>
  idBuilding =>
  idRoom =>
  onSuccess => {
    const formData = new FormData();
    const url = envs.BACKEND_URL + `/rooms/${idRoom}`;

    // formData.append('room_number', form.room_number);
    formData.append('_method', 'PUT');
    formData.append('status', form.status);
    formData.append('description', form.description);
    formData.append('idBuilding', idBuilding);
    formData.append('filenames', {
      type: 'image/jpeg',
      uri: localFile.path,
      name: localFile.path,
    });

    dispatch({
      type: UPDATE_ROOM_LOADING,
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
          type: UPDATE_ROOM_SUCCESS,
          payload: res.data.data,
        });
        Toast({title: 'Cập nhập thành công'});
      })
      .catch(error => {
        if (error.response.status === 0) {
          Toast({title: 'Vui lòng kiểm tra lại đường truyền'});
        } else {
          Toast({title: 'Cập nhập thất bại'});
          dispatch({
            type: UPDATE_ROOM_FAILED,
            payload: error.response.data,
          });
        }
      });
  };
