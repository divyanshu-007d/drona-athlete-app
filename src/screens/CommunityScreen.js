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
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../theme/colors';
import { communityData } from '../data/mockData';

const { width } = Dimensions.get('window');

export default function CommunityScreen({ navigation }) {
  const [selectedTab, setSelectedTab] = useState('global');
  const [timeFilter, setTimeFilter] = useState('thisWeek');

  const LeaderboardCard = ({ user, index }) => (
    <Surface style={[styles.leaderboardCard, user.isCurrentUser && styles.currentUserCard]} elevation={2}>
      <LinearGradient
        colors={user.isCurrentUser 
          ? [Colors.primary + '15', Colors.primary + '05'] 
          : ['transparent', 'transparent']
        }
        style={styles.leaderboardGradient}
      >
        <View style={styles.leaderboardContent}>
          <View style={styles.rankContainer}>
            <Text style={[styles.rankNumber, user.isCurrentUser && { color: Colors.primary }]}>
              #{user.rank}
            </Text>
            {index < 3 && (
              <View style={[styles.medal, { backgroundColor: getMedalColor(index) }]}>
                <Icon name="emoji-events" size={16} color="#FFFFFF" />
              </View>
            )}
          </View>
          
          <Avatar.Image
            size={48}
            source={{ uri: `https://via.placeholder.com/48?text=${user.name.charAt(0)}` }}
            style={styles.userAvatar}
          />
          
          <View style={styles.userInfo}>
            <Text style={[styles.userName, user.isCurrentUser && { color: Colors.primary }]}>
              {user.name}
            </Text>
            <Text style={styles.userLocation}>{user.location}</Text>
          </View>
          
          <View style={styles.scoreContainer}>
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
    <Surface style={styles.competitionCard} elevation={3}>
      <LinearGradient
        colors={[Colors.warning + '08', Colors.warning + '03']}
        style={styles.competitionGradient}
      >
        <View style={styles.competitionHeader}>
          <View style={[styles.competitionIcon, { backgroundColor: Colors.warning + '20' }]}>
            <Icon name="emoji-events" size={28} color={Colors.warning} />
          </View>
          <View style={styles.competitionInfo}>
            <Text style={styles.competitionName}>{item.name}</Text>
            <View style={styles.competitionMeta}>
              <View style={styles.metaItem}>
                <Icon name="people" size={16} color={Colors.textSecondary} />
                <Text style={styles.metaText}>{item.participants.toLocaleString()}</Text>
              </View>
              <View style={styles.metaItem}>
                <Icon name="schedule" size={16} color={Colors.textSecondary} />
                <Text style={styles.metaText}>Ends {new Date(item.endDate).toLocaleDateString()}</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.prizeSection}>
          <View style={styles.prizeContainer}>
            <Icon name="card-giftcard" size={20} color={Colors.success} />
            <Text style={styles.prizeText}>Prize: {item.prize}</Text>
          </View>
          <TouchableOpacity style={styles.joinButton}>
            <LinearGradient
              colors={[Colors.primary, Colors.primary + 'DD']}
              style={styles.joinGradient}
            >
              <Text style={styles.joinButtonText}>Join Competition</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
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
            <Icon name={badge.icon} size={16} color={badge.color} />
          </View>
        </View>
        
        <Text style={styles.feedText}>{content}</Text>
        
        <View style={styles.feedActions}>
          <TouchableOpacity style={styles.feedAction}>
            <Icon name="thumb-up" size={20} color={likes > 0 ? Colors.primary : Colors.neutral50} />
            <Text style={[styles.feedActionText, likes > 0 && { color: Colors.primary }]}>
              {likes}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.feedAction}>
            <Icon name="chat-bubble-outline" size={20} color={Colors.neutral50} />
            <Text style={styles.feedActionText}>{comments}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.feedAction}>
            <Icon name="share" size={20} color={Colors.neutral50} />
          </TouchableOpacity>
        </View>
      </View>
    </Surface>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }]}>
      {/* Modern Header */}
      <LinearGradient
        colors={[Colors.accent, Colors.accent + 'DD']}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Community</Text>
            <Text style={styles.headerSubtitle}>Connect & Compete</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Icon name="search" size={22} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Icon name="notifications-none" size={22} color="#FFFFFF" />
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
              <Icon name="arrow-forward" size={16} color={Colors.primary} />
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
    paddingTop: 12,
    paddingBottom: 20,
    paddingHorizontal: 20,
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
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
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
    backgroundColor: Colors.warning,
  },
  content: {
    flex: 1,
    marginTop: -12,
  },
  statsCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'hidden',
  },
  statsGradient: {
    flex: 1,
  },
  statsContent: {
    flexDirection: 'row',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
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
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 16,
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
    gap: 12,
  },
  leaderboardCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  currentUserCard: {
    borderWidth: 2,
    borderColor: Colors.primary + '40',
  },
  leaderboardGradient: {
    flex: 1,
  },
  leaderboardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  rankContainer: {
    width: 60,
    alignItems: 'center',
    position: 'relative',
  },
  rankNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  medal: {
    position: 'absolute',
    top: -8,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatar: {
    marginRight: 16,
    borderWidth: 2,
    borderColor: Colors.outline,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  userLocation: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  userScore: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  scoreLabel: {
    fontSize: 11,
    color: Colors.textTertiary,
    fontWeight: '500',
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
    gap: 16,
  },
  competitionCard: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  competitionGradient: {
    padding: 20,
  },
  competitionHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  competitionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  competitionInfo: {
    flex: 1,
  },
  competitionName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  competitionMeta: {
    gap: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginLeft: 6,
    fontWeight: '500',
  },
  prizeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  prizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  prizeText: {
    fontSize: 14,
    color: Colors.success,
    fontWeight: '600',
    marginLeft: 8,
  },
  joinButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  joinGradient: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  joinButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  feedList: {
    gap: 16,
  },
  feedCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  feedContent: {
    padding: 20,
  },
  feedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  feedUserInfo: {
    flex: 1,
    marginLeft: 12,
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
    fontSize: 15,
    color: Colors.textPrimary,
    lineHeight: 22,
    marginBottom: 16,
  },
  feedActions: {
    flexDirection: 'row',
    gap: 24,
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
    height: 24,
  },
});