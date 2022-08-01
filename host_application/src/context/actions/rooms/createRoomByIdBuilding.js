import {
  CREATE_BUILDING_LOADING,
  CREATE_BUILDING_FAILED,
  CREATE_BUILDING_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';
import {Toast} from '../../../components/Toast';

export default form => dispatch => localFileImage => onSuccess => {
  const requestPayload = {
    room_number: form.room_number || '',
    status: form.status || '',
    description: form.description || '',
    building_id: building_id,
    filenames: localFileImage.path || '',
  };

  dispatch({
    type: CREATE_BUILDING_LOADING,
  });
  axiosInstance
    .post('buildings', requestPayload)
    .then(res => {
      dispatch({
        type: CREATE_BUILDING_SUCCESS,
        payload: res.data.data,
      });
      Toast({title: 'Tạo tòa nhà mới thành công'});
      onSuccess();
    })
    .catch(error => {
      console.log('error creating buliding', error.response.data);
      dispatch({
        type: CREATE_BUILDING_FAILED,
        payload: error.response.data,
      });
    });
};
