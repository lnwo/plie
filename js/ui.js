

/* ═══════════════════════════════════════════════════════════════
   6. UI RENDERING — Screen Builders
   Functions that create/populate each main screen.
   ═══════════════════════════════════════════════════════════════ */

function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Escape HTML and convert newlines to <br> for displaying user-entered free text.
function nl2br(str) {
    if (str == null) return '';
    return escapeHtml(str).replace(/\n/g, '<br>');
}

// Render a truncatable text block with see more / hide toggle.
// `html` should already be HTML-safe (e.g. produced by nl2br).
// `uid` must be unique across the page at render time.
function renderClampedHtml(html, uid) {
    return `<div class="text-clamped" id="tc-${uid}">${html}</div>` +
           `<button class="note-block-see-more" id="tcm-${uid}" onclick="expandClamped('${uid}')" style="display:none">see more</button>` +
           `<button class="note-block-see-more" id="tch-${uid}" onclick="collapseClamped('${uid}')" style="display:none">hide</button>`;
}

function expandClamped(uid) {
    const el = document.getElementById('tc-' + uid);
    if (el) el.classList.add('expanded');
    const m = document.getElementById('tcm-' + uid);
    const h = document.getElementById('tch-' + uid);
    if (m) m.style.display = 'none';
    if (h) h.style.display = '';
}

function collapseClamped(uid) {
    const el = document.getElementById('tc-' + uid);
    if (el) el.classList.remove('expanded');
    const m = document.getElementById('tcm-' + uid);
    const h = document.getElementById('tch-' + uid);
    if (m) m.style.display = '';
    if (h) h.style.display = 'none';
}

// After rendering, measure each .text-clamped element and show the
// see-more button only if the text actually overflows 4 lines.
function initClampedTexts(root) {
    (root || document).querySelectorAll('.text-clamped').forEach(el => {
        const uid = el.id.slice(3); // strip 'tc-' prefix
        const moreBtn = document.getElementById('tcm-' + uid);
        if (!moreBtn) return;
        if (el.scrollHeight > el.clientHeight + 2) {
            moreBtn.style.display = '';
        }
    });
}

/* ═══════════════════════════════════════════════════════════════
   SESSION LOGGER
   Stage 2: Full overlay with class type carousel, day picker,
   and notes/corrections blocks.
   ═══════════════════════════════════════════════════════════════ */

// Primary carousel chips — always visible
const CLASS_TYPES_PRIMARY = [
    { id: 'technique',    label: 'Technique class', sub: 'Weekly/regular class' },
    { id: 'private',      label: 'Private lesson',  sub: 'One-to-one' },
    { id: 'open',         label: 'Open class',       sub: 'Drop-in' },
];

// Secondary — revealed via "More…" dropdown
const CLASS_TYPES_SECONDARY = [
    { id: 'company',      label: 'Company class',  sub: 'Professional company training' },
    { id: 'masterclass',  label: 'Masterclass',    sub: 'Intensive with a guest teacher' },
    { id: 'workshop',     label: 'Workshop',       sub: 'Focused skill or theme session' },
    { id: 'rehearsal',    label: 'Rehearsal',      sub: 'Preparing for a performance' },
    { id: 'retreat',      label: 'Ballet retreat', sub: 'Immersive multi-day programme' },
    { id: 'conditioning', label: 'Conditioning',   sub: 'Pilates, floor barre, cross-training' },
];

const ALL_CLASS_TYPES = [...CLASS_TYPES_PRIMARY, ...CLASS_TYPES_SECONDARY];

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Block topic options — General categories + all skills (keyed by slug)
function getBlockTopics() {
    const categories = [
        { id: 'general',   label: 'General',   group: 'General'  },
        { id: 'technique', label: 'Technique', group: 'Category' },
        { id: 'movement',  label: 'Movement',  group: 'Category' },
        { id: 'artistry',  label: 'Artistry',  group: 'Category' },
        { id: 'the-body',  label: 'The Body',  group: 'Category' },
        { id: 'pointe',    label: 'Pointe',    group: 'Category' },
    ];
    const skills = appState.skills.map(s => ({
        id:    'skill:' + s.id,
        label: s.french,
        sub:   s.english,
        group: 'Skills',
    }));
    return [...categories, ...skills];
}

// ── Skill Picker — shared dropdown component ─────────────────────────────
// renderSkillPickerDropdown: fills a dropdown element.
// All three picker callsites (block topic, inline goal, goal creator) use this.
// Future callsites: PLI-010 correction reuse, PLI-012 choreography, PLI-005 conditions.
//
// topicId format (unchanged for backward compat):
//   'skill:{id}'   — specific skill   (e.g. 'skill:pirouette')
//   'general'      — no skill / general block
//   dimension id   — only via includeDimensions:true (goal picker)
//
// opts: {
//   includeGeneral:    bool   — show "General" at top (block topic, goal creator)
//   includeDimensions: bool   — show dimensions section (goal picker only)
//   hidePointe:        bool   — omit pointe skills (default: appState.hidePointe)
//   currentTopicId:    string — highlight current selection
// }

let _skillPickerOnSelect = null;
let _pickerHighlightIdx  = -1;

function _onSkillPickerSelect(topicId, label) {
    if (_skillPickerOnSelect) _skillPickerOnSelect(topicId, label);
}

function _pickerSetHighlight(options, idx) {
    _pickerHighlightIdx = idx;
    options.forEach((o, i) => o.classList.toggle('skill-picker-option--highlighted', i === idx));
    if (idx >= 0) options[idx]?.scrollIntoView({ block: 'nearest' });
}

function renderSkillPickerDropdown(dropdownEl, query, onSelect, opts = {}) {
    if (!dropdownEl) return;
    _skillPickerOnSelect = onSelect;

    const norm       = normaliseStr(query || '');
    const hidePointe = opts.hidePointe ?? !!appState.hidePointe;
    const currentId  = opts.currentTopicId || null;

    const skills = (appState.skills || DATA.skills || []).filter(s =>
        !(hidePointe && s.dimensionIds?.includes('pointe'))
    );

    _pickerHighlightIdx = -1;  // reset keyboard highlight on every re-render
    let html = '';

    if (!norm) {
        // ── Unfiltered: General option, skills by category, then custom skills ──
        if (opts.includeGeneral) {
            const sel = currentId === 'general' ? ' skill-picker-option--current' : '';
            html += `<div class="skill-picker-option${sel}" data-topic-id="general" data-label="General" onmousedown="_onSkillPickerSelect('general','General')"><span class="skill-picker-option-label">General</span></div>`;
        }

        const categoryOrder = ['barre','centre','turns','allegro','artistry','body-and-technique'];
        categoryOrder.forEach(catId => {
            const catSkills = skills.filter(s => s.categoryId === catId);
            if (!catSkills.length) return;
            html += `<div class="skill-picker-group">${DATA.categoryNames[catId] || catId}</div>`;
            catSkills.forEach(s => {
                const sel = currentId === 'skill:' + s.id ? ' skill-picker-option--current' : '';
                html += `<div class="skill-picker-option${sel}" data-topic-id="skill:${s.id}" data-label="${escapeHtml(s.french)}" onmousedown="_onSkillPickerSelect('skill:${s.id}',${JSON.stringify(s.french)})"><span class="skill-picker-option-label">${escapeHtml(s.french)}</span><span class="skill-picker-option-sub">${escapeHtml(s.english)}</span></div>`;
            });
        });

        if (opts.includeDimensions) {
            const dims = [
                { id: 'technique', label: 'Technique' },
                { id: 'movement',  label: 'Movement'  },
                { id: 'artistry',  label: 'Artistry'  },
                { id: 'the-body',  label: 'The Body'  },
                ...(hidePointe ? [] : [{ id: 'pointe', label: 'Pointe' }]),
            ];
            if (dims.length) {
                html += `<div class="skill-picker-group">Dimensions</div>`;
                dims.forEach(d => {
                    const sel = currentId === d.id ? ' skill-picker-option--current' : '';
                    html += `<div class="skill-picker-option${sel}" data-topic-id="${d.id}" data-label="${d.label}" onmousedown="_onSkillPickerSelect('${d.id}','${d.label}')"><span class="skill-picker-option-label">${d.label}</span></div>`;
                });
            }
        }

        if (opts.includeCustomSkills && appState.customSkills?.length) {
            html += `<div class="skill-picker-group">Your skills</div>`;
            appState.customSkills.forEach(c => {
                const sel = currentId === 'custom:' + c.id ? ' skill-picker-option--current' : '';
                html += `<div class="skill-picker-option${sel}" data-topic-id="custom:${c.id}" data-label="${escapeHtml(c.name)}" onmousedown="_onSkillPickerSelect('custom:${c.id}',${JSON.stringify(c.name)})"><span class="skill-picker-option-label">${escapeHtml(c.name)}</span></div>`;
            });
        }
    } else {
        // ── Filtered: ranked flat list ──
        const ranked = _rankSkillPickerMatches(skills, norm);
        const customMatches = opts.includeCustomSkills
            ? (appState.customSkills || []).filter(c => normaliseStr(c.name).includes(norm))
            : [];

        if (!ranked.length && !customMatches.length && !opts.includeDimensions) {
            html += `<div class="skill-picker-empty">No skills match</div>`;
        } else {
            ranked.forEach(s => {
                const sel = currentId === 'skill:' + s.id ? ' skill-picker-option--current' : '';
                html += `<div class="skill-picker-option${sel}" data-topic-id="skill:${s.id}" data-label="${escapeHtml(s.french)}" onmousedown="_onSkillPickerSelect('skill:${s.id}',${JSON.stringify(s.french)})"><span class="skill-picker-option-label">${escapeHtml(s.french)}</span><span class="skill-picker-option-sub">${escapeHtml(s.english)}</span></div>`;
            });

            customMatches.forEach(c => {
                const sel = currentId === 'custom:' + c.id ? ' skill-picker-option--current' : '';
                html += `<div class="skill-picker-option${sel}" data-topic-id="custom:${c.id}" data-label="${escapeHtml(c.name)}" onmousedown="_onSkillPickerSelect('custom:${c.id}',${JSON.stringify(c.name)})"><span class="skill-picker-option-label">${escapeHtml(c.name)}</span><span class="skill-picker-option-sub">your skill</span></div>`;
            });

            if (opts.includeDimensions) {
                const dims = [
                    { id: 'technique', label: 'Technique' },
                    { id: 'movement',  label: 'Movement'  },
                    { id: 'artistry',  label: 'Artistry'  },
                    { id: 'the-body',  label: 'The Body'  },
                    ...(hidePointe ? [] : [{ id: 'pointe', label: 'Pointe' }]),
                ].filter(d => normaliseStr(d.label).includes(norm));
                dims.forEach(d => {
                    const sel = currentId === d.id ? ' skill-picker-option--current' : '';
                    html += `<div class="skill-picker-option${sel}" data-topic-id="${d.id}" data-label="${d.label}" onmousedown="_onSkillPickerSelect('${d.id}','${d.label}')"><span class="skill-picker-option-label">${d.label}</span></div>`;
                });
                if (!ranked.length && !customMatches.length && !dims.length) {
                    html = `<div class="skill-picker-empty">No skills match</div>`;
                }
            }
        }
    }

    if (!html) { dropdownEl.style.display = 'none'; return; }
    dropdownEl.innerHTML = html;
    dropdownEl.style.display = 'block';

    // iOS tap fix: touchend on the container fires the option's onmousedown immediately,
    // bypassing the 300ms click delay and the blur/focus sequencing that kills selection.
    dropdownEl.ontouchend = function(e) {
        const option = e.target.closest('.skill-picker-option');
        if (option?.onmousedown) { e.preventDefault(); option.onmousedown(e); }
    };
}

function _rankSkillPickerMatches(skills, norm) {
    return skills
        .map(s => {
            const fr = normaliseStr(s.french);
            const en = normaliseStr(s.english);
            const al = (s.aliases || []).map(a => normaliseStr(a));
            let score = 0;
            if (fr === norm)                            score = 100;
            else if (fr.startsWith(norm))               score = 80;
            else if (fr.includes(norm))                 score = 60;
            else if (en === norm)                       score = 50;
            else if (en.startsWith(norm))               score = 40;
            else if (en.includes(norm))                 score = 30;
            else if (al.some(a => a === norm))          score = 25;
            else if (al.some(a => a.startsWith(norm)))  score = 20;
            else if (al.some(a => a.includes(norm)))    score = 10;
            return { s, score };
        })
        .filter(r => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(r => r.s);
}

// ── Skill Slot Field — two-slot primary / secondary skill component ───────
// Used by all non-goal session blocks. Primary maps to block.topicId,
// secondary to block.secondaryTopicId. Both use the 'skill:id' | 'custom:id'
// format. _slotEditing tracks which slot (if any) is in input mode.
//
// Data rules (per spec):
//   - Recurring detection runs on primary skill only.
//   - Secondary surfaces corrections under that skill's record.
//   - User-typed entries saved to appState.customSkills / 'plie:customSkills'.
//   - Deleting a custom skill entry does not affect past corrections.

function _slotLabel(topicId) {
    if (!topicId || topicId === 'general') return '';
    if (topicId.startsWith('skill:')) {
        const sk = DATA.skills.find(s => s.id === topicId.replace('skill:', ''));
        return sk?.french || topicId.replace('skill:', '');
    }
    if (topicId.startsWith('custom:')) {
        const c = (appState.customSkills || []).find(c => c.id === topicId.replace('custom:', ''));
        return c?.name || '';
    }
    return topicId;
}

function renderSkillSlotHtml(block) {
    const bid           = block.id;
    const primaryId     = (block.topicId && block.topicId !== 'general') ? block.topicId : null;
    const secondaryId   = block.secondaryTopicId || null;
    const editingSlot   = block._slotEditing;

    const primaryLabel   = _slotLabel(primaryId);
    const secondaryLabel = _slotLabel(secondaryId);

    // Primary area
    let primaryHtml;
    if (!primaryId || editingSlot === 'primary') {
        primaryHtml = `<input class="skill-slot-input skill-slot-input--primary"
                              type="text"
                              autocomplete="off"
                              spellcheck="false"
                              placeholder="Primary skill…"
                              value="${escapeHtml(editingSlot === 'primary' ? primaryLabel : '')}"
                              id="skill-slot-primary-input-${bid}"
                              oninput="filterSkillSlot('${bid}','primary',this.value)"
                              onkeydown="handleSkillSlotKey(event,'${bid}','primary')"
                              onblur="closeSkillSlot('${bid}','primary')"
                              onfocus="filterSkillSlot('${bid}','primary',this.value)" />`;
    } else {
        primaryHtml = `<span class="skill-slot-token skill-slot-token--primary"
                             onmousedown="editSkillSlot('${bid}','primary')"
                             ontouchend="event.preventDefault();editSkillSlot('${bid}','primary')">${escapeHtml(primaryLabel)}</span>`;
    }

    // Secondary area — only shown when primary is present
    let secondaryHtml = '';
    if (primaryId || editingSlot === 'primary') {
        const sep = `<span class="skill-slot-sep">, </span>`;
        if (!secondaryId || editingSlot === 'secondary') {
            secondaryHtml = sep + `<input class="skill-slot-input skill-slot-input--secondary"
                                          type="text"
                                          autocomplete="off"
                                          spellcheck="false"
                                          placeholder="secondary (optional)…"
                                          value="${escapeHtml(editingSlot === 'secondary' ? secondaryLabel : '')}"
                                          id="skill-slot-secondary-input-${bid}"
                                          oninput="filterSkillSlot('${bid}','secondary',this.value)"
                                          onkeydown="handleSkillSlotKey(event,'${bid}','secondary')"
                                          onblur="closeSkillSlot('${bid}','secondary')"
                                          onfocus="filterSkillSlot('${bid}','secondary',this.value)" />`;
        } else {
            secondaryHtml = sep + `<span class="skill-slot-token skill-slot-token--secondary"
                                         onmousedown="editSkillSlot('${bid}','secondary')"
                                         ontouchend="event.preventDefault();editSkillSlot('${bid}','secondary')">${escapeHtml(secondaryLabel)}</span>`;
        }
    }

    // Border state: gold when any input is active, neutral when both tokens filled
    const bothFilled  = primaryId && !editingSlot && secondaryId;
    const fieldCls    = 'skill-slot-field' + (bothFilled ? ' skill-slot-field--filled' : '');

    return `<div class="${fieldCls}" id="skill-slot-${bid}">
        <div class="skill-slot-row">${primaryHtml}${secondaryHtml}</div>
        <div class="block-topic-dropdown" id="skill-slot-dropdown-${bid}" style="display:none;"></div>
    </div>`;
}

function renderCorrectionReuseSection(block) {
    if (block.blockType !== 'correction') return '';
    if (!block.topicId?.startsWith('skill:')) return '';
    if (block._corrSectionDismissed) return '';
    const skillId = block.topicId.replace('skill:', '');
    const recurringForSkill = (appState.corrections || []).filter(
        c => c.skillId === skillId && c.isRecurring
    );
    if (!recurringForSkill.length) return '';

    // Sort by newest first, dedupe by first 30 normalised chars, take 3
    const sorted = [...recurringForSkill].sort((a, b) => b.createdAt - a.createdAt);
    const seen = new Set();
    const deduped = [];
    for (const c of sorted) {
        const key = normaliseStr(c.text).slice(0, 30);
        if (!seen.has(key)) { seen.add(key); deduped.push(c); }
        if (deduped.length === 3) break;
    }
    if (!deduped.length) return '';

    const bid = block.id;
    const itemsHtml = deduped.map(c => `
        <li class="corr-reuse-item" data-correction-id="${c.id}"
            onmousedown="toggleCorrReuseItem(this,'${bid}','${c.id}')"
            ontouchend="event.preventDefault();toggleCorrReuseItem(this,'${bid}','${c.id}')">
            <span class="corr-reuse-item-text">${escapeHtml(c.text)}</span>
            <div class="corr-reuse-expand">
                <span class="corr-reuse-action"
                      id="corr-reuse-action-${c.id}"
                      onmousedown="event.stopPropagation();useCorrReuse('${bid}','${c.id}')"
                      ontouchend="event.stopPropagation();event.preventDefault();useCorrReuse('${bid}','${c.id}')">use this correction →</span>
            </div>
        </li>`).join('');

    return `<div class="corr-reuse-section" id="corr-reuse-section-${bid}">
        <div class="corr-reuse-header">
            <span class="corr-reuse-label">previous corrections</span>
            <button class="corr-reuse-dismiss"
                    onmousedown="dismissCorrReuseSection('${bid}')"
                    ontouchend="event.preventDefault();dismissCorrReuseSection('${bid}')">×</button>
        </div>
        <ul class="corr-reuse-list">${itemsHtml}</ul>
    </div>`;
}

function toggleCorrReuseItem(el, blockId, correctionId) {
    const section = document.getElementById('corr-reuse-section-' + blockId);
    if (!section) return;
    section.querySelectorAll('.corr-reuse-item.open').forEach(item => {
        if (item !== el) {
            item.classList.remove('open');
            item.querySelector('.corr-reuse-expand')?.classList.remove('open');
        }
    });
    const expand = el.querySelector('.corr-reuse-expand');
    const isOpen = el.classList.contains('open');
    el.classList.toggle('open', !isOpen);
    if (expand) expand.classList.toggle('open', !isOpen);
}

function useCorrReuse(blockId, correctionId) {
    const block = getBlockById(blockId);
    const correction = (appState.corrections || []).find(c => c.id === correctionId);
    if (!block || !correction) return;
    const entry = document.querySelector(`#block-${blockId} .block-bullet-entry`);
    if (!entry) return;

    block._derivedFromCorrectionId = correctionId;
    block._corrSectionDismissed    = true;

    const existing = (entry.innerText || '').replace(/\n+$/, '').trim();
    if (existing) {
        // Append as a new <div> line — matches how the contenteditable structures bullets
        const newLine = document.createElement('div');
        newLine.textContent = correction.text;
        entry.appendChild(newLine);
    } else {
        entry.textContent = correction.text;
    }
    // Sync block.text so saveSession reads the updated value on save
    block.text = (entry.innerText || '').replace(/\n+$/, '');

    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(entry);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
    entry.focus();
    document.getElementById('corr-reuse-section-' + blockId)?.remove();
}

function dismissCorrReuseSection(blockId) {
    const block = getBlockById(blockId);
    if (block) block._corrSectionDismissed = true;
    document.getElementById('corr-reuse-section-' + blockId)?.remove();
}

function renderSkillSlotInPlace(blockId, focusSlot) {
    const block  = getBlockById(blockId);
    const oldEl  = document.getElementById(`skill-slot-${blockId}`);
    if (!block || !oldEl) return;
    oldEl.outerHTML = renderSkillSlotHtml(block);
    if (focusSlot) {
        requestAnimationFrame(() =>
            document.getElementById(`skill-slot-${focusSlot}-input-${blockId}`)?.focus()
        );
    }
}

function editSkillSlot(blockId, slot) {
    const block = getBlockById(blockId);
    if (!block) return;
    block._slotEditing = slot;
    renderSkillSlotInPlace(blockId, slot);
    // Open dropdown immediately showing current query
    requestAnimationFrame(() => {
        const input = document.getElementById(`skill-slot-${slot}-input-${blockId}`);
        if (input) filterSkillSlot(blockId, slot, input.value);
    });
}

function filterSkillSlot(blockId, slot, query) {
    const block      = getBlockById(blockId);
    const dropdownEl = document.getElementById(`skill-slot-dropdown-${blockId}`);
    if (!block || !dropdownEl) return;
    const currentId = slot === 'primary' ? block.topicId : block.secondaryTopicId;
    renderSkillPickerDropdown(dropdownEl, query, (topicId, label) => {
        confirmSkillSlot(blockId, slot, topicId, label);
    }, { includeCustomSkills: true, currentTopicId: currentId });
}

function handleSkillSlotKey(event, blockId, slot) {
    const dropdown = document.getElementById(`skill-slot-dropdown-${blockId}`);
    const options  = dropdown?.style.display !== 'none'
        ? [...(dropdown?.querySelectorAll('.skill-picker-option') || [])]
        : [];

    if (event.key === 'ArrowDown') {
        event.preventDefault();
        _pickerSetHighlight(options, Math.min(_pickerHighlightIdx + 1, options.length - 1));
        return;
    }

    if (event.key === 'ArrowUp') {
        event.preventDefault();
        _pickerSetHighlight(options, Math.max(_pickerHighlightIdx - 1, -1));
        return;
    }

    if (event.key === 'Enter') {
        event.preventDefault();

        // If an arrow-highlighted option exists, select it directly
        if (_pickerHighlightIdx >= 0 && options[_pickerHighlightIdx]) {
            const opt     = options[_pickerHighlightIdx];
            const topicId = opt.dataset.topicId;
            const label   = opt.dataset.label;
            if (topicId && label) { confirmSkillSlot(blockId, slot, topicId, label); return; }
        }

        // Otherwise match on typed text
        const input = document.getElementById(`skill-slot-${slot}-input-${blockId}`);
        const query = (input?.value || '').trim();
        if (query) {
            const norm   = normaliseStr(query);
            const skills = (appState.skills || DATA.skills).filter(s =>
                !(appState.hidePointe && s.dimensionIds?.includes('pointe'))
            );
            const top = _rankSkillPickerMatches(skills, norm)[0];
            if (top) { confirmSkillSlot(blockId, slot, 'skill:' + top.id, top.french); return; }
            const custom = (appState.customSkills || []).find(c => normaliseStr(c.name).includes(norm));
            if (custom) { confirmSkillSlot(blockId, slot, 'custom:' + custom.id, custom.name); return; }
            _saveCustomSkillSlot(blockId, slot, query);
        } else if (slot === 'secondary') {
            const block = getBlockById(blockId);
            if (block) { block._slotEditing = null; renderSkillSlotInPlace(blockId); }
        }
        return;
    }

    if (event.key === 'Backspace') {
        const input = document.getElementById(`skill-slot-${slot}-input-${blockId}`);
        if (input && input.value === '' && slot === 'secondary') {
            const block = getBlockById(blockId);
            if (block) { block.secondaryTopicId = null; block._slotEditing = null; }
            renderSkillSlotInPlace(blockId);
        }
        // Primary: backspace on empty input does nothing — tap token to edit
        return;
    }

    if (event.key === 'Escape') {
        const block = getBlockById(blockId);
        if (block) block._slotEditing = null;
        renderSkillSlotInPlace(blockId);
    }
}

function closeSkillSlot(blockId, slot) {
    // Delayed so onmousedown/touchend on a dropdown option fires first.
    // Only reverts editing state if no selection was made (_slotEditing still set).
    // Does NOT null _skillPickerOnSelect unconditionally — the secondary slot's
    // onfocus may have already replaced it with a new closure.
    setTimeout(() => {
        const block      = getBlockById(blockId);
        const dropdownEl = document.getElementById(`skill-slot-dropdown-${blockId}`);
        if (dropdownEl) dropdownEl.style.display = 'none';
        if (block && block._slotEditing === slot) {
            block._slotEditing = null;
            _skillPickerOnSelect = null;
            renderSkillSlotInPlace(blockId);
        }
    }, 250);
}

function confirmSkillSlot(blockId, slot, topicId, label) {
    const block = getBlockById(blockId);
    if (!block) return;
    _pickerHighlightIdx = -1;
    if (slot === 'primary') {
        block.topicId                    = topicId;
        block._slotEditing               = null;
        block._derivedFromCorrectionId   = null;
        block._corrSectionDismissed      = false;
        sortBlocks();
        renderBlocksOnly();
        // No auto-focus: auto-focusing secondary immediately causes pending
        // mouseup/click from the primary selection to land on the newly-opened
        // secondary dropdown and ghost-select the wrong skill.
    } else {
        block.secondaryTopicId = topicId;
        block._slotEditing     = null;
        renderSkillSlotInPlace(blockId);
    }
}

function _saveCustomSkillSlot(blockId, slot, name) {
    if (!appState.customSkills) appState.customSkills = [];
    let custom = appState.customSkills.find(
        c => c.name.toLowerCase() === name.toLowerCase()
    );
    if (!custom) {
        custom = { id: generateId(), userId: null, name };
        appState.customSkills.push(custom);
        storage.save('customSkills', appState.customSkills);
    }
    confirmSkillSlot(blockId, slot, 'custom:' + custom.id, custom.name);
}

function openSessionLogger(mode) {
    const today = new Date().toISOString().split('T')[0];

    appState.currentSession = {
        id:              generateId(),
        userId:          null,
        date:            today,
        templateId:      null,
        sessionName:     null,
        sessionLocation: null,
        classType:       null,
        teacher:         null,
        venue:           null,
        city:            null,
        blocks:          [],
        _predicted:      false,
        _mode:           mode || 'session',
        _expandedBlockId: null,
        _addMenuOpen:    false,
    };

    // Auto-create first block and focus its title (not needed for note mode)
    if (mode !== 'note') addBlock(true);

    let overlay = document.getElementById('session-logger-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'session-logger-overlay';
        overlay.className = 'session-overlay';
        document.body.appendChild(overlay);
        overlay.addEventListener('mousedown', (e) => {
            if (e.target === overlay) closeSessionLogger();
        });
    }

    renderSessionLogger();

    document.querySelector('.fab')?.classList.remove('visible');
    document.querySelector('.bottom-nav')?.classList.remove('visible');

    void overlay.offsetHeight; // force reflow so translateY(100%) is established before transition
    requestAnimationFrame(() => overlay.classList.add('open'));

    // Swipe-to-dismiss on handle
    const sheet = overlay.querySelector('.session-logger-sheet');
    const handle = overlay.querySelector('.session-sheet-handle');
    let dragStartY = 0, currentY = 0, isDragging = false;

    function onDragStart(e) {
        isDragging = true;
        dragStartY = e.touches ? e.touches[0].clientY : e.clientY;
        sheet.style.transition = 'none';
    }
    function onDragMove(e) {
        if (!isDragging) return;
        currentY = (e.touches ? e.touches[0].clientY : e.clientY) - dragStartY;
        if (currentY < 0) currentY = 0;
        sheet.style.transform = `translateY(${currentY}px)`;
    }
    function onDragEnd() {
        if (!isDragging) return;
        isDragging = false;
        sheet.style.transition = '';
        if (currentY > 120) { closeSessionLogger(); }
        else { sheet.style.transform = 'translateY(0)'; }
        currentY = 0;
    }

    handle.addEventListener('touchstart', onDragStart, { passive: true });
    handle.addEventListener('touchmove', onDragMove, { passive: true });
    handle.addEventListener('touchend', onDragEnd);
    handle.addEventListener('mousedown', onDragStart);
    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('mouseup', onDragEnd);
}

function closeSessionLogger() {
    const overlay = document.getElementById('session-logger-overlay');
    if (!overlay) return;
    overlay.classList.remove('open');

    const isAppScreen = !['assessment', 'completion', 'results'].includes(appState.currentScreen)
        && !appState.currentScreen.startsWith('onboarding');
    if (isAppScreen) {
        document.querySelector('.fab')?.classList.add('visible');
        document.querySelector('.bottom-nav')?.classList.add('visible');
    }

    overlay.addEventListener('transitionend', () => {
        appState.currentSession = null;
        appState._addingNewTemplate = false;
        appState._draftTemplate = null;
        appState._showMoreClassTypes = false;
    }, { once: true });
}

function formatSessionDateDisplay(dateStr) {
    const todayStr = new Date().toISOString().split('T')[0];
    const yest = new Date();
    yest.setDate(yest.getDate() - 1);
    const yesterdayStr = yest.toISOString().split('T')[0];
    if (dateStr === todayStr) return 'Today';
    if (dateStr === yesterdayStr) return 'Yesterday';
    const d = new Date(dateStr + 'T12:00:00');
    const weekday = d.toLocaleDateString('en-GB', { weekday: 'long' });
    const day = d.getDate();
    const month = d.toLocaleDateString('en-GB', { month: 'long' });
    return `${weekday}, ${day} ${month}`;
}

function toggleDateCalendar() {
    const existing = document.getElementById('date-calendar-popup');
    if (existing) { existing.remove(); return; }
    if (!appState.currentSession) return;
    renderDateCalendar(appState.currentSession.date);
}

function renderDateCalendar(selectedDateStr) {
    const existing = document.getElementById('date-calendar-popup');
    if (existing) existing.remove();

    const sel = new Date(selectedDateStr + 'T12:00:00');
    const todayStr = new Date().toISOString().split('T')[0];
    const viewYear = sel.getFullYear();
    const viewMonth = sel.getMonth(); // 0-indexed

    const firstDay = new Date(viewYear, viewMonth, 1);
    const lastDay  = new Date(viewYear, viewMonth + 1, 0);
    const startDow = (firstDay.getDay() + 6) % 7; // Mon=0
    const monthLabel = firstDay.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

    // Prev month: only allow if month has days in the past
    const prevMonthLastDay = new Date(viewYear, viewMonth, 0);
    const prevMonthLastStr = prevMonthLastDay.toISOString().split('T')[0];
    const canGoPrev = prevMonthLastStr <= todayStr;

    // Next month: only allow if current month is not the current month
    const todayD = new Date(todayStr + 'T12:00:00');
    const canGoNext = viewYear < todayD.getFullYear() || (viewYear === todayD.getFullYear() && viewMonth < todayD.getMonth());

    const dowHeaders = ['M','T','W','T','F','S','S'].map(d => `<div class="date-cal-dow">${d}</div>`).join('');

    let dayCells = '';
    // Empty cells before first day
    for (let i = 0; i < startDow; i++) dayCells += `<button class="date-cal-day empty" disabled></button>`;
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const dStr = `${viewYear}-${String(viewMonth + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
        const isSelected = dStr === selectedDateStr;
        const isToday    = dStr === todayStr;
        const isFuture   = dStr > todayStr;
        const cls = ['date-cal-day', isSelected ? 'selected' : '', isToday && !isSelected ? 'today' : '', isFuture ? 'future' : ''].filter(Boolean).join(' ');
        dayCells += `<button class="${cls}" onmousedown="pickCalendarDate('${dStr}')" ${isFuture ? 'disabled' : ''}>${day}</button>`;
    }

    const popup = document.createElement('div');
    popup.id = 'date-calendar-popup';
    popup.className = 'date-calendar-popup';
    popup.innerHTML = `
        <div class="date-cal-header">
            <button class="date-cal-nav" onmousedown="renderDateCalendar(getCalNavMonth('${selectedDateStr}', -1))" ${canGoPrev ? '' : 'disabled'}>‹</button>
            <span class="date-cal-month-label">${monthLabel}</span>
            <button class="date-cal-nav" onmousedown="renderDateCalendar(getCalNavMonth('${selectedDateStr}', 1))" ${canGoNext ? '' : 'disabled'}>›</button>
        </div>
        <div class="date-cal-grid">
            ${dowHeaders}
            ${dayCells}
        </div>
    `;

    const picker = document.querySelector('.session-date-picker');
    if (picker) picker.appendChild(popup);
}

function getCalNavMonth(currentSelectedStr, delta) {
    const d = new Date(currentSelectedStr + 'T12:00:00');
    const newMonth = d.getMonth() + delta;
    const newYear  = newMonth < 0 ? d.getFullYear() - 1 : (newMonth > 11 ? d.getFullYear() + 1 : d.getFullYear());
    const clampedMonth = ((newMonth % 12) + 12) % 12;
    // Return first day of new month as nav target
    return `${newYear}-${String(clampedMonth + 1).padStart(2,'0')}-01`;
}

function pickCalendarDate(dateStr) {
    if (!appState.currentSession) return;
    appState.currentSession.date = dateStr;
    document.getElementById('date-calendar-popup')?.remove();
    renderSessionLogger();
}

function stepSessionDate(delta) {
    if (!appState.currentSession) return;
    const d = new Date(appState.currentSession.date + 'T12:00:00');
    d.setDate(d.getDate() + delta);
    const todayStr = new Date().toISOString().split('T')[0];
    const newStr = d.toISOString().split('T')[0];
    if (newStr > todayStr) return; // can't log future sessions
    appState.currentSession.date = newStr;
    renderSessionLogger();
}

function renderSessionLogger() {
    const overlay = document.getElementById('session-logger-overlay');
    if (!overlay) return;

    const s = appState.currentSession;
    const templates = appState.sessionTemplates;
    const isNoteMode = s._mode === 'note';

    // Determine predicted class type from selected template
    const activeTemplate = templates.find(t => t.id === s.templateId);
    const predictedType = activeTemplate?.classType || null;

    // Class type carousel — primary chips + More button
    const primaryChips = CLASS_TYPES_PRIMARY.map(ct =>
        '<div class="class-type-carousel-item">' +
        '<button class="class-type-chip ' + (s.classType === ct.id ? 'selected' : '') + ' ' + (predictedType === ct.id && !s.classType ? 'predicted' : '') + '" onclick="selectClassType(\'' + ct.id + '\')">' +
        '<span class="class-type-chip-label">' + ct.label + '</span>' +
        (ct.sub ? '<span class="class-type-chip-sub">' + ct.sub + '</span>' : '') +
        '</button></div>'
    ).join('');

    // If a secondary type is selected, show it in the carousel too
    const selectedSecondary = s.classType ? CLASS_TYPES_SECONDARY.find(ct => ct.id === s.classType) : null;
    const selectedSecondaryChip = selectedSecondary ?
        '<div class="class-type-carousel-item">' +
        '<button class="class-type-chip selected" onclick="selectClassType(\'' + selectedSecondary.id + '\')">' +
        '<span class="class-type-chip-label">' + selectedSecondary.label + '</span>' +
        (selectedSecondary.sub ? '<span class="class-type-chip-sub">' + selectedSecondary.sub + '</span>' : '') +
        '</button></div>' : '';

    // Blocks HTML
    const blocksHtml = s.blocks.map((block, i) => renderBlockHtml(block, i)).join('');

    // Session name input value
    const sessionInputValue = s.templateId
        ? (templates.find(t => t.id === s.templateId)?.name || '')
        : (s.sessionName || '');

    // Metadata row (class type · location · days) shown when a template is selected
    const templateClassTypeLabel = activeTemplate?.classType
        ? (ALL_CLASS_TYPES.find(ct => ct.id === activeTemplate.classType)?.label || null)
        : null;
    const metadataParts = [templateClassTypeLabel, activeTemplate?.location, activeTemplate?.days?.join(', ')].filter(Boolean);
    const sessionMetadataHtml = metadataParts.length
        ? '<div class="session-metadata-row" id="session-metadata">' + metadataParts.join(' · ') + '</div>'
        : '<div class="session-metadata-row" id="session-metadata" style="display:none;"></div>';

    const todayStr = new Date().toISOString().split('T')[0];
    const isToday = s.date === todayStr;

    const sessionBodyHtml = isNoteMode ?
        '<div class="session-field" style="padding-top: var(--sp-sm);">' +
        '<div contenteditable="true" id="note-editor" class="note-editor" spellcheck="true">' + escapeHtml(s.generalNotes || '') + '</div>' +
        '</div>'
        :
        // Date row — no label, full weekday + date
        '<div class="session-date-picker" style="margin-bottom: var(--sp-md);">' +
        '<button class="date-nav-btn" onmousedown="stepSessionDate(-1)" aria-label="Previous day">' +
        '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="10 4 6 8 10 12"/></svg>' +
        '</button>' +
        '<div class="date-display" onmousedown="toggleDateCalendar()">' + formatSessionDateDisplay(s.date) + '</div>' +
        '<button class="date-nav-btn' + (isToday ? ' date-nav-disabled' : '') + '" onmousedown="stepSessionDate(1)" aria-label="Next day" ' + (isToday ? 'disabled' : '') + '>' +
        '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 4 10 8 6 12"/></svg>' +
        '</button>' +
        '</div>' +

        // Session field — inline, no label
        '<div class="session-name-field">' +
        '<div class="session-name-input-row" id="session-combobox">' +
        '<input type="text" class="session-name-input" id="session-name-input" placeholder="Session name…" value="' + sessionInputValue.replace(/"/g, '&quot;') + '" autocomplete="off" oninput="handleSessionNameInput(this.value)" onblur="handleSessionNameBlur(this.value)" onfocus="showSessionDropdown()" />' +
        ((s.sessionName || s.templateId) ? '<button class="session-name-clear" onmousedown="clearSessionName()">' + ICONS.get('x', 14) + '</button>' : '') +
        '</div>' +
        '<div id="session-day-suggestions"></div>' +
        '<div class="session-combobox-dropdown" id="session-combobox-dropdown" style="display:none;"></div>' +
        sessionMetadataHtml +
        '</div>' +

        '<div id="new-session-form-container"></div>' +

        // Class type — only when free-text name typed (not template, not blank)
        '<div id="class-type-section"' + ((!s.sessionName || s.templateId) ? ' style="display:none;"' : '') + '>' +
        '<div class="class-type-carousel">' + primaryChips + selectedSecondaryChip +
        '<div class="class-type-carousel-item">' +
        '<button class="class-type-chip class-type-more" onclick="toggleMoreClassTypes()">' +
        '<span class="class-type-chip-label">More…</span>' +
        '<span class="class-type-chip-sub">see all types</span>' +
        '</button></div>' +
        '</div>' +
        '<div id="more-class-types-panel" style="display:none;"></div>' +
        '</div>' +

        // Blocks — no section label
        '<div id="session-blocks-container">' + blocksHtml + '</div>' +

        // + add trigger
        '<div id="add-block-trigger-container">' + renderAddTrigger() + '</div>';

    overlay.innerHTML =
        '<div class="session-logger-sheet">' +
        '<div class="session-sheet-handle"></div>' +
        '<div class="session-logger-header">' +
        '<div>' +
        '<div class="session-logger-eyebrow">' + (isNoteMode ? 'Quick note' : 'New session') + '</div>' +
        '<h2 class="session-logger-title">' + (isNoteMode ? 'Add a note' : 'Log a class') + '</h2>' +
        '</div>' +
        '<button class="session-close-btn" onclick="closeSessionLogger()" aria-label="Close">' + ICONS.get('x', 18) + '</button>' +
        '</div>' +
        '<div class="session-logger-body" id="session-logger-body">' +
        sessionBodyHtml +
        '<div style="height: var(--sp-3xl);"></div>' +
        '</div>' +
        '<div class="session-logger-footer">' +
        '<button class="session-discard-btn" onmousedown="closeSessionLogger()">discard</button>' +
        '<button class="btn-large session-save-btn" onmousedown="saveSession()">' + (isNoteMode ? 'save note' : 'save session') + '</button>' +
        '</div>' +
        '</div>';

    // Re-attach swipe listeners to new handle
    attachSheetSwipe();

    // Restore state-dependent panels
    if (appState._addingNewTemplate) renderNewSessionForm();
    if (appState._showMoreClassTypes) renderMoreClassTypesPanel();

    // Show day-of-week suggestions if no session selected yet
    renderDaySuggestions();
}
// ── Swipe-to-dismiss (re-attachable after re-render) ──
function attachSheetSwipe() {
    const overlay = document.getElementById('session-logger-overlay');
    if (!overlay) return;
    const sheet = overlay.querySelector('.session-logger-sheet');
    const handle = overlay.querySelector('.session-sheet-handle');
    if (!sheet || !handle) return;

    let dragStartY = 0, currentY = 0, isDragging = false;
    handle.onmousedown = handle.ontouchstart = null; // clear old

    function onDragStart(e) {
        isDragging = true;
        dragStartY = e.touches ? e.touches[0].clientY : e.clientY;
        sheet.style.transition = 'none';
    }
    function onDragMove(e) {
        if (!isDragging) return;
        currentY = (e.touches ? e.touches[0].clientY : e.clientY) - dragStartY;
        if (currentY < 0) currentY = 0;
        sheet.style.transform = `translateY(${currentY}px)`;
    }
    function onDragEnd() {
        if (!isDragging) return;
        isDragging = false;
        sheet.style.transition = '';
        if (currentY > 120) { closeSessionLogger(); }
        else { sheet.style.transform = 'translateY(0)'; }
        currentY = 0;
    }

    handle.addEventListener('touchstart', onDragStart, { passive: true });
    handle.addEventListener('touchmove', onDragMove, { passive: true });
    handle.addEventListener('touchend', onDragEnd);
    handle.addEventListener('mousedown', onDragStart);
    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('mouseup', onDragEnd);
}

// ── Date & session selectors ──

function updateSessionDate(value) {
    appState.currentSession.date = value;
}

// ── Session combobox ──

function clearSessionName() {
    if (!appState.currentSession) return;
    appState.currentSession.sessionName = null;
    appState.currentSession.templateId = null;
    // Hide metadata row and class type without full re-render
    const metaRow = document.getElementById('session-metadata');
    if (metaRow) metaRow.style.display = 'none';
    const classTypeSection = document.getElementById('class-type-section');
    if (classTypeSection) classTypeSection.style.display = 'none';
    // Clear the input and hide the × button via re-render of the name row
    const clearBtn = document.querySelector('.session-name-clear');
    if (clearBtn) clearBtn.remove();
    const input = document.getElementById('session-name-input');
    if (input) { input.value = ''; input.focus(); }
}

function handleSessionNameInput(value) {
    // Update free-text name on session, clear any template link
    appState.currentSession.sessionName = value;
    appState.currentSession.templateId = null;
    const sugg = document.getElementById('session-day-suggestions');
    if (sugg) sugg.innerHTML = '';
    renderSessionComboboxDropdown(value);
    checkSessionTitleForSkills(value);
    // Hide metadata row (was from a template) when user types free text
    const metaRow = document.getElementById('session-metadata');
    if (metaRow) metaRow.style.display = 'none';
}

function handleSessionNameBlur(value) {
    if (!appState.currentSession) return;
    const classTypeSection = document.getElementById('class-type-section');
    if (!classTypeSection) return;
    // Show class type only when a free-text name is committed and no template is linked
    const hasName = value.trim().length > 0;
    const hasTemplate = !!appState.currentSession.templateId;
    classTypeSection.style.display = (hasName && !hasTemplate) ? '' : 'none';
}

function renderDaySuggestions() {
    const container = document.getElementById('session-day-suggestions');
    if (!container) return;
    const s = appState.currentSession;
    if (s.templateId || s.sessionName) { container.innerHTML = ''; return; }
    const todayDow = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][new Date().getDay()];
    const matches = appState.sessionTemplates.filter(t => t.days && t.days.includes(todayDow));
    if (!matches.length) { container.innerHTML = ''; return; }
    const rows = matches.map((t, i) => {
        const meta = [t.location, t.days?.join(', ')].filter(Boolean).join(' · ');
        const last = i === matches.length - 1;
        return `<div class="session-day-suggestion-row${last ? ' session-day-suggestion-row--last' : ''}" onmousedown="selectSessionTemplate('${t.id}')"><div class="session-combobox-row-info"><span class="session-combobox-row-name">${t.name}</span>${meta ? `<span class="session-combobox-row-meta">${meta}</span>` : ''}</div></div>`;
    }).join('');
    container.innerHTML = rows;
}

function showSessionDropdown() {
    const input = document.getElementById('session-name-input');
    renderSessionComboboxDropdown(input ? input.value : '');
}

function renderSessionComboboxDropdown(query) {
    const dropdown = document.getElementById('session-combobox-dropdown');
    if (!dropdown) return;

    const q = query.trim().toLowerCase();
    const templates = appState.sessionTemplates;
    const matches = q
        ? templates.filter(t => t.name.toLowerCase().includes(q))
        : templates;

    const matchRows = matches.map(t => `
        <div class="session-combobox-row" onmousedown="selectSessionTemplate('${t.id}')">
            <div class="session-combobox-row-info">
                <span class="session-combobox-row-name">${t.name}</span>
                <span class="session-combobox-row-meta">${[t.location, t.days?.join(', ')].filter(Boolean).join(' · ')}</span>
            </div>
            <div class="session-combobox-row-actions">
                <button class="session-combobox-row-action"
                        onmousedown="event.stopPropagation(); editSessionTemplate('${t.id}');"
                        title="Edit saved session">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                </button>
                <button class="session-combobox-row-action session-combobox-row-action--delete"
                        onmousedown="event.stopPropagation(); deleteSessionTemplate('${t.id}');"
                        title="Remove saved session">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');

    const addNewRow = `
        <div class="session-combobox-row session-combobox-add" onmousedown="openNewSessionForm()">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <line x1="6.5" y1="1" x2="6.5" y2="12"/><line x1="1" y1="6.5" x2="12" y2="6.5"/>
            </svg>
            <span>Add new session…</span>
        </div>
    `;

    dropdown.innerHTML = matchRows + addNewRow;
    dropdown.style.display = 'block';

    // Close on outside click — use capture to avoid re-triggering focus
    setTimeout(() => {
        document.addEventListener('click', closeSessionDropdownOnOutside, { capture: true, once: true });
    }, 0);
}

function closeSessionDropdownOnOutside(e) {
    const combobox = document.getElementById('session-combobox');
    if (combobox && !combobox.contains(e.target)) {
        const dropdown = document.getElementById('session-combobox-dropdown');
        if (dropdown) dropdown.style.display = 'none';
    } else {
        // Re-attach if click was inside
        document.addEventListener('click', closeSessionDropdownOnOutside, { capture: true, once: true });
    }
}

function selectSessionTemplate(templateId) {
    const t = appState.sessionTemplates.find(t => t.id === templateId);
    if (!t) return;
    appState.currentSession.templateId = templateId;
    appState.currentSession.sessionName = t.name;
    if (t.classType && !appState.currentSession.classType) {
        appState.currentSession.classType = t.classType;
    }
    // Update input value and close dropdown without full re-render
    const input = document.getElementById('session-name-input');
    if (input) input.value = t.name;
    const dropdown = document.getElementById('session-combobox-dropdown');
    if (dropdown) dropdown.style.display = 'none';
    // Dismiss day suggestions and update preview
    const sugg = document.getElementById('session-day-suggestions');
    if (sugg) sugg.innerHTML = '';
    renderTemplatePreviewInline(templateId);
}

function openNewSessionForm() {
    const dropdown = document.getElementById('session-combobox-dropdown');
    if (dropdown) dropdown.style.display = 'none';
    appState._addingNewTemplate = true;
    appState._draftTemplate = appState._draftTemplate || {
        name: appState.currentSession.sessionName || '',
        location: '',
        classType: null,
        days: []
    };
    renderNewSessionForm();
}

// ── Class type ──

function selectClassType(id) {
    appState.currentSession.classType = appState.currentSession.classType === id ? null : id;
    renderSessionLogger();
}

function toggleMoreClassTypes() {
    appState._showMoreClassTypes = !appState._showMoreClassTypes;
    if (appState._showMoreClassTypes) {
        renderMoreClassTypesPanel();
    } else {
        const panel = document.getElementById('more-class-types-panel');
        if (panel) panel.style.display = 'none';
    }
}

function renderMoreClassTypesPanel() {
    const panel = document.getElementById('more-class-types-panel');
    if (!panel) return;
    const s = appState.currentSession;

    panel.style.display = 'block';
    panel.innerHTML = `
        <div class="more-class-types">
            ${CLASS_TYPES_SECONDARY.map(ct => `
                <button class="more-class-type-row ${s.classType === ct.id ? 'selected' : ''}"
                        onclick="selectClassType('${ct.id}'); toggleMoreClassTypes();">
                    <span>${ct.label}</span>
                    ${ct.sub ? `<span class="more-class-type-sub">${ct.sub}</span>` : ''}
                    ${s.classType === ct.id ? `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="2 7 5.5 10.5 12 4"/></svg>` : ''}
                </button>
            `).join('')}
        </div>
    `;
}

// ── New session template form ──

function renderNewSessionForm() {
    const container = document.getElementById('new-session-form-container');
    if (!container) return;

    if (!appState._draftTemplate) {
        appState._draftTemplate = { name: '', location: '', classType: null, days: [] };
    }
    const d = appState._draftTemplate;

    const dayChips = DAYS_OF_WEEK.map(day => `
        <button class="day-chip ${d.days?.includes(day) ? 'selected' : ''}"
                onmousedown="toggleDraftDay('${day}')">
            ${day}
        </button>
    `).join('');

    const classTypeChips = ALL_CLASS_TYPES.map(ct => `
        <button class="recurrence-chip ${d.classType === ct.id ? 'selected' : ''}"
                onmousedown="selectDraftClassType('${ct.id}')"
                style="font-size: var(--fs-caption);">
            ${ct.label}
        </button>
    `).join('');

    const isRecurring = d.days?.length > 0;

    container.innerHTML = `
        <div class="new-session-form">
            <div class="new-session-form-header">
                <span class="new-session-form-title">${d._editingId ? 'Edit session' : 'New session'}</span>
                <button class="new-session-cancel" onclick="cancelNewSession()">← back</button>
            </div>

            <div class="session-field">
                <label class="session-field-label">Name</label>
                <input type="text" class="session-input" id="draft-name-input"
                       placeholder="e.g. Wednesday RAD class"
                       value="${d.name}"
                       oninput="appState._draftTemplate.name = this.value"
                       maxlength="60" />
            </div>

            <div class="session-field">
                <label class="session-field-label">Location <span class="session-field-optional">optional</span></label>
                ${(() => {
                    const savedLocations = [...new Set(
                        appState.sessionTemplates
                            .map(t => t.location)
                            .filter(Boolean)
                    )];
                    const datalistId = 'location-suggestions';
                    return `
                        <input type="text" class="session-input" list="${datalistId}"
                               placeholder="e.g. Covent Garden Studio"
                               value="${d.location}"
                               oninput="appState._draftTemplate.location = this.value"
                               maxlength="60" />
                        <datalist id="${datalistId}">
                            ${savedLocations.map(loc => `<option value="${loc}">`).join('')}
                        </datalist>
                    `;
                })()}
            </div>

            <div class="session-field">
                <label class="session-field-label">Class type <span class="session-field-optional">optional</span></label>
                <div class="recurrence-chips" style="flex-wrap: wrap;" id="draft-class-type-chips">
                    ${classTypeChips}
                </div>
            </div>

            <div class="session-field">
                <label class="session-field-label">Repeats on <span class="session-field-optional">optional — leave blank for one-off</span></label>
                <div class="day-chips" id="draft-day-chips">
                    ${dayChips}
                </div>
                ${isRecurring ? `<p class="session-field-hint">This session will be saved for future logging.</p>` : ''}
            </div>

            <button class="btn-large" onclick="saveNewTemplate()" style="margin-top: var(--sp-md);">
                ${d._editingId ? 'save changes' : (isRecurring ? 'save recurring session' : 'add session')}
            </button>
        </div>
    `;
}

function selectDraftClassType(id) {
    if (!appState._draftTemplate) return;
    appState._draftTemplate.classType = appState._draftTemplate.classType === id ? null : id;
    // Re-render just the class type chips
    const chipsEl = document.getElementById('draft-class-type-chips');
    if (chipsEl) {
        chipsEl.innerHTML = ALL_CLASS_TYPES.map(ct => `
            <button class="recurrence-chip ${appState._draftTemplate.classType === ct.id ? 'selected' : ''}"
                    onmousedown="selectDraftClassType('${ct.id}')"
                    style="font-size: var(--fs-caption);">
                ${ct.label}
            </button>
        `).join('');
    }
}

function updateDraftTemplate(key, value) {
    if (!appState._draftTemplate) return;
    appState._draftTemplate[key] = value;
}

function toggleDraftDay(day) {
    if (!appState._draftTemplate) return;
    const days = appState._draftTemplate.days || [];
    const idx = days.indexOf(day);
    if (idx > -1) days.splice(idx, 1);
    else days.push(day);
    appState._draftTemplate.days = days;

    // Re-render day chips only
    const chipsEl = document.getElementById('draft-day-chips');
    if (chipsEl) {
        chipsEl.innerHTML = DAYS_OF_WEEK.map(d => `
            <button class="day-chip ${days.includes(d) ? 'selected' : ''}"
                    onmousedown="toggleDraftDay('${d}')">
                ${d}
            </button>
        `).join('');
    }
    // Update save button label
    const saveBtn = document.querySelector('#new-session-form-container .btn-large');
    if (saveBtn) saveBtn.textContent = days.length ? 'save recurring session' : 'add session';
}

function saveNewTemplate() {
    const d = appState._draftTemplate;
    if (!d || !d.name.trim()) {
        const nameInput = document.getElementById('draft-name-input');
        if (nameInput) { nameInput.focus(); nameInput.classList.add('input-error'); }
        return;
    }

    const isRecurring = d.days?.length > 0;
    // editingId stored on draft itself so it can't be lost if state is re-read
    const editingId = d._editingId || appState._editingTemplateId || null;

    const template = {
        id:        editingId || generateId(),
        name:      d.name.trim(),
        location:  d.location?.trim() || null,
        classType: d.classType || null,
        days:      d.days || [],
    };

    if (editingId) {
        // Update existing template in-place
        const idx = appState.sessionTemplates.findIndex(t => t.id === editingId);
        if (idx !== -1) appState.sessionTemplates[idx] = template;
        storage.save('sessionTemplates', appState.sessionTemplates);
    } else if (isRecurring) {
        appState.sessionTemplates.push(template);
        storage.save('sessionTemplates', appState.sessionTemplates);
        appState.currentSession.templateId = template.id;
    } else {
        // One-off: store name inline, don't add to templates
        appState.currentSession.sessionName = template.name;
        appState.currentSession.sessionLocation = template.location;
    }

    // Apply class type from template to current session if none set
    if (template.classType && !appState.currentSession.classType) {
        appState.currentSession.classType = template.classType;
    }

    appState._addingNewTemplate = false;
    appState._editingTemplateId = null;
    appState._draftTemplate = null;
    renderSessionLogger();
}

function cancelNewSession() {
    appState._addingNewTemplate = false;
    appState._editingTemplateId = null;
    appState._draftTemplate = null;
    const container = document.getElementById('new-session-form-container');
    if (container) container.innerHTML = '';
}

// ── Notes & corrections blocks ──

// Block modes
const BLOCK_MODES = ['correction', 'praise', 'reflection'];

function addBlock(focusTitle = false, type = 'correction') {
    const block = {
        id:                generateId(),
        topicId:           'general',
        secondaryTopicId:  null,
        _slotEditing:      null,
        title:             '',
        text:              '',
        notes:             '',
        notesOpen:         false,
        blockType:                type,
        isHighlight:              false,
        previousBlockType:        null,
        _derivedFromCorrectionId: null,
        _corrSectionDismissed:    false,
    };
    if (type === 'goal') {
        block._goalDraft = {
            goalType:         null,
            title:            '',
            body:             '',
            skillId:          null,
            dimensionId:      null,
            progressMarkers:  [],
            howOften:         '',
            commitmentPeriod: '',
            correctionIds:    [],
            skillIds:         [],
        };
    }
    appState.currentSession.blocks.push(block);
    appState.currentSession._expandedBlockId = block.id;
    appState.currentSession._addMenuOpen = false;
    sortBlocks();
    renderBlocksOnly();
    if (focusTitle && type !== 'goal') {
        requestAnimationFrame(() => {
            const blocks = document.querySelectorAll('.block-bullet-entry');
            const last = blocks[blocks.length - 1];
            if (!last) return;
            const firstLine = last.querySelector('div');
            const target = firstLine || last;
            target.focus();
            // Place cursor inside the div via Selection API so the first keystroke
            // lands inside the <div> child, not as a bare text node on the parent.
            if (firstLine) {
                try {
                    const range = document.createRange();
                    range.setStart(firstLine, 0);
                    range.collapse(true);
                    const sel = window.getSelection();
                    sel?.removeAllRanges();
                    sel?.addRange(range);
                } catch (_) {}
            }
        });
    }
}

function sortBlocks() {
    if (!appState.currentSession?.blocks) return;
    appState.currentSession.blocks.sort((a, b) => {
        const aGeneral = a.topicId === 'general' ? 0 : 1;
        const bGeneral = b.topicId === 'general' ? 0 : 1;
        return aGeneral - bGeneral;
    });
}

// Stable block lookup — avoids stale positional indices after sortBlocks()
function getBlockById(blockId) {
    return appState.currentSession?.blocks.find(b => b.id === blockId) || null;
}
function getBlockIndexById(blockId) {
    return appState.currentSession?.blocks.findIndex(b => b.id === blockId) ?? -1;
}

function expandBlock(blockId) {
    if (!appState.currentSession) return;
    appState.currentSession._expandedBlockId = blockId;
    renderBlocksOnly();
}

function renderAddTrigger() {
    if (appState.currentSession?._addMenuOpen) {
        return '<div class="add-block-menu">' +
            '<div class="add-block-menu-header">+ add</div>' +
            '<button class="add-block-menu-item" onmousedown="addBlock(true, \'correction\')">correction</button>' +
            '<button class="add-block-menu-item" onmousedown="addBlock(true, \'note\')">note</button>' +
            '<button class="add-block-menu-item" onmousedown="addBlock(true, \'intention\')">intention</button>' +
            '<button class="add-block-menu-item" onmousedown="addBlock(true, \'goal\')">goal</button>' +
            '</div>';
    }
    return '<button class="add-block-trigger" onmousedown="openAddMenu()">+ add</button>';
}

function openAddMenu() {
    if (!appState.currentSession) return;
    appState.currentSession._addMenuOpen = true;
    const container = document.getElementById('add-block-trigger-container');
    if (container) container.innerHTML = renderAddTrigger();
}

function renderBlocksOnly() {
    const container = document.getElementById('session-blocks-container');
    if (!container) return;
    const s = appState.currentSession;
    container.innerHTML = s.blocks.map((block, i) => renderBlockHtml(block, i)).join('');
    const triggerContainer = document.getElementById('add-block-trigger-container');
    if (triggerContainer) triggerContainer.innerHTML = renderAddTrigger();
    // Attach swipe-to-remove on each block
    container.querySelectorAll('.swipe-row[data-block-id]').forEach(row => {
        const blockId = row.dataset.blockId;
        attachSwipe(row, {
            onLeft: () => {
                const idx = getBlockIndexById(blockId);
                if (idx !== -1) appState.currentSession.blocks.splice(idx, 1);
                setTimeout(() => renderBlocksOnly(), 320);
            }
        });
    });
}

function renderBlockHtml(block, index) {
    const topics = getBlockTopics();
    const isExpanded = block.id === appState.currentSession?._expandedBlockId;

    // Resolve blockType — new field; fall back to legacy source for old records
    const blockType = block.blockType || block.source || 'correction';

    // Migrate legacy content into block.text for display in the editor
    const resolveBlockText = () => {
        let t = block.text || '';
        if (!t) {
            if (Array.isArray(block.corrections) && block.corrections.length) t = block.corrections.join('\n');
            else if (block.praiseText) t = block.praiseText;
            else if (block.reflectionText) t = block.reflectionText;
        }
        return t;
    };

    // ── Collapsed state — type label + star row, then skill + quote preview ──
    if (!isExpanded) {
        const blockText = resolveBlockText();
        const firstLine = blockText.split('\n')[0].trim();
        const linkedSkill = block.topicId?.startsWith('skill:')
            ? DATA.skills.find(sk => sk.id === block.topicId.replace('skill:', ''))
            : null;
        const skillName = linkedSkill?.french || null;

        // Build preview body — no placeholder copy for empty blocks
        let bodyHtml = '';
        if (blockType === 'note') {
            if (firstLine) {
                bodyHtml = '<div class="session-block-preview-line session-block-preview-line--italic">' + escapeHtml(firstLine) + '</div>';
            }
        } else if (blockType === 'goal') {
            const gd = block._goalDraft;
            const goalTitle = gd?.title || firstLine;
            const GOAL_TYPE_LABELS = { skill: 'a skill', body: 'body', intention: 'a feeling', habit: 'a habit' };
            const goalTypeLabel = GOAL_TYPE_LABELS[gd?.goalType] || null;
            if (goalTitle) {
                bodyHtml = '<div class="session-block-preview-line session-block-preview-line--bold">' + escapeHtml(goalTitle) + '</div>';
            }
            if (goalTypeLabel) {
                bodyHtml += '<div class="session-block-preview-line" style="color:var(--ink-5);">' + goalTypeLabel + '</div>';
            }
        } else {
            // correction / observation
            if (skillName) {
                bodyHtml += '<div class="session-block-preview-line session-block-preview-line--bold">' + escapeHtml(skillName) + '</div>';
            }
            if (firstLine) {
                bodyHtml += '<div class="session-block-preview-line session-block-preview-line--italic">\u201c' + escapeHtml(firstLine) + '\u201d</div>';
            }
        }

        // Eyebrow: when highlighted — CORRECTION · [icon] HIGHLIGHT (icon is the un-highlight tap target)
        // When not highlighted — label + standalone highlighter button on the right
        const baseLabel = block.previousBlockType || 'correction';
        const eyebrowHtml = block.isHighlight
            ? '<span class="session-block-type-inline">' + baseLabel + '</span>' +
              '<span class="block-eyebrow-sep">·</span>' +
              '<button class="block-highlight-eyebrow-btn" onmousedown="event.stopPropagation(); toggleBlockHighlight(\'' + block.id + '\')" ontouchend="event.preventDefault(); event.stopPropagation(); toggleBlockHighlight(\'' + block.id + '\')" aria-label="Remove highlight">' +
                  ICONS.get('highlighter', 16) +
                  '<span class="block-eyebrow-highlight-label">highlight</span>' +
              '</button>'
            : '<span class="session-block-type-inline">' + blockType + '</span>' +
              '<button class="block-star-btn" onmousedown="event.stopPropagation(); toggleBlockHighlight(\'' + block.id + '\')" ontouchend="event.preventDefault(); event.stopPropagation(); toggleBlockHighlight(\'' + block.id + '\')" aria-label="Highlight">' + ICONS.get('highlighter', 16) + '</button>';

        return '<div class="swipe-row" data-block-id="' + block.id + '">' +
            '<div class="swipe-action-left swipe-action-remove">' + ICONS.get('x', 16) + 'remove</div>' +
            '<div class="session-block session-block--collapsed' + (block.isHighlight ? ' session-block--highlighted' : '') + '" id="block-' + block.id + '" onmousedown="expandBlock(\'' + block.id + '\')">' +
                '<div class="session-block-collapse-header">' + eyebrowHtml + '</div>' +
                (bodyHtml ? '<div class="session-block-collapse-body">' + bodyHtml + '</div>' : '') +
            '</div>' +
        '</div>';
    }

    // ── Expanded state — lives on sheet surface, no bg/border ──
    const blockText = resolveBlockText();

    // Eyebrow: CORRECTION · [icon] HIGHLIGHT when highlighted; otherwise just the block type
    const expandedBaseLabel = block.previousBlockType || 'correction';
    const blockTypeLabelHtml = block.isHighlight
        ? '<div class="block-type-label block-type-label--highlight">' +
              '<span class="block-eyebrow-base">' + expandedBaseLabel + '</span>' +
              '<span class="block-eyebrow-sep">·</span>' +
              '<button class="block-highlight-eyebrow-btn" onmousedown="toggleBlockHighlight(\'' + block.id + '\')" ontouchend="event.preventDefault(); toggleBlockHighlight(\'' + block.id + '\')" aria-label="Remove highlight">' +
                  ICONS.get('highlighter', 16) +
                  '<span class="block-eyebrow-highlight-label">highlight</span>' +
              '</button>' +
          '</div>'
        : '<div class="block-type-label">' + blockType + '</div>';

    // Goal blocks — inline form with draft state, no contenteditable
    if (blockType === 'goal') {
        const d = block._goalDraft || {};
        const typeTabsHtml = d.goalType ? `
            <div class="goal-type-tabs" id="inline-goal-type-tabs-${block.id}">
                <button class="goal-type-tab ${d.goalType === 'skill'     ? 'active' : ''}" onmousedown="setBlockGoalType('${block.id}', 'skill')">A skill</button>
                <button class="goal-type-tab ${d.goalType === 'body'      ? 'active' : ''}" onmousedown="setBlockGoalType('${block.id}', 'body')">Body</button>
                <button class="goal-type-tab ${d.goalType === 'intention' ? 'active' : ''}" onmousedown="setBlockGoalType('${block.id}', 'intention')">A feeling or state</button>
                <button class="goal-type-tab ${d.goalType === 'habit'     ? 'active' : ''}" onmousedown="setBlockGoalType('${block.id}', 'habit')">A habit</button>
            </div>` : '';
        return `
            <div class="swipe-row swipe-row--expanded" data-block-id="${block.id}">
                <div class="swipe-action-left swipe-action-remove">
                    ${ICONS.get('x', 16)}
                    remove
                </div>
                <div class="session-block session-block--expanded${block.isHighlight ? ' session-block--highlighted' : ''}" id="block-${block.id}">
                    ${blockTypeLabelHtml}
                    <div class="session-block-header">
                        ${!block.isHighlight ? `<button class="block-star-btn"
                                onmousedown="toggleBlockHighlight('${block.id}')"
                                ontouchend="event.preventDefault(); toggleBlockHighlight('${block.id}')"
                                aria-label="Highlight">
                            ${ICONS.get('highlighter', 16)}
                        </button>` : ''}
                        <button class="block-remove-btn" onclick="removeBlock('${block.id}')" aria-label="Remove">
                            ${ICONS.get('x', 14)}
                        </button>
                    </div>
                    ${typeTabsHtml}
                    <div class="session-block-fields">
                        ${renderInlineGoalFormHtml(block)}
                    </div>
                </div>
            </div>`;
    }

    // Note: plain contenteditable, no dash prefix
    // Correction/observation: dash-prefixed bullet lines
    let entryHtml;
    if (blockType === 'note') {
        entryHtml = `<div class="block-bullet-entry block-bullet-entry--note"
                         contenteditable="true"
                         data-block-id="${block.id}"
                         onfocus="normalizeBulletEntryOnFocus(this)"
                         onblur="normalizeBulletEntry(this)"
                         oninput="updateBlockBullets('${block.id}', this)"
                         >${escapeHtml(blockText) || ''}</div>`;
    } else {
        const bulletLines = blockText ? blockText.split('\n') : [];
        const bulletDivsHtml = bulletLines.length
            ? bulletLines.map(l => `<div>${escapeHtml(l) || '<br>'}</div>`).join('')
            : '<div><br></div>';
        entryHtml = `<div class="block-bullet-entry"
                         contenteditable="true"
                         data-block-id="${block.id}"
                         onfocus="normalizeBulletEntryOnFocus(this)"
                         onblur="normalizeBulletEntry(this)"
                         oninput="updateBlockBullets('${block.id}', this)"
                         >${bulletDivsHtml}</div>`;
    }

    return `
        <div class="swipe-row swipe-row--expanded" data-block-id="${block.id}">
            <div class="swipe-action-left swipe-action-remove">
                ${ICONS.get('x', 16)}
                remove
            </div>

            <div class="session-block session-block--expanded${block.isHighlight ? ' session-block--highlighted' : ''}" id="block-${block.id}">
                    ${blockTypeLabelHtml}

                    <div class="session-block-header session-block-header--slim">
                        ${!block.isHighlight ? `<button class="block-star-btn"
                                onmousedown="toggleBlockHighlight('${block.id}')"
                                ontouchend="event.preventDefault(); toggleBlockHighlight('${block.id}')"
                                aria-label="Highlight">
                            ${ICONS.get('highlighter', 16)}
                        </button>` : ''}
                        <button class="block-remove-btn" onclick="removeBlock('${block.id}')" aria-label="Remove">
                            ${ICONS.get('x', 14)}
                        </button>
                    </div>

                    <div class="session-block-fields">
                        ${entryHtml}
                    </div>
                    ${renderSkillSlotHtml(block)}
                    ${renderCorrectionReuseSection(block)}
                    ${blockType === 'correction' ? `
                    <div class="block-tag-row">
                        <button class="block-tag-chip${block.bodyTag ? ' active' : ''}"
                                onmousedown="toggleBlockBodyTag('${block.id}')">Body</button>
                    </div>` : ''}
                </div>
            </div>
    `;
}

function toggleBlockBodyTag(blockId) {
    const block = getBlockById(blockId);
    if (!block) return;
    block.bodyTag = !block.bodyTag;
    const el = document.getElementById(`block-${blockId}`);
    if (el) {
        const chip = el.querySelector('.block-tag-chip');
        if (chip) chip.classList.toggle('active', block.bodyTag);
    }
}


// ── Inline goal block (T73) ──────────────────────────────────────────────

function renderInlineGoalFormHtml(block) {
    const d = block._goalDraft;
    const bid = block.id;
    if (!d) return '';

    const phIdx = Math.floor(Date.now() / 86400000) % 3;
    const markerPlaceholders = [
        'get a correction on it from my teacher',
        'land two back to back without thinking about the arms',
        'feel it click in centre without the mirror',
    ];
    const removeSvg = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="3" x2="11" y2="11"/><line x1="11" y1="3" x2="3" y2="11"/></svg>';

    // Title is always shown — above type selection and above type-specific fields
    const titleHtml = `
        <div class="session-field">
            <input type="text" class="session-input" id="inline-goal-title-${bid}"
                   placeholder="name this goal"
                   value="${escapeHtml(d.title || '')}"
                   oninput="updateBlockGoalDraftField('${bid}', 'title', this.value)" />
        </div>`;

    // No type selected — title + type selection cards
    if (!d.goalType) {
        return `
            ${titleHtml}
            <div class="goal-type-cards" style="padding:0; margin-top:var(--sp-sm);">
                <button class="goal-type-card" onmousedown="setBlockGoalType('${bid}', 'skill')">
                    <span class="goal-type-card-name">A skill</span>
                    <span class="goal-type-card-desc">Something specific. A technique, a step, a quality of movement.</span>
                </button>
                <button class="goal-type-card" onmousedown="setBlockGoalType('${bid}', 'body')">
                    <span class="goal-type-card-name">Body</span>
                    <span class="goal-type-card-desc">Alignment, proprioception, physical conditioning cues.</span>
                </button>
                <button class="goal-type-card" onmousedown="setBlockGoalType('${bid}', 'intention')">
                    <span class="goal-type-card-name">A feeling or state</span>
                    <span class="goal-type-card-desc">Presence, confidence, ease. Harder to measure, worth naming.</span>
                </button>
                <button class="goal-type-card" onmousedown="setBlockGoalType('${bid}', 'habit')">
                    <span class="goal-type-card-name">A habit</span>
                    <span class="goal-type-card-desc">A rhythm to build in. Conditioning, practice, consistency.</span>
                </button>
            </div>`;
    }

    // Duration chips (T74 will replace with full picker)
    const periodOptions = ['A week', 'Two weeks', 'A month', 'Three months'];
    const periodChipsHtml = periodOptions.map(p => {
        const isActive = d.commitmentPeriod === p;
        return `<button class="goal-period-chip ${isActive ? 'selected' : ''}" onmousedown="setBlockGoalPeriod('${bid}', '${p}')">${p}</button>`;
    }).join('');

    let typeFields = '';

    if (d.goalType === 'skill') {
        const selectedSkill = d.skillId ? (appState.skills || []).find(s => s.id === d.skillId) : null;
        const _catLabels = { general: 'General', technique: 'Technique', movement: 'Movement', artistry: 'Artistry', 'the-body': 'The Body', pointe: 'Pointe' };
        const selectedSkillLabel = selectedSkill ? selectedSkill.french : (d.dimensionId ? (_catLabels[d.dimensionId] || '') : '');
        const markersHtml = (d.progressMarkers || []).map((m, i) => `
            <div class="goal-marker-row">
                <input type="text" class="goal-marker-input"
                       value="${escapeHtml(m.text)}"
                       placeholder="${markerPlaceholders[i % markerPlaceholders.length]}"
                       oninput="updateBlockGoalProgressMarker('${bid}', ${i}, this.value)" />
                <button class="block-remove-btn" onmousedown="removeBlockGoalMarker('${bid}', ${i})">${removeSvg}</button>
            </div>`).join('');
        typeFields = `
            <div class="session-field">
                <label class="session-field-label">What does it look like when it happens? <span class="session-field-optional">optional</span></label>
                <textarea class="session-input" rows="2" style="resize:none;"
                          oninput="updateBlockGoalDraftField('${bid}', 'body', this.value); autoResizeTextarea(this);"
                          >${escapeHtml(d.body || '')}</textarea>
            </div>
            <div class="session-field">
                <label class="session-field-label">Linked skill <span class="session-field-optional">optional</span></label>
                <div style="position:relative;">
                    <input class="session-input" type="text" autocomplete="off" spellcheck="false"
                           id="inline-goal-skill-input-${bid}"
                           value="${escapeHtml(selectedSkillLabel)}"
                           placeholder="Search skill\u2026"
                           oninput="filterBlockGoalSkills('${bid}', this.value)"
                           onfocus="filterBlockGoalSkills('${bid}', this.value)"
                           onblur="setTimeout(()=>{const el=document.getElementById('inline-goal-skill-dropdown-${bid}');if(el)el.style.display='none';},200)" />
                    <div class="block-topic-dropdown" id="inline-goal-skill-dropdown-${bid}" style="display:none;"></div>
                </div>
            </div>
            <div class="session-field">
                <label class="session-field-label">Milestones <span class="session-field-optional">optional</span></label>
                <div id="inline-goal-markers-${bid}">${markersHtml}</div>
                <button class="add-block-btn" style="margin-top:var(--sp-sm);" onmousedown="addBlockGoalMarker('${bid}')">+ add a step</button>
            </div>`;

    } else if (d.goalType === 'body') {
        const markersHtml = (d.progressMarkers || []).map((m, i) => `
            <div class="goal-marker-row">
                <input type="text" class="goal-marker-input"
                       value="${escapeHtml(m.text)}"
                       placeholder="${markerPlaceholders[i % markerPlaceholders.length]}"
                       oninput="updateBlockGoalProgressMarker('${bid}', ${i}, this.value)" />
                <button class="block-remove-btn" onmousedown="removeBlockGoalMarker('${bid}', ${i})">${removeSvg}</button>
            </div>`).join('');
        typeFields = `
            <div class="session-field">
                <label class="session-field-label">What does it look like when it happens? <span class="session-field-optional">optional</span></label>
                <textarea class="session-input" rows="2" style="resize:none;"
                          oninput="updateBlockGoalDraftField('${bid}', 'body', this.value); autoResizeTextarea(this);"
                          >${escapeHtml(d.body || '')}</textarea>
            </div>
            <div class="session-field">
                <label class="session-field-label">Milestones <span class="session-field-optional">optional</span></label>
                <div id="inline-goal-markers-${bid}">${markersHtml}</div>
                <button class="add-block-btn" style="margin-top:var(--sp-sm);" onmousedown="addBlockGoalMarker('${bid}')">+ add a step</button>
            </div>`;

    } else if (d.goalType === 'intention') {
        const bodyPhs = ['not panicking at centre, following combinations without watching everyone else', 'trusting what I know instead of second-guessing it', 'finding it interesting rather than overwhelming'];
        typeFields = `
            <div class="session-field">
                <label class="session-field-label">describe it <span class="session-field-optional">optional</span></label>
                <textarea class="session-input" rows="2" style="resize:none;"
                          placeholder="${bodyPhs[phIdx]}"
                          oninput="updateBlockGoalDraftField('${bid}', 'body', this.value); autoResizeTextarea(this);"
                          >${escapeHtml(d.body || '')}</textarea>
            </div>`;

    } else if (d.goalType === 'habit') {
        const bodyPhs = ['20 minutes of stretching and relevés before I get into class', 'the full warm-up, not just a quick stretch in the changing room', 'hip flexors and hamstrings, 15 minutes minimum'];
        const howOftenOptions = ['Every class', 'Every week', 'set a number', 'other'];
        const isSetNum = d.howOften && d.howOften.startsWith('x');
        const isOtherHowOften = d.howOften && !howOftenOptions.includes(d.howOften) && !isSetNum;
        const numVal = isSetNum ? parseInt(d.howOften.slice(1)) || 1 : 1;
        const howOftenChipsHtml = howOftenOptions.map(o => {
            const active = o === 'set a number' ? isSetNum : o === 'other' ? isOtherHowOften : d.howOften === o;
            return `<button class="goal-period-chip ${active ? 'selected' : ''}" onmousedown="setBlockGoalHowOften('${bid}', '${o}')">${o}</button>`;
        }).join('');
        let howOftenExtra = '';
        if (d.howOften === 'set a number' || isSetNum) {
            howOftenExtra = `
                <div class="goal-number-stepper">
                    <button class="goal-stepper-btn" onmousedown="adjustBlockGoalHowOftenNum('${bid}', -1)" ${numVal <= 1 ? 'disabled' : ''}>−</button>
                    <span class="goal-stepper-value">${numVal}</span>
                    <button class="goal-stepper-btn" onmousedown="adjustBlockGoalHowOftenNum('${bid}', 1)">+</button>
                    <span class="goal-stepper-label">times per week</span>
                </div>`;
        } else if (d.howOften === 'other' || isOtherHowOften) {
            howOftenExtra = `
                <input type="text" class="session-input" style="margin-top:var(--sp-sm);"
                       id="inline-goal-how-often-other-${bid}"
                       placeholder="e.g. whenever I feel ready"
                       value="${isOtherHowOften ? escapeHtml(d.howOften) : ''}"
                       oninput="updateBlockGoalDraftField('${bid}', 'howOften', this.value || 'other')" />`;
        }
        typeFields = `
            <div class="session-field">
                <label class="session-field-label">what does it involve? <span class="session-field-optional">optional</span></label>
                <textarea class="session-input" rows="2" style="resize:none;"
                          placeholder="${bodyPhs[phIdx]}"
                          oninput="updateBlockGoalDraftField('${bid}', 'body', this.value); autoResizeTextarea(this);"
                          >${escapeHtml(d.body || '')}</textarea>
            </div>
            <div class="session-field">
                <label class="session-field-label">How often</label>
                <div class="goal-period-chips">${howOftenChipsHtml}</div>
                ${howOftenExtra}
            </div>`;
    }

    return `
        ${titleHtml}
        ${typeFields}
        <div class="session-field">
            <label class="session-field-label">Work on this for</label>
            <div class="goal-period-chips">${periodChipsHtml}</div>
        </div>`;
}

// ── Inline goal block — state management ──

function updateBlockGoalDraftField(blockId, field, value) {
    const block = getBlockById(blockId);
    if (block?._goalDraft) block._goalDraft[field] = value;
}

function updateBlockGoalProgressMarker(blockId, idx, value) {
    const block = getBlockById(blockId);
    if (block?._goalDraft?.progressMarkers?.[idx] !== undefined) {
        block._goalDraft.progressMarkers[idx].text = value;
    }
}

function setBlockGoalType(blockId, type) {
    const block = getBlockById(blockId);
    if (!block?._goalDraft) return;
    block._goalDraft.goalType        = type;
    block._goalDraft.progressMarkers = [];
    block._goalDraft.skillIds        = [];
    block._goalDraft.howOften        = '';
    renderBlocksOnly();
    requestAnimationFrame(() => document.getElementById(`inline-goal-title-${blockId}`)?.focus());
}

function setBlockGoalPeriod(blockId, period) {
    const block = getBlockById(blockId);
    if (!block?._goalDraft) return;
    block._goalDraft.commitmentPeriod = period;
    renderBlocksOnly();
}

function setBlockGoalHowOften(blockId, val) {
    const block = getBlockById(blockId);
    if (!block?._goalDraft) return;
    block._goalDraft.howOften = val;
    renderBlocksOnly();
    if (val === 'other') {
        requestAnimationFrame(() => document.getElementById(`inline-goal-how-often-other-${blockId}`)?.focus());
    }
}

function adjustBlockGoalHowOftenNum(blockId, delta) {
    const block = getBlockById(blockId);
    if (!block?._goalDraft) return;
    const d = block._goalDraft;
    const current = d.howOften?.startsWith('x') ? parseInt(d.howOften.slice(1)) || 1 : 1;
    const next = Math.max(1, current + delta);
    d.howOften = `x${next}`;
    const valueEl = document.querySelector(`#block-${blockId} .goal-stepper-value`);
    const minusBtn = document.querySelector(`#block-${blockId} .goal-stepper-btn`);
    if (valueEl) valueEl.textContent = next;
    if (minusBtn) minusBtn.disabled = next <= 1;
}

function addBlockGoalMarker(blockId) {
    const block = getBlockById(blockId);
    if (!block?._goalDraft) return;
    block._goalDraft.progressMarkers.push({ id: generateId(), text: '', done: false });
    renderBlocksOnly();
    requestAnimationFrame(() => {
        const list = document.getElementById(`inline-goal-markers-${blockId}`);
        const inputs = list?.querySelectorAll('.goal-marker-input');
        if (inputs?.length) inputs[inputs.length - 1].focus();
    });
}

function removeBlockGoalMarker(blockId, idx) {
    const block = getBlockById(blockId);
    if (!block?._goalDraft) return;
    block._goalDraft.progressMarkers.splice(idx, 1);
    renderBlocksOnly();
}

function filterBlockGoalSkills(blockId, query) {
    const dropdownEl = document.getElementById(`inline-goal-skill-dropdown-${blockId}`);
    if (!dropdownEl) return;
    const block = getBlockById(blockId);
    renderSkillPickerDropdown(dropdownEl, query, (topicId, label) => {
        selectBlockGoalLinkedTopic(blockId, topicId, label);
        dropdownEl.style.display = 'none';
    }, {
        includeDimensions: true,
        currentTopicId: block?._goalDraft?.skillId ? 'skill:' + block._goalDraft.skillId : (block?._goalDraft?.dimensionId || null),
    });
}

function selectBlockGoalLinkedTopic(blockId, topicId, label) {
    const block = getBlockById(blockId);
    if (!block?._goalDraft) return;
    if (topicId.startsWith('skill:')) {
        block._goalDraft.skillId     = topicId.replace('skill:', '');
        block._goalDraft.dimensionId = null;
    } else {
        block._goalDraft.skillId     = null;
        block._goalDraft.dimensionId = topicId;
    }
    const input = document.getElementById(`inline-goal-skill-input-${blockId}`);
    if (input) input.value = label;
    const dd = document.getElementById(`inline-goal-skill-dropdown-${blockId}`);
    if (dd) dd.style.display = 'none';
}

// ── Skill / dimension detection in free-text ─────────────────────────────

// Scans text for mentions of skills (via french, english, aliases) or
// dimensions. Returns up to 2 highest-confidence matches.

function detectSkillsInText(text) {
    if (!text || text.trim().length < 3) return [];
    const q = normaliseStr(text);
    const matches = [];

    // Check skills first
    for (const skill of DATA.skills) {
        const terms = [
            normaliseStr(skill.french),
            normaliseStr(skill.english),
            ...(skill.aliases || []).map(a => normaliseStr(a)),
        ];
        if (terms.some(t => t.length >= 3 && q.includes(t))) {
            matches.push({ topicId: 'skill:' + skill.id, label: skill.french, type: 'skill' });
            if (matches.length >= 2) break;
        }
    }

    // Check dimensions if no skill matched
    if (!matches.length) {
        for (const dim of DIMENSION_OPTIONS) {
            if (q.includes(normaliseStr(dim.label))) {
                matches.push({ topicId: dim.id, label: dim.label, type: 'dimension' });
                if (matches.length >= 2) break;
            }
        }
    }

    return matches;
}

function renderSkillSuggestionChips(blockId, matches) {
    const block = getBlockById(blockId);
    if (!block) return;
    const blockEl = document.getElementById(`block-${blockId}`);
    if (!blockEl) return;

    // Remove existing chips
    blockEl.querySelectorAll('.skill-suggestion-chip-row').forEach(el => el.remove());
    if (!matches.length) return;

    // Don't suggest if topic is already set to one of the matches
    const filtered = matches.filter(m => m.topicId !== block.topicId);
    if (!filtered.length) return;

    const bulletEl = blockEl.querySelector('.block-bullet-entry');
    if (!bulletEl) return;

    const row = document.createElement('div');
    row.className = 'skill-suggestion-chip-row';
    row.innerHTML = filtered.map(m => `
        <button class="skill-suggestion-chip"
                onmousedown="acceptSkillSuggestion('${blockId}', '${m.topicId}', '${m.label.replace(/'/g, "\'")}')">
            link to ${m.label} →
        </button>`).join('');

    bulletEl.insertAdjacentElement('beforebegin', row);
}

function acceptSkillSuggestion(blockId, topicId, label) {
    // Update the topic input label
    const input = document.getElementById(`topic-input-${blockId}`);
    if (input) input.value = label;
    // Remove the suggestion chips
    const blockEl = document.getElementById(`block-${blockId}`);
    if (blockEl) blockEl.querySelectorAll('.skill-suggestion-chip-row').forEach(el => el.remove());
    // Commit the topic
    updateBlockTopic(blockId, topicId);
}

function checkBlockTitleForSkills(blockId, text) {
    const matches = detectSkillsInText(text);
    renderSkillSuggestionChips(blockId, matches);
}

function normalizeBulletEntry(el) {
    // Wrap any bare text nodes in <div> so CSS ::before dashes apply to all lines.
    // Safe to call on blur (cursor is gone) or on focus before typing starts.
    Array.from(el.childNodes).forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent) {
            const div = document.createElement('div');
            el.insertBefore(div, node);
            div.appendChild(node);
        }
    });
    if (!el.querySelector(':scope > div')) {
        el.appendChild(document.createElement('div'));
    }
}

function normalizeBulletEntryOnFocus(el) {
    // Only normalize if there are bare text nodes — preserves cursor position
    // if the structure is already clean (user clicking into a filled block).
    const hasBareText = Array.from(el.childNodes).some(
        n => n.nodeType === Node.TEXT_NODE && n.textContent
    );
    if (!hasBareText && el.querySelector(':scope > div')) return;
    normalizeBulletEntry(el);
    // Place cursor at end of first div after wrapping
    const firstDiv = el.querySelector(':scope > div');
    if (firstDiv) {
        try {
            const range = document.createRange();
            range.selectNodeContents(firstDiv);
            range.collapse(false);
            window.getSelection()?.removeAllRanges();
            window.getSelection()?.addRange(range);
        } catch (_) {}
    }
}

function updateBlockBullets(blockId, el) {
    // innerText captures visible text with newlines regardless of whether the
    // browser placed content in <div> children or as bare text nodes.
    const text = (el.innerText || '').replace(/\n+$/, '');
    updateBlockField(blockId, 'text', text);
    checkBlockTitleForSkills(blockId, text);
}

function checkSessionTitleForSkills(text) {
    // For session title: suggest adding a block for detected skills
    const matches = detectSkillsInText(text);
    const hint = document.getElementById('session-name-skill-hint');
    if (!matches.length) {
        if (hint) hint.remove();
        return;
    }
    // Don't show if a block already exists for this skill
    const existing = (appState.currentSession?.blocks || []).map(b => b.topicId);
    const fresh = matches.filter(m => !existing.includes(m.topicId));
    if (!fresh.length) {
        if (hint) hint.remove();
        return;
    }
    const container = document.getElementById('session-name-input')?.closest('.session-field');
    if (!container) return;

    let el = hint || document.createElement('div');
    el.id = 'session-name-skill-hint';
    el.className = 'session-skill-hint';
    el.innerHTML = fresh.map(m => `
        <button class="skill-suggestion-chip"
                onmousedown="addBlockForSkill('${m.topicId}', '${m.label.replace(/'/g, "\'")}')">
            add ${m.label} block →
        </button>`).join('');
    if (!hint) container.appendChild(el);
}

function addBlockForSkill(topicId, label) {
    const hint = document.getElementById('session-name-skill-hint');
    if (hint) hint.remove();
    addBlock(false);
    // Set the topic on the newly added block
    const blocks = appState.currentSession?.blocks;
    if (!blocks?.length) return;
    const newBlock = blocks[blocks.length - 1];
    newBlock.topicId = topicId;
    // Update the input label after re-render
    renderBlocksOnly();
    requestAnimationFrame(() => {
        const input = document.getElementById(`topic-input-${newBlock.id}`);
        if (input) input.value = label;
    });
}



function openBlockTopicDropdown(blockId) {
    const dropdown = document.getElementById(`topic-dropdown-${blockId}`);
    const input    = document.getElementById(`topic-input-${blockId}`);
    const block    = getBlockById(blockId);
    if (!dropdown || !input || !block) return;
    renderSkillPickerDropdown(dropdown, input.value, (topicId, label) => {
        input.value = label;
        updateBlockTopic(blockId, topicId);
    }, { includeGeneral: true, currentTopicId: block.topicId });
}

function filterBlockTopics(blockId, query) {
    const dropdown = document.getElementById(`topic-dropdown-${blockId}`);
    const block    = getBlockById(blockId);
    if (!dropdown) return;
    renderSkillPickerDropdown(dropdown, query, (topicId, label) => {
        const input = document.getElementById(`topic-input-${blockId}`);
        if (input) input.value = label;
        updateBlockTopic(blockId, topicId);
    }, { includeGeneral: true, currentTopicId: block?.topicId });
}

function closeBlockTopicDropdown(blockId, delay) {
    setTimeout(() => {
        const dropdown = document.getElementById(`topic-dropdown-${blockId}`);
        const input    = document.getElementById(`topic-input-${blockId}`);
        if (!dropdown || dropdown.style.display === 'none') return;
        const block = getBlockById(blockId);
        if (block && input) {
            const topics = getBlockTopics();
            const current = topics.find(t => t.id === block.topicId);
            if (current) input.value = current.label;
        }
        dropdown.style.display = 'none';
        _skillPickerOnSelect = null;
    }, delay);
}

function updateBlockTopic(blockId, topicId) {
    const block = getBlockById(blockId);
    if (!block) return;
    block.topicId = topicId;
    sortBlocks();
    renderBlocksOnly();
}

function setBlockMode(blockId, mode) {
    const block = getBlockById(blockId);
    if (!block) return;
    block.mode = mode;
    renderBlocksOnly();
}

function setBlockSource(blockId, source) {
    const block = getBlockById(blockId);
    if (!block) return;
    // Toggle off if already selected
    block.source = block.source === source ? null : source;
    const blockEl = document.getElementById(`block-${blockId}`);
    if (!blockEl) return;
    blockEl.querySelectorAll('.block-source-chip').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.trim() === block.source);
    });
}

function toggleBlockHighlight(blockId) {
    const block = getBlockById(blockId);
    if (!block) return;
    block.isHighlight = !block.isHighlight;
    if (block.isHighlight) {
        block.previousBlockType = block.blockType || 'correction';
        block.blockType = 'highlight';
    } else {
        block.blockType = block.previousBlockType || 'correction';
        block.previousBlockType = null;
    }
    // Re-render the block so the type label and border update immediately
    const swipeRow = document.querySelector(`.swipe-row[data-block-id="${blockId}"]`);
    if (swipeRow) {
        const index = Array.from(swipeRow.parentNode.children).indexOf(swipeRow);
        const tmp = document.createElement('div');
        tmp.innerHTML = renderBlockHtml(block, index);
        const newRow = tmp.firstElementChild;
        if (newRow) swipeRow.replaceWith(newRow);
    }
}

function toggleBlockNotes(blockId) {
    const block = getBlockById(blockId);
    if (!block) return;
    block.notesOpen = !block.notesOpen;
    const blockEl = document.getElementById(`block-${block.id}`);
    if (!blockEl) return;
    const notesArea = blockEl.querySelector('.block-notes-area');
    if (!notesArea) return;
    notesArea.innerHTML = block.notesOpen || block.notes ? `
        <textarea class="session-block-textarea session-block-capped"
                  placeholder="Notes — context, rehearsal, how it felt…"
                  oninput="updateBlockField('${block.id}', 'notes', this.value); autoResizeCapped(this);"
                  >${block.notes || ''}</textarea>
        <button class="block-notes-toggle block-notes-toggle-open"
                onmousedown="toggleBlockNotes('${block.id}')">hide notes</button>
    ` : `
        <button class="block-notes-toggle"
                onmousedown="toggleBlockNotes('${block.id}')">
            ${block.notes ? `${ICONS.get('edit', 12)} notes` : '+ add notes'}
        </button>
    `;
    if (block.notesOpen) {
        const ta = notesArea.querySelector('textarea');
        ta?.focus();
    }
}

// ── Correction bullet handlers ──

function updateCorrectionBullet(blockId, ci, text) {
    const block = getBlockById(blockId);
    if (!block) return;
    if (!Array.isArray(block.corrections)) block.corrections = [];
    block.corrections[ci] = text;
}

function handleNewCorrectionBulletInput(event, blockId) {
    // Text committed on Enter or flushed on save — nothing to do here
}

function handleCorrectionBulletKey(event, blockId, ci) {
    const block = getBlockById(blockId);
    if (!block) return;

    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        const el = event.target;
        const text = el.innerText.trim();

        if (!Array.isArray(block.corrections)) block.corrections = [];
        const isNewRow = ci >= block.corrections.length;

        if (text) {
            if (isNewRow) {
                // Commit the new bullet
                block.corrections.push(text);
            } else {
                block.corrections[ci] = text;
            }
            // Re-render to show the new bullet and fresh empty row
            renderBlockBulletsInPlace(block, blockId);
            // Focus the new empty row
            requestAnimationFrame(() => {
                const container = document.getElementById(`correction-bullets-${block.id}`);
                const newRow = container?.querySelector('.correction-bullet-new .correction-bullet-input');
                newRow?.focus();
            });
        }
        // If empty new row and Enter pressed, do nothing (don't add empty bullet)
    }
    // Shift+Enter: default behaviour (new line within same bullet)
}

function deleteCorrectionBullet(blockId, ci) {
    const block = getBlockById(blockId);
    if (!block || !Array.isArray(block.corrections)) return;
    block.corrections.splice(ci, 1);
    renderBlockBulletsInPlace(block, blockId);
}

function renderBlockBulletsInPlace(block, blockId) {
    const container = document.getElementById(`correction-bullets-${block.id}`);
    if (!container) return;
    const corrList = block.corrections || [];

    container.innerHTML = corrList.map((text, ci) => `
        <div class="correction-bullet">
            <span class="correction-bullet-dash">—</span>
            <div class="correction-bullet-input-wrapper">
                <div class="correction-bullet-input"
                     contenteditable="true"
                     data-block="${blockId}"
                     data-ci="${ci}"
                     oninput="updateCorrectionBullet('${blockId}', ${ci}, this.innerText)"
                     onkeydown="handleCorrectionBulletKey(event, '${blockId}', ${ci})"
                     >${text}</div>
            </div>
            <button class="correction-bullet-delete"
                    onmousedown="deleteCorrectionBullet('${blockId}', ${ci})"
                    aria-label="Delete">${ICONS.get('x', 12)}</button>
        </div>
    `).join('') + `
        <div class="correction-bullet correction-bullet-new">
            <span class="correction-bullet-dash">—</span>
            <div class="correction-bullet-input-wrapper">
                <div class="correction-bullet-input correction-bullet-placeholder"
                     contenteditable="true"
                     data-block="${blockId}"
                     data-ci="${corrList.length}"
                     oninput="handleNewCorrectionBulletInput(event, '${blockId}')"
                     onkeydown="handleCorrectionBulletKey(event, '${blockId}', ${corrList.length})"
                     ></div>
            </div>
        </div>
    `;
}

function autoResizeCapped(el) {
    el.style.height = 'auto';
    const lineHeight = 22; // px, matches font-size * line-height
    const maxHeight = lineHeight * 3 + 20; // ~3 lines + padding
    el.style.height = Math.min(el.scrollHeight, maxHeight) + 'px';
    el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden';
}

function toggleBlockPraise(blockId) {
    // kept for backward compat — now handled by setBlockMode
    setBlockMode(blockId, 'praise');
}

function autoResizeTextarea(el) {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
}

function updateBlockField(blockId, field, value) {
    const block = getBlockById(blockId);
    if (!block) return;
    block[field] = value;
}

function removeBlock(blockId) {
    const idx = getBlockIndexById(blockId);
    if (idx === -1) return;
    appState.currentSession.blocks.splice(idx, 1);
    renderBlocksOnly();
}

function openSkillFromBlock(topicId) {
    const skillId = topicId.replace('skill:', '');
    closeSessionLogger();
    // TODO: navigate to skill detail page — skillId is now a slug e.g. 'pirouette'
    console.log('Navigate to skill:', skillId);
}

// ── Session Editor — open logger pre-filled from existing session ──
function openSessionEditor(sessionId) {
    const session = appState.sessions.find(s => s.id === sessionId);
    if (!session) return;

    // Reconstruct blocks from SessionSkill + Correction objects
    const sessionSkillRecords = appState.sessionSkills.filter(ss => ss.sessionId === sessionId);

    const blocks = sessionSkillRecords.map(ss => {
        const corrections = (ss.correctionIds || [])
            .map(id => appState.corrections.find(c => c.id === id))
            .filter(Boolean);
        return {
            id:               ss.id,
            topicId:          ss.skillId ? 'skill:' + ss.skillId : 'general',
            secondaryTopicId: ss.secondarySkillId ? 'skill:' + ss.secondarySkillId : null,
            _slotEditing:     null,
            title:            ss.blockTitle || '',
            blockType:        ss.blockType || 'correction',
            notes:            ss.notes || '',
            notesOpen:        ss.notes ? true : false,
            mode:             ss.mode || (corrections.some(c => c.type === 'praise') ? 'praise' : 'correction'),
            corrections:      corrections.map(c => c.text),
        };
    });

    // Set currentSession from existing data
    appState.currentSession = {
        id:              session.id,
        date:            session.date,
        templateId:      session.templateId,
        sessionName:     session.sessionName,
        sessionLocation: session.sessionLocation,
        classType:       session.classType,
        generalNotes:    session.notes,
        blocks,
        _isEdit:         true,   // flag so saveSession knows to overwrite not append
        _expandedBlockId: blocks[0]?.id || null,
        _addMenuOpen:    false,
    };

    // Open the overlay
    let overlay = document.getElementById('session-logger-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'session-logger-overlay';
        overlay.className = 'session-overlay';
        document.body.appendChild(overlay);
    }

    renderSessionLogger();
    document.querySelector('.fab')?.classList.remove('visible');
    document.querySelector('.bottom-nav')?.classList.remove('visible');
    requestAnimationFrame(() => overlay.classList.add('open'));
    attachSheetSwipe();
}


// ── Timeline helper — all writes go through here ──
function appendTimelineEntry({ type, objectId = null, title, body = null, date }) {
    appState.timeline = appState.timeline || [];
    appState.timeline.unshift({
        id:        generateId(),
        userId:    null,
        type,
        objectId,
        title,
        body,
        date:      date || new Date().toISOString().split('T')[0],
        createdAt: Date.now(),
    });
    storage.save('timeline', appState.timeline);
}

// ── Save ──
function saveSession() {
    const s = appState.currentSession;
    if (!s) return;

    // Flush all block-bullet-entry contenteditables — captures text that oninput
    // may not have committed (e.g. paste, IME, or tapping Save immediately).
    document.querySelectorAll('.block-bullet-entry[data-block-id]').forEach(el => {
        const blockId = el.dataset.blockId;
        const block = getBlockById(blockId);
        if (!block) return;
        const text = (el.innerText || '').replace(/\n+$/, '');
        if (text) block.text = text;
    });

    // Flush note block titles — captures custom label typed in the topic input
    // for note blocks that don't have a skill selected (topicId === 'general').
    document.querySelectorAll('[id^="topic-input-"]').forEach(el => {
        const blockId = el.id.slice('topic-input-'.length);
        const block = getBlockById(blockId);
        if (!block || block.blockType !== 'note' || block.topicId !== 'general') return;
        const val = el.value.trim();
        if (val && val !== 'General') block.title = val;
    });

    // Flush any pending new-bullet inputs — if the user typed in a correction
    // row and tapped Save without pressing Enter, capture it before processing.
    document.querySelectorAll('.correction-bullet-new .correction-bullet-input').forEach(el => {
        const text = el.innerText?.trim();
        if (!text) return;
        const blockId = el.dataset.block;
        const block = getBlockById(blockId);
        if (!block) return;
        if (!Array.isArray(block.corrections)) block.corrections = [];
        block.corrections.push(text);
        el.innerText = ''; // clear so it doesn't double-save
    });

    // Note mode: capture text from the single contenteditable
    const isNoteMode = s._mode === 'note';
    if (isNoteMode) {
        const noteEl = document.getElementById('note-editor');
        s.generalNotes = noteEl ? (noteEl.innerText || '').replace(/\n+$/, '') : '';
    }

    const now = Date.now();

    // 1. Persist the Session object (no blocks — those become SessionSkills + Corrections)
    const session = {
        id:              s.id,
        userId:          null,
        date:            s.date,
        savedAt:         now,
        templateId:      s.templateId      || null,
        sessionName:     s.sessionName     || null,
        sessionLocation: s.sessionLocation || null,
        classType:       s.classType       || null,
        teacher:         s.teacher         || null,
        venue:           s.venue           || null,
        city:            s.city            || null,
        notes:           s.generalNotes    || null,
        isNote:          isNoteMode || null,
        ...(s._reflectionGoalId ? { _goalId: s._reflectionGoalId } : {}),
    };

    if (s._isEdit) {
        // Replace existing session in place
        const idx = appState.sessions.findIndex(existing => existing.id === session.id);
        if (idx > -1) appState.sessions[idx] = session;
        // Remove old SessionSkills and their Corrections for this session
        const oldSessionSkillIds = appState.sessionSkills
            .filter(ss => ss.sessionId === session.id)
            .map(ss => ss.correctionIds || [])
            .flat();
        appState.corrections  = appState.corrections.filter(c =>
            !(c.sessionId === session.id && oldSessionSkillIds.includes(c.id)));
        appState.sessionSkills = appState.sessionSkills.filter(ss => ss.sessionId !== session.id);
        appState.skillNotes    = (appState.skillNotes || []).filter(n => n.sessionId !== session.id);
    } else {
        appState.sessions.push(session);
    }
    storage.save('sessions', appState.sessions);

    // 2. Process each block into SessionSkill + Correction objects
    let skillCount = 0;
    let correctionCount = 0;
    // Track skills with corrections for post-save promotion prompt
    const skillsWithCorrections = [];
    // Collect skillNotes entries to add after the loop (written atomically)
    const pendingSkillNotes = [];

    s.blocks.forEach(block => {
        const isSkill         = block.topicId?.startsWith('skill:');
        const skillId         = isSkill ? block.topicId.replace('skill:', '') : null;
        const skillLabel      = _slotLabel(block.topicId && block.topicId !== 'general' ? block.topicId : null) || null;
        const isSecondarySkill   = block.secondaryTopicId?.startsWith('skill:');
        const secondarySkillId   = isSecondarySkill ? block.secondaryTopicId.replace('skill:', '') : null;
        const secondarySkillLabel = _slotLabel(block.secondaryTopicId || null) || null;
        const blockCorrectionIds = [];

        // Resolve block text — new format uses block.text; legacy format uses corrections[]/praiseText/reflectionText
        const blockText = (block.text?.trim())
            || (Array.isArray(block.corrections) && block.corrections.filter(t => t?.trim()).join('\n'))
            || block.praiseText?.trim()
            || block.reflectionText?.trim()
            || '';

        const rawType = block.blockType || block.source || (block.mode === 'correction' ? 'correction' : null) || 'correction';
        const resolvedType = rawType === 'observation' ? 'note' : rawType;
        const isCorrection = resolvedType === 'correction';

        // Save all non-empty lines as Correction objects regardless of source —
        // this is what renderDetailBlockHtml reads for session detail display.
        if (blockText) {
            const lines = blockText.split('\n').map(l => l.trim()).filter(Boolean);
            lines.forEach(text => {
                const correction = {
                    id:                      generateId(),
                    userId:                  null,
                    skillId:                 skillId || null,
                    text,
                    createdAt:               now,
                    sessionId:               session.id,
                    source:                  null,
                    type:                    null,
                    isRecurring:             false,
                    isPinned:                false,
                    isResolved:              false,
                    derivedFromCorrectionId: block._derivedFromCorrectionId || null,
                    isHighlight:             !!block.isHighlight,
                    bodyTag:                 !!block.bodyTag,
                    previousBlockType:       block.previousBlockType || null,
                };
                appState.corrections.push(correction);
                blockCorrectionIds.push(correction.id);
            });
            // Only count towards the timeline "X corrections" label for correction-source blocks
            if (isCorrection) correctionCount += blockCorrectionIds.length;

            // Skill-linked observation blocks also write to skillNotes so they appear
            // in "my notes" on the skill detail page.
            if (isSkill && skillId && resolvedType === 'note') {
                pendingSkillNotes.push({
                    id:          generateId(),
                    userId:      null,
                    skillId:     skillId,
                    text:        blockText,
                    date:        session.date,
                    createdAt:   now,
                    sessionId:   session.id,
                    source:      'session',
                    isHighlight: !!block.isHighlight,
                });
            }
        }

        // SessionSkill join object — created for any block that has content,
        // not just skill-linked blocks, so general notes appear in session detail.
        if (blockText || block.notes?.trim()) {
            const sessionSkill = {
                id:                  generateId(),
                userId:              null,
                sessionId:           session.id,
                skillId:             skillId || null,
                skillLabel:          skillLabel,
                secondarySkillId:    secondarySkillId || null,
                secondarySkillLabel: secondarySkillLabel,
                notes:               block.notes?.trim() || null,
                correctionIds:       blockCorrectionIds,
                tracked:             true,
                blockTitle:          block.title?.trim() || null,
                blockType:           resolvedType,
                isHighlight:         !!block.isHighlight,
                bodyTag:             !!block.bodyTag,
                isPinned:            false,
                previousBlockType:   block.previousBlockType || null,
                teacher:             session.teacher || null,
                venue:               session.venue   || null,
                city:                session.city    || null,
            };
            appState.sessionSkills.push(sessionSkill);

            if (isSkill && skillId) {
                skillCount++;
                if (blockCorrectionIds.length > 0) skillsWithCorrections.push(skillId);
                const skill = appState.skills.find(sk => sk.id === skillId);
                if (skill) skill.flagged = true;
            }
        }
    });

    // Add session-originated skillNotes and persist all stores together
    if (pendingSkillNotes.length) {
        appState.skillNotes = appState.skillNotes || [];
        appState.skillNotes.push(...pendingSkillNotes);
    }
    // Recurring correction detection — run for every skill touched in this session
    const touchedSkillIds = [...new Set(
        s.blocks
            .filter(b => b.topicId?.startsWith('skill:'))
            .map(b => b.topicId.replace('skill:', ''))
    )];
    const sixtyDaysAgo = now - 60 * 24 * 60 * 60 * 1000;
    touchedSkillIds.forEach(sid => {
        // PLI-018 — exclude resolved corrections; if she's marked it resolved, it's addressed
        const recent = appState.corrections.filter(
            c => c.skillId === sid && c.createdAt >= sixtyDaysAgo && !c.isResolved
        );
        const sessionCount = new Set(recent.map(c => c.sessionId).filter(Boolean)).size;
        const isRecurring = recent.length >= 3 && sessionCount >= 2;
        // Apply to ALL corrections for this skill, not just recent, so stale ones
        // also get cleared when the threshold is no longer met.
        appState.corrections
            .filter(c => c.skillId === sid)
            .forEach(c => { c.isRecurring = isRecurring; });
    });

    storage.save('corrections',   appState.corrections);
    storage.save('sessionSkills', appState.sessionSkills);
    storage.save('skillNotes',    appState.skillNotes);
    persistSkillState();

    // 3b. Goal blocks — create appState.goals[] entries + SessionSkill records for session detail
    const goalBlocks = s.blocks.filter(b => b.blockType === 'goal' && b._goalDraft?.title?.trim());
    if (goalBlocks.length) {
        const sessionDateTs = new Date(s.date + 'T12:00:00').getTime();
        goalBlocks.forEach(b => {
            const d = b._goalDraft;
            const progressMarkers = (d.progressMarkers || [])
                .filter(m => m.text?.trim())
                .map(m => ({ id: generateId(), text: m.text.trim(), done: false }));
            const goalId = generateId();
            appState.goals.unshift({
                id:               goalId,
                userId:           null,
                title:            d.title.trim(),
                body:             d.body?.trim() || null,
                createdAt:        sessionDateTs,
                dueDate:          null,
                skillId:          d.skillId       || null,
                dimensionId:      d.dimensionId   || null,
                category:         null,
                correctionIds:    [],
                milestones:       [],
                status:           'active',
                completedAt:      null,
                pausedAt:         null,
                letGoAt:          null,
                goalType:         d.goalType         || null,
                commitmentPeriod: d.commitmentPeriod || null,
                progressMarkers,
                howOften:         d.howOften || null,
                skillIds:         [],
            });
            // SessionSkill record links this goal to the session for session detail display
            appState.sessionSkills.push({
                id:                generateId(),
                userId:            null,
                sessionId:         session.id,
                skillId:           null,
                notes:             null,
                correctionIds:     [],
                tracked:           true,
                blockType:         'goal',
                goalId:            goalId,
                isHighlight:       !!b.isHighlight,
                bodyTag:           false,
                isPinned:          false,
                previousBlockType: null,
                teacher:           session.teacher || null,
                venue:             session.venue   || null,
                city:              session.city    || null,
            });
        });
        storage.save('goals',        appState.goals);
        storage.save('sessionSkills', appState.sessionSkills);
    }

    // 3a. If this is a goal reflection, update the goal and skip the timeline entry
    if (s._reflectionGoalId) {
        const reflGoal = appState.goals.find(g => g.id === s._reflectionGoalId);
        if (reflGoal) {
            reflGoal.reflection = session.notes || '';
            reflGoal.reflectionSessionId = session.id;
            storage.save('goals', appState.goals);
        }
        appState.currentSession = null;
        closeSessionLogger();
        if (appState.currentScreen === 'profile') initProfile();
        return;
    }

    // 3. Write timeline entry (new sessions only — edits don't create duplicate entries)
    if (!s._isEdit) {
        const template = appState.sessionTemplates.find(t => t.id === s.templateId);
        if (isNoteMode) {
            const firstLine = (session.notes || '').split('\n')[0].trim() || 'Note';
            appendTimelineEntry({
                type:     'note',
                objectId: session.id,
                title:    firstLine,
                date:     session.date,
            });
        } else {
            const sessionLabel = session.sessionName || template?.name || 'Session';
            const classTypeLabel = session.classType
                ? (ALL_CLASS_TYPES.find(ct => ct.id === session.classType)?.label || session.classType)
                : null;

            const bodyParts = [
                classTypeLabel,
                skillCount      ? `${skillCount} skill${skillCount !== 1 ? 's' : ''}`               : null,
                correctionCount ? `${correctionCount} correction${correctionCount !== 1 ? 's' : ''}` : null,
            ].filter(Boolean);

            appendTimelineEntry({
                type:     'session',
                objectId: session.id,
                title:    sessionLabel,
                body:     bodyParts.join(' · ') || null,
                date:     session.date,
            });
        }
    }

    // Getting started completion hooks
    markGettingStarted('logClass');
    if (s.blocks && s.blocks.some(b => b.notes?.trim() || b.corrections?.length > 0)) {
        markGettingStarted('saveNote');
    }

    appState.currentSession = null;
    closeSessionLogger();

    if (appState.currentScreen === 'profile') initProfile();
    if (appState.currentScreen === 'goals-screen') renderGoalsScreen();
    if (appState.currentScreen?.startsWith('session-detail-')) {
        showSessionDetail(session.id);
    }

    // Post-save contextual prompt — non-blocking, shown after logger closes
    if (!s._isEdit) {
        const uniqueSkills = [...new Set(skillsWithCorrections)];
        setTimeout(() => evaluatePostSavePrompt(uniqueSkills), 400);
    }
}

/* ── Contextual prompt helpers ────────────────────────────────── */

function isPromptSuppressed(type) {
    try {
        const dismissed = storage.load('promptsDismissed') || {};
        const ts = dismissed[type];
        return ts && Date.now() - ts < 7 * 24 * 60 * 60 * 1000;
    } catch { return false; }
}

function suppressPrompt(type) {
    try {
        const dismissed = storage.load('promptsDismissed') || {};
        dismissed[type] = Date.now();
        storage.save('promptsDismissed', dismissed);
    } catch {}
}

// config: { body, primaryLabel, primaryFn (JS string), suppressKey }
function showConditionTimelinePrompt(condition, eventType) {
    if (document.getElementById('post-save-prompt')) return;
    const isActivated = eventType === 'condition-activated';
    const body = isActivated
        ? `condition added: ${condition.name}. save as a timeline event?`
        : `${condition.name} archived. save as a timeline event?`;
    const titleText = isActivated
        ? `condition: ${condition.name}`
        : `condition resolved: ${condition.name}`;

    const prompt = document.createElement('div');
    prompt.id = 'post-save-prompt';
    prompt.className = 'post-save-prompt';
    prompt.innerHTML = `
        <div class="post-save-prompt-inner">
            <button class="post-save-dismiss" onmousedown="this.closest('#post-save-prompt').remove()" ontouchend="event.preventDefault();this.closest('#post-save-prompt').remove()">${ICONS.get('x', 14)}</button>
            <div class="post-save-body">${body}</div>
            <div class="post-save-actions">
                <button class="post-save-btn" id="condition-timeline-yes">yes</button>
                <button class="post-save-btn-muted" onmousedown="this.closest('#post-save-prompt').remove()" ontouchend="event.preventDefault();this.closest('#post-save-prompt').remove()">not now</button>
            </div>
        </div>
    `;
    document.body.appendChild(prompt);

    const yesBtn = document.getElementById('condition-timeline-yes');
    const doSave = () => {
        appendTimelineEntry({
            type:     eventType,
            objectId: condition.id,
            title:    titleText,
            body:     condition.description || null,
            date:     condition.statusChangedDate || new Date().toISOString().split('T')[0],
        });
        prompt.remove();
    };
    yesBtn.onmousedown = doSave;
    yesBtn.ontouchend  = (e) => { e.preventDefault(); doSave(); };

    setTimeout(() => prompt.remove(), 8000);
}

function showContextualPrompt({ body, primaryLabel, primaryFn, suppressKey }) {
    if (document.getElementById('post-save-prompt')) return;

    const prompt = document.createElement('div');
    prompt.id = 'post-save-prompt';
    prompt.className = 'post-save-prompt';

    prompt.innerHTML = `
        <div class="post-save-prompt-inner">
            <button class="post-save-dismiss" onclick="suppressPrompt('${suppressKey}'); this.closest('#post-save-prompt').remove()">${ICONS.get('x', 14)}</button>
            <div class="post-save-body">${body}</div>
            <div class="post-save-actions">
                ${primaryLabel ? `<button class="post-save-btn" onclick="suppressPrompt('${suppressKey}'); document.getElementById('post-save-prompt')?.remove(); ${primaryFn}">${primaryLabel}</button>` : ''}
                <button class="post-save-btn-muted" onclick="suppressPrompt('${suppressKey}'); this.closest('#post-save-prompt').remove()">not now</button>
            </div>
        </div>
    `;

    document.body.appendChild(prompt);
    setTimeout(() => prompt?.remove(), 8000);
}

// Evaluates all 5 priority conditions and fires the highest-qualifying prompt.
function evaluatePostSavePrompt(skillsWithCorrections) {
    const today = new Date();

    // P1: Active goal expiring within 3 days
    if (!isPromptSuppressed('expiring-goal')) {
        const cutoff = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
        const g = (appState.goals || []).find(goal => {
            if (goal.completed) return false;
            if (!/^\d{4}-\d{2}-\d{2}$/.test(goal.commitmentPeriod)) return false;
            const d = new Date(goal.commitmentPeriod + 'T00:00:00');
            return d >= today && d <= cutoff;
        });
        if (g) {
            const skill = g.skillId ? DATA.skills.find(s => s.id === g.skillId) : null;
            showContextualPrompt({
                body: `your ${skill?.french || g.title} goal expires soon. still working on it?`,
                primaryLabel: 'view goal',
                primaryFn: `openGoalEditor('${g.id}')`,
                suppressKey: 'expiring-goal'
            });
            return;
        }
    }

    // P2: Recurring correction (3+) for a skill with no active goal
    if (!isPromptSuppressed('correction-goal') && skillsWithCorrections.length > 0) {
        const skillId = skillsWithCorrections.find(id => {
            if (appState.corrections.filter(c => c.skillId === id).length < 3) return false;
            return !(appState.goals || []).some(g => !g.completed && g.skillId === id);
        });
        if (skillId) {
            const skill = DATA.skills.find(s => s.id === skillId);
            showContextualPrompt({
                body: `session saved. you noted ${skill?.french || skillId}, set a goal around it?`,
                primaryLabel: 'set a goal',
                primaryFn: `openGoalCreatorForSkill('${skillId}')`,
                suppressKey: 'correction-goal'
            });
            return;
        }
    }

    // P3: Completed goal with no reflection note
    if (!isPromptSuppressed('completed-goal')) {
        const g = (appState.goals || []).find(goal => goal.status === 'completed' && !goal.reflection);
        if (g) {
            const skill = g.skillId ? DATA.skills.find(s => s.id === g.skillId) : null;
            showContextualPrompt({
                body: `you completed your ${skill?.french || g.title} goal. anything to note?`,
                primaryLabel: 'add a note',
                primaryFn: `openGoalEditor('${g.id}')`,
                suppressKey: 'completed-goal'
            });
            return;
        }
    }

    // P4: Bookmarked pointer not revisited — skip (learnBookmarks not yet implemented)

    // P5: No session in 14+ days (active training state only)
    if (!isPromptSuppressed('no-recent-session') && appState.trainingState === 'active') {
        const sorted = [...(appState.sessions || [])].sort((a, b) => b.id - a.id);
        if (sorted.length >= 2) {
            const daysSince = Math.round((today - new Date(sorted[1].date + 'T00:00:00')) / 86400000);
            if (daysSince >= 14) {
                showContextualPrompt({
                    body: "it's been a while. anything to log?",
                    primaryLabel: 'log a session',
                    primaryFn: 'openSessionLogger()',
                    suppressKey: 'no-recent-session'
                });
            }
        }
    }
}



function openFabActionSheet() {
    const sheet = document.getElementById('fab-action-sheet');
    const fab   = document.querySelector('.fab');
    if (!sheet) return;
    sheet.style.display = 'flex';
    requestAnimationFrame(() => {
        sheet.classList.add('open');
        fab?.classList.add('open');
    });
}

function closeFabActionSheet() {
    const sheet = document.getElementById('fab-action-sheet');
    const fab   = document.querySelector('.fab');
    if (!sheet) return;
    sheet.classList.remove('open');
    fab?.classList.remove('open');
    sheet.addEventListener('transitionend', () => {
        sheet.style.display = 'none';
    }, { once: true });
}

function showReflectionPrompt() {
    // Don't show if another prompt is already visible
    if (document.getElementById('post-save-prompt')) return;

    const existing = document.getElementById('reflection-prompt');
    if (existing) existing.remove();

    const prompt = document.createElement('div');
    prompt.id = 'reflection-prompt';
    prompt.className = 'post-save-prompt';

    prompt.innerHTML = `
        <div class="post-save-prompt-inner">
            <button class="post-save-dismiss" onclick="document.getElementById('reflection-prompt').remove()">${ICONS.get('x', 14)}</button>
            <div class="post-save-body">Session saved. Want to capture a thought?</div>
            <div class="post-save-actions">
                <button class="post-save-btn" onclick="document.getElementById('reflection-prompt').remove(); showReflectionOverlay();">
                    add a reflection
                </button>
                <button class="post-save-btn post-save-btn-muted" onclick="document.getElementById('reflection-prompt').remove()">
                    not now
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(prompt);
    setTimeout(() => prompt?.remove(), 8000);
}

function showReflectionOverlay() {
    const existing = document.getElementById('reflection-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'reflection-overlay';
    overlay.className = 'session-overlay';
    overlay.innerHTML = `
        <div class="session-logger-sheet">
            <div class="session-sheet-handle"></div>

            <div class="session-logger-header">
                <div>
                    <div class="session-logger-eyebrow">Reflection</div>
                    <h2 class="session-logger-title">What stood out today?</h2>
                </div>
                <button class="session-close-btn" onclick="closeReflectionOverlay()">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                        <line x1="4" y1="4" x2="14" y2="14"/><line x1="14" y1="4" x2="4" y2="14"/>
                    </svg>
                </button>
            </div>

            <div class="session-logger-body">
                <div class="session-field">
                    <textarea class="session-block-textarea session-block-capped"
                              id="reflection-textarea"
                              placeholder="e.g. Ballet is so hard today · I felt like I was flying · Pirouettes suddenly clicked"
                              rows="4"
                              oninput="autoResizeCapped(this)"
                              style="min-height: 120px;"></textarea>
                    <p class="session-field-hint" style="margin-top: var(--sp-sm);">
                        Saved as a personal note — just for you.
                    </p>
                </div>
            </div>

            <div class="session-logger-footer">
                <button class="btn-large session-save-btn" onclick="saveReflection()">save reflection</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('open'));

    // Focus the textarea after animation
    setTimeout(() => document.getElementById('reflection-textarea')?.focus(), 300);
}

function closeReflectionOverlay() {
    const overlay = document.getElementById('reflection-overlay');
    if (!overlay) return;
    overlay.classList.remove('open');
    overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
}

function editTimelineNote(noteId) {
    const note = (appState.skillNotes || []).find(n => n.id === noteId);
    if (!note) return;

    const existing = document.getElementById('edit-note-overlay');
    if (existing) existing.remove();

    const isReflection = note.isReflection;
    const overlay = document.createElement('div');
    overlay.id = 'edit-note-overlay';
    overlay.className = 'session-overlay';
    overlay.innerHTML = `
        <div class="session-logger-sheet">
            <div class="session-sheet-handle"></div>
            <div class="session-logger-header">
                <div>
                    <div class="session-logger-eyebrow">${isReflection ? 'Reflection' : 'Praise'}</div>
                    <h2 class="session-logger-title">Edit note</h2>
                </div>
                <button class="session-close-btn" onmousedown="document.getElementById('edit-note-overlay')?.remove()">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                        <line x1="4" y1="4" x2="14" y2="14"/><line x1="14" y1="4" x2="4" y2="14"/>
                    </svg>
                </button>
            </div>
            <div class="session-logger-body">
                <div class="session-field">
                    <textarea class="session-block-textarea session-block-capped"
                              id="edit-note-textarea"
                              oninput="autoResizeCapped(this)"
                              style="min-height: 100px;">${note.text}</textarea>
                </div>
            </div>
            <div class="session-logger-footer">
                <button class="btn-large session-save-btn" onmousedown="saveTimelineNoteEdit('${noteId}')">save</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('open'));
    setTimeout(() => {
        const ta = document.getElementById('edit-note-textarea');
        if (ta) { ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length); }
    }, 300);
}

function saveTimelineNoteEdit(noteId) {
    const text = document.getElementById('edit-note-textarea')?.value?.trim();
    if (!text) return;
    const note = (appState.skillNotes || []).find(n => n.id === noteId);
    if (!note) return;
    note.text = text;
    storage.save('skillNotes', appState.skillNotes);
    document.getElementById('edit-note-overlay')?.remove();
    if (appState.currentScreen === 'profile') initProfile();
}

function deleteTimelineNote(noteId) {
    if (!confirm('Delete this entry?')) return;
    appState.skillNotes = (appState.skillNotes || []).filter(n => n.id !== noteId);
    storage.save('skillNotes', appState.skillNotes);
    if (appState.currentScreen === 'profile') initProfile();
}

function saveReflection() {
    const text = document.getElementById('reflection-textarea')?.value?.trim();
    if (!text) {
        closeReflectionOverlay();
        return;
    }

    appState.skillNotes = appState.skillNotes || [];
    appState.skillNotes.push({
        id:           generateId(),
        userId:       null,
        skillId:      null,          // session-level reflection, not skill-specific
        text,
        date:         new Date().toISOString().split('T')[0],
        createdAt:    Date.now(),
        isReflection: true,
    });
    storage.save('skillNotes', appState.skillNotes);

    closeReflectionOverlay();
}


// ── Getting started helpers ──
function getGettingStarted() {
    return storage.load('gettingStarted') || { logClass: false, saveNote: false, setGoal: false, tryPointer: false, exploreLearn: false };
}

function markGettingStarted(key) {
    const state = getGettingStarted();
    if (state[key]) return;
    state[key] = true;
    storage.save('gettingStarted', state);
    if (appState.currentScreen === 'barre-screen') showBarreScreen();
}

function openLearnPointers() {
    markGettingStarted('tryPointer');
    navigateTo('learn');
}

// ── The Barre ──

function renderBarreHeroCard() {
    if (appState.trainingState === 'resting') {
        return `
            <div class="profile-action-card hero" onclick="openSessionLogger()">
                <div class="profile-action-label" style="font-variant:small-caps;color:var(--ink-5)">taking a break</div>
                <div class="profile-action-description">Anything worth noting while you're away?</div>
                <div class="profile-action-arrow">log now →</div>
            </div>`;
    }
    if (appState.trainingState === 'recovering') {
        return `
            <div class="profile-action-card hero" onclick="openSessionLogger()">
                <div class="profile-action-label" style="font-variant:small-caps;color:var(--ink-5)">focusing on recuperating</div>
                <div class="profile-action-description">You can still log anything useful. Physio notes, what you can work on, things to remember.</div>
                <div class="profile-action-arrow">log now →</div>
            </div>`;
    }

    const today = new Date().toISOString().split('T')[0];
    const sessions = appState.sessions || [];
    const loggedToday = sessions.some(s => s.date === today);
    const lastSession = sessions.length
        ? sessions.slice().sort((a, b) => (b.savedAt || 0) - (a.savedAt || 0))[0]
        : null;
    const daysSince = lastSession
        ? Math.floor((Date.now() - (lastSession.savedAt || Date.now())) / 86400000)
        : null;

    if (loggedToday) {
        const activeGoals = (appState.goals || []).filter(g => g.status === 'active');
        if (activeGoals.length > 0) {
            // Surface the most recently touched active goal
            const scored = activeGoals.map(goal => {
                let lastActivity = goal.updatedAt || goal.createdAt || 0;
                if (goal.skillId) {
                    (appState.sessionSkills || [])
                        .filter(ss => ss.skillId === goal.skillId)
                        .forEach(ss => {
                            const sess = (appState.sessions || []).find(s => s.id === ss.sessionId);
                            if (sess) lastActivity = Math.max(lastActivity, sess.savedAt || 0);
                        });
                }
                return { goal, lastActivity };
            });
            const topGoal = scored.sort((a, b) => b.lastActivity - a.lastActivity)[0].goal;
            return `
                <div class="profile-action-card hero" onclick="navigateTo('goals')">
                    <div class="profile-action-label">TODAY</div>
                    <div class="profile-action-title">${escapeHtml(topGoal.title)}</div>
                    <div class="profile-action-arrow">view goals →</div>
                </div>`;
        }
        return `
            <div class="profile-action-card hero" onclick="openGoalCreator()">
                <div class="profile-action-label">TODAY</div>
                <div class="profile-action-title">Session logged</div>
                <div class="profile-action-description">Add a goal to give your training direction.</div>
                <div class="profile-action-arrow">set a goal →</div>
            </div>`;
    } else if (!lastSession) {
        return `
            <div class="profile-action-card hero" onclick="openSessionLogger()">
                <div class="profile-action-label">GET STARTED</div>
                <div class="profile-action-title">Did you go today?</div>
                <div class="profile-action-description">Log your first session — corrections, what you worked on, how it felt.</div>
                <div class="profile-action-arrow">log a session →</div>
            </div>`;
    } else if (daysSince !== null && daysSince > 13) {
        return `
            <div class="profile-action-card hero" onclick="openSessionLogger()">
                <div class="profile-action-label">LAST SESSION · ${daysSince} DAY${daysSince !== 1 ? 'S' : ''} AGO</div>
                <div class="profile-action-title">Did you go today?</div>
                <div class="profile-action-description">Anything worth logging?</div>
                <div class="profile-action-arrow">log a session →</div>
            </div>`;
    } else {
        const todayDow = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][new Date().getDay()];
        const predictedTemplate = (appState.sessionTemplates || []).find(t => t.days && t.days.includes(todayDow)) || null;
        const suppressedUntil = storage.load('predictiveHeroSuppressed');
        const today = new Date().toISOString().split('T')[0];
        const isSuppressed = suppressedUntil === today;

        if (predictedTemplate && !isSuppressed) {
            return `
                <div class="profile-action-card hero" id="predictive-hero" onclick="openSessionLogger()">
                    <div class="profile-action-label">${predictedTemplate.name ? escapeHtml(predictedTemplate.name).toUpperCase() : 'TODAY'}</div>
                    <div class="profile-action-title">Did you go today?</div>
                    <div class="profile-action-arrow">log a session →</div>
                </div>`;
        }

        return `
            <div class="profile-action-card hero" onclick="openSessionLogger()">
                <div class="profile-action-label">AFTER CLASS</div>
                <div class="profile-action-title">Did you go today?</div>
                <div class="profile-action-description">Record corrections and what you worked on while they're fresh.</div>
                <div class="profile-action-arrow">log a session →</div>
            </div>`;
    }
}

function dismissPredictiveHero() {
    const today = new Date().toISOString().split('T')[0];
    storage.save('predictiveHeroSuppressed', today);
    showBarreScreen();
}

function showBarreScreen() {
    let screen = document.getElementById('barre-screen');
    if (!screen) {
        screen = document.createElement('div');
        screen.className = 'screen';
        screen.id = 'barre-screen';
        document.querySelector('.app-container').appendChild(screen);
    }

    const focusedSkills = appState.skills.filter(s => s.flagged);
    const displaySkills = focusedSkills.slice(0, 3);
    const nudge = computeFocusNudge();
    const nudgeHtml = nudge ? `
        <div class="focus-nudge" id="focus-nudge">
            <p class="focus-nudge-text">You've been working a lot on <strong>${nudge.skillX.french}</strong>. Is <strong>${nudge.skillY.french}</strong> still in focus?</p>
            <div class="focus-nudge-actions">
                <button onmousedown="dismissFocusNudge('${nudge.skillX.id}','${nudge.skillY.id}',true)">yes, keep it</button>
                <button onmousedown="dismissFocusNudge('${nudge.skillX.id}','${nudge.skillY.id}',false)">remove it</button>
            </div>
        </div>` : '';

    // Level badge — show persona name if set, otherwise level label
    const LEVEL_NAMES = { duckling: 'Duckling', deer: 'Deer', swan: 'Swan', firebird: 'Firebird',
                          beginner: 'Duckling', elementary: 'Duckling', improver: 'Deer',
                          intermediate: 'Swan', 'upper-intermediate': 'Swan', advanced: 'Firebird' };
    const badgeText = appState.persona
        ? (LEVEL_NAMES[appState.persona] || null)
        : (appState.level && appState.level !== 'not-assessed' ? (LEVEL_NAMES[appState.level] || null) : null);
    const levelBadgeHtml = badgeText ? `<span class="barre-level-badge">${badgeText}</span>` : '';

    // Getting started section
    const gsState = getGettingStarted();
    const gsAllDone = Object.values(gsState).every(Boolean);
    const showGettingStarted = !!appState.level && !gsAllDone;

    const GS_CARDS = [
        { key: 'logClass',     title: 'Log your first class',  body: 'Notes while they\'re fresh stay with you.',           onclick: 'openSessionLogger()' },
        { key: 'saveNote',     title: 'Save a note',           body: 'Something your teacher said is worth keeping.',       onclick: 'openSessionLogger()' },
        { key: 'setGoal',      title: 'Set a goal',            body: 'Give your training a direction.',                     onclick: 'openGoalCreator()' },
        { key: 'tryPointer',   title: 'Try a pointer',         body: 'Find out what\'s actually holding you back.',         onclick: 'openLearnPointers()' },
        { key: 'exploreLearn', title: 'Explore Learn',         body: 'Skills, musicality, pointers, and more.',             onclick: 'navigateTo(\'learn\')' },
    ];

    const gettingStartedHtml = showGettingStarted ? `
        <div class="barre-section-header">
            <span class="barre-section-label">get started</span>
        </div>
        <div class="getting-started-carousel">
            ${GS_CARDS.map(card => {
                const done = gsState[card.key];
                return `
                <div class="getting-started-card${done ? ' done' : ''}" ${done ? '' : `onclick="${card.onclick}"`}>
                    ${done
                        ? `<svg class="gs-tick" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--sage)" stroke-width="2.5" stroke-linecap="round"><polyline points="3 8 6.5 11.5 13 5"/></svg>`
                        : ''
                    }
                    <div class="gs-card-title${done ? ' done' : ''}">${card.title}</div>
                    ${done ? '' : `<div class="gs-card-body">${card.body}</div>`}
                </div>`;
            }).join('')}
        </div>
    ` : '';

    // Corrections in focus
    const inFocusCollapsed = !!(appState.collapsedSections || {}).inFocus;
    let activeSkillsHtml = '';
    if (focusedSkills.length > 0) {
        activeSkillsHtml = `
            <div class="barre-section-header">
                <span class="barre-section-label barre-collapsible-label" onclick="toggleBarreSection('inFocus')">in focus${inFocusCollapsed ? ' · ' + focusedSkills.length : ''}</span>
                ${!inFocusCollapsed ? `<div style="display:flex;align-items:center;gap:var(--sp-md);">
                    <span class="barre-section-count">${focusedSkills.length}</span>
                    ${focusedSkills.length > 3 ? '<button class="barre-see-all-btn" onclick="showFocusSkillsSheet()">see all →</button>' : ''}
                </div>` : ''}
            </div>
            ${!inFocusCollapsed ? `
            <div style="padding: 0 var(--sp-lg); margin-bottom: var(--sp-md);">
                <div style="display:flex;gap:var(--sp-xs);margin-bottom:var(--sp-md);">
                    <button class="skill-corr-filter barre-focus-filter active" onmousedown="filterBarreSkills('all', this)">All</button>
                    <button class="skill-corr-filter barre-focus-filter" onmousedown="filterBarreSkills('recurring', this)">Recurring</button>
                </div>
                <div style="display: flex; flex-direction: column; gap: var(--sp-sm);" id="active-skills-list">
                    ${renderActiveSkillsList(displaySkills)}
                </div>
            </div>` : ''}
        `;
    }

    const savedLearningHtml = renderSavedFromLearnSection();

    screen.innerHTML = `
        <div class="barre-header">
            <h1>The Barre</h1>
            ${levelBadgeHtml}
        </div>
        <div style="padding: 0 var(--sp-lg); margin-bottom: var(--sp-xl);">
            ${renderBarreHeroCard()}
        </div>
        ${nudgeHtml}
        ${gettingStartedHtml}
        ${activeSkillsHtml}
        ${savedLearningHtml}
        <div class="barre-section-header">
            <span class="barre-section-label">recent activity</span>
            <button class="barre-see-all-btn" onclick="showBarreTimelineSheet()">see all →</button>
        </div>
        <div style="padding: 0 var(--sp-lg); margin-bottom: var(--sp-xl);">
            <div id="barre-timeline-inline"></div>
        </div>
        <div style="height: 120px;"></div>
    `;
    showScreen('barre-screen');
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Populate inline timeline
    const inlineTimeline = document.getElementById('barre-timeline-inline');
    if (inlineTimeline) {
        const recentEntries = buildTimelineEntries().slice(0, 3);
        inlineTimeline.innerHTML = recentEntries.length > 0
            ? recentEntries.map(renderTimelineEntry).join('')
            : '<p class="learn-empty">No activity yet \u2014 log your first session.</p>';
    }

    // Attach swipe-to-remove on active skill cards
    attachBarreFocusSwipes();

    // Attach swipe-to-dismiss on predictive hero card
    const predictiveHero = document.getElementById('predictive-hero');
    if (predictiveHero) {
        let startX = null;
        predictiveHero.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
        predictiveHero.addEventListener('touchend', e => {
            if (startX === null) return;
            const dx = e.changedTouches[0].clientX - startX;
            startX = null;
            if (Math.abs(dx) > 60) dismissPredictiveHero();
        }, { passive: true });
    }
}

function toggleBarreSection(key) {
    appState.collapsedSections = appState.collapsedSections || {};
    appState.collapsedSections[key] = !appState.collapsedSections[key];
    storage.save('collapsedSections', appState.collapsedSections);
    showBarreScreen();
}

function renderSavedFromLearnSection() {
    const bookmarks = appState.learnBookmarks || [];
    if (!bookmarks.length) return '';

    const collapsed = !!(appState.collapsedSections || {}).savedLearning;
    const count = bookmarks.length;

    const cardsHtml = bookmarks.map(b => renderSavedFromLearnCard(b)).join('');

    return `
        <div class="barre-section-header">
            <span class="barre-section-label barre-collapsible-label" onclick="toggleBarreSection('savedLearning')">saved from learn${collapsed ? ' · ' + count : ''}</span>
            ${!collapsed ? `<span class="barre-section-count">${count}</span>` : ''}
        </div>
        ${!collapsed ? `
        <div class="saved-learning-carousel">
            ${cardsHtml}
        </div>` : ''}
    `;
}

function renderSavedFromLearnCard(b) {
    const pointerSection = DATA.learnSections.find(s => s.id === 'pointers');

    let name = b.itemId;
    let typeLabel = 'key point';
    let action = '';
    let connectorsHtml = '';

    if (b.pageType === 'skill') {
        const skill = DATA.skills.find(s => s.id === b.itemId);
        name = skill?.french || b.itemId;
        typeLabel = 'skill';
        action = `openSavedLearningItem('skill','${b.itemId.replace(/'/g, "\\'")}')`;

        const goalsCount = (appState.goals || []).filter(g =>
            !g.completedAt && g.status !== 'completed' && g.skillId === b.itemId
        ).length;
        const corrCount = (appState.corrections || []).filter(c => c.skillId === b.itemId).length;
        const parts = [];
        if (goalsCount) parts.push(goalsCount + (goalsCount === 1 ? ' goal' : ' goals'));
        if (corrCount)  parts.push(corrCount + (corrCount === 1 ? ' correction' : ' corrections'));
        if (parts.length) connectorsHtml = `<span class="active-skill-date">${parts.join(' · ')}</span>`;

    } else if (b.pageType === 'pointer') {
        const pointer = pointerSection?.items.find(p => p.name === b.itemId);
        name = pointer?.name || b.itemId;
        typeLabel = 'pointer';
        const idx = pointer ? pointerSection.items.indexOf(pointer) : -1;
        if (idx > -1) action = `openSavedLearningItem('pointer','${b.itemId.replace(/'/g, "\\'")}')`;

    } else {
        typeLabel = b.pageType;
        action = `openSavedLearningItem('${b.pageType}','${b.itemId.replace(/'/g, "\\'")}')`;
    }

    return `
        <div class="saved-learning-card" ${action ? `onclick="${action}"` : ''}>
            <div class="sl-card-type">${typeLabel}</div>
            <div class="sl-card-name">${name}</div>
            ${connectorsHtml}
        </div>`;
}

function openSavedLearningItem(pageType, itemId) {
    pushNavHistory();
    if (pageType === 'skill') {
        showSkillKnowledgePage(itemId);
    } else if (pageType === 'pointer') {
        const section = DATA.learnSections.find(s => s.id === 'pointers');
        const idx = section ? section.items.findIndex(p => p.name === itemId) : -1;
        if (idx > -1) showPointerDetail(idx);
        else navigateTo('learn');
    } else {
        navigateTo('learn');
        showLearnDetail(pageType, itemId);
    }
}

function renderActiveSkillsList(skills) {
    return skills.map(skill => {
        const skillCorrections = appState.corrections
            .filter(c => c.skillId === skill.id)
            .sort((a, b) => b.createdAt - a.createdAt);
        const isRecurring = skillCorrections.some(c => c.isRecurring);
        const lastSessionSkill = appState.sessionSkills
            .filter(ss => ss.skillId === skill.id)
            .sort((a, b) => {
                const sa = appState.sessions.find(s => s.id === a.sessionId);
                const sb = appState.sessions.find(s => s.id === b.sessionId);
                return (sb?.date || '').localeCompare(sa?.date || '');
            })[0];
        const lastSession = lastSessionSkill
            ? appState.sessions.find(s => s.id === lastSessionSkill.sessionId)
            : null;
        const visibleCorrections = skillCorrections.slice(0, 3);
        const hasMore = skillCorrections.length > 3;
        const correctionsHtml = visibleCorrections.map((c, i) => {
            const isLast = i === visibleCorrections.length - 1;
            const truncate = isLast && hasMore ? ' active-skill-correction--truncate' : '';
            return `<div class="active-skill-correction${truncate}">&ldquo;<em>${c.text}</em>&rdquo;</div>`;
        }).join('');
        return `
        <div class="swipe-row" data-skill-id="${skill.id}">
            <div class="swipe-action-left swipe-action-remove">
                ${ICONS.get('x', 16)}
                remove
            </div>
            <div class="swipe-content">
                <div class="active-skill-card${isRecurring ? ' active-skill-recurring' : ''}" onclick="showSkillDetail('${skill.id}', 'barre-screen')">
                    <div class="active-skill-top">
                        <div class="active-skill-name">${skill.french}</div>
                        <div class="active-skill-arrow">&#x203A;</div>
                    </div>
                    ${correctionsHtml}
                    <div class="active-skill-footer">
                        ${lastSession ? `<span class="active-skill-date">Last worked: ${formatTimelineDate(lastSession.date)}</span>` : ''}
                    </div>
                </div>
            </div>
        </div>`;
    }).join('');
}

function attachBarreFocusSwipes() {
    const screen = document.getElementById('barre-screen');
    screen?.querySelectorAll('.swipe-row[data-skill-id]').forEach(row => {
        attachSwipe(row, {
            onLeft: () => {
                const skillId = row.dataset.skillId;
                const skill = appState.skills.find(s => s.id === skillId);
                if (skill) {
                    skill.flagged = false;
                    skill.tracked = false;
                    persistSkillState();
                }
                setTimeout(() => showBarreScreen(), 320);
            }
        });
    });
}

function filterBarreSkills(filter, btn) {
    document.querySelectorAll('.barre-focus-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const displaySkills = appState.skills.filter(s => s.flagged).slice(0, 3);
    const list = document.getElementById('active-skills-list');
    if (!list) return;

    if (filter === 'recurring') {
        const recurring = displaySkills.filter(skill =>
            appState.corrections.some(c => c.skillId === skill.id && c.isRecurring)
        );
        if (!recurring.length) {
            list.innerHTML = `<p style="color:var(--ink-5);font-size:var(--fs-small);font-style:italic;padding:var(--sp-sm) 0;">no recurring corrections yet</p>`;
            return;
        }
        list.innerHTML = renderActiveSkillsList(recurring);
    } else {
        list.innerHTML = renderActiveSkillsList(displaySkills);
    }
    attachBarreFocusSwipes();
}

function showFocusSkillsSheet() {
    const existing = document.getElementById('focus-skills-sheet');
    if (existing) existing.remove();

    const focusedSkills = appState.skills.filter(s => s.flagged);
    if (!focusedSkills.length) return;

    const cardsHtml = focusedSkills.map(skill => {
        const skillCorrections = appState.corrections
            .filter(c => c.skillId === skill.id)
            .sort((a, b) => b.createdAt - a.createdAt);
        const lastSessionSkill = appState.sessionSkills
            .filter(ss => ss.skillId === skill.id)
            .sort((a, b) => {
                const sa = appState.sessions.find(s => s.id === a.sessionId);
                const sb = appState.sessions.find(s => s.id === b.sessionId);
                return (sb?.date || '').localeCompare(sa?.date || '');
            })[0];
        const lastSession = lastSessionSkill
            ? appState.sessions.find(s => s.id === lastSessionSkill.sessionId)
            : null;
        const visibleCorrections = skillCorrections.slice(0, 3);
        const hasMore = skillCorrections.length > 3;
        const correctionsHtml = visibleCorrections.map((c, i) => {
            const isLast = i === visibleCorrections.length - 1;
            const truncate = isLast && hasMore ? ' active-skill-correction--truncate' : '';
            return `<div class="active-skill-correction${truncate}">&ldquo;<em>${c.text}</em>&rdquo;</div>`;
        }).join('');
        return `
        <div class="active-skill-card" onclick="document.getElementById('focus-skills-sheet').remove(); setTimeout(() => showSkillDetail('${skill.id}', 'barre-screen'), 200);">
            <div class="active-skill-top">
                <div class="active-skill-name">${skill.french}</div>
                <div class="active-skill-arrow">&#x203A;</div>
            </div>
            ${correctionsHtml}
            <div class="active-skill-footer">
                ${lastSession ? `<span class="active-skill-date">Last worked: ${formatTimelineDate(lastSession.date)}</span>` : ''}
            </div>
        </div>`;
    }).join('');

    const sheet = document.createElement('div');
    sheet.id = 'focus-skills-sheet';
    sheet.className = 'session-overlay';
    sheet.innerHTML = `
        <div class="session-logger-sheet" style="max-height: 85vh; display: flex; flex-direction: column;">
            <div class="session-sheet-handle"></div>
            <div class="session-logger-header" style="flex-shrink: 0;">
                <div>
                    <div class="session-logger-eyebrow">The Barre</div>
                    <h2 class="session-logger-title">Skills in focus</h2>
                </div>
                <button class="session-close-btn" onclick="document.getElementById('focus-skills-sheet').remove()">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                        <line x1="4" y1="4" x2="14" y2="14"/><line x1="14" y1="4" x2="4" y2="14"/>
                    </svg>
                </button>
            </div>
            <div style="padding: 0 var(--sp-lg) var(--sp-xl); overflow-y: auto; flex: 1;">
                <div style="display: flex; flex-direction: column; gap: var(--sp-sm); padding-top: var(--sp-lg);">
                    ${cardsHtml}
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(sheet);
    requestAnimationFrame(() => sheet.classList.add('open'));
    sheet.addEventListener('click', e => { if (e.target === sheet) sheet.remove(); });
}

function computeFocusNudge() {
    const now = Date.now();
    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
    const SEVEN_DAYS  = 7  * 24 * 60 * 60 * 1000;

    const recentCorrections = (appState.corrections || []).filter(c => (now - c.createdAt) <= THIRTY_DAYS);
    const corrCountBySkill = {};
    recentCorrections.forEach(c => {
        if (c.skillId) corrCountBySkill[c.skillId] = (corrCountBySkill[c.skillId] || 0) + 1;
    });

    // Skill X: most corrected in last 30 days with 3+
    const skillXEntry = Object.entries(corrCountBySkill)
        .filter(([, count]) => count >= 3)
        .sort((a, b) => b[1] - a[1])[0];
    if (!skillXEntry) return null;
    const skillXId = skillXEntry[0];

    // Skill Y: flagged, 0 corrections in last 30 days, not same as X
    const skillY = appState.skills.find(s =>
        s.flagged && s.id !== skillXId && !(corrCountBySkill[s.id])
    );
    if (!skillY) return null;

    // Throttle: once per (X, Y) pair per 7 days
    const nudges = storage.load('focusNudges') || [];
    if (nudges.find(n => n.x === skillXId && n.y === skillY.id && (now - n.at) <= SEVEN_DAYS)) return null;

    const refX = DATA.skills.find(s => s.id === skillXId);
    const refY = DATA.skills.find(s => s.id === skillY.id);
    if (!refX || !refY) return null;

    return { skillX: refX, skillY: refY };
}

function dismissFocusNudge(skillXId, skillYId, keep) {
    const nudges = storage.load('focusNudges') || [];
    nudges.push({ x: skillXId, y: skillYId, at: Date.now() });
    storage.save('focusNudges', nudges);

    document.getElementById('focus-nudge')?.remove();

    if (!keep) {
        const skill = appState.skills.find(s => s.id === skillYId);
        if (skill) {
            skill.flagged = false;
            persistSkillState();
            showBarreScreen();
        }
    }
}

// ── Assess ──
function showAssessScreen() {
    let screen = document.getElementById('assess-screen');
    if (!screen) {
        screen = document.createElement('div');
        screen.id = 'assess-screen';
        screen.className = 'screen';
        screen.innerHTML = `
            <div class="profile-header">
                <h1>Assess</h1>
                <p style="color: var(--text-muted); font-size: var(--fs-body); margin-top: var(--sp-xs);">Measure where you are and track how you improve</p>
            </div>
            <div style="padding: 0 var(--sp-lg); margin-bottom: 120px;">
                <div style="display: flex; flex-direction: column; gap: var(--sp-sm);">
                    ${DATA.assessments.map((a, i) => `
                        <div class="skill-category-card" onclick="${a.action}" ${i === 0 ? 'style="background: var(--accent-wash); border-color: var(--accent-soft);"' : ''}>
                            <div class="skill-category-icon" ${i === 0 ? 'style="background: var(--accent-soft);"' : ''}>${ICONS.get(a.icon, 24)}</div>
                            <div class="skill-category-info">
                                <div class="skill-category-name">${a.name}</div>
                                <div class="skill-category-count">${a.badge}</div>
                                <div style="font-size: var(--fs-small); color: var(--text-muted); margin-top: 2px; line-height: 1.4;">${a.desc}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        document.querySelector('.app-container').appendChild(screen);
    }
    showScreen('assess-screen');
}

// ── Goals ──
// ── Goals ──

const GOAL_CATEGORIES = [
    'Class',
    'Home practice',
    'Rehearsal / performance',
    'General',
];

const DIMENSION_OPTIONS = [
    { id: 'technique', label: 'Technique' },
    { id: 'movement',  label: 'Movement'  },
    { id: 'artistry',  label: 'Artistry'  },
    { id: 'the-body', label: 'The Body'  },
    { id: 'pointe',    label: 'Pointe'    },
];

function showGoalsScreen() {
    let screen = document.getElementById('goals-screen');
    if (!screen) {
        screen = document.createElement('div');
        screen.id = 'goals-screen';
        screen.className = 'screen';
        document.querySelector('.app-container').appendChild(screen);
    }
    renderGoalsScreen();
    showScreen('goals-screen');
}

function attachGoalSwipe(row, goalId) {
    const content = row.querySelector('.swipe-content');
    const leftEl  = row.querySelector('.swipe-action-left');
    const rightEl = row.querySelector('.swipe-action-right');
    if (!content) return;

    const SNAP = 176, COMPLETE = 100, MIN_MS = 120;
    let startX = 0, startTime = 0, dx = 0, dragging = false, revealed = false;

    function getX(e) { return e.touches ? e.touches[0].clientX : e.clientX; }

    function reset() {
        content.style.transition = 'transform 0.25s var(--ease-out)';
        content.style.transform  = '';
        if (leftEl)  { leftEl.style.opacity  = '0'; leftEl.classList.remove('goal-swipe-revealed'); }
        if (rightEl) rightEl.style.opacity = '0';
        revealed = false;
        dragging = false;
    }

    function onStart(e) {
        if (revealed) { reset(); return; }
        if (e.target.closest('button, input, a')) return;
        startX    = getX(e);
        startTime = Date.now();
        dx        = 0;
        dragging  = true;
        content.style.transition = 'none';
    }

    function onMove(e) {
        if (!dragging || revealed) return;
        const raw = getX(e) - startX;
        if (Math.abs(raw) < 8) return;
        dx = raw;
        if (dx < 0) {
            const t = dx < -SNAP ? -SNAP + (dx + SNAP) * 0.1 : dx;
            content.style.transform = `translateX(${t}px)`;
            if (leftEl)  leftEl.style.opacity  = String(Math.min(1, Math.abs(dx) / SNAP));
            if (rightEl) rightEl.style.opacity = '0';
        } else {
            const t = Math.min(dx, COMPLETE + (dx - COMPLETE) * 0.15);
            content.style.transform = `translateX(${t}px)`;
            if (rightEl) rightEl.style.opacity = String(Math.min(1, dx / COMPLETE));
            if (leftEl)  leftEl.style.opacity  = '0';
        }
    }

    function onEnd() {
        if (!dragging) return;
        dragging = false;
        const elapsed = Date.now() - startTime;
        if (dx <= -SNAP && elapsed >= MIN_MS) {
            content.style.transition = 'transform 0.2s var(--ease-out)';
            content.style.transform  = `translateX(-${SNAP}px)`;
            if (leftEl) { leftEl.style.opacity = '1'; leftEl.classList.add('goal-swipe-revealed'); }
            revealed = true;
        } else if (dx >= COMPLETE && elapsed >= MIN_MS) {
            content.style.transition = 'transform 0.25s var(--ease-out)';
            content.style.transform  = 'translateX(110%)';
            setTimeout(() => markGoalComplete(goalId), 200);
        } else {
            reset();
        }
    }

    content.addEventListener('touchstart', onStart, { passive: true });
    content.addEventListener('mousedown',  onStart);
    document.addEventListener('touchmove', onMove, { passive: true });
    document.addEventListener('touchend',  onEnd);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup',   onEnd);
}

function renderGoalsScreen() {
    const screen = document.getElementById('goals-screen');
    if (!screen) return;

    const goals = (appState.goals || []).filter(g => g.status === 'active');

    // Sort newest first within each group
    const sorted = [...goals].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

    // Group by category, then uncategorised last
    const categorised = {};
    const uncategorised = [];
    sorted.forEach(g => {
        if (g.category) {
            if (!categorised[g.category]) categorised[g.category] = [];
            categorised[g.category].push(g);
        } else {
            uncategorised.push(g);
        }
    });

    const completedGoals = [...(appState.goals || [])]
        .filter(g => g.status === 'completed')
        .sort((a, b) => (b.completedAt || 0) - (a.completedAt || 0));

    let goalsHtml = '';

    if (goals.length === 0) {
        goalsHtml = `
            <div class="barre-empty-state">
                <div class="barre-empty-icon">${ICONS.get('goals', 32)}</div>
                <div class="barre-empty-title">No active goals</div>
                <div class="barre-empty-text">Set targets and track progress. Goals can link to a specific skill or dimension.</div>
            </div>`;
    } else {
        // Uncategorised first, then categories
        if (uncategorised.length) {
            goalsHtml += renderGoalGroup(null, uncategorised);
        }
        Object.entries(categorised).forEach(([cat, catGoals]) => {
            goalsHtml += renderGoalGroup(cat, catGoals);
        });
    }

    let completedHtml = '';
    if (completedGoals.length) {
        completedHtml = `
            <button class="goals-completed-header" onmousedown="
                const body = this.nextElementSibling;
                body.classList.toggle('collapsed');
            ">
                <span>completed</span>
                <span class="goals-completed-count">${completedGoals.length}</span>
            </button>
            <div class="goals-completed-body collapsed">
                ${completedGoals.map(g => renderGoalCard(g, true)).join('')}
            </div>
        `;
    }

    screen.innerHTML = `
        <div class="profile-header">
            <h1>Goals</h1>
            <p style="color: var(--ink-3); font-size: var(--fs-body); margin-top: var(--sp-xs);">Track what you're working towards</p>
        </div>
        <div style="padding: 0 var(--sp-lg); margin-bottom: 120px;">
            ${goalsHtml}
            <button class="add-goal-btn" onclick="openGoalCreator()">+ set a goal</button>
            ${(appState.goals || []).length > 0 ? `<div style="text-align:center; margin-top: var(--sp-xl);"><button class="text-link-btn" onclick="showAllGoalsScreen()">view all goals →</button></div>` : ''}
            ${completedHtml}
        </div>
    `;

    // Attach swipes to goal cards
    screen.querySelectorAll('.swipe-row[data-goal-id]').forEach(row => {
        attachGoalSwipe(row, Number(row.dataset.goalId));
    });
    requestAnimationFrame(() => initClampedTexts(screen));
}

function showAllGoalsScreen() {
    pushNavHistory();

    let screen = document.getElementById('all-goals-screen');
    if (!screen) {
        screen = document.createElement('div');
        screen.id = 'all-goals-screen';
        screen.className = 'screen';
        document.querySelector('.app-container').appendChild(screen);
    }

    const now = Date.now();
    const WEEK  = 7  * 24 * 60 * 60 * 1000;
    const MONTH = 30 * 24 * 60 * 60 * 1000;
    const thisYear = new Date().getFullYear();

    function closeDate(g) {
        return g.completedAt || g.letGoAt || g.pausedAt || null;
    }

    function groupKey(g) {
        const ts = closeDate(g);
        if (!ts) return 'active';
        const age = now - ts;
        if (age <= WEEK)  return 'this week';
        if (age <= MONTH) return 'last month';
        const d = new Date(ts);
        if (d.getFullYear() === thisYear) return d.toLocaleString('en-GB', { month: 'long' });
        return String(d.getFullYear());
    }

    // Sort goals within each group by close date desc (active by createdAt desc)
    const allGoals = [...(appState.goals || [])];
    allGoals.sort((a, b) => {
        const ca = closeDate(a) || a.createdAt || 0;
        const cb = closeDate(b) || b.createdAt || 0;
        return cb - ca;
    });

    // Build ordered group list
    const groupMap = {};
    allGoals.forEach(g => {
        const key = groupKey(g);
        if (!groupMap[key]) groupMap[key] = [];
        groupMap[key].push(g);
    });

    // Determine display order: active first, then recency groups, then named months, then years
    const FIXED_ORDER = ['active', 'this week', 'last month'];
    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const keys = Object.keys(groupMap);
    const orderedKeys = [
        ...FIXED_ORDER.filter(k => keys.includes(k)),
        ...monthNames.filter(k => keys.includes(k)).reverse(),
        ...keys.filter(k => !FIXED_ORDER.includes(k) && !monthNames.includes(k)).sort((a, b) => b - a),
    ];

    const TYPE_LABELS   = { skill: 'Skill', body: 'Body', intention: 'Feeling / state', habit: 'Habit' };
    const STATUS_LABELS = { active: 'active', completed: 'completed', paused: 'paused', letgo: 'let go' };

    function renderAllGoalCard(g) {
        const markers   = (g.progressMarkers || g.milestones || []);
        const done      = markers.filter(m => m.done).length;
        const typeLabel = TYPE_LABELS[g.goalType] || '';
        const status    = g.status || (g.completedAt ? 'completed' : 'active');
        const statusLabel = STATUS_LABELS[status] || status;
        const closedTs  = closeDate(g);
        const closedStr = closedTs ? formatTimelineDate(new Date(closedTs).toISOString().split('T')[0]) : null;
        const cardHtml = `
            <div class="all-goals-card" onclick="this.classList.toggle('expanded')">
                <div class="all-goals-card-header">
                    <span class="all-goals-card-title">${escapeHtml(g.title)}</span>
                    <span class="all-goals-card-status ${status === 'completed' ? 'done' : status}">${statusLabel}</span>
                </div>
                <div class="all-goals-card-meta">
                    ${typeLabel ? `<span>${typeLabel}</span>` : ''}
                    ${markers.length ? `<span>${done}/${markers.length} steps</span>` : ''}
                </div>
                <div class="all-goals-card-body">
                    ${g.body ? `<div class="all-goals-card-desc">${nl2br(g.body)}</div>` : ''}
                    ${markers.length ? `
                        <ul class="all-goals-markers-list">
                            ${markers.map(m => `<li class="${m.done ? 'done' : ''}">${escapeHtml(m.text)}</li>`).join('')}
                        </ul>
                    ` : ''}
                    <div class="all-goals-card-date">created ${formatTimelineDate(new Date(g.createdAt).toISOString().split('T')[0])}${closedStr ? ` · ${statusLabel} ${closedStr}` : ''}</div>
                </div>
            </div>
        `;
        if (status === 'paused' || status === 'letgo') {
            return `
            <div class="swipe-row" data-goal-id="${g.id}">
                <div class="swipe-action-right swipe-action-reactivate">reactivate</div>
                <div class="swipe-content">${cardHtml}</div>
            </div>`;
        }
        return cardHtml;
    }

    const groupsHtml = orderedKeys.map(key => `
        <div class="all-goals-group">
            <div class="all-goals-group-label">${key}</div>
            ${groupMap[key].map(renderAllGoalCard).join('')}
        </div>
    `).join('');

    screen.innerHTML = `
        <div class="profile-header" style="display:flex;align-items:center;justify-content:space-between;">
            <button class="session-detail-back" onclick="goBack()">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 4 7 10 13 16"/></svg>
                goals
            </button>
            <h1 style="flex:1;text-align:center;">All goals</h1>
            <div style="width:60px;"></div>
        </div>
        <div style="padding: 0 var(--sp-lg); margin-bottom: 120px;">
            ${allGoals.length === 0
                ? '<div class="barre-empty-state"><div class="barre-empty-title">No active goals</div></div>'
                : groupsHtml
            }
        </div>
    `;

    screen.querySelectorAll('.swipe-row[data-goal-id]').forEach(row => {
        attachReactivateSwipe(row, Number(row.dataset.goalId));
    });

    showScreen('all-goals-screen');
    appState.currentScreen = 'all-goals-screen';
}

function reactivateGoal(goalId) {
    const goal = (appState.goals || []).find(g => g.id === goalId);
    if (!goal) return;
    goal.status   = 'active';
    goal.pausedAt = null;
    goal.letGoAt  = null;
    storage.save('goals', appState.goals);
    showAllGoalsScreen();
}

function attachReactivateSwipe(row, goalId) {
    const content = row.querySelector('.swipe-content');
    const rightEl = row.querySelector('.swipe-action-right');
    if (!content) return;

    const COMPLETE = 100, MIN_MS = 120;
    let startX = 0, startTime = 0, dx = 0, dragging = false;

    function getX(e) { return e.touches ? e.touches[0].clientX : e.clientX; }

    function reset() {
        content.style.transition = 'transform 0.25s var(--ease-out)';
        content.style.transform  = '';
        if (rightEl) rightEl.style.opacity = '0';
        dragging = false;
    }

    function onStart(e) {
        if (e.target.closest('button, input, a')) return;
        startX    = getX(e);
        startTime = Date.now();
        dx        = 0;
        dragging  = true;
        content.style.transition = 'none';
    }

    function onMove(e) {
        if (!dragging) return;
        const raw = getX(e) - startX;
        if (Math.abs(raw) < 8) return;
        dx = raw;
        if (dx > 0) {
            const t = Math.min(dx, COMPLETE + (dx - COMPLETE) * 0.15);
            content.style.transform = `translateX(${t}px)`;
            if (rightEl) rightEl.style.opacity = String(Math.min(1, dx / COMPLETE));
        } else {
            content.style.transform = '';
            if (rightEl) rightEl.style.opacity = '0';
        }
    }

    function onEnd() {
        if (!dragging) return;
        dragging = false;
        const elapsed = Date.now() - startTime;
        if (dx >= COMPLETE && elapsed >= MIN_MS) {
            content.style.transition = 'transform 0.25s var(--ease-out)';
            content.style.transform  = 'translateX(110%)';
            setTimeout(() => reactivateGoal(goalId), 200);
        } else {
            reset();
        }
    }

    content.addEventListener('touchstart', onStart, { passive: true });
    content.addEventListener('mousedown',  onStart);
    document.addEventListener('touchmove', onMove, { passive: true });
    document.addEventListener('touchend',  onEnd);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup',   onEnd);
}

function renderGoalGroup(category, goals) {
    return `
        ${category ? `<div class="goals-group-label">${category}</div>` : ''}
        ${goals.map(g => renderGoalCard(g, false)).join('')}
    `;
}

function calcGoalExpiry(goal) {
    if (!goal.commitmentPeriod) return null;
    const created = new Date(goal.createdAt);
    if (isNaN(created.getTime())) return null;
    const p = goal.commitmentPeriod;
    if (/^\d{4}-\d{2}-\d{2}$/.test(p)) return new Date(p + 'T12:00:00');
    const d = new Date(created);
    if (p === 'A week')           d.setDate(d.getDate() + 7);
    else if (p === 'Two weeks')   d.setDate(d.getDate() + 14);
    else if (p === 'A month')     d.setMonth(d.getMonth() + 1);
    else if (p === 'Three months') d.setMonth(d.getMonth() + 3);
    else return null;
    return d;
}

function formatExpiryDate(dt) {
    if (!dt || isNaN(dt.getTime())) return null;
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const dtStart   = new Date(dt.getFullYear(),  dt.getMonth(),  dt.getDate());
    const diffDays  = Math.round((dtStart - todayStart) / 86400000);
    if (diffDays === 0)  return 'Expires today';
    if (diffDays === 1)  return 'Expires tomorrow';
    if (diffDays === -1) return 'Expired yesterday';
    const opts = dt.getFullYear() === now.getFullYear()
        ? { day: 'numeric', month: 'short' }
        : { day: 'numeric', month: 'short', year: 'numeric' };
    const dateStr = dt.toLocaleDateString('en-GB', opts);
    return diffDays < 0 ? `Expired ${dateStr}` : `Expires ${dateStr}`;
}

function renderGoalCard(goal, completed) {
    const markers = (goal.progressMarkers || goal.milestones || []);
    const doneMarkers = markers.filter(m => m.done).length;
    const progress = markers.length > 0 ? doneMarkers / markers.length : null;

    const TYPE_LABELS = { skill: 'Skill', intention: 'Feeling / state', habit: 'Habit' };
    const typeLabel = TYPE_LABELS[goal.goalType] || goal.goalType || null;

    const linkedSkill = goal.skillId
        ? (appState.skills || []).find(s => s.id === goal.skillId)
        : null;
    const _catLabels = { general: 'General', technique: 'Technique', movement: 'Movement', artistry: 'Artistry', 'the-body': 'The Body', pointe: 'Pointe' };
    const linkedCategory = !linkedSkill && goal.dimensionId ? (_catLabels[goal.dimensionId] || null) : null;

    const tagsHtml = [
        typeLabel ? `<span class="goal-tag goal-tag-type">${typeLabel}</span>` : null,
        linkedSkill ? `<span class="goal-tag goal-tag-skill">${linkedSkill.french}</span>` : null,
        linkedCategory ? `<span class="goal-tag goal-tag-skill">${linkedCategory}</span>` : null,
        goal.howOften ? `<span class="goal-tag goal-tag-cadence">${goal.howOften.startsWith('x') ? goal.howOften.slice(1) + '× a week' : goal.howOften}</span>` : null,
    ].filter(Boolean).join('');

    const MARKER_CAP = 4;
    const markersHtml = markers.length > 0 ? `
        <div class="goal-milestones ${markers.length > MARKER_CAP ? 'goal-milestones-scrollable' : ''}">
            ${markers.map((m, i) => `
                <div class="goal-milestone ${m.done ? 'done' : ''}"
                     onmousedown="toggleMilestone('${goal.id}', ${i})"
                     ontouchend="event.preventDefault(); toggleMilestone('${goal.id}', ${i})">
                    <div class="goal-milestone-check">
                        ${m.done ? `<svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="1.5 5 4 7.5 8.5 2.5"/></svg>` : ''}
                    </div>
                    <span class="goal-milestone-text">${m.text}</span>
                </div>
            `).join('')}
        </div>
        ${markers.length > MARKER_CAP ? `<div class="goal-milestones-scroll-hint">${markers.length} markers · scroll to see all</div>` : ''}
    ` : '';

    const progressBarHtml = progress !== null ? `
        <div class="goal-progress-bar">
            <div class="goal-progress-fill" style="width: ${Math.round(progress * 100)}%"></div>
        </div>
        <div class="goal-progress-label">${doneMarkers} of ${markers.length}</div>
    ` : '';

    return `
        <div class="swipe-row" data-goal-id="${goal.id}">
            <div class="swipe-action-left goal-swipe-left">
                <button class="goal-swipe-btn goal-swipe-pause" onmousedown="pauseGoal('${goal.id}')">pause</button>
                <button class="goal-swipe-btn goal-swipe-letgo" onmousedown="letGoGoal('${goal.id}')">let it go</button>
            </div>
            ${!completed ? `
            <div class="swipe-action-right swipe-action-complete">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="2 8 6 12 14 4"/></svg>
                done
            </div>` : `
            <div class="swipe-action-right swipe-action-reopen">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="4 8 8 4 12 8"/><line x1="8" y1="4" x2="8" y2="13"/></svg>
                reopen
            </div>`}
            <div class="swipe-content">
                <div class="goal-card ${completed ? 'goal-card-completed' : ''}">
                    ${tagsHtml ? `<div class="goal-tags">${tagsHtml}</div>` : ''}
                    <div class="goal-card-title">${completed ? '<span class="goal-complete-tick"><svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="11" fill="var(--sage)"/><polyline points="5.5,11 9,14.5 16.5,7.5" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' : ''}${goal.title}</div>
                    ${goal.body ? `<div class="goal-card-body">${renderClampedHtml(nl2br(goal.body), 'gb-' + goal.id)}</div>` : ''}
                    ${markersHtml}
                    ${progressBarHtml}
                    <div class="goal-card-footer">
                        <div class="goal-card-footer-left">
                            <span class="goal-card-date">${formatTimelineDate(new Date(goal.createdAt).toISOString().split('T')[0])}</span>${(() => {
                                const exp = calcGoalExpiry(goal);
                                const expStr = formatExpiryDate(exp);
                                if (!expStr) return '';
                                const daysLeft = exp ? Math.ceil((exp - new Date()) / 86400000) : null;
                                const nearClass = daysLeft !== null && daysLeft <= 3 && daysLeft >= 0 ? ' goal-expiry-near' : '';
                                return ` <span class="goal-card-expiry${nearClass}">· ${expStr}</span>`;
                            })()}
                        </div>
                        ${!completed ? `<button class="goal-edit-btn" onmousedown="openGoalEditor('${goal.id}')">edit</button>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ── Goal creator overlay ──

function openGoalCreator() {
    appState._goalDraft = {
        title:            '',
        body:             '',
        dueDate:          '',
        skillId:          null,
        dimensionId:      null,
        category:         null,
        milestones:       [],
        correctionIds:    [],
        _editId:          null,
        goalType:         null,
        commitmentPeriod: '',
        progressMarkers:  [],
        skillIds:         [],
        howOften:         '',
    };

    let overlay = document.getElementById('goal-creator-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'goal-creator-overlay';
        overlay.className = 'session-overlay'; // reuse sheet styles
        document.body.appendChild(overlay);
        overlay.addEventListener('mousedown', (e) => {
            if (e.target === overlay) confirmDiscardGoal();
        });
        overlay.addEventListener('touchstart', _goalTabTouchHandler, { passive: true });
        overlay.addEventListener('click', _goalTabClickHandler);
    }

    renderGoalCreator();

    document.querySelector('.fab')?.classList.remove('visible');
    document.querySelector('.bottom-nav')?.classList.remove('visible');
    requestAnimationFrame(() => overlay.classList.add('open'));
}

function openGoalCreatorWithSuggestion(title, dimensionId, skillId, rationale, milestones = []) {
    appState._goalDraft = {
        title:            title || '',
        body:             rationale || '',
        dueDate:          '',
        skillId:          skillId || null,
        dimensionId:      dimensionId || null,
        category:         null,
        milestones:       milestones || [],
        correctionIds:    [],
        _editId:          null,
        goalType:         null,
        commitmentPeriod: '',
        progressMarkers:  [],
        skillIds:         [],
        howOften:         '',
    };

    let overlay = document.getElementById('goal-creator-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'goal-creator-overlay';
        overlay.className = 'session-overlay';
        document.body.appendChild(overlay);
        overlay.addEventListener('mousedown', (e) => {
            if (e.target === overlay) confirmDiscardGoal();
        });
        overlay.addEventListener('touchstart', _goalTabTouchHandler, { passive: true });
        overlay.addEventListener('click', _goalTabClickHandler);
    }

    renderGoalCreator();

    document.querySelector('.fab')?.classList.remove('visible');
    document.querySelector('.bottom-nav')?.classList.remove('visible');

    requestAnimationFrame(() => {
        overlay.classList.add('open');
        // Pre-fill skill search input if a skillId was provided
        if (skillId) {
            const skill = (appState.skills || []).find(s => s.id === skillId);
            const skillInput = document.getElementById('goal-skill-input');
            if (skillInput && skill) skillInput.value = skill.french;
        }
    });
}

function openGoalEditor(goalId) {
    const goal = appState.goals.find(g => g.id === goalId);
    if (!goal) return;
    const markers = (goal.progressMarkers || goal.milestones || []).map(m => ({ ...m }));
    appState._goalDraft = {
        _editId:          goal.id,
        title:            goal.title || '',
        body:             goal.body  || '',
        dueDate:          goal.dueDate || '',
        skillId:          goal.skillId     || null,
        dimensionId:      goal.dimensionId || null,
        category:         goal.category    || null,
        correctionIds:    [...(goal.correctionIds || [])],
        milestones:       (goal.milestones || []).map(m => ({ ...m })),
        goalType:         goal.goalType         || null,
        commitmentPeriod: goal.commitmentPeriod || '',
        progressMarkers:  markers,
        skillIds:         [...(goal.skillIds || [])],
        howOften:         goal.howOften || '',
        _snapshot: {
            title:            goal.title || '',
            body:             goal.body  || '',
            skillId:          goal.skillId || null,
            category:         goal.category || null,
            howOften:         goal.howOften || '',
            commitmentPeriod: goal.commitmentPeriod || '',
            markers:          JSON.stringify(markers.filter(m => m.text?.trim()).map(m => ({ text: m.text, done: m.done }))),
        },
    };

    let overlay = document.getElementById('goal-creator-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'goal-creator-overlay';
        overlay.className = 'session-overlay';
        document.body.appendChild(overlay);
        overlay.addEventListener('mousedown', (e) => {
            if (e.target === overlay) confirmDiscardGoal();
        });
        overlay.addEventListener('touchstart', _goalTabTouchHandler, { passive: true });
        overlay.addEventListener('click', _goalTabClickHandler);
    }
    renderGoalCreator();
    document.querySelector('.fab')?.classList.remove('visible');
    document.querySelector('.bottom-nav')?.classList.remove('visible');
    requestAnimationFrame(() => overlay.classList.add('open'));
}

function closeGoalCreator() {
    const overlay = document.getElementById('goal-creator-overlay');
    if (!overlay) return;
    overlay.classList.remove('open');
    const isAppScreen = !['assessment','completion','results'].includes(appState.currentScreen)
        && !appState.currentScreen.startsWith('onboarding');
    if (isAppScreen) {
        document.querySelector('.fab')?.classList.add('visible');
        document.querySelector('.bottom-nav')?.classList.add('visible');
    }
    overlay.addEventListener('transitionend', () => {
        appState._goalDraft = null;
    }, { once: true });
}

// Persistent event delegation handlers for goal type tabs — attached once on overlay creation,
// survive innerHTML replacement. touchstart fires immediately; click handles keyboard/mouse.
let _goalTabTouchTarget = null;
function _goalTabTouchHandler(e) {
    const tab = e.target.closest('.goal-type-tab');
    if (!tab) return;
    _goalTabTouchTarget = tab;
    setGoalType(tab.dataset.type);
}
function _goalTabClickHandler(e) {
    const tab = e.target.closest('.goal-type-tab');
    if (!tab) return;
    // Avoid double-firing when touchstart already handled it
    if (_goalTabTouchTarget === tab) { _goalTabTouchTarget = null; return; }
    setGoalType(tab.dataset.type);
}

function renderGoalCreator() {
    const overlay = document.getElementById('goal-creator-overlay');
    if (!overlay) return;
    const d = appState._goalDraft;
    if (!d) return;

    const phIdx = Math.floor(Date.now() / 86400000) % 3;

    const markerPlaceholders = [
        'get a correction on it from my teacher',
        'land two back to back without thinking about the arms',
        'feel it click in centre without the mirror',
    ];

    const periodOptions = ['A week', 'Two weeks', 'A month', 'Three months', 'Choose a date'];
    const howOftenOptions = ['Every class', 'Every week', 'set a number', 'other'];

    function periodChipsHtml() {
        const presets = periodOptions.slice(0, -1);
        const isDateSelected = d.commitmentPeriod && !presets.includes(d.commitmentPeriod) && d.commitmentPeriod !== 'Choose a date';
        const showDatePicker = d.commitmentPeriod === 'Choose a date' || isDateSelected;

        let dateDisplayHtml = '';
        if (isDateSelected) {
            const dt = new Date(d.commitmentPeriod + 'T12:00:00');
            if (!isNaN(dt.getTime())) {
                const formatted = dt.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
                dateDisplayHtml = `<span class="date-display-label">${formatted}</span>`;
            } else {
                dateDisplayHtml = `<span class="date-display-label" style="color:var(--ink-3);font-weight:400;">Tap to pick a date</span>`;
            }
        } else {
            dateDisplayHtml = `<span class="date-display-label" style="color:var(--ink-3);font-weight:400;">Tap to pick a date</span>`;
        }

        const draftCreatedAt = d.createdAt || new Date().toISOString();
        const resolvedExpiry = calcGoalExpiry({ createdAt: draftCreatedAt, commitmentPeriod: d.commitmentPeriod });
        const resolvedExpiryStr = (d.commitmentPeriod && resolvedExpiry) ? formatExpiryDate(resolvedExpiry) : null;

        return `
            <div class="goal-period-chips">
                ${periodOptions.map(p => {
                    const isActive = p === 'Choose a date' ? showDatePicker : d.commitmentPeriod === p;
                    return `<button class="goal-period-chip ${isActive ? 'selected' : ''}" onmousedown="setGoalPeriod('${p}')">${p}</button>`;
                }).join('')}
            </div>
            ${showDatePicker ? `
                <div class="session-date-picker" id="goal-period-date-picker" style="margin-top: var(--sp-sm);">
                    <div class="date-display" onmousedown="toggleGoalDateCalendar()" style="border-left:none; border-right:none;">
                        ${dateDisplayHtml}
                    </div>
                </div>
            ` : ''}
            ${resolvedExpiryStr ? `<p class="goal-period-resolved">until ${resolvedExpiryStr}</p>` : ''}
        `;
    }

    function skillFormHtml() {
        const selectedSkill = d.skillId ? (appState.skills || []).find(s => s.id === d.skillId) : null;
        const _topicCatLabels = { general: 'General', technique: 'Technique', movement: 'Movement', artistry: 'Artistry', 'the-body': 'The Body', pointe: 'Pointe' };
        const selectedSkillLabel = selectedSkill ? selectedSkill.french : (d.dimensionId ? (_topicCatLabels[d.dimensionId] || '') : '');

        const markersHtml = (d.progressMarkers || []).map((m, i) => `
            <div class="goal-marker-row">
                <input type="text" class="goal-marker-input"
                       value="${escapeHtml(m.text)}"
                       placeholder="${markerPlaceholders[i % markerPlaceholders.length]}"
                       oninput="appState._goalDraft.progressMarkers[${i}].text = this.value" />
                <button class="block-remove-btn" onmousedown="removeProgressMarker(${i})">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                        <line x1="3" y1="3" x2="11" y2="11"/><line x1="11" y1="3" x2="3" y2="11"/>
                    </svg>
                </button>
            </div>
        `).join('');

        return `
            <div class="session-field">
                <label class="session-field-label">Title</label>
                <input type="text" class="session-input" id="goal-title-input"
                       placeholder="${['improve pirouettes en dedans from fifth, on my left side', 'sort out the arms in grand allegro', 'stop gripping in the hip flexor on développé devant'][phIdx]}"
                       value="${escapeHtml(d.title)}"
                       oninput="appState._goalDraft.title = this.value; checkGoalTitleForSkills(this.value); searchGoalCorrections(this.value);" />
                <div id="goal-correction-search-results"></div>
            </div>
            ${(d.correctionIds || []).length ? `
                <div class="session-field">
                    <label class="session-field-label">Linked corrections</label>
                    <div id="goal-linked-corrections">
                        ${renderLinkedCorrectionsHtml(d.correctionIds)}
                    </div>
                </div>
            ` : `<div id="goal-linked-corrections-wrapper"></div>`}
            <div class="session-field">
                <label class="session-field-label">What does it look like when it happens? <span class="session-field-optional">optional</span></label>
                <textarea class="session-input" id="goal-body-input"
                          placeholder="${['landing a clean single consistently', 'my teacher stops mentioning it in the same breath as my right side', 'I can think about the music instead of the mechanics'][phIdx]}"
                          rows="2"
                          style="resize: none;"
                          oninput="appState._goalDraft.body = this.value; autoResizeTextarea(this);">${escapeHtml(d.body || '')}</textarea>
            </div>
            <div class="session-field">
                <label class="session-field-label">Linked skill <span class="session-field-optional">optional</span></label>
                <div style="position: relative;">
                    <input class="session-input" id="goal-skill-input"
                           type="text"
                           autocomplete="off"
                           spellcheck="false"
                           value="${escapeHtml(selectedSkillLabel)}"
                           oninput="filterGoalSkills(this.value)"
                           onfocus="filterGoalSkills(this.value)"
                           onblur="setTimeout(()=>{const el=document.getElementById('goal-skill-dropdown');if(el)el.style.display='none';},200)"
                           placeholder="Search skill…" />
                    <div class="block-topic-dropdown" id="goal-skill-dropdown" style="display:none;"></div>
                </div>
            </div>
            <div class="session-field">
                <label class="session-field-label">Milestones <span class="session-field-optional">optional</span></label>
                <div id="goal-markers-list">${markersHtml}</div>
                <button class="add-block-btn" style="margin-top: var(--sp-sm);" onmousedown="addProgressMarker()">+ add a step</button>
            </div>
            <div class="session-field">
                <label class="session-field-label">Work on this for</label>
                ${periodChipsHtml()}
            </div>
        `;
    }

    function bodyGoalFormHtml() {
        return `
            <div class="session-field">
                <label class="session-field-label">Title</label>
                <input type="text" class="session-input" id="goal-title-input"
                       placeholder="${['work on ankle stability and theraband exercises', 'stop gripping in the hip flexor', 'improve turnout from the hip, not the knee'][phIdx]}"
                       value="${escapeHtml(d.title)}"
                       oninput="appState._goalDraft.title = this.value; searchGoalCorrections(this.value);" />
                <div id="goal-correction-search-results"></div>
            </div>
            ${(d.correctionIds || []).length ? `
                <div class="session-field">
                    <label class="session-field-label">Linked corrections</label>
                    <div id="goal-linked-corrections">
                        ${renderLinkedCorrectionsHtml(d.correctionIds)}
                    </div>
                </div>
            ` : `<div id="goal-linked-corrections-wrapper"></div>`}
            <div class="session-field">
                <label class="session-field-label">What does it look like when it happens? <span class="session-field-optional">optional</span></label>
                <textarea class="session-input" id="goal-body-input"
                          placeholder="${['ankles feel stable in relevé without gripping', 'teacher stops correcting the same thing', 'weight shifts easily without compensating'][phIdx]}"
                          rows="2"
                          style="resize: none;"
                          oninput="appState._goalDraft.body = this.value; autoResizeTextarea(this);">${escapeHtml(d.body || '')}</textarea>
            </div>
            <div class="session-field">
                <label class="session-field-label">Milestones <span class="session-field-optional">optional</span></label>
                <div id="goal-markers-list">${(d.progressMarkers || []).map((m, i) => `
                    <div class="goal-marker-row">
                        <input type="text" class="goal-marker-input"
                               value="${escapeHtml(m.text)}"
                               placeholder="${markerPlaceholders[i % markerPlaceholders.length]}"
                               oninput="appState._goalDraft.progressMarkers[${i}].text = this.value" />
                        <button class="block-remove-btn" onmousedown="removeProgressMarker(${i})">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                                <line x1="3" y1="3" x2="11" y2="11"/><line x1="11" y1="3" x2="3" y2="11"/>
                            </svg>
                        </button>
                    </div>`).join('')}</div>
                <button class="add-block-btn" style="margin-top: var(--sp-sm);" onmousedown="addProgressMarker()">+ add a step</button>
            </div>
            <div class="session-field">
                <label class="session-field-label">Work on this for</label>
                ${periodChipsHtml()}
            </div>
        `;
    }

    function intentionFormHtml() {
        return `
            <div class="session-field">
                <label class="session-field-label">Title</label>
                <input type="text" class="session-input" id="goal-title-input"
                       placeholder="${['feel at home in the Friday intermediate class', 'stop dreading centre', 'actually enjoy the adage'][phIdx]}"
                       value="${escapeHtml(d.title)}"
                       oninput="appState._goalDraft.title = this.value; searchGoalCorrections(this.value);" />
                <div id="goal-correction-search-results"></div>
            </div>
            ${(d.correctionIds || []).length ? `
                <div class="session-field">
                    <label class="session-field-label">Linked corrections</label>
                    <div id="goal-linked-corrections">
                        ${renderLinkedCorrectionsHtml(d.correctionIds)}
                    </div>
                </div>
            ` : `<div id="goal-linked-corrections-wrapper"></div>`}
            <div class="session-field">
                <label class="session-field-label">describe it <span class="session-field-optional">optional</span></label>
                <textarea class="session-input" id="goal-body-input"
                          placeholder="${['not panicking at centre, following combinations without watching everyone else', 'trusting what I know instead of second-guessing it', 'finding it interesting rather than overwhelming'][phIdx]}"
                          rows="2"
                          style="resize: none;"
                          oninput="appState._goalDraft.body = this.value; autoResizeTextarea(this);">${escapeHtml(d.body || '')}</textarea>
            </div>
            <div class="session-field">
                <label class="session-field-label">Work on this for</label>
                ${periodChipsHtml()}
            </div>
        `;
    }

    function habitFormHtml() {
        const isSetNum = d.howOften && d.howOften.startsWith('x');
        const presetHowOften = ['Every class', 'Every week', 'set a number', 'other'];
        const isOtherHowOften = d.howOften && !presetHowOften.includes(d.howOften) && !isSetNum;
        const howOftenChipsHtml = howOftenOptions.map(o => {
            let isActive = false;
            if (o === 'set a number') isActive = isSetNum;
            else if (o === 'other') isActive = isOtherHowOften;
            else isActive = d.howOften === o;
            return `<button class="goal-period-chip ${isActive ? 'selected' : ''}" onmousedown="setGoalHowOften('${o}')">${o}</button>`;
        }).join('');

        const numVal = isSetNum ? parseInt(d.howOften.slice(1)) || 1 : 1;
        let howOftenExtra = '';
        if (d.howOften === 'set a number' || isSetNum) {
            howOftenExtra = `
                <div class="goal-number-stepper">
                    <button class="goal-stepper-btn" onmousedown="adjustGoalHowOftenNum(-1)" ${numVal <= 1 ? 'disabled' : ''}>−</button>
                    <span class="goal-stepper-value">${numVal}</span>
                    <button class="goal-stepper-btn" onmousedown="adjustGoalHowOftenNum(1)">+</button>
                    <span class="goal-stepper-label">times per week</span>
                </div>
            `;
        } else if (d.howOften === 'other' || isOtherHowOften) {
            howOftenExtra = `
                <input type="text" class="session-input" style="margin-top: var(--sp-sm);"
                       placeholder="e.g. whenever I feel ready"
                       value="${isOtherHowOften ? escapeHtml(d.howOften) : ''}"
                       oninput="appState._goalDraft.howOften = this.value || 'other'" />
            `;
        }

        return `
            <div class="session-field">
                <label class="session-field-label">Title</label>
                <input type="text" class="session-input" id="goal-title-input"
                       placeholder="${['actually warm up before class', 'get to conditioning', 'stretch on the days I don\'t have class'][phIdx]}"
                       value="${escapeHtml(d.title)}"
                       oninput="appState._goalDraft.title = this.value; searchGoalCorrections(this.value);" />
                <div id="goal-correction-search-results"></div>
            </div>
            ${(d.correctionIds || []).length ? `
                <div class="session-field">
                    <label class="session-field-label">Linked corrections</label>
                    <div id="goal-linked-corrections">
                        ${renderLinkedCorrectionsHtml(d.correctionIds)}
                    </div>
                </div>
            ` : `<div id="goal-linked-corrections-wrapper"></div>`}
            <div class="session-field">
                <label class="session-field-label">what does it involve? <span class="session-field-optional">optional</span></label>
                <textarea class="session-input" id="goal-body-input"
                          placeholder="${['20 minutes of stretching and relevés before I get into class', 'the full warm-up, not just a quick stretch in the changing room', 'hip flexors and hamstrings, 15 minutes minimum'][phIdx]}"
                          rows="2"
                          style="resize: none;"
                          oninput="appState._goalDraft.body = this.value; autoResizeTextarea(this);">${escapeHtml(d.body || '')}</textarea>
            </div>
            <div class="session-field">
                <label class="session-field-label">How often</label>
                <div class="goal-period-chips">${howOftenChipsHtml}</div>
                ${howOftenExtra}
            </div>
            <div class="session-field">
                <label class="session-field-label">Work on this for</label>
                ${periodChipsHtml()}
            </div>
        `;
    }

    const typeTabsHtml = d.goalType ? `
        <div class="goal-type-tabs" id="goal-type-tabs">
            <button type="button" class="goal-type-tab ${d.goalType === 'skill' ? 'active' : ''}" data-type="skill">A skill</button>
            <button type="button" class="goal-type-tab ${d.goalType === 'body' ? 'active' : ''}" data-type="body">Body</button>
            <button type="button" class="goal-type-tab ${d.goalType === 'intention' ? 'active' : ''}" data-type="intention">A feeling or state</button>
            <button type="button" class="goal-type-tab ${d.goalType === 'habit' ? 'active' : ''}" data-type="habit">A habit</button>
        </div>
    ` : '';

    let bodyHtml = '';
    if (d.goalType === 'skill') bodyHtml = skillFormHtml();
    else if (d.goalType === 'body') bodyHtml = bodyGoalFormHtml();
    else if (d.goalType === 'intention') bodyHtml = intentionFormHtml();
    else if (d.goalType === 'habit') bodyHtml = habitFormHtml();
    if (bodyHtml && d._editId) {
        bodyHtml += `<div style="margin-top: var(--sp-xl); text-align: center;"><button class="goal-delete-btn" onmousedown="deleteGoal('${d._editId}')">delete goal</button></div>`;
    }

    let footerHtml;
    if (d.goalType) {
        footerHtml = `
            <button class="session-discard-btn" onmousedown="confirmDiscardGoal()">discard</button>
            <button class="btn-large session-save-btn" onmousedown="saveGoal()">save goal</button>
        `;
    } else {
        footerHtml = '';
    }

    overlay.innerHTML = `
        <div class="session-logger-sheet">
            <div class="session-sheet-handle"></div>

            <div class="session-logger-header">
                <div>
                    <div class="session-logger-eyebrow">Set a goal</div>
                    <h2 class="session-logger-title">What are you working toward?</h2>
                </div>
                <button type="button" class="session-close-btn" onmousedown="confirmDiscardGoal()">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                        <line x1="4" y1="4" x2="14" y2="14"/><line x1="14" y1="4" x2="4" y2="14"/>
                    </svg>
                </button>
            </div>

            ${typeTabsHtml}

            <div class="session-logger-body">
                ${bodyHtml || `
                    <div class="goal-type-cards">
                        <button class="goal-type-card" data-type="skill">
                            <span class="goal-type-card-name">A skill</span>
                            <span class="goal-type-card-desc">Something specific. A technique, a step, a quality of movement.</span>
                        </button>
                        <button class="goal-type-card" data-type="intention">
                            <span class="goal-type-card-name">A feeling or state</span>
                            <span class="goal-type-card-desc">Presence, confidence, ease. Harder to measure, worth naming.</span>
                        </button>
                        <button class="goal-type-card" data-type="habit">
                            <span class="goal-type-card-name">A habit</span>
                            <span class="goal-type-card-desc">A rhythm to build in. Conditioning, practice, consistency.</span>
                        </button>
                    </div>
                `}
                ${bodyHtml ? `<div style="height: var(--sp-3xl);"></div>` : ''}
            </div>

            <div class="session-logger-footer">
                ${footerHtml}
            </div>
        </div>
    `;

    // Attach tab + type card listeners via JS (inline handlers in innerHTML unreliable in Safari)
    document.querySelectorAll('#goal-type-tabs .goal-type-tab, .goal-type-card').forEach(btn => {
        btn.addEventListener('click', () => setGoalType(btn.dataset.type));
    });
}

function selectGoalCategory(cat) {
    if (!appState._goalDraft) return;
    appState._goalDraft.category = cat;
    const field = document.getElementById('goal-category-field');
    if (field) {
        field.innerHTML = `
            <div class="goal-category-set">
                <span class="recurrence-chip selected">${cat}</span>
                <button class="goal-category-clear" onmousedown="clearGoalCategory()">×</button>
            </div>`;
    }
}

function setGoalType(type) {
    const d = appState._goalDraft;
    if (!d) return;
    d.goalType = type;
    d.progressMarkers = [];
    d.skillIds = [];
    d.howOften = '';
    renderGoalCreator();
    requestAnimationFrame(() => document.getElementById('goal-title-input')?.focus());
}

function toggleGoalSkill(skillId) {
    const d = appState._goalDraft;
    if (!d) return;
    const idx = d.skillIds.indexOf(skillId);
    if (idx > -1) d.skillIds.splice(idx, 1);
    else d.skillIds.push(skillId);
    renderGoalCreator();
}

function setGoalPeriod(period) {
    const d = appState._goalDraft;
    if (!d) return;
    d.commitmentPeriod = period;
    renderGoalCreator();
    if (period === 'Choose a date') requestAnimationFrame(() => toggleGoalDateCalendar());
}

function toggleGoalDateCalendar() {
    const existing = document.getElementById('goal-date-calendar-popup');
    if (existing) { existing.remove(); return; }
    const d = appState._goalDraft;
    if (!d) return;
    const todayStr = new Date().toISOString().split('T')[0];
    const presets = ['A week', 'Two weeks', 'A month', 'Three months', 'Choose a date'];
    const isRealDate = d.commitmentPeriod && !presets.includes(d.commitmentPeriod) && /^\d{4}-\d{2}-\d{2}$/.test(d.commitmentPeriod);
    renderGoalDateCalendar(isRealDate ? d.commitmentPeriod : todayStr);
}

function renderGoalDateCalendar(selectedDateStr) {
    const existing = document.getElementById('goal-date-calendar-popup');
    if (existing) existing.remove();

    const todayStr = new Date().toISOString().split('T')[0];
    const sel = new Date(selectedDateStr + 'T12:00:00');
    const viewYear = sel.getFullYear();
    const viewMonth = sel.getMonth();

    const firstDay = new Date(viewYear, viewMonth, 1);
    const lastDay  = new Date(viewYear, viewMonth + 1, 0);
    const startDow = (firstDay.getDay() + 6) % 7; // Mon=0
    const monthLabel = firstDay.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

    const todayD = new Date(todayStr + 'T12:00:00');
    const canGoPrev = viewYear > todayD.getFullYear() || (viewYear === todayD.getFullYear() && viewMonth > todayD.getMonth());

    const dowHeaders = ['M','T','W','T','F','S','S'].map(d => `<div class="date-cal-dow">${d}</div>`).join('');

    let dayCells = '';
    for (let i = 0; i < startDow; i++) dayCells += `<button class="date-cal-day empty" disabled></button>`;
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const dStr = `${viewYear}-${String(viewMonth + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
        const isSelected = dStr === selectedDateStr;
        const isPast = dStr < todayStr;
        const isToday = dStr === todayStr;
        const cls = ['date-cal-day', isSelected ? 'selected' : '', isToday && !isSelected ? 'today' : ''].filter(Boolean).join(' ');
        dayCells += `<button class="${cls}" onmousedown="pickGoalCalendarDate('${dStr}')" ${isPast ? 'disabled' : ''}>${day}</button>`;
    }

    const popup = document.createElement('div');
    popup.id = 'goal-date-calendar-popup';
    popup.className = 'date-calendar-popup';
    popup.innerHTML = `
        <div class="date-cal-header">
            <button class="date-cal-nav" onmousedown="renderGoalDateCalendar(getCalNavMonth('${selectedDateStr}', -1))" ${canGoPrev ? '' : 'disabled'}>‹</button>
            <span class="date-cal-month-label">${monthLabel}</span>
            <button class="date-cal-nav" onmousedown="renderGoalDateCalendar(getCalNavMonth('${selectedDateStr}', 1))">›</button>
        </div>
        <div class="date-cal-grid">
            ${dowHeaders}
            ${dayCells}
        </div>
    `;

    const picker = document.getElementById('goal-period-date-picker');
    if (picker) picker.appendChild(popup);
}

function pickGoalCalendarDate(dateStr) {
    const d = appState._goalDraft;
    if (!d) return;
    d.commitmentPeriod = dateStr;
    document.getElementById('goal-date-calendar-popup')?.remove();
    // Update display in-place
    const display = document.querySelector('#goal-period-date-picker .date-display');
    if (display) {
        const dt = new Date(dateStr + 'T12:00:00');
        const formatted = dt.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
        display.innerHTML = `<span class="date-display-label">${formatted}</span>`;
    }
}

function checkGoalTitleForSkills(text) {
    const matches = detectSkillsInText(text);
    const container = document.getElementById('goal-title-input')?.closest('.session-field');
    const existing = document.getElementById('goal-title-skill-hint');

    if (!matches.length) {
        if (existing) existing.remove();
        return;
    }

    const d = appState._goalDraft;
    const fresh = d ? matches.filter(m => m.topicId.replace('skill:', '') !== d.skillId) : matches;

    if (!fresh.length) {
        if (existing) existing.remove();
        return;
    }

    let el = existing || document.createElement('div');
    el.id = 'goal-title-skill-hint';
    el.className = 'skill-suggestion-chip-row';
    el.innerHTML = fresh.map(m => {
        const skillId = m.topicId.replace('skill:', '');
        return `<button class="skill-suggestion-chip"
            onmousedown="acceptGoalSkillSuggestion('${escapeHtml(skillId)}', '${escapeHtml(m.label).replace(/'/g, "\\'")}')">
            link to ${escapeHtml(m.label)} →
        </button>`;
    }).join('');
    if (!existing && container) container.appendChild(el);
}

function acceptGoalSkillSuggestion(skillId, label) {
    const d = appState._goalDraft;
    if (!d) return;
    d.skillId = skillId;
    const input = document.getElementById('goal-skill-input');
    if (input) input.value = label;
    const hint = document.getElementById('goal-title-skill-hint');
    if (hint) hint.remove();
}

function setGoalHowOften(val) {
    const d = appState._goalDraft;
    if (!d) return;
    d.howOften = val;
    renderGoalCreator();
}

function adjustGoalHowOftenNum(delta) {
    const d = appState._goalDraft;
    if (!d) return;
    const current = d.howOften && d.howOften.startsWith('x') ? parseInt(d.howOften.slice(1)) || 1 : 1;
    const next = Math.max(1, current + delta);
    d.howOften = `x${next}`;
    // Update DOM directly to avoid full re-render on stepper taps
    const valueEl = document.querySelector('.goal-stepper-value');
    const minusBtn = document.querySelector('.goal-stepper-btn');
    if (valueEl) valueEl.textContent = next;
    if (minusBtn) minusBtn.disabled = next <= 1;
}

function filterGoalSkills(query) {
    const dropdown = document.getElementById('goal-skill-dropdown');
    if (!dropdown) return;
    const d = appState._goalDraft;
    const currentTopicId = d?.skillId ? 'skill:' + d.skillId : (d?.dimensionId || null);
    renderSkillPickerDropdown(dropdown, query, (topicId, label) => {
        selectGoalLinkedTopic(topicId, label);
        dropdown.style.display = 'none';
    }, { includeDimensions: true, currentTopicId });
}

function selectGoalLinkedTopic(topicId, label) {
    const d = appState._goalDraft;
    if (!d) return;
    if (topicId.startsWith('skill:')) {
        d.skillId = topicId.replace('skill:', '');
        d.dimensionId = null;
    } else {
        d.skillId = null;
        d.dimensionId = topicId;
    }
    const input = document.getElementById('goal-skill-input');
    if (input) input.value = label;
    const dropdown = document.getElementById('goal-skill-dropdown');
    if (dropdown) dropdown.style.display = 'none';
}

function clearGoalSkill() {
    const d = appState._goalDraft;
    if (!d) return;
    d.skillId = null;
    d.dimensionId = null;
    const input = document.getElementById('goal-skill-input');
    if (input) { input.value = ''; input.focus(); }
    const dropdown = document.getElementById('goal-skill-dropdown');
    if (dropdown) { dropdown.style.display = 'none'; }
    filterGoalSkills('');
}

function addProgressMarker() {
    const d = appState._goalDraft;
    if (!d) return;
    d.progressMarkers.push({ id: generateId(), text: '', done: false });
    renderGoalCreator();
    requestAnimationFrame(() => {
        const inputs = document.querySelectorAll('.goal-marker-input');
        if (inputs.length) inputs[inputs.length - 1].focus();
    });
}

function removeProgressMarker(i) {
    const d = appState._goalDraft;
    if (!d) return;
    d.progressMarkers.splice(i, 1);
    renderGoalCreator();
}

function isDraftChanged() {
    const d = appState._goalDraft;
    if (!d) return false;
    if (!d._snapshot) {
        // New goal — changed if any content entered
        return !!(d.title?.trim() || d.body?.trim() || (d.progressMarkers || []).some(m => m.text?.trim()));
    }
    const s = d._snapshot;
    const currentMarkers = JSON.stringify((d.progressMarkers || []).filter(m => m.text?.trim()).map(m => ({ text: m.text, done: m.done })));
    return (
        d.title            !== s.title ||
        (d.body || '')     !== s.body  ||
        d.skillId          !== s.skillId ||
        d.category         !== s.category ||
        d.howOften         !== s.howOften ||
        d.commitmentPeriod !== s.commitmentPeriod ||
        currentMarkers     !== s.markers
    );
}

function confirmDiscardGoal() {
    if (!isDraftChanged()) { closeGoalCreator(); return; }
    showGoalDiscardBanner();
}

function showGoalDiscardBanner() {
    const footer = document.querySelector('#goal-creator-overlay .session-logger-footer');
    if (!footer || document.getElementById('goal-discard-banner')) return;
    const footerDiscard = footer.querySelector('.session-discard-btn');
    if (footerDiscard) footerDiscard.style.visibility = 'hidden';
    const banner = document.createElement('div');
    banner.id = 'goal-discard-banner';
    banner.className = 'goal-discard-banner';
    banner.innerHTML = `
        <span>discard changes?</span>
        <button onmousedown="closeGoalCreator()">discard</button>
        <button onmousedown="removeGoalDiscardBanner()">keep editing</button>
    `;
    footer.insertAdjacentElement('beforebegin', banner);
    requestAnimationFrame(() => banner.classList.add('visible'));
}

function removeGoalDiscardBanner() {
    const banner = document.getElementById('goal-discard-banner');
    if (!banner) return;
    const footer = document.querySelector('#goal-creator-overlay .session-logger-footer');
    const footerDiscard = footer?.querySelector('.session-discard-btn');
    if (footerDiscard) footerDiscard.style.visibility = '';
    banner.classList.remove('visible');
    banner.addEventListener('transitionend', () => banner.remove(), { once: true });
}

function clearGoalCategory() {
    if (!appState._goalDraft) return;
    appState._goalDraft.category = null;
    const field = document.getElementById('goal-category-field');
    if (field) {
        field.innerHTML = `<button class="goal-category-add-btn" onmousedown="openGoalCategoryInput()">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="6" y1="1" x2="6" y2="11"/><line x1="1" y1="6" x2="11" y2="6"/></svg>
            add category
        </button>`;
    }
}

function openGoalCategoryInput() {
    const field = document.getElementById('goal-category-field');
    if (!field) return;
    const priorCats = [...new Set((appState.goals || []).map(g => g.category).filter(Boolean))];
    const suggestions = [...new Set([...priorCats, ...GOAL_CATEGORIES])];
    field.innerHTML = `
        <div class="goal-category-input-wrap">
            <input type="text" class="session-input goal-category-input"
                   id="goal-category-input"
                   placeholder="e.g. Rehearsal, Class, Home practice…"
                   autocomplete="off"
                   oninput="filterGoalCategorySuggestions(this.value)"
                   onkeydown="if(event.key==='Enter'){event.preventDefault();commitGoalCategory(this.value);}" />
            <div class="goal-category-suggestions" id="goal-category-suggestions">
                ${suggestions.map(s => `
                    <button class="goal-category-suggestion" onmousedown="commitGoalCategory('${s}')">${s}</button>
                `).join('')}
            </div>
        </div>`;
    requestAnimationFrame(() => document.getElementById('goal-category-input')?.focus());
}

function filterGoalCategorySuggestions(val) {
    const container = document.getElementById('goal-category-suggestions');
    if (!container) return;
    const q = val.toLowerCase();
    const priorCats = [...new Set((appState.goals || []).map(g => g.category).filter(Boolean))];
    const all = [...new Set([...priorCats, ...GOAL_CATEGORIES])];
    const filtered = q ? all.filter(s => s.toLowerCase().includes(q)) : all;
    container.innerHTML = filtered.map(s => `
        <button class="goal-category-suggestion" onmousedown="commitGoalCategory('${s}')">${s}</button>
    `).join('');
}

function commitGoalCategory(cat) {
    const val = cat?.trim() || document.getElementById('goal-category-input')?.value?.trim();
    if (val) selectGoalCategory(val);
}

function addMilestoneDraft() {
    if (!appState._goalDraft) return;
    appState._goalDraft.milestones.push({ id: generateId(), text: '', done: false });
    renderMilestoneDraftList();
    const list = document.getElementById('goal-milestones-list');
    if (list) {
        const inputs = list.querySelectorAll('input');
        inputs[inputs.length - 1]?.focus();
    }
}

function renderMilestoneDraftList() {
    const list = document.getElementById('goal-milestones-list');
    if (!list) return;
    const d = appState._goalDraft;
    list.innerHTML = d.milestones.map((m, i) => `
        <div class="goal-draft-milestone">
            <input type="text" class="session-input" style="flex:1; padding: 10px var(--sp-md);"
                   value="${m.text}"
                   oninput="appState._goalDraft.milestones[${i}].text = this.value"
                   onkeydown="handleMilestoneKeydown(event, ${i})"
                   placeholder="Milestone ${i + 1}" />
            <button class="block-remove-btn" onmousedown="removeMilestoneDraft(${i})">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <line x1="3" y1="3" x2="11" y2="11"/><line x1="11" y1="3" x2="3" y2="11"/>
                </svg>
            </button>
        </div>
    `).join('');
}

function handleMilestoneKeydown(event, index) {
    if (event.key === 'Enter') {
        event.preventDefault();
        // Save current value
        const input = event.target;
        if (appState._goalDraft?.milestones[index]) {
            appState._goalDraft.milestones[index].text = input.value;
        }
        // Add next milestone and focus it
        addMilestoneDraft();
    }
}

function removeMilestoneDraft(index) {
    if (!appState._goalDraft) return;
    appState._goalDraft.milestones.splice(index, 1);
    renderMilestoneDraftList();
}

// Strips accents and lowercases for fuzzy matching (handles fouetté → fouette etc)
function normaliseStr(str) {
    return (str || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function searchGoalCorrections(query) {
    const resultsEl = document.getElementById('goal-correction-search-results');
    if (!resultsEl) return;

    const q = normaliseStr(query.trim());
    if (q.length < 3) {
        resultsEl.innerHTML = '';
        return;
    }

    const d = appState._goalDraft;
    const linked = d?.correctionIds || [];

    const matches = appState.corrections
        .filter(c => normaliseStr(c.text).includes(q) && !linked.includes(c.id))
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 5);

    if (matches.length === 0) {
        resultsEl.innerHTML = '';
        return;
    }

    resultsEl.innerHTML = `
        <div class="goal-correction-suggestions">
            <div class="goal-correction-suggestions-label">Relevant corrections — tap to link</div>
            ${matches.map(c => {
                const skill = DATA.skills.find(s => s.id === c.skillId);
                const date = formatTimelineDate(new Date(c.createdAt).toISOString().split('T')[0]);
                return `
                    <div class="goal-correction-suggestion" onmousedown="linkCorrectionToGoal('${c.id}')">
                        <div class="goal-correction-suggestion-text">${c.text}</div>
                        <div class="goal-correction-suggestion-meta">${[skill?.french, date].filter(Boolean).join(' · ')}</div>
                    </div>`;
            }).join('')}
        </div>`;
}

function renderLinkedCorrectionsHtml(correctionIds) {
    return (correctionIds || []).map(id => {
        const c = appState.corrections.find(c => c.id === id);
        if (!c) return '';
        const skill = DATA.skills.find(s => s.id === c.skillId);
        const date = formatTimelineDate(new Date(c.createdAt).toISOString().split('T')[0]);
        return `
            <div class="goal-linked-correction">
                <div class="goal-linked-correction-text">${c.text}</div>
                <div class="goal-linked-correction-meta">${[skill?.french, date].filter(Boolean).join(' · ')}</div>
                <button class="goal-unlink-correction" onmousedown="unlinkCorrectionFromGoal(${id})">unlink</button>
            </div>`;
    }).join('');
}

function linkCorrectionToGoal(correctionId) {
    const d = appState._goalDraft;
    if (!d) return;
    d.correctionIds = d.correctionIds || [];
    if (!d.correctionIds.includes(correctionId)) {
        d.correctionIds.push(correctionId);
    }
    // Re-render linked section and clear this correction from suggestions
    renderGoalLinkedCorrectionsInPlace();
    // Re-run search to remove this correction from suggestions
    const titleInput = document.getElementById('goal-title-input');
    if (titleInput) searchGoalCorrections(titleInput.value);
}

function unlinkCorrectionFromGoal(correctionId) {
    const d = appState._goalDraft;
    if (!d) return;
    d.correctionIds = (d.correctionIds || []).filter(id => id !== correctionId);
    renderGoalLinkedCorrectionsInPlace();
}

function renderGoalLinkedCorrectionsInPlace() {
    const d = appState._goalDraft;
    if (!d) return;
    const ids = d.correctionIds || [];

    // Update or create the linked corrections section
    let wrapper = document.getElementById('goal-linked-corrections-wrapper');
    let section = document.getElementById('goal-linked-corrections');

    if (ids.length > 0) {
        if (section) {
            section.innerHTML = renderLinkedCorrectionsHtml(ids);
        } else if (wrapper) {
            wrapper.outerHTML = `
                <div class="session-field">
                    <label class="session-field-label">Linked corrections</label>
                    <div id="goal-linked-corrections">
                        ${renderLinkedCorrectionsHtml(ids)}
                    </div>
                </div>`;
        }
    } else if (section) {
        // All unlinked — hide section
        section.closest('.session-field')?.remove();
        // Re-insert empty wrapper for future linking
        const bodyField = document.getElementById('goal-body-input')?.closest('.session-field');
        if (bodyField) {
            const empty = document.createElement('div');
            empty.id = 'goal-linked-corrections-wrapper';
            bodyField.after(empty);
        }
    }
}

function saveGoal() {
    const d = appState._goalDraft;
    if (!d || !d.title.trim()) {
        const titleInput = document.getElementById('goal-title-input');
        if (titleInput) { titleInput.focus(); titleInput.classList.add('input-error'); }
        return;
    }

    const isEdit = !!d._editId;
    const existingGoal = isEdit ? appState.goals.find(g => g.id === d._editId) : null;

    const goal = {
        id:               isEdit ? d._editId : generateId(),
        userId:           null,
        title:            d.title.trim(),
        body:             d.body?.trim()  || null,
        createdAt:        existingGoal?.createdAt || Date.now(),
        dueDate:          d.dueDate       || null,
        skillId:          d.skillId       || null,
        dimensionId:      d.dimensionId   || null,
        category:         d.category      || null,
        correctionIds:    d.correctionIds || [],
        milestones:       (d.milestones || []).filter(m => m.text?.trim()).map(m => ({
            id:   m.id || generateId(),
            text: m.text.trim(),
            done: m.done || false,
        })),
        status:           existingGoal?.status || 'active',
        completedAt:      existingGoal?.completedAt || null,
        pausedAt:         existingGoal?.pausedAt    || null,
        letGoAt:          existingGoal?.letGoAt     || null,
        goalType:         d.goalType         || null,
        commitmentPeriod: d.commitmentPeriod || null,
        progressMarkers:  (d.progressMarkers || []).filter(m => m.text.trim()).map(m => ({
            id:   m.id || generateId(),
            text: m.text.trim(),
            done: m.done || false,
        })),
        howOften:         d.howOften || null,
        skillIds:         d.skillIds || [],
        // TODO(Task5): renewal hook — attach renewal prompt logic here
    };

    if (isEdit) {
        const idx = appState.goals.findIndex(g => g.id === d._editId);
        if (idx > -1) appState.goals[idx] = goal;
    } else {
        appState.goals.unshift(goal); // newest first
    }
    storage.save('goals', appState.goals);
    markGettingStarted('setGoal');
    closeGoalCreator();

    if (appState.currentScreen === 'goals-screen') renderGoalsScreen();
    if (appState.currentScreen === 'profile') initProfile();

    // Refresh skill detail linked goals if we're on a skill detail screen
    if (appState.currentScreen?.startsWith('skill-detail-')) {
        const skillId = appState.currentScreen.replace('skill-detail-', '');
        // Re-render just the linked goals section
        const linkedSection = document.querySelector(`#skill-detail-${skillId} .skill-linked-goals`);
        if (linkedSection) {
            const linkedGoals = (appState.goals || []).filter(g => g.skillId === skillId && g.status === 'active');
            linkedSection.innerHTML = linkedGoals.length > 0
                ? linkedGoals.map(g => `
                    <div class="skill-linked-goal" onclick="navigateTo('goals')">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="6" cy="6" r="5"/><circle cx="6" cy="6" r="2.5"/></svg>
                        <span>${g.title}</span>
                    </div>`).join('')
                : `<div class="skill-detail-empty-state">No goals linked to this skill.</div>`;
        }
    }
}

function toggleMilestone(goalId, milestoneIndex) {
    const goal = appState.goals.find(g => g.id === goalId);
    const markers = goal && (goal.progressMarkers || goal.milestones);
    if (!goal || !markers || !markers[milestoneIndex]) return;
    const milestone = markers[milestoneIndex];
    milestone.done = !milestone.done;
    storage.save('goals', appState.goals);
    // Write timeline entry if milestone just completed
    if (milestone.done) {
        appendTimelineEntry({
            type:     'milestone',
            objectId: milestone.id,
            title:    'Milestone reached',
            body:     `${milestone.text} — ${goal.title}`,
            date:     new Date().toISOString().split('T')[0],
        });
    }
    if (appState.currentScreen === 'goals-screen') renderGoalsScreen();
    if (appState.currentScreen === 'profile') initProfile();
}

function markGoalComplete(goalId) {
    const goal = appState.goals.find(g => g.id === goalId);
    if (!goal || goal.status === 'completed') return;
    goal.status = 'completed';
    goal.completedAt = Date.now();
    storage.save('goals', appState.goals);
    appendTimelineEntry({
        type:     'milestone',
        objectId: goal.id,
        title:    'Goal completed',
        body:     goal.title,
        date:     new Date().toISOString().split('T')[0],
    });
    showGoalCompleteMessage(goal.title);
    if (appState.currentScreen === 'goals-screen') renderGoalsScreen();
    if (appState.currentScreen === 'profile') initProfile();
    // Nudge for optional reflection note — fires after toast clears
    setTimeout(() => {
        showContextualPrompt({
            body: 'goal completed. anything to note?',
            primaryLabel: 'add a note',
            primaryFn: `openGoalReflectionSheet('${goal.id}')`,
            suppressKey: `goal-reflection-${goal.id}`,
        });
    }, 2800);
}

function showGoalCompleteMessage(title) {
    const existing = document.getElementById('goal-complete-toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.id = 'goal-complete-toast';
    toast.className = 'goal-complete-toast';
    toast.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="2 8 6 12 14 4"/></svg>
        <span>Goal complete${title ? ` — ${title}` : ''}</span>
    `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('visible'));
    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// Open the goal reflection in view mode (Image 4) — full-screen note detail
function showGoalReflectionDetail(goalId) {
    const goal = appState.goals.find(g => g.id === goalId);
    if (!goal) return;
    if (goal.reflectionSessionId) {
        showNoteDetail(goal.reflectionSessionId);
    } else {
        // No reflection yet — open editor to create one
        openGoalReflectionSheet(goalId);
    }
}

// Open the goal reflection editor (Image 5) — session logger note mode
function openGoalReflectionSheet(goalId) {
    const goal = appState.goals.find(g => g.id === goalId);
    if (!goal) return;

    // If an existing reflection session exists, edit it via the standard note editor
    if (goal.reflectionSessionId) {
        openNoteEditor(goal.reflectionSessionId);
        return;
    }

    const placeholders = ["what shifted?", "what's still there?", "what would you do differently?"];
    const placeholder = placeholders[goalId ? goalId.charCodeAt(0) % 3 : 0];

    // Open session logger in note mode, with reflection linkage
    let overlay = document.getElementById('session-logger-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'session-logger-overlay';
        overlay.className = 'session-overlay';
        document.body.appendChild(overlay);
        overlay.addEventListener('mousedown', e => { if (e.target === overlay) closeSessionLogger(); });
    }
    appState.currentSession = {
        id:                generateId(),
        date:              new Date().toISOString().split('T')[0],
        generalNotes:      '',
        blocks:            [],
        _mode:             'note',
        _isEdit:           false,
        _reflectionGoalId: goalId,
        _placeholder:      placeholder,
    };
    renderSessionLogger();
    document.querySelector('.fab')?.classList.remove('visible');
    document.querySelector('.bottom-nav')?.classList.remove('visible');
    requestAnimationFrame(() => overlay.classList.add('open'));
    attachSheetSwipe();
}

function reopenGoal(goalId) {
    const goal = appState.goals.find(g => g.id === goalId);
    if (!goal) return;
    goal.status = 'active';
    goal.completedAt = null;
    storage.save('goals', appState.goals);
    if (appState.currentScreen === 'goals-screen') renderGoalsScreen();
    if (appState.currentScreen === 'profile') initProfile();
}

function pauseGoal(goalId) {
    const goal = appState.goals.find(g => g.id === goalId);
    if (!goal) return;
    goal.status   = 'paused';
    goal.pausedAt = Date.now();
    storage.save('goals', appState.goals);
    const row = document.querySelector(`.swipe-row[data-goal-id="${goalId}"]`);
    if (row) {
        row.style.transition  = 'max-height 0.3s var(--ease-out), opacity 0.3s ease, margin 0.3s ease';
        row.style.maxHeight   = row.offsetHeight + 'px';
        requestAnimationFrame(() => {
            row.style.maxHeight   = '0';
            row.style.opacity     = '0';
            row.style.marginBottom = '0';
        });
        setTimeout(() => renderGoalsScreen(), 320);
    } else {
        renderGoalsScreen();
    }
    if (appState.currentScreen === 'profile') initProfile();
}

function letGoGoal(goalId) {
    const goal = appState.goals.find(g => g.id === goalId);
    if (!goal) return;
    goal.status  = 'letgo';
    goal.letGoAt = Date.now();
    storage.save('goals', appState.goals);
    const row = document.querySelector(`.swipe-row[data-goal-id="${goalId}"]`);
    if (row) {
        row.style.transition  = 'max-height 0.3s var(--ease-out), opacity 0.3s ease, margin 0.3s ease';
        row.style.maxHeight   = row.offsetHeight + 'px';
        requestAnimationFrame(() => {
            row.style.maxHeight   = '0';
            row.style.opacity     = '0';
            row.style.marginBottom = '0';
        });
        setTimeout(() => renderGoalsScreen(), 320);
    } else {
        renderGoalsScreen();
    }
    if (appState.currentScreen === 'profile') initProfile();
}

function deleteGoal(goalId) {
    appState.goals = appState.goals.filter(g => g.id !== goalId);
    storage.save('goals', appState.goals);
    closeGoalCreator();
    if (appState.currentScreen === 'goals-screen') renderGoalsScreen();
    if (appState.currentScreen === 'profile') initProfile();
}

function deleteSession(sessionId) {
    if (!confirm('Delete this session? This cannot be undone.')) return;

    // Remove session
    appState.sessions = appState.sessions.filter(s => s.id !== sessionId);

    // Remove SessionSkills and their Corrections
    const sessionSkillIds = appState.sessionSkills
        .filter(ss => ss.sessionId === sessionId)
        .flatMap(ss => ss.correctionIds || []);
    appState.corrections  = appState.corrections.filter(c =>
        !(c.sessionId === sessionId && sessionSkillIds.includes(c.id)));
    appState.sessionSkills = appState.sessionSkills.filter(ss => ss.sessionId !== sessionId);

    // Remove timeline entry
    appState.timeline = appState.timeline.filter(e => e.objectId !== sessionId);

    storage.save('sessions', appState.sessions);
    storage.save('sessionSkills', appState.sessionSkills);
    storage.save('corrections', appState.corrections);
    storage.save('timeline', appState.timeline);

    // Remove detail screen DOM, then go back
    document.getElementById(`session-detail-${sessionId}`)?.remove();
    goBack();
}

function deleteSkillNote(noteId, skillId) {
    appState.skillNotes = (appState.skillNotes || []).filter(n => n.id !== noteId);
    storage.save('skillNotes', appState.skillNotes);
    const sectionEl = document.getElementById(`skill-notes-section-${skillId}`);
    if (sectionEl) renderSkillNotesSectionInPlace(skillId, sectionEl);
}

function editSessionTemplate(templateId) {
    const template = appState.sessionTemplates.find(t => t.id === templateId);
    if (!template) return;
    const dropdown = document.getElementById('session-combobox-dropdown');
    if (dropdown) dropdown.style.display = 'none';
    appState._addingNewTemplate = true;
    appState._editingTemplateId = templateId;
    appState._draftTemplate = {
        _editingId: templateId,
        name:       template.name,
        location:   template.location || '',
        classType:  template.classType || null,
        days:       [...(template.days || [])],
    };
    renderNewSessionForm();
}

function deleteSessionTemplate(templateId) {
    if (!confirm('Remove this saved session?')) return;
    appState.sessionTemplates = appState.sessionTemplates.filter(t => t.id !== templateId);
    storage.save('sessionTemplates', appState.sessionTemplates);
    renderSessionLogger(); // refresh the logger combobox
}

// ── Learn ──
function showLearnScreen() {
    storage.save('hasVisitedLearn', true);
    markGettingStarted('exploreLearn');
    let screen = document.getElementById('learn-screen');
    if (!screen) {
        screen = document.createElement('div');
        screen.id = 'learn-screen';
        screen.className = 'screen';
        document.querySelector('.app-container').appendChild(screen);
    }
    screen.innerHTML = `
        <div class="profile-header">
            <h1>Learn</h1>
            <p class="screen-subtitle">Deepen your understanding</p>
        </div>
        <div class="learn-search-wrap">
            <input
                class="learn-search-input"
                type="search"
                placeholder="Search skills, terms, repertoire…"
                oninput="handleLearnSearch(this.value)"
            />
        </div>
        <div id="learn-search-results" class="learn-search-results" style="display:none;"></div>
        <div class="learn-filter-chips" id="learn-filter-chips">
            <button class="learn-chip active" data-filter="all" onclick="filterLearnScreen('all', this)">All</button>
            <button class="learn-chip${(appState.learnBookmarks || []).length === 0 ? ' disabled' : ''}" data-filter="bookmarked" onclick="filterLearnScreen('bookmarked', this)">Bookmarked</button>
            <button class="learn-chip${(appState.skills || []).filter(s => s.flagged).length === 0 ? ' disabled' : ''}" data-filter="infocus" onclick="filterLearnScreen('infocus', this)">In Focus</button>
        </div>
        <div id="learn-sections-list" style="padding: 0 var(--sp-lg); margin-bottom: 120px;">
            ${renderLearnSectionCards()}
        </div>
    `;
    showScreen('learn-screen');
}

function renderLearnSectionCards() {
    return DATA.learnSections.map(section => {
        let action;
        if (section.id === 'skills') action = 'showLearnSkillLibrary()';
        else if (section.id === 'pointers') action = "showLearnSection('pointers')";
        else action = `showLearnSection('${section.id}')`;
        const count = section.id === 'skills' ? DATA.skills.length + ' skills'
                    : section.id === 'pointers' ? section.items.length + ' pointers'
                    : section.items.length + ' entries';
        return `
        <div class="skill-category-card" style="margin-bottom: var(--sp-sm);" onclick="${action}">
            <div class="skill-category-icon">${ICONS.get(section.icon, 24)}</div>
            <div class="skill-category-info">
                <div class="skill-category-name-row">
                    <span class="skill-category-name">${section.name}</span>
                    ${count ? `<span class="skill-category-count-inline">${count}</span>` : ''}
                </div>
                <div class="skill-category-desc">${section.desc}</div>
            </div>
        </div>`;
    }).join('');
}

function renderPointerCards() {
    const section = DATA.learnSections.find(s => s.id === 'pointers');
    if (!section) return '';
    return section.items.map((p, i) => `
        <div class="skill-category-card" style="margin-bottom: var(--sp-sm);" onclick="showPointerDetail(${i})">
            <div class="skill-category-icon">${ICONS.get('learn-pointers', 24)}</div>
            <div class="skill-category-info">
                <div class="pointer-eyebrow">pointer</div>
                <div class="skill-category-name">${p.name}</div>
                <div style="font-size: var(--fs-small); color: var(--ink-3); margin-top: 2px; line-height: 1.4;">${p.question}</div>
            </div>
        </div>`).join('');
}

function filterLearnScreen(filter, btn) {
    const chipsRow = document.getElementById('learn-filter-chips');
    const list = document.getElementById('learn-sections-list');
    if (!list || !chipsRow) return;

    const chip = btn || chipsRow.querySelector(`[data-filter="${filter}"]`);

    if (filter === 'all') {
        chipsRow.querySelectorAll('.learn-chip').forEach(b => b.classList.remove('active'));
        chipsRow.querySelector('[data-filter="all"]')?.classList.add('active');
        // innerHTML is constructed from trusted DATA + user strings escaped via renderLearnSectionCards
        list.innerHTML = '<p class="learn-helper-text">Search across all sections, or tap a card to explore.</p>' + renderLearnSectionCards(); // nosec
        return;
    }

    // Disabled pills do nothing
    if (!chip || chip.classList.contains('disabled')) return;

    // Toggle this filter
    chip.classList.toggle('active');

    const activeFilters = [...chipsRow.querySelectorAll('.learn-chip.active:not([data-filter="all"])')].map(b => b.dataset.filter);

    if (activeFilters.length === 0) {
        // Nothing active — revert to All
        chipsRow.querySelector('[data-filter="all"]')?.classList.add('active');
        list.innerHTML = '<p class="learn-helper-text">Search across all sections, or tap a card to explore.</p>' + renderLearnSectionCards(); // nosec
        return;
    }

    // Deactivate All when any specific filter is active
    chipsRow.querySelector('[data-filter="all"]')?.classList.remove('active');

    let html = '';
    if (activeFilters.includes('bookmarked')) html += renderBookmarkedLearnItems();
    if (activeFilters.includes('infocus'))    html += renderInFocusLearnItems();
    list.innerHTML = html || '<p class="learn-helper-text">Nothing to show.</p>'; // nosec
}

function showPointerDetail(index) {
    const section = DATA.learnSections.find(s => s.id === 'pointers');
    if (!section) return;
    const pointer = section.items[index];
    if (!pointer) return;

    const screenId = `pointer-detail-${index}`;

    if (appState.currentScreen !== screenId) pushNavHistory();

    let screen = document.getElementById(screenId);
    if (!screen) {
        screen = document.createElement('div');
        screen.id = screenId;
        screen.className = 'screen';
        document.querySelector('.app-container').appendChild(screen);
    }

    const pointerName = pointer.name;

    const insightSave = getLearnLineSave(pointer.insight, 'goal');
    const insightItem = `
        <div class="learn-line-tappable${insightSave ? ' save-open' : ''}"
             data-line-text="${escapeHtml(pointer.insight)}"
             data-save-type="goal"
             data-page-type="pointer"
             data-item-id="${escapeHtml(pointerName)}"
             onclick="openLearnLineSave(this)">
            <p class="skill-know-description" style="margin:0;">${pointer.insight}</p>
            <div class="learn-line-save-expand${insightSave ? ' open' : ''}">
                ${_renderLineSavePrompt(pointer.insight, 'goal', 'pointer', pointerName)}
            </div>
        </div>`;

    const whatToTryItems = pointer.whatToTry.map(t => {
        const save = getLearnLineSave(t, 'goal');
        return `<li class="skill-know-list-item learn-line-tappable${save ? ' save-open' : ''}"
                    data-line-text="${escapeHtml(t)}"
                    data-save-type="goal"
                    data-page-type="pointer"
                    data-item-id="${escapeHtml(pointerName)}"
                    onclick="openLearnLineSave(this)">
                    ${t}
                    <div class="learn-line-save-expand${save ? ' open' : ''}">
                        ${_renderLineSavePrompt(t, 'goal', 'pointer', pointerName)}
                    </div>
                </li>`;
    }).join('');

    const inspirationHtml = pointer.inspiration ? (() => {
        const save = getLearnLineSave(pointer.inspiration, 'goal');
        return `
        <div class="skill-know-section">
            <div class="skill-know-section-label" style="color: var(--ink-5);">the inspiration</div>
            <div class="learn-line-tappable${save ? ' save-open' : ''}"
                 data-line-text="${escapeHtml(pointer.inspiration)}"
                 data-save-type="goal"
                 data-page-type="pointer"
                 data-item-id="${escapeHtml(pointerName)}"
                 onclick="openLearnLineSave(this)">
                <p class="skill-know-description" style="margin:0;">${pointer.inspiration}</p>
                <div class="learn-line-save-expand${save ? ' open' : ''}">
                    ${_renderLineSavePrompt(pointer.inspiration, 'goal', 'pointer', pointerName)}
                </div>
            </div>
        </div>`;
    })() : '';

    screen.innerHTML = `
        <div class="skill-detail-header">
            <button class="session-detail-back" onclick="goBack()">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="13 4 7 10 13 16"/>
                </svg>
                learn
            </button>
            ${renderBookmarkBtn('pointer', pointerName)}
        </div>
        <div class="skill-detail-hero">
            <div class="pointer-eyebrow" style="font-size: var(--fs-small);">pointer</div>
            <h1 class="skill-detail-title" style="font-size: var(--fs-display);">${pointer.name}</h1>
            <p style="font-size: var(--fs-body); color: var(--ink-3); margin-top: var(--sp-sm); line-height: 1.5;">${pointer.question}</p>
        </div>
        <div class="skill-know-section">
            <div class="skill-know-section-label" style="color: var(--ink-5);">the insight</div>
            ${insightItem}
        </div>
        <div class="skill-know-section">
            <div class="skill-know-section-label" style="color: var(--ink-5);">what to try</div>
            <ul class="skill-know-list">${whatToTryItems}</ul>
        </div>
        ${inspirationHtml}
        <div class="skill-know-section skill-detail-section" id="learn-notes-section-pointer-${index}"></div>
        <div style="height: 120px;"></div>
    `;
    const notesSectionEl = screen.querySelector(`#learn-notes-section-pointer-${index}`);
    if (notesSectionEl) renderLearnNotesSectionInPlace('pointer', pointerName, notesSectionEl);
    showScreen(screenId);
}

function showLearnSection(sectionId) {
    const section = DATA.learnSections.find(s => s.id === sectionId);
    if (!section) return;

    const screenId = `learn-section-${sectionId}`;
    if (appState.currentScreen !== screenId) pushNavHistory();
    let screen = document.getElementById(screenId);
    if (!screen) {
        screen = document.createElement('div');
        screen.id = screenId;
        screen.className = 'screen';
        document.querySelector('.app-container').appendChild(screen);
    }

    // Pointers have their own card layout — render and return early
    if (sectionId === 'pointers') {
        screen.innerHTML = `
            <div class="skill-detail-header">
                <button class="session-detail-back" onclick="goBack()">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="13 4 7 10 13 16"/>
                    </svg>
                    learn
                </button>
                <span class="skill-lib-count">${section.items.length} pointers</span>
            </div>
            <div style="padding: 0 var(--sp-lg); margin-bottom: 120px;">
                ${renderPointerCards()}
            </div>
        `;
        showScreen(screenId);
        return;
    }

    const items = section.items || [];
    const showScrubber = items.length >= 20;

    const groups = {};
    items.forEach(item => {
        const letter = item.name[0]?.toUpperCase() || '#';
        if (!groups[letter]) groups[letter] = [];
        groups[letter].push(item);
    });

    const notedItems = new Set(
        (appState.learnNotes || [])
            .filter(n => n.sectionId === sectionId)
            .map(n => n.itemName)
    );
    const noteIndicator = ICONS.get('fab-note', 16);

    const lettersHtml = Object.keys(groups).sort().map(letter => `
        <div class="glossary-group" id="ls-${sectionId}-${letter}">
            <div class="glossary-group-label">${letter}</div>
            ${groups[letter].map(item => `
                <div class="glossary-term-row glossary-term-skill" onclick="showLearnDetail('${sectionId}', '${item.name.replace(/'/g, "\\'")}')">
                    <div class="glossary-term-main">
                        <span class="glossary-term-name">${item.name}</span>
                        ${notedItems.has(item.name) ? `<span class="learn-note-indicator">${noteIndicator}</span>` : ''}
                    </div>
                    <div class="glossary-term-meta">
                        <span class="glossary-term-category">${item.chip || ''}</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><polyline points="4 2 8 6 4 10"/></svg>
                    </div>
                </div>
            `).join('')}
        </div>
    `).join('');

    const scrubberHtml = showScrubber ? `
        <div class="glossary-index">
            ${Object.keys(groups).sort().map(l =>
                `<button class="glossary-index-btn" onclick="document.getElementById('ls-${sectionId}-${l}')?.scrollIntoView({behavior:'smooth',block:'start'})">${l}</button>`
            ).join('')}
        </div>
    ` : '';

    screen.innerHTML = `
        <div class="skill-detail-header">
            <button class="session-detail-back" onclick="goBack()">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="13 4 7 10 13 16"/>
                </svg>
                learn
            </button>
            ${items.length > 0 ? `<span class="skill-lib-count">${items.length} entries</span>` : ''}
        </div>
        <div class="skill-lib-sticky">
            <div class="skill-lib-search-wrapper">
                <svg class="skill-lib-search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                    <circle cx="7" cy="7" r="5"/><line x1="11" y1="11" x2="14" y2="14"/>
                </svg>
                <input type="text"
                       class="skill-lib-search"
                       id="learn-section-search-${sectionId}"
                       placeholder="Search ${section.name.toLowerCase()}…"
                       autocomplete="off"
                       oninput="filterLearnSectionSearch('${sectionId}', this.value)" />
            </div>
            <div class="learn-chips-row" id="learn-chips-${sectionId}" style="padding: var(--sp-sm) var(--sp-lg) 0;">
                ${section.chips.map((chip, i) => `
                    <button
                        class="learn-chip ${i === 0 ? 'active' : ''}"
                        data-chip="${chip}"
                        onclick="filterLearnSection('${sectionId}', '${chip}', this)"
                    >${chip}</button>
                `).join('')}
            </div>
        </div>
        <div class="skill-lib-body" id="learn-items-${sectionId}">
            ${lettersHtml || `<p style="padding: var(--sp-xl) var(--sp-lg); text-align:center; color:var(--ink-5); font-size:var(--fs-small);">Coming soon</p>`}
        </div>
        ${scrubberHtml}
        <div style="height: 120px;"></div>
    `;
    showScreen(screenId);
}

function filterLearnSection(sectionId, chip, btn) {
    const row = document.getElementById(`learn-chips-${sectionId}`);
    row.querySelectorAll('.learn-chip').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const section = DATA.learnSections.find(s => s.id === sectionId);
    const items = chip === 'All' ? section.items : section.items.filter(i => i.chip === chip);
    const showScrubber = items.length >= 20;

    const groups = {};
    items.forEach(item => {
        const letter = item.name[0]?.toUpperCase() || '#';
        if (!groups[letter]) groups[letter] = [];
        groups[letter].push(item);
    });

    const lettersHtml = Object.keys(groups).sort().map(letter => `
        <div class="glossary-group" id="ls-${sectionId}-${letter}">
            <div class="glossary-group-label">${letter}</div>
            ${groups[letter].map(item => `
                <div class="glossary-term-row glossary-term-skill" onclick="showLearnDetail('${sectionId}', '${item.name.replace(/'/g, "\\'")}')">
                    <div class="glossary-term-main">
                        <span class="glossary-term-name">${item.name}</span>
                    </div>
                    <div class="glossary-term-meta">
                        <span class="glossary-term-category">${item.chip || ''}</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><polyline points="4 2 8 6 4 10"/></svg>
                    </div>
                </div>
            `).join('')}
        </div>
    `).join('') || `<p class="learn-empty" style="padding: var(--sp-md) var(--sp-lg);">No entries in this category.</p>`;

    document.getElementById(`learn-items-${sectionId}`).innerHTML = lettersHtml;
}

function filterLearnSectionSearch(sectionId, query) {
    const section = DATA.learnSections.find(s => s.id === sectionId);
    const q = query.trim().toLowerCase();
    const items = q
        ? section.items.filter(i => i.name.toLowerCase().includes(q) || (i.description && i.description.toLowerCase().includes(q)))
        : section.items;

    const row = document.getElementById(`learn-chips-${sectionId}`);
    if (row) row.querySelectorAll('.learn-chip').forEach((b, i) => b.classList.toggle('active', i === 0));

    const groups = {};
    items.forEach(item => {
        const letter = item.name[0]?.toUpperCase() || '#';
        if (!groups[letter]) groups[letter] = [];
        groups[letter].push(item);
    });

    const lettersHtml = Object.keys(groups).sort().map(letter => `
        <div class="glossary-group" id="ls-${sectionId}-${letter}">
            <div class="glossary-group-label">${letter}</div>
            ${groups[letter].map(item => `
                <div class="glossary-term-row glossary-term-skill" onclick="showLearnDetail('${sectionId}', '${item.name.replace(/'/g, "\\'")}')">
                    <div class="glossary-term-main">
                        <span class="glossary-term-name">${item.name}</span>
                    </div>
                    <div class="glossary-term-meta">
                        <span class="glossary-term-category">${item.chip || ''}</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><polyline points="4 2 8 6 4 10"/></svg>
                    </div>
                </div>
            `).join('')}
        </div>
    `).join('') || `<p class="learn-empty" style="padding: var(--sp-md) var(--sp-lg);">No results for "${query}".</p>`;

    document.getElementById(`learn-items-${sectionId}`).innerHTML = lettersHtml;
}

function showLearnDetail(sectionId, itemName) {
    const section = DATA.learnSections.find(s => s.id === sectionId);
    if (!section) return;
    const item = section.items.find(i => i.name === itemName);
    if (!item) return;

    const screenId = `learn-detail-${sectionId}-${itemName.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`;
    if (appState.currentScreen !== screenId) pushNavHistory();
    let screen = document.getElementById(screenId);
    if (!screen) {
        screen = document.createElement('div');
        screen.id = screenId;
        screen.className = 'screen';
        document.querySelector('.app-container').appendChild(screen);
    }

    screen.innerHTML = `
        <div class="skill-detail-header">
            <button class="session-detail-back" onclick="goBack()">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="13 4 7 10 13 16"/>
                </svg>
                back
            </button>
            ${renderBookmarkBtn(sectionId, itemName)}
        </div>
        <div class="skill-detail-hero">
            <div class="skill-detail-category">${item.chip ? item.chip.toUpperCase() : ''}</div>
            <h1 class="skill-detail-title">${item.name}</h1>
        </div>
        ${item.description ? `
        <div class="skill-know-section">
            <p class="skill-know-description">${item.description}</p>
        </div>` : ''}
        ${item.keyPoints && item.keyPoints.length ? `
        <div class="skill-know-section">
            <div class="skill-know-section-label">Key points</div>
            <ul class="skill-know-list">
                ${item.keyPoints.map(p => {
                    const saveType = sectionId === 'conditioning' ? 'correction' : 'goal';
                    const escaped = escapeHtml(p);
                    return `<li class="skill-know-list-item learn-line-tappable"
                        data-line-text="${escaped}"
                        data-save-type="${saveType}"
                        data-page-type="${sectionId}"
                        data-item-id="${itemName}"
                        onclick="openLearnLineSave(this)">
                        ${p}
                        <div class="learn-line-save-expand">${_renderLineSavePrompt(p, saveType, sectionId, itemName)}</div>
                    </li>`;
                }).join('')}
            </ul>
        </div>` : ''}
        ${['musicality', 'conditioning', 'repertoire'].includes(sectionId) ? `
        <div class="skill-know-section skill-detail-section" id="learn-notes-section-${sectionId}-${itemName.replace(/[^a-z0-9]/gi, '-').toLowerCase()}">
        </div>` : ''}
        <div style="height: 120px;"></div>
    `;
    if (['musicality', 'conditioning', 'repertoire'].includes(sectionId)) {
        const notesSectionEl = screen.querySelector(`#learn-notes-section-${sectionId}-${itemName.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`);
        if (notesSectionEl) renderLearnNotesSectionInPlace(sectionId, itemName, notesSectionEl);
    }
    showScreen(screenId);
}

/* ── Learn line tap-to-save ────────────────────────────────────
   Tappable list items on knowledge pages. Tapping expands an
   inline save prompt; a second tap collapses it.
   ─────────────────────────────────────────────────────────── */

function _renderLineSavePrompt(text, saveType, pageType, itemId) {
    const label = saveType === 'goal' ? 'save as goal' : 'save as correction';
    return `<button class="learn-line-save-btn" onclick="saveLearnLine(this)">${label}</button>`;
}

function saveLearnLine(btn) {
    const li = btn.closest('.learn-line-tappable');
    if (!li) return;
    const text    = li.dataset.lineText;
    const saveType = li.dataset.saveType;
    const pageType = li.dataset.pageType;
    const itemId  = li.dataset.itemId;
    const skillId = pageType === 'skill' ? itemId : null;

    if (saveType === 'goal') {
        li.classList.remove('open');
        openGoalCreatorWithSuggestion(text, null, skillId, '');
    } else {
        // save as correction
        const correction = {
            id:                      generateId(),
            userId:                  null,
            skillId:                 skillId || null,
            text:                    text,
            createdAt:               Date.now(),
            sessionId:               null,
            source:                  null,
            type:                    null,
            isRecurring:             false,
            isPinned:                false,
            isResolved:              false,
            derivedFromCorrectionId: null,
            isHighlight:             false,
            previousBlockType:       null,
        };
        appState.corrections.push(correction);
        storage.save('corrections', appState.corrections);
        li.classList.remove('open');
        li.classList.add('learn-line-saved');
        const expand = li.querySelector('.learn-line-save-expand');
        if (expand) expand.innerHTML = '<span class="learn-line-saved-msg">saved</span>';
        setTimeout(() => li.classList.remove('learn-line-saved'), 1500);
    }
}

function handleLearnSearch(query) {
    const resultsEl = document.getElementById('learn-search-results');
    const sectionsEl = document.getElementById('learn-sections-list');
    const q = query.trim().toLowerCase();

    if (!q) {
        resultsEl.style.display = 'none';
        sectionsEl.style.display = '';
        return;
    }

    sectionsEl.style.display = 'none';
    resultsEl.style.display = '';

    const results = [];
    DATA.learnSections.forEach(section => {
        const items = section.id === 'skills'
            ? DATA.skills.map(s => ({ name: s.french || s.name, chip: s.category || '', description: s.description || '', skillId: s.id }))
            : section.items || [];
        items.forEach(item => {
            if (
                item.name.toLowerCase().includes(q) ||
                (item.description && item.description.toLowerCase().includes(q))
            ) {
                results.push({ section, item });
            }
        });
    });

    if (!results.length) {
        resultsEl.innerHTML = `<p class="learn-empty" style="padding: 0 var(--sp-lg);">No results for "${query}".</p>`;
        return;
    }

    const grouped = {};
    results.forEach(r => {
        if (!grouped[r.section.name]) grouped[r.section.name] = { section: r.section, items: [] };
        grouped[r.section.name].items.push(r.item);
    });

    resultsEl.innerHTML = `<div style="padding: 0 var(--sp-lg); margin-bottom: 120px;">` +
        Object.values(grouped).map(({ section, items }) => `
            <div class="learn-search-group">
                <div class="learn-search-group-label">${section.name}</div>
                ${items.map(item => `
                    <div class="glossary-term-row glossary-term-skill" onclick="${
                        section.id === 'skills' ? `showSkillKnowledgePage('${item.skillId || ''}', 'learn-screen')` :
                        section.id === 'glossary' ? `showGlossary()` :
                        section.id === 'pointers' ? `showPointerDetail(${section.items.indexOf(item)})` :
                        `showLearnDetail('${section.id}', '${item.name.replace(/'/g, "\\'")}')`
                    }">
                        <div class="glossary-term-main">
                            <span class="glossary-term-name">${item.name}</span>
                        </div>
                        <div class="glossary-term-meta">
                            <span class="glossary-term-category">${item.chip || ''}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `).join('') +
    `</div>`;
}

// ── Folder Detail Views ──
function openFolder(folderId, returnTo) {
    const folder = DATA.folders[folderId];
    if (!folder) { console.log('Folder not yet implemented:', folderId); return; }
    const context = returnTo || appState.currentNav || 'barre';

    let detailScreen = document.getElementById('detail-' + folderId);
    if (!detailScreen) {
        detailScreen = document.createElement('div');
        detailScreen.className = 'screen';
        detailScreen.id = 'detail-' + folderId;

        detailScreen.innerHTML = `
            <div class="detail-view">
                <div class="detail-header">
                    <button class="detail-back-btn" onclick="navigateTo('${context}')">←</button>
                    <div class="detail-title-section">
                        <div class="detail-icon">${ICONS.get(folder.icon, 28)}</div>
                        <div class="detail-title">${folder.title}</div>
                        <div class="detail-subtitle">${folder.subtitle}</div>
                    </div>
                </div>
                <div class="item-list">
                    ${folder.items.map((item, idx) => `
                        <div class="item-card">
                            <div class="item-number">${String(idx + 1).padStart(2, '0')}</div>
                            <div class="item-content">
                                <div class="item-category">${item.category}</div>
                                <div class="item-title">${item.title}</div>
                                <div class="item-description">${item.description}</div>
                            </div>
                            <div class="item-status ${item.completed ? 'completed' : 'incomplete'}">
                                ${item.completed ? '✓' : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        document.querySelector('.app-container').appendChild(detailScreen);
    }
    showScreen('detail-' + folderId);
}

// ── Profile ──
function initProfile() {
    const dims = appState.dimensions;
    const level = appState.level || 'not-assessed';

    // Level badge (kept for legacy compat — hidden in new UI)
    document.getElementById('levelBadge').textContent = DATA.levelLabels[level] || 'NOT YET ASSESSED';

    // New profile: status card + focus area stack
    renderProfileStatus();
    renderFocusCardStack();
    renderProfileMySkills();

    // Dimension chart slot — hidden in new UI, kept for compat
    const dimEl = document.getElementById('profileDimensions');
    if (dimEl) dimEl.innerHTML = ''; // safe — always empty string

}

function renderProfileMySkills() {
    const el = document.getElementById('profile-my-skills');
    if (!el) return;

    // Collect skills that have at least one correction or skillNote
    const corrSkillIds = new Set((appState.corrections || []).map(c => c.skillId).filter(Boolean));
    const noteSkillIds = new Set((appState.skillNotes  || []).map(n => n.skillId).filter(Boolean));
    const activeIds = new Set([...corrSkillIds, ...noteSkillIds]);

    if (activeIds.size === 0) { el.innerHTML = ''; return; }

    // Determine last-noted date per skill (excludes choreography blocks)
    // Determine last-noted date per skill (excludes choreography blocks)
    function lastNoted(skillId) {
        const nonChoreSSs = (appState.sessionSkills || [])
            .filter(ss => ss.skillId === skillId
                       && ss.blockType !== 'choreography'
                       && ss.source    !== 'choreography');
        const sessIds = new Set(
            nonChoreSSs.map(ss => ss.sessionId).filter(Boolean)
        );
        (appState.corrections || [])
            .filter(cc => cc.skillId === skillId && cc.sessionId)
            .forEach(cc => sessIds.add(cc.sessionId));
        const sessDates = (appState.sessions || [])
            .filter(s => sessIds.has(s.id))
            .map(s => s.date);
        const noteDates = (appState.skillNotes || [])
            .filter(n => n.skillId === skillId && n.date)
            .map(n => n.date);
        const all = [...sessDates, ...noteDates].filter(Boolean).sort().reverse();
        return all[0] || null;
    }

    const skills = [...activeIds]
        .map(id => ({ ref: DATA.skills.find(s => s.id === id), lastDate: lastNoted(id) }))
        .filter(s => s.ref)
        .sort((a, b) => (b.lastDate || '').localeCompare(a.lastDate || ''));

    const itemsHtml = skills.map(({ ref, lastDate }) => {
        const cat = DATA.categoryNames[ref.categoryId] || '';
        const dateLabel = lastDate ? formatTimelineDate(lastDate) : '';
        return `
        <div class="profile-skill-item" onclick="showSkillDetail('${escapeHtml(ref.id)}', 'profile')">
            <div class="profile-skill-main">
                <span class="profile-skill-name">${escapeHtml(ref.french)}</span>
                ${cat ? `<span class="profile-skill-cat">${escapeHtml(cat)}</span>` : ''}
            </div>
            ${dateLabel ? `<span class="profile-skill-date">${escapeHtml(dateLabel)}</span>` : ''}
        </div>`;
    }).join('');

    el.innerHTML = `
        <div class="barre-section-header">
            <span class="barre-section-label">my skills</span>
            <span class="barre-section-label">${skills.length}</span>
        </div>
        <div style="padding: 0 var(--sp-lg);">
            <div class="profile-skills-list">${itemsHtml}</div>
        </div>`;
}

function formatTimelineDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const threeMonthsAgo = new Date(today);
    threeMonthsAgo.setMonth(today.getMonth() - 3);

    if (d.toDateString() === today.toDateString()) return 'Today';
    if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
    if (d < threeMonthsAgo || d.getFullYear() !== today.getFullYear()) {
        return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    }
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

// ── Shared timeline helpers ──

function buildTimelineEntries() {
    const noteEntries = (appState.skillNotes || [])
        .filter(n => n.isReflection || n.isPraise)
        .map(n => ({
            _noteEntry: true,
            _type:      n.isPraise ? 'praise' : 'reflection',
            id:         n.id,
            date:       n.date,
            createdAt:  n.createdAt,
            text:       n.text,
            skillId:    n.skillId,
        }));
    return [
        ...(appState.timeline || []).filter(e => e.type !== 'manual').map(e => ({ ...e, _noteEntry: false })),
        ...noteEntries,
    ].sort((a, b) => {
        const dateA = a.date || new Date(a.createdAt || 0).toISOString().split('T')[0];
        const dateB = b.date || new Date(b.createdAt || 0).toISOString().split('T')[0];
        if (dateB !== dateA) return dateB.localeCompare(dateA);
        return (b.createdAt || 0) - (a.createdAt || 0);
    });
}

function renderTimelineEntry(entry) {
    const entryDate = entry.date || (entry.createdAt ? new Date(entry.createdAt).toISOString().split('T')[0] : '');
    const dateHtml  = entryDate ? `<span class="timeline-entry-date">${formatTimelineDate(entryDate)}</span>` : '';

    if (entry._noteEntry) {
        const skillRef = entry.skillId ? DATA.skills.find(s => s.id === entry.skillId) : null;
        const isReflection = entry._type === 'reflection';
        const typeLabel = isReflection ? 'Reflection' : 'Praise \u2605';
        return `
        <div class="timeline-item timeline-item-${entry._type}">
            <div class="timeline-content">
                <span class="timeline-type-label">${typeLabel}</span>
                <div class="timeline-title ${isReflection ? 'timeline-reflection-text' : 'timeline-praise-text'}">${isReflection ? `"${entry.text}"` : entry.text}</div>
                ${skillRef ? `<div class="timeline-subtitle">${skillRef.french}</div>` : ''}
                <div class="timeline-note-actions">
                    <button class="timeline-note-btn" onmousedown="editTimelineNote('${entry.id}')">edit</button>
                    <button class="timeline-note-btn timeline-note-btn-delete" onmousedown="deleteTimelineNote('${entry.id}')">delete</button>
                </div>
            </div>
            ${dateHtml}
        </div>`;
    }
    // Special rendering for goal completion milestones
    if (entry.type === 'milestone' && entry.objectId) {
        const goal = (appState.goals || []).find(g => g.id === entry.objectId);
        if (goal) {
            const hasReflection = !!goal.reflection;
            const reflectionHtml = hasReflection
                ? `<div class="timeline-milestone-reflection">${escapeHtml(goal.reflection)}</div>`
                : '';
            const cardTapFn = hasReflection
                ? `showGoalReflectionDetail('${goal.id}')`
                : `openGoalReflectionSheet('${goal.id}')`;
            const editFn = `openGoalReflectionSheet('${goal.id}')`;
            const actionLabel = hasReflection ? 'edit' : 'add note';
            const tapHint = hasReflection
                ? `<div class="timeline-tap-hint">tap to review \u2192</div>`
                : '';
            return `
            <div class="timeline-item timeline-item-milestone timeline-item-tappable" onclick="${cardTapFn}">
                <div class="timeline-content">
                    <div class="timeline-milestone-header">
                        <span class="timeline-type-label">Goal completed</span>
                        <span class="timeline-milestone-edit" onclick="event.stopPropagation(); ${editFn}">${actionLabel}</span>
                    </div>
                    <div class="timeline-title">${escapeHtml(goal.title)}</div>
                    ${reflectionHtml}
                    ${tapHint}
                </div>
                ${dateHtml}
            </div>`;
        }
    }

    const isPraise   = entry.isPraise;
    const isNote     = entry.type === 'note';
    const isTappable = (entry.type === 'session' || isNote) && entry.objectId;
    const typeKey    = isPraise ? 'praise' : (entry.type || 'manual');
    const typeLabels = { session: 'Session', note: 'Note', milestone: 'Milestone', assessment: 'Assessment', praise: 'Praise \u2605', manual: '' };
    const typeLabel  = typeLabels[typeKey] || '';
    // PLI-016 \u2014 timeline card highlight indicator: distinct visual on cards with \u22651 highlight block.
    // TODO: design pass to confirm final form (icon, placement, colour). Stub renders a highlighter icon inline.
    const hasHighlight = entry.type === 'session' && entry.objectId &&
        appState.sessionSkills.some(ss => ss.sessionId === entry.objectId && ss.isHighlight);
    const highlightIndicatorHtml = hasHighlight
        ? ` <span class="timeline-highlight-indicator" title="Contains highlights">${ICONS.get('highlighter', 11)}</span>`
        : '';
    // PLI-016 \u2014 Highlights filter chip on timeline: filter to sessions with \u22651 highlight block.
    // TODO: add chip to timeline filter bar when filter UI is built. No implementation yet.
    const tapAction  = isNote ? `showNoteDetail('${entry.objectId}')` : `showSessionDetail('${entry.objectId}')`;
    return `
    <div class="timeline-item timeline-item-${typeKey} ${isTappable ? 'timeline-item-tappable' : ''}"
         ${isTappable ? `onclick="${tapAction}"` : ''}>
        <div class="timeline-content">
            ${typeLabel ? `<span class="timeline-type-label">${typeLabel}</span>` : ''}
            <div class="timeline-title ${isPraise ? 'timeline-praise-text' : ''}">${entry.title}</div>
            ${entry.body ? `<div class="timeline-subtitle">${entry.body}${highlightIndicatorHtml}</div>` : ''}
            ${isTappable ? `<div class="timeline-tap-hint">tap to review \u2192</div>` : ''}
        </div>
        ${dateHtml}
    </div>`;
}

function renderGroupedTimelineHtml(entries, firstEntryText) {
    const now = new Date();
    const startOfToday     = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek      = new Date(startOfToday); startOfWeek.setDate(startOfToday.getDate() - startOfToday.getDay());
    const startOfMonth     = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    function getGroup(dateStr) {
        const d = new Date(dateStr);
        if (d >= startOfToday)     return 'Today';
        if (d >= startOfWeek)      return 'This week';
        if (d >= startOfMonth)     return 'This month';
        if (d >= startOfLastMonth) return 'Last month';
        return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
    }

    const groups = [];
    let currentGroup = null;
    entries.forEach(entry => {
        const g = getGroup(entry.date || new Date(entry.createdAt || 0).toISOString().split('T')[0]);
        if (g !== currentGroup) { currentGroup = g; groups.push({ label: g, entries: [] }); }
        groups[groups.length - 1].entries.push(entry);
    });

    const groupsHtml = groups.map(g => `
        <div class="timeline-group">
            <div class="timeline-group-label">${g.label}</div>
            ${g.entries.map(renderTimelineEntry).join('')}
        </div>
    `).join('');

    return groupsHtml + `
        <div class="timeline-group">
            <div class="timeline-item">
                <div class="timeline-content">
                    <div class="timeline-title">${firstEntryText}</div>
                </div>
            </div>
        </div>`;
}

function showBarreTimelineSheet() {
    const existing = document.getElementById('barre-timeline-sheet');
    if (existing) existing.remove();

    const entries = buildTimelineEntries();
    // Assessment entries sort into entries[] by date; only 'manual' (Joined plié) stays as the fixed bottom anchor
    const firstEntryText = 'Joined pli\u00e9';

    const sheet = document.createElement('div');
    sheet.id = 'barre-timeline-sheet';
    sheet.className = 'session-overlay';
    sheet.innerHTML = `
        <div class="session-logger-sheet" style="max-height: 85vh; display: flex; flex-direction: column;">
            <div class="session-sheet-handle"></div>
            <div class="session-logger-header" style="flex-shrink: 0;">
                <div>
                    <div class="session-logger-eyebrow">The Barre</div>
                    <h2 class="session-logger-title">Timeline</h2>
                </div>
                <button class="session-close-btn" onclick="document.getElementById('barre-timeline-sheet').remove()">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                        <line x1="4" y1="4" x2="14" y2="14"/><line x1="14" y1="4" x2="4" y2="14"/>
                    </svg>
                </button>
            </div>
            <div style="padding: 0 var(--sp-lg); overflow-y: auto; flex: 1;">
                ${renderGroupedTimelineHtml(entries, firstEntryText)}
                <div style="height: 40px;"></div>
            </div>
        </div>
    `;
    document.body.appendChild(sheet);
    requestAnimationFrame(() => sheet.classList.add('open'));
    sheet.addEventListener('click', e => { if (e.target === sheet) sheet.remove(); });
}


/* ═══════════════════════════════════════════════════════════════
   SESSION DETAIL VIEW
   Full-screen slide-in from right. Read-only review of a saved session.
   ═══════════════════════════════════════════════════════════════ */

function showSessionDetail(sessionId) {
    document.getElementById('barre-timeline-sheet')?.remove();
    const session = appState.sessions.find(s => s.id === sessionId);
    if (!session) return;

    pushNavHistory();

    let screen = document.getElementById(`session-detail-${sessionId}`);
    if (!screen) {
        screen = document.createElement('div');
        screen.className = 'screen session-detail-screen';
        screen.id = `session-detail-${sessionId}`;
        document.querySelector('.app-container').appendChild(screen);
    }

    const isNote = !!session.isNote;

    const datePart = new Date(session.date).toLocaleDateString('en-GB', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });

    let bodyHtml;
    let heroHtml;
    let editAction;

    if (isNote) {
        const noteText = session.notes || '';
        const lines = noteText.split('\n');
        const titleLine = escapeHtml(lines[0] || '');
        const bodyLines = escapeHtml(lines.slice(1).join('\n'));
        const noteContentHtml = titleLine
            ? `<span class="note-detail-line-title">${titleLine}</span>${bodyLines ? `<span class="note-detail-line-body">${bodyLines}</span>` : ''}`
            : `<span class="note-detail-line-body" style="color:var(--ink-4);font-style:italic;">No content.</span>`;
        heroHtml = `
            <div class="session-detail-hero">
                <h1 class="session-detail-title">Note</h1>
                <div class="session-detail-meta">${datePart}</div>
            </div>`;
        bodyHtml = `<div class="note-detail-body">${noteContentHtml}</div>`;
        editAction = `openNoteEditor('${sessionId}')`;
    } else {
        const classTypeLabel = session.classType
            ? ALL_CLASS_TYPES.find(ct => ct.id === session.classType)?.label || session.classType
            : null;
        const template = appState.sessionTemplates.find(t => t.id === session.templateId);
        const sessionTitle = session.sessionName || template?.name || 'Session';
        const location = template?.location || session.sessionLocation || null;
        const metaParts = [datePart, classTypeLabel].filter(Boolean);

        const sessionSkillRecords = appState.sessionSkills.filter(ss => ss.sessionId === sessionId);
        const blocksHtml = sessionSkillRecords.length > 0
            ? sessionSkillRecords.map(ss => renderDetailBlockHtml(ss)).join('')
            : `<div class="session-detail-empty">No notes recorded for this session.</div>`;
        const sessionNotesHtml = session.notes ? `
            <div class="detail-block">
                <div class="detail-block-notes">${session.notes}</div>
            </div>
        ` : '';

        heroHtml = `
            <div class="session-detail-hero">
                <h1 class="session-detail-title">${sessionTitle}</h1>
                <div class="session-detail-meta">${metaParts.join(' · ')}</div>
                ${location ? `<div class="session-detail-location">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                        <circle cx="6" cy="5" r="2"/><path d="M6 1a4 4 0 0 1 4 4c0 3-4 7-4 7S2 8 2 5a4 4 0 0 1 4-4z"/>
                    </svg>
                    ${location}
                </div>` : ''}
            </div>`;
        bodyHtml = `
            <div class="session-detail-section">
                <div class="session-detail-blocks">
                    ${sessionNotesHtml}
                    ${blocksHtml}
                </div>
            </div>`;
        editAction = `openSessionEditor('${sessionId}')`;
    }

    screen.innerHTML = `
        <div class="session-detail-view">
            <div class="session-detail-header">
                <button class="session-detail-back" onclick="goBack()">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="13 4 7 10 13 16"/>
                    </svg>
                    back
                </button>
                <div style="display:flex;gap:var(--sp-sm);">
                    <button class="session-detail-edit" onclick="${editAction}">edit</button>
                    <button class="session-detail-edit" style="color:var(--error);border-color:var(--coral-soft);"
                            onclick="deleteSession(${sessionId})">delete</button>
                </div>
            </div>

            ${heroHtml}
            ${bodyHtml}

            <div style="height: 120px;"></div>
        </div>
    `;

    showScreen(`session-detail-${sessionId}`);
    if (!isNote) requestAnimationFrame(() => initDetailBlockSeeMore());
}


function closeSessionDetail(sessionId, returnTo) {
    goBack();
}

function showNoteDetail(sessionId) {
    showSessionDetail(sessionId);
}

function openNoteEditor(sessionId) {
    const session = appState.sessions.find(s => s.id === sessionId);
    if (!session) return;
    appState.currentSession = {
        id:                  session.id,
        date:                session.date,
        generalNotes:        session.notes || '',
        blocks:              [],
        _mode:               'note',
        _isEdit:             true,
        _reflectionGoalId:   session._goalId || null,
    };
    let overlay = document.getElementById('session-logger-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'session-logger-overlay';
        overlay.className = 'session-overlay';
        document.body.appendChild(overlay);
    }
    renderSessionLogger();
    document.querySelector('.fab')?.classList.remove('visible');
    document.querySelector('.bottom-nav')?.classList.remove('visible');
    requestAnimationFrame(() => overlay.classList.add('open'));
    attachSheetSwipe();
}

function renderDetailBlockHtml(sessionSkill) {
    const source = sessionSkill.blockType || sessionSkill.source || sessionSkill.mode || 'correction';

    // Goal blocks — dedicated renderer
    if (source === 'goal') {
        const goal = (appState.goals || []).find(g => g.id === sessionSkill.goalId);
        if (!goal) return '';
        return renderGoalDetailBlockHtml(goal, sessionSkill);
    }

    const skill = sessionSkill.skillId ? DATA.skills.find(s => s.id === sessionSkill.skillId) : null;
    const corrections = (sessionSkill.correctionIds || [])
        .map(id => appState.corrections.find(c => c.id === id))
        .filter(Boolean);
    const hasCorrections = corrections.length > 0;
    const isHighlight = !!(sessionSkill.isHighlight || corrections.some(c => c.isHighlight));

    if (!skill && !sessionSkill.notes && !hasCorrections) return '';

    // Block type label / eyebrow
    // When highlighted: CORRECTION · [icon] HIGHLIGHT (icon un-highlights on tap)
    // When not highlighted: just the type label; highlighter icon lives in the skill row
    const TYPE_DISPLAY = { correction: 'correction', note: 'note', intention: 'intention', highlight: 'highlight', choreography: 'choreography', goal: 'goal', observation: 'note' };
    const baseTypeLabel = TYPE_DISPLAY[sessionSkill.previousBlockType || source] || 'correction';
    const typeLabelHtml = isHighlight
        ? `<div class="detail-block-type-label detail-block-type-label--highlight">
               <span class="block-eyebrow-base">${baseTypeLabel}</span>
               <span class="block-eyebrow-sep">·</span>
               <button class="block-highlight-eyebrow-btn" onmousedown="toggleDetailBlockHighlight('${sessionSkill.id}')" ontouchend="event.preventDefault(); toggleDetailBlockHighlight('${sessionSkill.id}')" aria-label="Remove highlight">
                   ${ICONS.get('highlighter', 16)}
                   <span class="block-eyebrow-highlight-label">highlight</span>
               </button>
           </div>`
        : `<div class="detail-block-type-label">${TYPE_DISPLAY[source] || 'correction'}</div>`;

    // Left border: highlight overrides everything; otherwise by type
    const borderClass = isHighlight         ? 'note-block--highlight'
                      : source === 'note'     ? 'note-block--note'
                      : 'note-block--correction';

    // Divider between type label and skill row — only when skill is present
    const dividerHtml = skill ? `<div class="detail-block-divider"></div>` : '';

    // Skill row — when not highlighted, carry the highlighter icon as promote affordance
    const bodyTagHtml = sessionSkill.bodyTag ? `<span class="note-block-body-tag">Body</span>` : '';
    const highlightBtn = !isHighlight
        ? `<button class="note-block-star" onmousedown="toggleDetailBlockHighlight('${sessionSkill.id}')" ontouchend="event.preventDefault(); toggleDetailBlockHighlight('${sessionSkill.id}')" aria-label="Highlight">${ICONS.get('highlighter', 14)}</button>`
        : '';
    let skillRowHtml = '';
    if (skill) {
        skillRowHtml = `
            <div class="note-block-skill-row">
                <span class="note-block-skill-name">${skill.french}</span>
                <span class="note-block-skill-right">${bodyTagHtml}${highlightBtn}<button class="note-block-view-link" onclick="showSkillDetail('${skill.id}', appState.currentScreen)">view →</button></span>
            </div>`;
    } else {
        skillRowHtml = `
            <div class="note-block-highlight-row${isHighlight ? '' : ' note-block-highlight-row--inactive'}">
                ${sessionSkill.blockTitle ? `<span class="note-block-skill-name" style="font-style:normal;font-size:var(--fs-small);font-weight:600;font-family:'DM Sans',sans-serif;">${escapeHtml(sessionSkill.blockTitle)}</span>` : ''}
                ${bodyTagHtml}${highlightBtn}
            </div>`;
    }

    // Free text body (no truncation — always fully expanded per spec)
    const bodyHtml = sessionSkill.notes ? `
        <div class="note-block-body">
            <div class="note-block-body-text">${nl2br(sessionSkill.notes)}</div>
        </div>` : '';

    // Content lines — fully expanded, no truncation
    const bulletsHtml = hasCorrections ? `
        <div class="note-block-bullets">
            ${corrections.map(c => `
                <div class="note-block-bullet">
                    <span class="note-block-dash">—</span><span class="note-block-bullet-text">${c.text}</span>
                </div>`).join('')}
        </div>` : '';

    return `
        <div class="note-block ${borderClass}" id="note-block-${sessionSkill.id}">
            ${typeLabelHtml}
            ${dividerHtml}
            ${skillRowHtml}${bodyHtml}${bulletsHtml}
        </div>`;
}

function renderGoalDetailBlockHtml(goal, sessionSkill) {
    const isHighlight = !!sessionSkill.isHighlight;
    const borderClass = isHighlight ? 'note-block--highlight' : 'note-block--goal';
    const ssid = sessionSkill.id;

    const TYPE_LABELS = { skill: 'a skill', body: 'body', intention: 'a feeling', habit: 'a habit' };
    const goalTypeLabel = TYPE_LABELS[goal.goalType] || '';
    const linkedSkill = goal.skillId ? DATA.skills.find(s => s.id === goal.skillId) : null;
    const createdDate = goal.createdAt ? formatTimelineDate(new Date(goal.createdAt).toISOString().split('T')[0]) : '';

    const markersHtml = (goal.progressMarkers || []).length > 0 ? `
        <div class="goal-detail-markers">
            ${(goal.progressMarkers || []).map(m => `
                <div class="goal-detail-marker">
                    <span class="goal-detail-marker-check">${m.done ? ICONS.get('check', 12) : ''}</span>
                    <span class="goal-detail-marker-text">${escapeHtml(m.text)}</span>
                </div>`).join('')}
        </div>` : '';

    const hasExtra = goal.body || (goal.progressMarkers || []).length || goal.commitmentPeriod || linkedSkill || createdDate;

    const expandHtml = hasExtra ? `
        <div class="goal-detail-extra" id="gde-${ssid}" style="display:none;">
            ${goal.body ? `<div class="goal-detail-body">${escapeHtml(goal.body)}</div>` : ''}
            ${markersHtml}
            ${goal.commitmentPeriod ? `<div class="goal-detail-meta-line">${escapeHtml(goal.commitmentPeriod)}</div>` : ''}
            ${linkedSkill ? `<div class="goal-detail-meta-line">${escapeHtml(linkedSkill.french)}</div>` : ''}
            ${createdDate ? `<div class="goal-detail-meta-line goal-detail-meta-line--muted">${createdDate}</div>` : ''}
        </div>
        <button class="note-block-see-more" id="gdm-${ssid}" onclick="toggleGoalDetailExpand(${ssid})">show more</button>
        <button class="note-block-see-more" id="gdh-${ssid}" style="display:none;" onclick="toggleGoalDetailExpand(${ssid})">hide</button>
    ` : '';

    return `
        <div class="note-block ${borderClass}" id="note-block-${ssid}">
            <div class="detail-block-type-label">goal</div>
            <div class="detail-block-divider"></div>
            <div class="note-block-skill-row">
                <div class="detail-goal-title-col">
                    <span class="note-block-skill-name">${escapeHtml(goal.title)}</span>
                    ${goalTypeLabel ? `<span class="detail-goal-type-label">${goalTypeLabel}</span>` : ''}
                </div>
            </div>
            ${expandHtml}
        </div>`;
}

function toggleGoalDetailExpand(ssid) {
    const extra = document.getElementById(`gde-${ssid}`);
    const more  = document.getElementById(`gdm-${ssid}`);
    const hide  = document.getElementById(`gdh-${ssid}`);
    if (!extra) return;
    const expanded = extra.style.display !== 'none';
    extra.style.display = expanded ? 'none' : '';
    if (more) more.style.display = expanded ? '' : 'none';
    if (hide) hide.style.display = expanded ? 'none' : '';
}

function toggleDetailBlockHighlight(sessionSkillId) {
    const ss = appState.sessionSkills.find(s => s.id === sessionSkillId);
    if (!ss) return;
    const corrections = (ss.correctionIds || [])
        .map(id => appState.corrections.find(c => c.id === id))
        .filter(Boolean);
    const newState = !(ss.isHighlight || corrections.some(c => c.isHighlight));
    ss.isHighlight = newState;
    if (newState) {
        ss.previousBlockType = ss.blockType || 'correction';
        ss.blockType = 'highlight';
    } else {
        ss.blockType = ss.previousBlockType || 'correction';
        ss.previousBlockType = null;
    }
    corrections.forEach(c => { c.isHighlight = newState; });
    storage.save('sessionSkills', appState.sessionSkills);
    storage.save('corrections', appState.corrections);
    const blockEl = document.getElementById(`note-block-${sessionSkillId}`);
    if (blockEl) {
        const tmp = document.createElement('div');
        tmp.innerHTML = renderDetailBlockHtml(ss);
        const newBlock = tmp.firstElementChild;
        if (newBlock) {
            blockEl.replaceWith(newBlock);
            requestAnimationFrame(() => initDetailBlockSeeMore(sessionSkillId));
        }
    }
}

function expandBlockBody(sessionSkillId) {
    const textEl = document.getElementById(`nbt-${sessionSkillId}`);
    const moreBtn = document.getElementById(`nbm-${sessionSkillId}`);
    const hideBtn = document.getElementById(`nbh-${sessionSkillId}`);
    if (textEl) textEl.classList.add('expanded');
    if (moreBtn) moreBtn.style.display = 'none';
    if (hideBtn) hideBtn.style.display = '';
}

function collapseBlockBody(sessionSkillId) {
    const textEl = document.getElementById(`nbt-${sessionSkillId}`);
    const moreBtn = document.getElementById(`nbm-${sessionSkillId}`);
    const hideBtn = document.getElementById(`nbh-${sessionSkillId}`);
    if (textEl) textEl.classList.remove('expanded');
    if (moreBtn) moreBtn.style.display = '';
    if (hideBtn) hideBtn.style.display = 'none';
}

function initDetailBlockSeeMore(specificId) {
    const els = specificId
        ? [document.getElementById(`nbt-${specificId}`)]
        : Array.from(document.querySelectorAll('.note-block-body-text'));
    els.forEach(el => {
        if (!el) return;
        const id = el.id.replace('nbt-', '');
        const moreBtn = document.getElementById(`nbm-${id}`);
        const hideBtn = document.getElementById(`nbh-${id}`);
        if (!moreBtn) return;
        const truncated = el.scrollHeight > el.clientHeight + 2;
        moreBtn.style.display = truncated ? '' : 'none';
        if (hideBtn) hideBtn.style.display = 'none';
    });
}


/* ═══════════════════════════════════════════════════════════════
   SKILL DETAIL — PERSONAL VIEW
   Full-screen. Entry points: The Barre active cards,
   session detail skill chips, session detail block links.
   Back navigates to wherever the user came from.
   ═══════════════════════════════════════════════════════════════ */

function showSkillDetail(skillId, returnTo) {
    const refSkill = DATA.skills.find(s => s.id === skillId);
    const userSkill = appState.skills.find(s => s.id === skillId);
    if (!refSkill) return;

    const screenId = `skill-detail-${skillId}`;

    // Only push history when navigating to a different screen (not when re-rendering in place)
    if (appState.currentScreen !== screenId) pushNavHistory();

    let screen = document.getElementById(screenId);
    if (!screen) {
        screen = document.createElement('div');
        screen.className = 'screen skill-detail-screen';
        screen.id = screenId;
        document.querySelector('.app-container').appendChild(screen);
    }

    // Keep _skillDetailReturnTo in sync for any callers that still use it
    appState._skillDetailReturnTo = returnTo;

    // ── Highlights ──
    const highlightsHtml = buildSkillHighlightsHtml(skillId);

    // ── Corrections for this skill ──
    // allCorrections = full record including resolved (used for all-time total stat)
    // activeCorrections = unresolved only (used for default display)
    const allCorrections = appState.corrections
        .filter(c => c.skillId === skillId)
        .sort((a, b) => b.createdAt - a.createdAt);
    const activeCorrections = allCorrections.filter(c => !c.isResolved);
    const resolvedCount = allCorrections.length - activeCorrections.length;

    const CORRECTIONS_PREVIEW = 3;
    const hasMore = activeCorrections.length > CORRECTIONS_PREVIEW;
    const visibleCorrections = activeCorrections.slice(0, CORRECTIONS_PREVIEW);

    const seeAllLabel = resolvedCount > 0
        ? `see all ${activeCorrections.length} corrections · ${resolvedCount} resolved`
        : `see all ${activeCorrections.length} corrections`;

    const correctionsHtml = activeCorrections.length === 0 && resolvedCount === 0
        ? `<div class="skill-detail-empty-state">No corrections logged yet. Add them when logging a session.</div>`
        : activeCorrections.length === 0
        ? `<div class="skill-detail-empty-state">No active corrections. <button class="skill-see-more-btn" style="display:inline;padding:0;" onclick="expandSkillCorrections('${skillId}')">See ${resolvedCount} resolved.</button></div>`
        : `
            <div id="skill-corrections-list">
                ${renderSkillCorrectionsGrouped(visibleCorrections, skillId)}
            </div>
            ${hasMore ? `
                <button class="skill-see-more-btn" id="skill-see-more"
                        onclick="expandSkillCorrections('${skillId}')">
                    ${seeAllLabel}
                </button>` : resolvedCount > 0 ? `
                <button class="skill-see-more-btn" id="skill-see-more"
                        onclick="expandSkillCorrections('${skillId}')">
                    ${seeAllLabel}
                </button>` : ''}
        `;

    // ── Notes log ──
    const skillNotes = (appState.skillNotes || [])
        .filter(n => n.skillId === skillId)
        .sort((a, b) => b.createdAt - a.createdAt);

    const NOTES_PREVIEW = 2;
    const notesHaveMore = skillNotes.length > NOTES_PREVIEW;
    const visibleNotes = skillNotes.slice(0, NOTES_PREVIEW);

    const notesHtml = `
        <div id="skill-notes-list">
            ${visibleNotes.map(n => `
                <div class="skill-note-entry">
                    <div class="skill-note-header">
                        <div class="skill-note-date">${formatTimelineDate(n.date)}</div>
                        <button class="skill-note-delete" onclick="deleteSkillNote('${n.id}', '${skillId}')">×</button>
                    </div>
                    <div class="skill-note-text">${renderClampedHtml(nl2br(n.text), 'sn-' + n.id)}</div>
                </div>
            `).join('')}
            ${skillNotes.length === 0 ? `<div class="skill-detail-empty-state">No notes yet.</div>` : ''}
        </div>
        ${notesHaveMore ? `
            <button class="skill-see-more-btn" onclick="expandSkillNotes('${skillId}')">
                see all ${skillNotes.length} notes
            </button>` : ''}
        <div class="skill-add-note-row">
            <textarea class="session-block-textarea" id="skill-new-note"
                      placeholder="Note a thought…"
                      rows="2"
                      oninput="autoResizeTextarea(this)"
                      onkeydown="if((event.metaKey||event.ctrlKey)&&event.key==='Enter'){saveSkillNote('${skillId}');event.preventDefault();}"></textarea>
            <button class="skill-add-note-btn" onclick="saveSkillNote('${skillId}')">save</button>
        </div>
    `;

    // ── Linked goals ──
    const linkedGoals = (appState.goals || []).filter(g => g.skillId === skillId && !g.completedAt);
    const goalsHtml = linkedGoals.length > 0
        ? linkedGoals.map(g => `
            <div class="skill-linked-goal" onclick="navigateToGoal(${g.id})">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="6" cy="6" r="5"/><circle cx="6" cy="6" r="2.5"/></svg>
                <span>${g.title}</span>
            </div>`).join('')
        : `<div class="skill-detail-empty-state">No goals linked to this skill.</div>`;

    // ── Sessions this skill appeared in ──
    const skillSessionSkills = appState.sessionSkills
        .filter(ss => ss.skillId === skillId && ss.blockType !== 'choreography' && ss.source !== 'choreography')
        .sort((a, b) => {
            const sa = appState.sessions.find(s => s.id === a.sessionId);
            const sb = appState.sessions.find(s => s.id === b.sessionId);
            return (sb?.date || '').localeCompare(sa?.date || '');
        });
    const sessionCount = skillSessionSkills.length;
    const lastSession = sessionCount > 0
        ? appState.sessions.find(s => s.id === skillSessionSkills[0].sessionId)
        : null;

    // ── Progression summary ──
    const activeGoal = (appState.goals || []).find(g => g.skillId === skillId && !g.completedAt);
    const progressionHtml = `
        <div class="skill-progression-summary">
            <div class="skill-progression-stat">
                <div class="skill-progression-value">${lastSession ? formatTimelineDate(lastSession.date) : '—'}</div>
                <div class="skill-progression-label">last noted</div>
            </div>
            <div class="skill-progression-stat">
                <div class="skill-progression-value">${allCorrections.length}</div>
                <div class="skill-progression-label">corrections logged</div>
            </div>
            <div class="skill-progression-stat">
                <div class="skill-progression-value">${sessionCount}</div>
                <div class="skill-progression-label">sessions</div>
            </div>
        </div>
        ${activeGoal ? `
        <div class="skill-active-goal" onclick="navigateTo('goals')">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="6" cy="6" r="5"/><circle cx="6" cy="6" r="2.5"/></svg>
            <span>Active goal: ${activeGoal.title}</span>
        </div>` : ''}
    `;

    // ── Correction filters ──
    const corrFilterHtml = activeCorrections.length > 1 ? `
        <div class="skill-correction-filters" id="skill-corr-filters">
            <button class="skill-corr-filter active" data-filter="all"
                    onclick="filterSkillCorrections('${skillId}', 'all', this)">All</button>
            ${activeCorrections.some(c => c.isRecurring) ? `
            <button class="skill-corr-filter" data-filter="recurring"
                    onclick="filterSkillCorrections('${skillId}', 'recurring', this)">Recurring</button>` : ''}
            ${(appState.goals || []).some(g => (g.correctionIds || []).some(id => activeCorrections.find(c => c.id === id))) ? `
            <button class="skill-corr-filter" data-filter="goals"
                    onclick="filterSkillCorrections('${skillId}', 'goals', this)">Linked to goals</button>` : ''}
        </div>` : '';
    const photosHtml = `
        <div class="skill-photos-grid">
            <div class="skill-photo-placeholder">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                <span>add photo</span>
            </div>
        </div>
        <p class="skill-photos-note">Photo and video support coming soon.</p>
    `;

    const isFlagged = userSkill?.flagged || false;

    screen.innerHTML = `
        <div class="skill-detail-view">

            <!-- Sticky header — shows compressed name once hero scrolls away -->
            <div class="skill-detail-header" id="skill-detail-header-${skillId}">
                <button class="session-detail-back" onclick="goBack()">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="13 4 7 10 13 16"/>
                    </svg>
                    back
                </button>
                <div class="skill-detail-header-collapsed" id="skill-detail-collapsed-${skillId}">
                    <span class="skill-detail-collapsed-name">${refSkill.french}</span>
                    ${lastSession ? `<span class="skill-detail-collapsed-date">${formatTimelineDate(lastSession.date)}</span>` : ''}
                </div>
                <button class="skill-hero-focus-btn ${isFlagged ? 'active' : ''}"
                        id="skill-hero-focus-btn-${skillId}"
                        onclick="toggleSkillFocus('${skillId}')">
                    ${isFlagged ? '<span class="skill-hero-focus-dot"></span>in focus' : 'add to focus'}
                </button>
            </div>

            <!-- Hero — scrolls away, triggers collapsed header -->
            <div class="skill-detail-hero" id="skill-hero-${skillId}">
                <div class="skill-detail-category">${DATA.categoryNames[refSkill.categoryId] || ''}</div>
                <h1 class="skill-detail-title">${refSkill.french}</h1>
                <div class="skill-know-meta-row">
                    <span class="skill-detail-phonetic">${refSkill.phonetic}</span>
                    <span class="skill-know-meta-dot">·</span>
                    <span class="skill-detail-english">${refSkill.english}</span>
                </div>
                <div class="skill-detail-meta-row">
                    ${sessionCount > 0 ? `<span class="skill-detail-session-count">worked on ${sessionCount} time${sessionCount !== 1 ? 's' : ''}</span>` : ''}
                    ${lastSession ? `<span class="skill-detail-last-noted">last: ${formatTimelineDate(lastSession.date)}</span>` : ''}
                </div>
                <button class="skill-know-personal-btn" style="margin-top: var(--sp-sm);"
                        onclick="showSkillKnowledgePage('${skillId}', '${screenId}')">
                    about ${refSkill.french} →
                </button>
            </div>

            <!-- Progression summary -->
            <div class="skill-detail-section" style="padding-top: 0;">
                ${progressionHtml}
            </div>

            ${highlightsHtml}

            <!-- Corrections -->
            <div class="skill-detail-section">
                <div class="skill-detail-section-header">
                    <div class="skill-detail-section-label">Corrections</div>
                    <span class="skill-detail-section-count">${allCorrections.length} correction${allCorrections.length !== 1 ? 's' : ''}</span>
                </div>
                ${corrFilterHtml}
                <div id="skill-corrections-display">
                    ${correctionsHtml}
                </div>
            </div>

            <!-- Notes -->
            <div class="skill-detail-section" id="skill-notes-section-${skillId}">
                <div class="skill-detail-section-header">
                    <div class="skill-detail-section-label">My notes</div>
                </div>
                ${notesHtml}
            </div>

            <!-- Photos -->
            <div class="skill-detail-section">
                <div class="skill-detail-section-header">
                    <div class="skill-detail-section-label">Photos &amp; videos</div>
                </div>
                ${photosHtml}
            </div>

            <!-- Linked goals -->
            <div class="skill-detail-section">
                <div class="skill-detail-section-header">
                    <div class="skill-detail-section-label">Linked goals</div>
                    <button class="skill-detail-add-goal-btn" onclick="openGoalCreatorForSkill('${skillId}')">+ add goal</button>
                </div>
                <div class="skill-linked-goals">${goalsHtml}</div>
            </div>

            <div style="height: 120px;"></div>
        </div>
    `;

    showScreen(screenId);

    // Collapse header when hero scrolls out of view.
    // Use .app-container as root so the observer is immune to overflow-x:clip
    // on the container, which can cause the viewport-based observer to misfire on iOS.
    requestAnimationFrame(() => {
        initClampedTexts(screen);
        // Attach swipe handlers to correction cards
        screen.querySelectorAll('.swipe-row[data-correction-id]').forEach(row => {
            attachCorrectionSwipe(row, skillId);
        });
        const hero = document.getElementById(`skill-hero-${skillId}`);
        const collapsed = document.getElementById(`skill-detail-collapsed-${skillId}`);
        if (!hero || !collapsed) return;
        const root = document.querySelector('.app-container');
        const obs = new IntersectionObserver(([entry]) => {
            collapsed.classList.toggle('visible', !entry.isIntersecting);
        }, { root, threshold: 0, rootMargin: '-56px 0px 0px 0px' });
        obs.observe(hero);
    });
}

function buildSkillHighlightsHtml(skillId) {
    const hlSessionSkills = appState.sessionSkills
        .filter(ss => ss.skillId === skillId && ss.isHighlight)
        .map(ss => {
            const session = appState.sessions.find(s => s.id === ss.sessionId);
            const bullets = (ss.correctionIds || [])
                .map(id => appState.corrections.find(c => c.id === id))
                .filter(Boolean)
                .map(c => c.text);
            return { type: 'ss', id: ss.id, date: session?.date || null, body: ss.notes || null, bullets, sortKey: ss.id };
        });

    const hlNotes = (appState.skillNotes || [])
        .filter(n => n.skillId === skillId && n.isHighlight)
        .map(n => ({ type: 'note', id: n.id, date: n.date, body: n.text, bullets: [], sortKey: n.createdAt }));

    const all = [...hlSessionSkills, ...hlNotes].sort((a, b) => b.sortKey - a.sortKey);
    if (!all.length) return '';

    const blocksHtml = all.map(item => {
        const dateStr = item.date ? formatTimelineDate(item.date) : '';
        const bodyHtml = item.body ? `
            <div class="note-block-body">
                <div class="note-block-body-text">${nl2br(item.body)}</div>
            </div>` : '';
        const bulletsHtml = item.bullets.length ? `
            <div class="note-block-bullets">
                ${item.bullets.map(b => `
                    <div class="note-block-bullet">
                        <span class="note-block-dash">—</span>
                        <span class="note-block-bullet-text">${escapeHtml(b)}</span>
                    </div>`).join('')}
            </div>` : '';
        return `
            <div class="note-block note-block--highlight" id="hl-${item.type}-${item.id}">
                <div class="note-block-highlight-row">
                    <button class="note-block-star active"
                            onmousedown="toggleSkillHighlightItem('${item.type}', '${item.id}', '${skillId}')"
                            ontouchend="event.preventDefault(); toggleSkillHighlightItem('${item.type}', '${item.id}', '${skillId}')"
                            aria-label="Remove highlight">${ICONS.get('highlighter', 14)}</button>
                    <span class="note-block-highlight-label">${dateStr}</span>
                </div>
                ${bodyHtml}${bulletsHtml}
            </div>`;
    }).join('');

    // Default expanded — collapse state persists in memory only (not storage)
    const isCollapsed = appState._highlightsSectionCollapsed?.[skillId] || false;

    return `
        <div class="skill-detail-section" id="skill-highlights-section-${skillId}">
            <div class="skill-detail-section-header skill-detail-section-header--clickable"
                 onmousedown="toggleSkillHighlightsCollapse('${skillId}')"
                 ontouchend="event.preventDefault(); toggleSkillHighlightsCollapse('${skillId}')">
                <div class="skill-detail-section-label">Highlights</div>
                <span class="skill-detail-section-count skill-highlights-collapse-indicator">${isCollapsed ? '+' : '−'}</span>
            </div>
            <div class="skill-highlights-body${isCollapsed ? ' skill-highlights-body--collapsed' : ''}">
                ${blocksHtml}
            </div>
        </div>`;
}

function renderSkillHighlightsSectionInPlace(skillId, sectionEl) {
    const html = buildSkillHighlightsHtml(skillId);
    if (!html) {
        sectionEl.remove();
        return;
    }
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    const newSection = tmp.firstElementChild;
    if (newSection) {
        sectionEl.replaceWith(newSection);
        requestAnimationFrame(() => initClampedTexts(newSection));
    }
}

function toggleSkillHighlightsCollapse(skillId) {
    if (!appState._highlightsSectionCollapsed) appState._highlightsSectionCollapsed = {};
    appState._highlightsSectionCollapsed[skillId] = !appState._highlightsSectionCollapsed[skillId];
    const sectionEl = document.getElementById(`skill-highlights-section-${skillId}`);
    if (!sectionEl) return;
    const body = sectionEl.querySelector('.skill-highlights-body');
    const indicator = sectionEl.querySelector('.skill-highlights-collapse-indicator');
    const isCollapsed = appState._highlightsSectionCollapsed[skillId];
    if (body) body.classList.toggle('skill-highlights-body--collapsed', isCollapsed);
    if (indicator) indicator.textContent = isCollapsed ? '+' : '−';
}

function toggleSkillHighlightItem(type, id, skillId) {
    if (type === 'ss') {
        const ss = appState.sessionSkills.find(s => s.id === id);
        if (!ss) return;
        ss.isHighlight = false;
        ss.blockType = ss.previousBlockType || 'correction';
        ss.previousBlockType = null;
        const corrections = (ss.correctionIds || [])
            .map(cid => appState.corrections.find(c => c.id === cid))
            .filter(Boolean);
        corrections.forEach(c => { c.isHighlight = false; });
        storage.save('sessionSkills', appState.sessionSkills);
        storage.save('corrections', appState.corrections);
    } else {
        const note = (appState.skillNotes || []).find(n => n.id === id);
        if (!note) return;
        note.isHighlight = false;
        storage.save('skillNotes', appState.skillNotes);
    }
    const sectionEl = document.getElementById(`skill-highlights-section-${skillId}`);
    if (sectionEl) renderSkillHighlightsSectionInPlace(skillId, sectionEl);
}

function renderSkillCorrectionsGrouped(corrections, skillId, opts = {}) {
    const { showResolved = false } = opts;
    const groups = [];
    const sessionMap = {};

    const sorted = [...corrections].sort((a, b) => b.createdAt - a.createdAt);

    sorted.forEach(c => {
        if (c.sessionId) {
            if (!sessionMap[c.sessionId]) {
                sessionMap[c.sessionId] = [];
                groups.push({ sessionId: c.sessionId, items: sessionMap[c.sessionId] });
            }
            sessionMap[c.sessionId].push(c);
        } else {
            groups.push({ sessionId: null, items: [c] });
        }
    });

    return groups.map(group => {
        const items = [...group.items].sort((a, b) => a.createdAt - b.createdAt);
        const dateStr = formatTimelineDate(
            items[0].createdAt ? new Date(items[0].createdAt).toISOString().split('T')[0] : ''
        );
        const session = group.sessionId
            ? appState.sessions.find(s => s.id === group.sessionId)
            : null;
        const sessionLink = session
            ? `<button class="skill-corr-source" onmousedown="showSessionDetail('${group.sessionId}')">${session.sessionName || 'Session'} →</button>`
            : '';
        const itemsHtml = items.map(c => {
            const isResolved = !!c.isResolved;
            const cardHtml = `
                <div class="skill-corr-item${c.isRecurring && !isResolved ? ' is-recurring' : ''}${isResolved ? ' is-resolved' : ''}">
                    <div class="skill-corr-text">&ldquo;${escapeHtml(c.text)}&rdquo;</div>
                    ${c.isRecurring && !isResolved ? `<span class="skill-correction-recurring">recurring</span>` : ''}
                    ${isResolved ? `<span class="skill-corr-resolved-label">resolved</span>` : ''}
                </div>`;
            if (!skillId) return cardHtml;
            // Wrap in swipe-row — resolved items only get delete on left; active get resolve + delete
            const leftTray = isResolved
                ? `<div class="swipe-action-left corr-swipe-left corr-swipe-left--resolved">
                       <button class="corr-swipe-btn corr-swipe-unresolve" onmousedown="unresolveCorrection('${c.id}', '${skillId}')" ontouchend="event.preventDefault(); unresolveCorrection('${c.id}', '${skillId}')">mark as active</button>
                       <button class="corr-swipe-btn corr-swipe-delete" onmousedown="deleteCorrection('${c.id}', '${skillId}')" ontouchend="event.preventDefault(); deleteCorrection('${c.id}', '${skillId}')">delete</button>
                   </div>`
                : `<div class="swipe-action-left corr-swipe-left">
                       <button class="corr-swipe-btn corr-swipe-resolve" onmousedown="resolveCorrectionWithConfirm('${c.id}', '${skillId}')" ontouchend="event.preventDefault(); resolveCorrectionWithConfirm('${c.id}', '${skillId}')">resolve</button>
                       <button class="corr-swipe-btn corr-swipe-delete" onmousedown="deleteCorrection('${c.id}', '${skillId}')" ontouchend="event.preventDefault(); deleteCorrection('${c.id}', '${skillId}')">delete</button>
                   </div>`;
            return `
                <div class="swipe-row" data-correction-id="${c.id}">
                    ${leftTray}
                    <div class="swipe-content">${cardHtml}</div>
                </div>`;
        }).join('');
        return `
            <div class="skill-corr-group">
                ${itemsHtml}
                <div class="skill-corr-meta">
                    ${sessionLink}
                    <span class="skill-corr-group-date">${dateStr}</span>
                </div>
            </div>
        `;
    }).join('');
}

function expandSkillCorrections(skillId) {
    const list = document.getElementById('skill-corrections-list');
    const btn = document.getElementById('skill-see-more');
    if (!list) return;

    const allCorrections = appState.corrections
        .filter(c => c.skillId === skillId)
        .sort((a, b) => b.createdAt - a.createdAt);

    const active   = allCorrections.filter(c => !c.isResolved);
    const resolved = allCorrections.filter(c => c.isResolved);

    let html = renderSkillCorrectionsGrouped(active, skillId);
    if (resolved.length > 0) {
        html += `<div class="skill-corr-resolved-divider">resolved</div>`;
        html += renderSkillCorrectionsGrouped(resolved, skillId, { showResolved: true });
    }
    list.innerHTML = html;
    if (btn) btn.remove();

    // Re-attach swipe handlers after re-render
    list.querySelectorAll('.swipe-row[data-correction-id]').forEach(row => {
        attachCorrectionSwipe(row, skillId);
    });
}

function expandSkillNotes(skillId) {
    const list = document.getElementById('skill-notes-list');
    if (!list) return;
    const allNotes = (appState.skillNotes || [])
        .filter(n => n.skillId === skillId)
        .sort((a, b) => b.createdAt - a.createdAt);
    list.innerHTML = allNotes.map(n => `
        <div class="skill-note-entry">
            <div class="skill-note-header">
                <div class="skill-note-date">${formatTimelineDate(n.date)}</div>
                <button class="skill-note-delete" onclick="deleteSkillNote('${n.id}', '${skillId}')">×</button>
            </div>
            <div class="skill-note-text">${renderClampedHtml(nl2br(n.text), 'sn-' + n.id)}</div>
        </div>
    `).join('');
    // Replace see-more with hide button
    const seeMoreBtn = list.nextElementSibling;
    if (seeMoreBtn && seeMoreBtn.classList.contains('skill-see-more-btn')) {
        seeMoreBtn.textContent = 'hide';
        seeMoreBtn.onclick = () => renderSkillNotesSectionInPlace(skillId, list.closest('.skill-detail-section'));
    }
    requestAnimationFrame(() => initClampedTexts(list));
}

function saveSkillNote(skillId) {
    const textarea = document.getElementById('skill-new-note');
    const text = textarea?.value?.trim();
    if (!text) {
        textarea?.focus();
        return;
    }

    appState.skillNotes = appState.skillNotes || [];
    appState.skillNotes.push({
        id:        generateId(),
        userId:    null,
        skillId,
        text,
        date:      new Date().toISOString().split('T')[0],
        createdAt: Date.now(),
    });
    storage.save('skillNotes', appState.skillNotes);

    // Re-render the notes section only — don't full-refresh the screen
    const notesSection = document.getElementById(`skill-notes-section-${skillId}`);
    if (notesSection) {
        renderSkillNotesSectionInPlace(skillId, notesSection);
    } else {
        // Fall back to full screen refresh preserving the current screen as returnTo
        const screenId = `skill-detail-${skillId}`;
        showSkillDetail(skillId, appState._skillDetailReturnTo || 'barre-screen');
    }
}

function filterSkillCorrections(skillId, filter, btn) {
    document.querySelectorAll('.skill-corr-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const all = appState.corrections
        .filter(c => c.skillId === skillId && !c.isResolved)
        .sort((a, b) => b.createdAt - a.createdAt);

    let filtered;
    if (filter === 'recurring') {
        filtered = all.filter(c => c.isRecurring);
    } else if (filter === 'goals') {
        const goalLinkedIds = new Set(
            (appState.goals || []).flatMap(g => g.correctionIds || [])
        );
        filtered = all.filter(c => goalLinkedIds.has(c.id));
    } else {
        filtered = all;
    }

    const display = document.getElementById('skill-corrections-display');
    if (!display) return;

    const PREVIEW = 3;
    const hasMore = filtered.length > PREVIEW;

    if (filtered.length === 0) {
        display.innerHTML = `<div class="skill-detail-empty-state">No corrections match this filter.</div>`;
        return;
    }

    display.innerHTML = `
        <div id="skill-corr-list">${renderSkillCorrectionsGrouped(filtered.slice(0, PREVIEW), skillId)}</div>
        ${hasMore ? `<button class="skill-see-more-btn"
            onclick="expandFilteredCorrections('${skillId}', '${filter}')">
            see all ${filtered.length} corrections
        </button>` : ''}
    `;
    display.querySelectorAll('.swipe-row[data-correction-id]').forEach(row => {
        attachCorrectionSwipe(row, skillId);
    });
}

function expandFilteredCorrections(skillId, filter) {
    const all = appState.corrections
        .filter(c => c.skillId === skillId && !c.isResolved)
        .sort((a, b) => b.createdAt - a.createdAt);

    let filtered;
    if (filter === 'recurring') {
        filtered = all.filter(c => c.isRecurring);
    } else if (filter === 'goals') {
        const goalLinkedIds = new Set(
            (appState.goals || []).flatMap(g => g.correctionIds || [])
        );
        filtered = all.filter(c => goalLinkedIds.has(c.id));
    } else {
        filtered = all;
    }

    const list = document.getElementById('skill-corr-list');
    if (list) {
        list.innerHTML = renderSkillCorrectionsGrouped(filtered, skillId);
        list.querySelectorAll('.swipe-row[data-correction-id]').forEach(row => {
            attachCorrectionSwipe(row, skillId);
        });
    }
    // Remove see-more button
    const btn = document.querySelector('#skill-corrections-display .skill-see-more-btn');
    if (btn) btn.remove();
}

// ── PLI-018 — Correction resolve/delete actions ──

function attachCorrectionSwipe(row, skillId) {
    const content = row.querySelector('.swipe-content');
    const leftEl  = row.querySelector('.swipe-action-left');
    if (!content) return;

    // Allow vertical scroll through but let JS handle horizontal — browser won't intercept pan-x
    row.style.touchAction = 'pan-y';

    const SNAP = 200, MIN_MS = 120, DEAD = 8;
    let startX = 0, startY = 0, startTime = 0, dx = 0;
    let dragging = false, revealed = false, axisLocked = false;

    function getX(e) { return e.touches ? e.touches[0].clientX : e.clientX; }
    function getY(e) { return e.touches ? e.touches[0].clientY : e.clientY; }

    function reset() {
        content.style.transition = 'transform 0.25s var(--ease-out)';
        content.style.transform  = '';
        if (leftEl) { leftEl.style.opacity = '0'; leftEl.classList.remove('corr-swipe-revealed'); }
        revealed = false;
        dragging = false;
        axisLocked = false;
    }

    function onStart(e) {
        if (revealed) { reset(); return; }
        if (e.target.closest('button, input, a')) return;
        startX     = getX(e);
        startY     = getY(e);
        startTime  = Date.now();
        dx         = 0;
        dragging   = true;
        axisLocked = false;
        content.style.transition = 'none';
    }

    function onMove(e) {
        if (!dragging || revealed) return;
        const rawX = getX(e) - startX;
        const rawY = getY(e) - startY;

        // Lock to horizontal axis after DEAD px — cancel if more vertical
        if (!axisLocked) {
            if (Math.abs(rawX) < DEAD && Math.abs(rawY) < DEAD) return;
            if (Math.abs(rawY) >= Math.abs(rawX)) { dragging = false; return; }
            axisLocked = true;
        }

        if (rawX >= 0) return; // left swipe only
        dx = rawX;
        e.preventDefault(); // stop page scroll during horizontal drag
        const t = dx < -SNAP ? -SNAP + (dx + SNAP) * 0.1 : dx;
        content.style.transform = `translateX(${t}px)`;
        if (leftEl) leftEl.style.opacity = String(Math.min(1, Math.abs(dx) / SNAP));
    }

    function onEnd() {
        if (!dragging) return;
        dragging = false;
        const elapsed = Date.now() - startTime;
        if (dx <= -SNAP && elapsed >= MIN_MS) {
            content.style.transition = 'transform 0.2s var(--ease-out)';
            content.style.transform  = `translateX(-${SNAP}px)`;
            if (leftEl) { leftEl.style.opacity = '1'; leftEl.classList.add('corr-swipe-revealed'); }
            revealed = true;
        } else {
            reset();
        }
    }

    // passive:false on touchstart so Safari knows this gesture may call preventDefault in touchmove
    row.addEventListener('touchstart',  onStart, { passive: false });
    row.addEventListener('touchmove',   onMove,  { passive: false });
    row.addEventListener('touchend',    onEnd,   { passive: true });
    row.addEventListener('touchcancel', reset,   { passive: true });
    row.addEventListener('mousedown',   onStart);
    row.addEventListener('mousemove',   onMove);
    row.addEventListener('mouseup',     onEnd);
    row.addEventListener('mouseleave',  onEnd);
}

function resolveCorrectionWithConfirm(correctionId, skillId) {
    const c = appState.corrections.find(x => x.id === correctionId);
    if (!c) return;

    // Inline confirm — replaces swipe-content with two-option prompt
    const row = document.querySelector(`.swipe-row[data-correction-id="${correctionId}"]`);
    if (!row) return;
    const content = row.querySelector('.swipe-content');
    if (!content) return;

    content.style.transition = '';
    content.style.transform  = '';
    content.innerHTML = `
        <div class="corr-confirm-prompt">
            <div class="corr-confirm-text">Mark as resolved? It'll stay in your full record but won't show up by default.</div>
            <div class="corr-confirm-actions">
                <button class="corr-confirm-btn corr-confirm-yes" onmousedown="commitResolveCorrection('${correctionId}', '${skillId}')" ontouchend="event.preventDefault(); commitResolveCorrection('${correctionId}', '${skillId}')">Yes, resolved</button>
                <button class="corr-confirm-btn corr-confirm-cancel" onmousedown="cancelCorrectionConfirm('${correctionId}', '${skillId}')" ontouchend="event.preventDefault(); cancelCorrectionConfirm('${correctionId}', '${skillId}')">Keep it</button>
            </div>
        </div>`;
}

function commitResolveCorrection(correctionId, skillId) {
    const c = appState.corrections.find(x => x.id === correctionId);
    if (!c) return;
    c.isResolved = true;
    storage.save('corrections', appState.corrections);

    // Animate row out then re-render the corrections section
    const row = document.querySelector(`.swipe-row[data-correction-id="${correctionId}"]`);
    if (row) {
        row.style.transition = 'max-height 0.3s var(--ease-out), opacity 0.25s ease, margin 0.3s ease';
        row.style.maxHeight  = row.offsetHeight + 'px';
        requestAnimationFrame(() => {
            row.style.maxHeight    = '0';
            row.style.opacity      = '0';
            row.style.marginBottom = '0';
            row.style.overflow     = 'hidden';
        });
        setTimeout(() => _refreshCorrectionsList(skillId), 300);
    } else {
        _refreshCorrectionsList(skillId);
    }
}

function cancelCorrectionConfirm(correctionId, skillId) {
    // Re-render just this card back to its original state
    const row = document.querySelector(`.swipe-row[data-correction-id="${correctionId}"]`);
    if (!row) return;
    const c = appState.corrections.find(x => x.id === correctionId);
    if (!c) return;
    const isResolved = !!c.isResolved;
    const cardHtml = `
        <div class="skill-corr-item${c.isRecurring && !isResolved ? ' is-recurring' : ''}${isResolved ? ' is-resolved' : ''}">
            <div class="skill-corr-text">&ldquo;${escapeHtml(c.text)}&rdquo;</div>
            ${c.isRecurring && !isResolved ? `<span class="skill-correction-recurring">recurring</span>` : ''}
            ${isResolved ? `<span class="skill-corr-resolved-label">resolved</span>` : ''}
        </div>`;
    const content = row.querySelector('.swipe-content');
    if (content) content.innerHTML = cardHtml;
    attachCorrectionSwipe(row, skillId);
}

function unresolveCorrection(correctionId, skillId) {
    const c = appState.corrections.find(x => x.id === correctionId);
    if (!c) return;
    c.isResolved = false;
    storage.save('corrections', appState.corrections);
    _refreshCorrectionsList(skillId);
}

function deleteCorrection(correctionId, skillId) {
    const c = appState.corrections.find(x => x.id === correctionId);
    if (!c) return;

    const row = document.querySelector(`.swipe-row[data-correction-id="${correctionId}"]`);
    if (!row) return;
    const content = row.querySelector('.swipe-content');
    if (!content) return;

    content.style.transition = '';
    content.style.transform  = '';
    content.innerHTML = `
        <div class="corr-confirm-prompt">
            <div class="corr-confirm-text">Delete this correction? This can't be undone.</div>
            <div class="corr-confirm-actions">
                <button class="corr-confirm-btn corr-confirm-yes corr-confirm-delete" onmousedown="commitDeleteCorrection('${correctionId}', '${skillId}')" ontouchend="event.preventDefault(); commitDeleteCorrection('${correctionId}', '${skillId}')">Delete</button>
                <button class="corr-confirm-btn corr-confirm-cancel" onmousedown="cancelCorrectionConfirm('${correctionId}', '${skillId}')" ontouchend="event.preventDefault(); cancelCorrectionConfirm('${correctionId}', '${skillId}')">Cancel</button>
            </div>
        </div>`;
}

function commitDeleteCorrection(correctionId, skillId) {
    appState.corrections = appState.corrections.filter(c => c.id !== correctionId);
    // Remove from any goals that reference this correction
    (appState.goals || []).forEach(g => {
        if (g.correctionIds) g.correctionIds = g.correctionIds.filter(id => id !== correctionId);
    });
    storage.save('corrections', appState.corrections);
    storage.save('goals', appState.goals);

    const row = document.querySelector(`.swipe-row[data-correction-id="${correctionId}"]`);
    if (row) {
        row.style.transition = 'max-height 0.3s var(--ease-out), opacity 0.25s ease, margin 0.3s ease';
        row.style.maxHeight  = row.offsetHeight + 'px';
        requestAnimationFrame(() => {
            row.style.maxHeight    = '0';
            row.style.opacity      = '0';
            row.style.marginBottom = '0';
            row.style.overflow     = 'hidden';
        });
        setTimeout(() => _refreshCorrectionsList(skillId), 300);
    } else {
        _refreshCorrectionsList(skillId);
    }
}

function _refreshCorrectionsList(skillId) {
    // Re-render the corrections section in place without a full screen reload
    const display = document.getElementById('skill-corrections-display');
    if (!display) return;

    const allCorrections = appState.corrections
        .filter(c => c.skillId === skillId)
        .sort((a, b) => b.createdAt - a.createdAt);
    const active   = allCorrections.filter(c => !c.isResolved);
    const resolved = allCorrections.filter(c =>  c.isResolved);

    const PREVIEW = 3;
    const hasMore = active.length > PREVIEW;
    const resolvedCount = resolved.length;
    const seeAllLabel = resolvedCount > 0
        ? `see all ${active.length} corrections · ${resolvedCount} resolved`
        : `see all ${active.length} corrections`;

    let html;
    if (active.length === 0 && resolvedCount === 0) {
        html = `<div class="skill-detail-empty-state">No corrections logged yet.</div>`;
    } else if (active.length === 0) {
        html = `<div class="skill-detail-empty-state">No active corrections. <button class="skill-see-more-btn" style="display:inline;padding:0;" onclick="expandSkillCorrections('${skillId}')">See ${resolvedCount} resolved.</button></div>`;
    } else {
        const listHtml = renderSkillCorrectionsGrouped(active.slice(0, PREVIEW), skillId);
        html = `<div id="skill-corrections-list"><div id="skill-corr-list">${listHtml}</div></div>`;
        if (hasMore || resolvedCount > 0) {
            html += `<button class="skill-see-more-btn" id="skill-see-more" onclick="expandSkillCorrections('${skillId}')">${seeAllLabel}</button>`;
        }
    }

    display.innerHTML = html;
    display.querySelectorAll('.swipe-row[data-correction-id]').forEach(row => {
        attachCorrectionSwipe(row, skillId);
    });
}

function renderSkillNotesSectionInPlace(skillId, sectionEl) {
    const skillNotes = (appState.skillNotes || [])
        .filter(n => n.skillId === skillId)
        .sort((a, b) => b.createdAt - a.createdAt);

    const NOTES_PREVIEW = 2;
    const notesHaveMore = skillNotes.length > NOTES_PREVIEW;
    const visibleNotes = skillNotes.slice(0, NOTES_PREVIEW);

    const notesHtml = `
        <div id="skill-notes-list">
            ${visibleNotes.map(n => `
                <div class="skill-note-entry">
                    <div class="skill-note-header">
                        <div class="skill-note-date">${formatTimelineDate(n.date)}</div>
                        <button class="skill-note-delete" onclick="deleteSkillNote('${n.id}', '${skillId}')">×</button>
                    </div>
                    <div class="skill-note-text">${renderClampedHtml(nl2br(n.text), 'sn-' + n.id)}</div>
                </div>
            `).join('')}
            ${skillNotes.length === 0 ? `<div class="skill-detail-empty-state">No notes yet.</div>` : ''}
        </div>
        ${notesHaveMore ? `
            <button class="skill-see-more-btn" onclick="expandSkillNotes('${skillId}')">
                see all ${skillNotes.length} notes
            </button>` : ''}
        <div class="skill-add-note-row">
            <textarea class="session-block-textarea" id="skill-new-note"
                      placeholder="Note a thought…"
                      rows="2"
                      oninput="autoResizeTextarea(this)"
                      onkeydown="if((event.metaKey||event.ctrlKey)&&event.key==='Enter'){saveSkillNote('${skillId}');event.preventDefault();}"></textarea>
            <button class="skill-add-note-btn" onclick="saveSkillNote('${skillId}')">save</button>
        </div>
    `;

    sectionEl.innerHTML = `
        <div class="skill-detail-section-header">
            <div class="skill-detail-section-label">My notes</div>
        </div>
        ${notesHtml}
    `;
    requestAnimationFrame(() => initClampedTexts(sectionEl));
}

// ── Learn page notes ──

function renderLearnNotesSectionInPlace(sectionId, itemName, sectionEl) {
    const notes = (appState.learnNotes || [])
        .filter(n => n.sectionId === sectionId && n.itemName === itemName)
        .sort((a, b) => b.createdAt - a.createdAt);

    const PREVIEW = 2;
    const hasMore = notes.length > PREVIEW;
    const visible = notes.slice(0, PREVIEW);
    const slug = itemName.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    const inputId = `learn-new-note-${sectionId}-${slug}`;

    const noteListHtml = `
        <div id="learn-notes-list-${sectionId}-${slug}">
            ${visible.map(n => `
                <div class="skill-note-entry">
                    <div class="skill-note-header">
                        <div class="skill-note-date">${formatTimelineDate(n.date)}</div>
                        <button type="button" class="skill-note-delete" onclick="deleteLearnNote('${n.id}', '${sectionId}', '${itemName.replace(/'/g, "\\'")}')">×</button>
                    </div>
                    <div class="skill-note-text">${renderClampedHtml(nl2br(n.text), 'ln-' + n.id)}</div>
                </div>
            `).join('')}
            ${notes.length === 0 ? '' : ''}
        </div>
        ${hasMore ? `<button type="button" class="skill-see-more-btn" onclick="expandLearnNotes('${sectionId}', '${itemName.replace(/'/g, "\\'")}')">see all ${notes.length} notes</button>` : ''}
        <div class="skill-add-note-row">
            <textarea class="session-block-textarea" id="${inputId}"
                      placeholder="Note a thought…"
                      rows="2"
                      oninput="autoResizeTextarea(this)"
                      onkeydown="if((event.metaKey||event.ctrlKey)&&event.key==='Enter'){saveLearnNote('${sectionId}','${itemName.replace(/'/g, "\\'")}');event.preventDefault();}"></textarea>
            <button type="button" class="skill-add-note-btn" onclick="saveLearnNote('${sectionId}', '${itemName.replace(/'/g, "\\'")}')">save</button>
        </div>
    `;

    sectionEl.innerHTML = `
        <div class="skill-detail-section-header">
            <div class="skill-detail-section-label">My notes</div>
        </div>
        ${noteListHtml}
    `;
    requestAnimationFrame(() => initClampedTexts(sectionEl));
}

function saveLearnNote(sectionId, itemName) {
    const slug = itemName.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    const textarea = document.getElementById(`learn-new-note-${sectionId}-${slug}`);
    const text = textarea?.value?.trim();
    if (!text) { textarea?.focus(); return; }

    appState.learnNotes = appState.learnNotes || [];
    appState.learnNotes.push({
        id:        generateId(),
        userId:    null,
        sectionId,
        itemName,
        text,
        date:      new Date().toISOString().split('T')[0],
        createdAt: Date.now(),
    });
    storage.save('learnNotes', appState.learnNotes);

    const notesSectionEl = document.getElementById(`learn-notes-section-${sectionId}-${slug}`);
    if (notesSectionEl) renderLearnNotesSectionInPlace(sectionId, itemName, notesSectionEl);

    // Update note indicator on the section list row without navigating
    const sectionScreen = document.getElementById(`learn-section-${sectionId}`);
    if (sectionScreen) {
        const rows = sectionScreen.querySelectorAll('.glossary-term-main');
        rows.forEach(main => {
            const nameEl = main.querySelector('.glossary-term-name');
            if (nameEl && nameEl.textContent === itemName) {
                if (!main.querySelector('.learn-note-indicator')) {
                    const indicator = document.createElement('span');
                    indicator.className = 'learn-note-indicator';
                    indicator.innerHTML = ICONS.get('fab-note', 16);
                    nameEl.after(indicator);
                }
            }
        });
    }
}

function deleteLearnNote(noteId, sectionId, itemName) {
    appState.learnNotes = (appState.learnNotes || []).filter(n => n.id !== noteId);
    storage.save('learnNotes', appState.learnNotes);

    const slug = itemName.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    const notesSectionEl = document.getElementById(`learn-notes-section-${sectionId}-${slug}`);
    if (notesSectionEl) renderLearnNotesSectionInPlace(sectionId, itemName, notesSectionEl);

    const sectionScreen = document.getElementById(`learn-section-${sectionId}`);
    if (sectionScreen) showLearnSection(sectionId);
}

function expandLearnNotes(sectionId, itemName) {
    const slug = itemName.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    const list = document.getElementById(`learn-notes-list-${sectionId}-${slug}`);
    if (!list) return;
    const allNotes = (appState.learnNotes || [])
        .filter(n => n.sectionId === sectionId && n.itemName === itemName)
        .sort((a, b) => b.createdAt - a.createdAt);
    list.innerHTML = allNotes.map(n => `
        <div class="skill-note-entry">
            <div class="skill-note-header">
                <div class="skill-note-date">${formatTimelineDate(n.date)}</div>
                <button class="skill-note-delete" onmousedown="deleteLearnNote('${n.id}', '${sectionId}', '${itemName.replace(/'/g, "\\'")}')">×</button>
            </div>
            <div class="skill-note-text">${renderClampedHtml(nl2br(n.text), 'ln-' + n.id)}</div>
        </div>
    `).join('');
    const seeMoreBtn = list.nextElementSibling;
    if (seeMoreBtn && seeMoreBtn.classList.contains('skill-see-more-btn')) {
        seeMoreBtn.textContent = 'hide';
        seeMoreBtn.onmousedown = () => renderLearnNotesSectionInPlace(sectionId, itemName, list.closest('.skill-detail-section'));
    }
    requestAnimationFrame(() => initClampedTexts(list));
}

// ── Learn bookmarks ──────────────────────────────────────────────────────────

function isLearnBookmarked(pageType, itemId) {
    return (appState.learnBookmarks || []).some(
        b => b.pageType === pageType && b.itemId === String(itemId)
    );
}

function toggleLearnBookmark(pageType, itemId, btnEl) {
    const id = String(itemId);
    appState.learnBookmarks = appState.learnBookmarks || [];
    const idx = appState.learnBookmarks.findIndex(b => b.pageType === pageType && b.itemId === id);
    if (idx > -1) {
        appState.learnBookmarks.splice(idx, 1);
    } else {
        appState.learnBookmarks.push({ pageType, itemId: id, createdAt: Date.now() });
    }
    storage.save('learnBookmarks', appState.learnBookmarks);
    const isNow = isLearnBookmarked(pageType, id);
    if (btnEl) {
        btnEl.classList.toggle('bookmarked', isNow);
        const ph = btnEl.querySelector('ph-bookmark-simple');
        if (ph) ph.setAttribute('weight', isNow ? 'fill' : 'light');
        btnEl.setAttribute('aria-label', isNow ? 'remove bookmark' : 'bookmark');
    }
    _refreshLearnBookmarkedPill();
    if (pageType === 'skill' && document.getElementById('skill-lib-body')) {
        updateSkillLibResults();
    }
}

function renderBookmarkBtn(pageType, itemId) {
    const booked = isLearnBookmarked(pageType, String(itemId));
    return `<button type="button" class="learn-bookmark-btn${booked ? ' bookmarked' : ''}"
                    aria-label="${booked ? 'remove bookmark' : 'bookmark'}"
                    onclick="toggleLearnBookmark('${pageType}', '${String(itemId).replace(/'/g, "\\'")}', this)">
                ${ICONS.get(booked ? 'bookmark-fill' : 'bookmark', 20)}
            </button>`;
}

function _refreshLearnBookmarkedPill() {
    const container = document.getElementById('learn-filter-chips');
    if (!container) return;
    const hasBookmarks = (appState.learnBookmarks || []).length > 0;
    const pill = container.querySelector('[data-filter="bookmarked"]');
    if (!pill) return;
    if (!hasBookmarks) {
        pill.classList.add('disabled');
        if (pill.classList.contains('active')) {
            pill.classList.remove('active');
            container.querySelector('[data-filter="all"]')?.classList.add('active');
            filterLearnScreen('all');
        }
    } else {
        pill.classList.remove('disabled');
    }
}

function renderBookmarkedLearnItems() {
    const bookmarks = appState.learnBookmarks || [];
    if (!bookmarks.length) return '<p class="learn-helper-text">No bookmarks yet.</p>';
    const pointerSection = DATA.learnSections.find(s => s.id === 'pointers');

    // Group by section
    const groups = {};
    bookmarks.forEach(b => {
        let name = b.itemId, action = '', groupKey = b.pageType, groupLabel = b.pageType;
        if (b.pageType === 'skill') {
            const skill = DATA.skills.find(s => s.id === b.itemId);
            name = skill?.french || b.itemId;
            groupKey = 'skill'; groupLabel = 'Skills';
            action = `showSkillKnowledgePage('${b.itemId}')`;
        } else if (b.pageType === 'pointer') {
            const pointer = pointerSection?.items.find(p => p.name === b.itemId);
            name = pointer?.name || b.itemId;
            groupKey = 'pointer'; groupLabel = 'Pointers';
            const idx = pointer ? pointerSection.items.indexOf(pointer) : -1;
            if (idx > -1) action = `showPointerDetail(${idx})`;
        } else {
            const section = DATA.learnSections.find(s => s.id === b.pageType);
            groupLabel = section?.name || b.pageType;
            action = `showLearnDetail('${b.pageType}', '${b.itemId.replace(/'/g, "\\'")}')`;
        }
        if (!groups[groupKey]) groups[groupKey] = { label: groupLabel, rows: [] };
        groups[groupKey].rows.push({ name, action });
    });

    return Object.values(groups).map(g => `
        <div class="learn-search-group">
            <div class="learn-search-group-label">${g.label}</div>
            ${g.rows.map(r => `
                <div class="glossary-term-row glossary-term-skill" ${r.action ? `onclick="${r.action}"` : ''}>
                    <div class="glossary-term-main">
                        <span class="glossary-term-name">${r.name}</span>
                    </div>
                </div>`).join('')}
        </div>`).join('');
}

function renderInFocusLearnItems() {
    const focused = (appState.skills || []).filter(s => s.flagged);
    if (!focused.length) return '<p class="learn-helper-text">No skills in focus.</p>';
    return `<div class="learn-search-group">
        <div class="learn-search-group-label">In Focus</div>
        ${focused.map(skill => {
            const name = skill.french || skill.name || skill.id;
            return `<div class="glossary-term-row glossary-term-skill" onclick="showSkillKnowledgePage('${skill.id}')">
                <div class="glossary-term-main">
                    <span class="glossary-term-name">${name}</span>
                </div>
            </div>`;
        }).join('')}
    </div>`;
}

// ── Learn line saves ──────────────────────────────────────────────────────────

function getLearnLineSave(lineText, saveType) {
    const save = (appState.learnLineSaves || []).find(s => s.lineText === lineText && s.saveType === saveType);
    if (!save) return null;
    if (saveType === 'goal') {
        const goal = (appState.goals || []).find(g => g.id === save.objectId);
        return (goal && !goal.completedAt) ? save : null;
    }
    if (saveType === 'correction') {
        const corr = (appState.corrections || []).find(c => c.id === save.objectId);
        return corr ? save : null;
    }
    return null;
}

function _renderLineSavePrompt(lineText, saveType, pageType, itemId) {
    const save = getLearnLineSave(lineText, saveType);
    const ep = escapeHtml(pageType);
    const ei = escapeHtml(String(itemId));
    if (save) {
        if (saveType === 'goal') {
            return `<span class="learn-line-save-action saved-link" onclick="navigateToGoal(${save.objectId}); event.stopPropagation();">saved as goal</span>`;
        }
        return `<span class="learn-line-save-action saved-label">saved as correction</span>`;
    }
    if (saveType === 'goal') {
        return `<span class="learn-line-save-action goal-action" onclick="saveLineAsGoal(this, '${ep}', '${ei}'); event.stopPropagation();">save as goal →</span>`;
    }
    return `<span class="learn-line-save-action corr-action" onclick="saveLineAsCorrection(this, '${ei}'); event.stopPropagation();">save as correction →</span>`;
}

function openLearnLineSave(el) {
    const lineText = el.dataset.lineText;
    const saveType = el.dataset.saveType;
    const existing = getLearnLineSave(lineText, saveType);
    if (existing && saveType === 'goal') { navigateToGoal(existing.objectId); return; }
    const expand = el.querySelector('.learn-line-save-expand');
    if (!expand) return;
    document.querySelectorAll('.learn-line-tappable.save-open').forEach(row => {
        if (row !== el) { row.classList.remove('save-open'); row.querySelector('.learn-line-save-expand')?.classList.remove('open'); }
    });
    const isOpen = el.classList.contains('save-open');
    el.classList.toggle('save-open', !isOpen);
    expand.classList.toggle('open', !isOpen);
}

function saveLineAsGoal(promptEl, pageType, itemId) {
    const lineEl = promptEl.closest('.learn-line-tappable');
    const lineText = lineEl?.dataset.lineText || '';
    appState._pendingLineSave = { pageType, itemId: String(itemId), lineText, saveType: 'goal' };
    openGoalCreatorWithSuggestion(lineText, null, null, '', []);
}

function saveLineAsCorrection(promptEl, skillId) {
    const lineEl = promptEl.closest('.learn-line-tappable');
    const lineText = lineEl?.dataset.lineText || '';
    appState._pendingCorrectionLineSave = { lineText, skillId };
    _openCorrectionCreator(lineText, skillId);
}

function _openCorrectionCreator(text, skillId) {
    let overlay = document.getElementById('correction-creator-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'correction-creator-overlay';
        overlay.className = 'session-overlay';
        document.body.appendChild(overlay);
        overlay.addEventListener('mousedown', e => { if (e.target === overlay) _closeCorrectionCreator(); });
    }
    overlay.innerHTML = `
        <div class="session-logger-sheet" style="max-height: 60vh;">
            <div class="session-sheet-handle"></div>
            <div class="session-logger-header">
                <span class="session-logger-title">save as correction</span>
                <button class="session-discard-btn" type="button" onclick="_closeCorrectionCreator()">cancel</button>
            </div>
            <div style="padding: var(--sp-lg);">
                <textarea id="correction-creator-text" class="session-block-textarea" rows="3"
                          style="min-height: 80px;" oninput="autoResizeTextarea(this)">${escapeHtml(text)}</textarea>
            </div>
            <div class="session-logger-footer">
                <button class="primary-btn" type="button" onclick="_saveCorrectionFromCreator('${escapeHtml(skillId)}')">save correction</button>
            </div>
        </div>`;
    document.querySelector('.fab')?.classList.remove('visible');
    document.querySelector('.bottom-nav')?.classList.remove('visible');
    requestAnimationFrame(() => overlay.classList.add('open'));
}

function _closeCorrectionCreator() {
    const overlay = document.getElementById('correction-creator-overlay');
    if (overlay) overlay.classList.remove('open');
    document.querySelector('.fab')?.classList.add('visible');
    document.querySelector('.bottom-nav')?.classList.add('visible');
    appState._pendingCorrectionLineSave = null;
}

function _saveCorrectionFromCreator(skillId) {
    const textarea = document.getElementById('correction-creator-text');
    const text = textarea?.value?.trim();
    if (!text) { textarea?.focus(); return; }
    const now = Date.now();
    const correctionId = generateId();
    appState.corrections.push({ id: correctionId, userId: null, skillId, text, createdAt: now, sessionId: null, source: 'self', type: 'technical', isRecurring: false, isPinned: false, isResolved: false, derivedFromCorrectionId: null, previousBlockType: null });
    storage.save('corrections', appState.corrections);
    const pending = appState._pendingCorrectionLineSave;
    if (pending) {
        appState.learnLineSaves = appState.learnLineSaves || [];
        appState.learnLineSaves.push({ id: generateId(), lineText: pending.lineText, saveType: 'correction', objectId: correctionId, createdAt: now });
        storage.save('learnLineSaves', appState.learnLineSaves);
        _refreshAllLineSaveStates();
    }
    _closeCorrectionCreator();
}

function _refreshAllLineSaveStates() {
    document.querySelectorAll('.learn-line-tappable').forEach(el => {
        const lineText = el.dataset.lineText;
        const saveType = el.dataset.saveType;
        const pageType = el.dataset.pageType;
        const itemId   = el.dataset.itemId;
        if (!lineText || !saveType) return;
        const expand = el.querySelector('.learn-line-save-expand');
        if (!expand) return;
        expand.innerHTML = _renderLineSavePrompt(lineText, saveType, pageType, itemId);
        const save = getLearnLineSave(lineText, saveType);
        if (save) { el.classList.add('save-open'); expand.classList.add('open'); }
    });
}

function toggleSkillFocus(skillId) {
    const skill = appState.skills.find(s => s.id === skillId);
    if (!skill) return;
    skill.flagged = !skill.flagged;
    persistSkillState();

    // Update focus button (header pill)
    const heroBtn = document.getElementById(`skill-hero-focus-btn-${skillId}`);
    if (heroBtn) {
        heroBtn.className = `skill-hero-focus-btn ${skill.flagged ? 'active' : ''}`;
        heroBtn.innerHTML = skill.flagged
            ? '<span class="skill-hero-focus-dot"></span>in focus'
            : 'add to focus';
    }

    // If The Barre is the current screen, refresh it
    if (document.getElementById('barre-screen')?.classList.contains('active')) {
        showBarreScreen();
    }
}

function openGoalCreatorForSkill(skillId) {
    openGoalCreator();
    if (appState._goalDraft) appState._goalDraft.skillId = skillId;
    requestAnimationFrame(() => {
        const skill = (appState.skills || []).find(s => s.id === skillId);
        const input = document.getElementById('goal-skill-input');
        if (input && skill) input.value = skill.french;
    });
}

function navigateToGoal(goalId) {
    navigateTo('goals');
    // After goals screen renders, scroll to the specific goal card
    requestAnimationFrame(() => {
        setTimeout(() => {
            const row = document.querySelector(`.swipe-row[data-goal-id="${goalId}"]`);
            if (row) row.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    });
}

function closeSkillDetail(skillId, returnTo) {
    goBack();
}

// Wire openSkillFromBlock to navigate to skill detail
function openSkillFromBlock(topicId) {
    const skillId = topicId.replace('skill:', '');
    closeSessionLogger();
    showSkillDetail(skillId, 'barre-screen');
}


/* ═══════════════════════════════════════════════════════════════
   SKILL LIBRARY (Learn tab)
   Browse all skills by category with live search and filtering.
   Each skill card opens the knowledge page.
   ═══════════════════════════════════════════════════════════════ */

const DIFFICULTY_ORDER = { beginner: 0, improver: 1, intermediate: 2, advanced: 3 };
function showLearnSkillLibrary() {
    let screen = document.getElementById('skill-library-screen');
    if (!screen) {
        screen = document.createElement('div');
        screen.className = 'screen skill-library-screen';
        screen.id = 'skill-library-screen';
        document.querySelector('.app-container').appendChild(screen);
    }
    pushNavHistory();
    _skillLibTab = 'all';
    _skillLibDimFilter = null;
    screen.innerHTML = `
        <div class="skill-library-view">
            <div class="skill-detail-header">
                <button class="session-detail-back" onclick="goBack()">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="13 4 7 10 13 16"/>
                    </svg>
                    back
                </button>
                <span class="skill-lib-count">${DATA.skills.length} skills</span>
            </div>
            <div class="skill-lib-sticky">
                <div class="skill-lib-search-wrapper">
                    <svg class="skill-lib-search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                        <circle cx="7" cy="7" r="5"/><line x1="11" y1="11" x2="14" y2="14"/>
                    </svg>
                    <input type="text"
                           class="skill-lib-search"
                           id="skill-lib-search-input"
                           placeholder="Search skills…"
                           autocomplete="off"
                           oninput="updateSkillLibResults()" />
                    <button class="skill-lib-search-clear" id="skill-lib-clear"
                            style="display:none"
                            onclick="document.getElementById('skill-lib-search-input').value=''; updateSkillLibResults();">×</button>
                </div>
                <div class="skill-lib-tabs">
                    <button class="skill-lib-tab active" data-tab="all"
                            onclick="setSkillLibTab(this, 'all')">All skills</button>
                    <button class="skill-lib-tab" data-tab="my"
                            onclick="setSkillLibTab(this, 'my')">Skills I've recorded</button>
                    <button class="skill-lib-tab" data-tab="category"
                            onclick="setSkillLibTab(this, 'category')">By category</button>
                </div>
            </div>
            <div class="skill-lib-body" id="skill-lib-body"></div>
            <div style="height: 120px;"></div>
        </div>
    `;
    updateSkillLibResults();
    showScreen('skill-library-screen');
}

// Tracks current tab without touching the DOM
let _skillLibTab = 'all';
let _skillLibDimFilter = null; // Filter by dimension (e.g. 'centre', 'barre')

function setSkillLibTab(btn, tab) {
    _skillLibTab = tab;
    document.querySelectorAll('.skill-lib-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateSkillLibResults();
}

function filterSkillsByDimension(dimensionId) {
    _skillLibDimFilter = dimensionId;
    _skillLibTab = 'all'; // Reset to all skills
    // Clear search
    const searchInput = document.getElementById('skill-lib-search-input');
    if (searchInput) searchInput.value = '';
}

function updateSkillLibResults() {
    const input = document.getElementById('skill-lib-search-input');
    const body  = document.getElementById('skill-lib-body');
    const clearBtn = document.getElementById('skill-lib-clear');
    const searchWrapper = document.querySelector('.skill-lib-search-wrapper');
    if (!body) return;

    if (_skillLibTab === 'category') {
        if (searchWrapper) searchWrapper.style.display = 'none';
        if (clearBtn) clearBtn.style.display = 'none';
        body.innerHTML = `<div style="display:flex;flex-direction:column;gap:var(--sp-sm);padding:var(--sp-lg) 0;">` +
            DATA.skillCategories.map(cat => {
                const isBarre = cat.id === 'barre';
                if (isBarre) {
                    return `<div class="skill-category-card" onclick="${cat.onclick}">
                        <div class="skill-category-icon">${ICONS.get(cat.icon, 24)}</div>
                        <div class="skill-category-info">
                            <div class="skill-category-name">${cat.name}</div>
                            <div class="skill-category-count">${cat.count}</div>
                        </div>
                    </div>`;
                } else {
                    return `<div class="skill-category-card skill-category-card--muted">
                        <div class="skill-category-icon">${ICONS.get(cat.icon, 24)}</div>
                        <div class="skill-category-info">
                            <div class="skill-category-name">${cat.name}</div>
                            <div class="skill-category-count">${cat.count}</div>
                        </div>
                    </div>`;
                }
            }).join('') +
        `</div>`;
        return;
    }

    if (searchWrapper) searchWrapper.style.display = '';

    const query = input?.value || '';
    const q = normaliseStr(query.trim());

    if (clearBtn) clearBtn.style.display = q ? 'block' : 'none';

    const userSkills = appState.skills;
    let filtered = DATA.skills.filter(ref => {
        if (appState.hidePointe && ref.dimensionIds && ref.dimensionIds.includes('pointe')) return false;
        // Filter by dimension if set
        if (_skillLibDimFilter && DATA.categoryNames[ref.categoryId] !== _skillLibDimFilter) {
            return false;
        }
        if (_skillLibTab === 'my') {
            const user = userSkills.find(s => s.id === ref.id);
            return user?.flagged || user?.tracked;
        }
        if (!q) return true;
        return (
            normaliseStr(ref.french).includes(q) ||
            normaliseStr(ref.english).includes(q) ||
            (ref.aliases || []).some(a => normaliseStr(a).includes(q))
        );
    });

    filtered = [...filtered].sort((a, b) => {
        const dDiff = (DIFFICULTY_ORDER[a.difficulty] || 0) - (DIFFICULTY_ORDER[b.difficulty] || 0);
        if (dDiff !== 0) return dDiff;
        return a.french.localeCompare(b.french);
    });

    const categories = {};
    filtered.forEach(ref => {
        if (!categories[ref.categoryId]) categories[ref.categoryId] = [];
        categories[ref.categoryId].push(ref);
    });

    const categoryOrder = ['barre', 'centre', 'turns', 'allegro', 'artistry', 'body-and-technique'];
    const sortedCategories = Object.keys(categories).sort((a, b) => {
        const ai = categoryOrder.indexOf(a);
        const bi = categoryOrder.indexOf(b);
        if (ai === -1 && bi === -1) return a.localeCompare(b);
        if (ai === -1) return 1;
        if (bi === -1) return -1;
        return ai - bi;
    });

    if (sortedCategories.length === 0) {
        body.innerHTML = `<div class="barre-empty-state">
            <div class="barre-empty-title">No skills found</div>
            <div class="barre-empty-text">Try a different search term.</div>
        </div>`;
        return;
    }

    body.innerHTML = sortedCategories.map(cat => `
        <div class="skill-lib-category">
            <h2 class="skill-lib-category-title">${DATA.categoryNames[cat] || cat}</h2>
            <div class="skill-lib-cards">
                ${categories[cat].map(ref => renderSkillLibCard(ref, q)).join('')}
            </div>
        </div>
    `).join('');
}

function renderSkillLibrary(query, activeTab) {
    // Legacy compatibility shim — redirects to new approach
    _skillLibTab = activeTab || 'all';
    updateSkillLibResults();
}

function renderSkillLibCard(ref, query) {
    const user = appState.skills.find(s => s.id === ref.id);
    const isFlagged = user?.flagged || false;
    const hasNotes = (appState.skillNotes || []).some(n => n.skillId === ref.id);
    const correctionCount = appState.corrections.filter(c => c.skillId === ref.id).length;

    // Highlight matching text
    const displayName = query ? highlightMatch(ref.french, query) : ref.french;
    const displayEnglish = query ? highlightMatch(ref.english, query) : ref.english;

    return `
        <div class="glossary-term-row glossary-term-skill" onclick="showSkillKnowledgePage('${ref.id}', 'skill-library-screen')">
            <div class="glossary-term-main">
                <span class="glossary-term-name">${displayName}</span>
                ${query && ref.english ? `<span class="glossary-term-alt">${displayEnglish}</span>` : ''}
                ${correctionCount > 0 ? `<span class="skill-lib-inline-count"><span class="skill-lib-indicator-count">${correctionCount}</span></span>` : ''}
            </div>
            <div class="glossary-term-meta">
                <span class="glossary-term-category">${DATA.categoryNames[ref.categoryId] || ''}</span>
                ${isFlagged ? `<span class="skill-lib-indicator" title="In focus">${ICONS.get('flag', 10)}</span>` : ''}
                ${hasNotes ? `<span class="skill-lib-indicator" title="Has notes">${ICONS.get('edit', 10)}</span>` : ''}
                <!-- TODO: decide whether to reinstate skill level badge (difficulty-badge) permanently -->
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><polyline points="4 2 8 6 4 10"/></svg>
            </div>
        </div>
    `;
}

function highlightMatch(text, query) {
    if (!query) return text;
    const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(re, '<mark class="search-highlight">$1</mark>');
}


/* ═══════════════════════════════════════════════════════════════
   SKILL KNOWLEDGE PAGE (Learn tab)
   Reference view. Tapping "my [skill] →" opens personal view.
   ═══════════════════════════════════════════════════════════════ */

// Knowledge content — stub data for the 15 current skills.
// Replace with full content as the skill library grows.
const SKILL_KNOWLEDGE = {
    'plie': {
        description: 'The plié (bend) is the most fundamental movement in ballet. Every class begins and ends with pliés. A demi-plié bends the knees while heels stay on the floor; a grand plié takes the bend to its fullest extent.',
        keyCues: ['Knees track directly over the toes', 'Maintain turnout throughout', 'Keep the torso upright — don\'t let the hips tuck under', 'In grand plié, heels rise only when necessary (in 1st, 2nd they stay down)'],
        musicality: 'Typically performed in slow 4/4 or 3/4 time. The descent follows the musical phrase down; the rise follows it back up. Breathe with the movement.',
        commonCorrections: ['Don\'t let the knees roll inward', 'Keep the weight even across the whole foot', 'Don\'t grip the barre — use it lightly for balance only'],
        muscles: ['Quadriceps (lowering and controlling)', 'Glutes and hip rotators (maintaining turnout)', 'Core (maintaining posture)'],
        muscleContext: 'The quadriceps control the descent eccentrically — they lengthen under load rather than shorten, which is why pliés build strength differently from a squat. The glutes and external hip rotators work constantly to maintain turnout against gravity. Core engagement keeps the pelvis neutral and prevents the lower back from compensating.',
        buildsOn: [],
        leadsTo: ['tendu', 'fondu', 'pirouette'],
    },
    'tendu': {
        description: 'Battement tendu — a stretched beating movement. The working foot slides out from fifth or first position until it is fully pointed on the floor, then returns. The foundation of all extensions and jumps.',
        keyCues: ['Brush the floor fully — the foot articulates through the arch', 'Maintain turnout in both legs', 'Don\'t let the hip lift as the leg extends', 'Return with the same control as you extend'],
        musicality: 'Often 2/4 or 4/4. Each tendu takes one or two counts. In combinations, tendus create the rhythm of the phrase.',
        commonCorrections: ['Keep the standing hip down', 'Don\'t sickle the foot', 'Maintain the heel forward in the working leg'],
        muscles: ['Foot intrinsics and calf (pointing)', 'Hip flexors and extensors (extending and returning)', 'Core and standing-leg glute (stability)'],
        muscleContext: 'The intrinsic foot muscles and calf work together to create a fully articulated point — toe, ball, arch, heel in sequence. The hip flexors initiate the extension while the extensors control its range. On the standing side, the glute and core stabilise the pelvis so the hip doesn\'t hike as the working leg extends.',
        buildsOn: ['plie'],
        leadsTo: ['degage', 'grand-battement', 'arabesque'],
    },
    'pirouette': {
        description: 'A turn on one leg. The working leg is held in retiré (passé) position — foot at the knee of the supporting leg — while the body rotates. Pirouettes can be done en dehors (turning outward) or en dedans (turning inward).',
        keyCues: ['The preparation (plié) determines the turn — don\'t rush it', 'Spot a fixed point and whip the head quickly', 'Pull up through the supporting leg before initiating', 'Keep the working foot firmly at the knee — don\'t let it slide down'],
        musicality: 'Usually initiated on a strong beat. Single pirouettes typically take one count; multiples occupy a phrase. The landing should land on the music, not after it.',
        commonCorrections: ['Spot earlier — the head should lead, not follow', 'Don\'t lean forward on the supporting leg', 'Keep the arms firmly in position — don\'t let them open out'],
        muscles: ['Calves and foot intrinsics (relevé on supporting leg)', 'Core (maintaining axis)', 'Hip rotators (holding retiré)', 'Neck and eyes (spotting)'],
        muscleContext: 'The calf and foot must be strong enough to balance on a single relevé while the body rotates — this is often the limiting factor in multiple turns. The core provides the vertical axis; any collapse or lean causes the turn to spiral off. The hip rotators hold the retiré position against centrifugal force. The sternocleidomastoid and eye muscles coordinate spotting — which is partly a vestibular reflex that can be trained.',
        buildsOn: ['plie', 'tendu', 'degage'],
        leadsTo: ['fouette', 'manege'],
    },
    'arabesque': {
        description: 'A position in which the body is supported on one leg, with the other leg extended behind at 90° or higher. One of the defining images of classical ballet — the arabesque demands balance, flexibility, and a long line through the back.',
        keyCues: ['Lift from the front of the hip, not the lower back', 'Keep the pelvis level — don\'t tilt', 'Extend through the crown of the head and through the pointed foot simultaneously', 'Maintain the épaulement (shoulder placement) appropriate to the arabesque number'],
        musicality: 'Often held for a full phrase or used as the ending position of an adagio sequence. The quality should be sustained and musical, not static.',
        commonCorrections: ['Don\'t tilt the pelvis — height comes from the hip, not the back', 'Keep the standing hip over the standing foot', 'Don\'t let the supporting shoulder drop'],
        muscles: ['Glutes and hamstrings (lifting the back leg)', 'Spinal extensors (maintaining the back line)', 'Hip flexors of the standing leg (balance)', 'Core (stabilisation)'],
        muscleContext: 'The glutes and hamstrings of the working leg extend the hip to lift it behind. Critically, the spinal extensors must work without compressing the lumbar spine — height comes from hip extension, not back arch. On the standing side, the hip flexors work isometrically to prevent the pelvis from posteriorly tilting. Core engagement ties both sides together into a single long line.',
        buildsOn: ['tendu', 'developpe'],
        leadsTo: ['attitude', 'grand-jete'],
    },
    'degage': {
        description: 'Battement dégagé (also called battement jeté) — a brushing movement where the working foot leaves the floor to a low open position, typically 25–45°. Built directly on the tendu, dégagé develops the speed, precision of attack, and sharpness needed for allegro.',
        keyCues: ['Brush through the floor as in tendu before the foot leaves it', 'The foot must be fully pointed in the air — not half-pointed', 'Keep the standing leg strong and completely still', 'Return through the floor with control — don\'t drop the foot back'],
        musicality: 'Typically faster than tendu — one beat per dégagé is common. The sharpness of the brush determines musical clarity. In allegro sequences, dégagés set the rhythm of the phrase.',
        commonCorrections: ['Don\'t release the foot before it brushes back to the floor', 'Don\'t let the working hip lift', 'Keep the height low — this is a small, precise movement, not a kick'],
        muscles: ['Foot intrinsics and calf (articulation and pointing)', 'Hip flexors and extensors (fast extension)', 'Core and standing glute (stability)'],
        muscleContext: 'The foot action is identical to tendu but at greater speed. Any core instability shows immediately as a hip hike or weight shift on the standing side.',
        buildsOn: ['plie', 'tendu'],
        leadsTo: ['frappe', 'grand-battement', 'pirouette'],
    },
    'rond-de-jambe': {
        description: 'Battement rond de jambe — a circular movement of the leg tracing a semicircle on the floor (à terre) or in the air (en l\'air). Develops hip mobility, coordination, and the ability to maintain turnout through a full range of motion.',
        keyCues: ['The circle passes through first position at the front (en dehors) or back (en dedans)', 'Keep the working foot pointed throughout the arc', 'The standing hip must not move — only the working leg circles', 'In the air: maintain the same height throughout the full arc'],
        musicality: 'Often performed in 3/4, one full circle per bar. The movement should flow continuously — no hesitation at the front or back. In adagio the arc is slow and sustained; in faster tempi it becomes a sweeping brush.',
        commonCorrections: ['Don\'t let the working hip swivel — keep it square', 'Keep the foot close to the floor in à terre', 'Don\'t rush through the back — it is as important as the front'],
        muscles: ['Hip flexors (forward)', 'Hip extensors and glutes (backward)', 'Hip rotators (maintaining turnout throughout)', 'Core (stabilising the pelvis)'],
        muscleContext: 'Rond de jambe challenges the hip rotators more than almost any other barre exercise — they must hold turnout while the leg moves through every angle. This is why it appears early in barre: it warms the hip joint and builds the control needed for centre work.',
        buildsOn: ['plie', 'tendu', 'degage'],
        leadsTo: ['developpe', 'arabesque', 'attitude'],
    },
    'frappe': {
        description: 'Battement frappé — a striking movement in which the foot wraps to the ankle before extending sharply to a low position. Develops the quick, strong foot action required for allegro and pointe work.',
        keyCues: ['The foot wraps to the ankle (cou-de-pied) before striking out', 'The extension is fast and sharp — initiated from the ankle, not the hip', 'The working foot is flexed on the way in, pointed on the way out', 'Keep the standing leg absolutely still'],
        musicality: 'Frappé is inherently percussive — the accent is on the outward extension. Typically 2/4 or 4/4. The sharpness of each beat should match the musical accent.',
        commonCorrections: ['Don\'t lead with the knee — the ankle and foot initiate the movement', 'Don\'t let the foot relax when it returns to cou-de-pied', 'Keep the height low and consistent'],
        muscles: ['Tibialis anterior (flexion before strike)', 'Foot intrinsics and calf (sharp point on extension)', 'Hip flexors and extensors (direction of strike)', 'Standing stabilisers (keeping still)'],
        muscleContext: 'Frappé trains the neuromuscular speed of the foot — the quickness of alternating between flex and point. This translates directly to allegro: every small jump requires a similar fast foot action from the floor.',
        buildsOn: ['tendu', 'degage'],
        leadsTo: ['grand-battement', 'entrechat', 'brise'],
    },
    'fondu': {
        description: 'Battement fondu — a melting movement in which both legs bend simultaneously and then unfold to full extension. The standing leg plié and the working leg draw-in happen at the same time; the extension unfolds from there. The most lyrical barre exercise — fondu develops the smooth quality essential for adagio.',
        keyCues: ['Both legs move at the same time — the bend and the draw-in are simultaneous', 'The extension unfolds from cou-de-pied — it should grow, not arrive', 'The standing leg returns to full extension as the working leg reaches full length', 'No stopping at the bottom or at the extension — the movement is continuous'],
        musicality: 'Typically slow and legato, each full fondu taking two beats. The quality should feel like water flowing — continuous and uninterrupted. The music leads the melting quality throughout the whole body.',
        commonCorrections: ['Don\'t straighten the standing leg before the working leg extends — they move together', 'Don\'t rush the extension — allow the leg to unfold from the ankle, through the knee', 'Keep the working foot pointed throughout'],
        muscles: ['Quadriceps and glutes (controlled descent)', 'Hip flexors (drawing the working leg in)', 'Hip extensors and flexors (unfolding the extension)', 'Core (upright posture through the bend)'],
        muscleContext: 'Fondu demands coordination between both legs simultaneously — neither can rush the other. The simultaneous unfold requires both legs to straighten together, which is harder than it appears at slow tempo.',
        buildsOn: ['plie', 'tendu', 'retire'],
        leadsTo: ['developpe', 'arabesque', 'grand-jete'],
    },
    'developpe': {
        description: 'Développé — an unfolding of the working leg from retiré to a high extension. The leg draws up through retiré, opens through attitude, and extends fully in the air. The foundation of adagio and the primary vehicle for showing line and height.',
        keyCues: ['Draw the foot up the leg to retiré first — don\'t lift the knee directly', 'The knee opens before the leg extends — the unfolding is sequential', 'Keep the working hip from hiking — height comes from strength, not tilting', 'Hold the fully extended position with control before lowering'],
        musicality: 'The slowest exercise in class, often in slow 4/4 or 6/8. Each développé takes at least four counts. The sustained quality should be audible in the movement — a développé that arrives rather than unfolds is missing the musicality.',
        commonCorrections: ['Don\'t let the working hip hike for height — level hips, even if the leg is lower', 'Don\'t rush the retiré stage — it determines the quality of the extension', 'Keep the standing leg fully extended throughout'],
        muscles: ['Hip flexors (drawing up and extending forward)', 'Glutes and hamstrings (extending behind)', 'Hip rotators (maintaining turnout throughout)', 'Core (keeping the pelvis stable at height)'],
        muscleContext: 'Développé tests hip flexor strength at end range — the psoas must support the full weight of the leg extended in the air. This is different from the passive flexibility needed for the splits. The core prevents the pelvis from tilting as the leg rises.',
        buildsOn: ['plie', 'retire', 'fondu'],
        leadsTo: ['arabesque', 'grand-battement', 'grand-jete'],
    },
    'grand-battement': {
        description: 'Grand battement — a large beating movement in which the working leg is thrown to full height and returns with control. The most dynamic barre exercise — it builds strength, range, and the explosive quality needed for grand allegro.',
        keyCues: ['Brush through the floor to full point before the leg leaves — it is a large dégagé', 'The throw comes from the hip, not the knee', 'Control the descent — the leg returns as slowly as the music allows', 'Keep the standing leg straight and the hip over the foot'],
        musicality: 'The leg throws on the musical accent — in 4/4, typically beat 1 or 3. The return should be controlled and musical, not dropped. In faster tempi, grand battements become preparation for grand jeté.',
        commonCorrections: ['Don\'t let the standing hip move — if it shifts, the leg is beyond what the body can currently support', 'Don\'t lead with the knee on the way up', 'Don\'t drop the foot back — brush it through with control'],
        muscles: ['Hip flexors, glutes and hamstrings (the throw)', 'Core and standing glute (resisting the force)', 'Quadriceps (controlling the descent)'],
        muscleContext: 'Grand battement produces significant torque at the standing hip — the core and glute must resist to keep the pelvis level. The working leg\'s hip flexors initiate; the extensors control the return eccentrically.',
        buildsOn: ['tendu', 'degage', 'developpe'],
        leadsTo: ['arabesque', 'grand-jete', 'manege'],
    },
    'attitude': {
        description: 'A position on one leg with the working leg lifted behind (or devant) with the knee bent to approximately 90°. Related to arabesque but with the characteristic bent-knee silhouette. Associated with the statue of Mercury — elongated, suspended, and elegant.',
        keyCues: ['The knee of the working leg is bent but the thigh is lifted — not dropped', 'Keep the knee at or above hip height when working behind', 'The working hip stays open — it must not close forward', 'Arm and épaulement frame the position; the body curves toward the working side'],
        musicality: 'Often used as a sustained position in adagio or as a pass-through shape in allegro. When held, it requires the same active, intentional quality as arabesque. In jumps, the shape must form quickly and clearly.',
        commonCorrections: ['Don\'t let the working knee drop below hip level', 'Keep the working hip open — attitude is not passé at hip height', 'Don\'t round the back — lift through the spine'],
        muscles: ['Glutes and hip extensors (lifting behind)', 'Hip rotators (keeping the working hip open)', 'Spinal extensors (the back line)', 'Core (balance)'],
        muscleContext: 'Attitude requires the same glute and hip extensor strength as arabesque, plus the knee flexors (hamstrings) to hold the bent shape. The hip rotators work harder because the shorter lever arm makes it easier for the hip to close.',
        buildsOn: ['arabesque', 'developpe'],
        leadsTo: ['arabesque', 'grand-jete'],
    },
    'releve': {
        description: 'Relevé — a rise to the balls of the feet (demi-pointe) from flat. One of the most fundamental actions in ballet — it appears in turns, allegro landings, and as a standalone exercise for building foot and calf strength.',
        keyCues: ['Rise through the whole foot — don\'t skip from flat to high demi-pointe', 'Weight over the big-toe joint, not rolling to the outside', 'The standing leg stays fully extended — don\'t let the knee soften at the top', 'Lower with the same control as you rise'],
        musicality: 'In barre, relevé often marks the musical accent. In centre and allegro, it is continuous and barely perceptible as a separate action. The height of relevé should be consistent regardless of tempo.',
        commonCorrections: ['Don\'t roll to the outside of the foot', 'Don\'t sickle at the top', 'Don\'t drop the heels quickly — lower with control'],
        muscles: ['Gastrocnemius and soleus (the rise)', 'Tibialis posterior and peroneals (alignment)', 'Foot intrinsics (supporting the arch at height)', 'Core (maintaining upright alignment)'],
        muscleContext: 'The gastrocnemius and soleus are the primary movers, but the intrinsic foot muscles and peroneals determine whether the relevé is stable. Rolling out usually indicates weakness in tibialis posterior and the toe flexors.',
        buildsOn: ['plie'],
        leadsTo: ['pirouette', 'retire', 'releve-pointe'],
    },
    'eleve': {
        description: 'Élevé — a rise to demi-pointe from a straight leg, without the preceding plié that defines relevé. Élevé demands that the calves lift the body from straight, with no momentum from a plié. Often used at the opening of barre.',
        keyCues: ['No plié before — lift directly from straight legs', 'Weight travels upward, not forward', 'Keep both heels equally weighted in two-legged élevé', 'Lower as slowly as you rose'],
        musicality: 'In exercises, élevé often occurs on the upbeat or as a preparation. The steadiness of the rise should reflect the steadiness of the musical pulse.',
        commonCorrections: ['Don\'t bend the knees before rising — that becomes relevé', 'Keep the torso absolutely still — only the feet and legs move', 'Don\'t let the heels drift unevenly'],
        muscles: ['Gastrocnemius and soleus (pure concentric lift without elastic energy)', 'Foot intrinsics (arch support)', 'Core and back (stillness)'],
        muscleContext: 'Without a plié, the calves cannot use the elastic energy stored in the Achilles tendon. This makes élevé a true strength exercise — the gastrocnemius and soleus must generate force concentrically from a stretched position.',
        buildsOn: ['plie'],
        leadsTo: ['releve', 'releve-pointe'],
    },
    'retire': {
        description: 'Retiré — the position in which the working foot is lifted to the knee of the standing leg. It is the held shape used in pirouettes and as a transition between extensions. When the foot passes through this position rather than stopping, it is called passé.',
        keyCues: ['Working foot touches at the knee — not the calf, not above the knee', 'Turnout maintained in the working hip — don\'t let the knee drop forward', 'Standing leg fully extended and strong', 'Working hip must not be higher than the standing hip'],
        musicality: 'Retiré is a position that can be held for any duration. In pirouettes it is sustained through the turn; in fondu and développé it is a transitional moment. Time spent in retiré is musical time — active and intentional, not waiting.',
        commonCorrections: ['Don\'t let the working hip hike', 'Don\'t let the working knee drop forward — keep it open', 'Keep the standing knee straight'],
        muscles: ['Hip flexors (lifting the working leg)', 'External hip rotators (keeping the working knee open)', 'Calves and foot (supporting relevé when combined)', 'Core (balance)'],
        muscleContext: 'The hip flexors must lift the working leg while the external rotators hold it open — both must work simultaneously. This combination of hip flexion and external rotation under load is a significant strength demand, especially in pirouettes where it must be held through rotation.',
        buildsOn: ['plie', 'releve'],
        leadsTo: ['pirouette', 'developpe', 'fondu'],
    },
    'passe': {
        description: 'Passé — the action of passing the working foot through retiré position as the leg moves from one extended position to another. The foot passes by the knee rather than stopping there. Passé is the action; retiré is the position it passes through.',
        keyCues: ['The foot passes close to the standing leg — don\'t let it swing wide', 'Maintain turnout throughout the pass', 'The foot should be pointed as it passes the ankle and knee', 'The transition should be controlled, not rushed'],
        musicality: 'In class, passé often happens between counts — it is the connective tissue of the phrase. The smoother the passé, the more musical the overall movement.',
        commonCorrections: ['Don\'t let the foot sickle as it passes the ankle', 'Don\'t rush through passé — the transition is part of the exercise', 'Keep the standing hip stable'],
        muscles: ['Hip flexors (initiating the lift)', 'Adductors (drawing the leg in close)', 'Hip rotators (maintaining turnout)'],
        muscleContext: 'Passé requires coordinated hip flexion and adduction — the leg must come in close to the standing leg rather than staying wide. This is often where turnout is lost: the adductors pull the leg in but the rotators must work simultaneously to keep the knee open.',
        buildsOn: ['retire', 'releve'],
        leadsTo: ['pirouette', 'developpe'],
    },
    'coupe': {
        description: 'Coupé — a cutting movement in which one foot replaces the other at the ankle. A small, precise transitional step that appears constantly in allegro sequences and as a preparation for jumps and turns.',
        keyCues: ['The replacing foot arrives at the ankle — not above or below', 'The cut is quick and decisive, not gradual', 'The body remains upright through the transition', 'Maintain turnout in both legs throughout'],
        musicality: 'Coupé is inherently rhythmic — it often falls on an off-beat or acts as an upbeat preparation. In allegro, coupés create the rhythmic energy of a phrase. The precision of the cut determines the clarity of the overall sequence.',
        commonCorrections: ['Don\'t let coupé become a small plié instead of a cut', 'Keep the foot pointed and close — don\'t let it swing wide', 'Don\'t collapse the standing side as the cut happens'],
        muscles: ['Foot intrinsics (precise placement)', 'Hip flexors (quick lift)', 'Calves (pushing through the floor)'],
        muscleContext: 'Though small, coupé requires precise timing and coordination between both legs. In allegro it is often done at speed, so the neuromuscular control of the foot placement must be automatic.',
        buildsOn: ['plie', 'tendu', 'releve'],
        leadsTo: ['pas-de-bourree', 'pirouette', 'grand-jete'],
    },
    'balance': {
        description: 'Balancé — a rocking, waltz-like step that shifts weight from foot to foot in a three-count pattern. One of the most musical steps in ballet — its quality comes almost entirely from how it responds to the music rather than from technical precision.',
        keyCues: ['Let the body rock naturally — the weight shift is real, not pretended', 'The first count (the accent) is slightly longer or softer than counts two and three', 'Arms and head move with the body, not independently', 'Keep the feet close together on the half-beats'],
        musicality: 'Balancé maps directly to a waltz: STEP-two-three, STEP-two-three. The accent lands on count 1. The quality of the balancé comes from listening to the musical phrase and letting the body respond — not from counting mechanically.',
        commonCorrections: ['Don\'t make all three steps the same size and weight — the rhythm is uneven', 'Don\'t stop between repetitions — balancé flows continuously', 'Keep the knees soft — this is a rocking movement, not a sharp step'],
        muscles: ['Hip flexors and extensors (the step)', 'Calves and foot (the rise on counts 2 and 3)', 'Core (balance while shifting weight)'],
        muscleContext: 'The weight shift in balancé requires real commitment of the body\'s mass — this is not a sway. The rise on counts 2 and 3 demands ankle stability on a single leg, briefly but repeatedly.',
        buildsOn: ['plie', 'releve', 'tendu'],
        leadsTo: ['pas-de-bourree', 'grand-jete'],
    },
    'port-de-bras': {
        description: 'Port de bras — the carriage of the arms. In class it refers to sequences of arm movements that develop upper body coordination, épaulement, and musical sensitivity. Port de bras is one of the most revealing exercises in ballet: technical errors that hide in fast steps are visible in slow, open arm movements.',
        keyCues: ['Arms move from the shoulder, not the wrist or elbow', 'The wrist and fingers lead the shape — they give the arms their visual quality', 'Eyes and head are part of the movement — never separated from the arms', 'In cambré (a bend of the torso), the spine moves continuously, not in sections'],
        musicality: 'Typically slow and legato. The arms follow the musical phrase rather than mark individual counts. The quality — soft, expansive, or precise — should match the character of the music.',
        commonCorrections: ['Don\'t let the elbows drop below the wrist — the arm loses its line', 'Don\'t tense the shoulders — the arms are heavy, not held', 'Don\'t move the head late — it should initiate with or before the arms, not follow as an afterthought'],
        muscles: ['Deltoids and rotator cuff (shaping and lifting)', 'Serratus anterior (keeping shoulder blades on the back)', 'Neck and upper spine (head and épaulement)', 'Core (supporting a cambré without collapsing)'],
        muscleContext: 'Good port de bras requires serratus anterior strength to keep the shoulder blade on the ribcage — without it, the shoulder wings and the arm loses its line. In cambré, the spinal extensors and abdominals must work together to create a smooth arc without hinging at one point.',
        buildsOn: [],
        leadsTo: ['arabesque', 'attitude', 'pirouette'],
    },
    'pas-de-bourree': {
        description: 'Pas de bourrée — a quick sequence of three weight-transferring steps that changes feet and direction. It appears in nearly every ballet combination: as a transition, a preparation, and sometimes a featured step in its own right.',
        keyCues: ['Each of the three steps is light and distinct — not blurred together', 'Travel in the intended direction — the steps are not just weight shifts in place', 'Maintain turnout throughout all three steps', 'Keep the steps small and under the body'],
        musicality: 'Pas de bourrée typically occupies two counts or one bar of 3/4. In 4/4 it often falls on an off-beat, acting as a preparation. The lightness and speed of the three steps should match the lightness of the music.',
        commonCorrections: ['Don\'t let the steps get too wide — they should stay close to the midline', 'Don\'t lose direction — the bourrée should travel, not mark time', 'Keep the feet articulate — even small steps should show footwork'],
        muscles: ['Calves and foot (three small rises)', 'Hip flexors (quick transfers)', 'Core (controlling the path of travel)'],
        muscleContext: 'The rapid weight transfers demand coordination between both calves and both hip flexors in quick succession. Ankle stability for three small relevés in a row is significant and often a limiting factor in allegro readiness.',
        buildsOn: ['plie', 'releve', 'coupe'],
        leadsTo: ['pirouette', 'grand-jete', 'manege'],
    },
    'fouette': {
        description: 'Fouetté en tournant — a turning step in which the working leg whips outward and returns to retiré to drive each rotation. Most associated with the 32 consecutive fouettés of the Black Swan variation — one of ballet\'s most recognised technical displays.',
        keyCues: ['The whip of the working leg drives the turn — it must reach full extension and close sharply', 'The supporting relevé must be high and stable throughout each turn', 'The arms hold their position — they must not open or collapse between turns', 'Spot on the same point for every turn'],
        musicality: 'In combination, fouettés occupy one count each. The whip of the working leg matches the musical accent. In 32 consecutive fouettés, the evenness of the timing becomes a musical feature.',
        commonCorrections: ['Don\'t let the working leg swing wide without control — the whip must be sharp', 'Don\'t let the supporting relevé lower between turns', 'Keep the arms from opening on each turn — it dissipates momentum'],
        muscles: ['Hip flexors and extensors (the whipping action)', 'Calf and foot (sustained relevé)', 'Core (maintaining the axis)', 'Arms and shoulders (holding position)'],
        muscleContext: 'The calf must sustain a high demi-pointe across many consecutive turns — this is endurance, not just strength. Each additional turn demands the calf hold longer and the core maintain a tighter axis.',
        buildsOn: ['pirouette', 'grand-battement', 'degage'],
        leadsTo: ['manege'],
    },
    'grand-jete': {
        description: 'Grand jeté — a large jump from one leg to the other with the legs split in the air. One of the most visually spectacular movements in ballet — the combination of elevation, split position, and controlled landing demands power, flexibility, and timing.',
        keyCues: ['The front leg kicks forward and up first — the back leg extends behind to match', 'The split should happen at the peak of the jump, not during the ascent', 'The arms and upper body actively lift to help the body rise', 'Land on the front leg in a controlled plié — toe, ball, heel'],
        musicality: 'Grand jeté is almost always on the musical accent — the exclamation point of a phrase. The preparation (chassé or couru) happens before the beat; the jump is on it. The suspension at the peak is the image the audience sees.',
        commonCorrections: ['Don\'t look down or let the head drop during the jump', 'Don\'t let the back leg lag — both legs must reach their positions simultaneously at the peak', 'Land through the foot — not flat'],
        muscles: ['Quadriceps and glutes (the push-off)', 'Hip flexors (lifting the front leg)', 'Hamstrings and glutes (extending the back leg)', 'Core (holding the split shape in the air)'],
        muscleContext: 'The push-off requires explosive force from the standing leg — power, not just strength. The hip flexors must lift the front leg rapidly while the hamstrings and glutes extend the back leg simultaneously. The core connects both halves of the split without allowing the pelvis to tilt.',
        buildsOn: ['grand-battement', 'developpe', 'fondu'],
        leadsTo: ['manege'],
    },
    'manege': {
        description: 'Manège — a sequence of travelling steps or turns performed in a circle around the stage. Rather than a single step, manège refers to the pattern of travel. It is one of the most dramatic features of grand allegro and showcases stamina, size, and spatial command.',
        keyCues: ['Track the circle accurately — don\'t cut corners or drift inward', 'Maintain consistent height and quality through every repetition', 'The body stays upright — don\'t lean into the circle', 'Spot into the direction of travel, not ahead of it'],
        musicality: 'Manège typically travels through a full musical phrase — eight, sixteen, or more counts. Size and energy should match the music\'s arc: building toward the climax and landing with it.',
        commonCorrections: ['Don\'t lose size as fatigue sets in — the last step should match the first', 'Keep tracking the circle — uneven spacing is immediately visible', 'Don\'t rush — speed without shape loses everything'],
        muscles: ['All major leg muscles (sustaining power over distance)', 'Core (axis through rotation)', 'Cardiovascular (endurance across the full phrase)'],
        muscleContext: 'Manège is as much about stamina as technique — the demands of each individual step compound across the full circle. Fatigue is the technical enemy: it flattens the shape, blurs footwork, and slows the musicality.',
        buildsOn: ['pirouette', 'grand-jete', 'grand-battement'],
        leadsTo: [],
    },
    'chaine': {
        description: 'Chaînés (chaînés déboulés) — a series of rapid half-turns in a straight line or circle, feet closing to first position on each half-turn. One of the first multi-turn sequences a dancer learns — chaînés develop spotting, axis control, and the ability to sustain quality across many rotations.',
        keyCues: ['Step to first position on each half-turn — not second, not wider', 'Spot consistently on a fixed point', 'Keep the body upright — don\'t lean forward or tilt sideways', 'Arms held firmly — they must not swing'],
        musicality: 'Typically fast — one half-turn per count or two per count. The rhythm must be absolutely even; uneven steps create stumbles. Arms help regulate speed: wider arms slow the turns, tighter arms accelerate them.',
        commonCorrections: ['Don\'t let the feet open wider than first — it creates wobble', 'Don\'t let the head lag in spotting — dizziness and drift follow', 'Keep the spine vertical — avoid tilting toward the direction of travel'],
        muscles: ['Calves (rapid relevé on every step)', 'Core (maintaining vertical axis)', 'Neck and eyes (rapid spotting)', 'Hip rotators (closing to first on each half)'],
        muscleContext: 'The speed of chaînés demands that spotting and axis be reflexive. The vestibular system is heavily engaged — experienced dancers develop significant neural adaptation that reduces dizziness across consecutive turns.',
        buildsOn: ['releve', 'pirouette', 'plie'],
        leadsTo: ['manege', 'pirouette'],
    },
    'soutenu': {
        description: 'Soutenu en tournant — a turn in which the feet draw together to fifth on pointe or demi-pointe and the body rotates as a unit. A smooth, sustained turn used at barre and in centre, often as a transition or to finish a phrase.',
        keyCues: ['Draw the feet together to a tight fifth before rotating', 'The turn is a single sustained rotation, not a step-and-spin', 'Both feet remain together throughout the turn', 'Land in fifth with control — don\'t allow the feet to drift apart'],
        musicality: 'Soutenu means "sustained" — the turn should feel slower than it takes. It typically occupies one count and is used on a held note or at the end of a phrase.',
        commonCorrections: ['Don\'t step onto one foot then add the other — both must arrive simultaneously', 'Don\'t rush the rotation — the sustained quality is the point', 'Keep the height of the relevé consistent throughout'],
        muscles: ['Calves (sustained relevé)', 'Core (rotating as a unit)', 'Hip adductors (closing fifth tightly)', 'Hip rotators (maintaining turnout at height)'],
        muscleContext: 'Soutenu demands hip adductor strength to close the feet tightly in relevé. The rotation must come from the core and hips, not from the feet driving — if the feet push, the shape is lost.',
        buildsOn: ['releve', 'plie'],
        leadsTo: ['pirouette', 'chaine'],
    },
    'pique-turn': {
        description: 'Piqué turn (piqué en tournant) — a turn in which the dancer steps directly onto a straight leg in relevé and completes one or more rotations in retiré. The step itself drives the turn — unlike pirouette, there is no preparatory plié.',
        keyCues: ['Step onto a fully extended leg — no bending on arrival', 'The working leg closes immediately to retiré', 'Spot firmly — piqué turns travel, so the spot must also travel with you', 'Keep the turn level — don\'t tilt toward the direction of travel'],
        musicality: 'Piqué turns are often performed in sequences, one per beat. Each landing is on the musical accent. In long sequences, the evenness of the steps creates the musical pattern.',
        commonCorrections: ['Don\'t plié onto the supporting leg — it must be straight on arrival', 'Don\'t let the working leg drop before closing to retiré', 'Don\'t drift off the line of travel'],
        muscles: ['Calf of the supporting leg (direct step onto relevé)', 'Hip flexors (closing quickly to retiré)', 'Core (axis and upright posture)', 'Eyes and neck (spotting while travelling)'],
        muscleContext: 'Stepping directly onto relevé without a preparatory plié demands immediate concentric calf force on contact. Unlike pirouette, there is no stored elastic energy from a plié to assist the rise.',
        buildsOn: ['pirouette', 'releve', 'retire'],
        leadsTo: ['manege', 'pirouette'],
    },
    'detourne': {
        description: 'Détourné — a pivot turn on pointe or demi-pointe to face the opposite direction, feet remaining in fifth. A small, neat turning movement used as a transition or musical accent.',
        keyCues: ['The heels lift together — both legs work simultaneously', 'The body pivots as one unit', 'Keep fifth tightly closed throughout', 'The turn is exactly a half revolution — stop precisely facing the new direction'],
        musicality: 'Détourné typically takes one count and lands on the following beat. Often used to change direction smoothly within a phrase.',
        commonCorrections: ['Don\'t open fifth before pivoting — the turn happens in fifth', 'Keep the back heel lifted equally — don\'t let one drop before the other', 'Land with both heels down simultaneously'],
        muscles: ['Calves (sustained relevé)', 'Hip adductors (closing fifth)', 'Core (rotating as a unit)'],
        muscleContext: 'Détourné requires both calves to rise simultaneously and maintain equal height through the pivot — any imbalance between feet creates a stumble rather than a smooth turn.',
        buildsOn: ['releve', 'plie'],
        leadsTo: ['pirouette', 'soutenu'],
    },
    'renverse': {
        description: 'Renversé — a complex linking step combining a rond de jambe movement with a cambré and a turn. The body appears to "overturn" — hence the name. An advanced transitional step seen in classical variations and grand allegro.',
        keyCues: ['The rond de jambe of the working leg initiates the movement', 'The cambré happens into the direction of the turn', 'The body recovers through the turn and arrives upright', 'Maintain contact with the floor through the supporting foot\'s relevé'],
        musicality: 'Typically performed across two counts: one for the rond de jambe and cambré, one for the turn and recovery. The overturn quality should feel smooth and expansive, not rushed.',
        commonCorrections: ['Don\'t lean away from the direction of turn in the cambré', 'Don\'t lose the relevé during the turn', 'Recover upright before landing — don\'t arrive in a bent position'],
        muscles: ['Spinal extensors and abdominals (cambré and recovery)', 'Hip flexors and rotators (rond de jambe into the turn)', 'Calves (sustained relevé through the sequence)'],
        muscleContext: 'Renversé demands rapid coordination between the spinal extensors (cambré) and hip rotators (turn). Core strength is essential to recover upright from the cambré without lurching.',
        buildsOn: ['pirouette', 'arabesque', 'rond-de-jambe'],
        leadsTo: [],
    },
    'tour-en-lair': {
        description: 'Tour en l\'air — a jump from two feet in which the body completes one or more full rotations before landing. Single, double, and triple tours are progressively more demanding in terms of power, axis control, and timing.',
        keyCues: ['Jump straight up — height determines the time available for rotation', 'The arms pull in tight to the body to increase rotational speed', 'Spot for single and double tours', 'Land in fifth position plié with control — not open'],
        musicality: 'The jump is prepared on the upbeat; the landing is on the beat. A tour that lands late is unsatisfying musically regardless of technical quality.',
        commonCorrections: ['Don\'t pull the arms in before the feet push off — the jump comes first', 'Land in fifth, not open second', 'Keep the core tight throughout — any collapse stops the rotation'],
        muscles: ['Quadriceps and calves (the jump)', 'Core (rotation and axis)', 'Arms and shoulders (pulling in to accelerate rotation)', 'Hip adductors (closing fifth in the air)'],
        muscleContext: 'Pulling the arms in close to the body reduces the moment of inertia and increases rotational speed — the same principle as a spinning figure skater drawing their arms in. The height of the jump determines whether a double or triple tour is achievable.',
        buildsOn: ['saute', 'pirouette', 'changement'],
        leadsTo: [],
    },
    'saute': {
        description: 'Sauté — a jump from two feet, landing on two feet in the same position. The most basic jump in ballet and the foundation of all allegro work. The jump itself is simple; the quality of the push-off and landing is what matters.',
        keyCues: ['Push through the floor — energy goes downward before it goes up', 'In the air: feet fully pointed and together', 'Land from toe to heel — the foot rolls through the landing', 'The plié on landing absorbs the impact; knees track over the toes'],
        musicality: 'Sauté is typically performed in 4/4, jumping on the beat. The plié happens slightly before the beat, the push-off on it. In combinations, sautés create a rhythmic pattern that should match the musical one.',
        commonCorrections: ['Don\'t jump from flat feet — push through demi-pointe', 'Don\'t land flat — always land through the foot', 'Don\'t let the knees collapse inward on landing'],
        muscles: ['Quadriceps (push-off and landing control)', 'Calves and foot (push-through-foot action)', 'Glutes (maintaining turnout in the air and on landing)', 'Core (body shape in the air)'],
        muscleContext: 'Landing from any jump creates forces several times body weight at the knee. Proper landing mechanics — toe, ball, heel through a controlled plié — distribute force through the eccentric quad contraction rather than concentrating it at the joint.',
        buildsOn: ['plie', 'releve'],
        leadsTo: ['changement', 'echappe', 'entrechat'],
    },
    'changement': {
        description: 'Changement de pieds — a jump from fifth position, changing feet in the air to land with the opposite foot in front. A foundational allegro step and the building block for entrechat and other beaten jumps.',
        keyCues: ['Push through the whole foot, not just the toes', 'Both feet reach a fully pointed position in the air before the change', 'The change of feet is small and quick — not a wide-legged jump', 'Land through the foot in demi-plié with both heels down'],
        musicality: 'Typically one jump per beat. The change of feet must happen clearly in the air — if the feet are slow to change, the jump reads as a sauté. The accent is on the landing.',
        commonCorrections: ['Don\'t open the legs wide in the air — keep them close for the change', 'Both feet must be fully pointed in the air', 'Don\'t rush the landing — control the plié'],
        muscles: ['Quadriceps and calves (jump and landing)', 'Hip adductors (keeping legs close in the air)', 'Foot intrinsics (maintaining point through the change)', 'Core (stable body position)'],
        muscleContext: 'The hip adductors are critical — they keep the legs close enough for a neat change. Weakness shows as a wide, loose jump. The foot intrinsics must maintain the point while the hip muscles are simultaneously working.',
        buildsOn: ['saute', 'plie'],
        leadsTo: ['entrechat', 'echappe', 'grand-jete'],
    },
    'echappe': {
        description: 'Échappé — an escaped movement in which the feet spring from a closed position to an open one (second or fourth) and return. Done as a jump (sauté) or as a relevé to pointe. Develops the ability to open and close the feet quickly and precisely.',
        keyCues: ['The spring out and in are equal — don\'t rush one direction', 'Land in second with feet equally placed and hip-width apart', 'Both feet must leave the floor simultaneously', 'On the return, close equally — don\'t let one foot be lazy'],
        musicality: 'Échappé occupies two counts: one to open, one to close. The movement is symmetrical and should feel balanced. In exercises, échappés often mark every other beat.',
        commonCorrections: ['Don\'t open wider than second', 'Don\'t let the feet land unevenly', 'Keep both feet pointed in the air during the jump'],
        muscles: ['Calves and foot (the jump and relevé action)', 'Hip abductors (opening to second)', 'Hip adductors (closing back to fifth)', 'Quadriceps (landing control)'],
        muscleContext: 'Échappé trains coordinated action of hip abductors and adductors in quick succession — the abductors open as the feet leave; the adductors close precisely on the return. This coordination directly applies to batterie (beaten jumps).',
        buildsOn: ['saute', 'plie', 'releve'],
        leadsTo: ['entrechat', 'brise', 'echappe-pointe'],
    },
    'entrechat': {
        description: 'Entrechat — a beaten jump in which the legs cross and open in the air before landing. Entrechat-quatre beats twice; entrechat-six three times. Named for the number of positions the legs pass through. Develops the fast, precise footwork of batterie.',
        keyCues: ['The legs must be close together in the air — no wide scissoring', 'Both feet must be fully pointed throughout the beats', 'The beats happen in front of the body, not behind or to the side', 'Land through the foot in a controlled plié'],
        musicality: 'Entrechat-quatre is typically one beat per jump. The speed of the beats must be absolutely even — no rushing the first and lagging on the second.',
        commonCorrections: ['Don\'t let the legs open wide between beats', 'Don\'t look down to check the feet — learn by feel', 'Keep the upper body completely still — only the legs work'],
        muscles: ['Hip adductors (closing between beats)', 'Hip abductors and flexors (opening for the beat)', 'Calves and foot (maintaining the jump and point)', 'Core (keeping the upper body still)'],
        muscleContext: 'The speed of entrechat depends entirely on how quickly the hip adductors can close the legs between beats. Faster beats come from maximising the closing speed, not from jumping higher.',
        buildsOn: ['saute', 'changement', 'echappe'],
        leadsTo: ['brise', 'cabriole'],
    },
    'grand-sissonne': {
        description: 'Grand sissonne — a large jump from two feet to one foot, travelling in the direction of the working leg extension. The body opens dramatically in the air (arabesque, attitude, etc.) and lands on one foot in demi-plié.',
        keyCues: ['The jump travels — it is a leap in a direction, not a sauté that opens in the air', 'The position must be established before landing', 'Land on one foot in a deep, controlled plié', 'The free leg should be at its full position at the peak of the jump'],
        musicality: 'Grand sissonne lands on the musical accent. The size and direction of travel should match the size of the musical phrase — a big sissonne on a small moment looks wrong.',
        commonCorrections: ['Don\'t land flat — the foot must roll through the landing', 'Don\'t lose the position shape during the descent — maintain it to the landing', 'Don\'t let the standing leg collapse on landing'],
        muscles: ['Quadriceps and glutes (the jump)', 'Hip flexors or extensors (holding the shape)', 'Core (maintaining the airborne position)', 'Standing leg calves and quadriceps (controlled landing)'],
        muscleContext: 'Grand sissonne requires explosive push-off from two legs and significant landing control on one. The force of a large jump absorbed on a single leg is substantial — the quad must take it eccentrically through a deep plié without the knee collapsing inward.',
        buildsOn: ['saute', 'grand-battement', 'arabesque'],
        leadsTo: ['grand-jete', 'manege'],
    },
    'temps-leve': {
        description: 'Temps levé — a hop on one foot while the working leg maintains its position. Deceptively demanding — the standing leg must push off and land without the assistance of the working leg, while the working leg holds its shape through the disturbance of the jump.',
        keyCues: ['Push off the standing leg cleanly — don\'t rock before jumping', 'Keep the working leg absolutely still — it must not change position during the hop', 'Land on the same foot, through the same foot', 'Keep the upper body upright — don\'t lean to compensate'],
        musicality: 'Typically sharp and accented — it lands on or just after the beat. In allegro combinations, a series of temps levés creates a rhythmic pattern that must be crisp.',
        commonCorrections: ['Don\'t let the working leg drop or change position on the jump', 'Don\'t sway to generate height — the push is straight from the standing foot', 'Keep the knee of the standing leg over the toe on landing'],
        muscles: ['Calf and quadriceps of the standing leg (the jump)', 'Hip flexors and rotators of the working leg (maintaining position)', 'Core (stability throughout)'],
        muscleContext: 'Temps levé is a single-leg jump — the standing leg provides all the power and absorbs all the landing force. This creates significant demand on the calf and quadriceps, while the working leg\'s position must be held by its own muscles through the disturbance.',
        buildsOn: ['saute', 'releve', 'retire'],
        leadsTo: ['grand-sissonne', 'grand-jete'],
    },
    'brise': {
        description: 'Brisé — a small beaten jump that travels diagonally. The working leg brushes out, the legs beat together in the air, and the dancer lands on two feet. Combines beaten technique with direction and travel.',
        keyCues: ['The brush initiates the direction — don\'t jump first and brush second', 'The beat happens in the air, not on the floor', 'Both feet close to fifth on the beat', 'Land in a controlled demi-plié, feet close'],
        musicality: 'Typically fast — one or two per beat in allegro. The brush and beat must be distinct even at speed. In sequences, the direction of travel creates a spatial pattern that maps to the musical phrase.',
        commonCorrections: ['Don\'t let the brush become a kick — controlled and close to the floor', 'Don\'t beat behind the body — the beat is in front', 'Don\'t land with open feet — fifth must be closed'],
        muscles: ['Hip flexors (the brush)', 'Hip adductors (the beat and closing)', 'Calves and foot (the jump and landing)', 'Core (upright posture during travel)'],
        muscleContext: 'Brisé challenges coordination: the brush must generate direction, the jump must provide air time, and the beat must happen in sequence within a very short time frame. Weak hip adductors produce a slow or absent beat.',
        buildsOn: ['echappe', 'degage', 'entrechat'],
        leadsTo: ['cabriole'],
    },
    'cabriole': {
        description: 'Cabriole — a jump in which one leg is thrown into the air and the other beats against it from below before landing. One of the most demanding allegro steps — it requires the height of grand battement combined with the precision of batterie.',
        keyCues: ['The working leg goes up first — the supporting leg beats against it, not the other way around', 'The beat must be sharp and below the extended leg', 'Achieve maximum height with the working leg before the supporting leg lifts', 'Land on the supporting leg in a controlled plié'],
        musicality: 'Typically on a strong beat, used as a climactic moment. The height and sharpness of the movement should match the weight of the musical accent.',
        commonCorrections: ['Don\'t let both legs leave the floor at the same time — the working leg must be up first', 'Keep the working leg at height — don\'t let it drop before the beat', 'Land through the foot — not flat'],
        muscles: ['Hip flexors (lifting the working leg)', 'Quadriceps and calves (the jump and beat)', 'Hip adductors (the beat)', 'Core (upright posture through the jump)'],
        muscleContext: 'Cabriole requires sequential activation: hip flexors to send the working leg up, then quad and calf to jump and deliver the supporting leg for the beat. This sequence must happen quickly and at height.',
        buildsOn: ['grand-battement', 'entrechat', 'temps-leve'],
        leadsTo: [],
    },
    'releve-pointe': {
        description: 'Relevé en pointe — a rise from flat or demi-plié to the tips of the toes. The most fundamental pointe action: weight transfers completely to the tips of the toes, requiring a strong pass through demi-pointe and precise alignment over the foot.',
        keyCues: ['Roll through demi-pointe on the way up — don\'t spring directly to full pointe', 'Weight over the first two toes — do not sickle or wing', 'Ankle fully extended, the foot forming a continuous line with the leg', 'Lower with control — don\'t crash down from pointe'],
        musicality: 'Relevé en pointe marks musical accents or is held through a note. A quick relevé to pointe has a sharp, precise quality; a slow one is lyrical. The quality should match the musical character.',
        commonCorrections: ['Don\'t sickle — the ankle must be directly over the big-toe joint', 'Don\'t go from flat to pointe without rolling through', 'Don\'t grip the toes — the foot should be long and strong, not scrunched'],
        muscles: ['Gastrocnemius and soleus (the rise)', 'Foot intrinsics (supporting the arch at full pointe)', 'Tibialis posterior and peroneals (alignment)', 'Core (vertical alignment)'],
        muscleContext: 'Full pointe places the entire body weight on the tips of the toes — a very small surface. The intrinsic foot muscles, plantar fascia, and peroneals must work intensively to maintain alignment and prevent rolling. This is why pointe readiness is assessed over years, not weeks.',
        buildsOn: ['releve', 'eleve'],
        leadsTo: ['echappe-pointe', 'pique-pointe', 'bourree-pointe'],
    },
    'echappe-pointe': {
        description: 'Échappé en pointe — springing from fifth on pointe to second (or fourth) on pointe and returning. Develops the quick, light footwork and bilateral ankle strength needed for pointe work.',
        keyCues: ['Both feet must arrive in second simultaneously', 'Stay at full pointe throughout — no rolling down between positions', 'Keep second position even — feet equally spaced', 'Return to fifth cleanly, closing on pointe before lowering'],
        musicality: 'Typically quick and light — one count to open, one to close. The quality should be airy. Heavy échappés suggest insufficient core and ankle strength.',
        commonCorrections: ['Don\'t let one foot arrive before the other', 'Keep weight equally divided in second', 'Don\'t let the second position be too wide'],
        muscles: ['Foot intrinsics and calves (sustained full pointe)', 'Hip abductors and adductors (opening and closing)', 'Core (upright posture at height)'],
        muscleContext: 'Échappé en pointe requires sustained full pointe on both feet while opening and closing from fifth to second. Any asymmetry in foot or ankle strength creates an uneven échappé.',
        buildsOn: ['releve-pointe', 'echappe'],
        leadsTo: ['pique-pointe', 'bourree-pointe'],
    },
    'bourree-pointe': {
        description: 'Bourrée en pointe — tiny, rapid steps on pointe that create the illusion of gliding. One of ballet\'s most iconic images: the dancer appears to float. Bourrée requires exceptional strength and stability in both ankles and perfect placement over each foot.',
        keyCues: ['Steps are tiny — barely wider than fifth position', 'Both feet should be at the same height at all times', 'The upper body is completely still — arms and head do not bob with the steps', 'Travel in the intended direction without drifting'],
        musicality: 'Performed to soft, sustained music, bourrée creates a legato, continuous visual effect. The upper body\'s stillness is what produces the floating quality — any movement there breaks the illusion.',
        commonCorrections: ['Don\'t let the steps get too wide — they become walks', 'Don\'t let the relevé height drop as the step progresses', 'Keep the knees together and the steps close to the midline'],
        muscles: ['Foot intrinsics (rapid sustained pointe on each step)', 'Calf (continuous elevated relevé)', 'Hip adductors (keeping the legs close)', 'Core (stillness of the upper body)'],
        muscleContext: 'Bourrée places the greatest endurance demand on the calves and intrinsic foot muscles of any ballet step — the relevé is never released and the steps are continuous. Ankle stability must be maintained even as the muscles fatigue.',
        buildsOn: ['releve-pointe', 'echappe-pointe'],
        leadsTo: ['pique-pointe'],
    },
    'pique-pointe': {
        description: 'Piqué en pointe — stepping directly onto a straight leg at full pointe, transferring weight completely in one movement. Sharper and more percussive than relevé — the foot lands already at full pointe, not rolling up to it.',
        keyCues: ['Step onto a fully extended leg — the knee is straight the instant the foot lands', 'The foot must be placed precisely, not thrown', 'Maintain full height throughout', 'The working leg closes quickly after the piqué'],
        musicality: 'Characteristically sharp and accented. In sequences, each piqué marks a beat. The precision of each landing gives the sequence its rhythmic clarity.',
        commonCorrections: ['Don\'t allow the knee to bend on landing — the leg must be straight', 'Don\'t sickle on arrival — alignment over the first two toes must be immediate', 'Keep the upper body upright — don\'t lean forward into the piqué'],
        muscles: ['Calf (immediate relevé on contact)', 'Foot intrinsics (instant alignment at full pointe)', 'Hip flexors (bringing the step forward)', 'Core (upright alignment)'],
        muscleContext: 'Piqué en pointe is the most demanding single action in pointe work for ankle stability. The foot must arrive at full height, correctly aligned, on a straight leg — with no rolling-up phase to absorb the transition.',
        buildsOn: ['releve-pointe', 'bourree-pointe'],
        leadsTo: ['pique-turn'],
    },
    'italian-fouette': {
        description: 'Fouetté à l\'italienne — a variation of fouetté in which the working leg extends to arabesque height (to the side and back) rather than forward before closing to retiré. Associated with the Italian school and characterised by a more open, expansive working leg path.',
        keyCues: ['The working leg opens to arabesque rather than devant', 'The relevé and turn mechanics are identical to standard fouetté', 'The opening must be controlled — not thrown', 'Arms remain stable throughout'],
        musicality: 'Shares the same structure as standard fouetté — one turn per beat — but the more expansive path of the working leg may require a slightly steadier tempo.',
        commonCorrections: ['Don\'t confuse the path of the working leg — it goes to arabesque, not forward', 'Maintain the supporting relevé throughout', 'Don\'t lean away from the working leg as it opens'],
        muscles: ['Hip extensors and glutes (working leg to arabesque)', 'Hip flexors (closing to retiré)', 'Calf (sustained relevé)', 'Core (axis)'],
        muscleContext: 'The arabesque path of the working leg engages the hip extensors through a greater range of motion than standard fouetté. The transition from arabesque back to retiré requires strong hip flexors working against a longer lever.',
        buildsOn: ['fouette', 'arabesque', 'pirouette'],
        leadsTo: [],
    },
};

// Accented-ID aliases — data.js uses piqué-turn / piqué-pointe
SKILL_KNOWLEDGE['piqué-turn']   = SKILL_KNOWLEDGE['pique-turn'];
SKILL_KNOWLEDGE['piqué-pointe'] = SKILL_KNOWLEDGE['pique-pointe'];

// Default stub for skills without full knowledge content yet
const SKILL_KNOWLEDGE_STUB = {
    description: 'Full reference content for this skill is being prepared.',
    keyCues: [],
    musicality: '',
    commonCorrections: [],
    muscles: [],
    buildsOn: [],
    leadsTo: [],
};

function showSkillKnowledgePage(skillId, returnTo) {
    const ref = DATA.skills.find(s => s.id === skillId);
    if (!ref) return;

    const screenId = `skill-knowledge-${skillId}`;

    // Only push history when navigating to a different screen (not when re-rendering in place)
    if (appState.currentScreen !== screenId) pushNavHistory();

    let screen = document.getElementById(screenId);
    if (!screen) {
        screen = document.createElement('div');
        screen.className = 'screen skill-knowledge-screen';
        screen.id = screenId;
        document.querySelector('.app-container').appendChild(screen);
    }

    const knowledge = SKILL_KNOWLEDGE[skillId] || SKILL_KNOWLEDGE_STUB;
    const isStub = !SKILL_KNOWLEDGE[skillId];

    const keyCuesHtml = knowledge.keyCues.length > 0
        ? knowledge.keyCues.map((cue) => `
            <li class="skill-know-list-item learn-line-tappable"
                data-line-text="${escapeHtml(cue)}"
                data-save-type="correction"
                data-page-type="skill"
                data-item-id="${skillId}"
                onclick="openLearnLineSave(this)">
                ${cue}
                <div class="learn-line-save-expand">
                    ${_renderLineSavePrompt(cue, 'correction', 'skill', skillId)}
                </div>
            </li>`).join('')
        : '<li class="skill-know-list-item skill-know-stub">Content coming soon</li>';

    const correctionsHtml = knowledge.commonCorrections.length > 0
        ? knowledge.commonCorrections.map((c) => {
            const escaped = c.replace(/'/g, "\\'").replace(/"/g, '&quot;');
            return `<li class="skill-know-list-item learn-line-tappable"
                data-line-text="${escaped}"
                data-save-type="correction"
                data-page-type="skill"
                data-item-id="${skillId}"
                onclick="openLearnLineSave(this)">
                ${c}
                <div class="learn-line-save-expand">
                    ${_renderLineSavePrompt(c, 'correction', 'skill', skillId)}
                </div>
            </li>`;
        }).join('')
        : '<li class="skill-know-list-item skill-know-stub">Content coming soon</li>';

    const musclesHtml = knowledge.muscles.length > 0
        ? `<div class="skill-know-muscles">
               ${knowledge.muscles.map(m => `<span class="skill-know-muscle-chip">${m}</span>`).join('')}
           </div>
           ${knowledge.muscleContext ? `
           <div class="skill-know-muscle-expand" id="muscle-expand-${skillId}">
               <button class="skill-know-muscle-why" onmousedown="toggleMuscleContext('${skillId}')">
                   why these muscles?
               </button>
               <div class="skill-know-muscle-context" id="muscle-context-${skillId}" style="display:none;">
                   ${knowledge.muscleContext}
               </div>
           </div>` : ''}`
        : '<span class="skill-know-stub">Content coming soon</span>';

    const buildsOnHtml = knowledge.buildsOn.length > 0
        ? knowledge.buildsOn.map(id => {
            const s = DATA.skills.find(sk => sk.id === id);
            return s ? `<button class="skill-know-link-chip" onclick="showSkillKnowledgePage('${id}', '${screenId}')">${s.french}</button>` : '';
        }).join('')
        : '<span class="skill-know-stub">—</span>';

    const leadsToHtml = knowledge.leadsTo.length > 0
        ? knowledge.leadsTo.map(id => {
            const s = DATA.skills.find(sk => sk.id === id);
            return s ? `<button class="skill-know-link-chip" onclick="showSkillKnowledgePage('${id}', '${screenId}')">${s.french}</button>` : '';
        }).join('')
        : '<span class="skill-know-stub">—</span>';

    screen.innerHTML = `
        <div class="skill-knowledge-view">

            <!-- Header -->
            <div class="skill-detail-header">
                <button class="session-detail-back" onclick="goBack()">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="13 4 7 10 13 16"/>
                    </svg>
                    back
                </button>
            </div>

            <!-- Hero -->
            <div class="skill-detail-hero">
                <div class="skill-detail-category">${DATA.categoryNames[ref.categoryId] || ''}</div>
                <h1 class="skill-detail-title">${ref.french}</h1>
                <div class="skill-know-meta-row">
                    <span class="skill-detail-phonetic">${ref.phonetic}</span>
                    <span class="skill-know-meta-dot">·</span>
                    <span class="skill-detail-english">${ref.english}</span>
                    <!-- TODO: decide whether to reinstate skill level (beginner/improver/etc) permanently -->
                </div>
                <button class="skill-know-personal-btn" style="margin-top: var(--sp-sm);"
                        onclick="showSkillDetail('${skillId}', '${screenId}')">
                    my ${ref.french} →
                </button>
            </div>

            <!-- Description -->
            <div class="skill-know-section">
                <p class="skill-know-description">${knowledge.description}</p>
            </div>

            <!-- Key points -->
            <div class="skill-know-section">
                <div class="skill-know-section-label">Key points</div>
                <ul class="skill-know-list">${keyCuesHtml}</ul>
            </div>

            <!-- Musicality -->
            ${knowledge.musicality ? `
            <div class="skill-know-section">
                <div class="skill-know-section-label">Musicality</div>
                <ul class="skill-know-list">
                    <li class="skill-know-list-item learn-line-tappable"
                        data-line-text="${escapeHtml(knowledge.musicality)}"
                        data-save-type="goal"
                        data-page-type="skill"
                        data-item-id="${skillId}"
                        onclick="openLearnLineSave(this)">
                        ${knowledge.musicality}
                        <div class="learn-line-save-expand">
                            ${_renderLineSavePrompt(knowledge.musicality, 'goal', 'skill', skillId)}
                        </div>
                    </li>
                </ul>
            </div>` : ''}

            <!-- Common corrections -->
            <div class="skill-know-section">
                <div class="skill-know-section-label">Common corrections</div>
                <ul class="skill-know-list">${correctionsHtml}</ul>
            </div>

            <!-- Muscles -->
            <div class="skill-know-section">
                <div class="skill-know-section-label">Muscles involved</div>
                ${musclesHtml}
            </div>

            <!-- Skill web -->
            <div class="skill-know-section">
                <div class="skill-know-section-label">Builds on</div>
                <div class="skill-know-links">${buildsOnHtml}</div>
            </div>
            <div class="skill-know-section">
                <div class="skill-know-section-label">Leads to</div>
                <div class="skill-know-links">${leadsToHtml}</div>
            </div>

            ${isStub ? `<div class="skill-know-section"><p class="skill-know-stub-notice">Full reference content for this skill is being prepared.</p></div>` : ''}

            <!-- My notes -->
            <div class="skill-know-section skill-detail-section" id="learn-notes-section-skill-${skillId}"></div>

            <div style="height: 120px;"></div>
        </div>
    `;

    const notesSectionEl = screen.querySelector(`#learn-notes-section-skill-${skillId}`);
    if (notesSectionEl) renderLearnNotesSectionInPlace('skill', skillId, notesSectionEl);

    showScreen(screenId);
}

function toggleMuscleContext(skillId) {
    const ctx = document.getElementById(`muscle-context-${skillId}`);
    const btn = document.querySelector(`#muscle-expand-${skillId} .skill-know-muscle-why`);
    if (!ctx) return;
    const isOpen = ctx.style.display !== 'none';
    ctx.style.display = isOpen ? 'none' : 'block';
    if (btn) btn.textContent = isOpen ? 'why these muscles?' : 'hide';
}

function closeSkillKnowledgePage(skillId, returnTo) {
    goBack();
}

function showKnowledgeItemPopover(element, skillId, text, defaultType) {
    // Remove any existing inline saves
    document.querySelectorAll('.knowledge-item-popover').forEach(p => p.remove());

    // If this element already has an open save bar, close it
    if (element.querySelector('.knowledge-item-popover')) return;

    const bar = document.createElement('div');
    bar.className = 'knowledge-item-popover';
    bar.innerHTML = `
        <div class="knowledge-popover-label">Save to my ${DATA.skills.find(s => s.id === skillId)?.french || 'skill'}?</div>
        <div class="knowledge-popover-actions">
            <button class="knowledge-popover-btn" onmousedown="saveKnowledgeItem('${skillId}', this.closest('.knowledge-item-popover'), 'note')">
                as a note
            </button>
            <button class="knowledge-popover-btn knowledge-popover-btn-correction" onmousedown="saveKnowledgeItem('${skillId}', this.closest('.knowledge-item-popover'), 'correction')">
                as a correction
            </button>
            <button class="knowledge-popover-btn knowledge-popover-dismiss" onmousedown="this.closest('.knowledge-item-popover').remove()">
                dismiss
            </button>
        </div>
    `;
    bar.dataset.text = text;

    // Insert inline below the tapped item — pushes content down
    element.after(bar);
    bar.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function saveKnowledgeItem(skillId, popoverEl, type) {
    const text = popoverEl?.dataset?.text;
    if (!text) return;

    const now = Date.now();
    const today = new Date().toISOString().split('T')[0];

    if (type === 'correction') {
        appState.corrections.push({
            id:                      generateId(),
            userId:                  null,
            skillId,
            text,
            createdAt:               now,
            sessionId:               null,
            source:                  'self',
            type:                    'technical',
            isRecurring:             false,
            isPinned:                false,
            isResolved:              false,
            derivedFromCorrectionId: null,
            previousBlockType:       null,
        });
        storage.save('corrections', appState.corrections);
    } else {
        appState.skillNotes = appState.skillNotes || [];
        appState.skillNotes.push({
            id:        now,
            skillId,
            text,
            date:      today,
            createdAt: now,
        });
        storage.save('skillNotes', appState.skillNotes);
    }

    // Visual feedback — replace popover with confirmation
    if (popoverEl) {
        popoverEl.innerHTML = `<div class="knowledge-popover-saved">saved ✓</div>`;
        setTimeout(() => popoverEl.remove(), 1200);
    }

    // Flag the skill as active in The Barre if it isn't already
    const skill = appState.skills.find(s => s.id === skillId);
    if (skill && !skill.flagged) {
        skill.flagged = true;
        persistSkillState();
    }
}


/* ═══════════════════════════════════════════════════════════════
   GLOSSARY
   All skills from the skill library + ballet vocabulary terms
   (positions, directions, concepts). Definitions to be completed.
   Musicality terms live in the Musicality learn section.
   ═══════════════════════════════════════════════════════════════ */

// Ballet vocabulary terms — concepts, positions, and directions that aren't individual skills.
// Musicality terms (Bar, Beat, Count, Downbeat, Dynamics, Phrase, Tempo, Upbeat) live in
// the Musicality learn section. Skills (Port de bras, Relevé, Retiré) live in the skill library.
const GLOSSARY_BALLET_TERMS = [
    { term: 'À la seconde', category: 'Position'   },
    { term: 'Adagio',       category: 'Style'      },
    { term: 'Allegro',      category: 'Style'      },
    { term: 'Allongé',      category: 'Style'      },
    { term: 'Ballon',       category: 'Quality'    },
    { term: 'Battement',    category: 'Technique'  },
    { term: 'Corps de ballet', category: 'Company' },
    { term: 'Croisé',       category: 'Position'   },
    { term: 'Effacé',       category: 'Position'   },
    { term: 'En croix',     category: 'Direction'  },
    { term: 'En dedans',    category: 'Direction'  },
    { term: 'En dehors',    category: 'Direction'  },
    { term: 'En face',      category: 'Position'   },
    { term: 'Enchaînement', category: 'Structure'  },
    { term: 'Épaulement',   category: 'Technique'  },
    { term: 'Five positions', category: 'Foundation' },
    { term: 'Pas de deux',  category: 'Structure'  },
    // Spotting and Turnout live in Pointers
];

function buildGlossaryTerms() {
    // Skill terms from DATA.skills
    const skillTerms = DATA.skills.map(s => ({
        term:       s.french,
        alt:        s.english,
        category:   s.category,
        skillId:    s.id,
        _isSkill:   true,
    }));

    // Merge with ballet vocabulary terms
    const all = [...skillTerms, ...GLOSSARY_BALLET_TERMS];

    // Sort alphabetically, stripping leading accents for sort key
    return all.sort((a, b) => normaliseStr(a.term).localeCompare(normaliseStr(b.term)));
}

function showGlossaryTermDetail(term, category) {
    const screenId = `glossary-term-${term.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`;
    pushNavHistory();
    let screen = document.getElementById(screenId);
    if (!screen) {
        screen = document.createElement('div');
        screen.id = screenId;
        screen.className = 'screen';
        document.querySelector('.app-container').appendChild(screen);
    }
    screen.innerHTML = `
        <div class="skill-detail-header">
            <button class="session-detail-back" onclick="goBack()">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="13 4 7 10 13 16"/>
                </svg>
                back
            </button>
        </div>
        <div class="skill-detail-hero">
            <div class="skill-detail-category">${category ? category.toUpperCase() : ''}</div>
            <h1 class="skill-detail-title">${term}</h1>
        </div>
        <div class="skill-know-section">
            <p class="skill-know-stub-notice">Definition coming soon.</p>
        </div>
        <div style="height: 120px;"></div>
    `;
    showScreen(screenId);
}

function showGlossary() {
    let screen = document.getElementById('glossary-screen');
    if (!screen) {
        screen = document.createElement('div');
        screen.className = 'screen';
        screen.id = 'glossary-screen';
        document.querySelector('.app-container').appendChild(screen);
    }
    renderGlossaryScreen('');
    showScreen('glossary-screen');
}

function renderGlossaryScreen(query) {
    const screen = document.getElementById('glossary-screen');
    if (!screen) return;

    const q = normaliseStr(query);
    const terms = buildGlossaryTerms();
    const filtered = q
        ? terms.filter(t => normaliseStr(t.term).includes(q) || normaliseStr(t.alt || '').includes(q))
        : terms;

    // Group alphabetically
    const groups = {};
    filtered.forEach(t => {
        const letter = normaliseStr(t.term)[0]?.toUpperCase() || '#';
        if (!groups[letter]) groups[letter] = [];
        groups[letter].push(t);
    });

    const lettersHtml = Object.keys(groups).sort().map(letter => `
        <div class="glossary-group" id="gl-${letter}">
            <div class="glossary-group-label">${letter}</div>
            ${groups[letter].map(t => `
                <div class="glossary-term-row glossary-term-skill"
                     onclick="${t._isSkill
                         ? `showSkillKnowledgePage('${t.skillId}', 'glossary-screen')`
                         : `showGlossaryTermDetail('${t.term.replace(/'/g, "\\'")}', '${(t.category || '').replace(/'/g, "\\'")}')`}">
                    <div class="glossary-term-main">
                        <span class="glossary-term-name">${t.term}</span>
                        ${t.alt ? `<span class="glossary-term-alt">${t.alt}</span>` : ''}
                    </div>
                    <div class="glossary-term-meta">
                        <span class="glossary-term-category">${t.category || ''}</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><polyline points="4 2 8 6 4 10"/></svg>
                    </div>
                </div>
            `).join('')}
        </div>
    `).join('');

    // Alpha index for jump navigation
    const indexLetters = Object.keys(groups).sort();
    const indexHtml = indexLetters.map(l =>
        `<button class="glossary-index-btn" onclick="document.getElementById('gl-${l}')?.scrollIntoView({behavior:'smooth', block:'start'})">
            ${l}
        </button>`
    ).join('');

    screen.innerHTML = `
        <div class="skill-detail-header">
            <button class="session-detail-back" onclick="goBack()">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="13 4 7 10 13 16"/>
                </svg>
                learn
            </button>
            <span class="skill-lib-count">${terms.length} terms</span>
        </div>

        <div class="skill-lib-sticky">
            <div class="skill-lib-search-wrapper">
                <svg class="skill-lib-search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                    <circle cx="7" cy="7" r="5"/><line x1="11" y1="11" x2="14" y2="14"/>
                </svg>
                <input type="text" class="skill-lib-search" id="glossary-search"
                       placeholder="Search terms…" autocomplete="off"
                       oninput="renderGlossaryScreen(this.value)" />
            </div>
            <div class="glossary-stub-notice">
                Definitions are being written — check back soon.
            </div>
        </div>

        <div class="glossary-body" id="glossary-body">
            ${lettersHtml}
            ${filtered.length === 0 ? `<div class="skill-detail-empty-state">No terms match.</div>` : ''}
        </div>

        <div class="glossary-index">${indexHtml}</div>

        <div style="height: 120px;"></div>
    `;
}

    /*
   7. SKILLS SYSTEM
   Skills rendering, filtering, flagging, phonetic toggles.
   ═══════════════════════════════════════════════════════════════ */

function renderSkills(filter = 'all') {
    const tbody = document.getElementById('skillsTableBody');
    if (!tbody) return;
    const filtered = filter === 'all'
        ? appState.skills
        : appState.skills.filter(s => s.difficulty === filter);

    tbody.innerHTML = filtered.map(skill => {
        const phoneticHidden = skill.phoneticVisible ? '' : 'hidden';
        return `
        <tr>
            <td>
                <div class="skill-cell">
                    <div class="skill-name">
                        <div class="skill-french">
                            ${skill.french}
                            <button class="phonetic-toggle" onclick="togglePhonetic('${skill.id}')">
                                ${skill.phoneticVisible ? 'hide' : 'show'} pronunciation
                            </button>
                        </div>
                        <div class="skill-phonetic ${phoneticHidden}">${skill.phonetic}</div>
                    </div>
                </div>
            </td>
            <td>${skill.category}</td>
            <td><span class="difficulty-badge difficulty-${skill.difficulty}">${skill.difficulty}</span></td>
            <td>
                <button class="skill-flag ${skill.flagged ? 'flagged' : ''}"
                        onclick="toggleFlag('${skill.id}')">
                    ${skill.flagged ? ICONS.get('flag', 14) : ICONS.get('flag-outline', 14)}
                </button>
            </td>
        </tr>
    `}).join('');
}

function filterSkills(difficulty, event) {
    document.querySelectorAll('.filter-tab').forEach(tab => tab.classList.remove('active'));
    if (event?.target) event.target.classList.add('active');
    renderSkills(difficulty);
}

function togglePhonetic(skillId) {
    const skill = appState.skills.find(s => s.id === skillId);
    if (!skill) return;
    skill.phoneticVisible = !skill.phoneticVisible;
    renderSkills();
}

function toggleFlag(skillId) {
    const skill = appState.skills.find(s => s.id === skillId);
    if (!skill) return;
    skill.flagged = !skill.flagged;
    persistSkillState();
    renderSkills();
}

// ── Stubs for future features ──
function addGoal() { openGoalCreator(); }
function addProgress() { alert('Coming soon'); }

function confirmResetProfile() {
    if (confirm('Reset all data and start from scratch? This cannot be undone.')) {
        resetProfile();
    }
}

function resetProfile() {
    // Clear localStorage
    storage.clear();

    // Reset appState to initial values
    appState.sessions         = [];
    appState.sessionTemplates = [];
    appState.sessionSkills    = [];
    appState.corrections      = [];
    appState.assessments      = [];
    appState.goals            = [];
    appState.timeline         = [];
    appState.skillNotes       = [];
    appState.level            = null;
    appState.dimensions       = null;
    appState.rawDimensions    = null;
    appState.answers          = {};
    appState.currentQuestion  = 0;
    appState.currentNav       = null;
    appState._assessmentWritten = false;
    appState._goalDraft       = null;
    appState.hidePointe       = false;
    appState.profilePicture   = null;
    appState.displayName      = null;

    // Reset skill user state
    appState.skills.forEach(s => {
        s.tracked        = false;
        s.flagged        = false;
        s.phoneticVisible = false;
    });

    // Remove any dynamically created screens so they rebuild fresh
    ['barre-screen','assess-screen','goals-screen','learn-screen']
        .forEach(id => document.getElementById(id)?.remove());
    document.querySelectorAll('[id^="session-detail-"]').forEach(el => el.remove());
    document.querySelectorAll('[id^="skill-detail-"]').forEach(el => el.remove());
    document.querySelectorAll('[id^="skill-knowledge-"]').forEach(el => el.remove());
    document.getElementById('skill-library-screen')?.remove();
    document.getElementById('glossary-screen')?.remove();

    // Remove overlays
    document.getElementById('session-logger-overlay')?.remove();
    document.getElementById('goal-creator-overlay')?.remove();
    document.getElementById('reflection-overlay')?.remove();
    document.getElementById('reflection-prompt')?.remove();
    document.getElementById('post-save-prompt')?.remove();

    // Restore nav visibility state
    document.querySelector('.bottom-nav')?.classList.remove('visible');
    document.querySelector('.fab')?.classList.remove('visible');

    // Re-seed mock data so the app has test content after reset
    seedMockData();

    // Restart from onboarding
    currentOnboardingScreen = 1;
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.onboarding-screen').forEach(s => s.classList.remove('active'));
    document.getElementById('onboarding-1').classList.add('active');
    appState.currentScreen = 'onboarding-1';
}
