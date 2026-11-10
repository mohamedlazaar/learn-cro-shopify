export const PHASE_1_LESSONS = [
    // MODULE 1: CRO & Ecommerce Fundamentals
    {
        id: 'm1-l1',
        moduleId: 'module-1',
        slug: 'what-cro-actually-is',
        title: 'What CRO Actually Is (and Why CVR Alone Lies)',
        estimatedMinutes: 20,
        objectives: [
            'Define CRO as Revenue Per Session (RPS) maximization rather than naive conversion percentage chasing.',
            'Distinguish between macro conversions (orders) and micro conversions (ATC, checkout starts).',
            'Understand how discounts and low-ticket items artificially inflate CVR while destroying profitability.',
        ],
        videoSource: {
            title: 'Get an Instant CVR Increase by Adding this Survey Section [2026 Shopify CRO]',
            embedUrl: 'https://www.youtube-nocookie.com/embed/wipDLDOz1lc',
            channel: 'Emil Nygaard',
            duration: '19:35',
            description: 'Curated technical CRO masterclass from Emil Nygaard covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Get an Instant CVR Increase by Adding this Survey Section [2026 Shopify CRO]'],
        },
        sections: [
            {
                heading: 'The Fallacy of Conversion Rate Alone',
                body: `Most junior developers and store owners treat Conversion Rate (CVR = Orders / Sessions) as the holy grail. However, CVR is mathematically incomplete. If you slash all prices by 80% or introduce a $1 sticker, your CVR will skyrocket to 10%+, but gross profit and enterprise value will crater.

True Conversion Rate Optimization is the disciplined engineering of visitor revenue efficiency: maximizing Revenue Per Session (RPS) and Customer Lifetime Value (LTV) while respecting margins, contribution margin per order (CM), and brand positioning.

When evaluating any optimization, you must track three interconnected metrics:
1. Conversion Rate (CVR): The velocity of visitor commitment.
2. Average Order Value (AOV): The financial depth of each commitment.
3. Revenue Per Session (RPS): The net efficiency of your traffic acquisition investment.`,
                callout: {
                    type: 'tip',
                    text: 'RPS Formula: RPS = Total Revenue / Total Sessions = (CVR / 100) × AOV. If a test lifts CVR by 10% but drops AOV by 20%, net revenue fell by 12%.',
                },
            },
            {
                heading: 'Mathematical Proof: How High CVR Can Destroy Cash Flow',
                body: `Consider an apparel brand with 100,000 monthly sessions, selling a jacket with a $100 retail price and a $40 Cost of Goods Sold (COGS). Ad spend is fixed at $50,000/month.

Scenario A (Standard Pricing):
- CVR: 2.0% (2,000 orders)
- AOV: $100.00
- Gross Revenue: $200,000
- Product COGS ($40/unit): $80,000
- Ad Spend: $50,000
- Net Profit: $70,000 (RPS = $2.00)

Scenario B (25% Sitewide Discount to "Boost CVR"):
- CVR jumps to 3.0% (3,000 orders — a 50% relative lift!)
- AOV drops to $75.00
- Gross Revenue: $225,000
- Product COGS ($40/unit on 3,000 units): $120,000
- Ad Spend: $50,000
- Net Profit: $55,000 (Profit decreased by $15,000 despite a 50% CVR surge!)

The merchant shipped 1,000 extra parcels, absorbed 50% more customer support tickets and returns, and made $15,000 less profit. CRO developers must optimize for profit contribution, not vanity percentages.`,
                code: `// Profitability Comparison Engine: CVR vs Margin
function evaluatePromotionProfitability(params: {
  sessions: number;
  cvr: number;
  price: number;
  cogs: number;
  fixedCosts: number;
}) {
  const orders = params.sessions * (params.cvr / 100);
  const revenue = orders * params.price;
  const totalCogs = orders * params.cogs;
  const grossProfit = revenue - totalCogs;
  const netProfit = grossProfit - params.fixedCosts;
  const rps = revenue / params.sessions;

  return {
    orders: Math.round(orders),
    revenue: '$' + revenue.toLocaleString(),
    grossProfit: '$' + grossProfit.toLocaleString(),
    netProfit: '$' + netProfit.toLocaleString(),
    rps: '$' + rps.toFixed(2),
  };
}

// Baseline: 2% CVR at $100
console.log('Baseline:', evaluatePromotionProfitability({
  sessions: 100000, cvr: 2.0, price: 100, cogs: 40, fixedCosts: 50000
}));
// Output: { orders: 2000, revenue: '$200,000', netProfit: '$70,000', rps: '$2.00' }

// Discounted: 3% CVR at $75
console.log('Discounted:', evaluatePromotionProfitability({
  sessions: 100000, cvr: 3.0, price: 75, cogs: 40, fixedCosts: 50000
}));
// Output: { orders: 3000, revenue: '$225,000', netProfit: '$55,000', rps: '$2.25' }`,
                language: 'javascript',
            },
            {
                heading: 'Macro vs. Micro Conversions',
                body: `In an ecommerce funnel, visitors take a succession of micro-commitments before the macro-conversion (the final purchase transaction):
- Viewing a product detail page (engagement intent)
- Selecting a variant and clicking Add to Cart (purchase intent)
- Initiating checkout (transactional intent)
- Entering payment details and submitting order (completed transaction)

When optimizing, never optimize a micro-conversion in isolation if it cannibalizes downstream macro-conversion quality. For example, an aggressive "Add to Cart" pop-up may spike ATC by 30% while causing an equal spike in cart abandonment. Always monitor downstream drop-off rates before declaring a test victorious.`,
                code: `// Relationship between Funnel Micro and Macro Conversions
const sessions = 10000;
const productViews = 6200;    // 62% View Rate
const addToCarts = 850;       // 8.5% ATC Rate (Micro)
const checkoutStarts = 420;   // 4.2% Checkout Rate (Micro)
const completedOrders = 210;  // 2.1% Macro CVR

const grossRevenue = 18900;   // $18,900
const aov = grossRevenue / completedOrders; // $90.00
const rps = grossRevenue / sessions;        // $1.89 per visitor`,
                language: 'javascript',
            },
            {
                heading: 'The Shopify Developer Role in CRO',
                body: `As a Shopify theme and app engineer, your code directly controls the physics of the customer experience:
1. Render speed & visual stability: Eliminating render-blocking scripts, preventing layout shifts (CLS), and optimizing Largest Contentful Paint (LCP) in Liquid.
2. Cognitive clarity: Structuring clean layout hierarchy, clear typography contrast, and eliminating visual noise that triggers decision fatigue.
3. Friction reduction: Building one-tap accelerated wallets (Shop Pay), instant predictive search with debouncing, and dynamic variant availability selectors.
4. Trust & reassurance: Embedding trust badges, dynamic real-time shipping estimators, and clear return policies directly at the moment of hesitation.`,
                callout: {
                    type: 'shopify',
                    text: 'Shopify Plus developers wield the Section Rendering API and Shopify Functions (Wasm) to build instant, server-calculated checkout experiences that convert up to 36% higher than standard theme reloads.',
                },
            },
        ],
        mistakes: [
            'Celebrating a CVR increase caused by aggressive discounting that actually reduced net revenue.',
            'Treating micro-conversions (like click-through rate on a banner) as proof that an experiment succeeded.',
            'Ignoring mobile traffic — 75%+ of Shopify traffic is mobile, yet most devs test only on 27" desktop monitors.',
        ],
        checklist: [
            'I can calculate RPS from sessions and revenue.',
            'I can explain why an increase in CVR could coincide with a decrease in net profit.',
            'I understand the difference between micro and macro conversion metrics.',
        ],
        furtherReading: [
            { title: 'Shopify Core Metrics Documentation', url: 'https://help.shopify.com/en/manual/reports-and-analytics' },
            { title: 'Reforge: The Metric Hierarchy of Ecommerce', url: 'https://www.reforge.com' },
        ],
    },
    {
        id: 'm1-l2',
        moduleId: 'module-1',
        slug: 'the-ecommerce-funnel',
        title: 'The Ecommerce Funnel & Friction Points',
        estimatedMinutes: 25,
        objectives: [
            'Map the full 7-step Shopify ecommerce funnel from acquisition to purchase.',
            'Identify classic high-leakage drop-off points across device types.',
            'Learn how to calculate step-by-step funnel drop-off percentages.',
        ],
        videoSource: {
            title: 'How To Increase Conversion Rate On Shopify (2025 CRO Guide)',
            embedUrl: 'https://www.youtube-nocookie.com/embed/kLneJKAqRtk',
            channel: 'Michael Bernstein',
            duration: '10:34',
            description: 'Curated technical CRO masterclass from Michael Bernstein covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['How To Increase Conversion Rate On Shopify (2025 CRO Guide)'],
        },
        sections: [
            {
                heading: 'The 7-Step Shopify Funnel Architecture',
                body: `The modern Shopify ecommerce journey is not a monolithic page view; it is a 7-step sequence of micro-commitments:
1. Acquisition / Landing (Homepage, Collection Grid, or direct ad traffic to PDP)
2. Discovery & Selection (Faceted collection filtering, predictive search, PDP variant exploration)
3. Intent Confirmation (Cart drawer, modal, or cart page review)
4. Customer Identification (Contact email/phone and shipping address input)
5. Shipping Method Selection (Standard, express, or local pickup tiers)
6. Payment & Order Review (Shop Pay, credit card, Klarna/Afterpay, PayPal)
7. Thank You & Order Confirmation (Receipt, account creation, and post-purchase upsells)

In conversion architecture, a leak at the top cascades exponentially down the entire pipeline. A 10% improvement in Collection-to-PDP navigation efficiency compounds across all subsequent checkout steps.`,
                callout: {
                    type: 'tip',
                    text: 'Over 65% of paid Meta and Google traffic lands directly on the Product Detail Page (PDP), bypassing the homepage entirely. Optimizing PDP-to-Cart velocity yields 4x higher revenue impact than homepage hero banners.',
                },
            },
            {
                heading: 'Device-Specific Leakage: Mobile vs. Desktop Friction Points',
                body: `Drop-off behavior differs drastically depending on viewport and input constraints:
• Desktop Friction: Cognitive hesitation, price comparison in adjacent browser tabs, and lack of visual urgency. Desktop users have high patience but high skepticism.
• Mobile Friction: Physical ergonomics, input clumsiness, and viewport clipping. Mobile users convert at 40–60% lower rates than desktop visitors not because of lower intent, but because of technical friction:
  - Sticky navigation headers and chat widgets consuming 40% of the visible viewport.
  - Virtual software keyboards popping up and pushing the primary checkout CTA offscreen.
  - Lack of one-tap wallet integration (Shop Pay / Apple Pay), forcing manual 16-digit credit card entry on a touchscreen.

Senior CRO developers inspect device-segmented funnel metrics to identify whether drop-offs are behavioral (desktop hesitation) or mechanical (mobile ergonomics).`,
                callout: {
                    type: 'warning',
                    text: 'If your mobile Cart-to-Checkout drop-off is over 60% while desktop is under 40%, the cause is almost always input friction or layout shifts obscuring the checkout button.',
                },
            },
            {
                heading: 'Calculating Funnel Drop-off Rates & Pipeline Telemetry',
                body: `Rather than relying solely on sitewide Conversion Rate (Orders / Sessions), a CRO developer instruments stage-by-stage drop-off telemetry to identify the exact leaky valve in the funnel.

Standard Industry Healthy Benchmarks:
• PDP View Rate (Sessions -> PDP): 50% - 65%
• Add to Cart Rate (PDP Views -> ATC): 8% - 14%
• Cart-to-Checkout Rate (ATC -> Checkout Started): 45% - 60%
• Checkout-to-Purchase Rate (Checkouts Started -> Orders): 55% - 75%`,
                code: `// Funnel Telemetry Drop-off Calculation Engine
interface FunnelStep {
  stepName: string;
  visitors: number;
}

export function computeFunnelDropoffs(steps: FunnelStep[]) {
  return steps.slice(1).map((currentStep, idx) => {
    const prevStep = steps[idx];
    const progressionRate = (currentStep.visitors / prevStep.visitors) * 100;
    const dropoffRate = 100 - progressionRate;
    
    return {
      transition: prevStep.stepName + ' -> ' + currentStep.stepName,
      previousVisitors: prevStep.visitors,
      currentVisitors: currentStep.visitors,
      progressionRate: progressionRate.toFixed(2) + '%',
      dropoffRate: dropoffRate.toFixed(2) + '%'
    };
  });
}

// Example store diagnostic:
const sampleFunnel = [
  { stepName: 'PDP Views', visitors: 12500 },
  { stepName: 'Add to Cart', visitors: 1150 },      // 9.20% progression
  { stepName: 'Checkout Started', visitors: 580 }, // 50.43% progression
  { stepName: 'Completed Orders', visitors: 340 }  // 58.62% progression
];
console.table(computeFunnelDropoffs(sampleFunnel));`,
                language: 'javascript',
            },
        ],
        mistakes: [
            'Focusing all optimization energy on the homepage when 70%+ of paid traffic lands directly on the PDP.',
            'Assuming desktop funnel drop-off percentages will mirror mobile drop-off percentages.',
        ],
        checklist: [
            'I can map out the 7 core stages of a Shopify customer journey.',
            'I know the typical industry benchmarks for PDP-to-ATC and Checkout-to-Purchase completion.',
        ],
        furtherReading: [
            { title: 'Baymard Institute: Ecommerce Checkout Benchmarks', url: 'https://baymard.com' },
        ],
    },
    {
        id: 'm1-l3',
        moduleId: 'module-1',
        slug: 'core-metrics-every-cro-dev-must-know',
        title: 'Core Metrics Every CRO Dev Must Know',
        estimatedMinutes: 25,
        objectives: [
            'Master the mathematical definitions of CVR, AOV, RPS, Cart Abandonment, and Checkout Abandonment.',
            'Solve worked calculation problems using raw store analytics data.',
            'Analyze how changes in AOV and CVR interact to generate revenue lift.',
        ],
        videoSource: {
            title: 'Shopify CRO: Beginner\'s Guide to Conversion Rate Optimization',
            embedUrl: 'https://www.youtube-nocookie.com/embed/N9Jn4kiXpYw',
            channel: 'Dominate Marketing',
            duration: '11:37',
            description: 'Curated technical CRO masterclass from Dominate Marketing covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Shopify CRO: Beginner\'s Guide to Conversion Rate Optimization'],
        },
        sections: [
            {
                heading: 'The 5 Essential CRO Mathematical Formulas',
                body: `Mastering CRO requires working with the exact mathematical relationships that govern ecommerce unit economics:

1. Conversion Rate (CVR):
   CVR = (Total Orders / Total Sessions) × 100%
   Measures visitor transactional velocity.

2. Average Order Value (AOV):
   AOV = Total Net Revenue / Total Completed Orders
   Measures the financial depth of each customer commitment.

3. Revenue Per Session (RPS):
   RPS = Total Net Revenue / Total Sessions = (CVR / 100) × AOV
   The ultimate north-star metric of store acquisition efficiency.

4. Cart Abandonment Rate:
   Cart Abandonment = ((Carts Created - Completed Orders) / Carts Created) × 100%
   Measures pre-checkout drop-off.

5. Checkout Abandonment Rate:
   Checkout Abandonment = ((Checkouts Started - Completed Orders) / Checkouts Started) × 100%
   Measures friction within shipping, taxes, and payment gateways.`,
                callout: {
                    type: 'note',
                    text: 'Revenue Per Session (RPS) is the definitive truth metric in CRO. Any test that lifts CVR by 10% but drops AOV by 20% reduces net store revenue by 12%.',
                },
            },
            {
                heading: 'Worked Problem: Diagnosing Real Store Analytics',
                body: `Let us solve a real diagnostic calculation from an active DTC apparel merchant:
• Total Monthly Sessions: 60,000
• Total Add to Carts: 5,400
• Checkouts Started: 2,700
• Completed Transactions: 1,350
• Total Gross Revenue: $118,800

Step-by-Step Calculation:
1. Sitewide CVR: (1,350 / 60,000) × 100% = 2.25%
2. Store AOV: $118,800 / 1,350 = $88.00
3. Revenue Per Session (RPS): $118,800 / 60,000 = $1.98 (or 0.0225 × $88.00 = $1.98)
4. Cart-to-Order Abandonment: ((5,400 - 1,350) / 5,400) × 100% = 75.00%
5. Checkout Abandonment: ((2,700 - 1,350) / 2,700) × 100% = 50.00%`,
                code: `// Automated Store Performance Diagnostic Engine
interface StoreRawData {
  sessions: number;
  revenue: number;
  orders: number;
  cartsCreated: number;
  checkoutsStarted: number;
}

export function auditStoreEconomics(data: StoreRawData) {
  const cvr = (data.orders / data.sessions) * 100;
  const aov = data.revenue / data.orders;
  const rps = data.revenue / data.sessions;
  const cartAbandonment = ((data.cartsCreated - data.orders) / data.cartsCreated) * 100;
  const checkoutAbandonment = ((data.checkoutsStarted - data.orders) / data.checkoutsStarted) * 100;

  return {
    cvr: cvr.toFixed(2) + '%',
    aov: '$' + aov.toFixed(2),
    rps: '$' + rps.toFixed(2),
    cartAbandonment: cartAbandonment.toFixed(1) + '%',
    checkoutAbandonment: checkoutAbandonment.toFixed(1) + '%',
    benchmarkSummary: {
      cvrStatus: cvr >= 2.0 ? 'HEALTHY' : 'NEEDS_OPTIMIZATION',
      checkoutStatus: checkoutAbandonment <= 50 ? 'HEALTHY' : 'HIGH_FRICTION'
    }
  };
}`,
                language: 'javascript',
            },
            {
                heading: 'The Elasticity Matrix: Interplay Between CVR, AOV, and Gross Margin',
                body: `A common rookie mistake is treating CVR and AOV as independent levers. In reality, they exist in tension:
• Free Shipping Thresholds: Setting a $100 free shipping bar when current AOV is $75 motivates visitors to add secondary items, increasing AOV to $92 while slightly dampening CVR. Net result: higher total profit.
• Volume Tier Discounts: Offering "Buy 2 Get 15% Off, Buy 3 Get 25% Off" boosts cart size and units per transaction (UPT).
• Downstream Refund Elasticity: If a test aggressively pushes high-ticket items that have higher return rates, the apparent AOV lift may be erased 30 days later by refund processing fees and reverse logistics costs.

Always evaluate test results through Net Revenue Elasticity rather than celebrating top-line conversion percentages in isolation.`,
                callout: {
                    type: 'shopify',
                    text: 'When modeling discounts, calculate Contribution Margin Per Session: CMPS = (Gross Revenue - COGS - Ad Spend - Shipping Subsidies) / Total Sessions.',
                },
            },
        ],
        mistakes: [
            'Confusing sessions with unique visitors (users can generate multiple sessions).',
            'Confusing cart abandonment with checkout abandonment.',
        ],
        checklist: [
            'I can calculate CVR, AOV, and RPS from raw store numbers without a calculator.',
            'I know the mathematical relationship between RPS, CVR, and AOV.',
        ],
        furtherReading: [
            { title: 'Shopify Help: Calculating Conversion Metrics', url: 'https://help.shopify.com' },
        ],
    },
    {
        id: 'm1-l4',
        moduleId: 'module-1',
        slug: 'shopify-benchmarks-and-realistic-targets',
        title: 'Shopify Benchmarks & Realistic Targets',
        estimatedMinutes: 20,
        objectives: [
            'Evaluate store performance against industry-specific Shopify benchmarks.',
            'Understand the difference between vanity benchmarks and statistically actionable baselines.',
            'Set realistic A/B test targets (e.g. 5–12% relative lift, not 200%).',
        ],
        videoSource: {
            title: 'Shopify CRO Tier List: Which Conversion Tactics Actually Work?',
            embedUrl: 'https://www.youtube-nocookie.com/embed/wMA33VFfxaM',
            channel: 'Niclas Eckert',
            duration: '8:43',
            description: 'Curated technical CRO masterclass from Niclas Eckert covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Shopify CRO Tier List: Which Conversion Tactics Actually Work?'],
        },
        sections: [
            {
                heading: 'Shopify Industry Benchmarks by Vertical',
                body: `Never compare metrics across incompatible verticals. Conversion dynamics depend fundamentally on catalog price point, purchase frequency, and emotional commitment:

• Apparel & Fashion:
  - Typical CVR: 2.2% – 3.2%
  - Average AOV: $65 – $110
  - Mobile Traffic Share: 78% – 85%
  - High return rate sensitivity (sizing and fabric drape).

• Beauty & Cosmetics:
  - Typical CVR: 2.8% – 4.5%
  - Average AOV: $45 – $75
  - High repeat purchase velocity; primary CRO focus is post-purchase subscription opt-in.

• Consumer Electronics & Hardware:
  - Typical CVR: 1.1% – 1.8%
  - Average AOV: $180 – $450
  - Lengthy multi-session consideration cycles; heavy reliance on spec sheets, warranty badges, and financing calculators (Klarna/Affirm).

• Luxury & High-Ticket Goods:
  - Typical CVR: 0.5% – 1.2%
  - Average AOV: $600 – $2,500+
  - Focus shifts toward concierge chat, white-glove authenticity proof, and high-touch customer support.`,
                callout: {
                    type: 'tip',
                    text: 'A 1.4% CVR on a $400 average order store generates an RPS of $5.60, outperforming a 3.5% CVR fast-fashion store with a $40 AOV (RPS = $1.40).',
                },
            },
            {
                heading: 'Vanity Benchmarks vs. Actionable Statistical Baselines',
                body: `Broad industry averages published on marketing blogs are often misleading because they blend disparate traffic channels:
• Direct & Email Retention Traffic: Converts at 4.0% – 8.0% because brand trust is already established.
• Paid Social (Meta & TikTok Cold Traffic): Converts at 0.9% – 1.8% due to ambient distraction and low purchase intent.
• Organic High-Intent Search: Converts at 2.5% – 4.5%.

If a merchant increases their Meta ad budget by $50,000/month, sitewide CVR will drop naturally because cold traffic dilutes the user pool. An inexperienced developer might panic and assume the theme is broken. A seasoned CRO engineer establishes segmented baselines for each traffic acquisition channel before running experiments.`,
                callout: {
                    type: 'warning',
                    text: 'Never evaluate an A/B test against sitewide historical averages. Always compare Variant A against Variant B running concurrently across identical traffic segments.',
                },
            },
            {
                heading: 'Setting Realistic Experimentation Goals',
                body: `Amateur marketers often claim their new redesign will "double conversion rate overnight" (+100% lift). In reality, enterprise experimentation programs operate on compound incremental gains:
• Single-Test Realistic Lift: 4% to 12% relative improvement on the target step.
• Win Rate of Hypotheses: Mature CRO programs typically see 25% to 35% of tests achieve statistical significance.
• The Power of Compounding: Four consecutive 6% relative wins across a 12-month period compound into a 26.2% overall lift in store revenue:
  1.06 × 1.06 × 1.06 × 1.06 = 1.262 (+26.2% annualized revenue)

On a store doing $5M annually, an incremental 26% lift adds $1.3M in top-line revenue without spending an additional dollar on Facebook or Google ads.`,
                code: `// Annualized Compounded Lift Projection
function projectCompoundedGains(baselineAnnualRevenue: number, winsPerYear: number, avgLiftPercent: number) {
  const multiplier = Math.pow(1 + (avgLiftPercent / 100), winsPerYear);
  const projectedRevenue = baselineAnnualRevenue * multiplier;
  const netDollarGain = projectedRevenue - baselineAnnualRevenue;
  
  return {
    baselineRevenue: '$' + baselineAnnualRevenue.toLocaleString(),
    projectedRevenue: '$' + Math.round(projectedRevenue).toLocaleString(),
    netDollarGain: '$' + Math.round(netDollarGain).toLocaleString(),
    effectiveTotalLift: ((multiplier - 1) * 100).toFixed(1) + '%'
  };
}

// Example: $3,000,000 store with 3 wins averaging 7% relative lift:
console.log(projectCompoundedGains(3000000, 3, 7.0));
// Output: { baselineRevenue: '$3,000,000', projectedRevenue: '$3,675,129', netDollarGain: '$675,129', effectiveTotalLift: '22.5%' }`,
                language: 'javascript',
            },
        ],
        mistakes: [
            'Promising clients double-digit absolute CVR gains on low-traffic stores.',
            'Comparing store CVR to global aggregates without controlling for traffic source (paid ads vs organic email).',
        ],
        checklist: [
            'I understand standard conversion benchmarks for my store vertical.',
            'I know why relative lift targets are more realistic than absolute targets.',
        ],
        furtherReading: [
            { title: 'Littledata: Shopify Conversion Rate Benchmarks', url: 'https://www.littledata.io' },
        ],
    },
    // MODULE 2: Shopify CRO Surface Area
    {
        id: 'm2-l1',
        moduleId: 'module-2',
        slug: 'what-you-can-change-as-a-shopify-developer',
        title: 'What You Can Change as a Shopify Developer',
        estimatedMinutes: 20,
        objectives: [
            'Identify the full spectrum of developer control across Liquid, CSS, JS, and Shopify APIs.',
            'Understand the separation between theme runtime, server runtime, and checkout sandboxes.',
            'Choose the most performant implementation strategy for a proposed CRO change.',
        ],
        videoSource: {
            title: 'Conversion Rate Optimization (CRO) for Shopify',
            embedUrl: 'https://www.youtube-nocookie.com/embed/VUqJ9TTQMvM',
            channel: 'Jeff Finkelstein',
            duration: '10:34',
            description: 'Curated technical CRO masterclass from Jeff Finkelstein covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Conversion Rate Optimization (CRO) for Shopify'],
        },
        sections: [
            {
                heading: 'Platform Architecture: Liquid Themes, Checkout & Core APIs',
                body: `Shopify divides storefront architecture into three distinct execution layers with strict security and modification boundaries:

1. The Presentation Layer (Liquid & Online Store 2.0):
   Full developer control. You can modify HTML structure, write custom Liquid tags, inject modular App Blocks, build zero-flicker CSS, and execute client-side JavaScript.

2. The Checkout & Post-Purchase Layer:
   Heavily sandboxed for PCI-DSS Level 1 compliance. Developers customize checkout exclusively via Checkout UI Extensions, WebAssembly Shopify Functions, and Checkout Branding APIs.

3. The Platform Core & Admin API Layer:
   Fully managed cloud infrastructure. Developers interact via GraphQL Admin API, Storefront API, and Webhooks. Database schemas cannot be altered directly, but can be augmented using Metafields and Metaobjects.`,
                callout: {
                    type: 'shopify',
                    text: 'Never attempt to hack checkout behavior using client-side DOM injection scripts. Shopify strictly sandboxes checkout DOM; all modifications must flow through certified UI Extension targets.',
                },
            },
            {
                heading: 'High-Impact Theme Surfaces for Developer Speed & CRO',
                body: `As a Shopify developer, your highest-leverage optimization surfaces are:
• The Product Detail Page (PDP): The financial engine of the store. Optimizing image gallery load order, variant swatch responsiveness, and sticky buy bars drives immediate revenue.
• The Dynamic Cart Drawer (Ajax Cart): Leveraging the Section Rendering API (?sections=cart-drawer) allows real-time cart manipulation, threshold shipping bars, and instant one-click upsells without full page reloads.
• Predictive Search: Building instant autocomplete with debounced fetch requests to /search/suggest.json keeps high-intent searchers from abandoning.`,
                code: `// Fetching updated cart drawer via Section Rendering API
async function refreshCartDrawer() {
  const response = await fetch('/?sections=cart-drawer');
  const sections = await response.json();
  const html = sections['cart-drawer'];
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const freshDrawer = doc.getElementById('CartDrawer');
  
  if (freshDrawer) {
    document.getElementById('CartDrawer')?.replaceWith(freshDrawer);
  }
}`,
                language: 'javascript',
            },
            {
                heading: 'Checkout Extensibility Security & Sandboxing',
                body: `In the modern Checkout Extensibility model:
• Extensions run inside secure Web Worker sandboxes isolated from the global window object, preventing script skimming and protecting payment tokens.
• Direct access to document.cookie or arbitrary external script injection is prohibited.
• Custom styling is applied via design tokens configured through the Checkout Branding API, ensuring native checkout load speeds and zero layout shift.
• Data mutations (e.g. applying custom discounts or hiding shipping methods) execute on Shopify backend infrastructure via compiled WebAssembly Functions with sub-5ms latency SLAs.`,
                callout: {
                    type: 'note',
                    text: 'Shopify Checkout Extensibility loads up to 2x faster than legacy custom checkouts and increases checkout completion rates by an average of 1.4%.',
                },
            },
        ],
        mistakes: [
            'Attempting to inject arbitrary client-side DOM scripts into checkout (all modifications must use Checkout UI Extensions).',
            'Over-relying on third-party Shopify apps that inject unoptimized DOM when a 15-line Liquid snippet solves it.',
        ],
        checklist: [
            'I know which parts of Shopify require Shopify Plus for deep CRO customization.',
            'I understand when to build natively in Liquid vs using a third-party app.',
        ],
        furtherReading: [
            { title: 'Shopify Checkout Extensibility Overview', url: 'https://shopify.dev/docs/apps/checkout' },
        ],
    },
    {
        id: 'm2-l2',
        moduleId: 'module-2',
        slug: 'theme-surfaces-home-collection-pdp-cart-search',
        title: 'Theme Surfaces: Home, Collection, PDP, Cart, Search',
        estimatedMinutes: 25,
        objectives: [
            'Understand the specific CRO role and conversion goals of each core theme template.',
            'Design clear navigational transitions between collection listings and product detail pages.',
            'Implement high-converting search autocomplete and empty-state fallbacks.',
        ],
        videoSource: {
            title: 'The Most Important Shopify Page You\'re Not Optimizing (Collection Page Secrets)',
            embedUrl: 'https://www.youtube-nocookie.com/embed/4y-OTFZBZ5k',
            channel: 'Oliver Kenyon | ConversionWise',
            duration: '3:43',
            description: 'Curated technical CRO masterclass from Oliver Kenyon | ConversionWise covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['The Most Important Shopify Page You\'re Not Optimizing (Collection Page Secrets)'],
        },
        sections: [
            {
                heading: 'The 5 Core Online Store 2.0 JSON Templates',
                body: `In Online Store 2.0, all primary storefront surfaces are defined by modular JSON templates in the /templates directory:
1. index.json (Homepage): Brand orientation and high-level category routing.
2. collection.json (Collection Grid): Catalog discovery, faceted filtering, and visual browsing.
3. product.json (Product Detail Page): Evaluation, specification, trust reassurance, and conversion commitment.
4. cart.json (Cart Surface): Order review, gift wrapping, free shipping progress, and checkout initiation.
5. search.json (Search Results): Query recovery, spell-checking, and zero-results redirection.

Because templates are JSON files defining section hierarchies and block settings, merchants can reorder sections dynamically in the Shopify Theme Editor without developer intervention.`,
                code: `{
  "sections": {
    "main": {
      "type": "main-product",
      "blocks": {
        "title": { "type": "title", "settings": {} },
        "price": { "type": "price", "settings": {} },
        "variant_picker": { "type": "variant_picker", "settings": {} },
        "buy_buttons": { "type": "buy_buttons", "settings": { "show_dynamic_checkout": true } }
      },
      "block_order": ["title", "price", "variant_picker", "buy_buttons"]
    }
  },
  "order": ["main"]
}`,
                language: 'json',
            },
            {
                heading: 'The Specific CRO Job of Each Storefront Surface',
                body: `Each template serves a distinct behavioral objective in the customer decision journey:
• Homepage: Answer "Am I in the right place?" within 3 seconds. Establish brand credibility, current shipping cutoffs, and provide immediate pathways into top collections.
• Collection Page: Minimize visual choice overload. Implement sticky filters, clear pricing, badges ("Best Seller", "Low Stock"), and fast Quick-Add drawers.
• Product Page: Answer all buying objections (sizing, shipping timeline, ingredients/materials, warranty). Eliminate hesitation with high-res galleries and verified social proof.
• Cart Drawer: Reassure price transparency before checkout, upsell complementary accessories without being disruptive, and ensure the Checkout CTA is permanently visible.`,
                callout: {
                    type: 'tip',
                    text: 'Treat each page template as a specialized tool. Putting reviews and detailed FAQs on the collection page clutters browsing; omitting them on the PDP destroys purchase confidence.',
                },
            },
            {
                heading: 'Prioritizing Development Effort by Traffic & Revenue Impact',
                body: `Senior CRO engineers follow the 80/20 rule of storefront optimization:
• PDP Optimization (Highest Priority): Typically accounts for 65%–75% of landing traffic and 100% of conversion commitments. A 10% lift on product.json transforms store profitability.
• Cart Drawer / Checkout (Second Priority): High intent; every visitor here has already decided to buy. Eliminating friction recovers high-dollar transactions immediately.
• Collection & Search (Third Priority): Drives discovery efficiency.
• Homepage (Lowest CRO Priority): Despite receiving the most attention from marketing executives, homepages typically represent less than 15% of paid traffic landing sessions.

Prioritize engineering tickets where traffic volume and buyer intent intersect at the highest density.`,
                callout: {
                    type: 'note',
                    text: 'Never spend two weeks rebuilding a custom homepage animation when the PDP variant picker has broken mobile touch targets.',
                },
            },
        ],
        mistakes: [
            'Treating collection pages like static catalogs instead of active decision-making funnels.',
            'Hiding essential product variant availability behind dropdowns that require clicking.',
        ],
        checklist: [
            'I can articulate the primary conversion goal of each template surface.',
            'I know how to design an empty search state that redirects users to top sellers.',
        ],
        furtherReading: [
            { title: 'Shopify Theme Architecture: Templates & Sections', url: 'https://shopify.dev/docs/themes/architecture' },
        ],
    },
    {
        id: 'm2-l3',
        moduleId: 'module-2',
        slug: 'checkout-post-purchase-thank-you-page',
        title: 'Checkout, Post-Purchase, and Thank You Page',
        estimatedMinutes: 20,
        objectives: [
            'Master Checkout Extensibility architecture, security sandboxing, and extension targets.',
            'Leverage Checkout UI Extensions for delivery instructions, trust badges, and upsells.',
            'Optimize the Thank You page for post-purchase surveys and referral loops.',
        ],
        videoSource: {
            title: 'How to Optimize Your Ecommerce Checkout Process (25 Tips!)',
            embedUrl: 'https://www.youtube-nocookie.com/embed/5iuOdB21WIY',
            channel: 'The Good',
            duration: '9:00',
            description: 'Curated technical CRO masterclass from The Good covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['How to Optimize Your Ecommerce Checkout Process (25 Tips!)'],
        },
        sections: [
            {
                heading: 'Shopify Checkout Extensibility Architecture',
                body: `Checkout Extensibility is Shopify's secure, modern framework for checkout customization:
• Isolated Sandboxed Execution: Extensions execute in isolated Web Worker threads, delivering bulletproof PCI-DSS Level 1 security for customer payment flows.
• Modern Extension Components: Built with Preact-like primitives (@shopify/ui-extensions-react/checkout) that render natively across desktop, mobile, Shop App, and point-of-sale.
• Declarative Placement: Extensions anchor to pre-defined Extension Targets (e.g. purchase.checkout.block.render, purchase.checkout.shipping-option-list.render-after).
• Automatic Upgrade Safety: Shopify manages the underlying checkout infrastructure, ensuring 99.99% uptime during Black Friday / Cyber Monday (BFCM) while custom extension components render seamlessly without breaking.`,
                callout: {
                    type: 'shopify',
                    text: 'Checkout Extensibility powers One-Page Checkout, Shop Pay accelerated checkouts, and post-purchase thank-you surfaces across all devices.',
                },
            },
            {
                heading: 'Extension Points: Post-Purchase Upsells & Trust Signals',
                body: `The post-purchase window (between order submission and thank-you page rendering) is the highest-converting upsell opportunity in ecommerce:
• Zero Payment Friction: Because the customer has already authorized payment, post-purchase apps can execute a single-tap 1-Click Upsell using tokenized vaulting without re-entering credit card details.
• Typical Take Rates: Post-purchase upsells average 12% to 22% conversion rates, adding pure high-margin profit to the order.
• Trust Badges in Checkout: Using purchase.checkout.reductions.render-after to display SSL guarantees, money-back return windows, and real-time delivery guarantees reduces checkout drop-off by up to 3.8%.`,
                code: `// Sample Checkout UI Extension Target in React
import { extension, Banner, useSettings } from '@shopify/ui-extensions-react/checkout';

export default extension('purchase.checkout.block.render', (root, api) => {
  const { bannerTitle, bannerDescription } = api.settings.current;
  
  root.appendChild(
    root.createComponent(Banner, {
      title: bannerTitle || 'Free 30-Day Money-Back Guarantee',
      status: 'info'
    }, bannerDescription || 'Hassle-free prepaid returns on all orders.')
  );
});`,
                language: 'javascript',
            },
            {
                heading: '1-Page Checkout vs. 3-Page Checkout Conversion Impact',
                body: `Shopify rolled out native 1-Page Checkout across all stores, consolidating Customer Info, Shipping Method, and Payment onto a single fluid surface:
• Reduction in Form Completion Time: 1-page checkout reduces median completion time by over 40 seconds.
• Lower Cognitive Dread: Multi-step checkouts create anxiety because customers cannot see total shipping fees and tax amounts until step 2 or 3. Seeing everything consolidated eliminates surprise price shock.
• Accelerated Wallet Dominance: Shop Pay, Apple Pay, and Google Pay occupy prominent top placement, enabling registered buyers to complete orders in a single biometric tap.

Data across millions of Shopify transactions demonstrates that 1-page checkout delivers an average 1.2% to 2.8% relative lift in checkout completion rate.`,
                callout: {
                    type: 'tip',
                    text: 'Ensure your 1-page checkout has Shop Pay activated. Shop Pay converts up to 50% higher than traditional guest checkout across mobile devices.',
                },
            },
        ],
        mistakes: [
            'Promising clients arbitrary DOM hacking inside modern Shopify checkout.',
            'Forgetting that Thank You page scripts must be migrated to Web Pixels.',
        ],
        checklist: [
            'I understand Checkout UI Extension points.',
            'I know how to use the Branding API for non-Plus stores.',
        ],
        furtherReading: [
            { title: 'Shopify UI Extensions Documentation', url: 'https://shopify.dev/docs/api/checkout-ui-extensions' },
        ],
    },
    {
        id: 'm2-l4',
        moduleId: 'module-2',
        slug: 'apps-headless-hydrogen-when-to-use-what',
        title: 'Apps, Headless, and Hydrogen — When to Use What',
        estimatedMinutes: 20,
        objectives: [
            'Evaluate the CRO tradeoffs between monolithic Liquid themes and headless Hydrogen setups.',
            'Quantify the conversion cost of third-party Shopify app script overhead.',
            'Decide whether a store is ready for headless architecture.',
        ],
        videoSource: {
            title: 'Headless Shopify Pros & Cons',
            embedUrl: 'https://www.youtube-nocookie.com/embed/xpIThP_Xv8Q',
            channel: 'Fourmeta Agency',
            duration: '12:15',
            description: 'Objective analysis of headless Shopify architectures versus native Liquid, exploring how decoupled frontends impact conversion rates, site speed, and maintenance overhead.',
            topics: ['Headless Shopify', 'Hydrogen vs Liquid', 'Developer Complexity', 'Conversion Impact'],
        },
        sections: [
            {
                heading: 'Apps vs. Custom Theme Code: When to Build vs. Buy',
                body: `Every Shopify store balances speed-to-market against performance overhead when choosing between third-party apps and custom Liquid/JS code:

When to Use Third-Party Apps:
• Complex backend integrations: Full-funnel reviews platforms (Yotpo, Okendo), subscription billing engines (Recharge, Skio), and complex search AI (Algolia, Klevu).
• Dynamic inventory synchronization across multiple physical ERP warehouses.

When to Build Custom Theme Features:
• UI elements: Sticky Add-to-Cart bars, size guides, tabbed accordions, Announcement bars, and free shipping progress calculators.
• Why custom code wins: Building simple UI widgets in native Liquid and CSS takes under 50 lines of code, adds 0KB of third-party JavaScript, and executes instantly during server-side Liquid compilation.`,
                callout: {
                    type: 'tip',
                    text: 'Never install a 200KB third-party app just to show a sticky Add-to-Cart bar or an FAQ accordion. Native Liquid implementation takes 2 hours and saves 800ms of mobile render time.',
                },
            },
            {
                heading: 'The Headless (Hydrogen/Oxygen) Trade-Off in CRO',
                body: `Headless commerce decouples the frontend presentation layer from Shopify’s backend using frameworks like Shopify Hydrogen (Remix/React) hosted on Oxygen:

The CRO Advantages of Headless:
• Sub-second page-to-page transitions using client-side prefetching.
• Dynamic personalization and complex interactive product customizers.
• Ultimate architectural freedom for multi-brand or content-heavy editorial stores.

The Hidden CRO Risks of Headless:
• Loss of No-Code Theme Editor: Merchandisers lose the ability to add, remove, and reorder sections without developer PRs, slowing marketing agility.
• App Ecosystem Incompatibility: Most Shopify App Store apps rely on Theme App Extensions and fail to work on headless storefronts without building custom GraphQL API adapters.
• Increased Complexity: Requires managing edge caching headers, hydration errors, and full-stack DevOps.`,
                callout: {
                    type: 'warning',
                    text: 'A headless store with slow API response times or hydration bugs will convert significantly worse than an optimized native Liquid theme.',
                },
            },
            {
                heading: 'The Real Performance Cost of Third-Party Apps',
                body: `The single largest factor degrading Core Web Vitals on Shopify is "App Bloat":
• Cumulative Main-Thread Blocking: A store with 25 apps can easily execute 2.5MB of unoptimized JavaScript, causing 3,000ms+ of Total Blocking Time (TBT).
• Ghost Code from Uninstalled Apps: Many legacy apps inject script tags into theme.liquid or leave residual snippets in /snippets that execute long after the app is uninstalled.
• Cumulative Layout Shift (CLS): Apps injecting banner pop-ups, chat widgets, and review star ratings asynchronously after page load push page content down, frustrating users and triggering Google penalties.`,
                code: `// Auditing third-party script execution time in browser console
performance.getEntriesByType('resource')
  .filter(r => r.initiatorType === 'script' && !r.name.includes(window.location.hostname))
  .map(r => ({
    url: r.name.split('/').pop().split('?')[0],
    durationMs: Math.round(r.duration),
    sizeKb: Math.round(r.transferSize / 1024)
  }))
  .sort((a, b) => b.durationMs - a.durationMs)
  .slice(0, 10);`,
                language: 'javascript',
            },
        ],
        mistakes: [
            'Assuming going headless automatically fixes poor conversion rates (it often hurts CVR if tracking breaks).',
            'Installing 25 different Shopify apps for small CRO tweaks, dragging mobile LCP to 7.5 seconds.',
        ],
        checklist: [
            'I can evaluate whether a merchant actually benefits from headless Hydrogen.',
            'I know how to audit app script impact on page performance.',
        ],
        furtherReading: [
            { title: 'Shopify Hydrogen Documentation', url: 'https://shopify.dev/docs/custom-storefronts/hydrogen' },
        ],
    },
    {
        id: 'm2-l5',
        moduleId: 'module-2',
        slug: 'what-you-cannot-change-and-how-to-work-around-it',
        title: 'What You Cannot Change (and How to Work Around It)',
        estimatedMinutes: 20,
        objectives: [
            'Catalog hard Shopify technical constraints and platform guardrails.',
            'Devise valid workarounds for standard plan checkout limits.',
            'Understand Shopify CDN caching behavior and dynamic section rendering.',
        ],
        videoSource: {
            title: 'Fix Your Shopify Checkout NOW — CRO Mistakes Killing Your Sales',
            embedUrl: 'https://www.youtube-nocookie.com/embed/CJHc_3tow0c',
            channel: 'Kaching Ecom',
            duration: '8:42',
            description: 'Curated technical CRO masterclass from Kaching Ecom covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Fix Your Shopify Checkout NOW — CRO Mistakes Killing Your Sales'],
        },
        sections: [
            {
                heading: 'Navigating Shopify Platform Constraints',
                body: `Professional Shopify developers understand the immutable boundaries of the platform:
1. CDN Caching: Shopify aggressively caches full-page HTML at Cloudflare edge nodes. You cannot render user-specific dynamic content (such as customer name or personalized cart totals) directly in server-side Liquid on cached templates.
2. Checkout DOM Sandboxing: You cannot inspect or modify checkout elements using document.querySelector or inject arbitrary tracking pixels into checkout. All customizations require Checkout UI Extensions and Web Pixels.
3. API Architecture (GraphQL-Only): The Shopify Admin API is GraphQL-only for modern development (Shopify officially deprecated the legacy Admin REST API on October 1, 2024, and mandated GraphQL for all new public and custom apps as of April 1, 2025). GraphQL enforces a query-cost leaky-bucket rate limit (50 points/sec restore rate for standard plans, 100 points/sec for Shopify Plus, with a 1,000-point bucket capacity). High-volume catalog syncs and bulk operations must use the GraphQL Bulk Operations API rather than paginated REST loops.`,
                callout: {
                    type: 'note',
                    text: 'Because Liquid templates are edge-cached, dynamic personalization must be fetched asynchronously via the Section Rendering API or Cart Ajax API.',
                },
            },
            {
                heading: 'Shopify Functions (Wasm): Custom Logic Without Checkout Code',
                body: `Shopify Functions allow developers to inject custom business logic directly into Shopify’s core backend engine:
• WebAssembly (Wasm) Execution: Functions are written in Rust or JavaScript and compiled to Wasm. They execute within Shopify’s infrastructure with strict 5ms execution limits.
• Core Functional Use Cases:
  - Custom Discount Rules: Volume tiered pricing, bundle discounting, and BOGO logic calculated server-side.
  - Payment Customizations: Hiding Cash on Delivery (COD) for high-fraud regions, or suppressing Klarna for gift card purchases.
  - Delivery Customizations: Dynamically renaming shipping options or suppressing express carriers based on cart weight.
Functions execute server-side WebAssembly logic across all checkouts and Shop Pay without client-side latency.`,
                code: `// Sample Shopify Function: Hide Cash on Delivery for Carts Under $50
// run.js (compiled to Wasm)
export function run(input) {
  const cartTotal = parseFloat(input.cart.cost.totalAmount.amount);
  
  const hidePaymentMethods = input.paymentMethods
    .filter(method => method.name.toLowerCase().includes('cash on delivery') && cartTotal < 50.0)
    .map(method => ({
      hide: { paymentMethodId: method.id }
    }));

  return { operations: hidePaymentMethods };
}`,
                language: 'javascript',
            },
            {
                heading: 'Edge Workers for Geolocation & Advanced Routing',
                body: `When standard Liquid features cannot satisfy advanced CRO personalization requirements, developers deploy Edge Middleware (Cloudflare Workers, Fastly Compute, or Vercel Edge):
• Instant Geolocation Routing: Inspecting incoming request headers (e.g. cf-ipcountry) at the CDN edge and routing UK visitors to /en-gb without waiting for client-side JavaScript redirect flashes.
• Zero-Flicker A/B Test Variant Serving: Modifying incoming HTML streams at edge nodes using HTMLRewriter to swap section markup before the document ever reaches the visitor's browser.
• Dynamic Cookie Injection: Storing experiment cohort IDs in secure HttpOnly cookies at the network edge to ensure test consistency across multiple customer sessions.`,
                callout: {
                    type: 'tip',
                    text: 'Edge Workers operate in under 10ms, eliminating the 200–400ms layout flicker common to legacy client-side A/B testing platforms.',
                },
            },
        ],
        mistakes: [
            'Busting full-page cache with randomized URL parameters, slowing down the entire store for all visitors.',
            'Giving up on checkout optimization on non-Plus plans instead of optimizing the pre-checkout cart drawer.',
        ],
        checklist: [
            'I know the top 3 Shopify platform limitations and their engineering workarounds.',
            'I understand how Section Rendering preserves CDN caching.',
        ],
        furtherReading: [
            { title: 'Shopify Section Rendering API', url: 'https://shopify.dev/docs/api/section-rendering' },
        ],
    },
    // MODULE 3: Analytics & Tracking
    {
        id: 'm3-l1',
        moduleId: 'module-3',
        slug: 'shopify-analytics-vs-ga4-which-answers-what',
        title: 'Shopify Analytics vs GA4 — Which Answers What',
        estimatedMinutes: 25,
        objectives: [
            'Compare Shopify Analytics and Google Analytics 4 data models and attribution rules.',
            'Understand why order counts and revenue numbers differ between Shopify and GA4.',
            'Know which analytical questions to answer in Shopify vs GA4.',
        ],
        videoSource: {
            title: 'Shopify Analytics vs Google Analytics',
            embedUrl: 'https://www.youtube-nocookie.com/embed/vZOnzyhb6CY',
            channel: ' Ecom Masterclass ',
            duration: '6:09',
            description: 'Curated technical CRO masterclass from  Ecom Masterclass  covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Shopify Analytics vs Google Analytics'],
        },
        sections: [
            {
                heading: 'Data Collection Architectures: Shopify Native vs. GA4',
                body: `Understanding the architectural distinction between Shopify Analytics and Google Analytics 4 (GA4) prevents costly reporting errors:
• Shopify Native Analytics: Server-side database transactions. Every time an order is authorized in Shopify checkout, a record is written directly to Shopify’s relational database. It is immune to browser ad-blockers, iOS Safari ITP (Intelligent Tracking Prevention), and network disconnection.
• Google Analytics 4 (GA4): Client-side event streaming. GA4 collects data by executing JavaScript in the user's browser, sending beacons across the network to Google’s collection servers.
• The Collection Gap: GA4 will virtually always record 8% to 18% fewer transactions than Shopify Admin due to ad blockers, strict cookie consent rejection, and browser tab closing before the tracking tag fires.`,
                callout: {
                    type: 'warning',
                    text: 'Never panic when GA4 reports fewer transactions than Shopify Admin. Shopify Admin is financial ground truth for accounting; GA4 is behavioral telemetry for visitor journey pathing.',
                },
            },
            {
                heading: 'Why Conversion Rates Differ Between Platforms',
                body: `Discrepancies between Shopify and GA4 conversion metrics stem from fundamental definitional differences:
1. Session Definition:
   Shopify defines a session as 30 minutes of inactivity. GA4 defines a session based on the ga_session_id parameter and handles midnight cross-overs differently.
2. User Identification:
   Shopify identifies unique visitors via the _shopify_y and _shopify_s browser cookies. GA4 uses its own _ga client ID, Google Signals, and User-ID stitching.
3. Bot & Crawler Filtering:
   GA4 automatically filters known web spiders, scraping bots, and headless browsers. Shopify native analytics applies different bot-filtering thresholds, often causing Shopify’s session count to appear higher than GA4.`,
                code: `// Cross-Checking Shopify vs GA4 Discrepancy Tolerance
function calculateAnalyticsDiscrepancy(shopifyOrders: number, ga4Orders: number) {
  const discrepancyPercent = Math.abs((shopifyOrders - ga4Orders) / shopifyOrders) * 100;
  
  return {
    shopifyOrders,
    ga4Orders,
    discrepancyPercent: discrepancyPercent.toFixed(1) + '%',
    status: discrepancyPercent <= 15 ? 'NORMAL_ITP_AND_ADBLOCK_TOLERANCE' : 'TRACKING_IMPLEMENTATION_DEFECT'
  };
}

console.log(calculateAnalyticsDiscrepancy(1000, 890));
// Output: { shopifyOrders: 1000, ga4Orders: 890, discrepancyPercent: '11.0%', status: 'NORMAL_ITP_AND_ADBLOCK_TOLERANCE' }`,
                language: 'javascript',
            },
            {
                heading: 'Tool Specialization: Financial Truth vs. Behavioral Discovery',
                body: `A high-performing CRO developer never tries to force one tool to do the other's job:
• Use Shopify Analytics for:
  - Net revenue, product gross margins, refund deductions, and tax liabilities.
  - Inventory velocity, discount code redemption totals, and merchant payout reconciliation.
• Use GA4 Explorations for:
  - Multi-step funnel drop-off analysis (where in the PDP to Cart path are users bouncing?).
  - Traffic channel attribution (Paid Meta vs Google Non-Brand Search vs Organic TikTok).
  - Cross-device journey mapping and engagement dwell time correlations.`,
                callout: {
                    type: 'tip',
                    text: 'In client audits, use GA4 to locate the leak in the pipeline, but always calculate the financial impact using Shopify Admin net revenue figures.',
                },
            },
        ],
        mistakes: [
            'Panicking when GA4 shows 12% fewer orders than Shopify Admin.',
            'Using last-click attribution blindly without understanding multi-touch user journeys.',
        ],
        checklist: [
            'I can explain why Shopify and GA4 numbers will never match 100%.',
            'I know when to open Shopify Reports vs GA4 Explorations.',
        ],
        furtherReading: [
            { title: 'Google Analytics 4 Ecommerce Guide', url: 'https://developers.google.com/analytics/devguides/collection/ga4/ecommerce' },
        ],
    },
    {
        id: 'm3-l2',
        moduleId: 'module-3',
        slug: 'the-8-events-that-matter',
        title: 'The 8 Ecommerce Events That Actually Matter',
        estimatedMinutes: 25,
        objectives: [
            'Master the standard 8 ecommerce event schemas: page_viewed, product_viewed, collection_viewed, search_submitted, product_added_to_cart, cart_viewed, checkout_started, checkout_completed.',
            'Construct standard GA4-compliant dataLayer payloads.',
            'Verify event triggers in browser developer tools.',
        ],
        videoSource: {
            title: 'How To 10X Conversion Rate On Shopify (2025 CRO Guide)',
            embedUrl: 'https://www.youtube-nocookie.com/embed/T15_h9GO-HY',
            channel: 'Michael Bernstein',
            duration: '9:17',
            description: 'Curated technical CRO masterclass from Michael Bernstein covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['How To 10X Conversion Rate On Shopify (2025 CRO Guide)'],
        },
        sections: [
            {
                heading: 'The 8 Standard Ecommerce Telemetry Events',
                body: `Every high-performing Shopify store must instrument the standardized 8 ecommerce event pipeline:
1. page_viewed: Top-level page load tracking.
2. product_viewed (view_item): Triggers on PDP load with SKU, title, price, and category.
3. collection_viewed (view_item_list): Triggers when a category grid is presented.
4. search_submitted (search): Triggers on internal query execution with search term and result count.
5. product_added_to_cart (add_to_cart): Critical micro-conversion triggered upon successful Ajax cart addition.
6. cart_viewed (view_cart): Triggers when the cart drawer or cart page opens.
7. checkout_started (begin_checkout): Fires when the visitor transitions from cart to checkout.
8. checkout_completed (purchase): The macro-conversion containing final transaction ID, tax, shipping, and currency.`,
                callout: {
                    type: 'note',
                    text: 'A missing or improperly formatted add_to_cart event is the single most common reason A/B test platforms fail to calculate statistical significance.',
                },
            },
            {
                heading: 'Constructing GA4-Compliant dataLayer Payloads',
                body: `GA4 requires a strict schema for ecommerce events. Parameter names must use standard snake_case, and items must be formatted as an array of product objects with price formatted as numeric values, not strings with currency symbols ($).`,
                code: `// Constructing GA4 view_item event payload
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({ ecommerce: null }); // Clear previous ecommerce object
window.dataLayer.push({
  event: 'view_item',
  ecommerce: {
    currency: 'USD',
    value: 78.00,
    items: [
      {
        item_id: 'SKU-77291',
        item_name: 'Merino Wool Minimalist Hoodie',
        item_brand: 'Nordic Apparel',
        item_category: 'Sweatshirts & Hoodies',
        item_variant: 'Heather Grey / Large',
        price: 78.00,
        quantity: 1
      }
    ]
  }
});`,
                language: 'javascript',
            },
            {
                heading: 'Verifying Event Triggers in Browser Developer Tools',
                body: `Never assume analytics scripts work without real verification:
1. Chrome DevTools Console:
   Inspect window.dataLayer array in real-time by typing dataLayer and verifying event order as you click around the store.
2. Network Tab Filtering:
   Filter Network requests by collect?v=2 to inspect raw HTTP POST requests streaming to Google Analytics. Confirm that en=add_to_cart or en=purchase is present in the query payload.
3. GA4 DebugView:
   Install the Google Analytics Debugger Chrome extension and open Admin -> DebugView in GA4 to watch events stream second-by-second in an interactive device timeline.`,
                callout: {
                    type: 'shopify',
                    text: 'Ensure events only fire once per user action. Double-firing add_to_cart will artificially halve your calculated cart abandonment rate.',
                },
            },
        ],
        mistakes: [
            'Sending inconsistent currency codes or prices formatted as strings ("$84.00" instead of 84.00).',
            'Firing add_to_cart events before verifying that the server actually accepted the cart line item.',
        ],
        checklist: [
            'I can write a compliant GA4 add_to_cart and purchase dataLayer payload.',
            'I know the exact trigger conditions for all 8 core ecommerce events.',
        ],
        furtherReading: [
            { title: 'GA4 Recommended Events Reference', url: 'https://developers.google.com/analytics/devguides/collection/ga4/reference/events' },
        ],
    },
    {
        id: 'm3-l3',
        moduleId: 'module-3',
        slug: 'shopify-web-pixels-api-hello-world',
        title: 'Shopify Web Pixels API — Hello World',
        estimatedMinutes: 25,
        objectives: [
            'Understand Shopify Web Pixels API sandbox architecture.',
            'Subscribe to native events (product_viewed, checkout_completed).',
            'Deploy a working Web Pixel that pushes clean events to window.dataLayer.',
        ],
        videoSource: {
            title: 'Shopify Tutorial - Web Pixels',
            embedUrl: 'https://www.youtube-nocookie.com/embed/bP5V0qCdtUM',
            channel: 'Stacking Context - Shopify Development Tutorials',
            duration: '26:23',
            description: 'Curated technical CRO masterclass from Stacking Context - Shopify Development Tutorials covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Shopify Tutorial', 'Web Pixels'],
        },
        sections: [
            {
                heading: 'Why Shopify Introduced the Web Pixels API',
                body: `Modern customer event tracking on Shopify relies strictly on the Web Pixels API. In legacy environments, tracking scripts were injected directly into global HTML layouts or order status fields, introducing severe security, privacy, and performance bottlenecks:
• Performance Degradation: Synchronous third-party scripts blocked DOM parsing and destroyed mobile Core Web Vitals.
• Security & Privacy Violations: Malicious scripts could read customer passwords, credit card numbers, and PII from form inputs.
• Checkout Breaking Changes: Unvetted scripts crashed checkout during high-traffic flash sales.

Shopify solved this with the Web Pixels API:
• Strict Web Worker Sandboxing: Pixels execute in an isolated thread with zero access to the document DOM or global window.
• Guaranteed Event Delivery: Shopify’s core engine emits events reliably across both theme and checkout surfaces without depending on theme DOM queries.`,
                callout: {
                    type: 'shopify',
                    text: 'Web Pixels run in an isolated worker. You cannot access document.querySelector or window.location directly inside a Web Pixel.',
                },
            },
            {
                heading: 'Subscribing to Standard Customer Events',
                body: `Inside a Web Pixel, developers register subscriptions to standardized Shopify customer lifecycle events via the analytics.subscribe() API:
• product_viewed
• product_added_to_cart
• checkout_started
• checkout_completed

Shopify automatically injects context data: customer privacy consent status, cart line items, variant pricing, and localized currency.`,
                code: `// Custom Web Pixel Implementation
analytics.subscribe('product_added_to_cart', async (event) => {
  const lineItem = event.data.cartLine;
  const productVariant = lineItem.merchandise;
  
  // Send data to your custom analytics endpoint or edge worker
  await fetch('https://telemetry.yourstore.com/v1/event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    keepalive: true,
    body: JSON.stringify({
      eventType: 'atc_conversion',
      timestamp: event.timestamp,
      variantId: productVariant.id,
      productTitle: productVariant.product.title,
      price: productVariant.price.amount,
      currency: productVariant.price.currencyCode
    })
  });
});`,
                language: 'javascript',
            },
            {
                heading: 'Deploying a Custom Web Pixel in Shopify Admin',
                body: `Deploying a Web Pixel is straightforward and requires zero theme file edits:
1. Navigate to Shopify Admin -> Settings -> Customer Events.
2. Click "Add Custom Pixel" and provide an internal name (e.g. "Internal CRO Telemetry").
3. Set Permission Configuration:
   - Data Access: Required for product and cart information.
   - Customer Privacy: Define whether the pixel is strictly necessary or requires marketing/analytics consent.
4. Paste your pixel JavaScript code into the sandbox editor.
5. Click "Save" and then "Connect Pixel" to activate it across both storefront and checkout.`,
                callout: {
                    type: 'tip',
                    text: 'Always test customer event subscriptions in a draft development store using test orders before connecting the pixel on production.',
                },
            },
        ],
        mistakes: [
            'Trying to access \`document.querySelector\` inside a Web Pixel (Web Pixels run in a worker without direct DOM access).',
            'Subscribing to duplicate events in both theme.liquid and the Web Pixels API, causing double-counting.',
        ],
        checklist: [
            'I know how to write an analytics.subscribe() handler.',
            'I understand the Web Pixel execution sandbox limitations.',
        ],
        furtherReading: [
            { title: 'Shopify Web Pixels API Reference', url: 'https://shopify.dev/docs/api/web-pixels-api' },
        ],
    },
    {
        id: 'm3-l4',
        moduleId: 'module-3',
        slug: 'building-a-tracking-plan',
        title: 'Building a Tracking Plan That Engineers Respect',
        estimatedMinutes: 20,
        objectives: [
            'Structure an enterprise-grade tracking plan spreadsheet or schema.',
            'Document event name, trigger, payload properties, and destination for every interaction.',
            'Maintain schema consistency across mobile and desktop interfaces.',
        ],
        videoSource: {
            title: 'Ultimate Shopify CRO Tactics That Actually Increase Revenue',
            embedUrl: 'https://www.youtube-nocookie.com/embed/FjwpmI3qXJU',
            channel: 'Niclas Eckert',
            duration: '5:44',
            description: 'Curated technical CRO masterclass from Niclas Eckert covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Ultimate Shopify CRO Tactics That Actually Increase Revenue'],
        },
        sections: [
            {
                heading: 'Designing an Engineer-Grade Tracking Plan',
                body: `A tracking plan is the single source of truth aligning business questions with technical telemetry. Amateur teams write ad-hoc event tags that pollute databases with inconsistent naming (e.g. click_atc vs addToCart vs ATC).

An enterprise tracking plan maps:
1. Business Objective: "Understand how many users engage with the sizing recommendation drawer."
2. Trigger Mechanism: "User taps .btn-size-drawer on mobile or desktop."
3. Event Name: size_drawer_opened (strictly snake_case).
4. Parameters: product_id, current_variant, device_category.
5. Success Metric: Downstream conversion rate lift for visitors who open the drawer.`,
                callout: {
                    type: 'tip',
                    text: 'Maintain your tracking plan in a shared version-controlled repository or living document. Any PR touching checkout or cart buttons must be verified against the tracking plan.',
                },
            },
            {
                heading: 'Standard Naming Conventions & Required Payloads',
                body: `Enforce strict governance over your event taxonomy:
• Strictly Lowercase Snake_Case: Use drawer_opened, not DrawerOpened or drawer-opened.
• Object-Action Syntax: Name events as noun_verb (e.g. cart_opened, filter_applied, size_selected).
• Type-Safe Parameters: Never pass undefined or null values into analytics pipelines. Always sanitize inputs to prevent downstream pipeline errors.`,
                code: `// Type-Safe Telemetry Dispatcher Pattern
interface SizeGuideEvent {
  productSku: string;
  recommendedSize: string;
  customerSelectedSize: string;
  sourceDrawer: 'pdp_inline' | 'sticky_bar';
}

export function trackSizeRecommendation(payload: SizeGuideEvent) {
  if (typeof window.dataLayer === 'undefined') return;
  
  window.dataLayer.push({
    event: 'size_recommendation_interacted',
    telemetry: {
      sku: payload.productSku,
      recommended: payload.recommendedSize,
      selected: payload.customerSelectedSize,
      source: payload.sourceDrawer,
      timestamp: Date.now()
    }
  });
}`,
                language: 'javascript',
            },
            {
                heading: 'Preventing Duplicate Events & Data Pollution',
                body: `Data pollution ruins statistical analysis. The two most common culprits on Shopify are:
1. Event Bubbling & Multiple Event Listeners:
   Attaching event listeners inside reusable Liquid components that get re-rendered by the Section Rendering API without cleaning up previous listeners. Always use event delegation or remove existing listeners before re-binding.
2. Thank-You Page Refreshes:
   When a customer bookmarks or refreshes their order confirmation page, a naive tracking script will fire purchase a second time.
   Solution: Store the completed order_id in localStorage or check whether order.customer_order_count indicates a first-time view.`,
                callout: {
                    type: 'warning',
                    text: 'Always guard purchase events by checking if (localStorage.getItem("tracked_" + orderId)) return; to prevent order duplication on receipt page reloads.',
                },
            },
        ],
        mistakes: [
            'Allowing marketing teams to invent arbitrary event names without engineering review.',
            'Tracking clicks instead of successful business state mutations.',
        ],
        checklist: [
            'I can author a 4-column tracking plan specification.',
            'I enforce type checking on dataLayer event payloads.',
        ],
        furtherReading: [
            { title: 'Segment: How to Create a Tracking Plan', url: 'https://segment.com/analytics-academy' },
        ],
    },
    {
        id: 'm3-l5',
        moduleId: 'module-3',
        slug: 'consent-gdpr-and-what-you-cannot-track',
        title: 'Consent, GDPR, and What You Cannot Track',
        estimatedMinutes: 25,
        objectives: [
            'Comply with GDPR, CCPA, and ePrivacy tracking regulations.',
            'Integrate Shopify Customer Privacy API with consent banners.',
            'Implement Google Consent Mode v2 without losing aggregate modeling.',
        ],
        videoSource: {
            title: 'How to Add Cookie Consent to Shopify (GDPR Compliant) 2025',
            embedUrl: 'https://www.youtube-nocookie.com/embed/YfP-N2Ubnno',
            channel: 'Holden Digital',
            duration: '4:38',
            description: 'Curated technical CRO masterclass from Holden Digital covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['How to Add Cookie Consent to Shopify (GDPR Compliant) 2025'],
        },
        sections: [
            {
                heading: 'The Shopify Customer Privacy API & Google Consent Mode v2',
                body: `Modern privacy regulations (GDPR in Europe, CCPA in California) require explicit opt-in consent before tracking non-essential cookies. Furthermore, Google mandated Google Consent Mode v2 for all traffic running Google Ads and GA4 in the EEA.
Shopify provides the Customer Privacy API (window.Shopify.customerPrivacy) to govern cookie tracking natively:
• Consent Tiers: analytics, marketing, preferences, sale_of_data.
• Automatic Gating: Web Pixels declared as "Analytics" or "Marketing" are automatically blocked by Shopify until the visitor grants consent in a compliant banner.
• Consent Mode v2 Signals: You must dispatch 4 granular signals to Google tags:
  1. ad_storage: Storage related to advertising.
  2. analytics_storage: Storage related to usage analytics.
  3. ad_user_data: Consent to send user data for advertising purposes to Google.
  4. ad_personalization: Consent for personalized advertising (remarketing).`,
                callout: {
                    type: 'shopify',
                    text: 'Never manually set tracking cookies before verifying window.Shopify.customerPrivacy.userCanBeTracked(). Violations can trigger massive regulatory penalties under GDPR and lose conversion modeling in Google Ads.',
                },
            },
            {
                heading: 'Implementing Google Consent Mode v2 with Customer Privacy API',
                body: `Before any tracking scripts or GTM load, set the default Consent Mode v2 state to 'denied' in your layout/theme.liquid <head>. Then, listen for Shopify's visitorConsentCollected event to update permissions dynamically:`,
                code: `<!-- 1. Place in <head> BEFORE Google Tag Manager or gtag.js -->
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  
  // Set default Consent Mode v2 states to 'denied'
  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'analytics_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'wait_for_update': 500
  });
  
  // 2. Synchronize when merchant consent banner collects shopper choice
  document.addEventListener('visitorConsentCollected', function(event) {
    const consent = event.detail;
    const analyticsGranted = consent.analyticsAllowed ? 'granted' : 'denied';
    const marketingGranted = consent.marketingAllowed ? 'granted' : 'denied';

    gtag('consent', 'update', {
      'analytics_storage': analyticsGranted,
      'ad_storage': marketingGranted,
      'ad_user_data': marketingGranted,
      'ad_personalization': marketingGranted
    });

    console.log('[Consent Mode v2] Updated:', { analyticsGranted, marketingGranted });
  });
</script>`,
                language: 'html',
            },
            {
                heading: 'Graceful Degradation When Cookies Are Rejected',
                body: `When a visitor clicks "Reject All" on a cookie banner, your storefront must continue functioning flawlessly:
• What Breaks Naively: Third-party apps that crash or throw uncaught JavaScript exceptions when localStorage or cookies are restricted.
• Best Practice Architecture: Wrap all storage access in try/catch blocks with memory-based fallback stores.
• Conversion Functionality: Core purchasing (adding to cart, selecting variants, navigating collections) must never depend on tracking cookies. Only telemetry beacons should be silenced.`,
                code: `// Safe Storage Access Wrapper for Strict Privacy Environments
export function safeGetStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch (e) {
    // Storage access blocked by browser privacy settings
    console.warn('LocalStorage blocked by privacy policy; using memory fallback');
    return null;
  }
}

export function canTrackAnalytics(): boolean {
  if (typeof window.Shopify?.customerPrivacy?.userCanBeTracked === 'function') {
    return window.Shopify.customerPrivacy.userCanBeTracked();
  }
  return true; // Default fallback if API not present
}`,
                language: 'javascript',
            },
            {
                heading: 'Navigating Apple Safari ITP & Browser Ad-Blockers',
                body: `Over 70% of Shopify mobile traffic runs on iOS Safari, which enforces Apple’s Intelligent Tracking Prevention (ITP):
• 7-Day / 24-Hour Cookie Caps: Client-side cookies set via document.cookie are capped to 7 days (or 24 hours if coming from link decorators like fbclid).
• Cross-Site Tracking Blocked: Third-party cookies are completely blocked.
• Ad-Blocker Prevalence: 15% to 30% of desktop and Android shoppers run uBlock Origin, Brave, or AdGuard, which block standard Google and Meta collection URLs.
• The Solution: First-party server-side tracking (Server-Side GTM / Meta Conversions API) where tracking beacons are sent from the store’s own primary domain (e.g. data.yourstore.com).`,
                callout: {
                    type: 'tip',
                    text: 'Server-side tracking through a first-party subdomain bypasses browser ad-blockers and preserves attribution cookies across iOS Safari sessions.',
                },
            },
        ],
        mistakes: [
            'Firing Meta or TikTok pixels on page load prior to receiving user consent.',
            'Storing Personally Identifiable Information (PII) such as unhashed emails in Google Analytics events.',
        ],
        checklist: [
            'I know how to hook into window.Shopify.customerPrivacy.',
            'I know which data parameters are illegal under GDPR.',
        ],
        furtherReading: [
            { title: 'Shopify Customer Privacy API Docs', url: 'https://shopify.dev/docs/api/consent-tracking' },
        ],
    },
    // MODULE 4: Research & Friction Mapping
    {
        id: 'm4-l1',
        moduleId: 'module-4',
        slug: 'quantitative-research-funnels-heatmaps-recordings',
        title: 'Quantitative Research: Funnels, Heatmaps, Recordings',
        estimatedMinutes: 20,
        objectives: [
            'Extract behavioral trends from session recordings and heatmaps (Hotjar, Microsoft Clarity).',
            'Identify rage clicks, dead clicks, and rapid scroll reversals.',
            'Synthesize quantitative metrics with recorded user behavior.',
        ],
        videoSource: {
            title: 'How to Do a Shopify CRO Audit With AI (Full Guide)',
            embedUrl: 'https://www.youtube-nocookie.com/embed/Gx52PH1L5F4',
            channel: 'Davie Fogarty Mentors',
            duration: '11:43',
            description: 'Curated technical CRO masterclass from Davie Fogarty Mentors covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['How to Do a Shopify CRO Audit With AI (Full Guide)'],
        },
        sections: [
            {
                heading: 'GA4 Funnel Exploration for Friction Discovery',
                body: `Quantitative CRO begins with GA4 Funnel Exploration reports. Unlike standard pre-packaged reports, custom funnel explorations reveal:
1. Closed vs. Open Funnels: Enforce strict step order to see where users genuinely drop off.
2. Dimension Breakdown: Segment funnels by Device Category (Mobile vs Desktop), Traffic Channel, and Country to locate isolated friction pools.
3. Abandonment Velocity: Calculate the elapsed time between funnel steps. If the median time between view_item and add_to_cart is over 3 minutes, users are experiencing sizing uncertainty or hunting for missing shipping info.`,
                callout: {
                    type: 'tip',
                    text: 'Always create separate funnels for Mobile and Desktop. A funnel combining both hides mobile friction behind higher desktop conversion averages.',
                },
            },
            {
                heading: 'Interpreting Click & Scroll Heatmaps Without Visual Bias',
                body: `Heatmaps (Hotjar, Microsoft Clarity) are frequently misinterpreted by junior developers:
• The Scroll Depth Illusion: On mobile, 90% of visitors see the top 500px, but only 25% scroll past 2,500px. If critical reassurance (money-back guarantee, size chart, ingredient details) is buried at 3,500px, 75% of your buyers never know it exists.
• False Click Density: A bright red cluster on a non-clickable heading or image indicates customer confusion. Users expect it to zoom or link to more details.
• Phantom Attention: Do not assume high mouse dwell time equals interest; it often indicates cognitive strain (users re-reading confusing return policies).`,
                callout: {
                    type: 'warning',
                    text: 'If a non-clickable element has high click density in heatmaps, either make it interactive or remove the affordance (e.g. remove borders and underlines that mimic buttons).',
                },
            },
            {
                heading: 'Filtering Session Recordings: Rage Clicks & Technical Errors',
                body: `Watching random session recordings is a waste of time. Filter recordings systematically using technical friction signals:
• Rage Clicks: 3+ rapid clicks within 1 second on a single element. Common causes: disabled Add to Cart button when a required variant isn't selected, or slow Ajax cart responses making the user think their tap didn't register.
• Dead Clicks: Clicks that produce zero DOM change or network activity.
• JavaScript Error Filtering: Filter sessions where window.onerror fired to catch device-specific checkout bugs that don't appear in local staging environments.`,
                code: `// Client-Side Rage Click Detection Telemetry
let clickCount = 0;
let lastClickTime = 0;

document.addEventListener('click', (e) => {
  const now = Date.now();
  if (now - lastClickTime < 500) {
    clickCount++;
    if (clickCount >= 3) {
      console.warn('Rage click detected on element:', e.target);
      // Dispatch telemetry event to recording platform
      if (typeof window.clarity === 'function') {
        window.clarity('set', 'rage_click_element', (e.target as HTMLElement).tagName);
      }
      clickCount = 0;
    }
  } else {
    clickCount = 1;
  }
  lastClickTime = now;
});`,
                language: 'javascript',
            },
        ],
        mistakes: [
            'Watching random session recordings for hours without a focused hypothesis or segment filter.',
            'Assuming heatmaps alone prove what users want (clicking a menu does not mean the menu is good).',
        ],
        checklist: [
            'I know how to filter session recordings by rage clicks and drop-offs.',
            'I can distinguish between dead clicks and active engagement.',
        ],
        furtherReading: [
            { title: 'Microsoft Clarity Heatmaps Guide', url: 'https://clarity.microsoft.com' },
        ],
    },
    {
        id: 'm4-l2',
        moduleId: 'module-4',
        slug: 'qualitative-research-surveys-interviews-support-reviews',
        title: 'Qualitative Research: Surveys, Support Tickets, Reviews',
        estimatedMinutes: 25,
        objectives: [
            'Mine customer support tickets and 1-star to 3-star reviews for conversion blockers.',
            'Deploy targeted on-site micro-surveys (intent and exit surveys).',
            'Translate customer verbatim complaints into testable developer solutions.',
        ],
        videoSource: {
            title: 'Shopify CRO Tips to increase Revenue in 2026 - Proven CRO Strategies 🚀',
            embedUrl: 'https://www.youtube-nocookie.com/embed/MXRRUSpVnzc',
            channel: 'Louis Jordon Smith Shopify Consultant  📈',
            duration: '12:34',
            description: 'Curated technical CRO masterclass from Louis Jordon Smith Shopify Consultant  📈 covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Shopify CRO Tips to increase Revenue in 2026', 'Proven CRO Strategies 🚀'],
        },
        sections: [
            {
                heading: 'Mining Customer Support Logs & Live Chat for Friction',
                body: `Customer support tickets (Gorgias, Zendesk) and live chat transcripts are goldmines of pre-purchase friction:
• Pre-Purchase Inquiries: Categorize tickets into Sizing, Shipping Timelines, Compatibility, and Payment Issues.
• Sizing Anxiety: If 30% of pre-purchase chats ask "Does this run true to size?", the PDP size guide is failing. Adding a prominent "Model is 6'1" wearing size L" line directly under the variant picker eliminates hundreds of support tickets while lifting conversion.
• Shipping Objections: If customers repeatedly ask "Will this arrive by Friday?", your theme lacks dynamic delivery promise estimation.`,
                callout: {
                    type: 'tip',
                    text: 'Every pre-purchase support ticket represents 50 other visitors who had the exact same question but simply abandoned the store without asking.',
                },
            },
            {
                heading: 'Analyzing 1-to-3 Star Reviews to Extract Objections',
                body: `Do not optimize stores based on 5-star praise; optimize based on 1-to-3 star customer reviews:
1. Export review database (Okendo, Yotpo, Judge.me) to CSV.
2. Group negative reviews into thematic clusters:
   - "Fabric was thinner than expected" -> Need high-res closeup zoom and fabric weight callout (e.g. "Heavyweight 280 GSM cotton").
   - "Took 3 weeks to arrive" -> Need explicit shipping transparency on the PDP before the ATC button.
   - "Difficult to assemble" -> Need embedded video guide tab.
Addressing real customer objections directly in the PDP layout eliminates hesitation before it forms.`,
                callout: {
                    type: 'note',
                    text: 'Turn customer review quotes into positive reassurance copy on the PDP (e.g. "Over 1,200 verified buyers say this fits true to size").',
                },
            },
            {
                heading: 'Designing High-Response Post-Purchase Micro-Surveys',
                body: `Traditional email surveys suffer from dismal 2%–4% response rates. Modern CRO uses 1-question post-purchase micro-surveys embedded directly on the order confirmation page:
• The Magic Question: "What was the one thing that almost stopped you from buying today?"
• Why it converts at 30%+: The customer is already authenticated, in an endorphin-fueled buying state, and has nothing to lose.
• Open-Text vs Multiple Choice: Start with open-text for the first 100 responses to uncover unknown objections, then convert the top answers into a multi-choice radio list for high-velocity tracking.`,
                code: `// Post-Purchase Micro-Survey Data Submission
async function submitPostPurchaseSurvey(orderId: string, objectionReason: string) {
  try {
    await fetch('/apps/cro-telemetry/survey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId,
        question: 'What almost prevented your purchase?',
        answer: objectionReason,
        timestamp: new Date().toISOString()
      })
    });
  } catch (err) {
    console.error('Failed to submit post-purchase feedback:', err);
  }
}`,
                language: 'javascript',
            },
        ],
        mistakes: [
            'Ignoring negative reviews or treating them only as customer service issues rather than UX issues.',
            'Asking survey questions with leading language that biases the answers.',
        ],
        checklist: [
            'I can audit 50 customer reviews and categorize objections into friction buckets.',
            'I know the right questions to ask in an on-site exit survey.',
        ],
        furtherReading: [
            { title: 'Nielsen Norman Group: Qualitative Research Basics', url: 'https://www.nngroup.com' },
        ],
    },
    {
        id: 'm4-l3',
        moduleId: 'module-4',
        slug: 'heuristic-analysis-the-7-friction-categories',
        title: 'Heuristic Analysis: The 7 Friction Categories',
        estimatedMinutes: 25,
        objectives: [
            'Apply the MECLABS heuristic conversion formula: C = 4m + 3v + 2(i-f) - 2a.',
            'Audit store surfaces across the 7 friction categories: Clarity, Relevance, Value, Friction, Anxiety, Distraction, and Urgency.',
            'Classify UX bugs by severity and commercial impact.',
        ],
        videoSource: {
            title: 'E-commerce Heuristic Audit & Friction Mapping Masterclass',
            embedUrl: 'https://www.youtube-nocookie.com/embed/XmSyJgOhpPY',
            channel: 'Convert.com',
            duration: '12:31',
            description: 'Curated technical CRO masterclass covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Heuristic Analysis', 'Friction Mapping', 'MECLABS Formula', 'UX Auditing'],
        },
        sections: [
            {
                heading: 'The 7 Friction Categories in Heuristic Analysis',
                body: `Heuristic analysis is the structured expert evaluation of a store against established behavioral guidelines. We evaluate every template across 7 friction categories:

1. Clarity: Is the value proposition and pricing instantly understandable within 3 seconds?
2. Relevance: Does the page content match the visitor's intent and upstream ad creative?
3. Distraction: Are there competing banners, spinning wheels, or uncoordinated popups pulling attention away from the primary CTA?
4. Urgency: Is there honest, credible motivation to purchase now rather than later?
5. Value: Does the perceived benefit clearly outweigh the financial cost?
6. Friction: How much physical and cognitive effort is required to complete checkout?
7. Anxiety: Are there credible trust seals, clear return policies, and transparent shipping fees?`,
                callout: {
                    type: 'tip',
                    text: 'A good heuristic evaluation identifies not just what looks visually dated, but where cognitive strain or physical frustration causes visitor abandonment.',
                },
            },
            {
                heading: 'Grading Storefront Templates Against an Objective Rubric',
                body: `Never rely on subjective statements like "The cart looks cluttered." Senior CRO engineers score every major storefront surface on an objective 1-to-5 rubric:
• Score 1 (Severe Friction): Element actively confuses users or breaks on mobile viewports.
• Score 3 (Standard Baseline): Meets basic ecommerce expectations but lacks trust reassurance or proactive objection handling.
• Score 5 (Optimized Engine): Friction-free, thumb-zone optimized, instant feedback, and transparent guarantees.

Audit Rubric Matrix:
- Collection Grid: Faceted filtering, pricing clarity, badge hierarchy, Quick Add ergonomics.
- PDP Above-The-Fold: Gallery velocity, title/price proximity, variant swatch clarity, sticky ATC.
- Cart Drawer: Threshold shipping bar, checkout button prominent without scrolling, clear payment badges.`,
                callout: {
                    type: 'warning',
                    text: 'Score templates separately for Desktop and Mobile. A PDP that scores 5 on desktop often scores 2 on an iPhone due to viewport clutter.',
                },
            },
            {
                heading: 'Documenting Findings with Severity Rankings',
                body: `Every heuristic observation must be documented with an actionable severity ranking:
• Critical (P0): Direct blocker preventing order completion (e.g. checkout button hidden beneath dynamic cookie banner on iOS).
• High (P1): Major friction point affecting a large traffic segment (e.g. no size chart on mobile apparel PDP).
• Medium (P2): Sub-optimal layout causing cognitive hesitation (e.g. accordion tabs collapsed by default hiding critical warranty info).
• Low (P3): Minor visual polish or cosmetic alignment.

Each ticket must include: URL, Device/Viewport, Reproduction Steps, Heuristic Violation Category, and Proposed Technical Solution.`,
                code: `// Heuristic Audit Observation Template
export interface HeuristicAuditItem {
  id: string;
  template: 'product.json' | 'collection.json' | 'cart-drawer' | 'checkout';
  category: 'Clarity' | 'Relevance' | 'Distraction' | 'Urgency' | 'Value' | 'Friction' | 'Anxiety';
  severity: 'P0_CRITICAL' | 'P1_HIGH' | 'P2_MEDIUM' | 'P3_LOW';
  observedIssue: string;
  reproductionSteps: string[];
  recommendedFix: string;
  expectedMetricImpact: string;
}`,
                language: 'javascript',
            },
        ],
        mistakes: [
            'Confusing personal aesthetic taste with heuristic usability analysis.',
            'Treating manufactured fake urgency ("Only 1 left! 400 people watching!") as good CRO (it degrades trust).',
        ],
        checklist: [
            'I can systematically evaluate a page across all 7 heuristic dimensions.',
            'I can assign severity scores (Critical, High, Medium, Low) to audit findings.',
        ],
        furtherReading: [
            { title: 'MECLABS Conversion Heuristic Formula', url: 'https://meclabs.com' },
        ],
    },
    {
        id: 'm4-l4',
        moduleId: 'module-4',
        slug: 'ux-laws-that-drive-cro',
        title: 'UX Laws That Drive CRO (Hick, Fitts, Cognitive Load)',
        estimatedMinutes: 20,
        objectives: [
            'Apply Hick’s Law to simplify collection filters and variant pickers.',
            'Apply Fitts’s Law to mobile sticky Add-to-Cart buttons and tap targets.',
            'Minimize cognitive load using visual chunking and progressive disclosure.',
        ],
        videoSource: {
            title: 'Laws of UX: Hick\'s Law (with examples!)',
            embedUrl: 'https://www.youtube-nocookie.com/embed/JtGFzldf6Uk',
            channel: 'AM Design',
            duration: '14:58',
            description: 'Curated technical CRO masterclass from AM Design covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Laws of UX: Hick\'s Law (with examples!)'],
        },
        sections: [
            {
                heading: 'Hick’s Law: Streamlining Variant Pickers & Filter Trees',
                body: `Hick’s Law states that the time it takes to make a decision increases logarithmically with the number and complexity of choices:
T = b · log2(n + 1)

In Shopify stores, excessive options trigger Analysis Paralysis:
• Collection Filters: Presenting 40 uncurated filter options causes visitors to abandon filtering altogether. Pruning to the top 5 high-intent attributes (Size, Color, Price Range, In-Stock) increases filter engagement by 32%.
• Variant Swatches: If a t-shirt comes in 24 colors, displaying 24 tiny circular swatches overwhelms mobile screens.
• Best Practice Solution: Group swatches by tone (Neutrals, Vibrant, Pastels) or feature the 6 best-selling colors with a "+18 more" progressive disclosure toggle.`,
                callout: {
                    type: 'tip',
                    text: 'Every additional choice presented to a customer increases the cognitive friction of making any decision at all. Curate ruthlessly.',
                },
            },
            {
                heading: 'Fitts’s Law: Mobile Thumb-Zone Ergonomics & Sticky CTAs',
                body: `Fitts’s Law dictates that the time required to rapidly move to a target area is a function of the ratio between the distance to the target and the width of the target:
MT = a + b · log2(2D / W)

Mobile Engineering Applications:
1. Touch Target Dimensions: All interactive buttons and variant swatches must maintain a minimum physical touch target of 44x44px (WCAG 2.2 AAA standard) with at least 8px of separation.
2. The Thumb-Zone Physics: On a 6.7" smartphone, the bottom 30% of the screen is effortless to reach with one hand. The top 20% requires awkward hand repositioning.
3. Sticky Bottom Buy Bar: When the native Add-to-Cart scrolls out of view, slide up a sticky bar anchored to the bottom edge. By placing the target at distance D = 0 from the customer's resting thumb position, Fitts’s Law proves interaction velocity is maximized.`,
                code: `/* Fitts-Compliant Mobile Touch Target & Safe Area Styling */
.mobile-sticky-atc-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 12px 16px;
  padding-bottom: max(12px, env(safe-area-inset-bottom));
  background: #ffffff;
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.08);
  z-index: 99;
}

.mobile-sticky-atc-button {
  min-height: 48px; /* Exceeds 44px Fitts requirement */
  width: 100%;
  border-radius: 8px;
  font-size: 16px; /* Prevents iOS Safari input zoom */
  touch-action: manipulation; /* Eliminates 300ms tap delay */
}`,
                language: 'css',
            },
            {
                heading: 'Cognitive Load & Progressive Disclosure in Liquid',
                body: `Working memory can only hold 7 ± 2 chunks of information simultaneously (Miller’s Law). Dumping 1,500 words of unformatted text onto a mobile PDP triggers cognitive fatigue:
• Progressive Disclosure: Present only essential primary details upfront (Title, Price, Star Rating, Variant Picker, ATC).
• Chunking Specifications: Encapsulate detailed product dimensions, care instructions, and return policies inside native HTML5 <details> and <summary> accordion elements.
• Benefit: Content is immediately indexable by search engines for SEO, but visual cognitive load remains lightweight and uncluttered for mobile shoppers.`,
                code: `{% comment %} Native Accessible Accordion Chunking {% endcomment %}
<div class="product-spec-accordions">
  <details class="spec-accordion" open>
    <summary class="spec-summary">
      <span>Key Product Features</span>
      <span class="icon-toggle" aria-hidden="true">+</span>
    </summary>
    <div class="spec-content">
      {{ product.description }}
    </div>
  </details>

  <details class="spec-accordion">
    <summary class="spec-summary">
      <span>Shipping & Free 30-Day Returns</span>
      <span class="icon-toggle" aria-hidden="true">+</span>
    </summary>
    <div class="spec-content">
      <p>Orders ship within 24 hours. Free prepaid return labels included in all US shipments.</p>
    </div>
  </details>
</div>`,
                language: 'liquid',
            },
        ],
        mistakes: [
            'Placing the primary mobile ATC button out of thumb reach at the top of a 3000px long scrolling PDP.',
            'Presenting 40 unorganized variant swatches without grouping by color or size.',
        ],
        checklist: [
            'I know how to design tap targets that satisfy Fitts’s Law on mobile (minimum 44x44px).',
            'I can apply progressive disclosure to reduce page clutter.',
        ],
        furtherReading: [
            { title: 'Laws of UX Directory', url: 'https://lawsofux.com' },
        ],
    },
    {
        id: 'm4-l5',
        moduleId: 'module-4',
        slug: 'writing-a-cro-audit-that-engineers-respect',
        title: 'Writing a CRO Audit That Engineers Respect',
        estimatedMinutes: 20,
        objectives: [
            'Format CRO audit findings into actionable, engineer-ready task specifications.',
            'Pair every observed problem with evidence (screenshots, metrics) and technical recommendations.',
            'Estimate engineering effort alongside expected business impact.',
        ],
        videoSource: {
            title: 'Shopify CRO Audit | Watch Me Increase Conversions For This Hemp Protein Brand',
            embedUrl: 'https://www.youtube-nocookie.com/embed/KxnBLujnpUE',
            channel: 'Arsh Sanwarwala | ThrillX',
            duration: '5:58',
            description: 'Curated technical CRO masterclass from Arsh Sanwarwala | ThrillX covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Shopify CRO Audit', 'Watch Me Increase Conversions For This Hemp Protein Brand'],
        },
        sections: [
            {
                heading: 'Structuring an Executive-Grade CRO Audit Deliverable',
                body: `An effective CRO audit bridges the gap between executive business goals and daily engineering sprints:
1. Executive Summary: High-level financial opportunity, baseline store metrics (CVR, AOV, RPS), and annualized revenue growth potential.
2. The Funnel Leakage Breakdown: Visual drop-off map identifying the single biggest drop-off point in the customer journey.
3. Prioritized Opportunity Matrix: Ranked table of recommendations scored by ICE or RICE.
4. Detailed Technical Specification Sheets: Developer-ready blueprints with exact DOM selectors, proposed code changes, and verification criteria.`,
                callout: {
                    type: 'tip',
                    text: 'Founders care about revenue and risk; engineers care about clean reproduction steps and precise acceptance criteria. A great audit delivers both.',
                },
            },
            {
                heading: 'Writing Developer-Ready Issue Tickets',
                body: `Never write vague audit recommendations like "Make the size chart easier to find." Developers will deprioritize or misinterpret it.
Structure each ticket with complete engineering specifications:
• Affected Template: templates/product.json -> sections/main-product.liquid
• Exact CSS Selector: .product-form__input--size
• Viewport & Device: Mobile iOS Safari (< 480px width)
• Current Behavior: Static plain text size guide triggers page navigation away from PDP.
• Required Behavior: Clicking size guide opens a modal bottom-sheet drawer with US/EU toggle without page reload.
• Acceptance Criteria:
  1. Drawer opens in < 100ms.
  2. Escape key and backdrop click closes drawer.
  3. Body scroll is locked while drawer is open.`,
                code: `// Sample Engineering Ticket Schema
export interface CroEngineeringTicket {
  ticketId: string;
  title: string;
  templateFile: string;
  cssSelector: string;
  targetDevice: 'mobile_only' | 'desktop_only' | 'all';
  currentFriction: string;
  proposedSolution: string;
  acceptanceCriteria: string[];
  analyticsEventToFire: string;
}`,
                language: 'javascript',
            },
            {
                heading: 'Calculating Expected Commercial Impact & Annualized Lift',
                body: `Every recommendation in your CRO audit must justify its development cost with a projected financial return model:
• Baseline Metrics: Monthly Sessions = 80,000 | Current CVR = 2.10% | AOV = $85.00
• Monthly Gross Revenue = 80,000 × 0.021 × $85 = $142,800
• Conservative Test Lift Estimate: +7% relative lift on CVR (new CVR = 2.247%)
• New Monthly Gross Revenue = 80,000 × 0.02247 × $85 = $152,796 (+$9,996 / month)
• Annualized Top-Line Impact = $9,996 × 12 = $119,952 in new revenue with zero ad spend increase!

Presenting exact revenue modeling turns an engineering proposal into an undeniable executive investment.`,
                callout: {
                    type: 'note',
                    text: 'Always present conservative, moderate, and aggressive lift scenarios (e.g. 4%, 8%, 12%) so clients see realistic expected return ranges.',
                },
            },
        ],
        mistakes: [
            'Delivering 80-page slide decks with generic tips instead of prioritized GitHub/Linear issues.',
            'Failing to specify viewport constraints or device specifics in bug reports.',
        ],
        checklist: [
            'I can format an audit item into a high-quality technical ticket.',
            'I can prioritize findings by Effort vs Impact.',
        ],
        furtherReading: [
            { title: 'Linear Method: Writing High Quality Issues', url: 'https://linear.app/method' },
        ],
    },
];
