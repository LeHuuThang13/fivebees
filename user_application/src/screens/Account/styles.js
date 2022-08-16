import {StyleSheet} from 'react-native';
import colors from '../../assets/themes/colors';

export default StyleSheet.create({
  imageWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  image: {
    width: 200,
    height: 200,
    backgroundColor: colors.secondary,
    borderRadius: 500,
  },

  bodyWrapper: {
    marginTop: 30,
  },

  contentWrapper: {
    borderBottomColor: colors.secondary,
    borderBottomWidth: 1,
    marginBottom: 30,
  },

  content: {
    fontSize: 20,
  },
});
