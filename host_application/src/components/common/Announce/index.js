import {Alert} from 'react-native';
import React from 'react';

export default (title, string) => {
  Alert.alert(title, string, [
    {
      text: 'Đã hiểu',
      onPress: () => console.log('Đã hiểu'),
      style: 'cancel',
    },
  ]);
};
