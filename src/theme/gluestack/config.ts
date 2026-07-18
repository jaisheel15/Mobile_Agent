// theme/gluestack/config.ts

import { darkTheme } from "../themes/dark";

const theme = darkTheme;

export const gluestackTheme = {
  colors: {
    background: theme.colors.background,

    surface: theme.colors.surface,

    card: theme.card.background,

    border: theme.card.border,

    text: theme.colors.text,

    textMuted: theme.colors.textMuted,

    primary: theme.colors.primary,

    primaryForeground: theme.colors.primaryForeground,

    secondary: theme.colors.secondary,

    tertiary: theme.colors.tertiary,

    success: theme.colors.success,

    warning: theme.colors.warning,

    error: theme.colors.error,
  },

  radii: {
    card: theme.radius.card,

    button: theme.radius.button,

    input: theme.radius.input,

    chip: theme.radius.chip,
  },

  spacing: {
    xs: theme.spacing[1],
    sm: theme.spacing[2],
    md: theme.spacing[4],
    lg: theme.spacing[6],
    xl: theme.spacing[8],
  },

  typography: {
    h1: theme.typography.h1,

    h2: theme.typography.h2,

    body: theme.typography.body,

    caption: theme.typography.caption,

    mono: theme.typography.mono,
  },
} as const;