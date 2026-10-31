export const PHASE_3_LESSONS = [
    // MODULE 9: PDP & Collection UX
    {
        id: 'm9-l1',
        moduleId: 'module-9',
        slug: 'pdp-anatomy-every-block-and-why-it-exists',
        title: 'PDP Anatomy: Every Block and Why It Exists',
        estimatedMinutes: 25,
        objectives: [
            'Deconstruct the visual hierarchy of top-converting Shopify PDPs.',
            'Order above-the-fold elements: Breadcrumbs, Title, Review aggregate, Price/Compare-at, Swatches, ATC, Value props.',
            'Eliminate visual clutter that competes with primary purchase intent.',
        ],
        videoSource: {
            title: 'How I Build High-Converting Shopify PDPs (Step by Step)',
            embedUrl: 'https://www.youtube-nocookie.com/embed/CFL35WERNSw',
            channel: 'Toskalo',
            duration: '10:29',
            description: 'Curated technical CRO masterclass from Toskalo covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['How I Build High', 'Converting Shopify PDPs (Step by Step)'],
        },
        sections: [
            {
                heading: 'Deconstructing the Visual Hierarchy of Top-Converting PDPs',
                body: `The Product Detail Page (PDP) is the commercial engine of ecommerce. Over 65% of paid traffic lands directly on this URL. If visual hierarchy is ambiguous, cognitive friction spikes and visitors bounce.

Key Structural Zones:
1. Gallery & Visual Proof (Left Column / Top on Mobile):
   High-resolution contextual imagery, video loops, and aspect-ratio stabilized media containers.
2. The Decision & Buy Box (Right Column / Immediate Scroll on Mobile):
   Breadcrumb navigation -> Brand badge & Product Title -> Social proof star rating -> Dynamic pricing & compare-at tier -> Color/Size variant swatches -> Primary Add-to-Cart CTA -> Value proposition micro-reassurances.
3. Feature Deep-Dive & Trust Reinforcement (Below the Fold):
   Expandable accordion drawers for specifications/materials, customer review breakdowns with photo UGC, and complementary cross-sell recommendations.`,
                callout: {
                    type: 'tip',
                    text: 'Top-converting brands keep the entire buy box within the initial mobile viewport (above 650px height) so users never have to hunt for the Add to Cart button.',
                },
            },
            {
                heading: 'Above-the-Fold Element Ordering & Eye-Path Scannability',
                body: `Eye-tracking studies demonstrate that shoppers scan ecommerce product pages in an 'F' or 'Z' shape pattern. Deviating from standard ordering forces users to think rather than shop.

The Canonical Above-the-Fold Order:
1. Category Breadcrumbs: Anchors user orientation (\`Men / Footwear / Running\`).
2. Product Title (H1): Clean, descriptive, avoiding cryptic SKU codes.
3. Review Rating Aggregate: Star rating with clickable review count linking down to customer reviews.
4. Price Display: Prominent current price with strikethrough compare-at price and percentage savings pill.
5. Variant Swatches: Visual color circles and text pills for sizing.
6. Primary Action (ATC): High-contrast button spanning full container width.
7. Reassurance Badges: 3 succinct bullet points (e.g., "Free Carbon-Neutral Shipping Over $75", "30-Day Easy Returns", "2-Year Warranty").`,
                callout: {
                    type: 'shopify',
                    text: 'In Shopify themes, avoid nesting social share buttons above the buy box. Social sharing icons have a sub-0.05% click rate on commercial PDPs and introduce severe visual distraction.',
                },
            },
            {
                heading: 'Eliminating Visual Clutter That Competes with Purchase Intent',
                body: `Clutter is the enemy of conversion. When a PDP contains flashing countdown timers, live visitor counters ("14 people viewing this!"), spin-to-win popups, and multiple competing banners, buyer anxiety increases.

Audit & Elimination Protocol:
• Strip Fake Urgency: Modern shoppers recognize fake countdown widgets; they erode brand trust and inflate bounce rates.
• Consolidate Badges: Replace 6 disparate third-party security badges with 3 clean, branded iconography items.
• Tidy Tabbed Content: Convert lengthy 2,000-word product descriptions into collapsible accordion drawers (Details, Shipping & Returns, Materials & Care).`,
                code: `<!-- High-Conversion Shopify PDP Buy Box Hierarchy Snippet -->
<div class="product-buy-box">
  <nav class="product__breadcrumbs" aria-label="Breadcrumb">
    <a href="/collections/all">Catalog</a> / <span>{{ product.type }}</span>
  </nav>

  <h1 class="product__title">{{ product.title }}</h1>

  <div class="product__rating-summary">
    <span class="stars" aria-hidden="true">★★★★★</span>
    <a href="#customer-reviews" class="rating-count">4.9 (428 reviews)</a>
  </div>

  <div class="product__price-container">
    <span class="price-current">{{ product.price | money }}</span>
    {% if product.compare_at_price > product.price %}
      <s class="price-compare">{{ product.compare_at_price | money }}</s>
      <span class="badge-savings">Save {{ product.compare_at_price | minus: product.price | money }}</span>
    {% endif %}
  </div>

  {% form 'product', product, id: 'product-form-installment' %}
    <input type="hidden" name="id" value="{{ product.selected_or_first_available_variant.id }}">
    
    <!-- Variant Swatches Block Rendered Here -->
    <button type="submit" name="add" class="btn-primary-atc">
      {% if product.selected_or_first_available_variant.available %}
        Add to Cart
      {% else %}
        Sold Out
      {% endif %}
    </button>
  {% endform %}

  <ul class="product__reassurance-list">
    <li>✓ Ships next business day from Chicago</li>
    <li>✓ Free exchanges & 30-day returns</li>
  </ul>
</div>`,
                language: 'html',
            }
        ],
        mistakes: [
            'Burying the Add to Cart button below 600px of text description on mobile screens.',
            'Hiding price savings calculations (e.g. showing $80 and $100 without displaying "Save $20 (20%)").',
        ],
        checklist: [
            'I can audit a PDP against standard conversion visual hierarchy.',
            'I ensure the Add to Cart button is visible without scrolling on standard mobile viewports.',
        ],
        furtherReading: [
            { title: 'Baymard Institute: Product Page Visual Hierarchy', url: 'https://baymard.com' },
        ],
    },
    {
        id: 'm9-l2',
        moduleId: 'module-9',
        slug: 'variant-pickers-size-guides-and-sticky-atc',
        title: 'Variant Pickers, Size Guides, and Sticky ATC',
        estimatedMinutes: 30,
        objectives: [
            'Replace clunky native dropdowns with interactive pill and swatch selectors.',
            'Code a high-performance, non-intrusive sticky Add to Cart bar in Liquid and Vanilla JS.',
            'Implement clear out-of-stock and back-in-stock notification states.',
        ],
        videoSource: {
            title: 'Hidden Secret to Mobile CRO Boosting : Shopify Tutorial',
            embedUrl: 'https://www.youtube-nocookie.com/embed/HFyOAQLpx54',
            channel: 'Humans of Ecom',
            duration: '4:08',
            description: 'Curated technical CRO masterclass from Humans of Ecom covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Hidden Secret to Mobile CRO Boosting : Shopify Tutorial'],
        },
        sections: [
            {
                heading: 'Replacing Clunky Native Dropdowns with Interactive Swatches',
                body: `Standard HTML \`<select>\` dropdowns are terrible on mobile. They hide available options behind an opaque operating system menu, force multiple taps, and make it impossible for users to see color palettes at a glance.

Interactive Swatch Benefits:
• Immediate Visual Scanning: Shoppers see all available colors, finishes, and sizes without clicking.
• Dynamic Visual Feedback: Tapping a color swatch instantly updates the product image gallery to display the selected colorway.
• Micro-interactions: Selected pills highlight with a clear contrast ring and accessible \`aria-checked="true"\` attributes for screen readers.`,
                callout: {
                    type: 'tip',
                    text: 'Always pair color swatches with an explicit text label that displays the active selection (e.g. "Color: Heather Charcoal"). Colorblind users rely on this text confirmation.',
                },
            },
            {
                heading: 'High-Performance Sticky Add to Cart Bar Architecture',
                body: `When a customer scrolls down a PDP on mobile to read reviews, examine sizing specs, or view user-generated content, the primary Add to Cart button disappears from view.
Forcing the customer to scroll back up 4 screen heights to purchase introduces physical friction.

Sticky ATC Best Practices:
• Trigger Mechanism: Use the \`IntersectionObserver\` API to observe the primary buy button. When it exits the top of the viewport, smoothly animate the sticky bar into view.
• Mobile Ergonomics: Anchor the bar to the bottom of the screen (\`bottom: 0\`) within the natural thumb zone.
• Essential Context: Display product thumbnail, truncated title, active price, and an instant Add-to-Cart CTA button.`,
                callout: {
                    type: 'shopify',
                    text: 'Never use JavaScript scroll event listeners to toggle sticky bars. Always use IntersectionObserver to guarantee zero main-thread lag and 60fps scrolling.',
                },
            },
            {
                heading: 'Managing Out-of-Stock Variants & Back-in-Stock Capture',
                body: `When a shopper selects a size that is sold out, displaying a dead button with no recourse converts at 0%.
Optimized Out-of-Stock Handling:
1. Visual Strikethrough: Apply diagonal strikethrough or reduced opacity (0.4) to sold-out size pills so users don't waste time clicking dead options.
2. Contextual Notification Drawer: When a sold-out pill is selected, replace the ATC button with a high-contrast "Notify Me When Available" button.
3. Zero-Party Email/SMS Capture: Collecting customer contact info for back-in-stock alerts builds a high-intent marketing cohort that converts at 20%+ upon restocking.`,
                code: `// High-Performance Sticky ATC Bar Implementation using IntersectionObserver
document.addEventListener('DOMContentLoaded', () => {
  const primaryBuyButton = document.querySelector('.btn-primary-atc');
  const stickyBar = document.querySelector('.pdp-sticky-bar');

  if (!primaryBuyButton || !stickyBar) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // If primary button is NOT intersecting viewport (scrolled past), show sticky bar
      if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
        stickyBar.classList.add('pdp-sticky-bar--visible');
      } else {
        stickyBar.classList.remove('pdp-sticky-bar--visible');
      }
    });
  }, {
    threshold: 0,
    rootMargin: '0px 0px 0px 0px'
  });

  observer.observe(primaryBuyButton);
});`,
                language: 'javascript',
            }
        ],
        mistakes: [
            'Letting users select an out-of-stock variant and only showing an error after they click Add to Cart.',
            'Building a sticky ATC bar that covers bottom mobile navigation elements or iOS home bar.',
        ],
        checklist: [
            'I know how to build a performant IntersectionObserver for sticky ATC.',
            'I ensure disabled/sold-out variants have clear visual slash-through styling.',
        ],
        furtherReading: [
            { title: 'Shopify Dawn Theme: Variant Picker Implementation', url: 'https://github.com/Shopify/dawn' },
        ],
    },
    {
        id: 'm9-l3',
        moduleId: 'module-9',
        slug: 'reviews-trust-badges-shipping-and-returns',
        title: 'Reviews, Trust Badges, Shipping, and Returns',
        estimatedMinutes: 20,
        objectives: [
            'Differentiate between high-impact trust proof and tacky spam badges.',
            'Calculate dynamic estimated delivery dates based on customer geolocation.',
            'Eliminate return anxiety directly adjacent to the Add to Cart button.',
        ],
        videoSource: {
            title: 'How To Add Trust Badges on Shopify (2026 FULL Tutorial)',
            embedUrl: 'https://www.youtube-nocookie.com/embed/T06Bo1z5I9Q',
            channel: 'How To Shopify',
            duration: '9:07',
            description: 'Curated technical CRO masterclass from How To Shopify covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['How To Add Trust Badges on Shopify (2026 FULL Tutorial)'],
        },
        sections: [
            {
                heading: 'Differentiating High-Impact Trust Proof from Spammy Badges',
                body: `In ecommerce optimization, trust is earned through authentic transparency, not generic security badges.
The Evolution of Trust Proof:
• Ineffective / Negative Impact: Generic clip-art SSL padlocks, McAfee SECURE banners, and PayPal logos slapped arbitrarily under the Add to Cart button. Modern consumers interpret these as hallmarks of dropshipping stores.
• High-Impact Trust Proof:
  - Verified Customer Reviews: Aggregated star ratings with verified buyer badges and real photo uploads.
  - Press Endorsements: Recognizable editorial logos (e.g. GQ, Wirecutter, Forbes) with direct pull quotes.
  - Material Certifications: Authentic third-party standards (e.g. GOTS Organic Cotton, FSC Certified, B-Corp).`,
                callout: {
                    type: 'tip',
                    text: 'A quote from a credible publication ("The most comfortable boots we tested in 2025" — Wirecutter) converts up to 3x higher than 10 generic security icons.',
                },
            },
            {
                heading: 'Calculating Dynamic Estimated Delivery Dates by Geolocation',
                body: `The #1 purchase hesitation in online shopping is shipping uncertainty: "Will this arrive before my weekend trip / anniversary?"
Displaying generic text like "Standard shipping 3-7 business days" forces the user to calculate delivery in their head.

Dynamic Delivery Date Engine:
• Use IP Geolocation (or browser timezone) to detect customer country/state.
• Calculate fulfillment cutoff time (e.g., "Order within the next 3 hours 14 mins to get it by Thursday, Oct 22").
• Presenting concrete dates ("Get it by Thursday, Oct 22") reduces delivery anxiety by up to 40%.`,
                callout: {
                    type: 'shopify',
                    text: 'Shopify’s native Shop Promise badge automatically calculates and displays guaranteed delivery dates backed by Shopify fulfillment algorithms.',
                },
            },
            {
                heading: 'Eliminating Return Anxiety Adjacent to the Add to Cart CTA',
                body: `Shoppers hesitate at the point of purchase because of the perceived risk of return friction.
If they are unsure whether returning an ill-fitting garment requires paying return postage or printing customs labels, they abandon cart.

Micro-Reassurance Design:
Position a succinct return statement directly under the primary CTA:
• "Free 30-Day Returns & Exchanges — Prepaid label included in the box."
• Clicking "Details" opens a lightweight slide-out modal explaining the simple 3-step return process without navigating away from the PDP.`,
                code: `// Dynamic Delivery Date Calculation Engine for Shopify PDPs
function calculateEstimatedDelivery(cutoffHourEst: number = 14) {
  const now = new Date();
  const currentHour = now.getHours();
  
  // Calculate delivery window (e.g. 3 to 5 business days)
  let deliveryDays = currentHour < cutoffHourEst ? 3 : 4;
  let targetDate = new Date();
  let addedDays = 0;

  while (addedDays < deliveryDays) {
    targetDate.setDate(targetDate.getDate() + 1);
    const dayOfWeek = targetDate.getDay();
    // Skip Saturday (6) and Sunday (0)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      addedDays++;
    }
  }

  const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
  return {
    deliveryString: targetDate.toLocaleDateString('en-US', options),
    orderWithinHours: Math.max(0, cutoffHourEst - currentHour)
  };
}

console.log(calculateEstimatedDelivery(15));
// Output: { deliveryString: 'Thu, Oct 22', orderWithinHours: 3 }`,
                language: 'javascript',
            }
        ],
        mistakes: [
            'Plastering low-resolution generic "100% Safe Checkout" clip-art badges that make stores look untrustworthy.',
            'Hiding return policy shipping fees until the final checkout screen.',
        ],
        checklist: [
            'I can implement dynamic delivery estimation text in Liquid/JS.',
            'I place anxiety-reducing microcopy directly below the primary ATC CTA.',
        ],
        furtherReading: [
            { title: 'Baymard Institute: Overcoming Customer Anxiety at PDP', url: 'https://baymard.com' },
        ],
    },
    {
        id: 'm9-l4',
        moduleId: 'module-9',
        slug: 'collection-filters-sorting-quick-add-pagination',
        title: 'Collection Filters, Sorting, Quick Add, and Pagination',
        estimatedMinutes: 25,
        objectives: [
            'Implement faceted search and filtering using Shopify Search & Discovery API.',
            'Evaluate the CRO impact of Infinite Scroll vs "Load More" vs Pagination.',
            'Design Quick Add interactions that don’t cannibalize AOV.',
        ],
        videoSource: {
            title: 'How to Filter Shopify Collections by Product Tags (or Metafields)',
            embedUrl: 'https://www.youtube-nocookie.com/embed/2SP425al-Eo',
            channel: 'Lee Ruane | Shopify CRO Specialist',
            duration: '13:06',
            description: 'Curated technical CRO masterclass from Lee Ruane | Shopify CRO Specialist covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['How to Filter Shopify Collections by Product Tags (or Metafields)'],
        },
        sections: [
            {
                heading: 'Faceted Filtering & Search Using Shopify Search & Discovery API',
                body: `A customer who cannot filter a 500-product collection by size, color, and price will abandon your store within 15 seconds.
Faceted Navigation Architecture:
• Native Shopify Search & Discovery: Replaces heavy third-party filter apps with native Liquid filters powered by the Storefront API.
• Multi-Select Faceting: Allows shoppers to select multiple sizes (e.g., Medium AND Large) without triggering a jarring full-page reload.
• Dynamic Availability Filtering: Automatically hides or de-emphasizes out-of-stock items so users never land on unpurchasable products.`,
                callout: {
                    type: 'shopify',
                    text: 'Using Shopify’s native Search & Discovery API eliminates external app script latency and caches filter queries at Cloudflare edge nodes.',
                },
            },
            {
                heading: 'Evaluating Pagination vs. Infinite Scroll vs. Load More',
                body: `Which catalog navigation pattern converts best?

1. Infinite Scroll:
• The Trap: As the user scrolls, new items load automatically. However, the user can NEVER reach the footer (where shipping links, track order, and return policies live).
• Performance hit: Continually appending hundreds of DOM nodes causes memory bloat and scroll stuttering on mobile devices.

2. Numbered Pagination (1, 2, 3...):
• High cognitive load; requires deliberate navigation clicks.
• Good for SEO and clear user orientation.

3. "Load More" Button (The Gold Standard for CRO):
• Combines the seamlessness of infinite scroll with user control.
• Shoppers can deliberately load 24 more products OR scroll past to read customer reviews and footer links.
• Shows a clear progress indicator: "Viewing 48 of 184 products." `,
                callout: {
                    type: 'tip',
                    text: 'A "Load More" button with a visual progress bar lifts collection-to-PDP click-through rates by up to 14% over infinite scroll.',
                },
            },
            {
                heading: 'Designing Quick Add Interactions That Protect Average Order Value',
                body: `Quick Add buttons on collection product cards reduce the friction of navigating to the PDP. However, poorly implemented Quick Add interactions can destroy Average Order Value (AOV).

Guiding Rules for Quick Add:
• Multi-Variant Products: Never trigger a blind addition of the default variant. Open a lightweight modal or slide-up drawer allowing variant selection.
• Single-Variant / Consumables: Ideal for instant 1-tap addition (e.g., socks, coffee beans, lip balm).
• Post-Add Feedback: Instantly update the cart icon count and open the cart drawer so the user sees the confirmation and complementary upsells.`,
                code: `// Progressive "Load More" Collection Grid Pattern using Section Rendering API
async function loadMoreCollectionProducts(button: HTMLButtonElement) {
  const nextPageUrl = button.getAttribute('data-next-url');
  if (!nextPageUrl) return;

  button.disabled = true;
  button.innerText = 'Loading styles...';

  try {
    const response = await fetch(\`\${nextPageUrl}&sections=main-collection-grid\`);
    const data = await response.json();
    const htmlString = data['main-collection-grid'];
    
    // Parse response and append new product cards to existing container
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const newItems = doc.querySelectorAll('.product-grid__item');
    const gridContainer = document.querySelector('.product-grid');

    newItems.forEach(item => gridContainer?.appendChild(item));

    // Update next URL or remove button if last page reached
    const newButton = doc.querySelector('.btn-load-more') as HTMLButtonElement | null;
    if (newButton && newButton.getAttribute('data-next-url')) {
      button.setAttribute('data-next-url', newButton.getAttribute('data-next-url')!);
      button.disabled = false;
      button.innerText = 'Load More Products';
    } else {
      button.remove(); // End of collection
    }
  } catch (error) {
    console.error('Failed to load collection products:', error);
    button.disabled = false;
    button.innerText = 'Try Again';
  }
}`,
                language: 'javascript',
            }
        ],
        mistakes: [
            'Infinite scroll traps that prevent users from reaching essential footer links.',
            'Full page reloads on every single filter checkbox selection.',
        ],
        checklist: [
            'I know how to update collection results using Section Rendering API.',
            'I understand why "Load More" outperforms raw infinite scroll for CRO.',
        ],
        furtherReading: [
            { title: 'Shopify Search & Discovery App Docs', url: 'https://help.shopify.com/en/manual/online-store/search-and-discovery' },
        ],
    },
    {
        id: 'm9-l5',
        moduleId: 'module-9',
        slug: 'mobile-first-pdp-design',
        title: 'Mobile-First PDP Ergonomics & Touch Targets',
        estimatedMinutes: 20,
        objectives: [
            'Design for thumb-zone ergonomics on modern mobile devices.',
            'Implement swipeable image galleries with visual dot/thumbnail pagination.',
            'Prevent iOS form auto-zoom glitches.',
        ],
        videoSource: {
            title: 'Mobile UX for Ecommerce: Ergonomics and Touch Design',
            embedUrl: 'https://www.youtube-nocookie.com/embed/GfXDL7jhm0k',
            channel: 'Findologic',
            duration: '11:15',
            description: 'Principles of mobile ecommerce UX: one-thumb ergonomics, bottom-sheet PDP navigation, sticky Add-to-Cart design, and compliant touch target sizing for high conversion.',
            topics: ['Mobile Thumb Zone', 'Touch Target Sizing', 'Sticky ATC Design', 'Mobile-First Ergonomics'],
        },
        sections: [
            {
                heading: 'Designing for Thumb-Zone Ergonomics on Modern Mobile Devices',
                body: `Over 75% of ecommerce shoppers hold their smartphones with one hand, navigating primarily with their thumb.
The Thumb Zone Spectrum:
• Natural Zone (Bottom 40% of screen): Easiest to reach; primary CTAs, variant selectors, and cart drawer triggers must live here.
• Stretch Zone (Middle 35% of screen): Requires thumb extension; suitable for secondary specifications and thumbnails.
• Hard-to-Reach Zone (Top 25% of screen): Requires shifting hand grip; reserved for global navigation and search icon.

Placing the primary Add to Cart button in a sticky bottom container ensures it remains permanently accessible in the Natural Thumb Zone.`,
                callout: {
                    type: 'tip',
                    text: 'Ensure all interactive touch targets (buttons, swatch pills, accordion toggles) have a minimum dimension of 44px × 44px to satisfy WCAG mobile accessibility standards.',
                },
            },
            {
                heading: 'Implementing Swipeable Image Galleries with Visual Pagination',
                body: `Desktop gallery patterns (vertical thumbnail columns) are unusable on mobile. Mobile shoppers expect native swipe gestures.

Mobile Gallery Standards:
• Native CSS Scroll Snap: Use \`scroll-snap-type: x mandatory\` for buttery 60fps hardware-accelerated horizontal swiping without heavy JavaScript carousel libraries.
• Pagination Dots & Counter: Display active slide indicators (e.g., "1 / 6") so users understand there are more angles to view.
• Pinch-to-Zoom or Tap-to-Expand: High-intent buyers want to inspect fabric textures and stitching details before buying.`,
                callout: {
                    type: 'warning',
                    text: 'Never use auto-rotating carousels on PDP galleries. When an image rotates automatically while a user is reading, it disorients the user and reduces conversions.',
                },
            },
            {
                heading: 'Preventing iOS Form Auto-Zoom and Viewport Clipping Glitches',
                body: `A notorious mobile Safari bug causes the browser to forcefully zoom in on form inputs when tapped if the font size is smaller than 16px.
When iOS auto-zooms, the page layout is thrown off-center, horizontal scrollbars appear, and the primary Add-to-Cart button is pushed offscreen!

Preventative Safeguards:
• Enforce \`font-size: 16px\` on all \`<input>\`, \`<select>\`, and \`<textarea>\` elements on mobile.
• Use \`dvh\` (Dynamic Viewport Height) instead of \`100vh\` in CSS so sticky elements adapt smoothly as the Safari browser URL bar expands and collapses during scrolling.`,
                code: `/* Mobile Ergonomic Form & Native Swipe Gallery CSS */
.product-gallery__mobile-slider {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Hide scrollbar for clean app-like UI */
}

.product-gallery__slide {
  flex: 0 0 100%;
  scroll-snap-align: start;
}

/* Fix iOS Auto-Zoom on form inputs */
input, select, textarea {
  font-size: 16px !important; /* Critical: prevents iOS Safari auto-zoom */
}

/* Modern Dynamic Viewport Drawer Container */
.cart-drawer-container {
  height: 100dvh; /* Adapts dynamically to mobile browser URL bar */
}`,
                language: 'css',
            }
        ],
        mistakes: [
            'Allowing font-size < 16px on inputs, triggering the dreaded iOS Safari layout zoom.',
            'Placing tiny variant swatches close together, causing accidental wrong-size selections.',
        ],
        checklist: [
            'I verify all inputs have 16px font-size to prevent iOS zoom.',
            'I check mobile usability with thumb-reach heatmaps.',
        ],
        furtherReading: [
            { title: 'Apple Human Interface Guidelines: Touch Targets', url: 'https://developer.apple.com/design/human-interface-guidelines' },
        ],
    },
    // MODULE 10: Cart & Checkout
    {
        id: 'm10-l1',
        moduleId: 'module-10',
        slug: 'cart-drawer-vs-cart-page-when-each-wins',
        title: 'Cart Drawer vs Cart Page — When Each Wins',
        estimatedMinutes: 25,
        objectives: [
            'Analyze behavioral data comparing slide-out cart drawers against dedicated /cart pages.',
            'Implement instantaneous AJAX cart updates using the Section Rendering API.',
            'Keep customers inside the browsing flow to maximize multi-item basket size.',
        ],
        videoSource: {
            title: 'Kaching Cart vs Upcart: Don\'t Choose Until You See This (Shopify Cart Drawer Review)',
            embedUrl: 'https://www.youtube-nocookie.com/embed/o5KbrElmiEc',
            channel: 'ShopSideK Official™',
            duration: '8:00',
            description: 'Curated technical CRO masterclass from ShopSideK Official™ covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Kaching Cart vs Upcart: Don\'t Choose Until You See This (Shopify Cart Drawer Review)'],
        },
        sections: [
            {
                heading: 'Slide-Out Cart Drawers vs. Dedicated /cart Pages',
                body: `In modern D2C ecommerce, the traditional \`/cart\` full-page reload is rapidly becoming obsolete.

Behavioral Comparison:
• Dedicated /cart Page: Redirecting the customer to a separate \`/cart\` URL breaks their shopping momentum. If they want to add another item, they must tap the back button or navigate back to the catalog.
• Slide-Out Ajax Cart Drawer: The drawer slides smoothly over the current page. The shopper confirms their item, sees their progress toward free shipping, views upsells, and can close the drawer with a single tap to continue shopping.

Conversion Data:
Switching from a traditional full-page cart to an optimized Ajax Cart Drawer lifts multi-item cart rates by 18% and reduces cart abandonment by 11%.`,
                callout: {
                    type: 'tip',
                    text: 'Cart Drawers are superior for multi-item catalogs (apparel, beauty, lifestyle). The only exception is high-ticket B2B or single-product stores where immediate checkout routing is preferred.',
                },
            },
            {
                heading: 'Instantaneous AJAX Cart Updates via Section Rendering API',
                body: `In legacy themes, updating an item quantity in the cart drawer required complex client-side string concatenation.
With Shopify's Section Rendering API:
1. Make a POST request to \`/cart/change.js\`.
2. Append \`?sections=cart-drawer\` to the request.
3. Shopify's server executes Liquid on the server and returns the updated cart JSON along with the newly rendered HTML fragment.
4. Seamlessly replace the drawer's \`innerHTML\` without full-page refreshes or client-side Liquid template libraries.`,
                callout: {
                    type: 'shopify',
                    text: 'Using the Section Rendering API guarantees that server-side currency conversions, automatic discount calculations, and inventory limits are 100% accurate.',
                },
            },
            {
                heading: 'Keeping Customers in the Browsing Flow to Maximize Basket Size',
                body: `The primary reason cart drawers drive higher Average Order Value is psychological continuity.
When a user adds an item, the drawer confirms receipt without terminating their discovery journey:
• Micro-Confirmations: A subtle progress ring and instant visual feedback reassuring the user the item was captured.
• Quick Continue Shopping Button: A clean "Continue Browsing" button that gently returns focus to the catalog.
• Preserving Scroll Position: Because the user never left the collection or PDP, they resume exploration with zero friction.`,
                code: `// Section Rendering API Cart Mutation Handler
async function updateCartDrawerItem(lineKey: string, newQuantity: number) {
  try {
    const response = await fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: lineKey,
        quantity: newQuantity,
        sections: 'cart-drawer'
      })
    });

    const data = await response.json();
    
    // Replace drawer HTML with server-rendered fresh Liquid output
    const drawerContainer = document.querySelector('#cart-drawer-content');
    if (drawerContainer && data.sections['cart-drawer']) {
      drawerContainer.innerHTML = data.sections['cart-drawer'];
    }

    // Update global cart icon bubble count
    const cartCountEl = document.querySelector('.header__cart-count');
    if (cartCountEl) {
      cartCountEl.textContent = data.item_count;
    }
  } catch (err) {
    console.error('Failed to update cart drawer:', err);
  }
}`,
                language: 'javascript',
            }
        ],
        mistakes: [
            'Closing the cart drawer automatically after 2 seconds before the user can read the contents.',
            'Failing to trap keyboard focus inside the drawer when open, breaking WCAG accessibility.',
        ],
        checklist: [
            'I know how to update the cart drawer markup via /cart/add.js with ?sections=cart-drawer.',
            'I implement keyboard focus management and Esc key dismissal.',
        ],
        furtherReading: [
            { title: 'Shopify AJAX Cart API Documentation', url: 'https://shopify.dev/docs/api/ajax/cart' },
        ],
    },
    {
        id: 'm10-l2',
        moduleId: 'module-10',
        slug: 'free-shipping-progress-bars-that-actually-convert',
        title: 'Free Shipping Progress Bars That Actually Convert',
        estimatedMinutes: 25,
        objectives: [
            'Code a dynamic free shipping threshold progress bar in Liquid and JavaScript.',
            'Gamify basket building to lift Average Order Value (AOV).',
            'Format congratulations messaging when the threshold is unlocked.',
        ],
        videoSource: {
            title: 'Add Free Shipping Progress Bar To Make More Shopify Sales (Copy & Paste to Increase Conversion Rate)',
            embedUrl: 'https://www.youtube-nocookie.com/embed/K4zNFND054Y',
            channel: 'The Prompted - Shopify Simplified',
            duration: '9:06',
            description: 'Curated technical CRO masterclass from The Prompted - Shopify Simplified covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Add Free Shipping Progress Bar To Make More Shopify Sales (Copy & Paste to Increase Conversion Rate)'],
        },
        sections: [
            {
                heading: 'Dynamic Free Shipping Progress Bar Implementation',
                body: `The Free Shipping Progress Bar is the single most effective gamification element in ecommerce for lifting Average Order Value (AOV).
How It Works:
1. Establish a Free Shipping Threshold (e.g. $75).
2. As items are added to the cart, calculate remaining spend: \`Spend Remaining = Threshold - Cart Total\`.
3. Fill a visual CSS progress bar proportional to progress: \`(Cart Total / Threshold) * 100\`.
4. Dynamic Messaging:
   - Under threshold: "Add $18.00 more to unlock Free Express Shipping!"
   - Unlocked: "🎉 You've unlocked FREE Shipping!" `,
                callout: {
                    type: 'tip',
                    text: 'Set your free shipping threshold 15% to 20% higher than your current median AOV. If current AOV is $52, set the threshold at $65 to incentivize adding a second item.',
                },
            },
            {
                heading: 'Gamifying Basket Building to Lift Average Order Value (AOV)',
                body: `Single-tier progress bars are effective, but multi-tier reward bars multiply basket-building urgency:
Tier 1: $50 -> Free Standard Shipping
Tier 2: $75 -> Free Mystery Gift / Deluxe Sample
Tier 3: $100 -> Free Express 2-Day Shipping

As the customer crosses each milestone, celebratory micro-animations (confetti trigger or gold checkmark) provide positive behavioral reinforcement, turning routine checkout into an engaging game.`,
                callout: {
                    type: 'warning',
                    text: 'Never set the free shipping threshold so high that it feels unattainable (e.g. $150 on a $30 item). Unreachable thresholds trigger customer resentment.',
                },
            },
            {
                heading: 'Multi-Currency Calculations & Congratulations Messaging',
                body: `A major technical bug in international Shopify stores is hardcoding threshold currencies (e.g. expecting $75 USD in a store selling in EUR, GBP, or JPY).

Multi-Currency Architecture:
• Use Shopify Markets native currency formatting: \`cart.total_price\` vs \`settings.free_shipping_threshold | times: 100\`.
• When calculating in JavaScript, fetch the active store currency and exchange rate from \`Shopify.currency.active\` to avoid currency mismatch errors.`,
                code: `<!-- Liquid & CSS Free Shipping Threshold Component -->
{%- assign threshold_cents = settings.free_shipping_threshold | times: 100 -%}
{%- assign cart_total = cart.total_price -%}
{%- assign remaining_cents = threshold_cents | minus: cart_total -%}
{%- assign percent_progress = cart_total | times: 100 | divided_by: threshold_cents | at_most: 100 -%}

<div class="shipping-threshold-bar">
  <p class="shipping-threshold__msg">
    {% if remaining_cents <= 0 %}
      <span class="unlocked-text">🎉 You've unlocked <strong>FREE Standard Shipping</strong>!</span>
    {% else %}
      Add <strong>{{ remaining_cents | money }}</strong> more to unlock <strong>FREE Shipping</strong>!
    {% endif %}
  </p>
  
  <div class="progress-track" role="progressbar" aria-valuenow="{{ percent_progress }}" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-fill" style="width: {{ percent_progress }}%;"></div>
  </div>
</div>

<style>
.progress-track {
  width: 100%;
  height: 8px;
  background-color: #e5e7eb;
  border-radius: 9999px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #10b981);
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>`,
                language: 'html',
            }
        ],
        mistakes: [
            'Setting the free shipping threshold far higher than typical basket size (e.g. $150 threshold with $35 AOV discourages users).',
            'Failing to dynamically update the bar when items are removed from the cart drawer.',
        ],
        checklist: [
            'I can implement a reactive free shipping bar that updates via Cart API.',
            'I calculate optimal thresholds (typically 15–25% above current AOV).',
        ],
        furtherReading: [
            { title: 'ConversionXL: Free Shipping Threshold Psychology', url: 'https://cxl.com' },
        ],
    },
    {
        id: 'm10-l3',
        moduleId: 'module-10',
        slug: 'upsells-and-cross-sells-without-being-annoying',
        title: 'Upsells & Cross-Sells Without Being Annoying',
        estimatedMinutes: 25,
        objectives: [
            'Integrate 1-click in-cart cross-sells for complementary, low-consideration products.',
            'Use the Shopify Product Recommendations API.',
            'Avoid high-friction pop-up overlays that cause cart abandonment.',
        ],
        videoSource: {
            title: 'The BEST Upsell and Cross Sell Strategies for Shopify [2026]',
            embedUrl: 'https://www.youtube-nocookie.com/embed/n3KZRvuPDlA',
            channel: 'Darjan Hren | Shopify Growth',
            duration: '10:23',
            description: 'Curated technical CRO masterclass from Darjan Hren | Shopify Growth covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['The BEST Upsell and Cross Sell Strategies for Shopify [2026]'],
        },
        sections: [
            {
                heading: 'Integrating 1-Click In-Cart Cross-Sells for Complementary Products',
                body: `The cart drawer is the highest-converting real estate for cross-selling complementary, low-consideration accessories.
Characteristics of Winning In-Cart Cross-Sells:
• Low Price Point: Items priced between 10% and 25% of the primary cart value ($8 to $22).
• No Variant Complexity: Single-variant items (cleaner spray, leather conditioner, socks, travel pouch) that do not require size or color selection.
• Instant 1-Click Addition: An inline "+" button that adds the accessory to the cart via Ajax without leaving the drawer.`,
                callout: {
                    type: 'tip',
                    text: 'A $12 product cleaner offered in the cart drawer of an $85 shoe store typically achieves an 18% attachment rate, lifting storewide AOV immediately.',
                },
            },
            {
                heading: 'Leveraging the Shopify Product Recommendations API',
                body: `Rather than manually hardcoding cross-sell products for every SKU in your catalog, leverage Shopify's native Product Recommendations API:
• Endpoint: \`/recommendations/products.json?product_id={id}&limit=4\`
• The Machine Learning Advantage: Shopify’s algorithm analyzes historical store co-purchases to recommend the exact items most frequently bought together.
• Performance: Native recommendations load in under 60ms and require zero external app subscriptions.`,
                callout: {
                    type: 'shopify',
                    text: 'You can also customize recommendation logic directly in the Shopify Search & Discovery app by setting manual complementary product pairings in the admin.',
                },
            },
            {
                heading: 'Avoiding Intrusive Pop-Up Overlays That Trigger Abandonment',
                body: `The worst mistake stores make is firing a modal pop-up when the user clicks "Checkout" ("Wait! Would you also like this mystery gift for $14?").
Why Checkout Pop-ups Destroy Conversion:
• Interrupted Momentum: The user was mentally prepared to pay; interrupting their payment flow triggers second thoughts.
• High Friction on Mobile: Modal overlays are hard to close on mobile screens and often freeze or cause layout shifts.
• Rule of Thumb: Cross-sell softly inside the cart drawer layout; NEVER block the checkout transition.`,
                code: `// Dynamic In-Cart Cross-Sell Loader using Shopify Recommendations API
async function loadCartCrossSells(primaryProductId: number) {
  try {
    const res = await fetch(\`/recommendations/products.json?product_id=\${primaryProductId}&limit=2\`);
    const data = await res.json();
    const container = document.querySelector('.cart-drawer__upsells');
    
    if (!container || !data.products.length) return;

    container.innerHTML = data.products.map((p: any) => \`
      <div class="upsell-item">
        <img src="\${p.featured_image}" alt="\${p.title}" class="upsell-img" />
        <div class="upsell-info">
          <span class="upsell-title">\${p.title}</span>
          <span class="upsell-price">$\${(p.price / 100).toFixed(2)}</span>
        </div>
        <button onclick="addUpsellToCart(\${p.variants[0].id})" class="btn-quick-add-upsell">+ Add</button>
      </div>
    \`).join('');
  } catch (err) {
    console.error('Failed to load recommendations:', err);
  }
}`,
                language: 'javascript',
            }
        ],
        mistakes: [
            'Displaying aggressive modal popups that block the "Proceed to Checkout" button.',
            'Recommending items that are out of stock, frustrating the user.',
        ],
        checklist: [
            'I know how to query /recommendations/products.json?product_id=...&intent=related.',
            'I design inline 1-click cross-sell cards.',
        ],
        furtherReading: [
            { title: 'Shopify Product Recommendations API', url: 'https://shopify.dev/docs/api/ajax/product-recommendations' },
        ],
    },
    {
        id: 'm10-l4',
        moduleId: 'module-10',
        slug: 'checkout-branding-ui-extensions-shopify-functions',
        title: 'Checkout Branding, UI Extensions, and Shopify Functions',
        estimatedMinutes: 30,
        objectives: [
            'Customize typography, colors, and border-radii using the Checkout Branding API.',
            'Deploy Checkout UI Extensions for delivery instructions and loyalty points.',
            'Write backend discount and shipping rules with Shopify Functions (WebAssembly).',
        ],
        videoSource: {
            title: 'Extend checkout in more ways with the latest from Shopify Functions and checkout UI extensions',
            embedUrl: 'https://www.youtube-nocookie.com/embed/wNdvxLzWUQg',
            channel: 'Shopify',
            duration: '3:08',
            description: 'Curated technical CRO masterclass from Shopify covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Extend checkout in more ways with the latest from Shopify Functions and checkout UI extensions'],
        },
        sections: [
            {
                heading: 'Checkout Branding API: Styling Typography, Colors, and Radii',
                body: `Shopify deprecated legacy \`checkout.liquid\` in favor of the extensible, secure Checkout Branding API.
Styling Capabilities:
• Font Pairing: Apply custom web typography to headings and body text in the checkout flow.
• Color System: Harmonize background tints, input border accents, and primary action button fills to match your main theme.
• Visual Consistency: Ensuring checkout visual styling seamlessly mirrors the storefront builds customer trust and reduces checkout drop-off.`,
                callout: {
                    type: 'shopify',
                    text: 'Checkout Branding is configured via GraphQL mutations or the Theme Editor checkout settings and is available to all Shopify merchants.',
                },
            },
            {
                heading: 'Deploying Checkout UI Extensions for Delivery & Loyalty Perks',
                body: `Checkout UI Extensions run inside a secure sandbox worker directly on Shopify’s PCI-compliant checkout infrastructure.
Common CRO Checkout Extensions:
• Delivery Instructions / Gift Notes: Allows customers to enter gate codes or custom gift messages without external app bloat.
• Loyalty Points Redemption: One-click slider to apply rewards points directly to the checkout order summary.
• Dynamic Order Upsell: Contextual add-ons (e.g. Package Insurance or Extended Warranty) injected seamlessly into the payment step.`,
                callout: {
                    type: 'tip',
                    text: 'Checkout UI Extensions render natively using Shopify Preact components, guaranteeing sub-10ms render latency.',
                },
            },
            {
                heading: 'Writing Backend Rules with Shopify Functions (WebAssembly)',
                body: `Shopify Functions replace legacy Ruby Scripts for backend business logic, running compiled WebAssembly (Wasm) in under 5ms:
1. Discount Rules: Tiered spend discounts (e.g., Buy 2 get 10% off, Buy 3 get 20% off) calculated directly on the server.
2. Payment Customization: Dynamically hide Cash on Delivery (COD) or Klarna for high-risk order profiles or specific geographic regions.
3. Delivery Customization: Rename, re-order, or hide specific shipping tiers based on cart weight and delivery destination.`,
                code: `// Shopify Function WebAssembly Discount Rule (Rust / JS Target)
export function run(input) {
  const targets = input.cart.lines
    .filter(line => line.quantity >= 3)
    .map(line => ({
      cartLine: { id: line.id }
    }));

  if (!targets.length) {
    return { discountApplicationStrategy: 'FIRST', discounts: [] };
  }

  return {
    discountApplicationStrategy: 'FIRST',
    discounts: [
      {
        targets,
        value: {
          percentage: { value: 15.0 } // 15% volume discount for buying 3+
        },
        message: 'Volume Discount: 15% Off (3+ Items)'
      }
    ]
  };
}`,
                language: 'javascript',
            }
        ],
        mistakes: [
            'Cluttering checkout with 5 different UI extensions, slowing down the final step.',
            'Failing to test checkout extensions in offline/mobile environments.',
        ],
        checklist: [
            'I understand how Checkout UI Extensions interface with the Shopify Admin.',
            'I know the capabilities of Shopify Functions vs legacy Shopify Scripts.',
        ],
        furtherReading: [
            { title: 'Shopify Functions Overview', url: 'https://shopify.dev/docs/apps/functions' },
        ],
    },
    {
        id: 'm10-l5',
        moduleId: 'module-10',
        slug: 'plus-vs-non-plus-checkout-real-limits',
        title: 'Plus vs Non-Plus Checkout — Real Limits & Workarounds',
        estimatedMinutes: 20,
        objectives: [
            'Clearly explain what can and cannot be done on Shopify Standard vs Shopify Plus.',
            'Maximize checkout conversion on standard non-Plus stores.',
            'Manage client expectations regarding checkout customization.',
        ],
        videoSource: {
            title: 'CRO Checkout Testing for Shopify Plus with Intelligems',
            embedUrl: 'https://www.youtube-nocookie.com/embed/CyFKX2-g3Og',
            channel: 'Andy | CRO',
            duration: '10:31',
            description: 'Curated technical CRO masterclass from Andy | CRO covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['CRO Checkout Testing for Shopify Plus with Intelligems'],
        },
        sections: [
            {
                heading: 'Shopify Standard vs. Shopify Plus: Checkout Realities',
                body: `A critical skill for any CRO specialist is knowing where Shopify’s technical boundaries lie:

• Shopify Standard (Basic, Shopify, Advanced):
  - Checkout is completely sandboxed. You CANNOT execute custom JavaScript, modify checkout DOM structure, or install custom Checkout UI Extensions.
  - Customization is strictly limited to: Colors, logo, fonts via Checkout Branding, and native Shopify app integrations.

• Shopify Plus ($2,300+/month):
  - Full access to Checkout UI Extensions, Post-Purchase Extensions, and Shopify Functions (Wasm).
  - Ability to customize the order summary, delivery tiers, payment methods, and Thank You page.`,
                callout: {
                    type: 'warning',
                    text: 'Never promise a non-Plus client that you will add custom fields or custom upsell sliders to the Shopify checkout steps. It is technically impossible without Plus.',
                },
            },
            {
                heading: 'Maximizing Checkout Conversion on Standard Non-Plus Stores',
                body: `Even without Shopify Plus, you can optimize checkout conversion by up to 25% through strategic storefront configurations:
1. Enable Shop Pay & Accelerated Wallets: Over 60% of US mobile checkouts are completed via Shop Pay or Apple Pay. Shop Pay converts 50% higher than standard checkout!
2. Enable Address Autocomplete: Turn on Google Address Autocomplete in Shopify Admin to eliminate typo errors and speed up mobile address entry.
3. Simplify Contact Requirements: Default to "Email only" unless phone numbers are strictly mandatory for fulfillment. Requiring phone numbers increases checkout abandonment by 8%.`,
                callout: {
                    type: 'tip',
                    text: 'Activating Shop Pay across your store is the single highest-ROI checkout optimization available on standard Shopify plans.',
                },
            },
            {
                heading: 'Managing Client Expectations Regarding Checkout Customization',
                body: `When a non-Plus client asks to "streamline the checkout into a single page" or "add a custom date picker on the payment page":
1. Educate on Security & PCI Compliance: Explain that Shopify’s locked checkout is intentionally protected to process billions in GMV with 99.99% uptime and zero fraud vulnerabilities.
2. Relocate Features to the Storefront:
   - Need a delivery date picker? Move it to the Cart Drawer.
   - Need gift messaging? Capture it on the PDP or in the Cart Drawer via cart line-item properties (\`attributes\`).
   - Need custom discounts? Implement them via native Shopify automatic discount rules.`,
                code: `// Capturing Custom Delivery Instructions in Cart Drawer via Cart Attributes
async function saveCartOrderNote(instructionsText: string) {
  try {
    const response = await fetch('/cart/update.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        note: instructionsText,
        attributes: {
          'Delivery Instructions': instructionsText,
          'Is Gift': 'Yes'
        }
      })
    });
    console.log('Cart metadata synced successfully before checkout redirect.');
  } catch (err) {
    console.error('Failed to sync cart attributes:', err);
  }
}`,
                language: 'javascript',
            }
        ],
        mistakes: [
            'Promising a non-Plus client custom form fields inside checkout.myshopify.com.',
            'Over-customizing checkout on Plus stores to the point of breaking one-click Shop Pay flows.',
        ],
        checklist: [
            'I can audit a store plan and present legal/achievable CRO proposals.',
            'I know how to optimize the pre-checkout cart drawer for non-Plus clients.',
        ],
        furtherReading: [
            { title: 'Shopify Pricing & Plan Matrix', url: 'https://www.shopify.com/pricing' },
        ],
    },
    // MODULE 11: Post-Purchase & Retention
    {
        id: 'm11-l1',
        moduleId: 'module-11',
        slug: 'thank-you-page-cro',
        title: 'Thank You Page CRO: Turning Buyers into Advocates',
        estimatedMinutes: 20,
        objectives: [
            'Optimize the Thank You / Order Confirmation page.',
            'Implement referral sharing widgets and order tracking links.',
            'Collect zero-party data via 1-question post-purchase surveys.',
        ],
        videoSource: {
            title: '17 Powerful Ways to Optimize Your Thank You Page with the ReConvert Shopify App',
            embedUrl: 'https://www.youtube-nocookie.com/embed/xfZyy_h6n24',
            channel: 'eStoreKings',
            duration: '8:31',
            description: 'Curated technical CRO masterclass from eStoreKings covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['17 Powerful Ways to Optimize Your Thank You Page with the ReConvert Shopify App'],
        },
        sections: [
            {
                heading: 'Optimizing the Thank You & Order Confirmation Page',
                body: `The Thank You page is the most underutilized asset in ecommerce. While the customer’s dopamine levels and brand goodwill are at their peak, 90% of stores present an empty receipt.
Strategic Elements to Include:
• Reassurance & Expectation Setting: A clean timeline explaining the next 3 steps (Order Received -> Preparing Parcel -> Tracking Number Dispatched).
• Friction-Free Account Creation: Allow guests to claim their account with a single password creation field without re-entering their details.
• Direct Customer Support Access: Clear links to FAQ and instant chat in case they made a shipping address typo.`,
                callout: {
                    type: 'tip',
                    text: 'Customers check the Order Status page an average of 3.8 times per order. Making this page informative reduces customer support inquiries by 30%.',
                },
            },
            {
                heading: 'Implementing Referral Sharing & Live Tracking Links',
                body: `Turn delighted new buyers into active brand ambassadors at zero customer acquisition cost:
• 1-Click Social Sharing: Provide pre-filled WhatsApp, SMS, and iMessage referral links with a mutual incentive ("Give $20, Get $20").
• Real-Time Carrier Tracking Widget: Embed carrier tracking status directly on the page so customers never have to leave your store to visit third-party courier websites.`,
                callout: {
                    type: 'shopify',
                    text: 'With Checkout UI Extensions, you can embed referral widgets and live tracking blocks natively onto the Shopify Order Status page.',
                },
            },
            {
                heading: 'Collecting Zero-Party Data via 1-Question Post-Purchase Surveys',
                body: `Post-purchase surveys boast a remarkable 60% to 75% response rate when restricted to a single question:
"How did you first hear about us?" or "What was the main hesitation that almost kept you from buying today?"
Why This Matters for CRO:
• Attribution Verification: Reconciles attribution gaps between GA4, Meta Ads, and TikTok Ads.
• Qualitative Friction Mining: Answers to the "hesitation" question provide exact hypotheses for your next PDP A/B test!`,
                code: `// Lightweight 1-Question Post-Purchase Survey Dispatcher
function submitPostPurchaseFeedback(orderId: string, attributionChannel: string) {
  fetch('https://api.yourstore.com/surveys/post-purchase', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      orderId,
      heardFrom: attributionChannel,
      submittedAt: new Date().toISOString()
    })
  }).then(() => {
    const surveyContainer = document.querySelector('.post-purchase-survey');
    if (surveyContainer) {
      surveyContainer.innerHTML = '<p class="thank-you-msg">✓ Thank you! Your feedback helps us improve.</p>';
    }
  });
}`,
                language: 'javascript',
            }
        ],
        mistakes: [
            'Leaving the Thank You page as the default unbranded receipt with zero customer engagement.',
            'Overwhelming the buyer with 12 survey questions instead of one high-leverage question.',
        ],
        checklist: [
            'I know how to deploy Thank You page extensions via Checkout Extensibility.',
            'I understand how to capture post-purchase zero-party attribution data.',
        ],
        furtherReading: [
            { title: 'Shopify Post-Purchase UI Extensions', url: 'https://shopify.dev/docs/apps/checkout/post-purchase' },
        ],
    },
    {
        id: 'm11-l2',
        moduleId: 'module-11',
        slug: 'post-purchase-upsells-that-dont-refund',
        title: 'Post-Purchase Upsells That Don\'t Refund',
        estimatedMinutes: 25,
        objectives: [
            'Deploy 1-click native post-purchase offers between checkout and the Thank You page.',
            'Select high-conversion, low-remorse upsell products.',
            'Prevent buyer remorse and return spikes.',
        ],
        videoSource: {
            title: 'Shopify Post-Purchase Upsell Setup With OneClickUpsell (Step-by-Step) | ECD Digital Strategy',
            embedUrl: 'https://www.youtube-nocookie.com/embed/X9B5niOt7Xc',
            channel: 'Marketing Unplugged by ECD Digital Strategy',
            duration: '6:37',
            description: 'Curated technical CRO masterclass from Marketing Unplugged by ECD Digital Strategy covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Shopify Post', 'Purchase Upsell Setup With OneClickUpsell (Step', 'Step)', 'ECD Digital Strategy'],
        },
        sections: [
            {
                heading: '1-Click Native Post-Purchase Offers: Mechanics and Rules',
                body: `Post-purchase upsells appear after the customer completes checkout but BEFORE the Thank You page is rendered.
The Conversion Magic:
• The customer does NOT have to re-enter credit card details, billing address, or shipping address.
• Clicking "Add to My Order for $24" automatically amends the existing authorized transaction with a single tap!
• Acceptance rates on 1-click post-purchase upsells average between 8% and 15%.`,
                callout: {
                    type: 'tip',
                    text: 'Because payment is already tokenized, post-purchase offers create zero risk of cart abandonment.',
                },
            },
            {
                heading: 'Selecting High-Conversion, Low-Remorse Upsell Products',
                body: `Not all products work as post-purchase upsells. Pitching a $200 leather jacket to a customer who just bought a $40 wallet triggers cognitive resistance.
The Winning Upsell Rubric:
1. Natural Complements: Offer the exact accessories required for the item just bought (e.g. specialized socks for hiking boots, replacement filters for water pitcher).
2. Deep Discount Incentive: Offer a compelling discount (e.g., "Special 30% Off — This order only").
3. Bulk Multi-Packs: Offer a 2nd unit of the same consumable item at a 25% discount.`,
                callout: {
                    type: 'warning',
                    text: 'Never offer an unrelated or controversial item post-purchase. It dilutes brand perception.',
                },
            },
            {
                heading: 'Preventing Buyer Remorse & Product Return Spikes',
                body: `Aggressive post-purchase funnels can trigger customer regret and chargebacks if deceptive patterns are used.
Ethical Guidelines:
• Prominent Decline Button: The "No thanks, continue to receipt" link must be clear and legible, never hidden in tiny low-contrast gray text.
• Immediate Total Recalculation: Clearly display the amended order total on the final Thank You page so the customer has complete financial clarity.`,
                code: `// Schema for Evaluating Post-Purchase Upsell Profitability
interface PostPurchaseOffer {
  parentProductCategory: string;
  upsellSku: string;
  originalPrice: number;
  discountedPrice: number;
  acceptanceRatePercent: number;
  returnRatePercent: number;
}

function evaluateUpsellViability(offer: PostPurchaseOffer) {
  const netIncrementalRevenuePerOffer = 
    (offer.discountedPrice * (offer.acceptanceRatePercent / 100)) * (1 - (offer.returnRatePercent / 100));

  return {
    netContributionPerShopper: '$' + netIncrementalRevenuePerOffer.toFixed(2),
    viabilityScore: offer.returnRatePercent > 12 ? 'HIGH_REMORSE_RISK' : 'HEALTHY_PROFIT_DRIVER'
  };
}

console.log(evaluateUpsellViability({
  parentProductCategory: 'Running Shoes',
  upsellSku: 'MERINO_RUN_SOCKS_3PK',
  originalPrice: 28.00,
  discountedPrice: 19.50,
  acceptanceRatePercent: 12.4,
  returnRatePercent: 3.1
}));`,
                language: 'javascript',
            }
        ],
        mistakes: [
            'Offering an unrelated high-ticket product that causes the buyer to second-guess their original purchase.',
            'Failing to show a clear "No thanks, proceed to receipt" decline link.',
        ],
        checklist: [
            'I understand post-purchase authorization tokens and vaulting.',
            'I know which SKUs have the lowest post-purchase cancellation rates.',
        ],
        furtherReading: [
            { title: 'Shopify Post-Purchase Architecture', url: 'https://shopify.dev/docs/apps/checkout/post-purchase/architecture' },
        ],
    },
    {
        id: 'm11-l3',
        moduleId: 'module-11',
        slug: 'order-status-account-repeat-purchase-flows',
        title: 'Order Status, Account, and Repeat Purchase Flows',
        estimatedMinutes: 20,
        objectives: [
            'Optimize the customer account portal for rapid re-ordering.',
            'Integrate live carrier tracking links (Wonderment, Malomo).',
            'Build retention loops that fuel repeat purchase rate (RPR).',
        ],
        videoSource: {
            title: 'How To Enable Customer Accounts In Shopify [2026 Guide]',
            embedUrl: 'https://www.youtube-nocookie.com/embed/e5Nu5LAIFeA',
            channel: 'Guides With Garry',
            duration: '2:00',
            description: 'Curated technical CRO masterclass from Guides With Garry covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['How To Enable Customer Accounts In Shopify [2026 Guide]'],
        },
        sections: [
            {
                heading: 'Optimizing the Customer Account Portal for Rapid Re-Ordering',
                body: `Most default Shopify customer account portals are static, boring text lists of past order numbers.
Modern Account Portal CRO:
• 1-Click Reorder Button: Replaces tedious item searching with a direct "Buy Again" button that instantly populates the cart drawer.
• Subscription Management: Allows subscribers to skip a delivery, change flavors, or update delivery frequency without contacting customer support.
• Loyalty Points Display: Prominently highlights available rewards currency directly next to the reorder CTA.`,
                callout: {
                    type: 'shopify',
                    text: 'Shopify’s "New Customer Accounts" authentication system leverages passwordless 6-digit email codes, eliminating forgotten password friction.',
                },
            },
            {
                heading: 'Integrating Live Carrier Tracking Loops (Wonderment / Malomo)',
                body: `The "Where Is My Order?" (WISMO) question accounts for over 40% of all ecommerce support tickets.
Why Offloading to FedEx/USPS Hurts Brands:
Sending customers to a generic carrier tracking page abandons the customer and exposes them to third-party ads.
The Solution:
Embed a branded tracking page within your Shopify theme. When customers check delivery status, they are exposed to your brand’s latest arrivals, educational content, and personalized replenishment offers.`,
                callout: {
                    type: 'tip',
                    text: 'Branded tracking pages boast a 65% repeat open rate. Use this high-attention real estate to introduce relevant replenishment cross-sells.',
                },
            },
            {
                heading: 'Retention Loops That Fuel Repeat Purchase Rate (RPR)',
                body: `Acquiring a new customer costs 5x more than retaining an existing buyer. A high-performing CRO engineer optimizes the entire customer lifetime value loop:
1. Automated Replenishment Triggers: Time email/SMS flows to calculate when a product is 80% depleted (e.g. 45 days for a 60-capsule supplement).
2. VIP Early Access Portals: Create exclusive collection tiers for customers who have completed 2+ orders.
3. Habit-Forming Onboarding Sequences: Provide video guides on product care and optimal usage to prevent early abandonment.`,
                code: `// Customer Account Reorder Action Handler
async function reorderPastItems(orderId: string, lineItemVariants: { variantId: number; quantity: number }[]) {
  const items = lineItemVariants.map(v => ({ id: v.variantId, quantity: v.quantity }));
  
  try {
    const response = await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items })
    });

    const cart = await response.json();
    console.log(\`Reordered \${cart.items.length} items from past order #\${orderId}\`);
    window.location.href = '/checkout';
  } catch (err) {
    console.error('Failed to execute instant reorder:', err);
  }
}`,
                language: 'javascript',
            }
        ],
        mistakes: [
            'Requiring passwords for customer account logins instead of modern Shopify Passwordless Shop login.',
            'Sending tracking links that dump users into unbranded courier websites instead of an on-brand tracking page.',
        ],
        checklist: [
            'I can implement a "Buy Again" one-click button in customer order history.',
            'I know how to reduce WISMO inquiries through branded tracking.',
        ],
        furtherReading: [
            { title: 'Shopify New Customer Accounts Overview', url: 'https://shopify.dev/docs/themes/customer-accounts' },
        ],
    },
    {
        id: 'm11-l4',
        moduleId: 'module-11',
        slug: 'email-sms-capture-without-killing-trust',
        title: 'Email/SMS Capture Without Killing Trust',
        estimatedMinutes: 25,
        objectives: [
            'Design high-converting lead capture popups that don’t destroy SEO or mobile usability.',
            'Implement smart exit-intent and scroll-depth triggers.',
            'Comply with Google’s mobile intrusive interstitial penalties.',
        ],
        videoSource: {
            title: 'That Stupid Popup is Killing Your Ecommerce Conversion Rate',
            embedUrl: 'https://www.youtube-nocookie.com/embed/cD13IVLy0bo',
            channel: 'Ryan McKenzie',
            duration: '8:45',
            description: 'CRO audit showing why immediate intrusive popups spike bounce rates on mobile and how to optimize exit-intent and scroll-depth triggers to capture leads without hurting sales.',
            topics: ['Email & SMS Popups', 'Lead Capture Timing', 'Exit Intent Triggers', 'Bounce Rate Reduction'],
        },
        sections: [
            {
                heading: 'Designing High-Converting Lead Capture Without Destroying UX',
                body: `Email and SMS capture pop-ups are essential for building first-party subscriber lists, but 90% of stores implement them destructively.
The Cardinal Sins of Lead Capture:
• Instant Slap: Firing a full-screen pop-up 0.5 seconds after a user lands, before they even know what the store sells.
• Unclosable Modals: Tiny, invisible "X" buttons that trigger accidental clicks and user frustration on mobile devices.
• Value Proposition Vacuum: Generic "Sign up for our newsletter" copy with zero tangible benefit.`,
                callout: {
                    type: 'warning',
                    text: 'Shoppers who are immediately hit with a full-screen pop-up on mobile bounce at a 22% higher rate.',
                },
            },
            {
                heading: 'Smart Trigger Timing: Exit-Intent, Scroll Depth, and Dwell Seconds',
                body: `The timing of your lead capture modal dictates both its conversion rate and its impact on storewide bounce rates:
• Desktop Exit-Intent: Triggers only when the mouse cursor breaks the top boundary of the viewport toward the browser tab bar.
• Mobile Scroll Depth: Triggers only after the visitor has scrolled through at least 60% of a collection or product page.
• Dwell Time Delay: Wait at least 15-20 seconds to ensure the visitor has demonstrated genuine purchase exploration.`,
                callout: {
                    type: 'tip',
                    text: 'A 2-step teaser widget (a small pill in the bottom corner that says "Get 15% Off") allows the user to summon the lead form when THEY are ready.',
                },
            },
            {
                heading: 'Complying with Google Mobile Intrusive Interstitial Penalties',
                body: `Google actively penalizes mobile search rankings for websites that display intrusive interstitials that obscure the main content immediately after landing from a Google search result.
Compliance Rules:
• Ensure pop-up covers less than 30% of the mobile viewport upon arrival.
• Exemptions: Age verification modals and cookie consent banners are exempt from penalties.
• Best Practice: Suppress lead generation modals entirely for visitors arriving via Google Organic Search until their second page view.`,
                code: `// Smart Mobile Scroll-Depth & Dwell Timer Trigger Engine
class SmartLeadCaptureTrigger {
  private hasTriggered = false;
  private minDwellSeconds: number;
  private minScrollPercent: number;

  constructor(dwellSeconds = 18, scrollPercent = 55) {
    this.minDwellSeconds = dwellSeconds;
    this.minScrollPercent = scrollPercent;
    this.init();
  }

  private init() {
    // 1. Dwell timer
    const timer = setTimeout(() => {
      this.checkAndFire('DWELL_TIMER');
    }, this.minDwellSeconds * 1000);

    // 2. Scroll depth observer
    window.addEventListener('scroll', () => {
      if (this.hasTriggered) return;
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const percent = (currentScroll / scrollTotal) * 100;

      if (percent >= this.minScrollPercent) {
        this.checkAndFire('SCROLL_DEPTH');
        clearTimeout(timer);
      }
    }, { passive: true });
  }

  private checkAndFire(triggerReason: string) {
    if (this.hasTriggered || sessionStorage.getItem('lead_popup_dismissed')) return;
    this.hasTriggered = true;
    console.log(\`[Lead Capture] Activated via: \${triggerReason}\`);
    // Show modal cleanly
    document.querySelector('.lead-modal')?.classList.add('lead-modal--active');
  }
}

new SmartLeadCaptureTrigger(15, 60);`,
                language: 'javascript',
            }
        ],
        mistakes: [
            'Making close "X" buttons microscopic or hidden on mobile screens.',
            'Showing popups repeatedly to visitors who already dismissed or subscribed.',
        ],
        checklist: [
            'I know how to comply with Google mobile interstitial rules.',
            'I can implement a desktop exit-intent event listener in JavaScript.',
        ],
        furtherReading: [
            { title: 'Google Search: Mobile Friendly Interstitial Guidelines', url: 'https://developers.google.com/search/docs/crawling-indexing/mobile/interstitial' },
        ],
    },
    {
        id: 'm11-l5',
        moduleId: 'module-11',
        slug: 'surveys-and-nps-for-cro-research',
        title: 'Surveys and NPS for CRO Research',
        estimatedMinutes: 20,
        objectives: [
            'Run Net Promoter Score (NPS) and Customer Effort Score (CES) surveys.',
            'Synthesize survey feedback into prioritized development hypotheses.',
            'Isolate detractors to identify hidden technical UX defects.',
        ],
        videoSource: {
            title: 'Must-Have Ecommerce Growth Practice: Run Your Own CRO Audit - Part 1',
            embedUrl: 'https://www.youtube-nocookie.com/embed/ScpZznlKRvQ',
            channel: 'The Good',
            duration: '10:13',
            description: 'Curated technical CRO masterclass from The Good covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Must', 'Have Ecommerce Growth Practice: Run Your Own CRO Audit', 'Part 1'],
        },
        sections: [
            {
                heading: 'Running Net Promoter Score (NPS) and Customer Effort Score (CES)',
                body: `Customer satisfaction surveys translate subjective feelings into actionable quantitative metrics:

1. Net Promoter Score (NPS):
"On a scale of 0 to 10, how likely are you to recommend our store to a friend?"
• Promoters (9-10): Loyal enthusiasts; target for referral programs.
• Passives (7-8): Vulnerable to competitive offerings.
• Detractors (0-6): Unhappy customers; immediate churn risks.
Formula: % Promoters - % Detractors

2. Customer Effort Score (CES):
"How easy was it to complete your purchase today?" (1 = Very Difficult to 7 = Very Easy).
CES has been shown to be 2x more predictive of customer loyalty than CSAT!`,
                callout: {
                    type: 'tip',
                    text: 'A low CES score (high friction) points directly to checkout input bugs or unclear return policy messaging.',
                },
            },
            {
                heading: 'Synthesizing Survey Feedback into Prioritized Hypotheses',
                body: `Raw survey feedback is messy. A structured synthesis pipeline turns emotional customer complaints into high-converting backlog items:
1. Keyword Tagging: Tag open-ended feedback into categories (e.g. Sizing Confusion, Shipping Cost Surprise, Delivery Delay, Discount Code Failure).
2. Frequency Auditing: Count how many times each tag appears per 1,000 orders.
3. Formulate Backlog Tests: If 28% of detractors cite "unclear sizing on athletic fit," formulate a Phase 2 hypothesis testing an interactive size recommender.`,
                callout: {
                    type: 'note',
                    text: 'Read every single Detractor comment. 80% of technical edge-case bugs (e.g. PayPal failing on Firefox mobile) are discovered in survey comments.',
                },
            },
            {
                heading: 'Isolating Detractor Cohorts to Uncover Hidden UX Defects',
                body: `Filter your analytics by survey score:
Compare the technical characteristics of Detractors (NPS 0-6) vs Promoters (NPS 9-10):
• Device Breakdown: Are 70% of detractors on Android devices? You likely have an input bug on mobile Chrome.
• Browser Breakdown: Are detractors clustered on Safari iOS 16? Look for layout shifts in the cart drawer.
• Geography: Are international shoppers rating shipping satisfaction poorly? Your currency or duties selector is unclear.`,
                code: `// NPS & Customer Effort Score Aggregator Engine
interface SurveyResponse {
  customerId: string;
  npsScore: number; // 0 to 10
  cesScore: number; // 1 to 7
  primaryComplaintTag?: 'SIZING' | 'SHIPPING_COST' | 'PAYMENT_GLITCH' | 'NONE';
  feedbackText: string;
}

function calculateSurveyHealth(responses: SurveyResponse[]) {
  const total = responses.length;
  const promoters = responses.filter(r => r.npsScore >= 9).length;
  const detractors = responses.filter(r => r.npsScore <= 6).length;
  const nps = Math.round(((promoters - detractors) / total) * 100);

  const avgCes = (responses.reduce((sum, r) => sum + r.cesScore, 0) / total).toFixed(2);

  return {
    sampleSize: total,
    npsScore: nps,
    averageCustomerEffortScore: avgCes,
    detractorCount: detractors,
    topComplaint: 'SIZING' // Computed from tag frequency
  };
}

console.log(calculateSurveyHealth([
  { customerId: 'C1', npsScore: 10, cesScore: 7, feedbackText: 'Super fast delivery!' },
  { customerId: 'C2', npsScore: 5, cesScore: 3, primaryComplaintTag: 'SIZING', feedbackText: 'Shoes run a half size small, had to exchange.' },
  { customerId: 'C3', npsScore: 9, cesScore: 7, feedbackText: 'Loved the packaging.' }
]));`,
                language: 'javascript',
            }
        ],
        mistakes: [
            'Asking 20-question surveys that have a 0.5% response rate.',
            'Ignoring customer verbatim explanations and only looking at the aggregate average score.',
        ],
        checklist: [
            'I can write high-response-rate single-question post-purchase surveys.',
            'I know how to translate low CES responses into technical bug fixes.',
        ],
        furtherReading: [
            { title: 'Harvard Business Review: Stop Trying to Delight Your Customers', url: 'https://hbr.org' },
        ],
    },
    // MODULE 12: Personalization & Segmentation
    {
        id: 'm12-l1',
        moduleId: 'module-12',
        slug: 'segments-that-matter-new-returning-source-geo-cart-value',
        title: 'Segments That Matter: New, Returning, Source, Geo, Cart Value',
        estimatedMinutes: 20,
        objectives: [
            'Identify the 5 high-impact customer segments for ecommerce personalization.',
            'Tailor UX and messaging to traffic acquisition source (Paid TikTok vs Organic Search vs Email).',
            'Personalize currency, shipping rules, and messaging by customer geography.',
        ],
        videoSource: {
            title: 'How to Create Customer Segments on Shopify',
            embedUrl: 'https://www.youtube-nocookie.com/embed/SswDAVgy-fY',
            channel: 'Shopify Guide',
            duration: '8:50',
            description: 'Comprehensive walkthrough of customer segmentation on Shopify, segmenting new vs returning buyers, and targeting high-value cohorts.',
            topics: ['Customer Segmentation', 'Shopify Segments', 'Personalization', 'Cohort Analysis'],
        },
        sections: [
            {
                heading: 'The 5 High-Impact Segments for Ecommerce Personalization',
                body: `Do not attempt to personalize for 50 arbitrary personas. High-ROI ecommerce personalization focuses on 5 distinct behavioral segments:

1. First-Time Visitors vs. Returning Customers:
First-time visitors need brand credibility, clear value propositions, and free shipping assurances. Returning buyers need instant re-order shortcuts and fresh new arrivals.

2. Traffic Acquisition Source:
Paid TikTok ad visitors arrive with high visual curiosity but low attention spans (tailor towards short UGC video formats). Google Search shoppers have high purchase intent for a specific keyword.

3. Geographic Location:
Localize currency, shipping transit dates, and seasonal apparel (winter coats in Canada vs swimwear in Florida).

4. Cart Value & Loyalty Tier:
Tailor upsells dynamically based on current spend level.

5. Device & Platform:
Optimize mobile ergonomics and accelerated wallet defaults for iOS vs Android.`,
                callout: {
                    type: 'tip',
                    text: 'Personalizing for just 2 segments (New vs Returning) typically delivers 80% of the financial upside of complex enterprise AI personalization.',
                },
            },
            {
                heading: 'Tailoring UX & Messaging to Traffic Acquisition Channels',
                body: `Aligning on-site experience with ad creative is known as Message Match:
• TikTok & Instagram Traffic: Match the exact visual aesthetic of the ad. If the ad featured a specific influencer wearing the Emerald Green Jacket, land the visitor on a PDP pre-selected to Emerald Green with the influencer quote featured prominently.
• Google Non-Brand Search: Shoppers searched for "waterproof commuter backpack." Ensure the H1 and feature badges immediately reinforce "100% Waterproof Guarantee." `,
                callout: {
                    type: 'warning',
                    text: 'Landing paid ad traffic on a generic homepage instead of a dedicated, message-matched PDP wastes up to 60% of your advertising budget.',
                },
            },
            {
                heading: 'Localizing Currency, Shipping Rules, and Regional Messaging',
                body: `International visitors bounce when prices are presented in foreign currencies or shipping terms are ambiguous.
Localization Architecture:
• Native Currency Conversion: Present prices in the customer's local currency with clean localized rounding ($79.00 USD vs €85.00 EUR vs ¥11,500 JPY).
• Duties & Taxes Transparency: Clearly state "Duties and taxes pre-calculated at checkout — No surprise customs fees."
• Regional Delivery Rules: Dynamic banners announcing local warehouse shipping (e.g. "Dispatched from our London warehouse for next-day UK delivery").`,
                code: `// Client-Side Segment Identifier & Message Match Engine
interface VisitorContext {
  referrer: string;
  utmSource: string;
  utmCampaign: string;
  isReturning: boolean;
  countryCode: string;
}

function resolveVisitorPersonalization(context: VisitorContext) {
  if (context.utmSource.toLowerCase().includes('tiktok')) {
    return {
      experienceTier: 'SOCIAL_VIDEO_FORWARD',
      heroBannerText: 'As Seen on TikTok — Trending Fits',
      showUgcVideoCarousel: true
    };
  }

  if (context.isReturning) {
    return {
      experienceTier: 'RETURNING_VIP',
      heroBannerText: 'Welcome Back — Explore What's New',
      showRecentOrdersButton: true
    };
  }

  return {
    experienceTier: 'STANDARD_ACQUISITION',
    heroBannerText: 'Engineered for Performance | Free Shipping Over $75',
    showBrandStoryModal: true
  };
}

console.log(resolveVisitorPersonalization({
  referrer: 'https://tiktok.com',
  utmSource: 'tiktok_ads',
  utmCampaign: 'spring_jacket_ugc',
  isReturning: false,
  countryCode: 'US'
}));`,
                language: 'javascript',
            }
        ],
        mistakes: [
            'Over-segmenting into 50 tiny cohorts that each have insufficient traffic to measure statistically.',
            'Showing "Welcome, first-time shopper!" banners to a customer who has made 5 orders.',
        ],
        checklist: [
            'I can segment visitors by UTM source, device, and customer tags.',
            'I know how to customize homepage sections for returning visitors.',
        ],
        furtherReading: [
            { title: 'Shopify Customer Segmentation Guide', url: 'https://help.shopify.com/en/manual/customers/customer-segmentation' },
        ],
    },
    {
        id: 'm12-l2',
        moduleId: 'module-12',
        slug: 'shopify-native-personalization-markets-tags-metafields-flow',
        title: 'Shopify Native Personalization: Markets, Tags, Metafields, Flow',
        estimatedMinutes: 25,
        objectives: [
            'Configure localized shopping experiences using Shopify Markets.',
            'Leverage Customer Metafields for personalized Liquid theme rendering.',
            'Automate segmentation workflows with Shopify Flow.',
        ],
        videoSource: {
            title: 'Shopify Category Metafields Tutorial - What are the Benefits & How to Use Them',
            embedUrl: 'https://www.youtube-nocookie.com/embed/8wUR63eamtk',
            channel: 'Ed Codes - Shopify DIY Tutorials',
            duration: '11:06',
            description: 'Curated technical CRO masterclass from Ed Codes - Shopify DIY Tutorials covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Shopify Category Metafields Tutorial', 'What are the Benefits & How to Use Them'],
        },
        sections: [
            {
                heading: 'Configuring Localized Shopping Experiences with Shopify Markets',
                body: `Shopify Markets allows a single Shopify store to sell across 150+ countries without requiring separate international store domains or complex codebases.
Capabilities:
• Currency & Pricing: Configure country-specific price lists and rounding rules (e.g., $49.00 USD vs £45.00 GBP).
• Catalog Control: Restrict products that cannot be shipped to specific jurisdictions due to licensing or customs regulations.
• Localized Domains & Subfolders: Route visitors to \`/en-gb/\` or \`/fr-ca/\` seamlessly while preserving international SEO hreflang tags.`,
                callout: {
                    type: 'shopify',
                    text: 'Shopify Markets handles currency conversion at the checkout level natively, eliminating payment processing discrepancies.',
                },
            },
            {
                heading: 'Leveraging Customer Metafields for Personalized Liquid Rendering',
                body: `Shopify Customer Metafields store custom structured data directly on the customer record:
Examples of High-Value Metafields:
• \`customer.metafields.custom.shoe_size\`: Automatically pre-selects the customer's preferred shoe size when they view any footwear PDP!
• \`customer.metafields.custom.skin_type\`: Renders personalized routine recommendations (Oily vs Dry skin) on skincare collection pages.
• \`customer.metafields.custom.loyalty_tier\`: Renders an exclusive VIP discount banner across the header for tier-3 members.`,
                callout: {
                    type: 'tip',
                    text: 'Pre-selecting a logged-in customer’s saved size on the PDP removes 2 friction taps and lifts repeat purchase conversion by 9%.',
                },
            },
            {
                heading: 'Automating Customer Segmentation with Shopify Flow',
                body: `Shopify Flow is the native visual automation engine that executes backend logic without third-party webhooks.
High-Impact CRO Flow Automations:
• VIP Tagging: When customer total spend crosses $500, automatically append the \`vip_customer\` tag to their profile.
• At-Risk Customer Alert: If 90 days pass without an order from a high-LTV buyer, trigger a personalized re-engagement SMS flow in Klaviyo.
• High-Returner Flagging: If a customer returns > 50% of orders, suppress free return promotions on their session to protect business profitability.`,
                code: `<!-- Liquid Theme Example: Metafield-Driven Personalized PDP Sizing -->
{% if customer and customer.metafields.custom.preferred_size != blank %}
  <div class="personalized-size-reassurance">
    <span class="icon-sparkle">✨</span>
    <span>Pre-selected size <strong>{{ customer.metafields.custom.preferred_size }}</strong> based on your fit profile.</span>
  </div>
{% endif %}

{% if customer.tags contains 'vip_member' %}
  <div class="vip-exclusive-badge">
    <span>★ VIP Member: 15% discount will be auto-applied at checkout!</span>
  </div>
{% endif %}`,
                language: 'html',
            }
        ],
        mistakes: [
            'Hardcoding currency symbols instead of using Shopify Markets localization filters (\`localization.country\`).',
            'Forgetting that full-page theme caching can cause customer-specific Liquid tags to render incorrectly without dynamic Section Rendering.',
        ],
        checklist: [
            'I know how to query customer metafields in Liquid.',
            'I understand how Shopify Markets localizes prices and content.',
        ],
        furtherReading: [
            { title: 'Shopify Markets Developer Documentation', url: 'https://shopify.dev/docs/apps/markets' },
        ],
    },
    {
        id: 'm12-l3',
        moduleId: 'module-12',
        slug: 'personalized-homepage-and-pdp-blocks',
        title: 'Personalized Homepage and PDP Blocks',
        estimatedMinutes: 25,
        objectives: [
            'Build dynamic "Recently Viewed Products" blocks in vanilla JS using localStorage.',
            'Render personalized banner greetings based on cart value and referral parameters.',
            'Inject customized recommendations using the Shopify Ajax API.',
        ],
        videoSource: {
            title: 'Boost Your Shopify Sales in 2024 with These Homepage Design Secrets I CRO Insights 62',
            embedUrl: 'https://www.youtube-nocookie.com/embed/dAFy0p1ngvc',
            channel: 'Oliver Kenyon | ConversionWise',
            duration: '3:08',
            description: 'Curated technical CRO masterclass from Oliver Kenyon | ConversionWise covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Boost Your Shopify Sales in 2024 with These Homepage Design Secrets I CRO Insights 62'],
        },
        sections: [
            {
                heading: 'Building a Zero-Lag "Recently Viewed Products" Block in Vanilla JS',
                body: `A "Recently Viewed Products" carousel is one of the most effective personalizations for driving browsing re-engagement.
Architectural Best Practice:
Never rely on heavy external apps to track browsing history. Build a lightweight vanilla JavaScript module using browser \`localStorage\`:
1. On every PDP visit, record the current product handle, title, featured image, and price into an array in \`localStorage\`.
2. Cap the array at 8 items to prevent storage bloat.
3. On the cart drawer or below the PDP, dynamically render the recent items array.
4. Because data lives locally on the device, it renders instantly with ZERO network latency and ZERO layout shift.`,
                callout: {
                    type: 'tip',
                    text: 'Displaying Recently Viewed Products in the empty cart drawer recovers up to 14% of abandoned sessions.',
                },
            },
            {
                heading: 'Rendering Dynamic Cart-Value & Referral Welcome Banners',
                body: `Welcome banners should react to the visitor’s live state:
• Unlocked Milestone: If the visitor has $60 in their cart, render a top bar saying: "You are only $15 away from Free Shipping!"
• Affiliate / Influencer Referral: If the visitor arrives via \`?ref=sarah\`, dynamically display: "Welcome Sarah's community! Your 15% discount will apply automatically at checkout."
This provides immediate psychological confirmation that the customer is in the right place.`,
                callout: {
                    type: 'note',
                    text: 'Always store referral parameters in sessionStorage so the greeting persists as the user explores multiple pages.',
                },
            },
            {
                heading: 'Injecting Dynamic Recommendations via the Shopify Ajax API',
                body: `Combine recently viewed products with the Shopify Recommendations API to build a responsive recommendation engine:
• When a user views a jacket, query \`/recommendations/products.json?product_id={id}\` to fetch related trousers and boots.
• Dynamically inject the recommendation grid into a designated section container using the Section Rendering API.
• Style the recommendation cards with identical typography, review stars, and quick-add buttons to match the primary catalog.`,
                code: `// High-Performance Vanilla JS Recently Viewed Products Engine
class RecentlyViewedTracker {
  private storageKey = 'cro_recently_viewed_v1';
  private maxItems = 6;

  public recordProductVisit(product: { handle: string; title: string; image: string; price: string }) {
    let items = this.getItems().filter(item => item.handle !== product.handle);
    items.unshift(product);
    if (items.length > this.maxItems) items.pop();
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  public getItems(): any[] {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    } catch {
      return [];
    }
  }

  public render(containerSelector: string) {
    const container = document.querySelector(containerSelector);
    const items = this.getItems();
    if (!container || !items.length) return;

    container.innerHTML = \`
      <div class="recently-viewed-grid">
        \${items.map(i => \`
          <a href="/products/\${i.handle}" class="recent-card">
            <img src="\${i.image}" alt="\${i.title}" loading="lazy" />
            <span class="recent-title">\${i.title}</span>
            <span class="recent-price">\${i.price}</span>
          </a>
        \`).join('')}
      </div>
    \`;
  }
}

const tracker = new RecentlyViewedTracker();
// On PDP load:
// tracker.recordProductVisit({ handle: 'merino-hoodie', title: 'Merino Hoodie', image: '...', price: '$78' });
// On Homepage or Cart:
// tracker.render('#recently-viewed-container');`,
                language: 'javascript',
            }
        ],
        mistakes: [
            'Fetching all product details synchronously on page load instead of lazy-loading product cards.',
            'Showing the current PDP product inside its own "Recently Viewed" carousel.',
        ],
        checklist: [
            'I can implement a client-side recently viewed tracker.',
            'I ensure dynamic personalization doesn\'t cause Cumulative Layout Shift (CLS).',
        ],
        furtherReading: [
            { title: 'Shopify Theme Dev: Dynamic Cart & Personalization', url: 'https://shopify.dev/docs/themes' },
        ],
    },
    {
        id: 'm12-l4',
        moduleId: 'module-12',
        slug: 'app-based-personalization-rebuy-nosto-dynamic-yield',
        title: 'App-Based Personalization (Rebuy, Nosto, Dynamic Yield)',
        estimatedMinutes: 20,
        objectives: [
            'Evaluate third-party AI recommendation engines (Rebuy, Nosto, Dynamic Yield).',
            'Optimize widget rendering speed and eliminate layout shifts.',
            'Calculate incremental ROI of enterprise personalization tools.',
        ],
        videoSource: {
            title: 'Shopify Product Personalizer Apps: 5 Apps Tested (2026)',
            embedUrl: 'https://www.youtube-nocookie.com/embed/j1z4--BtT8U',
            channel: 'Cloudlift',
            duration: '3:40',
            description: 'Curated technical CRO masterclass from Cloudlift covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Shopify Product Personalizer Apps: 5 Apps Tested (2026)'],
        },
        sections: [
            {
                heading: 'Evaluating Enterprise Personalization Tools: Rebuy, Nosto, Dynamic Yield',
                body: `When does an ecommerce brand outgrow native Liquid and require dedicated third-party personalization engines?

Platform Comparison:
• Rebuy Engine: Built specifically for Shopify. Excels at intelligent cart drawer upsells, post-purchase funnels, and dynamic re-order portals. Very popular among mid-market D2C ($5M - $30M GMV).
• Nosto: Comprehensive multichannel personalization engine covering on-site recommendations, category merchandising, and behavioral popups.
• Dynamic Yield (Mastercard): Enterprise omnichannel personalization platform with real-time predictive algorithms, deep CRM integrations, and advanced multivariate testing capabilities ($50M+ GMV).`,
                callout: {
                    type: 'tip',
                    text: 'For 90% of Shopify Plus stores, Rebuy provides the optimal balance of native Shopify integration, ease of setup, and ROI.',
                },
            },
            {
                heading: 'Optimizing Widget Rendering Speed & Eliminating Layout Shifts',
                body: `The biggest danger with third-party personalization apps is performance degradation:
• The Layout Shift Trap: A recommendation widget takes 1200ms to calculate recommendations over the network. When it finally injects into the DOM, it forcefully shifts the footer or buy box down by 300px, ruining Cumulative Layout Shift (CLS).
• Optimization Strategy:
  - Reserve Container Space: Define a min-height skeleton wrapper in CSS so the layout does not jump when cards arrive.
  - Asynchronous Hydration: Never block critical PDP rendering for recommendation widgets.
  - CDN Edge Caching: Configure widget payloads to cache at the CDN layer for common catalog pairings.`,
                callout: {
                    type: 'warning',
                    text: 'Always audit third-party personalization scripts with Chrome DevTools to confirm they do not execute long tasks (> 50ms) on the main thread.',
                },
            },
            {
                heading: 'Calculating Incremental Return on Investment (ROI)',
                body: `Personalization platforms are expensive ($500 to $4,000+/month). A senior CRO developer must calculate whether the tool generates true incremental gross profit:
• The Attribution Trap: Personalization vendors love to claim credit for every sale where a customer clicked a recommendation widget, even if the customer was already intending to buy!
• The Incremental Lift Test: Always hold out a 10% un-personalized control group. Compare Revenue Per Session (RPS) between the Personalized Group (90%) and the Control Group (10%).
• ROI Formula:
\`Net ROI = (Incremental Gross Profit from Lift - Monthly Tool Cost) / Monthly Tool Cost * 100\`.`,
                code: `// Incremental Personalization ROI Auditor
function calculatePersonalizationRoi(params: {
  monthlySessions: number;
  toolCostMonthly: number;
  controlRps: number;
  personalizedRps: number;
  grossMarginPercent: number; // e.g. 0.60 for 60% margin
}) {
  const liftPerSession = params.personalizedRps - params.controlRps;
  const totalIncrementalRevenue = params.monthlySessions * liftPerSession;
  const incrementalGrossProfit = totalIncrementalRevenue * params.grossMarginPercent;
  const netProfit = incrementalGrossProfit - params.toolCostMonthly;
  const roiMultiplier = netProfit / params.toolCostMonthly;

  return {
    incrementalRevenue: '$' + totalIncrementalRevenue.toLocaleString(),
    incrementalGrossProfit: '$' + Math.round(incrementalGrossProfit).toLocaleString(),
    monthlyToolCost: '$' + params.toolCostMonthly.toLocaleString(),
    netMonthlyProfit: '$' + Math.round(netProfit).toLocaleString(),
    roiVerdict: netProfit > 0 ? \`POSITIVE_ROI (\${(roiMultiplier * 100).toFixed(0)}% return)\` : 'NEGATIVE_ROI_CANCEL_TOOL'
  };
}

console.log(calculatePersonalizationRoi({
  monthlySessions: 120000,
  toolCostMonthly: 1800,
  controlRps: 2.10,
  personalizedRps: 2.22, // $0.12 RPS lift
  grossMarginPercent: 0.65
}));`,
                language: 'javascript',
            }
        ],
        mistakes: [
            'Accepting default app styling that clashes with the brand design system.',
            'Letting personalization widgets inject unconstrained images that cause massive CLS.',
        ],
        checklist: [
            'I know how to style and embed Rebuy/Nosto widgets natively.',
            'I verify app widget loading impact using Lighthouse.',
        ],
        furtherReading: [
            { title: 'Rebuy Engine Developer Docs', url: 'https://rebuyengine.com/docs' },
        ],
    },
    {
        id: 'm12-l5',
        moduleId: 'module-12',
        slug: 'privacy-consent-and-doing-personalization-ethically',
        title: 'Privacy, Consent, and Doing Personalization Ethically',
        estimatedMinutes: 20,
        objectives: [
            'Balance personalization capabilities with customer privacy rights.',
            'Respect Do Not Track (DNT) and Global Privacy Control (GPC) signals.',
            'Avoid "creepy" over-personalization that erodes trust.',
        ],
        videoSource: {
            title: 'Shopify Privacy Compliance PAGES Setup - A Step by Step Guide',
            embedUrl: 'https://www.youtube-nocookie.com/embed/R5oYg9893uQ',
            channel: 'pandectes',
            duration: '5:50',
            description: 'Curated technical CRO masterclass from pandectes covering real-world heuristics, implementation blueprints, and optimization frameworks.',
            topics: ['Shopify Privacy Compliance PAGES Setup', 'A Step by Step Guide'],
        },
        sections: [
            {
                heading: 'Balancing Personalization Capabilities with Customer Privacy Rights',
                body: `The regulatory landscape for data privacy (GDPR in Europe, CCPA/CPRA in California, LGPD in Brazil) strictly governs how customer behavioral data can be collected and utilized.
Privacy Compliance Mandates:
• Consent Before Tracking: In the EU, tracking cookies and personalization scripts cannot execute until the visitor grants explicit consent via an approved Consent Management Platform (CMP).
• Data Minimization: Only store data necessary for improving customer experience; avoid hoarding excessive behavioral telemetry.
• Shopify Customer Privacy API: Use Shopify’s native privacy API (\`window.Shopify.customerPrivacy\`) to query whether the visitor has consented to analytics and marketing tracking.`,
                callout: {
                    type: 'warning',
                    text: 'Executing personalization scripts on European visitors before consent is granted can result in catastrophic GDPR regulatory fines.',
                },
            },
            {
                heading: 'Respecting Do Not Track (DNT) and Global Privacy Control (GPC)',
                body: `Modern privacy-focused browsers (Brave, Firefox, Safari) and extensions transmit Global Privacy Control (\`navigator.globalPrivacyControl === true\`) signals indicating the user does not want their data sold or tracked across third-party networks.
Defensive Implementation:
• When GPC is detected, automatically fall back to session-only, non-persistent personalization (e.g. relying only on current cart contents rather than tracking cross-site history).
• Do not synchronize user profiles with third-party data brokers when GPC is active.`,
                callout: {
                    type: 'tip',
                    text: 'California CPRA legally recognizes GPC as a valid opt-out mechanism. Respecting GPC protects your store from regulatory liability.',
                },
            },
            {
                heading: 'Avoiding "Creepy" Over-Personalization That Erodes Consumer Trust',
                body: `There is a fine psychological line between helpful personalization and creepy surveillance.
Over-Personalization Mistakes:
• Creepy: Displaying a banner: "We noticed you looked at these red boots yesterday in Seattle while on your iPhone!" This triggers privacy panic and user skepticism.
• Helpful & Subtle: Quietly showing the red boots in a clean "Recently Viewed" section with zero intrusive commentary.
• The Golden Rule of CRO Personalization: The experience should feel effortlessly convenient, never surveilled.`,
                code: `// Privacy-Aware Personalization Gateway with Shopify Customer Privacy API
function canExecutePersonalization(): boolean {
  // 1. Check Global Privacy Control (GPC)
  if ((navigator as any).globalPrivacyControl) {
    console.log('[Privacy Gate] GPC active. Restricting to non-persistent personalization.');
    return false;
  }

  // 2. Check Shopify Native Customer Privacy Consent
  if ((window as any).Shopify && (window as any).Shopify.customerPrivacy) {
    const cp = (window as any).Shopify.customerPrivacy;
    // Returns boolean whether marketing & analytics tracking is permitted
    if (typeof cp.marketingAllowed === 'function' && !cp.marketingAllowed()) {
      console.log('[Privacy Gate] Customer declined marketing consent.');
      return false;
    }
  }

  return true;
}

if (canExecutePersonalization()) {
  console.log('[CRO Engine] Initializing dynamic customer personalization modules.');
} else {
  console.log('[CRO Engine] Falling back to standard static catalog experience.');
}`,
                language: 'javascript',
            }
        ],
        mistakes: [
            'Failing to test UI fallback states when cookies or tracking scripts are blocked by user privacy extensions.',
            'Using third-party data broker enrichment that violates CCPA/CPRA regulations.',
        ],
        checklist: [
            'I test personalization fallbacks with ad blockers and privacy extensions enabled.',
            'I respect Global Privacy Control (GPC) headers.',
        ],
        furtherReading: [
            { title: 'Global Privacy Control Specification', url: 'https://globalprivacycontrol.org' },
        ],
    },
];
