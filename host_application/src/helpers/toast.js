import {DeviceEventEmitter} from 'react-native';
import {SHOW_TOAST_MESSAGE} from '../constants/toastNames';

const toast = {
  info: options => {
    DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, {...options, types: 'info'});
  },
  success: options => {
    DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, {...options, types: 'success'});
  },
  danger: options => {
    DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, {...options, types: 'danger'});
  },
};

export default toast;
