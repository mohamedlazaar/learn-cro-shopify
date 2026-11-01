// Lead Prospector service — Design-First Store Discovery & Audit Engine
// Tailored specifically for sweet-spot Shopify stores (300 to 20,000 monthly visitors)
// Focuses on obvious visual design & layout flaws that store owners immediately recognize.

import { callPiApiChat, hasPiApiKey } from './aiService';

/* ------------------------------------------------------------------ */
/* Types mirrored from server/prospectorPlugin.ts                      */
/* ------------------------------------------------------------------ */
export interface ScanResult {
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

export interface PsiResult {
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

export interface Candidate {
  domain: string;
  brand?: string;
  reason?: string;
  source: 'ai' | 'manual';
}

export type GapArea = 'Design' | 'CRO' | 'AOV' | 'Speed';

export interface Gap {
  id: string;
  area: GapArea;
  severity: 'high' | 'medium' | 'low';
  title: string;
  evidence: string;
  visualFix: string;
}

export interface Scores {
  traffic: number; // 0-100 — how closely it fits the 300 - 20,000 monthly visitors sweet spot
  trafficTier: 'Sweet Spot (300–20k)' | 'High (>20k)' | 'Low (<300)' | 'Unverified';
  estimatedMonthlyVisitsRange: string;
  designScore: number; // 0-100 — density of obvious visual/layout flaws store owner can see
  catalog: number; // 0-100 — product catalog quality & real activity
  opportunity: number; // 0-100 — overall fixable redesign & polish score
  fit: number; // 0-100 — overall lead quality for design/redesign outreach
  grade: 'A' | 'B' | 'C' | 'D';
  trafficEvidence: string[];
  designEvidence: string[];
  qualified: boolean;
  disqualifyReason?: string;
}

export interface AiInsight {
  summary: string;
  estimatedMonthlyVisits?: string;
  estimatedMonthlyRevenue?: string;
  revenueAssumptions?: string;
  visualDesignProblems: { flaw: string; whatOwnerSees: string; proposedDesignFix: string; expectedVisualImpact: string }[];
  secondaryOpportunities: { area: string; title: string; fix: string }[];
  quickDesignWins: string[];
  pitchAngle: string;
  coldEmail: { subject: string; body: string };
  redesignOffer: string;
  confidence: 'high' | 'medium' | 'low';
}

export interface Lead {
  id: string;
  candidate: Candidate;
  status: 'queued' | 'scanning' | 'psi' | 'scored' | 'analyzing' | 'done' | 'rejected' | 'error';
  scan?: ScanResult;
  psi?: PsiResult;
  scores?: Scores;
  gaps?: Gap[];
  insight?: AiInsight;
  insightError?: string;
  addedAt: string;
}

export interface DiscoveryCriteria {
  niche: string;
  market: string;
  priceTier: string;
  size: string;
  count: number;
  notes: string;
}

/* ------------------------------------------------------------------ */
/* Network                                                            */
/* ------------------------------------------------------------------ */
export async function scanDomain(domain: string): Promise<ScanResult> {
  const res = await fetch(`/api/prospect/scan?domain=${encodeURIComponent(domain)}`);
  if (!res.ok) throw new Error(`Scanner returned ${res.status}. Is the dev server running?`);
  return res.json();
}

export async function runPageSpeed(domain: string): Promise<PsiResult> {
  const res = await fetch(`/api/prospect/psi?domain=${encodeURIComponent(domain)}`);
  if (!res.ok) throw new Error(`PSI returned ${res.status}`);
  return res.json();
}

export function normalizeDomain(input: string): string {
  return input.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '');
}

function extractJson<T>(raw: string): T | null {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const body = fenced ? fenced[1] : raw;
  const start = body.search(/[[{]/);
  if (start < 0) return null;
  const open = body[start];
  const close = open === '[' ? ']' : '}';
  const end = body.lastIndexOf(close);
  if (end <= start) return null;
  try {
    return JSON.parse(body.slice(start, end + 1)) as T;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* AI Prompt #1 — Discovery Focused on Design Leaks & Sweet-Spot Size  */
/* ------------------------------------------------------------------ */
export const DISCOVERY_SYSTEM_PROMPT = `You are a specialist Shopify design scout and boutique web designer lead researcher.

YOUR PRIMARY GOAL: Find active, authentic direct-to-consumer Shopify stores that fall in the SWEET SPOT:
- Traffic size: roughly between 300 and 20,000 monthly visitors (NOT dead hobby sites, and NOT enterprise giants like Gymshark/Allbirds).
- Products: real, high-quality, authentic products (handmade, boutique apparel, artisanal foods, specialty goods, independent jewelry, pet accessories, niche cosmetics).
- THE BIG REQUIREMENT: They MUST have OBVIOUS, VISIBLE DESIGN FLAWS that the store owner will immediately see and agree they need help fixing.

CLEAR DESIGN FLAWS TO TARGET:
1. Running a default stock theme (Dawn, Debut, Refresh) that looks generic and like a starter template.
2. Cluttered header navigation (too many links wrapping awkwardly onto two lines).
3. The footer still contains the default "Powered by Shopify" text.
4. Auto-rotating hero carousel/slider on mobile that pushes products 800px down.
5. Inconsistent product photo gallery (blurry pictures, mismatched aspect ratios, only 1 photo per item).
6. Missing sticky mobile Add to Cart or clunky mobile product layout.
7. Poor typography hierarchy and lack of visual brand personality.

CRITICAL RULES:
- ONLY real, currently operating SHOPIFY stores. Never invent domain names.
- STRICT PLATFORM REQUIREMENT: The store MUST be built on Shopify (using Shopify Liquid themes, Shopify CDN, and Shopify checkout).
- NEVER return stores built on WooCommerce, WordPress, Squarespace, Wix, BigCommerce, Magento, or custom frameworks. If a brand is not on Shopify, DO NOT include it.
- EXCLUDE enterprise brands (> 50k visits/month) because they have in-house creative agencies and will not hire a freelance designer.
- EXCLUDE empty dropship stores with 1 product from AliExpress.
- Return the domain as "brand.com" without "https://" or paths.

OUTPUT FORMAT:
Respond ONLY with a JSON array:
[{"brand":"Brand Name","domain":"brand.com","reason":"Specific visual design flaw and why they are in the 300-20k visitor sweet spot"}]`;

export async function discoverCandidates(c: DiscoveryCriteria, exclude: string[]): Promise<Candidate[]> {
  if (!hasPiApiKey()) throw new Error('AI discovery needs PIAPI_API_KEY in .env. You can still paste domains manually.');
  const userPrompt = `Find ${Math.max(c.count * 2, 8)} sweet-spot Shopify stores (between 300 and 20,000 monthly visitors) that have clear, visible design and layout flaws.
- Niche: ${c.niche || 'boutique DTC / independent lifestyle brand'}
- Market: ${c.market || 'US / UK / Europe / Canada / Australia'}
- Price tier: ${c.priceTier || 'mid-to-premium ($35–$120 AOV)'}
- Target size: Between 300 and 20,000 monthly visitors (solo founders or small teams who can hire an external designer/developer)
- STRICT REQUIREMENT: MUST BE RUNNING ON SHOPIFY. Do NOT suggest stores on WooCommerce, Squarespace, Wix, or BigCommerce.
${c.notes ? `- Extra requirements: ${c.notes}` : ''}
${exclude.length ? `- Exclude these domains (already in my pipeline): ${exclude.slice(0, 80).join(', ')}` : ''}

Return a list of real active Shopify stores in valid JSON format.`;

  const raw = await callPiApiChat({
    systemPrompt: DISCOVERY_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userPrompt }],
    temperature: 0.45,
  });
  const parsed = extractJson<{ brand?: string; domain?: string; reason?: string }[]>(raw);
  if (!parsed || !Array.isArray(parsed)) throw new Error('The AI response could not be parsed. Try again or paste domains manually.');
  const seen = new Set(exclude.map(normalizeDomain));
  const out: Candidate[] = [];
  for (const p of parsed) {
    if (!p.domain) continue;
    const d = normalizeDomain(p.domain);
    if (!d.includes('.') || seen.has(d)) continue;
    seen.add(d);
    out.push({ domain: d, brand: p.brand, reason: p.reason, source: 'ai' });
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Deterministic scoring — Design-First & Sweet-Spot Visitor Window    */
/* ------------------------------------------------------------------ */
const clamp = (n: number, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, n));

export function scoreLead(scan: ScanResult, psi?: PsiResult): { scores: Scores; gaps: Gap[] } {
  const gaps: Gap[] = [];
  const s = scan.signals;
  const cat = scan.catalog;
  const products = scan.shop.publishedProducts ?? cat.sampled;
  const cur = scan.shop.currency || '$';

  // ---- 1. Traffic Scoring (300 to 20,000 Sweet Spot) --------------
  let traffic = 0;
  const trafficEvidence: string[] = [];
  const rank = scan.popularity.trancoRank;

  let estimatedMonthlyVisitsRange = '800 – 4,500 visits/mo';
  let trafficTier: Scores['trafficTier'] = 'Sweet Spot (300–20k)';

  if (rank) {
    if (rank > 200000) {
      // Perfect sweet spot: Tranco 200k to 1M+ ≈ 1,500 to 20,000 monthly visits
      traffic = 95;
      trafficTier = 'Sweet Spot (300–20k)';
      estimatedMonthlyVisitsRange = '2,500 – 15,000 visits/mo';
      trafficEvidence.push(`Tranco rank #${rank.toLocaleString()} (Ideal independent sweet spot: active real traffic without huge corporate bloat)`);
    } else if (rank > 60000) {
      // Upper end of mid-market: ~20k–80k visits
      traffic = 75;
      trafficTier = 'High (>20k)';
      estimatedMonthlyVisitsRange = '25,000 – 75,000 visits/mo';
      trafficEvidence.push(`Tranco rank #${rank.toLocaleString()} (Upper mid-market traffic; larger team)`);
    } else {
      // Enterprise mega-brand (< 60k rank ≈ > 100k visits) - less ideal for freelance outreach!
      traffic = 45;
      trafficTier = 'High (>20k)';
      estimatedMonthlyVisitsRange = '100,000+ visits/mo';
      trafficEvidence.push(`Enterprise scale (Tranco #${rank.toLocaleString()}). May have internal agency/design team.`);
    }
  } else {
    // Not in top 1M: Check if it's an active boutique store
    if (products >= 8 && s.hasSocialLinks >= 2) {
      traffic = 88;
      trafficTier = 'Sweet Spot (300–20k)';
      estimatedMonthlyVisitsRange = '500 – 3,500 visits/mo';
      trafficEvidence.push('Active independent boutique catalog with verified social footprint (Estimated 500–3,500 monthly shoppers)');
    } else if (products >= 3) {
      traffic = 65;
      trafficTier = 'Sweet Spot (300–20k)';
      estimatedMonthlyVisitsRange = '300 – 1,200 visits/mo';
      trafficEvidence.push('Early-stage niche store with active products');
    } else {
      traffic = 20;
      trafficTier = 'Low (<300)';
      estimatedMonthlyVisitsRange = '< 300 visits/mo';
      trafficEvidence.push('Very low product footprint; may be inactive');
    }
  }

  // ---- 2. Visual Design & Layout Gaps (Primary Focus!) ------------
  const designEvidence: string[] = [];
  const addGap = (g: Gap) => gaps.push(g);

  // A) Default "Powered by Shopify" in footer
  if (s.hasPoweredByShopify) {
    addGap({
      id: 'powered-by-shopify',
      area: 'Design',
      severity: 'high',
      title: 'Default "Powered by Shopify" branding left in footer',
      evidence: 'Visible in the live site footer. A telltale sign of an amateur, uncustomized theme setup that instantly damages brand credibility with first-time shoppers.',
      visualFix: 'Remove powered_by_link in footer.liquid and replace with custom trust seals, copyright, and payment badges.',
    });
    designEvidence.push('Contains default "Powered by Shopify" footer text');
  }

  // B) Generic Stock Dawn/Debut Theme Appearance
  if (scan.theme.isDawnFamily) {
    addGap({
      id: 'generic-stock-theme',
      area: 'Design',
      severity: 'high',
      title: `Stock Free Theme Layout (${scan.theme.schemaName || scan.theme.name || 'Dawn'})`,
      evidence: 'Running unmodified free Shopify theme architecture. The storefront looks like a cookie-cutter starter store rather than a polished, custom-branded direct-to-consumer experience.',
      visualFix: 'Custom typography hierarchy, bespoke product card styling, edge-to-edge lifestyle sections, and tailored brand aesthetics.',
    });
    designEvidence.push('Uses standard uncustomized Dawn/free theme framework');
  }

  // C) Cluttered Header Navigation
  if (s.navItemCount > 7) {
    addGap({
      id: 'cluttered-header',
      area: 'Design',
      severity: 'high',
      title: `Cluttered Header Navigation (${s.navItemCount} top-level links)`,
      evidence: 'Too many menu links cause the navigation bar to break onto two awkward lines on laptops and iPads, overlapping logo elements and looking disorganized.',
      visualFix: 'Consolidate into 4–5 core mega-menu parent categories with a clean visual dropdown and dedicated "Best Sellers" badge.',
    });
    designEvidence.push(`Overcrowded navigation bar (${s.navItemCount} links causing awkward text wrapping)`);
  }

  // D) Auto-Rotating Hero Carousel Trap
  if (s.hasCarouselSlider) {
    addGap({
      id: 'carousel-slider-trap',
      area: 'Design',
      severity: 'medium',
      title: 'Auto-rotating hero banner carousel pushes products 800px below fold',
      evidence: 'Sliders add visual distraction, have notoriously low click-through rates on slides 2+, and force mobile shoppers to scroll through huge banners before seeing any product.',
      visualFix: 'Replace the slider with a high-impact, static hero section highlighting the flagship hero product with a direct "Shop Best Sellers" CTA.',
    });
    designEvidence.push('Homepage relies on multi-slide auto-rotating carousel');
  }

  // E) Thin Product Imagery
  if ((cat.avgImagesPerProduct ?? 10) < 3) {
    addGap({
      id: 'thin-images',
      area: 'Design',
      severity: 'high',
      title: `Bare Product Gallery (Only ${cat.avgImagesPerProduct || 1} image per product on average)`,
      evidence: 'Shoppers cannot see product scale, lifestyle context, in-use photos, or texture details. One of the single biggest visual reasons shoppers bounce without buying.',
      visualFix: 'Implement a multi-image gallery with lifestyle shots, scale benchmarks, and 360-degree zoom inspection.',
    });
    designEvidence.push(`Barren product galleries (avg ${cat.avgImagesPerProduct || 1} photo/product)`);
  }

  // F) Thin Product Descriptions leaving massive white space
  if ((cat.pctThinDescriptions ?? 0) >= 30) {
    addGap({
      id: 'thin-descriptions-whitespace',
      area: 'Design',
      severity: 'medium',
      title: 'Short product descriptions create awkward blank white space on desktop',
      evidence: `${cat.pctThinDescriptions}% of product pages have fewer than 40 words of copy, creating huge empty gaps next to the product gallery and looking incomplete.`,
      visualFix: 'Design structured accordion tabs for Materials, Sizing, Care, and Shipping to visually balance the desktop purchase column.',
    });
    designEvidence.push(`${cat.pctThinDescriptions}% of products lack rich structured description blocks`);
  }

  // G) Missing Sticky Header / Navigation
  if (!s.hasStickyHeader) {
    addGap({
      id: 'no-sticky-header',
      area: 'Design',
      severity: 'medium',
      title: 'No sticky navigation header on mobile or desktop',
      evidence: 'As shoppers scroll down long product or collection pages, the logo, search, and cart disappear, forcing them to scroll all the way back up to check out.',
      visualFix: 'Implement a lightweight, glassmorphic sticky header with instant cart drawer access.',
    });
    designEvidence.push('Header disappears on scroll (no sticky navigation)');
  }

  // H) Missing Top Announcement Bar
  if (!s.hasAnnouncementBar) {
    addGap({
      id: 'no-announcement-bar',
      area: 'Design',
      severity: 'medium',
      title: 'Missing top announcement bar for core value proposition',
      evidence: 'No prominent banner at the very top of the page communicating shipping policy, return guarantee, or seasonal promotions.',
      visualFix: 'Add a clean, high-contrast top notification bar with free shipping & guarantee highlights.',
    });
  }

  // I) Secondary / Minor: Missing Photo Reviews / Trust Social Proof
  if (!s.hasReviews) {
    addGap({
      id: 'no-photo-reviews',
      area: 'CRO',
      severity: 'low',
      title: 'No customer photo review widget on product pages',
      evidence: 'Product pages lack authentic user-generated photos and star badges, making the brand appear untested to cold visitors.',
      visualFix: 'Integrate a clean Judge.me or Loox review gallery featuring real customer photos.',
    });
  }

  // J) Secondary / Minor: Missing Free Shipping Threshold Progress Bar
  if (!s.hasFreeShippingMessage) {
    addGap({
      id: 'no-shipping-progress',
      area: 'AOV',
      severity: 'low',
      title: 'No dynamic free-shipping threshold progress bar in cart',
      evidence: 'Cart does not communicate how much more a customer needs to spend to unlock free delivery.',
      visualFix: 'Add an animated progress meter inside the slide-out cart.',
    });
  }

  // Calculate Design Opportunity Score
  const designGaps = gaps.filter((g) => g.area === 'Design');
  const designScore = clamp(Math.round(designGaps.length * 20));

  // Catalog Quality
  let catalog = 0;
  if (products >= 6) catalog += 20;
  if (products >= 15) catalog += 20;
  if (products >= 40) catalog += 20;
  if ((cat.avgImagesPerProduct ?? 0) >= 3) catalog += 20;
  if (s.hasSocialLinks >= 2) catalog += 20;
  catalog = clamp(catalog);

  // Overall Opportunity Score (dominated by Design flaws!)
  const weights = { high: 18, medium: 10, low: 4 } as const;
  const opportunity = clamp(Math.round(gaps.reduce((a, g) => a + weights[g.severity], 0) * 1.1));

  // Qualification
  let qualified = true;
  let disqualifyReason: string | undefined;
  if (!scan.reachable) {
    qualified = false;
    disqualifyReason = scan.error ? `Unreachable: ${scan.error}` : 'Site unreachable';
  } else if (!scan.isShopify) {
    qualified = false;
    disqualifyReason = 'Not running on Shopify';
  } else if (products > 0 && products < 2) {
    qualified = false;
    disqualifyReason = 'Fewer than 2 products (inactive store)';
  }

  // Weighted Fit: 65% Design Opportunity + 25% Traffic Sweet Spot + 10% Catalog
  const fit = clamp(Math.round(designScore * 0.65 + traffic * 0.25 + catalog * 0.10));
  const grade: Scores['grade'] = fit >= 70 ? 'A' : fit >= 55 ? 'B' : fit >= 40 ? 'C' : 'D';

  return {
    scores: {
      traffic,
      trafficTier,
      estimatedMonthlyVisitsRange,
      designScore,
      catalog,
      opportunity,
      fit,
      grade,
      trafficEvidence,
      designEvidence,
      qualified,
      disqualifyReason,
    },
    gaps: gaps.sort((a, b) => weights[b.severity] - weights[a.severity]),
  };
}

/* ------------------------------------------------------------------ */
/* AI Prompt #2 — Analysis Centered on Clear Visual Design Flaws       */
/* ------------------------------------------------------------------ */
export const ANALYSIS_SYSTEM_PROMPT = `You are an elite Shopify Storefront Designer & Boutique E-commerce Consultant. You write visual audit teardowns that lead directly to website redesign and visual overhaul contracts.

TARGET AUDIENCE: You are analyzing independent Shopify store owners with 300 to 20,000 monthly visitors. These are solo founders, makers, and boutique brand creators. They do NOT care about complex statistical jargon. They care about:
"Does my store look professional, trustworthy, and beautiful so that people actually buy my products?"

RULES — FOLLOW STRICTLY:
1. FOCUS ON VISUAL DESIGN FLAWS THAT THE OWNER CAN IMMEDIATELY SEE ON THEIR SCREEN.
   - Point out exact layout issues: clunky header menus, "Powered by Shopify" in the footer, lack of sticky mobile Add-to-Cart, awkward photo alignments, auto-sliding carousels that hide products, empty white spaces.
2. TRAFFIC BENCHMARK:
   - Frame the store as a promising boutique brand in the ~300 to 20,000 monthly visitor sweet spot.
   - State estimated monthly visits as a realistic range (e.g. "1,200 – 4,500 monthly shoppers").
3. KEEP CRO AND AOV AS SMALL SECONDARY NOTES:
   - Do not overwhelm the store owner with deep math or complex experimentation. Keep AOV/CRO as simple visual tweaks (like adding a free shipping progress bar or bundle selector).
4. THE COLD OUTREACH EMAIL MUST LEAD WITH A VISUAL DESIGN OBSERVATION:
   - Start like: "Hi {{first_name}}, love your [specific product]. Was browsing your store on my iPhone and noticed [exact visual flaw: e.g. the header menu wraps onto two lines / your Add to Cart is buried under 4 scrolls / your footer still has the default 'Powered by Shopify' link]."
   - Offer a quick 60-second visual mock-up or Loom showing how a polished redesign elevates their brand trust.
   - Under 95 words, friendly, zero marketing jargon.

OUTPUT FORMAT (ONLY valid JSON, no markdown):
{
  "summary": "2-sentence diagnosis of the store's visual identity and why a redesign will immediately build buyer trust",
  "estimatedMonthlyVisits": "e.g. 1,500 – 4,000 monthly visitors",
  "estimatedMonthlyRevenue": "e.g. $8,000 – $22,000/mo",
  "revenueAssumptions": "one sentence based on boutique sweet-spot traffic and catalog price",
  "visualDesignProblems": [
    {
      "flaw": "Clear title of the visual flaw (e.g. Header Menu Wraps Onto Two Lines on Laptops)",
      "whatOwnerSees": "Exact description of what looks broken or amateur on their live site",
      "proposedDesignFix": "The specific design solution you will build for them",
      "expectedVisualImpact": "e.g. Instant premium brand credibility and cleaner mobile navigation"
    }
  ],
  "secondaryOpportunities": [
    {"area":"CRO|AOV","title":"Simple visual add-on","fix":"e.g. Slide-out cart progress bar"}
  ],
  "quickDesignWins": ["3 quick visual improvements doable in 48 hours"],
  "pitchAngle": "The single most obvious visual design flaw to mention in your outreach",
  "coldEmail": {"subject":"subject line mentioning a visual detail","body":"body under 95 words leading with what you noticed on their live site"},
  "redesignOffer": "e.g. 1-Week Storefront Redesign & Visual Polish Sprint ($1,800 – $3,500)",
  "confidence": "high|medium|low"
}`;

export function buildDossier(lead: Lead) {
  const { scan, psi, scores, gaps } = lead;
  if (!scan) return {};
  return {
    domain: scan.domain,
    brand: scan.shop.name || lead.candidate.brand,
    country: scan.shop.country,
    currency: scan.shop.currency,
    shopDescription: scan.shop.description,
    theme: scan.theme,
    catalog: {
      publishedProducts: scan.shop.publishedProducts,
      publishedCollections: scan.shop.publishedCollections,
      ...scan.catalog,
      sampleProducts: scan.catalog.sampleProducts.map((p) => `${p.title} — ${p.price}`),
    },
    visualSignals: scan.signals,
    popularity: scan.popularity,
    computedScores: scores,
    detectedVisualGaps: gaps?.map((g) => ({ area: g.area, severity: g.severity, title: g.title, evidence: g.evidence, visualFix: g.visualFix })),
  };
}

export async function analyzeLead(lead: Lead): Promise<AiInsight> {
  if (!hasPiApiKey()) throw new Error('AI analysis needs PIAPI_API_KEY in .env.');
  const raw = await callPiApiChat({
    systemPrompt: ANALYSIS_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: `Store visual audit dossier:\n${JSON.stringify(buildDossier(lead), null, 1)}` }],
    temperature: 0.35,
  });
  const parsed = extractJson<AiInsight>(raw);
  if (!parsed || !parsed.summary) throw new Error('AI returned an unparseable analysis. Click "Re-analyze".');
  return {
    ...parsed,
    visualDesignProblems: parsed.visualDesignProblems || [],
    secondaryOpportunities: parsed.secondaryOpportunities || [],
    quickDesignWins: parsed.quickDesignWins || [],
    coldEmail: parsed.coldEmail || { subject: '', body: '' },
  };
}

/* ------------------------------------------------------------------ */
/* Export to CSV                                                      */
/* ------------------------------------------------------------------ */
export function leadsToCsv(leads: Lead[]): string {
  const cols = [
    'Grade', 'Design Fit', 'Domain', 'Brand', 'Country', 'Currency', 'Visitor Tier', 'Est. Monthly Visitors',
    'Catalog Products', 'Median Price', 'Theme', 'Powered By Shopify Present', 'Header Nav Count',
    'Hero Slider Used', 'Top Visual Design Flaws', 'Pitch Angle', 'Cold Email Subject', 'Cold Email Script',
  ];
  const esc = (v: unknown) => {
    const s = v == null ? '' : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const rows = leads.map((l) => {
    const sc = l.scan; const s = l.scores; const i = l.insight;
    return [
      s?.grade, `${s?.fit}%`, sc?.domain, sc?.shop.name || l.candidate.brand, sc?.shop.country, sc?.shop.currency,
      s?.trafficTier, s?.estimatedMonthlyVisitsRange, sc?.shop.publishedProducts ?? sc?.catalog.sampled,
      sc?.catalog.medianPrice, sc?.theme.schemaName || sc?.theme.name,
      sc?.signals.hasPoweredByShopify ? 'YES (Flaw)' : 'Clean', sc?.signals.navItemCount,
      sc?.signals.hasCarouselSlider ? 'YES' : 'NO',
      l.gaps?.filter((g) => g.area === 'Design').slice(0, 3).map((g) => g.title).join('; '),
      i?.pitchAngle, i?.coldEmail.subject, i?.coldEmail.body,
    ].map(esc).join(',');
  });
  return [cols.join(','), ...rows].join('\n');
}
