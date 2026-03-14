# Plié — Project Summary v4

Delta from v3: block mode system, bullet corrections, goal correction linking,
skill progression summary, correction filters, mobile search fix, deletion support,
skill library shell-once architecture.

---

## What is it?

Mobile-first ballet training companion PWA. Not a teaching tool — a well-organised
training diary for dancers and teachers. Log sessions, save corrections, track skills,
set goals, measure progress.

Stack: pure HTML/CSS/JS, no frameworks. DM Serif Display + DM Sans. localStorage via
storage adapter. PWA manifest + service worker.

---

## Files

  index.html        (~420 lines)
  styles.css        (~3900 lines)
  app.js            (~4750 lines)
  manifest.json, sw.js, loading-animation.html, icons/

---

## app.js sections

1.  DATA — Skills (15 with aliases), class types, quiz questions, folders, level labels
2.  STORAGE ADAPTER — storage.save/load/clear, STORAGE_KEYS
3.  SKILL STATE MERGE — initSkills, loadUserSkillState, persistSkillState
4.  APP STATE — appState shape
5.  UTILITIES — dimension/stage helpers, appendTimelineEntry, formatTimelineDate
6.  NAVIGATION — showScreen, navigateTo
7.  ONBOARDING — 3 screens rewritten, swipe, skip
8.  ASSESSMENT — 14 questions, counter + progress bar, calculateResults
9.  SESSION LOGGER — overlay, combobox, class type carousel, template form
10. BLOCK SYSTEM — mode toggle (Correction/Praise/Reflection), bullet list, autoResizeCapped
11. BULLET HANDLERS — updateCorrectionBullet, handleCorrectionBulletKey, renderBlockBulletsInPlace
12. SESSION EDITOR — openSessionEditor, reconstructs blocks from SessionSkills+Corrections
13. SAVE FLOW — saveSession → Corrections (one per bullet) + SessionSkills + timeline
14. POST-SAVE PROMPT — non-blocking correction-to-goal suggestion, 8s auto-dismiss
15. SCREEN BUILDERS — Barre, Assess, Goals, Learn, Profile, Folder
16. GOALS — full CRUD, correction linking, milestones, swipe gestures
17. GOAL CORRECTION SEARCH — searchGoalCorrections, link/unlink, renderGoalLinkedCorrectionsInPlace
18. SESSION DETAIL — full-screen view, edit + delete buttons
19. DELETION — deleteSession, deleteSkillNote, deleteSessionTemplate
20. SKILL LIBRARY — shell-once (showLearnSkillLibrary), updateSkillLibResults, _skillLibTab
21. SKILL KNOWLEDGE PAGE — showSkillKnowledgePage, SKILL_KNOWLEDGE data, tappable key-points
22. SKILL DETAIL — showSkillDetail, progression summary, correction filters, notes w/ delete
23. SKILLS SYSTEM — renderSkills, togglePhonetic, toggleFlag (slug-keyed)
24. INITIALISATION — loadPersistedState, seedMockData (after load), service worker

---

## appState shape

  // Quiz
  currentScreen, currentQuestion, answers,
  level, dimensions, rawDimensions, _assessmentWritten

  // Collections (all persisted)
  skills, corrections, sessions, sessionTemplates, sessionSkills,
  assessments, goals, timeline, skillNotes

  // Ephemeral
  currentSession, _addingNewTemplate, _draftTemplate,
  _showMoreClassTypes, _goalDraft, _skillDetailReturnTo,
  persona, currentNav

  // Module-level
  let _skillLibTab = 'all'

---

## Data schema (key changes from v3)

### Correction — ONE string per object
  { id, skillId, text, createdAt, sessionId, source, type, isRecurring }

### Session block — in-memory only
  { id, topicId, title, notes, notesOpen,
    mode,           // 'correction'|'praise'|'reflection'
    corrections,    // string[] — each bullet -> separate Correction on save
    reflectionText  // reflection mode only
  }

### SessionSkill
  { id, sessionId, skillId, notes, correctionIds, tracked, blockTitle, mode }

### Goal
  { id, title, body, createdAt, dueDate, skillId, dimensionId, category,
    correctionIds,  // shown on card, struck-through when complete
    milestones,     // [{id, text, done}]
    completedAt     // null=active; reopenable
  }

### SkillNote
  { id, skillId, text, date, createdAt, isReflection }

### STORAGE_KEYS
  plie:skills, plie:corrections, plie:sessions, plie:sessionTemplates,
  plie:sessionSkills, plie:assessments, plie:goals, plie:timeline, plie:skillNotes

---

## Session logger — block system

Opening: auto-creates first block, focuses title. Day-of-week prediction from template days[].

Block layout:
  [Topic select]              [x remove]
  [Title — bold]
  [+ add notes]               <- collapsible
  [Correction | Praise | Reflection]   <- mode toggle
  [mode-specific field]

Correction mode: bullet list. Enter commits bullet (new Correction object on save).
  Shift+Enter: new line within bullet. Delete x per bullet.
Praise mode: notes only.
Reflection mode: textarea, prompt "What stood out to you today?"
All fields soft-capped ~3 lines with internal scroll (autoResizeCapped).

Save flow:
  1. Session object
  2. Each correction bullet -> Correction {skillId, sessionId}
  3. Skill-topic blocks -> SessionSkill
  4. Skills flagged in The Barre
  5. Timeline entry
  6. Post-save prompt if corrections logged

---

## Goals — correction linking

Title (>=3 chars) -> surfaces matching corrections inline.
Tap to link. Linked corrections shown on goal card below tags.
Unlink button per correction. Struck-through/deemphasised when goal complete.
Goal can be reopened (clears completedAt, restores to active).

---

## Skill detail — personal view

Top: progression summary (last worked / corrections logged / sessions) + active goal chip.

Corrections: filter bar (All / Recurring / Linked to goals) when >1 correction.
  expandFilteredCorrections() handles safe DOM expansion.

Notes: timestamped entries with x delete. Add textarea, Cmd+Enter shortcut.
  Surgical re-render via renderSkillNotesSectionInPlace (no scroll loss).

Links: "about [skill] ->" -> knowledge page. "my [skill] ->" back from knowledge page.

---

## Skill library — mobile search fix

Old bug: renderSkillLibrary rebuilt screen.innerHTML on every keypress,
  destroying the input, losing iOS focus after 1 character.

Fix: showLearnSkillLibrary builds shell once (input never recreated).
  updateSkillLibResults() updates only #skill-lib-body on keypress.
  _skillLibTab module variable tracks tab state.

---

## Deletion

  Session      -> delete button in session detail (confirm). Removes Session,
                  SessionSkills, their Corrections, timeline entry, DOM screen.
  Goal         -> swipe left on card
  Skill note   -> x button per note row
  Template     -> deleteSessionTemplate() — no UI entry point yet
  Correction   -> standalone delete TBD

---

## Mobile / iOS rules

- position:fixed overlays -> document.body, not .app-container
- overflow-x:hidden -> .app-container only (body breaks fixed)
- onmousedown on dropdown rows (fires before onblur)
- env(keyboard-inset-height) requires interactive-widget=resizes-content in viewport meta
- Never rebuild DOM with an active input — use surgical updates

---

## Not built yet

- Reflection prompt (~5 sessions trigger) — spec'd, not implemented
- Standalone correction delete
- Session template delete UI (deleteSessionTemplate exists, no entry point)
- Skill knowledge content 11/15 skills (stub shown)
- Full 80+ skill library (content work)
- Photos / video upload
- Assessment history
- Composers, dancers, variations pages
- Routine / practice program builder
