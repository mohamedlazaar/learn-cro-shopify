export interface ArabicTerm {
  id: string;
  en: string;
  ar: string;
  arExplanation: string;
  category: 'analytics' | 'stats' | 'shopify' | 'ux' | 'cro' | 'perf';
  keywords: string[];
}

export const ARABIC_GLOSSARY: ArabicTerm[] = [
  // CRO & Core Business Metrics
  {
    id: 'cro',
    en: 'Conversion Rate Optimization (CRO)',
    ar: 'تحسين معدل التحويل',
    arExplanation: 'علم وممارسة تحسين تجربة المتجر لزيادة نسبة الزوار الذين يقومون بإجراء الشراء.',
    category: 'cro',
    keywords: ['cro', 'conversion rate optimization', 'optimization'],
  },
  {
    id: 'cvr',
    en: 'Conversion Rate (CVR)',
    ar: 'معدل التحويل',
    arExplanation: 'النسبة المئوية لزوار المتجر الذين يكملون عملية الشراء بنجاح (الطلبات مقسومة على الجلسات × 100).',
    category: 'cro',
    keywords: ['cvr', 'conversion rate', 'conversion'],
  },
  {
    id: 'aov',
    en: 'Average Order Value (AOV)',
    ar: 'متوسط قيمة الطلب',
    arExplanation: 'متوسط المبلغ المالي الذي يدفعه العميل في الطلب الواحد (إجمالي الإيرادات مقسوماً على عدد الطلبات).',
    category: 'cro',
    keywords: ['aov', 'average order value', 'order value'],
  },
  {
    id: 'rps',
    en: 'Revenue Per Session (RPS)',
    ar: 'الإيراد لكل جلسة',
    arExplanation: 'المقياس الذهبي في التجارة الإلكترونية، يجمع بين معدل التحويل ومتوسط قيمة الطلب (CVR × AOV).',
    category: 'cro',
    keywords: ['rps', 'revenue per session', 'revenue per visitor', 'rpv'],
  },
  {
    id: 'bounce-rate',
    en: 'Bounce Rate',
    ar: 'معدل الارتداد',
    arExplanation: 'نسبة الزوار الذين يغادرون المتجر بعد زيارة صفحة واحدة فقط دون أي تفاعل.',
    category: 'cro',
    keywords: ['bounce rate', 'bounce', 'bounces'],
  },
  {
    id: 'drop-off',
    en: 'Funnel Drop-off',
    ar: 'تسرب / انخفاض مسار الشراء',
    arExplanation: 'نسبة الزوار الذين يتوقفون وينسحبون بين مرحلة وأخرى في مسار الشراء (مثل من السلة إلى الدفع).',
    category: 'cro',
    keywords: ['drop-off', 'funnel drop-off', 'funnel', 'leakage'],
  },
  {
    id: 'friction',
    en: 'Conversion Friction',
    ar: 'احتكاك وصعوبة التحويل',
    arExplanation: 'أي عائق بصري أو تقني أو نفسي يجعل إتمام الشراء صعباً أو بطيئاً للمستخدم.',
    category: 'cro',
    keywords: ['friction', 'cognitive load', 'hesitation'],
  },
  {
    id: 'microcopy',
    en: 'Microcopy / Reassurance Copy',
    ar: 'النصوص الإرشادية والمطمئنة',
    arExplanation: 'العبارات القصيرة الذكية قرب أزرار الشراء لإزالة الشكوك (مثل: شحن مجاني، إرجاع مضمون).',
    category: 'cro',
    keywords: ['microcopy', 'reassurance', 'copywriting', 'trust badge'],
  },
  {
    id: 'social-proof',
    en: 'Social Proof',
    ar: 'الدليل الاجتماعي / الإثبات المجتمعي',
    arExplanation: 'عناصر تبين ثقة الآخرين بالمنتج مثل التقييمات، الصور الواقعية للعملاء، وشارات الموثوقية.',
    category: 'cro',
    keywords: ['social proof', 'reviews', 'testimonials', 'ratings'],
  },
  {
    id: 'urgency-scarcity',
    en: 'Urgency & Scarcity',
    ar: 'الإلحاح والندرة',
    arExplanation: 'محفزات تحث الزائر على اتخاذ قرار الشراء فوراً مثل: بقي 3 قطع فقط، أو انتهاء العرض قريباً.',
    category: 'cro',
    keywords: ['urgency', 'scarcity', 'fomo', 'countdown'],
  },
  {
    id: 'upsell',
    en: 'Upsell',
    ar: 'البيع التكميلي الأعلى قيمة',
    arExplanation: 'إقناع العميل بترقية المنتج إلى خيار أحدث أو نسخة أكبر بسعر أفضل قبل إتمام الطلب.',
    category: 'cro',
    keywords: ['upsell', 'upgrade', 'post-purchase upsell'],
  },
  {
    id: 'cross-sell',
    en: 'Cross-sell',
    ar: 'البيع المتقاطع / المنتجات المترابطة',
    arExplanation: 'عرض منتجات مكملة ومناسبة للمنتج الذي اشتراه العميل (مثل جورب مع الحذاء).',
    category: 'cro',
    keywords: ['cross-sell', 'cross sell', 'frequently bought together', 'bundle'],
  },
  {
    id: 'free-shipping-threshold',
    en: 'Free Shipping Threshold',
    ar: 'حد الشحن المجاني التراكمي',
    arExplanation: 'المبلغ الأدنى للحصول على شحن مجاني، ويُستخدم مع شريط تقدم لتحفيز إضافة المزيد من المنتجات.',
    category: 'cro',
    keywords: ['free shipping threshold', 'free shipping bar', 'threshold'],
  },

  // Statistics & Experimentation
  {
    id: 'ab-testing',
    en: 'A/B Testing / Split Testing',
    ar: 'اختبار أ/ب / الاختبار المقسم',
    arExplanation: 'مقارنة نسختين من الصفحة (الأصلية والبديلة) عشوائياً لمعرفة أي منهما تحقق مبيعات أكثر.',
    category: 'stats',
    keywords: ['a/b test', 'ab test', 'split test', 'experiment', 'variant'],
  },
  {
    id: 'statistical-significance',
    en: 'Statistical Significance',
    ar: 'الدلالة الإحصائية',
    arExplanation: 'التأكد رياضياً (غالباً بنسبة 95%) أن النتيجة الإيجابية حقيقية وليست وليدة الصدفة أو التذبذب العشوائي.',
    category: 'stats',
    keywords: ['statistical significance', 'significance', 'confidence level', 'confidence'],
  },
  {
    id: 'p-value',
    en: 'p-Value (Probability Value)',
    ar: 'القيمة الاحتمالية',
    arExplanation: 'احتمال أن تكون النتيجة قد حدثت بمحض الصدفة؛ إذا كانت أقل من 0.05 (5%)، يُعتبر الاختبار ناجحاً وذا دلالة إحصائية.',
    category: 'stats',
    keywords: ['p-value', 'p value', 'alpha'],
  },
  {
    id: 'mde',
    en: 'Minimum Detectable Effect (MDE)',
    ar: 'أدنى تأثير قابل للاكتشاف',
    arExplanation: 'أصغر نسبة زيادة مئوية في معدل التحويل يستطيع اختبارك كشفها بدقة مع حجم العينة المتاح.',
    category: 'stats',
    keywords: ['mde', 'minimum detectable effect', 'effect size'],
  },
  {
    id: 'sample-size',
    en: 'Sample Size',
    ar: 'حجم العينة المطلوب',
    arExplanation: 'عدد الزوار اللازم إدخالهم في كل نسخة قبل اتخاذ أي قرار لإلغاء التذبذب الإحصائي.',
    category: 'stats',
    keywords: ['sample size', 'traffic size', 'visitors required', 'evan miller'],
  },
  {
    id: 'statistical-power',
    en: 'Statistical Power (1 - Beta)',
    ar: 'القوة الإحصائية',
    arExplanation: 'قدرة الاختبار على رصد التحسن الفعلي إن وجد دون تفويته (المعيار الاحترافي هو 80%).',
    category: 'stats',
    keywords: ['statistical power', 'power', 'type ii error', 'beta'],
  },
  {
    id: 'hypothesis',
    en: 'Experiment Hypothesis',
    ar: 'الفرضية العلمية للاختبار',
    arExplanation: 'صياغة علمية مكونة من 5 أركان: (لأن...، نعتقد أن...، لشريحة...، سيؤدي إلى...، يُقاس عبر...).',
    category: 'stats',
    keywords: ['hypothesis', 'test hypothesis', 'because we believe'],
  },
  {
    id: 'peeking-problem',
    en: 'Peeking Problem',
    ar: 'معضلة التلصص على النتائج مبكراً',
    arExplanation: 'الخطأ القاتل بفحص نتائج الاختبار يومياً وإيقافه مبكراً قبل اكتمال المدة أو حجم العينة.',
    category: 'stats',
    keywords: ['peeking', 'peeking problem', 'stopping early', 'false positive'],
  },
  {
    id: 'guardrail-metrics',
    en: 'Guardrail Metrics',
    ar: 'المقاييس الوقائية / الحارسة',
    arExplanation: 'مقاييس نراقبها للتأكد من عدم تضررها أثناء الاختبار (مثل: عدم انخفاض AOV أو زيادة نسبة المرتجعات).',
    category: 'stats',
    keywords: ['guardrail', 'guardrail metrics', 'secondary metrics'],
  },
  {
    id: 'type-i-error',
    en: 'Type I Error (False Positive)',
    ar: 'خطأ من النوع الأول (إيجابية كاذبة)',
    arExplanation: 'الاعتقاد بأن النسخة فائزة وهي في الواقع متساوية مع الأصل، والصدفة هي السبب.',
    category: 'stats',
    keywords: ['type i error', 'type 1 error', 'false positive', 'alpha error'],
  },
  {
    id: 'type-ii-error',
    en: 'Type II Error (False Negative)',
    ar: 'خطأ من النوع الثاني (سلبية كاذبة)',
    arExplanation: 'تفويت فكرة رابحة وإلغاؤها لأن حجم العينة لم يكن كافياً لإثبات الفوز إحصائياً.',
    category: 'stats',
    keywords: ['type ii error', 'type 2 error', 'false negative', 'beta error'],
  },

  // Shopify Development & Liquid
  {
    id: 'liquid',
    en: 'Liquid Template Engine',
    ar: 'محرك قوالب ليكويد (شوبيفاي)',
    arExplanation: 'لغة القوالب من جانب الخادم الخاصة بشوبيفاي لتوليد HTML ديناميكي للمتجر.',
    category: 'shopify',
    keywords: ['liquid', 'theme', 'templates', 'snippets', 'sections'],
  },
  {
    id: 'section-rendering-api',
    en: 'Section Rendering API',
    ar: 'واجهة تصيير الأقسام الديناميكية',
    arExplanation: 'ميزة متقدمة في شوبيفاي تتيح طلب جزء معين من الصفحة (كالسلّة) وتحديثها بـ AJAX دون إعادة تحميل كامل الصفحة.',
    category: 'shopify',
    keywords: ['section rendering api', 'sections', 'ajax cart', 'section rendering'],
  },
  {
    id: 'web-pixels-api',
    en: 'Shopify Web Pixels API',
    ar: 'واجهة بكسلات الويب لشوبيفاي',
    arExplanation: 'البيئة المعزولة والآمنة الجديدة في شوبيفاي للاستماع إلى أحداث العميل دون إبطاء الصفحة.',
    category: 'shopify',
    keywords: ['web pixels', 'web pixel api', 'analytics pixel', 'subscribe'],
  },
  {
    id: 'checkout-ui-extensions',
    en: 'Checkout UI Extensions',
    ar: 'ملحقات واجهة الدفع الأصلية',
    arExplanation: 'التقنية المعتمدة لبناء عناصر مخصصة وتعديل تجربة صفحة الدفع الرسمية لشوبيفاي عبر React.',
    category: 'shopify',
    keywords: ['checkout ui extensions', 'checkout ui', 'checkout extensibility'],
  },
  {
    id: 'cart-drawer',
    en: 'AJAX Slide-out Cart Drawer',
    ar: 'سلة التسوق المنزلقة (الدرج الجانبي)',
    arExplanation: 'لوحة جانبية تنزلق فوراً عند النقر على الشراء دون مغادرة الصفحة أو الانتقال لصفحة السلة.',
    category: 'shopify',
    keywords: ['cart drawer', 'drawer', 'ajax cart', 'slide-out cart'],
  },
  {
    id: 'sticky-atc',
    en: 'Sticky Add to Cart Bar',
    ar: 'زر الإضافة للسلة العائم / المثبت',
    arExplanation: 'شريط شراء مثبت أسفل شاشة الهاتف يبقى مرئياً دائماً حتى عند التمرير لأسفل الصفحة.',
    category: 'shopify',
    keywords: ['sticky atc', 'sticky add to cart', 'sticky bar', 'buy button'],
  },
  {
    id: 'flicker',
    en: 'Flicker / Flash of Original Content (FOOC)',
    ar: 'الوميض البصري لظهور المحتوى الأصلي',
    arExplanation: 'العيب الشائع في اختبارات أ/ب حيث يرى المستخدم النسخة الأصلية لجزء من الثانية قبل ظهور البديل.',
    category: 'shopify',
    keywords: ['flicker', 'fooc', 'anti-flicker', 'flash of original content'],
  },
  {
    id: 'metafields',
    en: 'Metafields',
    ar: 'الحقول المخصصة (ميتافيلدز)',
    arExplanation: 'بيانات وحقول إضافية تُضاف للمنتجات أو العملاء في شوبيفاي لتخصيص الواجهة وميزات العرض.',
    category: 'shopify',
    keywords: ['metafields', 'metafield', 'custom fields'],
  },
  {
    id: 'theme-app-extensions',
    en: 'Theme App Extensions (App Blocks)',
    ar: 'ملحقات تطبيقات القوالب (كتل التطبيقات)',
    arExplanation: 'الطريقة الحديثة لدمج وظائف التطبيقات داخل قوالب شوبيفاي دون تلويث كود القالب يدويًا.',
    category: 'shopify',
    keywords: ['theme app extensions', 'app blocks', 'app embed'],
  },
  {
    id: 'swatches',
    en: 'Variant Visual Swatches',
    ar: 'عينات الألوان والخيارات البصرية',
    arExplanation: 'دوائر ملونة أو صور مصغرة تمكن المشتري من اختيار اللون والمقاس بلمسة واحدة وسريعة.',
    category: 'shopify',
    keywords: ['swatches', 'color swatches', 'variant selector', 'pills'],
  },

  // Performance & Core Web Vitals
  {
    id: 'cwv',
    en: 'Core Web Vitals (CWV)',
    ar: 'مؤشرات أداء الويب الحيوية الأساسية',
    arExplanation: 'مقاييس جوجل الرسمية لتجربة المستخدم: سرعة التحميل (LCP)، الاستجابة (INP)، والاستقرار البصري (CLS).',
    category: 'perf',
    keywords: ['core web vitals', 'cwv', 'web vitals', 'lighthouse'],
  },
  {
    id: 'lcp',
    en: 'Largest Contentful Paint (LCP)',
    ar: 'زمن عرض أكبر عنصر مرئي',
    arExplanation: 'الوقت المستغرق حتى تظهر الصورة أو النص الرئيسي بالكامل على الشاشة (الهدف: أقل من 2.5 ثانية).',
    category: 'perf',
    keywords: ['lcp', 'largest contentful paint', 'hero image'],
  },
  {
    id: 'cls',
    en: 'Cumulative Layout Shift (CLS)',
    ar: 'الانزياح التراكمي في تصميم الصفحة',
    arExplanation: 'تحرك العناصر أو قفز الأزرار فجأة أثناء التصفح مما يزعج الزائر (الهدف: أقل من 0.1).',
    category: 'perf',
    keywords: ['cls', 'cumulative layout shift', 'layout shift', 'stability'],
  },
  {
    id: 'inp',
    en: 'Interaction to Next Paint (INP)',
    ar: 'زمن الاستجابة للتفاعل التالي',
    arExplanation: 'الوقت بين لحظة نقر الزائر على زر أو حقل ولحظة استجابة المتجر له بصرياً (الهدف: أقل من 200ms).',
    category: 'perf',
    keywords: ['inp', 'interaction to next paint', 'fid', 'responsiveness'],
  },
  {
    id: 'fetchpriority',
    en: 'fetchpriority="high"',
    ar: 'أولوية الجلب العالية للصور',
    arExplanation: 'وسم HTML يأمر المتصفح بتنزيل الصورة الرئيسية للمنتج بأقصى سرعة لتحسين مؤشر LCP.',
    category: 'perf',
    keywords: ['fetchpriority', 'priority', 'preload', 'eager'],
  },
  {
    id: 'render-blocking',
    en: 'Render-Blocking Resources',
    ar: 'الملفات المعيقة لتصيير الصفحة',
    arExplanation: 'ملفات JavaScript أو CSS التي توقف رسم المتجر على الشاشة حتى تنتهي من التحميل.',
    category: 'perf',
    keywords: ['render-blocking', 'blocking script', 'defer', 'async'],
  },

  // UX & Surfaces
  {
    id: 'pdp',
    en: 'Product Detail Page (PDP)',
    ar: 'صفحة تفاصيل المنتج',
    arExplanation: 'صفحة المنتج الفردية التي تحتوي على الصور، السعر، المقاسات، وزر الإضافة إلى السلة.',
    category: 'ux',
    keywords: ['pdp', 'product page', 'product detail page'],
  },
  {
    id: 'plp',
    en: 'Product Listing Page (PLP) / Collection',
    ar: 'صفحة تشكيلة / قائمة المنتجات',
    arExplanation: 'صفحة المجموعة التي تعرض شبكة من المنتجات مع خيارات التصفية والفرز والبحث.',
    category: 'ux',
    keywords: ['plp', 'collection page', 'catalog', 'collection'],
  },
  {
    id: 'above-the-fold',
    en: 'Above the Fold',
    ar: 'الجزء المرئي فور فتح الصفحة',
    arExplanation: 'المساحة التي تظهر للمستخدم فور فتح المتجر مباشرة دون الحاجة لتمرير الشاشة للأسفل.',
    category: 'ux',
    keywords: ['above the fold', 'atf', 'first screen', 'viewport'],
  },
  {
    id: 'below-the-fold',
    en: 'Below the Fold',
    ar: 'الجزء غير المرئي إلا بالتمرير',
    arExplanation: 'محتوى الصفحة الذي يقع في الأسفل ويتطلب من الزائر التمرير لمشاهدته.',
    category: 'ux',
    keywords: ['below the fold', 'btf', 'scroll depth'],
  },
  {
    id: 'heuristic-evaluation',
    en: 'Heuristic Evaluation',
    ar: 'التقييم الاستكشافي للمتجر',
    arExplanation: 'مراجعة خبير منهجية لعناصر المتجر بناءً على أفضل ممارسات وتجارب سلوك المستهلك السابقة.',
    category: 'ux',
    keywords: ['heuristic', 'heuristic evaluation', 'audit', 'ux audit'],
  },
  {
    id: 'heatmap',
    en: 'Heatmap & Scrollmap',
    ar: 'الخرائط الحرارية ومخطط التمرير',
    arExplanation: 'تمثيل بصري يوضح المناطق التي ينقر عليها الزوار ومقدار عمق تمريرهم في الصفحة.',
    category: 'ux',
    keywords: ['heatmap', 'scrollmap', 'clickmap', 'hotjar'],
  },

  // Analytics & Measurement
  {
    id: 'datalayer',
    en: 'dataLayer',
    ar: 'طبقة البيانات الرقمية',
    arExplanation: 'كائن برمجيات جافاسكربت ينظم ويمرر بيانات المشتريات والمنتجات إلى أدوات التتبع مثل GA4.',
    category: 'analytics',
    keywords: ['datalayer', 'data layer', 'tag manager', 'gtm'],
  },
  {
    id: 'ga4',
    en: 'Google Analytics 4 (GA4)',
    ar: 'تحليلات جوجل 4',
    arExplanation: 'نظام قياس السلوك المعتمد على الأحداث (Events) لتحليل مسار رحلة العميل من أول زيارة للشراء.',
    category: 'analytics',
    keywords: ['ga4', 'google analytics', 'events', 'ecommerce'],
  },
  {
    id: 'consent-mode',
    en: 'Consent Mode v2',
    ar: 'وضع موافقة الخصوصية الثاني',
    arExplanation: 'نظام ضبط إشارات التتبع وفق موافقة الزائر على ملفات تعريف الارتباط وفق القوانين الأوروبية.',
    category: 'analytics',
    keywords: ['consent mode', 'gdpr', 'cookie banner', 'privacy'],
  },
  {
    id: 'zero-party-data',
    en: 'Zero-Party Data',
    ar: 'بيانات العميل المباشرة والطوعية',
    arExplanation: 'المعلومات التي يقدمها العميل باختياره وصراحة، مثل إجابات استطلاع "كيف عرفت عنا؟".',
    category: 'analytics',
    keywords: ['zero-party data', 'zero party', 'survey', 'post-purchase'],
  },
  {
    id: 'thumb-zone',
    en: 'Thumb Zone Ergonomics',
    ar: 'منطقة الإبهام وتصميم الشاشات الذكية',
    arExplanation: 'المنطقة التي يسهل على إبهام المستخدم الوصول إليها بيد واحدة أسفل شاشة الهاتف الذكي.',
    category: 'ux',
    keywords: ['thumb zone', 'mobile', 'ergonomics', 'sticky'],
  },
  {
    id: 'value-prop',
    en: 'Value Proposition (UVP)',
    ar: 'عرض القيمة الفريد',
    arExplanation: 'البيان الواضح والمباشر الذي يوضح ما يقدمه المتجر، ولماذا هو الخيار الأفضل للعميل مقارنة بالمنافسين.',
    category: 'cro',
    keywords: ['value proposition', 'uvp', 'copywriting', 'clarity'],
  },
  {
    id: 'microcopy',
    en: 'Microcopy',
    ar: 'النصوص التوجيهية المصغرة',
    arExplanation: 'العبارات التوجيهية القصيرة التي ترشد المستخدم وتزيل مخاوف الشراء مثل عبارات الضمان وتوضيح الحقول.',
    category: 'ux',
    keywords: ['microcopy', 'reassurance', 'copywriting', 'button'],
  },
  {
    id: 'decoy-effect',
    en: 'Decoy Effect (Asymmetric Dominance)',
    ar: 'تأثير الطعم والخيارات غير المتماثلة',
    arExplanation: 'حيلة نفسية سلوكية من خلال تقديم خيار متوسط غير جذاب لجعل الباقة المستهدفة تبدو صفقة استثنائية.',
    category: 'cro',
    keywords: ['decoy effect', 'decoy', 'anchoring', 'pricing', 'bundle'],
  },
  {
    id: 'loss-aversion',
    en: 'Loss Aversion',
    ar: 'تجنب الخسارة',
    arExplanation: 'مبدأ نفسي يثبت أن ألم فقدان شيء يعادل ضعف متعة الحصول عليه، ويستخدم في أشرطة الشحن المجاني.',
    category: 'cro',
    keywords: ['loss aversion', 'endowment', 'psychology', 'threshold'],
  },
  {
    id: 'predictive-search',
    en: 'Predictive Search',
    ar: 'البحث التنبؤي التفاعلي السريع',
    arExplanation: 'عرض نتائج وتوصيات المنتجات اللحظية فور بدء العميل بكتابة الحروف في مربع البحث.',
    category: 'ux',
    keywords: ['predictive search', 'autocomplete', 'search', 'debounce'],
  },
  {
    id: 'ddp-shipping',
    en: 'Delivered Duty Paid (DDP)',
    ar: 'التسليم مع دفع الرسوم الجمركية مسبقاً',
    arExplanation: 'تحصيل الضرائب والجمارك بالكامل عند الدفع في المتجر لتجنب مفاجأة العميل بأي رسوم عند الاستلام.',
    category: 'shopify',
    keywords: ['ddp', 'ddu', 'customs', 'taxes', 'cross-border', 'markets'],
  },
  {
    id: 'srm',
    en: 'Sample Ratio Mismatch (SRM)',
    ar: 'خلل نسبة توزيع عينة الاختبار',
    arExplanation: 'وجود تفاوت غير طبيعي بين نسب زوار مجموعات الاختبار (A/B)، ما يدل على عطل فني يبطل النتائج.',
    category: 'stats',
    keywords: ['srm', 'sample ratio mismatch', 'chi-square', 'telemetry'],
  },
];

/**
 * Automatically find matching Arabic terms for any given text, lesson, or exercise
 */
export const findArabicTermsInText = (text: string): ArabicTerm[] => {
  if (!text) return [];
  const lower = text.toLowerCase();
  const matched: ArabicTerm[] = [];

  for (const term of ARABIC_GLOSSARY) {
    const hasMatch = term.keywords.some((kw) => lower.includes(kw.toLowerCase()));
    if (hasMatch && !matched.some((m) => m.id === term.id)) {
      matched.push(term);
    }
  }

  return matched;
};

/**
 * Get terms specifically relevant to a module
 */
export const getTermsForModuleId = (moduleId: string): ArabicTerm[] => {
  const modNum = parseInt(moduleId.replace(/[^0-9]/g, ''), 10);
  if (isNaN(modNum)) return ARABIC_GLOSSARY.slice(0, 5);

  // Group by phase topics
  if (modNum >= 1 && modNum <= 4) {
    return ARABIC_GLOSSARY.filter((t) => t.category === 'cro' || t.category === 'analytics');
  } else if (modNum >= 5 && modNum <= 8) {
    return ARABIC_GLOSSARY.filter((t) => t.category === 'stats' || t.category === 'perf');
  } else if (modNum >= 9 && modNum <= 12) {
    return ARABIC_GLOSSARY.filter((t) => t.category === 'shopify' || t.category === 'ux');
  } else if (modNum >= 13 && modNum <= 16) {
    return ARABIC_GLOSSARY.filter((t) => t.category === 'shopify' || t.category === 'cro' || t.category === 'stats');
  } else if (modNum >= 17 && modNum <= 20) {
    return ARABIC_GLOSSARY.filter((t) => t.category === 'ux' || t.category === 'cro' || t.category === 'shopify');
  } else {
    return ARABIC_GLOSSARY.filter((t) => t.category === 'stats' || t.category === 'ux' || t.category === 'cro');
  }
};
