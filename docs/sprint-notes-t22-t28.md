# Plié Sprint Notes — T22–T28
v1.0 — March 2026

*Design system audit sprint. Branch: `fix/design-system-audit`. All changes unstaged/uncommitted as of end of session.*

---

## Tickets completed

### T22 — Logger note block cleanup
- Title field removed from note blocks
- Star button moved to LEFT of topic input: `[★] [topic input] [×]`
- `session-block-textarea` replaced with `.block-bullet-entry` contenteditable div
- `updateBlockBullets(blockId, el)` reads div children and joins as `\n`-separated text, calls `checkBlockTitleForSkills`
- Skill suggestion chips insert before the bullet entry (not after title)

### T23 — Notes persistence fix
- ALL block text lines go to `corrections[]` regardless of source chip selection
- Only correction-source lines increment `correctionCount`
- Skill-linked observation blocks also push to `skillNotes` (with `sessionId`)
- SessionSkill created for any block with content (not just skill-linked); `skillId: null` for general blocks
- `isHighlight` saved on sessionSkill
- Edit flow: `appState.skillNotes` filtered for current `session.id` before re-save to prevent duplicates
- All three stores saved atomically after the block loop (not mid-loop)

### T24 — Text formatting
- `nl2br(str)` — escapeHtml then `\n → <br>` for all user-entered text
- `renderClampedHtml(html, uid)` — wraps in `.text-clamped` + see more / hide buttons
- `initClampedTexts(root)` — post-render, shows see more only when `scrollHeight > clientHeight + 2`
- Applied to: session detail note blocks, skill notes (all three render locations), goal body in card and all-goals view
- `initClampedTexts` called in: `renderGoalsScreen`, `showSkillDetail` (rAF), `renderSkillNotesSectionInPlace`, `expandSkillNotes`

### T25 — Milestone tap fix
- `onclick` → `onmousedown` + `ontouchend="event.preventDefault(); toggleMilestone(...)"` on `.goal-milestone` div

### T26 — Highlights section on skill detail
- `buildSkillHighlightsHtml(skillId)` — collects highlighted sessionSkills + skillNotes, renders with gold border + star toggle
- `toggleSkillHighlightItem(type, id, skillId)` — toggles isHighlight, re-renders section in place
- `renderSkillHighlightsSectionInPlace(skillId, sectionEl)` — replaces section without full re-render
- Section absent if no highlights exist
- Timeline session entries show gold `★` in subtitle when any sessionSkill for that session has `isHighlight`

### T27 — Recurring correction detection
- Runs post-save for each skill touched in the session
- ≥3 corrections for same skillId across ≥2 distinct sessionIds within 60 days → `isRecurring = true` on all corrections for that skill
- Fewer than 3 or fewer than 2 sessions → `isRecurring = false` (clears it)
- Affects `.active-skill-recurring` visual on Barre cards

### T28 — Barre filter fix
- Added All / Recurring filter tabs above `#active-skills-list` using existing `.skill-corr-filter` class + new `.barre-focus-filter`
- `filterBarreSkills(filter, btn)` — filters displaySkills by `isRecurring`, re-renders list, re-attaches swipes
- Empty state shown when Recurring selected and no in-focus skills qualify
- `renderActiveSkillsList(skills)` and `attachBarreFocusSwipes()` extracted from `showBarreScreen` for reuse

### Alignment fix
- `.barre-section-header` for "recent activity" was double-padded (inside a padding div)
- Fixed by lifting the header out of the padding wrapper; content div below it carries its own padding

---

## Conventions established

- `onmousedown` not `onclick` for overlay buttons (iOS Safari)
- `ontouchend="event.preventDefault(); handler()"` alongside `onmousedown` for tap targets
- `.barre-section-header` has `padding: 0 var(--sp-lg)` built in — never wrap it in another padding div
- "see all →" buttons in barre headers use `.barre-see-all-btn` class, not inline styles
- User-entered text: always `nl2br()` for line breaks; `renderClampedHtml` for truncation; `initClampedTexts(root)` post-render
- All stores (corrections, sessionSkills, skillNotes) saved atomically after loop — never mid-loop

---

## Architecture notes

- `appState.skills` — `skill.flagged` = in focus (persisted via `persistSkillState()`)
- `appState._goalDraft` — goal creator state; `_snapshot` for edit comparison
- Goal statuses: `active | completed | paused | letgo`
- `focusedSkills = appState.skills.filter(s => s.flagged)` — drives corrections in focus
- `computeFocusNudge()` — after-session passive prompt logic (throttled per pair per 7 days)
- SessionSkill created for ALL blocks with content; `skillId: null` for general blocks
- Corrections always go to `correctionIds` on sessionSkill; observation blocks ALSO push to `skillNotes`
- `isRecurring` set by post-save detection loop; affects `.active-skill-recurring` visual on Barre cards
