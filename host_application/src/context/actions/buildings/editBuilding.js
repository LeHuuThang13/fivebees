import {
  EDIT_BUILDING_LOADING,
  EDIT_BUILDING_SUCCESS,
  EDIT_BUILDING_FAILED,
} from '../../../constants/actionTypes';
import envs from '../../../config/env';
import {Toast} from '../../../components/Toast';
import axios from 'axios';

export default form => dispatch => props => onSuccess => {
  const {localFile, buildingId, token, user, setDisabledBtn} = props;

  setDisabledBtn(true);
  let userJson = JSON.parse(user);
  const {id: user_id} = userJson;

  const formData = new FormData();
  const url = envs.BACKEND_URL + `/buildings/${buildingId}`;

  formData.append('name', form.name);
  formData.append('_method', 'put');
  formData.append('email', form.email);
  formData.append('address', form.address);
  formData.append('hotline', form.hotline);
  formData.append('user_id', user_id);
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
    type: EDIT_BUILDING_LOADING,
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
        type: EDIT_BUILDING_SUCCESS,
        payload: res.data.data,
      });
      setDisabledBtn(false);
      Toast({title: 'Cập nhập thành công'});
    })
    .catch(error => {
      console.log(error.request);
      console.log('error creating facility', error.response.data);
      setDisabledBtn(false);
      dispatch({
        type: EDIT_BUILDING_FAILED,
        payload: error.response.data,
      });
    });
};
