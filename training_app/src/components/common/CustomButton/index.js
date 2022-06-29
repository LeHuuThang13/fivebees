import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import styles from './styles';
import React from 'react';
import colors from '../../../assets/themes/colors';

const CustomButton = ({
  title,
  secondary,
  primary,
  danger,
  disabled,
  loading,
  onPress,
}) => {
  const getBgColor = () => {
    if (disabled) {
      return colors.grey;
    } else if (primary) {
      return colors.primary;
    } else if (secondary) {
      return colors.secondary;
    } else if (danger) {
      return colors.danger;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.wrapper, {backgroundColor: getBgColor()}]}
      onPress={onPress}>
      <View style={[styles.loaderSection]}>
        {loading && (
          <ActivityIndicator
            color={primary ? colors.secondary : colors.primary}
          />
        )}
        {title && (
          <Text
            style={{
              color: disabled ? 'black' : 'white',
              paddingLeft: loading ? 5 : 0,
            }}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
