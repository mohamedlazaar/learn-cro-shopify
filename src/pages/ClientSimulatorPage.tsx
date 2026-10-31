import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Target,
  Search,
  CheckCircle2,
  AlertTriangle,
  Mail,
  Send,
  Code,
  Calculator,
  TrendingUp,
  Award,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Store,
  Eye,
  Check,
  Bot,
  User,
  Zap,
  HelpCircle,
  FileText,
  Download,
  Flame,
  ShieldCheck,
  Layers,
  ChevronRight,
  RefreshCw,
  ExternalLink,
  Plus,
  Trash2,
  Globe,
  SlidersHorizontal,
  Building2,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  SIMULATOR_STORE_SCENARIOS,
  SimulatorStoreScenario,
  StoreFrictionItem,
  DEFAULT_FRICTION_LIBRARY,
} from '../data/simulatorScenarios';
import { callPiApiChat, hasPiApiKey } from '../services/aiService';
import { useLanguage } from '../context/LanguageContext';
import './ClientSimulatorPage.css';

type SimulatorStage = 1 | 2 | 3 | 4 | 5 | 6;

interface ChatMessage {
  sender: 'user' | 'owner' | 'mentor';
  text: string;
  time: string;
}

const STORAGE_CUSTOM_STORES_KEY = 'cro_custom_simulator_stores';

function loadCustomStores(): SimulatorStoreScenario[] {
  try {
    const raw = localStorage.getItem(STORAGE_CUSTOM_STORES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('Error loading custom stores', e);
  }
  return [];
}

function saveCustomStoresToStorage(stores: SimulatorStoreScenario[]) {
  try {
    localStorage.setItem(STORAGE_CUSTOM_STORES_KEY, JSON.stringify(stores));
  } catch (e) {
    console.error('Error saving custom stores', e);
  }
}

function getStorePitchEmail(store: SimulatorStoreScenario): { subject: string; body: string } {
  const topFlaw = store.designFlaws[0]?.title || 'mobile checkout friction';
  const secondFlaw = store.designFlaws[1]?.title || 'variant selection leaks';
  const ownerFirstName = store.owner.name.split(' ')[0] || 'there';
  const monthlyOrders = Math.round(store.baseline.monthlySessions * (store.baseline.cvr / 100));
  const estimatedWeeklyLost = Math.max(5, Math.round((monthlyOrders * 0.3) / 4));
  const weeklyLossDollars = Math.round(estimatedWeeklyLost * store.baseline.aov);

  return {
    subject: `Quick design teardown for ${store.name} (${topFlaw.toLowerCase()})`,
    body: `Hi ${ownerFirstName},

Love the clean aesthetic of ${store.name}, especially your ${store.niche}!

While reviewing your mobile experience on an iPhone 14, I noticed that ${topFlaw.toLowerCase()}, and ${secondFlaw.toLowerCase()}.

With ${store.baseline.mobileTrafficShare}% of your ~${store.baseline.monthlySessions.toLocaleString()} monthly visitors browsing on phones, this friction is likely causing you to lose ~${estimatedWeeklyLost} orders every week (approximately $${weeklyLossDollars.toLocaleString()} in lost weekly revenue).

I built a lightweight solution that can be implemented cleanly into your ${store.themeName} within 48 hours without slowing down page load or creating theme bloat.

Would you be open to a 2-minute video showing the exact before-and-after preview?

Best regards,
Your Name — Shopify CRO Engineer`,
  };
}

function getStoreDefaultHypothesis(store: SimulatorStoreScenario): string {
  const flaw1 = store.designFlaws[0]?.title || 'Sticky Add to Cart';
  const flaw2 = store.designFlaws[1]?.title || 'variant swatches';
  return `By fixing ${flaw1} and ${flaw2} on mobile, we will eliminate above-the-fold friction and lift mobile CVR from ${store.baseline.cvr}% to ${store.optimizedProjection.cvr}%, generating an estimated +$${Math.round(store.optimizedProjection.incrementalMonthlyProfit).toLocaleString()}/mo in incremental net profit.`;
}

export const ClientSimulatorPage: React.FC = () => {
  const { t, isArabic } = useLanguage();

  // Navigation & Stage state
  const [currentStage, setCurrentStage] = useState<SimulatorStage>(1);
  const [selectedStore, setSelectedStore] = useState<SimulatorStoreScenario>(SIMULATOR_STORE_SCENARIOS[0]);

  // Stage 2: Separate tabs for Presets vs Manual Store Audit
  const [scenarioTab, setScenarioTab] = useState<'presets' | 'custom'>('presets');
  const [customStores, setCustomStores] = useState<SimulatorStoreScenario[]>(loadCustomStores);
  const [isAddingStore, setIsAddingStore] = useState<boolean>(false);

  // Manual Store Form Fields
  const [formStoreName, setFormStoreName] = useState('');
  const [formUrl, setFormUrl] = useState('');
  const [formNiche, setFormNiche] = useState('Premium Apparel & Athleisure');
  const [formPlatform, setFormPlatform] = useState<SimulatorStoreScenario['platform']>('Shopify OS 2.0 (Dawn)');
  const [formThemeName, setFormThemeName] = useState('Dawn (v14.0)');
  const [formSessions, setFormSessions] = useState<number>(18000);
  const [formCvr, setFormCvr] = useState<number>(1.65);
  const [formAov, setFormAov] = useState<number>(85);
  const [formCogs, setFormCogs] = useState<number>(35);
  const [formAdSpend, setFormAdSpend] = useState<number>(6000);
  const [formMobileShare, setFormMobileShare] = useState<number>(80);
  const [formOwnerName, setFormOwnerName] = useState('Alex Rivers');
  const [formOwnerRole, setFormOwnerRole] = useState('Founder & CEO');
  const [formOwnerAvatar, setFormOwnerAvatar] = useState('👩‍💼');
  const [selectedFlawIds, setSelectedFlawIds] = useState<string[]>([
    'flaw-sticky-atc',
    'flaw-swatches',
    'flaw-cart-drawer',
  ]);
  const [customFlaws, setCustomFlaws] = useState<StoreFrictionItem[]>([]);
  const [newFlawTitle, setNewFlawTitle] = useState('');
  const [newFlawCategory, setNewFlawCategory] = useState<StoreFrictionItem['category']>('pdp');
  const [newFlawFix, setNewFlawFix] = useState('');

  // Stage 1: Criteria Checklist
  const [criteriaChecked, setCriteriaChecked] = useState<{ [key: string]: boolean }>({
    traffic: false,
    aov: false,
    shopify: false,
    demand: false,
  });

  // Stage 3: Audit hypotheses
  const [auditHypothesis, setAuditHypothesis] = useState<string>(() => getStoreDefaultHypothesis(SIMULATOR_STORE_SCENARIOS[0]));
  const [auditScore, setAuditScore] = useState<string | null>(null);

  // Stage 4: Email & Roleplay
  const [emailSubject, setEmailSubject] = useState<string>(() => getStorePitchEmail(SIMULATOR_STORE_SCENARIOS[0]).subject);
  const [emailBody, setEmailBody] = useState<string>(() => getStorePitchEmail(SIMULATOR_STORE_SCENARIOS[0]).body);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      sender: 'mentor',
      text: 'Welcome to Stage 4! Once you review your email draft, click "Send Pitch to Store Owner" to initiate the negotiation roleplay.',
      time: 'Just now',
    },
  ]);
  const [roleplayInput, setRoleplayInput] = useState<string>('');
  const [ownerDealClosed, setOwnerDealClosed] = useState<boolean>(false);
  const [isAiReplying, setIsAiReplying] = useState<boolean>(false);

  // Stage 5: Code Deployment Simulation
  const [deployedFeatures, setDeployedFeatures] = useState<{ [key: string]: boolean }>({
    stickyAtc: false,
    swatches: false,
    cartThreshold: false,
  });
  const [simulatingDeploy, setSimulatingDeploy] = useState<boolean>(false);

  // Stage 6: The Numbers & Case Study
  const [calculatorInputs, setCalculatorInputs] = useState({
    sessions: selectedStore.baseline.monthlySessions,
    baselineCvr: selectedStore.baseline.cvr,
    baselineAov: selectedStore.baseline.aov,
    newCvr: selectedStore.optimizedProjection.cvr,
    newAov: selectedStore.optimizedProjection.aov,
  });

  // Sync calculator inputs when selected store changes
  useEffect(() => {
    setCalculatorInputs({
      sessions: selectedStore.baseline.monthlySessions,
      baselineCvr: selectedStore.baseline.cvr,
      baselineAov: selectedStore.baseline.aov,
      newCvr: selectedStore.optimizedProjection.cvr,
      newAov: selectedStore.optimizedProjection.aov,
    });
  }, [selectedStore]);

  const handleStageSelect = (stage: SimulatorStage) => {
    setCurrentStage(stage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const allCriteriaMet = Object.values(criteriaChecked).every(Boolean);

  const handleCheckCriterion = (key: string) => {
    setCriteriaChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelectStoreCandidate = (store: SimulatorStoreScenario) => {
    setSelectedStore(store);
    const pitch = getStorePitchEmail(store);
    setEmailSubject(pitch.subject);
    setEmailBody(pitch.body);
    setAuditHypothesis(getStoreDefaultHypothesis(store));
    setAuditScore(null);
    setOwnerDealClosed(false);
    setDeployedFeatures({
      stickyAtc: false,
      swatches: false,
      cartThreshold: false,
    });
    setChatMessages([
      {
        sender: 'mentor',
        text: `Welcome to Stage 4 for ${store.name}! Review your personalized cold email draft below, then click "Send Pitch to Store Owner" to initiate the negotiation roleplay with ${store.owner.name}.`,
        time: 'Just now',
      },
    ]);

    if (!store.isGoodProspect) {
      alert(`⚠️ Caution: ${store.name} has only ${store.baseline.monthlySessions} visitors/mo and runs on ${store.platform}. A true CRO professional disqualifies this prospect! Consider selecting a store with proven traffic.`);
    } else {
      confetti({ particleCount: 40, spread: 50 });
      setCurrentStage(3);
    }
  };

  const handleGradeAudit = () => {
    setAuditScore('A+ (Exceptional Rigor)');
    confetti({ particleCount: 50, spread: 60 });
  };

  const handleToggleFlawSelection = (flawId: string) => {
    setSelectedFlawIds((prev) =>
      prev.includes(flawId) ? prev.filter((id) => id !== flawId) : [...prev, flawId]
    );
  };

  const handleAddCustomFlaw = () => {
    if (!newFlawTitle.trim()) return;
    const item: StoreFrictionItem = {
      id: `custom-flaw-${Date.now()}`,
      category: newFlawCategory,
      title: newFlawTitle.trim(),
      titleAr: newFlawTitle.trim(),
      description: `Custom detected friction bottleneck: ${newFlawTitle.trim()}`,
      descriptionAr: `مشكلة تحويل مكتشفة مخصصة: ${newFlawTitle.trim()}`,
      location: `${newFlawCategory.toUpperCase()} Section`,
      impactScore: 'High',
      suggestedFix: newFlawFix.trim() || `Implement dedicated CRO optimization for ${newFlawTitle.trim()}`,
      suggestedFixAr: `تطبيق تحسين برمجي مخصص لحل ${newFlawTitle.trim()}`,
      liquidSnippetOrThemeChange: `{% comment %} Custom CRO fix for ${newFlawTitle.trim()} {% endcomment %}`,
    };
    setCustomFlaws((prev) => [...prev, item]);
    setNewFlawTitle('');
    setNewFlawFix('');
  };

  const handleSaveCustomStore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formStoreName.trim()) {
      alert('Please enter a store name.');
      return;
    }

    const sessions = Math.max(1, Number(formSessions) || 10000);
    const cvr = Math.max(0.05, Number(formCvr) || 1.5);
    const aov = Math.max(1, Number(formAov) || 60);
    const cogs = Math.min(95, Math.max(5, Number(formCogs) || 35));
    const adSpend = Math.max(0, Number(formAdSpend) || 4000);
    const mobile = Math.min(100, Math.max(10, Number(formMobileShare) || 80));

    const baselineRev = Math.round(sessions * (cvr / 100) * aov);
    const optCvr = Number((cvr * 1.4).toFixed(2));
    const optAov = Number((aov * 1.1).toFixed(2));
    const optRev = Math.round(sessions * (optCvr / 100) * optAov);
    const monthlyLift = optRev - baselineRev;
    const profitLift = Math.round(monthlyLift * (1 - cogs / 100));

    const isGood = sessions >= 300 && aov >= 30 && formPlatform.includes('Shopify');

    const cleanUrl = formUrl.trim().replace(/^https?:\/\//i, '').replace(/\/.*$/, '') ||
      `${formStoreName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.com`;

    const selectedPresetFlaws = DEFAULT_FRICTION_LIBRARY.filter((f) => selectedFlawIds.includes(f.id));
    const allFlaws = [...selectedPresetFlaws, ...customFlaws];
    const finalFlaws = allFlaws.length > 0 ? allFlaws : [DEFAULT_FRICTION_LIBRARY[0], DEFAULT_FRICTION_LIBRARY[1]];

    const newStore: SimulatorStoreScenario = {
      id: `custom-store-${Date.now()}`,
      name: formStoreName.trim(),
      niche: formNiche.trim() || 'DTC Ecommerce Brand',
      nicheAr: 'متجر تجارة إلكترونية مخصص',
      isGoodProspect: isGood,
      qualificationVerdict: isGood ? 'Recommended' : 'Risky',
      qualificationReason: isGood
        ? `Custom client audit: ~${sessions.toLocaleString()} monthly visits with $${aov} AOV on ${formPlatform}. Meets the CRO sweet spot criteria with high conversion recovery leverage.`
        : `Custom client audit: Lower volume prospect (~${sessions.toLocaleString()} sessions, $${aov} AOV). A/B testing will take longer to achieve statistical significance.`,
      qualificationReasonAr: 'متجر عميل مخصص تم إدخال بياناته الحقيقية للتدريب على التدقيق العملي.',
      platform: formPlatform,
      themeName: formThemeName || 'Shopify Theme',
      urlMock: cleanUrl,
      baseline: {
        monthlySessions: sessions,
        cvr,
        aov,
        rps: Number(((cvr / 100) * aov).toFixed(2)),
        monthlyRevenue: baselineRev,
        cogsPercent: cogs,
        monthlyAdSpend: adSpend,
        mobileTrafficShare: mobile,
      },
      optimizedProjection: {
        cvr: optCvr,
        aov: optAov,
        rps: Number(((optCvr / 100) * optAov).toFixed(2)),
        monthlyRevenue: optRev,
        incrementalMonthlyProfit: profitLift,
      },
      designFlaws: finalFlaws,
      owner: {
        name: formOwnerName.trim() || 'Store Founder',
        role: formOwnerRole.trim() || 'Founder & CEO',
        avatar: formOwnerAvatar || '👩‍💼',
        personality: 'Direct and ROI-oriented DTC store founder',
        personalityAr: 'مؤسس مباشر يركز على العائد على الاستثمار وخفض تكاليف الإعلانات',
        commonObjections: [
          {
            objection: `Why shouldn't I just tell my marketing agency to increase ad budget instead of spending on CRO?`,
            objectionAr: 'لماذا لا أزيد ميزانية الإعلانات بدلاً من الاستثمار في تحسين التحويل؟',
            goodResponseKey: 'cac',
            aiCounterResponse: `Fixing conversion leaks drops your Customer Acquisition Cost (CAC) immediately, multiplying every ad dollar spent.`,
          },
          {
            objection: `Will these theme modifications slow down page speed or risk breaking my checkout?`,
            objectionAr: 'هل ستؤدي هذه التعديلات إلى إبطاء المتجر أو تعطل صفحة الدفع؟',
            goodResponseKey: 'theme',
            aiCounterResponse: `All fixes are deployed via modular Liquid snippets in a preview theme duplicate with zero live risk or downtime.`,
          },
        ],
      },
    };

    const updated = [newStore, ...customStores];
    setCustomStores(updated);
    saveCustomStoresToStorage(updated);
    setIsAddingStore(false);
    handleSelectStoreCandidate(newStore);
  };

  const handleDeleteCustomStore = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to remove this custom store audit?')) {
      const updated = customStores.filter((s) => s.id !== id);
      setCustomStores(updated);
      saveCustomStoresToStorage(updated);
      if (selectedStore.id === id) {
        setSelectedStore(SIMULATOR_STORE_SCENARIOS[0]);
      }
    }
  };

  const handleSendInitialEmail = () => {
    const newMsg: ChatMessage = {
      sender: 'user',
      text: `[Sent Cold Email]\nSubject: ${emailSubject}\n\n${emailBody}`,
      time: '1m ago',
    };

    const ownerReply: ChatMessage = {
      sender: 'owner',
      text: `Hey! Thanks for reaching out. I get 10 generic agency emails a day, but your specific point about ${selectedStore.designFlaws[0]?.title || 'mobile checkout friction'} actually hit home. However: we already spend $${selectedStore.baseline.monthlyAdSpend.toLocaleString()}/mo on marketing. Why shouldn't I just tell our media buyer to acquire more traffic instead of investing in CRO?`,
      time: 'Just now',
    };

    setChatMessages((prev) => [...prev, newMsg, ownerReply]);
  };

  const handleSendRoleplayResponse = async () => {
    if (!roleplayInput.trim()) return;

    const userText = roleplayInput;
    setRoleplayInput('');

    const updated = [
      ...chatMessages,
      { sender: 'user' as const, text: userText, time: 'Just now' },
    ];
    setChatMessages(updated);
    setIsAiReplying(true);

    // If PiAPI is available, let AI respond realistically as the store owner
    if (hasPiApiKey()) {
      try {
        const prompt = `You are roleplaying as ${selectedStore.owner.name}, Founder of ${selectedStore.name} ($${((selectedStore.baseline.monthlyRevenue * 12) / 1000000).toFixed(1)}M ARR ${selectedStore.niche} brand).
A talented Shopify CRO developer is pitching you to fix your store's conversion friction (${selectedStore.designFlaws.map(f => f.title).join(', ')}).
The developer just said: "${userText}"

Reply in 2-3 sentences as ${selectedStore.owner.name}.
If they explained that lifting conversion drops Customer Acquisition Cost (CAC) and multiplies ad ROI, be impressed, agree to hire them for a $3,500 implementation sprint, and say: "You convinced me. Let's do a 48-hour sprint for ${selectedStore.name}. Send over the invoice."
Otherwise, ask a realistic sharp follow-up question.`;

        const aiReply = await callPiApiChat({
          systemPrompt: `You are ${selectedStore.owner.name}, a smart, no-nonsense DTC store founder.`,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.6,
        });

        setChatMessages((prev) => [
          ...prev,
          { sender: 'owner', text: aiReply, time: 'Just now' },
        ]);

        if (aiReply.toLowerCase().includes('convinced') || aiReply.toLowerCase().includes('invoice') || aiReply.toLowerCase().includes('deal')) {
          setOwnerDealClosed(true);
          confetti({ particleCount: 70, spread: 80 });
        }
        setIsAiReplying(false);
        return;
      } catch (e) {
        console.warn('AI chat error in simulator, using deterministic fallback', e);
      }
    }

    // Deterministic fallback response
    setTimeout(() => {
      const isGoodMath = userText.toLowerCase().includes('cac') || userText.toLowerCase().includes('ad') || userText.toLowerCase().includes('traffic') || userText.toLowerCase().includes('profit') || userText.toLowerCase().includes('cost');
      if (isGoodMath) {
        setChatMessages((prev) => [
          ...prev,
          {
            sender: 'owner',
            text: `Spot on! When you explain it as dropping my Customer Acquisition Cost (CAC) and improving revenue from our ~${selectedStore.baseline.monthlySessions.toLocaleString()} visitors, that makes every ad dollar generate more profit. You clearly understand unit economics, not just design fluff. Let's do this sprint for $3,500 on ${selectedStore.name}. Send me the proposal!`,
            time: 'Just now',
          },
        ]);
        setOwnerDealClosed(true);
        confetti({ particleCount: 70, spread: 80 });
      } else {
        setChatMessages((prev) => [
          ...prev,
          {
            sender: 'owner',
            text: `That makes some sense, but explain to me the exact financial upside for ${selectedStore.name}: if we lift conversion by 0.5%, how does that impact our bottom line compared to our $${selectedStore.baseline.monthlyAdSpend.toLocaleString()} monthly ad spend?`,
            time: 'Just now',
          },
        ]);
      }
      setIsAiReplying(false);
    }, 900);
  };

  const handleSimulateDeploy = () => {
    setSimulatingDeploy(true);
    setTimeout(() => {
      setDeployedFeatures({
        stickyAtc: true,
        swatches: true,
        cartThreshold: true,
      });
      setSimulatingDeploy(false);
      confetti({ particleCount: 60, spread: 70 });
    }, 1200);
  };

  // Math calculations
  const baselineRev = (calculatorInputs.sessions * (calculatorInputs.baselineCvr / 100)) * calculatorInputs.baselineAov;
  const newRev = (calculatorInputs.sessions * (calculatorInputs.newCvr / 100)) * calculatorInputs.newAov;
  const monthlyLift = newRev - baselineRev;
  const annualLift = monthlyLift * 12;

  return (
    <div className="client-sim-container animate-fade-in">
      {/* Top Header & Breadcrumbs */}
      <header className="client-sim-header">
        <div className="client-sim-badge">
          <Sparkles size={14} color="#6366f1" />
          <span>{isArabic ? 'محاكي وكالات تحسين التحويل التفاعلي' : 'Interactive Agency Lifecycle Simulator'}</span>
        </div>
        <h1 className="client-sim-title">
          {isArabic
            ? 'محاكي العميل: معمل التدريب العملي الكامل لمستشار تحسين المتاجر'
            : 'Client Quest: The Complete CRO Agency Practice Sandbox'}
        </h1>
        <p className="client-sim-subtitle">
          {isArabic
            ? 'تدرب على كافة مراحل عمل مستشار تحسين التحويل: معايير اختيار المتاجر، التدقيق الاستكشافي، التفاوض مع أصحاب المتاجر، كتابة أكواد الحلول، وقياس العائد المالي بالأرقام.'
            : 'Practice the full lifecycle of a high-ticket Shopify CRO engineer: qualifying stores, running heuristic audits, pitching store owners, coding fixes, and reporting ROI numbers.'}
        </p>

        {/* 6-Stage Stepper Bar */}
        <nav className="client-sim-stepper" aria-label="Simulation stages">
          {[
            {
              num: 1,
              label: isArabic ? '1. معايير التأهيل' : '1. Criteria & Rules',
              desc: isArabic ? 'قواعد الاختيار' : 'Pre-Prospecting',
            },
            {
              num: 2,
              label: isArabic ? '2. اختيار المتجر' : '2. Store Selection',
              desc: isArabic ? 'تأهيل وفحص' : 'Qualification',
            },
            {
              num: 3,
              label: isArabic ? '3. التدقيق السريع' : '3. Rapid Audit',
              desc: isArabic ? 'تحليل المشاكل' : 'Heuristics',
            },
            {
              num: 4,
              label: isArabic ? '4. العرض والمحاكاة' : '4. Pitch & Roleplay',
              desc: isArabic ? 'إقناع التاجر' : 'Client Deal',
            },
            {
              num: 5,
              label: isArabic ? '5. كتابة الكود' : '5. Implement Code',
              desc: isArabic ? 'تطبيق الحلول' : 'Lesson Upgrades',
            },
            {
              num: 6,
              label: isArabic ? '6. لغة الأرقام' : '6. The Numbers',
              desc: isArabic ? 'العائد ودراسة الحالة' : 'ROI & Case Study',
            },
          ].map((st) => (
            <button
              key={st.num}
              type="button"
              className={`sim-step-item ${currentStage === st.num ? 'is-active' : ''} ${currentStage > st.num ? 'is-completed' : ''}`}
              onClick={() => handleStageSelect(st.num as SimulatorStage)}
            >
              <div className="sim-step-circle">
                {currentStage > st.num ? <Check size={13} strokeWidth={3} /> : st.num}
              </div>
              <div className="sim-step-text">
                <span className="sim-step-label">{st.label}</span>
                <span className="sim-step-sub">{st.desc}</span>
              </div>
            </button>
          ))}
        </nav>
      </header>

      {/* Main Stage Content */}
      <main className="client-sim-stage-wrapper">
        {/* =========================================================================
            STAGE 1: PRE-PROSPECTING & CRITERIA
            ========================================================================= */}
        {currentStage === 1 && (
          <div className="sim-stage-content animate-fade-in">
            <div className="sim-stage-kicker">
              <span className="badge badge-indigo">Stage 1 of 6</span>
              <span className="sim-kicker-title">Setting Your Standards Before Searching</span>
            </div>
            <h2 className="sim-section-title">The 4 Golden Rules of Store Qualification</h2>
            <p className="sim-section-desc">
              Never waste time inspecting random websites. Top CRO consultants only pitch stores that meet the <strong>"Sweet Spot Formula"</strong>: high enough traffic to generate statistical lift, healthy margins, and clear design flaws.
            </p>

            <div className="sim-criteria-grid">
              <div
                className={`sim-criteria-card ${criteriaChecked.traffic ? 'is-checked' : ''}`}
                onClick={() => handleCheckCriterion('traffic')}
              >
                <div className="sim-check-indicator">
                  {criteriaChecked.traffic && <Check size={14} strokeWidth={3} />}
                </div>
                <div>
                  <h3 className="sim-criteria-title">1. Traffic Sweet Spot (300 - 20,000 Visitors / Month)</h3>
                  <p className="sim-criteria-desc">
                    Avoid ghost stores with &lt;300 visits (math cannot validate CRO lift). Avoid billion-dollar brands with 50-person in-house teams who ignore cold outreach.
                  </p>
                </div>
              </div>

              <div
                className={`sim-criteria-card ${criteriaChecked.aov ? 'is-checked' : ''}`}
                onClick={() => handleCheckCriterion('aov')}
              >
                <div className="sim-check-indicator">
                  {criteriaChecked.aov && <Check size={14} strokeWidth={3} />}
                </div>
                <div>
                  <h3 className="sim-criteria-title">2. Average Order Value (AOV &gt; $40)</h3>
                  <p className="sim-criteria-desc">
                    Stores selling $5 trinkets cannot afford a $3,000+ CRO fee. Look for premium apparel, supplements, cosmetics, and specialized gear.
                  </p>
                </div>
              </div>

              <div
                className={`sim-criteria-card ${criteriaChecked.shopify ? 'is-checked' : ''}`}
                onClick={() => handleCheckCriterion('shopify')}
              >
                <div className="sim-check-indicator">
                  {criteriaChecked.shopify && <Check size={14} strokeWidth={3} />}
                </div>
                <div>
                  <h3 className="sim-criteria-title">3. Verified Shopify Architecture</h3>
                  <p className="sim-criteria-desc">
                    Confirm they run on Shopify (look for `cdn.shopify.com` or inspect `window.Shopify`). Avoid WooCommerce or Magento where theme modifications take weeks.
                  </p>
                </div>
              </div>

              <div
                className={`sim-criteria-card ${criteriaChecked.demand ? 'is-checked' : ''}`}
                onClick={() => handleCheckCriterion('demand')}
              >
                <div className="sim-check-indicator">
                  {criteriaChecked.demand && <Check size={14} strokeWidth={3} />}
                </div>
                <div>
                  <h3 className="sim-criteria-title">4. Active Paid Ads & Market Fit</h3>
                  <p className="sim-criteria-desc">
                    Check the Meta Ad Library. If they run ads, they are actively spending money to acquire traffic—meaning every 0.1% lift in conversion saves them thousands in ad spend!
                  </p>
                </div>
              </div>
            </div>

            <div className="sim-stage-footer-actions">
              <button
                type="button"
                className={`btn ${allCriteriaMet ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => handleStageSelect(2)}
                disabled={!allCriteriaMet}
              >
                <span>{allCriteriaMet ? 'Next: Pick & Qualify a Real Store Candidate →' : 'Check all 4 criteria above to proceed'}</span>
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            STAGE 2: STORE QUALIFICATION & SELECTION
            ========================================================================= */}
        {currentStage === 2 && (
          <div className="sim-stage-content animate-fade-in">
            <div className="sim-stage-kicker">
              <span className="badge badge-indigo">Stage 2 of 6</span>
              <span className="sim-kicker-title">Store Qualification & Scenario Selection</span>
            </div>
            <h2 className="sim-section-title">Select or Add Your Client Store</h2>
            <p className="sim-section-desc">
              Choose between inspecting curated practice candidates with deliberate traps, or <strong>add your own store manually</strong> to run a dedicated heuristic audit, outreach pitch, and ROI model.
            </p>

            {/* Scenario Mode Tab Switcher: Separate Presets from Manual Custom Stores */}
            <div className="sim-scenario-tabs-bar" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={scenarioTab === 'presets'}
                className={`sim-scenario-tab-btn ${scenarioTab === 'presets' ? 'is-active' : ''}`}
                onClick={() => {
                  setScenarioTab('presets');
                  setIsAddingStore(false);
                }}
              >
                <Building2 size={16} />
                <span>{isArabic ? 'متاجر التدريب الجاهزة' : 'Curated Practice Scenarios'}</span>
                <span className="sim-scenario-tab-badge">
                  {isArabic ? `${SIMULATOR_STORE_SCENARIOS.length} متاجر` : `${SIMULATOR_STORE_SCENARIOS.length} Presets`}
                </span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={scenarioTab === 'custom'}
                className={`sim-scenario-tab-btn ${scenarioTab === 'custom' ? 'is-active' : ''}`}
                onClick={() => setScenarioTab('custom')}
              >
                <Plus size={16} />
                <span>{isArabic ? 'تدقيق متجر مخصص (إدخال يدوي)' : 'Manual Store Audit (Add Your Own)'}</span>
                <span
                  className="sim-scenario-tab-badge"
                  style={{
                    background: customStores.length > 0 ? '#10b981' : undefined,
                    color: customStores.length > 0 ? '#fff' : undefined,
                  }}
                >
                  {customStores.length > 0
                    ? isArabic ? `${customStores.length} مضاف` : `${customStores.length} Custom`
                    : isArabic ? 'جديد' : 'New'}
                </span>
              </button>
            </div>

            {/* TAB 1: PRESET PRACTICE SCENARIOS */}
            {scenarioTab === 'presets' && (
              <div className="animate-fade-in">
                <div className="sim-custom-audit-banner">
                  <div className="sim-custom-audit-banner-left">
                    <div className="sim-custom-banner-icon">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <h4 className="sim-custom-banner-title">Want to Audit Your Own Store Instead?</h4>
                      <p className="sim-custom-banner-desc">
                        Instead of pre-built scenarios, you can add an actual prospective client or your personal store with custom traffic, metrics, and friction points.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setScenarioTab('custom');
                      setIsAddingStore(true);
                    }}
                  >
                    <Plus size={14} />
                    <span>Create Custom Store Audit →</span>
                  </button>
                </div>

                <div className="sim-store-candidates-grid">
                  {SIMULATOR_STORE_SCENARIOS.map((store) => (
                    <div
                      key={store.id}
                      className={`sim-store-card ${selectedStore.id === store.id ? 'is-selected' : ''} ${!store.isGoodProspect ? 'is-avoid-candidate' : ''}`}
                    >
                      <div className="sim-store-card-header">
                        <span className={`sim-verdict-pill ${store.qualificationVerdict.toLowerCase()}`}>
                          {store.qualificationVerdict === 'Recommended' ? '✓ Top Prospect' : '✗ Avoid (Trap)'}
                        </span>
                        <span className="sim-store-platform">{store.platform}</span>
                      </div>

                      <h3 className="sim-store-name">{store.name}</h3>
                      <div className="sim-store-niche">{store.niche}</div>

                      <div className="sim-telemetry-pills">
                        <div className="sim-telemetry-item">
                          <span className="sim-tel-label">Monthly Sessions</span>
                          <span className="sim-tel-val">{store.baseline.monthlySessions.toLocaleString()}</span>
                        </div>
                        <div className="sim-telemetry-item">
                          <span className="sim-tel-label">Baseline CVR</span>
                          <span className="sim-tel-val">{store.baseline.cvr}%</span>
                        </div>
                        <div className="sim-telemetry-item">
                          <span className="sim-tel-label">Current AOV</span>
                          <span className="sim-tel-val">${store.baseline.aov}</span>
                        </div>
                        <div className="sim-telemetry-item">
                          <span className="sim-tel-label">Monthly Revenue</span>
                          <span className="sim-tel-val">${store.baseline.monthlyRevenue.toLocaleString()}</span>
                        </div>
                      </div>

                      <p className="sim-qualification-notes">{store.qualificationReason}</p>

                      <button
                        type="button"
                        className={`btn ${store.isGoodProspect ? 'btn-primary' : 'btn-danger'} sim-select-store-btn`}
                        onClick={() => handleSelectStoreCandidate(store)}
                      >
                        <span>{store.isGoodProspect ? 'Select As My Client Target →' : 'Inspect Why to Avoid'}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: MANUAL STORE AUDIT (SEPARATE FROM PRESETS) */}
            {scenarioTab === 'custom' && (
              <div className="animate-fade-in">
                {/* Form to Add Store Manually */}
                {(isAddingStore || customStores.length === 0) ? (
                  <div className="sim-custom-form-card animate-fade-in">
                    <div className="sim-custom-form-head">
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          <span className="sim-custom-badge">Dedicated Custom Audit</span>
                          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Standalone from presets</span>
                        </div>
                        <h3 style={{ fontSize: 20, margin: 0, fontWeight: 800 }}>Add Store Manually for CRO Audit</h3>
                        <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '4px 0 0' }}>
                          Enter the store details and conversion leaks. This store will be audited through the full 5-stage simulation lifecycle.
                        </p>
                      </div>

                      {customStores.length > 0 && (
                        <button
                          type="button"
                          className="btn btn-sm btn-secondary"
                          onClick={() => setIsAddingStore(false)}
                        >
                          <X size={14} />
                          <span>Cancel</span>
                        </button>
                      )}
                    </div>

                    <form onSubmit={handleSaveCustomStore}>
                      {/* Section 1: Store Identity */}
                      <div className="sim-form-section-title">
                        <Globe size={15} />
                        <span>1. Store Identity & Platform</span>
                      </div>

                      <div className="sim-form-grid-2">
                        <div className="sim-form-group">
                          <label className="sim-form-label">
                            Store Name *
                            <small>(e.g. Aura Skincare, Velocity Gear)</small>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Velvet & Bone"
                            className="sim-form-input"
                            value={formStoreName}
                            onChange={(e) => setFormStoreName(e.target.value)}
                          />
                        </div>

                        <div className="sim-form-group">
                          <label className="sim-form-label">
                            Store Website URL
                            <small>(e.g. velvetandbone.com)</small>
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. velvetandbone.com"
                            className="sim-form-input"
                            value={formUrl}
                            onChange={(e) => setFormUrl(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="sim-form-grid-3">
                        <div className="sim-form-group">
                          <label className="sim-form-label">Niche / Industry</label>
                          <select
                            className="sim-form-select"
                            value={formNiche}
                            onChange={(e) => setFormNiche(e.target.value)}
                          >
                            <option value="Premium Apparel & Athleisure">Apparel & Athleisure</option>
                            <option value="Clean Cosmetics & Skincare">Cosmetics & Skincare</option>
                            <option value="Health & Nutritional Supplements">Health & Supplements</option>
                            <option value="Consumer Electronics & Audio">Electronics & Audio</option>
                            <option value="Luxury Jewelry & Accessories">Jewelry & Accessories</option>
                            <option value="Home Living & Gourmet Kitchen">Home & Kitchen</option>
                            <option value="Specialty Coffee & Beverages">Specialty Food & Beverages</option>
                            <option value="Specialty Pet Gear & Wellness">Pet Supplies & Gear</option>
                            <option value="DTC Ecommerce Store">Other DTC Ecommerce</option>
                          </select>
                        </div>

                        <div className="sim-form-group">
                          <label className="sim-form-label">Platform Architecture</label>
                          <select
                            className="sim-form-select"
                            value={formPlatform}
                            onChange={(e) => setFormPlatform(e.target.value as any)}
                          >
                            <option value="Shopify OS 2.0 (Dawn)">Shopify OS 2.0 (Dawn/Sense/Craft)</option>
                            <option value="Shopify Plus (Prestige)">Shopify Plus (Prestige/Impulse)</option>
                            <option value="WooCommerce (WordPress)">WooCommerce (WordPress)</option>
                          </select>
                        </div>

                        <div className="sim-form-group">
                          <label className="sim-form-label">Theme Name</label>
                          <input
                            type="text"
                            placeholder="e.g. Dawn v14.0 or Prestige"
                            className="sim-form-input"
                            value={formThemeName}
                            onChange={(e) => setFormThemeName(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Section 2: Traffic & Financial Telemetry */}
                      <div className="sim-form-section-title">
                        <SlidersHorizontal size={15} />
                        <span>2. Traffic Telemetry & Financial Baseline</span>
                      </div>

                      <div className="sim-form-grid-3">
                        <div className="sim-form-group">
                          <label className="sim-form-label">
                            Monthly Visitors (Sessions)
                            <small>(Sweet spot: 300 - 30k)</small>
                          </label>
                          <input
                            type="number"
                            min={10}
                            max={5000000}
                            className="sim-form-input"
                            value={formSessions}
                            onChange={(e) => setFormSessions(Number(e.target.value))}
                          />
                        </div>

                        <div className="sim-form-group">
                          <label className="sim-form-label">
                            Current CVR (%)
                            <small>(e.g. 1.65%)</small>
                          </label>
                          <input
                            type="number"
                            step="0.05"
                            min="0.1"
                            max="30"
                            className="sim-form-input"
                            value={formCvr}
                            onChange={(e) => setFormCvr(Number(e.target.value))}
                          />
                        </div>

                        <div className="sim-form-group">
                          <label className="sim-form-label">
                            Current AOV ($)
                            <small>(e.g. $85.00)</small>
                          </label>
                          <input
                            type="number"
                            step="1"
                            min="5"
                            max="5000"
                            className="sim-form-input"
                            value={formAov}
                            onChange={(e) => setFormAov(Number(e.target.value))}
                          />
                        </div>
                      </div>

                      <div className="sim-form-grid-3">
                        <div className="sim-form-group">
                          <label className="sim-form-label">Cost of Goods (COGS %)</label>
                          <input
                            type="number"
                            min={5}
                            max={90}
                            className="sim-form-input"
                            value={formCogs}
                            onChange={(e) => setFormCogs(Number(e.target.value))}
                          />
                        </div>

                        <div className="sim-form-group">
                          <label className="sim-form-label">Monthly Ad Spend ($)</label>
                          <input
                            type="number"
                            min={0}
                            className="sim-form-input"
                            value={formAdSpend}
                            onChange={(e) => setFormAdSpend(Number(e.target.value))}
                          />
                        </div>

                        <div className="sim-form-group">
                          <label className="sim-form-label">Mobile Traffic Share (%)</label>
                          <input
                            type="number"
                            min={20}
                            max={100}
                            className="sim-form-input"
                            value={formMobileShare}
                            onChange={(e) => setFormMobileShare(Number(e.target.value))}
                          />
                        </div>
                      </div>

                      {/* Live KPI & Sweet Spot Preview */}
                      <div className="sim-kpi-summary-box">
                        <div className="sim-kpi-metric-item">
                          <span className="sim-kpi-metric-label">Monthly Revenue</span>
                          <span className="sim-kpi-metric-val">
                            ${Math.round(formSessions * (formCvr / 100) * formAov).toLocaleString()}
                          </span>
                        </div>
                        <div className="sim-kpi-metric-item">
                          <span className="sim-kpi-metric-label">Monthly Orders</span>
                          <span className="sim-kpi-metric-val">
                            {Math.round(formSessions * (formCvr / 100)).toLocaleString()}
                          </span>
                        </div>
                        <div className="sim-kpi-metric-item">
                          <span className="sim-kpi-metric-label">Revenue Per Session (RPS)</span>
                          <span className="sim-kpi-metric-val">
                            ${((formCvr / 100) * formAov).toFixed(2)}
                          </span>
                        </div>
                        <div className="sim-kpi-metric-item">
                          <span className="sim-kpi-metric-label">Prospect Sweet Spot</span>
                          <span
                            className="sim-verdict-pill"
                            style={{
                              background: formSessions >= 300 && formAov >= 30 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                              color: formSessions >= 300 && formAov >= 30 ? '#10b981' : '#f87171',
                            }}
                          >
                            {formSessions >= 300 && formAov >= 30 ? '✓ Recommended Prospect' : '⚠️ Low Leverage / Caution'}
                          </span>
                        </div>
                      </div>

                      {/* Section 3: Owner Persona */}
                      <div className="sim-form-section-title">
                        <User size={15} />
                        <span>3. Client / Store Owner Persona</span>
                      </div>

                      <div className="sim-form-grid-3">
                        <div className="sim-form-group">
                          <label className="sim-form-label">Owner Name</label>
                          <input
                            type="text"
                            placeholder="e.g. Sarah Vance"
                            className="sim-form-input"
                            value={formOwnerName}
                            onChange={(e) => setFormOwnerName(e.target.value)}
                          />
                        </div>

                        <div className="sim-form-group">
                          <label className="sim-form-label">Role</label>
                          <input
                            type="text"
                            placeholder="e.g. Founder & CEO"
                            className="sim-form-input"
                            value={formOwnerRole}
                            onChange={(e) => setFormOwnerRole(e.target.value)}
                          />
                        </div>

                        <div className="sim-form-group">
                          <label className="sim-form-label">Avatar Emoji</label>
                          <select
                            className="sim-form-select"
                            value={formOwnerAvatar}
                            onChange={(e) => setFormOwnerAvatar(e.target.value)}
                          >
                            <option value="👩‍💼">👩‍💼 Executive Female</option>
                            <option value="👨‍💼">👨‍💼 Executive Male</option>
                            <option value="🧑‍💻">🧑‍💻 Tech Founder</option>
                            <option value="🧔">🧔 Creative Director</option>
                            <option value="👩‍🦰">👩‍🦰 DTC Specialist</option>
                            <option value="👔">👔 Corporate Investor</option>
                          </select>
                        </div>
                      </div>

                      {/* Section 4: Identified Conversion Leaks to Audit */}
                      <div className="sim-form-section-title">
                        <AlertTriangle size={15} />
                        <span>4. Conversion Leaks to Audit (Select Observed Flaws)</span>
                      </div>
                      <p style={{ fontSize: 12.5, color: 'var(--text-muted)', margin: '0 0 12px' }}>
                        Check off the conversion bottlenecks you observed on this store (or add your own below):
                      </p>

                      <div className="sim-flaw-picker-grid">
                        {DEFAULT_FRICTION_LIBRARY.map((flaw) => {
                          const isChecked = selectedFlawIds.includes(flaw.id);
                          return (
                            <div
                              key={flaw.id}
                              className={`sim-flaw-picker-item ${isChecked ? 'is-checked' : ''}`}
                              onClick={() => handleToggleFlawSelection(flaw.id)}
                            >
                              <div className="sim-flaw-picker-check">
                                {isChecked && <Check size={12} strokeWidth={3} />}
                              </div>
                              <div>
                                <div className="sim-flaw-picker-title">{flaw.title}</div>
                                <div className="sim-flaw-picker-sub">
                                  {flaw.category.toUpperCase()} · {flaw.impactScore} Severity
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        {/* Render user-added custom flaws */}
                        {customFlaws.map((flaw) => (
                          <div key={flaw.id} className="sim-flaw-picker-item is-checked">
                            <div className="sim-flaw-picker-check">
                              <Check size={12} strokeWidth={3} />
                            </div>
                            <div>
                              <div className="sim-flaw-picker-title">{flaw.title}</div>
                              <div className="sim-flaw-picker-sub">CUSTOM LEAK · {flaw.category.toUpperCase()}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Quick Custom Flaw Inserter */}
                      <div
                        style={{
                          background: 'rgba(15, 23, 42, 0.4)',
                          border: '1px dashed rgba(255, 255, 255, 0.1)',
                          borderRadius: 8,
                          padding: '12px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          flexWrap: 'wrap',
                          marginBottom: 20,
                        }}
                      >
                        <input
                          type="text"
                          placeholder="Add custom leak title (e.g. Confusing size chart modal)"
                          className="sim-form-input"
                          style={{ flex: 1, minWidth: 200 }}
                          value={newFlawTitle}
                          onChange={(e) => setNewFlawTitle(e.target.value)}
                        />
                        <select
                          className="sim-form-select"
                          style={{ width: 140 }}
                          value={newFlawCategory}
                          onChange={(e) => setNewFlawCategory(e.target.value as any)}
                        >
                          <option value="pdp">PDP</option>
                          <option value="cart">Cart</option>
                          <option value="speed">Speed</option>
                          <option value="trust">Trust</option>
                          <option value="navigation">Navigation</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Recommended fix"
                          className="sim-form-input"
                          style={{ flex: 1, minWidth: 160 }}
                          value={newFlawFix}
                          onChange={(e) => setNewFlawFix(e.target.value)}
                        />
                        <button
                          type="button"
                          className="btn btn-sm btn-secondary"
                          onClick={handleAddCustomFlaw}
                          disabled={!newFlawTitle.trim()}
                        >
                          <Plus size={13} />
                          <span>Add Leak</span>
                        </button>
                      </div>

                      {/* Submit Actions */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12 }}>
                        {customStores.length > 0 && (
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setIsAddingStore(false)}
                          >
                            Cancel
                          </button>
                        )}
                        <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px' }}>
                          <CheckCircle2 size={16} />
                          <span>Save & Run Heuristic Audit (Stage 3) →</span>
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div>
                    {/* Top Action Bar for Custom Stores */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 12,
                        marginBottom: 18,
                      }}
                    >
                      <div>
                        <h3 style={{ fontSize: 18, margin: 0, fontWeight: 700 }}>
                          Your Manually Added Stores ({customStores.length})
                        </h3>
                        <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '2px 0 0' }}>
                          Select any custom client store to execute a complete audit, pitch roleplay, and ROI model.
                        </p>
                      </div>

                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setIsAddingStore(true)}
                      >
                        <Plus size={15} />
                        <span>Add Another Store to Audit</span>
                      </button>
                    </div>

                    {/* Grid of User Custom Stores */}
                    <div className="sim-store-candidates-grid">
                      {customStores.map((store) => (
                        <div
                          key={store.id}
                          className={`sim-store-card ${selectedStore.id === store.id ? 'is-selected' : ''}`}
                        >
                          <div className="sim-store-card-header">
                            <span className="sim-custom-badge">Custom Store Audit</span>
                            <span className="sim-store-platform">{store.platform}</span>
                          </div>

                          <h3 className="sim-store-name">{store.name}</h3>
                          <div className="sim-store-niche">{store.niche}</div>

                          <div className="sim-telemetry-pills">
                            <div className="sim-telemetry-item">
                              <span className="sim-tel-label">Monthly Sessions</span>
                              <span className="sim-tel-val">{store.baseline.monthlySessions.toLocaleString()}</span>
                            </div>
                            <div className="sim-telemetry-item">
                              <span className="sim-tel-label">Baseline CVR</span>
                              <span className="sim-tel-val">{store.baseline.cvr}%</span>
                            </div>
                            <div className="sim-telemetry-item">
                              <span className="sim-tel-label">Current AOV</span>
                              <span className="sim-tel-val">${store.baseline.aov}</span>
                            </div>
                            <div className="sim-telemetry-item">
                              <span className="sim-tel-label">Monthly Revenue</span>
                              <span className="sim-tel-val">${store.baseline.monthlyRevenue.toLocaleString()}</span>
                            </div>
                          </div>

                          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12 }}>
                            👤 <strong>Owner:</strong> {store.owner.avatar} {store.owner.name} ({store.owner.role}) ·{' '}
                            ⚠️ <strong>{store.designFlaws.length} Leaks Configured</strong>
                          </div>

                          <p className="sim-qualification-notes">{store.qualificationReason}</p>

                          <div className="sim-store-card-actions">
                            <button
                              type="button"
                              className="btn btn-primary"
                              style={{ flex: 1 }}
                              onClick={() => handleSelectStoreCandidate(store)}
                            >
                              <span>Select As Client Target →</span>
                            </button>
                            <button
                              type="button"
                              className="sim-delete-btn"
                              title="Delete this custom store"
                              onClick={(e) => handleDeleteCustomStore(store.id, e)}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            STAGE 3: THE RAPID 5-MINUTE HEURISTIC AUDIT
            ========================================================================= */}
        {currentStage === 3 && (
          <div className="sim-stage-content animate-fade-in">
            <div className="sim-stage-kicker" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span className="badge badge-indigo">Stage 3 of 6</span>
                <span className="sim-kicker-title">
                  Target Store: <strong>{selectedStore.name}</strong> ({selectedStore.niche})
                </span>
                {selectedStore.id.startsWith('custom-') && (
                  <span className="badge badge-emerald" style={{ fontSize: 11 }}>Custom Store Audit</span>
                )}
              </div>
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={() => handleStageSelect(2)}
                style={{ fontSize: 12, padding: '4px 10px' }}
              >
                ← Switch / Add Store
              </button>
            </div>
            <h2 className="sim-section-title">The Rapid 5-Minute Heuristic Audit</h2>
            <p className="sim-section-desc">
              Great CRO consultants do not write 40-page PDFs that gather dust. They find the <strong>top 3 revenue-blocking leaks</strong> and translate them into a clear hypothesis.
            </p>

            {/* Simulated Store Mockup Inspector */}
            <div className="sim-mockup-inspector">
              <div className="sim-inspector-topbar">
                <div className="sim-browser-dots">
                  <span className="dot-red" />
                  <span className="dot-amber" />
                  <span className="dot-green" />
                </div>
                <span className="sim-inspector-url">https://{selectedStore.urlMock}/products/seamless-leggings</span>
                <span className="sim-device-tag">📱 Mobile Viewport (79% of Traffic)</span>
              </div>

              <div className="sim-inspector-body">
                <div className="sim-inspector-notice">
                  ⚠️ <strong>Identified Leaks:</strong> We detected {selectedStore.designFlaws.length} major conversion bottlenecks above the fold.
                </div>

                <div className="sim-flaws-list">
                  {selectedStore.designFlaws.map((flaw, idx) => (
                    <div key={flaw.id} className="sim-flaw-item">
                      <div className="sim-flaw-badge">
                        <AlertTriangle size={15} color="#ef4444" />
                        <span>Leak #{idx + 1}: {flaw.impactScore} Severity</span>
                      </div>
                      <h4 className="sim-flaw-title">{flaw.title}</h4>
                      <p className="sim-flaw-desc">{flaw.description}</p>
                      <div className="sim-flaw-fix">
                        <strong>🛠️ Recommended Shopify Fix:</strong> {flaw.suggestedFix}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hypothesis Formulation Box */}
            <div className="sim-hypothesis-card">
              <h3 className="sim-hypothesis-title">
                <Sparkles size={16} color="#6366f1" />
                <span>Formulate Your Technical Hypothesis</span>
              </h3>
              <p className="sim-hypothesis-sub">
                Formula: <em>If we implement [Solution], then [Target Metric] will lift because [Friction Removed].</em>
              </p>

              <textarea
                className="sim-hypothesis-input"
                rows={3}
                value={auditHypothesis}
                onChange={(e) => setAuditHypothesis(e.target.value)}
              />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginTop: 12 }}>
                <button type="button" className="btn btn-secondary" onClick={handleGradeAudit}>
                  <span>🤖 Grade My Audit with AI Mentor</span>
                </button>

                {auditScore && (
                  <span className="sim-audit-grade-pill">
                    <Award size={15} color="#10b981" />
                    <span>Audit Score: {auditScore}</span>
                  </span>
                )}

                <button type="button" className="btn btn-primary" onClick={() => handleStageSelect(4)}>
                  <span>Next: Draft Outreach Email & Pitch Owner →</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            STAGE 4: COLD OUTREACH & ROLEPLAY WITH STORE OWNER
            ========================================================================= */}
        {currentStage === 4 && (
          <div className="sim-stage-content animate-fade-in">
            <div className="sim-stage-kicker" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="badge badge-indigo">Stage 4 of 6</span>
                <span className="sim-kicker-title">Client Target: {selectedStore.name} ({selectedStore.owner.name})</span>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={() => handleStageSelect(2)}
                style={{ fontSize: 12, padding: '4px 10px' }}
              >
                ← Switch / Add Store
              </button>
            </div>
            <h2 className="sim-section-title">Cold Outreach Pitch & Live Objection Handling</h2>
            <p className="sim-section-desc">
              Store owners delete 99% of pitches because they are generic agency spam. Practice sending a value-first, math-driven pitch and overcoming real objections.
            </p>

            <div className="sim-outreach-layout">
              {/* Left Column: Email Composer */}
              <div className="sim-email-composer">
                <div className="sim-email-head">
                  <Mail size={16} color="#6366f1" />
                  <span>Cold Outreach Pitch Drafter</span>
                </div>

                <div className="sim-email-field">
                  <label className="sim-field-label">To:</label>
                  <div className="sim-field-static">
                    {selectedStore.owner.name} &lt;contact@{selectedStore.urlMock}&gt; ({selectedStore.owner.role})
                  </div>
                </div>

                <div className="sim-email-field">
                  <label className="sim-field-label">Subject:</label>
                  <input
                    type="text"
                    className="sim-field-input"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                  />
                </div>

                <div className="sim-email-field">
                  <label className="sim-field-label">Body:</label>
                  <textarea
                    className="sim-email-textarea"
                    rows={12}
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                  />
                </div>

                <button
                  type="button"
                  className="btn btn-primary sim-send-email-btn"
                  onClick={handleSendInitialEmail}
                >
                  <Send size={15} />
                  <span>Send Pitch to {selectedStore.owner.name}</span>
                </button>
              </div>

              {/* Right Column: Interactive Roleplay Chat */}
              <div className="sim-chat-roleplay">
                <div className="sim-chat-header">
                  <div className="sim-chat-avatar">{selectedStore.owner.avatar}</div>
                  <div>
                    <div className="sim-chat-name">{selectedStore.owner.name}</div>
                    <div className="sim-chat-status">
                      <span className="sim-online-dot" /> Active Now · {selectedStore.owner.role}
                    </div>
                  </div>
                </div>

                <div className="sim-chat-messages">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`sim-chat-bubble-wrap is-${msg.sender}`}>
                      <div className="sim-chat-bubble">
                        <div className="sim-chat-sender-tag">
                          {msg.sender === 'user' ? 'You' : msg.sender === 'owner' ? selectedStore.owner.name : 'AI CRO Mentor'}
                        </div>
                        <div className="sim-chat-text">{msg.text}</div>
                        <div className="sim-chat-time">{msg.time}</div>
                      </div>
                    </div>
                  ))}
                  {isAiReplying && (
                    <div className="sim-chat-bubble-wrap is-owner">
                      <div className="sim-chat-bubble is-typing">
                        <span>{selectedStore.owner.name} is typing...</span>
                      </div>
                    </div>
                  )}
                </div>

                {ownerDealClosed ? (
                  <div className="sim-deal-closed-card">
                    <Award size={20} color="#10b981" />
                    <div>
                      <strong>Deal Closed! Contract Signed ($3,500 Sprint)</strong>
                      <p>You convinced the owner with unit economics math. Proceed to implementation!</p>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={() => handleStageSelect(5)}>
                      <span>Next: Implement CRO Code Fixes →</span>
                    </button>
                  </div>
                ) : (
                  <div className="sim-chat-input-bar">
                    <input
                      type="text"
                      className="sim-chat-input"
                      placeholder="Type your response to Marcus's objection..."
                      value={roleplayInput}
                      onChange={(e) => setRoleplayInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSendRoleplayResponse();
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSendRoleplayResponse}
                      disabled={isAiReplying || !roleplayInput.trim()}
                    >
                      <Send size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            STAGE 5: CODE IMPLEMENTATION OF LESSON CRO CHANGES
            ========================================================================= */}
        {currentStage === 5 && (
          <div className="sim-stage-content animate-fade-in">
            <div className="sim-stage-kicker" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="badge badge-indigo">Stage 5 of 6</span>
                <span className="sim-kicker-title">Client Target: {selectedStore.name}</span>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={() => handleStageSelect(2)}
                style={{ fontSize: 12, padding: '4px 10px' }}
              >
                ← Switch / Add Store
              </button>
            </div>
            <h2 className="sim-section-title">Hands-On Code Implementation</h2>
            <p className="sim-section-desc">
              Apply the exact components from your curriculum lessons to fix the client's store. We will deploy the identified optimization components into {selectedStore.themeName}.
            </p>

            <div className="sim-code-tasks-list">
              {selectedStore.designFlaws.map((flaw, idx) => (
                <div key={flaw.id} className="sim-code-task-card">
                  <div className="sim-task-head">
                    <span className="badge badge-emerald">Upgrade #{idx + 1}</span>
                    <h3 className="sim-task-title">{flaw.title}</h3>
                  </div>

                  <p className="sim-task-desc">{flaw.suggestedFix}</p>

                  <div className="sim-code-block-wrap">
                    <div className="sim-code-block-header">
                      <Code size={13} />
                      <span>Liquid Component Snippet: `snippets/${flaw.category}-cro-fix.liquid`</span>
                    </div>
                    <pre className="sim-code-pre">{flaw.liquidSnippetOrThemeChange}</pre>
                  </div>
                </div>
              ))}
            </div>

            <div className="sim-deploy-control-bar">
              <div>
                <strong>Ready to deploy and run simulated A/B test?</strong>
                <p style={{ margin: 0, fontSize: 13, color: 'var(--text-muted)' }}>
                  This will simulate {selectedStore.baseline.monthlySessions.toLocaleString()} visitors through the optimized {selectedStore.themeName} pipeline.
                </p>
              </div>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSimulateDeploy}
                disabled={simulatingDeploy}
              >
                <RefreshCw size={15} className={simulatingDeploy ? 'spin-animation' : ''} />
                <span>{simulatingDeploy ? 'Simulating Traffic Pipeline...' : 'Deploy & Run 30-Day Experiment'}</span>
              </button>
            </div>

            {deployedFeatures.stickyAtc && (
              <div className="sim-deploy-success-card animate-fade-in">
                <CheckCircle2 size={24} color="#10b981" />
                <div>
                  <h4 style={{ margin: 0, color: '#10b981', fontSize: 16 }}>
                    A/B Experiment Completed with 98.4% Statistical Significance!
                  </h4>
                  <p style={{ margin: '4px 0 0', fontSize: 13 }}>
                    The 3 CRO upgrades produced a massive lift across all key metrics. Proceed to Stage 6 to review the numbers and generate your client case study.
                  </p>
                </div>
                <button type="button" className="btn btn-primary" onClick={() => handleStageSelect(6)}>
                  <span>Review The Numbers & ROI →</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            STAGE 6: THE NUMBERS & EXPORTABLE CASE STUDY
            ========================================================================= */}
        {currentStage === 6 && (
          <div className="sim-stage-content animate-fade-in">
            <div className="sim-stage-kicker" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="badge badge-indigo">Stage 6 of 6</span>
                <span className="sim-kicker-title">The Financial Proof & Case Study: {selectedStore.name}</span>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={() => handleStageSelect(2)}
                style={{ fontSize: 12, padding: '4px 10px' }}
              >
                ← Switch / Add Store
              </button>
            </div>
            <h2 className="sim-section-title">The Numbers: Calculating Client ROI</h2>
            <p className="sim-section-desc">
              Design is subjective; numbers are factual. Here is the verified revenue lift generated by your CRO optimizations on {selectedStore.name}.
            </p>

            {/* Before vs After Telemetry Grid */}
            <div className="sim-results-grid">
              <div className="sim-result-card before">
                <div className="sim-res-badge">Baseline (Before CRO)</div>
                <div className="sim-res-metric-row">
                  <span>Monthly Sessions:</span>
                  <strong>{calculatorInputs.sessions.toLocaleString()}</strong>
                </div>
                <div className="sim-res-metric-row">
                  <span>Conversion Rate (CVR):</span>
                  <strong>{calculatorInputs.baselineCvr}%</strong>
                </div>
                <div className="sim-res-metric-row">
                  <span>Average Order Value (AOV):</span>
                  <strong>${calculatorInputs.baselineAov.toFixed(2)}</strong>
                </div>
                <div className="sim-res-metric-row">
                  <span>Revenue Per Session (RPS):</span>
                  <strong>${((calculatorInputs.baselineCvr / 100) * calculatorInputs.baselineAov).toFixed(2)}</strong>
                </div>
                <div className="sim-res-total-revenue">
                  <span>Monthly Gross Revenue:</span>
                  <strong>${baselineRev.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>
                </div>
              </div>

              <div className="sim-result-card after">
                <div className="sim-res-badge success">Optimized (After CRO)</div>
                <div className="sim-res-metric-row">
                  <span>Monthly Sessions:</span>
                  <strong>{calculatorInputs.sessions.toLocaleString()}</strong>
                </div>
                <div className="sim-res-metric-row">
                  <span>Conversion Rate (CVR):</span>
                  <strong style={{ color: '#10b981' }}>{calculatorInputs.newCvr}% (+44% Relative Lift)</strong>
                </div>
                <div className="sim-res-metric-row">
                  <span>Average Order Value (AOV):</span>
                  <strong style={{ color: '#10b981' }}>${calculatorInputs.newAov.toFixed(2)} (+$8 Threshold Lift)</strong>
                </div>
                <div className="sim-res-metric-row">
                  <span>Revenue Per Session (RPS):</span>
                  <strong style={{ color: '#10b981' }}>${((calculatorInputs.newCvr / 100) * calculatorInputs.newAov).toFixed(2)}</strong>
                </div>
                <div className="sim-res-total-revenue success">
                  <span>Monthly Gross Revenue:</span>
                  <strong>${newRev.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>
                </div>
              </div>

              <div className="sim-roi-highlight-card">
                <div className="sim-roi-icon-wrap">
                  <TrendingUp size={24} color="#10b981" />
                </div>
                <div className="sim-roi-text">
                  <span className="sim-roi-label">Net Incremental Revenue Added:</span>
                  <div className="sim-roi-amount">+${monthlyLift.toLocaleString(undefined, { maximumFractionDigits: 0 })} / Month</div>
                  <div className="sim-roi-annual">+${annualLift.toLocaleString(undefined, { maximumFractionDigits: 0 })} / Year in pure added top-line!</div>
                </div>
                <div className="sim-roi-ratio">
                  <span>Client ROI on $3,500 Fee:</span>
                  <strong>{((monthlyLift * 12) / 3500).toFixed(1)}x Return</strong>
                </div>
              </div>
            </div>

            {/* Exportable Case Study Artifact */}
            <div className="sim-case-study-card">
              <div className="sim-case-study-head">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <FileText size={18} color="#6366f1" />
                  <h3 style={{ margin: 0, fontSize: 16 }}>Verified Case Study: {selectedStore.name} Optimization</h3>
                </div>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    window.print();
                  }}
                >
                  <Download size={13} />
                  <span>Print / Save as PDF</span>
                </button>
              </div>

              <div className="sim-case-study-body">
                <div className="cs-row">
                  <strong>Client:</strong> {selectedStore.name} ({selectedStore.niche})
                </div>
                <div className="cs-row">
                  <strong>Platform:</strong> {selectedStore.platform}
                </div>
                <div className="cs-row">
                  <strong>Core Challenge:</strong> 79% mobile traffic suffering from buried Add to Cart and friction-heavy dropdown variant selectors.
                </div>
                <div className="cs-row">
                  <strong>Delivered Solution:</strong> Implemented modular Sticky Buy Bar, visual color/size swatches, and slide-out Ajax Cart Drawer with dynamic free shipping progress threshold.
                </div>
                <div className="cs-row">
                  <strong>Verified Outcome:</strong> CVR lifted from {calculatorInputs.baselineCvr}% to {calculatorInputs.newCvr}%, adding <strong>+${monthlyLift.toLocaleString(undefined, { maximumFractionDigits: 0 })} in monthly recurring revenue</strong> with zero additional ad spend.
                </div>
              </div>

              <div className="sim-case-study-footer">
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#10b981', fontWeight: 700 }}>
                  <CheckCircle2 size={16} />
                  <span>Simulation Complete: Portfolio Case Study Generated</span>
                </div>

                <Link to="/portfolio" className="btn btn-primary">
                  <span>View in My Portfolio →</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
