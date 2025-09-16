import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Surface, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../theme/colors';

export const TestCard = ({ test, onPress, onStartTest, style }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return Colors.success;
      case 'medium': return Colors.warning;
      case 'hard': return Colors.error;
      default: return Colors.neutral50;
    }
  };

  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'strength': return Colors.strength;
      case 'endurance': return Colors.endurance;
      case 'agility': return Colors.agility;
      case 'flexibility': return Colors.flexibility;
      default: return Colors.primary;
    }
  };

  const categoryColor = getCategoryColor(test.category);
  const difficultyColor = getDifficultyColor(test.difficulty);

  return (
    <Surface style={[styles.card, style]} elevation={3}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <LinearGradient
          colors={[categoryColor + '08', categoryColor + '03', 'transparent']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={[styles.iconContainer, { backgroundColor: categoryColor + '20' }]}>
                <Icon 
                  name={test.icon || 'fitness-center'} 
                  size={26} 
                  color={categoryColor} 
                />
              </View>
              <View style={styles.headerInfo}>
                <Text style={styles.testName}>{test.name}</Text>
                <Text style={styles.category}>{test.category}</Text>
              </View>
              <View style={[styles.difficultyBadge, { backgroundColor: difficultyColor + '20' }]}>
                <Text style={[styles.difficultyText, { color: difficultyColor }]}>
                  {test.difficulty}
                </Text>
              </View>
            </View>
            
            <Text style={styles.description} numberOfLines={2}>
              {test.description}
            </Text>
            
            <View style={styles.details}>
              <View style={styles.detailItem}>
                <Icon name="schedule" size={16} color={Colors.textSecondary} />
                <Text style={styles.detailText}>{test.estimatedTime}</Text>
              </View>
              {test.lastScore && (
                <View style={styles.scoreContainer}>
                  <Text style={styles.scoreLabel}>Last: </Text>
                  <Text style={styles.scoreValue}>{test.lastScore}</Text>
                </View>
              )}
            </View>
            
            <TouchableOpacity 
              style={[styles.startButton, { backgroundColor: categoryColor }]} 
              onPress={onStartTest}
              activeOpacity={0.8}
            >
              <Icon name="play-arrow" size={20} color="#FFFFFF" />
              <Text style={styles.startButtonText}>Start Test</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Surface>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  testName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  category: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginLeft: 6,
    fontWeight: '500',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  scoreLabel: {
    fontSize: 12,
    color: Colors.onPrimaryContainer,
    fontWeight: '500',
  },
  scoreValue: {
    fontSize: 14,
    color: Colors.onPrimaryContainer,
    fontWeight: '700',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  startButtonText: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '700',
    marginLeft: 8,
  },
});