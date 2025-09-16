import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../theme/colors';
import { commonStyles } from '../theme/styles';

export default function TestCameraScreen({ navigation, route }) {
  const { testId } = route.params;
  
  return (
    <SafeAreaView style={commonStyles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Camera Test" titleStyle={styles.headerTitle} />
      </Appbar.Header>
      
      <View style={styles.content}>
        <Text style={styles.placeholder}>Camera/WebView Integration</Text>
        <Text style={styles.description}>MediaPipe integration would go here</Text>
        <Button 
          mode="contained" 
          onPress={() => navigation.navigate('TestResults', { testId, results: { score: 25, reps: 25, form: 85 } })}
          style={styles.completeButton}
        >
          Simulate Test Complete
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: Colors.surface, elevation: 0 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: Colors.onSurface },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  placeholder: { fontSize: 24, fontWeight: '600', color: Colors.onBackground, marginBottom: 16 },
  description: { fontSize: 16, color: Colors.neutral50, marginBottom: 32, textAlign: 'center' },
  completeButton: { borderRadius: 24 }
});