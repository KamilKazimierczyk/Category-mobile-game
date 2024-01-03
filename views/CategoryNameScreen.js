import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  Button,
} from 'react-native';

export default function CategoryNameScreen({ navigation }) {
  const [categoryName, setCategoryName] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Text>Provide name of Category for the next game</Text>
      <TextInput
        style={styles.input}
        placeholder="Category Name"
        value={categoryName}
        onChangeText={setCategoryName}
      />
      <Button
        title="Go next"
        disabled={!categoryName.length}
        onPress={() => navigation.navigate('Stage 2/3', { categoryName })}
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
