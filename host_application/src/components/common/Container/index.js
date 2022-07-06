import {View, Text, ScrollView, Dimensions} from 'react-native';
import React from 'react';
import styles from './styles';

const Container = ({style, children}) => {
  const HEIGHT_FULLSCREEN = Dimensions.get('screen').height;
  return (
    <ScrollView>
      <View style={[styles.wrapper, style]}>{children}</View>
    </ScrollView>
  );
};

export default Container;
