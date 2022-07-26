import React from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import styles from './styles';

const CustomInput = props => {
  const {title, placeholder, value} = props;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        value={value ? value.toString() : ''}
      />
    </View>
  );
};

export default CustomInput;
