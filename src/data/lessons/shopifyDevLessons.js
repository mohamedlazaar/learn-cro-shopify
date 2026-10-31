export const SHOPIFY_DEV_LESSONS = [
    // =========================================================================
    // WEEK 1: Modern Shopify Environment, CLI 3.x & Theme Anatomy (dev-module-1)
    // =========================================================================
    {
        id: 'dev-m1-l1',
        moduleId: 'dev-module-1',
        slug: 'shopify-ecosystem-partner-dashboard-dev-stores',
        title: 'The Shopify Architecture Ecosystem: Partners, Dev Stores & Merchant Admin',
        estimatedMinutes: 35,
        objectives: [
            'Understand Shopify multi-tenant cloud architecture, edge routing, and core data structures',
            'Set up and configure a Shopify Partner organization and test development stores with test data',
            'Distinguish development stores, collaborator accounts, transfer-disabled stores, and live merchant privileges',
            'Understand API rate limits, scopes, and app distribution models in modern Shopify',
        ],
        videoSource: {
            title: 'Create a Development Store in Shopify Partner Account 2025',
            embedUrl: 'https://www.youtube-nocookie.com/embed/oT3WdQY_QwU',
            channel: 'Umair Javed',
            duration: '10:38',
            description: 'Curated YouTube walkthrough from Umair Javed that complements this lesson. Watch it alongside the written sections below.',
            topics: ['Partner Dashboard', 'Development Stores', 'Collaborator Accounts', 'API Access Scopes'],
        },
        sections: [
            {
                heading: 'Shopify Multi-Tenant Cloud Architecture & Core Data Entities',
                body: `Shopify is a globally distributed multi-tenant commerce engine hosted across Google Cloud Platform and Cloudflare edge networks. Every merchant store shares the same containerized core Rails application and MySQL/Vitess data tier, meaning you never modify the database schema directly or manage server infrastructure.

The Core Data Hierarchy:
• Shop: The root tenant container holding store settings, default currency, and primary domain.
• Product & Variants: The merchandising model where a single Product can contain up to 100 Variants (differentiated by up to 3 options like Size, Color, Material).
• Collection: Smart (automated rule-based) or Custom (manually curated) product groupings.
• Customer: Profile record containing contact identities, tax-exempt statuses, and order histories.
• Order & Draft Order: Financial transactions capturing line items, shipping lines, tax lines, and fulfillment states.
• Inventory & Locations: Multi-location stock allocation mapping inventory levels to distinct physical warehouses or retail POS branches.`,
                callout: {
                    type: 'shopify',
                    text: 'Because Shopify is multi-tenant, all backend data access is mediated through strict APIs (GraphQL Admin API and Storefront API). Developers cannot run raw SQL queries or install custom server modules.',
                },
            },
            {
                heading: 'Configuring Partner Organizations, Dev Stores & Test Datasets',
                body: `Professional Shopify developers never develop directly on live merchant stores. You operate within a Shopify Partner Organization:
1. Creating Development Stores: From the Partner Dashboard, click "Stores" -> "Add store" -> "Create development store".
2. Store Purposes:
   - For a Client: Can be transferred to a merchant upon launch, earning ongoing partner revenue share.
   - For Testing and Building: Permanent sandbox with transfer permanently disabled; allows testing Shopify Plus features (B2B, Checkout Extensibility, Shopify Functions).
3. Populating Test Data: Enable "Developer test data" during store creation to auto-generate 50+ realistic products, customers, and simulated orders, or use the Shopify CLI to push mock datasets.`,
                callout: {
                    type: 'tip',
                    text: 'Never activate a paid plan on a development store before transferring it to the client! Doing so permanently converts the store to a merchant account, forfeiting your 20% recurring partner revenue share.',
                },
            },
            {
                heading: 'Collaborator Accounts vs. Staff Accounts & Transfer Mechanics',
                body: `When taking over existing merchant stores, never ask for owner email and password credentials. Instead, request Collaborator Access:
• Collaborator Accounts:
  - Requested via your Partner Dashboard using the merchant’s 4-digit Collaborator Request Code.
  - Do NOT consume any of the merchant’s limited staff account seats.
  - Granular Security: You can request only the permissions needed (e.g., Themes and Products, excluding financial payouts and customer PII).
• Transfer-Disabled Development Stores:
  - Ideal for testing apps and custom integrations.
  - Pre-enabled with simulated Shopify Plus capabilities, B2B company structures, and test payment gateways (Bogus Gateway).`,
                callout: {
                    type: 'warning',
                    text: 'Requesting merchant owner credentials violates Shopify Terms of Service and creates severe legal liability if security breaches or unauthorized transactions occur.',
                },
            },
            {
                heading: 'API Rate Limits, Scopes & App Distribution Models',
                body: `Every interaction with Shopify APIs is bounded by strict governance rules:
• GraphQL Admin API Rate Limits: Governed by a calculated cost system (leaky bucket) granting 50-100 cost points per second depending on whether the store is Standard or Shopify Plus.
• Access Scopes: Granular OAuth permissions (e.g., \`read_products\`, \`write_orders\`, \`read_customer_events\`). Following the principle of least privilege, only request the exact scopes required.
• App Distribution Tiers:
  - Custom Apps: Built for a single store, installed directly via merchant admin or Partner Dashboard.
  - Public Apps: Listed in the Shopify App Store, distributed to thousands of merchants, requiring rigorous automated and manual App Review approval.`,
                code: `# Checking authentication and partner store bindings via CLI
shopify auth login

# Inspect currently linked store session
shopify auth list

# Verify connected store domain
shopify theme info`,
                language: 'bash',
            }
        ],
        mistakes: [
            'Developing directly on a live production theme without a version-controlled Git branch or local dev server.',
            'Requesting full owner credentials from clients instead of requesting Collaborator Access via Partner Dashboard.',
            'Creating dev stores with real payment gateways instead of the Bogus Gateway or Shopify Payments Test Mode.',
        ],
        checklist: [
            'Created a free Shopify Partner Organization account.',
            'Generated a Development Store with generated mock products and collections.',
            'Verified Collaborator Request code mechanics and permission tiers.',
            'Configured two-factor authentication (2FA) on your developer account.',
        ],
        furtherReading: [
            { title: 'Shopify Partner Program Documentation', url: 'https://shopify.dev/docs/apps/getting-started' },
            { title: 'Collaborator Accounts Guide', url: 'https://help.shopify.com/en/manual/your-account/staff-accounts/collaborator-accounts' },
        ],
    },
    {
        id: 'dev-m1-l2',
        moduleId: 'dev-module-1',
        slug: 'shopify-cli-workflow-git-local-theme-development',
        title: 'Shopify CLI 3.x Workflow, Git Version Control & Hot-Reloading',
        estimatedMinutes: 40,
        objectives: [
            'Install and configure Node.js, Ruby dependencies, and Shopify CLI 3.x on macOS/Linux/Windows',
            'Initialize themes with `shopify theme init` and pull existing themes with `shopify theme pull`',
            'Run `shopify theme dev` to create a live local development server with instant Hot Reload',
            'Implement professional Git branching strategy (main -> staging -> feature/xyz) with Shopify GitHub integration',
        ],
        videoSource: {
            title: 'How to use Shopify CLI to develop FASTER (Easy Setup)',
            embedUrl: 'https://www.youtube-nocookie.com/embed/zeZTgOiU0LI',
            channel: 'Bosidev | Shopify Developer',
            duration: '7:03',
            description: 'Curated YouTube walkthrough from Bosidev | Shopify Developer that complements this lesson. Watch it alongside the written sections below.',
            topics: ['Shopify CLI 3.x', 'shopify theme dev', 'Hot Reloading', 'GitHub Sync'],
        },
        sections: [
            {
                heading: 'Environment Setup: Node.js, Ruby & Shopify CLI 3.x Installation',
                body: `Shopify CLI 3.x is the unified developer command center for modern theme and app engineering. Built on Node.js, it replaces legacy tools like Theme Kit and CLI 2.x.

System Prerequisites:
• Node.js: Active LTS (v18.x or v20.x). Verify with \`node -v\`.
• Package Manager: \`npm\`, \`yarn\`, or \`pnpm\`.
• Git: Latest version configured with SSH keys.
• Ruby: (Optional, only required if using legacy Theme Check gem; CLI 3.x bundles Theme Check natively).

Global Installation:
Run \`npm install -g @shopify/cli@latest\` to install the CLI.
Verify installation with \`shopify version\` to confirm you are on version 3.50+.`,
                callout: {
                    type: 'tip',
                    text: 'Always run `shopify version` before starting a project. Shopify CLI updates frequently with new flags and performance improvements for local theme development.',
                },
            },
            {
                heading: 'Theme Initialization & Pulling: shopify theme init & pull',
                body: `Starting a project or downloading an existing store theme follows two distinct workflows:
1. Initializing from Scratch (Dawn Reference Theme):
   \`shopify theme init my-brand-theme --clone-url https://github.com/Shopify/dawn.git\`
   This clones Shopify's official reference Online Store 2.0 theme, complete with modern semantic markup, JSON templates, and zero external framework dependencies.
2. Pulling an Existing Merchant Theme:
   \`shopify theme pull --store client-store.myshopify.com\`
   The CLI prompts you to select from active live, unpublished, or development themes.
   Selective Pulling: To pull only merchant settings without overwriting your local Liquid code:
   \`shopify theme pull --only config/settings_data.json,templates/*.json\`.`,
                callout: {
                    type: 'warning',
                    text: 'Never run a blind `shopify theme pull` without committing your current Git working tree. Pulling can overwrite local modifications with remote store files.',
                },
            },
            {
                heading: 'Local Dev Server & Live Hot-Reloading: shopify theme dev',
                body: `When you run \`shopify theme dev --store client-store.myshopify.com\`, the CLI creates a local development proxy server:
1. Secure WebSocket Connection: Authenticates with your store and uploads local files to a temporary, hidden "Development Theme".
2. Local Proxy Server: Spawns at \`http://127.0.0.1:9292\`. When you navigate to this URL, you view the live store populated with real products, but rendered using your local Liquid, CSS, and JS!
3. Hot Reloading: Changes to \`/assets/*.css\` or \`/assets/*.js\` inject into the browser in milliseconds without full page refreshes.
4. Isolated Environment: Your development theme is invisible to public store visitors and other team members, allowing fearless iteration.`,
                code: `# Spin up local development server with specific theme environment
shopify theme dev --store dev-apparel.myshopify.com --theme-editor-sync

# Push current local branch to an unpublished preview theme for QA
shopify theme push --unpublished --theme "Staging: Cart Drawer Refactor"

# Open the theme customizer directly for your local development theme
# (The CLI outputs a unique 127.0.0.1 link containing the preview token)`,
                language: 'bash',
            },
            {
                heading: 'Enterprise Git Branching & Shopify GitHub CI/CD Integration',
                body: `In professional ecommerce agencies, no developer ever pushes code directly to the published theme. Shopify offers native GitHub continuous delivery:
• Main Branch: Connected to the Published Production Theme. Merging a PR into \`main\` automatically triggers a zero-downtime deployment.
• Staging Branch: Connected to an unpublished "Staging" theme for internal QA and client review.
• Feature Branches (\`feat/sticky-cart\`): Developed locally using \`shopify theme dev\`.
Merchant Settings Precaution:
When merchants adjust colors, typography, or section content in the Shopify Theme Editor, changes are saved to \`config/settings_data.json\` and \`templates/*.json\`.
Always pull remote JSON templates before merging code into \`main\` to prevent reverting merchant configurations!`,
                callout: {
                    type: 'shopify',
                    text: 'Never add `config/settings_data.json` to `.gitignore`. Doing so will wipe out all custom merchant theme settings upon deploying a new theme build.',
                },
            }
        ],
        mistakes: [
            'Editing Liquid files inside the Shopify Admin Code Editor in the browser instead of using Git and Shopify CLI.',
            'Overwriting merchant JSON templates during deployment because remote settings were not pulled first.',
            'Running `shopify theme push --live` directly without staging QA and automated Theme Check validation.',
        ],
        checklist: [
            'Installed Node.js (v18+) and verified `shopify version` outputs CLI 3.x.',
            'Successfully spun up `shopify theme dev` and navigated to http://127.0.0.1:9292.',
            'Tested live hot-reloading by modifying a CSS file in `/assets`.',
            'Configured Git repository with a remote GitHub branch connected to an unpublished Shopify theme.',
        ],
        furtherReading: [
            { title: 'Shopify CLI Theme Commands Reference', url: 'https://shopify.dev/docs/themes/tools/cli/commands' },
            { title: 'Shopify GitHub Integration Best Practices', url: 'https://shopify.dev/docs/themes/tools/github' },
        ],
    },
    {
        id: 'dev-m1-l3',
        moduleId: 'dev-module-1',
        slug: 'dawn-theme-directory-structure-settings-schema',
        title: 'Dawn Theme Anatomy: Directory Architecture & settings_schema.json',
        estimatedMinutes: 45,
        objectives: [
            'Deconstruct the mandatory 7 top-level directories of an Online Store 2.0 theme',
            'Understand how layout/theme.liquid wraps global storefront rendering',
            'Master config/settings_schema.json to create custom typography, color palettes, and global theme settings',
            'Enforce Theme Check static analysis rules to catch Liquid syntax and accessibility bugs early',
        ],
        videoSource: {
            title: 'Shopify Dawn Theme Customization (Complete Guide)',
            embedUrl: 'https://www.youtube-nocookie.com/embed/ElIk_2hqhTE',
            channel: 'Jason Gandy',
            duration: '1:15:24',
            description: 'Curated YouTube walkthrough from Jason Gandy that complements this lesson. Watch it alongside the written sections below.',
            topics: ['Theme Anatomy', 'settings_schema.json', 'Theme Check', 'Assets Pipeline'],
        },
        sections: [
            {
                heading: 'The 7 Mandatory Top-Level Directories of Online Store 2.0',
                body: `Every Shopify theme must strictly adhere to the standardized 7-folder directory structure:
1. \`/layout\`: Wraps global rendering (contains \`theme.liquid\` and optional \`password.liquid\`).
2. \`/templates\`: Defines page schemas. In OS 2.0, these are JSON files (\`product.json\`, \`collection.json\`, \`index.json\`) rather than legacy \`.liquid\` files.
3. \`/sections\`: Modular, reusable components that merchants can add, re-order, and customize in the Theme Editor (\`hero-banner.liquid\`, \`product-grid.liquid\`).
4. \`/snippets\`: Lightweight, reusable Liquid chunks rendered via \`{% render 'snippet-name' %}\` (\`price.liquid\`, \`icon-cart.liquid\`).
5. \`/assets\`: Static CSS, vanilla JavaScript, SVG icons, and font files (\`theme.css\`, \`cart-drawer.js\`).
6. \`/config\`: Global settings definitions (\`settings_schema.json\`) and active merchant values (\`settings_data.json\`).
7. \`/locales\`: Translation JSON dictionaries for multi-language storefronts (\`en.default.json\`, \`fr.json\`).`,
                callout: {
                    type: 'tip',
                    text: 'Keep snippets pure and stateless. Snippets should receive arguments explicitly via render parameters rather than relying on global parent variables.',
                },
            },
            {
                heading: 'Global Storefront Orchestration in layout/theme.liquid',
                body: `\`layout/theme.liquid\` is the master HTML document shell for every storefront page:
• The \`<head>\` Element: Orchestrates meta tags, SEO titles, canonical links, font preloads, and Shopify’s critical \`{{ content_for_header }}\` tag.
• \`{{ content_for_header }}\`: Injects platform-required analytics scripts, Shopify Payments tokens, theme editor preview scripts, and app embeds. Never delete or move this tag!
• Global Structural Containers: Renders global section groups (\`{% sections 'header-group' %}\`), the dynamic page payload (\`{{ content_for_layout }}\`), and global footers (\`{% sections 'footer-group' %}\`).
• Document Footer: Injects deferred theme scripts, modal overlays, and accessibility announcements.`,
                callout: {
                    type: 'warning',
                    text: 'Placing heavy synchronous `<script src="...">` tags before `{{ content_for_header }}` halts the browser preload scanner, destroying Largest Contentful Paint (LCP).',
                },
            },
            {
                heading: 'Configuring Global Design Tokens in config/settings_schema.json',
                body: `\`config/settings_schema.json\` controls the global "Theme settings" sidebar in the Shopify Customizer. It allows developers to expose brand-wide controls for:
• Typography: Font pickers for headings and body text using Shopify's hosted font library (\`font_picker\`).
• Color Palettes: Color pickers for primary accents, surface backgrounds, and button states (\`color\`).
• Layout Grids: Range sliders for maximum page width, container margins, and border radii (\`range\`).
Values configured by the merchant are written automatically to \`config/settings_data.json\` and accessed in Liquid via \`settings.setting_id\`.`,
                code: `[
  {
    "name": "Brand Colors",
    "settings": [
      {
        "type": "color",
        "id": "color_primary",
        "label": "Primary Accent",
        "default": "#1e3a8a"
      },
      {
        "type": "color",
        "id": "color_background",
        "label": "Page Background",
        "default": "#ffffff"
      }
    ]
  },
  {
    "name": "Typography",
    "settings": [
      {
        "type": "font_picker",
        "id": "font_heading",
        "label": "Heading Font",
        "default": "assistant_n4"
      }
    ]
  }
]`,
                language: 'json',
            },
            {
                heading: 'Enforcing Code Quality with Theme Check Static Analysis',
                body: `Theme Check is Shopify's official linter and static analysis engine for Liquid and JSON templates.
Catching Defects Early:
• Liquid Syntax Errors: Identifies unclosed tags (\`{% if %}\` without \`{% endif %}\`) and deprecated filters.
• Performance Violations: Flags heavy loops inside snippets, unoptimized image tags lacking \`srcset\`, and render-blocking scripts.
• Translation Completeness: Ensures every string in Liquid has a corresponding key in \`locales/en.default.json\`.
Running Theme Check:
Run \`shopify theme check\` from your project root. Integrate Theme Check into your GitHub Actions workflow to block pull requests containing syntax or accessibility regressions.`,
                callout: {
                    type: 'shopify',
                    text: 'You can install the official Shopify Liquid extension in VS Code to get real-time inline Theme Check linting and autocompletion.',
                },
            }
        ],
        mistakes: [
            'Omitting {{ content_for_header }} in layout/theme.liquid, breaking all Shopify apps and platform tracking.',
            'Hardcoding colors and typography in CSS files instead of referencing settings_schema variables via CSS custom properties.',
            'Using {% include %} instead of {% render %}, causing variable scope pollution and slower rendering speeds.',
        ],
        checklist: [
            'Inspected all 7 theme directories in Dawn or custom theme.',
            'Added a custom color and border radius control in config/settings_schema.json.',
            'Validated theme integrity by running `shopify theme check`.',
            'Confirmed {{ content_for_header }} and {{ content_for_layout }} exist in layout/theme.liquid.',
        ],
        furtherReading: [
            { title: 'Shopify Theme Architecture Overview', url: 'https://shopify.dev/docs/themes/architecture' },
            { title: 'Theme Check Linter Documentation', url: 'https://shopify.dev/docs/themes/tools/theme-check' },
        ],
    },
    // =========================================================================
    // WEEK 2: Deep Liquid Engine & High-Performance Templating (dev-module-2)
    // =========================================================================
    {
        id: 'dev-m2-l1',
        moduleId: 'dev-module-2',
        slug: 'deep-liquid-objects-drops-iteration-logic',
        title: 'Deep Liquid: Global Objects, Liquid Drops, Logic & Variable Scopes',
        estimatedMinutes: 50,
        objectives: [
            'Master the 3 Liquid syntaxes: Output {{ }}, Logic Tag {% %}, and Comments {% comment %}',
            'Understand Liquid Drops: Safe object proxies that expose read-only storefront data without SQL or server access',
            'Navigate root global objects: `product`, `collection`, `cart`, `customer`, `shop`, `request`, and `routes`',
            'Differentiate variable scoping rules between `assign`, `capture`, `echo`, and isolated `render` scopes',
        ],
        videoSource: {
            title: 'Complete Shopify Product Object Tutorial All 19 Fields Explained',
            embedUrl: 'https://www.youtube-nocookie.com/embed/JBirmRv06_U',
            channel: 'Fayyaz Ahmed | Shopify Developer',
            duration: '9:18',
            description: 'Curated YouTube walkthrough from Fayyaz Ahmed | Shopify Developer that complements this lesson. Watch it alongside the written sections below.',
            topics: ['Liquid Objects', 'Liquid Drops', 'Variable Scoping', 'Loop Indexing'],
        },
        sections: [
            {
                heading: 'Mastering the 3 Liquid Syntaxes: Output, Tags, and Comments',
                body: `Liquid is a secure, open-source, Ruby-based templating language created by Shopify. It is strictly presentation-tier: it cannot write to databases or execute arbitrary shell commands.
The 3 Syntaxes:
1. Output Syntaxes \`{{ ... }}\`: Evaluates an expression and prints the result to the HTML output. Used for variables, object properties, and filter chains (e.g. \`{{ product.title | upcase }}\`).
2. Logic Tags \`{% ... %}\`: Controls template flow, iteration, and variable assignments (\`if/elsif/else\`, \`for\`, \`case/when\`, \`assign\`, \`render\`). Does not produce visible output by itself.
3. Comments \`{% comment %} ... {% endcomment %}\`: Blocks of code or explanatory notes ignored by the Liquid engine, completely stripped from final HTML output.`,
                callout: {
                    type: 'tip',
                    text: 'Use whitespace control dashes `{%- ... -%}` and `{{- ... -}}` to strip leading and trailing whitespace from the rendered HTML source code.',
                },
            },
            {
                heading: 'Understanding Liquid Drops: Safe Read-Only Object Proxies',
                body: `In Shopify Liquid, you never query a database. When you reference \`product\` or \`cart\`, you are interacting with a Liquid Drop.
What is a Drop?
A Drop is a read-only Ruby proxy object that safely exposes specific attributes of Shopify’s internal data models while guarding sensitive merchant data.
Drop Characteristics:
• Read-Only: You cannot mutate drop properties in Liquid (e.g. you cannot write \`product.price = 5000\`).
• Lazy Loading: Attributes of a drop are evaluated only when referenced, ensuring optimal template execution speed.
• Context Sensitivity: The \`product\` drop is populated automatically on \`product.json\` templates, but is null on \`/cart\` unless explicitly iterated from \`cart.items\`.`,
                callout: {
                    type: 'shopify',
                    text: 'Drops prevent SQL injection and data exfiltration vulnerabilities by design. Liquid code cannot access raw database tables, server environmental variables, or customer credit card details.',
                },
            },
            {
                heading: 'Navigating Global Storefront Objects',
                body: `High-performance theme development requires knowing the canonical global Liquid objects:
• \`product\`: Accesses title, price, variants, images, metafields, and availability.
• \`collection\`: Accesses products, pagination, current filters, and collection sorting.
• \`cart\`: Accesses line items, total price, item count, original price, and cart attributes.
• \`customer\`: Contains customer name, email, order count, tags, and default address (only available if logged in).
• \`shop\`: Store identity (name, currency, description, shipping policies).
• \`request\`: Current URL information (\`request.page_type\`, \`request.path\`, \`request.locale\`).
• \`routes\`: Dynamic multi-language URL paths (\`routes.cart_url\`, \`routes.account_login_url\`, \`routes.predictive_search_url\`).`,
                callout: {
                    type: 'warning',
                    text: 'Never hardcode URLs like `<a href="/cart">`. Always use dynamic route drops: `<a href="{{ routes.cart_url }}">` to support multi-language subfolders (/fr/cart).',
                },
            },
            {
                heading: 'Variable Scoping Rules: assign, capture, echo, and render vs include',
                body: `Understanding scope is critical to preventing variable pollution across large themes:
1. \`assign\`: Creates or overwrites a local variable (\`{% assign has_discount = true %}\`).
2. \`capture\`: Buffers complex multi-line string or HTML output into a variable (\`{% capture full_address %}{{ customer.city }}, {{ customer.country }}{% endcapture %}\`).
3. \`echo\`: Outputs expressions inside logic tags (\`{% echo product.title %}\`).
4. Isolated Scope with \`{% render %}\`:
   Variables defined in the parent template are NOT passed into rendered snippets automatically!
   You must pass variables explicitly: \`{% render 'price', product: product, use_variant: true %}\`.
   This guarantees that snippet variables never accidentally overwrite parent variables.`,
                code: `<!-- Liquid Variable Scoping and Snippet Isolation Example -->
{% assign featured_badge = 'Best Seller' %}

<!-- Parent variable explicitly passed into snippet -->
{% render 'product-card', 
   product: product, 
   badge_label: featured_badge, 
   show_vendor: settings.show_vendor 
%}

<!-- 
Legacy: {% include 'product-card' %} is DEPRECATED! 
Include shared global scope, creating severe variable pollution bugs. 
Always use {% render %} in modern themes.
-->`,
                language: 'html',
            }
        ],
        mistakes: [
            'Using {% include %} instead of {% render %}, causing memory overhead and unpredictable variable scope contamination.',
            'Hardcoding URLs like "/cart" or "/collections" instead of dynamic platform routes (routes.cart_url).',
            'Attempting to perform synchronous HTTP API requests inside Liquid (Liquid cannot execute network requests).',
        ],
        checklist: [
            'Wrote code using `assign`, `capture`, and `echo`.',
            'Demonstrated variable isolation using `{% render %}` with explicit parameters.',
            'Used `routes.cart_url` and `routes.predictive_search_url` in storefront navigation.',
            'Iterated over collections using `for` with `forloop.first`, `forloop.last`, and `forloop.index`.',
        ],
        furtherReading: [
            { title: 'Shopify Liquid Objects Documentation', url: 'https://shopify.dev/docs/api/liquid/objects' },
            { title: 'Liquid Basics & Tag References', url: 'https://shopify.dev/docs/api/liquid/tags' },
        ],
    },
    {
        id: 'dev-m2-l2',
        moduleId: 'dev-module-2',
        slug: 'liquid-filters-string-array-money-mutators',
        title: 'Liquid Filters, Data Mutation, Currency Formatting & Complex Arrays',
        estimatedMinutes: 45,
        objectives: [
            'Master Liquid filter pipelines: chaining output through multiple transformations',
            'Transform strings, dates, and JSON using `strip_html`, `truncatewords`, `date`, and `json`',
            'Work with array filters: `map`, `where`, `sort`, `reverse`, `compact`, and `join`',
            'Implement Shopify currency formatting with `money`, `money_without_trailing_zeros`, and multi-currency formatting',
        ],
        videoSource: {
            title: 'Shopify Design Tutorials - Liquid Filters',
            embedUrl: 'https://www.youtube-nocookie.com/embed/-FXz_VDouzE',
            channel: 'Web Hosting Reviews',
            duration: '10:28',
            description: 'Curated YouTube walkthrough from Web Hosting Reviews that complements this lesson. Watch it alongside the written sections below.',
            topics: ['Liquid Filters', 'Array Operations', 'Currency Formatting', 'JSON Filter'],
        },
        sections: [
            {
                heading: 'Liquid Filter Pipelines: Chaining Data Transformations',
                body: `Liquid filters are methods that take an input on the left of the pipe \`|\`, perform a transformation, and return the modified value.
Chaining Filters:
You can chain multiple filters sequentially:
\`{{ product.title | strip_html | truncatewords: 8 | upcase }}\`
Execution Order:
Filters evaluate from left to right. In the example above, HTML tags are stripped first, the string is truncated to 8 words second, and the remaining text is transformed to uppercase last.`,
                callout: {
                    type: 'tip',
                    text: 'Filter chaining is computationally inexpensive in Liquid because transformations run in compiled C/Ruby memory without database round-trips.',
                },
            },
            {
                heading: 'String, Date & JSON Transformation Filters',
                body: `Essential utility filters for storefront manipulation:
• Strings:
  - \`strip_html\`: Strips HTML tags from rich text descriptions.
  - \`truncatewords: 20\`: Truncates string to word count with an ellipsis.
  - \`handleize\` / \`handle\`: Converts text to a clean URL-friendly slug (\`"Men's Running Shoes" -> "mens-running-shoes"\`).
  - \`escape\`: Encodes HTML entities to prevent Cross-Site Scripting (XSS).
• Dates:
  - \`date: '%B %d, %Y'\`: Formats timestamps (\`"October 18, 2026"\`).
• JSON Serialization:
  - \`json\`: Serializes Liquid objects into valid JSON strings. Invaluable for hydrating JavaScript components with product or variant metadata!`,
                callout: {
                    type: 'warning',
                    text: 'Always pipe user-supplied text through `escape` or use the `json` filter when outputting data inside HTML attributes or `<script>` tags to prevent XSS vulnerabilities.',
                },
            },
            {
                heading: 'Array Manipulation: map, where, sort, reverse, and compact',
                body: `Liquid provides robust array operations without requiring raw loops:
• \`map\`: Extracts a specific property from an array of objects.
  \`{% assign variant_prices = product.variants | map: 'price' %}\`
• \`where\`: Filters objects matching a key/value condition.
  \`{% assign in_stock_variants = product.variants | where: 'available', true %}\`
• \`sort\`: Orders objects by an attribute (\`product.variants | sort: 'price'\`).
• \`reverse\`: Inverts array order.
• \`compact\`: Strips \`nil\` (null) values from an array.
• \`join\`: Merges array elements into a string (\`tags | join: ', '\`).`,
                code: `<!-- Liquid Array Filtering: In-Stock Variants Extractor -->
{% assign available_variants = product.variants | where: 'available', true %}
{% assign available_titles = available_variants | map: 'title' %}

<p class="available-sizes-hint">
  In stock right now: {{ available_titles | join: ', ' }}
</p>`,
                language: 'html',
            },
            {
                heading: 'Shopify Currency Formatting: money Filters & Multi-Currency',
                body: `Shopify stores prices in cents/integers (e.g. $78.00 is represented as \`7800\`). Never divide by 100 manually; always use native money filters:
• \`{{ product.price | money }}\`: Formats according to the merchant’s HTML currency setting (e.g., \`"$78.00"\`).
• \`{{ product.price | money_without_trailing_zeros }}\`: Strips cents if zero (e.g., \`"$78"\` instead of \`"$78.00"\`).
• \`{{ product.price | money_with_currency }}\`: Appends currency code for clarity (e.g., \`"$78.00 USD"\`).
Multi-Currency with Shopify Markets:
Liquid automatically converts prices based on the customer’s active localized Market (\`localization.country.currency\`). The money filters automatically apply correct international symbols and comma/period formatting.`,
                callout: {
                    type: 'shopify',
                    text: 'Multi-currency stores using Shopify Markets do NOT require separate codebases. The `money` filter automatically handles currency symbol placement, decimal commas, and rounding rules.',
                },
            }
        ],
        mistakes: [
            'Outputting raw unescaped JSON into HTML attributes instead of using the `escape` filter or `<script type="application/json">`.',
            'Hardcoding "$" in price output rather than relying on `{{ variant.price | money }}` which supports multi-currency.',
            'Performing multiple nested array iterations when a single `where` and `map` filter combination achieves the same result.',
        ],
        checklist: [
            'Chained multiple string filters in a live Liquid snippet.',
            'Used `map` and `where` to extract and filter variant data.',
            'Serialized a complex Liquid object into valid JSON with `| json`.',
            'Correctly formatted prices with multi-currency filters.',
        ],
        furtherReading: [
            { title: 'Liquid Filter Reference Guide', url: 'https://shopify.dev/docs/api/liquid/filters' },
            { title: 'Money Filters in Shopify', url: 'https://shopify.dev/docs/api/liquid/filters/money-filters' },
        ],
    },
    {
        id: 'dev-m2-l3',
        moduleId: 'dev-module-2',
        slug: 'liquid-performance-optimization-avoiding-execution-limits',
        title: 'Liquid Performance Optimization: Execution Limits, AST & DOM Minimization',
        estimatedMinutes: 50,
        objectives: [
            'Understand Shopify Liquid render time limits, node depth limits, and 49-iteration nesting bottlenecks',
            'Optimize heavy `for` loops and eliminate O(N^2) algorithms in collections and navigation menus',
            'Implement `paginate` tags correctly across large collections and customer order histories',
            'Measure Liquid render times using Theme Inspector for Chrome and Shopify Profiler',
        ],
        videoSource: {
            title: 'Performance First on Shopify',
            embedUrl: 'https://www.youtube-nocookie.com/embed/TsoSZIWZRWs',
            channel: 'ShopifyDevs',
            duration: '21:50',
            description: 'Curated YouTube walkthrough from ShopifyDevs that complements this lesson. Watch it alongside the written sections below.',
            topics: ['Liquid Performance', 'Theme Inspector', 'Pagination', 'Execution Limits'],
        },
        sections: [
            {
                heading: 'Liquid Execution Limits, AST Complexity & The 49-Nesting Limit',
                body: `Shopify enforces strict limits on Liquid template rendering to protect multi-tenant infrastructure:
• Render Timeout: A page must finish rendering within a few seconds, or Shopify returns a 504 Gateway Timeout.
• Loop Nesting Limit: Liquid permits a maximum nesting depth of loops and tags.
• The 49-Iteration Snare: Iterating large collections inside nested loops triggers exponential AST (Abstract Syntax Tree) expansion.
Understanding these architectural constraints separates junior theme builders from senior Shopify engineers who design resilient enterprise themes.`,
                callout: {
                    type: 'warning',
                    text: 'A template that exceeds Liquid execution complexity limits will trigger platform 504 errors during high-traffic events like Black Friday / Cyber Monday.',
                },
            },
            {
                heading: 'Eliminating O(N^2) Algorithms in Collections & Navigation Menus',
                body: `The most common performance crime in custom themes is nested loop iterations:
The Anti-Pattern (O(N^2)):
\`\`\`liquid
{% for product in collection.products %}
  {% for link in linklists.main-menu.links %}
    {% if link.title == product.type %} ... {% endif %}
  {% endfor %}
{% endfor %}
\`\`\`
If a collection has 50 products and the menu has 40 links, Liquid evaluates 2,000 comparisons!
The Solution (O(N)):
Pre-process collections and arrays outside the loop using array filters like \`map\` and \`where\`, or restructure data hierarchies so comparisons happen in a single pass.`,
                callout: {
                    type: 'tip',
                    text: 'Never query `collections.all.products` in a loop! Iterating over every product across a 10,000-item catalog will immediately crash theme rendering.',
                },
            },
            {
                heading: 'Proper Pagination Architecture with the {% paginate %} Tag',
                body: `Shopify restricts access to arrays like \`collection.products\` or \`customer.orders\` to a maximum of 50 items per page.
Pagination Rules:
• The \`{% paginate %}\` tag must wrap the target array loop directly.
• Valid limit ranges: 1 to 50 items (\`{% paginate collection.products by 24 %}\`).
• Paginate Drop Properties: Exposes \`paginate.pages\`, \`paginate.current_page\`, \`paginate.next\`, and \`paginate.previous\`.
• Pagination Snippets: Use standard navigation controls or integrate Ajax "Load More" patterns using the Section Rendering API.`,
                code: `<!-- High-Performance Paginated Collection Loop -->
{% paginate collection.products by 24 %}
  <div class="product-grid">
    {% for product in collection.products %}
      {% render 'product-card', product: product %}
    {% else %}
      <p>No products found in this collection.</p>
    {% endfor %}
  </div>

  {% if paginate.pages > 1 %}
    <nav class="pagination" role="navigation" aria-label="Pagination">
      {{ paginate | default_pagination: next: 'Next →', previous: '← Prev' }}
    </nav>
  {% endif %}
{% endpaginate %}`,
                language: 'html',
            },
            {
                heading: 'Measuring Liquid Render Time with Theme Inspector for Chrome',
                body: `Never guess which Liquid template or snippet is causing slow Time to First Byte (TTFB). Profile it with data:
• Shopify Theme Inspector for Chrome: An official Chrome DevTools extension that profiles Liquid execution.
• How to Profile:
  1. Install the extension.
  2. Navigate to your store with \`?profile_liquid=true\` appended to the URL (requires merchant admin login).
  3. The extension generates a Flame Graph detailing exact render time (in milliseconds) for every section, snippet, and loop on the page.
• Optimization Target: Total Liquid render time across all sections combined should remain under 150ms.`,
                callout: {
                    type: 'shopify',
                    text: 'The Flame Graph reveals the exact line of code responsible for bottlenecks. Over 80% of slow TTFB issues are caused by un-paginated collection loops or redundant snippet renders.',
                },
            }
        ],
        mistakes: [
            'Querying `all_products[item_handle]` inside a `for` loop, causing severe N+1 Liquid execution latency.',
            'Iterating through every product tag in an unindexed search instead of using Shopify Search & Discovery filter drops.',
            'Attempting to display more than 50 products on a single collection page without pagination.',
        ],
        checklist: [
            'Installed Shopify Theme Inspector extension in Chrome.',
            'Generated a flame graph of a collection page and analyzed render time.',
            'Implemented clean pagination with `{% paginate collection.products by 24 %}`.',
            'Refactored any O(N^2) nested loops into O(N) array lookups.',
        ],
        furtherReading: [
            { title: 'Shopify Theme Inspector for Chrome', url: 'https://shopify.dev/docs/themes/tools/theme-inspector' },
            { title: 'Best Practices for Liquid Performance', url: 'https://shopify.dev/docs/themes/best-practices/performance' },
        ],
    },
    // =========================================================================
    // WEEK 3: Online Store 2.0, JSON Templates & Section Groups (dev-module-3)
    // =========================================================================
    {
        id: 'dev-m3-l1',
        moduleId: 'dev-module-3',
        slug: 'online-store-2-json-templates-section-architecture',
        title: 'Online Store 2.0 Architecture: JSON Templates & Dynamic Section Schemas',
        estimatedMinutes: 50,
        objectives: [
            'Deconstruct the architectural shift from legacy Liquid templates to modern JSON templates',
            'Understand how `templates/*.json` stores layout order, section IDs, and block settings',
            'Author robust Section Schemas with `name`, `tag`, `class`, `settings`, `blocks`, and `presets`',
            'Implement dynamic blocks and block limits for flexible merchant page builders',
        ],
        videoSource: {
            title: 'How to use JSON Templates with Shopify Themes',
            embedUrl: 'https://www.youtube-nocookie.com/embed/bbd8zLhtONA',
            channel: 'ShopifyDevs',
            duration: '23:15',
            description: 'Curated YouTube walkthrough from ShopifyDevs that complements this lesson. Watch it alongside the written sections below.',
            topics: ['JSON Templates', 'Section Schema', 'Block Types', 'Presets'],
        },
        sections: [
            {
                heading: 'The Paradigm Shift: From Legacy Liquid to OS 2.0 JSON Templates',
                body: `Prior to Online Store 2.0 (launched at Unite 2021), page templates were static Liquid files (\`product.liquid\`, \`page.liquid\`). Merchants could only add dynamic sections to the homepage (\`index.liquid\`), while product and collection pages had rigid, hardcoded layouts.

Online Store 2.0 Architectural Revolution:
• Every template is now a structured JSON document: \`product.json\`, \`collection.json\`, \`cart.json\`, \`page.json\`.
• Sections Everywhere: Merchants can add, delete, and re-order dynamic sections on ANY page of the storefront directly in the Theme Editor.
• Separation of Concerns: Liquid code defines the section component (\`/sections/hero.liquid\`), while the JSON template defines the arrangement and merchant configuration.`,
                callout: {
                    type: 'shopify',
                    text: 'JSON templates turn Shopify into a flexible visual page builder without requiring bloated third-party page-builder apps.',
                },
            },
            {
                heading: 'Deconstructing templates/*.json: Section IDs, Order, and Block State',
                body: `A JSON template is an organized dictionary with two primary top-level keys:
1. \`sections\`: An object where each key is a unique instance ID (e.g. \`"main"\`, \`"featured_collection_1"\`), containing:
   - \`type\`: Maps to the Liquid file in \`/sections\` (e.g. \`"main-product"\`).
   - \`settings\`: The merchant's configured values for that section.
   - \`blocks\`: Optional child block components with their own settings and ordering.
2. \`order\`: An array of string keys defining the vertical rendering order of sections on the page:
   \`["main", "image_with_text", "reviews_section"]\`.`,
                code: `// Example templates/product.json schema
{
  "sections": {
    "main": {
      "type": "main-product",
      "blocks": {
        "title": { "type": "title", "settings": {} },
        "price": { "type": "price", "settings": {} },
        "buy_buttons": { "type": "buy_buttons", "settings": { "show_dynamic_checkout": true } }
      },
      "block_order": ["title", "price", "buy_buttons"],
      "settings": {
        "enable_sticky_info": true
      }
    },
    "recommendations": {
      "type": "product-recommendations",
      "settings": {
        "heading": "You May Also Like"
      }
    }
  },
  "order": ["main", "recommendations"]
}`,
                language: 'json',
            },
            {
                heading: 'Authoring Robust Section Schemas: Settings, Tags, and Presets',
                body: `Every section in \`/sections/*.liquid\` can define a \`{% schema %}\` JSON block at the bottom of the file.
Core Schema Keys:
• \`name\`: Human-readable label displayed in the Theme Editor sidebar.
• \`tag\`: HTML wrapper tag (\`section\`, \`article\`, \`header\`, \`footer\`). Defaults to \`div\`.
• \`class\`: Custom CSS classes applied to the wrapper element.
• \`settings\`: Array of configurable inputs (color, text, image_picker, range, select).
• \`blocks\`: Child elements merchants can add, delete, and re-order within the section.
• \`presets\`: Default starter configuration enabling merchants to discover and add the section to their pages from the "Add section" modal.`,
                callout: {
                    type: 'tip',
                    text: 'A section without a `presets` array in its schema cannot be added to a page by a merchant. Presets are what registers the section in the Theme Editor library.',
                },
            },
            {
                heading: 'Implementing Dynamic Blocks and Block Limits in Sections',
                body: `Blocks allow merchants to customize the internal components of a section:
• Block Types: You can define multiple block types (e.g. \`slide\`, \`testimonial\`, \`faq_item\`).
• \`max_blocks\`: Enforce design constraints by capping the number of items (e.g. \`max_blocks: 6\` on a hero slider).
• Iterating Blocks in Liquid:
\`\`\`liquid
{% for block in section.blocks %}
  <div class="block-item" {{ block.shopify_attributes }}>
    <h3>{{ block.settings.heading }}</h3>
  </div>
{% endfor %}
\`\`\`
• \`{{ block.shopify_attributes }}\`: Critical attribute that enables the Theme Editor to highlight and focus the block in real-time when the merchant clicks it in the admin sidebar.`,
                callout: {
                    type: 'warning',
                    text: 'Always include `{{ block.shopify_attributes }}` on block wrappers! Without it, Theme Editor deep-linking and inline inspector clicks will not work.',
                },
            }
        ],
        mistakes: [
            'Omitting `{{ block.shopify_attributes }}` on block wrapper tags, breaking the Theme Editor real-time click-to-edit inspector.',
            'Forgetting to declare `"presets"` in the section schema, which prevents the section from being added via the "Add section" button.',
            'Putting Liquid variables inside the `{% schema %}` tag (schema must be static, valid JSON without Liquid tags).',
        ],
        checklist: [
            'Converted a legacy .liquid template into a modern .json template.',
            'Created a dynamic section with customizable settings, block types, and block limits.',
            'Added `{{ block.shopify_attributes }}` to ensure Theme Customizer live inspector functionality.',
            'Included presets so the section appears in the Theme Editor library.',
        ],
        furtherReading: [
            { title: 'JSON Templates Documentation', url: 'https://shopify.dev/docs/themes/architecture/templates/json-templates' },
            { title: 'Section Schema Reference', url: 'https://shopify.dev/docs/themes/architecture/sections/section-schema' },
        ],
    },
    {
        id: 'dev-m3-l2',
        moduleId: 'dev-module-3',
        slug: 'section-groups-header-footer-aside-architecture',
        title: 'Section Groups: Architecting Header, Footer & Aside Global Layers',
        estimatedMinutes: 40,
        objectives: [
            'Understand Section Groups: JSON-driven global regions rendered across all pages',
            'Build `sections/header-group.json` and `sections/footer-group.json`',
            'Implement `aside` and overlay section groups for announcement bars, age gates, and cookie banners',
            'Render section groups inside `layout/theme.liquid` using `{% sections %}` tags',
        ],
        videoSource: {
            title: 'Shopify Theme Development Course #Lesson5 | Create Header and Footer Section Groups',
            embedUrl: 'https://www.youtube-nocookie.com/embed/629O3HwlWdU',
            channel: 'Genius Maker',
            duration: '12:24',
            description: 'Curated YouTube walkthrough from Genius Maker that complements this lesson. Watch it alongside the written sections below.',
            topics: ['Section Groups', 'header-group.json', 'footer-group.json', 'Global Layouts'],
        },
        sections: [
            {
                heading: 'Section Groups: Architecting Global Layout Layers',
                body: `In early OS 2.0, headers and footers were hardcoded static sections in \`layout/theme.liquid\`. Merchants could not add announcement bars or newsletter drawers around them without editing Liquid code.
Enter Section Groups (Shopify Winter '23):
• Section Groups are JSON-driven container templates located in \`/sections/*.json\` (e.g. \`header-group.json\`, \`footer-group.json\`).
• They allow merchants to add, remove, and re-order sections globally across the entire storefront header and footer areas directly in the Theme Editor.`,
                callout: {
                    type: 'shopify',
                    text: 'Section Groups eliminate the need for third-party announcement bar and cookie notification apps, allowing clean native Liquid implementations.',
                },
            },
            {
                heading: 'Building sections/header-group.json and footer-group.json',
                body: `Header and Footer group schemas define global layout instances:
• \`header-group.json\`:
  Contains sections for Announcement Bar, Main Navigation Header, and Predictive Search Bar.
• \`footer-group.json\`:
  Contains sections for Newsletter Signup, Main Footer Links, Copyright Bar, and Currency/Language Selectors.
By separating these into section groups, a merchant can easily test 2 different announcement banners or rearrange footer columns without touching code.`,
                code: `// sections/header-group.json
{
  "name": "Header Group",
  "type": "header",
  "sections": {
    "announcement_bar": {
      "type": "announcement-bar",
      "settings": { "text": "Free Shipping on Orders Over $75" }
    },
    "main_header": {
      "type": "header",
      "settings": { "sticky_header_type": "on-scroll-up" }
    }
  },
  "order": ["announcement_bar", "main_header"]
}`,
                language: 'json',
            },
            {
                heading: 'Implementing Aside & Overlay Groups: Age Gates, Modals & Banners',
                body: `Beyond headers and footers, Section Groups support an \`aside\` type:
• Overlay Architecture: Used for storewide flyouts like Age Verification Modals, Cookie Consent Banners, and Slide-Out Cart Drawers.
• Global Inclusion: Once defined, the overlay section group renders on every page layout without cluttering individual template JSON files.
• Dynamic Merchant Customization: The compliance officer can update legal copy in the Age Gate modal via the Theme Editor without developer intervention.`,
                callout: {
                    type: 'tip',
                    text: 'Using `aside` section groups for the Cart Drawer ensures the drawer HTML is rendered consistently across all page templates.',
                },
            },
            {
                heading: 'Rendering Section Groups Inside layout/theme.liquid',
                body: `To activate section groups in your theme, replace legacy \`{% section 'header' %}\` tags in \`layout/theme.liquid\` with the plural \`{% sections %}\` tag:
\`\`\`liquid
<body class="gradient">
  {% sections 'header-group' %}

  <main id="MainContent" class="content-for-layout focus-none" role="main" tabindex="-1">
    {{ content_for_layout }}
  </main>

  {% sections 'footer-group' %}
  {% sections 'overlay-group' %}
</body>
\`\`\`
This single tag tells Shopify’s edge server to parse the corresponding JSON file and render all assigned sections in order.`,
                callout: {
                    type: 'warning',
                    text: 'Notice the plural: `{% sections %}` for group JSON files, versus `{% section %}` (singular) for individual Liquid sections.',
                },
            }
        ],
        mistakes: [
            'Using `{% section %}` (singular) instead of `{% sections %}` (plural) when rendering section groups in layout/theme.liquid.',
            'Assigning invalid "type" values in section group JSON files (valid types are only "header", "footer", and "aside").',
            'Hardcoding announcement bars inside the header section instead of using a modular section group.',
        ],
        checklist: [
            'Created `sections/header-group.json` with an announcement bar and main navigation header.',
            'Created `sections/footer-group.json` with multi-column links and newsletter signup.',
            'Rendered both groups in `layout/theme.liquid` using `{% sections %}`.',
            'Verified that merchants can reorder and add sections in the header and footer in the Theme Customizer.',
        ],
        furtherReading: [
            { title: 'Section Groups Architecture Guide', url: 'https://shopify.dev/docs/themes/architecture/section-groups' },
            { title: 'Theme Layout and Master Files', url: 'https://shopify.dev/docs/themes/architecture/layouts' },
        ],
    },
    {
        id: 'dev-m3-l3',
        moduleId: 'dev-module-3',
        slug: 'app-blocks-and-app-embed-blocks-architecture',
        title: 'App Blocks & App Embed Blocks: Zero-Code Clean App Integrations',
        estimatedMinutes: 45,
        objectives: [
            'Understand how App Blocks eliminate theme code pollution and orphaned snippets',
            'Distinguish App Blocks (injected into specific sections) from App Embed Blocks (global scripts)',
            'Add `{% content_for "blocks" %}` or `@app` blocks into section schemas',
            'Test app embed toggles and deep links in the Theme Customizer',
        ],
        videoSource: {
            title: 'How to build your Shopify theme app extension | App Embed Blocks and App Blocks',
            embedUrl: 'https://www.youtube-nocookie.com/embed/Cj4wesLFPis',
            channel: 'Ilias Haddad - Software Developer',
            duration: '32:46',
            description: 'Curated YouTube walkthrough from Ilias Haddad - Software Developer that complements this lesson. Watch it alongside the written sections below.',
            topics: ['App Blocks', 'App Embed Blocks', 'Theme App Extensions', 'Target Architecture'],
        },
        sections: [
            {
                heading: 'App Blocks: Eliminating Theme Code Pollution and Orphaned Snippets',
                body: `The historical curse of Shopify theme development was "code rot." When merchants installed apps for product reviews, back-in-stock alerts, or size charts, the apps injected spaghetti code, arbitrary script tags, and snippets into \`theme.liquid\`.
When the merchant uninstalled the app, the code remained behind, permanently degrading store speed and causing console errors.

The App Block Revolution:
• App Blocks (part of Theme App Extensions) are self-contained Liquid components hosted on Shopify's CDN.
• Zero Core Code Mutation: The app never modifies your theme's Liquid files.
• Clean Uninstallation: If the merchant uninstalls the app, Shopify automatically unbinds the block, leaving your theme 100% clean with zero orphaned code!`,
                callout: {
                    type: 'shopify',
                    text: 'All modern Shopify App Store apps must use Theme App Extensions (App Blocks). Legacy ScriptTag injection is completely prohibited.',
                },
            },
            {
                heading: 'App Blocks vs. App Embed Blocks: In-Page vs. Global Functionality',
                body: `Apps integrate into themes through two distinct mechanisms:
1. App Blocks (In-Page Components):
   - Intended for specific visual components (e.g. Star Ratings, Size Guide, Instagram Feed).
   - Rendered within a specific section's layout where the merchant chooses to position it.
2. App Embed Blocks (Global Scripts & Overlays):
   - Intended for background services and floating widgets (e.g. Live Chat bubble, Analytics Pixel, Currency Switcher).
   - Injected globally into \`{{ content_for_header }}\`.
   - Controlled via the "App embeds" tab in the Theme Editor sidebar.`,
                callout: {
                    type: 'tip',
                    text: 'App Embed blocks can be activated and deactivated with a single toggle in the Theme Editor without modifying theme templates.',
                },
            },
            {
                heading: 'Adding @app Blocks and content_for "blocks" to Section Schemas',
                body: `To allow merchants to insert third-party App Blocks into your custom sections, you must explicitly declare support in the section schema:
\`\`\`json
{
  "name": "Product Buy Box",
  "blocks": [
    { "type": "title" },
    { "type": "price" },
    { "type": "@app" }
  ]
}
\`\`\`
Rendering in Liquid:
Inside the section’s Liquid loop:
\`\`\`liquid
{% for block in section.blocks %}
  {% case block.type %}
    {% when '@app' %}
      {% render block %}
  {% endcase %}
{% endfor %}
\`\`\`
This enables the merchant to drag-and-drop a review star rating or loyalty widget directly between the product price and the Add-to-Cart button!`,
                code: `<!-- Modern Shopify Section Supporting Dynamic App Blocks -->
<div class="product-info-column">
  {% for block in section.blocks %}
    <div class="product-block product-block--{{ block.type }}" {{ block.shopify_attributes }}>
      {% case block.type %}
        {% when '@app' %}
          <!-- Safely renders third-party review or upsell widget -->
          {% render block %}
        {% when 'title' %}
          <h1>{{ product.title }}</h1>
        {% when 'price' %}
          <div class="price">{{ product.price | money }}</div>
      {% endcase %}
    </div>
  {% endfor %}
</div>`,
                language: 'html',
            },
            {
                heading: 'Testing App Embed Toggles & Deep Links in the Theme Customizer',
                body: `When building apps or integrating extensions, developers provide Deep Links to streamline merchant onboarding:
• Direct Theme Customizer Deep Linking:
  An app can redirect the merchant directly into their Theme Editor with the app embed pre-activated:
  \`https://admin.shopify.com/store/{shop}/themes/current/editor?context=apps&activateAppId={uuid}/app-embed\`
• Verification Protocol:
  1. Verify the embed toggle activates without console errors.
  2. Confirm the embed unmounts cleanly when the toggle is switched off.
  3. Ensure no render-blocking scripts execute before the main DOM is interactive.`,
                callout: {
                    type: 'warning',
                    text: 'Always test app embeds with ad blockers enabled to ensure that if a tracking pixel is blocked, the storefront layout does not crash.',
                },
            }
        ],
        mistakes: [
            'Forgetting to render `{% render block %}` inside the `{% when "@app" %}` case statement, causing app widgets to fail silently.',
            'Omitting `{"type": "@app"}` from section schemas, preventing merchants from adding review stars or installment calculators.',
            'Manually editing theme files to install app scripts instead of using App Embeds.',
        ],
        checklist: [
            'Added `{"type": "@app"}` support to product and cart section schemas.',
            'Verified that third-party app blocks render properly in the theme.',
            'Tested enabling and disabling an App Embed Block in the Theme Editor.',
            'Confirmed zero orphaned code remains upon app uninstallation.',
        ],
        furtherReading: [
            { title: 'Theme App Extensions & App Blocks', url: 'https://shopify.dev/docs/apps/online-store/theme-app-extensions' },
            { title: 'App Blocks in Section Schemas', url: 'https://shopify.dev/docs/themes/architecture/sections/section-schema#blocks' },
        ],
    },
    // =========================================================================
    // WEEK 4: Front-End Interactivity, Ajax Cart API & Predictive Search (dev-module-4)
    // =========================================================================
    {
        id: 'dev-m4-l1',
        moduleId: 'dev-module-4',
        slug: 'web-components-vanilla-javascript-shopify-themes',
        title: 'Modern Front-End in Themes: Web Components & Lightweight JavaScript',
        estimatedMinutes: 50,
        objectives: [
            'Understand why modern Shopify themes (like Dawn) use native Web Components instead of heavy frameworks (React/Vue/jQuery)',
            'Build reusable Custom Elements extending `HTMLElement` with connectedCallback and event delegation',
            'Manage component lifecycle, state synchronization, and DOM updates without virtual DOM overhead',
            'Protect Core Web Vitals (LCP, INP, CLS) by minimizing JavaScript execution time on storefronts',
        ],
        videoSource: {
            title: 'How to Create Web Components in  Shopify Theme | #Lesson16',
            embedUrl: 'https://www.youtube-nocookie.com/embed/IHETrCacd_U',
            channel: 'Genius Maker',
            duration: '38:24',
            description: 'Curated YouTube walkthrough from Genius Maker that complements this lesson. Watch it alongside the written sections below.',
            topics: ['Web Components', 'Custom Elements', 'Core Web Vitals', 'INP Optimization'],
        },
        sections: [
            {
                heading: 'Why Modern Shopify Themes Reject React/Vue in Favor of Web Components',
                body: `In 2021, Shopify rebuilt its flagship theme Dawn from scratch. Instead of using heavy JavaScript frameworks (React, Vue, or jQuery), Shopify chose native browser Custom Elements (Web Components).
The Architectural Rationale:
• Zero Framework Overhead: React and Vue require shipping a 40KB–120KB runtime library over mobile networks before executing any UI logic. Web Components run on native browser C++ APIs.
• Progressive Enhancement: The server renders complete, accessible HTML via Liquid. Custom Elements gently hydrate interactivity on top. If JavaScript fails or is blocked, the HTML remains fully functional.
• Unmatched Core Web Vitals: Eliminating virtual DOM reconcilers drastically cuts Total Blocking Time (TBT) and Interaction to Next Paint (INP).`,
                callout: {
                    type: 'tip',
                    text: 'Dawn’s entire JavaScript footprint is less than 35KB gzipped, allowing it to score 95+ on Google Lighthouse Mobile.',
                },
            },
            {
                heading: 'Building Reusable Custom Elements: connectedCallback & Event Delegation',
                body: `Creating a native Web Component in a Shopify theme:
1. Define class extending \`HTMLElement\`:
\`\`\`javascript
class QuantityInput extends HTMLElement {
  connectedCallback() {
    this.input = this.querySelector('input');
    this.changeEvent = new Event('change', { bubbles: true });
    this.querySelectorAll('button').forEach(btn => 
      btn.addEventListener('click', this.onButtonClick.bind(this))
    );
  }

  onButtonClick(event) {
    event.preventDefault();
    const isPlus = event.currentTarget.name === 'plus';
    this.input.stepUp(isPlus ? 1 : -1);
    this.input.dispatchEvent(this.changeEvent);
  }
}
customElements.define('quantity-input', QuantityInput);
\`\`\`
2. Semantic HTML Usage:
\`\`\`html
<quantity-input class="quantity">
  <button name="minus">-</button>
  <input type="number" value="1" min="1">
  <button name="plus">+</button>
</quantity-input>
\`\`\` `,
                callout: {
                    type: 'shopify',
                    text: 'Custom Elements provide automatic encapsulation. As soon as the custom element is injected into the DOM, its `connectedCallback()` executes automatically without manual querySelectors.',
                },
            },
            {
                heading: 'Component Lifecycle, State Synchronization & DOM Updates',
                body: `Managing component communication without Redux or Pinia:
• Custom DOM Events: Emit synthetic custom events (\`this.dispatchEvent(new CustomEvent('cart:updated', { bubbles: true, detail: data }))\`).
• Publish/Subscribe (PubSub) Architecture: Lightweight event buses (such as Dawn's \`pubsub.js\`) let independent components (e.g. Add-to-Cart form and Cart Drawer) communicate seamlessly without tight coupling.
• Lifecycle Cleanup: Always remove global event listeners in \`disconnectedCallback()\` to prevent memory leaks when sections are re-rendered in the Theme Editor.`,
                callout: {
                    type: 'note',
                    text: 'Event delegation on parent containers (`document.addEventListener`) reduces memory footprint compared to attaching hundreds of listeners to individual product cards.',
                },
            },
            {
                heading: 'Protecting Core Web Vitals (LCP, INP, CLS) in Storefront JavaScript',
                body: `How to guarantee blazing-fast performance:
• Defer All Theme Scripts: Place \`<script src="..." defer></script>\` in \`<head>\`.
• Eliminate Layout Shifts (CLS): Reserve container dimensions with CSS \`aspect-ratio\` and min-heights before JavaScript evaluates.
• Minimize Interaction to Next Paint (INP): Avoid long synchronous JavaScript execution on user clicks. Defer non-critical analytics tracking using \`requestIdleCallback()\` or \`setTimeout(..., 0)\` so the browser can immediately paint the visual tap feedback.`,
                code: `// Production Custom Element: Slide-Out Drawer Component
class SlideOutDrawer extends HTMLElement {
  constructor() {
    super();
    this.overlay = this.querySelector('.drawer-overlay');
    this.closeBtn = this.querySelector('.drawer-close');
  }

  connectedCallback() {
    this.closeBtn?.addEventListener('click', () => this.close());
    this.overlay?.addEventListener('click', () => this.close());
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) this.close();
    });
  }

  open() {
    this.setAttribute('open', '');
    document.body.classList.add('overflow-hidden');
    this.querySelector('button, [href], input')?.focus();
  }

  close() {
    this.removeAttribute('open');
    document.body.classList.remove('overflow-hidden');
  }

  isOpen() {
    return this.hasAttribute('open');
  }
}
customElements.define('slide-out-drawer', SlideOutDrawer);`,
                language: 'javascript',
            }
        ],
        mistakes: [
            'Importing bulky JavaScript libraries (jQuery, lodash) for simple UI tasks like accordions or quantity toggles.',
            'Failing to remove event listeners in `disconnectedCallback` on dynamic elements, creating memory leaks.',
            'Manipulating DOM elements before `connectedCallback` fires.',
        ],
        checklist: [
            'Created a native Web Component extending `HTMLElement`.',
            'Registered the custom element with `customElements.define`.',
            'Rendered the component cleanly in a Liquid section without layout shift.',
            'Verified performance impact in Chrome DevTools Performance panel.',
        ],
        furtherReading: [
            { title: 'MDN Web Components Overview', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_components' },
            { title: 'Shopify Dawn JavaScript Architecture', url: 'https://shopify.dev/docs/themes/tools/dawn' },
        ],
    },
    {
        id: 'dev-m4-l2',
        moduleId: 'dev-module-4',
        slug: 'shopify-cart-ajax-api-and-section-rendering-api',
        title: 'The Shopify Cart AJAX API & Section Rendering API Mastery',
        estimatedMinutes: 50,
        objectives: [
            'Master the 5 core Ajax endpoints: `/cart/add.js`, `/cart/change.js`, `/cart/update.js`, `/cart/clear.js`, and `/cart.js`',
            'Understand the Section Rendering API to fetch dynamically updated server-rendered Liquid HTML without page reload',
            'Build a frictionless slide-out Cart Drawer with real-time item updates, free-shipping threshold bar, and error handling',
            'Handle inventory limits, line item properties, selling plan allocation (subscriptions), and discount codes',
        ],
        videoSource: {
            title: 'Breakdown the Dawn Cart using AJAX API  +  Section Rendering API',
            embedUrl: 'https://www.youtube-nocookie.com/embed/y36M8-8XZWk',
            channel: 'Shopify AI + Dev',
            duration: '9:02',
            description: 'Curated YouTube walkthrough from Shopify AI + Dev that complements this lesson. Watch it alongside the written sections below.',
            topics: ['Cart AJAX API', 'Section Rendering API', 'Cart Drawer', 'Line Item Properties'],
        },
        sections: [
            {
                heading: 'Mastering the 5 Shopify Cart AJAX API Endpoints',
                body: `Shopify provides a rock-solid, session-authenticated REST endpoint suite for cart manipulation:
1. \`GET /cart.js\`: Returns the complete cart state as a JSON object (item count, line items, original/discounted price, active attributes).
2. \`POST /cart/add.js\`: Adds one or more line item variants to the cart.
3. \`POST /cart/change.js\`: Modifies the quantity of an existing line item via its line index (1-based) or line item \`key\`. Setting \`quantity: 0\` removes the item.
4. \`POST /cart/update.js\`: Updates multiple line item quantities simultaneously or mutates global cart \`attributes\` (gift notes, delivery instructions).
5. \`POST /cart/clear.js\`: Empties all items from the cart.`,
                callout: {
                    type: 'tip',
                    text: 'Always target line items using their unique `key` (e.g. `44910291:b9a2...`) rather than their numeric line index. If another asynchronous request modifies the cart, line indexes shift, causing quantity bugs.',
                },
            },
            {
                heading: 'The Section Rendering API: Dynamic Server-Side HTML Fetching',
                body: `The Section Rendering API is one of Shopify's most powerful storefront features.
The Problem It Solves:
In legacy themes, when a user added an item to the cart via Ajax, the developer had to either write complex client-side template engines or reload the entire page to update the cart drawer.
How Section Rendering Works:
1. Make an AJAX call to \`/cart/add.js\` or \`/cart/change.js\`.
2. Append \`?sections=cart-drawer,cart-icon-bubble\` to the request payload.
3. Shopify’s server evaluates the liquid files on the server and returns the updated cart JSON along with freshly rendered HTML strings for each requested section!
4. The client simply replaces \`drawer.innerHTML = response.sections['cart-drawer']\`.`,
                callout: {
                    type: 'shopify',
                    text: 'Section Rendering guarantees that server-side currency conversions, automatic discount scripts, and inventory caps are 100% accurate without maintaining parallel JavaScript templates.',
                },
            },
            {
                heading: 'Building a Frictionless Slide-Out Cart Drawer Architecture',
                body: `Architecture of a high-converting cart drawer:
• Optimistic UI Feedback: Immediately animate the drawer open while the AJAX request completes in the background.
• Free Shipping Threshold Gamification: Calculate remaining spend in real-time and animate a progress bar.
• Accessible Focus Trapping: When the drawer opens, trap keyboard focus within the drawer to satisfy WCAG AA accessibility standards.
• Defensive Error Handling: Gracefully display localized error messages if a customer requests more inventory than is physically available in stock.`,
                code: `// Production Section Rendering API Cart Mutation Function
async function updateCartDrawerQuantity(lineItemKey, quantity) {
  try {
    const response = await fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: lineItemKey,
        quantity: quantity,
        sections: 'cart-drawer,cart-icon-bubble'
      })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || 'Unable to update inventory.');
      return;
    }

    // Replace drawer HTML with fresh server-rendered Liquid output
    const drawerContainer = document.querySelector('#CartDrawer');
    if (drawerContainer && data.sections['cart-drawer']) {
      drawerContainer.innerHTML = data.sections['cart-drawer'];
    }

    // Update cart counter badge in header
    const bubbleContainer = document.querySelector('.cart-count-bubble');
    if (bubbleContainer && data.sections['cart-icon-bubble']) {
      bubbleContainer.innerHTML = data.sections['cart-icon-bubble'];
    }
  } catch (error) {
    console.error('Cart Ajax failure:', error);
  }
}`,
                language: 'javascript',
            },
            {
                heading: 'Handling Inventory Limits, Line Item Properties & Selling Plans',
                body: `Real-world ecommerce carts require handling complex metadata:
• Line Item Properties: Custom values attached to a line item (e.g. Engraving Text, Gift Wrapping). Prefacing a property key with an underscore (e.g. \`_bundle_id\`) hides it from the customer while preserving it for backend fulfillment apps.
• Selling Plan Allocations: Subscription contracts (e.g. "Deliver every 30 days — Save 15%"). Passed during \`/cart/add.js\` via the \`selling_plan\` ID.
• Out-of-Stock Handling: Catch HTTP 422 Unprocessable Entity responses when inventory is depleted and present helpful restock notifications.`,
                callout: {
                    type: 'warning',
                    text: 'If an inventory error occurs, never leave the user hanging on an infinite loading spinner. Always catch network rejections and display clear user-friendly notifications.',
                },
            }
        ],
        mistakes: [
            'Omitting the `Accept: application/json` header, causing Shopify to respond with an unexpected HTTP 302 redirect.',
            'Re-building cart drawer HTML with complex client-side JavaScript templates instead of using the Section Rendering API.',
            'Ignoring HTTP 422 inventory errors, leaving customers with unresponsive buttons when items are out of stock.',
        ],
        checklist: [
            'Built a working asynchronous Add to Cart flow with `/cart/add.js`.',
            'Used the `sections` parameter to request updated server-rendered Liquid HTML.',
            'Updated the cart icon count bubble in real-time.',
            'Handled out-of-stock and maximum inventory limit errors gracefully.',
        ],
        furtherReading: [
            { title: 'Shopify Cart AJAX API Reference', url: 'https://shopify.dev/docs/api/ajax/reference/cart' },
            { title: 'Section Rendering API Guide', url: 'https://shopify.dev/docs/api/section-rendering' },
        ],
    },
    {
        id: 'dev-m4-l3',
        moduleId: 'dev-module-4',
        slug: 'predictive-search-api-live-variant-switching',
        title: 'Predictive Search API, Live Variant Switching & URL State Management',
        estimatedMinutes: 45,
        objectives: [
            'Implement real-time autocomplete search using Shopify Predictive Search API (`/search/suggest.json`)',
            'Implement debouncing and `AbortController` to prevent race conditions during rapid typing',
            'Build live variant switching on PDPs updating price, availability, media gallery, and browser URL history',
            'Synchronize variant parameters using `window.history.replaceState` without full page refreshes',
        ],
        videoSource: {
            title: 'Shopify Dev Tips: Predictive Search',
            embedUrl: 'https://www.youtube-nocookie.com/embed/Eo-Id-mpRuM',
            channel: 'Sam',
            duration: '13:46',
            description: 'Curated YouTube walkthrough from Sam that complements this lesson. Watch it alongside the written sections below.',
            topics: ['Predictive Search', 'AbortController', 'Variant Switching', 'History API'],
        },
        sections: [
            {
                heading: 'Shopify Predictive Search API Architecture: /search/suggest.json',
                body: `The Predictive Search API delivers real-time autocomplete results as users type into the search bar:
• Endpoint: \`/search/suggest.json?q={query}&resources[type]=product,collection,page,article&resources[limit]=6\`
• Platform Intelligence: Shopify’s search engine automatically handles typo tolerance, singular/plural matching, and relevance ranking across product titles, tags, and descriptions.
• Fast & Cached: Queries are cached globally at Cloudflare edge nodes, returning JSON payloads in under 50ms.`,
                callout: {
                    type: 'shopify',
                    text: 'Predictive search also supports returning rendered HTML sections directly via `/search/suggest?sections=predictive-search`, allowing pure Liquid formatting of search dropdown cards.',
                },
            },
            {
                heading: 'Preventing Race Conditions with Debouncing & AbortController',
                body: `When a user rapidly types "running shoes" (13 keystrokes in 2 seconds), firing 13 simultaneous network requests causes severe race conditions:
• The Race Condition Bug: Request #10 (for "running sho") might resolve AFTER Request #13 (for "running shoes"), overwriting the dropdown with outdated results!
The Dual Defense:
1. Debounce (300ms): Wait until the user pauses typing before dispatching the request.
2. \`AbortController\`: Whenever a new keystroke occurs, abort any currently pending fetch request immediately.`,
                code: `// Production Predictive Search Engine with AbortController
class PredictiveSearchEngine {
  constructor() {
    this.abortController = null;
    this.debounceTimer = null;
  }

  handleInput(query, callback) {
    clearTimeout(this.debounceTimer);

    if (query.trim().length < 2) {
      callback([]);
      return;
    }

    // Cancel previously running request to prevent race conditions
    if (this.abortController) {
      this.abortController.abort();
    }
    this.abortController = new AbortController();

    this.debounceTimer = setTimeout(async () => {
      try {
        const url = \`/search/suggest.json?q=\${encodeURIComponent(query)}&resources[type]=product&resources[limit]=5\`;
        const res = await fetch(url, { signal: this.abortController.signal });
        const data = await res.json();
        callback(data.resources.results.products);
      } catch (err) {
        if (err.name !== 'AbortError') console.error('Search error:', err);
      }
    }, 300);
  }
}`,
                language: 'javascript',
            },
            {
                heading: 'Live Variant Switching: Price, Media Gallery, and Availability',
                body: `When a shopper selects a color or size on the PDP, the page must update instantly:
1. Listen for Option Change: Swatch or dropdown change events evaluate the newly selected option combinations (\`Color: Black\`, \`Size: Large\`).
2. Variant Matching: Look up the corresponding variant object in \`product.variants\` JSON to obtain the unique variant ID.
3. DOM Mutation:
   - Update price and strikethrough compare-at price.
   - Update availability badge ("In Stock" vs "Sold Out").
   - Scroll media gallery to the featured image assigned to that variant (\`variant.featured_media.id\`).
   - Enable/disable the Add to Cart button.`,
                callout: {
                    type: 'tip',
                    text: 'Pair variant switching with a loading indicator on the media gallery to reassure users while high-resolution variant imagery loads.',
                },
            },
            {
                heading: 'URL State Management via window.history.replaceState',
                body: `When a customer toggles between variants on a PDP, the browser URL must update to include the variant ID parameter:
\`window.history.replaceState({}, '', '?variant=' + selectedVariantId);\`
Why URL Synchronization is Essential:
• Shareability: If a customer shares the link with a friend or bookmarks the page, it opens with the exact selected color and size pre-selected!
• Cart & Checkout Consistency: Ensures analytics pixels and referral trackers attribute conversions to the exact SKU selected.
• Clean History: Use \`replaceState()\` rather than \`pushState()\` so that clicking the browser "Back" button returns the user to the collection catalog rather than stepping through 10 individual variant clicks.`,
                callout: {
                    type: 'warning',
                    text: 'Using `pushState` for every variant click traps the user in an infinite back-button loop. Always use `replaceState` for variant toggles.',
                },
            }
        ],
        mistakes: [
            'Sending a fetch request on every single keypress without debouncing, hammering the store with requests and hitting rate limits.',
            'Allowing out-of-order network responses (race conditions) to overwrite newer search results due to missing AbortController.',
            'Reloading the entire page when a variant is selected instead of updating DOM state dynamically.',
        ],
        checklist: [
            'Implemented debounced input handling with a 250ms threshold.',
            'Used `AbortController` to cancel stale in-flight search requests.',
            'Connected Predictive Search with a dedicated Liquid search section.',
            'Synchronized variant selection with `window.history.replaceState`.',
        ],
        furtherReading: [
            { title: 'Shopify Predictive Search API Documentation', url: 'https://shopify.dev/docs/api/ajax/reference/predictive-search' },
            { title: 'Managing Variant State on Product Pages', url: 'https://shopify.dev/docs/themes/architecture/templates/product' },
        ],
    },
    // =========================================================================
    // WEEK 5: Custom Data Modeling: Metafields & Metaobjects (dev-module-5)
    // =========================================================================
    {
        id: 'dev-m5-l1',
        moduleId: 'dev-module-5',
        slug: 'metafields-2-type-system-definitions-validation',
        title: 'Metafields 2.0: Type System, Definitions & Validation Constraints',
        estimatedMinutes: 45,
        objectives: [
            'Master the Metafields 2.0 architecture: Namespaces, Keys, and Type Definitions',
            'Explore core types: `single_line_text_field`, `number_integer`, `date`, `file_reference`, `product_reference`, `json`, and `dimension`',
            'Set up strict validation rules (minimum values, regex patterns, allowed values) in Shopify Admin and via GraphQL',
            'Pin metafields to merchant resource forms for effortless catalog entry workflows',
        ],
        videoSource: {
            title: 'Shopify Metafields Explained (2026 Tutorial)',
            embedUrl: 'https://www.youtube-nocookie.com/embed/3-1BbHcLgXw',
            channel: 'Learn with Robbin',
            duration: '18:47',
            description: 'Curated YouTube walkthrough from Learn with Robbin that complements this lesson. Watch it alongside the written sections below.',
            topics: ['Metafields 2.0', 'Type System', 'Validation Rules', 'Product References'],
        },
        sections: [
            {
                heading: 'Metafields 2.0 Architecture: Namespaces, Keys, and Type Definitions',
                body: `Shopify Metafields 2.0 provides a strictly typed, native custom data layer for extending core platform resources (products, variants, collections, customers, orders).
The Structure of a Metafield:
• Namespace: A logical grouping container (e.g., \`custom\`, \`specifications\`, \`seo_meta\`).
• Key: The specific variable identifier within that namespace (e.g., \`care_instructions\`, \`fabric_weight\`).
• Type Definition: The formal data type constraint enforced by Shopify's database schema.
Accessing Metafields in Liquid:
\`{{ product.metafields.namespace.key.value }}\`
Always append \`.value\` to access the parsed, typed content rather than the raw Liquid drop wrapper.`,
                callout: {
                    type: 'shopify',
                    text: 'Metafields 2.0 introduced formal definitions. Unlike legacy untyped string metafields, modern metafields are validated against strict schema rules upon entry in the Shopify Admin.',
                },
            },
            {
                heading: 'Exploring Core Metafield Types: Text, Numbers, References, and Dimensions',
                body: `Choosing the correct type definition unlocks native Shopify rendering filters and admin widgets:
• \`single_line_text_field\` & \`multi_line_text_field\`: Simple strings and multiline notes.
• \`number_integer\` & \`number_decimal\`: Numeric values allowing calculations and range filtering in collections.
• \`file_reference\`: Uploaded PDFs (manuals, spec sheets) or secondary brand imagery.
• \`product_reference\` & \`variant_reference\`: Relational links connecting one product to another (e.g. complementary item pairings).
• \`json\`: Arbitrary structured JSON objects for complex multi-variable configurations.
• \`dimension\` & \`weight\`: Measurements containing both a numeric magnitude and unit (e.g., \`value: 12.5\`, \`unit: "cm"\`).`,
                callout: {
                    type: 'tip',
                    text: 'Using `product_reference` or `list.product_reference` lets merchants select related products using Shopify’s visual picker rather than manually typing error-prone SKU handles.',
                },
            },
            {
                heading: 'Enforcing Validation Constraints in Admin & GraphQL Admin API',
                body: `Metafield definitions can enforce strict data integrity rules directly in the database:
• Minimum & Maximum Values: Enforce numeric limits (e.g. \`min: 1\`, \`max: 100\`).
• Character Length Limits: Prevent text overflow by capping string lengths.
• Regular Expression Constraints: Enforce formatting patterns (e.g., requiring a valid ISBN or hex color code).
• Preset Choices (Enum): Restrict inputs to an allowed list (e.g. \`["Cotton", "Polyester", "Wool"]\`).`,
                code: `# GraphQL Mutation: Creating a Strictly Validated Metafield Definition
mutation CreateValidatedMetafieldDefinition {
  metafieldDefinitionCreate(definition: {
    name: "Material Composition",
    namespace: "specifications",
    key: "material",
    type: "single_line_text_field",
    ownerType: PRODUCT,
    validations: [
      {
        name: "choices",
        value: "["Organic Cotton", "Merino Wool", "Recycled Nylon", "Linen"]"
      }
    ]
  }) {
    createdDefinition {
      id
      namespace
      key
    }
    userErrors {
      field
      message
    }
  }
}`,
                language: 'json',
            },
            {
                heading: 'Pinning Metafields to Merchant Resource Entry Forms',
                body: `When a metafield definition is created, it is hidden by default under the "Metafields" collapsible accordion at the very bottom of the product page in the Shopify Admin.
Pinning for Merchant Efficiency:
• In Shopify Admin -> Settings -> Custom data -> Products, click the pin icon next to the definition.
• Pinned metafields appear prominently in the primary product editing form directly alongside title, description, and media!
• This streamlines daily merchandising workflows and prevents catalog operators from missing required technical specifications.`,
                callout: {
                    type: 'note',
                    text: 'A maximum of 20 metafield definitions can be pinned per resource type in the Shopify Admin interface.',
                },
            }
        ],
        mistakes: [
            'Omitting the `.value` accessor on reference metafields (e.g. product, file, or collection references require `.value` to access the underlying Drop).',
            'Using arbitrary strings for structured data like dimensions instead of native dimension or measurement types.',
            'Hardcoding custom data in the product description HTML instead of using structured metafields.',
        ],
        checklist: [
            'Created a pinned Metafield definition with validation rules in the Admin.',
            'Created a single-line text and a product reference metafield.',
            'Accessed both metafields in Liquid using the `.value` accessor where appropriate.',
            'Connected a theme block to a metafield dynamic source in the Theme Editor.',
        ],
        furtherReading: [
            { title: 'Shopify Metafields Documentation', url: 'https://shopify.dev/docs/apps/custom-data/metafields' },
            { title: 'Metafields Liquid Reference', url: 'https://shopify.dev/docs/api/liquid/objects/metafield' },
        ],
    },
    {
        id: 'dev-m5-l2',
        moduleId: 'dev-module-5',
        slug: 'metaobjects-deep-dive-custom-entities-and-web-pages',
        title: 'Metaobjects Deep Dive: Custom Data Entities, Relational Data & Web Pages',
        estimatedMinutes: 50,
        objectives: [
            'Understand Metaobjects: User-defined multi-field data entities with independent schemas',
            'Build relational data structures (e.g., Designer Profiles, FAQs, Recipes, Store Locations)',
            'Create Metaobject Web Pages with SEO metadata, custom URL handles, and dedicated templates',
            'Query and render Metaobjects in Liquid via `metaobjects[type][handle]` and product reference lists',
        ],
        videoSource: {
            title: 'How to use Shopify Metaobjects',
            embedUrl: 'https://www.youtube-nocookie.com/embed/QodbszNa7cI',
            channel: 'Coding with Jan - Shopify Developer',
            duration: '19:21',
            description: 'Curated YouTube walkthrough from Coding with Jan - Shopify Developer that complements this lesson. Watch it alongside the written sections below.',
            topics: ['Metaobjects', 'Custom Post Types', 'Relational Schemas', 'Metaobject Pages'],
        },
        sections: [
            {
                heading: 'Metaobjects Architecture: Custom Relational Data Entities',
                body: `While Metafields attach custom fields to existing Shopify objects, Metaobjects allow developers to invent entirely new custom data models from scratch.
What is a Metaobject?
A user-defined schema containing multiple structured fields. Examples include:
• Brand Ambassador / Creator Profiles (photo, bio, Instagram handle, favorite products).
• Size Charts & Fit Guides (measurements table, model height, brand-specific sizing).
• Store Locations (address, latitude/longitude, opening hours, manager phone).
• Ingredients & Material Sourcing (icon, certification, environmental impact score).`,
                callout: {
                    type: 'shopify',
                    text: 'Metaobjects act as a headless CMS embedded directly inside the Shopify Admin, eliminating the need for external database integrations like Airtable or Contentful.',
                },
            },
            {
                heading: 'Building Relational Data Models with Metaobject References',
                body: `The true power of Metaobjects lies in relational linking:
1. Define the Metaobject Definition (e.g., \`creator_profile\`).
2. Populate Metaobject Entries in Admin -> Content -> Metaobjects (e.g., "Sarah Jenkins", "Marcus Vance").
3. Add a Metafield on the Product: Create a product metafield with type \`metaobject_reference\` pointing to \`creator_profile\`.
4. Link on the Product: On the "Merino Hoodie" product, select "Sarah Jenkins" as the featured creator.
5. In Liquid, accessing the product automatically gives you full relational access to the creator’s bio, image, and social links!`,
                callout: {
                    type: 'tip',
                    text: 'Updating an entry in Content -> Metaobjects updates every single product across the store that references that entry instantaneously.',
                },
            },
            {
                heading: 'Metaobject Web Pages: SEO Metadata, URL Handles & Custom Templates',
                body: `Shopify allows Metaobjects to publish their own dedicated web pages with unique URLs!
Enabling Web Pages:
• In the Metaobject definition, toggle "Web pages" under Capabilities.
• Configure Page URL Handle: e.g., \`/pages/creators/sarah-jenkins\`.
• Assign SEO Fields: Select which metaobject fields populate the HTML \`<title>\` and \`<meta name="description">\`.
• Dedicated Theme Template: Shopify creates an alternate template in \`/templates/metaobject/creator_profile.json\` dedicated to rendering this custom post type!`,
                callout: {
                    type: 'warning',
                    text: 'Ensure your metaobject template defines canonical link tags and Open Graph metadata in `<head>` to maximize SEO indexation.',
                },
            },
            {
                heading: 'Querying and Rendering Metaobjects in Liquid',
                body: `There are two primary ways to access metaobjects in Liquid:
1. Via Product Reference:
   \`{{ product.metafields.custom.designer.value.name }}\`
   \`{{ product.metafields.custom.designer.value.avatar | image_url: width: 200 | image_tag }}\`
2. Global Directory Querying:
   Iterate all entries of a specific metaobject definition using the global \`shop.metaobjects\` drop:
   \`{% for designer in shop.metaobjects.designer.values %}\`
   This enables building directory indexes (e.g., "All Brand Ambassadors" or "Store Locator Grid") without creating mock products.`,
                code: `<!-- Liquid Rendering: Product Metaobject Relational Link -->
{% assign creator = product.metafields.custom.featured_creator.value %}

{% if creator %}
  <div class="creator-spotlight-card">
    <div class="creator-avatar">
      {{ creator.photo | image_url: width: 120, height: 120 | image_tag: alt: creator.full_name, loading: 'lazy' }}
    </div>
    <div class="creator-details">
      <span class="badge-curator">Curated By</span>
      <h3 class="creator-name">{{ creator.full_name }}</h3>
      <p class="creator-bio">{{ creator.short_bio }}</p>
      {% if creator.instagram_handle != blank %}
        <a href="https://instagram.com/{{ creator.instagram_handle }}" class="social-link" target="_blank" rel="noopener">
          @{{ creator.instagram_handle }}
        </a>
      {% endif %}
    </div>
  </div>
{% endif %}`,
                language: 'html',
            }
        ],
        mistakes: [
            'Creating redundant metafields on every product instead of a single reusable Metaobject referenced across hundreds of products.',
            'Forgetting to configure the "Web pages" feature on Metaobjects when public landing pages are required.',
            'Omitting `.value` when traversing image or file references inside a Metaobject.',
        ],
        checklist: [
            'Defined a Metaobject schema with at least 4 distinct field types.',
            'Created 3 entries of the Metaobject in the Shopify Admin.',
            'Referenced the Metaobject from a product metafield.',
            'Rendered the relational data cleanly in a product template section.',
        ],
        furtherReading: [
            { title: 'Shopify Metaobjects Architecture Guide', url: 'https://shopify.dev/docs/apps/custom-data/metaobjects' },
            { title: 'Creating Metaobject Web Pages', url: 'https://shopify.dev/docs/apps/custom-data/metaobjects/web-pages' },
        ],
    },
    {
        id: 'dev-m5-l3',
        moduleId: 'dev-module-5',
        slug: 'dynamic-sources-and-theme-editor-metafield-integration',
        title: 'Theme Editor Dynamic Sources: No-Code Custom Data for Merchants',
        estimatedMinutes: 40,
        objectives: [
            'Connect section settings and block settings directly to Metafields via Dynamic Sources',
            'Configure schema setting types that support dynamic sources (`text`, `richtext`, `image_picker`, `url`)',
            'Provide fallback default values when a product lacks a configured metafield value',
            'Test multi-variant metafields to dynamically swap specs when customers change variants',
        ],
        videoSource: {
            title: 'Using Dynamic Content & Metafields in Shopify',
            embedUrl: 'https://www.youtube-nocookie.com/embed/IvIcce6ORxU',
            channel: 'Three Acres Shopify Agency',
            duration: '4:05',
            description: 'Curated YouTube walkthrough from Three Acres Shopify Agency that complements this lesson. Watch it alongside the written sections below.',
            topics: ['Dynamic Sources', 'Theme Editor', 'Fallback Values', 'Variant Metafields'],
        },
        sections: [
            {
                heading: 'Connecting Section Settings Directly to Metafields via Dynamic Sources',
                body: `Dynamic Sources bridge merchant-configured custom data and Theme Editor visual layouts.
How Dynamic Sources Work:
In the Theme Editor, whenever a setting supports dynamic sources, a "Connect dynamic source" database icon appears in the top-right corner of the input field.
Clicking the icon allows the merchant to bind that setting directly to any product, variant, or collection metafield!
Example:
Instead of typing a static headline in an "Image with Text" section on the PDP, the merchant connects the headline to \`product.metafields.specifications.care_title\`.
Now, every product page renders its own unique specification title dynamically using a single unified section!`,
                callout: {
                    type: 'tip',
                    text: 'Dynamic sources eliminate the need to create 50 separate JSON templates for different products. One template dynamically populates data from metafields.',
                },
            },
            {
                heading: 'Configuring Schema Setting Types That Support Dynamic Sources',
                body: `Not all section schema setting types support dynamic sources. As a theme developer, you must use compatible types:
Supported Types:
• \`text\`: Binds to \`single_line_text_field\`, \`number_integer\`, \`date\`.
• \`richtext\`: Binds to \`multi_line_text_field\`, \`richtext\`.
• \`image_picker\`: Binds to \`file_reference\` (image types).
• \`url\`: Binds to page references or file URLs.
• \`video\`: Binds to uploaded video file references.
If you use unsupported setting types (like \`select\` or \`radio\`), the dynamic source connection icon will not appear in the merchant Theme Editor.`,
                callout: {
                    type: 'shopify',
                    text: 'Shopify automatically validates type matching. An `image_picker` setting can only be connected to file references containing image MIME types.',
                },
            },
            {
                heading: 'Providing Robust Fallbacks for Missing Metafield Data',
                body: `What happens when a merchant creates a new product and forgets to populate a metafield?
If your theme code does not handle nil checks, the storefront renders ugly empty white gaps or broken markup.
Defensive Liquid Fallbacks:
\`\`\`liquid
{% assign care_guide = product.metafields.custom.care_instructions.value | default: 'Wash cold, hang dry.' %}
<div class="product-care-info">
  <p>{{ care_guide }}</p>
</div>
\`\`\`
Conditional Wrapper Suppression:
If an entire accordion block depends on a metafield, wrap the entire container in an \`{% if product.metafields.custom.size_guide != blank %}\` check so the empty container is completely omitted from the DOM.`,
                callout: {
                    type: 'warning',
                    text: 'Never render an empty HTML container if the underlying metafield is blank. Empty borders and missing image icons look broken to customers.',
                },
            },
            {
                heading: 'Testing Multi-Variant Metafields and Dynamic Spec Swapping',
                body: `Metafields can be attached to individual Product Variants (e.g., variant-specific battery life, material finish, or dimensions).
Real-Time Variant Spec Swapping:
1. In Liquid, output variant metafield data into a hidden JSON script tag or data attributes on the variant options.
2. When the user changes variants in the UI (e.g. switching from 13-inch to 15-inch laptop), the JavaScript variant listener parses the selected variant’s metafields and updates the specification table instantly without page reload!`,
                code: `<!-- Liquid Snippet: Variant-Specific Metafield Hydration -->
<script type="application/json" id="variant-metafields-json">
  {
    {% for variant in product.variants %}
      "{{ variant.id }}": {
        "battery_life": {{ variant.metafields.specs.battery_life.value | json | default: '"10 Hours"' }},
        "weight_grams": {{ variant.metafields.specs.weight.value | json | default: '"1,400g"' }}
      }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  }
</script>

<script>
// On variant change event:
document.addEventListener('variant:change', (event) => {
  const variantId = event.detail.variant.id;
  const metaLookup = JSON.parse(document.getElementById('variant-metafields-json').textContent);
  const specs = metaLookup[variantId];
  if (specs) {
    document.querySelector('.spec-battery').textContent = specs.battery_life;
    document.querySelector('.spec-weight').textContent = specs.weight_grams;
  }
});
</script>`,
                language: 'html',
            }
        ],
        mistakes: [
            'Hardcoding content in section templates instead of exposing customizable settings that support dynamic sources.',
            'Not providing fallback styling when a dynamic source evaluates to blank or null.',
        ],
        checklist: [
            'Created a section setting connected to a dynamic source.',
            'Tested fallback rendering when the metafield is empty.',
            'Verified variant-level metafield updates upon variant selection.',
        ],
        furtherReading: [
            { title: 'Dynamic Sources in Shopify Themes', url: 'https://shopify.dev/docs/themes/architecture/settings/dynamic-sources' },
        ],
    },
    // =========================================================================
    // WEEK 6: Customer Accounts, Privacy & Customer Consent API (dev-module-6)
    // =========================================================================
    {
        id: 'dev-m6-l1',
        moduleId: 'dev-module-6',
        slug: 'new-customer-accounts-vs-classic-accounts',
        title: 'New Customer Accounts vs. Classic Accounts: Authentication, SSO & B2B',
        estimatedMinutes: 45,
        objectives: [
            'Analyze architectural differences between Classic Accounts (multipass, liquid) and New Customer Accounts (passwordless OTP, OAuth, web worker extensions)',
            'Configure passwordless authentication, one-time passcodes (OTP), and Google SSO',
            'Enable self-serve returns, order editing, and B2B company location switching in New Customer Accounts',
            'Implement authentication redirect URLs using `shopify.customer.account` APIs',
        ],
        videoSource: {
            title: 'How to Enable and Customize Shopify Customer Accounts (New Account System)',
            embedUrl: 'https://www.youtube-nocookie.com/embed/-Rre177EjIo',
            channel: 'Ecom Mastery',
            duration: '9:45',
            description: 'Curated YouTube walkthrough from Ecom Mastery that complements this lesson. Watch it alongside the written sections below.',
            topics: ['New Customer Accounts', 'Passwordless Auth', 'Self-Serve Returns', 'SSO'],
        },
        sections: [
            {
                heading: 'Classic Accounts vs. New Customer Accounts Architecture',
                body: `Shopify supports two fundamentally distinct customer account systems:
1. Classic Customer Accounts (Legacy):
   - Hosted on \`yourstore.com/account\`.
   - Uses traditional email and password login or Multipass SSO (Shopify Plus).
   - Rendered using Liquid templates (\`customers/account.liquid\`, \`customers/login.liquid\`).
2. New Customer Accounts (Modern Platform Standard):
   - Hosted on \`shopify.com/authentication/{shop_id}\`.
   - Passwordless One-Time Passcode (OTP) sent via email or 1-tap Google SSO.
   - Built on a modern Single Page Application architecture.
   - Extended using sandboxed Customer Account UI Extensions (Web Workers), NOT Liquid!`,
                callout: {
                    type: 'shopify',
                    text: 'All new Shopify features—including B2B company location management and native self-serve order returns—are exclusively available on New Customer Accounts.',
                },
            },
            {
                heading: 'Configuring Passwordless OTP Authentication and Google SSO',
                body: `Password fatigue is the #1 reason customers abandon account creation during checkout:
• One-Time Passcode (OTP) Mechanics:
  When a customer enters their email, Shopify dispatches a 6-digit cryptographic security code. Entering the code authenticates the session immediately with zero forgotten-password reset loops.
• Google One-Tap SSO:
  Customers can log in with a single tap using their existing Google browser credentials.
• Security & Fraud Protection:
  Passwordless authentication completely neutralizes credential-stuffing attacks and brute-force password cracking on merchant stores.`,
                callout: {
                    type: 'tip',
                    text: 'Enabling New Customer Accounts typically reduces customer service password-reset tickets by over 90%.',
                },
            },
            {
                heading: 'Native Self-Serve Returns, Order Editing & B2B Company Switching',
                body: `New Customer Accounts deliver enterprise self-service capabilities natively:
• Self-Serve Return Requests: Customers can initiate return workflows, select reason codes, and download return labels directly from their order history without emailing customer support.
• Real-Time Order Editing: Customers can update shipping addresses or cancel unfulfilled orders within a merchant-configured grace window.
• B2B Company Location Switching: B2B wholesale buyers representing multiple branch locations can seamlessly toggle between assigned locations to view location-specific catalogs and payment terms.`,
                callout: {
                    type: 'warning',
                    text: 'Classic Accounts do NOT support native self-serve returns. Attempting to build custom return forms in classic Liquid templates requires maintaining complex third-party app middleware.',
                },
            },
            {
                heading: 'Authentication Redirects & Customer Account API Navigation',
                body: `Routing customers to account portals from custom theme components:
• Canonical Route Helpers: Always use dynamic Liquid routes:
  \`{{ routes.account_url }}\` -> Automatically resolves to the merchant’s active account portal.
  \`{{ routes.account_login_url }}\` -> Directs to the OTP login screen.
• Return-To Redirection:
  Append \`?return_to=/checkout\` to automatically return the authenticated customer back to their cart or checkout flow upon successful code verification.`,
                code: `<!-- Liquid Navigation Component for Customer Accounts -->
<div class="header__account-actions">
  {% if customer %}
    <a href="{{ routes.account_url }}" class="account-link">
      <span class="icon-user" aria-hidden="true"></span>
      <span>Hi, {{ customer.first_name | default: 'Account' }}</span>
    </a>
  {% else %}
    <a href="{{ routes.account_login_url }}?return_to={{ request.path | url_encode }}" class="account-link">
      <span>Log In</span>
    </a>
  {% endif %}
</div>`,
                language: 'html',
            }
        ],
        mistakes: [
            'Trying to edit Liquid templates for stores configured with New Customer Accounts (New Accounts use UI Extensions, not Liquid).',
            'Forgetting to update store navigation links to point to the new customer account URL.',
        ],
        checklist: [
            'Enabled New Customer Accounts in a development store.',
            'Tested the passwordless 6-digit OTP login flow.',
            'Configured self-serve return rules in the Admin.',
            'Identified extension points for custom developer additions.',
        ],
        furtherReading: [
            { title: 'New Customer Accounts Overview', url: 'https://shopify.dev/docs/apps/customer-accounts' },
            { title: 'Customer Accounts API Reference', url: 'https://shopify.dev/docs/api/customer' },
        ],
    },
    {
        id: 'dev-m6-l2',
        moduleId: 'dev-module-6',
        slug: 'customer-account-ui-extensions-deep-dive',
        title: 'Customer Account UI Extensions: Building Custom Profile Tabs & Loyalty Portals',
        estimatedMinutes: 50,
        objectives: [
            'Scaffold Customer Account UI Extensions using Shopify CLI (`shopify app generate extension`)',
            'Understand extension targets: `customer-account.order-status.*`, `customer-account.profile.*`, and full-page extensions',
            'Use pre-built Shopify UI Components (`BlockStack`, `InlineStack`, `Banner`, `Button`, `TextField`)',
            'Fetch customer loyalty points and tier rewards via secure App Proxy backend calls',
        ],
        videoSource: {
            title: 'Shopify Customer Account UI Extensions Tutorial - Using The Customer Account API',
            embedUrl: 'https://www.youtube-nocookie.com/embed/LDqbU6wrFGU',
            channel: 'Stacking Context - Shopify Development Tutorials',
            duration: '30:25',
            description: 'Curated YouTube walkthrough from Stacking Context - Shopify Development Tutorials that complements this lesson. Watch it alongside the written sections below.',
            topics: ['UI Extensions', 'Extension Targets', 'Shopify UI Components', 'Customer Accounts'],
        },
        sections: [
            {
                heading: 'Scaffolding Customer Account UI Extensions via Shopify CLI',
                body: `Because New Customer Accounts do not use Liquid templates, extending them requires Customer Account UI Extensions.
CLI Generation Workflow:
1. In your Shopify App directory, run:
   \`shopify app generate extension --template customer_account_ui_extension\`
2. Select your extension type:
   - Block Extension: Injected into existing profile or order status pages.
   - Full-Page Extension: Creates an entirely new dedicated page tab in the customer portal (e.g. \`/account/loyalty-rewards\`).
3. Technology Stack: Built using React/Preact and compiled by the Shopify CLI into sandboxed Web Worker bundles.`,
                callout: {
                    type: 'shopify',
                    text: 'Customer Account UI Extensions run in secure sandboxed workers, ensuring high performance, zero DOM tampering, and automatic mobile responsiveness.',
                },
            },
            {
                heading: 'Understanding Extension Targets: Order Status, Profile & Full-Page Views',
                body: `Extension Targets define where your code renders within the account portal:
• \`customer-account.order-status.block.render\`: Injects content into the order detail view (e.g. Live Courier GPS Tracking, Re-Order Button).
• \`customer-account.profile.block.render\`: Injects content into the customer profile dashboard (e.g. VIP Loyalty Points Banner).
• \`customer-account.page.render\`: Renders a complete independent page tab (e.g. Custom Subscription Management Portal).`,
                callout: {
                    type: 'tip',
                    text: 'Target definitions are configured in `shopify.extension.toml`. You can configure a single extension package to render across multiple distinct targets.',
                },
            },
            {
                heading: 'Composing Interfaces with Accessible Shopify UI Components',
                body: `UI Extensions do not permit raw HTML tags (\`<div>\`, \`<button>\`). You compose your interface using Shopify’s accessible, design-system primitives:
• Layout: \`BlockStack\` (vertical stack), \`InlineStack\` (horizontal row), \`Grid\`.
• Typography: \`Heading\`, \`Text\`, \`TextBlock\`.
• Controls: \`Button\`, \`TextField\`, \`ChoiceList\`, \`Checkbox\`.
• Feedback: \`Banner\`, \`SkeletonText\`, \`ProgressIndicator\`.
These components automatically inherit the merchant’s checkout and account branding typography and colors!`,
                code: `// Customer Account UI Extension: VIP Loyalty Portal Block
import {
  reactExtension,
  BlockStack,
  InlineStack,
  Heading,
  Text,
  Button,
  Banner
} from '@shopify/ui-extensions-react/customer-account';

export default reactExtension(
  'customer-account.profile.block.render',
  () => <LoyaltyTierCard />
);

function LoyaltyTierCard() {
  return (
    <Banner status="info">
      <BlockStack spacing="tight">
        <InlineStack inlineAlignment="space-between">
          <Heading level={3}>Gold Tier VIP Member</Heading>
          <Text appearance="accent" emphasis="bold">450 Points Available</Text>
        </InlineStack>
        <Text>You are only 50 points away from unlocking a $25 reward voucher!</Text>
        <Button to="/collections/all" kind="primary">Shop to Earn More</Button>
      </BlockStack>
    </Banner>
  );
}`,
                language: 'javascript',
            },
            {
                heading: 'Fetching Customer Data via Secure App Proxy Backend Calls',
                body: `To display proprietary data (e.g. reward points, warranty registrations) inside an extension:
• App Proxies: Securely route HTTP requests from the storefront through Shopify’s proxy (\`https://yourstore.com/apps/loyalty-proxy/points\`) to your backend server.
• Automatic Verification: Shopify cryptographically signs the proxy request with an \`hmac\` query parameter containing the authenticated \`logged_in_customer_id\`.
• Zero Password Risk: Your extension never transmits API keys or auth tokens from the client browser.`,
                callout: {
                    type: 'warning',
                    text: 'Always verify the `hmac` signature on your backend server before returning sensitive customer loyalty or order data.',
                },
            }
        ],
        mistakes: [
            'Attempting to access raw `window` or `document` DOM APIs inside the Web Worker sandbox.',
            'Using unapproved CSS stylesheets instead of Shopify UI Extension design tokens.',
        ],
        checklist: [
            'Scaffolded a Customer Account UI Extension using Shopify CLI.',
            'Targeted an order action menu target.',
            'Tested the extension locally using `shopify app dev`.',
            'Deployed the extension to an unpublished dev store.',
        ],
        furtherReading: [
            { title: 'Customer Account UI Extensions Guide', url: 'https://shopify.dev/docs/api/customer-account-ui-extensions' },
        ],
    },
    {
        id: 'dev-m6-l3',
        moduleId: 'dev-module-6',
        slug: 'shopify-customer-privacy-api-and-cookie-consent',
        title: 'Customer Privacy API, GDPR/CCPA Compliance & Consent Management',
        estimatedMinutes: 45,
        objectives: [
            'Understand Shopify Customer Privacy API specifications and global compliance frameworks (GDPR, CCPA, CPRA)',
            'Inspect and control consent states via `window.Shopify.customerPrivacy`',
            'Block third-party tracking pixels (Meta, TikTok, GA4) until explicit opt-in consent is granted',
            'Implement native consent banner integration with OneTrust, Cookiebot, or custom banners',
        ],
        videoSource: {
            title: 'How to Add Cookie Consent to Shopify | Complete Setup Guide',
            embedUrl: 'https://www.youtube-nocookie.com/embed/Nfgb6QHtxdQ',
            channel: 'WebSensePro',
            duration: '11:22',
            description: 'Curated YouTube walkthrough from WebSensePro that complements this lesson. Watch it alongside the written sections below.',
            topics: ['Customer Privacy API', 'GDPR Compliance', 'Consent Management', 'Web Pixels'],
        },
        sections: [
            {
                heading: 'Customer Privacy API Specifications & Global Compliance Mandates',
                body: `Data protection regulations (GDPR in Europe, CCPA/CPRA in California, LGPD in Brazil) impose severe legal penalties for unauthorized tracking of consumers.
Shopify's Unified Privacy Architecture:
• Native Customer Privacy API: A standardized browser API (\`window.Shopify.customerPrivacy\`) governing consent state across all analytics, marketing pixels, and personalization scripts.
• 4 Privacy Signals:
  1. \`analytics\`: Permission to track behavioral usage (GA4, Hotjar).
  2. \`marketing\`: Permission to run retargeting ads and conversion pixels (Meta CAPI, TikTok).
  3. \`preferences\`: Permission to store persistent preferences (currency, localized language).
  4. \`sale_of_data\`: California CCPA opt-out declaration.`,
                callout: {
                    type: 'shopify',
                    text: 'Shopify’s native privacy API integrates directly with Shopify Markets, automatically applying GDPR opt-in rules in Europe and CCPA opt-out rules in California.',
                },
            },
            {
                heading: 'Inspecting & Mutating Consent States via window.Shopify.customerPrivacy',
                body: `Interacting with the privacy engine via JavaScript:
• Checking Consent:
  \`window.Shopify.customerPrivacy.analyticsProcessingAllowed()\` -> Returns boolean.
  \`window.Shopify.customerPrivacy.marketingAllowed()\` -> Returns boolean.
• Setting Visitor Consent:
  \`window.Shopify.customerPrivacy.setTrackingConsent(true, () => console.log('Consent stored!'));\`
• Listening for Changes:
  Listen for the \`visitorConsentCollected\` DOM event to initialize tracking pixels dynamically the exact moment a customer clicks "Accept All" on a consent banner.`,
                callout: {
                    type: 'tip',
                    text: 'Never write custom cookies to track consent. Always call `setTrackingConsent()` so Shopify can coordinate consent with checkout and third-party Web Pixels.',
                },
            },
            {
                heading: 'Blocking Third-Party Tracking Pixels Until Explicit Opt-In',
                body: `The #1 compliance violation on Shopify stores is executing Google Tag Manager or Meta pixels before the user accepts cookies.
Defensive Implementation:
• Web Pixels API: Modern Web Pixels configured in Shopify Admin automatically honor the Customer Privacy API without custom code!
• Legacy Script Tag Gatekeeping: If running custom scripts, wrap initialization in a consent check.
If \`!Shopify.customerPrivacy.analyticsProcessingAllowed()\`, halt script execution immediately.`,
                code: `// Privacy-Gated Analytics Loader Pattern
function initAnalyticsSafely() {
  const cp = window.Shopify?.customerPrivacy;

  if (!cp) {
    console.warn('Customer Privacy API not initialized.');
    return;
  }

  if (cp.analyticsProcessingAllowed()) {
    console.log('[Analytics] Consent confirmed. Initializing Google Analytics.');
    loadGa4Script();
  } else {
    console.log('[Analytics] Awaiting visitor consent before loading tracking scripts.');
    // Listen for real-time consent grant event
    document.addEventListener('visitorConsentCollected', (event) => {
      if (cp.analyticsProcessingAllowed()) {
        loadGa4Script();
      }
    });
  }
}

function loadGa4Script() {
  // Safe script tag injection logic
}

initAnalyticsSafely();`,
                language: 'javascript',
            },
            {
                heading: 'Integrating Consent Management Platforms (OneTrust, Cookiebot, Native)',
                body: `Merchants frequently use enterprise Consent Management Platforms (CMPs) like OneTrust, Cookiebot, or Ketch:
• CMP Integration: High-end CMPs integrate with Shopify’s Customer Privacy API via standard callback bridges.
• Native Shopify Banner: For zero-dependency simplicity, Shopify provides a native privacy banner configured in Admin -> Settings -> Customer Privacy that has zero script bloat and zero layout shift.`,
                callout: {
                    type: 'warning',
                    text: 'Third-party CMP banners that inject 200KB of external JavaScript can devastate Interaction to Next Paint (INP). Audit CMP performance before client deployment.',
                },
            }
        ],
        mistakes: [
            'Hardcoding Facebook Pixel or GA4 tracking scripts in `layout/theme.liquid` that fire unconditionally prior to consent.',
            'Ignoring the `visitorConsentCollected` event, preventing pixels from capturing events immediately after the user accepts cookies.',
        ],
        checklist: [
            'Verified presence of `window.Shopify.customerPrivacy`.',
            'Implemented conditional script execution using `marketingAllowed()` and `analyticsProcessingAllowed()`.',
            'Registered a listener for `visitorConsentCollected`.',
            'Tested compliance using Chrome DevTools with EU IP simulation.',
        ],
        furtherReading: [
            { title: 'Shopify Customer Privacy API Documentation', url: 'https://shopify.dev/docs/api/consent-tracking' },
        ],
    },
    // =========================================================================
    // WEEK 7: Checkout Extensibility & Checkout UI Extensions (dev-module-7)
    // =========================================================================
    {
        id: 'dev-m7-l1',
        moduleId: 'dev-module-7',
        slug: 'checkout-extensibility-paradigm-checkout-liquid-deprecation',
        title: 'The Checkout Extensibility Architecture: RIP checkout.liquid',
        estimatedMinutes: 50,
        objectives: [
            'Understand why Shopify permanently deprecated `checkout.liquid` in favor of Checkout Extensibility',
            'Analyze the security, upgradeability, and performance advantages of Sandboxed Web Workers',
            'Understand the 4 Extensibility pillars: UI Extensions, Functions, Web Pixels, and Branding API',
            'Configure the Checkout Branding API to match merchant typography, colors, and border radiuses via GraphQL',
        ],
        videoSource: {
            title: 'How to edit your Shopify checkout page (Checkout Extensibility)',
            embedUrl: 'https://www.youtube-nocookie.com/embed/UkRpd3BWOG0',
            channel: 'Christopher Dodd - Shopify Developer',
            duration: '7:53',
            description: 'Curated YouTube walkthrough from Christopher Dodd - Shopify Developer that complements this lesson. Watch it alongside the written sections below.',
            topics: ['Checkout Extensibility', 'checkout.liquid Deprecation', 'Branding API', 'Security Sandbox'],
        },
        sections: [
            {
                heading: 'The Demise of checkout.liquid: Why Shopify Deprecated It',
                body: `For over a decade, Shopify Plus merchants customized checkout by editing a monolithic file called \`checkout.liquid\`.
Why Shopify Killed checkout.liquid (permanently retired in August 2024 / 2025):
• The Security Nightmare: \`checkout.liquid\` allowed merchants to inject arbitrary third-party JavaScript directly into the payment flow. A single compromised npm dependency or malicious app script could scrape 16-digit credit card numbers from DOM input fields.
• Fragility & Failed Updates: Whenever Shopify upgraded checkout speed or deployed Shop Pay, custom \`checkout.liquid\` scripts broke, causing millions in lost merchant revenue.
• Mobile Friction: Heavy scripts caused massive layout shifts and checkout abandonment on mobile connections.`,
                callout: {
                    type: 'warning',
                    text: '`checkout.liquid` is dead. All modern checkout customizations must be built using Checkout Extensibility.',
                },
            },
            {
                heading: 'Sandboxed Web Workers: Security, Upgradeability & Speed',
                body: `The architectural foundation of Checkout Extensibility is the Sandboxed Web Worker:
• Isolated Execution: Your extension code runs in a separate browser thread isolated from the main window.
• Zero Direct DOM Access: Extensions cannot access \`document.querySelector\`, \`window.localStorage\`, or raw payment inputs, completely neutralizing client-side credit card skimming attacks.
• Future-Proof Architecture: Because extensions render via Shopify's declarative Preact component primitives, Shopify can refactor the underlying checkout DOM without breaking your extension code.`,
                callout: {
                    type: 'shopify',
                    text: 'Checkout Extensibility delivers 99.99% uptime during peak holiday events like Black Friday, processing over $4 billion with sub-second page loads.',
                },
            },
            {
                heading: 'The 4 Pillars of Checkout Extensibility',
                body: `Modern checkout development is divided into 4 specialized pillars:
1. Checkout UI Extensions: Visual components (upsells, delivery instructions, trust badges) rendered in designated extension slots.
2. Shopify Functions: High-performance backend rules (discounts, shipping customization, payment filtering) running compiled WebAssembly.
3. Web Pixels API: Sandboxed behavioral telemetry subscribing to checkout events without blocking checkout execution.
4. Checkout Branding API: Declarative GraphQL API to control fonts, colors, border radii, and visual accents across the checkout funnel.`,
                callout: {
                    type: 'tip',
                    text: 'Mastering these 4 pillars positions you as an elite Shopify Plus engineer commanding top-tier agency and consulting rates.',
                },
            },
            {
                heading: 'Configuring Checkout Branding API via GraphQL Mutations',
                body: `The Checkout Branding API provides deep visual customization of checkout typography, buttons, and form inputs via GraphQL:
• Color Schemes: Backgrounds, surface cards, primary action buttons, error text states.
• Typography: Primary headings and body typography matching the main storefront.
• Spatial Geometry: Custom border-radius tokens (\`none\`, \`small\`, \`base\`, \`large\`, \`fully_rounded\`).`,
                code: `# GraphQL Mutation: Customizing Checkout Visual Branding
mutation UpdateCheckoutBranding($checkoutProfileId: ID!) {
  checkoutBrandingUpsert(
    checkoutProfileId: $checkoutProfileId,
    checkoutBrandingInput: {
      designSystem: {
        colors: {
          schemes: {
            scheme1: {
              base: {
                background: "#FAFAFA",
                text: "#18181B"
              },
              primaryButton: {
                background: "#0284C7",
                text: "#FFFFFF"
              }
            }
          }
        },
        typography: {
          primary: {
            shopifyFontGroup: {
              name: "Inter"
            }
          }
        },
        cornerRadius: {
          base: 8
        }
      }
    }
  ) {
    checkoutBranding {
      id
    }
    userErrors {
      field
      message
    }
  }
}`,
                language: 'json',
            }
        ],
        mistakes: [
            'Attempting to edit `checkout.liquid` on modern Shopify Plus stores (deprecated and locked).',
            'Trying to inject custom CSS directly into checkout (all styling must follow the Branding API or UI extension tokens).',
        ],
        checklist: [
            'Reviewed the deprecation timeline for `checkout.liquid`.',
            'Executed a GraphQL mutation against the Checkout Branding API.',
            'Verified that One-Page Checkout updates styles automatically.',
        ],
        furtherReading: [
            { title: 'Checkout Extensibility Documentation', url: 'https://shopify.dev/docs/apps/checkout' },
            { title: 'Checkout Branding API Guide', url: 'https://shopify.dev/docs/api/admin-graphql/latest/mutations/checkoutBrandingUpsert' },
        ],
    },
    {
        id: 'dev-m7-l2',
        moduleId: 'dev-module-7',
        slug: 'building-checkout-ui-extensions-targets-components',
        title: 'Building Checkout UI Extensions: Targets, Components & Real-Time Validation',
        estimatedMinutes: 55,
        objectives: [
            'Scaffold a Checkout UI Extension using `shopify app generate extension`',
            'Navigate key Extension Targets: `purchase.checkout.block.render`, `purchase.checkout.shipping-option-list.render-after`, etc.',
            'Master UI Extension components: `Banner`, `BlockStack`, `ChoiceList`, `Checkbox`, `SkeletonText`',
            'Implement blocking validations: Halt checkout progression if custom conditions (e.g. age verification, gift message limit) fail',
        ],
        videoSource: {
            title: 'How to customise CHECKOUT as a Shopify Developer with UI Extensions (Full beginner tutorial)',
            embedUrl: 'https://www.youtube-nocookie.com/embed/VqrAqwhbZPA',
            channel: 'Bosidev | Shopify Developer',
            duration: '34:45',
            description: 'Curated YouTube walkthrough from Bosidev | Shopify Developer that complements this lesson. Watch it alongside the written sections below.',
            topics: ['Checkout UI Extensions', 'Extension Targets', 'Blocking Validation', 'React Extension'],
        },
        sections: [
            {
                heading: 'Scaffolding Checkout UI Extensions via Shopify CLI',
                body: `Generating a Checkout UI Extension:
1. Run \`shopify app generate extension --template checkout_ui_extension\`.
2. Name your extension (e.g. \`pdp-gift-message-checkout\`).
3. Select your preferred language: TypeScript or JavaScript.
4. Inspect \`shopify.extension.toml\`: This configuration file declares the extension target, API version, and merchant settings schema.`,
                callout: {
                    type: 'shopify',
                    text: 'Always use TypeScript for Checkout UI Extensions. Shopify provides complete `@shopify/ui-extensions-react/checkout` type definitions with strict prop validation.',
                },
            },
            {
                heading: 'Navigating Key Extension Targets Across the Checkout Funnel',
                body: `Extension Targets specify the exact slot where your extension mounts:
• \`purchase.checkout.block.render\`: A versatile block that merchants can drag-and-drop anywhere in the checkout flow using the visual Checkout Editor.
• \`purchase.checkout.shipping-option-list.render-after\`: Renders directly below the available shipping methods (ideal for delivery instructions or rush processing notes).
• \`purchase.checkout.payment-method-list.render-after\`: Renders beneath payment options (ideal for payment security reassurances).
• \`purchase.thank-you.block.render\`: Renders on the post-purchase Thank You / Order Confirmation page.`,
                callout: {
                    type: 'tip',
                    text: 'Using `purchase.checkout.block.render` gives merchants complete freedom to reposition your extension anywhere within the checkout layout.',
                },
            },
            {
                heading: 'Composing Interfaces with Core UI Extension Components',
                body: `UI Extensions render using native Shopify declarative components:
• Layout: \`BlockStack\`, \`InlineLayout\`, \`Grid\`.
• Interactive: \`Checkbox\`, \`ChoiceList\`, \`Select\`, \`TextField\`, \`Button\`.
• Reassurance: \`Banner\` (with \`info\`, \`warning\`, \`critical\` statuses), \`Icon\`, \`Badge\`.
• State Hooks:
  - \`useCartLines()\`: Accesses all line items in the active cart.
  - \`useShippingAddress()\`: Accesses the customer's delivery destination.
  - \`useApplyAttributeChange()\`: Writes custom metadata to the order.`,
                code: `// Checkout UI Extension: Delivery Instructions Field
import {
  reactExtension,
  BlockStack,
  TextField,
  useApplyAttributeChange,
  useAttributes
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension('purchase.checkout.block.render', () => <DeliveryNoteApp />);

function DeliveryNoteApp() {
  const applyAttributeChange = useApplyAttributeChange();
  const attributes = useAttributes();
  const currentNote = attributes.find(a => a.key === 'Delivery Instructions')?.value || '';

  return (
    <BlockStack spacing="tight">
      <TextField
        label="Delivery Notes or Gate Code (Optional)"
        value={currentNote}
        onChange={(val) => {
          applyAttributeChange({
            type: 'updateAttribute',
            key: 'Delivery Instructions',
            value: val
          });
        }}
      />
    </BlockStack>
  );
}`,
                language: 'javascript',
            },
            {
                heading: 'Implementing Blocking Validations with Buyer Journey Interceptors',
                body: `In certain business models (alcohol delivery, custom engraving, minimum age verification), you must halt checkout progression if criteria are unmet:
• The \`useBuyerJourneyIntercept\` Hook:
  Allows your extension to intercept the customer clicking "Pay now" or "Continue to shipping".
  Return \`{ behavior: 'block', reason: 'You must confirm you are 21 years of age or older.' }\`.
• Real-Time Error Display:
  Shopify highlights your extension and displays a native error banner, preventing payment processing until the customer resolves the validation requirement!`,
                callout: {
                    type: 'warning',
                    text: 'Blocking validations require the `block_progress` capability declared in `shopify.extension.toml`. Use sparingly: unnecessary checkout blocking damages conversion rates.',
                },
            }
        ],
        mistakes: [
            'Trying to read plain-text payment card data inside UI extensions (Shopify strictly blocks extensions from payment field access for PCI-DSS compliance).',
            'Failing to handle async network timeouts during blocking validations, causing checkout buttons to hang indefinitely.',
        ],
        checklist: [
            'Scaffolded a Checkout UI extension with Shopify CLI.',
            'Used `useApplyAttributeChange` to store order custom attributes.',
            'Tested the extension in the Shopify Checkout Editor.',
            'Added responsive fallback loading states using `SkeletonText`.',
        ],
        furtherReading: [
            { title: 'Checkout UI Extension Targets', url: 'https://shopify.dev/docs/api/checkout-ui-extensions/targets' },
            { title: 'Checkout UI Components Library', url: 'https://shopify.dev/docs/api/checkout-ui-extensions/components' },
        ],
    },
    {
        id: 'dev-m7-l3',
        moduleId: 'dev-module-7',
        slug: 'dynamic-line-item-upsells-and-cart-transformations',
        title: 'One-Click Line Item Upsells & Cart Line Item Transformations',
        estimatedMinutes: 50,
        objectives: [
            'Implement one-click pre-purchase upsells inside the checkout cart summary column',
            'Use `useApplyCartLinesChange` to add, update, and remove line items during active checkout',
            'Query product catalog recommendations in real-time via Storefront GraphQL API',
            'Ensure zero layout shift and handle stock shortages during upsell addition',
        ],
        videoSource: {
            title: 'Building High-Converting Upsell Shopify Checkout Extension',
            embedUrl: 'https://www.youtube-nocookie.com/embed/R-MpiIbZsU4',
            channel: 'Fayyaz Ahmed | Shopify Developer',
            duration: '9:31',
            description: 'Curated YouTube walkthrough from Fayyaz Ahmed | Shopify Developer that complements this lesson. Watch it alongside the written sections below.',
            topics: ['Checkout Upsells', 'useApplyCartLinesChange', 'Storefront API', 'Line Item Manipulation'],
        },
        sections: [
            {
                heading: '1-Click Pre-Purchase Upsells in the Checkout Sidebar',
                body: `The checkout Order Summary column is the highest-converting real estate in ecommerce for impulse add-ons:
Why It Converts:
• Tokenized Context: The customer is already committed to the purchase and has entered their shipping information.
• High Attachment Products: Low-consideration items ($3-$15) like Warranty Protection, Cleaning Kits, or Mystery Samples convert at 18%+ attachment rates.
• Instant 1-Click Addition: Clicking "Add" immediately mutates the checkout total without reloading the page.`,
                callout: {
                    type: 'tip',
                    text: 'A $3 shipping protection item offered in the checkout sidebar adds pure high-margin profit to every transaction.',
                },
            },
            {
                heading: 'Cart Mutations via useApplyCartLinesChange',
                body: `To add or remove line items dynamically within a Checkout UI Extension:
• Use the \`useApplyCartLinesChange()\` Hook:
\`\`\`javascript
const applyCartLinesChange = useApplyCartLinesChange();

// Add an upsell item:
await applyCartLinesChange({
  type: 'addCartLine',
  merchandiseId: 'gid://shopify/ProductVariant/449102918',
  quantity: 1
});

// Remove an upsell item:
await applyCartLinesChange({
  type: 'removeCartLine',
  id: lineItemKey,
  quantity: 1
});
\`\`\`
This hook handles recalculating order totals, taxes, and shipping rates on Shopify servers automatically.`,
                callout: {
                    type: 'shopify',
                    text: '`useApplyCartLinesChange` communicates directly with Shopify’s checkout backend with sub-50ms latency.',
                },
            },
            {
                heading: 'Querying Catalog Recommendations via Storefront API GraphQL',
                body: `Rather than hardcoding a static upsell SKU, query dynamic recommendations:
• The \`useApi()\` Hook: Provides authenticated access to the Storefront API from within the extension.
• Querying Recommendations: Fetch recommendations based on the primary product in the cart:
  \`query { productRecommendations(productId: $id) { id title featuredImage { url } variants(first: 1) { nodes { id price { amount } } } } }\`
This ensures upsells remain contextually relevant across different product categories.`,
                code: `// Production Checkout UI Extension: 1-Click Warranty Upsell
import {
  reactExtension,
  BlockStack,
  InlineLayout,
  Text,
  Button,
  useApplyCartLinesChange,
  useCartLines
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension('purchase.checkout.block.render', () => <WarrantyUpsell />);

function WarrantyUpsell() {
  const applyCartLinesChange = useApplyCartLinesChange();
  const cartLines = useCartLines();
  const WARRANTY_VARIANT_ID = 'gid://shopify/ProductVariant/4491029182910';

  const hasWarranty = cartLines.some(l => l.merchandise.id === WARRANTY_VARIANT_ID);

  return (
    <BlockStack spacing="tight" padding="tight">
      <InlineLayout columns={['fill', 'auto']} blockAlignment="center">
        <BlockStack spacing="none">
          <Text emphasis="bold">1-Year Extended Warranty</Text>
          <Text appearance="subdued">Comprehensive accidental damage cover for $9.00</Text>
        </BlockStack>
        <Button
          kind={hasWarranty ? 'secondary' : 'primary'}
          loading={false}
          onPress={async () => {
            if (hasWarranty) {
              const line = cartLines.find(l => l.merchandise.id === WARRANTY_VARIANT_ID);
              if (line) await applyCartLinesChange({ type: 'removeCartLine', id: line.id, quantity: 1 });
            } else {
              await applyCartLinesChange({ type: 'addCartLine', merchandiseId: WARRANTY_VARIANT_ID, quantity: 1 });
            }
          }}
        >
          {hasWarranty ? 'Remove' : '+ Add ($9)'}
        </Button>
      </InlineLayout>
    </BlockStack>
  );
}`,
                language: 'javascript',
            },
            {
                heading: 'Ensuring Zero Layout Shift and Handling Stock Depletions',
                body: `Defensive engineering rules for checkout upsells:
• Reserve Container Dimensions: Use \`SkeletonText\` placeholders while catalog recommendations load over the network to prevent Cumulative Layout Shift (CLS).
• Out-of-Stock Defenses: Check \`variant.availableForSale\` before presenting an item. If stock depletes mid-session, disable the add button and present an informative badge.
• Single-Add Idempotency: Disable the button immediately upon click to prevent double-click submissions.`,
                callout: {
                    type: 'warning',
                    text: 'Never display an out-of-stock product in a checkout upsell. If a customer attempts to add an unavailable item, checkout halts with an error.',
                },
            }
        ],
        mistakes: [
            'Not validating whether the upsell item is already present in the cart, allowing duplicate warranty lines.',
            'Attempting to add draft or unavailable variants, throwing uncaught cart line exceptions.',
        ],
        checklist: [
            'Implemented `useApplyCartLinesChange` for dynamic additions.',
            'Prevented duplicate line additions by checking current cart lines.',
            'Verified totals update instantly in the order summary column.',
        ],
        furtherReading: [
            { title: 'Cart Line Mutation Hook in Checkout', url: 'https://shopify.dev/docs/api/checkout-ui-extensions/apis/cartlines' },
        ],
    },
    // =========================================================================
    // WEEK 8: Shopify Functions & WebAssembly (Wasm) Backend Logic (dev-module-8)
    // =========================================================================
    {
        id: 'dev-m8-l1',
        moduleId: 'dev-module-8',
        slug: 'shopify-functions-architecture-wasm-replacing-ruby-scripts',
        title: 'Shopify Functions Architecture: High-Performance WebAssembly (<5ms SLA)',
        estimatedMinutes: 50,
        objectives: [
            'Understand Shopify Functions: Custom backend business logic compiled to WebAssembly (Wasm)',
            'Analyze why Shopify deprecated Ruby Scripts in favor of high-scale Wasm execution',
            'Understand the Function Execution Lifecycle: GraphQL Input Query -> Wasm Execution -> Output Result',
            'Set up the Rust / JavaScript Function toolchain and the Javy JavaScript-to-Wasm compiler',
        ],
        videoSource: {
            title: 'Shopify Functions 2023 - Overview and how to get started',
            embedUrl: 'https://www.youtube-nocookie.com/embed/gvl_qcTY6GQ',
            channel: 'Coding with Jan - Shopify Developer',
            duration: '16:06',
            description: 'Curated YouTube walkthrough from Coding with Jan - Shopify Developer that complements this lesson. Watch it alongside the written sections below.',
            topics: ['Shopify Functions', 'WebAssembly (Wasm)', 'Javy Compiler', 'GraphQL Input Queries'],
        },
        sections: [
            {
                heading: 'Shopify Functions: Custom Backend Business Logic in WebAssembly',
                body: `Shopify Functions represent the modern backend compute layer of the Shopify platform.
What is a Function?
A function is custom developer business logic that executes inside Shopify's core backend during order processing and checkout.
Key APIs Supported:
• Product Discounts & Order Discounts: Custom volume tiers, bundles, BOGO logic.
• Cart & Checkout Validation: Enforcing order minimums and purchasing restrictions.
• Delivery Customization: Renaming, re-ordering, or hiding shipping methods.
• Payment Customization: Hiding or re-ordering payment gateways (e.g. hiding Cash on Delivery).`,
                callout: {
                    type: 'shopify',
                    text: 'Shopify Functions execute with an astonishing sub-5 millisecond latency SLA and can process millions of operations during peak flash sales without breaking.',
                },
            },
            {
                heading: 'Why Shopify Deprecated Ruby Scripts in Favor of WebAssembly (Wasm)',
                body: `Prior to Functions, Shopify Plus stores used "Shopify Scripts," which ran an interpreted Ruby VM (\`checkout.liquid\` era).
Why Ruby Scripts Failed at Scale:
• Performance Bottlenecks: Interpreted Ruby execution added 50ms-200ms of checkout latency.
• Platform Limitations: Ruby scripts only worked on standard online web checkouts; they could not execute inside Shop Pay or mobile apps.
• The WebAssembly (Wasm) Solution:
  Functions compile to native WebAssembly bytecode. Wasm executes at near-native hardware speed with deterministic memory consumption and instant cold-start times.`,
                callout: {
                    type: 'warning',
                    text: 'Legacy Ruby Scripts were permanently deprecated in August 2025. All Shopify Plus backend logic must use Shopify Functions.',
                },
            },
            {
                heading: 'The Function Execution Lifecycle: Input Query -> Wasm -> Output Result',
                body: `Every Shopify Function follows an immutable 3-step execution pipeline:
1. GraphQL Input Query (\`run.graphql\`):
   You write a GraphQL query declaring the exact data your function needs (e.g. cart lines, customer tags, order total).
2. WebAssembly Execution (\`run.ts\` or \`run.rs\`):
   Shopify feeds the JSON result of your input query into your compiled Wasm binary. Your code executes in an isolated sandbox with zero network calls allowed.
3. Structured Output (\`run.json\`):
   Your code returns a structured instruction payload (e.g., "Apply 15% discount to Line Item #2"). Shopify’s core engine applies the instructions immediately.`,
                callout: {
                    type: 'tip',
                    text: 'Functions are pure, deterministic functions: given the exact same input query, they always produce the exact same output result.',
                },
            },
            {
                heading: 'Setting Up the Rust & JavaScript Toolchains with Javy Compiler',
                body: `Shopify Functions can be authored in Rust or TypeScript/JavaScript:
• The Rust Toolchain:
  Provides the smallest Wasm binaries (< 50KB) and highest raw computational speed. Requires \`cargo\` and \`wasm32-wasi\` target.
• The TypeScript Toolchain with Javy:
  Shopify created Javy (an embedded QuickJS WebAssembly compiler). You write standard TypeScript, and Javy compiles it into a lightweight, fully compliant Wasm binary!
Running Function Tests:
Use the \`shopify app function run\` CLI command to feed mock JSON inputs into your function and inspect stdout output locally.`,
                code: `# Scaffold a new Shopify Function via CLI
shopify app generate extension --template product-discount

# Navigate into function directory
cd extensions/volume-discount

# Build and compile TypeScript into WebAssembly via Javy
npm run build

# Test function locally using mock input JSON
shopify app function run < input.json`,
                language: 'bash',
            }
        ],
        mistakes: [
            'Trying to use Node.js specific libraries (fs, net, axios) inside a Shopify Function (Functions run in sandboxed Wasm, not Node.js).',
            'Forgetting to run `shopify app function build` to recompile the Wasm binary after modifying TypeScript code.',
        ],
        checklist: [
            'Installed the Shopify CLI function toolchain.',
            'Understood the GraphQL Input Query -> Wasm -> Output pipeline.',
            'Verified sub-5ms execution constraints.',
        ],
        furtherReading: [
            { title: 'Shopify Functions Overview', url: 'https://shopify.dev/docs/apps/functions' },
            { title: 'Functions API Reference', url: 'https://shopify.dev/docs/api/functions' },
        ],
    },
    {
        id: 'dev-m8-l2',
        moduleId: 'dev-module-8',
        slug: 'building-custom-discount-functions-volume-tiered-pricing',
        title: 'Building Custom Discount Functions: Volume Tiered & BOGO Pricing',
        estimatedMinutes: 55,
        objectives: [
            'Scaffold a Product Discount Function using `shopify app generate extension --template product-discount`',
            'Write business logic for volume-based tiered discounts (Buy 3 get 10%, Buy 5 get 20%)',
            'Compile and test Function logic using the Shopify Function Runner CLI',
            'Deploy the function and activate it in the Shopify Merchant Admin Discounter UI',
        ],
        videoSource: {
            title: 'Shopify Discounts: One Code, Different Amounts Per Collection - Shopify Functions',
            embedUrl: 'https://www.youtube-nocookie.com/embed/n7bOh2pXgP8',
            channel: 'Code Inspire',
            duration: '5:14',
            description: 'Curated YouTube walkthrough from Code Inspire that complements this lesson. Watch it alongside the written sections below.',
            topics: ['Discount Functions', 'Volume Discounts', 'Function Runner', 'TypeScript Wasm'],
        },
        sections: [
            {
                heading: 'Scaffolding a Product Discount Function via Shopify CLI',
                body: `Creating a custom discount function:
1. Run \`shopify app generate extension --template product-discount\`.
2. Inspect the generated directory structure:
   - \`src/run.graphql\`: Defines what cart data is requested from Shopify.
   - \`src/run.ts\`: Contains the business logic.
   - \`shopify.extension.toml\`: Extension configuration and metadata.
3. Configure the GraphQL Input: Declare which cart line fields are needed (quantity, variant ID, price).`,
                callout: {
                    type: 'shopify',
                    text: 'Functions can read Merchant Configuration stored in metafields, allowing store managers to configure discount percentages directly in the Admin UI.',
                },
            },
            {
                heading: 'Writing Business Logic for Volume-Based Tiered Discounts',
                body: `Volume tier requirements:
• Buy 3+ items: Get 10% off.
• Buy 5+ items: Get 20% off.
The Function evaluates the total eligible quantity across all cart line items and builds a target discount array.`,
                code: `// Production Shopify Function: Volume Tiered Discount Logic (TypeScript)
export function run(input) {
  const totalQuantity = input.cart.lines.reduce((sum, line) => sum + line.quantity, 0);

  let discountPercentage = 0;
  if (totalQuantity >= 5) {
    discountPercentage = 20.0;
  } else if (totalQuantity >= 3) {
    discountPercentage = 10.0;
  }

  if (discountPercentage === 0) {
    return { discountApplicationStrategy: 'FIRST', discounts: [] };
  }

  const targets = input.cart.lines.map(line => ({
    cartLine: { id: line.id }
  }));

  return {
    discountApplicationStrategy: 'FIRST',
    discounts: [
      {
        targets,
        value: {
          percentage: { value: discountPercentage }
        },
        message: \`Volume Savings: \${discountPercentage}% Off (\${totalQuantity} items)\`
      }
    ]
  };
}`,
                language: 'javascript',
            },
            {
                heading: 'Testing Function Logic Using Function Runner CLI',
                body: `Never deploy a function without unit testing edge cases:
• Test Single Items: Verify 1 item receives 0% discount.
• Test Exact Thresholds: Verify 3 items receive 10%, 4 items receive 10%, 5 items receive 20%.
• Test Zero Quantity & Empty Carts: Ensure empty arrays return clean empty discount structures without crashing the Wasm runtime.
• Inspect Execution Logs: Use \`shopify app function run\` to test raw JSON inputs and verify return structures against Shopify's GraphQL schema specifications.`,
                callout: {
                    type: 'tip',
                    text: 'Automate your function testing with Jest or Vitest to run regression test suites before every Git commit.',
                },
            },
            {
                heading: 'Deploying and Activating Functions in Shopify Merchant Admin UI',
                body: `Deploying to Production:
1. Run \`shopify app deploy\` to push your compiled Wasm binary to Shopify's global edge infrastructure.
2. Register the Discount in Admin:
   Navigate to Shopify Admin -> Discounts -> "Create discount".
   Your custom app discount appears natively in the list of available discount types!
3. Merchant Experience:
   Merchants can configure active dates, customer eligibility rules, and combineability settings natively in the Shopify UI, powered entirely by your custom Wasm backend!`,
                callout: {
                    type: 'shopify',
                    text: 'Shopify Functions integrate directly into the native Admin Discounts UI, giving merchants a familiar interface while running your custom code.',
                },
            }
        ],
        mistakes: [
            'Returning empty objects instead of the exact typed schema for `FunctionRunResult`.',
            'Not handling multiple discount targets when orders qualify for multiple rules.',
        ],
        checklist: [
            'Built a functioning Product Discount Function.',
            'Verified logic with local mock input using `shopify app function test`.',
            'Confirmed the discount banner renders in the checkout summary.',
        ],
        furtherReading: [
            { title: 'Product Discount Functions API', url: 'https://shopify.dev/docs/api/functions/reference/product-discounts' },
        ],
    },
    {
        id: 'dev-m8-l3',
        moduleId: 'dev-module-8',
        slug: 'cart-delivery-customization-and-validation-functions',
        title: 'Cart & Delivery Customizations, Payment Filtering & Validation Functions',
        estimatedMinutes: 50,
        objectives: [
            'Build Payment Customization Functions to hide Cash on Delivery (COD) for high-risk orders or specific cart values',
            'Build Delivery Customization Functions to rename, re-order, or hide shipping methods based on customer postal codes',
            'Build Cart Validation Functions to enforce maximum order limits or require minimum quantities for B2B orders',
            'Halt checkout progression with native, localized validation error messages displayed to customers',
        ],
        videoSource: {
            title: 'Shopify Functions API: Shopify Payment Customization API Extension',
            embedUrl: 'https://www.youtube-nocookie.com/embed/Wud2U3V8p1Q',
            channel: 'Ilias Haddad - Software Developer',
            duration: '26:16',
            description: 'Curated YouTube walkthrough from Ilias Haddad - Software Developer that complements this lesson. Watch it alongside the written sections below.',
            topics: ['Payment Customization', 'Delivery Customization', 'Cart Validation', 'Checkout Rules'],
        },
        sections: [
            {
                heading: 'Payment Customization Functions: Hiding High-Risk Gateways',
                body: `Cash on Delivery (COD) and Buy Now Pay Later (BNPL) options carry significant fraud and return risks.
Payment Customization Capabilities:
• Hide Payment Method: Hide Cash on Delivery if the order total exceeds $200 or if the customer has a history of high return rates.
• Re-Order Payment Methods: Move accelerated wallets (Shop Pay) to the top position for mobile users.
• Rename Methods: Dynamically rename a gateway (e.g. "Bank Transfer - 5% Surcharge").`,
                code: `// Production Payment Customization Function: Hide COD for Large Orders
export function run(input) {
  const cartTotal = parseFloat(input.cart.cost.totalAmount.amount);
  const HIDE_THRESHOLD = 200.0;

  if (cartTotal <= HIDE_THRESHOLD) {
    return { operations: [] }; // No mutations needed
  }

  const codPaymentMethod = input.paymentMethods.find(method => 
    method.name.toLowerCase().includes('cash on delivery')
  );

  if (!codPaymentMethod) {
    return { operations: [] };
  }

  return {
    operations: [
      {
        hide: {
          paymentMethodId: codPaymentMethod.id
        }
      }
    ]
  };
}`,
                language: 'javascript',
            },
            {
                heading: 'Delivery Customization Functions: Postal Code & Weight Routing',
                body: `Customizing shipping methods in checkout:
• Postal Code Filtering: Hide "Next Day Delivery" for remote island or military (APO/FPO) postal codes.
• Cart Weight Thresholds: If total cart weight exceeds 30kg, rename "Standard Courier" to "Freight Delivery" and hide express tiers.
• Re-Ordering Methods: Automatically pre-select the merchant’s preferred carbon-neutral shipping method.`,
                callout: {
                    type: 'tip',
                    text: 'Delivery customization functions replace expensive third-party shipping rate calculator apps with native, sub-5ms Wasm evaluation.',
                },
            },
            {
                heading: 'Cart Validation Functions: Enforcing Order Caps & B2B Rules',
                body: `Validating orders before payment processing begins:
• Maximum Quantity Limits: Prevent resellers from clearing limited-edition sneaker inventory by capping orders at 2 pairs per customer.
• B2B Minimum Spend Requirements: Halt checkout if a wholesale customer attempts to checkout with under $500 in goods.
• Package Weight Restrictions: Restrict hazardous material products from shipping via air parcel tiers.`,
                callout: {
                    type: 'warning',
                    text: 'Cart Validation Functions run inside checkout. If a validation error is returned, Shopify blocks the customer from completing the order.',
                },
            },
            {
                heading: 'Halting Checkout Progression with Native Localized Error Messages',
                body: `When a validation condition fails, return clear, helpful feedback:
• Error Structure:
\`\`\`json
{
  "errors": [
    {
      "localizedMessage": "Wholesale orders require a minimum order value of $500.00.",
      "target": "cart"
    }
  ]
}
\`\`\`
• Customer Experience: Shopify renders a native, accessible error banner at the top of checkout, clearly communicating the requirement without confusing technical jargon.`,
                callout: {
                    type: 'shopify',
                    text: 'Cart validation errors appear natively in Shopify’s checkout interface and support multi-language translations.',
                },
            }
        ],
        mistakes: [
            'Hardcoding payment method IDs instead of inspecting method names or types dynamically in the input query.',
            'Blocking checkout with Cart Validation without clear error messaging instructing the customer how to resolve the issue.',
        ],
        checklist: [
            'Created a Payment Customization Function hiding specific gateways.',
            'Created a Delivery Customization Function sorting express rates first.',
            'Tested Cart Validation displaying custom error alerts on checkout.',
        ],
        furtherReading: [
            { title: 'Payment Customization Functions Reference', url: 'https://shopify.dev/docs/api/functions/reference/payment-customization' },
            { title: 'Delivery Customization Functions Reference', url: 'https://shopify.dev/docs/api/functions/reference/delivery-customization' },
        ],
    },
    // =========================================================================
    // WEEK 9: Full-Stack Shopify App Development, Remix & App Bridge (dev-module-9)
    // =========================================================================
    {
        id: 'dev-m9-l1',
        moduleId: 'dev-module-9',
        slug: 'shopify-app-architecture-oauth-embedded-vs-standalone',
        title: 'Shopify App Architecture: OAuth 2.0, Session Storage & Token Lifecycles',
        estimatedMinutes: 50,
        objectives: [
            'Distinguish Public Apps, Custom Apps, and Extension-Only Apps in modern Shopify',
            'Master the OAuth 2.0 Handshake: Authorization Code grant, nonce state validation, and access token exchange',
            'Understand Online vs. Offline Access Tokens and their respective session persistence rules',
            'Configure Session Storage backends using PostgreSQL, MySQL, and Prisma ORM',
        ],
        videoSource: {
            title: 'How to Get a Shopify Access Token (OAuth) – Step-by-Step Guide',
            embedUrl: 'https://www.youtube-nocookie.com/embed/CRWNIlWj9jQ',
            channel: 'Shopify Experts - On The Road Agency',
            duration: '8:22',
            description: 'Curated YouTube walkthrough from Shopify Experts - On The Road Agency that complements this lesson. Watch it alongside the written sections below.',
            topics: ['Shopify App Architecture', 'OAuth 2.0', 'Access Tokens', 'Prisma ORM'],
        },
        sections: [
            {
                heading: 'App Taxonomy: Public Apps, Custom Apps & Extension-Only Apps',
                body: `Shopify app development encompasses three primary distribution models:
1. Public Apps: Listed in the Shopify App Store or distributed unlisted. Installed across thousands of diverse stores; requires OAuth authentication, multi-tenant database partitioning, and strict App Store security auditing.
2. Custom Apps: Engineered specifically for a single merchant store. Installed directly via merchant admin or Partner Dashboard with pre-configured access scopes.
3. Extension-Only Apps: Modern apps that do not maintain an external web server or database. Composed entirely of Checkout UI Extensions, Shopify Functions, and Web Pixels hosted directly on Shopify CDN infrastructure.`,
                callout: {
                    type: 'shopify',
                    text: 'Extension-Only apps have zero server maintenance overhead and scale infinitely with zero hosting infrastructure costs.',
                },
            },
            {
                heading: 'The OAuth 2.0 Handshake: Grant Flow, Nonces, and Code Exchange',
                body: `When a merchant installs an embedded app:
1. Install Initiation: The merchant clicks "Install" in Admin or visits \`https://your-app.com/auth?shop=client-store.myshopify.com\`.
2. Authorization Request: The app redirects the browser to Shopify:
   \`https://client-store.myshopify.com/admin/oauth/authorize?client_id={API_KEY}&scope=read_products,write_orders&redirect_uri={CALLBACK_URL}&state={CRYPTOGRAPHIC_NONCE}\`
3. Nonce State Validation: When Shopify redirects back to your callback URL with an authorization \`code\` and \`state\`, your server MUST verify that \`state\` matches the session nonce to prevent CSRF attacks.
4. Token Exchange: Your backend performs an authenticated POST to \`/admin/oauth/access_token\` trading the temporary code for a permanent access token.`,
                callout: {
                    type: 'warning',
                    text: 'Never accept an OAuth callback if the returned state does not match your stored nonce. Skipping nonce verification leaves your app vulnerable to CSRF session hijacking.',
                },
            },
            {
                heading: 'Online vs. Offline Access Tokens & Session Lifecycles',
                body: `Shopify supports two access token types with distinct security models:
• Offline Access Tokens:
  - Permanent access token tied to the store itself.
  - Never expires (until the app is uninstalled).
  - Used for background worker jobs, incoming webhooks, and asynchronous cron synchronization tasks.
• Online Access Tokens:
  - Ephemeral token tied to a specific logged-in merchant staff member.
  - Expires when the user’s admin session terminates.
  - Inherits the individual staff member’s permission constraints (e.g. if the staff user lacks permission to view orders, the online token cannot query orders).`,
                callout: {
                    type: 'tip',
                    text: 'Embedded admin apps typically acquire an offline token during initial install for background webhooks, and issue online tokens during active merchant dashboard browsing.',
                },
            },
            {
                heading: 'Configuring Session Storage: PostgreSQL, MySQL, and Prisma ORM',
                body: `In production, apps cannot store OAuth access tokens in volatile memory. A restart would force every merchant to re-authenticate.
Modern Session Storage with Prisma ORM:
• The \`@shopify/shopify-app-session-storage-prisma\` adapter serializes session objects (shop domain, access token, scopes, user profile) into a relational database.
• Supported Engines: PostgreSQL (recommended for production on Supabase, AWS RDS, or Neon), MySQL, or SQLite (development only).`,
                code: `// Prisma Schema for Shopify App Session Storage (schema.prisma)
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Session {
  id          String    @id
  shop        String
  state       String
  isOnline    Boolean   @default(false)
  scope       String?
  expires     DateTime?
  accessToken String
  userId      BigInt?
  firstName   String?
  lastName    String?
  email       String?
  accountOwner Boolean  @default(false)
  locale      String?
  collaborator Boolean? @default(false)
  emailVerified Boolean? @default(false)
}`,
                language: 'javascript',
            }
        ],
        mistakes: [
            'Relying on standard session cookies in an embedded iframe, causing authentication loops in Safari and iOS devices.',
            'Using online access tokens for background webhook processing (webhooks will fail when staff members are logged out).',
        ],
        checklist: [
            'Understood the OAuth 2.0 authorization code flow.',
            'Configured Prisma session storage with SQLite/PostgreSQL.',
            'Verified the distinction between offline and online tokens.',
        ],
        furtherReading: [
            { title: 'Shopify App Authentication Overview', url: 'https://shopify.dev/docs/apps/auth' },
            { title: 'Session Tokens Guide', url: 'https://shopify.dev/docs/apps/auth/oauth/session-tokens' },
        ],
    },
    {
        id: 'dev-m9-l2',
        moduleId: 'dev-module-9',
        slug: 'shopify-app-template-remix-node-and-prisma',
        title: 'The Official Shopify App Template: Remix, Node.js & Prisma ORM',
        estimatedMinutes: 55,
        objectives: [
            'Initialize a production app with `shopify app init --template remix`',
            'Deconstruct the Remix architecture: Loaders (SSR data fetching), Actions (POST/PUT mutations), and Routes',
            'Use `@shopify/shopify-app-remix` to authenticate incoming requests seamlessly',
            'Query the Admin GraphQL API directly inside Remix Loaders with automatic token injection',
        ],
        videoSource: {
            title: 'Shopify Remix QR Code App Tutorial Walkthrough',
            embedUrl: 'https://www.youtube-nocookie.com/embed/tF57le1t-60',
            channel: 'Dev With Alex',
            duration: '30:01',
            description: 'Curated YouTube walkthrough from Dev With Alex that complements this lesson. Watch it alongside the written sections below.',
            topics: ['Remix Framework', 'Shopify App Template', 'Prisma Schema', 'Remix Loaders & Actions'],
        },
        sections: [
            {
                heading: 'Initializing Production Apps with shopify app init --template remix',
                body: `Shopify’s official framework for embedded apps is Remix (built on Node.js and React).
Scaffolding Command:
\`shopify app init my-merchant-app --template remix\`
The Resulting Architecture:
• Modern Single Page App: Fast server-side rendering (SSR) paired with client-side hydration.
• Built-In App Bridge 4.0: Pre-configured out of the box.
• Native Authentication Helpers: \`@shopify/shopify-app-remix\` manages token exchange and session validation behind the scenes.`,
                callout: {
                    type: 'shopify',
                    text: 'The official Remix template is maintained by Shopify engineers and receives immediate updates whenever new platform APIs and security standards are released.',
                },
            },
            {
                heading: 'Deconstructing Remix Architecture: Loaders, Actions, and Routes',
                body: `Remix follows a clean, decoupled data-loading architecture:
1. \`loader\` (HTTP GET / SSR Data): Runs exclusively on the backend server before rendering HTML. Queries the Shopify Admin GraphQL API and returns JSON props to the React component.
2. \`action\` (HTTP POST/PUT/DELETE): Runs on the backend server when a merchant submits a \`<Form>\`. Handles database mutations, GraphQL admin mutations, and billing requests.
3. Component (React Presentation): Pure UI component rendering Polaris design primitives populated with data from \`useLoaderData()\`.`,
                callout: {
                    type: 'tip',
                    text: 'Remix eliminates client-side `useEffect` data fetching waterfalls. All data is fetched on the server before the HTML stream arrives in the browser.',
                },
            },
            {
                heading: 'Authenticating Incoming Requests with @shopify/shopify-app-remix',
                body: `Every route in your app must verify that incoming requests originate from a legitimate, authenticated merchant:
• \`authenticate.admin(request)\`:
  Validates incoming App Bridge session tokens.
  If the session is expired or invalid, it automatically handles token refreshes or issues an OAuth redirect.
  Returns an authenticated \`admin.graphql\` client ready to query store data!`,
                code: `// Remix Route Example: app/routes/app._index.tsx
import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Page, Layout, Card, Text } from '@shopify/polaris';
import { authenticate } from '../shopify.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin, session } = await authenticate.admin(request);

  // Authenticated GraphQL query executed directly on server
  const response = await admin.graphql(\`
    #graphql
    query GetShopDetails {
      shop {
        name
        email
        myshopifyDomain
      }
    }
  \`);

  const responseJson = await response.json();
  return json({ shop: responseJson.data.shop });
};

export default function Index() {
  const { shop } = useLoaderData<typeof loader>();

  return (
    <Page title="Dashboard">
      <Layout>
        <Layout.Section>
          <Card>
            <Text as="h2" variant="headingMd">Welcome back to {shop.name}</Text>
            <Text as="p" tone="subdued">Connected domain: {shop.myshopifyDomain}</Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}`,
                language: 'javascript',
            },
            {
                heading: 'Direct Admin GraphQL Query Execution with Auto Token Injection',
                body: `In the Remix template, you never manage raw authorization headers or bearer tokens manually:
• Automatic Injection: The \`admin.graphql\` client automatically attaches the active store’s access token to the HTTP header.
• Type Safety: Tag your queries with \`#graphql\` comments to unlock syntax highlighting, schema autocomplete, and automated TypeScript type generation using GraphQL Code Generator.`,
                callout: {
                    type: 'shopify',
                    text: 'Using `admin.graphql` prevents token leakage because queries execute server-side in Node.js, never exposing API keys to the browser.',
                },
            }
        ],
        mistakes: [
            'Calling Shopify Admin APIs on the client side instead of inside Remix loaders and actions.',
            'Forgetting to call `await authenticate.admin(request)` in every protected route loader.',
        ],
        checklist: [
            'Initialized a new app with `shopify app init`.',
            'Created a Remix loader executing a GraphQL query against the shop.',
            'Rendered data using Polaris layout components.',
            'Ran the app locally with `shopify app dev`.',
        ],
        furtherReading: [
            { title: 'Shopify App Remix Documentation', url: 'https://shopify.dev/docs/api/shopify-app-remix' },
        ],
    },
    {
        id: 'dev-m9-l3',
        moduleId: 'dev-module-9',
        slug: 'shopify-app-bridge-4-modals-toasts-resource-pickers',
        title: 'Shopify App Bridge 4.0: Modals, Toasts, TitleBar & Resource Pickers',
        estimatedMinutes: 45,
        objectives: [
            'Understand App Bridge 4.0: Web Component & declarative HTML integration with zero npm bundle bloat',
            'Implement native `<ui-title-bar>`, `<ui-modal>`, and Toast notifications inside Shopify Admin',
            'Trigger native Shopify Product and Collection Resource Pickers with multi-select and filtering',
            'Synchronize client-side navigation seamlessly with the outer Shopify Admin window',
        ],
        videoSource: {
            title: 'Getting Started with Shopify App Bridge - Create a Shopify App',
            embedUrl: 'https://www.youtube-nocookie.com/embed/TlmKRYltqFU',
            channel: 'WeeklyHow',
            duration: '35:17',
            description: 'Curated YouTube walkthrough from WeeklyHow that complements this lesson. Watch it alongside the written sections below.',
            topics: ['App Bridge 4.0', 'Resource Picker', 'ui-title-bar', 'Native Modals'],
        },
        sections: [
            {
                heading: 'App Bridge 4.0: Declarative Web Components with Zero Bundle Bloat',
                body: `Legacy App Bridge 2.x and 3.x required shipping heavy JavaScript packages (\`@shopify/app-bridge\`) to coordinate iframes with the parent Shopify Admin window.
App Bridge 4.0 Revolution:
• Native Web Components: Shopify introduced custom HTML elements (\`<ui-title-bar>\`, \`<ui-modal>\`, \`<ui-nav-menu>\`).
• Script Tag Delivery: Loaded via a single lightweight script tag from Shopify’s CDN (\`https://cdn.shopify.com/shopifycloud/app-bridge.js\`).
• Zero Bundle Bloat: Reduces your app's frontend bundle weight by over 50KB while delivering instant, native UI synchronization.`,
                callout: {
                    type: 'shopify',
                    text: 'App Bridge 4.0 components execute seamlessly inside the Shopify Admin shell, providing identical responsiveness to native admin pages.',
                },
            },
            {
                heading: 'Implementing Native Title Bars, Modals, and Toast Alerts',
                body: `Composing native admin chrome elements using App Bridge 4.0:
• Title Bar: Controls the breadcrumbs, main heading, and primary action buttons in the admin header:
\`\`\`html
<ui-title-bar title="Inventory Optimizer">
  <button variant="primary" onclick="saveSettings()">Save Changes</button>
</ui-title-bar>
\`\`\`
• Toast Notifications: Dispatches native floating success alerts:
\`\`\`javascript
shopify.toast.show('Settings saved successfully', { duration: 3000 });
\`\`\`
• Modals: Native, accessible confirmation dialogs (\`<ui-modal id="confirm-modal">\`).`,
                callout: {
                    type: 'tip',
                    text: 'Using `<ui-title-bar>` automatically positions primary action buttons in the top-right corner of the merchant’s screen, adhering to official Shopify UX standards.',
                },
            },
            {
                heading: 'Triggering Native Resource Pickers for Products and Collections',
                body: `When an app requires a merchant to select products (for discounts, badges, or bundles), never build a custom catalog search interface from scratch!
Native Resource Picker:
• Trigger via App Bridge API:
\`\`\`javascript
const selected = await shopify.resourcePicker({
  type: 'product',
  multiple: true,
  action: 'select'
});
\`\`\`
• Merchant Experience: Opens the native Shopify product selection modal complete with search, collection filters, and variant checkboxes!
• Security & Efficiency: The picker runs on Shopify infrastructure with zero API cost to your app.`,
                code: `// Triggering App Bridge 4.0 Native Product Resource Picker
async function openProductSelector() {
  try {
    const selectedProducts = await shopify.resourcePicker({
      type: 'product',
      multiple: true,
      filter: {
        variants: false, // Select products at the parent level
        draft: false     // Exclude draft products
      }
    });

    if (selectedProducts && selectedProducts.length > 0) {
      console.log('Selected products:', selectedProducts);
      shopify.toast.show(\`Selected \${selectedProducts.length} products\`);
    }
  } catch (error) {
    console.error('Resource picker closed or cancelled:', error);
  }
}`,
                language: 'javascript',
            },
            {
                heading: 'Synchronizing Client-Side Routing with the Outer Admin Window',
                body: `Because embedded apps run inside an HTML iframe, browser URL navigation can get out of sync with the top-level address bar:
• App Bridge Automatic Navigation Sync: App Bridge 4.0 automatically synchronizes internal React/Remix route changes with the outer browser URL bar (\`https://admin.shopify.com/store/{shop}/apps/{app-handle}/settings\`).
• Preserving Deep Links: Merchants can copy the browser URL and send it to a team member, who opens directly to that exact subpage in your app.`,
                callout: {
                    type: 'warning',
                    text: 'Always use relative links (`<Link to="/app/settings">`) rather than absolute URLs to allow App Bridge to coordinate iframe route changes seamlessly.',
                },
            }
        ],
        mistakes: [
            'Importing legacy App Bridge 2.x actions into modern App Bridge 4.0 apps.',
            'Building custom product picker modals from scratch instead of using the native `shopify.resourcePicker`.',
        ],
        checklist: [
            'Integrated `<ui-title-bar>` into an embedded app view.',
            'Successfully displayed a native Shopify Toast notification.',
            'Opened the native Product Resource Picker and retrieved selected items.',
        ],
        furtherReading: [
            { title: 'Shopify App Bridge 4.0 Reference', url: 'https://shopify.dev/docs/api/app-bridge-library' },
        ],
    },
    // =========================================================================
    // WEEK 10: GraphQL Admin API Mastery & Rate Limiting (dev-module-10)
    // =========================================================================
    {
        id: 'dev-m10-l1',
        moduleId: 'dev-module-10',
        slug: 'graphql-admin-api-architecture-queries-mutations',
        title: 'GraphQL Admin API Architecture: Why REST is Deprecated, Schema & Mutations',
        estimatedMinutes: 50,
        objectives: [
            'Understand why Shopify deprecated the REST Admin API in favor of GraphQL for all modern capabilities',
            'Master the GraphQL schema anatomy: Queries, Mutations, Inputs, Payloads, and UserErrors',
            'Execute complex multi-field mutations (e.g. `productCreate`, `productVariantsBulkUpdate`)',
            'Handle nested error responses and differentiate userErrors from network/auth errors',
        ],
        videoSource: {
            title: 'Shopify GraphiQL Admin API Explained',
            embedUrl: 'https://www.youtube-nocookie.com/embed/0wWqdyqEBcE',
            channel: 'Fayyaz Ahmed | Shopify Developer',
            duration: '8:23',
            description: 'Curated YouTube walkthrough from Fayyaz Ahmed | Shopify Developer that complements this lesson. Watch it alongside the written sections below.',
            topics: ['GraphQL Admin API', 'Mutations', 'Schema Exploration', 'UserErrors'],
        },
        sections: [
            {
                heading: 'Why Shopify Deprecated REST Admin API in Favor of GraphQL',
                body: `In 2024, Shopify announced the formal deprecation of the REST Admin API for all new features.
Why GraphQL is Superior for Ecommerce:
• Eliminates Over-Fetching: In REST, querying \`/admin/api/products.json\` returned hundreds of kilobytes of unneeded metadata. In GraphQL, you declare the exact fields required (\`id\`, \`title\`, \`price\`), reducing network payloads by 85%.
• Eliminates Under-Fetching & N+1 Problems: Fetching a product, its variants, its metafields, and inventory levels required 4 sequential REST calls. In GraphQL, everything resolves in a single nested query!
• Exclusive Features: Metaobjects, Checkout Branding, B2B Companies, and Shopify Functions are 100% exclusive to the GraphQL Admin API.`,
                callout: {
                    type: 'warning',
                    text: 'Legacy REST endpoints are frozen and receive no performance upgrades or new capabilities. All modern Shopify apps must be built on GraphQL.',
                },
            },
            {
                heading: 'GraphQL Schema Anatomy: Queries, Mutations, Inputs, and UserErrors',
                body: `Understanding the structural building blocks of Shopify's GraphQL schema:
• Queries: Read-only data retrieval operations (\`query { products(first: 10) { ... } }\`).
• Mutations: Data modification operations (create, update, delete).
• Input Objects: Strictly typed input payloads passed as variables (\`$input: ProductInput!\`).
• Payload Objects: Return payloads containing the mutated resource and a critical \`userErrors\` array.`,
                callout: {
                    type: 'shopify',
                    text: 'Unlike REST (which uses HTTP status codes like 400 for validation errors), GraphQL mutations return HTTP 200 OK with business logic errors populated inside the `userErrors` array.',
                },
            },
            {
                heading: 'Executing Complex Mutations: productCreate & productVariantsBulkUpdate',
                body: `Creating a complete product with variants and metafields in a single atomic transaction:
• The \`productCreate\` Mutation: Creates the parent product record.
• The \`productVariantsBulkUpdate\` Mutation: Updates pricing, SKUs, and inventory policies across multiple variants in a single call, preventing rate-limit throttling.`,
                code: `# Production GraphQL Mutation: Atomic Product Creation with Metafields
mutation CreateProductWithSpecs($input: ProductInput!) {
  productCreate(input: $input) {
    product {
      id
      title
      handle
      metafields(first: 2) {
        nodes {
          key
          value
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}

# Example Variables:
# {
#   "input": {
#     "title": "Minimalist Merino Hoodie",
#     "productType": "Apparel",
#     "vendor": "Nordic Crafted",
#     "metafields": [
#       {
#         "namespace": "specifications",
#         "key": "fabric",
#         "value": "100% Merino Wool",
#         "type": "single_line_text_field"
#       }
#     ]
#   }
# }`,
                language: 'json',
            },
            {
                heading: 'Handling Nested Errors: userErrors vs. Network & Auth Exceptions',
                body: `Robust error handling protocol in Shopify app development:
1. HTTP 401 / 403: Authentication failure (expired token or insufficient OAuth scope). Redirect to re-authorization.
2. HTTP 429: Rate limit exceeded (Leaky Bucket saturated). Pause and retry.
3. GraphQL Top-Level Errors (\`errors\` array): Syntax error in GraphQL string or unknown field requested.
4. Domain Validation Errors (\`userErrors\` array): Business rule violations (e.g., "Title cannot be blank", "SKU must be unique"). Always inspect and render \`userErrors\` to the user!`,
                callout: {
                    type: 'tip',
                    text: 'Always check `if (data.productCreate.userErrors.length > 0)` before assuming a mutation succeeded!',
                },
            }
        ],
        mistakes: [
            'Checking only HTTP status code 200 without inspecting the returned `userErrors` array (GraphQL returns 200 even when a mutation fails validation).',
            'Using deprecated REST Admin API endpoints in newly created Shopify apps.',
        ],
        checklist: [
            'Executed a GraphQL query in the Shopify GraphiQL App.',
            'Created a product and variant using the `productCreate` mutation.',
            'Validated and handled the `userErrors` response array.',
        ],
        furtherReading: [
            { title: 'Shopify GraphQL Admin API Reference', url: 'https://shopify.dev/docs/api/admin-graphql' },
        ],
    },
    {
        id: 'dev-m10-l2',
        moduleId: 'dev-module-10',
        slug: 'cursor-based-pagination-and-bulk-operations-api',
        title: 'Cursor-Based Pagination, Connections & The Bulk Operations API',
        estimatedMinutes: 55,
        objectives: [
            'Master GraphQL Relay connection specification: `edges`, `node`, and `pageInfo` (`hasNextPage`, `endCursor`)',
            'Implement forward (`after`) and backward (`before`) cursor pagination across large catalogs',
            'Understand the Bulk Operations API for exporting or importing 100,000+ products without hitting rate limits',
            'Poll and download JSONL (JSON Lines) export files asynchronously from Google Cloud Storage',
        ],
        videoSource: {
            title: 'How to work with Pagination in GraphQL - Part 4 of 5',
            embedUrl: 'https://www.youtube-nocookie.com/embed/S37WsC8GzSA',
            channel: 'ShopifyDevs',
            duration: '7:45',
            description: 'Official ShopifyDevs masterclass on GraphQL Relay connections, the pageInfo property, endCursor, and relative cursor-based pagination.',
            topics: ['Cursor Pagination', 'GraphQL Connections', 'pageInfo', 'ShopifyDevs'],
        },
        sections: [
            {
                heading: 'Relay Connection Specification: Edges, Nodes, and PageInfo',
                body: `Shopify's GraphQL API adheres strictly to the GraphQL Cursor Connection Specification (Relay standard) for all collection lists:
Key Terms:
• \`edges\`: An array of wrapper objects representing relationships.
• \`node\`: The actual data record (e.g. \`Product\`, \`Order\`, \`Customer\`).
• \`cursor\`: An opaque string acting as a permanent bookmark for that specific item in the database.
• \`pageInfo\`: Metadata object containing \`hasNextPage\`, \`hasPreviousPage\`, \`startCursor\`, and \`endCursor\`.`,
                callout: {
                    type: 'tip',
                    text: 'Never use offset pagination (page 1, page 2). Cursors guarantee that if new products are added while you paginate, records are never skipped or duplicated.',
                },
            },
            {
                heading: 'Forward and Backward Cursor Pagination Across Large Catalogs',
                body: `How to navigate catalogs of 50,000+ items:
• Forward Pagination:
  Pass \`first: 50\` and \`after: endCursor\`. Continue querying while \`pageInfo.hasNextPage === true\`.
• Backward Pagination:
  Pass \`last: 50\` and \`before: startCursor\` to navigate in reverse.`,
                code: `# GraphQL Forward Cursor Pagination Query
query PaginateProducts($cursor: String) {
  products(first: 50, after: $cursor) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      cursor
      node {
        id
        title
        totalInventory
      }
    }
  }
}`,
                language: 'json',
            },
            {
                heading: 'The Bulk Operations API: Exporting 100,000+ Records Rate-Limit Free',
                body: `When an app needs to export an entire store catalog (e.g. 100,000 products with 500,000 variants for an ERP sync), standard pagination would require 2,000 API calls and take hours.
The Bulk Operations Solution:
• Asynchronous Query Execution: You submit a single GraphQL query wrapped inside \`bulkOperationRunQuery\`.
• Server-Side Processing: Shopify executes the query in the background at massive internal database speed with ZERO rate limits!
• Output: Generates a compressed JSONL (JSON Lines) file stored in Google Cloud Storage.`,
                callout: {
                    type: 'shopify',
                    text: 'Bulk Operations can export a 100,000-product catalog in under 60 seconds without consuming a single point from your API rate-limit bucket.',
                },
            },
            {
                heading: 'Polling and Streaming JSONL Export Files from Cloud Storage',
                body: `Retrieval Workflow:
1. Trigger: Submit \`mutation { bulkOperationRunQuery(...) }\`.
2. Polling: Periodically query \`query { currentBulkOperation { status url errorCode } }\` until status is \`COMPLETED\`.
3. Download & Stream: Fetch the file from the pre-signed GCP \`url\`.
4. Parse Line by Line: Because the file is in JSONL format (one JSON object per line), use Node.js streams to process gigabytes of data with minimal RAM consumption!`,
                code: `// Streaming JSON Lines (JSONL) Parser in Node.js
import readline from 'readline';
import https from 'https';

function streamBulkOperationResults(downloadUrl: string) {
  https.get(downloadUrl, (response) => {
    const rl = readline.createInterface({
      input: response,
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      const record = JSON.parse(line);
      if (record.__parentId) {
        // Child entity (e.g. ProductVariant referencing parent Product)
        console.log(\`Processing Variant: \${record.id} for Parent: \${record.__parentId}\`);
      } else {
        // Parent entity (e.g. Product)
        console.log(\`Processing Product: \${record.title}\`);
      }
    });

    rl.on('close', () => {
      console.log('Finished streaming all bulk operation records.');
    });
  });
}`,
                language: 'javascript',
            }
        ],
        mistakes: [
            'Attempting to paginate through tens of thousands of items synchronously instead of using the Bulk Operations API.',
            'Parsing large JSONL export files entirely into memory at once instead of streaming line-by-line.',
        ],
        checklist: [
            'Implemented forward cursor pagination using `pageInfo.endCursor`.',
            'Initiated an asynchronous Bulk Operation query.',
            'Handled the `BULK_OPERATIONS_FINISH` webhook notification.',
        ],
        furtherReading: [
            { title: 'Shopify Bulk Operations API Guide', url: 'https://shopify.dev/docs/api/usage/bulk-operations/queries' },
        ],
    },
    {
        id: 'dev-m10-l3',
        moduleId: 'dev-module-10',
        slug: 'leaky-bucket-rate-limiting-and-query-cost-calculation',
        title: 'Leaky Bucket Rate Limiting, Query Cost Calculation & Retries',
        estimatedMinutes: 45,
        objectives: [
            'Understand the GraphQL Leaky Bucket algorithm: 1,000 point bucket capacity and 50 points/second restore rate',
            'Analyze query cost calculation based on requested fields and connection multipliers (`first: N`)',
            'Inspect `extensions.cost` in responses: `requestedQueryCost`, `actualQueryCost`, and `throttleStatus`',
            'Implement exponential backoff and jitter retry handlers for HTTP 429 Too Many Requests',
        ],
        videoSource: {
            title: 'How to Use the Shopify API and Make GraphQL Requests',
            embedUrl: 'https://www.youtube-nocookie.com/embed/Q68EXTH08vI',
            channel: 'Coding with Jan - Shopify Developer',
            duration: '17:27',
            description: 'Curated YouTube walkthrough from Coding with Jan - Shopify Developer that complements this lesson. Watch it alongside the written sections below.',
            topics: ['Rate Limits', 'Leaky Bucket Algorithm', 'Query Cost', 'Exponential Backoff'],
        },
        sections: [
            {
                heading: 'The Leaky Bucket Algorithm: 1,000 Point Capacity & 50 Points/Sec Restore',
                body: `Shopify governs API traffic using a Leaky Bucket rate-limiting algorithm:
The Mechanics:
• The Bucket Capacity: The bucket can hold up to 1,000 cost points (2,000 for Shopify Plus stores).
• Leak (Restore) Rate: The bucket restores points at a constant rate of 50 points per second (100 pts/sec on Plus).
• If a query cost exceeds available capacity, Shopify returns HTTP 429 Too Many Requests.`,
                callout: {
                    type: 'shopify',
                    text: 'Shopify Plus stores receive double the rate-limit capacity and double the leak rate, enabling high-frequency enterprise integrations.',
                },
            },
            {
                heading: 'Query Cost Calculation: Requested Cost vs. Actual Cost Multipliers',
                body: `How Shopify calculates the cost of a GraphQL query:
• Base Cost: Every query has a base cost of 1 or 2 points.
• Scalar Fields: Primitive fields (\`id\`, \`title\`, \`price\`) have zero or negligible cost.
• Connection Multipliers: Querying connections multiplies cost by the requested \`first: N\` argument.
  \`products(first: 50) { variants(first: 10) }\` -> Multiplier evaluates potential worst-case nodes!
• Requested vs. Actual Cost:
  - Requested Cost: The maximum points calculated before execution.
  - Actual Cost: The true points deducted based on how many records actually existed in the database.`,
                callout: {
                    type: 'tip',
                    text: 'Keep `first: N` numbers tight. Requesting `first: 250` when you only need 20 items inflates requested cost and exhausts your bucket prematurely.',
                },
            },
            {
                heading: 'Inspecting extensions.cost in Responses for Telemetry Monitoring',
                body: `Every GraphQL response includes an \`extensions.cost\` metadata payload:
\`\`\`json
{
  "extensions": {
    "cost": {
      "requestedQueryCost": 52,
      "actualQueryCost": 28,
      "throttleStatus": {
        "maximumAvailable": 1000.0,
        "currentlyAvailable": 972.0,
        "restoreRate": 50.0
      }
    }
  }
}
\`\`\`
Inspect \`currentlyAvailable\` to monitor bucket saturation in real-time.`,
                callout: {
                    type: 'note',
                    text: 'Log `actualQueryCost` in production to identify which backend queries consume the highest percentage of your hourly API budget.',
                },
            },
            {
                heading: 'Implementing Exponential Backoff & Jitter for HTTP 429 Retries',
                body: `When handling high-volume background tasks, rate-limit collisions are inevitable.
Defensive Retry Architecture:
1. Detect HTTP 429 or \`THROTTLED\` errors.
2. Calculate Sleep Time:
   \`Wait Seconds = (Requested Cost - Currently Available) / Restore Rate\`
3. Add Random Jitter: Add a randomized 100ms-500ms delay to prevent multiple concurrent worker threads from retrying simultaneously at the exact same millisecond (the thundering herd problem).`,
                code: `// Production Rate-Limit Retry Handler with Jitter
async function executeGraphqlWithRetry(adminClient: any, query: string, variables = {}, attempt = 1): Promise<any> {
  const maxAttempts = 5;

  const response = await adminClient.graphql(query, { variables });
  const data = await response.json();

  if (response.status === 429 || (data.errors && data.errors[0]?.extensions?.code === 'THROTTLED')) {
    if (attempt >= maxAttempts) throw new Error('Max GraphQL retry attempts exhausted.');

    const costInfo = data.extensions?.cost?.throttleStatus;
    const currentlyAvailable = costInfo ? costInfo.currentlyAvailable : 0;
    const restoreRate = costInfo ? costInfo.restoreRate : 50;
    const requestedCost = data.extensions?.cost?.requestedQueryCost || 100;

    // Calculate required wait time + randomized jitter
    const waitSeconds = Math.max(1, (requestedCost - currentlyAvailable) / restoreRate);
    const jitterMs = Math.floor(Math.random() * 500);
    const totalWaitMs = (waitSeconds * 1000) + jitterMs;

    console.warn(\`[Rate Limit] Throttled. Waiting \${totalWaitMs}ms before attempt \${attempt + 1}...\`);
    await new Promise(resolve => setTimeout(resolve, totalWaitMs));

    return executeGraphqlWithRetry(adminClient, query, variables, attempt + 1);
  }

  return data;
}`,
                language: 'javascript',
            }
        ],
        mistakes: [
            'Requesting `first: 250` on nested connections, causing massive query costs that instantly drain the bucket.',
            'Retrying throttled requests immediately without backoff delay, leading to persistent throttling.',
        ],
        checklist: [
            'Inspected the `extensions.cost` payload in a GraphQL response.',
            'Optimized an expensive query by reducing connection sizes.',
            'Implemented exponential backoff with jitter for throttled calls.',
        ],
        furtherReading: [
            { title: 'Shopify API Rate Limits Guide', url: 'https://shopify.dev/docs/api/usage/rate-limits' },
        ],
    },
    // =========================================================================
    // WEEK 11: Event-Driven Architecture, Webhooks & EventBridge (dev-module-11)
    // =========================================================================
    {
        id: 'dev-m11-l1',
        moduleId: 'dev-module-11',
        slug: 'event-driven-architecture-webhooks-and-eventbridge',
        title: 'Event-Driven Webhooks: HTTPS, Amazon EventBridge & Google Cloud Pub/Sub',
        estimatedMinutes: 50,
        objectives: [
            'Understand Shopify Webhook architecture: Subscribing to platform events (`orders/create`, `products/update`)',
            'Compare delivery mechanisms: Traditional HTTPS endpoints vs. Amazon EventBridge vs. Google Cloud Pub/Sub',
            'Configure automated webhook subscriptions in `shopify.app.toml`',
            'Handle Shopify webhook retries (19 attempts over 48 hours) and avoid subscription deletion due to 5xx errors',
        ],
        videoSource: {
            title: 'Introduction to Shopify Webhooks',
            embedUrl: 'https://www.youtube-nocookie.com/embed/edWXuE5Cz4w',
            channel: 'Hookdeck',
            duration: '8:25',
            description: 'Curated YouTube walkthrough from Hookdeck that complements this lesson. Watch it alongside the written sections below.',
            topics: ['Webhooks', 'EventBridge', 'Declarative Subscriptions', 'Event-Driven Architecture'],
        },
        sections: [
            {
                heading: 'Shopify Webhooks Architecture: Subscribing to Platform Events',
                body: `Webhooks are automated push notifications dispatched by Shopify whenever a resource changes in the store.
Core Event Topics:
• \`orders/create\`, \`orders/updated\`, \`orders/fulfilled\`: Real-time order processing.
• \`products/create\`, \`products/update\`, \`products/delete\`: Catalog synchronization.
• \`customers/create\`, \`customers/update\`: CRM profile sync.
• \`app/uninstalled\`: Cleanup trigger when a merchant uninstalls your app.`,
                callout: {
                    type: 'shopify',
                    text: 'Webhooks are asynchronous event-driven notifications. Never poll the Shopify API every 5 minutes to check for new orders; use webhooks instead.',
                },
            },
            {
                heading: 'Delivery Mechanisms: HTTPS Endpoints vs. Amazon EventBridge vs. GCP Pub/Sub',
                body: `Shopify supports 3 delivery protocols:
1. HTTPS Webhooks (Standard):
   - Delivers JSON payloads via HTTP POST to your web server endpoint.
   - Ideal for small to mid-sized apps.
2. Amazon EventBridge (Enterprise AWS):
   - Direct cloud-to-cloud event bus integration into AWS.
   - Zero public HTTP ingress needed; scales to tens of thousands of events per second with zero server timeout risk.
3. Google Cloud Pub/Sub:
   - Direct ingestion into GCP messaging queues for massive event processing pipelines.`,
                callout: {
                    type: 'tip',
                    text: 'For enterprise apps processing over 100,000 orders during Black Friday, Amazon EventBridge completely eliminates HTTP endpoint concurrency bottlenecks.',
                },
            },
            {
                heading: 'Declaring Webhook Subscriptions in shopify.app.toml',
                body: `In modern app development, webhooks are declared declaratively in configuration rather than via runtime API calls:
\`\`\`toml
# shopify.app.toml
[webhooks]
api_version = "2026-01"

  [[webhooks.subscriptions]]
  topics = [ "orders/create", "orders/updated" ]
  uri = "/webhooks/orders"

  [[webhooks.subscriptions]]
  topics = [ "app/uninstalled" ]
  uri = "/webhooks/app/uninstalled"
\`\`\`
When you run \`shopify app deploy\`, Shopify automatically provisions and synchronizes all declared webhook subscriptions across all installed stores!`,
                callout: {
                    type: 'shopify',
                    text: 'Declarative webhooks in `shopify.app.toml` guarantee subscription consistency and eliminate manual subscription registration code.',
                },
            },
            {
                heading: 'Webhook Retry Schedules and Preventing Subscription Deletion',
                body: `Understanding Shopify's retry schedule:
• 19 Retry Attempts: If your server returns any HTTP status other than 200 OK (e.g. 500, 502, 504), Shopify retries delivery 19 times over a 48-hour period with exponential backoff.
• The Deletion Threshold: If an endpoint consistently fails for 48 hours, Shopify permanently cancels and deletes the webhook subscription!
The Golden Rule of Webhook Resiliency:
Always respond with HTTP 200 OK immediately within 2 seconds. Push the raw payload into an asynchronous background queue (BullMQ, Celery, SQS) to do the heavy processing!`,
                code: `// Resilient Webhook Ingestion Route in Node.js / Remix
export const action = async ({ request }: { request: Request }) => {
  // 1. Fast verification
  const rawBody = await request.text();
  const hmac = request.headers.get('X-Shopify-Hmac-Sha256');

  if (!isValidHmac(rawBody, hmac, process.env.SHOPIFY_API_SECRET!)) {
    return new Response('Unauthorized', { status: 401 });
  }

  // 2. Offload to asynchronous background worker queue immediately
  await jobQueue.add('process-shopify-order', {
    topic: request.headers.get('X-Shopify-Topic'),
    shop: request.headers.get('X-Shopify-Shop-Domain'),
    payload: JSON.parse(rawBody)
  });

  // 3. Immediately return HTTP 200 OK to Shopify within 50ms
  return new Response('Webhook received', { status: 200 });
};`,
                language: 'javascript',
            }
        ],
        mistakes: [
            'Performing long synchronous tasks (e.g. video processing or PDF generation) directly inside the HTTP webhook handler, causing timeouts and 504 errors.',
            'Allowing webhooks to return non-200 responses, causing Shopify to back off and eventually delete the webhook subscription.',
        ],
        checklist: [
            'Declared webhook subscriptions in `shopify.app.toml`.',
            'Responded with HTTP 200 OK immediately and enqueued heavy tasks asynchronously.',
            'Tested webhook delivery using Shopify CLI `shopify app webhook trigger`.',
        ],
        furtherReading: [
            { title: 'Shopify Webhooks Overview', url: 'https://shopify.dev/docs/apps/webhooks' },
            { title: 'Amazon EventBridge Webhooks Guide', url: 'https://shopify.dev/docs/apps/webhooks/configuration/eventbridge' },
        ],
    },
    {
        id: 'dev-m11-l2',
        moduleId: 'dev-module-11',
        slug: 'webhook-security-hmac-verification-idempotency',
        title: 'Webhook Security: HMAC SHA-256 Verification & Idempotency at Scale',
        estimatedMinutes: 50,
        objectives: [
            'Verify the `X-Shopify-Hmac-Sha256` header using the app client secret and raw request body',
            'Prevent replay attacks and handle duplicate events using Idempotency Keys (`X-Shopify-Webhook-Id`)',
            'Process webhooks out-of-order safely using entity versioning or timestamps',
            'Store processed webhook IDs in Redis or database tables with automatic TTL expiration',
        ],
        videoSource: {
            title: 'How to Verify Shopify Webhooks',
            embedUrl: 'https://www.youtube-nocookie.com/embed/MXjSQsmR3EU',
            channel: 'Hookdeck',
            duration: '5:15',
            description: 'Curated YouTube walkthrough from Hookdeck that complements this lesson. Watch it alongside the written sections below.',
            topics: ['HMAC SHA-256', 'Webhook Security', 'Idempotency', 'Replay Protection'],
        },
        sections: [
            {
                heading: 'Cryptographic HMAC SHA-256 Signature Verification',
                body: `Never process an incoming webhook without verifying its cryptographic signature!
How Attackers Exploit Unverified Webhooks:
An attacker can send fake HTTP POST requests to \`https://your-app.com/webhooks/orders\` with fabricated order totals, manipulating inventory counts or fulfilling un-purchased items.
The Verification Algorithm:
1. Extract the \`X-Shopify-Hmac-Sha256\` header.
2. Read the raw, unparsed HTTP request body string.
3. Compute the HMAC SHA-256 hash of the raw body using your app's Client Secret.
4. Encode the result in base64.
5. Perform a timing-safe equality comparison (\`crypto.timingSafeEqual\`) against the header value.`,
                callout: {
                    type: 'warning',
                    text: 'Always use `crypto.timingSafeEqual()` instead of standard `===` comparison. Using standard string comparison exposes your application to side-channel timing attacks.',
                },
            },
            {
                heading: 'Preventing Replay Attacks & Duplication via X-Shopify-Webhook-Id',
                body: `Because webhooks operate over distributed networks, network timeouts and retries will frequently cause your server to receive the exact same webhook event twice.
Idempotency Architecture:
• Every Shopify webhook includes a unique UUID header: \`X-Shopify-Webhook-Id\`.
• When a webhook arrives:
  1. Check Redis or database: \`await redis.get("webhook:" + webhookId)\`.
  2. If present: The event was already ingested. Return HTTP 200 OK immediately and ignore the duplicate payload.
  3. If absent: Record \`await redis.set("webhook:" + webhookId, "1", "EX", 86400)\` (24-hour expiration) and proceed with business logic.`,
                callout: {
                    type: 'tip',
                    text: 'Idempotency safeguards prevent catastrophic real-world bugs, such as double-shipping orders or double-crediting customer loyalty points.',
                },
            },
            {
                heading: 'Processing Out-of-Order Webhooks Safely via Entity Versioning',
                body: `The Distributed Ordering Dilemma:
If a customer places an order, and 2 seconds later updates their shipping address:
Shopify dispatches \`orders/create\` and \`orders/updated\`.
Over the Internet, \`orders/updated\` might arrive at your server BEFORE \`orders/create\`!
Safe Entity Reconciliation:
• Always inspect \`updated_at\` timestamps in the payload.
• If your database record already has a newer \`updated_at\` timestamp than the incoming webhook, discard the incoming payload to prevent overwriting fresh data with stale data.`,
                callout: {
                    type: 'note',
                    text: 'Never assume webhooks arrive in chronological order. Always compare timestamps or sequence version numbers.',
                },
            },
            {
                heading: 'Production Redis Idempotency Store Implementation',
                body: `A complete production Node.js implementation of HMAC verification and Redis idempotency caching.`,
                code: `// Production Webhook Security & Idempotency Middleware (Node.js)
import crypto from 'crypto';

export function verifyShopifyWebhook(rawBody: string, hmacHeader: string, secret: string): boolean {
  if (!rawBody || !hmacHeader || !secret) return false;

  const generatedHash = crypto
    .createHmac('sha256', secret)
    .update(rawBody, 'utf8')
    .digest('base64');

  const generatedBuffer = Buffer.from(generatedHash);
  const headerBuffer = Buffer.from(hmacHeader);

  if (generatedBuffer.length !== headerBuffer.length) return false;

  return crypto.timingSafeEqual(generatedBuffer, headerBuffer);
}

// In your Express or Remix route handler:
export async function handleWebhook(req: Request, redisClient: any) {
  const rawBody = await req.text();
  const hmac = req.headers.get('x-shopify-hmac-sha256') || '';
  const webhookId = req.headers.get('x-shopify-webhook-id') || '';

  if (!verifyShopifyWebhook(rawBody, hmac, process.env.SHOPIFY_API_SECRET!)) {
    return new Response('Unauthorized Webhook Signature', { status: 401 });
  }

  // Check Redis for duplicate delivery
  const isDuplicate = await redisClient.get(\`seen_webhook:\${webhookId}\`);
  if (isDuplicate) {
    console.log(\`[Idempotency] Webhook \${webhookId} already processed. Acknowledging with 200.\`);
    return new Response('Duplicate acknowledged', { status: 200 });
  }

  // Mark as seen for 48 hours
  await redisClient.set(\`seen_webhook:\${webhookId}\`, 'processed', 'EX', 172800);

  // Enqueue job safely
  // ...
  return new Response('Queued', { status: 200 });
}`,
                language: 'javascript',
            }
        ],
        mistakes: [
            'Parsing the JSON body before calculating the HMAC hash (JSON parsers alter whitespace, invalidating the signature).',
            'Using `===` string equality instead of `crypto.timingSafeEqual`, exposing your endpoint to timing attacks.',
            'Not enforcing idempotency, causing duplicate orders or inventory deductions when webhooks retry.',
        ],
        checklist: [
            'Implemented raw body HMAC verification using `crypto.timingSafeEqual`.',
            'Checked the `X-Shopify-Webhook-Id` against a deduplication store.',
            'Tested signature failure rejection with an invalid test key.',
        ],
        furtherReading: [
            { title: 'Verify Shopify Webhooks Documentation', url: 'https://shopify.dev/docs/apps/webhooks/configuration/https#step-5-verify-the-webhook' },
        ],
    },
    {
        id: 'dev-m11-l3',
        moduleId: 'dev-module-11',
        slug: 'mandatory-compliance-webhooks-gdpr-data-redaction',
        title: 'Mandatory Compliance Webhooks: GDPR, CCPA & Data Redaction Automation',
        estimatedMinutes: 45,
        objectives: [
            'Implement the 3 mandatory compliance endpoints required for App Store approval',
            'Handle `customers/data_request`: Exporting all customer data stored by your app within 30 days',
            'Handle `customers/redact`: Deleting customer PII upon request',
            'Handle `shop/redact`: Purging all merchant database records 48 hours after app uninstallation',
        ],
        videoSource: {
            title: 'Setup Shopify App GDPR Webhooks - without code!',
            embedUrl: 'https://www.youtube-nocookie.com/embed/xBFqOGcdnDY',
            channel: 'pipedream',
            duration: '7:22',
            description: 'Curated YouTube walkthrough from pipedream that complements this lesson. Watch it alongside the written sections below.',
            topics: ['GDPR Webhooks', 'Data Redaction', 'App Store Review Requirements', 'PII Cleanup'],
        },
        sections: [
            {
                heading: 'The 3 Mandatory Compliance Endpoints for App Store Approval',
                body: `To be published in the Shopify App Store, every single app must register 3 mandatory privacy compliance webhooks in the Partner Dashboard:
1. \`customers/data_request\`: Triggered when a shopper requests a copy of all personal data held by the merchant.
2. \`customers/redact\`: Triggered when a customer exercises their "Right to be Forgotten" (GDPR/CCPA).
3. \`shop/redact\`: Triggered 48 hours after a merchant uninstalls your app, requesting total data purging.
Failing to implement these endpoints results in immediate App Review rejection!`,
                callout: {
                    type: 'warning',
                    text: 'Shopify automated scanners test these endpoints with simulated mock payloads during the app submission review.',
                },
            },
            {
                heading: 'Handling customers/data_request: Exporting PII Within 30 Days',
                body: `When a customer contacts a merchant requesting their personal data:
• Shopify dispatches \`customers/data_request\` containing customer ID, email, phone, and order IDs.
• Your App's Responsibility:
  Query your database for all records referencing this customer.
  If your app stores customer data (e.g. review notes, custom sizing measurements), compile the data into a structured format and provide it to the merchant upon request.
• If your app stores NO customer data, simply acknowledge the webhook with HTTP 200 OK.`,
                callout: {
                    type: 'shopify',
                    text: 'The compliance framework allows up to 30 days to furnish the data, but your webhook endpoint must acknowledge receipt within 2 seconds.',
                },
            },
            {
                heading: 'Handling customers/redact: Deleting Customer PII Upon Request',
                body: `When a shopper requests data deletion under GDPR:
• Shopify dispatches \`customers/redact\`.
• Action Protocol:
  1. Verify the HMAC signature.
  2. Locate any database rows storing this customer's email, name, IP address, or phone number.
  3. Hard-delete or cryptographically anonymize the customer PII.
  4. Return HTTP 200 OK.`,
                callout: {
                    type: 'tip',
                    text: 'Anonymization (replacing name with "REDACTED" and hashing emails) satisfies GDPR while preserving aggregated business analytics.',
                },
            },
            {
                heading: 'Handling shop/redact: Purging Merchant Database Records',
                body: `When a store uninstalls your app:
• Immediate: Shopify sends \`app/uninstalled\`. Set \`merchant.status = 'INACTIVE'\`.
• 48 Hours Later: Shopify dispatches \`shop/redact\`.
• Mandatory Action:
  You must purge all merchant credentials, customer records, and cached catalog data associated with that \`shop_domain\` from your database!
  Shopify delays this webhook by 48 hours so merchants who accidentally uninstalled can reinstall without losing their configuration.`,
                code: `// Production Implementation of 3 Mandatory Compliance Handlers
export async function handleComplianceWebhook(topic: string, payload: any) {
  switch (topic) {
    case 'customers/data_request':
      console.log(\`[GDPR] Customer Data Request for: \${payload.customer.email}\`);
      // Query database and log export package
      break;

    case 'customers/redact':
      console.log(\`[GDPR] Redacting customer: \${payload.customer.id}\`);
      await prisma.customerData.deleteMany({
        where: { shopifyCustomerId: String(payload.customer.id) }
      });
      break;

    case 'shop/redact':
      console.log(\`[GDPR] Complete shop purge requested for: \${payload.shop_domain}\`);
      await prisma.session.deleteMany({
        where: { shop: payload.shop_domain }
      });
      await prisma.merchantConfig.deleteMany({
        where: { shopDomain: payload.shop_domain }
      });
      break;
  }
}`,
                language: 'javascript',
            }
        ],
        mistakes: [
            'Failing to implement all 3 compliance endpoints, leading to instant App Store rejection.',
            'Keeping customer data indefinitely after receiving a `customers/redact` event.',
        ],
        checklist: [
            'Configured `customers/data_request` endpoint.',
            'Configured `customers/redact` endpoint.',
            'Configured `shop/redact` endpoint.',
            'Verified HMAC authentication on all three compliance routes.',
        ],
        furtherReading: [
            { title: 'Mandatory Webhooks Guide', url: 'https://shopify.dev/docs/apps/store/security/mandatory-webhooks' },
        ],
    },
    // =========================================================================
    // WEEK 12: Shopify Billing API, Polaris UI & App Store Launch (dev-module-12)
    // =========================================================================
    {
        id: 'dev-m12-l1',
        moduleId: 'dev-module-12',
        slug: 'shopify-billing-api-recurring-usage-capped-charges',
        title: 'Monetizing Apps: Recurring Subscriptions, Usage Billing & Free Trials',
        estimatedMinutes: 50,
        objectives: [
            'Understand the Shopify Billing API: Recurring Application Charges vs. One-Time Purchases vs. Usage Charges',
            'Create multi-tier subscriptions (Basic $19/mo, Pro $49/mo) with free trial periods',
            'Implement usage-based billing with capped amounts and usage records via `appUsageRecordCreate`',
            'Handle billing approval callbacks, plan upgrades, downgrades, and cancellations',
        ],
        videoSource: {
            title: 'How to Set Up Managed Pricing for Shopify Apps',
            embedUrl: 'https://www.youtube-nocookie.com/embed/CHhEfifBMWg',
            channel: 'Dev With Alex',
            duration: '13:53',
            description: 'Curated YouTube walkthrough from Dev With Alex that complements this lesson. Watch it alongside the written sections below.',
            topics: ['Billing API', 'Recurring Subscriptions', 'Usage Billing', 'App Monetization'],
        },
        sections: [
            {
                heading: 'Shopify Billing API Architecture: Recurring, One-Time & Usage Charges',
                body: `Shopify handles all app payments natively through the Billing API:
Three Revenue Models:
1. Recurring Application Charges: Monthly subscriptions (e.g., Basic $19/mo, Growth $49/mo). Shopify handles merchant billing, currency conversion, and dunning cycles.
2. One-Time Purchases: Single lifetime purchases or setup fees.
3. Usage Charges: Metered billing where merchants are charged based on dynamic consumption (e.g. $0.05 per generated order or $0.01 per SMS sent).`,
                callout: {
                    type: 'shopify',
                    text: 'Shopify processes app billing directly on the merchant’s monthly Shopify invoice, guaranteeing virtually zero merchant payment fraud.',
                },
            },
            {
                heading: 'Multi-Tier Subscriptions with Free Trials via appSubscriptionCreate',
                body: `Creating a recurring plan via GraphQL:
• The \`appSubscriptionCreate\` Mutation:
  Specifies plan name, monthly price, currency, test mode, and trial days (e.g. \`trialDays: 14\`).
• Confirmation URL:
  Shopify returns a \`confirmationUrl\`.
  Your app redirects the merchant to this URL, where Shopify presents the native approval modal displaying plan terms.
• Return URL Callback:
  When the merchant clicks "Approve", Shopify redirects them back to your app with \`charge_id\`!`,
                code: `# GraphQL Mutation: Creating a 14-Day Free Trial Subscription
mutation CreateAppSubscription($returnUrl: URL!) {
  appSubscriptionCreate(
    name: "Growth Plan",
    returnUrl: $returnUrl,
    trialDays: 14,
    test: true, # Set to false in production
    lineItems: [
      {
        plan: {
          appRecurringPricingDetails: {
            price: { amount: 49.00, currencyCode: USD },
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
                language: 'json',
            },
            {
                heading: 'Implementing Usage-Based Billing via appUsageRecordCreate',
                body: `For apps that charge based on usage (e.g. AI generation credits or email volume):
1. Create a Subscription with Capped Amount:
   In \`appSubscriptionCreate\`, define \`appUsagePricingDetails\` with a \`cappedAmount\` (e.g. $100.00 maximum monthly limit).
2. Record Usage Events:
   Whenever the merchant consumes resources, execute \`appUsageRecordCreate\`:
   Pass \`price: { amount: 0.10, currencyCode: USD }\` and a descriptive message ("10 AI image edits").
3. Platform Safeguard:
   Shopify enforces the \`cappedAmount\`. If usage attempts to exceed the cap, Shopify requires the merchant to approve an increased limit.`,
                callout: {
                    type: 'tip',
                    text: 'Usage billing aligns your app revenue with client success: as the merchant sells more, your app earns more.',
                },
            },
            {
                heading: 'Handling Plan Upgrades, Downgrades, and Cancellations',
                body: `Lifecycle Management:
• Upgrades: Creating a new active subscription automatically cancels the previous subscription. Shopify prorates charges automatically.
• Cancellations & Uninstalls:
  When a merchant uninstalls an app, Shopify automatically freezes and cancels any active app subscriptions!
  You do NOT need to manually call a cancellation mutation upon receiving the \`app/uninstalled\` webhook.`,
                callout: {
                    type: 'warning',
                    text: 'Always check `currentAppInstallation.activeSubscriptions` in your loader before granting access to premium app features.',
                },
            }
        ],
        mistakes: [
            'Using third-party payment gateways (Stripe/PayPal) instead of the Shopify Billing API, resulting in immediate app ban.',
            'Forgetting to flag `isTest: true` during development, charging real credit cards on test stores.',
        ],
        checklist: [
            'Configured recurring billing plans in the app.',
            'Implemented free trial periods.',
            'Verified test billing using `isTest: true`.',
            'Handled plan upgrade and cancellation lifecycle hooks.',
        ],
        furtherReading: [
            { title: 'Shopify App Billing API Overview', url: 'https://shopify.dev/docs/apps/billing' },
        ],
    },
    {
        id: 'dev-m12-l2',
        moduleId: 'dev-module-12',
        slug: 'polaris-design-system-accessible-admin-ux',
        title: 'Polaris Design System: Crafting Seamless, Accessible Shopify Admin UX',
        estimatedMinutes: 45,
        objectives: [
            'Master the Shopify Polaris design system tokens, typography scales, and component library',
            'Build responsive, native admin layouts using `Page`, `Layout`, `Card`, `BlockStack`, `InlineGrid`, and `IndexTable`',
            'Implement full keyboard accessibility (WCAG 2.1 AA) and screen reader support',
            'Follow Polaris UX guidelines: Empty states, error validation banners, and progress spinners',
        ],
        videoSource: {
            title: 'Using Polaris in Shopify Admin  | Shopify App Development',
            embedUrl: 'https://www.youtube-nocookie.com/embed/PfvayQ_Kddk',
            channel: 'Shopify AI + Dev',
            duration: '30:48',
            description: 'Curated YouTube walkthrough from Shopify AI + Dev that complements this lesson. Watch it alongside the written sections below.',
            topics: ['Polaris Design System', 'IndexTable', 'Admin UX', 'WCAG Accessibility'],
        },
        sections: [
            {
                heading: 'The Polaris Design System: Philosophy and Core Tokens',
                body: `Polaris is Shopify’s official design system governing the user experience of the Shopify Admin.
Why Polaris is Mandatory:
• Seamless Experience: Embedded apps should look, feel, and behave identically to native Shopify Admin pages. Merchants should not feel like they are leaving Shopify.
• Design Tokens: Polaris provides standardized scales for colors, typography, spacing, elevations, and motion curves.
• Official Library: Use the \`@shopify/polaris\` React component library.`,
                callout: {
                    type: 'shopify',
                    text: 'App Store reviewers actively reject apps that use custom off-brand buttons, non-standard color palettes, or generic Bootstrap/Tailwind themes.',
                },
            },
            {
                heading: 'Building Responsive Admin Layouts: Page, Layout, Card, and IndexTable',
                body: `Core structural components in Polaris:
• \`Page\`: Root container providing page title, subtitles, breadcrumbs, and primary action buttons.
• \`Layout\` & \`Layout.Section\`: Responsive grid system (\`oneHalf\`, \`oneThird\`, \`secondary\`).
• \`Card\`: Contained surface card grouping related configuration settings.
• \`IndexTable\`: Enterprise data table component featuring multi-row selection, bulk action bars, sortable headers, and pagination controls.`,
                code: `// Production Polaris IndexTable Component
import {
  Page,
  Card,
  IndexTable,
  useIndexResourceState,
  Text,
  Badge
} from '@shopify/polaris';

export function ProductInventoryTable({ products }: { products: any[] }) {
  const resourceName = { singular: 'product', plural: 'products' };
  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(products);

  const rowMarkup = products.map(({ id, title, inventory, status }, index) => (
    <IndexTable.Row id={id} key={id} selected={selectedResources.includes(id)} position={index}>
      <IndexTable.Cell>
        <Text variant="bodyMd" fontWeight="bold" as="span">{title}</Text>
      </IndexTable.Cell>
      <IndexTable.Cell>{inventory} in stock</IndexTable.Cell>
      <IndexTable.Cell>
        <Badge tone={status === 'ACTIVE' ? 'success' : 'attention'}>{status}</Badge>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  return (
    <Page title="Inventory Monitor">
      <Card padding="none">
        <IndexTable
          resourceName={resourceName}
          itemCount={products.length}
          selectedItemsCount={allResourcesSelected ? 'All' : selectedResources.length}
          onSelectionChange={handleSelectionChange}
          headings={[{ title: 'Product' }, { title: 'Stock Level' }, { title: 'Status' }]}
        >
          {rowMarkup}
        </IndexTable>
      </Card>
    </Page>
  );
}`,
                language: 'javascript',
            },
            {
                heading: 'Full Keyboard Accessibility (WCAG 2.1 AA) & Screen Reader Support',
                body: `Polaris components have accessibility baked into their foundation:
• Focus Management: Polaris traps focus within active dialogs and returns focus to trigger elements upon modal close.
• Screen Reader Announcements: Components emit ARIA live region updates for background operations.
• Color Contrast: All standard Polaris text tokens guarantee a minimum 4.5:1 contrast ratio against background surfaces.`,
                callout: {
                    type: 'tip',
                    text: 'Always provide explicit `accessibilityLabel` props on icon-only buttons to pass App Review accessibility audits.',
                },
            },
            {
                heading: 'Polaris UX Guidelines: Empty States, Validation Banners, and Spinners',
                body: `Delivering a polished merchant onboarding flow:
• Empty States: When a merchant first installs your app and has zero data, render an \`EmptyState\` component with an inviting illustration, clear value proposition, and a prominent primary CTA.
• Form Validation: Render inline error messages beneath text fields alongside an overarching \`Banner tone="critical"\` summarizing form validation failures.
• Loading Skeletons: Use \`SkeletonBodyText\` and \`SkeletonPage\` during data fetching to eliminate visual layout shifts.`,
                callout: {
                    type: 'note',
                    text: 'An empty state that simply says "No records found" feels cold. Use Polaris EmptyState to guide the merchant on what to do next.',
                },
            }
        ],
        mistakes: [
            'Styling apps with generic non-Polaris UI libraries (like generic Material UI or Bootstrap) that clash with Shopify Admin.',
            'Neglecting empty states, leaving merchants with blank, confusing screens on initial app installation.',
        ],
        checklist: [
            'Built an embedded app view using Polaris layout components.',
            'Implemented an `IndexTable` with multi-select bulk actions.',
            'Added an accessible `EmptyState` component with a clear CTA.',
        ],
        furtherReading: [
            { title: 'Polaris Design System Documentation', url: 'https://polaris.shopify.com' },
        ],
    },
    {
        id: 'dev-m12-l3',
        moduleId: 'dev-module-12',
        slug: 'app-store-submission-security-review-and-deployment',
        title: 'App Store Submission: Security Audit Checklist & Cloud Production Deployment',
        estimatedMinutes: 50,
        objectives: [
            'Conduct an exhaustive pre-submission security audit (CSP headers, rate limiting, HMAC verification)',
            'Prepare App Store marketing assets: Icon (1200x1200), Screenshots, Demo Store URL, and Screen Recording Video',
            'Deploy the production app container to Fly.io, Render, or AWS ECS with high-availability PostgreSQL',
            'Navigate the Shopify App Review process: Responding to reviewer feedback and fixing rejection flags',
        ],
        videoSource: {
            title: '32 - Shopify App Submission — A Full Process Walkthrough',
            embedUrl: 'https://www.youtube-nocookie.com/embed/9ZDZ7xhKPRI',
            channel: 'Code Inspire',
            duration: '12:00',
            description: 'Curated YouTube walkthrough from Code Inspire that complements this lesson. Watch it alongside the written sections below.',
            topics: ['App Store Review', 'Security Audit', 'Docker Deployment', 'Production Checklist'],
        },
        sections: [
            {
                heading: 'Pre-Submission Security Audit: CSP Headers, Rate Limiting & HMAC',
                body: `Before submitting an app to the Shopify App Store, you must pass an exhaustive technical security audit:
Mandatory Security Checklist:
1. Content Security Policy (CSP): Embedded apps must set strict \`frame-ancestors https://admin.shopify.com https://*.myshopify.com\` headers to prevent clickjacking attacks.
2. Webhook Verification: 100% of incoming webhooks must verify HMAC signatures.
3. No Leaked Secrets: Confirm API secrets and database connection strings are never exposed in client bundles or public repositories.
4. Rate Limit Throttling: Verify your background jobs handle HTTP 429 retries with backoff.`,
                callout: {
                    type: 'warning',
                    text: 'Missing CSP frame-ancestors headers is the #1 most common automated rejection flag during initial App Store submission.',
                },
            },
            {
                heading: 'Preparing App Store Assets: Icon, Screenshots, Demo Store & Loom Video',
                body: `High-converting App Store listing requirements:
• App Icon: Exactly 1200 × 1200 px (square, PNG format, no rounded corners; Shopify masks the edges automatically).
• High-Resolution Screenshots: Minimum 3 screenshots (1600 × 900 px or 16:9 ratio) demonstrating Polaris admin UI and storefront features.
• Screencast Walkthrough Video: A 2-3 minute unlisted YouTube/Loom video demonstrating onboarding, primary features, and uninstallation.
• Public Demo Store: A live Shopify store showcasing your app's frontend features for merchant evaluation.`,
                callout: {
                    type: 'tip',
                    text: 'Reviewers will test your demo store link. Make sure the demo store is published and has active catalog test data.',
                },
            },
            {
                heading: 'Production Deployment on Fly.io, Render, or AWS ECS with PostgreSQL',
                body: `Deploying your production Remix container:
1. Production Database: Provision a managed PostgreSQL instance (Supabase, Neon, or AWS RDS).
2. Dockerfile Build: The Shopify Remix template includes an optimized production multi-stage Dockerfile.
3. Environment Variables:
   - \`SHOPIFY_API_KEY\`: App client ID.
   - \`SHOPIFY_API_SECRET\`: App client secret.
   - \`SHOPIFY_APP_URL\`: Your production custom domain (\`https://app.yourdomain.com\`).
   - \`DATABASE_URL\`: Production PostgreSQL connection string.
4. SSL & Edge CDN: Ensure automated SSL termination via Cloudflare or Fly.io edge proxies.`,
                code: `# Production Deployment via Fly.io CLI
# 1. Launch app configuration
fly launch --no-deploy

# 2. Attach managed PostgreSQL database
fly postgres attach my-shopify-app-db

# 3. Set encrypted production secrets
fly secrets set SHOPIFY_API_KEY="your_api_key" \
                SHOPIFY_API_SECRET="your_secret" \
                SHOPIFY_APP_URL="https://my-app.fly.dev" \
                SCOPES="read_products,write_orders"

# 4. Deploy production container
fly deploy`,
                language: 'bash',
            },
            {
                heading: 'Navigating the App Review Process & Fixing Rejection Flags',
                body: `What to expect during Shopify App Review:
• The Review Timeline: Takes between 5 and 10 business days.
• Automated Scanners: Shopify runs automated bot audits verifying OAuth redirect loops, CSP headers, and mandatory GDPR webhooks.
• Human Reviewer: A Shopify quality engineer installs your app on a development store, tests onboarding, tests mobile responsiveness, and verifies billing flows.
• Handling Rejections: If rejected, the reviewer provides detailed video recordings and step-by-step instructions. Fix the issues calmly, reply with a detailed changelog, and resubmit.`,
                callout: {
                    type: 'shopify',
                    text: 'Over 70% of apps receive at least one rejection flag on their first submission. Treating feedback professionally leads to prompt approval.',
                },
            }
        ],
        mistakes: [
            'Submitting an app pointing to localhost or a temporary ngrok/Cloudflare tunnel instead of a production domain.',
            'Missing privacy policy or support contact information in the app listing.',
        ],
        checklist: [
            'Containerized the app with Docker and deployed to production cloud hosting.',
            'Verified CSP headers permit embedding inside `admin.shopify.com`.',
            'Recorded a comprehensive app walkthrough demo video for reviewers.',
            'Submitted app listing in the Partner Dashboard.',
        ],
        furtherReading: [
            { title: 'Shopify App Store Requirements', url: 'https://shopify.dev/docs/apps/store/requirements' },
        ],
    },
    // =========================================================================
    // WEEK 13: Headless Commerce with Hydrogen & Oxygen (dev-module-13)
    // =========================================================================
    {
        id: 'dev-m13-l1',
        moduleId: 'dev-module-13',
        slug: 'headless-commerce-overview-and-storefront-api-graphql',
        title: 'Headless Commerce Overview: When to Go Headless & Storefront API GraphQL',
        estimatedMinutes: 50,
        objectives: [
            'Evaluate trade-offs: Monolithic Liquid Themes vs. Headless Custom Storefronts',
            'Understand the Storefront GraphQL API: Public unauthenticated token access, edge caching, and cart mutations',
            'Understand the limitations of Headless: Loss of native Theme Editor, loss of automatic app block injection, and higher maintenance costs',
            'Query products, collections, customer login, and checkout sessions via Storefront API',
        ],
        videoSource: {
            title: 'Shopify Storefront Web Components - Headless eCommerce without GraphQL',
            embedUrl: 'https://www.youtube-nocookie.com/embed/okbvii6LKuE',
            channel: 'Code with Chris the Freelancer',
            duration: '24:06',
            description: 'Curated YouTube walkthrough from Code with Chris the Freelancer that complements this lesson. Watch it alongside the written sections below.',
            topics: ['Headless Commerce', 'Storefront API', 'Liquid vs Headless', 'Cart Mutations'],
        },
        sections: [
            {
                heading: 'Monolithic Liquid Themes vs. Headless Custom Storefronts',
                body: `Deciding between Liquid themes and headless architectures is an architectural crossroads:
• Liquid Monolith (Dawn / OS 2.0):
  - Pros: Native Theme Editor drag-and-drop, zero server hosting costs, instant compatibility with 10,000+ App Store apps, sub-second edge rendering.
  - Cons: Bounded by Liquid templating conventions; cannot build complex Single Page App (SPA) interactions.
• Headless Commerce (Hydrogen / Next.js):
  - Pros: Unbounded design freedom, sub-100ms client-side page transitions, complex progressive web app (PWA) offline capabilities, custom multi-channel frontends (mobile apps, IoT).
  - Cons: Substantial maintenance costs ($50k-$200k/year in engineering), loss of native Theme Editor, loss of automatic App Block injection.`,
                callout: {
                    type: 'warning',
                    text: 'Over 85% of brands that go headless regret the decision within 18 months due to the loss of no-code merchant editing and high ongoing developer maintenance costs. Only go headless if you have a dedicated full-time React engineering team.',
                },
            },
            {
                heading: 'Storefront GraphQL API: Edge Caching & Public Tokens',
                body: `The Storefront API is Shopify’s public, client-facing GraphQL endpoint:
• Public Access Token: Unlike Admin tokens (which must be kept secret), Storefront API tokens are public and safe to expose in client-side JavaScript.
• Global Edge Caching: Read-only queries (products, collections, menus) are heavily cached across Cloudflare edge nodes, responding in under 30ms worldwide.
• Rate Limits: High rate-limit thresholds calculated by IP address rather than API client keys, preventing user concurrency limits during flash sales.`,
                callout: {
                    type: 'shopify',
                    text: 'Storefront API handles localized pricing, buyer currency, and international markets automatically via `@inContext(country: US, language: EN)` directives.',
                },
            },
            {
                heading: 'Navigating Headless Limitations: Apps, Editing & Total Cost',
                body: `The Hidden Traps of Headless:
1. Missing App Blocks: Apps that inject Liquid blocks (review widgets, size charts) cannot render in headless React. You must build custom React components querying the app vendor’s REST/GraphQL APIs.
2. The Merchant Bottleneck: Marketing teams lose the ability to create landing pages independently in the Theme Editor; every text change becomes an engineering Jira ticket.
3. Hosting Infrastructure: You are responsible for monitoring uptime, edge routing, SSL certificates, and CI/CD pipelines.`,
                callout: {
                    type: 'tip',
                    text: 'Shopify’s native headless stack—Hydrogen hosted on Oxygen—provides built-in subrequest caching and visual editor integrations, mitigating many headless pain points.',
                },
            },
            {
                heading: 'Querying Products, Collections, and Cart Sessions via Storefront API',
                body: `Executing Storefront API operations:
• Querying Products: Fetching titles, images, and prices with international buyer context.
• Cart Mutations: Creating and managing headless shopping carts (\`cartCreate\`, \`cartLinesAdd\`).
• Checkout Transition: The Storefront API returns a \`checkoutUrl\`. When the user is ready to pay, redirecting them to \`checkoutUrl\` hands off session data to Shopify’s PCI-compliant checkout.`,
                code: `# Storefront API GraphQL Query: Fetch Product with Variant IDs
query GetProductByHandle($handle: String!) @inContext(country: US, language: EN) {
  product(handle: $handle) {
    id
    title
    descriptionHtml
    featuredImage {
      url
      altText
      width
      height
    }
    variants(first: 10) {
      nodes {
        id
        title
        availableForSale
        price {
          amount
          currencyCode
        }
      }
    }
  }
}`,
                language: 'json',
            }
        ],
        mistakes: [
            'Recommending headless to small merchants without dedicated engineering teams to maintain frontend builds and app integrations.',
            'Using Admin API tokens on the public client frontend instead of public Storefront API access tokens.',
        ],
        checklist: [
            'Generated a public Storefront API access token.',
            'Executed product and collection queries against the Storefront API.',
            'Created a cart and generated a checkout URL headlessly.',
        ],
        furtherReading: [
            { title: 'Storefront API Reference', url: 'https://shopify.dev/docs/api/storefront' },
        ],
    },
    {
        id: 'dev-m13-l2',
        moduleId: 'dev-module-13',
        slug: 'shopify-hydrogen-framework-remix-react-server-components',
        title: 'Shopify Hydrogen: Remix-Powered React, Streaming SSR & Cart Provider',
        estimatedMinutes: 55,
        objectives: [
            'Initialize a Hydrogen project using `npm create @shopify/hydrogen@latest`',
            'Master Hydrogen components: `<CartProvider>`, `<Money>`, `<Image>`, and `<Video>`',
            'Implement streaming SSR and deferred data fetching for instant TTFB with non-blocking reviews',
            'Manage headless cart session state and redirect to Shopify Checkout seamlessly',
        ],
        videoSource: {
            title: 'Shopify Hydrogen Tutorial: Set Up a Headless Storefront with Oxygen Deployment & GitHub CI/CD (2025)',
            embedUrl: 'https://www.youtube-nocookie.com/embed/j4By5pFWZkM',
            channel: 'Daniel Holler',
            duration: '16:57',
            description: 'Curated YouTube walkthrough from Daniel Holler that complements this lesson. Watch it alongside the written sections below.',
            topics: ['Shopify Hydrogen', 'Streaming SSR', 'Deferred Data', 'Cart Provider'],
        },
        sections: [
            {
                heading: 'Initializing a Shopify Hydrogen Project (Remix & React)',
                body: `Shopify Hydrogen is an opinionated, production-ready React framework built on top of Remix.
Project Initialization:
\`npm create @shopify/hydrogen@latest\`
What the CLI Scaffolds:
• Modern Remix Stack: Server-side rendering, streaming responses, and file-based routing.
• Pre-Configured Storefront Client: Authenticated Storefront API client ready to execute queries with subrequest caching.
• Hydrogen UI Components: Accessible headless primitives for media, money, and cart management.`,
                callout: {
                    type: 'shopify',
                    text: 'Hydrogen is maintained directly by Shopify’s core storefront engineering team, ensuring immediate compatibility with new platform capabilities.',
                },
            },
            {
                heading: 'Mastering Hydrogen Components: CartProvider, Money, Image, and Video',
                body: `Hydrogen provides specialized React components optimized for ecommerce Core Web Vitals:
• \`<Money data={product.price} />\`: Formats currency symbols, decimal places, and exchange rates according to localized market conventions.
• \`<Image data={product.featuredImage} />\`: Automatically generates responsive \`srcset\`, modern WebP/AVIF renditions, and layout-shift aspect-ratio constraints.
• \`<CartProvider>\`: Context provider managing client-side cart state, line item updates, and optimistic UI feedback.`,
                code: `// Production Hydrogen Product Card Component (React / TypeScript)
import { Image, Money } from '@shopify/hydrogen';
import { Link } from '@remix-run/react';

export function ProductCard({ product }: { product: any }) {
  const firstVariant = product.variants.nodes[0];

  return (
    <div className="product-card">
      <Link to={\`/products/\${product.handle}\`}>
        <Image
          data={product.featuredImage}
          sizes="(min-width: 45em) 20vw, 50vw"
          loading="lazy"
          className="product-card__image"
        />
        <h3 className="product-card__title">{product.title}</h3>
        <Money data={firstVariant.price} className="product-card__price" />
      </Link>
    </div>
  );
}`,
                language: 'javascript',
            },
            {
                heading: 'Streaming SSR and Deferred Data Fetching for Instant TTFB',
                body: `In headless ecommerce, slow third-party API calls (e.g. fetching reviews from Yotpo or recommendations from Rebuy) often delay initial page rendering.
Remix Streaming with \`defer\`:
1. Critical Above-the-Fold Data: Product title, hero image, and price are awaited synchronously in the \`loader\`. The server immediately streams the initial HTML shell (sub-100ms TTFB).
2. Non-Critical Below-the-Fold Data: Reviews and recommendations are deferred using Remix \`defer()\`.
3. Client Rendering: The browser renders the buy box instantly, and streams in the reviews dynamically as they resolve in the background wrapped in \`<Suspense>\`!`,
                callout: {
                    type: 'tip',
                    text: 'Deferred streaming guarantees that a sluggish third-party review API will never block initial page load or hurt your Google Core Web Vitals.',
                },
            },
            {
                heading: 'Managing Headless Cart State and Seamless Checkout Handoff',
                body: `The Headless Checkout Flow:
1. Client actions mutate cart state via \`/cart\` Remix route.
2. The route calls Storefront API \`cartLinesAdd\` or \`cartLinesUpdate\`.
3. Shopify's server returns updated cart totals and an encrypted \`checkoutUrl\`.
4. When the customer clicks "Proceed to Checkout", the browser navigates to \`cart.checkoutUrl\`.
5. The customer completes payment on Shopify’s rock-solid checkout, and is redirected back to the headless Thank You page upon completion!`,
                callout: {
                    type: 'shopify',
                    text: 'The cart token persists across the headless domain and Shopify checkout domain, ensuring zero loss of line items or customer contact details.',
                },
            }
        ],
        mistakes: [
            'Blocking initial page load with non-critical queries (like reviews) instead of using Remix `defer` and streaming.',
            'Not using Hydrogen’s optimized `<Image>` component, losing automatic WebP/AVIF format optimization and responsive srcset generation.',
        ],
        checklist: [
            'Scaffolded a Hydrogen project with the CLI.',
            'Implemented deferred data loading with Remix `Await` and `Suspense`.',
            'Connected the headless cart provider and verified checkout redirect.',
        ],
        furtherReading: [
            { title: 'Hydrogen Documentation', url: 'https://shopify.dev/docs/custom-storefronts/hydrogen' },
        ],
    },
    {
        id: 'dev-m13-l3',
        moduleId: 'dev-module-13',
        slug: 'oxygen-hosting-deployment-and-subrequest-caching',
        title: 'Oxygen Hosting, Subrequest Caching & Stale-While-Revalidate',
        estimatedMinutes: 45,
        objectives: [
            'Deploy Hydrogen storefronts to Shopify Oxygen global edge hosting directly via Git',
            'Configure subrequest caching strategies: `CacheShort`, `CacheLong`, and `stale-while-revalidate`',
            'Set up preview environments and manage environment variables across staging and production',
            'Monitor edge health, server logs, and Web Vitals analytics inside the Shopify Admin',
        ],
        videoSource: {
            title: 'How To Deploy Shopify Hydrogen To Oxygen',
            embedUrl: 'https://www.youtube-nocookie.com/embed/du5ogaTSA0k',
            channel: 'True Storefront',
            duration: '6:29',
            description: 'Curated YouTube walkthrough from True Storefront that complements this lesson. Watch it alongside the written sections below.',
            topics: ['Oxygen Hosting', 'Subrequest Caching', 'Edge Workers', 'Stale-While-Revalidate'],
        },
        sections: [
            {
                heading: 'Deploying Hydrogen to Shopify Oxygen Global Edge Hosting',
                body: `Shopify Oxygen is the global serverless hosting platform built directly into Shopify Plus, designed specifically for Hydrogen applications.
Key Advantages:
• Co-Located with Shopify Core: Oxygen edge workers run within milliseconds of Shopify's primary database and Storefront API nodes, slashing API latency.
• Zero DevOps Maintenance: Fully managed serverless workers with zero server configuration or Kubernetes clusters to manage.
• Git-Driven Deployments: Pushing a branch to GitHub automatically triggers an Oxygen build and deploys to production or an ephemeral preview URL.`,
                callout: {
                    type: 'shopify',
                    text: 'Every Shopify Plus store includes free Oxygen hosting capacity capable of handling tens of thousands of concurrent shoppers during peak flash sales.',
                },
            },
            {
                heading: 'Subrequest Caching Strategies: CacheShort, CacheLong & Stale-While-Revalidate',
                body: `Hydrogen features an intelligent subrequest caching engine:
• \`CacheShort\`: Caches data for 1 second, serving stale data for up to 1 day while revalidating in the background (\`stale-while-revalidate\`). Ideal for inventory and prices.
• \`CacheLong\`: Caches for 1 hour, serving stale for up to 1 week. Ideal for static collections, navigation menus, and blog articles.
• Purging via Webhooks: When a product is updated in the Admin, Shopify automatically invalidates corresponding Oxygen edge cache keys!`,
                code: `// Remix Loader with Oxygen Subrequest Caching Strategy
import { type LoaderFunctionArgs } from '@remix-run/node';

export async function loader({ context, params }: LoaderFunctionArgs) {
  const { storefront } = context;

  const { product } = await storefront.query(PRODUCT_QUERY, {
    variables: { handle: params.handle },
    // Cache at edge for 1 minute; serve stale for 1 day while revalidating in background
    cache: storefront.CacheShort()
  });

  if (!product) {
    throw new Response('Product not found', { status: 404 });
  }

  return { product };
}

const PRODUCT_QUERY = \`#graphql
  query ProductDetails($handle: String!) {
    product(handle: $handle) {
      id
      title
    }
  }
\`;`,
                language: 'javascript',
            },
            {
                heading: 'Managing Environments, Previews & Secret Variables',
                body: `Managing Oxygen deployment pipelines:
• Production vs. Staging Environments: Each Git branch maps to an isolated Oxygen environment with its own environment variables (\`PUBLIC_STORE_DOMAIN\`, \`PRIVATE_STOREFRONT_API_TOKEN\`).
• Pull Request Preview Deployments: Opening a GitHub PR automatically creates an ephemeral, password-protected preview URL (e.g. \`https://pr-42-store.oxygen.dev\`) for design review and stakeholder testing.`,
                callout: {
                    type: 'tip',
                    text: 'Always store private API tokens in Oxygen environment variables. Never commit secret tokens into public GitHub repositories.',
                },
            },
            {
                heading: 'Monitoring Edge Health, Server Logs, and Web Vitals in Admin',
                body: `Operating a production headless store requires real-time telemetry:
• Oxygen Analytics Dashboard: Inside Shopify Admin -> Sales Channels -> Hydrogen, monitor:
  - Total HTTP request volume.
  - Subrequest cache hit ratio (healthy target: > 85%).
  - 5xx and 4xx server exception rates.
  - Real-world Core Web Vitals (LCP, INP, CLS) captured from field users.`,
                callout: {
                    type: 'note',
                    text: 'A low cache hit ratio (< 50%) indicates misconfigured caching policies in your loaders, leading to unnecessary Storefront API query costs.',
                },
            }
        ],
        mistakes: [
            'Caching cart or customer-specific queries, leading to data leaks between different visitors.',
            'Not configuring stale-while-revalidate, causing edge cache misses to block user requests.',
        ],
        checklist: [
            'Connected a GitHub repository to Shopify Oxygen.',
            'Configured subrequest caching on product queries.',
            'Verified zero-downtime automated deployment on merge.',
        ],
        furtherReading: [
            { title: 'Oxygen Hosting Guide', url: 'https://shopify.dev/docs/custom-storefronts/oxygen' },
        ],
    },
    // =========================================================================
    // WEEK 14: Shopify Plus B2B & Wholesale Architecture (dev-module-14)
    // =========================================================================
    {
        id: 'dev-m14-l1',
        moduleId: 'dev-module-14',
        slug: 'shopify-plus-b2b-architecture-companies-locations-roles',
        title: 'Shopify B2B Architecture: Companies, Locations, Customers & Roles',
        estimatedMinutes: 50,
        objectives: [
            'Analyze the Shopify Plus native B2B data model: Companies, Company Locations, Customers, and Purchasing Roles',
            'Configure B2B permissions: Ordering only, Ordering & viewing location history, or Location Administrator',
            'Understand Blended Stores (B2C + B2B on a single store) vs. Dedicated Wholesale Stores',
            'Query B2B company context in Liquid and Storefront API (`customer.b2b?`, `company_location`)',
        ],
        videoSource: {
            title: 'Shopify B2B Setup Tutorial: Wholesale Pricing, Company Profiles, and Net Terms',
            embedUrl: 'https://www.youtube-nocookie.com/embed/ohq0c-v1fK8',
            channel: 'Ecom Mastery',
            duration: '11:14',
            description: 'Curated YouTube walkthrough from Ecom Mastery that complements this lesson. Watch it alongside the written sections below.',
            topics: ['Shopify B2B', 'Companies & Locations', 'Wholesale Roles', 'Blended Stores'],
        },
        sections: [
            {
                heading: 'Shopify Plus Native B2B Architecture: The 4 Core Entities',
                body: `Shopify Plus features an enterprise native B2B wholesale commerce suite built directly into the core platform (no third-party apps required):
The B2B Data Hierarchy:
1. Company: The overarching corporate client entity (e.g., "Acme Retailers Inc.").
2. Company Location: Physical operating branches or distribution centers belonging to the company (e.g., "Chicago Warehouse", "Seattle Store #104"). Each location has distinct tax IDs, shipping addresses, and payment terms.
3. Customer: Individual employees associated with the company (e.g., procurement agents, store managers).
4. Role & Permissions: Granular purchasing controls assigned to each customer at specific locations.`,
                callout: {
                    type: 'shopify',
                    text: 'Shopify B2B runs on the exact same infrastructure as direct-to-consumer (D2C), allowing merchants to manage wholesale and retail orders in a single unified Admin.',
                },
            },
            {
                heading: 'Configuring B2B Roles & Purchasing Permissions',
                body: `Preventing rogue wholesale orders via permission tiers:
• Ordering Only: Employee can build carts and submit orders, but cannot view company-wide order histories.
• Ordering & Viewing Location History: Can place orders and inspect past shipments across their designated location.
• Location Administrator: Can manage delivery addresses, assign staff roles, and configure location payment terms.
Approvals Workflow:
Require managers to approve purchase orders before orders are submitted to fulfillment.`,
                callout: {
                    type: 'tip',
                    text: 'B2B roles are enforced natively at the platform level; unauthorized users are mathematically blocked from submitting orders.',
                },
            },
            {
                heading: 'Blended Stores (B2C + B2B) vs. Dedicated Wholesale Stores',
                body: `Architecting wholesale deployment:
• Blended Store: A single storefront serving everyday retail consumers (B2C) and logged-in wholesale buyers (B2B). When a wholesale buyer logs in via New Customer Accounts, the store dynamically transforms: wholesale catalogs, volume pricing tiers, and Net 30 terms activate automatically.
• Dedicated Wholesale Store: A completely separate Shopify store dedicated exclusively to B2B operations with a private password gate. Ideal for brands with completely divergent catalogs and complex ERP integrations.`,
                callout: {
                    type: 'note',
                    text: 'Blended stores save merchants tens of thousands in development costs because you maintain a single unified theme codebase.',
                },
            },
            {
                heading: 'Querying B2B Context in Liquid & Storefront API',
                body: `Detecting wholesale buyers in Liquid templates:
• \`customer.b2b?\`: Boolean flag indicating whether the active logged-in customer represents a B2B company location.
• \`customer.current_company\`: Accesses the active company entity.
• \`customer.current_location\`: Accesses the active company location entity, including payment terms and tax-exempt IDs.`,
                code: `<!-- Liquid B2B Conditional Rendering Example -->
{% if customer.b2b? %}
  <div class="b2b-wholesale-banner">
    <span class="icon-building">🏢</span>
    <span>Wholesale Account: <strong>{{ customer.current_company.name }}</strong> ({{ customer.current_location.name }})</span>
    <span class="badge-terms">Terms: {{ customer.current_location.payment_terms.name }}</span>
  </div>
{% else %}
  <div class="retail-welcome-bar">
    <span>Welcome! Free shipping on orders over $50.</span>
  </div>
{% endif %}`,
                language: 'html',
            }
        ],
        mistakes: [
            'Using customer tags (e.g. "wholesale") on Shopify Plus instead of native B2B Companies and Catalogs.',
            'Forgetting that B2B requires New Customer Accounts to authenticate wholesale buyers.',
        ],
        checklist: [
            'Created a B2B Company with two separate Locations.',
            'Assigned customer contacts with different purchasing permissions.',
            'Tested the `customer.b2b?` Liquid conditional check.',
        ],
        furtherReading: [
            { title: 'Shopify B2B Overview', url: 'https://shopify.dev/docs/apps/b2b' },
        ],
    },
    {
        id: 'dev-m14-l2',
        moduleId: 'dev-module-14',
        slug: 'price-lists-catalogs-volume-pricing-net-payment-terms',
        title: 'Price Lists, Catalogs, Volume Pricing Breakpoints & Net Terms',
        estimatedMinutes: 50,
        objectives: [
            'Create custom B2B Catalogs with fixed pricing and percentage adjustments (+/- %)',
            'Configure Volume Pricing Breakpoints (e.g., 1-9 units: $50, 10-49 units: $42, 50+ units: $35)',
            'Enforce Quantity Rules: Minimum order quantities (MOQ), maximums, and increment packaging steps (cases of 12)',
            'Set up automated Net Payment Terms (Net 15, Net 30, Net 60) and payment on fulfillment',
        ],
        videoSource: {
            title: 'How to Set up Quantity rules and Volume pricing in B2B | Hyper Theme Tutorial',
            embedUrl: 'https://www.youtube-nocookie.com/embed/2z7b0uat25w',
            channel: 'FoxEcom',
            duration: '5:23',
            description: 'Curated YouTube walkthrough from FoxEcom that complements this lesson. Watch it alongside the written sections below.',
            topics: ['B2B Catalogs', 'Volume Pricing Breakpoints', 'Quantity Rules', 'Net Terms'],
        },
        sections: [
            {
                heading: 'Custom B2B Catalogs: Fixed Pricing & Percentage Adjustments',
                body: `In wholesale, different buyers receive different pricing based on contracted agreements:
• Catalogs: Curated product selections assigned to specific Companies or Company Locations.
• Price Lists:
  - Fixed Pricing: Explicit custom prices for specific SKUs (e.g. Standard MSRP $100 -> Acme Price $58.00).
  - Percentage Adjustment: Sitewide or collection-wide percentage markdowns (e.g. "Tier 1 Distributor: 35% off retail").
• Catalog Exclusives: Completely hide consumer products from wholesale buyers, or hide bulk industrial SKUs from everyday retail shoppers.`,
                callout: {
                    type: 'shopify',
                    text: 'Catalogs are evaluated natively on Shopify servers. When a B2B buyer logs in, product drops automatically return catalog-specific prices.',
                },
            },
            {
                heading: 'Volume Pricing Breakpoints: Tiered Quantity Discounts',
                body: `Incentivizing bulk volume purchasing:
• Quantity Breakpoints: Define price steps directly in the catalog:
  - 1–9 units: $45.00 each
  - 10–49 units: $38.00 each
  - 50+ units: $30.00 each
• Theme Integration: Dawn and modern OS 2.0 themes include built-in Liquid blocks that render a native "Volume Pricing" table on the PDP, showing wholesale buyers their potential savings!`,
                callout: {
                    type: 'tip',
                    text: 'Volume pricing tables update automatically in real-time as the buyer changes the quantity selector input on the PDP.',
                },
            },
            {
                heading: 'Quantity Rules: Minimums (MOQ), Maximums, and Case Multipliers',
                body: `Enforcing manufacturing and warehouse packaging packaging constraints:
• Minimum Order Quantity (MOQ): Require wholesale buyers to purchase at least 24 units of an item.
• Maximum Order Quantity: Prevent single buyers from exhausting entire warehouse allocations.
• Quantity Increments (Case Packs): Enforce that products must be ordered in exact packaging multiples (e.g. cases of 12 or pallets of 144). The quantity selector automatically steps in increments of 12!`,
                code: `<!-- Liquid Snippet: Rendering B2B Quantity Rules on PDP -->
{%- assign quantity_rule = product.selected_or_first_available_variant.quantity_rule -%}

<div class="b2b-quantity-rules">
  {% if quantity_rule.min > 1 %}
    <span class="rule-badge">Min Order: {{ quantity_rule.min }} units</span>
  {% endif %}
  {% if quantity_rule.increment > 1 %}
    <span class="rule-badge">Sold in cases of {{ quantity_rule.increment }}</span>
  {% endif %}
</div>

<!-- Enforce rules on quantity input tag -->
<input
  type="number"
  name="quantity"
  min="{{ quantity_rule.min | default: 1 }}"
  max="{{ quantity_rule.max }}"
  step="{{ quantity_rule.increment | default: 1 }}"
  value="{{ quantity_rule.min | default: 1 }}"
  class="b2b-qty-input"
>`,
                language: 'html',
            },
            {
                heading: 'Automating Net Payment Terms (Net 15, Net 30, Net 60)',
                body: `Wholesale buyers rarely pay via credit card at the time of purchase; they operate on deferred credit terms:
• Supported Net Terms: Net 7, Net 15, Net 30, Net 60, Net 90, or Payment on Fulfillment.
• Checkout Experience: When an eligible B2B buyer checks out, they do NOT enter a credit card. They select "Pay on Terms" and submit the order instantly.
• Admin Invoicing: Shopify automatically generates an invoice with a due date calculated from terms. The buyer can pay later via bank transfer (ACH/wire) or credit card from their customer account portal.`,
                callout: {
                    type: 'shopify',
                    text: 'Automated payment reminders can be dispatched via Shopify Flow as invoices approach their Net 30 due dates.',
                },
            }
        ],
        mistakes: [
            'Hardcoding volume tables in descriptions instead of using native Shopify Quantity Price Breaks.',
            'Failing to validate quantity increment steps in the cart drawer before checkout initiation.',
        ],
        checklist: [
            'Configured a custom Catalog assigned to a specific Company Location.',
            'Created quantity price breaks (tiers) on a test product.',
            'Configured minimum order quantity and increment rules (e.g. MOQ 10, step 5).',
            'Verified checkout processes with Net 30 terms without upfront credit card entry.',
        ],
        furtherReading: [
            { title: 'B2B Catalogs and Pricing Documentation', url: 'https://shopify.dev/docs/apps/b2b/catalogs' },
        ],
    },
    {
        id: 'dev-m14-l3',
        moduleId: 'dev-module-14',
        slug: 'customizing-b2b-storefronts-draft-orders-and-checkout',
        title: 'Customizing B2B Storefronts: Conditional Liquid & Custom Checkout Rules',
        estimatedMinutes: 45,
        objectives: [
            'Tailor theme navigation and header menus conditionally for B2B vs B2C visitors',
            'Build Quick Order Forms allowing wholesale buyers to input SKUs and add 50 items to cart simultaneously',
            'Use Shopify Functions to enforce B2B checkout validation rules (e.g. minimum $1,000 order total for Net terms)',
            'Automate Draft Order conversions and custom tax-exemption verification',
        ],
        videoSource: {
            title: 'Launch your Shopify wholesale store in 15 minutes',
            embedUrl: 'https://www.youtube-nocookie.com/embed/dc8t2P5y7YQ',
            channel: 'Jody Edgar — 30 Years of Shipping',
            duration: '15:05',
            description: 'Curated YouTube walkthrough from Jody Edgar — 30 Years of Shipping that complements this lesson. Watch it alongside the written sections below.',
            topics: ['Quick Order Form', 'B2B Storefront Customization', 'Cart Validation', 'Wholesale Matrix'],
        },
        sections: [
            {
                heading: 'Tailoring Theme Navigation & Header Menus Conditionally for B2B',
                body: `In a Blended Store (serving both retail and wholesale), header menus must adapt dynamically:
• Conditional Liquid Menus:
\`\`\`liquid
{% if customer.b2b? %}
  {% assign active_menu = linklists['b2b-wholesale-navigation'] %}
{% else %}
  {% assign active_menu = linklists['main-menu'] %}
{% endif %}
\`\`\`
• Wholesale Links: Display links to "Bulk Order Form", "Line Sheet PDFs", and "Account Invoices" exclusively for authenticated B2B buyers while hiding consumer lifestyle content.`,
                callout: {
                    type: 'tip',
                    text: 'Conditional navigation ensures wholesale buyers are guided directly to bulk ordering tools without browsing consumer marketing carousels.',
                },
            },
            {
                heading: 'Building High-Velocity Quick Order Forms for Wholesale Buyers',
                body: `Wholesale buyers ordering 50 SKUs do not want to click through 50 individual PDPs. They require a matrix-style Quick Order Form:
• Table Interface: Displays SKUs, thumbnail, title, in-stock quantity, and a number input field for every variant.
• 1-Click Multi-Item Addition: Clicking "Add All to Cart" performs a single POST to \`/cart/add.js\` passing an array of \`{ id, quantity }\` objects, populating the cart in milliseconds!`,
                code: `// JavaScript Bulk Add Handler for B2B Quick Order Table
async function addBulkItemsToCart(itemsArray: { id: number; quantity: number }[]) {
  // Filter out items with 0 quantity
  const validItems = itemsArray.filter(i => i.quantity > 0);

  if (validItems.length === 0) {
    alert('Please enter a quantity for at least one item.');
    return;
  }

  try {
    const response = await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: validItems })
    });

    if (response.ok) {
      window.location.href = '/checkout';
    } else {
      const errData = await response.json();
      alert(\`Bulk order error: \${errData.description}\`);
    }
  } catch (err) {
    console.error('Failed to submit bulk wholesale order:', err);
  }
}`,
                language: 'javascript',
            },
            {
                heading: 'Enforcing B2B Validation Rules via Shopify Functions',
                body: `Protecting business margins with custom backend checkout validation:
• Rule Examples:
  - Require a minimum order subtotal of $1,000 to utilize Net 30 terms.
  - Require orders over $5,000 to be assigned to Freight delivery rather than parcel courier.
• Enforced via Shopify Functions (WebAssembly): Functions execute in under 5ms, halting checkout progression if wholesale rules are violated.`,
                callout: {
                    type: 'shopify',
                    text: 'Functions validate rules on Shopify servers, making it impossible for buyers to bypass limits by tampering with client-side JavaScript.',
                },
            },
            {
                heading: 'Draft Order Conversions & Custom Tax Exemption Automation',
                body: `Managing wholesale tax and quotation flows:
• Tax Exemption Verification: B2B companies with verified resale certificates can be marked as \`tax_exempt = true\` in Shopify Admin. Taxes are automatically zeroed at checkout.
• Converting Inquiries to Draft Orders: Sales representatives can assemble draft orders with negotiated custom line-item discounts and email an invoice link directly to the wholesale procurement officer.`,
                callout: {
                    type: 'warning',
                    text: 'Always store verified resale certificate numbers in Company Location metafields for state tax audit compliance.',
                },
            }
        ],
        mistakes: [
            'Exposing B2B quick order forms to retail B2C customers.',
            'Not providing clear validation feedback when a wholesale order does not meet minimum spend requirements.',
        ],
        checklist: [
            'Built a B2B Quick Order Form section in Liquid.',
            'Implemented conditional visibility using `customer.b2b?`.',
            'Enforced minimum B2B order validation via Shopify Functions.',
        ],
        furtherReading: [
            { title: 'Customizing B2B Themes Guide', url: 'https://shopify.dev/docs/themes/b2b' },
        ],
    },
    // =========================================================================
    // WEEK 15: Shopify Flow Custom Extensions & ERP Integrations (dev-module-15)
    // =========================================================================
    {
        id: 'dev-m15-l1',
        moduleId: 'dev-module-15',
        slug: 'shopify-flow-architecture-triggers-conditions-actions',
        title: 'Shopify Flow Architecture: Visual Automations & Trigger-Action Pipelines',
        estimatedMinutes: 50,
        objectives: [
            'Understand Shopify Flow: Low-code automation engine available on Basic, Shopify, Advanced, and Plus',
            'Deconstruct the Flow pipeline: Triggers (events), Conditions (boolean logic), and Actions (mutations)',
            'Automate back-office tasks: Tagging VIP customers, flagging high-risk fraud orders, and low-inventory reorders',
            'Understand Flow execution limits, run logs, and payload inspection for debugging',
        ],
        videoSource: {
            title: 'Shopify Flow Tutorial for Beginners - How to use the Shopify Flow App',
            embedUrl: 'https://www.youtube-nocookie.com/embed/edym2_mCj2I',
            channel: 'Coding with Jan - Shopify Developer',
            duration: '17:41',
            description: 'Curated YouTube walkthrough from Coding with Jan - Shopify Developer that complements this lesson. Watch it alongside the written sections below.',
            topics: ['Shopify Flow', 'Triggers & Actions', 'E-commerce Automation', 'Workflow Optimization'],
        },
        sections: [
            {
                heading: 'Shopify Flow Architecture: Visual Automations Across All Plans',
                body: `Shopify Flow is the platform’s native, event-driven automation engine.
Availability & Scope:
Originally restricted to Shopify Plus, Shopify Flow is now available on Basic, Shopify, Advanced, and Plus plans!
Why Flow Matters:
It replaces fragile third-party automation apps (Zapier/Make) with zero-cost, native platform execution.
The 3 Architectural Primitives:
1. Trigger: The event that starts the workflow (\`Order created\`, \`Inventory quantity changed\`, \`Customer created\`).
2. Condition: Boolean logic gates evaluating object properties (e.g., \`order.totalPriceSet.shopMoney.amount >= 200.00\`).
3. Action: The resulting mutation executed by Shopify (e.g., \`Add order tag\`, \`Send internal email\`, \`Create draft order\`).`,
                callout: {
                    type: 'shopify',
                    text: 'Shopify Flow workflows execute on Shopify’s internal infrastructure, delivering near-instant event processing with zero API usage costs.',
                },
            },
            {
                heading: 'Deconstructing the Flow Pipeline: Triggers, Conditions & Actions',
                body: `Building robust automated workflows:
• Logic Nesting: Combine multiple conditions with AND / OR operators.
• Multiple Action Branches: A single condition can branch into multiple actions (e.g. tag order as VIP AND dispatch a Slack notification to the fulfillment team).
• Liquid Variables in Actions: You can inject dynamic Liquid expressions directly into action payloads (e.g. \`{{ order.name }} placed by {{ order.customer.email }}\`).`,
                callout: {
                    type: 'tip',
                    text: 'Use Liquid expressions in Flow email actions to format custom summaries without writing custom app code.',
                },
            },
            {
                heading: 'High-Impact Workflows: VIP Tagging, Fraud Alerts & Low-Stock Alerts',
                body: `Standard enterprise Flow automations deployed across top stores:
1. VIP Customer Tagging:
   - Trigger: \`Order created\`.
   - Condition: \`customer.amountSpent.amount > 1000.00\`.
   - Action: \`Add customer tag: 'VIP'\`.
2. Fraud Prevention:
   - Trigger: \`Order risk analyzed\`.
   - Condition: \`order.risk.level == 'HIGH'\`.
   - Action: \`Hold fulfillment order\` AND \`Send staff alert\`.
3. Low Inventory Supplier Reordering:
   - Trigger: \`Inventory item quantity changed\`.
   - Condition: \`inventoryLevel.available < 10\`.
   - Action: \`Send HTTP webhook to supplier warehouse\`.`,
                callout: {
                    type: 'warning',
                    text: 'Always test workflows using mock test orders before turning them live on production stores to prevent unintended bulk tagging.',
                },
            },
            {
                heading: 'Execution Limits, Run Logs & Payload Inspection for Debugging',
                body: `Debugging and monitoring Flow executions:
• Run History: Every workflow execution is recorded in Flow Admin -> "Run history".
• Real-Time Payload Inspector: Inspect the exact JSON event payload that triggered the run, step through which condition branches evaluated to true/false, and review execution logs for third-party HTTP action calls.
• Error Handling & Retries: If an action fails (e.g. an external API returned 500), Flow logs the error and provides a "Retry run" button in the admin interface.`,
                code: `// Conceptual Flow Action Payload (JSON representation)
{
  "workflow_id": "wf_vip_tagging_2026",
  "trigger": "shopify/orders/create",
  "evaluated_conditions": [
    {
      "field": "order.total_price",
      "operator": "GREATER_THAN_OR_EQUAL",
      "target_value": 250.00,
      "actual_value": 312.50,
      "result": true
    }
  ],
  "executed_actions": [
    {
      "action_type": "shopify/tags/add",
      "target": "gid://shopify/Customer/98214901",
      "tag": "high_value_shopper",
      "status": "SUCCESS"
    }
  ]
}`,
                language: 'json',
            }
        ],
        mistakes: [
            'Writing custom standalone webhook servers for simple tasks that native Shopify Flow handles with zero maintenance.',
            'Creating infinite loops (e.g. a workflow triggered on "Product Updated" that executes an action that updates the product).',
        ],
        checklist: [
            'Built and activated a multi-step workflow in Shopify Flow.',
            'Tested the workflow and inspected execution history in the Flow Run Log.',
            'Handled conditional branching based on order properties.',
        ],
        furtherReading: [
            { title: 'Shopify Flow Documentation', url: 'https://help.shopify.com/en/manual/shopify-flow' },
        ],
    },
    {
        id: 'dev-m15-l2',
        moduleId: 'dev-module-15',
        slug: 'building-custom-flow-triggers-and-actions-in-apps',
        title: 'Building Custom App Triggers & Actions for Shopify Flow',
        estimatedMinutes: 50,
        objectives: [
            'Extend Shopify Flow by authoring custom Triggers and Actions inside your Shopify App',
            'Define Flow schemas in `shopify.extension.toml` declaring input fields and output payload types',
            'Emit custom triggers programmatically via GraphQL `flowTriggerReceive` mutation',
            'Receive and execute Flow Action webhooks with HMAC authentication',
        ],
        videoSource: {
            title: 'How to Build a Custom Shopify Flow Action',
            embedUrl: 'https://www.youtube-nocookie.com/embed/hKiOi9u9noE',
            channel: 'Stacking Context',
            duration: '11:20',
            description: 'Developer tutorial on authoring custom Shopify Flow Actions inside a Shopify App, defining action schemas, and handling webhook execution.',
            topics: ['Shopify Flow Extensions', 'Custom Actions', 'flow_action Schema', 'App Integration'],
        },
        sections: [
            {
                heading: 'Extending Shopify Flow: Authoring Custom Triggers and Actions',
                body: `Third-party apps can integrate seamlessly into Shopify Flow by declaring custom Triggers and Actions.
Why This Unlocks Massive App Value:
Merchants can connect your custom app to any other app in their stack (Klaviyo, Gorgias, Slack, ShipStation) using Flow’s drag-and-drop canvas!
Examples:
• Custom Trigger: Your loyalty app emits a \`Loyalty Tier Unlocked\` trigger.
• Custom Action: A subscription app exposes an \`Apply 20% Discount to Next Renewal\` action.`,
                callout: {
                    type: 'shopify',
                    text: 'Apps supporting Shopify Flow enjoy a 40% higher retention rate because they become deeply entrenched in the merchant’s daily operations.',
                },
            },
            {
                heading: 'Defining Flow Schemas in shopify.extension.toml',
                body: `Declaring custom Flow triggers and actions in your app configuration:
• Defining an Action: Declare input fields (e.g. customer ID, points to deduct).
• Defining a Trigger: Declare output fields made available to downstream Flow steps.`,
                code: `# shopify.extension.toml - Custom Flow Action Definition
[[extensions]]
type = "flow_action"
name = "Issue Loyalty Voucher"
handle = "issue-loyalty-voucher"
description = "Generates a unique one-time discount code for a customer."
runtime_url = "https://my-app.fly.dev/api/flow/action"

  [[extensions.settings]]
  key = "voucher_amount"
  name = "Voucher Dollar Amount"
  type = "number_integer"
  required = true

  [[extensions.settings]]
  key = "customer_id"
  name = "Customer ID"
  type = "customer_reference"
  required = true`,
                language: 'json',
            },
            {
                heading: 'Emitting Triggers via the flowTriggerReceive GraphQL Mutation',
                body: `When an event occurs in your app, fire a Flow trigger into the merchant’s store:
• Execute \`flowTriggerReceive\`:
  Pass your app’s trigger handle and a payload of variables matching your schema.
• Instant Execution: Shopify immediately evaluates all merchant workflows listening for that trigger!`,
                code: `# GraphQL Mutation: Emitting a Custom Flow Trigger
mutation EmitCustomFlowTrigger($handle: String!, $payload: JSON!) {
  flowTriggerReceive(
    handle: $handle,
    payload: $payload
  ) {
    userErrors {
      field
      message
    }
  }
}

# Example Variables:
# {
#   "handle": "vip-tier-promoted",
#   "payload": {
#     "customer_email": "sarah@example.com",
#     "new_tier_name": "Platinum",
#     "loyalty_points_balance": 1250
#   }
# }`,
                language: 'json',
            },
            {
                heading: 'Receiving & Executing Flow Action Webhooks with HMAC Verification',
                body: `When a Flow workflow executes your custom Action:
• Shopify dispatches an HTTP POST request to your app’s \`runtime_url\`.
• The payload contains the configured input values (\`voucher_amount\`, \`customer_id\`).
• Security Mandate:
  Verify the \`X-Shopify-Hmac-Sha256\` header on the incoming action request using your app secret to ensure the execution request legitimately originated from Shopify Flow!`,
                callout: {
                    type: 'warning',
                    text: 'Always verify HMAC signatures on Flow Action endpoints. Never execute backend mutations based on unverified HTTP payloads.',
                },
            }
        ],
        mistakes: [
            'Omitting data validation on incoming Flow Action webhook payloads.',
            'Not providing descriptive labels and helper text for merchant configuration fields.',
        ],
        checklist: [
            'Scaffolded a Flow extension in an existing app.',
            'Defined input fields in the extension schema.',
            'Emitted an event using `flowTriggerReceive`.',
            'Handled incoming action execution webhook.',
        ],
        furtherReading: [
            { title: 'Shopify Flow Extensions Guide', url: 'https://shopify.dev/docs/apps/flow' },
        ],
    },
    {
        id: 'dev-m15-l3',
        moduleId: 'dev-module-15',
        slug: 'multi-location-inventory-routing-and-erp-sync',
        title: 'Multi-Location Inventory Routing, Fulfillment Services & High-Volume ERP Sync',
        estimatedMinutes: 50,
        objectives: [
            'Understand Shopify Location architecture: Retail POS stores, warehouses, and dropship fulfillment centers',
            'Master the Inventory Levels API (`inventoryLevelsSet`, `inventoryAdjustQuantities`)',
            'Configure Custom Fulfillment Services and track shipment tracking numbers with carrier URLs',
            'Architect robust ERP/WMS synchronization pipelines (NetSuite, SAP, Brightpearl) handling inventory race conditions',
        ],
        videoSource: {
            title: 'Multi-Location Inventory: Unlocking New Opportunities (Shopify Unite Track 2018)',
            embedUrl: 'https://www.youtube-nocookie.com/embed/k9f49DMlERc',
            channel: 'ShopifyDevs',
            duration: '30:14',
            description: 'Curated YouTube walkthrough from ShopifyDevs that complements this lesson. Watch it alongside the written sections below.',
            topics: ['Inventory API', 'Multi-Location Routing', 'ERP Integration', 'Fulfillment Services'],
        },
        sections: [
            {
                heading: 'Shopify Locations Architecture: Retail POS, 3PL & Fulfillment Centers',
                body: `Shopify supports multi-location inventory tracking across complex supply chains:
Location Types:
• Physical Retail Stores: Run Shopify POS, with inventory decremented upon in-store checkout.
• Regional Warehouses / 3PLs: Central fulfillment hubs holding bulk inventory for regional delivery.
• Dropship Locations: Virtual inventory managed by external third-party suppliers.
Fulfillment Priority Routing:
Merchants configure location routing rules (e.g., fulfill orders from the nearest location with complete inventory to minimize shipping transit zones).`,
                callout: {
                    type: 'shopify',
                    text: 'Shopify automatically calculates shipping rates and splits fulfillments across multiple locations if an order cannot be satisfied from a single warehouse.',
                },
            },
            {
                heading: 'Mastering the Inventory Levels API: Adjustments vs. Absolute Quantities',
                body: `Updating inventory in GraphQL:
• \`inventorySetOnHandQuantities\`: Sets the absolute, exact stock level at a specific location (used for periodic full physical inventory counts).
• \`inventoryAdjustQuantities\`: Increments or decrements inventory by a relative delta (e.g. \`+50\` received units or \`-2\` damaged items).
The Race Condition Rule:
Always use \`inventoryAdjustQuantities\` for real-time inventory updates! If two ERP systems write absolute values simultaneously, one will overwrite the other. Delta adjustments apply sequentially without data loss.`,
                code: `# GraphQL Mutation: Adjusting Inventory Quantities Safely
mutation AdjustInventoryDelta($input: InventoryAdjustQuantitiesInput!) {
  inventoryAdjustQuantities(input: $input) {
    inventoryAdjustmentGroup {
      id
      changes {
        name
        delta
        quantityAfterChange
      }
    }
    userErrors {
      field
      message
    }
  }
}

# Example Variables:
# {
#   "input": {
#     "reason": "correction",
#     "name": "available",
#     "changes": [
#       {
#         "inventoryItemId": "gid://shopify/InventoryItem/492019201",
#         "locationId": "gid://shopify/Location/88219012",
#         "delta": 25
#       }
#     ]
#   }
# }`,
                language: 'json',
            },
            {
                heading: 'Custom Fulfillment Services & Tracking Carrier URLs',
                body: `When an order is dispatched:
• Fulfillment Creation: Execute \`fulfillmentCreateV2\` to mark line items as fulfilled.
• Tracking Metadata: Pass carrier name (\`FedEx\`, \`UPS\`, \`DHL\`), tracking number, and tracking URL.
• Customer Notification: Passing \`notifyCustomer: true\` triggers Shopify’s automated shipping confirmation email containing live tracking links.`,
                callout: {
                    type: 'tip',
                    text: 'Providing the direct carrier tracking URL ensures customers can click directly to the courier status from their mobile notifications.',
                },
            },
            {
                heading: 'Architecting Enterprise ERP/WMS Sync Pipelines (NetSuite, SAP)',
                body: `Connecting enterprise ERP systems (NetSuite, SAP, Microsoft Dynamics):
• Webhook Dead-Letter Queues (DLQ): If the ERP server is undergoing scheduled maintenance, un-ingested order webhooks must buffer safely in AWS SQS or RabbitMQ for automatic replay.
• Bi-Directional Reconciliation Jobs: Run a nightly reconciliation script comparing total Shopify stock levels against ERP warehouse totals to identify and fix drift.`,
                callout: {
                    type: 'warning',
                    text: 'Never allow an ERP sync script to run unthrottled against Shopify. Use a queue worker that respects GraphQL Leaky Bucket rate limits.',
                },
            }
        ],
        mistakes: [
            'Adjusting inventory globally without specifying the location ID, causing physical warehouse counts to desynchronize.',
            'Ignoring pending fulfillments when calculating available-to-promise (ATP) inventory levels.',
        ],
        checklist: [
            'Queried inventory across multiple locations using GraphQL.',
            'Adjusted quantities programmatically via `inventoryAdjustQuantities`.',
            'Created a fulfillment order and attached tracking numbers.',
        ],
        furtherReading: [
            { title: 'Inventory Levels API Reference', url: 'https://shopify.dev/docs/api/admin-graphql/latest/mutations/inventorySetQuantities' },
        ],
    },
    // =========================================================================
    // WEEK 16: Enterprise DevOps, Testing, CI/CD & Launch (dev-module-16)
    // =========================================================================
    {
        id: 'dev-m16-l1',
        moduleId: 'dev-module-16',
        slug: 'enterprise-theme-cicd-github-actions-theme-check',
        title: 'Enterprise Theme CI/CD: GitHub Actions, Automated Theme Check & Staging',
        estimatedMinutes: 50,
        objectives: [
            'Build an enterprise GitHub Actions CI/CD workflow for Shopify themes',
            'Enforce automated linting with `shopify theme check` and fail PRs on errors',
            'Deploy feature branches automatically into ephemeral preview themes for client QA',
            'Synchronize remote merchant `settings_data.json` back into the Git repository automatically',
        ],
        videoSource: {
            title: 'Set Up CI/CD for Shopify Theme Development Using GitHub Actions',
            embedUrl: 'https://www.youtube-nocookie.com/embed/sM9cC_xX4bw',
            channel: 'Shopify Theme Developer',
            duration: '14:15',
            description: 'Complete technical guide to configuring GitHub Actions CI/CD workflows, automated Theme Check linting, and preview theme deployments.',
            topics: ['GitHub Actions', 'Theme Check', 'CI/CD Deployment', 'Shopify CLI'],
        },
        sections: [
            {
                heading: 'Building an Enterprise GitHub Actions CI/CD Workflow for Themes',
                body: `Professional Shopify theme engineering requires automated continuous integration and continuous deployment (CI/CD).
The Enterprise Pipeline:
1. Developer pushes a feature branch (\`feat/cart-upsell\`).
2. GitHub Actions runner spins up an Ubuntu container.
3. Automated Linting: Runs Theme Check across all Liquid and JSON templates.
4. Preview Theme Deployment: The CLI deploys the branch to an unpublished development theme.
5. End-to-End Testing: Headless browser tests verify critical buying paths.
6. Pull Request Merge: Merging into \`main\` deploys directly to the live production theme with zero downtime!`,
                callout: {
                    type: 'shopify',
                    text: 'Shopify’s native GitHub integration can be combined with GitHub Actions to execute automated QA gates before code ever merges into production.',
                },
            },
            {
                heading: 'Enforcing Automated Theme Check Linting on Pull Requests',
                body: `Automating code quality gates in GitHub Actions:
• The Action installs Shopify CLI and executes \`shopify theme check --fail-level error\`.
• If any syntax error, deprecated Liquid tag, or missing translation key is detected, the workflow fails immediately, blocking the pull request from being merged.
• This guarantees that junior developers or agencies cannot accidentally ship broken Liquid to production.`,
                code: `# .github/workflows/theme-check.yml
name: Shopify Theme QA Gate

on:
  pull_request:
    branches: [ main, staging ]

jobs:
  lint-and-validate:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Install Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install Shopify CLI
        run: npm install -g @shopify/cli@latest

      - name: Execute Theme Check
        run: shopify theme check --fail-level error`,
                language: 'json',
            },
            {
                heading: 'Deploying Ephemeral Preview Themes for Client QA',
                body: `Client Review Workflow:
• Using \`shopify theme push --unpublished --theme "PR #\${{ github.event.number }} - \${{ github.head_ref }}"\`.
• The GitHub Action deploys the code to a new unpublished preview theme on the staging store.
• The Action automatically comments on the Pull Request with the direct preview link (\`https://store.com/?preview_theme_id=149819201\`)!
• Stakeholders can review and approve visual changes on real devices before merging to production.`,
                callout: {
                    type: 'tip',
                    text: 'Automated preview links eliminate manual deployment requests and speed up client design sign-off by 3x.',
                },
            },
            {
                heading: 'Synchronizing Remote Merchant Settings Back into Git',
                body: `The Settings Drift Dilemma:
Merchants modify colors and section layouts in the Shopify Theme Editor. If developers don't pull these changes before deploying code, the deployment overwrites merchant changes!
Automated Settings Sync Action:
Configure a scheduled cron GitHub Action (or webhook trigger) that runs daily:
\`shopify theme pull --only config/settings_data.json,templates/*.json\`
Commits any remote merchant changes back into Git automatically, eliminating merge conflicts!`,
                callout: {
                    type: 'warning',
                    text: 'Never deploy to production without pulling remote merchant settings. Overwriting merchant settings wipes out custom typography, colors, and banner copy.',
                },
            }
        ],
        mistakes: [
            'Allowing developers to push directly to production without PR review and automated CI checks.',
            'Overwriting merchant layout adjustments because `settings_data.json` was not synchronized prior to merging.',
        ],
        checklist: [
            'Created a `.github/workflows/theme-ci.yml` pipeline.',
            'Configured automated `shopify theme check` on Pull Requests.',
            'Set up preview theme deployments with Shopify CLI authentication.',
        ],
        furtherReading: [
            { title: 'Best Practices for Theme Version Control & CI/CD', url: 'https://shopify.dev/docs/themes/tools/github' },
        ],
    },
    {
        id: 'dev-m16-l2',
        moduleId: 'dev-module-16',
        slug: 'automated-e2e-testing-playwright-themes-and-apps',
        title: 'Automated End-to-End Testing with Playwright for Themes & Apps',
        estimatedMinutes: 55,
        objectives: [
            'Set up Playwright for automated browser testing on Shopify development stores',
            'Bypass password protection pages programmatically using session cookies',
            'Write end-to-end regression tests: Adding variant to cart, opening cart drawer, and navigating to checkout',
            'Test Checkout UI Extensions and custom discount calculations in headless Chromium/Firefox/WebKit',
        ],
        videoSource: {
            title: 'Shopify App Testing Strategies: Add End-to-End Testing Using Playwright',
            embedUrl: 'https://www.youtube-nocookie.com/embed/4-LwodVujTg',
            channel: 'Shopify Developer Testing',
            duration: '12:40',
            description: 'Step-by-step guide on configuring Playwright for automated E2E browser testing, cart drawer interactions, and regression testing on Shopify.',
            topics: ['Playwright', 'End-to-End Testing', 'Automated QA', 'Browser Automation'],
        },
        sections: [
            {
                heading: 'Setting Up Playwright for Automated Browser Testing on Shopify',
                body: `Playwright enables fast, reliable end-to-end browser automation across Chromium, Firefox, and WebKit (Safari).
Why E2E Testing is Vital for Ecommerce:
Unit tests cannot verify if a checkout button is visually clickable. Playwright launches a real headless browser, clicks real buttons, and asserts that cart drawers open and checkout pages load!
Installation:
\`npm init playwright@latest\``,
                callout: {
                    type: 'tip',
                    text: 'Playwright tests catch critical checkout regressions before they can impact paying customers on production.',
                },
            },
            {
                heading: 'Bypassing Development Store Password Pages Programmatically',
                body: `Development stores and staging environments are protected by a storefront password:
Programmatic Bypass in Playwright:
• When the browser visits the store, Playwright detects \`/password\`.
• Playwright fills the password input field, submits the form, and stores the resulting session cookie.
• All subsequent test suites reuse the authenticated storage state, bypassing the password screen instantly!`,
                code: `// Playwright Test: Automated PDP Add-to-Cart & Drawer Verification
import { test, expect } from '@playwright/test';

test.describe('E-Commerce Purchasing Pipeline', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to development store and bypass password if present
    await page.goto('https://dev-apparel.myshopify.com');
    if (await page.locator('input[type="password"]').isVisible()) {
      await page.fill('input[type="password"]', 'merchant_test_password');
      await page.click('button:has-text("Enter")');
    }
  });

  test('User can select variant and add to cart drawer', async ({ page }) => {
    // 1. Visit featured product detail page
    await page.goto('https://dev-apparel.myshopify.com/products/merino-hoodie');

    // 2. Click Large size swatch
    await page.click('label:has-text("L")');

    // 3. Click Add to Cart
    await page.click('button[name="add"]');

    // 4. Assert Cart Drawer is visible with item present
    const cartDrawer = page.locator('#CartDrawer');
    await expect(cartDrawer).toBeVisible({ timeout: 5000 });
    await expect(cartDrawer).toContainText('Merino Hoodie');

    // 5. Assert Checkout button is enabled
    const checkoutBtn = page.locator('button[name="checkout"]');
    await expect(checkoutBtn).toBeEnabled();
  });
});`,
                language: 'javascript',
            },
            {
                heading: 'Writing E2E Regression Tests for Core Ecommerce Funnels',
                body: `Critical test paths to automate in your test suite:
1. Variant Switching: Verify toggling options updates the displayed price and updates the \`?variant=\` URL parameter.
2. Cart Quantity Mutations: Verify incrementing quantity updates the total price and free shipping progress bar.
3. Out-of-Stock Edge Cases: Verify selecting a sold-out variant disables the buy button and reveals the restock alert form.
4. Promotional Discount Codes: Verify applying a discount code recalculates cart totals accurately.`,
                callout: {
                    type: 'warning',
                    text: 'Always run your Playwright test suite against mobile viewport emulators (iPhone 14 / Pixel 7) where 70%+ of customer transactions occur.',
                },
            },
            {
                heading: 'Testing Checkout UI Extensions and Functions in Headless Browsers',
                body: `Automating Checkout Verification:
• Using Shopify's Bogus Gateway (\`Credit Card: 1\`), Playwright can simulate the entire checkout flow:
  1. Fill shipping address.
  2. Select standard delivery.
  3. Verify Checkout UI Extension (e.g. Gift Note checkbox) renders correctly in the DOM.
  4. Submit order and verify the customer lands on the Thank You confirmation page with valid order number!`,
                callout: {
                    type: 'shopify',
                    text: 'Automating full checkout completions on development stores proves that your Checkout UI Extensions and Functions execute flawlessly under real payment processing conditions.',
                },
            }
        ],
        mistakes: [
            'Running tests against live production stores where test orders deplete actual inventory.',
            'Using fragile XPath selectors instead of resilient accessible role selectors (`page.getByRole`).',
        ],
        checklist: [
            'Configured Playwright with TypeScript.',
            'Automated password bypass on development stores.',
            'Executed full Add-to-Cart and Cart Drawer assertion suite.',
            'Integrated Playwright run into GitHub Actions CI.',
        ],
        furtherReading: [
            { title: 'Playwright Official Documentation', url: 'https://playwright.dev' },
        ],
    },
    {
        id: 'dev-m16-l3',
        moduleId: 'dev-module-16',
        slug: 'enterprise-launch-checklist-bfcm-readiness-and-capstone',
        title: 'Enterprise Store Launch: BFCM Load Readiness, Performance Audits & Capstone',
        estimatedMinutes: 60,
        objectives: [
            'Execute the 50-point Enterprise Shopify Store Launch Checklist',
            'Audit Core Web Vitals (LCP < 2.5s, INP < 200ms, CLS < 0.1) under 4G mobile throttling',
            'Prepare stores for Black Friday / Cyber Monday (BFCM) peak load: Disabling unneeded app scripts and stress testing',
            'Complete the Grand Master Shopify Developer Capstone Project',
        ],
        videoSource: {
            title: 'The Ultimate Shopify Launch Checklist',
            embedUrl: 'https://www.youtube-nocookie.com/embed/tc1ou-8OTuc',
            channel: 'KeyCommerce',
            duration: '6:22',
            description: 'Curated YouTube walkthrough from KeyCommerce that complements this lesson. Watch it alongside the written sections below.',
            topics: ['Store Launch Checklist', 'BFCM Readiness', 'Performance Profiling', 'Developer Capstone'],
        },
        sections: [
            {
                heading: 'The 50-Point Enterprise Shopify Store Launch Checklist',
                body: `Never launch an enterprise store on a whim. Execute the standardized 50-point launch protocol:
Top Launch Categories:
1. Domain & DNS: Primary domain connected with SSL status green; all www/root redirects verified.
2. Payment Gateways: Test mode disabled; real live test transaction ($1) processed and successfully refunded via Shopify Payments and PayPal.
3. Tax & Duties: Nexus settings configured; destination-based tax calculations verified across all target jurisdictions.
4. Shipping Rates: Real-time carrier calculated rates tested for domestic, PO box, and international destinations.
5. Email Notifications: Custom branded templates for Order Confirmation, Shipping Update, and Abandoned Checkout verified across desktop and mobile email clients.`,
                callout: {
                    type: 'tip',
                    text: 'Always process a real $1 transaction with a real credit card before launching. Bogus gateway tests verify code, but live transactions verify bank underwriting.',
                },
            },
            {
                heading: 'Core Web Vitals Performance Audit Under 4G Mobile Throttling',
                body: `Conducting the final pre-launch speed audit:
• Testing Environment: Chrome DevTools -> Performance panel throttled to "Slow 4G" and 4x CPU slowdown.
• Pass Criteria:
  - Largest Contentful Paint (LCP): ≤ 2.5 seconds.
  - Interaction to Next Paint (INP): ≤ 200 milliseconds.
  - Cumulative Layout Shift (CLS): ≤ 0.05.
• Asset Verification: Verify all above-the-fold hero images use \`loading="eager"\` and \`fetchpriority="high"\`, and all non-critical third-party scripts use \`defer\`.`,
                callout: {
                    type: 'warning',
                    text: 'Testing on high-speed fiber internet gives a false sense of security. 75% of your shoppers are on mobile cellular connections with high network latency.',
                },
            },
            {
                heading: 'BFCM Peak Load Preparation: Script Pruning & Concurrency Safeguards',
                body: `Preparing for Black Friday / Cyber Monday traffic surges:
• App Pruning: Audit and uninstall inactive apps. Delete residual orphaned \`<script>\` tags from \`theme.liquid\`.
• Flash Sale Defenses: For limited-edition drops, disable dynamic cart drawer cross-sells to streamline checkout velocity.
• Support Escalation: Ensure customer service live chat widgets do not auto-open and block mobile checkout CTAs.`,
                callout: {
                    type: 'shopify',
                    text: 'Shopify’s core infrastructure scales automatically during BFCM, handling millions of requests per minute. Your responsibility as a developer is ensuring your theme and custom apps don’t introduce client-side bottlenecks.',
                },
            },
            {
                heading: 'The Grand Master Shopify Developer Capstone Build',
                body: `Congratulations on completing the 16-Week Modern Shopify Developer Track!
Your Final Capstone Challenge:
Synthesize every architectural layer you have mastered over the past 16 weeks into a production-grade enterprise theme and app ecosystem:
1. High-Performance OS 2.0 Theme (Dawn base) scoring 95+ on Lighthouse Mobile.
2. Custom Web Components for Cart Drawer and Live Predictive Search.
3. Relational Metaobjects with dedicated Web Pages for brand ambassadors.
4. Native Checkout UI Extension injecting an interactive pre-purchase upsell.
5. Shopify Function (WebAssembly) enforcing automated tiered volume discounts.
6. Embedded Remix App monitoring live inventory across multi-location warehouses.
7. Automated CI/CD GitHub Actions pipeline with Playwright end-to-end test gates.
Deploy this build to your Partner Portfolio to showcase true enterprise mastery!`,
                code: `# Enterprise Capstone Architecture Verification Manifest
echo "=== Shopify Developer Capstone Validation ==="
echo "✓ Theme Engine: OS 2.0 JSON Templates + Section Groups"
echo "✓ Front-End: Native Web Components (<35KB total JS)"
echo "✓ Data Extensibility: Metafields 2.0 + Relational Metaobjects"
echo "✓ Checkout Extensibility: UI Extensions (Preact) + Functions (Wasm)"
echo "✓ Full-Stack App: Remix + Prisma + App Bridge 4.0 + GraphQL Admin"
echo "✓ Event Infrastructure: Webhooks + HMAC SHA-256 + Redis Idempotency"
echo "✓ DevOps: GitHub Actions CI/CD + Playwright Automated E2E Testing"
echo "=============================================="
echo "STATUS: GRAND MASTER SHOPIFY DEVELOPER CERTIFIED" `,
                language: 'bash',
            }
        ],
        mistakes: [
            'Launching without mapping legacy URL redirects, destroying accumulated SEO rankings and backlinks.',
            'Leaving test payment gateways active when pointing production DNS records.',
            'Ignoring mobile performance testing prior to large advertising spend campaigns.',
        ],
        checklist: [
            'Executed complete 50-point launch checklist.',
            'Verified payment gateway live capture and refund.',
            'Tested 301 URL redirect mappings.',
            'Passed Core Web Vitals audit on simulated mobile device.',
            'Completed the Full-Stack Shopify Developer Capstone Build.',
        ],
        furtherReading: [
            { title: 'Official Shopify Store Launch Checklist', url: 'https://help.shopify.com/en/manual/intro-to-shopify/initial-setup/setup-checklist' },
        ],
    },
];
