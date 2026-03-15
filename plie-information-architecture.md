# Plié — Information Architecture & Sitemap v2
*Supersedes all previous IA documents. Updated to reflect all design decisions, built features, and outstanding items.*

---

## Status Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Built and shipped |
| 🔧 | Partially built / in progress |
| 📋 | Designed, not yet built |
| ⬜ | TBD — not yet designed or built |

---

## Voice & Tone

- Addressing: "you/your" default, occasional "we" when collaborating
- Register: Knowledgeable mentor — confident, informed, slightly aspirational
- Formality: Warm professional — like a good ballet teacher
- Personality: Subtle authority, not personified
- Buttons: All lowercase
- Language: British English
- The app is NOT a teacher — it's a companion for what happens outside the studio

---

## Technical Foundation

- Single-file vanilla JS PWA, no framework, no build step ✅
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
| Splash screen / loading animation | 🔧 Partially done |
| App icon — all sizes iOS/Android | ⬜ |
| iOS launch screen | ⬜ |
| PWA manifest | ✅ |
| Service worker / offline caching | ✅ Basic |
| Offline state UI / offline-first behaviour | ⬜ |
| Error states (network, storage full, failed save) | ⬜ |
| Loading states for async operations | ⬜ |
| Back navigation edge cases / deep links | ⬜ |
| Onboarding flow for reinstalling users | ⬜ Currently restarts from quiz |

### Global Navigation — ✅

- Floating Action Button (always visible above nav, hidden during onboarding/quiz/logger)
  - Log a session ✅
  - Add a goal ✅
  - Note a reflection ✅
- Bottom nav: The Barre · Assess · Goals · Learn · Profile ✅
- Both hidden during onboarding, quiz, and session logger ✅

### Empty States

| Screen | Status |
|--------|--------|
| The Barre — no active skills | 🔧 Basic |
| Goals — no goals | 🔧 Basic |
| Profile — not assessed | 🔧 Basic |
| Learn — no results | 🔧 Basic |
| All others | ⬜ Inconsistent |

### Push Notifications ⬜

| Item | Status |
|------|--------|
| Push notification infrastructure | ⬜ |
| Session reminder notifications | ⬜ |
| Milestone / goal completion notifications | ⬜ |
| Reflection prompt notifications | ⬜ |
| Notification permission request flow | ⬜ |
| Notification settings (see Settings screen) | ⬜ |

---

## Identity & Access ⬜ All TBD

| Item | Status |
|------|--------|
| User accounts / authentication | ⬜ |
| Login screen | ⬜ |
| Sign up / registration flow | ⬜ |
| Password reset | ⬜ |
| Account deletion | ⬜ |
| Session persistence beyond localStorage | ⬜ Currently localStorage only |
| GDPR / data deletion flow | ⬜ |
| Age verification (under-18 users) | ⬜ |
| Privacy policy screen | ⬜ |
| Terms of service screen | ⬜ |
| Cookie / tracking consent | ⬜ |

---

## Onboarding Flow (first launch only) ✅

```
Onboarding screen 1 — Welcome ✅
Onboarding screen 2 — Know where you stand ✅
Onboarding screen 3 — Your growth starts here ✅
  ↓ begin / skip
Placement Quiz (14 questions) ✅ — see amendments below
  ↓ complete / exit partway / skip quiz
Completion screen ✅
  ↓ see my results
Results screen ✅ (level badge, dimension bars, strengths/focus)
  ↓ continue to your profile
Profile — first-visit launchpad ✅
```

### Placement Quiz Amendments 📋

| Change | Status |
|--------|--------|
| Pointe question — add "not interested / not relevant to me" option | 📋 Designed, not built |
| Strength assessment questions (new) | 📋 Designed, not built |
| Turnout assessment questions (new) | 📋 Designed, not built |
| Dimension model updated: Technique / Movement (Turns+Allegro) / The Body (Flexibility+Strength+Turnout) / Artistry / Pointe | 📋 Designed, not built |
| `contributingDimensions[]` added to Skill data model | 📋 Designed, not built |
| Knowledge questions moved out of scored dimensions → Learn tab only | 📋 Designed, not built |

---

## Session Logger (overlay) ✅

Accessible via FAB from any screen.

```
Session Logger ✅
  ├── Date (autofills today, editable) ✅
  ├── Session name / saved session dropdown ✅
  │     ├── Saved session templates ✅
  │     ├── One-off entry ✅
  │     └── Add new session (name, location, class type, recurrence) ✅
  ├── Class type carousel ✅
  │     ├── Technique class ✅
  │     ├── Private lesson ✅
  │     ├── Open class ✅
  │     └── More… (Company, Masterclass, Workshop, Rehearsal, Retreat, Conditioning) ✅
  └── Notes & corrections blocks ✅
        Each block:
          ├── Topic (General / category / specific skill) ✅
          ├── Title ✅
          ├── Mode: Correction / Praise / Reflection ✅
          ├── Correction bullets ✅
          ├── Notes (collapsible) ✅
          └── Swipe to remove ✅
```

On save → writes to: Sessions, SessionSkills, Corrections, SkillNotes, Timeline, Skills (flagged) ✅

---

## Tab 1 — The Barre ✅

```
The Barre
  ├── Context strip (level badge + weakest dimension) ✅
  ├── Hero action card — "Log your session" ✅
  ├── Active skills (5–15 skills) ✅
  │     Each skill card:
  │       ├── Skill name + category ✅
  │       ├── Last correction ✅
  │       ├── Last worked on ✅
  │       ├── Swipe to remove from active ✅
  │       └── → Skill detail page (personal view) ✅
  ├── [Empty state] ✅
  └── Browse by category
        ├── Barre work → Folder (8 skills) ✅
        ├── Centre work → ⬜ Coming soon
        ├── Turns → ⬜ Coming soon
        ├── Allegro → ⬜ Coming soon
        ├── Pointe work → ⬜ Coming soon (hidden if hidePointe=true)
        └── Flexibility & strength → ⬜ Coming soon
```

### Skill Detail — Personal View ("My [Skill]") ✅

```
Skill detail — personal view
  ├── Sticky header (collapses when hero scrolls away) ✅
  ├── Skill name + pronunciation + difficulty ✅
  ├── [About [skill] →] → Skill knowledge page ✅
  ├── Progression summary (last worked / corrections / sessions) ✅
  ├── Active goal (if linked) ✅
  ├── Corrections (with filters: all / recurring / linked to goals) ✅
  ├── My notes ✅
  ├── Photos & videos 🔧 Grid shown, upload coming soon ⬜
  └── Linked goals ✅
```

---

## Tab 2 — Assess ✅

```
Assess
  ├── Placement quiz (retake) ✅
  │     └── → Quiz → Results → Profile
  ├── Footwork & articulation → Folder (5 placeholder exercises) 🔧
  ├── Splits & extensions → ⬜ Coming soon
  ├── Core & stamina → ⬜ Coming soon
  ├── Pirouettes & rotation → ⬜ Coming soon
  └── Assessment history ⬜
        └── Dimension scores over time
```

### New assessments to build 📋

Per the new dimension model agreed in design:
- Strength assessment (2 questions, focused on most critical areas) 📋
- Turnout assessment (1–2 questions with image options) 📋
- Individual area check-ins (event-triggered from profile cards) 📋

---

## Tab 3 — Goals ✅

```
Goals
  ├── Active goals (grouped by category) ✅
  │     Each goal card:
  │       ├── Title + body ✅
  │       ├── Linked skill or dimension ✅
  │       ├── Category tag ✅
  │       ├── Linked corrections ✅
  │       ├── Milestones with progress ✅
  │       ├── Due date ✅
  │       ├── Swipe right → complete ✅
  │       ├── Swipe left → delete ✅
  │       └── Edit ✅
  ├── Completed goals (collapsible, see all) ✅
  ├── [Empty state] ✅
  └── + set a goal → Goal creator overlay ✅
        ├── Title + body ✅
        ├── Category (free text with suggestions) ✅
        ├── Link to skill (optional) ✅
        ├── Link to dimension (optional) ✅
        ├── Due date (optional) ✅
        ├── Milestones (Enter to add next) ✅
        └── Link corrections (search-as-you-type) ✅
```

---

## Tab 4 — Learn ✅ (partial)

```
Learn
  ├── Skill library ✅
  │     ├── Browse by category ✅
  │     ├── Search (accent-normalised) ✅
  │     ├── Filter: All / Skills I've recorded ✅
  │     └── Skill knowledge page 🔧
  │           ├── Name + pronunciation + difficulty ✅
  │           ├── [My [skill] →] → Skill personal view ✅
  │           ├── Description ✅ (4 skills full, 11 stubs)
  │           ├── Key points ✅ (tappable → save as note/correction)
  │           ├── Musicality ✅
  │           ├── Common corrections ✅ (tappable)
  │           ├── Muscles involved + "why these muscles?" ✅
  │           ├── Builds on → linked skills ✅
  │           ├── Leads to → linked skills ✅
  │           └── [Accordion] Warm-up / Drills / Repertoire / Variations ⬜
  ├── Glossary 🔧
  │     ├── Alphabetical index ✅
  │     ├── Search ✅
  │     ├── Skill terms (links to knowledge pages) ✅
  │     └── Definitions ⬜ All marked "coming soon"
  ├── Famous ballets 🔧
  │     └── Ballet detail pages ⬜
  │           ├── Synopsis ⬜
  │           ├── Choreographer + composer ⬜
  │           ├── Famous productions ⬜
  │           ├── Notable dancers ⬜
  │           └── Connected skills / variations ⬜
  ├── Composers → ⬜ Coming soon
  ├── Variations → ⬜ Coming soon
  └── Legendary dancers → ⬜ Coming soon
```

### Skill library content gap ⬜

- 15 skills currently in DATA.skills
- IA specifies 80+ skills
- Full content written for: plié, tendu, pirouette, arabesque
- Stub content for: remaining 11
- 65+ skills to be added ⬜

---

## Tab 5 — Profile 📋 (redesign in progress)

The profile screen is currently being redesigned. The new structure replaces the dimension bar chart with an area card stack.

### New Profile Structure 📋

```
Profile
  ├── Sticky header (profile label + level pill) ✅
  ├── Status card — "the surface the cards live on" 📋
  │     ├── Avatar (squircle — upload or choose from 12 defaults) 📋
  │     ├── Insight sentence (event-driven, updates on activity) 📋
  │     ├── Level name (Beginner → Improver → Advanced etc.) 📋
  │     └── Level animal/archetype illustration 📋
  │           (Duckling / Rabbit / Deer / Swan / Sylph / Firebird)
  └── Focus area card stack (replaces dimension chart) 📋
        Cards stacked with NYT-style overlapping peek, front card fully visible.
        Order top→bottom (back→front): Pointe · Artistry · The Body · Movement · Technique
        Each card:
          ├── Area name + icon ✅ (mockup)
          ├── Sub-dimension tracks (where applicable) ✅ (mockup)
          ├── Stats: corrections · last session · goals ✅ (mockup)
          └── → Bottom sheet (matches session logger style) ✅ (mockup)
                ├── Where you are (N of 4) + track ✅
                ├── What this means ✅
                ├── Jump tabs: Focus · Corrections · Goals · Connected sessions ✅
                ├── How this fits (TBD rename) ✅
                └── Assessment history (expandable accordion) ✅

        Card states:
          ├── Fully assessed — full card ✅ (mockup)
          ├── Partially assessed — shows assessed sub-dims, nudge for rest ✅ (mockup)
          ├── Unassessed — compact, grows on scroll, sheet has assess CTA ✅ (mockup)
          └── Pointe — opt-in, dismissable, restores via assessment ✅ (mockup)
```

### Profile Timeline ✅

```
Timeline (auto-populated, date-grouped)
  ├── Sessions (tappable → Session detail) ✅
  ├── Assessments ✅
  ├── Milestones (goal completions, praise) ✅
  ├── Reflections ✅
  └── Manual entries ✅
```

### Session Detail View ✅

```
Session detail
  ├── Header (back, edit, delete) ✅
  ├── Session title + date + class type + location ✅
  ├── Notes & corrections blocks (read-only) ✅
  └── Linked skills (chips → skill personal view) ✅
```

---

## Settings Screen 📋

New screen, not yet built. Accessible from Profile tab (tap avatar or settings icon TBD).

```
Settings
  ├── Profile
  │     ├── Profile picture (tap to change) 📋
  │     │     ├── Choose from defaults (12 illustrated cameos) 📋
  │     │     └── Upload photo 📋
  │     └── Display name 📋
  │
  ├── My training
  │     ├── Pointe work
  │     │     ├── "Pointe is part of my training" toggle 📋
  │     │     └── (If off: hides pointe from profile, skill library, goals, assessment)
  │     └── Reassessment reminders ⬜
  │
  ├── Notifications ⬜
  │     ├── Session reminders ⬜
  │     ├── Reflection prompts ⬜
  │     └── Milestone celebrations ⬜
  │
  ├── Display ⬜
  │     └── Dark mode ⬜ (TBD — not in current CSS)
  │
  ├── Data
  │     ├── Export my data (PDF training log / CSV) ⬜
  │     ├── Import data ⬜
  │     └── Reset all data ✅ (currently in profile, move here)
  │
  ├── Account ⬜ (all TBD pending auth)
  │     ├── Sign in / create account ⬜
  │     ├── Sync across devices ⬜
  │     ├── Change password ⬜
  │     └── Delete account ⬜
  │
  └── About
        ├── Privacy policy ⬜
        ├── Terms of service ⬜
        └── Version / credits ⬜
```

---

## Social & Sharing ⬜ All TBD

| Item | Status |
|------|--------|
| Share a session or achievement | ⬜ |
| Share a goal completion | ⬜ |
| Teacher sharing — send corrections log to teacher | ⬜ |

---

## Store & Distribution ⬜ All TBD

| Item | Status |
|------|--------|
| App Store listing copy | ⬜ |
| App Store screenshots | ⬜ |
| App Store preview video | ⬜ |
| Google Play equivalent | ⬜ |
| TestFlight / beta distribution | ⬜ |

---

## Monetisation ⬜ All TBD (future)

| Item | Status |
|------|--------|
| Paywall / subscription gate | ⬜ |
| Free vs paid tier differentiation | ⬜ |
| Restore purchases | ⬜ |

---

## Data Architecture Summary

*Full detail in plie-data-architecture.js — this is an overview only.*

| Object | Created | Surfaces |
|--------|---------|----------|
| Session | Session Logger | Profile timeline, The Barre, Skill personal view |
| SessionTemplate | Session Logger | Session Logger dropdown |
| SessionSkill | Session Logger (on save) | Skill personal view, corrections |
| Correction | Session Logger, Skill knowledge page | Skill personal view, Profile focus cards, Goals |
| SkillNote | Skill personal view, reflection overlay | Skill personal view, Profile timeline |
| Goal | Goal creator | Goals tab, Profile hero card, Skill personal view |
| Assessment | Quiz, individual check-ins (planned) | Profile focus cards, The Barre context strip |
| TimelineEntry | Auto-created on session/assessment/milestone save | Profile timeline |

### Data model changes agreed (not yet built) 📋

```js
// Skill — new fields
Skill.contributingDimensions: Array  // secondary dimensions beyond primary

// New dimension IDs replacing old barre/centre/musicality/knowledge
// technique | movement (turns+allegro) | body (flexibility+strength+turnout) | artistry | pointe

// appState additions
appState.hidePointe: Boolean         // hides pointe everywhere in app
appState.profilePicture: String      // data URL or default ID

// STORAGE_KEYS additions
'plie:preferences'                   // hidePointe, displayName, profilePicture etc.
```

---

## Focus Area System (replacing dimension chart) 📋

*Agreed in design. Not yet built.*

### Areas and their sub-dimensions

| Area | Sub-dimensions | Assessment source |
|------|----------------|-------------------|
| Technique | (single) | Existing barre + centre questions averaged |
| Movement | Turns, Allegro | Existing pirouette + allegro questions |
| The Body | Flexibility, Strength, Turnout | Existing split/legHeight + new questions |
| Artistry | (single) | Existing musicality question |
| Pointe | (single, opt-in) | Existing pointe question |

### Area card states

| State | Behaviour |
|-------|-----------|
| Fully assessed | Full card, all stats, all jump tabs |
| Partially assessed | Shows assessed sub-dims, nudge for unassessed, partial tabs |
| Unassessed | Compact card, grows on scroll, sheet has assess CTA, no jump tabs |
| Pointe dismissed | Hidden from stack, restores when pointe assessment completed |

### Event-triggered reassessment 📋

When X corrections tagged to an area accumulate within Y days, a soft prompt appears on that area's card: "You've been working on [area] — want to update where you are?" Single question, one area. Not a full re-quiz.

---

## Illustrations Required ⬜

*Full brief in plie-illustration-brief.md*

| Set | Count | Status |
|-----|-------|--------|
| Level animals/archetypes (Duckling, Rabbit, Deer, Swan, Sylph, Firebird) | 6 | ⬜ |
| Profile picture defaults (cameo portraits) | 12 | ⬜ |
| Onboarding hero illustrations | 2 | 🔧 Basic SVG exists, needs quality |
| Empty state spot illustrations | 3 | ⬜ |

---

## TBD Items Requiring Design Decisions

These are open questions that need a decision before they can be designed or built:

1. **"How this fits" section label** — current placeholder. Needs final copy. *(TBD)*
2. **Assessment history button text** — "update this mark" is placeholder. Needs final copy. *(TBD)*
3. **Behavioural stage descriptors** — 5 stages × 5 areas = 25 short descriptions replacing "2 of 4". Agreed approach, copy not written. *(TBD)*
4. **Insight sentence logic** — event priority queue agreed (session today → milestone → correction pattern → assessment fallback). Not built. *(TBD)*
5. **Settings access point** — where is the settings icon on the profile screen? Options: top-right of header, bottom of profile, inside avatar tap. *(TBD)*
6. **Dark mode** — not in current CSS. Decision needed before it can be specced. *(TBD)*
7. **Notification strategy** — types and triggers agreed at high level. Full spec needed before build. *(TBD)*
8. **Teacher sharing** — what exactly gets shared, in what format. *(TBD)*
9. **Monetisation model** — which features are free vs paid. Affects information architecture if a paywall exists. *(TBD)*
