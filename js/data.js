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
    {
        id: 'skills',
        name: 'Skill library',
        desc: 'The movements that make up ballet training, from foundational barre work to the most demanding allegro.',
        icon: 'cat-barre',
        chips: ['All', 'Barre', 'Centre', 'Turns', 'Allegro', 'Pointe'],
        action: 'showLearnSkillLibrary()',
        items: [] // populated from DATA.skills
    },
    {
        id: 'glossary',
        name: 'Glossary',
        desc: 'The language of ballet. Terms, concepts, and the vocabulary used in class and in the studio.',
        icon: 'learn-quiz',
        chips: ['All', 'Technique', 'Musicality'],
        action: null,
        items: [
            {
                name: 'Épaulement',
                chip: 'Technique',
                description: 'The positioning and movement of the shoulders in relation to the hips and head. One of the most defining qualities of classical style — without it, dancing can appear flat or two-dimensional.',
                keyPoints: ['Rotate the shoulder towards or away from the audience to create line and depth.', 'Always connected to the head and gaze.']
            },
            {
                name: 'Aplomb',
                chip: 'Technique',
                description: 'The quality of perfect vertical alignment and balance. A dancer with aplomb appears rooted and effortless simultaneously.',
                keyPoints: ['Weight centred over the standing leg.', 'Core engaged without tension.', 'The feeling of being pulled up rather than held up.']
            },
            {
                name: 'En dehors',
                chip: 'Technique',
                description: 'Outward rotation, moving away from the supporting leg. Applies to turns, movements, and the direction of working leg gestures.',
                keyPoints: ['Rotation initiates from the hip, not the knee.', 'Used in turns: a pirouette en dehors rotates away from the supporting leg.']
            },
            {
                name: 'En dedans',
                chip: 'Technique',
                description: 'Inward rotation, moving towards the supporting leg. The counterpart to en dehors.',
                keyPoints: ['Rotation initiates from the hip.', 'Often felt as the more natural direction for some movements.']
            },
            {
                name: 'Turnout',
                chip: 'Technique',
                description: 'The outward rotation of both legs from the hip joint. A fundamental principle of classical ballet technique.',
                keyPoints: ['Originates at the hip, not the knee or ankle.', 'Never force beyond your natural range.', 'Maintained through core and glute engagement.']
            },
            {
                name: 'Alignment',
                chip: 'Technique',
                description: 'The relationship between body parts in space — head, shoulders, hips, knees, and feet stacked in correct relation to one another.',
                keyPoints: ['Check alignment from both front and side.', 'Misalignment at the hip affects everything below it.']
            },
            {
                name: 'Plumb line',
                chip: 'Technique',
                description: 'An imaginary vertical line through the centre of the body used as a reference for correct alignment and balance.',
                keyPoints: ['Should pass through ear, shoulder, hip, and ankle in profile.', 'A useful mental image when finding balance on one leg.']
            },
            {
                name: 'Weight placement',
                chip: 'Technique',
                description: 'Where the body\'s mass sits in relation to the supporting foot or feet. Critical for balance, transitions, and preparation for turns.',
                keyPoints: ['Over-the-toe placement supports relevé and turns.', 'Shifting weight clearly and fully prevents falling out of steps.']
            },
            {
                name: 'Adagio',
                chip: 'Musicality',
                description: 'Slow, sustained movement. In class, adagio exercises develop balance, control, and the ability to move through space with intention.',
                keyPoints: ['Resist the pull of gravity — control the descent.', 'Musicality is especially visible in adagio.']
            },
            {
                name: 'Rubato',
                chip: 'Musicality',
                description: 'A slight flexibility in tempo — slowing or speeding the phrase slightly for expressive effect, then returning to the pulse.',
                keyPoints: ['Always resolve back to the beat.', 'Use sparingly.', 'The music leads, not the dancer.']
            },
            {
                name: 'Phrase',
                chip: 'Musicality',
                description: 'A musical sentence — a unit of music with a beginning, middle, and end. Dancing in phrases means responding to this structure rather than counting individual beats.',
                keyPoints: ['Identify where phrases begin and end.', 'Movement should breathe with the phrase, not cut across it.']
            },
            {
                name: 'Dynamics',
                chip: 'Musicality',
                description: 'The variation of force, speed, and quality within movement. Dynamics are what give dancing texture and prevent it from looking mechanical.',
                keyPoints: ['Contrast is the key — soft needs sharp to be visible.', 'Listen to the music for dynamic cues.']
            },
            {
                name: 'Accent',
                chip: 'Musicality',
                description: 'A point of emphasis in the music or movement. Accents give rhythm its shape and movement its punctuation.',
                keyPoints: ['Can fall on or off the beat.', 'Match movement accents to musical ones unless deliberately contrasting.']
            },
            {
                name: 'Tempo',
                chip: 'Musicality',
                description: 'The speed of the music. In ballet, dancers must be able to adapt technique to a wide range of tempi without losing quality.',
                keyPoints: ['Slow tempi expose technical weaknesses.', 'Fast tempi require economy of movement.']
            },
            {
                name: 'Allegro',
                chip: 'Musicality',
                description: 'Fast, lively movement. In class, allegro exercises develop speed, elevation, and quick footwork.',
                keyPoints: ['Preparation and landing are as important as the jump itself.', 'Small allegro (petit) and large allegro (grand) require different qualities.']
            }
        ]
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
                keyPoints: ['Listen for the bass line or percussion.', 'Feel it physically before you move.', 'Content coming soon.']
            },
            {
                name: 'Counting in music',
                chip: 'Rhythm',
                description: 'Understanding how music is organised into bars and beats, and how this maps to movement phrases in class.',
                keyPoints: ['Most ballet music is in 3/4 or 4/4.', 'Count from the preparation, not the first step.', 'Content coming soon.']
            },
            {
                name: 'Musical accents',
                chip: 'Rhythm',
                description: 'The points of emphasis within a bar. Identifying and responding to musical accents gives movement clarity and rhythmic interest.',
                keyPoints: ['Content coming soon.']
            },
            {
                name: 'Syncopation',
                chip: 'Rhythm',
                description: 'Rhythm that falls between the beats, creating surprise and energy. Used sparingly in classical ballet but common in contemporary work.',
                keyPoints: ['Content coming soon.']
            },
            {
                name: 'The arc of a phrase',
                chip: 'Phrasing',
                description: 'Every musical phrase has a shape — a rise and fall of energy. Dancing the arc means responding to that shape rather than executing steps mechanically.',
                keyPoints: ['Content coming soon.']
            },
            {
                name: 'Dancing through the music',
                chip: 'Phrasing',
                description: 'Moving with the music rather than to it — allowing the sound to flow through the body rather than simply marking time.',
                keyPoints: ['Content coming soon.']
            },
            {
                name: 'Soft and sharp contrast',
                chip: 'Dynamics',
                description: 'The interplay between sustained, fluid movement and quick, precise action. One of the primary tools for creating expressive texture.',
                keyPoints: ['Content coming soon.']
            },
            {
                name: 'Building to a climax',
                chip: 'Dynamics',
                description: 'Shaping a phrase or variation so that energy accumulates towards a peak moment, then releases.',
                keyPoints: ['Content coming soon.']
            },
            {
                name: 'Weight and lightness',
                chip: 'Dynamics',
                description: 'The quality of movement — heavy and grounded versus light and aerial. Both are valid and both require control.',
                keyPoints: ['Content coming soon.']
            },
            {
                name: 'Romantic style',
                chip: 'Style',
                description: 'The aesthetic of early 19th century ballet — ethereal, soft, and otherworldly. Associated with works like Giselle and La Sylphide.',
                keyPoints: ['Content coming soon.']
            },
            {
                name: 'Neoclassical style',
                chip: 'Style',
                description: 'Balanchine\'s reinvention of classical form — leaner, faster, more abstract. Less narrative, more musical.',
                keyPoints: ['Content coming soon.']
            },
            {
                name: 'Soviet school style',
                chip: 'Style',
                description: 'The Vaganova-influenced aesthetic of the Bolshoi and Mariinsky — expansive, dramatic, technically rigorous.',
                keyPoints: ['Content coming soon.']
            },
            {
                name: 'Beginning and ending',
                chip: 'Phrasing',
                description: 'How a phrase starts and how it finishes. Both are as important as the movement in between.',
                keyPoints: ['Content coming soon.']
            }
        ]
    },
    {
        id: 'conditioning',
        name: 'Conditioning & drills',
        desc: 'The work that supports the work. Strength, stability, and the targeted exercises that make technique possible.',
        icon: 'cat-centre',
        chips: ['All', 'Strength', 'Flexibility', 'Stability', 'Warm-up'],
        action: null,
        items: [
            {
                name: 'Theraband foot exercises',
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
                name: 'Calf raises',
                chip: 'Strength',
                description: 'A fundamental exercise for building the calf and Achilles strength required for a high, stable relevé.',
                keyPoints: ['Content coming soon.']
            },
            {
                name: 'Turnout muscle engagement',
                chip: 'Strength',
                description: 'Targeted activation of the deep external rotators — the muscles responsible for maintaining turnout without strain.',
                keyPoints: ['Content coming soon.']
            },
            {
                name: 'Core activation',
                chip: 'Strength',
                description: 'Engaging the deep abdominal and back muscles that stabilise the spine and pelvis during movement.',
                keyPoints: ['Content coming soon.']
            },
            {
                name: 'Hip flexor stretch',
                chip: 'Flexibility',
                description: 'Lengthening the muscles at the front of the hip — essential for a free, high arabesque and a clean attitude derrière.',
                keyPoints: ['Content coming soon.']
            },
            {
                name: 'Hamstring lengthening',
                chip: 'Flexibility',
                description: 'Progressive stretching of the hamstrings to support développé height and grand battement.',
                keyPoints: ['Content coming soon.']
            },
            {
                name: 'Back cambrée stretch',
                chip: 'Flexibility',
                description: 'Mobilising the thoracic and lumbar spine for port de bras and back bends.',
                keyPoints: ['Content coming soon.']
            },
            {
                name: 'Splits progression',
                chip: 'Flexibility',
                description: 'A structured approach to working towards full splits, building flexibility safely over time.',
                keyPoints: ['Content coming soon.']
            },
            {
                name: 'Ankle stability drill',
                chip: 'Stability',
                description: 'Exercises targeting the ankle stabilisers — important for pointe work, landings, and balance.',
                keyPoints: ['Content coming soon.']
            },
            {
                name: 'Relevé hold',
                chip: 'Stability',
                description: 'Sustaining a relevé position to build the endurance and control needed for pirouette preparation and pointe work.',
                keyPoints: ['Content coming soon.']
            },
            {
                name: 'Proprioception exercises',
                chip: 'Stability',
                description: 'Training the body\'s awareness of its own position in space — the foundation of reliable balance.',
                keyPoints: ['Content coming soon.']
            },
            {
                name: 'Joint mobilisation',
                chip: 'Warm-up',
                description: 'Gentle movement through the full range of each joint before class to prepare the body and reduce injury risk.',
                keyPoints: ['Content coming soon.']
            },
            {
                name: 'Barre warm-up sequence',
                chip: 'Warm-up',
                description: 'A structured sequence of exercises designed to warm the body progressively from feet to spine.',
                keyPoints: ['Content coming soon.']
            },
            {
                name: 'Floor stretch sequence',
                chip: 'Warm-up',
                description: 'A mat-based routine for releasing tension and preparing the hips, hamstrings, and back before training.',
                keyPoints: ['Content coming soon.']
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
                description: 'A three-act ballet considered the pinnacle of the classical style. Petipa\'s choreography and Tchaikovsky\'s score are inseparable.',
                keyPoints: ['Content coming soon.']
            },
            {
                name: 'The Nutcracker',
                chip: 'Classical',
                description: 'A two-act Christmas ballet that has become one of the most performed works in the repertoire worldwide.',
                keyPoints: ['Content coming soon.']
            },
            {
                name: 'Don Quixote',
                chip: 'Classical',
                description: 'A virtuosic, character-driven ballet based on Cervantes. Famous for its technically demanding pas de deux and vibrant Spanish flavour.',
                keyPoints: ['Content coming soon.']
            },
            {
                name: 'La Bayadère',
                chip: 'Classical',
                description: 'A grand Petipa ballet set in ancient India. The Kingdom of the Shades scene is one of the most celebrated sequences in classical ballet.',
                keyPoints: ['Content coming soon.']
            },
            {
                name: 'La Sylphide',
                chip: 'Romantic',
                description: 'The work that defined the Romantic era in ballet. White tutus, pointe work as ethereal illusion, and the unattainable ideal.',
                keyPoints: ['Content coming soon.']
            },
            {
                name: 'Coppélia',
                chip: 'Romantic',
                description: 'A comic ballet about a toymaker\'s life-size doll. Lighter in tone than most Romantic works, with a happy ending.',
                keyPoints: ['Content coming soon.']
            },
            {
                name: 'Les Sylphides',
                chip: 'Romantic',
                description: 'Fokine\'s plotless evocation of the Romantic spirit, set to Chopin. A pivotal work in the transition towards modern ballet.',
                keyPoints: ['Content coming soon.']
            },
            {
                name: 'Romeo and Juliet',
                chip: 'Contemporary',
                description: 'Prokofiev\'s score has inspired numerous choreographic versions. MacMillan\'s for the Royal Ballet is among the most celebrated.',
                keyPoints: ['Content coming soon.']
            },
            {
                name: 'Manon',
                chip: 'Contemporary',
                description: 'Kenneth MacMillan\'s intensely dramatic full-length ballet, set to Massenet. A demanding dramatic and technical role.',
                keyPoints: ['Content coming soon.']
            },
            {
                name: 'The Rite of Spring',
                chip: 'Contemporary',
                description: 'Stravinsky\'s revolutionary score has been choreographed by dozens of choreographers. Nijinsky\'s original caused a riot; Pina Bausch\'s is among the most powerful reinterpretations.',
                keyPoints: ['Content coming soon.']
            },
            {
                name: 'Tchaikovsky',
                chip: 'Composers',
                description: 'Pyotr Ilyich Tchaikovsky (1840–1893). Composer of Swan Lake, The Sleeping Beauty, and The Nutcracker — the three scores that define the classical repertoire.',
                keyPoints: ['Content coming soon.']
            },
            {
                name: 'Prokofiev',
                chip: 'Composers',
                description: 'Sergei Prokofiev (1891–1953). Composer of Romeo and Juliet and Cinderella. His scores are rhythmically complex and dramatically vivid.',
                keyPoints: ['Content coming soon.']
            },
            {
                name: 'Delibes',
                chip: 'Composers',
                description: 'Léo Delibes (1836–1891). Composer of Coppélia and Sylvia. Tchaikovsky admired his ballet scores enormously.',
                keyPoints: ['Content coming soon.']
            }
        ]
    }
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
