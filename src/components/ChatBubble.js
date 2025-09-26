import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Surface, Avatar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../theme/colors';
import { colorWithOpacity } from '../utils/colorUtils';

export const ChatBubble = ({ 
  message, 
  sender, 
  timestamp, 
  isUser = false,
  style 
}) => {
  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.coachContainer, style]}>
      {!isUser && (
        <View style={styles.avatarContainer}>
          <LinearGradient
            colors={[Colors.secondary, colorWithOpacity(Colors.secondary, 'DD')]}
            style={styles.avatarGradient}
          >
            <Icon name="psychology" size={18} color="#FFFFFF" />
          </LinearGradient>
        </View>
      )}
      
      <View style={[styles.bubbleContainer, isUser ? styles.userBubbleContainer : styles.coachBubbleContainer]}>
        {isUser ? (
          <LinearGradient
            colors={[Colors.primary, colorWithOpacity(Colors.primary, 'DD')]}
            style={[styles.bubble, styles.userBubble]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={[styles.message, styles.userMessage]}>
              {message}
            </Text>
          </LinearGradient>
        ) : (
          <Surface style={[styles.bubble, styles.coachBubble]} elevation={2}>
            <Text style={[styles.message, styles.coachMessage]}>
              {message}
            </Text>
          </Surface>
        )}
        
        {timestamp && (
          <Text style={[
            styles.timestamp, 
            isUser ? styles.userTimestamp : styles.coachTimestamp
          ]}>
            {timestamp}
          </Text>
        )}
      </View>
      
      {isUser && (
        <View style={styles.avatarContainer}>
          <LinearGradient
            colors={[Colors.primary, colorWithOpacity(Colors.primary, 'DD')]}
            style={styles.avatarGradient}
          >
            <Icon name="person" size={18} color="#FFFFFF" />
          </LinearGradient>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'flex-end',
    paddingHorizontal: 16,
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  coachContainer: {
    justifyContent: 'flex-start',
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  avatarGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubbleContainer: {
    maxWidth: '70%',
  },
  userBubbleContainer: {
    alignItems: 'flex-end',
  },
  coachBubbleContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  userBubble: {
    borderBottomRightRadius: 6,
  },
  coachBubble: {
    backgroundColor: Colors.surface,
    borderBottomLeftRadius: 6,
    borderWidth: 1,
    borderColor: Colors.outline,
  },
  message: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400',
  },
  userMessage: {
    color: '#FFFFFF',
  },
  coachMessage: {
    color: Colors.textPrimary,
  },
  timestamp: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: '500',
  },
  userTimestamp: {
    color: Colors.textTertiary,
    textAlign: 'right',
  },
  coachTimestamp: {
    color: Colors.textTertiary,
    textAlign: 'left',
  },
});