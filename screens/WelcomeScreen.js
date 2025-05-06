import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

export default function WelcomeScreen({ navigation }) {
  const handleStart = () => {
    navigation.navigate('Name'); // or replace with 'Login'
  };

  return (
    <View style={styles.container}>
      <View style={styles.centerBox}>
        <Text style={styles.logo}>flow</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  centerBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 60,
    fontWeight: 'bold',
    textTransform: 'lowercase',
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
