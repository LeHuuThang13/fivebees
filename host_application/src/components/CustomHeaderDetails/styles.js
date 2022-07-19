import {StyleSheet} from 'react-native';
import colors from '../../assets/themes/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomColor: colors.border_input,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },

  textContentHeader: {
    fontSize: 15,
    fontWeight: '600',
  },
});

export default styles;
