import {View, ScrollView, Dimensions} from 'react-native';
import React from 'react';
import styles from './styles';

const Container = ({style, children}) => {
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={[styles.wrapper, style, {}]}>{children}</View>
      </ScrollView>
    </View>
  );
};

export default Container;
