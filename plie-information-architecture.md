# Plié — Information Architecture & Sitemap
*Supersedes all previous IA documents.*

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
- Addressing: "you/your" default, occasional "we" when collaborating
- Register: knowledgeable mentor — confident, informed, slightly aspirational
- Formality: warm professional — like a good ballet teacher
- Buttons: all lowercase
- Language: British English
- The app is NOT a teacher — it's a companion for outside the studio

---

## Technical Foundation
- Modular vanilla JS PWA, no framework, no build step ✅
- Hosted on GitHub Pages ✅
- Storage: localStorage only ✅
- Cross-device sync / cloud backup ⬜
- Font: Cormorant Garamond (headings), DM Sans (UI) ✅
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
  - Add a goal ✅
  - Note a reflection ✅
- Bottom nav: The Barre · Assess · Goals · Learn · Profile ✅
- Both hidden during onboarding, quiz, session logger ✅

### Empty States
| Screen | Status |
|--------|--------|
| The Barre — no active skills | 🔧 Basic |
| Goals — no goals | 🔧 Basic |
| Profile — not assessed | 🔧 Basic |
| Learn — no results | 🔧 Basic |
| All others | ⬜ |

### Push Notifications ⬜ All TBD

---

## Identity & Access ⬜ All TBD
Auth, login, registration, GDPR, age verification, privacy policy, terms — all deferred.

---

## Onboarding Flow ✅
```
Screen 1 — Welcome ✅
Screen 2 — Know where you stand ✅
Screen 3 — Your growth starts here ✅
  ↓ begin / skip
Placement Quiz (14 questions) ✅
  ↓ complete / skip
Completion screen ✅
  ↓ see my results
Results screen ✅ (level badge, dimension bars, strengths/focus)
  ↓ continue to your profile
Profile — first-visit launchpad ✅
```

### Placement Quiz Amendments 📋
| Change | Status |
|--------|--------|
| Pointe question — add "not interested" option | 📋 |
| Strength assessment questions | 📋 |
| Turnout assessment questions | 📋 |
| New dimension model: Technique / Movement / The Body / Artistry / Pointe | 📋 |
| contributingDimensions[] added to Skill | 📋 |
| Knowledge questions moved out of scoring → Learn tab only | 📋 |

---

## Session Logger ✅
```
Session Logger
  ├── Date (autofills today, editable) ✅
  ├── Session name / saved session dropdown ✅
  │     ├── Saved templates ✅
  │     ├── One-off entry ✅
  │     └── Add new session (name, location, class type, recurrence) ✅
  ├── Class type carousel ✅
  └── Notes & corrections blocks ✅
        Each block:
          ├── Topic (General / category / specific skill) ✅
          ├── Title ✅
          ├── Mode: Correction / Praise / Reflection ✅
          ├── Correction bullets ✅
          ├── Notes (collapsible) ✅
          └── Swipe to remove ✅
```
On save → writes to: Sessions, SessionSkills, Corrections, SkillNotes, Timeline, Skills ✅

---

## Tab 1 — The Barre ✅
```
The Barre
  ├── Context strip (level badge + weakest dimension) ✅
  ├── Hero action card — "Log your session" ✅
  ├── Active skills ✅
  │     Each skill card:
  │       ├── Skill name + category ✅
  │       ├── Last correction ✅
  │       ├── Last worked on ✅
  │       ├── Swipe to remove ✅
  │       └── → Skill detail (personal view) ✅
  ├── [Empty state] 🔧
  └── Browse by category
        ├── Barre work → Folder (8 skills) ✅
        ├── Centre work → ⬜
        ├── Turns → ⬜
        ├── Allegro → ⬜
        ├── Pointe work → ⬜ (hidden if hidePointe=true)
        └── Flexibility & strength → ⬜

Skill detail — personal view
  ├── Sticky header ✅
  ├── Skill name + pronunciation + difficulty ✅
  ├── [About [skill] →] → Skill knowledge page ✅
  ├── Progression summary ✅
  ├── Active goal (if linked) ✅
  ├── Corrections (with filters) ✅
  ├── My notes ✅
  ├── Photos & videos 🔧 grid shown, upload ⬜
  └── Linked goals ✅
```

---

## Tab 2 — Assess ✅
```
Assess
  ├── Placement quiz (retake) ✅
  ├── Footwork & articulation → Folder (5 placeholders) 🔧
  ├── Splits & extensions → ⬜
  ├── Core & stamina → ⬜
  ├── Pirouettes & rotation → ⬜
  └── Assessment history ⬜

New assessments 📋
  ├── Strength assessment (2 questions) 📋
  ├── Turnout assessment (1–2 questions) 📋
  └── Individual area check-ins (event-triggered) 📋
```

---

## Tab 3 — Goals ✅
```
Goals
  ├── Active goals (grouped by category) ✅
  │     Each card:
  │       ├── Title + body ✅
  │       ├── Linked skill or dimension ✅
  │       ├── Category tag ✅
  │       ├── Linked corrections ✅
  │       ├── Milestones with progress ✅
  │       ├── Due date ✅
  │       ├── Swipe right → complete ✅
  │       ├── Swipe left → delete ✅
  │       └── Edit ✅
  ├── Completed goals (collapsible) ✅
  ├── [Empty state] 🔧
  └── Goal creator overlay ✅
        ├── Title + body ✅
        ├── Category ✅
        ├── Link to skill ✅
        ├── Link to dimension ✅
        ├── Due date ✅
        ├── Milestones ✅
        └── Link corrections (search-as-you-type) ✅
```

---

## Tab 4 — Learn 🔧 (partial — MVP scope reduced)

### MVP Learn structure
```
Learn
  ├── Skill library ✅ (merged with glossary for MVP)
  │     ├── Browse by category ✅
  │     ├── Search (accent-normalised) ✅
  │     ├── Filter: All / Skills I've recorded ✅
  │     └── Skill knowledge page 🔧
  │           ├── Name + pronunciation + difficulty ✅
  │           ├── [My [skill] →] → Skill personal view ✅
  │           ├── Description ✅ (4 full, 11 stubs)
  │           ├── Key points ✅
  │           ├── Musicality ✅
  │           ├── Common corrections ✅
  │           ├── Muscles involved ✅
  │           ├── Builds on / Leads to ✅
  │           └── Warm-up / Drills / Repertoire / Variations ⬜
  ├── Famous ballets → stub "coming soon" 📋
  ├── Composers → stub "coming soon" ⬜
  ├── Variations → stub "coming soon" ⬜
  └── Legendary dancers → stub "coming soon" ⬜
```

### Content gap
- 15 skills in DATA.skills (4 full, 11 stubs, 65+ to add)
- Glossary merged into skill library for MVP — no separate glossary screen
- All other Learn sections stubbed gracefully, no dead pages

---

## Tab 5 — Profile 🔧 (built, not verified on device)
```
Profile
  ├── Sticky header + settings icon 🔧
  ├── Status area (background surface) 🔧
  │     ├── Avatar (squircle, 60×60) → openPicPicker() 🔧
  │     ├── Level eyebrow 🔧
  │     ├── Level animal watermark (7% opacity) 🔧
  │     └── Insight sentence (priority queue) 🔧
  └── Focus area card stack 🔧
        Order back→front: Pointe · Artistry · The Body · Movement · Technique
        Card states: fully assessed / partially assessed / unassessed / pointe opt-in
        Each card → bottom sheet 🔧
```

### Profile Timeline ✅
```
Timeline
  ├── Sessions (tappable → session detail) ✅
  ├── Assessments ✅
  ├── Milestones ✅
  ├── Reflections ✅
  └── Manual entries ✅
```

### Session Detail ✅
```
Session detail
  ├── Header (back, edit, delete) ✅
  ├── Session title + date + class type + location ✅
  ├── Notes & corrections blocks (read-only) ✅
  └── Linked skills (chips → skill personal view) ✅
```

---

## Settings 🔧 (built, not verified on device)
```
Settings
  ├── Profile
  │     ├── Profile picture 🔧 (3 defaults, upload)
  │     └── Display name 🔧
  ├── My training
  │     └── Pointe toggle 🔧
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

## Social & Sharing ⬜ All deferred
## Store & Distribution ⬜ All deferred
## Monetisation ⬜ All deferred

---

## Focus Area System 🔧 (built, not verified)

| Area | Sub-dimensions | Assessment source |
|------|----------------|-------------------|
| Technique | (single) | Barre + centre questions averaged |
| Movement | Turns, Allegro | Pirouette + allegro questions |
| The Body | Flexibility, Strength, Turnout | Split/legHeight + new questions |
| Artistry | (single) | Musicality question |
| Pointe | (single, opt-in) | Pointe question |

---

## Illustrations
| Set | Count | Status |
|-----|-------|--------|
| Level animals | 6 | ✅ embedded |
| Profile picture defaults | 12 | 🔧 3 done, 9 outstanding |
| Onboarding hero | 2 | 🔧 basic SVG, needs quality |
| Empty state spot illustrations | 3 | ⬜ |
