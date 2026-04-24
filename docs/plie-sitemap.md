# Plié — Sitemap & Information Architecture
v2.0 — April 2026

---

## Global Elements (always present in app state)

- **FAB (+)** — opens menu from any screen with four options:
  - Log a session → Session Logger
  - Add a correction → Standalone correction (no session required)
  - Set a goal → Goal creator sheet
  - Save a note → Standalone note
- **Bottom nav** — The Barre / Goals / Learn / Profile
- Both hidden during onboarding, orientation conversation, and session logger

---

## Onboarding Flow (first launch only)

```
Onboarding screen
  "Writing it down changes what you remember. And what you remember changes how you dance."
  ↓ let's go → Orientation conversation
  ↓ skip quiz, I want to set my level → Level selector

Orientation conversation (14 questions across 5 dimensions)
  Questions cover: Technique, Movement, Artistry, The Body, Pointe
  Framed around confidence and experience, not capability
  Multi-select throughout — "generally feel true"
  ↓ complete → Results screen
  ↓ exit partway → Results screen (partial)
  ↓ skip quiz → Level selector

Level selector
  Four levels with persona descriptions: Duckling / Deer / Swan / Firebird
  "This is your starting point. Your dimensions will fill in as you log sessions."
  ↓ select level → The Barre (first visit)

Results screen
  Suggested level with persona name and description
  She can adjust before continuing
  ↓ continue → Account creation prompt
  ↓ skip account → The Barre (first visit)

The Barre — first visit
  Getting started cards (horizontal carousel below hero):
    - Log your first class → Session Logger
    - Save a note → Session Logger, note entry
    - Set a goal → Goal sheet
    - Try a pointer → Learn, filtered to Pointers
    - Explore Learn → Learn
  Cards complete automatically when action is done
  Section persists until all cards completed
```

---

## Session Logger (overlay — accessible from any screen via FAB)

```
Session Logger
  ├── Date (defaults to today, retrospective — no floor)
  ├── Session (optional)
  │     ├── Saved sessions dropdown
  │     │     └── [saved templates appear here]
  │     ├── One-off (default)
  │     └── Add new session →
  │           ├── Name
  │           ├── Location (optional)
  │           ├── Class type (pill chips carousel):
  │           │     Technique class / Private lesson / Open class /
  │           │     Company class / Masterclass / Workshop /
  │           │     Rehearsal / Ballet retreat / Conditioning /
  │           │     Practice / More…→ Add new…
  │           └── Repeats on (optional — day selector)
  ├── Class type (optional — same pill chip carousel as above)
  │     Pre-selected if saved session has a class type
  └── Notes & corrections blocks (unlimited, + button to add)
        Each block:
          ├── Block type label (CORRECTION / OBSERVATION / NOTE / GOAL)
          │     Set at creation. Shown as small-caps label above block.
          ├── Highlight star (★) — left of topic input
          ├── Topic input (skill or topic name)
          │     Triggers skill suggestion chips when typed
          │     Category (Barre · Centre · Turns · Allegro · Pointe · Musicality)
          │     Specific skill (optional — filtered by category, links to Learn)
          ├── Content area (free text, contenteditable, live — dash prefix per line)
          └── Source chips: Correction · Observation (both optional, no label)
        Each block removable with ×
        General/unlinked block has no source chips

Practice class type: logger simplifies — no saved session dropdown,
no location, no class type sub-selection. Date, optional title, notes only.

On save → writes to:
  - appState.sessions[]
  - Skills named in blocks → surface in The Barre as active
  - Timeline entry created
  - sessionSkill records created for all blocks with content (skillId: null for unlinked)
  - isHighlight saved on sessionSkill
  - storage.save()
```

---

## Tab 1 — The Barre

```
The Barre
  ├── Header
  │     ├── Title: "The Barre" (Georgia)
  │     └── Duckling dropdown (top right — text styled, chevron indicator)
  │           Opens full-width panel below header (warm surface):
  │             ├── Level name (Georgia display)
  │             ├── Persona description (truncated)
  │             └── my skills → → Skills index page
  │           Closes on tap outside
  │
  ├── Hero card (carousel — swipeable, dot indicators)
  │     Card types (priority ranking — FLAGGED FOR FURTHER DISCUSSION):
  │       - Session prompt (predictive if recurring session, generic if not)
  │       - Orientation quiz nudge (triggered: 8+ months consistent logging
  │           across multiple dimensions with corrections)
  │       - Dimension quiz nudge (triggered: 10+ corrections across 3+ sessions
  │           in a dimension in past 3 months)
  │       - Pointer suggestion (triggered: skill recurring 8+ weeks OR
  │           skill in-focus sustained period with few corrections)
  │       - Goal renewal prompt (near end of commitment period)
  │     Each card dismissable ("not now")
  │     Priority ranking model: FLAGGED — needs dedicated discussion
  │
  ├── In Focus section
  │     Label: "IN FOCUS" small-caps + skill count right
  │     Filter chips: All · Recurring
  │     see all → → Timeline (full session history)
  │     Each skill card:
  │       ├── Skill name (Georgia) + category label (gold small-caps, top right)
  │       ├── Most recent correction (italic, quote marks)
  │       ├── Last worked: [date]
  │       └── → Skill detail page
  │     Recurring skill card: coral-soft background, "recurring" metadata
  │     Empty state: "Your corrections will live here. Log your first class."
  │     Section absent entirely if no skills flagged in focus
  │
  └── Saved from Learn (collapsible horizontal carousel)
        Hidden if no bookmarks
        Each card: type label / item name / goal+correction counts (skills only)
        Tap → Learn item
        Bookmarks removed via Learn page only

Skills index page (from Duckling dropdown → my skills →)
  ├── Back breadcrumb → The Barre
  ├── Search bar
  └── Flat alphabetical list
        Each row:
          ├── Skill name (Georgia)
          ├── Correction count (past 6 months or 6 most recent — both must be true)
          └── Last session date
        No category label (category lives in dimension context)
        All-time correction count shown here (index/lookup context)
        Tap row → Skill detail page

Timeline page (from "see all →" on In Focus)
  ├── Back breadcrumb → The Barre
  ├── Full chronological session history
  ├── Grouped: This Week · This Month · [Month name] · [Month name]…
  │     "SESSION" eyebrow removed — redundant
  │     Whole card tappable
  │     Starred sessions: gold border
  └── Each card:
        ├── Session name (Georgia)
        ├── Class type · skill count · correction count
        └── Date (right aligned)
```

---

## Tab 2 — Goals

```
Goals
  ├── Active goals (top of screen)
  │     Each goal card:
  │       ├── Title
  │       ├── Goal type: Skill / Intention / Habit
  │       ├── Commitment period (duration-based, not hard date)
  │       ├── Linked skill(s) — skill goals only
  │       ├── Progress markers — skill goals only (unnamed checklist)
  │       └── Renewal prompt surfaced when nearing end of period
  ├── view past goals → → All Goals page
  └── set a goal → (also via FAB)
        Goal creator sheet (full sheet):
          Gate question: "What are you working toward?"
          Tabs: A skill · A feeling or state · A habit
          All fields visible at once per type

          Skill goal fields:
            - Title
            - What you're working toward
            - Linked skill (multiple choice, overridable)
            - What does progress look like? (unnamed progress markers)
            - Commitment period

          Intention goal fields:
            - Title
            - What you're working toward
            - Commitment period

          Habit goal fields:
            - Title
            - What you want to do
            - How often (every class / every week / set number / free text)
            - Commitment period

          Commitment period presets:
            A week · Two weeks · A month · Three months · Custom date

          Title persists on tab switch
          Discard confirmation if sheet closed with content entered
          Save → card appears at top of active goals, no fanfare

All Goals page
  All goals ever: completed / expired / renewed / paused
  Grouped by year, then status within year
  Compact cards, tap to expand
  Any past goal reactivatable → new instance, linked to original
  "continued from [date]" quiet link connects instances

Renewal options (surfaces on Barre hero card and at session close):
  - Renew (recommit, light editing allowed)
  - Close with reflection
  - Let it go (silent close, no reflection required)
```

---

## Tab 3 — Learn

```
Learn
  ├── Search (covers Learn content only — not notes, goals, corrections)
  ├── Filter chips: All · Pointers · Skills · Glossary · Repertoire · Conditioning
  ├── Skill library (80+ skills)
  │     Browse by category or search
  │     Skill knowledge page:
  │       ├── Name + pronunciation + difficulty
  │       ├── See my [skill] → → Skill detail page (personal view)
  │       ├── What it is
  │       ├── Key points (3–5 execution cues)
  │       ├── Musicality (counts, tempo, placement)
  │       ├── Common corrections
  │       ├── Muscles involved
  │       ├── Common combinations
  │       ├── Builds on → [linked skills]
  │       ├── Leads to → [linked skills]
  │       └── [accordion]
  │             ├── Warm-up and conditioning
  │             ├── Exercises and drills
  │             ├── Featured in repertoire
  │             └── Variations
  │
  ├── Pointers (diagnostic content type)
  │     Appear in-line with all content, filterable by chip
  │     Small quiet indicator distinguishes from skill cards
  │     Not every skill has a pointer
  │     MVP: épaulement / extension / pirouettes / footwork articulation
  │     Each pointer:
  │       ├── The questions (triangulate toward root cause)
  │       ├── The insight (the non-obvious thing)
  │       ├── The direction (exercises, teacher prompts, linked skills)
  │       └── The inspiration (specific dancer or performance — optional)
  │
  ├── Famous ballets → Ballet page
  │     ├── Synopsis
  │     ├── Choreographer + composer
  │     ├── Famous productions
  │     ├── Notable dancers
  │     └── Connected skills/variations
  │
  ├── Glossary → (coming)
  ├── Composers → (coming)
  ├── Variations → (coming)
  └── Legendary dancers → (coming)
```

---

## Tab 4 — Profile

```
Profile
  ├── Header: "Profile" (Georgia, centred) + settings icon (top right)
  │
  ├── Hero area (warm surface — #FDF8F3)
  │     ├── Identity row
  │     │     ├── Avatar (circle, user photo or initials)
  │     │     ├── Name (Georgia display)
  │     │     └── Level badge (Duckling / Deer / Swan / Firebird)
  │     │
  │     └── Training rhythm strip
  │           Label: "TRAINING RHYTHM" (small-caps) + Sessions/Hours toggle (inline)
  │           Seven squares Mon–Sun, density shading (warm brown ramp):
  │             Empty: #EDE8E4 · Light: #D4B896 · Medium: #B8925A · Dark: #8A6030
  │           Shading encodes session frequency or hours (per toggle)
  │           Count below each square
  │           Footer: legend (less → more) + total sessions logged (right)
  │           see breakdown → → Training history page
  │
  ├── Month strip
  │     ← [Month Year] → (swipeable, rolling history)
  │     Month card (white, bordered):
  │       ├── Sessions count + delta vs previous month
  │       ├── Corrections count + delta vs previous month
  │       └── Active goals · X completed this month
  │     First month note: "your first month — comparisons appear next month"
  │
  ├── Your dimensions
  │     Label: "YOUR DIMENSIONS" (small-caps muted)
  │     Each dimension card (tappable → Dimension detail sheet):
  │       ├── Gold left border accent (active dimensions)
  │       ├── Dimension name (Georgia)
  │       ├── Goal badge (if active goal linked)
  │       ├── Signal text: last session [date] · [n] corrections
  │       │     Corrections count reflects selected month
  │       └── Month correction count (right, decoration colour, "in [Month]")
  │     Always present: Technique · Movement · Artistry · The Body
  │     The Body: no sub-dimensions on card (sub-dims in detail sheet only)
  │
  └── Pointe card (opt-in, dashed border)
        "+ add" if not opted in

Training history page (from "see breakdown →")
  ├── Back breadcrumb → Profile
  ├── "Every session logged. Tap any day to see what you worked on."
  ├── Year tabs (2026 / 2025 / 2024…)
  └── Monthly density grids
        Each month: day-of-week rows × week columns
        Density shading: same warm brown/slate ramp as rhythm strip
        TBD: whether to use gold family or slate #8FA0A8 for filled cells
        Star indicator on cells containing highlighted/starred notes (TBD — small dot)
        Tap any cell → Timeline filtered to that date

Dimension detail sheet (swipe up from dimension card)
  ├── Eyebrow: "DIMENSIONS" (small-caps)
  ├── Dimension name (Georgia, large)
  ├── Three tabs (jump-to anchors on single scroll, not content-swapping tabs):
  │     corrections · focus · notes (notes tab — PINNED, pending detail sheet build)
  │
  ├── CORRECTIONS section
  │     Grouped by session (most recent first)
  │     Default view: 6 most recent corrections AND past 6 months — both must be true
  │     Empty state: "nothing from the past 6 months — see all to view your full record"
  │     Each session group:
  │       ├── Session name + date + class type (header row)
  │       └── Corrections (max 2 lines each, full text on tap)
  │     show more sessions → (older sessions)
  │     see all corrections → (full record, all-time)
  │
  ├── FOCUS section (expandable)
  │     Collapsed default: summary line ("2 skills in focus · 1 active goal")
  │     Expanded:
  │       ├── In-focus skills (flagged via skill.flagged boolean)
  │       │     Each skill tappable → skill detail
  │       │     Quiet "remove from focus" action
  │       └── Active goals for this dimension
  │             Goal title, commitment period, progress markers
  │
  ├── My skills in this dimension
  │     Flat list of every skill touched in this dimension
  │     Each row: skill name · correction count · last session
  │     No category label (dimension is the context)
  │     Tappable → skill detail
  │     All-time correction count (list/lookup context)
  │
  ├── Connected sessions
  │     Sessions where this dimension was touched
  │     Merged with corrections — session groups in corrections tab serve this purpose
  │     Standalone sessions (no corrections logged) shown here if any
  │
  └── Orientation data (bottom, deemphasised)
        "1 of 4" orientation result — quiet, small
        Last assessed date
        "reassess" button → Orientation conversation (filtered to this dimension)
        App-triggered reassess prompt: appears as swipeable card with dot indicator
          when trigger fires (8+ months consistent logging across multiple dimensions)
          Card is present only when triggered, otherwise absent

Skill detail page (personal view)
  ├── Back breadcrumb (context-aware: The Barre / Learn / Dimension detail)
  ├── Skill name + pronunciation
  ├── Progress indicator (TBC)
  ├── Learn more about [skill] → → Skill knowledge page
  ├── My corrections (from sessions, most recent first)
  │     Scoped: 6 most recent AND past 6 months (both must be true)
  │     show all → (full record)
  ├── My notes (free text, observation blocks)
  ├── Photos (grid)
  ├── Linked goals
  └── Last worked on: [date]
```

---

## Data Objects & Where They Surface

| Object | Created in | Surfaces in |
|---|---|---|
| Session | Session Logger | Timeline, The Barre (active skills), Dimension detail (connected sessions), Training history grid |
| Session template | Session Logger (new session form) | Session Logger dropdown |
| Note/correction block | Session Logger or standalone via FAB | Skill detail (corrections + notes), Dimension detail (corrections grouped by session), Timeline |
| sessionSkill record | Session save (all blocks with content) | Skill detail, Dimension detail, Timeline |
| Active skill | Session Logger (via block) or manual flag | The Barre (In Focus), Skills index |
| Goal | Goals tab or FAB | Goals tab, Barre hero card (renewal prompt), Skill detail, Dimension detail (Focus section) |
| Orientation result | Orientation conversation or level selector | Dimension detail (bottom, deemphasised), Duckling dropdown (level display) |
| Training rhythm data | Derived from sessions | Profile hero (rhythm strip), Training history page |
| Highlight (★) | Session Logger block or skill detail | Skill detail (Highlights section), Timeline (gold star on session card), Training history grid (dot indicator — TBD) |
| Recurring correction flag | Derived — recalculated on every session save | Barre skill cards (coral-soft), Barre filter (Recurring chip), Barre hero card (pointer nudge trigger) |

---

## Key Decisions & Constraints

| Decision | Detail |
|---|---|
| No all-time counts in summary views | Summary/card views always time-scoped. Default: past 6 months AND 6 most recent (both conditions). All-time only in list/index views. |
| Month selector on Profile | Affects dimension card correction counts only. Does not affect dimension detail sheet (always all-time in lists). |
| Corrections never expire | Old corrections recede naturally (not shown in default view) but are never deleted. Always accessible via "see all." |
| Recurring detection window | 60 days, ≥3 corrections across ≥2 distinct sessions. Recalculated on every save. |
| Assessment is quiz-only | App never updates dimension level from logged data. Prompts to reassess at meaningful moments only. |
| Sessions/hours toggle | Lives on Profile rhythm strip. User can switch at any time. Hours requires duration logged per session. |
| Training states | Active / Resting / Recovering. Adjusts tone and emphasis only. Nothing is gated. All features remain accessible in all states. |
| Corrections vs sessions | Both always shown together. No derived ratio surfaced. |
| Sub-dimensions | Appear only in dimension detail sheet. Not on Profile dimension cards. |
| Barre hero priority | FLAGGED FOR FURTHER DISCUSSION — ranking model for carousel cards not yet decided. |
| Notes tab in dimension detail | PINNED — pending rest of detail sheet design. |
| Training history grid colour | TBD — gold family vs slate #8FA0A8 for filled cells. |
| Star indicator in history grid | TBD — small dot on cells with highlighted notes. |
| Skill progress indicator | TBC — present in skill detail but mechanics not decided. |

---

## Screens Not Yet Built (priority order)

1. Session logger — notes/corrections blocks (revised block structure)
2. Skill detail — personal view (updated structure)
3. Skill knowledge page (Learn) — add Pointers
4. Goal creation flow (three types, commitment periods)
5. Dimension detail sheet (full redesign)
6. Training history page (density grid, year tabs)
7. Session detail view (tap a timeline entry)
8. Orientation conversation (replaces placement quiz)
9. Getting started cards (first-visit experience on The Barre)
10. All Goals page
11. Settings screen
12. Account creation / sign in
13. Ballet/composer/dancer/variation pages (Learn)
