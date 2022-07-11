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

  body: {
    flex: 1,
  },
});

export default styles;
