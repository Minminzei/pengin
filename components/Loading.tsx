import * as React from 'react';
import {
  View, StyleSheet, ActivityIndicator,
} from 'react-native';
import Color from '../constants/Colors';

const Css = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  masking: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

interface Props {
  size: 'small' | 'large' | number;
  color?: string;
  mask?: boolean;
  maskColor?: string;
}

function LoadingWithMask(params: {
  maskColor: string;
  size: 'small' | 'large' | number;
  color: string;
}) : JSX.Element {
  return (
    <View
      style={[
        Css.masking,
        {
          backgroundColor: params.maskColor,
        },
      ]}
    >
      <ActivityIndicator
        size={params.size}
        color={params.color}
      />
    </View>
  );
}

function LoadingWithoutMask(params: {
  size: 'small' | 'large' | number;
  color: string;
}) {
  return (
    <View style={Css.loading}>
      <ActivityIndicator
        size={params.size}
        color={params.color}
      />
    </View>
  );
}

export default function Loading(props:Props) : JSX.Element {
  if (props.mask) {
    return LoadingWithMask({
      maskColor: props.maskColor || Color.white2,
      size: props.size,
      color: props.color || Color.blue1,
    });
  }
  return LoadingWithoutMask({
    size: props.size,
    color: props.color || Color.blue1,
  });
}