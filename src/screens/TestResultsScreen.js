import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { 
  Appbar, 
  Card, 
  Button, 
  Surface
} from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../theme/colors';

const { width } = Dimensions.get('window');

export default function TestResultsScreen({ navigation, route }) {
  const { testId, results } = route.params || {};
  
  // Enhanced mock data for better demonstration
  const testResults = {
    score: results?.score || 28,
    form: results?.form || 87,
    duration: '2:45',
    calories: 45,
    improvement: '+12%',
    testName: 'Push-up Test',
    category: 'Strength',
    previousBest: 25,
    targetScore: 35
  };

  const insights = [
    {
      icon: 'trending-up',
      title: 'Great Improvement!',
      description: `You improved by ${testResults.improvement} from your last test`,
      color: Colors.success
    },
    {
      icon: 'star',
      title: 'Excellent Form',
      description: `Your form score of ${testResults.form}% shows great technique`,
      color: Colors.warning
    },
    {
      icon: 'local-fire-department',
      title: 'Calories Burned',
      description: `You burned approximately ${testResults.calories} calories`,
      color: Colors.accent
    }
  ];

  const recommendations = [
    'Focus on controlled movements for better form',
    'Try to increase rest time between sets',
    'Consider adding variations to target different muscles',
    'Maintain consistent breathing throughout the exercise'
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }]}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Test Results" titleStyle={styles.headerTitle} />
        <Appbar.Action icon="share" onPress={() => {}} />
        <Appbar.Action icon="bookmark-outline" onPress={() => {}} />
      </Appbar.Header>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Main Results Card */}
        <Surface style={styles.resultCard} elevation={4}>
          <LinearGradient
            colors={[Colors.primary + '10', Colors.primary + '05']}
            style={styles.resultGradient}
          >
            <View style={styles.resultContent}>
              <View style={styles.celebrationSection}>
                <View style={styles.trophyContainer}>
                  <MaterialIcons name="emoji-events" size={48} color={Colors.warning} />
                </View>
                <Text style={styles.celebrationTitle}>Excellent Performance!</Text>
                <Text style={styles.testTitle}>{testResults.testName}</Text>
              </View>
              
              <View style={styles.scoreDisplay}>
                <Text style={styles.mainScore}>{testResults.score}</Text>
                <Text style={styles.scoreUnit}>reps completed</Text>
              </View>
              
              <View style={styles.metricsGrid}>
                <View style={styles.metricCard}>
                  <MaterialIcons name="fitness-center" size={20} color={Colors.primary} />
                  <Text style={styles.metricValue}>{testResults.form}%</Text>
                  <Text style={styles.metricLabel}>Form Score</Text>
                </View>
                <View style={styles.metricCard}>
                  <MaterialIcons name="timer" size={20} color={Colors.accent} />
                  <Text style={styles.metricValue}>{testResults.duration}</Text>
                  <Text style={styles.metricLabel}>Duration</Text>
                </View>
                <View style={styles.metricCard}>
                  <MaterialIcons name="local-fire-department" size={20} color={Colors.warning} />
                  <Text style={styles.metricValue}>{testResults.calories}</Text>
                  <Text style={styles.metricLabel}>Calories</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Surface>

        {/* Progress Comparison */}
        <Surface style={styles.progressCard} elevation={2}>
          <View style={styles.progressContent}>
            <Text style={styles.cardTitle}>Progress Comparison</Text>
            <View style={styles.comparisonGrid}>
              <View style={styles.comparisonItem}>
                <Text style={styles.comparisonLabel}>Previous Best</Text>
                <Text style={styles.comparisonValue}>{testResults.previousBest}</Text>
              </View>
              <View style={styles.comparisonArrow}>
                <MaterialIcons name="arrow-forward" size={24} color={Colors.success} />
                <Text style={[styles.improvementText, { color: Colors.success }]}>
                  {testResults.improvement}
                </Text>
              </View>
              <View style={styles.comparisonItem}>
                <Text style={styles.comparisonLabel}>Today's Score</Text>
                <Text style={[styles.comparisonValue, { color: Colors.primary }]}>
                  {testResults.score}
                </Text>
              </View>
            </View>
            <View style={styles.targetProgress}>
              <Text style={styles.targetLabel}>Target: {testResults.targetScore} reps</Text>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { 
                  width: `${(testResults.score / testResults.targetScore) * 100}%` 
                }]} />
              </View>
              <Text style={styles.progressText}>
                {Math.round((testResults.score / testResults.targetScore) * 100)}% of target achieved
              </Text>
            </View>
          </View>
        </Surface>

        {/* Insights */}
        <Surface style={styles.insightsCard} elevation={2}>
          <View style={styles.insightsContent}>
            <Text style={styles.cardTitle}>Performance Insights</Text>
            {insights.map((insight, index) => (
              <View key={index} style={styles.insightItem}>
                <View style={[styles.insightIcon, { backgroundColor: insight.color + '20' }]}>
                  <MaterialIcons name={insight.icon} size={20} color={insight.color} />
                </View>
                <View style={styles.insightText}>
                  <Text style={styles.insightTitle}>{insight.title}</Text>
                  <Text style={styles.insightDescription}>{insight.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </Surface>

        {/* Recommendations */}
        <Surface style={styles.recommendationsCard} elevation={2}>
          <View style={styles.recommendationsContent}>
            <Text style={styles.cardTitle}>Recommendations</Text>
            {recommendations.map((recommendation, index) => (
              <View key={index} style={styles.recommendationItem}>
                <MaterialIcons name="lightbulb-outline" size={16} color={Colors.warning} />
                <Text style={styles.recommendationText}>{recommendation}</Text>
              </View>
            ))}
          </View>
        </Surface>
        
        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button 
            mode="outlined" 
            style={styles.actionButton}
            onPress={() => navigation.goBack()}
          >
            Retake Test
          </Button>
          <Button 
            mode="contained" 
            style={styles.actionButton} 
            onPress={() => navigation.navigate('MainTabs')}
          >
            Continue
          </Button>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: { 
    backgroundColor: Colors.surface, 
    elevation: 0 
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: Colors.onSurface 
  },
  content: { 
    flex: 1, 
    backgroundColor: Colors.background, 
    padding: 16 
  },
  resultCard: { 
    backgroundColor: Colors.surface, 
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16
  },
  resultGradient: {
    flex: 1,
  },
  resultContent: { 
    padding: 24, 
    alignItems: 'center' 
  },
  celebrationSection: { 
    alignItems: 'center', 
    marginBottom: 24 
  },
  trophyContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.warning + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  celebrationTitle: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: Colors.success, 
    marginBottom: 4
  },
  testTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  scoreDisplay: {
    alignItems: 'center',
    marginBottom: 24,
  },
  mainScore: { 
    fontSize: 64, 
    fontWeight: '800', 
    color: Colors.primary 
  },
  scoreUnit: { 
    fontSize: 14, 
    color: Colors.textSecondary, 
    fontWeight: '600' 
  },
  metricsGrid: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    width: '100%' 
  },
  metricCard: { 
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    minWidth: 80,
  },
  metricValue: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: Colors.textPrimary,
    marginTop: 4,
  },
  metricLabel: { 
    fontSize: 11, 
    color: Colors.textSecondary, 
    marginTop: 2,
    fontWeight: '600'
  },
  progressCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    marginBottom: 16,
  },
  progressContent: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  comparisonGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  comparisonItem: {
    alignItems: 'center',
    flex: 1,
  },
  comparisonLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginBottom: 4,
  },
  comparisonValue: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  comparisonArrow: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  improvementText: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  targetProgress: {
    alignItems: 'center',
  },
  targetLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: Colors.neutral95,
    borderRadius: 4,
    marginBottom: 4,
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  insightsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    marginBottom: 16,
  },
  insightsContent: {
    padding: 20,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  insightText: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  insightDescription: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  recommendationsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    marginBottom: 20,
  },
  recommendationsContent: {
    padding: 20,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  recommendationText: {
    flex: 1,
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginLeft: 8,
  },
  actionButtons: { 
    flexDirection: 'row', 
    gap: 12 
  },
  actionButton: { 
    flex: 1, 
    borderRadius: 24 
  },
  bottomSpacing: {
    height: 20,
  },
});