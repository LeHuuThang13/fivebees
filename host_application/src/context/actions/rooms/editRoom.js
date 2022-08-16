import {
  CREATE_ROOM_BY_ID_BUILDING_FAILED,
  CREATE_ROOM_BY_ID_BUILDING_SUCCESS,
  CREATE_ROOM_BY_ID_BUILDING_LOADING,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';
import {Toast} from '../../../components/Toast';

export default form =>
  dispatch =>
  localFileImage =>
  idBuilding =>
  idRoom =>
  onSuccess => {
    const requestPayload = {
      room_number: form.room_number || '',
      status: form.status || '',
      description: form.description || '',
      building_id: idBuilding,
      filenames: localFileImage.path || 'lksajklfjaksldf.png',
    };

    dispatch({
      type: CREATE_ROOM_BY_ID_BUILDING_LOADING,
    });
    axiosInstance
      .put(`rooms/${idRoom}`, requestPayload)
      .then(res => {
        dispatch({
          type: CREATE_ROOM_BY_ID_BUILDING_SUCCESS,
          payload: res.data.data,
        });
        Toast({title: 'Tạo tòa nhà mới thành công'});
        onSuccess();
      })
      .catch(error => {
        console.log('error creating buliding', error.response.data);
        dispatch({
          type: CREATE_ROOM_BY_ID_BUILDING_FAILED,
          payload: error.response.data,
        });
      });
  };
