// theme/tokens/radius.ts

/**
 * ------------------------------------------------------------------
 * Base Radius Scale
 * ------------------------------------------------------------------
 *
 * Raw radius values.
 * Components should generally use the semantic tokens below.
 */

export const radiusScale = {
  none: 0,

  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 32,

  full: 9999,
} as const;

/**
 * ------------------------------------------------------------------
 * Semantic Radius Tokens
 * ------------------------------------------------------------------
 */

export const radius = {
  /**
   * App containers
   */
  screen: radiusScale.none,

  /**
   * Bento cards
   */
  card: radiusScale.xl,

  /**
   * Dialogs / Bottom Sheets
   */
  modal: radiusScale.xl,

  /**
   * Standard buttons
   */
  button: radiusScale.lg,

  /**
   * Text Inputs
   */
  input: radiusScale.lg,

  /**
   * Floating Action Button
   */
  fab: radiusScale.full,

  /**
   * Pills / Chips
   */
  chip: radiusScale.full,

  /**
   * Avatars
   */
  avatar: radiusScale.full,

  /**
   * Badges
   */
  badge: radiusScale.full,

  /**
   * Small indicators
   */
  indicator: radiusScale.full,

  /**
   * Images inside cards
   */
  image: radiusScale.lg,

  /**
   * Dropdowns / Menus
   */
  menu: radiusScale.lg,

  /**
   * Tooltips
   */
  tooltip: radiusScale.md,

  /**
   * Progress bars
   */
  progress: radiusScale.full,
} as const;

/**
 * ------------------------------------------------------------------
 * Type Helpers
 * ------------------------------------------------------------------
 */

export type RadiusScale = typeof radiusScale;
export type Radius = typeof radius;