import React from 'react';
import { StyleSheet, Text, Button, SafeAreaView } from 'react-native';

export default function HomePage({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Simple Category Game</Text>
      <Button
        title="Start"
        onPress={() => navigation.navigate('Stage 1/3')}
        style={styles.button}
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
  button: {
    margin: 50,
  },
});
