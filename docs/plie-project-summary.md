# Plié — Project Summary v6.0

## DEVELOPMENT PROTOCOL — STATUS TRACKING
```
CONFIRMED WORKING   — tested, no known bugs
BUILT NOT VERIFIED  — code exists, not confirmed on real device
PARTIAL             — core exists, edge cases or UI incomplete
DEFERRED            — spec'd, not started
KNOWN BUG           — identified, not yet fixed
```

---

## app.js section map (post-refactor)
```
1. DATA MODELS     — mock data helpers, model utilities
2. UTILITIES       — dimension helpers, formatTimelineDate, normaliseStr,
                     appendTimelineEntry, attachSwipe
4. ONBOARDING      — 3 screens, swipe gestures, routing
5. ASSESSMENT      — 14 questions, counter + bar, calculateResults
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
                Barre, Assess, Goals, Learn, Profile, Folder
                renderProfileStatus(), renderFocusCardStack(), renderFocusCard()
                openFocusAreaSheet(), renderFocusSheetContent()
                openSettings(), renderSettings()
                openPicPicker(), renderPicPicker()
                renderSkills(), togglePhonetic(), toggleFlag()
                Timeline, Goals CRUD, Session detail
                Skill library, Skill knowledge page, Skill detail personal view
```

---

## Current feature status

### CONFIRMED WORKING
- localStorage persistence (all collections)
- Onboarding — all 3 screens, swipe, get started, skip, begin
- Onboarding routing — new vs returning user
- Accent-insensitive search (normaliseStr)
- Swipe — 100px threshold, 120ms min, 8px dead zone
- FAB action sheet
- Goal editing, categories, correction linking, milestones
- Session delete, skill note delete
- Praise → timeline + SkillNote
- Reflection → SkillNote
- Timeline date groups, icons, tappable sessions
- Profile capability cards
- Skill library search
- All 5 tabs navigate correctly

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

### DEFERRED
- Pointe question: add "not interested" option
- Strength + turnout assessment questions
- New dimension model: Technique / Movement / The Body / Artistry / Pointe
- Skill contributingDimensions[] field
- Focus area check-in assessments (event-triggered)
- Behavioural stage descriptors (5 stages × 5 areas — copy TBD)
- "How this fits" label — copy TBD
- "Reassess this area" button — copy TBD
- Insight sentence copy — full set per level
- Learn tab: glossary definitions, composers, variations, legendary dancers
- Skill library: 65+ skills to add (4 full, 11 stubs currently)
- Empty state illustrations
- Onboarding hero illustrations
- Settings: notifications, dark mode, data export, account/sync
- Privacy policy, terms of service
- Authentication / account system

### KNOWN BUGS
- Touch target offset on iOS overlays (partially addressed)
- Duplicate timeline entries possible if saveSession called twice (guard: _isEdit)
- highlightMatch regex — Node.js false positive, browser-valid

---

## New data shape (v5.0)

### appState additions
```js
hidePointe:     boolean  // hides pointe from profile, skills, goals, assess
profilePicture: string   // data URL or key e.g. 'default-bun'
displayName:    string   // optional, shown on status card
```

### STORAGE_KEYS additions
```js
'plie:preferences' // { hidePointe, profilePicture, displayName }
```

### FOCUS_AREAS (runtime constant, not persisted)
```
Each area: id, name, icon, optIn?, subdims?, getDims(), getStats()
Order back→front: pointe · artistry · body · movement · technique
```

---

## TBD items requiring decisions
1. "How this fits" section label — placeholder, needs final copy
2. "Reassess this area" button text — placeholder
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
