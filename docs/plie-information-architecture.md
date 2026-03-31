# Plié — Information Architecture & Sitemap
*Supersedes all previous IA documents. Last updated: March 2026.*

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
- No em dashes. No AI commentary. No keyboard shortcuts surfaced to users.

---

## Technical Foundation
- Modular vanilla JS PWA, no framework, no build step ✅
- Hosted on GitHub Pages ✅
- Storage: localStorage only ✅
- Cross-device sync / cloud backup ⬜
- Font: EB Garamond italic (tab screen titles, skill names on cards/detail pages), DM Sans 600 (all sheet/overlay headings), DM Sans (UI) — Georgia and Cormorant Garamond retired ✅
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
  - Add a note 📋
  - Set a goal ✅
- Bottom nav: The Barre · Goals · Learn · Profile ✅ (4 tabs — Assess dissolved)
- Both hidden during onboarding, quiz, session logger ✅

### Training States 📋
- Active — currently attending regular classes
- Resting — taking a break (goals paused, no prompts)
- Recovering — injury/illness (goals paused, different messaging)

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

## Onboarding Flow 📋
```
Screen 1 — Welcome (single screen, no carousel) 📋
  CTA: "let's go →" / "skip quiz, I want to set my level →"
  ↓
Orientation Quiz (14 questions) ✅ (replaces Placement Quiz)
  ↓ complete / skip
Results screen ✅ (level badge, dimension bars, strengths/focus)
  ↓ continue to your profile
Profile — first-visit launchpad ✅
```

### Orientation Quiz Notes
- Replaces "placement quiz" — same 14 questions, new framing
- Accessible from Profile tab (retake) ✅
- Questions cover: technique, movement, artistry, body, pointe
- Pointe question: add "not interested" option 📋
- Strength + turnout questions: deferred 📋
- New dimension model: Technique / Movement / The Body / Artistry / Pointe 📋

---

## Session Logger ✅
```
Session Logger
  ├── Date (autofills today, editable, retrospective dates allowed) ✅
  ├── Session name / saved session dropdown ✅
  │     ├── Saved templates ✅
  │     ├── One-off entry ✅
  │     └── Add new session (name, location, class type, recurrence) ✅
  ├── Class type (pill chips) 📋 (currently square cards — migrate to pills)
  └── Note blocks ✅
        Each block:
          ├── Skill title (free text) ✅
          ├── Linked skill (auto-detected or manual) ✅
          ├── Free text notes ✅
          ├── Source chips: Correction · Observation 📋 (replaces mode tabs)
          ├── Highlight star ✅
          └── Swipe to remove ✅
```
On save → writes to: Sessions, SessionSkills, Corrections, SkillNotes, Timeline, Skills ✅

---

## Tab 1 — The Barre ✅
```
The Barre
  ├── Hero card — session CTA ("Did you go today?") 📋
  │     Variants: Active / Resting / Recovering / named session if scheduled
  ├── Active skills ✅
  │     Each skill card:
  │       ├── Skill name (EB Garamond italic, --ink, 24px) + category ✅
  │       ├── Last correction (italic, quoted) ✅
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

## Tab 2 — Goals ✅
```
Goals
  ├── Active goals (grouped by type) ✅
  │     Each card:
  │       ├── Title ✅
  │       ├── Goal type label ✅
  │       ├── Linked skill (name shown) 📋
  │       ├── Commitment period (friendly display) 📋
  │       ├── Progress markers with checkboxes ✅
  │       ├── Linked corrections ✅
  │       ├── How often (habit goals) 📋
  │       ├── Swipe right → complete ✅
  │       ├── Swipe left → delete (no confirm() dialog) 📋
  │       └── Edit ✅
  ├── Completed goals (collapsible) ✅
  ├── "view past goals →" link → All Goals page 📋
  ├── [Empty state] 🔧
  └── Goal creator overlay ✅
        Entry question: "What are you working toward?"
        Three types:
          ├── A skill
          │     ├── Title ("name it so you'd recognise it in a month") ✅
          │     ├── What you're working toward ✅
          │     ├── Linked skill (auto-detect + combobox) ✅
          │     ├── What does progress look like? (progress markers) ✅
          │     ├── Commitment period (chips + custom calendar) ✅
          │     └── Link corrections (search-as-you-type) ✅
          ├── A feeling or state
          │     ├── Title ✅
          │     ├── What you're working toward ✅
          │     └── Commitment period ✅
          └── A habit
                ├── Title ✅
                ├── What you want to do ✅
                ├── How often (stepper) ✅
                └── Commitment period ✅

All Goals page 📋
  ├── Full history, grouped by year
  ├── Compact cards (tap to expand)
  └── Back link
```

### Goal Renewal 📋
- On completion or period end: renewal prompt
- Prompt echoes goal title only: "'[title]' — how's it going?"
- Options: renew / archive / view
- New instance linked to original (goal lineage)

---

## Tab 3 — Learn 🔧 (partial — MVP scope reduced)

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
  ├── Pointers 📋 (diagnostic content type)
  │     ├── Filter chip in Learn 📋
  │     ├── 4 MVP pointer areas 📋
  │     └── Each pointer: short diagnostic + what to try
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

## Tab 4 — Profile 🔧 (built, not verified on device)
```
Profile
  ├── Sticky header + settings icon 🔧
  ├── Status area (background surface) 🔧
  │     ├── Avatar (squircle, 60×60) → openPicPicker() 🔧
  │     ├── Level eyebrow 🔧
  │     ├── Level animal watermark (7% opacity) 🔧
  │     └── Insight sentence (priority queue) 🔧
  ├── Signal lines (replace score bars) 📋
  │     One per dimension: factual count labels, no numeric scores
  ├── Focus area card stack 🔧
  │     Order back→front: Pointe · Artistry · The Body · Movement · Technique
  │     Card states: fully assessed / partially assessed / unassessed / pointe opt-in
  │     Each card → bottom sheet 🔧
  └── "Start orientation quiz →" (if not assessed) 📋
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

## Orientation Quiz (formerly Placement Quiz) ✅
```
Orientation quiz
  ├── 14 questions ✅
  ├── Counter + progress bar ✅
  ├── calculateResults → level + dimensions ✅
  └── Accessible from Profile tab (retake) ✅
```
Note: "Assessment" / "Assess" language removed throughout. Assess tab dissolved.

---

## Settings 🔧 (built, not verified on device)
```
Settings
  ├── Profile
  │     ├── Profile picture 🔧 (3 defaults, upload)
  │     └── Display name 🔧
  ├── My training
  │     ├── Pointe toggle 🔧
  │     └── Training state (Active / Resting / Recovering) 📋
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
| Onboarding hero | 1 | ⬜ (single welcome screen) |
| Empty state spot illustrations | 3 | ⬜ |
