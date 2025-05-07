import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';

export default function AddHabitScreen({ navigation }) {
  const defaultHabits = [
    'Work',
    'Fitness',
    'Reading',
    'Meditation',
    'Nature',
    'Cook',
    'Shopping',
    'Movies',
  ];

  const [habits, setHabits] = useState(defaultHabits);
  const [selected, setSelected] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [newHabit, setNewHabit] = useState('');

  const toggleSelect = (habit) => {
    if (selected.includes(habit)) {
      setSelected(selected.filter((h) => h !== habit));
    } else {
      setSelected([...selected, habit]);
    }
  };

  const addCustomHabit = () => {
    if (newHabit.trim() === '') return;
    if (habits.includes(newHabit)) {
      Alert.alert('Habit already exists');
      return;
    }
    setHabits([...habits, newHabit]);
    setNewHabit('');
    setShowInput(false);
  };

  const handleContinue = () => {
    console.log('Selected Habits:', selected);
    navigation.goBack(); // Replace with storage logic later
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What’s are your habits?</Text>

      <View style={styles.grid}>
        {habits.map((habit, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.habitButton,
              selected.includes(habit) && styles.habitButtonSelected,
            ]}
            onPress={() => toggleSelect(habit)}
          >
            <Text
              style={[
                styles.habitText,
                selected.includes(habit) && styles.habitTextSelected,
              ]}
            >
              {habit}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowInput(true)}
        >
          <Text style={styles.plus}>＋</Text>
        </TouchableOpacity>
      </View>

      {showInput && (
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="New habit"
            value={newHabit}
            onChangeText={setNewHabit}
          />
          <TouchableOpacity style={styles.saveButton} onPress={addCustomHabit}>
            <Text style={styles.saveButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  habitButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 10,
    marginRight: 10,
  },
  habitButtonSelected: {
    backgroundColor: '#000',
  },
  habitText: {
    color: '#000',
    fontWeight: '500',
  },
  habitTextSelected: {
    color: '#fff',
  },
  addButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus: {
    fontSize: 20,
    color: '#000',
  },
  inputRow: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#000',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  continueBtn: {
    marginTop: 'auto',
    backgroundColor: '#000',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  continueText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
