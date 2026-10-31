export const PHASE_5_LESSONS = [
    // =========================================================================
    // MODULE 17: Mobile UX & Responsive CRO
    // =========================================================================
    {
        id: 'm17-l1',
        moduleId: 'module-17',
        slug: 'mobile-first-cro-thumb-zone-physics',
        title: 'The Mobile-First CRO Paradigm: Thumb-Zone Physics & Viewport Shifts',
        estimatedMinutes: 25,
        objectives: [
            'Understand why 75%+ of Shopify traffic is mobile and how desktop-first optimization biases harm conversion.',
            'Master Steven Hoober’s thumb-zone ergonomics for one-handed mobile browsing.',
            'Diagnose mobile viewport height shifts (dvvh vs vh) and keyboard-induced form clipping.',
        ],
        videoSource: {
            title: 'Shopify Mobile Design Optimization Tips for Better SEO & CRO',
            embedUrl: 'https://www.youtube-nocookie.com/embed/d4d2gDTR1-k',
            channel: 'Jake Willhoite | Shopify SEO',
            duration: '15:47',
            description: 'Curated technical CRO masterclass from Jake Willhoite | Shopify SEO covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Shopify Mobile Design Optimization Tips for Better SEO & CRO'],
        },
        sections: [
            {
                heading: 'The 75% Mobile Reality',
                body: `Across Shopify Plus and direct-to-consumer (DTC) storefronts, 72% to 84% of total traffic and 60% to 75% of transaction volume occurs on mobile devices. Despite this, most developers write and review code on 27-inch 4K desktop monitors using high-speed fiber internet.

Mobile users experience high distraction, lower cognitive patience, unpredictable network latency, and physical ergonomic constraints. When you optimize for mobile, you are not merely resizing CSS columns with media queries — you are engineering for the physical anatomy of the human hand holding a 6.1" to 6.7" glass slab while walking.`,
                callout: {
                    type: 'tip',
                    text: 'Never evaluate mobile conversion solely in DevTools responsive mode. Test on real physical iOS and Android devices with actual thumb interactions.',
                },
            },
            {
                heading: 'Steven Hoober’s Thumb Zone Ergonomics',
                body: `Research shows that 49% of mobile users operate their phone with one hand, 36% cradle it with two hands using one thumb, and only 15% use two hands with index fingers. This means 85%+ of interactions are thumb-driven.

The mobile screen divides into three critical ergonomic zones:
1. Natural Zone (Bottom 35%): Effortless thumb arc. Ideal for primary actions (Add to Cart, Sticky Buy Bar, Filter Drawer Toggles, Variant Selectors).
2. Stretch Zone (Middle 45%): Reachable with slight hand repositioning. Suitable for product descriptions, reviews, and secondary links.
3. Hard-to-Reach Zone (Top 20%): Requires shifting grip or using a second hand. Placing critical interactive CTAs here increases drop-off by 18–24%.`,
                code: `/* Ergonomic Touch Target Standard */
.btn-mobile-primary {
  min-height: 48px; /* Meets WCAG 2.2 AAA 44x44px + touch padding */
  padding: 14px 20px;
  font-size: 16px; /* Prevents iOS auto-zoom on form focus */
  border-radius: 8px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: manipulation; /* Eliminates 300ms tap delay */
}`,
                language: 'css',
            },
            {
                heading: 'Viewport Units: The dvh vs vh Trap',
                body: `A classic mobile CRO bug occurs when developers use 100vh for full-height drawers, cart modals, or sticky banners. On mobile Safari and Chrome, dynamic browser toolbars (the URL bar and bottom navigation) shrink and expand as the user scrolls.

Using 100vh causes primary CTAs (such as "Proceed to Checkout") to render underneath Safari’s bottom navigation bar, rendering the button invisible or unclickable. Always use the modern dynamic viewport height: 100dvh with a 100vh fallback.`,
                code: `/* Safe Dynamic Viewport Drawer */
.cart-drawer-mobile {
  position: fixed;
  inset: 0;
  height: 100vh; /* Fallback for legacy webviews */
  height: 100dvh; /* Dynamically tracks browser chrome collapse */
  display: flex;
  flex-direction: column;
  padding-bottom: env(safe-area-inset-bottom, 16px);
}`,
                language: 'css',
            },
        ],
        mistakes: [
            'Placing primary "Add to Cart" or "Checkout" buttons in the top 20% of mobile screens.',
            'Using font sizes below 16px on form inputs, causing iOS Safari to forcefully zoom in and break layout.',
            'Using 100vh on fixed mobile drawers instead of 100dvh with safe-area-inset-bottom.',
        ],
        checklist: [
            'Verify all primary CTAs are within the lower 35% thumb zone.',
            'Ensure touch targets are at least 48x48px with 8px spacing.',
            'Test cart drawer on physical iPhone with home indicator safe-area padding.',
        ],
        furtherReading: [
            { title: 'Designing for Touch (Steven Hoober)', url: 'https://alistapart.com/article/how-we-hold-our-gadgets/' },
            { title: 'MDN: Viewport Units dvh, svh, lvh', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/length#viewport-percentage_lengths' },
        ],
    },
    {
        id: 'm17-l2',
        moduleId: 'module-17',
        slug: 'sticky-ctas-bottom-sheet-liquid',
        title: 'Sticky CTAs & Bottom Sheet Architecture in Liquid',
        estimatedMinutes: 30,
        objectives: [
            'Architect a high-performance, non-intrusive mobile sticky ATC bar triggered by IntersectionObserver.',
            'Implement native bottom-sheet drawer patterns for variant selection and bundle upselling.',
            'Prevent layout thrashing and Cumulative Layout Shift (CLS) when sticky elements dock.',
        ],
        videoSource: {
            title: 'Shopify Liquid Crash Course (10 Minutes!)',
            embedUrl: 'https://www.youtube-nocookie.com/embed/-fEcwEouBDc',
            channel: 'Shopify AI + Dev',
            duration: '11:00',
            description: 'Curated technical CRO masterclass from Shopify AI + Dev covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Shopify Liquid Crash Course (10 Minutes!)'],
        },
        sections: [
            {
                heading: 'Why Sticky Mobile CTAs Lift Mobile CVR by 8–15%',
                body: `On a mobile PDP, a user scrolls through 4 to 8 screen-heights of product photography, reviews, feature bullets, and FAQ accordions. Once they decide to purchase at the bottom of the page, forcing them to scroll back to the top introduces severe friction and gives them time to reconsider.

A sticky bottom ATC bar ensures that purchase intent can be captured at any point in the scroll journey without cognitive interruption.`,
            },
            {
                heading: 'IntersectionObserver Architecture',
                body: `Naive developers use window scroll event listeners to toggle sticky bars. This causes constant layout recalculations, main-thread blocking, and battery drain on mobile devices.

The modern CRO standard uses IntersectionObserver to monitor the native form button. When the native button leaves the viewport, the sticky bar slides up smoothly with CSS transforms.`,
                code: `{% comment %} snippets/sticky-mobile-atc.liquid {% endcomment %}
<div id="StickyMobileBar" class="sticky-mobile-bar" aria-hidden="true">
  <div class="sticky-mobile-bar__inner">
    <div class="sticky-mobile-bar__info">
      <span class="sticky-mobile-bar__title">{{ product.title | truncate: 25 }}</span>
      <span class="sticky-mobile-bar__price" id="StickyPrice">{{ product.selected_or_first_available_variant.price | money }}</span>
    </div>
    <button
      type="button"
      id="StickyAtcBtn"
      class="btn btn-primary"
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
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const mainAtc = document.querySelector('form[action*="/cart/add"] [type="submit"]');
  const stickyBar = document.getElementById('StickyMobileBar');
  if (!mainAtc || !stickyBar) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // If native button is visible, hide sticky bar; if scrolled past, reveal it
      const isVisible = entry.isIntersecting;
      stickyBar.classList.toggle('is-visible', !isVisible);
      stickyBar.setAttribute('aria-hidden', String(isVisible));
    });
  }, { threshold: 0.1 });

  observer.observe(mainAtc);
});
</script>`,
                language: 'liquid',
            },
            {
                heading: 'Bottom Sheet Architecture for Multi-Variant Products',
                body: `If a product has 3 color variants and 5 sizes, squeezing 15 variant options into a 60px bottom bar is impossible. Instead, tapping the sticky button opens a lightweight native Bottom Sheet modal with high-contrast radio tiles, letting the user tap their size and immediately add to cart without jumping back up the page.`,
            },
        ],
        mistakes: [
            'Using window.addEventListener("scroll") without throttling, causing severe frame drops (jank).',
            'Covering critical cookie consent banners or Shopify chat widgets with an unpadded sticky bar.',
            'Failing to synchronize variant price changes between the main form and the sticky bar.',
        ],
        checklist: [
            'Use IntersectionObserver with rootMargin or threshold.',
            'Ensure sticky bar has will-change: transform and smooth CSS transitions.',
            'Add safe-area-inset-bottom so the bar does not collide with the iPhone home bar.',
        ],
        furtherReading: [
            { title: 'MDN: IntersectionObserver API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API' },
        ],
    },
    {
        id: 'm17-l3',
        moduleId: 'module-17',
        slug: 'mobile-touch-targets-form-keyboard-traps',
        title: 'Mobile Touch Targets, Form Inputs & Keyboard Traps',
        estimatedMinutes: 25,
        objectives: [
            'Eliminate input type mistakes that cause numeric keypad failures on mobile checkouts.',
            'Prevent keyboard overlap bugs that conceal submit buttons on mobile screens.',
            'Implement inputmode, autocomplete, and autocapitalize for frictionless data entry.',
        ],
        videoSource: {
            title: 'UI/UX Form Design DO\'s and DON\'Ts! Review',
            embedUrl: 'https://www.youtube-nocookie.com/embed/I5Vz2pl8pPI',
            channel: 'DesignCourse',
            duration: '11:15',
            description: 'Curated technical CRO masterclass from DesignCourse covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['UI/UX Form Design DO\'s and DON\'Ts! Review'],
        },
        sections: [
            {
                heading: 'Mobile Form Psychology: Every Tap is a Drop-Off Threat',
                body: `Entering shipping addresses and credit card information on a mobile keyboard is the single highest-friction moment in ecommerce. Every unnecessary tap, incorrect keyboard layout (such as showing the alphabetical keyboard when entering a postal code or phone number), or auto-correct typo increases abandonment by 3–7%.`,
            },
            {
                heading: 'Proper HTML5 Form Attributes for Mobile',
                body: `Shopify Checkout Extensibility and custom newsletter/discount forms must provide precise browser hints to open the exact keyboard needed:`,
                code: `<!-- Optimized Mobile Form Inputs -->
<!-- Phone: Opens telephone keypad -->
<input
  type="tel"
  name="phone"
  inputmode="tel"
  autocomplete="tel"
  placeholder="Phone number"
  required
>

<!-- Postal Code: Opens numeric keypad without decimals -->
<input
  type="text"
  name="postal-code"
  inputmode="numeric"
  pattern="[0-9]*"
  autocomplete="postal-code"
  placeholder="ZIP / Postal Code"
>

<!-- Email: Disables auto-capitalization and spellcheck -->
<input
  type="email"
  name="email"
  inputmode="email"
  autocomplete="email"
  autocapitalize="off"
  autocorrect="off"
  spellcheck="false"
  placeholder="your.email@domain.com"
>`,
                language: 'html',
            },
            {
                heading: 'Scroll-Into-View on Keyboard Focus',
                body: `When a mobile keyboard opens, it occupies 40% to 50% of the visible viewport. If the active input or its submit button is positioned below the keyboard line, the user is blinded. Implement a clean blur/focus listener that scrolls the input into the optical center of the remaining visible space.`,
            },
        ],
        mistakes: [
            'Using type="number" instead of inputmode="numeric" pattern="[0-9]*" (type="number" displays unwanted spinner arrows and handles ZIP codes with leading zeros poorly).',
            'Leaving autocapitalize="on" on email fields, forcing users to delete capital first letters.',
            'Placing coupon code inputs in prominent visual hierarchy before shipping selection, encouraging users to leave the store searching for coupons.',
        ],
        checklist: [
            'Audit all inputs for inputmode="numeric", "tel", or "email".',
            'Verify autocomplete tokens match WHATWG standards (given-name, family-name, address-line1).',
            'Ensure input fonts are 16px minimum to avoid mobile browser zoom.',
        ],
        furtherReading: [
            { title: 'Google Web Fundamentals: Form Input Ergonomics', url: 'https://web.dev/learn/forms/' },
        ],
    },
    {
        id: 'm17-l4',
        moduleId: 'module-17',
        slug: 'one-tap-mobile-wallets-conversion-friction',
        title: '1-Tap Mobile Wallets: Shop Pay, Apple Pay & Google Pay Micro-Friction',
        estimatedMinutes: 25,
        objectives: [
            'Analyze why 1-tap accelerated checkouts can increase mobile conversion by up to 25%.',
            'Diagnose checkout cannibalization and discount code loss when using accelerated checkout buttons.',
            'Optimize the placement and visual prominence of accelerated payment buttons in Shopify themes.',
        ],
        videoSource: {
            title: 'How to use Apple Pay | Apple Support',
            embedUrl: 'https://www.youtube-nocookie.com/embed/cxchWpM_I-0',
            channel: 'Apple Support',
            duration: '3:10',
            description: 'Curated technical CRO masterclass from Apple Support covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['How to use Apple Pay', 'Apple Support'],
        },
        sections: [
            {
                heading: 'The Power of Stored Credentials',
                body: `Shop Pay, Apple Pay, and Google Pay eliminate 10+ form fields, address typos, and the need for physical credit cards. A user can complete an order in under 12 seconds with Touch ID or Face ID. Shopify studies reveal that Shop Pay checkouts convert 1.72x higher on mobile than standard 3-step checkouts.`,
            },
            {
                heading: 'The Accelerated Checkout Pitfall: The Discount Code Trap',
                body: `While 1-tap checkout dramatically reduces physical friction, it creates a subtle psychological friction point: if a shopper has a promo code from an ad, tapping "Buy with Shop Pay" immediately opens a payment sheet that historically bypassed the discount input field.

To fix this, high-converting Shopify stores implement an in-cart promo code entry field before the accelerated buttons, applying the discount via the Shopify Ajax Cart API before the checkout sheet triggers.`,
                code: `// Apply discount to cart before 1-tap checkout
async function applyCartDiscount(code) {
  const response = await fetch('/discount/' + encodeURIComponent(code));
  if (response.ok) {
    // Refresh cart drawer with applied discount price
    updateCartDrawer();
  }
}`,
                language: 'javascript',
            },
            {
                heading: 'Dynamic Checkout Button (additional_checkout_buttons) Best Practices',
                body: `In Shopify Liquid, \`{{ content_for_additional_checkout_buttons }}\` injects dynamic wallet buttons based on the user's browser, OS, and active credentials.
1. Place dynamic checkout buttons directly below the main Add to Cart button on PDP.
2. Provide a subtle "Or pay with regular checkout" divider to reassure customers who want to use alternative payment methods.`,
            },
        ],
        mistakes: [
            'Hiding accelerated checkout buttons inside an unexpanded accordion.',
            'Promising free gifts or tier discounts in the cart that vanish when a user hits 1-tap checkout.',
            'Overloading the PDP with 6 conflicting wallet buttons (PayPal, Amazon Pay, Klarna, Shop Pay, Apple Pay, Google Pay).',
        ],
        checklist: [
            'Verify Shop Pay is enabled in Shopify Admin Payments settings.',
            'Test Apple Pay on an actual Safari iOS device with a linked credit card.',
            'Ensure in-cart discount code applies cleanly to the wallet checkout total.',
        ],
        furtherReading: [
            { title: 'Shopify Engineering: Inside Shop Pay Acceleration', url: 'https://shopify.engineering' },
        ],
    },
    {
        id: 'm17-l5',
        moduleId: 'module-17',
        slug: 'mobile-speed-cls-on-cellular-networks',
        title: 'Mobile Page Speed & Layout Shift (CLS) on 4G Networks',
        estimatedMinutes: 25,
        objectives: [
            'Simulate realistic mobile network throttling (Fast 4G and Slow 4G) in Lighthouse and WebPageTest.',
            'Eliminate Cumulative Layout Shift (CLS) from dynamic mobile announcement bars and currency switchers.',
            'Optimize mobile responsive imagery using srcset and sizes to avoid downloading desktop 4K banners.',
        ],
        videoSource: {
            title: 'How to improve Cumulative Layout Shift (CLS) Shopify Store | Google Page Speed',
            embedUrl: 'https://www.youtube-nocookie.com/embed/V74zTvrorcQ',
            channel: 'Shopioso',
            duration: '5:37',
            description: 'Curated technical CRO masterclass from Shopioso covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['How to improve Cumulative Layout Shift (CLS) Shopify Store', 'Google Page Speed'],
        },
        sections: [
            {
                heading: 'The Harsh Reality of Mobile Bandwidth',
                body: `A desktop user on broadband downloads a 2MB uncompressed hero banner in 30ms. A mobile shopper riding a subway on spotty 4G will wait 3.8 seconds for that same file. Every additional second of mobile latency reduces conversion rates by an average of 4.42%.`,
            },
            {
                heading: 'Responsive Imagery with image_tag in Liquid',
                body: `Modern Shopify themes should never use hardcoded \`<img src="{{ product.featured_image | img_url: 'master' }}">\`. Always use \`image_tag\` with explicit aspect ratio and responsive widths:`,
                code: `{% comment %} Zero-CLS High Performance Mobile Hero Image {% endcomment %}
{{ section.settings.image | image_tag:
  widths: '375, 550, 750, 1100, 1500',
  sizes: '(max-width: 768px) 100vw, 50vw',
  loading: 'eager',
  fetchpriority: 'high',
  decoding: 'async',
  alt: section.settings.image.alt | escape,
  class: 'hero-banner__img'
}}`,
                language: 'liquid',
            },
            {
                heading: 'Preventing Mobile CLS from Dynamic Widgets',
                body: `Dynamic widgets like currency selectors, reviews stars, and shipping calculators often load asynchronously via third-party JavaScript. When they pop into the DOM 1.2 seconds after page load, they push the "Add to Cart" button downward just as the user’s thumb taps it.
Fix this by reserving vertical min-height placeholders in CSS so zero layout shift occurs.`,
            },
        ],
        mistakes: [
            'Serving 2000px desktop hero images to 390px mobile screens.',
            'Leaving dynamic app widget containers with 0px height prior to JS evaluation.',
            'Relying solely on WiFi testing in the office instead of 4G mobile profiles.',
        ],
        checklist: [
            'Run Lighthouse with mobile device emulation and Slow 4G throttling.',
            'Verify mobile CLS score is strictly below 0.05.',
            'Ensure all images have width and height attributes in rendered HTML.',
        ],
        furtherReading: [
            { title: 'Web.dev: Optimize Cumulative Layout Shift', url: 'https://web.dev/optimize-cls/' },
        ],
    },
    // =========================================================================
    // MODULE 18: Conversion Copywriting & Value Propositions
    // =========================================================================
    {
        id: 'm18-l1',
        moduleId: 'module-18',
        slug: 'wireframing-with-words-microcopy-psychology',
        title: 'Wireframing with Words: The Psychology of Microcopy',
        estimatedMinutes: 25,
        objectives: [
            'Understand how microcopy (tiny instructional and reassuring text strings) eliminates checkout friction.',
            'Transform vague button labels into high-intent commitment devices.',
            'Audit and optimize form label microcopy, error states, and security promises.',
        ],
        videoSource: {
            title: 'Use This Psychology Rule to Increase Your Conversion Rate on Shopify [ CRO 2026 ]',
            embedUrl: 'https://www.youtube-nocookie.com/embed/RCXIgdwqFlo',
            channel: 'Emil Nygaard',
            duration: '14:40',
            description: 'Curated technical CRO masterclass from Emil Nygaard covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Use This Psychology Rule to Increase Your Conversion Rate on Shopify [ CRO 2026 ]'],
        },
        sections: [
            {
                heading: 'What is Microcopy?',
                body: `Microcopy consists of the small snippets of copy directly accompanying user actions: button text, form placeholders, security disclaimers, error validations, and hover tooltips. While long-form copywriting persuades the visitor, microcopy provides operational clarity and emotional safety.

A legendary example: changing an ecommerce checkout button from "Continue" to "Review Order & Shipping (No payment taken yet)" reduced cart abandonment by 14% because it relieved the user’s fear of being charged prematurely.`,
            },
            {
                heading: 'Button Copy Framework: Action + Value',
                body: `Avoid generic, passive verbs like "Submit", "Send", "Click Here", or "Continue". High-converting microcopy expresses the concrete benefit or immediate next step:
- Instead of "Subscribe": "Get $15 Off Your First Order"
- Instead of "Add to Cart": "Add to Bag — Ships Free Today"
- Instead of "Checkout": "Secure Checkout with 30-Day Guarantee"`,
                code: `<!-- High Intent Microcopy in Liquid -->
<button type="submit" class="btn btn-primary btn-block">
  <span>Add to Cart</span>
  <span class="btn-microcopy">Ships tomorrow • Free 30-day returns</span>
</button>`,
                language: 'html',
            },
            {
                heading: 'Friction-Busting Form Tooltips',
                body: `Whenever you request sensitive information (such as phone numbers or postal addresses), explain why in 6 words or less directly underneath the field: "Used only for delivery SMS updates. No spam." This single line often lifts form completion by 8%.`,
            },
        ],
        mistakes: [
            'Using the browser default "Submit" text on forms.',
            'Writing punitive error messages like "Invalid Input!" instead of helpful remedies like "Please enter a valid 5-digit zip code (e.g. 90210)".',
            'Hiding shipping costs until step 3 of checkout without microcopy.',
        ],
        checklist: [
            'Audit all button copy across the PDP, cart drawer, and checkout.',
            'Add reassuring microcopy below phone and email inputs.',
            'Ensure error states explain how to fix the problem in human language.',
        ],
        furtherReading: [
            { title: 'Microcopy: The Complete Guide (Kinneret Yifrah)', url: 'https://www.nemash.co.il/microcopy-book/' },
        ],
    },
    {
        id: 'm18-l2',
        moduleId: 'module-18',
        slug: 'value-proposition-engineering-clarity-vs-cleverness',
        title: 'Value Proposition Engineering: Clarity over Cleverness',
        estimatedMinutes: 25,
        objectives: [
            'Master the 5-second test framework for homepage and landing page above-the-fold heroes.',
            'Formulate unique value propositions (UVP) using the Target + Benefit + Differentiator formula.',
            'Avoid brand-marketing "cleverness" that confuses high-intent transactional shoppers.',
        ],
        videoSource: {
            title: '5 Shopify CRO Changes That Generated $1M+ in Revenue',
            embedUrl: 'https://www.youtube-nocookie.com/embed/gvK0DmKFd34',
            channel: 'Winning With Shopify Podcast',
            duration: '35:32',
            description: 'Curated technical CRO masterclass from Winning With Shopify Podcast covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['5 Shopify CRO Changes That Generated $1M+ in Revenue'],
        },
        sections: [
            {
                heading: 'The 5-Second Test',
                body: `When a first-time visitor lands on your store from a paid ad or organic search, you have approximately 5 seconds to answer three subconscious questions:
1. What is this store selling?
2. Why is it better or different than alternatives (Amazon, competitors)?
3. What should I do next?

Creative agencies frequently replace clear answers with poetic taglines like "Embrace the Infinite" or "Crafted for Tomorrow." While poetic, this increases bounce rate because shoppers do not know if you sell shoes, software, or coffee beans.`,
            },
            {
                heading: 'The 3-Part UVP Formula',
                body: `A world-class value proposition combines:
[Outcome/Benefit] + [Specific Target Audience] + [Unique Mechanism / No-Risk Guarantee]

Example comparison:
- Clever (Low Converting): "Reimagining How the World Wakes Up."
- Clear (High Converting): "Organic Low-Acid Cold Brew Delivered Weekly. 0% Bitterness, 100% Arabica — Guaranteed Gentler on Your Stomach."`,
            },
            {
                heading: 'Supporting Value Pillars on PDP',
                body: `Directly below the product title and price on the PDP, reinforce the UVP with 3 scannable bullet points highlighting the primary reason to buy:
- Material/Quality differentiator (e.g. "GOTS Certified 100% Organic Cotton")
- Speed/Delivery differentiator (e.g. "Order by 2 PM for Same-Day Dispatch")
- Risk-reversal differentiator (e.g. "30-Night Sleep Trial or 100% Full Refund")`,
            },
        ],
        mistakes: [
            'Sacrificing clear product terminology for abstract marketing puns.',
            'Focusing on product features (e.g. "4.2mm thickness") instead of emotional/functional customer benefits ("Slips easily into slim jeans without bulging").',
            'Burying the UVP below 3 carousel banners that rotate automatically.',
        ],
        checklist: [
            'Conduct a 5-second user test on 5 unfamiliar participants.',
            'Verify the primary hero headline contains the concrete product noun.',
            'Place 3 value proof pillars above the fold on all top PDPs.',
        ],
        furtherReading: [
            { title: 'MECLABS Value Proposition Heuristic', url: 'https://meclabs.com' },
        ],
    },
    {
        id: 'm18-l3',
        moduleId: 'module-18',
        slug: 'voice-of-customer-voc-mining-reviews',
        title: 'Voice of Customer (VOC) Mining: Turning Reviews into High-Converting Copy',
        estimatedMinutes: 30,
        objectives: [
            'Extract verbatim customer phrasing from 1-star, 3-star, and 5-star product reviews.',
            'Identify the exact hesitations, objections, and delight points in customer language.',
            'Incorporate VOC snippets directly into product bullet points, FAQs, and sticky callouts.',
        ],
        videoSource: {
            title: 'Shopify Conversion Rate Optimization (Full Course)',
            embedUrl: 'https://www.youtube-nocookie.com/embed/Mser3vgJXOc',
            channel: 'Stijn Wollerich | Ecommerce CRO',
            duration: '56:27',
            description: 'Curated technical CRO masterclass from Stijn Wollerich | Ecommerce CRO covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Shopify Conversion Rate Optimization (Full Course)'],
        },
        sections: [
            {
                heading: 'Why Copywriters Should Never Guess',
                body: `The highest-converting copy is not written by copywriters in isolation — it is stolen directly from the mouths of satisfied and frustrated customers. When you use the exact words, colloquialisms, and metaphors your customers use to describe their problems, your store instantly feels authentic and empathetic.`,
            },
            {
                heading: 'The 3-Tier Review Mining Method',
                body: `1. 5-Star Reviews: Reveal the primary "Aha!" moment and unexpected benefits.
   Look for: "I was skeptical at first, but..." or "The best thing about this is..."
2. 3-Star Reviews: The holy grail for CRO. These customers love the product but were frustrated by specific expectations (sizing running small, unclear instructions, slow shipping).
3. 1-Star Competitor Reviews: Reveal what competitor customers hate, allowing you to position your store as the reliable solution.`,
            },
            {
                heading: 'Turning VOC into PDP Accordions',
                body: `If 25 reviews state: "I was worried this jacket would be too tight across the shoulders when layering with a sweater", you do not hide this in the reviews tab. You place an explicit sizing callout right above the variant selector:
*"Tailored fit: If you plan to layer over heavy hoodies, our community recommends sizing up one size."*
This single adjustment eliminates sizing hesitation and reduces return rates by 20%.`,
            },
        ],
        mistakes: [
            'Ignoring 3-star reviews and reading only promotional 5-star blurbs.',
            'Refining customer quotes until they sound like corporate PR jargon.',
            'Leaving known sizing and usability objections unaddressed on the main PDP body.',
        ],
        checklist: [
            'Export 100+ product reviews into a spreadsheet and tag by theme (Sizing, Material, Speed, Price).',
            'Identify top 3 recurring customer objections.',
            'Address the #1 objection directly next to the Add to Cart button.',
        ],
        furtherReading: [
            { title: 'Copyhackers: Review Mining Framework', url: 'https://copyhackers.com' },
        ],
    },
    {
        id: 'm18-l4',
        moduleId: 'module-18',
        slug: 'anti-anxiety-messaging-risk-reversal',
        title: 'Anti-Anxiety Messaging: Shipping Guarantees, Return Policies & Risk Reversal',
        estimatedMinutes: 25,
        objectives: [
            'Identify and neutralize the 4 primary forms of buyer anxiety: financial, operational, social, and effort risk.',
            'Engineer airtight risk-reversal guarantees that boost conversion without spiking return rates.',
            'Display clear delivery timeline estimates (Order today -> Arrives by Tuesday).',
        ],
        videoSource: {
            title: 'How to Handle Shopify Dropshipping Returns, Refunds, and Return Policies.',
            embedUrl: 'https://www.youtube-nocookie.com/embed/EjZsqaOIDsc',
            channel: 'Shopify Mastery',
            duration: '10:33',
            description: 'Curated technical CRO masterclass from Shopify Mastery covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['How to Handle Shopify Dropshipping Returns', 'Refunds', 'and Return Policies.'],
        },
        sections: [
            {
                heading: 'The 4 Dimensions of Ecommerce Anxiety',
                body: `Anxiety is the psychological friction that occurs immediately before the purchase decision:
1. Financial Risk: "Will I waste my money? Is this a scam? Will price drop tomorrow?"
2. Operational Risk: "Will it arrive broken or late for my event? How difficult is returning it?"
3. Performance/Fit Risk: "What if the size is wrong or the color looks different in person?"
4. Effort Risk: "Will I have to pay for return shipping and wait 4 weeks for store credit?"`,
            },
            {
                heading: 'Concrete Delivery Timelines vs Vague Promises',
                body: `Displaying "Fast Shipping" provides zero emotional safety. Displaying:
*"Order within the next 3 hrs 12 mins to receive by Thursday, Oct 12 with Free Express Shipping"*
relieves operational anxiety instantly and introduces natural, legitimate urgency.`,
                code: `{% comment %} snippets/delivery-estimator.liquid {% endcomment %}
<div class="delivery-estimator" id="DeliveryEstimator">
  <span class="delivery-estimator__icon">🚚</span>
  <span class="delivery-estimator__text">
    Order within <strong id="CountdownTimer" class="text-accent">2h 45m</strong> for delivery by 
    <strong id="EstimatedArrivalDate">Thursday, Oct 12</strong>
  </span>
</div>`,
                language: 'liquid',
            },
            {
                heading: 'The Bold Risk-Reversal Guarantee',
                body: `A weak guarantee says: "Returns accepted within 14 days in original unused packaging with buyer paying shipping." This increases hesitation.
A high-converting risk-reversal says:
*"Try it in your daily routine for 30 days. If you don't love it, email us for a pre-paid return label and an instant 100% refund. Zero hassle, zero risk."*
Decades of direct-response marketing prove that bolder guarantees dramatically lift conversion, while return rates typically increase by less than 1.5%.`,
            },
        ],
        mistakes: [
            'Burying the return policy in a 4,000-word legalese page linked only in the footer.',
            'Stating "Free Shipping on orders over $50" without showing how close the cart is to the threshold.',
            'Charging restocking fees or making returns conditional on store credit only.',
        ],
        checklist: [
            'Place a concise 3-item trust bar directly underneath the primary ATC button.',
            'Include a dynamic delivery estimate widget on high-traffic PDPs.',
            'State return shipping terms with absolute transparency.',
        ],
        furtherReading: [
            { title: 'Baymard Institute: Shipping & Return Policy Visibility', url: 'https://baymard.com' },
        ],
    },
    {
        id: 'm18-l5',
        moduleId: 'module-18',
        slug: 'urgency-scarcity-ethical-persuasion-vs-dark-patterns',
        title: 'Urgency & Scarcity: High-Integrity Persuasion vs Deceptive Dark Patterns',
        estimatedMinutes: 25,
        objectives: [
            'Differentiate between authentic scarcity/urgency and fake countdown timers that destroy trust.',
            'Implement real inventory tracking scarcity in Shopify Liquid (e.g. "Only 3 left in stock").',
            'Understand regulatory enforcement (FTC, EU Omnibus Directive) against deceptive urgency widgets.',
        ],
        videoSource: {
            title: 'High-Ticket CRO: How to Increase Conversions Without Discounting',
            embedUrl: 'https://www.youtube-nocookie.com/embed/OO-uYhDPUOE',
            channel: 'Ecommerce Paradise | High Ticket Dropshipping',
            duration: '11:20',
            description: 'Curated technical CRO masterclass from Ecommerce Paradise | High Ticket Dropshipping covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['High', 'Ticket CRO: How to Increase Conversions Without Discounting'],
        },
        sections: [
            {
                heading: 'Why Fake Scarcity Kills Brand Equity',
                body: `Every consumer has seen low-grade dropshipping stores with a flashing red countdown timer resetting every time the page refreshes, accompanied by a popup claiming "Someone in Boise just bought this 4 seconds ago."

Sophisticated shoppers immediately recognize these as fabricated gimmicks. Beyond destroying consumer trust, regulatory agencies (such as the US FTC and European consumer protection authorities) have levied millions in fines against brands utilizing deceptive countdown timers and fabricated scarcity metrics.`,
            },
            {
                heading: 'Authentic Scarcity in Shopify Liquid',
                body: `High-converting, ethical scarcity ties directly to real-time inventory quantity from the Shopify Storefront API:`,
                code: `{% comment %} Ethical Inventory Scarcity {% endcomment %}
{% assign current_variant = product.selected_or_first_available_variant %}
{% if current_variant.inventory_management == 'shopify' and current_variant.inventory_policy == 'deny' %}
  {% if current_variant.inventory_quantity > 0 and current_variant.inventory_quantity <= 5 %}
    <div class="scarcity-indicator scarcity-indicator--low">
      <span class="pulsing-dot"></span>
      <span>Only <strong>{{ current_variant.inventory_quantity }} left</strong> in stock — order soon to secure yours.</span>
    </div>
  {% endif %}
{% endif %}`,
                language: 'liquid',
            },
            {
                heading: 'Event-Based Urgency',
                body: `Legitimate urgency is derived from real-world external deadlines:
- Holiday shipping cutoff dates (e.g. "Order by Dec 18 for guaranteed Christmas arrival")
- Flash sale expiration with an actual backend scheduled promotion end-date
- Limited seasonal batch runs (e.g. "Autumn Harvest batch: 500 units produced")`,
            },
        ],
        mistakes: [
            'Using javascript timers that reset to 15:00 on every page refresh.',
            'Showing "Only 2 left" on products where inventory is actually 10,000 units.',
            'Displaying fake social proof notifications that fire on static interval loops.',
        ],
        checklist: [
            'Connect scarcity indicators strictly to real product.inventory_quantity in Liquid.',
            'Ensure countdown timers tie to genuine promotion end times configured in Shopify Admin.',
            'Check compliance with FTC and EU Omnibus guidelines on promotional transparency.',
        ],
        furtherReading: [
            { title: 'FTC Guidelines on Deceptive Digital Practices', url: 'https://www.ftc.gov' },
        ],
    },
    // =========================================================================
    // MODULE 19: B2B, Wholesale & High-Ticket CRO
    // =========================================================================
    {
        id: 'm19-l1',
        moduleId: 'module-19',
        slug: 'high-ticket-funnel-dynamics-stakeholder-journeys',
        title: 'High-Ticket ($500+) Funnel Dynamics & Multi-Stakeholder Buying Journeys',
        estimatedMinutes: 25,
        objectives: [
            'Analyze the physiological and financial difference between impulse buys ($35) and deliberate investments ($1,500+).',
            'Map multi-stakeholder approval journeys in B2B and enterprise purchasing.',
            'Design high-ticket funnels that emphasize reassurance, specification depth, and consultative touchpoints.',
        ],
        videoSource: {
            title: 'How To Sell High Ticket Products With Shopify Dropshipping ($500K/Month Store)',
            embedUrl: 'https://www.youtube-nocookie.com/embed/0NM0jXsFqos',
            channel: 'Ali Akbar | White-Label Ecommerce',
            duration: '18:25',
            description: 'Curated technical CRO masterclass from Ali Akbar | White-Label Ecommerce covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['How To Sell High Ticket Products With Shopify Dropshipping ($500K/Month Store)'],
        },
        sections: [
            {
                heading: 'The High-Ticket Paradigm Shift',
                body: `In standard DTC ecommerce ($20–$100), the goal is reducing friction to capture immediate impulse purchases within a single 5-minute session. In high-ticket ecommerce ($500 to $15,000+ per order) or B2B wholesale, impulse buys do not exist.

High-ticket purchases involve:
- Extended consideration cycles (14 to 90 days across 6+ touchpoints)
- Multiple stakeholders (the researcher, the technical evaluator, and the finance approver)
- High consequence of failure (a $5,000 espresso machine or industrial laser cutter cannot be trivially discarded if it fails)`,
            },
            {
                heading: 'Information Architecture for High-Ticket PDPs',
                body: `On high-ticket stores, brief descriptions and 3 bullet points cause high bounce rates. High-ticket buyers require technical specification sheets (PDF downloads), dimensional schematics, certification marks (CE, UL, ISO), warranty terms, and high-resolution video demonstrations.`,
            },
            {
                heading: 'The Hybrid Funnel: Buy Now vs Speak to a Specialist',
                body: `Top-performing high-ticket Shopify Plus stores provide dual paths on the PDP:
1. Primary CTA: Direct Checkout for self-serve commercial buyers.
2. Secondary CTA: "Schedule 15-Min Live Video Demo" or "Request Technical Callback" with calendar integration (Calendly/HubSpot). This consultative option converts warm leads who would otherwise abandon silently.`,
            },
        ],
        mistakes: [
            'Treating a $3,000 commercial refrigerator like a $20 t-shirt with a bare-bones 2-sentence description.',
            'Omitting downloadable spec sheets, CAD drawings, or installation manuals.',
            'Failing to offer financing options (Affirm, Klarna B2B, net-30 terms).',
        ],
        checklist: [
            'Provide comprehensive technical specification tables on all high-ticket items.',
            'Add a secondary "Speak with an Engineer / Product Specialist" CTA.',
            'Integrate monthly financing breakdown messaging next to gross price.',
        ],
        furtherReading: [
            { title: 'Gartner: The B2B Buying Journey Architecture', url: 'https://www.gartner.com' },
        ],
    },
    {
        id: 'm19-l2',
        moduleId: 'module-19',
        slug: 'tiered-volume-pricing-tables-liquid',
        title: 'Tiered Volume Pricing Tables & Quantity Discount Architecture in Liquid',
        estimatedMinutes: 30,
        objectives: [
            'Architect a dynamic tiered pricing table in Shopify Liquid & JavaScript.',
            'Handle Shopify Plus B2B Price Lists and Volume Quantity Rules.',
            'Compute dynamic unit savings and total basket discount in real-time.',
        ],
        videoSource: {
            title: 'How to Add Quantity Discounts and Tiered Pricing on Shopify for Higher AOV',
            embedUrl: 'https://www.youtube-nocookie.com/embed/B-EOQdEqkKk',
            channel: 'Ecom Mastery',
            duration: '14:04',
            description: 'Curated technical CRO masterclass from Ecom Mastery covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['How to Add Quantity Discounts and Tiered Pricing on Shopify for Higher AOV'],
        },
        sections: [
            {
                heading: 'The Economics of Tiered Volume Discounts',
                body: `Wholesale and bulk purchasers are motivated by unit margin expansion. Presenting clear bulk discount tiers (e.g. Buy 5 save 10%, Buy 20 save 20%, Buy 50 save 35%) incentivizes buyers to expand their basket size to cross the next volume tier threshold, driving dramatic Average Order Value (AOV) growth.`,
            },
            {
                heading: 'Shopify Liquid Implementation with Metafields',
                body: `We can configure volume discount rules using Shopify product metafields (\`product.metafields.pricing.tiers\`) and render an interactive table directly above the quantity selector:`,
                code: `{% comment %} snippets/volume-pricing-table.liquid {% endcomment %}
<div class="volume-pricing" id="VolumePricing">
  <div class="volume-pricing__header">
    <span>Quantity</span>
    <span>Unit Price</span>
    <span>Savings</span>
  </div>
  <div class="volume-pricing__rows">
    <div class="volume-pricing__row is-active" data-min-qty="1" data-discount="0">
      <span>1 – 4 units</span>
      <span>{{ product.price | money }}</span>
      <span class="badge badge-gray">Standard</span>
    </div>
    <div class="volume-pricing__row" data-min-qty="5" data-discount="10">
      <span>5 – 19 units</span>
      <span>{{ product.price | times: 0.90 | money }}</span>
      <span class="badge badge-success">Save 10%</span>
    </div>
    <div class="volume-pricing__row" data-min-qty="20" data-discount="20">
      <span>20+ units</span>
      <span>{{ product.price | times: 0.80 | money }}</span>
      <span class="badge badge-indigo">Save 20%</span>
    </div>
  </div>
</div>

<script>
document.querySelectorAll('.volume-pricing__row').forEach(row => {
  row.addEventListener('click', () => {
    const minQty = row.getAttribute('data-min-qty');
    const qtyInput = document.querySelector('form[action*="/cart/add"] input[name="quantity"]');
    if (qtyInput) {
      qtyInput.value = minQty;
      qtyInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
});
</script>`,
                language: 'liquid',
            },
        ],
        mistakes: [
            'Hiding wholesale volume discounts inside a PDF catalog instead of displaying them natively on the PDP.',
            'Failing to automatically update the quantity input when a user clicks a volume tier row.',
            'Neglecting to inform the user in the cart drawer that adding 2 more units unlocks the next tier.',
        ],
        checklist: [
            'Ensure volume pricing tiers are visually clickable.',
            'Highlight the currently selected tier based on current quantity value.',
            'Validate discount application with Shopify Functions or automatic script discounts.',
        ],
        furtherReading: [
            { title: 'Shopify Help: Volume Pricing & Quantity Rules in B2B', url: 'https://help.shopify.com/en/manual/b2b' },
        ],
    },
    {
        id: 'm19-l3',
        moduleId: 'module-19',
        slug: 'request-for-quote-rfq-consultative-funnels',
        title: 'Request for Quote (RFQ) & Consultative Lead Funnels on Shopify',
        estimatedMinutes: 25,
        objectives: [
            'Build a frictionless Request for Quote (RFQ) modal replacing or supplementing the checkout flow.',
            'Capture essential commercial criteria: business tax ID, order cadence, and custom fabrication specs.',
            'Route inbound RFQ payloads to CRM systems (HubSpot, Salesforce) while keeping user on-site.',
        ],
        videoSource: {
            title: 'How to Set Up a Request a Quote Workflow on Shopify | SP Request a Quote (RFQ)',
            embedUrl: 'https://www.youtube-nocookie.com/embed/iTr1DLuj7os',
            channel: 'Shopplaza',
            duration: '3:39',
            description: 'Curated technical CRO masterclass from Shopplaza covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['How to Set Up a Request a Quote Workflow on Shopify', 'SP Request a Quote (RFQ)'],
        },
        sections: [
            {
                heading: 'When to Use RFQ Instead of Immediate Checkout',
                body: `When products require custom branding, freight pallet logistics, or volume tiers above $10,000, credit card checkout is often impossible due to corporate credit card limits and corporate procurement purchase order (PO) policies.

An RFQ funnel allows potential wholesale buyers to assemble a project list and submit for official commercial quotation with formal net-30 terms.`,
            },
            {
                heading: 'Minimizing RFQ Form Drop-off',
                body: `Traditional RFQ forms have 18 mandatory fields, driving 80%+ drop-off. A modernized CRO RFQ flow uses a 2-step progressive disclosure:
- Step 1 (Low threat): Desired Quantity, Timeline (Immediate / 30 Days / Exploring), and Optional File Upload (schematic or logo).
- Step 2 (Commitment): Work Email, Company Name, and Shipping Country.`,
                code: `// Submitting an RFQ lead via lightweight endpoint
async function submitQuoteRequest(formData) {
  const payload = {
    productId: formData.get('product_id'),
    quantity: formData.get('quantity'),
    company: formData.get('company'),
    email: formData.get('email'),
    timeline: formData.get('timeline')
  };

  const res = await fetch('/apps/quote-handler/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    showQuoteSuccessState("Your official quote will be prepared by an account executive within 4 business hours.");
  }
}`,
                language: 'javascript',
            },
        ],
        mistakes: [
            'Requiring phone numbers as a mandatory blocking field on initial quote inquiry.',
            'Failing to send an instant automated PDF summary email acknowledging receipt of the quote.',
            'Replacing the standard checkout button with an RFQ button on products that could easily be sold direct.',
        ],
        checklist: [
            'Use progressive disclosure on multi-field RFQ forms.',
            'Provide estimated quotation turnaround time (e.g. "Within 4 business hours").',
            'Preserve user cart session state during quote request submission.',
        ],
        furtherReading: [
            { title: 'Shopify Plus: Enterprise Wholesale Architecture', url: 'https://shopify.com/enterprise' },
        ],
    },
    {
        id: 'm19-l4',
        moduleId: 'module-19',
        slug: 'trust-seals-social-proof-high-ticket-buyers',
        title: 'Trust Seals, Social Proof & Risk Mitigation for Enterprise Buyers',
        estimatedMinutes: 25,
        objectives: [
            'Differentiate between cheap consumer trust badges and authoritative enterprise trust credentials.',
            'Implement client logo carousels with verifiable case studies.',
            'Showcase compliance badges (SOC2, ISO, CE, FDA-registered, Made in USA/EU).',
        ],
        videoSource: {
            title: 'How to Use Social Proof to Increase Conversions on Shopify',
            embedUrl: 'https://www.youtube-nocookie.com/embed/Z8dpnF1fajg',
            channel: 'Growth Suite',
            duration: '56:50',
            description: 'Curated technical CRO masterclass from Growth Suite covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['How to Use Social Proof to Increase Conversions on Shopify'],
        },
        sections: [
            {
                heading: 'Consumer Badges vs Enterprise Credentials',
                body: `Low-ticket stores paste generic clipart saying "100% Safe Checkout" or "McAfee Secure". To an enterprise buyer spending $8,000 on company budget, these look amateurish and trigger suspicion.

Enterprise trust is established through:
- Third-party regulatory compliance marks (UL Listed, CE Certified, RoHS, ISO 9001)
- Verified commercial client logos (Fortune 500 companies, university research labs, hospitals)
- Formal warranty certificates with legal indemnification terms`,
            },
            {
                heading: 'The Case Study Proof Card',
                body: `Instead of random 5-star customer reviews that read "Great product!", high-ticket stores feature structured case studies:
*"How Apex Medical Laboratories equipped 14 testing sites with our centrifuge units — cutting calibration downtime by 42%."*
Include the name, title, and organization of the professional reviewer.`,
            },
        ],
        mistakes: [
            'Using low-resolution generic security clip-art on high-ticket stores.',
            'Listing company logos without permission or without verifiable customer testimonials.',
            'Hiding warranty and technical support terms behind password-protected portals.',
        ],
        checklist: [
            'Include high-resolution vector SVGs for all technical compliance marks.',
            'Provide downloadable warranty certificates on the PDP.',
            'Include a direct phone number and dedicated enterprise support email in the header.',
        ],
        furtherReading: [
            { title: 'CXL: Establishing B2B Trust and Credibility', url: 'https://cxl.com' },
        ],
    },
    {
        id: 'm19-l5',
        moduleId: 'module-19',
        slug: 'high-ticket-sample-demo-booking-workflows',
        title: 'High-Ticket Sample & Demo Booking Workflows',
        estimatedMinutes: 25,
        objectives: [
            'Implement a "Free Sample Kit" or nominal fee material swatch workflow in Shopify.',
            'Analyze sample-to-purchase conversion economics.',
            'Deploy integrated calendar appointment scheduling for high-ticket consultations.',
        ],
        videoSource: {
            title: 'Conversion Rate Optimization for High-Ticket Dropshipping: The Complete CRO Guide',
            embedUrl: 'https://www.youtube-nocookie.com/embed/XIpKSDWwG1o',
            channel: 'Ecommerce Paradise | High Ticket Dropshipping',
            duration: '28:15',
            description: 'Curated technical CRO masterclass from Ecommerce Paradise | High Ticket Dropshipping covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Conversion Rate Optimization for High', 'Ticket Dropshipping: The Complete CRO Guide'],
        },
        sections: [
            {
                heading: 'The Material Sample Strategy in High-Ticket Design & Wholesale',
                body: `For stores selling high-end tiles, architectural hardware, custom apparel fabrics, or industrial materials, customers almost never purchase a $10,000 order without physically touching the material.

Offering a "Sample Box for $15 (Free Shipping, credited 100% toward your future order)" converts skeptical researchers into committed prospects. Once they hold the physical sample in their hands, conversion to the high-ticket order exceeds 35%.`,
            },
            {
                heading: 'Crediting the Sample Fee in Shopify Liquid',
                body: `When a customer purchases a sample, issue an automated Shopify discount code equal to their sample purchase amount, redeemable on orders over $500. This closes the psychological loop and makes the high-ticket decision a no-brainer.`,
            },
        ],
        mistakes: [
            'Treating sample requests as customer service tickets rather than high-intent sales opportunities.',
            'Failing to follow up via email exactly 3 days after sample package delivery tracking confirms arrival.',
            'Over-complicating the sample ordering process with long registration questionnaires.',
        ],
        checklist: [
            'Create dedicated sample product variants with automatic price crediting.',
            'Automate sample delivery tracking triggers in Klaviyo/Shopify Flow.',
            'Measure sample-to-order conversion rate as a core commercial KPI.',
        ],
        furtherReading: [
            { title: 'Harvard Business Review: The Power of Physical Samples in B2B', url: 'https://hbr.org' },
        ],
    },
    // =========================================================================
    // MODULE 20: International CRO, Localization & Multi-Currency
    // =========================================================================
    {
        id: 'm20-l1',
        moduleId: 'module-20',
        slug: 'cross-border-cro-shopify-markets-routing',
        title: 'Cross-Border CRO Physics: Shopify Markets & Geolocation Routing',
        estimatedMinutes: 25,
        objectives: [
            'Master Shopify Markets architecture: country subfolders, automatic geolocation routing, and regional pricing.',
            'Prevent destructive geolocation popups that trap visitors in redirect loops.',
            'Respect search engine indexing and Googlebot international crawling guidelines.',
        ],
        videoSource: {
            title: 'Shopify Markets Tutorial 2026 - Full Guide to Multi-Currency, Multi-Language & International Selling',
            embedUrl: 'https://www.youtube-nocookie.com/embed/ngckZ43xxHo',
            channel: 'Coding with Jan - Shopify Developer',
            duration: '20:29',
            description: 'Curated technical CRO masterclass from Coding with Jan - Shopify Developer covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Shopify Markets Tutorial 2026', 'Full Guide to Multi', 'Currency', 'Multi'],
        },
        sections: [
            {
                heading: 'The Cross-Border Conversion Drop-off',
                body: `When international shoppers land on a US store and see prices in USD ($), shipping calculated only for North America, and checkout options limited to domestic credit cards, conversion rates plunge by 60% to 80%.

Localizing currency, shipping methods, and language transforms an international visitor into a domestic-feeling customer. With Shopify Markets, multi-country localization is managed within a single unified store backend.`,
            },
            {
                heading: 'The Geolocation Popup Dilemma: Modal vs Non-Intrusive Banner',
                body: `Many stores immediately slam international visitors with an aggressive, un-dismissible modal: *"We noticed you are visiting from Germany. Click here to go to our EU store!"*

This is terrible CRO:
1. It blocks the user before they have even seen a single product.
2. It breaks Googlebot indexing if bot IP addresses get redirected forcefully.
3. Visitors using VPNs or traveling are forced into incorrect stores.

The high-converting standard is a polite, non-intrusive floating header banner:
*"Viewing in USD. Switch to Euro (€) with free shipping to Germany? [Switch] [Keep USD] (x)"*`,
            },
            {
                heading: 'Shopify Country Selector in Liquid',
                body: `Using native Liquid \`localization\` forms allows seamless currency and market switching without third-party app bloat:`,
                code: `{% comment %} snippets/market-localization-form.liquid {% endcomment %}
{% form 'localization', id: 'LocalizationForm' %}
  <div class="market-selector">
    <label for="CountryCode" class="visually-hidden">Country / Region</label>
    <select name="country_code" id="CountryCode" onchange="this.form.submit()">
      {% for country in localization.available_countries %}
        <option
          value="{{ country.iso_code }}"
          {% if country.iso_code == localization.country.iso_code %}selected{% endif %}
        >
          {{ country.name }} ({{ country.currency.iso_code }} {{ country.currency.symbol }})
        </option>
      {% endfor %}
    </select>
  </div>
{% endform %}`,
                language: 'liquid',
            },
        ],
        mistakes: [
            'Force-redirecting visitors based purely on IP without allowing manual country overrides.',
            'Translating only the homepage while leaving PDPs and checkout in English.',
            'Failing to configure subfolder routing (/en-gb, /de-de), causing international SEO cannibalization.',
        ],
        checklist: [
            'Enable Shopify Markets native localization subfolder paths.',
            'Use non-intrusive floating recommendations instead of modal takeovers.',
            'Ensure currency symbols update instantaneously on variant selection.',
        ],
        furtherReading: [
            { title: 'Shopify Help: Setting up Shopify Markets', url: 'https://help.shopify.com/en/manual/markets' },
        ],
    },
    {
        id: 'm20-l2',
        moduleId: 'module-20',
        slug: 'multi-currency-display-psychology-rounding-rules',
        title: 'Multi-Currency Display Psychology & Rounding Rules',
        estimatedMinutes: 25,
        objectives: [
            'Understand the psychological impact of currency rounding (e.g. €49.00 vs €48.73).',
            'Configure Shopify Markets exchange rate buffers and automatic rounding rules.',
            'Avoid foreign transaction fee surprises at checkout.',
        ],
        videoSource: {
            title: 'Shopify Multi-Currency Checkout – How to Offer Multiple Currencies',
            embedUrl: 'https://www.youtube-nocookie.com/embed/uiBLBX9HTRA',
            channel: 'Coding with Jan - Shopify Developer',
            duration: '12:49',
            description: 'Curated technical CRO masterclass from Coding with Jan - Shopify Developer covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Shopify Multi', 'Currency Checkout', 'How to Offer Multiple Currencies'],
        },
        sections: [
            {
                heading: 'Why Converted Prices with Decimal Noise Kill Trust',
                body: `If an American store sells a hoodie for $65.00 USD, a raw dynamic exchange rate conversion might display €61.37 to a German customer or £53.22 to a British customer.

To local shoppers, prices like €61.37 scream: *"This is a foreign store shipping from overseas. I will probably be hit with customs delays and credit card exchange fees."*

Local domestic brands price ending in .00, .95, or .99. Enabling Shopify Markets Rounding Rules ensures prices display cleanly as €65.00 or €64.95, boosting conversion by 9–14%.`,
            },
            {
                heading: 'Guaranteed Pricing at Checkout',
                body: `A devastating conversion leak occurs when a customer browses in Euros on the storefront, but when they reach checkout, the currency switches back to USD with a small disclaimer saying *"Your bank will convert this at daily rates."*

Shopify Payments multi-currency processing charges the customer in their local native currency directly, eliminating credit card foreign transaction fee anxieties.`,
            },
        ],
        mistakes: [
            'Displaying unrounded conversion prices like $74.19 or 14,281.42 JPY.',
            'Using third-party currency switcher apps that only visually alter frontend text while charging USD at checkout.',
            'Failing to clarify whether VAT/tax is included in the displayed international price.',
        ],
        checklist: [
            'Enable automatic price rounding to .00 or .95 in Shopify Markets settings.',
            'Verify that checkout completes in the selected foreign currency.',
            'Add a trust note: "All prices in EUR. Zero foreign transaction fees."',
        ],
        furtherReading: [
            { title: 'Shopify Help: Price Rounding in Markets', url: 'https://help.shopify.com/en/manual/markets/pricing/rounding' },
        ],
    },
    {
        id: 'm20-l3',
        moduleId: 'module-20',
        slug: 'alternative-local-payment-methods-global-cro',
        title: 'Alternative Local Payment Methods: iDEAL, Klarna, PIX & GCC Cash-on-Delivery',
        estimatedMinutes: 30,
        objectives: [
            'Map regional payment preferences across Europe, Latin America, and the Middle East.',
            'Analyze why credit cards represent less than 30% of ecommerce transactions in several major markets.',
            'Configure Shopify Payments local payment methods without code bloat.',
        ],
        videoSource: {
            title: 'How to Set Up Cash on Delivery on Shopify',
            embedUrl: 'https://www.youtube-nocookie.com/embed/keD6aCLal0E',
            channel: 'CrisDrop',
            duration: '8:01',
            description: 'Curated technical CRO masterclass from CrisDrop covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['How to Set Up Cash on Delivery on Shopify'],
        },
        sections: [
            {
                heading: 'The Fallacy of Credit Card Universality',
                body: `In the US, 80%+ of online orders use Visa, Mastercard, or Amex. In international markets, credit card dominance disappears:
- Netherlands: 70%+ of all ecommerce transactions are made via **iDEAL** (direct bank transfer). Stores without iDEAL cannot succeed in the Netherlands.
- Germany & Nordics: **Klarna Pay Later** / Sofort and invoice billing dominate. Germans have a cultural aversion to credit debt.
- Brazil: **PIX** (instant central bank QR payments) and Boleto Bancário account for 60%+ of digital volume.
- GCC (Saudi Arabia, UAE): **Mada**, Tabby/Tamara, and Cash on Delivery (COD) are essential.`,
            },
            {
                heading: 'Enabling Local Payment Methods in Shopify',
                body: `With Shopify Payments, local payment methods (iDEAL, Bancontact, EPS, Klarna, Sofort) can be toggled directly in Admin settings without installing clunky external redirection gateways. When active, Shopify automatically surfaces the correct local payment icons to shoppers based on their shipping address.`,
            },
            {
                heading: 'Managing Cash on Delivery (COD) Return Friction',
                body: `In regions with high COD prevalence (MENA, parts of SEA), CVR looks extraordinarily high because ordering requires no upfront money. However, order refusal at the doorstep (Return to Origin - RTO) can reach 30–40%.
CRO developers combat this by adding an automated WhatsApp verification bot or offering a 10% discount for pre-paid card/wallet orders.`,
            },
        ],
        mistakes: [
            'Expecting Dutch shoppers to checkout with a credit card when they expect iDEAL.',
            'Failing to display accepted local payment method badges on the PDP and footer.',
            'Ignoring Cash on Delivery verification mechanisms in markets where COD is offered.',
        ],
        checklist: [
            'Activate iDEAL, Bancontact, and Klarna in Shopify Payments for European markets.',
            'Display local payment icons in the footer and beneath the checkout CTA.',
            'Measure market-specific CVR segmented by payment method.',
        ],
        furtherReading: [
            { title: 'Stripe: Global Payment Methods Guide', url: 'https://stripe.com/guides/payment-methods-guide' },
        ],
    },
    {
        id: 'm20-l4',
        moduleId: 'module-20',
        slug: 'international-duty-tax-shipping-ddp-vs-ddu',
        title: 'International Duty, Tax & Shipping Transparency: DDP vs DDU',
        estimatedMinutes: 25,
        objectives: [
            'Understand the catastrophic conversion impact of Delivered Duty Unpaid (DDU) surprise customs bills.',
            'Implement Delivered Duty Paid (DDP) calculation in Shopify Markets at checkout.',
            'Communicate tax inclusivity (VAT included) for European, UK, and Australian shoppers.',
        ],
        videoSource: {
            title: 'How to Set Up Duties and Import Taxes in Shopify for International Orders',
            embedUrl: 'https://www.youtube-nocookie.com/embed/QnzP2Vn37o8',
            channel: 'Ecom Mastery',
            duration: '12:29',
            description: 'Curated technical CRO masterclass from Ecom Mastery covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['How to Set Up Duties and Import Taxes in Shopify for International Orders'],
        },
        sections: [
            {
                heading: 'The Shock of Doorstep Customs Demands',
                body: `A UK customer orders a $120 jacket from a US brand. Two weeks later, the delivery driver demands a £42 cash customs fee before handing over the parcel.
Result: The customer refuses the package, requests a full chargeback, leaves a 1-star review on Trustpilot, and vows never to buy again.

Delivered Duty Unpaid (DDU) is the single fastest way to destroy international repeat purchase rates.`,
            },
            {
                heading: 'Delivered Duty Paid (DDP) with Shopify Markets Pro / Global-e',
                body: `DDP calculates and collects exact customs duties, import tariffs, and local VAT directly in the online checkout. The parcel is marked pre-cleared, flying through international customs without carrier delays or customer collection fees.`,
            },
            {
                heading: 'VAT Inclusivity Messaging',
                body: `In Europe and the UK, displaying pre-tax prices is illegal and perceived as deceptive. Consumers expect the price on the PDP to be the exact final price they pay.
Shopify Liquid allows you to append tax notices based on market rules:`,
                code: `{% comment %} Tax inclusivity indicator in Liquid {% endcomment %}
<div class="product__tax-notice">
  {% if cart.taxes_included %}
    <span class="tax-badge">{{ 'products.product.include_taxes' | t }} (VAT included)</span>
  {% else %}
    <span class="tax-badge">{{ 'products.product.shipping_policy_html' | t: link: pages.shipping.url }}</span>
  {% endif %}
</div>`,
                language: 'liquid',
            },
        ],
        mistakes: [
            'Shipping cross-border DDU without warning customers about import duties.',
            'Showing US-style pre-tax prices to European and Australian consumers.',
            'Failing to show estimated international transit times in business days.',
        ],
        checklist: [
            'Enable duty and import tax calculation in Shopify Markets settings.',
            'Toggle "Include taxes in product prices" for European, UK, and Australian markets.',
            'State clearly on checkout: "No surprise delivery fees — all duties & taxes guaranteed pre-paid."',
        ],
        furtherReading: [
            { title: 'Shopify Help: Collecting Duties and Taxes at Checkout', url: 'https://help.shopify.com/en/manual/markets/duties-and-import-taxes' },
        ],
    },
    {
        id: 'm20-l5',
        moduleId: 'module-20',
        slug: 'cultural-cognitive-biases-transcreation-rtl',
        title: 'Cultural Cognitive Biases, Transcreation & RTL Layouts',
        estimatedMinutes: 30,
        objectives: [
            'Differentiate between literal translation and cultural transcreation in ecommerce.',
            'Implement flawless Right-to-Left (RTL) CSS architecture for Arabic and Hebrew markets.',
            'Adapt visual semiotics, color psychology, and imagery representation for global audiences.',
        ],
        videoSource: {
            title: 'Introduction to Cognitive Bias: Crash Course Scientific Thinking #1',
            embedUrl: 'https://www.youtube-nocookie.com/embed/d2r7Bk1NlgU',
            channel: 'CrashCourse',
            duration: '11:49',
            description: 'Curated technical CRO masterclass from CrashCourse covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Introduction to Cognitive Bias: Crash Course Scientific Thinking #1'],
        },
        sections: [
            {
                heading: 'Translation vs Transcreation',
                body: `Running an automated machine translation (Google Translate / DeepL) on your store often leads to awkward, unnatural phrasing that repels native speakers.

Transcreation is the process of adapting marketing copy, metaphors, and cultural references so they resonate with local sensibilities while preserving brand voice. In Japan, high-converting stores utilize detailed feature-dense text and explicit manufacturing certifications, whereas Scandinavian stores convert highest with minimalist aesthetics and sustainability disclosures.`,
            },
            {
                heading: 'Right-to-Left (RTL) Layout Architecture',
                body: `When serving Middle Eastern markets (Arabic, Hebrew), the entire spatial orientation of the interface flips:
- Carousels advance from right to left
- Star ratings align from right to left
- Navigation drawers slide out from the right
- Form label icons sit on the right of input fields

Modern CSS makes RTL adaptation clean using CSS Logical Properties (\`margin-inline-start\`, \`padding-inline-end\`) instead of hardcoded \`margin-left\` or \`margin-right\`.`,
                code: `/* Modern Bi-Directional CSS with Logical Properties */
.product-card__content {
  /* Automatically maps to left in LTR and right in RTL */
  padding-inline-start: 16px;
  padding-inline-end: 16px;
  text-align: start; /* Adapts automatically */
}

/* Explicit RTL adjustments if needed */
[dir="rtl"] .carousel-arrow--next {
  transform: rotate(180deg);
}`,
                language: 'css',
            },
            {
                heading: 'Color Psychology & Visual Semiotics',
                body: `Colors carry radically divergent cultural meanings:
- White: Purity in Western culture; mourning and funerals in parts of East Asia.
- Red: Danger or clearance in the West; luck, prosperity, and wealth in China.
- Green: Eco-friendly in the West; deeply sacred and traditional across the Islamic world.`,
            },
        ],
        mistakes: [
            'Using directional icons (like right-facing arrows) that point backwards in RTL languages.',
            'Using hardcoded left/right CSS margins instead of modern CSS logical properties.',
            'Failing to mirror checkout form field tab indexes in RTL mode.',
        ],
        checklist: [
            'Ensure the HTML element has dir="rtl" attribute on Arabic and Hebrew locales.',
            'Replace margin-left and margin-right with margin-inline-start and margin-inline-end.',
            'Test RTL layout on actual mobile Safari with Arabic keyboard input.',
        ],
        furtherReading: [
            { title: 'MDN: CSS Logical Properties and Values', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values' },
        ],
    },
];
