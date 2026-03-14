# Plié — Project Summary v4.1

Delta from v4: onboarding reopen bug fixed, accent matching, praise→timeline,
goal card improvements, completed goal visual differentiation, orphaned code removed.

---

## What is it?

Mobile-first ballet training companion PWA. Training diary for dancers and teachers.
Log sessions, save corrections, track skills, set goals, measure progress.

Stack: pure HTML/CSS/JS, no frameworks. DM Serif Display + DM Sans.
localStorage via storage adapter. PWA manifest + service worker.

---

## Files

  index.html        (~420 lines)
  styles.css        (~4354 lines)
  app.js            (~5060 lines)
  manifest.json, sw.js, loading-animation.html, icons/

---

## app.js sections

1.  DATA — Skills (15 + aliases), class types, quiz questions, folders, level labels
2.  STORAGE ADAPTER — storage.save/load/clear, STORAGE_KEYS
3.  SKILL STATE MERGE — initSkills, loadUserSkillState, persistSkillState
4.  APP STATE — appState shape
5.  UTILITIES — dimension helpers, appendTimelineEntry, formatTimelineDate, normaliseStr
6.  NAVIGATION — showScreen, navigateTo
7.  ONBOARDING — 3 screens, swipe, skip. Initial screen routing in DOMContentLoaded.
8.  ASSESSMENT — 14 questions, counter + progress bar, calculateResults
9.  SESSION LOGGER — overlay, combobox, class type carousel, template form
10. BLOCK SYSTEM — mode toggle (Correction/Praise/Reflection), bullet list, autoResizeCapped
11. BULLET HANDLERS — updateCorrectionBullet, handleCorrectionBulletKey, renderBlockBulletsInPlace
12. SESSION EDITOR — openSessionEditor, reconstructs blocks from SessionSkills+Corrections
13. SAVE FLOW — saveSession → Corrections (one per bullet) + SessionSkills + timeline
      Praise blocks also write a milestone timeline entry (title or first bullet)
14. POST-SAVE PROMPTS — correction promotion (non-blocking, 8s) + reflection prompt (~5 sessions)
15. REFLECTION OVERLAY — lightweight sheet, saves SkillNote {isReflection:true, skillId:null}
16. SCREEN BUILDERS — Barre, Assess, Goals, Learn, Profile, Folder
17. GOALS — full CRUD, correction linking, milestones (Enter to add), swipe gestures
18. GOAL CORRECTION SEARCH — normaliseStr matching, link/unlink, renderGoalLinkedCorrectionsInPlace
19. GOAL CATEGORIES — "+" button → openGoalCategoryInput → free text + prior category suggestions
20. SESSION DETAIL — full-screen view, edit + delete buttons
21. DELETION — deleteSession, deleteSkillNote, deleteSessionTemplate
22. SKILL LIBRARY — shell-once + updateSkillLibResults (mobile focus fix), normaliseStr matching
23. SKILL KNOWLEDGE PAGE — showSkillKnowledgePage, tappable key-points popover
24. SKILL DETAIL — showSkillDetail, progression summary, correction filters, notes w/ delete
25. SKILLS SYSTEM — renderSkills, togglePhonetic, toggleFlag (slug-keyed)
26. INITIALISATION — loadPersistedState IIFE, seedMockData (after load)
    DOMContentLoaded — swipe listeners + initial screen routing (profile vs onboarding)
    Service worker registration

---

## Critical bug fixes applied

### Onboarding reopen on every launch
Root cause: showScreen('profile') was called inside the loadPersistedState IIFE,
which runs at parse time before the DOM exists. The screen switch had no effect,
so onboarding-1 (active by default in HTML) always showed.

Fix: moved all initial screen routing into DOMContentLoaded where DOM is guaranteed ready.
loadPersistedState IIFE now only loads data — no DOM manipulation.

### skipOnboarding resetting level
Already guarded with `if (!appState.level)` — was not actually resetting.
The perceived reset was the onboarding reopen bug above causing a fresh-looking state.

---

## appState shape

  // Quiz
  currentScreen, currentQuestion, answers,
  level, dimensions, rawDimensions, _assessmentWritten

  // Collections (all persisted via STORAGE_KEYS)
  skills, corrections, sessions, sessionTemplates, sessionSkills,
  assessments, goals, timeline, skillNotes

  // Ephemeral
  currentSession, _addingNewTemplate, _draftTemplate,
  _showMoreClassTypes, _goalDraft (includes correctionIds[]),
  _skillDetailReturnTo, persona, currentNav

  // Module-level
  let _skillLibTab = 'all'

---

## Data schema

### Correction — one string per object
  { id, skillId, text, createdAt, sessionId, source, type, isRecurring }
  source: 'teacher' | 'praise' | 'self'
  type: 'praise' when from a praise block

### Session block — in-memory only
  { id, topicId, title, notes, notesOpen,
    mode,           // 'correction' | 'praise' | 'reflection'
    corrections,    // string[] — each bullet → Correction on save
    reflectionText  // reflection mode only
  }

### Goal
  { id, title, body, createdAt, dueDate,
    skillId, dimensionId, category,    // category set via + input
    correctionIds,   // shown on card, struck-through when complete
    milestones,      // [{id, text, done}]
    completedAt      // null=active; set=complete; reopenable via swipe right
  }

### SkillNote
  { id, skillId, text, date, createdAt,
    isReflection,    // true if from reflection block or reflection overlay
    skillId: null    // for session-level reflections
  }

### STORAGE_KEYS
  plie:skills, plie:corrections, plie:sessions, plie:sessionTemplates,
  plie:sessionSkills, plie:assessments, plie:goals, plie:timeline,
  plie:skillNotes, plie:onboardingComplete

---

## Session logger — block system

Opening: auto-creates first block, focuses title.
Day-of-week prediction from template days[].

Modes:
  Correction — bullet list. Enter commits bullet → Correction object on save.
               Shift+Enter: new line within bullet.
  Praise     — notes only. Title + first bullet also write a milestone timeline entry on save.
  Reflection — single textarea "What stood out to you today?"

All fields soft-capped ~3 lines (autoResizeCapped). Notes collapsible.

---

## Goals — current state

Creation: title (≥3 chars) → correction search (accent-normalised via normaliseStr).
Category: "+" opens free-text input with prior category chips as suggestions.
Milestones: Enter in milestone field adds next milestone.

Goal card:
  - Title (struck-through when complete), body
  - "Added [date]" footer
  - Tags (skill, dimension, due date)
  - Linked corrections (struck-through when complete)
  - Milestones + progress bar
  - "swipe to complete →" / "swipe to reopen →" hint
  - Swipe left: delete (confirm). Swipe right: complete / reopen.

Completed goals: dimmed background, strikethrough title,
  "✓ Completed [date]" banner, swipe right to reopen.

---

## Normalisation — normaliseStr()

  function normaliseStr(str) {
    return (str || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

Used in:
  - searchGoalCorrections (fouetté → fouette matching)
  - updateSkillLibResults (skill library search)

---

## Skill library — mobile search fix

showLearnSkillLibrary() builds shell once (input never recreated).
updateSkillLibResults() updates only #skill-lib-body.
_skillLibTab module variable tracks tab state.
English translation shown in card only when it matches search query.

---

## Timeline entries

Written by:
  saveSession → type:'session'
  saveSession (praise block with title) → type:'milestone'
  calculateResults → type:'assessment'
  toggleMilestone (on complete) → type:'milestone'
  markGoalComplete → type:'milestone'
  skipOnboarding / skipAssessment → type:'manual' (if timeline empty)
  Reflections: stored as SkillNote {isReflection:true}, merged into timeline at render time

---

## Deletion

  Session      → delete button in session detail (confirm)
                 Removes: Session, SessionSkills, Corrections, timeline entry, DOM
  Goal         → swipe left (confirm)
  Skill note   → × button per note row
  Template     → deleteSessionTemplate() — no UI entry point yet
  Correction   → standalone delete TBD

---

## Mobile / iOS rules

  - position:fixed overlays → document.body only
  - overflow-x:hidden → .app-container only
  - onmousedown on dropdown rows (fires before onblur)
  - Never rebuild DOM with active input — use surgical updates
  - Initial screen routing must be in DOMContentLoaded not parse-time IIFE

---

## Not built yet (pinned for later)

  - Collapsing hero / sticky headers on detail screens
  - FAB global action sheet (Add session / goal / reflection)
  - Skill detail: focus toggle → target icon in sticky bar
  - Tap-to-save inline on knowledge key points (replace popover)
  - Muscles expandable "why these muscles?" inline
  - Glossary / dictionary in Learn for key terms (count, phrase, beat)
  - Assessment: post-quiz focus areas ("what to work on")
  - Assessment: centre question reframed around comfort
  - Barre screen: focus areas from assessment, rotating on reload
  - "Make the most of plié" greys out per completed action
  - Profile: remove "keep going" cards
  - Quiz deselect visual glitch (cosmetic — re-render timing)
  - Session template delete UI (deleteSessionTemplate exists, no entry point)
  - Standalone correction delete
  - Skill knowledge content for 11/15 skills
  - Full 80+ skill library (content)
  - Photos / video upload
  - Assessment history
  - Composers, dancers, variations pages
