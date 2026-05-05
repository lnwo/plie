/**
 * PLIÉ — DATA ARCHITECTURE v3.2
 *
 * Changes from v3.1 (PLI-006):
 * - Entity: new model — teachers[], venues[], cities[] suggestion lists
 * - Session: teacher, venue, city fields added (string | null)
 * - SessionSkill: teacher, venue, city fields added (inherited from session at save)
 *
 * Changes from v3.0:
 * - Condition: new model added (PLI-005) — injuries, chronic conditions, structural body facts
 * - SessionSkill: bodyTag field added
 * - TimelineEntry: 'note', 'condition-activated', 'condition-resolved' type values added
 *
 * Changes from v2.2:
 * - Skill: dimensionId (String) → dimensionIds (Array); category → categoryId
 * - Correction: id/sessionId → String; userId added; isPinned, isResolved,
 *   derivedFromCorrectionId, previousBlockType added; 'praise' removed from source union
 * - Session: id → String; userId added
 * - SessionBlock: retired — replaced by SessionSkill with blockType field
 * - SessionTemplate: id → String
 * - SessionSkill: id/sessionId → String; userId added; mode → blockType;
 *   isPinned, previousBlockType added
 * - SkillNote: id → String; userId added
 * - Goal: fully updated — goalType, progressMarkers, status, howOften, etc.
 * - Assessment: id → String
 * - TimelineEntry: id/objectId → String
 * - STORAGE_KEYS: updated to current full set
 * - Block type enum documented
 * - Dimension model updated to current five
 */

// ─── BLOCK TYPE ENUM ─────────────────────────────────────────────
// Final set — use exactly these strings. Never 'observation' in new code.
// 'observation' is retired: any observation blocks in localStorage are
// migrated silently to 'note' on app open.
//
//   'correction' | 'note' | 'goal' | 'intention' | 'highlight' | 'choreography'

// ─── SKILL ───────────────────────────────────────────────────────
const Skill = {
  id: String,
  french: String, phonetic: String, english: String,
  difficulty: String,
  categoryId: String,     // 'barre'|'centre'|'turns'|'allegro'|'artistry'|'body-and-technique'
  dimensionIds: Array,    // ['technique'|'movement'|'artistry'|'the-body'|'pointe']
  aliases: Array,
  // Runtime only (merged from persisted sparse state — never written to storage directly):
  tracked: Boolean, flagged: Boolean, phoneticVisible: Boolean,
};

// ─── CORRECTION ──────────────────────────────────────────────────
const Correction = {
  id: String,             // crypto.randomUUID()
  userId: null,
  skillId: String,
  text: String,
  createdAt: Number,
  sessionId: String,
  source: String,         // 'teacher' | 'self' | 'video-review'
  type: String,           // 'technical' | 'artistic' | null
  isRecurring: Boolean,   // derived state — recalculated on every save, never set manually
  isPinned: Boolean,
  isResolved: Boolean,
  derivedFromCorrectionId: String,  // null if original
  previousBlockType: String,        // null if not converted from another block type
};

// ─── SESSION ─────────────────────────────────────────────────────
const Session = {
  id: String,             // crypto.randomUUID()
  userId: null,
  date: String,
  savedAt: Number,
  templateId: String,
  sessionName: String,
  sessionLocation: String,
  classType: String,
  notes: String,
};

// ─── SESSION TEMPLATE ────────────────────────────────────────────
const SessionTemplate = {
  id: String,             // crypto.randomUUID()
  name: String, location: String,
  classType: String, days: Array,
};

// ─── SESSION SKILL ────────────────────────────────────────────────
// Represents one block within a session (was "SessionBlock" in-memory + "SessionSkill" persisted).
const SessionSkill = {
  id: String,             // crypto.randomUUID()
  userId: null,
  sessionId: String,
  skillId: String,        // null for general/unlinked blocks
  notes: String,
  correctionIds: Array,
  tracked: Boolean,
  blockTitle: String,
  blockType: String,      // see block type enum above
  isHighlight: Boolean,
  bodyTag: Boolean,
  isPinned: Boolean,
  previousBlockType: String,  // null if block type has never changed
};

// ─── SKILL NOTE ───────────────────────────────────────────────────
const SkillNote = {
  id: String,             // crypto.randomUUID()
  userId: null,
  skillId: String,        // FK → Skill.id | null (null = session-level)
  text: String, date: String, createdAt: Number,
  isReflection: Boolean,
};

// ─── GOAL ────────────────────────────────────────────────────────
const Goal = {
  id: String,             // crypto.randomUUID()
  userId: null,
  title: String,
  body: String,
  goalType: String,       // 'skill' | 'intention' | 'habit'
  skillId: String,
  dimensionId: String,
  progressMarkers: Array, // [{ text: String, done: Boolean }] — replaces milestones[]
  milestones: Array,      // legacy — always read via progressMarkers || milestones
  commitmentPeriod: String, // 'This week'|'Two weeks'|'This month'|'Three months'|'YYYY-MM-DD'
  howOften: String,       // habit goals only
  correctionIds: Array,
  completed: Boolean,
  status: String,         // 'active' | 'completed' | 'paused' | 'letgo'
  createdAt: Number,
  updatedAt: Number,
};

// ─── ASSESSMENT ───────────────────────────────────────────────────
const Assessment = {
  id: String,             // crypto.randomUUID()
  type: String, date: String, completedAt: Number,
  answers: Object,
  dimensions: Object,
  level: String, levelLabel: String, levelDescription: String,
};

// ─── TIMELINE ENTRY ───────────────────────────────────────────────
const TimelineEntry = {
  id: String,             // crypto.randomUUID()
  userId: null,
  type: String,           // 'session' | 'assessment' | 'milestone' | 'manual'
  objectId: String,
  title: String, body: String, date: String, createdAt: Number,
};

// ─── STORAGE KEYS ────────────────────────────────────────────────
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
  preferences:        'plie:preferences',    // { hidePointe, profilePicture, displayName, trainingState }
  learnBookmarks:     'plie:learnBookmarks', // [{ pageType, itemId, createdAt }]
  learnLineSaves:     'plie:learnLineSaves',    // tap-to-save state for learn key points
  promptsDismissed:   'plie:prompts-dismissed', // { [type]: timestamp } — prompt suppression
  // Note: 'collapsedSections' has no plie: prefix — { inFocus, savedLearning }
};

// ─── APP STATE (selected fields) ─────────────────────────────────
//
//   hidePointe:          Boolean  — hides pointe from profile, skills, goals
//   profilePicture:      String   — data URL or default key e.g. 'default-bun'
//   displayName:         String   — optional, shown on status card
//   trainingState:       String   — 'active' | 'resting' | 'recovering'
//   learnBookmarks:      Array    — [{ pageType, itemId, createdAt }]
//   learnLineSaves:      Array    — [{ lineText, saveType, objectId, pageType, itemId }]
//   collapsedSections:   Object   — { inFocus?: Boolean, savedLearning?: Boolean }
//   _goalDraft:          Object   — in-progress goal creator state
//   _snapshot:           Object   — copy of goal state at edit start
//   _isEdit:             Boolean  — true when editing an existing session
//   _skillLibDimFilter:  String   — active category filter in skill library (category display label, null = none)
//   _exploreAllDoneShown: Boolean — whether "explored everything" acknowledgement shown

// ─── DIMENSION MODEL (runtime constant) ───────────────────────────
// Five dimensions. Always-present: technique, movement, artistry, the-body.
// Opt-in: pointe (hidden when appState.hidePointe === true).
// Knowledge and Musicality are retired as dimensions — their orientation
// scores now contribute to 'artistry' in calculateResults().
// Musicality remains as a taggable skill in the library.
//
//   'technique' | 'movement' | 'artistry' | 'the-body' | 'pointe'

// ─── SKILL STATE PERSISTENCE (sparse model) ───────────────────────
// Only non-default entries are saved under 'plie:skills'.
// Full skill objects from data.js are never written to storage — only overrides.
//
//   Persisted: [{ id: String, tracked: Boolean, flagged: Boolean }]
//
//   persistSkillState()   — writes the sparse array after any tracked/flagged change
//   loadUserSkillState()  — merges sparse state onto runtime skills at startup

// ─── ENTITY ───────────────────────────────────────────────────────
// Three entity types — all share the same shape.
// Stored as suggestion lists only; sessions/blocks store the name string
// directly (not the entity id) so deletion does not affect past records.
const Entity = {
  id: String,    // crypto.randomUUID()
  userId: null,
  name: String,
};
// Persisted under 'plie:teachers', 'plie:venues', 'plie:cities'.
// Session and SessionSkill each carry teacher/venue/city as string | null.
// SessionSkill values are inherited from the session at save time.
// saveEntity(type, name)            — finds or creates; returns entity object
// deleteEntitySuggestion(type, id)  — removes from list; does not touch past records

// ─── CONDITION ────────────────────────────────────────────────────
// Covers injuries, chronic conditions, and structural body facts.
// All use the same model — no separate surface needed.
const Condition = {
  id: String,              // crypto.randomUUID()
  userId: null,
  name: String,
  description: String,     // optional
  startDate: String,       // YYYY-MM-DD
  status: String,          // 'active' | 'inactive' | 'archived'
  statusChangedDate: String, // YYYY-MM-DD — updated on every status change
  linkedNoteIds: Array,
  linkedSessionIds: Array,
};
// Persisted under 'plie:conditions'.
// Timeline prompt fires on transitions to 'active' (type: 'condition-activated')
// or 'archived' (type: 'condition-resolved'). Not on 'inactive'.

// ─── RELATIONSHIPS ────────────────────────────────────────────────
/*
  Skill       (1) ──── (many) Correction    via Correction.skillId
  Session     (1) ──── (many) Correction    via Correction.sessionId
  Session     (1) ──── (many) SessionSkill  via SessionSkill.sessionId
  Skill       (1) ──── (many) SessionSkill  via SessionSkill.skillId
  SessionSkill ───── (many)   Correction    via SessionSkill.correctionIds[]
  Goal        (0..1) ─ (1)    Skill         via Goal.skillId
  Goal        ──────── (many) Correction    via Goal.correctionIds[]
  Skill       (1) ──── (many) SkillNote     via SkillNote.skillId
  Session     (1) ──── (1)    TimelineEntry via TimelineEntry.objectId
*/

// ─── NORMALISATION ────────────────────────────────────────────────
// normaliseStr() strips accents + lowercases for matching.
//   function normaliseStr(str) {
//     return (str||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
//   }
