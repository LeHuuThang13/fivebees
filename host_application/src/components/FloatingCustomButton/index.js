import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {FloatingLabelInput} from 'react-native-floating-label-input';

const FloatingCustomButton = props => {
  const [phone, setPhone] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={{padding: 50, flex: 1, backgroundColor: '#fff'}}>
      <FloatingLabelInput
        label="Phone"
        value={phone}
        staticLabel={isFocused}
        hintTextColor={'#aaa'}
        containerStyles={{
          borderWidth: 2,
          paddingHorizontal: 10,
          backgroundColor: '#fff',
          borderColor: 'blue',
          borderRadius: 8,
        }}
        customLabelStyles={{
          colorFocused: 'red',
          fontSizeFocused: 12,
        }}
        labelStyles={{
          backgroundColor: '#fff',
          paddingHorizontal: 5,
        }}
        onChangeText={value => {
          setPhone(value);
        }}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
      />
    </View>
  );
};

export default FloatingCustomButton;
