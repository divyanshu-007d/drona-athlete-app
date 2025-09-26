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
  Chip,
  Avatar
} from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../theme/colors';

const { width } = Dimensions.get('window');

export default function HistoryScreen({ navigation }) {
  const [selectedPeriod, setSelectedPeriod] = useState('thisMonth');

  const testHistory = [
    {
      id: 1,
      testName: 'Push-up Test',
      date: '2024-01-15',
      score: 28,
      improvement: '+12%',
      category: 'Strength',
      icon: 'fitness-center',
      color: Colors.strength
    },
    {
      id: 2,
      testName: 'Plank Hold',
      date: '2024-01-12',
      score: 45,
      improvement: '+8%',
      category: 'Endurance',
      icon: 'timer',
      color: Colors.endurance
    },
    {
      id: 3,
      testName: 'Flexibility Test',
      date: '2024-01-10',
      score: 72,
      improvement: '+15%',
      category: 'Flexibility',
      icon: 'accessibility',
      color: Colors.flexibility
    },
    {
      id: 4,
      testName: 'Balance Test',
      date: '2024-01-08',
      score: 35,
      improvement: '-3%',
      category: 'Balance',
      icon: 'balance',
      color: Colors.balance
    },
    {
      id: 5,
      testName: 'Sprint Test',
      date: '2024-01-05',
      score: 18,
      improvement: '+5%',
      category: 'Speed',
      icon: 'directions-run',
      color: Colors.speed
    }
  ];

  const stats = {
    totalTests: 15,
    thisMonth: 5,
    avgImprovement: 8.2,
    bestCategory: 'Flexibility'
  };

  const periods = [
    { key: 'thisWeek', label: 'This Week' },
    { key: 'thisMonth', label: 'This Month' },
    { key: 'last3Months', label: 'Last 3 Months' },
    { key: 'allTime', label: 'All Time' }
  ];

  const HistoryCard = ({ item }) => (
    <Surface style={styles.historyCard} elevation={2}>
      <TouchableOpacity style={styles.historyContent} activeOpacity={0.7}>
        <View style={styles.historyLeft}>
          <View style={[styles.testIcon, { backgroundColor: item.color + '20' }]}>
            <MaterialIcons name={item.icon} size={24} color={item.color} />
          </View>
          <View style={styles.testInfo}>
            <Text style={styles.testName}>{item.testName}</Text>
            <Text style={styles.testDate}>{new Date(item.date).toLocaleDateString()}</Text>
            <Text style={[styles.testCategory, { color: item.color }]}>{item.category}</Text>
          </View>
        </View>
        <View style={styles.historyRight}>
          <Text style={styles.testScore}>{item.score}</Text>
          <View style={[styles.improvementBadge, { 
            backgroundColor: item.improvement.includes('+') ? Colors.success + '20' : Colors.error + '20' 
          }]}>
            <MaterialIcons 
              name={item.improvement.includes('+') ? 'trending-up' : 'trending-down'} 
              size={12} 
              color={item.improvement.includes('+') ? Colors.success : Colors.error} 
            />
            <Text style={[styles.improvementText, { 
              color: item.improvement.includes('+') ? Colors.success : Colors.error 
            }]}>
              {item.improvement}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Surface>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }]}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Test History" titleStyle={styles.headerTitle} />
        <Appbar.Action icon="filter-list" onPress={() => {}} />
      </Appbar.Header>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Overview */}
        <Surface style={styles.statsCard} elevation={3}>
          <LinearGradient
            colors={[Colors.primary + '10', Colors.primary + '05']}
            style={styles.statsGradient}
          >
            <View style={styles.statsContent}>
              <Text style={styles.statsTitle}>Performance Overview</Text>
              <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{stats.totalTests}</Text>
                  <Text style={styles.statLabel}>Total Tests</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{stats.thisMonth}</Text>
                  <Text style={styles.statLabel}>This Month</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statValue, { color: Colors.success }]}>+{stats.avgImprovement}%</Text>
                  <Text style={styles.statLabel}>Avg Growth</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statValue, { color: Colors.flexibility }]}>{stats.bestCategory}</Text>
                  <Text style={styles.statLabel}>Best Category</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Surface>

        {/* Period Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.sectionTitle}>Filter by Period</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.periodFilters}>
            {periods.map((period) => (
              <Chip
                key={period.key}
                mode={selectedPeriod === period.key ? 'flat' : 'outlined'}
                selected={selectedPeriod === period.key}
                onPress={() => setSelectedPeriod(period.key)}
                style={[
                  styles.periodChip,
                  selectedPeriod === period.key && { backgroundColor: Colors.primary }
                ]}
                textStyle={[
                  styles.periodText,
                  selectedPeriod === period.key && { color: '#FFFFFF' }
                ]}
                compact
              >
                {period.label}
              </Chip>
            ))}
          </ScrollView>
        </View>

        {/* Test History List */}
        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>Recent Tests</Text>
          <View style={styles.historyList}>
            {testHistory.map((item) => (
              <HistoryCard key={item.id} item={item} />
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
    overflow: 'hidden',
  },
  statsGradient: {
    flex: 1,
  },
  statsContent: {
    padding: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: (width - 72) / 2,
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
    textAlign: 'center',
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
  periodFilters: {
    flexDirection: 'row',
  },
  periodChip: {
    marginRight: 8,
    borderRadius: 20,
  },
  periodText: {
    fontSize: 12,
    fontWeight: '600',
  },
  historySection: {
    paddingHorizontal: 16,
  },
  historyList: {
    gap: 12,
  },
  historyCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
  },
  historyContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  testIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  testInfo: {
    flex: 1,
  },
  testName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  testDate: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  testCategory: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  historyRight: {
    alignItems: 'flex-end',
  },
  testScore: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  improvementBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  improvementText: {
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 2,
  },
  bottomSpacing: {
    height: 20,
  },
});