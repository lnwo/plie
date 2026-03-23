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
