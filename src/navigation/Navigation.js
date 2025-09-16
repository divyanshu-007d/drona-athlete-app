import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';

// Screen imports
import HomeScreen from '../screens/HomeScreen';
import TestsScreen from '../screens/TestsScreen';
import AICoachScreen from '../screens/AICoachScreen';
import CommunityScreen from '../screens/CommunityScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TestInstructionsScreen from '../screens/TestInstructionsScreen';
import TestCameraScreen from '../screens/TestCameraScreen';
import TestResultsScreen from '../screens/TestResultsScreen';
import HistoryScreen from '../screens/HistoryScreen';
import AchievementsScreen from '../screens/AchievementsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: { 
        height: 80, 
        paddingBottom: 20,
        paddingTop: 8,
        backgroundColor: Colors.surface,
        borderTopColor: Colors.neutral90,
        elevation: 8,
      },
      tabBarActiveTintColor: Colors.primary,
      tabBarInactiveTintColor: Colors.neutral50,
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '500',
        marginTop: 4,
      },
      headerShown: false,
    }}
  >
    <Tab.Screen 
      name="Home" 
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => <MaterialIcons name="home" size={size} color={color} />,
        tabBarLabel: 'Home',
      }}
    />
    <Tab.Screen 
      name="Tests" 
      component={TestsScreen}
      options={{
        tabBarIcon: ({ color, size }) => <MaterialIcons name="fitness-center" size={size} color={color} />,
        tabBarLabel: 'Tests',
      }}
    />
    <Tab.Screen 
      name="Coach" 
      component={AICoachScreen}
      options={{
        tabBarIcon: ({ color, size }) => <MaterialIcons name="psychology" size={size} color={color} />,
        tabBarLabel: 'AI Coach',
      }}
    />
    <Tab.Screen 
      name="Community" 
      component={CommunityScreen}
      options={{
        tabBarIcon: ({ color, size }) => <MaterialIcons name="people" size={size} color={color} />,
        tabBarLabel: 'Community',
      }}
    />
    <Tab.Screen 
      name="Profile" 
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color, size }) => <MaterialIcons name="person" size={size} color={color} />,
        tabBarLabel: 'Profile',
      }}
    />
  </Tab.Navigator>
);

const MainStack = () => (
  <Stack.Navigator 
    screenOptions={{ 
      headerShown: false,
      cardStyle: { backgroundColor: Colors.background },
    }}
  >
    <Stack.Screen name="MainTabs" component={TabNavigator} />
    <Stack.Screen name="TestInstructions" component={TestInstructionsScreen} />
    <Stack.Screen name="TestCamera" component={TestCameraScreen} />
    <Stack.Screen name="TestResults" component={TestResultsScreen} />
    <Stack.Screen name="History" component={HistoryScreen} />
    <Stack.Screen name="Achievements" component={AchievementsScreen} />
  </Stack.Navigator>
);

export default function Navigation() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}