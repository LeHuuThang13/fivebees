import {ToastAndroid} from 'react-native';

export const Toast = props => {
  const {title} = props;
  ToastAndroid.show(title, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
};
