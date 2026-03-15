# Plié — Project Summary v5.0

## DEVELOPMENT PROTOCOL — STATUS TRACKING

Every session ends with an explicit status table.
CONFIRMED WORKING — tested path exists, no known bugs
BUILT NOT VERIFIED — code exists, not confirmed on device
PARTIAL — core exists but edge cases or UI incomplete
DEFERRED — spec'd, not started
KNOWN BUG — exists, cause identified, not yet fixed

---

## Files

  index.html     (~500 lines)
  styles.css     (~6338 lines)
  app.js         (~7081 lines)
  manifest.json, sw.js, loading-animation.html, icons/

---

## app.js section map

 0. ILLUSTRATIONS — ILLUSTRATIONS const with base64-embedded PNGs:
                    levels: {beginner, elementary, improver, intermediate,
                             upper-intermediate, advanced}
                    profiles: {default-bun, default-male-1, default-male-2}
 1. DATA — skills (15+aliases), class types, quiz questions, profileCapabilities
 2. STORAGE ADAPTER — storage.save/load/clear, STORAGE_KEYS
                      (now includes plie:preferences)
 3. SKILL STATE MERGE — initSkills, loadUserSkillState, persistSkillState
 4. APP STATE — now includes hidePointe, profilePicture, displayName
 5. UTILITIES — dimension helpers, formatTimelineDate, normaliseStr, appendTimelineEntry
 6. NAVIGATION — showScreen, navigateTo
 7. ONBOARDING — 3 screens, swipe. Routing in DOMContentLoaded.
 8. ASSESSMENT — 14 questions, counter+bar, calculateResults
 9. SESSION LOGGER — overlay, combobox, class type carousel, template form
10. BLOCK SYSTEM — Correction/Praise/Reflection modes, bullet list, notes
11. BULLET HANDLERS — updateCorrectionBullet, handleCorrectionBulletKey
12. SESSION EDITOR — openSessionEditor reconstructs blocks from SessionSkills+Corrections
13. SAVE FLOW — saveSession: corrections, praise→SkillNote+timeline, timeline entry
14. POST-SAVE PROMPTS — correction promotion + reflection (~5 sessions)
15. REFLECTION OVERLAY — lightweight sheet, SkillNote {isReflection:true}
16. FAB ACTION SHEET — log session / add goal / add reflection
17. SWIPE HELPER — attachSwipe: threshold=100px, 120ms min, 8px dead zone
18. SCREEN BUILDERS — Barre, Assess, Goals, Learn, Profile, Folder
19. GOALS — full CRUD, correction linking, milestones, swipe gestures
20. GOAL CORRECTION SEARCH — normaliseStr matching, link/unlink
21. GOAL CATEGORIES — free text + prior suggestions
22. SESSION DETAIL — full-screen view, edit + delete
23. DELETION — deleteSession, deleteSkillNote, deleteSessionTemplate
24. SKILL LIBRARY — shell-once + updateSkillLibResults, normaliseStr
25. SKILL KNOWLEDGE PAGE — showSkillKnowledgePage, tappable key-points
26. SKILL DETAIL — showSkillDetail, progression summary, correction filters
27. PROFILE CAPABILITIES — isDone() per card, greyout+message, disappears when all done
28. TIMELINE — date groups, SVG icons, praise/reflection, sessions tappable
29. SKILLS SYSTEM — renderSkills, togglePhonetic, toggleFlag
30. PREFERENCES — savePreferences(), plie:preferences storage key
                  Fields: hidePointe, profilePicture, displayName
31. PROFILE STATUS CARD — renderProfileStatus()
                          Level animal watermark (from ILLUSTRATIONS.levels[level])
                          Squircle avatar (tap to change)
                          Insight sentence: event-driven priority queue
                          buildInsightSentence(): session today > milestone >
                          correction pattern (3+ same skill/month) > assessment fallback
32. FOCUS AREA CARD STACK — renderFocusCardStack(), renderFocusCard()
                            FOCUS_AREAS: pointe, artistry, body, movement, technique
                            Empty/unassessed cards — compact, opt-in for pointe
                            Full cards — single-dim or subdim layout
                            Stats row: corrections / last session / goals
33. FOCUS AREA SHEET — openFocusAreaSheet(), renderFocusSheetContent()
                       Tab row: only tabs where data exists
                       Sections: what this means, focus, corrections, goals,
                                 connected sessions, how this fits, assessment history
                       Pointe: dismiss button → sets hidePointe=true
34. SETTINGS SHEET — openSettings(), renderSettings()
                     Sections: Profile, My training, Notifications (TBD),
                                Display (TBD), Data, Account (TBD), About
                     Pointe toggle wired to hidePointe + savePreferences
                     Reset moved here (button triggers confirmResetProfile)
35. PROFILE PICTURE PICKER — openPicPicker(), renderPicPicker()
                              Grid of ILLUSTRATIONS.profiles defaults
                              Upload photo via FileReader → data URL
                              Selection persisted in plie:preferences
36. INITIALISATION — loadPersistedState IIFE (data + preferences)
                     DOMContentLoaded (DOM + routing)

---

## Current feature status

### CONFIRMED WORKING (from v4.4, still valid)
- localStorage persistence (all collections)
- Onboarding routing fix
- Accent-insensitive search (normaliseStr)
- Swipe deliberate drag (100px, 120ms, 8px dead zone)
- FAB action sheet
- Goal editing, newest-first, categories, correction linking
- Session delete, skill note delete
- Praise → timeline + SkillNote
- Reflection → SkillNote
- Timeline date groups, icons, tappable sessions
- Profile capability cards
- Skill library search
- Design system v2 tokens

### BUILT NOT VERIFIED (this session)
- Profile status card (renderProfileStatus)
  — Level animal watermark
  — Squircle avatar
  — Insight sentence priority queue
- Focus area card stack (renderFocusCardStack)
  — 5 areas: Technique, Movement, The Body, Artistry, Pointe
  — Full cards with track + stats
  — Empty/unassessed compact cards
- Focus area sheet (openFocusAreaSheet)
  — Tab row with data-conditional tabs
  — All sections rendering
  — Assessment history accordion
  — Pointe dismiss → hidePointe flag
- Settings sheet (openSettings)
  — All sections with TBD states
  — Pointe toggle
  — Reset button
- Profile picture picker (openPicPicker)
  — 3 default illustrations
  — Upload photo via FileReader
- Preferences persistence (plie:preferences)
  — hidePointe, profilePicture, displayName
  — Loaded on startup, saved on change

### BUILT NOT VERIFIED (from prior sessions)
- Collapsing hero IntersectionObserver on iOS
- Sticky headers with clip-path overflow fix
- Tap-to-save inline on knowledge key points
- Muscles expandable "why these muscles?"

### DEFERRED
- Pointe question update (add "not interested" option → sets hidePointe)
- Strength + turnout assessment questions
- Dimension model: barre+centre → Technique, turns+allegro → Movement,
  flexibility+strength+turnout → The Body
- Skill contributingDimensions[] field
- Focus area check-in assessments (individual area, event-triggered)
- Behavioural stage descriptors (5 stages × 5 areas — copy TBD)
- "How this fits" section rename (TBD copy)
- "Reassess this area" button copy (currently placeholder)
- Insight sentence copy — full set per level (partial written)
- Settings: notification infrastructure
- Settings: dark mode CSS
- Settings: data export (PDF/CSV)
- Settings: account / cloud sync
- Privacy policy, terms of service screens
- More profile picture defaults (remaining 9 from illustration brief)
- Onboarding hero illustrations (standing dancer, grand plié / ballet shoes)
- Empty state illustrations (barre, spotlight, mirror — wrong colour, need regen)
- Learn tab content (composers, variations, legendary dancers)
- Glossary definitions
- All skill library content beyond 4 full + 11 stubs
- Notifications infrastructure
- Dark mode
- Authentication / account system

### KNOWN BUGS (pre-existing)
- Touch target offset on iOS overlays (partially addressed)
- Duplicate timeline entries possible if saveSession called twice (guard: _isEdit)
- highlightMatch regex triggers Node.js syntax check false positive
  (browser-valid, not a real bug)

---

## New data shape (this session)

### appState additions
  hidePointe:     boolean  — hides pointe from profile, skills, goals, assess
  profilePicture: string   — data URL (uploaded) or key ('default-bun' etc.)
  displayName:    string   — optional, shown on status card (TBD UI)

### STORAGE_KEYS additions
  plie:preferences — { hidePointe, profilePicture, displayName }

### FOCUS_AREAS (runtime constant, not persisted)
  Each area: id, name, icon, optIn?, subdims?, getDims(), getStats()
  Order (back to front): pointe, artistry, body, movement, technique

---

## Profile screen structure (new)

```
profile (screen)
  ├── .profile-sticky-header (sticky, z:20)
  │     ├── "profile" label
  │     └── settings icon → openSettings()
  │
  ├── .profile-above-fold (fills viewport above nav)
  │     ├── .profile-status (background surface — NOT a card)
  │     │     ├── .status-animal (ghost watermark, opacity:0.07, mix-blend-mode:multiply)
  │     │     └── .status-row
  │     │           ├── .status-avatar (squircle 60×60, 18px radius) → openPicPicker()
  │     │           └── .status-text
  │     │                 ├── level eyebrow (level name + assessed note)
  │     │                 └── insight sentence (event-driven)
  │     │
  │     └── .focus-card-stack (flex, justify:flex-end — anchored to bottom)
  │           Cards: Pointe z:1 · Artistry z:2 · The Body z:3 · Movement z:4 · Technique z:5
  │           Each card: border-radius 12px 12px 0 0 (top rounded, bottom square)
  │           Empty cards: compact (46px header), full cards: header + body
  │
  ├── #profileHeroCard (context-aware action card)
  ├── #profileGoalCard (active goal or suggested first goal)
  ├── #profileExploreSection (Make the most of plié — hides when all done)
  ├── .timeline-section
  └── reset button (move to settings eventually)

Overlays (appended to body in HTML):
  #focus-area-overlay → focus area sheet
  #settings-overlay → settings sheet
  #pic-picker-overlay → picture picker
```

---

## Level animals

  beginner:           Duckling
  elementary:         Rabbit
  improver:           Deer
  intermediate:       Swan
  upper-intermediate: Rose (La Sylphide — drooping rose)
  advanced:           Feather (Firebird — peacock feather with eye marking)

All illustrations: warm dark brown (#1A1714) linework, transparent PNG,
bold outline style, embedded as base64 in ILLUSTRATIONS const.

---

## Profile picture defaults (3 available, 9 outstanding)

  default-bun     — Female dancer, classic bun, oval cameo
  default-male-1  — Male dancer, short hair, oval cameo
  default-male-2  — Male dancer, textured hair, oval cameo

Outstanding (generate when Copilot quota restores):
  Contemporary female, gender neutral, girl ~8-10, boy ~8-10,
  older female, South Asian female, East Asian female,
  back view, hands in port de bras

---

## Illustration status

  Level animals (6)              ✅ generated, embedded
  Profile defaults (12)          🔧 3 done, 9 outstanding
  Onboarding hero standing       ✅ generated, not yet embedded
  Onboarding hero plié/shoes     ⬜ blocked by AI safety, use ballet shoes workaround
  Empty state — barre             ⬜ wrong colour (grey), regenerate
  Empty state — spotlight         ⬜ not generated
  Empty state — mirror            ⬜ wrong colour (grey), regenerate

---

## Swipe behaviour (attachSwipe)
  threshold:    100px
  min duration: 120ms
  dead zone:    8px
  excluded:     button, input, select, textarea, a, [contenteditable]
  Left swipe:   delete/remove
  Right swipe:  complete (active goals) / reopen (completed goals)

---

## Mobile / iOS rules
  - position:fixed overlays → document.body only
  - overflow-x:hidden → clip-path:inset(0) on .app-container
  - onmousedown on dropdowns (fires before onblur)
  - touch-action:manipulation globally
  - Never rebuild DOM with active input — surgical updates only
  - Screen routing in DOMContentLoaded not parse-time IIFE

---

## v4.4 → v5.0 delta

### Built this session
- ILLUSTRATIONS const with 6 level animals + 3 profile defaults (base64)
- appState: hidePointe, profilePicture, displayName
- plie:preferences storage key, loadPersistedState updated
- savePreferences() helper
- renderProfileStatus() — status surface, ghost animal, squircle avatar, insight
- buildInsightSentence() — 4-tier priority queue
- FOCUS_AREAS constant (5 areas with getDims/getStats)
- renderFocusCardStack() + renderFocusCard()
- openFocusAreaSheet() + renderFocusSheetContent()
- focusSheetJumpTab(), toggleFocusAssessHistory()
- getFocusAreaDescription(), getFocusSuggestion(), getFocusAreaTags()
- dismissPointe() / dismissAndAddPointe()
- openSettings() + renderSettings() + togglePointeSetting() + editDisplayName()
- openPicPicker() + renderPicPicker() + selectProfilePicture()
- uploadProfilePicture() + handlePicUpload()
- initProfile() updated to call renderProfileStatus() + renderFocusCardStack()
- resetProfile() updated to clear new state fields
- index.html: profile screen restructured, 3 new overlay divs
- styles.css: ~736 lines of new CSS for all new components

### TBD items (copy/naming)
1. "How this fits" section label — placeholder, review before release
2. "Reassess this area" button text — placeholder, review before release
3. Behavioural stage descriptors — 5 stages × 5 areas, copy not written
4. Insight sentences — full set per level, partially written
5. Settings access point confirmed as top-right of sticky header ✅
