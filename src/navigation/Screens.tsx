import * as React from 'react';
import { RootStackParamList, RootTabParamList } from './types';
import Icons from '@constants/Icons';
import UsersScreen from '@screens/UsersScreen';
import UserScreen from '@screens/UserScreen';
import ProfileScreen from '@screens/ProfileScreen';
import ProfileEditScreen from '@screens/ProfileEditScreen';

export type RouteName = keyof RootStackParamList | keyof RootTabParamList;

type OptionProps = {
  title: string;
  headerShown?: boolean;
  tabBarLabel?: string;
};

type BaseProps = {
  component: React.ComponentType<any>;
  options?: OptionProps;
};

type GlobalMenuConfig = { page: keyof RootTabParamList; } & BaseProps;
type MenuConfig = { page: keyof RootStackParamList; } & BaseProps;

export const GlobalMenuScreens: GlobalMenuConfig[] = [
  {
    page: 'Users',
    component: UsersScreen,
    options: {
      title: 'ユーザー',
      tabBarLabel: Icons.people,
      headerShown: false,
    },
  },
  {
    page: 'Profile',
    component: ProfileScreen,
    options: {
      title: 'プロフィール',
      tabBarLabel: Icons.setting,
      headerShown: false,
    },
  },
];

export const DetailScreens: MenuConfig[] = [
  {
    page: 'User',
    component: UserScreen,
    options: {
      title: 'ホーム',
    },
  },
];

export const ModalScreens: MenuConfig[] = [
  {
    page: 'ProfileEdit',
    component: ProfileEditScreen,
    options: {
      title: 'プロフィール編集',
    },
  },
];
