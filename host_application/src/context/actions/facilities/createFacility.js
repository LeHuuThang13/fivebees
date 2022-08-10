import {
  CREATE_FACILITY_LOADING,
  CREATE_FACILITY_FAILED,
  CREATE_FACILITY_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';
import {Toast} from '../../../components/Toast';

export default form => dispatch => params => onSuccess => {
  const {category, localFile, idRoom, room, status} = params;

  const STATUS_DEFAULT = 1;

  let requestPayload;

  if (idRoom) {
    console.log('Co id room');
    requestPayload = {
      name: form.name || '',
      description: form.description || '',
      category_id: category,
      filenames: localFile.path || '',
      status_id: STATUS_DEFAULT,
      room_id: idRoom,
    };
  } else if (status && room && category) {
    console.log('Khong co id room');
    requestPayload = {
      name: form.name || '',
      description: form.description || '',
      category_id: category,
      filenames: localFile.path || '',
      status_id: status,
      room_id: room,
    };
  }

  console.log(requestPayload);

  dispatch({
    type: CREATE_FACILITY_LOADING,
  });
  axiosInstance
    .post('facilities', requestPayload)
    .then(res => {
      const result = [res.data.data.facilities];
      dispatch({
        type: CREATE_FACILITY_SUCCESS,
        payload: result,
      });
      Toast({title: 'Tạo thiết bị mới thành công'});
      onSuccess();
    })
    .catch(error => {
      console.log('error creating buliding', error.response.data);
      dispatch({
        type: CREATE_FACILITY_FAILED,
        payload: error.response.data,
      });
    });
};
