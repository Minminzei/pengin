/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import { RootStackParamList } from '../../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [],
  config: {
    screens: {
      Root: {
        screens: {
          Users: {
            screens: {
              UsersScreen: 'users',
            },
          },
          Profile: {
            screens: {
              EventsScreen: 'profile',
            },
          },
        },
      },
      User: {
        path: 'users/:id',
        parse: {
          id:  Number,
        },
      },
      ProfileEdit: {
        path: 'profileEdit',
      },
      NotFound: '*',
    },
  },
};

export default linking;
