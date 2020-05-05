import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../../utils/theme';

export default StyleSheet.create({
  clearNotificationBar: {
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: theme.backgroundColor,
  },
});
