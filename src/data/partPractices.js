/**
 * Registry of Bespoke Part Practice Exercises for Lessons.
 * Keys are formatted as: `${lessonId}__part_${sectionIndex}` or `${lessonSlug}__part_${sectionIndex}`
 */
export const BESPOKE_PART_PRACTICES = {
    // m1-l1: What CRO Actually Is
    'm1-l1__part_0': {
        id: 'part-m1-l1-0',
        type: 'multiple-choice',
        question: 'Why is evaluating an ecommerce store purely on Conversion Rate (CVR = Orders / Sessions) dangerously incomplete?',
        options: [
            'Because CVR ignores page load times and server latency.',
            'Because CVR does not account for Average Order Value (AOV), margins, or Revenue Per Session (RPS); slashing prices boosts CVR while destroying profit.',
            'Because Google Analytics 4 cannot calculate conversion percentages accurately.',
            'Because CVR only counts visitors who arrive through paid advertisements.',
        ],
        correctIndex: 1,
        explanation: 'A merchant can easily boost CVR by offering an 80% discount or selling $1 loss-leaders. However, AOV and gross margin collapse. True CRO focuses on Revenue Per Session (RPS = CVR × AOV) and net contribution margin.',
        hint: 'Think about what happens to cash flow if you discount items so heavily that orders spike but margin turns negative.',
        xp: 10,
        arQuestion: 'لماذا يعتبر تقييم المتجر الإلكتروني بالاعتماد فقط على نسبة التحويل (CVR = الطلبات / الزيارات) مضللاً وخطيراً؟',
        arOptions: [
            'لأن نسبة التحويل تتجاهل سرعة استجابة الخادم وتحميل الصفحات.',
            'لأن نسبة التحويل تتجاهل متوسط قيمة الطلب (AOV) وهامش الربح وصافي العائد لكل زائر (RPS)؛ خفض الأسعار يرفع CVR ولكنه يدمر الأرباح.',
            'لأن Google Analytics 4 لا يستطيع حساب نسب التحويل بدقة.',
            'لأن نسبة التحويل لا تحسب سوى الزوار القادمين من الإعلانات الممولة فقط.',
        ],
        arExplanation: 'يمكن لأي متجر رفع CVR بسهولة بتقديم خصم 80%، لكن هامش الربح سينهار. التحسين الحقيقي يركز على العائد لكل زائر (RPS) وصافي الربح بعد التكاليف.',
        arHint: 'فكر فيما يحدث للسيولة النقدية إذا خفضت الأسعار لزيادة الطلبات بينما تكلفة البضاعة ثابتة.',
    },
    'm1-l1__part_1': {
        id: 'part-m1-l1-1',
        type: 'calculation',
        question: 'In the mathematical example, why did Scenario B (25% discount yielding 3.0% CVR) result in $15,000 LESS net profit than Baseline (2.0% CVR)?',
        options: [
            'The ad spend increased by $15,000.',
            'The fixed server costs increased with higher traffic.',
            'The reduced price ($75 vs $100) failed to offset the extra unit Cost of Goods Sold ($40 × 1,000 extra units = +$40k COGS).',
            'Refund rates automatically doubled.',
        ],
        correctIndex: 2,
        explanation: 'Revenue only rose by $25k ($225k vs $200k), but product COGS surged by $40k (1,000 more jackets at $40 each). Net profit fell from $70,000 to $55,000.',
        hint: 'Compare the increase in revenue ($25,000) against the increase in total COGS for 3,000 units.',
        xp: 10,
        arQuestion: 'في المثال الحسابي للدرس، لماذا أدى السيناريو (ب) بخصم 25% مع ارتفاع CVR إلى 3.0% إلى خسارة 15,000$ من صافي الأرباح؟',
        arOptions: [
            'لأن الإنفاق الإعلاني ارتفع بمقدار 15,000$.',
            'لأن تكاليف الاستضافة والخوادم زادت مع زيادة الزيارات.',
            'لأن السعر المخفض (75$ بدلاً من 100$) لم يعوض تكلفة البضاعة الإضافية (40$ × 1000 قطعة إضافية = 40,000$ تكلفة إضافية).',
            'لأن نسبة المرتجعات تضاعفت تلقائياً.',
        ],
        arExplanation: 'الإيرادات ارتفعت بمقدار 25 ألف دولار فقط بينما زادت تكلفة البضاعة المباعة بـ 40 ألف دولار، مما أدى لانخفاض صافي الربح من 70 ألف إلى 55 ألف دولار.',
        arHint: 'قارن الزيادة في المبيعات مقابل الزيادة في تكلفة المنتجات الإضافية التي تم شحنها.',
    },
    'm1-l1__part_2': {
        id: 'part-m1-l1-2',
        type: 'scenario',
        question: 'What is the key difference between a Micro-Conversion and a Macro-Conversion in ecommerce?',
        options: [
            'Micro-conversions happen on desktop; macro-conversions happen on mobile devices.',
            'Micro-conversions are stepping-stone actions (e.g. Add to Cart, View Item) that indicate intent, whereas the Macro-conversion is the final completed purchase order.',
            'Micro-conversions only apply to stores with under $10,000 in monthly revenue.',
            'Micro-conversions are tracked by Meta Pixel; macro-conversions are only tracked by Google Analytics.',
        ],
        correctIndex: 1,
        explanation: 'Micro-conversions reflect progress along the funnel (product view, swatch click, cart addition). Optimizing micro-conversions removes friction leading up to the macro-conversion (the final financial order).',
        hint: 'Think of micro-conversions as milestones along a journey, while the macro-conversion is the destination.',
        xp: 10,
        arQuestion: 'ما هو الفرق الجوهري بين التحويلات الدقيقة (Micro-Conversions) والتحويل الرئيسي (Macro-Conversion)؟',
        arOptions: [
            'التحويلات الدقيقة تحدث على أجهزة الكمبيوتر، بينما التحويل الرئيسي يحدث على الهواتف.',
            'التحويلات الدقيقة هي خطوات وسيطة (مثل الإضافة للسلة أو عرض المنتج) تعبر عن الاهتمام، بينما التحويل الرئيسي هو إتمام عملية الشراء النهائية.',
            'التحويلات الدقيقة تخص المتاجر الناشئة فقط بأقل من 10,000$ شهرياً.',
            'التحويلات الدقيقة تتبع بواسطة فيسبوك بكسل، بينما التحويل الرئيسي بواسطة جوجل أناليتكس فقط.',
        ],
        arExplanation: 'التحويلات الدقيقة تمثل مؤشرات التقدم عبر مراحل القمع البيعي، وتحسينها يزيل العقبات للوصول إلى التحويل النهائي (الطلب المدفوع).',
        arHint: 'التحويلات الدقيقة هي محطات على الطريق، والتحويل الرئيسي هو خط النهاية.',
    },
    // m1-l2: The Ecommerce Funnel
    'm1-l2__part_0': {
        id: 'part-m1-l2-0',
        type: 'multiple-choice',
        question: 'In a standard 5-stage ecommerce funnel, where does the single largest drop-off typically occur across Shopify stores?',
        options: [
            'Between Checkout Step 2 and Step 3.',
            'Between Homepage/Landing Page and Product Detail Page (PDP).',
            'Between Add to Cart and Thank You page on desktop.',
            'Between Email capture and SMS opt-in.',
        ],
        correctIndex: 1,
        explanation: 'Typically 45%–60% of all sessions bounce or leave before ever viewing a specific product detail page. Refining collection navigation, search, and landing page relevance tackles this massive drop-off.',
        hint: 'Consider the top of the funnel: do most casual visitors ever reach a product page?',
        xp: 10,
        arQuestion: 'في مسار التجارة الإلكترونية الكلاسيكي، أين يحدث عادةً أكبر تسرب للزوار في متاجر شوبيفاي؟',
        arOptions: [
            'بين الخطوة الثانية والثالثة من صفحة الدفع.',
            'بين الصفحة الرئيسية / صفحة الهبوط وبين صفحة تفاصيل المنتج (PDP).',
            'بين إضافة المنتج للسلة وصفحة الشكر على أجهزة الحاسوب.',
            'بين إدخال البريد الإلكتروني والموافقة على رسائل SMS.',
        ],
        arExplanation: 'عادة ما يغادر 45% إلى 60% من الزوار المتجر قبل الوصول لصفحة أي منتج، ولذلك تحسين الفهرسة والتصنيفات والبحث يحل هذا التسرب الهائل.',
        arHint: 'فكر في أعلى القمع البيعي: هل يصل أغلب الزوار العابرين إلى صفحة المنتج؟',
    },
    'm1-l2__part_1': {
        id: 'part-m1-l2-1',
        type: 'scenario',
        question: 'If 10,000 visitors view a PDP, 1,000 add to cart, and 400 complete checkout, what is the Cart-to-Purchase conversion efficiency?',
        options: [
            '4.0%',
            '10.0%',
            '40.0%',
            '25.0%',
        ],
        correctIndex: 2,
        explanation: 'Cart-to-Purchase = (Completed Purchases / Cart Additions) = (400 / 1,000) = 40.0%. This means 60% of high-intent shoppers who added items were lost before checkout.',
        hint: 'Divide the completed orders by the number of people who clicked Add to Cart.',
        xp: 10,
        arQuestion: 'إذا شاهد 10,000 زائر صفحة المنتج، وأضاف 1,000 منتجاً للسلة، وأكمل 400 عملية الشراء، فما هي كفاءة التحويل من السلة للشراء؟',
        arOptions: [
            '4.0%',
            '10.0%',
            '40.0%',
            '25.0%',
        ],
        arExplanation: 'كفاءة التحويل من السلة للشراء = (400 / 1000) × 100 = 40.0%. هذا يعني أن 60% من المشترين ذوي النية العالية تسربوا قبل إتمام الدفع.',
        arHint: 'اقسم عدد الطلبات المكتملة على عدد الذين أضافوا للسلة.',
    },
    // m1-l3: Core Metrics
    'm1-l3__part_0': {
        id: 'part-m1-l3-0',
        type: 'calculation',
        question: 'A store receives 50,000 sessions, generates 1,250 orders, and produces $100,000 in gross revenue. What is its Revenue Per Session (RPS)?',
        options: [
            '$1.25',
            '$2.00',
            '$2.50',
            '$80.00',
        ],
        correctIndex: 1,
        explanation: 'RPS = Total Revenue / Total Sessions = $100,000 / 50,000 = $2.00. Alternatively, CVR (2.5%) × AOV ($80) = $2.00.',
        hint: 'Divide total gross revenue by total sessions.',
        xp: 10,
        arQuestion: 'متجر يستقبل 50,000 زيارة، ويحقق 1,250 طلباً، وإجمالي مبيعات 100,000$. ما هو العائد لكل زيارة (RPS)؟',
        arOptions: [
            '1.25$',
            '2.00$',
            '2.50$',
            '80.00$',
        ],
        arExplanation: 'RPS = إجمالي الإيرادات / إجمالي الزيارات = 100,000$ / 50,000 = 2.00$. أو CVR (2.5%) × AOV (80$) = 2.00$.',
        arHint: 'اقسم إجمالي الإيرادات على عدد الزيارات الكلي.',
    },
    // dev-module-2: Liquid Objects & Loops
    'dev-m2-l1__part_0': {
        id: 'part-dev-m2-l1-0',
        type: 'code',
        question: 'When iterating over `collection.products` in Liquid, why should you always append `limit:` (e.g. `limit: 12`)?',
        options: [
            'Because Shopify Liquid throws a fatal syntax error without a limit tag.',
            'To prevent rendering hundreds of product DOM nodes, which drastically degrades Time to First Byte (TTFB), Largest Contentful Paint (LCP), and server CPU quota.',
            'Because the browser cannot execute CSS on more than 10 products.',
            'To automatically hide out-of-stock items.',
        ],
        correctIndex: 1,
        explanation: 'Looping through an unconstrained collection forces the Liquid engine to parse hundreds of database drops, increasing server render latency and bloating DOM nodes on the client, crippling mobile performance.',
        hint: 'Consider server execution time and mobile DOM bloat when rendering huge lists.',
        xp: 10,
        arQuestion: 'عند عمل حلقة تكرار (Loop) على `collection.products` في لغة Liquid، لماذا يجب دائماً إضافة وسم التحديد `limit:` (مثل `limit: 12`)؟',
        arOptions: [
            'لأن شوبيفاي تظهر خطأ برمجياً فادحاً بدون وسم التحديد.',
            'لتجنب معالجة مئات المنتجات مما يرفع وقت استجابة السيرفر (TTFB) ويؤخر سرعة تحميل الصفحة (LCP) ويستهلك موارد الخادم.',
            'لأن المتصفح لا يستطيع تطبيق التنسيقات على أكثر من 10 منتجات.',
            'لإخفاء المنتجات المنتهية من المخزون تلقائياً.',
        ],
        arExplanation: 'التكرار بدون حد أقصى يجبر محرك Liquid على جلب مئات العناصر مما يضاعف وقت معالجة الخادم ويبطئ تجربة المستخدم على الهواتف بشكل حاد.',
        arHint: 'فكر في سرعة استجابة السيرفر وتضخم حجم شجرة عناصر HTML على هواتف المستخدمين.',
    },
};
/**
 * Intelligent domain-specific generator that synthesizes an authentic,
 * high-fidelity practice exercise for ANY lesson section that does not have
 * a hardcoded bespoke question.
 */
export function generateSectionPractice(lesson, section, sectionIndex) {
    const heading = section.heading || `Part ${sectionIndex + 1}`;
    const headingLower = heading.toLowerCase();
    const bodyText = section.body || '';
    const bodyLower = bodyText.toLowerCase();
    const hasCode = !!section.code;
    const codeSnippet = section.code || '';
    const callout = section.callout?.text || '';
    const partNum = sectionIndex + 1;
    const baseId = `part-practice-${lesson.id}-${sectionIndex}`;
    // 1. Code & Developer Sections (Liquid, JavaScript, Schema, CSS, Webhooks, APIs)
    if (hasCode || headingLower.includes('liquid') || headingLower.includes('code') || headingLower.includes('schema') || headingLower.includes('api') || headingLower.includes('event')) {
        const isLiquid = section.language === 'liquid' || bodyLower.includes('liquid') || codeSnippet.includes('{%');
        if (isLiquid) {
            return {
                id: baseId,
                type: 'code',
                question: `In Part ${partNum} ("${heading}"), what is the technical best practice when writing Liquid for this feature?`,
                options: [
                    'Hardcode product handles directly inside the theme template file.',
                    'Use modular snippets with defensive checks (e.g. checking if object or image exists) and avoid heavy loops in critical rendering paths.',
                    'Execute all Liquid logic inside an inline `<script>` tag using `eval()`.',
                    'Disable cache headers to ensure prices update on every microsecond.',
                ],
                correctIndex: 1,
                explanation: `As detailed in "${heading}", modular Liquid snippets with defensive checks prevent theme breakage, maintain maintainability, and ensure fast Time to First Byte (TTFB).`,
                hint: 'Defensive programming in Liquid means verifying objects exist before accessing attributes and keeping snippets decoupled.',
                xp: 10,
                arQuestion: `في الجزء ${partNum} ("${heading}")، ما هي أفضل ممارسة تقنية عند كتابة أكواد Liquid لهذه الجزئية؟`,
                arOptions: [
                    'كتابة روابط المنتجات بشكل ثابت (Hardcoded) داخل ملف القالب الرئيسي.',
                    'استخدام أجزاء برمجية معيارية (Snippets) مع فحوصات أمان للتأكد من وجود الكائنات وتجنب التكرار المكثف في مسار العرض الحرج.',
                    'تنفيذ كل منطق Liquid داخل كود جافاسكريبت باستخدام eval.',
                    'تعطيل الكاش بشكل كامل لتحديث الأسعار في كل ميكرو ثانية.',
                ],
                arExplanation: `كما هو موضح في "${heading}"، تقسيم الأكواد إلى Snippets واستخدام فحوصات التحقق يمنع انهيار المتجر ويحافظ على سرعة الاستجابة.`,
                arHint: 'البرمجة الدفاعية في Liquid تعني التحقق من وجود الكائن قبل قراءة خصائصه.',
            };
        }
        return {
            id: baseId,
            type: 'code',
            question: `Review the technical blueprint in Part ${partNum} ("${heading}"). What is the primary architecture requirement for implementing this reliably?`,
            options: [
                'Run the logic purely on a blocking synchronous HTTP request before the page begins rendering.',
                'Ensure non-blocking, asynchronous execution that does not block the main thread and gracefully handles missing data.',
                'Store all customer passwords directly in `localStorage` for quick access.',
                'Bypass Shopify APIs and write directly to the Shopify core SQL database.',
            ],
            correctIndex: 1,
            explanation: `Modern Shopify engineering requires asynchronous, non-blocking code patterns to protect Core Web Vitals (specifically INP and LCP) and deliver a seamless shopper experience.`,
            hint: 'Think about user responsiveness and preventing main-thread UI freezes.',
            xp: 10,
            arQuestion: `راجع المعمارية البرمجية في الجزء ${partNum} ("${heading}"). ما هو الشرط الأساسي لتطبيق هذا الكود بشكل موثوق؟`,
            arOptions: [
                'تشغيل المنطق البرمجي كطلب متزامن حاصر (Blocking) قبل بدء المتصفح في رسم الصفحة.',
                'ضمان التنفيذ غير المتزامن (Async) بحيث لا يحجب خيط المعالجة الرئيسي ويتعامل بمرونة مع البيانات المفقودة.',
                'تخزين كلمات مرور الزوار في localStorage للوصول السريع.',
                'تجاوز واجهات شوبيفاي والاتصال مباشرة بقاعدة بيانات شوبيفاي.',
            ],
            arExplanation: `تتطلب المعايير الحديثة في شوبيفاي استخدام أكواد غير حاجزة لحماية مؤشرات أداء الويب ومنع تجميد واجهة المستخدم.`,
            arHint: 'فكر في سرعة استجابة الواجهة ومنع تجميد المتصفح.',
        };
    }
    // 2. Quantitative / Math / Metrics Sections (CVR, AOV, RPS, Drop-off, Confidence, Sample Size)
    if (headingLower.includes('metric') || headingLower.includes('math') || headingLower.includes('cvr') || headingLower.includes('aov') || headingLower.includes('rps') || headingLower.includes('statistic') || headingLower.includes('sample') || headingLower.includes('funnel') || headingLower.includes('drop-off')) {
        return {
            id: baseId,
            type: 'calculation',
            question: `Based on the principles explained in Part ${partNum} ("${heading}"), how should a senior CRO engineer evaluate the performance impact?`,
            options: [
                'Rely exclusively on whether the primary button color looks visually appealing.',
                'Evaluate the compound effect on Revenue Per Session (RPS) and statistical significance, rather than trusting isolated vanity metrics.',
                'Declare a winning variation after exactly 12 hours regardless of sample size.',
                'Assume any lift under 50% is a statistical failure and discard the test.',
            ],
            correctIndex: 1,
            explanation: `As demonstrated in "${heading}", isolated metrics can deceive. True optimization evaluates statistical significance, sample size power, and compound Revenue Per Session (RPS = CVR × AOV).`,
            hint: 'Remember that single vanity metrics can go up while overall profit drops.',
            xp: 10,
            arQuestion: `بناءً على المبادئ المشروحة في الجزء ${partNum} ("${heading}")، كيف يجب على مهندس الـ CRO تقييم التأثير على الأداء؟`,
            arOptions: [
                'الاعتماد فقط على المظهر الجمالي ولون الزر الرئيسي.',
                'تقييم التأثير المركب على العائد لكل زيارة (RPS) والدلالة الإحصائية بدلاً من الوثوق بالمؤشرات السطحية المنعزلة.',
                'إعلان فوز النسخة بعد 12 ساعة فقط بغض النظر عن حجم العينة.',
                'افتراض أن أي زيادة أقل من 50% تعتبر فاشلة وإلغاء الاختبار.',
            ],
            arExplanation: `كما هو موضح في "${heading}"، المؤشرات المنعزلة قد تخدع. التحسين المنهجي يعتمد على القوة الإحصائية والعائد الحقيقي لكل زائر.`,
            arHint: 'تذكر أن نسبة التحويل قد ترتفع بينما ينخفض إجمالي الأرباح.',
        };
    }
    // 3. UX, Mobile, PDP, Cart, Checkout Sections
    if (headingLower.includes('pdp') || headingLower.includes('cart') || headingLower.includes('checkout') || headingLower.includes('mobile') || headingLower.includes('friction') || headingLower.includes('ux') || headingLower.includes('hierarchy') || headingLower.includes('button')) {
        return {
            id: baseId,
            type: 'scenario',
            question: `In Part ${partNum} ("${heading}"), what is the primary friction point and recommended optimization?`,
            options: [
                'Adding more decorative background animations to keep users entertained.',
                'Removing decision anxiety, clarifying value propositions above the fold, and ensuring critical action buttons remain accessible without excessive scrolling.',
                'Replacing all customer reviews with high-contrast animated banners.',
                'Forcing mobile visitors to switch to desktop mode to complete their purchase.',
            ],
            correctIndex: 1,
            explanation: `In "${heading}", the focus is on eliminating cognitive load and physical interaction friction: keeping primary CTA buttons accessible, swatches clear, and pricing transparent.`,
            hint: 'Focus on reducing cognitive friction and making the buying decision as effortless as possible.',
            xp: 10,
            arQuestion: `في الجزء ${partNum} ("${heading}")، ما هي نقطة الاحتكاك الرئيسية والتحسين الموصى به؟`,
            arOptions: [
                'إضافة المزيد من الرسوم المتحركة في الخلفية لتسلية الزوار.',
                'إزالة التردد والشك، وتوضيح القيمة في الجزء المرئي الأول (Above the fold)، وضمان سهولة الوصول لزر الإجراء دون تمرير مفرط.',
                'استبدال تقييمات العملاء بإعلانات متحركة عالية التباين.',
                'إجبار مستخدمي الهواتف على فتح المتجر من الكمبيوتر لإتمام الطلب.',
            ],
            arExplanation: `المبدأ الجوهري في "${heading}" هو خفض العبء الذهني وتسهيل اتخاذ قرار الشراء بإتاحة الأزرار والمعلومات بوضوح.`,
            arHint: 'ركز على تقليل الجهد المطلوب من الزائر لإتمام طلبه.',
        };
    }
    // 4. Strategic, Heuristic, Research, Client Sections (Default fallback)
    return {
        id: baseId,
        type: 'scenario',
        question: `What is the core takeaway and actionable application of Part ${partNum} ("${heading}")?`,
        options: [
            'Copy the exact design changes of competitors without analyzing your own store telemetry.',
            'Ground your decisions in empirical evidence, isolate single variables when testing, and prioritize high-leverage friction areas.',
            'Treat optimization as a one-time aesthetic redesign every two years.',
            'Never consult analytics data when proposing client theme changes.',
        ],
        correctIndex: 1,
        explanation: `Part ${partNum} demonstrates that professional CRO engineering is an iterative, data-grounded science: diagnosing observed friction, forming testable hypotheses, and validating results with empirical telemetry.`,
        hint: 'Think about systematic engineering versus subjective aesthetic guessing.',
        xp: 10,
        arQuestion: `ما هي الفائدة الجوهرية والتطبيق العملي للجزء ${partNum} ("${heading}")؟`,
        arOptions: [
            'نسخ تصميمات المنافسين بحذافيرها دون الرجوع لتحليلات متجرك الخاصة.',
            'بناء القرارات على أدلة تجريبية واقعية، وعزل المتغيرات عند الاختبار، والتركيز على نقاط الاحتكاك الأكثر تأثيراً.',
            'التعامل مع التحسين كمجرد تغيير شكلي يتم مرة واحدة كل عامين.',
            'تجاهل بيانات التحليلات تماماً عند اقتراح تعديلات برمجية للعميل.',
        ],
        arExplanation: `يؤكد الجزء ${partNum} على أن تحسين التحويل هو هندسة منهجية مبنية على البيانات: تشخيص المشكلة بدقة، وبناء فرضية قابلة للاختبار، وتأكيد النتائج بالقياس.`,
        arHint: 'فكر في المنهجية الهندسية مقابل التخمين العشوائي.',
    };
}
/**
 * Resolves the exercise practice for a specific section of a lesson.
 * 1) Checks for an explicit practice attached to the section.
 * 2) Checks the curated bespoke dictionary by lesson ID or slug + section index.
 * 3) Automatically synthesizes an authentic high-fidelity practice exercise.
 */
export function getSectionPractice(lesson, section, sectionIndex) {
    // 1. Direct attachment
    if (section.practice) {
        return {
            ...section.practice,
            id: section.practice.id || `part-practice-${lesson.id}-${sectionIndex}`,
            xp: section.practice.xp || 10,
        };
    }
    // 2. Curated Bespoke Registry
    const keyId = `${lesson.id}__part_${sectionIndex}`;
    const keySlug = `${lesson.slug}__part_${sectionIndex}`;
    if (BESPOKE_PART_PRACTICES[keyId]) {
        return BESPOKE_PART_PRACTICES[keyId];
    }
    if (BESPOKE_PART_PRACTICES[keySlug]) {
        return BESPOKE_PART_PRACTICES[keySlug];
    }
    // 3. Intelligent Synthesis
    return generateSectionPractice(lesson, section, sectionIndex);
}
