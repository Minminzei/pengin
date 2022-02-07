import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  StyleSheet, Animated, TouchableOpacity,
} from 'react-native';
import { Text, View } from './Themed';
import Color from '../constants/Colors';
import Icons from '../constants/Icons';

const initialBottom = -200;

interface Props {
  onClose: Function;
  message: string;
}

export default function Toast(props:Props) : JSX.Element {
  const [bottom] = useState<Animated.Value>(new Animated.Value(initialBottom));
  function close() : void {
    const animate = Animated.timing(bottom, {
      toValue: initialBottom,
      duration: 100,
      useNativeDriver: false,
    });
    animate.start(() => {
      props.onClose();
      animate.stop();
    });
  }
  React.useEffect(() => {
    const timerId = setTimeout(() => close(), 4000);
    const animate = Animated.timing(bottom, {
      toValue: 30,
      duration: 150,
      useNativeDriver: false,
    });
    animate.start(() => animate.stop());
    return () => clearTimeout(timerId);
  }, []);
  return (
    <Animated.View
      style={[
        styles.animated,
        { bottom },
      ]}
    >
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <Text style={styles.text}>{props.message}</Text>
          <TouchableOpacity
            style={styles.close}
            onPress={close}
          >
            <MaterialCommunityIcons name={Icons.close} color={Color.white1} size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  animated: {
    position: 'absolute',
    left: 0,
    width: '100%',
    zIndex: 999,
  },
  wrapper: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent',
  },
  content: {
    width: '100%',
    height: 44,
    position: 'relative',
    backgroundColor: Color.black2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  close: {
    top: 0,
    right: 0,
    position: 'absolute',
    width: 40,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Color.white1,
    lineHeight: 44,
  },
});