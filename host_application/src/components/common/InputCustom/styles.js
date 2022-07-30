import {StyleSheet} from 'react-native';
import colors from '../../../assets/themes/colors';

export default StyleSheet.create({
  wrapper: {
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },

  inputContainer: {
    paddingVertical: 14,
  },

  textInput: {
    flex: 1,
    width: '100%',
  },

  error: {
    color: colors.danger,
    paddingTop: 4,
    fontSize: 14,
  },

  logoSgv: {
    justifyContent: 'flex-start',
    marginRight: 10,
  },
});
