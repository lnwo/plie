'use strict';

/* ═══════════════════════════════════════════════════════════════
   1. DATA MODELS
   All static data and the central app state.
   ═══════════════════════════════════════════════════════════════ */

const DATA = {
    skills: [
        { id: 'plie',           french: 'Plié',           phonetic: 'plee-AY',          english: 'Bend',              difficulty: 'beginner',     category: 'Barre Work',   dimensionId: 'barre'       },
        { id: 'tendu',          french: 'Tendu',          phonetic: 'tahn-DEW',          english: 'Stretched',         difficulty: 'beginner',     category: 'Barre Work',   dimensionId: 'barre'       },
        { id: 'degage',         french: 'Dégagé',         phonetic: 'day-ga-ZHAY',       english: 'Disengaged',        difficulty: 'beginner',     category: 'Barre Work',   dimensionId: 'barre'       },
        { id: 'rond-de-jambe',  french: 'Rond de jambe',  phonetic: 'rohn duh ZHAHMB',   english: 'Circle of the leg', difficulty: 'beginner',     category: 'Barre Work',   dimensionId: 'barre'       },
        { id: 'frappe',         french: 'Frappé',         phonetic: 'fra-PAY',           english: 'Struck',            difficulty: 'improver',     category: 'Barre Work',   dimensionId: 'barre'       },
        { id: 'fondu',          french: 'Fondu',          phonetic: 'fohn-DEW',          english: 'Melted',            difficulty: 'improver',     category: 'Barre Work',   dimensionId: 'barre'       },
        { id: 'developpe',      french: 'Développé',      phonetic: 'dayv-law-PAY',      english: 'Developed',         difficulty: 'improver',     category: 'Centre Work',  dimensionId: 'centre'      },
        { id: 'grand-battement',french: 'Grand battement',phonetic: 'grahn bat-MAHN',    english: 'Large beating',     difficulty: 'improver',     category: 'Barre Work',   dimensionId: 'barre'       },
        { id: 'pirouette',      french: 'Pirouette',      phonetic: 'peer-oo-WET',       english: 'Whirl',             difficulty: 'intermediate', category: 'Turns',        dimensionId: 'turns'       },
        { id: 'arabesque',      french: 'Arabesque',      phonetic: 'a-ra-BESK',         english: 'Arabian',           difficulty: 'intermediate', category: 'Centre Work',  dimensionId: 'centre'      },
        { id: 'attitude',       french: 'Attitude',       phonetic: 'a-tee-TEWD',        english: 'Attitude',          difficulty: 'intermediate', category: 'Centre Work',  dimensionId: 'centre'      },
        { id: 'pas-de-bourree', french: 'Pas de bourrée', phonetic: 'pah duh boo-RAY',   english: 'Step of bourrée',   difficulty: 'intermediate', category: 'Centre Work',  dimensionId: 'centre'      },
        { id: 'fouette',        french: 'Fouetté',        phonetic: 'fweh-TAY',          english: 'Whipped',           difficulty: 'advanced',     category: 'Turns',        dimensionId: 'turns'       },
        { id: 'grand-jete',     french: 'Grand jeté',     phonetic: 'grahn zhuh-TAY',    english: 'Large throw',       difficulty: 'advanced',     category: 'Jumps',        dimensionId: 'allegro'     },
        { id: 'manege',         french: 'Manège',         phonetic: 'ma-NEZH',           english: 'Riding school',     difficulty: 'advanced',     category: 'Centre Work',  dimensionId: 'centre'      },
    ],

    folders: {
        barre: {
            icon: '🩰',
            title: 'Barre Exercises',
            subtitle: '15 fundamental skills',
            items: [
                { category: 'BARRE WORK', title: 'Plié', description: 'The foundation of all ballet movement', completed: true },
                { category: 'BARRE WORK', title: 'Tendu', description: 'Foot articulation and turnout', completed: true },
                { category: 'BARRE WORK', title: 'Dégagé', description: 'A quick, sharp brushing action', completed: true },
                { category: 'BARRE WORK', title: 'Rond de jambe', description: 'Circular movement for hip mobility', completed: false },
                { category: 'BARRE WORK', title: 'Frappé', description: 'Sharp, percussive striking action', completed: false },
                { category: 'BARRE WORK', title: 'Fondu', description: 'Smooth lowering and rising on one leg', completed: false },
                { category: 'BARRE WORK', title: 'Développé', description: 'Controlled unfolding of the leg', completed: false },
                { category: 'BARRE WORK', title: 'Grand battement', description: 'High kicks with control and alignment', completed: false }
            ],
        },
        footwork: {
            icon: '🦶',
            title: 'Footwork & Articulation',
            subtitle: '5 assessment exercises',
            items: [
                { category: 'ASSESSMENT', title: 'Pointe range test', description: 'Measure your foot flexibility and arch', completed: false },
                { category: 'ASSESSMENT', title: 'Relevé endurance', description: 'How many relevés can you do with proper form?', completed: false },
                { category: 'ASSESSMENT', title: 'Foot articulation', description: 'Assess your ability to articulate through demi-pointe', completed: false },
                { category: 'ASSESSMENT', title: 'Ankle strength', description: 'Test stability and strength in various positions', completed: false },
                { category: 'ASSESSMENT', title: 'Toe alignment', description: 'Check your alignment when on pointe', completed: false }
            ]
        },
        ballets: {
            icon: '🎭',
            title: 'Famous Ballets',
            subtitle: '18 iconic works',
            items: [
                { category: 'ROMANTIC', title: 'Giselle', description: 'Alicia Alonso\'s legendary interpretation', completed: true },
                { category: 'CLASSICAL', title: 'Swan Lake', description: 'Tchaikovsky\'s masterpiece', completed: true },
                { category: 'CLASSICAL', title: 'The Nutcracker', description: 'Beloved holiday tradition', completed: true },
                { category: 'CLASSICAL', title: 'Sleeping Beauty', description: 'Petipa\'s grand ballet', completed: false },
                { category: 'CLASSICAL', title: 'Don Quixote', description: 'Carlos Acosta\'s signature role', completed: false },
                { category: 'ROMANTIC', title: 'La Sylphide', description: 'Ethereal romantic ballet', completed: false },
                { category: 'DRAMATIC', title: 'Romeo and Juliet', description: 'MacMillan\'s passionate interpretation', completed: false },
                { category: 'COMEDY', title: 'La Fille mal gardée', description: 'Oldest surviving ballet', completed: false }
            ]
        }
    },

    questions: [
        {
            category: "About you",
            question: "Which best describes you?",
            type: "card-select",
            options: [
                { icon: "⭐", label: "Born to dance", description: "Dancing since before I can remember" },
                { icon: "💫", label: "Lifelong dancer", description: "Training consistently since childhood" },
                { icon: "🌱", label: "Just starting out", description: "Less than a year of ballet" },
                { icon: "🌸", label: "Finding my feet", description: "1–3 years of training" },
                { icon: "🎭", label: "Coming back", description: "Strong foundation, getting back to it" },
                { icon: "✨", label: "After a break", description: "Returning after some time away" }
            ],
            key: "persona"
        },
        {
            category: "Your ballet beginnings",
            question: "How long have you been training?",
            subtext: "Include any breaks — we're after total time since you first started",
            type: "multiple-choice",
            options: [ "Less than 6 months", "6 months to 1 year", "1–3 years", "3–5 years", "5–10 years", "10+ years" ],
            key: "experience"
        },
        {
            category: "Your ballet beginnings",
            question: "How many hours a week do you spend in class?",
            type: "multiple-choice",
            options: [ "None at the moment", "About an hour a week", "2–3 hours a week", "4–6 hours a week", "7–10 hours a week", "10+ hours a week" ],
            key: "frequency"
        },
        {
            category: "Barre",
            question: "Where are you with barre work?",
            subtext: "Think about a typical class — what can you get through?",
            type: "multiple-choice",
            options: [
                "I'm still learning the names and basic positions",
                "I can follow along if I watch the person in front",
                "I can get through a full barre without much trouble",
                "I can focus on quality — placement, musicality, transitions",
                "My barre is clean and I use it to warm up, not to learn"
            ],
            key: "barre"
        },
        {
            category: "Pointe",
            question: "What's your experience with pointe work?",
            type: "multiple-choice",
            options: [
                "I haven't started pointe",
                "I'm preparing for it (strengthening, relevé work)",
                "I've been on pointe for less than a year",
                "I've been on pointe for 1–3 years",
                "I've been on pointe for 3+ years"
            ],
            key: "pointe"
        },
        {
            category: "Turns",
            question: "What best describes your turning right now?",
            subtext: "Pick the statement that's closest — it doesn't have to be perfect",
            type: "multiple-choice",
            options: [
                "I haven't started working on turns",
                "I'm practising the preparation and spotting",
                "I can land a single pirouette most of the time",
                "I can do clean singles and I'm working on doubles",
                "I can do reliable doubles or more"
            ],
            key: "pirouette"
        },
        {
            category: "Centre",
            question: "How far have you got with centre work?",
            subtext: "Away from the barre — what can you do in the middle of the room?",
            type: "multiple-choice",
            options: [
                "I haven't done centre work yet",
                "Basic steps — tendus, simple port de bras",
                "Adagio and simple combinations",
                "Most centre work including turns and small jumps",
                "Complex combinations, grand allegro, and longer enchaînements"
            ],
            key: "centre"
        },
        {
            category: "Allegro",
            question: "Where are you with jumps?",
            subtext: "Think about what you can do in class, not just on a good day",
            type: "multiple-choice",
            options: [
                "I haven't started jumps",
                "Basic jumps — sautés in first and second",
                "Petit allegro — changements, échappés, assemblés",
                "Some grand allegro — grand jeté, sissonne",
                "Full allegro including complex combinations"
            ],
            key: "allegro"
        },
        {
            category: "Flexibility",
            question: "How close are you to a full front split?",
            subtext: "Go down as far as you can with square hips — how far off the floor are you?",
            type: "multiple-choice",
            options: [
                "A long way — I can't get past a deep lunge",
                "Halfway down — my hands are still supporting me",
                "Getting closer — a fist-height or two off the floor",
                "Almost there — a few centimetres to go",
                "Flat on the floor with square hips"
            ],
            key: "frontSplit"
        },
        {
            category: "Flexibility",
            question: "In à la seconde, how high can you hold your leg?",
            subtext: "Standing on one leg, lifting to the side — with control, not a kick",
            type: "multiple-choice",
            options: [
                "Below hip height",
                "Around hip height",
                "Between hip and 90°",
                "At 90° or close to it",
                "Above 90° with control"
            ],
            key: "legHeight"
        },
        {
            category: "Musicality",
            question: "How do you relate to the music in class?",
            type: "multiple-choice",
            options: [
                "I focus on getting the steps right — music comes later",
                "I can hear the counts but I don't always move with the phrasing",
                "I generally stay on the music and can feel the tempo changes",
                "I naturally use the music — I accent movements and breathe with the phrases",
                "The music shapes how I dance — I interpret dynamics, not just counts"
            ],
            key: "musicality"
        },
        {
            category: "Knowledge",
            question: "If your teacher calls out a combination using French terms, how much can you follow?",
            type: "multiple-choice",
            options: [
                "I need to watch someone else first",
                "I recognise some terms but need to see the demonstration",
                "I can follow most of a basic combination by ear",
                "I can follow complex combinations with minimal demonstration",
                "I can follow almost anything called in French"
            ],
            key: "terminology"
        },
        {
            category: "Knowledge",
            question: "How familiar are you with ballet as an art form?",
            subtext: "Repertoire, history, famous dancers and companies",
            type: "multiple-choice",
            options: [
                "I'm new to all of it",
                "I know a few famous ballets and dancers",
                "I have a decent general knowledge — I've seen performances and read about ballet",
                "I know the major works, choreographers, and companies quite well",
                "I could talk about ballet history and repertoire in depth"
            ],
            key: "repertoire"
        },
        {
            category: "Your goals",
            question: "What are you working towards?",
            subtext: "Select all that apply",
            type: "multi-select",
            options: [
                "Getting back into ballet",
                "Building a regular practice habit",
                "Working towards pointe",
                "Improving my technique",
                "Preparing to perform",
                "Enjoying ballet as part of my life"
            ],
            key: "goals"
        }
    ],

    armPositions: ['arms-bras-bas','arms-bras-bas','arms-bras-bas','arms-first','arms-first','arms-first','arms-first','arms-second','arms-second','arms-second','arms-second','arms-fifth','arms-fifth','arms-fifth'],
    positionLabels: ['BRAS BAS','BRAS BAS','BRAS BAS','FIRST POSITION','FIRST POSITION','FIRST POSITION','FIRST POSITION','SECOND POSITION','SECOND POSITION','SECOND POSITION','SECOND POSITION','FIFTH EN HAUT','FIFTH EN HAUT','FIFTH EN HAUT'],

    stageLabels: ['Just starting', 'Early stages', 'Developing', 'Comfortable', 'Strong'],

    levelLabels: {
        'beginner': 'BEGINNER', 'elementary': 'ELEMENTARY', 'improver': 'IMPROVER',
        'intermediate': 'INTERMEDIATE', 'upper-intermediate': 'UPPER INTERMEDIATE',
        'advanced': 'ADVANCED', 'not-assessed': 'NOT YET ASSESSED'
    },

    dimensionNames: {
        barre: 'Barre', centre: 'Centre', allegro: 'Allegro',
        turns: 'Turns', flexibility: 'Flexibility', pointe: 'Pointe',
        musicality: 'Musicality', knowledge: 'Knowledge'
    },

    skillCategories: [
        { id: 'barre', icon: '🩰', name: 'Barre work', count: '15 skills', onclick: "openFolder('barre')" },
        { id: 'centre', icon: '💫', name: 'Centre work', count: '12 skills', onclick: "alert('Coming soon')" },
        { id: 'turns', icon: '🔄', name: 'Turns', count: '8 skills', onclick: "alert('Coming soon')" },
        { id: 'allegro', icon: '🦘', name: 'Allegro', count: '14 skills', onclick: "alert('Coming soon')" },
        { id: 'pointe', icon: '🩰', name: 'Pointe work', count: '10 skills', onclick: "alert('Coming soon')" },
        { id: 'flexibility', icon: '🤸', name: 'Flexibility & strength', count: '12 exercises', onclick: "alert('Coming soon')" }
    ],

    assessments: [
        { icon: '📋', name: 'Placement quiz', desc: 'Find your overall level across 6 dimensions', action: 'startPlacementQuiz()', badge: '14 questions' },
        { icon: '🦶', name: 'Footwork & articulation', desc: 'Pointe work, relevé strength, and foot flexibility', action: "openFolder('footwork')", badge: '5 exercises' },
        { icon: '🤸', name: 'Splits & extensions', desc: 'Splits, leg height, and range of motion', action: "alert('Coming soon')", badge: '6 exercises' },
        { icon: '💪', name: 'Core & stamina', desc: 'Endurance, balance, and core stability', action: "alert('Coming soon')", badge: '10 exercises' },
        { icon: '🔄', name: 'Pirouettes & rotation', desc: 'Turning technique and spotting', action: "alert('Coming soon')", badge: '7 exercises' }
    ],

    learnSections: [
        { icon: '🩰', name: 'Skill library', desc: 'Every ballet movement — browse, search, and learn', count: '80+ skills', action: "alert('Coming soon')" },
        { icon: '🎭', name: 'Famous ballets', desc: 'Iconic productions and the dancers who defined them', count: '18 ballets', action: "openFolder('ballets')" },
        { icon: '🎵', name: 'Composers', desc: 'From Tchaikovsky to Prokofiev and beyond', count: '12 composers', action: "alert('Coming soon')" },
        { icon: '🌟', name: 'Variations', desc: 'Classical variations to study and learn', count: '25 variations', action: "alert('Coming soon')" },
        { icon: '💃', name: 'Legendary dancers', desc: 'From Plisetskaya to Acosta — the greats', count: '15 dancers', action: "alert('Coming soon')" }
    ],

    profileCapabilities: [
        { icon: '📝', label: 'AFTER CLASS', title: 'Save corrections', description: 'Write down feedback from your teacher before you forget it', action: "alert('Coming soon')" },
        { icon: '🎯', label: 'PLANNING', title: 'Set goals', description: 'Short-term and long-term targets to keep you on track', action: "alert('Coming soon')" },
        { icon: '📊', label: 'OVER TIME', title: 'Track your skills', description: 'Monitor progress across every movement, from plié to grand jeté', action: "navigateTo('barre')" },
        { icon: '📋', label: 'MEASURE', title: 'Reassess yourself', description: 'Retake assessments to see how you\'ve progressed', action: "navigateTo('assess')" },
        { icon: '🎭', label: 'LEARN', title: 'Study repertoire', description: 'Explore ballets, composers, dancers, and famous variations', action: "navigateTo('learn')" },
        { icon: '📓', label: 'REFLECT', title: 'Log sessions', description: 'Keep a record of every class — what you did, how it went', action: "openSessionLogger()" }
    ]
};

/* ═══════════════════════════════════════════════════════════════
   STORAGE ADAPTER
   UI never touches storage directly — always goes through here.
   Stage 3: replace each no-op with the localStorage implementation
   shown in the comments.
   ═══════════════════════════════════════════════════════════════ */

const STORAGE_KEYS = {
    skills:           'plie:skills',
    corrections:      'plie:corrections',
    sessions:         'plie:sessions',
    sessionTemplates: 'plie:sessionTemplates',
    sessionSkills:    'plie:sessionSkills',
    assessments:      'plie:assessments',
    goals:            'plie:goals',
    timeline:         'plie:timeline',
};

const storage = {
    // Stage 3: localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(value))
    save: (key, value) => {},

    // Stage 3: try { return JSON.parse(localStorage.getItem(STORAGE_KEYS[key])) } catch { return null }
    load: (key) => null,

    // Stage 3: Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k))
    clear: () => {}
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

    // Misc
    notes:      [],
    persona:    null,
    currentNav: null,

    // Active session being constructed — never persisted mid-flight
    currentSession: null
};

// ── Mock data — seeded for development/testing ──
// Represents two logged sessions in the new normalised schema.
// Remove or gate behind a DEV flag before release.
(function seedMockData() {
    // Sessions
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
            highlight:     true,
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
})();


/* ═══════════════════════════════════════════════════════════════
   2. UTILITIES
   Shared helpers used across the app.
   ═══════════════════════════════════════════════════════════════ */

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
   3. NAVIGATION — Central Router
   All screen transitions go through here.
   ═══════════════════════════════════════════════════════════════ */

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
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
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector(`[data-nav="${section}"]`)?.classList.add('active');
    appState.currentNav = section;

    const routes = {
        barre:   () => showBarreScreen(),
        assess:  () => showAssessScreen(),
        goals:   () => showGoalsScreen(),
        learn:   () => showLearnScreen(),
        profile: () => { showScreen('profile'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    };

    (routes[section] || routes.profile)();
}


/* ═══════════════════════════════════════════════════════════════
   4. ONBOARDING
   Welcome screens, swipe gestures, skip logic.
   ═══════════════════════════════════════════════════════════════ */

let currentOnboardingScreen = 1;
const totalOnboardingScreens = 3;

function nextOnboarding() {
    if (currentOnboardingScreen < totalOnboardingScreens) {
        document.getElementById(`onboarding-${currentOnboardingScreen}`).classList.remove('active');
        currentOnboardingScreen++;
        document.getElementById(`onboarding-${currentOnboardingScreen}`).classList.add('active');
    } else {
        completeOnboarding();
    }
}

function completeOnboarding() {
    document.getElementById(`onboarding-${currentOnboardingScreen}`).classList.remove('active');
    appState.currentQuestion = 0;
    showScreen('assessment');
    renderQuestion();
}

function skipOnboarding() {
    document.getElementById(`onboarding-${currentOnboardingScreen}`).classList.remove('active');
    appState.level = 'not-assessed';
    appState.dimensions = null;
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
            document.getElementById(`onboarding-${currentOnboardingScreen}`).classList.remove('active');
            currentOnboardingScreen--;
            document.getElementById(`onboarding-${currentOnboardingScreen}`).classList.add('active');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.onboarding-screen').forEach(screen => {
        screen.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, false);
        screen.addEventListener('touchend', e => { touchEndX = e.changedTouches[0].screenX; handleOnboardingSwipe(); }, false);
    });
});


/* ═══════════════════════════════════════════════════════════════
   5. ASSESSMENT SYSTEM
   Quiz rendering, scoring, dimension calculation, results.
   ═══════════════════════════════════════════════════════════════ */

function startPlacementQuiz() {
    appState.currentQuestion = 0;
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
                        <div class="persona-icon">${opt.icon}</div>
                        <h3>${opt.label}</h3>
                        <p>${opt.description}</p>
                    </div>
                `;
            }).join('') + '</div>';
    } else if (question.type === 'multiple-choice') {
        question.options.forEach((option, idx) => {
            const btn = document.createElement('button');
            btn.className = 'assessment-option';
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
    appState.answers[key] = value;
    renderQuestion();
}

function toggleMultiSelect(key, value) {
    if (!appState.answers[key]) appState.answers[key] = [];
    const index = appState.answers[key].indexOf(value);
    if (index > -1) { appState.answers[key].splice(index, 1); }
    else { appState.answers[key].push(value); }
    renderQuestion();
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
    showScreen('profile');
    document.querySelector('.bottom-nav')?.classList.add('visible');
    document.querySelector('.fab')?.classList.add('visible');
}

function exitQuiz() {
    const answered = Object.keys(appState.answers).filter(k => k !== 'goals' && appState.answers[k] !== undefined);
    if (answered.length > 0) {
        calculateResults();
    } else {
        appState.level = 'not-assessed';
        appState.dimensions = null;
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
    if (avg < 0)       { level = 'not-assessed'; levelLabel = 'Not assessed'; levelDescription = "Complete the quiz to find your level"; }
    else if (avg >= 3.8) { level = 'advanced'; levelLabel = 'Advanced'; levelDescription = "You're working at an advanced level"; }
    else if (avg >= 3.0) { level = 'upper-intermediate'; levelLabel = 'Upper Intermediate'; levelDescription = "You're working at a strong level"; }
    else if (avg >= 2.2) { level = 'intermediate'; levelLabel = 'Intermediate'; levelDescription = "Your technique is developing well"; }
    else if (avg >= 1.5) { level = 'improver'; levelLabel = 'Improver'; levelDescription = "You have a solid base to build on"; }
    else if (avg >= 0.8) { level = 'elementary'; levelLabel = 'Elementary'; levelDescription = "You're building core foundations"; }
    else                 { level = 'beginner'; levelLabel = 'Beginner'; levelDescription = "You're at the start of your training"; }

    appState.level = level;

    // Strongest / weakest
    const answeredCoreDims = coreKeys.filter(k => rawDimensions[k] !== null).map(k => [k, rawDimensions[k]]);
    let strength = 'n/a', focus = 'n/a';
    if (answeredCoreDims.length > 0) {
        const sorted = [...answeredCoreDims].sort((a, b) => b[1] - a[1]);
        strength = DATA.dimensionNames[sorted[0][0]];
        focus = sorted.slice(-2).map(d => DATA.dimensionNames[d[0]]).join(' and ');
    }

    // Render results screen
    renderDimensionChart(dimensions, document.getElementById('dimensionBreakdown'));
    document.getElementById('resultLevel').textContent = levelLabel;
    document.getElementById('resultLevelBadge').textContent = levelLabel.toUpperCase();
    document.getElementById('resultLevelDescription').textContent = levelDescription;
    document.getElementById('resultStrength').textContent = strength;
    document.getElementById('resultFocus').textContent = focus;
}

function showProfile() { showScreen('profile'); }

function completeAssessment() {
    calculateResults();
    showScreen('profile');
}

function skipToProfile() {
    appState.answers.level = 'beginner';
    appState.persona = 'skip';
    showScreen('profile');
}


/* ═══════════════════════════════════════════════════════════════
   6. UI RENDERING — Screen Builders
   Functions that create/populate each main screen.
   ═══════════════════════════════════════════════════════════════ */

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

function openSessionLogger() {
    const today = new Date().toISOString().split('T')[0];
    appState.currentSession = {
        id: Date.now(),
        date: today,
        templateId: null,
        classType: null,
        blocks: []
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

function renderSessionLogger() {
    const overlay = document.getElementById('session-logger-overlay');
    if (!overlay) return;

    const s = appState.currentSession;
    const templates = appState.sessionTemplates;

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

    overlay.innerHTML = `
        <div class="session-logger-sheet">
            <div class="session-sheet-handle"></div>

            <div class="session-logger-header">
                <div>
                    <div class="session-logger-eyebrow">New session</div>
                    <h2 class="session-logger-title">Log a class</h2>
                </div>
                <button class="session-close-btn" onclick="closeSessionLogger()" aria-label="Close">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                        <line x1="4" y1="4" x2="14" y2="14"/>
                        <line x1="14" y1="4" x2="4" y2="14"/>
                    </svg>
                </button>
            </div>

            <div class="session-logger-body" id="session-logger-body">

                <!-- Date -->
                <div class="session-field">
                    <label class="session-field-label">Date</label>
                    <input type="date" class="session-input" value="${s.date}"
                           onchange="updateSessionDate(this.value)" />
                </div>

                <!-- Session combobox -->
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
                    ${activeTemplate ? `<div class="session-template-preview"><span class="template-preview-text">${renderTemplatePreview(s.templateId)}</span></div>` : ''}
                </div>

                <!-- New session form injected here -->
                <div id="new-session-form-container"></div>

                <!-- Class type -->
                <div class="session-field">
                    <label class="session-field-label">Class type <span class="session-field-optional">optional</span></label>
                    ${predictedType && !s.classType ? `<div class="class-type-predicted-note">suggested from your session</div>` : ''}
                    <div class="class-type-carousel">
                        ${primaryChips}
                        ${selectedSecondaryChip}
                        <div class="class-type-carousel-item">
                            <button class="class-type-chip class-type-more" onclick="toggleMoreClassTypes()">
                                <span class="class-type-chip-label">More…</span>
                            </button>
                        </div>
                    </div>
                    <div id="more-class-types-panel" style="display:none;"></div>
                </div>

                <!-- Notes & corrections blocks -->
                <div class="session-field" style="margin-bottom: var(--sp-sm);">
                    <label class="session-field-label">Notes &amp; corrections</label>
                </div>

                <div id="session-blocks-container">
                    ${blocksHtml}
                </div>

                <button class="add-block-btn" onclick="addBlock()">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                        <line x1="7" y1="2" x2="7" y2="12"/>
                        <line x1="2" y1="7" x2="12" y2="7"/>
                    </svg>
                    add notes &amp; corrections
                </button>

                <div style="height: var(--sp-3xl);"></div>

            </div>

            <div class="session-logger-footer">
                <button class="session-discard-btn" onclick="closeSessionLogger()">discard</button>
                <button class="btn-large session-save-btn" onclick="saveSession()">save session</button>
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
            <span class="session-combobox-row-name">${t.name}</span>
            <span class="session-combobox-row-meta">${[t.location, t.days?.join(', ')].filter(Boolean).join(' · ')}</span>
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
                <input type="text" class="session-input"
                       placeholder="e.g. Covent Garden Studio"
                       value="${d.location}"
                       oninput="appState._draftTemplate.location = this.value"
                       maxlength="60" />
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

function addBlock() {
    const block = {
        id: Date.now(),
        topicId: 'general',
        title: '',       // first-line bold title (Apple Notes style)
        notes: '',
        corrections: '',
        highlight: false
    };
    appState.currentSession.blocks.push(block);
    sortBlocks();
    renderBlocksOnly();
}

function sortBlocks() {
    if (!appState.currentSession?.blocks) return;
    appState.currentSession.blocks.sort((a, b) => {
        const aGeneral = a.topicId === 'general' ? 0 : 1;
        const bGeneral = b.topicId === 'general' ? 0 : 1;
        return aGeneral - bGeneral;
    });
}

function renderBlocksOnly() {
    const container = document.getElementById('session-blocks-container');
    if (!container) return;
    const s = appState.currentSession;
    container.innerHTML = s.blocks.map((block, i) => renderBlockHtml(block, i)).join('');
}

function renderBlockHtml(block, index) {
    const topics = getBlockTopics();
    const isSkill = block.topicId?.startsWith('skill:');
    const isGeneral = block.topicId === 'general';

    return `
        <div class="session-block ${block.highlight ? 'highlighted' : ''}" id="block-${block.id}">

            <div class="session-block-header">
                <div class="session-block-topic-wrapper">
                    <select class="session-block-topic-select"
                            onchange="updateBlockTopic(${index}, this.value)">
                        <optgroup label="General">
                            ${topics.filter(t => t.group === 'General').map(t =>
                                `<option value="${t.id}" ${t.id === block.topicId ? 'selected' : ''}>${t.label}</option>`
                            ).join('')}
                        </optgroup>
                        <optgroup label="Category">
                            ${topics.filter(t => t.group === 'Category').map(t =>
                                `<option value="${t.id}" ${t.id === block.topicId ? 'selected' : ''}>${t.label}</option>`
                            ).join('')}
                        </optgroup>
                        <optgroup label="Skills">
                            ${topics.filter(t => t.group === 'Skills').map(t =>
                                `<option value="${t.id}" ${t.id === block.topicId ? 'selected' : ''}>${t.label}</option>`
                            ).join('')}
                        </optgroup>
                    </select>
                    <svg class="session-select-chevron" style="right:8px;" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="4 6 8 10 12 6"/>
                    </svg>
                </div>
                <div class="session-block-actions">
                    ${isSkill ? `<button class="block-learn-link" onclick="openSkillFromBlock('${block.topicId}')">learn →</button>` : ''}
                    <button class="block-highlight-btn ${block.highlight ? 'active' : ''}"
                            onclick="toggleBlockHighlight(${index})"
                            aria-label="Highlight this block">★</button>
                    <button class="block-remove-btn" onclick="removeBlock(${index})" aria-label="Remove">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                            <line x1="3" y1="3" x2="11" y2="11"/>
                            <line x1="11" y1="3" x2="3" y2="11"/>
                        </svg>
                    </button>
                </div>
            </div>

            <div class="session-block-fields">
                <!-- Title line — bold, acts as label (Apple Notes style) -->
                <textarea class="session-block-title-input"
                          placeholder="${isGeneral ? 'General notes' : 'Add a title…'}"
                          rows="1"
                          oninput="updateBlockField(${index}, 'title', this.value); autoResizeTextarea(this);"
                          onfocus="this.placeholder=''"
                          onblur="this.placeholder='${isGeneral ? 'General notes' : 'Add a title…'}'"
                          >${block.title}</textarea>

                <textarea class="session-block-textarea"
                          placeholder="Notes — what did you work on? how did it feel?"
                          rows="2"
                          oninput="updateBlockField(${index}, 'notes', this.value); autoResizeTextarea(this);"
                          >${block.notes}</textarea>

                <textarea class="session-block-textarea session-block-corrections"
                          placeholder="Corrections — what did your teacher say?"
                          rows="2"
                          oninput="updateBlockField(${index}, 'corrections', this.value); autoResizeTextarea(this);"
                          >${block.corrections}</textarea>
            </div>
        </div>
    `;
}

function updateBlockTopic(index, topicId) {
    if (!appState.currentSession?.blocks[index]) return;
    appState.currentSession.blocks[index].topicId = topicId;
    sortBlocks();
    renderBlocksOnly();
}

function toggleBlockHighlight(index) {
    if (!appState.currentSession?.blocks[index]) return;
    appState.currentSession.blocks[index].highlight = !appState.currentSession.blocks[index].highlight;
    renderBlocksOnly();
}

function autoResizeTextarea(el) {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
}

function updateBlockField(index, field, value) {
    if (!appState.currentSession?.blocks[index]) return;
    appState.currentSession.blocks[index][field] = value;
    // No re-render — just update state, textarea manages its own value
}

function removeBlock(index) {
    appState.currentSession.blocks.splice(index, 1);
    renderBlocksOnly();
}

function openSkillFromBlock(topicId) {
    const skillId = topicId.replace('skill:', '');
    closeSessionLogger();
    // TODO: navigate to skill detail page — skillId is now a slug e.g. 'pirouette'
    console.log('Navigate to skill:', skillId);
}

// ── Save ──
function saveSession() {
    const s = appState.currentSession;
    if (!s) return;

    const now = Date.now();

    // 1. Persist the Session object (no blocks — those become SessionSkills + Corrections)
    const session = {
        id:              s.id,
        date:            s.date,
        savedAt:         now,
        templateId:      s.templateId   || null,
        sessionName:     s.sessionName  || null,
        sessionLocation: s.sessionLocation || null,
        classType:       s.classType    || null,
        notes:           s.generalNotes || null,
    };
    appState.sessions.push(session);
    storage.save('sessions', appState.sessions);

    // 2. Process each block into SessionSkill + Correction objects
    let skillCount = 0;
    let correctionCount = 0;

    s.blocks.forEach(block => {
        const isSkill = block.topicId?.startsWith('skill:');
        const skillId = isSkill ? block.topicId.replace('skill:', '') : null;

        // Corrections from this block — one object per correction text
        const blockCorrectionIds = [];

        if (block.corrections?.trim()) {
            const correction = {
                id:          now + Math.floor(Math.random() * 10000),
                skillId:     skillId || null,
                text:        block.corrections.trim(),
                createdAt:   now,
                sessionId:   session.id,
                source:      'teacher',   // schema-only for now; no UI field yet
                type:        null,
                isRecurring: false,
            };
            appState.corrections.push(correction);
            blockCorrectionIds.push(correction.id);
            correctionCount++;
        }

        // SessionSkill join object — created for skill blocks only
        if (isSkill && skillId) {
            const skill = appState.skills.find(sk => sk.id === skillId);

            const sessionSkill = {
                id:            now + Math.floor(Math.random() * 10000),
                sessionId:     session.id,
                skillId:       skillId,
                notes:         block.notes?.trim()     || null,
                correctionIds: blockCorrectionIds,
                tracked:       true,
                flagged:       block.highlight || false,
                blockTitle:    block.title?.trim()     || null,
                highlight:     block.highlight || false,
            };
            appState.sessionSkills.push(sessionSkill);
            skillCount++;

            // Flag skill as active in The Barre
            if (skill) skill.flagged = true;
        }
    });

    storage.save('corrections',   appState.corrections);
    storage.save('sessionSkills', appState.sessionSkills);
    persistSkillState();

    // 3. Timeline entry
    const template = appState.sessionTemplates.find(t => t.id === s.templateId);
    const sessionLabel = session.sessionName || template?.name || 'Session';
    const classTypeLabel = session.classType
        ? (ALL_CLASS_TYPES.find(ct => ct.id === session.classType)?.label || session.classType)
        : null;

    const bodyParts = [
        classTypeLabel,
        skillCount      ? `${skillCount} skill${skillCount > 1 ? 's' : ''}`           : null,
        correctionCount ? `${correctionCount} correction${correctionCount > 1 ? 's' : ''}` : null,
    ].filter(Boolean);

    appState.timeline.unshift({
        id:       now + 1,
        type:     'session',
        objectId: session.id,
        title:    sessionLabel,
        body:     bodyParts.join(' · ') || null,
        date:     session.date,
        createdAt: now + 1,
    });
    storage.save('timeline', appState.timeline);

    appState.currentSession = null;
    closeSessionLogger();

    if (appState.currentScreen === 'profile') initProfile();
}

// ── The Barre ──
function showBarreScreen() {
    let screen = document.getElementById('barre-screen');
    if (!screen) {
        screen = document.createElement('div');
        screen.className = 'screen';
        screen.id = 'barre-screen';
        document.querySelector('.app-container').appendChild(screen);
    }

    const activeSkills = appState.skills.filter(s => s.flagged || s.tracked);
    const dims = appState.dimensions || {};
    const dimLabels = { barre: 'Barre', centre: 'Centre', allegro: 'Allegro', turns: 'Turns', flexibility: 'Flexibility' };
    const coreDims = { barre: dims.barre?.raw ?? 1, centre: dims.centre?.raw ?? 1, allegro: dims.allegro?.raw ?? 1, turns: dims.turns?.raw ?? 1, flexibility: dims.flexibility?.raw ?? 1 };
    const weakest = Object.entries(coreDims).sort((a, b) => a[1] - b[1])[0];
    const weakLabel = dimLabels[weakest[0]] || 'Technique';

    let activeSkillsHtml = '';
    if (activeSkills.length > 0) {
        activeSkillsHtml = `
            <div style="padding: 0 var(--sp-lg); margin-bottom: var(--sp-xl);">
                <h2 class="section-title" style="padding: 0; margin-bottom: var(--sp-md);">Active skills</h2>
                <div style="display: flex; flex-direction: column; gap: var(--sp-sm);">
                    ${activeSkills.map(skill => {
                        const skillCorrections = appState.corrections
                            .filter(c => c.skillId === skill.id)
                            .sort((a, b) => b.createdAt - a.createdAt);
                        const lastCorrection = skillCorrections[0] || null;
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
                        return `
                        <div class="active-skill-card" onclick="alert('Skill detail page coming soon')">
                            <div class="active-skill-info">
                                <div class="active-skill-name">${skill.french}</div>
                                <div class="active-skill-meta">${skill.category}${skill.flagged ? ' · In focus' : ''}</div>
                                ${lastCorrection ? `<div class="active-skill-correction">"${lastCorrection.text}"</div>` : ''}
                                ${lastSession ? `<div class="active-skill-date">Last worked: ${formatTimelineDate(lastSession.date)}</div>` : ''}
                            </div>
                            <div class="active-skill-progress">${skill.tracked ? '✓' : '—'}</div>
                        </div>`;
                    }).join('')}
                </div>
            </div>
        `;
    } else {
        activeSkillsHtml = `
            <div class="barre-empty-state">
                <div class="barre-empty-icon">🩰</div>
                <div class="barre-empty-title">No active skills yet</div>
                <div class="barre-empty-text">Log a session to start tracking skills, or browse the categories below to add them manually.</div>
            </div>
        `;
    }

    screen.innerHTML = `
        <div class="profile-header"><h1>The Barre</h1></div>
        <div class="barre-context">
            <span class="barre-context-badge">${(appState.level || 'beginner').replace('-', ' ')}</span>
            <span class="barre-context-text">${weakLabel} could use the most attention</span>
        </div>
        <div style="padding: 0 var(--sp-lg); margin-bottom: var(--sp-xl);">
            <div class="profile-action-card hero" onclick="openSessionLogger()">
                <div class="profile-action-label">AFTER CLASS</div>
                <div class="profile-action-title">Log your session</div>
                <div class="profile-action-description">Record what you worked on and save any corrections while they're fresh.</div>
                <div class="profile-action-arrow">log now →</div>
            </div>
        </div>
        ${activeSkillsHtml}
        <div style="padding: 0 var(--sp-lg); margin-bottom: 120px;">
            <h2 class="section-title" style="padding: 0; margin-bottom: var(--sp-md);">Browse by category</h2>
            <div style="display: flex; flex-direction: column; gap: var(--sp-sm);">
                ${DATA.skillCategories.map(cat => `
                    <div class="skill-category-card" onclick="${cat.onclick}">
                        <div class="skill-category-icon">${cat.icon}</div>
                        <div class="skill-category-info">
                            <div class="skill-category-name">${cat.name}</div>
                            <div class="skill-category-count">${cat.count}</div>
                        </div>
                        <div class="skill-category-arrow">→</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    showScreen('barre-screen');
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
                            <div class="skill-category-icon" ${i === 0 ? 'style="background: var(--accent-soft);"' : ''}>${a.icon}</div>
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
function showGoalsScreen() {
    let screen = document.getElementById('goals-screen');
    if (!screen) {
        screen = document.createElement('div');
        screen.id = 'goals-screen';
        screen.className = 'screen';
        screen.innerHTML = `
            <div class="profile-header">
                <h1>Goals</h1>
                <p style="color: var(--text-muted); font-size: var(--fs-body); margin-top: var(--sp-xs);">Set targets and track your progress towards them</p>
            </div>
            <div class="barre-empty-state">
                <div class="barre-empty-icon">🎯</div>
                <div class="barre-empty-title">No goals set yet</div>
                <div class="barre-empty-text">Set your first goal to start tracking progress. Goals can be linked to specific skills or dimensions.</div>
                <button class="btn-large" onclick="alert('Coming soon')" style="max-width: 240px; margin: 0 auto;">set a goal</button>
            </div>
            <div style="height: 120px;"></div>
        `;
        document.querySelector('.app-container').appendChild(screen);
    }
    showScreen('goals-screen');
}

// ── Learn ──
function showLearnScreen() {
    let screen = document.getElementById('learn-screen');
    if (!screen) {
        screen = document.createElement('div');
        screen.id = 'learn-screen';
        screen.className = 'screen';
        screen.innerHTML = `
            <div class="profile-header">
                <h1>Learn</h1>
                <p style="color: var(--text-muted); font-size: var(--fs-body); margin-top: var(--sp-xs);">Explore the world of ballet</p>
            </div>
            <div style="padding: 0 var(--sp-lg); margin-bottom: 120px;">
                <div style="display: flex; flex-direction: column; gap: var(--sp-sm);">
                    ${DATA.learnSections.map(s => `
                        <div class="skill-category-card" onclick="${s.action}">
                            <div class="skill-category-icon">${s.icon}</div>
                            <div class="skill-category-info">
                                <div class="skill-category-name">${s.name}</div>
                                <div class="skill-category-count">${s.count}</div>
                                <div style="font-size: var(--fs-small); color: var(--text-muted); margin-top: 2px; line-height: 1.4;">${s.desc}</div>
                            </div>
                            <div class="skill-category-arrow">→</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        document.querySelector('.app-container').appendChild(screen);
    }
    showScreen('learn-screen');
}

// ── Folder Detail Views ──
function openFolder(folderId) {
    const folder = DATA.folders[folderId];
    if (!folder) { console.log('Folder not yet implemented:', folderId); return; }

    let detailScreen = document.getElementById('detail-' + folderId);
    if (!detailScreen) {
        detailScreen = document.createElement('div');
        detailScreen.className = 'screen';
        detailScreen.id = 'detail-' + folderId;

        detailScreen.innerHTML = `
            <div class="detail-view">
                <div class="detail-header">
                    <button class="detail-back-btn" onclick="navigateTo('assess')">←</button>
                    <div class="detail-title-section">
                        <div class="detail-icon">${folder.icon}</div>
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

    // Level badge
    document.getElementById('levelBadge').textContent = DATA.levelLabels[level] || 'NOT YET ASSESSED';

    // Dimension chart
    renderDimensionChart(dims, document.getElementById('profileDimensions'));

    // Hero action card
    const heroEl = document.getElementById('profileHeroCard');
    const persona = appState.answers?.persona;
    let heroLabel, heroTitle, heroDesc, heroAction;

    if (persona === 4 || persona === 5) {
        heroLabel = 'WELCOME BACK'; heroTitle = 'Record your first class back';
        heroDesc = 'After your next session, log what you worked on and how it felt. A good way to ease back in.';
        heroAction = 'log a session →';
    } else if (level === 'beginner' || level === 'elementary') {
        heroLabel = 'GET STARTED'; heroTitle = 'Record your next class';
        heroDesc = 'After each session, jot down what you covered and any corrections your teacher gave you.';
        heroAction = 'log a session →';
    } else {
        heroLabel = 'KEEP GOING'; heroTitle = 'Log your latest session';
        heroDesc = 'Track what you worked on, save corrections, and note anything you want to revisit.';
        heroAction = 'log a session →';
    }

    heroEl.innerHTML = `
        <div class="profile-action-card hero" onclick="openSessionLogger()">
            <div class="profile-action-label">${heroLabel}</div>
            <div class="profile-action-title">${heroTitle}</div>
            <div class="profile-action-description">${heroDesc}</div>
            <div class="profile-action-arrow">${heroAction}</div>
        </div>
    `;

    // Goal prompt
    const goalEl = document.getElementById('profileGoalCard');
    let suggestedGoal = 'Build a consistent practice routine';
    const goals = appState.answers?.goals || [];
    if (goals.includes(2)) suggestedGoal = 'Work towards pointe readiness';
    else if (goals.includes(3)) suggestedGoal = 'Improve technique in my weakest areas';
    else if (goals.includes(4)) suggestedGoal = 'Prepare for a performance';
    else if (goals.includes(0)) suggestedGoal = 'Get back into a regular class routine';

    goalEl.innerHTML = `
        <div class="profile-action-card" onclick="alert('Coming soon')">
            <div class="profile-action-label">YOUR FIRST GOAL</div>
            <div class="profile-action-title">${suggestedGoal}</div>
            <div class="profile-action-description">Based on what you told us. Tap to confirm, edit, or set your own.</div>
            <div class="profile-action-arrow">set this goal →</div>
        </div>
    `;

    // Explore cards
    const exploreEl = document.getElementById('profileExploreCards');
    exploreEl.innerHTML = DATA.profileCapabilities.map(cap => `
        <div class="scroll-card" onclick="${cap.action}" style="flex: 0 0 200px;">
            <div class="scroll-card-icon">${cap.icon}</div>
            <div class="scroll-card-category">${cap.label}</div>
            <div class="scroll-card-title" style="font-size: var(--fs-body);">${cap.title}</div>
            <div class="scroll-card-description">${cap.description}</div>
        </div>
    `).join('');

    // Timeline — render from appState.timeline, with the quiz/join entry at the bottom
    const timelineEl = document.getElementById('timeline');
    if (timelineEl) {
        const firstEntryText = (level === 'not-assessed' || !appState.level)
            ? 'Joined plié'
            : `Completed placement quiz — ${(DATA.levelLabels[level] || 'BEGINNER').charAt(0) + (DATA.levelLabels[level] || 'BEGINNER').slice(1).toLowerCase()}`;

        const sessionEntries = (appState.timeline || []).map(entry => {
            const isTappable = entry.type === 'session' && entry.objectId;
            return `
            <div class="timeline-item ${isTappable ? 'timeline-item-tappable' : ''}"
                 ${isTappable ? `onclick="showSessionDetail(${entry.objectId})"` : ''}>
                <div class="timeline-dot ${entry.type === 'session' ? 'timeline-dot-session' : ''}"></div>
                <div class="timeline-content">
                    <div class="timeline-date">${formatTimelineDate(entry.date)}</div>
                    <div class="timeline-title">${entry.title}</div>
                    ${entry.body ? `<div class="timeline-subtitle">${entry.body}</div>` : ''}
                    ${isTappable ? `<div class="timeline-tap-hint">tap to review →</div>` : ''}
                </div>
            </div>`;
        }).join('');

        timelineEl.innerHTML = `
            ${sessionEntries}
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="timeline-date">Today</div>
                    <div class="timeline-title">${firstEntryText}</div>
                </div>
            </div>
        `;
    }
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


/* ═══════════════════════════════════════════════════════════════
   SESSION DETAIL VIEW
   Full-screen slide-in from right. Read-only review of a saved session.
   ═══════════════════════════════════════════════════════════════ */

function showSessionDetail(sessionId) {
    const session = appState.sessions.find(s => s.id === sessionId);
    if (!session) return;

    const returnTo = appState.currentScreen;

    let screen = document.getElementById(`session-detail-${sessionId}`);
    if (!screen) {
        screen = document.createElement('div');
        screen.className = 'screen session-detail-screen';
        screen.id = `session-detail-${sessionId}`;
        document.querySelector('.app-container').appendChild(screen);
    }

    const classTypeLabel = session.classType
        ? ALL_CLASS_TYPES.find(ct => ct.id === session.classType)?.label || session.classType
        : null;

    const template = appState.sessionTemplates.find(t => t.id === session.templateId);
    const sessionTitle = session.sessionName || template?.name || 'Session';
    const location = template?.location || session.sessionLocation || null;

    const datePart = new Date(session.date).toLocaleDateString('en-GB', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
    const metaParts = [datePart, classTypeLabel].filter(Boolean);

    // Get SessionSkills for this session
    const sessionSkillRecords = appState.sessionSkills.filter(ss => ss.sessionId === sessionId);

    // Get unique linked skills for the chips section
    const uniqueSkillIds = [...new Set(sessionSkillRecords.map(ss => ss.skillId))];

    // Render blocks from SessionSkill records
    const blocksHtml = sessionSkillRecords.length > 0
        ? sessionSkillRecords.map(ss => renderDetailBlockHtml(ss)).join('')
        : `<div class="session-detail-empty">No notes recorded for this session.</div>`;

    // Session-level notes block (if any)
    const sessionNotesHtml = session.notes ? `
        <div class="detail-block">
            <div class="detail-block-header">
                <span class="detail-block-topic">General</span>
            </div>
            <div class="detail-block-notes">${session.notes}</div>
        </div>
    ` : '';

    // Linked skills chips
    const skillChipsHtml = uniqueSkillIds.length > 0 ? `
        <div class="session-detail-section">
            <div class="session-detail-section-label">Linked skills</div>
            <div class="session-detail-skill-chips">
                ${uniqueSkillIds.map(skillId => {
                    const skill = DATA.skills.find(sk => sk.id === skillId);
                    return `<button class="session-skill-chip" onclick="alert('Skill detail coming soon')">
                        ${skill ? skill.french : skillId}
                    </button>`;
                }).join('')}
            </div>
        </div>
    ` : '';

    screen.innerHTML = `
        <div class="session-detail-view">
            <div class="session-detail-header">
                <button class="session-detail-back" onclick="closeSessionDetail(${sessionId}, '${returnTo}')">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="13 4 7 10 13 16"/>
                    </svg>
                    back
                </button>
                <button class="session-detail-edit" onclick="alert('Edit coming soon')">edit</button>
            </div>

            <div class="session-detail-hero">
                <h1 class="session-detail-title">${sessionTitle}</h1>
                <div class="session-detail-meta">${metaParts.join(' · ')}</div>
                ${location ? `<div class="session-detail-location">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                        <circle cx="6" cy="5" r="2"/><path d="M6 1a4 4 0 0 1 4 4c0 3-4 7-4 7S2 8 2 5a4 4 0 0 1 4-4z"/>
                    </svg>
                    ${location}
                </div>` : ''}
            </div>

            <div class="session-detail-section">
                <div class="session-detail-section-label">Notes &amp; corrections</div>
                <div class="session-detail-blocks">
                    ${sessionNotesHtml}
                    ${blocksHtml}
                </div>
            </div>

            ${skillChipsHtml}

            <div style="height: 120px;"></div>
        </div>
    `;

    showScreen(`session-detail-${sessionId}`);
}

function closeSessionDetail(sessionId, returnTo) {
    // Navigate back to wherever we came from
    if (returnTo === 'profile') {
        showScreen('profile');
        document.querySelector('[data-nav="profile"]')?.classList.add('active');
        appState.currentNav = 'profile';
    } else if (returnTo) {
        navigateTo(returnTo.replace('-screen', ''));
    } else {
        navigateTo('profile');
    }
}

function renderDetailBlockHtml(sessionSkill) {
    const skill = DATA.skills.find(s => s.id === sessionSkill.skillId);
    const topicLabel = skill ? skill.french : sessionSkill.skillId;

    // Resolve corrections from the collection
    const corrections = (sessionSkill.correctionIds || [])
        .map(id => appState.corrections.find(c => c.id === id))
        .filter(Boolean);

    const hasContent = sessionSkill.blockTitle || sessionSkill.notes || corrections.length > 0;
    if (!hasContent) return '';

    const correctionsHtml = corrections.map(c => `
        <div class="detail-block-corrections">
            <span class="detail-block-corrections-label">correction${c.isRecurring ? ' · recurring' : ''}</span>
            ${c.text}
        </div>
    `).join('');

    return `
        <div class="detail-block ${sessionSkill.highlight ? 'detail-block-highlighted' : ''}">
            <div class="detail-block-header">
                <span class="detail-block-topic">${topicLabel}</span>
                <button class="detail-block-skill-link" onclick="alert('Skill detail coming soon')">learn more →</button>
                ${sessionSkill.highlight ? '<span class="detail-block-star">★</span>' : ''}
            </div>
            ${sessionSkill.blockTitle ? `<div class="detail-block-title">${sessionSkill.blockTitle}</div>` : ''}
            ${sessionSkill.notes     ? `<div class="detail-block-notes">${sessionSkill.notes}</div>`     : ''}
            ${correctionsHtml}
        </div>
    `;
}


/* ═══════════════════════════════════════════════════════════════
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
                    ${skill.flagged ? '🚩' : '⚐'}
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
function addGoal() { alert('Coming soon'); }
function addProgress() { alert('Coming soon'); }


/* ═══════════════════════════════════════════════════════════════
   8. INITIALISATION
   ═══════════════════════════════════════════════════════════════ */

// Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('SW registered:', reg.scope))
            .catch(err => console.log('SW registration failed:', err));
    });
}
