---
name: Civic Health Pulse
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
  on-surface-variant: '#bbcabf'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#7bd0ff'
  on-secondary: '#00354a'
  secondary-container: '#00a6e0'
  on-secondary-container: '#00374d'
  tertiary: '#ffb95f'
  on-tertiary: '#472a00'
  tertiary-container: '#e29100'
  on-tertiary-container: '#523200'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#c4e7ff'
  secondary-fixed-dim: '#7bd0ff'
  on-secondary-fixed: '#001e2c'
  on-secondary-fixed-variant: '#004c69'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
  metric-xl:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.03em
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-lg: 1.5rem
  margin: 1rem
  margin-md: 1.5rem
  margin-lg: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

The design system is engineered for public officials, municipal data analysts, and citizens seeking immediate, unimpeachable insights into community health indicators. Its core character balances institutional gravitas with actionable clarity: vigilant, transparent, analytical, and authoritative without feeling bureaucratic or opaque.

The design movement combines **Modern High-Contrast Precision** with **Tactical Telemetry**. The UI adopts a dark, deep slate environment that acts as an optical backdrop, allowing data nodes, alert status states, and critical time-series graphs to read with unambiguous clarity. Elements feature crisp boundary definitions, subdued secondary chrome, and high-contrast typographic rendering that satisfies rigorous WCAG AAA legibility targets for critical alerts, and WCAG AA across all secondary telemetry layers. 

Micro-interactions are restrained and purposeful: status beacons pulse softly to indicate active stream ingestion, tabular rows highlight cleanly without color distortion, and metrics prioritize dense informational scanability over decorative embellishment.

## Colors

The palette is rooted in deep slate values, eliminating ocular fatigue during prolonged analytical operations while delivering optimal contrast for categorical metrics.

### Core Architecture
- **Primary (`#10b981` / Emerald-500)**: Serves as the primary baseline state, operational stability indicator, and positive trajectory signifier.
- **Secondary (`#38bdf8` / Sky-400)**: Used for analytical anchors, interactive controls, non-critical telemetry traces, and active data filters.
- **Tertiary (`#f59e0b` / Amber-500)**: Denotes conditional alerts, threshold warnings, and moderate surveillance anomalies requiring review.
- **Critical / Negative (`#ef4444` / Rose-500)**: Reserved strictly for severe threshold violations, emergency health advisories, and system degradation indicators.
- **Neutral Canvas (`#0f172a` / Slate-950)**: Deep substrate ensuring absolute visual separation between ambient background and content surfaces.

### Surface System
- **Layer 0 (Canvas)**: `#0f172a` (Base view canvas)
- **Layer 1 (Card / Container Surface)**: `#1e293b` (Elevated card panels, persistent drawers)
- **Layer 2 (Interactive / Sub-surface)**: `#334155` (Hover states, table header fills, segmented switches)
- **Borders & Rules**: Subdued cool borders (`#334155` at 60% opacity) and distinct boundaries (`#475569` at 100% opacity for focused items) establish structure without visual clutter.

## Typography

Typographic execution relies exclusively on Inter, utilizing its variable axis capability and contextual alternates for numerical data (`tnum`, `cv05`, `cv08`). Tabular figures (`font-variant-numeric: tabular-nums`) must be applied globally to all statistical outputs, table rows, timestamps, and trend deltas to eliminate horizontal jitter during live telemetry updates.

Scale hierarchy emphasizes quick triage:
- **Metrics & KPIs (`metric-xl`, `headline-xl`)**: Monospaced numerical rendering with tight tracking ensures immediate identification of critical values.
- **Labels & Overlines (`label-sm`)**: Uppercase presentation with explicit `letterSpacing` (+0.05em) and 600 weight to define category headers without competing with primary data.
- **Legibility Guardrails**: Contrast against background slate `#0f172a` must remain above 7:1 for base body text (`#f8fafc`) and at least 4.5:1 for supporting labels (`#94a3b8`).

## Layout & Spacing

The layout employs a responsive 12-column fluid grid system with rigid vertical rhythm derived from a strict 4px/8px baseline grid.

### Breakpoints & Geometry
- **Mobile (< 640px)**: 4 columns, `margin` = `1rem` (16px), `gutter` = `0.75rem` (12px). All data metric cards collapse to single-column full-width tiles. Tabular grids switch to horizontal swipe containers or split summary cards.
- **Tablet (640px - 1024px)**: 8 columns, `margin-md` = `1.5rem` (24px), `gutter` = `1rem` (16px). Dual-column metric arrangements; secondary charts share horizontal rows.
- **Desktop (> 1024px)**: 12 columns, `margin-lg` = `2rem` (32px), `gutter-lg` = `1.5rem` (24px). Primary KPIs occupy 3-column slots (4 across) or 4-column master views. Tables span minimum 8 to 12 columns. Max canvas constraint locks at 1600px to maintain data peripheral sightlines.

Spacing rules dictate internal component density: cards maintain compact padding (`space-lg` desktop, `space-md` mobile) to prevent sparse viewport occupation and allow maximum real estate for comparative visualizations.

## Elevation & Depth

Visual hierarchy within this design system eschews multi-tier fuzzy skeuomorphic drop shadows in favor of **Tonal Layering** paired with **Low-Contrast Precision Outlines**. This keeps data points crisp without muddying dark-mode legibility.

### Surface Tiers
- **Ground (Level 0)**: `#0f172a` (Canvas).
- **Raised (Level 1)**: `#1e293b` with a 1px solid perimeter boundary of `rgba(255, 255, 255, 0.08)`. Used for analytics panels, metric cards, and static chart regions.
- **Elevated Overlay (Level 2)**: `#1e293b` combined with a soft, directional ambient shadow (`0 8px 24px -4px rgba(0, 0, 0, 0.5)`) and a crisper 1px border of `rgba(255, 255, 255, 0.14)`. Used for drill-down flyouts, filter dropdowns, and date-range modal overlays.

### Focus & Active States
To avoid masking edge lines, focused or active elements utilize an interior or exterior inset glow: `box-shadow: 0 0 0 2px #38bdf8`, preserving boundary geometry while signaling explicit user selection.

## Shapes

The design system implements a **Soft** shape language (`roundedness: 1`), prioritizing structural stability and information density over playful curves.

- **Base Radius (`0.25rem` / 4px)**: Applied to table row selections, inline badges, status pills, inputs, and button primitives. Keeps boundaries crisp and compact.
- **Large Radius (`0.5rem` / 8px)**: Applied to primary content cards, modal windows, chart canvases, and data grids.
- **Extra Large Radius (`0.75rem` / 12px)**: Restricted solely to high-level system modals or floating global filter toolbars.
- **Pill / Circular (Full)**: Reserved specifically for active pulse indicator dots, avatar badges, and metric progress-bar caps.

## Components

### Live Pulse Status Indicators
- **Structure**: A dual-ring visual beacon. The center dot is a solid 8px circle colored according to status (Emerald `#10b981`, Amber `#f59e0b`, Rose `#ef4444`).
- **Telemetry Pulse**: An absolute-positioned concentric ring that expands from 8px to 18px with an easing fade (`opacity: 0.75` to `0`) over a 2-second continuous loop.
- **Accessibility**: Accompanied by programmatic text and an explicit high-contrast textual badge (`STABLE`, `WATCH`, `CRITICAL`).

### Metric & KPI Cards
- **Structure**: Level 1 surface (`#1e293b`) with 1px border (`rgba(255, 255, 255, 0.08)`), 8px border-radius, and `space-lg` internal padding.
- **Layout**: Top row accommodates the metric label (`label-sm`, `#94a3b8`) and status indicator. Middle zone renders the main value (`metric-xl`, `#f8fafc`). Bottom zone houses trend direction arrows with percentage delta chips (`+2.4% vs last 7d`).

### Tabular Data Grids
- **Header**: `#0f172a` fill, uppercase `label-sm` text in `#64748b`, height fixed at 36px, with 1px bottom border `#334155`.
- **Rows**: Alternating row backgrounds are avoided; instead, utilize a 1px border-bottom (`#1e293b`) on canvas, or solid `#1e293b` rows on Level 1 cards.
- **Interactive State**: Hover transitions row background to `#334155` at 50% opacity. Numerical columns align right; status and labels align left.

### Buttons & Interactive Controls
- **Primary Action**: Emerald background (`#10b981`), high-contrast dark slate text (`#022c22`), weight 600, height 36px, horizontal padding `space-md`. Hover shifts to `#059669`.
- **Secondary Action**: Surface `#1e293b`, 1px border `#334155`, text `#f8fafc`. Hover shifts background to `#334155`.
- **Critical Action**: Deep red surface (`rgba(239, 68, 68, 0.12)`), 1px solid `#ef4444`, text `#ef4444`.

### Input Fields & Selectors
- **Container**: Height 36px, background `#0f172a`, border 1px solid `#334155`, text `#f8fafc`, typography `body-md`.
- **Focus**: Border color shifts to `#38bdf8` with an accompanying outline of `0 0 0 1px #38bdf8`.

### Status Badges & Chips
- **Geometry**: Height 20px, radius 4px, padding 2px 8px, typography `label-sm`.
- **Coloring**: Rendered using a subtle tinted alpha fill (15% opacity) coupled with a solid text and border token:
  - Nominal: bg `rgba(16, 185, 129, 0.15)`, text `#34d399`, border `rgba(16, 185, 129, 0.3)`.
  - Warning: bg `rgba(245, 158, 11, 0.15)`, text `#fbbf24`, border `rgba(245, 158, 11, 0.3)`.
  - Critical: bg `rgba(239, 68, 68, 0.15)`, text `#f87171`, border `rgba(239, 68, 68, 0.3)`.