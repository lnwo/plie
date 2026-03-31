

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
        { id: 'general',      label: 'General',    group: 'General'   },
        { id: 'musicality',   label: 'Musicality', group: 'General'   },
        { id: 'barre',        label: 'Barre',       group: 'Category'  },
        { id: 'centre',       label: 'Centre',      group: 'Category'  },
        { id: 'turns',        label: 'Turns',       group: 'Category'  },
        { id: 'allegro',      label: 'Allegro',     group: 'Category'  },
        { id: 'pointe',       label: 'Pointe',      group: 'Category'  },
        { id: 'flexibility',  label: 'Flexibility', group: 'Category'  },
    ];
    const skills = appState.skills.map(s => ({
        id:    'skill:' + s.id,   // e.g. 'skill:pirouette'
        label: s.french,
        sub:   s.english,
        group: 'Skills',
    }));
    return [...categories, ...skills];
}

function openSessionLogger(mode) {
    const today = new Date().toISOString().split('T')[0];
    const todayDow = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][new Date().getDay()];

    // Day-of-week session prediction (only for full session mode)
    const predictedTemplate = (mode !== 'note') ? (appState.sessionTemplates.find(t =>
        t.days && t.days.includes(todayDow)
    ) || null) : null;

    appState.currentSession = {
        id:              Date.now(),
        date:            today,
        templateId:      predictedTemplate?.id || null,
        sessionName:     predictedTemplate?.name || null,
        sessionLocation: predictedTemplate?.location || null,
        classType:       predictedTemplate?.classType || null,
        blocks:          [],
        _predicted:      predictedTemplate ? true : false,
        _mode:           mode || 'session',
    };

    // Auto-create first block and focus its title
    addBlock(true);

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
    const d = new Date(dateStr + 'T12:00:00');
    const shortDate = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    if (dateStr === todayStr) {
        return `<span class="date-display-label">Today</span><span class="date-display-sep">·</span><span class="date-display-sub">${shortDate}</span>`;
    } else if (dateStr === yesterdayStr) {
        return `<span class="date-display-label">Yesterday</span><span class="date-display-sep">·</span><span class="date-display-sub">${shortDate}</span>`;
    } else {
        const dayName = d.toLocaleDateString('en-GB', { weekday: 'short' });
        return `<span class="date-display-label">${dayName}</span><span class="date-display-sep">·</span><span class="date-display-sub">${shortDate}</span>`;
    }
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

    // Session dropdown options
    const savedOptions = templates.map(t => `
        <option value="template:${t.id}" ${s.templateId === t.id ? 'selected' : ''}>
            ${t.name}${t.location ? ' · ' + t.location : ''}
        </option>
    `).join('');

    // Determine predicted class type from selected template
    const activeTemplate = templates.find(t => t.id === s.templateId);
    const predictedType = activeTemplate?.classType || null;

    // Class type carousel — primary chips + More button
    const primaryChips = CLASS_TYPES_PRIMARY.map(ct => `
        <div class="class-type-carousel-item">
            <button class="class-type-chip ${s.classType === ct.id ? 'selected' : ''} ${predictedType === ct.id && !s.classType ? 'predicted' : ''}"
                    onclick="selectClassType('${ct.id}')">
                <span class="class-type-chip-label">${ct.label}</span>
                ${ct.sub ? `<span class="class-type-chip-sub">${ct.sub}</span>` : ''}
            </button>
        </div>
    `).join('');

    // If a secondary type is selected, show it in the carousel too
    const selectedSecondary = s.classType ? CLASS_TYPES_SECONDARY.find(ct => ct.id === s.classType) : null;
    const selectedSecondaryChip = selectedSecondary ? `
        <div class="class-type-carousel-item">
            <button class="class-type-chip selected" onclick="selectClassType('${selectedSecondary.id}')">
                <span class="class-type-chip-label">${selectedSecondary.label}</span>
                ${selectedSecondary.sub ? `<span class="class-type-chip-sub">${selectedSecondary.sub}</span>` : ''}
            </button>
        </div>
    ` : '';

    // Notes blocks HTML
    const blocksHtml = s.blocks.map((block, i) => renderBlockHtml(block, i)).join('');

    // Session combobox — show selected template name or free text
    const sessionInputValue = s.templateId
        ? (templates.find(t => t.id === s.templateId)?.name || '')
        : (s.sessionName || '');

    const templatePreviewHtml = activeTemplate
        ? `<div class="session-template-preview"><span class="template-preview-text">${renderTemplatePreview(s.templateId)}</span></div>`
        : '';

    const sessionAndClassFieldsHtml = isNoteMode ? '' : `
        <div class="session-field">
            <label class="session-field-label">Session <span class="session-field-optional">optional</span></label>
            <div class="session-combobox" id="session-combobox">
                <input
                    type="text"
                    class="session-input session-combobox-input"
                    id="session-name-input"
                    placeholder="Name this session or choose a saved one…"
                    value="${sessionInputValue}"
                    autocomplete="off"
                    oninput="handleSessionNameInput(this.value)"
                    onfocus="showSessionDropdown()"
                />
                <div class="session-combobox-dropdown" id="session-combobox-dropdown" style="display:none;"></div>
            </div>
            ${templatePreviewHtml}
        </div>
        <div id="new-session-form-container"></div>
        <div class="session-field">
            <label class="session-field-label">Class type <span class="session-field-optional">optional</span></label>
            <div class="class-type-carousel">
                ${primaryChips}
                ${selectedSecondaryChip}
                <div class="class-type-carousel-item">
                    <button class="class-type-chip class-type-more" onclick="toggleMoreClassTypes()">
                        <span class="class-type-chip-label">More…</span>
                        <span class="class-type-chip-sub">see all types</span>
                    </button>
                </div>
            </div>
            <div id="more-class-types-panel" style="display:none;"></div>
        </div>
    `;

    overlay.innerHTML = `
        <div class="session-logger-sheet">
            <div class="session-sheet-handle"></div>

            <div class="session-logger-header">
                <div>
                    <div class="session-logger-eyebrow">${isNoteMode ? 'Quick note' : 'New session'}</div>
                    <h2 class="session-logger-title">${isNoteMode ? 'Add a note' : 'Log a class'}</h2>
                </div>
                <button class="session-close-btn" onclick="closeSessionLogger()" aria-label="Close">
                    ${ICONS.get('x', 18)}
                </button>
            </div>

            <div class="session-logger-body" id="session-logger-body">

                ${isNoteMode ? `
                <div class="session-field" style="padding-top: var(--sp-sm);">
                    <div contenteditable="true"
                         id="note-editor"
                         class="note-editor"
                         spellcheck="true">${escapeHtml(s.generalNotes || '')}</div>
                    <div class="note-editor-hint">Saved as a personal note — just for you.</div>
                </div>
                ` : `
                <!-- Date -->
                <div class="session-field">
                    <label class="session-field-label">Date</label>
                    <div class="session-date-picker">
                        <button class="date-nav-btn" onmousedown="stepSessionDate(-1)" aria-label="Previous day">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="10 4 6 8 10 12"/></svg>
                        </button>
                        <div class="date-display" onmousedown="toggleDateCalendar()">${formatSessionDateDisplay(s.date)}</div>
                        <button class="date-nav-btn${s.date === new Date().toISOString().split('T')[0] ? ' date-nav-disabled' : ''}" onmousedown="stepSessionDate(1)" aria-label="Next day" ${s.date === new Date().toISOString().split('T')[0] ? 'disabled' : ''}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 4 10 8 6 12"/></svg>
                        </button>
                    </div>
                </div>

                ${sessionAndClassFieldsHtml}

                <!-- Notes & corrections blocks -->
                <div class="session-field" style="margin-bottom: var(--sp-sm);">
                    <label class="session-field-label">Notes &amp; corrections</label>
                </div>

                <div id="session-blocks-container">
                    ${blocksHtml}
                </div>

                <button class="add-block-btn" onclick="addBlock()">+ add notes &amp; corrections</button>
                `}

                <div style="height: var(--sp-3xl);"></div>

            </div>

            <div class="session-logger-footer">
                <button class="session-discard-btn" onmousedown="closeSessionLogger()">discard</button>
                <button class="btn-large session-save-btn" onmousedown="saveSession()">${isNoteMode ? 'save note' : 'save session'}</button>
            </div>
        </div>
    `;

    // Re-attach swipe listeners to new handle
    attachSheetSwipe();

    // Restore state-dependent panels
    if (appState._addingNewTemplate) renderNewSessionForm();
    if (appState._showMoreClassTypes) renderMoreClassTypesPanel();

    // Auto-select predicted class type visually (not committed to state)
    if (predictedType && !s.classType) {
        const chip = overlay.querySelector(`[onclick="selectClassType('${predictedType}')"]`);
        if (chip) chip.classList.add('predicted');
    }
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

function handleSessionNameInput(value) {
    // Update free-text name on session, clear any template link
    appState.currentSession.sessionName = value;
    appState.currentSession.templateId = null;
    renderSessionComboboxDropdown(value);
    checkSessionTitleForSkills(value);
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
        <div class="session-combobox-row" onmousedown="selectSessionTemplate(${t.id})">
            <div class="session-combobox-row-info">
                <span class="session-combobox-row-name">${t.name}</span>
                <span class="session-combobox-row-meta">${[t.location, t.days?.join(', ')].filter(Boolean).join(' · ')}</span>
            </div>
            <button class="session-combobox-row-delete"
                    onmousedown="event.stopPropagation(); deleteSessionTemplate(${t.id});"
                    title="Remove saved session">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <line x1="2" y1="2" x2="10" y2="10"/><line x1="10" y1="2" x2="2" y2="10"/>
                </svg>
            </button>
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
    // Update template preview
    renderTemplatePreviewInline(templateId);
}

function renderTemplatePreviewInline(templateId) {
    // Update or insert the preview tag under the combobox without re-rendering the whole logger
    const combobox = document.getElementById('session-combobox');
    if (!combobox) return;
    let preview = combobox.parentElement.querySelector('.session-template-preview');
    const text = renderTemplatePreview(templateId);
    if (text) {
        if (!preview) {
            preview = document.createElement('div');
            preview.className = 'session-template-preview';
            combobox.after(preview);
        }
        preview.innerHTML = `<span class="template-preview-text">${text}</span>`;
    } else if (preview) {
        preview.remove();
    }
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

function renderTemplatePreview(templateId) {
    const t = appState.sessionTemplates.find(t => t.id === templateId);
    if (!t) return '';
    const parts = [];
    if (t.location) parts.push(t.location);
    if (t.days?.length) parts.push(t.days.join(', '));
    return parts.join(' · ');
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
                <span class="new-session-form-title">New session</span>
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
                ${isRecurring ? 'save recurring session' : 'add session'}
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
    const template = {
        id:        Date.now(),
        name:      d.name.trim(),
        location:  d.location?.trim() || null,
        classType: d.classType || null,
        days:      d.days || [],
        // recurring if days.length > 0 — no separate recurrence field needed
    };

    if (isRecurring) {
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
    appState._draftTemplate = null;
    renderSessionLogger();
}

function cancelNewSession() {
    appState._addingNewTemplate = false;
    appState._draftTemplate = null;
    const container = document.getElementById('new-session-form-container');
    if (container) container.innerHTML = '';
}

// ── Notes & corrections blocks ──

// Block modes
const BLOCK_MODES = ['correction', 'praise', 'reflection'];

function addBlock(focusTitle = false) {
    const block = {
        id:          Date.now(),
        topicId:     'general',
        title:       '',
        text:        '',
        notes:       '',
        notesOpen:   false,
        source:      null,
        isHighlight: false,
    };
    appState.currentSession.blocks.push(block);
    sortBlocks();
    renderBlocksOnly();
    if (focusTitle) {
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

function renderBlocksOnly() {
    const container = document.getElementById('session-blocks-container');
    if (!container) return;
    const s = appState.currentSession;
    container.innerHTML = s.blocks.map((block, i) => renderBlockHtml(block, i)).join('');
    // Attach swipe-to-remove on each block
    container.querySelectorAll('.swipe-row[data-block-id]').forEach(row => {
        const blockId = parseInt(row.dataset.blockId);
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
    const isGeneral = block.topicId === 'general';
    const source = block.source || null;

    // Migrate legacy content into block.text for display in the editor
    // (corrections[], praiseText, reflectionText → text)
    let blockText = block.text || '';
    if (!blockText) {
        if (Array.isArray(block.corrections) && block.corrections.length) {
            blockText = block.corrections.join('\n');
        } else if (block.praiseText) {
            blockText = block.praiseText;
        } else if (block.reflectionText) {
            blockText = block.reflectionText;
        }
    }

    // Source chips: Correction · Observation
    const sourcesHtml = `
        <div class="block-source-chips">
            <button class="block-source-chip ${source === 'correction' ? 'active' : ''}"
                    onmousedown="setBlockSource(${block.id}, 'correction')">correction</button>
            <button class="block-source-chip ${source === 'observation' ? 'active' : ''}"
                    onmousedown="setBlockSource(${block.id}, 'observation')">observation</button>
        </div>
    `;

    // Notes section (collapsible)
    const notesHtml = `
        <div class="block-notes-area">
            ${block.notesOpen || block.notes ? `
                <textarea class="session-block-textarea session-block-capped"
                          placeholder="Notes — context, rehearsal, how it felt…"
                          oninput="updateBlockField(${block.id}, 'notes', this.value); autoResizeCapped(this);"
                          >${block.notes || ''}</textarea>
                <button class="block-notes-toggle block-notes-toggle-open"
                        onmousedown="toggleBlockNotes(${block.id})">hide notes</button>
            ` : `
                <button class="block-notes-toggle"
                        onmousedown="toggleBlockNotes(${block.id})">
                    ${block.notes ? `${ICONS.get('edit', 12)} notes` : '+ add notes'}
                </button>
            `}
        </div>
    `;

    // Build contenteditable bullet lines from existing text
    const bulletLines = blockText ? blockText.split('\n') : [];
    const bulletDivsHtml = bulletLines.length
        ? bulletLines.map(l => `<div>${escapeHtml(l) || '<br>'}</div>`).join('')
        : '<div><br></div>';

    return `
        <div class="swipe-row" data-block-id="${block.id}">
            <div class="swipe-action-left swipe-action-remove">
                ${ICONS.get('x', 16)}
                remove
            </div>

            <div class="session-block" id="block-${block.id}">
                    <div class="session-block-header">
                        <button class="block-star-btn ${block.isHighlight ? 'active' : ''}"
                                onmousedown="toggleBlockHighlight(${block.id})"
                                aria-label="Highlight">
                            <svg class="star-icon" width="16" height="16" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        </button>
                        <div class="session-block-topic-wrapper" id="topic-wrapper-${block.id}">
                            <input class="session-block-topic-input"
                                   id="topic-input-${block.id}"
                                   type="text"
                                   autocomplete="off"
                                   spellcheck="false"
                                   value="${topics.find(t => t.id === block.topicId)?.label || 'General'}"
                                   oninput="filterBlockTopics(${block.id}, this.value)"
                                   onfocus="openBlockTopicDropdown(${block.id})"
                                   onblur="closeBlockTopicDropdown(${block.id}, 300)"
                                   placeholder="Search skill…" />
                            <div class="block-topic-dropdown" id="topic-dropdown-${block.id}" style="display:none;"></div>
                        </div>
                        <button class="block-remove-btn" onclick="removeBlock(${block.id})" aria-label="Remove">
                            ${ICONS.get('x', 14)}
                        </button>
                    </div>

                    <div class="session-block-fields">
                        <div class="block-bullet-entry"
                             contenteditable="true"
                             data-block-id="${block.id}"
                             onfocus="normalizeBulletEntryOnFocus(this)"
                             onblur="normalizeBulletEntry(this)"
                             oninput="updateBlockBullets(${block.id}, this)"
                             >${bulletDivsHtml}</div>

                        ${sourcesHtml}

                        ${notesHtml}
                    </div>
                </div>
            </div>
    `;
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
                onmousedown="acceptSkillSuggestion(${blockId}, '${m.topicId}', '${m.label.replace(/'/g, "\'")}')">
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



function _topicMatchesQuery(topic, q) {
    if (!q) return true;
    const norm = normaliseStr(q);
    if (normaliseStr(topic.label).includes(norm)) return true;
    // For skill topics, also match english name and aliases
    if (topic.id.startsWith('skill:')) {
        const skillId = topic.id.replace('skill:', '');
        const skill = DATA.skills.find(s => s.id === skillId);
        if (!skill) return false;
        return normaliseStr(skill.english).includes(norm) ||
               (skill.aliases || []).some(a => normaliseStr(a).includes(norm));
    }
    return false;
}

function openBlockTopicDropdown(blockId) {
    filterBlockTopics(blockId, '');
}

function filterBlockTopics(blockId, query) {
    const dropdown = document.getElementById(`topic-dropdown-${blockId}`);
    const input    = document.getElementById(`topic-input-${blockId}`);
    if (!dropdown || !input) return;

    const topics = getBlockTopics();
    const matches = topics.filter(t => _topicMatchesQuery(t, query));

    if (!matches.length) {
        dropdown.style.display = 'none';
        return;
    }

    // Group results
    const groups = [
        { label: 'General',  items: matches.filter(t => t.group === 'General')  },
        { label: 'Category', items: matches.filter(t => t.group === 'Category') },
        { label: 'Skills',   items: matches.filter(t => t.group === 'Skills')   },
    ].filter(g => g.items.length);

    dropdown.innerHTML = groups.map(g => `
        <div class="block-topic-group-label">${g.label}</div>
        ${g.items.map(t => `
            <div class="block-topic-option"
                 onmousedown="selectBlockTopic(${blockId}, '${t.id}', '${t.label.replace(/'/g, "\'")}')">
                ${t.label}${t.sub ? `<span class="block-topic-option-sub"> — ${t.sub}</span>` : ''}
            </div>`).join('')}
    `).join('');

    dropdown.style.display = 'block';
}

function selectBlockTopic(blockId, topicId, label) {
    const input = document.getElementById(`topic-input-${blockId}`);
    if (input) input.value = label;
    const dropdown = document.getElementById(`topic-dropdown-${blockId}`);
    if (dropdown) dropdown.style.display = 'none';
    updateBlockTopic(blockId, topicId);
}

function closeBlockTopicDropdown(blockId, delay) {
    // Delay allows onmousedown on option to fire before blur hides dropdown
    setTimeout(() => {
        const dropdown = document.getElementById(`topic-dropdown-${blockId}`);
        const input    = document.getElementById(`topic-input-${blockId}`);
        if (!dropdown || dropdown.style.display === 'none') return;
        // If input is blank or doesn't match a topic, revert to current selection
        const block = getBlockById(blockId);
        if (block) {
            const topics = getBlockTopics();
            const current = topics.find(t => t.id === block.topicId);
            if (input && current) input.value = current.label;
        }
        dropdown.style.display = 'none';
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
    const blockEl = document.getElementById(`block-${blockId}`);
    if (!blockEl) return;
    const btn = blockEl.querySelector('.block-star-btn');
    if (btn) {
        btn.classList.toggle('active', block.isHighlight);
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
                  oninput="updateBlockField(${block.id}, 'notes', this.value); autoResizeCapped(this);"
                  >${block.notes || ''}</textarea>
        <button class="block-notes-toggle block-notes-toggle-open"
                onmousedown="toggleBlockNotes(${block.id})">hide notes</button>
    ` : `
        <button class="block-notes-toggle"
                onmousedown="toggleBlockNotes(${block.id})">
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
                     oninput="updateCorrectionBullet(${blockId}, ${ci}, this.innerText)"
                     onkeydown="handleCorrectionBulletKey(event, ${blockId}, ${ci})"
                     >${text}</div>
            </div>
            <button class="correction-bullet-delete"
                    onmousedown="deleteCorrectionBullet(${blockId}, ${ci})"
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
                     oninput="handleNewCorrectionBulletInput(event, ${blockId})"
                     onkeydown="handleCorrectionBulletKey(event, ${blockId}, ${corrList.length})"
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
            id:          ss.id,
            topicId:     'skill:' + ss.skillId,
            title:       ss.blockTitle || '',
            notes:       ss.notes || '',
            notesOpen:   ss.notes ? true : false,
            mode:        ss.mode || (corrections.some(c => c.type === 'praise') ? 'praise' : 'correction'),
            corrections: corrections.map(c => c.text),
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
    const now = Date.now();
    appState.timeline = appState.timeline || [];
    appState.timeline.unshift({
        id:       now,
        type,
        objectId,
        title,
        body,
        date:     date || new Date().toISOString().split('T')[0],
        createdAt: now,
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
        const blockId = parseInt(el.dataset.blockId, 10);
        const block = getBlockById(blockId);
        if (!block) return;
        const text = (el.innerText || '').replace(/\n+$/, '');
        if (text) block.text = text;
    });

    // Flush any pending new-bullet inputs — if the user typed in a correction
    // row and tapped Save without pressing Enter, capture it before processing.
    document.querySelectorAll('.correction-bullet-new .correction-bullet-input').forEach(el => {
        const text = el.innerText?.trim();
        if (!text) return;
        const blockId = parseInt(el.dataset.block, 10);
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
    let seq = 0; // monotonic sequence within this save — guarantees unique IDs
    const nextId = () => now + (++seq);

    // 1. Persist the Session object (no blocks — those become SessionSkills + Corrections)
    const session = {
        id:              s.id,
        date:            s.date,
        savedAt:         now,
        templateId:      s.templateId      || null,
        sessionName:     s.sessionName     || null,
        sessionLocation: s.sessionLocation || null,
        classType:       s.classType       || null,
        notes:           s.generalNotes    || null,
        isNote:          isNoteMode || null,
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
        const isSkill = block.topicId?.startsWith('skill:');
        const skillId = isSkill ? block.topicId.replace('skill:', '') : null;
        const blockCorrectionIds = [];

        // Resolve block text — new format uses block.text; legacy format uses corrections[]/praiseText/reflectionText
        const blockText = (block.text?.trim())
            || (Array.isArray(block.corrections) && block.corrections.filter(t => t?.trim()).join('\n'))
            || block.praiseText?.trim()
            || block.reflectionText?.trim()
            || '';

        const isCorrection = block.source === 'correction' || (!block.source && !!block.mode && block.mode === 'correction');

        // Save all non-empty lines as Correction objects regardless of source —
        // this is what renderDetailBlockHtml reads for session detail display.
        if (blockText) {
            const lines = blockText.split('\n').map(l => l.trim()).filter(Boolean);
            lines.forEach(text => {
                const correction = {
                    id:          nextId(),
                    skillId:     skillId || null,
                    text,
                    createdAt:   now,
                    sessionId:   session.id,
                    isHighlight: !!block.isHighlight,
                };
                appState.corrections.push(correction);
                blockCorrectionIds.push(correction.id);
            });
            // Only count towards the timeline "X corrections" label for correction-source blocks
            if (isCorrection) correctionCount += blockCorrectionIds.length;

            // Skill-linked observation blocks also write to skillNotes so they appear
            // in "my notes" on the skill detail page.
            if (isSkill && skillId && block.source === 'observation') {
                pendingSkillNotes.push({
                    id:          nextId(),
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
                id:            nextId(),
                sessionId:     session.id,
                skillId:       skillId || null,
                notes:         block.notes?.trim() || null,
                correctionIds: blockCorrectionIds,
                tracked:       true,
                blockTitle:    block.title?.trim() || null,
                source:        block.source || null,
                isHighlight:   !!block.isHighlight,
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
        const recent = appState.corrections.filter(
            c => c.skillId === sid && c.createdAt >= sixtyDaysAgo
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

    // Post-save prompts — non-blocking, shown after logger closes
    const uniqueSkillsWithCorrections = [...new Set(skillsWithCorrections)];
    if (!s._isEdit) {
        if (uniqueSkillsWithCorrections.length > 0) {
            // Correction promotion prompt takes priority
            const frequentSkills = uniqueSkillsWithCorrections.filter(skillId => {
                const count = appState.corrections.filter(c => c.skillId === skillId).length;
                return count >= 3;
            });
            const promptSkills = frequentSkills.length > 0 ? frequentSkills : uniqueSkillsWithCorrections;
            setTimeout(() => showPostSavePrompt(session.id, promptSkills, frequentSkills.length > 0), 400);
        } else {
            // No corrections — check if this is a ~5-session milestone for reflection prompt
            const sessionCount = appState.sessions.length;
            if (sessionCount > 1 && sessionCount % 5 === 0) {
                setTimeout(() => showReflectionPrompt(), 400);
            }
        }
    }
}

function showPostSavePrompt(sessionId, skillIds, isRecurring) {
    if (!skillIds.length) return;

    // Store skillIds globally so the button onclick can access without JSON encoding issues
    window._pendingGoalSkills = skillIds;

    const skillNames = skillIds
        .map(id => DATA.skills.find(s => s.id === id)?.french)
        .filter(Boolean);

    const existingPrompt = document.getElementById('post-save-prompt');
    if (existingPrompt) existingPrompt.remove();

    const prompt = document.createElement('div');
    prompt.id = 'post-save-prompt';
    prompt.className = 'post-save-prompt';

    const bodyText = isRecurring
        ? `You've logged corrections for <strong>${skillNames[0]}</strong> several times. Want to set a goal?`
        : `You logged corrections for:<br>${skillNames.map(n => `<strong>${n}</strong>`).join(', ')}`;

    prompt.innerHTML = `
        <div class="post-save-prompt-inner">
            <button class="post-save-dismiss" onclick="document.getElementById('post-save-prompt').remove()">${ICONS.get('x', 14)}</button>
            <div class="post-save-body">Session saved. ${bodyText}</div>
            <div class="post-save-actions">
                <button class="post-save-btn" onmousedown="openGoalFromPrompt(_pendingGoalSkills); document.getElementById('post-save-prompt')?.remove();">
                    add to goals
                </button>
                <button class="post-save-btn post-save-btn-muted" onclick="document.getElementById('post-save-prompt').remove()">
                    not now
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(prompt);

    // Auto-dismiss after 8 seconds
    setTimeout(() => prompt.remove(), 8000);
}

function openGoalFromPrompt(skillIds) {
    const skillId = skillIds[0];
    openGoalCreatorForSkill(skillId);
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
                <button class="btn-large session-save-btn" onmousedown="saveTimelineNoteEdit(${noteId})">save</button>
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
        id:           Date.now(),
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
        { key: 'exploreLearn', title: 'Explore Learn',         body: 'The skill library, glossary, and repertoire.',        onclick: 'navigateTo(\'learn\')' },
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
    let activeSkillsHtml = '';
    if (focusedSkills.length > 0) {
        activeSkillsHtml = `
            <div class="barre-section-header">
                <span class="barre-section-label">corrections in focus</span>
                <div style="display:flex;align-items:center;gap:var(--sp-md);">
                    <span class="barre-section-count">${focusedSkills.length}</span>
                    ${focusedSkills.length > 3 ? '<button class="barre-see-all-btn" onclick="showFocusSkillsSheet()">see all →</button>' : ''}
                </div>
            </div>
            <div style="padding: 0 var(--sp-lg); margin-bottom: var(--sp-md);">
                <div style="display:flex;gap:var(--sp-xs);margin-bottom:var(--sp-md);">
                    <button class="skill-corr-filter barre-focus-filter active" onmousedown="filterBarreSkills('all', this)">All</button>
                    <button class="skill-corr-filter barre-focus-filter" onmousedown="filterBarreSkills('recurring', this)">Recurring</button>
                </div>
                <div style="display: flex; flex-direction: column; gap: var(--sp-sm);" id="active-skills-list">
                    ${renderActiveSkillsList(displaySkills)}
                </div>
            </div>
        `;
    }

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
                            <div class="skill-category-arrow">→</div>
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
    { id: 'barre',       label: 'Barre' },
    { id: 'centre',      label: 'Centre' },
    { id: 'turns',       label: 'Turns' },
    { id: 'allegro',     label: 'Allegro' },
    { id: 'flexibility', label: 'Flexibility' },
    { id: 'pointe',      label: 'Pointe' },
    { id: 'musicality',  label: 'Musicality' },
    { id: 'knowledge',   label: 'Knowledge' },
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
                <div class="barre-empty-title">No goals yet</div>
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

    if (completedGoals.length) {
        const startCollapsed = completedGoals.length >= 2;
        goalsHtml += `
            <button class="goals-completed-header" onmousedown="
                const body = this.nextElementSibling;
                body.classList.toggle('collapsed');
            ">
                <span>completed</span>
                <span class="goals-completed-count">${completedGoals.length}</span>
            </button>
            <div class="goals-completed-body ${startCollapsed ? 'collapsed' : ''}">
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
            ${goals.length > 0 ? `<div style="text-align:center; margin-top: var(--sp-xl);"><button class="text-link-btn" onclick="showAllGoalsScreen()">view past goals →</button></div>` : ''}
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

    const TYPE_LABELS   = { skill: 'Skill', intention: 'Feeling / state', habit: 'Habit' };
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
        <div class="profile-header" style="display:flex;align-items:center;gap:var(--sp-md);">
            <button class="back-btn" onclick="goBack()">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="13 4 7 10 13 16"/></svg>
            </button>
            <h1>All goals</h1>
        </div>
        <div style="padding: 0 var(--sp-lg); margin-bottom: 120px;">
            ${allGoals.length === 0
                ? '<div class="barre-empty-state"><div class="barre-empty-title">No goals yet</div></div>'
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
    const opts = dt.getFullYear() === now.getFullYear()
        ? { day: 'numeric', month: 'short' }
        : { day: 'numeric', month: 'short', year: 'numeric' };
    return dt.toLocaleDateString('en-GB', opts);
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

    const tagsHtml = [
        typeLabel ? `<span class="goal-tag goal-tag-type">${typeLabel}</span>` : null,
        linkedSkill ? `<span class="goal-tag goal-tag-skill">${linkedSkill.french}</span>` : null,
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
                <button class="goal-swipe-btn goal-swipe-pause" onmousedown="pauseGoal(${goal.id})">pause</button>
                <button class="goal-swipe-btn goal-swipe-letgo" onmousedown="letGoGoal(${goal.id})">let it go</button>
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
                                return ` <span class="goal-card-expiry${nearClass}">· expires ${expStr}</span>`;
                            })()}
                        </div>
                        ${!completed ? `<button class="goal-edit-btn" onmousedown="openGoalEditor(${goal.id})">edit</button>` : ''}
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
    const goal = appState.goals.find(g => g.id === Number(goalId));
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
        const selectedSkillLabel = selectedSkill ? selectedSkill.french : '';

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
            <button type="button" class="goal-type-tab ${d.goalType === 'intention' ? 'active' : ''}" data-type="intention">A feeling or state</button>
            <button type="button" class="goal-type-tab ${d.goalType === 'habit' ? 'active' : ''}" data-type="habit">A habit</button>
        </div>
    ` : '';

    let bodyHtml = '';
    if (d.goalType === 'skill') bodyHtml = skillFormHtml();
    else if (d.goalType === 'intention') bodyHtml = intentionFormHtml();
    else if (d.goalType === 'habit') bodyHtml = habitFormHtml();
    if (bodyHtml && d._editId) {
        bodyHtml += `<div style="margin-top: var(--sp-xl); text-align: center;"><button class="goal-delete-btn" onmousedown="deleteGoal(${d._editId})">delete goal</button></div>`;
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
    const q = (query || '').toLowerCase().trim();
    const skills = (appState.skills || []).filter(s => !(appState.hidePointe && s.dimensionId === 'pointe'));
    const matches = q.length >= 1
        ? skills.filter(s =>
            s.french.toLowerCase().includes(q) ||
            (s.english || '').toLowerCase().includes(q) ||
            (s.aliases || []).some(a => a.toLowerCase().includes(q))
          )
        : skills.slice(0, 24);

    if (!matches.length) {
        dropdown.style.display = 'none';
        return;
    }

    dropdown.innerHTML = matches.map(s => `
        <div class="block-topic-option"
             onmousedown="selectGoalSkill('${escapeHtml(s.id)}', '${escapeHtml(s.french).replace(/'/g, "\\'")}')">
            ${escapeHtml(s.french)}${s.english ? `<span class="block-topic-option-sub"> — ${escapeHtml(s.english)}</span>` : ''}
        </div>
    `).join('');
    dropdown.style.display = 'block';
}

function selectGoalSkill(skillId, label) {
    const d = appState._goalDraft;
    if (!d) return;
    d.skillId = skillId;
    const input = document.getElementById('goal-skill-input');
    if (input) input.value = label;
    const dropdown = document.getElementById('goal-skill-dropdown');
    if (dropdown) dropdown.style.display = 'none';
}

function clearGoalSkill() {
    const d = appState._goalDraft;
    if (!d) return;
    d.skillId = null;
    const input = document.getElementById('goal-skill-input');
    if (input) { input.value = ''; input.focus(); }
    const dropdown = document.getElementById('goal-skill-dropdown');
    if (dropdown) { dropdown.style.display = 'none'; }
    filterGoalSkills('');
}

function addProgressMarker() {
    const d = appState._goalDraft;
    if (!d) return;
    d.progressMarkers.push({ id: Date.now(), text: '', done: false });
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
    appState._goalDraft.milestones.push({ id: Date.now(), text: '', done: false });
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
                    <div class="goal-correction-suggestion" onmousedown="linkCorrectionToGoal(${c.id})">
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
        id:               isEdit ? d._editId : Date.now(),
        title:            d.title.trim(),
        body:             d.body?.trim()  || null,
        createdAt:        existingGoal?.createdAt || Date.now(),
        dueDate:          d.dueDate       || null,
        skillId:          d.skillId       || null,
        dimensionId:      d.dimensionId   || null,
        category:         d.category      || null,
        correctionIds:    d.correctionIds || [],
        milestones:       (d.milestones || []).filter(m => m.text?.trim()).map(m => ({
            id:   m.id || Date.now(),
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
            id:   m.id || Date.now(),
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
    const goal = appState.goals.find(g => g.id === Number(goalId));
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
    const goal = appState.goals.find(g => g.id === Number(goalId));
    if (!goal) return;
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

function reopenGoal(goalId) {
    const goal = appState.goals.find(g => g.id === Number(goalId));
    if (!goal) return;
    goal.status = 'active';
    goal.completedAt = null;
    storage.save('goals', appState.goals);
    if (appState.currentScreen === 'goals-screen') renderGoalsScreen();
    if (appState.currentScreen === 'profile') initProfile();
}

function pauseGoal(goalId) {
    const goal = appState.goals.find(g => g.id === Number(goalId));
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
    const goal = appState.goals.find(g => g.id === Number(goalId));
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
    appState.goals = appState.goals.filter(g => g.id !== Number(goalId));
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
            <button class="learn-chip" data-filter="pointers" onclick="filterLearnScreen('pointers', this)">Pointers</button>
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
        else if (section.id === 'glossary') action = 'showGlossary()';
        else if (section.id === 'pointers') action = "filterLearnScreen('pointers')";
        else action = `showLearnSection('${section.id}')`;
        const count = section.id === 'skills' ? DATA.skills.length + ' skills'
                    : section.id === 'glossary' ? ''
                    : section.id === 'pointers' ? section.items.length + ' pointers'
                    : section.items.length + ' entries';
        return `
        <div class="skill-category-card" style="margin-bottom: var(--sp-sm);" onclick="${action}">
            <div class="skill-category-icon">${ICONS.get(section.icon, 24)}</div>
            <div class="skill-category-info">
                <div class="skill-category-name">${section.name}</div>
                ${count ? `<div class="skill-category-count">${count}</div>` : ''}
                <div style="font-size: var(--fs-small); color: var(--text-muted); margin-top: 2px; line-height: 1.4;">${section.desc}</div>
            </div>
            <div class="skill-category-arrow">→</div>
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
            <div class="skill-category-arrow">→</div>
        </div>`).join('');
}

function filterLearnScreen(filter, btn) {
    document.querySelectorAll('#learn-filter-chips .learn-chip').forEach(b => b.classList.remove('active'));
    const activeChip = btn || document.querySelector('#learn-filter-chips [data-filter="' + filter + '"]');
    if (activeChip) activeChip.classList.add('active');
    const list = document.getElementById('learn-sections-list');
    if (!list) return;
    const helperText = filter === 'all'
        ? '<p class="learn-helper-text">Search across all sections, or tap a card to explore.</p>'
        : '<p class="learn-helper-text">Diagnostic articles to help identify what\'s holding you back.</p>';
    list.innerHTML = helperText + (filter === 'pointers' ? renderPointerCards() : renderLearnSectionCards());
}

function showPointerDetail(index) {
    const section = DATA.learnSections.find(s => s.id === 'pointers');
    if (!section) return;
    const pointer = section.items[index];
    if (!pointer) return;

    const screenId = `pointer-detail-${index}`;
    let screen = document.getElementById(screenId);
    if (!screen) {
        screen = document.createElement('div');
        screen.id = screenId;
        screen.className = 'screen';
        document.querySelector('.app-container').appendChild(screen);
    }

    screen.innerHTML = `
        <div class="skill-detail-header">
            <button class="session-detail-back" onclick="navigateTo('learn')">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="13 4 7 10 13 16"/>
                </svg>
                learn
            </button>
        </div>
        <div class="skill-detail-hero">
            <div class="pointer-eyebrow" style="font-size: var(--fs-small);">pointer</div>
            <h1 class="skill-detail-title" style="font-size: var(--fs-display);">${pointer.name}</h1>
            <p style="font-size: var(--fs-body); color: var(--ink-3); margin-top: var(--sp-sm); line-height: 1.5;">${pointer.question}</p>
        </div>
        <div class="skill-know-section">
            <div class="skill-know-section-label" style="color: var(--ink-5);">the insight</div>
            <p class="skill-know-description">${pointer.insight}</p>
        </div>
        <div class="skill-know-section">
            <div class="skill-know-section-label" style="color: var(--ink-5);">what to try</div>
            <ul class="skill-know-list">
                ${pointer.whatToTry.map(t => `<li class="skill-know-list-item">${t}</li>`).join('')}
            </ul>
        </div>
        ${pointer.inspiration ? `
        <div class="skill-know-section">
            <div class="skill-know-section-label" style="color: var(--ink-5);">the inspiration</div>
            <p class="skill-know-description">${pointer.inspiration}</p>
        </div>` : ''}
        <div style="height: 120px;"></div>
    `;
    showScreen(screenId);
}

function showLearnSection(sectionId) {
    const section = DATA.learnSections.find(s => s.id === sectionId);
    if (!section) return;

    const screenId = `learn-section-${sectionId}`;
    let screen = document.getElementById(screenId);
    if (!screen) {
        screen = document.createElement('div');
        screen.id = screenId;
        screen.className = 'screen';
        document.querySelector('.app-container').appendChild(screen);
    }

    const items = section.items || [];
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
            <button class="session-detail-back" onclick="navigateTo('learn')">
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
    let screen = document.getElementById(screenId);
    if (!screen) {
        screen = document.createElement('div');
        screen.id = screenId;
        screen.className = 'screen';
        document.querySelector('.app-container').appendChild(screen);
    }

    screen.innerHTML = `
        <div class="skill-detail-header">
            <button class="session-detail-back" onclick="showLearnSection('${sectionId}')">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="13 4 7 10 13 16"/>
                </svg>
                back
            </button>
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
                ${item.keyPoints.map(p => `<li class="skill-know-list-item">${p}</li>`).join('')}
            </ul>
        </div>` : ''}
        <div style="height: 120px;"></div>
    `;
    showScreen(screenId);
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

    // Determine last-worked-on date per skill
    function lastWorkedOn(skillId) {
        const sessIds = new Set(
            (appState.corrections || [])
                .filter(c => c.skillId === skillId)
                .map(c => c.sessionId)
                .filter(Boolean)
        );
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
        .map(id => ({ ref: DATA.skills.find(s => s.id === id), lastDate: lastWorkedOn(id) }))
        .filter(s => s.ref)
        .sort((a, b) => (b.lastDate || '').localeCompare(a.lastDate || ''));

    const itemsHtml = skills.map(({ ref, lastDate }) => {
        const cat = (DATA.skillCategories || {})[ref.id] || ref.category || '';
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

    if (d.toDateString() === today.toDateString()) return 'Today';
    if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
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
        ...(appState.timeline || []).map(e => ({ ...e, _noteEntry: false })),
        ...noteEntries,
    ].sort((a, b) => {
        const dateA = a.date || new Date(a.createdAt || 0).toISOString().split('T')[0];
        const dateB = b.date || new Date(b.createdAt || 0).toISOString().split('T')[0];
        if (dateB !== dateA) return dateB.localeCompare(dateA);
        return (b.createdAt || 0) - (a.createdAt || 0);
    });
}

function renderTimelineEntry(entry) {
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
                    <button class="timeline-note-btn" onmousedown="editTimelineNote(${entry.id})">edit</button>
                    <button class="timeline-note-btn timeline-note-btn-delete" onmousedown="deleteTimelineNote(${entry.id})">delete</button>
                </div>
            </div>
        </div>`;
    }
    const isPraise   = entry.isPraise;
    const isNote     = entry.type === 'note';
    const isTappable = (entry.type === 'session' || isNote) && entry.objectId;
    const typeKey    = isPraise ? 'praise' : (entry.type || 'manual');
    const typeLabels = { session: 'Session', note: 'Note', milestone: 'Milestone', assessment: 'Assessment', praise: 'Praise \u2605', manual: '' };
    const typeLabel  = typeLabels[typeKey] || '';
    const hasHighlight = entry.type === 'session' && entry.objectId &&
        appState.sessionSkills.some(ss => ss.sessionId === entry.objectId && ss.isHighlight);
    const tapAction  = isNote ? `showNoteDetail(${entry.objectId})` : `showSessionDetail(${entry.objectId})`;
    return `
    <div class="timeline-item timeline-item-${typeKey} ${isTappable ? 'timeline-item-tappable' : ''}"
         ${isTappable ? `onclick="${tapAction}"` : ''}>
        <div class="timeline-content">
            ${typeLabel ? `<span class="timeline-type-label">${typeLabel}</span>` : ''}
            <div class="timeline-title ${isPraise ? 'timeline-praise-text' : ''}">${entry.title}</div>
            ${entry.body ? `<div class="timeline-subtitle">${entry.body}${hasHighlight ? ` <span class="timeline-star">${ICONS.get('star-fill', 11)}</span>` : ''}</div>` : ''}
            ${isTappable ? `<div class="timeline-tap-hint">tap to review \u2192</div>` : ''}
        </div>
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
    const level = appState.level || 'not-assessed';
    const firstEntryText = (level === 'not-assessed' || !appState.level)
        ? 'Joined pli\u00e9'
        : `Completed placement quiz \u2014 ${(DATA.levelLabels[level] || 'BEGINNER').charAt(0) + (DATA.levelLabels[level] || 'BEGINNER').slice(1).toLowerCase()}`;

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
                ${entries.length > 0
                    ? renderGroupedTimelineHtml(entries, firstEntryText)
                    : '<p class="learn-empty" style="padding: var(--sp-lg) 0;">No activity yet.</p>'}
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
        editAction = `openNoteEditor(${sessionId})`;
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
                <div class="detail-block-header">
                    <span class="detail-block-topic">General</span>
                </div>
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
                <div class="session-detail-section-label">Notes &amp; corrections</div>
                <div class="session-detail-blocks">
                    ${sessionNotesHtml}
                    ${blocksHtml}
                </div>
            </div>`;
        editAction = `openSessionEditor(${sessionId})`;
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
        id:           session.id,
        date:         session.date,
        generalNotes: session.notes || '',
        blocks:       [],
        _mode:        'note',
        _isEdit:      true,
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
    const skill = sessionSkill.skillId ? DATA.skills.find(s => s.id === sessionSkill.skillId) : null;
    const corrections = (sessionSkill.correctionIds || [])
        .map(id => appState.corrections.find(c => c.id === id))
        .filter(Boolean);
    const source = sessionSkill.source || sessionSkill.mode || null;
    const hasCorrections = corrections.length > 0;
    const isHighlight = !!(sessionSkill.isHighlight || corrections.some(c => c.isHighlight));

    if (!skill && !sessionSkill.notes && !hasCorrections) return '';

    const borderClass = isHighlight        ? 'note-block--highlight'
                      : hasCorrections     ? 'note-block--correction'
                      : 'note-block--observation';
    const bgClass = (isHighlight && !skill) ? ' note-block--gold-bg' : '';

    // Skill row — shown only when a skill is linked
    const starBtn = `<button class="note-block-star${isHighlight ? ' active' : ''}" onmousedown="toggleDetailBlockHighlight(${sessionSkill.id})">${isHighlight ? ICONS.get('star-fill', 14) : ICONS.get('star', 14)}</button>`;
    let skillRowHtml = '';
    if (skill) {
        skillRowHtml = `
            <div class="note-block-skill-row">
                <span class="note-block-skill-name">${skill.french}</span>
                <span class="note-block-skill-right">${starBtn}<button class="note-block-view-link" onclick="showSkillDetail('${skill.id}', appState.currentScreen)">view →</button></span>
            </div>`;
    } else if (isHighlight) {
        skillRowHtml = `
            <div class="note-block-highlight-row">
                ${starBtn}
                <span class="note-block-highlight-label">highlight</span>
            </div>`;
    } else {
        skillRowHtml = `
            <div class="note-block-highlight-row note-block-highlight-row--inactive">
                ${starBtn}
            </div>`;
    }

    // Free text body
    const bodyHtml = sessionSkill.notes ? `
        <div class="note-block-body">
            <div class="note-block-body-text" id="nbt-${sessionSkill.id}">${nl2br(sessionSkill.notes)}</div>
            <button class="note-block-see-more" id="nbm-${sessionSkill.id}"
                    onclick="expandBlockBody(${sessionSkill.id})" style="display:none;">see more</button>
            <button class="note-block-see-more" id="nbh-${sessionSkill.id}"
                    onclick="collapseBlockBody(${sessionSkill.id})" style="display:none;">hide</button>
        </div>` : '';

    // Bullets
    const isObs = source === 'observation';
    const bulletsHtml = hasCorrections ? `
        <div class="note-block-bullets">
            ${corrections.map(c => `
                <div class="note-block-bullet${isObs ? ' note-block-bullet--obs' : ''}">
                    <span class="note-block-dash">—</span><span class="note-block-bullet-text">${c.text}</span>
                </div>`).join('')}
        </div>` : '';

    return `
        <div class="note-block ${borderClass}${bgClass}" id="note-block-${sessionSkill.id}">
            ${skillRowHtml}${bodyHtml}${bulletsHtml}
        </div>`;
}

function toggleDetailBlockHighlight(sessionSkillId) {
    const ss = appState.sessionSkills.find(s => s.id === sessionSkillId);
    if (!ss) return;
    const corrections = (ss.correctionIds || [])
        .map(id => appState.corrections.find(c => c.id === id))
        .filter(Boolean);
    const newState = !(ss.isHighlight || corrections.some(c => c.isHighlight));
    ss.isHighlight = newState;
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
    const allCorrections = appState.corrections
        .filter(c => c.skillId === skillId)
        .sort((a, b) => b.createdAt - a.createdAt);

    const CORRECTIONS_PREVIEW = 3;
    const hasMore = allCorrections.length > CORRECTIONS_PREVIEW;
    const visibleCorrections = allCorrections.slice(0, CORRECTIONS_PREVIEW);

    const correctionsHtml = allCorrections.length === 0
        ? `<div class="skill-detail-empty-state">No corrections logged yet. Add them when logging a session.</div>`
        : `
            <div id="skill-corrections-list">
                ${renderSkillCorrectionsGrouped(visibleCorrections)}
            </div>
            ${hasMore ? `
                <button class="skill-see-more-btn" id="skill-see-more"
                        onclick="expandSkillCorrections('${skillId}')">
                    see all ${allCorrections.length} corrections
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
                        <button class="skill-note-delete" onclick="deleteSkillNote(${n.id}, '${skillId}')">×</button>
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
        .filter(ss => ss.skillId === skillId)
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
                <div class="skill-progression-label">last worked on</div>
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
    const corrFilterHtml = allCorrections.length > 1 ? `
        <div class="skill-correction-filters" id="skill-corr-filters">
            <button class="skill-corr-filter active" data-filter="all"
                    onclick="filterSkillCorrections('${skillId}', 'all', this)">All</button>
            ${allCorrections.some(c => c.isRecurring) ? `
            <button class="skill-corr-filter" data-filter="recurring"
                    onclick="filterSkillCorrections('${skillId}', 'recurring', this)">Recurring</button>` : ''}
            ${(appState.goals || []).some(g => (g.correctionIds || []).some(id => allCorrections.find(c => c.id === id))) ? `
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
                <div class="skill-detail-category">${refSkill.category}</div>
                <h1 class="skill-detail-title">${refSkill.french}</h1>
                <div class="skill-detail-phonetic">${refSkill.phonetic}</div>
                <div class="skill-detail-english">${refSkill.english}</div>
                <div class="skill-detail-meta-row">
                    ${sessionCount > 0 ? `<span class="skill-detail-session-count">worked on ${sessionCount} time${sessionCount !== 1 ? 's' : ''}</span>` : ''}
                    ${lastSession ? `<span class="skill-detail-last-worked">last: ${formatTimelineDate(lastSession.date)}</span>` : ''}
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
                    <span class="skill-detail-section-count">${allCorrections.length}</span>
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
            <div class="note-block note-block--highlight note-block--gold-bg" id="hl-${item.type}-${item.id}">
                <div class="note-block-highlight-row">
                    <button class="note-block-star active"
                            onmousedown="toggleSkillHighlightItem('${item.type}', ${item.id}, '${skillId}')">${ICONS.get('star-fill', 14)}</button>
                    <span class="note-block-highlight-label">${dateStr}</span>
                </div>
                ${bodyHtml}${bulletsHtml}
            </div>`;
    }).join('');

    return `
        <div class="skill-detail-section" id="skill-highlights-section-${skillId}">
            <div class="skill-detail-section-header">
                <div class="skill-detail-section-label" style="color: var(--ink-5);">Highlights</div>
            </div>
            ${blocksHtml}
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

function toggleSkillHighlightItem(type, id, skillId) {
    if (type === 'ss') {
        const ss = appState.sessionSkills.find(s => s.id === id);
        if (!ss) return;
        ss.isHighlight = false;
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

function renderSkillCorrectionsGrouped(corrections) {
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
            ? `<button class="skill-corr-source" onmousedown="showSessionDetail(${group.sessionId})">${session.sessionName || 'Session'} →</button>`
            : '';
        const itemsHtml = items.map(c => `
            <div class="skill-corr-item${c.isRecurring ? ' is-recurring' : ''}">
                <div class="skill-corr-text">&ldquo;${c.text}&rdquo;</div>
                ${c.isRecurring ? `<span class="skill-correction-recurring">recurring</span>` : ''}
            </div>
        `).join('');
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

    list.innerHTML = renderSkillCorrectionsGrouped(allCorrections);
    if (btn) btn.remove();
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
                <button class="skill-note-delete" onclick="deleteSkillNote(${n.id}, '${skillId}')">×</button>
            </div>
            <div class="skill-note-text">${renderClampedHtml(nl2br(n.text), 'sn-' + n.id)}</div>
        </div>
    `).join('');
    // Remove the see more button
    list.nextElementSibling?.remove();
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
        id:        Date.now(),
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
        .filter(c => c.skillId === skillId)
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
        <div id="skill-corr-list">${renderSkillCorrectionsGrouped(filtered.slice(0, PREVIEW))}</div>
        ${hasMore ? `<button class="skill-see-more-btn"
            onclick="expandFilteredCorrections('${skillId}', '${filter}')">
            see all ${filtered.length} corrections
        </button>` : ''}
    `;
}

function expandFilteredCorrections(skillId, filter) {
    const all = appState.corrections
        .filter(c => c.skillId === skillId)
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
    if (list) list.innerHTML = renderSkillCorrectionsGrouped(filtered);
    // Remove see-more button
    const btn = document.querySelector('#skill-corrections-display .skill-see-more-btn');
    if (btn) btn.remove();
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
                        <button class="skill-note-delete" onclick="deleteSkillNote(${n.id}, '${skillId}')">×</button>
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
                        <div class="skill-category-arrow">→</div>
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
        if (appState.hidePointe && ref.dimensionId === 'pointe') return false;
        // Filter by dimension if set
        if (_skillLibDimFilter && ref.dimension !== _skillLibDimFilter) {
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
        if (!categories[ref.category]) categories[ref.category] = [];
        categories[ref.category].push(ref);
    });

    const categoryOrder = ['Barre Work', 'Centre Work', 'Turns', 'Jumps', 'Allegro', 'Pointe'];
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
            <h2 class="skill-lib-category-title">${cat}</h2>
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
    const isTracked = user?.tracked || false;
    const hasNotes = (appState.skillNotes || []).some(n => n.skillId === ref.id);
    const correctionCount = appState.corrections.filter(c => c.skillId === ref.id).length;

    // Highlight matching text
    const displayName = query ? highlightMatch(ref.french, query) : ref.french;
    const displayEnglish = query ? highlightMatch(ref.english, query) : ref.english;

    return `
        <div class="skill-lib-card" onclick="showSkillKnowledgePage('${ref.id}', 'skill-library-screen')">
            <div class="skill-lib-card-main">
                <div class="skill-lib-card-name">
                    ${displayName}
                    ${correctionCount > 0 ? `<span class="skill-lib-inline-count"><span class="skill-lib-indicator-count">${correctionCount}</span></span>` : ''}
                </div>
                ${query && displayEnglish !== ref.english ? `<div class="skill-lib-card-english">${displayEnglish}</div>` : ''}
            </div>
            <div class="skill-lib-card-meta">
                <span class="difficulty-badge difficulty-${ref.difficulty}">${ref.difficulty}</span>
                <div class="skill-lib-card-indicators">
                    ${isFlagged ? `<span class="skill-lib-indicator" title="In focus">${ICONS.get('flag', 10)}</span>` : ''}
                    ${hasNotes ? `<span class="skill-lib-indicator" title="Has notes">${ICONS.get('edit', 10)}</span>` : ''}
                </div>
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
};

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
        ? knowledge.keyCues.map((cue, i) => `
            <li class="skill-know-list-item skill-know-tappable"
                onclick="showKnowledgeItemPopover(this, '${skillId}', ${JSON.stringify(cue).replace(/'/g, "&#39;")}, 'note')">
                ${cue}
                <span class="skill-know-save-hint">tap to save</span>
            </li>`).join('')
        : '<li class="skill-know-list-item skill-know-stub">Content coming soon</li>';

    const correctionsHtml = knowledge.commonCorrections.length > 0
        ? knowledge.commonCorrections.map((c, i) => `
            <li class="skill-know-list-item skill-know-correction skill-know-tappable"
                onclick="showKnowledgeItemPopover(this, '${skillId}', ${JSON.stringify(c).replace(/'/g, "&#39;")}, 'correction')">
                ${c}
                <span class="skill-know-save-hint">tap to save</span>
            </li>`).join('')
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
                <button class="skill-know-personal-btn" onclick="showSkillDetail('${skillId}', '${screenId}')">
                    my ${ref.french} →
                </button>
            </div>

            <!-- Hero -->
            <div class="skill-detail-hero">
                <div class="skill-detail-category">${ref.category}</div>
                <h1 class="skill-detail-title">${ref.french}</h1>
                <div class="skill-know-meta-row">
                    <span class="skill-detail-phonetic">${ref.phonetic}</span>
                    <span class="skill-know-meta-dot">·</span>
                    <span class="skill-detail-english">${ref.english}</span>
                    <span class="skill-know-meta-dot">·</span>
                    <span class="skill-know-difficulty">${ref.difficulty}</span>
                </div>
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
                <p class="skill-know-text">${knowledge.musicality}</p>
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

            <div style="height: 120px;"></div>
        </div>
    `;

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
            id:          now,
            skillId,
            text,
            createdAt:   now,
            sessionId:   null,
            source:      'self',
            type:        'technical',
            isRecurring: false,
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
   All terms from the skill library + musicality vocabulary.
   Definitions to be completed — marked as such.
   ═══════════════════════════════════════════════════════════════ */

// Musicality and theory terms not covered by skill pages
const GLOSSARY_MUSIC_TERMS = [
    { term: 'Bar',          category: 'Musicality' },
    { term: 'Beat',         category: 'Musicality' },
    { term: 'Count',        category: 'Musicality' },
    { term: 'Downbeat',     category: 'Musicality' },
    { term: 'Dynamics',     category: 'Musicality' },
    { term: 'Phrase',       category: 'Musicality' },
    { term: 'Tempo',        category: 'Musicality' },
    { term: 'Upbeat',       category: 'Musicality' },
    // Ballet vocabulary
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
    { term: 'Port de bras', category: 'Technique'  },
    { term: 'Relevé',       category: 'Technique'  },
    { term: 'Retiré',       category: 'Position'   },
    { term: 'Spotting',     category: 'Technique'  },
    { term: 'Turnout',      category: 'Foundation' },
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

    // Merge with music/vocabulary terms
    const all = [...skillTerms, ...GLOSSARY_MUSIC_TERMS];

    // Sort alphabetically, stripping leading accents for sort key
    return all.sort((a, b) => normaliseStr(a.term).localeCompare(normaliseStr(b.term)));
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
                <div class="glossary-term-row ${t._isSkill ? 'glossary-term-skill' : ''}"
                     ${t._isSkill ? `onclick="showSkillKnowledgePage('${t.skillId}', 'glossary-screen')"` : ''}>
                    <div class="glossary-term-main">
                        <span class="glossary-term-name">${t.term}</span>
                        ${t.alt ? `<span class="glossary-term-alt">${t.alt}</span>` : ''}
                    </div>
                    <div class="glossary-term-meta">
                        <span class="glossary-term-category">${t.category || ''}</span>
                        ${t._isSkill
                            ? `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><polyline points="4 2 8 6 4 10"/></svg>`
                            : `<span class="glossary-term-stub">definition coming soon</span>`}
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
            <button class="session-detail-back" onclick="navigateTo('learn')">
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
