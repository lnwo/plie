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
   1. DATA MODELS
   All static data and the central app state.
   ═══════════════════════════════════════════════════════════════ */

const DATA = {
    skills: [
        { id: 'plie',           french: 'Plié',           phonetic: 'plee-AY',          english: 'Bend',              difficulty: 'beginner',     category: 'Barre Work',   dimensionId: 'barre',   aliases: ['plie', 'bend', 'demi-plie', 'grand plie']      },
        { id: 'tendu',          french: 'Tendu',          phonetic: 'tahn-DEW',          english: 'Stretched',         difficulty: 'beginner',     category: 'Barre Work',   dimensionId: 'barre',   aliases: ['tendu', 'battement tendu']                     },
        { id: 'degage',         french: 'Dégagé',         phonetic: 'day-ga-ZHAY',       english: 'Disengaged',        difficulty: 'beginner',     category: 'Barre Work',   dimensionId: 'barre',   aliases: ['degage', 'brushing', 'battement degage']       },
        { id: 'rond-de-jambe',  french: 'Rond de jambe',  phonetic: 'rohn duh ZHAHMB',   english: 'Circle of the leg', difficulty: 'beginner',     category: 'Barre Work',   dimensionId: 'barre',   aliases: ['rond de jambe', 'circle', 'hip circle']        },
        { id: 'frappe',         french: 'Frappé',         phonetic: 'fra-PAY',           english: 'Struck',            difficulty: 'improver',     category: 'Barre Work',   dimensionId: 'barre',   aliases: ['frappe', 'strike', 'battement frappe']         },
        { id: 'fondu',          french: 'Fondu',          phonetic: 'fohn-DEW',          english: 'Melted',            difficulty: 'improver',     category: 'Barre Work',   dimensionId: 'barre',   aliases: ['fondu', 'melt', 'battement fondu']             },
        { id: 'developpe',      french: 'Développé',      phonetic: 'dayv-law-PAY',      english: 'Developed',         difficulty: 'improver',     category: 'Centre Work',  dimensionId: 'centre',  aliases: ['developpe', 'unfold', 'unfolding']             },
        { id: 'grand-battement',french: 'Grand battement',phonetic: 'grahn bat-MAHN',    english: 'Large beating',     difficulty: 'improver',     category: 'Barre Work',   dimensionId: 'barre',   aliases: ['grand battement', 'high kick', 'battement']   },
        { id: 'pirouette',      french: 'Pirouette',      phonetic: 'peer-oo-WET',       english: 'Whirl',             difficulty: 'intermediate', category: 'Turns',        dimensionId: 'turns',   aliases: ['pirouette', 'turn', 'spin', 'rotation']       },
        { id: 'arabesque',      french: 'Arabesque',      phonetic: 'a-ra-BESK',         english: 'Arabian',           difficulty: 'intermediate', category: 'Centre Work',  dimensionId: 'centre',  aliases: ['arabesque', 'balance', 'leg extension']       },
        { id: 'attitude',       french: 'Attitude',       phonetic: 'a-tee-TEWD',        english: 'Attitude',          difficulty: 'intermediate', category: 'Centre Work',  dimensionId: 'centre',  aliases: ['attitude', 'bent leg arabesque']               },
        { id: 'pas-de-bourree', french: 'Pas de bourrée', phonetic: 'pah duh boo-RAY',   english: 'Step of bourrée',   difficulty: 'intermediate', category: 'Centre Work',  dimensionId: 'centre',  aliases: ['pas de bourree', 'pas de bourée', 'bourree']  },
        { id: 'fouette',        french: 'Fouetté',        phonetic: 'fweh-TAY',          english: 'Whipped',           difficulty: 'advanced',     category: 'Turns',        dimensionId: 'turns',   aliases: ['fouette', 'whip', 'fouette turns', 'fouettés'] },
        { id: 'grand-jete',     french: 'Grand jeté',     phonetic: 'grahn zhuh-TAY',    english: 'Large throw',       difficulty: 'advanced',     category: 'Jumps',        dimensionId: 'allegro', aliases: ['grand jete', 'split jump', 'leap']            },
        { id: 'manege',         french: 'Manège',         phonetic: 'ma-NEZH',           english: 'Riding school',     difficulty: 'advanced',     category: 'Centre Work',  dimensionId: 'centre',  aliases: ['manege', 'travelling turns', 'en manege']     },
    ],

    folders: {
        barre: {
            icon: 'cat-barre',
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
            icon: 'learn-footwork',
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
            icon: 'folder-ballets',
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
                { icon: "persona-natural", label: "Born to dance", description: "Dancing since before I can remember" },
                { icon: "persona-lifelong", label: "Lifelong dancer", description: "Training consistently since childhood" },
                { icon: "persona-new", label: "Just starting out", description: "Less than a year of ballet" },
                { icon: "persona-finding", label: "Finding my feet", description: "1–3 years of training" },
                { icon: "persona-returning", label: "Coming back", description: "Strong foundation, getting back to it" },
                { icon: "persona-break", label: "After a break", description: "Returning after some time away" }
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
            question: "In your most recent classes, how comfortable have you felt working in the centre?",
            subtext: "Think about how it feels away from the barre — not just what you can do, but how settled and musical you feel",
            type: "multiple-choice",
            options: [
                "I haven't done centre work yet, or I avoid it",
                "I can get through it but I feel unsteady and rely on watching others",
                "I feel okay in centre — I can follow combinations but lose confidence in harder moments",
                "I feel comfortable most of the time and can hold my own in turns and adagio",
                "I feel confident and musical in centre — I can focus on quality, not just survival"
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
        { id: 'barre', icon: 'cat-barre', name: 'Barre work', count: '15 skills', onclick: "openFolder('barre')" },
        { id: 'centre', icon: 'cat-centre', name: 'Centre work', count: '12 skills', onclick: "alert('Coming soon')" },
        { id: 'turns', icon: 'cat-turns', name: 'Turns', count: '8 skills', onclick: "alert('Coming soon')" },
        { id: 'allegro', icon: 'cat-allegro', name: 'Allegro', count: '14 skills', onclick: "alert('Coming soon')" },
        { id: 'pointe', icon: 'cat-pointe', name: 'Pointe work', count: '10 skills', onclick: "alert('Coming soon')" },
        { id: 'flexibility', icon: 'cat-flexibility', name: 'Flexibility & strength', count: '12 exercises', onclick: "alert('Coming soon')" }
    ],

    assessments: [
        { icon: 'learn-quiz', name: 'Placement quiz', desc: 'Find your overall level across 6 dimensions', action: 'startPlacementQuiz()', badge: '14 questions' },
        { icon: 'learn-footwork', name: 'Footwork & articulation', desc: 'Pointe work, relevé strength, and foot flexibility', action: "openFolder('footwork')", badge: '5 exercises' },
        { icon: 'learn-splits', name: 'Splits & extensions', desc: 'Splits, leg height, and range of motion', action: "alert('Coming soon')", badge: '6 exercises' },
        { icon: 'learn-core', name: 'Core & stamina', desc: 'Endurance, balance, and core stability', action: "alert('Coming soon')", badge: '10 exercises' },
        { icon: 'learn-pirouette', name: 'Pirouettes & rotation', desc: 'Turning technique and spotting', action: "alert('Coming soon')", badge: '7 exercises' }
    ],

    learnSections: [
        { icon: 'cat-barre',        name: 'Skill library',     desc: 'Every ballet movement — browse, search, and learn',       count: '80+ skills',   action: "showLearnSkillLibrary()" },
        { icon: 'learn-quiz',       name: 'Glossary',          desc: 'Key terms, musicality concepts, and ballet vocabulary',    count: 'coming soon',  action: "showGlossary()" },
        { icon: 'persona-returning',name: 'Famous ballets',    desc: 'Iconic productions and the dancers who defined them',      count: '18 ballets',   action: "openFolder('ballets')" },
        { icon: 'learn-pirouette',  name: 'Composers',         desc: 'From Tchaikovsky to Prokofiev and beyond',                 count: '12 composers', action: "alert('Coming soon')" },
        { icon: 'cat-centre',       name: 'Variations',        desc: 'Classical variations to study and learn',                  count: '25 variations',action: "alert('Coming soon')" },
        { icon: 'profile',          name: 'Legendary dancers', desc: 'From Plisetskaya to Acosta — the greats',                 count: '15 dancers',   action: "alert('Coming soon')" }
    ],

    profileCapabilities: [
        {
            id: 'log-session',
            label: 'AFTER CLASS',
            title: 'Log a session',
            description: 'Record what you worked on and save corrections while they\'re fresh.',
            doneMessage: 'You\'ve logged your first session!',
            action: "openSessionLogger()",
            isDone: () => appState.sessions.length > 0,
        },
        {
            id: 'save-correction',
            label: 'FEEDBACK',
            title: 'Save a correction',
            description: 'Write down what your teacher said — log a session and add a correction block.',
            doneMessage: 'You\'ve saved your first correction!',
            action: "openSessionLogger()",
            isDone: () => appState.corrections.filter(c => c.source === 'teacher').length > 0,
        },
        {
            id: 'set-goal',
            label: 'PLANNING',
            title: 'Set a goal',
            description: 'Give your practice a target. Goals can link to a skill or dimension.',
            doneMessage: 'You\'ve set your first goal!',
            action: "openGoalCreator()",
            isDone: () => appState.goals.length > 0,
        },
        {
            id: 'track-skill',
            label: 'SKILLS',
            title: 'Track a skill',
            description: 'Flag a skill as in focus from The Barre to start building your personal record.',
            doneMessage: 'You\'re tracking your first skill!',
            action: "navigateTo('barre')",
            isDone: () => appState.skills.some(s => s.flagged),
        },
        {
            id: 'study-repertoire',
            label: 'LEARN',
            title: 'Study repertoire',
            description: 'Explore the skill library, knowledge pages, and repertoire in Learn.',
            doneMessage: 'You\'ve explored the library!',
            action: "navigateTo('learn')",
            isDone: () => !!storage.load('hasVisitedLearn'),
        },
    ],
};

/* ═══════════════════════════════════════════════════════════════
   STORAGE ADAPTER
   UI never touches storage directly — always goes through here.
   Stage 3: replace each no-op with the localStorage implementation
   shown in the comments.
   ═══════════════════════════════════════════════════════════════ */

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
    appState.currentQuestion = 0;
    showScreen('assessment');
    renderQuestion();
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
   
    const startBtn = document.querySelector('.onboarding-cta .btn-large');
    if (startBtn) {
        startBtn.addEventListener('click', (e) => {
            e.preventDefault();
            nextOnboarding();
        });
    }

    const skipBtn = document.querySelector('.onboarding-cta .onboarding-skip button');
    if (skipBtn) {
        skipBtn.addEventListener('click', (e) => {
            e.preventDefault();
            skipOnboarding();
        });
    }
   
     // Attach onboarding CTA listeners
     const startBtn = document.querySelector('.onboarding-cta .btn-large');
     if (startBtn) startBtn.addEventListener('click', (e) => {
       e.preventDefault();
       nextOnboarding();
     });
   
     const skipBtn = document.querySelector('.onboarding-cta .onboarding-skip button');
     if (skipBtn) skipBtn.addEventListener('click', (e) => {
       e.preventDefault();
       skipOnboarding();
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
   5. ASSESSMENT SYSTEM
   Quiz rendering, scoring, dimension calculation, results.
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
    const todayDow = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][new Date().getDay()];

    // Day-of-week session prediction
    const predictedTemplate = appState.sessionTemplates.find(t =>
        t.days && t.days.includes(todayDow)
    ) || null;

    appState.currentSession = {
        id:              Date.now(),
        date:            today,
        templateId:      predictedTemplate?.id || null,
        sessionName:     predictedTemplate?.name || null,
        sessionLocation: predictedTemplate?.location || null,
        classType:       predictedTemplate?.classType || null,
        blocks:          [],
        _predicted:      predictedTemplate ? true : false,
    };

    // Auto-create first block and focus its title
    addBlock(true);

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
        id:             Date.now(),
        topicId:        'general',
        title:          '',
        notes:          '',
        notesOpen:      false,
        mode:           'correction',
        corrections:    [],
        praiseText:     '',
        reflectionText: '',
    };
    appState.currentSession.blocks.push(block);
    sortBlocks();
    renderBlocksOnly();
    if (focusTitle) {
        requestAnimationFrame(() => {
            const blocks = document.querySelectorAll('.session-block-title-input');
            const last = blocks[blocks.length - 1];
            last?.focus();
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
    const mode = block.mode || 'correction';

    // Corrections bullet list (mode === 'correction')
    const corrList = Array.isArray(block.corrections) ? block.corrections : [];
    const corrBulletsHtml = corrList.map((text, ci) => `
        <div class="correction-bullet" data-block="${block.id}" data-ci="${ci}">
            <span class="correction-bullet-dash">—</span>
            <div class="correction-bullet-input-wrapper">
                <div class="correction-bullet-input"
                     contenteditable="true"
                     data-block="${block.id}"
                     data-ci="${ci}"
                     oninput="updateCorrectionBullet(${block.id}, ${ci}, this.innerText)"
                     onkeydown="handleCorrectionBulletKey(event, ${block.id}, ${ci})"
                     >${text}</div>
            </div>
            <button class="correction-bullet-delete"
                    onmousedown="deleteCorrectionBullet(${block.id}, ${ci})"
                    aria-label="Delete">×</button>
        </div>
    `).join('');

    const corrFieldHtml = `
        <div class="correction-bullets-container" id="correction-bullets-${block.id}">
            ${corrBulletsHtml}
            <div class="correction-bullet correction-bullet-new" data-block="${block.id}">
                <span class="correction-bullet-dash">—</span>
                <div class="correction-bullet-input-wrapper">
                    <div class="correction-bullet-input correction-bullet-placeholder"
                         contenteditable="true"
                         data-block="${block.id}"
                         data-ci="${corrList.length}"
                         oninput="handleNewCorrectionBulletInput(event, ${block.id})"
                         onkeydown="handleCorrectionBulletKey(event, ${block.id}, ${corrList.length})"
                         ></div>
                </div>
            </div>
        </div>
        <p class="correction-bullets-hint">Enter to add · Shift+Enter for new line</p>
    `;

    // Reflection field (mode === 'reflection')
    const reflectionHtml = `
        <textarea class="session-block-textarea session-block-capped"
                  placeholder="Note a reflection…"
                  oninput="updateBlockField(${block.id}, 'reflectionText', this.value); autoResizeCapped(this);"
                  >${block.reflectionText || ''}</textarea>
    `;

    // Notes section (collapsible) — wrapped in .block-notes-area for surgical updates
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

    // Praise content — free text for what was praised
    const praiseHtml = `
        <textarea class="session-block-textarea session-block-capped"
                  placeholder="What were you praised for? e.g. your arabesque line, timing…"
                  oninput="updateBlockField(${block.id}, 'praiseText', this.value); autoResizeCapped(this);"
                  >${block.praiseText || ''}</textarea>
    `;

    // Mode toggle
    const modeToggleHtml = `
        <div class="block-mode-toggle">
            <button class="block-mode-btn ${mode === 'correction' ? 'active' : ''}"
                    onmousedown="setBlockMode(${block.id}, 'correction')">Correction</button>
            <button class="block-mode-btn ${mode === 'praise' ? 'active' : ''}"
                    onmousedown="setBlockMode(${block.id}, 'praise')">Praise</button>
            <button class="block-mode-btn ${mode === 'reflection' ? 'active' : ''}"
                    onmousedown="setBlockMode(${block.id}, 'reflection')">Reflection</button>
        </div>
    `;

    const modeClass = mode === 'praise' ? 'block-mode-praise'
                    : mode === 'reflection' ? 'block-mode-reflection'
                    : '';

    return `
        <div class="swipe-row" data-block-id="${block.id}">
            <div class="swipe-action-left swipe-action-remove">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="3" x2="13" y2="13"/><line x1="13" y1="3" x2="3" y2="13"/></svg>
                remove
            </div>
            <div class="swipe-content">
                <div class="session-block ${modeClass}" id="block-${block.id}">

                    <div class="session-block-header">
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
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                                <line x1="3" y1="3" x2="11" y2="11"/>
                                <line x1="11" y1="3" x2="3" y2="11"/>
                            </svg>
                        </button>
                    </div>

                    <div class="session-block-fields">
                        <textarea class="session-block-title-input"
                                  placeholder="${isGeneral ? 'Topic or title…' : 'Add a title…'}"
                                  rows="1"
                                  oninput="updateBlockField(${block.id}, 'title', this.value); autoResizeCapped(this); checkBlockTitleForSkills(${block.id}, this.value);"
                                  onfocus="this.placeholder=''"
                                  onblur="this.placeholder='${isGeneral ? 'Topic or title…' : 'Add a title…'}'"
                                  >${block.title}</textarea>

                        ${modeToggleHtml}

                        ${mode === 'correction' ? corrFieldHtml : ''}
                        ${mode === 'praise'     ? praiseHtml    : ''}
                        ${mode === 'reflection' ? reflectionHtml : ''}

                        ${notesHtml}
                    </div>
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

    const titleEl = blockEl.querySelector('.session-block-title-input');
    if (!titleEl) return;

    const row = document.createElement('div');
    row.className = 'skill-suggestion-chip-row';
    row.innerHTML = filtered.map(m => `
        <button class="skill-suggestion-chip"
                onmousedown="acceptSkillSuggestion(${blockId}, '${m.topicId}', '${m.label.replace(/'/g, "\'")}')">
            link to ${m.label} →
        </button>`).join('');

    titleEl.insertAdjacentElement('afterend', row);
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
                    aria-label="Delete">×</button>
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
    } else {
        appState.sessions.push(session);
    }
    storage.save('sessions', appState.sessions);

    // 2. Process each block into SessionSkill + Correction objects
    let skillCount = 0;
    let correctionCount = 0;
    // Track skills with corrections for post-save promotion prompt
    const skillsWithCorrections = [];

    s.blocks.forEach(block => {
        const isSkill = block.topicId?.startsWith('skill:');
        const skillId = isSkill ? block.topicId.replace('skill:', '') : null;
        const mode = block.mode || 'correction';

        // Each non-empty bullet in corrections[] → one Correction object
        const blockCorrectionIds = [];
        const corrBullets = Array.isArray(block.corrections)
            ? block.corrections
            : (block.corrections ? [block.corrections] : []); // backward compat with old string format

        if (mode === 'correction') {
            corrBullets.filter(t => t?.trim()).forEach(text => {
                const correction = {
                    id:          nextId(),
                    skillId:     skillId || null,
                    text:        text.trim(),
                    createdAt:   now,
                    sessionId:   session.id,
                    source:      'teacher',
                    type:        null,
                    isRecurring: false,
                };
                appState.corrections.push(correction);
                blockCorrectionIds.push(correction.id);
                correctionCount++;
            });
        }

        // Praise blocks — save praiseText as a skill note, write timeline entry
        if (mode === 'praise') {
            const praiseContent = block.praiseText?.trim() || block.title?.trim();
            if (praiseContent) {
                appState.skillNotes = appState.skillNotes || [];
                appState.skillNotes.push({
                    id:        nextId(),
                    skillId:   skillId || null,
                    text:      praiseContent,
                    date:      session.date,
                    createdAt: now,
                    isPraise:  true,
                });
                storage.save('skillNotes', appState.skillNotes);

                const skillRef = skillId ? DATA.skills.find(sk => sk.id === skillId) : null;
                appendTimelineEntry({
                    type:     'milestone',
                    objectId: session.id,
                    title:    praiseContent,
                    body:     skillRef ? skillRef.french : null,
                    date:     session.date,
                    isPraise: true,
                });
            }
        }

        // Reflection blocks — save as a skill note
        if (mode === 'reflection' && block.reflectionText?.trim()) {
            appState.skillNotes = appState.skillNotes || [];
            appState.skillNotes.push({
                id:           nextId(),
                skillId:      skillId || null,
                text:         block.reflectionText.trim(),
                date:         session.date,
                createdAt:    now,
                isReflection: true,
            });
            storage.save('skillNotes', appState.skillNotes);
        }

        // SessionSkill join object — only for skill-topic blocks
        if (isSkill && skillId) {
            const sessionSkill = {
                id:            nextId(),
                sessionId:     session.id,
                skillId:       skillId,
                notes:         block.notes?.trim()       || null,
                correctionIds: blockCorrectionIds,
                tracked:       true,
                blockTitle:    block.title?.trim()        || null,
                mode:          mode,
            };
            appState.sessionSkills.push(sessionSkill);
            skillCount++;

            if (blockCorrectionIds.length > 0) {
                skillsWithCorrections.push(skillId);
            }

            const skill = appState.skills.find(sk => sk.id === skillId);
            if (skill) skill.flagged = true;
        }
    });

    storage.save('corrections',   appState.corrections);
    storage.save('sessionSkills', appState.sessionSkills);
    persistSkillState();

    // 3. Write timeline entry (new sessions only — edits don't create duplicate entries)
    if (!s._isEdit) {
        const template = appState.sessionTemplates.find(t => t.id === s.templateId);
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
            <button class="post-save-dismiss" onclick="document.getElementById('post-save-prompt').remove()">×</button>
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
            <button class="post-save-dismiss" onclick="document.getElementById('reflection-prompt').remove()">×</button>
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
    const coreDims = { barre: dims.barre?.raw ?? null, centre: dims.centre?.raw ?? null, allegro: dims.allegro?.raw ?? null, turns: dims.turns?.raw ?? null, flexibility: dims.flexibility?.raw ?? null };

    // Rotate through weak dimensions on each visit — cycle index stored in appState
    const assessedDims = Object.entries(coreDims)
        .filter(([, v]) => v !== null)
        .sort((a, b) => a[1] - b[1]); // weakest first
    const weakDimKeys = assessedDims.map(([k]) => k);

    let contextText = '';
    if (weakDimKeys.length === 0) {
        contextText = 'Complete your assessment to get personalised focus areas';
    } else {
        // Rotate index each visit
        appState._barreVisitCount = (appState._barreVisitCount || 0) + 1;
        const rotateIdx = (appState._barreVisitCount - 1) % weakDimKeys.length;
        const focusDim = weakDimKeys[rotateIdx];
        const dimLabel = dimLabels[focusDim] || focusDim;
        const stageLabel = dims[focusDim]?.label || '';
        contextText = `${dimLabel} could use attention${stageLabel ? ` — ${stageLabel}` : ''}`;
    }

    let activeSkillsHtml = '';
    if (activeSkills.length > 0) {
        activeSkillsHtml = `
            <div style="padding: 0 var(--sp-lg); margin-bottom: var(--sp-xl);">
                <h2 class="section-title" style="padding: 0; margin-bottom: var(--sp-md);">Skills in focus</h2>
                <div style="display: flex; flex-direction: column; gap: var(--sp-sm);" id="active-skills-list">
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
                        <div class="swipe-row" data-skill-id="${skill.id}">
                            <div class="swipe-action-left swipe-action-remove">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="3" x2="13" y2="13"/><line x1="13" y1="3" x2="3" y2="13"/></svg>
                                remove
                            </div>
                            <div class="swipe-content">
                                <div class="active-skill-card" onclick="showSkillDetail('${skill.id}', 'barre-screen')">
                                    <div class="active-skill-info">
                                        <div class="active-skill-name">${skill.french}</div>
                                        <div class="active-skill-meta">${skill.category}${skill.flagged ? ' · In focus' : ''}</div>
                                        ${lastCorrection ? `<div class="active-skill-correction">"${lastCorrection.text}"</div>` : ''}
                                        ${lastSession ? `<div class="active-skill-date">Last worked: ${formatTimelineDate(lastSession.date)}</div>` : ''}
                                    </div>
                                    <svg class="active-skill-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 4 10 8 6 12"/></svg>
                                </div>
                            </div>
                        </div>`;
                    }).join('')}
                </div>
            </div>
        `;
    } else {
        activeSkillsHtml = `
            <div class="barre-empty-state">
                <div class="barre-empty-icon">${ICONS.get('cat-barre', 32)}</div>
                <div class="barre-empty-title">No active skills yet</div>
                <div class="barre-empty-text">Log a session to start tracking skills, or browse the categories below to add them manually.</div>
            </div>
        `;
    }

    screen.innerHTML = `
        <div class="profile-header"><h1>The Barre</h1></div>
        <div class="barre-context">
            <span class="barre-context-badge">${(appState.level || 'beginner').replace('-', ' ')}</span>
            <span class="barre-context-text">${contextText}</span>
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
                        <div class="skill-category-icon">${ICONS.get(cat.icon, 24)}</div>
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

    // Attach swipe-to-remove on active skill cards
    screen.querySelectorAll('.swipe-row[data-skill-id]').forEach(row => {
        attachSwipe(row, {
            onLeft: () => {
                const skillId = row.dataset.skillId;
                const skill = appState.skills.find(s => s.id === skillId);
                if (skill) {
                    skill.flagged  = false;
                    skill.tracked  = false;
                    persistSkillState();
                }
                // Re-render after animation completes
                setTimeout(() => showBarreScreen(), 320);
            }
        });
    });
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

function renderGoalsScreen() {
    const screen = document.getElementById('goals-screen');
    if (!screen) return;

    const goals = appState.goals || [];

    // Sort newest first within each group
    const sorted = [...goals].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

    // Group by category, then uncategorised last
    const categorised = {};
    const uncategorised = [];
    sorted.forEach(g => {
        if (g.completedAt) return;
        if (g.category) {
            if (!categorised[g.category]) categorised[g.category] = [];
            categorised[g.category].push(g);
        } else {
            uncategorised.push(g);
        }
    });

    const completedGoals = sorted.filter(g => g.completedAt);

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
        if (completedGoals.length) {
            const COMPLETED_PREVIEW = 2;
            const visibleCompleted = completedGoals.slice(0, COMPLETED_PREVIEW);
            const hiddenCount = completedGoals.length - COMPLETED_PREVIEW;
            goalsHtml += `
                <div class="goals-group-label goals-completed-label" style="margin-top: var(--sp-xl);">
                    Completed
                    <span class="goals-completed-count">${completedGoals.length}</span>
                </div>
                ${visibleCompleted.map(g => renderGoalCard(g, true)).join('')}
                ${hiddenCount > 0 ? `
                <div id="goals-completed-hidden" style="display:none;">
                    ${completedGoals.slice(COMPLETED_PREVIEW).map(g => renderGoalCard(g, true)).join('')}
                </div>
                <button class="goals-see-all-btn" onclick="
                    document.getElementById('goals-completed-hidden').style.display='block';
                    this.remove();">
                    see all ${completedGoals.length} completed
                </button>` : ''}`;
        }
    }

    screen.innerHTML = `
        <div class="profile-header">
            <h1>Goals</h1>
            <p style="color: var(--text-muted); font-size: var(--fs-body); margin-top: var(--sp-xs);">Track what you're working towards</p>
        </div>
        <div style="padding: 0 var(--sp-lg); margin-bottom: 120px;">
            ${goalsHtml}
            <button class="add-goal-btn" onclick="openGoalCreator()">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <line x1="7" y1="2" x2="7" y2="12"/><line x1="2" y1="7" x2="12" y2="7"/>
                </svg>
                set a goal
            </button>
        </div>
    `;

    // Attach swipes to goal cards
    screen.querySelectorAll('.swipe-row[data-goal-id]').forEach(row => {
        const goalId = Number(row.dataset.goalId);
        const isCompleted = !!(appState.goals.find(g => g.id === goalId)?.completedAt);
        attachSwipe(row, {
            onLeft: () => {
                if (!confirm('Delete this goal?')) return;
                appState.goals = appState.goals.filter(g => g.id !== goalId);
                storage.save('goals', appState.goals);
                setTimeout(() => renderGoalsScreen(), 320);
            },
            onRight: () => {
                if (isCompleted) {
                    reopenGoal(goalId);
                } else {
                    markGoalComplete(goalId);
                }
            }
        });
    });
}

function renderGoalGroup(category, goals) {
    return `
        ${category ? `<div class="goals-group-label">${category}</div>` : ''}
        ${goals.map(g => renderGoalCard(g, false)).join('')}
    `;
}

function renderGoalCard(goal, completed) {
    const skill = goal.skillId ? DATA.skills.find(s => s.id === goal.skillId) : null;
    const dimension = goal.dimensionId ? DIMENSION_OPTIONS.find(d => d.id === goal.dimensionId) : null;
    const milestones = goal.milestones || [];
    const doneMilestones = milestones.filter(m => m.done).length;
    const progress = milestones.length > 0 ? doneMilestones / milestones.length : null;

    const tagsHtml = [
        skill      ? `<span class="goal-tag goal-tag-skill">${skill.french}</span>`         : null,
        dimension  ? `<span class="goal-tag goal-tag-dim">${dimension.label}</span>`         : null,
        goal.dueDate ? `<span class="goal-tag">by ${formatTimelineDate(goal.dueDate)}</span>` : null,
    ].filter(Boolean).join('');

    const MILESTONE_CAP = 4;
    const milestonesHtml = milestones.length > 0 ? `
        <div class="goal-milestones ${milestones.length > MILESTONE_CAP ? 'goal-milestones-scrollable' : ''}">
            ${milestones.map((m, i) => `
                <div class="goal-milestone ${m.done ? 'done' : ''}"
                     onclick="toggleMilestone('${goal.id}', ${i})">
                    <div class="goal-milestone-check">
                        ${m.done ? `<svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="1.5 5 4 7.5 8.5 2.5"/></svg>` : ''}
                    </div>
                    <span class="goal-milestone-text">${m.text}</span>
                </div>
            `).join('')}
        </div>
        ${milestones.length > MILESTONE_CAP ? `<div class="goal-milestones-scroll-hint">${milestones.length} milestones · scroll to see all</div>` : ''}
    ` : '';

    const progressBarHtml = progress !== null ? `
        <div class="goal-progress-bar">
            <div class="goal-progress-fill" style="width: ${Math.round(progress * 100)}%"></div>
        </div>
        <div class="goal-progress-label">${doneMilestones} of ${milestones.length} milestones</div>
    ` : '';

    // Linked corrections
    const linkedCorrs = (goal.correctionIds || [])
        .map(id => appState.corrections.find(c => c.id === id))
        .filter(Boolean);
    const linkedCorrectionsHtml = linkedCorrs.length > 0 ? `
        <div class="goal-linked-corrections-display ${completed ? 'goal-corrections-complete' : ''}">
            ${linkedCorrs.map(c => `
                <div class="goal-linked-corr-row">
                    <span class="goal-linked-corr-dash">—</span>
                    <span class="goal-linked-corr-text">${c.text}</span>
                </div>`).join('')}
        </div>` : '';

    return `
        <div class="swipe-row" data-goal-id="${goal.id}">
            <div class="swipe-action-left swipe-action-remove">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="3" x2="13" y2="13"/><line x1="13" y1="3" x2="3" y2="13"/></svg>
                delete
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
                    ${completed ? `<div class="goal-card-complete-banner">✓ Completed ${formatTimelineDate(new Date(goal.completedAt).toISOString().split('T')[0])}</div>` : ''}
                    <div class="goal-card-title">${goal.title}</div>
                    ${goal.body ? `<div class="goal-card-body">${goal.body}</div>` : ''}
                    ${tagsHtml ? `<div class="goal-tags">${tagsHtml}</div>` : ''}
                    ${linkedCorrectionsHtml}
                    ${milestonesHtml}
                    ${progressBarHtml}
                    <div class="goal-card-footer">
                        <span class="goal-card-date">created ${formatTimelineDate(new Date(goal.createdAt).toISOString().split('T')[0])}</span>
                        <div style="display:flex;gap:var(--sp-sm);align-items:center;">
                            ${!completed ? `<button class="goal-edit-btn" onclick="openGoalEditor(${goal.id})">edit</button>` : ''}
                            ${!completed
                                ? `<span class="goal-swipe-hint">swipe to complete →</span>`
                                : `<span class="goal-swipe-hint">swipe to reopen →</span>`}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ── Goal creator overlay ──

function openGoalCreator() {
    appState._goalDraft = {
        title:         '',
        body:          '',
        dueDate:       '',
        skillId:       null,
        dimensionId:   null,
        category:      null,
        milestones:    [],
        correctionIds: [],
        _editId:       null,
    };

    let overlay = document.getElementById('goal-creator-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'goal-creator-overlay';
        overlay.className = 'session-overlay'; // reuse sheet styles
        document.body.appendChild(overlay);
    }

    renderGoalCreator();

    document.querySelector('.fab')?.classList.remove('visible');
    document.querySelector('.bottom-nav')?.classList.remove('visible');
    requestAnimationFrame(() => overlay.classList.add('open'));
}

function openGoalCreatorWithTitle(title) {
    openGoalCreator();
    // Pre-fill the title after the creator has rendered
    if (appState._goalDraft) {
        appState._goalDraft.title = title;
        // Update the rendered input directly so it's immediately visible
        requestAnimationFrame(() => {
            const titleInput = document.getElementById('goal-title-input');
            if (titleInput) titleInput.value = title;
        });
    }
}

function openGoalEditor(goalId) {
    const goal = appState.goals.find(g => g.id === Number(goalId));
    if (!goal) return;
    appState._goalDraft = {
        _editId:       goal.id,
        title:         goal.title || '',
        body:          goal.body  || '',
        dueDate:       goal.dueDate || '',
        skillId:       goal.skillId     || null,
        dimensionId:   goal.dimensionId || null,
        category:      goal.category    || null,
        correctionIds: [...(goal.correctionIds || [])],
        milestones:    goal.milestones.map(m => ({ ...m })),
    };

    let overlay = document.getElementById('goal-creator-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'goal-creator-overlay';
        overlay.className = 'session-overlay';
        document.body.appendChild(overlay);
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

    const skillOptions = appState.skills.map(s =>
        `<option value="${s.id}" ${d.skillId === s.id ? 'selected' : ''}>${s.french}</option>`
    ).join('');

    const dimensionOptions = DIMENSION_OPTIONS.map(dim =>
        `<option value="${dim.id}" ${d.dimensionId === dim.id ? 'selected' : ''}>${dim.label}</option>`
    ).join('');

    const milestonesHtml = d.milestones.map((m, i) => `
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

    overlay.innerHTML = `
        <div class="session-logger-sheet">
            <div class="session-sheet-handle"></div>

            <div class="session-logger-header">
                <div>
                    <div class="session-logger-eyebrow">${d._editId ? 'Edit goal' : 'New goal'}</div>
                    <h2 class="session-logger-title">${d._editId ? 'Update your goal' : 'Set a goal'}</h2>
                </div>
                <button class="session-close-btn" onclick="closeGoalCreator()">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                        <line x1="4" y1="4" x2="14" y2="14"/><line x1="14" y1="4" x2="4" y2="14"/>
                    </svg>
                </button>
            </div>

            <div class="session-logger-body">

                <div class="session-field">
                    <label class="session-field-label">Goal</label>
                    <textarea class="session-block-title-input" id="goal-title-input"
                              placeholder="What do you want to achieve?"
                              rows="1"
                              oninput="appState._goalDraft.title = this.value; autoResizeTextarea(this); searchGoalCorrections(this.value);"
                              style="font-size: var(--fs-h3);">${d.title}</textarea>
                    <textarea class="session-block-textarea" id="goal-body-input"
                              placeholder="Add more detail… (optional)"
                              rows="2"
                              oninput="appState._goalDraft.body = this.value; autoResizeTextarea(this);"
                              style="margin-top: var(--sp-sm);">${d.body}</textarea>
                    <!-- Correction search results -->
                    <div id="goal-correction-search-results"></div>
                </div>

                <!-- Linked corrections -->
                ${(d.correctionIds || []).length > 0 ? `
                <div class="session-field">
                    <label class="session-field-label">Linked corrections</label>
                    <div id="goal-linked-corrections">
                        ${renderLinkedCorrectionsHtml(d.correctionIds)}
                    </div>
                </div>` : '<div id="goal-linked-corrections-wrapper"></div>'}

                <div class="session-field">
                    <label class="session-field-label">Category <span class="session-field-optional">optional</span></label>
                    <div id="goal-category-field">
                        ${d.category
                            ? `<div class="goal-category-set">
                                   <span class="recurrence-chip selected">${d.category}</span>
                                   <button class="goal-category-clear" onmousedown="clearGoalCategory()">×</button>
                               </div>`
                            : `<button class="goal-category-add-btn" onmousedown="openGoalCategoryInput()">
                                   <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="6" y1="1" x2="6" y2="11"/><line x1="1" y1="6" x2="11" y2="6"/></svg>
                                   add category
                               </button>`}
                    </div>
                </div>

                <div class="session-field">
                    <label class="session-field-label">Link to a skill <span class="session-field-optional">optional</span></label>
                    <div class="session-select-wrapper">
                        <select id="goal-skill-select" class="session-select"
                                onchange="appState._goalDraft.skillId = this.value || null">
                            <option value="">— no skill —</option>
                            ${skillOptions}
                        </select>
                        <svg class="session-select-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="4 6 8 10 12 6"/>
                        </svg>
                    </div>
                </div>

                <div class="session-field">
                    <label class="session-field-label">Link to a dimension <span class="session-field-optional">optional</span></label>
                    <div class="session-select-wrapper">
                        <select class="session-select"
                                onchange="appState._goalDraft.dimensionId = this.value || null">
                            <option value="">— no dimension —</option>
                            ${dimensionOptions}
                        </select>
                        <svg class="session-select-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="4 6 8 10 12 6"/>
                        </svg>
                    </div>
                </div>

                <div class="session-field">
                    <label class="session-field-label">Due date <span class="session-field-optional">optional</span></label>
                    <input type="date" class="session-input"
                           value="${d.dueDate}"
                           onchange="appState._goalDraft.dueDate = this.value" />
                </div>

                <div class="session-field">
                    <label class="session-field-label">Milestones <span class="session-field-optional">optional</span></label>
                    <div id="goal-milestones-list">${milestonesHtml}</div>
                    <button class="add-block-btn" style="margin-top: var(--sp-sm);" onmousedown="addMilestoneDraft()">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                            <line x1="7" y1="2" x2="7" y2="12"/><line x1="2" y1="7" x2="12" y2="7"/>
                        </svg>
                        add milestone
                    </button>
                </div>

                <div style="height: var(--sp-3xl);"></div>
            </div>

            <div class="session-logger-footer">
                <button class="session-discard-btn" onclick="closeGoalCreator()">discard</button>
                <button class="btn-large session-save-btn" onclick="saveGoal()">save goal</button>
            </div>
        </div>
    `;
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
        id:            isEdit ? d._editId : Date.now(),
        title:         d.title.trim(),
        body:          d.body?.trim()  || null,
        createdAt:     existingGoal?.createdAt || Date.now(),
        dueDate:       d.dueDate       || null,
        skillId:       d.skillId       || null,
        dimensionId:   d.dimensionId   || null,
        category:      d.category      || null,
        correctionIds: d.correctionIds || [],
        milestones:    d.milestones.filter(m => m.text.trim()).map(m => ({
            id:   m.id || Date.now(),
            text: m.text.trim(),
            done: m.done || false,
        })),
        completedAt: existingGoal?.completedAt || null,
    };

    if (isEdit) {
        const idx = appState.goals.findIndex(g => g.id === d._editId);
        if (idx > -1) appState.goals[idx] = goal;
    } else {
        appState.goals.unshift(goal); // newest first
    }
    storage.save('goals', appState.goals);
    closeGoalCreator();

    if (appState.currentScreen === 'goals-screen') renderGoalsScreen();
    if (appState.currentScreen === 'profile') initProfile();

    // Refresh skill detail linked goals if we're on a skill detail screen
    if (appState.currentScreen?.startsWith('skill-detail-')) {
        const skillId = appState.currentScreen.replace('skill-detail-', '');
        // Re-render just the linked goals section
        const linkedSection = document.querySelector(`#skill-detail-${skillId} .skill-linked-goals`);
        if (linkedSection) {
            const linkedGoals = (appState.goals || []).filter(g => g.skillId === skillId && !g.completedAt);
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
    if (!goal || !goal.milestones[milestoneIndex]) return;
    const milestone = goal.milestones[milestoneIndex];
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
    goal.completedAt = null;
    storage.save('goals', appState.goals);
    if (appState.currentScreen === 'goals-screen') renderGoalsScreen();
    if (appState.currentScreen === 'profile') initProfile();
}

function deleteSession(sessionId, returnTo) {
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

    // Remove detail screen DOM
    document.getElementById(`session-detail-${sessionId}`)?.remove();

    closeSessionDetail(sessionId, returnTo);
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
                            <div class="skill-category-icon">${ICONS.get(s.icon, 24)}</div>
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

    // Dimension chart slot — hidden in new UI, kept for compat
    const dimEl = document.getElementById('profileDimensions');
    if (dimEl) dimEl.innerHTML = '';

    // Hero action card — context-aware based on recent activity
    const heroEl = document.getElementById('profileHeroCard');
    const persona = appState.answers?.persona;
    const today = new Date().toISOString().split('T')[0];
    const lastSession = appState.sessions.length
        ? appState.sessions.slice().sort((a,b) => (b.savedAt||0) - (a.savedAt||0))[0]
        : null;
    const loggedToday = lastSession?.date === today;
    const daysSinceLast = lastSession
        ? Math.floor((Date.now() - (lastSession.savedAt || 0)) / 86400000)
        : null;

    let heroLabel, heroTitle, heroDesc, heroAction, heroOnclick;
    heroOnclick = 'openSessionLogger()';

    if (loggedToday) {
        // Already logged today — surface a nudge toward goals or reflection
        const activeGoals = (appState.goals || []).filter(g => !g.completedAt);
        if (activeGoals.length > 0) {
            heroLabel = 'TODAY'; heroTitle = 'Session logged';
            heroDesc = `You have ${activeGoals.length} active goal${activeGoals.length > 1 ? 's' : ''} in progress.`;
            heroAction = 'view goals →';
            heroOnclick = "navigateTo('goals')";
        } else {
            heroLabel = 'TODAY'; heroTitle = 'Session logged';
            heroDesc = 'Add a goal to give your practice direction.';
            heroAction = 'add a goal →';
            heroOnclick = 'openGoalCreator()';
        }
    } else if (persona === 4 || persona === 5) {
        heroLabel = 'WELCOME BACK'; heroTitle = 'Log your first class back';
        heroDesc = 'Jot down what you worked on and how it felt.';
        heroAction = 'log a session →';
    } else if (!lastSession) {
        heroLabel = 'GET STARTED'; heroTitle = 'Log your first session';
        heroDesc = 'After class, jot down what you covered and any corrections your teacher gave you.';
        heroAction = 'log a session →';
    } else if (daysSinceLast !== null && daysSinceLast > 6) {
        heroLabel = 'AFTER CLASS'; heroTitle = 'Log your next session';
        heroDesc = `Last logged ${daysSinceLast} days ago — keep the record going.`;
        heroAction = 'log a session →';
    } else {
        heroLabel = 'AFTER CLASS'; heroTitle = 'Log a session';
        heroDesc = "Record corrections, praise, and what you worked on while it's fresh.";
        heroAction = 'log a session →';
    }

    heroEl.innerHTML = `
        <div class="profile-action-card hero profile-hero-compact" onclick="${heroOnclick}">
            <div class="profile-action-label">${heroLabel}</div>
            <div class="profile-action-title">${heroTitle}</div>
            <div class="profile-action-description">${heroDesc}</div>
            <div class="profile-action-arrow">${heroAction}</div>
        </div>
    `;

    // Goal card — show real goal if one exists, otherwise show suggestion
    const goalEl = document.getElementById('profileGoalCard');
    const activeGoals = (appState.goals || []).filter(g => !g.completedAt);

    if (activeGoals.length > 0) {
        const latest = activeGoals[activeGoals.length - 1];
        const milestones = latest.milestones || [];
        const done = milestones.filter(m => m.done).length;
        const progressText = milestones.length > 0
            ? `${done} of ${milestones.length} milestones`
            : null;
        goalEl.innerHTML = `
            <div class="profile-action-card" onclick="navigateTo('goals')">
                <div class="profile-action-label">ACTIVE GOAL</div>
                <div class="profile-action-title">${latest.title}</div>
                ${progressText ? `<div class="profile-action-description">${progressText}</div>` : ''}
                <div class="profile-action-arrow">view all goals →</div>
            </div>
        `;
    } else {
        // Keyword-based suggestion from assessment answers
        // (simple index matching — no AI)
        let suggestedGoal = 'Build a consistent practice routine';
        const quizGoals = appState.answers?.goals || [];
        if (quizGoals.includes(2)) suggestedGoal = 'Work towards pointe readiness';
        else if (quizGoals.includes(3)) suggestedGoal = 'Improve technique in my weakest areas';
        else if (quizGoals.includes(4)) suggestedGoal = 'Prepare for a performance';
        else if (quizGoals.includes(0)) suggestedGoal = 'Get back into a regular class routine';

        goalEl.innerHTML = `
            <div class="profile-action-card" onclick="openGoalCreatorWithTitle('${suggestedGoal.replace(/'/g, "\'")}')">
                <div class="profile-action-label">YOUR FIRST GOAL</div>
                <div class="profile-action-title">${suggestedGoal}</div>
                <div class="profile-action-description">Based on what you told us. Tap to set it, edit, or write your own.</div>
                <div class="profile-action-arrow">set this goal →</div>
            </div>
        `;
    }

    // Explore cards
    const exploreEl = document.getElementById('profileExploreCards');
    const exploreSection = document.getElementById('profileExploreSection');
    const caps = DATA.profileCapabilities;
    const allDone = caps.every(c => c.isDone());

    if (allDone) {
        if (exploreSection) exploreSection.style.display = 'none';
    } else {
        if (exploreSection) exploreSection.style.display = '';
    
        exploreEl.innerHTML = caps.map(cap => {
            const done = cap.isDone();
            return `
            <div class="scroll-card scroll-card-capability ${done ? 'scroll-card-done' : ''}"
                 onclick="${done ? '' : cap.action}"
                 style="flex: 0 0 200px; ${done ? 'cursor:default;' : ''}">
                <div class="scroll-card-capability-status">
                    ${done
                        ? `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--success)" stroke-width="2.5" stroke-linecap="round"><polyline points="2 7 5.5 10.5 12 4"/></svg>`
                        : `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="7" cy="7" r="5.5"/></svg>`
                    }
                </div>
                <div class="scroll-card-category">${cap.label}</div>
                <div class="scroll-card-title" style="font-size: var(--fs-body);">${done ? cap.doneMessage : cap.title}</div>
                <div class="scroll-card-description">${done ? '' : cap.description}</div>
            </div>`;
        }).join('');
    }

    // Timeline — merge stored entries with praise + reflection notes, sort by date desc
    const timelineEl = document.getElementById('timeline');
    if (timelineEl) {
        const firstEntryText = (level === 'not-assessed' || !appState.level)
            ? 'Joined plié'
            : `Completed placement quiz — ${(DATA.levelLabels[level] || 'BEGINNER').charAt(0) + (DATA.levelLabels[level] || 'BEGINNER').slice(1).toLowerCase()}`;

        // SVG icons per entry type
        const TIMELINE_ICONS = {
            session:    `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="2" y="2" width="10" height="10" rx="1.5"/><line x1="5" y1="5" x2="9" y2="5"/><line x1="5" y1="7.5" x2="9" y2="7.5"/><line x1="5" y1="10" x2="7" y2="10"/></svg>`,
            milestone:  `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><polygon points="7,1.5 8.8,5.2 13,5.7 10,8.6 10.7,12.8 7,10.8 3.3,12.8 4,8.6 1,5.7 5.2,5.2"/></svg>`,
            assessment: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><polyline points="2,10 5,6 8,8 12,3"/><line x1="2" y1="12" x2="12" y2="12"/></svg>`,
            reflection: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M2 3c0-.6.4-1 1-1h8c.6 0 1 .4 1 1v5c0 .6-.4 1-1 1H6l-3 2.5V9H3c-.6 0-1-.4-1-1V3z"/><line x1="4.5" y1="5.5" x2="9.5" y2="5.5"/></svg>`,
            praise:     `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><polygon points="7,1.5 8.8,5.2 13,5.7 10,8.6 10.7,12.8 7,10.8 3.3,12.8 4,8.6 1,5.7 5.2,5.2"/></svg>`,
            manual:     `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="7" cy="7" r="5"/><circle cx="7" cy="7" r="1.5" fill="currentColor" stroke="none"/></svg>`,
        };

        // Build unified entries: timeline + praise notes + reflection notes
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

        const allEntries = [
            ...(appState.timeline || []).map(e => ({ ...e, _noteEntry: false })),
            ...noteEntries,
        ].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

        // Date grouping helpers
        const now = new Date();
        const startOfToday    = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const startOfWeek     = new Date(startOfToday); startOfWeek.setDate(startOfToday.getDate() - startOfToday.getDay());
        const startOfMonth    = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

        function getGroup(dateStr) {
            const d = new Date(dateStr);
            if (d >= startOfToday)     return 'Today';
            if (d >= startOfWeek)      return 'This week';
            if (d >= startOfMonth)     return 'This month';
            if (d >= startOfLastMonth) return 'Last month';
            return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
        }

        // Group entries, preserving order
        const groups = [];
        let currentGroup = null;
        allEntries.forEach(entry => {
            const g = getGroup(entry.date || new Date(entry.createdAt || 0).toISOString().split('T')[0]);
            if (g !== currentGroup) {
                currentGroup = g;
                groups.push({ label: g, entries: [] });
            }
            groups[groups.length - 1].entries.push(entry);
        });

        function renderTimelineEntry(entry) {
            if (entry._noteEntry) {
                const skillRef = entry.skillId ? DATA.skills.find(s => s.id === entry.skillId) : null;
                const isReflection = entry._type === 'reflection';
                const typeLabel = isReflection ? 'Reflection' : 'Praise ★';
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
            const isTappable = entry.type === 'session' && entry.objectId;
            const typeKey    = isPraise ? 'praise' : (entry.type || 'manual');
            const typeLabels = {
                session:    'Session',
                milestone:  'Milestone',
                assessment: 'Assessment',
                praise:     'Praise ★',
                manual:     '',
            };
            const typeLabel = typeLabels[typeKey] || '';
            return `
            <div class="timeline-item timeline-item-${typeKey} ${isTappable ? 'timeline-item-tappable' : ''}"
                 ${isTappable ? `onclick="showSessionDetail(${entry.objectId})"` : ''}>
                <div class="timeline-content">
                    ${typeLabel ? `<span class="timeline-type-label">${typeLabel}</span>` : ''}
                    <div class="timeline-title ${isPraise ? 'timeline-praise-text' : ''}">${entry.title}</div>
                    ${entry.body ? `<div class="timeline-subtitle">${entry.body}</div>` : ''}
                    ${isTappable ? `<div class="timeline-tap-hint">tap to review →</div>` : ''}
                </div>
            </div>`;
        }

        const groupsHtml = groups.map(g => `
            <div class="timeline-group">
                <div class="timeline-group-label" id="tg-${g.label.replace(/\s/g,'-').toLowerCase()}">${g.label}</div>
                ${g.entries.map(renderTimelineEntry).join('')}
            </div>
        `).join('');

        timelineEl.innerHTML = `
            ${groupsHtml}
            <div class="timeline-group">
                <div class="timeline-item">
                    <div class="timeline-content">
                        <div class="timeline-title">${firstEntryText}</div>
                    </div>
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
                    return `<button class="session-skill-chip" onclick="showSkillDetail('${skillId}', 'session-detail-${sessionId}')">
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
                <div style="display:flex;gap:var(--sp-sm);">
                    <button class="session-detail-edit" onclick="openSessionEditor(${sessionId})">edit</button>
                    <button class="session-detail-edit" style="color:var(--error);border-color:var(--coral-soft);"
                            onclick="deleteSession(${sessionId}, '${returnTo}')">delete</button>
                </div>
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
    const corrections = (sessionSkill.correctionIds || [])
        .map(id => appState.corrections.find(c => c.id === id))
        .filter(Boolean);
    const mode = sessionSkill.mode || 'correction';
    const isPraise = mode === 'praise' || corrections.some(c => c.type === 'praise');
    const hasContent = sessionSkill.blockTitle || sessionSkill.notes || corrections.length > 0;
    if (!hasContent) return '';

    const correctionsHtml = corrections.length > 0 ? `
        <div class="detail-block-corrections">
            <span class="detail-block-corrections-label">
                ${isPraise ? '★ praise' : `correction${corrections.length > 1 ? 's' : ''}`}
            </span>
            <ul class="detail-block-correction-list">
                ${corrections.map(c => `
                    <li class="${c.isRecurring ? 'is-recurring' : ''}">
                        ${c.text}
                        ${c.isRecurring ? '<span class="correction-recurring-badge">recurring</span>' : ''}
                    </li>
                `).join('')}
            </ul>
        </div>
    ` : '';

    return `
        <div class="detail-block ${isPraise ? 'detail-block-praise' : ''} ${mode === 'reflection' ? 'detail-block-reflection' : ''}">
            <div class="detail-block-header">
                <span class="detail-block-topic">${topicLabel}</span>
                ${skill ? `<button class="detail-block-skill-link" onclick="showSkillDetail('${sessionSkill.skillId}', appState.currentScreen)">view skill →</button>` : ''}
                ${isPraise ? '<span class="detail-block-praise-badge">★ praise</span>' : ''}
            </div>
            ${sessionSkill.blockTitle ? `<div class="detail-block-title">${sessionSkill.blockTitle}</div>` : ''}
            ${sessionSkill.notes     ? `<div class="detail-block-notes">${sessionSkill.notes}</div>`     : ''}
            ${correctionsHtml}
        </div>
    `;
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
    let screen = document.getElementById(screenId);
    if (!screen) {
        screen = document.createElement('div');
        screen.className = 'screen skill-detail-screen';
        screen.id = screenId;
        document.querySelector('.app-container').appendChild(screen);
    }

    // Store returnTo so saveSkillNote can use it after re-render
    appState._skillDetailReturnTo = returnTo;

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
                ${visibleCorrections.map(c => renderSkillCorrectionRow(c)).join('')}
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
                    <div class="skill-note-text">${n.text}</div>
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
                <button class="session-detail-back" onclick="closeSkillDetail('${skillId}', '${returnTo}')">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="13 4 7 10 13 16"/>
                    </svg>
                    back
                </button>
                <div class="skill-detail-header-collapsed" id="skill-detail-collapsed-${skillId}">
                    <span class="skill-detail-collapsed-name">${refSkill.french}</span>
                    <span class="difficulty-badge difficulty-${refSkill.difficulty}">${refSkill.difficulty}</span>
                    ${lastSession ? `<span class="skill-detail-collapsed-date">${formatTimelineDate(lastSession.date)}</span>` : ''}
                </div>
                <button class="skill-focus-btn ${isFlagged ? 'active' : ''}" id="skill-focus-btn-${skillId}"
                        onclick="toggleSkillFocus('${skillId}')">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="7" cy="7" r="5"/><circle cx="7" cy="7" r="2"/></svg>
                </button>
            </div>

            <!-- Hero — scrolls away, triggers collapsed header -->
            <div class="skill-detail-hero" id="skill-hero-${skillId}">
                <div class="skill-detail-category">${refSkill.category}</div>
                <h1 class="skill-detail-title">${refSkill.french}</h1>
                <div class="skill-detail-phonetic">${refSkill.phonetic}</div>
                <div class="skill-detail-english">${refSkill.english}</div>
                <div class="skill-detail-meta-row">
                    <span class="difficulty-badge difficulty-${refSkill.difficulty}">${refSkill.difficulty}</span>
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

function renderSkillCorrectionRow(correction) {
    const session = correction.sessionId
        ? appState.sessions.find(s => s.id === correction.sessionId)
        : null;
    const sessionLink = session
        ? `<button class="skill-correction-source" onmousedown="showSessionDetail(${correction.sessionId})">
               ${session.sessionName || 'Session'} →
           </button>`
        : '';
    return `
        <div class="skill-correction-row ${correction.isRecurring ? 'is-recurring' : ''}">
            <div class="skill-correction-meta">
                <span class="skill-correction-date">${formatTimelineDate(correction.createdAt ? new Date(correction.createdAt).toISOString().split('T')[0] : '')}</span>
                ${correction.isRecurring ? `<span class="skill-correction-recurring">recurring</span>` : ''}
            </div>
            <div class="skill-correction-text">${correction.text}</div>
            ${sessionLink}
        </div>
    `;
}

function expandSkillCorrections(skillId) {
    const list = document.getElementById('skill-corrections-list');
    const btn = document.getElementById('skill-see-more');
    if (!list) return;

    const allCorrections = appState.corrections
        .filter(c => c.skillId === skillId)
        .sort((a, b) => b.createdAt - a.createdAt);

    list.innerHTML = allCorrections.map(c => renderSkillCorrectionRow(c)).join('');
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
            <div class="skill-note-date">${formatTimelineDate(n.date)}</div>
            <div class="skill-note-text">${n.text}</div>
        </div>
    `).join('');
    // Remove the see more button
    list.nextElementSibling?.remove();
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
        <div id="skill-corr-list">${filtered.slice(0, PREVIEW).map(c => renderSkillCorrectionRow(c)).join('')}</div>
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
    if (list) list.innerHTML = filtered.map(c => renderSkillCorrectionRow(c)).join('');
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
                    <div class="skill-note-text">${n.text}</div>
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
}

function toggleSkillFocus(skillId) {
    const skill = appState.skills.find(s => s.id === skillId);
    if (!skill) return;
    skill.flagged = !skill.flagged;
    persistSkillState();

    // Update the focus button in place
    const btn = document.getElementById(`skill-focus-btn-${skillId}`) || document.querySelector('.skill-focus-btn');
    if (btn) {
        btn.className = `skill-focus-btn ${skill.flagged ? 'active' : ''}`;
    }

    // If The Barre is the current screen, refresh it
    if (document.getElementById('barre-screen')?.classList.contains('active')) {
        showBarreScreen();
    }
}

function openGoalCreatorForSkill(skillId) {
    openGoalCreator();
    // _goalDraft is set by openGoalCreator — update skillId immediately
    if (appState._goalDraft) appState._goalDraft.skillId = skillId;
    // Also update the select once DOM renders
    setTimeout(() => {
        const select = document.getElementById('goal-skill-select');
        if (select) select.value = skillId || '';
    }, 50);
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
    const screenId = `skill-detail-${skillId}`;
    if (returnTo && returnTo !== screenId) {
        if (returnTo === 'profile') {
            showScreen('profile');
            document.querySelector('[data-nav="profile"]')?.classList.add('active');
            appState.currentNav = 'profile';
        } else if (returnTo.endsWith('-screen') || returnTo.startsWith('session-detail-') || returnTo.startsWith('skill-detail-')) {
            showScreen(returnTo);
        } else {
            navigateTo(returnTo);
        }
    } else {
        navigateTo('barre');
    }
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
    renderSkillLibrary('', 'all');
    showScreen('skill-library-screen');
}

function showLearnSkillLibrary() {
    let screen = document.getElementById('skill-library-screen');
    if (!screen) {
        screen = document.createElement('div');
        screen.className = 'screen skill-library-screen';
        screen.id = 'skill-library-screen';
        document.querySelector('.app-container').appendChild(screen);
    }
    // Build the shell once — search input is never destroyed after this
    screen.innerHTML = `
        <div class="skill-library-view">
            <div class="skill-detail-header">
                <button class="session-detail-back" onclick="navigateTo('learn')">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="13 4 7 10 13 16"/>
                    </svg>
                    learn
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

function setSkillLibTab(btn, tab) {
    _skillLibTab = tab;
    document.querySelectorAll('.skill-lib-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateSkillLibResults();
}

function updateSkillLibResults() {
    const input = document.getElementById('skill-lib-search-input');
    const body  = document.getElementById('skill-lib-body');
    const clearBtn = document.getElementById('skill-lib-clear');
    if (!body) return;

    const query = input?.value || '';
    const q = normaliseStr(query.trim());

    if (clearBtn) clearBtn.style.display = q ? 'block' : 'none';

    const userSkills = appState.skills;
    let filtered = DATA.skills.filter(ref => {
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
                <div class="skill-lib-card-name">${displayName}</div>
                ${q && displayEnglish !== ref.english ? `<div class="skill-lib-card-english">${displayEnglish}</div>` : ''}
            </div>
            <div class="skill-lib-card-meta">
                <span class="difficulty-badge difficulty-${ref.difficulty}">${ref.difficulty}</span>
                <div class="skill-lib-card-indicators">
                    ${isFlagged ? `<span class="skill-lib-indicator" title="In focus">${ICONS.get('flag', 10)}</span>` : ''}
                    ${correctionCount > 0 ? `<span class="skill-lib-indicator skill-lib-indicator-count">${correctionCount}</span>` : ''}
                    ${hasNotes ? `<span class="skill-lib-indicator" title="Has notes">${ICONS.get('edit', 10)}</span>` : ''}
                </div>
            </div>
        </div>
    `;
}

function highlightMatch(text, query) {
    if (!query) return text;
    const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\]/g, '\$&')})`, 'gi');
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
                <button class="session-detail-back" onclick="closeSkillKnowledgePage('${skillId}', '${returnTo}')">
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
                <div class="skill-detail-phonetic">${ref.phonetic}</div>
                <div class="skill-detail-english">${ref.english}</div>
                <span class="difficulty-badge difficulty-${ref.difficulty}">${ref.difficulty}</span>
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
    if (returnTo) {
        showScreen(returnTo);
    } else {
        showLearnSkillLibrary();
    }
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

    // Restart from onboarding
    currentOnboardingScreen = 1;
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.onboarding-screen').forEach(s => s.classList.remove('active'));
    document.getElementById('onboarding-1').classList.add('active');
    appState.currentScreen = 'onboarding-1';
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
    if (goals)            appState.goals            = goals;
    if (timeline)         appState.timeline         = timeline;
    if (skillNotes)       appState.skillNotes       = skillNotes;

    // Load preferences
    const prefs = storage.load('preferences');
    if (prefs) {
        appState.hidePointe     = prefs.hidePointe     ?? false;
        appState.profilePicture = prefs.profilePicture ?? null;
        appState.displayName    = prefs.displayName    ?? null;
    }

    // Merge persisted {id, tracked, flagged} onto DATA.skills reference objects
    loadUserSkillState();

    // Restore level + dimensions from most recent placement assessment
    const placements = (appState.assessments || []).filter(a => a.type === 'placement');
    const latest = placements[placements.length - 1];
    if (latest) {
        appState.level      = latest.level;
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
    const levelLabels = {
        'beginner':          'Beginner',
        'elementary':        'Elementary',
        'improver':          'Improver',
        'intermediate':      'Intermediate',
        'upper-intermediate':'Upper Intermediate',
        'advanced':          'Advanced',
        'not-assessed':      'Not yet assessed',
    };
    const levelName = levelLabels[level] || 'Not yet assessed';

    // Animal watermark — matches level
    const animalSrc = ILLUSTRATIONS.levels[level] || null;

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
        ? `from your placement quiz · ${formatTimelineDate(latestAssessment.date)}`
        : null;

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
        'beginner':          'You\'re at the start of something. Log your first session to begin building a picture of your training.',
        'elementary':        'Core positions are coming together. The barre is where the foundation is being laid — trust the repetition.',
        'improver':          'A solid foundation developing well. Log sessions to start seeing where your corrections cluster.',
        'intermediate':      'Your technique is developing well. Log sessions to track where the most growth is happening.',
        'upper-intermediate':'Strong across the board. The work now is refinement — quality over acquisition.',
        'advanced':          'You\'re working at a high level. The app is most useful as a record of nuance at this stage.',
        'not-assessed':      'Take the placement quiz to get a picture of where you are and where to focus.',
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
                    <span class="focus-card-stage-r">updated ${formatTimelineDate(
                        (appState.assessments || []).slice(-1)[0]?.date || ''
                    )}</span>
                </div>
                <div class="focus-card-track">
                    <div class="focus-card-track-fill" style="width:${fillPct}%"></div>
                </div>`;
        }
    }

    // Stats row
    bodyContent += `
        <div class="focus-card-stats">
            <div class="focus-card-stat">
                <span class="focus-card-stat-value ${stats.corrections === 0 ? 'empty' : ''}">${stats.corrections || '—'}</span>
                <span class="focus-card-stat-label">corrections</span>
            </div>
            <div class="focus-card-stat">
                <span class="focus-card-stat-value ${!stats.lastSession ? 'empty' : ''}">${stats.lastSession || '—'}</span>
                <span class="focus-card-stat-label">last session</span>
            </div>
            <div class="focus-card-stat">
                <span class="focus-card-stat-value ${stats.goals === 0 ? 'empty' : ''}">${stats.goals || '—'}</span>
                <span class="focus-card-stat-label">goals</span>
            </div>
        </div>`;

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

function togglePointeSetting(btn) {
    appState.hidePointe = !btn.classList.contains('on');
    btn.classList.toggle('on', !appState.hidePointe);
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
