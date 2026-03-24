const STORAGE_KEYS = {
    skills:             'plie:skills',
    corrections:        'plie:corrections',
    sessions:           'plie:sessions',
    sessionTemplates:   'plie:sessionTemplates',
    sessionSkills:      'plie:sessionSkills',
    assessments:        'plie:assessments',
    goals:              'plie:goals',
    timeline:           'plie:timeline',
    skillNotes:         'plie:skillNotes',
    onboardingComplete: 'plie:onboardingComplete',
    hasVisitedLearn:    'plie:hasVisitedLearn',
    preferences:        'plie:preferences',
};

const storage = {
    save(key, value) {
        try {
            localStorage.setItem(STORAGE_KEYS[key] || key, JSON.stringify(value));
        } catch (e) {
            // QuotaExceededError or similar — fail silently, state still valid in memory
            console.warn('plié: storage.save failed for key', key, e);
        }
    },
    load(key) {
        try {
            const raw = localStorage.getItem(STORAGE_KEYS[key] || key);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            console.warn('plié: storage.load failed for key', key, e);
            return null;
        }
    },
    clear() {
        Object.values(STORAGE_KEYS).forEach(k => {
            try { localStorage.removeItem(k); } catch (e) {}
        });
    }
};


/* ═══════════════════════════════════════════════════════════════
   SKILL STATE MERGE
   Reference data (french, phonetic, difficulty etc.) lives in
   DATA.skills and is never persisted — it ships with the app.
   User state (tracked, flagged, phoneticVisible) is persisted
   separately as a sparse array of { id, tracked, flagged }.

   loadUserSkillState() runs once at startup (Stage 3) after
   storage.load(). It merges persisted user state back onto the
   runtime skill objects in appState.skills.

   appState.skills is always initialised from DATA.skills first,
   so missing persisted entries default to tracked:false, flagged:false.
   This means new skills added to DATA.skills in future app versions
   appear correctly with default state even for existing users.
   ═══════════════════════════════════════════════════════════════ */

function initSkills() {
    // Build runtime skill objects from reference data, with default user state.
    // phoneticVisible is display-only and intentionally NOT persisted.
    return DATA.skills.map(ref => ({
        ...ref,
        tracked:        false,
        flagged:        false,
        phoneticVisible: false,
    }));
}

function loadUserSkillState() {
    // Stage 3: call this after storage is loaded.
    // Persisted format: Array<{ id: string, tracked: boolean, flagged: boolean }>
    const persisted = storage.load('skills');
    if (!persisted || !Array.isArray(persisted)) return;

    persisted.forEach(saved => {
        const skill = appState.skills.find(s => s.id === saved.id);
        if (!skill) return; // skill may have been removed from DATA in a newer version — ignore
        skill.tracked = saved.tracked ?? false;
        skill.flagged = saved.flagged ?? false;
        // phoneticVisible deliberately not restored — always starts hidden
    });
}

function persistSkillState() {
    // Only persist user state fields, not reference data.
    const toSave = appState.skills
        .filter(s => s.tracked || s.flagged) // sparse — only persist non-default state
        .map(s => ({ id: s.id, tracked: s.tracked, flagged: s.flagged }));
    storage.save('skills', toSave);
}


// ── Central App State ──
let appState = {
    // Quiz / assessment
    currentScreen:   'onboarding-1',
    currentQuestion: 0,
    answers:         {},
    level:           null,
    dimensions:      null,
    rawDimensions:   null,

    // Skills — runtime objects, merged from DATA + persisted user state
    skills: initSkills(),

    // Core collections
    corrections:      [],
    sessions:         [],
    sessionTemplates: [],
    sessionSkills:    [],
    assessments:      [],
    goals:            [],
    timeline:         [],
    skillNotes:       [],

    // Misc
    notes:      [],
    persona:    null,
    currentNav: null,

    // Active session being constructed — never persisted mid-flight
    currentSession: null,

    // Preferences — persisted under plie:preferences
    hidePointe:     false,   // hides pointe from profile, skill library, goals, assess
    profilePicture: null,    // data URL (uploaded) or default key e.g. 'default-bun'
    displayName:    null,    // optional display name shown on status card
};

/* ═══════════════════════════════════════════════════════════════
   1. DATA MODELS
   All static data and the central app state.
   ═══════════════════════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════════════════════
   STORAGE ADAPTER
   UI never touches storage directly — always goes through here.
   Stage 3: replace each no-op with the localStorage implementation
   shown in the comments.
   ═══════════════════════════════════════════════════════════════ */


// ── Mock data — seeded for development/testing ──
// Represents two logged sessions in the normalised schema.
// Called after loadPersistedState() so the guard works correctly.
// Remove or gate behind a DEV flag before release.
function seedMockData() {
    // Only seed when localStorage is genuinely empty
    if (appState.sessions.length > 0) return;

    appState.sessions = [
        {
            id:              1741824000000,
            date:            '2026-03-12',
            savedAt:         1741824060000,
            templateId:      null,
            sessionName:     'Wednesday RAD class',
            sessionLocation: null,
            classType:       'technique',
            notes:           null,
        },
        {
            id:              1741651200000,
            date:            '2026-03-10',
            savedAt:         1741651260000,
            templateId:      null,
            sessionName:     'Monday open class',
            sessionLocation: null,
            classType:       'open',
            notes:           null,
        },
    ];

    // Corrections — standalone objects, linked to skills
    appState.corrections = [
        {
            id:          1741824001000,
            skillId:     'pirouette',
            text:        'Spot earlier — the head should initiate the turn, not follow it.',
            createdAt:   1741824001000,
            sessionId:   1741824000000,
            source:      'teacher',
            type:        'technical',
            isRecurring: true,
        },
        {
            id:          1741824002000,
            skillId:     'pirouette',
            text:        'Pull up through the supporting leg before initiating the turn.',
            createdAt:   1741824002000,
            sessionId:   1741824000000,
            source:      'teacher',
            type:        'technical',
            isRecurring: false,
        },
        {
            id:          1741651201000,
            skillId:     'arabesque',
            text:        'Don\'t tilt the pelvis — the height comes from the hip flexor, not the lower back.',
            createdAt:   1741651201000,
            sessionId:   1741651200000,
            source:      'teacher',
            type:        'technical',
            isRecurring: false,
        },
    ];

    // SessionSkills — join objects linking sessions to skills
    appState.sessionSkills = [
        {
            id:            1741824010000,
            sessionId:     1741824000000,
            skillId:       'pirouette',
            notes:         'Single turns feeling more stable. Tried a double — lost it about 70% of the time.',
            correctionIds: [1741824001000, 1741824002000],
            tracked:       true,
            flagged:       false,
            blockTitle:    '',
            highlight:     false,
        },
        {
            id:            1741651210000,
            sessionId:     1741651200000,
            skillId:       'arabesque',
            notes:         'Working on getting the leg higher without losing the line through the back.',
            correctionIds: [1741651201000],
            tracked:       true,
            flagged:       false,
            blockTitle:    'Arabesque extension',
            isPraise:      true,
        },
    ];

    // Flag the skills that appear in sessions as active
    ['pirouette', 'arabesque'].forEach(id => {
        const skill = appState.skills.find(s => s.id === id);
        if (skill) skill.flagged = true;
    });

    // Timeline
    appState.timeline = [
        {
            id:       1741824060001,
            type:     'session',
            objectId: 1741824000000,
            title:    'Wednesday RAD class',
            body:     'Technique class · 1 skill · 2 corrections',
            date:     '2026-03-12',
            createdAt: 1741824060001,
        },
        {
            id:       1741651260001,
            type:     'session',
            objectId: 1741651200000,
            title:    'Monday open class',
            body:     'Open class · 1 skill · 1 correction',
            date:     '2026-03-10',
            createdAt: 1741651260001,
        },
    ];
}

