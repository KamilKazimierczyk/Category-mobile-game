import React from 'react';
import { StyleSheet, Text, Button, SafeAreaView, View } from 'react-native';
import { RadioButton } from 'react-native-paper';

export default function PlayersCountScreen({ navigation, route }) {
  const [players, setPlayers] = React.useState('2');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.margin}>Choose Number Of players:</Text>
      <RadioButton.Group
        onValueChange={(newValue) => setPlayers(newValue)}
        value={players}
      >
        <RadioButton.Item label="2 Players" value="2" color="#f4511e" />
        <RadioButton.Item label="3 Players" value="3" color="#f4511e" />
        <RadioButton.Item label="4 Players" value="4" color="#f4511e" />
      </RadioButton.Group>
      <Button
        title="Go next"
        onPress={() =>
          navigation.navigate('Stage 3/3', { ...route.params, players })
        }
        style={styles.margin}
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
  margin: {
    margin: 10,
  },
});
