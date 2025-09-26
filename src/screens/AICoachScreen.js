import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from 'react-native';
import { 
  Card, 
  Button,
  Avatar,
  Surface,
  ProgressBar
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChatBubble } from '../components';
import { Colors } from '../theme/colors';
import { aiCoachData } from '../data/mockData';

const { width } = Dimensions.get('window');

export default function AICoachScreen({ navigation }) {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState(aiCoachData.chatHistory);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: chatHistory.length + 1,
        sender: 'user',
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour12: false, 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };
      setChatHistory([...chatHistory, newMessage]);
      setMessage('');
      
      setTimeout(() => {
        const coachResponse = {
          id: chatHistory.length + 2,
          sender: 'coach',
          message: 'Thanks for your question! Let me help you with that. Keep up the great work!',
          timestamp: new Date().toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit' 
          })
        };
        setChatHistory(prev => [...prev, coachResponse]);
      }, 1000);
    }
  };

  const QuickActionCard = ({ action }) => (
    <TouchableOpacity style={styles.quickActionCard} activeOpacity={0.8}>
      <LinearGradient
        colors={[action.color + '15', action.color + '05']}
        style={styles.quickActionGradient}
      >
        <View style={[styles.quickActionIcon, { backgroundColor: action.color + '20' }]}>
          <MaterialIcons name={action.icon} size={20} color={action.color} />
        </View>
        <Text style={styles.quickActionText}>{action.title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const ExerciseItem = ({ item }) => (
    <View style={styles.exerciseItem}>
      <View style={[styles.exerciseCheckbox, item.completed && styles.exerciseCompleted]}>
        <MaterialIcons 
          name={item.completed ? "check" : "radio-button-unchecked"} 
          size={16} 
          color={item.completed ? Colors.onPrimary : Colors.neutral60} 
        />
      </View>
      <View style={styles.exerciseInfo}>
        <Text style={[styles.exerciseName, item.completed && styles.completedExercise]}>
          {item.name}
        </Text>
        <Text style={styles.exerciseDetails}>
          {item.sets ? `${item.sets} sets × ${item.reps} reps` : item.duration}
        </Text>
      </View>
    </View>
  );

  const MealCard = ({ item }) => (
    <Surface style={styles.mealCard} elevation={3}>
      <LinearGradient
        colors={[Colors.success + '10', Colors.success + '05']}
        style={styles.mealGradient}
      >
        <Text style={styles.mealName}>{item.name}</Text>
        <View style={styles.mealStats}>
          <View style={styles.mealStat}>
            <Text style={styles.mealStatValue}>{item.calories}</Text>
            <Text style={styles.mealStatLabel}>calories</Text>
          </View>
          <View style={styles.mealStatDivider} />
          <View style={styles.mealStat}>
            <Text style={styles.mealStatValue}>{item.protein}g</Text>
            <Text style={styles.mealStatLabel}>protein</Text>
          </View>
        </View>
      </LinearGradient>
    </Surface>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }]} edges={['left', 'right']}>
      {/* Modern Header with Gradient */}
      <LinearGradient
        colors={[Colors.primary, Colors.primary + 'E6']}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <View style={styles.coachInfo}>
            <View style={styles.coachAvatar}>
              <MaterialIcons name="psychology" size={28} color="#FFFFFF" />
            </View>
            <View style={styles.coachDetails}>
              <Text style={styles.coachName}>AI Coach</Text>
              <View style={styles.statusContainer}>
                <View style={styles.onlineIndicator} />
                <Text style={styles.coachStatus}>Online & Ready</Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}
      >
        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Welcome Message */}
          <Surface style={styles.welcomeSection} elevation={2}>
            <LinearGradient
              colors={[Colors.primary + '08', Colors.primary + '04']}
              style={styles.welcomeGradient}
            >
              <Text style={styles.welcomeTitle}>Ready to Level Up? 🚀</Text>
              <Text style={styles.welcomeSubtitle}>
                I'm here to guide you to success
              </Text>
            </LinearGradient>
          </Surface>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActionsGrid}>
              <TouchableOpacity style={styles.quickActionCard}>
                <LinearGradient
                  colors={[Colors.primary + '15', Colors.primary + '08']}
                  style={styles.quickActionGradient}
                >
                  <MaterialIcons name="fitness-center" size={24} color={Colors.primary} />
                  <Text style={styles.quickActionText}>Training Tips</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.quickActionCard}>
                <LinearGradient
                  colors={[Colors.success + '15', Colors.success + '08']}
                  style={styles.quickActionGradient}
                >
                  <MaterialIcons name="restaurant" size={24} color={Colors.success} />
                  <Text style={styles.quickActionText}>Nutrition</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* Current Training Plan */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Current Training Plan</Text>
            <Surface style={styles.planCard} elevation={3}>
              <LinearGradient
                colors={[Colors.primary + '05', Colors.primary + '02']}
                style={styles.planGradient}
              >
                <View style={styles.planHeader}>
                  <View style={styles.planInfo}>
                    <Text style={styles.planName}>{aiCoachData.currentPlan.name}</Text>
                    <Text style={styles.planWeek}>Week {aiCoachData.currentPlan.week} of 8</Text>
                  </View>
                  <View style={styles.planProgressContainer}>
                    <Text style={styles.progressPercentage}>{aiCoachData.currentPlan.progress}%</Text>
                    <View style={styles.progressCircle}>
                      <View style={[styles.progressArc, { 
                        borderColor: Colors.primary,
                        transform: [{ rotate: `${(aiCoachData.currentPlan.progress / 100) * 360}deg` }]
                      }]} />
                    </View>
                  </View>
                </View>
                
                <View style={styles.exercisesList}>
                  {aiCoachData.currentPlan.exercises.slice(0, 3).map((exercise, index) => (
                    <ExerciseItem key={index} item={exercise} />
                  ))}
                </View>
                
                <TouchableOpacity style={styles.viewPlanButton}>
                  <LinearGradient
                    colors={[Colors.primary, Colors.primary + 'DD']}
                    style={styles.viewPlanGradient}
                  >
                    <MaterialIcons name="fitness-center" size={18} color="#FFFFFF" />
                    <Text style={styles.viewPlanButtonText}>View Full Plan</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </LinearGradient>
            </Surface>
          </View>

          {/* Chat Input Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ask Your Coach</Text>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 1)']}
              style={styles.inputGradientWrapper}
            >
              <Surface style={styles.inputSurface} elevation={8}>
                <View style={styles.inputRow}>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.messageInput}
                      placeholder="Ask me anything about fitness..."
                      placeholderTextColor={Colors.neutral60}
                      value={message}
                      onChangeText={setMessage}
                      multiline
                      maxLength={500}
                    />
                    {message.length > 400 && (
                      <Text style={styles.characterCount}>{message.length}/500</Text>
                    )}
                  </View>
                  
                  <TouchableOpacity 
                    style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
                    onPress={sendMessage}
                    disabled={!message.trim()}
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      colors={message.trim() 
                        ? [Colors.primary, Colors.primary + 'E6', Colors.primary + 'CC'] 
                        : [Colors.neutral90, Colors.neutral85]}
                      style={styles.sendButtonGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <MaterialIcons 
                        name="send" 
                        size={20} 
                        color={message.trim() ? "#FFFFFF" : Colors.neutral50} 
                      />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </Surface>
            </LinearGradient>
          </View>

          {/* Recent Chat Messages */}
          {/* {chatHistory.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Conversation</Text>
              <Surface style={styles.chatCard} elevation={3}>
                <View style={styles.chatContainer}>
                  <FlatList
                    data={chatHistory.slice(-3)} // Show only last 3 messages
                    renderItem={({ item }) => (
                      <ChatBubble
                        message={item.message}
                        sender={item.sender}
                        timestamp={item.timestamp}
                        isUser={item.sender === 'user'}
                      />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    style={styles.messagesList}
                    scrollEnabled={false}
                  />
                </View>
              </Surface>
            </View>
          )} */}

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  headerGradient: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    paddingTop: 60,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coachInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coachAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  coachDetails: {
    flex: 1,
  },
  coachName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4AFF4A',
    marginRight: 8,
  },
  coachStatus: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  welcomeSection: {
    marginHorizontal: 24,
    marginTop: 20,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  welcomeGradient: {
    paddingHorizontal: 24,
    paddingVertical: 28,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  section: {
    marginBottom: 28,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 16,
    overflow: 'hidden',
  },
  quickActionGradient: {
    padding: 20,
    alignItems: 'center',
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginTop: 8,
    textAlign: 'center',
  },
  planCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  planGradient: {
    padding: 24,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  planWeek: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  planProgressContainer: {
    alignItems: 'center',
  },
  progressPercentage: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.primary,
    marginBottom: 8,
  },
  progressCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.neutral95,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressArc: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: Colors.primary,
    borderStyle: 'solid',
  },
  exercisesList: {
    marginBottom: 20,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  exerciseCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.neutral95,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  exerciseCompleted: {
    backgroundColor: Colors.primary,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  completedExercise: {
    textDecorationLine: 'line-through',
    color: Colors.textTertiary,
  },
  exerciseDetails: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  viewPlanButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  viewPlanGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  viewPlanButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  chatCard: {
    borderRadius: 16,
    backgroundColor: Colors.surface,
  },
  chatContainer: {
    padding: 20,
  },
  messagesList: {
    maxHeight: 200,
  },
  inputGradientWrapper: {
    paddingVertical: 12,
    borderRadius: 20,
  },
  inputSurface: {
    borderRadius: 20,
    backgroundColor: Colors.surface,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 8,
    paddingHorizontal: 12,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: Colors.surfaceVariant,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    minHeight: 48,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.outline + '30',
  },
  messageInput: {
    fontSize: 15,
    color: Colors.textPrimary,
    maxHeight: 100,
    lineHeight: 22,
    fontWeight: '500',
  },
  characterCount: {
    fontSize: 11,
    color: Colors.neutral60,
    textAlign: 'right',
    marginTop: 4,
    fontWeight: '500',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  sendButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
    shadowOpacity: 0.1,
  },
  bottomSpacing: {
    height: 40,
  },
});