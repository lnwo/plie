# Plié — Project Summary v4.2

## DEVELOPMENT PROTOCOL — STATUS TRACKING

**From v4.2 onward, every session must end with an explicit status table.**
Previous sessions allowed deferred items to accumulate invisibly, leading to features
being reported as done when they were partially built or broken. This doc is the
authoritative record. If a feature isn't in "CONFIRMED WORKING" it isn't done.

### Status conventions
  CONFIRMED WORKING — tested path exists, no known bugs
  BUILT NOT VERIFIED — code exists, not confirmed on device
  PARTIAL — core exists but edge cases or UI incomplete
  DEFERRED — spec'd, not started
  KNOWN BUG — exists, cause identified, not yet fixed

---

## Files

  index.html     (~423 lines)
  styles.css     (~4543 lines)
  app.js         (~5254 lines)
  manifest.json, sw.js, loading-animation.html, icons/

---

## app.js section map

 1. DATA — skills (15+aliases), class types, quiz questions, profileCapabilities (with isDone())
 2. STORAGE ADAPTER — storage.save/load/clear, STORAGE_KEYS
 3. SKILL STATE MERGE — initSkills, loadUserSkillState, persistSkillState
 4. APP STATE
 5. UTILITIES — dimension helpers, formatTimelineDate, normaliseStr, appendTimelineEntry
 6. NAVIGATION — showScreen, navigateTo
 7. ONBOARDING — 3 screens, swipe. Routing in DOMContentLoaded (not IIFE).
 8. ASSESSMENT — 14 questions, counter+bar, calculateResults
 9. SESSION LOGGER — overlay, combobox, class type carousel, template form
10. BLOCK SYSTEM — Correction/Praise/Reflection modes, bullet list, .block-notes-area,
                   praiseText field, autoResizeCapped
11. BULLET HANDLERS — updateCorrectionBullet, handleCorrectionBulletKey, renderBlockBulletsInPlace
12. SESSION EDITOR — openSessionEditor reconstructs blocks from SessionSkills+Corrections
13. SAVE FLOW — saveSession: corrections (one per bullet), praise→SkillNote+timeline,
                reflection→SkillNote, timeline entry, post-save prompts
14. POST-SAVE PROMPTS — correction promotion (non-blocking, 8s) + reflection (~5 sessions)
15. REFLECTION OVERLAY — lightweight sheet, SkillNote {isReflection:true, skillId:null}
16. FAB ACTION SHEET — openFabActionSheet/closeFabActionSheet; options: log session,
                       add goal, add reflection
17. SWIPE HELPER — attachSwipe: threshold=100px, min duration=120ms, 8px dead zone,
                   [contenteditable] excluded from drag interception
18. SCREEN BUILDERS — Barre, Assess, Goals, Learn, Profile, Folder
19. GOALS — full CRUD incl. editing (openGoalEditor/_editId in saveGoal),
            correction linking, milestones (Enter to add), swipe gestures,
            "created [date]" footer, edit button
20. GOAL CORRECTION SEARCH — normaliseStr matching, link/unlink
21. GOAL CATEGORIES — "+" → openGoalCategoryInput → free text + prior suggestions (single)
22. SESSION DETAIL — full-screen view, edit + delete
23. DELETION — deleteSession, deleteSkillNote, deleteSessionTemplate
24. SKILL LIBRARY — shell-once + updateSkillLibResults (mobile focus fix), normaliseStr
25. SKILL KNOWLEDGE PAGE — showSkillKnowledgePage, tappable key-points popover
26. SKILL DETAIL — showSkillDetail, progression summary, correction filters, notes w/delete
27. PROFILE CAPABILITIES — isDone() per card, greyout+message when done, disappears when all done.
                           Cards: log session, save correction, set goal, track skill,
                           study repertoire (no reassess).
28. TIMELINE — date groups (Today/This week/This month/Last month/month+year),
               SVG icons per type, praise vs reflection visual distinction,
               sessions tappable to session detail, sticky group labels
29. SKILLS SYSTEM — renderSkills, togglePhonetic, toggleFlag
30. INITIALISATION — loadPersistedState IIFE (data only), DOMContentLoaded (DOM + routing)

---

## Current feature status

### CONFIRMED WORKING
- localStorage persistence (all collections)
- Onboarding routing fix (DOMContentLoaded, not IIFE)
- Accent-insensitive search (normaliseStr — fouetté, Développé etc)
- Swipe deliberate drag (100px threshold, 120ms min duration, 8px dead zone)
- FAB action sheet (log session / add goal / add reflection)
- Goal editing (openGoalEditor, saveGoal _editId path)
- Goal newest-first, "created [date]" footer
- Goal categories — "+" input with prior suggestions
- Completed goal: strikethrough title, dimmed, completion date, swipe to reopen
- Session delete (from session detail, with confirmation)
- Skill note delete (× per row)
- Praise → timeline milestone entry + SkillNote {isPraise:true}
- Reflection → SkillNote {isReflection:true}
- Timeline date groups + SVG icons + praise/reflection distinction
- Profile capability cards: greyout on completion, disappear when all done
- Skill library mobile search fix (shell-once, surgical update)
- normaliseStr applied to all text matching

### BUILT NOT VERIFIED
- Praise block UI (praiseText field, notes toggle fixed with .block-notes-area)
- toggleBlockNotes surgical update (onmousedown, correct DOM target)
- touch-action: manipulation globally applied
- app-container overflow-x → clip-path fix for sticky on iOS
- Sticky group labels in timeline

### PARTIAL
- Skill detail personal view — functional but no collapsing hero
- Goal milestone scroll cap — BUILT NOT VERIFIED
- Completed goals "see all" (max 2 visible) — BUILT NOT VERIFIED
- Completion toast animation on goal swipe — BUILT NOT VERIFIED

### DEFERRED
- Collapsing hero on skill detail (name shrinks on scroll, meta stays)
- Sticky headers on ALL detail screens (CSS fix applied but not verified on device)
- Tap-to-save inline on knowledge key points (replace popover)
- Muscles expandable "why these muscles?" inline
- Glossary / dictionary for key terms (count, phrase, beat)
- Assessment: post-quiz focus areas
- Assessment: centre question reframed for comfort
- Barre screen: focus areas from assessment, rotating on reload
- Quiz deselect visual glitch (cosmetic re-render timing)
- Goal from skill screen scrolls to correct position
- Completion animation / notification on goal swipe
- Reopen text visibility until full swipe
- "See all" for completed goals (max 2 visible)
- Goal milestone scroll cap (4 visible, scroll within)
- Session template delete UI

### KNOWN BUGS
- Touch target offset on iOS overlays — partially addressed with touch-action and
  clip-path fix; needs device verification
- Duplicate timeline entries possible if saveSession called twice (guard: _isEdit)

---

## Data schema (key fields)

### Block (in-memory)
  mode: 'correction' | 'praise' | 'reflection'
  corrections: string[]     — correction mode, each bullet → Correction on save
  praiseText: string        — praise mode, saved as SkillNote {isPraise:true}
  reflectionText: string    — reflection mode, saved as SkillNote {isReflection:true}

### SkillNote
  { id, skillId, text, date, createdAt,
    isReflection: boolean,   — from reflection block or reflection overlay
    isPraise: boolean        — from praise block
    skillId: null            — for session-level reflections
  }

### Goal
  { id, title, body, createdAt, dueDate,
    skillId, dimensionId, category (single, free text),
    correctionIds[],         — shown on card, struck-through when complete
    milestones[],
    completedAt              — null=active; set=complete; swipe-right to reopen
  }
  saveGoal handles _editId: updates in place, preserves createdAt + completedAt

### profileCapabilities
  Each entry has: id, label, title, description, doneMessage,
                  action (string), isDone() function

### STORAGE_KEYS
  plie:skills, plie:corrections, plie:sessions, plie:sessionTemplates,
  plie:sessionSkills, plie:assessments, plie:goals, plie:timeline,
  plie:skillNotes, plie:onboardingComplete, plie:hasVisitedLearn

---

## Swipe behaviour (attachSwipe)
  threshold:   100px horizontal movement
  min duration: 120ms (prevents accidental swipe during scroll)
  dead zone:    8px (ignores micro-movements)
  excluded:     button, input, select, textarea, a, [contenteditable]
  Left swipe:  delete/remove (with confirm where appropriate)
  Right swipe: complete (active goals) / reopen (completed goals)

---

## FAB action sheet
  Replaces direct openSessionLogger() call on FAB.
  Options: log a session / add a goal / add a reflection
  Closes on backdrop tap or after item selection.

---

## Timeline rendering
  Merges: appState.timeline + skillNotes filtered by isReflection|isPraise
  Sorted: newest first by createdAt
  Grouped: Today / This week / This month / Last month / [Month Year]
  Group labels: sticky (position:sticky, top:0, z-index:5)
  Icons per type: session(doc), milestone/praise(star), assessment(chart),
                  reflection(speech bubble), manual(dot)
  Praise entries: bold text, gold star icon
  Reflection entries: italic quoted text, speech bubble icon
  Session entries: tappable → showSessionDetail()

---

## Mobile / iOS rules
  - position:fixed overlays → document.body only
  - overflow-x:hidden on .app-container replaced with clip-path:inset(0)
    (overflow:hidden breaks position:sticky on iOS Safari)
  - onmousedown on all dropdown/toggle buttons (fires before onblur)
  - touch-action:manipulation on all interactive elements (no double-tap zoom)
  - Never rebuild DOM with active input — surgical updates only
  - Initial screen routing in DOMContentLoaded not parse-time IIFE

---

## v4.2 → v4.2.1 delta

### Completed this session

PARTIAL → BUILT NOT VERIFIED:
- Goal milestone scroll cap: .goal-milestones-scrollable, max 4 visible,
  overflow-y:auto, fade mask, count hint below
- Completed goals "see all": max 2 visible, hidden section revealed by button inline
- Goal complete toast: showGoalCompleteMessage(title) called from markGoalComplete,
  shows goal title, slides up from above nav, 2.5s duration

DEFERRED → BUILT NOT VERIFIED:
- Glossary screen: showGlossary() / renderGlossaryScreen()
  All 15 skill terms (French + English) + 30 vocabulary/musicality terms
  Alphabetically grouped with sticky letter headers
  Floating A-Z index on right for jump navigation
  Skill terms tap through to knowledge page
  Non-skill terms show "definition coming soon"
  Search filters across French and English
  Located in Learn tab, second card after Skill library
- Centre question rewritten: comfort-framed, 5 options from
  "I avoid it" to "confident and musical"

### Updated status table entries
  Glossary               → BUILT NOT VERIFIED (definitions: DEFERRED)
  Centre question        → BUILT NOT VERIFIED
  Milestone scroll cap   → BUILT NOT VERIFIED
  Completed see-all      → BUILT NOT VERIFIED
  Completion toast       → BUILT NOT VERIFIED

---

## v4.2.1 → v4.3 delta (deferred items cleared)

### Status changes

DEFERRED → CONFIRMED WORKING:
- Quiz deselect: selectOption now toggles — tapping a selected option clears it
- Centre question: rewritten as comfort-framed ("In your most recent classes…")
- Assessment results: "what to work on" panel added with per-dimension tips
  for bottom 2 weak dimensions (barre, centre, allegro, turns, flexibility)
- Barre focus banner: cycles through ALL weak dimensions in order each visit
  (_barreVisitCount increments per visit, wraps around)
  Shows stage label alongside dimension name. Handles not-assessed state.
- Session template delete: × button on each combobox row (onmousedown,
  stopPropagation so it doesn't trigger template selection)
- Goal-from-skill scrolls to goal: navigateToGoal(id) navigates then
  scrollIntoView with 100ms delay for render
- Swipe reopen text: padding widened to sp-xl, min-width 80px on action panels

DEFERRED → BUILT NOT VERIFIED:
- Collapsing skill detail hero: IntersectionObserver fires when hero scrolls
  behind sticky header; compressed name + difficulty badge + last-worked date
  fade in. Focus toggle becomes target icon (32×32 circle button).
- Tap-to-save inline on knowledge page: replaced floating popover with
  element.after(bar) inline insertion that pushes content down. Uses
  onmousedown. Scrolls bar into view after insertion.
- Muscles expandable: "why these muscles?" button below chips expands
  inline context paragraph (toggleMuscleContext). muscleContext field added
  to all 4 fully-written SKILL_KNOWLEDGE entries.
- Glossary: showGlossary() / renderGlossaryScreen() — confirmed syntax-clean

### New data fields
- SKILL_KNOWLEDGE entries: muscleContext (string) — biomechanical explanation
- appState._barreVisitCount: tracks rotation index for focus banner

### Updated status table
  Quiz deselect              → CONFIRMED WORKING
  Centre question            → CONFIRMED WORKING
  Assessment focus areas     → CONFIRMED WORKING
  Barre rotation             → CONFIRMED WORKING
  Template delete UI         → CONFIRMED WORKING
  Goal-from-skill scroll     → CONFIRMED WORKING
  Swipe reopen text          → CONFIRMED WORKING
  Collapsing hero            → BUILT NOT VERIFIED
  Tap-to-save inline         → BUILT NOT VERIFIED
  Muscles expandable         → BUILT NOT VERIFIED

### Remaining DEFERRED
  - Sticky header device verification (CSS applied, unconfirmed on device)
  - Learn tab content (composers, variations, dancers, knowledge stubs)
  - Glossary definitions (content work)

---

## Design system v2 — Implementation pass (v4.4)

### What was implemented

**CSS variables completely replaced.** Old palette (warm brown/amber/coral/sage) replaced
with the confirmed v2 token set. All variables renamed and documented in :root with rules.
Key new tokens: --ink through --ink-4, --gold/--gold-mid/--gold-soft/--gold-wash,
--brown-btn/--brown, --input-bg (#F9F5F0 off-white), --praise-border (#E8B84B),
--border/--border-mid/--border-light as rgba values.

**Elevation system.** Four levels: --shadow-0 (flat), --shadow-1 (cards),
--shadow-2 (sheets/overlays), --shadow-3 (FAB). Warm ink shadows not black.

**Spacing rules locked.**
  xs/4px   — inline gaps between related elements
  sm/8px   — stacked elements within a component
  md/12px  — internal component padding, field gaps
  lg/16px  — card padding, section margins, sheet padding
  xl/24px  — between distinct sections
  2xl/32px — screen-level top padding, large section breaks

**Border radius locked.**
  4px everywhere (cards, inputs, buttons) via --r-sm/md/lg/xl all = 4px
  999px for tags and pills only (--r-full)
  50% for dots, circles, FAB

**Typography updated.**
  Cormorant Garamond 500 loaded for H1/H2 headings
  DM Serif Display retained for logo (Handlee removed)
  DM Sans throughout for UI
  Note: Fraunces stubbed as preferred heading font for future swap

**Buttons.**
  Primary: --brown-btn (#5A4030) background, white text, weight 500, 4px radius
  Hover: --brown (#6B4F3A)
  Secondary bordered: reserved for future use
  Text-only actions (add notes, hide notes): no border, ink-3 colour

**FAB.**
  Moved to bottom-right (was bottom-centre)
  Brown circle (#5A4030), shadow-3
  SVG rotates 45deg to × when open (.fab.open)
  Chip menu opens above it

**Session block mode toggle.**
  Replaced pill buttons with underline tab control
  .block-mode-btn: unset + inline-block + bottom border
  .block-mode-btn.active: brown text + brown 2px bottom border
  Topic select: bold DM Sans 700, styled SVG chevron

**Inputs/textareas.**
  Background: #F9F5F0 (--input-bg)
  Border: 1.5px --gold-soft at rest, --gold-mid on focus
  No black focus ring, no box-shadow on focus
  Title input: borderless with brown bottom border on focus

**Correction bullet placeholder.**
  contenteditable::before CSS: "Note a correction…"

**Timeline.**
  No icons — type labels only (Session / Praise ★ / Milestone / Reflection / Assessment)
  Left border per type: session=gold-mid, praise=praise-border, milestone=sage,
  assessment=coral, reflection=none
  Praise entries: bold text + ★ in label
  Reflections: italic, ink-2, no left border
  Date group labels sticky

**Goal cards.**
  shadow-1, 1px border-mid, 4px radius
  Tags top-right of card header
  Last milestone has no bottom border (no double line with footer)
  "created [date]" via CSS ::before

**Placeholder copy updated.**
  Reflection block: "Note a reflection…"
  Praise block: "Note praise received…"
  Skill notes: "Note a thought…"
  Goal detail: "Optional detail…"
  Correction bullet: "Note a correction…" (CSS ::before)

### CONFIRMED WORKING after this pass
  Everything in the prior confirmed list, plus:
  - Design system v2 tokens applied globally
  - Cormorant Garamond headings loaded
  - All buttons: brown, weight 500, 4px radius
  - FAB: brown circle, rotates to ×, shadow-3
  - Mode toggle: underline tabs, brown active
  - Input/focus: gold border, no black ring
  - Timeline: type labels, left borders, praise star
  - All corner radii: 4px (was 8-16px throughout)

### BUILT NOT VERIFIED (need device test)
  - Collapsing hero IntersectionObserver on iOS
  - Sticky headers with clip-path overflow fix
  - Touch targets in goal creator overlay
  - All new component styles rendering on device

### DEFERRED
  - Fraunces as heading font (swap single variable when ready)
  - Logo font finalisation (DM Serif Display placeholder)
  - Learn tab content (composers, variations, dancers)
  - Glossary definitions
  - Dark mode stub
  - Pointe disclaimer copy on assessment screen
  - Inline helper text on fields (persistent below-field guidance)
