import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ar';

export interface LanguageContextType {
  language: Language;
  isArabic: boolean;
  dir: 'ltr' | 'rtl';
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
}

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Brand & Topbar
    'app.brand': 'CRO Mastery',
    'app.brandSub': 'Shopify Conversion Engineering',
    'app.search': 'Quick search...',
    'app.searchKbd': '⌘K',
    'app.streak': 'Day Streak',
    'app.level': 'Level',
    'app.xp': 'XP',
    'app.freeze': 'Freeze Protected',
    'app.glossary': 'Arabic Glossary',
    'app.themeLight': 'Switch to light mode',
    'app.themeDark': 'Switch to dark mode',
    'app.langSwitch': 'العربية',
    'app.langSwitchLabel': 'Switch to Arabic',
    'app.curriculumDone': 'Completed',

    // Navigation Sections & Items
    'nav.section.learn': 'Learn & Practice',
    'nav.section.ai': 'AI & Simulators',
    'nav.section.tools': 'CRO Tools',
    'nav.section.proof': 'Proof of Work',
    'nav.section.account': 'Account',

    'nav.dashboard': "Today's Practice",
    'nav.dashboardBadge': 'Focus',
    'nav.croLab': 'Practical CRO Lab',
    'nav.croLabBadge': 'Clinic',
    'nav.curriculum': 'Course Roadmap',
    'nav.knowledgeBase': 'Knowledge Base',
    'nav.aiCoach': 'AI CRO Coach',
    'nav.clientSimulator': 'Client Simulator',
    'nav.clientSimulatorBadge': 'Cases',
    'nav.storeSimulator': 'Store Simulator',
    'nav.storeProspector': 'Store Lead Finder',
    'nav.auditTool': 'CRO Audit Tool',
    'nav.testPlanner': 'A/B Test Planner',
    'nav.metrics': 'Metrics Calculator',
    'nav.playground': 'Liquid Playground',
    'nav.statsExplainer': 'Stats Explainer',
    'nav.capstone': 'Capstone Tracker',
    'nav.portfolio': 'Portfolio Case Study',
    'nav.settings': 'Settings',

    // Common Actions
    'action.start': 'Start',
    'action.continue': 'Continue',
    'action.back': 'Back',
    'action.next': 'Next',
    'action.finish': 'Finish',
    'action.save': 'Save',
    'action.saved': 'Saved ✓',
    'action.cancel': 'Cancel',
    'action.close': 'Close',
    'action.copy': 'Copy',
    'action.copied': 'Copied!',
    'action.complete': 'Mark as Complete',
    'action.completed': 'Completed ✓',
    'action.filter': 'Filter',
    'action.search': 'Search',
    'action.export': 'Export Markdown',
    'action.add': 'Add New',
    'action.submit': 'Submit',
    'action.view': 'View',
    'action.details': 'Details',
    'action.hint': 'Need a hint?',
    'action.revealed': 'Revealed',
    'action.showWorkedExample': 'Show Coach Worked Example',
    'action.hideWorkedExample': 'Hide Coach Example',

    // Dashboard
    'dash.welcome': 'Welcome back',
    'dash.subtitle': 'Your clear, cognitive-friendly path to mastering Shopify conversion rate optimization.',
    'dash.lowEnergyBadge': 'Low-Energy Day?',
    'dash.lowEnergyToggle': 'Switch to 5-Minute Micro Practice',
    'dash.normalMode': 'Standard Mode (12-15 min)',
    'dash.todaysAction': "Today's Primary Focus",
    'dash.startRecommended': 'Start Recommended Lesson',
    'dash.dueReviewsTitle': 'Due for Review Today (Spaced Repetition)',
    'dash.dueReviewsSubtitle': 'Active recall intervals: Day 1, 3, 7, 14, 30. Test memory before forgetting occurs.',
    'dash.flipToReveal': 'Flip card to see concept & answer',
    'dash.iRemembered': '✓ I Remembered',
    'dash.neededReview': '↺ Needed Review',
    'dash.noReviewsDue': 'Great job! No spaced reviews due today. All concepts are in active memory retention.',
    'dash.roadmapTitle': 'Curriculum Mastery Roadmap',
    'dash.roadmapSubtitle': 'Structured 6-phase journey from cognitive fundamentals to enterprise CRO leadership.',
    'dash.viewFullRoadmap': 'Explore Full Course Curriculum',
    'dash.stage': 'Phase',
    'dash.lessons': 'lessons',

    // Lesson Page
    'lesson.studyStrategy': 'Study Mode:',
    'lesson.modeGuided': 'Guided Practice (12 min)',
    'lesson.modeReference': 'Full Reference Doc',
    'lesson.stageA': 'Stage A — Warm-Up Recall',
    'lesson.stageB': 'Stage B — Chunked Concept Learn',
    'lesson.stageC': 'Stage C — Teach Back (Feynman)',
    'lesson.stageD': 'Stage D — Storefront Practice',
    'lesson.stageE': 'Stage E — Reflection & Schedule',
    'lesson.explainSimply': 'Explain More Simply',
    'lesson.showShopify': 'Show Shopify Example',
    'lesson.whyMatters': 'Why This Matters',
    'lesson.clarifyTerms': 'Clarify Terms',
    'lesson.objectives': 'What You Will Master in This Lesson',
    'lesson.mistakes': 'Common Developer Traps & Pitfalls to Avoid',
    'lesson.checklist': 'Comprehension & Verification Checklist',
    'lesson.notes': 'Engineering Notes & Key Takeaways',
    'lesson.feynmanTitle': 'Deep Comprehension Check: Explain in Your Own Words',
    'lesson.feynmanSub': 'Explain what you learned as if teaching a client or junior dev. Immediate supportive feedback will be provided and saved to your Personal Knowledge Base.',
    'lesson.getFeedback': 'Get Supportive Coach Feedback',
    'lesson.nextLesson': 'Next Lesson',
    'lesson.prevLesson': 'Previous Lesson',

    // Client Simulator
    'sim.title': 'Client Simulator & Store Clinic',
    'sim.subtitle': 'Practice diagnosing real Shopify stores, presenting findings to merchants, and crafting evidence-based hypotheses.',
    'sim.existingCases': 'Existing Case Studies',
    'sim.addCustomStore': '+ Add Custom Store For Audit',
    'sim.storeName': 'Store Name',
    'sim.storeUrl': 'Store URL',
    'sim.niche': 'Niche / Industry',
    'sim.monthlyVisitors': 'Monthly Visitors',
    'sim.monthlyRevenue': 'Monthly Revenue ($)',
    'sim.conversionRate': 'Current Conversion Rate (%)',
    'sim.aov': 'Average Order Value ($)',
    'sim.mobileTraffic': 'Mobile Traffic (%)',
    'sim.topIssue': 'Observed Friction / Main Problem',
    'sim.notes': 'Merchant Context / Special Requirements',
    'sim.createStoreBtn': 'Add Store & Start Client Audit',
    'sim.storeAdded': 'Custom store successfully registered!',
    'sim.revenue': 'Monthly Revenue',
    'sim.cvr': 'Conversion Rate',
    'sim.startAudit': 'Open Store Clinic & Audit',

    // Knowledge Base
    'kb.title': 'My Personal Knowledge Base',
    'kb.subtitle': 'Your searchable repository of self-explanations, store case studies, code recipes, and CRO principles.',
    'kb.searchPlaceholder': 'Search concepts, terms, notes...',
    'kb.allCategories': 'All Entries',
    'kb.explanations': 'Self-Explanations',
    'kb.scenarios': 'Storefront Cases',
    'kb.notes': 'Study Notes',
    'kb.empty': 'No matching entries found. As you complete lessons and explanations, they will be automatically organized here.',
  },
  ar: {
    // Brand & Topbar
    'app.brand': 'أكاديمية تحسين التحويل',
    'app.brandSub': 'هندسة تحسين المبيعات لشوبيفاي',
    'app.search': 'بحث سريع...',
    'app.searchKbd': '⌘K',
    'app.streak': 'أيام متتالية',
    'app.level': 'المستوى',
    'app.xp': 'نقطة خبرة',
    'app.freeze': 'الحماية مفعلة',
    'app.glossary': 'قاموس المصطلحات',
    'app.themeLight': 'التبديل إلى الوضع الفاتح',
    'app.themeDark': 'التبديل إلى الوضع الليلي',
    'app.langSwitch': 'English',
    'app.langSwitchLabel': 'التحويل للإنجليزية',
    'app.curriculumDone': 'مكتمل',

    // Navigation Sections & Items
    'nav.section.learn': 'التعلم والتطبيق العملي',
    'nav.section.ai': 'الذكاء الاصطناعي والمحاكاة',
    'nav.section.tools': 'أدوات تحسين التحويل',
    'nav.section.proof': 'معرض الأعمال والإثبات',
    'nav.section.account': 'الحساب والإعدادات',

    'nav.dashboard': 'تدريب اليوم الموجه',
    'nav.dashboardBadge': 'تركيز',
    'nav.croLab': 'عيادة المتاجر العملية',
    'nav.croLabBadge': 'مختبر',
    'nav.curriculum': 'خارطة طريق الدورة',
    'nav.knowledgeBase': 'قاعدة معرفتي الشخصية',
    'nav.aiCoach': 'المدرب الذكي الخاص',
    'nav.clientSimulator': 'محاكي العميل والمتجر',
    'nav.clientSimulatorBadge': 'حالات',
    'nav.storeSimulator': 'محاكي المتاجر المباشر',
    'nav.storeProspector': 'منقب عملاء المتاجر',
    'nav.auditTool': 'أداة تدقيق المتاجر',
    'nav.testPlanner': 'مخطط تجارب A/B',
    'nav.metrics': 'حاسبة مقاييس التجارة',
    'nav.playground': 'محرر ومختبر Liquid',
    'nav.statsExplainer': 'شارح الإحصاء التجاري',
    'nav.capstone': 'مشروع التخرج العملي',
    'nav.portfolio': 'دراسة الحالة والمحفظة',
    'nav.settings': 'الإعدادات العامة',

    // Common Actions
    'action.start': 'ابدأ الآن',
    'action.continue': 'متابعة',
    'action.back': 'رجوع',
    'action.next': 'التالي',
    'action.finish': 'إنهاء',
    'action.save': 'حفظ التغييرات',
    'action.saved': 'تم الحفظ بنجاح ✓',
    'action.cancel': 'إلغاء',
    'action.close': 'إغلاق',
    'action.copy': 'نسخ',
    'action.copied': 'تم النسخ!',
    'action.complete': 'تأكيد الإكمال',
    'action.completed': 'مكتمل ✓',
    'action.filter': 'تصفية',
    'action.search': 'بحث',
    'action.export': 'تصدير كملف Markdown',
    'action.add': 'إضافة جديد',
    'action.submit': 'إرسال',
    'action.view': 'عرض',
    'action.details': 'التفاصيل',
    'action.hint': 'هل تحتاج تلميحاً؟',
    'action.revealed': 'تم الكشف',
    'action.showWorkedExample': 'عرض مثال المحلل المحترف',
    'action.hideWorkedExample': 'إخفاء المثال الإرشادي',

    // Dashboard
    'dash.welcome': 'أهلاً بك مجدداً',
    'dash.subtitle': 'مسارك الهادئ والواضح لاحتراف تحسين معدل التحويل (CRO) لمتاجر شوبيفاي دون تشتت.',
    'dash.lowEnergyBadge': 'يوم بطاقة منخفضة؟',
    'dash.lowEnergyToggle': 'التبديل إلى تمرين الـ 5 دقائق الخفيف',
    'dash.normalMode': 'الوضع القياسي (12-15 دقيقة)',
    'dash.todaysAction': 'الخطوة الأساسية لليوم',
    'dash.startRecommended': 'ابدأ الدرس الموصى به الآن',
    'dash.dueReviewsTitle': 'مراجعات التكرار المتباعد المستحقة اليوم',
    'dash.dueReviewsSubtitle': 'تثبيت المعلومات في الذاكرة طويلة المدى على فترات علمية: اليوم 1، 3، 7، 14، 30.',
    'dash.flipToReveal': 'انقر لقلب البطاقة وكشف المفهوم',
    'dash.iRemembered': '✓ تذكرت الإجابة',
    'dash.neededReview': '↺ أحتاج مراجعتها مجدداً',
    'dash.noReviewsDue': 'عمل رائع! لا توجد مراجعات مستحقة اليوم. جميع المفاهيم محفوظة بنشاط في ذاكرتك.',
    'dash.roadmapTitle': 'خارطة إتقان المراحل التعليمية',
    'dash.roadmapSubtitle': 'رحلة منظمة عبر 6 مراحل من علم النفس الإدراكي حتى قيادة مشاريع التحويل الكبرى.',
    'dash.viewFullRoadmap': 'استكشف المنهج الكامل ومراحل التعلم',
    'dash.stage': 'المرحلة',
    'dash.lessons': 'دروس',

    // Lesson Page
    'lesson.studyStrategy': 'استراتيجية الدراسة:',
    'lesson.modeGuided': 'تطبيق موجه هادئ (12 دقيقة)',
    'lesson.modeReference': 'المرجع التقني الكامل',
    'lesson.stageA': 'المرحلة أ — الإحماء والاستدعاء النشط',
    'lesson.stageB': 'المرحلة ب — تفكيك المفهوم وتدرج المعرفة',
    'lesson.stageC': 'المرحلة ج — اشرح بأسلوبك (تقنية فاينمان)',
    'lesson.stageD': 'المرحلة د — التطبيق العملي على متجر حقيقي',
    'lesson.stageE': 'المرحلة هـ — التلخيص وجدولة الذاكرة',
    'lesson.explainSimply': 'اشرح الفكرة ببساطة أكثر',
    'lesson.showShopify': 'عرض مثال متجر شوبيفاي',
    'lesson.whyMatters': 'لماذا هذا مهم للمبيعات؟',
    'lesson.clarifyTerms': 'تبسيط المصطلحات الصعبة',
    'lesson.objectives': 'المهارات والمعايير التي ستتقنها في هذا الدرس',
    'lesson.mistakes': 'فخاخ وأخطاء يقع فيها المطورون يجب تجنبها',
    'lesson.checklist': 'قائمة التحقق والاستيعاب الذاتي',
    'lesson.notes': 'ملاحظاتك الهندسية وخلاصاتك الشخصية',
    'lesson.feynmanTitle': 'اختبار الفهم العميق: اشرح المفهوم بأسلوبك الخاص',
    'lesson.feynmanSub': 'اشرح ما تعلمته كما لو كنت تشرحه لعميل متجر أو مطور مبتدئ. ستحصل على تقييم تشجيعي فوري يُحفظ في قاعدة معرفتك.',
    'lesson.getFeedback': 'الحصول على تقييم تشجيعي من المدرب',
    'lesson.nextLesson': 'الدرس التالي',
    'lesson.prevLesson': 'الدرس السابق',

    // Client Simulator
    'sim.title': 'محاكي العميل وعيادة تدقيق المتاجر',
    'sim.subtitle': 'تدرب على تشخيص متاجر شوبيفاي الحقيقية، وعرض التحليلات المقنعة على التجار، وصياغة فرضيات مثبتة بالأدلة.',
    'sim.existingCases': 'حالات ومتاجر التدريب الجاهزة',
    'sim.addCustomStore': '+ إضافة متجر جديد يدوياً للتدقيق',
    'sim.storeName': 'اسم المتجر',
    'sim.storeUrl': 'رابط المتجر',
    'sim.niche': 'المجال أو التخصص',
    'sim.monthlyVisitors': 'عدد الزوار شهرياً',
    'sim.monthlyRevenue': 'الإيراد الشهري ($)',
    'sim.conversionRate': 'معدل التحويل الحالي (%)',
    'sim.aov': 'متوسط قيمة الطلب ($)',
    'sim.mobileTraffic': 'نسبة زوار الجوال (%)',
    'sim.topIssue': 'المشكلة الملاحظة أو نقطة التسرب الرئيسية',
    'sim.notes': 'سياق التاجر أو متطلبات خاصة',
    'sim.createStoreBtn': 'تسجيل المتجر وبدء جلسة التدقيق',
    'sim.storeAdded': 'تمت إضافة المتجر المخصص بنجاح!',
    'sim.revenue': 'الإيراد الشهري',
    'sim.cvr': 'معدل التحويل',
    'sim.startAudit': 'فتح عيادة التدقيق للمتجر',

    // Knowledge Base
    'kb.title': 'قاعدة معرفتي الشخصية',
    'kb.subtitle': 'مستودعك الذكي القابل للبحث لشروحاتك الخاصة، ودراسات المتاجر، وأكواد Liquid، ومبادئ التحويل.',
    'kb.searchPlaceholder': 'ابحث في المفاهيم، المصطلحات، الملاحظات...',
    'kb.allCategories': 'كافة التدوينات',
    'kb.explanations': 'شروحاتي الذاتية',
    'kb.scenarios': 'حالات المتاجر العملية',
    'kb.notes': 'ملاحظات الدروس',
    'kb.empty': 'لا توجد عناصر مطابقة. كلما أكملت درساً أو كتبت شرحاً ذاتياً، ستجده منظماً هنا تلقائياً.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'cro_platform_language_v1';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved === 'ar' || saved === 'en') return saved;
    } catch {
      // fallback
    }
    return 'en';
  });

  const isArabic = language === 'ar';
  const dir = isArabic ? 'rtl' : 'ltr';

  useEffect(() => {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // ignore
    }

    // Apply document attributes for RTL & Font Styling
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    if (isArabic) {
      document.body.classList.add('lang-ar');
      document.body.classList.remove('lang-en');
    } else {
      document.body.classList.add('lang-en');
      document.body.classList.remove('lang-ar');
    }
  }, [language, isArabic, dir]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = (key: string, fallback?: string): string => {
    const table = TRANSLATIONS[language] || TRANSLATIONS.en;
    if (table[key]) return table[key];
    const enTable = TRANSLATIONS.en;
    if (enTable[key]) return enTable[key];
    return fallback || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        isArabic,
        dir,
        setLanguage,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
