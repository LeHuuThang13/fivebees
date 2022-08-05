import {
  CREATE_BUILDING_FAILED,
  CREATE_BUILDING_LOADING,
  CREATE_BUILDING_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';
import {Toast} from '../../../components/Toast';

export default form => dispatch => localFileImage => onSuccess => {
  const requestPayload = {
    name: form.name || '',
    email: form.email || '',
    address: form.address || '',
    hotline: form.hotline || '',
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
      Toast({title: 'Tạo thiết bị mới thành công'});
      onSuccess();
    })
    .catch(error => {
      console.log('error creating facility', error.response.data);
      dispatch({
        type: CREATE_BUILDING_FAILED,
        payload: error.response.data,
      });
    });
};
