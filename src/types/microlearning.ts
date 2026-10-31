export interface SpacedReviewItem {
  id: string;
  conceptId: string;
  conceptTitle: string;
  lessonSlug: string;
  lessonTitle: string;
  category: string;
  retrievalQuestion: string;
  contextHint: string;
  keyTakeaway: string;
  explanation: string;
  lastReviewedAt: string | null;
  nextReviewDue: string; // YYYY-MM-DD
  intervalDays: number; // 1, 3, 7, 14, 30
  streak: number;
  easeFactor: number; // default 2.5
  masteryState: 'new' | 'learning' | 'reviewing' | 'mastered';
  reviewHistory: Array<{
    date: string;
    outcome: 'struggled' | 'recalled' | 'mastered';
    userResponse?: string;
  }>;
}

export type KnowledgeCategory =
  | 'explanation' // In my own words
  | 'principle' // Core CRO principle
  | 'store_observation' // Real store observation
  | 'problem' // Potential conversion leak
  | 'hypothesis' // Testable hypothesis & fix
  | 'corrected_mistake' // Mistake I corrected
  | 'unresolved_question'; // Unresolved question / to research

export interface KnowledgeEntry {
  id: string;
  title: string;
  category: KnowledgeCategory;
  content: string;
  userSelfExplanation?: string;
  sourceLessonSlug?: string;
  sourceLessonTitle?: string;
  storeName?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export type StorefrontSurface =
  | 'homepage'
  | 'collection'
  | 'pdp'
  | 'cart'
  | 'checkout'
  | 'trust'
  | 'product_info'
  | 'offers_aov'
  | 'mobile'
  | 'metrics_stats';

export interface CroLabScenario {
  id: string;
  title: string;
  surface: StorefrontSurface;
  surfaceLabel: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  storeContext: {
    name: string;
    niche: string;
    monthlyTraffic: string;
    baselineCvr: string;
    aov: string;
    mobilePercent: string;
    primaryComplaint: string;
  };
  observedEvidence: string[];
  mockup: {
    headline: string;
    device: 'mobile' | 'desktop';
    visualAnnotations: Array<{
      label: string;
      description: string;
      tagType: 'friction' | 'neutral' | 'opportunity';
    }>;
  };
  guidingPrompts: {
    evidencePrompt: string;
    interpretationPrompt: string;
    hypothesisPrompt: string;
    changePrompt: string;
    measurementPrompt: string;
  };
  workedExample: {
    observedEvidence: string;
    behavioralInterpretation: string;
    testableHypothesis: string;
    recommendedChange: string;
    validationMethod: string;
    coachReasoning: string;
  };
  commonTraps: string[];
  caveats: string;
}

export interface MicroSessionFeedback {
  score: 'strong' | 'good' | 'needs_expansion';
  strengths: string[];
  missingPoints: string[];
  coachingHint: string;
  refinedExplanation: string;
}
