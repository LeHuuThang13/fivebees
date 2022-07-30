import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import colors from '../../assets/themes/colors';
import styles from './styles';

function index({
  title,
  primary,
  secondary,
  danger,
  disabled,
  loading,
  noneBg,
  styleBtn,
  error,
  ...props
}) {
  const getBgColor = () => {
    if (disabled) {
      return colors.grey;
    } else if (primary) {
      return colors.primary;
    } else if (danger) {
      return colors.danger;
    } else if (secondary) {
      return colors.secondary;
    }
  };

  const textCenterBtn = () => {
    if (noneBg) {
      return 'flex-end';
    } else {
      return 'space-evenly';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.wrapper,
        {backgroundColor: getBgColor(), justifyContent: textCenterBtn()},
        styleBtn,
      ]}
      disabled={disabled}
      {...props}>
      <View style={[styles.loaderSection]}>
        {loading && (
          <ActivityIndicator color={primary ? colors.black : colors.black} />
        )}
        {title && (
          <Text
            style={[
              {
                color: disabled ? colors.black : colors.white,
                paddingLeft: loading ? 5 : 0,
              },
            ]}>
            {loading ? 'Vui lòng chờ đợi ...' : title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default index;
