import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';

export const StreakCounter = ({ streak }) => {
  return (
    <View style={styles.container}>
      <View style={styles.fireContainer}>
        <MaterialIcons name="whatshot" size={32} color="#FF5722" />
        {streak > 0 && (
          <View style={styles.streakBadge}>
            <Text style={styles.streakNumber}>{streak}</Text>
          </View>
        )}
      </View>
      <Text style={styles.streakLabel}>Day Streak</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  fireContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  streakBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF5722',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.surface,
  },
  streakNumber: {
    color: Colors.onPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  streakLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.neutral50,
  },
});