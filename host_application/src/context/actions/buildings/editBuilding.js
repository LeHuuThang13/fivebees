import {
  EDIT_BUILDING_LOADING,
  EDIT_BUILDING_SUCCESS,
  EDIT_BUILDING_FAILED,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';
import {Toast} from '../../../components/Toast';

export default form => dispatch => props => onSuccess => {
  const {localFile, buildingId} = props;

  const requestPayload = {
    name: form.name || '',
    email: form.email || '',
    address: form.address || '',
    hotline: form.hotline || '',
    filenames: localFile || '',
  };

  dispatch({
    type: EDIT_BUILDING_LOADING,
  });
  axiosInstance
    .put(`buildings/${buildingId}`, requestPayload)
    .then(res => {
      dispatch({
        type: EDIT_BUILDING_SUCCESS,
        payload: res.data.data,
      });
      Toast({title: 'Cập nhập thiết bị mới thành công'});
      onSuccess();
    })
    .catch(error => {
      console.log('error creating facility', error.response.data);
      dispatch({
        type: EDIT_BUILDING_FAILED,
        payload: error.response.data,
      });
    });
};
