import { getSectionPractice } from '../partPractices';
/**
 * Curated production code blueprints for lessons in Phases 5 & 6 that didn't originally include code snippets.
 */
const CURATED_LESSON_CODE_BLUEPRINTS = {
    'm18-l2': {
        language: 'liquid',
        code: `{% comment %} Above-the-Fold 5-Second Value Proposition Hero Block {% endcomment %}
<section class="uvp-hero" aria-labelledby="UvpHeadline">
  <div class="uvp-hero__social-proof">
    <span class="uvp-hero__stars" aria-label="4.9 out of 5 stars">★★★★★</span>
    <span><strong>4.9/5</strong> from 12,400+ verified Shopify buyers</span>
  </div>

  <h1 id="UvpHeadline" class="uvp-hero__title">
    {{ section.settings.outcome_headline | default: 'Clinical-Grade Barrier Repair in 7 Days—Without Greasy Residue' }}
  </h1>

  <p class="uvp-hero__subtitle">
    {{ section.settings.mechanism_subhead | default: 'Formulated with 5% bio-identical ceramides and cold-pressed squalane for sensitive skin.' }}
  </p>

  <ul class="uvp-hero__value-stack" role="list">
    <li>✓ Dermatologist-tested &amp; fragrance-free</li>
    <li>✓ Ships free today • 60-day empty-bottle guarantee</li>
  </ul>
</section>`,
    },
    'm18-l3': {
        language: 'javascript',
        code: `// Voice-of-Customer (VOC) Review Mining & Objection Tagging Pipeline
export function categorizeCustomerReviews(reviews: { rating: number; body: string }[]) {
  const buckets = {
    hesitationBeforeBuying: [] as string[],
    specificOutcomePraised: [] as string[],
    competitorSwitchingTrigger: [] as string[],
  };

  for (const r of reviews) {
    const text = r.body;
    if (/skeptical|wasn't sure|hesitated|worried|thought it would/i.test(text)) {
      buckets.hesitationBeforeBuying.push(text);
    }
    if (/within \d+ days|finally stopped|immediately noticed|no longer/i.test(text)) {
      buckets.specificOutcomePraised.push(text);
    }
    if (/switched from|tried every|better than|used to buy/i.test(text)) {
      buckets.competitorSwitchingTrigger.push(text);
    }
  }
  return buckets;
}`,
    },
    'm19-l1': {
        language: 'liquid',
        code: `{% comment %} High-Ticket ($500+) Dual-CTA Buy Box: Direct Purchase + Spec Sheet / Consultation {% endcomment %}
<div class="high-ticket-actions">
  <button type="submit" name="add" class="btn btn-primary btn-full">
    Order Now — {{ current_variant.price | money }} (Ships Insured via FedEx)
  </button>

  <div class="high-ticket-secondary-grid">
    <a href="{{ product.metafields.b2b.spec_sheet_pdf.value }}" target="_blank" class="btn btn-secondary">
      📄 Download Technical Spec Sheet (PDF)
    </a>
    <button type="button" data-open-modal="expert-consult" class="btn btn-secondary">
      💬 Talk to a Product Engineer (2-Min Response)
    </button>
  </div>
</div>`,
    },
    'm19-l4': {
        language: 'liquid',
        code: `{% comment %} Enterprise B2B Trust, Compliance & Warranty Verification Block {% endcomment %}
<aside class="b2b-compliance-card" aria-label="Enterprise Purchasing Assurances">
  <div class="b2b-compliance-card__row">
    <strong>✓ ISO-9001 &amp; CE Certified</strong>
    <span>Full batch traceability &amp; certificate of analysis included</span>
  </div>
  <div class="b2b-compliance-card__row">
    <strong>✓ Net-30 / Net-60 Terms Available</strong>
    <span>Instant PO approval for qualified corporate accounts</span>
  </div>
  <div class="b2b-compliance-card__row">
    <strong>✓ 5-Year Commercial Replacement Warranty</strong>
    <span>Dedicated SLA support with 24-hour replacement dispatch</span>
  </div>
</aside>`,
    },
    'm19-l5': {
        language: 'liquid',
        code: `{% comment %} High-Ticket Sample Kit Credit Banner (100% Rebate Toward Full Order) {% endcomment %}
{% if product.tags contains 'sample-kit' %}
  <div class="sample-rebate-banner">
    <strong>💡 Try Risk-Free at Home:</strong>
    <p>
      Order this {{ product.price | money }} Sample Kit today. You will automatically receive a
      <strong>{{ product.price | money }} store credit voucher</strong> via email toward your full-size order!
    </p>
  </div>
{% endif %}`,
    },
    'm20-l2': {
        language: 'liquid',
        code: `{% comment %} Multi-Currency Clean Price Display with Market-Aware Formatting {% endcomment %}
<div class="localized-price-box">
  <span class="localized-price-box__current">
    {{ product.selected_or_first_available_variant.price | money_with_currency }}
  </span>
  {% if localization.country.iso_code != 'US' %}
    <span class="localized-price-box__tax-note">
      {% if cart.taxes_included %}
        (Includes local VAT &amp; customs duties — no fees on delivery)
      {% endif %}
    </span>
  {% endif %}
</div>`,
    },
    'm20-l3': {
        language: 'liquid',
        code: `{% comment %} Dynamic Regional Payment Method Badges via localization.country.iso_code {% endcomment %}
<div class="regional-payment-badges" aria-label="Supported local payment methods">
  {% case localization.country.iso_code %}
    {% when 'NL' %}
      <span class="payment-pill">✓ Pay with iDEAL</span>
    {% when 'DE' or 'AT' or 'SE' %}
      <span class="payment-pill">✓ Klarna Pay in 30 Days</span>
    {% when 'AE' or 'SA' %}
      <span class="payment-pill">✓ Tabby / Tamara (4 Interest-Free Payments)</span>
      <span class="payment-pill">✓ Cash on Delivery Available</span>
    {% when 'BR' %}
      <span class="payment-pill">✓ Instant PIX Payment</span>
    {% else %}
      <span class="payment-pill">✓ Shop Pay • Apple Pay • PayPal</span>
  {% endcase %}
</div>`,
    },
    'm21-l1': {
        language: 'liquid',
        code: `{% comment %} System 1 Cognitive Ease Buy-Box: Pre-Calculated Savings (Zero Mental Math) {% endcomment %}
{% assign current = product.selected_or_first_available_variant %}
{% if current.compare_at_price > current.price %}
  {% assign saved_amount = current.compare_at_price | minus: current.price | money_without_trailing_zeros %}
  {% assign saved_pct = current.compare_at_price | minus: current.price | times: 100.0 | divided_by: current.compare_at_price | round %}
  <div class="cognitive-ease-pricing">
    <span class="price-now">{{ current.price | money }}</span>
    <s class="price-was">{{ current.compare_at_price | money }}</s>
    <span class="price-save-badge">You Save {{ saved_amount }} ({{ saved_pct }}% OFF)</span>
  </div>
{% endif %}`,
    },
    'm21-l3': {
        language: 'liquid',
        code: `{% comment %} Hick's Law Choice Curation: "Best For" Guided Filter Chips on Collection Pages {% endcomment %}
<nav class="guided-usecase-pills" aria-label="Shop by Skin Goal">
  <a href="{{ collection.url }}" class="usecase-pill {% if current_tags == blank %}is-active{% endif %}">
    All Formulas ({{ collection.all_products_count }})
  </a>
  <a href="{{ collection.url }}/best-for-dry-skin" class="usecase-pill {% if current_tags contains 'best-for-dry-skin' %}is-active{% endif %}">
    💧 Best for Dry Skin
  </a>
  <a href="{{ collection.url }}/best-for-sensitive" class="usecase-pill {% if current_tags contains 'best-for-sensitive' %}is-active{% endif %}">
    🌿 Sensitive &amp; Redness
  </a>
  <a href="{{ collection.url }}/dermatologist-top-pick" class="usecase-pill {% if current_tags contains 'dermatologist-top-pick' %}is-active{% endif %}">
    ⭐ Top Rated Starter
  </a>
</nav>`,
    },
    'm21-l4': {
        language: 'javascript',
        code: `// Loss-Aversion Cart Progress Bar + Persistent Customizer State (Endowment Effect)
export function computeLossAversionBanner(cartSubtotalCents: number, freeGiftThresholdCents = 7500) {
  if (cartSubtotalCents >= freeGiftThresholdCents) {
    return {
      unlocked: true,
      progressPct: 100,
      copy: "🎉 Your Free $24 Travel Bag is unlocked and reserved in your cart! Complete checkout to claim it.",
    };
  }
  const remainingDollars = ((freeGiftThresholdCents - cartSubtotalCents) / 100).toFixed(2);
  const progressPct = Math.min(99, Math.round((cartSubtotalCents / freeGiftThresholdCents) * 100));
  return {
    unlocked: false,
    progressPct,
    copy: \`You're only $\${remainingDollars} away from claiming your Free $24 Travel Bag—don't leave it behind!\`,
  };
}`,
    },
    'm21-l5': {
        language: 'liquid',
        code: `{% comment %} White-Hat Transparent Subscription Selector (FTC ROSCA Compliant) {% endcomment %}
<fieldset class="ethical-purchase-options">
  <legend class="sr-only">Choose purchase frequency</legend>

  <label class="purchase-option-card">
    <input type="radio" name="selling_plan_group" value="one-time" checked />
    <div class="purchase-option-card__body">
      <strong>One-Time Purchase</strong>
      <span>{{ product.price | money }}</span>
    </div>
  </label>

  <label class="purchase-option-card purchase-option-card--sub">
    <input type="radio" name="selling_plan_group" value="subscribe" />
    <div class="purchase-option-card__body">
      <strong>Subscribe &amp; Save 15% ({{ product.price | times: 0.85 | money }})</strong>
      <small>Delivered monthly • Pause, skip, or cancel in 1 click anytime in your account.</small>
    </div>
  </label>
</fieldset>`,
    },
    'm22-l1': {
        language: 'liquid',
        code: `{% comment %} High-Intent Expanded Header Search Bar with Problem/Category Prompts {% endcomment %}
<form action="{{ routes.search_url }}" method="get" role="search" class="expanded-search-bar">
  <input type="hidden" name="type" value="product" />
  <input type="hidden" name="options[prefix]" value="last" />
  <label for="HeaderSearchInput" class="sr-only">Search store catalog</label>
  <input
    id="HeaderSearchInput"
    type="search"
    name="q"
    value="{{ search.terms | escape }}"
    placeholder="Search by product, ingredient, or concern (e.g. 'Vitamin C', 'Dry Skin')..."
    autocomplete="off"
    class="expanded-search-bar__input"
  />
  <button type="submit" class="expanded-search-bar__submit" aria-label="Submit search">
    Search
  </button>
</form>`,
    },
    'm22-l5': {
        language: 'liquid',
        code: `{% comment %} Mobile Visual Category Thumbnail Strip (Reduces 4-Level Menu Friction) {% endcomment %}
<nav class="mobile-visual-categories" aria-label="Quick Category Discovery">
  {% for link in linklists['mobile-visual-menu'].links %}
    {% assign col = link.object %}
    <a href="{{ link.url }}" class="visual-category-chip">
      {% if col.image %}
        <img
          src="{{ col.image | image_url: width: 120 }}"
          alt="{{ link.title | escape }}"
          width="48"
          height="48"
          loading="eager"
        />
      {% endif %}
      <span>{{ link.title }}</span>
    </a>
  {% endfor %}
</nav>`,
    },
    'm23-l2': {
        language: 'javascript',
        code: `// Shopify Web Pixel + First-Party Server-Side GTM (sGTM) Event Emitter with Deduplication ID
analytics.subscribe('checkout_completed', (event) => {
  const checkout = event.data.checkout;
  // Deterministic event_id shared between Browser Pixel and Server Webhook to prevent double-counting
  const deduplicationEventId = \`order_\${checkout.order?.id}_\${checkout.token}\`;

  fetch('https://metrics.yourstore.com/g/collect', {
    method: 'POST',
    keepalive: true,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event_name: 'purchase',
      event_id: deduplicationEventId,
      transaction_id: checkout.order?.id,
      value: checkout.totalPrice?.amount,
      currency: checkout.currencyCode,
      items: checkout.lineItems.map((item) => ({
        item_id: item.variant?.id,
        item_name: item.title,
        price: item.variant?.price?.amount,
        quantity: item.quantity,
      })),
    }),
  });
});`,
    },
    'm23-l3': {
        language: 'javascript',
        code: `// Edge Feature Flag & Experiment Assignment with Emergency Kill Switch
export function evaluateStorefrontFlag(flagKey: string, visitorId: string, config: {
  killSwitchActive: boolean;
  rolloutPercentage: number;
}): 'control' | 'treatment' {
  // 1. Instant 1-second safety kill switch if checkout telemetry drops
  if (config.killSwitchActive) return 'control';

  // 2. Deterministic hash bucket (0 - 99) so the user always sees the same experience
  let hash = 0;
  const input = \`\${flagKey}:\${visitorId}\`;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  const bucket = Math.abs(hash) % 100;
  return bucket < config.rolloutPercentage ? 'treatment' : 'control';
}`,
    },
    'm23-l4': {
        language: 'javascript',
        code: `// Automated Sample Ratio Mismatch (SRM) Chi-Square Diagnostic Guard
export function detectSampleRatioMismatch(
  observedControl: number,
  observedTreatment: number,
  expectedSplit = 0.5
) {
  const total = observedControl + observedTreatment;
  const expectedControl = total * expectedSplit;
  const expectedTreatment = total * (1 - expectedSplit);

  const chiSquare =
    Math.pow(observedControl - expectedControl, 2) / expectedControl +
    Math.pow(observedTreatment - expectedTreatment, 2) / expectedTreatment;

  // Critical value for 1 degree of freedom at p = 0.001 is 10.828 (p = 0.01 is 6.635)
  const hasSevereSrm = chiSquare > 6.635;
  return {
    chiSquare: Number(chiSquare.toFixed(3)),
    hasSevereSrm,
    verdict: hasSevereSrm
      ? 'CRITICAL SRM DETECTED: Halt analysis immediately and inspect browser/device crash logs!'
      : 'Healthy traffic allocation ratio verified.',
  };
}`,
    },
    'm24-l1': {
        language: 'javascript',
        code: `// Compounding CRO Flywheel Simulator: Projecting 12-Month Revenue Lift
export function projectAnnualExperimentationCompounding(params: {
  monthlyBaselineRevenue: number;
  testsPerMonth: number;
  winRate: number; // e.g., 0.33 (1 in 3 tests win)
  avgRelativeLiftPerWin: number; // e.g., 0.06 (+6% RPS lift)
}) {
  let currentMonthlyRev = params.monthlyBaselineRevenue;
  let cumulativeAnnualRev = 0;

  for (let month = 1; month <= 12; month++) {
    const expectedMonthlyLift =
      params.testsPerMonth * params.winRate * params.avgRelativeLiftPerWin;
    currentMonthlyRev = currentMonthlyRev * (1 + expectedMonthlyLift);
    cumulativeAnnualRev += currentMonthlyRev;
  }

  return {
    startingMonthlyRevenue: '$' + params.monthlyBaselineRevenue.toLocaleString(),
    month12RunRate: '$' + Math.round(currentMonthlyRev).toLocaleString(),
    incrementalAnnualGain:
      '$' + Math.round(cumulativeAnnualRev - params.monthlyBaselineRevenue * 12).toLocaleString(),
  };
}`,
    },
    'm24-l2': {
        language: 'javascript',
        code: `// Post-Mortem Segment Dissection: Identifying Offsetting Device Effects
export function analyzeSegmentedTestImpact(segments: {
  segmentName: string;
  controlSessions: number;
  controlOrders: number;
  treatmentSessions: number;
  treatmentOrders: number;
}[]) {
  return segments.map((s) => {
    const cCvr = (s.controlOrders / s.controlSessions) * 100;
    const tCvr = (s.treatmentOrders / s.treatmentSessions) * 100;
    const relLift = ((tCvr - cCvr) / cCvr) * 100;
    return {
      segment: s.segmentName,
      controlCvr: cCvr.toFixed(2) + '%',
      treatmentCvr: tCvr.toFixed(2) + '%',
      relativeLift: (relLift >= 0 ? '+' : '') + relLift.toFixed(1) + '%',
    };
  });
}`,
    },
    'm24-l3': {
        language: 'javascript',
        code: `// Executive C-Suite ROI & Annualized Incremental Margin Calculator
export function generateExecutiveRoiSummary(input: {
  annualBaselineRevenue: number;
  relativeRpsLiftPct: number;
  grossMarginPct: number;
  annualProgramCost: number;
}) {
  const annualizedIncrementalRevenue =
    input.annualBaselineRevenue * (input.relativeRpsLiftPct / 100);
  const annualizedIncrementalGrossProfit =
    annualizedIncrementalRevenue * (input.grossMarginPct / 100);
  const netRoiMultiple = annualizedIncrementalGrossProfit / input.annualProgramCost;

  return {
    incrementalTopLineRevenue: '$' + Math.round(annualizedIncrementalRevenue).toLocaleString(),
    incrementalContributionProfit:
      '$' + Math.round(annualizedIncrementalGrossProfit).toLocaleString(),
    programRoiMultiple: netRoiMultiple.toFixed(1) + 'x Return on Investment',
  };
}`,
    },
};
/**
 * Generates a high-signal Senior CRO / Shopify Architecture callout if a section lacks one.
 */
function buildFallbackCallout(lesson, section, idx) {
    const h = section.heading.toLowerCase();
    if (h.includes('liquid') || h.includes('shopify') || h.includes('section') || h.includes('theme')) {
        return {
            type: 'shopify',
            text: `Shopify Implementation Rule: Keep "${section.heading}" server-rendered in Liquid or updated via the Section Rendering API so mobile shoppers experience zero layout shift (CLS) and instant visual feedback.`,
        };
    }
    if (h.includes('mistake') || h.includes('trap') || h.includes('dark') || h.includes('fail') || h.includes('collapse')) {
        return {
            type: 'warning',
            text: `Critical Safeguard: Always validate this failure mode on a real 390px mobile viewport and monitor guardrail metrics (refund rate, checkout drop-off, and Sample Ratio Mismatch) before rolling out to 100% of traffic.`,
        };
    }
    if (h.includes('math') || h.includes('formula') || h.includes('metric') || h.includes('srm') || h.includes('roi')) {
        return {
            type: 'note',
            text: `Unit Economics Benchmark: Always pair Conversion Rate (CVR) analysis with Revenue Per Session (RPS) and Contribution Margin (CM2) so every optimization compounds net store profitability.`,
        };
    }
    const types = ['tip', 'shopify', 'note'];
    return {
        type: types[idx % types.length],
        text: lesson.checklist[idx] ||
            lesson.objectives[idx] ||
            `Senior CRO Takeaway: Applying "${section.heading}" systematically reduces buyer hesitation and increases Revenue Per Session (RPS) without increasing ad spend.`,
    };
}
/**
 * Expands overly brief section prose with a clear, structured implementation guide so no section feels thin.
 */
function enrichSectionBody(lesson, section, idx) {
    const trimmed = section.body.trim();
    if (trimmed.length >= 380)
        return trimmed;
    const objective = lesson.objectives[idx] || lesson.objectives[0] || lesson.title;
    const checklistPoint = lesson.checklist[idx] || lesson.checklist[0] || 'Verify mobile ergonomics and analytics tracking.';
    return `${trimmed}

How Senior Shopify CRO Engineers Execute This in Production:
• Diagnosis & Telemetry: Before changing theme code, verify where users hesitate or drop off using device-segmented GA4 funnel events and mobile scroll/tap heatmaps.
• Core Implementation Goal: ${objective}
• Pre-Launch Verification: ${checklistPoint} Always compare Revenue Per Session (RPS) and mobile interaction speed before and after deployment.`;
}
/**
 * Builds a comprehensive Masterclass Deep-Dive Playbook for any lesson that doesn't already define one.
 */
function buildLessonDeepDive(lesson) {
    if (lesson.deepDive)
        return lesson.deepDive;
    return {
        title: `Masterclass Implementation Playbook: ${lesson.title}`,
        overview: `To master "${lesson.title}" at a professional level, treat it as a repeatable engineering and behavioral system rather than an isolated design tweak. Every improvement here directly reduces cognitive or mechanical friction in the Shopify buying journey.`,
        realWorldScenario: lesson.visualExample?.brandScenario ||
            `A scaling DTC brand on Shopify Plus with 65,000 monthly mobile sessions noticed strong ad click-through rates but a bottleneck when shoppers encountered friction around ${lesson.title.toLowerCase()}. By systematically applying the architecture in this lesson, the team eliminated hesitation and unlocked a measurable lift in Revenue Per Session (RPS).`,
        technicalPlaybook: [
            `Step 1 — Baseline Telemetry Audit: Segment current performance by device (Mobile iOS/Android vs. Desktop) and establish your baseline CVR, AOV, and RPS before touching code.`,
            `Step 2 — Focus on the Primary Objective: ${lesson.objectives[0] || 'Eliminate above-the-fold ambiguity and friction.'}`,
            `Step 3 — Clean Shopify Theme Execution: ${lesson.objectives[1] || 'Implement semantic Liquid markup and zero-reload AJAX interactions without third-party script bloat.'}`,
            `Step 4 — Guardrail & QA Verification: ${lesson.checklist[0] || 'Test across physical mobile viewports (390×844) and verify zero Cumulative Layout Shift (CLS).'}`,
            `Step 5 — Empirical Validation: ${lesson.checklist[1] || 'Measure impact across a full 14-day business cycle and document learnings in your experimentation backlog.'}`,
        ],
        clientPitchTip: `"By implementing ${lesson.title}, we remove a proven source of mobile buyer hesitation—allowing us to capture more orders and higher Revenue Per Session from the traffic you are already paying to acquire."`,
    };
}
/**
 * Builds a complete Plain-English & Jargon Glossary guide for any lesson that doesn't already define one.
 */
function buildLessonSimpleEnglish(lesson) {
    if (lesson.simpleEnglish)
        return lesson.simpleEnglish;
    return {
        coreIdea: `In plain language: "${lesson.title}" is about making your Shopify store clearer, faster, and more trustworthy so shoppers never have to guess, wait, or work hard to buy from you.`,
        simplifiedTerms: [
            {
                term: 'RPS (Revenue Per Session)',
                simpleMeaning: 'The average dollar amount your store earns from every single visitor who lands on the site.',
                analogy: 'If 1,000 people walk into your shop and you make $2,500 total, every visitor was worth $2.50.',
            },
            {
                term: 'Cognitive Friction',
                simpleMeaning: 'Any confusion, clutter, or unanswered question that makes a shopper pause and second-guess buying.',
                analogy: 'Like trying to read a restaurant menu in the dark with missing prices.',
            },
            {
                term: 'Guardrail Metric',
                simpleMeaning: 'A safety metric (like AOV, page speed, or refund rate) you watch to make sure a test doesn’t accidentally cause harm.',
                analogy: 'Like checking engine temperature while driving faster.',
            },
        ],
        sectionSummaries: lesson.sections.map((sec, i) => ({
            heading: sec.heading,
            simpleSummary: lesson.objectives[i] ||
                lesson.checklist[i] ||
                `Focus on clarity, speed, and zero friction when implementing ${sec.heading}.`,
        })),
        keyTakeaway: lesson.checklist[0] ||
            lesson.objectives[0] ||
            'Remove friction, prove value early, and validate every change with clean data.',
    };
}
/**
 * Lesson Enricher:
 * Ensures every lesson across all 6 phases and the Shopify Dev track is rich with
 * clear explanations, production code blueprints, senior callouts, plain-English mental models,
 * and interactive section practice checks.
 */
export function enrichLesson(lesson) {
    const hasAnyCode = (lesson.sections || []).some((s) => Boolean(s.code));
    const blueprint = CURATED_LESSON_CODE_BLUEPRINTS[lesson.id];
    const enrichedSections = (lesson.sections || []).map((section, idx) => {
        // Inject curated code into section 1 (or section 0) if the lesson had no code blocks
        const shouldInjectBlueprint = !hasAnyCode && blueprint && idx === Math.min(1, lesson.sections.length - 1);
        return {
            ...section,
            body: enrichSectionBody(lesson, section, idx),
            callout: section.callout || buildFallbackCallout(lesson, section, idx),
            code: section.code || (shouldInjectBlueprint ? blueprint.code : undefined),
            language: section.language || (shouldInjectBlueprint ? blueprint.language : undefined),
            practice: getSectionPractice(lesson, section, idx),
        };
    });
    return {
        ...lesson,
        estimatedMinutes: Math.max(lesson.estimatedMinutes || 25, 25),
        sections: enrichedSections,
        simpleEnglish: buildLessonSimpleEnglish(lesson),
        deepDive: buildLessonDeepDive(lesson),
    };
}
