import {StyleSheet} from 'react-native';
import colors from '../../assets/themes/colors';

export default StyleSheet.create({
  container: {
    marginTop: 24,
  },

  title: {
    fontSize: 16,
  },

  textInput: {
    paddingBottom: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.border_input,
    paddingTop: 2,
    fontSize: 16,
  },
});
