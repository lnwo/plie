# Plié
## Product Decisions & Principles
v1.1 — March 2026

*Working document. Update when decisions change.*

---

## 1. What Plié Is

### The honest promise

Plié helps you show up to every class ready to build on the last one. It doesn't teach, it doesn't assess your actual technique — it makes sure nothing gets lost between sessions.

> *Plié makes your teacher more effective. It is never a replacement for one.*

Every feature should pass this test: does it help her get more from her classes? Or is it trying to be the class?

### What Plié is not

- A teacher or coaching tool
- An objective assessment of technique
- A streak or habit-tracking app
- A motivational platform
- A progress tracker that claims to know if she's improving

### The notebook principle

Plié provides containers, not instructions — the lines of the notebook, not the content. She can write one word or paragraphs. She can log every session or only the ones that mattered. The app surfaces everything and allows connections to form without prescribing how she uses it.

Structure recedes when she doesn't need it. Everything is always accessible regardless of training state.

---

## 2. Who It's For

### Primary user

Late 20s to late 30s. Passionate about ballet or deeply committed at the start of the journey. Dedicated regardless of frequency — even 1× weekly, she's in it for the medium to long term.

She watches BWI, follows soloists, uses her stretchbands on weekends. She uses correct ballet vocabulary. She doesn't need hand-holding — she needs a tool that respects her intelligence and her dedication.

### The real job to be done

She's missing continuity between classes. She learns something on Tuesday, it fades by the weekend, and the following week she's not building on it. Plié is the thread that connects each session to the next.

Secondary: she may be in an all-levels class that doesn't offer individual corrections or a clear path to advancement. The app gives her infrastructure to notice her own progress even when her environment doesn't reflect it back.

### Training states

Training state adjusts what Plié emphasises and how it speaks — never what it allows. All features remain accessible in all states. States are soft signals, not commitments.

| State | Description |
|---|---|
| **Active** | Regular training. Default experience. Full emphasis on logging, skills, goals. |
| **Resting** | Voluntary break. App holds her place without nagging or implying failure. Tone: patient. |
| **Recovering** | Injury, surgery, chronic condition, pregnancy. Tone: gentle, non-directive. Conditioning and goal prompts recede. Nothing is gated. Never suggests exercises. Direction on physical matters always defers to teacher or physio. |

---

## 3. Vocabulary

### Copy principles

- Anchor in ballet vocabulary where it exists. Use plain human language where it doesn't.
- Never reach for productivity, wellness, or self-improvement app conventions.
- The register is: knowledgeable friend who also happens to dance — not a coach, not a system.
- British English throughout. Buttons always lowercase.
- 'Dimension' works as a data label. Too clinical for conversational copy — avoid in running text.

### Term decisions

| Old | New | Notes | Status |
|---|---|---|---|
| Assessment / placement quiz | Orientation / where are you now | Removes authoritative weight. Self-guided, not evaluated. | UPDATED |
| Placement result / level | Starting point / your level | Self-selected orientation, not an earned rank. Recedes once set. | UPDATED |
| Correction / Praise / Reflection | Note | Neutral container. Source and valence are separate optional fields, not entry types. | UPDATED |
| Milestone | (no named concept) | Lives inside a goal as checkable intentions. "What does progress look like?" No label needed. | UPDATED |
| Focus area | (dissolved) | Feature does not need a name. Dimension cards and signal lines do the work. | UPDATED |
| Session | Session | Neutral, accurate, no baggage. | KEEP |
| Goal | Goal | Word kept. Three types: skill, intention, habit. | KEEP |
| Practice | Practice (add) | How dancers talk about independent work. Distinct from a class or lesson. | UPDATED |
| Dimension | Use sparingly | Works as a label. Too clinical for conversational copy. | UPDATED |

---

## 4. Note Structure

### What a note is

A note is the core unit of capture. It replaces the three-mode system (Correction / Praise / Reflection) with modular block types set at creation.

| Field | Description |
|---|---|
| **Block type** | Set at creation: Correction / Observation / Note / Goal. Shown as a small-caps label on the block. No chips inside the block. A Note block has no source. |
| **Content** | Free text. No length constraint. |
| **Highlight ★** | Boolean. Surfaces the note prominently in skill view and timeline. |
| **Linked skill** | Optional. Central to long-term findability. Multiple choice from skill library. Always overridable. |
| **Linked session** | Automatic when logged within a session. Corrections can also be logged standalone via FAB with no session. |

**Reflections / standalone notes:** A standalone note logged via "Save a note" in the FAB is a note with no session and no skill link. It uses the same object type — there is no separate reflection type. 'Reflection' as a distinct mode is removed.

### Note block structure

| Element | Position | Notes |
|---|---|---|
| Type label | Above block header | Block type (CORRECTION / OBSERVATION / NOTE / GOAL). Small-caps, DM Sans 600, `--ink-5`. Set at creation. |
| Highlight star | Left of topic input | `[★] [topic] [×]` order. |
| Topic input | Centre | Skill or topic name. Triggers skill suggestion chips when typed. |
| Content area | Below header row | Contenteditable with live `—` dash prefix per line (CSS `::before`, not typed). No title field above it. |

**Title field:** removed. Notes have a topic but not a separate title. The content area leads.

**Source chips:** removed. Block type replaces them entirely.

### Highlight toggle

| State | Treatment |
|---|---|
| Unstarred | #C8BFB8 outline star. Quiet, present but not demanding. |
| Starred | #C4900C filled star. Gold. Clearly marked. |

### Ask teacher flag — removed

Originally proposed as a flag to surface notes before a class. Removed. The notebook surfaces information well enough that the app does not need to prompt her. If the note is there, she will read it. Trust the user.

### Retrospective date entry

All date fields are retrospective by default. No floor on how far back she can log. If she sets a past date, all dependent data — training state counts, the timeline, the dimension mirror — recalculates from that date.

### Why this replaces the three-mode system

The Correction / Praise / Reflection split conflated source, valence, and origin into one toggle. A correction can be positive. A reflection can record something that went badly. The new model separates these concerns cleanly and gives her a blank container she fills on her terms.

---

## 4a. Highlights

### Where highlights surface

The highlight star marks significance. A starred note or sessionSkill surfaces in three places:

| Surface | Treatment |
|---|---|
| Skill detail | "Highlights" section above Corrections — gold left border, star toggle to un-star |
| Timeline | Session entries show a gold ★ in the subtitle if any note from that session is starred |
| Skill notes ("my notes") | Starred notes render with gold border |

The Highlights section on skill detail is absent entirely if no highlights exist for that skill. It is not shown with an empty state. It appears only when there is something to show.

**Un-starring from skill detail:** The star on each highlight item is tappable — un-starring removes the item from the Highlights section without deleting the note. The note remains in its original location (corrections list or skill notes).

### What is not a highlight

- Getting started cards and session-count milestones are not highlights. The star is for user-chosen significance, not app-generated progress markers.
- A session with many notes is not automatically highlighted. Only explicitly starred items.

---

## 5. Dimensions

### Principle

Dimensions describe what kind of dancer she is, not just what she's working on. They are self-selected orientations, not assessments. She builds her dimension view to match her actual training life.

| Dimension | Status |
|---|---|
| **Technique** | Always present. The core of classical training. |
| **Movement** | Always present. Turns, allegro, travelling work. |
| **Artistry** | Always present. If artistry is not relevant to you, this app is not for you. |
| **The Body** | Always present. Sub-dimensions individually opt-in. |
| **Pointe** | Opt-in. Existing mechanic retained. |

### The Body — expanded sub-dimensions

| Sub-dimension | Notes |
|---|---|
| **Flexibility** | Existing. |
| **Strength** | Existing. |
| **Turnout** | Existing. |
| **Conditioning** | New. Drills, cross-training, warm-up work. |
| **Nutrition** | New. Fuelling, energy, practical food notes. Never framed around weight or appearance. Lens is performance and recovery only. |
| **Sleep & Recovery** | New. Rest, injury management, recovery notes. |

> **Safeguarding — Nutrition sub-dimension**
>
> Eating disorders are disproportionately prevalent in the ballet world. The nutrition sub-dimension must never prompt unprompted — user-initiated only. All copy must be completely divorced from weight, appearance, or restriction. The only permitted lens is performance and recovery. When in doubt, do not write it.

### Opt-in clarification

Technique, Movement, Artistry, and The Body are intrinsic to ballet. They are not opt-in. If you are doing ballet, you are engaging all four. The opt-in mechanic applies only to Pointe (genuinely not relevant to everyone) and to sub-dimensions within The Body (lifestyle choices, not ballet fundamentals).

### Naming convention

Dimension is the confirmed term. Use as a label: "Artistry dimension." Drop in running prose where context makes it obvious: "your artistry hasn't had much attention lately" not "your artistry dimension hasn't had much attention lately." The label carries the word so the copy doesn't have to repeat it.

---

## 6. Goals

### Three goal types

Goals are not a single structure. Different ambitions have different shapes and need different support. The goal creator surfaces the right fields for each type.

| Type | Description |
|---|---|
| **Skill goal** | Linked to a specific skill or technique area. Can carry progress markers, correction links, and a commitment period. |
| **Intention goal** | Softer, not measurable by the app. "Feel comfortable in the Friday intermediate class." No skill link required. Timeframe optional. Progress markers are reflective notes rather than checkboxes. |
| **Habit goal** | Lifestyle and conditioning territory. "Warm up before every class this month." A commitment with a rhythm rather than an endpoint. Carries a frequency or consistency note. |

### Goal entry point

The goal creator opens with a single question rather than a type selector:

**What are you working toward?**
- A skill
- A feeling or state
- A habit

The type is set invisibly in the background. She answers a question about her actual goal, not an app category.

### Goal creation forms

**Skill goal**
- Title — *name it so you'd recognise it in a month. "nail my pirouettes" or "sort out my left side"*
- What you're working toward — *be specific enough that you'd know if it happened*
- Linked skill — multiple choice from skill library, always overridable
- What does progress look like? — optional, unnamed progress markers
- Commitment period

**Intention goal**
- Title — *name it so you'd recognise it in a month. "stop dreading centre" or "feel at home in the Friday class"*
- What you're working toward — *this is yours to judge, not the app's*
- Commitment period

**Habit goal**
- Title — *name it so you'd recognise it in a month. "actually warm up" or "get to conditioning"*
- What you want to do — *what, specifically. "stretch for 20 minutes before every class"*
- How often — every class / every week / set number of times / free text
- Commitment period

### Commitment periods, not due dates

Goals have a commitment period she sets at the start — rather than a hard due date. The date tag on a goal card reflects this period. Duration-based, not calendar-position.

Presets: A week · Two weeks · A month · Three months · Custom date

**Duration picker UI:** Inline expanding list — not pill chips. Tapping the field expands a list of options in place. Same component used in both the goal creator and the inline goal block inside the session logger.

Percentage-based proximity triggers the renewal prompt. A one-week goal surfaces it at five days; a month-long goal at around three weeks. Proportionally equivalent regardless of period length.

### Goal form — UI decisions

**Entry point**
Primary action in the Goals tab, at the top of the screen. FAB also triggers it. Tapping either opens a sheet.

**Sheet structure**
Full sheet. A goal is a considered commitment — the sheet gives it appropriate weight and separates it from browsing.

**Gate question**
At the top of the sheet. Three tabs — not pills. Tabs signal a structural choice, not a filter. Same component pattern as the existing tab selector.

*What are you working toward?*
— A skill · A feeling or state · A habit

**All fields visible at once**
No progressive disclosure. She can see the full form for her goal type before she starts filling it in.

**Field persistence on tab switch**
Title persists always. "What you're working toward" persists if the field exists in the new type — skill and intention both have it; switching to habit clears it from view but holds it in memory if she switches back. Linked skill and progress markers are skill-only, do not persist. How often is habit-only, does not persist. Commitment period persists across all three types.

**Progress markers (skill goals only)**
Same interaction pattern as existing milestone UI — text fields, add button, removable with ×. Label removed entirely (unnamed). Placeholder text cycles through three options varying in type:
- *land two pirouettes back to back*
- *get a correction on it from my teacher*
- *feel it in centre without thinking about it*

**Discard confirmation**
If she tries to close the sheet after entering anything, a simple confirmation: "discard goal?" — discard / keep editing. Nothing heavy.

**Save behaviour**
Sheet closes. New goal card appears at the top of active goals. The card appearing is the confirmation — no fanfare, no separate confirmation screen.

### Renewal options

| Option | Description |
|---|---|
| **Renew** | Recommit for another period. Light editing allowed — the goal can shift focus on renewal without starting fresh. |
| **Close with reflection** | Write a short note about how it went. Becomes a record in the timeline and skill view. Honest even if the measurable outcome was not hit. |
| **Let it go** | No reflection required. Closes silently. The notebook does not judge abandoned goals. |

### Renewal prompt copy

Surfaces on the Barre as a card in the final stretch of a commitment period, and when closing the session logger. Echoes her own goal title. Simple string interpolation, not AI.

| Goal type | Prompt |
|---|---|
| **Skill** | *"[title]" — how's it going?* |
| **Intention** | *"[title]" — worth reflecting on before it closes?* |
| **Habit** | *"[title]" — still keeping it up?* |

### Where the renewal prompt surfaces

| Goal type | Surfacing |
|---|---|
| **Skill goals** | Event-triggered. Goal surfaces when she logs a session containing the linked skill. No notification needed. |
| **Habit goals** | Light time-based reminder appropriate. Framed as an open question, never an accusation. |
| **Intention goals** | Reminders are the wrong mechanism. Surfaced passively during browse mode — in the timeline, at session close, on the Barre. Never pushed. |

### Everything is editable and deletable

No data object in Plié is permanent or locked. Sessions, goals, notes, progress markers — all of it. She owns the notebook entirely. Swipe to delete, tap to edit, always.

### UI observations — current Goals screen

| Issue | Fix |
|---|---|
| "created created Yesterday" | Duplicated word. Bug to fix. |
| "0 of 1 milestones" | Replace with progress marker checklist. Unnamed, or lightly labelled as "what does progress look like?" |
| Completed goal copy | App currently writes its own interpretation. Replace with her reflection note, or no copy at all. App does not editorialize. |
| Date tag styling | "by 28 Mar" uses the same visual treatment as skill tags. Different type of information — should be visually distinct. Commitment period replaces hard date anyway. |

---

## 7. Focus Areas — Mirror, Not Report Card

### The reframe

Focus areas are not a score dashboard. The app can only see what she has given it. Its job is to reflect her attention back at her so she can decide where to direct it next.

> *Show her where her attention has been, so she can decide where to focus next.*

This feature does not need a name at the surface level. The dimension cards in Profile do the work. Where copy references neglected areas, use: "your attention could be directed…"

### What the signal line shows

Each dimension card shows a factual observation about recent attention — not a score or a level. "Three corrections logged this month." "Last worked on Tuesday." "No activity in six weeks." The app observes; it does not interpret.

### Recalibration, not re-evaluation

The recalibration is a place she goes intentionally when something has shifted and she wants to update the mirror. She initiates; the app does not prompt on a schedule. Growth in ballet is non-linear. The recalibration marks a moment of change she has already felt.

---

## 8. Orientation & Levels

### The orientation conversation

The placement quiz becomes an orientation conversation. Questions are framed around confidence and attention, not binary capability. She can complete it or skip it and set her level directly. The app offers to help her find her starting point — it does not require her to be assessed.

### Level personas

The animal personas (Duckling through Firebird) survive the reframe. They are internal to Plié and do not map to any external framework, so the comparison anxiety of institutional grade systems does not transfer.

The persona descriptions do the most important work. A Duckling is not "someone who cannot do X yet" — she is "someone building foundations, whose corrections tend to land in technique and placement." A description of a training experience, not a verdict on ability.

Level recedes visually once set. Useful for content filtering, not a rank to display prominently.

---

## 9. First-Run Experience & Example Data

### The approach

Empty states include example data that makes her want to see her own data in its place. Demonstration, not description. She sees what Plié becomes over time — she is not told.

The same voice runs through empty states, placeholder text, and example data. Three placeholders cycle per field to avoid staleness. The three options vary in type (not just content) to show the range of what belongs there.

### The example dancer

She exists implicitly, never named. Her data feels like one real person with a consistent training life — not a composite of ballet tropes.

| Aspect | Description |
|---|---|
| **Training life** | Serious but not perfect. Gaps exist. She returned after a few weeks off. Some goals completed, one quietly abandoned. |
| **Corrections** | Specific and physical, with a real teacher's voice. Never generic. "Your foot is sickling on the dégagé to the back — think of pushing the little toe away." Not "point your feet." |
| **Goals** | Mix of skill, intention, and habit types. Not all completed. |
| **Timeline** | Two or three classes a week. A gap. A return. A note about physiotherapy. No perfect attendance. |
| **Level** | Mid-journey. Deer or Swan. Specific corrections, but foundations still visible. |
| **Highlights** | Genuinely significant moments. Not every note is starred. |

### What the example data communicates implicitly

| Signal | How |
|---|---|
| **Gaps are normal** | Timeline shows them without comment or apology. |
| **Specificity is rewarded** | Vague notes look thin next to specific ones. She sees the difference without being told. |
| **The app does not judge** | An abandoned goal sits alongside completed ones without shame. |
| **Growth is non-linear** | Corrections about the same skill appear months apart, showing return not resolution. |

### Placeholder text examples

| Field | Examples |
|---|---|
| **Note field** | "weight too far back on the supporting leg in arabesque" · "trying to keep the hip down on the battement — harder on the left" · "teacher noticed the arms are arriving before the head in the port de bras" |
| **Goal field** | "feel comfortable taking the Friday intermediate class by end of term" · "double pirouette consistently — nail two next class" · "stop gripping in the hip flexor on the développé devant" |
| **Reflection field** | "finally understood the épaulement in the port de bras combination" · "the adage felt different today — something shifted in the weight placement" · "read about spotting in BWI — try applying it Thursday" |

---

## 10. Navigation

### Four-tab navigation

The Assess tab is dissolved. Navigation becomes: The Barre · Goals · Learn · Profile. Four tabs, each with a clear single job.

| Tab | Description |
|---|---|
| **The Barre** | Active skills, recent activity, predictive hero, browse by category. The daily-use home. |
| **Goals** | Active goals, commitment periods, renewal prompts. View past goals at the bottom. |
| **Learn** | Skill library, glossary, musicality, conditioning, repertoire, pointers. All content in one place. |
| **Profile** | Dimensions, timeline, orientation quiz entry point, settings. |

### FAB structure

Four options. Session is primary. Correction, goal, note are secondary. Session contains all block types.

| Option | Description |
|---|---|
| **Log a session** | Primary. Opens session logger. All block types available inside. |
| **Add a correction** | Standalone correction with no session required. Session is context, not a parent. |
| **Set a goal** | Opens goal creator. |
| **Save a note** | Opens standalone note. Reflections are the note object — no separate type. |

### What moved where

| Feature | New home |
|---|---|
| **Placement quiz / recalibration** | Moved to Profile. Accessible from dimension cards when she wants to recalibrate. Not a standing invitation. |
| **Assessment folders (footwork, splits etc.)** | Dissolved into Learn as Pointers — a diagnostic content type. Filtered and indicated but in-line with all other content. |
| **Assessment history** | Absorbed into the main Timeline. A recalibration is a timeline entry. No separate history screen needed. |

---

## 11. Pointers

### What a pointer is

A diagnostic content type in Learn. Not a test, not a self-check — a structured set of questions that help her understand why she might be stuck in a particular area. The output is a direction, not a score. Always directs to her teacher, her own research, or relevant Learn content. Never claims to diagnose.

> *Some dancers struggle for months or years not realising there may be other barriers than the obvious one. Pointers surface those barriers.*

The pointer questions are separate from the pointer article. The questions diagnose which specific pitfall she's likely hitting. The output is a targeted response: here's what your answers suggest, here's why it matters, here's a specific dancer or performance to look up that shows the quality at its best, here's what to ask your teacher.

The longer skill articles in Learn cover the full concept. The pointer triangulates and points.

### Structure

| Part | Description |
|---|---|
| **The questions** | A short set that triangulates toward a likely root cause. Number varies by topic — some need three questions, some need seven. Never forced to a fixed count. Separate from the article. |
| **The insight** | The non-obvious thing. "Fluidity in the arms comes from the elbow and wrist, not the shoulder." The thing she might not know to google. |
| **The direction** | Exercises to explore, things to ask her teacher, linked skills in the library, conditioning content. |
| **The inspiration** | Optional but powerful where it exists. A specific dancer, a performance, a piece of repertoire that embodies the quality at its best. Described for searching, not linked (MVP). |

### In Learn

Pointers appear in-line with all other Learn content, alphabetically organised. A filter chip — Pointers — sits alongside existing chips. A small quiet indicator on the card distinguishes them visually without making them feel like a test. Not every skill has a pointer — only the dimensions of ballet where root cause confusion is common and meaningful.

### MVP scope

Four areas for the demo build: épaulement, extension / leg height, pirouettes, footwork articulation. Enough to show diagnostic depth across technique, movement, and the body dimensions. Placeholder content written in plie-pointers.md. Full content to be commissioned from a professional before launch.

Placeholder content principles: reference specific dancers, specific physical mechanics, specific directions. Never generic. Neutral voice, reference register throughout.

---

## 12. In Focus — Skill Flagging

### Mechanic

The user explicitly marks a skill as "in focus" from:
- The skill detail personal view (top right)
- The skill knowledge page in Learn

Both surfaces toggle the same `skill.flagged` boolean. The Barre surfaces only skills explicitly marked in focus. If nothing is marked, the In Focus section is absent entirely — no empty state.

### Skills with no corrections

An in-focus skill that has no corrections shows on The Barre with an "add a correction →" action rather than a correction quote. This keeps the surface useful even for newly-flagged skills.

### Saved from Learn

Bookmarked Learn items (skills, pointers, section key points) surface on The Barre as a collapsible horizontal carousel below In Focus. Hidden if no bookmarks.

Each card shows:
- Type label (SKILL / POINTER / CONDITIONING / etc.) — small-caps, DM Sans 600, `--ink-4`
- Item name — DM Sans 500, `--fs-small`, `--ink`
- For skills only: active goal count · correction count — `--fs-small`, `--ink-5`

Whole card tappable → navigates to the Learn item. Bookmarks removed via the Learn page icon only.

### TODOs

- Auto-suggest session corrections when linking to goal block (currently manual search)
- Photo/video block: deferred

---

## 12a. Recurring Corrections

### Detection algorithm

After each session save, for every skill touched in that session:
- Collect all corrections for that skill within the last 60 days
- If ≥3 corrections across ≥2 distinct sessions → mark as recurring
- Fewer than 3, or all in the same session → clear recurring flag

**Why 60 days and ≥2 sessions:** A single session with many notes on the same skill is not a pattern. Two or more sessions showing the same correction is. 60 days bounds it to recent training, not historical.

The recurring flag lives on individual correction objects (`isRecurring`). It is recalculated on every save — it is always a derived state, never set manually.

### Where recurring surfaces

| Surface | Treatment |
|---|---|
| Barre corrections in focus | "Recurring" filter tab alongside "All". Skill cards get `--coral-soft` background and "recurring" metadata label. |
| Barre empty state | If Recurring tab is active and no in-focus skills qualify, shows "no recurring corrections yet". |
| Skill card on Barre | `.active-skill-recurring` class applies coral-soft background and three-dot indicator. |

---

## 13. Session Logger Updates

### Note block — confirmed decisions (T22)

- **Title field removed.** Notes do not have a separate title above the content area. The topic input is the only labelling field.
- **Content area** uses a contenteditable div with a live `—` dash prefix per line. No textarea.
- **Highlight star** sits left of the topic input in the block header row.
- **Skill suggestions** appear between the block header and the content area when the topic field suggests a known skill.

### Session save — all blocks create records

All note blocks with any content create a sessionSkill record, regardless of whether a skill is linked. `skillId: null` for general blocks. This ensures every session's blocks are represented in the skill detail and timeline.

Corrections always populate `correctionIds` on the sessionSkill. Observation blocks with a linked skill also write to `skillNotes` ("my notes"). `isHighlight` is saved on the sessionSkill and drives the timeline star and the highlights section.

### Practice as a class type

Practice lives in the class type carousel as a standard option. When selected, the logger simplifies — no saved session dropdown, no location field, no class type sub-selection. Date, optional title, and notes only. Low lift, clean behaviour.

### Adding class types

The More... flow allows her to add a custom class type. Added types persist and appear in the carousel going forward, not just as one-off entries.

### Predictive hero from recurring sessions

Recurring sessions surface in the Barre hero predictively. If she has a Wednesday technique class set as recurring, Wednesday morning the hero shows that class ready to log — without her having to navigate there. Uses recurrence data already set on saved sessions, no new input required.

If she does not log the session, the predictive card disappears by end of day or on next open. No guilt, no lingering prompt.

---

## 13. Training States — UI Behaviour

### How state is set

In Profile settings. Set quietly, no fanfare. The app shifts its behaviour on next open without announcement. Count begins from when she sets the state, not from a custom start date — no pressure to maintain precise records.

### What changes per state

| Surface | Change |
|---|---|
| **Insight sentence** | Active: standard. Resting: "taking a break." Recovering: "focusing on recuperating." Factual, warm, no motivation implied. |
| **Hero card** | Each state has its own version. Active: log your session. Resting: pick up where you left off. Recovering: something appropriate to reduced activity. |
| **Empty states** | Each state has its own version. Recovering empty states never imply she should be doing more. |
| **Dimension mirror** | Counts from when state was set. "Recuperating for 3 weeks" not "no activity in 3 weeks." Factual, not accusatory. |
| **Goal renewal prompts** | On state change: "do you want to pause your active goals?" Pause or dismiss. Not permanent — swipe to restore from past goals. |

> **Nothing is gated**
>
> Training state adjusts tone and emphasis only. Every feature remains fully accessible in every state. She can log a gentle yoga session while recovering. She can browse her timeline while resting. The notebook does not remove pages.

---

## 14. Goals — Past Goals & Reactivation

### Goals tab structure

Active goals only on the main tab. Clean, focused, manageable. "view past goals →" as a quiet link at the bottom of the tab. All Goals as the destination page title.

### All Goals page

Every goal she has ever had — completed, expired, let go, paused. Grouped by year, then by status within each year. Works for one goal and for a hundred. Each card is compact in this view — title, commitment period, status indicator. Tap to expand full detail.

| Status | Description |
|---|---|
| **Completed** | She marked it done or it ran its course and she reflected on it. |
| **Expired** | Commitment period ended, she let it go without ceremony. |
| **Renewed** | She recommitted. Shows how many times if more than once. |
| **Paused** | Set aside during a resting or recovering state. Returnable to active. |

### Goal reactivation

Any past goal can be reactivated. Reactivation creates a new entry linked to the original — same model as a calendar series vs instance. The original stays in All Goals as a complete record. The new instance has its own timeline, its own commitment period, its own notes. A quiet "continued from [date]" link connects them.

Over time this creates a goal lineage — she can see how her relationship with a particular goal has evolved across months and years. One of the places where Plié genuinely earns its existence over a physical notebook.

---

## 15. Dimension Model — Final

### Opt-in clarification

Technique, Movement, Artistry, and The Body are intrinsic to ballet. They are not opt-in. If you are doing ballet, you are engaging all four. The opt-in mechanic applies only to Pointe (genuinely not relevant to everyone) and to sub-dimensions within The Body (lifestyle choices, not ballet fundamentals).

| Dimension | Status |
|---|---|
| **Technique** | Always present. |
| **Movement** | Always present. |
| **Artistry** | Always present. If artistry is not relevant to you, this app is not for you. |
| **The Body** | Always present. Sub-dimensions individually opt-in. |
| **Pointe** | Opt-in. Existing mechanic retained. |

---

## 16. Decision Framework

### What it is

A set of questions to ask at every product fork — copy, UX, component choices, feature scope. Keeps decisions consistent with principles without requiring a conversation each time. For solo use at 11pm when the answer isn't obvious.

Run through the questions in order. The answer usually becomes clear before you reach the end.

| Question | Guide |
|---|---|
| **1. Does one option serve the notebook principle better?** | Does it give her more control, more flexibility, less prescription? Does it keep the container without filling it for her? If yes, that option wins. |
| **2. Does one option pass the teacher test?** | Does it help her get more from her classes? Or is it trying to be the class? If it's trying to be the class, reconsider. |
| **3. Does one option fit the vocabulary?** | Does it use ballet language, or productivity / wellness app language? Prefer the former. If neither fits, use plain human language. |
| **4. Does one option have lower technical cost for equivalent user value?** | As a solo builder, complexity has a real price. If two options deliver the same value, always choose the simpler one. Complexity deferred is not complexity avoided. |
| **5. Is this a now decision or a later decision?** | Can it be deferred without baking in assumptions that are hard to undo? If yes, park it with a note. Deferring cleanly is different from deferring by accident. |
| **6. Does one option work across all three training states?** | Active, resting, recovering. If a surface, prompt, or empty state only works for the active user, it needs revisiting. |

### When to break the framework

The framework is a tool, not a rulebook. If following it leads to an answer that feels obviously wrong, the feeling is data. Note why you broke it and what you did instead. That note might become a new principle.

---

## 17. Open Threads

Decisions not yet closed. Revisit before building the affected features.

**1. Source field labels — CLOSED**
Resolved: Correction · Observation. Two chips, no label, both optional. 'Correction' used in the ballet sense — teacher input, positive or negative. Parked for user testing; may revisit label after use in the field. See Section 4.

**2. Focus area / dimension mirror naming — CLOSED**
Dissolved as a named concept. The feature does not need a name — the dimension cards in Profile do the work, and the signal lines surface attention data. Where copy references neglected areas, use: "your attention could be directed…" No feature label needed at the surface level.

**3. Training state copy — CLOSED**
Hero card copy written for all three states (see Section 23). Signal lines written and identical across states. Insight sentences written. Empty states per training state not yet written — recovering and resting variants needed for dimension cards, goals tab, skill cards on the Barre. Write these when building those surfaces, following the principles in Section 13.

**4. Mental dimension — CLOSED**
No fifth dimension. Confidence, motivation, and concentration are legitimate goal domains and sit naturally as intention goals. The dimension model stays at four always-present dimensions plus Pointe. Mental health territory is explicitly out of scope — better served by dedicated tools.

**5. Pointer content — PLACEHOLDER COMPLETE**
Placeholder content written for all four MVP areas: épaulement, extension, pirouettes, footwork articulation. Neutral voice, reference register, Vaganova methodology throughout. Full content to be commissioned from a professional before launch. Placeholder lives in plie-pointers.md.

**6. Design system coherence — CLOSED**
Inconsistencies exist between old and new patterns across several screens. Principle for handling:

Fix now if: the inconsistency is visible to the user and contradicts a decided pattern (e.g. square-card class type chips that should be pill chips) · it's on a screen being actively built or rebuilt · it would be harder to unpick later than to fix now.

Flag for polish pass if: it's cosmetic and on a screen not currently being touched · it predates the current pattern but doesn't contradict it · fixing it in isolation would introduce new inconsistencies elsewhere.

The polish pass happens before any external demo or commissioning conversation — not as ongoing maintenance. CSS aliases: migrate on contact, same principle.

**7. Goal renewal prompt copy — CLOSED**
Mechanic defined. Copy varies by goal type. Echoes the goal title only — the app cannot rephrase free text. See Section 6 for prompt copy per type.

**8. Data export**
She should be able to export her data if she leaves the app. Format, scope, and trigger not yet decided. Referenced in Section 28 (Accounts). Revisit before launch.

---

## 18. Ask Your Teacher — Removed

Originally proposed as a flag on any note to mark it as something to raise with her teacher at the next class. Removed. The notebook surfaces information well enough that the app does not need to prompt her. If the note is there, she will read it. Trust the user.

The theoretical grounding remains valid — preparing questions for a teacher is a recognised reflective practice that improves learning outcomes — but the feature adds complexity without adding proportionate value.

---

## 19. Behavioural Foundations & Copy Nudges

### Principle

The behavioural research that shaped Plié should be felt in the product, not announced. Copy demonstrates insights rather than citing them. The nudges are light — structural and tonal, not instructional.

| Insight | How it shows up | Source |
|---|---|---|
| **Writing things down aids retention and achievement** | The entire logging premise. Surfaces in onboarding as a quiet statement of intent, not a statistic. The note field existing at all is the nudge. | Matthews (1982), Emig (1977) |
| **Specificity improves outcomes** | Placeholder text models specific language. Vague example data is never used. The app rewards specificity by making specific notes more useful and findable. | Barr, goal-setting literature |
| **The change process is non-linear** | Timeline shows gaps without comment. Returning states are welcomed, not flagged. Abandoned goals close without shame. Copy never implies linear progress. | Hackney, Making Connections |
| **Commitment and recommitment increase follow-through** | The renewal prompt asks for a conscious decision to continue. The act of setting a commitment period is itself the intervention. | Robbins, Matthews |
| **Reflective practice has four natural stages** | The session logger implicitly follows the evaluative log structure: what happened, what went well (highlight), what to work on (correction note), what to bring to next session. | Barr, Durrant / Blythe |
| **Mental and lifestyle goals are as legitimate as technical ones** | Intention and habit goal types exist alongside skill goals. The goal creator does not privilege one type. | Psychology of Dance, Futurability framework |
| **Glows and Grows as a reflection structure** | The highlight toggle and the note source field together create a natural glows/grows split without naming it. | Blythe, Treiber-Kawaoka |

---

## 20. References & Further Reading

Sources that shaped product decisions. Referenced in the decisions above and available to curious users via the Learn tab or About section.

| Source | Notes |
|---|---|
| **Barr, S.** | "The Dancer as Reflective Practitioner: Is it possible?" Journal of Dance Education. Foundation for the reflective practice framing and the note structure as an evaluative log. |
| **Blythe, A.** | "Goal Setting for Dancers" and "Reflective Practice Through Journaling in Dance, Yoga & Life." ablythecoach.com. Practical source for goal frameworks, Glows & Grows, and the Evaluative Log. |
| **Emig, J. (1977)** | "Writing as a mode of learning." College Composition and Communication. Writing as a uniquely powerful multi-representational mode — foundation for the logging premise. |
| **Hackney, P.** | Making Connections. The change process (notice, accept, intend, clarify, practise, allow time). Foundation for the gap/return model and the non-linear growth philosophy. |
| **Matthews, G.** | Dominican University of California research on goal-writing. Writing goals down increases achievement by 42%. Foundation for the logging emphasis. |
| **Murphy, S. (ed.)** | The Sport Psych Handbook / Psychology of Dance. Physical, mental, technical, and lifestyle domain split. Foundation for the dimension model. |
| **Robbins, M.** | The 5 Second Rule. Supporting reference for goal commitment and the renewal prompt mechanic. |
| **Ness, W. & Dobson, J.** | Coach Anyone About Anything. Futurability for Objectives — alternative to SMART goals for creative and performance contexts. Foundation for the commitment period model. |
| **Durrant, A.** | Evaluative Log (Leeward Community College). Four-question reflective structure that maps directly onto the session logger, highlight toggle, note types. |

### Terms to explore

| Term | Description |
|---|---|
| **Reflective practice** | Donald Schön's concept of the reflective practitioner — the idea that professionals (including artists) learn through structured reflection on their own experience, not just instruction. |
| **Futurability for Objectives** | An alternative goal-setting framework to SMART, designed for contexts where outcomes are not purely quantifiable. More appropriate for creative and performance goals. |
| **Glows and Grows** | A reflective feedback structure distinguishing strengths (glows) from areas for development (grows). Used in dance education as a self-assessment tool. |
| **Motor learning** | The study of how movement skills are acquired and retained. Relevant to why spaced practice, correction, and deliberate attention improve technique. |
| **Laban Movement Analysis** | A framework for describing and analysing human movement across body, effort, space, and shape. Background to why The Body dimension is structured as it is. |
| **Adult learning theory (Andragogy)** | Malcolm Knowles' principles of how adults learn differently from children — self-directed, experience-based, internally motivated. The primary user of Plié is an adult learner. |
| **Deliberate practice** | Anders Ericsson's research on the structure of expertise development — focused, reflective, feedback-driven repetition rather than passive repetition. |

---

## 21. Design System Principles

### Visual direction

White is the ground. Warmth is earned, not ambient. The app lives on one warm-white ground. Everything above it is earned through context, not applied by default.

| Token | Use |
|---|---|
| `--background #FAFAF8` | App ground. Almost white, not cold. The base everything sits on. |
| `--surface #FFFFFF` | Cards and all interactive objects that need cognitive chunking. The visual reset. Default card colour. |
| `--surface-warm #FDF8F3` | Tactile moments only. Session logger sheet, note blocks, recurring corrections, Learn knowledge pages, bottom sheets. Not for general cards. |
| `--surface-raised #FAF5EE` | Empty or dormant states within warm context. Artistry empty card, paused goals. |

### Colour — what tokens mean

Every colour token has a specific job. If you are reaching for a colour and it does not match one of these jobs, do not use it.

| Token | Use |
|---|---|
| **Gold #C4900C** | Active nav state, category labels on skill cards, highlight star when active, key point dashes in Learn, focus border on inputs. That is the complete list. Never decorative. |
| **Gold-soft #E8D5A8** | Input border at rest only. |
| **Gold-wash #F5EDD6** | Level badge background, goal badge background. Nowhere else. |
| **Coral #A84030** | Correction label, delete action, alert state only. |
| **Coral-soft #F0D5CF** | Recurring note row background at reduced opacity. No other use. |
| **Sage #4A7038** | Completed goal, progress marker ticked only. |
| **Brown-btn #5A4030** | FAB only. Not used for any other button or interactive element. |
| **Ink #1A1714** | Primary button fill. Also primary text. Actions are ink. |

### Typography

| Font | Use |
|---|---|
| **Georgia** | Screen titles (h1), skill names as headings, level persona name, onboarding display text, section headings on Learn knowledge pages. Never below 16px. |
| **DM Sans** | Everything else. Body, metadata, labels, buttons, chips, nav, captions. |
| **Weights** | DM Sans: regular (400) and semibold (600) only. Never 700. Georgia always regular weight. |
| **Cormorant Garamond** | Retired from the system. Georgia replaces it across all uses. |

### Spacing scale — application rules

| Context | Value |
|---|---|
| Label to field | 8px (--sp-sm) |
| Field to field in a form | 24px (--sp-xl) |
| Internal card padding | 16px (--sp-lg) all sides |
| Between cards in a list | 8px (--sp-sm) |
| Between distinct sections | 24px (--sp-xl) |
| Screen-level top padding | 32px (--sp-2xl) |
| Bottom of scroll above nav | 48px (--sp-3xl) |

### Button hierarchy

If you are reaching for the primary button more than once on a screen, one of those uses is wrong. Demote it.

| Type | Spec |
|---|---|
| **Primary** | #1A1714 fill, white text, 8px radius, 1px outer border #3A3230, 1px inner border rgba(255,255,255,0.08). One per screen maximum. Save, begin, confirm. |
| **Secondary** | Transparent fill, #1A1714 text, 1px border rgba(26,23,20,0.35), same radius. Discard, edit, cancel. Never appears without a primary nearby. |
| **Soft** | #F5EDD6 fill, #8A5E0A text, no border, 8px radius. Low-stakes invitations. View past goals, see all, learn more. |
| **Text link** | No shape, no border. #C4900C for key navigation, #1A1714 for neutral. Always with arrow. Drill-down, inline links, secondary navigation. |
| **FAB** | #5A4030 fill, white +, circle, 1px outer border #7A5848, 1px inner border rgba(255,255,255,0.10). Always circle. One in the whole app. |

### Component rules

| Component | Spec |
|---|---|
| **Cards** | Always #FFFFFF, 8px radius, 0.5px solid rgba(26,23,20,0.10) border. Never warm surface unless a note block or sheet. |
| **Note blocks** | #FDF8F3, same radius, 0.5px solid rgba(26,23,20,0.08). Softer border because the surface provides the distinction. |
| **Chips** | Pill shape only. Two states: default (white, subtle border) and selected (--brown-btn background, white text). No colour variants. |
| **Class type chips** | Must match pill chip treatment. The current square-card component is retired. |
| **Badges** | #F5EDD6 background, --gold text, pill shape. Level and goal count only. |
| **Recurring row** | #FDF0EE background, no badge, no label. Three dots #C8BFB8 plus "recurring" as plain metadata text. |
| **Input fields** | #F9F5F0 background, #E8D5A8 border at rest, #C4900C border on focus. All text fields identical. |

### Swipe pattern

Swipe to act applies to: skill cards on The Barre, goal cards, the hero prompt card, note blocks in the logger. Not to timeline entries — the timeline is a permanent read-only record. Swipe labels are never shown on cards. The behaviour is the affordance.

### Copy rules

| Rule | Detail |
|---|---|
| **No em dashes** | In UI copy unless genuinely essential. Use a comma or rewrite the sentence. |
| **No keyboard shortcuts** | "Enter to add · Shift+Enter for new line" and similar. Remove everywhere. |
| **No AI commentary** | The app surfaces facts, never interprets them. "1 correction logged today" not "Keep the record going." |
| **No explaining features** | If the label already says what it does, the body copy beneath it is redundant. Cut it. |
| **British English** | Throughout. Practise not practice (verb). Colour not color. |
| **Buttons lowercase** | Always. save session, log now, begin. Never Save Session. |
| **Section labels** | Small-caps or uppercase DM Sans, --ink-3 colour. Quiet, never dominant. |
| **Placeholder text** | Always specific, never generic. Cycles through three options per field varying in type not just content. |

### Legacy alias rule

Never write new CSS using legacy aliases (--text, --text-secondary, --text-muted, shadow aliases, radius aliases). When you touch a component, migrate it to the current token set. Migrate on contact, not in a big batch.

### The Barre screen — confirmed decisions

| Element | Decision |
|---|---|
| **Context strip** | Removed. Level badge moves to top right of screen header. |
| **Hero card** | Named session title leads in Georgia. Class type and day in eyebrow. "Did you go today?" as the question. Primary: log now. Text link: don't remind me again. Swipe to dismiss temporarily. |
| **Hero fallback** | No saved session: class type as title, day in eyebrow. No recurring sessions: generic "log your session" prompt. |
| **Skills heading** | "Corrections in focus" in small-caps muted with skill count on the right. Quiet, not dominant. |
| **Skill cards** | Georgia for skill name. Correction in italics with quote marks. Category label in gold small-caps top right. Date metadata bottom left. "view →" text link bottom right. |
| **Recurring skills** | #FDF0EE card background. Three dots plus "recurring" as metadata. No badge. |
| **Section separator** | 0.5px rule between skills and recent activity. No heading needed above recent activity — "Recent activity" label sufficient. |
| **Section heading removed** | "Skills in focus" heading removed. Cards are self-evident. |

---

## 22. Copy System — Note Metadata

### Source chips

Two chips, no label. All optional — she sets them if she wants to, leaves them unset if capturing fast. Default state is neither selected. Nothing is required to save a note.

| Chip | Meaning |
|---|---|
| **Correction** | Teacher input — positive or negative. Not a value judgement. |
| **Observation** | She overheard it, observed it herself, or picked it up from outside class. |

Visual treatment: pill chips following the existing filter chip pattern. Default: white background, subtle border. Selected: #1A1714 background, white text.

---

## 23. Copy System — Empty States & Signal Lines

### Typography convention

All empty states and hero cards follow a two-line typographic structure. The heading sets the context in Georgia. The body explains or invites in DM Sans. They are separate typographic elements, not one sentence with a capital mid-way.

### Empty states

| Surface | Copy |
|---|---|
| **The Barre — no skills** | *Your corrections will live here. Log your first class and they'll start to build.* Text link: log a class → |
| **Hero — active, no recurring session** | *log a class →* Simple text link only. No card needed if there is nothing to predict. |
| **Hero — resting** | *Taking a break* / *Anything worth noting while you're away?* Text link: log now → |
| **Hero — recovering** | *Focusing on recuperating* / *You can still log anything useful, physio notes, what you can work on, things to remember.* Text link: log now → |
| **Goals — no active goals** | *Nothing on the go right now. Goals you're working towards live here.* Text link: set a goal → Quieter text link: view past goals → (only if past goals exist) |
| **Profile dimension — no activity** | *Nothing logged here yet. It'll fill as you work.* |
| **Timeline — no entries** | *Your training story starts here. Every class, correction and goal you log will build into a record worth having.* No call to action. |
| **Learn — no search results** | *Nothing found for "[query]". Try a different spelling, or browse by category below.* |

### Dimension signal lines

Single sentences generated dynamically from her data. Only reference what is technically simple to surface without AI: correction counts, dates, goal counts. Signal lines are identical regardless of training state.

| State | Copy |
|---|---|
| **Activity exists** | "[n] corrections logged. Last session [day]." or "[n] corrections this month. [n] goals active." Templates — values fill from her data. Use whichever combination of fields has data. |
| **No recent activity** | "Nothing logged here recently." |
| **Never logged anything** | "Nothing logged here yet. It'll fill as you work." |

No em dashes in signal lines. No interpretation of content. The app describes what it sees, she decides what it means.

---

## 24. Orientation Conversation

### Opening screen

*Find your starting point* / *A few questions to help shape what Plié gives you along the way.*

Primary: let's go → Secondary text link: skip quiz, I want to set my level →

### Principles

| Principle | Detail |
|---|---|
| **Not a test** | Questions are framed around experience and confidence, not capability. There are no right answers. |
| **No forced progression** | Multi-select answers allow her to describe gaps and asymmetries honestly. She is not forced into a ladder. |
| **Helper text throughout** | Every question has helper text. French terminology appears in helper text where relevant, plain language where not. |
| **Generally feel true** | All multi-select questions use this framing. Accounts for good days and bad days without demanding perfect accuracy. |
| **Context questions not scored** | Q1 and Q2 paint a picture for the app. They do not contribute to dimension scores. |

### Dimension coverage

| Dimension | Questions |
|---|---|
| **Technique** | Q3 primary, Q4 partial, Q5 partial, Q13 partial |
| **Movement** | Q5 primary, Q6 primary, Q7 primary, Q10 partial |
| **Artistry** | Q8 primary, Q9 primary, Q4 partial, Q5 partial, Q7 partial |
| **The Body** | Q10 primary, Q11 primary, Q12 primary, Q13 primary |
| **Pointe** | Q14 primary |
| **Context** | Q1, Q2 — not scored |

### Questions

**Q1 — Background and training time** (single select, context only)
Which best describes you?
- Born to dance — Dancing since before I can remember
- Lifelong dancer — Training consistently since childhood
- Finding my feet — I've been dancing for 1 to 3 years
- Building a foundation — I've been dancing for 3 to 7 years
- Coming back — Strong foundation, getting back to it
- After a break — Returning after some time away
- Just starting out — Less than a year of ballet

**Q2 — Weekly commitment** (single select, context only)
How much time do you spend in class right now? Helper text: think about a typical week, not your best or worst.
- Not in class at the moment
- Up to 2 hours a week
- 2 to 4 hours a week
- 4 to 6 hours a week
- 6 or more hours a week

**Q3 — Placement and centre** (multi-select, Technique primary)
Which of these generally feel true for you in class?
- I can get through centre combinations without relying on watching others
- I work on placement and alignment without needing to be reminded
- I feel settled and balanced in centre most of the time
- I find centre work challenging regardless of whether I know the steps
- I can focus on quality in centre, not just getting through it

**Q4 — Port de bras and upper body** (multi-select, Technique partial / Artistry partial)
Which of these generally feel true about how you use your arms and upper body? Helper text: in ballet, the arms, head, and shoulders working together is called port de bras and épaulement.
- My arms and legs tend to work as separate problems in class
- I can follow the port de bras in combinations but it doesn't always feel natural
- My arms and legs generally work together without too much conscious effort
- I use my head and shoulders as part of how I move through a combination
- I think about the shape and quality of my arms, not just their position

**Q5 — Adagio and extension** (multi-select, Movement primary / Technique partial / Artistry partial)
Which of these generally feel true about your slow work? Helper text: adagio is the slow, sustained section of class — développé, arabesque, attitudes, and held balances.
- I haven't done adagio work yet
- I find slow combinations difficult to sustain with control
- I can hold an arabesque or attitude without losing balance most of the time
- I can extend my leg with control in slow combinations
- I can sustain long slow phrases without rushing or losing shape
- I use the music to shape how I move through adagio

**Q6 — Turns** (multi-select, Movement primary)
Which of these generally feel true about your turning? Helper text: this is about pirouettes specifically.
- I haven't started working on turns yet
- I'm working towards a clean single, doing quarter and half turns
- I'm landing a single pirouette most of the time
- I'm working on doubles
- I can do reliable doubles
- I can do more than doubles consistently

**Q7 — Allegro** (multi-select, Movement primary / Artistry partial)
Which of these generally feel true about your jump work? Helper text: allegro is the jumping section of class. Petit allegro is small fast jumps, grand allegro is larger travelling jumps.
- I haven't started jumps yet
- I find jumps physically demanding more than technically challenging
- I'm confident doing basic jumps, sautés, échappés
- I'm confident doing petit allegro combinations, changements, assemblés, glissade
- I'm confident doing grand jeté
- I'm confident doing sissonne and travelling grand allegro combinations
- I'm confident getting through complex allegro combinations musically as well as technically

**Q8 — Musicality and expressiveness** (multi-select, Artistry primary)
Which of these generally feel true about how you relate to music in class? Helper text: phrasing means shaping your movement to the musical sentence, not just the beat.
- I focus on getting the steps right, music comes later
- I can hear the counts but I don't always move with the phrasing
- I generally stay on the music and can feel when the tempo or mood shifts
- I naturally accent movements and breathe with the phrasing
- The music shapes how I dance, I respond to dynamics not just counts
- I find it easier to be musical in slow work than in allegro

**Q9 — Cultural engagement** (multi-select, Artistry primary)
Which of these generally feel true about how you engage with ballet outside class?
- I'm mostly focused on my own training right now
- I watch performances or recordings when I can
- I follow dancers or companies I admire
- I know some of the major works and what makes them significant
- I read or listen to things about ballet history, technique, or choreography
- Watching ballet has inspired how I think about movement and music

**Q10 — Leg height** (single select, The Body primary / Movement partial)
How high can you hold your leg in à la seconde with control? Helper text: à la seconde means to the side. Stand on one leg and lift the other directly out to the side, with control and turnout, not a kick.
- Below hip height
- Around hip height
- Between hip and 90 degrees
- At 90 degrees or close to it
- Above 90 degrees with control

**Q11 — Flexibility** (single select, The Body primary)
Which of these best describes your overall flexibility?
- Flexibility is a significant challenge for me
- I have some flexibility but it's something I work on
- I'm reasonably flexible and can work with what I have
- I'm quite flexible, it's one of my stronger attributes
- I'm very flexible, it rarely limits what I can do
- I'm hypermobile, I have a lot of range but stability can be a challenge

**Q12 — Strength and stability** (multi-select, The Body primary)
Which of these generally feel true about your strength and stability in class?
- I fatigue noticeably during longer combinations
- My supporting leg feels stable when I'm working on it
- I can hold balances with reasonable consistency
- My core feels engaged when I need it
- Strength feels like a bigger limitation for me than flexibility

**Q13 — Turnout** (multi-select, The Body primary / Technique partial)
Which of these generally feel true about your turnout?
- I find it hard to maintain turnout through a full combination
- My turnout feels consistent without me thinking about it constantly
- I notice my turnout drops when I'm tired or focusing on something else
- My turnout feels like a physical limitation rather than something I can train
- I've improved my turnout noticeably through training

**Q14 — Pointe** (single select, Pointe primary)
What's your experience with pointe work?
- I haven't started and I'm not interested right now
- I haven't started but I'm working towards starting
- I've been on pointe for less than a year
- I've been on pointe for 1 to 3 years
- I've been on pointe for 3 years or more

**Post-quiz — goals** (multi-select, separate step, not scored)
What are you working toward?
- Getting back into ballet
- Building a regular practice
- Working towards pointe
- Improving my technique
- Preparing for a performance
- Enjoying ballet as part of my life

---

## 25. Level Personas

### Four levels

Reduced from six to four. Bigger steps between levels make self-selection more accurate and progression more meaningful.

| Level | Description |
|---|---|
| **Duckling** | Beginning. Building foundations. New to ballet or returning after a long break. |
| **Deer** | Developing. Knows the vocabulary, starting to work on quality not just execution. |
| **Swan** | Established. Solid foundations, working with real depth and intention. |
| **Firebird** | Advanced. Long-term training, technical consistency, clear sense of direction. |

Animals retired: Rabbit (replaced by Deer), Rose / La Sylphide (replaced by Firebird as the top level).

### How level is set

| Route | Detail |
|---|---|
| **Via quiz** | The orientation result suggests a level. She sees it on the results screen and can adjust before continuing. |
| **Self-select** | She skips the quiz and picks her level directly from the four options with descriptions. The app tells her dimension information will populate as she logs sessions. |
| **Self-select screen copy** | "This is your starting point. Your dimensions will fill in as you log sessions and build a picture of your training." |

### Persona descriptions

Written in second person, present tense. Describes her training life, not her capability. No "you can do X." No prompts to advance to the next level. Each level is complete in itself.

> **Duckling**
> You're building the foundations. Ballet is still relatively new to you, whether you've just started or you're finding your footing after a long break. You're learning how the vocabulary works, what your body can do, and how to listen to your teacher. Classes might feel like a lot to take in at once, and that's exactly where you should be.

> **Deer**
> You know your way around a class. You've got the basics under your feet and you're starting to work on the details. You can follow combinations without watching someone else for every step, and you're beginning to notice the difference between getting through something and doing it well. You're in the part of the journey where things start to connect.

> **Swan**
> You're working with real depth now. You've been training long enough that the foundations are solid and you're building on top of them. You bring attention to quality, not just execution. You know what you're working on and why. Classes feel like a place to develop, not just survive.

> **Firebird**
> Ballet is a serious part of your life. You've been at this for a long time. Your technique has real consistency, you're musical, and you have a clear sense of what you're reaching for. You might still be working on the same things you've always worked on — that's the nature of ballet — but you're doing it with depth and intention.

### Design notes

| Note | Detail |
|---|---|
| **No skills mentioned** | Descriptions never reference specific movements or techniques. A Firebird who can't do doubles should still recognise herself. |
| **No progression prompts** | No "you're almost ready for the next level" energy anywhere. Each level is complete in itself. |
| **Honest about the journey** | The Firebird description acknowledges advanced dancers still work on the same things. Ballet doesn't resolve. |

---

## 26. Onboarding

### Principle

One screen. One idea. Then straight into the orientation quiz. No feature list, no tutorial, no pitch. The app communicates how it works through being used, not through explanation.

### The screen

The onboarding copy has two distinct typographic moments: the statement (Georgia display) and the utility list (DM Sans body). They are separate typographic elements, not one continuous block.

**Statement (Georgia)**
*Writing it down changes what you remember. And what you remember changes how you dance.*

**Utility list (DM Sans)**
*A notebook for your training. Log what happened in class, note what your teacher said, track what you're working on. The rest builds from there.*

— Session notes and corrections
— Skills you're developing
— Goals and how they're going
— Everything in one place, always yours

**CTA lead-in (Georgia)**
*Then: let's find your starting point.*

Primary: let's go →
Secondary text link: skip quiz, I want to set my level →

### What follows

| Action | Result |
|---|---|
| **let's go** | Leads into the orientation quiz (Section 24). Quiz result suggests a level. She confirms or adjusts. Then the app. |
| **skip quiz, I want to set my level** | Leads to the level selector showing all four personas with descriptions. She picks one. App tells her dimensions will populate as she logs. Then the app. |

---

## 27. Getting Started Cards

### What they are

A carousel of action cards that appears on The Barre after orientation is complete. Each card prompts a single action that helps her get value from the app quickly.

### Location

The Barre, below the hero card. Not Profile (old pattern).

### Section label

"get started" in small-caps muted. Consistent with other section labels in the design system. Not "Make the most of plié."

### Behaviour

- Cards display two at a time in a horizontal carousel
- Tapping a card opens the relevant screen or action
- Cards complete automatically when the action is done. She does not manually tick them off.
- Completed cards stay visible, greyed out with a tick. No additional copy on the completed state. The tick is sufficient. The app does not congratulate.
- The section persists until all cards are completed

### The five cards

| Card | Description | Opens |
|---|---|---|
| **Log your first class** | *Notes while they're fresh stay with you.* | Session logger |
| **Save a note** | *Something your teacher said is worth keeping.* | Session logger, note entry |
| **Set a goal** | *Give your training a direction.* | Goal sheet |
| **Try a pointer** | *Find out what's actually holding you back.* | Learn, filtered to Pointers |
| **Explore Learn** | *The skill library, glossary, and repertoire.* | Learn |

### Copy principles

No category labels above card titles. One line descriptions — not instructional, not motivational. Completed state shows the title greyed out with a tick only.

---

## 28. Accounts

### When

Account creation happens after orientation is complete. She experiences the app first, then commits. Reduces friction at the highest drop-off point.

### Sign in options

- Email and password
- Sign in with Apple

No Google sign-in. Apple fits the primary user and platform, and keeps the register consistent.

### What an account enables

- Multi-device sync
- Data backup
- Data export (to be designed, see open threads)

### Local use

She can use the app locally before creating an account. Account creation is prompted after orientation, not gated before it.

### MVP implementation note

Sign-in with Apple requires an Apple developer account and entitlements but is well-documented and worth doing from the start. Retrofitting it later is more work. For sync and backup, Supabase (free tier) handles auth including Apple sign-in and provides a Postgres database with a JS client. Avoids building any backend. localStorage becomes the local cache, not the source of truth.

---

## 29. Notifications

### Principle

Notes, corrections, and reflective content are private. The app does not push on those. Notifications are only appropriate for things she has actively committed to.

### Legitimate push notification triggers

| Trigger | Framing |
|---|---|
| **Habit goal reminder** | Light prompt based on the rhythm she set. Framed as an open question, never an accusation. |
| **Renewal prompt** | Near the end of a commitment period. Echoes her goal title. |

### Not push notifications

- Predictive class reminder: hero card on The Barre only. She opens the app, it's there. No push.
- Notes, corrections, timeline entries: in-app only, never pushed.
- Learn content: never pushed.

### When preferences are set

Notification preferences surface when she creates her first habit goal, not during onboarding. She doesn't know what she needs yet. Each habit goal can have its own reminder setting.

### Tone

Framed as open questions. "Warm up, still going?" not "You haven't logged your warm-up." Consistent with how renewal prompts are written.

---

## 30. Learn Search

Search covers Learn content only: skill library, glossary, pointers, repertoire, knowledge pages. Does not search notes, goals, corrections, or timeline entries. Browsed through their own surfaces.

---

## 31. Session Logger, Flow & Decisions

### Entry points

The FAB opens a menu with two options:
- Log a session
- Add a note (standalone, outside a session)

"Note a reflection" and "Record corrections, praise, notes" are old vocabulary, remove.

### Sheet structure

Full sheet. Fields in order:

**Date**, defaults to today. Tappable to change. Retrospective, no floor.

**Session** (optional), free text to name this session, or choose a saved one from a dropdown. Dropdown shows saved sessions with a "+ add new session" option at the top.

**Adding a new session**, opens an inline panel within the sheet:
- Name
- Location (optional)
- Class type (optional), pill chips: Technique class, Private lesson, Open class, Company class, Masterclass, Workshop, Rehearsal, Ballet retreat, Conditioning, More...
- Repeats on (optional), day selector. Leave blank for one-off.
- save recurring session button

Once saved, the session name populates the field and a metadata tag appears below it (e.g. London, W3 · Thu).

**Class type** (optional), same pill chip carousel as the saved session flow. Pre-selected if a saved session with a class type was chosen.

**Notes & corrections**, one or more note blocks. Each block contains:
- Skill or topic title (free text field at top of block)
- Linked skill (auto-suggested from title, multiple choice from skill library, always overridable)
- Free text note content
- Source chips: Correction · Observation (two chips, no label, both optional)
- Highlight star

"+ add notes & corrections" adds another block below.

Each block is removable with ×.

**Save session / discard**, fixed at the bottom of the sheet.

### Post-save

Sheet closes. A quiet prompt surfaces on the Barre or Profile hero: "session logged" with a relevant next action (e.g. "add a goal" if she has none). This does not editorialize or congratulate.

The "add to goals" prompt after save is a good pattern but the copy needs updating. Current: "Session saved. You logged corrections for: [skill]." Updated: "Session saved. You noted [skill], set a goal around it?" with options: set a goal / not now.

### Session detail view

Accessible from the timeline. Shows:
- Session title in Georgia
- Date, class type, location as metadata
- Notes & corrections grouped by skill block
- Linked skills listed below
- edit / delete accessible from top right

### Things to update in the current build

| Current | Fix |
|---|---|
| Correction / Praise / Reflection tabs inside note block | Replace with single free text field, Correction · Observation source chips, highlight star |
| "Note a reflection" in FAB menu | Remove or replace with "add a note" |
| "Record corrections, praise, notes" | Remove |
| "You've logged your first session!" copy | Remove. Tick only, no copy. |
| "You've saved your first correction!" copy | Remove. Tick only, no copy. |
| "Based on what you told us" goal suggestion copy | Remove. App does not editorialize. |
| "Enter to add · Shift+Enter for new line" hint | Remove everywhere. |

---

## 32. Error States & Offline Behaviour

### Principle

Errors are quiet, factual, and give her a path forward. No modal alerts, no blocking screens, no alarming language. Consistent with the notebook tone, the app observes and describes, it does not panic.

### Error states

| Situation | Message | Behaviour |
|---|---|---|
| **Save failure** | "couldn't save. tap to try again" | Quiet message at bottom of sheet. Her data stays in the form. Nothing is lost. |
| **Offline** | "you're offline. changes will sync when you reconnect" | Quiet banner. App remains readable from local cache. Nothing is blocked. |
| **Sign-in failure** | Specific to the error: "no account found with that email" / "incorrect password" | Inline, below the relevant field. Not "something went wrong." |
| **Content load failure** | "couldn't load, tap to try again" | In place of the content that failed. Same quiet pattern. |

### Offline behaviour

The app remains fully readable when offline. Local cache serves all existing data. She can read her timeline, notes, and goals. She cannot save new entries until reconnected, the save button is available but triggers the offline message rather than being disabled. Reconnection triggers a sync automatically with no announcement unless there was a conflict.

### Empty states

Already documented in Section 23. The copy does the work, no illustrations, no blocking, no instructions. Each empty state gives her one clear next action.

---

## 33. Sharing

Post-MVP. Not in the initial build.

When built: timeline items are shareable as a Plié-branded image. The image contains the text of that specific item only, no other context. Generated from the card, not a link. Share sheet trigger on individual timeline entries.

Added to open threads.
