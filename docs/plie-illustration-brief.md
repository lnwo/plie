# Plié — Illustration Brief


## Current Status

| Set | Item | Status |
|-----|------|--------|
| Level animals | Duckling (Beginner) | ✅ generated, embedded in app |
| Level animals | Rabbit (Elementary) | ✅ generated, embedded in app |
| Level animals | Deer (Improver) | ✅ generated, embedded in app |
| Level animals | Swan (Intermediate) | ✅ generated, embedded in app |
| Level animals | Rose (Upper Intermediate) | ✅ generated, embedded in app |
| Level animals | Feather (Advanced) | ✅ generated, embedded in app |
| Profile defaults | Classic bun (2a) | ✅ generated, embedded |
| Profile defaults | Male dancer 1 (2c variant) | ✅ generated, embedded |
| Profile defaults | Male dancer 2 (2c variant) | ✅ generated, embedded |
| Profile defaults | Contemporary female (2b) | ⬜ needs regeneration (white fill) |
| Profile defaults | Gender neutral (2d) | ⬜ not generated |
| Profile defaults | Girl ~8–10 (2e) | ⬜ not generated |
| Profile defaults | Boy ~8–10 (2f) | ⬜ not generated |
| Profile defaults | Older female (2g) | ⬜ needs regeneration (too dark) |
| Profile defaults | South Asian female (2h) | ⬜ not generated |
| Profile defaults | East Asian female (2j) | ⬜ not generated |
| Profile defaults | Back view (2k) | ⬜ not generated |
| Profile defaults | Hands in port de bras (2l) | ⬜ not generated |
| Onboarding heroes | Standing dancer (3a) | ✅ generated, not yet embedded |
| Onboarding heroes | Grand plié / ballet shoes (3b) | ⬜ blocked — use ballet shoes workaround |
| Empty states | Barre (4a) | ⬜ wrong colour (grey), regenerate |
| Empty states | Spotlight (4b) | ⬜ not generated |
| Empty states | Mirror (4c) | ⬜ wrong colour (grey), regenerate |

**Note:** All illustrations were generated with Copilot/DALL-E using the prompts below.
When regenerating, use the full base prompt + subject line.
Remaining quota needed: approximately 12 generations.

---

## Style Foundation (read before any prompt)

All illustrations for Plié share a single visual language:

- **Technique**: Single-weight stroke linework. No fill. No gradients. No colour.
- **Weight**: stroke-width 1.5px at native size, scales cleanly
- **Colour**: Rendered in a single warm ink tone — #9A8E87 (map to CSS variable `--ink-3` in the app)
- **Format**: SVG, each on an 80×80px viewBox unless specified
- **Spirit**: Editorial, not iconographic. Think vintage ballet programme illustration, not app icon. Reference points: Toulouse-Lautrec's ballet sketches, 19th century naturalist line drawings, Aubrey Beardsley's economy of line.
- **Tone**: Warm, considered, slightly literary. Not cute. Not gamey. Not corporate.

Do not add decorative borders, drop shadows, fills, or hatching unless specified. When in doubt, do less.

---

## Prompt Set 1: Level Animals & Archetypes

Six illustrations representing ballet skill progression. These appear on the profile status card next to the user's level. They should feel like a coherent set — same hand, same weight, same restraint.

**Brief for the AI**: Create a single-weight SVG line illustration on an 80×80 viewBox. Warm editorial style, no fill, no colour, stroke only. The subject should feel graceful and slightly literary — not cute, not gamey.

---

### 1a — Duckling (Beginner)

A young duckling, seen from a slight three-quarter angle. Soft, round form. Fluffy down suggested by short irregular strokes. Feet slightly turned out — a subtle nod to ballet's first position. The expression is earnest, not comic.

**Prompt**: Single-weight SVG line illustration, 80×80px viewBox, no fill, stroke only. A duckling in three-quarter view. Round, soft form. Feet turned slightly outward. Short irregular strokes suggest fluffy down. Earnest, not comic. Editorial style — closer to a naturalist field sketch than a cartoon. Warm and gentle.

---

### 1b — Rabbit (Elementary)

A rabbit mid-preparation — weight shifted forward, hindquarters lowered as if about to spring. Not yet airborne. Alert ears. Clean, elongated limbs. The implied motion is anticipation rather than action.

**Prompt**: Single-weight SVG line illustration, 80×80px viewBox, no fill, stroke only. A rabbit in a deep preparatory crouch — weight forward, hindquarters lowered, about to spring. Alert upright ears. Clean elongated limbs. The energy is contained anticipation, not comic bounciness. Editorial naturalist style.

---

### 1c — Deer (Improver)

A young deer — a doe — standing in soft arabesque-like pose: one rear leg extended behind, head gently turned. Graceful but still uncertain, still finding its line. Delicate legs. Long neck. A moment of quiet composure.

**Prompt**: Single-weight SVG line illustration, 80×80px viewBox, no fill, stroke only. A young doe standing with one rear leg softly extended behind, head turned gently to the side. Slender legs, long neck. The pose echoes an arabesque without being literal about it. Graceful but still — not yet fully confident. Quiet and composed. Editorial line style.

---

### 1d — Swan (Intermediate)

The classical reference — but rendered without cliché. Not a decorative swan. A swan on water, neck in the characteristic S-curve, one wing slightly raised as if mid-breath. The emphasis is on line and control, not ornament.

**Prompt**: Single-weight SVG line illustration, 80×80px viewBox, no fill, stroke only. A swan on still water, neck in a clean S-curve, one wing fractionally raised as if mid-breath. Not decorative — emphasise line quality and control over ornament. No water ripples unless they add to the composition. The feeling is composed authority. Editorial naturalist style, not romantic illustration.

---

### 1e — The Sylph (Upper Intermediate)

An abstract representation of the Romantic ballet sylph — from La Sylphide / Giselle tradition. Winged, weightless, technically precise. Not a fairy or angel. A figure in flight, arm extended, back leg lifted, wings suggested rather than drawn in detail. The line is exacting. Ephemeral but controlled.

**Prompt**: Single-weight SVG line illustration, 80×80px viewBox, no fill, stroke only. An abstracted Romantic ballet sylph — a winged female figure in flight. One arm extended, back leg lifted. Wings suggested with minimal strokes, not drawn in anatomical detail. The figure should feel weightless and technically precise simultaneously — this is classical technique, not fantasy. Reference: Romantic era ballet lithographs. No frills, no decoration. Restrained and exact.

---

### 1f — The Firebird (Advanced)

From Stravinsky and Fokine's 1910 ballet. Not a bird, not purely a dancer — something mythic and electric. A figure mid-turn or mid-leap, arms wide, feather-like extensions from the arms and back. Fierce. The line is faster, more energetic than the others — but still controlled. This is not chaos, it is mastery.

**Prompt**: Single-weight SVG line illustration, 80×80px viewBox, no fill, stroke only. The Firebird — a dancer-figure mid-leap or mid-turn, arms wide, feather-like forms extending from the arms and back. The energy is electric and mythic, not decorative. Faster, more dynamic linework than the other five in this set, but still precise — mastery expressed through controlled energy. Reference: Bakst's original Firebird costume designs, Fokine's choreographic energy. No literal bird anatomy. A human figure transfigured.

---

## Prompt Set 2: Profile Picture Defaults

Twelve cameo-style portrait illustrations. These appear as the default avatar when a user hasn't uploaded a photo. The intent is anonymous warmth — enough character to feel personal, but no facial features that might feel like "someone else's face."

**Style note**: Oval vignette format, 80×80px viewBox. Portraits cropped at the shoulder or mid-chest. No faces — features implied by pose, hairstyle, and angle only. Linework slightly looser than the level animals. The feeling is 19th century silhouette portraiture crossed with quick Degas-style character sketches.

---

### 2a — Classic female dancer, hair in bun

A female dancer seen from slight three-quarter angle. Hair pulled back in a neat classical bun, a few loose strands. Shoulders back, long neck. The posture is unmistakably a dancer's — but nothing about the illustration pins down ethnicity or age beyond "adult."

**Prompt**: SVG oval portrait illustration, 80×80px viewBox, no fill, stroke only. A female dancer cropped at the shoulders. Hair in a classical ballet bun with a few loose strands. Long neck, upright posture. Three-quarter angle. No facial features. Loose editorial linework. Warm, anonymous, character implied through posture and hair alone. 19th century portrait silhouette energy.

---

### 2b — Contemporary female dancer, hair down

A female dancer with hair loose or in a low casual ponytail. Posture slightly more relaxed — contemporary rather than classical. Head at a slight tilt suggesting movement or thought.

**Prompt**: SVG oval portrait illustration, 80×80px viewBox, no fill, stroke only. A female dancer with loose or low-ponytail hair. Posture relaxed and contemporary rather than classical. Head at a slight tilt. No facial features. The character reads as a modern dancer rather than purely classical. Loose editorial linework.

---

### 2c — Male dancer

A male dancer, head and shoulders. Strong neck, squared shoulders. Hair short or pulled back. Posture upright with a sense of contained physical strength. Not aggressive — controlled.

**Prompt**: SVG oval portrait illustration, 80×80px viewBox, no fill, stroke only. A male dancer, head and shoulders. Short hair or hair pulled back. Strong neck, squared shoulders, contained physical strength. No facial features. Upright, composed. Neither aggressive nor soft — a dancer's specific combination of strength and control.

---

### 2d — Gender neutral dancer

A dancer whose presentation is deliberately ambiguous. Cropped hair or hair pulled back neutrally. Posture neutral and composed. No gendered styling cues. Should feel natural and resolved, not deliberately androgynous in an exaggerated way.

**Prompt**: SVG oval portrait illustration, 80×80px viewBox, no fill, stroke only. A dancer with neutral presentation — short or pulled-back hair, no gendered styling cues. Upright composed posture. The ambiguity should feel natural and resolved, not exaggerated. No facial features. Editorial linework.

---

### 2e — Child dancer, girl, approximately 8–10

A young girl dancer. Hair in two buns or a high ponytail. Smaller frame, slightly rounded shoulders. The posture still has that studied uprightness of a child who has been told to stand straight. Sweet but not saccharine.

**Prompt**: SVG oval portrait illustration, 80×80px viewBox, no fill, stroke only. A young girl dancer, approximately 8–10 years old. Hair in double buns or high ponytail. Small frame, slightly rounded child's shoulders, studied upright posture — the careful stance of a child in ballet class. No facial features. Warm, not cute.

---

### 2f — Child dancer, boy, approximately 8–10

A young boy dancer. Short hair. Slight frame. The same studied upright posture. Shoulders back, chin fractionally up — the specific way children are taught to stand in ballet class.

**Prompt**: SVG oval portrait illustration, 80×80px viewBox, no fill, stroke only. A young boy dancer, approximately 8–10 years old. Short hair. Slight frame. Upright careful posture — chin slightly raised, shoulders back. The studied stance of a child in ballet class. No facial features. Warm and natural.

---

### 2g — Older female dancer, returner

A female dancer clearly in her 40s or 50s — implied by the hair (shorter, or worn with a different ease than a younger dancer's bun). Posture just as strong, possibly more settled. The character reads as someone who has danced for decades.

**Prompt**: SVG oval portrait illustration, 80×80px viewBox, no fill, stroke only. A female dancer in her 40s–50s. Hair shorter or worn with the ease of someone who has been a dancer for decades. Strong, settled posture — less effortful than a young dancer, more inhabited. No facial features. The maturity is implied by hair and posture alone.

---

### 2h — South Asian female dancer

A female dancer with a silhouette that implies South Asian heritage — hair thick and dark, perhaps with a braid or jasmine flowers suggested in the hair. The same upright ballet posture but with individual character.

**Prompt**: SVG oval portrait illustration, 80×80px viewBox, no fill, stroke only. A female dancer with thick dark hair — perhaps braided or with a small flower detail. Upright ballet posture. No facial features. The cultural specificity comes through the hair detail alone, not caricature. Warm and natural.

---

### 2i — Black male dancer

A male dancer with a silhouette implying Black heritage — close-cropped natural hair or locs. Strong neck, strong posture. The same composed contained strength as 2c but with individual character in the hair.

**Prompt**: SVG oval portrait illustration, 80×80px viewBox, no fill, stroke only. A male dancer with close-cropped natural hair or short locs. Strong neck and shoulders, contained physical strength. No facial features. The character comes through hair and posture. Natural and composed.

---

### 2j — East Asian female dancer

A female dancer with straight dark hair — perhaps in a sleek bun, perhaps in a blunt-cut bob. Precise upright posture. A sense of exactness in the bearing.

**Prompt**: SVG oval portrait illustration, 80×80px viewBox, no fill, stroke only. A female dancer with straight dark hair in a sleek bun or blunt bob. Precise upright posture. A sense of exactness and control in the bearing. No facial features. Clean linework. Composed.

---

### 2k — Abstract silhouette A

No portrait — a dancer seen from behind, head turned slightly. Just a silhouette of a bun, a long neck, bare shoulders. For users who want no identity at all. Elegant, not empty.

**Prompt**: SVG oval portrait illustration, 80×80px viewBox, no fill, stroke only. A dancer seen from behind — the back of a head with hair in a bun, a long neck, bare shoulders. Head turned fractionally to one side. No face visible at all. For users who want anonymity. Elegant and deliberate, not absent.

---

### 2l — Abstract silhouette B

A dancer's hands in port de bras position — no face, no body visible, just the hands and wrists crossed or posed in a characteristic ballet arm position. For users who want something gestural and non-figurative.

**Prompt**: SVG oval portrait illustration, 80×80px viewBox, no fill, stroke only. A dancer's hands in a characteristic port de bras position — wrists soft, fingers gently curved. No face, no body. Just the hands, suggesting a dancer through gesture alone. Graceful and abstract.

---

## Prompt Set 3: Onboarding Hero Illustrations

Two full figures for the onboarding screens. These are larger, more detailed than the portraits and animals — they occupy a featured space. The style is consistent with the rest of the illustration system but allows for more complexity.

**Format**: 200×200px viewBox. Single-weight stroke, no fill.

---

### 3a — Standing dancer (Onboarding screen 1)

A full-figure ballet dancer standing in a neutral but elegant position — perhaps tendu side, head turned, arms in a low port de bras. A first impression of the app. Calm and welcoming.

**Prompt**: SVG full-figure illustration, 200×200px viewBox, no fill, stroke only. A ballet dancer standing in a calm elegant position — perhaps with one leg in tendu to the side, arms in a soft low port de bras, head gently turned. Full figure from the top of the head to the pointed foot. Unhurried, welcoming. The first illustration a new user sees — it should feel like the beginning of something. Single-weight warm editorial linework.

---

### 3b — Plié (Onboarding screen 3)

A full-figure dancer in grand plié — both legs deeply bent in second position or first, arms in second, head level. The plié is the heart of classical technique. This illustration should feel grounded and foundational — this is where everything begins.

**Prompt**: SVG full-figure illustration, 200×200px viewBox, no fill, stroke only. A ballet dancer in grand plié — legs deeply bent in first or second position, arms extended in second position or a soft first, head level. Full figure. The emphasis is on groundedness and foundation — this is the beginning, not a virtuosic moment. Single-weight warm editorial linework. The feeling is: everything starts here.

---

## Prompt Set 4: Empty State Illustrations

Small spot illustrations for empty states in the app. These appear when a section has no data yet. They should feel encouraging rather than apologetic — the absence of data is a beginning, not a failure.

**Format**: 48×48px viewBox. Very minimal — 3–5 strokes maximum. More icon-like than the portraits and figures, but still with warmth.

---

### 4a — The Barre empty state (no active skills)

A barre rail with no one at it. Just the horizontal rail and two support posts. Waiting. Simple.

**Prompt**: SVG spot illustration, 48×48px viewBox, no fill, stroke only. A ballet barre — horizontal rail, two vertical support posts, floor line. No figures. Simple, architectural, waiting. 3–4 strokes maximum.

---

### 4b — Goals empty state

A target or bullseye, but rendered as ballet-relevant — perhaps a spotlight circle on a stage floor rather than a literal target.

**Prompt**: SVG spot illustration, 48×48px viewBox, no fill, stroke only. A simple spotlight circle on a stage floor — a pool of implied light, suggested by an oval on a horizontal surface. Not a literal target/bullseye. Minimal. Stage-like.

---

### 4c — Profile not-assessed state

A question mark inside a soft oval — but rendered with the same warm line quality, not as a UI icon. Or alternatively: an empty mirror frame, implying the self-reflection of assessment.

**Prompt**: SVG spot illustration, 48×48px viewBox, no fill, stroke only. An oval mirror frame, empty — implying reflection and self-assessment without showing a figure. Clean, architectural oval with a small base. 3–4 strokes.

---

## Usage Notes for the App

Once illustrations are created as SVG code:

- All stroke colours should use `currentColor` so they inherit from CSS
- Set `stroke="currentColor"` and `fill="none"` on the root SVG element
- Remove any hardcoded colour values from paths
- The parent element in the app will set `color: var(--ink-3)` for default rendering
- Hover/active states can shift to `color: var(--ink-2)` via CSS alone

This makes the entire illustration set themeable and dark-mode compatible without any additional work.
