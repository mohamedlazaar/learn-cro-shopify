import { Quiz } from '../types/curriculum';
import { SHOPIFY_DEV_QUIZZES } from './shopifyDevQuizzes';

const CRO_QUIZZES: Quiz[] = [
  // Module 1
  {
    id: 'quiz-module-1',
    moduleId: 'module-1',
    slug: 'quiz-module-1',
    title: 'Module 1 Quiz: CRO & Ecommerce Fundamentals',
    questions: [
      {
        question: 'Why is evaluating an optimization program purely by Conversion Rate (CVR) dangerous?',
        options: [
          'Because CVR does not account for changes in Average Order Value (AOV) or gross margin.',
          'Because CVR is impossible to calculate reliably on Shopify.',
          'Because CVR always stays flat regardless of changes made to the store.',
          'Because Google Analytics cannot track orders.',
        ],
        correctIndex: 0,
        explanation: 'A store can artificially inflate CVR by offering massive discounts, but gross profit and Revenue Per Session (RPS) will decline. RPS = CVR × AOV.',
      },
      {
        question: 'If a store has 40,000 sessions, 1,000 orders, and $80,000 in revenue, what is its Revenue Per Session (RPS)?',
        options: [
          '$0.50',
          '$2.00',
          '$80.00',
          '$4.00',
        ],
        correctIndex: 1,
        explanation: 'RPS = Total Revenue / Total Sessions = $80,000 / 40,000 = $2.00 (or CVR 2.5% * $80 AOV = $2.00).',
      },
      {
        question: 'What is the standard mathematical definition of Checkout Abandonment Rate?',
        options: [
          '(Sessions - Orders) / Sessions * 100%',
          '(Carts Created - Orders) / Carts Created * 100%',
          '(Checkouts Started - Orders) / Checkouts Started * 100%',
          '(Product Views - Add to Carts) / Product Views * 100%',
        ],
        correctIndex: 2,
        explanation: 'Checkout Abandonment strictly evaluates drop-off after a user initiates checkout: ((Checkouts Started - Orders) / Checkouts Started) * 100%.',
      },
      {
        question: 'Which of the following is considered a micro-conversion rather than a macro-conversion?',
        options: [
          'Completing order payment and reaching the Thank You page',
          'A customer placing a wholesale order over the phone',
          'Adding a variant item to the cart drawer',
          'Reaching a recurring subscription billing cycle',
        ],
        correctIndex: 2,
        explanation: 'Adding to cart is an intermediate micro-conversion signaling intent, whereas placing a completed order is the macro-conversion.',
      },
      {
        question: 'What is a realistic relative lift target for a well-designed ecommerce A/B test?',
        options: [
          '5% to 15% relative lift',
          '150% to 300% relative lift',
          '80% to 100% relative lift',
          '0.1% to 0.5% relative lift',
        ],
        correctIndex: 0,
        explanation: 'In professional experimentation, high-impact winning tests typically generate 5% to 15% relative lift. Claims of 200%+ lifts from button color tweaks are marketing fiction.',
      },
    ],
  },

  // Module 2
  {
    id: 'quiz-module-2',
    moduleId: 'module-2',
    slug: 'quiz-module-2',
    title: 'Module 2 Quiz: Shopify CRO Surface Area',
    questions: [
      {
        question: 'What is the primary technical limitation on non-Plus Shopify checkouts regarding custom CRO scripts?',
        options: [
          'Custom JavaScript cannot be injected into checkout.myshopify.com on non-Plus plans.',
          'You cannot change the store logo in checkout.',
          'Discounts cannot be applied on non-Plus stores.',
          'Non-Plus stores cannot accept credit card payments.',
        ],
        correctIndex: 0,
        explanation: 'Arbitrary DOM scripts are blocked across checkout for PCI compliance and security. Checkout customizations are restricted to Checkout Extensibility (UI Extensions on Plus, Branding API on all plans).',
      },
      {
        question: 'How can a Shopify developer update cart drawer contents dynamically without breaking CDN full-page caching?',
        options: [
          'Add randomized query strings (?nocache=1) to all store URLs.',
          'Use the Shopify Section Rendering API (?sections=cart-drawer) via AJAX.',
          'Disable caching in the Shopify Admin settings.',
          'Write custom server-side sessions in Ruby.',
        ],
        correctIndex: 1,
        explanation: 'The Section Rendering API returns rendered HTML for specific Liquid sections via AJAX, preserving global CDN edge caching on product and collection pages.',
      },
      {
        question: 'Where do Shopify Checkout UI Extensions execute?',
        options: [
          'Directly in the main browser thread alongside theme.liquid scripts',
          'In an isolated Web Worker sandbox using Shopify UI components',
          'On an external Node.js server proxying every user click',
          'Inside an unconstrained iframe with full access to window.parent',
        ],
        correctIndex: 1,
        explanation: 'Checkout UI Extensions run inside an isolated Web Worker sandbox to ensure checkout speed, security, and stability.',
      },
      {
        question: 'Which page should receive the majority of CRO focus for paid social traffic (Meta/TikTok ads)?',
        options: [
          'The Homepage',
          'The About Us page',
          'The Product Detail Page (PDP) or targeted landing page',
          'The Account login page',
        ],
        correctIndex: 2,
        explanation: 'Over 70% of paid ad traffic lands directly on the PDP or dedicated product landing pages, bypassing the homepage entirely.',
      },
      {
        question: 'Under modern Shopify platform architecture (GraphQL Admin API), what is the maximum number of variants supported per product?',
        options: [
          '100 variants',
          '250 variants',
          '2,048 variants (with up to 3 option dimensions)',
          'Unlimited variants with unlimited options',
        ],
        correctIndex: 2,
        explanation: 'Shopify expanded the legacy 100-variant limit up to 2,048 variants per product via GraphQL Admin API (resourceLimits.maxProductVariants), while maintaining a 3-option dimension cap. Unpaginated storefront Liquid loops render up to 250 variants before requiring Storefront API queries, and Combined Listings links multi-product catalogs natively.',
      },
    ],
  },

  // Module 3
  {
    id: 'quiz-module-3',
    moduleId: 'module-3',
    slug: 'quiz-module-3',
    title: 'Module 3 Quiz: Analytics & Tracking',
    questions: [
      {
        question: 'Why do Google Analytics 4 order numbers almost always lag behind Shopify Admin order counts by 8–18%?',
        options: [
          'Because Shopify generates fake orders in the database.',
          'Because GA4 is blocked by ad blockers, cookie consent rejections, and browser privacy restrictions like Apple ITP.',
          'Because GA4 only tracks orders placed on desktop computers.',
          'Because Shopify charges a fee to send orders to Google.',
        ],
        correctIndex: 1,
        explanation: 'Ad blockers, Safari ITP 7-day cookie caps, and user consent rejections prevent client-side Google tags from firing for a subset of users.',
      },
      {
        question: 'In the Shopify Web Pixels API, what is the correct method to listen for customer activity?',
        options: [
          'document.addEventListener("shopify:order", ...)',
          'analytics.subscribe(eventName, callback)',
          'window.onShopifyEvent = ...',
          'Shopify.track(eventName)',
        ],
        correctIndex: 1,
        explanation: 'The Web Pixels API exposes the global `analytics.subscribe(eventName, callback)` method inside the pixel sandbox.',
      },
      {
        question: 'Which event name conforms to the standard Google Analytics 4 recommended ecommerce schema for cart addition?',
        options: [
          'added_item_to_basket',
          'cart_add_success',
          'add_to_cart',
          'ProductAdded',
        ],
        correctIndex: 2,
        explanation: '`add_to_cart` is GA4’s standardized, recommended event name.',
      },
      {
        question: 'Under GDPR and ePrivacy regulations, when is it legal to fire non-essential marketing tracking pixels for EU visitors?',
        options: [
          'Immediately upon page load, as long as a privacy policy exists.',
          'Only AFTER the user gives explicit, affirmative opt-in consent via a compliant banner.',
          'As soon as the user scrolls down 100 pixels.',
          'Anytime, because ecommerce is exempt from GDPR.',
        ],
        correctIndex: 1,
        explanation: 'Non-essential analytics and ad pixels require prior, affirmative opt-in consent for EU/EEA and UK residents.',
      },
      {
        question: 'What is the primary danger of firing `add_to_cart` on button click rather than on successful AJAX response?',
        options: [
          'It double counts orders on the Thank You page.',
          'It records false additions if the server rejects the request (e.g. out of stock or inventory validation failure).',
          'It slows down the browser rendering by 5 seconds.',
          'It breaks Shopify payment processing.',
        ],
        correctIndex: 1,
        explanation: 'If a user clicks Add to Cart on an out-of-stock item, a click listener fires an event even though the cart never changed, skewing funnel metrics.',
      },
    ],
  },

  // Module 4
  {
    id: 'quiz-module-4',
    moduleId: 'module-4',
    slug: 'quiz-module-4',
    title: 'Module 4 Quiz: Research & Friction Mapping',
    questions: [
      {
        question: 'What user behavior in session recordings typically indicates a broken interaction or high friction?',
        options: [
          'Slow scrolling down a 2000px product description',
          'Rage clicking (clicking 3+ times in rapid succession on an element)',
          'Reading customer reviews for 3 minutes',
          'Switching between product images',
        ],
        correctIndex: 1,
        explanation: 'Rage clicks occur when users tap or click repeatedly because the UI does not respond, a button is disabled without explanation, or an element masquerades as clickable.',
      },
      {
        question: 'According to Hick’s Law, what happens to decision time when you reduce a filter menu from 35 options to the top 6?',
        options: [
          'Decision time increases exponentially.',
          'Decision time decreases logarithmically, reducing cognitive fatigue.',
          'Customers stop using the filter completely.',
          'It has no effect on user behavior.',
        ],
        correctIndex: 1,
        explanation: 'Hick\'s Law states that decision time increases with the number and complexity of choices. Simplifying options accelerates decision-making.',
      },
      {
        question: 'What is Fitts’s Law and how does it apply to mobile CRO?',
        options: [
          'Colors determine purchase speed; green buttons convert 50% faster.',
          'Target acquisition time depends on target distance and width; larger, thumb-adjacent buttons are tapped faster and easier.',
          'Users only read the first 3 words of any sentence.',
          'Stores must have fewer than 10 products per page.',
        ],
        correctIndex: 1,
        explanation: 'Fitts\'s Law dictates that interactive targets must be large enough (>= 44x44px) and positioned within easy thumb reach (e.g. sticky bottom ATC).',
      },
      {
        question: 'What is the best source of qualitative data for identifying why customers hesitate to buy a specific product?',
        options: [
          '1-to-3 star customer reviews and customer support ticket logs',
          'Competitor Instagram comments',
          'Google Analytics bounce rate averages',
          'Lighthouse performance scores',
        ],
        correctIndex: 0,
        explanation: 'Critical reviews and support tickets record the exact real-world objections (sizing confusion, shipping uncertainty, material questions) that prevent purchases.',
      },
      {
        question: 'In the MECLABS heuristic conversion formula (C = 4m + 3v + 2(i-f) - 2a), what does "a" represent?',
        options: [
          'Average Order Value',
          'Anxiety (unaddressed consumer fears about returns, security, and hidden fees)',
          'Advertising spend',
          'Analytics accuracy',
        ],
        correctIndex: 1,
        explanation: 'In the MECLABS formula, "a" represents Anxiety (fears of hidden costs, insecure checkout, or difficult returns) which subtracts heavily from conversion probability.',
      },
    ],
  },

  // Module 5
  {
    id: 'quiz-module-5',
    moduleId: 'module-5',
    slug: 'quiz-module-5',
    title: 'Module 5 Quiz: Hypotheses & Prioritization',
    questions: [
      {
        question: 'What are the 5 components of a strong, scientifically testable CRO hypothesis?',
        options: [
          'Problem, Solution, Price, Timeline, Budget',
          'Because [data], We believe [change], For [audience], Will impact [metric], As measured by [guardrail]',
          'Idea, Design, Code, Deploy, Celebrate',
          'Who, What, When, Where, Why',
        ],
        correctIndex: 1,
        explanation: 'A rigorous CRO hypothesis connects empirical evidence (Because) to an intervention (We believe) for a specific cohort (For) driving an outcome (Will impact) with verification (Measured by).',
      },
      {
        question: 'In the ICE scoring framework, what does the "C" represent?',
        options: [
          'Cost to the business',
          'Confidence that the change will succeed based on evidence',
          'Conversion rate percentage',
          'Customer satisfaction',
        ],
        correctIndex: 1,
        explanation: 'ICE stands for Impact, Confidence, and Ease. Confidence measures how strongly real data and research support the hypothesis.',
      },
      {
        question: 'Why should a store with 8,000 monthly sessions avoid running standard A/B tests?',
        options: [
          'Shopify does not allow A/B testing apps on small stores.',
          'Detecting statistically significant lifts with low traffic would require months or years, during which seasonality and baseline drift invalidate results.',
          'Small stores do not need optimization.',
          'A/B testing only works on fashion brands.',
        ],
        correctIndex: 1,
        explanation: 'Low sample sizes lack statistical power. Waiting 18 months for a sample size violates temporal validity and wastes business time.',
      },
      {
        question: 'What should a CRO developer recommend to a low-traffic client instead of slow A/B tests?',
        options: [
          'Run tests with 50% confidence levels instead.',
          'Deploy high-confidence best-practice fixes directly ("Just Do It") and monitor pre/post metrics with qualitative testing.',
          'Stop all development work until traffic reaches 100,000 sessions.',
          'Purchase bot traffic to inflate sample sizes.',
        ],
        correctIndex: 1,
        explanation: 'For low-traffic stores, high-conviction heuristic improvements (JDI) validated by usability testing and pre/post analysis deliver immediate commercial value.',
      },
      {
        question: 'What is a guardrail metric in experiment design?',
        options: [
          'A metric that measures how fast developers write code',
          'A secondary metric monitored to ensure the primary lift is not secretly causing downstream harm (e.g. return rates or AOV)',
          'The maximum number of visitors allowed in a test',
          'A metric used exclusively by security teams',
        ],
        correctIndex: 1,
        explanation: 'Guardrails protect the business. If a test boosts CVR by 5% but spikes returns by 25%, the guardrail prevents a net-negative rollout.',
      },
    ],
  },

  // Module 6
  {
    id: 'quiz-module-6',
    moduleId: 'module-6',
    slug: 'quiz-module-6',
    title: 'Module 6 Quiz: Statistics & Test Design',
    questions: [
      {
        question: 'What is the "Peeking Problem" in A/B testing?',
        options: [
          'Competitors looking at your staging theme code',
          'Checking test significance continuously and stopping the moment p < 0.05, which inflates false positive error rates to 30%+',
          'Looking at customer passwords in session recordings',
          'Viewing the checkout page without purchasing',
        ],
        correctIndex: 1,
        explanation: 'Repeated significance testing (optional stopping) severely distorts Type I error rates. You must commit to sample size before evaluating significance.',
      },
      {
        question: 'What does a statistical power of 80% (β = 0.20) mean?',
        options: [
          'The test has an 80% chance of detecting a true effect of the specified MDE if one actually exists.',
          'The test will increase conversion rate by 80%.',
          '80% of store visitors will see the winning variation.',
          'There is an 80% chance that the result is pure random noise.',
        ],
        correctIndex: 0,
        explanation: 'Statistical power (1 - β) is the probability of correctly rejecting the null hypothesis when a real difference exists.',
      },
      {
        question: 'How does Minimum Detectable Effect (MDE) affect the required sample size?',
        options: [
          'Smaller MDEs require exponentially larger sample sizes (inverse square relationship).',
          'Smaller MDEs require fewer visitors.',
          'MDE has no mathematical relationship to sample size.',
          'A 5% MDE needs half the traffic of a 10% MDE.',
        ],
        correctIndex: 0,
        explanation: 'Sample size scales inversely with the square of the difference (delta²). Halving the MDE requires roughly 4x the sample size.',
      },
      {
        question: 'Why must A/B tests always be run in full 7-day weekly cycles (minimum 14 or 21 days)?',
        options: [
          'Because Shopify servers restart every 7 days.',
          'To control for cyclical weekday vs weekend shopping behaviors and visitor composition.',
          'Because Google Analytics only updates data on Sundays.',
          'To satisfy credit card processing settlement requirements.',
        ],
        correctIndex: 1,
        explanation: 'Purchasing behavior varies significantly between Monday morning work sessions and Saturday night mobile browsing. Full weekly cycles balance this variation.',
      },
      {
        question: 'What is the Novelty Effect in A/B testing?',
        options: [
          'New stores always convert better than established brands.',
          'Existing returning customers interact with a new design element purely because it is unfamiliar, creating an artificial short-term lift that fades over time.',
          'The effect of launching an A/B test on New Year’s Day.',
          'A browser bug in Safari that ignores CSS.',
        ],
        correctIndex: 1,
        explanation: 'Returning visitors notice visual changes immediately, causing a temporary spike in clicks that disappears once the element becomes familiar.',
      },
    ],
  },

  // Module 7
  {
    id: 'quiz-module-7',
    moduleId: 'module-7',
    slug: 'quiz-module-7',
    title: 'Module 7 Quiz: Build an A/B Test Framework',
    questions: [
      {
        question: 'What causes Flash of Unstyled Content (FOOC) or visual flicker in client-side A/B tests?',
        options: [
          'The browser executes HTML rendering before the client-side testing script finishes downloading, evaluating, and mutating the DOM.',
          'Liquid code running too fast on the CDN.',
          'The customer having a slow monitor refresh rate.',
          'Shopify database server restarts.',
        ],
        correctIndex: 0,
        explanation: 'Client-side scripts that run after DOMContentLoaded alter elements after the browser has already painted the Control, creating a jarring visible flash.',
      },
      {
        question: 'How does Edge Middleware testing (e.g. Cloudflare Workers) eliminate test flicker completely?',
        options: [
          'It forces the user to reload the page twice.',
          'It assigns the variation bucket and rewrites the HTML stream or template at the edge before any bytes reach the browser.',
          'It disables CSS rendering on the user device.',
          'It hides the entire page behind a loading spinner for 3 seconds.',
        ],
        correctIndex: 1,
        explanation: 'Edge workers inspect user cookies and return the appropriate HTML version directly from edge memory, rendering immediately with zero flicker.',
      },
      {
        question: 'Where should a minimal, zero-flicker client-side test assignment script be placed in theme.liquid?',
        options: [
          'At the very bottom of the <body> tag before the closing </body>',
          'In the <head> tag synchronously, before stylesheets and body DOM are parsed',
          'In an external async JavaScript file loaded from an external domain',
          'Inside the footer section',
        ],
        correctIndex: 1,
        explanation: 'Synchronous execution in the document head allows immediate CSS class application to documentElement before the body begins rendering.',
      },
      {
        question: 'What is Sample Ratio Mismatch (SRM)?',
        options: [
          'When an A/B test configured for 50/50 split delivers a statistically improbable traffic imbalance (e.g. 55/45 across 20,000 users), signaling a critical technical bug.',
          'When images are rendered in the wrong aspect ratio.',
          'When mobile traffic exceeds desktop traffic.',
          'When orders don\'t match revenue.',
        ],
        correctIndex: 0,
        explanation: 'SRM indicates a broken test implementation (such as one variation crashing on iOS or causing redirect loops), invalidating all test conclusions.',
      },
      {
        question: 'What should be pushed to window.dataLayer the instant a visitor is exposed to a test variation?',
        options: [
          'The user’s full credit card number',
          'An experiment_exposure event containing experiment_id and variant_id',
          'A page_reload command',
          'The entire Shopify theme source code',
        ],
        correctIndex: 1,
        explanation: 'Tracking the exact moment of exposure ensures analytics tools can segment and analyze conversion rates strictly among users who actually encountered the variation.',
      },
    ],
  },

  // Module 8
  {
    id: 'quiz-module-8',
    moduleId: 'module-8',
    slug: 'quiz-module-8',
    title: 'Module 8 Quiz: Performance & Core Web Vitals',
    questions: [
      {
        question: 'On a standard Shopify Product Detail Page (PDP), what is almost always the Largest Contentful Paint (LCP) element?',
        options: [
          'The store navigation menu in the header',
          'The featured product hero image',
          'The customer review star icons',
          'The footer copyright text',
        ],
        correctIndex: 1,
        explanation: 'The primary product hero image occupies the largest above-the-fold visual area, making it the LCP candidate element.',
      },
      {
        question: 'What is the consequence of adding `loading="lazy"` to the main above-the-fold product hero image?',
        options: [
          'It improves LCP significantly.',
          'It damages LCP severely because the browser delays downloading the image until layout calculation is complete.',
          'It has no effect on performance.',
          'It prevents images from loading on mobile.',
        ],
        correctIndex: 1,
        explanation: 'Lazy loading tells the browser to defer fetching. Applying it to the hero image delays LCP by several seconds.',
      },
      {
        question: 'What HTML/Liquid attribute should be added to the primary product hero image to ensure maximum loading priority?',
        options: [
          'fetchpriority="high"',
          'importance="critical"',
          'speed="ultra"',
          'preload="force"',
        ],
        correctIndex: 0,
        explanation: '`fetchpriority="high"` instructs the browser preload scanner to request the resource immediately with the highest network priority.',
      },
      {
        question: 'What does Interaction to Next Paint (INP) measure?',
        options: [
          'How fast the server generates Liquid markup',
          'The latency of all user interactions (clicks, taps, keypresses) throughout the session, reporting the worst interaction delay',
          'How many products are displayed in a grid',
          'The total time taken to download CSS files',
        ],
        correctIndex: 1,
        explanation: 'INP evaluates overall UI responsiveness across the entire page lifecycle, flagging long JavaScript main-thread blocking tasks.',
      },
      {
        question: 'How do you prevent Cumulative Layout Shift (CLS) on dynamic image blocks?',
        options: [
          'Set image dimensions to width: auto; height: auto;',
          'Reserve aspect-ratio containers and explicit width/height attributes on image tags',
          'Hide all images until window.onload fires',
          'Use animated GIFs instead of static images',
        ],
        correctIndex: 1,
        explanation: 'Defining explicit width/height or CSS `aspect-ratio` allows the browser to reserve the exact layout space before the image file finishes downloading.',
      },
    ],
  },

  // Module 9
  {
    id: 'quiz-module-9',
    moduleId: 'module-9',
    slug: 'quiz-module-9',
    title: 'Module 9 Quiz: PDP & Collection UX',
    questions: [
      {
        question: 'Why are visual swatch pills superior to native dropdown menus for product variant selection?',
        options: [
          'Dropdowns take up less screen space.',
          'Pills and swatches allow instant scanning of all options and inventory status without requiring taps to open a menu.',
          'Dropdowns are not supported on mobile devices.',
          'Shopify does not support dropdowns.',
        ],
        correctIndex: 1,
        explanation: 'Dropdowns conceal choices behind extra taps and hide out-of-stock states, creating unnecessary interaction friction.',
      },
      {
        question: 'What web API should be used to trigger the appearance of a Sticky Add-to-Cart bar with zero scroll event overhead?',
        options: [
          'window.onscroll with continuous DOM queries',
          'IntersectionObserver observing the main Add to Cart button',
          'setInterval running every 50ms',
          'CSS @keyframes animation on page load',
        ],
        correctIndex: 1,
        explanation: '`IntersectionObserver` executes asynchronously off the main thread, detecting when the primary button leaves the viewport without scroll lag.',
      },
      {
        question: 'Where should anxiety-reducing reassurance microcopy (returns, delivery speed, warranties) be placed for highest conversion impact?',
        options: [
          'Buried in the site footer under Terms of Service',
          'Directly adjacent to or immediately beneath the primary Add to Cart button',
          'On a separate hidden FAQ page',
          'In an intrusive modal that pops up on hover',
        ],
        correctIndex: 1,
        explanation: 'Placing reassurance copy right where the purchase decision is made resolves customer anxiety at the critical moment of commitment.',
      },
      {
        question: 'Why does a "Load More" button generally convert better than infinite scroll on ecommerce collection pages?',
        options: [
          'Infinite scroll uses too much electricity.',
          'Infinite scroll prevents users from accessing footer links (shipping, tracking, returns) and causes decision fatigue without visual closure.',
          'Load More buttons are mandatory under WCAG rules.',
          'Infinite scroll is blocked by Shopify.',
        ],
        correctIndex: 1,
        explanation: 'Infinite scroll creates a "bottomless pit" where users cannot reach footer information and lose their sense of position in the catalog.',
      },
      {
        question: 'What CSS rule prevents iOS Safari from automatically zooming the viewport when a user focuses a text input field?',
        options: [
          'zoom: none;',
          'font-size: 16px; (or greater) on all input and select elements',
          'user-scalable=no in the viewport meta tag',
          'touch-action: pan-y;',
        ],
        correctIndex: 1,
        explanation: 'iOS Safari forces an automatic zoom on inputs with font-size < 16px. Setting `font-size: 16px` prevents this jarring behavior.',
      },
    ],
  },

  // Module 10
  {
    id: 'quiz-module-10',
    moduleId: 'module-10',
    slug: 'quiz-module-10',
    title: 'Module 10 Quiz: Cart & Checkout',
    questions: [
      {
        question: 'What is the primary CRO advantage of an AJAX Cart Drawer over redirecting users to a dedicated /cart page?',
        options: [
          'It completely eliminates the checkout step.',
          'It keeps the customer in the browsing flow, allowing seamless continuation of shopping and basket building.',
          'It is cheaper to develop.',
          'It works without JavaScript enabled.',
        ],
        correctIndex: 1,
        explanation: 'Drawers confirm line item addition immediately without navigating away from the catalog, reducing friction and supporting higher items-per-order.',
      },
      {
        question: 'What is the most effective psychological placement for a Free Shipping Progress Bar?',
        options: [
          'Inside the site footer',
          'Prominently anchored at the top of the Cart Drawer, updating dynamically with remaining amount to unlock',
          'Only shown after payment is entered',
          'In the customer account settings',
        ],
        correctIndex: 1,
        explanation: 'An animated progress bar at the top of the cart drawer turns cart completion into a game, encouraging users to add one more item to reach the goal.',
      },
      {
        question: 'What price threshold should complementary in-cart cross-sells generally observe to maximize conversion?',
        options: [
          'Greater than 100% of current cart value',
          'Low-consideration price point (typically under 25–30% of current cart value or primary item)',
          'Exactly $1.00',
          'Price does not matter as long as it has a photo',
        ],
        correctIndex: 1,
        explanation: 'High-ticket cross-sells cause hesitation and re-evaluation. Low-consideration impulse items (< 25% of basket) convert with minimal friction.',
      },
      {
        question: 'What technology powers modern Shopify Plus checkout customization without breaking PCI compliance?',
        options: [
          'Direct DOM script injection in iframe containers',
          'Checkout UI Extensions and Shopify Functions',
          'Injecting jQuery scripts via Google Tag Manager',
          'Using unverified third-party Chrome extensions',
        ],
        correctIndex: 1,
        explanation: 'Shopify Checkout Extensibility provides sandboxed UI Extensions and high-speed WebAssembly Shopify Functions for robust, upgrade-safe customization.',
      },
      {
        question: 'If a merchant is on a standard Shopify plan ($105/mo), how can a developer customize their checkout experience?',
        options: [
          'Use the Checkout Branding API for theme-matched colors, logos, and fonts, and move all interactive pre-purchase perks into the Cart Drawer.',
          'Hack the checkout page using iframe injection.',
          'There is no way to improve conversion on standard Shopify plans.',
          'Switch to WooCommerce immediately.',
        ],
        correctIndex: 0,
        explanation: 'The Branding API provides visual cohesion, while moving delivery notes, gift options, and trust elements to the Cart Drawer solves pre-purchase needs.',
      },
    ],
  },

  // Module 11
  {
    id: 'quiz-module-11',
    moduleId: 'module-11',
    slug: 'quiz-module-11',
    title: 'Module 11 Quiz: Post-Purchase & Retention',
    questions: [
      {
        question: 'Why does the Thank You page offer a uniquely high conversion opportunity?',
        options: [
          'Because 100% of buyers view it at peak trust and dopamine immediately after purchasing.',
          'Because Google crawls it for SEO rankings.',
          'Because it is where payments are processed.',
          'Because users spend 30 minutes on it.',
        ],
        correctIndex: 0,
        explanation: 'The buyer has verified their trust by completing payment; leveraging this moment for referrals, passwordless account creation, or surveys yields peak engagement.',
      },
      {
        question: 'How do native 1-click post-purchase upsells work on Shopify?',
        options: [
          'The customer must re-enter their full credit card and billing address.',
          'The offer executes between payment authorization and the thank-you page using vaulted payment credentials without re-entering details.',
          'They send an email 3 days later.',
          'They automatically add items to the customer’s next month subscription without consent.',
        ],
        correctIndex: 1,
        explanation: 'Shopify Post-Purchase extensions tokenize the initial transaction, allowing customers to add a complementary item with a single tap before the final receipt.',
      },
      {
        question: 'What type of product has the lowest return and remorse rate for post-purchase upsells?',
        options: [
          'High-ticket luxury apparel where sizing is uncertain',
          'Consumable refills, protection plans/warranties, or multi-pack extensions of the purchased item',
          'Random overstock products from unrelated categories',
          'Pre-order items shipping in 6 months',
        ],
        correctIndex: 1,
        explanation: 'Consumables, warranties, and exact-match multi-packs carry zero sizing ambiguity and complement what the customer already decided to own.',
      },
      {
        question: 'What mobile popup trigger practice complies with Google’s intrusive interstitial search penalty?',
        options: [
          'Covering the entire screen immediately upon page load on mobile',
          'Triggering after meaningful user engagement (e.g. 50%+ scroll depth, 20+ seconds on site, or exit-intent)',
          'Disabling the close button for 10 seconds',
          'Popping up on every single page navigation',
        ],
        correctIndex: 1,
        explanation: 'Google penalizes mobile sites that block main content on entry. Waiting for engagement or exit-intent preserves SEO and user experience.',
      },
      {
        question: 'What does Customer Effort Score (CES) measure in post-purchase surveys?',
        options: [
          'How many products the customer bought',
          'How easy or difficult it was for the customer to find what they needed and complete checkout',
          'How fast the delivery courier drives',
          'How much money the customer makes annually',
        ],
        correctIndex: 1,
        explanation: 'CES specifically targets UX friction by evaluating how much effort the customer exerted to complete their order.',
      },
    ],
  },

  // Module 12
  {
    id: 'quiz-module-12',
    moduleId: 'module-12',
    slug: 'quiz-module-12',
    title: 'Module 12 Quiz: Personalization & Segmentation',
    questions: [
      {
        question: 'How should messaging differ between first-time visitors and returning buyers?',
        options: [
          'First-time visitors should see immediate checkout buttons; returning buyers should see origin stories.',
          'First-time visitors require trust reassurance, brand story, and reviews; returning buyers need rapid re-ordering, recent views, and new arrivals.',
          'Both groups should always see the exact same static homepage.',
          'First-time visitors should be charged higher prices.',
        ],
        correctIndex: 1,
        explanation: 'First-time shoppers need cognitive safety and social proof; returning customers already trust the brand and prioritize browsing speed.',
      },
      {
        question: 'Which native Shopify feature enables localized pricing, currency, and language without third-party translation apps?',
        options: [
          'Shopify Flow',
          'Shopify Markets',
          'Shopify Scripts',
          'Shopify Capital',
        ],
        correctIndex: 1,
        explanation: 'Shopify Markets natively manages international currencies, custom price lists, duty collection, and localized domains.',
      },
      {
        question: 'How can a developer implement a "Recently Viewed Products" section without breaking Shopify CDN full-page cache?',
        options: [
          'Disable caching across all store product templates.',
          'Store product handles in browser localStorage on each PDP view and render the cards via client-side JavaScript after load.',
          'Write a cron job that refreshes the database every hour.',
          'Ask the user to enter their recently viewed products in a form.',
        ],
        correctIndex: 1,
        explanation: 'Client-side rendering from localStorage allows dynamic, user-specific history without requiring individualized server-side HTML rendering.',
      },
      {
        question: 'What is a major risk of third-party personalization apps like Dynamic Yield or Nosto if unmonitored?',
        options: [
          'They delete products from the database.',
          'They inject heavy render-blocking scripts that severely degrade LCP and INP Core Web Vitals.',
          'They convert all prices to Euros.',
          'They prevent customers from clicking checkout.',
        ],
        correctIndex: 1,
        explanation: 'Heavy third-party recommendation widgets often add 300KB+ of JavaScript and cause Cumulative Layout Shift if dimensions are unconstrained.',
      },
      {
        question: 'What is the Global Privacy Control (GPC)?',
        options: [
          'A browser signal indicating that the user declines third-party tracking and personal data sale under privacy laws like CCPA',
          'A master password used by Shopify developers',
          'A Google algorithm that penalizes slow websites',
          'An EU tax law for ecommerce shipping',
        ],
        correctIndex: 0,
        explanation: 'GPC (`navigator.globalPrivacyControl`) is a standardized browser signal communicating the visitor’s legal opt-out of tracking and data sale.',
      },
    ],
  },

  // Module 13
  {
    id: 'quiz-module-13',
    moduleId: 'module-13',
    slug: 'quiz-module-13',
    title: 'Module 13 Quiz: Program Management & Reporting',
    questions: [
      {
        question: 'What is the formula for calculating the Annualized Revenue Impact of an A/B test win?',
        options: [
          'Orders * Price * 365',
          'Monthly Visitors × Baseline CVR × Baseline AOV × Relative Lift% × 12 months',
          'Lift% * 100',
          'Total Sessions / Net Margin',
        ],
        correctIndex: 1,
        explanation: 'Annualizing the lift quantifies the compounded 12-month dollar value added to the merchant’s bottom line.',
      },
      {
        question: 'What is a typical healthy win rate for well-formulated, rigorous ecommerce experimentation programs?',
        options: [
          '95% to 100%',
          '25% to 35%',
          '5% to 8%',
          '1% to 2%',
        ],
        correctIndex: 1,
        explanation: 'In rigorous testing environments, 25% to 35% of tests achieve statistically significant positive lifts; the remainder prevent bad ideas from degrading revenue.',
      },
      {
        question: 'Why are "losing" experiments valuable in a compounding CRO program?',
        options: [
          'They aren\'t valuable; losing tests represent wasted developer time.',
          'They prevent the merchant from permanently shipping harmful changes and provide crucial qualitative insights into customer preferences.',
          'They allow developers to bill for double hours.',
          'They boost Google SEO rankings.',
        ],
        correctIndex: 1,
        explanation: 'If a company was going to roll out a redesign that would have dropped revenue by 8%, an A/B test proving that loss saves hundreds of thousands of dollars.',
      },
      {
        question: 'How should CRO sprint roadmaps be structured across a quarter (90 days)?',
        options: [
          'Month 1: Audit & quick wins; Month 2: Core funnel experiments; Month 3: High-leverage advanced tests & synthesis.',
          'Launch 50 tests simultaneously on Day 1.',
          'Only test during the last 3 days of the quarter.',
          'Test whatever the founder thought of during breakfast each morning.',
        ],
        correctIndex: 0,
        explanation: 'A balanced roadmap starts with low-hanging friction repairs and instrumentation, builds into structural funnel testing, and finishes with advanced optimization.',
      },
      {
        question: 'How should a CRO developer handle a subjective disagreement between the marketing director and brand designer?',
        options: [
          'Pick the one who has worked at the company longer.',
          'Propose a structured A/B test with clear primary and guardrail metrics to let customer purchasing data decide.',
          'Refuse to write code until they agree.',
          'Build both versions on top of each other.',
        ],
        correctIndex: 1,
        explanation: 'Experimentation removes subjective opinions ("I like blue" vs "I like green") by testing hypotheses against real customer behavior.',
      },
    ],
  },

  // Module 14
  {
    id: 'quiz-module-14',
    moduleId: 'module-14',
    slug: 'quiz-module-14',
    title: 'Module 14 Quiz: Advanced Shopify Dev CRO',
    questions: [
      {
        question: 'What execution time limit is enforced on Shopify Functions compiled to WebAssembly?',
        options: [
          '5 milliseconds (5ms)',
          '5 seconds (5000ms)',
          '1 minute',
          'Unlimited execution time',
        ],
        correctIndex: 0,
        explanation: 'Shopify Functions must execute within a strict 5ms budget to ensure checkout performance never regresses.',
      },
      {
        question: 'How does server-side event tracking with Meta Conversions API (CAPI) prevent double-counting orders?',
        options: [
          'By turning off browser tracking completely.',
          'By passing an identical, unique `event_id` from both browser pixel and server payload so Meta deduplicates them.',
          'By only sending orders on odd-numbered days.',
          'Meta automatically knows without any shared identifier.',
        ],
        correctIndex: 1,
        explanation: 'Passing a matching `event_id` allows ad networks to merge browser and server events, dropping the duplicate and achieving 100% attribution.',
      },
      {
        question: 'What is the primary advantage of Edge A/B testing on Cloudflare Workers over client-side DOM mutation?',
        options: [
          'It works without an internet connection.',
          'It eliminates test flicker, has zero client-side JavaScript weight, and avoids Cumulative Layout Shift (CLS).',
          'It automatically writes marketing copy.',
          'It makes checkout free for all users.',
        ],
        correctIndex: 1,
        explanation: 'Edge testing delivers already-split HTML directly to the browser, eliminating the client-side evaluation delay and layout instability.',
      },
      {
        question: 'Which Shopify Function API is used to create volume tiered discounts (e.g. Buy 3 get 20% off)?',
        options: [
          'Payment Customization API',
          'Cart and Line Item Discounts API (Order Routing)',
          'Theme App Extension API',
          'Search & Discovery API',
        ],
        correctIndex: 1,
        explanation: 'The Shopify Functions Discounts API evaluates cart line items and applies percentage or fixed reductions based on custom business rules.',
      },
      {
        question: 'What is optimistic UI in a Shopify Hydrogen (Remix) storefront?',
        options: [
          'Showing inspiring quotes to shoppers',
          'Immediately updating the cart UI in the browser as if the mutation succeeded before waiting for the server network response',
          'Assuming all visitors will buy products',
          'Hiding all out-of-stock items',
        ],
        correctIndex: 1,
        explanation: 'Optimistic UI makes interactions feel instantaneous (0ms perceived latency) by immediately reflecting state changes in the interface.',
      },
    ],
  },

  // Module 15
  {
    id: 'quiz-module-15',
    moduleId: 'module-15',
    slug: 'quiz-module-15',
    title: 'Module 15 Quiz: Capstone Theme Build',
    questions: [
      {
        question: 'What is the target Mobile Largest Contentful Paint (LCP) budget enforced in the Capstone Lighthouse CI configuration?',
        options: [
          '< 2.5 seconds',
          '< 10.0 seconds',
          '< 0.1 seconds',
          'LCP is not measured in Lighthouse CI',
        ],
        correctIndex: 0,
        explanation: 'Google’s good threshold for LCP is 2.5 seconds or less, representing high loading performance on mobile networks.',
      },
      {
        question: 'Which 8 events must be instrumented in the Capstone Web Pixel tracking pipeline?',
        options: [
          'Click, Hover, Scroll, Focus, Blur, Keydown, Resize, Unload',
          'page_viewed, collection_viewed, product_viewed, search_submitted, product_added_to_cart, cart_viewed, checkout_started, checkout_completed',
          'login, logout, register, forgot_password, update_profile, change_email, delete_account, ban_user',
          'buy, refund, return, exchange, chargeback, cancel, dispute, review',
        ],
        correctIndex: 1,
        explanation: 'These 8 events represent the complete standardized telemetry backbone of an enterprise ecommerce funnel.',
      },
      {
        question: 'How is the Capstone Sticky Add-to-Cart bar triggered to reveal itself?',
        options: [
          'After the user waits for 60 seconds without clicking anything',
          'Via an IntersectionObserver that detects when the primary product form submit button scrolls out of view',
          'Only when the user attempts to close the browser tab',
          'It is always permanently fixed over the product image',
        ],
        correctIndex: 1,
        explanation: 'Revealing the sticky bar only when the main CTA scrolls offscreen ensures it does not duplicate or obstruct the primary button.',
      },
      {
        question: 'What unlock condition awards the master "CRO Master Architect" badge in CRO Lab?',
        options: [
          'Completing all 10 Capstone Deliverables and building the portfolio case study',
          'Logging in 3 days in a row',
          'Viewing the settings page',
          'Changing the theme from dark to light mode',
        ],
        correctIndex: 0,
        explanation: 'Shipping all 10 verified deliverables unlocks the master capstone badge and auto-populates the portfolio case study generator.',
      },
      {
        question: 'What must be included in Deliverable 9 (One Real A/B Test)?',
        options: [
          'A screenshot of a button color change',
          'Documented sample sizes, visitor counts, observed conversion rates, p-value, confidence level, and business decision',
          'An invoice for $5,000 sent to a client',
          'A link to a competitor website',
        ],
        correctIndex: 1,
        explanation: 'A real experiment requires rigorous statistical reporting: sample size, conversion numbers, significance calculations, and commercial decision rationale.',
      },
    ],
  },

  // Module 16
  {
    id: 'quiz-module-16',
    moduleId: 'module-16',
    slug: 'quiz-module-16',
    title: 'Module 16 Quiz: Portfolio & Interview Prep',
    questions: [
      {
        question: 'When presenting an A/B test case study to a prospective employer or high-value client, what should you lead with?',
        options: [
          'The lines of CSS and Liquid code you wrote',
          'The business problem, commercial stakes, and annualized revenue impact generated by the optimization',
          'How much you disliked the client’s previous theme',
          'The name of the JavaScript framework used',
        ],
        correctIndex: 1,
        explanation: 'Decision makers hire CRO developers for commercial revenue efficiency; leading with business problem and measurable financial impact establishes executive value.',
      },
      {
        question: 'How should you answer the interview question: "Can we stop a test on Day 3 if p < 0.01?"',
        options: [
          '"Yes, because 99% confidence means it’s definitely a winner."',
          '"No, because early stopping introduces the Peeking Problem (inflating false positives up to 30%) and fails to capture a full 7-day business cycle."',
          '"Yes, but only if the marketing manager approves."',
          '"It depends on whether it’s raining outside."',
        ],
        correctIndex: 1,
        explanation: 'Demonstrating deep awareness of the Peeking Problem and weekly cyclical validity instantly marks you as a mature, statistically grounded engineer.',
      },
      {
        question: 'Why do specialized CRO developers command $150–$250/hr compared to $50–$80/hr for standard theme coders?',
        options: [
          'Because CRO developers write code that directly drives measurable merchant revenue and margin growth rather than fulfilling passive aesthetic tickets.',
          'Because CRO developers use more expensive laptops.',
          'Because CRO requires a PhD in mathematics.',
          'Because Shopify mandates higher rates for CRO.',
        ],
        correctIndex: 0,
        explanation: 'Value-based pricing reflects commercial leverage: an engineer who adds $300,000 in revenue via optimization easily commands premium fees.',
      },
      {
        question: 'Which 6 components form the backbone of a world-class CRO portfolio case study?',
        options: [
          'Home, About, Contact, Services, Blog, Footer',
          'Context & Problem, Friction Research, Formulated Hypothesis, Technical Implementation, Statistical Results, and Annualized Business Impact',
          'Logo, Font, Colors, Moodboard, Mockup, Prototype',
          'Summary, GitHub Link, Resume, LinkedIn, Twitter, Email',
        ],
        correctIndex: 1,
        explanation: 'These 6 sections construct a watertight scientific and engineering narrative proving both your coding craft and your business acumen.',
      },
      {
        question: 'What is the primary advantage of starting a CRO career at an agency vs going solo freelance on day one?',
        options: [
          'Agencies do not require you to know Liquid.',
          'Agencies provide rapid exposure to 20+ diverse store verticals and traffic volumes, accelerating pattern recognition in your first 1–2 years.',
          'Freelancing is illegal in most countries.',
          'Agencies only work on desktop websites.',
        ],
        correctIndex: 1,
        explanation: 'Agency environments expose developers to dozens of catalogs, tech stacks, and user behaviors, condensing 5 years of solo learning into 18 months.',
      },
    ],
  },

  // =========================================================================
  // Module 17: Mobile UX & Responsive CRO
  // =========================================================================
  {
    id: 'quiz-module-17',
    moduleId: 'module-17',
    slug: 'quiz-module-17',
    title: 'Module 17 Quiz: Mobile UX & Responsive CRO',
    questions: [
      {
        question: 'According to Steven Hoober’s mobile touch research, which screen region represents the effortless "natural thumb sweep zone" for 85%+ of users?',
        options: [
          'The top 20% header area',
          'The bottom 35% natural thumb sweep zone',
          'The left vertical edge only',
          'The exact center dead spot',
        ],
        correctIndex: 1,
        explanation: 'Nearly half of users hold their smartphone with one hand, and 36% cradle it with two hands using one thumb. The bottom 35% is the natural, strain-free thumb zone.',
      },
      {
        question: 'Why should full-height mobile cart drawers and modals use 100dvh instead of 100vh?',
        options: [
          '100dvh renders in 4K resolution.',
          '100vh ignores the dynamic mobile browser navigation bar collapse, causing bottom CTAs to be covered by Safari’s bottom toolbar.',
          '100vh is deprecated in HTML5.',
          '100dvh automatically translates text to Arabic.',
        ],
        correctIndex: 1,
        explanation: 'On mobile Safari and Chrome, dynamic toolbars expand and contract as users scroll. 100vh calculates against the expanded viewport, clipping sticky bottom checkout buttons.',
      },
      {
        question: 'Why must form input text sizes be at least 16px in mobile CSS?',
        options: [
          'Because WCAG prohibits fonts smaller than 24px.',
          'To prevent iOS Safari from automatically zooming into the field on focus, which distorts the layout.',
          'Because 16px is required for Shopify payments to process.',
          'Because screen readers cannot parse 14px text.',
        ],
        correctIndex: 1,
        explanation: 'If an input has a font-size below 16px, iOS Safari automatically triggers an optical zoom-in on tap, often causing layout displacement and user disorientation.',
      },
      {
        question: 'What is the primary friction point introduced by 1-tap accelerated wallets (Shop Pay, Apple Pay) when stores run ad campaigns?',
        options: [
          'They do not work on mobile phones.',
          'Bypassing the cart directly to the wallet sheet historically prevented customers from entering discount promo codes.',
          'They increase payment processing fees by 20%.',
          'They require customers to enter their credit card 3-digit CVV every time.',
        ],
        correctIndex: 1,
        explanation: 'Shoppers with a promo code who tap 1-tap checkout often panic when they do not see a discount code field on the payment sheet. Providing an in-cart promo code entry solves this.',
      },
      {
        question: 'What is the recommended modern API for toggling a mobile sticky Add to Cart bar with zero scroll jank?',
        options: [
          'window.addEventListener("scroll") without throttling',
          'IntersectionObserver observing the native product form button',
          'setInterval running every 10ms',
          'document.write listeners',
        ],
        correctIndex: 1,
        explanation: 'IntersectionObserver runs asynchronously off the main thread, detecting when the primary button scrolls out of view without causing costly layout recalculations.',
      },
    ],
  },

  // =========================================================================
  // Module 18: Conversion Copywriting & Value Propositions
  // =========================================================================
  {
    id: 'quiz-module-18',
    moduleId: 'module-18',
    slug: 'quiz-module-18',
    title: 'Module 18 Quiz: Conversion Copywriting & Value Propositions',
    questions: [
      {
        question: 'What are the three essential questions answered by a store’s value proposition in the 5-second test?',
        options: [
          'Who founded the store, where is it headquartered, and what is its stock symbol?',
          'What is being sold, why is it better or different, and what action should the visitor take next?',
          'How many employees work here, what color is the logo, and which payment gateway is used?',
          'What is the store’s mission statement, blog title, and Instagram handle?',
        ],
        correctIndex: 1,
        explanation: 'A first-time visitor needs instant clarity on the product offering, the unique differentiator, and the immediate next step before they consider browsing.',
      },
      {
        question: 'What is the primary function of microcopy across the checkout funnel?',
        options: [
          'To tell entertaining jokes to keep the user amused.',
          'To eliminate operational doubt, reduce purchase anxiety, and clarify button commitments.',
          'To disguise extra handling fees in the fine print.',
          'To increase page word count for SEO crawlers.',
        ],
        correctIndex: 1,
        explanation: 'Microcopy addresses tiny moments of friction: explaining why a phone number is required, reassuring that no payment is taken yet, and clarifying return terms.',
      },
      {
        question: 'Why do CRO researchers consider 3-star customer reviews more valuable for copywriting than 5-star reviews?',
        options: [
          '3-star reviews are written by professional copywriters.',
          '3-star reviews reveal the exact objections, sizing fears, and unmet expectations from genuine buyers.',
          '5-star reviews are always fabricated.',
          '3-star reviews are required for Google rich snippets.',
        ],
        correctIndex: 1,
        explanation: '3-star reviews uncover real friction: "I loved the fabric, but it runs small in the shoulders." Addressing this directly on the PDP prevents drop-off and returns.',
      },
      {
        question: 'How does a bold, unconditional risk-reversal guarantee (e.g. 30-day money-back trial) typically affect business economics?',
        options: [
          'It leads to 100% of customers returning products, destroying the company.',
          'It significantly lifts conversion rate, while return rates typically increase by less than 1.5%.',
          'It has zero impact on consumer behavior.',
          'It is illegal under ecommerce retail laws.',
        ],
        correctIndex: 1,
        explanation: 'Overcoming customer purchase anxiety dramatically increases initial orders, while the vast majority of satisfied buyers keep the product.',
      },
      {
        question: 'Why are artificial countdown timers that reset on every page refresh considered harmful?',
        options: [
          'They use too much CPU memory.',
          'They destroy long-term brand credibility and violate FTC/EU regulations on deceptive digital practices.',
          'They cannot run on Shopify themes.',
          'They prevent customers from using credit cards.',
        ],
        correctIndex: 1,
        explanation: 'Fake urgency is easily spotted by modern shoppers, eroding brand trust and exposing merchants to severe regulatory fines.',
      },
    ],
  },

  // =========================================================================
  // Module 19: B2B, Wholesale & High-Ticket CRO
  // =========================================================================
  {
    id: 'quiz-module-19',
    moduleId: 'module-19',
    slug: 'quiz-module-19',
    title: 'Module 19 Quiz: B2B, Wholesale & High-Ticket CRO',
    questions: [
      {
        question: 'What fundamentally differentiates high-ticket ($1,000+) buying journeys from low-ticket DTC impulse purchases?',
        options: [
          'High-ticket buyers only browse during the weekend.',
          'High-ticket purchases involve long multi-stakeholder consideration cycles, high consequence of failure, and require consultative reassurance.',
          'High-ticket purchases are never made online.',
          'Low-ticket buyers always read technical CAD drawings.',
        ],
        correctIndex: 1,
        explanation: 'Purchasing commercial equipment involves corporate budget approvals, technical spec reviews, and multiple stakeholders over weeks or months.',
      },
      {
        question: 'How does displaying an interactive tiered volume pricing table directly on the PDP lift B2B performance?',
        options: [
          'It hides the actual price until checkout.',
          'It motivates wholesale buyers to expand their basket size to cross the next volume discount threshold, driving higher AOV.',
          'It forces retail shoppers to buy in bulk.',
          'It replaces the shopping cart with an email link.',
        ],
        correctIndex: 1,
        explanation: 'Clear volume tiers show incremental unit savings (e.g. Buy 20 save 20%), incentivizing commercial customers to increase order size.',
      },
      {
        question: 'When is a 2-step Request for Quote (RFQ) workflow superior to immediate credit card checkout?',
        options: [
          'On all products under $25.',
          'When orders involve custom fabrication, volume orders exceeding credit card limits, or corporate purchase order (PO) requirements.',
          'When the store owner does not want to pay Shopify transaction fees.',
          'When shipping is completely free.',
        ],
        correctIndex: 1,
        explanation: 'Enterprise buyers frequently cannot pay $15,000 on a credit card and require formal quote documents for corporate accounts payable approval.',
      },
      {
        question: 'Which trust credentials are most effective for high-ticket commercial decision makers?',
        options: [
          'Generic clipart saying "100% Safe Checkout".',
          'Third-party regulatory compliance marks (UL, CE, ISO), downloadable spec sheets, and named enterprise case studies.',
          'Fake social proof popups claiming recent purchases in other cities.',
          'Animated emoji badges.',
        ],
        correctIndex: 1,
        explanation: 'Commercial procurement officers look for regulatory compliance, engineering certifications, and verifiable peer institution references.',
      },
      {
        question: 'Why does offering a credited material sample kit ($15 sample credited toward future $500+ order) convert so effectively?',
        options: [
          'It eliminates the need for product photography.',
          'It bridges the physical tactile sensory gap and establishes psychological pre-ownership (Endowment Effect).',
          'It avoids charging sales tax.',
          'It prevents customers from returning future orders.',
        ],
        correctIndex: 1,
        explanation: 'Holding a physical sample in hand eliminates quality hesitation, and crediting the fee makes placing the full order feel like claiming a pre-paid benefit.',
      },
    ],
  },

  // =========================================================================
  // Module 20: International CRO & Multi-Currency
  // =========================================================================
  {
    id: 'quiz-module-20',
    moduleId: 'module-20',
    slug: 'quiz-module-20',
    title: 'Module 20 Quiz: International CRO & Multi-Currency',
    questions: [
      {
        question: 'Why does displaying unrounded converted prices (e.g. €73.19 or 14,281 JPY) harm conversion?',
        options: [
          'Unrounded prices cannot be processed by Visa or Mastercard.',
          'They signal that the store is an overseas merchant, triggering anxiety over customs delays, foreign transaction fees, and difficult returns.',
          'Google Ads automatically bans unrounded prices.',
          'Unrounded prices cause CSS layout overflow on mobile.',
        ],
        correctIndex: 1,
        explanation: 'Domestic European and Japanese brands price cleanly (.00 or .95). Raw decimal exchange rates look foreign and suspicious.',
      },
      {
        question: 'In the Netherlands, which payment method accounts for over 65% of all digital ecommerce transactions?',
        options: [
          'American Express',
          'iDEAL (Direct Inter-Bank Transfer)',
          'Discover Card',
          'Apple Cash',
        ],
        correctIndex: 1,
        explanation: 'Credit cards represent a minority of Dutch ecommerce. Without iDEAL support, Dutch traffic will abandon checkout in massive numbers.',
      },
      {
        question: 'What is the catastrophic conversion risk of shipping international orders Delivered Duty Unpaid (DDU)?',
        options: [
          'Parcels are automatically destroyed at sea.',
          'Customers face surprise doorstep cash customs and import tariff demands from couriers, leading to refused deliveries and chargebacks.',
          'Shopify shuts down the merchant account.',
          'Customs authorities convert the currency back to USD.',
        ],
        correctIndex: 1,
        explanation: 'DDU creates immense customer frustration when a courier demands £40+ cash before handing over a parcel that the customer believed was already paid in full.',
      },
      {
        question: 'What is the modern CSS standard for building bi-directional interfaces that support Right-to-Left (RTL) languages like Arabic?',
        options: [
          'Writing separate stylesheets with !important overrides for every single selector',
          'Using CSS Logical Properties such as margin-inline-start and padding-inline-end',
          'Relying on browser auto-translate plugins',
          'Inverting screen coordinates with canvas',
        ],
        correctIndex: 1,
        explanation: 'CSS Logical Properties automatically adapt spacing relative to the document’s writing direction (LTR vs RTL) without duplicate code.',
      },
      {
        question: 'What is the most customer-friendly and SEO-safe method for handling international visitor market routing?',
        options: [
          'Force-redirecting visitors immediately based on IP address without any manual override option',
          'Displaying a polite, non-intrusive floating recommendation banner allowing visitors to confirm or switch markets',
          'Blocking international IP addresses completely',
          'Showing an un-closable full-screen popup modal on the homepage',
        ],
        correctIndex: 1,
        explanation: 'Hard redirects break Googlebot crawling and frustrate VPN users. A polite recommendation banner respects user control and preserves SEO indexing.',
      },
    ],
  },

  // =========================================================================
  // Module 21: Behavioral Economics & Cognitive Biases
  // =========================================================================
  {
    id: 'quiz-module-21',
    moduleId: 'module-21',
    slug: 'quiz-module-21',
    title: 'Module 21 Quiz: Behavioral Economics & Cognitive Biases',
    questions: [
      {
        question: 'In Kahneman’s Dual-Process theory, what is the role of System 1 in online shopping?',
        options: [
          'Calculating complex shipping weight tariffs and tax formulas',
          'Driving fast, automatic, subconscious visual appraisal and emotional attraction',
          'Reading 5,000 words of legal terms of service',
          'Writing customer service emails',
        ],
        correctIndex: 1,
        explanation: 'System 1 is fast, intuitive, and seeks cognitive ease. System 2 is deliberate and analytical; unnecessary friction activates System 2 skepticism.',
      },
      {
        question: 'What is the Decoy Effect (Asymmetric Dominance)?',
        options: [
          'Displaying fake competitor prices that do not exist.',
          'Introducing an inferior or equal-priced option that makes the target bundle look like an overwhelming bargain.',
          'Hiding the price until the customer enters their email address.',
          'Charging a restocking fee on returned goods.',
        ],
        correctIndex: 1,
        explanation: 'In the Decoy Effect, an asymmetric option (like Print alone for $125) makes the combined bundle (Print + Digital for $125) feel like an irresistible deal.',
      },
      {
        question: 'How does Hick’s Law affect ecommerce catalog browsing?',
        options: [
          'The more choices presented without curation, the longer the decision time, frequently leading to analysis paralysis and abandonment.',
          'Customers always buy more items if you show 1,000 products on a single page.',
          'Price has no relationship to product demand.',
          'Visitors prefer black-and-white websites over color.',
        ],
        correctIndex: 0,
        explanation: 'Hick’s Law proves that decision time increases logarithmically with the number of choices. Curated filters and "Best For" taxonomy rescue shoppers from choice overload.',
      },
      {
        question: 'How does Loss Aversion differ from standard promotional gain framing?',
        options: [
          'Loss aversion frames benefits around avoiding a loss ("Don’t leave your free gift behind"), which is psychologically twice as potent as gaining something new.',
          'Loss aversion means the store loses money on every sale.',
          'Loss aversion only applies to insurance products.',
          'Gain framing always converts higher than loss framing.',
        ],
        correctIndex: 0,
        explanation: 'Humans feel the pain of losing roughly twice as acutely as the joy of gaining. Loss-framed progress bars in carts outperform passive gain messaging.',
      },
      {
        question: 'What defines a "Roach Motel" deceptive dark pattern in digital commerce?',
        options: [
          'Selling pest control products online.',
          'An interface that makes signing up effortless, but makes cancellation intentionally difficult through complex offline phone hurdles.',
          'A store with high bug density in its JavaScript code.',
          'A website that uses dark background colors.',
        ],
        correctIndex: 1,
        explanation: 'Roach Motels trap customers into subscriptions by deliberately hiding cancellation controls, violating FTC regulations.',
      },
    ],
  },

  // =========================================================================
  // Module 22: Search, Navigation & Site Discovery
  // =========================================================================
  {
    id: 'quiz-module-22',
    moduleId: 'module-22',
    slug: 'quiz-module-22',
    title: 'Module 22 Quiz: Search, Navigation & Site Discovery',
    questions: [
      {
        question: 'Why do visitors who utilize on-site search convert at 2.5x to 4x the rate of passive browsers?',
        options: [
          'Searchers are offered larger discounts by default.',
          'Searchers exhibit explicit high-intent procurement behavior, having already identified their problem or target product.',
          'Searchers only visit on desktop computers.',
          'Search algorithms secretly add items to their cart.',
        ],
        correctIndex: 1,
        explanation: 'Searchers are active hunters rather than passive gatherers. They know what they want; the store’s job is removing latency between query and PDP.',
      },
      {
        question: 'What is the critical technical purpose of debouncing search input events in JavaScript?',
        options: [
          'To format currency values.',
          'To delay API requests until the user pauses typing for 200–300ms, preventing server overload and UI stutter.',
          'To encrypt user search queries with HTTPS.',
          'To automatically capitalize product titles.',
        ],
        correctIndex: 1,
        explanation: 'Without debouncing, typing a 7-letter word fires 7 consecutive network requests. Debouncing waits for a typing pause before querying.',
      },
      {
        question: 'Why must predictive search implementations utilize AbortController?',
        options: [
          'To cancel earlier in-flight network requests so stale search responses do not overwrite newer, accurate results.',
          'To shut down the browser tab if an error occurs.',
          'To stop the user from typing banned keywords.',
          'To abort checkout if inventory is low.',
        ],
        correctIndex: 0,
        explanation: 'Network latency varies. If request #1 for "bo" finishes after request #2 for "boots", the UI would show results for "bo" without an AbortController.',
      },
      {
        question: 'What is the highest-converting approach for a zero-results search page?',
        options: [
          'Displaying a completely blank white screen.',
          'Displaying empathetic guidance, did-you-mean suggestions, and an immediate grid of trending bestsellers.',
          'Redirecting the user to Google.',
          'Showing an error alert saying "Invalid Search Query".',
        ],
        correctIndex: 1,
        explanation: 'Blank zero-results pages cause 78%+ bounce rates. Merchandising bestsellers and category links keeps the discovery journey alive.',
      },
      {
        question: 'Why is the Section Rendering API preferred over full-page reloads for collection faceted filtering?',
        options: [
          'It replaces only the targeted product grid DOM container asynchronously, preserving scroll position and delivering instant feedback.',
          'It reloads the entire HTML document twice.',
          'It disables JavaScript completely.',
          'It is the only way to display product prices.',
        ],
        correctIndex: 0,
        explanation: 'Section Rendering API allows seamless AJAX filtering without heavy client-side frameworks, providing instant catalog updates.',
      },
    ],
  },

  // =========================================================================
  // Module 23: CRO Tooling, CI/CD & Automated QA
  // =========================================================================
  {
    id: 'quiz-module-23',
    moduleId: 'module-23',
    slug: 'quiz-module-23',
    title: 'Module 23 Quiz: CRO Tooling, CI/CD & Automated QA',
    questions: [
      {
        question: 'What is the primary role of automated end-to-end Playwright tests in an A/B experimentation program?',
        options: [
          'To automatically write marketing copy.',
          'To programmatically verify variant rendering, cookie persistence, and checkout event firing before deploying to live traffic.',
          'To simulate fake orders to inflate store revenue.',
          'To replace Google Analytics.',
        ],
        correctIndex: 1,
        explanation: 'Automated testing ensures that treatment code does not introduce silent broken cart buttons or tracking failures across WebKit, Chromium, and Firefox.',
      },
      {
        question: 'What is the primary advantage of Server-Side Google Tag Manager (sGTM) on a first-party subdomain?',
        options: [
          'It eliminates the need for server hosting.',
          'It bypasses third-party ad-blockers and Safari ITP tracking restrictions by routing telemetry through a first-party domain.',
          'It increases store traffic by 50%.',
          'It automatically sets product prices.',
        ],
        correctIndex: 1,
        explanation: 'Third-party tracking scripts are frequently blocked by browsers, losing up to 30% of conversions. First-party server endpoints restore accurate attribution.',
      },
      {
        question: 'What is Sample Ratio Mismatch (SRM), and why does it invalidate an A/B test?',
        options: [
          'When the store runs out of inventory during a test.',
          'A statistically significant discrepancy between planned and observed traffic ratios, indicating that one variant is crashing or misallocating users.',
          'When two products have different prices.',
          'When more women visit the store than men.',
        ],
        correctIndex: 1,
        explanation: 'If a 50/50 test logs 10,000 visitors in Control and 8,500 in Treatment, a critical technical error is occurring. Any reported lift in an SRM experiment is false.',
      },
      {
        question: 'Which statistical test is standard for detecting Sample Ratio Mismatch in A/B test visitor allocations?',
        options: [
          'Student’s T-Test',
          'Chi-Square Goodness-of-Fit Test (p < 0.001)',
          'Linear Regression',
          'Monte Carlo Simulation',
        ],
        correctIndex: 1,
        explanation: 'The Chi-Square test compares observed variant traffic against expected allocations; a p-value below 0.001 flags severe SRM.',
      },
      {
        question: 'How does integrating Lighthouse CI into GitHub Actions protect store conversion velocity?',
        options: [
          'It automatically creates discounts for slow customers.',
          'It blocks pull requests that introduce JavaScript bloat or degrade Core Web Vitals (LCP, CLS) beyond strict budgets.',
          'It optimizes product photography in Photoshop.',
          'It sends emails to customer support.',
        ],
        correctIndex: 1,
        explanation: 'Enforcing Lighthouse CI performance budgets in CI/CD prevents marketing apps and unvetted code from quietly degrading speed and conversion.',
      },
    ],
  },

  // =========================================================================
  // Module 24: Comprehensive Master Certification Exam
  // =========================================================================
  {
    id: 'quiz-module-24',
    moduleId: 'module-24',
    slug: 'quiz-module-24',
    title: 'Module 24: Grand Master CRO Developer Certification Exam',
    questions: [
      {
        question: 'Scenario 1 (Funnel Math): A store records 100,000 sessions, 2,500 orders, and $200,000 in gross revenue. What are its exact CVR, AOV, and RPS?',
        options: [
          'CVR: 2.50%, AOV: $80.00, RPS: $2.00',
          'CVR: 4.00%, AOV: $50.00, RPS: $1.50',
          'CVR: 2.00%, AOV: $100.00, RPS: $2.50',
          'CVR: 1.25%, AOV: $160.00, RPS: $3.00',
        ],
        correctIndex: 0,
        explanation: 'CVR = (2,500 / 100,000) * 100 = 2.50%. AOV = $200,000 / 2,500 = $80.00. RPS = $200,000 / 100,000 = $2.00 (or 0.025 * $80 = $2.00).',
      },
      {
        question: 'Scenario 2 (Statistical Rigor): Why is testing for a 2% relative MDE on a store with only 400 monthly orders mathematically flawed?',
        options: [
          'Because 2% lifts do not exist in ecommerce.',
          'Because detecting a tiny 2% relative effect would require over 300,000 orders to achieve 80% statistical power, taking years to complete.',
          'Because small stores should never run A/B tests.',
          'Because p-values cannot be computed on fewer than 10,000 orders.',
        ],
        correctIndex: 1,
        explanation: 'Small sample sizes can only detect large Minimum Detectable Effects (e.g. 15–25% lift). Searching for a 2% lift with low traffic leads to months of inconclusive data.',
      },
      {
        question: 'Scenario 3 (Flicker Architecture): What is the most robust way to prevent Flash of Original Content (FOOC) in client-side A/B tests?',
        options: [
          'Relying on window.onload event listeners',
          'Injecting a temporary anti-flicker CSS opacity: 0 rule on the target element with a strict 800ms fallback timeout',
          'Hiding the entire website permanently',
          'Using document.write in the HTML footer',
        ],
        correctIndex: 1,
        explanation: 'An anti-flicker CSS snippet hides the element momentarily until the variant script modifies DOM or times out after 800ms, eliminating jarring layout flicker.',
      },
      {
        question: 'Scenario 4 (Liquid LCP): Which Liquid configuration ensures the PDP featured image optimizes Largest Contentful Paint (LCP)?',
        options: [
          'loading: "lazy", decoding: "async"',
          'image_tag with explicit widths, sizes="(min-width: 990px) 50vw, 100vw", loading: "eager", and fetchpriority: "high"',
          'Serving uncompressed 4K PNG images without width attributes',
          'Injecting the image via JavaScript after DOMContentLoaded',
        ],
        correctIndex: 1,
        explanation: 'Eager loading and fetchpriority="high" instruct the browser preload scanner to download the hero asset immediately, slashing LCP render delay.',
      },
      {
        question: 'Scenario 5 (Mobile Thumb Zone): Where should primary interactive Add to Cart and Checkout triggers reside on mobile viewports?',
        options: [
          'In the top 15% header navigation',
          'Within the bottom 35% natural thumb sweep zone, supported by safe-area-inset-bottom padding',
          'Inside a hamburger menu submenu',
          'Floating on the left edge of the screen',
        ],
        correctIndex: 1,
        explanation: 'The bottom 35% of mobile screens allows natural, one-handed thumb interaction without requiring hand regripping or finger gymnastics.',
      },
      {
        question: 'Scenario 6 (Sample Ratio Mismatch): A 50/50 test logs 20,000 sessions in Control and 17,200 sessions in Treatment. A Chi-Square test yields p < 0.0001. What action must be taken?',
        options: [
          'Declare Treatment the winner if its CVR is higher.',
          'Immediately invalidate the test, investigate variant crashes/redirection failures, and resolve the tracking bug before retesting.',
          'Double traffic to Treatment to balance the numbers.',
          'Ignore the session discrepancy and evaluate revenue only.',
        ],
        correctIndex: 1,
        explanation: 'Severe SRM indicates systematic sampling bias. Any conversion rate reported by a compromised experiment is statistically untrustworthy.',
      },
      {
        question: 'Scenario 7 (Cross-Border Localization): Why is Delivered Duty Paid (DDP) calculation essential for European and UK checkout expansion?',
        options: [
          'It is required by the US postal service.',
          'It guarantees all import duties and VAT are pre-paid at checkout, eliminating surprise courier doorstep fees that drive package refusal.',
          'It eliminates shipping carrier costs entirely.',
          'It translates product descriptions automatically.',
        ],
        correctIndex: 1,
        explanation: 'DDP provides total price certainty at checkout, eliminating doorstep customs bills that destroy customer trust and generate return chargebacks.',
      },
      {
        question: 'Scenario 8 (Behavioral Architecture): In a 3-tier subscription pricing matrix, what is the role of an asymmetric decoy option?',
        options: [
          'To generate the majority of sales.',
          'To serve as a psychological comparison anchor that makes the premium bundle appear dramatically more cost-effective.',
          'To confuse the customer into buying both options.',
          'To trick search engine crawlers.',
        ],
        correctIndex: 1,
        explanation: 'Decoys exploit relative valuation: making the target bundle look like an obvious bargain compared to a slightly cheaper single-unit tier.',
      },
      {
        question: 'Scenario 9 (Search & Discovery): How does implementing debounced predictive search with AbortController improve conversion?',
        options: [
          'It reduces the price of all searched products.',
          'It delivers sub-100ms visual product suggestions while preventing server request floods and race conditions.',
          'It blocks users from searching for out-of-stock items.',
          'It replaces collection pages entirely.',
        ],
        correctIndex: 1,
        explanation: 'Fast predictive search enables high-intent searchers (who convert at 3x average) to locate and navigate directly to products without friction.',
      },
      {
        question: 'Scenario 10 (Executive ROI): An A/B experiment lifts CVR from 2.0% to 2.2% (10% relative lift) on a $10,000,000/yr store with steady AOV. What is the annualized revenue impact?',
        options: [
          '$200,000',
          '$1,000,000 in incremental gross revenue',
          '$50,000',
          '$10,000,000',
        ],
        correctIndex: 1,
        explanation: 'Annualized Revenue Impact = Baseline Revenue × Relative Lift % = $10,000,000 × 0.10 = $1,000,000 in incremental annual top-line revenue.',
      },
    ],
  },
];

export const ALL_QUIZZES: Quiz[] = [...CRO_QUIZZES, ...SHOPIFY_DEV_QUIZZES];

export function getQuizBySlug(slug: string): Quiz | undefined {
  return ALL_QUIZZES.find((q) => q.slug === slug);
}

export function getQuizByModuleId(moduleId: string): Quiz | undefined {
  return ALL_QUIZZES.find((q) => q.moduleId === moduleId);
}
