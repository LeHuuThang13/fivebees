import {View, ScrollView, Dimensions} from 'react-native';
import React from 'react';
import styles from './styles';

const ContainerFullScreens = ({style, children}) => {
  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={{paddingHorizontal: 15}}>
        {children}
      </ScrollView>
    </View>
  );
};

export default ContainerFullScreens;
