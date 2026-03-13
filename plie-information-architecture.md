# Plié — Information Architecture (Agreed)

## Voice & Tone
- **Addressing:** "you/your" default, occasional "we" when collaborating
- **Register:** Knowledgeable mentor — confident, informed, slightly aspirational
- **Formality:** Warm professional — like a good ballet teacher
- **Personality:** Subtle authority, not personified
- **Buttons:** All lowercase
- **Language:** British English
- **The app is NOT a teacher** — it's a companion for what happens outside the studio

## Navigation Structure

### Floating Action Button (always visible above nav)
- Tap to log a session
- Session logger: date, class type, select exercises from skill library, add corrections per exercise, general notes
- Accessible from every screen

### Tab 1: The Barre — Your working space
- **Active skills** — the 5-15 things you're currently working on
- Skills appear here when: flagged, have recent corrections, linked to goals, or manually added
- Each skill card shows: last correction, progress, when last worked on
- Can remove skills when you've moved on
- Contextual top card: "Pick up where you left off" or "Start here" (new users)
- Recent session summary
- Link from each skill: "Learn more about [skill] →" → goes to Learn

### Tab 2: Assess (renamed from Foundations)
- Placement quiz (retake)
- Detailed assessments: footwork, flexibility, turns, strength, etc.
- Assessment history (scores over time)
- Single purpose — measuring yourself

### Tab 3: Goals
- Set and manage goals
- Link goals to specific skills or dimensions
- Track progress
- Suggested goals based on assessment results

### Tab 4: Learn — The library
- **Full skill library** — all 80+ skills, browsable by category, searchable
- Ballet repertoire (ballets, productions, synopsis, famous performances)
- Composers
- Famous dancers
- Variations (linked to skills)
- Each skill has a deep knowledge page (see below)
- "Add to my barre →" button on any skill to pin it to active list
- Link from each skill: "See my [skill] →" → goes to The Barre personal view

### Tab 5: Profile — Your summary
- Level badge + dimension chart (permanent)
- First-visit: hero action card, goal prompt, "Make the most of plié" explore cards
- Evolving: contextual next step based on recent activity
- Timeline (auto-populated from sessions, assessments, milestones)
- Settings, preferences

## Assessment Model

### 6 Dimensions (1-5 scale)
- Barre, Centre, Allegro, Turns, Flexibility, Pointe

### 6 Tiers
- Beginner, Elementary, Improver, Intermediate, Upper Intermediate, Advanced

### 11 Quiz Questions
1. Persona (card-select) — "Which best describes you?"
2. Experience — "How long have you been training?"
3. Frequency — "How many hours a week do you spend in class?"
4. Barre — "Where are you with barre work?"
5. Pointe — "What's your experience with pointe work?"
6. Turns — "What best describes your turning right now?"
7. Centre — "How far have you got with centre work?"
8. Allegro — "Where are you with jumps?"
9. Flexibility (splits) — "How close are you to a full front split?"
10. Flexibility (leg height) — "In à la seconde, how high can you hold your leg?"
11. Goals — "What are you working towards?"

## Skill Page Architecture

### Two linked views per skill:

#### "My [Skill]" (The Barre) — Personal view
- Skill name + pronunciation + progress indicator
- [Learn more about [skill] →] link
- My progress (visual indicator + self-rating)
- Corrections (dated list from sessions, most recent first)
- My notes (free text)
- Photos (grid)
- Linked goals
- Last worked on: [date]

#### "[Skill]" (Learn) — Knowledge/reference view
- Skill name + pronunciation + difficulty badge
- Difficulty range: entry point → advanced form
- Visual reference placeholder
- [See my [skill] →] link

**Always visible sections:**
- What it is (clear description)
- Key points (3-5 execution cues)
- Musicality (typical counts, tempo, placement in combinations)
- Common corrections (what teachers frequently address)
- Muscles involved (what's working, where you'll feel it)
- Common combinations (how it appears in class)
- Builds on (prerequisite skills — tappable)
- Leads to (connected skills — tappable)

**Accordion sections (secondary):**
- Warm-up and conditioning
- Exercises and drills to improve
- Featured in repertoire
- Variations of the movement

## Content Relationships (Skill Web)

Skills connect to:
- Other skills (prerequisites, progressions)
- Sessions (when worked on, corrections from that session)
- Goals (skills linked to targets)
- Assessments (dimension scores)
- Repertoire (which ballets/variations use this skill)

Entry points to a skill page:
- From The Barre (browsing active skills)
- From a logged session (reviewing corrections)
- From Learn (browsing library)
- From Goals (checking progress on a target)
- From Repertoire (seeing what techniques a ballet requires)
- From another skill (following a connection)

## Core Objects

### Skill
- French name, pronunciation, English translation
- Difficulty level + difficulty range (entry → advanced)
- Category (Barre, Centre, Turns, Allegro, Pointe, Flexibility)
- Description, execution cues, musicality, corrections, muscles
- Common combinations, warm-up/conditioning, drills
- Prerequisites and progressions (skill connections)
- Repertoire links
- Variations of the movement
- User data: progress, corrections, notes, photos, flagged, goals, session history

### Session (logged class)
- Date, duration, class type
- Exercises worked on (from skill library)
- Corrections per exercise
- General notes

### Goal
- Description, timeframe, progress
- Linked to skills or dimensions
- Linked to sessions (tracking)

### Assessment
- Quiz/assessment type
- Dimension scores
- Date taken
- History for comparison

### Repertoire entry
- Ballet name, synopsis, choreographer, composer
- Famous productions and performances
- Notable dancers
- Connected skills/variations
- User notes, which variations learned

## User Flow

### First-time flow:
Onboarding (3 screens) → Quiz (11 questions) → Results (dimensions + level) → Profile (first-visit launchpad)

### Ongoing core loop:
Go to class → Open app → Tap + to log session → Select exercises → Add corrections → Done
→ Those exercises appear in The Barre as active skills
→ Progress and corrections accumulate over time
→ Reassess periodically to track dimension changes
