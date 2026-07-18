// theme/useTheme.ts

import { useThemeContext } from "./provider";

/**
 * ============================================================================
 * Main Theme Hook
 * ============================================================================
 */

export function useTheme() {
  const { theme, mode, setMode, toggleTheme } = useThemeContext();

  return {
    /**
     * Theme
     */
    theme,

    /**
     * Current Mode
     */
    mode,

    /**
     * Theme Controls
     */
    setMode,
    toggleTheme,

    /**
     * Semantic Colors
     */
    colors: theme.colors,

    /**
     * Components
     */
    button: theme.button,
    card: theme.card,
    input: theme.input,
    chip: theme.chip,
    agent: theme.agent,

    /**
     * Tokens
     */
    typography: theme.typography,
    spacing: theme.spacing,
    layout: theme.layout,
    bento: theme.bento,
    radius: theme.radius,
    glass: theme.glass,
    shadows: theme.shadows,

    /**
     * Animation
     */
    animation: theme.animation,
    ai: theme.ai,
    duration: theme.duration,
    spring: theme.spring,
  };
}