/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

let linking: LinkingOptions;
export default linking = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        initialRouteName: 'Home',
        screens: {
          Home: '',
          NewEmployee: 'new-employee',
          RegisterAttendance: 'register-attendance',
          Settings: 'settings',
        },
      },
      NotFound: '*',
    },
  },
};
