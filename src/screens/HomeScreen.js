import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { Card, Avatar, IconButton, Surface } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { athleteProfile } from '../data/mockData';
import { Colors } from '../theme/colors';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

const HomeScreen = ({ navigation }) => {
  const theme = useTheme();

  const StatCard = ({ title, value, change, color, icon }) => (
    <Surface style={styles.statCard} elevation={3}>
      <LinearGradient
        colors={[color + '15', color + '05']}
        style={styles.statCardGradient}
      >
        <View style={styles.statCardContent}>
          <View style={[styles.statIconContainer, { backgroundColor: color + '20' }]}>
            <Icon name={icon} size={22} color={color} />
          </View>
          <View style={styles.statInfo}>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statTitle}>{title}</Text>
            {change && (
              <View style={styles.changeContainer}>
                <Icon 
                  name={change > 0 ? "trending-up" : "trending-down"} 
                  size={14} 
                  color={change > 0 ? Colors.success : Colors.error} 
                />
                <Text style={[styles.statChange, { 
                  color: change > 0 ? Colors.success : Colors.error 
                }]}>
                  {Math.abs(change)}%
                </Text>
              </View>
            )}
          </View>
        </View>
      </LinearGradient>
    </Surface>
  );

  const AchievementBadge = ({ achievement }) => (
    <TouchableOpacity style={styles.achievementBadge}>
      <View style={[
        styles.badgeIconContainer,
        { 
          backgroundColor: achievement.earned ? Colors.primary : Colors.neutral90,
          borderColor: achievement.earned ? Colors.primary : Colors.neutral80,
        }
      ]}>
        <Icon 
          name={achievement.icon} 
          size={18} 
          color={achievement.earned ? Colors.onPrimary : Colors.neutral60} 
        />
      </View>
      <Text style={[styles.badgeTitle, { 
        color: achievement.earned ? Colors.textPrimary : Colors.textTertiary 
      }]}>
        {achievement.name}
      </Text>
    </TouchableOpacity>
  );

  const ActivityCard = ({ activity, index }) => (
    <Surface style={[styles.activityCard, { marginTop: index > 0 ? 12 : 0 }]} elevation={2}>
      <View style={styles.activityContent}>
        <View style={[styles.activityIcon, { backgroundColor: Colors.primaryContainer }]}>
          <Icon name="fitness-center" size={18} color={Colors.primary} />
        </View>
        <View style={styles.activityInfo}>
          <Text style={styles.activityTitle}>{activity.test}</Text>
          <Text style={styles.activityDate}>{activity.date} • {activity.time}</Text>
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>{activity.score}</Text>
          <Text style={styles.scoreLabel}>reps</Text>
        </View>
      </View>
    </Surface>
  );

  const QuickActionCard = ({ icon, title, color, onPress }) => (
    <TouchableOpacity style={styles.quickActionCard} onPress={onPress}>
      <LinearGradient
        colors={[color, color + 'DD']}
        style={styles.quickActionGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Icon name={icon} size={26} color="#FFFFFF" />
        <Text style={styles.quickActionText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={true}>
        {/* Modern Header with Gradient */}
        <LinearGradient
          colors={['#0066FF', '#004CCC', '#0033AA']}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerTop}>
              <View style={styles.welcomeSection}>
                <Text style={styles.welcomeText}>Good morning!</Text>
                <Text style={styles.nameText}>{athleteProfile.name}</Text>
                <Text style={styles.motivationText}>Ready for today's workout?</Text>
              </View>
              <View style={styles.headerActions}>
                <TouchableOpacity style={styles.notificationButton}>
                  <Icon name="notifications-none" size={22} color="#FFFFFF" />
                  <View style={styles.notificationDot} />
                </TouchableOpacity>
                <Avatar.Image
                  size={44}
                  source={{ uri: athleteProfile.avatar }}
                  style={styles.avatar}
                />
              </View>
            </View>
            
            {/* Header Stats Bar */}
            <View style={styles.headerStats}>
              <View style={styles.headerStatItem}>
                <Text style={styles.headerStatValue}>{athleteProfile.testsCompleted}</Text>
                <Text style={styles.headerStatLabel}>Tests</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.headerStatItem}>
                <Text style={styles.headerStatValue}>{athleteProfile.recentScore}%</Text>
                <Text style={styles.headerStatLabel}>Best Score</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.headerStatItem}>
                <Text style={styles.headerStatValue}>#{athleteProfile.rank}</Text>
                <Text style={styles.headerStatLabel}>Rank</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.contentSection}>
          {/* Enhanced Stats Grid */}
          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>Your Progress</Text>
            <View style={styles.statsGrid}>
              <StatCard
                title="Completed"
                value={athleteProfile.testsCompleted}
                change={12}
                color={Colors.primary}
                icon="assignment-turned-in"
              />
              <StatCard
                title="Best Score"
                value={`${athleteProfile.recentScore}%`}
                change={5}
                color={Colors.success}
                icon="trending-up"
              />
              <StatCard
                title="Rank"
                value={`#${athleteProfile.rank}`}
                change={-2}
                color={Colors.warning}
                icon="emoji-events"
              />
              <StatCard
                title="This Week"
                value="5 Tests"
                change={25}
                color={Colors.secondary}
                icon="calendar-today"
              />
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActionsSection}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActionsGrid}>
              <QuickActionCard
                icon="play-arrow"
                title="Start Test"
                color={Colors.primary}
                onPress={() => navigation.navigate('Tests')}
              />
              <QuickActionCard
                icon="psychology"
                title="AI Coach"
                color={Colors.secondary}
                onPress={() => navigation.navigate('Coach')}
              />
              <QuickActionCard
                icon="people"
                title="Community"
                color={Colors.accent}
                onPress={() => navigation.navigate('Community')}
              />
            </View>
          </View>

          {/* Achievements */}
          <Surface style={styles.sectionCard} elevation={2}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Achievements</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Achievements')}>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.achievementsScroll}
              contentContainerStyle={styles.achievementsContent}
            >
              {athleteProfile.achievements.map((achievement) => (
                <AchievementBadge key={achievement.id} achievement={achievement} />
              ))}
            </ScrollView>
          </Surface>

          {/* Recent Activity */}
          <Surface style={styles.sectionCard} elevation={2}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Activity</Text>
              <TouchableOpacity onPress={() => navigation.navigate('History')}>
                <Text style={styles.viewAllText}>View History</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.activityList}>
              {athleteProfile.recentActivity.slice(0, 3).map((activity, index) => (
                <ActivityCard key={index} activity={activity} index={index} />
              ))}
            </View>
          </Surface>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingTop: 20,
    paddingBottom: 32,
    paddingHorizontal: 20,
  },
  headerContent: {
    flex: 1,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 28,
  },
  welcomeSection: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '400',
    marginBottom: 4,
  },
  nameText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: 4,
  },
  motivationText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '400',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
  },
  avatar: {
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  headerStats: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerStatItem: {
    alignItems: 'center',
    flex: 1,
  },
  headerStatValue: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: 4,
  },
  headerStatLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  contentSection: {
    flex: 1,
    marginTop: -16,
    paddingHorizontal: 20,
  },
  statsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: cardWidth,
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  statCardGradient: {
    padding: 20,
  },
  statCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  statInfo: {
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: 2,
  },
  statTitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
    marginBottom: 4,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statChange: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 2,
  },
  quickActionsSection: {
    marginBottom: 32,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 60) / 3,
    height: 80,
    borderRadius: 20,
    overflow: 'hidden',
  },
  quickActionGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  quickActionText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '600',
    marginTop: 6,
  },
  sectionCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  achievementsScroll: {
    flexDirection: 'row',
  },
  achievementsContent: {
    paddingRight: 20,
  },
  achievementBadge: {
    alignItems: 'center',
    marginRight: 24,
    width: 80,
  },
  badgeIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 2,
  },
  badgeTitle: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 16,
  },
  activityList: {
    gap: 0,
  },
  activityCard: {
    backgroundColor: Colors.surfaceVariant,
    borderRadius: 16,
    padding: 16,
  },
  activityContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: 2,
  },
  activityDate: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '400',
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  scoreText: {
    fontSize: 18,
    color: Colors.primary,
    fontWeight: '700',
  },
  scoreLabel: {
    fontSize: 11,
    color: Colors.textTertiary,
    fontWeight: '500',
  },
});

export default HomeScreen;