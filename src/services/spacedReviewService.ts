import { SpacedReviewItem } from '../types/microlearning';
export type { SpacedReviewItem };

const STORAGE_KEY = 'cro_spaced_reviews_v1';

// Initial high-yield CRO concepts curated from the curriculum
export const INITIAL_REVIEW_ITEMS: SpacedReviewItem[] = [
  {
    id: 'rev-mde-sample-size',
    conceptId: 'mde-stat-power',
    conceptTitle: 'Minimum Detectable Effect (MDE) & Sample Size',
    lessonSlug: 'lesson-6',
    lessonTitle: 'Sample Size, MDE & Test Duration Math',
    category: 'Statistics & Math',
    retrievalQuestion: 'Why does wanting to detect a smaller conversion lift (e.g. +2% vs +15%) require a vastly larger sample size?',
    contextHint: 'Think about statistical noise, variance, and the difference between detecting a whisper versus a shout.',
    keyTakeaway: 'Sample size scales inversely with the square of the effect size: detecting a 2% lift requires roughly 50x more visitors than detecting a 15% lift.',
    explanation: 'When an effect is tiny (+2%), random daily fluctuations (noise) can easily mask or simulate that lift. To distinguish true lift from random noise with 80% statistical power, you need exponentially more observations (the sample size scales with 1 / MDE²).',
    lastReviewedAt: null,
    nextReviewDue: new Date().toISOString().split('T')[0], // Due today
    intervalDays: 1,
    streak: 0,
    easeFactor: 2.5,
    masteryState: 'new',
    reviewHistory: [],
  },
  {
    id: 'rev-above-the-fold-pdp',
    conceptId: 'pdp-above-fold',
    conceptTitle: 'The Above-the-Fold Fallacy on Mobile PDPs',
    lessonSlug: 'lesson-9',
    lessonTitle: 'Anatomy of an 8-Figure Shopify PDP',
    category: 'Storefront Surfaces',
    retrievalQuestion: 'Why can cramming price, reviews, buy buttons, trust badges, and variants into the first 600px of mobile screens actually harm conversion?',
    contextHint: 'Consider cognitive load, accidental clicks, and the psychological state of a first-time mobile shopper.',
    keyTakeaway: 'Shoppers scroll naturally on mobile; cramming creates visual panic. Prioritize clear product comprehension before demanding a purchase decision.',
    explanation: 'Users need visual confirmation and value clarity before they are psychologically ready to evaluate price or click Buy. Cramming creates visual friction, micro-clutter, and forces users to make decisions before they understand what they are buying.',
    lastReviewedAt: null,
    nextReviewDue: new Date().toISOString().split('T')[0], // Due today
    intervalDays: 1,
    streak: 0,
    easeFactor: 2.5,
    masteryState: 'new',
    reviewHistory: [],
  },
  {
    id: 'rev-srm-flicker',
    conceptId: 'srm-detection',
    conceptTitle: 'Sample Ratio Mismatch (SRM) & Invalid Tests',
    lessonSlug: 'lesson-7',
    lessonTitle: 'Building a Flicker-Free Shopify A/B Testing Framework',
    category: 'Experimentation Rigor',
    retrievalQuestion: 'If an A/B test allocated 50/50 shows 10,000 visitors on Control and 8,950 on Variant, why must you immediately stop and invalidate the experiment?',
    contextHint: 'Think about traffic allocation bias, redirect loops, or JS execution crashes.',
    keyTakeaway: 'A Chi-Square p-value < 0.001 indicates an SRM. The variants are not comparing identical populations, making any conversion numbers completely unreliable.',
    explanation: 'An SRM means one variant is systematically dropping users—often due to slow redirect flicker, JavaScript console errors crashing tracking pixels, or bot filters. Because the underlying sample is biased, you are no longer comparing apples to apples.',
    lastReviewedAt: null,
    nextReviewDue: new Date().toISOString().split('T')[0], // Due today
    intervalDays: 1,
    streak: 0,
    easeFactor: 2.5,
    masteryState: 'new',
    reviewHistory: [],
  },
  {
    id: 'rev-cart-drawer-trust',
    conceptId: 'cart-shipping-transparency',
    conceptTitle: 'Shipping Cost Transparency in the Cart Drawer',
    lessonSlug: 'lesson-10',
    lessonTitle: 'Cart Drawer & Slide-Out Friction Elimination',
    category: 'Storefront Surfaces',
    retrievalQuestion: 'What is the primary psychological friction point that causes 60%+ of cart abandonments at the first checkout step?',
    contextHint: 'Think about surprises, hidden fees, and threshold progress bars.',
    keyTakeaway: 'Unexpected shipping and tax fees at checkout are the #1 cart abandonment killer. Dynamic free shipping progress bars in the cart drawer eliminate fee shock.',
    explanation: 'Shoppers build a mental budget while browsing. When unexpected fees appear only after they enter their email/address at checkout, it triggers a feeling of deception and sticker shock. Communicating shipping thresholds early in the cart drawer builds trust and increases AOV.',
    lastReviewedAt: null,
    nextReviewDue: new Date().toISOString().split('T')[0],
    intervalDays: 3,
    streak: 1,
    easeFactor: 2.5,
    masteryState: 'learning',
    reviewHistory: [],
  },
];

export function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

export function loadSpacedReviews(): SpacedReviewItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to load spaced reviews from storage:', err);
  }
  // Initialize with curated items
  saveSpacedReviews(INITIAL_REVIEW_ITEMS);
  return INITIAL_REVIEW_ITEMS;
}

export function saveSpacedReviews(items: SpacedReviewItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save spaced reviews:', err);
  }
}

export function getDueReviews(): SpacedReviewItem[] {
  const all = loadSpacedReviews();
  const today = getTodayDateString();
  return all.filter((item) => item.nextReviewDue <= today);
}

export function recordReviewAttempt(
  itemId: string,
  outcome: 'struggled' | 'recalled' | 'mastered',
  userResponse?: string
): SpacedReviewItem[] {
  const items = loadSpacedReviews();
  const today = getTodayDateString();

  const updated = items.map((item) => {
    if (item.id !== itemId) return item;

    let newInterval: number;
    let newStreak = item.streak;
    let newMastery = item.masteryState;

    if (outcome === 'struggled') {
      newInterval = 1; // Repeat tomorrow
      newStreak = 0;
      newMastery = 'learning';
    } else if (outcome === 'recalled') {
      newStreak += 1;
      // Leitner/SM-2 intervals: 1 -> 3 -> 7 -> 14 -> 30
      if (item.intervalDays <= 1) newInterval = 3;
      else if (item.intervalDays <= 3) newInterval = 7;
      else if (item.intervalDays <= 7) newInterval = 14;
      else newInterval = 30;
      newMastery = newInterval >= 14 ? 'mastered' : 'reviewing';
    } else {
      // 'mastered'
      newStreak += 2;
      newInterval = Math.max(item.intervalDays * 2, 14);
      newMastery = 'mastered';
    }

    // Calculate next due date
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + newInterval);
    const nextDueStr = nextDate.toISOString().split('T')[0];

    return {
      ...item,
      lastReviewedAt: today,
      nextReviewDue: nextDueStr,
      intervalDays: newInterval,
      streak: newStreak,
      masteryState: newMastery,
      reviewHistory: [
        ...item.reviewHistory,
        {
          date: today,
          outcome,
          userResponse,
        },
      ],
    };
  });

  saveSpacedReviews(updated);
  return updated;
}

export function registerConceptForReview(
  conceptId: string,
  conceptTitle: string,
  lessonSlug: string,
  lessonTitle: string,
  category: string,
  retrievalQuestion: string,
  keyTakeaway: string,
  explanation: string
): void {
  const items = loadSpacedReviews();
  const existing = items.find((i) => i.conceptId === conceptId || i.lessonSlug === lessonSlug);

  if (existing) {
    return; // Already registered
  }

  // Schedule for tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const newItem: SpacedReviewItem = {
    id: `rev-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    conceptId,
    conceptTitle,
    lessonSlug,
    lessonTitle,
    category,
    retrievalQuestion,
    contextHint: 'Recall the core principle and reason why this behavior occurs on real Shopify stores.',
    keyTakeaway,
    explanation,
    lastReviewedAt: null,
    nextReviewDue: tomorrow.toISOString().split('T')[0],
    intervalDays: 1,
    streak: 0,
    easeFactor: 2.5,
    masteryState: 'new',
    reviewHistory: [],
  };

  saveSpacedReviews([newItem, ...items]);
}
