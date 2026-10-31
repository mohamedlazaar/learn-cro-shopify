import { PlaygroundSnippet } from '../types/tools';

export const PLAYGROUND_PRESETS: PlaygroundSnippet[] = [
  {
    id: 'sticky-atc',
    title: 'Mobile Sticky Add to Cart Bar',
    description: 'High-converting sticky Add to Cart bar with IntersectionObserver trigger and thumbnail display.',
    liquid: `<!-- Mobile Sticky ATC Section -->
<div class="sticky-atc-container" id="StickyATCBar" aria-label="Quick Add to Cart">
  <div class="sticky-atc-content">
    <div class="sticky-atc-media">
      <img src="{{ product.images.first }}" alt="{{ product.title }}" width="48" height="48" />
      <div class="sticky-atc-details">
        <span class="sticky-atc-title">{{ product.title }}</span>
        <span class="sticky-atc-price">{{ product.price | money }}</span>
      </div>
    </div>
    <button type="button" class="btn-sticky-atc" id="StickySubmitBtn">
      Add to Cart
    </button>
  </div>
</div>

<!-- Primary Hero CTA for testing IntersectionObserver -->
<div style="padding: 40px 20px; text-align: center; border-bottom: 1px dashed #333;">
  <h2>{{ product.title }}</h2>
  <p style="color: #94a3b8;">Scroll down past this primary button to trigger the sticky bar at the bottom!</p>
  <button type="button" class="btn-primary-mock" id="PrimaryMainATC">
    Primary Add to Cart — {{ product.price | money }}
  </button>
</div>

<div style="height: 1200px; padding: 40px 20px; color: #64748b;">
  <h3>Product Specifications & Reviews Section</h3>
  <p>Detailed product description, size chart, customer reviews, and specifications...</p>
</div>`,
    html: '',
    css: `.sticky-atc-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #0f172a;
  border-top: 1px solid #1e293b;
  padding: 12px 16px;
  transform: translateY(100%);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 999;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.4);
}

.sticky-atc-container.is-active {
  transform: translateY(0);
}

.sticky-atc-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 600px;
  margin: 0 auto;
  gap: 12px;
}

.sticky-atc-media {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sticky-atc-media img {
  border-radius: 6px;
  object-fit: cover;
}

.sticky-atc-details {
  display: flex;
  flex-direction: column;
}

.sticky-atc-title {
  font-size: 13px;
  font-weight: 600;
  color: #f8fafc;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
}

.sticky-atc-price {
  font-size: 13px;
  font-weight: 700;
  color: #818cf8;
}

.btn-sticky-atc {
  background: #6366f1;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
}

.btn-sticky-atc:hover {
  background: #4f46e5;
}

.btn-primary-mock {
  background: #6366f1;
  color: white;
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}`,
    js: `// IntersectionObserver logic
const primaryBtn = document.getElementById('PrimaryMainATC');
const stickyBar = document.getElementById('StickyATCBar');

if (primaryBtn && stickyBar) {
  const observer = new IntersectionObserver(([entry]) => {
    // Show sticky bar when primary button is scrolled off screen
    if (!entry.isIntersecting) {
      stickyBar.classList.add('is-active');
    } else {
      stickyBar.classList.remove('is-active');
    }
  }, { threshold: 0 });

  observer.observe(primaryBtn);

  document.getElementById('StickySubmitBtn')?.addEventListener('click', () => {
    alert('Item added to cart via Sticky Bar!');
  });
}`,
  },
  {
    id: 'free-shipping-bar',
    title: 'Free Shipping Progress Bar',
    description: 'Dynamic free shipping threshold progress bar calculating remaining spend to unlock free delivery.',
    liquid: `<!-- Free Shipping Threshold Component -->
{% assign threshold = shop.free_shipping_threshold %}
{% assign current = cart.total_price %}
{% assign remaining = threshold | minus: current %}

<div class="shipping-threshold-card">
  <div class="shipping-threshold-header">
    {% if remaining > 0 %}
      <span>Add <strong>{{ remaining | money }}</strong> more to unlock <strong>FREE Shipping!</strong></span>
    {% else %}
      <span>🎉 <strong>Congratulations!</strong> You have unlocked <strong>FREE Standard Shipping!</strong></span>
    {% endif %}
  </div>
  <div class="shipping-progress-track">
    <div class="shipping-progress-fill" id="progressFill"></div>
  </div>
  <div style="display: flex; justify-content: space-between; margin-top: 6px; font-size: 11px; color: #94a3b8;">
    <span>{{ 0 | money }}</span>
    <span>Threshold: {{ threshold | money }}</span>
  </div>
  
  <div style="margin-top: 16px; display: flex; gap: 8px;">
    <button type="button" class="sim-btn" onclick="simulateAdd(2500)">+ Add $25 Item</button>
    <button type="button" class="sim-btn" onclick="simulateReset()">Reset Cart</button>
  </div>
</div>`,
    html: '',
    css: `.shipping-threshold-card {
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 10px;
  padding: 16px;
  max-width: 440px;
  margin: 20px auto;
  font-family: system-ui, -apple-system, sans-serif;
  color: #f1f5f9;
}

.shipping-threshold-header {
  font-size: 14px;
  margin-bottom: 10px;
  text-align: center;
}

.shipping-progress-track {
  height: 8px;
  background: #334155;
  border-radius: 999px;
  overflow: hidden;
  position: relative;
}

.shipping-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #6366f1, #10b981);
  width: 73%;
  border-radius: 999px;
  transition: width 0.4s ease;
}

.sim-btn {
  background: #1e293b;
  border: 1px solid #334155;
  color: #e2e8f0;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
}
.sim-btn:hover { background: #334155; }`,
    js: `// Interactive simulator for testing thresholds
let currentCartTotal = 5500; // $55.00
const threshold = 7500; // $75.00

function updateUI() {
  const percent = Math.min(100, (currentCartTotal / threshold) * 100);
  const fill = document.getElementById('progressFill');
  if (fill) fill.style.width = percent + '%';
}

window.simulateAdd = function(amount) {
  currentCartTotal += amount;
  updateUI();
};

window.simulateReset = function() {
  currentCartTotal = 0;
  updateUI();
};

updateUI();`,
  },
  {
    id: 'trust-badge-row',
    title: 'Anxiety-Reducing Reassurance Row',
    description: 'Minimalist, high-converting trust badges for returns, warranty, and encrypted checkout.',
    liquid: `<!-- Reassurance Badges Row -->
<div class="reassurance-row">
  <div class="reassurance-item">
    <div class="reassurance-icon">📦</div>
    <div class="reassurance-text">
      <strong>Fast Dispatch</strong>
      <span>Ships in 24 hours</span>
    </div>
  </div>
  <div class="reassurance-item">
    <div class="reassurance-icon">🔄</div>
    <div class="reassurance-text">
      <strong>Free 30-Day Returns</strong>
      <span>Prepaid return label</span>
    </div>
  </div>
  <div class="reassurance-item">
    <div class="reassurance-icon">🔒</div>
    <div class="reassurance-text">
      <strong>Secure Shop Pay</strong>
      <span>256-bit encryption</span>
    </div>
  </div>
</div>`,
    html: '',
    css: `.reassurance-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 12px;
  padding: 14px;
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid #1e293b;
  border-radius: 8px;
  max-width: 500px;
  margin: 20px auto;
}

.reassurance-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.reassurance-icon {
  font-size: 20px;
}

.reassurance-text {
  display: flex;
  flex-direction: column;
}

.reassurance-text strong {
  font-size: 12px;
  color: #f1f5f9;
}

.reassurance-text span {
  font-size: 11px;
  color: #94a3b8;
}`,
    js: `// Reassurance component ready for Liquid template embed`,
  },
];
