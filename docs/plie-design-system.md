# Plié Design System
## Component Reference
v1.0 — March 2026

*This document is the single source of truth for visual and interaction decisions in Plié. It should be used to audit existing screens and guide new build work. Where the codebase diverges from this document, the document wins unless a deliberate decision has been made to update it.*

*Context: Plié is a ballet training PWA built in vanilla JS. It is designed for dedicated adult ballet dancers. The visual register is quiet, warm, and precise — not sporty, not wellness-app, not productivity. Every design decision defers to the notebook principle: the app provides containers, not instructions.*

---

## 1. Foundations

### Surfaces

Four surface values. Use only these. Do not invent intermediate values.

| Token | Hex | Use |
|---|---|---|
| `--background` | `#FAFAF8` | App ground. The base everything sits on. Never use white as the app background. |
| `--surface` | `#FFFFFF` | Cards and interactive objects that need cognitive chunking. The visual reset. Default card colour. |
| `--surface-warm` | `#FDF8F3` | Tactile moments only: session logger sheet, note blocks, recurring correction rows, Learn knowledge pages, bottom sheets. Not for general cards. |
| `--surface-raised` | `#FAF5EE` | Empty or dormant states within a warm context: artistry empty card, paused goals. |

**Audit check:** Any element using `#FFFFFF` as a background should be a card or interactive object. Any element using white as the page/screen background is wrong — it should be `--background`.

### Colour tokens

Every colour has exactly one job. If you are reaching for a colour and it does not match one of these jobs, do not use it.

| Token | Hex | Job | Never use for |
|---|---|---|---|
| `--gold` | `#C4900C` | Active nav state, category labels on skill cards, highlight star when active, key point dashes in Learn, input focus border | Decoration, headings, backgrounds, general emphasis |
| `--gold-soft` | `#E8D5A8` | Input border at rest | Anything else |
| `--gold-wash` | `#F5EDD6` | Level badge background, goal badge background, soft button fill | Anything else |
| `--coral` | `#A84030` | Correction source label, delete action, alert/error state | Success, general warning, any positive state |
| `--coral-soft` | `#F0D5CF` | Recurring note row background at reduced opacity | Anything else |
| `--sage` | `#4A7038` | Completed goal indicator, ticked progress marker | Any other "done" or positive state |
| `--brown-btn` | `#5A4030` | All primary action buttons and FAB | Secondary buttons, text links, decorative elements |
| `--ink` | `#1A1714` | Primary button fill, primary text, actions | Secondary text, metadata |
| `--ink-2` | `#2D2520` | Body text | Primary text, headings |
| `--ink-3` | `#3D3530` | Secondary body text | Metadata, captions |
| `--ink-4` | `#5C5149` | Tertiary text | Body text |
| `--ink-5` | `#9A8E87` | Metadata, captions, hint text | Body text |
| `--ink-6` | `#C8BFB8` | Disabled states, decorative dots | Any active state |

**Audit check:** Gold (`#C4900C`) appearing anywhere other than the six jobs listed above is a violation. Brown (`#5A4030`) must not appear on secondary buttons, text links, or decorative elements — primary actions and FAB only.

---

## 2. Typography

### Typefaces

| Font | Role | Never use for |
|---|---|---|
| **EB Garamond** | Screen titles (h1), skill names as headings, level persona name, onboarding display text, section headings on Learn knowledge pages. Always italic. | Body text, labels, buttons, captions, metadata. Never below 16px. |
| **DM Sans** | Everything else: body, metadata, labels, buttons, chips, nav, captions | Titles, skill name headings |
| **DM Serif Display** | Retired. Do not use. | Everything |
| **Georgia** | Retired. Do not use. | Everything |
| **Cormorant Garamond** | Retired. Do not use. | Everything |

**Audit check:** Any use of Georgia, DM Serif Display, or Cormorant Garamond is a legacy violation — migrate on contact. Any EB Garamond text below 16px is a violation.

### DM Sans weights

Only two weights permitted: regular (400) and semibold (600). Never 700 (bold). EB Garamond always regular weight (italic is a style, not a weight variant).

**Audit check:** Any `font-weight: 700` or `font-weight: bold` on DM Sans is a violation.

### Type scale

| Token | Size | Use |
|---|---|---|
| `--fs-display` | 36px | EB Garamond italic only. Screen title, onboarding display. |
| `--fs-title` | 24px | EB Garamond italic. Skill name heading, session title, sheet headings. |
| `--fs-heading` | 20px | DM Sans 600. Card title, form label. |
| `--fs-body` | 16px | DM Sans 400. Body text, note content. |
| `--fs-small` | 14px | DM Sans 400. Metadata, hint text. |
| `--fs-caption` | 12px | DM Sans 400. Captions, section labels. |

---

## 3. Spacing

All spacing uses an 8px base unit. Use these tokens — do not use arbitrary pixel values.

| Token | Value | Use |
|---|---|---|
| `--sp-xs` | 4px | Internal chip padding (vertical), tight icon spacing |
| `--sp-sm` | 8px | Label to field, between cards in a list, chip horizontal padding |
| `--sp-md` | 12px | Internal metadata row spacing |
| `--sp-lg` | 16px | Internal card padding (all sides) |
| `--sp-xl` | 24px | Field to field in a form, between distinct sections |
| `--sp-2xl` | 32px | Screen-level top padding |
| `--sp-3xl` | 48px | Bottom of scroll above nav |

**Audit check:** Any hardcoded pixel values that should be spacing tokens are candidates for migration.

---

## 4. Components

### Cards

The default surface for any discrete piece of content.

| Property | Value |
|---|---|
| Background | `--surface` (`#FFFFFF`) |
| Border radius | 8px |
| Border | 0.5px solid rgba(26,23,20,0.10) |
| Padding | `--sp-lg` (16px) all sides |

**Never** use `--surface-warm` as a card background unless the card is a note block or a sheet. The warm surface is reserved for tactile input moments.

**Audit check:** Any card using `#FDF8F3` as its background when it is not a note block or sheet is a violation.

### Note blocks

Note blocks appear inside the session logger and in session detail views. They are a sub-type of card.

| Property | Value |
|---|---|
| Background | `--surface-warm` (`#FDF8F3`) |
| Border radius | 8px |
| Border | 0.5px solid rgba(26,23,20,0.08) — softer than cards because the surface itself provides the distinction |
| Padding | `--sp-lg` (16px) all sides |

**Content area:** contenteditable div with CSS `> div::before { content: "—"; }` live dash prefix. Each line is a `<div>`; the `—` is decorative via CSS, not typed text. No title field. No textarea.

**Header row:** `[★] [topic input] [×]` — star left of topic, × right. Never rearrange.

**Source chips:** Correction · Observation. Two chips, beneath the content area. Both optional, neither required.

**Highlight star states:**

| State | Treatment |
|---|---|
| Unstarred | `--ink-6` (`#C8BFB8`) — present but quiet |
| Starred | `--gold` (`#C4900C`) — clearly marked |

### Free text display

User-entered text (note body, goal body, skill notes) must always be rendered with line breaks preserved and long text truncated.

| Rule | Implementation |
|---|---|
| Line breaks | `nl2br(str)` — escapeHtml then `\n → <br>` |
| Long text | `renderClampedHtml(html, uid)` — wraps in `.text-clamped` (webkit-line-clamp: 4) |
| See more / hide | Shown only when text overflows — measured post-render via `initClampedTexts(root)` |
| Typography | "see more" / "hide": DM Sans 400, `--fs-caption`, `--ink-5` |

**Audit check:** Any user-entered text rendered as a plain string (not via `nl2br`) will collapse all line breaks. Any truncation that shows see more unconditionally regardless of overflow is wrong.

### Buttons

One primary button per screen maximum. If you have two primary buttons on a screen, one of them is wrong — demote it.

**Primary**
| Property | Value |
|---|---|
| Background | `--brown-btn` (`#5A4030`) |
| Text | White, DM Sans 600, `--fs-body` |
| Border radius | 8px |
| Outer border | 1px solid `#7A5848` |
| Inner border | 1px solid rgba(255,255,255,0.10) |
| Label case | Always lowercase |
| Use | Save, confirm, begin. One per screen. |

**Secondary**
| Property | Value |
|---|---|
| Background | Transparent |
| Text | `--ink`, DM Sans 400, `--fs-body` |
| Border radius | 8px |
| Border | 1px solid rgba(26,23,20,0.35) |
| Label case | Always lowercase |
| Use | Discard, edit, cancel. Only appears alongside a primary. |

**Soft**
| Property | Value |
|---|---|
| Background | `--gold-wash` (`#F5EDD6`) |
| Text | `#8A5E0A`, DM Sans 400, `--fs-body` |
| Border radius | 8px |
| Border | None |
| Label case | Always lowercase |
| Use | Low-stakes invitations: view past goals, see all, learn more. |

**Tertiary**
| Property | Value |
|---|---|
| Background | Transparent |
| Text | `--ink-4`, DM Sans 400, `--fs-body` |
| Border | None |
| Label case | Always lowercase |
| Use | Low-stakes destructive actions or secondary contextual actions (e.g. discard, skip). |

**Text link**
| Property | Value |
|---|---|
| Background | None |
| Text | `--gold` for key navigation, `--ink` for neutral |
| Border | None |
| Arrow | Always includes →  |
| Label case | Always lowercase |
| Use | Drill-down, inline links, secondary navigation. |

**Nav text link**
| Property | Value |
|---|---|
| Background | None |
| Text | `--ink-5`, DM Sans 400, `--fs-small` |
| Border | None |
| Use | Quiet screen-level navigation links (e.g. "view all goals →"). Not for actions. |

**Add button (inline)**
| Property | Value |
|---|---|
| Background | Transparent |
| Text | `--ink-4`, DM Sans 400, `--fs-body` |
| Icon | None — text only |
| Border | None |
| Use | Add a block, add a goal — centred inline text, no dashed box border. |

**FAB (Floating Action Button)**
| Property | Value |
|---|---|
| Background | `--brown-btn` (`#5A4030`) |
| Icon | White +, centred |
| Shape | Circle only |
| Outer border | 1px solid `#7A5848` |
| Inner border | 1px solid rgba(255,255,255,0.10) |
| Count | One in the whole app. |

**Audit check:** Any uppercase button label is a violation. Any screen with two primary buttons is a violation. Any add-block or add-goal button that uses a dashed border box is a legacy violation — it should be centred inline text.

### Chips

Used for filters, class type selection, source chips on notes, and goal type tabs.

| State | Background | Text | Border |
|---|---|---|---|
| Default | White | `--ink-3` | 1px solid rgba(26,23,20,0.15) |
| Selected | `--ink` (`#1A1714`) | White | None |

Shape: pill only (fully rounded). No square or slightly-rounded chip variants.

**Class type chips** must use the pill chip treatment. The square-card component used in earlier builds is retired.

**Source chips** (Correction · Observation) follow the same pattern. Two chips, no label above them. Both optional.

**Audit check:** Any chip that is square or only slightly rounded is a legacy violation — migrate on contact.

### Badges

Small pill-shaped labels for counts and level indicators.

| Property | Value |
|---|---|
| Background | `--gold-wash` (`#F5EDD6`) |
| Text | `--gold` (`#C4900C`), DM Sans 600, `--fs-caption` |
| Shape | Pill |
| Use | Level indicator, goal count. Not for status, not for alerts. |

### Input fields

All text inputs use the same treatment. No variation between field types.

| Property | Value |
|---|---|
| Background | `#F9F5F0` |
| Border at rest | 1px solid `--gold-soft` (`#E8D5A8`) |
| Border on focus | 1px solid `--gold` (`#C4900C`) |
| Border radius | 8px |
| Padding | `--sp-lg` horizontal, `--sp-md` vertical |

**Audit check:** Any input with a different border colour on focus is a violation. Any input using a different background is a violation.

### Section labels

Section labels appear above groups of content (e.g. "get started", "recent activity", "corrections in focus").

| Property | Value |
|---|---|
| Font | DM Sans 600 |
| Case | Small-caps or uppercase |
| Colour | `--ink-5` (`#9A8E87`) |
| Treatment | Quiet, never dominant. No border, no background. |
| Spacing above | 24px (`--sp-xl`) |
| Spacing below | 12px (`--sp-md`) |

**Audit check:** Any section label without 24px above and 12px below is a spacing violation.

### Corrections display

Corrections appear on skill detail pages, grouped by session.

| Property | Value |
|---|---|
| Correction text | EB Garamond italic, typographic quotes (&ldquo; &rdquo;) |
| Text colour | `--ink-3` |
| Meta row | Session link + date appear on a single row *below* the correction text, not above or alongside |
| Meta font | DM Sans 400, `--fs-caption`, `--ink-5` |
| Grouping | Grouped by session; session date as group header |

**Audit check:** Any correction text that is not italic or not wrapped in typographic quotes is a violation. Any correction where the date appears above or beside the text (not below in a meta row) is a violation.

### Recurring row

A specific treatment for recurring corrections/skills in lists.

| Property | Value |
|---|---|
| Background | `#FDF0EE` |
| Indicator | Three dots in `--ink-6` (`#C8BFB8`) |
| Label | "recurring" as plain metadata text, `--fs-small`, `--ink-5` |
| Badge | None — no separate badge for recurring state |

### Highlight star

The star toggle on note blocks.

| State | Colour |
|---|---|
| Unstarred | `--ink-6` (`#C8BFB8`) outline star |
| Starred | `--gold` (`#C4900C`) filled star |

No label. The star is universally understood as significance.

---

## 5. Navigation

### Bottom nav

Four tabs: The Barre · Goals · Learn · Profile.

The Assess tab has been removed. If it appears in the codebase it should be deleted.

| Property | Value |
|---|---|
| Active tab indicator | `--gold` (`#C4900C`) |
| Inactive tab | `--ink-5` |
| Tab labels | DM Sans 400, `--fs-caption`, always lowercase |

**Audit check:** Any five-tab navigation including Assess is a legacy violation.

### FAB menu

Opens on FAB tap. Three options:
- Log a session
- Add a note
- Set a goal

"Note a reflection" is old vocabulary — remove. "Record corrections, praise, notes" is old vocabulary — remove.

### Sheet and overlay headings

All sheet and overlay headings (Log a class, What are you working toward?, Timeline, Add a note, Edit note, Skills in focus) use `--fs-title` (24px EB Garamond). Never use `--fs-display` (36px) inside a sheet.

**Audit check:** Any sheet heading using `--fs-display` or `--fs-h1` is a violation — sheets use `--fs-title`.

### Interactive elements inside bottom sheets

Buttons inside `.session-overlay` sheets must use `onmousedown` (not `onclick`) to ensure reliable response on iOS Safari. For tap targets that must also respond to touch, add `ontouchend="event.preventDefault(); handler()"` alongside `onmousedown`. Tab strips and chip selectors in sheets always follow this pattern.

### Section header layout

Every screen section that uses `.barre-section-header` already carries `padding: 0 var(--sp-lg)` internally. Never wrap a `.barre-section-header` in an additional padding div — this double-indents the label.

The structure is always:
```
<div class="barre-section-header">
    <span class="barre-section-label">label text</span>
    <button class="barre-see-all-btn" ...>see all →</button>
</div>
<div style="padding: 0 var(--sp-lg); ...">
    <!-- content -->
</div>
```

"see all →" buttons in section headers always use the `.barre-see-all-btn` class — no inline styles.

**Audit check:** Any `.barre-section-header` inside a wrapping div that also sets `padding: 0 var(--sp-lg)` is double-indented and wrong.

---

## 6. Swipe Pattern

Swipe to act applies to these elements only:
- Skill cards on The Barre
- Goal cards
- The hero prompt card
- Note blocks in the logger

Swipe does NOT apply to timeline entries — the timeline is a permanent read-only record.

Swipe labels are never shown on cards. The behaviour is the affordance.

---

## 7. Copy Rules

These apply to all UI copy throughout the app. They are not stylistic preferences — they are decisions.

| Rule | Detail |
|---|---|
| **No em dashes** | In UI copy. Use a comma or rewrite the sentence. |
| **No keyboard shortcuts** | Remove "Enter to add", "Shift+Enter for new line" and all similar hints everywhere. |
| **No AI commentary** | The app surfaces facts, never interprets them. "1 correction logged today" not "Keep the record going." |
| **No explaining features** | If the label already says what it does, body copy beneath it is redundant. Cut it. |
| **No editorialising on completion** | No "You've logged your first session!" No "This is a strong foundation to build on." The app does not congratulate or interpret. |
| **British English** | Throughout. Practise not practice (verb). Colour not color. |
| **Buttons always lowercase** | save session, log now, begin. Never Save Session. |
| **Placeholder text** | Always specific, never generic. Cycles through three options per field varying in type not just content. |
| **Hint text** | Active framing. Not "enter your correction here" but something that shows what good looks like. |

**Audit check:** Any exclamation mark in UI copy (outside of user-generated content) is almost certainly a violation. Any em dash in UI copy is a violation. Any capitalised button label is a violation.

---

## 8. Legacy Aliases

The codebase contains legacy CSS aliases that predate the current token system. These include:

`--text`, `--text-secondary`, `--text-muted`, shadow aliases, radius aliases.

**Rule:** Never write new CSS using legacy aliases. When you touch a component for any reason, migrate any legacy aliases on that component to the current token set. Migrate on contact, not in a big batch.

**Audit check:** Any new CSS written after March 2026 that uses `--text`, `--text-secondary`, or `--text-muted` is a violation.

---

## 9. The Barre Screen — Confirmed Decisions

Documented here because The Barre is the primary daily-use screen and has the most specific component decisions.

| Element | Decision |
|---|---|
| **Context strip** | Removed. Level badge moves to top right of screen header. |
| **Screen title** | "The Barre" in Georgia `--fs-display`. |
| **Hero card** | Named session title leads in Georgia. Class type and day in eyebrow (`--fs-small`, `--ink-5`). "Did you go today?" as the primary question. Primary button: log now. Text link: don't remind me again. Swipe to dismiss temporarily. |
| **Hero — no saved session** | Class type as title, day in eyebrow. |
| **Hero — no recurring sessions** | Generic "log your session" prompt. |
| **Hero — resting state** | "Taking a break" / "Anything worth noting while you're away?" / log now → |
| **Hero — recovering state** | "Focusing on recuperating" / "You can still log anything useful, physio notes, what you can work on, things to remember." / log now → |
| **Hero — predictive state** | Surfaces when today matches a saved session template day and the user hasn't logged yet. Swipe left or right to dismiss until tomorrow (`dismissPredictiveHero()`, suppressed via `predictiveHeroSuppressed` localStorage key). |
| **Hero copy rules** | No motivational copy. No interpretation of absence ("you haven't logged in X days"). App does not comment on the user's behaviour. |
| **Skills section label** | "corrections in focus" in small-caps muted (`--ink-5`) with skill count on the right. |
| **Skill cards** | EB Garamond italic for skill name (`--fs-title`). Most recent correction in italic EB Garamond with typographic quotes (" "). Category label in `--gold` small-caps top right. Date metadata bottom left (`--fs-small`, `--ink-5`). "view →" text link bottom right. |
| **Recurring skill cards** | `#FDF0EE` background. Three dots plus "recurring" as metadata. No badge. |
| **Section separator** | 0.5px solid rgba(26,23,20,0.08) between skills section and recent activity. |
| **"Skills in focus" heading** | Removed. Cards are self-evident. |
| **Getting started cards** | Section label: "get started" small-caps muted. Horizontal carousel, two visible at a time. Cards complete automatically — no manual tick. Completed state: title greyed out, tick only, no copy. Section persists until all complete. |
| **App start screen** | Always lands on The Barre. Never Profile. |

---

## 10. Goals Screen — Confirmed Decisions

| Element | Decision |
|---|---|
| **Primary action** | At the top of the Goals tab, not the bottom. FAB also opens goal creation. |
| **Goal creation** | Opens as a full sheet. |
| **Gate question** | Three tabs at top of sheet: A skill / A feeling or state / A habit. Tabs, not pills. |
| **All fields visible** | No progressive disclosure. |
| **Field persistence** | Title and commitment period persist on tab switch. "What you're working toward" persists if field exists in new type. Type-specific fields do not persist. |
| **Commitment period presets** | A week / Two weeks / A month / Three months / Choose a date. Duration-based, not calendar-position. |
| **Progress markers** | Unnamed. Same interaction as existing milestone UI. Cycling placeholder text. Skill goals only. |
| **Discard** | "discard goal?" with discard / keep editing. No heavy modal. |
| **Save** | Sheet closes. New card at top of active goals. No fanfare. |
| **Goals tab** | Active goals only. "view past goals →" quiet link at bottom. |
| **Completed goal copy** | Replaced with her reflection note or no copy. App does not write its own interpretation. |
| **Date tag** | Visually distinct from skill tags. Shows commitment period, not a hard date. |
| **Goal type tag** | DM Sans 600, `--ink-3`. No italic, no warm background, no border. Type copy: "Skill", "Feeling / state", "Habit". |
| **Goal cadence tag** | DM Sans 400, `--ink-5`, rgba(26,23,20,0.10) border, transparent background. Shows the how-often commitment (e.g. "every session"). |
| **Expiry footer** | Footer row shows calculated expiry date. When ≤3 days remaining, highlight with `--coral` treatment. Date shown as "Until [date]". |
| **Edit button touch target** | Minimum 44px × 44px — achieved via negative margin padding, not visual size increase. |

---

## 11. Session Logger — Confirmed Decisions

| Element | Decision |
|---|---|
| **FAB menu options** | Log a session / Add a note / Set a goal. No "Note a reflection". |
| **Note block** | Single free text field. Source chips (Correction / Observation). Highlight star. No Correction/Praise/Reflection tabs. |
| **Quick note mode** | Single contenteditable field (not a block list). First line is bold and acts as the note title. No date shown in the logger — date is set at save. |
| **Note detail view** | Notes open as their own page (not a sheet). Page title: "Note". Body uses learn-page text styling. |
| **Timeline — note entries** | type='note' entry shows first-line text as the title. Tap to review → opens note detail. |
| **Keyboard shortcuts** | Remove everywhere. No "Enter to add" or similar. |
| **Post-save prompt** | "Session saved. You noted [skill], set a goal around it?" with set a goal / not now. |
| **Post-save completion state** | Tick only on getting started cards. No "You've logged your first session!" |
| **Class type chips** | Pill chips. Square-card component retired. |

---

## 12. What Does Not Exist in This Design System

These patterns have been explicitly retired or decided against. If they appear in the codebase they should be removed.

| Pattern | Status |
|---|---|
| Cormorant Garamond | Retired. Replace with EB Garamond. |
| Georgia | Retired (replaced by EB Garamond, T34). Replace with EB Garamond. |
| DM Serif Display | Retired (replaced by EB Garamond, T34). Replace with EB Garamond. |
| Correction / Praise / Reflection tabs inside note blocks | Replaced by source chips + free text. |
| Square class type chip cards | Replaced by pill chips. |
| Assess tab in navigation | Removed. Four tabs only. |
| "Skills in focus" section heading on The Barre | Removed. |
| Context strip on The Barre | Removed. Level badge in header instead. |
| Placement quiz / assessment language | Replaced by orientation conversation. |
| "Note a reflection" in FAB menu | Removed. |
| App-generated goal copy ("Based on what you told us") | Removed. App does not editorialize. |
| Dashed-border add button | Removed. Inline centred text only, no box. |
| Motivational hero copy | Removed. No "Keep at it." No comment on absence or streaks. |
| Completion congratulations ("You've logged your first session!") | Removed. |
| Em dashes in UI copy | Not permitted. |
| Keyboard shortcut hints | Removed everywhere. |
| Bold (700) weight in DM Sans | Not permitted. |
| White as app background | Not permitted. Use `--background`. |
