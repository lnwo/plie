const DATA = {
    skills: [
        // Barre Work
        { id: 'plie', french: 'Plié', phonetic: 'plee-AY', english: 'Bend', difficulty: 'beginner', categoryId: 'barre', dimensionIds: ['technique'], aliases: ['plie', 'bend', 'demi-plie', 'grand plie'] },
        { id: 'tendu', french: 'Tendu', phonetic: 'tahn-DEW', english: 'Stretched', difficulty: 'beginner', categoryId: 'barre', dimensionIds: ['technique'], aliases: ['tendu', 'battement tendu'] },
        { id: 'degage', french: 'Dégagé', phonetic: 'day-ga-ZHAY', english: 'Disengaged', difficulty: 'beginner', categoryId: 'barre', dimensionIds: ['technique'], aliases: ['degage', 'brushing', 'battement degage'] },
        { id: 'rond-de-jambe', french: 'Rond de jambe', phonetic: 'rohn duh ZHAHMB', english: 'Circle of the leg', difficulty: 'beginner', categoryId: 'barre', dimensionIds: ['technique'], aliases: ['rond de jambe', 'circle', 'hip circle'] },
        { id: 'frappe', french: 'Frappé', phonetic: 'fra-PAY', english: 'Struck', difficulty: 'improver', categoryId: 'barre', dimensionIds: ['technique'], aliases: ['frappe', 'strike', 'battement frappe'] },
        { id: 'fondu', french: 'Fondu', phonetic: 'fohn-DEW', english: 'Melted', difficulty: 'improver', categoryId: 'barre', dimensionIds: ['technique'], aliases: ['fondu', 'melt', 'battement fondu'] },
        { id: 'grand-battement', french: 'Grand battement', phonetic: 'grahn bat-MAHN', english: 'Large beating', difficulty: 'improver', categoryId: 'barre', dimensionIds: ['technique'], aliases: ['grand battement', 'high kick', 'battement'] },
        { id: 'releve', french: 'Relevé', phonetic: 'ruh-luh-VAY', english: 'Raised', difficulty: 'beginner', categoryId: 'barre', dimensionIds: ['technique'], aliases: ['releve', 'rise', 'elevate'] },
        { id: 'eleve', french: 'Élevé', phonetic: 'ay-luh-VAY', english: 'Lifted', difficulty: 'beginner', categoryId: 'barre', dimensionIds: ['technique'], aliases: ['eleve', 'straight rise'] },
        { id: 'retire', french: 'Retiré', phonetic: 'ruh-tee-RAY', english: 'Withdrawn', difficulty: 'beginner', categoryId: 'barre', dimensionIds: ['technique'], aliases: ['retire', 'passé position'] },
        { id: 'coupe', french: 'Coupé', phonetic: 'koo-PAY', english: 'Cut', difficulty: 'beginner', categoryId: 'barre', dimensionIds: ['technique'], aliases: ['coupe', 'cut step'] },
        // Centre Work
        { id: 'developpe', french: 'Développé', phonetic: 'dayv-law-PAY', english: 'Developed', difficulty: 'improver', categoryId: 'centre', dimensionIds: ['technique', 'movement'], aliases: ['developpe', 'unfold', 'unfolding'] },
        { id: 'arabesque', french: 'Arabesque', phonetic: 'a-ra-BESK', english: 'Arabian', difficulty: 'intermediate', categoryId: 'centre', dimensionIds: ['technique', 'movement'], aliases: ['arabesque', 'balance', 'leg extension'] },
        { id: 'attitude', french: 'Attitude', phonetic: 'a-tee-TEWD', english: 'Attitude', difficulty: 'intermediate', categoryId: 'centre', dimensionIds: ['technique', 'movement'], aliases: ['attitude', 'bent leg arabesque'] },
        { id: 'pas-de-bourree', french: 'Pas de bourrée', phonetic: 'pah duh boo-RAY', english: 'Step of bourrée', difficulty: 'intermediate', categoryId: 'centre', dimensionIds: ['technique', 'movement'], aliases: ['pas de bourree', 'pas de bourée', 'bourree'] },
        { id: 'manege', french: 'Manège', phonetic: 'ma-NEZH', english: 'Riding school', difficulty: 'advanced', categoryId: 'centre', dimensionIds: ['technique', 'movement'], aliases: ['manege', 'travelling turns', 'en manege'] },
        { id: 'passe', french: 'Passé', phonetic: 'pa-SAY', english: 'Passed', difficulty: 'beginner', categoryId: 'centre', dimensionIds: ['technique', 'movement'], aliases: ['passe', 'retire'] },
        { id: 'balance', french: 'Balancé', phonetic: 'ba-lahn-SAY', english: 'Rocking step', difficulty: 'beginner', categoryId: 'centre', dimensionIds: ['technique', 'movement'], aliases: ['balance', 'waltz step'] },
        { id: 'port-de-bras', french: 'Port de bras', phonetic: 'por duh BRAH', english: 'Carriage of arms', difficulty: 'beginner', categoryId: 'centre', dimensionIds: ['technique', 'movement'], aliases: ['port de bras', 'arm movement'] },
        { id: 'epaulement', french: 'Épaulement', phonetic: 'ay-pol-MAHN', english: 'Shouldering', difficulty: 'intermediate', categoryId: 'centre', dimensionIds: ['technique', 'artistry'], aliases: ['epaulement', 'shoulder placement'] },
        { id: 'promenade', french: 'Promenade', phonetic: 'prom-uh-NAHD', english: 'Walk', difficulty: 'intermediate', categoryId: 'centre', dimensionIds: ['technique', 'movement', 'the-body'], aliases: ['promenade', 'en promenade'] },
        // Turns
        { id: 'pirouette', french: 'Pirouette', phonetic: 'peer-oo-WET', english: 'Whirl', difficulty: 'intermediate', categoryId: 'turns', dimensionIds: ['technique', 'movement'], aliases: ['pirouette', 'turn', 'spin', 'rotation'] },
        { id: 'fouette', french: 'Fouetté', phonetic: 'fweh-TAY', english: 'Whipped', difficulty: 'advanced', categoryId: 'turns', dimensionIds: ['technique', 'movement'], aliases: ['fouette', 'whip', 'fouette turns', 'fouettés'] },
        { id: 'chaine', french: 'Chaînés', phonetic: 'sheh-NAY', english: 'Chains', difficulty: 'beginner', categoryId: 'turns', dimensionIds: ['technique', 'movement'], aliases: ['chaines', 'chain turns'] },
        { id: 'piqué-turn', french: 'Piqué turn', phonetic: 'pee-KAY', english: 'Pricked turn', difficulty: 'improver', categoryId: 'turns', dimensionIds: ['technique', 'movement'], aliases: ['pique turn', 'step turn'] },
        { id: 'soutenu', french: 'Soutenu', phonetic: 'soo-tuh-NEW', english: 'Sustained turn', difficulty: 'improver', categoryId: 'turns', dimensionIds: ['technique', 'movement'], aliases: ['soutenu'] },
        { id: 'detourne', french: 'Détourné', phonetic: 'day-toor-NAY', english: 'Turned away', difficulty: 'improver', categoryId: 'turns', dimensionIds: ['technique', 'movement'], aliases: ['detourne'] },
        { id: 'renverse', french: 'Renversé', phonetic: 'rahn-vehr-SAY', english: 'Overturned', difficulty: 'intermediate', categoryId: 'turns', dimensionIds: ['technique', 'movement'], aliases: ['renverse'] },
        { id: 'tour-en-lair', french: 'Tour en l’air', phonetic: 'toor ahn LAIR', english: 'Turn in the air', difficulty: 'advanced', categoryId: 'turns', dimensionIds: ['technique', 'movement'], aliases: ['tour en lair'] },
        { id: 'italian-fouette', french: 'Fouetté à l’italienne', phonetic: 'fweh-TAY', english: 'Italian fouetté', difficulty: 'advanced', categoryId: 'turns', dimensionIds: ['technique', 'movement'], aliases: ['italian fouette'] },
        // Allegro
        { id: 'saute', french: 'Sauté', phonetic: 'soh-TAY', english: 'Jumped', difficulty: 'beginner', categoryId: 'allegro', dimensionIds: ['technique', 'movement'], aliases: ['saute', 'jump'] },
        { id: 'changement', french: 'Changement', phonetic: 'shahnzh-MAHN', english: 'Change', difficulty: 'beginner', categoryId: 'allegro', dimensionIds: ['technique', 'movement'], aliases: ['changement'] },
        { id: 'echappe', french: 'Échappé', phonetic: 'ay-sha-PAY', english: 'Escaped', difficulty: 'beginner', categoryId: 'allegro', dimensionIds: ['technique', 'movement'], aliases: ['echappe'] },
        { id: 'temps-leve', french: 'Temps levé', phonetic: 'tahn luh-VAY', english: 'Raised time', difficulty: 'improver', categoryId: 'allegro', dimensionIds: ['technique', 'movement'], aliases: ['temps leve'] },
        { id: 'entrechat', french: 'Entrechat', phonetic: 'ahn-truh-SHA', english: 'Beaten jump', difficulty: 'intermediate', categoryId: 'allegro', dimensionIds: ['technique', 'movement'], aliases: ['entrechat', 'beats'] },
        { id: 'grand-sissonne', french: 'Grand sissonne', phonetic: 'grahn see-SAWN', english: 'Large sissonne', difficulty: 'intermediate', categoryId: 'allegro', dimensionIds: ['technique', 'movement'], aliases: ['grand sissonne'] },
        { id: 'grand-jete', french: 'Grand jeté', phonetic: 'grahn zhuh-TAY', english: 'Large throw', difficulty: 'advanced', categoryId: 'allegro', dimensionIds: ['technique', 'movement'], aliases: ['grand jete', 'split jump', 'leap'] },
        { id: 'cabriole', french: 'Cabriole', phonetic: 'ka-bree-OL', english: 'Caper', difficulty: 'advanced', categoryId: 'allegro', dimensionIds: ['technique', 'movement'], aliases: ['cabriole'] },
        { id: 'brise', french: 'Brisé', phonetic: 'bree-ZAY', english: 'Broken', difficulty: 'advanced', categoryId: 'allegro', dimensionIds: ['technique', 'movement'], aliases: ['brise'] },
        { id: 'pas-de-chat', french: 'Pas de chat', phonetic: 'pah duh SHA', english: 'Step of the cat', difficulty: 'improver', categoryId: 'allegro', dimensionIds: ['technique', 'movement'], aliases: ['pas de chat'] },
        { id: 'petit-sissonne', french: 'Petit sissonne', phonetic: 'puh-TEE see-SAWN', english: 'Small sissonne', difficulty: 'improver', categoryId: 'allegro', dimensionIds: ['technique', 'movement'], aliases: ['petit sissonne'] },
        { id: 'ballonne', french: 'Ballonné', phonetic: 'ba-lawn-AY', english: 'Bounced', difficulty: 'improver', categoryId: 'allegro', dimensionIds: ['technique', 'movement'], aliases: ['ballonne'] },
        // Artistry
        { id: 'dynamics', french: 'Dynamics', phonetic: 'dy-NAM-iks', english: 'Dynamics', difficulty: 'intermediate', categoryId: 'artistry', dimensionIds: ['artistry'], aliases: ['dynamics', 'musical dynamics'] },
        { id: 'projection', french: 'Projection', phonetic: 'pro-JEK-shun', english: 'Projection', difficulty: 'intermediate', categoryId: 'artistry', dimensionIds: ['artistry'], aliases: ['projection', 'stage projection'] },
        { id: 'gaze-focus', french: 'Gaze / focus', phonetic: 'GAYZ FOH-kus', english: 'Gaze and focus', difficulty: 'beginner', categoryId: 'artistry', dimensionIds: ['artistry', 'technique'], aliases: ['gaze', 'focus', 'eye focus', 'regard'] },
        // Body & Technique (Pointe)
        { id: 'releve-pointe', french: 'Relevé en pointe', phonetic: 'ruh-luh-VAY', english: 'Rise to pointe', difficulty: 'improver', categoryId: 'body-and-technique', dimensionIds: ['pointe', 'technique'], aliases: ['releve pointe'] },
        { id: 'echappe-pointe', french: 'Échappé en pointe', phonetic: 'ay-sha-PAY', english: 'Escape on pointe', difficulty: 'improver', categoryId: 'body-and-technique', dimensionIds: ['pointe', 'technique'], aliases: ['echappe pointe'] },
        { id: 'bourree-pointe', french: 'Bourrée', phonetic: 'boo-RAY', english: 'Tiny steps', difficulty: 'improver', categoryId: 'body-and-technique', dimensionIds: ['pointe', 'technique'], aliases: ['bourree pointe'] },
        { id: 'piqué-pointe', french: 'Piqué en pointe', phonetic: 'pee-KAY', english: 'Step onto pointe', difficulty: 'intermediate', categoryId: 'body-and-technique', dimensionIds: ['pointe', 'technique'], aliases: ['pique pointe'] },
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
        'duckling':          'DUCKLING',
        'deer':              'DEER',
        'swan':              'SWAN',
        'firebird':          'FIREBIRD',
        'not-assessed':      'NOT YET ASSESSED',
        // backward compat for stored assessments from the old 6-level system
        'beginner':          'DUCKLING',
        'elementary':        'DUCKLING',
        'improver':          'DEER',
        'intermediate':      'SWAN',
        'upper-intermediate':'SWAN',
        'advanced':          'FIREBIRD',
    },

    categoryNames: {
        'barre':              'Barre Work',
        'centre':             'Centre Work',
        'turns':              'Turns',
        'allegro':            'Allegro',
        'artistry':           'Artistry',
        'body-and-technique': 'Body & Technique',
    },

    dimensionNames: {
        technique:  'Technique',
        movement:   'Movement',
        artistry:   'Artistry',
        'the-body': 'The Body',
        pointe:     'Pointe',
    },

    skillCategories: [
        { id: 'barre', icon: 'cat-barre', name: 'Barre work', count: '11 skills', onclick: "openFolder('barre')" },
        { id: 'centre', icon: 'cat-centre', name: 'Centre work', count: '10 skills', onclick: "alert('Coming soon')" },
        { id: 'turns', icon: 'cat-turns', name: 'Turns', count: '9 skills', onclick: "alert('Coming soon')" },
        { id: 'allegro', icon: 'cat-allegro', name: 'Allegro', count: '12 skills', onclick: "alert('Coming soon')" },
        { id: 'artistry', icon: 'cat-artistry', name: 'Artistry', count: '3 skills', onclick: "alert('Coming soon')" },
        { id: 'body-and-technique', icon: 'cat-pointe', name: 'Body & Technique', count: '4 skills', onclick: "alert('Coming soon')" },
    ],

    assessments: [
        { icon: 'learn-quiz', name: 'Placement quiz', desc: 'Find your overall level across 6 dimensions', action: 'startPlacementQuiz()', badge: '14 questions' },
        { icon: 'learn-footwork', name: 'Footwork & articulation', desc: 'Pointe work, relevé strength, and foot flexibility', action: "openFolder('footwork')", badge: '5 exercises' },
        { icon: 'learn-splits', name: 'Splits & extensions', desc: 'Splits, leg height, and range of motion', action: "alert('Coming soon')", badge: '6 exercises' },
        { icon: 'learn-core', name: 'Core & stamina', desc: 'Endurance, balance, and core stability', action: "alert('Coming soon')", badge: '10 exercises' },
        { icon: 'learn-pirouette', name: 'Pirouettes & rotation', desc: 'Turning technique and spotting', action: "alert('Coming soon')", badge: '7 exercises' }
    ],

    learnSections: [
    {
        id: 'skills',
        name: 'Skill library',
        desc: 'The movements that make up ballet training, from foundational barre work to the most demanding allegro.',
        icon: 'cat-barre',
        chips: ['All', 'Barre', 'Centre', 'Turns', 'Allegro', 'Artistry', 'Body & Technique'],
        action: 'showLearnSkillLibrary()',
        items: [] // populated from DATA.skills
    },
    {
        id: 'musicality',
        name: 'Musicality',
        desc: 'How movement and music become one. Phrasing, dynamics, and the art of dancing with the score rather than to it.',
        icon: 'learn-pirouette',
        chips: ['All', 'Rhythm', 'Phrasing', 'Dynamics', 'Style'],
        action: null,
        items: [
            {
                name: 'Breath before movement',
                chip: 'Phrasing',
                description: 'The preparatory breath that initiates movement. In ballet it is both physical and musical — it connects the dancer to the phrase before it begins.',
                keyPoints: ['The breath is visible in the upper body.', 'It belongs to the music, not just the body.', 'A missed breath makes an entrance feel late even if the feet are on time.']
            },
            {
                name: 'Stillness as punctuation',
                chip: 'Dynamics',
                description: 'The deliberate use of stillness to give shape to movement. A pause is not an absence of dancing — it is part of the phrase.',
                keyPoints: ['Stillness requires as much muscular engagement as movement.', 'The eye goes to what is still.', 'Use it to frame what came before and what comes next.']
            },
            {
                name: 'Finding the beat',
                chip: 'Rhythm',
                description: 'The fundamental skill of locating the underlying pulse of the music and anchoring movement to it.',
                keyPoints: ['Listen for the bass line or percussion.', 'Feel it physically before you move.', 'Move with the beat, not to it — internalize rather than react.']
            },
            {
                name: 'Counting in music',
                chip: 'Rhythm',
                description: 'Understanding how music is organised into bars and beats, and how this maps to movement phrases in class.',
                keyPoints: ['Most ballet music is in 3/4 or 4/4.', 'Count from the preparation, not the first step.', 'The "and" between counts is where many preparatory movements live.']
            },
            {
                name: 'Musical accents',
                chip: 'Rhythm',
                description: 'Accents are the points in the music that land with weight or emphasis. In class, they often determine where a movement feels sharp, suspended, or grounded. Missing them can make dancing look disconnected even if the steps are correct.',
                keyPoints: [
                    'Listen for where the music “lands” — often the start of a bar, but not always.',
                    'Clap along to a waltz (3/4) and notice the stronger first beat: ONE-two-three.',
                    'Try matching a tendu or plié to the accented beat rather than moving evenly through all counts.',
                    'Look up a simple ballet class track and identify which counts feel heavier or lighter.',
                    'Accents can be followed or resisted — both are used, but it should be a choice.'
                ]
            },
            {
                name: 'Syncopation',
                chip: 'Rhythm',
                description: 'Syncopation places emphasis between the main beats. It creates a feeling of suspension or surprise, and often appears in faster allegro or more complex combinations.',
                keyPoints: [
                    'Count “1 and 2 and” and notice the space between the numbers.',
                    'Clap on the “and” instead of the number to feel the shift in emphasis.',
                    'Listen to faster class music and try to hear where movement might sit between beats.',
                    'Practise marking small steps (like jeté or glissade) on off-beats.',
                    'If it feels rushed, it usually means the timing hasn’t settled yet.'
                ]
            },
            {
                name: 'The arc of a phrase',
                chip: 'Phrasing',
                description: 'Most ballet music is structured in phrases that build and resolve. Dancing the phrase means recognising where it begins, develops, and finishes, rather than treating each step equally.',
                keyPoints: [
                    'Listen for musical “sentences” — often 8 counts, sometimes longer.',
                    'Notice where the music seems to rise in intensity and where it resolves.',
                    'Mark a simple port de bras and let it grow across the phrase rather than repeating the same quality.',
                    'Avoid using full energy at the start — leave space for the phrase to build.',
                    'Look up a familiar adagio and track where the music peaks.'
                ]
            },
            {
                name: 'Dancing through the music',
                chip: 'Phrasing',
                description: 'Movement doesn’t stop when one step ends and another begins. This is about allowing transitions to carry the phrase, rather than breaking it into separate actions.',
                keyPoints: [
                    'Notice where you tend to “reset” between steps — that’s where flow is lost.',
                    'Practise linking movements slowly without stopping, even when marking.',
                    'Listen to legato (smooth) passages and match that continuity in the body.',
                    'Avoid treating counts as isolated checkpoints.',
                    'The aim is continuity, not speed.'
                ]
            },
            {
                name: 'Soft and sharp contrast',
                chip: 'Dynamics',
                description: 'Contrast in movement quality reflects contrast in the music. Without it, dancing can look flat even when rhythm is correct.',
                keyPoints: [
                    'Listen for sustained vs percussive sounds in the music.',
                    'Mark the same phrase twice: once as smoothly as possible, once with clear accents.',
                    'Notice how different qualities change the feel of the same steps.',
                    'Look up contrasting excerpts (e.g. adagio vs allegro) and observe the difference.',
                    'Clarity comes from contrast, not exaggeration.'
                ]
            },
            {
                name: 'Building to a climax',
                chip: 'Dynamics',
                description: 'Phrases often build towards a peak moment. Recognising this changes how you distribute energy across a combination.',
                keyPoints: [
                    'Listen for where the music becomes fullest or most intense.',
                    'Mark a phrase and gradually increase size or energy towards that point.',
                    'Avoid “peaking” too early — it flattens the rest of the phrase.',
                    'Observe how professional dancers hold something back until the right moment.',
                    'After the peak, allow the movement to resolve rather than stop abruptly.'
                ]
            },
            {
                name: 'Weight and lightness',
                chip: 'Dynamics',
                description: 'Movement quality shifts between grounded and lifted. Both are present in ballet, often within the same phrase.',
                keyPoints: [
                    'Listen for heavier, grounded sections versus lighter, lifted ones.',
                    'Use plié to connect to weight; use rise and extension to create lightness.',
                    'Mark a simple sequence and exaggerate the difference between heavy and light.',
                    'Look up contrasting repertoire and observe how weight changes the movement quality.',
                    'Lightness is controlled, not loose.'
                ]
            },
            {
                name: 'Romantic style',
                chip: 'Style',
                description: 'Associated with early 19th-century ballets, this style is shaped by soft phrasing, continuous movement, and an almost weightless quality.',
                keyPoints: [
                    'Look up a Giselle Act II variation and observe the continuous flow of the upper body.',
                    'Notice how transitions are softened rather than clearly segmented.',
                    'Arms and head lead the phrasing as much as the legs.',
                    'Mark port de bras with minimal sharpness or attack.',
                    'The quality comes from continuity, not slowness.'
                ]
            },
            {
                name: 'Neoclassical style',
                chip: 'Style',
                description: 'A faster, more direct use of classical technique. Movement is often sharper, more exposed, and closely tied to the structure of the music.',
                keyPoints: [
                    'Look up Balanchine excerpts and notice the speed and precision.',
                    'Steps are often more clearly defined rather than blended together.',
                    'Musicality is exact — closely tied to counts and structure.',
                    'Mark combinations with clearer starts and finishes.',
                    'Less softness, more clarity.'
                ]
            },
            {
                name: 'Soviet school style',
                chip: 'Style',
                description: 'Characterised by expansive movement, strong line, and a more dramatic use of the music. Often associated with Vaganova-based training.',
                keyPoints: [
                    'Look up Bolshoi or Mariinsky performances and observe the scale of movement.',
                    'Phrasing tends to be broad and sustained rather than quick and detailed.',
                    'Use of épaulement and upper body is more pronounced.',
                    'Mark phrases with fuller use of space and extension.',
                    'Energy is carried through the whole phrase, not just individual steps.'
                ]
            },
            {
                name: 'Beginning and ending',
                chip: 'Phrasing',
                description: 'How a movement starts and finishes shapes how it is perceived. These moments often align directly with the structure of the music.',
                keyPoints: [
                    'Listen for where the music begins — movement often starts just before or exactly on it.',
                    'Practise preparing before the first count rather than reacting to it.',
                    'Notice how endings are held or released with the music, not cut off early.',
                    'Mark simple combinations focusing only on the first and last moments.',
                    'A clear ending often matters more than what happens in the middle.'
                ]
            },
            // ── Vocabulary ─────────────────────────────────────
            { name: 'Bar',       chip: 'Rhythm',    description: 'A unit of music divided by bar lines. Most ballet music is in 3/4 or 4/4 time.',                                 keyPoints: ['A 3/4 bar has 3 beats; a 4/4 bar has 4.', 'Combinations are usually structured in even numbers of bars.', 'Listen for where the bar begins — it shapes where your weight falls.'] },
            { name: 'Beat',      chip: 'Rhythm',    description: 'The underlying pulse of the music. Every count in a combination maps to a beat.',                                 keyPoints: ['The beat is steady; the melody moves above it.', 'Find it in the bass before you try to move to it.', 'Missing the beat usually means you were reacting rather than anticipating.'] },
            { name: 'Count',     chip: 'Rhythm',    description: 'A numbered position within a bar. Counting gives movement its structure and timing.',                             keyPoints: ['Counting is a tool, not the goal — eventually you feel it.', 'In 3/4, counts are 1-2-3; in 4/4, 1-2-3-4.', 'Teachers often count from "and" to give you the upbeat prep.'] },
            { name: 'Downbeat',  chip: 'Rhythm',    description: 'The first and strongest beat of a bar. In 4/4, this is beat 1; in 3/4 (waltz), also beat 1.',                   keyPoints: ['Arrivals and climaxes often land on the downbeat.', 'Feeling the downbeat helps you structure longer phrases.', 'Missing it repeatedly usually signals the music hasn\'t been fully internalised.'] },
            { name: 'Upbeat',    chip: 'Rhythm',    description: 'The beat or beats immediately before the downbeat. Preparations and entrances often happen on the upbeat.',       keyPoints: ['The prep step before a pirouette is usually on the upbeat.', 'An upbeat feels like gathering energy before release.', 'Knowing where the upbeat is transforms your musical phrasing.'] },
            { name: 'Tempo',     chip: 'Rhythm',    description: 'The speed of the music, measured in beats per minute. It affects how movements feel and how much time each step takes.', keyPoints: ['Slow tempos require more muscular control to sustain shape.', 'Fast tempos demand cleaner technique — there\'s no time to correct mid-movement.', 'Your teacher\'s tempo choice is information about what the exercise is training.'] },
            { name: 'Dynamics',  chip: 'Dynamics',  description: 'Variations in energy, force, and quality of movement. In music, dynamics refer to loudness; in dance, to how movement is performed.', keyPoints: ['A sharp dynamic has a clear endpoint; a sustained one has gradual change.', 'Dynamics prevent all movement from looking the same.', 'Match your dynamic to the music\'s — soft passages call for lighter movement.'] },
            { name: 'Phrase',    chip: 'Phrasing',  description: 'A musical sentence — a group of notes that form a complete unit of expression, usually 4 or 8 bars in ballet.',   keyPoints: ['Every phrase has a beginning, a peak, and an end.', 'Treat each phrase as a complete thought, not just a sequence of steps.', 'The end of a phrase is where to breathe, settle, or prepare.'] },
        ]
    },
    {
        id: 'conditioning',
        name: 'Conditioning',
        desc: 'The work that supports the work. Strength, stability, and the targeted exercises that make technique possible.',
        icon: 'cat-centre',
        chips: ['All', 'Strength', 'Flexibility', 'Stability', 'Warm-up'],
        action: null,
        items: [
            { name: 'Theraband foot exercises',
                chip: 'Strength',
                description: 'Targeted resistance work for the intrinsic muscles of the foot. Builds the strength needed for a controlled, graduated relevé and a safe pointe.',
                keyPoints: ['Work through the full range — from flat to three-quarter to full pointe.', 'Resist on the way down.', 'Keep the toes long, not gripped.']
            },
            {
                name: 'Single leg balance',
                chip: 'Stability',
                description: 'The foundation of all turns and sustained balances. Trains the ankle, knee, and hip to stack correctly under load.',
                keyPoints: ['Micro-adjustments are normal — stillness is managed, not frozen.', 'Eyes on a fixed point.', 'Breathe.']
            },
            {
                name: 'Floor stretch sequence',
                chip: 'Warm-up',
                description: 'A short mat-based sequence to prepare hips, hamstrings, and spine before class. It’s not about pushing range — it’s about arriving at the barre with the body already moving and responsive.',
                keyPoints: [
                    'Hamstrings: seated forward fold or one-leg stretch, 30–45 seconds each side.',
                    'Hips: low lunge or lunge with back knee down, 30–45 seconds each side.',
                    'Glutes: figure-four or external rotation stretch, 30 seconds each side.',
                    'Spine: gentle roll-downs or supine twists to introduce movement through the back.',
                    'Keep everything low-intensity — you should feel warmer, not stretched out.'
                ]
            },
            {
                name: 'Calf raises',
                chip: 'Strength',
                description: 'A simple, repeatable way to build the strength needed for relevé. This is less about effort and more about consistency — done regularly, it changes how stable you feel in class.',
                keyPoints: [
                    '2 sets of 10–15 slow rises on two legs.',
                    'Optional: 1 set of 8–10 on each leg individually.',
                    'Use a wall or barre lightly for balance, not support.',
                    'Take 2 counts up, 2 counts down — don’t rush the lowering.',
                    'Stop before form breaks rather than pushing extra reps.'
                ]
            },
            {
                name: 'Turnout muscle engagement',
                chip: 'Strength',
                description: 'A way to reconnect to turnout outside of class. This isn’t about increasing range — it’s about recognising and holding the muscles that support it.',
                keyPoints: [
                    'Sit or lie with legs extended, gently rotate legs outward and return to parallel.',
                    'Repeat 10–15 slow rotations without moving the pelvis.',
                    'Alternative: stand in first position and lightly engage turnout without gripping.',
                    'Focus on small, controlled movement rather than range.',
                    'If the feet move more than the thighs, reset and reduce effort.'
                ]
            },
            {
                name: 'Core activation',
                chip: 'Strength',
                description: 'Establishes the quiet support needed for balance and control. This is less about visible effort and more about consistency of engagement.',
                keyPoints: [
                    'Supine position: engage low abdominals and hold for 20–30 seconds.',
                    'Add slow leg lifts or toe taps while keeping the pelvis stable.',
                    'Repeat 2–3 rounds.',
                    'Keep breathing steady — avoid holding tension in the upper body.',
                    'If the lower back lifts or arches, reduce the range of movement.'
                ]
            },
            {
                name: 'Hip flexor stretch',
                chip: 'Flexibility',
                description: 'Releases the front of the hip, which can tighten from sitting or repeated class work. Helps restore ease in movements behind the body.',
                keyPoints: [
                    'Low lunge position with back knee down, hold 30–60 seconds each side.',
                    'Keep torso upright and hips level.',
                    'Lightly engage the back leg glute to deepen the stretch.',
                    'Repeat once or twice rather than forcing a single long hold.',
                    'Avoid pushing into discomfort in the lower back.'
                ]
            },
            {
                name: 'Hamstring lengthening',
                chip: 'Flexibility',
                description: 'A simple way to maintain or improve range through the back of the legs between classes, without losing control.',
                keyPoints: [
                    'Seated forward fold or standing hamstring stretch, 30–45 seconds each side.',
                    'Keep spine long rather than collapsing forward.',
                    'Optional: gentle pulses or contract–relax for 2–3 cycles.',
                    'Repeat both sides once.',
                    'Stop before the stretch becomes passive or heavy.'
                ]
            },
            {
                name: 'Back cambrée stretch',
                chip: 'Flexibility',
                description: 'Introduces gentle extension through the spine. Useful before class to counter stiffness without forcing range.',
                keyPoints: [
                    'Standing or kneeling, place hands on hips or reach overhead.',
                    'Gently arch back for 10–15 seconds, return to neutral.',
                    'Repeat 3–5 times rather than holding a deep position.',
                    'Keep the movement distributed through the spine.',
                    'Avoid dropping into the lower back.'
                ]
            },
            {
                name: 'Splits progression',
                chip: 'Flexibility',
                description: 'A consistent approach to working towards splits over time. The aim is gradual change, not immediate depth.',
                keyPoints: [
                    'Front split position with hands supported, hold 30–60 seconds each side.',
                    'Focus on keeping hips square rather than going lower.',
                    'Optional: come out, then repeat for a second round.',
                    'Add gentle pulses or small shifts forward/back if stable.',
                    'Stop if alignment is lost — depth comes later.'
                ]
            },
            {
                name: 'Ankle stability drill',
                chip: 'Stability',
                description: 'A short set of exercises to improve control around the ankle joint. Particularly useful for anyone working towards pointe or improving balance.',
                keyPoints: [
                    'Single-leg balance for 30 seconds each side.',
                    'Repeat 2–3 times per side.',
                    'Progress by closing eyes or turning the head slowly.',
                    'Keep the standing leg aligned — no rolling in or out.',
                    'If balance is lost immediately, reduce difficulty rather than pushing through.'
                ]
            },
            {
                name: 'Relevé hold',
                chip: 'Stability',
                description: 'Builds endurance at the top of relevé. This is where many movements begin and end, so holding it matters more than repeating it.',
                keyPoints: [
                    'Rise to relevé and hold for 20–30 seconds.',
                    'Repeat 2–3 times.',
                    'Use light support if needed to maintain alignment.',
                    'Keep the height consistent — don’t gradually lower.',
                    'Stop when you can’t maintain control at the top.'
                ]
            },
            {
                name: 'Proprioception exercises',
                chip: 'Stability',
                description: 'Improves the body’s ability to adjust and correct balance without conscious effort. This carries directly into turns and transitions.',
                keyPoints: [
                    'Single-leg balance with small arm movements, 30 seconds each side.',
                    'Repeat with eyes closed if stable.',
                    'Add slow head turns to increase challenge.',
                    'Work for 2–3 rounds total.',
                    'Focus on recovering balance quickly, not avoiding loss entirely.'
                ]
            },
            {
                name: 'Joint mobilisation',
                chip: 'Warm-up',
                description: 'A brief sequence to move joints through range before class. Helps reduce stiffness and prepares the body for load.',
                keyPoints: [
                    'Ankles: slow circles or flex/point, 10–15 each direction.',
                    'Hips: gentle rotations or open/close movements, 10 each side.',
                    'Spine: roll-downs and roll-ups, 5–8 repetitions.',
                    'Keep movements continuous and controlled.',
                    'Total time: 3–5 minutes, not a full workout.'
                ]
            },
            {
                name: 'Barre warm-up sequence',
                chip: 'Warm-up',
                description: 'A simple structure to ease into class when needed. Not a replacement for class barre, but a way to arrive more prepared.',
                keyPoints: [
                    'Start with pliés: 1–2 slow sets in first and second.',
                    'Add tendus: 4 each direction, each side.',
                    'Include a few slow relevés to wake up the feet.',
                    'Keep everything controlled and moderate in range.',
                    'Total time: 5–10 minutes before class or at home.'
                ]
            }
        ]
    },
    {
        id: 'repertoire',
        name: 'Repertoire',
        desc: 'The ballets, the roles, the choreographers. Context for the steps and the tradition they come from.',
        icon: 'profile',
        chips: ['All', 'Classical', 'Romantic', 'Contemporary', 'Composers'],
        action: null,
        items: [
            {
                name: 'Giselle',
                chip: 'Romantic',
                description: 'A two-act ballet by Adolphe Adam, first performed in Paris in 1841. One of the defining works of the Romantic era and a touchstone role for dramatic ballerinas.',
                keyPoints: ['Choreography: Jean Coralli and Jules Perrot (original); Marius Petipa (later revisions).', 'Music: Adolphe Adam.', 'Notable for the transformation from peasant girl to Wili in Act II, the mime-heavy first act, and the iconic mad scene.']
            },
            {
                name: 'Swan Lake',
                chip: 'Classical',
                description: 'A four-act ballet by Tchaikovsky, first performed in Moscow in 1877. The dual role of Odette/Odile is among the most demanding in the classical repertoire.',
                keyPoints: ['Choreography: Marius Petipa and Lev Ivanov (1895 revival).', 'Music: Pyotr Ilyich Tchaikovsky.', 'Notable for the white acts (II and IV), the black swan pas de deux, and the 32 fouettés.']
            },
            {
                name: 'The Sleeping Beauty',
                chip: 'Classical',
                description: 'Often considered the purest expression of the classical style. Petipa’s choreography and Tchaikovsky’s score are tightly structured, leaving little room to hide — clarity, placement, and musical precision are exposed throughout.',
                keyPoints: [
                    'Choreography: Marius Petipa. Music: Pyotr Ilyich Tchaikovsky.',
                    'Look at the Rose Adagio — sustained balances, transitions, and control under pressure.',
                    'Notice how phrasing aligns closely with the structure of the music.',
                    'Every position is held and shown — there is no rushing through steps.',
                    'This is a useful reference for what “clean” classical technique looks like.'
                ]
            },
            {
                name: 'The Nutcracker',
                chip: 'Classical',
                description: 'A gateway ballet for many, but structurally varied and musically rich. It moves between narrative clarity and a sequence of character and divertissement dances in Act II.',
                keyPoints: [
                    'Choreography: Marius Petipa (after Ivanov). Music: Pyotr Ilyich Tchaikovsky.',
                    'Act I is driven by narrative and mime; Act II shifts to display and variation.',
                    'Notice the clarity of character in each divertissement — each dance has a distinct quality.',
                    'The Sugar Plum Fairy variation shows control, delicacy, and musical restraint.',
                    'Useful for observing how style shifts within a single work.'
                ]
            },
            {
                name: 'Don Quixote',
                chip: 'Classical',
                description: 'A technically demanding, character-driven ballet rooted in Spanish style. Known for its speed, attack, and virtuosity, particularly in the roles of Kitri and Basilio.',
                keyPoints: [
                    'Choreography: Marius Petipa (with later revisions). Music: Ludwig Minkus.',
                    'Look at the grand pas de deux — fast footwork, multiple turns, and strong accents.',
                    'Movement is direct and grounded compared to more lyrical works.',
                    'Use of épaulement is bold and clearly defined.',
                    'A good reference for projection, attack, and stamina.'
                ]
            },
            {
                name: 'La Bayadère',
                chip: 'Classical',
                description: 'A grand narrative ballet best known for the Kingdom of the Shades. Combines dramatic storytelling with one of the most structurally rigorous ensemble scenes in the repertoire.',
                keyPoints: [
                    'Choreography: Marius Petipa. Music: Ludwig Minkus.',
                    'The Shades scene is about absolute uniformity — timing, spacing, and control.',
                    'Notice the repetition of arabesque lines and the demand for consistency.',
                    'The simplicity of the choreography exposes placement and balance.',
                    'Often used as a benchmark for corps de ballet precision.'
                ]
            },
            {
                name: 'La Sylphide',
                chip: 'Romantic',
                description: 'One of the defining works of the Romantic era. It introduced the aesthetic of lightness, softness, and the supernatural female figure on pointe.',
                keyPoints: [
                    'Choreography: August Bournonville (Danish version). Music: Herman Severin Løvenskiold.',
                    'Footwork is quick and intricate, particularly in the Bournonville style.',
                    'Upper body remains soft and understated.',
                    'The Sylph should appear weightless, almost unattainable.',
                    'A useful contrast to later, more expansive classical works.'
                ]
            },
            {
                name: 'Coppélia',
                chip: 'Romantic',
                description: 'A lighter, comedic ballet with detailed character work. It combines technical clarity with theatrical timing and precision.',
                keyPoints: [
                    'Choreography: Arthur Saint-Léon. Music: Léo Delibes.',
                    'Swanilda’s role requires sharp musicality and clear character choices.',
                    'Mime and gesture are central, not secondary.',
                    'Movement is precise and often quick, without heaviness.',
                    'A good reference for musical timing and character detail.'
                ]
            },
            {
                name: 'Les Sylphides',
                chip: 'Romantic',
                description: 'A plotless ballet that distils the Romantic aesthetic into pure movement. Set to Chopin, it prioritises atmosphere, phrasing, and musical response over narrative.',
                keyPoints: [
                    'Choreography: Michel Fokine. Music: Frédéric Chopin.',
                    'No story — focus is entirely on musicality and line.',
                    'Transitions are continuous and understated.',
                    'The corps moves as a single, cohesive presence.',
                    'Useful for observing phrasing without narrative distraction.'
                ]
            },
            {
                name: 'Romeo and Juliet',
                chip: 'Contemporary',
                description: 'A dramatic full-length ballet shaped as much by acting as technique. MacMillan’s version is particularly known for its emotional intensity and naturalistic movement.',
                keyPoints: [
                    'Choreography: Kenneth MacMillan. Music: Sergei Prokofiev.',
                    'Movement often departs from strict classical form to serve the drama.',
                    'Look at the balcony pas de deux — sustained lifts and shifting weight.',
                    'Timing is closely tied to emotional phrasing, not just counts.',
                    'A reference for integrating acting and technique.'
                ]
            },
            {
                name: 'Manon',
                chip: 'Contemporary',
                description: 'A psychologically driven ballet requiring sustained dramatic commitment. The choreography blends classical vocabulary with more grounded, expressive movement.',
                keyPoints: [
                    'Choreography: Kenneth MacMillan. Music: Jules Massenet (arranged).',
                    'The central pas de deux demand both control and emotional clarity.',
                    'Movement often appears off-centre or unstable by design.',
                    'Weight and partnering are used to convey character.',
                    'A strong example of narrative-driven choreography.'
                ]
            },
            {
                name: 'The Rite of Spring',
                chip: 'Contemporary',
                description: 'A break from classical form, both musically and choreographically. Known for its rhythmic complexity and physical intensity.',
                keyPoints: [
                    'Music: Igor Stravinsky. Original choreography: Vaslav Nijinsky.',
                    'Look up both Nijinsky’s concept and later versions (e.g. Pina Bausch).',
                    'Movement is grounded, often heavy and percussive.',
                    'Rhythm is irregular and deliberately challenging.',
                    'Useful for expanding understanding of musical response beyond classical structure.'
                ]
            },
            {
                name: 'Tchaikovsky',
                chip: 'Composers',
                description: 'Composer of the three central works of the classical repertoire. His scores shaped how ballet uses music — structurally clear, emotionally expansive, and closely tied to choreography.',
                keyPoints: [
                    'Works include Swan Lake, The Sleeping Beauty, and The Nutcracker.',
                    'Music is highly structured — phrases are clear and predictable.',
                    'Often supports expansive, sustained movement.',
                    'Listening outside of class helps internalise phring and timing.',
                    'A useful foundation for understanding classical musicality.'
                ]
            },
            {
                name: 'Prokofiev',
                chip: 'Composers',
                description: 'Known for rhythmically complex and emotionally direct scores. His music challenges dancers to move beyond predictable phrasing.',
                keyPoints: [
                    'Works include Romeo and Juliet and Cinderella.',
                    'Rhythms are less regular — phrasing requires attention.',
                    'Music often shifts suddenly in tone or intensity.',
                    'Encourages more nuanced timing and dynamic contrast.',
                    'Listening actively helps with adaptability in class.'
                ]
            },
            {
                name: 'Delibes',
                chip: 'Composers',
                description: 'A composer of refined, highly musical ballet scores. His work sits between the Romantic and classical traditions, with particular attention to clarity and charm.',
                keyPoints: [
                    'Works include Coppélia and Sylvia.',
                    'Music is lighter and more detailed than Tchaikovsky.',
                    'Supports quick footwork and precise timing.',
                    'Phrasing is elegant rather than expansive.',
                    'Useful for refining musical detail and articulation.'
                ]
            }
        ]
    },
    {
        id: 'pointers',
        name: 'Pointers',
        desc: 'Short diagnostics to help identify what\'s actually holding you back, with targeted things to try.',
        icon: 'learn-pointers',
        chips: ['All'],
        action: null,
        items: [
            {
                name: 'Épaulement',
                type: 'pointer',
                question: 'Why does my upper body feel disconnected from my movement?',
                insight: 'Épaulement is not a position — it\'s a relationship. The rotation of the shoulders and head is a response to the direction of movement, not a fixed angle applied on top of it. Most dancers who struggle with épaulement are thinking about where to put their shoulders rather than what their body is travelling toward.',
                whatToTry: [
                    'Ask your teacher to show you épaulement in a simple tendu combination before applying it to bigger movements.',
                    'Look at the linked skill entry for Épaulement in the skill library.',
                    'Try walking across the room and letting your shoulders respond naturally to the direction change — you already have the instinct.'
                ],
                inspiration: 'Watch Natalia Osipova in any Ashton work — the way the head and shoulders lead into each phrase is as clear a demonstration of épaulement as exists on film.'
            },
            {
                name: 'Pirouettes',
                type: 'pointer',
                question: 'Why do I keep falling out of my turns?',
                insight: 'Most pirouette problems are preparation problems, not turning problems. By the time you\'re spinning, the outcome is largely determined. The two most common root causes are: weight not fully committed to the supporting leg in the preparation, and the push coming from the wrong place (arms rather than the floor).',
                whatToTry: [
                    'Ask your teacher to watch your preparation specifically — not the turn.',
                    'Practise relevé in fifth with no turn, focusing on finding the balance before anything rotates.',
                    'See the Pirouette entry in the skill library.'
                ],
                inspiration: 'Watch Marianela Nuñez\'s pirouettes in any Don Quixote footage — specifically the stillness of her head and the length of her spine through the turn.'
            },
            {
                name: 'Extension and leg height',
                type: 'pointer',
                question: 'Why can\'t I get my leg higher even though I stretch every day?',
                insight: 'Leg height is a three-factor problem: flexibility, strength, and technique — and the limiting factor is rarely flexibility alone. A leg that won\'t go above 90 degrees in adagio is usually being held back by insufficient strength in the hip flexors and core to support the weight of the leg at that height, or by a pelvis that tilts to compensate rather than staying level.',
                whatToTry: [
                    'Ask your teacher whether your pelvis is staying level when you lift.',
                    'Work on standing développé away from the barre to build the strength component.',
                    'See the Arabesque and Développé entries in the skill library.'
                ],
                inspiration: 'Watch Svetlana Zakharova\'s adagio work — the quality of extension comes from the length of the line, not just the height.'
            },
            {
                name: 'Footwork articulation',
                type: 'pointer',
                question: 'Why does my footwork look flat even when I\'m trying to point?',
                insight: 'Articulated footwork is a sequential action — heel, ball, toe on the way down; toe, ball, heel on the way up. Most flatness comes from skipping the middle step. The foot is trying to get to the pointed position rather than travelling through it.',
                whatToTry: [
                    'Ask your teacher to watch a slow tendu and tell you specifically where the articulation breaks down.',
                    'Practise the foot action lying on the floor with no balance demand.',
                    'See the Tendu entry in the skill library.'
                ],
                inspiration: 'Watch any footage of Sylvie Guillem at the barre — the precision of the foot through each position of a tendu is as good a model as exists.'
            },
            {
                name: 'Spotting',
                type: 'pointer',
                question: 'How do I spot properly in turns?',
                insight: 'Spotting is the practice of fixing your gaze on a single point and whipping your head around quickly to return to it during turns. The head leads the body — it should arrive at the spot before the body completes the rotation. Inconsistent spotting is usually caused by the eyes losing focus before the head has committed to the whip.',
                whatToTry: ['Pick a mark at eye level — slightly above is better than below.', 'Keep your chin level; don\'t drop or tip the head as you spot.', 'Practise the head action independently: stand still, spot to one side, whip to return.', 'Delay the head as long as possible before the whip — the contrast is what makes spotting effective.'],
                inspiration: null
            },
            {
                name: 'Turnout',
                type: 'pointer',
                question: 'How do I improve my turnout without straining?',
                insight: 'Turnout comes from the hip socket, not the feet. Forcing rotation below the hip — by twisting at the knee or rolling the ankle — creates long-term strain and teaches the body incorrect alignment. Your working turnout is how much you can maintain without compensation, which is often less than your maximum passive turnout.',
                whatToTry: ['Stand in first and check: are your knees over your toes? If not, bring the feet in.', 'Strengthen the external rotators with exercises like clam shells and attitude rotations.', 'Work at 75% of your maximum turnout and focus on maintaining it — this builds more usable range than forcing the full amount.', 'Ask a teacher to check your pelvis: a tucked or anteriorly tilted pelvis blocks turnout regardless of hip flexibility.'],
                inspiration: null
            }
        ]
    }
    ],

};
