import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';

const moodOptions = ['😞', '🙁', '😐', '🙂', '😄'];

export default function MoodScreen({ navigation }) {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');

  const handleSave = async () => {
    if (selectedMood === null) {
      Alert.alert('Please select a mood');
      return;
    }

    const todayKey = 'mood:' + format(new Date(), 'yyyy-MM-dd');
    const moodIcon = moodOptions[selectedMood];

    try {
      const existing = await AsyncStorage.getItem(todayKey);
      let moodArray = [];

      if (existing) {
        const parsed = JSON.parse(existing);
        moodArray = Array.isArray(parsed) ? parsed : [];
      }

      moodArray.push(moodIcon);

      await AsyncStorage.setItem(todayKey, JSON.stringify(moodArray));
      navigation.navigate('Today');
    } catch (e) {
      console.error('Error saving mood:', e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>How are you feeling?</Text>
          <View style={styles.moodRow}>
            {moodOptions.map((emoji, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.emojiBox,
                  selectedMood === index && styles.selectedEmoji,
                ]}
                onPress={() => setSelectedMood(index)}
              >
                <Text style={styles.emoji}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Mood</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 40,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 30,
  },
  emojiBox: {
    flex: 1,
    marginHorizontal: 4,
    marginVertical: 8,
    borderRadius: 50,
    backgroundColor: '#f2f2f2',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 60,
    minWidth: 40,
  },

  selectedEmoji: {
    backgroundColor: '#000',
  },
  emoji: {
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    height: 100,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
