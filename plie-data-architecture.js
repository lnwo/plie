/**
 * PLIÉ — DATA ARCHITECTURE v2.2
 *
 * Changes from v2.1:
 * - appState: hidePointe, profilePicture, displayName added
 * - STORAGE_KEYS: plie:preferences added
 * - FOCUS_AREAS runtime constant documented
 * - File structure updated to reflect modular JS split
 */

// ─── SKILL ───────────────────────────────────────────────────────
const Skill = {
  id: String, french: String, phonetic: String, english: String,
  difficulty: String, category: String, dimensionId: String,
  aliases: Array,
  // Runtime only (merged from persisted sparse state):
  tracked: Boolean, flagged: Boolean, phoneticVisible: Boolean,
  // Deferred — not yet built:
  // contributingDimensions: Array,
};

// ─── CORRECTION ──────────────────────────────────────────────────
const Correction = {
  id: Number,
  skillId: String,
  text: String,
  createdAt: Number,
  sessionId: Number,
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
  corrections: Array,
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
const SkillNote = {
  id: Number,
  skillId: String,     // FK → Skill.id | null (null = session-level reflection)
  text: String, date: String, createdAt: Number,
  isReflection: Boolean,
};

// ─── GOAL ────────────────────────────────────────────────────────
const Goal = {
  id: Number, title: String, body: String,
  createdAt: Number, dueDate: String,
  skillId: String, dimensionId: String,
  category: String,
  correctionIds: Array,
  milestones: Array,   // [{id, text, done}]
  completedAt: Number,
};

// ─── ASSESSMENT ───────────────────────────────────────────────────
const Assessment = {
  id: Number, type: String, date: String, completedAt: Number,
  answers: Object,
  dimensions: Object,
  level: String, levelLabel: String, levelDescription: String,
};

// ─── TIMELINE ENTRY ───────────────────────────────────────────────
const TimelineEntry = {
  id: Number,
  type: String,    // 'session' | 'assessment' | 'milestone' | 'manual'
  objectId: Number,
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
  preferences:        'plie:preferences',  // { hidePointe, profilePicture, displayName }
};

// ─── APP STATE ADDITIONS (v5.0) ───────────────────────────────────
// These fields added to appState alongside existing fields:
//
//   hidePointe:     Boolean  — hides pointe from profile, skills, goals, assess
//   profilePicture: String   — data URL (uploaded) or default key e.g. 'default-bun'
//   displayName:    String   — optional display name shown on status card

// ─── FOCUS AREAS (runtime constant, not persisted) ────────────────
// Each area has: id, name, icon, optIn?, subdims?, getDims(), getStats()
// Rendered back→front: pointe · artistry · body · movement · technique
//
// Areas and their sub-dimensions:
//   technique  — (single)              — barre + centre questions averaged
//   movement   — turns, allegro        — pirouette + allegro questions
//   body       — flexibility, strength, turnout — existing + new questions
//   artistry   — (single)              — musicality question
//   pointe     — (single, opt-in)      — pointe question

// ─── NORMALISATION ────────────────────────────────────────────────
// normaliseStr() strips accents + lowercases for matching.
//   function normaliseStr(str) {
//     return (str||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
//   }

// ─── RELATIONSHIPS ────────────────────────────────────────────────
/*
  Skill     (1) ──── (many) Correction     via Correction.skillId
  Session   (1) ──── (many) Correction     via Correction.sessionId
  Session   (1) ──── (many) SessionSkill   via SessionSkill.sessionId
  Skill     (1) ──── (many) SessionSkill   via SessionSkill.skillId
  SessionSkill ────  (many) Correction     via SessionSkill.correctionIds[]
  Goal      (0..1) ─ (1)    Skill          via Goal.skillId
  Goal      ──────── (many) Correction     via Goal.correctionIds[]
  Skill     (1) ──── (many) SkillNote      via SkillNote.skillId
  Session   (1) ──── (1)    TimelineEntry  via TimelineEntry.objectId

  Skill state persistence (sparse):
    Persisted: [{id, tracked, flagged}] — only non-default entries
    loadUserSkillState() merges onto runtime skills at startup
*/
