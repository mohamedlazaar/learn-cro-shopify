import React, { useState } from 'react';
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  ChevronRight,
  ChevronDown,
  Star,
  Lock,
  X,
  Minus,
  Plus,
  Heart,
} from 'lucide-react';
import './MockApparelStore.css';

/* =========================================================
   Simulated "Loom & Lane" apparel store with planted CRO flaws.
   Each surface maps (by `surface` name) to a finding row in AuditExercise.
   ========================================================= */

export type MockSurfaceKey = 'home' | 'mobile-nav' | 'collection' | 'pdp' | 'cart';

export interface MockSurfaceMeta {
  key: MockSurfaceKey;
  /** Must match the `surface` string stored in AuditExercise findings. */
  surface: string;
  tab: string;
  emoji: string;
  url: string;
  hints: string[];
  answerKey: { flaw: string; fix: string }[];
}

export const APPAREL_SURFACES: MockSurfaceMeta[] = [
  {
    key: 'home',
    surface: 'Homepage Hero',
    tab: 'Homepage',
    emoji: '🏠',
    url: 'loomandlane.com/',
    hints: [
      'Read the headline out loud. Would a first-time visitor know what this store sells?',
      'How easy is this button to spot against the background?',
      'Watch the dots. What happens if a shopper is still reading slide 1?',
      'What can a visitor see without scrolling? Any products, prices, or reviews?',
    ],
    answerKey: [
      {
        flaw: 'Vague, "clever" headline ("Be The Moment.") fails the 5-second test. No product category, audience or differentiator.',
        fix: 'Rewrite as a clear value prop, e.g. "Breathable linen essentials for warm days, free returns". Expose it via section.settings so merch can A/B test copy.',
      },
      {
        flaw: 'Ghost "Discover" CTA has low contrast (fails WCAG 4.5:1) and a non-specific label.',
        fix: 'Use a solid high-contrast button with a specific label ("Shop New Linen"), linked straight to the hero collection.',
      },
      {
        flaw: 'Auto-rotating carousel (3s) moves content before it is read, and slides 2–4 get almost no attention.',
        fix: 'Replace with a single static hero, or disable autoplay and respect prefers-reduced-motion. Lazy-load slides 2+ and keep slide 1 as the LCP image with fetchpriority="high".',
      },
      {
        flaw: 'A full-viewport hero pushes every product, price and review below the fold.',
        fix: 'Cap hero height (~60vh desktop / 45vh mobile) and add a featured-collection row plus a review/trust strip above the fold.',
      },
    ],
  },
  {
    key: 'mobile-nav',
    surface: 'Mobile Navigation',
    tab: 'Mobile Nav',
    emoji: '📱',
    url: 'loomandlane.com/ (iPhone 14)',
    hints: [
      'How much of the phone screen does the fixed header take up?',
      'Where would a shopper who knows exactly what they want go first?',
      'Try tapping these links with your thumb. How big are they?',
      'After adding something, how would the shopper know the cart has items?',
    ],
    answerKey: [
      {
        flaw: 'Sticky header (announcement bar + oversized logo) takes ~25% of the mobile viewport on every page.',
        fix: 'Collapse the announcement bar on scroll and shrink the logo. Use a compact 56px header that hides on scroll-down and reappears on scroll-up (IntersectionObserver / scroll direction).',
      },
      {
        flaw: 'Search is buried at the bottom of the hamburger drawer. High-intent searchers (who convert 2–3× better) can\'t find it.',
        fix: 'Put a search icon (or a full search bar) in the header next to the cart, and wire it to Shopify Predictive Search (/search/suggest.json).',
      },
      {
        flaw: 'Menu links are ~28px tall with tiny text, below the 44–48px minimum tap target, and nested 3 levels deep.',
        fix: 'Set min-height: 48px on menu items, use 16px+ font, flatten to 2 levels and add visual category tiles for the top sellers.',
      },
      {
        flaw: 'Cart icon has no item-count badge, so there is no feedback after adding to cart.',
        fix: 'Render {{ cart.item_count }} in a badge and refresh it via the Section Rendering API after /cart/add.js.',
      },
    ],
  },
  {
    key: 'collection',
    surface: 'Collection Grid',
    tab: 'Collection',
    emoji: '🗂️',
    url: 'loomandlane.com/collections/all',
    hints: [
      '148 products. How would a shopper narrow that down?',
      'Look at which products appear first.',
      'Compare the image heights across the row.',
      'What information is missing from some cards?',
    ],
    answerKey: [
      {
        flaw: 'There is no filter or sort bar for 148 SKUs, which leads to choice overload (Hick\'s Law) and pogo-sticking.',
        fix: 'Enable Shopify Search & Discovery filters (size, color, price, fabric) and render collection.filters plus a sort_by dropdown, sticky on mobile.',
      },
      {
        flaw: 'Sold-out products rank first, so the most valuable slots are wasted.',
        fix: 'Push sold-out items to the end (Search & Discovery setting, or sort in Liquid by product.available) and add "Notify me" for back-in-stock.',
      },
      {
        flaw: 'Inconsistent image aspect ratios make a jagged grid and cause layout shift (CLS).',
        fix: 'Force a consistent aspect-ratio: 3/4 with object-fit: cover, and set width/height on image_tag so space is reserved.',
      },
      {
        flaw: 'Some cards have no price ("View details") and none show color swatches or ratings.',
        fix: 'Always show the price (with compare_at_price), add variant swatches from product.options_with_values and a star rating snippet from the reviews app metafield.',
      },
    ],
  },
  {
    key: 'pdp',
    surface: 'Product Detail Page (PDP)',
    tab: 'Product Page',
    emoji: '👕',
    url: 'loomandlane.com/products/everyday-linen-shirt',
    hints: [
      'Is there any social proof near the product title?',
      'What sits between the price and the size selector?',
      'Apparel\'s #1 return reason is fit. What would help here?',
      'How noticeable is the main call to action?',
      'Where would a shopper find shipping cost and return policy?',
    ],
    answerKey: [
      {
        flaw: 'No reviews or star rating near the title, so there is no social proof at the moment of evaluation.',
        fix: 'Add a star rating + review count under the title (reviews app block or product.metafields.reviews.rating) that anchor-links to the reviews section.',
      },
      {
        flaw: 'A wall-of-text description sits above the size selector, pushing Add to Bag below the fold.',
        fix: 'Move the description into an accordion below the buy box and put 3 scannable benefit bullets near the price instead.',
      },
      {
        flaw: 'Size is a "Select size" dropdown with no size guide, and sold-out sizes are not marked.',
        fix: 'Render sizes as pill buttons from product.variants (disabled + struck-through when !variant.available) with a "Size guide" modal link right next to them.',
      },
      {
        flaw: 'Add to Bag is a pale grey button that looks disabled, giving a weak visual hierarchy.',
        fix: 'Make it a full-width, high-contrast primary button and add Shopify dynamic checkout ({{ form | payment_button }}) for express wallets.',
      },
      {
        flaw: 'Shipping & returns are hidden in a collapsed accordion and there is no delivery estimate.',
        fix: 'Show "Free shipping over $75 · Free 30-day returns · Arrives Thu–Mon" as an inline trust row directly under the ATC button.',
      },
    ],
  },
  {
    key: 'cart',
    surface: 'Cart Drawer',
    tab: 'Cart Drawer',
    emoji: '🛒',
    url: 'loomandlane.com/ (cart drawer open)',
    hints: [
      'Which button is the most visually dominant?',
      'The announcement bar promised free shipping on "some orders". How close is this cart?',
      'What does this field invite the shopper to go and do?',
      'How much space does the upsell take compared to the checkout?',
      'What reassurance is missing right before payment?',
    ],
    answerKey: [
      {
        flaw: 'Inverted button hierarchy: "Continue Shopping" is big and solid while "Checkout" is a small outline button.',
        fix: 'Make Checkout the full-width primary button and demote Continue Shopping to a text link (or the drawer close X).',
      },
      {
        flaw: 'There is no free-shipping progress bar, and "Shipping calculated at checkout" leaves the cost a surprise (the #1 cause of cart abandonment).',
        fix: 'Add a progress bar: "You\'re $13 away from free shipping", computed from cart.total_price against a threshold in theme settings and re-rendered on every cart change.',
      },
      {
        flaw: 'A prominent discount-code field sends shoppers off to coupon sites.',
        fix: 'Collapse it behind a subtle "Have a code?" link, or move it to checkout, and auto-apply active promos via /discount/CODE links or Shopify Functions.',
      },
      {
        flaw: 'A large "Complete the look" upsell pushes the checkout CTA off-screen, and the quantity controls are tiny.',
        fix: 'Turn the upsell into a single compact horizontal row (Product Recommendations API, intent=complementary) below the CTA, and use 44px quantity steppers.',
      },
      {
        flaw: 'No trust signals or express checkout before payment.',
        fix: 'Add payment icons (shop.enabled_payment_types), a secure-checkout line, and Shop Pay / Apple Pay express buttons in the drawer.',
      },
    ],
  },
];

/* ---------- Hint pin ---------- */
interface PinProps {
  n: number;
  text: string;
  show: boolean;
  open: boolean;
  onToggle: () => void;
  className?: string;
  children: React.ReactNode;
}

const Flaw: React.FC<PinProps> = ({ n, text, show, open, onToggle, className = '', children }) => (
  <div className={`ms-flaw${show ? ' is-hinted' : ''} ${className}`}>
    {children}
    {show && (
      <button
        type="button"
        className={`ms-pin${open ? ' is-open' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        aria-label={`Hint ${n}`}
        aria-expanded={open}
      >
        {n}
      </button>
    )}
    {show && open && (
      <div className="ms-tip" role="tooltip">
        <strong>Hint {n}</strong>
        {text}
      </div>
    )}
  </div>
);

/* ---------- Shared desktop chrome ---------- */
const DesktopHeader: React.FC = () => (
  <>
    <div className="ms-announce">FREE SHIPPING ON SOME ORDERS* · NEW DROP · SALE</div>
    <div className="ms-header">
      <nav className="ms-nav">
        <span>Shop</span>
        <span>Explore</span>
        <span>Journal</span>
        <span>Community</span>
      </nav>
      <div className="ms-logo">LOOM &amp; LANE</div>
      <div className="ms-icons">
        <Search size={16} />
        <User size={16} />
        <ShoppingBag size={16} />
      </div>
    </div>
  </>
);

const PRODUCTS = [
  { name: 'Linen Camp Shirt', price: '$68', bg: 'linear-gradient(160deg,#e9dcc6,#cdb79a)', emoji: '👔', h: 150, soldOut: true },
  { name: 'Relaxed Chino', price: '$84', bg: 'linear-gradient(160deg,#c9d3c0,#9fae93)', emoji: '👖', h: 190, soldOut: true },
  { name: 'Cotton Crew Tee', price: null, bg: 'linear-gradient(160deg,#f3e3e0,#dcb8b1)', emoji: '👕', h: 130 },
  { name: 'Wrap Midi Dress', price: '$112', bg: 'linear-gradient(160deg,#d6dbe8,#a9b3cc)', emoji: '👗', h: 175 },
  { name: 'Merino Cardigan', price: '$129', bg: 'linear-gradient(160deg,#e7d7ea,#c4a8cb)', emoji: '🧥', h: 160 },
  { name: 'Canvas Tote', price: null, bg: 'linear-gradient(160deg,#ece6d4,#cfc29c)', emoji: '👜', h: 120 },
  { name: 'Wide Leg Trouser', price: '$96', bg: 'linear-gradient(160deg,#d9e4e1,#a7c2bb)', emoji: '👖', h: 185 },
  { name: 'Bucket Hat', price: '$38', bg: 'linear-gradient(160deg,#f1e2c8,#d8b77f)', emoji: '👒', h: 140 },
];

/* ---------- Main component ---------- */
interface MockApparelStoreProps {
  active: MockSurfaceKey;
  onSelect: (key: MockSurfaceKey) => void;
  showHints: boolean;
  doneKeys: Set<MockSurfaceKey>;
}

export const MockApparelStore: React.FC<MockApparelStoreProps> = ({ active, onSelect, showHints, doneKeys }) => {
  const [openPin, setOpenPin] = useState<string | null>(null);
  const meta = APPAREL_SURFACES.find((s) => s.key === active)!;

  const pin = (n: number) => ({
    n,
    text: meta.hints[n - 1],
    show: showHints,
    open: openPin === `${active}-${n}`,
    onToggle: () => setOpenPin((p) => (p === `${active}-${n}` ? null : `${active}-${n}`)),
  });

  const renderSurface = () => {
    switch (active) {
      case 'home':
        return (
          <div className="ms-page">
            <DesktopHeader />
            <div className="ms-hero">
              <div className="ms-hero-art" aria-hidden="true">
                🌾
              </div>
              <Flaw {...pin(1)} className="ms-hero-copy">
                <h3 className="ms-hero-title">Be The Moment.</h3>
                <p className="ms-hero-sub">A new era of you.</p>
              </Flaw>
              <Flaw {...pin(2)}>
                <span className="ms-ghost-btn">Discover</span>
              </Flaw>
              <Flaw {...pin(3)} className="ms-dots-wrap">
                <div className="ms-dots">
                  <span className="is-on" />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="ms-autoplay">⟳ auto-advances every 3s</div>
              </Flaw>
            </div>
            <Flaw {...pin(4)} className="ms-fold">
              <div className="ms-fold-line">
                <span>— fold (1080px viewport) —</span>
              </div>
              <div className="ms-below">Featured products start here ↓</div>
            </Flaw>
          </div>
        );

      case 'mobile-nav':
        return (
          <div className="ms-phone-stage">
            <div className="ms-phone">
              <div className="ms-phone-notch" />
              <Flaw {...pin(1)} className="ms-m-header-wrap">
                <div className="ms-m-announce">FREE SHIPPING ON SOME ORDERS* · NEW DROP</div>
                <div className="ms-m-header">
                  <Menu size={18} />
                  <div className="ms-m-logo">LOOM &amp; LANE</div>
                  <Flaw {...pin(4)}>
                    <ShoppingBag size={18} />
                  </Flaw>
                </div>
              </Flaw>
              <div className="ms-m-drawer">
                <div className="ms-m-drawer-head">
                  <X size={14} /> Menu
                </div>
                <Flaw {...pin(3)} className="ms-m-links">
                  {['Women', 'Men', 'Kids', 'Accessories', 'Collections', 'Lookbook'].map((l) => (
                    <div key={l} className="ms-m-link">
                      {l} <ChevronRight size={10} />
                    </div>
                  ))}
                  <div className="ms-m-sub">Women › Tops › Shirts › Linen</div>
                  {['Journal', 'Sustainability', 'Gift Cards', 'Stores', 'Help', 'Account'].map((l) => (
                    <div key={l} className="ms-m-link is-plain">
                      {l}
                    </div>
                  ))}
                </Flaw>
                <Flaw {...pin(2)}>
                  <div className="ms-m-search">
                    <Search size={11} /> Search
                  </div>
                </Flaw>
              </div>
            </div>
          </div>
        );

      case 'collection':
        return (
          <div className="ms-page">
            <DesktopHeader />
            <div className="ms-coll-head">
              <h3>All Products</h3>
              <Flaw {...pin(1)}>
                <div className="ms-coll-meta">148 products</div>
              </Flaw>
            </div>
            <div className="ms-grid">
              {PRODUCTS.map((p, i) => {
                const card = (
                  <div className="ms-card">
                    <div className="ms-card-img" style={{ background: p.bg, height: p.h }}>
                      <span>{p.emoji}</span>
                      {p.soldOut && <em className="ms-soldout">Sold out</em>}
                    </div>
                    <div className="ms-card-name">{p.name}</div>
                    <div className="ms-card-price">{p.price ?? <span className="ms-muted">View details</span>}</div>
                  </div>
                );
                if (i === 0)
                  return (
                    <Flaw key={i} {...pin(2)}>
                      {card}
                    </Flaw>
                  );
                if (i === 1)
                  return (
                    <Flaw key={i} {...pin(3)}>
                      {card}
                    </Flaw>
                  );
                if (i === 2)
                  return (
                    <Flaw key={i} {...pin(4)}>
                      {card}
                    </Flaw>
                  );
                return <React.Fragment key={i}>{card}</React.Fragment>;
              })}
            </div>
            <div className="ms-pagination">‹ Page 1 of 13 ›</div>
          </div>
        );

      case 'pdp':
        return (
          <div className="ms-page">
            <DesktopHeader />
            <div className="ms-pdp">
              <div className="ms-pdp-gallery">
                <div className="ms-pdp-img">
                  <span>👔</span>
                  <Heart size={16} className="ms-pdp-heart" />
                </div>
              </div>
              <div className="ms-pdp-info">
                <Flaw {...pin(1)}>
                  <h3 className="ms-pdp-title">The Everyday Linen Shirt</h3>
                </Flaw>
                <div className="ms-pdp-price">$68.00</div>
                <Flaw {...pin(2)}>
                  <p className="ms-pdp-desc">
                    Crafted from 100% European flax linen that has been garment-washed for a lived-in softness from the very
                    first wear, the Everyday Linen Shirt is our love letter to slow summers. Linen is one of the oldest
                    textiles in the world, and our mill in Portugal has been weaving it for four generations using
                    low-impact processes. The relaxed camp collar, coconut-shell buttons and a slightly dropped shoulder
                    give it an effortless drape, while the straight hem means it works tucked or untucked. Model is 6&apos;1&quot;
                    and wears a size M. Care: machine wash cold, line dry, warm iron if desired…
                  </p>
                </Flaw>
                <div className="ms-pdp-label">Color: Sand</div>
                <Flaw {...pin(3)}>
                  <div className="ms-select">
                    Select size <ChevronDown size={13} />
                  </div>
                </Flaw>
                <Flaw {...pin(4)}>
                  <div className="ms-atc">Add to bag</div>
                </Flaw>
                <Flaw {...pin(5)}>
                  <div className="ms-accordion">
                    Shipping &amp; Returns <Plus size={13} />
                  </div>
                </Flaw>
              </div>
            </div>
          </div>
        );

      case 'cart':
        return (
          <div className="ms-page ms-page-cart">
            <DesktopHeader />
            <div className="ms-cart-scrim" />
            <aside className="ms-drawer">
              <div className="ms-drawer-head">
                <span>Your Bag (2)</span>
                <X size={15} />
              </div>
              <div className="ms-drawer-body">
                {[
                  { n: 'Everyday Linen Shirt', v: 'Sand / M', p: '$68.00', e: '👔' },
                  { n: 'Bucket Hat', v: 'Natural', p: '$38.00', e: '👒' },
                ].map((it) => (
                  <div key={it.n} className="ms-line">
                    <div className="ms-line-img">{it.e}</div>
                    <div className="ms-line-info">
                      <div className="ms-line-name">{it.n}</div>
                      <div className="ms-muted">{it.v}</div>
                      <div className="ms-qty">
                        <Minus size={8} /> 1 <Plus size={8} />
                      </div>
                    </div>
                    <div className="ms-line-price">{it.p}</div>
                  </div>
                ))}

                <Flaw {...pin(4)}>
                  <div className="ms-upsell">
                    <div className="ms-upsell-title">Complete the look ✨</div>
                    <div className="ms-upsell-row">
                      {['👖', '🧥', '👜'].map((e) => (
                        <div key={e} className="ms-upsell-item">
                          <span>{e}</span>
                          <small>Add +</small>
                        </div>
                      ))}
                    </div>
                  </div>
                </Flaw>

                <Flaw {...pin(3)}>
                  <div className="ms-discount">
                    <span>Discount code</span>
                    <b>Apply</b>
                  </div>
                </Flaw>

                <Flaw {...pin(2)}>
                  <div className="ms-totals">
                    <div>
                      <span>Subtotal</span>
                      <b>$106.00</b>
                    </div>
                    <div className="ms-muted">Shipping calculated at checkout</div>
                  </div>
                </Flaw>

                <Flaw {...pin(1)}>
                  <div className="ms-cart-btns">
                    <div className="ms-continue">CONTINUE SHOPPING</div>
                    <div className="ms-checkout">Checkout</div>
                  </div>
                </Flaw>
                <Flaw {...pin(5)}>
                  <div className="ms-no-trust" aria-hidden="true" />
                </Flaw>
              </div>
            </aside>
          </div>
        );
    }
  };

  return (
    <div className="ms-root">
      {/* Surface tabs */}
      <div className="ms-tabs" role="tablist" aria-label="Store surfaces">
        {APPAREL_SURFACES.map((s, i) => (
          <button
            key={s.key}
            id={`ms-tab-${s.key}`}
            type="button"
            role="tab"
            aria-selected={active === s.key}
            className={`ms-tab${active === s.key ? ' is-active' : ''}${doneKeys.has(s.key) ? ' is-done' : ''}`}
            onClick={() => {
              setOpenPin(null);
              onSelect(s.key);
            }}
          >
            <span className="ms-tab-emoji">{doneKeys.has(s.key) ? '✅' : s.emoji}</span>
            <span className="ms-tab-label">
              <small>Surface {i + 1}</small>
              {s.tab}
            </span>
          </button>
        ))}
      </div>

      {/* Browser frame */}
      <div className="ms-browser">
        <div className="ms-browser-bar">
          <div className="ms-browser-dots">
            <span />
            <span />
            <span />
          </div>
          <div className="ms-browser-url">
            <Lock size={10} /> {meta.url}
          </div>
          <div className="ms-browser-rating" title="Store snapshot">
            <Star size={10} /> CVR 2.1%
          </div>
        </div>
        <div className="ms-viewport" key={active}>
          {renderSurface()}
        </div>
      </div>
    </div>
  );
};
