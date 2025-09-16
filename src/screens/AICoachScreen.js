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
import Icon from 'react-native-vector-icons/MaterialIcons';
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
          <Icon name={action.icon} size={24} color={action.color} />
        </View>
        <Text style={styles.quickActionText}>{action.title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const ExerciseItem = ({ item }) => (
    <View style={styles.exerciseItem}>
      <View style={[styles.exerciseCheckbox, item.completed && styles.exerciseCompleted]}>
        <Icon 
          name={item.completed ? "check" : "radio-button-unchecked"} 
          size={18} 
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
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }]}>
      {/* Modern Header */}
      <LinearGradient
        colors={[Colors.secondary, Colors.secondary + 'DD']}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <View style={styles.coachInfo}>
            <View style={styles.coachAvatarContainer}>
              <LinearGradient
                colors={['#FFFFFF', '#F8F9FA']}
                style={styles.avatarGradient}
              >
                <Icon name="psychology" size={28} color={Colors.secondary} />
              </LinearGradient>
            </View>
            <View style={styles.coachDetails}>
              <Text style={styles.coachName}>AI Coach</Text>
              <View style={styles.statusContainer}>
                <View style={styles.onlineIndicator} />
                <Text style={styles.coachStatus}>Online & Ready</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.menuButton}>
            <Icon name="more-vert" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <Surface style={styles.welcomeSection} elevation={4}>
          <LinearGradient
            colors={[Colors.primary + '10', Colors.primary + '05']}
            style={styles.welcomeGradient}
          >
            <View style={styles.welcomeContent}>
              <Text style={styles.welcomeTitle}>Ready to Level Up? 🚀</Text>
              <Text style={styles.welcomeSubtitle}>
                I'm your personal AI fitness coach, here to guide you to success
              </Text>
            </View>
          </LinearGradient>
        </Surface>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {[
              { title: 'Training Tips', icon: 'fitness-center', color: Colors.primary },
              { title: 'Nutrition', icon: 'restaurant', color: Colors.success },
              { title: 'Recovery', icon: 'self-improvement', color: Colors.accent },
              { title: 'Mental Training', icon: 'psychology', color: Colors.flexibility }
            ].map((action, index) => (
              <QuickActionCard key={index} action={action} />
            ))}
          </View>
        </View>

        {/* Training Plan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Training Plan</Text>
          <Surface style={styles.planCard} elevation={3}>
            <LinearGradient
              colors={[Colors.primary + '08', Colors.primary + '03']}
              style={styles.planGradient}
            >
              <View style={styles.planHeader}>
                <View style={styles.planInfo}>
                  <Text style={styles.planName}>{aiCoachData.currentPlan.name}</Text>
                  <Text style={styles.planWeek}>Week {aiCoachData.currentPlan.week} of 8</Text>
                </View>
                <View style={styles.planProgressContainer}>
                  <Text style={styles.progressPercentage}>{aiCoachData.currentPlan.progress}%</Text>
                  <View style={styles.circularProgress}>
                    <View style={[styles.progressCircle, { 
                      borderColor: Colors.primary,
                      transform: [{ rotate: `${(aiCoachData.currentPlan.progress / 100) * 360}deg` }]
                    }]} />
                  </View>
                </View>
              </View>
              
              <View style={styles.exercisesList}>
                {aiCoachData.currentPlan.exercises.map((exercise, index) => (
                  <ExerciseItem key={index} item={exercise} />
                ))}
              </View>
              
              <TouchableOpacity style={styles.viewPlanButton}>
                <LinearGradient
                  colors={[Colors.primary, Colors.primary + 'DD']}
                  style={styles.buttonGradient}
                >
                  <Icon name="fitness-center" size={20} color="#FFFFFF" />
                  <Text style={styles.buttonText}>View Full Plan</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </Surface>
        </View>

        {/* Nutrition Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nutrition Guidance</Text>
          
          {/* Nutrition Score Card */}
          <Surface style={styles.nutritionCard} elevation={3}>
            <LinearGradient
              colors={[Colors.success + '10', Colors.success + '05']}
              style={styles.nutritionGradient}
            >
              <View style={styles.nutritionHeader}>
                <View style={styles.nutritionInfo}>
                  <Text style={styles.nutritionTitle}>Daily Nutrition Score</Text>
                  <Text style={styles.nutritionSubtitle}>Keep up the great work!</Text>
                </View>
                <View style={styles.nutritionScoreContainer}>
                  <Text style={styles.scoreValue}>{aiCoachData.nutritionScore}</Text>
                  <Text style={styles.scoreLabel}>/ 100</Text>
                </View>
              </View>
              <View style={styles.progressBarContainer}>
                <ProgressBar 
                  progress={aiCoachData.nutritionScore / 100} 
                  color={Colors.success}
                  style={styles.nutritionProgressBar}
                />
              </View>
            </LinearGradient>
          </Surface>
          
          {/* Meal Suggestions */}
          <Text style={styles.subsectionTitle}>Recommended Meals</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.mealsContainer}
            contentContainerStyle={styles.mealsContent}
          >
            {aiCoachData.mealSuggestions.map((meal, index) => (
              <MealCard key={index} item={meal} />
            ))}
          </ScrollView>
        </View>

        {/* Chat Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chat with Coach</Text>
          <Surface style={styles.chatCard} elevation={3}>
            <View style={styles.chatContainer}>
              <FlatList
                data={chatHistory.slice(-4)} // Show only last 4 messages
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
              <TouchableOpacity style={styles.viewFullChatButton}>
                <Text style={styles.viewFullChatText}>View Full Conversation</Text>
                <Icon name="arrow-forward" size={16} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </Surface>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Modern Chat Input */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.chatInputContainer}
      >
        <Surface style={styles.inputSurface} elevation={4}>
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
            </View>
            <TouchableOpacity 
              style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
              onPress={sendMessage}
              disabled={!message.trim()}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={message.trim() ? [Colors.primary, Colors.primary + 'DD'] : [Colors.neutral90, Colors.neutral80]}
                style={styles.sendButtonGradient}
              >
                <Icon 
                  name="send" 
                  size={20} 
                  color={message.trim() ? "#FFFFFF" : Colors.neutral50} 
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Surface>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingTop: 12,
    paddingBottom: 20,
    paddingHorizontal: 20,
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
  coachAvatarContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    overflow: 'hidden',
    marginRight: 16,
  },
  avatarGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginRight: 6,
  },
  coachStatus: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginTop: -12,
  },
  welcomeSection: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'hidden',
  },
  welcomeGradient: {
    flex: 1,
  },
  welcomeContent: {
    padding: 24,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginTop: 20,
    marginBottom: 12,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 52) / 2,
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  quickActionGradient: {
    padding: 20,
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  planCard: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  planGradient: {
    padding: 24,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontSize: 20,
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
  circularProgress: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.neutral95,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: Colors.primary,
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
    width: 32,
    height: 32,
    borderRadius: 16,
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
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  viewPlanButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  nutritionCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 12,
  },
  nutritionGradient: {
    padding: 24,
  },
  nutritionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  nutritionInfo: {
    flex: 1,
  },
  nutritionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  nutritionSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  nutritionScoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.success,
  },
  scoreLabel: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginLeft: 2,
  },
  progressBarContainer: {
    marginTop: 8,
  },
  nutritionProgressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.neutral95,
  },
  mealsContainer: {
    marginTop: 8,
  },
  mealsContent: {
    paddingRight: 20,
  },
  mealCard: {
    width: 180,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  mealGradient: {
    padding: 20,
  },
  mealName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  mealStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealStat: {
    flex: 1,
    alignItems: 'center',
  },
  mealStatValue: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.success,
    marginBottom: 2,
  },
  mealStatLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  mealStatDivider: {
    width: 1,
    height: 24,
    backgroundColor: Colors.outline,
    marginHorizontal: 12,
  },
  chatCard: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  chatContainer: {
    padding: 16,
  },
  messagesList: {
    maxHeight: 240,
  },
  viewFullChatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.outline,
  },
  viewFullChatText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
    marginRight: 6,
  },
  chatInputContainer: {
    backgroundColor: 'transparent',
  },
  inputSurface: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 24,
    overflow: 'hidden',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: Colors.surfaceVariant,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
  },
  messageInput: {
    fontSize: 16,
    color: Colors.textPrimary,
    maxHeight: 80,
    lineHeight: 22,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
  },
  sendButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.6,
  },
  bottomSpacing: {
    height: 24,
  },
});