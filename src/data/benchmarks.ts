export interface IndustryBenchmark {
  vertical: string;
  cvrAverage: number; // e.g. 2.4%
  cvrTop10: number; // e.g. 4.2%
  aovAverage: number; // e.g. $82.00
  aovTop10: number; // e.g. $145.00
  cartAbandonmentAverage: number; // e.g. 69.5%
  checkoutAbandonmentAverage: number; // e.g. 48.0%
}

export const INDUSTRY_BENCHMARKS: Record<string, IndustryBenchmark> = {
  apparel: {
    vertical: 'Apparel & Fashion',
    cvrAverage: 2.2,
    cvrTop10: 4.1,
    aovAverage: 85,
    aovTop10: 160,
    cartAbandonmentAverage: 72.0,
    checkoutAbandonmentAverage: 46.5,
  },
  beauty: {
    vertical: 'Beauty & Cosmetics',
    cvrAverage: 3.1,
    cvrTop10: 5.6,
    aovAverage: 58,
    aovTop10: 110,
    cartAbandonmentAverage: 65.0,
    checkoutAbandonmentAverage: 42.0,
  },
  electronics: {
    vertical: 'Consumer Electronics',
    cvrAverage: 1.4,
    cvrTop10: 2.8,
    aovAverage: 220,
    aovTop10: 450,
    cartAbandonmentAverage: 76.5,
    checkoutAbandonmentAverage: 54.0,
  },
  home: {
    vertical: 'Home & Furniture',
    cvrAverage: 1.2,
    cvrTop10: 2.6,
    aovAverage: 340,
    aovTop10: 750,
    cartAbandonmentAverage: 78.0,
    checkoutAbandonmentAverage: 58.0,
  },
  food: {
    vertical: 'Food & Beverage',
    cvrAverage: 3.4,
    cvrTop10: 6.2,
    aovAverage: 62,
    aovTop10: 115,
    cartAbandonmentAverage: 63.0,
    checkoutAbandonmentAverage: 38.5,
  },
  general: {
    vertical: 'General DTC Ecommerce',
    cvrAverage: 2.3,
    cvrTop10: 4.0,
    aovAverage: 90,
    aovTop10: 180,
    cartAbandonmentAverage: 70.0,
    checkoutAbandonmentAverage: 48.0,
  },
};

export interface DiagnosticRecommendation {
  severity: 'critical' | 'warning' | 'good';
  metric: string;
  currentValue: string;
  benchmarkValue: string;
  diagnosis: string;
  recommendations: string[];
}

export function diagnoseStoreMetrics(
  cvr: number,
  aov: number,
  cartAbandonment: number,
  checkoutAbandonment: number,
  verticalKey: string = 'general'
): DiagnosticRecommendation[] {
  const bench = INDUSTRY_BENCHMARKS[verticalKey] || INDUSTRY_BENCHMARKS.general;
  const results: DiagnosticRecommendation[] = [];

  // 1. Checkout Abandonment check
  if (checkoutAbandonment > bench.checkoutAbandonmentAverage + 6) {
    results.push({
      severity: 'critical',
      metric: 'Checkout Abandonment Rate',
      currentValue: `${checkoutAbandonment.toFixed(1)}%`,
      benchmarkValue: `${bench.checkoutAbandonmentAverage}%`,
      diagnosis: 'Severe leakage between starting checkout and completing order. Customers want to buy, but encounter friction at the payment/shipping step.',
      recommendations: [
        'Deploy prominent Express Checkout wallets (Shop Pay, Apple Pay, Google Pay) to cut checkout friction.',
        'Eliminate surprise shipping fees by stating thresholds clearly on PDP and Cart Drawer.',
        'Use Checkout Branding API to maintain visual continuity and remove scam-like visual disjoints.',
      ],
    });
  }

  // 2. Cart Abandonment check
  if (cartAbandonment > bench.cartAbandonmentAverage + 5) {
    results.push({
      severity: 'critical',
      metric: 'Cart Abandonment Rate',
      currentValue: `${cartAbandonment.toFixed(1)}%`,
      benchmarkValue: `${bench.cartAbandonmentAverage}%`,
      diagnosis: 'High drop-off after adding products to cart. Shoppers are using the cart as a wishlist or experiencing sticker shock.',
      recommendations: [
        'Replace full /cart page redirects with an AJAX slide-out Cart Drawer to keep users in the browsing flow.',
        'Implement an animated Free Shipping Progress Bar to incentivize order completion.',
        'Display security lock badges and accepted payment icons directly beneath the checkout button.',
      ],
    });
  }

  // 3. Conversion Rate check
  if (cvr < bench.cvrAverage * 0.75) {
    results.push({
      severity: 'warning',
      metric: 'Conversion Rate (CVR)',
      currentValue: `${cvr.toFixed(2)}%`,
      benchmarkValue: `${bench.cvrAverage}%`,
      diagnosis: 'Storewide conversion rate is significantly below vertical average. Traffic is bouncing before establishing purchase intent.',
      recommendations: [
        'Optimize PDP above-the-fold layout: ensure title, price, swatches, and primary CTA are visible without scrolling on mobile.',
        'Add a Sticky Add to Cart bar on mobile powered by IntersectionObserver.',
        'Audit Mobile LCP speed; ensure product hero media has fetchpriority="high" and eager loading.',
      ],
    });
  }

  // 4. AOV check
  if (aov < bench.aovAverage * 0.8) {
    results.push({
      severity: 'warning',
      metric: 'Average Order Value (AOV)',
      currentValue: `$${aov.toFixed(2)}`,
      benchmarkValue: `$${bench.aovAverage}`,
      diagnosis: 'Customers are purchasing single items. You are leaving high-margin basket revenue on the table.',
      recommendations: [
        'Introduce 1-click in-cart complementary cross-sells (< 25% of basket value) directly in the Cart Drawer.',
        'Set a gamified free shipping threshold 15–25% above current AOV.',
        'Deploy volume tiered discounts (Buy 2 save 10%, Buy 3 save 20%) via Shopify Functions.',
      ],
    });
  }

  if (results.length === 0) {
    results.push({
      severity: 'good',
      metric: 'Overall Store Health',
      currentValue: 'Top Quartile',
      benchmarkValue: 'Healthy',
      diagnosis: 'Your metrics align with or outperform standard industry benchmarks! Focus on iterative A/B testing and scaling high-margin VIP cohorts.',
      recommendations: [
        'Build structured 90-day experimentation roadmaps testing high-leverage edge personalization.',
        'Deploy post-purchase 1-click upsell funnels to increase Customer Lifetime Value (LTV).',
      ],
    });
  }

  return results;
}
