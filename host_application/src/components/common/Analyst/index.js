import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

const AnalystContainer = props => {
  const {title, content, titleNavigation, onPress} = props;
  return (
    <View style={styles.container}>
      <View style={styles.titleBlock}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.contentBlock}>
        <Text style={styles.content}>{content}</Text>
      </View>
      <TouchableOpacity onPress={() => onPress()}>
        <Text style={styles.titleButton}>{titleNavigation}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AnalystContainer;
