import React, {useEffect, useState} from 'react';
import {ToastAndroid, Text, View} from 'react-native';
import colors from '../../assets/themes/colors';
import {SHOW_TOAST_MESSAGE} from '../../constants/toastNames';

export const Toast = props => {
  const {title} = props;
  ToastAndroid.show(title, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
};
