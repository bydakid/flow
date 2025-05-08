import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Switch,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const moodIcons = ['😞', '🙁', '😐', '🙂', '😄'];

export default function TodayScreen({ navigation }) {
  const [name, setName] = useState('');
  const [habits, setHabits] = useState([
    { title: 'Fitness', done: false },
    { title: 'Reading', done: true },
    { title: 'Meditation', done: false },
  ]);

  const [moodStats, setMoodStats] = useState([0, 10, 5, 0, 85]);

  useEffect(() => {
    const loadHabits = async () => {
      const stored = await AsyncStorage.getItem('userHabits');
      if (stored) {
        setHabits(JSON.parse(stored).map((title) => ({ title, done: false })));
      }
    };

    const loadName = async () => {
      const storedName = await AsyncStorage.getItem('userName');
      if (storedName) setName(storedName);
    };

    loadName();
    loadHabits();
  }, []);

  const toggleHabit = (index) => {
    const updated = [...habits];
    updated[index].done = !updated[index].done;
    setHabits(updated);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hey, {name}</Text>
        <TouchableOpacity
          style={styles.profileCircle}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.profileIcon}>👤</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Mood')}
        >
          <Text style={styles.cardText}>Mood{'\n'}Check-In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('AddHabit')}
        >
          <Text style={styles.cardText}>Add{'\n'}Habit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today’s Mood</Text>
        <View style={styles.moodRow}>
          {moodStats.map((percent, i) => (
            <View style={styles.moodItem}>
              <Text style={styles.moodEmoji}>{moodIcons[i]}</Text>
              <Text>{percent}%</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today’s Habit</Text>
        {habits.map((habit, i) => (
          <View key={i} style={styles.habitRow}>
            <Text style={styles.habitText}>{habit.title}</Text>
            <TouchableOpacity
              style={[styles.circle, habit.done && styles.circleFilled]}
              onPress={() => toggleHabit(i)}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileCircle: {
    backgroundColor: '#f3f2f2',
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    color: '#fff',
    fontSize: 20,
  },

  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  card: {
    flex: 1,
    backgroundColor: '#f3f2f2',
    borderRadius: 20,
    padding: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },

  section: {
    backgroundColor: '#f3f2f2',
    padding: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  sectionTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 10 },

  moodRow: { flexDirection: 'row', justifyContent: 'space-between' },
  moodItem: { alignItems: 'center' },
  moodEmoji: { fontSize: 24 },

  habitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },
  habitText: { fontSize: 16 },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderColor: '#000',
    borderWidth: 1,
  },
  circleFilled: {
    backgroundColor: '#000',
  },
});
