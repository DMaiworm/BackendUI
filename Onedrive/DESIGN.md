---
name: Proton Admin
colors:
  surface: '#faf8ff'
  surface-dim: '#d9d9e5'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3fe'
  surface-container: '#ededf9'
  surface-container-high: '#e7e7f3'
  surface-container-highest: '#e1e2ed'
  on-surface: '#191b23'
  on-surface-variant: '#434655'
  inverse-surface: '#2e3039'
  inverse-on-surface: '#f0f0fb'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#943700'
  on-tertiary: '#ffffff'
  tertiary-container: '#bc4800'
  on-tertiary-container: '#ffede6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#faf8ff'
  on-background: '#191b23'
  surface-variant: '#e1e2ed'
typography:
  h1:
    fontFamily: Manrope
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  h2:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  h3:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 24px
  margin: 32px
  max_width: 1440px
---

## Brand & Style

This design system is built for the "occasional administrator"—users who need to perform tasks quickly and accurately without feeling overwhelmed. The brand personality is **Welcoming, Organized, and High-Trust**, utilizing a **Corporate / Modern** design style that leans heavily into clarity and approachability.

The aesthetic prioritizes a "reduced cognitive load" philosophy. By utilizing a "Soft Minimalism" approach, the interface emphasizes functional whitespace and subtle depth over decorative elements. This ensures that administrative actions feel deliberate and safe, fostering a sense of competence and calm for the user.

## Colors

The palette is anchored by a vibrant **Primary Blue (#2563EB)**, which serves as the signal for interactive elements and brand presence. To maintain a professional and clean environment, the background uses a very soft "Off-White" (#F8FAFC) to reduce screen glare during extended use.

- **Primary:** Used for main actions, active states, and focus indicators.
- **Neutrals:** A spectrum of slate grays (#64748B) provides soft contrast for secondary text and borders.
- **Semantic Tones:** Success, Warning, and Error colors are saturated enough to be clear but are used sparingly with soft background tints to ensure they feel supportive rather than alarming.

## Typography

The typography system uses a pairing of **Manrope** for headings and **Inter** for body and UI elements. 

- **Manrope** provides a slightly more modern, geometric touch for titles, enhancing the "friendly but professional" tone.
- **Inter** ensures maximum legibility for data-heavy tables and forms. 
- **Line Spacing:** A generous scale is applied to body text (1.5x) to prevent dense blocks of text from appearing intimidating.
- **Hierarchy:** Bold weights are reserved for structural headings and labels to create a clear "scannability" path for the user.

## Layout & Spacing

The layout utilizes a **12-column Fluid Grid** with a fixed maximum width of 1440px to ensure readability on ultrawide monitors. 

- **Sidebar:** A fixed-width navigation sidebar (260px) provides persistent access to high-level modules.
- **Content Area:** Uses a "Card-on-Surface" model where the main workspace is the light gray background, and content lives in white containers.
- **Rhythm:** An 8px-based spacing system is used. Major sections are separated by 32px (xl), while related elements within a card use 16px (md) or 8px (sm) gaps.

## Elevation & Depth

Depth is achieved through **Ambient Shadows** rather than heavy borders. This creates a "lifted" effect that helps users distinguish between the background and interactive content.

- **Base Level (0):** Used for the main background.
- **Card Level (1):** A very soft, diffused shadow (0px 4px 12px rgba(0,0,0,0.05)) used for standard content containers.
- **Interactive Level (2):** Used for hover states on buttons or cards, increasing the shadow spread slightly to indicate interactivity.
- **Overlay Level (3):** Used for modals and tooltips, utilizing a more pronounced shadow to isolate the element from the background.

## Shapes

The design system adopts a **Rounded** shape language to reinforce the "friendly" and "approachable" narrative.

- **Standard Elements:** Buttons, input fields, and small cards use a **0.5rem (8px)** radius.
- **Containers:** Large dashboard cards and primary layout sections use a **1rem (16px)** radius.
- **Specialty:** Pill shapes (32px+) are reserved exclusively for status badges (e.g., "Active", "Pending") and toggle switches.

## Components

### Navigation Sidebar
A vertical navigation bar on the left with a clean white background and a subtle right border (#E2E8F0). Active states use a subtle blue background tint (#EFF6FF) and a 4px vertical primary blue stripe on the left edge.

### Cards
White surfaces with the "Level 1" shadow. Cards should include a 1px border (#F1F5F9) to maintain definition on low-contrast screens. Card headers should have a clear title and optional "Action" area (e.g., a "View All" link).

### Buttons
- **Primary:** Solid #2563EB with white text. 
- **Secondary:** Light gray ghost buttons with primary text. 
- **States:** Hover states should darken the background color by 10%.

### Contextual Help
- **Info Banners:** Full-width alerts within cards using a soft blue tint (#DBEAFE) to provide instructions or updates.
- **Tooltips:** Dark gray (#1E293B) backgrounds with small white text, triggered on hover of "info" icons next to complex labels.

### Form Inputs
Standard heights of 40px or 44px. Borders should be #CBD5E1, changing to #2563EB on focus with a 3px soft outer glow.