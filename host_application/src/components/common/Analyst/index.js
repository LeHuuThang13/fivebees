import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

const AnalystContainer = props => {
  const {title, content, titleNavigation} = props;
  return (
    <View style={styles.container}>
      <View style={styles.titleBlock}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.contentBlock}>
        <Text style={styles.content}>{content}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          console.log('heelow');
        }}>
        <Text>{titleNavigation}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AnalystContainer;
