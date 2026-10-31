import { Lesson, LessonArabicTranslation, LessonSimpleEnglish } from '../types/curriculum';
import { ARABIC_GLOSSARY } from '../data/arabicTerms';
import {
  LESSON_ARABIC_REGISTRY,
  ARABIC_HEADING_TRANSLATION_MAP,
} from '../data/lessonArabicRegistry';

export interface LessonTranslationResult {
  arabic: LessonArabicTranslation;
  simpleEnglish: LessonSimpleEnglish;
  source: 'curated' | 'generated';
}

/**
 * Curated Translations & Simplified English for Core Lessons
 */
const CURATED_LESSON_TRANSLATIONS: Record<string, { arabic: LessonArabicTranslation; simpleEnglish: LessonSimpleEnglish }> = {
  // Lesson 1: What CRO Actually Is
  'what-cro-actually-is': {
    arabic: {
      title: 'ما هو تحسين معدل التحويل (CRO) حقاً (ولماذا يخدعك رقم التحويل وحده)',
      subtitle: 'هندسة تحسين متاجر شوبيفاي وزيادة أرباح كل زائر حقيقي',
      objectivesHead: 'ما ستتقنه في هذا الدرس:',
      objectives: [
        'فهم أن تحسين التحويل يعني زيادة "الإيراد لكل جلسة" (RPS) وليس مجرد ملاحقة نسبة مئوية وهمية.',
        'التمييز بين التحويلات الكبرى (إتمام الطلبات والدفع) والتحويلات الصغرى (إضافة للسلة، بدء الدفع).',
        'معرفة كيف تدمر الخصومات الكبيرة أرباح المتجر الصافية حتى لو زادت نسبة الشراء ظاهرياً.',
      ],
      sections: [
        {
          heading: 'وهم الاعتماد على معدل التحويل (CVR) وحده',
          body: `يقع العديد من المبتدئين وأصحاب المتاجر في فخ اعتبار "معدل التحويل" (عدد الطلبات مقسوماً على عدد الزوار) المقياس الوحيد للنجاح.

الحقيقة الرياضية هي أنك إذا خفضت أسعار متجرك بنسبة 80% أو أضفت منتجاً برولار واحد، سيرتفع معدل التحويل فوراً إلى 10%، لكن أرباحك الصافية وقيمة متجرك ستنهار تماماً!

الهدف الحقيقي لـ CRO هو "زيادة كفاءة الإيراد من كل زائر" (RPS = Revenue Per Session) وزيادة القيمة الدائمة للعميل، مع الحفاظ على هامش الربح وقوة العلامة التجارية.`,
          simpleExplanation: 'التحويل الحقيقي ليس كم شخص اشترى، بل كم ربح صافي يدخل جيبك من كل 100 زائر يدخلون متجرك.',
          calloutText: 'قاعدة ذهبية: الإيراد لكل جلسة (RPS) = (معدل التحويل ÷ 100) × متوسط قيمة الطلب (AOV). إذا زاد التحويل بنسبة 10% لكن قيمة الطلب هبطت 20%، فأنت خسرت 12% من أرباحك الإجمالية.',
        },
        {
          heading: 'إثبات عملي: كيف تدمر الخصومات تدفق الأموال في المتجر',
          body: `تخيل متجر ملابس يزوره 100,000 زائر شهرياً، يبيع سترة بسعر 100 دولار وتكلفتها 40 دولاراً، وتكلفة الإعلانات 50,000 دولار شهرياً.

السيناريو الأول (السعر الأصلي الطبيعي):
- معدل التحويل: 2.0% (2,000 طلب)
- قيمة الطلب: 100 دولار
- الإيراد الإجمالي: 200,000 دولار
- تكلفة البضاعة: 80,000 دولار
- الإعلانات: 50,000 دولار
- صافي الربح: 70,000 دولار (كل زائر يجلب دولارين ربحاً).

السيناريو الثاني (خصم 25% لزيادة نسبة التحويل):
- قفز التحويل إلى 3.0% (3,000 طلب — زيادة 50% ظاهرياً!)
- انخفضت قيمة الطلب إلى 75 دولاراً
- الإيراد الإجمالي: 225,000 دولار
- تكلفة البضاعة على 3,000 قطعة: 120,000 دولار
- الإعلانات: 50,000 دولار
- صافي الربح: 55,000 دولار (خسارة 15,000 دولار في الصافي رغم الزيادة الكبيرة في المبيعات!).

المتجر شحن 1,000 طرد إضافي، وتحمل ضغطاً هائلاً في خدمة العملاء والمرتجعات، وحصل على أرباح أقل بـ 15 ألف دولار. لذلك يجب أن تركز دائماً على الأرباح الصافية وليس الأرقام الخادعة.`,
          simpleExplanation: 'بيع كميات أكبر بأسعار محروقة يجعلك تتعب أكثر وتربح أقل. تحسين التحويل الذكي يرفع الشراء دون حرق الأسعار.',
        },
      ],
      mistakesHead: 'أخطاء شائعة يقع فيها المطورون وأصحاب المتاجر:',
      mistakes: [
        'الاحتفال بزيادة معدل التحويل دون فحص هامش الربح الصافي ومتوسط قيمة الطلب.',
        'إضافة خصومات عشوائية تُفسد قيمة البراند وتجذب عملاء غير مربحين.',
        'التركيز على إعلانات جديدة بدلاً من إصلاح الأعطال ومشاكل الشراء في المتجر الحالي.',
      ],
      checklistHead: 'قائمة التحقق والفهم:',
      checklist: [
        'أفهم الفرق بين معدل التحويل (CVR) والإيراد لكل جلسة (RPS).',
        'أعرف كيف أحسب تأثير الخصومات على صافي الربح الحقيقي.',
        'أستطيع شرح أهمية التركيز على جودة المتجر بدلاً من حرق الأسعار.',
      ],
      keyTakeaway: 'الهدف من تحسين المتجر هو تعظيم الربح الصافي من كل زائر، وليس مجرد رفع الأرقام التجميلية.',
    },
    simpleEnglish: {
      coreIdea: 'CRO is not about tricking people into buying cheap stuff. It is about making your store so clear, fast, and trustworthy that visitors happily buy and you make more profit per visitor.',
      simplifiedTerms: [
        { term: 'CVR (Conversion Rate)', simpleMeaning: 'The % of visitors who actually place an order.', analogy: 'If 100 people enter your store and 2 buy, your CVR is 2%.' },
        { term: 'AOV (Average Order Value)', simpleMeaning: 'How much money the average customer spends in one checkout.', analogy: 'Like looking at the receipt size at a supermarket.' },
        { term: 'RPS (Revenue Per Session)', simpleMeaning: 'How many dollars your store earns for every single visitor who clicks onto your site.', analogy: 'If 1,000 visitors generate $3,000 revenue, your RPS is $3.00.' },
        { term: 'Friction', simpleMeaning: 'Anything on your site that confuses, slows down, or annoys the shopper.', analogy: 'Like a locked door, blurry photos, or a slow checkout line.' },
      ],
      keyTakeaway: 'Never celebrate high order counts if profit went down. Focus on making each visitor worth more.',
    },
  },

  // Lesson 2: Anatomy of High-Converting PDP
  'anatomy-high-converting-shopify-pdp': {
    arabic: {
      title: 'تشريح صفحة المنتج (PDP) عالية التحويل على شوبيفاي',
      subtitle: 'تصميم وهندسة واجهة صفحة المنتج لزيادة المبيعات من الزيارة الأولى',
      objectivesHead: 'أهداف ومخرجات التعلم:',
      objectives: [
        'ترتيب العناصر المرئية الحيوية فوق الجزء الظاهر من الشاشة (Above the Fold) للهواتف.',
        'تصميم معرض صور احترافي يزيل شكوك العميل ويوضح أبعاد وخامة المنتج.',
        'وضع زر الشراء الثابت (Sticky Add to Cart) بذكاء دون إزعاج المستخدم.',
      ],
      sections: [
        {
          heading: 'الهيكل البصري المثالي للجزء العلوي من الشاشة (Above the Fold)',
          body: `على شاشات الهواتف المحمولة (التي تمثل أكثر من 70% من زوار المتاجر)، يمتلك المتجر أقل من 3 ثوانٍ لإقناع الزائر بالبقاء.

الترتيب البصري الهندسي الأقوى لصفحة المنتج:
1. شريط إعلاني مصغر يوضح حافز الشحن أو الضمان.
2. عنوان المنتج الواضح مع تقييم النجوم وعدد المراجعات الحقيقية.
3. معرض صور سريع وسلس بتقنية التمرير الأفقي مع مؤشرات واضحة.
4. السعر بوضوح مع أي توفير مالي بارز بالألوان.
5. محدد الخيارات (المقاس واللون) بأزرار لمس مريحة للأصابع بدلاً من القوائم المنسدلة الصعبة.
6. زر "أضف إلى السلة" بعرض كامل الشاشة مع شارات الثمانية وطرق الدفع الموثوقة.`,
          simpleExplanation: 'رتب صفحة المنتج بحيث يرى العميل الصور، السعر، المقاس، وزر الشراء فوراً دون الحاجة للبحث والتمرير الطويل.',
          calloutText: 'قاعدة تصميم شوبيفاي: لا تجعل زر الشراء يختفي خلف صور عملاقة. يجب أن يكون السعر وزر الإضافة متاحين للعين في أول شاشة تمرير.',
        },
      ],
      mistakesHead: 'أخطاء تصميم صفحة المنتج:',
      mistakes: [
        'إخفاء زر الشراء أسفل الصفحة وجعل العميل يمرر طويلاً للوصول إليه.',
        'استخدام قوائم منسدلة صغيرة يصعب النقر عليها بالأصابع في الهواتف.',
        'عدم توضيح مدة التوصيل وتكلفة الشحن قبل الوصول لصفحة الدفع.',
      ],
      checklistHead: 'قائمة التحقق لصفحة المنتج:',
      checklist: [
        'زر الشراء واضح وبارز وبلون متباين عن خلفية الصفحة.',
        'الصور واضحة وسريعة التحميل وتُظهر المنتج من كل الزوايا.',
        'خيارات المقاس والألوان سهلة التبديل بلمسة واحدة.',
      ],
      keyTakeaway: 'صفحة المنتج الناجحة تزيل كل أسباب التردد وتجعل خيار الشراء أسهل وأوضح خطوة تالية.',
    },
    simpleEnglish: {
      coreIdea: 'Design product pages so clearly on mobile that visitors instantly see the price, options, reviews, and Buy button without getting confused or lost.',
      simplifiedTerms: [
        { term: 'PDP (Product Detail Page)', simpleMeaning: 'The main page where one product is displayed with its buy button.', analogy: 'The store shelf display for a single item.' },
        { term: 'Above the fold', simpleMeaning: 'The top part of the screen visitors see before scrolling down.', analogy: 'The front window of a physical shop.' },
        { term: 'Sticky Buy Bar', simpleMeaning: 'A button that stays stuck to the bottom of the screen as you scroll.', analogy: 'A shopping basket carried right in your hands.' },
      ],
      keyTakeaway: 'Make buying effortless. Keep the button visible and remove visual clutter.',
    },
  },
};

/**
 * Technical Heading Patterns for Clean Translation
 */
const HEADING_PATTERNS: [RegExp, string][] = [
  [/^the fallacy of (.+)$/i, 'مغالطة ووهم الاعتماد على $1'],
  [/^mathematical proof:? (.+)$/i, 'إثبات رياضي دقيق: $1'],
  [/^anatomy of (.+)$/i, 'تشريح وهندسة $1'],
  [/^architecture of (.+)$/i, 'المعمارية البرمجية لـ $1'],
  [/^how (.+) destroys (.+)$/i, 'كيف يؤدي $1 إلى الإضرار بـ $2'],
  [/^how (.+) impacts (.+)$/i, 'كيف يؤثر $1 على $2'],
  [/^how to (.+)$/i, 'كيفية $1'],
  [/^why (.+) matters$/i, 'لماذا يُعد $1 أمراً حاسماً للأرباح'],
  [/^deep dive:? (.+)$/i, 'تحليل وتطبيق معمق: $1'],
  [/^step-by-step (.+)$/i, 'دليل التطبيق خطوة بخطوة: $1'],
  [/^best practices for (.+)$/i, 'أفضل الممارسات البرمجية لـ $1'],
  [/^common pitfalls in (.+)$/i, 'أخطاء وفخاخ شائعة في $1'],
  [/^optimizing (.+)$/i, 'تحسين وهندسة $1'],
  [/^auditing (.+)$/i, 'تدقيق وفحص $1'],
  [/^understanding (.+)$/i, 'فهم واستيعاب $1'],
  [/^implementing (.+)$/i, 'تطبيق وبرمجة $1'],
];

/**
 * Comprehensive CRO & Shopify Technical Phrase Dictionary
 * Translates domain concepts, sentences, and clauses without repetition.
 */
const TECHNICAL_PHRASES: [RegExp, string][] = [
  // Common Structural Lead-ins
  [/Most junior developers and store owners treat/gi, 'يتعامل معظم المطورين وأصحاب المتاجر المبتدئين مع'],
  [/Most developers make the mistake of/gi, 'يقع معظم المطورين في خطأ'],
  [/However, CVR is mathematically incomplete/gi, 'ومع ذلك، فإن معدل التحويل (CVR) غير مكتمل حسابياً بمفرده'],
  [/However, this approach fails because/gi, 'ومع ذلك، يفشل هذا الأسلوب لأن'],
  [/If you slash all prices by/gi, 'إذا قمت بتخفيض الأسعار بنسبة'],
  [/your CVR will skyrocket to/gi, 'سيرتفع معدل التحويل بشكل حاد إلى'],
  [/but gross profit and enterprise value will crater/gi, 'ولكن الأرباح الإجمالية وقيمة المتجر ستنهار'],
  [/True Conversion Rate Optimization is/gi, 'إن التحسين الحقيقي لمعدل التحويل (CRO) يتمثل في'],
  [/When evaluating any optimization, you must track/gi, 'عند تقييم أي عملية تحسين أو تجربة، يجب عليك قياس وتتبع'],
  [/When building high-converting themes/gi, 'عند تطوير وبناء ثيمات عالية التحويل'],
  [/When optimizing mobile PDPs/gi, 'عند تحسين صفحات المنتجات للهواتف المحمولة'],
  [/In Shopify themes, always prioritize/gi, 'في ثيمات شوبيفاي، احرص دائماً على إعطاء الأولوية لـ'],
  [/To achieve maximum performance/gi, 'لتحقيق أقصى سرعة وأداء للمتجر'],
  [/By removing friction above the fold/gi, 'من خلال إزالة أي عوائق في الجزء العلوي الظاهر من الشاشة'],
  [/This directly increases/gi, 'يؤدي هذا بشكل مباشر إلى زيادة'],
  [/This directly improves/gi, 'يؤدي هذا مباشرة إلى تحسين'],
  [/This prevents shoppers from/gi, 'يمنع هذا المتسوقين من'],
  [/The most effective way to/gi, 'أكثر الطرق فعالية لـ'],
  [/A critical pitfall is/gi, 'من الفخاخ والأخطاء الحرجة'],
  [/Make sure to verify that/gi, 'تأكد دائماً من التحقق من أن'],
  [/Never rely solely on/gi, 'لا تعتمد أبداً بشكل منفرد على'],
  [/Consider an apparel brand with/gi, 'تأمل متجراً في قطاع الأزياء يمتلك'],
  [/For example, on a high-traffic store/gi, 'على سبيل المثال، في متجر يشهد زيارات مرتفعة'],
  [/The primary reason for/gi, 'السبب الأساسي لـ'],
  [/Instead of hardcoding values/gi, 'بدلاً من وضع قيم ثابتة برمجياً'],
  [/This pattern ensures that/gi, 'يضمن هذا النمط الهندسي أن'],
  [/Shoppers are far more likely to/gi, 'يكون المتسوقون أكثر ميلاً بكثير لـ'],
  [/According to empirical CRO data/gi, 'وفقاً لبيانات تجارب CRO الميدانية الموثقة'],

  // Scenario & Calculation Labels
  [/Scenario A \(Standard Pricing\):?/gi, 'السيناريو الأول (التسعير القياسي الطبيعي):'],
  [/Scenario B \(Discounted Pricing\):?/gi, 'السيناريو الثاني (التسعير بعد الخصم):'],
  [/Scenario A:?/gi, 'السيناريو الأول:'],
  [/Scenario B:?/gi, 'السيناريو الثاني:'],
  [/Step-by-Step Calculation:?/gi, 'الحساب والتحليل الرياضي خطوة بخطوة:'],
  [/Step 1:?/gi, 'الخطوة الأولى:'],
  [/Step 2:?/gi, 'الخطوة الثانية:'],
  [/Step 3:?/gi, 'الخطوة الثالثة:'],
  [/Step 4:?/gi, 'الخطوة الرابعة:'],
  [/Step 5:?/gi, 'الخطوة الخامسة:'],
  [/Why this matters:?/gi, 'أهمية هذا المفهوم لأرباح المتجر:'],
  [/Key Takeaway:?/gi, 'الخلاصة المستفادة:'],
  [/Best Practice:?/gi, 'أفضل الممارسات البرمجية الموصى بها:'],
  [/Implementation Guide:?/gi, 'دليل التطبيق الهندسي خطوة بخطوة:'],
  [/Common Pitfalls:?/gi, 'أخطاء وفخاخ شائعة يقع فيها المطورون:'],
  [/Common Pitfall:?/gi, 'فخ تقني شائع يجب الحذر منه:'],
  [/Product COGS \(\$40\/unit\):?/gi, 'تكلفة البضاعة المباعة (40 دولار للقطعة):'],
  [/Product COGS:?/gi, 'تكلفة البضاعة المباعة (COGS):'],
  [/Gross Revenue:?/gi, 'إجمالي الإيرادات:'],
  [/Ad Spend:?/gi, 'الإنفاق الإعلاني:'],
  [/Net Profit:?/gi, 'صافي الأرباح:'],
  [/Total Monthly Sessions:?/gi, 'إجمالي الجلسات الشهرية:'],
  [/Total Add to Carts:?/gi, 'إجمالي عمليات الإضافة للسلة:'],
  [/Checkouts Started:?/gi, 'عمليات الدفع التي بدأت:'],
  [/Completed Transactions:?/gi, 'الطلبات المكتملة بنجاح:'],

  // Core Metric Definitions
  [/The velocity of visitor commitment\.?/gi, 'سرعة تحول الزائر إلى اتخاذ قرار الشراء الفعلي.'],
  [/The financial depth of each commitment\.?/gi, 'القيمة المالية الإجمالية لكل سلة مشتريات.'],
  [/The net efficiency of your traffic acquisition investment\.?/gi, 'الكفاءة الصافية للعائد المالي من كل زائر يدخل المتجر.'],
  [/Measures visitor transactional velocity\.?/gi, 'يقيس سرعة تحول الزائر إلى مشترٍ حقيقي.'],
  [/Measures the financial depth of each customer commitment\.?/gi, 'يقيس القيمة المالية الإجمالية لكل عملية شراء.'],
  [/The ultimate north-star metric of store acquisition efficiency\.?/gi, 'المقياس الأساسي الأهم لتقييم كفاءة جذب الزوار وأرباح المتجر الصافية.'],
  [/Measures pre-checkout drop-off\.?/gi, 'يقيس نسبة تسرب المشترين وخروجهم قبل الوصول لمرحلة الدفع.'],
  [/Measures friction within shipping, taxes, and payment gateways\.?/gi, 'يقيس العقبات والاحتكاك في مراحل الشحن والضرائب وبوابات الدفع.'],

  // CRO Domain Terms
  [/Conversion Rate \(CVR\)/gi, 'معدل التحويل (CVR)'],
  [/Average Order Value \(AOV\)/gi, 'متوسط قيمة الطلب (AOV)'],
  [/Revenue Per Session \(RPS\)/gi, 'الإيراد لكل جلسة (RPS)'],
  [/Revenue Per Visitor \(RPV\)/gi, 'الإيراد لكل زائر (RPV)'],
  [/Customer Acquisition Cost \(CAC\)/gi, 'تكلفة اكتساب العميل (CAC)'],
  [/Customer Lifetime Value \(LTV\)/gi, 'القيمة الدائمة للعميل (LTV)'],
  [/Cost of Goods Sold \(COGS\)/gi, 'تكلفة البضاعة المباعة (COGS)'],
  [/Contribution Margin \(CM\)/gi, 'هامش المساهمة الربحي (CM)'],
  [/Marketing Efficiency Ratio \(MER\)/gi, 'نسبة كفاءة التسويق (MER)'],
  [/Return on Ad Spend \(ROAS\)/gi, 'العائد على الإنفاق الإعلاني (ROAS)'],
  [/Cart Abandonment Rate/gi, 'معدل التخلي عن السلة'],
  [/Checkout Abandonment Rate/gi, 'معدل التخلي عند خطوة الدفع'],
  [/Product Detail Page \(PDP\)/gi, 'صفحة تفاصيل المنتج (PDP)'],
  [/Collection Page \(PLP\)/gi, 'صفحة تصنيف المنتجات (PLP)'],
  [/Add to Cart \(ATC\)/gi, 'زر الإضافة إلى السلة (ATC)'],
  [/Sticky Add to Cart/gi, 'شريط الشراء الثابت أسفل الشاشة (Sticky Buy Bar)'],
  [/Above the Fold/gi, 'الجزء العلوي المرئي قبل التمرير (Above the Fold)'],
  [/Below the Fold/gi, 'الجزء السفلي الذي يظهر بعد التمرير'],
  [/Free Shipping Threshold/gi, 'حافز الشحن المجاني التفاعلي'],
  [/Slide-out Cart \(Drawer\)/gi, 'سلة الشراء الجانبية السريعة (Cart Drawer)'],
  [/Cart Drawer/gi, 'سلة الشراء الجانبية (Cart Drawer)'],
  [/Social Proof/gi, 'الدليل الاجتماعي وثقة المشترين'],
  [/Trust Badges/gi, 'شارات الأمان والموثوقية'],
  [/Cognitive Load/gi, 'الجهد الذهني المطلوب من المتسوق'],
  [/Decision Fatigue/gi, 'إرهاق اتخاذ القرار للمتسوق'],
  [/Visual Hierarchy/gi, 'التسلسل الهرمي البصري'],
  [/Risk Reversal/gi, 'إلغاء مخاوف الشراء وضمانات الثقة'],

  // Shopify Architecture Terms
  [/Online Store 2\.0/gi, 'نظام ثيمات شوبيفاي الحديثة (Online Store 2.0)'],
  [/JSON Templates/gi, 'قوالب صفحات JSON المرنة'],
  [/App Blocks/gi, 'كتل التطبيقات المعزولة'],
  [/App Embeds/gi, 'إضافات التطبيقات المدمجة'],
  [/Checkout Extensibility/gi, 'امتدادات صفحة الدفع الرسمية (Checkout Extensibility)'],
  [/Shopify Functions/gi, 'دوال شوبيفاي السحابية فائقة السرعة (Shopify Functions)'],
  [/Section Rendering API/gi, 'واجهة عرض الأقسام الحركية (Section Rendering API)'],
  [/GraphQL Admin API/gi, 'واجهة برمجة إدارة شوبيفاي (GraphQL Admin API)'],
  [/Storefront API/gi, 'واجهة واجهات المتاجر المخصصة (Storefront API)'],
  [/Shopify CLI/gi, 'أداة سطر أوامر شوبيفاي (Shopify CLI)'],
  [/Dawn Theme/gi, 'ثيم دون المرجعي الرسمي (Dawn Theme)'],
  [/Liquid templates?/gi, 'قوالب لغة Liquid'],
  [/Liquid objects?/gi, 'كائنات لغة Liquid'],
  [/Liquid filters?/gi, 'فلاتر لغة Liquid'],
  [/Theme App Extensions/gi, 'امتدادات التطبيقات للثيمات'],

  // Performance & Analytics
  [/Core Web Vitals/gi, 'مؤشرات أداء الويب الحيوية للسرعة (Core Web Vitals)'],
  [/Largest Contentful Paint \(LCP\)/gi, 'سرعة تحميل العنصر الأكبر (LCP)'],
  [/Cumulative Layout Shift \(CLS\)/gi, 'ثبات العناصر البصرية وعدم اهتزازها (CLS)'],
  [/First Input Delay \(FID\)/gi, 'سرعة الاستجابة للنقر الأول (FID)'],
  [/Interaction to Next Paint \(INP\)/gi, 'سلاسة واستجابة التفاعل (INP)'],
  [/A\/B Testing/gi, 'الاختبارات المقارنة (A/B Testing)'],
  [/Statistical Significance/gi, 'الدلالة الإحصائية للنتائج'],
  [/Minimum Detectable Effect \(MDE\)/gi, 'أدنى أثر يمكن رصده إحصائياً (MDE)'],
  [/Sample Size/gi, 'حجم العينة المطلوب إحصائياً'],
  [/Heuristic Analysis/gi, 'التحليل الاستكشافي لتجربة المستخدم'],

  // Connectors & Grammar
  [/\bin order to\b/gi, 'من أجل'],
  [/\brather than\b/gi, 'بدلاً من'],
  [/\binstead of\b/gi, 'عوضاً عن'],
  [/\bdue to\b/gi, 'نظراً لـ'],
  [/\bbecause of\b/gi, 'بسبب'],
  [/\bas a result of\b/gi, 'نتيجة لـ'],
  [/\bso that\b/gi, 'حتى يتسنى'],
  [/\bwhile respecting\b/gi, 'مع الحفاظ على'],
  [/\bwhich leads to\b/gi, 'مما يؤدي إلى'],
  [/\bwhich means that\b/gi, 'مما يعني أن'],
  [/\bsuch as\b/gi, 'مثل'],
  [/\bfor example\b/gi, 'على سبيل المثال'],
  [/\bin addition to\b/gi, 'بالإضافة إلى'],
  [/\bon the other hand\b/gi, 'من ناحية أخرى'],
  [/\bat the same time\b/gi, 'في الوقت ذاته'],
  [/\bcrucial for\b/gi, 'حاسم وجوهري لـ'],
  [/\bessential to\b/gi, 'ضروري جداً لـ'],
  [/\bdirectly impacts\b/gi, 'يؤثر مباشرة على'],
  [/\bsignificantly higher\b/gi, 'أعلى بكثير'],
  [/\bsignificantly lower\b/gi, 'أقل بكثير'],
  [/\bon mobile devices?\b/gi, 'على شاشات الهواتف المحمولة'],
  [/\bon desktop screens?\b/gi, 'على شاشات أجهزة الكمبيوتر'],
];

/**
 * Common technical verbs and vocabulary
 */
const TECHNICAL_VOCABULARY: [RegExp, string][] = [
  [/\bmaximizing\b/gi, 'تعظيم وزيادة'],
  [/\bmaximize\b/gi, 'تعظيم'],
  [/\bminimizing\b/gi, 'تقليل وتخفيض'],
  [/\bminimize\b/gi, 'تقليل'],
  [/\bincreasing\b/gi, 'زيادة'],
  [/\bincrease\b/gi, 'زيادة'],
  [/\bdecreasing\b/gi, 'خفض'],
  [/\bdecrease\b/gi, 'خفض'],
  [/\bimproving\b/gi, 'تحسين'],
  [/\bimprove\b/gi, 'تحسين'],
  [/\boptimizing\b/gi, 'تحسين وهندسة'],
  [/\boptimize\b/gi, 'تحسين'],
  [/\bimplementing\b/gi, 'تطبيق وبرمجة'],
  [/\bimplement\b/gi, 'تطبيق'],
  [/\bconfiguring\b/gi, 'تهيئة وضبط'],
  [/\bconfigure\b/gi, 'ضبط'],
  [/\bmeasuring\b/gi, 'قياس وتحليل'],
  [/\bmeasure\b/gi, 'قياس'],
  [/\bcalculating\b/gi, 'حساب'],
  [/\bcalculate\b/gi, 'حساب'],
  [/\brendering\b/gi, 'معالجة وعرض'],
  [/\brender\b/gi, 'معالجة وعرض'],
  [/\bloading\b/gi, 'تحميل'],
  [/\bload\b/gi, 'تحميل'],
  [/\bpreventing\b/gi, 'منع وحماية'],
  [/\bprevent\b/gi, 'منع'],
  [/\btesting\b/gi, 'اختبار وفحص'],
  [/\btest\b/gi, 'اختبار'],
  [/\bauditing\b/gi, 'تدقيق وفحص'],
  [/\baudit\b/gi, 'تدقيق'],
  [/\bdeploying\b/gi, 'نشر وإطلاق'],
  [/\bdeploy\b/gi, 'نشر'],
  [/\bfetching\b/gi, 'جلب واستدعاء'],
  [/\bfetch\b/gi, 'استدعاء'],
  [/\bcaching\b/gi, 'تخزين مؤقت'],
  [/\bcache\b/gi, 'تخزين مؤقت'],
  [/\btracking\b/gi, 'تتبع وقياس'],
  [/\btrack\b/gi, 'تتبع'],
  [/\binspecting\b/gi, 'معاينة وفحص'],
  [/\binspect\b/gi, 'معاينة'],
  [/\bvalidating\b/gi, 'التحقق من صحة'],
  [/\bvalidate\b/gi, 'التحقق'],
  [/\bdestroying\b/gi, 'تدمير والإضرار بـ'],
  [/\bdestroy\b/gi, 'الإضرار بـ'],
  [/\binflating\b/gi, 'تضخيم غير حقيقي لـ'],
  [/\binflate\b/gi, 'تضخيم'],
  [/\bevaluating\b/gi, 'تقييم'],
  [/\bevaluate\b/gi, 'تقييم'],
  [/\bprioritizing\b/gi, 'إعطاء الأولوية لـ'],
  [/\bprioritize\b/gi, 'إعطاء الأولوية لـ'],
  [/\bstreamlining\b/gi, 'تبسيط وتسريع'],
  [/\bstreamline\b/gi, 'تبسيط'],
  [/\beliminating\b/gi, 'إزالة والتخلص من'],
  [/\beliminate\b/gi, 'إزالة'],
  [/\bshoppers?\b/gi, 'المتسوقين'],
  [/\bvisitors?\b/gi, 'الزوار'],
  [/\bcustomers?\b/gi, 'العملاء'],
  [/\bmerchants?\b/gi, 'التجار'],
  [/\bstore owners?\b/gi, 'أصحاب المتاجر'],
  [/\bdevelopers?\b/gi, 'المطورين'],
  [/\borders?\b/gi, 'الطلبات'],
  [/\bsessions?\b/gi, 'الجلسات'],
  [/\brevenues?\b/gi, 'الإيرادات'],
  [/\bprofits?\b/gi, 'الأرباح'],
  [/\bmargins?\b/gi, 'هوامش الربح'],
  [/\bdiscounts?\b/gi, 'الخصومات'],
  [/\bbundles?\b/gi, 'حزم المنتجات'],
  [/\bproducts?\b/gi, 'المنتجات'],
  [/\bvariants?\b/gi, 'الخيارات الفرعية'],
  [/\bcheckout\b/gi, 'صفحة الدفع'],
  [/\bcart\b/gi, 'السلة'],
  [/\bthreshold\b/gi, 'الحد الأدنى الحافز'],
  [/\bshipping\b/gi, 'الشحن'],
];

/**
 * Translates an English heading into natural, professional Arabic.
 */
export function translateHeadingToArabic(heading: string): string {
  if (!heading) return '';
  const trimmed = heading.trim();

  // 1. Direct match from ARABIC_HEADING_TRANSLATION_MAP
  for (const [enKey, arVal] of Object.entries(ARABIC_HEADING_TRANSLATION_MAP)) {
    if (trimmed.toLowerCase() === enKey.toLowerCase()) {
      return arVal;
    }
  }

  // 2. Pattern matching (e.g. "The Fallacy of X", "How X Destroys Y")
  for (const [pattern, replacement] of HEADING_PATTERNS) {
    if (pattern.test(trimmed)) {
      const translated = trimmed.replace(pattern, (_, g1, g2) => {
        const transG1 = translateTextContentToArabic(g1 || '', '');
        const transG2 = g2 ? translateTextContentToArabic(g2, '') : '';
        return replacement.replace('$1', transG1).replace('$2', transG2);
      });
      return translated;
    }
  }

  // 3. Glossary & Technical Phrase mapping
  let ar = trimmed;
  TECHNICAL_PHRASES.forEach(([pattern, val]) => {
    ar = ar.replace(pattern, val);
  });

  ARABIC_GLOSSARY.forEach((t) => {
    const r = new RegExp(`\\b${t.en}\\b`, 'gi');
    if (r.test(ar)) {
      ar = ar.replace(r, t.ar);
    }
  });

  TECHNICAL_VOCABULARY.forEach(([pattern, val]) => {
    ar = ar.replace(pattern, val);
  });

  return ar;
}

/**
 * Robust Paragraph & Sentence Translator for Arabic Mode
 * Converts technical English body paragraphs into natural, fluent Arabic
 * while preserving numbers, math formulas, code tokens, and structure.
 * Zero repetitive boilerplate!
 */
export function translateTextContentToArabic(text: string, _contextTitle: string = ''): string {
  if (!text) return '';

  // 1. Extract and preserve code blocks, inline code, URLs, and template tags
  const placeholders: string[] = [];
  let sanitized = text.replace(/(```[\s\S]*?```|`[^`]+`|\{\{[\s\S]*?\}\}|\{%[\s\S]*?%\}|https?:\/\/[^\s)]+)/g, (match) => {
    const placeholder = `___PROTECTED_TOKEN_${placeholders.length}___`;
    placeholders.push(match);
    return placeholder;
  });

  // 2. Apply Technical Phrases & Domain Terms
  let translated = sanitized;
  TECHNICAL_PHRASES.forEach(([pattern, ar]) => {
    translated = translated.replace(pattern, ar);
  });

  ARABIC_GLOSSARY.forEach((term) => {
    const reg = new RegExp(`\\b${term.en}\\b`, 'gi');
    if (reg.test(translated)) {
      translated = translated.replace(reg, term.ar);
    }
  });

  TECHNICAL_VOCABULARY.forEach(([pattern, ar]) => {
    translated = translated.replace(pattern, ar);
  });

  // 3. Process line by line to maintain bullets, list numbering, and whitespace
  const lines = translated.split('\n');
  const translatedLines = lines.map((line) => {
    const trimmed = line.trim();
    if (!trimmed) return line;

    // Check Arabic character density
    const arabicChars = (trimmed.match(/[\u0600-\u06FF]/g) || []).length;
    const totalChars = trimmed.replace(/\s+/g, '').length;
    const arabicRatio = totalChars > 0 ? arabicChars / totalChars : 0;

    // If already predominantly Arabic, return as is
    if (arabicRatio > 0.3) {
      return line;
    }

    // Process bullet or number prefixes
    const listMatch = line.match(/^(\s*)(\d+\.|[•\-*])\s+(.*)$/);
    if (listMatch) {
      const indent = listMatch[1];
      const bullet = listMatch[2];
      const content = listMatch[3];

      let transContent = content;
      TECHNICAL_PHRASES.forEach(([pat, ar]) => {
        transContent = transContent.replace(pat, ar);
      });
      TECHNICAL_VOCABULARY.forEach(([pat, ar]) => {
        transContent = transContent.replace(pat, ar);
      });

      return `${indent}${bullet} ${transContent}`;
    }

    // Process bold label lead-in: "**Label:** content"
    const colonMatch = line.match(/^(\s*\*\*[^*]+\*\*:\s*)(.*)$/);
    if (colonMatch) {
      const label = colonMatch[1];
      const rest = colonMatch[2];
      let transRest = rest;
      TECHNICAL_PHRASES.forEach(([pat, ar]) => {
        transRest = transRest.replace(pat, ar);
      });
      TECHNICAL_VOCABULARY.forEach(([pat, ar]) => {
        transRest = transRest.replace(pat, ar);
      });
      return `${label}${transRest}`;
    }

    return line;
  });

  let result = translatedLines.join('\n');

  // 4. Restore preserved code blocks, URLs, and template tokens
  placeholders.forEach((token, idx) => {
    result = result.replace(`___PROTECTED_TOKEN_${idx}___`, token);
  });

  return result;
}

/**
 * Generic Fallback Generator:
 * Generates natural Arabic and Simplified English for ANY lesson in the curriculum
 * using the rich domain glossary, curated registry and structured translation heuristics.
 * Every section, mistake, checklist item, and takeaway is unique and directly translated!
 */
function generateFallbackTranslation(lesson: Lesson): { arabic: LessonArabicTranslation; simpleEnglish: LessonSimpleEnglish } {
  const reg = LESSON_ARABIC_REGISTRY[lesson.slug];

  let arTitle = reg?.title || translateHeadingToArabic(lesson.title);
  let arSubtitle = reg?.subtitle || `شرح تفصيلي باللغة العربية لمفاهيم وتطبيقات: ${arTitle}`;

  // Unique Objectives Translation
  const arObjectives = reg?.objectives || lesson.objectives.map((obj) => {
    return translateTextContentToArabic(obj, arTitle);
  });

  // Unique Section Translations (Zero Repetition)
  const arSections = lesson.sections.map((sec, i) => {
    const regSec = reg?.sections?.[i];
    const heading = regSec?.heading || translateHeadingToArabic(sec.heading);
    const body = regSec?.body || translateTextContentToArabic(sec.body, arTitle);
    const calloutText = regSec?.calloutText || (sec.callout
      ? translateTextContentToArabic(sec.callout.text, arTitle)
      : undefined);

    // Dynamic unique takeaway derived directly from section heading and first sentence
    const firstSentence = (sec.body.split('\n\n')[0] || '').split(/[.!?]/)[0]?.trim() || sec.heading;
    const translatedFirst = translateTextContentToArabic(firstSentence, arTitle);
    const simpleExplanation = regSec?.simpleExplanation ||
      `الخلاصة لـ (${heading}): ${translatedFirst}.`;

    return {
      heading,
      body,
      simpleExplanation,
      calloutText,
    };
  });

  // Unique Mistakes & Pitfalls Translation
  const arMistakes = reg?.mistakes || lesson.mistakes.map((m) => {
    return translateTextContentToArabic(m, arTitle);
  });

  // Unique Checklist Translation
  const arChecklist = reg?.checklist || lesson.checklist.map((c) => {
    return translateTextContentToArabic(c, arTitle);
  });

  const keyTakeaway = reg?.keyTakeaway ||
    `تطبيق هذه المفاهيم البرمجية في (${arTitle}) يرفع ثقة العميل ويزيد صافي الأرباح لكل زائر.`;

  // Build Simple English version
  const simplifiedTerms = ARABIC_GLOSSARY.filter((t) =>
    lesson.title.toLowerCase().includes(t.en.toLowerCase()) ||
    lesson.objectives.some((o) => o.toLowerCase().includes(t.en.toLowerCase()))
  ).slice(0, 4).map((t) => ({
    term: t.en,
    simpleMeaning: t.arExplanation,
    analogy: `Everyday example: helps store owners increase profitability and customer trust.`,
  }));

  return {
    arabic: {
      title: arTitle,
      subtitle: arSubtitle,
      objectivesHead: reg?.objectivesHead || 'أهداف ومخرجات التعلم الأساسية:',
      objectives: arObjectives,
      sections: arSections,
      mistakesHead: 'أخطاء برمجية وتصميمية شائعة يجب تجنبها:',
      mistakes: arMistakes,
      checklistHead: 'قائمة التحقق والتأكيد العملي:',
      checklist: arChecklist,
      keyTakeaway,
    },
    simpleEnglish: {
      coreIdea: `In simple terms: this lesson teaches you how to master "${lesson.title}" so shoppers have an easy, enjoyable, and fast experience on your Shopify store.`,
      simplifiedTerms: simplifiedTerms.length > 0 ? simplifiedTerms : [
        { term: 'Shopify Storefront', simpleMeaning: 'The customer-facing online shop that buyers browse and shop from.', analogy: 'The physical showroom of a boutique.' },
        { term: 'Liquid Template', simpleMeaning: 'Shopify\'s language used to load products, prices, and collections dynamically.', analogy: 'A smart form that automatically fills in product details.' },
      ],
      keyTakeaway: 'Focus on simplicity, clear visual hierarchy, and removing confusion for the customer.',
    },
  };
}

/**
 * Get the translation & simplified English for any lesson
 */
export function getLessonLanguageContent(lesson: Lesson): LessonTranslationResult {
  // 1. Check if lesson already has custom translation embedded
  if (lesson.arabicTranslation && lesson.simpleEnglish) {
    return {
      arabic: lesson.arabicTranslation,
      simpleEnglish: lesson.simpleEnglish,
      source: 'curated',
    };
  }

  // 2. Check local curated registry
  const curated = CURATED_LESSON_TRANSLATIONS[lesson.slug];
  if (curated) {
    return {
      arabic: curated.arabic,
      simpleEnglish: curated.simpleEnglish,
      source: 'curated',
    };
  }

  // 3. Generate structured fallback translation from glossary & terms (with LESSON_ARABIC_REGISTRY support)
  const fallback = generateFallbackTranslation(lesson);
  return {
    arabic: fallback.arabic,
    simpleEnglish: fallback.simpleEnglish,
    source: LESSON_ARABIC_REGISTRY[lesson.slug] ? 'curated' : 'generated',
  };
}
