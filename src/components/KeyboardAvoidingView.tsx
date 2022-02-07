import React from 'react';
import {
  KeyboardAvoidingView, KeyboardAvoidingViewProps,
  Platform, ScrollView, StyleSheet, StatusBar, ViewStyle,
} from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';

export default function KeyboardAvoidingViewUi(props: {
  style?: ViewStyle | ViewStyle[];
  children: JSX.Element;
}) : JSX.Element {

  function keyboradProps() : KeyboardAvoidingViewProps {
    switch (Platform.OS) {
      case 'ios':
        return {
          style: props.style,
          behavior: 'padding',
          keyboardVerticalOffset: isIphoneX() ? 120 : 20,
        };
      case 'android':
        return {
          style: props.style,
          behavior: 'height',
          keyboardVerticalOffset: StatusBar.currentHeight,
        };
      default:
      return {
        style: props.style,
      };
    }
  }
  return (
    <KeyboardAvoidingView {...keyboradProps()}>
      <ScrollView style={styles.containar}>
        {props.children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  containar: {
    height: '100%',
    width: '100%',
  },
});