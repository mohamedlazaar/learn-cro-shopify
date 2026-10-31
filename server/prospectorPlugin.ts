// Lead Prospector — server-side store scanner (runs inside the Vite dev/preview server).
// Browsers cannot fetch arbitrary storefronts because of CORS, so the scan happens here.
// Every number returned by this module comes from a live, verifiable source:
//   - Storefront HTML            → Shopify detection, theme, installed apps, CRO features
//   - /meta.json                 → official product/collection counts, country, currency
//   - /products.json             → price distribution, catalog depth, freshness, content quality
//   - Tranco list API            → research-grade global popularity rank (traffic proxy)
//   - PageSpeed Insights / CrUX  → lab performance + real-user field data (only exists with real traffic)
import type { Plugin, Connect } from 'vite';
import type { ServerResponse } from 'node:http';

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

interface AppSignature {
  name: string;
  category: 'reviews' | 'upsell' | 'email' | 'bnpl' | 'subscriptions' | 'chat' | 'loyalty' | 'search' | 'testing' | 'analytics' | 'pagebuilder' | 'shipping-bar';
  patterns: RegExp[];
}

const APP_SIGNATURES: AppSignature[] = [
  { name: 'Judge.me', category: 'reviews', patterns: [/judge\.me/i, /jdgm/i] },
  { name: 'Yotpo', category: 'reviews', patterns: [/yotpo/i] },
  { name: 'Okendo', category: 'reviews', patterns: [/okendo/i] },
  { name: 'Loox', category: 'reviews', patterns: [/loox\.io/i, /loox-/i] },
  { name: 'Stamped', category: 'reviews', patterns: [/stamped\.io/i] },
  { name: 'Junip', category: 'reviews', patterns: [/junip/i] },
  { name: 'Reviews.io', category: 'reviews', patterns: [/reviews\.io/i, /reviewsio/i] },
  { name: 'Trustpilot', category: 'reviews', patterns: [/trustpilot/i] },
  { name: 'Rebuy', category: 'upsell', patterns: [/rebuyengine/i, /rebuy-/i] },
  { name: 'ReConvert', category: 'upsell', patterns: [/reconvert/i] },
  { name: 'Frequently Bought Together', category: 'upsell', patterns: [/frequently-bought|codeblackbelt/i] },
  { name: 'Zipify OCU', category: 'upsell', patterns: [/zipify/i] },
  { name: 'UpCart', category: 'upsell', patterns: [/upcart/i] },
  { name: 'Kaching Bundles', category: 'upsell', patterns: [/kaching/i] },
  { name: 'Bold Upsell', category: 'upsell', patterns: [/boldapps.*upsell|bold-upsell/i] },
  { name: 'Klaviyo', category: 'email', patterns: [/klaviyo/i] },
  { name: 'Omnisend', category: 'email', patterns: [/omnisend/i] },
  { name: 'Privy', category: 'email', patterns: [/privy\.com/i] },
  { name: 'Attentive', category: 'email', patterns: [/attentive|attn\.tv/i] },
  { name: 'Postscript', category: 'email', patterns: [/postscript\.io/i] },
  { name: 'Klarna', category: 'bnpl', patterns: [/klarna/i] },
  { name: 'Afterpay', category: 'bnpl', patterns: [/afterpay|clearpay/i] },
  { name: 'Shop Pay Installments', category: 'bnpl', patterns: [/shopify-installments|shop-pay-installments|installments-banner/i] },
  { name: 'Affirm', category: 'bnpl', patterns: [/affirm\.com/i] },
  { name: 'Recharge', category: 'subscriptions', patterns: [/rechargepayments|rechargeapps/i] },
  { name: 'Skio', category: 'subscriptions', patterns: [/skio/i] },
  { name: 'Gorgias', category: 'chat', patterns: [/gorgias/i] },
  { name: 'Tidio', category: 'chat', patterns: [/tidio/i] },
  { name: 'Zendesk', category: 'chat', patterns: [/zdassets|zendesk/i] },
  { name: 'Shopify Inbox', category: 'chat', patterns: [/shopify-chat|inbox\.shopify/i] },
  { name: 'Smile.io', category: 'loyalty', patterns: [/smile\.io|smile-ui/i] },
  { name: 'LoyaltyLion', category: 'loyalty', patterns: [/loyaltylion/i] },
  { name: 'Searchanise', category: 'search', patterns: [/searchanise/i] },
  { name: 'Boost Commerce', category: 'search', patterns: [/boostcommerce|bc-sf-filter/i] },
  { name: 'Algolia', category: 'search', patterns: [/algolia/i] },
  { name: 'Intelligems', category: 'testing', patterns: [/intelligems/i] },
  { name: 'Shoplift', category: 'testing', patterns: [/shoplift/i] },
  { name: 'VWO', category: 'testing', patterns: [/visualwebsiteoptimizer|vwo_/i] },
  { name: 'Convert', category: 'testing', patterns: [/convertexperiments|cdn-\d\.convertexperiments/i] },
  { name: 'Hotjar', category: 'analytics', patterns: [/hotjar/i] },
  { name: 'Microsoft Clarity', category: 'analytics', patterns: [/clarity\.ms/i] },
  { name: 'Lucky Orange', category: 'analytics', patterns: [/luckyorange/i] },
  { name: 'Triple Whale', category: 'analytics', patterns: [/triplewhale|triple-pixel/i] },
  { name: 'GemPages', category: 'pagebuilder', patterns: [/gempages/i] },
  { name: 'PageFly', category: 'pagebuilder', patterns: [/pagefly/i] },
  { name: 'Shogun', category: 'pagebuilder', patterns: [/getshogun|shogun-/i] },
  { name: 'Hextom Free Shipping Bar', category: 'shipping-bar', patterns: [/hextom|fsb-/i] },
];

interface ScanResult {
  domain: string;
  finalUrl: string;
  reachable: boolean;
  isShopify: boolean;
  detectedPlatform?: string;
  error?: string;
  shop: {
    name?: string;
    myshopifyDomain?: string;
    country?: string;
    currency?: string;
    publishedProducts?: number;
    publishedCollections?: number;
    shipsToCountries?: number;
    description?: string;
  };
  theme: { name?: string; schemaName?: string; isDawnFamily: boolean };
  catalog: {
    sampled: number;
    medianPrice?: number;
    avgPrice?: number;
    minPrice?: number;
    maxPrice?: number;
    p25Price?: number;
    p75Price?: number;
    pctOnSale?: number;
    avgImagesPerProduct?: number;
    avgVariantsPerProduct?: number;
    avgDescriptionWords?: number;
    pctThinDescriptions?: number;
    newestProductDays?: number;
    lastUpdatedDays?: number;
    productsAddedLast90d?: number;
    topProductTypes: { type: string; count: number }[];
    sampleProducts: { title: string; price: number; handle: string; image?: string }[];
  };
  apps: { name: string; category: string }[];
  signals: {
    hasReviews: boolean;
    hasUpsell: boolean;
    hasBnpl: boolean;
    hasSubscriptions: boolean;
    hasEmailCapture: boolean;
    hasLiveChat: boolean;
    hasLoyalty: boolean;
    hasAbTesting: boolean;
    hasHeatmaps: boolean;
    hasFreeShippingMessage: boolean;
    freeShippingThreshold?: number;
    hasShopPay: boolean;
    hasSocialLinks: number;
    hasPoweredByShopify: boolean;
    hasAnnouncementBar: boolean;
    hasStickyHeader: boolean;
    hasCarouselSlider: boolean;
    hasCustomTypography: boolean;
    hasFavicon: boolean;
    navItemCount: number;
    htmlKb: number;
    scriptCount: number;
    thirdPartyScriptCount: number;
  };
  popularity: { trancoRank?: number; trancoDate?: string };
  scannedAt: string;
}

async function fetchWithTimeout(url: string, ms: number, init: RequestInit = {}): Promise<Response> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, {
      ...init,
      redirect: 'follow',
      signal: ctrl.signal,
      headers: { 'User-Agent': UA, Accept: '*/*', 'Accept-Language': 'en-US,en;q=0.9', ...(init.headers || {}) },
    });
  } finally {
    clearTimeout(t);
  }
}

function normalizeDomain(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/.*$/, '');
}

function percentile(sorted: number[], p: number): number {
  if (!sorted.length) return 0;
  const idx = Math.min(sorted.length - 1, Math.max(0, Math.round((p / 100) * (sorted.length - 1))));
  return sorted[idx];
}

function daysSince(iso?: string): number | undefined {
  if (!iso) return undefined;
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return undefined;
  return Math.max(0, Math.round((Date.now() - t) / 86400000));
}

function round(n: number, d = 2): number {
  const f = 10 ** d;
  return Math.round(n * f) / f;
}

async function getTrancoRank(domain: string): Promise<{ rank?: number; date?: string }> {
  try {
    const res = await fetchWithTimeout(`https://tranco-list.eu/api/ranks/domain/${domain}`, 8000, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return {};
    const data = (await res.json()) as { ranks?: { date: string; rank: number }[] };
    const latest = data.ranks?.[0];
    return latest ? { rank: latest.rank, date: latest.date } : {};
  } catch {
    return {};
  }
}

async function scanStore(rawDomain: string): Promise<ScanResult> {
  const domain = normalizeDomain(rawDomain);
  const result: ScanResult = {
    domain,
    finalUrl: `https://${domain}`,
    reachable: false,
    isShopify: false,
    shop: {},
    theme: { isDawnFamily: false },
    catalog: { sampled: 0, topProductTypes: [], sampleProducts: [] },
    apps: [],
    signals: {
      hasReviews: false, hasUpsell: false, hasBnpl: false, hasSubscriptions: false, hasEmailCapture: false,
      hasLiveChat: false, hasLoyalty: false, hasAbTesting: false, hasHeatmaps: false, hasFreeShippingMessage: false,
      hasShopPay: false, hasSocialLinks: 0, hasPoweredByShopify: false, hasAnnouncementBar: false,
      hasStickyHeader: false, hasCarouselSlider: false, hasCustomTypography: false, hasFavicon: false,
      navItemCount: 0, htmlKb: 0, scriptCount: 0, thirdPartyScriptCount: 0,
    },
    popularity: {},
    scannedAt: new Date().toISOString(),
  };

  const trancoPromise = getTrancoRank(domain);

  // 1) Homepage HTML
  let html = '';
  try {
    const res = await fetchWithTimeout(`https://${domain}/`, 15000, { headers: { Accept: 'text/html' } });
    result.finalUrl = res.url || result.finalUrl;
    html = await res.text();
    result.reachable = res.ok || html.length > 500;
    const poweredBy = res.headers.get('powered-by') || '';
    const shopId = res.headers.get('x-shopid') || res.headers.get('x-shopify-stage') || res.headers.get('x-sorting-hat-shopid');
    result.isShopify =
      /shopify/i.test(poweredBy) ||
      Boolean(shopId) ||
      /cdn\.shopify\.com|Shopify\.shop\s*=|window\.Shopify|Shopify\.theme|Shopify\.routes|ShopifyAnalytics|\/shopify-features|myshopify\.com|data-shopify|shopify-payment-button/i.test(html);

    // If not immediately obvious in HTML, try probing /meta.json as fallback
    if (!result.isShopify && result.reachable) {
      try {
        const origin = new URL(result.finalUrl).origin;
        const metaRes = await fetchWithTimeout(`${origin}/meta.json`, 5000, { headers: { Accept: 'application/json' } });
        if (metaRes.ok) {
          const m = (await metaRes.json()) as Record<string, unknown>;
          if (m && (m.myshopify_domain || m.name || m.currency)) {
            result.isShopify = true;
          }
        }
      } catch {}
    }
  } catch (e) {
    result.error = e instanceof Error ? e.message : 'Unreachable';
    result.popularity = await trancoPromise.then((t) => ({ trancoRank: t.rank, trancoDate: t.date }));
    return result;
  }

  if (!result.isShopify) {
    if (/wp-content|wp-includes|woocommerce|wc-ajax/i.test(html)) {
      result.detectedPlatform = 'WordPress / WooCommerce';
    } else if (/static1\.squarespace\.com|squarespace/i.test(html)) {
      result.detectedPlatform = 'Squarespace';
    } else if (/wix\.com|parastorage/i.test(html)) {
      result.detectedPlatform = 'Wix';
    } else if (/bigcommerce\.com|stencil/i.test(html)) {
      result.detectedPlatform = 'BigCommerce';
    } else if (/mage\/|magento/i.test(html)) {
      result.detectedPlatform = 'Magento';
    } else {
      result.detectedPlatform = 'Non-Shopify Custom Platform';
    }
    result.error = `Not running on Shopify (Detected: ${result.detectedPlatform})`;
    result.popularity = await trancoPromise.then((t) => ({ trancoRank: t.rank, trancoDate: t.date }));
    return result;
  }

  // Theme
  const themeMatch = html.match(/Shopify\.theme\s*=\s*(\{[^;]+\})/);
  if (themeMatch) {
    try {
      const theme = JSON.parse(themeMatch[1]) as { name?: string; schema_name?: string };
      result.theme.name = theme.name;
      result.theme.schemaName = theme.schema_name ?? undefined;
    } catch {
      const n = themeMatch[1].match(/"name":"([^"]+)"/);
      if (n) result.theme.name = n[1];
    }
  }
  const themeId = `${result.theme.schemaName || ''} ${result.theme.name || ''}`;
  result.theme.isDawnFamily = /dawn|refresh|sense|craft|crave|studio|taste|colorblock|ride|origin|spotlight|trade|publisher|horizon/i.test(themeId);

  // Apps & signals
  const seen = new Set<string>();
  for (const sig of APP_SIGNATURES) {
    if (sig.patterns.some((p) => p.test(html)) && !seen.has(sig.name)) {
      seen.add(sig.name);
      result.apps.push({ name: sig.name, category: sig.category });
    }
  }
  const has = (cat: string) => result.apps.some((a) => a.category === cat);
  const s = result.signals;
  s.hasReviews = has('reviews');
  s.hasUpsell = has('upsell');
  s.hasBnpl = has('bnpl');
  s.hasSubscriptions = has('subscriptions');
  s.hasEmailCapture = has('email');
  s.hasLiveChat = has('chat');
  s.hasLoyalty = has('loyalty');
  s.hasAbTesting = has('testing');
  s.hasHeatmaps = result.apps.some((a) => ['Hotjar', 'Microsoft Clarity', 'Lucky Orange'].includes(a.name));
  s.hasShopPay = /shop-pay|shopify-payment-button|shop_pay/i.test(html);
  const text = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ');
  const fsMatch = text.match(/free\s+(?:standard\s+|express\s+)?shipping[^.]{0,40}?(?:over|on orders (?:over|above)|above|\+)\s*[$£€]?\s?(\d{2,4})/i)
    || text.match(/[$£€]\s?(\d{2,4})\+?\s*(?:for\s+)?free\s+shipping/i);
  s.hasFreeShippingMessage = /free\s+(?:standard\s+|express\s+)?shipping/i.test(text) || has('shipping-bar');
  if (fsMatch) s.freeShippingThreshold = Number(fsMatch[1]);
  s.hasSocialLinks = ['instagram.com', 'tiktok.com', 'facebook.com', 'youtube.com', 'pinterest.com'].filter((d) => html.includes(d)).length;
  s.hasPoweredByShopify = /powered_by_link|powered by shopify/i.test(html) || /rel=["']nofollow["'][^>]*>Powered by Shopify/i.test(html);
  s.hasAnnouncementBar = /announcement-bar|announcement_bar|announcementbar/i.test(html);
  s.hasStickyHeader = /header--sticky|sticky-header|header-sticky|position:\s*sticky/i.test(html);
  s.hasCarouselSlider = /flickity|swiper|slick-slider|slideshow|splide/i.test(html);
  s.hasCustomTypography = /fonts\.googleapis\.com|use\.typekit\.net|fonts\.shopifycdn\.com|@font-face/i.test(html);
  s.hasFavicon = /<link[^>]+rel=["'](?:shortcut )?icon["']/i.test(html);
  const headerMatch = html.match(/<header[\s\S]*?<\/header>/i) || html.match(/<nav[\s\S]*?<\/nav>/i);
  s.navItemCount = headerMatch ? (headerMatch[0].match(/<a[\s>]/gi) || []).length : 0;
  s.htmlKb = Math.round(html.length / 1024);
  const scripts = html.match(/<script[^>]*src=["']([^"']+)["']/gi) || [];
  s.scriptCount = (html.match(/<script/gi) || []).length;
  s.thirdPartyScriptCount = scripts.filter((tag) => !/cdn\.shopify\.com|\/cdn\/|shopify/i.test(tag) && !tag.includes(domain)).length;

  const origin = new URL(result.finalUrl).origin;

  // 2) meta.json (official counts)
  try {
    const res = await fetchWithTimeout(`${origin}/meta.json`, 10000, { headers: { Accept: 'application/json' } });
    if (res.ok) {
      const m = (await res.json()) as Record<string, unknown>;
      result.shop = {
        name: m.name as string | undefined,
        myshopifyDomain: m.myshopify_domain as string | undefined,
        country: m.country as string | undefined,
        currency: m.currency as string | undefined,
        publishedProducts: m.published_products_count as number | undefined,
        publishedCollections: m.published_collections_count as number | undefined,
        shipsToCountries: Array.isArray(m.ships_to_countries) ? (m.ships_to_countries as unknown[]).length : undefined,
        description: typeof m.description === 'string' ? (m.description as string).slice(0, 240) : undefined,
      };
    }
  } catch { /* optional */ }

  // 3) products.json (up to 3 pages = 750 products)
  interface RawVariant { price: string; compare_at_price: string | null }
  interface RawProduct {
    title: string; handle: string; body_html: string | null; product_type: string;
    created_at: string; updated_at: string; published_at: string;
    variants: RawVariant[]; images: { src: string }[];
  }
  const products: RawProduct[] = [];
  for (let page = 1; page <= 3; page++) {
    try {
      const res = await fetchWithTimeout(`${origin}/products.json?limit=250&page=${page}`, 12000, { headers: { Accept: 'application/json' } });
      if (!res.ok) break;
      const data = (await res.json()) as { products?: RawProduct[] };
      const batch = data.products || [];
      products.push(...batch);
      if (batch.length < 250) break;
    } catch {
      break;
    }
  }

  if (products.length) {
    const prices = products
      .map((p) => Math.min(...p.variants.map((v) => parseFloat(v.price)).filter((n) => !Number.isNaN(n) && n > 0)))
      .filter((n) => Number.isFinite(n) && n > 0)
      .sort((a, b) => a - b);
    const onSale = products.filter((p) => p.variants.some((v) => v.compare_at_price && parseFloat(v.compare_at_price) > parseFloat(v.price))).length;
    const words = products.map((p) => (p.body_html || '').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length);
    const typeCounts: Record<string, number> = {};
    for (const p of products) {
      const t = (p.product_type || 'Uncategorized').trim() || 'Uncategorized';
      typeCounts[t] = (typeCounts[t] || 0) + 1;
    }
    const created = products.map((p) => Date.parse(p.published_at || p.created_at)).filter((n) => !Number.isNaN(n));
    const updated = products.map((p) => Date.parse(p.updated_at)).filter((n) => !Number.isNaN(n));
    const ninetyAgo = Date.now() - 90 * 86400000;

    result.catalog = {
      sampled: products.length,
      medianPrice: prices.length ? round(percentile(prices, 50)) : undefined,
      avgPrice: prices.length ? round(prices.reduce((a, b) => a + b, 0) / prices.length) : undefined,
      minPrice: prices[0],
      maxPrice: prices[prices.length - 1],
      p25Price: prices.length ? round(percentile(prices, 25)) : undefined,
      p75Price: prices.length ? round(percentile(prices, 75)) : undefined,
      pctOnSale: round((onSale / products.length) * 100, 1),
      avgImagesPerProduct: round(products.reduce((a, p) => a + p.images.length, 0) / products.length, 1),
      avgVariantsPerProduct: round(products.reduce((a, p) => a + p.variants.length, 0) / products.length, 1),
      avgDescriptionWords: Math.round(words.reduce((a, b) => a + b, 0) / words.length),
      pctThinDescriptions: round((words.filter((w) => w < 40).length / words.length) * 100, 1),
      newestProductDays: created.length ? daysSince(new Date(Math.max(...created)).toISOString()) : undefined,
      lastUpdatedDays: updated.length ? daysSince(new Date(Math.max(...updated)).toISOString()) : undefined,
      productsAddedLast90d: created.filter((t) => t >= ninetyAgo).length,
      topProductTypes: Object.entries(typeCounts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([type, count]) => ({ type, count })),
      sampleProducts: products.slice(0, 6).map((p) => ({
        title: p.title,
        handle: p.handle,
        price: parseFloat(p.variants[0]?.price || '0'),
        image: p.images[0]?.src,
      })),
    };
  }

  const t = await trancoPromise;
  result.popularity = { trancoRank: t.rank, trancoDate: t.date };
  return result;
}

interface PsiResult {
  domain: string;
  ok: boolean;
  error?: string;
  performanceScore?: number;
  lcpMs?: number;
  cls?: number;
  tbtMs?: number;
  fcpMs?: number;
  pageWeightKb?: number;
  hasFieldData: boolean;
  fieldOrigin?: boolean;
  field?: { lcpP75?: number; inpP75?: number; clsP75?: number; overall?: string };
}

async function runPsi(rawDomain: string, apiKey?: string): Promise<PsiResult> {
  const domain = normalizeDomain(rawDomain);
  const params = new URLSearchParams({ url: `https://${domain}/`, strategy: 'mobile', category: 'performance' });
  if (apiKey) params.set('key', apiKey);
  try {
    const res = await fetchWithTimeout(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params}`, 70000);
    if (!res.ok) {
      const body = await res.text();
      return { domain, ok: false, hasFieldData: false, error: `PSI ${res.status}: ${body.slice(0, 140)}` };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const d = (await res.json()) as any;
    const audits = d?.lighthouseResult?.audits || {};
    const field = d?.loadingExperience?.metrics ? d.loadingExperience : d?.originLoadingExperience?.metrics ? d.originLoadingExperience : null;
    return {
      domain,
      ok: true,
      performanceScore: d?.lighthouseResult?.categories?.performance?.score != null ? Math.round(d.lighthouseResult.categories.performance.score * 100) : undefined,
      lcpMs: audits['largest-contentful-paint']?.numericValue ? Math.round(audits['largest-contentful-paint'].numericValue) : undefined,
      cls: audits['cumulative-layout-shift']?.numericValue != null ? round(audits['cumulative-layout-shift'].numericValue, 3) : undefined,
      tbtMs: audits['total-blocking-time']?.numericValue ? Math.round(audits['total-blocking-time'].numericValue) : undefined,
      fcpMs: audits['first-contentful-paint']?.numericValue ? Math.round(audits['first-contentful-paint'].numericValue) : undefined,
      pageWeightKb: audits['total-byte-weight']?.numericValue ? Math.round(audits['total-byte-weight'].numericValue / 1024) : undefined,
      hasFieldData: Boolean(field),
      fieldOrigin: field ? field === d?.originLoadingExperience : undefined,
      field: field
        ? {
            lcpP75: field.metrics?.LARGEST_CONTENTFUL_PAINT_MS?.percentile,
            inpP75: field.metrics?.INTERACTION_TO_NEXT_PAINT?.percentile,
            clsP75: field.metrics?.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile != null ? field.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile / 100 : undefined,
            overall: field.overall_category,
          }
        : undefined,
    };
  } catch (e) {
    return { domain, ok: false, hasFieldData: false, error: e instanceof Error ? e.message : 'PSI failed' };
  }
}

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

export function prospectorPlugin(env: Record<string, string>): Plugin {
  const psiKey = env.VITE_PSI_API_KEY || env.PSI_API_KEY || undefined;

  const middleware: Connect.NextHandleFunction = (req, res, next) => {
    if (!req.url || !req.url.startsWith('/api/prospect/')) return next();
    const url = new URL(req.url, 'http://localhost');
    const domain = url.searchParams.get('domain');
    if (!domain) return sendJson(res, 400, { error: 'domain query param required' });

    if (url.pathname === '/api/prospect/scan') {
      scanStore(domain).then((r) => sendJson(res, 200, r)).catch((e) => sendJson(res, 500, { error: String(e) }));
      return;
    }
    if (url.pathname === '/api/prospect/psi') {
      runPsi(domain, psiKey).then((r) => sendJson(res, 200, r)).catch((e) => sendJson(res, 500, { error: String(e) }));
      return;
    }
    return sendJson(res, 404, { error: 'unknown endpoint' });
  };

  return {
    name: 'cro-lab-prospector',
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}
