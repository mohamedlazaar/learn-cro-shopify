export const PHASE_6_LESSONS = [
    // =========================================================================
    // MODULE 21: Behavioral Economics & Cognitive Biases in CRO
    // =========================================================================
    {
        id: 'm21-l1',
        moduleId: 'module-21',
        slug: 'dual-process-cognitive-architecture-system1-system2',
        title: 'Dual-Process Cognitive Architecture: System 1 Intuition vs System 2 Deliberation',
        estimatedMinutes: 25,
        objectives: [
            'Master Daniel Kahneman’s Nobel Prize-winning Dual-Process Theory applied to digital shopping.',
            'Identify which funnel steps rely on System 1 fast heuristics vs System 2 analytical evaluation.',
            'Reduce extraneous cognitive load across the ecommerce purchase journey.',
        ],
        videoSource: {
            title: 'What Is Shopify? How It Works, Plans, Apps & B2B Explained',
            embedUrl: 'https://www.youtube-nocookie.com/embed/oXSigeZtPeE',
            channel: 'Anchor Group NetSuite Consultants',
            duration: '9:04',
            description: 'Curated technical CRO masterclass from Anchor Group NetSuite Consultants covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['What Is Shopify? How It Works', 'Plans', 'Apps & B2B Explained'],
        },
        sections: [
            {
                heading: 'System 1 and System 2 in Ecommerce',
                body: `Nobel laureate Daniel Kahneman established that human cognition operates via two distinct modes of thinking:
- **System 1 (Fast Thinking):** Operates automatically, subconsciously, and effortlessly with little or no effort (e.g. recognizing a color, tapping a familiar Apple Pay button, judging visual appeal in 50ms).
- **System 2 (Slow Thinking):** Allocates attention to effortful mental operations, deliberate calculations, and conscious trade-offs (e.g. comparing 4 technical spec sheets, calculating shipping costs, entering a 16-digit credit card number).

In digital commerce, **System 1 makes the decision to buy; System 2 justifies it or finds reasons to abort.** If your UI forces unnecessary System 2 cognitive effort during checkout, visitors get mentally exhausted and abandon the cart.`,
                callout: {
                    type: 'tip',
                    text: 'The best CRO designs allow users to glide through browsing with System 1 familiarity, only triggering System 2 when validating critical purchase security.',
                },
            },
            {
                heading: 'Visual Fluency and Cognitive Strain',
                body: `When an interface is visually fluent (high contrast, familiar standard button positions, clear typography), the brain experiences subconscious cognitive ease. Cognitive ease generates positive sentiment, higher trust, and higher willingness to pay.

Conversely, visual clutter, non-standard navigation menus, unreadable script fonts, and low-contrast grey-on-white text trigger cognitive strain. Cognitive strain immediately activates System 2 suspicion and skepticism, causing shoppers to scrutinize price and second-guess the store's legitimacy.`,
            },
        ],
        mistakes: [
            'Inventing non-standard navigation patterns (e.g. circular scroll wheels) that violate mental models.',
            'Overwhelming users with 8 competing visual badges on a single product thumbnail.',
            'Forcing users to do mental math to figure out their total discount savings.',
        ],
        checklist: [
            'Audit page layout against Jakob’s Law of UX (users prefer sites that work like all other sites).',
            'Ensure primary interactive elements have familiar, unambiguous affordances.',
            'Display calculated final prices directly rather than "Take 25% off at checkout with code X".',
        ],
        furtherReading: [
            { title: 'Thinking, Fast and Slow (Daniel Kahneman)', url: 'https://kahneman.princeton.edu' },
        ],
    },
    {
        id: 'm21-l2',
        moduleId: 'module-21',
        slug: 'anchoring-decoy-pricing-price-architecture',
        title: 'Anchoring, Decoy Pricing & Price Architecture',
        estimatedMinutes: 30,
        objectives: [
            'Apply price anchoring to make premium bundles feel like irresistible value.',
            'Deploy the Asymmetric Dominance Effect (Decoy Effect) in 3-tier pricing matrices.',
            'Structure bundle upsells in Shopify themes to maximize Revenue Per Session (RPS).',
        ],
        videoSource: {
            title: 'Decoy effect pricing strategy',
            embedUrl: 'https://www.youtube-nocookie.com/embed/GHdjg3i3Nxg',
            channel: 'Easy Marketing ',
            duration: '4:18',
            description: 'Curated technical CRO masterclass from Easy Marketing  covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Decoy effect pricing strategy'],
        },
        sections: [
            {
                heading: 'The Mechanics of Price Anchoring',
                body: `Humans cannot evaluate value in an absolute vacuum; we evaluate value relative to the first piece of information received (the anchor).

If a customer visits a store and first sees a $299 luxury artisan leather travel bag, a subsequent $69 passport wallet looks remarkably affordable and accessible. If they first saw a $12 keychain, that same $69 wallet feels expensive.

In Shopify themes, always establish high-value anchors early:
- Display the original MSRP with a strikethrough: \`<s class="price-strikethrough">$120</s> <span class="price-sale">$79</span>\`
- Display the highest-tier bundle first on multi-pack selectors`,
            },
            {
                heading: 'The Decoy Effect (Asymmetric Dominance)',
                body: `Famously demonstrated by Dan Ariely in The Economist subscription experiment:
- Option A: Digital Edition — $59
- Option B: Print Edition — $125
- Option C: Digital + Print Bundle — $125

Option B is an asymmetric "decoy" — it makes Option C look like an extraordinary bargain. When Option B was removed, 68% chose Digital. When Option B was present, 84% chose the premium $125 Bundle!`,
                code: `{% comment %} snippets/bundle-decoy-selector.liquid {% endcomment %}
<div class="bundle-selector">
  <!-- Option 1: Starter -->
  <label class="bundle-card">
    <input type="radio" name="bundle" value="single" />
    <div class="bundle-card__content">
      <span class="bundle-card__title">1 Bottle (30-day supply)</span>
      <span class="bundle-card__price">$48 / bottle</span>
    </div>
  </label>

  <!-- Option 2: Popular Value (Anchored) -->
  <label class="bundle-card bundle-card--featured is-selected">
    <div class="bundle-card__ribbon">MOST POPULAR • BEST VALUE</div>
    <input type="radio" name="bundle" value="trio" checked />
    <div class="bundle-card__content">
      <span class="bundle-card__title">3 Bottles (90-day supply)</span>
      <span class="bundle-card__price">$32 / bottle <s class="text-muted">$48</s></span>
      <span class="badge badge-success">Save $48 (Free Shipping)</span>
    </div>
  </label>
</div>`,
                language: 'liquid',
            },
        ],
        mistakes: [
            'Offering single-unit options without demonstrating savings on multi-packs.',
            'Burying bundle options in separate collection pages instead of on the main PDP.',
            'Making the price comparison calculation ambiguous or deceptive.',
        ],
        checklist: [
            'Place a strikethrough comparison anchor on discounted bundles.',
            'Pre-select the highest-converting bundle tier by default.',
            'Clearly state total dollar savings in addition to percentage savings.',
        ],
        furtherReading: [
            { title: 'Predictably Irrational (Dan Ariely)', url: 'https://danariely.com' },
        ],
    },
    {
        id: 'm21-l3',
        moduleId: 'module-21',
        slug: 'paradox-of-choice-hicks-law-catalog-filtering',
        title: 'The Paradox of Choice & Hick’s Law in Catalog Filtering',
        estimatedMinutes: 25,
        objectives: [
            'Apply Hick’s Law: The time and effort to make a decision increases logarithmically with the number and complexity of choices.',
            'Diagnose analysis paralysis on collection pages with 200+ unorganized products.',
            'Deploy curated "Best For" filters and quiz funnels to streamline customer selection.',
        ],
        videoSource: {
            title: 'UX Design Psychology: Hick\'s Law and the Paradox of Choice',
            embedUrl: 'https://www.youtube-nocookie.com/embed/Q48DpcsESJk',
            channel: 'Hidden Design Brain',
            duration: '8:03',
            description: 'Curated technical CRO masterclass from Hidden Design Brain covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['UX Design Psychology: Hick\'s Law and the Paradox of Choice'],
        },
        sections: [
            {
                heading: 'The Jam Experiment & The Paradox of Choice',
                body: `In Barry Schwartz’s classic research, a tasting booth displaying 24 jams attracted 60% of shoppers, but only 3% bought. A booth displaying just 6 jams attracted 40% of shoppers, but **30% bought** — a 10x increase in purchase conversion!

When presented with too many options, consumers experience decision fatigue, fear of making the wrong choice (buyer's remorse in advance), and ultimately choose nothing.`,
            },
            {
                heading: 'Curating the Catalog Experience',
                body: `Never drop a customer onto a collection page with 80 unorganized product cards without guidance. High-converting Shopify stores implement:
1. "Best For" taxonomy badges (e.g. "Best for Dry Skin", "Best for Heavy Sleepers").
2. Smart default sorting (Best Selling / Highest Customer Rating) rather than alphabetical or newest.
3. Interactive Product Finder Quizzes that ask 3 simple lifestyle questions and output a single customized product recommendation.`,
            },
        ],
        mistakes: [
            'Showing 18 different color swatches on a collection thumbnail without filtering.',
            'Failing to provide faceted filters (Size, Color, Price, Use Case) on collections with >20 items.',
            'Offering too many conflicting discount promo codes simultaneously.',
        ],
        checklist: [
            'Limit top-level primary navigation items to 7 or fewer (Miller’s Law).',
            'Implement guided filters that reduce options to under 8 products.',
            'Add a "Staff Favorite" or "Top Rated" badge to break tie-breaker hesitation.',
        ],
        furtherReading: [
            { title: 'The Paradox of Choice (Barry Schwartz)', url: 'https://en.wikipedia.org/wiki/The_Paradox_of_Choice' },
        ],
    },
    {
        id: 'm21-l4',
        moduleId: 'module-21',
        slug: 'loss-aversion-endowment-effect-funnels',
        title: 'Loss Aversion, Endowment Effect & Sunk Cost Fallacy in Funnels',
        estimatedMinutes: 25,
        objectives: [
            'Understand why the pain of losing is psychologically twice as powerful as the pleasure of gaining.',
            'Leverage the Endowment Effect through interactive customizers and product previews.',
            'Use progress bars in multi-step funnels to harness the Sunk Cost Fallacy ethically.',
        ],
        videoSource: {
            title: 'Sunk Cost Fallacy: Not Knowing When It’s Time to Stop',
            embedUrl: 'https://www.youtube-nocookie.com/embed/jJajz9n9Oi4',
            channel: 'Sprouts',
            duration: '4:06',
            description: 'Curated technical CRO masterclass from Sprouts covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Sunk Cost Fallacy: Not Knowing When It’s Time to Stop'],
        },
        sections: [
            {
                heading: 'Loss Aversion in Ecommerce Framing',
                body: `Kahneman and Tversky proved that the psychological pain of losing $20 is roughly double the pleasure of finding $20.

We apply this principle by framing offers around avoiding a loss:
- Gain Framing: "Get a free $20 thermal mug when you spend $75."
- Loss Framing: "You are $12 away from claiming your Free $20 Thermal Mug! Don't leave it behind."
The loss-framed message in a cart drawer converts at a significantly higher rate because customers feel ownership of the unlocked gift.`,
            },
            {
                heading: 'The Endowment Effect',
                body: `The Endowment Effect states that people value things merely because they own them. In digital commerce, this can be simulated through psychological pre-ownership:
- Interactive 3D/AR product customizers where users choose their engraving, fabric, and color.
- Putting the customer's name on the preview mock (e.g. "Sarah's Custom Formula").
Once the customer has spent 3 minutes building their personalized product, abandoning it feels like throwing away their own possession.`,
            },
            {
                heading: 'Progress Bars & Goal Gradient Effect',
                body: `In multi-step quiz funnels or multi-page checkouts, people accelerate their effort as they get closer to completing a goal.
Showing a progress bar that starts at 25% complete (endowed progress) rather than 0% increases survey and funnel completion rates by up to 28%.`,
            },
        ],
        mistakes: [
            'Starting multi-step checkout or quiz progress bars at 0% instead of giving initial endowed progress.',
            'Framing cart benefits in passive terms instead of active loss-aversion thresholds.',
            'Forcing users to lose their customized settings if they navigate back.',
        ],
        checklist: [
            'Add a dynamic free shipping and gift threshold progress bar to the cart drawer.',
            'Store customer customization state in localStorage so progress is never lost.',
            'Use endowed progress bars on quizzes and onboarding funnels.',
        ],
        furtherReading: [
            { title: 'The Endowed Progress Effect (Nunes & Drèze)', url: 'https://www.jstor.org/stable/10.1086/500482' },
        ],
    },
    {
        id: 'm21-l5',
        moduleId: 'module-21',
        slug: 'ethics-of-persuasion-white-hat-cro-vs-dark-patterns',
        title: 'The Ethics of Persuasion: White Hat Optimization vs Manipulative Dark Patterns',
        estimatedMinutes: 25,
        objectives: [
            'Differentiate between ethical persuasion architecture and deceptive dark patterns.',
            'Identify illegal practices: pre-checked opt-in boxes, hidden subscription continuity, and Roach Motels.',
            'Build long-term brand equity and enterprise valuation through transparent CRO.',
        ],
        videoSource: {
            title: 'NYT Combat Wear Shopify CRO Audit: Great Design, Missing CRO Basics',
            embedUrl: 'https://www.youtube-nocookie.com/embed/pdpyNL2wF5g',
            channel: 'RankConvert',
            duration: '24:52',
            description: 'Curated technical CRO masterclass from RankConvert covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['NYT Combat Wear Shopify CRO Audit: Great Design', 'Missing CRO Basics'],
        },
        sections: [
            {
                heading: 'The Dark Pattern Epidemic',
                body: `A dark pattern is a user interface carefully crafted to trick users into doing things they might not otherwise do, such as buying insurance or signing up for recurring monthly charges.

Common Ecommerce Dark Patterns:
1. Sneak into Basket: Automatically adding a $3 warranty or donation to the cart without explicit customer consent.
2. Confirmshaming: Using guilt-inducing button copy on opt-out modals (e.g. "No thanks, I hate saving money and glowing skin").
3. Roach Motel: Making signup take 10 seconds online, but requiring an inconvenient 45-minute phone call during business hours to cancel.
4. Hidden Continuity: Masking a recurring subscription as a one-time discounted order.`,
            },
            {
                heading: 'Why Dark Patterns Destroy Enterprise Value',
                body: `While dark patterns may create a temporary 30-day bump in measured conversion or recurring revenue, the long-term consequences are disastrous:
- Severe merchant chargeback rates (>1%) leading to Visa/Mastercard payment processor termination.
- Devastating customer lifetime value (LTV) and brand reputation.
- Regulatory enforcement: The FTC’s Restore Online Shoppers’ Confidence Act (ROSCA) and EU Digital Services Act enforce massive penalties against deceptive practices.`,
            },
            {
                heading: 'The White-Hat CRO Standard',
                body: `A world-class CRO developer creates value by eliminating genuine friction, clarifying complex information, and making great products easier to discover and purchase. Transparent, ethical optimization creates compounding customer trust and sustainable enterprise valuation.`,
            },
        ],
        mistakes: [
            'Pre-checking recurring subscription or marketing consent checkboxes.',
            'Hiding cancellation instructions or making subscription management difficult.',
            'Using deceptive UI color contrasts where the cancel button is invisible grey text on grey background.',
        ],
        checklist: [
            'Ensure all subscription products require active opt-in selection.',
            'Provide self-serve 1-click subscription pause and cancellation in the customer account portal.',
            'Verify store complies with FTC ROSCA guidelines.',
        ],
        furtherReading: [
            { title: 'Deceptive Design (Harry Brignull)', url: 'https://www.deceptive.design' },
        ],
    },
    // =========================================================================
    // MODULE 22: Search, Navigation & Site Discovery CRO
    // =========================================================================
    {
        id: 'm22-l1',
        moduleId: 'module-22',
        slug: 'intent-spectrum-searchers-vs-browsers-multipliers',
        title: 'The Intent Spectrum: Searchers vs Browsers & Revenue Multipliers',
        estimatedMinutes: 25,
        objectives: [
            'Analyze why on-site searchers convert at 2.5x to 4x the rate of passive browsers.',
            'Understand how the on-site search bar acts as an intentional purchase signal.',
            'Architect search bar visibility, placement, and micro-interactions on mobile and desktop.',
        ],
        videoSource: {
            title: 'Double Your Conversion Rate In 5 Minutes? (Shopify CRO)',
            embedUrl: 'https://www.youtube-nocookie.com/embed/UWUboZmRMaQ',
            channel: 'Spencer Pawliw',
            duration: '5:22',
            description: 'Curated technical CRO masterclass from Spencer Pawliw covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Double Your Conversion Rate In 5 Minutes? (Shopify CRO)'],
        },
        sections: [
            {
                heading: 'The Search Intent Phenomenon',
                body: `Across ecommerce analytics, on-site search represents an astonishing dynamic: while typically only 10% to 20% of site visitors use the search bar, those searchers generate **35% to 50% of total store revenue**.

Why? Because searchers have moved past general exploration into high-intent procurement. They already know what problem they need solved, or they know the exact product name. The job of the CRO engineer is to remove every millisecond of friction between their keystrokes and the product detail page.`,
            },
            {
                heading: 'The Collapsed Search Bar Mistake',
                body: `Many minimalistic themes hide the search bar behind a tiny 16px magnifying glass icon in the top corner of the header. This introduces unnecessary friction for high-intent shoppers.

High-converting desktop and tablet headers display an expanded, prominent search bar in the center of the navigation, complete with helpful placeholder prompts:
*"Search over 2,000 organic skincare formulas, ingredients, or skin concerns..."*`,
            },
        ],
        mistakes: [
            'Hiding the search input behind two separate clicks on mobile.',
            'Failing to track on-site search queries and zero-result events in GA4.',
            'Using a generic placeholder like "Search..." instead of prompting specific product categories or problems.',
        ],
        checklist: [
            'Make search bar permanently visible or effortlessly accessible in the primary header.',
            'Ensure search bar touch target is at least 44px on mobile.',
            'Instrument GA4 `search` and `view_search_results` custom events.',
        ],
        furtherReading: [
            { title: 'Algolia: State of Ecommerce Search 2024', url: 'https://www.algolia.com' },
        ],
    },
    {
        id: 'm22-l2',
        moduleId: 'module-22',
        slug: 'predictive-autocomplete-algorithmic-search-liquid',
        title: 'Predictive Autocomplete & Algorithmic Search UX in Liquid & JS',
        estimatedMinutes: 30,
        objectives: [
            'Build a lightning-fast predictive search drawer using Shopify’s native Predictive Search API.',
            'Implement debouncing and AbortController to prevent race conditions and network saturation.',
            'Display rich results: product thumbnails, live prices, category suggestions, and article matches.',
        ],
        videoSource: {
            title: 'Creatine UX Audit | CRO Strategies | Shopify Converstion Plan 2026',
            embedUrl: 'https://www.youtube-nocookie.com/embed/Ut2k83JHn6k',
            channel: 'dev9363',
            duration: '14:50',
            description: 'Curated technical CRO masterclass from dev9363 covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Creatine UX Audit', 'CRO Strategies', 'Shopify Converstion Plan 2026'],
        },
        sections: [
            {
                heading: 'Shopify Native Predictive Search API',
                body: `Shopify provides a built-in predictive search endpoint: \`/search/suggest.json?q={query}&resources[type]=product,collection,page,article&resources[options][fields]=title,product_type,variants.title\`.
It returns structured JSON in under 80ms, eliminating the need for expensive third-party search apps for most catalogs.`,
            },
            {
                heading: 'AI-Powered Semantic Search & Generative Engine Optimization (GEO)',
                body: `Keyword-matching search fails when shoppers search conversational intent (e.g., "outfit for rainy wedding in Scotland" or "running shoes with wide toe box").
Modern Shopify Semantic Search & AI Discovery:
• Vector-Based Semantic Search: Available natively via Shopify Search & Discovery. It maps customer search terms to high-dimensional product vector embeddings, understanding context, synonyms, and intent rather than exact keyword substrings.
• Generative Engine Optimization (GEO): As AI agents (ChatGPT Search, Perplexity, Google AI Overviews) increasingly drive commercial buying decisions, your theme must provide crystal-clear JSON-LD structured data (Product, Offer, AggregateRating, MerchantReturnPolicy) and semantic HTML headings so AI crawlers correctly parse and recommend your catalog.
• Conversational Search Conversion: Shoppers using intent-based semantic search convert at 3.8x the rate of standard category browsers.`,
                callout: {
                    type: 'shopify',
                    text: 'Enabling Semantic Search in the Shopify Search & Discovery app reduces zero-result searches by up to 45% without needing third-party search indexes.',
                },
            },
            {
                heading: 'Debouncing and Race Condition Prevention',
                body: `Without debouncing, every keystroke fires an HTTP request. Typing "boots" fires 5 concurrent requests. If the network returns the response for "boo" after "boots", the user sees incorrect results.
We prevent this using a 250ms debounce function and an \`AbortController\` that cancels prior in-flight requests:`,
                code: `// High-Performance Predictive Search Client
class PredictiveSearch {
  constructor() {
    this.input = document.querySelector('input[type="search"]');
    this.resultsContainer = document.getElementById('PredictiveResults');
    this.abortController = null;
    this.debounceTimeout = null;
    this.init();
  }

  init() {
    this.input.addEventListener('input', () => {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => this.fetchResults(), 250);
    });
  }

  async fetchResults() {
    const query = this.input.value.trim();
    if (query.length < 2) {
      this.resultsContainer.innerHTML = '';
      return;
    }

    if (this.abortController) {
      this.abortController.abort(); // Cancel previous pending fetch
    }
    this.abortController = new AbortController();

    try {
      const url = \`/search/suggest.json?q=\${encodeURIComponent(query)}&resources[type]=product&resources[limit]=4\`;
      const res = await fetch(url, { signal: this.abortController.signal });
      const data = await res.json();
      this.renderResults(data.resources.results.products);
    } catch (err) {
      if (err.name !== 'AbortError') console.error('Search error:', err);
    }
  }

  renderResults(products) {
    if (!products || products.length === 0) {
      this.resultsContainer.innerHTML = '<div class="no-res">No matching items found.</div>';
      return;
    }
    this.resultsContainer.innerHTML = products.map(p => \`
      <a href="\${p.url}" class="predictive-item">
        <img src="\${p.image}" alt="\${p.title}" width="50" height="50" loading="lazy" />
        <div class="predictive-item__meta">
          <strong>\${p.title}</strong>
          <span>\${p.price}</span>
        </div>
      </a>
    \`).join('');
  }
}`,
                language: 'javascript',
            },
        ],
        mistakes: [
            'Firing HTTP requests on every single keypress without debouncing.',
            'Failing to abort stale in-flight fetches, causing race conditions in rendered UI.',
            'Displaying only text product titles without thumbnail images and prices in the autocomplete dropdown.',
        ],
        checklist: [
            'Debounce search inputs by 200–300ms.',
            'Use AbortController to cancel superseded search requests.',
            'Display thumbnail, title, price, and stock status in predictive results.',
        ],
        furtherReading: [
            { title: 'Shopify Help: Predictive Search API', url: 'https://shopify.dev/docs/api/ajax/reference/predictive-search' },
        ],
    },
    {
        id: 'm22-l3',
        moduleId: 'module-22',
        slug: 'faceted-filter-architecture-search-discovery',
        title: 'Faceted Filter Architecture & Shopify Search & Discovery App',
        estimatedMinutes: 25,
        objectives: [
            'Understand faceted filtering vs simple category sorting.',
            'Implement Shopify native storefront filters in Liquid with Section Rendering API.',
            'Design accessible mobile drawer filters with instant item count feedback.',
        ],
        videoSource: {
            title: 'Full Guide: Shopify Search & Discovery App (2025) - Filters, Search, Recommendations & Upsells',
            embedUrl: 'https://www.youtube-nocookie.com/embed/TjzV7Ll-Uy0',
            channel: 'Upsellcom ex ReConvert',
            duration: '13:36',
            description: 'Curated technical CRO masterclass from Upsellcom ex ReConvert covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Full Guide: Shopify Search & Discovery App (2025)', 'Filters', 'Search', 'Recommendations & Upsells'],
        },
        sections: [
            {
                heading: 'What is Faceted Filtering?',
                body: `Faceted filtering allows customers to refine a catalog across multiple independent dimensions simultaneously: Size (M, L), Color (Blue, Black), Price Range ($50–$100), and Material (Organic Cotton).
When done right, it empowers the shopper to pinpoint their exact desired product in seconds. When done poorly (slow full-page reloads, clearing selections unexpectedly), it is a major abandonment trigger.`,
            },
            {
                heading: 'Section Rendering API for Seamless Filtering',
                body: `Instead of reloading the entire HTML page when a user clicks a filter checkbox, modern Shopify themes submit the query params via AJAX to \`?section_id=main-collection-product-grid\` and swap only the product grid container:`,
                code: `// Dynamic Filter Update without Page Reload
async function applyFilterChange(formData) {
  const params = new URLSearchParams(formData).toString();
  const url = \`\${window.location.pathname}?\${params}&section_id=collection-grid\`;
  
  history.pushState(null, '', \`\${window.location.pathname}?\${params}\`);
  const res = await fetch(url);
  const html = await res.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const newGrid = doc.getElementById('CollectionProductGrid');
  
  document.getElementById('CollectionProductGrid').innerHTML = newGrid.innerHTML;
}`,
                language: 'javascript',
            },
        ],
        mistakes: [
            'Causing a full-page reload on every single checkbox click.',
            'Hiding how many products match the current filter selection.',
            'Failing to update browser URL history with pushState so users cannot share or bookmark filtered results.',
        ],
        checklist: [
            'Use Section Rendering API for AJAX filter updates.',
            'Update window.history with pushState.',
            'Display clear "Clear All Filters" and active tag pill badges.',
        ],
        furtherReading: [
            { title: 'Shopify Dev: Storefront Filtering Architecture', url: 'https://shopify.dev/docs/themes/navigation-search/filtering' },
        ],
    },
    {
        id: 'm22-l4',
        moduleId: 'module-22',
        slug: 'zero-results-page-recovery-strategies',
        title: 'Zero-Results Page Recovery: Turning Dead Ends into Revenue',
        estimatedMinutes: 25,
        objectives: [
            'Eliminate the high bounce rate of blank "No products found for query" pages.',
            'Implement intelligent fallback merchandising: popular collections, top sellers, and search spelling suggestions.',
            'Mine zero-results search logs in GA4 to discover unmet catalog demand.',
        ],
        videoSource: {
            title: 'Search CRO Workshop with Klevu and Nick Branco from Vaimo (Search Conversion Rate Optimization)',
            embedUrl: 'https://www.youtube-nocookie.com/embed/r314Ssbc5T4',
            channel: 'Klevu AI',
            duration: '39:47',
            description: 'Curated technical CRO masterclass from Klevu AI covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Search CRO Workshop with Klevu and Nick Branco from Vaimo (Search Conversion Rate Optimization)'],
        },
        sections: [
            {
                heading: 'The Catastrophe of the Blank 404/Search Screen',
                body: `When a customer types a slightly misspelled query (e.g. "caferacer jacket" instead of "cafe racer") and arrives at a sterile page stating:
*"No results found for 'caferacer jacket'. Try another search."*
their immediate reaction is to close the tab and check Amazon or Google.
A blank zero-results page has a bounce rate exceeding 78%.`,
            },
            {
                heading: 'The 4-Step Zero-Results Recovery Template',
                body: `A high-converting zero-results template in Liquid includes:
1. Empathy & Helpful Guidance: "We couldn't find an exact match for '{query}', but you might love these popular alternatives."
2. Did-You-Mean Suggestions: Query auto-correction or broad keyword chips.
3. Top 4 Best-Selling Products Grid: Immediately keeps the user browsing.
4. Direct Search Concierge CTA: "Looking for something specific? Chat with our product team."`,
                code: `{% comment %} snippets/search-zero-results.liquid {% endcomment %}
<div class="search-empty text-center">
  <h2>We couldn't find an exact match for "{{ search.terms }}"</h2>
  <p class="text-secondary">Check for typos, try broader keywords, or browse our community favorites below:</p>

  <div class="search-empty__recommendations">
    <h3>Trending Right Now</h3>
    <div class="product-grid">
      {% for product in collections['best-sellers'].products limit: 4 %}
        {% render 'product-card', product: product %}
      {% endfor %}
    </div>
  </div>
</div>`,
                language: 'liquid',
            },
        ],
        mistakes: [
            'Leaving zero-results search pages with zero product recommendations.',
            'Failing to track zero-result searches in analytics (these are goldmines for SEO and merchandising).',
            'Blaming the customer with phrasing like "You entered an invalid query".',
        ],
        checklist: [
            'Render best-sellers collection when search.results_count == 0.',
            'Add search term logging to GA4 custom events.',
            'Provide 1-click links to top product categories.',
        ],
        furtherReading: [
            { title: 'Baymard Institute: Search Results Evaluation', url: 'https://baymard.com' },
        ],
    },
    {
        id: 'm22-l5',
        moduleId: 'module-22',
        slug: 'visual-category-taxonomy-mobile-megamenus',
        title: 'Visual Category Taxonomy & Mobile Megamenu Navigation',
        estimatedMinutes: 25,
        objectives: [
            'Architect intuitive information architecture and category taxonomies.',
            'Design visual image-backed category pills for rapid mobile scanning.',
            'Avoid 4-level deep dropdown nested menus that cause touch frustration on mobile.',
        ],
        videoSource: {
            title: 'How To Setup Navigation & Megamenu in Premium Shopify Theme',
            embedUrl: 'https://www.youtube-nocookie.com/embed/_h9wHp4HA3A',
            channel: 'spacing tech',
            duration: '16:10',
            description: 'Curated technical CRO masterclass from spacing tech covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['How To Setup Navigation & Megamenu in Premium Shopify Theme'],
        },
        sections: [
            {
                heading: 'The Visual Taxonomy Advantage',
                body: `Text-only navigation lists force System 2 cognitive processing. By contrast, visual navigation (circular product thumbnails representing "Jackets", "Boots", "Accessories" placed directly above product collection grids or inside mobile drawers) allows users to identify their desired destination instantaneously using visual recognition.`,
            },
            {
                heading: 'Mobile Navigation Ergonomics',
                body: `On mobile devices, nesting menus 3 or 4 levels deep (Category > Subcategory > Material > Fit) requires awkward tapping back and forth.
The modern CRO standard is a flattened, visual 2-level architecture with horizontal scrollable category pills at the top of the collection page.`,
            },
        ],
        mistakes: [
            'Using internal company jargon (e.g. "Collection Apex Alpha") instead of clear customer terms ("Men’s Waterproof Boots").',
            'Creating hover-only dropdowns that break completely on mobile touch screens.',
            'Overcrowding the desktop megamenu with 80 unorganized text links.',
        ],
        checklist: [
            'Add visual image tiles to top 5 categories in mobile drawer.',
            'Include horizontal scrollable category chips on collection templates.',
            'Audit menu terminology for plain language and high-search-volume keywords.',
        ],
        furtherReading: [
            { title: 'Nielsen Norman Group: Megamenu Navigation Usability', url: 'https://nngroup.com' },
        ],
    },
    // =========================================================================
    // MODULE 23: CRO Tooling, CI/CD & Automated QA
    // =========================================================================
    {
        id: 'm23-l1',
        moduleId: 'module-23',
        slug: 'automated-regression-testing-playwright-ab-tests',
        title: 'Automated Regression Testing for A/B Tests with Playwright',
        estimatedMinutes: 30,
        objectives: [
            'Write end-to-end Playwright tests to verify that A/B test variants render correctly.',
            'Verify that variant assignment persistence (cookies/localStorage) works across page reloads.',
            'Ensure test analytics tracking events fire without error before launching to live traffic.',
        ],
        videoSource: {
            title: 'Shopify App Testing Strategies: Add End End-to-End Testing Using Playwright and Mock Service Worker',
            embedUrl: 'https://www.youtube-nocookie.com/embed/NQDM_5am2bo',
            channel: 'Ilias Haddad - Software Developer',
            duration: '19:23',
            description: 'Curated technical CRO masterclass from Ilias Haddad - Software Developer covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Shopify App Testing Strategies: Add End End', 'End Testing Using Playwright and Mock Service Worker'],
        },
        sections: [
            {
                heading: 'Why Manual QA of A/B Tests Fails',
                body: `Launching an A/B test with a silent JavaScript bug or broken "Add to Cart" listener can cost a $10M store tens of thousands of dollars in lost orders in a single afternoon.
Manual QA is prone to human error: testing in only one browser, forgetting to clear cookies, or failing to check checkout step transitions.

Automated end-to-end testing with Playwright validates both Variant A (Control) and Variant B (Treatment) across Chromium, WebKit (iOS Safari), and Firefox in under 60 seconds before deployment.`,
            },
            {
                heading: 'Writing a Playwright A/B Spec',
                body: `This automated test verifies that when the test cookie is set to "treatment_sticky_atc", the sticky bar renders and successfully adds the item to the cart:`,
                code: `// tests/ab-test-sticky-atc.spec.ts
import { test, expect } from '@playwright/test';

test.describe('A/B Test: Sticky Mobile ATC Verification', () => {
  test('Variant B renders sticky bar and fires analytics event', async ({ page, context }) => {
    // Force Variant B via cookie
    await context.addCookies([
      { name: 'ab_exp_sticky_atc', value: 'variant_b', domain: 'localhost', path: '/' }
    ]);

    // Navigate to PDP
    await page.goto('/products/artisan-wool-sweater');

    // Verify control element is hidden or modified
    const stickyBar = page.locator('#StickyMobileBar');
    
    // Scroll down past main ATC button
    await page.evaluate(() => window.scrollBy(0, 1200));

    // Verify sticky bar becomes visible
    await expect(stickyBar).toBeVisible();

    // Intercept dataLayer push
    const dataLayerPush = await page.evaluate(() => {
      return (window as any).dataLayer?.find((e: any) => e.event === 'experiment_impression');
    });

    expect(dataLayerPush).toBeDefined();
    expect(dataLayerPush.experiment_id).toBe('exp_sticky_atc_2024');
    expect(dataLayerPush.variant).toBe('variant_b');
  });
});`,
                language: 'javascript',
            },
        ],
        mistakes: [
            'Testing only the visual appearance of a variant without verifying that checkout completes.',
            'Failing to verify that the experiment impression tracking event fires only once per unique session.',
            'Shipping client-side A/B scripts without automated CI test passes.',
        ],
        checklist: [
            'Write Playwright tests for both Control and Treatment variants.',
            'Verify cart addition succeeds in all variants.',
            'Confirm analytics telemetry event contains correct experiment ID and variant key.',
        ],
        furtherReading: [
            { title: 'Playwright Documentation: End-to-End Testing', url: 'https://playwright.dev' },
        ],
    },
    {
        id: 'm23-l2',
        moduleId: 'module-23',
        slug: 'server-side-gtm-first-party-event-emitters',
        title: 'Server-Side Google Tag Manager (sGTM) & First-Party Event Emitters',
        estimatedMinutes: 30,
        objectives: [
            'Understand how ad-blockers, iOS Safari ITP, and privacy extensions block 15–30% of client-side tracking.',
            'Architect a first-party server-side Google Tag Manager (sGTM) proxy on a custom domain.',
            'Emit clean server-side conversion webhooks to Facebook CAPI and GA4.',
        ],
        videoSource: {
            title: '10 common Server-side Google Tag Manager mistakes',
            embedUrl: 'https://www.youtube-nocookie.com/embed/1igvZkIhx9c',
            channel: 'Analytics Mania - Google Analytics & Tag Manager',
            duration: '22:08',
            description: 'Curated technical CRO masterclass from Analytics Mania - Google Analytics & Tag Manager covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['10 common Server', 'side Google Tag Manager mistakes'],
        },
        sections: [
            {
                heading: 'The Collapse of Client-Side Tracking',
                body: `Apple’s Intelligent Tracking Prevention (ITP) caps third-party cookies at 24 hours, and privacy-focused browsers (Brave, Firefox, Safari) actively block third-party analytics scripts (gtm.js, fbevents.js).
If your A/B test relies purely on client-side tracking, **up to 30% of your conversions will go untracked**, producing corrupted sample ratios and invalid statistical significance.`,
            },
            {
                heading: 'First-Party Server-Side Tagging Architecture',
                body: `With server-side GTM running on your own custom subdomain (e.g. \`data.yourstore.com\`), requests are treated as first-party network traffic. The server container receives the event, cleanses personal data, and securely forwards it server-to-server to Meta Conversions API (CAPI) and GA4 Measurement Protocol.`,
            },
        ],
        mistakes: [
            'Relying solely on client-side browser pixels for multi-thousand dollar ad spend tracking.',
            'Failing to deduplicate events between client-side and server-side pipelines using unique event_id tokens.',
            'Hosting sGTM on a generic third-party domain instead of a first-party subdomain.',
        ],
        checklist: [
            'Configure first-party DNS record for sGTM (data.yourstore.com).',
            'Generate unique event_id for every purchase event to ensure deduplication.',
            'Verify event delivery in Google Cloud Run / sGTM debugger.',
        ],
        furtherReading: [
            { title: 'Simo Ahava: Server-Side Tagging Fundamentals', url: 'https://www.simoahava.com' },
        ],
    },
    {
        id: 'm23-l3',
        moduleId: 'module-23',
        slug: 'feature-flagging-experimentation-at-scale',
        title: 'Feature Flagging & Experimentation at Scale (GrowthBook & LaunchDarkly)',
        estimatedMinutes: 25,
        objectives: [
            'Decouple feature deployment from experiment release using feature flags.',
            'Implement zero-latency edge feature evaluation with GrowthBook or LaunchDarkly.',
            'Safely kill failing experiments instantaneously without requiring a code commit or theme publish.',
        ],
        videoSource: {
            title: 'How to use feature flags with GrowthBook',
            embedUrl: 'https://www.youtube-nocookie.com/embed/owz9U11rlGA',
            channel: 'GrowthBook',
            duration: '12:43',
            description: 'Curated technical CRO masterclass from GrowthBook covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['How to use feature flags with GrowthBook'],
        },
        sections: [
            {
                heading: 'The Power of Decoupling Code from Releases',
                body: `In traditional Shopify development, shipping an experiment means duplicating a theme or modifying live Liquid code. If the variant causes an unexpected bug, rolling back requires an emergency Git revert and theme publish.

With feature flags, the code for both variants is already shipped. The flag evaluates dynamically at runtime:
\`if (flags.isEnabled('new_checkout_flow', userContext)) { ... }\`
If an anomaly is detected, an engineer can flip the flag to off in 1 second via the GrowthBook or LaunchDarkly dashboard, immediately protecting store revenue.`,
            },
            {
                heading: 'Edge Feature Flag Evaluation',
                body: `To prevent flicker and latency, enterprise brands evaluate feature flags at the CDN edge (Cloudflare Workers or Vercel Edge). The edge worker checks the user’s experiment cookie, assigns the variant, and modifies the HTML before it ever leaves the server.`,
            },
        ],
        mistakes: [
            'Leaving dead experiment code and obsolete feature flags in the codebase for years (technical debt).',
            'Fetching feature flags via asynchronous client-side API calls that cause layout shift.',
            'Failing to log flag evaluations to the analytics dataLayer.',
        ],
        checklist: [
            'Establish a strict 30-day cleanup policy for completed experiment flags.',
            'Implement an emergency kill switch for all active A/B tests.',
            'Pass user attributes (country, device, logged_in) into the flag evaluation context.',
        ],
        furtherReading: [
            { title: 'GrowthBook: Open Source Feature Flagging & Experimentation', url: 'https://growthbook.io' },
        ],
    },
    {
        id: 'm23-l4',
        moduleId: 'module-23',
        slug: 'ab-test-telemetry-verification-data-sanity',
        title: 'A/B Test Telemetry Verification & Data Sanity Audits',
        estimatedMinutes: 25,
        objectives: [
            'Detect Sample Ratio Mismatch (SRM) before declaring a false winner.',
            'Audit cookie expiration and cross-subdomain tracking consistency.',
            'Automate real-time anomaly detection for conversion rate collapses during tests.',
        ],
        videoSource: {
            title: 'How to Automate Ecommerce CRO Audits with AI | AB Test ideas | CRO Mini Audit',
            embedUrl: 'https://www.youtube-nocookie.com/embed/k7iEz9Y8__U',
            channel: 'Expert Azi',
            duration: '7:49',
            description: 'Curated technical CRO masterclass from Expert Azi covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['How to Automate Ecommerce CRO Audits with AI', 'AB Test ideas', 'CRO Mini Audit'],
        },
        sections: [
            {
                heading: 'What is Sample Ratio Mismatch (SRM)?',
                body: `If you configure a 50/50 A/B test, and after 2 weeks you observe 10,000 visitors in Control and 8,800 visitors in Variant B, you have a **Sample Ratio Mismatch (SRM)**.
A Chi-Square goodness-of-fit test will flag this with p < 0.001.

SRM means your test is fundamentally broken: Variant B may be crashing on iOS Safari, redirecting erratically, or failing to fire tracking tags. **Any conversion lift reported by an experiment with SRM is completely invalid.**`,
            },
            {
                heading: 'The SRM Chi-Square Formula',
                body: `\`Chi² = Σ ((Observed - Expected)² / Expected)\`
If Chi² > 3.841 (for 1 degree of freedom, p < 0.05), SRM is present. Never make business decisions on an experiment suffering from SRM.`,
            },
        ],
        mistakes: [
            'Ignoring sample size differences between Control and Treatment and trusting a "99% significant" result.',
            'Testing during high-noise promotional events (e.g. Black Friday) when traffic composition is radically abnormal.',
            'Calling an A/B test a winner in under 7 days before capturing a full business day-of-week cycle.',
        ],
        checklist: [
            'Run an automated Chi-Square SRM check every morning on all active tests.',
            'Verify that experiment cookies persist across checkout and root domains.',
            'Run all experiments for at least 2 full weeks regardless of early significance.',
        ],
        furtherReading: [
            { title: 'Lukas Vermeer: Diagnosing Sample Ratio Mismatch', url: 'https://lukasvermeer.nl' },
        ],
    },
    {
        id: 'm23-l5',
        moduleId: 'module-23',
        slug: 'ci-cd-performance-budgets-preventing-bloat',
        title: 'CI/CD Performance Budgets: Preventing App Bloat Regressions',
        estimatedMinutes: 25,
        objectives: [
            'Integrate Lighthouse CI into GitHub Actions for all Shopify theme PRs.',
            'Enforce hard limits on total JavaScript bundle size and Main Thread Execution Time.',
            'Prevent marketing app installations from quietly degrading Core Web Vitals.',
        ],
        videoSource: {
            title: 'Automated Performance Budgets with Lighthouse CI in GitHub Actions',
            embedUrl: 'https://www.youtube-nocookie.com/embed/vVlpCmK1l5k',
            channel: 'Chrome for Developers',
            duration: '51:48',
            description: 'Curated technical CRO masterclass from Chrome for Developers covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Lighthouse CI', 'Performance Budgets', 'GitHub Actions', 'Core Web Vitals Enforcement'],
        },
        sections: [
            {
                heading: 'The Silent Killer: App Bloat Creep',
                body: `A Shopify store often launches with a blazing Lighthouse score of 92. Over the next 12 months, marketing installs a reviews app, a wishlist app, a popup app, and 4 marketing tracking pixels.
Lighthouse score craters to 28, LCP climbs to 5.4s, and mobile CVR drops by 25%. Nobody noticed because the degradation happened 100 milliseconds at a time.`,
            },
            {
                heading: 'Enforcing Lighthouse CI in GitHub Actions',
                body: `By adding Lighthouse CI to your repository, every pull request is automatically tested against performance budgets before merging:`,
                code: `# .github/workflows/lighthouse-ci.yml
name: Lighthouse CI Performance Gatekeeper
on: [pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli@0.13.x
          lhci autorun --collect.url=https://preview-store.myshopify.com
        env:
          LHCI_GITHUB_APP_TOKEN: \${{ secrets.LHCI_TOKEN }}`,
                language: 'bash',
            },
        ],
        mistakes: [
            'Allowing marketing to install third-party apps without testing performance impact on a staging theme.',
            'Merging theme PRs that add 300KB of unminified JavaScript without code review.',
            'Relying on synthetic desktop Lighthouse scores instead of real-user mobile Core Web Vitals (CrUX).',
        ],
        checklist: [
            'Set hard limits: Max JS payload < 350KB, LCP < 2.5s.',
            'Block PR merges that degrade mobile Lighthouse score by >5 points.',
            'Audit third-party apps quarterly and remove unused scripts.',
        ],
        furtherReading: [
            { title: 'Google Chrome: Lighthouse CI GitHub Action', url: 'https://github.com/GoogleChrome/lighthouse-ci' },
        ],
    },
    // =========================================================================
    // MODULE 24: Comprehensive Master Certification Exam & Real-World Audits
    // =========================================================================
    {
        id: 'm24-l1',
        moduleId: 'module-24',
        slug: 'comprehensive-cro-framework-synthesis',
        title: 'Comprehensive CRO Framework Synthesis: From Heuristics to Edge Code',
        estimatedMinutes: 30,
        objectives: [
            'Synthesize all 6 phases of the CRO Master Curriculum into an integrated, repeatable operating system.',
            'Balance quantitative analytics, qualitative user feedback, and technical engineering constraints.',
            'Operate as a high-impact Technical CRO Lead capable of driving millions in incremental revenue.',
        ],
        videoSource: {
            title: 'How to perform a CRO audit on your site (5 steps)',
            embedUrl: 'https://www.youtube-nocookie.com/embed/CclBg0yDwbY',
            channel: 'Contentsquare',
            duration: '6:25',
            description: 'Curated technical CRO masterclass from Contentsquare covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['How to perform a CRO audit on your site (5 steps)'],
        },
        sections: [
            {
                heading: 'The Full-Stack CRO Operating System',
                body: `A true Master CRO Engineer is not just a copywriter, not just a statistician, and not just a theme coder. You are the rare full-stack practitioner who can:
1. Identify conversion leakage through GA4 funnel telemetry and session heatmaps.
2. Diagnose psychological and ergonomic friction using heuristic frameworks and thumb-zone physics.
3. Formulate falsifiable, mathematically sound hypotheses with calculated sample sizes and MDEs.
4. Engineer flicker-free Liquid and edge solutions that respect Core Web Vitals.
5. Analyze statistical results without falling for false positives, peeking, or SRM.
6. Present executive-level financial ROI to brand founders and enterprise leadership.`,
            },
            {
                heading: 'The Continuous Optimization Flywheel',
                body: `Optimization is not a one-off sprint; it is an ongoing compound interest machine. A steady cadence of 2 well-designed experiments per month, with a 33% win rate and an average 7% lift per winner, compounds to a **>25% annualized revenue lift** on existing traffic.`,
            },
        ],
        mistakes: [
            'Treating CRO as a collection of random design hacks rather than a disciplined scientific process.',
            'Stopping optimization after one winning or losing test.',
            'Failing to document institutional knowledge and test learnings in a centralized repository.',
        ],
        checklist: [
            'Maintain an active experimentation roadmap with ICE/RICE scoring.',
            'Document every test post-mortem in an Experimentation Archive.',
            'Schedule quarterly executive reviews of program revenue impact.',
        ],
        furtherReading: [
            { title: 'Experimentation Works (Stefan Thomke, Harvard Business Review)', url: 'https://hbr.org' },
        ],
    },
    {
        id: 'm24-l2',
        moduleId: 'module-24',
        slug: 'diagnosing-failed-inconclusive-ab-tests',
        title: 'Diagnosing Failed & Inconclusive A/B Tests: Post-Mortem Methodology',
        estimatedMinutes: 25,
        objectives: [
            'Understand why 65–75% of ecommerce A/B tests fail or produce flat (inconclusive) results.',
            'Conduct a forensic post-mortem to determine whether failure was a hypothesis flaw, design flaw, or statistical power issue.',
            'Extract valuable customer insights from "losing" tests to fuel winning iterations.',
        ],
        videoSource: {
            title: 'Visually | Shopify A/B Testing & CRO - a platform trusted by the fastest growing Shopify brands.',
            embedUrl: 'https://www.youtube-nocookie.com/embed/wMsLyvAobZY',
            channel: 'Visually',
            duration: '11:55',
            description: 'Curated technical CRO masterclass from Visually covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Visually', 'Shopify A/B Testing & CRO', 'a platform trusted by the fastest growing Shopify brands.'],
        },
        sections: [
            {
                heading: 'Why Flat Tests Are Not Wasted Effort',
                body: `In professional experimentation, finding out that a proposed redesign *does not* increase conversion is a major victory: it prevents the business from spending $50,000 implementing and maintaining an expensive, ineffective change.

When a test is inconclusive (p > 0.05), you must investigate:
1. Was the test underpowered? (Did you have enough traffic to detect the MDE?)
2. Did the change alter user behavior at the micro-level? (Did clicks on the button change, even if checkout was flat?)
3. Did the test have offsetting segment effects? (e.g. lifted mobile by +12%, but hurt desktop by -10%?)`,
            },
            {
                heading: 'The 4-Step Post-Mortem Framework',
                body: `1. Segment Breakdown: Analyze by Device (iOS, Android, Desktop), Traffic Source (Paid Social, Google Search, Direct), and Visitor Type (New vs Returning).
2. Funnel Heatmap Analysis: Did visitors interact with the new element, or did they completely ignore it?
3. Qualitative Validation: Run user testing on the losing variant to observe confusion points.
4. Iterate or Pivot: Refine the hypothesis or move resources to a higher-friction bottleneck.`,
            },
        ],
        mistakes: [
            'Assuming that a flat test means the problem doesn’t exist (often the problem is real, but the treatment was weak).',
            'Data dredging: cherry-picking a tiny random subsegment that looked positive and declaring it a win.',
            'Hiding failed tests from management instead of presenting the learnings transparently.',
        ],
        checklist: [
            'Segment test results by Device and Traffic Source before archiving.',
            'Document the root cause of the flat or negative result.',
            'Formulate a V2 iteration if customer feedback confirmed high friction.',
        ],
        furtherReading: [
            { title: 'Speero: How to Learn from Inconclusive A/B Tests', url: 'https://speero.com' },
        ],
    },
    {
        id: 'm24-l3',
        moduleId: 'module-24',
        slug: 'presenting-to-c-suite-communicating-roi',
        title: 'Presenting to C-Suite & Store Founders: Communicating ROI & Revenue Impact',
        estimatedMinutes: 25,
        objectives: [
            'Translate technical statistical metrics (p-values, z-scores, CLS) into executive financial language.',
            'Calculate Annualized Revenue Impact and Return on Investment (ROI) of optimization programs.',
            'Structure high-impact executive summaries that win executive buy-in and engineering budget.',
        ],
        videoSource: {
            title: 'BEST Proven Strategy To Get Sales On Shopify (Guaranteed in 2026)',
            embedUrl: 'https://www.youtube-nocookie.com/embed/CGKsaBhyaUw',
            channel: 'Silvia & Kristen (Traffic Ninjas)',
            duration: '6:40',
            description: 'Curated technical CRO masterclass from Silvia & Kristen (Traffic Ninjas) covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['BEST Proven Strategy To Get Sales On Shopify (Guaranteed in 2026)'],
        },
        sections: [
            {
                heading: 'Speaking the Language of the CEO and CFO',
                body: `Engineers love talking about "p-values of 0.02, IntersectionObserver, and Lighthouse LCP drops of 400ms."
Founders and CFOs care about three things:
1. How much additional gross revenue will this generate over the next 12 months?
2. What was the net margin impact?
3. What is the risk of rolling this out?

Whenever presenting results, start with the financial bottom line before diving into technical implementation details.`,
            },
            {
                heading: 'The Annualized Revenue Impact Formula',
                body: `\`Annualized Impact = Baseline Annual Revenue × Absolute CVR Lift % / Baseline CVR\`
Example:
- Store Baseline Revenue: $12,000,000
- Baseline CVR: 2.40%
- Variant B CVR: 2.64% (a 10% relative lift, +0.24% absolute)
- **Annualized Impact: $12,000,000 × 0.10 = $1,200,000 in incremental top-line revenue!**

When you demonstrate that your $15,000 optimization engagement created $1,200,000 in recurring enterprise value, your status shifts from an expendable contractor to an indispensable strategic partner.`,
            },
        ],
        mistakes: [
            'Opening executive meetings with statistical formulas and technical jargon.',
            'Claiming 100% certainty on revenue projections without acknowledging confidence intervals.',
            'Failing to connect speed optimizations to actual conversion rate improvements.',
        ],
        checklist: [
            'Include a 1-page Executive Summary slide with projected dollar impact.',
            'Provide conservative, moderate, and aggressive financial projection scenarios.',
            'Highlight speed and stability improvements as risk-mitigation metrics.',
        ],
        furtherReading: [
            { title: 'McKinsey: Quantifying the ROI of Customer Experience', url: 'https://mckinsey.com' },
        ],
    },
    {
        id: 'm24-l5',
        moduleId: 'module-24',
        slug: 'masterclass-shopify-plus-cro-architecture-end-to-end',
        title: 'Masterclass: End-to-End Shopify Plus CRO Architecture (Liquid, Section Rendering, Functions & Checkout UI)',
        estimatedMinutes: 45,
        objectives: [
            'Unify all 4 technical layers of Shopify optimization: Server-Rendered Liquid, AJAX Section Rendering API, Back-End Shopify Functions, and Checkout UI Extensions.',
            'Know exactly which Shopify API to use for each stage of the customer funnel to achieve zero page reloads and sub-100ms response times.',
            'Implement a complete zero-reload Add-to-Cart -> Slide-Out Drawer -> Tiered Function Discount -> Checkout Extension pipeline.',
        ],
        sections: [
            {
                heading: 'The 4 Technical Layers of Shopify Mastery',
                body: `To operate as an elite Shopify CRO Architect, you must understand how Shopify's four execution layers work together across the funnel. Choosing the wrong layer (for example, using a bloated client-side jQuery app for tiered discounts instead of a back-end Shopify Function) introduces flicker, layout shifts, and broken checkout totals.

Here is the definitive architecture map every senior Shopify CRO engineer uses:
1. Layer 1 — Edge-Cached Server Liquid (Homepage, Collection, PDP Initial Paint): Responsible for sub-2.0s Largest Contentful Paint (LCP), semantic HTML5 structure, SEO metadata, and zero-JavaScript initial render of above-the-fold product media and pricing.
2. Layer 2 — AJAX Cart & Section Rendering API (PDP Variant Switching, Slide-Out Cart Drawer, Faceted Filtering): Allows you to mutate cart state via POST /cart/add.js and simultaneously request fresh server-rendered HTML fragments (?sections=cart-drawer,cart-icon-bubble) in a single HTTP roundtrip without reloading the page.
3. Layer 3 — Shopify Functions (Wasm Back-End Logic for Discounts, Shipping & Cart Validation): Executes compiled logic directly inside Shopify's checkout engine in under 5ms. Powers automatic tiered volume discounts, free gift injection rules, payment method hiding, and delivery rate sorting without messy discount codes.
4. Layer 4 — Checkout UI Extensions & Web Pixels API (Checkout, Thank You & Order Status Pages): Runs in a secure sandboxed Web Worker to render custom trust seals, delivery date pickers, 1-click upsells, and privacy-compliant server/client telemetry.`,
                callout: {
                    type: 'shopify',
                    text: 'Architectural Golden Rule: Never compute discounts or shipping rules in client-side theme JavaScript. Always use Shopify Functions so the exact same pricing rules are enforced natively inside Shop Pay, Apple Pay, and Checkout.',
                },
            },
            {
                heading: 'Building the Zero-Reload PDP-to-Cart Pipeline with Bundled Section Rendering',
                body: `The single highest-leverage technical optimization on a Shopify storefront is replacing full-page cart redirects (or slow multi-request AJAX carts) with Shopify's Bundled Section Rendering API.

When a shopper clicks "Add to Cart" on a Product Detail Page, you do not need two separate network requests (one to add the item and another to fetch the updated cart HTML). Instead, pass the sections array directly inside your /cart/add.js payload. Shopify's server adds the line item, re-renders the exact Liquid sections you requested against the new cart state, and returns both the item JSON and the fresh HTML strings in a single response:`,
                code: `// Production Zero-Reload Add-to-Cart + Slide-Out Drawer Update
async function addToCartWithBundledSections(variantId, quantity = 1, properties = {}) {
  const submitBtn = document.querySelector('[data-atc-button]');
  submitBtn?.setAttribute('aria-busy', 'true');

  try {
    const response = await fetch(window.Shopify.routes.root + 'cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        items: [{ id: Number(variantId), quantity, properties }],
        // Request server-rendered HTML fragments in the exact same roundtrip!
        sections: ['cart-drawer', 'header-cart-count'],
        sections_url: window.location.pathname,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.description || 'Unable to add item to cart');
    }

    const result = await response.json();

    // 1. Swap the Cart Drawer HTML instantaneously
    const drawerContainer = document.getElementById('CartDrawerContainer');
    if (drawerContainer && result.sections['cart-drawer']) {
      drawerContainer.innerHTML = result.sections['cart-drawer'];
    }

    // 2. Update the Header Cart Bubble count
    const bubbleContainer = document.getElementById('HeaderCartBubble');
    if (bubbleContainer && result.sections['header-cart-count']) {
      bubbleContainer.innerHTML = result.sections['header-cart-count'];
    }

    // 3. Open the slide-out drawer smoothly
    document.body.classList.add('cart-drawer-open');
    return result;
  } finally {
    submitBtn?.removeAttribute('aria-busy');
  }
}`,
                language: 'javascript',
                callout: {
                    type: 'tip',
                    text: 'Bundling `sections: ["cart-drawer", "header-cart-count"]` inside POST `/cart/add.js` cuts network latency in half on 4G mobile connections, making the cart drawer feel instantaneous.',
                },
            },
            {
                heading: 'Connecting Cart Progress Thresholds to Shopify Functions & Checkout UI',
                body: `Once the cart drawer opens, high-converting stores use a dynamic multi-tier progress bar (e.g., Tier 1: $75 Free Express Shipping; Tier 2: $125 Automatic 15% Bundle Savings).

To make this rock-solid from the Cart Drawer all the way through Checkout:
1. Store the threshold values in a global shop metafield (shop.metafields.cro.reward_tiers.value) so merchandisers can update thresholds in one place.
2. Render the visual progress bar in cart-drawer.liquid using cart.total_price.
3. Read the exact same metafield inside your Product/Order Discount Shopify Function so the 15% discount triggers automatically the instant cart subtotal crosses $125—with zero promo code typing required.
4. Mirror the progress bar inside Checkout using a React Checkout UI Extension mounted at purchase.checkout.block.render so shoppers who jump straight to Checkout via Shop Pay or Apple Pay still see how close they are to the reward.`,
                code: `{% comment %} snippets/cart-reward-tiers.liquid — Driven by Shop Metafields {% endcomment %}
{% assign tier_shipping_cents = 7500 %}
{% assign tier_discount_cents = 12500 %}
{% assign current_cents = cart.total_price %}

{% if current_cents < tier_shipping_cents %}
  {% assign remaining = tier_shipping_cents | minus: current_cents | money_without_trailing_zeros %}
  {% assign pct = current_cents | times: 100 | divided_by: tier_discount_cents %}
  {% assign message = 'Add <strong>' | append: remaining | append: '</strong> more to unlock <strong>FREE Express Shipping!</strong>' %}
{% elsif current_cents < tier_discount_cents %}
  {% assign remaining = tier_discount_cents | minus: current_cents | money_without_trailing_zeros %}
  {% assign pct = current_cents | times: 100 | divided_by: tier_discount_cents %}
  {% assign message = '✓ Free Shipping Unlocked! Add <strong>' | append: remaining | append: '</strong> more for <strong>15% OFF your order!</strong>' %}
{% else %}
  {% assign pct = 100 %}
  {% assign message = '🎉 You unlocked <strong>FREE Express Shipping + 15% Bundle Discount!</strong>' %}
{% endif %}

<div class="cart-tier-tracker" role="region" aria-label="Cart Rewards Progress">
  <p class="cart-tier-tracker__copy">{{ message }}</p>
  <div class="cart-tier-tracker__bar">
    <div class="cart-tier-tracker__fill" style="width: {{ pct | at_most: 100 }}%;"></div>
  </div>
</div>`,
                language: 'liquid',
                callout: {
                    type: 'note',
                    text: 'Multi-tier progress bars (combining a lower Free Shipping threshold with a higher Discount/Gift threshold) lift Average Order Value (AOV) by 14–22% compared to single-tier bars.',
                },
            },
        ],
        mistakes: [
            'Making two sequential fetch calls (/cart/add.js followed by /cart.js) instead of using bundled Section Rendering.',
            'Requiring customers to remember and manually type a discount code at checkout for a promotion advertised in the cart drawer.',
            'Hardcoding free-shipping dollar thresholds in 4 different files instead of reading from a single Theme Setting or Shop Metafield.',
        ],
        checklist: [
            'I can explain the 4 technical layers of Shopify optimization and when to use each.',
            'I use bundled Section Rendering inside POST /cart/add.js for zero-reload cart updates.',
            'I synchronize cart drawer reward thresholds with automatic Shopify Functions in checkout.',
        ],
        furtherReading: [
            { title: 'Shopify Dev: Bundled Section Rendering API', url: 'https://shopify.dev/docs/api/ajax/reference/cart#bundled-section-rendering' },
            { title: 'Shopify Dev: Discount Functions Architecture', url: 'https://shopify.dev/docs/apps/selling-strategies/discounts/experience' },
        ],
    },
    {
        id: 'm24-l6',
        moduleId: 'module-24',
        slug: 'masterclass-unit-economics-contribution-margin-ltv-cac',
        title: 'Masterclass: Full-Funnel Unit Economics, Contribution Margin (CM1/CM2/CM3) & LTV:CAC',
        estimatedMinutes: 40,
        objectives: [
            'Master the complete ecommerce P&L hierarchy: Gross Revenue, Net Sales, CM1, CM2, and CM3 (Net Contribution Margin).',
            'Calculate Contribution Margin Per Session (CMPS) to evaluate pricing, bundling, and free-shipping threshold tests accurately.',
            'Connect front-end CRO improvements directly to Customer Acquisition Cost (CAC) ceilings and 90-day LTV payback.',
        ],
        sections: [
            {
                heading: 'The 3 Tiers of Contribution Margin (CM1, CM2, CM3)',
                body: `Top 1% CRO Directors never optimize for raw Conversion Rate (CVR) or even raw Gross Revenue in isolation—they optimize for Contribution Margin. To speak with founders, private equity operators, and CFOs, you must master the three tiers of Contribution Margin on a Shopify P&L:

• Net Sales = Gross Revenue - Discounts - Returns & Refunds.
• CM1 (Gross Margin / Product Margin) = Net Sales - Cost of Goods Sold (COGS: manufacturing, packaging, landed duty). Typically 60%–80% for DTC brands.
• CM2 (Order Contribution Margin) = CM1 - Variable Order Fulfillment Costs (3PL pick-and-pack fees, outbound shipping postage, and ~2.9% + $0.30 Shopify Payments processing fees).
• CM3 (Net Marketing Contribution Margin) = CM2 - Paid Acquisition Spend (Meta, Google, TikTok ad spend).

Why does this matter for CRO? Because when your A/B test increases CVR by 15% or lifts AOV by $18 via a multi-pack bundle without increasing outbound shipping weight, almost 100% of that incremental CM2 flows straight into CM3 net profit!`,
                callout: {
                    type: 'note',
                    text: 'The Ultimate Metric: Contribution Margin Per Session (CMPS) = Total CM2 Dollars / Total Store Sessions. Always evaluate price-testing and shipping-threshold experiments using CMPS.',
                },
            },
            {
                heading: 'Why Multi-Pack Bundling Multiplies CM2 Profit',
                body: `Let's examine why bundle architecture on the PDP and Cart Drawer is the most profitable lever in Shopify CRO.

Suppose a skincare brand sells a cleanser for $40:
- COGS: $8.00
- 3PL Pick/Pack + Shipping Postage: $7.50
- Payment Processing (3%): $1.20
- Single-Unit CM2 Profit: $40.00 - $8.00 - $7.50 - $1.20 = $23.30 (58.2% CM2 margin).

Now suppose we introduce a "Buy 2, Save 10% ($72)" bundle tier on the PDP:
- Revenue: $72.00
- COGS (2 units): $16.00
- 3PL Pick/Pack + Shipping Postage (shipped in the exact same box!): $8.00
- Payment Processing (3%): $2.16
- 2-Pack CM2 Profit: $72.00 - $16.00 - $8.00 - $2.16 = $45.84!

Even after giving the customer a 10% discount, the merchant's net CM2 dollar profit per order nearly doubled from $23.30 to $45.84 because fulfillment, packaging, and customer acquisition costs were amortized across a single shipment.`,
                code: `// Full-Funnel Contribution Margin (CM2 & CMPS) Calculator for A/B Tests
export interface VariantEconomicsInput {
  sessions: number;
  orders: number;
  grossRevenue: number;
  discounts: number;
  refundRatePct: number;
  cogsPerOrder: number;
  shippingAnd3plPerOrder: number;
  paymentGatewayPct: number;
  paymentGatewayFixed: number;
}

export function calculateVariantContributionMargin(v: VariantEconomicsInput) {
  const netSales = (v.grossRevenue - v.discounts) * (1 - v.refundRatePct / 100);
  const totalCogs = v.orders * v.cogsPerOrder;
  const cm1 = netSales - totalCogs;

  const totalFulfillment = v.orders * v.shippingAnd3plPerOrder;
  const totalPaymentFees =
    netSales * (v.paymentGatewayPct / 100) + v.orders * v.paymentGatewayFixed;

  const cm2 = cm1 - totalFulfillment - totalPaymentFees;
  const cmPerSession = cm2 / v.sessions;
  const rps = netSales / v.sessions;

  return {
    cvrPct: ((v.orders / v.sessions) * 100).toFixed(2) + '%',
    aov: '$' + (netSales / v.orders).toFixed(2),
    rps: '$' + rps.toFixed(2),
    cm2Total: '$' + Math.round(cm2).toLocaleString(),
    cmPerSession: '$' + cmPerSession.toFixed(2),
  };
}`,
                language: 'javascript',
                callout: {
                    type: 'tip',
                    text: 'When pitching a PDP bundle selector or cart cross-sell to a merchant, emphasize that shipping two units in one box saves $6–$9 in duplicate postage, supercharging CM2 profit.',
                },
            },
            {
                heading: 'How CRO Unlocks Paid Acquisition Scale (The CAC Ceiling)',
                body: `Many founders mistakenly view Paid Media (Meta/Google Ads) and CRO as separate departments. In reality, CRO determines how aggressively a brand can bid in ad auctions:

• Break-Even First-Order CAC = Average Order Value (AOV) × CM2 Margin %.
• If a store has an $80 AOV at a 60% CM2 margin, its Break-Even CAC is $48. If Meta CPA is $52, the brand loses $4 on every first-time customer and cannot scale ad spend.
• If your CRO program lifts CVR from 2.0% to 2.5% (+25% relative lift) AND increases AOV from $80 to $96 via PDP bundles, two things happen simultaneously:
  1. Effective CAC drops by 20% (because 25% more ad clicks convert into buyers).
  2. Break-Even CAC rises from $48 to $57.60.

Suddenly, the brand goes from losing $4 per order to generating +$16.00 in first-order profit—unlocking profitable scaling from $50k/month to $250k/month in ad spend.`,
                callout: {
                    type: 'shopify',
                    text: 'CRO is the force multiplier on every dollar of ad spend. A 20% lift in Revenue Per Session (RPS) immediately lowers effective Customer Acquisition Cost (CAC) across all paid channels.',
                },
            },
        ],
        mistakes: [
            'Evaluating free-shipping threshold tests using only Gross Revenue while ignoring outbound postage costs.',
            'Running site-wide percentage discounts without checking if the extra orders cover the lost CM2 margin.',
            'Failing to deduct refund rates when comparing an aggressive upsell variant against control.',
        ],
        checklist: [
            'I can define and calculate CM1, CM2, and CM3 for any Shopify store.',
            'I evaluate pricing, bundling, and shipping tests using Contribution Margin Per Session (CMPS).',
            'I can explain how lifting CVR and AOV raises a brand’s break-even CAC ceiling.',
        ],
        furtherReading: [
            { title: 'Shopify Plus: Ecommerce Unit Economics Guide', url: 'https://www.shopify.com/enterprise' },
        ],
    },
    {
        id: 'm24-l7',
        moduleId: 'module-24',
        slug: 'masterclass-100-point-complete-storefront-teardown',
        title: 'Masterclass: The Complete Storefront Teardown Blueprint (Home, Collection, PDP, Cart & Checkout)',
        estimatedMinutes: 45,
        objectives: [
            'Execute a systematic, end-to-end CRO teardown across every template of a Shopify store.',
            'Diagnose the top high-impact conversion leaks on Homepage, Collection, PDP, Cart Drawer, and Checkout.',
            'Pair every heuristic diagnosis with its exact Shopify Liquid, CSS, and JavaScript engineering solution.',
        ],
        sections: [
            {
                heading: 'Surface 1 & 2: Homepage & Collection Page Teardown Blueprint',
                body: `When auditing a Shopify storefront from top to bottom, start by evaluating how quickly a cold visitor understands the value proposition and reaches a relevant product:

1. Homepage Above-the-Fold (The 5-Second Test):
   - Leak: Vague lifestyle headline ("Welcome to Summer") with a slow 12MB autoplay background video and a generic "Explore" button.
   - Fix: Outcome-driven headline stating WHAT the product is, WHO it is for, and the #1 differentiator; social proof rating strip ("★ 4.9/5 from 14,200+ customers"); dual CTAs ("Shop Best Sellers" + "Take 60s Finder Quiz"); and a preload-prioritized WebP hero image.
2. Navigation & Predictive Search Header:
   - Leak: Multi-level nested text dropdowns and a hidden search icon.
   - Fix: Visual thumbnail category tiles in the mobile drawer + an expanded predictive search bar returning instant product cards with prices in under 100ms.
3. Collection Grid & Faceted Filtering:
   - Leak: 60 unorganized products with no filters on mobile and full-page reloads on sort changes.
   - Fix: Sticky mobile "Filter & Sort" bar powered by the Section Rendering API, horizontal "Best For" quick-filter chips at the top of the collection, and product cards displaying review count, color swatches, and a secondary hover/swipe lifestyle photo.`,
                callout: {
                    type: 'tip',
                    text: 'Never use "Quick Add" buttons on complex multi-variant products if clicking them adds a random default size without asking. Use a fast bottom-sheet size picker instead.',
                },
            },
            {
                heading: 'Surface 3: Product Detail Page (PDP) Surgery Blueprint',
                body: `Because 65–75% of paid social and search traffic lands directly on the Product Detail Page, the PDP is your highest-ROI surface. Audit the buy-box from top to bottom in mobile viewport (390×844):

1. Gallery Ergonomics: First image shows the clear product outcome; thumbnail carousel supports smooth touch-swipe with pinch-to-zoom; video demo or 3D model sits in slot #2 or #3.
2. Buy-Box Hierarchy (Above the Fold):
   - Star rating anchor link that scrolls smoothly to verified photo reviews.
   - Product Title + 1-sentence benefit subtitle.
   - Price + Compare-at strikethrough anchor + automatic "Save $X" badge + BNPL installment callout.
   - Scannable 3-bullet value stack (with checkmarks) answering top buyer objections.
   - Visual color swatches + touch-friendly size tiles (48px min height) + modal Size Guide with fit predictor ("True to size").
   - High-contrast full-width Add-to-Cart button + risk-reversal microcopy directly underneath ("Ships today • Free 30-day returns • 2-Year Warranty").
3. Below-the-Fold Persuasion Stack:
   - Structured Accordion tabs (Description/Benefits, Ingredients/Materials, Shipping & Returns) so mobile users aren't forced to scroll through a 3,000-word wall of text.
   - Sticky Mobile Bottom Buy Bar triggered via IntersectionObserver the moment the main Add-to-Cart button scrolls out of view.`,
                code: `{% comment %} High-Converting PDP Risk-Reversal Microcopy Bar (Directly Below ATC Button) {% endcomment %}
<ul class="pdp-trust-microbar" role="list">
  <li class="pdp-trust-microbar__item">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    <span>Ships within <strong>24 hours</strong></span>
  </li>
  <li class="pdp-trust-microbar__item">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    <span><strong>60-Day</strong> Money-Back Guarantee</span>
  </li>
  <li class="pdp-trust-microbar__item">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
    <span>Free &amp; Easy <strong>Exchanges</strong></span>
  </li>
</ul>`,
                language: 'liquid',
                callout: {
                    type: 'shopify',
                    text: 'Placing shipping speed and return guarantee microcopy within 40px of the primary Add-to-Cart button reduces last-second purchase hesitation and lifts ATC rate by 5–11%.',
                },
            },
            {
                heading: 'Surface 4 & 5: Slide-Out Cart Drawer & Checkout Extensibility Teardown',
                body: `Once the customer clicks Add to Cart, your goal is to protect momentum while ethically expanding basket size:

1. Slide-Out Cart Drawer (100dvh Safe Viewport):
   - Uses height: 100dvh and env(safe-area-inset-bottom) so the Checkout CTA is never hidden behind iOS Safari's bottom toolbar.
   - Displays a Loss-Aversion Reward Progress Bar at the top ("You're $14 away from Free Express Shipping!").
   - Collapses the Promo Code input behind a subtle "Have a promo code?" accordion so shoppers without a code don't leave the site to hunt on coupon sites.
   - Displays 1–2 relevant, low-friction 1-click complementary add-ons (under 25% of cart subtotal, e.g., $12 leather care kit for $160 boots).
   - Shows a sticky footer with estimated shipping, clear subtotal, primary Checkout CTA displaying a lock icon, and accelerated wallet badges.
2. Shopify One-Page Checkout & Post-Purchase:
   - Branded header matching storefront typography and colors (prevents jarring redirect anxiety).
   - Checkout UI Extension displaying verified customer guarantee + delivery date estimate.
   - 1-Click Post-Purchase Offer (between payment confirmation and Thank You page) offering a 20% discount on a refill or complementary item without re-entering payment info.`,
                callout: {
                    type: 'warning',
                    text: 'Never display an open, prominent "DISCOUNT CODE" text box inside the cart drawer. An open coupon box triggers "promo code FOMO," causing 8–14% of shoppers to open a new tab to search Google for codes and abandon their cart.',
                },
            },
        ],
        mistakes: [
            'Auditing a store on a desktop monitor instead of a 390px mobile viewport where 75%+ of customers actually shop.',
            'Showing an open coupon box in the cart drawer that drives shoppers off-site to coupon aggregators.',
            'Using generic upsells in the cart drawer that cost more than the primary item in the cart.',
        ],
        checklist: [
            'I can audit all 5 Shopify surfaces (Homepage, Collection, PDP, Cart Drawer, Checkout) systematically.',
            'I collapse promo code inputs in the cart drawer behind an accordion link.',
            'I place risk-reversal guarantees directly below the primary Add-to-Cart and Checkout buttons.',
        ],
        furtherReading: [
            { title: 'Baymard Institute: E-Commerce UX Benchmark Database', url: 'https://baymard.com' },
        ],
    },
    {
        id: 'm24-l4',
        moduleId: 'module-24',
        slug: 'master-cro-developer-certification-prep',
        title: 'Preparing for the Master CRO Developer Certification Exam',
        estimatedMinutes: 20,
        objectives: [
            'Review core competencies across all 24 modules: analytics, statistics, Liquid, psychology, and performance.',
            'Understand the grading rubric and real-world scenario expectations of the Master Exam.',
            'Equip yourself to tackle the 10-scenario comprehensive final assessment.',
        ],
        videoSource: {
            title: 'CRO Masterclass for Supplements Brands on Shopify presented by Shoplift, Recharge, and Absolute Web',
            embedUrl: 'https://www.youtube-nocookie.com/embed/Vz51dqM41tw',
            channel: 'Shoplift',
            duration: '54:49',
            description: 'Curated technical CRO masterclass from Shoplift covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['CRO Masterclass for Supplements Brands on Shopify presented by Shoplift', 'Recharge', 'and Absolute Web'],
        },
        sections: [
            {
                heading: 'The Benchmark of Master-Level Competence',
                body: `The Grand Master CRO Developer Certification Exam is designed to simulate the real-world challenges faced by Senior Conversion Engineers at top Shopify Plus brands and premier CRO agencies.

The exam assesses 5 core pillars:
1. **Funnel Economics & Statistical Rigor:** MDE, sample sizing, two-tailed z-tests, SRM diagnosis, and RPS formulas.
2. **Shopify Technical Architecture:** Liquid templates, Web Pixels API, Ajax Cart API, Section Rendering API, and Shopify Functions.
3. **Ergonomics & Performance:** Thumb-zone design, mobile checkout friction, Core Web Vitals (LCP, CLS, INP), and Lighthouse CI.
4. **Behavioral Psychology & Copy:** Anchoring, Decoy pricing, loss aversion, risk reversal, and ethical persuasion.
5. **Program Management & Executive Strategy:** 90-day roadmaps, ICE prioritization, post-mortems, and annualized ROI presentation.`,
            },
            {
                heading: 'How to Take the Exam',
                body: `Take your time to read each scenario carefully. In the next module quiz, you will face 10 in-depth scenario-based questions. Achieving an 80%+ score unlocks the **CRO Master Architect** badge and verifies your status as a professional conversion rate optimization specialist.`,
            },
        ],
        mistakes: [
            'Rushing through questions without considering edge cases and statistical pitfalls.',
            'Focusing only on code while ignoring the commercial business impact.',
        ],
        checklist: [
            'Review your notes and saved bookmarks from Phases 1 through 6.',
            'Keep a calculator and scratchpad ready for metrics and sample sizing scenarios.',
            'Begin the Grand Master Exam with confidence.',
        ],
        furtherReading: [
            { title: 'CRO Master Checklist & Reference Guide', url: '/metrics' },
        ],
    },
];
