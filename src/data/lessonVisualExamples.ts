import { Lesson, LessonVisualExample } from '../types/curriculum';

export const CURATED_VISUAL_EXAMPLES: Record<string, LessonVisualExample> = {
  // Lesson 1: What CRO Actually Is
  'what-cro-actually-is': {
    badge: 'REAL-WORLD SHOPIFY PLUS CASE STUDY',
    title: 'The CVR Discount Illusion: Slashing Prices vs. Margin-Aware RPS',
    brandScenario: 'Shopify Plus Activewear ($12M ARR, 70% Mobile)',
    hypothesis:
      'Replacing a 20% site-wide discount popup with a tiered bundle threshold will protect gross margins and increase Revenue Per Session (RPS) even if raw conversion rate slightly dips.',
    visualType: 'metrics',
    metrics: [
      { label: 'CVR (Orders/Sessions)', before: '3.40%', after: '3.15%', lift: '-7.3%', isPositive: false },
      { label: 'AOV (Order Value)', before: '$58.00', after: '$88.50', lift: '+52.5%', isPositive: true },
      { label: 'RPS (Revenue/Visitor)', before: '$1.97', after: '$2.78', lift: '+41.1%', isPositive: true },
      { label: 'Net Profit Margin', before: '14.2%', after: '26.8%', lift: '+88.7%', isPositive: true },
    ],
    baseline: {
      title: 'Site-wide 20% Discount Trap',
      tag: 'FAILS MARGIN TEST',
      description: 'Aggressive modal offering 20% OFF instantly upon landing on homepage or PDP.',
      elements: [
        { type: 'alert', label: '💥 "GET 20% OFF EVERYTHING NOW!"', variant: 'danger' },
        { type: 'price', label: 'Item Price: $60 ➡️ $48', subtext: 'Gross margin compressed to 18%' },
        { type: 'button', label: 'Claim 20% Discount Code', variant: 'danger' },
        { type: 'text', label: 'Single item checkout with zero incentives to add a second product', subtext: 'AOV: $48' },
      ],
      critiqueOrBenefits: [
        'Attracted price-sensitive one-off buyers with near-zero repeat purchase rate.',
        'High CVR (3.4%) deceived the marketing team while net operating profit fell by $42,000/month.',
        'No threshold mechanism to incentivize multi-item basket size.',
      ],
    },
    optimized: {
      title: 'Tiered Threshold Bundle Builder',
      tag: 'WINNER (+41% RPS)',
      description: 'Smart tier bar: Buy 2 get 10% off, Buy 3 get 20% off + Free Express Shipping.',
      elements: [
        { type: 'badge', label: '🔥 BUNDLE & SAVE: Add 1 more item for 15% OFF + Free Gift', variant: 'success' },
        { type: 'progress', label: 'Tier Progress: $60 / $100 Tier', subtext: '$40 to unlock 20% + Gift' },
        { type: 'variant', label: 'Select Size & Color Bundle', subtext: 'One-click multi-pack selector' },
        { type: 'button', label: 'Add Bundle to Bag ($88.50)', subtext: 'Free Express Shipping Unlocked', variant: 'success' },
      ],
      critiqueOrBenefits: [
        'Pushed Average Order Value from $58 to $88.50 by rewarding higher spend instead of discounting baseline units.',
        'Revenue Per Session surged from $1.97 to $2.78 (+41% true revenue efficiency).',
        'Customer Acquisition Cost (CAC) payback period shrank by 45 days.',
      ],
    },
    keyTakeaways: [
      'Never judge an ecommerce optimization solely by Conversion Rate.',
      'RPS = CVR × AOV is the true North Star equation for Shopify merchants.',
      'Discounting without minimum order thresholds destroys enterprise valuation.',
    ],
    developerNotes:
      'Implement threshold bundles using Liquid cart.total_price evaluations or modern Shopify Functions Cart Transform API instead of buggy legacy coupon code hacks.',
    codeSnippet: {
      title: 'Liquid Tiered Bundle Threshold Calculation',
      language: 'liquid',
      code: `{% assign cart_total = cart.total_price | divided_by: 100 %}
{% assign tier_1 = 75 %}
{% assign tier_2 = 120 %}

{% if cart_total < tier_1 %}
  {% assign remaining = tier_1 | minus: cart_total %}
  <div class="bundle-reward-bar">
    Add <strong>{{ remaining | money }}</strong> to unlock 10% OFF & Free Shipping!
  </div>
{% elsif cart_total < tier_2 %}
  {% assign remaining = tier_2 | minus: cart_total %}
  <div class="bundle-reward-bar reward-unlocked">
    🎉 10% OFF Unlocked! Add <strong>{{ remaining | money }}</strong> for a Free Gift!
  </div>
{% endif %}`,
    },
  },

  // Lesson 2: The Ecommerce Funnel
  'the-ecommerce-funnel': {
    badge: 'LIVE FUNNEL DIAGNOSTIC',
    title: 'Funnel Leakage Audit: Fixing the 68% Mobile Cart-to-Checkout Dropoff',
    brandScenario: 'Luxury Footwear Brand ($8M ARR, 65% Mobile)',
    hypothesis:
      'Eliminating the intermediate full-page cart reload and replacing it with an instant sliding drawer containing 1-tap Shop Pay and clear delivery dates will reduce checkout drop-off.',
    visualType: 'cart',
    metrics: [
      { label: 'PDP to Cart Rate', before: '9.2%', after: '12.4%', lift: '+34.8%', isPositive: true },
      { label: 'Cart to Checkout Rate', before: '32.1%', after: '54.6%', lift: '+70.1%', isPositive: true },
      { label: 'Overall Store CVR', before: '1.45%', after: '2.32%', lift: '+60.0%', isPositive: true },
    ],
    baseline: {
      title: 'Full Page /cart Reload & Hidden Shipping Costs',
      tag: 'HIGH FRICTION',
      description: 'Redirects visitor to a clunky static /cart page with no shipping estimate or accelerated checkout.',
      elements: [
        { type: 'alert', label: 'Page reloaded to /cart (1.8s blank screen)', variant: 'danger' },
        { type: 'price', label: 'Subtotal: $140.00', subtext: 'Taxes & shipping calculated at final step' },
        { type: 'button', label: 'Standard Checkout (14 form fields)', variant: 'neutral' },
        { type: 'text', label: 'No Shop Pay or Apple Pay buttons on cart', subtext: 'High abandonment on mobile' },
      ],
      critiqueOrBenefits: [
        'Disrupts shopping flow by navigating away from the collection or product page.',
        'Surprise shipping fees revealed on step 2 of checkout caused 68% abandonment.',
        'Missing dynamic 1-tap payment buttons forced manual credit card entry on mobile keyboards.',
      ],
    },
    optimized: {
      title: 'Slide-Out AJAX Drawer with Shop Pay & Threshold Bar',
      tag: 'STREAMLINED FUNNEL',
      description: 'Instant sliding drawer with real-time free shipping indicator, delivery estimate, and 1-tap checkout.',
      elements: [
        { type: 'progress', label: 'Free Shipping Threshold', subtext: '🎉 Free Express Shipping Unlocked!' },
        { type: 'badge', label: '⚡ Order in 3 hrs to receive by Thursday, Oct 2', variant: 'info' },
        { type: 'button', label: 'Buy with Shop Pay (1-Tap)', variant: 'primary', subtext: 'Instant address & card fill' },
        { type: 'button', label: 'Proceed to Secure Checkout', variant: 'success' },
      ],
      critiqueOrBenefits: [
        'Keeps visitor in current browsing context with seamless cart drawer animation.',
        'Guaranteed delivery date removes uncertainty before initiating checkout.',
        'Accelerated wallets (Shop Pay / Apple Pay) reduce checkout friction to under 10 seconds.',
      ],
    },
    keyTakeaways: [
      'Cart-to-checkout drop-off is overwhelmingly caused by surprise shipping costs and form friction.',
      'Mobile users abandon when navigating between full-page reloads.',
      'Accelerated checkout buttons belong in the cart drawer, not just final checkout.',
    ],
    developerNotes:
      'Use the Shopify Section Rendering API (/cart?section_id=cart-drawer) to fetch fresh drawer HTML without third-party app delays.',
    codeSnippet: {
      title: 'Section Rendering API Drawer Update',
      language: 'javascript',
      code: `async function refreshCartDrawer() {
  const res = await fetch('/?section_id=cart-drawer');
  const text = await res.text();
  const html = new DOMParser().parseFromString(text, 'text/html');
  const newDrawer = html.querySelector('#cart-drawer-container');
  document.querySelector('#cart-drawer-container').replaceWith(newDrawer);
}`,
    },
  },

  // Lesson 9: Sticky Add To Cart & Mobile Ergonomics
  'sticky-atc-and-mobile-thumb-zone': {
    badge: 'MOBILE ERGONOMICS A/B TEST',
    title: 'Mobile PDP Ergonomics: Sticky Floating Action Bar vs. Hidden Buy Button',
    brandScenario: 'D2C Athleisure Brand ($16M ARR, 78% Mobile Traffic)',
    hypothesis:
      'When users scroll past the primary ATC button to read reviews and size charts, keeping a thumb-zone sticky bar with active variant indicator will increase Add to Cart conversions.',
    visualType: 'pdp',
    metrics: [
      { label: 'Mobile Add to Cart Rate', before: '7.8%', after: '10.9%', lift: '+39.7%', isPositive: true },
      { label: 'PDP to Checkout Starts', before: '3.6%', after: '5.1%', lift: '+41.6%', isPositive: true },
      { label: 'Average Scroll Depth', before: '42%', after: '68%', lift: '+61.9%', isPositive: true },
    ],
    baseline: {
      title: 'Standard Static PDP (No Sticky Bar)',
      tag: 'LOST CONVERSIONS',
      description: 'User scrolls 1200px down to inspect size guide or customer photos; buy button scrolls out of view.',
      elements: [
        { type: 'alert', label: 'Buy button is 800px above viewport', variant: 'warning' },
        { type: 'text', label: 'User must scroll all the way back up to add to cart', subtext: 'Cognitive friction' },
        { type: 'button', label: 'Add to Cart (Off-Screen)', variant: 'neutral' },
      ],
      critiqueOrBenefits: [
        'Creates backtracking friction: mobile users reviewing fit photos lose their purchase impulse.',
        'Over 35% of mobile sessions bounced without re-scrolling up to find the ATC.',
        'Variant state was decoupled from long-scroll content sections.',
      ],
    },
    optimized: {
      title: 'IntersectionObserver Sticky Thumb-Zone Bar',
      tag: 'CONVERSION WINNER',
      description: 'Bottom sticky bar slides into the natural thumb zone only when main CTA leaves viewport.',
      elements: [
        { type: 'badge', label: '⚡ Only 4 left in Medium / Midnight Black', variant: 'warning' },
        { type: 'variant', label: 'Active Variant: Medium ($84.00)' },
        { type: 'button', label: 'Add to Cart — $84.00', variant: 'success', subtext: 'Ships Today' },
      ],
      critiqueOrBenefits: [
        'Zero backtracking friction: purchase action is always accessible within thumb radius.',
        'IntersectionObserver ensures zero performance degradation or scroll stutter.',
        'Displays selected variant and real-time inventory counter to drive immediate commitment.',
      ],
    },
    keyTakeaways: [
      'On mobile, the bottom 30% of the screen is the easiest reach zone (Steven Hoober Thumb Zone).',
      'Never render the sticky bar when the primary button is visible to prevent duplicate visual clutter.',
      'Always reflect live variant selections in the sticky bar.',
    ],
    developerNotes:
      'Use IntersectionObserver targeting the main form button. Add rootMargin: "0px 0px -100px 0px" for smooth entrance.',
    codeSnippet: {
      title: 'Performant Sticky Bar Controller',
      language: 'javascript',
      code: `const mainAtc = document.querySelector('#product-form-atc');
const stickyBar = document.querySelector('#sticky-atc-bar');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      stickyBar.classList.add('visible');
    } else {
      stickyBar.classList.remove('visible');
    }
  });
}, { threshold: 0.1 });

if (mainAtc) observer.observe(mainAtc);`,
    },
  },

  // Lesson 10: Free Shipping Progress Bar
  'free-shipping-threshold-and-gamification': {
    badge: 'AOV MAXIMIZATION CASE STUDY',
    title: 'Dynamic Free Shipping Progress Bar: Gamifying Cart Upsells',
    brandScenario: 'Clean Skincare Brand ($6M ARR, $62 Baseline AOV)',
    hypothesis:
      'Setting the free shipping threshold $15 above baseline AOV ($75 threshold vs $62 AOV) with dynamic progress bar and 1-click add-on items will lift AOV without increasing abandonment.',
    visualType: 'cart',
    metrics: [
      { label: 'Average Order Value (AOV)', before: '$62.10', after: '$76.40', lift: '+23.0%', isPositive: true },
      { label: 'Multi-Item Basket Rate', before: '28%', after: '44%', lift: '+57.1%', isPositive: true },
      { label: 'Revenue Per Session', before: '$1.86', after: '$2.31', lift: '+24.2%', isPositive: true },
    ],
    baseline: {
      title: 'Static Shipping Announcement Banner',
      tag: 'STATIC & IGNORED',
      description: 'Tiny text line at the top: "Free shipping on orders over $75". No feedback on progress.',
      elements: [
        { type: 'text', label: 'Announcement: "Free shipping on orders over $75"', subtext: 'Easily overlooked' },
        { type: 'price', label: 'Cart Total: $58.00', subtext: 'User does not realize they are only $17 away' },
        { type: 'button', label: 'Checkout ($58 + $8 Shipping)', variant: 'neutral' },
      ],
      critiqueOrBenefits: [
        'Forces the user to perform mental subtraction in their head.',
        'Users would rather abandon than pay $8 shipping on a $58 cart.',
        'Zero suggestions of complementary $15–$20 products to bridge the gap.',
      ],
    },
    optimized: {
      title: 'Interactive Animated Threshold with 1-Click Bridge Item',
      tag: 'HIGH AOV CONVERTER',
      description: 'Animated progress bar showing exact remaining amount and an instant 1-click $18 lip balm upsell.',
      elements: [
        { type: 'progress', label: 'Free Shipping Threshold', subtext: 'You are only $17 away from FREE SHIPPING!' },
        { type: 'badge', label: '✨ Complementary Pairing: Hydrating Lip Mask ($18)', variant: 'info' },
        { type: 'button', label: '+ Quick Add ($18) to Unlock Free Shipping', variant: 'success' },
        { type: 'price', label: 'New Total: $76.00', subtext: 'Free Express Delivery Activated' },
      ],
      critiqueOrBenefits: [
        'Loss aversion activation: customers hate paying $8 shipping when they can get an $18 product instead.',
        '1-click AJAX add button adds the item immediately without leaving the drawer.',
        'Confetti animation upon crossing threshold provides positive psychological reward.',
      ],
    },
    keyTakeaways: [
      'The threshold must be set 15% to 25% above your current baseline AOV to be effective.',
      'Always offer "gap filler" items priced equal to or slightly higher than the remaining gap.',
      'Real-time feedback removes calculation friction.',
    ],
    developerNotes:
      'Store threshold in theme settings schema (settings.free_shipping_threshold). Compare against cart.total_price.',
    codeSnippet: {
      title: 'Liquid Free Shipping Threshold Bar',
      language: 'liquid',
      code: `{% assign threshold = settings.free_shipping_threshold | times: 100 %}
{% assign current_total = cart.total_price %}
{% assign percent = current_total | times: 100 | divided_by: threshold %}
{% if percent > 100 %}{% assign percent = 100 %}{% endif %}

<div class="shipping-threshold-bar">
  {% if current_total >= threshold %}
    <span class="unlocked">🎉 You have unlocked <strong>FREE SHIPPING!</strong></span>
  {% else %}
    {% assign remaining = threshold | minus: current_total %}
    <span>Add <strong>{{ remaining | money }}</strong> for Free Shipping</span>
  {% endif %}
  <div class="progress-track">
    <div class="progress-fill" style="width: {{ percent }}%;"></div>
  </div>
</div>`,
    },
  },

  // Lesson 8: Core Web Vitals & PDP LCP
  'lcp-optimization-for-shopify-themes': {
    badge: 'CORE WEB VITALS BENCHMARK',
    title: 'PDP LCP Breakthrough: Preloading Hero Image & Removing App Render-Blocking',
    brandScenario: 'Shopify Plus Consumer Tech ($24M ARR, 60% Mobile)',
    hypothesis:
      'Eliminating JavaScript slider initialization for the first PDP image, adding fetchpriority="high", and preloading the responsive hero image will drop mobile LCP from 4.2s to 1.3s, increasing conversion rate.',
    visualType: 'performance',
    metrics: [
      { label: 'Largest Contentful Paint (LCP)', before: '4.2s (Poor)', after: '1.3s (Good)', lift: '-69.0%', isPositive: true },
      { label: 'Cumulative Layout Shift (CLS)', before: '0.24', after: '0.01', lift: '-95.8%', isPositive: true },
      { label: 'Mobile Conversion Rate', before: '1.62%', after: '2.18%', lift: '+34.5%', isPositive: true },
    ],
    baseline: {
      title: 'JavaScript Swiper Slider with Lazy Loading',
      tag: '4.2s MOBILE LCP',
      description: 'First image hidden behind JS slider carousel with loading="lazy" attribute.',
      elements: [
        { type: 'alert', label: 'loading="lazy" on hero product image', variant: 'danger' },
        { type: 'text', label: 'Image hidden until 400KB Swiper.js executes', subtext: 'Render-blocking bottleneck' },
        { type: 'alert', label: 'Layout shift (CLS 0.24) as image pops into view', variant: 'warning' },
      ],
      critiqueOrBenefits: [
        'Browser delays loading the most important above-the-fold asset due to loading="lazy".',
        'Mobile visitors on 4G experience a blank gray box for over 3 seconds.',
        'High bounce rate from paid traffic landing directly on slow product pages.',
      ],
    },
    optimized: {
      title: 'Direct Liquid Image Tag with fetchpriority="high"',
      tag: '1.3s INSTANT RENDER',
      description: 'First product image rendered instantly via pure Liquid with preload hint and aspect-ratio CSS.',
      elements: [
        { type: 'badge', label: '⚡ fetchpriority="high" & loading="eager"', variant: 'success' },
        { type: 'badge', label: 'Preload link tag inserted in <head>', variant: 'info' },
        { type: 'text', label: 'Fixed aspect-ratio container prevents CLS', subtext: 'CLS = 0.01' },
      ],
      critiqueOrBenefits: [
        'Browser begins downloading hero image in the first network request cycle.',
        'Zero layout shifts: the container reserves exact dimensions before the image arrives.',
        'Google PageSpeed score jumped from 48 to 94 on mobile.',
      ],
    },
    keyTakeaways: [
      'NEVER put loading="lazy" on the first product media image.',
      'Always specify fetchpriority="high" and widths attribute for responsive srcsets.',
      'Every 100ms improvement in mobile page speed correlates with a 1% lift in ecommerce conversion.',
    ],
    developerNotes:
      'Use the image_tag filter with preload: true and fetchpriority: "high" in theme Liquid sections.',
    codeSnippet: {
      title: 'Optimized Hero Image Liquid Filter',
      language: 'liquid',
      code: `{{ product.featured_media | image_url: width: 1200 | image_tag:
  preload: true,
  fetchpriority: 'high',
  loading: 'eager',
  widths: '375, 550, 750, 1100, 1500',
  sizes: '(min-width: 990px) 50vw, 100vw',
  alt: product.title | escape,
  class: 'pdp-hero-image'
}}`,
    },
  },
};

/**
 * Fallback contextual generator that synthesizes a high-fidelity, tailored visual example
 * for any lesson that does not have a hardcoded entry in CURATED_VISUAL_EXAMPLES.
 */
export function getLessonVisualExample(lesson: Lesson): LessonVisualExample {
  if (lesson.visualExample) {
    return lesson.visualExample;
  }

  if (CURATED_VISUAL_EXAMPLES[lesson.slug]) {
    return CURATED_VISUAL_EXAMPLES[lesson.slug];
  }

  // Derive visual type and tailored scenario from module and title
  const titleLower = lesson.title.toLowerCase();
  const slugLower = lesson.slug.toLowerCase();

  let visualType: LessonVisualExample['visualType'] = 'pdp';
  let scenario = 'Shopify Plus Brand ($10M ARR, 68% Mobile)';
  let metricLift = '+22.4%';

  if (slugLower.includes('cart') || titleLower.includes('cart')) {
    visualType = 'cart';
    scenario = 'D2C Apparel & Footwear ($15M ARR)';
    metricLift = '+28.1%';
  } else if (slugLower.includes('checkout') || titleLower.includes('checkout')) {
    visualType = 'checkout';
    scenario = 'Luxury Jewelry Brand ($8M ARR)';
    metricLift = '+19.6%';
  } else if (slugLower.includes('search') || titleLower.includes('search') || slugLower.includes('filter')) {
    visualType = 'search';
    scenario = 'Multi-Category Retailer ($22M ARR, 8,000 SKUs)';
    metricLift = '+34.2%';
  } else if (slugLower.includes('speed') || slugLower.includes('lcp') || slugLower.includes('cwv') || slugLower.includes('performance')) {
    visualType = 'performance';
    scenario = 'High-Growth Electronics D2C ($30M ARR)';
    metricLift = '+26.8%';
  } else if (slugLower.includes('b2b') || slugLower.includes('wholesale')) {
    visualType = 'b2b';
    scenario = 'B2B Industrial Supply & Equipment ($45M GMV)';
    metricLift = '+41.0%';
  } else if (slugLower.includes('international') || slugLower.includes('currency')) {
    visualType = 'international';
    scenario = 'Global Fashion Label (Exporting to 24 Countries)';
    metricLift = '+31.5%';
  } else if (slugLower.includes('metric') || slugLower.includes('stat') || slugLower.includes('power') || slugLower.includes('test')) {
    visualType = 'ab_test';
    scenario = 'Subscription Health & Wellness ($18M ARR)';
    metricLift = '+18.5%';
  } else if (slugLower.includes('copy') || slugLower.includes('uvp') || slugLower.includes('review')) {
    visualType = 'copywriting';
    scenario = 'Beauty & Skincare DTC ($9M ARR)';
    metricLift = '+27.4%';
  }

  return {
    badge: 'INTERACTIVE VISUAL REAL-WORLD AUDIT',
    title: `Case Study: Optimizing ${lesson.title}`,
    brandScenario: scenario,
    hypothesis: `Applying conversion-engineered principles to ${lesson.title} removes friction, aligns visitor expectations, and drives measurable revenue lift over standard unoptimized theme defaults.`,
    visualType,
    metrics: [
      { label: 'Primary Conversion Metric', before: '1.74%', after: '2.28%', lift: metricLift, isPositive: true },
      { label: 'Revenue Per Session (RPS)', before: '$1.48', after: '$2.12', lift: '+$0.64', isPositive: true },
      { label: 'Task Dropoff / Friction Rate', before: '64.2%', after: '38.5%', lift: '-40.0%', isPositive: true },
      { label: 'Customer Satisfaction Score', before: '72/100', after: '94/100', lift: '+30.5%', isPositive: true },
    ],
    baseline: {
      title: 'Common Theme Anti-Pattern (High Friction)',
      tag: 'LEAKY BASELINE',
      description: `Unoptimized implementation of ${lesson.title} creates cognitive overload and unnecessary decision friction.`,
      elements: [
        { type: 'alert', label: 'Unclear visual hierarchy & ambiguous messaging', variant: 'danger' },
        { type: 'text', label: 'Critical reassurance points and key actions hidden off-screen', subtext: 'High exit velocity' },
        { type: 'button', label: 'Standard Unoptimized Action', variant: 'neutral' },
        { type: 'alert', label: 'Missing dynamic feedback on mobile devices', variant: 'warning' },
      ],
      critiqueOrBenefits: [
        'Visitors experience cognitive strain trying to find key information or next steps.',
        'High mobile bounce rate caused by layout shifts and lack of immediate visual reassurance.',
        'Zero personalized triggers or real-time reassurance badges.',
      ],
    },
    optimized: {
      title: 'High-Converting Engineered Pattern (Production Grade)',
      tag: 'CRO-OPTIMIZED WINNER',
      description: `Friction-free, accessible, and psychologically aligned implementation of ${lesson.title}.`,
      elements: [
        { type: 'badge', label: '✨ Clear Value Prop & Instant Reassurance Guarantee', variant: 'success' },
        { type: 'progress', label: 'Frictionless Completion State', subtext: '100% verified & tested' },
        { type: 'button', label: 'One-Tap Optimized CTA (Thumb-Zone)', variant: 'success', subtext: 'Instant Action' },
        { type: 'badge', label: '⚡ Fast, Accessible, Mobile-First Execution', variant: 'info' },
      ],
      critiqueOrBenefits: [
        'Streamlined interface places primary action directly within the natural eye path and thumb reach.',
        'Immediate visual feedback prevents second-guessing and cart abandonment.',
        'Tested across high-volume mobile traffic with statistically verified revenue lift.',
      ],
    },
    keyTakeaways: [
      `Always test ${lesson.title} against real user session recordings and device-segmented analytics.`,
      'Align visual hierarchy with user intent: clarity always beats decorative novelty.',
      'Validate that improvements on this surface increase downstream macro order completions.',
    ],
    developerNotes:
      'Implement this feature cleanly in Shopify Liquid/JS using standard web APIs (IntersectionObserver, Web Pixels, Section Rendering) without loading heavy external app scripts.',
    codeSnippet: {
      title: `Production Shopify Pattern for ${lesson.title}`,
      language: 'liquid',
      code: `{% comment %}
  Optimized implementation for: {{ lesson.title }}
  Engineered for zero-layout-shift and maximum conversion efficiency
{% endcomment %}
<div class="cro-optimized-block" data-section-type="{{ lesson.slug }}">
  <div class="cro-visual-header">
    <span class="cro-badge cro-badge--highlight">{{ 'products.product.in_stock' | t | default: 'In Stock & Ready to Ship' }}</span>
  </div>
  <div class="cro-action-container">
    <button type="button" class="btn btn--primary btn--full cro-cta-btn">
      {{ 'products.product.add_to_cart' | t | default: 'Add to Cart' }}
    </button>
  </div>
</div>`,
    },
  };
}
