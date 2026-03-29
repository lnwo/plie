# Plié — Project Summary v7.0
*Last updated: March 2026. Reflects decisions from iCloud design system, summary, and decisions docs.*

## DEVELOPMENT PROTOCOL — STATUS TRACKING
```
CONFIRMED WORKING   — tested, no known bugs
BUILT NOT VERIFIED  — code exists, not confirmed on real device
PARTIAL             — core exists, edge cases or UI incomplete
DEFERRED            — spec'd, not started
KNOWN BUG           — identified, not yet fixed
```

---

## Navigation

**4 tabs**: The Barre · Goals · Learn · Profile
- Assess tab fully dissolved: orientation quiz accessible from Profile, check-in assessments deferred
- FAB: Log a session / Add a note / Set a goal
- "Add a note" = standalone note without a session, routes to simplified note logger

---

## app.js section map (post-refactor)
```
1. DATA MODELS     — mock data helpers, model utilities
2. UTILITIES       — dimension helpers, formatTimelineDate, normaliseStr,
                     appendTimelineEntry, attachSwipe
4. ONBOARDING      — single welcome screen, swipe gestures, routing
5. ORIENTATION     — 14 questions, counter + bar, calculateResults
8. INITIALISATION  — loadPersistedState, DOMContentLoaded routing
```

## js/ module map
```
js/data.js    — DATA: skills (15 + aliases), folders, questions, levelLabels,
                dimensionNames, skillCategories, assessments, learnSections,
                profileCapabilities, stageLabels, armPositions

js/state.js   — STORAGE_KEYS, storage adapter (save/load/clear),
                appState (including hidePointe, profilePicture, displayName)

js/router.js  — showScreen(), navigateTo()

js/ui.js      — All screen builders and render functions:
                Barre, Goals, Learn, Profile, Folder
                renderProfileStatus(), renderFocusCardStack(), renderFocusCard()
                openFocusAreaSheet(), renderFocusSheetContent()
                openSettings(), renderSettings()
                openPicPicker(), renderPicPicker()
                renderSkills(), togglePhonetic(), toggleFlag()
                Timeline, Goals CRUD, Session detail
                Skill library, Skill knowledge page, Skill detail personal view
```

---

## Design System (March 2026)

### Typography
- **Georgia** — all screen headings (h1, overlay titles, skill names on cards)
- **DM Sans** — all UI text, labels, body
- **Cormorant Garamond**: RETIRED — do not use
- Font sizes: display 36px / title 24px / heading 20px / body 16px / small 14px / caption 12px
- Section labels: DM Sans 600, small-caps, --ink-5

### Colour tokens
```
--ink:   #1A1714   (primary text, primary button fill)
--ink-2: #2D2520
--ink-3: #3D3530
--ink-4: #5C5149
--ink-5: #9A8E87   (muted / section labels)
--ink-6: #C8BFB8   (borders, disabled)

--gold:  #C4900C   (active nav, category labels, highlight star, key point dashes, input focus ONLY)
         Note: --gold-mid renamed to --gold; old --gold (#8A5E0A) retired

--brown-btn: #5A4030  (FAB only — violation if used elsewhere)

--surface-warm: warm off-white page background
--surface-card: card/sheet background
--gold-soft: input border at rest
```

### Buttons
- Primary: `--ink` fill (#1A1714), white text, dual border (outer 1px solid --ink, inner 1px solid --ink-3 inset)
- Secondary: outlined, --ink text
- FAB: --brown-btn background only
- Labels: always lowercase

### Inputs
- Background: #F9F5F0 (--surface-warm variant)
- Border at rest: `--gold-soft`
- Border on focus: `--gold`
- Radius: 8px

### Chips / pills
- Selected state: `--ink` (#1A1714) fill, white text — NOT gold

---

## Current feature status

### CONFIRMED WORKING
- localStorage persistence (all collections)
- Onboarding — single welcome screen + quiz routing
- Accent-insensitive search (normaliseStr)
- Swipe — 100px threshold, 120ms min, 8px dead zone
- FAB action sheet: Log a session / Add a note / Set a goal
- Goal creator — 3 types (skill / intention / habit), type tabs, progress markers
- Goal creator — skill auto-detection in title, correction linking, custom date picker
- Goal editing, categories, correction linking, milestones/progress markers
- Goal cards — friendly type labels, linked skill name, formatted commitment period, howOften display
- Session delete, skill note delete
- Note blocks — single free-text + source chips (Correction · Observation) + highlight star
- Timeline date groups, icons, tappable sessions
- Profile capability cards
- Profile — orientation quiz CTA (start or retake)
- Skill library search
- All Goals history page (grouped by year, expand on tap)
- Barre hero card — context-aware "Did you go today?" variants
- Barre skill cards — Georgia name, italic quoted correction, "view →" link
- All 4 tabs navigate correctly

### BUILT NOT VERIFIED (real device)
- Profile status card — level animal watermark, squircle avatar, insight sentence
- Focus area card stack — 5 areas, full + compact + unassessed states
- Focus area sheet — tabs, all sections, pointe dismiss
- Settings sheet — all sections, pointe toggle, reset
- Profile picture picker — 3 defaults, photo upload via FileReader
- Preferences persistence (plie:preferences)
- Collapsing hero IntersectionObserver on iOS
- Sticky headers with clip-path overflow fix
- Tap-to-save on knowledge key points
- Muscles expandable section
- Goal creator custom calendar (mirrors session logger calendar)
- Goal creator click-outside to dismiss
- All Goals history page

### KNOWN BUGS
- Touch target offset on iOS overlays (partially addressed)
- Duplicate timeline entries possible if saveSession called twice (guard: _isEdit)
- highlightMatch regex — Node.js false positive, browser-valid
- Observation blocks write a timeline entry via legacy praise path — should not
- isHighlight flag saved to corrections/skillNotes but never read in skill detail or timeline UI
- Recurring correction flag (isRecurring) never set to true — detection logic unwritten
- Goal swipe-left delete uses native confirm() dialog — should be in-app discard pattern
- Goal pause/dismiss states unbuilt — swipe-left permanently deletes with no undo

### DEFERRED
- Training states: Active / Resting / Recovering (settings toggle + goal pause behaviour)
- Goals: goal pause / dismiss (non-destructive swipe-left)
- Goals: goal renewal / reactivation flow (lineage model, renewal prompt)
- Goals: All Goals page status grouping (paused / let go / completed within each year)
- Note blocks: isHighlight surfaced in skill detail (Highlights section) and timeline
- Note blocks: recurring correction detection (threshold logic unwritten)
- Class type chips: square cards → pill chips
- Session logger: retrospective date floor removed (any past date allowed)
- Profile: signal lines replacing score bars
- Remaining Barre categories: Centre, Turns, Allegro, Pointe, Flexibility & strength
- Learn: Pointers content type (diagnostic, 4 MVP areas)
- Onboarding: collapse to single welcome screen; CTAs "let's go →" / "skip quiz →"
- Orientation quiz: pointe "not interested" option
- Orientation quiz: strength + turnout questions
- New dimension model: Technique / Movement / The Body / Artistry / Pointe
- Skill contributingDimensions[] field
- Focus area check-in assessments (event-triggered)
- Behavioural stage descriptors (5 stages × 5 areas — copy TBD)
- Insight sentence copy — full set per level
- Settings: training state toggle
- Settings: notifications, dark mode, data export, account/sync
- Privacy policy, terms of service
- Authentication / account system

---

## Data shapes

### appState additions (v5+)
```js
hidePointe:     boolean  // hides pointe from profile, skills, goals
profilePicture: string   // data URL or key e.g. 'default-bun'
displayName:    string   // optional, shown on status card
```

### STORAGE_KEYS
```js
'plie:preferences' // { hidePointe, profilePicture, displayName }
```

### Goal object
```js
{
  id, title, body,
  goalType: 'skill' | 'intention' | 'habit',
  skillId, dimensionId,
  progressMarkers: [{ text, done }],  // new — replaces milestones[]
  milestones: [...],                  // legacy — read via progressMarkers || milestones
  commitmentPeriod: 'This week' | 'Two weeks' | 'This month' | 'Three months' | 'YYYY-MM-DD',
  howOften: 'x3',                     // habit goals only
  correctionIds: [],
  completed: boolean,
  createdAt, updatedAt
}
```

### FOCUS_AREAS (runtime constant, not persisted)
```
Each area: id, name, icon, optIn?, subdims?, getDims(), getStats()
Order back→front: pointe · artistry · body · movement · technique
```

---

## TBD items requiring decisions
1. "How this fits" section label — placeholder, needs final copy
2. "Reassess this area" button text → "Retake orientation quiz" or similar
3. Behavioural stage descriptors — 5 stages × 5 areas, copy not written
4. Insight sentences — full set per level, partially written
5. Dark mode — not in CSS, decision needed before spec
6. Notification strategy — types and triggers need full spec
7. Teacher sharing — format and content TBD
8. Monetisation model — affects IA if paywall exists

---

## Level animals
```
beginner:           Duckling
elementary:         Rabbit
improver:           Deer
intermediate:       Swan
upper-intermediate: Rose (La Sylphide)
advanced:           Feather (Firebird)
```
All: warm dark brown (#1A1714) linework, transparent PNG, embedded in illustrations.js

## Profile picture defaults
```
Available (3):   default-bun, default-male-1, default-male-2
Outstanding (9): contemporary female, gender neutral, girl ~8–10, boy ~8–10,
                 older female, South Asian female, East Asian female,
                 back view, hands in port de bras
```
