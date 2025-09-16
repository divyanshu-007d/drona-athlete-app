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
  Avatar, 
  Card,
  Button,
  Switch,
  Surface
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatCard } from '../components';
import { Colors } from '../theme/colors';
import { athleteProfile } from '../data/mockData';

const { width } = Dimensions.get('window');

export default function ProfileScreen({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  const profileStats = [
    { title: 'Tests Taken', value: '45', icon: 'assignment', color: Colors.primary },
    { title: 'Personal Best', value: '89', icon: 'star', color: Colors.warning },
    { title: 'Streak Days', value: '12', icon: 'whatshot', color: Colors.accent },
    { title: 'Improvement', value: '23%', icon: 'trending-up', color: Colors.success },
  ];

  const settingsGroups = [
    {
      title: 'Preferences',
      items: [
        { title: 'Notifications', icon: 'notifications', type: 'switch', value: notificationsEnabled, onToggle: setNotificationsEnabled },
        { title: 'Dark Mode', icon: 'dark-mode', type: 'switch', value: darkModeEnabled, onToggle: setDarkModeEnabled },
        { title: 'Language', icon: 'language', type: 'navigation', value: 'English' },
      ]
    },
    {
      title: 'Account',
      items: [
        { title: 'Privacy Settings', icon: 'security', type: 'navigation' },
        { title: 'Data & Storage', icon: 'storage', type: 'navigation' },
        { title: 'Connected Apps', icon: 'apps', type: 'navigation' },
      ]
    },
    {
      title: 'Support',
      items: [
        { title: 'Help & Support', icon: 'help', type: 'navigation' },
        { title: 'Contact Us', icon: 'email', type: 'navigation' },
        { title: 'About', icon: 'info', type: 'navigation' },
      ]
    }
  ];

  const achievements = [
    { name: 'First Test', progress: 100, color: Colors.success, icon: 'military-tech' },
    { name: 'Week Streak', progress: 100, color: Colors.warning, icon: 'whatshot' },
    { name: 'Form Master', progress: 75, color: Colors.primary, icon: 'target' },
    { name: 'Endurance Pro', progress: 60, color: Colors.endurance, icon: 'directions-run' },
    { name: 'Strength King', progress: 40, color: Colors.strength, icon: 'fitness-center' },
  ];

  const StatCardComponent = ({ item }) => (
    <StatCard
      title={item.title}
      value={item.value}
      icon={item.icon}
      color={item.color}
      style={styles.statCardStyle}
    />
  );

  const SettingItem = ({ item, isLast = false }) => (
    <TouchableOpacity 
      style={[styles.settingItem, isLast && styles.lastSettingItem]} 
      onPress={() => {}}
      activeOpacity={0.7}
    >
      <View style={styles.settingLeft}>
        <View style={[styles.settingIcon, { backgroundColor: Colors.primary + '15' }]}>
          <Icon name={item.icon} size={22} color={Colors.primary} />
        </View>
        <Text style={styles.settingTitle}>{item.title}</Text>
      </View>
      <View style={styles.settingRight}>
        {item.type === 'switch' ? (
          <Switch
            value={item.value}
            onValueChange={item.onToggle}
            color={Colors.primary}
          />
        ) : (
          <>
            {item.value && <Text style={styles.settingValue}>{item.value}</Text>}
            <Icon name="chevron-right" size={20} color={Colors.neutral60} />
          </>
        )}
      </View>
    </TouchableOpacity>
  );

  const AchievementItem = ({ item }) => (
    <View style={styles.achievementItem}>
      <View style={[styles.achievementIcon, { backgroundColor: item.color + '20' }]}>
        <Icon name={item.icon} size={20} color={item.color} />
      </View>
      <View style={styles.achievementInfo}>
        <Text style={styles.achievementName}>{item.name}</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <LinearGradient
              colors={[item.color, item.color + 'DD']}
              style={[styles.progressFill, { width: `${item.progress}%` }]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          </View>
          <Text style={[styles.achievementProgress, { color: item.color }]}>
            {item.progress}%
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Modern Profile Header */}
        <LinearGradient
          colors={[Colors.primary, Colors.primary + 'DD', Colors.primary + 'BB']}
          style={styles.profileHeaderGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Icon name="edit" size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Icon name="settings" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileContent}>
            <View style={styles.avatarContainer}>
              <Avatar.Image
                size={100}
                source={{ uri: athleteProfile.avatar }}
                style={styles.profileAvatar}
              />
              <View style={styles.onlineIndicator} />
            </View>
            
            <Text style={styles.profileName}>{athleteProfile.name}</Text>
            <Text style={styles.profileLocation}>📍 Pune, Maharashtra</Text>
            <Text style={styles.profileJoined}>Athlete since January 2024</Text>
            
            <View style={styles.profileActions}>
              <TouchableOpacity style={styles.editProfileButton}>
                <Text style={styles.editProfileText}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareButton}>
                <Icon name="share" size={18} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        {/* Performance Overview */}
        <Surface style={styles.overviewCard} elevation={4}>
          <LinearGradient
            colors={[Colors.success + '10', Colors.success + '05']}
            style={styles.overviewGradient}
          >
            <View style={styles.overviewContent}>
              <View style={styles.overviewHeader}>
                <View style={styles.overviewInfo}>
                  <Text style={styles.overviewTitle}>Performance Score</Text>
                  <Text style={styles.overviewSubtitle}>Your overall fitness level</Text>
                </View>
                <View style={styles.scoreDisplay}>
                  <Text style={styles.scoreValue}>78.5</Text>
                  <Text style={styles.scoreMax}>/100</Text>
                </View>
              </View>
              
              <View style={styles.performanceBadges}>
                <View style={[styles.performanceBadge, { backgroundColor: Colors.success + '20' }]}>
                  <Icon name="trending-up" size={16} color={Colors.success} />
                  <Text style={[styles.badgeText, { color: Colors.success }]}>+5.2 this week</Text>
                </View>
                <View style={[styles.performanceBadge, { backgroundColor: Colors.primary + '20' }]}>
                  <Icon name="emoji-events" size={16} color={Colors.primary} />
                  <Text style={[styles.badgeText, { color: Colors.primary }]}>Top 25%</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Surface>

        {/* Stats Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance Stats</Text>
          <View style={styles.statsGrid}>
            {profileStats.map((stat, index) => (
              <StatCardComponent key={stat.title} item={stat} />
            ))}
          </View>
        </View>

        {/* Achievement Progress */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Achievement Progress</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Achievements')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <Surface style={styles.achievementsCard} elevation={2}>
            <View style={styles.achievementsContent}>
              {achievements.map((achievement, index) => (
                <AchievementItem key={achievement.name} item={achievement} />
              ))}
            </View>
          </Surface>
        </View>

        {/* Settings Groups */}
        {settingsGroups.map((group, groupIndex) => (
          <View key={group.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{group.title}</Text>
            <Surface style={styles.settingsCard} elevation={2}>
              {group.items.map((item, itemIndex) => (
                <SettingItem 
                  key={item.title} 
                  item={item} 
                  isLast={itemIndex === group.items.length - 1}
                />
              ))}
            </Surface>
          </View>
        ))}

        {/* Sign Out */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.signOutButton} onPress={() => {}}>
            <Icon name="logout" size={20} color={Colors.error} />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
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
  content: {
    flex: 1,
  },
  profileHeaderGradient: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    position: 'relative',
  },
  headerActions: {
    position: 'absolute',
    top: 60,
    right: 20,
    flexDirection: 'row',
    gap: 12,
    zIndex: 1,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContent: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profileAvatar: {
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.success,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  profileName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  profileLocation: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
    fontWeight: '500',
  },
  profileJoined: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 24,
    fontWeight: '400',
  },
  profileActions: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  editProfileButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  editProfileText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  shareButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overviewCard: {
    marginHorizontal: 20,
    marginTop: -20,
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'hidden',
  },
  overviewGradient: {
    flex: 1,
  },
  overviewContent: {
    padding: 24,
  },
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  overviewInfo: {
    flex: 1,
  },
  overviewTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  overviewSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  scoreDisplay: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.success,
  },
  scoreMax: {
    fontSize: 18,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginLeft: 2,
  },
  performanceBadges: {
    flexDirection: 'row',
    gap: 12,
  },
  performanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 6,
  },
  section: {
    marginBottom: 24,
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCardStyle: {
    width: (width - 52) / 2,
    marginBottom: 12,
  },
  achievementsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    overflow: 'hidden',
  },
  achievementsContent: {
    padding: 20,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.neutral95,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  achievementProgress: {
    fontSize: 14,
    fontWeight: '700',
    minWidth: 40,
    textAlign: 'right',
  },
  settingsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.outline,
  },
  lastSettingItem: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginRight: 8,
    fontWeight: '500',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.errorContainer,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginHorizontal: 20,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.error,
    marginLeft: 8,
  },
  bottomSpacing: {
    height: 32,
  },
});