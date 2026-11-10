import { Lesson } from '../../types/curriculum';

export const PHASE_2_LESSONS: Lesson[] = [
  // MODULE 5: Hypotheses & Prioritization
  {
    id: 'm5-l1',
    moduleId: 'module-5',
    slug: 'the-anatomy-of-a-good-hypothesis',
    title: 'The Anatomy of a Good Hypothesis',
    estimatedMinutes: 20,
    objectives: [
      'Master the standard 5-part CRO hypothesis structure: Because [data], we believe [change] for [audience] will [impact] [metric].',
      'Eliminate untestable and ambiguous test proposals.',
      'Tie hypotheses directly to observed qualitative or quantitative evidence.',
    ],
    videoSource: {
      title: 'How To Become A Conversion Optimization Specialist',
      embedUrl: 'https://www.youtube-nocookie.com/embed/tYJJDloQxUY',
      channel: 'invesp',
      duration: '5:41',
      description: 'Curated technical CRO masterclass from invesp covering real-world heuristics, implementation blueprints, and optimization frameworks.',
      topics: ['How To Become A Conversion Optimization Specialist'],
    },
    sections: [
      {
        heading: 'The 5-Part Scientific Hypothesis Formula',
        body: `A hypothesis is not a hunch; it is a testable, falsifiable proposition rooted in empirical evidence:
• BECAUSE [observed data / customer friction pattern]: The quantifiable observation from analytics, session recordings, or usability feedback.
• WE BELIEVE [specific interface or functional change]: The exact code, design, or layout intervention being deployed.
• FOR [targeted visitor cohort]: The specific segment (e.g., mobile paid traffic, first-time international visitors).
• WILL RESULT IN [expected behavioral shift]: The psychological or friction-reducing response from the user.
• AS MEASURED BY [primary metric] AND [guardrail metric]: The statistical success benchmark balanced against business safeguards.`,
        callout: {
          type: 'tip',
          text: 'A hypothesis without a guardrail metric is dangerous. If your test aims to boost PDP-to-Cart with aggressive discount countdowns, your guardrail metrics must include Customer Support Inquiries and 30-Day Return Rates.',
        },
      },
      {
        heading: 'Eliminating Untestable & Ambiguous Test Proposals',
        body: `Most client proposals fail because they test opinions instead of mechanics. Contrast these two examples:

Weak / Untestable:
"Let's make the Add to Cart button green and round because green means go and rounded corners feel friendlier."
Why it fails: No documented evidence of friction, no mechanism of action, no guardrail metric, and impossible to extract transferable insights.

Strong / Actionable CRO Hypothesis:
"BECAUSE 44% of mobile PDP visitors exhibit repeated pinch-to-zoom actions on the desktop-sized sizing table and sizing questions represent 28% of pre-purchase Gorgias tickets, WE BELIEVE replacing the table with an interactive drawer slider with height/weight presets FOR mobile visitors WILL reduce fit hesitation AS MEASURED BY a 12% lift in mobile PDP-to-Cart conversions WITHOUT increasing refund rates."

When writing hypotheses, always articulate the psychological mechanism: does this reduce cognitive load, increase trust, or remove physical input friction?`,
        callout: {
          type: 'warning',
          text: 'Never approve a test if the result cannot produce an institutional learning regardless of whether the test wins or loses.',
        },
      },
      {
        heading: 'Backing Hypotheses with Qualitative & Quantitative Evidence',
        body: `High-win-rate CRO teams never guess what to build next. They triangulate hypotheses by combining quantitative telemetry (where the funnel leaks) with qualitative diagnostics (why visitors hesitate).

Triangulation Pipeline:
1. GA4 / Shopify Funnel Telemetry: Locates the stage (e.g. 72% drop-off between PDP and Cart Drawer on Safari iOS).
2. Heatmaps & Scrollmaps: Reveals attention distribution (e.g. 68% of users never scroll past the 2nd product thumbnail).
3. Session Replay Audits: Uncovers physical UX obstacles (e.g. sticky bottom bar overlaps the variant selector dropdown).
4. Post-Purchase & Exit Surveys: Identifies unaddressed purchase anxieties (e.g. "I didn't know if international shipping included customs duties").`,
        code: `// Data Layer Schema for Auditing Hypothesis Validation Signals
interface HypothesisEvidenceLedger {
  testId: string;
  sourceType: 'GA4_FUNNEL' | 'HOTJAR_SESSION' | 'SURVEY_RESPONSE' | 'SUPPORT_TICKET';
  observedData: {
    sampleSize: number;
    frictionPercentage: number;
    summary: string;
  };
  validatedByTeam: boolean;
}

const sizingAuditSample: HypothesisEvidenceLedger = {
  testId: 'EXP-M5-001',
  sourceType: 'HOTJAR_SESSION',
  observedData: {
    sampleSize: 1400,
    frictionPercentage: 38.5,
    summary: 'Visitors on mobile spend >14s tapping static size chart without adding to cart.'
  },
  validatedByTeam: true
};
console.log('Hypothesis Audit Registered:', sizingAuditSample);`,
        language: 'javascript',
      }
    ],
    mistakes: [
      'Testing ideas without a documented mechanism of change ("Let\'s just try it").',
      'Failing to specify a guardrail metric (e.g. increasing ATC while returns spike).',
    ],
    checklist: [
      'I can formulate hypotheses using the Because/We Believe/For/Will/Measured format.',
      'I ensure every hypothesis is tied to recorded user friction.',
    ],
    furtherReading: [
      { title: 'WiderFunnel: Hypothesis Formulation Framework', url: 'https://widerfunnel.com' },
    ],
  },
  {
    id: 'm5-l2',
    moduleId: 'module-5',
    slug: 'pie-ice-rice-choosing-a-framework',
    title: 'PIE, ICE, and RICE — Choosing a Framework',
    estimatedMinutes: 25,
    objectives: [
      'Compare ICE (Impact, Confidence, Ease) and RICE (Reach, Impact, Confidence, Effort) scoring.',
      'Standardize prioritization across multidisciplinary teams.',
      'Prevent high-effort, low-confidence pet projects from dominating sprint cycles.',
    ],
    videoSource: {
      title: 'RICE Prioritization Framework | Product Management',
      embedUrl: 'https://www.youtube-nocookie.com/embed/0jWRryfQ1Qk',
      channel: 'Everything Product',
      duration: '9:40',
      description: 'In-depth explanation of prioritization frameworks (RICE, ICE, PIE), calculating Reach, Impact, Confidence, and Effort scores to prioritize high-velocity A/B tests.',
      topics: ['RICE Framework', 'ICE Prioritization', 'Hypothesis Scoring', 'Experiment Roadmapping'],
    },
    sections: [
      {
        heading: 'Comparing Prioritization Frameworks: PIE vs ICE vs RICE',
        body: `When an ecommerce brand has 40 potential optimization ideas, prioritization separates amateur agencies from high-velocity CRO programs.

1. PIE (Potential, Importance, Ease):
• Potential: How much improvement can be made on this page?
• Importance: How valuable is the traffic flowing to this page?
• Ease: How technically difficult is the implementation?

2. ICE (Impact, Confidence, Ease):
• Impact: 1-10 rating on expected revenue or conversion lift.
• Confidence: 1-10 rating based on the strength of supporting data (opinions = 2, verified user research = 9).
• Ease: 1-10 rating on developer and designer velocity.
Formula: (Impact + Confidence + Ease) / 3

3. RICE (Reach, Impact, Confidence, Effort):
• Reach: Number of unique visitors impacted per sprint cycle (e.g. 50,000 monthly sessions).
• Impact: Estimated lift factor (3 = massive, 2 = high, 1 = medium, 0.5 = low).
• Confidence: Percentage certainty in your data (100% = high evidence, 80% = medium, 50% = low).
• Effort: Person-weeks of design, engineering, and QA.
Formula: (Reach × Impact × Confidence) / Effort`,
        callout: {
          type: 'tip',
          text: 'For fast-moving D2C stores, ICE is ideal for rapid weekly backlog ranking. For enterprise Shopify Plus teams with dedicated sprint planning, RICE provides mathematical protection against wasted developer cycles.',
        },
      },
      {
        heading: 'Standardizing Scoring Across Multidisciplinary Teams',
        body: `Without objective calibration rules, different team members score arbitrarily: marketers rate every idea a 10 for Impact, while developers rate every task a 2 for Ease.

Standardization Rubric for ICE Scoring:
• Impact:
  - 9-10: Sits directly on primary purchase path (PDP primary CTA, Checkout, Cart Drawer).
  - 5-8: Secondary discovery surface (Collection filter, sticky header, search modal).
  - 1-4: Peripheral touchpoint (Footer links, FAQ subpage, blog layout).
• Confidence:
  - 9-10: Multiple data sources converge (GA4 funnel leak + 50 session recordings + customer survey).
  - 6-8: Single quantitative or qualitative signal (analytics drop-off only).
  - 1-5: Competitive benchmark or team brainstorming suggestion.
• Ease:
  - 9-10: Client-side CSS or text change (< 4 hours dev & QA).
  - 6-8: Liquid template modification or lightweight JS drawer (< 2 days).
  - 1-5: Custom Shopify Function, third-party backend integration, or multi-page layout refactor (> 1 week).`,
        callout: {
          type: 'note',
          text: 'Enforce that only developers score Ease, only data analysts score Confidence, and product managers score Impact.',
        },
      },
      {
        heading: 'Preventing Pet Projects & Executive Bias in Sprint Cycles',
        body: `The biggest danger in ecommerce roadmaps is the HiPPO (Highest Paid Person's Opinion). An executive returns from a conference demanding a carousel hero banner or 3D model viewer because a competitor launched it.

By requiring every initiative to pass through a standardized prioritization formula, the team creates an objective gatekeeper:
1. Every proposal enters the backlog with an ICE or RICE score.
2. If a proposed pet project has low Reach and zero supporting behavioral data, its Confidence score defaults to 20%, depressing its ranking.
3. High-effort, low-confidence experiments are placed into an "Exploratory / Discovery" bucket that cannot consume more than 15% of active sprint engineering hours.`,
        code: `// Automated ICE / RICE Calculation Utility for Experiment Portfolios
interface ExperimentProposal {
  id: string;
  name: string;
  reachMonthlySessions: number;
  impactScore: number;     // 1 to 10
  confidenceScore: number; // 1 to 10
  easeScore: number;       // 1 to 10
  effortPersonDays: number;
}

function calculateRankings(proposals: ExperimentProposal[]) {
  return proposals.map(p => {
    const iceScore = ((p.impactScore + p.confidenceScore + p.easeScore) / 3).toFixed(2);
    const riceScore = Math.round(
      (p.reachMonthlySessions * (p.impactScore / 10) * (p.confidenceScore / 10)) / p.effortPersonDays
    );
    return {
      name: p.name,
      iceScore: parseFloat(iceScore),
      riceScore,
      priorityTier: parseFloat(iceScore) >= 7.5 ? 'TIER_1_SPRINT_CANDIDATE' : 'BACKLOG_INCUBATION'
    };
  }).sort((a, b) => b.iceScore - a.iceScore);
}

const sampleTests: ExperimentProposal[] = [
  { id: 'T1', name: 'Mobile Sticky ATC Bar', reachMonthlySessions: 80000, impactScore: 8, confidenceScore: 9, easeScore: 8, effortPersonDays: 2 },
  { id: 'T2', name: '3D Interactive Product Viewer', reachMonthlySessions: 20000, impactScore: 5, confidenceScore: 3, easeScore: 3, effortPersonDays: 10 }
];
console.table(calculateRankings(sampleTests));`,
        language: 'javascript',
      }
    ],
    mistakes: [
      'Giving pet ideas an automatic "10" on confidence without any empirical supporting data.',
      'Allowing Ease to dominate decisions so only trivial, low-impact tests get run.',
    ],
    checklist: [
      'I can rank an experiment backlog using ICE scoring.',
      'I define consistent rubrics for 1-10 scoring scales.',
    ],
    furtherReading: [
      { title: 'Intercom: RICE Prioritization Guide', url: 'https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/' },
    ],
  },
  {
    id: 'm5-l3',
    moduleId: 'module-5',
    slug: 'building-an-experiment-backlog',
    title: 'Building an Experiment Backlog That Scales',
    estimatedMinutes: 25,
    objectives: [
      'Structure an experiment backlog in Linear, Notion, or Airtable.',
      'Maintain status workflows: Backlog → Prioritized → In Development → QA → Running → Analyzed → Shipped/Archived.',
      'Preserve institutional learning regardless of win or loss.',
    ],
    videoSource: {
      title: 'What is the RICE Scoring Model?',
      embedUrl: 'https://www.youtube-nocookie.com/embed/pzyRafZJ-0M',
      channel: 'ProductPlan',
      duration: '4:04',
      description: 'Curated technical CRO masterclass from ProductPlan covering real-world heuristics, implementation blueprints, and optimization frameworks.',
      topics: ['What is the RICE Scoring Model?'],
    },
    sections: [
      {
        heading: 'Structuring a High-Velocity Experiment Backlog',
        body: `A successful optimization program is a knowledge compounding machine. Without a structured backlog in tools like Linear, Notion, or Airtable, insights vanish and teams repeat failed tests a year later.

Core Fields for an Enterprise CRO Backlog:
1. Unique Experiment Identifier: EXP-001, EXP-002 (never use informal names like "John's cart test").
2. Funnel Stage & Surface: PDP, Collection, Global Header, Cart Drawer, Checkout.
3. Full 5-Part Hypothesis: Because [X], We Believe [Y], For [Z], Will Result in [A], As Measured by [B].
4. Prioritization Metrics: ICE or RICE scores with supporting documentation links.
5. Primary & Guardrail KPIs: Numeric baseline and minimum detectable target.
6. Design & Variant Specs: Figma links, technical architecture (client-side vs server-side), and target traffic allocation.`,
        callout: {
          type: 'tip',
          text: 'Always tag tests with the psychological principle at play (e.g. Social Proof, Cognitive Ease, Friction Reduction). This lets you audit which behavioral levers generate the highest win rates across your store.',
        },
      },
      {
        heading: 'Status Workflows: From Ideation to Post-Test Deployment',
        body: `Every test in the pipeline must move through a disciplined 7-state lifecycle:
1. Backlog: Raw observations and evidence awaiting scoring.
2. Prioritized: Validated hypotheses approved for the upcoming sprint.
3. In Development: Theme Liquid, CSS, and JS variant engineering.
4. QA & Staging: Cross-browser verification, telemetry validation, and SRM checks.
5. Running: Live in production with active traffic allocation and statistical monitoring.
6. Analyzed: Sample size reached, statistical significance and confidence intervals calculated.
7. Shipped or Archived:
   - Winner: Hardcoded cleanly into the primary Shopify theme to eliminate script overhead.
   - Loser/Inconclusive: Code archived, retrospective documented, and key behavioral learnings recorded.`,
        callout: {
          type: 'warning',
          text: 'Never leave winning variants running indefinitely via third-party A/B testing scripts. Client-side script injections degrade Core Web Vitals. Always hardcode winners into theme.liquid within 14 days of test conclusion.',
        },
      },
      {
        heading: 'Preserving Institutional Knowledge: The Experiment Archive',
        body: `In ecommerce optimization, a losing test that teaches you what your customers reject is just as valuable as a winning test. If you don't archive test retrospectives, team turnover causes new hires to suggest the same rejected test next quarter.

Post-Mortem Documentation Standard:
• Statistical Outcome: Control vs Variant conversion rates, p-value, relative lift, and 95% confidence intervals.
• Secondary Metric Impacts: What happened to AOV, bounce rates, and cart-to-checkout progression?
• Qualitative Insights: Did session recordings show unexpected user friction or confusion with the new UI?
• Transferable Takeaway: One sentence summarizing what this reveals about customer psychology (e.g. "Our shoppers prioritize ingredient transparency over celebrity endorsements").`,
        code: `// Standardized Experiment Post-Mortem Record
interface ExperimentArchiveEntry {
  id: string;
  title: string;
  durationDays: number;
  totalVisitors: number;
  outcome: 'WIN' | 'LOSS' | 'INCONCLUSIVE';
  primaryMetric: {
    name: string;
    controlRate: number;
    variantRate: number;
    relativeLiftPercent: number;
    pValue: number;
  };
  keyLearning: string;
  codeCleanupCompleted: boolean;
}

const archivedSample: ExperimentArchiveEntry = {
  id: 'EXP-104',
  title: 'PDP Floating Trust Badges Under Add to Cart',
  durationDays: 21,
  totalVisitors: 45200,
  outcome: 'LOSS',
  primaryMetric: {
    name: 'PDP to Cart Progression',
    controlRate: 8.8,
    variantRate: 7.9,
    relativeLiftPercent: -10.2,
    pValue: 0.02
  },
  keyLearning: 'Generic security trust badges (padlocks, SSL certificates) heightened security skepticism on mobile rather than reassuring buyers.',
  codeCleanupCompleted: true
};
console.log('Archived Learning Record:', archivedSample);`,
        language: 'javascript',
      }
    ],
    mistakes: [
      'Leaving dead experiment code sitting in theme.liquid for months after a test ends.',
      'Failing to document losses — losing tests provide crucial insights into customer preferences.',
    ],
    checklist: [
      'I understand the 6 lifecycle states of an experiment ticket.',
      'I know how to maintain an archive of past experiment learnings.',
    ],
    furtherReading: [
      { title: 'Reforge: Growth Experimentation Systems', url: 'https://www.reforge.com' },
    ],
  },
  {
    id: 'm5-l4',
    moduleId: 'module-5',
    slug: 'when-not-to-test',
    title: 'When NOT to Test (and What to Do Instead)',
    estimatedMinutes: 25,
    objectives: [
      'Determine when a store lacks sufficient traffic for A/B testing.',
      'Understand the mathematical limits of low-sample testing.',
      'Apply "Just Do It" (JDI) fixes vs sequential pre/post testing.',
    ],
    videoSource: {
      title: 'How To 4X Your Shopify Conversion Rate (Complete CRO Guide)',
      embedUrl: 'https://www.youtube-nocookie.com/embed/A-7pTamjBIw',
      channel: 'Davie Fogarty Mentors',
      duration: '16:57',
      description: 'Curated technical CRO masterclass from Davie Fogarty Mentors covering real-world heuristics, implementation blueprints, and optimization frameworks.',
      topics: ['How To 4X Your Shopify Conversion Rate (Complete CRO Guide)'],
    },
    sections: [
      {
        heading: 'Traffic Thresholds: When a Store Lacks Sample Size',
        body: `The biggest mistake made by early-stage Shopify stores is attempting classical A/B testing with insufficient traffic. 

Statistical Reality Check:
To detect a realistic 10% relative lift with 95% confidence and 80% statistical power on a 2.5% baseline conversion rate, an experiment requires approximately 62,000 visitors per variant (124,000 total visitors).
If a store only receives 10,000 monthly sessions, running this test would take over 12 months!
During that 12-month period, seasonality, inventory changes, marketing mix shifts, and ad platform algorithm updates will completely invalidate the experiment's control group.`,
        callout: {
          type: 'warning',
          text: 'Rule of Thumb: If a store records fewer than 1,000 macro-conversions (orders) per month, classical sitewide A/B testing is mathematically non-viable.',
        },
      },
      {
        heading: 'The Mathematical Limits of Low-Sample Testing',
        body: `When teams run tests on low-traffic stores, two catastrophic statistical errors occur:
1. False Positives (Type I Error): An early flurry of sales makes a variant look like a +35% winner. The team ships it, but sitewide revenue does not budge. This is random variance masquerading as signal.
2. Low Statistical Power (Type II Error): The test lacks the statistical sensitivity to detect genuine +5% or +8% lifts, causing the team to discard valuable optimizations as "inconclusive."

Furthermore, testing micro-conversions (like button clicks) on low-traffic stores creates a false sense of security: a 25% lift in clicks that does not translate into statistically significant orders is meaningless.`,
        callout: {
          type: 'note',
          text: 'Never lower your confidence threshold to 80% just to make a low-traffic test "conclude faster." You are merely flipping a weighted coin.',
        },
      },
      {
        heading: 'Alternative Optimization Strategies: JDI Fixes & Sequential Testing',
        body: `If your store does not have the volume for controlled split testing, you do not stop optimizing. You shift to higher-leverage methodologies:

1. "Just Do It" (JDI) Heuristic Fixes:
Obvious bugs, broken mobile layouts, illegible typography, and missing shipping information do not require an A/B test. Fix them immediately. You do not A/B test a broken checkout button or a 6-second LCP.

2. Sequential Pre/Post Cohort Analysis:
Deploy the optimization storewide and compare performance over equivalent 30-day cohorts, adjusting for marketing spend and seasonality.

3. High-Fidelity Qualitative Usability Audits:
Conduct 5 recorded user testing sessions (via UserTesting or Userlytics). Five real humans navigating your PDP will reveal 80% of usability bottlenecks without requiring a single statistical p-value.`,
        code: `// Pre/Post Sequential Analysis Calculator with Confidence Bounds
function analyzeSequentialCohort(
  prePeriod: { days: number; sessions: number; orders: number; revenue: number },
  postPeriod: { days: number; sessions: number; orders: number; revenue: number }
) {
  const preCvr = (prePeriod.orders / prePeriod.sessions) * 100;
  const postCvr = (postPeriod.orders / postPeriod.sessions) * 100;
  const cvrLift = ((postCvr - preCvr) / preCvr) * 100;

  const preRps = prePeriod.revenue / prePeriod.sessions;
  const postRps = postPeriod.revenue / postPeriod.sessions;
  const rpsLift = ((postRps - preRps) / preRps) * 100;

  return {
    preCvr: preCvr.toFixed(2) + '%',
    postCvr: postCvr.toFixed(2) + '%',
    relativeCvrLift: (cvrLift > 0 ? '+' : '') + cvrLift.toFixed(2) + '%',
    preRps: '$' + preRps.toFixed(2),
    postRps: '$' + postRps.toFixed(2),
    relativeRpsLift: (rpsLift > 0 ? '+' : '') + rpsLift.toFixed(2) + '%',
    evaluation: cvrLift > 5 && rpsLift > 5 ? 'DIRECTIONALLY_POSITIVE' : 'NEUTRAL_OR_SEASONAL_NOISE'
  };
}

console.log(analyzeSequentialCohort(
  { days: 30, sessions: 18000, orders: 410, revenue: 34850 },
  { days: 30, sessions: 19500, orders: 512, revenue: 45050 }
));`,
        language: 'javascript',
      }
    ],
    mistakes: [
      'Running an A/B test on a store with 50 monthly orders and claiming "statistical significance" after 8 orders.',
      'Refusing to fix critical UX bugs because "we have to test it first".',
    ],
    checklist: [
      'I know the minimum traffic threshold required for A/B testing.',
      'I know when to recommend JDI (Just Do It) over experimentation.',
    ],
    furtherReading: [
      { title: 'CXL: When You Don\'t Have Enough Traffic to A/B Test', url: 'https://cxl.com' },
    ],
  },

  // MODULE 6: Statistics & Test Design
  {
    id: 'm6-l1',
    moduleId: 'module-6',
    slug: 'ab-abn-multivariate-split-url-which-when',
    title: 'A/B, A/B/n, Multivariate, Split URL — Which When',
    estimatedMinutes: 25,
    objectives: [
      'Distinguish between A/B, A/B/n (multi-variant), MVT (Multivariate), and Split URL testing.',
      'Understand how adding variants increases required sample size exponentially.',
      'Choose the appropriate test methodology for a specific design challenge.',
    ],
    videoSource: {
      title: 'How to use Shopify Rollouts for A/B Testing - Tutorial',
      embedUrl: 'https://www.youtube-nocookie.com/embed/TptSwMDuY74',
      channel: 'Sunrise Integration',
      duration: '8:50',
      description: 'Curated technical CRO masterclass from Sunrise Integration covering real-world heuristics, implementation blueprints, and optimization frameworks.',
      topics: ['How to use Shopify Rollouts for A/B Testing', 'Tutorial'],
    },
    sections: [
      {
        heading: 'Taxonomy of Experiment Types: A/B, A/B/n, MVT, and Split URL',
        body: `Selecting the wrong testing architecture wastes engineering hours and inflates required sample size:

1. Classic A/B Test (1 Control vs 1 Variant):
• Modifies a single conceptual variable (e.g. static hero banner vs interactive product selector).
• Fastest time to statistical significance; lowest risk profile.

2. A/B/n Testing (Control vs Multiple Variants: A, B, C, D):
• Tests multiple alternative treatments simultaneously (e.g. Control vs Green Button vs Orange Button vs Sticky Bar).
• Multiplies the required sample size by the number of variants.

3. Multivariate Testing (MVT):
• Tests combinations of multiple independent elements simultaneously (e.g. 2 headlines × 2 imagery styles × 2 CTA copies = 8 distinct permutations).
• Uncovers interaction effects between elements, but requires astronomical traffic volumes (> 500,000 monthly sessions).

4. Split URL / Redirect Testing:
• Routes traffic at the DNS, edge, or router level between two entirely different URL endpoints (e.g. /products/clean-jacket vs /products/clean-jacket-v2).
• Best for complete architectural rewrites, new tech stacks, or radical page redesigns.`,
        callout: {
          type: 'tip',
          text: 'Over 85% of successful ecommerce CRO tests are simple 2-variant A/B tests. Resist the temptation to launch 4-variant tests unless your store does 500k+ monthly sessions.',
        },
      },
      {
        heading: 'The Exponential Sample Size Multiplier of Multi-Variant Tests',
        body: `Junior developers often assume that running a 4-variant test (A/B/C/D) simply takes a little longer. In reality, it dilutes statistical power and compounds the risk of false positives.

Mathematical Impact of Variant Expansion:
If an A/B test requires 30,000 visitors per group (60,000 total visitors) to reach 95% confidence:
• Adding a 3rd variant (A/B/C) requires 3 × 30,000 = 90,000 total visitors.
• Adding a 4th variant (A/B/C/D) requires 4 × 30,000 = 120,000 total visitors.

Furthermore, testing multiple variants against a single control inflates the Family-Wise Error Rate (FWER). With 4 variants, the likelihood of finding at least one false positive at standard alpha=0.05 jumps from 5% to:
1 - (1 - 0.05)^3 = 14.3%!
To counteract this, you must apply statistical corrections like the Bonferroni or Dunnett correction, which inflates the required sample size even further.`,
        callout: {
          type: 'warning',
          text: 'If you run A/B/n tests without alpha correction, 1 out of every 7 "winning" variants is statistical noise.',
        },
      },
      {
        heading: 'Decision Matrix: Selecting the Right Methodology for Your Hypothesis',
        body: `Use this engineering decision rule when structuring your test:
• Is the change a surgical element modification on a single page? -> Client-side A/B test.
• Are you testing radical value propositions or full-page redesigns? -> Split URL / Edge Router test.
• Do you need to isolate which specific component of a redesign drove the lift? -> MVT (only if monthly conversions exceed 5,000).
• Are you testing site navigation or sitewide header menus? -> Global Client-side or Edge Middleware test.`,
        code: `// Decision Engine for Selecting Experimentation Paradigm
interface TestFeasibilityInput {
  monthlySessions: number;
  baselineCvrPercent: number;
  scopeOfChange: 'SURGICAL_ELEMENT' | 'RADICAL_REDESIGN' | 'MULTI_ELEMENT_INTERACTION';
  elementVariationsCount: number;
}

function recommendTestType(input: TestFeasibilityInput): string {
  const estimatedOrders = input.monthlySessions * (input.baselineCvrPercent / 100);

  if (input.scopeOfChange === 'RADICAL_REDESIGN') {
    return 'RECOMMENDATION: Split URL Redirect / Edge Worker Routing (Prevents layout thrashing)';
  }
  
  if (input.scopeOfChange === 'MULTI_ELEMENT_INTERACTION') {
    if (estimatedOrders > 4000) {
      return 'RECOMMENDATION: Full Factorial Multivariate Test (MVT)';
    }
    return 'WARNING: Insufficient conversion volume for MVT. Run sequential A/B tests instead.';
  }

  if (input.elementVariationsCount > 2) {
    if (estimatedOrders < 2500) {
      return 'WARNING: High variant count will dilute traffic. Restrict to 2 variants (Control vs Single Best Challenger).';
    }
    return 'RECOMMENDATION: A/B/n Multi-variant Test with Bonferroni correction';
  }

  return 'RECOMMENDATION: Standard 2-Arm A/B Split Test';
}

console.log(recommendTestType({
  monthlySessions: 45000,
  baselineCvrPercent: 2.2,
  scopeOfChange: 'SURGICAL_ELEMENT',
  elementVariationsCount: 2
}));`,
        language: 'javascript',
      }
    ],
    mistakes: [
      'Attempting a 3x3 MVT test on a site with standard ecommerce traffic levels.',
      'Forgetting canonical tags on Split URL tests, causing Google SEO indexing penalties.',
    ],
    checklist: [
      'I can select between A/B, A/B/n, and Split URL testing based on traffic and design scope.',
      'I know how to set up rel="canonical" on Split URL variations.',
    ],
    furtherReading: [
      { title: 'Google: Testing without Hurting SEO', url: 'https://developers.google.com/search/docs/advanced/guidelines/ab-testing' },
    ],
  },
  {
    id: 'm6-l2',
    moduleId: 'module-6',
    slug: 'statistical-significance-power-mde-explained-simply',
    title: 'Statistical Significance, Power, and MDE Explained Simply',
    estimatedMinutes: 25,
    objectives: [
      'Demystify p-values, Alpha (Type I error), and Beta (Type II error).',
      'Understand why 95% confidence and 80% power are industry standards.',
      'Define Minimum Detectable Effect (MDE) and its inverse relationship with sample size.',
    ],
    videoSource: {
      title: 'Statistical Power, Clearly Explained!!!',
      embedUrl: 'https://www.youtube-nocookie.com/embed/Rsc5znwR5FA',
      channel: 'StatQuest with Josh Starmer',
      duration: '8:19',
      description: 'Curated technical CRO masterclass from StatQuest with Josh Starmer covering real-world heuristics, implementation blueprints, and optimization frameworks.',
      topics: ['Statistical Power', 'Clearly Explained!!!'],
    },
    sections: [
      {
        heading: 'Demystifying Statistical Significance: P-Values, Alpha, and Beta',
        body: `To operate as a professional CRO engineer, you must understand the mathematical mechanics that govern testing validity:

1. The Null Hypothesis (H0):
The assumption that there is no true difference between Control and Variant; any observed difference is pure random fluctuation.

2. Alpha (Type I Error / False Positive Rate):
The probability of rejecting the null hypothesis when it is actually true (claiming a winner when the change had zero real effect).
Industry standard: Alpha = 0.05 (5%). This gives you a 95% Confidence Level (1 - Alpha).

3. Beta (Type II Error / False Negative Rate):
The probability of failing to reject the null hypothesis when a true difference actually exists (declaring an experiment inconclusive when your variant was actually a winner).
Industry standard: Beta = 0.20 (20%).

4. Statistical Power (1 - Beta):
The ability of an experiment to detect an effect of a specific magnitude if one exists.
Industry standard: Power = 80% (0.80).`,
        callout: {
          type: 'tip',
          text: 'A p-value is NOT the probability that your variant is better. A p-value of 0.03 means: "If the two variants were identical, there is only a 3% probability we would observe a difference this large by chance alone."',
        },
      },
      {
        heading: 'Why 95% Confidence and 80% Power Are Industry Benchmarks',
        body: `Why don't we test with 99% confidence and 99% power to be completely safe?
Because of the inverse square law of statistical sampling:
Increasing confidence from 95% to 99% nearly doubles the required sample size. Increasing power from 80% to 95% increases sample size by an additional 60%.

In ecommerce, holding a test open for 4 months to achieve 99% statistical certainty creates massive opportunity cost. By accepting a 5% false positive risk (Alpha) and 20% false negative risk (Beta), stores achieve the optimal economic balance: testing rapidly while maintaining rigorous defense against random variance.`,
        callout: {
          type: 'warning',
          text: 'Testing at 80% confidence level (common in cheap CRO software) means 1 out of every 5 declared "winners" is totally bogus.',
        },
      },
      {
        heading: 'Minimum Detectable Effect (MDE) and the Sample Size Tradeoff',
        body: `Minimum Detectable Effect (MDE) is the smallest relative percentage lift your experiment is mathematically equipped to detect at your chosen power and significance levels.

The Fundamental CRO Tradeoff:
• If you want to detect a tiny +2% lift: You need massive traffic (often hundreds of thousands of visitors).
• If your store has moderate traffic: Your MDE will be high (+10% to +15%). This means your variant must deliver a massive improvement to be statistically validated.

Understanding your MDE prevents you from launching minor cosmetic tweaks that could never produce enough impact to overcome the detection threshold.`,
        code: `// Statistical Power and MDE Estimation Helper
function computeMdeFeasibility(params: {
  monthlyVisitors: number;
  baselineCvr: number; // e.g. 0.025 for 2.5%
  testWeeks: number;
}) {
  const totalTestTraffic = params.monthlyVisitors * (params.testWeeks / 4.33);
  const trafficPerArm = totalTestTraffic / 2;
  const conversionsPerArm = trafficPerArm * params.baselineCvr;

  // Evan Miller approximation for standard two-tailed proportion test (alpha=0.05, beta=0.80, z-score sum = 2.80)
  const zScoreFactor = 2.80; // (1.96 + 0.84)
  const standardError = Math.sqrt((2 * params.baselineCvr * (1 - params.baselineCvr)) / trafficPerArm);
  const absoluteMde = zScoreFactor * standardError;
  const relativeMdePercent = (absoluteMde / params.baselineCvr) * 100;

  return {
    trafficPerArm: Math.round(trafficPerArm),
    conversionsPerArm: Math.round(conversionsPerArm),
    minimumDetectableEffect: relativeMdePercent.toFixed(2) + '% relative lift',
    feasibilityVerdict: relativeMdePercent <= 12 ? 'FEASIBLE_COMMERCIAL_TEST' : 'HIGH_MDE_RISK_ONLY_RADICAL_CHANGES_DETECTABLE'
  };
}

console.log('High Traffic Store:', computeMdeFeasibility({ monthlyVisitors: 150000, baselineCvr: 0.025, testWeeks: 3 }));
console.log('Low Traffic Store:', computeMdeFeasibility({ monthlyVisitors: 20000, baselineCvr: 0.025, testWeeks: 4 }));`,
        language: 'javascript',
      }
    ],
    mistakes: [
      'Assuming "95% statistical significance" means there is a 95% chance the variation will win by the exact observed percentage.',
      'Ignoring statistical power and ending tests with inconclusive false negatives.',
    ],
    checklist: [
      'I can explain p-value and Type I/II errors to a non-technical stakeholder.',
      'I understand why smaller MDEs require exponentially larger sample sizes.',
    ],
    furtherReading: [
      { title: 'Evan Miller: How Not To Run An A/B Test', url: 'https://www.evanmiller.org/how-not-to-run-an-ab-test.html' },
    ],
  },
  {
    id: 'm6-l3',
    moduleId: 'module-6',
    slug: 'calculating-sample-size-with-worked-examples',
    title: 'Calculating Sample Size (with Worked Examples)',
    estimatedMinutes: 25,
    objectives: [
      'Calculate required sample sizes using standard proportion formulas.',
      'Determine test duration in days based on daily traffic velocity.',
      'Balance statistical rigor against business urgency.',
    ],
    videoSource: {
      title: 'AB Testing 101 | How to Calculate the Sample Size',
      embedUrl: 'https://www.youtube-nocookie.com/embed/KC1nwY7YCUE',
      channel: 'Emma Ding',
      duration: '11:30',
      description: 'Clear mathematical explanation of sample size calculation formulas, statistical power, significance levels, and duration in A/B testing.',
      topics: ['Sample Size Formula', 'Statistical Power', 'Significance Level (Alpha)', 'Minimum Detectable Effect'],
    },
    sections: [
      {
        heading: 'Calculating Sample Sizes Using Standard Proportion Formulas',
        body: `Never guess how long a test should run. Sample size must be pre-calculated prior to launch using the two-sample z-test proportion formula.

Key Parameters Required:
• p1: Baseline conversion rate (e.g. 0.025 = 2.5%).
• p2: Expected variant conversion rate based on MDE (e.g. 0.0275 for a 10% lift).
• Z_alpha: Critical value for significance level (1.96 for two-tailed 95% confidence).
• Z_beta: Critical value for statistical power (0.84 for 80% power).

Formula for Sample Size per Arm (n):
n = [ (Z_alpha × sqrt(2 × p_avg × (1 - p_avg)) + Z_beta × sqrt(p1 × (1 - p1) + p2 × (1 - p2)))^2 ] / (p2 - p1)^2`,
        callout: {
          type: 'tip',
          text: 'Always use two-tailed tests. A one-tailed test assumes your variant cannot harm conversion rate — a dangerous and unfounded assumption in ecommerce.',
        },
      },
      {
        heading: 'Translating Sample Size into Real-World Calendar Duration',
        body: `Once you calculate the required sample size per variant, convert it into calendar days using daily traffic volume on the target page:

Duration (Days) = (Required Sample Size per Arm × Number of Arms) / Daily Target Visitors

The Golden Rule of Full Business Cycles:
Even if a store has massive traffic and reaches sample size in 3 days, you must ALWAYS run the test for a minimum of 2 full business cycles (14 consecutive days).
Why?
• Day-of-week variance: Monday shoppers behave drastically differently from Saturday night mobile impulse buyers.
• Payday cycles: Conversions spike on the 1st and 15th of the month.
• Marketing channel shifts: Paid ad campaigns alternate between prospecting and retargeting throughout the week.`,
        callout: {
          type: 'warning',
          text: 'Never stop a test in under 7 full days, regardless of what your analytics dashboard claims.',
        },
      },
      {
        heading: 'Balancing Statistical Rigor Against Business Urgency',
        body: `In ecommerce, perfection is the enemy of profit. If your sample size calculator calls for 90 days to achieve statistical significance on a subtle variant, what should you do?
1. Increase the MDE by testing a bolder, more radical intervention (test a completely redesigned cart drawer instead of changing button text).
2. Move the experiment higher up the funnel where visitor volume is 4x greater (e.g., Collection Page or PDP rather than Checkout Step 2).
3. Switch from an A/B split to an expert qualitative audit followed by a staged release if traffic cannot support the test.`,
        code: `// Production Sample Size & Test Duration Calculator
function calculateTestDuration(params: {
  dailySessionsOnPage: number;
  baselineCvrPercent: number;
  targetRelativeLiftPercent: number;
}) {
  const p1 = params.baselineCvrPercent / 100;
  const p2 = p1 * (1 + params.targetRelativeLiftPercent / 100);
  const pAvg = (p1 + p2) / 2;

  // Two-tailed alpha=0.05 (Z=1.96), Power=0.80 (Z=0.84)
  const zAlpha = 1.96;
  const zBeta = 0.84;

  const term1 = zAlpha * Math.sqrt(2 * pAvg * (1 - pAvg));
  const term2 = zBeta * Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2));
  const numerator = Math.pow(term1 + term2, 2);
  const denominator = Math.pow(p2 - p1, 2);

  const sampleSizePerArm = Math.ceil(numerator / denominator);
  const totalVisitorsNeeded = sampleSizePerArm * 2;
  const rawDays = totalVisitorsNeeded / params.dailySessionsOnPage;
  
  // Enforce minimum 14-day rule (2 full weekly cycles)
  const recommendedDays = Math.max(14, Math.ceil(rawDays / 7) * 7);

  return {
    sampleSizePerArm: sampleSizePerArm.toLocaleString(),
    totalVisitorsNeeded: totalVisitorsNeeded.toLocaleString(),
    estimatedDaysRaw: rawDays.toFixed(1),
    recommendedFullCycleDays: recommendedDays,
    status: recommendedDays > 45 ? 'TEST_DURATION_TOO_LONG_RETHINK_SCOPE' : 'COMMERCIALLY_VIABLE'
  };
}

console.log(calculateTestDuration({
  dailySessionsOnPage: 3200,
  baselineCvrPercent: 2.4,
  targetRelativeLiftPercent: 12
}));`,
        language: 'javascript',
      }
    ],
    mistakes: [
      'Running a test for only 3 days because it reached "95% significance" on Tuesday (violating business cycle validity).',
      'Forgetting to round test duration up to complete 7-day weekly cycles to control for weekday vs weekend shopping behavior.',
    ],
    checklist: [
      'I can calculate required sample size before starting an experiment.',
      'I always plan experiments in full 7-day increments (minimum 2 full weeks).',
    ],
    furtherReading: [
      { title: 'Evan Miller Sample Size Calculator', url: 'https://www.evanmiller.org/ab-testing/sample-size.html' },
    ],
  },
  {
    id: 'm6-l4',
    moduleId: 'module-6',
    slug: 'peeking-novelty-effect-seasonality-how-tests-lie',
    title: 'Peeking, Novelty Effect, Seasonality — How Tests Lie',
    estimatedMinutes: 25,
    objectives: [
      'Identify the mathematical disaster of the "Peeking Problem" (optional stopping).',
      'Account for novelty effects in returning visitors.',
      'Avoid running or interpreting A/B tests during abnormal sales events (BFCM).',
    ],
    videoSource: {
      title: 'Ronny Kohavi: A/B Testing Pitfalls: Getting Numbers You Can Trust is Hard',
      embedUrl: 'https://www.youtube-nocookie.com/embed/HEGI5QN3fXE',
      channel: 'CXL',
      duration: '34:20',
      description: 'World-renowned experimentation authority Ronny Kohavi explains the mathematics of peeking, false discoveries, novelty effects, and why stopping tests prematurely corrupts CRO data.',
      topics: ['Peeking Problem', 'Statistical Pitfalls', 'Novelty Effect', 'Type I Errors'],
    },
    sections: [
      {
        heading: 'The Peeking Problem: How Optional Stopping Destroys Validity',
        body: `The "Peeking Problem" (technically known as optional stopping) is the single most common statistical crime committed by ecommerce marketers.

How It Happens:
A marketer launches an A/B test. Every morning, they log into the dashboard. On Day 3, the variant shows +28% lift with "98% significance." The marketer excitedly declares victory, stops the test, and pushes the variant live.

Why It Destroys Validity:
Classical frequentist statistics calculates significance on the assumption that you evaluate data once, at the predetermined fixed sample size.
Checking the data repeatedly throughout the test inflates your true false positive rate.
If you peek at your test daily over a 3-week period, your true false positive rate is not 5% — it climbs to over 30%!
You are virtually guaranteed to observe a temporary random spike that crosses the 95% threshold purely by chance.`,
        callout: {
          type: 'warning',
          text: 'Do not make any decisions until the pre-calculated sample size is reached. If using frequentist tools, look only at tracking QA, not conversion outcomes, during the first week.',
        },
      },
      {
        heading: 'Accounting for the Novelty Effect in Returning Shoppers',
        body: `When you launch a prominent visual change (such as a redesigned navigation bar or new sticky cart button), returning loyal customers notice it immediately.
Their curiosity prompts them to click, explore, and interact with the new interface at abnormally high rates.

This creates the Novelty Effect: an artificial short-term spike in engagement and conversion rate during the first 5-7 days of a test.
As the novelty fades and visitors become accustomed to the new design, the conversion rate decays back to baseline.
Conversely, the "Primancy Effect" occurs when returning visitors resist a change initially because muscle memory was disrupted, causing an artificial short-term dip.

Mitigation Strategy:
Segment your experiment analysis between "New Visitors" and "Returning Visitors." If the lift only exists among returning visitors and vanishes by week 3, you are observing novelty, not genuine optimization.`,
        callout: {
          type: 'tip',
          text: 'Always check test results for Day-14+ retention to ensure the lift holds stable after the novelty effect dissipates.',
        },
      },
      {
        heading: 'Seasonality & Major Sales Events: Black Friday / Cyber Monday (BFCM)',
        body: `Never run standard A/B tests during Black Friday, Cyber Monday, or flash clearance sales.

Why BFCM Invalids Test Data:
1. Visitor Intent Changes Completely: Shoppers are price-elastic bargain hunters with 3x higher buying urgency than typical year-round visitors.
2. Traffic Sources Shift Radically: Aggressive SMS and email blasts dilute normal organic and paid search traffic distributions.
3. Inventory Depletions: High out-of-stock rates introduce artificial friction that has nothing to do with your UI design.

A variant that "wins" during BFCM (e.g. flashing countdown clocks and massive coupon badges) will often depress brand value and conversion rates in ordinary non-sale months.`,
        code: `// Data Pipeline Filter for Excluding Seasonality Anomaly Periods
interface TrafficSample {
  date: string;
  isPromoEvent: boolean;
  sessions: number;
  orders: number;
}

function filterCleanTestSamples(samples: TrafficSample[]) {
  const cleanCohort = samples.filter(s => !s.isPromoEvent);
  const totalExcluded = samples.length - cleanCohort.length;

  return {
    cleanSamplesCount: cleanCohort.length,
    excludedAnomalousDays: totalExcluded,
    advisory: totalExcluded > 0 
      ? 'PROMO_DATA_EXCLUDED_PREVENTS_POLLUTION' 
      : 'ALL_DATA_CLEAN'
  };
}

const experimentDays: TrafficSample[] = [
  { date: '2026-11-20', isPromoEvent: false, sessions: 4200, orders: 98 },
  { date: '2026-11-27', isPromoEvent: true, sessions: 18500, orders: 910 }, // BFCM Day
  { date: '2026-11-28', isPromoEvent: true, sessions: 12200, orders: 540 }  // BFCM Weekend
];
console.log(filterCleanTestSamples(experimentDays));`,
        language: 'javascript',
      }
    ],
    mistakes: [
      'Stopping an experiment on Day 4 because "it\'s up +40% with p < 0.01".',
      'Running an A/B test during a massive influencer promo spike and assuming the results apply to baseline organic traffic.',
    ],
    checklist: [
      'I commit to keeping tests running until the pre-calculated sample size is reached.',
      'I exclude returning customers or run tests long enough to outlast the novelty effect.',
    ],
    furtherReading: [
      { title: 'David Robinson: Why Continuous Peeking Destroys Validity', url: 'http://varianceexplained.org' },
    ],
  },
  {
    id: 'm6-l5',
    moduleId: 'module-6',
    slug: 'designing-a-test-brief',
    title: 'Designing a Complete Test Brief',
    estimatedMinutes: 25,
    objectives: [
      'Compile a production-ready CRO Test Brief document.',
      'Specify primary metrics, secondary metrics, guardrail metrics, and tracking QA steps.',
      'Align cross-functional stakeholders before writing code.',
    ],
    videoSource: {
      title: 'What is an A/B Test Hypothesis: How to Create an A/B Test Hypothesis That Solves Real Problems',
      embedUrl: 'https://www.youtube-nocookie.com/embed/5vATWVETUc0',
      channel: 'Convert.com',
      duration: '11:45',
      description: 'Structured framework for writing data-driven hypotheses, defining primary conversion metrics, establishing secondary guardrails, and documenting an experiment brief.',
      topics: ['Test Brief Architecture', 'Hypothesis Formulation', 'Primary & Guardrail Metrics', 'Experiment Documentation'],
    },
    sections: [
      {
        heading: 'Anatomy of a Production-Ready CRO Test Brief',
        body: `Before writing a single line of code in a Shopify theme, the CRO developer and strategist must co-author a comprehensive Test Brief. The brief acts as the legal contract between marketing, design, engineering, and analytics.

The 8 Essential Components of a Test Brief:
1. Executive Summary & Objective: High-level overview of the feature.
2. Supporting Evidence: Links to heatmaps, GA4 drop-off funnels, and customer feedback.
3. The 5-Part Hypothesis: Stating the exact mechanism of change.
4. Target Surface & Audience: Exact URL regex matching, device breakdown, and geo-targeting.
5. Figma Design Specs: Pixel-perfect mobile and desktop mocks with responsive states.
6. Metric Architecture: Primary, secondary, and guardrail KPIs.
7. Statistical Parameters: Baseline rate, MDE, required sample size per arm, and minimum duration.
8. Implementation Architecture: Client-side JS, Section Rendering API, or Edge Worker.`,
        callout: {
          type: 'tip',
          text: 'Never accept a test brief that lacks responsive mobile Figma designs. Over 70% of Shopify store revenue happens on mobile viewports.',
        },
      },
      {
        heading: 'Specifying Primary, Secondary, and Guardrail Metrics',
        body: `A test brief must define three distinct tiers of measurement:

• Primary Metric (The Decision Driver):
The single metric that dictates whether the variant succeeded. Must be closely tied to the hypothesis (e.g. Mobile PDP Add-to-Cart Rate).

• Secondary Metrics (The Diagnostic Indicators):
Metrics that explain how user behavior shifted throughout the funnel (e.g. Size Guide Click Rate, Average Dwell Time, Cart Drawer Open Rate).

• Guardrail Metrics (The Business Safety Net):
Metrics that must NOT degrade as a result of the test:
- Sitewide Average Order Value (AOV)
- Customer Service Ticket Volume
- 30-Day Product Return Rate
- Core Web Vitals (INP and CLS)`,
        callout: {
          type: 'warning',
          text: 'If a variant lifts Add to Cart by 15% but causes a 20% drop in AOV due to customers picking cheaper bundles, the test fails the guardrail test.',
        },
      },
      {
        heading: 'Cross-Functional Stakeholder Alignment & Sign-Off Workflow',
        body: `A structured sign-off workflow prevents last-minute vetoes after engineering work is completed:

1. Design & Brand Sign-off: Confirms that custom typography, iconography, and colors adhere to brand guidelines.
2. Analytics Sign-off: Verifies that custom event telemetry payloads match dataLayer naming standards.
3. Engineering Sign-off: Reviews DOM performance impact, CLS risk, and Shopify API compatibility.
4. Executive / Client Sign-off: Approves live traffic launch date and duration.`,
        code: `// JSON Schema Representation of a Production Test Brief
export interface ProductionTestBrief {
  briefId: string;
  testName: string;
  status: 'DRAFT' | 'APPROVED' | 'IN_DEVELOPMENT' | 'ACTIVE';
  targetUrlPattern: string;
  deviceTargeting: 'ALL' | 'MOBILE_ONLY' | 'DESKTOP_ONLY';
  hypothesis: {
    evidence: string;
    intervention: string;
    expectedOutcome: string;
  };
  metrics: {
    primaryKpi: string;
    targetLift: string;
    guardrails: string[];
  };
  statisticalPlan: {
    requiredSampleSizePerArm: number;
    minimumRunDays: number;
  };
  signOffs: {
    leadDeveloper: string;
    analyticsEngineer: string;
    brandDirector: string;
  };
}

const briefSample: ProductionTestBrief = {
  briefId: 'BRIEF-2026-08',
  testName: 'PDP Sticky ATC with Dynamic Variant Selector',
  status: 'APPROVED',
  targetUrlPattern: '/products/*',
  deviceTargeting: 'MOBILE_ONLY',
  hypothesis: {
    evidence: '52% of mobile users scroll past the primary buy box without seeing price or options.',
    intervention: 'Deploy a floating bottom sheet containing thumbnail, variant pills, and instant buy button.',
    expectedOutcome: 'Increase mobile PDP-to-Cart progression by 10%.'
  },
  metrics: {
    primaryKpi: 'add_to_cart_rate',
    targetLift: '+10% relative',
    guardrails: ['checkout_completion_rate', 'cumulative_layout_shift']
  },
  statisticalPlan: {
    requiredSampleSizePerArm: 34000,
    minimumRunDays: 14
  },
  signOffs: {
    leadDeveloper: 'Approved (No CLS, <3KB JS)',
    analyticsEngineer: 'Approved (Custom dataLayer event ready)',
    brandDirector: 'Approved'
  }
};
console.log('Production Brief Ready:', briefSample.testName);`,
        language: 'javascript',
      }
    ],
    mistakes: [
      'Beginning frontend development before clarifying what constitutes a winning outcome.',
      'Failing to document tracking triggers in the brief.',
    ],
    checklist: [
      'I can author a complete test brief covering metrics, targeting, and QA.',
      'I ensure guardrail metrics are included in every test brief.',
    ],
    furtherReading: [
      { title: 'CRO Day: Test Brief Templates for Shopify Teams', url: 'https://croday.com' },
    ],
  },

  // MODULE 7: Build an A/B Test Framework
  {
    id: 'm7-l1',
    moduleId: 'module-7',
    slug: 'client-side-vs-server-side-vs-edge-testing',
    title: 'Client-Side vs Server-Side vs Edge Testing',
    estimatedMinutes: 25,
    objectives: [
      'Understand the architecture of client-side DOM manipulation vs server-side vs edge middleware testing.',
      'Analyze the performance implications of each testing paradigm on Shopify.',
      'Choose the right testing architecture for your store infrastructure.',
    ],
    videoSource: {
      title: 'Client-Side vs Server-Side Tracking on Shopify (Explained Clearly) [Lesson 1]',
      embedUrl: 'https://www.youtube-nocookie.com/embed/FMPY0I_Jj-s',
      channel: 'Analyzify - Powerful Shopify Analytics',
      duration: '11:38',
      description: 'Curated technical CRO masterclass from Analyzify - Powerful Shopify Analytics covering real-world heuristics, implementation blueprints, and optimization frameworks.',
      topics: ['Client', 'Side vs Server', 'Side Tracking on Shopify (Explained Clearly) [Lesson 1]'],
    },
    sections: [
      {
        heading: 'Architecture Comparison: Client-Side vs Server-Side vs Edge Testing',
        body: `The technical architecture of your experimentation platform dictates performance, data integrity, and visitor experience:

1. Client-Side Testing (DOM Injection):
• How it works: A JavaScript snippet (via Intelligems, Convert, or VWO) loads in the browser, intercepts the rendered DOM, and mutates CSS/HTML via JavaScript.
• Pros: Rapid deployment without modifying server code; non-developers can configure tests.
• Cons: Flash of Unstyled Content (FOUC), layout shifts (CLS), script bloat, and browser ad-blocker interference.

2. Server-Side Testing (Backend Engine):
• How it works: Server templates (or Shopify Theme App Extensions) render the variant before sending HTML down the wire.
• Pros: Zero layout flicker; 100% resilient to ad blockers; completely clean DOM.
• Cons: Hard to bypass Shopify's global Cloudflare CDN page caching without specialized cookie-splitting headers.

3. Edge Testing (Cloudflare Workers / Fastly VCL):
• How it works: Edge compute middleware inspects visitor cookies at the CDN edge and rewrites or routes the HTML stream before it ever touches the browser.
• Pros: Combines the zero-flicker speed of server-side testing with the flexibility of front-end routing.`,
        callout: {
          type: 'tip',
          text: 'Edge-based testing using Cloudflare Workers or Shopify Oxygen workers is the gold standard for high-volume Shopify Plus brands in 2026.',
        },
      },
      {
        heading: 'Performance Impacts: FOUC, CLS, and Script Overhead on Shopify',
        body: `Client-side A/B testing scripts are notorious performance killers on Shopify themes:
• The Anti-Flicker Snare: To prevent visitors from seeing the original control before the variant appears, legacy tools inject an "anti-flicker" CSS snippet that hides the entire <body> (opacity: 0) for up to 2000ms until the script evaluates. This destroys Largest Contentful Paint (LCP).
• Cumulative Layout Shift (CLS): Asynchronously inserting a promotional banner or sticky bar after page load pushes the page layout down, causing severe CLS penalties in Google Core Web Vitals.
• Bundle Bloat: Generic third-party testing scripts often weigh between 60KB and 150KB of uncompressed JavaScript, blocking the main execution thread on mobile CPU devices.`,
        callout: {
          type: 'warning',
          text: 'Never use opacity: 0 anti-flicker scripts on Shopify. If a test causes more than 0.05 CLS, redesign the technical implementation.',
        },
      },
      {
        heading: 'Choosing the Right Architecture for Your Infrastructure',
        body: `Architectural Selection Heuristics:
• Small to Mid-Market Shopify Store (< $5M GMV):
Use native modern Shopify experimentation tools like Intelligems or lightweight vanilla JS harnesses that leverage CSS hiding rather than global blocking scripts.
• Enterprise Shopify Plus (> $20M GMV):
Deploy Edge Middleware (Cloudflare Workers or Fastly) or use Shopify Theme App Extensions with Section Rendering API to maintain sub-second LCP and zero flicker.`,
        code: `// Edge Routing Logic Concept (Cloudflare Worker / V8 Edge Engine)
export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    // Only split test on PDP product endpoints
    if (url.pathname.startsWith('/products/')) {
      const cookie = request.headers.get('Cookie') || '';
      let variant = 'control';

      if (cookie.includes('ab_exp_hero=variant_b')) {
        variant = 'variant_b';
      } else if (!cookie.includes('ab_exp_hero=')) {
        // Deterministic 50/50 assignment at the Edge
        variant = Math.random() < 0.5 ? 'control' : 'variant_b';
      }

      // Route to alternate Shopify section or append variant query param
      if (variant === 'variant_b') {
        url.searchParams.set('view', 'hero-v2');
      }

      const response = await fetch(url.toString(), request);
      const newResponse = new Response(response.body, response);
      newResponse.headers.append('Set-Cookie', \`ab_exp_hero=\${variant}; Path=/; Max-Age=2592000; SameSite=Lax\`);
      return newResponse;
    }

    return fetch(request);
  }
};`,
        language: 'javascript',
      }
    ],
    mistakes: [
      'Relying on heavy 3rd-party client-side testing apps that inject 120KB of blocking JS in the `<head>`.',
      'Ignoring the Cumulative Layout Shift (CLS) caused by slow client-side DOM mutation.',
    ],
    checklist: [
      'I can explain the tradeoffs of client-side vs edge testing.',
      'I know how to measure the performance cost of an A/B testing tool.',
    ],
    furtherReading: [
      { title: 'Cloudflare Workers: Edge A/B Testing Recipes', url: 'https://developers.cloudflare.com/workers/examples/ab-testing/' },
    ],
  },
  {
    id: 'm7-l2',
    moduleId: 'module-7',
    slug: 'shopify-constraints-theme-caching-apps-checkout-limits',
    title: 'Shopify Constraints: Theme Caching, Apps, Checkout Limits',
    estimatedMinutes: 25,
    objectives: [
      'Navigate Shopify full-page CDN caching without breaking test variant consistency.',
      'Maintain variant state across page navigations without server-side sessions.',
      'Handle Shopify app conflicts that override theme DOM modifications.',
    ],
    videoSource: {
      title: 'Shopify Website Speed Optimization: Cache, CDN & Script Management',
      embedUrl: 'https://www.youtube-nocookie.com/embed/NwuK7xofCdo',
      channel: 'Shopify++',
      duration: '13:50',
      description: 'Technical breakdown of Shopify full-page caching, Cloudflare CDN edge behaviors, Liquid server render overhead, and managing third-party app script execution.',
      topics: ['Shopify Edge CDN', 'Full Page Caching', 'Liquid Server Execution', 'Third-Party Scripts'],
    },
    sections: [
      {
        heading: 'Navigating Shopify Full-Page CDN Caching and HTML Edge Nodes',
        body: `Shopify runs on a world-class global Cloudflare CDN infrastructure that aggressively caches rendered HTML at the edge for anonymous visitors.

The Caching Dilemma:
If your server attempts to conditionally render Liquid based on a server session (e.g. \`{% if customer %}\` or cookie checks), the edge cache will cache the first visitor's variant and serve it to the next 10,000 visitors!

How to Bypass Cache Safely:
1. Client-Side Hydration: The edge serves a shared, static HTML shell. A lightweight client-side script parses the visitor's local assignment and dynamically hydrates the variant.
2. Alternate Template Query Parameters: Append \`?view=variant_b\`. Shopify caches alternate templates (\`product.variant_b.liquid\`) under distinct cache keys at the CDN edge.
3. Section Rendering API: Dynamically fetch variant section HTML on demand via \`/products/handle?sections=pdp-hero-variant-b\`.`,
        callout: {
          type: 'shopify',
          text: 'Never write Liquid code that depends on dynamic cookies for variant assignment. Shopify’s edge cache will ignore dynamic cookies for unauthenticated traffic.',
        },
      },
      {
        heading: 'Maintaining Cross-Page Variant State Without Server Sessions',
        body: `In an ecommerce store, test consistency across page transitions is critical. If a user is assigned to Variant B on the Collection page (which promises "Free Express Shipping on Orders Over $50"), that messaging must persist on the PDP, in the Cart Drawer, and during checkout.

State Persistence Architecture:
1. First Touch Assignment: When the visitor first lands on any page, evaluate their bucket.
2. Local Storage + Cookie Synchronization: Store the assignment in both \`localStorage\` (for instant synchronous JS access) and a first-party cookie (for server access on non-cached routes).
3. Session Expiration Handling: Set a 30-day expiration so returning visitors remain in their assigned bucket throughout their buying cycle.`,
        callout: {
          type: 'tip',
          text: 'Always synchronize test bucket IDs with the GA4 user properties so all subsequent analytics sessions remain attributed to the initial variant assignment.',
        },
      },
      {
        heading: 'Managing App Conflicts and Third-Party DOM Collisions',
        body: `Shopify stores frequently run 15-30 apps: subscription widgets (Recharge), review apps (Yotpo/Judge.me), translation tools, and upsell drawers.

Classic DOM Collisions:
• Mutation Conflicts: Your A/B test re-parents the primary Add-to-Cart form, causing the third-party subscription widget to crash because its hardcoded querySelector can no longer find the form.
• Asynchronous Overwrites: Your script updates button copy, but 400ms later, a currency converter or translation app overwrites the text back to the default string.

Defensive Engineering Protocol:
• Use \`MutationObserver\` sparingly and always disconnect it after execution.
• Modify classes or data attributes rather than destroying and recreating DOM nodes.
• Coordinate initialization hooks with theme events (e.g., listening for \`theme:variant:change\` or \`cart:updated\`).`,
        code: `// Resilient Variant Mutation Pattern with Defensive Observer
function applyVariantSafely(targetSelector: string, mutationCallback: (el: HTMLElement) => void) {
  const target = document.querySelector<HTMLElement>(targetSelector);
  
  if (target) {
    mutationCallback(target);
    return;
  }

  // Fallback observer if third-party apps delay rendering
  const observer = new MutationObserver((mutations, obs) => {
    const delayedTarget = document.querySelector<HTMLElement>(targetSelector);
    if (delayedTarget) {
      mutationCallback(delayedTarget);
      obs.disconnect(); // Always clean up observers
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Timeout guardrail: cancel after 3 seconds to prevent memory leaks
  setTimeout(() => observer.disconnect(), 3000);
}

applyVariantSafely('.product-form__buttons', (container) => {
  container.classList.add('exp-sticky-cta--active');
  console.log('Variant applied defensively without DOM destruction.');
});`,
        language: 'javascript',
      }
    ],
    mistakes: [
      'Writing conditional Liquid logic expecting it to execute uniquely for every anonymous visitor on a cached page.',
      'Failing to handle race conditions when apps like judge.me or yotpo re-render PDP review blocks.',
    ],
    checklist: [
      'I know why Liquid conditional checks cannot be used directly for A/B variant assignment.',
      'I know how to persist variation assignments across page reloads.',
    ],
    furtherReading: [
      { title: 'Shopify Engineering: How Shopify Caches Pages', url: 'https://shopify.engineering' },
    ],
  },
  {
    id: 'm7-l3',
    moduleId: 'module-7',
    slug: 'a-minimal-client-side-test-pattern-with-code',
    title: 'A Minimal Client-Side Test Pattern (with Code)',
    estimatedMinutes: 30,
    objectives: [
      'Build a lightweight (< 1KB), zero-dependency client-side A/B test harness in vanilla JS.',
      'Use CSS class toggling to eliminate layout shift.',
      'Persist variant assignments in localStorage and synchronize with the dataLayer.',
    ],
    videoSource: {
      title: 'Testing Client/Server JavaScript',
      embedUrl: 'https://www.youtube-nocookie.com/embed/lLqCXLYCqTI',
      channel: 'Kyle Robinson Young',
      duration: '14:38',
      description: 'Curated technical CRO masterclass from Kyle Robinson Young covering real-world heuristics, implementation blueprints, and optimization frameworks.',
      topics: ['Testing Client/Server JavaScript'],
    },
    sections: [
      {
        heading: 'Building a Zero-Dependency, < 1KB Client-Side Test Harness',
        body: `You do not need heavy 100KB third-party testing scripts to run rigorous A/B tests on Shopify. In fact, writing a custom vanilla JavaScript harness gives you complete control over Core Web Vitals and eliminates third-party script latency.

The Core Harness Architecture:
1. Fast In-Head Execution: Runs synchronously in the \`<head>\` to determine bucket assignment before the DOM begins rendering.
2. Deterministic Hash Bucket: Uses a simple string hash of the visitor ID + experiment ID to assign variants with mathematical uniformity.
3. CSS Class Flagging: Appends a class (e.g., \`exp-001-variant-b\`) to the \`<html>\` or \`<body>\` element.
4. Telemetry Integration: Dispatches an event into \`window.dataLayer\` for GA4 tracking.`,
        callout: {
          type: 'tip',
          text: 'Placing a lightweight bucket assignment script in theme.liquid `<head>` executes in less than 0.2ms with zero layout shifts.',
        },
      },
      {
        heading: 'Eliminating Layout Shift (CLS) via CSS Class Toggling',
        body: `The cleanest, most performant way to execute an A/B test is pure CSS mutation driven by the root experiment class.

Instead of writing JavaScript that moves elements around or injects HTML after page load:
1. Render both Control and Variant markup server-side in the Liquid template.
2. Hide the variant by default in CSS.
3. When the harness appends the variant class to \`<html>\`, instantly toggle visibility via CSS.
4. Because the browser computes styles during the initial layout pass, there is ZERO layout flicker and ZERO Cumulative Layout Shift (CLS).`,
        callout: {
          type: 'warning',
          text: 'Never use JavaScript setTimeout() to wait for elements before modifying them. That is the guaranteed recipe for visual layout flicker.',
        },
      },
      {
        heading: 'Persisting State in LocalStorage and Syncing with dataLayer',
        body: `To ensure complete analytics integrity, the client-side harness must synchronize with Google Tag Manager and GA4:
1. Check \`localStorage\` for an existing assignment. If none exists, assign 50/50 and store the value.
2. Push an \`experiment_impression\` event to \`window.dataLayer\` containing \`experiment_id\`, \`variant_id\`, and \`visitor_id\`.
3. Set a user property in GA4 so all downstream events (Add to Cart, Checkout, Purchase) are automatically attributed to the correct test arm.`,
        code: `// Minimal, Production-Ready Zero-Flicker A/B Test Harness (< 1KB)
(function() {
  const EXP_ID = 'EXP_PDP_STICKY_CTA_2026';
  const STORAGE_KEY = 'cro_' + EXP_ID;

  // 1. Retrieve or assign variant
  let variant = localStorage.getItem(STORAGE_KEY);
  if (!variant) {
    variant = Math.random() < 0.5 ? 'control' : 'variant_b';
    localStorage.setItem(STORAGE_KEY, variant);
  }

  // 2. Add class to root HTML element immediately (prevents FOUC)
  document.documentElement.classList.add(EXP_ID + '--' + variant);

  // 3. Dispatch dataLayer telemetry
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'experiment_impression',
    experiment_id: EXP_ID,
    variant_id: variant,
    timestamp: Date.now()
  });

  console.log(\`[CRO Harness] Active: \${EXP_ID} | Arm: \${variant}\`);
})();`,
        language: 'javascript',
      }
    ],
    mistakes: [
      'Waiting for \`DOMContentLoaded\` or \`window.load\` before assigning the variant, which causes severe visible page flicker.',
      'Forgetting to push the \`experiment_exposure\` event to GA4 on every relevant session.',
    ],
    checklist: [
      'I can implement the minimal CSS-class client-side testing pattern.',
      'I know how to prevent visible flicker using synchronous execution in the document head.',
    ],
    furtherReading: [
      { title: 'Cloudflare Workers A/B Testing Blueprint', url: 'https://developers.cloudflare.com/workers/examples/ab-testing/' },
      { title: 'GrowthBook: Eliminating A/B Testing Flicker', url: 'https://docs.growthbook.io' },
    ],
  },
  {
    id: 'm7-l4',
    moduleId: 'module-7',
    slug: 'no-flicker-testing-with-edge-middleware',
    title: 'No-Flicker Testing with Edge Middleware',
    estimatedMinutes: 25,
    objectives: [
      'Implement an edge A/B split router using Cloudflare Workers.',
      'Assign cookies at the edge before any HTML reaches the user browser.',
      'Route requests to alternate Shopify section or template files without URL redirects.',
    ],
    videoSource: {
      title: 'A/B Testing Course: Flickering? Anti-flickering!',
      embedUrl: 'https://www.youtube-nocookie.com/embed/rs2qcYlDoMM',
      channel: 'Data36 - Online Data Science Courses',
      duration: '8:25',
      description: 'Deep dive into why client-side DOM mutations cause Flash of Original Content (FOOC), and how anti-flicker snippets and CSS hiding techniques prevent visual page flickers.',
      topics: ['Anti-Flicker Snippets', 'FOOC Prevention', 'DOM Mutation Timing', 'CSS Hiding Script'],
    },
    sections: [
      {
        heading: 'Edge Split Routing with Cloudflare Workers',
        body: `Edge computing revolutionizes ecommerce experimentation by moving test logic from the user's browser to CDN edge nodes located milliseconds away from the visitor.

How Cloudflare Workers Split Traffic:
1. The visitor requests \`https://store.com/products/jacket\`.
2. The nearest Cloudflare Edge Worker intercepts the incoming HTTP request.
3. The worker inspects the incoming \`Cookie\` header for an existing assignment.
4. If no cookie is present, it assigns the visitor via an edge cryptographic randomizer and sets an immutable \`Set-Cookie\` header on the HTTP response.
5. Depending on the assignment, the Worker fetches either the standard template or the alternate variant template from the Shopify origin.`,
        callout: {
          type: 'tip',
          text: 'Edge Workers introduce less than 5ms of routing latency and eliminate 100% of client-side DOM mutation scripts.',
        },
      },
      {
        heading: 'Edge Cookie Assignment: Bypassing Browser Script Latency',
        body: `In client-side testing, the browser must:
1. Download the HTML.
2. Parse the HTML.
3. Download the 80KB testing JS library.
4. Execute the JS to read cookies.
5. Mutate the DOM.

With Edge Cookie Assignment:
The cookie is stamped on the HTTP response header before the browser ever receives the first byte of HTML!
When the HTML arrives in the browser, the variant markup is already baked into the DOM. The browser's HTML parser renders the variant immediately, achieving the fastest possible First Contentful Paint (FCP) and Largest Contentful Paint (LCP).`,
        callout: {
          type: 'note',
          text: 'Because edge cookies are set via HTTP headers, they are immune to Safari ITP restrictions that truncate JavaScript-created cookies to 7 days.',
        },
      },
      {
        heading: 'Routing to Alternate Shopify Section & Template Endpoints',
        body: `A major advantage of edge routing is that it does not require a visible browser redirect (e.g. redirecting from \`/products/shoe\` to \`/products/shoe-b\`). Redirects cause visible white flashes and hurt SEO.

Instead, the Edge Worker performs an internal server rewrite:
• The visitor's URL bar stays clean: \`https://store.com/products/shoe\`.
• The Worker requests \`https://store.com/products/shoe?view=experiment-v2\` from Shopify's origin.
• The Shopify CDN serves the alternate Liquid template \`product.experiment-v2.liquid\`.
• Search engine crawlers (Googlebot) are always routed to the canonical control template to safeguard SEO rankings.`,
        code: `// Production Cloudflare Edge Worker for Zero-Flicker Shopify A/B Testing
export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const url = new URL(request.url);

    // Filter to PDP pages and exclude bots / Googlebot
    const userAgent = request.headers.get('User-Agent') || '';
    const isBot = /bot|googlebot|crawler|spider|bingbot/i.test(userAgent);

    if (url.pathname.includes('/products/') && !isBot) {
      const cookieHeader = request.headers.get('Cookie') || '';
      const cookieMatch = cookieHeader.match(/cro_exp_01=([^;]+)/);
      let variant = cookieMatch ? cookieMatch[1] : null;
      let isNewAssignment = false;

      if (!variant) {
        variant = Math.random() < 0.5 ? 'control' : 'variant_b';
        isNewAssignment = true;
      }

      // If variant B, internally rewrite query to load alternate Liquid view
      const targetUrl = new URL(request.url);
      if (variant === 'variant_b') {
        targetUrl.searchParams.set('view', 'variant-b');
      }

      const response = await fetch(targetUrl.toString(), {
        headers: request.headers,
        method: request.method
      });

      // Clone response to attach Set-Cookie header if new visitor
      const modifiedResponse = new Response(response.body, response);
      if (isNewAssignment) {
        modifiedResponse.headers.append(
          'Set-Cookie',
          \`cro_exp_01=\${variant}; Path=/; Max-Age=2592000; SameSite=Lax; Secure\`
        );
      }
      return modifiedResponse;
    }

    return fetch(request);
  }
};`,
        language: 'javascript',
      }
    ],
    mistakes: [
      'Breaking Shopify cart token synchronization by mutating query parameters improperly at the edge.',
      'Failing to pass through original cookies and authorization headers.',
    ],
    checklist: [
      'I understand how Cloudflare Workers route alternate template views.',
      'I know how to preserve visitor variant cookies at the edge.',
    ],
    furtherReading: [
      { title: 'Cloudflare Workers Documentation', url: 'https://developers.cloudflare.com/workers/' },
    ],
  },
  {
    id: 'm7-l5',
    moduleId: 'module-7',
    slug: 'qa-checklist-before-every-test',
    title: 'The QA Checklist Before Every Test Launch',
    estimatedMinutes: 25,
    objectives: [
      'Execute an exhaustive 10-point quality assurance protocol before pushing live traffic.',
      'Test cross-browser rendering (iOS Safari, Android Chrome, Desktop Chrome, Firefox, Edge).',
      'Verify telemetry event firing and sample ratio mismatch (SRM) safeguards.',
    ],
    videoSource: {
      title: 'The Ultimate Shopify QA Checklist Before A/B Testing',
      embedUrl: 'https://www.youtube-nocookie.com/embed/Gm-0JGZbiQI',
      channel: 'Andy | CRO',
      duration: '17:03',
      description: 'Curated technical CRO masterclass from Andy | CRO covering real-world heuristics, implementation blueprints, and optimization frameworks.',
      topics: ['The Ultimate Shopify QA Checklist Before A/B Testing'],
    },
    sections: [
      {
        heading: 'The 10-Point Pre-Launch Quality Assurance Protocol',
        body: `Never launch an experiment directly to 100% of live traffic without passing through a formal pre-flight QA checklist:

1. Console Error Audit: Verify zero JavaScript exceptions across Control and Variant.
2. Layout Stability (CLS): Measure Cumulative Layout Shift using Chrome Performance panel (must be < 0.05).
3. Responsive Breakpoints: Verify rendering at 360px (compact mobile), 390px (iPhone 14/15), 768px (tablet), and 1440px (desktop).
4. Variant Selectors: Confirm variant switching (size/color) updates price, SKU, and image galleries seamlessly.
5. Inventory Edge Cases: Test out-of-stock, preorder, and backorder product behaviors.
6. Cart Drawer & Checkout Transition: Add items to cart and verify progression to the Shopify checkout endpoint.
7. Currency & Translation Compatibility: Test multi-currency selectors and translation app integrations.
8. Telemetry Verification: Confirm dataLayer event payloads in GA4 DebugView.
9. Browser Compatibility: Test on iOS Safari, Android Chrome, and Desktop Firefox.
10. Rollback Mechanism: Ensure the test can be disabled instantly via a single configuration flag without a full theme deployment.`,
        callout: {
          type: 'warning',
          text: 'Over 35% of failed A/B tests fail not because the idea was bad, but because a JavaScript error broke the checkout button on mobile Safari.',
        },
      },
      {
        heading: 'Cross-Browser & Hardware Verification: Safari, Chrome, Firefox, and Viewports',
        body: `Shopify traffic is overwhelmingly mobile, and mobile means WebKit (iOS Safari) and Blink (Android Chrome).
Desktop testing is never sufficient:
• iOS Safari Specifics: Test viewport height units (\`100vh\` vs \`100dvh\`), elastic overscroll bounces, and automatic zoom triggers on form input fields with font sizes under 16px.
• Android Chrome Specifics: Test software keyboard overlays that obscure sticky checkout buttons.
• Ad-Blocker Resiliency: Test with Brave Browser and uBlock Origin to ensure your site functions cleanly even when analytics telemetry scripts are blocked.`,
        callout: {
          type: 'tip',
          text: 'Always ensure input font sizes are at least 16px. Anything smaller triggers iOS Safari auto-zoom, disrupting mobile checkout ergonomics.',
        },
      },
      {
        heading: 'Telemetry Firing & Sample Ratio Mismatch (SRM) Safeguards',
        body: `Sample Ratio Mismatch (SRM) is the silent killer of experiment validity.
If you configure a 50/50 test and receive 10,000 visitors on Control and only 8,200 on Variant, you have an SRM (Chi-square p-value < 0.001).

Why SRM Occurs:
• The variant script crashes on specific devices (e.g. older Android versions), causing visitors to bounce or reload before tracking fires.
• The variant introduces severe page load latency, triggering visitor abandons during the redirect phase.
• Bot traffic or web crawlers are filtered unequally between test arms.

Before evaluating test results, run a Chi-square goodness-of-fit test. If SRM is detected, the experiment is fatally compromised and results CANNOT be trusted.`,
        code: `// Pre-Launch Chi-Square Sample Ratio Mismatch (SRM) Detector
function detectSRM(observedControl: number, observedVariant: number, expectedRatio: number = 0.5) {
  const total = observedControl + observedVariant;
  const expectedControl = total * expectedRatio;
  const expectedVariant = total * (1 - expectedRatio);

  // Chi-Square formula: sum of ((observed - expected)^2 / expected)
  const chiSquare = 
    Math.pow(observedControl - expectedControl, 2) / expectedControl +
    Math.pow(observedVariant - expectedVariant, 2) / expectedVariant;

  // For 1 degree of freedom, critical value at p=0.001 is 10.828, p=0.01 is 6.635
  const hasSevereSRM = chiSquare > 10.828;
  const hasModerateSRM = chiSquare > 6.635;

  return {
    totalVisitors: total,
    controlObserved: observedControl,
    variantObserved: observedVariant,
    chiSquareValue: chiSquare.toFixed(3),
    status: hasSevereSRM ? 'CRITICAL_SRM_TEST_INVALID' : hasModerateSRM ? 'SUSPICIOUS_SRM_INVESTIGATE' : 'SAMPLE_RATIO_HEALTHY'
  };
}

console.log('Healthy Sample:', detectSRM(10050, 9980));
console.log('SRM Detected Sample:', detectSRM(10050, 8420));`,
        language: 'javascript',
      }
    ],
    mistakes: [
      'Testing only in Chrome DevTools Device Mode and missing iOS Safari bottom nav bar overlap issues.',
      'Launching an A/B test on Friday at 5 PM before going offline for the weekend.',
    ],
    checklist: [
      'I execute all 10 points of the pre-launch QA checklist.',
      'I always have a rapid kill-switch mechanism ready before launch.',
    ],
    furtherReading: [
      { title: 'Lukas Vermeer: Sample Ratio Mismatch (SRM) Detection', url: 'https://lukasvermeer.nl' },
    ],
  },

  // MODULE 8: Performance & Core Web Vitals
  {
    id: 'm8-l1',
    moduleId: 'module-8',
    slug: 'lcp-inp-cls-what-each-one-measures',
    title: 'LCP, INP, CLS — What Each One Measures',
    estimatedMinutes: 20,
    objectives: [
      'Define Google Core Web Vitals: Largest Contentful Paint (LCP), Interaction to Next Paint (INP), Cumulative Layout Shift (CLS).',
      'Understand the proven mathematical correlation between site speed and conversion rate.',
      'Diagnose performance bottlenecks using Chrome DevTools Performance panel.',
    ],
    videoSource: {
      title: 'Core Web Vitals 2025 Explained: INP, LCP, CLS & How to Boost Your Site Speed!',
      embedUrl: 'https://www.youtube-nocookie.com/embed/m_yWVuf8ZkE',
      channel: 'FullStackDev',
      duration: '5:32',
      description: 'Curated technical CRO masterclass from FullStackDev covering real-world heuristics, implementation blueprints, and optimization frameworks.',
      topics: ['Core Web Vitals 2025 Explained: INP', 'CLS & How to Boost Your Site Speed!'],
    },
    sections: [
      {
        heading: 'Defining Google Core Web Vitals: LCP, INP, and CLS',
        body: `Core Web Vitals (CWV) are Google's standardized metrics for measuring real-world user experience and technical page performance:

1. Largest Contentful Paint (LCP):
• What it measures: Perceived loading speed. The time it takes for the largest visual element in the viewport (typically the hero image on a PDP or banner on the homepage) to finish rendering.
• Target: Good = ≤ 2.5s | Needs Improvement = 2.5s - 4.0s | Poor = > 4.0s.

2. Interaction to Next Paint (INP):
• What it measures: Visual responsiveness to user input (replaces First Input Delay). Measures the latency between a customer clicking an interactive element (e.g. variant pill, cart drawer button) and the next frame presenting visual feedback.
• Target: Good = ≤ 200ms | Needs Improvement = 200ms - 500ms | Poor = > 500ms.

3. Cumulative Layout Shift (CLS):
• What it measures: Visual stability. The sum of all unexpected layout shifts occurring during the visitor session.
• Target: Good = ≤ 0.1 | Needs Improvement = 0.1 - 0.25 | Poor = > 0.25.`,
        callout: {
          type: 'tip',
          text: 'INP officially replaced FID in 2024. In ecommerce, sluggish variant switching and delayed cart drawer opens are the #1 cause of failing INP scores.',
        },
      },
      {
        heading: 'The Mathematical Correlation: Site Speed vs. Conversion Rate',
        body: `Performance is not just an engineering metric; it is a financial lever. Numerous empirical studies from Google, Deloitte, and Cloudflare demonstrate the direct financial impact of latency:

• Every 100ms reduction in mobile checkout load time yields a 1.1% to 1.5% increase in conversion rate.
• A 1-second delay in mobile PDP load time reduces conversion rates by up to 7% and increases bounce rates by 9%.
• Mobile shoppers operate under high cognitive distraction. When an interface fails to respond within 200ms, users perceive the store as broken or insecure, triggering abandoned sessions.`,
        callout: {
          type: 'warning',
          text: 'A beautiful redesign that drops mobile LCP from 2.2s to 4.5s will almost always lose an A/B test, regardless of how elegant the visuals look.',
        },
      },
      {
        heading: 'Diagnosing Performance Bottlenecks with Chrome DevTools',
        body: `Never rely on generic scorecards. Diagnose real bottlenecks using Chrome DevTools:
1. Performance Panel:
   Record a profile on mobile CPU throttling (4x slowdown). Inspect the "Main" thread to identify long tasks (> 50ms) caused by bloated third-party JavaScript.
2. Web Vitals Overlay:
   Enable the "Show Web Vitals" badge in DevTools Console to inspect live LCP element targets and CLS shift triggers in real-time.
3. Network Waterfall:
   Sort network requests by "Waterfall" to locate render-blocking CSS files and unoptimized hero images competing for initial bandwidth.`,
        code: `// Browser Performance Observer for Live Core Web Vitals & INP Telemetry
if ('PerformanceObserver' in window) {
  // 1. Observe Largest Contentful Paint (LCP)
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('[CWV Monitor] LCP Render Time:', lastEntry.renderTime || lastEntry.loadTime, lastEntry.element);
  }).observe({ type: 'largest-contentful-paint', buffered: true });

  // 2. Observe Cumulative Layout Shift (CLS)
  let clsScore = 0;
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (!(entry as any).hadRecentInput) {
        clsScore += (entry as any).value;
        console.log('[CWV Monitor] CLS Score Cumulative:', clsScore);
      }
    }
  }).observe({ type: 'layout-shift', buffered: true });

  // 3. Observe Interaction to Next Paint (INP)
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      const duration = entry.duration;
      console.log('[CWV Monitor] INP Interaction Duration:', duration, 'ms', entry);
      if (duration > 200) {
        console.warn('[CWV Alert] Slow INP detected (>200ms) on interaction:', (entry as any).target);
      }
    }
  }).observe({ type: 'first-input', buffered: true });
}`,
        language: 'javascript',
      }
    ],
    mistakes: [
      'Focusing exclusively on desktop Lighthouse scores while 80% of buyers are on 4G mobile devices.',
      'Optimizing for Total Blocking Time (TBT) in synthetic tests while ignoring field INP from real users.',
    ],
    checklist: [
      'I know the good/poor thresholds for LCP, INP, and CLS.',
      'I can identify the LCP candidate element on any Shopify PDP.',
    ],
    furtherReading: [
      { title: 'web.dev: Core Web Vitals Documentation', url: 'https://web.dev/vitals/' },
    ],
  },
  {
    id: 'm8-l2',
    moduleId: 'module-8',
    slug: 'the-shopify-performance-killers-apps-scripts-images-fonts',
    title: 'The Shopify Performance Killers: Apps, Scripts, Images, Fonts',
    estimatedMinutes: 25,
    objectives: [
      'Audit and eliminate third-party Shopify app bloat.',
      'Configure font-display: swap and preloading for local web fonts.',
      'Avoid render-blocking script tags in theme.liquid.',
    ],
    videoSource: {
      title: 'How To Remove Unused Code & App Bloat In Shopify',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dS6rTOQ2L8A',
      channel: 'SmartMoneyTutorials',
      duration: '10:30',
      description: 'Practical walkthrough on locating zombie scripts from uninstalled apps, eliminating render-blocking CSS/JS files, and streamlining the asset pipeline on Shopify stores.',
      topics: ['App Bloat Cleanup', 'Unused Code Removal', 'Asset Pipeline Optimization', 'Page Speed Diagnostics'],
    },
    sections: [
      {
        heading: 'Auditing & Eliminating Third-Party Shopify App Bloat',
        body: `The primary reason Shopify themes degrade over time is app accumulation. A merchant installs 20 apps for pop-ups, spin-to-win wheels, live chat, loyalty points, and currency converters.
Even when an app is uninstalled from the Shopify Admin, its residual \`<script>\` tags often remain orphaned inside \`theme.liquid\`!

The App Audit Protocol:
1. Network Script Inventory: Filter DevTools Network by \`.js\` and sort by transfer size and execution time.
2. Identify Duplicate Services: Many stores inadvertently run two analytics pixels, two review widgets, and three social sharing libraries simultaneously.
3. Replace Apps with Native Liquid / Storefront API: Replace third-party apps for sticky carts, basic FAQs, and currency selectors with lightweight native Liquid components.`,
        callout: {
          type: 'warning',
          text: 'Third-party storefront integrations must be deployed as Theme App Extensions (App Embeds), ensuring non-blocking asynchronous execution without modifying theme.liquid directly.',
        },
      },
      {
        heading: 'Configuring Font Preloading and font-display: swap',
        body: `Custom typography adds brand personality, but unoptimized web fonts trigger Flash of Invisible Text (FOIT) where the page appears blank for seconds on mobile connections.

Best Practices for Shopify Typography:
1. Use \`font-display: swap\`: Instructs the browser to render a fallback system font immediately, swapping in the custom font once loaded.
2. Preload Critical Body & Header Fonts: Add \`<link rel="preload" as="font" type="font/woff2" crossorigin>\` in \`theme.liquid\` for the 1 or 2 primary font weights used above the fold.
3. Stick to WOFF2 Format: WOFF2 offers 30% higher compression than legacy WOFF and TTF formats.`,
        callout: {
          type: 'tip',
          text: 'Using Shopify’s native font picker (`settings.type_header_font`) automatically serves optimized fonts, but preloading the WOFF2 asset in theme.liquid shaves 300ms off LCP.',
        },
      },
      {
        heading: 'Eliminating Render-Blocking Resources in theme.liquid',
        body: `Every script tag without an \`async\` or \`defer\` attribute halts the browser’s HTML parser.
Rules for Clean Shopify Scripts:
• Never include synchronous \`<script src="...">\` tags in the \`<head>\` unless it is a sub-1KB critical telemetry harness.
• Use \`defer\` for scripts that interact with the DOM to guarantee execution in document order after parsing completes.
• Use \`async\` for independent third-party tracking scripts (Hotjar, Google Analytics) so they do not impede page rendering.`,
        code: `<!-- Optimized theme.liquid Header Assets Snippet -->
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- 1. Preconnect to critical domains -->
  <link rel="preconnect" href="https://cdn.shopify.com" crossorigin>
  <link rel="preconnect" href="https://fonts.shopifycdn.com" crossorigin>

  <!-- 2. Preload primary WOFF2 brand font -->
  <link rel="preload" 
        href="{{ 'CabinetGrotesk-Bold.woff2' | asset_url }}" 
        as="font" 
        type="font/woff2" 
        crossorigin>

  <!-- 3. Deferred Theme Core Scripts -->
  <script src="{{ 'theme-core.js' | asset_url }}" defer></script>
  
  <!-- 4. Async Analytics (Non-blocking) -->
  <script src="{{ 'analytics-telemetry.js' | asset_url }}" async></script>
</head>`,
        language: 'html',
      }
    ],
    mistakes: [
      'Allowing marketing to install 3 different live chat apps without evaluating their impact on INP.',
      'Using \`loading="lazy"\` on the above-the-fold featured product hero image (this destroys LCP!).',
    ],
    checklist: [
      'I can audit app scripts using Chrome DevTools Coverage panel.',
      'I know never to lazy-load the primary hero image.',
    ],
    furtherReading: [
      { title: 'Shopify Performance Best Practices Guide', url: 'https://shopify.dev/docs/themes/best-practices/performance' },
    ],
  },
  {
    id: 'm8-l3',
    moduleId: 'module-8',
    slug: 'fixing-lcp-on-a-shopify-pdp-with-liquid-code',
    title: 'Fixing LCP on a Shopify PDP (with Liquid Code)',
    estimatedMinutes: 30,
    objectives: [
      'Write optimized, responsive Liquid image tags for the PDP hero image.',
      'Implement fetchpriority="high" and preload link headers for LCP images.',
      'Eliminate layout shifts by enforcing aspect-ratio containers.',
    ],
    videoSource: {
      title: 'How To Fix LCP Image Lazy Loading Shopify (SIMPLE & Easy Guide!)',
      embedUrl: 'https://www.youtube-nocookie.com/embed/R5Wc2eM_Ir8',
      channel: 'Guide Nation',
      duration: '3:10',
      description: 'Curated technical CRO masterclass from Guide Nation covering real-world heuristics, implementation blueprints, and optimization frameworks.',
      topics: ['How To Fix LCP Image Lazy Loading Shopify (SIMPLE & Easy Guide!)'],
    },
    sections: [
      {
        heading: 'Writing Responsive, Next-Gen Liquid Image Tags for the PDP Hero',
        body: `On a Product Detail Page, the primary product gallery image is virtually always the Largest Contentful Paint (LCP) element.
Serving an uncompressed, desktop-resolution 2500px image to a mobile phone with a 390px viewport destroys your LCP score.

Modern Liquid Responsive Image Architecture:
Use Shopify's native \`image_tag\` filter with responsive \`srcset\` and \`sizes\` attributes:
• \`widths\`: Generates multiple optimized WebP/AVIF renditions (360, 540, 720, 900, 1200, 1600).
• \`sizes\`: Informs the browser's preload scanner how much viewport width the image will occupy at different screen breakpoints.`,
        callout: {
          type: 'shopify',
          text: 'Shopify automatically converts uploaded PNG and JPEG assets into next-gen AVIF and WebP formats when accessed through the CDN image filters.',
        },
      },
      {
        heading: 'Implementing fetchpriority="high" and Preload Link Headers',
        body: `By default, browsers discover images lazily as they parse the HTML DOM.
For the LCP hero image, this introduces unnecessary delay.

How to Accelerate the Hero Image:
1. \`fetchpriority="high"\`: Explicitly instructs the browser network scheduler to download this image with highest priority, ahead of non-critical stylesheets and scripts.
2. \`loading="eager"\`: Never use \`loading="lazy"\` on above-the-fold hero images! Lazy-loading an LCP image delays rendering by 500ms to 1200ms.
3. Preload Link in \`<head>\`: On PDP pages, dynamically inject a \`<link rel="preload" as="image">\` header for the featured product media.`,
        callout: {
          type: 'warning',
          text: 'Applying loading="lazy" to your PDP hero image is one of the most common reasons Shopify stores fail Google Core Web Vitals.',
        },
      },
      {
        heading: 'Eliminating Layout Shift via Aspect-Ratio CSS Containers',
        body: `When an image downloads over the network, if the browser does not know its aspect ratio in advance, the container starts at 0px height.
When the image finishes loading, the container abruptly snaps open, pushing the title, price, and Add to Cart button down the page. This causes severe Cumulative Layout Shift (CLS).

The Solution:
Always define explicit \`width\` and \`height\` attributes on the image tag, or enforce CSS \`aspect-ratio: 1 / 1\` on the parent image wrapper.
This reserves the exact pixel space before the image bytes arrive over the network, guaranteeing zero CLS.`,
        code: `<!-- Production High-Performance Liquid PDP Hero Snippet -->
{%- assign featured_media = product.selected_or_first_available_variant.featured_media | default: product.featured_media -%}

<div class="product-gallery__hero-wrapper" style="aspect-ratio: {{ featured_media.aspect_ratio | default: 1 }};">
  {{ featured_media | image_url: width: 1200 | image_tag:
    widths: '375, 550, 750, 990, 1200',
    sizes: '(min-width: 990px) 50vw, 100vw',
    loading: 'eager',
    fetchpriority: 'high',
    alt: product.title | escape,
    class: 'product-gallery__hero-img'
  }}
</div>

<style>
.product-gallery__hero-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  background-color: #f4f4f4; /* Placeholder skeleton background */
}
.product-gallery__hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>`,
        language: 'html',
      }
    ],
    mistakes: [
      'Hardcoding \`loading="lazy"\` on all images in a theme loop without checking \`forloop.first\`.',
      'Missing the \`fetchpriority="high"\` attribute on critical hero media.',
    ],
    checklist: [
      'I can implement the high-priority Liquid image pattern.',
      'I understand the difference between loading="eager" and fetchpriority="high".',
    ],
    furtherReading: [
      { title: 'web.dev: Optimize Largest Contentful Paint', url: 'https://web.dev/optimize-lcp/' },
    ],
  },
  {
    id: 'm8-l4',
    moduleId: 'module-8',
    slug: 'building-a-performance-budget-and-enforcing-it',
    title: 'Building a Performance Budget and Enforcing It',
    estimatedMinutes: 20,
    objectives: [
      'Establish concrete performance budgets for JavaScript, CSS, images, and total page weight.',
      'Monitor regressions during development sprints.',
      'Prevent gradual performance degradation as stores grow.',
    ],
    videoSource: {
      title: '#AskChrome Live: Implementing Performance Budgets',
      embedUrl: 'https://www.youtube-nocookie.com/embed/vVlpCmK1l5k',
      channel: 'Chrome for Developers',
      duration: '18:10',
      description: 'Google Chrome developer advocates discuss establishing web performance budgets, setting JavaScript byte caps, and preventing code bloat from eroding conversion rates.',
      topics: ['Performance Budgets', 'JavaScript Byte Budgets', 'Core Web Vitals Thresholds', 'Continuous Monitoring'],
    },
    sections: [
      {
        heading: 'Establishing Concrete Performance Budgets for Shopify Sprints',
        body: `A performance budget is a set of hard constraints that dictate the maximum permissible weight and execution time of your storefront assets. Without a budget, developer teams succumb to "feature creep," steadily degrading store velocity.

Recommended D2C Ecommerce Performance Budget:
• Total Compressed Page Weight (Above the Fold): ≤ 1.2 MB.
• Total First-Party JavaScript: ≤ 80 KB gzipped.
• Total CSS: ≤ 50 KB gzipped.
• Total Web Fonts: ≤ 60 KB (max 2 font files, WOFF2 only).
• Hero Image Size (Mobile): ≤ 120 KB WebP/AVIF.
• Time to Interactive (TTI on 4G Mobile): ≤ 3.5 seconds.`,
        callout: {
          type: 'tip',
          text: 'A budget transforms performance from an abstract debate into an engineering requirement: "If we add this 40KB review widget, which 40KB of existing code are we deleting to stay under budget?"',
        },
      },
      {
        heading: 'Monitoring Regressions During Development Sprints',
        body: `Performance regression happens incrementally: an uncompressed 2MB lifestyle banner here, an un-debounced scroll listener there.
To prevent regressions:
1. Local Bundle Auditing: Use tools like \`bundlesize\` or webpack/vite bundle analyzer in your development workflow.
2. WebPageTest Scheduled Tests: Run automated weekly synthetic tests on a real Moto G4 device on standard 4G networks.
3. Real User Monitoring (RUM): Inspect the Shopify Admin "Online Store Speed" dashboard and Chrome User Experience Report (CrUX) for real-world field data.`,
        callout: {
          type: 'note',
          text: 'Lab data (Lighthouse) shows potential issues under synthetic conditions; Field data (CrUX) shows what actual paying customers experience.',
        },
      },
      {
        heading: 'Preventing Gradual Performance Degradation as Stores Scale',
        body: `As an ecommerce company scales, multiple departments touch the codebase: marketing tags pixels, merchandising adds banners, and support installs help widgets.

Governance Mechanisms:
• App Installation Policy: No third-party app may be installed on the production theme without engineering sign-off on its CWV impact.
• Quarterly Script Pruning: Conduct a quarterly audit to delete tracking pixels from completed campaigns and unused marketing vendors.
• Asset Compression Gateways: Enforce automated image optimization and SVG minification via Git pre-commit hooks.`,
        code: `// Performance Budget Configuration Schema (budget.json)
{
  "resourceSizes": [
    {
      "resourceType": "script",
      "budget": 120
    },
    {
      "resourceType": "total",
      "budget": 1200
    },
    {
      "resourceType": "stylesheet",
      "budget": 60
    },
    {
      "resourceType": "font",
      "budget": 70
    },
    {
      "resourceType": "image",
      "budget": 800
    }
  ],
  "resourceCounts": [
    {
      "resourceType": "third-party",
      "budget": 12
    }
  ]
}`,
        language: 'json',
      }
    ],
    mistakes: [
      'Setting budgets based only on desktop network speeds (simulate 4G mobile fast/slow).',
      'Treating budgets as suggestions rather than strict release gates.',
    ],
    checklist: [
      'I know how to define a budget.json file for Lighthouse.',
      'I can enforce performance budgets in theme development workflows.',
    ],
    furtherReading: [
      { title: 'web.dev: Performance Budgets 101', url: 'https://web.dev/performance-budgets-101/' },
    ],
  },
  {
    id: 'm8-l5',
    moduleId: 'module-8',
    slug: 'lighthouse-ci-in-a-theme-repo',
    title: 'Lighthouse CI in a Shopify Theme Repo',
    estimatedMinutes: 25,
    objectives: [
      'Configure GitHub Actions with Lighthouse CI (@lhci/cli).',
      'Run automated audits against local development servers or preview themes.',
      'Block pull requests that regress Core Web Vitals below acceptable thresholds.',
    ],
    videoSource: {
      title: 'How to Analyze and Improve Web Performance with GitHub Actions and Lighthouse CI',
      embedUrl: 'https://www.youtube-nocookie.com/embed/cAJJ-fV4Wrw',
      channel: 'Code with Ahsan',
      duration: '14:40',
      description: 'Step-by-step tutorial on setting up Lighthouse CI inside a GitHub Actions pipeline, configuring lighthouserc assertions, and blocking PRs that degrade performance scores.',
      topics: ['Lighthouse CI', 'GitHub Actions CI/CD', 'Automated Auditing', 'Regression Testing'],
    },
    sections: [
      {
        heading: 'Configuring GitHub Actions with Lighthouse CI (@lhci/cli)',
        body: `Automated testing is the only reliable way to enforce performance standards across a development team. By integrating Lighthouse CI into your GitHub Actions CI/CD pipeline, every Pull Request is automatically audited before merging into the main branch.

The CI Workflow:
1. Developer opens a Pull Request modifying Liquid, CSS, or JS.
2. GitHub Actions spins up a headless container and launches a local preview server or deploys a temporary Shopify preview theme.
3. Lighthouse CI audits mobile viewports 3 times and averages the results to eliminate statistical noise.
4. If scores meet criteria, the PR receives a green check. If scores regress, the PR is automatically blocked.`,
        callout: {
          type: 'tip',
          text: 'Run Lighthouse CI with desktop and mobile profiles. Focus on mobile: that is where 70%+ of your ecommerce transactions occur.',
        },
      },
      {
        heading: 'Running Automated Audits Against Preview Themes',
        body: `Testing static HTML files does not reflect real Shopify behavior. Your CI pipeline should test against an actual Shopify theme environment.

Shopify CLI Integration:
Use \`shopify theme push --unpublished\` within GitHub Actions to deploy the PR branch to a temporary, hidden development theme.
Lighthouse CI then audits the live preview URL (e.g., \`https://store.com/?preview_theme_id=14982189\`), testing real CDN response times and Liquid rendering speeds.`,
        callout: {
          type: 'warning',
          text: 'Always append preview credentials or bypass password protection cookies in your CI audit script so Lighthouse does not test the password page!',
        },
      },
      {
        heading: 'Blocking Pull Requests That Regress Core Web Vitals',
        body: `Configure assertions in \`.lighthouserc.js\` to define strict pass/fail criteria:
• Fail build if Cumulative Layout Shift exceeds 0.1.
• Fail build if Largest Contentful Paint exceeds 3000ms.
• Warn if Total Blocking Time (TBT) exceeds 300ms.
• Enforce minimum SEO and Accessibility audit scores of 95.

This prevents developers and agencies from accidentally shipping unoptimized scripts or uncompressed images to production.`,
        code: `// Production Lighthouse CI Configuration (.lighthouserc.js)
module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      settings: {
        emulatedFormFactor: 'mobile',
        throttlingMethod: 'simulate',
        throttling: {
          rttMs: 150,
          throughputKbps: 1638.4,
          cpuSlowdownMultiplier: 4
        }
      }
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.85 }],
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2800 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.08 }],
        'total-blocking-time': ['error', { maxNumericValue: 350 }]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};`,
        language: 'javascript',
      }
    ],
    mistakes: [
      'Running LHCI only once per build — network noise requires at least 3 runs to compute median metrics.',
      'Running audits on an empty demo store that lacks realistic product images, reviews, and apps.',
    ],
    checklist: [
      'I can configure .lighthouserc.json with strict assertions.',
      'I know how to run LHCI in a GitHub Actions workflow.',
    ],
    furtherReading: [
      { title: 'Google Lighthouse CI GitHub Repository', url: 'https://github.com/GoogleChrome/lighthouse-ci' },
    ],
  },
];
