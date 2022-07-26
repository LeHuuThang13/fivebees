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
  ...props
}) {
  return (
    <TouchableOpacity
      style={[styles.wrapper, {backgroundColor: colors.transparent}, styleBtn]}
      disabled={disabled}
      {...props}>
      <View style={[styles.loaderSection]}>
        {title && (
          <Text
            style={[
              {
                color: colors.secondary,
                paddingLeft: loading ? 5 : 0,
              },
            ]}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default index;
