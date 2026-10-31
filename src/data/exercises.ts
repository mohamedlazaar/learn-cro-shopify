import { Exercise } from '../types/curriculum';
import { SHOPIFY_DEV_EXERCISES } from './shopifyDevExercises';

const CRO_EXERCISES: Exercise[] = [
  // Module 1: CRO & Ecommerce Fundamentals
  {
    id: 'ex-m1-math',
    moduleId: 'module-1',
    slug: 'compute-cvr-aov-rps',
    title: 'Compute CVR, AOV, and RPS from Store Telemetry',
    type: 'math',
    difficulty: 'easy',
    xp: 15,
    prompt: 'Given a store with 50,000 sessions, 1,250 orders, and $95,000 in gross revenue, compute the core conversion metrics.',
    targetValues: {
      cvr: 2.5, // 2.5%
      aov: 76.0, // $76.00
      rps: 1.9, // $1.90
    },
    tolerance: 0.05,
    explanation: 'CVR = (1,250 / 50,000) * 100 = 2.50%. AOV = $95,000 / 1,250 = $76.00. RPS = $95,000 / 50,000 = $1.90 (or 0.025 * $76 = $1.90).',
  },
  {
    id: 'ex-m1-mcq',
    moduleId: 'module-1',
    slug: 'which-metric-reflects-cro-success',
    title: 'Which Metric Best Reflects True CRO Success?',
    type: 'multiple-choice',
    difficulty: 'easy',
    xp: 15,
    prompt: 'You are evaluating an ecommerce optimization initiative. Which single metric best reflects overall commercial success and revenue efficiency?',
    options: [
      'Conversion Rate (CVR) alone, because it measures pure checkout action.',
      'Revenue Per Session (RPS), because it integrates both conversion velocity and basket size without being fooled by aggressive discounting.',
      'Bounce Rate, because keeping visitors on the page guarantees higher sales.',
      'Add-to-Cart (ATC) rate, because getting items in the basket is the hardest step.',
    ],
    correctIndex: 1,
    explanation: 'RPS (Revenue Per Session) is the truest North Star metric because RPS = CVR × AOV. A store could boost CVR by cutting prices 90%, but RPS and net profit would crater.',
  },

  // Module 2: Shopify CRO Surface Area
  {
    id: 'ex-m2-audit',
    moduleId: 'module-2',
    slug: 'audit-5-cro-surfaces',
    title: 'Audit 5 Critical CRO Surfaces on a Mock Shopify Store',
    type: 'audit',
    difficulty: 'medium',
    xp: 30,
    mockStore: 'apparel',
    prompt: 'Inspect this simulated apparel store catalog. Select 5 distinct surfaces, identify the specific friction flaw, and specify your technical engineering recommendation.',
    rubric: [
      { criterion: 'Identified 5 distinct surfaces (e.g. PDP, Cart, Collection, Home, Header)', points: 5, description: 'Broad coverage across the funnel' },
      { criterion: 'Concrete friction diagnosis using heuristic categories', points: 5, description: 'Accurately explains cognitive or physical obstacle' },
      { criterion: 'Technically valid Shopify solution (Liquid/CSS/JS)', points: 5, description: 'Feasible implementation within Shopify limits' },
    ],
  },
  {
    id: 'ex-m2-mcq',
    moduleId: 'module-2',
    slug: 'headless-vs-liquid-cro-tradeoffs',
    title: 'Headless Hydrogen vs Liquid Theme CRO Architecture Tradeoffs',
    type: 'multiple-choice',
    difficulty: 'medium',
    xp: 25,
    prompt: 'A brand is considering migrating from a modern Shopify Online Store 2.0 Liquid theme to a Headless Hydrogen / Next.js architecture purely for "higher conversion rate". What is the primary CRO risk they must anticipate?',
    options: [
      'Headless architectures cannot process credit cards securely.',
      'Headless builds forfeit native Shopify App ecosystem integrations (reviews, subscriptions, search widgets), requiring custom API builds, maintenance overhead, and re-implementing basic analytics pipelines.',
      'Headless builds are automatically penalized by Google Search algorithms.',
      'Shopify does not allow headless storefronts to access the checkout.',
    ],
    correctIndex: 1,
    explanation: 'While Headless offers sub-second transitions, teams often underestimate that 90% of Shopify Plus apps cannot inject UI or pixels automatically. Building, maintaining, and testing custom micro-frontends can drain all CRO experimentation velocity.',
  },

  // Module 3: Analytics & Tracking
  {
    id: 'ex-m3-code',
    moduleId: 'module-3',
    slug: 'web-pixel-product-added-to-cart',
    title: 'Write a Shopify Web Pixel for product_added_to_cart',
    type: 'code',
    difficulty: 'medium',
    xp: 30,
    prompt: 'Write a Shopify Web Pixel extension that subscribes to the native `product_added_to_cart` event and pushes a GA4-compliant `add_to_cart` object to `window.dataLayer`.',
    starterCode: `// Shopify Web Pixel Extension
// Subscribe to product_added_to_cart
analytics.subscribe('product_added_to_cart', (event) => {
  // Extract line item details from event.data.cartLine
  // Format and push to window.dataLayer
  
});`,
    solution: `analytics.subscribe('product_added_to_cart', (event) => {
  const line = event.data?.cartLine;
  const variant = line?.merchandise;
  const product = variant?.product;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'add_to_cart',
    ecommerce: {
      currency: variant?.price?.currencyCode || 'USD',
      value: (variant?.price?.amount || 0) * (line?.quantity || 1),
      items: [
        {
          item_id: String(variant?.id || ''),
          item_name: product?.title || '',
          price: variant?.price?.amount || 0,
          quantity: line?.quantity || 1
        }
      ]
    }
  });
});`,
    explanation: 'The Web Pixels API provides structured event data under event.data.cartLine.merchandise. We map this cleanly into GA4’s standardized ecommerce schema.',
  },
  {
    id: 'ex-m3-fill',
    moduleId: 'module-3',
    slug: 'complete-the-tracking-plan',
    title: 'Complete the 4-Column Tracking Plan Specification',
    type: 'fill-blank',
    difficulty: 'easy',
    xp: 15,
    prompt: 'Fill in the standard 4-pillar architectural columns of an enterprise tracking plan.',
    blanks: [
      { id: 'b1', label: 'Column 1', answer: 'event', hint: 'Name of the telemetry action (e.g. add_to_cart)' },
      { id: 'b2', label: 'Column 2', answer: 'trigger', hint: 'The exact user interaction or HTTP condition' },
      { id: 'b3', label: 'Column 3', answer: 'payload', hint: 'The JSON schema properties and parameters passed' },
      { id: 'b4', label: 'Column 4', answer: 'destination', hint: 'The endpoint systems receiving the event (e.g. GA4, Meta CAPI)' },
    ],
    explanation: 'Every professional tracking plan defines: Event Name, Trigger Condition, Payload Schema, and Destinations.',
  },

  // Module 4: Research & Friction Mapping
  {
    id: 'ex-m4-writeup',
    moduleId: 'module-4',
    slug: 'write-store-friction-analysis',
    title: 'Conduct a 300-Word Qualitative Friction Analysis',
    type: 'writeup',
    difficulty: 'medium',
    xp: 30,
    prompt: 'Pick a real or mock Shopify brand. Write a structured 300+ word friction analysis evaluating: 1) Value Proposition Clarity, 2) Mobile Navigation & Sizing Hurdles, 3) Trust/Return Anxiety, and 4) Recommended Top 2 Development Fixes.',
    minWordCount: 250,
    starterWriteup: `Store Evaluated: Allbirds (or your chosen brand)
Vertical: Sustainable Footwear

1. Value Proposition Clarity:
[Detail your observations regarding how quickly the brand communicates why this product is worth its price tag]

2. Mobile Navigation & Sizing Hurdles:
[Detail specific friction observed in variant switching, fit guidance, or mobile thumb reach]

3. Trust & Return Anxiety:
[Audit the presence or absence of clear return timelines, shipping thresholds, and warranties]

4. High-Impact Development Recommendations:
- Recommendation 1:
- Recommendation 2:`,
  },
  {
    id: 'ex-m4-mcq',
    moduleId: 'module-4',
    slug: 'diagnosing-heuristic-friction-categories',
    title: 'Diagnosing Heuristic Friction in Drop-off Funnels',
    type: 'multiple-choice',
    difficulty: 'easy',
    xp: 20,
    prompt: 'During session recording analysis, you observe 40% of mobile users furiously tapping on a non-clickable grey banner that says "Free Express Shipping on Orders Over $75" before leaving the site. Which UX friction category does this represent?',
    options: [
      'Deliberate Cognitive Evaluation',
      'False Affordance & Expectation Mismatch',
      'Price Elasticity Friction',
      'Network Throttling Latency',
    ],
    correctIndex: 1,
    explanation: 'A false affordance occurs when an element visually mimics an interactive component (e.g. looking like a clickable promo button or progress bar) but does nothing when tapped, triggering user frustration and rage clicks.',
  },

  // Module 5: Hypotheses & Prioritization
  {
    id: 'ex-m5-mcq',
    moduleId: 'module-5',
    slug: 'which-hypothesis-is-best-formed',
    title: 'Which Hypothesis Follows Scientific CRO Best Practice?',
    type: 'multiple-choice',
    difficulty: 'easy',
    xp: 15,
    prompt: 'Select the hypothesis that follows the 5-part scientific CRO standard.',
    options: [
      'We should redesign the collection page banner because competitors use full-width video.',
      'Because 38% of mobile PDP exits happen on out-of-stock sizes and support receives 45 size questions weekly, we believe replacing the dropdown with visual swatch pills and a back-in-stock alert for mobile visitors will increase PDP-to-ATC by 12% without increasing return rates.',
      'Changing the button from green to bright red will create urgency and double our store conversion rate.',
      'If we add 4 new payment badges in checkout, customers will feel safer and spend more money.',
    ],
    correctIndex: 1,
    explanation: 'Option B ties observed data/friction (38% mobile exits, support tickets) to a specific technical change (swatch pills, alerts) for a target audience (mobile) with primary (+12% ATC) and guardrail (return rates) metrics.',
  },
  {
    id: 'ex-m5-math',
    moduleId: 'module-5',
    slug: 'score-hypotheses-with-ice',
    title: 'Score and Rank 3 Experiments with ICE Framework',
    type: 'math',
    difficulty: 'easy',
    xp: 15,
    prompt: `Score the following 3 experiments with the ICE framework (Score = (Impact + Confidence + Ease) / 3):
- Exp A (Sticky Mobile ATC): Impact = 8, Confidence = 8, Ease = 8
- Exp B (Complete Checkout Redesign): Impact = 9, Confidence = 4, Ease = 2
- Exp C (Free Shipping Progress Bar): Impact = 7, Confidence = 9, Ease = 8
Enter the computed ICE score for each experiment (to 2 decimal places).`,
    targetValues: {
      scoreA: 8.0,
      scoreB: 5.0,
      scoreC: 8.0,
    },
    tolerance: 0.1,
    explanation: 'Exp A: (8+8+8)/3 = 8.00. Exp B: (9+4+2)/3 = 5.00. Exp C: (7+9+8)/3 = 8.00. Exp A and C should be prioritized well ahead of high-risk Exp B.',
  },

  // Module 6: Statistics & Test Design
  {
    id: 'ex-m6-math',
    moduleId: 'module-6',
    slug: 'calculate-sample-size-test-duration',
    title: 'Calculate Test Duration in Days',
    type: 'math',
    difficulty: 'medium',
    xp: 30,
    prompt: `A store has a baseline CVR of 2.0% and wants to detect a 10% relative lift (MDE = 0.10) with 95% confidence and 80% power.
Using the 2-sample proportion formula, the required sample size is ~78,000 sessions per variant (156,000 total across 2 variants).
If the store receives 5,200 daily sessions, how many whole days must the test run to reach sample size? Round up to a full weekly 7-day cycle.`,
    targetValues: {
      rawDays: 30, // 156,000 / 5,200 = 30 days
      roundedWeekDays: 35, // Round up to full 7-day cycle: 5 weeks = 35 days
    },
    tolerance: 1,
    explanation: '156,000 / 5,200 = 30 days. Because we must always capture complete 7-day business cycles, we round 30 up to the nearest multiple of 7, which is 35 days (5 full weeks).',
  },
  {
    id: 'ex-m6-mcq',
    moduleId: 'module-6',
    slug: 'when-can-you-stop-a-test-early',
    title: 'When Can You Legally Stop an A/B Test Early?',
    type: 'multiple-choice',
    difficulty: 'easy',
    xp: 15,
    prompt: 'You launch an A/B test on Monday. By Thursday (Day 4), your variation shows a +35% lift with a p-value of 0.008. What should you do?',
    options: [
      'Stop the test immediately and declare a massive win since p < 0.01.',
      'Double the traffic to the variation so you can make more sales while it is winning.',
      'Continue running the test until the predetermined sample size is reached and at least 2 full business cycles (14 days) have elapsed.',
      'Pause the control variant and only run the test on mobile users.',
    ],
    correctIndex: 2,
    explanation: 'Stopping early because of temporary significance is the classic "Peeking Problem", causing false positives up to 30%. You must commit to sample size and complete weekly cycles.',
  },
  {
    id: 'ex-m6-power',
    moduleId: 'module-6',
    slug: 'calculate-sample-size-statistical-power',
    title: 'Calculate Required Sample Size for 80% Power & 5% Alpha',
    type: 'math',
    difficulty: 'medium',
    xp: 30,
    prompt: 'A store has a baseline CVR of 3.0%. You want to reliably detect a Minimum Detectable Effect (MDE) of 10% relative lift (target CVR = 3.3%) at 95% confidence (alpha = 0.05, Z_alpha/2 = 1.96) and 80% statistical power (beta = 0.20, Z_beta = 0.84). Standard sample size formula per variant: N ≈ 16 * (p * (1 - p)) / (delta)^2, where p = 0.03 and delta = 0.003. Compute the required sample size per variant and total sample size across both variants.',
    targetValues: {
      perVariant: 51733,
      totalSample: 103467,
    },
    tolerance: 0.08,
    explanation: 'p = 0.03, (1 - p) = 0.97. Variance = 0.0291. delta^2 = (0.003)^2 = 0.000009. N ≈ 16 * 0.0291 / 0.000009 ≈ 51,733 visitors per variant. Total for A/B test ≈ 103,467 visitors.',
  },

  // Module 7: Build an A/B Test Framework
  {
    id: 'ex-m7-code',
    moduleId: 'module-7',
    slug: 'implement-client-side-ab-test',
    title: 'Implement a Zero-Flicker Client-Side A/B Test Script',
    type: 'code',
    difficulty: 'medium',
    xp: 30,
    prompt: 'Write an inline JavaScript snippet that assigns a visitor to `control` or `variant_b` with 50/50 probability, stores it in `localStorage` under key `exp_pdp_atc`, adds class `has-variant-b` to `document.documentElement`, and pushes an `experiment_exposure` event to `window.dataLayer`.',
    starterCode: `// Minimal Client-side A/B Test Pattern
(function() {
  const STORAGE_KEY = 'exp_pdp_atc';
  // 1. Check or assign variant
  
  // 2. Apply CSS class if variant_b
  
  // 3. Dispatch experiment_exposure to dataLayer
  
})();`,
    solution: `(function() {
  const STORAGE_KEY = 'exp_pdp_atc';
  let variant = localStorage.getItem(STORAGE_KEY);

  if (!variant) {
    variant = Math.random() < 0.5 ? 'control' : 'variant_b';
    localStorage.setItem(STORAGE_KEY, variant);
  }

  if (variant === 'variant_b') {
    document.documentElement.classList.add('has-variant-b');
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'experiment_exposure',
    experiment_id: 'EXP-PDP-001',
    variant: variant
  });
})();`,
  },
  {
    id: 'ex-m7-build',
    moduleId: 'module-7',
    slug: 'ab-test-prelaunch-qa-checklist',
    title: 'Complete the Pre-Launch A/B Test QA Protocol',
    type: 'build',
    difficulty: 'medium',
    xp: 100,
    prompt: 'Verify all 6 pre-flight technical verification gates before launching live traffic to an A/B test.',
    buildChecklist: [
      'Visual inspection on physical iOS Safari (notch and bottom bar clearance verified)',
      'Variant stickiness confirmed across 5 page refreshes and new incognito tabs',
      'experiment_exposure event verified in Google Tag Manager / Console with exact payload',
      'Add to Cart, Cart Drawer update, and Checkout flow completed to payment screen with zero errors',
      'Lighthouse performance delta measured (LCP regression < 200ms, CLS < 0.05)',
      'Kill-switch mechanism tested and documented in team sprint ticket',
    ],
  },

  // Module 8: Performance & Core Web Vitals
  {
    id: 'ex-m8-liquid',
    moduleId: 'module-8',
    slug: 'rewrite-image-tag-for-lcp',
    title: 'Rewrite a Liquid Image Tag to Prioritize LCP',
    type: 'liquid',
    difficulty: 'medium',
    xp: 30,
    prompt: 'Rewrite this legacy unoptimized image tag into a responsive, high-priority Liquid image tag using `image_url`, `image_tag`, explicit `widths`, `sizes`, `loading: "eager"`, and `fetchpriority: "high"`.',
    starterCode: `<!-- Legacy Slow Image Tag -->
<img src="{{ product.featured_image | img_url: '1024x1024' }}" alt="{{ product.title }}" class="pdp-image" />`,
    solution: `{{ product.featured_image | image_url: width: 1200 | image_tag:
  widths: '375, 550, 750, 1100, 1500',
  sizes: '(min-width: 990px) 50vw, 100vw',
  alt: product.featured_image.alt | default: product.title | escape,
  class: 'pdp-image',
  loading: 'eager',
  fetchpriority: 'high'
}}`,
  },
  {
    id: 'ex-m8-audit',
    moduleId: 'module-8',
    slug: 'audit-lighthouse-top-fixes',
    title: 'Audit Lighthouse Performance Report: Top 5 Fixes',
    type: 'audit',
    difficulty: 'medium',
    xp: 30,
    prompt: 'Review a simulated Lighthouse report showing 4.8s Mobile LCP, 0.32 CLS, and 650ms INP. Identify the 5 highest-leverage engineering fixes to bring scores into the green.',
    rubric: [
      { criterion: 'Identified LCP hero image fetchpriority & eager loading', points: 4, description: 'Fixes render delay' },
      { criterion: 'Reserved image and banner aspect-ratio dimensions to eliminate 0.32 CLS', points: 4, description: 'Eliminates layout shifting' },
      { criterion: 'Deferred or eliminated non-critical 3rd-party review/chat app scripts', points: 4, description: 'Reduces main thread blocking for INP' },
      { criterion: 'Optimized web font-display swap and preload', points: 4, description: 'Avoids FOIT' },
      { criterion: 'Enforced build performance budget in CI', points: 4, description: 'Long term guardrail' },
    ],
  },
  {
    id: 'ex-m8-code',
    moduleId: 'module-8',
    slug: 'preconnect-preload-critical-assets',
    title: 'Preload Critical Fonts & Preconnect Third-Party CDN Origins',
    type: 'code',
    difficulty: 'easy',
    xp: 20,
    prompt: 'Write the HTML head snippet that establishes a preconnect link to `https://cdn.shopify.com` and preloads the critical heading font `heading-bold.woff2` as a font type with crossorigin.',
    starterCode: `<!-- Head Performance Optimization Snippet -->
<!-- 1. Preconnect to cdn.shopify.com -->

<!-- 2. Preload heading font -->
`,
    solution: `<link rel="preconnect" href="https://cdn.shopify.com" crossorigin>
<link rel="preload" href="{{ 'heading-bold.woff2' | asset_url }}" as="font" type="font/woff2" crossorigin>`,
    explanation: 'Preconnecting establishes DNS lookup, TCP handshake, and TLS negotiation ahead of time, while preloading fonts eliminates Flash of Invisible Text (FOIT) on initial paint.',
  },

  // Module 9: PDP & Collection UX
  {
    id: 'ex-m9-liquid',
    moduleId: 'module-9',
    slug: 'build-sticky-atc-liquid-block',
    title: 'Build a Sticky Add-to-Cart Block in Liquid',
    type: 'liquid',
    difficulty: 'hard',
    xp: 50,
    prompt: 'Create a mobile sticky Add to Cart bar in Liquid that displays the product thumbnail, title, price, and an Add to Cart button that submits the main product form.',
    starterCode: `<!-- Sticky Add to Cart Bar -->
<div class="sticky-atc-bar" id="stickyAtcBar">
  <!-- Include thumbnail, title, price, and trigger button -->
</div>`,
    solution: `<div class="sticky-atc-bar" id="stickyAtcBar" aria-hidden="true">
  <div class="sticky-atc-bar__content">
    {% if product.featured_image %}
      <img src="{{ product.featured_image | image_url: width: 80 }}" alt="" width="40" height="40" loading="lazy" />
    {% endif %}
    <div class="sticky-atc-bar__info">
      <span class="sticky-atc-bar__title">{{ product.title | truncate: 25 }}</span>
      <span class="sticky-atc-bar__price">{{ product.price | money }}</span>
    </div>
    <button type="button" class="btn btn--primary" onclick="document.querySelector('form[action*=\\'/cart/add\\'] button[type=\\'submit\\']')?.click()">
      Add to Cart
    </button>
  </div>
</div>`,
  },
  {
    id: 'ex-m9-build',
    moduleId: 'module-9',
    slug: 'pdp-cro-checklist-verification',
    title: 'PDP CRO Best Practice Verification Checklist',
    type: 'build',
    difficulty: 'medium',
    xp: 100,
    prompt: 'Audit and check off all critical PDP elements required for a high-converting Shopify store.',
    buildChecklist: [
      'Above-the-fold CTA placement verified on mobile viewports (< 768px)',
      'Color swatches and size pills implemented with real-time stock slash-through indicators',
      'Dynamic delivery estimation badge calculating dispatch date based on cutoff time',
      'Free 30-day returns and warranty reassurance microcopy positioned directly beneath primary button',
      'Sticky Add to Cart bar with IntersectionObserver trigger activated on scroll past primary button',
    ],
  },

  // Module 10: Cart & Checkout
  {
    id: 'ex-m10-code',
    moduleId: 'module-10',
    slug: 'cart-drawer-section-rendering-api',
    title: 'Build Cart Drawer Update via Section Rendering API',
    type: 'code',
    difficulty: 'hard',
    xp: 50,
    prompt: 'Write a JavaScript function `addToCartWithDrawer(variantId, quantity)` that posts to `/cart/add.js?sections=cart-drawer`, parses the returned HTML for `cart-drawer`, updates `#CartDrawerContainer` with the new markup, and opens the drawer.',
    starterCode: `async function addToCartWithDrawer(variantId, quantity = 1) {
  // 1. Fetch /cart/add.js?sections=cart-drawer
  // 2. Parse JSON response and extract sections['cart-drawer']
  // 3. Inject new HTML into #CartDrawerContainer
  // 4. Trigger drawer open class
}`,
    solution: `async function addToCartWithDrawer(variantId, quantity = 1) {
  try {
    const res = await fetch('/cart/add.js?sections=cart-drawer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ id: variantId, quantity })
    });
    const data = await res.json();
    if (data.sections && data.sections['cart-drawer']) {
      const container = document.getElementById('CartDrawerContainer');
      if (container) {
        container.innerHTML = data.sections['cart-drawer'];
        container.classList.add('is-open');
      }
    }
    return data;
  } catch (err) {
    console.error('Cart add failed', err);
  }
}`,
  },
  {
    id: 'ex-m10-mcq',
    moduleId: 'module-10',
    slug: 'checkout-non-plus-restrictions',
    title: 'Which Feature Is NOT Possible on Non-Plus Shopify Checkout?',
    type: 'multiple-choice',
    difficulty: 'easy',
    xp: 15,
    prompt: 'A merchant on the standard Shopify plan ($105/mo) requests custom functionality. Which of the following is NOT possible on their plan?',
    options: [
      'Changing the checkout button background color using the Checkout Branding API.',
      'Uploading a custom brand logo to appear at the top of the checkout header.',
      'Injecting custom JavaScript via Checkout UI Extensions to validate custom address fields inside checkout.',
      'Changing the font family in checkout to match their theme typography.',
    ],
    correctIndex: 2,
    explanation: 'Checkout UI Extensions and custom field injection are strictly exclusive to Shopify Plus stores. Standard plans can only modify visual tokens via the Branding API.',
  },
  {
    id: 'ex-m10-liquid',
    moduleId: 'module-10',
    slug: 'free-shipping-threshold-progress-bar',
    title: 'Free Shipping Dynamic Cart Threshold Indicator in Liquid',
    type: 'liquid',
    difficulty: 'medium',
    xp: 30,
    prompt: 'Write a Liquid snippet for a free shipping progress bar where the threshold is 7500 cents ($75.00). If cart.total_price is less than 7500, calculate remaining cents, convert to money, and show "Add {{ remaining | money }} to unlock Free Shipping!". If cart.total_price >= 7500, show "🎉 You unlocked Free Shipping!". Calculate progress percentage (capped at 100%).',
    starterCode: `{% assign threshold = 7500 %}
{% comment %} Calculate remaining amount and progress percentage {% endcomment %}
`,
    solution: `{% assign threshold = 7500 %}
{% if cart.total_price >= threshold %}
  <div class="shipping-bar shipping-bar--unlocked">
    <div class="shipping-bar__progress" style="width: 100%;"></div>
    <span class="shipping-bar__message">🎉 You unlocked Free Shipping!</span>
  </div>
{% else %}
  {% assign remaining = threshold | minus: cart.total_price %}
  {% assign progress = cart.total_price | times: 100 | divided_by: threshold %}
  <div class="shipping-bar">
    <div class="shipping-bar__progress" style="width: {{ progress }}%;"></div>
    <span class="shipping-bar__message">Add <strong>{{ remaining | money }}</strong> more to unlock Free Shipping!</span>
  </div>
{% endif %}`,
    explanation: 'Computing dynamic cart progress incentivizes shoppers to add another low-ticket accessory or bundle to cross the free shipping boundary, directly lifting AOV.',
  },

  // Module 11: Post-Purchase & Retention
  {
    id: 'ex-m11-writeup',
    moduleId: 'module-11',
    slug: 'design-post-purchase-survey',
    title: 'Design a 3-Question Post-Purchase CRO Survey',
    type: 'writeup',
    difficulty: 'medium',
    xp: 30,
    prompt: 'Design a high-response 3-question survey for the Thank You page that extracts zero-party attribution data and surfaces checkout friction points.',
    minWordCount: 150,
    starterWriteup: `Post-Purchase Survey Specification:
Display Surface: Thank You Page (Order Confirmation)
Trigger: Renders immediately under the order confirmation header.

Question 1 (Attribution):
[Specify question, input format, and predefined options]

Question 2 (Purchase Friction / Hesitation):
[Specify question probing what almost prevented them from buying today]

Question 3 (Customer Effort / Improvement):
[Specify question focused on UX or feature requests]`,
  },
  {
    id: 'ex-m11-build',
    moduleId: 'module-11',
    slug: 'thank-you-page-checklist',
    title: 'Thank You Page Retention Checklist',
    type: 'build',
    difficulty: 'medium',
    xp: 100,
    prompt: 'Verify all 5 components of a high-converting Thank You page experience.',
    buildChecklist: [
      'Prominent order confirmation number and estimated delivery date range display',
      'One-click referral link generator ("Give $15, Get $15") with copy-to-clipboard button',
      'One-question zero-party attribution survey ("How did you hear about us?")',
      'Branded order tracking link routing to internal store tracking page rather than raw courier site',
      'Customer account passwordless activation link',
    ],
  },

  // Module 12: Personalization & Segmentation
  {
    id: 'ex-m12-code',
    moduleId: 'module-12',
    slug: 'personalized-cart-banner-liquid',
    title: 'Show a Personalized Banner for Cart Value > $100 in Liquid',
    type: 'liquid',
    difficulty: 'easy',
    xp: 15,
    prompt: 'Write a Liquid snippet that inspects `cart.total_price`. If total price is >= 10000 cents ($100), display a VIP banner offering a free gift with promo code `VIPGIFT`. If less, display how many dollars remain until reaching $100.',
    starterCode: `<!-- Personalized Cart Banner -->
{%- assign threshold_cents = 10000 -%}
{%- if cart.total_price >= threshold_cents -%}
  <!-- Display unlocked banner -->
{%- else -%}
  <!-- Display amount remaining -->
{%- endif -%}`,
    solution: `{%- assign threshold_cents = 10000 -%}
{%- if cart.total_price >= threshold_cents -%}
  <div class="vip-cart-banner is-unlocked">
    🎉 <strong>VIP perk unlocked!</strong> Use code <strong>VIPGIFT</strong> at checkout for a complimentary travel kit!
  </div>
{%- else -%}
  {%- assign remaining = threshold_cents | minus: cart.total_price -%}
  <div class="vip-cart-banner is-locked">
    Add <strong>{{ remaining | money }}</strong> more to your order to unlock a <strong>Free Deluxe Gift</strong>!
  </div>
{%- endif -%}`,
  },
  {
    id: 'ex-m12-audit',
    moduleId: 'module-12',
    slug: 'audit-personalized-homepage-consent',
    title: 'Review Personalized Homepage for Privacy & Consent Compliance',
    type: 'audit',
    difficulty: 'medium',
    xp: 30,
    prompt: 'Audit a personalized homepage experience. Flag 3 critical privacy, consent, or performance violations (e.g. firing trackers before consent, hardcoded geo without fallback, unconstrained layout shift).',
    rubric: [
      { criterion: 'Flagged pre-consent pixel tracking under GDPR', points: 5, description: 'Compliance violation' },
      { criterion: 'Flagged absence of fallback when localization fails', points: 5, description: 'Graceful degradation' },
      { criterion: 'Flagged Cumulative Layout Shift (CLS) from late-injected banners', points: 5, description: 'Core Web Vitals stability' },
    ],
  },
  {
    id: 'ex-m12-fill',
    moduleId: 'module-12',
    slug: 'customer-segmentation-metafield-architecture',
    title: 'Fill-in-the-Blank: Customer Metafield Personalization Flow',
    type: 'fill-blank',
    difficulty: 'easy',
    xp: 20,
    prompt: 'Fill in the key components of the Shopify customer metafield and segment targeting workflow.',
    blanks: [
      { id: 'b1', label: 'Storage', answer: 'metafields', hint: 'Shopify object namespace where custom customer attributes are stored' },
      { id: 'b2', label: 'Authentication', answer: 'logged_in', hint: 'Liquid condition check: {% if customer %}' },
      { id: 'b3', label: 'Fall-back', answer: 'default', hint: 'The generic content rendered when a visitor is anonymous or missing attributes' },
    ],
    explanation: 'Personalization in Shopify Liquid relies on customer metafields when a user is logged in, with strict default fallbacks for anonymous first-time visitors.',
  },

  // Module 13: Program Management & Reporting
  {
    id: 'ex-m13-writeup',
    moduleId: 'module-13',
    slug: 'draft-90-day-cro-roadmap',
    title: 'Draft a 90-Day CRO Roadmap for a $1M/yr Shopify Brand',
    type: 'writeup',
    difficulty: 'hard',
    xp: 50,
    prompt: 'Author a structured 90-day experimentation roadmap broken into Month 1 (Instrumentation & Quick Wins), Month 2 (Core Funnel Architecture), and Month 3 (Advanced Testing). Specify hypotheses, target pages, and guardrail metrics.',
    minWordCount: 250,
    starterWriteup: `90-Day CRO Program Roadmap:
Client: DTC Lifestyle Brand ($1.2M Annual Revenue, ~35,000 monthly sessions, 2.1% CVR, $68 AOV)

Sprint Phase 1: Month 1 — Audit & Rapid Low-Hanging Fruit
- Sprint 1.1:
- Sprint 1.2:

Sprint Phase 2: Month 2 — Core Funnel Architecture Tests
- Sprint 2.1:
- Sprint 2.2:

Sprint Phase 3: Month 3 — High-Impact Advanced Tests
- Sprint 3.1:
- Sprint 3.2:

Program Guardrail Policy:
[Detail non-negotiable guardrails for AOV, refund rate, and Core Web Vitals]`,
  },
  {
    id: 'ex-m13-math',
    moduleId: 'module-13',
    slug: 'compute-guardrail-metrics',
    title: 'Compute Guardrail Metrics from Experiment Results',
    type: 'math',
    difficulty: 'medium',
    xp: 30,
    prompt: `An A/B test concludes with the following results:
- Control: 20,000 sessions, 400 orders (CVR 2.0%), $32,000 revenue (AOV $80.00). Total returns: $1,600 (5.0% return rate).
- Variant: 20,000 sessions, 480 orders (CVR 2.4%), $31,200 revenue (AOV $65.00). Total returns: $3,120 (10.0% return rate).
Compute the net revenue after returns for Control and Variant, and determine whether the Variant should be shipped.`,
    targetValues: {
      netRevenueControl: 30400, // $32,000 - $1,600 = $30,400
      netRevenueVariant: 28080, // $31,200 - $3,120 = $28,080
    },
    tolerance: 10,
    explanation: 'Even though CVR jumped +20% (from 2.0% to 2.4%), lower AOV and doubled return rates resulted in net revenue dropping by $2,320 (-7.6%)! The variant MUST BE REJECTED.',
  },

  // Module 14: Advanced Shopify Dev CRO
  {
    id: 'ex-m14-fn',
    moduleId: 'module-14',
    slug: 'shopify-function-free-shipping-over-75',
    title: 'Write a Shopify Function Delivery Customization',
    type: 'code',
    difficulty: 'hard',
    xp: 50,
    prompt: 'Write the TypeScript logic for a Shopify Delivery Customization Function that inspects `input.cart.cost.subtotalAmount.amount`. If amount >= 75.00, rename the standard shipping rate to "FREE Standard Shipping (Unlocked!)" and set its cost to 0.',
    starterCode: `// Shopify Function Delivery Customization
export function run(input) {
  const subtotal = parseFloat(input.cart.cost.subtotalAmount.amount);
  const operations = [];

  // If subtotal >= 75.00, rename and zero the standard shipping rate
  
  return { operations };
}`,
    solution: `export function run(input) {
  const subtotal = parseFloat(input.cart.cost.subtotalAmount.amount);
  const operations = [];

  if (subtotal >= 75.0) {
    for (const group of input.cart.deliveryGroups) {
      for (const option of group.deliveryOptions) {
        if (option.title.toLowerCase().includes('standard')) {
          operations.push({
            rename: {
              deliveryOptionHandle: option.handle,
              title: 'FREE Standard Shipping (Unlocked!)'
            }
          });
        }
      }
    }
  }

  return { operations };
}`,
  },
  {
    id: 'ex-m14-edge',
    moduleId: 'module-14',
    slug: 'edge-middleware-ab-test',
    title: 'Write an Edge Middleware A/B Test Router',
    type: 'code',
    difficulty: 'hard',
    xp: 50,
    prompt: 'Write a Cloudflare Worker `fetch` handler that inspects requests matching `/products/*`. Extract or assign a cookie `pdp_split` with 50/50 value `a` or `b`. If `b`, fetch origin URL with `?view=alt-b` query param. Set the persistence cookie on response.',
    starterCode: `export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    // Complete the edge split router
    
  }
};`,
    solution: `export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/products/')) {
      const cookieHeader = request.headers.get('Cookie') || '';
      let variant = cookieHeader.match(/pdp_split=([^;]+)/)?.[1];

      if (!variant) {
        variant = Math.random() < 0.5 ? 'a' : 'b';
      }

      let fetchUrl = url.toString();
      if (variant === 'b') {
        url.searchParams.set('view', 'alt-b');
        fetchUrl = url.toString();
      }

      const response = await fetch(fetchUrl, request);
      const newHeaders = new Headers(response.headers);
      newHeaders.append('Set-Cookie', \`pdp_split=\${variant}; Path=/; Max-Age=2592000; SameSite=Lax\`);

      return new Response(response.body, { ...response, headers: newHeaders });
    }

    return fetch(request);
  }
};`,
  },

  // Module 15: Capstone
  {
    id: 'ex-m15-build',
    moduleId: 'module-15',
    slug: 'capstone-deliverables-submission',
    title: 'Capstone Theme Build: 10-Deliverable Submission',
    type: 'build',
    difficulty: 'hard',
    xp: 100,
    prompt: 'Track and verify completion of all 10 Capstone Deliverables in your theme repository.',
    buildChecklist: [
      'Deliverable 1: Full Web Pixel telemetry pipeline subscribed to 8 ecommerce events',
      'Deliverable 2: GA4 and dataLayer events verified in Tag Assistant / DebugView',
      'Deliverable 3: Lighthouse CI budget enforced in GitHub Actions (Mobile LCP < 2.5s)',
      'Deliverable 4: Flicker-free A/B testing framework (client-side CSS class or edge worker)',
      'Deliverable 5: Redesigned high-converting PDP with responsive high-priority hero and swatches',
      'Deliverable 6: Ajax Cart Drawer with dynamic free shipping progress bar and 1-click upsell',
      'Deliverable 7: Checkout UI Extension or cart-level pre-checkout optimization deployed',
      'Deliverable 8: Post-purchase survey and zero-party attribution collection deployed',
      'Deliverable 9: Complete live A/B test executed with documented statistical significance',
      'Deliverable 10: 6-part written portfolio case study generated and exported',
    ],
  },
  {
    id: 'ex-m15-audit',
    moduleId: 'module-15',
    slug: 'capstone-pre-launch-qa-audit',
    title: 'Capstone Theme Production Pre-Launch QA Audit',
    type: 'audit',
    difficulty: 'medium',
    xp: 35,
    prompt: 'Conduct a pre-launch production QA audit of the completed capstone theme. Verify 5 mission-critical quality gates: 1) Zero-flicker test execution, 2) Complete GA4 telemetry firing, 3) Mobile LCP under 2.5s, 4) Cart Drawer drawer error handling, and 5) WCAG 2.2 color contrast.',
    rubric: [
      { criterion: 'Verified anti-flicker CSS/JS eliminates FOOC on variant load', points: 4, description: 'Visual stability' },
      { criterion: 'Audited all 8 ecommerce events in GA4 DebugView', points: 4, description: 'Telemetry accuracy' },
      { criterion: 'Confirmed mobile LCP is < 2.5s on simulated Slow 4G', points: 4, description: 'Speed standard' },
      { criterion: 'Tested out-of-stock and maximum quantity cart drawer states', points: 4, description: 'Edge case resilience' },
      { criterion: 'Validated 4.5:1 text contrast and 48px touch targets', points: 4, description: 'Accessibility & ergonomics' },
    ],
  },

  // Module 16: Portfolio & Interview Prep
  {
    id: 'ex-m16-writeup',
    moduleId: 'module-16',
    slug: 'portfolio-case-study-submission',
    title: 'Final Portfolio Case Study Narrative',
    type: 'writeup',
    difficulty: 'hard',
    xp: 50,
    prompt: 'Write your final portfolio case study narrative covering Context, Research, Hypothesis, Implementation, Statistical Results, and Annualized Commercial Impact.',
    minWordCount: 300,
    starterWriteup: `Case Study Title: Scaling Revenue Per Session on Shopify via High-Velocity CRO Architecture

1. Executive Summary & Context:
[Introduce the store, niche, baseline traffic, and core commercial objective]

2. Friction Research & Diagnostic Findings:
[Detail the qualitative and quantitative insights that uncovered the leak]

3. Scientific Hypothesis:
BECAUSE [data], WE BELIEVE [change] FOR [audience] WILL RESULT IN [outcome] AS MEASURED BY [primary metric] AND [guardrail].

4. Technical Engineering & Architecture:
[Explain how you built the solution in Liquid/JS without compromising Core Web Vitals]

5. Experiment Results & Statistical Significance:
- Sample Size: 
- Test Duration: 
- Control CVR vs Variant CVR: 
- Relative Lift: 
- P-Value: 
- Confidence Level: 

6. Business Impact & Institutional Learnings:
- Annualized Revenue Impact: 
- Key Takeaways:`,
  },
  {
    id: 'ex-m16-mcq',
    moduleId: 'module-16',
    slug: 'senior-cro-interview-statistical-dilemma',
    title: 'Senior CRO Agency Technical Interview: The Client Statistical Dilemma',
    type: 'multiple-choice',
    difficulty: 'medium',
    xp: 25,
    prompt: 'During an agency client call, an ecommerce founder says: "Our test has run for 5 days. Variant B is up +28% with a p-value of 0.03. We want to stop the test now and roll it out storewide to maximize sales before the weekend." How should a Senior CRO Specialist respond?',
    options: [
      'Agree immediately, because p < 0.05 guarantees a statistically significant winner.',
      'Recommend increasing ad spend by 500% to push traffic through the winning variant immediately.',
      'Politely advise against early stopping, explaining that early peeking produces false positive rates up to 30% and fails to capture full day-of-week cyclical shopping patterns; the test must run to the planned sample size.',
      'Tell the client to pause the control variant and allocate 100% of traffic to Variant B while continuing to observe data.',
    ],
    correctIndex: 2,
    explanation: 'A professional conversion engineer protects the brand from deceptive regression to the mean and alpha-spending inflation. Early stopping is one of the most common causes of phantom A/B test wins.',
  },

  // =========================================================================
  // Module 17: Mobile UX & Responsive CRO
  // =========================================================================
  {
    id: 'ex-m17-liquid',
    moduleId: 'module-17',
    slug: 'build-mobile-sticky-atc-bottom-bar',
    title: 'Build a Mobile Sticky Add-to-Cart Bar with Variant Details',
    type: 'liquid',
    difficulty: 'medium',
    xp: 35,
    prompt: 'Write a responsive Liquid snippet for a mobile sticky ATC bar. Include product title, formatted variant price, and a button that handles available vs sold_out states and has a data-variant-id attribute.',
    starterCode: `{% comment %} snippets/sticky-mobile-atc.liquid {% endcomment %}
<div class="sticky-mobile-bar" id="StickyMobileBar">
  <!-- Render product info, price, and dynamic Add to Cart button -->
</div>`,
    solution: `<div class="sticky-mobile-bar" id="StickyMobileBar">
  <div class="sticky-mobile-bar__inner">
    <div class="sticky-mobile-bar__meta">
      <span class="sticky-mobile-bar__title">{{ product.title | truncate: 25 }}</span>
      <span class="sticky-mobile-bar__price">{{ product.selected_or_first_available_variant.price | money }}</span>
    </div>
    <button
      type="button"
      class="btn btn-primary btn-mobile-atc"
      data-variant-id="{{ product.selected_or_first_available_variant.id }}"
      {% unless product.selected_or_first_available_variant.available %}disabled{% endunless %}
    >
      {% if product.selected_or_first_available_variant.available %}
        {{ 'products.product.add_to_cart' | t }}
      {% else %}
        {{ 'products.product.sold_out' | t }}
      {% endif %}
    </button>
  </div>
</div>`,
    explanation: 'Sticky bottom bars on mobile keep purchase intent instantly actionable at any scroll depth, preventing 6+ screen heights of backwards scrolling on long PDPs.',
  },
  {
    id: 'ex-m17-mcq',
    moduleId: 'module-17',
    slug: 'mobile-touch-target-thumb-zone-ergonomics',
    title: 'Mobile Touch Target & Thumb Zone Ergonomics Analysis',
    type: 'multiple-choice',
    difficulty: 'easy',
    xp: 20,
    prompt: 'According to Steven Hoober’s mobile touch research and WCAG 2.2 accessibility standards, which combination of screen placement and minimum touch target size creates the lowest physical friction on mobile devices?',
    options: [
      'Top 20% header placement with 24x24px button bounds.',
      'Bottom 35% natural thumb sweep zone with minimum 48x48px touch targets.',
      'Right vertical gutter with 32x32px targets.',
      'Center viewport only with 100vh modal overlays.',
    ],
    correctIndex: 1,
    explanation: 'Over 85% of mobile phone handling relies on one-handed thumb interaction. The bottom 35% is the effortless natural sweep zone, and 48x48px eliminates mis-taps and touch fatigue.',
  },
  {
    id: 'ex-m17-audit',
    moduleId: 'module-17',
    slug: 'mobile-checkout-navigation-friction-audit',
    title: 'Audit Mobile Navigation, Viewport & Checkout Traps',
    type: 'audit',
    difficulty: 'medium',
    xp: 35,
    prompt: 'Review a simulated mobile recording of a Shopify Plus store. Audit 4 critical mobile ergonomic and viewport defects (e.g. 100vh height clipping Safari navigation, inputs missing inputmode, font-size below 16px causing auto-zoom, non-sticky CTA on 8-screen PDP).',
    rubric: [
      { criterion: 'Flagged 100vh vs 100dvh mobile viewport cut-off in drawer', points: 4, description: 'Fixes Safari bottom toolbar clipping' },
      { criterion: 'Flagged form inputs with font-size < 16px causing iOS zoom', points: 4, description: 'Eliminates layout distortion' },
      { criterion: 'Flagged telephone and zip inputs lacking inputmode="tel" / "numeric"', points: 4, description: 'Ensures correct mobile keyboard layout' },
      { criterion: 'Identified missing sticky bottom CTA on long scrollable mobile PDP', points: 4, description: 'Reduces scroll effort' },
    ],
  },

  // =========================================================================
  // Module 18: Conversion Copywriting & Value Propositions
  // =========================================================================
  {
    id: 'ex-m18-writeup',
    moduleId: 'module-18',
    slug: 'craft-anti-anxiety-risk-reversal-module',
    title: 'Craft an Anti-Anxiety Risk-Reversal Module for High-End PDP',
    type: 'writeup',
    difficulty: 'medium',
    xp: 35,
    prompt: 'Write an anti-anxiety guarantee module for an $850 direct-to-consumer luxury espresso machine. Address financial risk (30-day in-home trial), operational risk (pre-paid returns, 2-year warranty), and customer effort risk in 200+ compelling words.',
    minWordCount: 180,
    starterWriteup: `Product: Artisan Espresso Master ($850)
Target Audience: Discerning home coffee enthusiasts seeking cafe-quality espresso

1. Bold 30-Day Risk-Free In-Home Trial:
[Describe the trial terms in human, reassuring language]

2. Zero-Hassle Pre-Paid Return Policy:
[Explain how effortless it is if they decide not to keep it]

3. 2-Year Comprehensive Warranty & White-Glove Support:
[Detail protection against mechanical or electronic defects]

4. Supporting Reassurance Microcopy directly beneath Add to Cart button:
[3 punchy microcopy bullet points]`,
  },
  {
    id: 'ex-m18-mcq',
    moduleId: 'module-18',
    slug: 'diagnosing-conversion-copy-clarity-vs-cleverness',
    title: 'Diagnosing Conversion Copy Clarity vs Cleverness',
    type: 'multiple-choice',
    difficulty: 'easy',
    xp: 20,
    prompt: 'Which of the following headlines best exemplifies conversion-focused clarity for a direct-to-consumer brand selling ergonomic office chairs?',
    options: [
      'Defy Gravity. Elevate Your Posture into Pure Zen.',
      'Ergonomic Lumbar Chairs Engineered to Eliminate Lower Back Pain in 30 Days — Or 100% Refund.',
      'Sit Smarter. Dream Bigger. Crafted for the Modern Mind.',
      'Where Innovation Embraces Everyday Seating.',
    ],
    correctIndex: 1,
    explanation: 'The 5-second test proves that clear value propositions stating the concrete product, specific customer outcome (eliminating back pain), and risk reversal outperform abstract poetic taglines every time.',
  },
  {
    id: 'ex-m18-fill',
    moduleId: 'module-18',
    slug: 'core-elements-of-value-proposition',
    title: 'Fill-in-the-Blank: Core Pillars of a Unique Value Proposition',
    type: 'fill-blank',
    difficulty: 'easy',
    xp: 20,
    prompt: 'Fill in the three foundational pillars of a high-converting unique value proposition (UVP).',
    blanks: [
      { id: 'b1', label: 'Pillar 1', answer: 'benefit', hint: 'The tangible customer outcome or transformation' },
      { id: 'b2', label: 'Pillar 2', answer: 'audience', hint: 'The specific customer persona or segment targeted' },
      { id: 'b3', label: 'Pillar 3', answer: 'differentiator', hint: 'The unique mechanism or reason why you are better than alternatives' },
    ],
    explanation: 'A world-class UVP formula unites: Specific Benefit + Target Audience + Unique Differentiator/Mechanism.',
  },

  // =========================================================================
  // Module 19: B2B, Wholesale & High-Ticket CRO
  // =========================================================================
  {
    id: 'ex-m19-math',
    moduleId: 'module-19',
    slug: 'calculate-b2b-volume-pricing-elasticity',
    title: 'Calculate Price Elasticity & Margin for B2B Tiered Volume Pricing',
    type: 'math',
    difficulty: 'hard',
    xp: 40,
    prompt: 'A B2B store sells industrial air filters at $100 per unit with a 60% gross margin ($60 gross profit, $40 COGS). They introduce a volume discount tier: Buy 10+ units at a 15% discount ($85/unit, $45 gross profit per unit). If a customer who previously bought 4 units ($240 gross profit) increases their order to 10 units, compute: 1) New order gross profit ($), and 2) Total incremental gross profit gained on this order ($).',
    targetValues: {
      newGrossProfit: 450, // 10 * $45 = $450
      profitIncrease: 210, // $450 - $240 = $210
    },
    tolerance: 0.05,
    explanation: 'At 10 units with $45 profit/unit, gross profit = $450. Compared to the baseline 4 units ($240 gross profit), the merchant gains $210 in incremental gross profit despite the 15% discount.',
  },
  {
    id: 'ex-m19-liquid',
    moduleId: 'module-19',
    slug: 'code-tiered-volume-discount-pricing-table',
    title: 'Code a Dynamic Tiered Volume Discount Pricing Table in Liquid',
    type: 'liquid',
    difficulty: 'medium',
    xp: 35,
    prompt: 'Write a Liquid snippet for a volume discount table showing 3 tiers: 1-4 units (regular price), 5-19 units (10% off), and 20+ units (20% off). Render data-min-qty attributes and format prices using product.price and the money filter.',
    starterCode: `{% comment %} snippets/volume-pricing-table.liquid {% endcomment %}
<div class="volume-pricing-table">
  <!-- Render tier headers and 3 quantity tier rows with savings badges -->
</div>`,
    solution: `<div class="volume-pricing-table">
  <div class="volume-tier" data-min-qty="1">
    <span class="volume-tier__qty">1–4 units</span>
    <span class="volume-tier__price">{{ product.price | money }} / ea</span>
    <span class="badge badge-gray">Standard</span>
  </div>
  <div class="volume-tier" data-min-qty="5">
    <span class="volume-tier__qty">5–19 units</span>
    <span class="volume-tier__price">{{ product.price | times: 0.90 | money }} / ea</span>
    <span class="badge badge-success">Save 10%</span>
  </div>
  <div class="volume-tier" data-min-qty="20">
    <span class="volume-tier__qty">20+ units</span>
    <span class="volume-tier__price">{{ product.price | times: 0.80 | money }} / ea</span>
    <span class="badge badge-indigo">Save 20%</span>
  </div>
</div>`,
    explanation: 'Clear volume pricing tables provide immediate commercial incentives for bulk buyers, converting standard orders into wholesale volume baskets.',
  },
  {
    id: 'ex-m19-audit',
    moduleId: 'module-19',
    slug: 'audit-high-ticket-machinery-equipment-store',
    title: 'Audit a High-Ticket B2B Machinery & Equipment Store',
    type: 'audit',
    difficulty: 'medium',
    xp: 35,
    prompt: 'Audit a $4,500 commercial restaurant pizza oven PDP. Identify 3 friction points preventing commercial kitchen managers from completing procurement (e.g. missing dimensional CAD drawings/spec sheets, lack of RFQ option, absent freight delivery disclosures).',
    rubric: [
      { criterion: 'Flagged missing downloadable technical spec sheet & electrical schematics', points: 5, description: 'Evaluation criteria' },
      { criterion: 'Flagged absence of Request for Quote (RFQ) / Purchase Order workflow', points: 5, description: 'Procurement compatibility' },
      { criterion: 'Flagged unaddressed freight curbside delivery and lift-gate requirements', points: 5, description: 'Operational reassurance' },
    ],
  },

  // =========================================================================
  // Module 20: International CRO & Multi-Currency
  // =========================================================================
  {
    id: 'ex-m20-code',
    moduleId: 'module-20',
    slug: 'edge-geolocation-currency-auto-negotiation',
    title: 'Write an Edge Geolocation Currency Auto-Negotiation Middleware',
    type: 'code',
    difficulty: 'hard',
    xp: 40,
    prompt: 'Write a Cloudflare Worker or Edge middleware function that inspects `request.cf.country`. If country is "GB", target currency is "GBP"; if "DE" or "FR", target currency is "EUR"; if "JP", target currency is "JPY"; otherwise "USD". If a cookie `market_override` exists, respect user selection and do nothing. Return an object with target currency and market path.',
    starterCode: `export default {
  async fetch(request) {
    // 1. Check for 'market_override' cookie
    // 2. Inspect request.cf.country
    // 3. Resolve targetCurrency and marketPath
  }
};`,
    solution: `export default {
  async fetch(request) {
    const cookieHeader = request.headers.get('Cookie') || '';
    if (cookieHeader.includes('market_override=')) {
      return fetch(request); // User manually chose market; do not override
    }

    const country = request.cf?.country || 'US';
    let targetCurrency = 'USD';
    let marketPath = '';

    if (country === 'GB') {
      targetCurrency = 'GBP';
      marketPath = '/en-gb';
    } else if (['DE', 'FR', 'IT', 'ES', 'NL'].includes(country)) {
      targetCurrency = 'EUR';
      marketPath = '/eu';
    } else if (country === 'JP') {
      targetCurrency = 'JPY';
      marketPath = '/ja-jp';
    }

    return { country, targetCurrency, marketPath };
  }
};`,
    explanation: 'Edge-based market negotiation evaluates currency and regional paths before HTML leaves the server, eliminating client-side redirect flicker.',
  },
  {
    id: 'ex-m20-mcq',
    moduleId: 'module-20',
    slug: 'international-payment-methods-optimization',
    title: 'International Payment Method Optimization for EU & LATAM',
    type: 'multiple-choice',
    difficulty: 'easy',
    xp: 20,
    prompt: 'Which local payment method represents over 65% of all ecommerce transactions in the Netherlands and is mandatory for European conversion success?',
    options: [
      'American Express Express Pay',
      'iDEAL (Direct Inter-Bank Transfer)',
      'Discover Card Mobile',
      'Venmo International',
    ],
    correctIndex: 1,
    explanation: 'In the Netherlands, credit card penetration for online shopping is under 25%. iDEAL is the national direct bank transfer standard; stores without iDEAL cannot convert Dutch traffic.',
  },
  {
    id: 'ex-m20-audit',
    moduleId: 'module-20',
    slug: 'cross-border-duties-shipping-transparency-audit',
    title: 'Cross-Border Duties, VAT & Shipping Transparency Audit',
    type: 'audit',
    difficulty: 'medium',
    xp: 35,
    prompt: 'Audit an international cross-border Shopify store shipping from the US to Germany and the UK. Flag 3 critical friction leaks: unrounded dynamic currencies, DDU unexpected doorstep customs, and missing VAT-inclusive notices.',
    rubric: [
      { criterion: 'Flagged unrounded conversion prices (e.g. €71.43 vs €70.00)', points: 5, description: 'Pricing trust psychology' },
      { criterion: 'Flagged Delivered Duty Unpaid (DDU) surprise doorstep customs liability', points: 5, description: 'Post-purchase chargeback risk' },
      { criterion: 'Flagged failure to display "VAT included" on European PDPs', points: 5, description: 'Legal and cultural compliance' },
    ],
  },

  // =========================================================================
  // Module 21: Behavioral Economics & Cognitive Biases
  // =========================================================================
  {
    id: 'ex-m21-mcq',
    moduleId: 'module-21',
    slug: 'identifying-cognitive-biases-in-funnels',
    title: 'Identifying Cognitive Biases: Dan Ariely Decoy Experiment',
    type: 'multiple-choice',
    difficulty: 'easy',
    xp: 20,
    prompt: 'In Dan Ariely’s classic Economist subscription experiment, introducing an inferior "Print Only" option ($125) alongside "Digital Only" ($59) and "Print + Digital Bundle" ($125) caused bundle selection to jump from 32% to 84%. Which behavioral bias explains this?',
    options: [
      'The Asymmetric Dominance Effect (Decoy Effect) & Relative Anchoring',
      'The Pygmalion Effect',
      'Confirmation Bias',
      'The Sunk Cost Fallacy',
    ],
    correctIndex: 0,
    explanation: 'The Decoy Effect (Asymmetric Dominance) occurs when introducing an inferior option (Print alone for $125) makes the target option (Print + Digital for $125) feel like an extraordinary no-brainer bargain.',
  },
  {
    id: 'ex-m21-writeup',
    moduleId: 'module-21',
    slug: 'design-3-tier-decoy-pricing-matrix',
    title: 'Design a 3-Tier Decoy Pricing Matrix for a Subscription Brand',
    type: 'writeup',
    difficulty: 'medium',
    xp: 35,
    prompt: 'Design a 3-tier pricing structure for a daily greens nutritional supplement brand. Specify Tier 1 (Starter 1-Bag), Tier 2 (Decoy or Standard 2-Bag), and Tier 3 (The Anchor/Best Value 90-Day Trio). Explain the behavioral psychology justifying each tier in 200+ words.',
    minWordCount: 180,
    starterWriteup: `Brand: Daily Greens Bio-Elixir
Core Goal: Maximize 90-Day Bundle selection and Revenue Per Session (RPS)

Tier 1: Starter Pack
- Price & Quantity: 
- Positioning: 

Tier 2: The Decoy / Standard Pack
- Price & Quantity: 
- Behavioral Function (Why does this make Tier 3 irresistible?): 

Tier 3: The Anchor / VIP Trio (Target Offer)
- Price & Quantity: 
- Savings Strikethrough & Free Bonus Gift: 
- Behavioral Mechanism (Endowment, Loss Aversion, Unit Cost Anchor):`,
  },
  {
    id: 'ex-m21-fill',
    moduleId: 'module-21',
    slug: 'behavioral-heuristics-taxonomy-fill',
    title: 'Fill-in-the-Blank: Core Behavioral Economics Heuristics',
    type: 'fill-blank',
    difficulty: 'easy',
    xp: 20,
    prompt: 'Fill in the behavioral economics concepts matching each description.',
    blanks: [
      { id: 'b1', label: 'Heuristic 1', answer: 'anchoring', hint: 'Evaluating prices relative to the first figure presented' },
      { id: 'b2', label: 'Heuristic 2', answer: 'loss aversion', hint: 'The pain of losing is twice as potent as the joy of gaining' },
      { id: 'b3', label: 'Heuristic 3', answer: 'hicks law', hint: 'Decision time increases logarithmically with the number of choices' },
    ],
    explanation: 'Anchoring sets the frame of reference, loss aversion motivates loss prevention, and Hick’s Law dictates the need for curated catalog choices.',
  },

  // =========================================================================
  // Module 22: Search, Navigation & Site Discovery
  // =========================================================================
  {
    id: 'ex-m22-liquid',
    moduleId: 'module-22',
    slug: 'zero-results-search-recovery-section',
    title: 'Zero-Results Search Recovery Section in Liquid',
    type: 'liquid',
    difficulty: 'medium',
    xp: 35,
    prompt: 'Write a Liquid recovery template for search results when search.results_count == 0. Display an empathetic headline containing search.terms, a did-you-mean suggestion block, and loop through the first 4 products of collections["trending-now"].',
    starterCode: `{% comment %} templates/search.json / snippets/search-empty.liquid {% endcomment %}
{% if search.results_count == 0 %}
  <!-- Render zero-results recovery UI with trending products -->
{% endif %}`,
    solution: `{% if search.results_count == 0 %}
  <div class="search-empty text-center">
    <h2>We couldn't find an exact match for "{{ search.terms }}"</h2>
    <p class="text-muted">Check your spelling or explore our most-loved formulas below:</p>
    <div class="search-empty__recommendations">
      <div class="product-grid">
        {% for product in collections['trending-now'].products limit: 4 %}
          <div class="product-card">
            <a href="{{ product.url }}">
              <img src="{{ product.featured_image | image_url: width: 400 }}" alt="{{ product.title | escape }}" loading="lazy">
              <h4>{{ product.title }}</h4>
              <span>{{ product.price | money }}</span>
            </a>
          </div>
        {% endfor %}
      </div>
    </div>
  </div>
{% endif %}`,
    explanation: 'Blank zero-results pages have an 80%+ bounce rate. Merchandising trending bestsellers keeps the user engaged in the conversion funnel.',
  },
  {
    id: 'ex-m22-code',
    moduleId: 'module-22',
    slug: 'debounced-predictive-search-client',
    title: 'Implement a Debounced Predictive Search Bar with AbortController',
    type: 'code',
    difficulty: 'hard',
    xp: 40,
    prompt: 'Write a client-side JavaScript class `PredictiveSearchClient` that binds to an input element, debounces fetch calls by 250ms, aborts in-flight requests using `AbortController`, and fetches from `/search/suggest.json?q={query}&resources[type]=product`.',
    starterCode: `class PredictiveSearchClient {
  constructor(inputSelector, resultsSelector) {
    this.input = document.querySelector(inputSelector);
    this.results = document.querySelector(resultsSelector);
    this.abortController = null;
    this.debounceTimer = null;
    this.init();
  }

  init() {
    // Attach debounced input listener
  }

  async fetchSearch(query) {
    // Implement AbortController and fetch /search/suggest.json
  }
}`,
    solution: `class PredictiveSearchClient {
  constructor(inputSelector, resultsSelector) {
    this.input = document.querySelector(inputSelector);
    this.results = document.querySelector(resultsSelector);
    this.abortController = null;
    this.debounceTimer = null;
    this.init();
  }

  init() {
    this.input.addEventListener('input', () => {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        const query = this.input.value.trim();
        if (query.length >= 2) this.fetchSearch(query);
      }, 250);
    });
  }

  async fetchSearch(query) {
    if (this.abortController) this.abortController.abort();
    this.abortController = new AbortController();

    try {
      const url = \`/search/suggest.json?q=\${encodeURIComponent(query)}&resources[type]=product\`;
      const res = await fetch(url, { signal: this.abortController.signal });
      const data = await res.json();
      this.renderResults(data.resources?.results?.products || []);
    } catch (err) {
      if (err.name !== 'AbortError') console.error('Search failed', err);
    }
  }

  renderResults(products) {
    this.results.innerHTML = products.map(p => \`<a href="\${p.url}">\${p.title}</a>\`).join('');
  }
}`,
    explanation: 'Debouncing prevents flooding the server with requests on every keystroke, and AbortController eliminates race conditions when network responses arrive out of order.',
  },
  {
    id: 'ex-m22-build',
    moduleId: 'module-22',
    slug: 'build-interactive-faceted-filter-drawer',
    title: 'Build an Interactive Faceted Filter Drawer for Mobile Collection Pages',
    type: 'build',
    difficulty: 'hard',
    xp: 50,
    prompt: 'Verify implementation of an accessible mobile filter drawer using Shopify storefront filtering and Section Rendering API.',
    buildChecklist: [
      'Mobile filter toggle button opens slide-out drawer with 100dvh viewport height',
      'Filter form submissions update product grid asynchronously via Section Rendering API (?section_id=collection-grid)',
      'URL query string updated using history.pushState so filtered views are bookmarkable and shareable',
      'Active filter pills with 1-click removal rendered above product grid',
      'Matching product count displayed on drawer apply CTA (e.g. "Show 24 Products")',
    ],
  },

  // =========================================================================
  // Module 23: CRO Tooling, CI/CD & Automated QA
  // =========================================================================
  {
    id: 'ex-m23-code',
    moduleId: 'module-23',
    slug: 'playwright-ab-variant-regression-spec',
    title: 'Write an End-to-End Playwright Spec to Verify A/B Variant Assignment',
    type: 'code',
    difficulty: 'hard',
    xp: 45,
    prompt: 'Write a Playwright test spec that forces an A/B test cookie `ab_exp_hero=treatment`, visits the homepage, verifies the hero headline contains "Free Shipping Over $50", and checks that an event with `event: "experiment_impression"` was pushed to `window.dataLayer`.',
    starterCode: `import { test, expect } from '@playwright/test';

test('A/B Treatment Assignment Verification', async ({ page, context }) => {
  // 1. Add experiment cookie
  // 2. Navigate to '/'
  // 3. Assert headline text
  // 4. Assert dataLayer impression
});`,
    solution: `import { test, expect } from '@playwright/test';

test('A/B Treatment Assignment Verification', async ({ page, context }) => {
  await context.addCookies([
    { name: 'ab_exp_hero', value: 'treatment', domain: 'localhost', path: '/' }
  ]);

  await page.goto('/');

  const heroHeadline = page.locator('#HeroHeadline');
  await expect(heroHeadline).toContainText('Free Shipping Over $50');

  const dataLayerEvent = await page.evaluate(() => {
    return (window as any).dataLayer?.find((e: any) => e.event === 'experiment_impression');
  });

  expect(dataLayerEvent).toBeDefined();
  expect(dataLayerEvent.variant).toBe('treatment');
});`,
    explanation: 'Automating A/B variant QA in CI prevents deploying broken variations that cause silent conversion collapses in production.',
  },
  {
    id: 'ex-m23-fill',
    moduleId: 'module-23',
    slug: 'server-side-tagging-pipeline-architecture',
    title: 'Fill-in-the-Blank: Server-Side Tagging & Event Pipeline Architecture',
    type: 'fill-blank',
    difficulty: 'medium',
    xp: 25,
    prompt: 'Fill in the core architectural components of a first-party server-side tracking pipeline.',
    blanks: [
      { id: 'b1', label: 'Domain Type', answer: 'first party', hint: 'The DNS record configuration (e.g. data.yourstore.com)' },
      { id: 'b2', label: 'Deduplication Token', answer: 'event_id', hint: 'Unique hash passed to both browser pixel and server API' },
      { id: 'b3', label: 'Meta API', answer: 'conversions api', hint: 'Direct server-to-server endpoint for Facebook advertising attribution (CAPI)' },
    ],
    explanation: 'First-party subdomains bypass ad-blockers and Safari ITP, while event_id tokens prevent double-counting between browser and server pipelines.',
  },
  {
    id: 'ex-m23-build',
    moduleId: 'module-23',
    slug: 'automated-ci-performance-gatekeeper',
    title: 'Set up an Automated CI Performance Gatekeeper in GitHub Actions',
    type: 'build',
    difficulty: 'hard',
    xp: 50,
    prompt: 'Implement and verify a continuous integration workflow enforcing performance budgets on every pull request.',
    buildChecklist: [
      'GitHub Actions workflow file created (.github/workflows/lighthouse-ci.yml)',
      'Lighthouse CI action configured to test mobile PDP and Collection templates',
      'Hard budget assertion: Mobile LCP score strictly < 2.5 seconds',
      'Hard budget assertion: Cumulative Layout Shift (CLS) strictly < 0.05',
      'PR merge blocked automatically if performance regressions exceed threshold',
    ],
  },

  // =========================================================================
  // Module 24: Master CRO Certification & Final Audits
  // =========================================================================
  {
    id: 'ex-m24-audit',
    moduleId: 'module-24',
    slug: 'full-spectrum-client-store-friction-audit',
    title: 'Full-Spectrum Real-World Client Store Friction Audit (360° Teardown)',
    type: 'audit',
    difficulty: 'hard',
    xp: 50,
    prompt: 'Conduct an exhaustive 360-degree heuristic and technical audit across a live or mock Shopify store. Evaluate 5 distinct funnel layers: 1) Value Proposition Clarity, 2) Mobile Thumb-Zone Ergonomics, 3) Cart Drawer Cross-Sell Economics, 4) Checkout Microcopy & Trust, and 5) Core Web Vitals Stability.',
    rubric: [
      { criterion: 'Homepage UVP: Identified clarity flaw vs 5-second test heuristic', points: 10, description: 'Cognitive ease & positioning' },
      { criterion: 'PDP Mobile Ergonomics: Flagged sticky CTA absence or button positioning flaws', points: 10, description: 'Physical thumb zone reach' },
      { criterion: 'Cart Economics: Audited free shipping threshold progress bar & upsell relevance', points: 10, description: 'AOV expansion' },
      { criterion: 'Checkout Trust: Diagnosed payment transparency, security microcopy, and risk reversal', points: 10, description: 'Anxiety mitigation' },
      { criterion: 'Performance: Profiled real LCP / CLS metrics and identified top 2 script bloat sources', points: 10, description: 'Technical speed discipline' },
    ],
  },
  {
    id: 'ex-m24-writeup',
    moduleId: 'module-24',
    slug: 'executive-ab-post-mortem-pivot-plan',
    title: 'Comprehensive Executive A/B Experimentation Post-Mortem & 90-Day Pivot Plan',
    type: 'writeup',
    difficulty: 'hard',
    xp: 50,
    prompt: 'An A/B test on a store’s PDP sticky buy bar concluded with a flat result (p = 0.42, +1.2% lift, not statistically significant). Write a forensic post-mortem for the store founder analyzing why the test was flat, auditing device/segment breakdowns, and establishing a 90-day iteration roadmap.',
    minWordCount: 280,
    starterWriteup: `Executive Post-Mortem: Experiment #104 — Sticky Mobile Buy Bar
Client Store: Lumina Home & Lighting ($14M Annual GMV)
Lead CRO Engineer: [Your Name]

1. Experiment Summary & Headline Metric:
- Test Duration: 21 days (3 full 7-day business cycles)
- Total Visitors: 84,200 (42,100 Control, 42,100 Variant B)
- Control CVR: 2.34% vs Variant B CVR: 2.37% (Relative Lift: +1.28%, p-value = 0.42 — Inconclusive / Flat)

2. Forensic Diagnostic Breakdown (Why was the overall result flat?):
- Mobile vs Desktop Segmentation: [Analyze what happened when segmented by device]
- Interaction Heatmap Telemetry: [Did visitors actually tap the bar, or was it ignored?]

3. Sample Ratio Mismatch (SRM) & Technical Telemetry Audit:
- Chi-Square SRM verification result:

4. Key Insights & Institutional Learnings:
- What did we learn about customer purchasing behavior?

5. 90-Day Iterative Roadmap:
- Iteration V2 Hypothesis:
- Next High-Priority Funnel Test:`,
  },
  {
    id: 'ex-m24-math',
    moduleId: 'module-24',
    slug: 'multivariant-mde-power-revenue-projection',
    title: 'Multi-Variant MDE, Power Calculation & Revenue Projection for $20M GMV Brand',
    type: 'math',
    difficulty: 'hard',
    xp: 50,
    prompt: 'A $20,000,000/yr Shopify Plus brand has 5,000,000 annual sessions and 125,000 orders (Baseline CVR = 2.50%, AOV = $160, RPS = $4.00). An optimization test wins with an 8% relative lift in CVR (new CVR = 2.70%) while holding AOV steady at $160. Calculate: 1) New annual total orders, 2) New gross annual revenue ($), and 3) Total incremental annual revenue generated by this single optimization ($).',
    targetValues: {
      newOrders: 135000, // 5,000,000 * 0.0270 = 135,000
      newRevenue: 21600000, // 135,000 * $160 = $21,600,000
      incrementalRevenue: 1600000, // $21,600,000 - $20,000,000 = $1,600,000
    },
    tolerance: 0.05,
    explanation: 'New Orders = 5,000,000 * 0.0270 = 135,000 orders (+10,000 orders). New Gross Revenue = 135,000 * $160 = $21,600,000. Incremental Revenue = $21,600,000 - $20,000,000 = $1,600,000 added directly to top-line enterprise growth.',
  },
];

export const ALL_EXERCISES: Exercise[] = [...CRO_EXERCISES, ...SHOPIFY_DEV_EXERCISES];

export function getExerciseBySlug(slug: string): Exercise | undefined {
  return ALL_EXERCISES.find((ex) => ex.slug === slug);
}

export function getExercisesByModuleId(moduleId: string): Exercise[] {
  return ALL_EXERCISES.filter((ex) => ex.moduleId === moduleId);
}
