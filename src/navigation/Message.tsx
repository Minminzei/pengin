import * as React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import message from '@lib/message';
import Toast from '@components/Toast';
import Message from '@components/Message';
import Color from '@constants/Colors';

export default function MessageComponent() {
  const { get, clear } = message();
  const content = get();
  if (!content) {
    return null;
  }
  if (content.type === 'error') {
    return (
      <View style={styles.container}>
        <View style={styles.message}>
          <Message
            message={content.message}
            onClose={() => clear()}
          />
        </View>
        <TouchableWithoutFeedback
          onPress={() => clear()}
        >
          <View style={styles.layer} />
        </TouchableWithoutFeedback>
      </View>
    );
  }
  return (
    <Toast
      onClose={() => clear()}
      message={content.message}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  layer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: Color.black3,
    top: 0,
    left: 0,
    zIndex: -1,
  },
  message: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});