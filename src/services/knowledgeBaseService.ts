import { KnowledgeEntry, KnowledgeCategory } from '../types/microlearning';

const STORAGE_KEY = 'cro_personal_knowledge_base_v1';

export const INITIAL_KNOWLEDGE_ENTRIES: KnowledgeEntry[] = [
  {
    id: 'kb-init-1',
    title: 'The MECLABS Conversion Heuristic in Simple Terms',
    category: 'principle',
    content: 'C = 4m + 3v + 2(i-f) - 2a. Motivation (m) is the most powerful variable (4x weight) because high customer desire overcomes bad design. Value Proposition (v, 3x) answers "Why should I buy from you vs competitor?". Incentive (i) minus Friction (f) matters, and Anxiety (a, 2x) must be actively countered with guarantees and clear delivery dates.',
    userSelfExplanation: 'You cannot fix zero product-market fit or cold traffic with button color tweaks. Motivation and clarity of value do 80% of the heavy lifting.',
    sourceLessonSlug: 'lesson-1',
    sourceLessonTitle: 'Introduction to Conversion Rate Optimization for Shopify',
    tags: ['Heuristics', 'Psychology', 'Foundations'],
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'kb-init-2',
    title: 'Why Statistical Significance Is Not a Stopping Rule',
    category: 'corrected_mistake',
    content: 'Checking an A/B test daily and stopping as soon as p < 0.05 is called "peeking". It inflates false positive error rates up to 30-40%. Tests must run for their pre-calculated sample size AND at least two full business cycles (14 days) to account for day-of-week seasonality.',
    userSelfExplanation: 'Never stop a test early just because it looks green on day 3. Wait until sample size is met and 2 full cycles finish.',
    sourceLessonSlug: 'lesson-6',
    sourceLessonTitle: 'Sample Size, MDE & Test Duration Math',
    tags: ['Statistics', 'A/B Testing', 'Mistakes'],
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'kb-init-3',
    title: 'Mobile Thumb-Zone & Sticky Add-to-Cart Behavior',
    category: 'store_observation',
    content: 'On long Shopify PDPs with 5+ scroll depths, users lose sight of the primary CTA. If they have to scroll back up 1200px to purchase, drop-off spikes. A bottom-anchored sticky bar appearing only after the primary CTA scrolls out of view increases mobile add-to-cart clicks without obscuring product photos.',
    userSelfExplanation: 'Sticky ATC is like an ever-present cashier. It should be subtle, respect the bottom safe-area on iOS, and trigger only when the main button leaves the viewport.',
    sourceLessonSlug: 'lesson-9',
    sourceLessonTitle: 'Anatomy of an 8-Figure Shopify PDP',
    tags: ['Mobile UX', 'PDP', 'Shopify Theme'],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export function loadKnowledgeBase(): KnowledgeEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to load knowledge base from storage:', err);
  }
  saveKnowledgeBase(INITIAL_KNOWLEDGE_ENTRIES);
  return INITIAL_KNOWLEDGE_ENTRIES;
}

export function saveKnowledgeBase(entries: KnowledgeEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (err) {
    console.error('Failed to save knowledge base:', err);
  }
}

export function addKnowledgeEntry(entry: Omit<KnowledgeEntry, 'id' | 'createdAt' | 'updatedAt'>): KnowledgeEntry {
  const all = loadKnowledgeBase();
  const newEntry: KnowledgeEntry = {
    ...entry,
    id: `kb-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const updated = [newEntry, ...all];
  saveKnowledgeBase(updated);
  return newEntry;
}

export function updateKnowledgeEntry(id: string, updates: Partial<KnowledgeEntry>): KnowledgeEntry[] {
  const all = loadKnowledgeBase();
  const updated = all.map((entry) => {
    if (entry.id !== id) return entry;
    return {
      ...entry,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
  });
  saveKnowledgeBase(updated);
  return updated;
}

export function deleteKnowledgeEntry(id: string): KnowledgeEntry[] {
  const all = loadKnowledgeBase();
  const updated = all.filter((e) => e.id !== id);
  saveKnowledgeBase(updated);
  return updated;
}

export function searchKnowledgeBase(query: string, category?: KnowledgeCategory | 'all'): KnowledgeEntry[] {
  const all = loadKnowledgeBase();
  let list = all;
  if (category && category !== 'all') {
    list = list.filter((e) => e.category === category);
  }
  if (!query.trim()) return list;

  const q = query.toLowerCase();
  return list.filter(
    (e) =>
      e.title.toLowerCase().includes(q) ||
      e.content.toLowerCase().includes(q) ||
      (e.userSelfExplanation && e.userSelfExplanation.toLowerCase().includes(q)) ||
      e.tags.some((t) => t.toLowerCase().includes(q))
  );
}
