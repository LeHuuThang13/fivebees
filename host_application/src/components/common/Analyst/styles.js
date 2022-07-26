import {StyleSheet} from 'react-native';
import colors from '../../../assets/themes/colors';

export default StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: colors.border_input,
    marginTop: 24,
    borderRadius: 10,
  },

  titleText: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: 'bold',
  },

  contentBlock: {
    marginTop: 10,
    paddingVertical: 10,
    borderBottomColor: colors.border_input,
    borderBottomWidth: 1,
    marginBottom: 10,
  },

  content: {
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: 16,
  },

  titleButton: {
    color: colors.secondary,
    fontSize: 14,
  },
});
