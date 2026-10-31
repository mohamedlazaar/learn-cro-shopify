import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Briefcase,
  GraduationCap,
  Wrench,
  Key,
  Download,
  Copy,
  Check,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';
import { callPiApiChat, ChatMessage, hasPiApiKey, DEFAULT_AI_MODEL } from '../services/aiService';

type CoachMode = 'examine' | 'client-roleplay' | 'correct-bad' | 'technical';

interface ModeConfig {
  id: CoachMode;
  title: string;
  icon: React.ReactNode;
  badge: string;
  description: string;
  systemPrompt: string;
  quickPrompts: string[];
}

const MODES: ModeConfig[] = [
  {
    id: 'examine',
    title: 'Knowledge Examiner & Quizzing',
    icon: <GraduationCap size={16} />,
    badge: 'Core CRO Mastery',
    description: 'The AI will interrogate your CRO knowledge, present edge cases, evaluate your reasoning, and expose gaps.',
    systemPrompt: `You are an elite Lead CRO Director and Statistical Methodologist. Your job is to strictly test the user's knowledge in Shopify Conversion Rate Optimization, A/B testing statistics, user psychology, and ecommerce funnels.
When the user speaks to you:
1. If they ask to be tested, generate 1 highly realistic, challenging scenario question with multiple nuance points.
2. If they provide an answer, thoroughly evaluate it:
   - Identify what they got right.
   - Point out what they missed, flawed assumptions, or risks.
   - Teach the gold-standard industry methodology.
   - Award a grade (e.g. A, B-, C) and ask a follow-up question.
Keep answers structured with Markdown headings, bullet points, and bold text.`,
    quickPrompts: [
      'Quiz me on Sample Ratio Mismatch (SRM) and why it invalidates tests.',
      'Test my understanding of Minimum Detectable Effect (MDE) and sample size calculation.',
      'Give me a tricky scenario about Statistical Power vs Significance Level.',
      'Test me on the MECLABS heuristic conversion formula and how to apply it.',
    ],
  },
  {
    id: 'client-roleplay',
    title: 'Client Pitch & Objection Roleplay',
    icon: <Briefcase size={16} />,
    badge: 'Deal with Clients',
    description: 'Practice handling difficult Shopify store owners, founders, and marketing directors pushbacks.',
    systemPrompt: `You are an expert CRO Agency Partner and Client Communications Coach. You simulate realistic Shopify store owners and clients who have common fears, objections, and misconceptions about CRO.
When roleplaying:
1. Adopt the persona of a real client (skeptical, impatient, or budget-sensitive).
2. Push back on the user's suggestions with realistic objections.
3. Once the user replies, step out of character to critique their pitch:
   - Persuasiveness & Empathy rating (1-10)
   - Business & ROI clarity (did they speak in revenue or confusing jargon?)
   - Exact improved script/phrasing they should say to close the client.
Keep your guidance actionable, respectful, and focused on building trusted client relationships.`,
    quickPrompts: [
      'Roleplay: The client says "Stop the test after 3 days, Variant B is +35% up!"',
      'Roleplay: Store owner says "I just want to redesign the whole store, not test small things."',
      'Roleplay: Client asks "Why should I pay $4,000/mo for CRO instead of spending it on Meta Ads?"',
      'Roleplay: Merchant panics: "Our CVR dropped this week! Did your A/B test break our store?"',
    ],
  },
  {
    id: 'correct-bad',
    title: 'Heuristic & Practice Auditor',
    icon: <AlertTriangle size={16} />,
    badge: 'Fix Bad CRO',
    description: 'Submit CRO ideas, hypotheses, or changes to uncover deceptive traps, flawed logic, and blindspots.',
    systemPrompt: `You are a Principal Heuristic Auditor and Behavioral Science Specialist. Your mission is to audit user ideas, proposed website changes, and hypotheses to catch "bad CRO practices" before they damage client revenue.
Common bad practices to flag:
- Changing 5 things at once without factorial testing.
- Relying on generic trust badges instead of authentic credibility proof.
- Auto-rotating carousels and sliders.
- Hiding shipping costs until checkout.
- Testing on low-traffic stores without statistical power.
Always analyze using: 1) What's wrong/risky, 2) The cognitive psychology behind why it fails, 3) The scientific alternative.`,
    quickPrompts: [
      'Audit this idea: Adding a countdown timer and pop-up discount to every product page.',
      'Review my hypothesis: Changing the CTA button color from blue to bright green will increase CVR by 25%.',
      'Is it a good idea to remove all product tabs and show everything on one long page?',
      'A merchant wants to auto-apply a 10% coupon for all first-time visitors in a floating bar.',
    ],
  },
  {
    id: 'technical',
    title: 'Shopify Tech & Code Troubleshooter',
    icon: <Wrench size={16} />,
    badge: 'Liquid & Architecture',
    description: 'Get deep technical help on Shopify Section Rendering API, Liquid blocks, Web Pixels, and Core Web Vitals.',
    systemPrompt: `You are a Principal Shopify Plus Architect and Frontend Performance Engineer. You assist developers with technical CRO code: Liquid blocks, Section Rendering API, zero-flicker client-side A/B test scripts, GA4 dataLayer events, web pixel events, and Core Web Vitals (LCP, CLS, INP) optimization.
Provide clean, commented code snippets and architectural best practices.`,
    quickPrompts: [
      'How do I implement zero-flicker A/B testing in Shopify Liquid using documentElement classes?',
      'Show me how to update the cart drawer using the Section Rendering API on /cart/add.js.',
      'How to optimize Shopify product hero image tags for Largest Contentful Paint (LCP)?',
      'Write a Shopify Web Pixel subscriber for product_added_to_cart pushing to window.dataLayer.',
    ],
  },
];

const STORAGE_CHAT_KEY = 'cro_ai_coach_messages_v1';

export const AiCoachPage: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<CoachMode>('examine');
  const hasKey = hasPiApiKey();
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_CHAT_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [
      {
        role: 'assistant',
        content: `👋 Welcome to your **Personal AI CRO Coach**!

I am powered by **PiAPI (${DEFAULT_AI_MODEL})** and trained on senior ecommerce conversion rate optimization and client consulting methodologies.

### How I can help you accelerate your career:
- **🎓 Knowledge Examiner**: I will test you on real CRO scenarios, metrics (SRM, MDE, CVR, AOV, RPS), and statistics.
- **💼 Client Roleplay**: Practice pitching and handling skeptical or impatient store owners.
- **⚠️ Practice Auditor**: Point out bad ideas, common mistakes, and risky assumptions.
- **🛠️ Technical Code Lab**: Review Liquid snippets, Section Rendering, and analytics pipelines.

Select a mode above or pick a prompt below to begin!`,
      },
    ];
  });

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Sync messages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CHAT_KEY, JSON.stringify(messages));
    } catch {}
  }, [messages]);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const activeModeConfig = MODES.find((m) => m.id === selectedMode) || MODES[0];

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      const reply = await callPiApiChat({
        messages: updatedMessages.slice(-10), // keep recent context
        systemPrompt: activeModeConfig.systemPrompt,
        temperature: 0.7,
      });

      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `⚠️ Error receiving AI response: ${err.message || 'Unknown network error'}. Please verify your connection or PiAPI key.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Clear your chat history with the AI Coach?')) {
      const resetMessages: ChatMessage[] = [
        {
          role: 'assistant',
          content: `Chat session reset. Mode switched to **${activeModeConfig.title}**. What would you like to explore or practice?`,
        },
      ];
      setMessages(resetMessages);
      try {
        localStorage.removeItem(STORAGE_CHAT_KEY);
      } catch {}
    }
  };

  const handleExportChat = () => {
    const text = messages
      .map((m) => `[${m.role.toUpperCase()}]:\n${m.content}\n\n-------------------\n`)
      .join('\n');
    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cro-ai-coach-session-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyMessage = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div
      className="animate-fade-in"
      style={{
        maxWidth: 1040,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        minHeight: 'calc(100vh - 120px)',
      }}
    >
      {/* Top Banner & Mode Bar */}
      <div
        style={{
          padding: '24px 28px',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            marginBottom: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
              }}
            >
              <Bot size={24} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>
                  AI CRO Coach & Client Trainer
                </h1>
                <span className="badge badge-indigo" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Sparkles size={11} />
                  <span>PiAPI {DEFAULT_AI_MODEL}</span>
                </span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '4px 0 0' }}>
                Test your CRO expertise, get tough client objections, correct flaws, and master ecommerce conversion strategy.
              </p>
            </div>
          </div>

          {/* Right controls: API Key status & session actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 12px',
                borderRadius: 'var(--radius-md)',
                background: hasKey ? 'var(--success-muted)' : 'var(--warning-muted)',
                border: `1px solid ${hasKey ? 'rgba(16, 185, 129, 0.3)' : 'rgba(234, 179, 8, 0.3)'}`,
                fontSize: 12,
                fontWeight: 600,
                color: hasKey ? 'var(--success)' : 'var(--warning)',
              }}
            >
              <Sparkles size={12} />
              <span>{hasKey ? 'PiAPI Active (.env)' : 'Key Missing in .env'}</span>
            </div>
            <button onClick={handleExportChat} className="btn btn-secondary btn-sm" title="Export Session to Markdown">
              <Download size={13} />
            </button>
            <button onClick={handleClearChat} className="btn btn-secondary btn-sm" title="Clear Chat History">
              <RotateCcw size={13} />
            </button>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
          {MODES.map((mode) => {
            const isSelected = selectedMode === mode.id;
            return (
              <div
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: isSelected ? 'var(--accent-muted)' : 'var(--bg-app)',
                  border: `1.5px solid ${isSelected ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  transition: 'all 0.15s ease',
                }}
              >
                <div
                  style={{
                    color: isSelected ? 'var(--accent-primary)' : 'var(--text-muted)',
                    marginTop: 2,
                  }}
                >
                  {mode.icon}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                    }}
                  >
                    {mode.title}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.3 }}>
                    {mode.badge}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Chat Interface */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {/* Messages Scroll Area */}
        <div
          style={{
            flex: 1,
            padding: '24px',
            overflowY: 'auto',
            maxHeight: '520px',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {messages.map((msg, idx) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: 14,
                  alignItems: 'flex-start',
                  justifyContent: isUser ? 'flex-end' : 'flex-start',
                }}
              >
                {!isUser && (
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    <Bot size={16} />
                  </div>
                )}

                <div
                  style={{
                    maxWidth: '82%',
                    padding: '16px 20px',
                    borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: isUser ? 'var(--accent-primary)' : 'var(--bg-app)',
                    color: isUser ? '#ffffff' : 'var(--text-primary)',
                    border: isUser ? 'none' : '1px solid var(--border-subtle)',
                    fontSize: 14,
                    lineHeight: 1.65,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    position: 'relative',
                  }}
                >
                  <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    {msg.content}
                  </div>

                  {!isUser && (
                    <div
                      style={{
                        marginTop: 10,
                        paddingTop: 8,
                        borderTop: '1px solid var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: 8,
                      }}
                    >
                      <button
                        onClick={() => handleCopyMessage(msg.content, idx)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: 'var(--text-muted)',
                          fontSize: 11,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                          padding: '2px 6px',
                        }}
                      >
                        {copiedIdx === idx ? <Check size={12} color="var(--success)" /> : <Copy size={12} />}
                        <span>{copiedIdx === idx ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '8px',
                      background: 'var(--bg-surface-active)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-secondary)',
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    <User size={16} />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                }}
              >
                <Bot size={16} />
              </div>
              <div
                style={{
                  padding: '12px 18px',
                  borderRadius: '16px 16px 16px 4px',
                  background: 'var(--bg-app)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 13,
                  color: 'var(--text-secondary)',
                }}
              >
                <Sparkles size={14} className="animate-spin" color="var(--accent-primary)" />
                <span>Coach is thinking with {DEFAULT_AI_MODEL}...</span>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div
          style={{
            padding: '12px 20px',
            background: 'var(--bg-app)',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            overflowX: 'auto',
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', flexShrink: 0 }}>
            Quick Prompts:
          </span>
          {activeModeConfig.quickPrompts.map((prompt, pIdx) => (
            <button
              key={pIdx}
              onClick={() => handleSendMessage(prompt)}
              disabled={isLoading}
              style={{
                padding: '6px 12px',
                borderRadius: '999px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                fontSize: 12,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Composer */}
        <div
          style={{
            padding: '16px 20px',
            background: 'var(--bg-surface)',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'flex-end',
            gap: 12,
          }}
        >
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder={`Ask a question or practice in ${activeModeConfig.title} mode... (Shift+Enter for newline)`}
            rows={2}
            style={{
              flex: 1,
              padding: '12px 16px',
              background: 'var(--bg-app)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              fontSize: 14,
              lineHeight: 1.5,
              resize: 'none',
              outline: 'none',
              fontFamily: 'inherit',
            }}
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !inputMessage.trim()}
            className="btn btn-primary"
            style={{
              padding: '12px 18px',
              height: 48,
              opacity: isLoading || !inputMessage.trim() ? 0.6 : 1,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span>Send</span>
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
