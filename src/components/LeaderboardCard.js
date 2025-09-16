import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Avatar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';

export const LeaderboardCard = ({ user, onPress }) => {
  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return 'looks-one';
      case 2: return 'looks-two';
      case 3: return 'looks-3';
      default: return null;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return '#FFD700'; // Gold
      case 2: return '#C0C0C0'; // Silver
      case 3: return '#CD7F32'; // Bronze
      default: return Colors.neutral50;
    }
  };

  return (
    <Card 
      style={[
        styles.card, 
        user.isCurrentUser && styles.currentUserCard
      ]} 
      onPress={onPress}
    >
      <Card.Content style={styles.content}>
        <View style={styles.rankContainer}>
          {user.rank <= 3 ? (
            <MaterialIcons 
              name={getRankIcon(user.rank)} 
              size={32} 
              color={getRankColor(user.rank)} 
            />
          ) : (
            <View style={styles.rankNumber}>
              <Text style={styles.rankText}>#{user.rank}</Text>
            </View>
          )}
        </View>
        
        <Avatar.Image 
          size={48} 
          source={{ uri: user.avatar }} 
          style={styles.avatar}
        />
        
        <View style={styles.userInfo}>
          <Text style={[styles.userName, user.isCurrentUser && styles.currentUserName]}>
            {user.name}
          </Text>
          <Text style={styles.location}>{user.location}</Text>
        </View>
        
        <View style={styles.scoreContainer}>
          <Text style={[styles.score, user.isCurrentUser && styles.currentUserScore]}>
            {user.totalScore}
          </Text>
          <Text style={styles.scoreLabel}>points</Text>
        </View>
        
        {user.isCurrentUser && (
          <View style={styles.currentUserIndicator}>
            <MaterialIcons name="person" size={16} color={Colors.primary} />
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 8,
    backgroundColor: Colors.surface,
    elevation: 1,
  },
  currentUserCard: {
    backgroundColor: Colors.primaryContainer,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: 12,
  },
  rankNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.neutral90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.neutral50,
  },
  avatar: {
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.onSurface,
    marginBottom: 2,
  },
  currentUserName: {
    color: Colors.primary,
  },
  location: {
    fontSize: 14,
    color: Colors.neutral50,
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  score: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  currentUserScore: {
    color: Colors.primary,
  },
  scoreLabel: {
    fontSize: 12,
    color: Colors.neutral50,
  },
  currentUserIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: Colors.primary + '20',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});