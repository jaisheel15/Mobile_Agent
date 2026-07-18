// theme/tokens/shadows.ts

import { Platform, ViewStyle } from "react-native";
import { colors } from "./colors";

/**
 * ============================================================================
 * Helper
 * ============================================================================
 */

function createShadow(
  color: string,
  opacity: number,
  radius: number,
  offsetY: number,
  elevation: number
): ViewStyle {
  return {
    shadowColor: color,
    shadowOpacity: opacity,
    shadowRadius: radius,
    shadowOffset: {
      width: 0,
      height: offsetY,
    },
    elevation,
  };
}

/**
 * ============================================================================
 * Neutral Elevation
 * ============================================================================
 */

export const elevation = {
  none: {},

  sm: createShadow("#000", 0.08, 4, 2, 2),

  md: createShadow("#000", 0.12, 8, 4, 4),

  lg: createShadow("#000", 0.18, 16, 8, 8),

  xl: createShadow("#000", 0.22, 24, 12, 12),
} as const;

/**
 * ============================================================================
 * Agent Glow
 * ============================================================================
 */

export const glow = {
  primary: createShadow(
    colors.primary,
    0.18,
    20,
    0,
    Platform.OS === "android" ? 8 : 0
  ),

  secondary: createShadow(
    colors.secondary,
    0.18,
    20,
    0,
    Platform.OS === "android" ? 8 : 0
  ),

  warning: createShadow(
    colors.tertiary,
    0.18,
    20,
    0,
    Platform.OS === "android" ? 8 : 0
  ),

  error: createShadow(
    colors.error,
    0.18,
    20,
    0,
    Platform.OS === "android" ? 8 : 0
  ),
} as const;

/**
 * ============================================================================
 * Component Presets
 * ============================================================================
 */

export const shadows = {
  /**
   * Bento cards
   */
  card: elevation.sm,

  /**
   * Active AI card
   */
  activeCard: {
    ...elevation.md,
    ...glow.primary,
  },

  /**
   * Floating widgets
   */
  floating: elevation.lg,

  /**
   * FAB
   */
  fab: {
    ...elevation.lg,
    ...glow.primary,
  },

  /**
   * Modal
   */
  modal: elevation.xl,

  /**
   * Dropdown
   */
  menu: elevation.md,

  /**
   * Toast
   */
  toast: elevation.lg,

  /**
   * Input focus
   */
  inputFocus: glow.primary,

  /**
   * Error focus
   */
  inputError: glow.error,

  /**
   * Success state
   */
  success: glow.primary,

  /**
   * Processing indicator
   */
  processing: glow.secondary,
} as const;

/**
 * ============================================================================
 * AI Pulse
 * ============================================================================
 */

export const pulseShadow = {
  idle: createShadow(
    colors.primary,
    0.08,
    10,
    0,
    2
  ),

  active: createShadow(
    colors.primary,
    0.20,
    24,
    0,
    10
  ),

  thinking: createShadow(
    colors.secondary,
    0.20,
    24,
    0,
    10
  ),
} as const;