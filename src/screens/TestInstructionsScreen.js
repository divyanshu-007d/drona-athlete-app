import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Image 
} from 'react-native';
import { 
  Appbar, 
  Card,
  Button,
  Chip,
  ProgressBar
} from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../theme/colors';
import { commonStyles } from '../theme/styles';
import { testsData } from '../data/mockData';

export default function TestInstructionsScreen({ navigation, route }) {
  const { testId } = route.params;
  const test = testsData.find(t => t.id === testId) || testsData[0];

  const instructions = [
    {
      step: 1,
      title: "Starting Position",
      description: "Place your hands shoulder-width apart on the ground. Keep your body in a straight line from head to heels.",
      image: "https://via.placeholder.com/300x200"
    },
    {
      step: 2,
      title: "Lowering Phase",
      description: "Lower your body until your chest nearly touches the ground. Keep your core tight and maintain proper form.",
      image: "https://via.placeholder.com/300x200"
    },
    {
      step: 3,
      title: "Pushing Phase",
      description: "Push your body back up to the starting position. Exhale as you push up and maintain control throughout the movement.",
      image: "https://via.placeholder.com/300x200"
    }
  ];

  const equipment = ["Exercise Mat (Optional)", "Clear Space (2m x 2m)", "Comfortable Clothing"];
  const safetyTips = [
    "Warm up before starting the test",
    "Stop if you feel any pain",
    "Maintain proper form throughout",
    "Stay hydrated"
  ];

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content 
          title="Test Instructions" 
          titleStyle={styles.headerTitle}
        />
        <Appbar.Action 
          icon="skip-next" 
          onPress={() => navigation.navigate('TestCamera', { testId })} 
          iconColor={Colors.onSurface}
        />
      </Appbar.Header>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Test Overview */}
        <Card style={styles.overviewCard}>
          <Card.Content style={styles.overviewContent}>
            <View style={styles.testHeader}>
              <View style={styles.testIcon}>
                <MaterialIcons name={test.icon} size={24} color={Colors.primary} />
              </View>
              <View style={styles.testInfo}>
                <Text style={styles.testName}>{test.name}</Text>
                <Text style={styles.testDescription}>{test.description}</Text>
              </View>
            </View>
            
            <View style={styles.testDetails}>
              <View style={styles.testDetail}>
                <MaterialIcons name="schedule" size={20} color={Colors.neutral50} />
                <Text style={styles.testDetailText}>{test.estimatedTime}</Text>
              </View>
              <View style={styles.testDetail}>
                <MaterialIcons name="signal-cellular-alt" size={20} color={Colors.neutral50} />
                <Text style={styles.testDetailText}>{test.difficulty}</Text>
              </View>
              <View style={styles.testDetail}>
                <MaterialIcons name="flag" size={20} color={Colors.neutral50} />
                <Text style={styles.testDetailText}>Target: {test.benchmark}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Progress Indicator */}
        <View style={styles.progressSection}>
          <Text style={styles.progressTitle}>Step 1 of 3: Instructions</Text>
          <ProgressBar progress={0.33} color={Colors.primary} style={styles.progressBar} />
        </View>

        {/* Instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to Perform the Test</Text>
          {instructions.map((instruction, index) => (
            <Card key={index} style={styles.instructionCard}>
              <Card.Content style={styles.instructionContent}>
                <View style={styles.instructionHeader}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{instruction.step}</Text>
                  </View>
                  <Text style={styles.instructionTitle}>{instruction.title}</Text>
                </View>
                <Image 
                  source={{ uri: instruction.image }} 
                  style={styles.instructionImage}
                  resizeMode="cover"
                />
                <Text style={styles.instructionDescription}>
                  {instruction.description}
                </Text>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Equipment Needed */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Equipment Needed</Text>
          <Card style={styles.equipmentCard}>
            <Card.Content style={styles.equipmentContent}>
              {equipment.map((item, index) => (
                <View key={index} style={styles.equipmentItem}>
                  <MaterialIcons name="check-circle" size={20} color={Colors.success} />
                  <Text style={styles.equipmentText}>{item}</Text>
                </View>
              ))}
            </Card.Content>
          </Card>
        </View>

        {/* Safety Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Safety Tips</Text>
          <Card style={styles.safetyCard}>
            <Card.Content style={styles.safetyContent}>
              {safetyTips.map((tip, index) => (
                <View key={index} style={styles.safetyItem}>
                  <MaterialIcons name="warning" size={20} color={Colors.warning} />
                  <Text style={styles.safetyText}>{tip}</Text>
                </View>
              ))}
            </Card.Content>
          </Card>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Button 
          mode="outlined" 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          labelStyle={styles.backButtonText}
        >
          Back
        </Button>
        <Button 
          mode="contained" 
          onPress={() => navigation.navigate('TestCamera', { testId })}
          style={styles.startButton}
          labelStyle={styles.startButtonText}
        >
          Start Test
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.surface,
    elevation: 0,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.onSurface,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  overviewCard: {
    margin: 12,
    backgroundColor: Colors.surface,
    elevation: 2,
  },
  overviewContent: {
    padding: 16,
  },
  testHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  testIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  testInfo: {
    flex: 1,
  },
  testName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.onSurface,
    marginBottom: 3,
  },
  testDescription: {
    fontSize: 14,
    color: Colors.neutral50,
    lineHeight: 20,
  },
  testDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral95,
  },
  testDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  testDetailText: {
    fontSize: 14,
    color: Colors.neutral50,
    marginLeft: 4,
    fontWeight: '500',
  },
  progressSection: {
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.onBackground,
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  section: {
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.onBackground,
    marginBottom: 12,
  },
  instructionCard: {
    backgroundColor: Colors.surface,
    marginBottom: 12,
    elevation: 1,
  },
  instructionContent: {
    padding: 12,
  },
  instructionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onPrimary,
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.onSurface,
  },
  instructionImage: {
    width: '100%',
    height: 140,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: Colors.neutral95,
  },
  instructionDescription: {
    fontSize: 14,
    color: Colors.onSurface,
    lineHeight: 20,
  },
  equipmentCard: {
    backgroundColor: Colors.surface,
    elevation: 1,
  },
  equipmentContent: {
    padding: 12,
  },
  equipmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  equipmentText: {
    fontSize: 14,
    color: Colors.onSurface,
    marginLeft: 10,
  },
  safetyCard: {
    backgroundColor: Colors.surface,
    elevation: 1,
  },
  safetyContent: {
    padding: 12,
  },
  safetyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  safetyText: {
    fontSize: 14,
    color: Colors.onSurface,
    marginLeft: 10,
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral95,
    gap: 10,
  },
  backButton: {
    flex: 1,
    borderColor: Colors.neutral80,
    borderRadius: 24,
  },
  backButtonText: {
    color: Colors.neutral50,
    fontSize: 16,
  },
  startButton: {
    flex: 2,
    borderRadius: 24,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 16,
  },
});