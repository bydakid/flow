import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { useEffect } from 'react';
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

export default function TrendsScreen({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [moodCounts, setMoodCounts] = useState([]);
  const [completedHabits, setCompletedHabits] = useState([]);

  const loadDayData = async (selected) => {
    const dateKey = format(selected, 'yyyy-MM-dd');

    const storedMood = await AsyncStorage.getItem(`mood:${dateKey}`);
    if (storedMood) {
      const moodArray = JSON.parse(storedMood);
      const counts = moodIcons.map((icon) => {
        const count = moodArray.filter((m) => m === icon).length;
        const percent = ((count / moodArray.length) * 100).toFixed(0);
        return percent;
      });
      setMoodCounts(counts);
    } else {
      setMoodCounts(new Array(moodIcons.length).fill(0));
    }

    const storedHabits = await AsyncStorage.getItem(`habits:${dateKey}`);
    setCompletedHabits(storedHabits ? JSON.parse(storedHabits) : []);
  };

  const handleDateChange = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      setShowPicker(false);
      return;
    }

    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
    loadDayData(currentDate);
  };

  useEffect(() => {
    loadDayData(date);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
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

        <View style={styles.box}>
          <Text style={styles.boxTitle}>Today’s Mood</Text>
          <View style={styles.moodRow}>
            {moodIcons.map((emoji, i) => (
              <View key={i} style={styles.moodCol}>
                <Text style={styles.emoji}>{emoji}</Text>
                <Text style={styles.percent}>{moodCounts[i] || 0}%</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.box}>
          <Text style={styles.boxTitle}>Today’s Habit</Text>
          {completedHabits.length > 0 ? (
            completedHabits.map((habit, i) => (
              <View key={i} style={styles.habitRow}>
                <Text>{habit}</Text>
                <View style={styles.circleFilled} />
              </View>
            ))
          ) : (
            <Text style={styles.habitRow}>No habits completed</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
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
    marginTop: 30,
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
