import { Lesson } from '../../types/curriculum';

export const PHASE_4_LESSONS: Lesson[] = [
  // MODULE 13: Program Management & Reporting
  {
    id: 'm13-l1',
    moduleId: 'module-13',
    slug: 'building-a-90-day-cro-roadmap',
    title: 'Building a 90-Day CRO Roadmap',
    estimatedMinutes: 25,
    objectives: [
      'Structure a quarterly experimentation roadmap balanced across quick wins and high-impact bets.',
      'Allocate sprints across discovery, design, development, execution, and analysis.',
      'Forecast pipeline test velocity and expected revenue returns.',
    ],
    videoSource: {
      title: 'How to increase your conversion rate on Shopify in 2026 - Full CRO Guide',
      embedUrl: 'https://www.youtube-nocookie.com/embed/4KnOGk0cRJw',
      channel: 'Fabian Gmeindl',
      duration: '49:54',
      description: 'Curated technical CRO masterclass from Fabian Gmeindl covering real-world heuristics, implementation blueprints, and optimization frameworks.',
      topics: ['How to increase your conversion rate on Shopify in 2026', 'Full CRO Guide'],
    },
    sections: [
      {
        heading: 'Structuring a 90-Day Quarterly Experimentation Roadmap',
        body: `A successful CRO program is not a collection of sporadic ad-hoc tests; it is a disciplined, predictable quarterly engineering roadmap.
The Balanced Portfolio Strategy (70 / 20 / 10 Rule):
• 70% Core Optimization Bets: High-confidence, friction-reducing tests on high-traffic purchase surfaces (PDP Buy Box, Sticky ATC, Cart Drawer Free Shipping Bar). Expected win rate: 35-45%.
• 20% Expansion & Re-architecture Bets: Deeper functional interventions (interactive sizing drawers, collection faceted navigation, predictive search redesigns).
• 10% Moonshot / Radical Innovations: Bold new value propositions, bundling mechanics, or headless edge-routed flows. Low win rate, but massive 30%+ breakout revenue potential if successful.`,
        callout: {
          type: 'tip',
          text: 'A quarterly roadmap committed to 6-8 well-formulated experiments beats 25 rushed tests that lack statistical power and qualitative backing.',
        },
      },
      {
        heading: 'Sprint Allocation: Discovery, Design, Dev, Execution, and Post-Mortem',
        body: `High-velocity CRO teams run in 2-week bi-weekly sprint rhythms with clear phase handoffs:
• Week 1 (Discovery & Design): Data analysts review GA4 drop-offs and session recordings. UX designers produce mobile-first Figma prototypes for prioritized backlog items.
• Week 2 (Engineering & QA): Shopify developers build variants using Theme App Extensions, Section Rendering API, or Edge Workers. 10-point cross-browser QA protocol is executed.
• Running Phase (Weeks 3-4): The test runs in production across 2 full weekly business cycles (14 days minimum).
• Analysis & Hardcoding: Final Bayesian/Frequentist calculations are completed. Winning code is cleanly merged into the core theme within 10 days.`,
        callout: {
          type: 'shopify',
          text: 'Ensure your sprint planning reserves 20% of engineering bandwidth for hardcoding winning variants into Liquid to prevent third-party script bloat.',
        },
      },
      {
        heading: 'Forecasting Pipeline Test Velocity and Expected Revenue Returns',
        body: `How to model the financial return of a CRO program for executive leadership:
Key Forecasting Variables:
• Monthly Sessions: Baseline traffic volume (e.g. 150,000 sessions).
• Baseline CVR & AOV: e.g. 2.4% CVR at $85 AOV = $306,000 monthly gross revenue.
• Test Velocity: 2 tests concluded per month (6 per quarter).
• Historical Win Rate: Conservative 30% win rate (2 winning tests per quarter).
• Average Winning Lift: 6% relative lift per winner.
Compounding Impact:
Because winning tests compound multiplicatively, two 6% winning tests increase baseline revenue by:
1.06 × 1.06 = 12.36% annualized recurring lift, generating an extra $37,800/month ($453,600/year)!`,
        code: `// Quarterly CRO Revenue Lift & Velocity Forecaster
interface RoadmapForecastParams {
  monthlySessions: number;
  baselineCvrPercent: number;
  baselineAov: number;
  testsPerQuarter: number;
  expectedWinRate: number; // e.g. 0.33 for 33%
  averageRelativeLiftPerWin: number; // e.g. 0.07 for 7%
}

function forecastQuarterlyCroReturn(params: RoadmapForecastParams) {
  const baselineMonthlyRevenue = params.monthlySessions * (params.baselineCvrPercent / 100) * params.baselineAov;
  const expectedWinners = Math.floor(params.testsPerQuarter * params.expectedWinRate);
  
  // Compounded lift calculation: (1 + lift)^winners
  const compoundedLiftMultiplier = Math.pow(1 + params.averageRelativeLiftPerWin, expectedWinners);
  const newMonthlyRevenue = baselineMonthlyRevenue * compoundedLiftMultiplier;
  const monthlyIncrementalRevenue = newMonthlyRevenue - baselineMonthlyRevenue;
  const annualizedIncrementalRevenue = monthlyIncrementalRevenue * 12;

  return {
    baselineMonthlyRevenue: '$' + Math.round(baselineMonthlyRevenue).toLocaleString(),
    expectedWinnersPerQuarter: expectedWinners,
    compoundedRevenueLiftPercent: ((compoundedLiftMultiplier - 1) * 100).toFixed(2) + '%',
    newMonthlyRunRate: '$' + Math.round(newMonthlyRevenue).toLocaleString(),
    annualizedIncrementalGain: '$' + Math.round(annualizedIncrementalRevenue).toLocaleString()
  };
}

console.log(forecastQuarterlyCroReturn({
  monthlySessions: 180000,
  baselineCvrPercent: 2.2,
  baselineAov: 92.00,
  testsPerQuarter: 6,
  expectedWinRate: 0.33, // 2 winners
  averageRelativeLiftPerWin: 0.065 // 6.5% lift
}));`,
        language: 'javascript',
      }
    ],
    mistakes: [
      'Committing to 20 simultaneous tests on low-traffic stores, causing sample pollution.',
      'Planning experiments without allocating time for post-test analysis and code cleanup.',
    ],
    checklist: [
      'I can author a balanced 90-day experimentation roadmap.',
      'I align test cadence with store promotional calendars.',
    ],
    furtherReading: [
      { title: 'Speero: Building an Experimentation Program', url: 'https://speero.com' },
    ],
  },
  {
    id: 'm13-l2',
    moduleId: 'module-13',
    slug: 'guardrail-metrics-aov-refunds-ltv-page-speed',
    title: 'Guardrail Metrics: AOV, Refunds, LTV, Page Speed',
    estimatedMinutes: 20,
    objectives: [
      'Define non-negotiable guardrail metrics for every test.',
      'Detect when an apparent conversion lift is secretly damaging business health.',
      'Establish abort triggers when guardrails are breached.',
    ],
    videoSource: {
      title: 'A/B Testing Metrics: What You Need to Know About Success, Driver, and Guardrail Metrics!',
      embedUrl: 'https://www.youtube-nocookie.com/embed/SuXc5ckvlJ8',
      channel: 'Emma Ding',
      duration: '11:13',
      description: 'Curated technical CRO masterclass from Emma Ding covering real-world heuristics, implementation blueprints, and optimization frameworks.',
      topics: ['A/B Testing Metrics: What You Need to Know About Success', 'Driver', 'and Guardrail Metrics!'],
    },
    sections: [
      {
        heading: 'Defining Non-Negotiable Guardrail Metrics for Every Test',
        body: `A test that boosts Conversion Rate while destroying profitability is an absolute failure. Every single test brief must define non-negotiable guardrail metrics alongside the primary KPI.
Universal Ecommerce Guardrails:
1. Average Order Value (AOV): Ensures a test isn't lifting orders by inadvertently incentivizing cheap low-ticket SKUs.
2. Gross Margin & Net Revenue: Protects bottom-line dollar earnings after Cost of Goods Sold (COGS) and discount deductions.
3. 30-Day Product Return Rate: Detects whether aggressive copy or misleading imagery created unmet customer expectations.
4. Core Web Vitals (INP and CLS): Guarantees that the technical implementation did not introduce layout thrashing or input latency.`,
        callout: {
          type: 'warning',
          text: 'Never evaluate an Add-to-Cart or CVR test in isolation without monitoring AOV. If AOV drops by more than the CVR lift percentage, net revenue fell.',
        },
      },
      {
        heading: 'Detecting Hidden Revenue Cannibalization and Profit Leaks',
        body: `How apparent "winners" secretly damage ecommerce health:
• The Low-Ticket Trap: A promotional banner prompts users to add a $5 mystery item to their cart. Sitewide CVR jumps by 15%, but AOV plummets from $85 to $58. Total gross revenue falls by 21%.
• The Return Spike Trap: A redesigned size chart promises "Generous Oversized Fit." Customers order smaller sizes, leading to a massive 24% return rate 3 weeks later, wiping out gross margins in reverse shipping postage.
• The Discount Cannibalization Trap: A prominent sitewide promo code box encourages users who were already intending to pay full price to search Google for coupons, leaking traffic to coupon affiliate sites.`,
        callout: {
          type: 'tip',
          text: 'Always track Revenue Per Session (RPS) as the ultimate arbiter when CVR and AOV move in opposing directions.',
        },
      },
      {
        heading: 'Establishing Automated Abort Triggers When Guardrails Are Breached',
        body: `When an experiment causes catastrophic unintended harm, waiting 14 days for statistical conclusion burns tens of thousands of dollars.
Automated Abort Rules:
• Immediate Technical Rollback: If client-side JavaScript error rates spike by > 200% on the variant within 2 hours of launch, the test harness must automatically disable itself.
• Sample Ratio Mismatch (SRM) Abort: If Chi-square p-value drops below 0.001 after 2,000 visitors, halt the test to investigate tracking or redirect errors.
• Commercial Circuit Breaker: If variant Net Revenue Per Session drops by > 15% with p < 0.05, immediately abort to protect business cash flow.`,
        code: `// Automated Experiment Circuit Breaker & Guardrail Monitor
interface GuardrailAuditInput {
  testId: string;
  runtimeDays: number;
  controlOrders: number;
  controlRevenue: number;
  variantOrders: number;
  variantRevenue: number;
  variantJsErrorCount: number;
}

function evaluateExperimentGuardrails(input: GuardrailAuditInput) {
  // 1. Technical safety check
  if (input.variantJsErrorCount > 50 && input.runtimeDays <= 1) {
    return { status: 'IMMEDIATE_ABORT', reason: 'CRITICAL_JS_EXCEPTIONS_DETECTED' };
  }

  const controlAov = input.controlRevenue / input.controlOrders;
  const variantAov = input.variantRevenue / input.variantOrders;
  const aovDropPercent = ((controlAov - variantAov) / controlAov) * 100;

  // 2. Financial safety check: AOV severe degradation
  if (aovDropPercent > 18 && input.variantOrders > 100) {
    return { 
      status: 'ABORT_CIRCUIT_BREAKER_TRIGGERED', 
      reason: \`Severe AOV degradation (-\${aovDropPercent.toFixed(1)}%). Cancelling test to protect margins.\` 
    };
  }

  return { status: 'HEALTHY_CONTINUE_TEST', reason: 'All guardrail metrics within safe operating thresholds.' };
}

console.log(evaluateExperimentGuardrails({
  testId: 'EXP-109',
  runtimeDays: 3,
  controlOrders: 420,
  controlRevenue: 37800, // $90 AOV
  variantOrders: 480,
  variantRevenue: 33600, // $70 AOV (-22.2% AOV)
  variantJsErrorCount: 2
}));`,
        language: 'javascript',
      }
    ],
    mistakes: [
      'Celebrating a CVR win while ignoring a 20% drop in AOV that destroyed gross margin.',
      'Failing to monitor return rates 30 days after a test concludes.',
    ],
    checklist: [
      'I define at least 2 guardrail metrics in every experiment brief.',
      'I set automated thresholds to pause tests if guardrails regress by > 5%.',
    ],
    furtherReading: [
      { title: 'Ronny Kohavi: Trustworthy Online Controlled Experiments', url: 'https://experimentguide.com' },
    ],
  },
  {
    id: 'm13-l3',
    moduleId: 'module-13',
    slug: 'the-cro-dashboard-what-to-show-founders',
    title: 'The CRO Dashboard: What to Show Founders',
    estimatedMinutes: 20,
    objectives: [
      'Translate technical statistical outcomes into bottom-line executive revenue metrics.',
      'Design an executive dashboard highlighting win rate, cumulative annualized revenue lift, and test velocity.',
      'Present findings concisely to non-technical stakeholders.',
    ],
    videoSource: {
      title: 'Create a KPI Dashboard In Looker Studio From A Google Sheet In Less Than 20 Minutes',
      embedUrl: 'https://www.youtube-nocookie.com/embed/2CFCzs6GXZs',
      channel: 'Automate My Business',
      duration: '18:19',
      description: 'Curated technical CRO masterclass from Automate My Business covering real-world heuristics, implementation blueprints, and optimization frameworks.',
      topics: ['Create a KPI Dashboard In Looker Studio From A Google Sheet In Less Than 20 Minutes'],
    },
    sections: [
      {
        heading: 'Translating Statistical Outcomes into Bottom-Line Executive Metrics',
        body: `Founders, CEOs, and VP-level stakeholders do not care about p-values, z-scores, or Chi-square statistics. Presenting an executive with a 20-slide deck on confidence intervals will cause their eyes to glaze over.
The Executive Translation Layer:
• Instead of: "Variant B reached p=0.032 with an 8.4% relative lift on mobile ATC."
• Present: "The mobile sticky cart optimization generated an incremental +$14,200 in net revenue this month, on pace to add +$170,000 in annualized gross margin."
Connect every technical win directly to Enterprise Value, Customer Acquisition Cost (CAC) payback velocity, and Net Contribution Margin.`,
        callout: {
          type: 'tip',
          text: 'Frame conversion wins as customer acquisition efficiency: "This +10% lift allows marketing to scale ad spend by $25k/month while maintaining our target 3.0x ROAS."',
        },
      },
      {
        heading: 'Designing an Executive CRO Dashboard: Velocity, Win Rate, and Annualized Lift',
        body: `The ideal founder-level CRO dashboard fits onto a single screen and answers 4 vital business questions:
1. Program Velocity: How many experiments ran this month vs planned target?
2. Historical Win Rate: What percentage of launched experiments achieved validated statistical significance? (Healthy benchmark: 30% - 40%).
3. Cumulative Annualized Revenue Gain: The running cumulative dollar contribution of all shipped winners.
4. Active Pipeline Status: What tests are currently running in production, and what is launching next sprint?`,
        callout: {
          type: 'note',
          text: 'Include an "Institutional Learnings" card on the dashboard. Proving that an inconclusive test prevented the brand from wasting $50k on a flawed redesign demonstrates massive strategic value.',
        },
      },
      {
        heading: 'Presenting Findings to Non-Technical Stakeholders Concisely',
        body: `The 3-Minute Executive Debrief Template:
1. The Problem: "We observed that 58% of mobile shoppers abandoned PDPs before seeing the color options."
2. The Intervention: "We deployed a sticky bottom sheet with one-tap variant swatches."
3. The Outcome: "+9.2% mobile conversion lift, with zero degradation in AOV or returns."
4. The Financial Impact: "+$18,400 monthly incremental profit."
5. Next Action: "Code is hardcoded into theme.liquid today; next test evaluates cart drawer cross-sells launching Tuesday." `,
        code: `// Executive CRO KPI Summary Generator
interface CompletedExperiment {
  id: string;
  name: string;
  outcome: 'WIN' | 'LOSS' | 'INCONCLUSIVE';
  monthlyIncrementalRevenue: number;
}

function generateFounderExecutiveSummary(tests: CompletedExperiment[]) {
  const totalTests = tests.length;
  const winners = tests.filter(t => t.outcome === 'WIN');
  const winRate = ((winners.length / totalTests) * 100).toFixed(1) + '%';
  const monthlyRunRateAddition = winners.reduce((sum, w) => sum + w.monthlyIncrementalRevenue, 0);
  const annualizedGrossGain = monthlyRunRateAddition * 12;

  return {
    experimentsConcluded: totalTests,
    successfulWins: winners.length,
    programWinRate: winRate,
    netMonthlyRevenueLift: '$' + monthlyRunRateAddition.toLocaleString(),
    annualizedEnterpriseValueAdded: '$' + annualizedGrossGain.toLocaleString()
  };
}

console.log(generateFounderExecutiveSummary([
  { id: 'T1', name: 'Sticky Mobile ATC', outcome: 'WIN', monthlyIncrementalRevenue: 12500 },
  { id: 'T2', name: 'Trust Badge Placement', outcome: 'LOSS', monthlyIncrementalRevenue: 0 },
  { id: 'T3', name: 'Free Shipping Progress Bar', outcome: 'WIN', monthlyIncrementalRevenue: 16800 },
  { id: 'T4', name: 'Countdown Urgency Timer', outcome: 'INCONCLUSIVE', monthlyIncrementalRevenue: 0 }
]));`,
        language: 'javascript',
      }
    ],
    mistakes: [
      'Presenting raw statistical jargon to executive stakeholders without translating to dollar impact.',
      'Hiding neutral or losing tests instead of highlighting the money saved by not implementing bad ideas permanently.',
    ],
    checklist: [
      'I can calculate annualized revenue impact from test results.',
      'I build executive-ready summary slides focusing on business outcomes.',
    ],
    furtherReading: [
      { title: 'McKinsey: The Business Value of Design & Experimentation', url: 'https://www.mckinsey.com' },
    ],
  },
  {
    id: 'm13-l4',
    moduleId: 'module-13',
    slug: 'documenting-tests-so-learnings-compound',
    title: 'Documenting Tests So Learnings Compound',
    estimatedMinutes: 20,
    objectives: [
      'Create an institutional knowledge repository in Notion, Linear, or GitHub.',
      'Tag tests by page surface, customer psychology, and device.',
      'Prevent duplicate testing of previously failed hypotheses.',
    ],
    videoSource: {
      title: 'How to Document Your A/B Tests?',
      embedUrl: 'https://www.youtube-nocookie.com/embed/_r-NEn1j8Mk',
      channel: 'invesp',
      duration: '4:53',
      description: 'Curated technical CRO masterclass from invesp covering real-world heuristics, implementation blueprints, and optimization frameworks.',
      topics: ['How to Document Your A/B Tests?'],
    },
    sections: [
      {
        heading: 'Creating an Institutional Knowledge Repository in Linear or Notion',
        body: `The ultimate asset produced by an experimentation program is not just the code — it is the compounding repository of customer behavioral intelligence.
Without an organized archive, agencies and internal teams suffer from "organizational amnesia." Two years later, a new marketer will propose the exact same countdown timer that failed in 2024.
Database Schema Requirements:
• Test Identifier (EXP-001) & Surface Tag (PDP, Collection, Header, Cart).
• Behavioral Hypothesis & Mechanism of Change.
• Desktop & Mobile Screenshots of Control vs Variant.
• Full Statistical Summary (Sample sizes, p-values, confidence intervals, AOV impact).
• Post-Mortem Key Learning: A one-paragraph takeaway explaining WHY customers responded the way they did.`,
        callout: {
          type: 'tip',
          text: 'A searchable experiment database in Notion or Linear turns past failures into instant onboarding assets for every new developer and designer.',
        },
      },
      {
        heading: 'Tagging Experiments by Surface, Psychology, and Audience',
        body: `To extract strategic patterns across hundreds of tests, tag each experiment with three distinct taxonomy dimensions:
1. Funnel Surface: Homepage, Collection, PDP, Cart Drawer, Checkout, Post-Purchase.
2. Psychological Lever: Social Proof, Friction Reduction, Cognitive Ease, Reciprocity, Scarcity, Value Clarity.
3. Visitor Segment: First-time mobile visitors, high-intent desktop search, returning loyalty buyers.
Pattern Auditing:
By auditing tags annually, you can uncover powerful insights such as: "Tests leveraging 'Friction Reduction' on Mobile PDP have an 80% win rate, while tests leveraging 'Scarcity' have an 8% win rate." `,
        callout: {
          type: 'note',
          text: 'Focus future sprint investments on the specific psychological levers that historically generate your store’s highest win rates.',
        },
      },
      {
        heading: 'Preventing Duplicate Testing of Previously Failed Hypotheses',
        body: `Establish a mandatory pre-sprint protocol:
Before any new experiment proposal is approved for design and development, the lead engineer searches the archive for related keywords (e.g. "countdown timer", "sticky bar", "size guide").
If a similar test ran within the past 18 months, the new proposal must prove that either:
• The mechanism of change is fundamentally different, or
• A new customer cohort / traffic acquisition mix has altered the underlying baseline behavior.`,
        code: `// Notion / Linear Experiment Archive Search & Query Utility
interface ArchivedExperimentRecord {
  id: string;
  name: string;
  surface: 'PDP' | 'CART' | 'COLLECTION' | 'CHECKOUT';
  psychologicalLever: 'FRICTION_REDUCTION' | 'SOCIAL_PROOF' | 'SCARCITY' | 'VALUE_CLARITY';
  outcome: 'WIN' | 'LOSS' | 'INCONCLUSIVE';
  keyLearning: string;
}

const companyExperimentArchive: ArchivedExperimentRecord[] = [
  { id: 'EXP-012', name: 'Flashing Stock Urgency Badges', surface: 'PDP', psychologicalLever: 'SCARCITY', outcome: 'LOSS', keyLearning: 'Created artificial panic and heightened return rates.' },
  { id: 'EXP-024', name: 'One-Tap Sizing Drawer with Height Selector', surface: 'PDP', psychologicalLever: 'FRICTION_REDUCTION', outcome: 'WIN', keyLearning: 'Reduced sizing uncertainty on mobile significantly.' }
];

function checkBacklogDuplicate(proposedKeyword: string, surface: string) {
  const matches = companyExperimentArchive.filter(exp => 
    exp.surface === surface && exp.name.toLowerCase().includes(proposedKeyword.toLowerCase())
  );

  return {
    hasPriorHistory: matches.length > 0,
    historicalRecords: matches
  };
}

console.log(checkBacklogDuplicate('Urgency', 'PDP'));`,
        language: 'javascript',
      }
    ],
    mistakes: [
      'Filing test results in ephemeral Slack messages that disappear in 90 days.',
      'Recording only whether a test won or lost without documenting the customer behavioral insight.',
    ],
    checklist: [
      'I maintain a searchable archive of all past tests.',
      'I categorize findings by psychological principle (Trust, Urgency, Clarity, Friction).',
    ],
    furtherReading: [
      { title: 'Notion for High Velocity Growth Teams', url: 'https://www.notion.so' },
    ],
  },
  {
    id: 'm13-l5',
    moduleId: 'module-13',
    slug: 'working-with-merch-marketing-and-dev-teams',
    title: 'Working With Merch, Marketing, and Dev Teams',
    estimatedMinutes: 20,
    objectives: [
      'Bridge the gap between design aesthetic, engineering rigor, and marketing conversion goals.',
      'Establish painless code deployment and rollback procedures.',
      'Handle conflicting stakeholder opinions using empirical test data.',
    ],
    videoSource: {
      title: 'CRO Masterclass for Activewear Brands on Shopify presented by Shoplift, Anatta, and Videowise',
      embedUrl: 'https://www.youtube-nocookie.com/embed/zF8_WFwSu5M',
      channel: 'Shoplift',
      duration: '47:39',
      description: 'Curated technical CRO masterclass from Shoplift covering real-world heuristics, implementation blueprints, and optimization frameworks.',
      topics: ['CRO Masterclass for Activewear Brands on Shopify presented by Shoplift', 'Anatta', 'and Videowise'],
    },
    sections: [
      {
        heading: 'Bridging the Gap: Design Aesthetics, Engineering, and Conversion Goals',
        body: `The biggest source of organizational tension in ecommerce is the clash of disciplines:
• Brand Designers prioritize minimalist aesthetics, subtle typography, and artistic whitespace.
• CRO Strategists prioritize scannability, clear visual hierarchy, prominent contrast, and aggressive buying cues.
• Shopify Engineers prioritize clean code, bundle weight, Core Web Vitals, and maintainable architecture.

How to Build Cross-Functional Harmony:
1. Objective Standards: Replace subjective opinions ("I don't like how bold that button looks") with data-backed benchmarks.
2. Compromise Through Testing: Let brand designers create their ideal aesthetic variant while the CRO team tests an optimized high-contrast challenger. The data settles the debate objectively.
3. Design Systems: Integrate CRO patterns (high-contrast focus states, thumb-zone tap targets) directly into the brand’s Figma design tokens.`,
        callout: {
          type: 'tip',
          text: 'Never position CRO as "uglifying the website." High-converting design is clean, intuitive, and respects the brand identity while eliminating cognitive friction.',
        },
      },
      {
        heading: 'Painless Code Deployment and Fast Rollback Procedures',
        body: `CRO developers must maintain a clean Git workflow to prevent experimental code from corrupting the core Shopify theme:
• Feature Flags: Wrap experimental blocks in Liquid schema settings or theme customizer toggles (\`settings.enable_pdp_sticky_bar\`).
• Non-Destructive Modifiers: Use CSS modifiers (e.g. \`.product-buy-box--variant-b\`) rather than destroying core theme HTML.
• 1-Click Rollback: If a live experiment causes unexpected behavior in production, the lead developer can disable the feature flag in Shopify Theme Editor within 30 seconds without triggering a code deployment.`,
        callout: {
          type: 'shopify',
          text: 'Always test new theme code on an unpublished development theme using the Shopify CLI (`shopify theme dev`) before pushing to live traffic.',
        },
      },
      {
        heading: 'Handling Stakeholder Disagreements with Empirical Data',
        body: `When marketing and merchandising executives disagree on which promotion or layout to launch:
The Solution: "Let's run a 14-day 50/50 split test."
Testing de-personalizes commercial decisions. It eliminates political battles between departments and transforms the organization into an agile, data-driven meritocracy where the customer’s wallet decides the winning strategy.`,
        code: `<!-- Defensive Liquid Feature Flag Pattern for Instant Rollback -->
{% if settings.exp_sticky_atc_enabled %}
  <div id="cro-sticky-atc-mount" class="cro-sticky-bar" data-test-id="EXP-M13-STICKY">
    {% render 'pdp-sticky-bar-content', product: product %}
  </div>
  <script src="{{ 'exp-sticky-atc.js' | asset_url }}" defer></script>
{% endif %}

<!--
If any production anomaly occurs, the store manager simply toggles 
'exp_sticky_atc_enabled' to false in the Theme Editor, removing the 
entire feature instantaneously without touching Git.
-->`,
        language: 'html',
      }
    ],
    mistakes: [
      'Antagonizing brand designers by launching ugly variations without consulting them.',
      'Allowing marketing to push un-QAed third-party app scripts directly to live production.',
    ],
    checklist: [
      'I establish clear collaboration SLAs with design and marketing.',
      'I use test data to settle subjective design disputes objectively.',
    ],
    furtherReading: [
      { title: 'Basecamp: Shape Up Methodology', url: 'https://basecamp.com/shapeup' },
    ],
  },

  // MODULE 14: Advanced Shopify Dev CRO
  {
    id: 'm14-l1',
    moduleId: 'module-14',
    slug: 'shopify-functions-for-cro-discounts-shipping-payment-delivery',
    title: 'Shopify Functions for CRO: Discounts, Shipping, Payment',
    estimatedMinutes: 30,
    objectives: [
      'Understand Shopify Functions architecture compiled to WebAssembly (Wasm).',
      'Build dynamic volume and tiered discount logic (e.g. Buy 2 save 10%, Buy 3 save 20%).',
      'Optimize delivery and payment options dynamically at checkout.',
    ],
    videoSource: {
      title: 'Build Advanced Shopify Discounts with Shopify Functions',
      embedUrl: 'https://www.youtube-nocookie.com/embed/aRu3uVfAzSA',
      channel: 'Fayyaz Ahmed | Shopify Developer',
      duration: '13:22',
      description: 'Curated technical CRO masterclass from Fayyaz Ahmed | Shopify Developer covering real-world heuristics, implementation blueprints, and optimization frameworks.',
      topics: ['Build Advanced Shopify Discounts with Shopify Functions'],
    },
    sections: [
      {
        heading: 'Understanding Shopify Functions Compiled to WebAssembly (Wasm)',
        body: `Shopify Functions represent the modern backend compute layer of the Shopify platform.
How They Work:
• Written in Rust or TypeScript and compiled down into lightweight WebAssembly (Wasm) binaries.
• Executed directly on Shopify’s global server infrastructure within the checkout pipeline.
• Ultra-Fast Execution: Runs in under 5 milliseconds with a hard execution limit of 11ms, ensuring checkout velocity is never compromised.
• Replaces Legacy Ruby Scripts: Unlike Shopify Scripts (which only worked on \`checkout.liquid\`), Functions work across all modern checkout interfaces and Shop Pay.`,
        callout: {
          type: 'shopify',
          text: 'Shopify Functions are available to all Shopify Plus stores and support Discount, Delivery, and Payment Customization APIs.',
        },
      },
      {
        heading: 'Building Dynamic Volume and Tiered Discount Logic',
        body: `Volume discounting (e.g., Buy 2 get 10% off, Buy 3 get 20% off) is the most reliable mechanism for lifting Average Order Value.
Building via Shopify Functions:
• The Function queries the incoming cart lines.
• Evaluates quantity thresholds across eligible product collections.
• Returns an automated discount instruction applied directly to the line items.
• Zero Coupon Codes Required: The discount applies automatically, eliminating checkout friction and preventing coupon leakages.`,
        callout: {
          type: 'tip',
          text: 'Pairing a volume discount Function with a visual tier selector pill on the PDP lifts multi-item basket additions by up to 24%.',
        },
      },
      {
        heading: 'Optimizing Delivery and Payment Options Dynamically at Checkout',
        body: `Customize the checkout experience based on customer and cart characteristics:
1. Delivery Customization API:
   - Re-order shipping methods so the most popular option (e.g. "Free 2-Day Shipping") is selected by default.
   - Rename shipping methods dynamically based on destination (e.g., "Chicago Local Courier").
2. Payment Customization API:
   - Hide Cash on Delivery (COD) for orders over $200 or addresses with high fraud risk scores.
   - Hide Buy Now Pay Later (Klarna/Afterpay) for gift card purchases.`,
        code: `// Production Shopify Function for Automated Tiered Volume Discounts (TypeScript/Wasm target)
interface CartLine {
  id: string;
  quantity: number;
}

export function run(input: { cart: { lines: CartLine[] } }) {
  const totalEligibleQuantity = input.cart.lines.reduce((sum, line) => sum + line.quantity, 0);

  let discountPercentage = 0;
  if (totalEligibleQuantity >= 3) {
    discountPercentage = 20.0; // 20% off for 3+ items
  } else if (totalEligibleQuantity >= 2) {
    discountPercentage = 10.0; // 10% off for 2 items
  }

  if (discountPercentage === 0) {
    return { discountApplicationStrategy: 'FIRST', discounts: [] };
  }

  return {
    discountApplicationStrategy: 'FIRST',
    discounts: [
      {
        targets: input.cart.lines.map(line => ({ cartLine: { id: line.id } })),
        value: { percentage: { value: discountPercentage } },
        message: \`Volume Savings: \${discountPercentage}% Off (\${totalEligibleQuantity} Items)\`
      }
    ]
  };
}`,
        language: 'javascript',
      }
    ],
    mistakes: [
      'Relying on deprecated checkout.liquid scripts for new store builds.',
      'Exceeding the 5ms Shopify Function execution budget by performing complex recursive calculations.',
    ],
    checklist: [
      'I can compile and deploy a basic Shopify Function using Shopify CLI.',
      'I know how to target Cart Line Discounts and Delivery Customization APIs.',
    ],
    furtherReading: [
      { title: 'Shopify Functions Developer Reference', url: 'https://shopify.dev/docs/api/functions' },
    ],
  },
  {
    id: 'm14-l2',
    moduleId: 'module-14',
    slug: 'checkout-ui-extensions-trust-delivery-upsell',
    title: 'Checkout UI Extensions: Trust, Delivery, and Upsell',
    estimatedMinutes: 30,
    objectives: [
      'Build interactive Checkout UI Extensions using React-like primitives.',
      'Inject high-converting order summary upsells into the checkout sidebar.',
      'Add delivery instructions and custom gift messaging.',
    ],
    videoSource: {
      title: 'Shopify Development Deep Dive, Part 12: Checkout UI Extensions Explained',
      embedUrl: 'https://www.youtube-nocookie.com/embed/74d_c8dKqeg',
      channel: 'AI Tutorials Pack',
      duration: '8:24',
      description: 'Curated technical CRO masterclass from AI Tutorials Pack covering real-world heuristics, implementation blueprints, and optimization frameworks.',
      topics: ['Shopify Development Deep Dive', 'Part 12: Checkout UI Extensions Explained'],
    },
    sections: [
      {
        heading: 'Building Checkout UI Extensions with Preact-Like Primitives',
        body: `Checkout UI Extensions allow Shopify Plus developers to build native, secure interface components directly within the checkout flow.
Architectural Principles:
• Preact Sandbox: Extensions run in an isolated Web Worker; they cannot access the global \`window\` or \`document\` objects directly.
• Native Shopify UI Components: You compose your interface using Shopify’s accessible UI components: \`Banner\`, \`BlockStack\`, \`InlineLayout\`, \`Checkbox\`, \`Button\`.
• Seamless Styling: Components automatically inherit the merchant’s typography and color settings defined in the Checkout Branding API.`,
        callout: {
          type: 'shopify',
          text: 'Checkout UI Extensions are 100% compliant with Apple Pay and Shop Pay accelerated checkouts.',
        },
      },
      {
        heading: 'Injecting High-Converting Order Summary Upsells',
        body: `The Order Summary sidebar in checkout is prime commercial real estate for low-cost, high-value add-ons.
Winning Checkout Upsells:
• Shipping Protection / Package Insurance ($2.95): Protects against transit theft or damage; 22% average attachment rate.
• Priority Fulfillment / Rush Processing ($4.99): Puts the order at the front of the fulfillment queue.
• Mystery Accessory Sample ($5.00): High curiosity item that adds incremental gross profit.`,
        callout: {
          type: 'tip',
          text: 'A $2.95 package protection extension converts at 20%+ attachment, contributing pure high-margin profit to every transaction.',
        },
      },
      {
        heading: 'Adding Delivery Instructions and Custom Gift Messaging',
        body: `Allowing customers to specify apartment gate codes, delivery notes, or gift card greetings directly inside checkout removes last-mile delivery anxiety:
• The extension provides a clean text field.
• Writes the input into the checkout's \`customAttributes\`.
• The delivery note is stored directly on the Shopify Order object in the Admin, streaming seamlessly into shipping labels (ShipStation/Shippo).`,
        code: `// Production Checkout UI Extension: 1-Click Shipping Protection Upsell
import {
  reactExtension,
  Banner,
  BlockStack,
  Checkbox,
  useApplyCartLinesChange,
  useCartLines,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension('purchase.checkout.block.render', () => <ShippingProtectionApp />);

function ShippingProtectionApp() {
  const applyCartLinesChange = useApplyCartLinesChange();
  const cartLines = useCartLines();
  const PROTECTION_VARIANT_ID = 'gid://shopify/ProductVariant/4491029182910';

  const isProtected = cartLines.some(line => line.merchandise.id === PROTECTION_VARIANT_ID);

  async function handleToggle(checked: boolean) {
    if (checked) {
      await applyCartLinesChange({
        type: 'addCartLine',
        merchandiseId: PROTECTION_VARIANT_ID,
        quantity: 1
      });
    } else {
      const line = cartLines.find(l => l.merchandise.id === PROTECTION_VARIANT_ID);
      if (line) {
        await applyCartLinesChange({ type: 'removeCartLine', id: line.id, quantity: 1 });
      }
    }
  }

  return (
    <BlockStack spacing="tight">
      <Checkbox checked={isProtected} onChange={handleToggle}>
        Add Package Protection & Carbon Neutral Delivery ($2.49)
      </Checkbox>
    </BlockStack>
  );
}`,
        language: 'javascript',
      }
    ],
    mistakes: [
      'Attempting to use raw HTML elements like \`<div>\` or \`<span>\` (Extensions only accept Shopify UI components).',
      'Creating heavy network calls inside checkout extensions that slow down payment completion.',
    ],
    checklist: [
      'I can build a 1-click product add extension inside Shopify Checkout.',
      'I know how to use standard extension hooks (useCartLines, useApplyCartLinesChange).',
    ],
    furtherReading: [
      { title: 'Shopify Checkout UI Components Directory', url: 'https://shopify.dev/docs/api/checkout-ui-extensions/components' },
    ],
  },
  {
    id: 'm14-l3',
    moduleId: 'module-14',
    slug: 'edge-ab-testing-cloudflare-workers-vercel-edge',
    title: 'Edge A/B Testing with Cloudflare Workers or Vercel Edge',
    estimatedMinutes: 30,
    objectives: [
      'Deploy an edge A/B split worker in production.',
      'Handle cookie persistence and sub-second HTML stream transformations.',
      'Eliminate the 200–500ms client-side test flicker entirely.',
    ],
    videoSource: {
      title: 'Cloudflare Workers Explained: Edge Computing Architecture',
      embedUrl: 'https://www.youtube-nocookie.com/embed/8x02ryNKs7w',
      channel: 'Fireship',
      duration: '6:15',
      description: 'Deep dive into Cloudflare Workers, edge streaming, HTMLRewriter, and sub-millisecond edge routing without server latency.',
      topics: ['Cloudflare Workers', 'Edge Computing', 'HTMLRewriter', 'Zero-Latency Routing'],
    },
    sections: [
      {
        heading: 'Deploying Production Edge A/B Split Workers (Cloudflare / Vercel)',
        body: `Edge experimentation runs on globally distributed serverless nodes milliseconds away from the user, fundamentally eliminating the performance penalties of client-side scripts.
How the Edge Split Operates:
1. HTTP Request Interception: The Edge Worker intercepts the incoming GET request for a PDP or collection page.
2. Visitor Assignment: The worker checks the \`Cookie\` header. If absent, it assigns the visitor to Control or Variant via deterministic hashing.
3. Stream Modification or Origin Rewrite: The worker rewrites the incoming request to fetch the appropriate Shopify alternate template (\`?view=experiment-v2\`) and sets the tracking cookie on the response.`,
        callout: {
          type: 'tip',
          text: 'Edge Workers introduce less than 4ms of processing latency, completely invisible to human perception.',
        },
      },
      {
        heading: 'Handling Cookie Persistence and Sub-Second Stream Transformations',
        body: `To prevent layout flicker, the Edge Worker must ensure atomic state consistency:
• HttpOnly & SameSite Headers: Sets cookies with \`SameSite=Lax; Secure; Max-Age=2592000\` (30-day persistence).
• HTMLRewriter API: Cloudflare Workers feature a native C++ streaming parser (\`HTMLRewriter\`) that can inject, modify, or delete HTML elements on the fly as the response streams from Shopify to the browser, with ZERO buffering overhead!`,
        callout: {
          type: 'warning',
          text: 'Never buffer the full HTML response in edge worker memory. Always use streaming transformations (HTMLRewriter) to maintain instant Time to First Byte (TTFB).',
        },
      },
      {
        heading: 'Eliminating the 200–500ms Client-Side Test Flicker Entirely',
        body: `The Flash of Unstyled Content (FOUC) in legacy client-side testing tools is an existential threat to CRO:
When a customer sees the original button for 300ms before it suddenly shifts into an orange bar, cognitive skepticism spikes and users lose trust.
Edge testing guarantees ZERO flicker:
When the HTML arrives in the user's browser, the variant markup is ALREADY fully rendered in the DOM. The browser's native parser renders the variant immediately during the initial layout pass.`,
        code: `// Production Cloudflare Worker HTMLRewriter for Zero-Flicker Edge Testing
export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    // Only split test on product detail pages
    if (!url.pathname.startsWith('/products/')) {
      return fetch(request);
    }

    const cookieHeader = request.headers.get('Cookie') || '';
    let variant = 'control';
    let isNewVisitor = false;

    if (cookieHeader.includes('cro_hero_exp=variant_b')) {
      variant = 'variant_b';
    } else if (!cookieHeader.includes('cro_hero_exp=')) {
      variant = Math.random() < 0.5 ? 'control' : 'variant_b';
      isNewVisitor = true;
    }

    const response = await fetch(request);

    // If variant B, use native streaming HTMLRewriter to mutate hero headline
    let transformedResponse = response;
    if (variant === 'variant_b') {
      transformedResponse = new HTMLRewriter()
        .on('.product__title', {
          element(el) {
            el.setAttribute('data-cro-variant', 'b');
          }
        })
        .transform(response);
    }

    const finalResponse = new Response(transformedResponse.body, transformedResponse);
    if (isNewVisitor) {
      finalResponse.headers.append('Set-Cookie', \`cro_hero_exp=\${variant}; Path=/; Max-Age=2592000; SameSite=Lax; Secure\`);
    }

    return finalResponse;
  }
};`,
        language: 'javascript',
      }
    ],
    mistakes: [
      'Failing to handle caching headers properly at the edge, causing variant assignments to leak across users.',
      'Forgetting to pass Shopify checkout cookies and sessions transparently.',
    ],
    checklist: [
      'I can write and deploy a Cloudflare Worker for edge A/B testing.',
      'I verify 0ms flicker on mobile devices via edge routing.',
    ],
    furtherReading: [
      { title: 'Vercel Edge Middleware A/B Testing Guide', url: 'https://vercel.com/docs/concepts/functions/edge-middleware' },
    ],
  },
  {
    id: 'm14-l4',
    moduleId: 'module-14',
    slug: 'server-side-event-tracking',
    title: 'Server-Side Event Tracking (Meta CAPI & GA4 Measurement Protocol)',
    estimatedMinutes: 25,
    objectives: [
      'Bypass browser ad blockers and iOS Safari ITP cookie death.',
      'Implement Meta Conversions API (CAPI) and GA4 Measurement Protocol.',
      'Deduplicate client and server events using unique event_id tokens.',
    ],
    videoSource: {
      title: 'How to Setup Facebook Pixel Conversion API for Shopify Via GTM | Server-Side Tracking | CAPI',
      embedUrl: 'https://www.youtube-nocookie.com/embed/jS_6Ve5-BOc',
      channel: 'MIJAN - Web Analyst GTM & GA4',
      duration: '31:57',
      description: 'Curated technical CRO masterclass from MIJAN - Web Analyst GTM & GA4 covering real-world heuristics, implementation blueprints, and optimization frameworks.',
      topics: ['How to Setup Facebook Pixel Conversion API for Shopify Via GTM', 'Server', 'Side Tracking', 'CAPI'],
    },
    sections: [
      {
        heading: 'Bypassing Ad Blockers and Safari ITP Cookie Restrictions',
        body: `Browser privacy defenses (Safari Intelligent Tracking Prevention, Firefox Enhanced Tracking, Brave, and uBlock Origin ad blockers) block up to 30% of client-side analytics pixels.
The Consequences for CRO:
• Under-Reported Conversions: Ad platforms (Meta, Google) fail to attribute sales, making ad spend appear inefficient.
• Truncated Cookies: Safari truncates client-side JavaScript cookies to 7 days (or 24 hours if arriving via a tracking click-ID), breaking attribution for shoppers who take 8 days to buy.
• The Solution: Server-side event tracking, where events stream directly from Shopify's backend servers to ad APIs.`,
        callout: {
          type: 'tip',
          text: 'Server-to-server tracking operates behind the scenes, completely immune to browser-level ad blockers and browser cookie truncation.',
        },
      },
      {
        heading: 'Implementing Meta Conversions API (CAPI) & GA4 Measurement Protocol',
        body: `Dual-Tracking Architecture:
• Client-Side: Dispatches browser events for immediate user experience telemetry.
• Server-Side: When a webhook fires (e.g. \`orders/create\`), Shopify's backend server sends an authenticated HTTP POST payload directly to Meta Graph API (CAPI) and Google Analytics Measurement Protocol.
• Event Payload: Contains hashed customer email (SHA-256), phone, order total, currency, and exact line-item SKUs.`,
        callout: {
          type: 'shopify',
          text: 'Shopify’s native Facebook & Instagram sales channel includes built-in Meta CAPI integration with server-side deduplication.',
        },
      },
      {
        heading: 'Deduplicating Client and Server Events via Unique event_id Tokens',
        body: `If both the browser pixel and the server-side API report the same purchase, ad platforms will double-count the revenue, inflating conversion numbers by 100%!
The Deduplication Protocol:
1. Generate a unique \`event_id\` token on the client (e.g., \`ORD_98214_TIMESTAMP\`).
2. Pass this exact token in the browser pixel event payload.
3. Pass the identical \`event_id\` in the server-side CAPI payload.
4. When Meta receives both events, its deduplication algorithm matches the tokens, merges the data, and records exactly ONE conversion with 100% data fidelity.`,
        code: `// Server-Side Event Deduplication Payload Dispatcher (GA4 & Meta CAPI)
interface ConversionEventPayload {
  eventId: string;
  orderNumber: string;
  totalRevenue: number;
  currency: string;
  customerEmailHash: string; // SHA-256
}

async function dispatchServerSideConversion(payload: ConversionEventPayload) {
  // 1. Dispatch to Meta Conversions API (CAPI)
  const metaResponse = await fetch('https://graph.facebook.com/v19.0/YOUR_PIXEL_ID/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data: [{
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        event_id: payload.eventId, // Critical: Deduplication key
        user_data: { em: [payload.customerEmailHash] },
        custom_data: { currency: payload.currency, value: payload.totalRevenue }
      }]
    })
  });

  console.log(\`[CAPI Server Sync] Event ID: \${payload.eventId} successfully transmitted.\`);
}`,
        language: 'javascript',
      }
    ],
    mistakes: [
      'Failing to pass matching \`event_id\` strings between browser and server, causing all orders to be counted twice in Meta Ads Manager.',
      'Sending unhashed customer email or phone numbers to Meta (must use SHA-256 hashing).',
    ],
    checklist: [
      'I understand event deduplication using event_id.',
      'I know how to configure Meta Conversions API in Shopify.',
    ],
    furtherReading: [
      { title: 'Meta Conversions API Developer Guide', url: 'https://developers.facebook.com/docs/marketing-api/conversions-api/' },
    ],
  },
  {
    id: 'm14-l5',
    moduleId: 'module-14',
    slug: 'hydrogen-and-oxygen-for-cro',
    title: 'Hydrogen and Oxygen for CRO: Headless Optimization',
    estimatedMinutes: 25,
    objectives: [
      'Understand how Shopify Hydrogen (Remix) enables sub-100ms page transitions.',
      'Implement optimistic cart updates in React.',
      'Avoid common headless CRO traps (broken tracking, missing native apps).',
    ],
    videoSource: {
      title: 'Shopify Hydrogen in 2026: Do You Actually Need a Headless Store?',
      embedUrl: 'https://www.youtube-nocookie.com/embed/Yy8WrqS4yJ4',
      channel: 'TheShopNinjas | Shopify Dev & Store Management',
      duration: '4:44',
      description: 'Curated technical CRO masterclass from TheShopNinjas | Shopify Dev & Store Management covering real-world heuristics, implementation blueprints, and optimization frameworks.',
      topics: ['Shopify Hydrogen in 2026: Do You Actually Need a Headless Store?'],
    },
    sections: [
      {
        heading: 'Sub-100ms Transitions with Shopify Hydrogen (Remix) & Oxygen',
        body: `Shopify Hydrogen is an opinionated headless React framework built on Remix, deployed to Shopify's global Oxygen edge hosting platform.
Why Headless Unlocks Extreme CRO Velocity:
• Instant Page Navigation: Remix pre-fetches next-page data as soon as the user hovers over a link. Clicking a collection item renders the PDP in under 80 milliseconds!
• Zero Full-Page Renders: Browsing feels like a high-performance native iOS mobile application.
• Complete Architectural Freedom: Full control over DOM structure, edge caching headers, and custom micro-interactions.`,
        callout: {
          type: 'shopify',
          text: 'Sub-100ms page transitions eliminate the typical 1.5s mobile wait time between PDP and Cart, lifting browsing depth by up to 35%.',
        },
      },
      {
        heading: 'Implementing Optimistic Cart Updates in React',
        body: `In standard themes, when a user clicks "Add to Cart", the button shows a loading spinner while the network request resolves (300-800ms).
Optimistic UI Architecture:
• The React state updates INSTANTLY upon the click event: the drawer slides open, the item count increments, and the progress bar updates immediately.
• The network mutation to the Storefront API executes in the background.
• If the network request fails (e.g. inventory sold out), the UI gracefully rolls back the state and displays an informative alert.
• The customer perceives the store as having zero latency.`,
        callout: {
          type: 'tip',
          text: 'Optimistic UI makes mobile interactions feel instantaneous, removing psychological friction during multi-item shopping.',
        },
      },
      {
        heading: 'Avoiding Headless CRO Traps: Missing Apps & Broken Analytics',
        body: `Going headless without careful planning can completely destroy store conversion:
Common Headless Disasters:
• Missing Shopify Apps: 90% of Shopify apps depend on Liquid theme injection. When you go headless, your review apps, subscription widgets, and wishlist tools cease to function unless rewritten via Storefront APIs.
• Broken Tracking: Third-party analytics pixels that rely on standard \`theme.liquid\` will not capture headless Single Page Application (SPA) route changes unless instrumented manually.
• Cost Overruns: Maintaining a headless codebase requires dedicated React engineering teams.`,
        code: `// Optimistic Cart Addition Pattern in Shopify Hydrogen (Remix)
import { useFetcher } from '@remix-run/react';

export function AddToCartButton({ variantId, children }: { variantId: string; children: React.ReactNode }) {
  const fetcher = useFetcher();

  // Optimistically determine if item is adding based on pending form submission
  const isOptimistic = fetcher.state !== 'idle';

  return (
    <fetcher.Form action="/cart" method="post">
      <input type="hidden" name="cartAction" value="ADD_TO_CART" />
      <input type="hidden" name="lines" value={JSON.stringify([{ merchandiseId: variantId, quantity: 1 }])} />
      
      <button 
        type="submit" 
        className={\`btn-atc \${isOptimistic ? 'btn-atc--optimistic-active' : ''}\`}
      >
        {isOptimistic ? 'Adding to bag...' : children}
      </button>
    </fetcher.Form>
  );
}`,
        language: 'javascript',
      }
    ],
    mistakes: [
      'Migrating to Hydrogen to fix poor conversion when the root cause was bad pricing and unclear value propositions.',
      'Forgetting to implement proper SEO meta tags and structured data on Remix routes.',
    ],
    checklist: [
      'I can evaluate whether Hydrogen makes economic sense for a brand.',
      'I know how to implement optimistic cart mutations in Remix.',
    ],
    furtherReading: [
      { title: 'Shopify Hydrogen Documentation', url: 'https://shopify.dev/docs/custom-storefronts/hydrogen' },
    ],
  },

  // MODULE 15: Capstone Theme Build
  {
    id: 'm15-l1',
    moduleId: 'module-15',
    slug: 'capstone-brief-and-acceptance-criteria',
    title: 'Capstone Brief and Acceptance Criteria',
    estimatedMinutes: 25,
    objectives: [
      'Review the full scope of the 10-deliverable CRO Lab Capstone Theme build.',
      'Understand the rigorous evaluation rubrics for each deliverable.',
      'Set up your development repository and staging store environment.',
    ],
    videoSource: {
      title: 'I Tore Down a $12M Shopify Brand — Found 4 Conversion Leaks',
      embedUrl: 'https://www.youtube-nocookie.com/embed/voYeFEtDnDE',
      channel: 'sam cro',
      duration: '15:30',
      description: 'Comprehensive live CRO audit and heuristic teardown of an underperforming Shopify store, walking through friction points across the homepage, collection, PDP, and checkout.',
      topics: ['Shopify CRO Audit', 'Conversion Leak Teardown', 'Heuristic Evaluation', 'Friction Point Prioritization'],
    },
    sections: [
      {
        heading: 'Reviewing the Full Scope of the 10-Deliverable Capstone Project',
        body: `The Capstone Project is your graduation portfolio: an enterprise-grade, end-to-end Shopify conversion optimization build demonstrating real-world technical mastery.
The 10 Deliverables Breakdown:
• Deliverable 1: Comprehensive CRO Audit & Heuristic Friction Ledger.
• Deliverable 2: Telemetry Implementation Architecture & Web Pixel Extension.
• Deliverable 3: Mobile-First High-Performance PDP Theme Section (Liquid + CSS).
• Deliverable 4: Zero-Flicker A/B Split Testing Harness (< 1KB).
• Deliverable 5: High-Converting Ajax Slide-Out Cart Drawer.
• Deliverable 6: Multi-Tier Free Shipping & Gamified AOV Progress Bar.
• Deliverable 7: Native Shopify Plus Checkout UI Extension.
• Deliverable 8: Core Web Vitals Optimization (Sub-2.5s LCP, zero CLS).
• Deliverable 9: 14-Day Live Experiment Execution & Statistical Evaluation Report.
• Deliverable 10: Executive Portfolio Case Study & Loom Video Teardown.`,
        callout: {
          type: 'tip',
          text: 'The Capstone is designed to prove to high-paying Shopify Plus merchants and top agencies that you can audit, architect, code, test, and analyze production stores.',
        },
      },
      {
        heading: 'Understanding Rigorous Evaluation Rubrics Across All Deliverables',
        body: `Your capstone deliverables are evaluated against production agency standards:
• Code Quality: Zero console errors, clean semantic HTML5, accessible ARIA labels, defensive error handling, and modular Liquid architecture.
• Performance: Passing mobile Core Web Vitals on real 4G throttled connections.
• Statistical Rigor: Correct sample size pre-calculations, two-tailed hypothesis testing, guardrail metric tracking, and SRM verification.
• Business Acumen: Translating technical implementations into tangible Revenue Per Session (RPS) gains.`,
        callout: {
          type: 'warning',
          text: 'Submissions that rely on third-party bloated app plugins instead of clean native Liquid and WebAssembly will not pass capstone evaluation.',
        },
      },
      {
        heading: 'Setting Up Your Development Repository & Staging Store',
        body: `Establish a professional development workflow:
1. Shopify Partner Account: Create a clean development store with dummy catalog data and realistic order histories.
2. Shopify CLI & GitHub Integration: Clone the base theme repo, link your Shopify Partner organization, and configure automated GitHub pull request workflows.
3. Chrome DevTools & GA4 DebugView: Configure your local browser testing environment for performance profiling and real-time event telemetry verification.`,
        code: `# Capstone Development Environment Setup Shell Script
# 1. Install or update Shopify CLI
npm install -g @shopify/cli@latest

# 2. Authenticate with your Shopify Partner Organization
shopify auth login

# 3. Pull development theme files
shopify theme pull --store your-cro-capstone-store.myshopify.com

# 4. Spin up local development server with hot-reload
shopify theme dev --store your-cro-capstone-store.myshopify.com

# Output confirms local proxy server listening at http://127.0.0.1:9292`,
        language: 'bash',
      }
    ],
    mistakes: [
      'Treating the capstone as a mock portfolio piece instead of shipping real production-grade code.',
      'Skipping the verification criteria checklist before submitting deliverables.',
    ],
    checklist: [
      'I have reviewed all 10 capstone deliverables and their acceptance criteria.',
      'I have a local Shopify CLI theme environment ready for development.',
    ],
    furtherReading: [
      { title: 'Shopify CLI for Themes', url: 'https://shopify.dev/docs/themes/tools/cli' },
    ],
  },
  {
    id: 'm15-l2',
    moduleId: 'module-15',
    slug: 'instrumenting-the-theme-web-pixels-ga4',
    title: 'Instrumenting the Theme (Web Pixels + GA4)',
    estimatedMinutes: 30,
    objectives: [
      'Deploy a unified tracking pixel extension subscribing to all 8 ecommerce events.',
      'Verify clean dataLayer payloads in Google Tag Manager / GA4 DebugView.',
      'Document the tracking architecture as Deliverables 1 & 2.',
    ],
    videoSource: {
      title: 'Shopify Ecommerce Conversion Tracking Setup: GA4, Google Ads, Pixel & CAPI',
      embedUrl: 'https://www.youtube-nocookie.com/embed/zKwMuHvp_4I',
      channel: 'Abdul Kayium | GA4, GTM | Server Side Tracking',
      duration: '8:12',
      description: 'Curated technical CRO masterclass from Abdul Kayium | GA4, GTM | Server Side Tracking covering real-world heuristics, implementation blueprints, and optimization frameworks.',
      topics: ['Shopify Ecommerce Conversion Tracking Setup: GA4', 'Google Ads', 'Pixel & CAPI'],
    },
    sections: [
      {
        heading: 'Deploying a Unified Web Pixel Extension Subscribing to 8 Events',
        body: `Deliverables 1 & 2 require a robust, standardized telemetry infrastructure using Shopify's modern Web Pixels API.
Why Web Pixels Beat Legacy Scripts:
• Sandboxed Execution: Pixels run in an isolated worker thread; a crash in an analytics script CANNOT crash the customer's checkout!
• 100% Funnel Coverage: Subscribes natively to all standard events across the entire storefront AND the locked checkout steps without requiring \`checkout.liquid\`.
• Standard 8 Events: \`page_viewed\`, \`product_viewed\`, \`collection_viewed\`, \`search_submitted\`, \`product_added_to_cart\`, \`cart_viewed\`, \`checkout_started\`, \`checkout_completed\`.`,
        callout: {
          type: 'shopify',
          text: 'Web Pixels are managed natively in Shopify Admin under Settings -> Customer Events and work across all Shopify subscription plans.',
        },
      },
      {
        heading: 'Verifying Clean dataLayer Payloads in GA4 DebugView',
        body: `Verification Protocol:
1. Install Google Analytics Debugger Chrome extension.
2. Navigate your staging store through the full 7-step ecommerce journey:
   - Homepage -> Search -> Collection -> PDP -> Variant Toggle -> Add to Cart -> Open Drawer -> Proceed to Checkout -> Place Test Order.
3. Open GA4 Admin -> DebugView.
4. Verify that each event fires in strict sequence with correct numeric values, currency codes, and SKU strings.`,
        callout: {
          type: 'tip',
          text: 'Confirm that the currency parameter is passed as an ISO 4217 code (e.g. "USD") and product price is a float (78.00), not a string ("$78.00").',
        },
      },
      {
        heading: 'Documenting the Tracking Architecture as Deliverables 1 & 2',
        body: `Assemble your documentation into a clean Markdown architecture specification:
• Event Taxonomy Ledger: A detailed table listing each event name, trigger mechanism, and parameter schema.
• Data Pipeline Diagram: Visual Mermaid flowchart illustrating how data flows from storefront DOM -> Web Pixel Worker -> Google Tag Manager -> GA4 & Meta CAPI.
• QA Sign-Off Matrix: Screenshots of validated payloads in browser DevTools and GA4 DebugView.`,
        code: `// Production Shopify Web Pixel Extension (customer-events.js)
import { register } from '@shopify/web-pixels-extension';

register(({ analytics, browser, init }) => {
  // Subscribe to product view event
  analytics.subscribe('product_viewed', (event) => {
    const product = event.data.productVariant;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'view_item',
      ecommerce: {
        currency: event.customData?.currency || 'USD',
        value: product?.price?.amount,
        items: [{
          item_id: product?.sku || product?.id,
          item_name: product?.title,
          price: product?.price?.amount
        }]
      }
    });
    console.log('[Web Pixel] view_item event dispatched cleanly.');
  });

  // Subscribe to add to cart event
  analytics.subscribe('product_added_to_cart', (event) => {
    const lineItem = event.data.cartLine?.merchandise;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'add_to_cart',
      ecommerce: {
        value: lineItem?.price?.amount,
        items: [{
          item_id: lineItem?.id,
          item_name: lineItem?.title,
          quantity: event.data.cartLine?.quantity
        }]
      }
    });
  });
});`,
        language: 'javascript',
      }
    ],
    mistakes: [
      'Missing currencyCode or numerical quantity properties in line items.',
      'Forgetting to document the test verification steps in the Capstone deliverable notes.',
    ],
    checklist: [
      'I have verified all 8 events in Google Tag Manager preview mode.',
      'I have completed Capstone Deliverables 1 & 2.',
    ],
    furtherReading: [
      { title: 'Google Tag Manager Preview & Debug Guide', url: 'https://support.google.com/tagmanager' },
    ],
  },
  {
    id: 'm15-l3',
    moduleId: 'module-15',
    slug: 'shipping-the-optimized-pdp-cart-checkout',
    title: 'Shipping the Optimized PDP, Cart, and Checkout Extensions',
    estimatedMinutes: 35,
    objectives: [
      'Build the mobile-first PDP featuring high-priority hero media, swatch pills, and sticky ATC.',
      'Implement the Ajax slide-out cart drawer with dynamic free shipping progress bar.',
      'Deploy the checkout delivery/trust UI extension (Deliverables 3, 5, 6, 7).',
    ],
    videoSource: {
      title: 'The Ultimate Shopify Checkout Optimization Guide (100% Free & Actionable)',
      embedUrl: 'https://www.youtube-nocookie.com/embed/3RS0wvRxVW8',
      channel: 'Samuel Larsen - eCommerce Optimization',
      duration: '22:29',
      description: 'Curated technical CRO masterclass from Samuel Larsen - eCommerce Optimization covering real-world heuristics, implementation blueprints, and optimization frameworks.',
      topics: ['The Ultimate Shopify Checkout Optimization Guide (100% Free & Actionable)'],
    },
    sections: [
      {
        heading: 'Shipping the Mobile-First PDP with Swatches and Sticky ATC',
        body: `Deliverables 3, 5, 6, and 7 represent the physical storefront conversion components:
1. High-Performance PDP Buy Box:
   - Responsive Liquid image tags utilizing \`image_url\` filter and \`fetchpriority="high"\`.
   - Accessible variant pill and color swatch selectors with instant price and gallery updates.
   - 44px minimum tap targets optimized for mobile thumb ergonomics.
2. Sticky Add-to-Cart Bar:
   - Driven by \`IntersectionObserver\` observing the primary CTA.
   - Completely invisible on initial load, sliding into the bottom thumb zone only upon scrolling past the main buy box.`,
        callout: {
          type: 'tip',
          text: 'Ensure your sticky ATC bar respects mobile safe-area insets (`padding-bottom: env(safe-area-inset-bottom)`) for modern iPhones.',
        },
      },
      {
        heading: 'Implementing the Ajax Slide-Out Cart Drawer & AOV Progress Bar',
        body: `The Cart Drawer (Deliverables 5 & 6) operates as the primary AOV expansion engine:
• Section Rendering API Integration: Instantaneous quantity adjustments without full-page reloads.
• Multi-Tier Free Shipping Progress Bar: Dynamic calculation showing real-time spend needed to unlock Free Shipping.
• 1-Click Complementary Upsells: Native accessory recommendations powered by the Shopify Recommendations API.
• Zero Layout Thrashing: Smooth 60fps hardware-accelerated CSS transforms (\`transform: translateX(0)\`).`,
        callout: {
          type: 'shopify',
          text: 'Style the cart drawer with a subtle backdrop filter (`backdrop-filter: blur(4px)`) to focus customer attention on checkout completion.',
        },
      },
      {
        heading: 'Deploying the Checkout Delivery & Trust UI Extension',
        body: `Deliverable 7 brings enterprise polish to the checkout step:
• Native Checkout UI Extension: Built using Shopify’s React extension primitives.
• Dynamic Order Protection Toggle: Injects a 1-click checkbox for transit protection directly into the payment or order summary block.
• Reassurance Trust Accordion: Displays clear contact information and return policy guarantees directly adjacent to the Pay Now button.`,
        code: `<!-- Production Deliverable 3 & 5 Architecture Verification Checklist -->
<div class="capstone-verification-container">
  <h3>Capstone Feature Integration Architecture</h3>
  <ul>
    <li>✓ PDP Hero: Aspect-ratio locked container (aspect-ratio: 1/1) - Zero CLS</li>
    <li>✓ Sticky ATC: IntersectionObserver trigger (<1KB vanilla JS)</li>
    <li>✓ Cart Drawer: Section Rendering API dynamic update</li>
    <li>✓ Shipping Bar: Multi-tier dynamic threshold with confetti celebration</li>
    <li>✓ Checkout Extension: React/Preact UI Extension with Shop Pay support</li>
  </ul>
</div>`,
        language: 'html',
      }
    ],
    mistakes: [
      'Letting sticky ATC bar cover native elements on small screens.',
      'Hardcoding shipping threshold values instead of using theme settings schema.',
    ],
    checklist: [
      'I have verified mobile responsiveness on physical mobile viewports.',
      'I have committed code for Deliverables 3, 5, 6, and 7.',
    ],
    furtherReading: [
      { title: 'Shopify Theme Store Requirements', url: 'https://shopify.dev/docs/themes/store/requirements' },
    ],
  },
  {
    id: 'm15-l4',
    moduleId: 'module-15',
    slug: 'running-one-real-ab-test-and-reporting-results',
    title: 'Running One Real A/B Test and Reporting Results',
    estimatedMinutes: 30,
    objectives: [
      'Deploy your A/B test framework (Deliverable 4).',
      'Execute a real 14-day live experiment (Deliverable 9).',
      'Compute statistical significance, p-value, and confidence interval.',
    ],
    videoSource: {
      title: 'How to A/B Test Your Shopify Store and Increase Revenue',
      embedUrl: 'https://www.youtube-nocookie.com/embed/Tfa60CO3Nng',
      channel: 'Rebuy Engine',
      duration: '5:37',
      description: 'Curated technical CRO masterclass from Rebuy Engine covering real-world heuristics, implementation blueprints, and optimization frameworks.',
      topics: ['How to A/B Test Your Shopify Store and Increase Revenue'],
    },
    sections: [
      {
        heading: 'Deploying Your Custom A/B Test Framework (Deliverable 4)',
        body: `Deliverable 4 requires deploying your custom, zero-dependency experimentation harness:
• Lightweight Footprint: Under 1KB of vanilla JavaScript placed high in \`theme.liquid\`.
• Instant Execution: Evaluates local bucket assignment before DOM rendering to guarantee zero visual flicker.
• Variant Class Flagging: Appends the experiment class to \`document.documentElement\`.
• Telemetry Integration: Dispatches custom \`experiment_impression\` events to the dataLayer with complete experiment and variant metadata.`,
        callout: {
          type: 'tip',
          text: 'Deliverable 4 proves that you can run rigorous experiments without paying $500/month for third-party client-side testing apps.',
        },
      },
      {
        heading: 'Executing a Live 14-Day Experiment (Deliverable 9)',
        body: `Deliverable 9 puts your code to the test under real traffic conditions:
• 14-Day Minimum Duration: Runs across 2 full weekly business cycles to account for day-of-week and payday fluctuations.
• Continuous QA Auditing: Check for JavaScript error exceptions, browser anomalies, and Sample Ratio Mismatch (SRM).
• Tracking Data: Maintain an active ledger of daily session counts, orders, gross revenue, and AOV across Control and Variant arms.`,
        callout: {
          type: 'warning',
          text: 'Do not peek and declare victory on Day 4! Let the experiment run its full pre-calculated course.',
        },
      },
      {
        heading: 'Computing Statistical Significance, P-Values, and Confidence Bounds',
        body: `Synthesize the experiment results using rigorous statistical calculations:
• Two-Sample Z-Test for Proportions: Calculate the standard error, z-score, and exact two-tailed p-value.
• 95% Confidence Intervals: Report the range of true expected lift (e.g., "+8.4% [±3.2%] relative lift").
• Guardrail Metric Verification: Confirm that AOV, return rates, and Core Web Vitals remained stable or improved.
• Commercial Recommendation: Clear executive decision to Deploy, Iterate, or Roll Back.`,
        code: `// Capstone Deliverable 9: Statistical Evaluation Calculator
function evaluateCapstoneExperiment(
  control: { sessions: number; orders: number; revenue: number },
  variant: { sessions: number; orders: number; revenue: number }
) {
  const p1 = control.orders / control.sessions;
  const p2 = variant.orders / variant.sessions;
  const pPool = (control.orders + variant.orders) / (control.sessions + variant.sessions);

  const se = Math.sqrt(pPool * (1 - pPool) * (1 / control.sessions + 1 / variant.sessions));
  const zScore = (p2 - p1) / se;
  
  // Approximate two-tailed p-value from z-score
  const isSignificant = Math.abs(zScore) >= 1.96; // 95% confidence
  const relativeLift = ((p2 - p1) / p1) * 100;

  const controlAov = control.revenue / control.orders;
  const variantAov = variant.revenue / variant.orders;
  const aovLift = ((variantAov - controlAov) / controlAov) * 100;

  return {
    controlCvr: (p1 * 100).toFixed(2) + '%',
    variantCvr: (p2 * 100).toFixed(2) + '%',
    relativeCvrLift: (relativeLift > 0 ? '+' : '') + relativeLift.toFixed(2) + '%',
    controlAov: '$' + controlAov.toFixed(2),
    variantAov: '$' + variantAov.toFixed(2),
    aovChange: (aovLift > 0 ? '+' : '') + aovLift.toFixed(2) + '%',
    zScore: zScore.toFixed(3),
    statisticallySignificant: isSignificant ? 'YES (p < 0.05)' : 'NO (Inconclusive)',
    commercialVerdict: isSignificant && aovLift >= -3 ? 'SHIP_TO_PRODUCTION' : 'ARCHIVE_OR_ITERATE'
  };
}

console.log(evaluateCapstoneExperiment(
  { sessions: 14200, orders: 340, revenue: 29240 },
  { sessions: 14150, orders: 402, revenue: 35376 }
));`,
        language: 'javascript',
      }
    ],
    mistakes: [
      'Declaring a winner before reaching predetermined sample size.',
      'Failing to record guardrail metric performance during the test window.',
    ],
    checklist: [
      'I have run a complete test with statistical significance calculation.',
      'I have documented test results in the Capstone Tracker.',
    ],
    furtherReading: [
      { title: 'CRO Lab Test Planner Tool', url: '/test-planner' },
    ],
  },

  // MODULE 16: Portfolio & Interview Prep
  {
    id: 'm16-l1',
    moduleId: 'module-16',
    slug: 'writing-a-case-study-that-gets-you-hired',
    title: 'Writing a Case Study That Gets You Hired',
    estimatedMinutes: 25,
    objectives: [
      'Synthesize your capstone deliverables into a compelling 6-part portfolio case study (Deliverable 10).',
      'Lead with business impact and revenue lift rather than raw CSS code.',
      'Demonstrate engineering craft and statistical maturity.',
    ],
    videoSource: {
      title: 'Conversion Rate Optimization Case Study: Full Ecommerce Teardown',
      embedUrl: 'https://www.youtube-nocookie.com/embed/ovZcmf2kRL0',
      channel: 'Samuel Larsen - eCommerce Optimization',
      duration: '14:22',
      description: 'Detailed walkthrough of an ecommerce CRO case study, demonstrating before/after hypotheses, test metrics, and revenue impact reporting.',
      topics: ['CRO Case Study', 'Portfolio Building', 'Heuristic Audits', 'Revenue Lift Presentation'],
    },
    sections: [
      {
        heading: 'Synthesizing Capstone Deliverables into a Compelling 6-Part Case Study',
        body: `The final capstone deliverable (Deliverable 10) is the portfolio asset that lands high-paying clients and senior engineering roles.
The 6-Part Agency Case Study Framework:
1. Executive Summary & Brand Context: Overview of the store and baseline performance bottlenecks.
2. The Heuristic Audit & Behavioral Evidence: Heatmaps, drop-off telemetry, and survey signals.
3. The 5-Part Test Hypothesis: Clear mechanism of change and guardrail metrics.
4. Technical Architecture & Code Highlights: Liquid snippets, Web Pixels, and Section Rendering API patterns.
5. Live Statistical Experiment Results: Control vs Variant conversion rates, p-values, and 95% confidence bounds.
6. Bottom-Line Financial Impact: Annualized gross revenue addition and customer acquisition payback.`,
        callout: {
          type: 'tip',
          text: 'A case study that leads with financial impact and clean engineering will outperform 50 generic portfolio websites that only show pretty pictures.',
        },
      },
      {
        heading: 'Leading with Business Impact & Revenue Over Raw CSS Code',
        body: `Hiring managers and founders do not hire developers to write code; they hire developers to generate revenue and eliminate technical risk.
The Narrative Shift:
• Junior Developer Pitch: "I wrote 400 lines of CSS and Liquid to build an animated sticky cart drawer."
• Senior CRO Developer Pitch: "I engineered a zero-flicker mobile sticky buy box and dynamic free shipping drawer that lifted mobile checkout progression by 11.2%, generating an annualized $142,000 in incremental revenue while improving mobile LCP by 400ms." `,
        callout: {
          type: 'note',
          text: 'Always quantify business value before explaining technical implementation details.',
        },
      },
      {
        heading: 'Demonstrating Engineering Craft and Statistical Maturity',
        body: `What separates elite CRO engineers from script-kiddies in a case study:
• Highlighting Performance Safeguards: Documenting how you achieved zero Cumulative Layout Shift (CLS) and sub-2.5s Largest Contentful Paint (LCP).
• Statistical Honesty: Openly reporting Sample Ratio Mismatch (SRM) checks and explaining why an inconclusive test prevented wasted brand investment.
• Clean Documentation: Professional GitHub repository with structured commit histories and thorough README files.`,
        code: `# Portfolio Case Study Summary Format (README.md)
## Experiment EXP-04: Mobile Sticky Buy Box & Cart Velocity
- **Brand**: Premium D2C Footwear
- **Traffic**: 120,000 Monthly Sessions (78% Mobile)
- **Primary Metric**: Mobile PDP Add-to-Cart Rate
- **Outcome**: +11.4% Relative Lift (p = 0.018 | 95% CI: [±4.1%])
- **Annualized Value Added**: +$168,000 Net Revenue

### Technical Architecture
- Zero-dependency client-side harness (< 1KB)
- Native IntersectionObserver triggering
- Aspect-ratio stabilized responsive media
- Full GA4 & Meta CAPI telemetry integration via Web Pixels`,
        language: 'markdown',
      }
    ],
    mistakes: [
      'Writing generic case studies that show only pretty screenshots without any metrics or hypothesis.',
      'Claiming unbelievable numbers (+400% lift) that immediately signal amateurism to experienced engineering leaders.',
    ],
    checklist: [
      'I have completed Deliverable 10 in the Portfolio Builder.',
      'I have exported my case study to Markdown and PDF.',
    ],
    furtherReading: [
      { title: 'CRO Lab Portfolio Builder', url: '/portfolio' },
    ],
  },
  {
    id: 'm16-l2',
    moduleId: 'module-16',
    slug: 'explaining-sample-size-and-statistics-in-interviews',
    title: 'Explaining Sample Size and Statistics in Interviews',
    estimatedMinutes: 25,
    objectives: [
      'Answer technical statistical questions with confidence during technical screens.',
      'Articulate the difference between Type I and Type II errors to non-technical interviewers.',
      'Explain how to handle low-traffic testing scenarios.',
    ],
    videoSource: {
      title: 'Sample Size Estimation in A/B Testing: Easy Explanation for Data Science Interviews',
      embedUrl: 'https://www.youtube-nocookie.com/embed/FKPec6RoJOg',
      channel: 'Emma Ding',
      duration: '7:38',
      description: 'Curated technical CRO masterclass from Emma Ding covering real-world heuristics, implementation blueprints, and optimization frameworks.',
      topics: ['Sample Size Estimation in A/B Testing: Easy Explanation for Data Science Interviews'],
    },
    sections: [
      {
        heading: 'Mastering Technical Statistics in Engineering Interviews',
        body: `During senior CRO and Shopify Plus engineering interviews, interviewers test your foundational understanding of experimentation statistics.
Core Questions to Master:
• "What is a p-value?"
  Answer: The probability of observing a difference at least as extreme as the one measured, assuming the null hypothesis is true. It is NOT the probability that the variant is better.
• "What is statistical power?"
  Answer: The probability that our experiment will correctly detect a true effect of a specific magnitude (1 - Beta). Industry standard is 80%.
• "Why can't you test at 80% confidence?"
  Answer: Because an 80% confidence level means a 20% Alpha false positive rate — 1 out of every 5 declared winners would be complete statistical noise.`,
        callout: {
          type: 'tip',
          text: 'Speak with precision. Knowing the mathematical definitions of Alpha, Beta, Power, and MDE commands immediate respect from senior technical interviewers.',
        },
      },
      {
        heading: 'Explaining Type I vs. Type II Errors to Non-Technical Interviewers',
        body: `Interviewers often ask: "How would you explain statistical risk to our non-technical CEO?"
Use the Classic Legal Analogy:
• Null Hypothesis: The defendant is innocent.
• Type I Error (False Positive / Alpha): Convicting an innocent person. In CRO: Declaring a test a winner and wasting engineering hours shipping a change that actually does nothing.
• Type II Error (False Negative / Beta): Letting a guilty person go free. In CRO: Discarding a genuinely great optimization because our sample size was too small to detect the lift.`,
        callout: {
          type: 'note',
          text: 'The legal analogy instantly communicates statistical tradeoffs to founders and marketing executives without technical jargon.',
        },
      },
      {
        heading: 'Articulating Low-Traffic Strategies Under Interview Pressure',
        body: `A classic interview curveball: "Our store only gets 8,000 visitors a month. How would you run our CRO program?"
The Winning Response:
1. State the Mathematical Truth: Acknowledge that running classical A/B split tests with 95% confidence on 8,000 monthly sessions would take 10+ months, rendering split testing mathematically invalid.
2. Outline the Alternative Roadmap:
   - Heuristic & Usability Audits: Eliminate obvious UX friction, mobile clipping, and slow LCP through "Just Do It" (JDI) fixes.
   - Qualitative User Testing: Conduct 5 recorded customer usability interviews to identify fit/sizing doubts.
   - Sequential Pre/Post Cohort Analysis: Deploy high-impact improvements and evaluate 30-day pre/post metrics adjusting for seasonality.`,
        code: `// Statistical Cheat-Sheet Matrix for CRO Developer Interviews
const INTERVIEW_STATS_CHEAT_SHEET = {
  alpha: '0.05 (5% False Positive Risk / 95% Confidence Level)',
  beta: '0.20 (20% False Negative Risk / 80% Statistical Power)',
  mde: 'Minimum Detectable Effect: Inversely proportional to the square root of sample size',
  srm: 'Sample Ratio Mismatch: Evaluated via Chi-Square goodness-of-fit (critical at p < 0.001)',
  peekingCrime: 'Repeated optional stopping inflates true false positive rate from 5% to > 30%',
  minDuration: '14 days minimum (2 full weekly cycles) regardless of traffic volume'
};

console.table(INTERVIEW_STATS_CHEAT_SHEET);`,
        language: 'javascript',
      }
    ],
    mistakes: [
      'Stumbling on basic statistical definitions during interviews.',
      'Claiming you can A/B test any page regardless of traffic volume.',
    ],
    checklist: [
      'I can answer the Peeking Problem question fluently.',
      'I can explain the tradeoff between MDE and sample size duration.',
    ],
    furtherReading: [
      { title: 'Cracking the CRO Interview Guide', url: 'https://croday.com' },
    ],
  },
  {
    id: 'm16-l3',
    moduleId: 'module-16',
    slug: 'common-cro-interview-questions-for-shopify-devs',
    title: 'Common CRO Interview Questions for Shopify Devs',
    estimatedMinutes: 25,
    objectives: [
      'Master the top 10 technical Shopify CRO interview questions.',
      'Explain Section Rendering API, Checkout Extensibility, and Web Pixels under interview pressure.',
      'Demonstrate deep awareness of Core Web Vitals and LCP optimization.',
    ],
    videoSource: {
      title: 'CRO Interview Questions & Conversion Rate Optimization Strategies',
      embedUrl: 'https://www.youtube-nocookie.com/embed/tYJJDloQxUY',
      channel: 'Invesp',
      duration: '10:15',
      description: 'Top interview questions, heuristics, and statistical concepts asked during technical Conversion Rate Optimization screens.',
      topics: ['CRO Interview Prep', 'A/B Testing Heuristics', 'Statistical Questions', 'Conversion Strategy'],
    },
    sections: [
      {
        heading: 'Top 10 Technical Shopify CRO Interview Questions',
        body: `Be prepared to answer these core technical questions:
1. How does the Section Rendering API improve cart drawer performance compared to full-page reloads?
2. What causes Cumulative Layout Shift (CLS) on Shopify PDPs, and how do you eliminate it using Liquid and CSS?
3. How do you prevent Flash of Unstyled Content (FOUC) in client-side A/B testing without using blocking anti-flicker opacity hacks?
4. How do Shopify Functions (WebAssembly) differ from legacy Ruby Scripts?
5. Why are Checkout UI Extensions sandboxed in Web Workers, and what UI restrictions does that create?
6. How does \`fetchpriority="high"\` interact with browser preload scanners for LCP hero images?
7. What is the difference between client-side dataLayer tracking and server-side Meta CAPI?
8. How do you diagnose and eliminate third-party Shopify app script bloat?
9. When would you recommend headless Hydrogen/Remix over a native Liquid theme?
10. How do you detect and handle Sample Ratio Mismatch (SRM)?`,
        callout: {
          type: 'tip',
          text: 'Practice explaining these concepts out loud. Concise, articulate technical answers demonstrate true mastery.',
        },
      },
      {
        heading: 'Explaining Section Rendering, Checkout Extensibility, and Web Pixels',
        body: `Be ready to walk through Shopify's modern architecture stack:
• Section Rendering API: Allows fetching dynamic HTML fragments server-side via AJAX query parameters, keeping logic in Liquid and eliminating client-side template bloat.
• Checkout Extensibility: Replaces insecure \`checkout.liquid\` with sandboxed, performant UI extensions and WebAssembly Functions that run seamlessly across Shop Pay.
• Web Pixels API: Safe, isolated customer event bus providing 100% reliable telemetry across the entire funnel without slowing down the main browsing thread.`,
        callout: {
          type: 'shopify',
          text: 'Showing that you are fully versed in modern Shopify 2025/2026 standards immediately disqualifies developers stuck in legacy 2018 patterns.',
        },
      },
      {
        heading: 'Demonstrating Deep Awareness of Core Web Vitals and LCP Optimization',
        body: `When asked about site speed, avoid generic platitudes ("I optimize images").
Deliver the Senior Engineering Breakdown:
"To optimize Largest Contentful Paint (LCP) on a Shopify PDP, I inspect the network waterfall to identify the hero image. I ensure it uses responsive Liquid \`srcset\` via the \`image_tag\` filter, apply \`loading='eager'\` and \`fetchpriority='high'\`, inject a preload link in \`<head>\`, and wrap the container in an explicit CSS aspect-ratio wrapper to prevent Cumulative Layout Shift." `,
        code: `// Technical Interview Quick-Reference Architecture Summary
export const SHOPIFY_CRO_TECH_STACK = {
  templating: 'Liquid 2.0 + Section Rendering API',
  checkout: 'Checkout Extensibility + Checkout UI Extensions (Preact)',
  backendLogic: 'Shopify Functions (Rust / Wasm)',
  telemetry: 'Shopify Web Pixels API + GA4 dataLayer + Meta CAPI',
  edgeRouting: 'Cloudflare Workers (HTMLRewriter)',
  performanceBudget: 'Sub-2.5s LCP, Sub-200ms INP, Sub-0.05 CLS'
};`,
        language: 'javascript',
      }
    ],
    mistakes: [
      'Suggesting obsolete practices like editing checkout.liquid or using script tags in header.',
      'Failing to mention mobile-specific performance considerations.',
    ],
    checklist: [
      'I can answer all top 10 Shopify CRO technical questions cleanly.',
      'I can articulate the technical boundaries of Shopify architecture.',
    ],
    furtherReading: [
      { title: 'Shopify Partners: Technical Interview Prep', url: 'https://shopify.dev' },
    ],
  },
  {
    id: 'm16-l4',
    moduleId: 'module-16',
    slug: 'freelance-vs-in-house-vs-agency-choosing-your-path',
    title: 'Freelance vs In-House vs Agency — Choosing Your Path',
    estimatedMinutes: 20,
    objectives: [
      'Compare career trajectories, compensation models, and day-to-day responsibilities.',
      'Package CRO development services (audits, experimentation retainers, theme builds).',
      'Position yourself as a revenue-generating engineer rather than a commodity ticket coder.',
    ],
    videoSource: {
      title: 'How to Become a CRO Specialist: Skills, Salary & Career Path Explained',
      embedUrl: 'https://www.youtube-nocookie.com/embed/O-2kle-_2s8',
      channel: "Digital Asan's Lens",
      duration: '12:05',
      description: 'Breakdown of career paths in Conversion Rate Optimization: working as an in-house experimentation lead, freelance consultant, or agency specialist.',
      topics: ['CRO Career Pathways', 'In-House vs Agency', 'Freelance Consulting', 'Experimentation Skillset'],
    },
    sections: [
      {
        heading: 'Comparing Career Trajectories: Freelance vs In-House vs Agency',
        body: `Evaluate the three primary career paths for a CRO developer:

1. Freelance / Solo Consultant:
• Earnings: $75 to $200+/hour, or $3k - $8k/month retainers per client.
• Pros: Complete freedom, high earning ceiling, direct founder relationships.
• Cons: Client acquisition hustle, feast-or-famine income cycles.

2. Full-Service CRO Agency:
• Earnings: $80,000 to $140,000/year base salary.
• Pros: Rapid exposure to 15+ high-volume Shopify stores simultaneously; fast learning curve.
• Cons: High client turnover, tight project deadlines.

3. In-House Senior CRO Engineer (High-Growth D2C Brand):
• Earnings: $120,000 to $180,000+ base salary plus equity/bonuses.
• Pros: Deep focus on a single brand, dedicated engineering resources, sustainable work-life balance.
• Cons: Slower experimentation velocity if traffic is limited.`,
        callout: {
          type: 'tip',
          text: 'Starting in an agency for 18 months gives you the data exposure of 5 years in-house, setting you up for lucrative solo consulting.',
        },
      },
      {
        heading: 'Packaging CRO Development Services: Audits, Retainers, and Theme Builds',
        body: `How to package and sell your CRO development capabilities:
• The Comprehensive CRO Audit ($2,500 - $5,000 one-time):
  A 10-day diagnostic evaluating funnel telemetry, Core Web Vitals bottlenecks, qualitative heuristics, and delivering an actionable 90-day experiment backlog.
• The Experimentation Retainer ($4,000 - $8,000/month recurring):
  Delivering 2 full experiments per month: hypothesis formulation, design, Liquid/JS development, QA, statistical analysis, and hardcoding winners.
• The High-Performance CRO Theme Rebuild ($15,000 - $35,000):
  Building a custom Shopify theme with built-in Section Rendering cart drawers, sticky bars, and sub-2.0s Core Web Vitals.`,
        callout: {
          type: 'note',
          text: 'Never sell "hours." Sell business outcomes: "We run a predictable experimentation engine that adds $100k+ in recurring revenue."',
        },
      },
      {
        heading: 'Positioning as a Revenue-Generating Growth Engineer',
        body: `The market is saturated with commodity theme developers who charge $25/hour to fix CSS bugs.
How to Position Yourself in the Top 1%:
• Commodity Coder: "I can build your Shopify theme from a Figma file."
• Revenue-Generating Growth Engineer: "I engineer high-performance conversion systems that maximize Revenue Per Session (RPS) and Average Order Value while protecting Core Web Vitals and profit margins."
When you tie your code directly to the merchant's bottom-line cash flow, your value and earning power compound exponentially.`,
        code: `// Client Proposal Retainer Value Calculation Model
function modelRetainerRoi(clientMonthlyRevenue: number, targetMonthlyLiftPercent: number = 0.04) {
  const expectedMonthlyGain = clientMonthlyRevenue * targetMonthlyLiftPercent;
  const retainerCost = 5000;
  const netMerchantProfit = expectedMonthlyGain - retainerCost;
  const roiMultiplier = expectedMonthlyGain / retainerCost;

  return {
    clientMonthlyRevenue: '$' + clientMonthlyRevenue.toLocaleString(),
    expectedMonthlyRevenueLift: '$' + Math.round(expectedMonthlyGain).toLocaleString(),
    monthlyRetainerFee: '$' + retainerCost.toLocaleString(),
    netMerchantProfitMonthly: '$' + Math.round(netMerchantProfit).toLocaleString(),
    roiRatio: \`\${roiMultiplier.toFixed(1)}x return on investment\`,
    pitchVerdict: roiMultiplier >= 3 ? 'NO_BRAINER_INVESTMENT_FOR_FOUNDER' : 'NEEDS_LARGER_STORE_TRAFFIC'
  };
}

console.log(modelRetainerRoi(250000, 0.04));
// Output: { expectedMonthlyRevenueLift: '$10,000', monthlyRetainerFee: '$5,000', netMerchantProfitMonthly: '$5,000', roiRatio: '2.0x return' }`,
        language: 'javascript',
      }
    ],
    mistakes: [
      'Selling "code hours" instead of "conversion uplift and revenue efficiency".',
      'Failing to leverage your Capstone Case Study as proof of work in outreach.',
    ],
    checklist: [
      'I know how to structure a monthly CRO retainer proposal.',
      'I position my services around revenue generation rather than commodity coding.',
    ],
    furtherReading: [
      { title: 'The Value-Based Pricing Playbook', url: 'https://jonathanstark.com' },
    ],
  },
];
