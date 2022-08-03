import {
  CREATE_FACILITY_LOADING,
  CREATE_FACILITY_FAILED,
  CREATE_FACILITY_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';
import {Toast} from '../../../components/Toast';

export default form => dispatch => params => onSuccess => {
  const {code, localFileImage} = params;

  const requestPayload = {
    name: form.name || '',
    description: form.description || '',
    code: code || '',
    filenames: localFileImage.path || '',
    hotline: form.hotline || '',
    email: form.email || '',
  };

  dispatch({
    type: CREATE_FACILITY_LOADING,
  });
  axiosInstance
    .post('buildings', requestPayload)
    .then(res => {
      dispatch({
        type: CREATE_FACILITY_SUCCESS,
        payload: res.data.data,
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
