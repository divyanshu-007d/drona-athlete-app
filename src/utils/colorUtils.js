import { Colors } from '../theme/colors';

/**
 * Ensures a color value is valid and returns a fallback if not
 * @param {string} color - The color to validate
 * @param {string} fallback - Fallback color if the original is invalid
 * @returns {string} Valid color value
 */
export const ensureValidColor = (color, fallback = Colors.primary) => {
  if (!color || typeof color !== 'string' || color === 'undefined' || color === 'null') {
    return fallback;
  }
  return color;
};

/**
 * Creates a color with transparency, ensuring the base color is valid
 * @param {string} color - Base color
 * @param {string} opacity - Opacity value (e.g., '20', 'DD')
 * @param {string} fallback - Fallback color if base color is invalid
 * @returns {string} Color with transparency
 */
export const colorWithOpacity = (color, opacity, fallback = Colors.primary) => {
  const validColor = ensureValidColor(color, fallback);
  return validColor + opacity;
};