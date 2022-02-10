import { StyleSheet } from 'react-native';
import { Text, View } from '@components/Themed';
import Color from '@constants/Colors';
import Font from '@constants/Font';
import { Card, Button } from 'react-native-elements';

interface Props {
  onClose: () => void;
  message: string;
}

export default function Message(props:Props) : JSX.Element {
  return (
    <Card>
      <View style={styles.card}>
        <View>
          <Text>{props.message}</Text>
        </View>
        <View style={styles.button}>
          <Button
            title="閉じる"
            onPress={props.onClose}
            buttonStyle={styles.close}
            titleStyle={styles.text}
          />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    width: 300,
  },
  button: {
    marginTop: 16,
  },
  close: {
    width: 100,
    height: 24,
    backgroundColor: Color.primary,
  },
  text: {
    ...Font.sm,
  },
});