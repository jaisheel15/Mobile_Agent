// theme/tokens/typography.ts

import { TextStyle } from "react-native";

/**
 * ------------------------------------------------------------------
 * Font Families
 * ------------------------------------------------------------------
 */

export const fontFamily = {
  heading: "Geist",
  body: "Inter",
  mono: "JetBrainsMono",
} as const;

/**
 * ------------------------------------------------------------------
 * Font Weights
 * ------------------------------------------------------------------
 */

export const fontWeight = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

/**
 * ------------------------------------------------------------------
 * Typography Scale
 * ------------------------------------------------------------------
 */

export const typography = {
  display: {
    fontFamily: fontFamily.heading,
    fontSize: 32,
    lineHeight: 40,
    fontWeight: fontWeight.semibold,
    letterSpacing: -0.6,
  },

  displayMobile: {
    fontFamily: fontFamily.heading,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: fontWeight.semibold,
    letterSpacing: -0.3,
  },

  h1: {
    fontFamily: fontFamily.heading,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: fontWeight.semibold,
  },

  h2: {
    fontFamily: fontFamily.heading,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: fontWeight.medium,
  },

  h3: {
    fontFamily: fontFamily.heading,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: fontWeight.medium,
  },

  title: {
    fontFamily: fontFamily.heading,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: fontWeight.medium,
  },

  bodyLg: {
    fontFamily: fontFamily.body,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: fontWeight.regular,
  },

  body: {
    fontFamily: fontFamily.body,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: fontWeight.regular,
  },

  bodySm: {
    fontFamily: fontFamily.body,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: fontWeight.regular,
  },

  caption: {
    fontFamily: fontFamily.body,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: fontWeight.regular,
  },

  label: {
    fontFamily: fontFamily.heading,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: fontWeight.medium,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  mono: {
    fontFamily: fontFamily.mono,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: fontWeight.regular,
  },

  monoSm: {
    fontFamily: fontFamily.mono,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: fontWeight.regular,
  },
} satisfies Record<string, TextStyle>;

/**
 * ------------------------------------------------------------------
 * Type Helpers
 * ------------------------------------------------------------------
 */

export type TypographyKey = keyof typeof typography;
export type TypographyStyle = (typeof typography)[TypographyKey];