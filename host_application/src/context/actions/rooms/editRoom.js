import {
  UPDATE_ROOM_LOADING,
  UPDATE_ROOM_FAILED,
  UPDATE_ROOM_SUCCESS,
} from '../../../constants/actionTypes';
import envs from '../../../config/env';
import {Toast} from '../../../components/Toast';
import axios from 'axios';
import {Alert} from 'react-native';

export default form =>
  dispatch =>
  ({localFile, token}) =>
  idBuilding =>
  idRoom =>
  onSuccess => {
    const formData = new FormData();
    const url = envs.BACKEND_URL + `/rooms/${idRoom}`;
    console.log('idRoom', url);
    formData.append('room_number', form.room_number);
    formData.append('status', form.status);
    formData.append('_method', 'put');
    formData.append('description', form.description);
    formData.append('building_id', idBuilding);
    if (typeof localFile == 'object') {
      formData.append('filenames', {
        type: 'image/jpeg',
        uri: localFile.path,
        name: localFile.path,
      });
    } else {
      formData.append('filenames', {
        type: 'image/jpeg',
        uri: localFile.replace('http://', 'https://'),
        name: localFile.replace('http://', 'https://'),
      });
    }

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
          console.log(error.response);
        } else {
          Toast({title: 'Cập nhập thất bại'});
          dispatch({
            type: UPDATE_ROOM_FAILED,
            payload: error.response.data,
          });
        }
      });
  };
