# Plié — Information Architecture
Last updated: 26 April 2026, 16:30

*Build reference. For product principles and decisions, see plie-decisions.md. For visual and component spec, see plie-design-system.md. For screen hierarchy and navigation, see plie-sitemap.md.*

---

## Status Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Built and confirmed working |
| 🔧 | Built, not yet verified on real device |
| 📋 | Designed, not yet built |
| ⬜ | Not yet designed or built |

---

## Voice & Tone

- Addressing: "you/your" default
- Register: knowledgeable friend who also happens to dance — not a coach, not a system
- Formality: warm, precise — like a good ballet teacher
- Buttons: all lowercase
- Language: British English
- The app is not a teacher — it's a companion for outside the studio
- No em dashes. No AI commentary. No keyboard shortcuts surfaced to users.

---

## Technical Foundation

- Modular vanilla JS PWA, no framework, no build step ✅
- Hosted on GitHub Pages ✅
- Storage: localStorage (local cache); Supabase planned for sync/backup ⬜
- Cross-device sync / cloud backup ⬜
- Fonts: EB Garamond — page titles, sheet headings, large display text. DM Sans — card headings, skill names in lists, body, labels, metadata, buttons. Georgia and Cormorant Garamond retired. ✅
- Radius: 4px components, 9999px pills, 12px sheets/cards ✅

---

## App Shell & Chrome

### Launch & Loading

| Item | Status |
|------|--------|
| Splash screen / loading animation | 🔧 |
| App icon — all sizes iOS/Android | ⬜ |
| iOS launch screen | ⬜ |
| PWA manifest | ✅ |
| Service worker / offline caching | ✅ Basic |
| Offline state UI | ⬜ |
| Error states (network, storage full, failed save) | ⬜ |
| Loading states for async operations | ⬜ |

### Global Navigation ✅

- FAB (always visible above nav, hidden during onboarding/quiz/logger)
  - Log a session ✅
  - Add a correction 📋 (standalone — no session required)
  - Set a goal ✅
  - Save a note 📋
- Bottom nav: The Barre · Goals · Learn · Profile ✅ (4 tabs — Assess dissolved)
- Both hidden during onboarding, orientation conversation, session logger ✅

### Training States 🔧

- Active — default; full experience
- Resting — voluntary break; tone shifts, goals can pause
- Recovering — injury/illness; conditioning and goal prompts recede; nothing gated
- Set in Profile settings. Affects hero card copy only — no insight sentence.

### Empty States

| Screen | Status |
|--------|--------|
| The Barre — no active skills | 🔧 Basic |
| Goals — no goals | 🔧 Basic |
| Profile — not assessed | 📋 (needs full redesign) |
| Learn — no results | 🔧 Basic |
| All others | ⬜ |

### Push Notifications ⬜ All TBD

---

## Identity & Access ⬜ All TBD

Auth, login, registration, GDPR, age verification, privacy policy, terms — all deferred.

---

## Onboarding Flow 📋

```
Screen 1 — Welcome (single screen) 📋
  EB Garamond display statement + DM Sans utility list
  CTA: "let's go →" / "skip quiz, I want to set my level →"
  ↓
Orientation conversation (14 questions) ✅ (replaces Placement Quiz)
  ↓ complete / skip
Results screen ✅
  Level suggestion (adjustable before continuing)
  ↓ continue
Account creation prompt 📋 (skippable)
  ↓
The Barre — first visit (getting started cards visible) ✅
```

### Orientation conversation notes

- Replaces "placement quiz" — same 14 questions, new framing
- Questions cover: technique, movement, artistry, body, pointe
- Accessible from dimension detail sheet (reassess button) — not from Profile directly
- Pointe question: "not interested" option 📋
- Result suggests one of four levels: Duckling / Deer / Swan / Firebird
- She can adjust before continuing

---

## Session Logger ✅ (block redesign upcoming)

```
Session Logger
  ├── Date (autofills today, editable, retrospective — no floor) ✅
  ├── Session name / saved session dropdown ✅
  │     ├── Saved templates ✅
  │     ├── One-off entry ✅
  │     └── Add new session (name, location, class type, recurrence) ✅
  ├── Class type (pill chips carousel) 📋 (currently square cards — migrate)
  │     Technique class / Private lesson / Open class / Company class /
  │     Masterclass / Workshop / Rehearsal / Ballet retreat / Conditioning /
  │     Practice / More… → Add new…
  │     Practice: logger simplifies — no saved session, no location, date + title + notes only
  └── Modular blocks 📋 (upcoming redesign)
        Block types: Correction · Note · Goal · Intention · Highlight · Choreography
        Observation retired — migrated to Note on app open. Photo deferred.
        Opens with one blank Correction block
        Inactive blocks collapse to white card (type label + topic only)
        Block type label: small-caps DM Sans 600, --ink-5. Set at creation.
        Each block:
          ├── Type label (set at creation, not changeable) 📋
          ├── Highlight star (left of topic input) ✅
          ├── Topic input (skill/topic name, triggers skill suggestions) ✅
          ├── Linked skill (auto-detected or manual) ✅
          ├── Free text content area (contenteditable, live — dash prefix) ✅
          └── Swipe to remove ✅
        Source chips: removed. Block type replaces them.
        Goal block: creates appState.goals[] on save; blank title ignored 📋
        Duration picker: inline expanding list 📋
```

On save → writes to: Sessions, SessionSkills, Corrections, Goals, SkillNotes, Timeline, Skills ✅

Post-save prompt: "Session saved. You noted [skill], set a goal around it?" set a goal / not now 📋

---

## Tab 1 — The Barre ✅

```
The Barre
  ├── Header
  │     ├── "The Barre" — EB Garamond --fs-h1
  │     └── Duckling dropdown (top right) 📋
  │           Text-styled trigger, chevron. Full-width panel on tap:
  │             ├── Level name (EB Garamond display)
  │             ├── Persona description (truncated)
  │             └── my skills → → Skills index page
  │           Closes on tap outside
  │
  ├── Hero card carousel 📋 (currently single card)
  │     Swipeable. Dot indicators. Each card dismissable.
  │     Card types:
  │       ├── Session prompt (predictive or generic)
  │       │     Active: "Did you go today?" / named session if recurring
  │       │     Resting: "Taking a break" / "Anything worth noting?"
  │       │     Recovering: "Focusing on recuperating" / log anything useful
  │       ├── Orientation quiz nudge (8+ months trigger)
  │       ├── Dimension quiz nudge (10+ corrections in dimension, 3 months)
  │       ├── Pointer suggestion (recurring 8+ weeks / in-focus with few corrections)
  │       └── Goal renewal prompt (near end of commitment period)
  │     Priority ranking: FLAGGED — not yet decided
  │
  ├── Get started carousel ✅ (hidden once all 5 tasks complete)
  │     5 cards: Log your first class / Save a note / Set a goal /
  │              Try a pointer / Explore Learn
  │     Auto-complete. Tick only on done state. No congratulations copy.
  │
  ├── In focus ✅ (collapsible)
  │     Section label: "in focus" small-caps --ink-5, skill count right
  │     Filter chips: All / Recurring
  │     see all → → Timeline page (full page, back breadcrumb)
  │     Each skill card:
  │       ├── Skill name (DM Sans 600, --fs-small, --ink) ✅
  │       ├── Last correction (EB Garamond italic, quoted, --ink-3) ✅
  │       ├── Last worked on (--fs-small, --ink-5) ✅
  │       └── Swipe to remove ✅
  │     Recurring skill card: --coral-soft background, three dots + "recurring" metadata
  │     Hidden if no flagged skills. No empty state shown.
  │     In-focus skill with no corrections: "add a correction →" action
  │
  ├── Saved learning ✅ (collapsible horizontal carousel)
  │     Hidden if no bookmarks
  │     Each card (148×96px):
  │       ├── Type label (DM Sans 600, uppercase, --fs-caption, --ink-4)
  │       ├── Item name (DM Sans, --fs-small, --ink)
  │       └── For skills: active goals count · corrections count (--fs-small, --ink-5)
  │     Whole card tappable → Learn item
  │     Bookmarks removed via Learn page icon only
  │
  └── Browse by category
        ├── Barre work → Folder (8 skills) ✅
        ├── Centre work → ⬜
        ├── Turns → ⬜
        ├── Allegro → ⬜
        ├── Pointe work → ⬜ (hidden if hidePointe=true)
        └── Flexibility & strength → ⬜

Skills index page (from Duckling dropdown → "my skills →") 📋
  ├── Back breadcrumb → The Barre
  ├── Search bar
  └── Flat alphabetical list
        Each row: skill name (EB Garamond) · correction count · last session date
        All-time counts. No category label.
        Tappable → Skill detail page

Timeline page (from "see all →" on In Focus) 📋
  ├── Back breadcrumb → The Barre
  ├── Full chronological session history
  ├── Grouped: This Week · This Month · [Month name]…
  │     Whole card tappable. "SESSION" eyebrow removed.
  │     Starred sessions: gold border
  └── Each card:
        Session name (EB Garamond) · class type · skill count · correction count · date

Skill detail — personal view
  ├── Sticky header ✅
  ├── Skill name + pronunciation + difficulty ✅
  ├── [About [skill] →] → Skill knowledge page ✅
  ├── Progression summary (TBC) 🔧
  ├── Active goal (if linked) ✅
  ├── Corrections (default: 6 most recent AND past 6 months) ✅
  │     Grouped by session. Max 2 lines each. "see all →" for full record.
  ├── Highlights (if any starred notes) ✅
  ├── My notes ✅
  ├── Photos & videos 🔧 (grid shown, upload ⬜)
  └── Linked goals ✅
```

---

## Tab 2 — Goals ✅

```
Goals
  ├── Active goals ✅
  │     Each card:
  │       ├── Title ✅
  │       ├── Goal type label (DM Sans 600, --ink-3) ✅
  │       ├── Linked skill (name shown) 📋
  │       ├── Commitment period (duration display, not hard date) 📋
  │       ├── Progress markers with checkboxes ✅
  │       ├── Linked corrections ✅
  │       ├── How often (habit goals) 📋
  │       ├── Swipe right → complete ✅
  │       ├── Swipe left → delete (no confirm() dialog) 📋
  │       └── Edit ✅
  ├── "view past goals →" quiet link at bottom 📋
  ├── [Empty state] 🔧
  └── Goal creator (full sheet) ✅
        Entry question: "What are you working toward?"
        Three tabs: A skill · A feeling or state · A habit
        All fields visible at once. No progressive disclosure.
        Field persistence on tab switch: title + commitment period always persist.

        Skill goal:
          ├── Title ✅
          ├── What you're working toward ✅
          ├── Linked skill (auto-detect + combobox) ✅
          ├── What does progress look like? (unnamed progress markers) ✅
          └── Commitment period ✅

        Intention goal:
          ├── Title ✅
          ├── What you're working toward ✅
          └── Commitment period ✅

        Habit goal:
          ├── Title ✅
          ├── What you want to do ✅
          ├── How often ✅
          └── Commitment period ✅

        Commitment period presets:
          A week · Two weeks · A month · Three months · Custom date
        Discard confirmation: "discard goal?" — discard / keep editing
        Save: sheet closes, card appears at top of active goals. No fanfare.

All Goals page 📋
  ├── Full history grouped by year, then status within year
  │     Statuses: Completed / Expired / Renewed / Paused
  ├── Compact cards (tap to expand full detail)
  ├── Any past goal reactivatable → new instance linked to original
  │     "continued from [date]" quiet link connects instances
  └── Back breadcrumb
```

### Goal renewal 📋

Surfaces in hero carousel near end of commitment period. Options: renew / close with reflection / let it go.

---

## Tab 3 — Learn ✅

```
Learn
  ├── Search bar (accent-normalised, searches Learn content only) ✅
  ├── Filter pills: All / Bookmarked / In Focus ✅
  │     Bookmarked: disabled if no bookmarks
  │     In Focus: disabled if no flagged skills
  │     Multi-select: Bookmarked + In Focus can be active simultaneously
  │     Filtered results: .glossary-term-row list layout, grouped by section
  └── Section cards (when All active):
        ├── Skills ✅
        │     ├── Browse by category ✅
        │     ├── Search (accent-normalised) ✅
        │     ├── Filter: All / Skills I've recorded ✅
        │     └── Skill knowledge page ✅
        │           ├── Name + pronunciation + difficulty ✅
        │           ├── [My [skill] →] → Skill personal view ✅
        │           ├── Description ✅ (4 full, 11 stubs, 65+ to add)
        │           ├── Key points (tap-to-save as goal or correction) ✅
        │           ├── Musicality ✅
        │           ├── Common corrections ✅
        │           ├── Muscles involved ✅
        │           ├── Builds on / Leads to ✅
        │           ├── Bookmark toggle ✅
        │           └── Warm-up / Drills / Repertoire / Variations ⬜
        ├── Pointers ✅ (diagnostic content type)
        │     Small quiet indicator distinguishes from skill cards
        │     Each pointer: questions + insight + direction + inspiration
        │     MVP: épaulement / extension / pirouettes / footwork articulation
        │     Bookmark toggle ✅
        ├── Conditioning ✅
        │     Key points (tap-to-save as correction) ✅
        │     Bookmark toggle ✅
        ├── Musicality ✅
        ├── Repertoire ✅
        ├── Glossary ✅ (merged into skill library for MVP)
        ├── Famous ballets → stub 📋
        ├── Composers → stub ⬜
        └── Legendary dancers → stub ⬜
```

---

## Tab 4 — Profile 📋 (needs full rebuild)

```
Profile
  ├── Header: "Profile" EB Garamond centred · settings icon top right 🔧
  │
  ├── Hero area (--surface-warm) 📋
  │     ├── Identity row
  │     │     ├── Avatar (circle, user photo or initials) 🔧
  │     │     ├── Name (EB Garamond display) 📋
  │     │     └── Level badge (Duckling / Deer / Swan / Firebird) 🔧
  │     └── Training rhythm strip 📋
  │           Label: "TRAINING RHYTHM" + Sessions/Hours toggle (inline)
  │           Seven squares Mon–Sun, density shading (warm brown ramp)
  │           Shading = session frequency or hours (per toggle)
  │           Count below each square
  │           Footer: legend (less → more) + total sessions count
  │           see breakdown → → Training history page
  │
  ├── Month selector 📋
  │     Swipeable ← [Month Year] →
  │     Month card (white):
  │       ├── Sessions count + delta vs previous month
  │       ├── Corrections count + delta vs previous month
  │       └── Active goals · X completed this month
  │     First month note: "your first month — comparisons appear next month"
  │
  └── Your dimensions 📋
        Label: "YOUR DIMENSIONS" small-caps muted
        Four always-present cards: Technique · Movement · Artistry · The Body
        Pointe: opt-in dashed card below
        Each dimension card:
          ├── Gold left border accent (decoration colour, active dimensions)
          ├── Dimension name (EB Garamond)
          ├── Goal badge (if active goal linked)
          ├── Signal text: last session [date] · corrections count
          │     Corrections count = selected month
          └── Month correction count (right, decoration colour, "in [Month]")
        The Body: no sub-dimensions on card. Sub-dims in detail sheet only.
        Tapping any card → Dimension detail sheet (swipe up)

Training history page (from "see breakdown →") 📋
  ├── Back breadcrumb → Profile
  ├── "Every session logged. Tap any day to see what you worked on."
  ├── Year tabs (2026 / 2025 / 2024…)
  └── Monthly density grids
        Day-of-week rows × week columns
        Same warm density shading as rhythm strip
        Filled cell colour: TBD (gold family vs slate #8FA0A8)
        Star indicator on cells with highlighted notes: TBD
        Tap cell → Timeline filtered to that date

Dimension detail sheet (swipe up from dimension card) 📋
  ├── Eyebrow: "DIMENSIONS" small-caps
  ├── Dimension name (EB Garamond)
  ├── Three tabs as jump-to anchors on single scroll:
  │     corrections · focus · notes (notes — PINNED)
  │
  ├── CORRECTIONS section
  │     Grouped by session (most recent first)
  │     Session header: name + date + class type
  │     Default: 6 most recent AND past 6 months (both must be true)
  │     Max 2 lines per correction
  │     In-focus skills: quiet indicator on their session group header
  │     show more sessions → (older sessions)
  │     see all corrections → (full record, all-time)
  │
  ├── FOCUS section (expandable)
  │     Collapsed: "2 skills in focus · 1 active goal"
  │     Expanded:
  │       ├── In-focus skills (tappable → skill detail, "remove from focus")
  │       └── Active goals for this dimension
  │
  ├── MY SKILLS IN THIS DIMENSION
  │     Flat list. Skill name · correction count · last session. All-time.
  │     No category label. Tappable → skill detail.
  │
  ├── CONNECTED SESSIONS
  │     Sessions where dimension touched but no corrections logged
  │     (Sessions with corrections appear in the corrections section above)
  │
  └── ORIENTATION DATA (bottom, deemphasised)
        "1 of 4" result · last assessed date
        "reassess" button → orientation conversation (this dimension's questions)
        App-triggered reassess prompt: swipeable card with dot indicator
          Triggers: 8+ months consistent logging across multiple dimensions
        "What this means" static copy block
```

---

## Profile Timeline ✅

```
Timeline
  ├── Sessions (tappable → session detail) ✅
  ├── Orientation completions ✅
  │     "Completed orientation quiz · [Level]" if quiz answered
  │     "Set own level · [Level]" if user skipped to level picker
  ├── Milestones ✅
  ├── Reflections ✅
  └── Manual entries ✅

Date display:
  Today / Yesterday / "3 Apr" (same year, ≤3 months ago)
  "3 Apr 2025" (last year OR >3 months ago)
```

---

## Session Detail ✅

```
Session detail
  ├── Header (back, edit, delete) ✅
  ├── Session title (EB Garamond) + date + class type + location ✅
  ├── Notes & corrections blocks (read-only, grouped by block) ✅
  └── Linked skills (chips → skill personal view) ✅
```

---

## Orientation Conversation ✅

```
Orientation conversation
  ├── 14 questions ✅
  ├── Counter + progress bar ✅
  ├── calculateResults → level suggestion ✅
  └── Accessible from dimension detail sheet (reassess button) 📋
```

Assessment / Assess language removed throughout. Assess tab dissolved.

---

## Settings 🔧

```
Settings
  ├── Profile
  │     ├── Profile picture 🔧 (3 defaults, upload)
  │     └── Display name 🔧
  ├── My training
  │     ├── Pointe toggle 🔧
  │     └── Training state (Active / Resting / Recovering) 📋
  ├── Notifications ⬜
  ├── Display ⬜ (dark mode TBD)
  ├── Data
  │     ├── Export ⬜
  │     ├── Import ⬜
  │     └── Reset all data 🔧
  ├── Account ⬜ (pending auth)
  └── About
        ├── Privacy policy ⬜
        ├── Terms ⬜
        └── Version 🔧
```

---

## Social & Sharing ⬜ Post-MVP
## Store & Distribution ⬜ Deferred
## Monetisation ⬜ Deferred

---

## Dimension Model

| Dimension | Sub-dimensions | Notes |
|-----------|---------------|-------|
| Technique | (single) | Always present |
| Movement | Turns, Allegro | Always present |
| The Body | Flexibility, Strength, Turnout, Conditioning, Nutrition, Sleep & Recovery | Always present. Sub-dims opt-in individually. Appear in detail sheet only — not on Profile cards. |
| Artistry | (single) | Always present |
| Pointe | (single) | Opt-in |

Assessment is quiz-only. The app never derives or updates dimension levels from logged data.

---

## Illustrations

| Set | Count | Status |
|-----|-------|--------|
| Level animals — active (Duckling, Deer, Swan, Firebird) | 4 | ✅ embedded |
| Level animals — retired (Rabbit, Rose/Sylph) | 2 | Available as decorative assets |
| Profile picture defaults | 12 | 🔧 3 done, 9 outstanding |
| Onboarding hero | 1 | ⬜ |
| Empty state spot illustrations | 3 | ⬜ |
