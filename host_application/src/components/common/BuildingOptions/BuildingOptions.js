import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import colors from '../../../assets/themes/colors';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const BuildingOptions = props => {
  const option = props.buildings.map((item, index) => {
    return (
      <TouchableOpacity
        style={styles.option}
        key={index}
        onPress={() => onPressItem(item)}>
        <Text style={styles.text}>{item.name}</Text>
      </TouchableOpacity>
    );
  });

  const onPressItem = option => {
    props.changeModelVisible(false);
    props.setData(option);
  };

  return (
    <View style={styles.bgContainer}>
      <TouchableOpacity
        onPress={() => props.changeModelVisible(false)}
        style={styles.container}>
        <View
          style={[
            styles.modal,
            {
              width: WIDTH - 20,
              height: HEIGHT / 2,
            },
          ]}>
          <ScrollView>{option}</ScrollView>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BuildingOptions;

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg_modal,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modal: {
    backgroundColor: colors.white,
  },

  option: {
    alignItems: 'flex-start',
  },

  text: {
    margin: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
