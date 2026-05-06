const DEV = false; // flip to true locally for development

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
    learnNotes:         'plie:learnNotes',
    onboardingComplete: 'plie:onboardingComplete',
    hasVisitedLearn:    'plie:hasVisitedLearn',
    preferences:        'plie:preferences',
    gettingStarted:     'plie:gettingStarted',
    currentScreen:      'plie:currentScreen',
    learnBookmarks:     'plie:learnBookmarks',
    learnLineSaves:     'plie:learnLineSaves',
    promptsDismissed:   'plie:prompts-dismissed',
    conditions:         'plie:conditions',
    teachers:           'plie:teachers',
    venues:             'plie:venues',
    cities:             'plie:cities',
    customSkills:       'plie:customSkills',
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

function generateId() {
    return crypto.randomUUID();
}

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
    learnNotes:       [],
    learnBookmarks:    [],
    learnLineSaves:    [],
    conditions:        [],
    teachers:          [],
    venues:            [],
    cities:            [],
    customSkills:      [],
    collapsedSections: {},  // persisted: { inFocus: bool, savedLearning: bool }

    // Misc
    notes:      [],
    persona:    null,
    currentNav: null,
    navHistory: [],   // stack of { screenId, scrollY? } — for back navigation

    // Active session being constructed — never persisted mid-flight
    currentSession: null,

    // Preferences — persisted under plie:preferences
    hidePointe:     false,   // hides pointe from profile, skill library, goals, assess
    profilePicture: null,    // data URL (uploaded) or default key e.g. 'default-bun'
    displayName:    null,    // optional display name shown on status card
    trainingState:  'active', // 'active' | 'resting' | 'recovering'
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

    // ─── Sessions ───────────────────────────────────────────────────
    // IDs: date-based numeric for stability. s_ prefix in comments = session id.
    appState.sessions = [
        { id: 1746144000000, userId: null, date: '2026-05-02', savedAt: 1746144060000, templateId: null, sessionName: 'Ballet with Martina',                  sessionLocation: null,                       classType: 'technique',   notes: null },
        { id: 1745971200000, userId: null, date: '2026-04-30', savedAt: 1745971260000, templateId: null, sessionName: 'Ballet with Martina',                  sessionLocation: null,                       classType: 'technique',   notes: null },
        { id: 1745884800000, userId: null, date: '2026-04-29', savedAt: 1745884860000, templateId: null, sessionName: 'Wednesday Intermediates',              sessionLocation: null,                       classType: 'technique',   notes: null },
        { id: 1745625600000, userId: null, date: '2026-04-26', savedAt: 1745625660000, templateId: null, sessionName: '🧚 Les Sylphides performance 🧚',      sessionLocation: null,                       classType: 'performance', notes: null },
        { id: 1745625601000, userId: null, date: '2026-04-26', savedAt: 1745625720000, templateId: null, sessionName: 'Nimble Dance Co.',                     sessionLocation: 'Central School of Ballet', classType: 'company',     notes: null },
        { id: 1745280000000, userId: null, date: '2026-04-22', savedAt: 1745280060000, templateId: null, sessionName: 'Wednesday Intermediates',              sessionLocation: null,                       classType: 'technique',   notes: null },
        { id: 1744588800000, userId: null, date: '2026-04-14', savedAt: 1744588860000, templateId: null, sessionName: 'Wednesday Intermediates',              sessionLocation: null,                       classType: 'technique',   notes: null },
        { id: 1744243200000, userId: null, date: '2026-04-09', savedAt: 1744243260000, templateId: null, sessionName: 'Classique Intermédiaire @ Nini',       sessionLocation: null,                       classType: 'open',        notes: null },
        { id: 1744156800000, userId: null, date: '2026-04-08', savedAt: 1744156860000, templateId: null, sessionName: 'Classique Intermédiaire @ Nini',       sessionLocation: null,                       classType: 'open',        notes: null },
        { id: 1744156801000, userId: null, date: '2026-04-08', savedAt: 1744156920000, templateId: null, sessionName: 'Classique Intermédiaire @ STANLOWA',   sessionLocation: null,                       classType: 'open',        notes: null },
        { id: 1744070400000, userId: null, date: '2026-04-07', savedAt: 1744070460000, templateId: null, sessionName: 'Intermediates',                        sessionLocation: 'Centre du Danse Marais',   classType: 'technique',   notes: null },
        { id: 1744070401000, userId: null, date: '2026-04-07', savedAt: 1744070520000, templateId: null, sessionName: 'Samba',                                sessionLocation: 'Centre du Danse Marais',   classType: 'technique',   notes: null },
        { id: 1743638400000, userId: null, date: '2026-04-03', savedAt: 1743638460000, templateId: null, sessionName: 'Basic Technique',                      sessionLocation: 'Centre du Danse Marais, Paris', classType: 'technique', notes: null },
        { id: 1743552000000, userId: null, date: '2026-04-02', savedAt: 1743552060000, templateId: null, sessionName: 'Wednesday Intermediates',              sessionLocation: null,                       classType: 'technique',   notes: null },
        { id: 1743465600000, userId: null, date: '2026-04-01', savedAt: 1743465660000, templateId: null, sessionName: 'Wednesday Intermediates',              sessionLocation: null,                       classType: 'technique',   notes: null },
        { id: 1741824000000, userId: null, date: '2026-03-12', savedAt: 1741824060000, templateId: null, sessionName: 'Wednesday RAD class',                  sessionLocation: null,                       classType: 'technique',   notes: null },
    ];

    // ─── Corrections ────────────────────────────────────────────────
    appState.corrections = [
        // 2026-05-02 Ballet with Martina
        { id: 1746144001000, userId: null, skillId: 'degage',     text: 'When folding forward it seems I lean back, keep weight on front toes.',                                                                                          createdAt: 1746144001000, sessionId: 1746144000000, source: 'teacher', type: 'technical', isRecurring: false, isPinned: false, isResolved: false, derivedFromCorrectionId: null, previousBlockType: null },

        // 2026-04-30 Ballet with Martina
        { id: 1745971201000, userId: null, skillId: 'pirouette',  text: 'Balance backwards is kind of out to the side back, then alt leg goes back in usual sense, then alt leg finishes near in front.',                               createdAt: 1745971201000, sessionId: 1745971200000, source: 'teacher', type: 'technical', isRecurring: false, isPinned: false, isResolved: false, derivedFromCorrectionId: null, previousBlockType: null },
        { id: 1745971202000, userId: null, skillId: 'pirouette',  text: 'Attack single turns, get up and turn quick, then hold it before landing.',                                                                                       createdAt: 1745971202000, sessionId: 1745971200000, source: 'teacher', type: 'technical', isRecurring: false, isPinned: false, isResolved: false, derivedFromCorrectionId: null, previousBlockType: null },

        // 2026-04-26 Nimble Dance Co.
        { id: 1745625602000, userId: null, skillId: null,         text: 'Yikes!!! But I tried most centre exercises, aside from complicated Adages.',                                                                                     createdAt: 1745625602000, sessionId: 1745625601000, source: 'self',    type: null,        isRecurring: false, isPinned: false, isResolved: false, derivedFromCorrectionId: null, previousBlockType: null },
        { id: 1745625603000, userId: null, skillId: null,         text: 'So proud of myself for keeping up! Everyone was at an advanced and even beyond level and I think I definitely kept up if even brought something (in my limited way!!) re: performance quality.', createdAt: 1745625603000, sessionId: 1745625601000, source: 'self', type: null, isRecurring: false, isPinned: false, isResolved: false, derivedFromCorrectionId: null, previousBlockType: null },

        // 2026-04-22 Wednesday Intermediates
        { id: 1745280001000, userId: null, skillId: 'tendu',      text: 'Going from second to fifth: it\'s important to activate inner thighs. Can practise / warm up by going from second to a tight fifth and finishing as stable as possible (both sides).', createdAt: 1745280001000, sessionId: 1745280000000, source: 'teacher', type: 'technical', isRecurring: false, isPinned: false, isResolved: false, derivedFromCorrectionId: null, previousBlockType: null },

        // 2026-04-14 Wednesday Intermediates
        { id: 1744588801000, userId: null, skillId: 'pirouette',  text: 'Spot with nipples.',                                                                                                                                             createdAt: 1744588801000, sessionId: 1744588800000, source: 'teacher', type: 'technical', isRecurring: false, isPinned: false, isResolved: false, derivedFromCorrectionId: null, previousBlockType: null },

        // 2026-04-09 Classique Intermédiaire @ Nini
        { id: 1744243201000, userId: null, skillId: null,         text: 'Class levelling — I thought this class was pretty easy (still challenging) and I asked if she thought it would be possible to keep up with inter/avance but apparently not! She said not… but my french may have misinterpreted.', createdAt: 1744243201000, sessionId: 1744243200000, source: 'self', type: null, isRecurring: false, isPinned: false, isResolved: false, derivedFromCorrectionId: null, previousBlockType: null },
        { id: 1744243202000, userId: null, skillId: 'pirouette',  text: 'For most of my turns I kept getting corrections to spot better. I thought I was, but I need to do it even more than I am.',                                   createdAt: 1744243202000, sessionId: 1744243200000, source: 'teacher', type: 'technical', isRecurring: true,  isPinned: false, isResolved: false, derivedFromCorrectionId: null, previousBlockType: null },
        { id: 1744243203000, userId: null, skillId: 'rond-de-jambe', text: 'We started the barre with ronde de jambes and tendus, rather than plies or even warmups.',                                                                 createdAt: 1744243203000, sessionId: 1744243200000, source: 'self',    type: null,        isRecurring: false, isPinned: false, isResolved: false, derivedFromCorrectionId: null, previousBlockType: null },
        { id: 1744243204000, userId: null, skillId: 'arabesque',  text: 'My arabesque was corrected, she lifted my back leg up higher and more open — my shoulders need to stay square though.',                                        createdAt: 1744243204000, sessionId: 1744243200000, source: 'teacher', type: 'technical', isRecurring: false, isPinned: false, isResolved: false, derivedFromCorrectionId: null, previousBlockType: null },

        // 2026-04-08 Classique Intermédiaire @ Nini
        { id: 1744156801000, userId: null, skillId: null,         text: 'Teacher Philippe Lormeau was very attentive, business like. Gave everyone corrections. He\'s very focused on eyeline, port de bras etc. My balances/waltzes are getting better, I\'m really enjoying it when I try to take up space.', createdAt: 1744156801000, sessionId: 1744156800000, source: 'self', type: null, isRecurring: false, isPinned: false, isResolved: false, derivedFromCorrectionId: null, previousBlockType: null },
        { id: 1744156802000, userId: null, skillId: null,         text: 'Port de bras and épaulement: Look to barre, look away.',                                                                                                        createdAt: 1744156802000, sessionId: 1744156800000, source: 'teacher', type: 'technical', isRecurring: false, isPinned: false, isResolved: false, derivedFromCorrectionId: null, previousBlockType: null },
        { id: 1744156803000, userId: null, skillId: 'tendu',      text: 'When going from 1st to 2nd (and vice versa) brush my thighs slightly as I\'m bringing the hand upwards / downwards.',                                         createdAt: 1744156803000, sessionId: 1744156800000, source: 'teacher', type: 'technical', isRecurring: false, isPinned: false, isResolved: false, derivedFromCorrectionId: null, previousBlockType: null },

        // 2026-04-08 Classique Intermédiaire @ STANLOWA
        { id: 1744156821000, userId: null, skillId: null,         text: 'No corrections I could understand. I was exhausted by then. I kept up with a good bit but my muscles were so tired. From the jumps onwards in centre I tapped out.', createdAt: 1744156821000, sessionId: 1744156801000, source: 'self', type: null, isRecurring: false, isPinned: false, isResolved: false, derivedFromCorrectionId: null, previousBlockType: null },

        // 2026-04-07 Intermediates
        { id: 1744070401000, userId: null, skillId: 'grand-sissonne', text: 'I need to work on my sissonnes. Practise them when I can!',                                                                                               createdAt: 1744070401000, sessionId: 1744070400000, source: 'self',    type: 'technical', isRecurring: false, isPinned: false, isResolved: false, derivedFromCorrectionId: null, previousBlockType: null },

        // 2026-04-07 Samba
        { id: 1744070421000, userId: null, skillId: null,         text: 'My hips need to go side to side more.',                                                                                                                          createdAt: 1744070421000, sessionId: 1744070401000, source: 'teacher', type: 'technical', isRecurring: false, isPinned: false, isResolved: false, derivedFromCorrectionId: null, previousBlockType: null },

        // 2026-04-03 Basic Technique
        { id: 1743638401000, userId: null, skillId: 'degage',     text: 'When I dégage and arabesque en devant try to keep weight forwards, like really forwards on standing leg. Otherwise I will end up tipping forward.',           createdAt: 1743638401000, sessionId: 1743638400000, source: 'teacher', type: 'technical', isRecurring: false, isPinned: false, isResolved: false, derivedFromCorrectionId: null, previousBlockType: null },
        { id: 1743638402000, userId: null, skillId: 'pirouette',  text: 'Arms together when I pirouette.',                                                                                                                                createdAt: 1743638402000, sessionId: 1743638400000, source: 'teacher', type: 'technical', isRecurring: true,  isPinned: false, isResolved: false, derivedFromCorrectionId: null, previousBlockType: null },
        { id: 1743638403000, userId: null, skillId: null,         text: 'Don\'t lean forward, keep STRAIGHT, look ahead/upwards.',                                                                                                       createdAt: 1743638403000, sessionId: 1743638400000, source: 'teacher', type: 'technical', isRecurring: false, isPinned: false, isResolved: false, derivedFromCorrectionId: null, previousBlockType: null },

        // 2026-04-02 Wednesday Intermediates
        { id: 1743552001000, userId: null, skillId: 'tendu',      text: 'My teacher told me to work on my tendu.',                                                                                                                        createdAt: 1743552001000, sessionId: 1743552000000, source: 'teacher', type: 'technical', isRecurring: true,  isPinned: false, isResolved: false, derivedFromCorrectionId: null, previousBlockType: null },

        // 2026-04-01 Wednesday Intermediates
        { id: 1743465601000, userId: null, skillId: 'pirouette',  text: 'I think my turns are doing so well now! I am really thinking about squeezing / zipping my core and I feel so much stronger and more stable.',                 createdAt: 1743465601000, sessionId: 1743465600000, source: 'self',    type: null,        isRecurring: false, isPinned: false, isResolved: false, derivedFromCorrectionId: null, previousBlockType: null },
        { id: 1743465602000, userId: null, skillId: 'fouette',    text: 'My left fouetté needs a lot of work, my right ankle rolls in if I don\'t turn with force, and when I turn it\'s really half hearted.',                       createdAt: 1743465602000, sessionId: 1743465600000, source: 'self',    type: 'technical', isRecurring: false, isPinned: false, isResolved: false, derivedFromCorrectionId: null, previousBlockType: null },
        { id: 1743465603000, userId: null, skillId: null,         text: 'When I stand try to engage my inner leg muscles to make them point more towards the centre, and my ankles roll inwards slightly.',                             createdAt: 1743465603000, sessionId: 1743465600000, source: 'teacher', type: 'technical', isRecurring: false, isPinned: false, isResolved: false, derivedFromCorrectionId: null, previousBlockType: null },
        { id: 1743465604000, userId: null, skillId: null,         text: 'When I\'m on demi pointe my ankles need to be in line with my second toe.',                                                                                    createdAt: 1743465604000, sessionId: 1743465600000, source: 'teacher', type: 'technical', isRecurring: false, isPinned: false, isResolved: false, derivedFromCorrectionId: null, previousBlockType: null },
        { id: 1743465605000, userId: null, skillId: null,         text: 'My knees point inwards. I need to think about when I\'m standing having my knees align over my second toes.',                                                  createdAt: 1743465605000, sessionId: 1743465600000, source: 'teacher', type: 'technical', isRecurring: false, isPinned: false, isResolved: false, derivedFromCorrectionId: null, previousBlockType: null },
        { id: 1743465606000, userId: null, skillId: null,         text: 'My ankles need strengthening, I need to do some theraband exercises focused on ankle moving in and outwards.',                                                  createdAt: 1743465606000, sessionId: 1743465600000, source: 'self',    type: null,        isRecurring: false, isPinned: false, isResolved: false, derivedFromCorrectionId: null, previousBlockType: null },

        // 2026-03-12 Wednesday RAD class
        { id: 1741824001000, userId: null, skillId: 'pirouette',  text: 'Single turns feeling more stable. Tried a double — lost it about 70% of the time.',                                                                             createdAt: 1741824001000, sessionId: 1741824000000, source: 'self',    type: null,        isRecurring: false, isPinned: false, isResolved: false, derivedFromCorrectionId: null, previousBlockType: null },

        // Standalone correction (no session)
        { id: 1744070800000, userId: null, skillId: 'tendu',      text: 'Keep the working foot firmly at the knee — don\'t let it slide down.',                                                                                         createdAt: 1744070800000, sessionId: null,          source: 'teacher', type: 'technical', isRecurring: false, isPinned: false, isResolved: false, derivedFromCorrectionId: null, previousBlockType: null },
    ];

    // ─── SessionSkills ──────────────────────────────────────────────
    appState.sessionSkills = [
        // 2026-05-02 Ballet with Martina
        { id: 1746144010000, userId: null, sessionId: 1746144000000, skillId: 'degage',        skillLabel: null, secondarySkillId: null, secondarySkillLabel: null, notes: null,   correctionIds: [1746144001000], tracked: false, blockTitle: '', blockType: 'correction', isHighlight: false, bodyTag: false, isPinned: false, previousBlockType: null },

        // 2026-04-30 Ballet with Martina
        { id: 1745971210000, userId: null, sessionId: 1745971200000, skillId: 'pirouette',     skillLabel: null, secondarySkillId: null, secondarySkillLabel: null, notes: null,   correctionIds: [1745971201000, 1745971202000], tracked: true, blockTitle: '', blockType: 'correction', isHighlight: false, bodyTag: false, isPinned: false, previousBlockType: null },

        // 2026-04-26 Nimble Dance Co.
        { id: 1745625610000, userId: null, sessionId: 1745625601000, skillId: null,            skillLabel: null, secondarySkillId: null, secondarySkillLabel: null, notes: null,   correctionIds: [1745625602000, 1745625603000], tracked: false, blockTitle: 'Company class reflections', blockType: 'note', isHighlight: false, bodyTag: false, isPinned: false, previousBlockType: null },

        // 2026-04-22 Wednesday Intermediates
        { id: 1745280010000, userId: null, sessionId: 1745280000000, skillId: 'tendu',         skillLabel: null, secondarySkillId: null, secondarySkillLabel: null, notes: null,   correctionIds: [1745280001000], tracked: true, blockTitle: '', blockType: 'correction', isHighlight: false, bodyTag: false, isPinned: false, previousBlockType: null },

        // 2026-04-14 Wednesday Intermediates
        { id: 1744588810000, userId: null, sessionId: 1744588800000, skillId: 'pirouette',     skillLabel: null, secondarySkillId: null, secondarySkillLabel: null, notes: null,   correctionIds: [1744588801000], tracked: true, blockTitle: '', blockType: 'correction', isHighlight: false, bodyTag: false, isPinned: false, previousBlockType: null },

        // 2026-04-09 Classique Intermédiaire @ Nini
        { id: 1744243210000, userId: null, sessionId: 1744243200000, skillId: null,            skillLabel: null, secondarySkillId: null, secondarySkillLabel: null, notes: null,   correctionIds: [1744243201000], tracked: false, blockTitle: 'Class level', blockType: 'note', isHighlight: false, bodyTag: false, isPinned: false, previousBlockType: null },
        { id: 1744243211000, userId: null, sessionId: 1744243200000, skillId: 'pirouette',     skillLabel: null, secondarySkillId: null, secondarySkillLabel: null, notes: null,   correctionIds: [1744243202000], tracked: true, blockTitle: '', blockType: 'correction', isHighlight: false, bodyTag: false, isPinned: false, previousBlockType: null },
        { id: 1744243212000, userId: null, sessionId: 1744243200000, skillId: 'rond-de-jambe', skillLabel: null, secondarySkillId: null, secondarySkillLabel: null, notes: null,   correctionIds: [1744243203000], tracked: false, blockTitle: '', blockType: 'note', isHighlight: false, bodyTag: false, isPinned: false, previousBlockType: null },
        { id: 1744243213000, userId: null, sessionId: 1744243200000, skillId: 'arabesque',     skillLabel: null, secondarySkillId: null, secondarySkillLabel: null, notes: null,   correctionIds: [1744243204000], tracked: true, blockTitle: '', blockType: 'correction', isHighlight: false, bodyTag: false, isPinned: false, previousBlockType: null },

        // 2026-04-08 Classique Intermédiaire @ Nini
        { id: 1744156810000, userId: null, sessionId: 1744156800000, skillId: null,            skillLabel: null, secondarySkillId: null, secondarySkillLabel: null, notes: null,   correctionIds: [1744156801000, 1744156802000], tracked: false, blockTitle: 'Reflections', blockType: 'note', isHighlight: false, bodyTag: false, isPinned: false, previousBlockType: null },
        { id: 1744156811000, userId: null, sessionId: 1744156800000, skillId: 'tendu',         skillLabel: null, secondarySkillId: null, secondarySkillLabel: null, notes: null,   correctionIds: [1744156803000], tracked: true, blockTitle: '', blockType: 'correction', isHighlight: false, bodyTag: false, isPinned: false, previousBlockType: null },

        // 2026-04-08 Classique Intermédiaire @ STANLOWA
        { id: 1744156830000, userId: null, sessionId: 1744156801000, skillId: null,            skillLabel: null, secondarySkillId: null, secondarySkillLabel: null, notes: null,   correctionIds: [1744156821000], tracked: false, blockTitle: 'Reflections', blockType: 'note', isHighlight: false, bodyTag: false, isPinned: false, previousBlockType: null },

        // 2026-04-07 Intermediates
        { id: 1744070410000, userId: null, sessionId: 1744070400000, skillId: 'grand-sissonne', skillLabel: null, secondarySkillId: null, secondarySkillLabel: null, notes: null,  correctionIds: [1744070401000], tracked: false, blockTitle: '', blockType: 'correction', isHighlight: false, bodyTag: false, isPinned: false, previousBlockType: null },

        // 2026-04-07 Samba
        { id: 1744070430000, userId: null, sessionId: 1744070401000, skillId: null,            skillLabel: null, secondarySkillId: null, secondarySkillLabel: null, notes: null,   correctionIds: [1744070421000], tracked: false, blockTitle: 'Hip movement', blockType: 'correction', isHighlight: false, bodyTag: false, isPinned: false, previousBlockType: null },

        // 2026-04-03 Basic Technique
        { id: 1743638410000, userId: null, sessionId: 1743638400000, skillId: 'degage',        skillLabel: null, secondarySkillId: null, secondarySkillLabel: null, notes: null,   correctionIds: [1743638401000], tracked: false, blockTitle: '', blockType: 'correction', isHighlight: false, bodyTag: false, isPinned: false, previousBlockType: null },
        { id: 1743638411000, userId: null, sessionId: 1743638400000, skillId: 'pirouette',     skillLabel: null, secondarySkillId: null, secondarySkillLabel: null, notes: null,   correctionIds: [1743638402000, 1743638403000], tracked: true, blockTitle: '', blockType: 'correction', isHighlight: false, bodyTag: false, isPinned: false, previousBlockType: null },

        // 2026-04-02 Wednesday Intermediates
        { id: 1743552010000, userId: null, sessionId: 1743552000000, skillId: 'tendu',         skillLabel: null, secondarySkillId: null, secondarySkillLabel: null, notes: null,   correctionIds: [1743552001000], tracked: true, blockTitle: '', blockType: 'correction', isHighlight: false, bodyTag: false, isPinned: false, previousBlockType: null },

        // 2026-04-01 Wednesday Intermediates
        { id: 1743465610000, userId: null, sessionId: 1743465600000, skillId: 'pirouette',     skillLabel: null, secondarySkillId: null, secondarySkillLabel: null, notes: null,   correctionIds: [1743465601000, 1743465602000], tracked: true, blockTitle: '', blockType: 'note', isHighlight: false, bodyTag: false, isPinned: false, previousBlockType: null },
        { id: 1743465611000, userId: null, sessionId: 1743465600000, skillId: null,            skillLabel: null, secondarySkillId: null, secondarySkillLabel: null, notes: null,   correctionIds: [1743465603000, 1743465604000, 1743465605000, 1743465606000], tracked: false, blockTitle: 'Alignment and ankles', blockType: 'correction', isHighlight: false, bodyTag: false, isPinned: false, previousBlockType: null },
        { id: 1743465612000, userId: null, sessionId: 1743465600000, skillId: 'fouette',       skillLabel: null, secondarySkillId: null, secondarySkillLabel: null, notes: null,   correctionIds: [1743465602000], tracked: false, blockTitle: '', blockType: 'correction', isHighlight: false, bodyTag: false, isPinned: false, previousBlockType: null },

        // 2026-03-12 Wednesday RAD class
        { id: 1741824010000, userId: null, sessionId: 1741824000000, skillId: 'pirouette',     skillLabel: null, secondarySkillId: null, secondarySkillLabel: null, notes: 'Single turns feeling more stable. Tried a double — lost it about 70% of the time.', correctionIds: [1741824001000], tracked: true, blockTitle: '', blockType: 'note', isHighlight: false, bodyTag: false, isPinned: false, previousBlockType: null },
    ];

    // ─── Goals ──────────────────────────────────────────────────────
    appState.goals = [
        {
            id:               'goal-tendu-01',
            userId:           null,
            title:            'Tendu practice',
            body:             null,
            goalType:         'skill',
            skillId:          'tendu',
            dimensionId:      'technique',
            progressMarkers:  [],
            milestones:       [],
            commitmentPeriod: 'Two weeks',
            howOften:         null,
            correctionIds:    [1743552001000],
            completed:        true,
            status:           'completed',
            createdAt:        1743552060000,
            updatedAt:        1744070800000,
            completedAt:      1744070800000,
        },
    ];

    // ─── Timeline ───────────────────────────────────────────────────
    appState.timeline = [
        { id: 1746144060001, userId: null, type: 'session', objectId: 1746144000000, title: 'Ballet with Martina',                body: 'Technique class · 1 correction',    date: '2026-05-02', createdAt: 1746144060001 },
        { id: 1745971260001, userId: null, type: 'session', objectId: 1745971200000, title: 'Ballet with Martina',                body: 'Technique class · 2 corrections',   date: '2026-04-30', createdAt: 1745971260001 },
        { id: 1745884860001, userId: null, type: 'session', objectId: 1745884800000, title: 'Wednesday Intermediates',            body: 'Technique class',                    date: '2026-04-29', createdAt: 1745884860001 },
        { id: 1745625660001, userId: null, type: 'session', objectId: 1745625600000, title: '🧚 Les Sylphides performance 🧚',    body: 'Performance',                        date: '2026-04-26', createdAt: 1745625660001 },
        { id: 1745625720001, userId: null, type: 'session', objectId: 1745625601000, title: 'Nimble Dance Co.',                   body: 'Company class · 2 corrections',     date: '2026-04-26', createdAt: 1745625720001 },
        { id: 1745280060001, userId: null, type: 'session', objectId: 1745280000000, title: 'Wednesday Intermediates',            body: 'Technique class · 1 correction',    date: '2026-04-22', createdAt: 1745280060001 },
        { id: 1744588860001, userId: null, type: 'session', objectId: 1744588800000, title: 'Wednesday Intermediates',            body: 'Technique class · 1 correction',    date: '2026-04-14', createdAt: 1744588860001 },
        { id: 1744243260001, userId: null, type: 'session', objectId: 1744243200000, title: 'Classique Intermédiaire @ Nini',     body: 'Open class · 4 corrections',        date: '2026-04-09', createdAt: 1744243260001 },
        { id: 1744156860001, userId: null, type: 'session', objectId: 1744156800000, title: 'Classique Intermédiaire @ Nini',     body: 'Open class · 3 corrections',        date: '2026-04-08', createdAt: 1744156860001 },
        { id: 1744156920001, userId: null, type: 'session', objectId: 1744156801000, title: 'Classique Intermédiaire @ STANLOWA', body: 'Open class · 1 correction',         date: '2026-04-08', createdAt: 1744156920001 },
        { id: 1744070460001, userId: null, type: 'session', objectId: 1744070400000, title: 'Intermediates',                      body: 'Technique class · 1 correction',    date: '2026-04-07', createdAt: 1744070460001 },
        { id: 1744070520001, userId: null, type: 'session', objectId: 1744070401000, title: 'Samba',                              body: 'Technique class · 1 correction',    date: '2026-04-07', createdAt: 1744070520001 },
        { id: 1743638460001, userId: null, type: 'session', objectId: 1743638400000, title: 'Basic Technique',                    body: 'Technique class · 3 corrections',   date: '2026-04-03', createdAt: 1743638460001 },
        { id: 1743552060001, userId: null, type: 'session', objectId: 1743552000000, title: 'Wednesday Intermediates',            body: 'Technique class · 1 correction',    date: '2026-04-02', createdAt: 1743552060001 },
        { id: 1743465660001, userId: null, type: 'session', objectId: 1743465600000, title: 'Wednesday Intermediates',            body: 'Technique class · 6 corrections',   date: '2026-04-01', createdAt: 1743465660001 },
        { id: 1741824060001, userId: null, type: 'session', objectId: 1741824000000, title: 'Wednesday RAD class',                body: 'Technique class · 1 correction',    date: '2026-03-12', createdAt: 1741824060001 },
        { id: 1744070860001, userId: null, type: 'milestone', objectId: 'goal-tendu-01', title: 'Tendu practice completed',      body: null,                                 date: '2026-04-06', createdAt: 1744070860001 },
    ];

    // ─── Entities ───────────────────────────────────────────────────
    appState.teachers = [
        { id: 'teacher-martina', userId: null, name: 'Martina' },
        { id: 'teacher-philippe', userId: null, name: 'Philippe Lormeau' },
        { id: 'teacher-nini', userId: null, name: 'Nini' },
    ];
    appState.venues = [
        { id: 'venue-csb', userId: null, name: 'Central School of Ballet' },
        { id: 'venue-cdm', userId: null, name: 'Centre du Danse Marais' },
        { id: 'venue-stanlowa', userId: null, name: 'Stanlowa' },
    ];
    appState.cities = [
        { id: 'city-london', userId: null, name: 'London' },
        { id: 'city-paris', userId: null, name: 'Paris' },
    ];

    // ─── Flag skills that appear frequently ─────────────────────────
    ['pirouette', 'tendu', 'arabesque'].forEach(id => {
        const skill = appState.skills.find(s => s.id === id);
        if (skill) { skill.flagged = true; skill.tracked = true; }
    });

    persistSkillState();
    storage.save('sessions',     appState.sessions);
    storage.save('corrections',  appState.corrections);
    storage.save('sessionSkills', appState.sessionSkills);
    storage.save('goals',        appState.goals);
    storage.save('timeline',     appState.timeline);
    storage.save('teachers',     appState.teachers);
    storage.save('venues',       appState.venues);
    storage.save('cities',       appState.cities);
}

