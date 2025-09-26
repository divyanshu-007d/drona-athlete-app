import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Surface } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';

const { width } = Dimensions.get('window');

export const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  color = Colors.primary,
  change,
  style 
}) => {
  return (
    <Surface style={[styles.card, style]} elevation={4}>
      <LinearGradient
        colors={[color + '10', color + '05', 'transparent']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
              <MaterialIcons name={icon} size={22} color={color} />
            </View>
            {change && (
              <View style={styles.changeContainer}>
                <MaterialIcons 
                  name={change > 0 ? "trending-up" : "trending-down"} 
                  size={12} 
                  color={change > 0 ? Colors.success : Colors.error} 
                />
                <Text style={[styles.changeText, { 
                  color: change > 0 ? Colors.success : Colors.error 
                }]}>
                  {Math.abs(change)}%
                </Text>
              </View>
            )}
          </View>
          <Text style={styles.value}>{value}</Text>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </LinearGradient>
    </Surface>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  changeText: {
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 2,
  },
  value: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  title: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 10,
    color: Colors.textTertiary,
    marginTop: 2,
    fontWeight: '500',
  },
});