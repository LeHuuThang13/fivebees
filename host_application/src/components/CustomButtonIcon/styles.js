import {StyleSheet} from 'react-native';
import colors from '../../assets/themes/colors';

export default StyleSheet.create({
  wrapper: {
    height: 42,
    paddingHorizontal: 16,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  inputContainer: {
    paddingVertical: 14,
  },

  textInput: {
    flex: 1,
    width: '100%',
  },

  loaderSection: {
    flexDirection: 'row',
  },

  error: {
    color: colors.danger,
    paddingTop: 4,
    fontSize: 14,
  },
});
