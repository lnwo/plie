# Plié
## Product Decisions & Principles
Last updated: 26 April 2026, 16:00

*Working document. Update when decisions change. For visual and component spec, see plie-design-system.md. For screen structure and navigation, see plie-sitemap.md.*

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
| **Active** | Regular training. Default experience. |
| **Resting** | Voluntary break. App holds her place without nagging or implying failure. Tone: patient. |
| **Recovering** | Injury, surgery, chronic condition, pregnancy. Tone: gentle, non-directive. Conditioning and goal prompts recede. Nothing is gated. Never suggests exercises. Direction on physical matters always defers to teacher or physio. |

**Nothing is gated.** Training state adjusts tone and emphasis only. She can log a gentle yoga session while recovering. She can browse her timeline while resting. The notebook does not remove pages.

State is set in Profile settings. Set quietly, no fanfare. The app shifts on next open without announcement.

---

## 3. Vocabulary

### Copy principles

- Anchor in ballet vocabulary where it exists. Use plain human language where it doesn't.
- Never reach for productivity, wellness, or self-improvement app conventions.
- The register is: knowledgeable friend who also happens to dance — not a coach, not a system.
- British English throughout. Buttons always lowercase.
- 'Dimension' works as a data label. Too clinical for conversational copy — avoid in running text.

### Term decisions

| Old | New | Notes |
|---|---|---|
| Assessment / placement quiz | Orientation conversation | Removes authoritative weight. Self-guided, not evaluated. |
| Placement result / level | Starting point / your level | Self-selected orientation, not an earned rank. Recedes once set. |
| Correction / Praise / Reflection | Note (with block type) | Neutral container. Block type (Correction / Observation / Note / Goal) set at creation. |
| Milestone | (no named concept) | Lives inside a goal as unnamed progress markers. |
| Focus area | Dimensions | "Focus area" referred to what is now called Dimensions. Dissolved as a named surface-level concept. The "focus" tab inside the dimension detail sheet is a different, separate concept. |
| Signal lines | (removed) | Removed from Profile dimension cards entirely. |
| Session | Session | Neutral, accurate, no baggage. |
| Goal | Goal | Three types: skill, intention, habit. |
| Practice | Practice | How dancers talk about independent work. Distinct from a class or lesson. |
| Dimension | Use sparingly | Works as a label. Too clinical for conversational copy. |

---

## 4. Note Structure

### What a note is

A note is the core unit of capture. It replaces the Correction / Praise / Reflection three-mode system with modular block types set at creation.

| Field | Description |
|---|---|
| **Block type** | Set at creation: Correction / Observation / Note / Goal. Shown as small-caps label above the block. Not changeable after creation. |
| **Content** | Free text. No length constraint. Contenteditable div with live `—` dash prefix per line via CSS. |
| **Highlight ★** | Boolean. Surfaces the note in skill view and timeline. |
| **Linked skill** | Optional. Central to long-term findability. Multiple choice from skill library. Always overridable. |
| **Linked session** | Automatic when logged within a session. Corrections can also be logged standalone via FAB. |

Header row order: `[★] [topic input] [×]` — always this order, never rearranged.

**Why this replaces the three-mode system:** Correction / Praise / Reflection conflated source, valence, and origin into one toggle. A correction can be positive. A reflection can record something that went badly. The new model separates these concerns and gives her a blank container she fills on her terms.

### Highlights

A starred note or sessionSkill surfaces in three places:

| Surface | Treatment |
|---|---|
| Skill detail | "Highlights" section above corrections — gold left border, star toggle to un-star |
| Timeline | Session entries show a gold ★ if any note from that session is starred |
| Skill notes | Starred notes render with gold border |

The Highlights section is absent entirely if no highlights exist. It is not shown with an empty state.

Un-starring removes the item from Highlights without deleting the note.

### Retrospective date entry

All date fields are retrospective by default. No floor on how far back she can log.

---

## 5. Dimensions

### Principle

Dimensions describe what kind of dancer she is, not just what she's working on. They are self-selected orientations, not assessments. The app reflects her attention back at her so she can decide where to direct it next.

> *Show her where her attention has been, so she can decide where to focus next.*

The app observes; it does not interpret. It surfaces facts, never scores.

### The mirror, not a report card

The app can only see what she has given it. Dimension data reflects logged activity — it is not an objective assessment of her dancing. The dimension cards on Profile show what she has been working on, not how good she is.

### Dimension model

| Dimension | Status |
|---|---|
| **Technique** | Always present. |
| **Movement** | Always present. |
| **Artistry** | Always present. If artistry is not relevant to you, this app is not for you. |
| **The Body** | Always present. Sub-dimensions individually opt-in. |
| **Pointe** | Opt-in. |

Technique, Movement, Artistry, and The Body are intrinsic to ballet — not opt-in. Pointe is opt-in (genuinely not relevant to everyone). Sub-dimensions within The Body are opt-in (lifestyle choices, not ballet fundamentals).

### The Body — sub-dimensions

| Sub-dimension | Notes |
|---|---|
| **Flexibility** | Existing. |
| **Strength** | Existing. |
| **Turnout** | Existing. |
| **Conditioning** | Drills, cross-training, warm-up work. |
| **Nutrition** | Fuelling, energy, practical food notes. Never framed around weight or appearance. Performance and recovery lens only. |
| **Sleep & Recovery** | Rest, injury management, recovery notes. |

Sub-dimensions appear only inside the dimension detail sheet — not on Profile dimension cards.

> **Safeguarding — Nutrition sub-dimension**
>
> Eating disorders are disproportionately prevalent in the ballet world. The nutrition sub-dimension must never prompt unprompted — user-initiated only. All copy must be completely divorced from weight, appearance, or restriction. The only permitted lens is performance and recovery. When in doubt, do not write it.

### Naming convention

'Dimension' works as a label. Drop in running prose where context makes it obvious: "your artistry hasn't had much attention lately" not "your artistry dimension hasn't had much attention lately."

---

## 6. Goals

### Three goal types

| Type | Description |
|---|---|
| **Skill goal** | Linked to a specific skill. Can carry progress markers, correction links, and a commitment period. |
| **Intention goal** | Softer, not measurable by the app. "Feel comfortable in the Friday intermediate class." No skill link required. |
| **Habit goal** | Lifestyle and conditioning territory. "Warm up before every class this month." A commitment with a rhythm rather than an endpoint. |

### Goal entry point

Opens with a single question: *What are you working toward?*
- A skill
- A feeling or state
- A habit

The type is set in the background. She answers a question about her actual goal, not an app category.

### Commitment periods, not due dates

Goals have a commitment period — duration-based, not calendar-position. Presets: A week · Two weeks · A month · Three months · Custom date.

Percentage-based proximity triggers the renewal prompt. Proportionally equivalent regardless of period length.

### Renewal options

| Option | Description |
|---|---|
| **Renew** | Recommit for another period. Light editing allowed. |
| **Close with reflection** | Write a short note about how it went. |
| **Let it go** | Closes silently. The notebook does not judge abandoned goals. |

### Renewal prompt copy

Echoes her own goal title. Simple string interpolation, not AI.

| Goal type | Prompt |
|---|---|
| **Skill** | *"[title]" — how's it going?* |
| **Intention** | *"[title]" — worth reflecting on before it closes?* |
| **Habit** | *"[title]" — still keeping it up?* |

### Renewal prompt surfacing

| Goal type | Surfacing |
|---|---|
| **Skill goals** | Event-triggered. Surfaces when she logs a session containing the linked skill. |
| **Habit goals** | Light time-based reminder. Framed as open question, never accusation. |
| **Intention goals** | Surfaced passively — timeline, session close, the Barre. Never pushed. |

### Goal reactivation

Any past goal can be reactivated. Creates a new instance linked to the original. A quiet "continued from [date]" link connects them. Over time this creates a goal lineage — visible history of her relationship with a particular goal.

### Everything is editable and deletable

No data object in Plié is permanent or locked. She owns the notebook entirely.

---

## 7. Orientation & Levels

### The orientation conversation

The placement quiz becomes an orientation conversation. Questions are framed around confidence and experience, not binary capability. She can complete it or skip it and set her level directly.

### Four levels

| Level | Description |
|---|---|
| **Duckling** | Beginning. Building foundations. New to ballet or returning after a long break. |
| **Deer** | Developing. Knows the vocabulary, starting to work on quality not just execution. |
| **Swan** | Established. Solid foundations, working with real depth and intention. |
| **Firebird** | Advanced. Long-term training, technical consistency, clear sense of direction. |

Reduced from six to four. Bigger steps between levels make self-selection more accurate and progression more meaningful. Retired levels: Rabbit, Rose / La Sylphide. Their illustrations are retired from the level system but available as decorative assets.

Level recedes visually once set. Useful for content filtering, not a rank to display prominently.

### Assessment is quiz-only

The app never updates a dimension level from logged data — too many ways to get it wrong and it would undermine trust. But the app can prompt her to reassess at meaningful moments. Event-triggered, never on a schedule.

**Reassess triggers (all conditions must be true):**
- 8+ months of consistent logging
- Corrections AND sessions across multiple dimensions
- Rolling window

**Dimension-specific quiz trigger:**
- 10+ corrections across 3+ sessions in a specific dimension in the past 3 months
- Surfaces the relevant dimension questions only, not the full quiz

**Pointer trigger (either condition):**
- A skill is flagged as recurring for 8+ weeks
- A skill is marked in-focus for a sustained period with few corrections logged (stuck signal)

The prompt surfaces as a swipeable card in the Barre hero carousel — not as a notification or blocking screen.

### Orientation questions

Framed around confidence and experience, not capability. Multi-select throughout — "generally feel true." Helper text throughout. Q1 and Q2 are context only — not scored.

**Dimension coverage**

| Dimension | Questions |
|---|---|
| Technique | Q3 primary, Q4 partial, Q5 partial, Q13 partial |
| Movement | Q5 primary, Q6 primary, Q7 primary, Q10 partial |
| Artistry | Q8 primary, Q9 primary, Q4 partial, Q5 partial, Q7 partial |
| The Body | Q10 primary, Q11 primary, Q12 primary, Q13 primary |
| Pointe | Q14 primary |
| Context | Q1, Q2 — not scored |

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
How much time do you spend in class right now? *Think about a typical week, not your best or worst.*
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
Which of these generally feel true about how you use your arms and upper body? *In ballet, the arms, head, and shoulders working together is called port de bras and épaulement.*
- My arms and legs tend to work as separate problems in class
- I can follow the port de bras in combinations but it doesn't always feel natural
- My arms and legs generally work together without too much conscious effort
- I use my head and shoulders as part of how I move through a combination
- I think about the shape and quality of my arms, not just their position

**Q5 — Adagio and extension** (multi-select, Movement primary / Technique partial / Artistry partial)
Which of these generally feel true about your slow work? *Adagio is the slow, sustained section of class — développé, arabesque, attitudes, and held balances.*
- I haven't done adagio work yet
- I find slow combinations difficult to sustain with control
- I can hold an arabesque or attitude without losing balance most of the time
- I can extend my leg with control in slow combinations
- I can sustain long slow phrases without rushing or losing shape
- I use the music to shape how I move through adagio

**Q6 — Turns** (multi-select, Movement primary)
Which of these generally feel true about your turning? *This is about pirouettes specifically.*
- I haven't started working on turns yet
- I'm working towards a clean single, doing quarter and half turns
- I'm landing a single pirouette most of the time
- I'm working on doubles
- I can do reliable doubles
- I can do more than doubles consistently

**Q7 — Allegro** (multi-select, Movement primary / Artistry partial)
Which of these generally feel true about your jump work? *Allegro is the jumping section of class. Petit allegro is small fast jumps, grand allegro is larger travelling jumps.*
- I haven't started jumps yet
- I find jumps physically demanding more than technically challenging
- I'm confident doing basic jumps, sautés, échappés
- I'm confident doing petit allegro combinations, changements, assemblés, glissade
- I'm confident doing grand jeté
- I'm confident doing sissonne and travelling grand allegro combinations
- I'm confident getting through complex allegro combinations musically as well as technically

**Q8 — Musicality and expressiveness** (multi-select, Artistry primary)
Which of these generally feel true about how you relate to music in class? *Phrasing means shaping your movement to the musical sentence, not just the beat.*
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
How high can you hold your leg in à la seconde with control? *À la seconde means to the side. Stand on one leg and lift the other directly out to the side, with control and turnout, not a kick.*
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

---

## 8. First-Run Experience & Example Data

### The approach

Empty states include example data that makes her want to see her own data in its place. Demonstration, not description. She sees what Plié becomes over time — she is not told.

Three placeholders cycle per field, varying in type not just content.

### The example dancer

She exists implicitly, never named. Her data feels like one real person with a consistent training life.

| Aspect | Description |
|---|---|
| **Training life** | Serious but not perfect. Gaps exist. She returned after a few weeks off. Some goals completed, one quietly abandoned. |
| **Corrections** | Specific and physical, with a real teacher's voice. "Your foot is sickling on the dégagé to the back — think of pushing the little toe away." Not "point your feet." |
| **Goals** | Mix of skill, intention, and habit types. Not all completed. |
| **Timeline** | Two or three classes a week. A gap. A return. A note about physiotherapy. No perfect attendance. |
| **Level** | Mid-journey. Deer or Swan. |
| **Highlights** | Genuinely significant moments. Not every note is starred. |

### Placeholder text examples

| Field | Examples |
|---|---|
| **Note field** | "weight too far back on the supporting leg in arabesque" · "trying to keep the hip down on the battement — harder on the left" · "teacher noticed the arms are arriving before the head in the port de bras" |
| **Goal field** | "feel comfortable taking the Friday intermediate class by end of term" · "double pirouette consistently — nail two next class" · "stop gripping in the hip flexor on the développé devant" |
| **Reflection field** | "finally understood the épaulement in the port de bras combination" · "the adage felt different today — something shifted in the weight placement" · "read about spotting in BWI — try applying it Thursday" |

---

## 9. Pointers

### What a pointer is

A diagnostic content type in Learn. Not a test, not a self-check — a structured set of questions that help her understand why she might be stuck in a particular area. The output is a direction, not a score. Always directs to her teacher, her own research, or relevant Learn content. Never claims to diagnose.

> *Some dancers struggle for months or years not realising there may be other barriers than the obvious one. Pointers surface those barriers.*

### Structure

| Part | Description |
|---|---|
| **The questions** | Triangulate toward a likely root cause. Count varies by topic — never forced to a fixed number. |
| **The insight** | The non-obvious thing. "Fluidity in the arms comes from the elbow and wrist, not the shoulder." |
| **The direction** | Exercises, things to ask her teacher, linked skills, conditioning content. |
| **The inspiration** | Optional. A specific dancer or performance. Described for searching, not linked (MVP). |

### In Learn

Pointers appear in-line with all Learn content. A filter chip distinguishes them. A small quiet indicator on the card distinguishes them without making them feel like a test.

### MVP scope

Four areas: épaulement, extension / leg height, pirouettes, footwork articulation. Full content to be commissioned from a professional before launch. Placeholder lives in plie-pointers.md.

---

## 10. In Focus — Skill Flagging

### Mechanic

The user explicitly marks a skill as "in focus" from the skill detail personal view or the skill knowledge page in Learn. Both toggle the same `skill.flagged` boolean.

The Barre surfaces only skills explicitly marked in focus. If nothing is marked, the In Focus section is absent entirely.

An in-focus skill with no corrections shows an "add a correction →" action on The Barre rather than a correction quote.

### Recurring corrections

Detection: after each session save, for every skill touched:
- Collect all corrections for that skill within the last 60 days
- If ≥3 corrections across ≥2 distinct sessions → mark as recurring
- Fewer than 3, or all in the same session → clear recurring flag

The recurring flag is always derived state, recalculated on every save — never set manually.

---

## 11. Data & Time Scoping

### The mirror principle

Correction counts should always be displayed alongside session counts, not in isolation. Both are shown as separate facts. No ratio or derived metric is surfaced — she draws her own meaning.

A single session with 5 corrections is not the same as 5 corrections across 5 sessions. The app cannot distinguish these so it does not interpret.

### Time scoping

Summary views (cards, strips, previews) always show time-scoped data — never all-time accumulations. All-time data appears only in list and index views (My Skills, full corrections list, Timeline, Training history grid).

**Default scope for summary views:** The 6 most recent corrections AND within the past 6 months — both conditions must be true. If neither condition is met, the empty state surfaces: "nothing from the past 6 months — see all to view your full record."

**Profile dimension cards:** Correction count reflects the selected month, labelled with the month name ("8 in April"). The month selector affects dimension card counts only — not the dimension detail sheet.

**Dimension detail sheet corrections:** All-time in list view when she taps "see all." Default view uses the 6 most recent AND past 6 months rule.

### Corrections never expire

Old corrections recede naturally (not shown in the default view) but are never deleted by the app. Always accessible via "see all." She owns the record entirely.

### To explore

Ratio display on dimension cards: "8 this month / 34 past 6 months." Recorded for future consideration — not decided.

---

## 12. Profile — Training Rhythm

### The rhythm strip

Seven squares (Mon–Sun) in the Profile hero. Density shading encodes session frequency or hours trained (per toggle). Shading is a single warm ramp — no colour encoding of dimension or any other variable. Counts shown below each square.

Sessions/hours toggle sits inline to the right of the strip label. User can switch at any time — a rehearsal week and a class week look very different in hours.

### Training history

"See breakdown →" navigates to the Training history page — a full-screen density grid showing every month of logged training. Year tabs for navigation. Same shading ramp as the rhythm strip. Each cell tappable → Timeline filtered to that date.

The rhythm strip and the training history grid show the same type of data at different granularities. The strip is a summary; the grid is the record.

---

## 13. The Barre Hero Carousel

### Model

The hero area is a swipeable carousel. Multiple card types can queue. Dot indicators when more than one card is present. Each card individually dismissable ("not now").

### Card types

- Session prompt (predictive from recurring session, or generic)
- Orientation quiz nudge (8+ months consistent logging trigger)
- Dimension quiz nudge (10+ corrections in a dimension over 3 months)
- Pointer suggestion (recurring skill 8+ weeks, or in-focus skill with few corrections)
- Goal renewal prompt (near end of commitment period)

### Priority ranking

**FLAGGED FOR FURTHER DISCUSSION.** The ranking model for which card shows first when multiple are queued is not yet decided. Questions to answer: what are all card types, what makes one more urgent than another, is urgency time-based or activity-based, how are ties broken.

---

## 14. Dimension Detail Sheet

### Structure

Single scrollable sheet. Three tabs act as jump-to anchors, not content-swapping tabs. Visual treatment to make this clear.

**Corrections section**
Grouped by session (most recent first). Session header above each group — name, date, class type. Max 2 lines per correction. Default scope: 6 most recent AND past 6 months. "Show more sessions →" below. "See all corrections →" for full record.

Focus signal: in-focus skills are flagged with a quiet indicator on their session group header — not a separate prominent block.

**Focus section**
Expandable. Collapsed default shows a summary line ("2 skills in focus · 1 active goal"). Expanded shows in-focus skills (each tappable to skill detail, quiet "remove from focus" action) and active goals for this dimension.

**Notes section**
PINNED — pending rest of detail sheet design.

**My skills in this dimension**
Flat list of every skill touched in this dimension. Skill name · correction count · last session. All-time counts. No category label (dimension is the context). Tappable to skill detail.

**Connected sessions**
Merged into the corrections section. Sessions where this dimension was touched but no corrections logged are listed separately below the grouped corrections.

**Orientation data (bottom, deemphasised)**
"1 of 4" result. Last assessed date. "reassess" button — not tappable data. App-triggered reassess prompt appears as a swipeable card with dot indicator when trigger fires.

**What this means**
Static copy block per dimension. Stays.

---

## 15. Skills Index

Entry point: "my skills →" link in the Duckling dropdown on The Barre.

Flat alphabetical list. Searchable. Each row: skill name · correction count · last session date. All-time counts (list/lookup context). No category label. Tappable to skill detail.

The Duckling dropdown itself shows: level name (EB Garamond display) · truncated persona description · "my skills →" link. Full-width panel below the header, warm surface, closes on tap outside.

---

## 16. Decision Framework

A set of questions to ask at every product fork. For solo use at 11pm when the answer isn't obvious. Run through in order — the answer usually becomes clear before the end.

| Question | Guide |
|---|---|
| **1. Does one option serve the notebook principle better?** | Does it give her more control, more flexibility, less prescription? If yes, that option wins. |
| **2. Does one option pass the teacher test?** | Does it help her get more from her classes? Or is it trying to be the class? |
| **3. Does one option fit the vocabulary?** | Ballet language over productivity / wellness language. If neither fits, plain human language. |
| **4. Does one option have lower technical cost for equivalent user value?** | As a solo builder, complexity has a real price. Always choose the simpler option if value is equivalent. |
| **5. Is this a now decision or a later decision?** | Can it be deferred without baking in assumptions that are hard to undo? If yes, park it with a note. |
| **6. Does one option work across all three training states?** | Active, resting, recovering. If it only works for the active user, it needs revisiting. |

If following the framework leads to an answer that feels obviously wrong, the feeling is data. Note why you broke it and what you did instead.

---

## 17. Open Threads

**1. Source field labels — CLOSED**
Correction · Observation. Two chips, no label, both optional. May revisit label after user testing.

**2. Dimension naming — CLOSED**
"Focus area" referred to what is now called Dimensions — dissolved as a named surface-level concept. The "focus" tab inside the dimension detail sheet is a different, separate concept and is not affected by this decision.

**3. Training state copy — CLOSED**
Hero card copy written for all three states (see Section 13 of this doc and design system). Hero is now a carousel — state-specific copy applies to the session prompt card within the carousel. Empty states for recovering and resting states still needed for dimension cards, goals tab, skill cards. Write when building those surfaces.

**4. Mental dimension — CLOSED**
No fifth dimension. Confidence, motivation, and concentration sit naturally as intention goals. Mental health territory is explicitly out of scope.

**5. Pointer content — PLACEHOLDER COMPLETE**
Four MVP areas written. Full content to be commissioned before launch. Placeholder in plie-pointers.md.

**6. Design system coherence — CLOSED**
Fix now if visible to user and contradicts a decided pattern, or on a screen being actively built. Flag for polish pass if cosmetic and on a screen not currently being touched. Polish pass before any external demo. Four decoration tokens added (#8FA0A8, #C4A882, #B5A8C0, #A8B8A0) — see design system doc.

**7. Goal renewal prompt copy — CLOSED**
Mechanic defined. Copy varies by goal type. Echoes goal title only. See Section 6.

**8. Data export — OPEN**
She should be able to export her data if she leaves the app. Format, scope, and trigger not yet decided. Revisit before launch.

**9. Hero carousel priority ranking — FLAGGED**
The ranking model for which card shows first when multiple are queued is not decided. See Section 13.

**10. Notes tab in dimension detail — PINNED**
Third tab in dimension detail sheet. Will surface observation blocks, standalone notes, and highlights from this dimension. Pending rest of detail sheet design before deciding exact scope.

**11. Training history grid colour — TBD**
The density grid filled cells: gold family (#C4900C at varying opacities) vs slate decoration colour (#8FA0A8). Both options are valid. Decide during polish pass.

**12. Star indicator in training history grid — TBD**
Small dot on cells containing highlighted/starred notes. Concept approved, implementation detail TBD.

**13. Ratio display on dimension cards — TO EXPLORE**
"8 this month / 34 past 6 months" format on dimension cards. Recorded for future consideration — not decided.

**14. Sharing — POST-MVP**
Timeline items shareable as Plié-branded image. Text of that item only. Share sheet trigger on individual timeline entries.

---

## 18. Behavioural Foundations

The behavioural research that shaped Plié should be felt in the product, not announced.

| Insight | How it shows up | Source |
|---|---|---|
| **Writing things down aids retention and achievement** | The entire logging premise. The note field existing at all is the nudge. | Matthews (1982), Emig (1977) |
| **Specificity improves outcomes** | Placeholder text models specific language. Vague example data is never used. | Barr, goal-setting literature |
| **The change process is non-linear** | Timeline shows gaps without comment. Abandoned goals close without shame. | Hackney, Making Connections |
| **Commitment and recommitment increase follow-through** | The renewal prompt asks for a conscious decision to continue. | Robbins, Matthews |
| **Reflective practice has four natural stages** | The session logger implicitly follows the evaluative log structure. | Barr, Durrant / Blythe |
| **Mental and lifestyle goals are as legitimate as technical ones** | Intention and habit goal types exist alongside skill goals. | Psychology of Dance, Futurability |
| **Glows and Grows as a reflection structure** | The highlight toggle creates a natural glows/grows split without naming it. | Blythe, Treiber-Kawaoka |

---

## 19. References

| Source | Notes |
|---|---|
| **Barr, S.** | "The Dancer as Reflective Practitioner." Foundation for reflective practice framing and note structure as evaluative log. |
| **Blythe, A.** | "Goal Setting for Dancers" and "Reflective Practice Through Journaling." Practical source for goal frameworks, Glows & Grows, Evaluative Log. |
| **Emig, J. (1977)** | "Writing as a mode of learning." Foundation for the logging premise. |
| **Hackney, P.** | Making Connections. Foundation for the gap/return model and non-linear growth philosophy. |
| **Matthews, G.** | Dominican University research on goal-writing. Foundation for logging emphasis. |
| **Murphy, S. (ed.)** | The Sport Psych Handbook / Psychology of Dance. Foundation for the dimension model. |
| **Robbins, M.** | The 5 Second Rule. Supporting reference for goal commitment and renewal mechanic. |
| **Ness, W. & Dobson, J.** | Coach Anyone About Anything. Futurability for Objectives — foundation for commitment period model. |
| **Durrant, A.** | Evaluative Log (Leeward Community College). Four-question reflective structure mapping onto the session logger. |

### Terms to explore

| Term | Description |
|---|---|
| **Reflective practice** | Donald Schön — professionals learn through structured reflection on their own experience. |
| **Futurability for Objectives** | Alternative to SMART goals for contexts where outcomes are not purely quantifiable. |
| **Glows and Grows** | Reflective feedback structure distinguishing strengths from areas for development. |
| **Motor learning** | How movement skills are acquired and retained. Why spaced practice and correction improve technique. |
| **Laban Movement Analysis** | Framework for describing human movement. Background to The Body dimension structure. |
| **Adult learning theory (Andragogy)** | Malcolm Knowles — adults learn differently: self-directed, experience-based, internally motivated. |
| **Deliberate practice** | Anders Ericsson — focused, reflective, feedback-driven repetition. |

---

## 20. Onboarding

### Principle

One screen. One idea. Then straight into the orientation conversation. No feature list, no tutorial, no pitch. The app communicates how it works through being used, not through explanation.

### The screen

Two distinct typographic moments: the statement (EB Garamond display) and the utility list (DM Sans body). Separate typographic elements, not one continuous block.

**Statement**
*Writing it down changes what you remember. And what you remember changes how you dance.*

**Utility list**
*A notebook for your training. Log what happened in class, note what your teacher said, track what you're working on. The rest builds from there.*

Primary: let's go →
Secondary: skip quiz, I want to set my level →

---

## 21. Getting Started Cards

On The Barre after orientation is complete. Five cards in a horizontal carousel, two visible at a time. Cards complete automatically when the action is done. Completed state: greyed out with a tick, no copy. Section persists until all complete.

| Card | Description | Opens |
|---|---|---|
| **Log your first class** | *Notes while they're fresh stay with you.* | Session logger |
| **Save a note** | *Something your teacher said is worth keeping.* | Session logger, note entry |
| **Set a goal** | *Give your training a direction.* | Goal sheet |
| **Try a pointer** | *Find out what's actually holding you back.* | Learn, filtered to Pointers |
| **Explore Learn** | *The skill library, glossary, and repertoire.* | Learn |

---

## 22. Accounts & Notifications

### Accounts

Account creation happens after orientation is complete. She experiences the app first, then commits.

Sign in options: Email and password · Sign in with Apple. No Google sign-in.

An account enables: multi-device sync · data backup · data export (see open thread 8).

She can use the app locally before creating an account.

Implementation: Supabase (free tier) handles auth including Apple sign-in and provides a Postgres database. localStorage is the local cache, not the source of truth.

### Notifications

Notifications are only appropriate for things she has actively committed to.

Legitimate triggers:
- Habit goal reminder — framed as open question, never accusation
- Goal renewal prompt — near end of commitment period, echoes goal title

Not push notifications: predictive class reminder (hero card only), notes/corrections/timeline entries, Learn content.

Notification preferences surface when she creates her first habit goal, not during onboarding. Each habit goal can have its own reminder setting.

---

## 23. Error States & Offline

### Principle

Errors are quiet, factual, and give her a path forward. No modal alerts, no blocking screens, no alarming language.

| Situation | Message | Behaviour |
|---|---|---|
| **Save failure** | "couldn't save. tap to try again" | Data stays in form. Nothing is lost. |
| **Offline** | "you're offline. changes will sync when you reconnect" | App remains readable from local cache. |
| **Sign-in failure** | Specific to error: "no account found with that email" | Inline, below the relevant field. |
| **Content load failure** | "couldn't load, tap to try again" | In place of the failed content. |

The app remains fully readable when offline. She can read her timeline, notes, and goals. She cannot save new entries until reconnected — the save button is available but triggers the offline message rather than being disabled.

---

## 24. Copy — Empty States

### Typography convention

All empty states follow a two-line typographic structure. The heading sets the context in EB Garamond. The body explains or invites in DM Sans. They are separate typographic elements, not one sentence with a capital mid-way.

### Empty state strings

| Surface | Heading | Body | Action |
|---|---|---|---|
| The Barre — no skills | — | *Your corrections will live here. Log your first class and they'll start to build.* | log a class → |
| Hero — active, no recurring session | — | — | *log a class →* (text link only, no card) |
| Hero — resting | *Taking a break* | *Anything worth noting while you're away?* | log now → |
| Hero — recovering | *Focusing on recuperating* | *You can still log anything useful — physio notes, what you can work on, things to remember.* | log now → |
| Goals — no active goals | — | *Nothing on the go right now. Goals you're working towards live here.* | set a goal → · view past goals → (only if past goals exist) |
| Dimension card — no activity | — | *Nothing logged here yet. It'll fill as you work.* | — |
| Dimension corrections — past 6 months empty | — | *Nothing logged in the past 6 months.* | see all to view your full record → |
| Timeline — no entries | — | *Your training story starts here. Every class, correction and goal you log will build into a record worth having.* | — |
| Learn — no search results | — | *Nothing found for "[query]". Try a different spelling, or browse by category below.* | — |
| In Focus — no flagged skills | Section absent entirely. No empty state shown. | | |
| Saved learning — no bookmarks | Section hidden entirely. | | |

### Principles

- No illustrations in empty states unless specifically noted. Copy does the work.
- No instructions — if the label says what to do, body copy is redundant.
- Each empty state gives her one clear next action, never two competing ones.
- Gaps are normal. Empty states never imply she should have done more.
- Training state variants (resting, recovering) for dimension cards, goals tab, and skill cards on The Barre still to be written — follow principles above when building those surfaces.
