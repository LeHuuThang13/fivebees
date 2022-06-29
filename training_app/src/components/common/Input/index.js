import {View, Text, TextInput} from 'react-native';
import styles from './styles';
import React, {useState} from 'react';
import colors from '../../../assets/themes/colors';

const Input = ({
  onChangeText,
  icon,
  style,
  value,
  label,
  iconPosition,
  error,
  ...props
}) => {
  const [isForcused, setIsForcused] = useState(false);
  const getFlexDirection = () => {
    if (icon && iconPosition) {
      if (iconPosition === 'left') {
        return 'row';
      } else if (iconPosition === 'right') {
        return 'row-reverse';
      }
    }
  };

  const getBorderColor = () => {
    if (isForcused) {
      return colors.primary;
    } else if (error) {
      return colors.danger;
    } else {
      return colors.grey;
    }
  };

  return (
    <View style={styles.inputContainer}>
      {label && <Text>{label}</Text>}
      <View
        style={[
          styles.wrapper,
          {alignItems: icon ? 'center' : 'baseline'},
          {flexDirection: getFlexDirection(), borderColor: getBorderColor()},
        ]}>
        {icon && icon}
        <TextInput
          style={[styles.textInput, style]}
          onChangeText={onChangeText}
          value={value}
          onFocus={() => {
            setIsForcused(true);
          }}
          onBlur={() => {
            setIsForcused(false);
          }}
          {...props}
        />
      </View>

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default Input;
