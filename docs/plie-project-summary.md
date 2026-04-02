# Plié — Project Summary v8.0
*Last updated: April 2026. Reflects T51–T65 and all intervening ticket work.*

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
- FAB: Log a session / Add a correction / Set a goal / Save a note
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
                dimensionNames, skillCategories, assessments, learnSections
                (Skills, Pointers, Conditioning, Musicality, Repertoire, Glossary…),
                profileCapabilities, stageLabels, armPositions
                Note: learnSections.conditioning.name = "Conditioning" (not "Conditioning & Drills")

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
- **EB Garamond italic, --ink-2, `--fs-h1` (26px)** — tab screen titles (The Barre, Goals, Learn, Profile)
- **EB Garamond italic, --ink, `--fs-title` (24px)** — skill names on cards and detail pages, sheet headings
- **DM Sans 600** — everything inside sheets and overlays; section headings within sheets — never EB Garamond inside a sheet or overlay
- **DM Sans 600, `--fs-small` (13px)** — skill names in In Focus cards on The Barre (not EB Garamond)
- **DM Sans** — all UI text, labels, body
- **Georgia**: RETIRED — do not use
- **Cormorant Garamond**: RETIRED — do not use
- Font sizes: display 40px / h1 26px / h2 20px / title 24px / body 15px / small 13px / caption 11px
- Section labels: DM Sans 600, uppercase/small-caps, --ink-5

### Colour tokens
```
--ink:   #1A1714   (primary text — never used as button fill)
--ink-2: #2D2520
--ink-3: #3D3530
--ink-4: #5C5149
--ink-5: #9A8E87   (muted / section labels)
--ink-6: #C8BFB8   (borders, disabled)

--gold:  #C4900C   (active nav, category labels, highlight star, key point dashes, input focus ONLY)
         Note: --gold-mid renamed to --gold; old --gold (#8A5E0A) retired

--brown-btn: #5A4030  (all primary buttons + FAB — unified; --btn-primary token removed)

--surface-warm: warm off-white page background
--surface-card: card/sheet background
--gold-soft: input border at rest
```

### Buttons
- Primary: `--brown-btn` fill (#5A4030), white text — same token as FAB. Never `--ink`.
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

### Layout — section headers
- `.barre-section-header` already carries `padding: 0 var(--sp-lg)` — do NOT wrap it in an additional padding div or the label will be double-indented
- Content below a section header (cards, lists) lives in its own `padding: 0 var(--sp-lg)` wrapper
- "see all →" buttons inside section headers use `.barre-see-all-btn` — no inline styles

### Free text display
- User-entered text (note body, goal body, skill notes): render with `nl2br()` — escapeHtml then `\n → <br>`
- Long text truncates at 4 lines via `renderClampedHtml(html, uid)` → `.text-clamped` + see more / hide
- "see more" / "hide": DM Sans 400, 12px, `--ink-5`, shown only when text actually overflows (measured post-render via `initClampedTexts(root)`)

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
- Goal progress markers — tap to toggle done state (onmousedown + ontouchend), persists
- Session delete, skill note delete
- Note blocks — contenteditable bullet entry with live — dash prefix, source chips, highlight star
- Note block star moved left of topic input; title field removed (T22)
- Session save — all block types create sessionSkills; corrections → correctionIds; observation → skillNotes; isHighlight saved on sessionSkill; edit flow cleans up stale skillNotes (T23)
- Recurring correction detection — ≥3 corrections for same skill across ≥2 sessions within 60 days sets isRecurring on all corrections for that skill (T27)
- Barre "in focus" — All / Recurring filter tabs; Recurring shows empty state if no in-focus skills qualify (T28)
- Highlights section on skill detail — shows highlighted sessionSkills and skillNotes with gold border, star to un-star; absent if empty (T26)
- Timeline session entries show gold ★ if any sessionSkill for that session has isHighlight (T26)
- User-entered text: line breaks preserved (nl2br), long text truncates at 4 lines with see more / hide (T24)
- Timeline date groups, icons, tappable sessions
- Timeline relative dates — Today / Yesterday / "3 Apr" / "3 Apr 2025" on all cards (T57)
- Timeline first entry — "Completed orientation quiz · [Level]" vs "Set own level · [Level]" (T57)
- Profile capability cards
- Profile — orientation quiz CTA (start or retake)
- Skill library search
- All Goals history page (grouped by year, expand on tap)
- Barre hero card — context-aware "Did you go today?" variants
- Barre "in focus" skill cards — DM Sans 600 name, EB Garamond italic quoted correction (T53)
- Barre "in focus" section label — "in focus" (not "corrections in focus") (T53)
- Barre "in focus" + "saved learning" sections — collapsible via label tap; state persisted (T65)
- Barre "saved learning" carousel — horizontal, 148×96px cards, hidden if no bookmarks (T65)
- Learn pointers — full section with insight, what to try, tap-to-save (T51)
- Learn bookmarks — toggle on any learn page, Bookmarked filter pill, stored in learnBookmarks (T50/T51)
- Learn tap-to-save — key points saveable as goal or correction from learn pages (T51)
- Learn filter pills — All / Bookmarked (disabled if empty) / In Focus (disabled if no flagged skills), multi-select (T65)
- Learn filtered results — search-results row layout (glossary-term-row), grouped by section (T65)
- All 4 tabs navigate correctly

### BUILT NOT VERIFIED (real device)
- Profile status card — level animal watermark, squircle avatar, insight sentence
- Focus area card stack — 5 areas, full + compact + unassessed states
- Focus area sheet — tabs, all sections, pointe dismiss
- Settings sheet — all sections, pointe toggle, reset, training state (Active/Resting/Recovering)
- Training states — affect hero card copy and Profile insight sentence
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
- Goal swipe-left delete uses native confirm() dialog — should be in-app discard pattern
- Goal pause/dismiss states unbuilt — swipe-left permanently deletes with no undo
- Swipe to dismiss predictive hero not implemented
- Source chip bug: observation blocks saving as correction — persists

### UPCOMING (decided, not yet built)
- Session logger: modular block types (Correction / Observation / Note / Goal / Photo); opens with one Correction block; blocks collapse to white card when inactive
- Corrections standalone: FAB "Add a correction" flow; session is context not parent
- Goal block inline in logger: creates appState.goals[] object on session save; blank titles ignored
- Duration picker: inline expanding list replacing pill chips in goal creator + goal block
- FAB restructure: 4 options (Log a session / Add a correction / Set a goal / Save a note)
- "Save a note" → standalone note (reflection); reflections are the note object, no separate type
- Source chips in note blocks → replaced by block type set at creation

### TODO / DEFERRED (Group E)

**T77 · Reminder affordance on corrections and notes** — STATUS: TODO, discuss before building
A saved correction or observation should have a path to becoming an actionable reminder — distinct from creating a goal. A reminder is "do this thing" (e.g. theraband ankle exercises); a goal implies measurable progress over time. Questions to resolve: does a reminder live in goals with a distinct type, or is it a separate object? What triggers it — push notification, hero card, or in-app surfacing only? Is it scoped per session or ongoing? Use goals as a workaround in the interim. Revisit when notification strategy (Section 29 of decisions doc) is fully specced.

### DEFERRED
- Training states: goal pause behaviour on state change
- Goals: goal pause / dismiss (non-destructive swipe-left)
- Goals: goal renewal / reactivation flow (lineage model, renewal prompt)
- Goals: All Goals page status grouping (paused / let go / completed within each year)
- Class type chips: square cards → pill chips
- Session logger: retrospective date floor removed (any past date allowed)
- Profile: signal lines replacing score bars
- Remaining Barre categories: Centre, Turns, Allegro, Pointe, Flexibility & strength
- Learn: Pointers content — additional areas beyond current MVP set
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

### appState (selected fields)
```js
// Preferences (persisted under plie:preferences)
hidePointe:     boolean  // hides pointe from profile, skills, goals
profilePicture: string   // data URL or key e.g. 'default-bun'
displayName:    string   // optional, shown on status card
trainingState:  'active' | 'resting' | 'recovering'

// Learn
learnBookmarks:    [{ pageType, itemId, createdAt }]
learnLineSaves:    [{ lineText, saveType, objectId, pageType, itemId }]

// UI state
collapsedSections: { inFocus?: boolean, savedLearning?: boolean }
                   // persisted under raw key 'collapsedSections' (not plie: prefixed)
```

### STORAGE_KEYS
```js
'plie:preferences'     // { hidePointe, profilePicture, displayName, trainingState }
'plie:learnBookmarks'  // [{ pageType, itemId, createdAt }]
'plie:learnLineSaves'  // tap-to-save state for learn key points
'collapsedSections'    // { inFocus, savedLearning } — note: no plie: prefix
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
9. **Learn library entry counts** — remove the count of entries from all Learn section cards (e.g. "27 entries", "4 pointers", "50 skills"). Discuss whether counts add value or create noise. Code: `renderLearnSectionCards()` in js/ui.js, the `count` variable and `.skill-category-count` element.
10. **Skill level labels** (beginner/improver/etc) — currently hidden with TODO comments in skill library cards, knowledge page hero, and skill detail hero. Decide whether to reinstate permanently or remove entirely.

---

## Level animals
Four levels only. Rabbit (elementary) and Rose/La Sylphide (upper-intermediate) retired.
```
beginner:    Duckling
improver:    Deer
intermediate: Swan
advanced:    Firebird
```
All: warm dark brown (#1A1714) linework, transparent PNG, embedded in illustrations.js

## Profile picture defaults
```
Available (3):   default-bun, default-male-1, default-male-2
Outstanding (9): contemporary female, gender neutral, girl ~8–10, boy ~8–10,
                 older female, South Asian female, East Asian female,
                 back view, hands in port de bras
```
