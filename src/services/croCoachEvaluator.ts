import { MicroSessionFeedback } from '../types/microlearning';
import { callPiApiChat, hasPiApiKey } from './aiService';

export interface ConceptRubric {
  conceptId: string;
  conceptTitle: string;
  coreKeywords: string[];
  keyIdea: string;
  commonMisconceptions: string[];
  goodExampleExplanation: string;
}

export const CRO_CONCEPT_RUBRICS: Record<string, ConceptRubric> = {
  default: {
    conceptId: 'default',
    conceptTitle: 'CRO Principle',
    coreKeywords: ['user', 'customer', 'friction', 'trust', 'clarity', 'conversion', 'value', 'test'],
    keyIdea: 'Reducing user cognitive friction, communicating value, and validating hypotheses with behavioral evidence.',
    commonMisconceptions: ['Assuming changing button colors is real CRO', 'Relying on intuition rather than user data'],
    goodExampleExplanation: 'CRO is about systematically discovering where potential buyers get confused or anxious, and engineering clarity to make buying effortless.',
  },
  'mde-stat-power': {
    conceptId: 'mde-stat-power',
    conceptTitle: 'Sample Size & MDE Math',
    coreKeywords: ['sample size', 'noise', 'variance', 'power', 'mde', 'detect', 'lift', 'smaller', 'traffic'],
    keyIdea: 'Detecting smaller lifts requires exponentially larger sample sizes because random variance easily overwhelms small signals.',
    commonMisconceptions: ['Thinking 100 conversions is enough to validate a +1% lift', 'Stopping as soon as p < 0.05 without sample size met'],
    goodExampleExplanation: 'Because smaller lifts are closer to natural baseline noise, you need a large sample size so statistical power can reliably prove the difference did not happen by random chance.',
  },
  'pdp-above-fold': {
    conceptId: 'pdp-above-fold',
    conceptTitle: 'The Above-the-Fold Fallacy on Mobile PDPs',
    coreKeywords: ['scroll', 'clutter', 'clarity', 'decision', 'panic', 'mobile', 'comprehension', 'hierarchy'],
    keyIdea: 'Mobile shoppers naturally scroll. Demanding a purchase decision before providing value and product clarity creates visual anxiety.',
    commonMisconceptions: ['Believing users will not scroll on phones', 'Cramming every badge and button into the first screen'],
    goodExampleExplanation: 'Shoppers need to clearly see and understand the product first. Cramming everything into 600px causes decision overload before interest is even built.',
  },
  'cart-shipping-transparency': {
    conceptId: 'cart-shipping-transparency',
    conceptTitle: 'Shipping Cost Transparency in the Cart Drawer',
    keyIdea: 'Hidden fees revealed late in checkout trigger sticker shock and break buyer trust. Early thresholds provide positive motivation.',
    coreKeywords: ['shipping', 'transparent', 'surprise', 'checkout', 'threshold', 'trust', 'sticker shock', 'aov'],
    commonMisconceptions: ['Hiding shipping costs until step 3 to trick users into starting checkout'],
    goodExampleExplanation: 'When shoppers reach checkout and see unexpected fees, they feel misled. Displaying free shipping progress in the cart drawer builds trust and gently increases AOV.',
  },
};

export async function evaluateSelfExplanation(
  userText: string,
  conceptId: string,
  conceptTitle: string,
  coreKeyTakeaway: string
): Promise<MicroSessionFeedback> {
  const trimmed = userText.trim();

  // If user text is very short
  if (trimmed.length < 20) {
    return {
      score: 'needs_expansion',
      strengths: ['Great start taking the initiative to type your thoughts.'],
      missingPoints: [
        'Could you add 1-2 more sentences explaining why this concept matters to a Shopify store owner or shopper?',
      ],
      coachingHint:
        'Try finishing this sentence: "This matters because when a customer experiences this, they will..."',
      refinedExplanation: coreKeyTakeaway,
    };
  }

  // If external AI is connected and active, use it for rich feedback
  if (hasPiApiKey()) {
    try {
      const prompt = `You are a supportive, world-class CRO learning coach. A student just explained this concept in their own words.
Concept: "${conceptTitle}"
Target Takeaway: "${coreKeyTakeaway}"
Student's Words: "${trimmed}"

Evaluate their understanding constructively:
1. Speak warmly and encouragingly.
2. Highlight 1-2 exact things they explained accurately.
3. Gently point out 1 nuance or practical application they could consider.
4. Keep the response concise, formatted in friendly markdown.`;

      const aiResponse = await callPiApiChat({
        messages: [
          { role: 'system', content: 'You are a warm, supportive cognitive CRO coach.' },
          { role: 'user', content: prompt },
        ],
      });

      if (aiResponse) {
        return {
          score: 'strong',
          strengths: ['Clear intuition and personal expression of the concept.'],
          missingPoints: [],
          coachingHint: aiResponse,
          refinedExplanation: coreKeyTakeaway,
        };
      }
    } catch {
      // Fallback seamlessly to deterministic engine
    }
  }

  // Deterministic cognitive evaluator
  const rubric = CRO_CONCEPT_RUBRICS[conceptId] || CRO_CONCEPT_RUBRICS.default;
  const lower = trimmed.toLowerCase();

  const matchedKeywords = rubric.coreKeywords.filter((kw) => lower.includes(kw));
  const hasGoodDepth = trimmed.length > 70;

  const strengths: string[] = [];
  const missingPoints: string[] = [];

  if (matchedKeywords.length >= 2) {
    strengths.push(
      `You captured key concepts effectively, including "${matchedKeywords.slice(0, 3).join('", "')}".`
    );
  } else {
    strengths.push('You expressed the general idea in your own natural phrasing.');
  }

  if (hasGoodDepth) {
    strengths.push('You provided solid detail and reasoning behind the principle.');
  } else {
    missingPoints.push(
      'Consider connecting this directly to shopper behavior: What does the customer think or feel at this exact moment?'
    );
  }

  const score: 'strong' | 'good' | 'needs_expansion' =
    matchedKeywords.length >= 3 && hasGoodDepth
      ? 'strong'
      : matchedKeywords.length >= 1 || hasGoodDepth
      ? 'good'
      : 'needs_expansion';

  const coachingHint =
    score === 'strong'
      ? 'Excellent breakdown! You clearly understand how this cognitive dynamic influences buyer trust and behavior.'
      : 'Good reasoning! Remember: high-converting Shopify stores always align interface clarity with the customer\'s mental state.';

  return {
    score,
    strengths,
    missingPoints,
    coachingHint,
    refinedExplanation: rubric.goodExampleExplanation || coreKeyTakeaway,
  };
}

export interface ActiveRecallFeedback {
  verdict: 'correct' | 'partial' | 'needs_work';
  verdictTitle: string;
  badgeColor: string;
  accuracySummary: string;
  whatYouNailed: string[];
  howToImprove: string[];
  improvedConsultantVersion: string;
  keyTakeaway: string;
}

export function evaluateActiveRecall(params: {
  userText: string;
  question: string;
  coreTakeaway: string;
  objectives?: string[];
  isArabic?: boolean;
}): ActiveRecallFeedback {
  const { userText, question, coreTakeaway, objectives = [], isArabic = false } = params;
  const trimmed = userText.trim();
  const lower = trimmed.toLowerCase();

  // Keyword banks
  const croKeywordsEn = [
    'friction', 'trust', 'clarity', 'bounce', 'mobile', 'speed', 'checkout', 'cart',
    'conversion', 'decision', 'anxiety', 'proof', 'risk', 'revenue', 'value', 'scroll',
    'button', 'drop', 'confus', 'hesitat', 'customer', 'shopper', 'sales', 'money', 'loss'
  ];

  const croKeywordsAr = [
    'احتكاك', 'ثقة', 'وضوح', 'ارتداد', 'موبايل', 'هاتف', 'سرعة', 'دفع', 'سلة',
    'تحويل', 'قرار', 'قلق', 'دليل', 'مخاطرة', 'إيراد', 'قيمة', 'تمرير', 'زر',
    'تسرب', 'تردد', 'عميل', 'زبون', 'متسوق', 'مبيعات', 'أموال', 'خسارة', 'تشتت'
  ];

  // Objective keywords
  const objectiveTokens = objectives
    .join(' ')
    .toLowerCase()
    .replace(/[^\w\s\u0600-\u06FF]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 3);

  const matchedCroKws = (isArabic ? croKeywordsAr : croKeywordsEn).filter((kw) => lower.includes(kw));
  const matchedObjKws = objectiveTokens.filter((kw) => lower.includes(kw));

  const wordCount = trimmed.split(/\s+/).filter(Boolean).length;
  const hasSubstantialText = wordCount >= 8;
  const hasMechanisms = matchedCroKws.length >= 2 || matchedObjKws.length >= 1;

  // Determine accuracy verdict
  let verdict: 'correct' | 'partial' | 'needs_work' = 'partial';
  if (hasSubstantialText && hasMechanisms && (matchedCroKws.length >= 2 || wordCount >= 14)) {
    verdict = 'correct';
  } else if (wordCount <= 3 || (matchedCroKws.length === 0 && matchedObjKws.length === 0 && wordCount < 8)) {
    verdict = 'needs_work';
  } else {
    verdict = 'partial';
  }

  // Construct localized breakdown
  if (isArabic) {
    if (verdict === 'correct') {
      return {
        verdict: 'correct',
        verdictTitle: '🎯 إجابة صحيحة وفي صلب الهدف!',
        badgeColor: '#10b981',
        accuracySummary: 'حدسك دقيق للغاية! لقد نجحت في تحديد السبب الجذري والآلية التي تحمي متجر شوبيفاي من خسارة المبيعات.',
        whatYouNailed: [
          'حددت بشكل صحيح عنصر الاحتكاك أو الأثر على نفسية المتسوق.',
          'ربطت بين واجهة المتجر وتصرف الزائر عند اتخاذ قرار الشراء.',
        ],
        howToImprove: [
          'لرفع الإجابة لمستوى استشاري، اذكر دائماً المقاييس القابلة للقياس (مثل: معدل الارتداد Bounce Rate، أو معدل الوصول للسلة Add-to-Cart).',
          'اشرح كيف ينعكس هذا التحسين على الأجهزة المحمولة مقارنة بسطح المكتب.',
        ],
        improvedConsultantVersion: `«المشكلة الأساسية هنا ليست مجرد شكل جمالي؛ بل هي نقطة احتكاك حاسمة في رحلة العميل. ${coreTakeaway}، وبالتالي فإن معالجة هذه النقطة تمنع تسرب المشترين ذوي النية العالية وترفع العائد المالي لكل زائر.»`,
        keyTakeaway: coreTakeaway,
      };
    } else if (verdict === 'partial') {
      return {
        verdict: 'partial',
        verdictTitle: '🟡 بداية جيدة وحدس صحيح — يحتاج إلى تدعيم',
        badgeColor: '#f59e0b',
        accuracySummary: 'فكرتك صحيحة وتتجه في المسار السليم، لكن ينقصها تحديد الآلية النفسية أو الهندسية المباشرة التي تمنع خسارة المبيعات.',
        whatYouNailed: [
          'لديك إحساس منطقي سليم بوجود مشكلة أو عقبة تواجه المتسوق.',
        ],
        howToImprove: [
          'حدد بدقة: هل المشكلة خوف وعدم ثقة؟ أم صعوبة وإرباك بصري؟ أم كسل وتكاسل عن التمرير؟',
          'اربط فكرتك بـ: "ما الذي سيفعله المتسوق في الـ 3 ثوانٍ التالية إذا لم يجد هذا الحل؟"',
        ],
        improvedConsultantVersion: `«إن فكرتك عن وجود احتكاك صائبة تماماً، وتطويرها الاحترافي هو: ${coreTakeaway}. فعندما يشعر المتسوق بالأمان والوضوح التام، تنخفض نسبة التردد وتكتمل عملية الشراء بسلاسة.»`,
        keyTakeaway: coreTakeaway,
      };
    } else {
      return {
        verdict: 'needs_work',
        verdictTitle: '💡 محاولة جيدة للتفكير الذاتي — تحتاج لتوجيه أدق',
        badgeColor: '#6366f1',
        accuracySummary: 'محاولة مقدرة لاستدعاء المعلومة! الإجابة الحالية مختصرة جداً أو تبتعد عن المحرك الأساسي لمعدل التحويل.',
        whatYouNailed: [
          'المبادرة بتسجيل انطباعك الأولي (وهذا ينشط مسارات الذاكرة قبل دراسة المفهوم).',
        ],
        howToImprove: [
          'ركز على الإجابة عن: ما الذي يجعل المشتري يغادر الصفحة فوراً دون أن يشتري؟',
          'استحضر قاعدة CRO الذهبية: الوضوح يسبق الإقناع، وتقليل الجهد العقلي يضاعف التحويل.',
        ],
        improvedConsultantVersion: `«الصيغة الصحيحة والمثبتة علمياً: ${coreTakeaway}. تطبيق هذا المفهوم يضمن بقاء المتسوق في مسار الشراء دون حيرة أو قلق.»`,
        keyTakeaway: coreTakeaway,
      };
    }
  }

  // English fallback
  if (verdict === 'correct') {
    return {
      verdict: 'correct',
      verdictTitle: '🎯 Spot On! Accurate & Validated Intuition',
      badgeColor: '#10b981',
      accuracySummary: 'Your recall is accurate! You nailed the foundational mechanism connecting storefront usability directly to protected sales and shopper confidence.',
      whatYouNailed: [
        'Accurately pinpointed the customer friction or psychological obstacle.',
        'Linked user comprehension directly to purchase continuation rather than superficial aesthetic preference.',
      ],
      howToImprove: [
        'To elevate this to a C-level CRO consultation, pair your observation with the exact diagnostic metric (e.g., Mobile PDP-to-Cart drop-off rate or Exit Intent rate).',
        'Frame the solution in terms of reducing cognitive load and shortening time-to-value.',
      ],
      improvedConsultantVersion: `“This element is not merely cosmetic; it is a critical friction gate. ${coreTakeaway}. By eliminating this hesitation, we protect high-intent mobile traffic from dropping off before entering the checkout funnel.”`,
      keyTakeaway: coreTakeaway,
    };
  } else if (verdict === 'partial') {
    return {
      verdict: 'partial',
      verdictTitle: '🟡 Good Instinct — Needs Strategic Elevation',
      badgeColor: '#f59e0b',
      accuracySummary: 'You have the right gut instinct! Your thoughts point in the right direction, but need a tighter connection to buyer psychology and financial conversion impact.',
      whatYouNailed: [
        'Recognized that this area of the storefront holds potential friction for the shopper.',
      ],
      howToImprove: [
        'Be specific about the psychological trigger: Is the buyer anxious, confused, distracted, or experiencing sticker shock?',
        'Connect the dots between the user’s immediate hesitation and the merchant’s bottom-line bounce rate.',
      ],
      improvedConsultantVersion: `“Your intuition on friction is spot on. Elevating it into a formal diagnostic: ${coreTakeaway}. Ensuring immediate clarity here prevents premature abandonment.”`,
      keyTakeaway: coreTakeaway,
    };
  } else {
    return {
      verdict: 'needs_work',
      verdictTitle: '💡 Solid Retrieval Attempt — Guided Adjustment',
      badgeColor: '#6366f1',
      accuracySummary: 'Great effort taking the active recall challenge! Your attempt is slightly too brief or missed the primary behavioral driver for this specific Shopify scenario.',
      whatYouNailed: [
        'Actively retrieved from memory before reading—which primes your brain to retain the concept significantly better.',
      ],
      howToImprove: [
        'Ask yourself: If a shopper has their credit card in hand on their phone, what exact doubt or hesitation prevents them from clicking Buy right now?',
        'Remember the core CRO tenet: Clarity trumps persuasion, and reducing friction beats adding incentives.',
      ],
      improvedConsultantVersion: `“The core CRO mechanism to lock into memory is: ${coreTakeaway}. When you audit a store, this is the exact principle that differentiates a casual viewer from an paying buyer.”`,
      keyTakeaway: coreTakeaway,
    };
  }
}

