import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  Button,
} from 'react-native';

export default function TimerScreen({ navigation, route }) {
  const [time, setTime] = React.useState('30');

  return (
    <SafeAreaView style={styles.container}>
      <Text>Set time in seconds for every answer</Text>
      <TextInput
        style={styles.input}
        placeholder="Time for round"
        value={time}
        onChangeText={setTime}
        keyboardType="numeric"
      />
      <Button
        title="Play"
        disabled={!time.length}
        onPress={() => navigation.navigate('Game', { ...route.params, time })}
        color="#f4511e"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    width: '90%',
    borderRadius: 5,
    margin: 10,
  },
});
