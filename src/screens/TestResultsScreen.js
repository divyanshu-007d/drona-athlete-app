import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Card, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../theme/colors';
import { commonStyles } from '../theme/styles';

export default function TestResultsScreen({ navigation, route }) {
  const { testId, results } = route.params;
  
  return (
    <SafeAreaView style={commonStyles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Test Results" titleStyle={styles.headerTitle} />
        <Appbar.Action icon="share" onPress={() => {}} />
      </Appbar.Header>
      
      <ScrollView style={styles.content}>
        <Card style={styles.resultCard}>
          <Card.Content style={styles.resultContent}>
            <View style={styles.scoreSection}>
              <MaterialIcons name="emoji-events" size={64} color={Colors.warning} />
              <Text style={styles.scoreTitle}>Excellent!</Text>
              <Text style={styles.scoreValue}>{results?.score || 25}</Text>
              <Text style={styles.scoreLabel}>Push-ups completed</Text>
            </View>
            
            <View style={styles.metricsSection}>
              <View style={styles.metric}>
                <Text style={styles.metricValue}>{results?.form || 85}%</Text>
                <Text style={styles.metricLabel}>Form Score</Text>
              </View>
              <View style={styles.metric}>
                <Text style={styles.metricValue}>2:45</Text>
                <Text style={styles.metricLabel}>Time Taken</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        
        <View style={styles.actionButtons}>
          <Button mode="outlined" style={styles.actionButton}>Retake Test</Button>
          <Button mode="contained" style={styles.actionButton} onPress={() => navigation.navigate('MainTabs')}>Continue</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: Colors.surface, elevation: 0 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: Colors.onSurface },
  content: { flex: 1, backgroundColor: Colors.background, padding: 16 },
  resultCard: { backgroundColor: Colors.surface, elevation: 2, marginBottom: 24 },
  resultContent: { padding: 24, alignItems: 'center' },
  scoreSection: { alignItems: 'center', marginBottom: 32 },
  scoreTitle: { fontSize: 24, fontWeight: '700', color: Colors.success, marginVertical: 12 },
  scoreValue: { fontSize: 48, fontWeight: '700', color: Colors.primary },
  scoreLabel: { fontSize: 16, color: Colors.neutral50, marginTop: 8 },
  metricsSection: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  metric: { alignItems: 'center' },
  metricValue: { fontSize: 24, fontWeight: '700', color: Colors.onSurface },
  metricLabel: { fontSize: 14, color: Colors.neutral50, marginTop: 4 },
  actionButtons: { flexDirection: 'row', gap: 12 },
  actionButton: { flex: 1, borderRadius: 24 }
});