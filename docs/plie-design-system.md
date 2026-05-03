# Plié Design System
## Component Reference
Last updated: 26 April 2026, 15:30

*Single source of truth for visual and interaction decisions in Plié. Use to audit existing screens and guide new build work. Where the codebase diverges from this document, the document wins unless a deliberate decision has been made to update it.*

*This document is intentionally non-prescriptive on details still being refined during polish. Principles and decisions are documented; pixel-level specifics will be locked down post-polish pass.*

*Context: Plié is a ballet training PWA built in vanilla JS, designed for dedicated adult ballet dancers. The visual register is quiet, warm, and precise — not sporty, not wellness-app, not productivity. Every design decision defers to the notebook principle: the app provides containers, not instructions.*

---

## 1. Foundations

### Surfaces

Four surface values. Use only these.

| Token | Hex | Use |
|---|---|---|
| `--background` | `#FAFAF8` | App ground. Never use white as the app background. |
| `--surface` | `#FFFFFF` | Cards and interactive objects that need cognitive chunking. Default card colour. |
| `--surface-warm` | `#FDF8F3` | Tactile moments only: session logger sheet, note blocks, recurring correction rows, Learn knowledge pages, bottom sheets. Not for general cards. |
| `--surface-raised` | `#FAF5EE` | Empty or dormant states within a warm context: paused goals, empty dimension cards. |

### Colour tokens — semantic

Every semantic colour has exactly one job. Do not use for any other purpose.

| Token | Hex | Job |
|---|---|---|
| `--gold` | `#B0842E` | Active nav state, category labels on skill cards, highlight star (active), key point dashes in Learn, input focus border |
| `--gold-soft` | `#EDE4C5` | Input border at rest, hero card background |
| `--gold-wash` | `#F5EDD6` | Level badge background, goal badge background, soft button fill |
| `--coral` | `#B76653` | Correction source label, delete action, alert/error state |
| `--coral-soft` | `#F0D5CF` | Recurring note row background at reduced opacity |
| `--sage` | `#748C5C` | Completed goal indicator, ticked progress marker |
| `--brown-btn` | `#5A4030` | All primary action buttons and FAB only |
| `--ink` | `#1A1714` | Primary text, actions |
| `--ink-2` | `#5C5149` | Secondary text |
| `--ink-3` | `#9A8E87` | Muted text, labels, captions |
| `--ink-4` | `#C8BFB8` | Disabled states, very muted |
| `--ink-5` | `#9A8E87` | Section labels, captions — alias of `--ink-3` |
| `--ink-6` | `#C8BFB8` | Borders, disabled — alias of `--ink-4` |

**Pixso → CSS token mapping (ink family)**

| Pixso name | Pixso hex | CSS token |
|---|---|---|
| Ink 1 | `#181715` | `--ink` (`#1A1714`) |
| H1 Text colour | `#5C5149` | `--ink-2` |
| Ink 3 | `#978E87` | `--ink-3` / `--ink-5` |
| Card Allcaps / Ink-4 | `#C3BDB9` | `--ink-4` / `--ink-6` |

`--ink-5` and `--ink-6` are aliases of `--ink-3` and `--ink-4` respectively, pending full token migration.

### Colour tokens — decoration

Four decoration-only tokens for visual elements: dimension card accents, bar charts, training history grid, ornamental detail. These carry no semantic meaning and are not locked to specific dimensions or features.

| Token | Hex | Character |
|---|---|---|
| `--dec-slate` | `#8FA0A8` | Cool, precise |
| `--dec-tan` | `#C4A882` | Warm, earthy |
| `--dec-mauve` | `#B5A8C0` | Soft, expressive |
| `--dec-sage` | `#A8B8A0` | Grounded, physical |

**Pixso → CSS token mapping (decoration family)**

| CSS token | CSS hex | Pixso equivalent |
|---|---|---|
| `--dec-slate` | `#8FA0A8` | Dusty Slate `#8FA0A8` — exact match |
| `--dec-tan` | `#C4A882` | Dusty Brick `#C9A898` — nearest warm earthy |
| `--dec-mauve` | `#B5A8C0` | Dusty Blush `#D4B5A8` — nearest muted warm |
| `--dec-sage` | `#A8B8A0` | Dusty Sage `#B8C4B0` — same character, small hex variance |

Pixso Dusty Terracotta (`#E49874`) has no CSS token counterpart. Use hex directly with a TODO comment if needed before a token is added.

---

## 2. Typography

### Typefaces

| Font | Role |
|---|---|
| **EB Garamond** | Page titles, sheet headings, large display text. Can be italic or upright depending on context. Never below 16px. |
| **DM Sans** | Everything else: card headings, session titles, skill names in lists, body, metadata, labels, buttons, chips, nav, captions. |

**Retired — do not use:** Georgia, Cormorant Garamond, DM Serif Display. Migrate on contact.

### DM Sans weights

Regular (400) and SemiBold (600) only. Note: button and FAB styles in styles.css currently use 500 (Medium) — target is 600, align in a future code ticket. Never 700.

### Type scale

| Token | Size | Use |
|---|---|---|
| `--fs-display` | 40px | EB Garamond. Onboarding and prominent display moments only. |
| `--fs-h1` | 26px | EB Garamond. Tab screen titles. |
| `--fs-h2` | 20px | EB Garamond. Sheet headings, sub-headings within screens. |
| `--fs-title` | 24px | EB Garamond. Overlay headings. |
| `--fs-body` | 15px | DM Sans 400. Body text, note content. |
| `--fs-small` | 13px | DM Sans 400. Card headings, skill names in lists, metadata. |
| `--fs-caption` | 11px | DM Sans 400. Captions, section labels, type labels. |

---

## 3. Spacing

8px base unit throughout.

| Token | Value | Use |
|---|---|---|
| `--sp-xs` | 4px | Internal chip padding (vertical), tight icon spacing |
| `--sp-sm` | 8px | Label to field, between cards in a list |
| `--sp-md` | 12px | Internal metadata row spacing |
| `--sp-lg` | 16px | Internal card padding (all sides) |
| `--sp-xl` | 24px | Field to field in a form, between distinct sections |
| `--sp-2xl` | 32px | Screen-level top padding |
| `--sp-3xl` | 48px | Bottom of scroll above nav |

---

## 4. Components

### Cards

| Property | Value |
|---|---|
| Background | `--surface` (`#FFFFFF`) |
| Border radius | 8px |
| Border | 0.5px solid rgba(26,23,20,0.10) |
| Padding | `--sp-lg` (16px) all sides |
| Gap between cards | 12px |

Never use `--surface-warm` as a card background unless it is a note block or sheet.

### Dimension cards (Profile)

Standard card spec with these additions:

| Property | Value |
|---|---|
| Left border accent | 3px solid, one of the decoration colours, active dimensions only |
| Correction count | Right-aligned, EB Garamond display size, decoration colour matching left border accent |
| Count label | "in [Month]" — DM Sans caption, muted |

Decoration colours assigned freely — not locked to specific dimensions.

### Note blocks

| Property | Value |
|---|---|
| Background | `--surface-warm` (`#FDF8F3`) |
| Border radius | 8px |
| Border | 0.5px solid rgba(26,23,20,0.08) |
| Padding | `--sp-lg` (16px) all sides |

Content area: contenteditable div with live `—` dash prefix per line via CSS `::before`. No textarea. No title field.

Header row: `[★] [topic input] [×]` — always this order.

Block type label: set at creation. Final six types: Correction · Note · Goal · Intention · Highlight · Choreography. Small-caps DM Sans 600, `--ink-5`, above the block header. Observation is retired — migrated to Note on app open.

Highlight star: unstarred = `--ink-6` outline; starred = `--gold` filled.

### Training rhythm strip (Profile hero)

Seven squares (Mon–Sun), equal width, 1:1 aspect ratio. Density shading:

| Level | Hex |
|---|---|
| Empty | `#EDE8E4` |
| Light | `#D4B896` |
| Medium | `#B8925A` |
| Dark | `#8A6030` |

Sessions/hours toggle sits inline right of the section label. Count shown below each square. Footer: legend (less → more) left, total sessions count right.

### Month selector (Profile)

Swipeable month navigation. Month name in EB Garamond. Correction counts on dimension cards update to reflect the selected month, labelled with the month name.

### Training history grid

Monthly grids grouped by year tabs. Day-of-week rows × week columns. Same density shading as the rhythm strip. Each cell tappable → Timeline filtered to that date. Star indicator (TBD — small dot) on cells containing highlighted notes.

### Free text display

| Rule | Implementation |
|---|---|
| Line breaks | `nl2br(str)` |
| Long text | `renderClampedHtml` — webkit-line-clamp: 4 |
| See more / hide | Shown only when text overflows |

### Buttons

One primary per screen maximum.

**Primary**
| Property | Value |
|---|---|
| Background | `--brown-btn` (`#5A4030`) |
| Text | White, DM Sans 600, `--fs-body`, lowercase |
| Border radius | 8px |
| Outer border | 1px solid `#7A5848` |
| Inner border | 1px solid rgba(255,255,255,0.10) |

**Secondary**
| Property | Value |
|---|---|
| Background | Transparent |
| Text | `--ink`, DM Sans 400, lowercase |
| Border | 1px solid rgba(26,23,20,0.35) |
| Border radius | 8px |

**Soft**
| Property | Value |
|---|---|
| Background | `--gold-wash` (`#F5EDD6`) |
| Text | `#8A5E0A`, DM Sans 400, lowercase |
| Border | None |

**Text link**
| Property | Value |
|---|---|
| Text | `--gold` for key navigation, `--ink` for neutral |
| Arrow | Always includes → |
| Case | Always lowercase |

**FAB**
| Property | Value |
|---|---|
| Background | `--brown-btn` (`#5A4030`) |
| Icon | White +, centred |
| Shape | Circle only |
| Count | One in the whole app |

FAB menu options (four):
- Log a session
- Add a correction (standalone — no session required)
- Set a goal
- Save a note

### Chips

Pill shape only. No square variants.

| State | Background | Text | Border |
|---|---|---|---|
| Default | White | `--ink-3` | 1px solid rgba(26,23,20,0.15) |
| Selected | `--ink` | White | None |
| Disabled | Any | `--ink-6` | 1px solid rgba(26,23,20,0.08) |

### Badges

| Property | Value |
|---|---|
| Background | `--gold-wash` |
| Text | `--gold`, DM Sans 600, `--fs-caption` |
| Shape | Pill |
| Use | Level indicator, goal count only |

### Input fields

All text inputs identical.

| Property | Value |
|---|---|
| Background | `#F9F5F0` |
| Border at rest | 1px solid `--gold-soft` |
| Border on focus | 1px solid `--gold` |
| Border radius | 8px |

### Section labels

| Property | Value |
|---|---|
| Font | DM Sans 600, small-caps or uppercase |
| Colour | `--ink-5` |
| Spacing above | 24px |
| Spacing below | 12px |

### Corrections display

| Property | Value |
|---|---|
| Correction text | EB Garamond italic, typographic quotes |
| Text colour | `--ink-3` |
| Meta row | Session name + date below the correction text |
| Meta font | DM Sans 400, `--fs-caption`, `--ink-5` |
| Grouping | Grouped by session; session header above each group |
| Default scope | 6 most recent AND within past 6 months — both conditions must be true |
| Empty state | "nothing from the past 6 months — see all to view your full record" |

### Hero card carousel (The Barre)

Swipeable carousel. Dot indicators when more than one card present. Each card individually dismissable.

Card types: session prompt / orientation quiz nudge / dimension quiz nudge / pointer suggestion / goal renewal prompt.

Priority ranking: **FLAGGED FOR FURTHER DISCUSSION.**

State-specific session prompt copy:

| State | Copy |
|---|---|
| Active, no recurring session | Generic log prompt |
| Active, recurring session today | Named session title leads |
| Resting | "Taking a break" / "Anything worth noting while you're away?" |
| Recovering | "Focusing on recuperating" / "You can still log anything useful — physio notes, what you can work on, things to remember." |

No motivational copy. No interpretation of absence. No comment on streaks or gaps.

### Recurring row

| Property | Value |
|---|---|
| Background | `#FDF0EE` |
| Indicator | Three dots `--ink-6` + "recurring" plain metadata text |
| Badge | None |

---

## 5. Navigation

### Bottom nav

Four tabs: The Barre · Goals · Learn · Profile.

| Property | Value |
|---|---|
| Active tab | `--gold` |
| Inactive tab | `--ink-5` |
| Labels | DM Sans 400, `--fs-caption`, lowercase |

The Assess tab is removed. Delete from codebase if present.

### Duckling dropdown (The Barre)

Level name as text-styled dropdown trigger top right — no pill background, chevron indicator. Tapping opens full-width panel below header on `--surface-warm`. Contains: level name (EB Garamond display) · truncated persona description · "my skills →" text link. Closes on tap outside. Pushes content down, does not float.

### FAB menu

Log a session / Add a correction / Set a goal / Save a note.

### Sheet headings

All sheet and overlay headings use `--fs-h2` (EB Garamond). Never `--fs-display` inside a sheet.

---

## 6. Swipe Pattern

Applies to: skill cards on The Barre, goal cards, hero prompt card, note blocks in the logger.

Does NOT apply to timeline entries.

Swipe labels never shown.

---

## 7. Copy Rules

| Rule | Detail |
|---|---|
| No em dashes | Use a comma or rewrite |
| No keyboard shortcuts | Remove all hints |
| No AI commentary | Facts only. "1 correction logged" not "Keep the record going." |
| No editorialising | No congratulations. Tick only on completion. |
| British English | Practise (verb), colour, etc. |
| Buttons lowercase | Always |
| Placeholder text | Specific, never generic. Three variants per field. |

---

## 8. Legacy Aliases

Never write new CSS using: `--text`, `--text-secondary`, `--text-muted`, shadow aliases, radius aliases. Migrate on contact.

---

## 9. Screen-level Decisions

### The Barre

| Element | Decision |
|---|---|
| Screen title | "The Barre" EB Garamond `--fs-h1` |
| Level | Duckling dropdown top right |
| Hero | Carousel — see above |
| In focus label | "in focus" small-caps `--ink-5`, skill count right, tappable to collapse |
| Skill name in card | DM Sans 600, `--fs-small`, `--ink` |
| Correction quote | EB Garamond italic, typographic quotes, `--ink-3` |
| See all → | Full Timeline page with back breadcrumb |

### Profile

| Element | Decision |
|---|---|
| Header | "Profile" EB Garamond centred, settings top right |
| Hero | Warm surface. Identity row (avatar · name · level badge) + rhythm strip as one unified block. No "training since." |
| Month selector | Below hero. Swipeable. Affects dimension card counts only. |
| Month card | Sessions · Corrections · Goals. Three facts only. No bar chart. |
| Dimension cards | Technique · Movement · Artistry · The Body always present. Pointe opt-in dashed card below. No sub-dimensions on cards. |
| Dimension card content | Name (EB Garamond) · goal badge · signal text · month correction count right |

### Dimension detail sheet

| Element | Decision |
|---|---|
| Eyebrow | "DIMENSIONS" small-caps |
| Title | Dimension name, EB Garamond |
| Tabs | Three jump-to anchors: corrections · focus · notes (notes PINNED) |
| Corrections | Grouped by session. 6 most recent AND past 6 months. Max 2 lines each. |
| Focus section | Expandable. In-focus skills + active goals for this dimension. |
| My skills | Flat list. Skill name · correction count · last session. All-time. No category label. |
| Orientation data | Bottom, deemphasised. "reassess" button. App-triggered prompt as swipeable card. |
| What this means | Static copy block per dimension. Stays. |

### Goals

| Element | Decision |
|---|---|
| Primary action | Top of tab. FAB also opens. |
| Creation | Full sheet. Gate question: A skill / A feeling or state / A habit. All fields visible. |
| Commitment periods | A week / Two weeks / A month / Three months / Custom date. |
| Goals tab | Active only. "view past goals →" at bottom. |

### Session Logger

| Element | Decision |
|---|---|
| Block types | Correction · Note · Goal · Intention · Highlight · Choreography |
| Source chips | Removed |
| Class type chips | Pill only |
| Practice | Standard class type, simplified logger |

---

## 10. What Does Not Exist

Explicitly retired. Remove from codebase if present.

| Pattern | Replacement |
|---|---|
| Georgia | EB Garamond |
| Cormorant Garamond | EB Garamond |
| DM Serif Display | EB Garamond |
| Correction / Praise / Reflection tabs | Block types set at creation |
| Observation block type string | Migrated to Note on app open — never use in new code |
| Source chips inside note blocks | Block type label |
| Square class type chips | Pill chips |
| Assess tab | Removed — four tabs only |
| Context strip on The Barre | Duckling dropdown |
| "Skills in focus" / "Corrections in focus" labels | "in focus" |
| Placement quiz language | Orientation conversation |
| Motivational hero copy | Removed |
| Completion congratulations | Tick only |
| Em dashes in UI copy | Not permitted |
| Keyboard shortcut hints | Removed |
| Bold (700) DM Sans | Not permitted |
| White as app background | Use `--background` |
| Progress bars on dimension cards | Removed |
| Signal lines on Profile dimension cards | Removed |
| "FOCUS AREA" eyebrow | "DIMENSIONS" |
| Sub-dimensions on Profile cards | Detail sheet only |
| All-time counts in summary views | Month-scoped or 6-month window |
