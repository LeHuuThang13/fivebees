import {
  CREATE_BUILDING_FAILED,
  CREATE_BUILDING_LOADING,
  CREATE_BUILDING_SUCCESS,
} from '../../../constants/actionTypes';
import {Toast} from '../../../components/Toast';
import envs from '../../../config/env';
import axios from 'axios';
import {Alert} from 'react-native';

export default form =>
  dispatch =>
  ({localFile, token}) =>
  onSuccess => {
    dispatch({
      type: CREATE_BUILDING_LOADING,
    });

    const formData = new FormData();
    const url = envs.BACKEND_URL + '/buildings';

    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('address', form.address);
    formData.append('hotline', form.hotline);
    formData.append('filenames[]', {
      type: 'image/jpeg',
      uri: localFile.path,
      name: localFile.path,
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
        onSuccess();
        Toast({title: 'Tạo thiết bị mới thành công'});
        dispatch({
          type: CREATE_BUILDING_SUCCESS,
          payload: res.data.data,
        });
      })
      .catch(error => {
        console.log('error creating building', error.response.data.message);
        if (error.response.data.message.includes('Duplicate')) {
          Alert.alert('Thông báo', 'Tòa nhà đã tồn tại, vui lòng nhập lại', [
            {
              text: 'Đã hiểu',
              onPress: () => console.log('Đã hiểu'),
              style: 'cancel',
            },
          ]);
        }
        dispatch({
          type: CREATE_BUILDING_FAILED,
          payload: error.response.data,
        });
      });
  };
