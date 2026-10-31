export type AuditSeverity = 'critical' | 'high' | 'medium' | 'low';

export type AuditCategory =
  | 'homepage'
  | 'collection'
  | 'pdp'
  | 'cart'
  | 'checkout'
  | 'performance'
  | 'mobile'
  | 'trust'
  | 'copy'
  | 'analytics';

export interface AuditItem {
  id: string;
  category: AuditCategory;
  severity: AuditSeverity;
  title: string;
  description: string;
  fixTip: string;
  codeSnippet?: string;
  impact: string;
}

export interface StoreAudit {
  id: string;
  storeName: string;
  storeUrl?: string;
  checkedItemIds: Record<string, boolean>;
  notes: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface ExperimentHypothesis {
  because: string;
  weBelieve: string;
  forAudience: string;
  willImpact: string;
  targetMetric: string;
}

export interface Experiment {
  id: string;
  title: string;
  status: 'planned' | 'running' | 'done';
  hypothesis: ExperimentHypothesis;
  baselineCvr: number; // e.g. 2.5%
  mde: number; // relative % e.g. 10%
  confidence: number; // e.g. 95%
  power: number; // e.g. 80%
  dailySessions: number;
  sampleSizePerVariant: number;
  totalSampleSize: number;
  estimatedDays: number;
  variantsCount: number;
  observedCvrA?: number;
  observedCvrB?: number;
  observedVisitorsA?: number;
  observedVisitorsB?: number;
  pValue?: number;
  isSignificant?: boolean;
  notes?: string;
  createdAt: string;
}

export interface CapstoneDeliverable {
  id: number;
  title: string;
  phase: string;
  description: string;
  criteria: string[];
  evidenceUrl: string;
  notes: string;
  status: 'pending' | 'in-progress' | 'completed';
  completedAt?: string;
}

export interface CaseStudy {
  storeName: string;
  industry: string;
  baselineMetrics: {
    monthlySessions: number;
    baselineCvr: number;
    aov: number;
  };
  problem: string;
  research: string;
  hypothesis: string;
  implementation: string;
  results: {
    variantCvr: number;
    liftPercentage: number;
    pValue: number;
    annualRevenueImpact: number;
  };
  learnings: string;
  codeSnippet?: string;
  lastUpdated: string;
}

export interface PlaygroundSnippet {
  id: string;
  title: string;
  description: string;
  liquid: string;
  html: string;
  css: string;
  js: string;
}
