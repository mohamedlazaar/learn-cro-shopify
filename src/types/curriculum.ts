export type TrackType = 'cro' | 'dev';

export interface Phase {
  id: string;
  order: number;
  title: string;
  weeks: string;
  description: string;
  moduleIds: string[];
  trackId?: TrackType;
}

export interface Module {
  id: string;
  phaseId: string;
  order: number;
  title: string;
  summary: string;
  estimatedMinutes: number;
  lessonIds: string[];
  exerciseIds: string[];
  quizId: string;
  trackId?: TrackType;
}

export interface SectionPractice {
  id?: string;
  type?: 'multiple-choice' | 'scenario' | 'code' | 'calculation';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint?: string;
  xp?: number;
  arQuestion?: string;
  arOptions?: string[];
  arExplanation?: string;
  arHint?: string;
}

export interface LessonSection {
  heading: string;
  body: string;
  code?: string;
  language?: 'liquid' | 'javascript' | 'json' | 'html' | 'css' | 'bash' | 'markdown';
  callout?: {
    type: 'tip' | 'warning' | 'note' | 'shopify';
    text: string;
  };
  practice?: SectionPractice;
}

export interface VisualMetricLift {
  label: string;
  before: string;
  after: string;
  lift: string;
  isPositive?: boolean;
}

export interface VisualUiElement {
  label: string;
  subtext?: string;
  type: 'badge' | 'button' | 'price' | 'pill' | 'alert' | 'progress' | 'text' | 'variant' | 'stat_card';
  variant?: 'danger' | 'warning' | 'success' | 'info' | 'primary' | 'neutral';
  highlight?: boolean;
}

export interface VisualMockupState {
  title: string;
  tag: string;
  description: string;
  elements: VisualUiElement[];
  critiqueOrBenefits: string[];
}

export interface LessonVisualExample {
  id?: string;
  badge?: string;
  title: string;
  brandScenario: string;
  hypothesis: string;
  visualType: 'pdp' | 'cart' | 'checkout' | 'collection' | 'search' | 'ab_test' | 'metrics' | 'performance' | 'copywriting' | 'b2b' | 'international' | 'pricing' | 'social_proof' | 'general';
  metrics: VisualMetricLift[];
  baseline: VisualMockupState;
  optimized: VisualMockupState;
  keyTakeaways: string[];
  developerNotes: string;
  codeSnippet?: {
    title: string;
    language: 'liquid' | 'javascript' | 'css' | 'json';
    code: string;
  };
}

export interface LessonDeepDive {
  title: string;
  overview: string;
  realWorldScenario: string;
  technicalPlaybook: string[];
  clientPitchTip?: string;
}

export interface LessonVideoSource {
  title: string;
  embedUrl: string;
  channel?: string;
  duration?: string;
  description?: string;
  topics?: string[];
}

export interface LessonArabicTranslation {
  title: string;
  subtitle?: string;
  objectivesHead?: string;
  objectives: string[];
  sections: {
    heading: string;
    body: string;
    simpleExplanation?: string;
    calloutText?: string;
  }[];
  mistakesHead?: string;
  mistakes?: string[];
  checklistHead?: string;
  checklist?: string[];
  keyTakeaway?: string;
}

export interface LessonSimpleEnglish {
  coreIdea: string;
  simplifiedTerms: { term: string; simpleMeaning: string; analogy?: string }[];
  sectionSummaries?: { heading: string; simpleSummary: string }[];
  keyTakeaway: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  slug: string;
  title: string;
  estimatedMinutes: number;
  objectives: string[];
  sections: LessonSection[];
  visualExample?: LessonVisualExample;
  deepDive?: LessonDeepDive;
  videoSource?: LessonVideoSource;
  mistakes: string[];
  checklist: string[];
  furtherReading: {
    title: string;
    url: string;
  }[];
  arabicTranslation?: LessonArabicTranslation;
  simpleEnglish?: LessonSimpleEnglish;
}

export type ExerciseType =
  | 'multiple-choice'
  | 'fill-blank'
  | 'code'
  | 'liquid'
  | 'audit'
  | 'math'
  | 'writeup'
  | 'build';

export type ExerciseDifficulty = 'easy' | 'medium' | 'hard';

export interface ExerciseRubricItem {
  criterion: string;
  points: number;
  description: string;
}

export interface ExerciseBlank {
  id: string;
  label: string;
  answer: string;
  hint: string;
}

export interface Exercise {
  id: string;
  moduleId: string;
  slug: string;
  title: string;
  type: ExerciseType;
  difficulty: ExerciseDifficulty;
  xp: number;
  prompt: string;
  starterCode?: string;
  solution?: string;
  options?: string[];
  correctIndex?: number;
  explanation?: string;
  targetValues?: Record<string, number | string>;
  tolerance?: number;
  blanks?: ExerciseBlank[];
  rubric?: ExerciseRubricItem[];
  buildChecklist?: string[];
  starterWriteup?: string;
  minWordCount?: number;
  /** Renders an interactive simulated storefront above an audit exercise. */
  mockStore?: 'apparel';
  /** Optional 1-to-1 link to a specific lesson */
  lessonSlug?: string;
  /** Pre-loaded realistic dataset provided directly to the student so real store ownership is not needed */
  dataset?: Record<string, any>;
  datasetDescription?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  moduleId: string;
  slug: string;
  title: string;
  questions: QuizQuestion[];
}
