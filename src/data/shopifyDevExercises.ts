import { Exercise } from '../types/curriculum';

export const SHOPIFY_DEV_EXERCISES: Exercise[] = [
  // =========================================================================
  // Module dev-1: Modern Shopify Tooling & Theme Anatomy
  // =========================================================================
  {
    id: 'ex-dev-m1-code',
    moduleId: 'dev-module-1',
    slug: 'author-settings-schema-json',
    title: 'Code Challenge: Author Custom Color & Range Controls in settings_schema.json',
    type: 'code',
    difficulty: 'easy',
    xp: 25,
    prompt: `You are building a custom enterprise theme based on Dawn. Author a valid JSON array block for 'config/settings_schema.json' containing a section named "Storefront Typography & Buttons" with:
1. A color setting with id "button_bg_color", label "Primary Button Color", and default "#4f46e5".
2. A range setting with id "button_radius", min 0, max 30, step 2, unit "px", label "Button Corner Radius", and default 6.`,
    starterCode: `[
  {
    "name": "Storefront Typography & Buttons",
    "settings": [
      // Add settings here
    ]
  }
]`,
    solution: `[
  {
    "name": "Storefront Typography & Buttons",
    "settings": [
      {
        "type": "color",
        "id": "button_bg_color",
        "label": "Primary Button Color",
        "default": "#4f46e5"
      },
      {
        "type": "range",
        "id": "button_radius",
        "min": 0,
        "max": 30,
        "step": 2,
        "unit": "px",
        "label": "Button Corner Radius",
        "default": 6
      }
    ]
  }
]`,
    explanation: 'settings_schema.json controls the global Theme Editor sidebar. Defining strongly-typed inputs empowers merchants to customize design tokens without editing code.',
  },
  {
    id: 'ex-dev-m1-mcq',
    moduleId: 'dev-module-1',
    slug: 'shopify-cli-collaborator-best-practice',
    title: 'Client Store Takeover: Partner Accounts & Collaborator Access',
    type: 'multiple-choice',
    difficulty: 'easy',
    xp: 15,
    prompt: 'You are hired to build custom features on an existing high-volume merchant store. How should you gain access to the store codebase?',
    options: [
      'Ask the merchant to email you their store owner email and password.',
      'Submit a Collaborator Request from your Shopify Partner Dashboard with the required 4-digit Collaborator Code and scoped permissions.',
      'Create a new trial store and import the merchant’s products manually.',
      'Have the merchant add your personal Gmail as a Full Administrator staff account.',
    ],
    correctIndex: 1,
    explanation: 'Collaborator requests via the Partner Dashboard are the industry standard: they do not consume merchant staff account seats and provide fine-grained, auditable permission controls.',
  },

  // =========================================================================
  // Module dev-2: Deep Liquid Engine & High-Performance Templating
  // =========================================================================
  {
    id: 'ex-dev-m2-liquid',
    moduleId: 'dev-module-2',
    slug: 'optimized-liquid-variant-filter',
    title: 'Liquid Challenge: Extract In-Stock Variants Without Nested Loop Traps',
    type: 'liquid',
    difficulty: 'medium',
    xp: 30,
    prompt: `Write an efficient Liquid snippet that:
1. Filters the product variants to extract only those where 'available' is true using the 'where' filter.
2. Extracts their variant IDs as an array using the 'map' filter.
3. Renders a summary sentence: "Found X available variants: [comma separated IDs]".`,
    starterCode: `{% comment %} Optimize variant extraction {% endcomment %}
{% assign in_stock = product.variants %}
<!-- Write your liquid logic here -->`,
    solution: `{% assign in_stock = product.variants | where: 'available', true %}
{% assign id_list = in_stock | map: 'id' %}
<p>Found {{ in_stock.size }} available variants: {{ id_list | join: ', ' }}</p>`,
    explanation: 'Using array filters (| where and | map) executes inside native C/Rust AST evaluators on Shopify servers, which is orders of magnitude faster than writing manual nested Liquid for loops.',
  },
  {
    id: 'ex-dev-m2-mcq',
    moduleId: 'dev-module-2',
    slug: 'avoiding-n-plus-one-liquid-loops',
    title: 'Performance Diagnostic: Eliminating N+1 Query Traps in Collections',
    type: 'multiple-choice',
    difficulty: 'medium',
    xp: 20,
    prompt: 'A client’s collection page has a TTFB of 2,400ms. Upon inspecting the theme with the Shopify Theme Inspector, you notice `all_products[handle]` is called inside each product card snippet. How do you resolve this?',
    options: [
      'Replace all_products with custom JavaScript fetch on the client.',
      'Pass the already-loaded `product` object directly into the snippet using `{% render "product-card", product_item: product %}` to eliminate redundant queries.',
      'Upgrade the client’s plan to Shopify Plus to make the server faster.',
      'Disable images on the collection page.',
    ],
    correctIndex: 1,
    explanation: 'Calling all_products inside a collection card loop causes N+1 drop queries. Passing the existing iterated product object eliminates server-side query amplification.',
  },

  // =========================================================================
  // Module dev-3: Online Store 2.0 & Section Schemas
  // =========================================================================
  {
    id: 'ex-dev-m3-code',
    moduleId: 'dev-module-3',
    slug: 'author-section-schema-with-app-blocks',
    title: 'Code Challenge: Author a Section Schema with Presets & App Blocks',
    type: 'code',
    difficulty: 'medium',
    xp: 30,
    prompt: `Author the '{% schema %}' JSON block for a 'product-info.liquid' section that:
1. Has name "Product Information".
2. Contains a text setting for "heading" with default "Product Specifications".
3. Allows App Blocks by including {"type": "@app"} in the blocks array.
4. Includes a preset so it appears in the Theme Editor "Add Section" modal.`,
    starterCode: `{% schema %}
{
  "name": "Product Information",
  // Complete the schema
}
{% endschema %}`,
    solution: `{% schema %}
{
  "name": "Product Information",
  "tag": "section",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Section Heading",
      "default": "Product Specifications"
    }
  ],
  "blocks": [
    {
      "type": "@app"
    }
  ],
  "presets": [
    {
      "name": "Product Information"
    }
  ]
}
{% endschema %}`,
    explanation: 'Declaring {"type": "@app"} is the modern standard that allows review apps and widgets to be embedded cleanly without polluting theme Liquid files.',
  },
  {
    id: 'ex-dev-m3-mcq',
    moduleId: 'dev-module-3',
    slug: 'json-templates-architecture-quiz',
    title: 'Architecture Evaluation: Modifying Layout Order in OS 2.0',
    type: 'multiple-choice',
    difficulty: 'easy',
    xp: 15,
    prompt: 'In an Online Store 2.0 theme, where is the display order of sections on the product page stored?',
    options: [
      'In `layout/theme.liquid`',
      'In `templates/product.json` in the "order" string array',
      'In the store’s MySQL database',
      'In `assets/product.js`',
    ],
    correctIndex: 1,
    explanation: '`templates/product.json` stores the section definitions in the "sections" object and their vertical display order in the "order" array.',
  },

  // =========================================================================
  // Module dev-4: Front-End Interactivity & Ajax Cart API
  // =========================================================================
  {
    id: 'ex-dev-m4-code',
    moduleId: 'dev-module-4',
    slug: 'ajax-cart-section-rendering-fetch',
    title: 'Code Challenge: Asynchronous Cart Add with Section Rendering API',
    type: 'code',
    difficulty: 'hard',
    xp: 35,
    prompt: `Write a JavaScript function 'addToCartWithSections(variantId, quantity)' that:
1. Sends a POST request to '/cart/add.js' with headers 'Content-Type: application/json' and 'Accept: application/json'.
2. Passes a payload requesting sections 'cart-drawer,cart-icon-bubble'.
3. Returns the JSON response containing the updated sections HTML.`,
    starterCode: `async function addToCartWithSections(variantId, quantity = 1) {
  // Implement fetch request with Section Rendering API
}`,
    solution: `async function addToCartWithSections(variantId, quantity = 1) {
  const payload = {
    items: [
      {
        id: variantId,
        quantity: quantity,
      },
    ],
    sections: 'cart-drawer,cart-icon-bubble',
  };

  const response = await fetch('/cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to add item to cart');
  }

  return await response.json();
}`,
    explanation: 'Using the Section Rendering API via the sections query parameter instructs Shopify to render updated Liquid HTML strings on the server and return them directly in the JSON response.',
  },
  {
    id: 'ex-dev-m4-mcq',
    moduleId: 'dev-module-4',
    slug: 'predictive-search-race-condition-quiz',
    title: 'Frontend Engineering: Preventing Search Race Conditions',
    type: 'multiple-choice',
    difficulty: 'medium',
    xp: 20,
    prompt: 'When building an instant Predictive Search dropdown in vanilla JavaScript, what is the best pattern to ensure an earlier slow search response does not overwrite a later fast search response?',
    options: [
      'Increasing the fetch timeout to 10 seconds.',
      'Using `AbortController` to abort the pending in-flight request whenever a new keystroke occurs.',
      'Disabling the input field until the server responds.',
      'Sorting search results alphabetically on the client.',
    ],
    correctIndex: 1,
    explanation: '`AbortController.abort()` cancels the in-flight network request, guaranteeing that only the response corresponding to the user’s most recent search term updates the DOM.',
  },

  // =========================================================================
  // Module dev-5: Metafields & Metaobjects
  // =========================================================================
  {
    id: 'ex-dev-m5-code',
    moduleId: 'dev-module-5',
    slug: 'render-metaobject-artisan-profile',
    title: 'Liquid Challenge: Traverse and Render a Metaobject Reference in Liquid',
    type: 'liquid',
    difficulty: 'medium',
    xp: 30,
    prompt: `You have a product that has a Metafield reference to an Artisan Metaobject:
'product.metafields.custom.artisan_profile'.
The Metaobject has fields: 'name' (single line text), 'bio' (multi line text), and 'photo' (file reference).
Write the Liquid code to safely check if the artisan exists, render an <h3> with the name, an <img> tag with width 150 using image_url, and the bio.`,
    starterCode: `{% comment %} Render Artisan Metaobject Profile {% endcomment %}
{% assign artisan = product.metafields.custom.artisan_profile.value %}
<!-- Write your rendering markup here -->`,
    solution: `{% assign artisan = product.metafields.custom.artisan_profile.value %}
{% if artisan != blank %}
  <div class="artisan-card">
    {% if artisan.photo.value != blank %}
      <img src="{{ artisan.photo.value | image_url: width: 150 }}" alt="{{ artisan.name }}" width="150" height="150" loading="lazy">
    {% endif %}
    <h3>Crafted by {{ artisan.name }}</h3>
    <p>{{ artisan.bio | newline_to_br }}</p>
  </div>
{% endif %}`,
    explanation: 'Traversing Metaobjects requires using .value to resolve references. Images referenced inside Metaobjects must also append .value before passing through the image_url filter.',
  },
  {
    id: 'ex-dev-m5-mcq',
    moduleId: 'dev-module-5',
    slug: 'metaobject-web-pages-seo-quiz',
    title: 'Data Modeling: Publishing Standalone Landing Pages with Metaobjects',
    type: 'multiple-choice',
    difficulty: 'easy',
    xp: 15,
    prompt: 'A client wants to create 200 distinct Brand Partner landing pages with SEO titles, descriptions, and custom hero banners. What is the most maintainable architecture in Shopify?',
    options: [
      'Creating 200 individual page templates (`page.partner-1.liquid`, `page.partner-2.liquid`).',
      'Defining a "Brand Partner" Metaobject with "Web pages" enabled, rendering via a single `templates/metaobject/brand_partner.json` template.',
      'Writing a custom React Single Page Application that handles client-side routing.',
      'Putting all 200 partners on the homepage in one massive accordion.',
    ],
    correctIndex: 1,
    explanation: 'Enabling "Web pages" on a Metaobject automatically creates SEO-friendly URLs and routes all entries through a single, customizable JSON template.',
  },

  // =========================================================================
  // Module dev-6: Customer Accounts & Privacy APIs
  // =========================================================================
  {
    id: 'ex-dev-m6-code',
    moduleId: 'dev-module-6',
    slug: 'customer-privacy-consent-listener',
    title: 'Code Challenge: Subscribe to Customer Privacy API Consent Events',
    type: 'code',
    difficulty: 'medium',
    xp: 25,
    prompt: `Write a JavaScript snippet that:
1. Checks if 'window.Shopify.customerPrivacy' exists.
2. Checks if 'marketingAllowed()' is true, and if so calls 'startMarketingPixels()'.
3. Adds an event listener for 'visitorConsentCollected' to initialize marketing pixels immediately when consent is granted.`,
    starterCode: `function setupPrivacyCompliance() {
  // Implement consent check and listener
}`,
    solution: `function setupPrivacyCompliance() {
  if (!window.Shopify || !window.Shopify.customerPrivacy) return;

  if (window.Shopify.customerPrivacy.marketingAllowed()) {
    startMarketingPixels();
  }

  document.addEventListener('visitorConsentCollected', (event) => {
    if (window.Shopify.customerPrivacy.marketingAllowed()) {
      startMarketingPixels();
    }
  });
}`,
    explanation: 'Listening for visitorConsentCollected ensures tracking pixels fire as soon as a visitor clicks "Accept" on the cookie banner without requiring a page reload.',
  },
  {
    id: 'ex-dev-m6-mcq',
    moduleId: 'dev-module-6',
    slug: 'new-customer-accounts-otp-quiz',
    title: 'Account Architecture: Migrating to New Customer Accounts',
    type: 'multiple-choice',
    difficulty: 'easy',
    xp: 15,
    prompt: 'What happens to legacy `customers/login.liquid` and `customers/account.liquid` theme files when a merchant switches to New Customer Accounts?',
    options: [
      'They are compiled to WebAssembly.',
      'They are bypassed entirely because New Customer Accounts use Shopify-hosted passwordless authentication and UI Extensions instead of Liquid templates.',
      'They must be rewritten in React.',
      'They are automatically translated into Arabic.',
    ],
    correctIndex: 1,
    explanation: 'New Customer Accounts do not execute theme customer Liquid templates; the entire authentication and portal experience runs on Shopify edge infrastructure extended with UI Extensions.',
  },

  // =========================================================================
  // Module dev-7: Checkout Extensibility
  // =========================================================================
  {
    id: 'ex-dev-m7-code',
    moduleId: 'dev-module-7',
    slug: 'checkout-ui-extension-blocking-validation',
    title: 'Code Challenge: Implement Checkout Blocking Validation in React',
    type: 'code',
    difficulty: 'hard',
    xp: 35,
    prompt: `Write a Checkout UI Extension hook using '@shopify/ui-extensions-react/checkout' that:
1. Uses 'useBuyerJourneyIntercept' to intercept progression to the payment step.
2. Checks if a checkbox state 'ageConfirmed' is false.
3. If false, blocks checkout progression with an error message: "You must confirm you are at least 21 years old to purchase age-restricted items."`,
    starterCode: `import { useBuyerJourneyIntercept } from '@shopify/ui-extensions-react/checkout';

export function useAgeGateValidation(ageConfirmed: boolean) {
  // Implement buyer journey intercept
}`,
    solution: `import { useBuyerJourneyIntercept } from '@shopify/ui-extensions-react/checkout';

export function useAgeGateValidation(ageConfirmed: boolean) {
  useBuyerJourneyIntercept(({ canBlockProgress }) => {
    if (canBlockProgress && !ageConfirmed) {
      return {
        behavior: 'block',
        reason: 'Age verification required',
        errors: [
          {
            message: 'You must confirm you are at least 21 years old to purchase age-restricted items.',
          },
        ],
      };
    }
    return { behavior: 'allow' };
  });
}`,
    explanation: 'useBuyerJourneyIntercept allows Checkout UI Extensions to perform client-side blocking validation before the customer can proceed to the next checkout step.',
  },
  {
    id: 'ex-dev-m7-mcq',
    moduleId: 'dev-module-7',
    slug: 'checkout-extensibility-security-quiz',
    title: 'Security Architecture: Why Web Workers for Checkout Extensibility?',
    type: 'multiple-choice',
    difficulty: 'medium',
    xp: 20,
    prompt: 'Why does Shopify execute Checkout UI Extensions inside an isolated Web Worker sandbox rather than directly in the main browser thread?',
    options: [
      'To make extensions load 10x slower.',
      'To prevent third-party code from accessing sensitive payment card data (PCI-DSS compliance) and prevent malicious script injection.',
      'Because browsers only support React in Web Workers.',
      'To prevent extensions from displaying colors.',
    ],
    correctIndex: 1,
    explanation: 'Running extensions in Web Workers ensures complete isolation from the main thread DOM, securing payment credentials and credit card fields from scraping or tampering.',
  },

  // =========================================================================
  // Module dev-8: Shopify Functions & WebAssembly
  // =========================================================================
  {
    id: 'ex-dev-m8-code',
    moduleId: 'dev-module-8',
    slug: 'shopify-function-graphql-input-query',
    title: 'Code Challenge: Author a Shopify Function GraphQL Input Query',
    type: 'code',
    difficulty: 'hard',
    xp: 35,
    prompt: `Author the 'run.graphql' input query for a Product Discount Function that retrieves:
1. Each cart line's 'id' and 'quantity'.
2. The merchandise variant 'id' and its parent product's 'hasAnyTag' checking for tag "bulk-discount".`,
    starterCode: `query RunInput {
  cart {
    // Fill in required cart line properties
  }
}`,
    solution: `query RunInput {
  cart {
    lines {
      id
      quantity
      merchandise {
        __typename
        ... on ProductVariant {
          id
          product {
            hasAnyTag(tags: ["bulk-discount"])
          }
        }
      }
    }
  }
}`,
    explanation: 'Shopify Functions require a pure GraphQL input query in run.graphql. The engine executes this query on Shopify servers and passes the resulting JSON into the Wasm function.',
  },
  {
    id: 'ex-dev-m8-mcq',
    moduleId: 'dev-module-8',
    slug: 'shopify-functions-wasm-architecture-quiz',
    title: 'Architecture Evaluation: Shopify Functions WebAssembly Execution',
    type: 'multiple-choice',
    difficulty: 'medium',
    xp: 20,
    prompt: 'What is the primary technical reason Shopify built Shopify Functions on WebAssembly (Wasm) for custom backend logic?',
    options: [
      'Ruby is an extinct programming language.',
      'WebAssembly executes deterministically with guaranteed sub-5ms latency and zero cold starts inside Shopify edge infrastructure, even during peak BFCM flash sales.',
      'Functions only work on mobile devices.',
      'Functions replace the need for an ecommerce database.',
    ],
    correctIndex: 1,
    explanation: 'WebAssembly compiles to near-native machine bytecode that runs in isolated sandboxes with guaranteed execution times under 5 milliseconds at peak global traffic.',
  },

  // =========================================================================
  // Module dev-9: Full-Stack App Architecture & Remix
  // =========================================================================
  {
    id: 'ex-dev-m9-code',
    moduleId: 'dev-module-9',
    slug: 'remix-shopify-admin-graphql-loader',
    title: 'Code Challenge: Server-Side Remix Loader with Admin GraphQL',
    type: 'code',
    difficulty: 'hard',
    xp: 35,
    prompt: `Write a Remix route loader function 'loader({ request })' in TypeScript using '@shopify/shopify-app-remix' that:
1. Authenticates the request using 'await authenticate.admin(request)'.
2. Executes an Admin GraphQL query requesting the shop's 'name' and 'myshopifyDomain'.
3. Returns a json response containing the shop data.`,
    starterCode: `import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { authenticate } from '../shopify.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // Implement authenticated GraphQL query
};`,
    solution: `import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { authenticate } from '../shopify.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(\`
    query getShopInfo {
      shop {
        name
        myshopifyDomain
      }
    }
  \`);

  const { data } = await response.json();
  return json({ shop: data.shop });
};`,
    explanation: 'The authenticate.admin helper parses App Bridge session tokens, handles token validation, and returns an authenticated GraphQL client pre-configured with the merchant’s access credentials.',
  },
  {
    id: 'ex-dev-m9-mcq',
    moduleId: 'dev-module-9',
    slug: 'app-bridge-offline-tokens-quiz',
    title: 'App Architecture: Offline vs Online Access Tokens in Shopify Apps',
    type: 'multiple-choice',
    difficulty: 'medium',
    xp: 20,
    prompt: 'Your Shopify App has a background worker that syncs products every night at midnight. Which token type must be stored in your database for this worker?',
    options: [
      'An Online Access Token tied to the merchant’s staff account.',
      'An Offline Access Token, which persists permanently until the app is uninstalled and does not expire upon staff logout.',
      'A temporary browser session cookie.',
      'The merchant’s master password.',
    ],
    correctIndex: 1,
    explanation: 'Offline access tokens represent the store itself and do not expire when staff members log out, making them mandatory for background syncs, webhooks, and cron jobs.',
  },

  // =========================================================================
  // Module dev-10: GraphQL Admin API & Bulk Operations
  // =========================================================================
  {
    id: 'ex-dev-m10-code',
    moduleId: 'dev-module-10',
    slug: 'graphql-cursor-pagination-query',
    title: 'Code Challenge: Relay Cursor Pagination Query for Products',
    type: 'code',
    difficulty: 'medium',
    xp: 25,
    prompt: `Author a GraphQL query 'getPaginatedProducts' that:
1. Accepts variable '$cursor' of type String.
2. Queries the first 20 products after '$cursor'.
3. Returns each node's 'id' and 'title', along with 'pageInfo' containing 'hasNextPage' and 'endCursor'.`,
    starterCode: `query getPaginatedProducts($cursor: String) {
  // Write connection query
}`,
    solution: `query getPaginatedProducts($cursor: String) {
  products(first: 20, after: $cursor) {
    edges {
      node {
        id
        title
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}`,
    explanation: 'Relay cursor-based pagination uses immutable pointers (endCursor) to navigate forward safely, avoiding duplicate or skipped records when database records change during pagination.',
  },
  {
    id: 'ex-dev-m10-mcq',
    moduleId: 'dev-module-10',
    slug: 'graphql-leaky-bucket-cost-quiz',
    title: 'API Resilience: Handling GraphQL Leaky Bucket Throttling',
    type: 'multiple-choice',
    difficulty: 'medium',
    xp: 20,
    prompt: 'When the Shopify GraphQL Admin API returns an error with extension code "THROTTLED", what is the correct handling strategy?',
    options: [
      'Immediately retry the exact same query in a tight `while(true)` loop.',
      'Inspect `throttleStatus` in the cost extension and implement exponential backoff with random jitter before retrying.',
      'Send a complaint ticket to Shopify support.',
      'Switch the app permanently to REST.',
    ],
    correctIndex: 1,
    explanation: 'Exponential backoff with jitter ensures your client pauses to let the 50 points/second bucket refill before attempting retries, avoiding persistent rate lockouts.',
  },

  // =========================================================================
  // Module dev-11: Webhooks & Security
  // =========================================================================
  {
    id: 'ex-dev-m11-code',
    moduleId: 'dev-module-11',
    slug: 'hmac-sha256-verification-function',
    title: 'Code Challenge: Timing-Safe HMAC SHA-256 Webhook Verification',
    type: 'code',
    difficulty: 'hard',
    xp: 35,
    prompt: `Write a Node.js function 'verifyHmac(rawBuffer, hmacHeader, secret)' that:
1. Uses Node.js 'crypto.createHmac("sha256", secret)' to hash the rawBuffer into a base64 digest.
2. Compares the generated digest with the hmacHeader using 'crypto.timingSafeEqual' to protect against timing attacks.
3. Returns a boolean indicating authenticity.`,
    starterCode: `import crypto from 'crypto';

export function verifyHmac(rawBuffer: Buffer, hmacHeader: string, secret: string): boolean {
  // Implement HMAC calculation and timing-safe comparison
}`,
    solution: `import crypto from 'crypto';

export function verifyHmac(rawBuffer: Buffer, hmacHeader: string, secret: string): boolean {
  const generatedDigest = crypto
    .createHmac('sha256', secret)
    .update(rawBuffer)
    .digest('base64');

  const digestBuffer = Buffer.from(generatedDigest);
  const headerBuffer = Buffer.from(hmacHeader);

  if (digestBuffer.length !== headerBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(digestBuffer, headerBuffer);
}`,
    explanation: 'crypto.timingSafeEqual compares buffer contents in constant time, preventing malicious attackers from guessing HMAC signatures byte-by-byte via timing side-channel analysis.',
  },
  {
    id: 'ex-dev-m11-mcq',
    moduleId: 'dev-module-11',
    slug: 'webhook-idempotency-key-quiz',
    title: 'Event-Driven Systems: Safeguarding Webhook Idempotency',
    type: 'multiple-choice',
    difficulty: 'medium',
    xp: 20,
    prompt: 'Which HTTP header sent by Shopify uniquely identifies a webhook event for idempotency deduplication?',
    options: [
      '`X-Shopify-Topic`',
      '`X-Shopify-Webhook-Id`',
      '`X-Shopify-Hmac-Sha256`',
      '`X-Shopify-Shop-Domain`',
    ],
    correctIndex: 1,
    explanation: '`X-Shopify-Webhook-Id` contains a unique UUID for each event. Storing this ID in Redis or a database prevents duplicate actions when Shopify retries delivery.',
  },

  // =========================================================================
  // Module dev-12: Billing API & App Launch
  // =========================================================================
  {
    id: 'ex-dev-m12-code',
    moduleId: 'dev-module-12',
    slug: 'create-recurring-subscription-charge',
    title: 'Code Challenge: GraphQL Mutation for Recurring App Subscription',
    type: 'code',
    difficulty: 'hard',
    xp: 35,
    prompt: `Author a GraphQL mutation 'createSubscription' that calls 'appSubscriptionCreate' with:
1. Name "Growth Plan" with returnUrl "https://app.example.com/billing/confirm".
2. Test flag set to true (isTest: true).
3. A recurring pricing line item of $29.00 USD with a 14-day trial period (trialDays: 14).
4. Returns the 'confirmationUrl' and 'userErrors'.`,
    starterCode: `mutation createSubscription {
  // Write appSubscriptionCreate mutation
}`,
    solution: `mutation createSubscription {
  appSubscriptionCreate(
    name: "Growth Plan"
    returnUrl: "https://app.example.com/billing/confirm"
    test: true
    trialDays: 14
    lineItems: [
      {
        plan: {
          appRecurringPricingDetails: {
            price: { amount: 29.00, currencyCode: USD }
            interval: EVERY_30_DAYS
          }
        }
      }
    ]
  ) {
    appSubscription {
      id
    }
    confirmationUrl
    userErrors {
      field
      message
    }
  }
}`,
    explanation: 'The appSubscriptionCreate mutation generates a confirmationUrl where the merchant is redirected to approve the charge within the Shopify Admin.',
  },
  {
    id: 'ex-dev-m12-mcq',
    moduleId: 'dev-module-12',
    slug: 'app-store-rejection-prevention-quiz',
    title: 'App Store Submission: Content Security Policy Configuration',
    type: 'multiple-choice',
    difficulty: 'medium',
    xp: 20,
    prompt: 'During Shopify App Store review, why must your server configure the `frame-ancestors` directive in its Content Security Policy (CSP)?',
    options: [
      'To allow Google AdSense ads inside your app.',
      'To restrict embedding strictly to `https://admin.shopify.com` and `https://*.myshopify.com`, preventing clickjacking attacks while allowing embedded rendering.',
      'To allow embedding inside Facebook iframe tabs.',
      'CSP headers are optional and not evaluated by Shopify reviewers.',
    ],
    correctIndex: 1,
    explanation: 'Configuring frame-ancestors prevents malicious websites from embedding your app in unauthorized iframes (clickjacking) while allowing Shopify Admin to render it.',
  },

  // =========================================================================
  // Module dev-13: Headless Commerce with Hydrogen & Oxygen
  // =========================================================================
  {
    id: 'ex-dev-m13-code',
    moduleId: 'dev-module-13',
    slug: 'hydrogen-edge-caching-loader',
    title: 'Code Challenge: Hydrogen Loader with Subrequest Edge Caching',
    type: 'code',
    difficulty: 'hard',
    xp: 35,
    prompt: `Write a Hydrogen loader that executes a product query with subrequest caching:
1. Uses 'storefront.CacheShort' with 'maxAge: 60' and 'staleWhileRevalidate: 3600'.
2. Returns a JSON response containing the product.`,
    starterCode: `export async function loader({ params, context }: LoaderFunctionArgs) {
  const { handle } = params;
  const { storefront } = context;

  // Execute query with CacheShort strategy
}`,
    solution: `export async function loader({ params, context }: LoaderFunctionArgs) {
  const { handle } = params;
  const { storefront } = context;

  const { product } = await storefront.query(PRODUCT_QUERY, {
    variables: { handle },
    cache: storefront.CacheShort({
      maxAge: 60,
      staleWhileRevalidate: 3600,
    }),
  });

  if (!product) {
    throw new Response('Product Not Found', { status: 404 });
  }

  return json({ product });
}`,
    explanation: 'Using staleWhileRevalidate caches query results on Oxygen edge nodes, delivering sub-50ms responses to visitors while background workers refresh stale data.',
  },
  {
    id: 'ex-dev-m13-mcq',
    moduleId: 'dev-module-13',
    slug: 'storefront-api-public-token-quiz',
    title: 'Headless Architecture: Storefront API Authentication Model',
    type: 'multiple-choice',
    difficulty: 'easy',
    xp: 15,
    prompt: 'Can public client-side headless browsers make requests to the Storefront GraphQL API using public access tokens?',
    options: [
      'Yes, Storefront API tokens are public and unauthenticated, designed safely for client browsers without leaking secret merchant admin data.',
      'No, Storefront API requires secret OAuth offline tokens.',
      'Only if the visitor enters their password.',
      'Only through an Amazon S3 proxy.',
    ],
    correctIndex: 0,
    explanation: 'Storefront API access tokens are explicitly designed to be public and safe for exposure in client browsers, mobile native apps, and edge workers.',
  },

  // =========================================================================
  // Module dev-14: Shopify Plus B2B
  // =========================================================================
  {
    id: 'ex-dev-m14-code',
    moduleId: 'dev-module-14',
    slug: 'b2b-volume-pricing-table-liquid',
    title: 'Liquid Challenge: Render Tiered B2B Volume Pricing Tables',
    type: 'liquid',
    difficulty: 'medium',
    xp: 30,
    prompt: `Write Liquid markup that:
1. Checks if 'customer.b2b?' is true AND 'product.quantity_price_breaks_configured?' is true.
2. Iterates over 'product.selected_or_first_available_variant.quantity_price_breaks'.
3. Renders each tier displaying the minimum quantity and unit price formatted with the 'money' filter.`,
    starterCode: `{% comment %} Render B2B Wholesale Pricing Tiers {% endcomment %}
<!-- Write conditional markup here -->`,
    solution: `{% if customer.b2b? and product.quantity_price_breaks_configured? %}
  <div class="b2b-volume-tiers">
    <h4>Wholesale Tier Pricing</h4>
    <ul>
      {% for tier in product.selected_or_first_available_variant.quantity_price_breaks %}
        <li>Order {{ tier.minimum_quantity }}+ units: {{ tier.price | money }} each</li>
      {% endfor %}
    </ul>
  </div>
{% endif %}`,
    explanation: 'Quantity price breaks configured in B2B catalogs expose their tiers directly on product variants via the quantity_price_breaks drop.',
  },
  {
    id: 'ex-dev-m14-mcq',
    moduleId: 'dev-module-14',
    slug: 'b2b-blended-store-architecture-quiz',
    title: 'Enterprise Architecture: Blended Stores vs Dedicated B2B Stores',
    type: 'multiple-choice',
    difficulty: 'medium',
    xp: 20,
    prompt: 'What is a "Blended Store" in Shopify Plus B2B architecture?',
    options: [
      'A store that sells both coffee and smoothies.',
      'A single Shopify store that serves retail B2C customers and wholesale B2B buyers simultaneously from a shared product catalog and inventory pool.',
      'A store that uses two themes at the same time.',
      'A store that runs WordPress on the frontend and Shopify on checkout.',
    ],
    correctIndex: 1,
    explanation: 'A Blended Store allows brands to operate direct-to-consumer retail alongside authenticated B2B wholesale on a single URL, consolidating catalog and inventory management.',
  },

  // =========================================================================
  // Module dev-15: Shopify Flow & Automations
  // =========================================================================
  {
    id: 'ex-dev-m15-code',
    moduleId: 'dev-module-15',
    slug: 'shopify-flow-action-schema-toml',
    title: 'Configuration Challenge: Author a Custom Flow Action in TOML',
    type: 'code',
    difficulty: 'medium',
    xp: 25,
    prompt: `Author the 'shopify.extension.toml' definition for a custom Flow Action named "Notify Warehouse ERP" with:
1. Handle "notify-warehouse-erp".
2. Type "flow_action".
3. A required field with key "order_id" of type "order_reference".`,
    starterCode: `[[extensions]]
# Define flow action extension
`,
    solution: `[[extensions]]
type = "flow_action"
name = "Notify Warehouse ERP"
handle = "notify-warehouse-erp"
description = "Transmits newly placed order details to external WMS."
runtime_url = "https://app.example.com/api/flow/notify-wms"

[extensions.settings]
[[extensions.settings.fields]]
key = "order_id"
type = "order_reference"
name = "Order"
required = true`,
    explanation: 'Shopify Flow extensions use declarative TOML schemas to declare settings and resource references that merchants map inside the visual workflow canvas.',
  },
  {
    id: 'ex-dev-m15-mcq',
    moduleId: 'dev-module-15',
    slug: 'multi-location-inventory-reconciliation-quiz',
    title: 'Inventory Systems: Inventory Adjust vs Inventory Set in ERP Sync',
    type: 'multiple-choice',
    difficulty: 'medium',
    xp: 20,
    prompt: 'When synchronizing daily inventory balance snapshots from a Warehouse Management System (WMS) to Shopify, which GraphQL mutation should be used?',
    options: [
      '`productUpdate`',
      '`inventorySetQuantities`, because it reconciles absolute count states rather than applying relative deltas.',
      '`orderCreate`',
      '`inventoryDelete`',
    ],
    correctIndex: 1,
    explanation: '`inventorySetQuantities` sets the absolute inventory level at a specific location, preventing delta drift during master ERP stock reconciliations.',
  },

  // =========================================================================
  // Module dev-16: Enterprise DevOps & Playwright E2E
  // =========================================================================
  {
    id: 'ex-dev-m16-code',
    moduleId: 'dev-module-16',
    slug: 'playwright-add-to-cart-e2e-spec',
    title: 'Code Challenge: Playwright E2E Test for Shopify Cart Drawer',
    type: 'code',
    difficulty: 'hard',
    xp: 35,
    prompt: `Write a Playwright test in TypeScript that:
1. Navigates to 'https://dev-store.myshopify.com/products/test-item'.
2. Clicks the Add to Cart button matching selector 'button[name="add"]'.
3. Asserts that the cart drawer element '#CartDrawer' becomes visible within a 5-second timeout.`,
    starterCode: `import { test, expect } from '@playwright/test';

test('Add to Cart triggers visible cart drawer', async ({ page }) => {
  // Implement Playwright test steps
});`,
    solution: `import { test, expect } from '@playwright/test';

test('Add to Cart triggers visible cart drawer', async ({ page }) => {
  await page.goto('https://dev-store.myshopify.com/products/test-item');

  const addToCartButton = page.locator('button[name="add"]');
  await expect(addToCartButton).toBeVisible();
  await addToCartButton.click();

  const cartDrawer = page.locator('#CartDrawer');
  await expect(cartDrawer).toBeVisible({ timeout: 5000 });
});`,
    explanation: 'Automated Playwright regression specs simulate real customer browser interactions in headless Chrome/Firefox, guaranteeing that cart and checkout flows never break on release.',
  },
  {
    id: 'ex-dev-m16-mcq',
    moduleId: 'dev-module-16',
    slug: 'enterprise-launch-redirects-checklist-quiz',
    title: 'Enterprise QA: Pre-Launch 301 URL Redirect Strategy',
    type: 'multiple-choice',
    difficulty: 'easy',
    xp: 15,
    prompt: 'A brand is migrating a $25M/year Magento store to Shopify. If historical product URLs change from `/item.html` to `/products/item`, what must be done prior to launch?',
    options: [
      'Nothing; Google automatically rewrites all URLs on the internet.',
      'Bulk upload 301 permanent URL redirects in Shopify Admin Navigation to preserve accumulated page authority and avoid 404 dead ends.',
      'Tell customers to clear their browser cache.',
      'Delete the old domain name.',
    ],
    correctIndex: 1,
    explanation: '301 permanent redirects transfer accumulated SEO link equity and ensure historical bookmarks and backlinks route seamlessly to the new Shopify product URLs.',
  },
];
