import React, { useState } from 'react';
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
  Surface, 
  ProgressBar,
  Chip
} from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../theme/colors';

const { width } = Dimensions.get('window');

export default function AchievementsScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const achievements = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Complete your first fitness test',
      progress: 100,
      maxProgress: 100,
      icon: 'emoji-events',
      color: Colors.warning,
      category: 'milestone',
      earned: true,
      earnedDate: '2024-01-10'
    },
    {
      id: 2,
      title: 'Consistency Champion',
      description: 'Complete tests for 7 consecutive days',
      progress: 100,
      maxProgress: 100,
      icon: 'whatshot',
      color: Colors.accent,
      category: 'streak',
      earned: true,
      earnedDate: '2024-01-15'
    },
    {
      id: 3,
      title: 'Strength Master',
      description: 'Complete 50 push-ups in a single test',
      progress: 28,
      maxProgress: 50,
      icon: 'fitness-center',
      color: Colors.strength,
      category: 'performance',
      earned: false
    },
    {
      id: 4,
      title: 'Endurance Pro',
      description: 'Hold a plank for 2 minutes',
      progress: 45,
      maxProgress: 120,
      icon: 'timer',
      color: Colors.endurance,
      category: 'performance',
      earned: false
    },
    {
      id: 5,
      title: 'Social Butterfly',
      description: 'Share 5 test results with friends',
      progress: 3,
      maxProgress: 5,
      icon: 'share',
      color: Colors.primary,
      category: 'social',
      earned: false
    },
    {
      id: 6,
      title: 'Perfect Form',
      description: 'Achieve 95% form score in any test',
      progress: 85,
      maxProgress: 95,
      icon: 'star',
      color: Colors.warning,
      category: 'performance',
      earned: false
    }
  ];

  const categories = [
    { key: 'all', label: 'All', count: achievements.length },
    { key: 'milestone', label: 'Milestones', count: achievements.filter(a => a.category === 'milestone').length },
    { key: 'performance', label: 'Performance', count: achievements.filter(a => a.category === 'performance').length },
    { key: 'streak', label: 'Streaks', count: achievements.filter(a => a.category === 'streak').length },
    { key: 'social', label: 'Social', count: achievements.filter(a => a.category === 'social').length },
  ];

  const stats = {
    earned: achievements.filter(a => a.earned).length,
    total: achievements.length,
    points: achievements.filter(a => a.earned).length * 100
  };

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  const AchievementCard = ({ item }) => (
    <Surface style={[styles.achievementCard, item.earned && styles.earnedCard]} elevation={item.earned ? 3 : 1}>
      <View style={styles.achievementContent}>
        <View style={styles.achievementLeft}>
          <View style={[styles.achievementIcon, { 
            backgroundColor: item.earned ? item.color + '20' : Colors.neutral95,
            borderWidth: item.earned ? 2 : 0,
            borderColor: item.earned ? item.color : 'transparent'
          }]}>
            <MaterialIcons 
              name={item.icon} 
              size={24} 
              color={item.earned ? item.color : Colors.neutral60} 
            />
          </View>
        </View>
        
        <View style={styles.achievementRight}>
          <View style={styles.achievementHeader}>
            <Text style={[styles.achievementTitle, !item.earned && { color: Colors.neutral60 }]}>
              {item.title}
            </Text>
            {item.earned && (
              <View style={styles.earnedBadge}>
                <MaterialIcons name="check-circle" size={18} color={Colors.success} />
              </View>
            )}
          </View>
          
          <Text style={[styles.achievementDescription, !item.earned && { color: Colors.neutral50 }]}>
            {item.description}
          </Text>
          
          {item.earned ? (
            <View style={styles.earnedInfo}>
              <MaterialIcons name="event" size={14} color={Colors.success} />
              <Text style={styles.earnedDate}>
                Earned on {new Date(item.earnedDate).toLocaleDateString()}
              </Text>
            </View>
          ) : (
            <View style={styles.progressSection}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressText}>
                  {item.progress} / {item.maxProgress}
                </Text>
                <Text style={styles.progressPercentage}>
                  {Math.round((item.progress / item.maxProgress) * 100)}%
                </Text>
              </View>
              <ProgressBar 
                progress={item.progress / item.maxProgress} 
                color={item.color}
                style={styles.progressBar}
              />
            </View>
          )}
        </View>
      </View>
    </Surface>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }]}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Achievements" titleStyle={styles.headerTitle} />
        <Appbar.Action icon="share" onPress={() => {}} />
      </Appbar.Header>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Overview */}
        <Surface style={styles.statsCard} elevation={2}>
          <View style={styles.statsContent}>
            <View style={styles.statsHeader}>
              <View style={styles.headerLeft}>
                <View style={styles.trophyIcon}>
                  <MaterialIcons name="emoji-events" size={28} color={Colors.warning} />
                </View>
                <View style={styles.statsInfo}>
                  <Text style={styles.statsTitle}>Achievements</Text>
                  <Text style={styles.statsSubtitle}>Your progress & milestones</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: Colors.success }]}>{stats.earned}</Text>
                <Text style={styles.statLabel}>Earned</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.total}</Text>
                <Text style={styles.statLabel}>Total</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: Colors.warning }]}>{stats.points}</Text>
                <Text style={styles.statLabel}>Points</Text>
              </View>
            </View>
          </View>
        </Surface>

        {/* Category Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryFilters}>
            {categories.map((category) => (
              <Chip
                key={category.key}
                mode={selectedCategory === category.key ? 'flat' : 'outlined'}
                selected={selectedCategory === category.key}
                onPress={() => setSelectedCategory(category.key)}
                style={[
                  styles.categoryChip,
                  selectedCategory === category.key && { backgroundColor: Colors.primary }
                ]}
                textStyle={[
                  styles.categoryText,
                  selectedCategory === category.key && { color: '#FFFFFF' }
                ]}
                compact
              >
                {category.label} ({category.count})
              </Chip>
            ))}
          </ScrollView>
        </View>

        {/* Achievements List */}
        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'all' ? 'All Achievements' : categories.find(c => c.key === selectedCategory)?.label}
          </Text>
          <View style={styles.achievementsList}>
            {filteredAchievements.map((achievement) => (
              <AchievementCard key={achievement.id} item={achievement} />
            ))}
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
    backgroundColor: Colors.background 
  },
  statsCard: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 20,
    borderRadius: 16,
    backgroundColor: Colors.surface,
  },
  statsContent: {
    padding: 20,
  },
  statsHeader: {
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trophyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.warning + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statsInfo: {
    flex: 1,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  statsSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    alignItems: 'center',
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
    textTransform: 'uppercase',
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: Colors.outline,
    marginHorizontal: 16,
  },
  filterSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  categoryFilters: {
    flexDirection: 'row',
  },
  categoryChip: {
    marginRight: 8,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  achievementsSection: {
    paddingHorizontal: 16,
  },
  achievementsList: {
    gap: 12,
  },
  achievementCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
  },
  earnedCard: {
    borderWidth: 2,
    borderColor: Colors.success,
    backgroundColor: Colors.surface,
  },
  achievementContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  achievementLeft: {
    marginRight: 16,
  },
  achievementRight: {
    flex: 1,
  },
  achievementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  earnedBadge: {
    backgroundColor: Colors.success + '20',
    borderRadius: 12,
    padding: 4,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  achievementDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 8,
  },
  earnedInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  earnedDate: {
    fontSize: 12,
    color: Colors.success,
    fontWeight: '600',
    marginLeft: 4,
  },
  progressSection: {
    marginTop: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  progressText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  progressPercentage: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '700',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.neutral95,
  },
  bottomSpacing: {
    height: 20,
  },
});