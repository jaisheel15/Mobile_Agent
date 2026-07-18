// theme/tokens/spacing.ts

/**
 * ------------------------------------------------------------------
 * Base 4pt Spacing Scale
 * ------------------------------------------------------------------
 *
 * Every spacing value in the app should come from here.
 * Never hardcode numbers like 18 or 22 in components.
 *
 */

export const spacing = {
  0: 0,

  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
  40: 160,
} as const;

/**
 * ------------------------------------------------------------------
 * Semantic Spacing
 * ------------------------------------------------------------------
 */

export const layout = {
  /**
   * Screen padding
   */
  screenHorizontal: spacing[5], // 20
  screenVertical: spacing[6],   // 24

  /**
   * Safe area content padding
   */
  safeArea: spacing[5],

  /**
   * Section spacing
   */
  section: spacing[8],

  /**
   * Gap between stacked elements
   */
  stack: spacing[4],

  /**
   * Card padding
   */
  card: spacing[6],

  /**
   * List item padding
   */
  listItemVertical: spacing[4],
  listItemHorizontal: spacing[5],

  /**
   * Grid gutters
   */
  gutter: spacing[3],

  /**
   * Buttons
   */
  buttonHorizontal: spacing[5],
  buttonVertical: spacing[3],

  /**
   * Inputs
   */
  inputHorizontal: spacing[4],
  inputVertical: spacing[3],

  /**
   * Chips
   */
  chipHorizontal: spacing[3],
  chipVertical: spacing[2],

  /**
   * Icon spacing
   */
  iconGap: spacing[2],

  /**
   * Modal padding
   */
  modal: spacing[6],
} as const;

/**
 * ------------------------------------------------------------------
 * Bento Layout
 * ------------------------------------------------------------------
 */

export const bento = {
  unit: 160,

  small: 160,

  medium: 336,

  large: 512,

  gap: spacing[3],

  radius: 24,
} as const;

/**
 * ------------------------------------------------------------------
 * Type Helpers
 * ------------------------------------------------------------------
 */

export type Spacing = typeof spacing;
export type Layout = typeof layout;