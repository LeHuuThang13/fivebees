import React, {useState} from 'react';
import {TextInput, View, Text} from 'react-native';
import colors from '../../../assets/themes/colors';
import styles from './styles';

function index({
  onChangeText,
  icon,
  logo,
  style,
  value,
  iconPosition,
  error,
  label,
  ...props
}) {
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

  return (
    <View style={styles.inputContainer}>
      <View style={[styles.wrapper, {borderColor: getBorderColor()}]}>
        <View>
          <Text style={styles.label}>{label}</Text>
        </View>
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
}

export default index;
