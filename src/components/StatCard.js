import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Surface } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
              <Icon name={icon} size={22} color={color} />
            </View>
            {change && (
              <View style={styles.changeContainer}>
                <Icon 
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
    marginRight: 16,
    minWidth: (width - 64) / 2.2,
    borderRadius: 20,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  changeText: {
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 2,
  },
  value: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  title: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 11,
    color: Colors.textTertiary,
    marginTop: 2,
    fontWeight: '500',
  },
});