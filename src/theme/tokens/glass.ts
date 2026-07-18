// theme/tokens/glass.ts

import { colors } from "./colors";

/**
 * ============================================================================
 * Blur
 * ============================================================================
 */

export const blur = {
  none: 0,

  sm: 8,

  md: 12,

  lg: 20,

  xl: 28,
} as const;

/**
 * ============================================================================
 * Border
 * ============================================================================
 */

export const glassBorder = {
  width: 1,

  thin: 0.5,

  strong: 1.5,
} as const;

/**
 * ============================================================================
 * Opacity
 * ============================================================================
 */

export const glassOpacity = {
  light: 0.45,

  medium: 0.65,

  heavy: 0.85,
} as const;

/**
 * ============================================================================
 * Glass Presets
 * ============================================================================
 */

export const glass = {
  /**
   * Main bento cards
   */
  card: {
    backgroundColor: colors.glass.medium,

    borderColor: colors.outlineVariant,

    borderWidth: glassBorder.width,

    blur: blur.md,

    opacity: glassOpacity.medium,
  },

  /**
   * Modal / Bottom Sheet
   */
  modal: {
    backgroundColor: colors.glass.heavy,

    borderColor: colors.outline,

    borderWidth: glassBorder.width,

    blur: blur.lg,

    opacity: glassOpacity.heavy,
  },

  /**
   * Navigation Bar
   */
  navigation: {
    backgroundColor: colors.glass.heavy,

    borderColor: colors.outlineVariant,

    borderWidth: glassBorder.width,

    blur: blur.lg,

    opacity: glassOpacity.heavy,
  },

  /**
   * Input Fields
   */
  input: {
    backgroundColor: colors.surfaceContainerLow,

    borderColor: colors.outlineVariant,

    borderWidth: glassBorder.width,

    blur: blur.sm,

    opacity: 1,
  },

  /**
   * Chips
   */
  chip: {
    backgroundColor: colors.glass.light,

    borderColor: colors.outlineVariant,

    borderWidth: glassBorder.thin,

    blur: blur.sm,

    opacity: glassOpacity.light,
  },

  /**
   * Floating Widgets
   */
  floating: {
    backgroundColor: colors.glass.medium,

    borderColor: colors.outline,

    borderWidth: glassBorder.width,

    blur: blur.md,

    opacity: glassOpacity.medium,
  },
} as const;

/**
 * ============================================================================
 * Gradient Borders
 * ============================================================================
 */

export const gradients = {
  glassBorder: [
    "rgba(0,219,233,0.35)",
    "rgba(208,188,255,0.18)",
    "rgba(0,0,0,0)",
  ],

  active: [
    colors.primary,
    colors.secondary,
  ],

  pulse: [
    colors.primary,
    colors.secondary,
  ],
} as const;

/**
 * ============================================================================
 * Active Glow
 * ============================================================================
 */

export const glow = {
  primary: {
    color: colors.glow.primary,

    radius: 20,

    opacity: 0.15,
  },

  secondary: {
    color: colors.glow.secondary,

    radius: 20,

    opacity: 0.15,
  },

  error: {
    color: colors.glow.error,

    radius: 20,

    opacity: 0.15,
  },

  warning: {
    color: colors.glow.warning,

    radius: 20,

    opacity: 0.15,
  },
} as const;