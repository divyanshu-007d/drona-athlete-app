import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../theme/colors';
import { commonStyles } from '../theme/styles';

export default function HistoryScreen({ navigation }) {
  return (
    <SafeAreaView style={commonStyles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Test History" titleStyle={styles.headerTitle} />
      </Appbar.Header>
      
      <View style={styles.content}>
        <Text style={styles.placeholder}>Test History</Text>
        <Text style={styles.description}>Historical test data would be displayed here</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: Colors.surface, elevation: 0 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: Colors.onSurface },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  placeholder: { fontSize: 24, fontWeight: '600', color: Colors.onBackground, marginBottom: 16 },
  description: { fontSize: 16, color: Colors.neutral50, textAlign: 'center' }
});