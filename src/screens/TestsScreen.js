import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import { Surface, Searchbar, Chip } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TestCard } from '../components';
import { testsData, categories } from '../data/mockData';
import { Colors } from '../theme/colors';

const { width } = Dimensions.get('window');

export default function TestsScreen({ navigation }) {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTests = testsData.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         test.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || test.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const CategoryCard = ({ category }) => {
    const isSelected = selectedCategory === category.name;
    return (
      <TouchableOpacity
        style={[styles.categoryCard, isSelected && styles.selectedCategoryCard]}
        onPress={() => setSelectedCategory(category.name)}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={isSelected ? [category.color, category.color + 'DD'] : [category.color + '10', category.color + '05']}
          style={styles.categoryGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={[styles.categoryIconContainer, { backgroundColor: category.color + '20' }]}>
            <Icon name={category.icon} size={24} color={isSelected ? '#FFFFFF' : category.color} />
          </View>
          <Text style={[styles.categoryName, { color: isSelected ? '#FFFFFF' : Colors.textPrimary }]}>
            {category.name}
          </Text>
          <Text style={[styles.categoryCount, { color: isSelected ? 'rgba(255, 255, 255, 0.8)' : Colors.textSecondary }]}>
            {category.count} tests
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const FilterChip = ({ label, isSelected, onPress }) => (
    <Chip
      mode={isSelected ? 'flat' : 'outlined'}
      selected={isSelected}
      onPress={onPress}
      style={[
        styles.filterChip,
        isSelected && { backgroundColor: Colors.primary },
      ]}
      textStyle={[
        styles.filterChipText,
        isSelected && { color: '#FFFFFF' },
      ]}
    >
      {label}
    </Chip>
  );

  const TestStatsHeader = () => (
    <Surface style={styles.statsHeader} elevation={2}>
      <LinearGradient
        colors={[Colors.primary + '10', Colors.primary + '05']}
        style={styles.statsGradient}
      >
        <View style={styles.statsContent}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{testsData.length}</Text>
            <Text style={styles.statLabel}>Total Tests</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{categories.length}</Text>
            <Text style={styles.statLabel}>Categories</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{filteredTests.length}</Text>
            <Text style={styles.statLabel}>Available</Text>
          </View>
        </View>
      </LinearGradient>
    </Surface>
  );

  const renderTestCard = ({ item }) => (
    <TestCard
      test={item}
      onPress={() => navigation.navigate('TestInstructions', { testId: item.id })}
      onStartTest={() => navigation.navigate('TestCamera', { testId: item.id })}
    />
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Fitness Tests</Text>
        <Text style={styles.screenSubtitle}>Choose your challenge</Text>
      </View>

      {/* Stats Header */}
      <TestStatsHeader />

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <Searchbar
          placeholder="Search tests..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
          iconColor={Colors.primary}
        />
      </View>

      {/* Categories */}
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          <TouchableOpacity
            style={[styles.categoryCard, selectedCategory === 'All' && styles.selectedCategoryCard]}
            onPress={() => setSelectedCategory('All')}
          >
            <LinearGradient
              colors={selectedCategory === 'All' ? [Colors.primary, Colors.primary + 'DD'] : [Colors.neutral90, Colors.neutral95]}
              style={styles.categoryGradient}
            >
              <View style={[styles.categoryIconContainer, { backgroundColor: Colors.primary + '20' }]}>
                <Icon name="apps" size={24} color={selectedCategory === 'All' ? '#FFFFFF' : Colors.primary} />
              </View>
              <Text style={[styles.categoryName, { color: selectedCategory === 'All' ? '#FFFFFF' : Colors.textPrimary }]}>
                All
              </Text>
              <Text style={[styles.categoryCount, { color: selectedCategory === 'All' ? 'rgba(255, 255, 255, 0.8)' : Colors.textSecondary }]}>
                {testsData.length} tests
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          {categories.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </ScrollView>
      </View>

      {/* Filter Chips */}
      <View style={styles.filtersSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContent}>
          {['All', ...categories.map(cat => cat.name)].map((category) => (
            <FilterChip 
              key={category}
              label={category} 
              isSelected={selectedCategory === category} 
              onPress={() => setSelectedCategory(category)} 
            />
          ))}
        </ScrollView>
      </View>

      {/* Tests List */}
      <View style={styles.testsSection}>
        <View style={styles.testsSectionHeader}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'All' ? 'All Tests' : `${selectedCategory} Tests`}
          </Text>
          <Text style={styles.resultsCount}>
            {filteredTests.length} result{filteredTests.length !== 1 ? 's' : ''}
          </Text>
        </View>
        
        <FlatList
          data={filteredTests}
          renderItem={renderTestCard}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.testsList}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  screenSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  statsHeader: {
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
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
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
    backgroundColor: Colors.outline,
    marginHorizontal: 20,
  },
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  searchBar: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    elevation: 2,
  },
  searchInput: {
    fontSize: 16,
  },
  categoriesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  categoriesScroll: {
    paddingLeft: 20,
  },
  categoryCard: {
    width: 120,
    height: 100,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  selectedCategoryCard: {
    transform: [{ scale: 1.02 }],
  },
  categoryGradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  categoryCount: {
    fontSize: 11,
    fontWeight: '500',
  },
  filtersSection: {
    marginBottom: 24,
  },
  filtersContent: {
    paddingHorizontal: 20,
  },
  filterChip: {
    marginRight: 8,
    borderRadius: 20,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  testsSection: {
    flex: 1,
    paddingHorizontal: 20,
  },
  testsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultsCount: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  testsList: {
    paddingBottom: 20,
  },
});