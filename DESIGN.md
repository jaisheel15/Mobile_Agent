---
name: Synthetic Intelligence Interface
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#849495'
  outline-variant: '#3b494b'
  surface-tint: '#00dbe9'
  primary: '#dbfcff'
  on-primary: '#00363a'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#006970'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#fff5de'
  on-tertiary: '#3b2f00'
  tertiary-container: '#fed639'
  on-tertiary-container: '#715d00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#ffe179'
  tertiary-fixed-dim: '#eac324'
  on-tertiary-fixed: '#231b00'
  on-tertiary-fixed-variant: '#554500'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  margin-mobile: 1.25rem
  gutter-mobile: 0.75rem
  card-padding: 1.5rem
  stack-gap: 1rem
  bento-unit: 160px
---

## Brand & Style

This design system is built for an "Agent OS" environment—a high-tech, mobile-first interface designed to feel like an extension of the device's hardware. The brand personality is **minimalist, futuristic, and highly functional**, prioritizing utility over decorative flourish.

The aesthetic blends **Modern Bento Grid** layout principles with subtle **Glassmorphism**. It evokes a sense of "Ambient Intelligence" where the UI feels like it lives behind the glass, appearing only when needed. The target audience is power users and early adopters who value precision and a sophisticated, dark-mode-centric workspace. The emotional response should be one of calm, focused efficiency and cutting-edge reliability.

## Colors

The palette is rooted in a deep, nocturnal spectrum to maximize contrast and focus. 

- **Primary (Electric Cyan):** Reserved for active AI states, processing indicators, and primary action buttons. It represents the "energy" of the system.
- **Secondary (Soft Violet):** Used for auxiliary AI suggestions, secondary highlights, and "thought" states where the agent is synthesizing information.
- **Neutrals:** A range of Slate Grays and Deep Charcoals provide the structural foundation. 
- **Surface Strategy:** Backgrounds utilize true blacks (#020617) to blend into OLED screens, while cards use semi-transparent slates to create depth through layering rather than just color shifts.

## Typography

The typography system uses a tri-font approach to balance technical precision with readability. 

1. **Geist (Headlines):** Provides a sharp, modern, and developer-friendly aesthetic for titles and headers.
2. **Inter (Body):** The workhorse font, ensuring maximum legibility for long-form agent responses and user messages.
3. **JetBrains Mono (Labels/Technical):** Used for metadata, status indicators, and "system logs" to reinforce the OS-level feeling of the application.

Scaling is aggressive; desktop headers are reduced significantly for mobile to ensure "Bento" cards remain legible without excessive scrolling.

## Layout & Spacing

The layout follows a **Fluid Bento Grid** model. On mobile, this typically translates to a 2-column grid where elements can span 1 or 2 columns (full width). 

- **Grid Logic:** Use a 4-pixel base unit for all spacing. 
- **Bento Cards:** Cards should have a consistent 12px or 16px gutter between them. 
- **Safe Areas:** Adhere to strict 20px (1.25rem) side margins to prevent content from touching the edge of the device frame.
- **Responsiveness:** On larger mobile screens (e.g., Foldables), the grid expands to 4 columns while maintaining the same aspect ratios for the "Bento" units.

## Elevation & Depth

Depth is achieved through **Tonal Layering and Glassmorphism** rather than traditional drop shadows.

- **Background:** The base layer is a solid #020617.
- **Middleground (Cards):** Surfaces use a semi-transparent slate (#1E293B at 60% opacity) with a `backdrop-filter: blur(12px)`.
- **Borders:** Every card must have a 1px solid border. Use a top-down gradient for the border (Primary/Secondary at 30% opacity to Transparent) to simulate a subtle light source hitting the top edge.
- **Active State:** When an agent is active, the card should emit a subtle, localized glow (shadow with 20px blur, 0.15 opacity) in the color of the primary accent.

## Shapes

The design system utilizes high-radius corners to soften the "tech" aesthetic and make it feel more organic. 

- **Containers/Cards:** Use a 24px (1.5rem) corner radius. This is the "signature" shape of the OS.
- **Buttons/Inputs:** Follow the `rounded-lg` (1rem) standard to ensure they are distinct from the outer container shapes.
- **Small Elements:** Chips and indicators use a full pill-shape (999px) for maximum differentiation from the grid.

## Components

### Buttons
- **Primary:** Solid Cyan background with Black text. No shadow, but a subtle inner-glow on the top edge.
- **Ghost:** Transparent background with 1px Cyan border. Used for secondary actions.

### Bento Cards
- These are the primary containers. They must have a title (Label Caps) and a blurred background. Cards are interactive and should scale down slightly (0.98x) on press.

### AI Activity Indicators
- **The "Pulse":** A circular gradient using the Primary and Secondary colors. It should use a breathing animation (blur expansion) when the agent is processing.

### Input Fields
- Darker than the card background (#0F172A), bottom-aligned labels, and a 1px focused border that glows Cyan.

### Chips & Tags
- Used for "Suggested Actions" or "Agent Skills." These should be semi-transparent with a 0.5px border and mono-spaced text.

### Lists
- Items are separated by subtle horizontal lines (Border color at 0.5 opacity). Each list item should have a 16px vertical padding to ensure touch-target safety.