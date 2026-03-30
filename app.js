'use strict';

/* ═══════════════════════════════════════════════════════════════
   ICON MAP
   All SVG icons in one place. Data objects reference keys.
   Render with: ICONS.get('key') or ICONS.get('key', 20) for size.
   All icons: stroke="currentColor", inherit colour from parent.
═══════════════════════════════════════════════════════════════ */
const ICONS = {
    _svg(paths, size = 24, extra = '') {
        return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${extra}>${paths}</svg>`;
    },
    get(key, size = 24) {
        const fn = this[key];
        return fn ? fn.call(this, size) : this._svg('', size);
    },

    profile: (s) => ICONS._svg(
        '<circle cx="12" cy="8" r="4"/>' +
        '<path d="M4 20 C4 16 8 13 12 13 C16 13 20 16 20 20"/>', s),

    // ── Navigation ──────────────────────────────────────────────
    barre: (s) => ICONS._svg(
        // Horizontal barre with a leg extending up — simplified dance pose
        '<line x1="3" y1="13" x2="21" y2="13"/>' +
        '<circle cx="8" cy="13" r="1.2" fill="currentColor" stroke="none"/>' +
        '<path d="M10 13 C10 9 12 6 12 5"/>' +
        '<path d="M10 13 C9 17 7 20 6 21"/>' +
        '<path d="M10 13 C12 11 15 10 16 9"/>', s),

    assess: (s) => ICONS._svg(
        // Clipboard / assessment sheet
        '<rect x="4" y="3" width="16" height="18" rx="2"/>' +
        '<line x1="8" y1="8" x2="16" y2="8"/>' +
        '<line x1="8" y1="12" x2="14" y2="12"/>' +
        '<line x1="8" y1="16" x2="12" y2="16"/>', s),

    goals: (s) => ICONS._svg(
        // Target / bullseye
        '<circle cx="12" cy="12" r="9"/>' +
        '<circle cx="12" cy="12" r="5"/>' +
        '<circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>', s),

    learn: (s) => ICONS._svg(
        // Open book / mortarboard
        '<path d="M2 5 L12 9 L22 5"/>' +
        '<path d="M12 9 L12 20"/>' +
        '<path d="M4 6.5 L4 15 C4 15 8 18 12 18 C16 18 20 15 20 15 L20 6.5"/>', s),

    profile: (s) => ICONS._svg(
        '<circle cx="12" cy="8" r="4"/>' +
        '<path d="M4 20 C4 16 8 13 12 13 C16 13 20 16 20 20"/>', s),

    // ── Skill categories ────────────────────────────────────────
    'cat-barre': (s) => ICONS._svg(
        // Barre rail — horizontal line with support posts
        '<line x1="2" y1="10" x2="22" y2="10" stroke-width="2.2"/>' +
        '<line x1="6" y1="10" x2="6" y2="20"/>' +
        '<line x1="18" y1="10" x2="18" y2="20"/>' +
        '<line x1="3" y1="20" x2="21" y2="20"/>', s),

    'cat-centre': (s) => ICONS._svg(
        // Four arrows expanding from centre — open space
        '<line x1="12" y1="12" x2="19" y2="5"/>' +
        '<polyline points="14 5 19 5 19 10"/>' +
        '<line x1="12" y1="12" x2="5" y2="19"/>' +
        '<polyline points="10 19 5 19 5 14"/>', s),

    'cat-turns': (s) => ICONS._svg(
        // Circular arrow — rotation
        '<path d="M20 12 A8 8 0 1 1 13 4.1"/>' +
        '<polyline points="13 2 13 6 17 6"/>', s),

    'cat-allegro': (s) => ICONS._svg(
        // Upward arc — jump
        '<path d="M5 18 C5 18 7 8 12 6 C17 8 19 18 19 18"/>' +
        '<line x1="8" y1="18" x2="16" y2="18"/>', s),

    'cat-pointe': (s) => ICONS._svg(
        // Pointed foot silhouette — simplified
        '<path d="M8 4 L8 16 C8 18 10 20 13 20 C16 20 17 18 17 17 C17 15 15 14 12 15"/>' +
        '<line x1="5" y1="4" x2="11" y2="4"/>', s),

    'cat-flexibility': (s) => ICONS._svg(
        // Side stretch / arc
        '<path d="M5 18 C5 12 8 7 12 6"/>' +
        '<path d="M12 6 C16 7 19 11 20 16"/>' +
        '<circle cx="12" cy="6" r="1.5" fill="currentColor" stroke="none"/>', s),

    // ── Learn cards ─────────────────────────────────────────────
    'learn-quiz': (s) => ICONS._svg(
        // Question mark in circle
        '<circle cx="12" cy="12" r="9"/>' +
        '<path d="M9.5 9 C9.5 7.3 10.6 6 12 6 C13.4 6 14.5 7.1 14.5 8.5 C14.5 10.5 12 11 12 13"/>' +
        '<circle cx="12" cy="16.5" r="0.8" fill="currentColor" stroke="none"/>', s),

    'learn-footwork': (s) => ICONS._svg(
        // Foot / relevé — simplified
        '<path d="M8 5 L8 15 C8 17 9.5 19 12 19 C14.5 19 16 17.5 16 16.5 C16 15 14.5 14 12 14.5"/>' +
        '<line x1="5" y1="5" x2="11" y2="5"/>', s),

    'learn-splits': (s) => ICONS._svg(
        // Figure with legs extended — splits
        '<circle cx="12" cy="5" r="2"/>' +
        '<line x1="12" y1="7" x2="12" y2="13"/>' +
        '<line x1="3" y1="17" x2="12" y2="13"/>' +
        '<line x1="12" y1="13" x2="21" y2="17"/>', s),

    'learn-core': (s) => ICONS._svg(
        // Shield / core strength
        '<path d="M12 3 L20 7 L20 13 C20 17 16 20 12 21 C8 20 4 17 4 13 L4 7 Z"/>' +
        '<polyline points="9 12 11 14 15 10"/>', s),

    'learn-pirouette': (s) => ICONS._svg(
        // Spinning figure — circle with upward line
        '<circle cx="12" cy="12" r="8" stroke-dasharray="4 2"/>' +
        '<circle cx="12" cy="5" r="2"/>' +
        '<line x1="12" y1="7" x2="12" y2="14"/>', s),

    // ── Actions / utility ────────────────────────────────────────
    'flag': (s) => ICONS._svg(
        // Filled flag — skill in focus
        '<path d="M4 21 L4 4" stroke-width="2"/>' +
        '<path d="M4 4 L16 4 L13 9.5 L16 15 L4 15" fill="currentColor" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"/>', s),

    'flag-outline': (s) => ICONS._svg(
        // Outline flag — not flagged
        '<path d="M4 21 L4 4" stroke-width="2"/>' +
        '<path d="M4 4 L16 4 L13 9.5 L16 15 L4 15" fill="none" stroke-linejoin="round" stroke-width="1.5"/>', s),

    'edit': (s) => ICONS._svg(
        // Pencil — edit / notes
        '<path d="M17 3 L21 7 L8 20 L3 21 L4 16 Z"/>' +
        '<line x1="14" y1="6" x2="18" y2="10"/>', s),

    // ── Folders ─────────────────────────────────────────────────
    'folder-ballets': (s) => ICONS._svg(
        // Stage curtains with arch — theatre / repertoire
        '<path d="M3 5 C3 5 7 7 12 5 C17 7 21 5 21 5 L21 19 L3 19 Z"/>' +
        '<path d="M3 5 L3 19"/>' +
        '<path d="M21 5 L21 19"/>' +
        '<path d="M7 19 L7 11 C7 8 10 7 12 9 C14 7 17 8 17 11 L17 19"/>', s),

    // ── Persona / experience level ──────────────────────────────
    'persona-natural': (s) => ICONS._svg(
        // Star — natural talent
        '<polygon points="12,2 15.1,8.3 22,9.3 17,14.1 18.2,21 12,17.8 5.8,21 7,14.1 2,9.3 8.9,8.3"/>', s),

    'persona-lifelong': (s) => ICONS._svg(
        // Continuous loop — lifelong
        '<path d="M12 3 C7 3 3 7 3 12 C3 17 7 21 12 21 C17 21 21 17 21 12 C21 9 19 6.5 16 5"/>' +
        '<polyline points="16 2 16 6 12 6"/>', s),

    'persona-new': (s) => ICONS._svg(
        // Seedling / sprout
        '<line x1="12" y1="21" x2="12" y2="10"/>' +
        '<path d="M12 10 C12 10 8 9 7 5 C10 4 13 6 12 10"/>' +
        '<path d="M12 13 C12 13 16 12 17 8 C14 7 11 9 12 13"/>', s),

    'persona-finding': (s) => ICONS._svg(
        // Compass rose — finding direction
        '<circle cx="12" cy="12" r="9"/>' +
        '<polygon points="12,5 13.5,10.5 12,12 10.5,10.5" fill="currentColor" stroke="none"/>' +
        '<polygon points="12,19 10.5,13.5 12,12 13.5,13.5" fill="none"/>', s),

    'persona-returning': (s) => ICONS._svg(
        // Curtain / stage — returning to it
        '<rect x="2" y="3" width="20" height="16" rx="1"/>' +
        '<path d="M2 3 C2 3 7 5 12 3 C17 5 22 3 22 3"/>' +
        '<path d="M7 19 L7 10 C7 7 10 6 12 8 C14 6 17 7 17 10 L17 19"/>', s),

    'persona-break': (s) => ICONS._svg(
        // Pause then play — after a break
        '<circle cx="12" cy="12" r="9"/>' +
        '<line x1="9" y1="8" x2="9" y2="16"/>' +
        '<line x1="13" y1="8" x2="13" y2="16"/>' +
        '<polyline points="16 10 19 12 16 14"/>', s),
};


/* ═══════════════════════════════════════════════════════════════
   2. UTILITIES
   Shared helpers used across the app.
   ═══════════════════════════════════════════════════════════════ */

/* ── Swipe helper ──────────────────────────────────────────────
   attachSwipe(el, options)

   Attaches touch + mouse swipe listeners to an element.
   The element should have overflow:hidden and position:relative.
   A sibling .swipe-action-left / .swipe-action-right is revealed
   beneath it as the user drags.

   Options:
     onLeft(el)   — called when left-swipe passes threshold
     onRight(el)  — called when right-swipe passes threshold
     threshold    — px before action fires (default 80)

   The inner content wrapper must have class 'swipe-content'.
   Pattern in HTML:
     <div class="swipe-row">
       <div class="swipe-action-left">Remove</div>
       <div class="swipe-action-right">Complete</div>
       <div class="swipe-content">...card content...</div>
     </div>
────────────────────────────────────────────────────────────── */
function attachSwipe(el, { onLeft, onRight, threshold = 100 } = {}) {
    const content = el.querySelector('.swipe-content');
    if (!content) return;

    let startX = 0;
    let startTime = 0;
    let currentX = 0;
    let dragging = false;
    let settled = false;
    const MIN_DURATION_MS = 120; // must drag for at least 120ms — prevents accidental swipe

    function getClientX(e) {
        return e.touches ? e.touches[0].clientX : e.clientX;
    }

    function onStart(e) {
        if (e.target.closest('button, input, select, textarea, a, [contenteditable]')) return;
        startX = getClientX(e);
        startTime = Date.now();
        currentX = 0;
        dragging = true;
        settled = false;
        content.style.transition = 'none';
    }

    function onMove(e) {
        if (!dragging || settled) return;
        const dx = getClientX(e) - startX;

        if (dx < 0 && !onLeft)  { reset(); return; }
        if (dx > 0 && !onRight) { reset(); return; }

        // Only start moving after 8px to distinguish from taps
        if (Math.abs(dx) < 8) return;

        currentX = dx;
        const damped = dx > 0
            ? Math.min(dx, threshold + (dx - threshold) * 0.15)
            : Math.max(dx, -threshold + (dx + threshold) * 0.15);

        content.style.transform = `translateX(${damped}px)`;

        const leftEl  = el.querySelector('.swipe-action-left');
        const rightEl = el.querySelector('.swipe-action-right');
        if (leftEl)  leftEl.style.opacity  = dx < 0 ? Math.min(1, Math.abs(dx) / threshold) : '0';
        if (rightEl) rightEl.style.opacity = dx > 0 ? Math.min(1, dx / threshold) : '0';
    }

    function onEnd() {
        if (!dragging) return;
        dragging = false;

        const elapsed = Date.now() - startTime;
        const committed = Math.abs(currentX) >= threshold && elapsed >= MIN_DURATION_MS;

        if (committed) {
            settled = true;
            if (currentX < 0 && onLeft) {
                content.style.transition = 'transform 0.25s var(--ease-out)';
                content.style.transform  = `translateX(-110%)`;
                el.style.transition = 'max-height 0.3s var(--ease-out), opacity 0.3s ease, margin 0.3s ease';
                setTimeout(() => {
                    el.style.maxHeight  = el.offsetHeight + 'px';
                    requestAnimationFrame(() => {
                        el.style.maxHeight    = '0';
                        el.style.opacity      = '0';
                        el.style.marginBottom = '0';
                    });
                    setTimeout(() => onLeft(el), 280);
                }, 180);
            } else if (currentX > 0 && onRight) {
                content.style.transition = 'transform 0.25s var(--ease-out)';
                content.style.transform  = `translateX(110%)`;
                setTimeout(() => onRight(el), 200);
            }
        } else {
            reset();
        }
    }

    function reset() {
        dragging = false;
        content.style.transition = 'transform 0.3s var(--ease-out)';
        content.style.transform  = 'translateX(0)';
        const leftEl  = el.querySelector('.swipe-action-left');
        const rightEl = el.querySelector('.swipe-action-right');
        if (leftEl)  leftEl.style.opacity  = '0';
        if (rightEl) rightEl.style.opacity = '0';
    }

    el.addEventListener('touchstart', onStart, { passive: true });
    el.addEventListener('touchmove',  onMove,  { passive: true });
    el.addEventListener('touchend',   onEnd);
    el.addEventListener('mousedown',  onStart);
    el.addEventListener('mousemove',  onMove);
    el.addEventListener('mouseup',    onEnd);
    el.addEventListener('mouseleave', onEnd);
}

function getDimensionStage(rawScore) {
    if (rawScore === null || rawScore === undefined) return null;
    const stage = Math.min(4, Math.floor(rawScore));
    const progressWithin = (rawScore - stage) * 100;
    return { stage, label: DATA.stageLabels[stage], progressWithin: Math.round(progressWithin), raw: rawScore };
}

function renderDimensionBar(label, stageData, isPointe) {
    if (stageData === null) {
        return `
            <div style="margin-bottom: var(--sp-lg);">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
                    <span style="font-size: var(--fs-body); font-weight: 500; color: var(--text);">${label}</span>
                    <span style="font-size: var(--fs-small); color: var(--text-muted);">not assessed</span>
                </div>
                <div style="width: 100%; height: 6px; background: var(--border-light); border-radius: 3px;"></div>
            </div>
        `;
    }
    const stageName = stageData.label;
    const fillPct = stageData.progressWithin;
    const barColor = isPointe ? 'var(--accent-soft)' : 'var(--accent)';
    const pointeNote = isPointe && stageData.stage === 0 ? ' · not started' : '';
    return `
        <div style="margin-bottom: var(--sp-lg);">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
                <span style="font-size: var(--fs-body); font-weight: 500; color: var(--text);">${label}${pointeNote}</span>
                <span style="font-size: var(--fs-small); color: var(--primary); font-weight: 500;">${stageName}</span>
            </div>
            <div style="position: relative; width: 100%; height: 6px; background: var(--border-light); border-radius: 3px; overflow: hidden;">
                <div style="width: ${fillPct}%; height: 100%; background: ${barColor}; border-radius: 3px; transition: width 0.8s var(--ease-out);"></div>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 4px; padding: 0 2px;">
                ${DATA.stageLabels.map((s, i) => `<div style="width: 4px; height: 4px; border-radius: 50%; background: ${i <= stageData.stage ? 'var(--accent)' : 'var(--border)'}; transition: background 0.3s;"></div>`).join('')}
            </div>
        </div>
    `;
}

function renderDimensionChart(dims, container) {
    if (!dims || Object.values(dims).every(v => v === null || v === undefined)) {
        container.innerHTML = `
            <div style="text-align: center; padding: var(--sp-lg) 0;">
                <p style="font-size: var(--fs-small); color: var(--text-muted); margin-bottom: var(--sp-md);">Take the placement quiz to see your dimension breakdown</p>
                <button class="btn-large" onclick="startPlacementQuiz()" style="max-width: 240px; margin: 0 auto;">take the quiz</button>
            </div>
        `;
        return;
    }
    const techniqueOrder = ['barre', 'centre', 'allegro', 'turns', 'flexibility', 'pointe'];
    const artOrder = ['musicality', 'knowledge'];
    let html = '<div style="margin-bottom: var(--sp-sm);"><span style="font-size: var(--fs-caption); font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; color: var(--text-muted);">Technique</span></div>';
    html += techniqueOrder.map(key => renderDimensionBar(DATA.dimensionNames[key], dims[key], key === 'pointe')).join('');
    html += '<div style="margin-top: var(--sp-md); margin-bottom: var(--sp-sm);"><span style="font-size: var(--fs-caption); font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; color: var(--text-muted);">Artistry & knowledge</span></div>';
    html += artOrder.map(key => renderDimensionBar(DATA.dimensionNames[key], dims[key], false)).join('');
    container.innerHTML = html;
}


/* ═══════════════════════════════════════════════════════════════
   4. ONBOARDING
   Welcome screens, swipe gestures, skip logic.
   ═══════════════════════════════════════════════════════════════ */

let currentOnboardingScreen = 1;
const totalOnboardingScreens = 3;

function nextOnboarding() {
    const currentEl = document.getElementById(`onboarding-${currentOnboardingScreen}`);
    if (currentEl) currentEl.classList.remove('active');
    if (currentOnboardingScreen < totalOnboardingScreens) {
        currentOnboardingScreen++;
        const nextEl = document.getElementById(`onboarding-${currentOnboardingScreen}`);
        if (nextEl) {
            nextEl.classList.add('active');
        } else {
            completeOnboarding(); // element missing — bail out gracefully
        }
    } else {
        completeOnboarding();
    }
}

function completeOnboarding() {
    document.querySelectorAll('.onboarding-screen').forEach(s => s.classList.remove('active'));
    storage.save('onboardingComplete', true);
    showOrientationScreen();
}

function skipOnboarding() {
    document.querySelectorAll('.onboarding-screen').forEach(s => s.classList.remove('active'));
    storage.save('onboardingComplete', true);
    // Only set not-assessed if no level has been established yet
    if (!appState.level) {
        appState.level = 'not-assessed';
        appState.dimensions = null;
    }
    if (!appState.timeline?.length) {
        appendTimelineEntry({
            type:  'manual',
            title: 'Joined plié',
            body:  null,
            date:  new Date().toISOString().split('T')[0],
        });
    }
    showScreen('profile');
    document.querySelector('.bottom-nav')?.classList.add('visible');
    document.querySelector('.fab')?.classList.add('visible');
}

// Touch/swipe
let touchStartX = 0;
let touchEndX = 0;

function handleOnboardingSwipe() {
    const threshold = 50;
    if (touchEndX < touchStartX - threshold) {
        nextOnboarding();
    }
    if (touchEndX > touchStartX + threshold) {
        if (currentOnboardingScreen > 1) {
            const cur = document.getElementById(`onboarding-${currentOnboardingScreen}`);
            if (cur) cur.classList.remove('active');
            currentOnboardingScreen--;
            const prev = document.getElementById(`onboarding-${currentOnboardingScreen}`);
            if (prev) prev.classList.add('active');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.onboarding-screen').forEach(screen => {
        screen.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, false);
        screen.addEventListener('touchend', e => { touchEndX = e.changedTouches[0].screenX; handleOnboardingSwipe(); }, false);
    });

    // Route to correct initial screen.
    // A returning user is identified by: onboardingComplete flag OR any existing data.
    // This prevents a failed localStorage write from trapping users in onboarding.
    const onboardingDone = storage.load('onboardingComplete');
    const hasData = (appState.sessions.length > 0) ||
                    (appState.assessments.length > 0) ||
                    (appState.timeline.length > 0) ||
                    (appState.corrections.length > 0) ||
                    ((appState.goals || []).length > 0);

    if (onboardingDone || hasData) {
        // Never overwrite a real level with not-assessed
        if (!appState.level) appState.level = 'not-assessed';
        showScreen('profile');
        document.querySelector('.bottom-nav')?.classList.add('visible');
        document.querySelector('.fab')?.classList.add('visible');
    } else {
        // New user — ensure nav is hidden during onboarding
        document.querySelector('.bottom-nav')?.classList.remove('visible');
        document.querySelector('.fab')?.classList.remove('visible');
    }
});


/* ═══════════════════════════════════════════════════════════════
   5. ORIENTATION CONVERSATION
   Replaces the placement quiz. Entry: showOrientationScreen()
   ═══════════════════════════════════════════════════════════════ */

const ORIENTATION_QUESTIONS = [
    {
        id: 'q1', scored: false, type: 'single', dimension: 'About you',
        text: 'Which best describes you?',
        helper: null,
        options: [
            'Born to dance — Training since childhood',
            'Building a foundation — Training for 3–7 years',
            'Finding my feet — Training for 1–3 years',
            'Just starting out — Less than a year',
            'Coming back — Returning after a break',
        ],
    },
    {
        id: 'q2', scored: false, type: 'single', dimension: 'Your training',
        text: 'How much time do you spend in class right now?',
        helper: 'Think about a typical week, not your best or worst.',
        options: [
            'Not in class at the moment',
            'Up to 2 hours a week',
            '2 to 4 hours a week',
            '4 to 6 hours a week',
            '6 or more hours a week',
        ],
    },
    {
        id: 'q3', scored: true, type: 'multi', dimension: 'In class',
        text: 'Which of these generally feel true for you in class?',
        helper: null,
        options: [
            { text: 'I can get through centre combinations without relying on watching others', weight: 0.50 },
            { text: 'I work on placement and alignment without needing to be reminded', weight: 0.60 },
            { text: 'I feel settled and balanced in centre most of the time', weight: 0.50 },
            { text: 'I find centre work challenging regardless of whether I know the steps', weight: 0.10 },
            { text: 'I can focus on quality in centre, not just getting through it', weight: 0.80 },
        ],
    },
    {
        id: 'q4', scored: true, type: 'multi', dimension: 'Arms and upper body',
        text: 'Which of these generally feel true about how you use your arms and upper body?',
        helper: 'In ballet, the arms, head, and shoulders working together is called port de bras and épaulement.',
        options: [
            { text: 'My arms and legs tend to work as separate problems in class', weight: 0.10 },
            { text: 'I can follow the port de bras in combinations but it doesn\'t always feel natural', weight: 0.30 },
            { text: 'My arms and legs generally work together without too much conscious effort', weight: 0.55 },
            { text: 'I use my head and shoulders as part of how I move through a combination', weight: 0.75 },
            { text: 'I think about the shape and quality of my arms, not just their position', weight: 0.90 },
        ],
    },
    {
        id: 'q5', scored: true, type: 'multi', dimension: 'Slow work',
        text: 'Which of these generally feel true about your slow work?',
        helper: 'Adagio is the slow, sustained section of class: développé, arabesque, attitudes, and held balances.',
        options: [
            { text: 'I haven\'t done adagio work yet', weight: 0.00 },
            { text: 'I find slow combinations difficult to sustain with control', weight: 0.15 },
            { text: 'I can hold an arabesque or attitude without losing balance most of the time', weight: 0.45 },
            { text: 'I can extend my leg with control in slow combinations', weight: 0.60 },
            { text: 'I can sustain long slow phrases without rushing or losing shape', weight: 0.80 },
            { text: 'I use the music to shape how I move through adagio', weight: 0.90 },
        ],
    },
    {
        id: 'q6', scored: true, type: 'multi', dimension: 'Turns',
        text: 'Which of these generally feel true about your turning?',
        helper: 'This is about pirouettes specifically.',
        options: [
            { text: 'I haven\'t started working on turns yet', weight: 0.00 },
            { text: 'I\'m working towards a clean single, doing quarter and half turns', weight: 0.15 },
            { text: 'I\'m landing a single pirouette most of the time', weight: 0.35 },
            { text: 'I\'m working on doubles', weight: 0.55 },
            { text: 'I can do reliable doubles', weight: 0.75 },
            { text: 'I can do more than doubles consistently', weight: 0.95 },
        ],
    },
    {
        id: 'q7', scored: true, type: 'multi', dimension: 'Jumps',
        text: 'Which of these generally feel true about your jump work?',
        helper: 'Allegro is the jumping section of class. Petit allegro is small fast jumps, grand allegro is larger travelling jumps.',
        options: [
            { text: 'I haven\'t started jumps yet', weight: 0.00 },
            { text: 'I find jumps physically demanding more than technically challenging', weight: 0.15 },
            { text: 'I\'m confident doing basic jumps, sautés, échappés', weight: 0.30 },
            { text: 'I\'m confident doing petit allegro combinations, changements, assemblés, glissade', weight: 0.50 },
            { text: 'I\'m confident doing grand jeté', weight: 0.65 },
            { text: 'I\'m confident doing sissonne and travelling grand allegro combinations', weight: 0.80 },
            { text: 'I\'m confident getting through complex allegro combinations musically as well as technically', weight: 0.95 },
        ],
    },
    {
        id: 'q8', scored: true, type: 'multi', dimension: 'Musicality',
        text: 'Which of these generally feel true about how you relate to music in class?',
        helper: 'Phrasing means shaping your movement to the musical sentence, not just the beat.',
        options: [
            { text: 'I focus on getting the steps right, music comes later', weight: 0.10 },
            { text: 'I can hear the counts but I don\'t always move with the phrasing', weight: 0.25 },
            { text: 'I generally stay on the music and can feel when the tempo or mood shifts', weight: 0.50 },
            { text: 'I naturally accent movements and breathe with the phrasing', weight: 0.70 },
            { text: 'The music shapes how I dance, I respond to dynamics not just counts', weight: 0.90 },
            { text: 'I find it easier to be musical in slow work than in allegro', weight: 0.50 },
        ],
    },
    {
        id: 'q9', scored: true, type: 'multi', dimension: 'Outside class',
        text: 'Which of these generally feel true about how you engage with ballet outside class?',
        helper: null,
        options: [
            { text: 'I\'m mostly focused on my own training right now', weight: 0.20 },
            { text: 'I watch performances or recordings when I can', weight: 0.40 },
            { text: 'I follow dancers or companies I admire', weight: 0.50 },
            { text: 'I know some of the major works and what makes them significant', weight: 0.65 },
            { text: 'I read or listen to things about ballet history, technique, or choreography', weight: 0.75 },
            { text: 'Watching ballet has inspired how I think about movement and music', weight: 0.85 },
        ],
    },
    {
        id: 'q10', scored: true, type: 'single', dimension: 'Range',
        text: 'How high can you hold your leg in à la seconde with control?',
        helper: 'À la seconde means to the side. Stand on one leg and lift the other directly out to the side, with control and turnout. Not a kick.',
        options: [
            { text: 'Below hip height', weight: 0.10 },
            { text: 'Around hip height', weight: 0.30 },
            { text: 'Between hip and 90 degrees', weight: 0.50 },
            { text: 'At 90 degrees or close to it', weight: 0.70 },
            { text: 'Above 90 degrees with control', weight: 0.95 },
        ],
    },
    {
        id: 'q11', scored: true, type: 'single', dimension: 'Flexibility',
        text: 'Which of these best describes your overall flexibility?',
        helper: null,
        options: [
            { text: 'Flexibility is a significant challenge for me', weight: 0.10 },
            { text: 'I have some flexibility but it\'s something I work on', weight: 0.30 },
            { text: 'I\'m reasonably flexible and can work with what I have', weight: 0.50 },
            { text: 'I\'m quite flexible, it\'s one of my stronger attributes', weight: 0.70 },
            { text: 'I\'m very flexible, it rarely limits what I can do', weight: 0.90 },
            { text: 'I\'m hypermobile — I have a lot of range but stability can be a challenge', weight: 0.75 },
        ],
    },
    {
        id: 'q12', scored: true, type: 'multi', dimension: 'Strength',
        text: 'Which of these generally feel true about your strength and stability in class?',
        helper: null,
        options: [
            { text: 'I fatigue noticeably during longer combinations', weight: 0.15 },
            { text: 'My supporting leg feels stable when I\'m working on it', weight: 0.55 },
            { text: 'I can hold balances with reasonable consistency', weight: 0.60 },
            { text: 'My core feels engaged when I need it', weight: 0.65 },
            { text: 'Strength feels like a bigger limitation for me than flexibility', weight: 0.20 },
        ],
    },
    {
        id: 'q13', scored: true, type: 'multi', dimension: 'Turnout',
        text: 'Which of these generally feel true about your turnout?',
        helper: null,
        options: [
            { text: 'I find it hard to maintain turnout through a full combination', weight: 0.15 },
            { text: 'My turnout feels consistent without me thinking about it constantly', weight: 0.70 },
            { text: 'I notice my turnout drops when I\'m tired or focusing on something else', weight: 0.35 },
            { text: 'My turnout feels like a physical limitation rather than something I can train', weight: 0.10 },
            { text: 'I\'ve improved my turnout noticeably through training', weight: 0.60 },
        ],
    },
    {
        id: 'q14', scored: true, type: 'single', dimension: 'Pointe',
        text: 'What\'s your experience with pointe work?',
        helper: null,
        options: [
            { text: 'I haven\'t started and I\'m not interested right now', weight: 0.10 },
            { text: 'I haven\'t started but I\'m working towards starting', weight: 0.30 },
            { text: 'I\'ve been on pointe for less than a year', weight: 0.50 },
            { text: 'I\'ve been on pointe for 1 to 3 years', weight: 0.70 },
            { text: 'I\'ve been on pointe for 3 years or more', weight: 0.90 },
        ],
    },
];

const ORIENTATION_GOALS_OPTIONS = [
    'Getting back into ballet',
    'Building a regular practice',
    'Working towards pointe',
    'Improving my technique',
    'Preparing for a performance',
    'Enjoying ballet as part of my life',
];

const PERSONAS = {
    duckling: {
        level: 'duckling',
        name: 'Duckling',
        description: 'You\'re building the foundations. Ballet is still relatively new to you, whether you\'ve just started or you\'re finding your footing after a long break. You\'re learning how the vocabulary works, what your body can do, and how to listen to your teacher. Classes might feel like a lot to take in at once, and that\'s exactly where you should be.',
    },
    deer: {
        level: 'deer',
        name: 'Deer',
        description: 'You know your way around a class. You\'ve got the basics under your feet and you\'re starting to work on the details. You can follow combinations without watching someone else for every step, and you\'re beginning to notice the difference between getting through something and doing it well. You\'re in the part of the journey where things start to connect.',
    },
    swan: {
        level: 'swan',
        name: 'Swan',
        description: 'You\'re working with real depth now. You\'ve been training long enough that the foundations are solid and you\'re building on top of them. You bring attention to quality, not just execution. You know what you\'re working on and why. Classes feel like a place to develop, not just survive.',
    },
    firebird: {
        level: 'firebird',
        name: 'Firebird',
        description: 'Ballet is a serious part of your life. You\'ve been at this for a long time. Your technique has real consistency, you\'re musical, and you have a clear sense of what you\'re reaching for. You might still be working on the same things you\'ve always worked on — that\'s the nature of ballet — but you\'re doing it with depth and intention.',
    },
};

function showOrientationScreen() {
    appState.currentQuestion     = 0;
    appState._orientationAnswers = {};
    appState._assessmentWritten  = false;
    showScreen('assessment');
    document.getElementById('orientation-content').innerHTML = `
        <div class="orientation-opening">
            <div class="orient-logo">plié</div>
            <h1 class="orient-display-title">Find your starting point</h1>
            <p class="orient-opening-body">A few questions to help shape what Plié gives you along the way.</p>
            <div class="orient-opening-actions">
                <button class="btn-orient-primary" onclick="startOrientationQuiz()">let's go →</button>
                <button class="orient-text-link" onclick="showOrientationLevelPicker()">skip quiz, I want to set my level →</button>
            </div>
        </div>
    `;
}

function startOrientationQuiz() {
    appState.currentQuestion     = 0;
    appState._orientationAnswers = {};
    appState._assessmentWritten  = false;
    showScreen('assessment');
    document.querySelector('.bottom-nav')?.classList.remove('visible');
    document.querySelector('.fab')?.classList.remove('visible');
    renderOrientationQuestion();
}

function renderOrientationQuestion() {
    if (appState.currentQuestion >= ORIENTATION_QUESTIONS.length) {
        showOrientationGoals();
        return;
    }

    const q        = ORIENTATION_QUESTIONS[appState.currentQuestion];
    const answers  = appState._orientationAnswers || {};
    const current  = answers[q.id];
    const progress = ((appState.currentQuestion + 1) / (ORIENTATION_QUESTIONS.length + 1)) * 100;

    const optHtml = q.options.map((opt, i) => {
        const text = typeof opt === 'string' ? opt : opt.text;
        const sel  = q.type === 'single'
            ? current === i
            : Array.isArray(current) && current.includes(i);
        const fn   = q.type === 'single'
            ? `orientSelectOption('${q.id}', ${i})`
            : `orientToggleMulti('${q.id}', ${i})`;
        return `<button class="orient-option${sel ? ' selected' : ''}" onclick="${fn}">${text}</button>`;
    }).join('');

    document.getElementById('orientation-content').innerHTML = `
        <div class="orientation-container">
            <div class="orient-header">
                <div class="orient-header-inner">
                    <div class="orient-logo">plié</div>
                    <div class="orient-header-right">
                        <span class="orient-counter">${appState.currentQuestion + 1} / ${ORIENTATION_QUESTIONS.length}</span>
                        <button class="orient-close-btn" onclick="exitOrientation()">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="4" x2="14" y2="14"/><line x1="14" y1="4" x2="4" y2="14"/></svg>
                        </button>
                    </div>
                </div>
                <div class="orient-quiz-subtitle">orientation</div>
                <div class="orient-progress-track">
                    <div class="orient-progress-bar" style="width:${progress}%"></div>
                </div>
            </div>
            <div class="orient-body">
                ${q.dimension ? `<div class="orient-dimension">${q.dimension}</div>` : ''}
                <div class="orient-question">${q.text}</div>
                ${q.helper ? `<div class="orient-helper">${q.helper}</div>` : ''}
                ${q.type === 'multi' ? `<div class="orient-select-hint">select all that apply</div>` : ''}
                <div class="orient-options">${optHtml}</div>
            </div>
            <div class="orient-footer">
                <button class="orient-nav-btn" onclick="orientPrev()" ${appState.currentQuestion === 0 ? 'disabled' : ''}>back</button>
                <button class="orient-nav-btn orient-footer-skip" onclick="showOrientationLevelPicker()">skip quiz</button>
                <button class="orient-nav-btn orient-nav-next" onclick="orientNext()">next</button>
            </div>
        </div>
    `;
}

function orientSelectOption(qId, idx) {
    if (!appState._orientationAnswers) appState._orientationAnswers = {};
    const current = appState._orientationAnswers[qId];
    appState._orientationAnswers[qId] = current === idx ? undefined : idx;
    renderOrientationQuestion();
}

function orientToggleMulti(qId, idx) {
    if (!appState._orientationAnswers) appState._orientationAnswers = {};
    if (!Array.isArray(appState._orientationAnswers[qId])) appState._orientationAnswers[qId] = [];
    const arr = appState._orientationAnswers[qId];

    // Mutually exclusive first option for questions starting with "I haven't"
    const q = ORIENTATION_QUESTIONS[appState.currentQuestion];
    const firstOptText = typeof q.options[0] === 'string' ? q.options[0] : q.options[0].text;
    const hasExclusive = firstOptText.startsWith("I haven't");

    if (hasExclusive && idx === 0) {
        if (arr.includes(0)) { arr.splice(arr.indexOf(0), 1); }
        else { appState._orientationAnswers[qId] = [0]; }
    } else if (hasExclusive) {
        if (arr.includes(0)) arr.splice(arr.indexOf(0), 1);
        const pos = arr.indexOf(idx);
        if (pos > -1) arr.splice(pos, 1); else arr.push(idx);
    } else {
        const pos = arr.indexOf(idx);
        if (pos > -1) arr.splice(pos, 1); else arr.push(idx);
    }

    // Patch just the options to avoid full re-render flicker
    const container = document.querySelector('.orient-options');
    if (!container) return;
    container.innerHTML = q.options.map((opt, i) => {
        const text = typeof opt === 'string' ? opt : opt.text;
        const sel  = appState._orientationAnswers[qId].includes(i);
        return `<button class="orient-option${sel ? ' selected' : ''}" onclick="orientToggleMulti('${qId}', ${i})">${text}</button>`;
    }).join('');
}

function orientNext() { appState.currentQuestion++; renderOrientationQuestion(); }
function orientPrev() { if (appState.currentQuestion > 0) { appState.currentQuestion--; renderOrientationQuestion(); } }

function showOrientationGoals() {
    const current = appState._orientationAnswers['goals'] || [];
    document.getElementById('orientation-content').innerHTML = `
        <div class="orientation-container">
            <div class="orient-header">
                <div class="orient-header-inner">
                    <div class="orient-logo">plié</div>
                    <div class="orient-header-right">
                        <span class="orient-counter">almost done</span>
                        <button class="orient-close-btn" onclick="exitOrientation()">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="4" x2="14" y2="14"/><line x1="14" y1="4" x2="4" y2="14"/></svg>
                        </button>
                    </div>
                </div>
                <div class="orient-quiz-subtitle">orientation</div>
                <div class="orient-progress-track">
                    <div class="orient-progress-bar" style="width:96%"></div>
                </div>
            </div>
            <div class="orient-body">
                <div class="orient-question">What are you working toward?</div>
                <div class="orient-options" id="orient-goals-options">
                    ${ORIENTATION_GOALS_OPTIONS.map((opt, i) => {
                        const sel = current.includes(i);
                        return `<button class="orient-option${sel ? ' selected' : ''}" onclick="orientToggleGoal(${i})">${opt}</button>`;
                    }).join('')}
                </div>
            </div>
            <div class="orient-footer">
                <button class="orient-nav-btn" onclick="orientPrev()">back</button>
                <button class="orient-nav-btn orient-nav-next" onclick="finishOrientationQuiz()">done →</button>
            </div>
        </div>
    `;
}

function orientToggleGoal(idx) {
    if (!appState._orientationAnswers) appState._orientationAnswers = {};
    if (!Array.isArray(appState._orientationAnswers['goals'])) appState._orientationAnswers['goals'] = [];
    const arr = appState._orientationAnswers['goals'];
    const pos = arr.indexOf(idx);
    if (pos > -1) arr.splice(pos, 1); else arr.push(idx);
    const container = document.getElementById('orient-goals-options');
    if (!container) return;
    container.innerHTML = ORIENTATION_GOALS_OPTIONS.map((opt, i) => {
        const sel = appState._orientationAnswers['goals'].includes(i);
        return `<button class="orient-option${sel ? ' selected' : ''}" onclick="orientToggleGoal(${i})">${opt}</button>`;
    }).join('');
}

function finishOrientationQuiz() {
    const persona = scoreOrientation(appState._orientationAnswers || {});
    showOrientationResults(persona);
}

function scoreOrientation(answers) {
    const scored = ORIENTATION_QUESTIONS.filter(q => q.scored);
    let total = 0, count = 0;

    scored.forEach(q => {
        const ans = answers[q.id];
        if (ans === undefined || ans === null) return;

        if (q.type === 'single') {
            const opt = q.options[ans];
            if (opt && typeof opt.weight === 'number') { total += opt.weight; count++; }
        } else {
            const sel = Array.isArray(ans) ? ans : [];
            if (!sel.length) return;
            const avg = sel.reduce((s, i) => s + (q.options[i]?.weight ?? 0), 0) / sel.length;
            total += avg; count++;
        }
    });

    if (!count) return 'duckling';
    const score = total / count;
    if (score >= 0.70) return 'firebird';
    if (score >= 0.48) return 'swan';
    if (score >= 0.28) return 'deer';
    return 'duckling';
}

function showOrientationResults(suggestedPersona) {
    appState._suggestedPersona = suggestedPersona;
    const p = PERSONAS[suggestedPersona];

    document.getElementById('orientation-content').innerHTML = `
        <div class="orientation-container">
            <div class="orient-body orient-results-body">
                <h1 class="orient-result-name">${p.name}</h1>
                <p class="orient-result-desc">${p.description}</p>
                <div class="orient-adjust-label">adjust your level</div>
                <div class="orient-persona-list">
                    ${Object.entries(PERSONAS).map(([key, persona]) => `
                        <button class="orient-persona-btn${key === suggestedPersona ? ' active' : ''}"
                                onclick="selectResultPersona('${key}')">
                            ${persona.name}
                        </button>
                    `).join('')}
                </div>
            </div>
            <div class="orient-footer">
                <button class="orient-nav-btn orient-nav-next" onclick="confirmOrientationLevel('${suggestedPersona}')">this is me →</button>
            </div>
        </div>
    `;
}

function selectResultPersona(key) {
    appState._suggestedPersona = key;
    showOrientationResults(key);
    // Update confirm button to use new selection
    const confirmBtn = document.querySelector('.orient-nav-next');
    if (confirmBtn) confirmBtn.setAttribute('onclick', `confirmOrientationLevel('${key}')`);
}

function confirmOrientationLevel(personaKey) {
    const persona = PERSONAS[personaKey];
    if (!persona) return;

    appState.persona = personaKey;
    appState.level   = persona.level;

    // Synthesise dimension scores from persona level so focus cards show as assessed.
    // The orientation quiz doesn't score individual dimensions, so we use the midpoint
    // of each level band as a uniform approximation across all tech/artistry dimensions.
    const levelRaw = { duckling: 0.5, deer: 1.5, swan: 2.5, firebird: 3.5 }[personaKey] ?? 0.5;
    appState.dimensions = {
        barre:       getDimensionStage(levelRaw),
        centre:      getDimensionStage(levelRaw),
        allegro:     getDimensionStage(levelRaw),
        turns:       getDimensionStage(levelRaw),
        flexibility: getDimensionStage(levelRaw),
        musicality:  getDimensionStage(levelRaw),
        knowledge:   getDimensionStage(levelRaw),
        pointe:      null,
    };

    if (!appState._assessmentWritten) {
        const assessment = {
            id:          Date.now(),
            type:        'placement',
            date:        new Date().toISOString().split('T')[0],
            completedAt: Date.now(),
            answers:     { ...(appState._orientationAnswers || {}) },
            level:       persona.level,
            persona:     personaKey,
            levelLabel:  persona.name,
            dimensions:  appState.dimensions,
        };
        appState.assessments = appState.assessments || [];
        appState.assessments.push(assessment);
        storage.save('assessments', appState.assessments);

        appendTimelineEntry({
            type:     'assessment',
            objectId: assessment.id,
            title:    `Completed orientation`,
            body:     persona.name,
            date:     assessment.date,
        });
        appState._assessmentWritten = true;
    }

    // TODO: account creation — no backend yet, proceed directly
    storage.save('onboardingComplete', true);
    showScreen('profile');
    document.querySelector('.bottom-nav')?.classList.add('visible');
    document.querySelector('.fab')?.classList.add('visible');
    navigateTo('barre');
}

function showOrientationLevelPicker() {
    showScreen('assessment');
    document.getElementById('orientation-content').innerHTML = `
        <div class="orientation-container">
            <div class="orient-header">
                <div class="orient-logo">plié</div>
                <button class="orient-close-btn" onclick="exitOrientation()">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="4" x2="14" y2="14"/><line x1="14" y1="4" x2="4" y2="14"/></svg>
                </button>
            </div>
            <div class="orient-body">
                <div class="orient-question">Choose your level</div>
                <p class="orient-helper" style="margin-bottom: var(--sp-xl);">This is your starting point. Your training picture fills in as you log sessions.</p>
                <div class="orient-persona-picker">
                    ${Object.entries(PERSONAS).map(([key, p]) => `
                        <button class="orient-persona-pick-btn" onclick="confirmOrientationLevel('${key}')">
                            <div class="orient-persona-pick-name">${p.name}</div>
                            <div class="orient-persona-pick-desc">${p.description}</div>
                        </button>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function exitOrientation() {
    const answers = appState._orientationAnswers || {};
    const hasAnswers = Object.values(answers).some(v =>
        v !== undefined && (!Array.isArray(v) || v.length > 0));

    if (hasAnswers) {
        confirmOrientationLevel(scoreOrientation(answers));
    } else {
        appState.level = 'not-assessed';
        storage.save('onboardingComplete', true);
        if (!appState.timeline?.length) {
            appendTimelineEntry({ type: 'manual', title: 'Joined plié', body: null, date: new Date().toISOString().split('T')[0] });
        }
        showScreen('profile');
        document.querySelector('.bottom-nav')?.classList.add('visible');
        document.querySelector('.fab')?.classList.add('visible');
        navigateTo('barre');
    }
}

/* ═══════════════════════════════════════════════════════════════
   5b. LEGACY ASSESSMENT SYSTEM (superseded — kept for reference)
   ═══════════════════════════════════════════════════════════════ */

function startPlacementQuiz() {
    appState.currentQuestion = 0;
    appState._assessmentWritten = false; // reset so retake writes a new entry
    showScreen('assessment');
    renderQuestion();
}

function renderQuestion() {
    if (appState.currentQuestion >= DATA.questions.length) {
        showCompletionScreen();
        return;
    }
    const question = DATA.questions[appState.currentQuestion];

    document.getElementById('assessmentCategory').textContent = question.category || '';
    document.getElementById('assessmentQuestion').textContent = question.question;

    // Update progress counter
    const counter = document.getElementById('assessmentCounter');
    if (counter) {
        counter.textContent = `${appState.currentQuestion + 1} / ${DATA.questions.length}`;
    }
    // Update progress bar
    const bar = document.getElementById('assessmentProgressBar');
    if (bar) {
        bar.style.width = `${((appState.currentQuestion + 1) / DATA.questions.length) * 100}%`;
    }

    const subtextEl = document.getElementById('assessmentSubtext');
    if (question.subtext) {
        subtextEl.textContent = question.subtext;
        subtextEl.style.display = 'block';
    } else {
        subtextEl.textContent = '';
        subtextEl.style.display = 'none';
    }

    const optionsContainer = document.getElementById('assessmentOptions');
    optionsContainer.innerHTML = '';

    if (question.type === 'card-select') {
        optionsContainer.innerHTML = '<div class="persona-grid" style="padding: 0;">' +
            question.options.map((opt, idx) => {
                const selected = appState.answers[question.key] === idx ? ' selected' : '';
                return `
                    <div class="persona-card${selected}" onclick="selectOption('${question.key}', ${idx})">
                        <div class="persona-icon">${ICONS.get(opt.icon, 28)}</div>
                        <h3>${opt.label}</h3>
                        <p>${opt.description}</p>
                    </div>
                `;
            }).join('') + '</div>';
    } else if (question.type === 'multiple-choice') {
        question.options.forEach((option, idx) => {
            const btn = document.createElement('button');
            btn.className = 'assessment-option';
            btn.dataset.idx = idx;
            btn.textContent = option;
            if (appState.answers[question.key] === idx) btn.classList.add('selected');
            btn.onclick = () => selectOption(question.key, idx);
            optionsContainer.appendChild(btn);
        });
    } else if (question.type === 'multi-select') {
        if (!appState.answers[question.key]) appState.answers[question.key] = [];
        question.options.forEach((option, idx) => {
            const btn = document.createElement('button');
            btn.className = 'assessment-option';
            btn.dataset.idx = idx;
            btn.textContent = option;
            if (appState.answers[question.key].includes(idx)) btn.classList.add('selected');
            btn.onclick = () => toggleMultiSelect(question.key, idx);
            optionsContainer.appendChild(btn);
        });
    } else if (question.type === 'slider') {
        const value = appState.answers[question.key] || 0;
        const descriptionIndex = Math.floor(value / 20);
        const currentDescription = question.sliderDescriptions ? question.sliderDescriptions[descriptionIndex] : '';
        optionsContainer.innerHTML = `
            <div class="slider-container">
                <input type="range" min="0" max="100" value="${value}" class="slider"
                       oninput="updateSlider('${question.key}', this.value)">
                <div class="slider-labels">
                    <span>${question.labels[0]}</span>
                    <span>${question.labels[question.labels.length - 1]}</span>
                </div>
                ${currentDescription ? `<div class="slider-value-display">${currentDescription}</div>` : ''}
            </div>
        `;
    }

    document.getElementById('backBtn').disabled = appState.currentQuestion === 0;
}

function selectOption(key, value) {
    // Deselect if tapping the already-selected option
    const alreadySelected = appState.answers[key] === value;
    appState.answers[key] = alreadySelected ? undefined : value;
    document.querySelectorAll('#assessmentOptions .assessment-option, #assessmentOptions .persona-card')
        .forEach(btn => btn.classList.toggle('selected',
            !alreadySelected && parseInt(btn.dataset.idx) === value));
}

function toggleMultiSelect(key, value) {
    if (!appState.answers[key]) appState.answers[key] = [];
    const index = appState.answers[key].indexOf(value);
    if (index > -1) { appState.answers[key].splice(index, 1); }
    else { appState.answers[key].push(value); }
    document.querySelectorAll('#assessmentOptions .assessment-option')
        .forEach(btn => btn.classList.toggle('selected', appState.answers[key].includes(parseInt(btn.dataset.idx))));
}

function updateSlider(key, value) {
    appState.answers[key] = parseInt(value);
    renderQuestion();
}

function nextQuestion() { appState.currentQuestion++; renderQuestion(); }

function previousQuestion() {
    if (appState.currentQuestion > 0) { appState.currentQuestion--; renderQuestion(); }
}

function skipAssessment() {
    appState.level = 'not-assessed';
    appState.dimensions = null;
    if (!appState.timeline?.length) {
        appendTimelineEntry({
            type:  'manual',
            title: 'Joined plié',
            body:  null,
            date:  new Date().toISOString().split('T')[0],
        });
    }
    showScreen('profile');
    document.querySelector('.bottom-nav')?.classList.add('visible');
    document.querySelector('.fab')?.classList.add('visible');
}

function exitQuiz() {
    const answered = Object.keys(appState.answers).filter(k => k !== 'goals' && appState.answers[k] !== undefined);
    if (answered.length > 0) {
        calculateResults(); // writes timeline entry internally
    } else {
        appState.level = 'not-assessed';
        appState.dimensions = null;
        if (!appState.timeline?.length) {
            appendTimelineEntry({
                type:  'manual',
                title: 'Joined plié',
                body:  null,
                date:  new Date().toISOString().split('T')[0],
            });
        }
    }
    showScreen('profile');
    document.querySelector('.bottom-nav')?.classList.add('visible');
    document.querySelector('.fab')?.classList.add('visible');
}

function showCompletionScreen() { showScreen('completion'); }

function returnToLastQuestion() {
    appState.currentQuestion = DATA.questions.length - 1;
    showScreen('assessment');
    renderQuestion();
}

function submitAssessment() {
    calculateResults();
    showScreen('results');
}

function calculateResults() {
    const a = appState.answers;
    function rawScore(key) { return a[key] !== undefined ? a[key] : null; }

    const flexSplit = rawScore('frontSplit');
    const flexLeg = rawScore('legHeight');
    let flexRaw = null;
    if (flexSplit !== null && flexLeg !== null) flexRaw = (flexSplit + flexLeg) / 2;
    else if (flexSplit !== null) flexRaw = flexSplit;
    else if (flexLeg !== null) flexRaw = flexLeg;

    const rawDimensions = {
        barre: rawScore('barre'), centre: rawScore('centre'),
        allegro: rawScore('allegro'), turns: rawScore('pirouette'),
        flexibility: flexRaw, pointe: rawScore('pointe'),
        musicality: rawScore('musicality'),
        knowledge: (() => {
            const term = rawScore('terminology');
            const rep = rawScore('repertoire');
            if (term !== null && rep !== null) return (term + rep) / 2;
            return term !== null ? term : rep;
        })()
    };

    const dimensions = {};
    for (const key in rawDimensions) { dimensions[key] = getDimensionStage(rawDimensions[key]); }

    appState.dimensions = dimensions;
    appState.rawDimensions = rawDimensions;

    // Overall level from core technique dimensions
    const coreKeys = ['barre', 'centre', 'allegro', 'turns', 'flexibility'];
    const answeredRaw = coreKeys.map(k => rawDimensions[k]).filter(v => v !== null);
    const avg = answeredRaw.length > 0 ? answeredRaw.reduce((s, v) => s + v, 0) / answeredRaw.length : -1;

    let level, levelLabel, levelDescription;
    if (avg < 0)      { level = 'not-assessed'; levelLabel = 'Not assessed';  levelDescription = "Complete the quiz to find your level"; }
    else if (avg >= 3) { level = 'firebird';    levelLabel = 'Firebird';      levelDescription = "Ballet is a serious part of your life. Technique has real consistency."; }
    else if (avg >= 2) { level = 'swan';        levelLabel = 'Swan';          levelDescription = "You're working with real depth. Foundations are solid and you're building on them."; }
    else if (avg >= 1) { level = 'deer';        levelLabel = 'Deer';          levelDescription = "You know your way around a class. Basics are there — working on the details."; }
    else               { level = 'duckling';    levelLabel = 'Duckling';      levelDescription = "You're building the foundations. Learning how it all works."; }

    appState.level = level;

    // Strongest / weakest
    const answeredCoreDims = coreKeys.filter(k => rawDimensions[k] !== null).map(k => [k, rawDimensions[k]]);
    let strength = 'n/a', focus = 'n/a';
    if (answeredCoreDims.length > 0) {
        const sorted = [...answeredCoreDims].sort((a, b) => b[1] - a[1]);
        strength = DATA.dimensionNames[sorted[0][0]];
        focus = sorted.slice(-2).map(d => DATA.dimensionNames[d[0]]).join(' and ');
    }

    // Store assessment object
    const assessment = {
        id:          Date.now(),
        type:        'placement',
        date:        new Date().toISOString().split('T')[0],
        completedAt: Date.now(),
        answers:     { ...appState.answers },
        dimensions,
        level,
        levelLabel,
        levelDescription,
    };
    appState.assessments = appState.assessments || [];
    // Only push if this is a new assessment (not a re-render)
    if (!appState._assessmentWritten) {
        appState.assessments.push(assessment);
        storage.save('assessments', appState.assessments);

        appendTimelineEntry({
            type:     'assessment',
            objectId: assessment.id,
            title:    level === 'not-assessed'
                ? 'Completed placement quiz'
                : `Completed placement quiz — ${levelLabel}`,
            body:     level !== 'not-assessed' ? levelDescription : null,
            date:     assessment.date,
        });
        appState._assessmentWritten = true;
    }

    // Render results screen
    renderDimensionChart(dimensions, document.getElementById('dimensionBreakdown'));
    document.getElementById('resultLevel').textContent = levelLabel;
    document.getElementById('resultLevelBadge').textContent = levelLabel.toUpperCase();
    document.getElementById('resultLevelDescription').textContent = levelDescription;
    document.getElementById('resultStrength').textContent = strength;
    document.getElementById('resultFocus').textContent = focus;

    // What to work on — specific suggestions per weak dimension
    const FOCUS_SUGGESTIONS = {
        barre:       { label: 'Barre work',   tips: ['Focus on the quality of each exercise over speed', 'Work on maintaining turnout through the whole foot', 'Use the barre lightly — build balance away from it'] },
        centre:      { label: 'Centre work',  tips: ['Spend extra time at the start of class setting your alignment', 'Slow adagio practice helps build centre balance', 'Work on port de bras to connect movement through the body'] },
        allegro:     { label: 'Jumps',        tips: ['Strengthen your demi-plié — it drives every jump', 'Land through the foot: toes, ball, heel', 'Start with petit allegro and build speed gradually'] },
        turns:       { label: 'Turns',        tips: ['Your preparation determines the turn — don\'t rush it', 'Spot a fixed point and whip the head', 'Practise the end position (landing) as much as the turn itself'] },
        flexibility: { label: 'Flexibility',  tips: ['Consistent daily stretching matters more than intensity', 'Warm up fully before any deep stretching', 'Work on hip flexor and hamstring length for higher extensions'] },
    };

    const weakDims = answeredCoreDims
        .sort((a, b) => a[1] - b[1])
        .slice(0, 2)
        .map(([k]) => k)
        .filter(k => FOCUS_SUGGESTIONS[k]);

    const workOnEl = document.getElementById('resultWorkOn');
    if (workOnEl && weakDims.length > 0) {
        workOnEl.innerHTML = `
            <p style="font-size:var(--fs-caption);font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:var(--text-muted);margin-bottom:var(--sp-md);">What to work on</p>
            ${weakDims.map(k => {
                const s = FOCUS_SUGGESTIONS[k];
                return `
                    <div style="margin-bottom:var(--sp-md);">
                        <p style="font-size:var(--fs-small);font-weight:700;color:var(--primary);margin-bottom:var(--sp-xs);">${s.label}</p>
                        <ul style="list-style:none;display:flex;flex-direction:column;gap:4px;">
                            ${s.tips.map(t => `<li style="font-size:var(--fs-small);color:var(--text-secondary);padding-left:var(--sp-md);position:relative;"><span style="position:absolute;left:0;color:var(--accent);">—</span>${t}</li>`).join('')}
                        </ul>
                    </div>`;
            }).join('')}
        `;
    } else if (workOnEl) {
        workOnEl.style.display = 'none';
    }
}

function showProfile() { showScreen('profile'); }

function completeAssessment() {
    // Results already calculated by submitAssessment — just navigate
    showScreen('profile');
}

function skipToProfile() {
    // Write a manual "joined" entry if nothing exists yet
    if (!appState.timeline?.length) {
        appendTimelineEntry({
            type:  'manual',
            title: 'Joined plié',
            body:  null,
            date:  new Date().toISOString().split('T')[0],
        });
    }
    appState.level = 'not-assessed';
    showScreen('profile');
}
/* ═══════════════════════════════════════════════════════════════
   8. INITIALISATION
   ═══════════════════════════════════════════════════════════════ */

// ── Load persisted state on startup ──
(function loadPersistedState() {
    const sessions         = storage.load('sessions');
    const sessionTemplates = storage.load('sessionTemplates');
    const sessionSkills    = storage.load('sessionSkills');
    const corrections      = storage.load('corrections');
    const assessments      = storage.load('assessments');
    const goals            = storage.load('goals');
    const timeline         = storage.load('timeline');
    const skillNotes       = storage.load('skillNotes');

    if (sessions)         appState.sessions         = sessions;
    if (sessionTemplates) appState.sessionTemplates = sessionTemplates;
    if (sessionSkills)    appState.sessionSkills    = sessionSkills;
    if (corrections)      appState.corrections      = corrections;
    if (assessments)      appState.assessments      = assessments;
    if (goals)            appState.goals            = goals.map(g => {
        if (g.status) return g;
        if (g.completed === true || g.completedAt) return { ...g, status: 'completed' };
        return { ...g, status: 'active' };
    });
    if (timeline)         appState.timeline         = timeline;
    if (skillNotes)       appState.skillNotes       = skillNotes;

    // Load preferences
    const prefs = storage.load('preferences');
    if (prefs) {
        appState.hidePointe     = prefs.hidePointe     ?? false;
        appState.profilePicture = prefs.profilePicture ?? null;
        appState.displayName    = prefs.displayName    ?? null;
        appState.trainingState  = prefs.trainingState  ?? 'active';
        appState._exploreAllDoneShown = prefs._exploreAllDoneShown ?? false;
    }

    // Merge persisted {id, tracked, flagged} onto DATA.skills reference objects
    loadUserSkillState();

    // Restore level + dimensions from most recent placement assessment
    const placements = (appState.assessments || []).filter(a => a.type === 'placement');
    const latest = placements[placements.length - 1];
    if (latest) {
        appState.level      = latest.level;
        appState.persona    = latest.persona || null;
        appState.dimensions = latest.dimensions;
        appState.answers    = latest.answers;
    }
    // Derive _assessmentWritten from stored data — not a persisted flag, so
    // always re-derive on load to correctly handle reload-between-quiz-and-result
    appState._assessmentWritten = placements.length > 0;

    // Seed mock data only if localStorage was genuinely empty (first install)
    seedMockData();
})();

/* ═══════════════════════════════════════════════════════════════
   PREFERENCES
   Single object persisted under plie:preferences.
   ═══════════════════════════════════════════════════════════════ */
function savePreferences() {
    storage.save('preferences', {
        hidePointe:     appState.hidePointe,
        profilePicture: appState.profilePicture,
        displayName:    appState.displayName,
        trainingState:  appState.trainingState,
        _exploreAllDoneShown: appState._exploreAllDoneShown,
    });
}

/* ═══════════════════════════════════════════════════════════════
   PROFILE STATUS CARD
   Renders the background status surface above the card stack.
   ═══════════════════════════════════════════════════════════════ */
function renderProfileStatus() {
    const el = document.getElementById('profileStatus');
    if (!el) return;

    const level = appState.level || 'not-assessed';
    const levelName = { duckling: 'Duckling', deer: 'Deer', swan: 'Swan', firebird: 'Firebird' }[level] || 'Not yet assessed';

    // Animal watermark — maps new level IDs to illustration keys
    const LEVEL_TO_ILLUS = { duckling: 'beginner', deer: 'improver', swan: 'intermediate', firebird: 'advanced',
                              beginner: 'beginner', elementary: 'beginner', improver: 'improver',
                              intermediate: 'intermediate', 'upper-intermediate': 'intermediate', advanced: 'advanced' };
    const animalSrc = ILLUSTRATIONS.levels[LEVEL_TO_ILLUS[level]] || null;

    // Avatar — uploaded photo, default illustration, or placeholder SVG
    let avatarContent;
    if (appState.profilePicture) {
        // Could be a data URL (uploaded) or a key into ILLUSTRATIONS.profiles
        const src = appState.profilePicture.startsWith('data:')
            ? appState.profilePicture
            : (ILLUSTRATIONS.profiles[appState.profilePicture] || null);
        avatarContent = src
            ? `<img src="${src}" alt="Profile picture">`
            : defaultAvatarSvg();
    } else {
        avatarContent = defaultAvatarSvg();
    }

    // Insight sentence — event-driven priority queue
    const insight = buildInsightSentence(level);

    // Assessed caveat
    const latestAssessment = (appState.assessments || [])
        .filter(a => a.type === 'placement')
        .slice(-1)[0];
    const assessedText = latestAssessment
        ? `orientation quiz · ${formatTimelineDate(latestAssessment.date)}`
        : null;
    const isAssessed = level !== 'not-assessed';

    el.innerHTML = `
        ${animalSrc ? `
        <div class="status-animal">
            <img src="${animalSrc}" alt="${levelName}">
        </div>` : ''}
        <div class="status-row">
            <div class="status-avatar-wrap">
                <div class="status-avatar" onclick="openPicPicker()">
                    ${avatarContent}
                </div>
                <div class="status-avatar-edit" onclick="openPicPicker()">
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round">
                        <path d="M6.5 1L8 2.5 3 7.5H1.5V6L6.5 1Z"/>
                    </svg>
                </div>
            </div>
            <div class="status-text">
                <div class="status-level-eyebrow">
                    <span>${levelName}</span>
                    ${assessedText ? `
                    <span style="color:var(--ink-4)">·</span>
                    <span class="assessed-note">${assessedText}</span>` : ''}
                </div>
                <div class="status-insight">${insight}</div>
            </div>
        </div>
    `;

    // Append orientation quiz CTA button via DOM (not inline HTML)
    const quizBtn = document.createElement('button');
    quizBtn.className = isAssessed ? 'profile-quiz-cta profile-quiz-retake' : 'profile-quiz-cta';
    quizBtn.textContent = isAssessed ? 'retake orientation quiz →' : 'start orientation quiz →';
    quizBtn.addEventListener('click', () => startOrientationQuiz());
    el.appendChild(quizBtn);
}

function defaultAvatarSvg() {
    return `<svg width="32" height="40" viewBox="0 0 32 40" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
        <circle cx="16" cy="7" r="5"/>
        <circle cx="19" cy="3" r="2.5" fill="currentColor" opacity=".3"/>
        <path d="M16 12 C16 20 16 26 16 30"/>
        <path d="M16 17 C12 16 7 16 4 17"/>
        <path d="M16 17 C20 16 25 16 28 17"/>
        <path d="M16 30 C14 34 12 37 11 40"/>
        <path d="M16 30 C18 34 20 37 21 40"/>
    </svg>`;
}

function buildInsightSentence(level) {
    if (appState.trainingState === 'resting')    return 'Taking a break.';
    if (appState.trainingState === 'recovering') return 'Focusing on recuperating.';

    // Priority queue: session today > milestone > correction pattern > assessment fallback
    const today = new Date().toISOString().split('T')[0];
    const lastSession = (appState.sessions || [])
        .slice().sort((a, b) => (b.savedAt || 0) - (a.savedAt || 0))[0];

    // 1. Session logged today
    if (lastSession?.date === today) {
        const corrCount = (appState.corrections || [])
            .filter(c => {
                const ss = (appState.sessionSkills || []).find(ss => ss.sessionId === lastSession.id);
                return ss && (ss.correctionIds || []).includes(c.id);
            }).length;
        if (corrCount > 0) {
            return `Session logged today with ${corrCount} correction${corrCount !== 1 ? 's' : ''}. Keep the record going.`;
        }
        return 'Session logged today. Good work — keep the record going.';
    }

    // 2. Recent milestone / goal completed
    const recentMilestone = (appState.timeline || [])
        .find(e => e.type === 'milestone' && e.date === today);
    if (recentMilestone) {
        return `Milestone reached today — ${recentMilestone.body || recentMilestone.title}.`;
    }

    // 3. Correction pattern — 3+ corrections on same skill this month
    const monthAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const recentCorrs = (appState.corrections || []).filter(c => c.createdAt > monthAgo);
    if (recentCorrs.length >= 3) {
        const skillCounts = {};
        recentCorrs.forEach(c => {
            if (c.skillId) skillCounts[c.skillId] = (skillCounts[c.skillId] || 0) + 1;
        });
        const topSkillId = Object.entries(skillCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
        const topSkill = topSkillId ? DATA.skills.find(s => s.id === topSkillId) : null;
        if (topSkill && skillCounts[topSkillId] >= 3) {
            return `${topSkill.french} is getting attention — ${skillCounts[topSkillId]} corrections this month pointing the same way.`;
        }
    }

    // 4. Assessment-based fallback per level
    const fallbacks = {
        'duckling':  'You\'re at the start of something. Log your first session to begin building a picture of your training.',
        'deer':      'A solid foundation developing well. Log sessions to start seeing where your corrections cluster.',
        'swan':      'Your technique is developing well. Log sessions to track where the most growth is happening.',
        'firebird':  'You\'re working at a high level. The app is most useful as a record of nuance at this stage.',
        'not-assessed': 'Take the placement quiz to get a picture of where you are and where to focus.',
        // backward compat
        'beginner':          'You\'re at the start of something. Log your first session to begin building a picture of your training.',
        'elementary':        'You\'re at the start of something. Log your first session to begin building a picture of your training.',
        'improver':          'A solid foundation developing well. Log sessions to start seeing where your corrections cluster.',
        'intermediate':      'Your technique is developing well. Log sessions to track where the most growth is happening.',
        'upper-intermediate':'Your technique is developing well. Log sessions to track where the most growth is happening.',
        'advanced':          'You\'re working at a high level. The app is most useful as a record of nuance at this stage.',
    };
    return fallbacks[level] || fallbacks['not-assessed'];
}

/* ═══════════════════════════════════════════════════════════════
   FOCUS AREA CARD STACK
   Replaces the old dimension bar chart.
   ═══════════════════════════════════════════════════════════════ */

// Focus area definitions — drives card rendering
const FOCUS_AREAS = [
    {
        id: 'pointe',
        name: 'Pointe',
        icon: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 11.5L3.5 6Q7 1.5 10.5 6Z" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linejoin="round"/></svg>`,
        optIn: true,  // hidden if hidePointe is true
        getDims: () => ({ pointe: appState.dimensions?.pointe ?? null }),
        getStats: () => {
            const corrs = (appState.corrections || []).filter(c => {
                const sk = DATA.skills.find(s => s.id === c.skillId);
                return sk?.dimensionId === 'pointe';
            });
            const sessions = getAreaLastSession(['pointe']);
            const goals = (appState.goals || []).filter(g => g.dimensionId === 'pointe' && !g.completedAt);
            return { corrections: corrs.length, lastSession: sessions, goals: goals.length };
        },
    },
    {
        id: 'artistry',
        name: 'Artistry',
        icon: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1.5 10C3.5 5.5 6.5 7.5 9 3.5 10 6 12.5 7.5 12.5 10" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linecap="round"/></svg>`,
        getDims: () => ({ musicality: appState.dimensions?.musicality ?? null }),
        getStats: () => {
            const corrs = (appState.corrections || []).filter(c => {
                const sk = DATA.skills.find(s => s.id === c.skillId);
                return sk?.dimensionId === 'musicality';
            });
            const sessions = getAreaLastSession(['musicality']);
            const goals = (appState.goals || []).filter(g => g.dimensionId === 'musicality' && !g.completedAt);
            return { corrections: corrs.length, lastSession: sessions, goals: goals.length };
        },
    },
    {
        id: 'body',
        name: 'The Body',
        icon: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><ellipse cx="7" cy="3.2" rx="2" ry="2" stroke="currentColor" stroke-width="1.2"/><path d="M2.5 13C2.5 9.5 11.5 9.5 11.5 13" stroke="currentColor" stroke-width="1.2" fill="none"/></svg>`,
        subdims: [
            { key: 'flexibility', label: 'Flexibility' },
        ],
        getDims: () => ({
            flexibility: appState.dimensions?.flexibility ?? null,
        }),
        getStats: () => {
            const corrs = (appState.corrections || []).filter(c => {
                const sk = DATA.skills.find(s => s.id === c.skillId);
                return sk?.dimensionId === 'flexibility';
            });
            const sessions = getAreaLastSession(['flexibility']);
            const goals = (appState.goals || []).filter(g =>
                ['flexibility'].includes(g.dimensionId) && !g.completedAt);
            return { corrections: corrs.length, lastSession: sessions, goals: goals.length };
        },
    },
    {
        id: 'movement',
        name: 'Movement',
        icon: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5L11.5 7 7 12.5 2.5 7Z" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linejoin="round"/></svg>`,
        subdims: [
            { key: 'turns',   label: 'Turns'   },
            { key: 'allegro', label: 'Allegro'  },
        ],
        getDims: () => ({
            turns:   appState.dimensions?.turns   ?? null,
            allegro: appState.dimensions?.allegro ?? null,
        }),
        getStats: () => {
            const corrs = (appState.corrections || []).filter(c => {
                const sk = DATA.skills.find(s => s.id === c.skillId);
                return ['turns','allegro'].includes(sk?.dimensionId);
            });
            const sessions = getAreaLastSession(['turns','allegro']);
            const goals = (appState.goals || []).filter(g =>
                ['turns','allegro'].includes(g.dimensionId) && !g.completedAt);
            return { corrections: corrs.length, lastSession: sessions, goals: goals.length };
        },
    },
    {
        id: 'technique',
        name: 'Technique',
        icon: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="2" width="12" height="1.4" rx=".7" fill="currentColor"/><rect x="1" y="5.8" width="8" height="1.4" rx=".7" fill="currentColor"/><rect x="1" y="9.6" width="10" height="1.4" rx=".7" fill="currentColor"/></svg>`,
        getDims: () => ({
            barre:  appState.dimensions?.barre  ?? null,
            centre: appState.dimensions?.centre ?? null,
        }),
        getStats: () => {
            const corrs = (appState.corrections || []).filter(c => {
                const sk = DATA.skills.find(s => s.id === c.skillId);
                return ['barre','centre'].includes(sk?.dimensionId);
            });
            const sessions = getAreaLastSession(['barre','centre']);
            const goals = (appState.goals || []).filter(g =>
                ['barre','centre'].includes(g.dimensionId) && !g.completedAt);
            return { corrections: corrs.length, lastSession: sessions, goals: goals.length };
        },
    },
];

function getAreaLastSession(dimIds) {
    // Find most recent session that had a skill from these dimensions
    const skillIds = DATA.skills
        .filter(s => dimIds.includes(s.dimensionId))
        .map(s => s.id);
    const relevant = (appState.sessionSkills || [])
        .filter(ss => skillIds.includes(ss.skillId))
        .map(ss => appState.sessions.find(s => s.id === ss.sessionId))
        .filter(Boolean)
        .sort((a, b) => (b.savedAt || 0) - (a.savedAt || 0));
    if (!relevant[0]) return null;
    return formatTimelineDate(relevant[0].date);
}

function renderFocusCardStack() {
    const el = document.getElementById('focusCardStack');
    if (!el) return;

    const areas = FOCUS_AREAS.filter(a => {
        if (a.id === 'pointe' && appState.hidePointe) return false;
        return true;
    });

    el.innerHTML = areas.map((area, i) => renderFocusCard(area, i)).join('');
}

function renderFocusCard(area, stackIndex) {
    const zIndex = stackIndex + 1;
    const dims = area.getDims();
    const stats = area.getStats();
    const allNull = Object.values(dims).every(v => v === null);

    // Goals pill
    const activeGoals = (appState.goals || []).filter(g =>
        g.dimensionId && Object.keys(dims).includes(g.dimensionId) && !g.completedAt);

    const pillHtml = activeGoals.length > 0
        ? `<span class="focus-card-pill">${activeGoals.length} goal${activeGoals.length !== 1 ? 's' : ''}</span>`
        : '';

    const headerHtml = `
        <div class="focus-card-header">
            <div class="focus-card-header-left">
                <div class="focus-card-icon">${area.icon}</div>
                <span class="focus-card-name">${area.name}</span>
                ${pillHtml}
            </div>
            ${allNull ? `<span style="font-size:10px;color:var(--ink-4)">${area.optIn ? '+ add' : 'not assessed'}</span>` : `<span class="focus-card-caret">›</span>`}
        </div>
    `;

    if (allNull) {
        // Empty/unassessed card
        const hint = area.optIn
            ? 'Add if pointe is part of your training'
            : `Assess ${area.name.toLowerCase()} to see your profile`;
        return `
            <div class="focus-card-empty" style="z-index:${zIndex}${area.optIn ? ';opacity:.55' : ''}"
                 onclick="openFocusAreaSheet('${area.id}')">
                ${headerHtml}
                <span class="focus-card-hint">${hint}</span>
            </div>
        `;
    }

    // Build body
    let bodyContent = '';

    if (area.subdims && area.subdims.length > 1) {
        // Multi-subdim card (Movement, Body)
        const assessedCount = area.subdims.filter(sd => dims[sd.key] !== null).length;
        const totalCount = area.subdims.length;
        if (assessedCount < totalCount) {
            bodyContent += `
                <div class="focus-card-nudge">
                    <div class="focus-card-nudge-dot"></div>
                    <span class="focus-card-nudge-text">${assessedCount} of ${totalCount} assessed · ${totalCount - assessedCount} question${totalCount - assessedCount !== 1 ? 's' : ''} to complete</span>
                </div>`;
        }
        bodyContent += `<div class="focus-subdims">`;
        area.subdims.forEach(sd => {
            const d = dims[sd.key];
            const pct = d ? Math.round((d.progressWithin || 0)) : 0;
            const stageLabel = d ? `${d.stage + 1} of 4` : 'not assessed';
            bodyContent += `
                <div class="focus-subdim">
                    <div class="focus-subdim-name">${sd.label} · ${stageLabel}</div>
                    <div class="focus-subdim-track">
                        <div class="focus-subdim-fill" style="width:${d ? (d.stage * 25 + pct * 0.25) : 0}%"></div>
                    </div>
                </div>`;
        });
        bodyContent += `</div>`;
    } else {
        // Single-dim card (Technique, Artistry, Pointe)
        const firstDim = Object.values(dims)[0];
        if (firstDim) {
            const fillPct = firstDim.stage * 25 + (firstDim.progressWithin || 0) * 0.25;
            bodyContent += `
                <div class="focus-card-stage-row">
                    <span class="focus-card-stage-l">${firstDim.stage + 1} of 4</span>
                    <span class="focus-card-stage-r">${
                        (appState.assessments || []).slice(-1)[0]?.date
                            ? `updated ${formatTimelineDate((appState.assessments || []).slice(-1)[0].date)}`
                            : ''
                    }</span>
                </div>
                <div class="focus-card-track">
                    <div class="focus-card-track-fill" style="width:${fillPct}%"></div>
                </div>`;
        }
    }

    // Signal row
    let signalText = 'no activity yet';
    let signalMuted = true;

    if (stats.lastSession) {
        signalText = `last session ${stats.lastSession}`;
        signalMuted = false;
    }
    if (stats.goals > 0) {
        signalText = `${stats.goals} active goal${stats.goals !== 1 ? 's' : ''}`;
        signalMuted = false;
    }

    bodyContent += `<div class="focus-card-signal ${signalMuted ? 'muted' : ''}">${signalText}</div>`;

    return `
        <div class="focus-card" style="z-index:${zIndex}" onclick="openFocusAreaSheet('${area.id}')">
            ${headerHtml}
            <div class="focus-card-body">${bodyContent}</div>
        </div>
    `;
}

/* ═══════════════════════════════════════════════════════════════
   FOCUS AREA SHEET
   Bottom sheet, same pattern as session logger.
   ═══════════════════════════════════════════════════════════════ */
function openFocusAreaSheet(areaId) {
    const area = FOCUS_AREAS.find(a => a.id === areaId);
    if (!area) return;

    document.getElementById('focus-sheet-title').textContent = area.name;
    document.getElementById('focus-sheet-eyebrow').textContent = 'Focus area';

    // Build content
    renderFocusSheetContent(area);

    const overlay = document.getElementById('focus-area-overlay');
    if (!overlay) return;
    overlay.classList.add('open');
}

function closeFocusAreaSheet() {
    document.getElementById('focus-area-overlay')?.classList.remove('open');
}

function closeFocusAreaSheetOnBackdrop(e) {
    if (e.target === document.getElementById('focus-area-overlay')) closeFocusAreaSheet();
}

function renderFocusSheetContent(area) {
    const dims = area.getDims();
    const stats = area.getStats();
    const allNull = Object.values(dims).every(v => v === null);
    const body = document.getElementById('focus-sheet-body');
    const tabRow = document.getElementById('focus-sheet-tabs');
    if (!body || !tabRow) return;

    // Build correction data for this area
    const areaDimIds = Object.keys(dims);
    const areaSkillIds = DATA.skills
        .filter(s => areaDimIds.includes(s.dimensionId))
        .map(s => s.id);
    const areaCorrs = (appState.corrections || [])
        .filter(c => areaSkillIds.includes(c.skillId))
        .sort((a, b) => b.createdAt - a.createdAt);
    const areaGoals = (appState.goals || [])
        .filter(g => areaDimIds.includes(g.dimensionId) && !g.completedAt);
    const areaSessions = (appState.sessionSkills || [])
        .filter(ss => areaSkillIds.includes(ss.skillId))
        .map(ss => appState.sessions.find(s => s.id === ss.sessionId))
        .filter(Boolean)
        .sort((a, b) => (b.savedAt || 0) - (a.savedAt || 0))
        .filter((s, i, arr) => arr.findIndex(x => x.id === s.id) === i)
        .slice(0, 3);

    // Determine tabs — only show if data exists
    const tabs = [];
    if (areaCorrs.length > 0) tabs.push('corrections');
    if (areaGoals.length > 0) tabs.push('goals');
    if (areaCorrs.length > 0 || areaGoals.length > 0) tabs.push('focus');
    if (areaSessions.length > 0) tabs.push('connected sessions');

    // Tab row
    if (tabs.length === 0) {
        tabRow.style.display = 'none';
    } else {
        tabRow.style.display = 'flex';
        tabRow.innerHTML = tabs.map((t, i) => `
            <button class="focus-sheet-tab ${i === 0 ? 'active' : ''}"
                    data-sec="fss-${t.replace(/ /g,'-')}"
                    onclick="focusSheetJumpTab(this)">
                ${t}
            </button>`).join('');
    }

    // Body HTML
    let html = '';

    // Stage card
    if (!allNull) {
        html += `<div class="focus-sheet-section">`;
        if (area.subdims && area.subdims.length > 1) {
            html += `<div class="focus-sheet-stage-card"><div class="focus-sheet-stage-main">`;
            area.subdims.forEach(sd => {
                const d = dims[sd.key];
                const fillPct = d ? d.stage * 25 + (d.progressWithin || 0) * 0.25 : 0;
                html += `
                    <div class="focus-sheet-stage-label" style="${!d ? 'color:var(--ink-4)' : ''}">${sd.label}${d ? ` · ${d.stage + 1} of 4` : ' · not assessed'}</div>
                    <div class="focus-card-track" style="margin-bottom:8px">
                        <div class="focus-card-track-fill" style="width:${fillPct}%"></div>
                    </div>`;
            });
            html += `</div><div class="focus-sheet-stage-aside">
                <div class="focus-sheet-stage-label">assessed</div>
                <div style="font-size:13px;color:var(--ink-2)">${stats.lastSession || 'not yet'}</div>
            </div></div>`;
        } else {
            const firstDim = Object.values(dims).find(d => d !== null);
            if (firstDim) {
                const fillPct = firstDim.stage * 25 + (firstDim.progressWithin || 0) * 0.25;
                html += `<div class="focus-sheet-stage-card">
                    <div class="focus-sheet-stage-main">
                        <div class="focus-sheet-stage-label">where you are</div>
                        <div class="focus-sheet-stage-value">${firstDim.stage + 1} of 4</div>
                        <div class="focus-card-track"><div class="focus-card-track-fill" style="width:${fillPct}%"></div></div>
                    </div>
                    <div class="focus-sheet-stage-aside">
                        <div class="focus-sheet-stage-label">assessed</div>
                        <div style="font-size:13px;color:var(--ink-2)">${stats.lastSession || 'not yet'}</div>
                    </div>
                </div>`;
            }
        }
        html += `</div>`;
    } else {
        // Fully unassessed
        html += `<div class="focus-sheet-section">
            <div class="focus-sheet-ep">
                <div class="focus-sheet-ep-title">${area.optIn ? 'Add to your profile?' : 'Not yet assessed'}</div>
                <div class="focus-sheet-ep-body">${area.optIn
                    ? 'If pointe work is part of your training, adding it lets you track corrections and see how your areas connect.'
                    : `Assess ${area.name.toLowerCase()} to see your stage and get personalised focus.`}</div>
                <button class="focus-assess-btn" onclick="${area.optIn ? `dismissAndAddPointe()` : `startPlacementQuiz(); closeFocusAreaSheet();`}">
                    ${area.optIn ? 'add pointe to my profile' : `assess ${area.name.toLowerCase()}`}
                </button>
            </div>
        </div>`;
    }

    // What this means
    html += `<div class="focus-sheet-section" id="fss-what-this-means">
        <div class="focus-sheet-divider" style="margin-top:0;margin-bottom:var(--sp-lg)"></div>
        <div class="focus-sheet-section-label">what this means</div>
        <div class="focus-sheet-body-text">${getFocusAreaDescription(area.id, dims)}</div>
    </div>`;

    // Focus section (if corrections exist)
    if (areaCorrs.length > 0) {
        const focusSuggestion = getFocusSuggestion(areaCorrs, areaSkillIds);
        html += `<div class="focus-sheet-section" id="fss-focus">
            <div class="focus-sheet-divider" style="margin-top:var(--sp-lg);margin-bottom:var(--sp-lg)"></div>
            <div class="focus-sheet-section-label">focus</div>
            <div class="focus-sheet-focus-block">
                <div class="focus-sheet-body-text">${focusSuggestion.text}</div>
                ${focusSuggestion.skills.length > 0 ? `<div style="margin-top:8px">
                    ${focusSuggestion.skills.map(s => `<span class="focus-sheet-skill-tag" onclick="showSkillDetail('${s.id}','profile')">${s.french}</span>`).join('')}
                </div>` : ''}
            </div>
        </div>`;
    }

    // Corrections
    html += `<div class="focus-sheet-section" id="fss-corrections">
        <div class="focus-sheet-divider" style="margin-top:var(--sp-lg);margin-bottom:var(--sp-lg)"></div>
        <div class="focus-sheet-section-label">corrections <span style="font-size:10px;color:var(--ink-4);font-weight:400;text-transform:none;letter-spacing:0">${areaCorrs.length} total</span></div>`;
    if (areaCorrs.length === 0) {
        html += `<div class="focus-empty-state">No corrections logged for this area yet.</div>`;
    } else {
        const preview = areaCorrs.slice(0, 2);
        preview.forEach(c => {
            const skill = DATA.skills.find(s => s.id === c.skillId);
            html += `<div class="focus-sheet-corr">
                <div class="focus-sheet-corr-text">"${c.text}"</div>
                <div class="focus-sheet-corr-meta">${[skill?.french, formatTimelineDate(new Date(c.createdAt).toISOString().split('T')[0])].filter(Boolean).join(' · ')}</div>
            </div>`;
        });
        if (areaCorrs.length > 2) {
            html += `<div style="text-align:center;padding:8px 0 2px">
                <span style="font-size:12px;color:var(--gold);border-bottom:1px solid var(--gold-soft);cursor:pointer"
                      onclick="navigateTo('barre')">see all ${areaCorrs.length} corrections →</span>
            </div>`;
        }
    }
    html += `</div>`;

    // Goals
    html += `<div class="focus-sheet-section" id="fss-goals">
        <div class="focus-sheet-divider" style="margin-top:var(--sp-lg);margin-bottom:var(--sp-lg)"></div>
        <div class="focus-sheet-section-label">goals</div>`;
    if (areaGoals.length === 0) {
        html += `<div class="focus-empty-state">No active goals for this area.</div>`;
    } else {
        areaGoals.forEach(g => {
            const milestones = g.milestones || [];
            const done = milestones.filter(m => m.done).length;
            html += `<div class="focus-sheet-goal-row">
                <div class="focus-sheet-goal-dot"></div>
                <div class="focus-sheet-goal-text">${g.title}</div>
                ${milestones.length > 0 ? `<div class="focus-sheet-goal-progress">${done} of ${milestones.length}</div>` : ''}
            </div>`;
        });
    }
    html += `</div>`;

    // Connected sessions
    html += `<div class="focus-sheet-section" id="fss-connected-sessions">
        <div class="focus-sheet-divider" style="margin-top:var(--sp-lg);margin-bottom:var(--sp-lg)"></div>
        <div class="focus-sheet-section-label">connected sessions</div>`;
    if (areaSessions.length === 0) {
        html += `<div class="focus-empty-state">No sessions linked to this area yet.</div>`;
    } else {
        areaSessions.forEach(s => {
            const corrCount = (appState.sessionSkills || [])
                .filter(ss => ss.sessionId === s.id && areaSkillIds.includes(ss.skillId))
                .flatMap(ss => ss.correctionIds || []).length;
            html += `<div class="focus-sheet-session-row" onclick="showSessionDetail(${s.id}); closeFocusAreaSheet();" style="cursor:pointer">
                <div class="focus-sheet-session-title">${s.sessionName || 'Session'}</div>
                <div class="focus-sheet-session-meta">${formatTimelineDate(s.date)}${corrCount > 0 ? ` · ${corrCount} correction${corrCount !== 1 ? 's' : ''}` : ''}</div>
            </div>`;
        });
    }
    html += `</div>`;

    // How this fits
    html += `<div class="focus-sheet-section" id="fss-how-this-fits">
        <div class="focus-sheet-divider" style="margin-top:var(--sp-lg);margin-bottom:var(--sp-lg)"></div>
        <div class="focus-sheet-section-label">how this fits</div>
        <div class="focus-sheet-tags">${getFocusAreaTags(area.id).map(t => `<span class="focus-sheet-tag">${t}</span>`).join('')}</div>
    </div>`;

    // Assessment history
    const assessmentHistory = (appState.assessments || []).filter(a => a.type === 'placement');
    html += `<div class="focus-sheet-section" id="fss-assessment-history" style="padding-bottom:20px">
        <div class="focus-sheet-divider" style="margin-top:var(--sp-lg);margin-bottom:var(--sp-lg)"></div>
        <div class="focus-sheet-section-label">assessment history</div>
        <button class="focus-assess-history-btn" onclick="toggleFocusAssessHistory(this)">
            <span class="focus-sheet-body-text" style="color:var(--ink-3)">${assessmentHistory.length > 0 ? `${assessmentHistory.length} data point${assessmentHistory.length !== 1 ? 's' : ''}` : 'No data yet'}</span>
            <svg class="focus-assess-chev" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 5L7 9L11 5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="focus-assess-list">
            ${assessmentHistory.map(a => `
                <div class="focus-assess-row">
                    <div>
                        <div class="focus-assess-type">Placement quiz</div>
                        <div class="focus-assess-date">${a.date}</div>
                    </div>
                    <span class="focus-assess-taken">taken</span>
                </div>`).join('')}
            <button class="focus-assess-add-btn" onclick="startPlacementQuiz(); closeFocusAreaSheet();">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 1v9M1 5.5h9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                reassess this area
            </button>
        </div>
    </div>`;

    // Pointe-specific dismiss button
    if (area.id === 'pointe') {
        html += `<button class="focus-sheet-dismiss-btn" onclick="dismissPointe()">hide pointe from my profile</button>`;
    }

    body.innerHTML = html;
}

function focusSheetJumpTab(btn) {
    const secId = btn.dataset.sec;
    const target = document.getElementById(secId);
    if (!target) return;
    document.querySelectorAll('.focus-sheet-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const bodyEl = document.getElementById('focus-sheet-body');
    if (!bodyEl) return;
    const bodyRect = bodyEl.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    bodyEl.scrollTop += targetRect.top - bodyRect.top - 10;
}

function toggleFocusAssessHistory(btn) {
    const list = btn.nextElementSibling;
    const chev = btn.querySelector('.focus-assess-chev');
    const open = list.style.display === 'block';
    list.style.display = open ? 'none' : 'block';
    chev.classList.toggle('open', !open);
}

function getFocusAreaDescription(areaId, dims) {
    const descs = {
        technique: 'Your barre and centre work form the foundation of everything. This is where placement, turnout, and control are built and maintained.',
        movement:  'Turns and jumps are the most dynamic parts of class — they demand speed, coordination, and confidence on top of everything the barre builds.',
        body:      'Flexibility, strength, and turnout underpin your range of movement and the quality of your positions. These are trainable with consistent work.',
        artistry:  'Musicality, phrasing, and épaulement — the expressive dimension of your dancing. Distinct from technique, this is how you inhabit the music.',
        pointe:    'Pointe work demands exceptional strength and technique. It sits alongside your other areas but requires its own dedicated attention.',
    };
    return descs[areaId] || '';
}

function getFocusSuggestion(corrs, skillIds) {
    // Find the skill with the most corrections
    const counts = {};
    corrs.forEach(c => {
        if (skillIds.includes(c.skillId)) {
            counts[c.skillId] = (counts[c.skillId] || 0) + 1;
        }
    });
    const topIds = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 2).map(e => e[0]);
    const topSkills = topIds.map(id => DATA.skills.find(s => s.id === id)).filter(Boolean);

    if (topSkills.length === 0) {
        return { text: 'Log sessions and tag skills to start seeing patterns in your corrections.', skills: [] };
    }
    const count = corrs.length;
    return {
        text: `${count} correction${count !== 1 ? 's' : ''} logged for this area. ${topSkills[0].french} is getting the most attention — worth deliberate focus.`,
        skills: topSkills,
    };
}

function getFocusAreaTags(areaId) {
    const tags = {
        technique: ['feeds into Turns', 'feeds into Allegro', 'draws from Strength', 'draws from Turnout'],
        movement:  ['draws from Technique', 'draws from Strength', 'draws from Turnout'],
        body:      ['feeds into Technique', 'feeds into Turns', 'feeds into Allegro'],
        artistry:  ['complements Technique', 'complements Turns'],
        pointe:    ['draws from Technique', 'draws from The Body'],
    };
    return tags[areaId] || [];
}

function dismissPointe() {
    appState.hidePointe = true;
    savePreferences();
    closeFocusAreaSheet();
    renderFocusCardStack();
    // Show toast
    const toast = document.createElement('div');
    toast.className = 'goal-complete-toast';
    toast.innerHTML = `<span>Pointe hidden. Complete a pointe assessment to restore it.</span>`;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('visible'));
    setTimeout(() => { toast.classList.remove('visible'); setTimeout(() => toast.remove(), 300); }, 4000);
}

function dismissAndAddPointe() {
    appState.hidePointe = false;
    savePreferences();
    closeFocusAreaSheet();
    renderFocusCardStack();
}

/* ═══════════════════════════════════════════════════════════════
   SETTINGS SHEET
   ═══════════════════════════════════════════════════════════════ */
function openSettings() {
    renderSettings();
    const overlay = document.getElementById('settings-overlay');
    if (!overlay) return;
    overlay.classList.add('open');
    document.querySelector('.fab')?.classList.remove('visible');
    document.querySelector('.bottom-nav')?.classList.remove('visible');
}

function closeSettings() {
    document.getElementById('settings-overlay')?.classList.remove('open');
    const isAppScreen = !['assessment','completion','results'].includes(appState.currentScreen)
        && !appState.currentScreen.startsWith('onboarding');
    if (isAppScreen) {
        document.querySelector('.fab')?.classList.add('visible');
        document.querySelector('.bottom-nav')?.classList.add('visible');
    }
}

function closeSettingsOnBackdrop(e) {
    if (e.target === document.getElementById('settings-overlay')) closeSettings();
}

function renderSettings() {
    const body = document.getElementById('settings-body');
    if (!body) return;

    body.innerHTML = `
        <!-- Profile -->
        <div class="settings-section">
            <div class="settings-section-label">Profile</div>
            <div class="settings-row">
                <div>
                    <div class="settings-row-label">Profile picture</div>
                </div>
                <button class="settings-row-action" onclick="openPicPicker()">change</button>
            </div>
            <div class="settings-row">
                <div>
                    <div class="settings-row-label">Display name</div>
                    <div class="settings-row-sub">${appState.displayName || 'Not set'}</div>
                </div>
                <button class="settings-row-action" onclick="editDisplayName()">edit</button>
            </div>
        </div>

        <!-- My training -->
        <div class="settings-section">
            <div class="settings-section-label">My training</div>
            <div class="settings-row settings-row--stacked">
                <div class="settings-row-label">Training state</div>
                <div class="training-state-selector">
                    ${['active', 'resting', 'recovering'].map(s => `
                    <button class="training-state-opt${appState.trainingState === s ? ' selected' : ''}"
                            onmousedown="setTrainingState('${s}')">${s}</button>`).join('')}
                </div>
            </div>
            ${(() => {
                const p = appState._trainingStatePrompt;
                if (!p) return '';
                const goalWord = p.count === 1 ? 'goal' : `${p.count} goals`;
                const itThem   = p.count === 1 ? 'it'   : 'them';
                if (p.type === 'pause') {
                    const stateWord = p.state === 'recovering' ? 'recuperating' : 'resting';
                    return `<div class="training-state-prompt">
                        <div class="training-state-prompt-body">You have ${p.count === 1 ? 'an active goal' : `${p.count} active goals`}. Do you want to pause ${itThem} while you're ${stateWord}?</div>
                        <div class="training-state-prompt-actions">
                            <button class="training-state-prompt-btn" onmousedown="pauseGoalsForTrainingState()">pause ${goalWord}</button>
                            <button class="training-state-prompt-btn training-state-prompt-dismiss" onmousedown="dismissTrainingStatePrompt()">not now</button>
                        </div>
                    </div>`;
                }
                if (p.type === 'reactivate') {
                    return `<div class="training-state-prompt">
                        <div class="training-state-prompt-body">You have ${p.count === 1 ? 'a paused goal' : `${p.count} paused goals`} from before your break. Do you want to reactivate ${itThem}?</div>
                        <div class="training-state-prompt-actions">
                            <button class="training-state-prompt-btn" onmousedown="reactivateGoalsForTrainingState()">reactivate</button>
                            <button class="training-state-prompt-btn training-state-prompt-dismiss" onmousedown="dismissTrainingStatePrompt()">leave them</button>
                        </div>
                    </div>`;
                }
                return '';
            })()}
            <div class="settings-row">
                <div>
                    <div class="settings-row-label">Pointe work</div>
                    <div class="settings-row-sub">Show pointe in profile and assessments</div>
                </div>
                <button class="settings-toggle ${!appState.hidePointe ? 'on' : ''}"
                        onclick="togglePointeSetting(this)"></button>
            </div>
        </div>

        <!-- Notifications -->
        <div class="settings-section">
            <div class="settings-section-label">Notifications</div>
            <div class="settings-row">
                <div>
                    <div class="settings-row-label">Session reminders</div>
                    <div class="settings-row-sub settings-tbd">coming soon</div>
                </div>
            </div>
            <div class="settings-row">
                <div>
                    <div class="settings-row-label">Reflection prompts</div>
                    <div class="settings-row-sub settings-tbd">coming soon</div>
                </div>
            </div>
            <div class="settings-row">
                <div>
                    <div class="settings-row-label">Milestone celebrations</div>
                    <div class="settings-row-sub settings-tbd">coming soon</div>
                </div>
            </div>
        </div>

        <!-- Display -->
        <div class="settings-section">
            <div class="settings-section-label">Display</div>
            <div class="settings-row">
                <div>
                    <div class="settings-row-label">Dark mode</div>
                    <div class="settings-row-sub settings-tbd">coming soon</div>
                </div>
            </div>
        </div>

        <!-- Data -->
        <div class="settings-section">
            <div class="settings-section-label">Data</div>
            <div class="settings-row">
                <div>
                    <div class="settings-row-label">Export training log</div>
                    <div class="settings-row-sub settings-tbd">coming soon — PDF and CSV</div>
                </div>
            </div>
            <div class="settings-row">
                <div>
                    <div class="settings-row-label">Reset all data</div>
                    <div class="settings-row-sub">Wipes everything and restarts onboarding</div>
                </div>
                <button class="settings-danger-btn" onclick="closeSettings(); confirmResetProfile();">reset</button>
            </div>
        </div>

        <!-- Account -->
        <div class="settings-section">
            <div class="settings-section-label">Account</div>
            <div class="settings-row">
                <div>
                    <div class="settings-row-label">Sign in / create account</div>
                    <div class="settings-row-sub settings-tbd">coming soon — enables sync across devices</div>
                </div>
            </div>
        </div>

        <!-- About -->
        <div class="settings-section" style="padding-bottom: var(--sp-3xl);">
            <div class="settings-section-label">About</div>
            <div class="settings-row">
                <div class="settings-row-label">Privacy policy</div>
                <span class="settings-tbd">coming soon</span>
            </div>
            <div class="settings-row">
                <div class="settings-row-label">Terms of service</div>
                <span class="settings-tbd">coming soon</span>
            </div>
            <div class="settings-row">
                <div class="settings-row-label">Version</div>
                <span style="font-size:var(--fs-small);color:var(--ink-4);">0.1 beta</span>
            </div>
        </div>
    `;
}

function setTrainingState(state) {
    const prev = appState.trainingState;
    appState.trainingState = state;
    savePreferences();

    const activeGoals = (appState.goals || []).filter(g => g.status === 'active');
    const pausedByTraining = (appState.goals || []).filter(g => g.status === 'paused' && g.pausedByTrainingState);

    if (prev === 'active' && (state === 'resting' || state === 'recovering') && activeGoals.length > 0) {
        appState._trainingStatePrompt = { type: 'pause', count: activeGoals.length, state };
    } else if ((prev === 'resting' || prev === 'recovering') && state === 'active' && pausedByTraining.length > 0) {
        appState._trainingStatePrompt = { type: 'reactivate', count: pausedByTraining.length };
    } else {
        appState._trainingStatePrompt = null;
    }

    renderSettings();
}

function pauseGoalsForTrainingState() {
    const now = Date.now();
    (appState.goals || []).forEach(g => {
        if (g.status === 'active') {
            g.status = 'paused';
            g.pausedAt = now;
            g.pausedByTrainingState = true;
        }
    });
    storage.save('goals', appState.goals);
    appState._trainingStatePrompt = null;
    renderSettings();
}

function reactivateGoalsForTrainingState() {
    (appState.goals || []).forEach(g => {
        if (g.status === 'paused' && g.pausedByTrainingState) {
            g.status = 'active';
            g.pausedAt = null;
            g.pausedByTrainingState = false;
        }
    });
    storage.save('goals', appState.goals);
    appState._trainingStatePrompt = null;
    renderSettings();
}

function dismissTrainingStatePrompt() {
    appState._trainingStatePrompt = null;
    renderSettings();
}

function togglePointeSetting(btn) {
    const isOn = btn.classList.contains('on');
    appState.hidePointe = isOn;
    btn.classList.toggle('on', !isOn);
    savePreferences();
    renderFocusCardStack();
}

function editDisplayName() {
    const current = appState.displayName || '';
    const name = window.prompt('Display name (optional):', current);
    if (name === null) return; // cancelled
    appState.displayName = name.trim() || null;
    savePreferences();
    renderSettings();
    renderProfileStatus();
}

/* ═══════════════════════════════════════════════════════════════
   PROFILE PICTURE PICKER
   ═══════════════════════════════════════════════════════════════ */
function openPicPicker() {
    renderPicPicker();
    document.getElementById('pic-picker-overlay')?.classList.add('open');
}

function closePicPicker() {
    document.getElementById('pic-picker-overlay')?.classList.remove('open');
}

function closePicPickerOnBackdrop(e) {
    if (e.target === document.getElementById('pic-picker-overlay')) closePicPicker();
}

function renderPicPicker() {
    const body = document.getElementById('pic-picker-body');
    if (!body) return;

    const defaults = Object.keys(ILLUSTRATIONS.profiles);

    const defaultItems = defaults.map(key => `
        <div class="pic-picker-item ${appState.profilePicture === key ? 'selected' : ''}"
             onclick="selectProfilePicture('${key}')">
            <img src="${ILLUSTRATIONS.profiles[key]}" alt="">
        </div>
    `).join('');

    body.innerHTML = `
        <div class="pic-picker-grid">
            ${defaultItems}
            <button class="pic-picker-upload" onclick="uploadProfilePicture()">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="2" y="2" width="16" height="16" rx="3"/><line x1="10" y1="6" x2="10" y2="14"/><line x1="6" y1="10" x2="14" y2="10"/></svg>
                upload photo
            </button>
        </div>
        <p class="pic-picker-note">More illustrations coming soon. Upload your own photo to personalise your profile.</p>
        <input type="file" id="pic-upload-input" accept="image/*" style="display:none" onchange="handlePicUpload(this)">
    `;
}

function selectProfilePicture(key) {
    appState.profilePicture = key;
    savePreferences();
    closePicPicker();
    renderProfileStatus();
}

function uploadProfilePicture() {
    document.getElementById('pic-upload-input')?.click();
}

function handlePicUpload(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        appState.profilePicture = e.target.result; // data URL
        savePreferences();
        closePicPicker();
        renderProfileStatus();
    };
    reader.readAsDataURL(file);
}

// Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('SW registered:', reg.scope))
            .catch(err => console.log('SW registration failed:', err));
    });
}
