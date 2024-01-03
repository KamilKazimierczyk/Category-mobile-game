import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Button,
  Alert,
  TouchableHighlight,
} from 'react-native';
import alph from '../utils/alphabet';

export default function GameScreen({ navigation, route }) {
  const [timeLeft, setTimeLeft] = React.useState(route.params.time);
  const [currentPlayer, setCurrentPlayer] = React.useState(1);
  const [alphabet, setAlphabet] = React.useState(alph);
  const [points, setPoints] = React.useState(() => {
    const arr = new Array();
    for (let i = 0; i < route.params.players; i++) {
      arr.push(0);
    }
    return arr;
  });

  const playersColors = {
    1: 'green',
    2: 'blue',
    3: 'purple',
    4: 'red',
  };

  const handlePlayerChange = (point = false) => {
    if (point)
      setPoints((prev) => {
        const tmp = [...prev];
        tmp[currentPlayer - 1] = tmp[currentPlayer - 1] + 1;
        return tmp;
      });
    setCurrentPlayer((prev) =>
      prev === parseInt(route.params.players) ? 1 : prev + 1
    );
    setTimeLeft(route.params.time);
  };

  const handlePress = (key) => {
    setAlphabet((prev) => {
      let tmp = [...prev];
      tmp = tmp.filter((item) => item !== key);
      return tmp;
    });
    handlePlayerChange(true);
  };

  const endGameEarly = () => {
    setAlphabet([]);
  };

  React.useEffect(() => {
    let intervalId;
    if (alphabet.length) {
      intervalId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 0) {
            clearInterval(intervalId);
            handlePlayerChange();
            return 0;
          }

          return prev - 1;
        });
      }, 1000);
    } else {
      const winner = points.reduce((accumulator, currentValue) =>
        accumulator > currentValue ? accumulator : currentValue
      );
      const winnerIndex = points.indexOf(winner);
      Alert.alert('Game finished!', `The winner is Player ${winnerIndex + 1}`, [
        { text: 'Ok', onPress: () => navigation.navigate('Home') },
      ]);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.categoryWrapper}>
        <Text>Category:</Text>
        <Text style={styles.categoryName}>{route.params.categoryName}</Text>
      </View>
      <View style={styles.timeWrapper}>
        <Text style={styles.timeDesc}>Time left:</Text>
        <Text
          style={[styles.time, { color: timeLeft <= 10 ? 'red' : 'black' }]}
        >
          {timeLeft}
        </Text>
      </View>
      <View style={styles.lettersSection}>
        <Text style={styles.timeDesc}>Letters left:</Text>
        <View style={styles.lettersWrapper}>
          {alphabet.map((item) => (
            <TouchableHighlight
              onPress={() => {
                handlePress(item);
              }}
              style={styles.letterWrapper}
            >
              <Text style={styles.letter}>{item}</Text>
            </TouchableHighlight>
          ))}
        </View>
        <View style={{ padding: 10 }}>
          <Button title="End Game" color="#f4511e" onPress={endGameEarly} />
        </View>
      </View>
      <View
        style={[
          styles.playerWrapper,
          { backgroundColor: playersColors[currentPlayer] },
        ]}
      >
        <Text style={styles.player}>Player {currentPlayer}</Text>
      </View>
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
  categoryName: {
    fontWeight: '700',
    fontSize: 25,
    color: '#f4511e',
  },
  categoryWrapper: {
    alignItems: 'center',
    padding: 10,
  },
  timeWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeDesc: {
    fontSize: 20,
  },
  time: {
    fontWeight: 700,
    fontSize: 120,
  },
  lettersSection: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lettersWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    padding: 10,
    justifyContent: 'center',
  },
  letterWrapper: {
    backgroundColor: '#f4511e',
    padding: 5,
    width: 40,
    height: 40,
    color: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letter: {
    fontSize: 25,
    color: '#fff',
  },
  playerWrapper: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  player: {
    color: '#fff',
    fontWeight: 700,
  },
});
