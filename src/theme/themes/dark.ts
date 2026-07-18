// theme/themes/dark.ts

import { colors } from "../tokens/colors";
import { spacing, layout, bento } from "../tokens/spacing";
import { radius } from "../tokens/radius";
import { typography } from "../tokens/typography";
import { glass } from "../tokens/glass";
import { shadows } from "../tokens/shadows";
import {
  animation,
  ai,
  duration,
  spring,
} from "../tokens/animations";

export const darkTheme = {
  mode: "dark",

  /**
   * ============================================================================
   * COLORS
   * ============================================================================
   */

  colors: {
    /**
     * Backgrounds
     */
    background: colors.background,

    surface: colors.surface,

    surfaceVariant: colors.surfaceVariant,

    card: colors.surfaceContainer,

    cardElevated: colors.surfaceContainerHigh,

    cardHighest: colors.surfaceContainerHighest,

    divider: colors.outlineVariant,

    border: colors.outlineVariant,

    overlay: colors.overlay.medium,

    /**
     * Text
     */

    text: colors.onSurface,

    textMuted: colors.onSurfaceVariant,

    textDisabled: colors.outline,

    textInverse: colors.inverseOnSurface,

    /**
     * Brand
     */

    primary: colors.primary,

    primaryForeground: colors.onPrimary,

    secondary: colors.secondary,

    tertiary: colors.tertiary,

    /**
     * Status
     */

    success: colors.primary,

    warning: colors.tertiary,

    error: colors.error,

    /**
     * Glass
     */

    glass: colors.glass.medium,

    glassStrong: colors.glass.heavy,

    /**
     * Glow
     */

    glowPrimary: colors.glow.primary,

    glowSecondary: colors.glow.secondary,

    glowError: colors.glow.error,

    glowWarning: colors.glow.warning,
  },

  /**
   * ============================================================================
   * BUTTONS
   * ============================================================================
   */

  button: {
    primary: {
      background: colors.primary,

      foreground: colors.onPrimary,

      border: colors.primary,
    },

    secondary: {
      background: colors.surfaceContainer,

      foreground: colors.primary,

      border: colors.primary,
    },

    ghost: {
      background: "transparent",

      foreground: colors.primary,

      border: colors.primary,
    },

    destructive: {
      background: colors.error,

      foreground: colors.onError,

      border: colors.error,
    },
  },

  /**
   * ============================================================================
   * INPUT
   * ============================================================================
   */

  input: {
    background: colors.surfaceContainerLow,

    border: colors.outlineVariant,

    placeholder: colors.outline,

    text: colors.onSurface,

    focusedBorder: colors.primary,

    errorBorder: colors.error,
  },

  /**
   * ============================================================================
   * CARD
   * ============================================================================
   */

  card: {
    background: colors.surfaceContainer,

    border: colors.outlineVariant,

    title: colors.onSurface,

    subtitle: colors.onSurfaceVariant,

    pressed: colors.surfaceContainerHigh,

    active: colors.primaryContainer,
  },

  /**
   * ============================================================================
   * CHIP
   * ============================================================================
   */

  chip: {
    background: colors.glass.light,

    border: colors.outlineVariant,

    text: colors.onSurface,

    activeBackground: colors.primary,

    activeText: colors.onPrimary,
  },

  /**
   * ============================================================================
   * AGENT
   * ============================================================================
   */

  agent: {
    thinking: colors.secondary,

    processing: colors.primary,

    success: colors.primary,

    warning: colors.tertiary,

    error: colors.error,
  },

  /**
   * ============================================================================
   * TOKENS
   * ============================================================================
   */

  spacing,

  layout,

  bento,

  radius,

  typography,

  glass,

  shadows,

  animation,

  ai,

  duration,

  spring,
} as const;

export type DarkTheme = typeof darkTheme;