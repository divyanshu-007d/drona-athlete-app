import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';

export const AchievementBadge = ({ achievement, size = 'medium', onPress }) => {
  const getSize = () => {
    switch (size) {
      case 'small': return { container: 60, icon: 20, text: 10 };
      case 'large': return { container: 80, icon: 32, text: 12 };
      default: return { container: 70, icon: 24, text: 11 };
    }
  };

  const sizeConfig = getSize();

  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { 
          width: sizeConfig.container, 
          height: sizeConfig.container,
          backgroundColor: achievement.earned ? Colors.primaryContainer : Colors.neutral95,
          borderColor: achievement.earned ? Colors.primary : Colors.neutral80,
        }
      ]} 
      onPress={onPress}
    >
      <MaterialIcons 
        name={achievement.icon} 
        size={sizeConfig.icon} 
        color={achievement.earned ? Colors.primary : Colors.neutral60} 
      />
      <Text 
        style={[
          styles.badgeName, 
          { 
            fontSize: sizeConfig.text,
            color: achievement.earned ? Colors.onPrimaryContainer : Colors.neutral60 
          }
        ]}
        numberOfLines={2}
      >
        {achievement.name}
      </Text>
      {achievement.earned && (
        <View style={styles.earnedIndicator}>
          <MaterialIcons name="check" size={12} color={Colors.success} />
        </View>
      )}
      {!achievement.earned && achievement.progress && (
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {achievement.progress}/{achievement.requirement}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    margin: 4,
    position: 'relative',
  },
  badgeName: {
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 12,
  },
  earnedIndicator: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: Colors.success,
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    position: 'absolute',
    bottom: 2,
    backgroundColor: Colors.warning,
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  progressText: {
    fontSize: 8,
    color: Colors.onPrimary,
    fontWeight: '600',
  },
});