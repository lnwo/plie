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
