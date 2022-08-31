import {
  CREATE_ROOM_BY_ID_BUILDING_FAILED,
  CREATE_ROOM_BY_ID_BUILDING_SUCCESS,
  CREATE_ROOM_BY_ID_BUILDING_LOADING,
} from '../../../constants/actionTypes';
import {Toast} from '../../../components/Toast';
import envs from '../../../config/env';
import axios from 'axios';

export default form =>
  dispatch =>
  ({localFile, token}) =>
  idBuilding =>
  onSuccess => {
    const formData = new FormData();
    const url = envs.BACKEND_URL + '/rooms';
    formData.append('room_number', form.room_number);
    formData.append('status', form.status);
    formData.append('description', form.description);
    formData.append('building_id', idBuilding);
    formData.append('filenames[]', {
      type: 'image/jpeg',
      uri: localFile.path,
      name: localFile.path,
    });

    console.log(localFile.path);

    dispatch({
      type: CREATE_ROOM_BY_ID_BUILDING_LOADING,
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
        dispatch({
          type: CREATE_ROOM_BY_ID_BUILDING_SUCCESS,
          payload: res.data.data,
        });
        Toast({title: 'Tạo phòng mới thành công'});
      })
      .catch(error => {
        console.log('error creating room', error.response);
        if (error.response.data.message.includes('Duplicate')) {
          Alert.alert('Thông báo', 'Tòa nhà đã tồn tại, vui lòng nhập lại', [
            {
              text: 'Đã hiểu',
              onPress: () => console.log('Đã hiểu'),
              style: 'cancel',
            },
          ]);
        }
        Toast({title: 'Tạo phòng mới thất bại'});
        dispatch({
          type: CREATE_ROOM_BY_ID_BUILDING_FAILED,
          payload: error.response.data,
        });
      });
  };
