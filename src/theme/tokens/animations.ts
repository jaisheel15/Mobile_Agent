// theme/tokens/animations.ts

/**
 * ============================================================================
 * Durations (ms)
 * ============================================================================
 */

export const duration = {
  instant: 0,

  fastest: 100,

  fast: 150,

  normal: 250,

  medium: 350,

  slow: 500,

  slower: 800,

  pulse: 1200,

  breathe: 1800,

  thinking: 1400,
} as const;

/**
 * ============================================================================
 * Scale
 * ============================================================================
 */

export const scale = {
  none: 1,

  pressed: 0.98,

  hovered: 1.01,

  active: 1.03,

  fabExpanded: 1.08,

  pulseMin: 0.95,

  pulseMax: 1.08,
} as const;

/**
 * ============================================================================
 * Opacity
 * ============================================================================
 */

export const opacity = {
  hidden: 0,

  faded: 0.4,

  disabled: 0.5,

  visible: 1,

  glowMin: 0.15,

  glowMax: 0.45,
} as const;

/**
 * ============================================================================
 * Translation
 * ============================================================================
 */

export const translate = {
  none: 0,

  cardPress: 2,

  modal: 40,

  toast: -40,

  fab: -60,
} as const;

/**
 * ============================================================================
 * Rotation
 * ============================================================================
 */

export const rotation = {
  none: "0deg",

  loading: "360deg",
} as const;

/**
 * ============================================================================
 * Spring Presets
 * ============================================================================
 */

export const spring = {
  smooth: {
    damping: 18,
    stiffness: 180,
    mass: 1,
  },

  soft: {
    damping: 20,
    stiffness: 140,
    mass: 1,
  },

  snappy: {
    damping: 14,
    stiffness: 280,
    mass: 0.9,
  },

  bounce: {
    damping: 10,
    stiffness: 220,
    mass: 1,
  },
} as const;

/**
 * ============================================================================
 * Timing Presets
 * ============================================================================
 */

export const timing = {
  fast: duration.fast,

  normal: duration.normal,

  slow: duration.slow,
} as const;

/**
 * ============================================================================
 * Component Presets
 * ============================================================================
 */

export const animation = {
  /**
   * Buttons
   */
  buttonPress: {
    scale: scale.pressed,
    duration: duration.fast,
  },

  /**
   * Bento Cards
   */
  cardPress: {
    scale: scale.pressed,
    duration: duration.fast,
  },

  /**
   * FAB
   */
  fab: {
    scale: scale.fabExpanded,
    duration: duration.normal,
  },

  /**
   * Modal
   */
  modal: {
    translateY: translate.modal,
    duration: duration.medium,
  },

  /**
   * Toast
   */
  toast: {
    translateY: translate.toast,
    duration: duration.fast,
  },

  /**
   * Screen Transition
   */
  screen: {
    duration: duration.medium,
  },
} as const;

/**
 * ============================================================================
 * AI Animations
 * ============================================================================
 */

export const ai = {
  /**
   * Breathing Pulse
   */
  pulse: {
    minScale: scale.pulseMin,
    maxScale: scale.pulseMax,

    minOpacity: opacity.glowMin,
    maxOpacity: opacity.glowMax,

    duration: duration.pulse,
  },

  /**
   * Thinking Animation
   */
  thinking: {
    duration: duration.thinking,

    rotation: rotation.loading,
  },

  /**
   * Idle Agent
   */
  breathe: {
    minScale: 0.99,
    maxScale: 1.01,

    duration: duration.breathe,
  },

  /**
   * Message Appearing
   */
  message: {
    duration: duration.normal,

    translateY: 12,
  },
} as const;