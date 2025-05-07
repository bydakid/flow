import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

const moodIcons = ['😞', '🙁', '😐', '🙂', '😄'];

const dayData = [
  { day: 'Fri', date: 2, mood: 0 },
  { day: 'Sat', date: 3, mood: 1 },
  { day: 'Sun', date: 4, mood: 2 },
  { day: 'Mon', date: 5, mood: 3 },
  { day: 'Tue', date: 6, mood: 4 },
];

export default function TrendsScreen({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      setShowPicker(false);
      return;
    }

    const currentDate = selectedDate || date;
    setShowPicker(false); // Always close after selection
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      {/* Top Row */}
      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.dateBtn}
          onPress={() => setShowPicker(true)}
        >
          <Text style={styles.dateText}>{date.toDateString()}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profileCircle}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.profileIcon}>👤</Text>
        </TouchableOpacity>
      </View>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* Calendar Row */}
      <View style={styles.calendarRow}>
        {dayData.map((item, index) => (
          <View
            key={index}
            style={[styles.dayBox, index === 2 && styles.activeDay]}
          >
            <Text style={[styles.dayMood, index === 2 && styles.activeText]}>
              {moodIcons[item.mood]}
            </Text>
            <Text style={[styles.dayText, index === 2 && styles.activeText]}>
              {item.day}
            </Text>
            <Text style={[styles.dateNum, index === 2 && styles.activeText]}>
              {item.date}
            </Text>
          </View>
        ))}
      </View>

      {/* Mood Stats */}
      <View style={styles.box}>
        <Text style={styles.boxTitle}>Today’s Mood</Text>
        <View style={styles.moodRow}>
          {moodIcons.map((emoji, i) => (
            <View key={i} style={styles.moodCol}>
              <Text style={styles.emoji}>{emoji}</Text>
              <Text style={styles.percent}>
                {['0%', '10%', '5%', '0%', '85%'][i]}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Habit Stats */}
      <View style={styles.box}>
        <Text style={styles.boxTitle}>Today’s Habit</Text>
        {['Fitness', 'Reading', 'Meditation'].map((habit, i) => (
          <View key={i} style={styles.habitRow}>
            <Text>{habit}</Text>
            <View style={[styles.circle, i === 1 && styles.circleFilled]} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateBtn: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  dateText: {
    fontSize: 14,
  },
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  dayBox: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 30,
    paddingVertical: 12,
    flex: 1,
    marginHorizontal: 2,
    height: 120,
  },
  activeDay: {
    backgroundColor: '#000',
  },
  activeText: {
    color: '#fff',
  },
  dayMood: {
    fontSize: 20,
    color: '#000',
  },
  dayText: {
    fontSize: 12,
    color: '#000',
  },
  dateNum: {
    fontWeight: 'bold',
    color: '#000',
  },
  box: {
    backgroundColor: '#f4f2f2',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
  },
  boxTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 16,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodCol: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 24,
  },
  percent: {
    fontSize: 12,
    marginTop: 4,
  },
  habitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  circle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#000',
  },
  circleFilled: {
    backgroundColor: '#000',
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
});
