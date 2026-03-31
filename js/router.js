/* ═══════════════════════════════════════════════════════════════
   3. NAVIGATION — Central Router
   All screen transitions go through here.
   ═══════════════════════════════════════════════════════════════ */

function showScreen(screenId) {
    document.querySelectorAll('.screen, .onboarding-screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId)?.classList.add('active');
    appState.currentScreen = screenId;

    const isAppScreen = !['assessment', 'completion', 'results'].includes(screenId) && !screenId.startsWith('onboarding');
    if (!screenId.startsWith('onboarding')) {
        const nav = document.querySelector('.bottom-nav');
        const fab = document.querySelector('.fab');
        if (isAppScreen) {
            nav?.classList.add('visible');
            fab?.classList.add('visible');
        } else {
            nav?.classList.remove('visible');
            fab?.classList.remove('visible');
        }
    }

    if (screenId === 'profile') initProfile();
}

function navigateTo(section) {
    // Clear history — user explicitly jumped to a top-level section
    appState.navHistory = [];

    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector(`[data-nav="${section}"]`)?.classList.add('active');
    appState.currentNav = section;

    const routes = {
        barre:   () => showBarreScreen(),
        goals:   () => { showGoalsScreen(); window.scrollTo({ top: 0, behavior: 'instant' }); },
        learn:   () => showLearnScreen(),
        profile: () => { showScreen('profile'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    };

    (routes[section] || routes.barre)();
}

/* ── Navigation History Stack ──────────────────────────────────
   Call pushNavHistory() before navigating *forward* to a detail
   screen.  goBack() pops and restores the previous screen,
   including correct bottom-nav highlight and scroll position.
   ──────────────────────────────────────────────────────────── */

function pushNavHistory() {
    const current = appState.currentScreen;
    if (!current) return;

    // Capture scroll position when leaving profile so it can be restored
    const entry = { screenId: current };
    if (current === 'profile') entry.scrollY = window.scrollY;

    // Avoid consecutive duplicates
    const last = appState.navHistory[appState.navHistory.length - 1];
    if (last && last.screenId === current) return;

    appState.navHistory.push(entry);

    // Cap depth to avoid unbounded growth
    if (appState.navHistory.length > 20) appState.navHistory.shift();
}

function goBack() {
    const entry = appState.navHistory.pop();
    if (!entry) {
        // Nothing in history — go to barre as a safe default
        _restoreScreenById('barre-screen', null);
        return;
    }
    _restoreScreenById(entry.screenId, entry.scrollY ?? null);
}

// Navigate to any screen ID, updating bottom-nav state correctly.
// Called only by goBack() — does NOT call navigateTo() so it
// does not clear history.
function _restoreScreenById(screenId, scrollY) {
    // Map screen IDs that correspond to (or closely relate to) a bottom-nav section
    const navMap = {
        'barre-screen':     'barre',
        'goals-screen':     'goals',
        'all-goals-screen': 'goals',
        'learn-screen':     'learn',
        'profile':          'profile',
    };

    const navSection = navMap[screenId];

    // Always update the bottom-nav highlight
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    if (navSection) {
        document.querySelector(`[data-nav="${navSection}"]`)?.classList.add('active');
        appState.currentNav = navSection;
    }
    // For dynamic detail screens that don't map to a nav section,
    // leave the existing highlight in place (don't clear it).

    if (screenId === 'profile') {
        showScreen('profile');
        if (scrollY != null) requestAnimationFrame(() => window.scrollTo(0, scrollY));
    } else if (screenId === 'barre-screen') {
        showBarreScreen();
    } else if (screenId === 'goals-screen') {
        showGoalsScreen();
    } else if (screenId === 'all-goals-screen') {
        showAllGoalsScreen();
    } else if (screenId === 'learn-screen') {
        showLearnScreen();
    } else if (document.getElementById(screenId)) {
        // Dynamic detail screen (session-detail-*, skill-detail-*, etc.) still in DOM
        showScreen(screenId);
    } else {
        // Screen was removed from DOM (e.g. after deleting a session) — fall back safely
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        document.querySelector('[data-nav="barre"]')?.classList.add('active');
        appState.currentNav = 'barre';
        showBarreScreen();
    }
}

/* ── Swipe-to-go-back gesture ──────────────────────────────────
   Right-swipe starting within 30px of the left screen edge.
   Direction-locked: if the gesture is more vertical than
   horizontal early on it is cancelled (so scroll still works).
   Also cancelled if touch starts on a .swipe-row element (which
   has its own horizontal swipe actions).
   ──────────────────────────────────────────────────────────── */

function initSwipeBack() {
    let startX = 0, startY = 0;
    let tracking = false;
    let directionLocked = false;
    let cancelled = false;

    const EDGE_THRESHOLD   = 30;  // px from left edge to start tracking
    const COMMIT_DISTANCE  = 60;  // px of rightward travel to trigger back
    const LOCK_ANGLE_RATIO = 0.6; // cancel if |dy| > |dx| * ratio before lock

    document.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        directionLocked = false;
        cancelled = false;

        // Only track touches that begin near the left edge
        // and are not on a swipe-row (which has its own horizontal actions)
        tracking = startX < EDGE_THRESHOLD
            && !e.target.closest('.swipe-row');
    }, { passive: true });

    document.addEventListener('touchmove', e => {
        if (!tracking || cancelled) return;

        const dx = e.touches[0].clientX - startX;
        const dy = Math.abs(e.touches[0].clientY - startY);

        if (!directionLocked) {
            if (Math.abs(dx) < 5) return; // wait for a little movement before deciding
            if (dy > Math.abs(dx) * LOCK_ANGLE_RATIO) {
                // Gesture is more vertical — it's a scroll, not a back swipe
                cancelled = true;
                return;
            }
            directionLocked = true;
        }
    }, { passive: true });

    document.addEventListener('touchend', e => {
        if (!tracking || cancelled) {
            tracking = false;
            return;
        }
        tracking = false;

        const dx = e.changedTouches[0].clientX - startX;
        const dy = Math.abs(e.changedTouches[0].clientY - startY);

        // Trigger only if: rightward, past threshold, primarily horizontal, and history exists
        if (dx > COMMIT_DISTANCE
            && dy < dx * LOCK_ANGLE_RATIO
            && appState.navHistory.length > 0) {
            goBack();
        }
    }, { passive: true });
}
