import { Quiz } from '../types/curriculum';

export const SHOPIFY_DEV_QUIZZES: Quiz[] = [
  // =========================================================================
  // Module dev-1: Modern Shopify Tooling, CLI 3.x & Theme Anatomy
  // =========================================================================
  {
    id: 'quiz-dev-module-1',
    moduleId: 'dev-module-1',
    slug: 'quiz-dev-module-1',
    title: 'Developer Test: Shopify Architecture, CLI 3.x & Dawn Anatomy',
    questions: [
      {
        question: 'When developing a theme for a live client, why must you request Collaborator Access rather than a staff account?',
        options: [
          'Collaborator accounts are cheaper for the merchant because they do not count toward staff account limits and can be scoped with granular permissions.',
          'Staff accounts cannot run Shopify CLI commands under any circumstances.',
          'Collaborator accounts allow you to bypass two-factor authentication.',
          'Staff accounts automatically delete local theme files upon logout.',
        ],
        correctIndex: 0,
        explanation: 'Collaborator accounts do not count toward the merchant’s plan staff account limits and allow the merchant to grant fine-grained permissions without sharing master credentials.',
      },
      {
        question: 'What happens under the hood when you execute `shopify theme dev --store your-store.myshopify.com`?',
        options: [
          'It immediately overwrites and publishes the live production theme.',
          'It uploads local files to an isolated development theme, runs a local proxy at 127.0.0.1:9292, and enables Hot Reloading.',
          'It downloads the merchant’s customer database into local SQLite.',
          'It compiles all Liquid files into React client components.',
        ],
        correctIndex: 1,
        explanation: '`shopify theme dev` creates a hidden development theme on the store, runs a local proxy server syncing with Shopify edge nodes, and hot-reloads changes.',
      },
      {
        question: 'What is the critical function of `{{ content_for_header }}` inside `layout/theme.liquid`?',
        options: [
          'It simply prints the merchant’s store name in an <h1> tag.',
          'It is an optional tag used only for SEO meta descriptions.',
          'It dynamically injects platform scripts, Google analytics tags, App Embed blocks, and required checkout telemetry.',
          'It serves as a CSS reset stylesheet for Internet Explorer.',
        ],
        correctIndex: 2,
        explanation: 'Removing `{{ content_for_header }}` breaks all installed Shopify apps, platform telemetry, and checkout redirects because Shopify relies on it to inject essential platform scripts.',
      },
      {
        question: 'Why should `config/settings_data.json` NEVER be added to `.gitignore`?',
        options: [
          'Because Git refuses to push repositories that contain .json files.',
          'Because it stores merchant customizations, typography, colors, and section configurations; ignoring it resets newly deployed themes to blank defaults.',
          'Because Shopify CLI throws an unrecoverable kernel panic if settings_data.json is missing.',
          'Because it stores the secret API keys for the live payment gateway.',
        ],
        correctIndex: 1,
        explanation: '`settings_data.json` contains the active values of all theme settings configured by the merchant in the Theme Editor. If ignored in Git, production deployments overwrite merchant configurations.',
      },
      {
        question: 'Which tool does Shopify recommend for static code analysis and linting of Liquid and theme assets?',
        options: [
          'ESLint only',
          'Theme Check (`shopify theme check`)',
          'Prettier Liquid plugin',
          'RuboCop',
        ],
        correctIndex: 1,
        explanation: '`theme-check` is Shopify’s official linter for Liquid and JSON templates, analyzing performance traps, missing image dimensions, and deprecated tags.',
      },
    ],
  },

  // =========================================================================
  // Module dev-2: Deep Liquid Engine & High-Performance Templating
  // =========================================================================
  {
    id: 'quiz-dev-module-2',
    moduleId: 'dev-module-2',
    slug: 'quiz-dev-module-2',
    title: 'Developer Test: Deep Liquid Engine, Scoping & Execution Profiling',
    questions: [
      {
        question: 'What is the fundamental difference in variable scope between `{% include %}` and `{% render %}`?',
        options: [
          '`{% include %}` is isolated, while `{% render %}` shares global scope.',
          '`{% render %}` runs in an isolated scope and cannot access parent variables unless explicitly passed as arguments; `{% include %}` mutates global scope.',
          '`{% render %}` only works for SVG assets, whereas `{% include %}` works for Liquid.',
          'There is no difference; `render` is simply an alias for `include`.',
        ],
        correctIndex: 1,
        explanation: '`{% render %}` enforces variable isolation, avoiding variable scope pollution and allowing Shopify’s compiler to aggressively optimize and cache snippet execution.',
      },
      {
        question: 'Why is referencing `all_products[item_handle]` inside a `for` loop across 50 products considered a severe performance anti-pattern?',
        options: [
          'Because it crashes the client’s browser with out-of-memory errors.',
          'Because it triggers N+1 drop resolutions on the server, multiplying AST operations and causing server TTFB to spike by seconds.',
          'Because Liquid does not allow more than one product on a page.',
          'Because all_products only returns products that are currently discounted.',
        ],
        correctIndex: 1,
        explanation: 'Calling `all_products` inside an iteration loop creates an N+1 resolution bottleneck on Shopify servers, inflating server rendering time and degrading TTFB.',
      },
      {
        question: 'Given an array of product variants, which Liquid filter combination extracts only in-stock variant IDs without manual loops?',
        options: [
          '`product.variants | where: "available", true | map: "id"`',
          '`product.variants | filter_by: "stock" | extract: "id"`',
          '`product.variants | select: "available" | pluck: "id"`',
          '`product.variants | find: "in_stock"`',
        ],
        correctIndex: 0,
        explanation: 'The `where` filter filters arrays of objects by key-value pairs, and `map` extracts a specific property from each object.',
      },
      {
        question: 'Why should storefront navigation links use `{{ routes.cart_url }}` instead of hardcoded `"/cart"`?',
        options: [
          'Because `routes.cart_url` encrypts the customer credit card.',
          'To ensure localized URL subfolders (e.g. `/fr/cart` or `/de-de/cart` in Shopify Markets) route correctly without 404s or language resets.',
          'Because Shopify plans to deprecate the word "cart" in 2027.',
          'Because hardcoded URLs are blocked by ad-blockers.',
        ],
        correctIndex: 1,
        explanation: 'The `routes` object dynamically provides the localized URL path corresponding to the customer’s active locale and market subfolder.',
      },
      {
        question: 'What is the maximum number of items that can be iterated in a single collection loop without wrapping it in `{% paginate %}`?',
        options: [
          '20 items',
          '50 items',
          '250 items',
          'Unlimited items',
        ],
        correctIndex: 1,
        explanation: 'Shopify hard-limits unpaginated collection iterations to 50 items. To display more, you must wrap the loop in `{% paginate collection.products by N %}` (max 50 per page).',
      },
    ],
  },

  // =========================================================================
  // Module dev-3: Online Store 2.0, JSON Templates & Section Groups
  // =========================================================================
  {
    id: 'quiz-dev-module-3',
    moduleId: 'dev-module-3',
    slug: 'quiz-dev-module-3',
    title: 'Developer Test: Online Store 2.0, Section Schemas & App Blocks',
    questions: [
      {
        question: 'What is the primary benefit of JSON Templates (`templates/*.json`) over legacy `.liquid` templates?',
        options: [
          'JSON templates execute faster in the browser because they are compiled to WebAssembly.',
          'JSON templates allow merchants to add, reorder, configure, and remove sections dynamically on ANY page template, not just the homepage.',
          'JSON templates remove the need for HTML and CSS entirely.',
          'JSON templates encrypt store prices to prevent scrapers.',
        ],
        correctIndex: 1,
        explanation: 'JSON templates store section layouts and configurations in pure JSON, enabling the Theme Editor drag-and-drop block builder on product, collection, blog, and custom pages.',
      },
      {
        question: 'Why must `{{ block.shopify_attributes }}` be included on a block’s outer HTML container in a section?',
        options: [
          'It applies default Tailwind styles to the block.',
          'It connects the DOM element to the Theme Customizer’s live click-to-select inspector and instant reordering engine.',
          'It prevents the block from being copied by competitors.',
          'It translates the block text into Arabic and French automatically.',
        ],
        correctIndex: 1,
        explanation: '`shopify_attributes` outputs data attributes that the Theme Customizer uses to highlight, select, and reorder blocks in real time when the merchant clicks them.',
      },
      {
        question: 'Which tag in `layout/theme.liquid` is used to render global Section Groups like `header-group.json`?',
        options: [
          '`{% section "header-group" %}`',
          '`{% sections "header-group" %}` (plural)',
          '`{% render_group "header-group" %}`',
          '`{% include_sections "header-group" %}`',
        ],
        correctIndex: 1,
        explanation: 'Section groups are rendered using the plural `{% sections %}` tag, distinguishing them from individual static sections.',
      },
      {
        question: 'How do you allow third-party apps to inject App Blocks inside your custom section schema?',
        options: [
          'By adding `{"type": "@app"}` to the `"blocks"` array in the section schema.',
          'By hardcoding the app developer’s script tag in the template.',
          'By setting `"allow_apps": true` in config/settings_schema.json.',
          'By granting API read permissions to all apps.',
        ],
        correctIndex: 0,
        explanation: 'Declaring `{"type": "@app"}` in the schema blocks array tells Shopify that merchants can place app-provided blocks into this section.',
      },
    ],
  },

  // =========================================================================
  // Module dev-4: Front-End Interactivity, Ajax Cart API & Predictive Search
  // =========================================================================
  {
    id: 'quiz-dev-module-4',
    moduleId: 'dev-module-4',
    slug: 'quiz-dev-module-4',
    title: 'Developer Test: Ajax Cart API, Section Rendering & Web Components',
    questions: [
      {
        question: 'How does the Section Rendering API work when adding an item to cart via `/cart/add.js`?',
        options: [
          'It forces the browser to reload the entire HTML document.',
          'You pass `sections: "cart-drawer,cart-bubble"`, and Shopify returns pre-rendered Liquid HTML strings for those sections in the JSON response.',
          'It executes client-side React templates stored in localStorage.',
          'It sends an SMS to the merchant notifying them of an add-to-cart.',
        ],
        correctIndex: 1,
        explanation: 'The Section Rendering API generates fresh server-side Liquid HTML for specified sections and bundles the strings in the JSON response, eliminating client-side templating.',
      },
      {
        question: 'Why is `AbortController` essential when building a real-time autocomplete Predictive Search input?',
        options: [
          'To stop the user from typing too fast.',
          'To cancel in-flight HTTP requests when the user types a new character, preventing slower earlier responses from overwriting newer results (race conditions).',
          'To encrypt search queries for GDPR compliance.',
          'To force the search endpoint to return cached results only.',
        ],
        correctIndex: 1,
        explanation: '`AbortController` cancels stale pending fetch requests, preventing race conditions where an older query resolves after a newer query and corrupts the UI.',
      },
      {
        question: 'When a customer selects a variant swatch on a PDP, what native browser API should update the URL query string (`?variant=123`) without triggering a page reload?',
        options: [
          '`window.location.reload()`',
          '`window.history.replaceState()`',
          '`document.write()`',
          '`window.location.assign()`',
        ],
        correctIndex: 1,
        explanation: '`window.history.replaceState()` updates the URL in the browser address bar without triggering a full page navigation, preserving customer scroll position and state.',
      },
      {
        question: 'What HTTP header must ALWAYS be included in fetch POST requests to `/cart/add.js` to prevent Shopify from returning a 302 redirect?',
        options: [
          '`"Accept": "application/json"`',
          '`"X-Shopify-Force-Json": "true"`',
          '`"Content-Encoding": "gzip"`',
          '`"Authorization": "Bearer storefront"`',
        ],
        correctIndex: 0,
        explanation: 'Without `"Accept": "application/json"`, Shopify assumes the request is a standard browser form submission and responds with an HTTP 302 redirect to `/cart`.',
      },
    ],
  },

  // =========================================================================
  // Module dev-5: Custom Data Modeling: Metafields & Metaobjects
  // =========================================================================
  {
    id: 'quiz-dev-module-5',
    moduleId: 'dev-module-5',
    slug: 'quiz-dev-module-5',
    title: 'Developer Test: Metafields 2.0 Type System & Metaobjects Architecture',
    questions: [
      {
        question: 'In Liquid, how must you access the underlying object from a reference Metafield (such as a product or file reference)?',
        options: [
          '`product.metafields.custom.related_product`',
          '`product.metafields.custom.related_product.value`',
          '`product.metafields.custom.related_product.target`',
          '`product.metafields.custom.related_product | resolve`',
        ],
        correctIndex: 1,
        explanation: 'Reference Metafields require appending `.value` in Liquid to resolve the underlying ProductDrop, FileDrop, or MetaobjectDrop.',
      },
      {
        question: 'What is the fundamental architectural difference between a Metafield and a Metaobject?',
        options: [
          'Metafields can only store numbers, whereas Metaobjects store strings.',
          'Metafields are single fields attached to existing resources; Metaobjects are independent custom multi-field data entities with their own schema.',
          'Metafields are stored on the server, whereas Metaobjects are stored in the customer’s browser cookies.',
          'Metafields can be indexed by Google, but Metaobjects are strictly private.',
        ],
        correctIndex: 1,
        explanation: 'Metaobjects act like custom database models with multiple configurable fields, which can be referenced repeatedly or published as standalone web pages.',
      },
      {
        question: 'Can Metaobjects be published as standalone indexable Web Pages with custom URLs and SEO metadata?',
        options: [
          'No, Metaobjects are strictly for internal admin storage.',
          'Yes, by enabling "Web pages" on the Metaobject definition, Shopify generates public URLs with customizable templates.',
          'Only if the store is on the enterprise Shopify Plus plan.',
          'Only when integrated with a headless Hydrogen storefront.',
        ],
        correctIndex: 1,
        explanation: 'Shopify supports Metaobject Web Pages natively across all plans, enabling custom post types like author profiles, recipes, or store locations with dedicated URLs.',
      },
    ],
  },

  // =========================================================================
  // Module dev-6: Customer Accounts, Privacy & Customer Consent API
  // =========================================================================
  {
    id: 'quiz-dev-module-6',
    moduleId: 'dev-module-6',
    slug: 'quiz-dev-module-6',
    title: 'Developer Test: Customer Accounts, UI Extensions & Privacy APIs',
    questions: [
      {
        question: 'How do customers authenticate in Shopify New Customer Accounts?',
        options: [
          'By creating a 12-character alphanumeric password.',
          'Via a passwordless 6-digit One-Time Passcode (OTP) sent to their email, or via passkeys / Google SSO.',
          'By answering security questions configured upon account registration.',
          'Through SMS text messages only.',
        ],
        correctIndex: 1,
        explanation: 'New Customer Accounts eliminate passwords in favor of 6-digit OTP codes, passkeys, and single sign-on (SSO) to maximize security and reduce login drop-offs.',
      },
      {
        question: 'Can you customize New Customer Accounts by editing Liquid files in `templates/customers/`?',
        options: [
          'Yes, using standard Liquid objects.',
          'No, New Customer Accounts run in a secure Web Worker sandbox and are customized exclusively via Customer Account UI Extensions.',
          'Only on Shopify Plus stores.',
          'Only by injecting jQuery scripts in the theme layout.',
        ],
        correctIndex: 1,
        explanation: 'New Customer Accounts do not use Liquid. They are extended using Customer Account UI Extensions built with React and TypeScript via Shopify CLI.',
      },
      {
        question: 'Under GDPR/CPRA, which JavaScript method must evaluate to `true` before your theme fires marketing or retargeting pixels?',
        options: [
          '`window.Shopify.customerPrivacy.marketingAllowed()`',
          '`document.cookie.includes("gdpr_ok")`',
          '`navigator.doNotTrack === "0"`',
          '`window.Shopify.analytics.isOptedIn()`',
        ],
        correctIndex: 0,
        explanation: 'The Shopify Customer Privacy API provides `marketingAllowed()` and `analyticsProcessingAllowed()` to ensure compliance with global privacy regulations.',
      },
    ],
  },

  // =========================================================================
  // Module dev-7: Checkout Extensibility & Checkout UI Extensions
  // =========================================================================
  {
    id: 'quiz-dev-module-7',
    moduleId: 'dev-module-7',
    slug: 'quiz-dev-module-7',
    title: 'Developer Test: Checkout Extensibility & UI Extension Hooks',
    questions: [
      {
        question: 'Why did Shopify deprecate `checkout.liquid` in favor of Checkout Extensibility?',
        options: [
          'To force all stores to migrate to WordPress.',
          'Because `checkout.liquid` was insecure (vulnerable to script skimming), slow, and broke during platform updates like One-Page Checkout.',
          'Because `checkout.liquid` could not support multiple languages.',
          'To restrict checkout customization exclusively to Shopify employees.',
        ],
        correctIndex: 1,
        explanation: 'Checkout Extensibility sandboxes extensions in isolated Web Workers, eliminating credit card skimming vulnerabilities while guaranteeing upgradeability.',
      },
      {
        question: 'Which hook in `@shopify/ui-extensions-react/checkout` allows an extension to add a pre-purchase upsell variant directly into the active checkout session?',
        options: [
          '`useApplyCartLinesChange()`',
          '`useCheckoutMutation()`',
          '`fetch("/cart/add.js")`',
          '`useAddLineItem()`',
        ],
        correctIndex: 0,
        explanation: '`useApplyCartLinesChange()` provides a safe programmatic interface to append, mutate, or remove line items in the active checkout session.',
      },
      {
        question: 'Can Checkout UI Extensions access the raw `window` object or manipulate DOM nodes with `document.querySelector`?',
        options: [
          'Yes, standard DOM APIs work everywhere.',
          'No, extensions execute inside an isolated Web Worker sandbox and must render using Shopify UI Components (`BlockStack`, `Text`, etc.).',
          'Only if the store is on the Advanced plan.',
          'Only when testing locally via localhost.',
        ],
        correctIndex: 1,
        explanation: 'Checkout UI Extensions run inside a Web Worker with zero access to `window` or `document`. They emit declarative component instructions to Shopify’s native host renderer.',
      },
    ],
  },

  // =========================================================================
  // Module dev-8: Shopify Functions & WebAssembly (Wasm) Backend Logic
  // =========================================================================
  {
    id: 'quiz-dev-module-8',
    moduleId: 'dev-module-8',
    slug: 'quiz-dev-module-8',
    title: 'Developer Test: Shopify Functions Architecture & Wasm Performance',
    questions: [
      {
        question: 'What is the performance execution SLA for a Shopify Function executing during checkout?',
        options: [
          'Under 5 milliseconds (<5ms)',
          'Under 500 milliseconds (<500ms)',
          'Under 3 seconds (<3s)',
          'Under 10 seconds (<10s)',
        ],
        correctIndex: 0,
        explanation: 'Shopify Functions are compiled to WebAssembly (Wasm) and execute within a strict sub-5 millisecond SLA directly in core order processing pipelines.',
      },
      {
        question: 'Can a Shopify Function make an asynchronous HTTP `fetch()` call to an external database or ERP during checkout?',
        options: [
          'Yes, by using standard Node.js libraries.',
          'No, Functions are pure Wasm binaries with no network or filesystem access; all required data must be pre-declared in `run.graphql`.',
          'Only if the external endpoint responds in under 100ms.',
          'Only when querying Google Cloud Firestore.',
        ],
        correctIndex: 1,
        explanation: 'Shopify Functions cannot make external network calls. All data must be fetched upfront by Shopify via the GraphQL input query defined in `run.graphql`.',
      },
      {
        question: 'Which compiler is used by Shopify to compile TypeScript/JavaScript code into a WebAssembly binary for Shopify Functions?',
        options: [
          'Babel',
          'Javy (JavaScript-to-WebAssembly compiler)',
          'Vite',
          'SWC',
        ],
        correctIndex: 1,
        explanation: 'Javy is an open-source tool developed by Shopify that embeds a lightweight QuickJS engine and compiles JS/TS code into runnable WebAssembly modules.',
      },
    ],
  },

  // =========================================================================
  // Module dev-9: Shopify App Architecture, Remix & App Bridge 4.0
  // =========================================================================
  {
    id: 'quiz-dev-module-9',
    moduleId: 'dev-module-9',
    slug: 'quiz-dev-module-9',
    title: 'Developer Test: Remix App Architecture, Session Tokens & App Bridge',
    questions: [
      {
        question: 'Why are standard browser cookies unreliable for authenticating embedded Shopify apps in modern browsers?',
        options: [
          'Because Shopify Admin runs in dark mode.',
          'Because embedded apps run inside an <iframe>, and modern browser privacy features (like Safari ITP) block third-party cookies by default.',
          'Because cookies are limited to 10 bytes of storage.',
          'Because Shopify deletes cookies every 5 minutes.',
        ],
        correctIndex: 1,
        explanation: 'Third-party cookie blocking in Safari, Chrome, and Firefox breaks traditional cookie-based sessions inside iframes. Embedded apps use signed JWT Session Tokens provided by App Bridge.',
      },
      {
        question: 'In the official Shopify App Remix template, where should calls to the Shopify GraphQL Admin API be executed?',
        options: [
          'Inside React `useEffect` hooks in the browser.',
          'Inside server-side Remix `loader` and `action` functions using `admin.graphql`.',
          'In public client-side `<script>` tags.',
          'Inside the service worker.',
        ],
        correctIndex: 1,
        explanation: 'Admin API queries require access tokens and must be executed securely on the server inside Remix loaders and actions, never on the client.',
      },
      {
        question: 'In App Bridge 4.0, how do you trigger a native Shopify toast notification?',
        options: [
          '`shopify.toast.show("Message")`',
          '`alert("Message")`',
          '`window.parent.postMessage({ action: "toast" })`',
          '`document.getElementById("toast").show()`',
        ],
        correctIndex: 0,
        explanation: 'App Bridge 4.0 exposes the global `shopify` utility object with clean helper methods like `shopify.toast.show("Settings updated")`.',
      },
    ],
  },

  // =========================================================================
  // Module dev-10: GraphQL Admin API, Pagination & Bulk Operations
  // =========================================================================
  {
    id: 'quiz-dev-module-10',
    moduleId: 'dev-module-10',
    slug: 'quiz-dev-module-10',
    title: 'Developer Test: GraphQL Admin API, Leaky Bucket & Bulk Operations',
    questions: [
      {
        question: 'How does Shopify GraphQL evaluate rate limits compared to legacy REST APIs?',
        options: [
          'It counts the total number of HTTP requests per minute.',
          'It uses a Leaky Bucket algorithm that calculates query complexity cost based on requested fields and connection multipliers.',
          'It limits requests based on the IP address of the developer.',
          'It charges $0.01 per query via the merchant credit card.',
        ],
        correctIndex: 1,
        explanation: 'The Leaky Bucket limiter tracks points based on query complexity (fields and nested connection limits like `first: 25`), replenishing at 50 points/second.',
      },
      {
        question: 'When exporting 50,000 products with all their variants and metafields, which API should you use?',
        options: [
          'Standard cursor pagination in a sequential `while` loop.',
          'The Bulk Operations API (`bulkOperationRunQuery`), which generates a compressed JSONL file asynchronously.',
          'REST Admin API with `limit=250`.',
          'Exporting via browser CSV download.',
        ],
        correctIndex: 1,
        explanation: 'The Bulk Operations API bypasses standard request timeouts and rate limit bottlenecks by executing asynchronous catalog dumps on Shopify database clusters.',
      },
      {
        question: 'If a GraphQL mutation returns HTTP 200 OK, does this guarantee the record was created successfully?',
        options: [
          'Yes, HTTP 200 in GraphQL always guarantees success.',
          'No, GraphQL returns HTTP 200 even when mutations fail; you must inspect the `userErrors` array inside the response payload.',
          'Only if the response contains no warnings.',
          'Only for product mutations, but not customer mutations.',
        ],
        correctIndex: 1,
        explanation: 'GraphQL returns HTTP 200 as long as the query document was syntactically valid. Domain validation failures are returned in `data[mutationName].userErrors`.',
      },
    ],
  },

  // =========================================================================
  // Module dev-11: Event-Driven Webhooks, Security & Amazon EventBridge
  // =========================================================================
  {
    id: 'quiz-dev-module-11',
    moduleId: 'dev-module-11',
    slug: 'quiz-dev-module-11',
    title: 'Developer Test: Webhook HMAC Verification, Idempotency & GDPR',
    questions: [
      {
        question: 'Why must you calculate the HMAC SHA-256 signature using the raw, unparsed request body buffer rather than parsed JSON?',
        options: [
          'Because parsed JSON removes whitespace and changes key order, which alters the computed hash and causes HMAC verification to fail.',
          'Because Node.js cannot compute hashes of strings.',
          'Because buffers are encrypted by default.',
          'Because Shopify requires all webhooks to be compressed with gzip.',
        ],
        correctIndex: 0,
        explanation: 'JSON deserialization alters whitespace and key serialization. The HMAC signature was computed by Shopify using the exact raw byte stream.',
      },
      {
        question: 'What is the risk of not implementing idempotency (deduplication) on webhook listeners?',
        options: [
          'Shopify will revoke your developer partner account immediately.',
          'Shopify guarantees "at-least-once" delivery, so network retries can send the exact same event twice, potentially causing double charges or duplicate shipments.',
          'The webhook endpoint will return an HTTP 500 error.',
          'The merchant’s store theme will crash.',
        ],
        correctIndex: 1,
        explanation: 'At-least-once delivery means transient network hiccups can cause duplicate webhook transmissions. Apps must check `X-Shopify-Webhook-Id` to prevent duplicate processing.',
      },
      {
        question: 'Which 3 compliance webhooks are mandatory for public Shopify App Store approval?',
        options: [
          '`orders/create`, `products/update`, `app/uninstalled`',
          '`customers/data_request`, `customers/redact`, `shop/redact`',
          '`billing/charge`, `refund/create`, `tax/calculate`',
          '`cart/abandoned`, `checkout/complete`, `customer/login`',
        ],
        correctIndex: 1,
        explanation: 'Shopify enforces strict GDPR/privacy compliance. All public apps must implement `customers/data_request`, `customers/redact`, and `shop/redact`.',
      },
    ],
  },

  // =========================================================================
  // Module dev-12: Shopify Billing API, Polaris UI & App Store Launch
  // =========================================================================
  {
    id: 'quiz-dev-module-12',
    moduleId: 'dev-module-12',
    slug: 'quiz-dev-module-12',
    title: 'Developer Test: Shopify Billing API, Polaris Guidelines & Launch Gate',
    questions: [
      {
        question: 'Can a public Shopify app charge merchants using an external Stripe or PayPal checkout integration?',
        options: [
          'Yes, as long as the merchant agrees in the terms of service.',
          'No, all public apps MUST process charges through the Shopify Billing API; external billing integrations result in immediate app rejection or ban.',
          'Only for stores outside the United States.',
          'Only if the app price is under $10 per month.',
        ],
        correctIndex: 1,
        explanation: 'Shopify strictly mandates the Shopify Billing API for all public app charges to ensure unified billing on the merchant’s Shopify invoice.',
      },
      {
        question: 'What is Shopify’s developer revenue share policy on the Shopify App Store?',
        options: [
          'Shopify takes a flat 30% cut of all app revenue.',
          '0% rev share on your first $1,000,000 USD in gross app revenue annually (15% rev share thereafter upon registration).',
          '50% rev share on all subscription plans.',
          'Shopify takes no revenue share, but charges $5,000 per month per app.',
        ],
        correctIndex: 1,
        explanation: 'Shopify offers a 0% revenue share tier on the first $1M USD generated each year, making it one of the most developer-friendly app ecosystems in tech.',
      },
      {
        question: 'Which Polaris component should be used to display an empty state when a merchant has not yet configured any records?',
        options: [
          '`<Card>`',
          '`<EmptyState>`',
          '`<Spinner>`',
          '`<IndexTable>`',
        ],
        correctIndex: 1,
        explanation: '`<EmptyState>` provides a clear illustration, friendly messaging, and an actionable primary CTA to guide merchants during initial setup.',
      },
    ],
  },

  // =========================================================================
  // Module dev-13: Headless Commerce with Hydrogen & Oxygen
  // =========================================================================
  {
    id: 'quiz-dev-module-13',
    moduleId: 'dev-module-13',
    slug: 'quiz-dev-module-13',
    title: 'Developer Test: Headless Commerce, Hydrogen & Oxygen Deployment',
    questions: [
      {
        question: 'What is a major trade-off when a merchant chooses a Headless architecture over a Liquid theme?',
        options: [
          'Headless storefronts cannot accept credit cards.',
          'Merchants lose out-of-the-box Theme Editor drag-and-drop customization and cannot automatically use apps that inject theme widgets without custom frontend integration.',
          'Headless stores cannot sell internationally.',
          'Headless stores are limited to 100 products.',
        ],
        correctIndex: 1,
        explanation: 'Headless storefronts decouple the frontend completely, meaning standard Theme Editor sections and theme-dependent App Store widgets require custom developer implementation.',
      },
      {
        question: 'What technology powers Shopify Oxygen hosting?',
        options: [
          'Traditional Apache servers hosted on AWS EC2.',
          'Global edge worker infrastructure (Cloudflare Workers) deployed across 285+ cities worldwide.',
          'A single monolithic server cluster in Ottawa, Canada.',
          'Client-side browsers via peer-to-peer WebRTC.',
        ],
        correctIndex: 1,
        explanation: 'Oxygen executes Hydrogen applications on global edge workers with sub-millisecond cold starts and built-in subrequest caching.',
      },
      {
        question: 'How does Hydrogen optimize slow third-party API calls (like customer reviews) without blocking page rendering?',
        options: [
          'By running them on the customer’s phone.',
          'Through Streaming SSR and deferred data fetching using Remix `defer`, `<Await>`, and React `<Suspense>`.',
          'By caching responses indefinitely in localStorage.',
          'By omitting the data altogether on mobile devices.',
        ],
        correctIndex: 1,
        explanation: 'Hydrogen uses Remix streaming SSR: critical above-the-fold HTML streams immediately, while slower secondary queries stream in as they resolve.',
      },
    ],
  },

  // =========================================================================
  // Module dev-14: Shopify Plus B2B & Wholesale Architecture
  // =========================================================================
  {
    id: 'quiz-dev-module-14',
    moduleId: 'dev-module-14',
    slug: 'quiz-dev-module-14',
    title: 'Developer Test: Shopify B2B Wholesale Architecture & Pricing Rules',
    questions: [
      {
        question: 'What is the core entity hierarchy in Shopify Plus native B2B?',
        options: [
          'Customer -> Order -> Invoice',
          'Company -> Company Location -> Company Contact / Catalogs',
          'Distributor -> Wholesaler -> Retailer',
          'Account -> Organization -> Store',
        ],
        correctIndex: 1,
        explanation: 'A Company represents the corporate entity, containing multiple physical or billing Locations, each with assigned Catalogs, Price Lists, and Contacts.',
      },
      {
        question: 'In Liquid, how do you verify if the current authenticated customer is a B2B wholesale buyer?',
        options: [
          '`{% if customer.b2b? %}`',
          '`{% if customer.tags contains "wholesale" %}`',
          '`{% if customer.is_b2b_buyer %}`',
          '`{% if shop.b2b_enabled %}`',
        ],
        correctIndex: 0,
        explanation: '`customer.b2b?` is the native platform boolean drop in Liquid that returns true if the customer is logged in as a registered B2B company contact.',
      },
      {
        question: 'What do Quantity Rules allow B2B merchants to enforce on wholesale products?',
        options: [
          'Restricting purchases to specific days of the week.',
          'Enforcing minimum order quantities (MOQ), maximum order limits, and packaging increments (e.g. must buy in multiples of 12).',
          'Limiting how many times a user can view a product image.',
          'Requiring proof of identification before adding to cart.',
        ],
        correctIndex: 1,
        explanation: 'Quantity Rules enforce MOQs, maximum quantities, and packaging increment steps (case packs) on product variants.',
      },
    ],
  },

  // =========================================================================
  // Module dev-15: Shopify Flow Custom Extensions & ERP Integrations
  // =========================================================================
  {
    id: 'quiz-dev-module-15',
    moduleId: 'dev-module-15',
    slug: 'quiz-dev-module-15',
    title: 'Developer Test: Shopify Flow Extensions & Inventory Routing',
    questions: [
      {
        question: 'What are the three structural building blocks of an automation workflow in Shopify Flow?',
        options: [
          'Input, Process, Output',
          'Trigger, Condition, Action',
          'Webhook, Lambda, Database',
          'Event, Listener, Dispatcher',
        ],
        correctIndex: 1,
        explanation: 'Shopify Flow workflows follow a declarative Trigger (event that starts the workflow) -> Condition (rules to evaluate) -> Action (operations to run) pipeline.',
      },
      {
        question: 'Which GraphQL mutation allows your custom Shopify App to trigger a workflow in Shopify Flow?',
        options: [
          '`flowTriggerReceive`',
          '`flowEmitEvent`',
          '`triggerShopifyFlow`',
          '`executeFlowWorkflow`',
        ],
        correctIndex: 0,
        explanation: '`flowTriggerReceive` is the official mutation that delivers external events into Shopify Flow to initiate custom app-defined triggers.',
      },
      {
        question: 'When adjusting inventory via API across multi-location stores, why is specifying the `locationId` mandatory?',
        options: [
          'Because Shopify requires geolocation GPS coordinates.',
          'Because inventory is tracked at specific physical locations (warehouses, retail stores); omitting locationId prevents accurate fulfillment routing and stock auditing.',
          'To calculate local sales tax.',
          'Because locations determine the product currency.',
        ],
        correctIndex: 1,
        explanation: 'Inventory on Shopify is strictly scoped to `Location` records. Adjustments must specify the exact location ID where inventory was added or deducted.',
      },
    ],
  },

  // =========================================================================
  // Module dev-16: Enterprise DevOps, CI/CD, Playwright E2E & Launch
  // =========================================================================
  {
    id: 'quiz-dev-module-16',
    moduleId: 'dev-module-16',
    slug: 'quiz-dev-module-16',
    title: 'Developer Test: Enterprise DevOps, Playwright CI/CD & Master Certification',
    questions: [
      {
        question: 'In an enterprise GitHub Actions CI workflow for Shopify themes, what should happen when a developer opens a Pull Request?',
        options: [
          'The live production theme is immediately updated.',
          '`shopify theme check` lints the code, automated Playwright E2E tests run, and the branch is deployed to an isolated preview theme with a bot commenting the preview URL.',
          'All customer orders are halted until the PR is merged.',
          'The theme is compiled into a zip file and emailed to the store owner.',
        ],
        correctIndex: 1,
        explanation: 'Enterprise CI/CD executes automated linting and Playwright tests against an ephemeral preview theme so stakeholders can QA changes safely before merging.',
      },
      {
        question: 'How do automated Playwright tests bypass the password page on password-protected Shopify development stores?',
        options: [
          'By hacking the Shopify database.',
          'By navigating to `/password`, filling the password input field, and persisting the session cookie across subsequent test requests.',
          'Password pages cannot be bypassed in automated tests.',
          'By using a VPN located in Canada.',
        ],
        correctIndex: 1,
        explanation: 'Playwright can automate filling the password form once or inject the storefront password authentication cookie into browser storage context.',
      },
      {
        question: 'What are Google’s recommended Core Web Vitals thresholds for a high-converting ecommerce store on mobile?',
        options: [
          'LCP < 2.5s, INP < 200ms, CLS < 0.1',
          'LCP < 8.0s, INP < 1000ms, CLS < 0.5',
          'LCP < 0.1s, INP < 1ms, CLS < 0.0',
          'Any score above 50 on desktop',
        ],
        correctIndex: 0,
        explanation: 'Core Web Vitals "Good" thresholds: Largest Contentful Paint (LCP) under 2.5 seconds, Interaction to Next Paint (INP) under 200ms, and Cumulative Layout Shift (CLS) under 0.1.',
      },
      {
        question: 'Before pointing production DNS to Shopify for a high-volume store launch, which critical step prevents backlink and SEO collapse?',
        options: [
          'Deleting all legacy product descriptions.',
          'Exporting legacy URLs and uploading 301 URL Redirect mappings to Shopify to preserve search rankings and customer bookmarks.',
          'Changing all product prices to zero.',
          'Disabling Google Analytics for 48 hours.',
        ],
        correctIndex: 1,
        explanation: 'Mapping 301 URL redirects ensures that all historical links, indexed search results, and bookmarks resolve cleanly to their new Shopify URL destinations without 404 errors.',
      },
    ],
  },
];
