# Plié — Sitemap & Information Architecture

---

## Global Elements (always present in app state)

- **FAB (+)** — opens Session Logger overlay from any screen
- **Bottom nav** — The Barre / Assess / Goals / Learn / Profile
- Both hidden during onboarding, quiz, and session logger

---

## Onboarding Flow (first launch only)

```
Onboarding 1 (welcome)
Onboarding 2 (find your level)
Onboarding 3 (what you can do)
  ↓ begin / skip
Placement Quiz (14 questions)
  ↓ complete / exit partway / skip quiz
Completion screen
  ↓ see my results
Results screen (level badge, dimension bars, strengths/focus)
  ↓ continue to your profile
Profile (first-visit launchpad)
```

---

## Session Logger (overlay — accessible from any screen)

```
Session Logger
  ├── Date (autofills today, editable)
  ├── Session (optional)
  │     ├── Saved sessions dropdown
  │     │     └── [saved templates appear here]
  │     ├── One-off (default)
  │     └── Add new session →
  │           ├── Name
  │           ├── Location (optional)
  │           ├── Class type
  │           └── Repeats (One-off / Weekly / Fortnightly / Monthly)
  │                 └── [if weekly+] Day of week chips
  ├── Class type (optional — carousel)
  │     ├── Technique class
  │     ├── Private lesson
  │     ├── Open class
  │     └── More… →
  │           ├── Company class
  │           ├── Masterclass
  │           ├── Workshop
  │           ├── Rehearsal
  │           ├── Ballet retreat
  │           ├── Conditioning
  │           └── Add new…
  └── Notes & corrections blocks (unlimited, + button)
        Each block:
          ├── Title/first line (bold — acts as label)
          ├── Category (General · Barre · Centre · Turns · Allegro · Pointe · Musicality)
          │     └── Specific skill (optional — filtered by category, links to Learn)
          ├── Notes (free text)
          ├── Corrections (free text)
          └── Highlight toggle (★)
        General block floats to top
```

**On save → writes to:**
- `appState.sessions[]`
- Skills named in blocks → surface in The Barre as active
- Timeline entry created
- `storage.save()` (localStorage in Stage 3)

---

## Tab 1 — The Barre

```
The Barre
  ├── Context strip (level badge + weakest dimension)
  ├── Active skills (5–15 skills currently being worked on)
  │     Each skill card:
  │       ├── Skill name + category
  │       ├── Last correction (from most recent session block)
  │       ├── Last worked on (date)
  │       └── → Skill detail page (personal view)
  ├── [empty state: no active skills yet]
  └── Browse by category
        ├── Barre work → Folder detail
        ├── Centre work → (coming)
        ├── Turns → (coming)
        ├── Allegro → (coming)
        ├── Pointe work → (coming)
        └── Flexibility & strength → (coming)

Skill detail — personal view ("My [Skill]")
  ├── Skill name + pronunciation
  ├── Progress indicator
  ├── [Learn more about [skill] →] → Skill knowledge page
  ├── My corrections (dated, from sessions — most recent first)
  ├── My notes (free text)
  ├── Photos (grid)
  ├── Linked goals
  └── Last worked on: [date]
```

---

## Tab 2 — Assess

```
Assess
  ├── Placement quiz (retake)
  │     └── → Quiz → Results → Profile
  ├── Footwork & articulation → Folder detail (5 exercises)
  ├── Splits & extensions → (coming)
  ├── Core & stamina → (coming)
  └── Pirouettes & rotation → (coming)

Assessment history (coming)
  └── Dimension scores over time (line charts)
```

---

## Tab 3 — Goals

```
Goals
  ├── [empty state: no goals yet]
  ├── Active goals
  │     Each goal card:
  │       ├── Description + timeframe
  │       ├── Linked skill(s) or dimension
  │       ├── Progress indicator
  │       └── Linked sessions (tracking)
  └── + set a goal →
        ├── Description
        ├── Timeframe
        ├── Link to skill or dimension (optional)
        └── Save
```

---

## Tab 4 — Learn

```
Learn
  ├── Skill library (80+ skills)
  │     ├── Browse by category
  │     ├── Search
  │     └── Skill knowledge page
  │           ├── Name + pronunciation + difficulty
  │           ├── [See my [skill] →] → Skill personal view (The Barre)
  │           ├── What it is
  │           ├── Key points (3–5 execution cues)
  │           ├── Musicality (counts, tempo, placement)
  │           ├── Common corrections
  │           ├── Muscles involved
  │           ├── Common combinations
  │           ├── Builds on → [linked skills]
  │           ├── Leads to → [linked skills]
  │           └── [accordion]
  │                 ├── Warm-up and conditioning
  │                 ├── Exercises and drills
  │                 ├── Featured in repertoire
  │                 └── Variations
  ├── Famous ballets → Folder detail
  │     └── Ballet page
  │           ├── Synopsis
  │           ├── Choreographer + composer
  │           ├── Famous productions
  │           ├── Notable dancers
  │           └── Connected skills/variations
  ├── Composers → (coming)
  ├── Variations → (coming)
  └── Legendary dancers → (coming)
```

---

## Tab 5 — Profile

```
Profile
  ├── Level badge
  ├── Dimension chart (Technique + Artistry & Knowledge)
  ├── Hero action card (contextual — evolves over time)
  │     First visit: "Record your next class" → opens Session Logger
  │     After sessions: "Pick up where you left off" → The Barre
  ├── Goal prompt card (first visit) → Goals
  ├── Make the most of plié (horizontal scroll)
  │     ├── Save corrections → Session Logger
  │     ├── Set goals → Goals
  │     ├── Track your skills → The Barre
  │     ├── Reassess yourself → Assess
  │     ├── Study repertoire → Learn
  │     └── Log sessions → Session Logger
  ├── Timeline (auto-populated)
  │     ├── Joined plié / Completed placement quiz
  │     ├── Session entries (date, class type, block count)
  │     ├── Assessment completions
  │     └── Milestones (level changes, goals met)
  └── Settings
        └── Reset profile (testing — remove before release)
```

---

## Data Objects & Where They Surface

| Object | Created in | Surfaces in |
|---|---|---|
| Session | Session Logger | Profile timeline, The Barre (active skills), Skill personal view (corrections) |
| Session template | Session Logger (new session form) | Session Logger dropdown |
| Note/correction block | Session Logger | Skill personal view, Profile timeline |
| Active skill | Session Logger (via block) or manual flag | The Barre |
| Goal | Goals tab | Goals tab, Profile hero card, Skill personal view |
| Assessment result | Quiz / Assess tab | Profile (level + dimensions), The Barre (context strip), Results screen |

---

## Screens Not Yet Built (priority order)

1. Session logger — notes/corrections blocks (Stage 2, in progress)
2. Class type carousel + recurrence day picker
3. Skill detail — personal view (The Barre)
4. Skill knowledge page (Learn)
5. Goal creation flow
6. Session detail view (tap a timeline entry)
7. Assessment history
8. Ballet/composer/dancer/variation pages
9. Settings screen
