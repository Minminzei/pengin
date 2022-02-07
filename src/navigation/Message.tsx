import * as React from 'react';
import Message from '../recoil/message';
import Toast from '../components/Toast';

export default function MessageComponent() {
  const { get, clear } = Message();
  const content = get();
  if (!content) {
    return null;
  }
  return (
    <Toast
      onClose={() => clear()}
      message={content.message}
    />
  );
}