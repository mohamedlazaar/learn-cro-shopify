import { UserProfile, GamificationState } from '../types/user';
import { StoreAudit, Experiment, CapstoneDeliverable, CaseStudy, PlaygroundSnippet } from '../types/tools';

export interface AppDatabaseSchema {
  profile: UserProfile | null;
  gamification: GamificationState;
  completedLessons: Record<string, { completedAt: string; checklist: Record<number, boolean> }>;
  completedExercises: Record<string, { completedAt: string; submission?: any; xpEarned: number }>;
  completedQuizzes: Record<string, {
    completedAt: string;
    score: number;
    attempts: number;
    xpEarned: number;
    userAnswers?: Record<number, number>;
    totalQuestions?: number;
  }>;
  lessonNotes: Record<string, { content: string; updatedAt: string }>;
  audits: StoreAudit[];
  experiments: Experiment[];
  capstoneDeliverables: CapstoneDeliverable[];
  caseStudy: CaseStudy | null;
  snippets: PlaygroundSnippet[];
}

const STORAGE_KEY = 'cro_lab_state_v1';

export const defaultGamification: GamificationState = {
  xp: 0,
  level: 1,
  streak: 1,
  longestStreak: 1,
  freezesLeft: 2,
  lastActivityDate: new Date().toISOString().split('T')[0],
  badges: ['welcome-pioneer'],
};

export const defaultProfile: UserProfile = {
  id: 'usr_default',
  name: 'Shopify Dev',
  email: 'developer@example.com',
  experienceLevel: 'intermediate',
  weeklyHoursGoal: 6,
  weeklyLessonsGoal: 4,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
  enrolledDate: new Date().toISOString(),
  onboardingCompleted: true,
};

export const defaultInitialState: AppDatabaseSchema = {
  profile: null,
  gamification: defaultGamification,
  completedLessons: {},
  completedExercises: {},
  completedQuizzes: {},
  lessonNotes: {},
  audits: [],
  experiments: [],
  capstoneDeliverables: [],
  caseStudy: null,
  snippets: [],
};

export function mergeStates(base: AppDatabaseSchema, incoming: AppDatabaseSchema): AppDatabaseSchema {
  if (!incoming) return base || defaultInitialState;
  if (!base) return incoming || defaultInitialState;

  const mergedBadges = Array.from(new Set([
    ...(base.gamification?.badges || []),
    ...(incoming.gamification?.badges || []),
  ]));

  const mergedGamification: GamificationState = {
    xp: Math.max(base.gamification?.xp || 0, incoming.gamification?.xp || 0),
    level: Math.max(base.gamification?.level || 1, incoming.gamification?.level || 1),
    streak: Math.max(base.gamification?.streak || 0, incoming.gamification?.streak || 0),
    longestStreak: Math.max(base.gamification?.longestStreak || 0, incoming.gamification?.longestStreak || 0),
    freezesLeft: incoming.gamification?.freezesLeft !== undefined ? incoming.gamification.freezesLeft : (base.gamification?.freezesLeft ?? 2),
    lastActivityDate: (incoming.gamification?.lastActivityDate && incoming.gamification.lastActivityDate > (base.gamification?.lastActivityDate || ''))
      ? incoming.gamification.lastActivityDate
      : (base.gamification?.lastActivityDate || new Date().toISOString().split('T')[0]),
    badges: mergedBadges.length > 0 ? mergedBadges : ['welcome-pioneer'],
  };

  // Merge audits by ID
  const auditMap = new Map<string, StoreAudit>();
  (base.audits || []).forEach(a => auditMap.set(a.id, a));
  (incoming.audits || []).forEach(a => {
    const existing = auditMap.get(a.id);
    if (!existing || (a.updatedAt && (!existing.updatedAt || a.updatedAt >= existing.updatedAt))) {
      auditMap.set(a.id, a);
    }
  });

  // Merge experiments by ID
  const expMap = new Map<string, Experiment>();
  (base.experiments || []).forEach(e => expMap.set(e.id, e));
  (incoming.experiments || []).forEach(e => expMap.set(e.id, e));

  // Merge deliverables by ID
  const delivMap = new Map<number, CapstoneDeliverable>();
  (base.capstoneDeliverables || []).forEach(d => delivMap.set(d.id, d));
  (incoming.capstoneDeliverables || []).forEach(d => {
    const existing = delivMap.get(d.id);
    if (!existing || (d.status === 'completed' && existing.status !== 'completed') || d.completedAt) {
      delivMap.set(d.id, d);
    }
  });

  return {
    profile: incoming.profile || base.profile,
    gamification: mergedGamification,
    completedLessons: {
      ...(base.completedLessons || {}),
      ...(incoming.completedLessons || {}),
    },
    completedExercises: {
      ...(base.completedExercises || {}),
      ...(incoming.completedExercises || {}),
    },
    completedQuizzes: {
      ...(base.completedQuizzes || {}),
      ...(incoming.completedQuizzes || {}),
    },
    lessonNotes: {
      ...(base.lessonNotes || {}),
      ...(incoming.lessonNotes || {}),
    },
    audits: Array.from(auditMap.values()),
    experiments: Array.from(expMap.values()),
    capstoneDeliverables: Array.from(delivMap.values()),
    caseStudy: incoming.caseStudy || base.caseStudy,
    snippets: incoming.snippets?.length ? incoming.snippets : (base.snippets || []),
  };
}

// IndexedDB Helper with LocalStorage fallback
const DB_NAME = 'CROLabDB';
const DB_VERSION = 1;
const STORE_NAME = 'app_state';

function openDB(): Promise<IDBDatabase | null> {
  if (typeof window === 'undefined' || !window.indexedDB) {
    return Promise.resolve(null);
  }
  return new Promise((resolve) => {
    try {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

export async function loadStateFromDB(): Promise<AppDatabaseSchema> {
  let localState: AppDatabaseSchema | null = null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      localState = { ...defaultInitialState, ...JSON.parse(raw) };
    }
  } catch (err) {
    console.warn('LocalStorage load failed', err);
  }

  let idbState: AppDatabaseSchema | null = null;
  try {
    const db = await openDB();
    if (db) {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get('root');
      const result = await new Promise<AppDatabaseSchema | null>((resolve) => {
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      });
      if (result) {
        idbState = { ...defaultInitialState, ...result };
      }
    }
  } catch (err) {
    console.warn('IndexedDB load failed', err);
  }

  if (localState && idbState) {
    return mergeStates(localState, idbState);
  }
  if (localState) {
    return localState;
  }
  if (idbState) {
    return idbState;
  }

  return defaultInitialState;
}

export async function saveStateToDB(state: AppDatabaseSchema): Promise<void> {
  // Always mirror in localStorage for instant synchronous persistence
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.warn('LocalStorage save failed', err);
  }

  try {
    const db = await openDB();
    if (db) {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put(state, 'root');
    }
  } catch (err) {
    console.warn('IndexedDB save failed', err);
  }
}

export function exportAppStateJSON(state: AppDatabaseSchema): string {
  return JSON.stringify(state, null, 2);
}

export function importAppStateJSON(jsonString: string): AppDatabaseSchema {
  const parsed = JSON.parse(jsonString);
  return { ...defaultInitialState, ...parsed };
}
