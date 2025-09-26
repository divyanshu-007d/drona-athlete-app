import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  FlatList,
  Dimensions
} from 'react-native';
import { 
  SegmentedButtons,
  Card,
  Button,
  Chip,
  Avatar,
  Surface
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../theme/colors';
import { communityData } from '../data/mockData';

const { width } = Dimensions.get('window');

export default function CommunityScreen({ navigation }) {
  const [selectedTab, setSelectedTab] = useState('global');
  const [timeFilter, setTimeFilter] = useState('thisWeek');

  const LeaderboardCard = ({ user, index }) => (
    <Surface style={[styles.leaderboardCard, user.isCurrentUser && styles.currentUserCard]} elevation={user.isCurrentUser ? 3 : 1}>
      <LinearGradient
        colors={user.isCurrentUser ? [Colors.primary + '08', Colors.primary + '04'] : ['#FFFFFF', '#FFFFFF']}
        style={styles.leaderboardGradient}
      >
        <View style={styles.leaderboardContent}>
          <View style={styles.rankSection}>
            <View style={[styles.rankContainer, index < 3 && { backgroundColor: getMedalColor(index) + '20' }]}>
              <Text style={[styles.rankNumber, user.isCurrentUser && { color: Colors.primary }]}>
                {user.rank}
              </Text>
            </View>
            {index < 3 && (
              <MaterialIcons 
                name={index === 0 ? 'emoji-events' : index === 1 ? 'military-tech' : 'workspace-premium'} 
                size={16} 
                color={getMedalColor(index)} 
                style={styles.medalIcon}
              />
            )}
          </View>
          
          <Avatar.Image
            size={48}
            source={{ uri: `https://via.placeholder.com/48?text=${user.name.charAt(0)}` }}
            style={[styles.userAvatar, user.isCurrentUser && { borderWidth: 2, borderColor: Colors.primary }]}
          />
          
          <View style={styles.userInfo}>
            <Text style={[styles.userName, user.isCurrentUser && { color: Colors.primary }]}>
              {user.name}
            </Text>
            <View style={styles.userMeta}>
              <MaterialIcons name="location-on" size={12} color={Colors.textSecondary} />
              <Text style={styles.userLocation}>{user.location}</Text>
            </View>
          </View>
          
          <View style={styles.scoreSection}>
            <Text style={[styles.userScore, user.isCurrentUser && { color: Colors.primary }]}>
              {user.totalScore.toLocaleString()}
            </Text>
            <Text style={styles.scoreLabel}>points</Text>
          </View>
        </View>
      </LinearGradient>
    </Surface>
  );

  const getMedalColor = (index) => {
    switch (index) {
      case 0: return Colors.gold;
      case 1: return Colors.silver;
      case 2: return Colors.bronze;
      default: return Colors.neutral50;
    }
  };

  const CompetitionCard = ({ item }) => (
    <Surface style={styles.competitionCard} elevation={2}>
      <View style={styles.competitionContent}>
        <View style={styles.competitionHeader}>
          <View style={styles.competitionIconContainer}>
            <MaterialIcons name="emoji-events" size={20} color={Colors.warning} />
          </View>
          <View style={styles.competitionInfo}>
            <Text style={styles.competitionTitle}>{item.name}</Text>
            <Text style={styles.competitionMeta}>
              {item.participants.toLocaleString()} participants • Ends {new Date(item.endDate).toLocaleDateString()}
            </Text>
          </View>
        </View>
        
        <View style={styles.competitionFooter}>
          <View style={styles.prizeInfo}>
            <Text style={styles.prizeLabel}>Prize</Text>
            <Text style={styles.prizeAmount}>{item.prize}</Text>
          </View>
          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinButtonText}>Join</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Surface>
  );

  const FeedCard = ({ user, content, timestamp, badge, likes, comments }) => (
    <Surface style={styles.feedCard} elevation={2}>
      <View style={styles.feedContent}>
        <View style={styles.feedHeader}>
          <Avatar.Image
            size={44}
            source={{ uri: `https://via.placeholder.com/44?text=${user.charAt(0)}` }}
          />
          <View style={styles.feedUserInfo}>
            <Text style={styles.feedUserName}>{user}</Text>
            <Text style={styles.feedTimestamp}>{timestamp}</Text>
          </View>
          <View style={[styles.feedBadge, { backgroundColor: badge.color + '20' }]}>
            <MaterialIcons name={badge.icon} size={14} color={badge.color} />
          </View>
        </View>
        
        <Text style={styles.feedText}>{content}</Text>
        
        <View style={styles.feedActions}>
          <TouchableOpacity style={styles.feedAction}>
            <MaterialIcons name="thumb-up" size={18} color={likes > 0 ? Colors.primary : Colors.neutral50} />
            <Text style={[styles.feedActionText, likes > 0 && { color: Colors.primary }]}>
              {likes}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.feedAction}>
            <MaterialIcons name="chat-bubble-outline" size={18} color={Colors.neutral50} />
            <Text style={styles.feedActionText}>{comments}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.feedAction}>
            <MaterialIcons name="share" size={18} color={Colors.neutral50} />
          </TouchableOpacity>
        </View>
      </View>
    </Surface>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }]} edges={['left', 'right']}>
      {/* Modern Header */}
      <LinearGradient
        colors={[Colors.primary, Colors.primary + 'E6', Colors.primary + 'CC']}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Community</Text>
            <Text style={styles.headerSubtitle}>Connect & Compete with Athletes</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <MaterialIcons name="search" size={22} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <MaterialIcons name="notifications-none" size={22} color="#FFFFFF" />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Community Stats */}
        <Surface style={styles.statsCard} elevation={3}>
          <LinearGradient
            colors={[Colors.primary + '08', Colors.primary + '03']}
            style={styles.statsGradient}
          >
            <View style={styles.statsContent}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>15.4K</Text>
                <Text style={styles.statLabel}>Active Athletes</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>2.8K</Text>
                <Text style={styles.statLabel}>This Week</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>156</Text>
                <Text style={styles.statLabel}>Live Competitions</Text>
              </View>
            </View>
          </LinearGradient>
        </Surface>

        {/* Leaderboard Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Leaderboards</Text>
          
          {/* Tab Selector */}
          <SegmentedButtons
            value={selectedTab}
            onValueChange={setSelectedTab}
            buttons={[
              { value: 'global', label: 'Global' },
              { value: 'regional', label: 'Regional' },
              { value: 'friends', label: 'Friends' },
            ]}
            style={styles.tabSelector}
          />

          {/* Time Filter */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeFilters}>
            {[
              { key: 'thisWeek', label: 'This Week' },
              { key: 'thisMonth', label: 'This Month' },
              { key: 'allTime', label: 'All Time' }
            ].map((filter) => (
              <Chip
                key={filter.key}
                mode={timeFilter === filter.key ? 'flat' : 'outlined'}
                selected={timeFilter === filter.key}
                onPress={() => setTimeFilter(filter.key)}
                style={[
                  styles.timeFilterChip,
                  timeFilter === filter.key && { backgroundColor: Colors.primary }
                ]}
                textStyle={[
                  styles.timeFilterText,
                  timeFilter === filter.key && { color: '#FFFFFF' }
                ]}
                compact
              >
                {filter.label}
              </Chip>
            ))}
          </ScrollView>

          {/* Leaderboard List */}
          <View style={styles.leaderboardList}>
            {communityData.leaderboard.slice(0, 5).map((user, index) => (
              <LeaderboardCard key={user.rank} user={user} index={index} />
            ))}
            <TouchableOpacity style={styles.viewMoreButton}>
              <Text style={styles.viewMoreText}>View Full Leaderboard</Text>
              <MaterialIcons name="arrow-forward" size={16} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Active Competitions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Live Competitions</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.competitionsList}>
            {communityData.activeCompetitions.map((competition, index) => (
              <CompetitionCard key={index} item={competition} />
            ))}
          </View>
        </View>

        {/* Community Feed */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Community Feed</Text>
          
          <View style={styles.feedList}>
            <FeedCard
              user="Priya Patel"
              content="🎉 Just completed the Perfect Form challenge! 25 push-ups with excellent technique."
              timestamp="2 hours ago"
              badge={{ icon: 'emoji-events', color: Colors.warning }}
              likes={24}
              comments={5}
            />
            
            <FeedCard
              user="Arjun Singh"
              content="💪 New personal record! 42 push-ups in the strength test. Who's ready to challenge me?"
              timestamp="4 hours ago"
              badge={{ icon: 'whatshot', color: Colors.primary }}
              likes={18}
              comments={3}
            />
            
            <FeedCard
              user="Sneha Reddy"
              content="🏃‍♀️ Completed my first 5K run! Thanks to everyone for the motivation and tips."
              timestamp="6 hours ago"
              badge={{ icon: 'directions-run', color: Colors.success }}
              likes={32}
              comments={8}
            />
          </View>
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
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  headerButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.warning,
  },
  content: {
    flex: 1,
    marginTop:0,
    paddingTop:20,
  },
  statsCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  statsGradient: {
    flex: 1,
  },
  statsContent: {
    flexDirection: 'row',
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: '600',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.outline,
    marginHorizontal: 20,
  },
  section: {
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  viewAllText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  tabSelector: {
    marginBottom: 16,
    borderRadius: 16,
  },
  timeFilters: {
    marginBottom: 20,
  },
  timeFilterChip: {
    marginRight: 8,
    borderRadius: 20,
  },
  timeFilterText: {
    fontSize: 12,
    fontWeight: '600',
  },
  leaderboardList: {
    gap: 0,
  },
  leaderboardCard: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  currentUserCard: {
    borderWidth: 2,
    borderColor: Colors.primary,
    transform: [{ scale: 1.02 }],
  },
  leaderboardGradient: {
    flex: 1,
  },
  leaderboardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  rankSection: {
    width: 50,
    alignItems: 'center',
    marginRight: 4,
  },
  rankContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.neutral10,
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  medalIcon: {
    marginTop: 4,
  },
  userAvatar: {
    marginHorizontal: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  userMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userLocation: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '500',
    marginLeft: 4,
  },
  scoreSection: {
    alignItems: 'flex-end',
    minWidth: 80,
  },
  userScore: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  scoreLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  viewMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginTop: 8,
  },
  viewMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
    marginRight: 6,
  },
  competitionsList: {
    gap: 0,
  },
  competitionCard: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
    marginBottom: 12,
  },
  competitionContent: {
    padding: 16,
  },
  competitionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  competitionIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.warning + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  competitionInfo: {
    flex: 1,
  },
  competitionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  competitionMeta: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  competitionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  prizeInfo: {
    flex: 1,
  },
  prizeLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  prizeAmount: {
    fontSize: 14,
    color: Colors.success,
    fontWeight: '600',
  },
  joinButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  joinButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  feedList: {
    gap: 0,
  },
  feedCard: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
    marginBottom: 12,
  },
  feedContent: {
    padding: 16,
  },
  feedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  feedUserInfo: {
    flex: 1,
    marginLeft: 10,
  },
  feedUserName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  feedTimestamp: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },
  feedBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedText: {
    fontSize: 14,
    color: Colors.textPrimary,
    lineHeight: 20,
    marginBottom: 12,
  },
  feedActions: {
    flexDirection: 'row',
    gap: 20,
  },
  feedAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  feedActionText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 6,
    fontWeight: '500',
  },
  bottomSpacing: {
    height: 0,
  },
});