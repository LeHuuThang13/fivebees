import React, {useState} from 'react';
import {TextInput, View, Text} from 'react-native';
import colors from '../../../assets/themes/colors';
import styles from './styles';

const index = ({
  onChangeText,
  icon,
  logo,
  style,
  value,
  iconPosition,
  error,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getBorderColor = () => {
    if (isFocused) {
      return colors.primary;
    } else if (error) {
      return colors.danger;
    } else {
      return colors.border_input;
    }
  };

  console.log('icon', icon);
  console.log('logo', logo);

  return (
    <View style={styles.inputContainer}>
      <View style={[styles.wrapper, {borderColor: getBorderColor()}]}>
        <View>{logo && <Text style={styles.logoSgv}>{logo}</Text>}</View>

        <TextInput
          style={[styles.textInput, style]}
          onChangeText={onChangeText}
          value={value}
          {...props}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
        />
        <View>{icon && <Text>{icon}</Text>}</View>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default index;
