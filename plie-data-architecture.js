/**
 * PLIÉ — DATA ARCHITECTURE v2
 *
 * Changes from v1:
 * - Correction.text is a single string (one bullet per object)
 * - SessionBlock.corrections is string[] (in-memory only)
 * - SessionBlock gains mode, reflectionText fields
 * - Goal gains correctionIds[]
 * - SkillNote gains isReflection flag
 * - SessionSkill gains mode field, drops isPraise/highlight
 */

// ─── SKILL ───────────────────────────────────────────────────────
// Reference data in DATA.skills — never persisted.
// User state persisted separately as sparse [{id, tracked, flagged}].
const Skill = {
  id:          String,   // slug e.g. 'pirouette'
  french:      String,
  phonetic:    String,
  english:     String,
  difficulty:  String,   // 'beginner'|'improver'|'intermediate'|'advanced'
  category:    String,
  dimensionId: String,
  aliases:     Array,    // string[] — searched in skill library

  // Runtime only (merged from persisted sparse state)
  tracked:         Boolean,  // default false
  flagged:         Boolean,  // default false — "in focus" in The Barre
  phoneticVisible: Boolean,  // NOT persisted, always starts hidden
};

// ─── CORRECTION ──────────────────────────────────────────────────
// One object per bullet. Multiple bullets in a session block
// produce multiple Correction objects with the same sessionId/skillId.
const Correction = {
  id:          Number,
  skillId:     String,   // required FK → Skill.id
  text:        String,   // single correction string
  createdAt:   Number,
  sessionId:   Number,   // optional FK → Session.id
  source:      String,   // 'teacher'|'self'|'video-review'
  type:        String,   // 'technical'|'artistic'|'musical'|'general' | null
  isRecurring: Boolean,
};

// ─── SESSION ─────────────────────────────────────────────────────
// Top-level logged class. Blocks decompose into SessionSkills + Corrections on save.
const Session = {
  id:              Number,
  date:            String,   // YYYY-MM-DD
  savedAt:         Number,
  templateId:      Number,   // FK → SessionTemplate.id | null
  sessionName:     String,   // | null (one-off sessions)
  sessionLocation: String,   // | null
  classType:       String,   // CLASS_TYPE id | null
  notes:           String,   // general session notes | null
};

// ─── SESSION BLOCK ────────────────────────────────────────────────
// In-memory only. Never stored. Decomposed by saveSession().
const SessionBlock = {
  id:             Number,
  topicId:        String,   // 'general' | category id | 'skill:pirouette'
  title:          String,   // bold first line
  notes:          String,   // collapsible context notes
  notesOpen:      Boolean,
  mode:           String,   // 'correction' | 'praise' | 'reflection'
  corrections:    Array,    // string[] — each non-empty entry → Correction on save
  reflectionText: String,   // reflection mode only
};

// ─── SESSION TEMPLATE ─────────────────────────────────────────────
const SessionTemplate = {
  id:        Number,
  name:      String,   // required
  location:  String,   // | null
  classType: String,   // | null
  days:      Array,    // string[] e.g. ['Mon','Wed']; empty = one-off
};

// ─── SESSION SKILL ────────────────────────────────────────────────
// Join object linking Session ↔ Skill. Holds skill-specific notes and correction refs.
const SessionSkill = {
  id:            Number,
  sessionId:     Number,   // FK → Session.id
  skillId:       String,   // FK → Skill.id
  notes:         String,   // | null
  correctionIds: Array,    // number[] FK → Correction.id
  tracked:       Boolean,
  blockTitle:    String,   // | null
  mode:          String,   // 'correction'|'praise'|'reflection'
};

// ─── SKILL NOTE ───────────────────────────────────────────────────
// Personal freeform notes on a skill. Separate from corrections (which come from teacher).
const SkillNote = {
  id:           Number,
  skillId:      String,   // FK → Skill.id
  text:         String,
  date:         String,   // YYYY-MM-DD
  createdAt:    Number,
  isReflection: Boolean,  // true when saved from a Reflection block
};

// ─── GOAL ────────────────────────────────────────────────────────
// Goals can link to multiple corrections across multiple sessions/skills.
const GoalMilestone = { id: Number, text: String, done: Boolean };

const Goal = {
  id:            Number,
  title:         String,   // required
  body:          String,   // | null
  createdAt:     Number,
  dueDate:       String,   // YYYY-MM-DD | null
  skillId:       String,   // | null — optional skill link
  dimensionId:   String,   // | null
  category:      String,   // | null
  correctionIds: Array,    // number[] FK → Correction.id
                           // shown on goal card; struck-through when completedAt is set
  milestones:    Array,    // GoalMilestone[]
  completedAt:   Number,   // null = active; set = complete; clearable via reopenGoal()
};

// ─── ASSESSMENT ──────────────────────────────────────────────────
const DimensionResult = {
  stage: Number, stageLabel: String, progressWithin: Number, raw: Number,
};

const Assessment = {
  id: Number, type: String, date: String, completedAt: Number,
  answers: Object,    // raw quiz answers keyed by question key
  dimensions: Object, // { barre: DimensionResult, centre: ..., }
  level: String, levelLabel: String, levelDescription: String,
};

// ─── TIMELINE ENTRY ──────────────────────────────────────────────
// Stored (not derived). Intentionally sparse — no correction-level detail.
// Typical entries: session logged, goal created/completed, assessment, milestone, joined.
const TimelineEntry = {
  id:        Number,
  type:      String,   // 'session'|'assessment'|'milestone'|'manual'
  objectId:  Number,   // FK | null
  title:     String,
  body:      String,   // | null
  date:      String,   // YYYY-MM-DD (event date, not logged date)
  createdAt: Number,
};

// ─── STORAGE KEYS ────────────────────────────────────────────────
const STORAGE_KEYS = {
  skills:           'plie:skills',
  corrections:      'plie:corrections',
  sessions:         'plie:sessions',
  sessionTemplates: 'plie:sessionTemplates',
  sessionSkills:    'plie:sessionSkills',
  assessments:      'plie:assessments',
  goals:            'plie:goals',
  timeline:         'plie:timeline',
  skillNotes:       'plie:skillNotes',
};

// ─── RELATIONSHIPS ────────────────────────────────────────────────
/*
  Skill     (1) ──── (many) Correction      via Correction.skillId
  Session   (1) ──── (many) Correction      via Correction.sessionId [optional]
  Session   (1) ──── (many) SessionSkill    via SessionSkill.sessionId
  Skill     (1) ──── (many) SessionSkill    via SessionSkill.skillId
  SessionSkill ────  (many) Correction      via SessionSkill.correctionIds[]
  SessionTemplate ── (many) Session         via Session.templateId [optional]
  Goal      (0..1) ─ (1)    Skill           via Goal.skillId [optional]
  Goal      ──────── (many) Correction      via Goal.correctionIds[]
  Skill     (1) ──── (many) SkillNote       via SkillNote.skillId
  Session   (1) ──── (1)    TimelineEntry   via TimelineEntry.objectId
  Assessment(1) ──── (1)    TimelineEntry   via TimelineEntry.objectId

  Key queries:
  corrections for skill:  corrections.filter(c => c.skillId === id)
  sessions for skill:     sessionSkills.filter(ss => ss.skillId === id) -> sessions
  skills for session:     sessionSkills.filter(ss => ss.sessionId === id) -> skills
  corrections for goal:   goal.correctionIds.map(id => corrections.find(c => c.id === id))
  stage for skill:        getLatestAssessment().dimensions[skill.dimensionId]
*/

// ─── SKILL STATE PERSISTENCE ──────────────────────────────────────
// Persisted format (sparse — only non-default state):
// [{id: 'pirouette', tracked: false, flagged: true}]
//
// loadUserSkillState() merges onto runtime skills after storage.load().
// Skills missing from persisted array default to tracked:false, flagged:false.
// New skills added to DATA.skills in future app versions appear with defaults automatically.
