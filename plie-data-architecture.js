/**
 * PLIÉ — DATA ARCHITECTURE v2.1
 *
 * Changes from v2:
 * - Correction.source now includes 'praise' for praise-mode blocks
 * - Correction.type includes 'praise'
 * - SkillNote.skillId can be null (session-level reflections)
 * - Goal.category now set via free-text input + prior suggestions (not chip grid)
 * - normaliseStr() used for all text matching (accent-insensitive)
 * - Praise blocks write milestone TimelineEntry in addition to Corrections
 * - STORAGE_KEYS includes plie:onboardingComplete
 */

// ─── SKILL ───────────────────────────────────────────────────────
const Skill = {
  id: String, french: String, phonetic: String, english: String,
  difficulty: String, category: String, dimensionId: String,
  aliases: Array,       // searched in skill library (accent-normalised)
  // Runtime only (merged from persisted sparse state):
  tracked: Boolean, flagged: Boolean, phoneticVisible: Boolean,
};

// ─── CORRECTION ──────────────────────────────────────────────────
// One object per bullet. Multiple bullets = multiple Correction objects
// sharing the same sessionId + skillId.
const Correction = {
  id: Number,
  skillId: String,     // required FK → Skill.id
  text: String,        // single correction string
  createdAt: Number,
  sessionId: Number,   // optional FK → Session.id
  source: String,      // 'teacher' | 'praise' | 'self' | 'video-review'
  type: String,        // 'praise' | 'technical' | 'artistic' | null
  isRecurring: Boolean,
};

// ─── SESSION ─────────────────────────────────────────────────────
const Session = {
  id: Number, date: String, savedAt: Number,
  templateId: Number, sessionName: String,
  sessionLocation: String, classType: String, notes: String,
};

// ─── SESSION BLOCK — in-memory only ─────────────────────────────
const SessionBlock = {
  id: Number,
  topicId: String,     // 'general' | category | 'skill:pirouette'
  title: String,
  notes: String, notesOpen: Boolean,
  mode: String,        // 'correction' | 'praise' | 'reflection'
  corrections: Array,  // string[] — each non-empty → Correction on save
  reflectionText: String,
};

// ─── SESSION TEMPLATE ────────────────────────────────────────────
const SessionTemplate = {
  id: Number, name: String, location: String,
  classType: String, days: Array,
};

// ─── SESSION SKILL ────────────────────────────────────────────────
const SessionSkill = {
  id: Number, sessionId: Number, skillId: String,
  notes: String, correctionIds: Array,
  tracked: Boolean, blockTitle: String, mode: String,
};

// ─── SKILL NOTE ───────────────────────────────────────────────────
// Personal notes. skillId may be null for session-level reflections.
const SkillNote = {
  id: Number,
  skillId: String,     // FK → Skill.id | null (null = session-level)
  text: String, date: String, createdAt: Number,
  isReflection: Boolean,
};

// ─── GOAL ────────────────────────────────────────────────────────
const Goal = {
  id: Number, title: String, body: String,
  createdAt: Number, dueDate: String,
  skillId: String, dimensionId: String,
  category: String,    // free text; set via + input with prior category suggestions
  correctionIds: Array, // shown on card; struck-through when completedAt is set
  milestones: Array,   // [{id, text, done}] — Enter key adds next
  completedAt: Number, // null=active; set=complete; swipe-right to reopen
};

// ─── ASSESSMENT ───────────────────────────────────────────────────
const Assessment = {
  id: Number, type: String, date: String, completedAt: Number,
  answers: Object,
  dimensions: Object,  // {barre:{stage,stageLabel,progressWithin,raw}, ...}
  level: String, levelLabel: String, levelDescription: String,
};

// ─── TIMELINE ENTRY ───────────────────────────────────────────────
// Intentionally sparse. No correction-level detail.
// Reflections NOT stored here — they're SkillNote {isReflection:true}
// merged into the timeline at render time in initProfile().
const TimelineEntry = {
  id: Number,
  type: String,    // 'session' | 'assessment' | 'milestone' | 'manual'
  objectId: Number,
  title: String, body: String, date: String, createdAt: Number,
};

// Praise blocks write an extra milestone entry:
//   { type: 'milestone', objectId: session.id,
//     title: block.title || firstBullet, body: skill.french | null }

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
};

// ─── NORMALISATION ────────────────────────────────────────────────
// normaliseStr() strips accents + lowercases for matching.
// Used in: searchGoalCorrections, updateSkillLibResults
//
//   function normaliseStr(str) {
//     return (str||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
//   }
//
// Enables: fouetté → fouette, Développé → developpe, etc.

// ─── RELATIONSHIPS ────────────────────────────────────────────────
/*
  Skill     (1) ──── (many) Correction     via Correction.skillId
  Session   (1) ──── (many) Correction     via Correction.sessionId [optional]
  Session   (1) ──── (many) SessionSkill   via SessionSkill.sessionId
  Skill     (1) ──── (many) SessionSkill   via SessionSkill.skillId
  SessionSkill ────  (many) Correction     via SessionSkill.correctionIds[]
  Goal      (0..1) ─ (1)    Skill          via Goal.skillId [optional]
  Goal      ──────── (many) Correction     via Goal.correctionIds[]
  Skill     (1) ──── (many) SkillNote      via SkillNote.skillId
  Session   (1) ──── (1)    TimelineEntry  via TimelineEntry.objectId
  Session   (1) ──── (0..1) TimelineEntry  via praise block milestone

  Skill state persistence (sparse):
    Persisted: [{id, tracked, flagged}] — only non-default entries
    loadUserSkillState() merges onto runtime skills at startup
    New skills added to DATA.skills default to false automatically
*/
