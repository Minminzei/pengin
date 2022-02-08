import * as React from 'react';
import {
  StackActions, NavigationContainerRef,
} from '@react-navigation/native';
import { RouteName, initialRouteName } from './types';

interface Params {
  id?: number;
  screen?: RouteName;
}

export const navigationRef: React.RefObject<NavigationContainerRef<any>> = React.createRef();

export async function replace(screen: RouteName, params?:Params) : Promise<void> {
  try {
    if (!navigationRef.current) {
      return;
    }
    navigationRef.current.dispatch(StackActions.replace(screen, params));
  } catch (e) {
    throw e;
  }
};

export async function goRoot() : Promise<void> {
  try {
    if (!navigationRef.current) {
      return;
    }
    navigationRef.current.dispatch(StackActions.replace(initialRouteName));
  } catch (e) {
    throw e;
  }
};

export async function navigate(screen: RouteName, params?:Params) : Promise<void>{
  try {
    if (!navigationRef.current) {
      return;
    }
    const { dispatch } = navigationRef.current;
    dispatch(StackActions.push(screen, params));
  } catch (e) {
    throw e;
  }
};

export async function goBack(): Promise<void> {
  try {
    if (!navigationRef.current) {
      return;
    }
    if (navigationRef.current.canGoBack()) {
      navigationRef.current.goBack();
      return;
    }
    navigationRef.current.dispatch(StackActions.replace(initialRouteName));
  } catch (e) {
    throw e;
  }
};