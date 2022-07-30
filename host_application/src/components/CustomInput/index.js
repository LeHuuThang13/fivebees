import React from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import styles from './styles';

const CustomInput = props => {
  const {title, placeholder, value, onChangeText, ...prop} = props;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        onChangeText={value => {
          onChangeText;
        }}
        {...prop}
      />
    </View>
  );
};

export default CustomInput;
