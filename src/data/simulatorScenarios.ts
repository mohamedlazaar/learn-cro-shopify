export interface StoreMetricBaseline {
  monthlySessions: number;
  cvr: number; // in %
  aov: number; // in $
  rps: number; // in $
  monthlyRevenue: number;
  cogsPercent: number; // cost of goods %
  monthlyAdSpend: number;
  mobileTrafficShare: number; // in %
}

export interface StoreFrictionItem {
  id: string;
  category: 'pdp' | 'cart' | 'speed' | 'trust' | 'navigation';
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  location: string;
  impactScore: 'High' | 'Medium' | 'Critical';
  suggestedFix: string;
  suggestedFixAr: string;
  liquidSnippetOrThemeChange: string;
}

export interface StoreOwnerPersona {
  name: string;
  role: string;
  avatar: string;
  personality: string;
  personalityAr: string;
  commonObjections: {
    objection: string;
    objectionAr: string;
    goodResponseKey: string;
    aiCounterResponse: string;
  }[];
}

export interface SimulatorStoreScenario {
  id: string;
  name: string;
  niche: string;
  nicheAr: string;
  isGoodProspect: boolean;
  qualificationVerdict: 'Recommended' | 'Risky' | 'Avoid';
  qualificationReason: string;
  qualificationReasonAr: string;
  platform: 'Shopify OS 2.0 (Dawn)' | 'Shopify Plus (Prestige)' | 'WooCommerce (WordPress)';
  themeName: string;
  urlMock: string;
  baseline: StoreMetricBaseline;
  optimizedProjection: {
    cvr: number;
    aov: number;
    rps: number;
    monthlyRevenue: number;
    incrementalMonthlyProfit: number;
  };
  designFlaws: StoreFrictionItem[];
  owner: StoreOwnerPersona;
}

export const SIMULATOR_STORE_SCENARIOS: SimulatorStoreScenario[] = [
  // 1. The Perfect Candidate (Aura Athletics)
  {
    id: 'store-aura-athletics',
    name: 'Aura Athletics',
    niche: 'Premium Activewear & Performance Gym Apparel',
    nicheAr: 'ملابس رياضية عالية الأداء وأزياء جيم فاخرة',
    isGoodProspect: true,
    qualificationVerdict: 'Recommended',
    qualificationReason: 'Ideal sweet spot: 14,200 monthly sessions, proven product demand, healthy $82 AOV, built on Shopify Dawn, but crippled by 3 obvious mobile friction leaks.',
    qualificationReasonAr: 'العميل المثالي: 14,200 زائر شهرياً (في النطاق الذهبي)، طلب قوي على المنتج، متوسط سلة $82، مبني على شوبيفاي، لكنه يعاني من 3 مشاكل تصميمية قاتلة على الموبايل.',
    platform: 'Shopify OS 2.0 (Dawn)',
    themeName: 'Dawn (v12.0 Custom Child)',
    urlMock: 'aura-athletics-gear.com',
    baseline: {
      monthlySessions: 14200,
      cvr: 1.35, // 1.35%
      aov: 82.0, // $82.00
      rps: 1.11, // $1.11
      monthlyRevenue: 15719,
      cogsPercent: 35,
      monthlyAdSpend: 6200,
      mobileTrafficShare: 79,
    },
    optimizedProjection: {
      cvr: 1.95, // +44% lift
      aov: 90.0, // +$8 via Free Shipping Threshold in Cart Drawer
      rps: 1.755,
      monthlyRevenue: 24921,
      incrementalMonthlyProfit: 5980,
    },
    designFlaws: [
      {
        id: 'flaw-sticky-atc',
        category: 'pdp',
        title: 'Missing Mobile Sticky Add-to-Cart',
        titleAr: 'غياب شريط الشراء الثابت (Sticky ATC) على الموبايل',
        description: 'On mobile (79% of traffic), shoppers must scroll down past 4 large gallery photos to see the price and Buy button. Drop-off before reaching the button is 48%.',
        descriptionAr: 'على شاشات الهواتف (79% من الزوار)، يضطر المشتري للتمرير أسفل 4 صور ضخمة لرؤية السعر وزر الشراء، مما يتسبب في تسرب 48% من الزوار.',
        location: 'Product Page (Mobile Viewport)',
        impactScore: 'Critical',
        suggestedFix: 'Implement an intersection-observer Sticky Buy Bar that pins to the screen bottom with instant variant select.',
        suggestedFixAr: 'برمجة شريط شراء ثابت أسفل الشاشة يظهر فور اختفاء الزر الرئيسي مع خيار تحديد المقاس بنقرة واحدة.',
        liquidSnippetOrThemeChange: `{% comment %} Sticky Add To Cart Component {% endcomment %}
<div id="sticky-atc-bar" class="sticky-atc-wrapper" data-product-id="{{ product.id }}">
  <div class="sticky-atc-info">
    <span class="sticky-atc-title">{{ product.title | truncate: 25 }}</span>
    <span class="sticky-atc-price">{{ product.selected_or_first_available_variant.price | money }}</span>
  </div>
  <button type="button" class="btn btn-primary sticky-atc-submit" id="StickyAddToCart">
    <span>Quick Add</span>
  </button>
</div>`,
      },
      {
        id: 'flaw-swatches',
        category: 'pdp',
        title: 'Tiny Dropdown Menus for Colors and Sizes',
        titleAr: 'قوائم منسدلة رمادية للمقاسات والألوان بدلاً من عينات بصرية',
        description: 'Merchandise options use default HTML <select> dropdowns. Mobile shoppers cannot preview color shades or availability at a glance.',
        descriptionAr: 'خيارات المقاس والألوان عبارة عن قوائم HTML رمادية قديمة. المشتري على الموبايل لا يرى درجات الألوان ولا يعرف المقاسات المتاحة دون فتح القائمة.',
        location: 'PDP Variant Picker Block',
        impactScore: 'High',
        suggestedFix: 'Convert native variant selects to visual round color swatches and square size pill buttons with instant out-of-stock strikethroughs.',
        suggestedFixAr: 'تحويل القوائم إلى عينات ألوان دائرية ملونة ومربعات مقاسات واضحة تظهر المقاسات المنتهية بخط مشطوب فوراً.',
        liquidSnippetOrThemeChange: `{%- for value in option.values -%}
  <input type="radio" id="Option-{{ option.position }}-{{ forloop.index }}" name="{{ option.name }}" value="{{ value | escape }}" {% if option.selected_value == value %}checked{% endif %}>
  <label for="Option-{{ option.position }}-{{ forloop.index }}" class="visual-swatch-label">
    {{ value }}
  </label>
{%- endfor -%}`,
      },
      {
        id: 'flaw-cart-drawer',
        category: 'cart',
        title: 'Full-Page Cart Reload with No Threshold Upsell',
        titleAr: 'سلة كلاسيكية تعيد تحميل الصفحة بدون شريط حافز الشحن المجاني',
        description: 'Clicking Add to Cart redirects to a separate /cart page. No progress bar to encourage reaching the $100 free shipping threshold.',
        descriptionAr: 'النقر على زر الشراء ينقل العميل إلى صفحة /cart كئيبة كاملة بدلاً من سلة جانبية تفاعلية، دون إخباره بالمبلغ المتبقي للشحن المجاني.',
        location: 'Global Theme Cart Configuration',
        impactScore: 'Critical',
        suggestedFix: 'Build a slide-out Ajax Cart Drawer with a dynamic Free Shipping Bar and a 1-click $18 matching socks upsell.',
        suggestedFixAr: 'برمجة سلة منزلقة سريعة بـ Ajax مع شريط شحن مجاني ديناميكي وعرض إضافة جوارب متطابقة بـ 18 دولاراً بنقرة واحدة.',
        liquidSnippetOrThemeChange: `<div class="cart-drawer-shipping-bar">
  {% assign threshold = 10000 %}
  {% assign remaining = threshold | minus: cart.total_price %}
  {% if remaining > 0 %}
    <p>Add <strong>{{ remaining | money }}</strong> to unlock <strong>FREE Express Shipping</strong>!</p>
    <div class="progress-track"><div class="progress-fill" style="width: {{ cart.total_price | times: 100 | divided_by: threshold }}%;"></div></div>
  {% else %}
    <p class="free-shipping-unlocked">🎉 You unlocked <strong>FREE Express Shipping!</strong></p>
  {% endif %}
</div>`,
      },
    ],
    owner: {
      name: 'Marcus Vance',
      role: 'Founder & Head of Growth',
      avatar: '👨‍💼',
      personality: 'Data-driven, skeptical of generic agencies, frustrated by Meta ad CPMs rising by 40% this year. Values concrete numbers and speed.',
      personalityAr: 'رجل أعمال يركز على لغة الأرقام، متشكك في الوكالات التقليدية، غاضب من ارتفاع تكلفة إعلانات فيسبوك وإنستغرام بنسبة 40%. يقدّر الحلول السريعة الملموسة.',
      commonObjections: [
        {
          objection: 'Why should I pay for CRO instead of just running more Meta ads?',
          objectionAr: 'لماذا أنفق على تحسين المتجر بدلاً من ضخ المزيد من الأموال في إعلانات إنستغرام وتيك توك؟',
          goodResponseKey: 'cpm_math',
          aiCounterResponse: 'Spot on explanation! If my ad traffic costs $2.00 a click, lifting conversion from 1.35% to 1.95% drops my customer acquisition cost (CAC) immediately by 30%. That actually makes all my ads 30% more profitable!',
        },
        {
          objection: 'Will modifying my Liquid files slow down my store or break my Dawn theme updates?',
          objectionAr: 'هل التعديل في ملفات الـ Liquid سيبطئ سرعة المتجر أو يعطل التحديثات المستقبلية لثيم Dawn؟',
          goodResponseKey: 'clean_code',
          aiCounterResponse: 'I appreciate that you use modular snippets and CSS-only swatches without heavy third-party apps that inject render-blocking scripts. That was my biggest worry.',
        },
      ],
    },
  },

  // 2. The Clean Beauty Brand (Nordic Botanicals)
  {
    id: 'store-nordic-botanicals',
    name: 'Nordic Botanicals',
    niche: 'Clean Organic Skincare & Facial Serums',
    nicheAr: 'منتجات عضوية للعناية بالبشرة وسيروم الوجه الطبيعي',
    isGoodProspect: true,
    qualificationVerdict: 'Recommended',
    qualificationReason: 'High customer intent and premium margins ($64 AOV). 7,400 monthly visits. Strong aesthetic product, but 64% cart abandonment due to missing trust badges and unclear shipping costs.',
    qualificationReasonAr: 'مرشح ممتاز: نية شراء عالية وهوامش ربح ممتازة، 7,400 زائر شهرياً، منتج جمالي راقٍ، لكن نسبة التخلي عن السلة 64% لغياب شارات الثقة وتأخر توضيح الشحن.',
    platform: 'Shopify Plus (Prestige)',
    themeName: 'Prestige Theme',
    urlMock: 'nordicbotanicals-skin.com',
    baseline: {
      monthlySessions: 7400,
      cvr: 1.72,
      aov: 64.0,
      rps: 1.10,
      monthlyRevenue: 8146,
      cogsPercent: 28,
      monthlyAdSpend: 3100,
      mobileTrafficShare: 72,
    },
    optimizedProjection: {
      cvr: 2.35,
      aov: 72.0,
      rps: 1.692,
      monthlyRevenue: 12520,
      incrementalMonthlyProfit: 3149,
    },
    designFlaws: [
      {
        id: 'flaw-social-proof',
        category: 'trust',
        title: 'Star Ratings & Dermatologist Badges Buried Below Reviews Tab',
        titleAr: 'إخفاء تقييمات النجوم واعتماد أطباء الجلدية أسفل تبويب المراجعات',
        description: 'Shoppers looking at high-ticket skincare ($64) need immediate reassurance. The star rating is hidden in a collapsed accordion.',
        descriptionAr: 'المتسوق لمنتجات العناية بالبشرة يحتاج لأعلى درجات الأمان والثقة. تقييمات النجوم مخفية داخل تبويب منسدل لا يفتحه أحد.',
        location: 'PDP Title Header',
        impactScore: 'High',
        suggestedFix: 'Place golden star count (★ 4.9/5 from 420 Verified Reviews) and "Dermatologist Approved" badge immediately above the product title.',
        suggestedFixAr: 'وضع تقييم النجوم (★ 4.9/5 من 420 مشتري موثق) وشارة "معتمد من أطباء الجلدية" مباشرة فوق عنوان المنتج.',
        liquidSnippetOrThemeChange: `<div class="pdp-trust-eyebrow">
  <span class="stars">★★★★★</span>
  <span class="score">4.9/5.0</span>
  <a href="#reviews" class="review-count">(428 Verified Buyers)</a>
  <span class="dermatologist-pill">✓ Dermatologist Tested</span>
</div>`,
      },
    ],
    owner: {
      name: 'Elena Rostova',
      role: 'Founder & Chemist',
      avatar: '👩‍🔬',
      personality: 'Passionate scientist, loves minimalist Scandinavian aesthetics, hates tacky marketing popups. Needs clean, elegant solutions.',
      personalityAr: 'طبيبة كيميائية ومؤسسة البراند، تحب التصميم الإسكندنافي الهادئ، وتكره النوافذ المنبثقة المزعجة. تبحث عن حلول راقية تحافظ على هيبة العلامة التجارية.',
      commonObjections: [
        {
          objection: 'I refuse to put ugly flashing discount timers or spin-to-win wheels on my store.',
          objectionAr: 'أرفض تماماً وضع مؤقتات تنازلية قبيحة أو عجلات حظ عشوائية تُفسد رقي متجري.',
          goodResponseKey: 'elegant_ux',
          aiCounterResponse: 'Thank goodness! I was terrified you were going to turn my clean brand into a cheap coupon site. Elegant micro-copy and clean trust badges are exactly what we need.',
        },
      ],
    },
  },

  // 3. The Negative Prospect (Lumina Audio - Avoid Case)
  {
    id: 'store-lumina-audio',
    name: 'Lumina Audio',
    niche: 'Generic Wireless Bluetooth Earbuds',
    nicheAr: 'سماعات بلوتوث تجارية رخيصة (دروب شيبينغ)',
    isGoodProspect: false,
    qualificationVerdict: 'Avoid',
    qualificationReason: 'Traps to avoid: Only 85 visitors per month (outside the 300-20k range). Built on WooCommerce (not Shopify). Low-margin generic AliExpress commodity. No budget to pay a CRO developer.',
    qualificationReasonAr: 'فخ يجب تجنبه: 85 زائر شهرياً فقط (خارج نطاق 300-20 ألف زائر). مبني على ووردبريس WooCommerce وليس شوبيفاي. منتج تجاري رخيص بهوامش ضئيلة، ولا يملك ميزانية لتوظيف خبير.',
    platform: 'WooCommerce (WordPress)',
    themeName: 'Astra Pro',
    urlMock: 'lumina-sounds-direct.net',
    baseline: {
      monthlySessions: 85,
      cvr: 0.8,
      aov: 24.0,
      rps: 0.19,
      monthlyRevenue: 16,
      cogsPercent: 65,
      monthlyAdSpend: 50,
      mobileTrafficShare: 85,
    },
    optimizedProjection: {
      cvr: 1.1,
      aov: 24.0,
      rps: 0.264,
      monthlyRevenue: 22,
      incrementalMonthlyProfit: 3,
    },
    designFlaws: [],
    owner: {
      name: 'Dave K.',
      role: 'Dropshipper',
      avatar: '🧢',
      personality: 'Zero budget, expects miracles with zero traffic.',
      personalityAr: 'مبتدئ بدون ميزانية، يبحث عن حلول مجانية ويريد نتائج خيالية بدون أي زوار حقيقيين.',
      commonObjections: [
        {
          objection: 'Can you work for free until I make 10,000 sales?',
          objectionAr: 'هل يمكنك العمل مجاناً حتى أحقق 10,000 مبيعة؟',
          goodResponseKey: 'reject_lead',
          aiCounterResponse: 'A real CRO consultant politely disqualifies this prospect and saves their time for stores that actually have traffic and budget!',
        },
      ],
    },
  },
];

/**
 * Standard Library of High-Impact Ecommerce Friction Items for Custom Store Audits.
 * Allows users to select or customize audit leaks when adding their own store manually.
 */
export const DEFAULT_FRICTION_LIBRARY: StoreFrictionItem[] = [
  {
    id: 'flaw-sticky-atc',
    category: 'pdp',
    title: 'Missing Mobile Sticky Add-to-Cart',
    titleAr: 'غياب شريط الشراء الثابت (Sticky ATC) على الموبايل',
    description: 'On mobile screens, the primary Buy button falls 3 scrolls down below product carousels. Users must scroll back and forth to purchase.',
    descriptionAr: 'على شاشات الموبايل، يقع زر الشراء الرئيسي أسفل 3 شاشات تمرير خلف صور المنتج، مما يجبر الزائر على التمرير صعوداً وهبوطاً للشراء.',
    location: 'Product Detail Page (Mobile Viewport)',
    impactScore: 'Critical',
    suggestedFix: 'Inject a lightweight Sticky ATC bar that remains pinned to the bottom of the screen as soon as the main Buy button scrolls out of view.',
    suggestedFixAr: 'برمجة شريط شراء سفلي ثابت يظهر تلقائياً بمجرد اختفاء الزر الأساسي من شاشة الموبايل.',
    liquidSnippetOrThemeChange: `{% render 'sticky-atc', product: product %}`,
  },
  {
    id: 'flaw-swatches',
    category: 'pdp',
    title: 'No Visual Color Swatches (Default Grey Dropdowns)',
    titleAr: 'غياب عينات الألوان المرئية (اعتماد قوائم منسدلة رمادية)',
    description: 'Variants are locked behind native browser select dropdowns, hiding available color options and creating decision anxiety.',
    descriptionAr: 'خيارات الألوان مخفية داخل قوائم منسدلة رمادية بدائية، مما يخفي تنوع الألوان ويزيد من تردد المشتري.',
    location: 'Variant Selector Block (PDP)',
    impactScore: 'High',
    suggestedFix: 'Implement custom Liquid pill swatches with image or CSS hex backgrounds and instant state change on tap.',
    suggestedFixAr: 'استبدال القوائم المنسدلة بأزرار وعينات ألوان حية مع تغيير صورة المنتج تلقائياً عند الضغط.',
    liquidSnippetOrThemeChange: `{% render 'color-swatches', product: product %}`,
  },
  {
    id: 'flaw-cart-drawer',
    category: 'cart',
    title: 'Full-Page Cart Redirect instead of Ajax Cart Drawer',
    titleAr: 'التحويل لصفحة سلة كاملة بدلاً من درج السلة المنزلق',
    description: 'Clicking Add to Cart redirects the user to /cart, interrupting the shopping flow and adding a slow page reload.',
    descriptionAr: 'الضغط على زر الإضافة يحول العميل لصفحة /cart كاملة، مما يقطع تجربة التسوق ويزيد وقت التحميل.',
    location: 'Cart Form & Global Navigation',
    impactScore: 'High',
    suggestedFix: 'Implement an asynchronous Ajax Cart Drawer using the Shopify Cart API with zero page reloads.',
    suggestedFixAr: 'بناء درج سلة منزلق سريع بتقنية أجاكس وواجهة شوبيفاي دون الحاجة لإعادة تحميل الصفحة.',
    liquidSnippetOrThemeChange: `{% render 'cart-drawer' %}`,
  },
  {
    id: 'flaw-free-shipping',
    category: 'cart',
    title: 'Missing Free Shipping Progress Threshold',
    titleAr: 'غياب شريط التقدم للشحن المجاني بالسلة',
    description: 'Shoppers have no clear visual cue to add a small accessory to unlock free shipping, depressing Average Order Value (AOV).',
    descriptionAr: 'لا يرى المتسوق أي حافز مرئي لإضافة منتج تكميلي للحصول على شحن مجاني، مما يهدر فرصة رفع متوسط السلة.',
    location: 'Cart Drawer Header',
    impactScore: 'Medium',
    suggestedFix: 'Add dynamic threshold bar: "Add $X more to unlock Free Shipping!" calculating remaining balance in real time.',
    suggestedFixAr: 'إضافة شريط تفاعلي ديناميكي: أضف X$ متبقية للحصول على شحن مجاني، يُحسب تلقائياً.',
    liquidSnippetOrThemeChange: `{% render 'free-shipping-bar', threshold: 7500 %}`,
  },
  {
    id: 'flaw-mobile-lcp',
    category: 'speed',
    title: 'Unoptimized 4MB Hero Images Causing Slow Mobile LCP',
    titleAr: 'صور بانر ضخمة غير مضغوطة تبطئ سرعة العرض الحرج (LCP)',
    description: 'Massive uncompressed images block mobile rendering, causing a 4.2-second Largest Contentful Paint (LCP) and high bounce rate.',
    descriptionAr: 'صور بنرات ضخمة غير مجهزة للهواتف ترفع زمن LCP إلى أكثر من 4 ثوانٍ وتتسبب في ارتداد الزوار.',
    location: 'Homepage & PDP Hero Section',
    impactScore: 'Critical',
    suggestedFix: 'Use `image_tag` with `loading: "eager"`, `fetchpriority: "high"`, and srcset for responsive WebP dimensions.',
    suggestedFixAr: 'استخدام وسوم الصور الحديثة بشوبيفاي مع تفعيل WebP وتحديد أولويات التحميل للهواتف.',
    liquidSnippetOrThemeChange: `{{ section.settings.image | image_tag: loading: 'eager', fetchpriority: 'high', widths: '375, 750, 1100' }}`,
  },
  {
    id: 'flaw-social-proof',
    category: 'trust',
    title: 'Zero Above-The-Fold Trust & Review Badges',
    titleAr: 'انعدام إشارات الثقة وتقييمات العملاء في الجزء المرئي الأول',
    description: 'First-time visitors from paid ads see zero social proof or verified reviews above the fold, triggering buyer skepticism.',
    descriptionAr: 'الزائر القادم من الإعلانات لا يرى أي نجوم تقييم أو شهادات عملاء سريعة فوق خط التمرير، مما يولد شكوكاً.',
    location: 'Product Title & Pricing Block',
    impactScore: 'Medium',
    suggestedFix: 'Place aggregated star rating and "Over 1,200+ Happy Shoppers" micro-badge right below the product title.',
    suggestedFixAr: 'وضع شارة تقييم النجوم وإجمالي العملاء السعداء مباشرة أسفل عنوان المنتج لجلب الثقة الفورية.',
    liquidSnippetOrThemeChange: `{% render 'review-badge-micro', rating: 4.9, count: 1240 %}`,
  },
];

