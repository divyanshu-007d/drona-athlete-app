import { MD3LightTheme } from 'react-native-paper';
import { Colors } from './colors';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: Colors.primary,
    secondary: Colors.secondary,
    surface: Colors.surface,
    background: Colors.background,
    error: Colors.error,
    onPrimary: Colors.onPrimary,
    onSecondary: Colors.onSecondary,
    onSurface: Colors.onSurface,
    onBackground: Colors.onBackground,
    onError: Colors.onError,
    primaryContainer: Colors.primaryContainer,
    onPrimaryContainer: Colors.onPrimaryContainer,
    secondaryContainer: Colors.secondaryContainer,
    onSecondaryContainer: Colors.onSecondaryContainer,
  },
  roundness: 20,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 3,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 6,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 20,
      elevation: 10,
    },
  },
};

export const fonts = {
  displayLarge: {
    fontSize: 57,
    lineHeight: 64,
    fontWeight: '700',
  },
  displayMedium: {
    fontSize: 45,
    lineHeight: 52,
    fontWeight: '600',
  },
  displaySmall: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '600',
  },
  headlineLarge: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700',
  },
  headlineMedium: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '600',
  },
  headlineSmall: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600',
  },
  titleLarge: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '600',
  },
  titleMedium: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '500',
  },
  titleSmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  bodyLarge: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  bodyMedium: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  bodySmall: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
  },
  labelLarge: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  labelMedium: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
  labelSmall: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '500',
  },
};